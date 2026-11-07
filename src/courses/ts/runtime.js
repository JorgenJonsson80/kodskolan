import { evaluateJs, runJs } from '../js/runtime';
import { isTsx } from './runner/checker';
import { explainTsError } from './runner/friendlyErrors';
import { checkTs } from './runner/ts';

// TypeScript rättas i två steg. Först kontrollerar kompilatorn typerna,
// och typtesterna körs (övningens typeTests, se checker.js). Är typerna
// rätt görs koden om till JavaScript och körs med JS-kursens rättning,
// som kollar vad koden gör. Ett typfel stoppar körningen, precis som när
// man bygger ett riktigt TypeScript-projekt.

// Det första felet med rad, och hur många fler det finns.
function firstError(errors, type, code) {
  const [first] = errors;
  const more = errors.length > 1 ? `\n(och ${errors.length - 1} fel till)` : '';
  return {
    type,
    tsCode: first.code,
    tsMessage: first.message,
    message: `Rad ${first.line}: ${first.message}${more}`,
    line: first.line,
    code,
  };
}

const emptyRun = {
  tests: [],
  output: [],
  console: [],
  previewSource: null,
};

// En rad i testlistan för ett typtest, i samma form som JS-kursens.
const typeTestResult = test => ({
  description: test.description,
  passed: test.passed,
  typeTest: true,
  fails: test.fails,
  message: test.message,
  tsCode: test.code,
});

// check och runTests byts ut i testerna i Node, se test/nodeTs.js.
export const createRunTs =
  ({ check, runTests }) =>
  async ({
    code,
    tests = [],
    typeTests = [],
    sourceChecks = [],
    preview,
    lessonPreview,
  }) => {
    const checked = await check(code, typeTests);
    if (checked.crashed) {
      return {
        ...emptyRun,
        syntaxError: null,
        error: { type: 'Error', message: checked.crashed, code },
      };
    }
    if (checked.syntaxErrors.length > 0) {
      return {
        ...emptyRun,
        syntaxError: firstError(checked.syntaxErrors, 'SyntaxError', code),
        error: null,
      };
    }
    if (checked.typeErrors.length > 0) {
      return {
        ...emptyRun,
        syntaxError: null,
        error: firstError(checked.typeErrors, 'TypeError', code),
        typeErrors: checked.typeErrors,
      };
    }

    const ran = await runJs(
      {
        code: checked.js,
        tests,
        fileName: isTsx(code) ? 'main.jsx' : 'main.js',
        preview,
        lessonPreview,
      },
      runTests,
    );
    return {
      ...ran,
      // Felet ska visa elevens kod, inte JavaScript-versionen.
      error: ran.error && { ...ran.error, code },
      syntaxError: ran.syntaxError && { ...ran.syntaxError, code },
      tests: [
        ...checked.typeTests.map(typeTestResult),
        ...(ran.tests ?? []),
        // Hur koden är skriven kollas på TypeScript-koden, inte på
        // JavaScript-versionen där typerna är borta.
        ...sourceChecks.map(check => {
          const found = check.pattern.test(code);
          return {
            description: check.description,
            passed: check.forbidden ? !found : found,
          };
        }),
      ],
    };
  };

export const runTs = createRunTs({ check: checkTs });

function typeTestText(result) {
  if (result.passed) return null;
  if (result.fails) {
    return 'det här ska ge ett typfel, men TypeScript godkände det. Gör typen strängare.';
  }
  const why = explainTsError(result.message ?? '', result.tsCode);
  return `TypeScript sa nej: ${why ?? result.message}`;
}

// JS-kursens feedback, med typtesternas rader och utan stiltipsen
// (semikolon och sådant är inte vad kursen handlar om).
export const evaluateTs = (lesson, code, raw) => {
  const feedback = evaluateJs(lesson.track)(lesson, code, raw);
  return {
    ...feedback,
    warnings: [],
    results: feedback.results.map((result, index) =>
      raw.tests[index]?.typeTest
        ? { ...result, text: typeTestText(raw.tests[index]), diff: null }
        : result,
    ),
  };
};
