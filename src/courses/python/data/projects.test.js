import { beforeAll, describe, expect, it } from 'vitest';
import { evaluate } from '../runner/evaluate';
import { exampleCall } from '../lib/useStepper';
import { nodeRunStudent, nodeStepStudent } from '../test/nodePython';
import { conceptsTooEarly } from '../test/concepts';
import { isProjectComplete, noHintsBonusXp } from '../../../core/projects';
import { PROJECT_STEPS, PROJECTS } from './projects';
import { TRACKS } from './tracks';

let run;
let step;
beforeAll(async () => {
  run = await nodeRunStudent();
  step = await nodeStepStudent();
});

const check = (lesson, code) =>
  evaluate(
    lesson,
    code,
    run({
      code,
      tests: lesson.tests,
      inputs: lesson.inputs,
      files: lesson.files,
    }),
  );

describe.each(PROJECT_STEPS.map(item => [item.id, item]))('%s', (_, item) => {
  it('facit klarar sina egna tester', () => {
    const result = check(item, item.solution);
    expect(result.results.filter(entry => !entry.passed)).toEqual([]);
    expect(result.isCorrect).toBe(true);
  });

  it('facit går att köra rad för rad utan fel', () => {
    const result = step({
      code: item.solution,
      inputs: item.inputs,
      example: exampleCall(item.tests),
      files: item.files,
    });
    expect(result.syntaxError).toBeNull();
    expect(result.error).toBeNull();
  });

  it('startkoden underkänns', () => {
    expect(check(item, item.starterCode).isCorrect).toBe(false);
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
    const [project] = PROJECTS;
    expect(isProjectComplete(project, [`${project.id}-1`])).toBe(false);
    const all = project.steps.map((_, index) => `${project.id}-${index + 1}`);
    expect(isProjectComplete(project, all)).toBe(true);
    expect(noHintsBonusXp(project)).toBe(25);
  });
});
