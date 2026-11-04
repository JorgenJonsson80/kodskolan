// Körs i en egen tråd så att elevens kod inte kan frysa sidan.
import { evaluate, stepThrough } from './evaluate';

self.onmessage = async event => {
  const { mode, code, tests, sourceChecks, options } = event.data;
  self.postMessage(
    mode === 'step'
      ? await stepThrough(code, options)
      : await evaluate(code, tests, sourceChecks, options),
  );
};
