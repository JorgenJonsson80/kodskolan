import { useEffect, useState } from 'react';
import SiteFooter from '../core/components/SiteFooter';
import { COURSE_INFO, courseInfoUrl, findCourse } from './courseInfo';
import { COURSES } from './courses';
import { PATHS } from './paths';

const BASE = import.meta.env.BASE_URL;

// Sidan om en kurs: vad den är, för vem, banorna och en knapp in. summary
// är kursens banor och övningar. Vid bygget skickas den med, så att sidan
// kan skrivas ut som färdig HTML (scripts/prerender.mjs).
export function CourseInfo({ course, summary }) {
  const info = COURSE_INFO[course.id];
  const paths = PATHS.filter(path => path.courses.includes(course.id));
  const others = COURSES.filter(item => item.id !== course.id);
  const start = (
    <a className="primary-button start-button" href={`${BASE}${course.id}`}>
      ▶ Börja kursen
    </a>
  );

  return (
    <>
      <header className="app-header">
        <a className="home-link app-brand" href={BASE}>
          <img
            className="brand-mark"
            src={`${BASE}logo-mark.png`}
            alt=""
            width="32"
            height="32"
          />
          Kodskolan
        </a>
      </header>
      <main className="home course-info">
        <section className="home-intro">
          <p className="course-info-icon" aria-hidden="true">
            {course.icon}
          </p>
          <h1>{info.title}</h1>
          <p>{info.intro}</p>
          <ul className="course-facts">
            <li>📚 {summary.lessons.length} övningar</li>
            <li>🛤️ {summary.tracks.length} banor</li>
            <li>💻 I webbläsaren</li>
            <li>🆓 Gratis att börja</li>
          </ul>
          <div className="home-start">
            {start}
            <p className="muted">Inget konto behövs för att börja.</p>
          </div>
        </section>

        <section aria-labelledby="example-title">
          <h2 id="example-title">Så här kan det se ut</h2>
          <pre className="course-example">
            <code>{info.example}</code>
          </pre>
        </section>

        <section aria-labelledby="tracks-title">
          <h2 id="tracks-title">Det här lär du dig</h2>
          <ol className="course-tracks">
            {summary.tracks.map(track => (
              <li key={`track-${track.id}`}>
                <strong>{track.title}</strong>
                {track.canBuild && (
                  <span className="muted">
                    {' '}
                    Sedan kan du bygga {track.canBuild}.
                  </span>
                )}
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="who-title">
          <h2 id="who-title">För vem?</h2>
          <p>{info.forWhom}</p>
          <p>
            <strong>Du behöver kunna:</strong> {info.before}
          </p>
          {paths.length > 0 && (
            <p>
              <strong>Ingår i spåren:</strong>{' '}
              {paths.map((path, index) => (
                <span key={`path-${path.id}`}>
                  {index > 0 && ', '}
                  <a href={`${BASE}spar#${path.id}`}>
                    {path.icon} {path.title}
                  </a>
                </span>
              ))}
            </p>
          )}
          <div className="home-start">{start}</div>
        </section>

        <section aria-labelledby="others-title">
          <h2 id="others-title">Andra kurser</h2>
          <ul className="course-links">
            {others.map(item => (
              <li key={`other-${item.id}`}>
                <a href={courseInfoUrl(item.id)}>
                  {item.icon} {item.name}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

// /kurser/<id> för en kurs utan färdig HTML (under utveckling): hämtar
// kursens banor och visar sidan. Annars ritar main.jsx CourseInfo direkt.
export default function CoursePage({ id }) {
  const course = findCourse(id);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (!course) return;
    let ignore = false;
    course.summary().then(loaded => !ignore && setSummary(loaded));
    return () => {
      ignore = true;
    };
  }, [course]);

  if (!course) {
    window.location.replace(BASE);
    return null;
  }
  if (!summary) return <p className="course-loading">Laddar…</p>;
  return <CourseInfo course={course} summary={summary} />;
}
