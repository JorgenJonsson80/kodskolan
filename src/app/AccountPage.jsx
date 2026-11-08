import { useState } from 'react';
import AccountPanel from '../core/components/AccountPanel';
import SiteFooter from '../core/components/SiteFooter';
import { contactUrl } from '../core/lib/contact';
import { useAccount } from '../core/lib/useAccount';
import {
  clearLocalData,
  deleteMyAccount,
  downloadJson,
  localData,
  myData,
} from './myData';

const CONFIRM_WORD = 'RADERA';

function DeleteAccount({ onDeleted }) {
  const [open, setOpen] = useState(false);
  const [word, setWord] = useState('');
  const [state, setState] = useState('idle');

  async function handleDelete(event) {
    event.preventDefault();
    setState('deleting');
    try {
      await deleteMyAccount();
      onDeleted();
    } catch {
      setState('error');
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        className="danger-button"
        onClick={() => setOpen(true)}
      >
        Radera mitt konto…
      </button>
    );
  }

  return (
    <form className="danger-zone" onSubmit={handleDelete}>
      <p>
        Kontot, framstegen i alla kurser och dina diplom raderas för gott. Det
        går inte att ångra, och diplomlänkar du delat slutar fungera. Ladda ner
        din data först om du vill spara något.
      </p>
      <label>
        Skriv <strong>{CONFIRM_WORD}</strong> för att bekräfta
        <input
          value={word}
          onChange={event => setWord(event.target.value)}
          autoComplete="off"
        />
      </label>
      <div className="danger-actions">
        <button
          type="submit"
          className="danger-button"
          disabled={word.trim() !== CONFIRM_WORD || state === 'deleting'}
        >
          {state === 'deleting' ? 'Raderar…' : 'Radera kontot för gott'}
        </button>
        <button type="button" onClick={() => setOpen(false)}>
          Avbryt
        </button>
      </div>
      {state === 'error' && (
        <p className="feedback-error">
          Det gick inte att radera kontot. Försök igen om en stund.
        </p>
      )}
    </form>
  );
}

// /konto: vad Kodskolan sparar om dig, att ladda ner det och att radera
// det (GDPR). Utan inloggning finns bara det som sparats i webbläsaren.
export default function AccountPage() {
  const account = useAccount();
  const [exportError, setExportError] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [localCleared, setLocalCleared] = useState(false);
  const contact = contactUrl();

  async function handleExport() {
    setExportError(false);
    try {
      downloadJson(await myData(account.user), 'kodskolan-min-data.json');
    } catch {
      setExportError(true);
    }
  }

  // Som på startsidan: nästa person här ska inte få med sig dina framsteg.
  async function handleSignOut() {
    await account.signOut();
    clearLocalData();
  }

  function handleClearLocal() {
    clearLocalData();
    setLocalCleared(true);
  }

  const hasLocal = !localCleared && Object.keys(localData()).length > 0;

  return (
    <>
      <header className="app-header">
        <h1>
          <a className="home-link" href={import.meta.env.BASE_URL}>
            Kodskolan
          </a>{' '}
          › Mitt konto och data
        </h1>
      </header>
      <main className="home account-page">
        {deleted ? (
          <section className="home-intro">
            <h2>Ditt konto är raderat</h2>
            <p>
              Kontot och allt i det är borta, och framstegen i den här
              webbläsaren också. Välkommen tillbaka när du vill!
            </p>
            <a href={import.meta.env.BASE_URL}>Till startsidan</a>
          </section>
        ) : (
          <>
            <section className="home-intro">
              <h2>Det här sparar Kodskolan om dig</h2>
              <ul>
                <li>
                  <strong>I den här webbläsaren:</strong> vilka övningar du
                  klarat, din kod i varje övning och på Lekplatsen.
                </li>
                <li>
                  <strong>I ditt konto</strong> (om du loggar in): din
                  mejladress, samma framsteg och kod, och dina diplom med namnet
                  du valt.
                </li>
              </ul>
              <p className="muted">
                Ingen reklam och inga cookies. Kontot används bara för att dina
                framsteg ska följa med dig.
              </p>
              <h3>Statistik</h3>
              <p className="muted">
                För att se var kurserna är för svåra och hitta fel räknar vi
                besök, klarade övningar och banor, använda facit och fel som
                uppstår i sidan. Det skickas till PostHog i EU utan cookies och
                utan något som sparas i din webbläsare, så vi kan inte känna
                igen dig från dag till dag. Din kod och din mejladress skickas
                aldrig. Har du slagit på Do Not Track i webbläsaren skickas
                ingenting.
              </p>
            </section>

            {account.isReady && (
              <div className="home-account">
                <AccountPanel
                  account={{ ...account, status: 'synced' }}
                  onSignOut={handleSignOut}
                />
              </div>
            )}

            <section>
              <h2>Ladda ner din data</h2>
              <p>
                {account.user
                  ? 'Allt i ditt konto och i den här webbläsaren, som en JSON-fil.'
                  : 'Det som sparats i den här webbläsaren, som en JSON-fil.'}
              </p>
              <button type="button" onClick={handleExport}>
                ⬇️ Ladda ner min data
              </button>
              {exportError && (
                <p className="feedback-error">
                  Det gick inte att hämta din data. Försök igen om en stund.
                </p>
              )}
            </section>

            <section>
              <h2>Radera</h2>
              {account.user ? (
                <DeleteAccount onDeleted={() => setDeleted(true)} />
              ) : hasLocal ? (
                <>
                  <p>
                    Utan konto finns allt bara i den här webbläsaren. Du kan
                    tömma det här.
                  </p>
                  <button
                    type="button"
                    className="danger-button"
                    onClick={handleClearLocal}
                  >
                    Töm mina framsteg i webbläsaren
                  </button>
                </>
              ) : (
                <p className="muted">
                  {localCleared
                    ? '✓ Framstegen i webbläsaren är borta.'
                    : 'Det finns inget sparat om dig här.'}
                </p>
              )}
            </section>

            {contact && (
              <section>
                <h2>Frågor?</h2>
                <p>
                  Hör av dig på <a href={contact}>mejl</a>, så svarar vi så
                  snart vi kan.
                </p>
              </section>
            )}
          </>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
