// Körs i en egen tråd så att elevens kod inte kan frysa sidan.
import { createBridgeFetch } from './bridgeFetch';
import { evaluate, stepThrough } from './evaluate';

// Med options.bridge går fetch via sidan till en riktig Flask-app
// (Fullstack-kursen), och appen startas om före varje test. Sidan svarar
// med { type: 'answer', id, value }.
let nextId = 0;
const waiting = new Map();

function ask(type, payload = {}) {
  return new Promise(resolve => {
    const id = ++nextId;
    waiting.set(id, resolve);
    self.postMessage({ type, id, ...payload });
  });
}

function withBridge(options = {}) {
  if (!options.bridge) return options;
  return {
    ...options,
    fetch: createBridgeFetch(request => ask('fetch', { request })),
    beforeTest: () => ask('reset'),
  };
}

self.onmessage = async event => {
  const { data } = event;
  if (data.type === 'answer') {
    waiting.get(data.id)?.(data.value);
    waiting.delete(data.id);
    return;
  }
  const { mode, code, tests, sourceChecks } = data;
  const options = withBridge(data.options);
  self.postMessage({
    type: 'done',
    result:
      mode === 'step'
        ? await stepThrough(code, options)
        : await evaluate(code, tests, sourceChecks, options),
  });
};
