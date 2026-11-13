// Bana 3: din första commit. Git i ett eget projekt: init, status, add,
// commit och log.
const START = '# Skriv kommandona här, ett per rad\n';
const REPO =
  'mkdir hemsida\ncd hemsida\ngit init\necho "<h1>Hej</h1>" > index.html';
const COMMITTED = `${REPO}\ngit add index.html\ngit commit -m "Första versionen"`;

export const COMMIT = [
  {
    id: 'git-21',
    track: 'commit',
    title: 'Ett repo: git init',
    xp: 10,
    description:
      'Git sparar alla versioner av ditt projekt, så att du alltid kan gå tillbaka. Först måste Git börja hålla koll på mappen.',
    explain:
      '`git init` gör mappen du står i till ett **repo** (_repository_): ett projekt som Git håller koll på. Git sparar allt i en dold mapp, `.git`.\n\nDu gör det en gång per projekt, i projektets mapp.',
    example: 'cd projekt\ngit init',
    task: 'Uppgift: Gå in i `hemsida` och gör den till ett Git-repo. Lista sedan allt med `ls -a`.',
    setup: 'mkdir hemsida\necho "<h1>Hej</h1>" > hemsida/index.html',
    setupNote: '📁 Mappen hemsida finns, med index.html.',
    starterCode: START,
    solution: 'cd hemsida\ngit init\nls -a\n',
    hints: [
      'cd hemsida först.',
      'git init',
      'ls -a visar den dolda mappen .git.',
    ],
    tests: [
      { description: 'hemsida är ett repo', exists: '/hem/hemsida/.git' },
      { description: 'ls -a visar .git', output: '.  ..  .git  index.html' },
    ],
  },
  {
    id: 'git-22',
    track: 'commit',
    title: 'Vad ser Git? git status',
    xp: 10,
    description: 'git status är kommandot du kommer att skriva oftast.',
    explain:
      '`git status` berättar vad Git ser just nu. **Untracked files** är filer som Git inte följer än – de kommer inte med i någon version förrän du säger till.\n\nGit svarar på engelska, som överallt där du kommer att använda det. Läs svaret: det föreslår ofta nästa steg.',
    example: 'git status',
    task: 'Uppgift: Kör `git status` och se vad Git säger om `index.html`.',
    setup: REPO,
    setupNote: '📁 Du står i repot hemsida, med en ny index.html.',
    starterCode: START,
    solution: 'git status\n',
    hints: ['Två ord.', 'git följt av status.', 'git status'],
    tests: [
      {
        description: 'status visar att index.html är ny',
        output: 'Untracked files:',
      },
      {
        description: 'och att inget är committat än',
        output: 'No commits yet',
      },
    ],
  },
  {
    id: 'git-23',
    track: 'commit',
    title: 'Välj vad som ska med: git add',
    xp: 10,
    description: 'Innan du sparar en version väljer du vad som ska ingå.',
    explain:
      '`git add index.html` lägger filen i **staging area** – en plats där du samlar det som ska med i nästa version.\n\nDet låter krångligt, men det gör att du kan spara en sak i taget även när du har ändrat flera filer. Kör `git status` efteråt: nu står filen under _Changes to be committed_.',
    example: 'git add index.html\ngit status',
    task: 'Uppgift: Lägg till `index.html` och kolla med `git status`.',
    setup: REPO,
    setupNote: '📁 Du står i repot hemsida.',
    starterCode: START,
    solution: 'git add index.html\ngit status\n',
    hints: [
      'git add följt av filnamnet.',
      'git add index.html',
      'git status efteråt.',
    ],
    tests: [
      { description: 'index.html är tillagd', staged: ['index.html'] },
      {
        description: 'status visar Changes to be committed',
        output: 'Changes to be committed:',
      },
    ],
  },
  {
    id: 'git-24',
    track: 'commit',
    title: 'Spara en version: git commit',
    xp: 15,
    description: 'Nu sparar du din första version.',
    explain:
      '`git commit -m "Meddelande"` sparar allt som är tillagt som en **commit**: en version av projektet med ett meddelande om vad du gjorde.\n\nGit svarar med ett id, t.ex. `a1b2c3d`. Det är versionens namn, och med det kan du alltid hitta tillbaka.',
    example: 'git commit -m "Lägg till startsidan"',
    task: 'Uppgift: Lägg till `index.html` och committa med meddelandet `Första versionen`.',
    setup: REPO,
    setupNote: '📁 Du står i repot hemsida.',
    starterCode: START,
    solution: 'git add index.html\ngit commit -m "Första versionen"\n',
    hints: [
      'Först git add, sedan git commit.',
      'Meddelandet efter -m, inom citattecken.',
      'git commit -m "Första versionen"',
    ],
    tests: [
      { description: 'En commit finns', commits: 1 },
      {
        description: 'Meddelandet är Första versionen',
        message: 'Första versionen',
      },
      { description: 'Inget är kvar att committa', clean: true },
    ],
  },
  {
    id: 'git-25',
    track: 'commit',
    title: 'Ändra och spara igen',
    xp: 15,
    description:
      'Varje gång du kommit en bit på vägen sparar du en ny version.',
    explain:
      'Ändrar du en fil som Git följer visar `git status` den som **modified**. Sedan är det samma två steg som förut: `git add` och `git commit`.\n\nSå jobbar man: ändra lite, committa, ändra lite till, committa igen.',
    example: 'echo "<p>Ny rad</p>" >> index.html\ngit status',
    task: 'Uppgift: Lägg till raden `<p>Välkommen!</p>` sist i `index.html`. Kolla `git status`, och committa med meddelandet `Lägg till välkomsttext`.',
    setup: COMMITTED,
    setupNote: '📁 Du står i repot hemsida, som har en commit.',
    starterCode: START,
    solution:
      'echo "<p>Välkommen!</p>" >> index.html\ngit status\ngit add index.html\ngit commit -m "Lägg till välkomsttext"\n',
    hints: [
      'echo med >> lägger till sist.',
      'git status visar modified: index.html.',
      'git add och git commit -m "Lägg till välkomsttext"',
    ],
    tests: [
      {
        description: 'status visade ändringen',
        output: 'modified:   index.html',
      },
      { description: 'Två commits', commits: 2 },
      { description: 'Senaste meddelandet', message: 'Lägg till välkomsttext' },
    ],
  },
  {
    id: 'git-26',
    track: 'commit',
    title: 'Historiken: git log',
    xp: 10,
    description: 'Se alla versioner du har sparat.',
    explain:
      '`git log` visar alla commits, den senaste först: id, vem, när och meddelandet.\n\n`git log --oneline` visar en rad per commit. `(HEAD -> main)` betyder att du står på den senaste versionen på grenen `main`.',
    example: 'git log --oneline',
    task: 'Uppgift: Visa historiken med `git log --oneline`.',
    setup: `${COMMITTED}\necho "<p>Hej</p>" >> index.html\ngit add .\ngit commit -m "Lägg till text"`,
    setupNote: '📁 Repot har två commits.',
    starterCode: START,
    solution: 'git log --oneline\n',
    hints: [
      'git log',
      'Med --oneline blir det en rad per commit.',
      'git log --oneline',
    ],
    tests: [
      {
        description: 'Visar den senaste med HEAD -> main',
        output: '(HEAD -> main) Lägg till text',
      },
      { description: 'Visar den första', output: 'Första versionen' },
    ],
  },
  {
    id: 'git-27',
    track: 'commit',
    title: 'Allt på en gång: git add .',
    xp: 10,
    description: 'Har du ändrat många filer vill du inte skriva varje namn.',
    explain:
      '`.` betyder mappen du står i. `git add .` lägger alltså till allt som ändrats här och i mapparna under.\n\nKolla alltid `git status` innan du committar, så att inget kommer med som inte ska.',
    example: 'git add .\ngit status',
    task: 'Uppgift: Lägg till alla nya filer med `git add .` och committa med meddelandet `Lägg till stil och bilder`.',
    setup: `${COMMITTED}\nmkdir bilder\ntouch style.css bilder/logga.png`,
    setupNote: '📁 Du har skapat style.css och bilder/logga.png.',
    starterCode: START,
    solution:
      'git add .\ngit status\ngit commit -m "Lägg till stil och bilder"\n',
    hints: [
      'git add .',
      'git status visar vad som kommer med.',
      'git commit -m "Lägg till stil och bilder"',
    ],
    tests: [
      {
        description: 'Git följer alla tre filerna',
        tracked: ['bilder/logga.png', 'index.html', 'style.css'],
      },
      { description: 'Inget är kvar att committa', clean: true },
    ],
    sourceChecks: [
      { description: 'Använder git add .', pattern: /git add \./ },
    ],
  },
  {
    id: 'git-28',
    track: 'commit',
    title: 'En sak i taget',
    xp: 15,
    description: 'Två ändringar som inte hör ihop blir två commits.',
    explain:
      'En bra commit gör **en sak**. Har du både rättat ett stavfel och lagt till en ny sida blir det lättare att förstå historiken – och att ångra en av dem – om de är två commits.\n\nDärför väljer man vad som ska med med `git add fil`, i stället för allt med `git add .`.',
    example: 'git add om.html\ngit commit -m "Lägg till om-sidan"',
    task: 'Uppgift: Du har ändrat `index.html` och skapat `kontakt.html`. Committa dem var för sig: först `kontakt.html` med `Lägg till kontaktsida`, sedan `index.html` med `Rätta stavfel`.',
    setup: `${COMMITTED}\necho "<h1>Hej!</h1>" > index.html\necho "<h1>Kontakt</h1>" > kontakt.html`,
    setupNote: '📁 index.html är ändrad och kontakt.html är ny.',
    starterCode: START,
    solution:
      'git add kontakt.html\ngit commit -m "Lägg till kontaktsida"\ngit add index.html\ngit commit -m "Rätta stavfel"\n',
    hints: [
      'git add kontakt.html först, och committa.',
      'Sedan git add index.html.',
      'Två commits med var sitt meddelande.',
    ],
    tests: [
      { description: 'Tre commits totalt', commits: 3 },
      { description: 'Den senaste är Rätta stavfel', message: 'Rätta stavfel' },
      {
        description: 'Den förra var Lägg till kontaktsida',
        output: 'Lägg till kontaktsida',
      },
      { description: 'Inget kvar att committa', clean: true },
    ],
  },
  {
    id: 'git-29',
    track: 'commit',
    title: 'Bra commit-meddelanden',
    xp: 10,
    description: 'Meddelandet är för dig om ett halvår – och för alla andra.',
    explain:
      'Ett bra meddelande säger **vad commiten gör**, kort, som en uppmaning: _Lägg till kontaktsida_, _Rätta länken i menyn_, _Ta bort gammal bild_.\n\n_fix_, _ändringar_ och _asdf_ säger ingenting. Tänk att meningen "Om du tar med den här commiten kommer den att …" ska fortsätta med ditt meddelande.',
    example: 'git commit -m "Gör menyn mobilvänlig"',
    task: 'Uppgift: Du har lagt till en bild i `bilder/hund.jpg`. Committa den med ett bra meddelande: `Lägg till bild på hunden`.',
    setup: `${COMMITTED}\nmkdir bilder\ntouch bilder/hund.jpg`,
    setupNote: '📁 bilder/hund.jpg är ny.',
    starterCode: START,
    solution:
      'git add bilder/hund.jpg\ngit commit -m "Lägg till bild på hunden"\n',
    hints: [
      'git add bilder/hund.jpg',
      'Meddelandet ska vara exakt Lägg till bild på hunden.',
      'git commit -m "Lägg till bild på hunden"',
    ],
    tests: [
      { description: 'Meddelandet', message: 'Lägg till bild på hunden' },
    ],
  },
];
