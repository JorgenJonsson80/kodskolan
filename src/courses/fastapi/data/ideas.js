// Egna API:er att bygga på Lekplatsen när ett projekt på banan är klart.
// Här finns inga tester – eleven bestämmer själv när det är klart.
// goals: vad API:et ska göra. extra: för den som vill ha mer.
// request: anropet 📮 börjar med. Idéerna finns än så länge för bana 1–3.
export const IDEAS = [
  {
    id: 'fa-idea-husdjur',
    track: 'forsta',
    emoji: '🐾',
    title: 'Husdjurets API',
    summary: 'Allt om ett husdjur, som en app kan visa.',
    goals: [
      'Gör / som svarar med djurets namn, art och ålder.',
      'Gör /favoriter med en lista med djurets favoritsaker.',
      'Ge appen en titel och en beskrivning för /docs.',
    ],
    extra: 'Lägg till /i-manniskoar som räknar om åldern till människoår.',
  },
  {
    id: 'fa-idea-citat',
    track: 'forsta',
    emoji: '💬',
    title: 'Citatbanken',
    summary: 'Ett API med kloka citat.',
    goals: [
      'Spara minst fem citat i en lista med dicts (text och vem).',
      'Gör /citat som svarar med alla.',
      'Gör /kortast som svarar med det kortaste citatet.',
    ],
    extra:
      'Gör /slump med random.choice – kör flera gånger och se svaret ändras.',
  },
  {
    id: 'fa-idea-kalender',
    track: 'forsta',
    emoji: '📅',
    title: 'Dagens API',
    summary: 'Datum och tid som JSON.',
    goals: [
      'Importera datetime och gör /idag som svarar med dagens datum som text.',
      'Gör /veckodag som svarar med vilken veckodag det är.',
      'Gör /dagar-kvar som räknar dagarna kvar till jul.',
    ],
    extra: 'Svara med veckodagen på svenska med en lista med dagnamn.',
  },
  {
    id: 'fa-idea-quiz',
    track: 'vagar',
    emoji: '❔',
    title: 'Quiz-API',
    summary: 'Frågor och svar med nummer i adressen.',
    goals: [
      'Spara frågor med svar i en lista.',
      'Gör /fraga/{nummer} som svarar med frågan, men inte svaret.',
      'Gör /svar/{nummer}/{gissning} som svarar om gissningen var rätt.',
    ],
    extra: 'Gör jämförelsen okänslig för stora och små bokstäver.',
  },
  {
    id: 'fa-idea-enheter',
    track: 'vagar',
    emoji: '📏',
    title: 'Omvandlaren',
    summary: 'Räkna om mellan enheter.',
    goals: [
      'Gör /km-till-mil/{km} med ett decimaltal.',
      'Gör /celsius/{grader} som svarar med Fahrenheit.',
      'Använd en Enum för /langd/{tal}/{enhet} med cm, m och km.',
    ],
    extra: 'Svara snällt om talet är negativt där det inte går.',
  },
  {
    id: 'fa-idea-pokedex',
    track: 'vagar',
    emoji: '🐉',
    title: 'Monsterboken',
    summary: 'Påhittade monster med id och typ.',
    goals: [
      'Hitta på minst fem monster med id, namn och typ.',
      'Gör /monster/{id} som hämtar ett monster.',
      'Gör /typ/{typ} med en Enum som svarar med alla av en typ.',
    ],
    extra: 'Gör /monster/{id}/starkast-mot som säger vilken typ monstret slår.',
  },
  {
    id: 'fa-idea-butik',
    track: 'fragor',
    emoji: '🛒',
    title: 'Webbutiken',
    summary: 'Sök, filtrera och bläddra bland varor.',
    goals: [
      'Spara minst åtta varor med namn, pris och kategori.',
      'Gör /varor med frågorna kategori, max_pris och billigast_forst.',
      'Lägg till start och antal så att man kan bläddra.',
    ],
    extra:
      'Svara också med totalt antal träffar, så att appen kan visa sidnummer.',
  },
  {
    id: 'fa-idea-musik',
    track: 'fragor',
    emoji: '🎵',
    title: 'Spellistan',
    summary: 'Sök bland låtar.',
    goals: [
      'Spara låtar med titel, artist, år och längd i sekunder.',
      'Gör /latar med frågorna artist och fran_ar.',
      'Gör /speltid som räknar ut hur lång spellistan är i minuter.',
    ],
    extra: 'Gör /sok?q=… som söker i både titel och artist.',
  },
  {
    id: 'fa-idea-traning',
    track: 'fragor',
    emoji: '🏃',
    title: 'Träningsloggen',
    summary: 'Filtrera träningspass.',
    goals: [
      'Spara pass med datum, sport och minuter.',
      'Gör /pass med frågorna sport och min_minuter.',
      'Gör /summa som svarar med totala minuter per sport.',
    ],
    extra: 'Lägg till ?vecka=… och räkna bara den veckans pass.',
  },
];

const goalLines = idea =>
  idea.goals
    .map((goal, index) => `# ${index + 1}. ${goal.replace(/`/g, '')}`)
    .join('\n');

export function ideaStarterCode(idea) {
  if (!idea) {
    return "from fastapi import FastAPI\n\napp = FastAPI()\n\n\n@app.get('/')\ndef start():\n    return {'meddelande': 'Hej från Lekplatsen!'}\n";
  }
  return `# ${idea.emoji} ${idea.title}\n${goalLines(idea)}\n\nfrom fastapi import FastAPI\n\napp = FastAPI()\n`;
}
