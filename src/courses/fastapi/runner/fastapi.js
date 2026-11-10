import { createPythonRunner } from '../../python/runner/python';

// Samma varma worker, tidsgräns och status som i Python-kursen, men med
// FastAPI (fastapiWorker.js).
export const {
  onStatus,
  warmUp,
  runPython: runFastapi,
} = createPythonRunner(
  () =>
    new Worker(new URL('./fastapiWorker.js', import.meta.url), {
      type: 'module',
    }),
);
