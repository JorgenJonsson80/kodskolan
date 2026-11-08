import { describe, expect, it } from 'vitest';
import { facitId, keyStatus, START_KEYS } from './keys';

const exercises = ['a', 'b', 'c', 'd', 'e', 'f'].map(id => ({ id }));

describe('keyStatus', () => {
  it('börjar med några nycklar', () => {
    expect(keyStatus([], exercises)).toEqual({
      keys: START_KEYS,
      untilNext: 3,
    });
  });

  it('ger en nyckel per tre övningar klarade på egen hand', () => {
    expect(keyStatus(['a', 'b', 'c', 'd'], exercises)).toEqual({
      keys: START_KEYS + 1,
      untilNext: 2,
    });
  });

  it('kostar en nyckel per facit, och en övning med facit ger ingen', () => {
    const ids = ['a', facitId('a'), facitId('b'), 'c'];
    expect(keyStatus(ids, exercises).keys).toBe(START_KEYS - 2);
    expect(keyStatus(ids, exercises).untilNext).toBe(2);
  });

  it('blir aldrig negativt och bryr sig inte om okända id:n', () => {
    const ids = exercises.map(item => facitId(item.id)).concat('x-testad');
    expect(keyStatus(ids, exercises).keys).toBe(0);
  });
});
