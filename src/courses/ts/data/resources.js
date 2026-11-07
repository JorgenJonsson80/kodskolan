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
};
