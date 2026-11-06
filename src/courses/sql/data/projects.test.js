import { describe, expect, it } from 'vitest';
import { evaluate } from '../runner/evaluate';
import { nodeRunLesson } from '../test/nodeSql';
import { conceptsTooEarly } from '../test/concepts';
import { PROJECT_STEPS, PROJECTS } from './projects';
import { TRACKS } from './tracks';

const check = (step, code) => evaluate(step, code, nodeRunLesson(step, code));

describe.each(PROJECT_STEPS.map(step => [step.id, step]))('%s', (_, step) => {
  it('facit klarar sina egna tester, utan varningar', () => {
    const result = check(step, step.solution);
    expect(result.error ?? null).toBeNull();
    expect(result.results.filter(entry => !entry.passed)).toEqual([]);
    expect(result.isCorrect).toBe(true);
    expect(result.warnings).toEqual([]);
  });

  it('startkoden underkänns', () => {
    expect(check(step, step.starterCode).isCorrect).toBe(false);
  });

  it('facit använder bara det banorna hittills lärt ut', () => {
    expect(conceptsTooEarly(step.solution, step.track)).toEqual([]);
  });

  it('har why, tre ledtrådar, xp och databasen', () => {
    expect(step.why.length).toBeGreaterThan(20);
    expect(step.hints).toHaveLength(3);
    expect(step.xp).toBeGreaterThan(0);
    expect(step.db).toBeTruthy();
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
});
