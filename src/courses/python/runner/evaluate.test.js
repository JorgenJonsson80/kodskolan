import { describe, expect, it } from 'vitest';
import { diffFor, evaluate, pyRepr } from './evaluate';

const lesson = {
  tests: [
    { description: 'utskrift', code: '__output', expected: ['Hej!'] },
    { description: 'värde', code: 'x', expected: 'a' },
  ],
};

describe('evaluate', () => {
  it('beskriver utskrift i klartext, inte som listor', () => {
    const feedback = evaluate(lesson, '', {
      console: ['Hej'],
      tests: [
        { passed: false, actual: ['Hej'], repr: "['Hej']" },
        { passed: false, actual: 'b', repr: "'b'" },
      ],
    });
    expect(feedback.results[0].text).toBe(
      'utskriften blev Hej men skulle vara Hej!',
    );
    expect(feedback.results[1].text).toBe("fick 'b' men skulle vara 'a'");
  });

  it('säger till vid timeout', () => {
    expect(evaluate(lesson, '', { timedOut: true }).message).toMatch(/loop/);
  });

  it('pyRepr skriver som Python', () => {
    expect(pyRepr([true, null, 'a', 1.5])).toBe("[True, None, 'a', 1.5]");
    expect(pyRepr({ a: 1 })).toBe("{'a': 1}");
    expect(pyRepr("it's")).toBe('"it\'s"');
  });
});

describe('diffFor', () => {
  it('jämför utskriften rad för rad', () => {
    expect(
      diffFor(
        { code: '__output', expected: ['Hej!', 'Då'] },
        { passed: false, actual: ['Hej !'], repr: "['Hej !']" },
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

  it('visar listor och dictionaries som Python skriver dem', () => {
    expect(
      diffFor(
        { code: 'x', expected: { a: 1 } },
        { passed: false, actual: { a: 2 }, repr: "{'a': 2}" },
      ),
    ).toEqual({ actual: ["{'a': 2}"], expected: ["{'a': 1}"] });
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
