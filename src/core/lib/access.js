// Gratisbanor och betalbanor (etapp 5). Låsningen är av tills
// VITE_PAYWALL=on, så att inget ändras för eleverna innan priset är
// bestämt. Innehållet ligger kvar i appen: låset finns i gränssnittet, och
// betalbanorna flyttar till databasen (lesson_content) i ett senare steg.
export const PAYWALL = import.meta.env.VITE_PAYWALL === 'on';

// Priset för full tillgång, t.ex. "990 kr" (engångsköp för allt, för
// alltid). Utan det visas ingen köpknapp – bara tillgångskoder.
export const PRICE_TEXT = import.meta.env.VITE_PRICE_TEXT || null;

// Så många banor i början av varje kurs är gratis, om kursen inte säger
// något annat med freeTracks i index.jsx.
export const FREE_TRACKS = 2;

// Ett formulär på /konto?kod=TESTA fylls i med koden. Den sparas här tills
// man loggat in, eftersom inloggningen leder tillbaka utan ?kod.
export const CODE_PARAM = 'kod';
export const PENDING_CODE_KEY = 'kodskolan-kod';

// access är raderna från my_access(): { course_id, valid_until }, där
// course_id '*' betyder alla kurser.
export function hasAccess(access, courseId, now = new Date()) {
  return access.some(
    row =>
      (row.course_id === '*' || row.course_id === courseId) &&
      (row.valid_until === null || new Date(row.valid_until) > now),
  );
}

// Är banan på plats index låst bakom betalning? paywall kan stängas av i
// testerna.
export function isPaidTrack(
  index,
  { freeTracks = FREE_TRACKS, access, courseId, paywall = PAYWALL },
) {
  return paywall && index >= freeTracks && !hasAccess(access, courseId);
}

// Hur länge tillgången gäller, för Mitt konto. Den som räcker längst per
// kurs. null betyder för alltid.
export function accessSummary(access) {
  const byCourse = new Map();
  for (const row of access) {
    const previous = byCourse.get(row.course_id);
    if (previous === null) continue;
    const until = row.valid_until && new Date(row.valid_until);
    if (!until || previous === undefined || until > previous) {
      byCourse.set(row.course_id, until);
    }
  }
  return [...byCourse].map(([courseId, until]) => ({ courseId, until }));
}
