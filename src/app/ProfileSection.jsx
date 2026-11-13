import { useEffect, useState } from 'react';
import {
  deleteProfile,
  fetchMyProfile,
  profileUrl,
  saveProfile,
  SLUG_PATTERN,
  toSlug,
} from './profile';

// På /konto: skapa, ändra eller ta bort sin publika profil. Ingen profil
// finns förrän eleven själv väljer att skapa en.
export default function ProfileSection({ account }) {
  const [state, setState] = useState({ status: 'loading' });
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let ignore = false;
    fetchMyProfile().then(
      profile => {
        if (ignore) return;
        setState({ status: 'ready', profile });
        if (profile) {
          setName(profile.display_name);
          setSlug(profile.slug);
          setSlugTouched(true);
        }
      },
      () => !ignore && setState({ status: 'error' }),
    );
    return () => {
      ignore = true;
    };
  }, []);

  function handleName(value) {
    setName(value);
    if (!slugTouched) setSlug(toSlug(value));
  }

  async function handleSave(event) {
    event.preventDefault();
    setError('');
    if (!name.trim()) return setError('Skriv namnet som ska synas.');
    if (!SLUG_PATTERN.test(slug)) {
      return setError(
        'Adressen ska vara 3–30 tecken: små bokstäver a–z, siffror och bindestreck.',
      );
    }
    setBusy(true);
    try {
      await saveProfile(account.user, slug, name);
      setState({
        status: 'ready',
        profile: { slug, display_name: name.trim() },
      });
    } catch (caught) {
      setError(caught.message);
    }
    setBusy(false);
  }

  async function handleDelete() {
    setBusy(true);
    try {
      await deleteProfile(account.user);
      setState({ status: 'ready', profile: null });
    } catch {
      setError('Profilen kunde inte tas bort. Försök igen om en stund.');
    }
    setBusy(false);
  }

  if (state.status === 'loading') return null;
  const profile = state.profile;

  return (
    <section id="profil">
      <h2>Din profil</h2>
      <p>
        En egen sida med ditt namn och dina diplom, att länka till från ditt CV
        eller LinkedIn. Den syns bara om du skapar den, och bara namnet och
        diplomen visas.
      </p>
      {state.status === 'error' && (
        <p className="feedback-error">Profilen kunde inte hämtas just nu.</p>
      )}
      {profile && (
        <p className="feedback-success">
          Din profil:{' '}
          <a href={profileUrl(profile.slug)}>
            {profileUrl(profile.slug).replace(/^https?:\/\//, '')}
          </a>
        </p>
      )}
      <form className="profile-form" onSubmit={handleSave}>
        <label>
          Namnet som syns
          <input
            value={name}
            maxLength={60}
            onChange={event => handleName(event.target.value)}
            autoComplete="name"
          />
        </label>
        <label>
          Adress: …/profil/
          <input
            value={slug}
            maxLength={30}
            onChange={event => {
              setSlugTouched(true);
              setSlug(event.target.value.toLowerCase());
            }}
            spellCheck={false}
          />
        </label>
        <div className="profile-buttons">
          <button className="primary-button" type="submit" disabled={busy}>
            {profile ? 'Spara ändringarna' : 'Skapa min profil'}
          </button>
          {profile && (
            <button
              type="button"
              className="danger-button"
              onClick={handleDelete}
              disabled={busy}
            >
              Ta bort profilen
            </button>
          )}
        </div>
      </form>
      {error && <p className="feedback-error">{error}</p>}
    </section>
  );
}
