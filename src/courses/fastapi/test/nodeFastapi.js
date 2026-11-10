import { readFileSync } from 'node:fs';
import { loadPyodide } from 'pyodide';
import { PYODIDE_PACKAGES } from '../runner/packages';

// Samma körning som i webbläsaren, med pyodide från npm.
let runFastapi = null;

const read = path => readFileSync(new URL(path, import.meta.url));

export async function nodeRunFastapi() {
  if (!runFastapi) {
    const pyodide = await loadPyodide();
    await pyodide.loadPackage(PYODIDE_PACKAGES);
    pyodide.runPython(read('../../python/runner/harness.py').toString());
    pyodide.runPython(read('../runner/fastapi_harness.py').toString());
    const fn = pyodide.globals.get('run_fastapi');
    runFastapi = ({
      code,
      tests = [],
      inputs = [],
      files = {},
      request = null,
    }) =>
      JSON.parse(
        fn(
          code,
          JSON.stringify(tests),
          JSON.stringify(inputs),
          JSON.stringify(files),
          request ? JSON.stringify(request) : null,
        ),
      );
  }
  return runFastapi;
}
