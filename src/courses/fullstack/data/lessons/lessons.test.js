import { beforeAll, describe, expect, it } from 'vitest';
import { nodeCheck, nodeFullstack } from '../../test/nodeFullstack';
import { TRACKS } from '../tracks';
import { LESSONS } from '.';

// Ett funktionssvar från beforeAll körs som städning, så inget får returneras.
beforeAll(async () => {
  await nodeFullstack();
}, 120000);

describe.each(LESSONS.map(lesson => [lesson.id, lesson]))('%s', (_, lesson) => {
  it('facit klarar sina egna tester', async () => {
    const { feedback } = await nodeCheck(lesson, lesson.solution);
    expect(feedback.error ?? null).toBeNull();
    expect(feedback.results.filter(entry => !entry.passed)).toEqual([]);
    expect(feedback.isCorrect).toBe(true);
  });

  it('startkoden underkänns', async () => {
    const { feedback } = await nodeCheck(lesson, lesson.starterCode);
    expect(feedback.isCorrect).toBe(false);
  });

  it('visar sidan när koden körts', async () => {
    const { raw } = await nodeCheck(lesson, lesson.solution);
    if (lesson.lang === 'py') {
      expect(raw.previewSource?.preview).toBe('<App />');
    } else if (lesson.preview) {
      expect(raw.previewSource?.preview).toBe(lesson.preview);
    }
  });

  it('säger vilken fil den gäller, och har den andra filen', () => {
    expect(['py', 'tsx']).toContain(lesson.lang);
    if (lesson.lang === 'py') expect(lesson.frontend).toMatch(/export default/);
    else expect(lesson.backend).toMatch(/Flask\(__name__\)/);
  });

  it('har tre ledtrådar (bossen inga), en bana och tester', () => {
    expect(lesson.hints).toHaveLength(lesson.isBoss ? 0 : 3);
    expect(TRACKS.map(track => track.id)).toContain(lesson.track);
    expect(lesson.tests.length).toBeGreaterThan(0);
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
  it('har sex övningar och en boss var', () => {
    for (const track of TRACKS) {
      const lessons = LESSONS.filter(lesson => lesson.track === track.id);
      expect(lessons, track.id).toHaveLength(7);
    }
  });

  it('kommer i banornas ordning', () => {
    const order = LESSONS.map(lesson => lesson.track).filter(
      (track, index, all) => track !== all[index - 1],
    );
    expect(order).toEqual(TRACKS.map(track => track.id));
  });
});
