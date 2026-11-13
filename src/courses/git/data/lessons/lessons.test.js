import { describe, expect, it } from 'vitest';
import { evaluate } from '../../runner/evaluate';
import { runGit } from '../../runner/checks';
import { TRACKS } from '../tracks';
import { LESSONS } from '.';

const check = (lesson, code) =>
  evaluate(
    lesson,
    code,
    runGit({ code, setup: lesson.setup, tests: lesson.tests }),
  );

describe.each(LESSONS.map(lesson => [lesson.id, lesson]))('%s', (_, lesson) => {
  it('facit klarar sina egna tester', () => {
    const result = check(lesson, lesson.solution);
    expect(result.error ?? null).toBeNull();
    expect(result.results.filter(entry => !entry.passed)).toEqual([]);
    expect(result.isCorrect).toBe(true);
  });

  it('startkoden underkänns', () => {
    expect(check(lesson, lesson.starterCode).isCorrect).toBe(false);
  });

  it('har tre ledtrådar (bossen inga), en bana och tester', () => {
    expect(lesson.hints).toHaveLength(lesson.isBoss ? 0 : 3);
    expect(TRACKS.map(track => track.id)).toContain(lesson.track);
    expect(lesson.tests.length).toBeGreaterThan(0);
  });

  it('bossen är sist i sin bana och id är unikt', () => {
    const inTrack = LESSONS.filter(other => other.track === lesson.track);
    expect(lesson.isBoss === true).toBe(inTrack.at(-1) === lesson);
    expect(LESSONS.filter(other => other.id === lesson.id)).toHaveLength(1);
  });
});

describe('banorna', () => {
  it('har nio övningar och en boss var, i banornas ordning', () => {
    for (const track of TRACKS) {
      expect(
        LESSONS.filter(lesson => lesson.track === track.id),
        track.id,
      ).toHaveLength(10);
    }
    const order = LESSONS.map(lesson => lesson.track).filter(
      (track, i, all) => track !== all[i - 1],
    );
    expect(order).toEqual(TRACKS.map(track => track.id));
  });
});
