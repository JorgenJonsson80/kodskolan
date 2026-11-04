import { useState } from 'react';
import { stepCode } from '../runner/runTests';

// Ett anrop från lektionens tester, t.ex. 'addBonus(10)', att köra
// koden med om den bara består av funktioner.
export function exampleCall(tests = []) {
  return (
    tests
      .map(test => test.code)
      .find(
        code => /^[A-Za-z_$][\w$]*\(/.test(code) && !code.startsWith('__'),
      ) ?? null
  );
}

// Stegen som visas. Gick koden sönder läggs ett sista steg till som
// visar felet på raden där det hände.
export function buildFrames({ steps, logs, error }) {
  if (!error) return steps;
  const last = steps.at(-1);
  return [
    ...steps,
    {
      line: last?.line ?? null,
      vars: last?.vars ?? [],
      logCount: logs.length,
      error,
    },
  ];
}

// Kör rad för rad. Körningen hör till koden den gjordes med, så om
// eleven ändrar koden stängs den, eftersom stegen inte stämmer längre.
export function useStepper(code, options) {
  const [state, setState] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const active = state?.code === code ? state : null;

  async function start() {
    setIsRunning(true);
    const run = await stepCode(code, options);
    setIsRunning(false);
    setState({ code, run, frames: buildFrames(run), index: 0 });
  }

  const frame = active?.frames[active.index];
  return {
    isRunning,
    start,
    stop: () => setState(null),
    frames: active?.frames ?? null,
    logs: active?.run.logs ?? [],
    example: active?.run.example ?? null,
    result: active?.run.result,
    index: active?.index ?? 0,
    setIndex: index => setState(previous => ({ ...previous, index })),
    activeLine: frame?.line ?? null,
  };
}
