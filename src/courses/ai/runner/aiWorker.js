import fastapiHarness from '../../fastapi/runner/fastapi_harness.py?raw';
import { PYODIDE_PACKAGES } from '../../fastapi/runner/packages';
import harness from '../../python/runner/harness.py?raw';
import { PYODIDE_URL } from '../../python/runner/pyodideVersion';
import aiHarness from './ai_harness.py?raw';
import { withModel } from './model';

// Python-kursens Pyodide med FastAPI och Kodskolans låtsasversion av
// Anthropics SDK. Allt laddas en gång, när kursen öppnas.
const ready = (async () => {
  const { loadPyodide } = await import(
    /* @vite-ignore */ `${PYODIDE_URL}pyodide.mjs`
  );
  const pyodide = await loadPyodide({ indexURL: PYODIDE_URL });
  await pyodide.loadPackage(PYODIDE_PACKAGES);
  pyodide.runPython(harness);
  pyodide.runPython(fastapiHarness);
  pyodide.runPython(aiHarness);
  return pyodide.globals.get('run_ai');
})();

ready.then(
  () => postMessage({ type: 'ready' }),
  error => postMessage({ type: 'failed', message: String(error) }),
);

onmessage = async ({ data }) => {
  const run = await ready;
  const job = withModel(data);
  const json = run(
    job.code,
    JSON.stringify(job.tests ?? []),
    JSON.stringify(job.inputs ?? []),
    JSON.stringify(job.files),
    job.request ? JSON.stringify(job.request) : null,
  );
  postMessage({ type: 'result', id: data.id, result: JSON.parse(json) });
};
