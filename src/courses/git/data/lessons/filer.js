// Bana 2: filer i terminalen. Kopiera, flytta, döpa om och ta bort, dolda
// filer och mappar i flera nivåer.
const START = '# Skriv kommandona här, ett per rad\n';

export const FILER = [
  {
    id: 'git-11',
    track: 'filer',
    title: 'Kopiera: cp',
    xp: 10,
    description: 'Gör en kopia av en fil innan du ändrar i den.',
    explain:
      '`cp från till` (_copy_) kopierar en fil. Originalet finns kvar:\n\n```\ncp recept.txt recept-kopia.txt\n```',
    example: 'cp lista.txt lista-backup.txt',
    task: 'Uppgift: Kopiera `recept.txt` till `recept-kopia.txt`.',
    setup: 'echo "Kanelbullar" > recept.txt',
    setupNote: '📄 I hemmappen finns recept.txt.',
    starterCode: START,
    solution: 'cp recept.txt recept-kopia.txt\n',
    hints: [
      'cp följt av två namn: från och till.',
      'Först filen som finns, sedan namnet på kopian.',
      'cp recept.txt recept-kopia.txt',
    ],
    tests: [
      {
        description: 'Kopian har samma text',
        file: '/hem/recept-kopia.txt',
        content: 'Kanelbullar',
      },
      { description: 'Originalet finns kvar', exists: '/hem/recept.txt' },
    ],
  },
  {
    id: 'git-12',
    track: 'filer',
    title: 'Döp om: mv',
    xp: 10,
    description:
      'Det finns inget "döp om"-kommando. Man flyttar filen till ett nytt namn.',
    explain:
      '`mv gammalt nytt` (_move_) flyttar en fil. Flyttar du den till ett nytt namn i samma mapp har du döpt om den.',
    example: 'mv utkast.txt klar.txt',
    task: 'Uppgift: Döp om `utkast.txt` till `uppsats.txt`.',
    setup: 'echo "Min sommar" > utkast.txt',
    setupNote: '📄 I hemmappen finns utkast.txt.',
    starterCode: START,
    solution: 'mv utkast.txt uppsats.txt\n',
    hints: [
      'mv gammalt-namn nytt-namn',
      'mv utkast.txt …',
      'mv utkast.txt uppsats.txt',
    ],
    tests: [
      {
        description: 'uppsats.txt har texten',
        file: '/hem/uppsats.txt',
        content: 'Min sommar',
      },
      {
        description: 'utkast.txt finns inte längre',
        missing: '/hem/utkast.txt',
      },
    ],
  },
  {
    id: 'git-13',
    track: 'filer',
    title: 'Flytta in i en mapp',
    xp: 10,
    description: 'Med en mapp som mål hamnar filen i mappen, med samma namn.',
    explain:
      'Är det sista namnet en mapp flyttar `mv` in filen där:\n\n```\nmv semester.jpg bilder\n```\n\nNu ligger den i `bilder/semester.jpg`. `cp` fungerar likadant.',
    example: 'mv foto.jpg bilder\nls bilder',
    task: 'Uppgift: Flytta `semester.jpg` och `fest.jpg` in i mappen `bilder`, och lista mappen.',
    setup: 'mkdir bilder\ntouch semester.jpg fest.jpg',
    setupNote: '📁 I hemmappen finns semester.jpg, fest.jpg och mappen bilder.',
    starterCode: START,
    solution: 'mv semester.jpg bilder\nmv fest.jpg bilder\nls bilder\n',
    hints: ['mv semester.jpg bilder', 'En mv per fil.', 'Sist ls bilder.'],
    tests: [
      {
        description: 'bilder/semester.jpg finns',
        exists: '/hem/bilder/semester.jpg',
      },
      { description: 'bilder/fest.jpg finns', exists: '/hem/bilder/fest.jpg' },
      {
        description: 'De ligger inte kvar i hemmappen',
        missing: '/hem/fest.jpg',
      },
    ],
  },
  {
    id: 'git-14',
    track: 'filer',
    title: 'Ta bort: rm',
    xp: 10,
    description: 'Ta bort en fil du inte behöver.',
    explain:
      '`rm fil` (_remove_) tar bort en fil.\n\n**Se upp:** det finns ingen papperskorg i terminalen. Det som tas bort med `rm` är borta. Kolla med `ls` innan.',
    example: 'ls\nrm gammal.txt',
    task: 'Uppgift: Ta bort `skräp.txt`, men inte `viktigt.txt`.',
    setup: 'touch skräp.txt viktigt.txt',
    setupNote: '📄 I hemmappen finns skräp.txt och viktigt.txt.',
    starterCode: START,
    solution: 'rm skräp.txt\n',
    hints: [
      'rm följt av filnamnet.',
      'Bara skräp.txt ska bort.',
      'rm skräp.txt',
    ],
    tests: [
      { description: 'skräp.txt är borta', missing: '/hem/skräp.txt' },
      { description: 'viktigt.txt finns kvar', exists: '/hem/viktigt.txt' },
    ],
  },
  {
    id: 'git-15',
    track: 'filer',
    title: 'Ta bort en mapp: rm -r',
    xp: 10,
    description: 'En mapp med allt i den tas bort på en gång.',
    explain:
      '`rm` vägrar ta bort mappar, för säkerhets skull. Med `-r` (_recursive_) tas mappen bort **med allt som finns i den**:\n\n```\nrm -r gamla-bilder\n```',
    example: 'rm -r tom-mapp',
    task: 'Uppgift: Ta bort mappen `gammalt-projekt` med allt i den.',
    setup:
      'mkdir -p gammalt-projekt/css\ntouch gammalt-projekt/index.html gammalt-projekt/css/style.css',
    setupNote: '📁 I hemmappen finns gammalt-projekt med filer och en mapp i.',
    starterCode: START,
    solution: 'rm -r gammalt-projekt\n',
    hints: [
      'Vanlig rm tar inte bort mappar.',
      '-r tar bort allt i mappen också.',
      'rm -r gammalt-projekt',
    ],
    tests: [
      {
        description: 'gammalt-projekt är borta',
        missing: '/hem/gammalt-projekt',
      },
    ],
  },
  {
    id: 'git-16',
    track: 'filer',
    title: 'Dolda filer: ls -a',
    xp: 15,
    description: 'Filer som börjar med en punkt syns inte – men de finns.',
    explain:
      'En fil eller mapp vars namn börjar med `.` är **dold**. Vanlig `ls` visar dem inte, men `ls -a` (_all_) gör det.\n\nDu kommer att se dem ofta: Git sparar allt i en dold mapp som heter `.git`, och `.gitignore` och `.env` är vanliga dolda filer. `.` och `..` som `ls -a` också visar är mappen du står i och mappen ovanför.',
    example: 'ls\nls -a',
    task: 'Uppgift: Gå in i `projekt` och lista allt, även de dolda filerna. Skapa sedan den dolda filen `.env`.',
    setup: 'mkdir projekt\ntouch projekt/index.html projekt/.hemlig',
    setupNote: '📁 I projekt finns en vanlig fil och en dold.',
    starterCode: START,
    solution: 'cd projekt\nls -a\ntouch .env\n',
    hints: ['cd projekt först.', 'ls -a visar dolda filer.', 'touch .env'],
    tests: [
      {
        description: 'ls -a visade .hemlig',
        output: '.  ..  .hemlig  index.html',
      },
      { description: '.env finns', exists: '/hem/projekt/.env' },
    ],
  },
  {
    id: 'git-17',
    track: 'filer',
    title: 'Flera nivåer: mkdir -p',
    xp: 10,
    description: 'Skapa en mapp i en mapp i en mapp – med ett kommando.',
    explain:
      'Vanlig `mkdir a/b/c` går bara om `a/b` redan finns. Med `-p` skapas alla mappar som fattas på vägen:\n\n```\nmkdir -p src/komponenter/knappar\n```\n\n`-p` klagar inte heller om mappen redan finns.',
    example: 'mkdir -p a/b/c',
    task: 'Uppgift: Skapa `app/src/komponenter` och `app/public/bilder` med `mkdir -p`.',
    starterCode: START,
    solution: 'mkdir -p app/src/komponenter\nmkdir -p app/public/bilder\n',
    hints: [
      'mkdir -p följt av hela sökvägen.',
      'mkdir -p app/src/komponenter',
      'En rad till för app/public/bilder.',
    ],
    tests: [
      {
        description: 'app/src/komponenter finns',
        exists: '/hem/app/src/komponenter',
      },
      {
        description: 'app/public/bilder finns',
        exists: '/hem/app/public/bilder',
      },
    ],
    sourceChecks: [{ description: 'Använder mkdir -p', pattern: /mkdir -p/ }],
  },
  {
    id: 'git-18',
    track: 'filer',
    title: 'Kopiera en mapp: cp -r',
    xp: 10,
    description: 'Gör en säkerhetskopia av ett helt projekt.',
    explain:
      'Precis som `rm` behöver `cp` ett `-r` för att ta med en mapp och allt i den:\n\n```\ncp -r projekt projekt-backup\n```\n\n(Med Git, som kommer i nästa bana, behöver du sällan göra så här – Git sparar alla versioner åt dig.)',
    example: 'cp -r bilder bilder-kopia',
    task: 'Uppgift: Kopiera mappen `hemsida` till `hemsida-backup`.',
    setup: 'mkdir hemsida\necho "<h1>Hej</h1>" > hemsida/index.html',
    setupNote: '📁 I hemmappen finns hemsida med index.html.',
    starterCode: START,
    solution: 'cp -r hemsida hemsida-backup\n',
    hints: [
      'cp behöver -r för mappar.',
      'Först mappen som finns, sedan det nya namnet.',
      'cp -r hemsida hemsida-backup',
    ],
    tests: [
      {
        description: 'Kopian har index.html med samma text',
        file: '/hem/hemsida-backup/index.html',
        content: '<h1>Hej</h1>',
      },
      {
        description: 'Originalet finns kvar',
        exists: '/hem/hemsida/index.html',
      },
    ],
  },
  {
    id: 'git-19',
    track: 'filer',
    title: 'Städa upp',
    xp: 15,
    description: 'Allt på en gång: skapa, flytta och ta bort.',
    explain:
      'De flesta dagar i terminalen är precis det här: några mappar, några flyttar och lite städning. Kör `ls` mellan stegen om du är osäker.',
    example: 'mkdir dokument\nmv kvitto.pdf dokument\nrm gammal.tmp',
    task: 'Uppgift: Skapa mappen `dokument` och flytta in `kvitto.pdf` där. Ta bort `tillfällig.tmp`.',
    setup: 'touch kvitto.pdf tillfällig.tmp',
    setupNote: '📄 I hemmappen finns kvitto.pdf och tillfällig.tmp.',
    starterCode: START,
    solution: 'mkdir dokument\nmv kvitto.pdf dokument\nrm tillfällig.tmp\n',
    hints: [
      'Tre kommandon: mkdir, mv och rm.',
      'mv kvitto.pdf dokument',
      'rm tillfällig.tmp',
    ],
    tests: [
      {
        description: 'dokument/kvitto.pdf finns',
        exists: '/hem/dokument/kvitto.pdf',
      },
      {
        description: 'tillfällig.tmp är borta',
        missing: '/hem/tillfällig.tmp',
      },
    ],
  },
];
