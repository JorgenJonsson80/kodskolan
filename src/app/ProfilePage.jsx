import { useEffect, useState } from 'react';
import SiteFooter from '../core/components/SiteFooter';
import { supabase } from '../core/lib/supabase';
import { fetchPublicProfile } from './profile';

const yearMonth = date =>
  date.toLocaleDateString('sv-SE', { year: 'numeric', month: 'long' });

function usePublicProfile(slug) {
  const [state, setState] = useState({ status: 'loading' });
  useEffect(() => {
    if (!supabase) return;
    let ignore = false;
    fetchPublicProfile(slug).then(
      profile =>
        !ignore &&
        setState(
          profile ? { status: 'found', profile } : { status: 'missing' },
        ),
      () => !ignore && setState({ status: 'error' }),
    );
    return () => {
      ignore = true;
    };
  }, [slug]);
  return supabase ? state : { status: 'missing' };
}

// /profil/<slug>: en elevs portfolio med diplomen, att länka till från
// ett CV eller LinkedIn. Diplomen leder till sina egna sidor med koden.
export default function ProfilePage({ slug }) {
  const state = usePublicProfile(slug);
  const home = import.meta.env.BASE_URL;
  const profile = state.profile;
  const paths = profile?.diplomas.filter(d => d.kind === 'path') ?? [];
  const courses = profile?.diplomas.filter(d => d.kind !== 'path') ?? [];

  useEffect(() => {
    if (profile) document.title = `${profile.name} – Kodskolan`;
  }, [profile]);

  const list = (title, diplomas) =>
    diplomas.length > 0 && (
      <section>
        <h2>{title}</h2>
        <ul className="profile-diplomas">
          {diplomas.map(diploma => (
            <li key={`diplom-${diploma.id}`}>
              <a href={`${home}diplom/${diploma.id}`}>
                <span aria-hidden="true">{diploma.details?.icon ?? '🎓'}</span>{' '}
                <strong>{diploma.details?.title ?? diploma.subject}</strong>
              </a>
              <span className="muted">
                {' '}
                · {yearMonth(new Date(diploma.issued_at))}
              </span>
            </li>
          ))}
        </ul>
      </section>
    );

  return (
    <>
      <header className="app-header">
        <h1>
          <a className="home-link" href={home}>
            Kodskolan
          </a>{' '}
          › Profil
        </h1>
      </header>
      <main className="home profile-page">
        {state.status !== 'found' ? (
          <section className="home-intro">
            <p>
              {state.status === 'loading'
                ? 'Hämtar profilen…'
                : state.status === 'error'
                  ? 'Profilen kunde inte hämtas. Försök igen om en stund.'
                  : `Det finns ingen profil som heter ${slug}.`}
            </p>
            <a href={home}>← Till Kodskolan</a>
          </section>
        ) : (
          <>
            <section className="home-intro">
              <h2>{profile.name}</h2>
              <p className="muted">
                Lär sig koda i Kodskolan sedan{' '}
                {yearMonth(new Date(profile.since))}.
              </p>
              <p>
                {profile.diplomas.length === 0
                  ? 'Inga diplom än – men det kommer.'
                  : [
                      `${courses.length} kursdiplom`,
                      paths.length > 0 && `${paths.length} spårdiplom`,
                    ]
                      .filter(Boolean)
                      .join(' och ') + '.'}
              </p>
            </section>
            {list('Spår', paths)}
            {list('Kurser', courses)}
            <p className="muted">
              Varje diplom har en kod som kan kontrolleras på sin sida.
              Övningarna rättas automatiskt med tester i webbläsaren.
            </p>
          </>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
