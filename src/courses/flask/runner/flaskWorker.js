import harness from '../../python/runner/harness.py?raw';
import { PYODIDE_URL } from '../../python/runner/pyodideVersion';
import flaskHarness from './flask_harness.py?raw';
import { PYODIDE_PACKAGES, WHEELS } from './wheels';

// Python-kursens Pyodide med Flask. Jinja2 och de andra paketen som
// ingår i Pyodide hämtas från jsDelivr, och Flask från sajten själv
// (public/wheels). Allt laddas en gång när kursen öppnas.
const ready = (async () => {
  const { loadPyodide } = await import(
    /* @vite-ignore */ `${PYODIDE_URL}pyodide.mjs`
  );
  const pyodide = await loadPyodide({ indexURL: PYODIDE_URL });
  await pyodide.loadPackage(PYODIDE_PACKAGES);
  const wheels = await Promise.all(
    WHEELS.map(async name => {
      const response = await fetch(`${import.meta.env.BASE_URL}wheels/${name}`);
      if (!response.ok) throw new Error(`Kunde inte hämta ${name}`);
      return new Uint8Array(await response.arrayBuffer());
    }),
  );
  wheels.forEach(wheel => pyodide.unpackArchive(wheel, 'wheel'));
  pyodide.runPython(harness);
  pyodide.runPython(flaskHarness);
  return {
    run: pyodide.globals.get('run_flask'),
    serveStart: pyodide.globals.get('serve_start'),
    serveRequest: pyodide.globals.get('serve_request'),
  };
})();

ready.then(
  () => postMessage({ type: 'ready' }),
  error => postMessage({ type: 'failed', message: String(error) }),
);

// Fullstack: appen startas en gång och tar sedan emot anrop från
// React-sidan (serveStart och serveRequest i flask_harness.py).
function handle(python, data) {
  if (data.kind === 'serveStart') {
    return python.serveStart(data.code, JSON.stringify(data.files ?? {}));
  }
  if (data.kind === 'serveRequest') {
    return python.serveRequest(JSON.stringify(data.request));
  }
  return python.run(
    data.code,
    JSON.stringify(data.tests ?? []),
    JSON.stringify(data.inputs ?? []),
    JSON.stringify(data.files ?? {}),
    data.request ? JSON.stringify(data.request) : null,
  );
}

onmessage = async ({ data }) => {
  const python = await ready;
  const json = handle(python, data);
  postMessage({ type: 'result', id: data.id, result: JSON.parse(json) });
};
