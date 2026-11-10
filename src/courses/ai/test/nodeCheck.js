import { evaluate } from '../runner/evaluate';
import { nodeRunAi } from './nodeAi';

// Kör en övning som i webbläsaren och ger feedbacken eleven skulle se.
export async function nodeCheck(lesson, code) {
  const run = await nodeRunAi();
  const raw = run({
    code,
    tests: lesson.tests,
    files: lesson.files,
    modell: lesson.modell,
    request: lesson.request
      ? { method: 'GET', path: '/', ...lesson.request }
      : null,
  });
  return evaluate(lesson, code, raw);
}
