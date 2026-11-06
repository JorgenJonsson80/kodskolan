import { describe, expect, it } from 'vitest';
import { placementQuestions } from '../../../core/quiz';
import { showValue } from '../runner/evaluate';
import { nodeRunSql } from '../test/nodeSql';
import { setupFor } from './databases';
import { QUIZ } from './quiz';
import { TRACKS } from './tracks';

const ALL = Object.entries(QUIZ).flatMap(([id, list]) =>
  list.map(question => [id, question]),
);

describe('quizfrågorna', () => {
  it.each(TRACKS)('$id har fyra frågor', track => {
    expect(QUIZ[track.id]).toHaveLength(4);
  });

  it('har bara frågor för banor som finns', () => {
    const ids = TRACKS.map(track => track.id);
    for (const id of Object.keys(QUIZ)) expect(ids).toContain(id);
  });

  it.each(ALL.filter(([, question]) => question.db))(
    '%s: rätt svar är det SQLite faktiskt ger',
    (_id, question) => {
      const { table, error } = nodeRunSql({
        code: question.code,
        setup: setupFor(question),
      });
      expect(error).toBeNull();
      const answer =
        question.check === 'rows'
          ? String(table.total)
          : showValue(table.rows[0][0]);
      expect(answer).toBe(question.options[0]);
    },
  );

  it.each(ALL)('%s: fyra olika svar och en förklaring', (_id, question) => {
    expect(question.options).toHaveLength(4);
    expect(new Set(question.options).size).toBe(4);
    expect(question.explain).toBeTruthy();
  });

  it('nivåtestet har tre frågor per bana', () => {
    expect(placementQuestions(QUIZ, TRACKS)).toHaveLength(TRACKS.length * 3);
  });
});
