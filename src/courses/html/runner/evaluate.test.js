import { describe, expect, it } from 'vitest';
import { diffFor, evaluate, showValue } from './evaluate';

const lesson = {
  tests: [
    { description: 'rubriken', code: "text('h1')", expected: 'Hej!' },
    { description: 'antal', code: "count('li')", expected: 3 },
  ],
};

describe('evaluate', () => {
  it('säger vad testet fick och vad det skulle vara', () => {
    const feedback = evaluate(lesson, '', {
      tests: [
        { passed: false, actual: 'Hej' },
        { passed: false, actual: 2 },
      ],
    });
    expect(feedback.results[0].text).toBe('fick "Hej" men skulle vara "Hej!"');
    expect(feedback.results[1].text).toBe('fick 2 men skulle vara 3');
  });

  it('varnar även när testerna går igenom', () => {
    const feedback = evaluate(lesson, '<h1>Hej!<h1>', {
      tests: [{ passed: true }, { passed: true }],
    });
    expect(feedback.isCorrect).toBe(true);
    expect(feedback.warnings).toHaveLength(2);
  });

  it('säger till när elementet saknas', () => {
    const feedback = evaluate(lesson, '', {
      tests: [
        { passed: true, actual: 'Hej!' },
        { passed: false, actual: null },
      ],
    });
    expect(feedback.results[1].text).toMatch(/hittade det inte/);
  });

  it('showValue skriver texter med citattecken', () => {
    expect(showValue(['a', 'b'])).toBe('["a", "b"]');
    expect(showValue(undefined)).toBe('null');
  });
});

describe('diffFor', () => {
  it('jämför listor med text rad för rad', () => {
    expect(
      diffFor(
        { code: "texts('li')", expected: ['Hej!', 'Då'] },
        { passed: false, actual: ['Hej !'] },
      ),
    ).toEqual({ actual: ['Hej !'], expected: ['Hej!', 'Då'] });
  });

  it('delar text vid radbrytningar', () => {
    expect(
      diffFor(
        { code: 'x', expected: 'a\nb' },
        { passed: false, actual: 'a\nc', repr: "'a\\nc'" },
      ),
    ).toEqual({ actual: ['a', 'c'], expected: ['a', 'b'] });
  });

  it('visar andra värden på en rad', () => {
    expect(
      diffFor(
        { code: 'x', expected: { a: 1 } },
        { passed: false, actual: { a: 2 } },
      ),
    ).toEqual({ actual: ['{"a":2}'], expected: ['{"a":1}'] });
  });

  it('visas inte för tal, när testet gick igenom eller koden kraschade', () => {
    const failed = { passed: false, actual: 20, repr: '20' };
    expect(diffFor({ code: 'x', expected: 25 }, failed)).toBeNull();
    expect(diffFor({ code: 'x', expected: true }, failed)).toBeNull();
    expect(
      diffFor({ code: 'x', expected: 'a' }, { passed: true, actual: 'a' }),
    ).toBeNull();
    expect(
      diffFor({ code: 'x', expected: 'a' }, { passed: false, error: {} }),
    ).toBeNull();
  });
});
