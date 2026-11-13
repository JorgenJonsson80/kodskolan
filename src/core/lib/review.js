import { localDay } from './activity';

// Repetition: quizfrågor från banor eleven klarat kommer tillbaka med
// växande mellanrum (Leitner). Rätt svar flyttar frågan ett fack upp och
// längre fram i tiden, fel svar tillbaka till första facket och i morgon.
// Läget sparas per kurs i webbläsaren: { "bana-0": { box, due } }.
export const INTERVALS = [1, 3, 7, 21, 60];
export const SESSION_SIZE = 5;

const addDays = (day, days) => {
  const [year, month, date] = day.split('-').map(Number);
  return localDay(new Date(year, month - 1, date + days));
};

export const questionKey = (trackId, index) => `${trackId}-${index}`;

export const isReviewState = value =>
  value !== null &&
  typeof value === 'object' &&
  Object.values(value).every(
    entry =>
      entry &&
      Number.isInteger(entry.box) &&
      /^\d{4}-\d{2}-\d{2}$/.test(entry.due),
  );

// Frågorna som ska repeteras i dag: från klara banor, aldrig sedda eller
// med ett datum som passerat. De som väntat längst först.
export function dueQuestions(
  quiz,
  completedTrackIds,
  state,
  today = localDay(),
) {
  const due = [];
  for (const trackId of completedTrackIds) {
    (quiz[trackId] ?? []).forEach((question, index) => {
      const key = questionKey(trackId, index);
      const entry = state[key];
      if (!entry || entry.due <= today) {
        due.push({ ...question, trackId, key, waitedSince: entry?.due ?? '' });
      }
    });
  }
  return due.sort((a, b) => a.waitedSince.localeCompare(b.waitedSince));
}

export function answerQuestion(state, key, correct, today = localDay()) {
  const box = correct
    ? Math.min((state[key]?.box ?? -1) + 1, INTERVALS.length - 1)
    : 0;
  const wait = correct ? INTERVALS[box] : 1;
  return { ...state, [key]: { box, due: addDays(today, wait) } };
}
