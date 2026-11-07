import { runTests } from '../../js/runner/runTests';
import * as flaskRunner from '../../flask/runner/flask';
import * as tsRunner from '../../ts/runner/ts';
import { createFullstack } from './runtime';

// Kursen i webbläsaren: Flask-kursens worker och TypeScript-kursens.
export const { run } = createFullstack({
  flask: {
    run: job => flaskRunner.runFlask(job),
    serveStart: flaskRunner.serveStart,
    serveRequest: flaskRunner.serveRequest,
  },
  check: tsRunner.checkTs,
  runJsTests: runTests,
});

export function warmUp() {
  return Promise.all([flaskRunner.warmUp(), tsRunner.warmUp()]);
}

// Båda måste vara redo. Statusen är den som ligger efter.
const ORDER = ['failed', 'starting', 'loading', 'idle', 'ready'];

export function onStatus(listener) {
  const now = { flask: 'idle', ts: 'idle' };
  const rank = status => Math.max(ORDER.indexOf(status), 0);
  const tell = () => listener(ORDER[Math.min(rank(now.flask), rank(now.ts))]);
  const stopFlask = flaskRunner.onStatus(status => {
    now.flask = status;
    tell();
  });
  const stopTs = tsRunner.onStatus(status => {
    now.ts = status;
    tell();
  });
  return () => {
    stopFlask();
    stopTs();
  };
}
