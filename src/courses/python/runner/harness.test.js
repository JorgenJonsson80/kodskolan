import { beforeAll, describe, expect, it } from 'vitest';
import { nodeRunStudent } from '../test/nodePython';

let run;
beforeAll(async () => {
  run = await nodeRunStudent();
});

describe('harness.py', () => {
  it('fångar print som rader', () => {
    const result = run({ code: 'print("Hej")\nprint(1, 2)' });
    expect(result.output).toEqual(['Hej', '1 2']);
  });

  it('kör tester i elevens namespace och jämför i Python', () => {
    const result = run({
      code: 'def summa(tal):\n    return sum(tal)',
      tests: [
        { code: 'summa([1, 2, 3])', expected: 6 },
        { code: 'summa([1])', expected: 2 },
      ],
    });
    expect(result.tests.map(test => test.passed)).toEqual([true, false]);
    expect(result.tests[1].repr).toBe('1');
  });

  it('__raises och __message kollar att en funktion gör raise', () => {
    const result = run({
      code: 'def kolla(x):\n    if x < 0:\n        raise ValueError("Negativt")\n    return x',
      tests: [
        { code: '__raises(kolla, -1)', expected: 'ValueError' },
        { code: '__message(kolla, -1)', expected: 'Negativt' },
        { code: '__raises(kolla, 1)', expected: null },
      ],
    });
    expect(result.tests.map(test => test.passed)).toEqual([true, true, true]);
  });

  it('jämför tupler med listor', () => {
    const result = run({
      code: 'p = (1, 2)',
      tests: [{ code: 'p', expected: [1, 2] }],
    });
    expect(result.tests[0].passed).toBe(true);
  });

  it('input() läser från listan, och prompten syns bara i konsolen', () => {
    const result = run({
      code: 'n = input("Namn? ")\nprint("Hej " + n)',
      inputs: ['Ada'],
      tests: [{ code: '__output', expected: ['Hej Ada'] }],
    });
    expect(result.tests[0].passed).toBe(true);
    expect(result.console).toEqual(['Namn? Ada', 'Hej Ada']);
  });

  it('ger EOFError när svaren tar slut', () => {
    const result = run({ code: 'input()' });
    expect(result.error.type).toBe('EOFError');
    expect(result.error.line).toBe(1);
  });

  it('ger syntaxfel innan koden körs', () => {
    const result = run({ code: 'print("före")\nif True\n    pass' });
    expect(result.syntaxError.type).toBe('SyntaxError');
    expect(result.syntaxError.line).toBe(2);
    expect(result.output).toBeUndefined();
  });

  it('ger radnummer och Did you mean för körfel', () => {
    const result = run({ code: 'namn = "Ada"\nprint(nman)' });
    expect(result.error).toMatchObject({ type: 'NameError', line: 2 });
    expect(result.error.message).toMatch(/Did you mean: 'namn'/);
  });

  it('läcker inget mellan körningar', () => {
    run({ code: 'hemlig = 1' });
    const result = run({ code: 'print(hemlig)' });
    expect(result.error.type).toBe('NameError');
  });

  it('återställer sys.stdout efter ett fel', () => {
    run({ code: '1 / 0' });
    const result = run({ code: 'print("ok")' });
    expect(result.output).toEqual(['ok']);
  });
});

describe('tester med egna inputs', () => {
  it('kör programmet igen med testets svar', () => {
    const result = run({
      code: 't = int(input())\nif t > 20:\n    print("Varmt")\nelse:\n    print("Kallt")',
      inputs: ['25'],
      tests: [
        { code: '__output', expected: ['Varmt'] },
        { code: '__output', expected: ['Kallt'], inputs: ['5'] },
        { code: 't', expected: 5, inputs: ['5'] },
      ],
    });
    expect(result.tests.map(test => test.passed)).toEqual([true, true, true]);
    expect(result.console).toEqual(['25', 'Varmt']);
  });

  it('ger felet från den körningen', () => {
    const result = run({
      code: 't = int(input())',
      inputs: ['1'],
      tests: [{ code: 't', expected: 1, inputs: ['abc'] }],
    });
    expect(result.tests[0].error.type).toBe('ValueError');
  });
});
