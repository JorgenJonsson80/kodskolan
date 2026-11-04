// Testa dig förbi och nivåtestet. Frågorna finns i kursens quiz.js.

// Id:t som sparas bland de klara när man klarat en banas test. Det följer
// då med till kontot som allt annat, utan en egen kolumn i databasen.
export const passedId = trackId => `${trackId}-testad`;

export function passedTrackIdsFrom(completedIds, tracks) {
  return tracks
    .map(track => track.id)
    .filter(id => completedIds.includes(passedId(id)));
}

// Frågorna för en bana ur kursens quiz. Med perTrack väljs så många ut, i bankens ordning.
export function trackQuestions(quiz, trackId, perTrack, random = Math.random) {
  const all = (quiz[trackId] ?? []).map(question => ({ ...question, trackId }));
  if (!perTrack || perTrack >= all.length) return all;
  const keep = new Set(
    all
      .map((_, index) => ({ index, sort: random() }))
      .sort((a, b) => a.sort - b.sort)
      .slice(0, perTrack)
      .map(item => item.index),
  );
  return all.filter((_, index) => keep.has(index));
}

// Nivåtestet: tre frågor per bana, bana för bana i kursens ordning.
export function placementQuestions(quiz, tracks, random = Math.random) {
  return tracks.flatMap(track => trackQuestions(quiz, track.id, 3, random));
}

// Banorna man klarat: alla banor före den första där man svarade fel
// eller inte hann svara på alla frågor. answers är trackId och om svaret
// var rätt, i ordning. questions är frågorna som ställdes.
export function passedTracks(tracks, answers, questions) {
  const passed = [];
  for (const track of tracks) {
    const asked = questions.filter(question => question.trackId === track.id);
    const forTrack = answers.filter(answer => answer.trackId === track.id);
    if (asked.length === 0 || forTrack.length < asked.length) break;
    if (forTrack.some(answer => !answer.correct)) break;
    passed.push(track.id);
  }
  return passed;
}

// Blandar svarsalternativen. Returnerar alternativen och var rätt svar
// hamnade.
export function shuffleOptions(options, random = Math.random) {
  const order = options.map((option, index) => ({ option, index }));
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return {
    options: order.map(item => item.option),
    answer: order.findIndex(item => item.index === 0),
  };
}
