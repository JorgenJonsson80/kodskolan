import { useState } from 'react';
import RequestBar from './components/RequestBar';

const START = { method: 'GET', path: '/', kind: 'json', body: '' };

// Flask-kursens verktyg runt editorn: 📮 Anropa, och mallarna och
// datafilerna som övningen har (files). lesson är null på Lekplatsen.
export function useWorkbench({ lesson, idea }) {
  const source = lesson ?? idea;
  const [request, setRequest] = useState({ ...START, ...source?.request });
  const files = source?.files;
  return {
    runOptions: { request, ...(files && { files }) },
    afterEditor: <RequestBar request={request} onChange={setRequest} />,
    beforeEditor: files && Object.keys(files).length > 0 && (
      <details className="flask-files">
        <summary>
          📁 Filerna appen har ({Object.keys(files).join(', ')})
        </summary>
        {Object.entries(files).map(([name, text]) => (
          <div key={`file-${name}`}>
            <p>
              <code>{name}</code>
            </p>
            <pre>{text}</pre>
          </div>
        ))}
      </details>
    ),
  };
}
