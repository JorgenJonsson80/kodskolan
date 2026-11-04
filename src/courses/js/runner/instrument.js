// Skriver om elevens kod så att den kan köras rad för rad. Före varje
// sats läggs ett anrop in som sparar radnumret och variablernas värden:
//   const total = a + b;
//     → __trace(3, [['a', () => a], ['b', () => b], ['total', () => total]]);
//       const total = a + b;
// Variablerna läses med små funktioner, så att de läses just när raden
// ska köras. En variabel som inte skapats än kastar fel och hoppas över.
// Loopar och if utan { } får klamrar, och arrow functions som
// n => n * 2 blir n => (__trace(…), n * 2), så att varje varv syns.
import { parse } from '@babel/parser';

// Satser som inte är värda ett eget steg. import och export lämnas också,
// eftersom modulsystemet läser dem rad för rad.
const NO_STEP = new Set([
  'FunctionDeclaration',
  'ClassDeclaration',
  'EmptyStatement',
  'ImportDeclaration',
  'ExportNamedDeclaration',
  'ExportDefaultDeclaration',
  'ExportAllDeclaration',
]);

const FUNCTIONS = new Set([
  'FunctionDeclaration',
  'FunctionExpression',
  'ArrowFunctionExpression',
  'ObjectMethod',
  'ClassMethod',
  'ClassPrivateMethod',
]);

const SKIPPED_KEYS = new Set([
  'loc',
  'start',
  'end',
  'extra',
  'leadingComments',
  'trailingComments',
  'innerComments',
]);

// Alla namn som ett mönster skapar, t.ex. const { a, b: [c] } = …
function patternNames(node, names = []) {
  if (!node) return names;
  switch (node.type) {
    case 'Identifier':
      names.push(node.name);
      break;
    case 'ObjectPattern':
      for (const property of node.properties) {
        patternNames(
          property.type === 'RestElement' ? property.argument : property.value,
          names,
        );
      }
      break;
    case 'ArrayPattern':
      for (const element of node.elements) patternNames(element, names);
      break;
    case 'RestElement':
      patternNames(node.argument, names);
      break;
    case 'AssignmentPattern':
      patternNames(node.left, names);
      break;
  }
  return names;
}

function declaredNames(node) {
  if (node?.type !== 'VariableDeclaration') return [];
  return node.declarations.flatMap(declaration => patternNames(declaration.id));
}

// after: kod som körs sist, före sista steget, utan egna steg. Används
// för att anropa elevens funktioner med ett exempel.
export function instrument(code, { after = '' } = {}) {
  const ast = parse(code, { sourceType: 'module', plugins: ['jsx'] });
  const edits = [];
  // Namnen i varje scope, från det yttersta till det innersta.
  const scopes = [];

  const insert = (pos, text) => edits.push({ pos, text });

  // Inre variabler går före yttre med samma namn.
  function getters() {
    const names = [...new Set(scopes.flat().reverse())].reverse();
    return `[${names.map(name => `[${JSON.stringify(name)},()=>${name}]`).join(',')}]`;
  }

  const trace = node => `__trace(${node.loc.start.line},${getters()});`;

  function visitStatements(statements) {
    scopes.push(statements.flatMap(declaredNames));
    for (const statement of statements) {
      if (!NO_STEP.has(statement.type))
        insert(statement.start, trace(statement));
      visit(statement);
    }
  }

  // Kroppen i en loop eller if. Utan { } får den klamrar, så att det
  // finns plats för ett steg.
  function visitBody(body) {
    if (body.type === 'BlockStatement') return visit(body);
    if (body.type === 'EmptyStatement') return;
    insert(body.start, `{${trace(body)}`);
    visit(body);
    insert(body.end, '}');
  }

  function visitFunction(node) {
    scopes.push(node.params.flatMap(param => patternNames(param)));
    for (const param of node.params) visit(param);
    if (node.body.type === 'BlockStatement') {
      visit(node.body);
    } else {
      insert(
        node.body.start,
        `(__trace(${node.body.loc.start.line},${getters()}),`,
      );
      visit(node.body);
      insert(node.body.end, ')');
    }
    scopes.pop();
  }

  function visit(node) {
    if (!node || typeof node.type !== 'string') return;

    if (FUNCTIONS.has(node.type)) return visitFunction(node);

    switch (node.type) {
      case 'BlockStatement':
        visitStatements(node.body);
        scopes.pop();
        return;
      case 'SwitchStatement':
        visit(node.discriminant);
        for (const switchCase of node.cases) {
          visit(switchCase.test);
          visitStatements(switchCase.consequent);
          scopes.pop();
        }
        return;
      case 'IfStatement':
        visit(node.test);
        visitBody(node.consequent);
        if (node.alternate?.type === 'IfStatement') visit(node.alternate);
        else if (node.alternate) visitBody(node.alternate);
        return;
      case 'ForStatement':
      case 'ForInStatement':
      case 'ForOfStatement':
        scopes.push(declaredNames(node.init ?? node.left));
        visit(node.init);
        visit(node.test);
        visit(node.update);
        visit(node.left);
        visit(node.right);
        visitBody(node.body);
        scopes.pop();
        return;
      case 'WhileStatement':
      case 'DoWhileStatement':
        visit(node.test);
        visitBody(node.body);
        return;
      case 'CatchClause':
        scopes.push(patternNames(node.param));
        visit(node.body);
        scopes.pop();
        return;
    }

    for (const [key, value] of Object.entries(node)) {
      if (SKIPPED_KEYS.has(key)) continue;
      if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === 'object') visit(value);
    }
  }

  visitStatements(ast.program.body);
  // Sista steget: läget när all kod har körts.
  insert(code.length, `\n${after}\n__trace(null,${getters()});`);
  scopes.pop();

  // Flera tillägg på samma plats sätts in i den ordning de skapades.
  // Bakifrån, så att positionerna framför inte flyttas.
  const byPosition = new Map();
  for (const { pos, text } of edits) {
    byPosition.set(pos, (byPosition.get(pos) ?? '') + text);
  }
  let result = code;
  for (const pos of [...byPosition.keys()].sort((a, b) => b - a)) {
    result = result.slice(0, pos) + byPosition.get(pos) + result.slice(pos);
  }
  return result;
}
