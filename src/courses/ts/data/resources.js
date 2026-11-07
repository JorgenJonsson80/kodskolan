// Andra sätt att lära sig banans ämnen, för den som kört fast.
// read: en sida i TypeScripts handbok (på engelska).
// video: en sökning på YouTube. Vi länkar till en sökning i stället för
// enskilda videor, eftersom videor kan försvinna men sökningen finns kvar.
const HANDBOOK = 'https://www.typescriptlang.org/docs/handbook/';

export const RESOURCES = {
  typer: [
    {
      topic: 'Vad är TypeScript?',
      read: `${HANDBOOK}typescript-in-5-minutes.html`,
      video: 'vad är typescript nybörjare',
    },
    {
      topic: 'string, number och boolean',
      read: `${HANDBOOK}2/everyday-types.html#the-primitives-string-number-and-boolean`,
      video: 'typescript basic types tutorial beginners',
    },
    {
      topic: 'Typinferens',
      read: `${HANDBOOK}type-inference.html`,
      video: 'typescript type inference explained',
    },
  ],
  funktioner: [
    {
      topic: 'Typade funktioner',
      read: `${HANDBOOK}2/functions.html`,
      video: 'typescript functions tutorial beginners',
    },
    {
      topic: 'Valfria parametrar och void',
      read: `${HANDBOOK}2/functions.html#optional-parameters`,
      video: 'typescript optional parameters void',
    },
  ],
  objekt: [
    {
      topic: 'Arrayer',
      read: `${HANDBOOK}2/everyday-types.html#arrays`,
      video: 'typescript arrays tutorial',
    },
    {
      topic: 'Objekttyper, valfria egenskaper och readonly',
      read: `${HANDBOOK}2/objects.html`,
      video: 'typescript object types optional readonly',
    },
  ],
  egna: [
    {
      topic: 'type och interface',
      read: `${HANDBOOK}2/everyday-types.html#type-aliases`,
      video: 'typescript type vs interface',
    },
    {
      topic: 'extends och &',
      read: `${HANDBOOK}2/objects.html#extending-types`,
      video: 'typescript extends intersection types',
    },
  ],
  unioner: [
    {
      topic: 'Unioner och literaltyper',
      read: `${HANDBOOK}2/everyday-types.html#union-types`,
      video: 'typescript union types literal types',
    },
    {
      topic: 'Avsmalning med typeof och in',
      read: `${HANDBOOK}2/narrowing.html`,
      video: 'typescript narrowing typeof',
    },
  ],
  saknas: [
    {
      topic: 'null och undefined',
      read: `${HANDBOOK}2/everyday-types.html#null-and-undefined`,
      video: 'typescript strict null checks',
    },
    {
      topic: '! (non-null assertion)',
      read: `${HANDBOOK}2/everyday-types.html#non-null-assertion-operator-postfix-`,
      video: 'typescript non null assertion operator',
    },
  ],
  fall: [
    {
      topic: 'Diskriminerade unioner',
      read: `${HANDBOOK}2/narrowing.html#discriminated-unions`,
      video: 'typescript discriminated unions',
    },
    {
      topic: 'never och uttömmande kontroll',
      read: `${HANDBOOK}2/narrowing.html#exhaustiveness-checking`,
      video: 'typescript exhaustive switch never',
    },
  ],
};
