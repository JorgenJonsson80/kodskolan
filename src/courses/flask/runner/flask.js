import { createPythonRunner } from '../../python/runner/python';

// Samma varma worker, tidsgräns och status som i Python-kursen, men med
// Flask (flaskWorker.js).
export const {
  onStatus,
  warmUp,
  runPython: runFlask,
  runJob,
} = createPythonRunner(
  () =>
    new Worker(new URL('./flaskWorker.js', import.meta.url), {
      type: 'module',
    }),
);

// Fullstack: starta appen en gång, och skicka sedan anrop till den.
export const serveStart = (code, files) =>
  runJob({ kind: 'serveStart', code, files });
export const serveRequest = request =>
  runJob({ kind: 'serveRequest', request });
