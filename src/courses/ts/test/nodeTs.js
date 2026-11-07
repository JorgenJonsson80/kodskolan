import { evaluate } from '../../js/runner/evaluate';
import { checkAndCompile, createChecker } from '../runner/checker';
import { LIB_FILES } from '../runner/libs';
import { createRunTs, evaluateTs } from '../runtime';

// Samma rättning som i webbläsaren, men utan workers: kompilatorn och
// JS-kursens evaluate körs direkt i Node.
const checker = createChecker(LIB_FILES);

export const nodeRunTs = createRunTs({
  check: async (code, typeTests) => checkAndCompile(checker, code, typeTests),
  runTests: evaluate,
});

// Kör en övning och ger feedbacken eleven skulle se.
export async function nodeCheck(lesson, code) {
  const raw = await nodeRunTs({
    code,
    tests: lesson.tests,
    typeTests: lesson.typeTests,
    sourceChecks: lesson.sourceChecks,
  });
  return evaluateTs(lesson, code, raw);
}

export const nodeChecker = checker;
