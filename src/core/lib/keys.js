// 🔑 Nycklar till facit. Facit ska finnas när man kört fast, men inte gå
// att ta på varje övning. Nycklarna tjänas genom att klara övningar på
// egen hand, och räknas fram ur de klara id:na. Så följer de med kontot
// utan någon egen tabell.
export const START_KEYS = 3;
export const SOLVED_PER_KEY = 3;

// Sparas bland de klara id:na, som …-testad.
export const facitId = id => `${id}-facit`;
export const isFacitId = id => id.endsWith('-facit');

export function keyStatus(completedIds, exercises) {
  const done = new Set(completedIds);
  let solvedAlone = 0;
  let used = 0;
  for (const item of exercises) {
    if (done.has(facitId(item.id))) used += 1;
    else if (done.has(item.id)) solvedAlone += 1;
  }
  return {
    keys: Math.max(
      0,
      START_KEYS + Math.floor(solvedAlone / SOLVED_PER_KEY) - used,
    ),
    // Hur många övningar till på egen hand innan nästa nyckel.
    untilNext: SOLVED_PER_KEY - (solvedAlone % SOLVED_PER_KEY),
  };
}
