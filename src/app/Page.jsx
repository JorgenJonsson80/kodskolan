import { lazy } from 'react';
import Home from './Home';

// Diplomsidan och spåren laddas först när de visas, som kurserna.
const DiplomaPage = lazy(() => import('./DiplomaPage'));
const PathsPage = lazy(() => import('./PathsPage'));

// Sidorna som inte är en kurs: /diplom/<kod>, /spar och startsidan.
export default function Page({ page, code }) {
  if (page === 'diplom' && code) return <DiplomaPage code={code} />;
  if (page === 'spar') return <PathsPage />;
  return <Home />;
}
