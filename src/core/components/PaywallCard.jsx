import { PRICE_TEXT } from '../lib/access';

// Visas i stället för övningen på en bana som kräver tillgång. Köpet och
// koden görs på Mitt konto, där man också loggar in.
export default function PaywallCard({ track, freeTracks, isSignedIn, onBack }) {
  const accountUrl = `${import.meta.env.BASE_URL}konto#tillgang`;
  return (
    <section className="card paywall-card" aria-labelledby="paywall-title">
      <h2 id="paywall-title">
        <span aria-hidden="true">🔒</span> {track.title} ingår i full tillgång
      </h2>
      <p>
        De {freeTracks} första banorna är gratis, och dina framsteg där finns
        kvar. Resten av kursen låses upp med full tillgång.
      </p>
      <p>
        <strong>Har du en kod?</strong>{' '}
        {isSignedIn
          ? 'Skriv in den på Mitt konto.'
          : 'Logga in och skriv in den på Mitt konto.'}
      </p>
      {PRICE_TEXT && (
        <p>
          <strong>Full tillgång kostar {PRICE_TEXT}</strong> – en gång, för alla
          kurser och för alltid.
        </p>
      )}
      <div className="paywall-actions">
        <a className="primary-button" href={accountUrl}>
          {PRICE_TEXT ? 'Köp eller lös in en kod' : 'Lös in en kod'}
        </a>
        <button type="button" onClick={onBack}>
          ← Tillbaka till gratisbanorna
        </button>
      </div>
    </section>
  );
}
