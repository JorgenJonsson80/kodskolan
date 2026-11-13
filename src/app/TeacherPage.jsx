import { useCallback, useEffect, useState } from 'react';
import AccountPanel from '../core/components/AccountPanel';
import SiteFooter from '../core/components/SiteFooter';
import { useAccount } from '../core/lib/useAccount';
import {
  classReport,
  createClass,
  deleteClass,
  fetchClassData,
  fetchTeacherClasses,
  joinUrl,
  removeStudent,
} from './classes';
import { COURSES } from './courses';

const shortDate = day =>
  new Date(`${day}T12:00`).toLocaleDateString('sv-SE', {
    day: 'numeric',
    month: 'short',
  });

// Kursernas övningar, för att räkna ut hur långt eleverna kommit. Bara de
// kurser som någon i klassen börjat på laddas.
async function loadSummaries(courseIds) {
  const entries = await Promise.all(
    COURSES.filter(
      course => course.summary && courseIds.includes(course.id),
    ).map(async course => [course.id, await course.summary()]),
  );
  return Object.fromEntries(entries);
}

function ClassView({ item, onDeleted }) {
  const [state, setState] = useState({ status: 'loading' });
  const [copied, setCopied] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Ökas för att hämta klassen igen, t.ex. när en elev tagits bort.
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let ignore = false;
    fetchClassData(item.id)
      .then(async data => {
        const summaries = await loadSummaries(
          data.progress.map(row => row.course_id),
        );
        return classReport(data, summaries);
      })
      .then(
        report => !ignore && setState({ status: 'ready', report }),
        () => !ignore && setState({ status: 'error' }),
      );
    return () => {
      ignore = true;
    };
  }, [item.id, version]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(joinUrl(item.join_code));
      setCopied(true);
    } catch {
      // Utan urklipp står länken ändå synlig att kopiera för hand.
    }
  }

  async function handleRemove(student) {
    if (!window.confirm(`Ta bort ${student.name} ur klassen?`)) return;
    await removeStudent(item.id, student.id).catch(() => {});
    setVersion(count => count + 1);
  }

  const courseName = id => COURSES.find(course => course.id === id);
  const report = state.report;

  return (
    <section className="card class-view" aria-label={`Klassen ${item.name}`}>
      <h3>{item.name}</h3>
      <p>
        Eleverna går med på{' '}
        <a href={joinUrl(item.join_code)}>
          {joinUrl(item.join_code).replace(/^https?:\/\//, '')}
        </a>{' '}
        (koden <strong>{item.join_code}</strong>).{' '}
        <button type="button" onClick={handleCopy}>
          {copied ? '✓ Kopierad' : '📋 Kopiera länken'}
        </button>
      </p>
      {state.status === 'loading' && <p className="muted">Hämtar klassen…</p>}
      {state.status === 'error' && (
        <p className="feedback-error">
          Klassen kunde inte hämtas. Försök igen om en stund.
        </p>
      )}
      {report && report.students.length === 0 && (
        <p className="muted">Ingen har gått med än. Dela länken ovan.</p>
      )}
      {report && report.students.length > 0 && (
        <div className="class-table-wrap">
          <table className="class-table">
            <thead>
              <tr>
                <th scope="col">Elev</th>
                {report.courseIds.map(id => (
                  <th scope="col" key={`kurs-${id}`}>
                    {courseName(id)?.icon} {courseName(id)?.name ?? id}
                  </th>
                ))}
                <th scope="col">Senaste 7 dagarna</th>
                <th scope="col">Senast aktiv</th>
                <th scope="col">
                  <span className="sr-only">Ta bort</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {report.students.map(student => (
                <tr key={`elev-${student.id}`}>
                  <th scope="row">{student.name}</th>
                  {report.courseIds.map(id => {
                    const { done, total } = student.courses[id];
                    return (
                      <td key={`kurs-${id}`}>
                        <span className="class-cell">
                          {done} av {total}
                        </span>
                        <progress value={done} max={total} />
                      </td>
                    );
                  })}
                  <td>{student.week} övningar</td>
                  <td>{student.lastDay ? shortDate(student.lastDay) : '–'}</td>
                  <td>
                    <button
                      type="button"
                      className="link-button"
                      onClick={() => handleRemove(student)}
                    >
                      Ta bort
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="muted">
        Du ser vilka övningar eleverna klarat och hur många de klarat per dag –
        inte deras kod.
      </p>
      {confirmDelete ? (
        <p>
          Hela klassen tas bort, men elevernas framsteg finns kvar hos dem.{' '}
          <button
            type="button"
            className="danger-button"
            onClick={() => deleteClass(item.id).then(onDeleted, () => {})}
          >
            Ja, ta bort klassen
          </button>{' '}
          <button type="button" onClick={() => setConfirmDelete(false)}>
            Avbryt
          </button>
        </p>
      ) : (
        <button
          type="button"
          className="link-button"
          onClick={() => setConfirmDelete(true)}
        >
          Ta bort klassen
        </button>
      )}
    </section>
  );
}

function Classes({ account }) {
  const [classes, setClasses] = useState(null);
  const [error, setError] = useState(false);
  const [name, setName] = useState('');
  const userId = account.user.id;

  const load = useCallback(
    () => fetchTeacherClasses(userId).then(setClasses, () => setError(true)),
    [userId],
  );

  useEffect(() => {
    load();
  }, [load]);

  async function handleCreate(event) {
    event.preventDefault();
    if (!name.trim()) return;
    try {
      const created = await createClass(name);
      setClasses(list => [...(list ?? []), created]);
      setName('');
    } catch {
      setError(true);
    }
  }

  return (
    <>
      <section>
        <h2>Skapa en klass</h2>
        <form className="profile-form" onSubmit={handleCreate}>
          <label>
            Klassens namn
            <input
              value={name}
              maxLength={60}
              placeholder="Till exempel 8B Programmering"
              onChange={event => setName(event.target.value)}
            />
          </label>
          <div className="profile-buttons">
            <button className="primary-button" type="submit">
              Skapa klassen
            </button>
          </div>
        </form>
        {error && (
          <p className="feedback-error">
            Något gick fel. Försök igen om en stund.
          </p>
        )}
      </section>
      {classes?.length > 0 && (
        <section>
          <h2>Dina klasser</h2>
          {classes.map(item => (
            <ClassView key={`klass-${item.id}`} item={item} onDeleted={load} />
          ))}
        </section>
      )}
    </>
  );
}

// /larare: skapa klasser, dela en länk och följ elevernas framsteg.
export default function TeacherPage() {
  const account = useAccount();

  return (
    <>
      <header className="app-header">
        <h1>
          <a className="home-link" href={import.meta.env.BASE_URL}>
            Kodskolan
          </a>{' '}
          › För lärare
        </h1>
      </header>
      <main className="home account-page teacher-page">
        <section className="home-intro">
          <h2>Kodskolan i klassrummet</h2>
          <p>
            Skapa en klass och dela länken med eleverna. När de gått med ser du
            hur långt varje elev kommit i kurserna och hur aktiva de varit den
            senaste veckan.
          </p>
        </section>
        {!account.isAvailable ? (
          <p className="muted">
            Klasser kräver konton, och de är avstängda här.
          </p>
        ) : !account.isReady ? null : account.user ? (
          <Classes account={account} />
        ) : (
          <>
            <p>Logga in för att skapa en klass.</p>
            <div className="home-account">
              <AccountPanel account={{ ...account, status: 'synced' }} />
            </div>
          </>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
