import { isStringList, readJson } from '../core/lib/storage';
import { COURSES } from './courses';

// Hur långt man kommit i en kurs, från webbläsaren. Klarade tester för en
// bana (…-testad) och projektbonusar räknas inte som övningar.
function doneCount(course) {
  const ids = readJson(
    `${course.storagePrefix}completed-ids`,
    [],
    isStringList,
  );
  return ids.filter(id => !/-(testad|utan-ledtradar)$/.test(id)).length;
}

// Startsidan: alla kurser. En kurs som inte flyttat in än öppnas på sin
// gamla sajt.
export default function Home() {
  return (
    <>
      <header className="app-header">
        <h1>Kodskolan</h1>
      </header>
      <main className="home">
        <section className="home-intro">
          <h2>Lär dig koda på svenska, från noll</h2>
          <p>
            Du skriver riktig kod direkt i webbläsaren och ser på en gång om den
            fungerar. Ledtrådar när du kör fast, förklaringar av felen på
            svenska och projekt att bygga själv. Du behöver inte installera
            något.
          </p>
        </section>
        <ul className="course-cards">
          {COURSES.map(course => {
            const done = doneCount(course);
            return (
              <li key={`course-${course.id}`}>
                <a
                  className="course-card"
                  href={
                    course.href ?? `${import.meta.env.BASE_URL}${course.id}`
                  }
                >
                  <span className="course-icon" aria-hidden="true">
                    {course.icon}
                  </span>
                  <strong>{course.name}</strong>
                  <span className="muted">{course.tagline}</span>
                  <span className="course-progress">
                    {done > 0
                      ? `✓ ${done} klara övningar · Fortsätt →`
                      : 'Börja →'}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
