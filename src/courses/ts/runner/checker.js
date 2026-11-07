import ts from 'typescript';

// Typkontrollen med TypeScripts egen kompilator (version 6, den sista
// som är skriven i JavaScript; 7 är omskriven i Go och går inte att köra
// här). En LanguageService återanvänds, så att JavaScripts typer bara
// läses in första gången. Ren logik utan koppling till workern, så att
// testerna i Node kör exakt samma kontroll.

const OPTIONS = {
  strict: true,
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  jsx: ts.JsxEmit.ReactJSX,
  lib: ['lib.es2023.d.ts'],
  types: [],
  noEmit: true,
  skipLibCheck: true,
};

// Kod med JSX eller en import från react är en .tsx-fil. Annars .ts, för
// i .tsx betyder <T> ett element och generics måste skrivas <T,>.
export const isTsx = code =>
  /<\/|\/>/.test(code) || /from\s+['"]react['"]/.test(code);

const fileFor = code => (isTsx(code) ? '/main.tsx' : '/main.ts');

// Ett "@ts-expect-error" som inte behövdes. Då gick typtestet igenom fast
// det skulle ge fel.
const UNUSED_EXPECT_ERROR = 2578;

export function createChecker(libFiles) {
  const files = new Map(Object.entries(libFiles));
  const versions = new Map();
  let current = '/main.ts';

  function setFile(name, text) {
    if (files.get(name) === text) return;
    files.set(name, text);
    versions.set(name, (versions.get(name) ?? 0) + 1);
  }

  const host = {
    getScriptFileNames: () => [current, '/globals.d.ts'],
    getScriptVersion: name => String(versions.get(name) ?? 0),
    getScriptSnapshot: name =>
      files.has(name)
        ? ts.ScriptSnapshot.fromString(files.get(name))
        : undefined,
    getCurrentDirectory: () => '/',
    getCompilationSettings: () => OPTIONS,
    getDefaultLibFileName: () => '/lib.es2023.d.ts',
    fileExists: name => files.has(name),
    readFile: name => files.get(name),
    directoryExists: dir => {
      const prefix = dir.endsWith('/') ? dir : `${dir}/`;
      return [...files.keys()].some(name => name.startsWith(prefix));
    },
    getDirectories: () => [],
    realpath: path => path,
  };
  const service = ts.createLanguageService(host, ts.createDocumentRegistry());

  function load(text, name) {
    current = name;
    setFile(name, text);
  }

  const lineOf = (text, pos) => text.slice(0, pos).split('\n').length;

  // Felen i elevens kod, med rad. Ett fel efter elevens kod (t.ex. en {
  // som aldrig stängs) hamnar på sista raden.
  function describe(diagnostic, text, end) {
    const pos = Math.min(diagnostic.start ?? 0, Math.max(end - 1, 0));
    return {
      code: diagnostic.code,
      message: ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'),
      line: lineOf(text, pos),
      from: pos,
      to: Math.min(pos + (diagnostic.length ?? 1), end),
    };
  }

  // Felen i koden som den står, till lappen i editorn.
  function diagnostics(code) {
    const name = fileFor(code);
    load(code, name);
    const syntax = service.getSyntacticDiagnostics(name);
    const all = syntax.length ? syntax : service.getSemanticDiagnostics(name);
    return all.map(diagnostic => describe(diagnostic, code, code.length));
  }

  // typeTests: [{ description, code, fails }] körs efter elevens kod, var
  // och en i ett eget block så att namnen inte krockar. code ska ge
  // typfel när fails är sant (en rad, efter "@ts-expect-error").
  function check(code, typeTests = []) {
    const name = fileFor(code);
    const student = code.endsWith('\n') ? code : `${code}\n`;
    let text = `${student};\n`;
    const ranges = typeTests.map(test => {
      const start = text.length;
      text += test.fails
        ? `{\n// @ts-expect-error\n${test.code}\n}\n`
        : `{\n${test.code}\n}\n`;
      return { start, end: text.length };
    });
    load(text, name);

    const syntax = service.getSyntacticDiagnostics(name);
    if (syntax.length > 0) {
      return {
        syntaxErrors: syntax.map(d => describe(d, student, student.length)),
        typeErrors: [],
        typeTests: [],
      };
    }
    const semantic = service.getSemanticDiagnostics(name);
    const inStudent = semantic.filter(d => (d.start ?? 0) < student.length);
    return {
      syntaxErrors: [],
      typeErrors: inStudent.map(d => describe(d, student, student.length)),
      typeTests: typeTests.map((test, index) => {
        const { start, end } = ranges[index];
        const problem = semantic.find(d => d.start >= start && d.start < end);
        return {
          description: test.description,
          passed: !problem,
          fails: Boolean(test.fails),
          ...(problem && {
            code: problem.code,
            message:
              problem.code === UNUSED_EXPECT_ERROR
                ? null
                : ts.flattenDiagnosticMessageText(problem.messageText, '\n'),
          }),
        };
      }),
    };
  }

  // Typen på det som står vid pos, till hovern: t.ex. "const pris: number".
  function quickInfo(code, pos) {
    const name = fileFor(code);
    load(code, name);
    const info = service.getQuickInfoAtPosition(name, pos);
    if (!info) return null;
    return {
      from: info.textSpan.start,
      to: info.textSpan.start + info.textSpan.length,
      kind: info.kind,
      text: ts.displayPartsToString(info.displayParts),
      docs: ts.displayPartsToString(info.documentation),
    };
  }

  // Förslagen där markören står, t.ex. metoderna efter "namn.".
  function completions(code, pos) {
    const name = fileFor(code);
    load(code, name);
    const result = service.getCompletionsAtPosition(name, pos, {});
    if (!result) return [];
    return result.entries
      .filter(entry => !entry.name.startsWith('__'))
      .slice(0, 200)
      .map(entry => ({ label: entry.name, kind: entry.kind }));
  }

  return { check, diagnostics, quickInfo, completions };
}

// JavaScript att köra när typerna är rätt. JSX lämnas kvar, för JS-kursens
// körning gör om den själv.
export function toJavaScript(code) {
  return ts
    .transpileModule(code, {
      fileName: fileFor(code),
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
        jsx: ts.JsxEmit.Preserve,
      },
    })
    .outputText.replace(/^"use strict";\n/, '');
}

// Kontrollen som rättningen gör, med JavaScript-versionen när typerna är
// rätt. Samma i workern och i testerna.
export function checkAndCompile(checker, code, typeTests) {
  const result = checker.check(code, typeTests);
  const ok = result.syntaxErrors.length === 0 && result.typeErrors.length === 0;
  return { ...result, js: ok ? toJavaScript(code) : null };
}
