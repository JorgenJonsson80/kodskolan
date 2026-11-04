import { useCallback, useState } from 'react';
import { stepPython } from '../runner/python';
import { explainStep } from './stepExplain';

// Ett anrop från övningens tester, t.ex. 'summa([1, 2, 3])', att köra
// koden med om den bara består av funktioner.
export function exampleCall(tests = []) {
  return (
    tests
      .map(test => test.code)
      .find(code => /^[A-Za-z_]\w*\(/.test(code) && !code.startsWith('__')) ??
    null
  );
}

// Stegen som visas. Gick koden sönder läggs ett sista steg till som
// visar felet på raden där det hände.
export function buildFrames(run) {
  if (run.timedOut) {
    return [{ line: null, vars: [], out: 0, timedOut: true }];
  }
  if (run.syntaxError) {
    return [
      {
        line: run.syntaxError.line,
        vars: [],
        out: 0,
        error: { ...run.syntaxError, isSyntax: true },
      },
    ];
  }
  if (!run.error) return run.steps;
  const last = run.steps.at(-1);
  return [
    ...run.steps,
    {
      line: run.error.line ?? last?.line ?? null,
      scope: last?.scope ?? null,
      vars: last?.vars ?? [],
      out: run.console.length,
      error: run.error,
    },
  ];
}

// Kör rad för rad. Körningen hör till koden den gjordes med, så om
// eleven ändrar koden stängs den, eftersom stegen inte stämmer längre.
export function useStepper(code, { inputs, example, files }) {
  const [state, setState] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const active = state?.code === code ? state : null;
  // Stabil, så att uppspelningen i StepPanel inte startar om sin timer.
  const setIndex = useCallback(
    index => setState(previous => ({ ...previous, index })),
    [],
  );

  async function start() {
    setIsRunning(true);
    const run = await stepPython({ code, inputs, example, files }).catch(
      () => ({
        timedOut: true,
      }),
    );
    setIsRunning(false);
    setState({ code, run, frames: buildFrames(run), index: 0 });
  }

  const frame = active?.frames[active.index];
  const explanation = active
    ? explainStep(active.frames, active.index, active.run.console)
    : null;
  return {
    isRunning,
    start,
    stop: () => setState(null),
    frames: active?.frames ?? null,
    console: active?.run.console ?? '',
    example: active?.run.example ?? null,
    result: active?.run.result ?? null,
    index: active?.index ?? 0,
    setIndex,
    activeLine: frame?.line ?? null,
    explanation,
    note:
      explanation?.note && !frame?.error
        ? { line: explanation.line, text: explanation.note }
        : null,
  };
}
