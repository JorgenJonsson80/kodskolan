// Förhandsvisningen inne i sandlådan (public/sandbox/preview.html). Sidan
// har ingen egen origin (sandbox utan allow-same-origin), så elevens kod
// kommer inte åt appens inloggning, localStorage eller fönster. Allt går
// via postMessage: appen skickar koden, sandlådan svarar med
// renderingsloggen och, i Fullstack-kursen, anropen till Flask-appen.
import { createBridgeFetch } from '../runner/bridgeFetch';
import { startLivePreview } from '../runner/livePreview';

const root = document.getElementById('root');
const waiting = new Map();
let nextId = 0;
let stop = null;

const send = message => window.parent.postMessage(message, '*');

function start({ run, source, bridge }) {
  stop?.();
  waiting.clear();
  const fetch = bridge
    ? createBridgeFetch(
        request =>
          new Promise(resolve => {
            const id = nextId++;
            waiting.set(id, resolve);
            send({ type: 'fetch', run, id, request });
          }),
      )
    : undefined;
  stop = startLivePreview(root, { ...source, fetch }, event =>
    send({ type: 'render', run, event }),
  );
}

window.addEventListener('message', event => {
  if (event.source !== window.parent) return;
  const message = event.data;
  if (message?.type === 'run') start(message);
  if (message?.type === 'fetch-result') {
    waiting.get(message.id)?.(message.answer);
    waiting.delete(message.id);
  }
});

send({ type: 'ready' });
