// Kvalitetskontroller för alla övningar och projektsteg, så att nya
// övningar håller samma nivå: facit ser ut som Prettier gör det, använder
// bara det man lärt sig, och går att köra rad för rad.
import { format } from 'prettier/standalone';
import * as babel from 'prettier/plugins/babel';
import * as estree from 'prettier/plugins/estree';
import { describe, expect, it } from 'vitest';
import { exampleCall } from '../lib/useStepper';
import { evaluate, stepThrough } from '../runner/evaluate';
import { lessons } from './lesson';
import { projectSteps } from './projects';
import { tracks } from './tracks';

const exercises = [...lessons, ...projectSteps];
const trackIndex = id => tracks.findIndex(track => track.id === id);
const isJavaScript = item => trackIndex(item.track) <= trackIndex('debug-js');

// Begrepp och banan där de lärs ut.
const CONCEPTS = [
  ['arrow functions', /=>/, 'functions'],
  ['template literals', /`/, 'strings'],
  ['?.', /\?\./, 'strings'],
  ['??', /\?\?/, 'strings'],
  ['map', /\.map\(/, 'array-methods'],
  ['filter', /\.filter\(/, 'array-methods'],
  ['find', /\.find\(/, 'array-methods'],
  ['reduce', /\.reduce\(/, 'array-methods'],
  ['villkorsoperatorn ? :', /[^?.]\?[^?.][^:\n]*:/, 'modern-js'],
  ['spread och rest', /\.\.\./, 'modern-js'],
  ['destructuring', /(const|let)\s*[{[]/, 'modern-js'],
  ['some', /\.some\(/, 'immutable'],
  ['every', /\.every\(/, 'immutable'],
  ['toSorted', /\.toSorted\(/, 'immutable'],
  ['async och await', /\basync\b|\bawait\b/, 'async'],
];

describe('kvalitet', () => {
  it.each(lessons)('$id underkänner startkoden', async lesson => {
    const { error, results } = await evaluate(
      lesson.starterCode,
      lesson.tests,
      lesson.sourceChecks,
      lesson,
    );
    const passed =
      !error && results.length > 0 && results.every(result => result.passed);
    expect(passed).toBe(false);
  });

  it.each(exercises)('$id har facit formaterat som Prettier', async item => {
    const formatted = await format(item.solution, {
      parser: 'babel',
      plugins: [babel, estree],
      singleQuote: true,
      arrowParens: 'avoid',
    });
    expect(item.solution.trim()).toBe(formatted.trim());
  });

  it.each(exercises)('$id använder bara det man lärt sig', item => {
    const code = item.solution.replace(/\/\/.*$/gm, '');
    const early = CONCEPTS.filter(
      ([, pattern, taughtIn]) =>
        trackIndex(item.track) < trackIndex(taughtIn) && pattern.test(code),
    ).map(([name]) => name);
    expect(early).toEqual([]);
  });

  it.each(exercises.filter(item => isJavaScript(item) && !item.files))(
    '$id går att köra rad för rad',
    async item => {
      const run = await stepThrough(item.solution, {
        ...item,
        example: exampleCall(item.tests),
      });
      expect(run.error).toBeNull();
    },
  );
});
