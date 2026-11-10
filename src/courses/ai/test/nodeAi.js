import { readFileSync } from 'node:fs';
import { loadPyodide } from 'pyodide';
import { PYODIDE_PACKAGES } from '../../fastapi/runner/packages';
import { withModel } from '../runner/model';

// Samma körning som i webbläsaren, med pyodide från npm: Python-kursens
// harness, FastAPI-kursens och sist låtsasmodellen.
let runAi = null;

const read = path => readFileSync(new URL(path, import.meta.url));

export async function nodeRunAi() {
  if (!runAi) {
    const pyodide = await loadPyodide();
    await pyodide.loadPackage(PYODIDE_PACKAGES);
    pyodide.runPython(read('../../python/runner/harness.py').toString());
    pyodide.runPython(
      read('../../fastapi/runner/fastapi_harness.py').toString(),
    );
    pyodide.runPython(read('../runner/ai_harness.py').toString());
    const fn = pyodide.globals.get('run_ai');
    runAi = job => {
      const {
        code,
        tests = [],
        inputs = [],
        files,
        request = null,
      } = withModel(job);
      return JSON.parse(
        fn(
          code,
          JSON.stringify(tests),
          JSON.stringify(inputs),
          JSON.stringify(files),
          request ? JSON.stringify(request) : null,
        ),
      );
    };
  }
  return runAi;
}
