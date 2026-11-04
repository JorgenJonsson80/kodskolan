import ErrorHint from './ErrorHint';

// Visar ett steg i taget från Kör rad för rad: vilken rad som körs
// härnäst, variablernas värden just då och vad konsolen skrivit hittills.
// Värden som ändrats sedan förra steget markeras.
export default function StepPanel({ stepper }) {
  const { frames, logs, index, setIndex, stop, example, result } = stepper;
  const frame = frames[index];
  const previous = Object.fromEntries(frames[index - 1]?.vars ?? []);
  const last = frames.length - 1;
  const output = logs.slice(0, frame.logCount);

  function handleKeyDown(event) {
    if (event.target.type === 'range') return;
    if (event.key === 'ArrowRight' && index < last) setIndex(index + 1);
    if (event.key === 'ArrowLeft' && index > 0) setIndex(index - 1);
  }

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
          Koden består av funktioner, så vi kör dem som testet gör:{' '}
          <code>{example}</code>
        </p>
      )}
      <div className="step-controls">
        <button
          type="button"
          onClick={() => setIndex(0)}
          disabled={index === 0}
          aria-label="Första steget"
        >
          ⏮
        </button>
        <button
          type="button"
          onClick={() => setIndex(index - 1)}
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
          onClick={() => setIndex(index + 1)}
          disabled={index === last}
        >
          Framåt ▶
        </button>
        <button
          type="button"
          onClick={() => setIndex(last)}
          disabled={index === last}
          aria-label="Sista steget"
        >
          ⏭
        </button>
      </div>
      {frames.length > 1 && (
        <input
          type="range"
          min={0}
          max={last}
          value={index}
          onChange={event => setIndex(Number(event.target.value))}
          aria-label="Välj steg"
        />
      )}

      <p className="step-status">
        {frame.error ? (
          <span className="feedback-error">
            💥 {frame.line ? `Fel på rad ${frame.line}: ` : ''}
            {frame.error}
          </span>
        ) : frame.line === null ? (
          example ? (
            <>
              ✅ Klart! <code>{example}</code> gav <code>{result}</code>.
            </>
          ) : (
            '✅ Koden har körts klart. Så här ser variablerna ut till sist.'
          )
        ) : (
          <>
            Rad <strong>{frame.line}</strong> körs härnäst – den är markerad i
            editorn. Variablerna visar läget just innan.
          </>
        )}
      </p>
      {frame.error && <ErrorHint message={frame.error} />}

      {frame.vars.length > 0 ? (
        <table className="step-vars">
          <thead>
            <tr>
              <th scope="col">Variabel</th>
              <th scope="col">Värde</th>
            </tr>
          </thead>
          <tbody>
            {frame.vars.map(([name, value]) => {
              const changed = index > 0 && previous[name] !== value;
              return (
                <tr key={name} className={changed ? 'step-changed' : undefined}>
                  <th scope="row">{name}</th>
                  <td>
                    {value}
                    {changed && (
                      <span className="step-changed-label">
                        {name in previous ? ' ändrad' : ' ny'}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        !frame.error && <p className="muted">Inga variabler än.</p>
      )}

      {output.length > 0 && (
        <figure className="console-output">
          <figcaption>Konsol hittills</figcaption>
          <pre>{output.join('\n')}</pre>
        </figure>
      )}
      <p className="muted step-tip">
        Tips: använd piltangenterna ← → för att stega.
      </p>
    </section>
  );
}
