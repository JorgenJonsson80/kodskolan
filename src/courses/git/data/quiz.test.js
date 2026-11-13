import { describe, expect, it } from 'vitest';
import { QUIZ } from './quiz';
import { TRACKS } from './tracks';

describe('quizet', () => {
  it('har fyra frågor med fyra olika svar per bana', () => {
    expect(Object.keys(QUIZ)).toEqual(TRACKS.map(track => track.id));
    for (const questions of Object.values(QUIZ)) {
      expect(questions).toHaveLength(4);
      for (const question of questions) {
        expect(new Set(question.options).size).toBe(4);
        expect(question.explain.length).toBeGreaterThan(10);
      }
    }
  });
});
