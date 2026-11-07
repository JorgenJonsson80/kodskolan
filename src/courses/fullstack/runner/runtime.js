import { createBridgeFetch } from '../../js/runner/bridgeFetch';
import { evaluate as evaluateFlask } from '../../flask/runner/evaluate';
import { createRunTs, evaluateTs } from '../../ts/runtime';

// Fullstack rättar app.py med Flask-kursens körning och App.tsx med
// TypeScript-kursens. Det nya är att de pratar med varandra: React-sidans
// fetch går till en Flask-app som kör hela tiden (serveStart i
// flask_harness.py), både när testerna körs och i förhandsvisningen.
//
//   flask: { run, serveStart, serveRequest } (Flask-kursens worker)
//   check: TypeScript-kompilatorn (ts.js)
//   runJsTests(code, tests, sourceChecks, options, bridge): JS-kursens
//     rättning, där bridge svarar på fetch och startar om appen
//
// Allt byts ut i testerna i Node, se test/nodeFullstack.js.

const TSX_TIMEOUT_MS = 8000;

const withLang = (error, lang) => error && { ...error, lang };

export function createFullstack({ flask, check, runJsTests }) {
  // Appen som kör just nu, så att den kan startas igen om Flask-workern
  // startats om (efter en oändlig loop i en annan körning).
  let served = null;

  async function serve(code, files) {
    served = { code, files };
    return flask.serveStart(code, files);
  }

  async function request(req) {
    const answer = await flask.serveRequest(req);
    if (!answer?.stopped || !served) return answer;
    await flask.serveStart(served.code, served.files);
    return flask.serveRequest(req);
  }

  // Sidan i förhandsvisningen, med fetch till appen som kör.
  async function pagePreview(frontend) {
    const checked = await check(frontend, []);
    if (!checked.js) return null;
    return {
      code: checked.js,
      fileName: 'main.jsx',
      preview: '<App />',
      fetch: createBridgeFetch(request),
    };
  }

  // app.py: som i Flask-kursen. Har övningen en sida (frontend) startas
  // elevens app, och sidan visas mot den.
  async function runPy({ code, tests, inputs, files, request: req, frontend }) {
    const raw = await flask.run({ code, tests, inputs, files, request: req });
    if (raw.failed || raw.timedOut) return raw;
    let previewSource = null;
    if (frontend && !raw.syntaxError && !raw.error) {
      const started = await serve(code, files);
      if (!started.error) previewSource = await pagePreview(frontend);
    }
    return {
      ...raw,
      syntaxError: withLang(raw.syntaxError, 'py'),
      error: withLang(raw.error, 'py'),
      previewSource,
    };
  }

  // App.tsx: som i TypeScript-kursen, men fetch går till backend (app.py)
  // och appen startas om före varje test.
  async function runTsx({
    code,
    tests,
    typeTests,
    sourceChecks,
    backend,
    files,
    lessonPreview,
  }) {
    const started = await serve(backend, files);
    if (started.error) {
      return {
        syntaxError: null,
        error: {
          type: 'Error',
          message: `Flask-appen (app.py) kunde inte starta: ${started.error.message ?? ''}`,
          lang: 'tsx',
        },
        tests: [],
        output: [],
        console: [],
      };
    }
    const bridge = {
      fetch: request,
      reset: () => serve(backend, files),
      timeoutMs: TSX_TIMEOUT_MS,
    };
    const runTs = createRunTs({
      check,
      runTests: (c, t, sc, options) => runJsTests(c, t, sc, options, bridge),
    });
    const raw = await runTs({
      code,
      tests,
      typeTests,
      sourceChecks,
      lessonPreview,
    });
    let previewSource = raw.previewSource;
    if (previewSource) {
      // Testerna har bokat och loggat in. Sidan börjar från noll.
      await serve(backend, files);
      previewSource = { ...previewSource, fetch: createBridgeFetch(request) };
    }
    return {
      ...raw,
      syntaxError: withLang(raw.syntaxError, 'tsx'),
      error: withLang(raw.error, 'tsx'),
      previewSource,
    };
  }

  return {
    run: job => (job.lang === 'tsx' ? runTsx(job) : runPy(job)),
  };
}

export function evaluateFullstack(lesson, code, raw) {
  if (lesson.lang === 'tsx') return evaluateTs(lesson, code, raw);
  return {
    ...evaluateFlask(lesson, code, raw),
    previewSource: raw.previewSource,
  };
}
