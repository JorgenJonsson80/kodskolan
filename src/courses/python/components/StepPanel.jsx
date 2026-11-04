import { useEffect, useRef, useState } from 'react';
import {
  baselineFor,
  changesBetween,
  isGuessRight,
  questionFor,
} from '../lib/stepExplain';
import { readJson, writeJson } from '../../../core/lib/storage';
import { TIMEOUT_MS } from '../runner/python';
import CodeText from '../../../core/components/CodeText';
import ErrorBox from '../../../core/components/ErrorBox';

const GUESS_KEY = 'pyacademy-step-guess';
const SPEEDS = [
  { label: 'Långsamt', ms: 1600 },
  { label: 'Lagom', ms: 900 },
  { label: 'Snabbt', ms: 350 },
];

// Visar ett steg i taget från Kör rad för rad: vilken rad som körs
// härnäst, vad raden innan gjorde, variablernas värden just då, anropen
// som väntar och vad som skrivits ut hittills. I Gissa först-läget får
// eleven gissa vad som händer innan nästa steg visas.
export default function StepPanel({ stepper }) {
  const { frames, index, stop, example, result, explanation } = stepper;
  const frame = frames[index];
  const last = frames.length - 1;
  const output = stepper.console.slice(0, frame.out).replace(/\n$/, '');
  const changes = Object.fromEntries(
    index > 0
      ? changesBetween(baselineFor(frames, index), frame).map(change => [
          change.name,
          change,
        ])
      : [],
  );

  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(SPEEDS[1].ms);
  const [guessMode, setGuessMode] = useState(() =>
    readJson(GUESS_KEY, false, value => typeof value === 'boolean'),
  );
  const [question, setQuestion] = useState(null);
  const [guess, setGuess] = useState('');
  const [verdict, setVerdict] = useState(null);
  const [score, setScore] = useState({ right: 0, total: 0 });
  const guessRef = useRef(null);

  function go(target) {
    setQuestion(null);
    stepper.setIndex(Math.max(0, Math.min(last, target)));
  }

  function forward() {
    if (index >= last) return;
    if (guessMode) {
      const next = questionFor(frames, index, stepper.console);
      if (next) {
        setQuestion(next);
        setGuess('');
        return;
      }
    }
    go(index + 1);
  }

  function answer(value) {
    const right = isGuessRight(value, question.answer);
    setVerdict({ index: index + 1, right, answer: question.answer });
    setScore(previous => ({
      right: previous.right + (right ? 1 : 0),
      total: previous.total + 1,
    }));
    go(index + 1);
  }

  function toggleGuessMode(on) {
    setGuessMode(on);
    writeJson(GUESS_KEY, on);
    setQuestion(null);
    if (on) setPlaying(false);
  }

  // Uppspelningen stannar av sig själv på sista steget.
  const isPlaying = playing && index < last;
  const { setIndex } = stepper;
  useEffect(() => {
    if (!isPlaying) return undefined;
    const timer = setTimeout(() => setIndex(index + 1), speed);
    return () => clearTimeout(timer);
  }, [isPlaying, index, speed, setIndex]);

  useEffect(() => {
    if (question && !question.options) guessRef.current?.focus();
  }, [question]);

  function handleKeyDown(event) {
    if (event.target.type === 'range' || event.target.type === 'text') return;
    if (event.code === 'ArrowRight') {
      event.preventDefault();
      forward();
    }
    if (event.code === 'ArrowLeft') {
      event.preventDefault();
      go(index - 1);
    }
  }

  const shownVerdict = verdict?.index === index ? verdict : null;

  return (
    <section
      className="step-panel"
      aria-label="Kör rad för rad"
      onKeyDown={handleKeyDown}
    >
      <div className="step-header">
        <strong>👣 Rad för rad</strong>
        <button type="button" onClick={stop}>
          Stäng
        </button>
      </div>

      {example && (
        <p className="muted step-example">
          Koden består av funktioner, så vi anropar dem som testet gör:{' '}
          <code>{example}</code>
        </p>
      )}
      {frames.length > 1 && (
        <>
          <div className="step-controls">
            <button
              type="button"
              onClick={() => go(0)}
              disabled={index === 0}
              aria-label="Första steget"
            >
              ⏮
            </button>
            <button
              type="button"
              onClick={() => go(index - 1)}
              disabled={index === 0}
            >
              ◀ Bakåt
            </button>
            <span className="step-count" aria-live="polite">
              Steg {index + 1} av {frames.length}
            </span>
            <button
              type="button"
              className="primary-button"
              onClick={forward}
              disabled={index === last || question !== null}
            >
              Framåt ▶
            </button>
            <button
              type="button"
              onClick={() => go(last)}
              disabled={index === last}
              aria-label="Sista steget"
            >
              ⏭
            </button>
          </div>
          <input
            type="range"
            min={0}
            max={last}
            value={index}
            onChange={event => go(Number(event.target.value))}
            aria-label="Välj steg"
          />
          <div className="step-options">
            <button
              type="button"
              onClick={() => {
                if (!isPlaying && index === last) go(0);
                setQuestion(null);
                setPlaying(!isPlaying);
              }}
              disabled={guessMode}
              title={
                guessMode
                  ? 'Stäng av Gissa först för att spela upp'
                  : 'Kör alla steg av sig själv'
              }
            >
              {isPlaying ? '⏸ Pausa' : '▶ Spela upp'}
            </button>
            <label className="step-speed">
              Fart{' '}
              <select
                value={speed}
                onChange={event => setSpeed(Number(event.target.value))}
              >
                {SPEEDS.map(option => (
                  <option key={`speed-${option.ms}`} value={option.ms}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="step-guess-toggle">
              <input
                type="checkbox"
                checked={guessMode}
                onChange={event => toggleGuessMode(event.target.checked)}
              />{' '}
              🤔 Gissa först
            </label>
            {score.total > 0 && (
              <span className="step-score">
                Rätt gissat: {score.right} av {score.total}
              </span>
            )}
          </div>
        </>
      )}

      {question && (
        <form
          className="step-question"
          onSubmit={event => {
            event.preventDefault();
            if (guess.trim()) answer(guess);
          }}
        >
          <p>
            🤔 <CodeText text={question.prompt} />
          </p>
          {question.options ? (
            <div className="step-question-actions">
              {question.options.map(option => (
                <button
                  key={`option-${option}`}
                  type="button"
                  onClick={() => answer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <div className="step-question-actions">
              <input
                ref={guessRef}
                type="text"
                value={guess}
                onChange={event => setGuess(event.target.value)}
                aria-label="Din gissning"
                placeholder="Din gissning"
                autoComplete="off"
                spellCheck={false}
              />
              <button type="submit" className="primary-button">
                Gissa
              </button>
            </div>
          )}
          <button
            type="button"
            className="step-skip"
            onClick={() => go(index + 1)}
          >
            Hoppa över och visa
          </button>
        </form>
      )}

      {shownVerdict && (
        <p
          className={
            shownVerdict.right ? 'feedback-success' : 'step-verdict-wrong'
          }
          role="status"
        >
          {shownVerdict.right ? (
            '✅ Rätt gissat!'
          ) : (
            <>
              ❌ Inte riktigt – det blev <code>{shownVerdict.answer}</code>. Läs
              vad som hände nedan.
            </>
          )}
        </p>
      )}

      {explanation && (
        <div className="step-explain" aria-live="polite">
          <strong>Vad hände på rad {explanation.line}?</strong>
          <ul>
            {explanation.sentences.map((sentence, position) => (
              <li key={`explain-${position}`}>
                <CodeText text={sentence} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="step-status">
        {frame.timedOut ? (
          <span className="feedback-error">
            Koden tog mer än {TIMEOUT_MS / 1000} sekunder och stoppades.
          </span>
        ) : frame.error?.type === 'StepLimit' ? (
          <span className="feedback-error">
            💥 Stoppade efter {frames.length - 1} steg. Har du en oändlig loop,
            eller väldigt många varv?
          </span>
        ) : frame.error ? null : frame.line === null ? (
          example ? (
            <>
              ✅ Klart! <code>{example}</code> gav <code>{result}</code>.
            </>
          ) : (
            '✅ Koden har körts klart. Så här ser variablerna ut till sist.'
          )
        ) : frame.returned !== undefined ? (
          <>
            Rad <strong>{frame.line}</strong> är klar och funktionen{' '}
            <code>{frame.scope}</code> lämnar tillbaka{' '}
            <code>{frame.returned}</code>.
          </>
        ) : (
          <>
            Rad <strong>{frame.line}</strong> körs härnäst – den är markerad i
            editorn. Variablerna visar läget just innan.
          </>
        )}
      </p>
      {frame.error && frame.error.type !== 'StepLimit' && (
        <ErrorBox error={frame.error} />
      )}

      {frame.call && (
        <div className="step-stack">
          <span className="muted">📚 Anropen just nu:</span>
          <ol>
            {frame.outer.map((outer, position) => (
              <li key={`outer-${position}`}>
                <code>{outer.call ?? 'programmet'}</code>
              </li>
            ))}
            <li className="step-stack-current">
              <code>{frame.call}</code>
            </li>
          </ol>
        </div>
      )}

      {frame.vars.length > 0 ? (
        <table className="step-vars">
          <caption className="muted">
            {frame.call ? (
              <>
                Variablerna inne i <code>{frame.call}</code>
              </>
            ) : (
              'Variablerna'
            )}
          </caption>
          <thead>
            <tr>
              <th scope="col">Variabel</th>
              <th scope="col">Värde</th>
            </tr>
          </thead>
          <tbody>
            {frame.vars.map(([name, value]) => {
              const change = changes[name];
              return (
                <tr
                  key={`var-${name}`}
                  className={change ? 'step-changed' : undefined}
                >
                  <th scope="row">{name}</th>
                  <td>
                    {value}
                    {change && (
                      <span className="step-changed-label">
                        {change.before === null
                          ? ' ny'
                          : ` var ${change.before}`}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        !frame.error &&
        !frame.timedOut && <p className="muted">Inga variabler än.</p>
      )}

      {frame.outer?.length > 0 && (
        <details className="step-outer">
          <summary>Variablerna i anropen som väntar</summary>
          {frame.outer.map((outer, position) => (
            <div key={`outer-vars-${position}`}>
              <p className="muted">
                <code>{outer.call ?? 'programmet'}</code>
              </p>
              {outer.vars.length > 0 ? (
                <table className="step-vars">
                  <tbody>
                    {outer.vars.map(([name, value]) => (
                      <tr key={`outer-${position}-${name}`}>
                        <th scope="row">{name}</th>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="muted">Inga variabler.</p>
              )}
            </div>
          ))}
        </details>
      )}

      {output && (
        <figure className="console-output">
          <figcaption>Utskrift hittills</figcaption>
          <pre>{output}</pre>
        </figure>
      )}
      <p className="muted step-tip">
        Tips: använd piltangenterna ← → för att stega. Raden som just kördes är
        grön i editorn och visar vad den gjorde.
      </p>
    </section>
  );
}
