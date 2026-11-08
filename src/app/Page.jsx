import { lazy } from 'react';
import Home from './Home';
import { LEGAL } from './legal';
import LegalPage from './LegalPage';

// Diplomsidan och spåren laddas först när de visas, som kurserna.
const DiplomaPage = lazy(() => import('./DiplomaPage'));
const PathsPage = lazy(() => import('./PathsPage'));
const AccountPage = lazy(() => import('./AccountPage'));
const CoursePage = lazy(() => import('./CoursePage'));

// Sidorna som inte är en kurs: /diplom/<kod>, /spar, /konto, /kurser/<id>,
// /integritet, /villkor och startsidan. LegalPage laddas direkt, så att
// den färdiga HTML:en inte blinkar till "Laddar…".
export default function Page({ page, code }) {
  if (page === 'diplom' && code) return <DiplomaPage code={code} />;
  if (page === 'spar') return <PathsPage />;
  if (page === 'konto') return <AccountPage />;
  if (LEGAL[page]) return <LegalPage kind={page} />;
  if (page === 'kurser' && code) return <CoursePage id={code} />;
  return <Home />;
}
