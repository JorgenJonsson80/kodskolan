import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { courseFromPath } from './courses';
import Home from './Home';
import '../core/index.css';
import '../core/App.css';

// Adressen bestämmer vad som visas: /kodskolan/ är startsidan och
// /kodskolan/python en kurs. Länkarna laddar om sidan, så det behövs
// ingen router. Kursen och kärnan laddas först när en kurs öppnas, så
// att startsidan går snabbt.
const entry = courseFromPath(window.location.pathname);

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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {Course ? (
      <Suspense fallback={<p className="course-loading">Laddar kursen…</p>}>
        <Course />
      </Suspense>
    ) : (
      <Home />
    )}
  </StrictMode>,
);
