import { beforeAll, describe, expect, it } from 'vitest';
import { evaluate } from '../../../python/runner/evaluate';
import { exampleCall } from '../../../python/lib/useStepper';
import {
  nodeRunStudent,
  nodeStepStudent,
} from '../../../python/test/nodePython';
import { conceptsTooEarly } from '../../test/concepts';
import { TRACKS } from '../tracks';
import { LESSONS } from '.';

let run;
let step;
beforeAll(async () => {
  run = await nodeRunStudent();
  step = await nodeStepStudent();
}, 120000);

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

describe.each(LESSONS.map(lesson => [lesson.id, lesson]))('%s', (_, lesson) => {
  it('facit klarar sina egna tester', () => {
    const result = check(lesson, lesson.solution);
    expect(result.results?.filter(entry => !entry.passed) ?? []).toEqual([]);
    expect(result.isCorrect).toBe(true);
  });

  it('facit går att köra rad för rad utan fel', () => {
    const result = step({
      code: lesson.solution,
      inputs: lesson.inputs,
      example: exampleCall(lesson.tests),
      files: lesson.files,
    });
    expect(result.syntaxError).toBeNull();
    expect(result.error).toBeNull();
  });

  it('startkoden underkänns', () => {
    expect(check(lesson, lesson.starterCode).isCorrect).toBe(false);
  });

  it('har tre ledtrådar (bossen inga), en bana och tester', () => {
    expect(lesson.hints).toHaveLength(lesson.isBoss ? 0 : 3);
    expect(TRACKS.map(track => track.id)).toContain(lesson.track);
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

  it('kommer i banornas ordning', () => {
    const order = LESSONS.map(lesson => lesson.track).filter(
      (track, index, all) => track !== all[index - 1],
    );
    expect(order).toEqual(TRACKS.map(track => track.id));
  });
});
