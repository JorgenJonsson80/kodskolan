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
