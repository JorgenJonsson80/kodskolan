import { beforeAll, describe, expect, it } from 'vitest';
import { nodeRunFlask } from '../test/nodeFlask';
import { QUIZ } from './quiz';
import { TRACKS } from './tracks';

let run;
beforeAll(async () => {
  run = await nodeRunFlask();
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

  it.runIf(question.code)('koden går att köra', () => {
    const result = run({ code: question.code });
    expect(result.syntaxError).toBeNull();
    expect(result.error).toBeNull();
  });

  it.runIf(question.check)('ger det rätta svaret', () => {
    const result = run({
      code: question.code,
      tests: [{ code: question.check, expected: null }],
    });
    // Text jämförs som den är, annat som Python skriver det (False, None).
    const [entry] = result.tests;
    const shown = typeof entry.actual === 'string' ? entry.actual : entry.repr;
    expect(shown).toBe(question.options[0]);
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
