// Egna saker att prova på Lekplatsen när ett projekt på banan är klart.
// Här finns inga tester – eleven bestämmer själv när det är klart. Tre per
// bana.
export const IDEAS = [
  // Bana 1: terminalen
  {
    id: 'idea-git-dator',
    track: 'terminal',
    emoji: '🗄️',
    title: 'Din dator i mappar',
    summary: 'Bygg mapparna du önskar att din dator hade.',
    goals: [
      'Skapa en mapp per sak du gör: skola, jobb, bilder, spel …',
      'Lägg en fil i varje mapp som säger vad som ska ligga där.',
      'Gå runt med cd och .. och kolla läget med pwd och ls.',
    ],
  },
  {
    id: 'idea-git-vecka',
    track: 'terminal',
    emoji: '📅',
    title: 'Veckans schema',
    summary: 'En fil per veckodag med det du ska göra.',
    goals: [
      'Skapa mappen vecka med en fil per dag.',
      'Skriv det viktigaste för varje dag med echo.',
      'Läs hela veckan med cat, en dag i taget.',
    ],
  },
  {
    id: 'idea-git-snabbast',
    track: 'terminal',
    emoji: '⏱️',
    title: 'Så få kommandon som möjligt',
    summary: 'Bygg samma mappar med så få rader som du kan.',
    goals: [
      'Bygg projekt/bilder, projekt/text och projekt/kod.',
      'Prova att skriva sökvägar i stället för att cd:a in överallt.',
      'Räkna raderna. Kan du göra det på färre?',
    ],
  },

  // Bana 2: filer
  {
    id: 'idea-git-skrivbord',
    track: 'filer',
    emoji: '🧺',
    title: 'Det röriga skrivbordet',
    summary: 'Skapa en röra med touch, och städa den sedan.',
    goals: [
      'Skapa tio filer av olika slag med touch: bilder, dokument och skräp.',
      'Sortera dem i mappar med mkdir -p och mv.',
      'Släng skräpet med rm. Har du kvar allt du ville?',
    ],
  },
  {
    id: 'idea-git-backup',
    track: 'filer',
    emoji: '💽',
    title: 'Säkerhetskopian',
    summary: 'Kopiera en hel mapp innan du ändrar i den.',
    goals: [
      'Bygg en mapp med några filer i.',
      'Kopiera filerna en och en till en backup-mapp med cp.',
      'Ändra originalen med >> och jämför med cat.',
    ],
  },
  {
    id: 'idea-git-dolda',
    track: 'filer',
    emoji: '🕵️',
    title: 'Dolda filer',
    summary: 'Göm filer och hitta dem igen.',
    goals: [
      'Skapa några filer som börjar med en punkt.',
      'Kolla skillnaden mellan ls och ls -a.',
      'Döp om en dold fil så att den syns, med mv.',
    ],
  },

  // Bana 3: din första commit
  {
    id: 'idea-git-berattelse',
    track: 'commit',
    emoji: '📖',
    title: 'En berättelse i commits',
    summary: 'Skriv en kort berättelse, ett stycke per commit.',
    goals: [
      'Starta ett repo och skriv första stycket.',
      'Committa efter varje nytt stycke, med ett meddelande som sammanfattar det.',
      'Läs berättelsen baklänges med git log.',
    ],
  },
  {
    id: 'idea-git-tranare',
    track: 'commit',
    emoji: '🏋️',
    title: 'Träningsloggen',
    summary: 'Logga varje pass som en commit.',
    goals: [
      'En fil per sorts träning: löpning, styrka, simning.',
      'Lägg till ett pass med >> och committa bara den filen.',
      'git status före varje commit: vad följer med?',
    ],
  },
  {
    id: 'idea-git-status',
    track: 'commit',
    emoji: '🚦',
    title: 'Läs git status',
    summary: 'Se hur git status ändras efter varje kommando.',
    goals: [
      'Kör git status efter init, efter en ny fil, efter add och efter commit.',
      'Vad står det i varje läge? Skriv ner det i en fil.',
      'Committa filen med dina anteckningar.',
    ],
  },

  // Bana 4: ändringar
  {
    id: 'idea-git-tidsresa',
    track: 'andringar',
    emoji: '⏪',
    title: 'Ångra allt',
    summary: 'Förstör en fil med flit – och ta tillbaka den.',
    goals: [
      'Committa en fil med några rader.',
      'Skriv över den med > så att allt försvinner. Kolla med git diff.',
      'Ta tillbaka den med git restore.',
    ],
  },
  {
    id: 'idea-git-ignore',
    track: 'andringar',
    emoji: '🙈',
    title: 'Din egen .gitignore',
    summary: 'Ett projekt med saker som inte ska in i Git.',
    goals: [
      'Skapa kod, en hemlig fil och en mapp med tillfälliga filer.',
      'Skriv en .gitignore för det som inte ska med.',
      'git add . och kolla med git status att bara rätt filer följer med.',
    ],
  },
  {
    id: 'idea-git-diff',
    track: 'andringar',
    emoji: '🔍',
    title: 'Diff-detektiven',
    summary: 'Ändra flera filer och följ med i git diff.',
    goals: [
      'Committa tre filer.',
      'Ändra två av dem och läs git diff.',
      'Committa en av dem och kör git diff igen. Vad syns nu?',
    ],
  },

  // Bana 5: grenar
  {
    id: 'idea-git-tre-grenar',
    track: 'grenar',
    emoji: '🌿',
    title: 'Tre försök',
    summary: 'Prova tre olika slut på en berättelse, en gren per slut.',
    goals: [
      'Committa början av berättelsen på main.',
      'Skapa tre grenar och skriv ett slut på varje.',
      'Välj det bästa, slå ihop det och ta bort de andra grenarna.',
    ],
  },
  {
    id: 'idea-git-grenlek',
    track: 'grenar',
    emoji: '🔀',
    title: 'Filer som kommer och går',
    summary: 'Se hur filerna ändras när du byter gren.',
    goals: [
      'Skapa en fil som bara finns på en gren.',
      'Byt fram och tillbaka med git switch och kör ls varje gång.',
      'Slå ihop – nu finns filen på båda.',
    ],
  },
  {
    id: 'idea-git-hemsida',
    track: 'grenar',
    emoji: '🏠',
    title: 'Hemsidan växer',
    summary: 'Bygg en sida med en gren per ny del.',
    goals: [
      'index.html på main.',
      'En gren för en meny och en för en sidfot.',
      'Slå ihop båda med main.',
    ],
  },

  // Bana 6: konflikter
  {
    id: 'idea-git-krock',
    track: 'konflikter',
    emoji: '💥',
    title: 'Bygg en krock',
    summary: 'Skapa en konflikt med flit, så att du känner igen den.',
    goals: [
      'Ändra samma rad på två grenar.',
      'Slå ihop och läs markeringarna med cat.',
      'Laga på tre olika sätt: välj den ena, den andra och båda.',
    ],
  },
  {
    id: 'idea-git-ingen-krock',
    track: 'konflikter',
    emoji: '🕊️',
    title: 'När blir det ingen krock?',
    summary: 'Ta reda på när Git klarar sig själv.',
    goals: [
      'Ändra olika filer på två grenar och slå ihop.',
      'Ändra olika rader i samma fil. Krockar det?',
      'Ändra samma rad. Skriv ner vad du kom fram till.',
    ],
  },
  {
    id: 'idea-git-avbryt',
    track: 'konflikter',
    emoji: '🧯',
    title: 'Lugnt i konflikten',
    summary: 'Öva på att läsa git status mitt i en konflikt.',
    goals: [
      'Skapa en konflikt i två filer.',
      'Kör git status efter varje fil du lagar och lägger till.',
      'Committa när status säger att allt är lagat.',
    ],
  },

  // Bana 7: GitHub
  {
    id: 'idea-git-samarbete',
    track: 'github',
    emoji: '👯',
    title: 'Två kloner',
    summary: 'Spela två personer som jobbar i samma repo.',
    goals: [
      'Lägg ett repo på låtsas-GitHub och klona det två gånger, till anna och bo.',
      'Låt anna pusha en ändring och bo hämta den med git pull.',
      'Låt bo svara med en egen ändring.',
    ],
  },
  {
    id: 'idea-git-readme',
    track: 'github',
    emoji: '📄',
    title: 'Den perfekta README:n',
    summary: 'En README som förklarar ett projekt för en främling.',
    goals: [
      'Vad är projektet? Hur startar man det? Vem gjorde det?',
      'Skriv det rad för rad med echo och >>.',
      'Committa och pusha.',
    ],
  },
  {
    id: 'idea-git-riktig',
    track: 'github',
    emoji: '🌍',
    title: 'På riktigt',
    summary: 'Gör samma sak på riktiga GitHub.',
    goals: [
      'Skapa ett konto på github.com och ett nytt repo.',
      'Installera Git på din dator och gör kommandona från banan i en riktig terminal.',
      'Se dina commits på GitHub.',
    ],
  },

  // Bana 8: arbetsflödet
  {
    id: 'idea-git-pr',
    track: 'arbetsflode',
    emoji: '📨',
    title: 'Din första pull request',
    summary: 'Gör en pull request på riktiga GitHub.',
    goals: [
      'Gör en gren i ditt eget repo på github.com och pusha den.',
      'Öppna en pull request och skriv vad ändringen gör.',
      'Granska den själv och slå ihop den.',
    ],
  },
  {
    id: 'idea-git-historik',
    track: 'arbetsflode',
    emoji: '🗞️',
    title: 'En historik som går att läsa',
    summary: 'Bygg ett litet projekt med bara bra commit-meddelanden.',
    goals: [
      'Minst fem commits som gör en sak var.',
      'Varje meddelande börjar med ett verb: Lägg till, Rätta, Ta bort …',
      'Läs git log --oneline. Förstår en främling vad som hänt?',
    ],
  },
  {
    id: 'idea-git-revert',
    track: 'arbetsflode',
    emoji: '↪️',
    title: 'Ångra en gammal commit',
    summary: 'revert fungerar på vilken commit som helst.',
    goals: [
      'Gör tre commits som ändrar olika filer.',
      'Ångra den mittersta med git revert och dess id från git log --oneline.',
      'Kolla att de andra ändringarna finns kvar.',
    ],
  },
];

export function ideaStarterCode(idea) {
  if (!idea) return '# Prova vad du vill: pwd, ls, mkdir, git init …\n';
  return `# ${idea.emoji} ${idea.title}\n${idea.goals.map((goal, index) => `# ${index + 1}. ${goal}`).join('\n')}\n`;
}
