import { describe, expect, it } from 'vitest';
import { decodeContent, encodeContent, mergeById } from './contentCodec';

describe('kursinnehållet som JSON', () => {
  it('behåller reguljära uttryck', () => {
    const lesson = {
      id: 'a',
      sourceChecks: [{ pattern: /def \w+\(/gm }],
      x: undefined,
    };
    const back = decodeContent(
      JSON.parse(JSON.stringify(encodeContent(lesson))),
    );
    expect(back.sourceChecks[0].pattern).toEqual(/def \w+\(/gm);
    expect(back.sourceChecks[0].pattern.test('def f(')).toBe(true);
    expect('x' in back).toBe(false);
  });

  it('byter skal mot hela övningar i samma ordning', () => {
    const items = [{ id: 'a' }, { id: 'b', title: 'B' }, { id: 'c' }];
    expect(
      mergeById(items, { b: { id: 'b', title: 'B', tests: [1] } }),
    ).toEqual([{ id: 'a' }, { id: 'b', title: 'B', tests: [1] }, { id: 'c' }]);
  });
});
