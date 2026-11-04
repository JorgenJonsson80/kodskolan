import { describe, expect, it } from 'vitest';
import { nodeRunPage } from '../test/nodePage';
import {
  passedId,
  passedTrackIdsFrom,
  passedTracks,
  placementQuestions as placementFrom,
  shuffleOptions,
  trackQuestions as trackFrom,
} from '../../../core/quiz';
import { QUIZ } from './quiz';

const trackQuestions = (...args) => trackFrom(QUIZ, ...args);
const placementQuestions = (...args) => placementFrom(QUIZ, ...args);
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

  it.each(ALL.filter(([, question]) => question.check))(
    '%s: rätt svar är det webbläsaren faktiskt ger',
    (_id, question) => {
      const result = nodeRunPage({
        code: question.code,
        tests: [{ code: question.check }],
      });
      expect(String(result.tests[0].actual)).toBe(question.options[0]);
    },
  );

  it.each(ALL)('%s: fyra olika svar och en förklaring', (_id, question) => {
    expect(question.options).toHaveLength(4);
    expect(new Set(question.options).size).toBe(4);
    expect(question.explain).toBeTruthy();
  });
});

describe('placementQuestions', () => {
  it('går igenom banorna i kursens ordning, tre frågor per bana', () => {
    const questions = placementQuestions(TRACKS);
    const order = questions
      .map(question => question.trackId)
      .filter((id, index, all) => id !== all[index - 1]);
    expect(order).toEqual(TRACKS.map(track => track.id));
    expect(questions).toHaveLength(TRACKS.length * 3);
  });
});

describe('trackQuestions', () => {
  it('behåller frågebankens ordning när den väljer ut några', () => {
    const picked = trackQuestions('grunder', 3).map(
      question => question.question,
    );
    const all = QUIZ.grunder.map(question => question.question);
    expect(picked).toEqual(all.filter(code => picked.includes(code)));
  });
});

describe('passedTracks', () => {
  const two = [{ id: 'a' }, { id: 'b' }];
  const [a, b] = two.map(track => track.id);
  const questions = [a, a, b, b].map(trackId => ({ trackId }));

  it('godkänner banor där alla svar var rätt', () => {
    const answers = [a, a, b, b].map(trackId => ({ trackId, correct: true }));
    expect(passedTracks(two, answers, questions)).toEqual([a, b]);
  });

  it('stannar vid första banan med ett fel svar', () => {
    const answers = [
      { trackId: a, correct: true },
      { trackId: a, correct: true },
      { trackId: b, correct: false },
    ];
    expect(passedTracks(two, answers, questions)).toEqual([a]);
  });

  it('godkänner inte en bana där bara en del frågor besvarats', () => {
    const answers = [{ trackId: a, correct: true }];
    expect(passedTracks(two, answers, questions)).toEqual([]);
  });
});

describe('passedTrackIdsFrom', () => {
  it('läser banorna man testat sig förbi ur de klara id:na', () => {
    expect(
      passedTrackIdsFrom(['a-01', passedId('b')], [{ id: 'a' }, { id: 'b' }]),
    ).toEqual(['b']);
  });
});

describe('shuffleOptions', () => {
  it('håller reda på var rätt svar hamnar', () => {
    const { options, answer } = shuffleOptions(
      ['rätt', 'b', 'c', 'd'],
      () => 0,
    );
    expect(options).toHaveLength(4);
    expect(options[answer]).toBe('rätt');
  });
});
