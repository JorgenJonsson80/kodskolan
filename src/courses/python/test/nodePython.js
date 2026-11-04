import { readFileSync } from 'node:fs';
import { loadPyodide } from 'pyodide';

// Samma harness.py som i webbläsaren, men med pyodide från npm.
let runStudent = null;
let pyodideInstance = null;

export async function nodeRunStudent() {
  if (!runStudent) {
    const pyodide = await loadPyodide();
    // pandas laddas en gång för alla tester. Första gången hämtas det från
    // jsDelivr och sparas sedan i node_modules.
    await pyodide.loadPackage('pandas');
    pyodideInstance = pyodide;
    pyodide.runPython(
      readFileSync(new URL('../runner/harness.py', import.meta.url), 'utf8'),
    );
    const fn = pyodide.globals.get('run_student');
    runStudent = ({ code, tests = [], inputs = [], files = {} }) =>
      JSON.parse(
        fn(
          code,
          JSON.stringify(tests),
          JSON.stringify(inputs),
          JSON.stringify(files),
        ),
      );
  }
  return runStudent;
}

let stepStudent = null;

export async function nodeStepStudent() {
  if (!stepStudent) {
    await nodeRunStudent();
    const fn = pyodideInstance.globals.get('step_student');
    stepStudent = ({ code, inputs = [], example = null, files = {} }) =>
      JSON.parse(
        fn(code, JSON.stringify(inputs), example, JSON.stringify(files)),
      );
  }
  return stepStudent;
}
