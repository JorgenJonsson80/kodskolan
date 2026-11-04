import { isProjectComplete, noHintsId } from '../projects';

// Hyllan med föremål. Varje bana ger ett föremål när den är klar, och
// varje projekt ett pris på en egen hylla.
// ⚡ visar att banan klarades med quiz och boss, inte alla övningar.
export default function Collection({
  tracks,
  completedTrackIds,
  testedOutTrackIds,
  projects,
  completedIds,
}) {
  const doneProjects = projects.filter(project =>
    isProjectComplete(project, completedIds),
  );
  // Projektens platser på hyllan visas när deras bana är klar.
  const shownProjects = projects.filter(
    project =>
      completedTrackIds.includes(project.track) ||
      doneProjects.includes(project),
  );
  const count = tracks.filter(track =>
    completedTrackIds.includes(track.id),
  ).length;

  return (
    <section className="card" aria-labelledby="collection-title">
      <h2 id="collection-title" className="card-title">
        Samling{' '}
        <span className="muted">
          {count} av {tracks.length}
        </span>
      </h2>
      <ul className="collection">
        {tracks.map(track => {
          const isEarned = completedTrackIds.includes(track.id);
          const testedOut = testedOutTrackIds.includes(track.id)
            ? ' (⚡ testade dig förbi)'
            : '';
          return (
            <li
              key={track.id}
              className={
                isEarned ? 'collection-item earned' : 'collection-item'
              }
              title={
                isEarned
                  ? `${track.reward.name} – från ${track.title}${testedOut}`
                  : `Klara ${track.title}`
              }
            >
              <span aria-hidden="true">
                {isEarned ? track.reward.emoji : '?'}
              </span>
              {testedOut && (
                <span className="collection-bolt" aria-hidden="true">
                  ⚡
                </span>
              )}
              <span className="visually-hidden">
                {isEarned
                  ? `${track.reward.name}, från ${track.title}${testedOut}`
                  : `Låst: klara ${track.title}`}
              </span>
            </li>
          );
        })}
      </ul>
      {shownProjects.length > 0 && (
        <>
          <h3 className="card-title collection-subtitle">
            Projektpriser{' '}
            <span className="muted">
              {doneProjects.length} av {shownProjects.length}
            </span>
          </h3>
          <ul className="collection">
            {shownProjects.map(project => {
              const isEarned = doneProjects.includes(project);
              const noHints = completedIds.includes(noHintsId(project))
                ? ' (🔥 utan ledtrådar)'
                : '';
              return (
                <li
                  key={project.id}
                  className={
                    isEarned ? 'collection-item earned' : 'collection-item'
                  }
                  title={
                    isEarned
                      ? `${project.reward.name} – från projektet ${project.title}${noHints}`
                      : `Bygg projektet ${project.title}`
                  }
                >
                  <span aria-hidden="true">
                    {isEarned ? project.reward.emoji : '?'}
                  </span>
                  {noHints && (
                    <span className="collection-bolt" aria-hidden="true">
                      🔥
                    </span>
                  )}
                  <span className="visually-hidden">
                    {isEarned
                      ? `${project.reward.name}, från projektet ${project.title}${noHints}`
                      : `Låst: bygg projektet ${project.title}`}
                  </span>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
}
