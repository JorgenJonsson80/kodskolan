// Projekten på en klar bana. Det projekt man arbetar med visar sina steg.
function ProjectPicker({
  projects,
  projectSteps,
  completedIds,
  activeLessonId,
  onSelectProject,
  onSelectLesson,
  onOpenIdeas,
}) {
  if (projects.length === 0) return null;
  const activeStep = projectSteps.find(step => step.id === activeLessonId);

  return (
    <div className="project-picker">
      <p className="project-picker-title">🛠️ Projekt: välj ett och bygg</p>
      <ul className="lesson-list">
        {projects.map(project => {
          const steps = projectSteps.filter(
            step => step.project === project.id,
          );
          const done = steps.filter(step =>
            completedIds.includes(step.id),
          ).length;
          const isActive = activeStep?.project === project.id;
          return (
            <li key={project.id}>
              <button
                type="button"
                onClick={() => onSelectProject(project.id)}
                aria-current={isActive ? 'true' : undefined}
                title={project.summary}
              >
                <span aria-hidden="true">
                  {done === steps.length ? project.reward.emoji : '○'}
                </span>{' '}
                {project.title}{' '}
                <span className="track-count">
                  {done}/{steps.length}
                </span>
              </button>
              {isActive && (
                <ol className="lesson-list project-steps">
                  {steps.map((step, index) => (
                    <li key={step.id}>
                      <button
                        type="button"
                        disabled={
                          index > 0 &&
                          !completedIds.includes(steps[index - 1].id)
                        }
                        onClick={() => onSelectLesson(step.id)}
                        aria-current={
                          step.id === activeLessonId ? 'true' : undefined
                        }
                      >
                        <span aria-hidden="true">
                          {completedIds.includes(step.id) ? '✓' : '○'}
                        </span>{' '}
                        Steg {step.stepNumber}: {step.title.split(': ').at(-1)}
                      </button>
                    </li>
                  ))}
                </ol>
              )}
            </li>
          );
        })}
      </ul>
      {onOpenIdeas && (
        <button type="button" className="test-out-button" onClick={onOpenIdeas}>
          🧪 Bygg helt själv på Lekplatsen
        </button>
      )}
    </div>
  );
}

export default function TrackList({
  tracks,
  lessons,
  completedIds,
  drafts,
  trackStatusById,
  passedTrackIds,
  isTrackUnlocked,
  activeTrackId,
  activeLessonId,
  onSelectTrack,
  onSelectLesson,
  projects,
  projectSteps,
  onSelectProject,
  areProjectsUnlocked,
  canBuildFreely,
  onOpenIdeas,
}) {
  return (
    <section className="card">
      <h2 className="card-title">Dina banor</h2>
      <ul className="track-list">
        {tracks.map(item => {
          const items = lessons.filter(lesson => lesson.track === item.id);
          const completed = items.filter(lesson =>
            completedIds.includes(lesson.id),
          ).length;
          const status = trackStatusById[item.id];
          const isUnlocked = isTrackUnlocked(item.id);
          const isActive = item.id === activeTrackId;
          const isPassed = passedTrackIds.includes(item.id);
          const needsBoss = isPassed && !status.isComplete;
          return (
            <li
              key={item.id}
              className={isActive ? 'track-card active' : 'track-card'}
            >
              <button
                className="track-button"
                type="button"
                disabled={!isUnlocked}
                onClick={() => onSelectTrack(item.id)}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className="track-icon" aria-hidden="true">
                  {status.isComplete
                    ? item.reward.emoji
                    : isPassed
                      ? '⚡'
                      : isUnlocked
                        ? '▶'
                        : '🔒'}
                </span>
                <span className="track-title">{item.title}</span>
                <span className="track-count">
                  {completed}/{items.length}
                  <span className="visually-hidden">
                    {' '}
                    klarade{isUnlocked ? '' : ', låst'}
                  </span>
                </span>
              </button>
              <progress
                value={completed}
                max={items.length}
                aria-label={item.title}
              />
              {needsBoss && status.bossesLeft.length > 0 && (
                <button
                  className="test-out-button"
                  type="button"
                  onClick={() => onSelectLesson(status.bossesLeft[0].id)}
                >
                  👑 Klara bossen och få {item.reward.emoji} {item.reward.name}
                </button>
              )}
              {areProjectsUnlocked(item.id) && (
                <ProjectPicker
                  projects={projects.filter(
                    project => project.track === item.id,
                  )}
                  projectSteps={projectSteps}
                  completedIds={completedIds}
                  activeLessonId={activeLessonId}
                  onSelectProject={onSelectProject}
                  onSelectLesson={onSelectLesson}
                  onOpenIdeas={
                    canBuildFreely(item.id) ? () => onOpenIdeas(item.id) : null
                  }
                />
              )}
              {isActive && (
                <ol className="lesson-list">
                  {items.map(lesson => {
                    const isDone = completedIds.includes(lesson.id);
                    const hasDraft =
                      !isDone &&
                      typeof drafts[lesson.id] === 'string' &&
                      drafts[lesson.id] !== lesson.starterCode;
                    return (
                      <li key={lesson.id}>
                        <button
                          type="button"
                          onClick={() => onSelectLesson(lesson.id)}
                          aria-current={
                            lesson.id === activeLessonId ? 'true' : undefined
                          }
                        >
                          <span aria-hidden="true">
                            {isDone ? '✓' : lesson.isBoss ? '👑' : '○'}
                          </span>{' '}
                          {lesson.title}
                          {isDone && (
                            <span className="visually-hidden"> (klar)</span>
                          )}
                          {hasDraft && <span className="draft"> · utkast</span>}
                        </button>
                      </li>
                    );
                  })}
                </ol>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
