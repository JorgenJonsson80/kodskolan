// Egna saker att prova på Lekplatsen när ett projekt på banan är klart.
// Här finns inga tester – eleven bestämmer själv när det är klart. Tre per
// bana.
export const IDEAS = [
  {
    id: 'idea-kmai-jamfor',
    track: 'verktyg',
    emoji: '⚖️',
    title: 'Jämför assistenterna',
    summary: 'Ställ samma fråga till två olika AI-assistenter.',
    goals: [
      'Be båda om en funktion som räknar ut moms.',
      'Klistra in svaren här och kör dem.',
      'Vilket var bäst? Skriv varför i en kommentar.',
    ],
  },
  {
    id: 'idea-kmai-pahittat',
    track: 'verktyg',
    emoji: '🦄',
    title: 'Påhittade funktioner',
    summary: 'Hitta en metod som en assistent hittade på.',
    goals: [
      'Be en assistent om något ovanligt, t.ex. att räkna stavelser.',
      'Kör koden. Finns alla metoder?',
      'Laga det som inte finns, med kod du förstår.',
    ],
  },
  {
    id: 'idea-kmai-regler',
    track: 'verktyg',
    emoji: '📜',
    title: 'Dina regler',
    summary: 'Skriv dina egna regler för vad du skickar till en AI.',
    goals: [
      'Gör en lista med True och False som i banan, med tio egna exempel.',
      'Fundera på kod från jobbet eller skolan.',
      'Skriv en regel per rad som kommentar.',
    ],
  },
  {
    id: 'idea-kmai-tva-bestallningar',
    track: 'bestall',
    emoji: '✍️',
    title: 'Kort mot lång',
    summary: 'Samma funktion, två beställningar.',
    goals: [
      'Skriv en kort och en noggrann beställning av samma funktion.',
      'Ge båda till en riktig assistent.',
      'Klistra in svaren och jämför dem med samma tester.',
    ],
  },
  {
    id: 'idea-kmai-kantfall',
    track: 'bestall',
    emoji: '🧱',
    title: 'Leta kantfall',
    summary: 'Vilka kantfall finns för en funktion?',
    goals: [
      'Välj en funktion, t.ex. dela upp en notan på flera personer.',
      'Skriv alla kantfall du kommer på som kommentarer.',
      'Skriv en beställning som nämner dem.',
    ],
  },
  {
    id: 'idea-kmai-exempel',
    track: 'bestall',
    emoji: '🔁',
    title: 'Exemplen gör jobbet',
    summary: 'Beställ med bara exempel.',
    goals: [
      'Skriv en beställning som bara består av exempel på indata och utdata.',
      'Ge den till en assistent.',
      'Förstod den vad du menade?',
    ],
  },
  {
    id: 'idea-kmai-forutsag',
    track: 'las',
    emoji: '🔮',
    title: 'Förutsäg först',
    summary: 'Läs kod innan du kör den.',
    goals: [
      'Be en assistent om en funktion på tio rader.',
      'Skriv vad du tror den ger för tre olika anrop.',
      'Kör och jämför. Vad missade du?',
    ],
  },
  {
    id: 'idea-kmai-rad-for-rad',
    track: 'las',
    emoji: '🐢',
    title: 'Rad för rad',
    summary: 'Följ koden med Kör rad för rad.',
    goals: [
      'Klistra in en funktion från en assistent.',
      'Kör den rad för rad och följ variablerna.',
      'Skriv en kommentar per rad om vad den gör.',
    ],
  },
  {
    id: 'idea-kmai-forklara',
    track: 'las',
    emoji: '🗣️',
    title: 'Förklara för en kompis',
    summary: 'Skriv en förklaring utan att använda koden.',
    goals: [
      'Välj en funktion från banan.',
      'Förklara den i kommentarer, som för någon som aldrig kodat.',
      'Be en assistent granska förklaringen.',
    ],
  },
  {
    id: 'idea-kmai-jakt',
    track: 'fel',
    emoji: '🕵️',
    title: 'Feljakten',
    summary: 'Be om kod och leta fel.',
    goals: [
      'Be en assistent om tre små funktioner.',
      'Testa gränser, tomma listor och text i stället för tal.',
      'Laga felen du hittar.',
    ],
  },
  {
    id: 'idea-kmai-planterat',
    track: 'fel',
    emoji: '🪤',
    title: 'Plantera ett fel',
    summary: 'Lägg in ett fel med flit.',
    goals: [
      'Ta en fungerande funktion och ändra en rad så att den blir fel.',
      'Kan du skriva ett anrop som avslöjar felet?',
      'Be en assistent hitta felet. Klarade den det?',
    ],
  },
  {
    id: 'idea-kmai-felmeddelanden',
    track: 'fel',
    emoji: '📟',
    title: 'Läs felen',
    summary: 'Samla felmeddelanden och vad de betyder.',
    goals: [
      'Framkalla ZeroDivisionError, TypeError, KeyError och AttributeError.',
      'Skriv vad varje fel betyder i en kommentar.',
      'Vilket fel gör assistenter oftast?',
    ],
  },
  {
    id: 'idea-kmai-test-forst',
    track: 'testa',
    emoji: '🧪',
    title: 'Testet först',
    summary: 'Skriv testerna innan koden.',
    goals: [
      'Välj en funktion och skriv test_…(f) med fem assert.',
      'Be sedan en assistent skriva funktionen.',
      'Kör ditt test mot svaret.',
    ],
  },
  {
    id: 'idea-kmai-testa-gammalt',
    track: 'testa',
    emoji: '🔁',
    title: 'Testa gammal kod',
    summary: 'Skriv tester för en övning du redan klarat.',
    goals: [
      'Ta en funktion från en tidigare bana.',
      'Skriv tester för det vanliga fallet och för kantfallen.',
      'Ändra funktionen lite. Märker testerna det?',
    ],
  },
  {
    id: 'idea-kmai-traffa',
    track: 'testa',
    emoji: '🎯',
    title: 'Träffa felet',
    summary: 'Ett test per sorts fel.',
    goals: [
      'Skriv en funktion och tre trasiga versioner av den.',
      'Skriv ett test som underkänner alla tre.',
      'Godkänner det den rätta?',
    ],
  },
  {
    id: 'idea-kmai-attack',
    track: 'sakerhet',
    emoji: '🛡️',
    title: 'Attackera din kod',
    summary: 'Försök ta dig in i din egen inloggning.',
    goals: [
      'Bygg en liten inloggning med en databas.',
      'Prova SQL-injektion, tomma fält och väldigt långa lösenord.',
      'Laga det som gick att ta sig förbi.',
    ],
  },
  {
    id: 'idea-kmai-hemligheter',
    track: 'sakerhet',
    emoji: '🙊',
    title: 'Hemligheter',
    summary: 'Var ska en API-nyckel ligga?',
    goals: [
      'Skriv kod som läser en nyckel med os.environ.get.',
      'Vad händer om nyckeln saknas?',
      'Skriv ett snällt felmeddelande för det fallet.',
    ],
  },
  {
    id: 'idea-kmai-granskning',
    track: 'sakerhet',
    emoji: '📋',
    title: 'Säkerhetsgranska',
    summary: 'Gå igenom en assistents kod efter en lista.',
    goals: [
      'Be en assistent om ett formulär som sparar namn i en databas.',
      'Kolla: f-strängar i SQL, eval, hemligheter, indata.',
      'Laga allt som inte klarar listan.',
    ],
  },
  {
    id: 'idea-kmai-stada',
    track: 'refaktor',
    emoji: '🧹',
    title: 'Städa gammal kod',
    summary: 'Gör din äldsta kod lättare att läsa.',
    goals: [
      'Ta kod från en tidigare övning.',
      'Byt namn, ta bort upprepningar och magiska tal.',
      'Kör testerna efteråt – fungerar allt som förut?',
    ],
  },
  {
    id: 'idea-kmai-be-om-mindre',
    track: 'refaktor',
    emoji: '🤏',
    title: 'Be om mindre',
    summary: 'Be assistenten om en ändring i taget.',
    goals: [
      'Ta en rörig funktion och be om en enda förbättring.',
      'Kolla att resultatet är detsamma.',
      'Upprepa tre gånger, en sak i taget.',
    ],
  },
  {
    id: 'idea-kmai-tva-satt',
    track: 'refaktor',
    emoji: '🔀',
    title: 'Två sätt',
    summary: 'Samma sak skriven på två sätt.',
    goals: [
      'Skriv en funktion med en loop och samma sak med en list comprehension.',
      'Vilken är lättast att läsa?',
      'Skriv ett test som båda klarar.',
    ],
  },
  {
    id: 'idea-kmai-eget-program',
    track: 'slutprojekt',
    emoji: '🏗️',
    title: 'Ditt eget program',
    summary: 'Bygg ett litet program med en assistent.',
    goals: [
      'Välj något du själv vill ha, t.ex. en träningslogg.',
      'Beställ en funktion i taget och granska varje svar.',
      'Skriv tester för det viktigaste.',
    ],
  },
  {
    id: 'idea-kmai-utan-ai',
    track: 'slutprojekt',
    emoji: '🧠',
    title: 'Utan AI',
    summary: 'Bygg samma sak utan hjälp.',
    goals: [
      'Välj en funktion från slutprojektet.',
      'Skriv den själv utan att titta.',
      'Jämför med assistentens version.',
    ],
  },
  {
    id: 'idea-kmai-lar-ut',
    track: 'slutprojekt',
    emoji: '👩‍🏫',
    title: 'Lär ut det',
    summary: 'Gör en övning till en kompis.',
    goals: [
      'Skriv en funktion med ett fel som assistenter brukar göra.',
      'Skriv ett test som avslöjar det.',
      'Låt en kompis hitta felet.',
    ],
  },
];

const goalLines = idea =>
  idea.goals
    .map((goal, index) => `# ${index + 1}. ${goal.replace(/`/g, '')}`)
    .join('\n');

export function ideaStarterCode(idea) {
  if (!idea) return '# Klistra in kod från en AI-assistent här och testa den\n';
  return `# ${idea.emoji} ${idea.title}\n${goalLines(idea)}\n`;
}
