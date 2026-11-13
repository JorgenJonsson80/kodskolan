import { describe, expect, it } from 'vitest';
import { runGit } from '../runner/checks';
import { evaluate } from '../runner/evaluate';
import { PROJECT_STEPS, PROJECTS } from './projects';
import { TRACKS } from './tracks';

const check = (step, code) =>
  evaluate(step, code, runGit({ code, setup: step.setup, tests: step.tests }));

describe.each(PROJECT_STEPS.map(step => [step.id, step]))('%s', (_, step) => {
  it('facit klarar sina egna tester', () => {
    const result = check(step, step.solution);
    expect(result.error ?? null).toBeNull();
    expect(result.results.filter(entry => !entry.passed)).toEqual([]);
    expect(result.isCorrect).toBe(true);
  });

  it('startkoden underkänns', () => {
    expect(check(step, step.starterCode).isCorrect).toBe(false);
  });

  it('har why, tre ledtrådar, xp och tester', () => {
    expect(step.why.length).toBeGreaterThan(20);
    expect(step.hints).toHaveLength(3);
    expect(step.xp).toBeGreaterThan(0);
    expect(step.tests.length).toBeGreaterThan(0);
  });
});

describe('projekten', () => {
  it('har tre projekt med tre steg per bana', () => {
    for (const track of TRACKS) {
      const projects = PROJECTS.filter(item => item.track === track.id);
      expect(projects, track.id).toHaveLength(3);
      for (const project of projects) expect(project.steps).toHaveLength(3);
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
});
