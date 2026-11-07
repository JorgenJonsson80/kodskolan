import { describe, expect, it } from 'vitest';
import { nodeRunTs } from '../test/nodeTs';
import { QUIZ } from './quiz';
import { TRACKS } from './tracks';

const questions = Object.entries(QUIZ).flatMap(([track, list]) =>
  list.map((question, index) => [`${track} ${index + 1}`, question]),
);

describe.each(questions)('%s', (_, question) => {
  it('har fyra olika svar och en förklaring', () => {
    expect(question.options).toHaveLength(4);
    expect(new Set(question.options).size).toBe(4);
    expect(question.explain.length).toBeGreaterThan(10);
  });

  it.runIf(question.code)('koden ger det rätta svaret', async () => {
    const raw = await nodeRunTs({ code: question.code });
    if (question.check === 'typeError') {
      expect(raw.error?.tsCode).toBeDefined();
      return;
    }
    expect(raw.error ?? raw.syntaxError ?? null).toBeNull();
    if (question.check === 'log') {
      expect(raw.output[0]).toBe(question.options[0]);
    }
  });
});

describe('quizet', () => {
  it('har fyra frågor per bana som finns', () => {
    for (const track of Object.keys(QUIZ)) {
      expect(TRACKS.map(item => item.id)).toContain(track);
      expect(QUIZ[track], track).toHaveLength(4);
    }
  });
});
