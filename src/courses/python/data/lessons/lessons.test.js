import { beforeAll, describe, expect, it } from 'vitest';
import { evaluate } from '../../runner/evaluate';
import { exampleCall } from '../../lib/useStepper';
import { nodeRunStudent, nodeStepStudent } from '../../test/nodePython';
import { LESSONS } from '.';
import { TRACKS } from '../tracks';
import { conceptsTooEarly } from '../../test/concepts';

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

describe.each(LESSONS.map(lesson => [lesson.id, lesson]))('%s', (_, lesson) => {
  it('facit klarar sina egna tester', () => {
    expect(check(lesson, lesson.solution).isCorrect).toBe(true);
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

  it('har tre ledtrådar (bossen inga) och en bana som finns', () => {
    expect(lesson.hints).toHaveLength(lesson.isBoss ? 0 : 3);
    expect(TRACKS.map(track => track.id)).toContain(lesson.track);
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
