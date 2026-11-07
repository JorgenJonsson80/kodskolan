import { useState } from 'react';
import RequestBar from '../flask/components/RequestBar';
import { previewTarget } from '../js/lib/previewTarget';
import OtherFile from './components/OtherFile';
import { TASSEN_API } from './data/files';
import { langOf } from './runner/language';

const START = { method: 'GET', path: '/api/hundar', kind: 'json', body: '' };

// Fullstack-kursens verktyg runt editorn. I app.py: 📮 Anropa och sidan
// (frontend) som visas mot elevens app. I App.tsx: API:t (backend) som
// sidans fetch går till. På Lekplatsen (lesson null) avgör koden språket,
// och en sida pratar med hela Tassens API.
export function useWorkbench({ code, lesson }) {
  const [request, setRequest] = useState({ ...START, ...lesson?.request });
  const lang = langOf(lesson, code);

  if (lang === 'py') {
    const frontend = lesson?.frontend;
    return {
      runOptions: { lang, request, frontend },
      editor: { fileName: 'app.py', context: 'py' },
      beforeEditor: frontend && (
        <OtherFile
          name="App.tsx"
          code={frontend}
          what="sidan som hämtar från din app"
        />
      ),
      afterEditor: <RequestBar request={request} onChange={setRequest} />,
    };
  }

  const backend = lesson?.backend ?? TASSEN_API;
  return {
    runOptions: lesson
      ? {
          lang,
          backend,
          typeTests: lesson.typeTests,
          sourceChecks: lesson.sourceChecks,
          lessonPreview: lesson.preview,
        }
      : { lang, backend, lessonPreview: previewTarget(code) },
    editor: { fileName: 'App.tsx', context: 'tsx' },
    beforeEditor: (
      <OtherFile
        name="app.py"
        code={backend}
        what="Flask-appen som sidan pratar med"
      />
    ),
  };
}
