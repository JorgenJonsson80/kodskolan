// Banorna i ordning. reward är föremålet eleven får när banan är klar, och
// canBuild avslutar meningen "Nu kan du t.ex. bygga …" i firandet. docs
// länkar till TypeScripts handbok (på engelska).
const HANDBOOK = 'https://www.typescriptlang.org/docs/handbook/';

export const TRACKS = [
  {
    id: 'typer',
    title: 'Första typerna',
    teaches: [': string', ': number', ': boolean', 'typinferens', 'typfel'],
    reward: { emoji: '🏷️', name: 'Etikett' },
    canBuild:
      'variabler som TypeScript vakar över, så att ett tal aldrig råkar bli text',
    docs: [
      { title: 'The Basics', url: `${HANDBOOK}2/basic-types.html` },
      { title: 'Everyday Types', url: `${HANDBOOK}2/everyday-types.html` },
    ],
  },
  {
    id: 'funktioner',
    title: 'Typade funktioner',
    teaches: [
      'parametertyper',
      'returtyp',
      'valfria ?',
      'standardvärden',
      'void',
    ],
    reward: { emoji: '🔧', name: 'Skiftnyckel' },
    canBuild:
      'funktioner som säger vad de vill ha och vad de lovar att ge tillbaka',
    docs: [
      { title: 'Functions', url: `${HANDBOOK}2/functions.html` },
      {
        title: 'Functions (Everyday Types)',
        url: `${HANDBOOK}2/everyday-types.html#functions`,
      },
    ],
  },
  {
    id: 'objekt',
    title: 'Arrayer och objekt',
    teaches: ['string[]', 'objekttyper', 'valfria egenskaper', 'readonly'],
    reward: { emoji: '📦', name: 'Låda' },
    canBuild: 'listor och objekt där varje egenskap har rätt typ',
    docs: [
      { title: 'Arrays', url: `${HANDBOOK}2/everyday-types.html#arrays` },
      { title: 'Object Types', url: `${HANDBOOK}2/objects.html` },
    ],
  },
  {
    id: 'egna',
    title: 'Egna typer',
    teaches: ['type', 'interface', 'extends', '&'],
    reward: { emoji: '📐', name: 'Vinkelhake' },
    canBuild: 'egna typer som Kund och Order, som hela programmet delar',
    docs: [
      {
        title: 'Type Aliases',
        url: `${HANDBOOK}2/everyday-types.html#type-aliases`,
      },
      {
        title: 'Interfaces',
        url: `${HANDBOOK}2/everyday-types.html#interfaces`,
      },
      {
        title: 'Extending Types',
        url: `${HANDBOOK}2/objects.html#extending-types`,
      },
    ],
  },
  {
    id: 'unioner',
    title: 'Antingen eller',
    teaches: ['|', 'literaltyper', 'typeof', 'in', 'avsmalning'],
    reward: { emoji: '🔀', name: 'Växel' },
    canBuild: "värden som bara får vara vissa saker, som 'liten' | 'stor'",
    docs: [
      {
        title: 'Union Types',
        url: `${HANDBOOK}2/everyday-types.html#union-types`,
      },
      {
        title: 'Literal Types',
        url: `${HANDBOOK}2/everyday-types.html#literal-types`,
      },
      { title: 'Narrowing', url: `${HANDBOOK}2/narrowing.html` },
    ],
  },
  {
    id: 'saknas',
    title: 'Det som kan saknas',
    teaches: ['null', 'undefined', '?.', '??', '!'],
    reward: { emoji: '🛟', name: 'Livboj' },
    canBuild:
      'kod som aldrig kraschar på undefined, eftersom TypeScript tvingar dig att kolla först',
    docs: [
      {
        title: 'null and undefined',
        url: `${HANDBOOK}2/everyday-types.html#null-and-undefined`,
      },
      {
        title: 'Truthiness narrowing',
        url: `${HANDBOOK}2/narrowing.html#truthiness-narrowing`,
      },
    ],
  },
  {
    id: 'fall',
    title: 'Sorterade fall',
    teaches: [
      'diskriminerade unioner',
      'switch',
      'never',
      'uttömmande kontroll',
    ],
    reward: { emoji: '🗂️', name: 'Kortregister' },
    canBuild:
      'en betalning som kan vara kort, Swish eller faktura, där TypeScript påminner om varje fall',
    docs: [
      {
        title: 'Discriminated unions',
        url: `${HANDBOOK}2/narrowing.html#discriminated-unions`,
      },
      {
        title: 'Exhaustiveness checking',
        url: `${HANDBOOK}2/narrowing.html#exhaustiveness-checking`,
      },
    ],
  },
  {
    id: 'generics',
    title: 'Generics',
    teaches: ['<T>', 'generiska funktioner', 'Array<T>', 'extends som krav'],
    reward: { emoji: '🧬', name: 'DNA' },
    canBuild:
      'funktioner som fungerar för alla typer men ändå vet exakt vad de ger tillbaka',
    docs: [{ title: 'Generics', url: `${HANDBOOK}2/generics.html` }],
  },
  {
    id: 'verktyg',
    title: 'Verktygstyper',
    teaches: ['Partial', 'Pick', 'Omit', 'Record', 'keyof', 'typeof'],
    reward: { emoji: '🧰', name: 'Verktygslåda' },
    canBuild: 'nya typer gjorda av gamla, utan att skriva samma sak två gånger',
    docs: [
      { title: 'Utility Types', url: `${HANDBOOK}utility-types.html` },
      { title: 'Keyof', url: `${HANDBOOK}2/keyof-types.html` },
      { title: 'Typeof', url: `${HANDBOOK}2/typeof-types.html` },
    ],
  },
  {
    id: 'data',
    title: 'Data utifrån',
    teaches: ['Promise<T>', 'fetch', 'unknown', 'typkontroller (x is T)'],
    reward: { emoji: '📡', name: 'Parabol' },
    canBuild:
      'kod som hämtar data från nätet och kollar att den ser ut som utlovat',
    docs: [
      {
        title: 'Using type predicates',
        url: `${HANDBOOK}2/narrowing.html#using-type-predicates`,
      },
      { title: 'unknown', url: `${HANDBOOK}2/functions.html#unknown` },
    ],
  },
  {
    id: 'felsok',
    title: 'Felsökning',
    teaches: ['läsa typfel', 'any', 'as', 'när TypeScript har rätt'],
    reward: { emoji: '🩺', name: 'Stetoskop' },
    canBuild: 'en lugn läsning av vilket typfel som helst, rad för rad',
    docs: [
      {
        title: 'Type Assertions',
        url: `${HANDBOOK}2/everyday-types.html#type-assertions`,
      },
      { title: 'any', url: `${HANDBOOK}2/everyday-types.html#any` },
    ],
  },
  {
    id: 'react',
    title: 'React med TypeScript',
    teaches: ['typade props', 'useState<T>', 'händelser', 'children'],
    reward: { emoji: '⚛️', name: 'Atom' },
    canBuild: 'komponenter i React där fel props fångas innan sidan ens laddar',
    docs: [
      {
        title: 'Using TypeScript (React)',
        url: 'https://react.dev/learn/typescript',
      },
    ],
  },
  {
    id: 'slutprojekt',
    title: 'Slutprojektet',
    teaches: ['allt i kursen'],
    reward: { emoji: '🏁', name: 'Målflagga' },
    canBuild: 'en hel typad app från grunden, typer, logik och komponenter',
    docs: [{ title: 'Handbook', url: `${HANDBOOK}intro.html` }],
  },
];
