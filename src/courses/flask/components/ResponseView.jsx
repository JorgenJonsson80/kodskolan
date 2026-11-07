import { explainError } from '../../python/runner/friendlyErrors';

const STATUS_TEXT = {
  200: 'OK',
  201: 'Skapad',
  204: 'Inget innehåll',
  302: 'Skickas vidare',
  400: 'Fel i anropet',
  401: 'Inte inloggad',
  403: 'Förbjudet',
  404: 'Finns inte',
  405: 'Fel metod',
  500: 'Serverfel',
};

const statusClass = status => `status-${String(status)[0]}xx`;

function Body({ response }) {
  if (!response.text) return <p className="muted">Svaret är tomt.</p>;
  if (response.type === 'application/json') {
    let pretty = response.text;
    try {
      pretty = JSON.stringify(JSON.parse(response.text), null, 2);
    } catch {
      // Visa texten som den är.
    }
    return <pre className="response-json">{pretty}</pre>;
  }
  if (response.type === 'text/html' && /<[a-z]/i.test(response.text)) {
    return (
      <iframe
        className="response-html"
        title="Sidan appen svarade med"
        sandbox=""
        srcDoc={response.text}
      />
    );
  }
  return <pre className="response-text">{response.text}</pre>;
}

// Svaret på 📮 Anropa: statuskoden, innehållet (JSON, HTML eller text)
// och vägarna appen har.
export default function ResponseView({ result }) {
  const response = result.response;
  if (!response) return null;
  return (
    <section className="response-view" aria-label="Svaret från appen">
      <h3>📮 Svaret</h3>
      {response.error ? (
        <p className="response-error">
          Anropet stoppade med ett fel: {explainError(response.error)}
        </p>
      ) : response.bodyError ? (
        <p className="response-error">{response.bodyError}</p>
      ) : (
        <>
          <p className="response-status">
            <code>
              {response.method} {response.path}
            </code>{' '}
            →{' '}
            <span className={`status ${statusClass(response.status)}`}>
              {response.status} {STATUS_TEXT[response.status] ?? ''}
            </span>
            {response.location && (
              <span className="muted"> till {response.location}</span>
            )}
          </p>
          <Body response={response} />
        </>
      )}
      {response.routes?.length > 0 && (
        <p className="response-routes muted">
          Vägar i appen:{' '}
          {response.routes.map(([methods, path], index) => (
            <span key={`route-${path}`}>
              {index > 0 && ' · '}
              <code>
                {methods} {path}
              </code>
            </span>
          ))}
        </p>
      )}
    </section>
  );
}
