import { describe, expect, it } from 'vitest';
import { stepThrough } from './evaluate';
import { instrument } from './instrument';

const lines = steps => steps.map(step => step.line);
const varsAt = step => Object.fromEntries(step.vars);

describe('stepThrough', () => {
  it('tar ett steg per rad och visar variablerna innan raden körs', async () => {
    const { steps, error } = await stepThrough(
      'let total = 0;\ntotal = total + 5;\nconsole.log(total);',
    );
    expect(error).toBeNull();
    expect(lines(steps)).toEqual([1, 2, 3, null]);
    expect(varsAt(steps[1])).toEqual({ total: '0' });
    expect(varsAt(steps[3])).toEqual({ total: '5' });
    expect(steps[3].logCount).toBe(1);
  });

  it('visar varje varv i en loop och i en callback', async () => {
    const { steps } = await stepThrough(
      'const nums = [1, 2];\nfor (const n of nums) console.log(n);\nconst doubled = nums.map(n => n * 2);',
    );
    const loopSteps = steps.filter(step => step.line === 2);
    expect(loopSteps.map(step => varsAt(step).n)).toEqual([
      undefined,
      '1',
      '2',
    ]);
    const callbackSteps = steps.filter(
      step => step.line === 3 && varsAt(step).n !== undefined,
    );
    expect(callbackSteps.map(step => varsAt(step).n)).toEqual(['1', '2']);
    expect(varsAt(steps.at(-1)).doubled).toBe('[2,4]');
  });

  it('visar parametrar och lokala variabler i funktioner', async () => {
    const { steps } = await stepThrough(
      'function add(a, b) {\n  const sum = a + b;\n  return sum;\n}\nconst result = add(2, 3);',
    );
    expect(lines(steps)).toEqual([5, 2, 3, null]);
    expect(varsAt(steps[2])).toEqual({ a: '2', b: '3', sum: '5' });
    expect(varsAt(steps[3])).toEqual({ result: '5' });
  });

  it('sparar värden som de var just då', async () => {
    const { steps } = await stepThrough(
      'const list = [];\nlist.push(1);\nlist.push(2);',
    );
    expect(steps.map(step => varsAt(step).list)).toEqual([
      undefined,
      '[]',
      '[1]',
      '[1,2]',
    ]);
  });

  it('stannar vid ett fel och vid en oändlig loop', async () => {
    const crash = await stepThrough('const a = 1;\nmissing();');
    expect(crash.error).toBe('ReferenceError: missing is not defined');
    expect(crash.steps.at(-1).line).toBe(2);

    const loop = await stepThrough('let i = 0;\nwhile (true) i++;');
    expect(loop.error).toContain('Stoppade efter 300 steg');
  });

  it('klarar if och else utan klamrar, och else if', async () => {
    const { steps, error } = await stepThrough(
      "const x = 5;\nif (x > 10) console.log('stor');\nelse if (x > 3) console.log('mellan');\nelse console.log('liten');",
    );
    expect(error).toBeNull();
    expect(lines(steps)).toEqual([1, 2, 3, null]);
  });
});

describe('instrument', () => {
  it('ger kod som går att köra med JSX och export', () => {
    const code = instrument(
      'export const Hello = ({ name }) => <h1>{name}</h1>;\nexport default function App() {\n  return <Hello name="Ada" />;\n}',
    );
    expect(code).toContain('export const Hello');
    expect(code).toContain('__trace(3,');
  });
});

describe('stepThrough med exempel', () => {
  it('anropar funktionerna med exemplet när koden bara definierar dem', async () => {
    const run = await stepThrough(
      'function addBonus(points) {\n  return points + 5;\n}',
      { example: 'addBonus(10)' },
    );
    expect(run.example).toBe('addBonus(10)');
    expect(run.result).toBe('15');
    expect(run.steps.map(step => step.line)).toEqual([2, null]);
    expect(Object.fromEntries(run.steps[0].vars)).toEqual({ points: '10' });
  });

  it('använder inte exemplet när koden har egna steg', async () => {
    const run = await stepThrough('const a = 1;\nconsole.log(a);', {
      example: 'a',
    });
    expect(run.example).toBeUndefined();
  });
});
