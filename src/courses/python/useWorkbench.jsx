import { useState } from 'react';
import LiveApp from './components/LiveApp';
import StepPanel from './components/StepPanel';
import { usesStreamlit } from './lib/stlite';
import { exampleCall, useStepper } from './lib/useStepper';

// Svaren input() får när koden rättas, en grupp per körning och utan
// dubbletter, t.ex. [['3', '9', '7'], ['7']].
function inputRuns(lesson) {
  const runs = [lesson.inputs, ...lesson.tests.map(test => test.inputs)];
  const unique = new Map(
    runs.filter(run => run?.length > 0).map(run => [run.join('\n'), run]),
  );
  return [...unique.values()];
}

// Svaren till input() skrivs ett per rad. En tom sista rad räknas inte,
// men tomma rader i mitten är svar (som när man bara trycker Enter).
function parseAnswers(text) {
  const lines = text.split('\n');
  if (lines.at(-1) === '') lines.pop();
  return lines;
}

// Pythons verktyg runt editorn: Kör rad för rad, svaren till input() och
// Streamlit-appen. lesson är övningen, eller null på Lekplatsen (där
// idea kan vara null för fri kod). busy är sant medan koden rättas.
export function useWorkbench({ code, lesson, idea, busy }) {
  const [answers, setAnswers] = useState('Ada\n');
  const playgroundInputs = parseAnswers(answers);
  const files = lesson ? lesson.files : idea?.files;
  const stepper = useStepper(code, {
    inputs: lesson ? lesson.inputs : playgroundInputs,
    example: lesson ? exampleCall(lesson.tests) : undefined,
    files,
  });
  const runs = lesson ? inputRuns(lesson) : [];

  return {
    runOptions: lesson ? {} : { inputs: playgroundInputs },
    editor: { activeLine: stepper.activeLine, stepNote: stepper.note },
    beforeEditor: runs.length > 0 && (
      <p className="muted input-note">
        {runs.length === 1
          ? 'När koden rättas svarar input(): '
          : `Koden rättas ${runs.length} gånger, och input() svarar: `}
        {runs.map((run, index) => (
          <span key={`run-${index}`}>
            {index > 0 && ' · '}
            <code className="task-code">{run.join(', ')}</code>
          </span>
        ))}
      </p>
    ),
    afterEditor: !lesson && (
      <label className="playground-inputs">
        <span>
          Svar till <code>input()</code>, ett per rad
        </span>
        <textarea
          rows={3}
          value={answers}
          onChange={event => setAnswers(event.target.value)}
          spellCheck={false}
        />
      </label>
    ),
    actions: stepper.frames === null && (
      <button
        type="button"
        onClick={stepper.start}
        disabled={stepper.isRunning || busy}
        title="Se koden köras en rad i taget, med variablernas värden"
      >
        {stepper.isRunning ? 'Kör…' : '👣 Kör rad för rad'}
      </button>
    ),
    panels: (
      <>
        {usesStreamlit(code) && <LiveApp code={code} files={files} />}
        {stepper.frames && <StepPanel stepper={stepper} />}
      </>
    ),
  };
}
