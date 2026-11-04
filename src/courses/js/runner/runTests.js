const TIMEOUT_MS = 2000;
const TIMEOUT_ERROR =
  'Koden tog för lång tid att köra. Har du skrivit en oändlig loop?';

// Startar en ny worker för varje körning. Fastnar koden i en
// oändlig loop kan vi då bara avsluta workern efter TIMEOUT_MS.
function runInWorker(message, emptyResult) {
  return new Promise(resolve => {
    const worker = new Worker(new URL('./testWorker.js', import.meta.url), {
      type: 'module',
    });

    function finish(result) {
      clearTimeout(timer);
      worker.terminate();
      resolve(result);
    }

    const timer = setTimeout(() => {
      finish({ ...emptyResult, error: TIMEOUT_ERROR });
    }, TIMEOUT_MS);

    worker.onmessage = event => finish(event.data);
    worker.onerror = event => finish({ ...emptyResult, error: event.message });

    worker.postMessage(message);
  });
}

export function runTests(code, tests, sourceChecks, options) {
  return runInWorker({ code, tests, sourceChecks, options }, { results: [] });
}

// Kör koden rad för rad, se stepThrough i evaluate.js.
export function stepCode(code, options) {
  return runInWorker({ mode: 'step', code, options }, { steps: [], logs: [] });
}
