import { createPythonRunner } from '../../python/runner/python';

// Samma varma worker, tidsgräns och status som i Python-kursen, men med
// Flask (flaskWorker.js).
export const {
  onStatus,
  warmUp,
  runPython: runFlask,
} = createPythonRunner(
  () =>
    new Worker(new URL('./flaskWorker.js', import.meta.url), {
      type: 'module',
    }),
);
