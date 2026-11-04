import { useEffect, useState } from 'react';
import { useCourse } from '../course';
import {
  loadPlaygroundCodes,
  PLAYGROUND_COPY as COPY,
  PLAYGROUND_FREE as FREE,
  savePlaygroundCodes,
} from '../lib/playground';
import CodeEditor from './CodeEditor';
import CodeText from './CodeText';
import ErrorBox from './ErrorBox';

// En fri editor utan tester. Man kör koden och ser utskriften, och
// bestämmer själv när den är klar. Koden sparas per idé.
// ideas: alla idéer, med unlocked och trackTitle. ideaId kan också vara
// COPY för kod som kopierats från en övning.
export default function Playground({ ideas, ideaId, onSelectIdea, onBack }) {
  const course = useCourse();
  const { runtime, texts, ResultPreview } = course;
  // HTML visar sidan medan man skriver och har ingen Kör-knapp.
  const { runs, intro } = course.playground;
  const [codes, setCodes] = useState(() => loadPlaygroundCodes(course));
  const idea = ideas.find(item => item.id === ideaId && item.unlocked) ?? null;
  const hasCopy = codes[COPY] !== undefined;
  const key = idea?.id ?? (ideaId === COPY && hasCopy ? COPY : FREE);
  const code = codes[key] ?? course.content.ideaStarterCode(idea);
  const [run, setRun] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const workbench = course.useWorkbench({
    code,
    lesson: null,
    idea,
    busy: isRunning,
  });

  useEffect(() => {
    savePlaygroundCodes(course, codes);
  }, [course, codes]);

  function handleCodeChange(newCode) {
    setCodes(previous => ({ ...previous, [key]: newCode }));
  }

  function handleSelect(event) {
    setRun(null);
    onSelectIdea(event.target.value === FREE ? null : event.target.value);
  }

  async function handleRun() {
    if (isRunning) return;
    setIsRunning(true);
    const raw = await runtime
      .run({ code, tests: [], files: idea?.files, ...workbench.runOptions })
      .catch(() => ({ failed: true }));
    setIsRunning(false);
    setRun(raw);
  }

  function handleReset() {
    setCodes(previous => {
      const rest = { ...previous };
      delete rest[key];
      return rest;
    });
    setRun(null);
  }

  const tracksWithIdeas = [...new Set(ideas.map(item => item.trackTitle))];
  const error = run?.syntaxError
    ? { ...run.syntaxError, isSyntax: true }
    : run?.error;

  return (
    <section
      className="lesson-panel playground"
      aria-labelledby="playground-title"
    >
      <button type="button" className="playground-back" onClick={onBack}>
        ← Tillbaka till övningarna
      </button>
      <h2 id="playground-title">🧪 Lekplatsen</h2>
      <p>
        Här finns inga tester och inget facit. {intro} Du bestämmer själv när
        det är klart.
      </p>

      <label className="playground-pick">
        Bygg
        <select value={key} onChange={handleSelect}>
          <option value={FREE}>Fritt – ingen idé</option>
          {hasCopy && <option value={COPY}>📋 Kopia från övningen</option>}
          {tracksWithIdeas.map(trackTitle => (
            <optgroup key={`group-${trackTitle}`} label={trackTitle}>
              {ideas
                .filter(item => item.trackTitle === trackTitle)
                .map(item => (
                  <option
                    key={item.id}
                    value={item.id}
                    disabled={!item.unlocked}
                  >
                    {item.emoji} {item.title}
                    {item.unlocked ? '' : ' 🔒'}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </label>
      <p className="muted playground-locked-note">
        🔒 Idéerna på en bana låses upp när du byggt ett av banans projekt.
      </p>

      {idea && (
        <aside className="idea-card">
          <h3>
            {idea.emoji} {idea.title}
          </h3>
          <p>{idea.summary}</p>
          <ol>
            {idea.goals.map(goal => (
              <li key={goal}>
                <CodeText text={goal} />
              </li>
            ))}
          </ol>
          <p>
            <strong>Extra:</strong> <CodeText text={idea.extra} />
          </p>
        </aside>
      )}

      <CodeEditor
        code={code}
        onCodeChange={handleCodeChange}
        onRun={runs ? handleRun : undefined}
        {...workbench.editor}
      />
      {workbench.afterEditor}
      <div className="editor-actions">
        {runs && (
          <button
            className="primary-button"
            type="button"
            onClick={handleRun}
            disabled={isRunning}
          >
            {isRunning ? 'Kör koden…' : '▶ Kör koden'}
          </button>
        )}
        {workbench.actions}
        <button type="button" onClick={handleReset}>
          Börja om
        </button>
      </div>
      {workbench.panels}

      <div aria-live="polite">
        {run?.failed && <p className="feedback-error">{texts.failedToStart}</p>}
        {run?.timedOut && (
          <p className="feedback-error">
            Koden tog mer än {runtime.timeoutMs / 1000} sekunder och stoppades.
            Kanske en loop som aldrig tar slut?
          </p>
        )}
        {run && !run.failed && !run.timedOut && ResultPreview && (
          <ResultPreview result={run} />
        )}
        {run &&
          !run.failed &&
          !run.timedOut &&
          !(run.app?.length && !run.console.length) && (
            <figure className="console-output">
              <figcaption>Utskrift</figcaption>
              <pre>
                {run.console.length > 0
                  ? run.console.join('\n')
                  : texts.nothingPrinted}
              </pre>
            </figure>
          )}
        {error && <ErrorBox error={error} />}
      </div>
    </section>
  );
}
