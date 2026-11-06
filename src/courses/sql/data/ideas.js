// Egna frågor att skriva på Lekplatsen när ett projekt på banan är klart.
// Här finns inga tester – eleven bestämmer själv när det är klart.
// Idéerna använder bara det man lärt sig fram till och med banan.
// db: databasen idén frågar (eller setup med egna tabeller).
// goals: vad frågan ska ge. extra: för den som vill ha mer.
export const IDEAS = [
  {
    id: 'idea-utforska',
    track: 'select',
    db: 'bibliotek',
    emoji: '🧭',
    title: 'Utforska biblioteket',
    summary: 'Titta runt i en databas du inte sett förut, en tabell i taget.',
    goals: [
      'Visa allt i varje tabell, en fråga i taget.',
      'Välj ut de två kolumner i `bocker` som du tycker säger mest.',
      'Visa bara de 3 första lånen.',
    ],
    extra:
      'Räkna ut hur många sidor det blir om du läser varje bok två gånger.',
  },
  {
    id: 'idea-miniraknare',
    track: 'select',
    db: 'butik',
    emoji: '🧮',
    title: 'Miniräknaren',
    summary: 'Använd SELECT som miniräknare för vardagens frågor.',
    goals: [
      'Hur många minuter är ett dygn?',
      'Hur många dagar har du levt, ungefär? (`år * 365`)',
      'Vad kostar varje produkt med 10 % rabatt? (`pris * 0.9`)',
    ],
    extra: 'Prova `7 / 2` och `7 / 2.0`. Varför blir svaren olika?',
  },
  {
    id: 'idea-filmlistan',
    track: 'select',
    db: 'filmer',
    emoji: '🎬',
    title: 'Min filmlista',
    summary: 'En lista med filmerna, med kolumnerna i den ordning du vill.',
    goals: [
      'Visa titel, år och genre, i den ordning du tycker är bäst.',
      'Lägg till hur gammal varje film är i år (`2026 - ar`).',
      'Skriv en kommentar överst om vad listan är till för.',
    ],
    extra: 'Visa längden i timmar med decimaler.',
  },
  {
    id: 'idea-detektiv',
    track: 'filtrera',
    db: 'butik',
    emoji: '🕵️',
    title: 'Detektiven',
    summary: 'Hitta svaren på butikens mysterier med WHERE.',
    goals: [
      'Vilka produkter är slut i lager?',
      'Vilka ordrar blev avbrutna?',
      'Vilka kunder är födda på 1990-talet?',
    ],
    extra: 'Vilka kunder har ett namn med två s i rad? (`LIKE`)',
  },
  {
    id: 'idea-boktips',
    track: 'filtrera',
    db: 'bibliotek',
    emoji: '📖',
    title: 'Boktipset',
    summary: 'Hitta en bok som passar en vän, med flera villkor.',
    goals: [
      'Böcker under 300 sidor.',
      'Bara romaner eller fantasy.',
      'Skrivna efter 1950.',
    ],
    extra: 'Böcker med ett visst ord i titeln, som `%ring%`.',
  },
  {
    id: 'idea-elevlistan',
    track: 'filtrera',
    db: 'skola',
    emoji: '🏅',
    title: 'Resultatlistan',
    summary: 'Hitta resultaten som sticker ut på slutproven.',
    goals: [
      'Alla resultat på 90 poäng eller mer.',
      'Bara i kurs 1 (matematik).',
      'Resultaten mellan 50 och 70.',
    ],
    extra: 'Eleverna i 9B som är födda 2010.',
  },
];

const goalLines = idea =>
  idea.goals.map(goal => `-- - ${goal.replaceAll('`', '')}`).join('\n');

// Lekplatsens startkod: idéns mål som kommentarer, eller ett exempel för
// fri kod.
export function ideaStarterCode(idea) {
  if (!idea) {
    return '-- Välj databas ovanför, titta i 📋 Tabellerna\n-- och skriv vilken fråga du vill.\nSELECT * FROM kunder;\n';
  }
  return `-- ${idea.emoji} ${idea.title}\n${goalLines(idea)}\n\n`;
}
