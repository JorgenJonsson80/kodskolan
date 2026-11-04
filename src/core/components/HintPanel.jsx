import { useState } from 'react';

// Ledtrådarna visas en i taget. Man kan be om nästa när man vill, och
// efter några felaktiga försök visas de av sig själva.
function HintPanel({ hints, failedAttempts, isBoss }) {
  const [requested, setRequested] = useState(0);

  if (isBoss || hints.length === 0) {
    return <p className="muted">Felaktiga försök: {failedAttempts}</p>;
  }

  const automatic = Math.max(0, Math.min(failedAttempts - 1, hints.length));
  const shown = Math.max(requested, automatic);

  return (
    <>
      <p className="muted">Felaktiga försök: {failedAttempts}</p>
      {hints.slice(0, shown).map((hint, index) => (
        <p key={hint} className="hint">
          <span aria-hidden="true">💡</span> Ledtråd {index + 1}: {hint}
        </p>
      ))}
      {shown < hints.length && (
        <button
          type="button"
          className="hint-button"
          onClick={() => setRequested(shown + 1)}
        >
          💡 {shown === 0 ? 'Visa en ledtråd' : 'Visa nästa ledtråd'} (
          {shown + 1} av {hints.length})
        </button>
      )}
    </>
  );
}

export default HintPanel;
