// TypeScripts felmeddelanden förklarade på svenska. Felets nummer (code)
// är detsamma i alla versioner, så det används i första hand. Meddelandet
// står kvar på engelska under förklaringen, så att eleven lär sig känna
// igen det och kan söka på det.

const q = text => `\`${text}\``;

// Ett typnamn som eleven känner igen: 'string' blir text osv.
const TYPE_WORDS = {
  string: 'text',
  number: 'ett tal',
  boolean: 'sant eller falskt',
  undefined: '`undefined` (inget värde)',
  null: '`null` (inget värde)',
};
const typeWord = type => TYPE_WORDS[type] ?? q(type);

const RULES = [
  [
    2322,
    /^Type '(.+?)' is not assignable to type '(.+?)'/,
    ([, got, wanted]) =>
      `Typerna passar inte: här ska det vara ${typeWord(wanted)}, men värdet är ${typeWord(got)}.`,
  ],
  [
    2345,
    /^Argument of type '(.+?)' is not assignable to parameter of type '(.+?)'/,
    ([, got, wanted]) =>
      `Funktionen vill ha ${typeWord(wanted)} här, men får ${typeWord(got)}.`,
  ],
  [
    2339,
    /^Property '(.+?)' does not exist on type '(.+?)'/,
    ([, name, type]) =>
      `${q(type)} har ingen egenskap som heter ${q(name)}. Är den felstavad, eller saknas den i typen?`,
  ],
  [
    2551,
    /^Property '(.+?)' does not exist on type '.+?'. Did you mean '(.+?)'/,
    ([, name, suggestion]) =>
      `Det finns ingen ${q(name)}. Menade du ${q(suggestion)}?`,
  ],
  [
    2552,
    /^Cannot find name '(.+?)'. Did you mean '(.+?)'/,
    ([, name, suggestion]) =>
      `Namnet ${q(name)} finns inte. Menade du ${q(suggestion)}?`,
  ],
  [
    2304,
    /^Cannot find name '(.+?)'/,
    ([, name]) =>
      `Namnet ${q(name)} finns inte. Är det felstavat, eller används det innan det skapats?`,
  ],
  [
    7006,
    /^Parameter '(.+?)' implicitly has an '(.+?)' type/,
    ([, name]) =>
      `Parametern ${q(name)} saknar typ. Skriv vad den ska vara, t.ex. ${q(`${name}: number`)}.`,
  ],
  [
    7031,
    /^Binding element '(.+?)' implicitly has an 'any' type/,
    ([, name]) =>
      `${q(name)} saknar typ. Ge hela objektet en typ, t.ex. ${q('{ namn }: Props')}.`,
  ],
  [
    18047,
    /^'(.+?)' is possibly 'null'/,
    ([, name]) =>
      `${q(name)} kan vara \`null\`. Kolla det först, t.ex. med \`if (${name})\` eller \`?.\`.`,
  ],
  [
    18048,
    /^'(.+?)' is possibly 'undefined'/,
    ([, name]) =>
      `${q(name)} kan vara \`undefined\`. Kolla det först, t.ex. med \`if (${name})\`, \`?.\` eller \`??\`.`,
  ],
  [
    2532,
    /^Object is possibly 'undefined'/,
    () =>
      'Värdet kan vara `undefined`. Kolla det först, eller använd `?.` eller `??`.',
  ],
  [
    18046,
    /^'(.+?)' is of type 'unknown'/,
    ([, name]) =>
      `${q(name)} är \`unknown\`: TypeScript vet inte vad det är. Kolla typen först, t.ex. med \`typeof\`.`,
  ],
  [
    2741,
    /^Property '(.+?)' is missing in type '.+?' but required in type '(.+?)'/,
    ([, name, type]) => `${q(name)} saknas, men ${q(type)} kräver den.`,
  ],
  [
    2739,
    /^Type '.+?' is missing the following properties from type '(.+?)': (.+)/,
    ([, type, names]) => `${q(type)} kräver också ${names}.`,
  ],
  [
    2353,
    /^Object literal may only specify known properties, and '(.+?)' does not exist in type '(.+?)'/,
    ([, name, type]) =>
      `${q(type)} har ingen ${q(name)}. Är den felstavad, eller ska den läggas till i typen?`,
  ],
  [
    2554,
    /^Expected (\d+) arguments?, but got (\d+)/,
    ([, wanted, got]) =>
      `Funktionen vill ha ${wanted} ${wanted === '1' ? 'värde' : 'värden'}, men får ${got}.`,
  ],
  [
    2555,
    /^Expected at least (\d+) arguments?, but got (\d+)/,
    ([, wanted, got]) =>
      `Funktionen vill ha minst ${wanted} ${wanted === '1' ? 'värde' : 'värden'}, men får ${got}.`,
  ],
  [
    2588,
    /^Cannot assign to '(.+?)' because it is a constant/,
    ([, name]) =>
      `${q(name)} är skapad med \`const\` och kan inte få ett nytt värde. Använd \`let\` om den ska ändras.`,
  ],
  [
    2540,
    /^Cannot assign to '(.+?)' because it is a read-only property/,
    ([, name]) => `${q(name)} är \`readonly\` och kan inte ändras.`,
  ],
  [
    2542,
    /^Index signature in type '.+?' only permits reading/,
    () => 'Listan är `readonly`, så den går bara att läsa, inte ändra.',
  ],
  [
    2366,
    /^Function lacks ending return statement/,
    () =>
      'Funktionen lovar att returnera ett värde, men det finns en väg genom den som inte gör det.',
  ],
  [
    2355,
    /^A function whose declared type is neither/,
    () => 'Funktionen lovar att returnera ett värde, men har ingen `return`.',
  ],
  [
    2367,
    /^This comparison appears to be unintentional because the types '(.+?)' and '(.+?)' have no overlap/,
    ([, a, b]) =>
      `Jämförelsen kan aldrig bli sann: ${typeWord(a)} kan aldrig vara ${typeWord(b)}.`,
  ],
  [
    2349,
    /^This expression is not callable/,
    () => 'Det här är ingen funktion, så det går inte att anropa med `( )`.',
  ],
  [
    2769,
    /^No overload matches this call/,
    () =>
      'Ingen variant av funktionen passar de värden du skickar in. Läs raderna under för vad som skiljer.',
  ],
  [
    2307,
    /^Cannot find module '(.+?)'/,
    ([, name]) => `Paketet eller filen ${q(name)} finns inte här.`,
  ],
  [
    2365,
    /^Operator '(.+?)' cannot be applied to types '(.+?)' and '(.+?)'/,
    ([, op, a, b]) =>
      `${q(op)} fungerar inte mellan ${typeWord(a)} och ${typeWord(b)}.`,
  ],
  [
    2362,
    /^The left-hand side of an arithmetic operation/,
    () => 'Det till vänster i uträkningen är inget tal.',
  ],
  [
    2363,
    /^The right-hand side of an arithmetic operation/,
    () => 'Det till höger i uträkningen är inget tal.',
  ],
  [
    2678,
    /^Type '(.+?)' is not comparable to type '(.+?)'/,
    ([, a, b]) => `${typeWord(a)} kan aldrig vara ${typeWord(b)}.`,
  ],
  [
    2344,
    /^Type '(.+?)' does not satisfy the constraint '(.+?)'/,
    ([, type, constraint]) =>
      `${q(type)} uppfyller inte kravet: typen måste passa ${q(constraint)}.`,
  ],
  [
    2314,
    /^Generic type '(.+?)' requires (\d+) type argument/,
    ([, type, count]) =>
      `${q(type)} behöver ${count} ${count === '1' ? 'typ' : 'typer'} inom \`< >\`.`,
  ],
  [
    2300,
    /^Duplicate identifier '(.+?)'/,
    ([, name]) => `${q(name)} finns redan. Två saker kan inte heta samma.`,
  ],
  [
    2451,
    /^Cannot redeclare block-scoped variable '(.+?)'/,
    ([, name]) => `Variabeln ${q(name)} är redan skapad. Ta bort den ena.`,
  ],
  [
    2448,
    /^Block-scoped variable '(.+?)' used before its declaration/,
    ([, name]) => `${q(name)} används innan den skapas. Flytta ner raden.`,
  ],
  [
    2564,
    /^Property '(.+?)' has no initializer/,
    ([, name]) =>
      `${q(name)} får inget värde. Ge den ett i \`constructor\` eller direkt.`,
  ],
  [
    2693,
    /^'(.+?)' only refers to a type, but is being used as a value here/,
    ([, name]) =>
      `${q(name)} är en typ, inte ett värde. Typer finns bara när koden kontrolleras och går inte att köra.`,
  ],
  [
    2749,
    /^'(.+?)' refers to a value, but is being used as a type here/,
    ([, name]) =>
      `${q(name)} är ett värde, inte en typ. Menade du ${q(`typeof ${name}`)}?`,
  ],
  [
    7053,
    /^Element implicitly has an 'any' type because expression of type '(.+?)' can't be used to index type '(.+?)'/,
    ([, key, type]) =>
      `${typeWord(key)} går inte att använda som nyckel i ${q(type)}. Prova \`keyof\` eller \`Record\`.`,
  ],
  [
    1005,
    /^'(.+?)' expected/,
    ([, token]) => `Det saknas ${q(token)} här. Kolla raden, och raden före.`,
  ],
  [
    1128,
    /^Declaration or statement expected/,
    () => 'Något står på fel ställe, ofta en `}` för mycket.',
  ],
  [
    1109,
    /^Expression expected/,
    () => 'Det saknas ett värde här, t.ex. efter `=` eller ett `,`.',
  ],
  [
    1002,
    /^Unterminated string literal/,
    () => 'Texten tar aldrig slut. Det saknas ett citattecken.',
  ],
  [
    17004,
    /^Cannot use JSX unless/,
    () => 'JSX fungerar bara i en React-övning.',
  ],
];

// Ett fel från körningen (JS-kursens worker), inte från kompilatorn.
const RUNTIME = [
  [
    /is not a function/,
    'Det här är ingen funktion. TypeScript kan inte se allt, t.ex. data från `fetch` eller `any`.',
  ],
  [
    /Cannot read properties of (undefined|null)/,
    'Värdet var `undefined` eller `null` när koden kördes. Har typen ett `any` eller ett `!` som lurade TypeScript?',
  ],
];

export function explainTsError(message, code) {
  for (const [number, pattern, explain] of RULES) {
    if (code !== undefined && code !== number) continue;
    const match = message.match(pattern);
    if (match) return explain(match);
  }
  for (const [pattern, text] of RUNTIME) {
    if (pattern.test(message)) return text;
  }
  return null;
}

export function errorTitle(error, isSyntax) {
  if (isSyntax) return 'Koden går inte att läsa';
  return error?.type === 'TypeError' && error.tsCode
    ? 'TypeScript hittade ett typfel'
    : 'Koden stoppade med ett fel';
}

export function explainError(error) {
  return (
    explainTsError(error.tsMessage ?? error.message, error.tsCode) ??
    (error.tsCode
      ? 'Läs meddelandet nedan: det säger vilken typ TypeScript väntade sig och vilken den fick.'
      : 'Läs felmeddelandet nedan. Det säger vad som gick fel, och ofta på vilken rad.')
  );
}
