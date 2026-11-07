import { useEffect, useState } from 'react';
import AccountPanel from '../core/components/AccountPanel';
import SiteFooter from '../core/components/SiteFooter';
import DiplomaDialog from '../core/components/DiplomaDialog';
import { courseCompletion } from '../core/lib/completion';
import { mergeCompleted } from '../core/lib/progress';
import { isStringList, progressKeys, readJson } from '../core/lib/storage';
import { useAccount } from '../core/lib/useAccount';
import { stages } from '../core/stages';
import { COURSES } from './courses';
import { PATHS } from './paths';
import { useCloudCompleted } from './useCloudCompleted';

const courseById = id => COURSES.find(course => course.id === id);

// Banorna och övningarna i alla kurser, utan resten av kurserna.
function useSummaries() {
  const [summaries, setSummaries] = useState(null);
  useEffect(() => {
    let ignore = false;
    Promise.all(COURSES.map(course => course.summary())).then(loaded => {
      if (!ignore) {
        setSummaries(
          Object.fromEntries(
            COURSES.map((course, index) => [course.id, loaded[index]]),
          ),
        );
      }
    });
    return () => {
      ignore = true;
    };
  }, []);
  return summaries;
}

function PathCard({ path, completions, onDiploma }) {
  const courses = path.courses.map(id => ({
    course: courseById(id),
    completion: completions?.[id],
  }));
  const done = courses.filter(item => item.completion?.isComplete).length;
  const next = courses.find(item => !item.completion?.isComplete);
  const isComplete = completions && done === courses.length;
  return (
    <li className="path-card" id={path.id}>
      <h2>
        <span aria-hidden="true">{path.icon}</span> {path.title}
      </h2>
      <p className="muted">{path.summary}</p>
      <ol className="path-courses">
        {courses.map(({ course, completion }) => (
          <li key={`${path.id}-${course.id}`}>
            <a href={`${import.meta.env.BASE_URL}${course.id}`}>
              <span aria-hidden="true">{course.icon}</span> {course.name}
            </a>
            <span className="muted">
              {!completion
                ? '…'
                : completion.isComplete
                  ? '✓ Klar'
                  : `${completion.done} av ${completion.total} banor`}
            </span>
          </li>
        ))}
      </ol>
      {isComplete ? (
        <button
          className="primary-button"
          type="button"
          onClick={() => onDiploma(path, courses)}
        >
          🎓 Hämta spårdiplomet
        </button>
      ) : (
        next &&
        completions && (
          <p className="path-next">
            Nästa:{' '}
            <a href={`${import.meta.env.BASE_URL}${next.course.id}`}>
              {next.course.icon} {next.course.name} →
            </a>
          </p>
        )
      )}
    </li>
  );
}

// Spåren: kurser i en ordning mot ett mål, hur långt man kommit i varje,
// och spårdiplomet när allt är klart.
export default function PathsPage() {
  const account = useAccount();
  const cloud = useCloudCompleted(account.user?.id ?? null);
  const summaries = useSummaries();
  const [diploma, setDiploma] = useState(null);

  const completions =
    summaries &&
    Object.fromEntries(
      COURSES.map(course => {
        const local = readJson(
          progressKeys(course.storagePrefix).completed,
          [],
          isStringList,
        );
        const ids = mergeCompleted(local, cloud?.byCourse[course.id]);
        const { tracks, lessons } = summaries[course.id];
        return [course.id, courseCompletion(tracks, lessons, ids)];
      }),
    );

  function openDiploma(path, courses) {
    setDiploma({
      subject: path.id,
      title: `spåret ${path.title}`,
      details: {
        title: path.title,
        icon: path.icon,
        parts: courses.map(item => item.course.name),
        stage: stages.length - 1,
      },
    });
  }

  return (
    <>
      <header className="app-header">
        <h1>
          <a className="home-link" href={import.meta.env.BASE_URL}>
            Kodskolan
          </a>{' '}
          › Spår
        </h1>
      </header>
      <main className="home">
        <section className="home-intro">
          <h2>Välj ett mål, inte bara en kurs</h2>
          <p>
            Ett spår är kurser i en ordning som leder mot något du vill kunna.
            Klara alla kurser i spåret så får du ett spårdiplom.
          </p>
        </section>
        {account.isReady && (
          <div className="home-account">
            <AccountPanel
              account={{ ...account, status: 'synced' }}
              onSignOut={account.signOut}
            />
          </div>
        )}
        <ul className="path-cards">
          {PATHS.map(path => (
            <PathCard
              key={`path-${path.id}`}
              path={path}
              completions={completions}
              onDiploma={openDiploma}
            />
          ))}
        </ul>
      </main>
      <SiteFooter />
      {diploma && (
        <DiplomaDialog
          kind="path"
          subject={diploma.subject}
          title={diploma.title}
          details={diploma.details}
          account={account}
          onClose={() => setDiploma(null)}
        />
      )}
    </>
  );
}
