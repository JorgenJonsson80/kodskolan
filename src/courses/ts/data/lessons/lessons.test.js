import { describe, expect, it } from 'vitest';
import { conceptsTooEarly } from '../../test/concepts';
import { nodeCheck } from '../../test/nodeTs';
import { TRACKS } from '../tracks';
import { LESSONS } from '.';

describe.each(LESSONS.map(lesson => [lesson.id, lesson]))('%s', (_, lesson) => {
  it('facit klarar sina egna tester', async () => {
    const result = await nodeCheck(lesson, lesson.solution);
    expect(result.error ?? null).toBeNull();
    expect(result.results.filter(entry => !entry.passed)).toEqual([]);
    expect(result.isCorrect).toBe(true);
  });

  it('startkoden underkänns', async () => {
    expect((await nodeCheck(lesson, lesson.starterCode)).isCorrect).toBe(false);
  });

  it('har tre ledtrådar (bossen inga), en bana och tester', () => {
    expect(lesson.hints).toHaveLength(lesson.isBoss ? 0 : 3);
    expect(TRACKS.map(track => track.id)).toContain(lesson.track);
    expect(
      lesson.tests.length + (lesson.typeTests?.length ?? 0),
    ).toBeGreaterThan(0);
  });

  it('typtesten som ska ge fel står på en rad', () => {
    for (const test of lesson.typeTests ?? []) {
      if (test.fails) expect(test.code, test.description).not.toMatch(/\n/);
    }
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
  it('har nio övningar och en boss var (de banor som har börjat)', () => {
    for (const track of TRACKS) {
      const lessons = LESSONS.filter(lesson => lesson.track === track.id);
      if (lessons.length > 0) expect(lessons, track.id).toHaveLength(10);
    }
  });

  it('kommer i banornas ordning', () => {
    const order = LESSONS.map(lesson => lesson.track).filter(
      (track, index, all) => track !== all[index - 1],
    );
    expect(order).toEqual(TRACKS.map(track => track.id).slice(0, order.length));
  });
});
