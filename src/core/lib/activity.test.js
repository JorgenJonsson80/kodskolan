import { describe, expect, it } from 'vitest';
import { localDay, mergeActivity, streakOf } from './activity';

const day = (offset, from = new Date(2026, 10, 13, 12)) => {
  const date = new Date(from);
  date.setDate(date.getDate() + offset);
  return localDay(date);
};
const TODAY = new Date(2026, 10, 13, 12);

describe('streak', () => {
  it('räknar dagar i rad fram till i dag', () => {
    expect(streakOf({ [day(0)]: 2, [day(-1)]: 1, [day(-2)]: 4 }, TODAY)).toBe(
      3,
    );
  });

  it('nollas inte på morgonen innan eleven hunnit öva', () => {
    expect(streakOf({ [day(-1)]: 1, [day(-2)]: 1 }, TODAY)).toBe(2);
  });

  it('bryts av en dag utan övningar', () => {
    expect(streakOf({ [day(0)]: 1, [day(-2)]: 1 }, TODAY)).toBe(1);
    expect(streakOf({ [day(-3)]: 1 }, TODAY)).toBe(0);
  });

  it('räknar över månadsskiften', () => {
    const first = new Date(2026, 11, 1, 9);
    expect(
      streakOf({ '2026-12-01': 1, '2026-11-30': 1, '2026-11-29': 1 }, first),
    ).toBe(3);
  });
});

describe('mergeActivity', () => {
  it('tar den största per dag', () => {
    expect(mergeActivity({ a: 2, b: 1 }, { a: 1, c: 3 })).toEqual({
      a: 2,
      b: 1,
      c: 3,
    });
  });
});
