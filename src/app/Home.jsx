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
import { useActivity } from '../core/lib/useActivity';
import DailyGoal from '../core/components/DailyGoal';
import { COURSE_INFO, courseInfoUrl } from './courseInfo';
import { COURSES } from './courses';
import HeroDemo from './HeroDemo';
import { BuildShowcase, Faq, ForWhom, HowItWorks, Stats } from './Landing';
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

// En ny besökare kommer till sidan om kursen först, den som redan börjat
// rakt in i kursen.
// Ett kompakt kort för kurserna man inte börjat på: ikon, namn och en rad.
function CourseRow({ course, toInfo }) {
  const href =
    course.href ??
    (toInfo && COURSE_INFO[course.id]
      ? courseInfoUrl(course.id)
      : `${import.meta.env.BASE_URL}${course.id}`);
  return (
    <li>
      <a className="course-row" href={href}>
        <span className="course-row-icon" aria-hidden="true">
          {course.icon}
        </span>
        <span>
          <strong>{course.name}</strong>
          <span className="muted">{course.tagline}</span>
        </span>
      </a>
    </li>
  );
}

function CourseCard({ course, done, toInfo }) {
  const href =
    course.href ??
    (toInfo && COURSE_INFO[course.id]
      ? courseInfoUrl(course.id)
      : `${import.meta.env.BASE_URL}${course.id}`);
  return (
    <li>
      <a className="course-card" href={href}>
        <span className="course-icon" aria-hidden="true">
          {course.icon}
        </span>
        <strong>{course.name}</strong>
        <span className="muted">{course.tagline}</span>
        <span className="course-progress">
          {done > 0
            ? `✓ ${done} ${done === 1 ? 'klar övning' : 'klara övningar'} · Fortsätt →`
            : toInfo
              ? 'Läs mer →'
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
  const activity = useActivity(account.user);
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

  const paths = (
    <section aria-labelledby="paths-title">
      <h2 id="paths-title">Spår</h2>
      <p className="muted">
        Kurser i en ordning som leder mot ett mål. Det enklaste sättet att
        välja.
      </p>
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
  );

  return (
    <>
      <header className="app-header">
        <h1 className="app-brand">
          <img
            className="brand-mark"
            src={`${import.meta.env.BASE_URL}logo-mark.png`}
            alt=""
            width="32"
            height="32"
          />
          Kodskolan
        </h1>
        {account.isReady && !account.user && account.isAvailable && (
          <a className="header-login" href={`${import.meta.env.BASE_URL}konto`}>
            Logga in
          </a>
        )}
      </header>
      <main className="home">
        {isNew && (
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-text">
              <p className="hero-kicker">Programmering på svenska, från noll</p>
              <h2 id="hero-title">
                Skriv din <span className="hero-accent">första kod</span> om en
                minut
              </h2>
              <p className="hero-lead">
                Du skriver riktig kod direkt i webbläsaren och ser på en gång om
                den fungerar. Felen förklaras på svenska, du får ledtrådar när
                du kör fast, och du bygger egna projekt längs vägen.
              </p>
              <div className="hero-buttons">
                <a
                  className="primary-button start-button"
                  href={`${import.meta.env.BASE_URL}${FIRST_COURSE}`}
                >
                  ▶ Skriv din första kod
                </a>
                <a className="hero-secondary" href="#kurser">
                  Se alla kurser
                </a>
              </div>
              <p className="muted hero-note">
                Gratis att börja · inget konto behövs · inget att installera
              </p>
            </div>
            <HeroDemo />
            <Stats courses={COURSES.length} />
          </section>
        )}
        {mine.length > 0 && (
          <section aria-labelledby="mine-title">
            <h2 id="mine-title" className="home-welcome">
              Välkommen tillbaka 👋
            </h2>
            <p className="muted">Fortsätt där du slutade.</p>
            <div className="home-goal">
              <DailyGoal {...activity} />
            </div>
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
        {account.isReady && !isNew && accountPanel}
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
        {isNew && <BuildShowcase />}
        {isNew && <HowItWorks />}
        {isNew && paths}
        {more.length > 0 && (
          <section id="kurser" aria-labelledby="more-title">
            <h2 id="more-title">
              {mine.length > 0 ? 'Fler kurser' : 'Alla kurser'}
            </h2>
            <ul className="course-rows">
              {more.map(({ course }) => (
                <CourseRow
                  key={`more-${course.id}`}
                  course={course}
                  toInfo={isNew}
                />
              ))}
            </ul>
          </section>
        )}
        {!isNew && paths}
        {isNew && <ForWhom />}
        {isNew && <Faq />}
      </main>
      <SiteFooter />
    </>
  );
}
