import Avatar from './Avatar';

// Visar figuren, XP och vad som krävs för att växa till nästa ålder.
export default function HeroCard({
  growth,
  totalXp,
  completedCount,
  lessonCount,
}) {
  const { stage, nextStage, currentTrack } = growth;

  return (
    <section className="card hero-card" aria-labelledby="hero-title">
      <div className="hero-avatar">
        <Avatar stage={stage} size={110} />
      </div>
      <h2 id="hero-title">{stage.title}</h2>
      <p className="hero-stats">
        <span className="chip chip-xp">⭐ {totalXp} XP</span>
        <span className="chip">
          {completedCount} av {lessonCount} övningar
        </span>
      </p>
      {currentTrack ? (
        <div className="growth">
          <p>
            Klara <strong>{currentTrack.track.title}</strong>
            {nextStage ? (
              <>
                {' '}
                för att växa till <strong>{nextStage.title}</strong>
              </>
            ) : (
              ' för att få en ny pryl'
            )}
          </p>
          <progress
            value={currentTrack.done}
            max={currentTrack.total}
            aria-label={`${currentTrack.track.title}: ${currentTrack.done} av ${currentTrack.total} övningar`}
          />
        </div>
      ) : (
        <p className="feedback-success">Du har klarat alla banor! 🎉</p>
      )}
    </section>
  );
}
