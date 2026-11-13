import { useEffect, useState } from 'react';
import AccountPanel from '../core/components/AccountPanel';
import SiteFooter from '../core/components/SiteFooter';
import { supabase } from '../core/lib/supabase';
import { useAccount } from '../core/lib/useAccount';
import { fetchClassName, joinClass } from './classes';

// /klass/<kod>: eleven går med i lärarens klass. Läraren ser sedan vilka
// övningar eleven klarat, men inte koden.
export default function JoinClassPage({ code }) {
  const account = useAccount();
  const [className, setClassName] = useState(undefined);
  const [name, setName] = useState('');
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState('');
  const home = import.meta.env.BASE_URL;

  useEffect(() => {
    if (!supabase) return;
    let ignore = false;
    fetchClassName(code).then(
      found => !ignore && setClassName(found ?? null),
      () => !ignore && setClassName(null),
    );
    return () => {
      ignore = true;
    };
  }, [code]);

  async function handleJoin(event) {
    event.preventDefault();
    setError('');
    if (!name.trim()) return setError('Skriv namnet läraren ska se.');
    try {
      await joinClass(code, name);
      setJoined(true);
    } catch {
      setError('Det gick inte att gå med. Kolla koden och försök igen.');
    }
  }

  let content;
  if (!supabase || className === null) {
    content = <p>Det finns ingen klass med koden {code}.</p>;
  } else if (className === undefined || !account.isReady) {
    content = <p className="muted">Hämtar klassen…</p>;
  } else if (joined) {
    content = (
      <>
        <p className="feedback-success">
          ✓ Du är med i {className}! Läraren ser nu hur det går för dig.
        </p>
        <a className="primary-button" href={home}>
          Börja koda →
        </a>
      </>
    );
  } else if (!account.user) {
    content = (
      <>
        <p>
          Logga in eller skapa ett konto först, så att läraren kan se dina
          framsteg.
        </p>
        <div className="home-account">
          <AccountPanel account={{ ...account, status: 'synced' }} />
        </div>
      </>
    );
  } else {
    content = (
      <form className="profile-form" onSubmit={handleJoin}>
        <label>
          Ditt namn, som läraren ser det
          <input
            value={name}
            maxLength={60}
            autoComplete="name"
            onChange={event => setName(event.target.value)}
          />
        </label>
        <div className="profile-buttons">
          <button className="primary-button" type="submit">
            Gå med i klassen
          </button>
        </div>
        {error && <p className="feedback-error">{error}</p>}
      </form>
    );
  }

  return (
    <>
      <header className="app-header">
        <h1>
          <a className="home-link" href={home}>
            Kodskolan
          </a>{' '}
          › Gå med i en klass
        </h1>
      </header>
      <main className="home account-page">
        <section className="home-intro">
          <h2>{className ? `Klassen ${className}` : 'Gå med i en klass'}</h2>
          <p className="muted">
            Läraren ser vilka övningar du klarat och hur många du klarat per dag
            – inte din kod. Du kan lämna klassen när du vill under{' '}
            <a href={`${home}konto`}>Mitt konto</a>.
          </p>
          {content}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
