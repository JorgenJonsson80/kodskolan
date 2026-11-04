// Stilkontroller som ger tips men inte underkänner koden.
import { parse } from '@babel/parser';

// Satser som brukar avslutas med ;. Funktioner, if och loopar med
// { } gör det inte.
const STATEMENTS = new Set([
  'ExpressionStatement',
  'VariableDeclaration',
  'ReturnStatement',
  'ThrowStatement',
  'BreakStatement',
  'ContinueStatement',
  'ImportDeclaration',
  'ExportAllDeclaration',
  'DoWhileStatement',
]);

function needsSemicolon(node, key) {
  // let i = 0 i for (let i = 0; …) och const x i for (const x of …)
  // avslutas av for-loopen.
  if (key === 'init' || key === 'left') return false;
  if (STATEMENTS.has(node.type)) return true;
  if (node.type === 'ExportNamedDeclaration') return !node.declaration;
  if (node.type === 'ExportDefaultDeclaration') {
    return !/Declaration$/.test(node.declaration.type);
  }
  return false;
}

// Hittar satser som slutar utan ;. braceLines är de som slutar med },
// t.ex. const add = () => { … } eller const user = { … }.
function findMissing(code) {
  const ast = parse(code, { sourceType: 'module', plugins: ['jsx'] });
  const lines = new Set();
  const braceLines = new Set();

  function visit(node, key) {
    if (!node || typeof node.type !== 'string') return;
    if (needsSemicolon(node, key) && code[node.end - 1] !== ';') {
      lines.add(node.loc.end.line);
      if (code[node.end - 1] === '}') braceLines.add(node.loc.end.line);
    }
    for (const [childKey, value] of Object.entries(node)) {
      if (childKey === 'loc' || childKey.endsWith('Comments')) continue;
      if (Array.isArray(value)) value.forEach(child => visit(child, childKey));
      else if (value && typeof value === 'object') visit(value, childKey);
    }
  }

  visit(ast.program, null);
  const sorted = set => [...set].sort((a, b) => a - b);
  return { lines: sorted(lines), braceLines: sorted(braceLines) };
}

// Returnerar raderna där en sats slutar utan ;, t.ex. [2, 4].
export function findMissingSemicolons(code) {
  return findMissing(code).lines;
}

function listLines(lines) {
  if (lines.length === 1) return `Rad ${lines[0]}`;
  if (lines.length <= 4) {
    return `Rad ${lines.slice(0, -1).join(', ')} och ${lines.at(-1)}`;
  }
  return `${lines.length} rader`;
}

// Tips som visas efter rättningen, oavsett om svaret var rätt.
// En sats som går över flera rader behöver bara ; på sista raden.
export function styleNotes(code) {
  const { lines, braceLines } = findMissing(code);
  if (lines.length === 0) return [];
  const notes = [
    `${listLines(lines)} saknar ; i slutet. En sats får gärna gå över flera rader, men den avslutas med ; på sista raden. JavaScript lägger ofta till det själv, men det är god vana att skriva det.`,
  ];
  if (braceLines.length > 0) {
    notes.push(
      `${listLines(braceLines)} slutar med } men är en tilldelning, t.ex. const add = () => { … } eller const user = { … }. Då ska ; stå efter }. En vanlig function add() { … } behöver inget ;.`,
    );
  }
  return notes;
}
