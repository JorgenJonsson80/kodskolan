import { evaluate } from '../runner/evaluate';
import { nodeRunFastapi } from './nodeFastapi';

// Kör en övning som i webbläsaren och ger feedbacken eleven skulle se.
export async function nodeCheck(lesson, code) {
  const run = await nodeRunFastapi();
  const raw = run({
    code,
    tests: lesson.tests,
    files: lesson.files,
    request: { method: 'GET', path: '/', ...lesson.request },
  });
  return evaluate(lesson, code, raw);
}
