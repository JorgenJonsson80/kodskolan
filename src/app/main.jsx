import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from '../core/components/ErrorBoundary';
import { startAnalytics } from '../core/lib/analytics';
import { COURSE_INFO } from './courseInfo';
import { COURSES, courseFromPath, pathParts } from './courses';
import Page from './Page';
import '../core/index.css';
import '../core/App.css';

// Adressen bestämmer vad som visas: /kodskolan/ är startsidan och
// /kodskolan/python en kurs. Länkarna laddar om sidan, så det behövs
// ingen router. Kursen och kärnan laddas först när en kurs öppnas, så
// att startsidan går snabbt.
const entry = courseFromPath(window.location.pathname);
const [page, code] = pathParts(window.location.pathname);

const TITLES = {
  diplom: 'Diplom – Kodskolan',
  spar: 'Spår – Kodskolan',
  konto: 'Mitt konto och data – Kodskolan',
  integritet: 'Integritetspolicy – Kodskolan',
  villkor: 'Villkor – Kodskolan',
};
if (!entry && TITLES[page]) document.title = TITLES[page];
const infoCourse =
  page === 'kurser' && COURSE_INFO[code]
    ? COURSES.find(course => course.id === code)
    : null;
if (infoCourse) document.title = `${COURSE_INFO[code].title} – Kodskolan`;

const Course =
  entry &&
  lazy(() =>
    Promise.all([entry.load(), import('../core/CourseApp')]).then(
      ([{ default: course }, { default: CourseApp }]) => ({
        default: () => <CourseApp course={course} />,
      }),
    ),
  );

if (entry) document.title = `${entry.name} – Kodskolan`;

startAnalytics();

const root = createRoot(document.getElementById('root'));

// Sidan om en kurs finns redan som färdig HTML (scripts/prerender.mjs).
// Den får stå kvar tills banorna och sidans kod hämtats och ritas sedan
// direkt, utan Suspense, så att den inte blinkar till "Laddar…".
if (infoCourse) {
  Promise.all([infoCourse.summary(), import('./CoursePage')]).then(
    ([summary, { CourseInfo }]) =>
      root.render(
        <StrictMode>
          <CourseInfo course={infoCourse} summary={summary} />
        </StrictMode>,
      ),
    // Utan nät står den färdiga sidan kvar. Länkarna i den fungerar ändå.
    () => {},
  );
} else {
  root.render(
    <StrictMode>
      <ErrorBoundary>
        {Course ? (
          <Suspense fallback={<p className="course-loading">Laddar kursen…</p>}>
            <Course />
          </Suspense>
        ) : (
          <Suspense fallback={<p className="course-loading">Laddar…</p>}>
            <Page page={page} code={code} />
          </Suspense>
        )}
      </ErrorBoundary>
    </StrictMode>,
  );
}
