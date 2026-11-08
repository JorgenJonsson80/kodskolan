import { useState } from 'react';
import { errorText, MIN_PASSWORD } from '../lib/authText';

const statusText = {
  loading: 'Hämtar dina framsteg…',
  synced: '✓ Sparat i ditt konto',
  error: 'Kunde inte spara. Försöker igen vid nästa ändring.',
};

// Det som står på knappen och efter att mejlet skickats, per sätt.
const MODES = {
  login: { submit: 'Logga in', busy: 'Loggar in…' },
  signup: {
    submit: 'Skapa konto',
    busy: 'Skapar konto…',
    sent: to => (
      <>
        Kolla din mejl! Klicka på länken vi skickat till <strong>{to}</strong>{' '}
        för att bekräfta kontot.
      </>
    ),
  },
  link: {
    submit: 'Skicka inloggningslänk',
    busy: 'Skickar…',
    sent: to => (
      <>
        Kolla din mejl! Vi har skickat en inloggningslänk till{' '}
        <strong>{to}</strong>.
      </>
    ),
  },
  forgot: {
    submit: 'Skicka länk för nytt lösenord',
    busy: 'Skickar…',
    sent: to => (
      <>
        Kolla din mejl! Vi har skickat en länk till <strong>{to}</strong> där du
        väljer ett nytt lösenord.
      </>
    ),
  },
};

function SignInForm({ account, compact }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sentTo, setSentTo] = useState(null);
  const [error, setError] = useState(null);
  const [isBusy, setIsBusy] = useState(false);
  const hasPassword = mode === 'login' || mode === 'signup';

  function switchTo(newMode) {
    setMode(newMode);
    setError(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const address = email.trim();
    setIsBusy(true);
    setError(null);
    const actions = {
      login: () => account.signInWithPassword(address, password),
      signup: () => account.signUp(address, password),
      link: () => account.signInWithLink(address),
      forgot: () => account.sendPasswordReset(address),
    };
    const failed = await actions[mode]();
    setIsBusy(false);
    if (failed) setError(errorText(failed));
    else if (MODES[mode].sent) setSentTo(address);
  }

  async function handleGoogle() {
    setError(null);
    const failed = await account.signInWithGoogle();
    if (failed) setError(errorText(failed));
  }

  if (sentTo) {
    return (
      <>
        <p>{MODES[mode].sent(sentTo)}</p>
        <button
          type="button"
          className="link-button"
          onClick={() => {
            setSentTo(null);
            switchTo('login');
          }}
        >
          ← Tillbaka
        </button>
      </>
    );
  }

  const linkTo = (newMode, text) => (
    <button
      key={`mode-${newMode}`}
      type="button"
      className="link-button"
      onClick={() => switchTo(newMode)}
    >
      {text}
    </button>
  );

  return (
    <>
      {!compact && (
        <p className="muted">
          Logga in så sparas dina framsteg i ett konto och följer med till andra
          enheter.
        </p>
      )}
      {account.hasGoogle && mode !== 'forgot' && (
        <>
          <button
            type="button"
            className="google-button"
            onClick={handleGoogle}
          >
            <span aria-hidden="true" className="google-mark">
              G
            </span>
            Fortsätt med Google
          </button>
          <p className="account-or" aria-hidden="true">
            eller
          </p>
        </>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="din@mejl.se"
          aria-label="Mejladress"
          autoComplete="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        {hasPassword && (
          <input
            type="password"
            required
            minLength={mode === 'signup' ? MIN_PASSWORD : undefined}
            placeholder={
              mode === 'signup'
                ? `Välj ett lösenord (minst ${MIN_PASSWORD} tecken)`
                : 'Lösenord'
            }
            aria-label="Lösenord"
            autoComplete={
              mode === 'signup' ? 'new-password' : 'current-password'
            }
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        )}
        <button className="primary-button" type="submit" disabled={isBusy}>
          {isBusy ? MODES[mode].busy : MODES[mode].submit}
        </button>
        {error && <p className="feedback-error">{error}</p>}
      </form>
      <div className="account-links">
        {mode === 'login' && [
          linkTo('signup', 'Skapa konto'),
          linkTo('forgot', 'Glömt lösenordet?'),
          linkTo('link', 'Logga in med länk i mejlet'),
        ]}
        {mode === 'signup' &&
          linkTo('login', 'Har du redan ett konto? Logga in')}
        {(mode === 'link' || mode === 'forgot') &&
          linkTo('login', '← Logga in med lösenord')}
      </div>
    </>
  );
}

// Inloggning med Google, lösenord eller en länk i mejlet. Utan inloggning
// sparas allt bara i den här webbläsaren.
// compact: bara formuläret, när rutan runt redan förklarar varför.
export default function AccountPanel({ account, onSignOut, compact = false }) {
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
        <div className="account-actions">
          <button type="button" onClick={onSignOut}>
            Logga ut
          </button>
          <a href={`${import.meta.env.BASE_URL}konto`}>Mitt konto och data</a>
        </div>
      </section>
    );
  }

  return (
    <section className="card account-panel" aria-label="Logga in">
      {!compact && <h2>☁️ Spara dina framsteg</h2>}
      <SignInForm account={account} compact={compact} />
    </section>
  );
}
