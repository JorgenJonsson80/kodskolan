const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
const hasBody = method => ['POST', 'PUT', 'PATCH'].includes(method);

// 📮 Anropa: vilket anrop appen får när koden körs. Svaret visas under
// feedbacken (ResponseView), ungefär som i Postman.
export default function RequestBar({ request, onChange }) {
  const set = change => onChange({ ...request, ...change });
  return (
    <fieldset className="request-bar">
      <legend>📮 Anropa när koden körs</legend>
      <div className="request-line">
        <select
          aria-label="Metod"
          value={request.method}
          onChange={event => set({ method: event.target.value })}
        >
          {METHODS.map(method => (
            <option key={`method-${method}`} value={method}>
              {method}
            </option>
          ))}
        </select>
        <input
          aria-label="Adress"
          value={request.path}
          spellCheck="false"
          onChange={event => set({ path: event.target.value })}
        />
      </div>
      {hasBody(request.method) && (
        <div className="request-body">
          <div
            className="request-kind"
            role="radiogroup"
            aria-label="Skicka som"
          >
            {[
              ['json', 'JSON'],
              ['form', 'Formulär (namn=Ada&ålder=7)'],
            ].map(([kind, label]) => (
              <label key={`kind-${kind}`}>
                <input
                  type="radio"
                  name="request-kind"
                  checked={(request.kind ?? 'json') === kind}
                  onChange={() => set({ kind })}
                />{' '}
                {label}
              </label>
            ))}
          </div>
          <textarea
            aria-label="Det som skickas"
            rows={3}
            spellCheck="false"
            value={request.body ?? ''}
            placeholder={
              (request.kind ?? 'json') === 'json'
                ? '{"namn": "Saga"}'
                : 'namn=Saga'
            }
            onChange={event => set({ body: event.target.value })}
          />
        </div>
      )}
    </fieldset>
  );
}
