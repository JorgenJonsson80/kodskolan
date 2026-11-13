// En boss per bana: en större uppgift utan ledtrådar. index.js lägger
// varje boss sist i sin bana.
const BOSS_INTRO = 'Bossen har inga ledtrådar – visa vad du kan! ';

export const BOSSES = {
  terminal: {
    id: 'git-boss-terminal',
    track: 'terminal',
    title: 'Boss: Bygg en projektmapp',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO + 'Sätt upp en ny hemsida från noll, bara med terminalen.',
    task: `Uppgift: Från hemmappen, bygg det här:
\`\`\`
hemsida/
  index.html   (med texten <h1>Hej</h1>)
  README.md    (med texten # Min hemsida)
  css/
    style.css  (tom)
\`\`\`
Stå i \`hemsida\` när du är klar.`,
    starterCode: '# Skriv kommandona här, ett per rad\n',
    solution:
      'mkdir hemsida\ncd hemsida\necho "<h1>Hej</h1>" > index.html\necho "# Min hemsida" > README.md\nmkdir css\ntouch css/style.css\n',
    hints: [],
    tests: [
      {
        description: 'index.html har rubriken',
        file: '/hem/hemsida/index.html',
        content: '<h1>Hej</h1>',
      },
      {
        description: 'README.md har texten',
        file: '/hem/hemsida/README.md',
        content: '# Min hemsida',
      },
      {
        description: 'css/style.css finns och är tom',
        file: '/hem/hemsida/css/style.css',
        content: '',
      },
      { description: 'Du står i hemsida', cwd: '/hem/hemsida' },
    ],
  },
  filer: {
    id: 'git-boss-filer',
    track: 'filer',
    title: 'Boss: Ordning i Hämtade filer',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO + 'Mappen hamtat är full av blandade filer. Städa den.',
    task: `Uppgift: I \`hamtat\` ligger semester.jpg, fest.jpg, kvitto.pdf, faktura.pdf och två .tmp-filer. Gör så här:
  1. Skapa mapparna \`hamtat/bilder\` och \`hamtat/dokument\`.
  2. Flytta bilderna till bilder och pdf-filerna till dokument.
  3. Ta bort båda .tmp-filerna.
  4. Gör en säkerhetskopia av hela \`hamtat\` som heter \`hamtat-backup\`.`,
    setup:
      'mkdir hamtat\ntouch hamtat/semester.jpg hamtat/fest.jpg hamtat/kvitto.pdf hamtat/faktura.pdf hamtat/a.tmp hamtat/b.tmp',
    setupNote: '📁 Mappen hamtat är full av blandade filer.',
    starterCode: '# Skriv kommandona här, ett per rad\n',
    solution:
      'cd hamtat\nmkdir bilder dokument\nmv semester.jpg bilder\nmv fest.jpg bilder\nmv kvitto.pdf dokument\nmv faktura.pdf dokument\nrm a.tmp b.tmp\ncd ..\ncp -r hamtat hamtat-backup\n',
    hints: [],
    tests: [
      {
        description: 'Bilderna ligger i bilder',
        exists: '/hem/hamtat/bilder/fest.jpg',
      },
      {
        description: 'semester.jpg också',
        exists: '/hem/hamtat/bilder/semester.jpg',
      },
      {
        description: 'Pdf-filerna ligger i dokument',
        exists: '/hem/hamtat/dokument/faktura.pdf',
      },
      {
        description: 'kvitto.pdf också',
        exists: '/hem/hamtat/dokument/kvitto.pdf',
      },
      { description: 'Inga .tmp-filer kvar', missing: '/hem/hamtat/a.tmp' },
      { description: 'b.tmp är också borta', missing: '/hem/hamtat/b.tmp' },
      {
        description: 'Säkerhetskopian finns',
        exists: '/hem/hamtat-backup/dokument/kvitto.pdf',
      },
    ],
  },
  commit: {
    id: 'git-boss-commit',
    track: 'commit',
    title: 'Boss: Ditt första repo',
    isBoss: true,
    xp: 40,
    description: BOSS_INTRO + 'Ett projekt från noll till två versioner i Git.',
    task: `Uppgift:
  1. Skapa mappen \`portfolio\` och gör den till ett Git-repo.
  2. Skapa \`index.html\` med texten \`<h1>Mina projekt</h1>\` och \`README.md\` med texten \`# Portfolio\`.
  3. Committa båda med meddelandet \`Första versionen\`.
  4. Lägg till raden \`Här samlar jag allt jag byggt.\` sist i README.md och committa med \`Beskriv projektet\`.`,
    starterCode: '# Skriv kommandona här, ett per rad\n',
    solution:
      'mkdir portfolio\ncd portfolio\ngit init\necho "<h1>Mina projekt</h1>" > index.html\necho "# Portfolio" > README.md\ngit add .\ngit commit -m "Första versionen"\necho "Här samlar jag allt jag byggt." >> README.md\ngit add README.md\ngit commit -m "Beskriv projektet"\n',
    hints: [],
    tests: [
      { description: 'Två commits', repo: '/hem/portfolio', commits: 2 },
      {
        description: 'Senaste heter Beskriv projektet',
        repo: '/hem/portfolio',
        message: 'Beskriv projektet',
      },
      {
        description: 'README.md har båda raderna',
        file: '/hem/portfolio/README.md',
        content: '# Portfolio\nHär samlar jag allt jag byggt.',
      },
      {
        description: 'Inget kvar att committa',
        repo: '/hem/portfolio',
        clean: true,
      },
    ],
  },
  andringar: {
    id: 'git-boss-andringar',
    track: 'andringar',
    title: 'Boss: Rädda projektet',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'En stökig eftermiddag: något är förstört, något ska inte med och något ska committas.',
    task: `Uppgift:
  1. \`index.html\` är förstörd – ställ tillbaka den.
  2. \`.env\` med ett lösenord är tillagd för commit – ta bort den därifrån och se till att Git aldrig tar med den (\`.gitignore\`).
  3. Committa den nya färgen i \`style.css\` och \`.gitignore\` med meddelandet \`Byt färg på rubriken\`.`,
    setup: `mkdir hemsida\ncd hemsida\ngit init\necho "<h1>Hej</h1>" > index.html\necho "h1 { color: blue; }" > style.css\ngit add .\ngit commit -m "Första versionen"\necho "trasig" > index.html\necho "h1 { color: red; }" > style.css\necho "LOSENORD=x" > .env\ngit add .env`,
    setupNote:
      '🔥 index.html är förstörd, .env är tillagd och style.css har en ny färg.',
    starterCode: '# Skriv kommandona här, ett per rad\n',
    solution:
      'git restore index.html\ngit restore --staged .env\necho ".env" > .gitignore\ngit add style.css .gitignore\ngit commit -m "Byt färg på rubriken"\n',
    hints: [],
    tests: [
      {
        description: 'index.html är räddad',
        file: 'index.html',
        content: '<h1>Hej</h1>',
      },
      {
        description: 'Git följer inte .env',
        tracked: ['.gitignore', 'index.html', 'style.css'],
      },
      { description: 'Commiten', message: 'Byt färg på rubriken' },
      { description: 'Inget kvar att committa', clean: true },
    ],
  },
  grenar: {
    id: 'git-boss-grenar',
    track: 'grenar',
    title: 'Boss: En ny sida på en egen gren',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Bygg en om-sida som proffsen gör: på en egen gren, och in i main när den är klar.',
    task: `Uppgift:
  1. Skapa grenen \`om-sidan\` och byt till den.
  2. Skapa \`om.html\` med texten \`<h1>Om mig</h1>\` och committa med \`Lägg till om-sidan\`.
  3. Lägg till raden \`<p>Jag gillar att koda.</p>\` sist och committa med \`Skriv om mig\`.
  4. Slå ihop grenen med main och ta bort grenen.`,
    setup: `mkdir hemsida\ncd hemsida\ngit init\necho "<h1>Hej</h1>" > index.html\ngit add .\ngit commit -m "Första versionen"`,
    setupNote: '📁 Du står på main i repot hemsida.',
    starterCode: '# Skriv kommandona här, ett per rad\n',
    solution:
      'git switch -c om-sidan\necho "<h1>Om mig</h1>" > om.html\ngit add om.html\ngit commit -m "Lägg till om-sidan"\necho "<p>Jag gillar att koda.</p>" >> om.html\ngit commit -am "Skriv om mig"\ngit switch main\ngit merge om-sidan\ngit branch -d om-sidan\n',
    hints: [],
    tests: [
      { description: 'Du står på main', branch: 'main' },
      {
        description: 'om.html är klar på main',
        file: 'om.html',
        content: '<h1>Om mig</h1>\n<p>Jag gillar att koda.</p>',
      },
      { description: 'main har tre commits', commits: 3 },
      { description: 'Grenen är borttagen', branches: ['main'] },
    ],
  },
  konflikter: {
    id: 'git-boss-konflikter',
    track: 'konflikter',
    title: 'Boss: Två som jobbade samtidigt',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Ada och Bo har ändrat samma meny på var sin gren. Få ihop det.',
    task: `Uppgift: Grenarna \`ada\` och \`bo\` har båda ändrat sista raden i \`meny.txt\` (Ada: \`Kontakt\`, Bo: \`Om oss\`).
  1. Slå ihop \`ada\` med main.
  2. Slå ihop \`bo\` med main och laga konflikten så att menyn får båda: raderna \`Hem\`, \`Kontakt\` och \`Om oss\`.
  3. Committa med \`Slå ihop menyerna\` och ta bort båda grenarna.`,
    setup: `mkdir hemsida\ncd hemsida\ngit init\necho "Hem" > meny.txt\ngit add .\ngit commit -m "Lägg till meny"\ngit switch -c ada\necho "Kontakt" >> meny.txt\ngit commit -am "Lägg till Kontakt"\ngit switch main\ngit switch -c bo\necho "Om oss" >> meny.txt\ngit commit -am "Lägg till Om oss"\ngit switch main`,
    setupNote: '📁 Du står på main. Grenarna ada och bo har ändrat meny.txt.',
    starterCode: '# Skriv kommandona här, ett per rad\n',
    solution:
      'git merge ada\ngit merge bo\necho "Hem" > meny.txt\necho "Kontakt" >> meny.txt\necho "Om oss" >> meny.txt\ngit add meny.txt\ngit commit -m "Slå ihop menyerna"\ngit branch -d ada\ngit branch -d bo\n',
    hints: [],
    tests: [
      {
        description: 'Menyn har alla tre',
        file: 'meny.txt',
        content: 'Hem\nKontakt\nOm oss',
      },
      { description: 'Det blev en merge-commit', merged: true },
      { description: 'Meddelandet', message: 'Slå ihop menyerna' },
      { description: 'Bara main finns kvar', branches: ['main'] },
    ],
  },
  github: {
    id: 'git-boss-github',
    track: 'github',
    title: 'Boss: Publicera projektet',
    isBoss: true,
    xp: 40,
    description: BOSS_INTRO + 'Från tom mapp till ett projekt på GitHub.',
    task: `Uppgift:
  1. Skapa mappen \`portfolio\`, gör den till ett repo och lägg till \`index.html\` med \`<h1>Portfolio</h1>\` och \`README.md\` med \`# Portfolio\`.
  2. Committa med \`Första versionen\`.
  3. Koppla till \`https://github.com/ada/portfolio\` och pusha main.
  4. Lägg till raden \`Mina projekt.\` sist i README.md, committa med \`Beskriv projektet\` och pusha igen.`,
    starterCode: '# Skriv kommandona här, ett per rad\n',
    solution:
      'mkdir portfolio\ncd portfolio\ngit init\necho "<h1>Portfolio</h1>" > index.html\necho "# Portfolio" > README.md\ngit add .\ngit commit -m "Första versionen"\ngit remote add origin https://github.com/ada/portfolio\ngit push -u origin main\necho "Mina projekt." >> README.md\ngit commit -am "Beskriv projektet"\ngit push\n',
    hints: [],
    tests: [
      { description: 'Två commits', repo: '/hem/portfolio', commits: 2 },
      {
        description: 'README.md har båda raderna',
        file: '/hem/portfolio/README.md',
        content: '# Portfolio\nMina projekt.',
      },
      { description: 'Allt är pushat', repo: '/hem/portfolio', pushed: true },
    ],
  },
  arbetsflode: {
    id: 'git-boss-arbetsflode',
    track: 'arbetsflode',
    title: 'Boss: Din första riktiga pull request',
    isBoss: true,
    xp: 60,
    description:
      BOSS_INTRO +
      'Hela flödet i ett team, från klon till en gren som är redo för pull request.',
    task: `Uppgift: Teamets hemsida finns på \`https://github.com/team/hemsida\`.
  1. Klona den och skapa grenen \`priser\`.
  2. Lägg till \`priser.html\` med \`<h1>Priser</h1>\` och committa med \`Lägg till prissida\`.
  3. Lägg till länken \`<a href='priser.html'>Priser</a>\` sist i \`meny.html\` och committa med \`Länka till prissidan\`.
  4. Hämta main in i din gren innan du pushar, så att pull requesten utgår från det senaste – gör det till en vana, även när inget är nytt.
  5. Pusha grenen, så att den kan bli en pull request.`,
    setup: `mkdir tmp\ncd tmp\ngit init\necho "<h1>Hej</h1>" > index.html\necho "<a href='index.html'>Hem</a>" > meny.html\ngit add .\ngit commit -m "Första versionen"\ngit remote add origin https://github.com/team/hemsida\ngit push -u origin main\ncd ..\nrm -r tmp`,
    setupNote: '☁️ Teamets hemsida finns på GitHub.',
    starterCode: '# Skriv kommandona här, ett per rad\n',
    solution:
      'git clone https://github.com/team/hemsida\ncd hemsida\ngit switch -c priser\necho "<h1>Priser</h1>" > priser.html\ngit add priser.html\ngit commit -m "Lägg till prissida"\necho "<a href=\'priser.html\'>Priser</a>" >> meny.html\ngit commit -am "Länka till prissidan"\ngit pull origin main\ngit push -u origin priser\n',
    hints: [],
    tests: [
      {
        description: 'Du står på priser',
        repo: '/hem/hemsida',
        branch: 'priser',
      },
      {
        description: 'priser.html finns',
        file: '/hem/hemsida/priser.html',
        content: '<h1>Priser</h1>',
      },
      {
        description: 'Menyn har länken',
        file: '/hem/hemsida/meny.html',
        content:
          "<a href='index.html'>Hem</a>\n<a href='priser.html'>Priser</a>",
      },
      { description: 'Grenen är pushad', repo: '/hem/hemsida', pushed: true },
    ],
  },
};
