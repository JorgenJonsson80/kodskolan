import { useEffect, useRef, useState } from 'react';
import { diplomaUrl, issueDiploma } from '../lib/diplomas';

// Eleven skriver sitt namn och får ett diplom med en kod. Kräver
// inloggning, så att diplomet sparas och går att visa upp med länken.
// title är det diplomet gäller ("kursen SQL", "spåret Backend").
export default function DiplomaDialog({
  kind,
  subject,
  title,
  details,
  account,
  onClose,
}) {
  const dialogRef = useRef(null);
  const [name, setName] = useState('');
  const [state, setState] = useState({ busy: false, error: null });

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setState({ busy: true, error: null });
    try {
      const code = await issueDiploma(kind, subject, name, details);
      window.location.assign(diplomaUrl(code));
    } catch {
      setState({
        busy: false,
        error: 'Diplomet kunde inte skapas. Försök igen om en stund.',
      });
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="quiz diploma-dialog"
      aria-labelledby="diploma-title"
      onClose={onClose}
    >
      <h2 id="diploma-title">🎓 Grattis!</h2>
      <p>
        Du har klarat {title}. Nu kan du få ett diplom med en egen kod, som vem
        som helst kan slå upp. Det visar att du genomfört hela kursen i
        Kodskolan.
      </p>
      {account.user ? (
        <form onSubmit={handleSubmit}>
          <label>
            Namnet på diplomet
            <input
              value={name}
              maxLength={80}
              required
              autoComplete="name"
              onChange={event => setName(event.target.value)}
            />
          </label>
          {state.error && <p className="error-text">{state.error}</p>}
          <div className="quiz-actions">
            <button type="button" onClick={() => dialogRef.current?.close()}>
              Inte nu
            </button>
            <button
              className="primary-button"
              disabled={state.busy || name.trim() === ''}
            >
              {state.busy ? 'Skapar…' : 'Skapa diplomet'}
            </button>
          </div>
        </form>
      ) : (
        <>
          <p>
            <strong>Logga in först</strong> (rutan Spara dina framsteg), så
            sparas diplomet i ditt konto och får en länk du kan dela.
          </p>
          <div className="quiz-actions">
            <button
              className="primary-button"
              type="button"
              onClick={() => dialogRef.current?.close()}
            >
              OK
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}
