import { describe, expect, it } from 'vitest';
import { diffLines, diffText } from './diff';

describe('diffText', () => {
  it('markerar ett mellanslag som saknas', () => {
    const { actual, expected } = diffText('Hej,Anna', 'Hej, Anna');
    expect(actual.every(part => !part.changed)).toBe(true);
    expect(expected).toEqual([
      { text: 'Hej,', changed: false },
      { text: ' ', changed: true },
      { text: 'Anna', changed: false },
    ]);
  });

  it('markerar fel bokstav på båda sidor', () => {
    const { actual, expected } = diffText('hej', 'Hej');
    expect(actual[0]).toEqual({ text: 'h', changed: true });
    expect(expected[0]).toEqual({ text: 'H', changed: true });
  });

  it('har inga markeringar när texterna är lika', () => {
    const { actual } = diffText('Hej', 'Hej');
    expect(actual).toEqual([{ text: 'Hej', changed: false }]);
  });
});

describe('diffLines', () => {
  it('en saknad rad i mitten gör inte resten fel', () => {
    const rows = diffLines(['1', '3'], ['1', '2', '3']);
    expect(rows).toHaveLength(3);
    expect(rows[1].actual).toBeNull();
    expect(rows[1].expected).toEqual([{ text: '2', changed: true }]);
    expect(rows[2].actual).toEqual([{ text: '3', changed: false }]);
  });

  it('jämför rader som skiljer tecken för tecken', () => {
    const rows = diffLines(['Hej  Anna'], ['Hej Anna']);
    expect(rows).toHaveLength(1);
    expect(rows[0].actual).toContainEqual({ text: ' ', changed: true });
  });

  it('visar en extra rad som saknas i facit', () => {
    const rows = diffLines(['a', 'b'], ['a']);
    expect(rows[1]).toEqual({
      actual: [{ text: 'b', changed: true }],
      expected: null,
    });
  });
});
