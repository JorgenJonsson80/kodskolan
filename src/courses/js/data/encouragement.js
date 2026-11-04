// Det figuren säger när koden inte är rätt än. Byter efter hur många
// gånger man försökt, och tröstar extra vid syntaxfel, som känns
// värst men oftast bara är ett tecken.
const TRY_AGAIN = [
  'Inte än – men det är så man lär sig. Kolla testraderna nedan, de visar vad som saknas.',
  'Nära! Läs vad som gick fel och ändra en sak i taget.',
  'Ingen fara, programmerare får fel hela tiden. Felet är en ledtråd, inte ett betyg.',
  'Den här är klurig. Testa en ledtråd, eller 👣 Kör rad för rad för att se vad som händer.',
  'Du är envis, det är bra! Kika i 🆘 Fastnat? om du vill ha ett annat sätt att tänka.',
];

const SYNTAX = [
  'Ingen fara – det är bara ett tecken som fattas eller är för mycket. Alla glömmer citattecken och parenteser ibland.',
  'Datorn är petig med tecken. Läs förklaringen nedan, så hittar du det.',
];

export function encouragement(failedAttempts, error) {
  const list = error ? SYNTAX : TRY_AGAIN;
  return list[failedAttempts % list.length];
}
