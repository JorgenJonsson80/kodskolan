import { createPythonRunner } from '../../python/runner/python';

// Samma varma worker, tidsgräns och status som i Python-kursen, men med
// FastAPI och låtsasmodellen (aiWorker.js).
export const {
  onStatus,
  warmUp,
  runPython: runAi,
} = createPythonRunner(
  () =>
    new Worker(new URL('./aiWorker.js', import.meta.url), {
      type: 'module',
    }),
);
