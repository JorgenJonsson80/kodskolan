// Egna appar att bygga på Lekplatsen när ett projekt på banan är klart.
// Här finns inga tester – eleven bestämmer själv när det är klart.
// goals: vad appen ska göra. extra: för den som vill ha mer.
// request: anropet 📮 börjar med. files: mallar och datafiler.
export const IDEAS = [
  {
    id: 'idea-hemsida',
    track: 'forsta',
    emoji: '🏠',
    title: 'Din hemsida',
    summary: 'En sajt om något du gillar, med flera sidor.',
    goals: [
      'Gör en startsida med en rubrik.',
      'Lägg till tre sidor till om olika saker.',
      'Länka ihop dem med <a href="/…"> i HTML:en.',
    ],
    extra: 'Lägg till en sida som visar dagens datum med datetime.',
  },
  {
    id: 'idea-slump',
    track: 'forsta',
    emoji: '🎲',
    title: 'Slumpsidan',
    summary: 'En sida som svarar olika varje gång.',
    goals: [
      'Gör en väg som svarar ett slumpat tal mellan 1 och 6.',
      'Gör en väg som slumpar ett råd ur en lista.',
      'Kör flera gånger och se svaret ändras.',
    ],
    extra: 'Räkna hur många gånger varje råd har visats.',
  },
  {
    id: 'idea-statuskoder',
    track: 'forsta',
    emoji: '🚦',
    title: 'Statuskodsjakten',
    summary: 'Få appen att svara med så många olika statuskoder du kan.',
    goals: [
      'Få ett 200 och ett 404.',
      'Få ett 405 genom att anropa med fel metod.',
      'Få ett 500 genom att låta en vägfunktion krascha – och läs felet.',
    ],
    extra: 'Läs om fler statuskoder på MDN.',
  },
  {
    id: 'idea-miniraknare',
    track: 'vagar',
    emoji: '🧮',
    title: 'Adressräknaren',
    summary: 'En miniräknare där talen står i adressen.',
    goals: [
      'Gör vägar för plus, minus, gånger och delat.',
      'Låt delat med noll svara med en förklaring i stället för att krascha.',
      'Gör en startsida med länkar till några exempel med url_for.',
    ],
    extra: 'Använd float: så att decimaltal också fungerar.',
  },
  {
    id: 'idea-profilsidor',
    track: 'vagar',
    emoji: '👥',
    title: 'Profilsidor',
    summary: 'En sida per person, med namnet i adressen.',
    goals: [
      'Skapa en dictionary med några personer.',
      'Gör /person/<namn> som visar en liten HTML-profil.',
      'Visa en vänlig text för namn som inte finns.',
    ],
    extra: 'Gör en startsida som länkar till alla profiler.',
  },
  {
    id: 'idea-farger',
    track: 'vagar',
    emoji: '🎨',
    title: 'Färgsidan',
    summary: 'Adressen bestämmer sidans färg.',
    goals: [
      'Gör /farg/<namn> som svarar med en div i den färgen.',
      'Gör /rgb/<int:r>/<int:g>/<int:b> på samma sätt.',
      'Visa ett fel om ett tal är större än 255.',
    ],
    extra: 'Visa färgens motsatsfärg bredvid.',
  },
  {
    id: 'idea-eget-api',
    track: 'json',
    emoji: '📡',
    title: 'Ditt eget API',
    summary: 'Ett API om något du gillar: spel, djur, låtar …',
    goals: [
      'Skapa en lista med minst fem saker, som dictionaries med id.',
      'Gör en väg för hela listan och en för en sak med id.',
      'Ge 404 med ett felmeddelande när id:t inte finns.',
    ],
    extra: 'Lägg till en väg med statistik om listan.',
  },
  {
    id: 'idea-tarnings-api',
    track: 'json',
    emoji: '🎲',
    title: 'Tärnings-API:t',
    summary: 'Ett API som slår tärningar.',
    goals: [
      "Gör /sla/<int:antal> som svarar med {'slag': [...], 'summa': …}.",
      'Låt tärningen ha 6 sidor som standard, och /sla/<int:antal>/<int:sidor> för fler.',
      'Svara 400 om någon vill slå fler än 100 tärningar.',
    ],
    extra: 'Räkna hur ofta varje sida kom upp.',
  },
  {
    id: 'idea-json-djup',
    track: 'json',
    emoji: '🪆',
    title: 'JSON i JSON',
    summary: 'Data i flera nivåer, som riktiga API:er har.',
    goals: [
      'Skapa skolor som har klasser som har elever.',
      'Gör en väg som svarar med en hel skola, med allt i.',
      'Gör en väg som bara svarar med eleverna i en klass.',
    ],
    extra: 'Räkna ut antalet elever per skola i en egen väg.',
  },
];

const goalLines = idea =>
  idea.goals
    .map((goal, index) => `# ${index + 1}. ${goal.replace(/`/g, '')}`)
    .join('\n');

export function ideaStarterCode(idea) {
  if (!idea) {
    return "from flask import Flask\n\napp = Flask(__name__)\n\n\n@app.get('/')\ndef start():\n    return 'Hej från Lekplatsen!'\n";
  }
  return `# ${idea.emoji} ${idea.title}\n${goalLines(idea)}\n\nfrom flask import Flask\n\napp = Flask(__name__)\n`;
}
