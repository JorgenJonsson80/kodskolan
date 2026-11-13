// Bana 7: GitHub. En låtsasserver (runner/git.js) tar emot push och
// lämnar ut clone och pull. Setup låter "någon annan" lägga upp ett repo
// genom att pusha från en mapp som sedan tas bort.
const START = '# Skriv kommandona här, ett per rad\n';
const URL = 'https://github.com/ada/recept';
const LOCAL =
  'mkdir hemsida\ncd hemsida\ngit init\necho "<h1>Hej</h1>" > index.html\ngit add .\ngit commit -m "Första versionen"';
// Ett repo som redan finns på servern, med README.md.
const ON_SERVER = `mkdir tmp\ncd tmp\ngit init\necho "# Recept" > README.md\necho "Kanelbullar" > bullar.txt\ngit add .\ngit commit -m "Första versionen"\ngit remote add origin ${URL}\ngit push origin main\ncd ..\nrm -r tmp`;
// En kompis lägger till en fil på servern.
const FRIEND_PUSHES = `git clone ${URL} kompis\ncd kompis\necho "Semlor" > semlor.txt\ngit add .\ngit commit -m "Lägg till semlor"\ngit push\ncd ..\nrm -r kompis`;

export const GITHUB = [
  {
    id: 'git-61',
    track: 'github',
    title: 'Koppla till GitHub: remote add',
    xp: 10,
    description:
      'GitHub är en webbplats där repon sparas, så att du har en kopia i molnet och kan jobba med andra.',
    explain:
      'Ett repo på GitHub kallas **remote** (fjärr). Du kopplar ditt repo till det en gång:\n\n```\ngit remote add origin https://github.com/ada/hemsida\n```\n\n`origin` är namnet på fjärren – det heter nästan alltid så. `git remote -v` visar vad repot är kopplat till.\n\n(Här är GitHub på låtsas. På riktigt skapar du först repot på github.com och kopierar adressen därifrån.)',
    example:
      'git remote add origin https://github.com/ada/projekt\ngit remote -v',
    task: 'Uppgift: Koppla repot till `https://github.com/ada/hemsida` med namnet `origin`, och visa kopplingen med `git remote -v`.',
    setup: LOCAL,
    setupNote: '📁 Du står i repot hemsida, som har en commit.',
    starterCode: START,
    solution:
      'git remote add origin https://github.com/ada/hemsida\ngit remote -v\n',
    hints: [
      'git remote add följt av namn och adress.',
      'Namnet är origin.',
      'git remote -v visar kopplingen.',
    ],
    tests: [
      {
        description: 'origin pekar på GitHub',
        output: 'origin\thttps://github.com/ada/hemsida (push)',
      },
    ],
  },
  {
    id: 'git-62',
    track: 'github',
    title: 'Skicka upp: git push',
    xp: 15,
    description: 'Lägg upp dina commits på GitHub.',
    explain:
      '`git push -u origin main` skickar grenen `main` till `origin`. `-u` kommer ihåg kopplingen, så att det räcker med `git push` nästa gång.\n\nNu finns projektet på GitHub, och andra kan se det och hämta det.',
    example: 'git push -u origin main',
    task: 'Uppgift: Skicka upp main till GitHub med `git push -u origin main`.',
    setup: `${LOCAL}\ngit remote add origin https://github.com/ada/hemsida`,
    setupNote: '📁 Repot är kopplat till https://github.com/ada/hemsida.',
    starterCode: START,
    solution: 'git push -u origin main\n',
    hints: [
      'git push',
      '-u origin main första gången.',
      'git push -u origin main',
    ],
    tests: [
      { description: 'GitHub har dina commits', pushed: true },
      {
        description: 'En ny gren skapades på servern',
        output: '* [new branch]      main -> main',
      },
    ],
  },
  {
    id: 'git-63',
    track: 'github',
    title: 'Nästa gång: bara git push',
    xp: 10,
    description: 'Du har committat något nytt. Skicka upp det.',
    explain:
      'Efter `-u` första gången räcker `git push`. Git vet vart grenen ska.\n\nSå ser vardagen ut: ändra, committa, pusha.',
    example: 'git commit -am "Ny text"\ngit push',
    task: 'Uppgift: Lägg till `<p>Välkommen</p>` sist i `index.html`, committa med `Lägg till välkomsttext` och pusha.',
    setup: `${LOCAL}\ngit remote add origin https://github.com/ada/hemsida\ngit push -u origin main`,
    setupNote: '📁 Repot är redan pushat en gång.',
    starterCode: START,
    solution:
      'echo "<p>Välkommen</p>" >> index.html\ngit commit -am "Lägg till välkomsttext"\ngit push\n',
    hints: ['echo >> och git commit -am.', 'Sedan bara git push.', 'git push'],
    tests: [
      { description: 'Två commits', commits: 2 },
      { description: 'GitHub har dem', pushed: true },
    ],
  },
  {
    id: 'git-64',
    track: 'github',
    title: 'Hämta ett repo: git clone',
    xp: 15,
    description: 'Hämta ett projekt som någon annan har lagt upp.',
    explain:
      '`git clone adress` laddar ner hela repot – alla filer och hela historiken – till en ny mapp med repots namn. Kopplingen till `origin` finns redan.\n\nSå börjar man jobba på ett projekt som redan finns.',
    example: 'git clone https://github.com/ada/projekt\ncd projekt',
    task: `Uppgift: Klona \`${URL}\`, gå in i mappen och lista filerna.`,
    setup: ON_SERVER,
    setupNote: '☁️ På GitHub finns repot ada/recept.',
    starterCode: START,
    solution: `git clone ${URL}\ncd recept\nls\n`,
    hints: [
      'git clone följt av adressen.',
      'Mappen heter som repot: recept.',
      'cd recept och ls.',
    ],
    tests: [
      { description: 'Du står i recept', cwd: '/hem/recept' },
      { description: 'Filerna kom med', output: 'README.md  bullar.txt' },
      { description: 'Historiken kom med', repo: '/hem/recept', commits: 1 },
    ],
  },
  {
    id: 'git-65',
    track: 'github',
    title: 'Hämta nytt: git pull',
    xp: 15,
    description: 'En kompis har pushat något nytt. Hämta det.',
    explain:
      '`git pull` hämtar nya commits från GitHub och slår ihop dem med din gren.\n\nKör den innan du börjar jobba, så att du alltid utgår från det senaste.',
    example: 'git pull',
    task: 'Uppgift: Du står i din klon av recept. Hämta det kompisen pushat och lista filerna.',
    setup: `${ON_SERVER}\ngit clone ${URL}\n${FRIEND_PUSHES}\ncd recept`,
    setupNote: '📁 Du står i din klon. Kompisen har pushat semlor.txt.',
    starterCode: START,
    solution: 'git pull\nls\n',
    hints: [
      'Ett kommando hämtar och slår ihop.',
      'git pull',
      'ls visar den nya filen.',
    ],
    tests: [
      { description: 'semlor.txt kom med', exists: 'semlor.txt' },
      { description: 'Två commits', commits: 2 },
    ],
  },
  {
    id: 'git-66',
    track: 'github',
    title: 'Push nekas? Pull först',
    xp: 20,
    description:
      'Du och kompisen har båda committat. Din push nekas tills du har hämtat kompisens.',
    explain:
      'Har GitHub commits som du inte har vägrar `git push` – annars skulle kompisens arbete skrivas över. Felet säger _rejected (fetch first)_.\n\nLösningen: `git pull` först. Git slår ihop kompisens commits med dina, och sedan går `git push`.',
    example: 'git pull\ngit push',
    task: 'Uppgift: Lägg till `pannkakor.txt` (tom fil), committa med `Lägg till pannkakor`, hämta kompisens ändring och pusha.',
    setup: `${ON_SERVER}\ngit clone ${URL}\n${FRIEND_PUSHES}\ncd recept`,
    setupNote:
      '📁 Du står i din klon. Kompisen har redan pushat en commit som du inte har.',
    starterCode: START,
    solution:
      'touch pannkakor.txt\ngit add .\ngit commit -m "Lägg till pannkakor"\ngit pull\ngit push\n',
    hints: [
      'Committa först som vanligt.',
      'git pull hämtar kompisens commit och gör en merge-commit.',
      'Sedan git push.',
    ],
    tests: [
      { description: 'Båda filerna finns', exists: 'semlor.txt' },
      { description: 'pannkakor.txt också', exists: 'pannkakor.txt' },
      { description: 'GitHub har allt', pushed: true },
    ],
  },
  {
    id: 'git-67',
    track: 'github',
    title: 'README.md',
    xp: 15,
    description: 'Det första alla ser på GitHub är README-filen.',
    explain:
      '`README.md` visas på repots sida på GitHub. Den skrivs i **Markdown**: `#` blir en rubrik, `-` en punktlista och `**text**` fet text.\n\nEn bra README säger vad projektet är och hur man kommer igång.',
    example: 'echo "# Min app" > README.md\necho "En app som …" >> README.md',
    task: 'Uppgift: Skapa `README.md` med raderna `# Hemsida` och `Min första hemsida.`, committa med `Lägg till README` och pusha.',
    setup: `${LOCAL}\ngit remote add origin https://github.com/ada/hemsida\ngit push -u origin main`,
    setupNote: '📁 Repot är pushat, men saknar README.',
    starterCode: START,
    solution:
      'echo "# Hemsida" > README.md\necho "Min första hemsida." >> README.md\ngit add README.md\ngit commit -m "Lägg till README"\ngit push\n',
    hints: [
      'echo med > för första raden och >> för andra.',
      'git add och commit.',
      'git push',
    ],
    tests: [
      {
        description: 'README.md har båda raderna',
        file: 'README.md',
        content: '# Hemsida\nMin första hemsida.',
      },
      { description: 'Den är pushad', pushed: true },
    ],
  },
  {
    id: 'git-68',
    track: 'github',
    title: 'Pusha en gren',
    xp: 15,
    description:
      'Grenar kan också läggas upp, så att andra kan se dem innan de hamnar i main.',
    explain:
      'En ny gren finns bara hos dig tills du pushar den:\n\n```\ngit push -u origin namn\n```\n\nPå GitHub kan andra sedan titta på grenen – det är så man jobbar i team, med **pull requests**, som nästa bana handlar om.',
    example: 'git switch -c ny\ngit push -u origin ny',
    task: 'Uppgift: Skapa grenen `kontakt`, lägg till `kontakt.html` (tom), committa med `Lägg till kontaktsida` och pusha grenen.',
    setup: `${LOCAL}\ngit remote add origin https://github.com/ada/hemsida\ngit push -u origin main`,
    setupNote: '📁 main är pushad.',
    starterCode: START,
    solution:
      'git switch -c kontakt\ntouch kontakt.html\ngit add .\ngit commit -m "Lägg till kontaktsida"\ngit push -u origin kontakt\n',
    hints: [
      'git switch -c kontakt',
      'touch, add och commit som vanligt.',
      'git push -u origin kontakt',
    ],
    tests: [
      { description: 'Du står på kontakt', branch: 'kontakt' },
      { description: 'Grenen är pushad', pushed: true },
    ],
  },
  {
    id: 'git-69',
    track: 'github',
    title: 'Klona och bidra',
    xp: 20,
    description:
      'Hela vägen: hämta ett projekt, gör en ändring på en gren och lägg upp den.',
    explain:
      'Så bidrar man till ett projekt som redan finns: klona, skapa en gren, gör ändringen, committa och pusha grenen. Resten sköts på GitHub.',
    example: 'git clone …\ncd …\ngit switch -c min-andring',
    task: `Uppgift: Klona \`${URL}\`, skapa grenen \`kladdkaka\`, lägg till \`kladdkaka.txt\` med texten \`Kladdkaka\`, committa med \`Lägg till kladdkaka\` och pusha grenen.`,
    setup: ON_SERVER,
    setupNote: '☁️ På GitHub finns repot ada/recept.',
    starterCode: START,
    solution: `git clone ${URL}\ncd recept\ngit switch -c kladdkaka\necho "Kladdkaka" > kladdkaka.txt\ngit add .\ngit commit -m "Lägg till kladdkaka"\ngit push -u origin kladdkaka\n`,
    hints: [
      'git clone och cd recept.',
      'git switch -c kladdkaka, echo och commit.',
      'git push -u origin kladdkaka',
    ],
    tests: [
      { description: 'Grenen är pushad', pushed: true },
      {
        description: 'kladdkaka.txt finns',
        file: 'kladdkaka.txt',
        content: 'Kladdkaka',
      },
      { description: 'Två commits på grenen', commits: 2 },
    ],
  },
];
