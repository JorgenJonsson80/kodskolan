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
};
