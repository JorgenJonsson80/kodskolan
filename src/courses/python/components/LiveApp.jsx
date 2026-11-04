import { useState } from 'react';
import { stliteDocument } from '../lib/stlite';

// Riktig Streamlit (stlite) i en iframe. Koden fryses när appen öppnas,
// så att appen inte startar om för varje tangent. 🔄 kör den nya koden.
export default function LiveApp({ code, files }) {
  const [shown, setShown] = useState(null);

  if (shown === null) {
    return (
      <div className="live-app-start">
        <button
          type="button"
          onClick={() => setShown({ code, round: 1 })}
          title="Kör appen i riktig Streamlit, direkt i webbläsaren"
        >
          🚀 Öppna appen i riktig Streamlit
        </button>
        <span className="muted">
          Första gången laddas Streamlit (cirka 30 MB), så det tar en stund.
        </span>
      </div>
    );
  }

  return (
    <section className="live-app" aria-label="Appen i riktig Streamlit">
      <div className="live-app-header">
        <strong>🚀 Din app</strong>
        <span className="muted">
          {shown.code === code
            ? 'Klicka och prova – det är riktig Streamlit.'
            : 'Koden har ändrats sedan appen öppnades.'}
        </span>
        <button
          type="button"
          onClick={() => setShown({ code, round: shown.round + 1 })}
        >
          🔄 Kör den nya koden
        </button>
        <button type="button" onClick={() => setShown(null)}>
          Stäng
        </button>
      </div>
      <iframe
        key={`live-${shown.round}`}
        title="Streamlit-appen"
        srcDoc={stliteDocument(shown.code, files)}
      />
    </section>
  );
}
