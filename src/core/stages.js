// Figurens nivåer. Figuren växer ett steg för varje bana som är klar, så
// det ska finnas en nivå mer än det finns banor (Nybörjare från början).
// Namnen är neutrala, så att de passar vuxna och skolor lika bra som barn.
// head, body och leg är storlekar i SVG:n, extras är saker figuren bär.
export const stages = [
  {
    title: 'Nybörjare',
    head: 22,
    body: 22,
    leg: 10,
    shirt: '#fde68a',
    pants: '#fde68a',
    hair: 'tuft',
    extras: [],
  },
  {
    title: 'Nyfiken',
    head: 22,
    body: 26,
    leg: 16,
    shirt: '#86efac',
    pants: '#3b82f6',
    hair: 'tuft',
    extras: ['cap'],
  },
  {
    title: 'Elev',
    head: 21,
    body: 30,
    leg: 24,
    shirt: '#f87171',
    pants: '#1e40af',
    hair: 'short',
    extras: ['backpack', 'cap'],
  },
  {
    title: 'Lärling',
    head: 20,
    body: 36,
    leg: 32,
    shirt: '#64748b',
    pants: '#475569',
    hair: 'spiky',
    extras: ['headphones'],
  },
  {
    title: 'Student',
    head: 19,
    body: 40,
    leg: 38,
    shirt: '#a78bfa',
    pants: '#334155',
    hair: 'short',
    extras: ['backpack', 'mug'],
  },
  {
    title: 'Praktikant',
    head: 19,
    body: 40,
    leg: 38,
    shirt: '#38bdf8',
    pants: '#334155',
    hair: 'short',
    extras: ['lanyard'],
  },
  {
    title: 'Juniorutvecklare',
    head: 19,
    body: 40,
    leg: 38,
    shirt: '#34d399',
    pants: '#475569',
    hair: 'spiky',
    extras: ['laptop'],
  },
  {
    title: 'Utvecklare',
    head: 19,
    body: 40,
    leg: 38,
    shirt: '#f472b6',
    pants: '#475569',
    hair: 'short',
    extras: ['headphones', 'laptop'],
  },
  {
    title: 'Seniorutvecklare',
    head: 19,
    body: 40,
    leg: 38,
    shirt: '#fb923c',
    pants: '#475569',
    hair: 'short',
    hairColor: '#57534e',
    extras: ['glasses', 'mug'],
  },
  {
    title: 'Tech lead',
    head: 19,
    body: 40,
    leg: 38,
    shirt: '#e2e8f0',
    pants: '#475569',
    hair: 'short',
    hairColor: '#9ca3af',
    extras: ['glasses', 'tie'],
  },
  {
    title: 'Arkitekt',
    head: 19,
    body: 40,
    leg: 38,
    shirt: '#0ea5e9',
    pants: '#334155',
    hair: 'short',
    hairColor: '#9ca3af',
    extras: ['glasses', 'laptop'],
  },
  {
    title: 'Professor',
    head: 19,
    body: 40,
    leg: 38,
    shirt: '#a16207',
    pants: '#44403c',
    hair: 'short',
    hairColor: '#d1d5db',
    extras: ['beard', 'glasses', 'tie'],
  },
  {
    title: 'Dataforskare',
    head: 19,
    body: 40,
    leg: 38,
    shirt: '#14b8a6',
    pants: '#334155',
    hair: 'short',
    hairColor: '#d1d5db',
    extras: ['beard', 'glasses', 'mug'],
  },
  {
    title: 'Appbyggare',
    head: 19,
    body: 40,
    leg: 38,
    shirt: '#ef4444',
    pants: '#334155',
    hair: 'short',
    hairColor: '#d1d5db',
    extras: ['beard', 'headphones', 'laptop'],
  },
  {
    title: 'Mästare',
    head: 19,
    body: 40,
    leg: 38,
    shirt: '#7c3aed',
    pants: '#4c1d95',
    hair: 'short',
    hairColor: '#e5e7eb',
    extras: ['beard', 'glasses', 'wizardHat'],
  },
];

// Hur långt eleven kommit i en bana. En bana är klar när alla övningar
// är klara, eller när man klarat banans quiz och alla dess bossar.
// viaTest säger att banan blev klar på det senare sättet.
export function trackProgress(track, lessons, completedIds, passedTrackIds) {
  const items = lessons.filter(lesson => lesson.track === track.id);
  const done = items.filter(lesson => completedIds.includes(lesson.id));
  // Övningar som lagts till i efterhand krävs inte, så att den som redan
  // klarat banan inte förlorar den.
  const required = items.filter(lesson => !lesson.addedLater);
  const allDone =
    required.length > 0 &&
    required.every(lesson => completedIds.includes(lesson.id));
  const bossesLeft = items.filter(
    lesson => lesson.isBoss && !completedIds.includes(lesson.id),
  );
  const viaTest =
    !allDone &&
    items.length > 0 &&
    passedTrackIds.includes(track.id) &&
    bossesLeft.length === 0;
  return {
    track,
    done: done.length,
    total: items.length,
    isComplete: allDone || viaTest,
    viaTest,
    bossesLeft,
  };
}

// Räknar ut var eleven är: nivå, nästa nivå och hur långt det är kvar.
export function getGrowth(tracks, lessons, completedIds, passedTrackIds = []) {
  const trackStatus = tracks.map(track =>
    trackProgress(track, lessons, completedIds, passedTrackIds),
  );

  const completedTracks = trackStatus.filter(status => status.isComplete);
  const stageIndex = Math.min(completedTracks.length, stages.length - 1);
  const currentTrack = trackStatus.find(status => !status.isComplete) ?? null;

  return {
    stage: stages[stageIndex],
    stageIndex,
    nextStage: stages[stageIndex + 1] ?? null,
    currentTrack,
    rewards: completedTracks.map(status => status.track.reward),
  };
}
