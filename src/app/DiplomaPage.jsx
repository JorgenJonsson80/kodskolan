import { useEffect, useState } from 'react';
import Avatar from '../core/components/Avatar';
import { diplomaUrl, fetchDiploma } from '../core/lib/diplomas';
import { supabase } from '../core/lib/supabase';
import { stages } from '../core/stages';

const MONTHS = [
  'januari',
  'februari',
  'mars',
  'april',
  'maj',
  'juni',
  'juli',
  'augusti',
  'september',
  'oktober',
  'november',
  'december',
];

const longDate = date =>
  `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

// Lägg till på LinkedIn under Licenser och certifikat.
function linkedInUrl(diploma, title, issued) {
  const params = new URLSearchParams({
    startTask: 'CERTIFICATION_NAME',
    name: `Kodskolan: ${title}`,
    organizationName: 'Kodskolan',
    issueYear: String(issued.getFullYear()),
    issueMonth: String(issued.getMonth() + 1),
    certUrl: diplomaUrl(diploma.id),
    certId: diploma.id,
  });
  return `https://www.linkedin.com/profile/add?${params}`;
}

function useDiploma(code) {
  const [state, setState] = useState({ status: 'loading' });
  useEffect(() => {
    if (!supabase) return;
    let ignore = false;
    fetchDiploma(code).then(
      diploma => {
        if (!ignore) {
          setState(
            diploma ? { status: 'found', diploma } : { status: 'missing' },
          );
        }
      },
      () => !ignore && setState({ status: 'error' }),
    );
    return () => {
      ignore = true;
    };
  }, [code]);
  // Utan Supabase finns inga diplom att hämta.
  return supabase ? state : { status: 'missing' };
}

// Ett diplom med sin kod. Kan visas för vem som helst, och skrivas ut
// eller sparas som PDF (utskriften visar bara själva diplomet).
export default function DiplomaPage({ code }) {
  const state = useDiploma(code);
  const home = import.meta.env.BASE_URL;

  if (state.status !== 'found') {
    return (
      <main className="diploma-page">
        <p className="diploma-message">
          {state.status === 'loading'
            ? 'Hämtar diplomet…'
            : state.status === 'error'
              ? 'Diplomet kunde inte hämtas. Försök igen om en stund.'
              : `Det finns inget diplom med koden ${code}.`}
        </p>
        <p className="diploma-message">
          <a href={home}>← Till Kodskolan</a>
        </p>
      </main>
    );
  }

  const { diploma } = state;
  const { details } = diploma;
  const issued = new Date(diploma.issued_at);
  const isPath = diploma.kind === 'path';
  const stage = stages[Math.min(details.stage ?? 0, stages.length - 1)];

  return (
    <main className="diploma-page">
      <nav className="diploma-actions" aria-label="Diplomet">
        <a href={home}>← Kodskolan</a>
        <button type="button" onClick={() => window.print()}>
          🖨️ Skriv ut eller spara som PDF
        </button>
        <a
          href={linkedInUrl(diploma, details.title, issued)}
          target="_blank"
          rel="noreferrer"
        >
          💼 Lägg till på LinkedIn
        </a>
      </nav>
      <article className="diploma" aria-label={`Diplom för ${diploma.name}`}>
        <p className="diploma-school">⌨️ Kodskolan</p>
        <h1>Diplom</h1>
        <p className="diploma-lead">Detta intygar att</p>
        <p className="diploma-name">{diploma.name}</p>
        <p className="diploma-lead">
          har klarat {isPath ? 'spåret' : 'kursen'}
        </p>
        <p className="diploma-subject">
          <span aria-hidden="true">{details.icon}</span> {details.title}
        </p>
        <div className="diploma-figure">
          <Avatar stage={stage} size={90} />
          <span>{stage.title}</span>
        </div>
        {details.parts?.length > 0 && (
          <p className="diploma-parts">
            {isPath ? 'Kurser' : 'Banor'}: {details.parts.join(' · ')}
          </p>
        )}
        <footer className="diploma-footer">
          <span>{longDate(issued)}</span>
          <span>
            Kod <strong>{diploma.id}</strong> · kontrollera på{' '}
            {diplomaUrl(diploma.id).replace(/^https?:\/\//, '')}
          </span>
        </footer>
      </article>
    </main>
  );
}
