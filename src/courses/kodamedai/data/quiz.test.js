import { beforeAll, describe, expect, it } from 'vitest';
import { nodeRunStudent } from '../../python/test/nodePython';
import { QUIZ } from './quiz';
import { TRACKS } from './tracks';

let run;
beforeAll(async () => {
  run = await nodeRunStudent();
}, 120000);

const questions = Object.entries(QUIZ).flatMap(([track, list]) =>
  list.map((question, index) => [`${track} ${index + 1}`, question]),
);

describe.each(questions)('%s', (_, question) => {
  it('har fyra olika svar och en förklaring', () => {
    expect(question.options).toHaveLength(4);
    expect(new Set(question.options).size).toBe(4);
    expect(question.explain.length).toBeGreaterThan(10);
  });

  it.runIf(question.code)('det första svaret är det koden skriver ut', () => {
    const result = run({ code: question.code });
    expect(result.error).toBeNull();
    expect(result.output.join('\n')).toBe(question.options[0]);
  });
});

describe('quizet', () => {
  it('har fyra frågor per bana', () => {
    expect(Object.keys(QUIZ)).toEqual(TRACKS.map(track => track.id));
    for (const track of Object.keys(QUIZ)) {
      expect(QUIZ[track], track).toHaveLength(4);
    }
  });
});
