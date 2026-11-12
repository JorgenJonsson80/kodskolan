import { FIL } from './filer';

// Egna analyser att göra på Lekplatsen när ett projekt på banan är klart.
// Här finns inga tester – eleven bestämmer själv när det är klart.
// Tre per bana. files ger idén en datafil att utforska.
export const IDEAS = [
  // Bana 1: pandas igen
  {
    id: 'idea-da-kvitton',
    track: 'pandas',
    emoji: '🧾',
    title: 'Ditt eget kvitto',
    summary: 'Skriv in ett riktigt kvitto från affären och räkna på det.',
    goals: [
      'Skriv kvittot som en DataFrame med vara, antal och pris.',
      'Lägg till en kolumn med summan per rad och räkna ut totalen.',
      'Vilken vara kostade mest? Vilken köpte du flest av?',
    ],
  },
  {
    id: 'idea-da-konto-utforska',
    track: 'pandas',
    emoji: '💳',
    title: 'Kontot på egen hand',
    summary: 'Ställ egna frågor till kontoutdraget.',
    files: FIL.konto,
    goals: [
      'Läs in konto.csv och titta på den.',
      'Vilken butik handlades det mest i, räknat i kronor?',
      'Vilken var den största enskilda utgiften?',
    ],
  },
  {
    id: 'idea-da-musik',
    track: 'pandas',
    emoji: '🎵',
    title: 'Din musik',
    summary: 'Gör en egen tabell med låtar du gillar och sortera den.',
    goals: [
      'Skriv en tabell med låt, artist och längd i sekunder.',
      'Sortera efter längd och hitta den längsta.',
      'Hur många minuter blir alla tillsammans?',
    ],
  },

  // Bana 2: första mötet
  {
    id: 'idea-da-ny-fil',
    track: 'forsta',
    emoji: '🔍',
    title: 'Främlingen',
    summary: 'Gör första mötet med lyssningsdatan, som du aldrig sett.',
    files: FIL.lyssning,
    goals: [
      'Hur stor är filen, och vilka typer har kolumnerna?',
      'Vilka artister finns, och vilken period täcker den?',
      'Skriv tre frågor den kan svara på och en den inte kan.',
    ],
  },
  {
    id: 'idea-da-vader-forsta',
    track: 'forsta',
    emoji: '🌡️',
    title: 'Vädret i korthet',
    summary: 'Använd describe på vädret och tolka siffrorna.',
    files: FIL.vader,
    goals: [
      'Kör describe() och förklara varje rad med egna ord.',
      'Finns det värden som saknas? Var?',
      'Gör en faktaruta om juni i tre städer.',
    ],
  },
  {
    id: 'idea-da-egen-faktaruta',
    track: 'forsta',
    emoji: '🪪',
    title: 'Faktaruta om dig',
    summary: 'Skriv data om din vecka och gör en faktaruta.',
    goals: [
      'Skriv en tabell med dag, sömn i timmar och steg.',
      'Använd describe för att se snitt, minsta och största.',
      'Skriv ut en faktaruta med tre rader.',
    ],
  },

  // Bana 3: städa data
  {
    id: 'idea-da-stada-enkat',
    track: 'stada',
    emoji: '💬',
    title: 'Kommentarerna',
    summary: 'Enkätens kommentarer: vad tycker kunderna?',
    files: FIL.enkat,
    goals: [
      'Städa kommentarerna med strip och lower.',
      'Räkna de vanligaste med value_counts.',
      'Vilka kommentarer hör ihop med låga betyg?',
    ],
  },
  {
    id: 'idea-da-egen-rorig',
    track: 'stada',
    emoji: '🧽',
    title: 'Gör en rörig fil',
    summary: 'Hitta på en rörig tabell åt en kompis – och städa den själv.',
    goals: [
      'Skriv en tabell med minst tre sorters fel: stavning, tomma och kopior.',
      'Städa den steg för steg.',
      'Kolla med len och unique att allt blev rätt.',
    ],
  },
  {
    id: 'idea-da-bank-mer',
    track: 'stada',
    emoji: '🏦',
    title: 'Hela bankexporten',
    summary: 'Städa bankens export så att den blir lika med konto.csv.',
    files: { ...FIL.kontoRorig, ...FIL.konto },
    goals: [
      'Läs in konto_rorig.csv med sep=";".',
      'Städa text och belopp och ta bort kopiorna.',
      'Jämför med konto.csv: blev summorna lika?',
    ],
  },

  // Bana 4: datum och tid
  {
    id: 'idea-da-semester',
    track: 'datum',
    emoji: '🏖️',
    title: 'Hur länge till lovet?',
    summary: 'Räkna med datum: dagar kvar, veckodagar och helger.',
    goals: [
      'Räkna ut hur många dagar det är kvar till nästa lov.',
      'Vilken veckodag börjar lovet på?',
      'Gör en lista med alla helgdagar fram till dess med pd.date_range.',
    ],
  },
  {
    id: 'idea-da-bibliotek-manad',
    track: 'datum',
    emoji: '📅',
    title: 'Bibliotekets månader',
    summary: 'Vilken månad lånas det mest?',
    files: FIL.bibliotek,
    goals: [
      'Gör om lanad till datum och lägg till månad.',
      'Räkna lån per månad.',
      'Vilken veckodag lånas det mest?',
    ],
  },
  {
    id: 'idea-da-vader-veckor',
    track: 'datum',
    emoji: '🗓️',
    title: 'Vädret vecka för vecka',
    summary: 'Medeltemperaturen per vecka i varje stad.',
    files: FIL.vader,
    goals: [
      'Gör om datum och välj en stad.',
      'Använd resample("W") för medeltemperaturen per vecka.',
      'Vilken vecka var varmast?',
    ],
  },
];

const goalLines = idea =>
  idea.goals
    .map((goal, index) => `# ${index + 1}. ${goal.replace(/`/g, '')}`)
    .join('\n');

export function ideaStarterCode(idea) {
  if (!idea) {
    return 'import pandas as pd\n\ndf = pd.DataFrame({\n    "produkt": ["Latte", "Kanelbulle", "Latte"],\n    "antal": [1, 2, 1],\n})\nprint(df.groupby("produkt")["antal"].sum())\n';
  }
  return `# ${idea.emoji} ${idea.title}\n${goalLines(idea)}\n\nimport pandas as pd\n`;
}
