// Det figuren säger när koden inte är rätt än. Byter efter hur många
// gånger man försökt, och tröstar extra vid syntaxfel, som känns
// värst men oftast bara är ett tecken.
const TRY_AGAIN = [
  'Inte än – men det är så man lär sig. Kolla testraderna nedan, de visar vad som saknas.',
  'Nära! Läs vad som gick fel och ändra en sak i taget.',
  'Ingen fara, programmerare får fel hela tiden. Felet är en ledtråd, inte ett betyg.',
  'Den här är klurig. Testa en ledtråd, eller 👣 Kör rad för rad för att se vad som händer.',
  'Du är envis, det är bra! Läs uppgiften en gång till, ord för ord.',
];

// Kursen kan ha egna om syntaxfel och krascher, som nämner språket.
const SYNTAX = [
  'Ingen fara – det är bara ett tecken som fattas eller är för mycket. Läs förklaringen nedan, så hittar du det.',
];

const CRASH = [
  'Koden stoppade med ett fel. Läs förklaringen – den pekar ut raden.',
];

// kind: 'syntax', 'crash' eller 'tests'. own: kursens texts.encouragement.
export function encouragement(failedAttempts, kind, own = {}) {
  const list =
    kind === 'syntax'
      ? (own.syntax ?? SYNTAX)
      : kind === 'crash'
        ? (own.crash ?? CRASH)
        : TRY_AGAIN;
  return list[failedAttempts % list.length];
}
