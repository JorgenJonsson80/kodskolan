import { readFileSync } from 'node:fs';
import { loadPyodide } from 'pyodide';
import { PYODIDE_PACKAGES, WHEELS } from '../runner/wheels';

// Samma körning som i webbläsaren, med pyodide från npm och wheel-filerna
// från public/wheels.
let runFlask = null;

const read = path => readFileSync(new URL(path, import.meta.url));

export async function nodeRunFlask() {
  if (!runFlask) {
    const pyodide = await loadPyodide();
    await pyodide.loadPackage(PYODIDE_PACKAGES);
    for (const wheel of WHEELS) {
      pyodide.unpackArchive(
        new Uint8Array(read(`../../../../public/wheels/${wheel}`)),
        'wheel',
      );
    }
    pyodide.runPython(read('../../python/runner/harness.py').toString());
    pyodide.runPython(read('../runner/flask_harness.py').toString());
    const fn = pyodide.globals.get('run_flask');
    runFlask = ({
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
  return runFlask;
}
