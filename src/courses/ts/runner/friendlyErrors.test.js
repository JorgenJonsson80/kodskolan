import { describe, expect, it } from 'vitest';
import { nodeChecker } from '../test/nodeTs';
import { explainError, explainTsError } from './friendlyErrors';

// Felen som kompilatorn faktiskt ger, så att reglerna följer med om
// meddelandena ändras i en ny version.
const firstError = code => {
  const result = nodeChecker.check(code);
  return [...result.syntaxErrors, ...result.typeErrors][0];
};

const CASES = [
  ["let a: number = 'x';", 'här ska det vara ett tal, men värdet är'],
  ['function f(x: number) {}\nf("5");', 'Funktionen vill ha ett tal'],
  ["const s = 'a';\ns.toUppercase();", 'Menade du `toUpperCase`'],
  ['const kunder = 1;\nkunde;', 'Menade du `kunder`'],
  ['okant;', 'Namnet `okant` finns inte'],
  ['function f(x) { return x; }', 'Parametern `x` saknar typ'],
  ['const a = 1;\na = 2;', 'skapad med `const`'],
  ['function f(a: number) {}\nf();', 'vill ha 1 värde, men får 0'],
  [
    'type K = { namn: string };\nconst k: K = { namn: "a", alder: 3 };',
    '`K` har ingen `alder`',
  ],
  ['type K = { namn: string };\nconst k: K = {};', '`namn` saknas'],
  [
    'const x: string | undefined = undefined as string | undefined;\nx.length;',
    'kan vara `undefined`',
  ],
  ['const x: unknown = 1;\nx.toFixed();', 'är `unknown`'],
  ['function f(): number {\n  if (Math.random() > 1) return 1;\n}', 'en väg'],
  ["const a = 'x' as 'x' | 'y';\nif (a === 'z') {}", 'kan aldrig'],
  ['let x = 1', null],
];

describe('typfelen på svenska', () => {
  it.each(CASES)('%s', (code, expected) => {
    const error = firstError(code);
    if (expected === null) {
      expect(error).toBeUndefined();
      return;
    }
    expect(explainTsError(error.message, error.code)).toContain(expected);
  });

  it('förklarar via tsMessage när meddelandet har radnummer', () => {
    expect(
      explainError({
        message: "Rad 2: Type 'string' is not assignable to type 'number'.",
        tsMessage: "Type 'string' is not assignable to type 'number'.",
        tsCode: 2322,
      }),
    ).toContain('ett tal');
  });
});
