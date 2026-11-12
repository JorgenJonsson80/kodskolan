import { FIL, KASSA } from './filer';

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

  // Bana 5: gruppera på riktigt
  {
    id: 'idea-da-pivot-kassa',
    track: 'gruppera',
    emoji: '🧮',
    title: 'Din egen pivottabell',
    summary: 'Välj två kolumner i kassan och gör en pivottabell.',
    files: KASSA,
    goals: [
      'Välj vad som ska vara rader och kolumner, t.ex. betalsätt och månad.',
      'Gör pivottabellen med pivot_table.',
      'Vad är den största och minsta rutan, och varför?',
    ],
  },
  {
    id: 'idea-da-bibliotek-genre',
    track: 'gruppera',
    emoji: '📚',
    title: 'Genrerna i biblioteket',
    summary: 'Flera mått per genre med agg.',
    files: FIL.bibliotek,
    goals: [
      'Räkna lån och olika titlar per genre med agg.',
      'Vilken titel lånas mest i varje genre?',
      'Gör en crosstab med genre och månad.',
    ],
  },
  {
    id: 'idea-da-enkat-kommentar',
    track: 'gruppera',
    emoji: '🗣️',
    title: 'Vad säger missnöjda kunder?',
    summary: 'Kommentarerna grupperade efter betyg.',
    files: FIL.enkat,
    goals: [
      'Städa betygen (som i projektet Kundenkäten).',
      'Gör en crosstab med betyg och kommentar.',
      'Vilken kommentar är vanligast bland låga betyg?',
    ],
  },

  // Bana 6: kombinera tabeller
  {
    id: 'idea-da-egen-uppslag',
    track: 'kombinera',
    emoji: '🧩',
    title: 'Din egen uppslagstabell',
    summary: 'Gör en tabell som ger kaféets produkter en ny egenskap.',
    files: KASSA,
    goals: [
      'Gör en tabell med produkt och t.ex. "vegansk" eller "kall/varm".',
      'Slå ihop med kassan.',
      'Hur stor del av intäkten kommer från varje grupp?',
    ],
  },
  {
    id: 'idea-da-konto-budget-manad',
    track: 'kombinera',
    emoji: '🎯',
    title: 'Budgeten månad för månad',
    summary: 'Höll budgeten varje månad, eller bara i snitt?',
    files: FIL.kontoBudget,
    goals: [
      'Räkna utgifterna per kategori och månad.',
      'Slå ihop med budgeten.',
      'Vilka månader sprack vilka kategorier?',
    ],
  },
  {
    id: 'idea-da-genre-tid',
    track: 'kombinera',
    emoji: '🎼',
    title: 'Genre och tid på dygnet',
    summary: 'Lyssnar du på olika genrer morgon och kväll?',
    files: FIL.lyssningArtister,
    goals: [
      'Slå ihop spellistan med artisternas genrer.',
      'Lägg till timmen och dela in i morgon, dag och kväll.',
      'Gör en crosstab med genre och tid på dygnet.',
    ],
  },

  // Bana 7: diagram
  {
    id: 'idea-da-eget-diagram',
    track: 'diagram',
    emoji: '🎨',
    title: 'Snyggare diagram',
    summary: 'Prova färger, rutnät och storlek.',
    files: KASSA,
    goals: [
      'Rita intäkten per månad och prova color="..." och linewidth.',
      'Lägg till plt.grid(True) och figsize.',
      'Sätt månadernas namn på x-axeln med plt.xticks.',
    ],
  },
  {
    id: 'idea-da-bibliotek-diagram',
    track: 'diagram',
    emoji: '📈',
    title: 'Lånetiden i ett histogram',
    summary: 'Hur länge har eleverna böckerna?',
    files: FIL.bibliotek,
    goals: [
      'Räkna ut dagar per lån.',
      'Rita ett histogram med lämpligt antal fack.',
      'Rita en lodrät linje vid 21 dagar med plt.axvline.',
    ],
  },
  {
    id: 'idea-da-lyssning-diagram',
    track: 'diagram',
    emoji: '🎧',
    title: 'Musik över dygnet',
    summary: 'Ett diagram över när du lyssnar.',
    files: FIL.lyssning,
    goals: [
      'Räkna spelningar per timme.',
      'Rita dem som staplar med alla timmar 0–23.',
      'Gör en figur till med en linje per veckodag.',
    ],
  },

  // Bana 8: statistik
  {
    id: 'idea-da-egen-statistik',
    track: 'statistik',
    emoji: '🎲',
    title: 'Din egen statistik',
    summary: 'Mät något i en vecka och beskriv det med statistik.',
    goals: [
      'Skriv in t.ex. sömn eller steg för minst sju dagar.',
      'Räkna medel, median och standardavvikelse.',
      'Vilken dag sticker ut mest?',
    ],
  },
  {
    id: 'idea-da-corr-vader',
    track: 'statistik',
    emoji: '☔',
    title: 'Regn och värme',
    summary: 'Hänger regn och temperatur ihop i juni?',
    files: FIL.vader,
    goals: [
      'Räkna korrelationen mellan temperatur och regn per stad.',
      'Rita ett punktdiagram för en stad.',
      'Skriv en mening om vad du hittade – och vad du inte kan säga.',
    ],
  },
  {
    id: 'idea-da-rullande-konto',
    track: 'statistik',
    emoji: '📉',
    title: 'Saldot utjämnat',
    summary: 'Ett rullande medelvärde av utgifterna.',
    files: FIL.konto,
    goals: [
      'Summera utgifterna per datum.',
      'Räkna ett rullande medelvärde över sju dagar.',
      'Rita båda i samma diagram.',
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
