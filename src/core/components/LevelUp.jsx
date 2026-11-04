import { useEffect, useRef } from 'react';
import Avatar from './Avatar';

// Firar när en eller flera banor blir klara: figuren har vuxit och
// samlingen fått nya föremål. Firar också när ett projekt blir klart.
export default function LevelUp({ celebration, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const {
    tracks,
    projects = [],
    unlockedProjects = [],
    stage,
    hasGrown,
  } = celebration;

  return (
    <dialog
      ref={dialogRef}
      className="level-up"
      onClose={onClose}
      aria-labelledby="level-up-title"
    >
      <p className="level-up-confetti" aria-hidden="true">
        🎉
      </p>
      <h2 id="level-up-title">
        {tracks.length === 0
          ? `Projektet ${projects[0].title} är klart!`
          : tracks.length === 1
            ? `Banan ${tracks[0].title} är klar!`
            : `${tracks.length} banor är klara!`}
      </h2>
      <div className="level-up-avatar">
        <Avatar stage={stage} size={140} />
      </div>
      {hasGrown && (
        <p>
          Du har vuxit! Nu är du <strong>{stage.title}</strong>.
        </p>
      )}
      {tracks.map(track => (
        <p key={track.id} className="level-up-reward">
          <span aria-hidden="true">{track.reward.emoji}</span> Ny pryl i
          samlingen: <strong>{track.reward.name}</strong>
        </p>
      ))}
      {tracks.length > 0 && (
        <p className="level-up-can">
          💪 Bra jobbat! Nu kan du t.ex. bygga {tracks.at(-1).canBuild}.
        </p>
      )}
      {projects.map(project => (
        <p key={project.id} className="level-up-reward">
          <span aria-hidden="true">{project.reward.emoji}</span> Nytt
          projektpris i samlingen: <strong>{project.reward.name}</strong>
          {project.bonusXp > 0 && (
            <>
              <br />
              🔥 Utan ledtrådar: <strong>+{project.bonusXp} bonus-XP</strong>
            </>
          )}
        </p>
      ))}
      {unlockedProjects.length > 0 && (
        <p>
          🛠️ Nu kan du bygga ett projekt:{' '}
          {unlockedProjects.map(project => project.title).join(', ')}. Du hittar
          dem under banan.
        </p>
      )}
      <form method="dialog">
        <button className="primary-button" type="submit" autoFocus>
          Fortsätt
        </button>
      </form>
    </dialog>
  );
}
