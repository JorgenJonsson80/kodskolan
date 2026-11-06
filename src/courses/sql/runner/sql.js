import { TIMEOUT_MS } from './timeout';

// En varm worker med SQLite som återanvänds mellan körningar. En fråga
// som aldrig tar slut (WITH RECURSIVE utan stopp) går inte att avbryta
// inifrån, så vid timeout stängs workern av och en ny startas, som i
// Python-kursen.

let worker = null;
let ready = null;
let queue = Promise.resolve();
let nextId = 0;
const pending = new Map();

function start() {
  worker = new Worker(new URL('./sqlWorker.js', import.meta.url), {
    type: 'module',
  });
  ready = new Promise((resolve, reject) => {
    worker.onmessage = ({ data }) => {
      if (data.type === 'ready') resolve();
      else if (data.type === 'failed') reject(new Error(data.message));
      else if (data.type === 'result') {
        pending.get(data.id)?.(data.result);
        pending.delete(data.id);
      }
    };
    worker.onerror = event =>
      reject(new Error(event.message || 'SQLite kunde inte starta'));
  });
  ready.catch(() => {
    worker = null;
  });
}

export function warmUp() {
  if (!worker) start();
  return ready;
}

function runOnce(job, timeout) {
  return warmUp().then(
    () =>
      new Promise(resolve => {
        const id = ++nextId;
        const timer = setTimeout(() => {
          pending.delete(id);
          worker.terminate();
          worker = null;
          resolve({ timedOut: true });
        }, timeout);
        pending.set(id, result => {
          clearTimeout(timer);
          resolve(result);
        });
        worker.postMessage({ ...job, id });
      }),
  );
}

// En sak i taget, så att en timeout bara stoppar sin egen körning.
function enqueue(job, timeout = TIMEOUT_MS) {
  const run = queue.then(() => runOnce(job, timeout));
  queue = run.catch(() => {});
  return run;
}

// job: { code, setup, tests, solution }, se engine.js.
export const runSqlJob = job => enqueue({ ...job, kind: 'run' });

// Tabellerna i en databas, till 📋 Tabellerna och editorns förslag.
export const describeSetup = setup => enqueue({ kind: 'describe', setup });
