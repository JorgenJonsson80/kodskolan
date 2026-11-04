import { describe, expect, it } from 'vitest';
import { buildFrames, exampleCall } from './useStepper';

describe('exampleCall', () => {
  it('hittar första vanliga anropet', () => {
    expect(
      exampleCall([
        { code: '__output' },
        { code: 'summa' },
        { code: 'summa([1, 2])' },
      ]),
    ).toBe('summa([1, 2])');
    expect(exampleCall([{ code: '__output' }])).toBeNull();
  });
});

describe('buildFrames', () => {
  it('lägger till ett felsteg', () => {
    const frames = buildFrames({
      steps: [{ line: 1, vars: [], out: 0 }],
      error: { type: 'ZeroDivisionError', message: '…', line: 1 },
      console: 'hej\n',
    });
    expect(frames).toHaveLength(2);
    expect(frames[1]).toMatchObject({ line: 1, out: 4 });
  });

  it('visar syntaxfel och timeout som ett steg', () => {
    expect(
      buildFrames({ syntaxError: { line: 2 }, steps: [] })[0].error.isSyntax,
    ).toBe(true);
    expect(buildFrames({ timedOut: true })[0].timedOut).toBe(true);
  });
});
