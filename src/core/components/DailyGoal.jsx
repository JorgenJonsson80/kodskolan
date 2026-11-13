// Dagens mål och streaken, under figuren i kursen och på startsidan.
export default function DailyGoal({ today, goal, streak }) {
  const done = today >= goal;
  return (
    <section className="card daily-goal" aria-label="Dagens mål">
      <p className="daily-streak">
        <span aria-hidden="true">{streak > 0 ? '🔥' : '🌱'}</span>{' '}
        {streak > 0 ? (
          <>
            <strong>
              {streak} {streak === 1 ? 'dag' : 'dagar'}
            </strong>{' '}
            i rad
          </>
        ) : (
          'Börja en ny streak i dag'
        )}
      </p>
      <progress
        value={Math.min(today, goal)}
        max={goal}
        aria-label="Dagens mål"
      />
      <p className="muted daily-text">
        {done
          ? `✓ Dagens mål klart – ${today} övningar i dag!`
          : `Dagens mål: ${today} av ${goal} övningar`}
      </p>
    </section>
  );
}
