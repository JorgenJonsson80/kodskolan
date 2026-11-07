const TIMEOUT_MS = 2000;
const TIMEOUT_ERROR =
  'Koden tog för lång tid att köra. Har du skrivit en oändlig loop?';

// Startar en ny worker för varje körning. Fastnar koden i en
// oändlig loop kan vi då bara avsluta workern efter timeoutMs.
// bridge: { fetch(request), reset() } svarar på workerns frågor när
// options.bridge är satt (Fullstack-kursen, se testWorker.js).
function runInWorker(message, emptyResult, bridge, timeoutMs = TIMEOUT_MS) {
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
    }, timeoutMs);

    worker.onmessage = async ({ data }) => {
      if (data.type === 'done') {
        finish(data.result);
        return;
      }
      const value =
        data.type === 'fetch'
          ? await bridge.fetch(data.request)
          : await bridge.reset();
      worker.postMessage({ type: 'answer', id: data.id, value });
    };
    worker.onerror = event => finish({ ...emptyResult, error: event.message });

    worker.postMessage(message);
  });
}

export function runTests(code, tests, sourceChecks, options, bridge) {
  return runInWorker(
    { code, tests, sourceChecks, options: { ...options, bridge: !!bridge } },
    { results: [] },
    bridge,
    bridge ? bridge.timeoutMs : TIMEOUT_MS,
  );
}

// Kör koden rad för rad, se stepThrough i evaluate.js.
export function stepCode(code, options) {
  return runInWorker({ mode: 'step', code, options }, { steps: [], logs: [] });
}
