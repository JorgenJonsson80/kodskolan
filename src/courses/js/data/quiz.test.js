import { describe, expect, it } from 'vitest';
import {
  passedTracks,
  placementQuestions as placementFrom,
  shuffleOptions,
  trackQuestions as trackFrom,
} from '../../../core/quiz';
import { quiz } from './quiz';

const trackQuestions = (...args) => trackFrom(quiz, ...args);
const placementQuestions = (...args) => placementFrom(quiz, ...args);
import { tracks } from './tracks';

describe('quizfrågorna', () => {
  it.each(tracks)('$id har frågor', track => {
    expect(quiz[track.id]?.length).toBeGreaterThanOrEqual(4);
  });

  it('har bara frågor för banor som finns', () => {
    const ids = tracks.map(track => track.id);
    for (const id of Object.keys(quiz)) expect(ids).toContain(id);
  });

  it.each(Object.entries(quiz).flatMap(([id, list]) => list.map(q => [id, q])))(
    '%s: "%s" har fyra olika svar och en förklaring',
    (_id, question) => {
      expect(question.options).toHaveLength(4);
      expect(new Set(question.options).size).toBe(4);
      expect(question.explain).toBeTruthy();
    },
  );
});

describe('placementQuestions', () => {
  it('går igenom banorna i kursens ordning', () => {
    const order = placementQuestions(tracks)
      .map(question => question.trackId)
      .filter((id, index, all) => id !== all[index - 1]);
    expect(order).toEqual(tracks.map(track => track.id));
  });

  it('ställer tre frågor per bana', () => {
    const questions = placementQuestions(tracks);
    expect(questions).toHaveLength(tracks.length * 3);
  });
});

describe('trackQuestions', () => {
  it('ger alla frågor för en bana utan perTrack', () => {
    expect(trackQuestions('arrays')).toHaveLength(quiz.arrays.length);
  });

  it('behåller frågebankens ordning när den väljer ut några', () => {
    const picked = trackQuestions('arrays', 3).map(q => q.question + q.code);
    const all = quiz.arrays.map(q => q.question + q.code);
    expect(picked).toEqual(all.filter(text => picked.includes(text)));
  });
});

describe('passedTracks', () => {
  const two = tracks.slice(0, 2);
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
