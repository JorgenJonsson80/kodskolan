import { beforeAll, describe, expect, it } from 'vitest';
import { nodeStepStudent } from '../test/nodePython';
import { explainStep, isGuessRight, questionFor } from './stepExplain';
import { buildFrames } from './useStepper';

let step;
beforeAll(async () => {
  step = await nodeStepStudent();
});

function trace(code, options = {}) {
  const run = step({ code, ...options });
  const frames = buildFrames(run);
  return {
    frames,
    explain: index => explainStep(frames, index, run.console),
    question: index => questionFor(frames, index, run.console),
  };
}

describe('explainStep', () => {
  it('berättar att en variabel skapas och ändras', () => {
    const { explain } = trace('x = 1\nx = x + 1');
    expect(explain(0)).toBeNull();
    expect(explain(1)).toEqual({
      line: 1,
      sentences: ['`x` skapas och får värdet `1`.'],
      note: 'x = 1',
    });
    expect(explain(2).sentences).toEqual(['`x` ändras från `1` till `2`.']);
  });

  it('visar vad som skrivs ut', () => {
    const { explain } = trace('print("hej")\nprint(1, 2)');
    expect(explain(1).sentences).toEqual(['🖨️ Skriver ut `hej`.']);
    expect(explain(1).note).toBe('skriver ut hej');
  });

  it('säger om villkoret var sant eller falskt', () => {
    const yes = trace('x = 5\nif x > 3:\n    print("stor")');
    expect(yes.explain(2)).toMatchObject({ line: 2, note: 'sant' });
    expect(yes.explain(2).sentences[0]).toContain('sant');
    const no = trace('x = 0\nif x > 3:\n    y = 1\nelse:\n    y = 2');
    expect(no.explain(2).sentences[0]).toContain('`else`');
    expect(no.explain(2).note).toBe('falskt');
  });

  it('räknar varven i en for-loop', () => {
    const { frames, explain } = trace('for i in range(2):\n    print(i)');
    expect(frames.map(frame => frame.line)).toEqual([1, 2, 1, 2, 1, null]);
    expect(explain(1).sentences[0]).toBe('🔁 Varv 1 i for-loopen.');
    expect(explain(1).note).toBe('varv 1 · i = 0');
    expect(explain(3).sentences[0]).toBe('🔁 Varv 2 i for-loopen.');
    expect(explain(5).sentences[0]).toBe('🔁 For-loopen är klar efter 2 varv.');
  });

  it('börjar om varven när loopen körs igen', () => {
    const { frames, explain } = trace(
      'for a in range(2):\n    for b in range(1):\n        pass',
    );
    const rounds = frames
      .map((frame, index) => [frame, explain(index)])
      .filter(([frame]) => frame.flow?.line === 2 && frame.flow.taken)
      .map(([frame]) => frame.flow.round);
    expect(rounds).toEqual([1, 1]);
  });

  it('räknar varven i en while-loop', () => {
    const { explain } = trace('n = 0\nwhile n < 1:\n    n += 1');
    expect(explain(2).sentences[0]).toContain('varv 1');
    expect(explain(4).sentences[0]).toContain('slutar efter 1 varv');
  });

  it('följer med in i en funktion och tillbaka', () => {
    const { frames, explain } = trace(
      'def dubbla(tal):\n    return tal * 2\n\ny = dubbla(4)',
    );
    expect(explain(1).sentences[0]).toContain('Funktionen `dubbla` skapas');
    const inside = frames.findIndex(frame => frame.scope === 'dubbla');
    expect(explain(inside).sentences).toEqual([
      '📞 Funktionen anropas: `dubbla(tal=4)`. Nu körs koden inne i den.',
      'Parametern `tal` får värdet `4`.',
    ]);
    const returned = frames.findIndex(frame => frame.returned !== undefined);
    expect(explain(returned).note).toBe('↩ 8');
    // Raden som blir klar efter return är raden med anropet.
    expect(explain(returned + 1).line).toBe(4);
    expect(explain(returned + 1).sentences).toEqual([
      'Tillbaka i programmet, som får svaret `8`.',
      '`y` skapas och får värdet `8`.',
    ]);
  });

  it('visar anropen som väntar vid rekursion', () => {
    const { frames } = trace(
      'def fak(n):\n    if n <= 1:\n        return 1\n    return n * fak(n - 1)\n\nx = fak(3)',
    );
    const deepest = frames.find(frame => frame.call === 'fak(n=1)');
    expect(deepest.outer.map(outer => outer.call)).toEqual([
      null,
      'fak(n=3)',
      'fak(n=2)',
    ]);
    expect(frames.filter(frame => frame.returned).map(f => f.returned)).toEqual(
      ['1', '2', '6'],
    );
  });

  it('anropar exemplet när koden bara är funktioner', () => {
    const { frames, explain } = trace('def dubbla(tal):\n    return tal * 2', {
      example: 'dubbla(3)',
    });
    const inside = frames.findIndex(frame => frame.scope === 'dubbla');
    expect(explain(inside).sentences[0]).toContain('`dubbla(tal=3)`');
    expect(explain(frames.length - 1).sentences).toEqual([
      'Tillbaka i programmet, som får svaret `6`.',
    ]);
  });
});

describe('questionFor', () => {
  it('frågar vad en variabel blir', () => {
    const { question } = trace('x = 2\ny = x * 3');
    expect(question(1)).toEqual({
      prompt: 'Vad blir `y` när rad 2 har körts?',
      answer: '6',
    });
  });

  it('frågar om villkoret är sant och om loopen tar ett varv till', () => {
    const branch = trace('x = 1\nif x > 3:\n    x = 0');
    expect(branch.question(1)).toMatchObject({ answer: 'Falskt' });
    const loop = trace('for i in range(1):\n    pass');
    expect(loop.question(0)).toMatchObject({ answer: 'Ja' });
    expect(loop.question(2)).toMatchObject({ answer: 'Nej' });
  });

  it('frågar vad som skrivs ut och vad funktionen lämnar tillbaka', () => {
    const { frames, question } = trace(
      'def f():\n    return "hej"\n\nprint(f())',
    );
    expect(question(1)).toBeNull();
    const returning = frames.findIndex(frame => frame.returned) - 1;
    expect(question(returning).answer).toBe("'hej'");
    expect(question(returning + 1).answer).toBe('hej');
  });
});

describe('isGuessRight', () => {
  it.each([
    ['6', '6'],
    ['"hej"', "'hej'"],
    ['hej', "'hej'"],
    ['[1,2]', '[1, 2]'],
    ['true', 'True'],
    ['2', '2.0'],
  ])('%s räknas som %s', (guess, answer) => {
    expect(isGuessRight(guess, answer)).toBe(true);
  });

  it.each([
    ['5', '6'],
    ['', '0'],
    ['[2, 1]', '[1, 2]'],
  ])('%s räknas inte som %s', (guess, answer) => {
    expect(isGuessRight(guess, answer)).toBe(false);
  });
});
