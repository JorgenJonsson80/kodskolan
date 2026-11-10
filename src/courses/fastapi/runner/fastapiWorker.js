import harness from '../../python/runner/harness.py?raw';
import { PYODIDE_URL } from '../../python/runner/pyodideVersion';
import fastapiHarness from './fastapi_harness.py?raw';
import { PYODIDE_PACKAGES } from './packages';

// Python-kursens Pyodide med FastAPI. FastAPI, Pydantic och resten ingår i
// Pyodide och hämtas från jsDelivr en gång, när kursen öppnas.
const ready = (async () => {
  const { loadPyodide } = await import(
    /* @vite-ignore */ `${PYODIDE_URL}pyodide.mjs`
  );
  const pyodide = await loadPyodide({ indexURL: PYODIDE_URL });
  await pyodide.loadPackage(PYODIDE_PACKAGES);
  pyodide.runPython(harness);
  pyodide.runPython(fastapiHarness);
  return pyodide.globals.get('run_fastapi');
})();

ready.then(
  () => postMessage({ type: 'ready' }),
  error => postMessage({ type: 'failed', message: String(error) }),
);

onmessage = async ({ data }) => {
  const run = await ready;
  const json = run(
    data.code,
    JSON.stringify(data.tests ?? []),
    JSON.stringify(data.inputs ?? []),
    JSON.stringify(data.files ?? {}),
    data.request ? JSON.stringify(data.request) : null,
  );
  postMessage({ type: 'result', id: data.id, result: JSON.parse(json) });
};
