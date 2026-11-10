import { useState } from 'react';
import RequestBar from '../flask/components/RequestBar';
import HeaderField from './components/HeaderField';

const START = { method: 'GET', path: '/', kind: 'json', body: '' };

// FastAPI-kursens verktyg runt editorn: 📮 Anropa (samma som i Flask, men
// bara JSON) och headers, som inloggningen i bana 7 behöver. lesson är
// null på Lekplatsen.
export function useWorkbench({ lesson, idea }) {
  const source = lesson ?? idea;
  const [request, setRequest] = useState({ ...START, ...source?.request });
  const files = source?.files;
  return {
    runOptions: { request, ...(files && { files }) },
    afterEditor: (
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
