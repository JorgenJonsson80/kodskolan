import { useState } from 'react';
import HeaderField from '../fastapi/components/HeaderField';
import RequestBar from '../flask/components/RequestBar';

const START = { method: 'GET', path: '/', kind: 'json', body: '' };

// AI-kursens verktyg runt editorn. Låtsasmodellens regler (modell) följer
// med varje körning. 📮 Anropa visas bara i övningar med ett API
// (request), alltså i slutprojektet. lesson är null på Lekplatsen.
export function useWorkbench({ lesson, idea }) {
  const source = lesson ?? idea;
  const [request, setRequest] = useState({ ...START, ...source?.request });
  const hasApi = Boolean(source?.request);
  return {
    runOptions: {
      modell: source?.modell ?? [],
      ...(source?.files && { files: source.files }),
      ...(hasApi && { request }),
    },
    afterEditor: hasApi && (
      <>
        <RequestBar request={request} onChange={setRequest} forms={false} />
        <HeaderField
          headers={request.headers}
          onChange={headers => setRequest({ ...request, headers })}
        />
      </>
    ),
  };
}
