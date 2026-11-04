// Läser syntaxträdet från CodeMirror och svarar på två frågor:
// "vad är det här och vad tillhör det?" (hover) och
// "vilka egenskaper har det här objektet?" (förslag efter en punkt).

const GLOBALS = {
  console: 'utskrifter och felsökning',
  Math: 'matematik',
  JSON: 'att göra om data till och från text',
  Object: 'att jobba med objekt',
  Array: 'att jobba med arrayer',
  Number: 'att jobba med tal',
  String: 'att jobba med strängar',
  Promise: 'asynkron kod',
  Date: 'datum och tid',
  document: 'sidan i webbläsaren',
  window: 'webbläsarfönstret',
  localStorage: 'att spara data i webbläsaren',
  React: 'React',
  Map: 'nyckel–värde-par där nyckeln kan vara vad som helst',
  Set: 'samlingar utan dubbletter',
  Error: 'att skapa fel som kan kastas med `throw`',
  setTimeout: 'att köra kod efter en stund',
  fetch: 'att hämta data från nätet',
  parseInt: 'att göra om text till ett heltal',
};

// Nyckelord och värden, med fokus på när man använder dem.
const WORDS = {
  const:
    'Skapar en variabel som inte kan tilldelas om. Använd den som standard.',
  let: 'Skapar en variabel som kan få ett nytt värde senare, t.ex. en räknare.',
  var: 'Det gamla sättet att skapa variabler. Använd `const` eller `let` i stället.',
  function:
    'Skapar en funktion – kod med ett namn som du kan köra många gånger.',
  return: 'Skickar tillbaka ett värde från funktionen och avslutar den.',
  if: 'Kör koden bara om villkoret är sant.',
  else: 'Körs när villkoret i `if` inte är sant.',
  for: 'En loop som upprepar kod, t.ex. en gång per element.',
  of: '`for...of` går igenom värdena i en array eller sträng.',
  in: '`for...in` går igenom nycklarna i ett objekt.',
  while: 'Upprepar koden så länge villkoret är sant.',
  break: 'Avbryter loopen direkt.',
  continue: 'Hoppar till nästa varv i loopen.',
  new: 'Skapar ett nytt objekt från en klass, t.ex. `new Map()`.',
  async: 'Gör funktionen asynkron, så att du kan använda `await` i den.',
  await: 'Väntar på att ett Promise blir klart och ger dig resultatet.',
  typeof: "Ger typen som text, t.ex. `'string'` eller `'number'`.",
  import: 'Hämtar kod från en annan fil eller ett paket.',
  export: 'Gör koden tillgänglig för andra filer som importerar den.',
  default: 'Det som importeras när man inte skriver `{ }` runt namnet.',
  class: 'En mall för att skapa objekt med samma egenskaper och metoder.',
  throw: 'Kastar ett fel som stoppar koden, om det inte fångas med `try`.',
  try: 'Kör kod som kan kasta fel – felet hamnar i `catch`.',
  catch: 'Fångar felet från `try` så att programmet inte kraschar.',
  null: 'Betyder "inget värde" – sätts med flit.',
  BooleanLiteral: 'Ett sant/falskt-värde. Används i villkor som `if`.',
  String: 'En sträng – text inom citattecken.',
  TemplateString:
    'En template literal. Med `${ }` stoppar du in värden i texten.',
  Number: 'Ett tal.',
  Arrow:
    'En arrow-funktion. Kort sätt att skriva en funktion, t.ex. i `.map()`.',
  LineComment: 'En kommentar. Den körs inte – den är till för människor.',
  BlockComment: 'En kommentar. Den körs inte – den är till för människor.',
  '?.': 'Optional chaining – ger `undefined` i stället för fel om det till vänster saknas.',
};

const OPERATORS = {
  '===': 'Är lika med – både värde och typ måste stämma.',
  '!==': 'Är inte lika med – värde eller typ skiljer sig.',
  '==': 'Lös jämförelse som gör om typer. Använd hellre `===`.',
  '!=': 'Lös jämförelse som gör om typer. Använd hellre `!==`.',
  '&&': 'Och – sant bara om båda sidor är sanna. I JSX: visa något bara om villkoret är sant.',
  '||': 'Eller – sant om minst en sida är sann.',
  '??': 'Ger högra sidan bara om vänstra är `null` eller `undefined`.',
  '!': 'Inte – vänder sant till falskt och tvärtom.',
  '?': 'Villkorsoperatorn: `villkor ? omSant : omFalskt`.',
  '+': 'Plus – adderar tal eller sätter ihop strängar.',
  '%': 'Rest vid division, t.ex. `7 % 2` blir 1. Bra för att hitta jämna tal.',
  '++': 'Ökar variabeln med 1.',
  '--': 'Minskar variabeln med 1.',
  '+=': 'Lägger till på variabeln: `x += 2` är samma som `x = x + 2`.',
};

const KIND_LABELS = {
  object: 'ett objekt',
  array: 'en array',
  string: 'en sträng',
  number: 'ett tal',
  boolean: 'en boolean',
  function: 'en funktion',
  jsx: 'JSX',
};

const VALUE_KINDS = {
  ObjectExpression: 'object',
  ArrayExpression: 'array',
  String: 'string',
  TemplateString: 'string',
  Number: 'number',
  BooleanLiteral: 'boolean',
  ArrowFunction: 'function',
  FunctionExpression: 'function',
  JSXElement: 'jsx',
  JSXFragment: 'jsx',
};

const SCOPE_NODES = new Set([
  'Script',
  'Block',
  'ForStatement',
  'ArrowFunction',
  'FunctionDeclaration',
  'FunctionExpression',
]);

export const ARRAY_METHODS = ownMethods(Array.prototype);
export const STRING_METHODS = ownMethods(String.prototype);

function ownMethods(proto) {
  return Object.getOwnPropertyNames(proto).filter(
    name =>
      name !== 'constructor' &&
      !name.startsWith('__') &&
      typeof Object.getOwnPropertyDescriptor(proto, name).value === 'function',
  );
}

const text = (src, node) => src.slice(node.from, node.to);
const lineOf = (src, pos) => src.slice(0, pos).split('\n').length;
const code = value => `\`${value}\``;

function nodeAfterEquals(node) {
  for (let child = node.firstChild; child; child = child.nextSibling) {
    if (child.name === 'Equals') return child.nextSibling;
  }
  return null;
}

function scopeOf(definition) {
  // En parameter syns i hela sin funktion, medan funktionens eget namn
  // syns utanför den.
  const parent = definition.parent;
  let node =
    parent?.name === 'FunctionDeclaration' ||
    parent?.name === 'ClassDeclaration'
      ? parent.parent
      : parent;
  while (node && !SCOPE_NODES.has(node.name)) node = node.parent;
  return node;
}

// Hittar deklarationen som ett namn på plats `pos` syftar på. Inre scope
// vinner över yttre, så en parameter `x` går före en global `x`.
export function findDefinition(tree, src, name, pos) {
  let best = null;
  tree.iterate({
    enter(ref) {
      if (ref.name !== 'VariableDefinition' || text(src, ref) !== name) return;
      const node = ref.node;
      const scope = scopeOf(node);
      if (!scope || pos < scope.from || pos > scope.to) return;
      if (!best || scope.from >= best.scope.from) best = { node, scope };
    },
  });
  return best?.node ?? null;
}

// Vad en deklarerad variabel innehåller, om det går att se direkt i koden.
export function valueOf(definition) {
  if (definition?.parent?.name !== 'VariableDeclaration') return null;
  if (definition.nextSibling?.name !== 'Equals') return null;
  return definition.nextSibling.nextSibling;
}

function kindOfValue(value) {
  if (!value) return null;
  return VALUE_KINDS[value.name] ?? null;
}

function kindOfReceiver(tree, src, receiver) {
  if (VALUE_KINDS[receiver.name]) return VALUE_KINDS[receiver.name];
  if (receiver.name !== 'VariableName') return null;
  const definition = findDefinition(
    tree,
    src,
    text(src, receiver),
    receiver.from,
  );
  return kindOfValue(valueOf(definition));
}

function objectLiteralOf(tree, src, receiver) {
  if (receiver.name === 'ObjectExpression') return receiver;
  if (receiver.name === 'VariableName') {
    const definition = findDefinition(
      tree,
      src,
      text(src, receiver),
      receiver.from,
    );
    const value = valueOf(definition);
    return value?.name === 'ObjectExpression' ? value : null;
  }
  if (receiver.name === 'MemberExpression') {
    // user.address.city: leta upp `address` inuti objektet `user`.
    const inner = receiver.firstChild;
    const property = receiver.lastChild;
    const object = objectLiteralOf(tree, src, inner);
    const value = object && propertyValue(src, object, text(src, property));
    return value?.name === 'ObjectExpression' ? value : null;
  }
  return null;
}

function propertiesOf(src, objectNode) {
  const properties = [];
  for (let child = objectNode.firstChild; child; child = child.nextSibling) {
    if (child.name !== 'Property') continue;
    const key = child.firstChild;
    if (key?.name !== 'PropertyDefinition') continue;
    properties.push({
      name: text(src, key),
      value: key.nextSibling?.nextSibling,
    });
  }
  return properties;
}

function propertyValue(src, objectNode, name) {
  return (
    propertiesOf(src, objectNode).find(p => p.name === name)?.value ?? null
  );
}

// Namnet som ett objekt-literal sparas i, t.ex. `user` eller `user.address`.
function ownerName(src, objectNode) {
  const parent = objectNode.parent;
  if (parent?.name === 'VariableDeclaration') {
    const definition = parent.getChild('VariableDefinition');
    return definition ? text(src, definition) : null;
  }
  if (parent?.name === 'Property') {
    const outer = ownerName(src, parent.parent);
    const key = parent.firstChild;
    return outer && key ? `${outer}.${text(src, key)}` : null;
  }
  return null;
}

function shortValue(src, value) {
  if (!value) return null;
  const valueText = text(src, value);
  return valueText.length <= 30 && !valueText.includes('\n') ? valueText : null;
}

function functionName(src, fn) {
  const own = fn.getChild('VariableDefinition');
  if (own) return text(src, own);
  if (fn.parent?.name === 'VariableDeclaration') {
    const definition = fn.parent.getChild('VariableDefinition');
    if (definition) return text(src, definition);
  }
  return null;
}

function describeDefinition(src, definition) {
  const name = text(src, definition);
  const line = lineOf(src, definition.from);
  const parent = definition.parent;

  if (parent.name === 'ParamList') {
    const fn = parent.parent;
    const fnName = functionName(src, fn);
    if (fnName) return `Parameter till funktionen ${code(fnName)}.`;
    const call = fn.parent?.name === 'ArgList' ? fn.parent.parent : null;
    const callee = call?.firstChild;
    if (callee?.name === 'MemberExpression') {
      return `Parameter i callbacken till ${code(`.${text(src, callee.lastChild)}()`)}.`;
    }
    return 'Parameter till en funktion.';
  }

  if (parent.name === 'PatternProperty' || parent.name === 'ArrayPattern') {
    const pattern = parent.name === 'ArrayPattern' ? parent : parent.parent;
    const holder = pattern.parent;
    if (holder?.name === 'ParamList') {
      const fnName = functionName(src, holder.parent);
      return `Plockad ur första argumentet${fnName ? ` till ${code(fnName)}` : ''} med destructuring.`;
    }
    const source =
      holder?.name === 'VariableDeclaration' && nodeAfterEquals(holder);
    return source
      ? `Plockad ur ${code(text(src, source))} med destructuring (rad ${line}).`
      : `Skapad med destructuring på rad ${line}.`;
  }

  if (parent.name === 'ForOfSpec') {
    const list = definition.nextSibling?.nextSibling;
    return list
      ? `Ett element i taget ur ${code(text(src, list))} i for...of-loopen.`
      : 'Variabel i en for...of-loop.';
  }

  if (parent.name === 'ImportGroup' || parent.name === 'ImportDeclaration') {
    const from = parent.name === 'ImportGroup' ? parent.parent : parent;
    const module = from.getChild('String');
    return `Importerad${module ? ` från ${text(src, module)}` : ''}.`;
  }

  if (
    parent.name === 'FunctionDeclaration' ||
    parent.name === 'ClassDeclaration'
  ) {
    return `${parent.name === 'ClassDeclaration' ? 'Klass' : 'Funktion'} som deklareras på rad ${line}.`;
  }

  if (parent.name === 'VariableDeclaration') {
    const keyword = parent.firstChild ? text(src, parent.firstChild) : 'const';
    const value = valueOf(definition);
    const kind = kindOfValue(value);
    let about = `Variabel som skapas med ${code(keyword)} på rad ${line}.`;
    if (kind) about += ` Den innehåller ${KIND_LABELS[kind]}.`;
    else if (value?.name === 'CallExpression') {
      about += ` Den får det som ${code(text(src, value.firstChild) + '()')} returnerar.`;
    }
    return about;
  }

  return `${code(name)} skapas på rad ${line}.`;
}

function describeProperty(tree, src, member, propertyNode) {
  const name = text(src, propertyNode);
  const receiver = member.firstChild;
  const receiverText = text(src, receiver);
  const title = `${receiverText.length <= 24 ? receiverText : '…'}.${name}`;

  if (receiver.name === 'VariableName' && GLOBALS[receiverText]) {
    return {
      title,
      body: `${code(name)} tillhör det inbyggda objektet ${code(receiverText)}, som används till ${GLOBALS[receiverText]}.`,
    };
  }

  const object = objectLiteralOf(tree, src, receiver);
  if (object) {
    const value = propertyValue(src, object, name);
    const shown = shortValue(src, value);
    return {
      title,
      body: value
        ? `Egenskapen ${code(name)} i objektet ${code(receiverText)}.${shown ? ` Värde: ${code(shown)}` : ''}`
        : `Objektet ${code(receiverText)} har ingen egenskap ${code(name)}, så du får \`undefined\`.`,
    };
  }

  const kind = kindOfReceiver(tree, src, receiver);
  const isArrayMethod = ARRAY_METHODS.includes(name);
  const isStringMethod = STRING_METHODS.includes(name);
  if (kind === 'array' && (isArrayMethod || name === 'length')) {
    return {
      title,
      body: `${code(name)} tillhör arrayen ${code(receiverText)}. Alla arrayer har den.`,
    };
  }
  if (kind === 'string' && (isStringMethod || name === 'length')) {
    return {
      title,
      body: `${code(name)} tillhör strängen ${code(receiverText)}. Alla strängar har den.`,
    };
  }
  if (isArrayMethod && isStringMethod) {
    return {
      title,
      body: `${code(name)} finns på både arrayer och strängar. Här anropas den på ${code(receiverText)}.`,
    };
  }
  if (isArrayMethod) {
    return {
      title,
      body: `${code(name)} är en array-metod, så ${code(receiverText)} bör vara en array.`,
    };
  }
  if (isStringMethod) {
    return {
      title,
      body: `${code(name)} är en strängmetod, så ${code(receiverText)} bör vara en sträng.`,
    };
  }
  return {
    title,
    body: `Egenskapen ${code(name)} tillhör ${code(receiverText)}.`,
  };
}

// Svaret som visas när man hovrar över koden på plats `pos`, plus var
// ordet börjar och slutar så att tooltipen hamnar rätt.
export function describeAt(tree, src, pos, side = 1) {
  const node = tree.resolveInner(pos, side);
  const info = describeNode(tree, src, node);
  return info && { ...info, from: node.from, to: node.to };
}

function describeNode(tree, src, node) {
  if (
    node.name === 'PropertyName' &&
    node.parent?.name === 'MemberExpression'
  ) {
    return describeProperty(tree, src, node.parent, node);
  }

  if (node.name === 'PropertyDefinition') {
    const owner = ownerName(src, node.parent.parent);
    const name = text(src, node);
    return {
      title: owner ? `${owner}.${name}` : name,
      body: owner
        ? `Egenskapen ${code(name)} tillhör objektet ${code(owner)}.`
        : `Egenskapen ${code(name)} tillhör det här objektet.`,
    };
  }

  if (node.name === 'VariableDefinition') {
    return { title: text(src, node), body: describeDefinition(src, node) };
  }

  if (node.name === 'VariableName') {
    const name = text(src, node);
    const definition = findDefinition(tree, src, name, node.from);
    if (definition)
      return { title: name, body: describeDefinition(src, definition) };
    if (GLOBALS[name]) {
      return {
        title: name,
        body: `Inbyggt i JavaScript – används till ${GLOBALS[name]}.`,
      };
    }
    if (name === 'undefined') {
      return {
        title: name,
        body: 'Betyder att ett värde saknas, t.ex. en egenskap som inte finns.',
      };
    }
    return {
      title: name,
      body: `Hittar ingen deklaration av ${code(name)} i din kod.`,
    };
  }

  if (node.name === 'Spread') {
    const inPattern = ['ParamList', 'ObjectPattern', 'ArrayPattern'].includes(
      node.parent?.name,
    );
    return {
      title: '...',
      body: inPattern
        ? 'Rest – samlar resten av värdena i en egen variabel.'
        : 'Spread – kopierar in alla värden, t.ex. för att göra en ny array eller ett nytt objekt.',
    };
  }

  const tokenText = text(src, node);
  if (/Op$/.test(node.name) && OPERATORS[tokenText]) {
    return { title: tokenText, body: OPERATORS[tokenText] };
  }

  const word = WORDS[node.name];
  if (word) {
    const title =
      tokenText.length <= 24 && !tokenText.includes('\n')
        ? tokenText
        : node.name;
    return { title, body: word };
  }

  return null;
}

// Förslag efter `något.`: egenskaperna i ett objekt, eller array- och
// strängmetoder när det syns vad variabeln innehåller.
export function memberOptionsFor(tree, src, receiver) {
  const object = objectLiteralOf(tree, src, receiver);
  if (object) {
    return propertiesOf(src, object).map(property => ({
      label: property.name,
      type: kindOfValue(property.value) === 'function' ? 'method' : 'property',
      detail: `i ${text(src, receiver)}`,
    }));
  }
  const kind = kindOfReceiver(tree, src, receiver);
  const methods = { array: ARRAY_METHODS, string: STRING_METHODS }[kind];
  if (!methods) return null;
  return [
    {
      label: 'length',
      type: 'property',
      detail: kind === 'array' ? 'array' : 'sträng',
    },
    ...methods.map(name => ({
      label: name,
      type: 'method',
      detail: kind === 'array' ? 'array' : 'sträng',
    })),
  ];
}
