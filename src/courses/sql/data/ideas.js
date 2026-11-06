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
  {
    id: 'idea-rekord',
    track: 'sortera',
    db: 'filmer',
    emoji: '🏅',
    title: 'Rekordboken',
    summary: 'Hitta filmdatabasens rekord: äldst, nyast, längst och kortast.',
    goals: [
      'De tre äldsta filmerna.',
      'Den längsta filmen från efter 2000.',
      'Snittlängden för alla dramer.',
    ],
    extra:
      'Hur många år skiljer den äldsta och den nyaste filmen? (`MAX(ar) - MIN(ar)`)',
  },
  {
    id: 'idea-butiksfakta',
    track: 'sortera',
    db: 'butik',
    emoji: '🧾',
    title: 'Butiken i siffror',
    summary: 'Fem siffror som säger något om butiken.',
    goals: [
      'Hur många produkter finns det?',
      'Vad kostar en vara i snitt?',
      'Hur många varor har sålts totalt? (`SUM(antal)` i `orderrader`)',
    ],
    extra:
      'Vilken var den första och den senaste ordern? (`MIN` och `MAX` på datum)',
  },
  {
    id: 'idea-bokhyllan',
    track: 'sortera',
    db: 'bibliotek',
    emoji: '📚',
    title: 'Bokhyllan',
    summary: 'Ställ biblioteket i ordning på olika sätt.',
    goals: [
      'Böckerna från tjockast till tunnast.',
      'Alla genrer, en gång var.',
      'Hur många sidor har alla Astrid Lindgrens böcker tillsammans?',
    ],
    extra: 'Sortera på författare och sedan på år.',
  },
  {
    id: 'idea-decennier',
    track: 'gruppera',
    db: 'filmer',
    emoji: '📼',
    title: 'Filmernas årtionden',
    summary: 'Hur många filmer finns det från varje årtionde?',
    goals: [
      'Räkna ut årtiondet med `ar / 10 * 10` (heltal delat ger heltal!).',
      'Gruppera på årtiondet och räkna filmerna.',
      'Visa bara årtionden med fler än en film.',
    ],
    extra: 'Lägg till snittlängden för varje årtionde.',
  },
  {
    id: 'idea-lanstatistik',
    track: 'gruppera',
    db: 'bibliotek',
    emoji: '📊',
    title: 'Lånestatistiken',
    summary: 'Vilka lånar mest, och vad?',
    goals: [
      'Antal lån per låntagare.',
      'Antal lån som inte är återlämnade, per låntagare.',
      'Låntagarna med fler än två lån.',
    ],
    extra: 'Antal böcker per genre och snittet av sidor.',
  },
  {
    id: 'idea-klasserna',
    track: 'gruppera',
    db: 'skola',
    emoji: '🏫',
    title: 'Klasserna',
    summary: 'Jämför klasserna och kurserna.',
    goals: [
      'Antal elever i varje klass.',
      'Varje elevs bästa och sämsta resultat.',
      'Eleverna som skrivit alla fyra proven.',
    ],
    extra: 'Hur många resultat finns det på över 90 i varje kurs?',
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
