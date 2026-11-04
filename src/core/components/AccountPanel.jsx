import { useState } from 'react';

const statusText = {
  loading: 'Hämtar dina framsteg…',
  synced: '✓ Sparat i ditt konto',
  error: 'Kunde inte spara. Försöker igen vid nästa ändring.',
};

// Inloggning med en länk i mejlet. Utan inloggning sparas allt bara i
// den här webbläsaren.
export default function AccountPanel({ account, onSignOut }) {
  const [email, setEmail] = useState('');
  const [sentTo, setSentTo] = useState(null);
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(false);

  if (!account.isAvailable) return null;

  if (account.user) {
    return (
      <section className="card account-panel" aria-label="Ditt konto">
        <p className="account-email">☁️ {account.user.email}</p>
        <p
          className={
            account.status === 'error'
              ? 'feedback-error'
              : 'muted account-status'
          }
        >
          {statusText[account.status]}
        </p>
        <button type="button" onClick={onSignOut}>
          Logga ut
        </button>
      </section>
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSending(true);
    setError(null);
    const signInError = await account.signIn(email.trim());
    setIsSending(false);
    if (signInError) {
      setError('Det gick inte att skicka länken. Försök igen om en stund.');
    } else {
      setSentTo(email.trim());
    }
  }

  return (
    <section className="card account-panel" aria-label="Logga in">
      <h2>☁️ Spara dina framsteg</h2>
      {sentTo ? (
        <p>
          Kolla din mejl! Vi har skickat en inloggningslänk till{' '}
          <strong>{sentTo}</strong>.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <p className="muted">
            Logga in så sparas dina framsteg i ett konto och följer med till
            andra enheter.
          </p>
          <input
            type="email"
            required
            placeholder="din@mejl.se"
            aria-label="Mejladress"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <button className="primary-button" type="submit" disabled={isSending}>
            {isSending ? 'Skickar…' : 'Skicka inloggningslänk'}
          </button>
          {error && <p className="feedback-error">{error}</p>}
        </form>
      )}
    </section>
  );
}
