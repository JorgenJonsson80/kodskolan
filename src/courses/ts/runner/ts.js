// En varm worker med TypeScripts kompilator. Den kan inte fastna (en
// typkontroll tar alltid slut), så till skillnad från Python och SQL
// behövs ingen timeout här. Elevens kod körs sedan i JS-kursens worker,
// som har sin egen.

let worker = null;
let ready = null;
let nextId = 0;
const pending = new Map();
let status = 'idle';
const listeners = new Set();

function setStatus(next) {
  status = next;
  for (const listener of listeners) listener(next);
}

export function onStatus(listener) {
  listeners.add(listener);
  listener(status);
  return () => listeners.delete(listener);
}

function start() {
  setStatus('starting');
  worker = new Worker(new URL('./tsWorker.js', import.meta.url), {
    type: 'module',
  });
  ready = new Promise((resolve, reject) => {
    worker.onmessage = ({ data }) => {
      if (data.type === 'ready') {
        setStatus('ready');
        resolve();
      } else if (data.type === 'result') {
        pending.get(data.id)?.(data.result);
        pending.delete(data.id);
      }
    };
    worker.onerror = event =>
      reject(new Error(event.message || 'TypeScript kunde inte starta'));
  });
  ready.catch(() => {
    worker = null;
    setStatus('failed');
  });
}

export function warmUp() {
  if (!worker) start();
  return ready;
}

function ask(kind, job) {
  return warmUp().then(
    () =>
      new Promise(resolve => {
        const id = ++nextId;
        pending.set(id, resolve);
        worker.postMessage({ ...job, kind, id });
      }),
  );
}

// { syntaxErrors, typeErrors, typeTests, js }, se checker.js.
export const checkTs = (code, typeTests) => ask('check', { code, typeTests });
export const diagnosticsFor = code => ask('diagnostics', { code });
export const quickInfoAt = (code, pos) => ask('quickInfo', { code, pos });
export const completionsAt = (code, pos) => ask('completions', { code, pos });
