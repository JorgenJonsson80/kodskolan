import { describe, expect, it } from 'vitest';
import { evaluate } from '../../runner/evaluate';
import { nodeRunLesson } from '../../test/nodeSql';
import { conceptsTooEarly } from '../../test/concepts';
import { DATABASES } from '../databases';
import { TRACKS } from '../tracks';
import { LESSONS } from '.';

const check = (lesson, code) =>
  evaluate(lesson, code, nodeRunLesson(lesson, code));

describe.each(LESSONS.map(lesson => [lesson.id, lesson]))('%s', (_, lesson) => {
  it('facit klarar sina egna tester, utan varningar', () => {
    const result = check(lesson, lesson.solution);
    expect(result.error ?? null).toBeNull();
    expect(result.results.filter(entry => !entry.passed)).toEqual([]);
    expect(result.isCorrect).toBe(true);
    expect(result.warnings).toEqual([]);
  });

  it('startkoden underkänns', () => {
    expect(check(lesson, lesson.starterCode).isCorrect).toBe(false);
  });

  it('har tre ledtrådar (bossen inga), en bana och en databas som finns', () => {
    expect(lesson.hints).toHaveLength(lesson.isBoss ? 0 : 3);
    expect(TRACKS.map(track => track.id)).toContain(lesson.track);
    expect(lesson.db === null || lesson.db in DATABASES).toBe(true);
    expect(lesson.tests.length).toBeGreaterThan(0);
  });

  it('facit använder bara det banorna hittills lärt ut', () => {
    expect(conceptsTooEarly(lesson.solution, lesson.track)).toEqual([]);
  });

  it('bossen är sist i sin bana', () => {
    const inTrack = LESSONS.filter(other => other.track === lesson.track);
    expect(lesson.isBoss === true).toBe(inTrack.at(-1) === lesson);
  });

  it('har unikt id', () => {
    expect(LESSONS.filter(other => other.id === lesson.id)).toHaveLength(1);
  });
});

describe('banorna', () => {
  it('har nio övningar och en boss var', () => {
    for (const track of TRACKS) {
      const lessons = LESSONS.filter(lesson => lesson.track === track.id);
      expect(lessons, track.id).toHaveLength(10);
    }
  });
});
