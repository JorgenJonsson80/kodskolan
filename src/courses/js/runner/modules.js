// Ett litet modulsystem för övningarna. new Function förstår inte
// import och export, så de skrivs om till anrop av hjälpfunktioner:
//   import add, { sum as total } from './math.js'
//     → const add = __import('./math.js', 'default'); const total = ...
//   export const x = 1  → const x = 1  + __export('x', () => x)
// Exporterna läses via getters, så som i riktiga moduler ser den som
// importerar alltid det aktuella värdet.

import { transformJsx } from './jsx';

const NAME = '[A-Za-z_$][\\w$]*';

function normalizePath(path) {
  return path.replace(/^\.\//, '').replace(/\.jsx?$/, '');
}

function parseImportClause(clause, path) {
  const source = JSON.stringify(path);
  const namespace = clause.match(new RegExp(`^\\*\\s*as\\s+(${NAME})$`));
  if (namespace) return [`const ${namespace[1]} = __require(${source});`];

  const named = clause.match(/\{([\s\S]*)\}/);
  const defaultName = clause
    .replace(/\{[\s\S]*\}/, '')
    .replace(/,/g, '')
    .trim();
  const lines = [];

  if (defaultName) {
    lines.push(`const ${defaultName} = __import(${source}, 'default');`);
  }
  if (named) {
    for (const part of named[1].split(',')) {
      const [imported, local = imported] = part.trim().split(/\s+as\s+/);
      if (!imported) continue;
      lines.push(`const ${local} = __import(${source}, '${imported}');`);
    }
  }
  return lines;
}

export function transformModule(source) {
  const exported = [];

  let code = source
    // import './styles.css' – bara kör filen
    .replace(
      /^[ \t]*import\s+(['"])([^'"]+)\1[ \t]*;?/gm,
      (_, __, path) => `__require(${JSON.stringify(path)});`,
    )
    .replace(
      /^[ \t]*import\s+([^'";]+?)\s+from\s+(['"])([^'"]+)\2[ \t]*;?/gm,
      (_, clause, __, path) => parseImportClause(clause.trim(), path).join(' '),
    )
    // export default function App() { … } – behåll deklarationen
    .replace(
      new RegExp(
        `^([ \\t]*)export\\s+default\\s+((?:async\\s+)?function\\*?|class)\\s+(${NAME})`,
        'gm',
      ),
      (_, indent, keyword, name) => {
        exported.push(['default', name]);
        return `${indent}${keyword} ${name}`;
      },
    )
    .replace(/^([ \t]*)export\s+default\s+/gm, '$1__exports.default = ')
    .replace(
      new RegExp(
        `^([ \\t]*)export\\s+((?:const|let|var|class|(?:async\\s+)?function\\*?)\\s+)(${NAME})`,
        'gm',
      ),
      (_, indent, keyword, name) => {
        exported.push([name, name]);
        return `${indent}${keyword}${name}`;
      },
    )
    .replace(/^[ \t]*export\s*\{([^}]*)\}[ \t]*;?/gm, (_, list) => {
      for (const part of list.split(',')) {
        const [local, name = local] = part.trim().split(/\s+as\s+/);
        if (local) exported.push([name, local]);
      }
      return '';
    });

  if (/^[ \t]*(import|export)\b/m.test(code)) {
    throw new SyntaxError(
      'Den här formen av import eller export stöds inte i övningarna.',
    );
  }

  const exportLines = exported.map(
    ([name, local]) => `__export('${name}', () => ${local});`,
  );
  return `${exportLines.join(' ')}\n${code}`;
}

// Översätter både JSX och import/export.
export function compile(source) {
  return transformModule(transformJsx(source));
}

// Skapar ett modulsystem för filerna { 'math.js': '…' }.
// packages: paket som kan importeras utan ./, t.ex. { react: React }.
// globals: namn som all kod når, t.ex. { __React: React }.
export function createModuleSystem(
  files,
  { packages = {}, globals = {} } = {},
) {
  const sources = Object.fromEntries(
    Object.entries(files).map(([path, source]) => [
      normalizePath(path),
      source,
    ]),
  );
  const cache = {};

  function createExports() {
    const exports = {};
    const exportBinding = (name, read) =>
      Object.defineProperty(exports, name, { get: read, enumerable: true });
    return { exports, exportBinding };
  }

  function require(path) {
    if (!path.startsWith('.')) {
      if (path in packages) return packages[path];
      throw new Error(`Paketet '${path}' finns inte i den här övningen.`);
    }
    const key = normalizePath(path);
    if (cache[key]) return cache[key];
    if (!(key in sources)) {
      throw new Error(`Hittar ingen fil som heter '${path}'.`);
    }

    const { exports, exportBinding } = createExports();
    cache[key] = exports;
    run(compile(sources[key]), exports, exportBinding);
    return exports;
  }

  function importBinding(path, name) {
    const exports = require(path);
    if (name in exports) return exports[name];

    if (name === 'default') {
      throw new SyntaxError(
        `'${path}' har ingen default-export. Menade du import { … } from '${path}'?`,
      );
    }
    const hint =
      'default' in exports
        ? ` Filen har en default-export, den importeras utan { }.`
        : '';
    throw new SyntaxError(
      `'${path}' exporterar inget som heter '${name}'.${hint}`,
    );
  }

  function run(code, exports, exportBinding, extraCode = '') {
    return new Function(
      '__require',
      '__import',
      '__export',
      '__exports',
      ...Object.keys(globals),
      `${code}\n${extraCode}`,
    )(
      require,
      importBinding,
      exportBinding,
      exports,
      ...Object.values(globals),
    );
  }

  // Kör en fil med extra kod i samma scope, t.ex. ett testuttryck.
  // extraCode ska redan vara översatt med compile.
  function runFile(path, code, extraCode) {
    const { exports, exportBinding } = createExports();
    cache[normalizePath(path)] = exports;
    return run(compile(code), exports, exportBinding, extraCode);
  }

  return { require, runFile };
}
