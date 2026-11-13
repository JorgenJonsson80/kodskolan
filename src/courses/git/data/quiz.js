// Testa dig förbi: fyra frågor per bana. Det första svaret är det rätta
// (Quiz.jsx blandar dem).
export const QUIZ = {
  terminal: [
    {
      question: 'Du står i /hem/skola. Vad skriver pwd ut efter cd ..?',
      options: ['/hem', '/hem/skola', '/', '..'],
      explain: '.. är mappen ovanför, alltså /hem.',
    },
    {
      question: 'Vad gör echo "Hej" > fil.txt om fil.txt redan finns?',
      options: [
        'Skriver över filen så att bara Hej står där',
        'Lägger till Hej sist i filen',
        'Ger ett fel',
        'Skapar en fil till',
      ],
      explain: '> skriver över. >> lägger till sist.',
    },
    {
      question: 'Vilket kommando visar vad som finns i mappen du står i?',
      options: ['ls', 'pwd', 'cat', 'cd'],
      explain: 'ls listar filer och mappar. pwd visar var du står.',
    },
    {
      question: 'Vad betyder ~ i en sökväg?',
      options: [
        'Din hemmapp',
        'Mappen ovanför',
        'Mappen du står i',
        'Den översta mappen',
      ],
      explain: '~ är hemmappen, var du än står. .. är mappen ovanför.',
    },
  ],
  filer: [
    {
      question: 'Hur döper du om a.txt till b.txt?',
      options: [
        'mv a.txt b.txt',
        'cp a.txt b.txt',
        'rename a.txt b.txt',
        'rm a.txt b.txt',
      ],
      explain:
        'mv flyttar filen till ett nytt namn. cp skulle göra en kopia och låta a.txt vara kvar.',
    },
    {
      question: 'Varför ger rm mapp ett fel?',
      options: [
        'Mappar måste tas bort med rm -r',
        'Mappen är tom',
        'rm fungerar bara på dolda filer',
        'Mappen måste heta något med punkt',
      ],
      explain:
        'rm tar inte bort mappar för säkerhets skull. -r tar bort mappen med allt i den.',
    },
    {
      question: 'Vilken fil syns inte med vanlig ls?',
      options: ['.gitignore', 'index.html', 'README.md', 'style.css'],
      explain: 'Namn som börjar med punkt är dolda. ls -a visar dem.',
    },
    {
      question: 'Vad gör mkdir -p a/b/c när a inte finns?',
      options: [
        'Skapar a, b och c',
        'Ger ett fel',
        'Skapar bara c',
        'Skapar a och stannar',
      ],
      explain: '-p skapar alla mappar som fattas på vägen.',
    },
  ],
  commit: [
    {
      question: 'I vilken ordning sparar du en version?',
      options: [
        'git add, sedan git commit',
        'git commit, sedan git add',
        'git init varje gång',
        'git log, sedan git commit',
      ],
      explain:
        'Först väljer du vad som ska med (add), sedan sparar du (commit).',
    },
    {
      question: 'Vad betyder Untracked files i git status?',
      options: [
        'Filer som Git inte följer än',
        'Filer som är borttagna',
        'Filer som är committade',
        'Dolda filer',
      ],
      explain: 'Git följer bara filer du lagt till med git add.',
    },
    {
      question: 'Vilket commit-meddelande är bäst?',
      options: ['Lägg till kontaktformulär', 'fix', 'ändringar', 'asdf'],
      explain:
        'Ett bra meddelande säger vad commiten gör, kort, som en uppmaning.',
    },
    {
      question: 'Hur ofta kör du git init i ett projekt?',
      options: [
        'En gång, i början',
        'Före varje commit',
        'Varje dag',
        'Aldrig',
      ],
      explain: 'git init gör mappen till ett repo. Det räcker en gång.',
    },
  ],
  andringar: [
    {
      question: 'Vad betyder en rad som börjar med + i git diff?',
      options: [
        'En ny rad',
        'En borttagen rad',
        'En oförändrad rad',
        'En konflikt',
      ],
      explain: '+ är tillagt och - är borttaget.',
    },
    {
      question:
        'Du lade till fel fil med git add. Hur ångrar du det utan att förlora ändringarna?',
      options: [
        'git restore --staged fil',
        'git restore fil',
        'rm fil',
        'git commit -m "ångra"',
      ],
      explain:
        'restore --staged tar bort filen från nästa commit men låter ändringarna vara kvar.',
    },
    {
      question: 'Vad tar git commit -am inte med?',
      options: [
        'Helt nya filer',
        'Ändrade filer',
        'Borttagna filer som Git följer',
        'Meddelandet',
      ],
      explain: '-a lägger bara till filer som Git redan följer.',
    },
    {
      question: 'Vilken rad i .gitignore ignorerar alla loggfiler?',
      options: ['*.log', 'log', '.log/', 'logs'],
      explain:
        '* betyder "vad som helst", så *.log är alla filer som slutar på .log.',
    },
  ],
  grenar: [
    {
      question: 'Vad gör git switch -c ny?',
      options: [
        'Skapar grenen ny och byter till den',
        'Byter till grenen ny om den finns',
        'Tar bort grenen ny',
        'Slår ihop ny med main',
      ],
      explain: '-c skapar grenen först.',
    },
    {
      question: 'Du vill ta in grenen meny i main. Var ska du stå?',
      options: [
        'På main',
        'På meny',
        'Det spelar ingen roll',
        'På en tredje gren',
      ],
      explain:
        'Man står på grenen som ska få ändringarna och kör git merge med den andra.',
    },
    {
      question: 'Vad är en gren egentligen?',
      options: [
        'En etikett som pekar på en commit',
        'En kopia av alla filer',
        'En mapp i projektet',
        'En server',
      ],
      explain:
        'En gren är ett namn på en commit som flyttas fram när du committar.',
    },
    {
      question: 'Vad betyder Fast-forward?',
      options: [
        'main flyttades fram utan merge-commit',
        'Det blev en konflikt',
        'Grenen togs bort',
        'Allt ångrades',
      ],
      explain:
        'Har main inte ändrats sedan grenen skapades räcker det att flytta fram main.',
    },
  ],
  konflikter: [
    {
      question: 'Vad står mellan <<<<<<< HEAD och =======?',
      options: [
        'Din version, från grenen du står på',
        'Den andra grenens version',
        'Den gamla versionen',
        'Git:s förslag',
      ],
      explain:
        'HEAD är där du står. Efter ======= kommer den andra grenens version.',
    },
    {
      question: 'Hur säger du till Git att en konflikt är lagad?',
      options: [
        'git add på filen',
        'git merge igen',
        'git restore',
        'git status',
      ],
      explain: 'git add markerar filen som lagad, sedan committar du.',
    },
    {
      question: 'När blir det en konflikt?',
      options: [
        'När två grenar ändrat samma rad olika',
        'Varje gång man slår ihop',
        'När två grenar ändrat olika filer',
        'När man glömt git status',
      ],
      explain: 'Olika filer och olika rader slår Git ihop själv.',
    },
    {
      question: 'Vad ska bort när du lagar en konflikt?',
      options: [
        'Markeringarna <<<<<<<, ======= och >>>>>>>',
        'Hela filen',
        'Grenen',
        'Alla commits',
      ],
      explain: 'Filen ska se ut som den ska, utan Gits markeringar.',
    },
  ],
  github: [
    {
      question: 'Vad gör git clone?',
      options: [
        'Hämtar ett helt repo med historik till en ny mapp',
        'Skickar dina commits till GitHub',
        'Kopierar en fil',
        'Skapar en ny gren',
      ],
      explain: 'clone hämtar allt, och kopplar origin åt dig.',
    },
    {
      question: 'Din push nekas med "fetch first". Vad gör du?',
      options: [
        'git pull, sedan git push',
        'git push igen',
        'git clone igen',
        'Ta bort repot',
      ],
      explain: 'GitHub har commits du inte har. Hämta dem först.',
    },
    {
      question: 'Vad betyder -u i git push -u origin main?',
      options: [
        'Kom ihåg kopplingen, så att git push räcker nästa gång',
        'Pusha bara uppdateringar',
        'Tvinga igenom pushen',
        'Ångra senaste push',
      ],
      explain: '-u sätter upstream: grenen kopplas till origin/main.',
    },
    {
      question: 'Vad heter fjärren nästan alltid?',
      options: ['origin', 'main', 'github', 'remote'],
      explain: 'origin är standardnamnet på repot du klonade eller kopplade.',
    },
  ],
  arbetsflode: [
    {
      question: 'Vad är en pull request?',
      options: [
        'En förfrågan på GitHub om att ta in en gren i main',
        'Ett annat namn för git pull',
        'En gren som heter pull',
        'En kopia av repot',
      ],
      explain: 'I en PR kan teamet läsa, kommentera och sedan slå ihop grenen.',
    },
    {
      question: 'En dålig commit är redan pushad. Hur ångrar du den säkrast?',
      options: [
        'git revert',
        'Ta bort repot och börja om',
        'git restore',
        'git branch -d main',
      ],
      explain:
        'revert gör en ny commit som tar tillbaka ändringen, utan att skriva om historiken.',
    },
    {
      question: 'Var ska halvfärdiga ändringar ligga?',
      options: [
        'På en egen gren',
        'På main',
        'I en zip-fil',
        'Bara på din dator utan Git',
      ],
      explain: 'main ska alltid fungera. Det halvklara bor på grenar.',
    },
    {
      question: 'Din PR är ihopslagen på GitHub. Vad gör du hos dig?',
      options: [
        'git switch main, git pull och git branch -d grenen',
        'git push igen',
        'git merge main',
        'Ingenting',
      ],
      explain: 'Hämta den nya main och ta bort grenen som är klar.',
    },
  ],
};
