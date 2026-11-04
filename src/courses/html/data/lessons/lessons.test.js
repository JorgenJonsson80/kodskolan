import { describe, expect, it } from 'vitest';
import { evaluate } from '../../runner/evaluate';
import { nodeRunPage } from '../../test/nodePage';
import { LESSONS } from '.';
import { TRACKS } from '../tracks';
import { conceptsTooEarly } from '../../test/concepts';
import { needsBrowser } from '../../test/layout';
import { htmlWarnings } from '../../runner/htmlWarnings';

const check = (lesson, code) =>
  evaluate(lesson, code, nodeRunPage({ code, tests: lesson.tests }));

describe.each(LESSONS.map(lesson => [lesson.id, lesson]))('%s', (_, lesson) => {
  // Layouten rättas bara i Chrome, se grading.browser.test.js.
  it.skipIf(needsBrowser(lesson))('facit klarar sina egna tester', () => {
    expect(check(lesson, lesson.solution).isCorrect).toBe(true);
  });

  it.skipIf(needsBrowser(lesson))('startkoden underkänns', () => {
    expect(check(lesson, lesson.starterCode).isCorrect).toBe(false);
  });

  it('har tre ledtrådar (bossen inga) och en bana som finns', () => {
    expect(lesson.hints).toHaveLength(lesson.isBoss ? 0 : 3);
    expect(TRACKS.map(track => track.id)).toContain(lesson.track);
  });

  it('facit ger inga varningar', () => {
    expect(htmlWarnings(lesson.solution)).toEqual([]);
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
