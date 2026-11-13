// Bana 1: terminalen. Var man står, vad som finns, att gå mellan mappar
// och att skapa mappar och filer. Testerna kontrollerar läget efteråt
// (runner/checks.js) med hela sökvägar, så att det inte spelar roll var
// eleven står när kommandona är klara.
const START = '# Skriv kommandona här, ett per rad\n';

export const TERMINAL = [
  {
    id: 'git-01',
    track: 'terminal',
    title: 'Var är jag? pwd',
    xp: 10,
    description:
      'Terminalen är ett fönster där du styr datorn med text i stället för musen. Det första du vill veta: var står jag?',
    explain:
      'I terminalen står du alltid **i en mapp**, precis som när du har en mapp öppen i Finder eller Utforskaren.\n\n`pwd` (_print working directory_) skriver ut vilken. Svaret är en **sökväg**: mapparna uppifrån, med `/` emellan. `/hem` betyder mappen `hem` längst upp.\n\nSkriv kommandot och tryck på Kolla lösning. Varje rad du skriver körs som ett kommando, uppifrån och ner.',
    example: 'pwd',
    task: 'Uppgift: Ta reda på var du står med `pwd`.',
    starterCode: START,
    solution: 'pwd\n',
    hints: [
      'Kommandot är tre bokstäver.',
      'p för print, w för working, d för directory.',
      'pwd',
    ],
    tests: [{ description: 'Skriver ut /hem', output: '$ pwd\n/hem' }],
  },
  {
    id: 'git-02',
    track: 'terminal',
    title: 'Vad finns här? ls',
    xp: 10,
    description: 'Titta vad som finns i mappen du står i.',
    explain:
      '`ls` (_list_) visar filerna och mapparna där du står, i bokstavsordning.\n\nFiler har ofta en ändelse som `.txt` eller `.html`. Mappar har det sällan. I en riktig terminal brukar mappar dessutom ha en annan färg.',
    example: 'ls',
    task: 'Uppgift: Lista vad som finns i hemmappen med `ls`.',
    setup: 'mkdir skola\nmkdir bilder\ntouch anteckningar.txt',
    setupNote: '📁 I hemmappen finns redan några mappar och en fil.',
    starterCode: START,
    solution: 'ls\n',
    hints: ['Två bokstäver.', 'l för list.', 'ls'],
    tests: [
      {
        description: 'Listar anteckningar.txt, bilder och skola',
        output: 'anteckningar.txt  bilder  skola',
      },
    ],
  },
  {
    id: 'git-03',
    track: 'terminal',
    title: 'Gå in i en mapp: cd',
    xp: 10,
    description: 'Byt mapp, som att dubbelklicka på den.',
    explain:
      '`cd skola` (_change directory_) går in i mappen `skola`. Därefter körs alla kommandon där.\n\nKolla med `pwd` att det blev rätt – det gör proffs hela tiden.',
    example: 'cd bilder\npwd',
    task: 'Uppgift: Gå in i mappen `skola` och skriv ut var du står.',
    setup: 'mkdir skola\nmkdir bilder',
    setupNote: '📁 I hemmappen finns mapparna skola och bilder.',
    starterCode: START,
    solution: 'cd skola\npwd\n',
    hints: ['cd följt av mappens namn.', 'cd skola', 'Sedan pwd på nästa rad.'],
    tests: [
      { description: 'Du står i /hem/skola', cwd: '/hem/skola' },
      { description: 'pwd skriver ut /hem/skola', output: '/hem/skola' },
    ],
  },
  {
    id: 'git-04',
    track: 'terminal',
    title: 'Uppåt: cd ..',
    xp: 15,
    description: 'Du står djupt ner i en mapp. Ta dig tillbaka upp.',
    explain:
      '`..` betyder **mappen ovanför**. `cd ..` går alltså upp ett steg, och `cd ../..` två steg.\n\n`~` betyder din hemmapp, var du än står: `cd ~` tar dig hem direkt. (`cd` utan något alls gör samma sak.)',
    example: 'cd ..\npwd',
    task: 'Uppgift: Du står i `/hem/skola/matte`. Gå upp till `/hem/skola` med `cd ..`, och sedan hem med `cd ~`.',
    setup: 'mkdir -p skola/matte\ncd skola/matte',
    setupNote: '📁 Du står i /hem/skola/matte.',
    starterCode: START,
    solution: 'cd ..\npwd\ncd ~\npwd\n',
    hints: [
      'cd .. går upp ett steg.',
      'Skriv pwd efteråt så ser du var du är.',
      'cd ~ tar dig hem.',
    ],
    tests: [
      {
        description: 'Du var i /hem/skola på vägen',
        output: '$ pwd\n/hem/skola',
      },
      { description: 'Du står i /hem till sist', cwd: '/hem' },
    ],
    sourceChecks: [
      { description: 'Använder cd ..', pattern: /cd \.\./ },
      { description: 'Använder cd ~', pattern: /cd ~/ },
    ],
  },
  {
    id: 'git-05',
    track: 'terminal',
    title: 'Ny mapp: mkdir',
    xp: 10,
    description: 'Skapa en mapp till ditt första projekt.',
    explain:
      '`mkdir projekt` (_make directory_) skapar mappen `projekt` där du står.\n\nUndvik mellanslag och å, ä, ö i namn på mappar och filer. De fungerar, men måste skrivas inom citattecken och krånglar ibland. Använd bindestreck i stället: `mitt-projekt`.',
    example: 'mkdir recept\nls',
    task: 'Uppgift: Skapa mappen `mitt-projekt` och gå in i den.',
    starterCode: START,
    solution: 'mkdir mitt-projekt\ncd mitt-projekt\n',
    hints: [
      'mkdir följt av namnet.',
      'mkdir mitt-projekt',
      'Sedan cd mitt-projekt.',
    ],
    tests: [
      {
        description: 'Mappen /hem/mitt-projekt finns',
        exists: '/hem/mitt-projekt',
      },
      { description: 'Du står i den', cwd: '/hem/mitt-projekt' },
    ],
  },
  {
    id: 'git-06',
    track: 'terminal',
    title: 'Ny fil: touch',
    xp: 10,
    description: 'Skapa tomma filer att fylla senare.',
    explain:
      '`touch index.html` skapar en tom fil. Flera på en gång går också: `touch a.txt b.txt`.\n\nI ett riktigt projekt öppnar du sedan filen i en editor som VS Code. Här i kursen skriver vi text i filer med `echo`, som kommer i nästa övning.',
    example: 'touch hej.txt\nls',
    task: 'Uppgift: Skapa filerna `index.html` och `style.css` i `projekt`, och lista dem med `ls`.',
    setup: 'mkdir projekt\ncd projekt',
    setupNote: '📁 Du står i den tomma mappen /hem/projekt.',
    starterCode: START,
    solution: 'touch index.html style.css\nls\n',
    hints: [
      'touch följt av filnamnet.',
      'Flera filer: touch index.html style.css',
      'Sist ls.',
    ],
    tests: [
      { description: 'index.html finns', exists: '/hem/projekt/index.html' },
      { description: 'style.css finns', exists: '/hem/projekt/style.css' },
      { description: 'ls visar båda', output: 'index.html  style.css' },
    ],
  },
  {
    id: 'git-07',
    track: 'terminal',
    title: 'Text i en fil: echo >',
    xp: 15,
    description: 'Skriv text direkt i en fil från terminalen.',
    explain:
      '`echo "Hej"` skriver ut texten. Sätter du `>` och ett filnamn efter hamnar texten i filen i stället:\n\n```\necho "Hej världen" > hej.txt\n```\n\nSe upp: `>` **skriver över** det som stod i filen förut. Citattecknen håller ihop texten med mellanslag.',
    example: 'echo "Det här syns"\necho "Det här hamnar i en fil" > fil.txt',
    task: 'Uppgift: Skapa filen `hej.txt` med texten `Hej världen` i.',
    starterCode: START,
    solution: 'echo "Hej världen" > hej.txt\n',
    hints: [
      'echo "text" > filnamn',
      'Texten inom citattecken.',
      'echo "Hej världen" > hej.txt',
    ],
    tests: [
      {
        description: 'hej.txt innehåller Hej världen',
        file: '/hem/hej.txt',
        content: 'Hej världen',
      },
    ],
  },
  {
    id: 'git-08',
    track: 'terminal',
    title: 'Läs och fyll på: cat och >>',
    xp: 15,
    description: 'Läs en fil och lägg till en rad sist i den.',
    explain:
      '`cat fil.txt` skriver ut vad filen innehåller.\n\n`>>` lägger till texten **sist** i filen i stället för att skriva över den:\n\n```\necho "En rad till" >> fil.txt\n```',
    example: 'cat lista.txt',
    task: 'Uppgift: Läs `att-gora.txt` med `cat`. Lägg sedan till raden `Plugga Git` sist i filen, och läs den igen.',
    setup:
      'echo "Ring mormor" > att-gora.txt\necho "Handla mjölk" >> att-gora.txt',
    setupNote: '📄 I hemmappen finns att-gora.txt med två saker att göra.',
    starterCode: START,
    solution:
      'cat att-gora.txt\necho "Plugga Git" >> att-gora.txt\ncat att-gora.txt\n',
    hints: [
      'cat att-gora.txt',
      'Två > lägger till: echo "Plugga Git" >> att-gora.txt',
      'Sist cat igen.',
    ],
    tests: [
      {
        description: 'Filen har alla tre raderna',
        file: '/hem/att-gora.txt',
        content: 'Ring mormor\nHandla mjölk\nPlugga Git',
      },
      { description: 'cat visade filen', output: 'Ring mormor\nHandla mjölk' },
    ],
    sourceChecks: [{ description: 'Använder >>', pattern: />>/ }],
  },
  {
    id: 'git-09',
    track: 'terminal',
    title: 'Hela vägen: sökvägar',
    xp: 15,
    description: 'Du behöver inte gå in i en mapp för att jobba i den.',
    explain:
      'Där ett kommando vill ha ett namn kan du skriva en **sökväg**: `skola/svenska/uppsats.txt` betyder filen `uppsats.txt` i mappen `svenska` i mappen `skola`, räknat från där du står.\n\nEn sökväg som börjar med `/` räknas från toppen i stället: `/hem/skola`.',
    example: 'ls skola\ncat skola/svenska/uppsats.txt',
    task: 'Uppgift: Stå kvar i hemmappen. Skapa filen `uppsats.txt` med texten `Min sommar` i mappen `skola/svenska`, och lista den mappen.',
    setup: 'mkdir -p skola/svenska',
    setupNote: '📁 Mappen skola/svenska finns redan. Du står i /hem.',
    starterCode: START,
    solution:
      'echo "Min sommar" > skola/svenska/uppsats.txt\nls skola/svenska\n',
    hints: [
      'Skriv sökvägen till filen i stället för bara namnet.',
      'echo "Min sommar" > skola/svenska/uppsats.txt',
      'ls skola/svenska',
    ],
    tests: [
      {
        description: 'Filen finns med rätt text',
        file: '/hem/skola/svenska/uppsats.txt',
        content: 'Min sommar',
      },
      { description: 'Du står kvar i /hem', cwd: '/hem' },
      {
        description: 'ls visar filen',
        output: '$ ls skola/svenska\nuppsats.txt',
      },
    ],
    sourceChecks: [
      {
        description: 'Använder inte cd',
        pattern: /^\s*cd\b/m,
        forbidden: true,
      },
    ],
  },
];
