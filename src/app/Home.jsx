import { useEffect, useState } from 'react';
import AccountPanel from '../core/components/AccountPanel';
import SiteFooter from '../core/components/SiteFooter';
import { mergeCompleted } from '../core/lib/progress';
import {
  belongsTo,
  isStringList,
  progressKeys,
  readJson,
  writeJson,
} from '../core/lib/storage';
import { fetchMyDiplomas } from '../core/lib/diplomas';
import { supabase } from '../core/lib/supabase';
import { useAccount } from '../core/lib/useAccount';
import { COURSES } from './courses';
import { PATHS } from './paths';
import { useCloudCompleted } from './useCloudCompleted';

// Första övningen för den som aldrig kodat: print i Python.
const FIRST_COURSE = 'python';

// Klara övningar i en kurs. Klarade tester för en bana (…-testad) och
// projektbonusar räknas inte som övningar, och inte heller använda facit.
const lessonCount = ids =>
  ids.filter(id => !/-(testad|utan-ledtradar|facit)$/.test(id)).length;

// Webbläsarens klara övningar, om de inte hör till ett annat konto.
const localIds = (course, userId) =>
  userId && !belongsTo(course.storagePrefix, userId)
    ? []
    : readJson(progressKeys(course.storagePrefix).completed, [], isStringList);

// Diplomen i kontot, eller [] utan inloggning.
function useMyDiplomas(userId) {
  const [saved, setSaved] = useState({ userId: null, diplomas: [] });
  useEffect(() => {
    if (!supabase || !userId) return;
    let ignore = false;
    fetchMyDiplomas().then(
      diplomas => !ignore && setSaved({ userId, diplomas }),
      () => !ignore && setSaved({ userId, diplomas: [] }),
    );
    return () => {
      ignore = true;
    };
  }, [userId]);
  return saved.userId === userId ? saved.diplomas : [];
}

function CourseCard({ course, done }) {
  return (
    <li>
      <a
        className="course-card"
        href={course.href ?? `${import.meta.env.BASE_URL}${course.id}`}
      >
        <span className="course-icon" aria-hidden="true">
          {course.icon}
        </span>
        <strong>{course.name}</strong>
        <span className="muted">{course.tagline}</span>
        <span className="course-progress">
          {done > 0
            ? `✓ ${done} ${done === 1 ? 'klar övning' : 'klara övningar'} · Fortsätt →`
            : 'Börja →'}
        </span>
      </a>
    </li>
  );
}

// Startsidan: inloggningen och alla kurser. De man börjat på (i den här
// webbläsaren eller i kontot) står först under Mina kurser.
export default function Home() {
  const account = useAccount();
  const cloud = useCloudCompleted(account.user?.id ?? null);
  const diplomas = useMyDiplomas(account.user?.id ?? null);
  // Ökar vid utloggning, så att räkningen läses om från webbläsaren
  // efter att den tömts.
  const [, setSignOuts] = useState(0);

  const courses = COURSES.map(course => ({
    course,
    done: lessonCount(
      mergeCompleted(
        localIds(course, account.user?.id),
        cloud?.byCourse[course.id],
      ),
    ),
  }));
  const mine = courses.filter(item => item.done > 0);
  const more = courses.filter(item => item.done === 0);

  // Som i en kurs: efter utloggning töms webbläsaren, så att nästa person
  // här inte får med sig dina framsteg. De finns kvar i kontot.
  async function handleSignOut() {
    await account.signOut();
    for (const course of COURSES) {
      const keys = progressKeys(course.storagePrefix);
      writeJson(keys.completed, []);
      writeJson(keys.drafts, {});
      writeJson(keys.projectModes, {});
      writeJson(keys.owner, null);
    }
    setSignOuts(count => count + 1);
  }

  // En ny besökare (inga framsteg, inte inloggad) får börja direkt.
  // Inloggningen kommer sist, och i kursen först efter första övningen.
  const isNew = mine.length === 0 && !account.user;

  const status = !account.user
    ? 'synced'
    : !cloud
      ? 'loading'
      : cloud.error
        ? 'error'
        : 'synced';

  const accountPanel = (
    <div className="home-account">
      <AccountPanel
        account={{ ...account, status }}
        onSignOut={handleSignOut}
      />
    </div>
  );

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
          {isNew && (
            <div className="home-start">
              <a
                className="primary-button start-button"
                href={`${import.meta.env.BASE_URL}${FIRST_COURSE}`}
              >
                ▶ Skriv din första kod
              </a>
              <p className="muted">
                Gratis och inget konto behövs. Den första övningen tar en minut.
              </p>
            </div>
          )}
        </section>
        {account.isReady && !isNew && accountPanel}
        {mine.length > 0 && (
          <section aria-labelledby="mine-title">
            <h2 id="mine-title">Mina kurser</h2>
            <ul className="course-cards">
              {mine.map(({ course, done }) => (
                <CourseCard
                  key={`mine-${course.id}`}
                  course={course}
                  done={done}
                />
              ))}
            </ul>
          </section>
        )}
        {diplomas.length > 0 && (
          <section aria-labelledby="diplomas-title">
            <h2 id="diplomas-title">Mina diplom</h2>
            <ul className="diploma-links">
              {diplomas.map(diploma => (
                <li key={`diploma-${diploma.id}`}>
                  <a href={`${import.meta.env.BASE_URL}diplom/${diploma.id}`}>
                    🎓 {diploma.details.icon} {diploma.details.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
        {more.length > 0 && (
          <section aria-labelledby="more-title">
            <h2 id="more-title">
              {mine.length > 0 ? 'Fler kurser' : 'Kurser'}
            </h2>
            <ul className="course-cards">
              {more.map(({ course }) => (
                <CourseCard
                  key={`more-${course.id}`}
                  course={course}
                  done={0}
                />
              ))}
            </ul>
          </section>
        )}
        <section aria-labelledby="paths-title">
          <h2 id="paths-title">Spår</h2>
          <p className="muted">Kurser i en ordning som leder mot ett mål.</p>
          <ul className="course-cards">
            {PATHS.map(path => (
              <li key={`path-${path.id}`}>
                <a
                  className="course-card"
                  href={`${import.meta.env.BASE_URL}spar#${path.id}`}
                >
                  <span className="course-icon" aria-hidden="true">
                    {path.icon}
                  </span>
                  <strong>{path.title}</strong>
                  <span className="muted">{path.summary}</span>
                  <span className="course-progress">Se spåret →</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
        {account.isReady && isNew && (
          <section aria-labelledby="account-title">
            <h2 id="account-title">Har du redan ett konto?</h2>
            {accountPanel}
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
