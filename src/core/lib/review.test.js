import { describe, expect, it } from 'vitest';
import { answerQuestion, dueQuestions } from './review';

const QUIZ = {
  a: [{ question: 'A1' }, { question: 'A2' }],
  b: [{ question: 'B1' }],
};

describe('repetition', () => {
  it('tar bara frågor från klara banor', () => {
    const due = dueQuestions(QUIZ, ['a'], {}, '2026-11-13');
    expect(due.map(q => q.key)).toEqual(['a-0', 'a-1']);
  });

  it('rätt svar flyttar frågan allt längre fram', () => {
    let state = answerQuestion({}, 'a-0', true, '2026-11-13');
    expect(state['a-0']).toEqual({ box: 0, due: '2026-11-14' });
    state = answerQuestion(state, 'a-0', true, '2026-11-14');
    expect(state['a-0']).toEqual({ box: 1, due: '2026-11-17' });
    expect(
      dueQuestions(QUIZ, ['a'], state, '2026-11-15').map(q => q.key),
    ).toEqual(['a-1']);
  });

  it('fel svar börjar om i morgon', () => {
    const state = answerQuestion(
      { 'a-0': { box: 3, due: '2026-11-13' } },
      'a-0',
      false,
      '2026-11-13',
    );
    expect(state['a-0']).toEqual({ box: 0, due: '2026-11-14' });
  });

  it('räknar över månadsskiften', () => {
    const state = answerQuestion(
      { 'a-0': { box: 1, due: '2026-11-30' } },
      'a-0',
      true,
      '2026-11-30',
    );
    expect(state['a-0'].due).toBe('2026-12-07');
  });
});
