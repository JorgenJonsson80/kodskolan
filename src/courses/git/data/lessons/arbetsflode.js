// Bana 8: arbetsflödet. Så jobbar man i ett team: en gren per ändring,
// pull requests på GitHub, håll grenen uppdaterad och ångra med revert.
const START = '# Skriv kommandona här, ett per rad\n';
const URL = 'https://github.com/team/hemsida';
const PUBLISHED = `mkdir hemsida\ncd hemsida\ngit init\necho "<h1>Hej</h1>" > index.html\necho "<a href='kontkat.html'>Kontakt</a>" > meny.html\ngit add .\ngit commit -m "Första versionen"\ngit remote add origin ${URL}\ngit push -u origin main`;
// Någon annan i teamet pushar en ny fil till main.
const TEAM_PUSHES = `cd ..\ngit clone ${URL} kollega\ncd kollega\necho "<h1>Om oss</h1>" > om.html\ngit add .\ngit commit -m "Lägg till om-sidan"\ngit push\ncd ..\nrm -r kollega\ncd hemsida`;

export const ARBETSFLODE = [
  {
    id: 'git-71',
    track: 'arbetsflode',
    title: 'En gren per ändring',
    xp: 15,
    description:
      'I ett team committar ingen direkt på main. Varje ändring får en egen gren.',
    explain:
      'Så här ser det ut nästan överallt:\n\n1. Skapa en gren för ändringen, med ett namn som säger vad den gör.\n2. Gör ändringen och committa.\n3. Pusha grenen.\n\nmain är alltid den fungerande versionen. Det som är halvklart lever på grenar.',
    example:
      'git switch -c rätta-länken\n# … ändra och committa …\ngit push -u origin rätta-länken',
    task: `Uppgift: Länken i \`meny.html\` är felstavad. Skapa grenen \`ratta-lanken\`, skriv om filen med \`<a href='kontakt.html'>Kontakt</a>\`, committa med \`Rätta länken till kontaktsidan\` och pusha grenen.`,
    setup: PUBLISHED,
    setupNote:
      '📁 hemsida är pushad till GitHub. meny.html har en felstavad länk.',
    starterCode: START,
    solution: `git switch -c ratta-lanken\necho "<a href='kontakt.html'>Kontakt</a>" > meny.html\ngit commit -am "Rätta länken till kontaktsidan"\ngit push -u origin ratta-lanken\n`,
    hints: [
      'git switch -c ratta-lanken',
      'Skriv om meny.html med echo och committa med -am.',
      'git push -u origin ratta-lanken',
    ],
    tests: [
      {
        description: 'Länken är rättad',
        file: 'meny.html',
        content: "<a href='kontakt.html'>Kontakt</a>",
      },
      { description: 'Du står på grenen', branch: 'ratta-lanken' },
      { description: 'Grenen är pushad', pushed: true },
    ],
  },
  {
    id: 'git-72',
    track: 'arbetsflode',
    title: 'Pull request',
    xp: 15,
    description: 'Grenen är pushad. Nu ber du teamet att ta in den i main.',
    explain:
      'En **pull request** (PR) är en förfrågan på GitHub: "Kan ni ta in min gren i main?". Där kan andra läsa ändringen, kommentera och godkänna. Sedan trycker någon på **Merge** – och GitHub gör `git merge` åt er.\n\nPå GitHub dyker knappen _Compare & pull request_ upp direkt efter att du pushat en gren. Här i kursen sköts den delen på låtsas.',
    example: 'git push -u origin ny-meny\n# Öppna PR:en på github.com',
    task: 'Uppgift: Skapa grenen `ny-meny`, lägg till länken `<a href="om.html">Om oss</a>` sist i `meny.html`, committa med `Lägg till Om oss i menyn` och pusha grenen så att den kan bli en pull request.',
    setup: PUBLISHED,
    setupNote: '📁 hemsida är pushad till GitHub.',
    starterCode: START,
    solution:
      'git switch -c ny-meny\necho \'<a href="om.html">Om oss</a>\' >> meny.html\ngit commit -am "Lägg till Om oss i menyn"\ngit push -u origin ny-meny\n',
    hints: [
      'Samma flöde: gren, ändring, commit, push.',
      'Med enkla citattecken runt texten går " att ha inuti.',
      'git push -u origin ny-meny',
    ],
    tests: [
      { description: 'Grenen är pushad', pushed: true },
      { description: 'Meddelandet', message: 'Lägg till Om oss i menyn' },
    ],
  },
  {
    id: 'git-73',
    track: 'arbetsflode',
    title: 'Efter pull requesten',
    xp: 15,
    description:
      'Din PR är godkänd och ihopslagen på GitHub. Städa upp hos dig.',
    explain:
      'När PR:en är ihopslagen finns ändringen i main **på GitHub** – men inte hos dig än. Byt till main, hämta med `git pull`, och ta bort grenen som är klar:\n\n```\ngit switch main\ngit pull\ngit branch -d min-gren\n```',
    example: 'git switch main\ngit pull\ngit branch -d ratta-lanken',
    task: 'Uppgift: Grenen `ratta-lanken` är ihopslagen i main på GitHub. Byt till main, hämta, och ta bort grenen.',
    setup: `${PUBLISHED}\ngit switch -c ratta-lanken\necho "<a href='kontakt.html'>Kontakt</a>" > meny.html\ngit commit -am "Rätta länken"\ngit push -u origin ratta-lanken\ncd ..\ngit clone ${URL} granskare\ncd granskare\ngit pull origin ratta-lanken\ngit push\ncd ..\nrm -r granskare\ncd hemsida`,
    setupNote:
      '✅ PR:en för ratta-lanken är ihopslagen på GitHub. Du står kvar på grenen.',
    starterCode: START,
    solution: 'git switch main\ngit pull\ngit branch -d ratta-lanken\n',
    hints: [
      'git switch main',
      'git pull hämtar den ihopslagna ändringen.',
      'git branch -d ratta-lanken',
    ],
    tests: [
      { description: 'Du står på main', branch: 'main' },
      {
        description: 'main har rättelsen',
        file: 'meny.html',
        content: "<a href='kontakt.html'>Kontakt</a>",
      },
      { description: 'Grenen är borttagen', branches: ['main'] },
    ],
  },
  {
    id: 'git-74',
    track: 'arbetsflode',
    title: 'Håll grenen uppdaterad',
    xp: 20,
    description:
      'Medan du jobbade har en kollega lagt till något i main. Ta in det i din gren.',
    explain:
      '`git pull origin main` hämtar main från GitHub och slår ihop den med **grenen du står på**. Då jobbar du mot det senaste, och eventuella konflikter löser du på din gren – inte i main.',
    example: 'git pull origin main',
    task: 'Uppgift: Du står på grenen `galleri`. Hämta kollegans nya main in i din gren, och lista filerna.',
    setup: `${PUBLISHED}\ngit switch -c galleri\ntouch galleri.html\ngit add .\ngit commit -m "Lägg till galleri"\n${TEAM_PUSHES}`,
    setupNote:
      '📁 Du står på galleri. En kollega har pushat om.html till main.',
    starterCode: START,
    solution: 'git pull origin main\nls\n',
    hints: [
      'git pull med fjärr och gren.',
      'git pull origin main',
      'ls visar om.html.',
    ],
    tests: [
      { description: 'om.html kom in i din gren', exists: 'om.html' },
      { description: 'Du står kvar på galleri', branch: 'galleri' },
    ],
  },
  {
    id: 'git-75',
    track: 'arbetsflode',
    title: 'Ångra en pushad commit: git revert',
    xp: 20,
    description:
      'Du har pushat en commit som förstörde sidan. Ångra den – utan att skriva om historiken.',
    explain:
      'När en commit redan finns på GitHub får du inte bara ta bort den – andra kan redan ha hämtat den. `git revert` gör i stället en **ny commit** som tar tillbaka ändringen:\n\n```\ngit revert HEAD\n```\n\n`HEAD` betyder senaste commit. Historiken visar både misstaget och rättelsen – ärligt och säkert.',
    example: 'git revert HEAD\ngit push',
    task: 'Uppgift: Senaste commiten tömde `index.html`. Ångra den med `git revert HEAD` och pusha.',
    setup: `${PUBLISHED}\necho "" > index.html\ngit commit -am "Uppdatera startsidan"\ngit push`,
    setupNote: '😬 Senaste commiten, redan pushad, förstörde index.html.',
    starterCode: START,
    solution: 'git revert HEAD\ngit push\n',
    hints: [
      'git revert följt av vilken commit.',
      'HEAD är den senaste.',
      'git revert HEAD och git push',
    ],
    tests: [
      {
        description: 'index.html är tillbaka',
        file: 'index.html',
        content: '<h1>Hej</h1>',
      },
      {
        description: 'Ångringen är en egen commit',
        message: 'Revert "Uppdatera startsidan"',
      },
      { description: 'Den är pushad', pushed: true },
    ],
  },
  {
    id: 'git-76',
    track: 'arbetsflode',
    title: 'Titta innan du committar',
    xp: 15,
    description: 'Proffsens vana: status, diff, och sedan commit.',
    explain:
      'Innan varje commit:\n\n1. `git status` – vilka filer har ändrats?\n2. `git diff` – är ändringarna de du menade?\n3. `git add` och `git commit`.\n\nDet tar tio sekunder och räddar dig från att committa testkod, lösenord eller en fil du glömt.',
    example: 'git status\ngit diff\ngit commit -am "…"',
    task: 'Uppgift: Kör `git status` och `git diff`, och committa sedan ändringen i `index.html` med `Byt rubrik`.',
    setup: `${PUBLISHED}\necho "<h1>Välkommen</h1>" > index.html`,
    setupNote: '📁 index.html är ändrad.',
    starterCode: START,
    solution: 'git status\ngit diff\ngit commit -am "Byt rubrik"\n',
    hints: [
      'git status först.',
      'git diff visar ändringen.',
      'git commit -am "Byt rubrik"',
    ],
    tests: [
      { description: 'status kördes', output: 'modified:   index.html' },
      { description: 'diff kördes', output: '+<h1>Välkommen</h1>' },
      { description: 'Commiten', message: 'Byt rubrik' },
    ],
  },
  {
    id: 'git-77',
    track: 'arbetsflode',
    title: 'Små steg, en push',
    xp: 15,
    description: 'Committa ofta, i små steg. Pusha när det hänger ihop.',
    explain:
      'Små commits är lätta att förstå och lätta att ångra. Du behöver inte pusha efter varje – en push skickar alla commits som inte finns på GitHub än.',
    example: 'git commit -am "Steg 1"\ngit commit -am "Steg 2"\ngit push',
    task: 'Uppgift: Gör två commits: först `footer.html` (tom fil) med `Lägg till footer`, sedan raden `<p>© 2026</p>` i den med `Skriv copyright`. Pusha båda med en push.',
    setup: PUBLISHED,
    setupNote: '📁 hemsida är pushad.',
    starterCode: START,
    solution:
      'touch footer.html\ngit add footer.html\ngit commit -m "Lägg till footer"\necho "<p>© 2026</p>" > footer.html\ngit commit -am "Skriv copyright"\ngit push\n',
    hints: [
      'Första commiten: touch, add och commit.',
      'Andra: echo > och commit -am.',
      'En git push sist.',
    ],
    tests: [
      { description: 'Tre commits', commits: 3 },
      { description: 'Senaste', message: 'Skriv copyright' },
      { description: 'Allt är pushat', pushed: true },
    ],
  },
  {
    id: 'git-78',
    track: 'arbetsflode',
    title: 'Vad har teamet gjort?',
    xp: 10,
    description: 'Börja dagen med att hämta och titta i historiken.',
    explain:
      '`git pull` följt av `git log --oneline` visar vad som hänt sedan sist. Det är ett bra sätt att börja arbetsdagen – och att se om någon ändrat något du ska jobba med.',
    example: 'git pull\ngit log --oneline',
    task: 'Uppgift: Hämta det senaste på main och visa historiken med `git log --oneline`.',
    setup: `${PUBLISHED}\n${TEAM_PUSHES}`,
    setupNote: '📁 En kollega har pushat en ny commit till main.',
    starterCode: START,
    solution: 'git pull\ngit log --oneline\n',
    hints: ['git pull', 'git log --oneline', 'Leta efter kollegans commit.'],
    tests: [
      { description: 'Kollegans commit syns', output: 'Lägg till om-sidan' },
      { description: 'om.html finns', exists: 'om.html' },
    ],
  },
  {
    id: 'git-79',
    track: 'arbetsflode',
    title: 'Hela vägen i ett team',
    xp: 20,
    description: 'Allt på en gång: uppdatera, gren, ändring, push.',
    explain:
      'Så ser en vanlig ändring ut från början till slut:\n\n```\ngit switch main\ngit pull\ngit switch -c min-andring\n# ändra och committa\ngit push -u origin min-andring\n```\n\nSedan en pull request – och när den är ihopslagen: `git switch main`, `git pull`, `git branch -d min-andring`.',
    example: 'git pull\ngit switch -c ny',
    task: 'Uppgift: Hämta det senaste på main, skapa grenen `bilder`, lägg till `bilder.html` (tom), committa med `Lägg till bildsida` och pusha grenen.',
    setup: `${PUBLISHED}\n${TEAM_PUSHES}`,
    setupNote: '📁 Du står på main, som inte är uppdaterad.',
    starterCode: START,
    solution:
      'git pull\ngit switch -c bilder\ntouch bilder.html\ngit add .\ngit commit -m "Lägg till bildsida"\ngit push -u origin bilder\n',
    hints: [
      'git pull först.',
      'git switch -c bilder och committa.',
      'git push -u origin bilder',
    ],
    tests: [
      { description: 'Grenen har kollegans om.html', exists: 'om.html' },
      { description: 'Grenen är pushad', pushed: true },
      { description: 'Du står på bilder', branch: 'bilder' },
    ],
  },
];
