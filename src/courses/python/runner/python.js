// En varm worker med Python som återanvänds mellan körningar. Pyodide tar
// några sekunder att starta, så vi startar inte om för varje körning som
// JS Academy gör. En oändlig loop går inte att avbryta inifrån utan
// SharedArrayBuffer (som GitHub Pages inte tillåter), så vid timeout
// stängs workern av och en ny startas i bakgrunden.

export const TIMEOUT_MS = 3000;

// Flask-kursen gör en egen med sin worker (createPythonRunner).
export function createPythonRunner(makeWorker) {
  let worker = null;
  let ready = null;
  let status = 'idle';
  let queue = Promise.resolve();
  let nextId = 0;
  const listeners = new Set();
  const pending = new Map();
  // Tidsgränsen för varje körning, som pausas medan ett paket laddas.
  const timers = new Map();

  function setStatus(next) {
    status = next;
    listeners.forEach(listener => listener(next));
  }

  // status: 'idle' | 'starting' | 'ready' | 'loading' | 'failed'
  // 'loading' är när ett paket som pandas laddas.
  function onStatus(listener) {
    listeners.add(listener);
    listener(status);
    return () => listeners.delete(listener);
  }

  function start() {
    setStatus('starting');
    worker = makeWorker();
    ready = new Promise((resolve, reject) => {
      worker.onmessage = ({ data }) => {
        if (data.type === 'ready') {
          setStatus('ready');
          resolve();
        } else if (data.type === 'failed') {
          setStatus('failed');
          reject(new Error(data.message));
        } else if (data.type === 'loading') {
          setStatus('loading');
          timers.get(data.id)?.pause();
        } else if (data.type === 'loaded') {
          setStatus('ready');
          timers.get(data.id)?.resume();
        } else if (data.type === 'result') {
          pending.get(data.id)?.(data.result);
          pending.delete(data.id);
        }
      };
      worker.onerror = event => {
        setStatus('failed');
        reject(new Error(event.message || 'Python kunde inte starta'));
      };
    });
    // Ett misslyckat start ska inte ge "Uncaught (in promise)".
    ready.catch(() => {});
  }

  function warmUp() {
    if (!worker || status === 'failed') start();
    return ready;
  }

  function runOnce(job, timeout) {
    return new Promise((resolve, reject) => {
      warmUp().then(() => {
        const id = ++nextId;
        let timer = null;
        const stop = () => {
          pending.delete(id);
          timers.delete(id);
          worker.terminate();
          start();
          resolve({ timedOut: true });
        };
        const resume = () => {
          timer = setTimeout(stop, timeout);
        };
        timers.set(id, { pause: () => clearTimeout(timer), resume });
        resume();
        pending.set(id, result => {
          clearTimeout(timer);
          timers.delete(id);
          resolve(result);
        });
        worker.postMessage({ ...job, id });
      }, reject);
    });
  }

  // Kör en sak i taget, så att en timeout bara stoppar sin egen körning.
  // Tiden räknas från att Python är igång, inte medan den startar.
  function enqueue(job, timeout) {
    const run = queue.then(() => runOnce(job, timeout));
    queue = run.catch(() => {});
    return run;
  }

  // job: { code, tests, inputs, files }
  function runPython(job, timeout = TIMEOUT_MS) {
    return enqueue({ ...job, kind: 'run' }, timeout);
  }

  // Kör rad för rad. job: { code, inputs, example, files }
  function stepPython(job, timeout = TIMEOUT_MS) {
    return enqueue({ ...job, kind: 'step' }, timeout);
  }

  return { onStatus, warmUp, runPython, stepPython };
}

const python = createPythonRunner(
  () =>
    new Worker(new URL('./pyWorker.js', import.meta.url), { type: 'module' }),
);

export const { onStatus, warmUp, runPython, stepPython } = python;
