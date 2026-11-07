import { createBridgeFetch } from '../../js/runner/bridgeFetch';
import { evaluate } from '../../js/runner/evaluate';
import { nodeRunFlask, nodeServe } from '../../flask/test/nodeFlask';
import { nodeChecker } from '../../ts/test/nodeTs';
import { checkAndCompile } from '../../ts/runner/checker';
import { createFullstack, evaluateFullstack } from '../runner/runtime';

// Samma rättning som i webbläsaren, men utan workers: Flask i Pyodide från
// npm, TypeScripts kompilator och JS-kursens evaluate direkt i Node.
let runtime = null;

export async function nodeFullstack() {
  if (!runtime) {
    const runFlask = await nodeRunFlask();
    const serve = await nodeServe();
    runtime = createFullstack({
      flask: {
        run: async job => runFlask(job),
        serveStart: async (code, files) => serve.start(code, files),
        serveRequest: async request => serve.request(request),
      },
      check: async (code, typeTests) =>
        checkAndCompile(nodeChecker, code, typeTests),
      runJsTests: (code, tests, sourceChecks, options, bridge) =>
        evaluate(code, tests, sourceChecks, {
          ...options,
          fetch: createBridgeFetch(bridge.fetch),
          beforeTest: bridge.reset,
        }),
    });
  }
  return runtime;
}

// Kör en övning som LessonPanel gör och ger feedbacken eleven skulle se.
export async function nodeCheck(lesson, code) {
  const { run } = await nodeFullstack();
  const raw = await run({
    code,
    tests: lesson.tests,
    inputs: lesson.inputs,
    files: lesson.files,
    lang: lesson.lang,
    request: lesson.request,
    frontend: lesson.frontend,
    backend: lesson.backend,
    typeTests: lesson.typeTests,
    sourceChecks: lesson.sourceChecks,
    lessonPreview: lesson.preview,
  });
  return { raw, feedback: evaluateFullstack(lesson, code, raw) };
}
