import { lazy } from 'react';
import Home from './Home';

// Diplomsidan och spåren laddas först när de visas, som kurserna.
const DiplomaPage = lazy(() => import('./DiplomaPage'));
const PathsPage = lazy(() => import('./PathsPage'));
const AccountPage = lazy(() => import('./AccountPage'));
const CoursePage = lazy(() => import('./CoursePage'));

// Sidorna som inte är en kurs: /diplom/<kod>, /spar, /konto, /kurser/<id>
// och startsidan.
export default function Page({ page, code }) {
  if (page === 'diplom' && code) return <DiplomaPage code={code} />;
  if (page === 'spar') return <PathsPage />;
  if (page === 'konto') return <AccountPage />;
  if (page === 'kurser' && code) return <CoursePage id={code} />;
  return <Home />;
}
