// Bana 4: ändringar. Se vad som ändrats, ångra, hoppa över staging,
// håll hemligheter och skräp utanför Git och ta bort filer.
const START = '# Skriv kommandona här, ett per rad\n';
const REPO =
  'mkdir hemsida\ncd hemsida\ngit init\necho "<h1>Hej</h1>" > index.html\necho "h1 { color: blue; }" > style.css\ngit add .\ngit commit -m "Första versionen"';

export const ANDRINGAR = [
  {
    id: 'git-31',
    track: 'andringar',
    title: 'Vad ändrades? git diff',
    xp: 10,
    description: 'Innan du committar: titta på exakt vad du har ändrat.',
    explain:
      '`git diff` visar skillnaden mellan filerna nu och det som senast lades till. Rader med `+` är nya och rader med `-` är borttagna. Rader utan tecken är oförändrade och visas för sammanhanget.\n\nDet är det bästa sättet att upptäcka en ändring du inte menade att göra.',
    example: 'git diff',
    task: 'Uppgift: Lägg till raden `<p>Välkommen</p>` sist i `index.html` och titta på ändringen med `git diff`.',
    setup: REPO,
    setupNote: '📁 Du står i repot hemsida, med en commit.',
    starterCode: START,
    solution: 'echo "<p>Välkommen</p>" >> index.html\ngit diff\n',
    hints: [
      'echo med >> lägger till sist.',
      'git diff visar ändringen.',
      'Leta efter raden som börjar med +.',
    ],
    tests: [
      { description: 'diff visar den nya raden', output: '+<p>Välkommen</p>' },
    ],
  },
  {
    id: 'git-32',
    track: 'andringar',
    title: 'Det som ska med: diff --staged',
    xp: 10,
    description:
      'Efter git add syns ändringen inte i git diff längre. Var tog den vägen?',
    explain:
      'Vanlig `git diff` visar bara det som **inte** är tillagt än. `git diff --staged` visar det som är tillagt och kommer med i nästa commit.\n\nKör den precis innan du committar, så vet du vad commiten innehåller.',
    example: 'git add index.html\ngit diff --staged',
    task: 'Uppgift: Byt färg i `style.css` till `red` (skriv över filen med `h1 { color: red; }`), lägg till den och visa vad som ska med med `git diff --staged`.',
    setup: REPO,
    setupNote: '📁 style.css innehåller h1 { color: blue; }.',
    starterCode: START,
    solution:
      'echo "h1 { color: red; }" > style.css\ngit add style.css\ngit diff --staged\n',
    hints: [
      'echo "h1 { color: red; }" > style.css',
      'git add style.css',
      'git diff --staged',
    ],
    tests: [
      { description: 'Visar den gamla raden', output: '-h1 { color: blue; }' },
      { description: 'och den nya', output: '+h1 { color: red; }' },
      { description: 'style.css är tillagd', staged: ['style.css'] },
    ],
  },
  {
    id: 'git-33',
    track: 'andringar',
    title: 'Ångra: git restore',
    xp: 15,
    description:
      'Du har förstört en fil. Ta tillbaka den som den var vid senaste commit.',
    explain:
      '`git restore fil` ställer tillbaka filen som den var senast den committades (eller lades till). Ändringen du gjorde försvinner – så var säker.\n\nDet här är en av de stora fördelarna med Git: du kan alltid ångra.',
    example: 'git restore index.html',
    task: 'Uppgift: `index.html` har råkat skrivas över. Kolla med `cat`, ställ tillbaka den med `git restore` och kolla igen.',
    setup: `${REPO}\necho "oj" > index.html`,
    setupNote: '📄 index.html innehåller bara "oj".',
    starterCode: START,
    solution: 'cat index.html\ngit restore index.html\ncat index.html\n',
    hints: [
      'cat index.html visar det trasiga.',
      'git restore index.html',
      'cat igen.',
    ],
    tests: [
      {
        description: 'index.html är som förut',
        file: 'index.html',
        content: '<h1>Hej</h1>',
      },
      { description: 'Inget ändrat kvar', clean: true },
    ],
  },
  {
    id: 'git-34',
    track: 'andringar',
    title: 'Ångra git add: restore --staged',
    xp: 15,
    description:
      'Du lade till en fil som inte skulle med. Ta bort den från nästa commit – utan att förlora den.',
    explain:
      '`git restore --staged fil` tar bort filen från det som ska med i nästa commit. **Filen och dina ändringar finns kvar** – den är bara inte tillagd längre.\n\n`git status` föreslår själv kommandot under _Changes to be committed_.',
    example: 'git restore --staged anteckningar.txt',
    task: 'Uppgift: Du har råkat lägga till både `style.css` och `anteckningar.txt`. Ta bort `anteckningar.txt` från det som ska med, och committa bara `style.css` med `Byt färg`.',
    setup: `${REPO}\necho "h1 { color: red; }" > style.css\necho "privat" > anteckningar.txt\ngit add .`,
    setupNote: '📁 Både style.css och anteckningar.txt är tillagda.',
    starterCode: START,
    solution:
      'git restore --staged anteckningar.txt\ngit commit -m "Byt färg"\n',
    hints: [
      'git restore --staged anteckningar.txt',
      'Kolla med git status.',
      'git commit -m "Byt färg"',
    ],
    tests: [
      { description: 'Commiten heter Byt färg', message: 'Byt färg' },
      {
        description: 'anteckningar.txt kom inte med',
        tracked: ['index.html', 'style.css'],
      },
      {
        description: 'anteckningar.txt finns kvar',
        file: 'anteckningar.txt',
        content: 'privat',
      },
    ],
  },
  {
    id: 'git-35',
    track: 'andringar',
    title: 'Genväg: commit -am',
    xp: 10,
    description: 'Lägg till och committa alla ändrade filer med ett kommando.',
    explain:
      '`git commit -am "Meddelande"` gör `git add` på alla filer som Git **redan följer** och committar dem.\n\nSe upp: helt nya filer kommer inte med. Dem måste du fortfarande lägga till med `git add`.',
    example: 'git commit -am "Rätta stavfel"',
    task: 'Uppgift: Du har ändrat både `index.html` och `style.css`. Committa båda med `git commit -am` och meddelandet `Uppdatera rubriken`.',
    setup: `${REPO}\necho "<h1>Hej då</h1>" > index.html\necho "h1 { color: green; }" > style.css`,
    setupNote: '📁 index.html och style.css är ändrade.',
    starterCode: START,
    solution: 'git commit -am "Uppdatera rubriken"\n',
    hints: [
      '-a lägger till ändrade filer, -m är meddelandet.',
      'De kan skrivas ihop: -am',
      'git commit -am "Uppdatera rubriken"',
    ],
    tests: [
      { description: 'Två commits', commits: 2 },
      { description: 'Meddelandet', message: 'Uppdatera rubriken' },
      { description: 'Inget kvar', clean: true },
    ],
    sourceChecks: [
      { description: 'Använder commit -am', pattern: /commit -am/ },
    ],
  },
  {
    id: 'git-36',
    track: 'andringar',
    title: 'Hemligheter: .gitignore',
    xp: 15,
    description: 'Lösenord och nycklar får aldrig hamna i Git.',
    explain:
      'En fil som heter `.gitignore` säger vilka filer Git ska låtsas inte finns. En rad per namn:\n\n```\n.env\n```\n\nNu syns `.env` inte i `git status`, och `git add .` tar inte med den. Det som en gång är committat finns kvar i historiken för alltid – därför ska `.gitignore` på plats **innan**.',
    example: 'echo ".env" > .gitignore',
    task: 'Uppgift: `.env` innehåller ett lösenord. Skapa `.gitignore` med raden `.env`, och committa allt annat med `git add .` och meddelandet `Lägg till .gitignore`.',
    setup: `${REPO}\necho "LOSENORD=hemligt123" > .env`,
    setupNote: '🔑 .env innehåller ett lösenord och är inte committad.',
    starterCode: START,
    solution:
      'echo ".env" > .gitignore\ngit add .\ngit commit -m "Lägg till .gitignore"\n',
    hints: [
      'echo ".env" > .gitignore',
      'git add . tar inte med .env nu.',
      'git commit -m "Lägg till .gitignore"',
    ],
    tests: [
      {
        description: '.env är inte med i Git',
        tracked: ['.gitignore', 'index.html', 'style.css'],
      },
      { description: 'Inget kvar att committa', clean: true },
    ],
  },
  {
    id: 'git-37',
    track: 'andringar',
    title: 'Ignorera en hel mapp',
    xp: 10,
    description: 'Mappar som byggs automatiskt hör inte hemma i Git.',
    explain:
      'En rad som slutar med `/` ignorerar en hel mapp. `node_modules/` och `dist/` är klassiker: de kan återskapas när som helst och är ofta enorma.\n\n`*.log` ignorerar alla filer som slutar på `.log`.',
    example: 'echo "node_modules/" >> .gitignore\necho "*.log" >> .gitignore',
    task: 'Uppgift: Lägg till raderna `node_modules/` och `*.log` i `.gitignore`. Committa sedan allt med `git add .` och `Ignorera byggfiler`.',
    setup: `${REPO}\necho ".env" > .gitignore\ngit add .\ngit commit -m "Lägg till .gitignore"\nmkdir node_modules\ntouch node_modules/paket.js fel.log app.js`,
    setupNote: '📁 Det finns node_modules, fel.log och en ny app.js.',
    starterCode: START,
    solution:
      'echo "node_modules/" >> .gitignore\necho "*.log" >> .gitignore\ngit add .\ngit commit -m "Ignorera byggfiler"\n',
    hints: [
      '>> lägger till rader i .gitignore.',
      'node_modules/ med snedstreck, *.log med stjärna.',
      'git add . och committa.',
    ],
    tests: [
      {
        description: 'Bara rätt filer i Git',
        tracked: ['.gitignore', 'app.js', 'index.html', 'style.css'],
      },
      { description: 'Inget kvar', clean: true },
    ],
  },
  {
    id: 'git-38',
    track: 'andringar',
    title: 'Ta bort en fil: git rm',
    xp: 10,
    description: 'Ta bort en fil både från mappen och från Git.',
    explain:
      '`git rm fil` tar bort filen och lägger till borttagningen i nästa commit, på en gång. (Du kan också använda vanlig `rm` och sedan `git add`.)\n\nFilen finns fortfarande kvar i historiken: gamla commits innehåller den.',
    example: 'git rm gammal.html\ngit commit -m "Ta bort gammal sida"',
    task: 'Uppgift: Ta bort `gammal.html` med `git rm` och committa med `Ta bort gammal sida`.',
    setup: `${REPO}\ntouch gammal.html\ngit add .\ngit commit -m "Lägg till gammal sida"`,
    setupNote: '📁 gammal.html är committad.',
    starterCode: START,
    solution: 'git rm gammal.html\ngit commit -m "Ta bort gammal sida"\n',
    hints: [
      'git rm gammal.html',
      'Sedan en commit.',
      'git commit -m "Ta bort gammal sida"',
    ],
    tests: [
      { description: 'Filen är borta', missing: 'gammal.html' },
      {
        description: 'Git följer den inte längre',
        tracked: ['index.html', 'style.css'],
      },
      { description: 'Commiten', message: 'Ta bort gammal sida' },
    ],
  },
  {
    id: 'git-39',
    track: 'andringar',
    title: 'Glömt .gitignore? rm --cached',
    xp: 20,
    description:
      '.env råkade bli committad. Sluta följa den, men behåll filen.',
    explain:
      'En `.gitignore` påverkar inte filer som Git redan följer. `git rm --cached fil` slutar följa filen **men låter den ligga kvar** i mappen.\n\nLösenordet finns ändå kvar i den gamla commiten. I verkligheten byter man därför också lösenordet.',
    example: 'git rm --cached .env\necho ".env" > .gitignore',
    task: 'Uppgift: Sluta följa `.env` med `git rm --cached`, skapa `.gitignore` med raden `.env`, lägg till den och committa med `Sluta följa .env`.',
    setup: `${REPO}\necho "LOSENORD=hemligt123" > .env\ngit add .\ngit commit -m "Lägg till inställningar"`,
    setupNote: '😬 .env med lösenordet är committad.',
    starterCode: START,
    solution:
      'git rm --cached .env\necho ".env" > .gitignore\ngit add .gitignore\ngit commit -m "Sluta följa .env"\n',
    hints: [
      'git rm --cached .env',
      'echo ".env" > .gitignore och git add .gitignore',
      'git commit -m "Sluta följa .env"',
    ],
    tests: [
      {
        description: 'Git följer inte .env',
        tracked: ['.gitignore', 'index.html', 'style.css'],
      },
      { description: '.env finns kvar i mappen', exists: '.env' },
      { description: 'Inget kvar', clean: true },
    ],
    sourceChecks: [{ description: 'Använder --cached', pattern: /--cached/ }],
  },
];
