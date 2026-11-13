// Egna program att bygga på Lekplatsen när ett projekt på banan är klart.
// Här finns inga tester – eleven bestämmer själv när det är klart. Tre per
// bana.
export const IDEAS = [
  {
    id: 'idea-ai-gator',
    track: 'modell',
    emoji: '🧩',
    title: 'Gåtmaskinen',
    summary: 'Låt modellen hitta på gåtor.',
    goals: [
      'Skriv en funktion som ber om en gåta om ett ämne.',
      'Skriv ut hur många tokens svaret tog.',
      'Räkna ut vad hundra gåtor skulle kosta.',
    ],
  },
  {
    id: 'idea-ai-max-tokens',
    track: 'modell',
    emoji: '✂️',
    title: 'Hur kort går det?',
    summary: 'Prova olika max_tokens.',
    goals: [
      'Ställ samma fråga med max_tokens 5, 20 och 200.',
      'Skriv ut stop_reason varje gång.',
      'Var går gränsen där svaret blir helt?',
    ],
  },
  {
    id: 'idea-ai-omforsok',
    track: 'modell',
    emoji: '🔁',
    title: 'Försök igen, men lugnt',
    summary: 'Ett omförsök med väntan.',
    goals: [
      'Skriv en funktion som försöker tre gånger vid RateLimitError.',
      'Låt den vänta lite längre för varje försök.',
      'Ge upp med ett snällt meddelande efter tredje.',
    ],
  },
  {
    id: 'idea-ai-persona',
    track: 'prompter',
    emoji: '🎭',
    title: 'Personligheter',
    summary: 'Samma fråga, olika systemprompter.',
    goals: [
      'Gör tre systemprompter: en pirat, en lärare och en robot.',
      'Ställ samma fråga med alla tre.',
      'Vilken skulle du vilja prata med?',
    ],
  },
  {
    id: 'idea-ai-mall',
    track: 'prompter',
    emoji: '📄',
    title: 'Din egen mall',
    summary: 'En promptmall för något du gör ofta.',
    goals: [
      'Välj något: mejl, recept, träningsprogram …',
      'Skriv en mall med {platser} för det som ändras.',
      'Fyll i den på tre olika sätt.',
    ],
  },
  {
    id: 'idea-ai-taggar',
    track: 'prompter',
    emoji: '🏷️',
    title: 'Taggar för allt',
    summary: 'Lägg all data i taggar.',
    goals: [
      'Skicka en text och en fråga om texten, båda i egna taggar.',
      'Prova att ha instruktioner inne i texten.',
      'Fungerar taggarna som skydd?',
    ],
  },
  {
    id: 'idea-ai-rollspel',
    track: 'samtal',
    emoji: '🧙',
    title: 'Rollspelet',
    summary: 'Ett äventyr som minns vad du gjort.',
    goals: [
      'En systemprompt som gör modellen till spelledare.',
      'En loop där du skriver vad du gör.',
      'Spara äventyret som JSON och fortsätt senare.',
    ],
  },
  {
    id: 'idea-ai-sammanfatta-samtal',
    track: 'samtal',
    emoji: '🧾',
    title: 'Sammanfatta samtalet',
    summary: 'Korta historiken genom att sammanfatta den.',
    goals: [
      'När historiken blir lång: be modellen sammanfatta den.',
      'Byt ut de gamla meddelandena mot sammanfattningen.',
      'Minns den fortfarande ditt namn?',
    ],
  },
  {
    id: 'idea-ai-tva-botar',
    track: 'samtal',
    emoji: '🤖',
    title: 'Två chattbotar',
    summary: 'Låt två botar prata med varandra.',
    goals: [
      'Två historiker och två systemprompter.',
      'Skicka den enas svar som den andras fråga.',
      'Kör fem varv och läs samtalet.',
    ],
  },
  {
    id: 'idea-ai-kontakt',
    track: 'struktur',
    emoji: '📇',
    title: 'Visitkortet',
    summary: 'Gör om en text till ett visitkort.',
    goals: [
      'En Pydantic-modell med namn, mejl och telefon.',
      'Läs ut den från en text med parse.',
      'Vad händer när något saknas i texten?',
    ],
  },
  {
    id: 'idea-ai-schema',
    track: 'struktur',
    emoji: '🗂️',
    title: 'Ditt eget schema',
    summary: 'Ett schema för något du samlar på.',
    goals: [
      'Välj något: böcker, spel, låtar …',
      'Gör en modell med minst fyra fält, en av dem en lista.',
      'Läs ut tre stycken och sortera dem.',
    ],
  },
  {
    id: 'idea-ai-validera',
    track: 'struktur',
    emoji: '🚧',
    title: 'Regler i schemat',
    summary: 'Låt Pydantic stoppa dåliga svar.',
    goals: [
      'Använd Field med ge, le och max_length.',
      'Lägg in en regel som låtsasmodellen bryter mot.',
      'Fånga ValidationError och skriv ut vad som var fel.',
    ],
  },
  {
    id: 'idea-ai-tarning',
    track: 'verktyg',
    emoji: '🎲',
    title: 'Tärningen',
    summary: 'Ett verktyg som slår en tärning.',
    goals: [
      'Ett verktyg som ger ett slumptal mellan 1 och 6.',
      'Låt modellen be om det när du skriver kasta.',
      'Vad händer om du ber om två tärningar?',
    ],
  },
  {
    id: 'idea-ai-klocka',
    track: 'verktyg',
    emoji: '🕰️',
    title: 'Klockan',
    summary: 'Modellen vet inte vad klockan är.',
    goals: [
      'Ett verktyg som ger tiden med datetime.',
      'Fråga vad klockan är.',
      'Lägg till ett verktyg för veckodagen.',
    ],
  },
  {
    id: 'idea-ai-anteckningar',
    track: 'verktyg',
    emoji: '🗒️',
    title: 'Anteckningsboken',
    summary: 'Verktyg som läser och skriver anteckningar.',
    goals: [
      'Två verktyg: spara och läsa en anteckning.',
      'Låt modellen spara något du säger.',
      'Kolla att anteckningen finns kvar efteråt.',
    ],
  },
  {
    id: 'idea-ai-larar-ord',
    track: 'embeddings',
    emoji: '🧭',
    title: 'Dina egna ord',
    summary: 'Bygg vektorer för ditt eget ämne.',
    goals: [
      'Välj tio ord som beskriver ett ämne du gillar.',
      'Gör vektorer för fem texter.',
      'Vilka texter liknar varandra mest?',
    ],
  },
  {
    id: 'idea-ai-musik',
    track: 'embeddings',
    emoji: '🎵',
    title: 'Musiktipset',
    summary: 'Tipsa om låtar med likhet.',
    goals: [
      'Beskriv tio låtar med några ord var.',
      'Gör vektorer och cosinuslikhet.',
      'Tipsa om den låt som liknar din favorit mest.',
    ],
  },
  {
    id: 'idea-ai-voyage',
    track: 'embeddings',
    emoji: '🛳️',
    title: 'Riktiga embeddings',
    summary: 'Läs om riktiga embeddings.',
    goals: [
      'Läs Anthropics sida om embeddings och Voyage AI.',
      'Hur många tal har deras vektorer?',
      'Vad skulle bli bättre än med räknade ord?',
    ],
  },
  {
    id: 'idea-ai-egen-handbok',
    track: 'rag',
    emoji: '📗',
    title: 'Din egen handbok',
    summary: 'RAG om något du kan.',
    goals: [
      'Skriv en handbok om din klubb, ditt jobb eller ditt hem.',
      'Dela upp den och sök i den.',
      'Låt modellen svara utifrån bitarna.',
    ],
  },
  {
    id: 'idea-ai-k',
    track: 'rag',
    emoji: '🎚️',
    title: 'Hur många bitar?',
    summary: 'Prova olika många bitar.',
    goals: [
      'Skicka med 1, 2 och alla bitar.',
      'Räkna input-tokens varje gång.',
      'Vad är lagom?',
    ],
  },
  {
    id: 'idea-ai-kallor-lankar',
    track: 'rag',
    emoji: '🔗',
    title: 'Källor som länkar',
    summary: 'Svar med klickbara källor.',
    goals: [
      'Ge varje bit en adress.',
      'Låt svaret visa adresserna för källorna.',
      'Skriv ut svaret med källorna under.',
    ],
  },
  {
    id: 'idea-ai-agent-loggen',
    track: 'agent',
    emoji: '📋',
    title: 'Agentens dagbok',
    summary: 'Se allt agenten gör.',
    goals: [
      'Skriv ut varje verktyg och dess input i loopen.',
      'Skriv ut resultaten också.',
      'Ställ en fråga som kräver tre verktyg och läs loggen.',
    ],
  },
  {
    id: 'idea-ai-agent-budget',
    track: 'agent',
    emoji: '💸',
    title: 'Agenten med budget',
    summary: 'Stoppa agenten när den kostat för mycket.',
    goals: [
      'Räkna tokens varje varv.',
      'Stoppa när summan går över en gräns.',
      'Skriv ut vad det kostade.',
    ],
  },
  {
    id: 'idea-ai-agent-fragar',
    track: 'agent',
    emoji: '🙋',
    title: 'Agenten som frågar',
    summary: 'Ett verktyg för att fråga dig.',
    goals: [
      'Ett verktyg fraga_anvandaren som använder input().',
      'Låt agenten fråga när något är oklart.',
      'När är det bra – och när är det irriterande?',
    ],
  },
  {
    id: 'idea-ai-egna-testfall',
    track: 'utvardering',
    emoji: '🧪',
    title: 'Dina testfall',
    summary: 'Testfall för din egen chattbot.',
    goals: [
      'Skriv tio testfall med nyckelord.',
      'Kör dem och skriv ut poängen.',
      'Ändra systemprompten och kör igen.',
    ],
  },
  {
    id: 'idea-ai-attacker',
    track: 'utvardering',
    emoji: '🏴‍☠️',
    title: 'Fler attacker',
    summary: 'Hitta på egna attacker.',
    goals: [
      'Skriv fem nya sätt att lura ut en hemlighet.',
      'Lägg till dem bland attackerna.',
      'Klarar din säkra prompt alla?',
    ],
  },
  {
    id: 'idea-ai-domare',
    track: 'utvardering',
    emoji: '👩‍⚖️',
    title: 'AI som domare',
    summary: 'Låt modellen bedöma svar.',
    goals: [
      'Be modellen betygsätta ett svar från 1 till 5.',
      'Jämför med ditt eget betyg.',
      'När håller ni med varandra?',
    ],
  },
  {
    id: 'idea-ai-eget-api',
    track: 'slutprojekt',
    emoji: '🛠️',
    title: 'Ditt eget AI-API',
    summary: 'Ett API för något du vill ha.',
    goals: [
      'Välj en sak: översätta, sammanfatta, sortera …',
      'En route med nyckel och felhantering.',
      'Lägg till en route för statistik.',
    ],
  },
  {
    id: 'idea-ai-kvot',
    track: 'slutprojekt',
    emoji: '🚦',
    title: 'Kvot per nyckel',
    summary: 'Begränsa hur mycket varje nyckel får använda.',
    goals: [
      'Räkna anropen per nyckel.',
      'Ge 429 när en nyckel använt för många.',
      'Låt kvoten börja om varje dag.',
    ],
  },
  {
    id: 'idea-ai-deploy',
    track: 'slutprojekt',
    emoji: '🚀',
    title: 'Ut på riktigt',
    summary: 'Kör ditt API med en riktig modell.',
    goals: [
      'Läs om att skapa en API-nyckel på console.anthropic.com.',
      'Kör API:et på din dator med uvicorn.',
      'Byt låtsasmodellen mot den riktiga – koden är densamma.',
    ],
  },
];

const goalLines = idea =>
  idea.goals
    .map((goal, index) => `# ${index + 1}. ${goal.replace(/`/g, '')}`)
    .join('\n');

export function ideaStarterCode(idea) {
  if (!idea) {
    return "import anthropic\n\nclient = anthropic.Anthropic()\n\nsvar = client.messages.create(\n    model='claude-opus-5-5',\n    max_tokens=1000,\n    messages=[{'role': 'user', 'content': 'Hej'}],\n)\nprint(svar.content[0].text)\n";
  }
  return `# ${idea.emoji} ${idea.title}\n${goalLines(idea)}\n\nimport anthropic\n\nclient = anthropic.Anthropic()\n`;
}
