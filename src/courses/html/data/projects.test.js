import { describe, expect, it } from 'vitest';
import { evaluate } from '../runner/evaluate';
import { nodeRunPage } from '../test/nodePage';
import { conceptsTooEarly } from '../test/concepts';
import { needsBrowser } from '../test/layout';
import { htmlWarnings } from '../runner/htmlWarnings';
import { isProjectComplete, noHintsBonusXp } from '../../../core/projects';
import { PROJECT_STEPS, PROJECTS } from './projects';
import { TRACKS } from './tracks';

const check = (lesson, code) =>
  evaluate(lesson, code, nodeRunPage({ code, tests: lesson.tests }));

describe.each(PROJECT_STEPS.map(item => [item.id, item]))('%s', (_, item) => {
  // Layouten rättas bara i Chrome, se grading.browser.test.js.
  it.skipIf(needsBrowser(item))('facit klarar sina egna tester', () => {
    const result = check(item, item.solution);
    expect(result.results.filter(entry => !entry.passed)).toEqual([]);
    expect(result.isCorrect).toBe(true);
  });

  it.skipIf(needsBrowser(item))('startkoden underkänns', () => {
    expect(check(item, item.starterCode).isCorrect).toBe(false);
  });

  it('facit ger inga varningar', () => {
    expect(htmlWarnings(item.solution)).toEqual([]);
  });

  it('facit använder bara det banorna hittills lärt ut', () => {
    expect(conceptsTooEarly(item.solution, item.track)).toEqual([]);
  });

  it('har why, tre ledtrådar och xp', () => {
    expect(item.why.length).toBeGreaterThan(20);
    expect(item.hints).toHaveLength(3);
    expect(item.xp).toBeGreaterThan(0);
  });
});

describe('projekten', () => {
  it('har tre projekt per bana med 3–4 steg', () => {
    for (const track of TRACKS) {
      const projects = PROJECTS.filter(item => item.track === track.id);
      expect(projects, track.id).toHaveLength(3);
      for (const project of projects) {
        expect(project.steps.length).toBeGreaterThanOrEqual(3);
        expect(project.steps.length).toBeLessThanOrEqual(4);
      }
    }
  });

  it('har unika id och priser', () => {
    const ids = PROJECTS.map(item => item.id);
    expect(new Set(ids).size).toBe(ids.length);
    const prizes = [
      ...PROJECTS.map(item => item.reward.emoji),
      ...TRACKS.map(item => item.reward.emoji),
    ];
    expect(new Set(prizes).size).toBe(prizes.length);
  });

  it('räknar ut när ett projekt är klart och bonusen', () => {
    const project = {
      id: 'p',
      steps: [{ xp: 20 }, { xp: 20 }, { xp: 10 }],
    };
    expect(isProjectComplete(project, [`${project.id}-1`])).toBe(false);
    const all = project.steps.map((_, index) => `${project.id}-${index + 1}`);
    expect(isProjectComplete(project, all)).toBe(true);
    expect(noHintsBonusXp(project)).toBe(25);
  });
});
