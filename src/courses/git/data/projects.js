import { projectSteps } from '../../../core/projects';

// Projekt som låses upp när en bana är klar: tre per bana med tre steg.
// Varje steg kör om allt från början – setup och sedan förra stegets
// kommandon – så ett steg bygger vidare på förra stegets facit. add är
// kommandona steget lägger till.
const START = '# Skriv kommandona här, ett per rad\n';

function project({ setup = '', setupNote, steps, ...rest }) {
  let solution = '';
  return {
    ...rest,
    steps: steps.map(({ add, ...step }, index) => {
      solution += add;
      return {
        ...step,
        setup,
        setupNote,
        solution,
        ...(index === 0 && { starterCode: START }),
      };
    }),
  };
}

const write = (file, lines) =>
  lines
    .map((line, index) => `echo "${line}" ${index === 0 ? '>' : '>>'} ${file}`)
    .join('\n');

// Två grenar som ändrar samma rad, så att sammanslagningen krockar.
const conflict = (dir, file, base, ours, theirs, branch) =>
  [
    `mkdir ${dir}`,
    `cd ${dir}`,
    'git init',
    write(file, base),
    'git add .',
    'git commit -m "Första versionen"',
    `git switch -c ${branch}`,
    write(file, theirs),
    `git commit -am "Ändring på ${branch}"`,
    'git switch main',
    write(file, ours),
    'git commit -am "Ändring på main"',
  ].join('\n');

// Ett repo som redan finns på låtsas-GitHub.
const onServer = (url, files) =>
  [
    'mkdir tmp',
    'cd tmp',
    'git init',
    ...files.map(([file, text]) => `echo "${text}" > ${file}`),
    'git add .',
    'git commit -m "Första versionen"',
    `git remote add origin ${url}`,
    'git push origin main',
    'cd ..',
    'rm -r tmp',
  ].join('\n');

const KLUBB = 'https://github.com/klubben/sida';
const RECEPT = 'https://github.com/familjen/recept';
const TEAM = 'https://github.com/teamet/kafe';

export const PROJECTS = [
  // Bana 1: terminalen
  project({
    id: 'git-proj-skola',
    track: 'terminal',
    title: 'Skolmappen',
    reward: { emoji: '📒', name: 'Anteckningsbok' },
    summary: 'Bygg en mapp för skolarbetet – utan att röra musen.',
    steps: [
      {
        title: 'Mapparna',
        why: 'En mapp per ämne gör att du hittar allt igen. I terminalen tar det tre kommandon, oavsett hur många mappar det blir.',
        xp: 10,
        description: 'Allt skolarbete ska få en egen plats.',
        task: 'Uppgift: Skapa mappen `skola`, gå in i den och skapa mapparna `matte` och `svenska` där.',
        add: 'mkdir skola\ncd skola\nmkdir matte\nmkdir svenska\n',
        hints: [
          'Först mkdir skola, sedan cd skola.',
          'mkdir matte och mkdir svenska.',
          'Kolla med ls att båda finns.',
        ],
        tests: [
          { description: 'Du står i /hem/skola', cwd: '/hem/skola' },
          { description: 'matte finns', exists: 'matte' },
          { description: 'svenska finns', exists: 'svenska' },
        ],
      },
      {
        title: 'Läxan',
        why: 'En textfil med läxan är lätt att skapa och läsa direkt i terminalen. echo skriver, cat läser.',
        xp: 10,
        description: 'Skriv ner mattelaxan.',
        task: 'Uppgift: Gå in i `matte`, skapa filen `laxa.txt` med texten `Sidan 42` och visa den med `cat`.',
        add: 'cd matte\necho "Sidan 42" > laxa.txt\ncat laxa.txt\n',
        hints: ['cd matte', 'echo "Sidan 42" > laxa.txt', 'cat laxa.txt'],
        tests: [
          {
            description: 'laxa.txt innehåller Sidan 42',
            file: '/hem/skola/matte/laxa.txt',
            content: 'Sidan 42',
          },
          { description: 'Du visar läxan', output: '$ cat laxa.txt' },
        ],
      },
      {
        title: 'Bokrecensionen',
        why: '`..` betyder mappen ovanför. Med den tar du dig mellan mappar utan att skriva hela sökvägen.',
        xp: 15,
        description: 'Nu svenska: en tom fil för bokrecensionen.',
        task: 'Uppgift: Gå upp till `skola` med `cd ..`, in i `svenska`, skapa den tomma filen `bokrecension.txt` och gå tillbaka upp till `skola`.',
        add: 'cd ..\ncd svenska\ntouch bokrecension.txt\ncd ..\nls\n',
        hints: [
          'cd .. tar dig till skola.',
          'cd svenska och touch bokrecension.txt.',
          'cd .. igen, och ls för att se läget.',
        ],
        tests: [
          {
            description: 'bokrecension.txt finns i svenska',
            exists: '/hem/skola/svenska/bokrecension.txt',
          },
          { description: 'Du står i /hem/skola', cwd: '/hem/skola' },
        ],
      },
    ],
  }),
  project({
    id: 'git-proj-resa',
    track: 'terminal',
    title: 'Resan',
    reward: { emoji: '🧳', name: 'Resväska' },
    summary: 'Planera en resa i mappar och filer.',
    steps: [
      {
        title: 'Packlistan',
        why: '`>` skapar filen om den inte finns. Ett kommando räcker för både fil och innehåll.',
        xp: 10,
        description: 'Det viktigaste först.',
        task: 'Uppgift: Skapa mappen `resa`, gå in i den och skapa `packlista.txt` med texten `Pass`.',
        add: 'mkdir resa\ncd resa\necho "Pass" > packlista.txt\n',
        hints: [
          'mkdir resa och cd resa.',
          'echo "Pass" > packlista.txt',
          'cat packlista.txt visar vad som står.',
        ],
        tests: [
          { description: 'Du står i /hem/resa', cwd: '/hem/resa' },
          {
            description: 'packlista.txt innehåller Pass',
            file: 'packlista.txt',
            content: 'Pass',
          },
        ],
      },
      {
        title: 'Dagarna',
        why: 'touch skapar tomma filer. Det är ett snabbt sätt att göra en mall som du fyller i sedan.',
        xp: 10,
        description: 'En fil per dag på resan.',
        task: 'Uppgift: Skapa mappen `dagar`, gå in i den och skapa de tomma filerna `mandag.txt` och `tisdag.txt`. Lista dem med `ls`.',
        add: 'mkdir dagar\ncd dagar\ntouch mandag.txt\ntouch tisdag.txt\nls\n',
        hints: [
          'mkdir dagar och cd dagar.',
          'touch mandag.txt och touch tisdag.txt.',
          'ls visar filerna.',
        ],
        tests: [
          {
            description: 'mandag.txt finns',
            exists: '/hem/resa/dagar/mandag.txt',
          },
          {
            description: 'tisdag.txt finns',
            exists: '/hem/resa/dagar/tisdag.txt',
          },
        ],
      },
      {
        title: 'Planen',
        why: '`cd ..` två gånger tar dig två mappar upp. pwd visar alltid var du står, om du tappar bort dig.',
        xp: 15,
        description: 'Fyll i måndagen och gå hem igen.',
        task: 'Uppgift: Skriv `Tåget går kl 9` i `mandag.txt`, gå upp två mappar till `/hem` och visa var du står med `pwd`.',
        add: 'echo "Tåget går kl 9" > mandag.txt\ncd ..\ncd ..\npwd\n',
        hints: [
          'echo "Tåget går kl 9" > mandag.txt',
          'cd .. två gånger.',
          'pwd skriver ut /hem.',
        ],
        tests: [
          {
            description: 'mandag.txt har planen',
            file: '/hem/resa/dagar/mandag.txt',
            content: 'Tåget går kl 9',
          },
          { description: 'Du står i /hem', cwd: '/hem' },
        ],
      },
    ],
  }),
  project({
    id: 'git-proj-recept',
    track: 'terminal',
    title: 'Receptboken',
    reward: { emoji: '🍳', name: 'Stekpanna' },
    summary: 'Ordning på recepten, med en mapp per sorts mat.',
    steps: [
      {
        title: 'Kapitlen',
        why: 'Mappar är som kapitel i en bok. Bestäm ordningen först, så vet du var nya recept ska ligga.',
        xp: 10,
        description: 'Två kapitel: efterrätt och middag.',
        task: 'Uppgift: Skapa mappen `recept`, gå in i den och skapa mapparna `efterratt` och `middag`.',
        add: 'mkdir recept\ncd recept\nmkdir efterratt\nmkdir middag\n',
        hints: [
          'mkdir recept och cd recept.',
          'mkdir efterratt',
          'mkdir middag',
        ],
        tests: [
          { description: 'Du står i /hem/recept', cwd: '/hem/recept' },
          { description: 'efterratt finns', exists: 'efterratt' },
          { description: 'middag finns', exists: 'middag' },
        ],
      },
      {
        title: 'Pannkakor',
        why: 'Du behöver inte gå in i en mapp för att skriva en fil där – skriv sökvägen, `efterratt/pannkakor.txt`.',
        xp: 15,
        description: 'Det första receptet.',
        task: 'Uppgift: Utan att byta mapp: skapa `efterratt/pannkakor.txt` med texten `Mjöl, mjölk och ägg` och visa den med `cat`.',
        add: 'echo "Mjöl, mjölk och ägg" > efterratt/pannkakor.txt\ncat efterratt/pannkakor.txt\n',
        hints: [
          'Sökvägen är efterratt/pannkakor.txt.',
          'echo "Mjöl, mjölk och ägg" > efterratt/pannkakor.txt',
          'cat efterratt/pannkakor.txt',
        ],
        tests: [
          {
            description: 'Pannkaksreceptet',
            file: 'efterratt/pannkakor.txt',
            content: 'Mjöl, mjölk och ägg',
          },
          { description: 'Du står kvar i /hem/recept', cwd: '/hem/recept' },
        ],
      },
      {
        title: 'Middag',
        why: 'cd in, gör något och cd .. ut igen är ett vanligt mönster. Då står du alltid på samma ställe när du är klar.',
        xp: 15,
        description: 'Nu ett middagsrecept.',
        task: 'Uppgift: Gå in i `middag`, skapa `pasta.txt` med texten `Pasta och tomatsås`, och gå tillbaka till `recept`.',
        add: 'cd middag\necho "Pasta och tomatsås" > pasta.txt\ncd ..\n',
        hints: [
          'cd middag',
          'echo "Pasta och tomatsås" > pasta.txt',
          'cd .. tillbaka.',
        ],
        tests: [
          {
            description: 'Pastareceptet',
            file: 'middag/pasta.txt',
            content: 'Pasta och tomatsås',
          },
          { description: 'Du står i /hem/recept', cwd: '/hem/recept' },
        ],
      },
    ],
  }),

  // Bana 2: filer i terminalen
  project({
    id: 'git-proj-stada',
    track: 'filer',
    title: 'Städa nedladdningar',
    reward: { emoji: '🧹', name: 'Kvast' },
    summary: 'Mappen Nedladdningar är full av allt möjligt. Städa den.',
    setup:
      'mkdir nedladdningar\ncd nedladdningar\ntouch semester.jpg\ntouch film.jpg\ntouch kvitto.pdf\ntouch kopia-kvitto.pdf\ntouch gammal.tmp',
    setupNote:
      '📁 Du står i nedladdningar: semester.jpg, film.jpg, kvitto.pdf, kopia-kvitto.pdf och gammal.tmp.',
    steps: [
      {
        title: 'Mappar för allt',
        why: '`mkdir -p` skapar mappar i flera nivåer på en gång. Utan -p måste `sorterat` finnas först.',
        xp: 10,
        description: 'Bilder för sig, papper för sig.',
        task: 'Uppgift: Skapa mapparna `sorterat/bilder` och `sorterat/papper` med `mkdir -p`.',
        add: 'mkdir -p sorterat/bilder\nmkdir -p sorterat/papper\n',
        hints: [
          'mkdir -p skapar mappen ovanför också.',
          'mkdir -p sorterat/bilder',
          'mkdir -p sorterat/papper',
        ],
        tests: [
          { description: 'sorterat/bilder finns', exists: 'sorterat/bilder' },
          { description: 'sorterat/papper finns', exists: 'sorterat/papper' },
        ],
      },
      {
        title: 'Flytta',
        why: 'mv till en mapp flyttar filen dit och behåller namnet. Det är samma sak som att dra filen i Finder eller Utforskaren.',
        xp: 15,
        description: 'Allt på sin plats.',
        task: 'Uppgift: Flytta `semester.jpg` och `film.jpg` till `sorterat/bilder`, och `kvitto.pdf` till `sorterat/papper`.',
        add: 'mv semester.jpg sorterat/bilder\nmv film.jpg sorterat/bilder\nmv kvitto.pdf sorterat/papper\n',
        hints: [
          'mv fil mapp',
          'mv semester.jpg sorterat/bilder',
          'Tre mv, en per fil.',
        ],
        tests: [
          {
            description: 'semester.jpg ligger bland bilderna',
            exists: 'sorterat/bilder/semester.jpg',
          },
          {
            description: 'film.jpg ligger bland bilderna',
            exists: 'sorterat/bilder/film.jpg',
          },
          {
            description: 'kvitto.pdf ligger bland papperen',
            exists: 'sorterat/papper/kvitto.pdf',
          },
          { description: 'semester.jpg är flyttad', missing: 'semester.jpg' },
        ],
      },
      {
        title: 'Släng skräpet',
        why: 'rm tar bort på riktigt – det finns ingen papperskorg i terminalen. Därför städar man sist, när allt viktigt är flyttat.',
        xp: 15,
        description: 'Kopian och den gamla tillfälliga filen behövs inte.',
        task: 'Uppgift: Ta bort `kopia-kvitto.pdf` och `gammal.tmp`. Kolla med `ls` att bara `sorterat` är kvar.',
        add: 'rm kopia-kvitto.pdf\nrm gammal.tmp\nls\n',
        hints: [
          'rm följt av filnamnet.',
          'rm kopia-kvitto.pdf',
          'rm gammal.tmp',
        ],
        tests: [
          { description: 'Kopian är borta', missing: 'kopia-kvitto.pdf' },
          { description: 'gammal.tmp är borta', missing: 'gammal.tmp' },
          {
            description: 'Kvittot finns kvar',
            exists: 'sorterat/papper/kvitto.pdf',
          },
        ],
      },
    ],
  }),
  project({
    id: 'git-proj-dagbok',
    track: 'filer',
    title: 'Dagboken',
    reward: { emoji: '📔', name: 'Dagbok' },
    summary: 'En dagbok som växer en rad i taget.',
    steps: [
      {
        title: 'Två dagar',
        why: '`>` skriver över hela filen, `>>` lägger till en rad sist. En dagbok ska växa, så den behöver >>.',
        xp: 10,
        description: 'Skriv måndag och tisdag.',
        task: 'Uppgift: Skapa mappen `dagbok` och gå in i den. Skriv `Måndag: regn` till `vecka.txt` och lägg sedan till `Tisdag: sol` på en ny rad.',
        add: `mkdir dagbok\ncd dagbok\n${write('vecka.txt', ['Måndag: regn', 'Tisdag: sol'])}\n`,
        hints: [
          'mkdir dagbok och cd dagbok.',
          'echo "Måndag: regn" > vecka.txt',
          'echo "Tisdag: sol" >> vecka.txt',
        ],
        tests: [
          {
            description: 'vecka.txt har två rader',
            file: '/hem/dagbok/vecka.txt',
            content: 'Måndag: regn\nTisdag: sol',
          },
        ],
      },
      {
        title: 'Säkerhetskopian',
        why: 'cp gör en kopia som inte ändras när originalet ändras. Så sparar man en version innan man fortsätter skriva.',
        xp: 15,
        description: 'Spara en kopia innan du skriver mer.',
        task: 'Uppgift: Kopiera `vecka.txt` till `vecka-kopia.txt`. Lägg sedan till `Onsdag: snö` i `vecka.txt` (inte i kopian).',
        add: 'cp vecka.txt vecka-kopia.txt\necho "Onsdag: snö" >> vecka.txt\n',
        hints: [
          'cp original kopia',
          'cp vecka.txt vecka-kopia.txt',
          'echo "Onsdag: snö" >> vecka.txt',
        ],
        tests: [
          {
            description: 'Kopian har två rader',
            file: 'vecka-kopia.txt',
            content: 'Måndag: regn\nTisdag: sol',
          },
          {
            description: 'vecka.txt har tre rader',
            file: 'vecka.txt',
            content: 'Måndag: regn\nTisdag: sol\nOnsdag: snö',
          },
        ],
      },
      {
        title: 'Det hemliga',
        why: 'Filer som börjar med punkt syns inte med vanlig ls. Det är så program gömmer inställningar – `ls -a` visar dem.',
        xp: 15,
        description: 'En hemlig anteckning som inte syns direkt.',
        task: 'Uppgift: Skapa den dolda filen `.hemlis.txt` med texten `Hemligt`, och visa den med `ls -a`.',
        add: 'echo "Hemligt" > .hemlis.txt\nls -a\n',
        hints: [
          'Namnet börjar med en punkt.',
          'echo "Hemligt" > .hemlis.txt',
          'ls -a visar dolda filer.',
        ],
        tests: [
          {
            description: '.hemlis.txt finns',
            file: '.hemlis.txt',
            content: 'Hemligt',
          },
          { description: 'Du listar med ls -a', output: '$ ls -a' },
        ],
      },
    ],
  }),
  project({
    id: 'git-proj-flytt',
    track: 'filer',
    title: 'Flytta om projektet',
    reward: { emoji: '📦', name: 'Flyttkartong' },
    summary: 'En hemsida ska flytta till en ny, prydligare mapp.',
    setup:
      'mkdir gammalt\ncd gammalt\necho "<h1>Hej</h1>" > index.html\necho "body {}" > stil.css\nmkdir skrap\ntouch skrap/a.txt\ncd ..',
    setupNote:
      '📁 Du står i /hem. Mappen gammalt har index.html, stil.css och mappen skrap.',
    steps: [
      {
        title: 'Den nya mappen',
        why: 'Att kopiera först och ta bort sist är tryggt: går något fel finns originalet kvar.',
        xp: 10,
        description: 'Gör den nya mappen och kopiera startsidan.',
        task: 'Uppgift: Skapa `nytt/css` med `mkdir -p`, och kopiera `gammalt/index.html` till `nytt/index.html`.',
        add: 'mkdir -p nytt/css\ncp gammalt/index.html nytt/index.html\n',
        hints: [
          'mkdir -p nytt/css',
          'cp gammalt/index.html nytt/index.html',
          'cat nytt/index.html för att se att den kom med.',
        ],
        tests: [
          { description: 'nytt/css finns', exists: 'nytt/css' },
          {
            description: 'Startsidan är kopierad',
            file: 'nytt/index.html',
            content: '<h1>Hej</h1>',
          },
        ],
      },
      {
        title: 'Stilen',
        why: 'mv flyttar och kan byta mapp i samma kommando. CSS-filen hamnar där den hör hemma.',
        xp: 15,
        description: 'CSS-filen ska ligga i css-mappen.',
        task: 'Uppgift: Flytta `gammalt/stil.css` till `nytt/css/stil.css`.',
        add: 'mv gammalt/stil.css nytt/css/stil.css\n',
        hints: [
          'mv från till',
          'Från gammalt/stil.css till nytt/css/stil.css.',
          'mv gammalt/stil.css nytt/css/stil.css',
        ],
        tests: [
          {
            description: 'Stilen ligger i nytt/css',
            exists: 'nytt/css/stil.css',
          },
          {
            description: 'Den är borta ur gammalt',
            missing: 'gammalt/stil.css',
          },
        ],
      },
      {
        title: 'Riv det gamla',
        why: 'rm -r tar bort en mapp med allt i den. Kraftfullt och farligt – därför sist, när allt viktigt är flyttat.',
        xp: 15,
        description: 'Den gamla mappen behövs inte längre.',
        task: 'Uppgift: Ta bort hela mappen `gammalt` med `rm -r`, och lista med `ls`.',
        add: 'rm -r gammalt\nls\n',
        hints: [
          'rm -r tar bort mappar.',
          'rm -r gammalt',
          'ls visar bara nytt.',
        ],
        tests: [
          { description: 'gammalt är borta', missing: 'gammalt' },
          { description: 'Startsidan finns kvar', exists: 'nytt/index.html' },
        ],
      },
    ],
  }),

  // Bana 3: din första commit
  project({
    id: 'git-proj-dikt',
    track: 'commit',
    title: 'Dikten',
    reward: { emoji: '✒️', name: 'Reservoarpenna' },
    summary: 'Skriv en dikt, en vers i taget, och spara varje vers i Git.',
    steps: [
      {
        title: 'Ett repo',
        why: 'git init gör mappen till ett repo. Först då kan Git börja minnas versionerna.',
        xp: 10,
        description: 'Mappen och första raden.',
        task: 'Uppgift: Skapa mappen `dikt`, gå in i den, kör `git init` och skriv `Rosor är röda` till `dikt.txt`. Kolla läget med `git status`.',
        add: 'mkdir dikt\ncd dikt\ngit init\necho "Rosor är röda" > dikt.txt\ngit status\n',
        hints: [
          'mkdir dikt och cd dikt.',
          'git init',
          'echo "Rosor är röda" > dikt.txt och git status.',
        ],
        tests: [
          { description: 'Repot finns, utan commits', commits: 0 },
          {
            description: 'dikt.txt har första raden',
            file: '/hem/dikt/dikt.txt',
            content: 'Rosor är röda',
          },
        ],
      },
      {
        title: 'Första versen',
        why: 'add väljer vad som ska med, commit sparar det. Två steg, så att du bestämmer exakt vad varje version innehåller.',
        xp: 15,
        description: 'Spara den första versionen.',
        task: 'Uppgift: Lägg till `dikt.txt` och committa med meddelandet `Första versen`.',
        add: 'git add dikt.txt\ngit commit -m "Första versen"\n',
        hints: [
          'git add dikt.txt',
          'git commit -m "meddelande"',
          'git commit -m "Första versen"',
        ],
        tests: [
          { description: 'En commit', commits: 1 },
          { description: 'Meddelandet', message: 'Första versen' },
        ],
      },
      {
        title: 'Andra versen',
        why: 'git log visar historien. Varje vers är en egen version som du kan gå tillbaka till.',
        xp: 15,
        description: 'Fortsätt dikten och spara igen.',
        task: 'Uppgift: Lägg till raden `Violer är blå` i `dikt.txt`, committa med `Andra versen` och visa historien med `git log`.',
        add: 'echo "Violer är blå" >> dikt.txt\ngit add dikt.txt\ngit commit -m "Andra versen"\ngit log\n',
        hints: [
          'echo "Violer är blå" >> dikt.txt',
          'git add och git commit -m "Andra versen".',
          'git log',
        ],
        tests: [
          { description: 'Två commits', commits: 2 },
          { description: 'Meddelandet', message: 'Andra versen' },
          { description: 'Allt är committat', clean: true },
        ],
      },
    ],
  }),
  project({
    id: 'git-proj-cv',
    track: 'commit',
    title: 'CV:t',
    reward: { emoji: '👔', name: 'Slips' },
    summary: 'Ett CV i Git, med en commit per del.',
    steps: [
      {
        title: 'Bara CV:t',
        why: 'Du behöver inte lägga till allt på en gång. git add med ett filnamn väljer just den filen.',
        xp: 10,
        description: 'Två filer, men bara en ska med först.',
        task: 'Uppgift: Skapa mappen `cv`, gå in och kör `git init`. Skriv `Namn: Kim` till `cv.txt` och `Kan: Python` till `kunskaper.txt`. Lägg bara till `cv.txt`.',
        add: 'mkdir cv\ncd cv\ngit init\necho "Namn: Kim" > cv.txt\necho "Kan: Python" > kunskaper.txt\ngit add cv.txt\n',
        hints: [
          'mkdir cv, cd cv och git init.',
          'Två echo, en per fil.',
          'git add cv.txt',
        ],
        tests: [{ description: 'Bara cv.txt är tillagd', staged: ['cv.txt'] }],
      },
      {
        title: 'En commit per del',
        why: 'Små commits som gör en sak var är lättare att förstå i efterhand – och att ångra.',
        xp: 15,
        description: 'Committa CV:t, sedan kunskaperna.',
        task: 'Uppgift: Committa med `Lägg till CV`. Lägg sedan till `kunskaper.txt` och committa med `Lägg till kunskaper`.',
        add: 'git commit -m "Lägg till CV"\ngit add kunskaper.txt\ngit commit -m "Lägg till kunskaper"\n',
        hints: [
          'git commit -m "Lägg till CV"',
          'git add kunskaper.txt',
          'git commit -m "Lägg till kunskaper"',
        ],
        tests: [
          { description: 'Två commits', commits: 2 },
          { description: 'Meddelandet', message: 'Lägg till kunskaper' },
          { description: 'Allt är committat', clean: true },
        ],
      },
      {
        title: 'Något nytt',
        why: '`git add .` lägger till allt som ändrats i mappen. Bra när du vet att allt hör ihop.',
        xp: 15,
        description: 'Du har lärt dig Git!',
        task: 'Uppgift: Lägg till raden `Kan: Git` i `kunskaper.txt`. Kolla med `git status`, lägg till allt med `git add .` och committa med `Lär mig Git`. Visa historien.',
        add: 'echo "Kan: Git" >> kunskaper.txt\ngit status\ngit add .\ngit commit -m "Lär mig Git"\ngit log\n',
        hints: [
          'echo "Kan: Git" >> kunskaper.txt',
          'git add .',
          'git commit -m "Lär mig Git" och git log.',
        ],
        tests: [
          { description: 'Tre commits', commits: 3 },
          { description: 'Meddelandet', message: 'Lär mig Git' },
          {
            description: 'Kunskaperna',
            file: 'kunskaper.txt',
            content: 'Kan: Python\nKan: Git',
          },
        ],
      },
    ],
  }),
  project({
    id: 'git-proj-spel',
    track: 'commit',
    title: 'Spelidéer',
    reward: { emoji: '🎲', name: 'Tärning' },
    summary: 'Samla idéer till ett spel och spara dem i Git.',
    steps: [
      {
        title: 'Första banan',
        why: 'Git sparar mappar också, så länge det finns filer i dem.',
        xp: 10,
        description: 'Ett repo med en mapp för banorna.',
        task: 'Uppgift: Skapa `spel`, gå in och kör `git init`. Skapa mappen `banor` och filen `banor/skog.txt` med `Bana 1: skogen`. Lägg till allt och committa med `Första banan`.',
        add: 'mkdir spel\ncd spel\ngit init\nmkdir banor\necho "Bana 1: skogen" > banor/skog.txt\ngit add .\ngit commit -m "Första banan"\n',
        hints: [
          'mkdir spel, cd spel, git init.',
          'mkdir banor och echo "Bana 1: skogen" > banor/skog.txt',
          'git add . och git commit -m "Första banan"',
        ],
        tests: [
          { description: 'En commit', commits: 1 },
          { description: 'Meddelandet', message: 'Första banan' },
        ],
      },
      {
        title: 'Grottan och hjälten',
        why: 'En commit kan ha flera filer. Det som hör ihop sparas ihop.',
        xp: 15,
        description: 'En bana till och en hjälte.',
        task: 'Uppgift: Skapa `banor/grotta.txt` med `Bana 2: grottan` och `hjalte.txt` med `Hjälten heter Bo`. Committa båda med `Grottan och hjälten`.',
        add: 'echo "Bana 2: grottan" > banor/grotta.txt\necho "Hjälten heter Bo" > hjalte.txt\ngit add .\ngit commit -m "Grottan och hjälten"\n',
        hints: [
          'Två echo med >.',
          'git add .',
          'git commit -m "Grottan och hjälten"',
        ],
        tests: [
          { description: 'Två commits', commits: 2 },
          {
            description: 'Git följer alla tre filerna',
            tracked: ['banor/grotta.txt', 'banor/skog.txt', 'hjalte.txt'],
          },
        ],
      },
      {
        title: 'Bossen',
        why: 'git status visar vad som ändrats sedan senaste commit. Kolla den innan du committar, så vet du vad som följer med.',
        xp: 15,
        description: 'Grottan behöver en boss.',
        task: 'Uppgift: Lägg till raden `Bossen: draken` i `banor/grotta.txt`. Kolla med `git status`, committa med `Lägg till draken` och visa historien.',
        add: 'echo "Bossen: draken" >> banor/grotta.txt\ngit status\ngit add banor/grotta.txt\ngit commit -m "Lägg till draken"\ngit log\n',
        hints: [
          'echo "Bossen: draken" >> banor/grotta.txt',
          'git add banor/grotta.txt',
          'git commit -m "Lägg till draken"',
        ],
        tests: [
          { description: 'Tre commits', commits: 3 },
          { description: 'Meddelandet', message: 'Lägg till draken' },
          { description: 'Allt är committat', clean: true },
        ],
      },
    ],
  }),

  // Bana 4: ändringar
  project({
    id: 'git-proj-handla',
    track: 'andringar',
    title: 'Inköpslistan',
    reward: { emoji: '🛒', name: 'Kundvagn' },
    summary: 'Se, spara och ångra ändringar i en inköpslista.',
    setup:
      'mkdir handla\ncd handla\ngit init\necho "Mjölk" > lista.txt\ngit add .\ngit commit -m "Första listan"',
    setupNote: '📁 Du står i repot handla. lista.txt har Mjölk.',
    steps: [
      {
        title: 'Vad ändrades?',
        why: 'git diff visar exakt vad som ändrats sedan senaste commit. Plus är nytt, minus är borttaget.',
        xp: 10,
        description: 'Lägg till något och se ändringen.',
        task: 'Uppgift: Lägg till raden `Bröd` i `lista.txt` och visa ändringen med `git diff`.',
        add: 'echo "Bröd" >> lista.txt\ngit diff\n',
        hints: [
          'echo "Bröd" >> lista.txt',
          'git diff',
          'Raden med + framför är det nya.',
        ],
        tests: [{ description: 'Diffen visar +Bröd', output: '+Bröd' }],
      },
      {
        title: 'Spara',
        why: '`git log --oneline` visar en commit per rad. Bra när historien blir lång.',
        xp: 15,
        description: 'Brödet ska med.',
        task: 'Uppgift: Committa med `Lägg till bröd` och visa historien med `git log --oneline`.',
        add: 'git add lista.txt\ngit commit -m "Lägg till bröd"\ngit log --oneline\n',
        hints: [
          'git add lista.txt',
          'git commit -m "Lägg till bröd"',
          'git log --oneline',
        ],
        tests: [
          { description: 'Två commits', commits: 2 },
          { description: 'Meddelandet', message: 'Lägg till bröd' },
        ],
      },
      {
        title: 'Ångra',
        why: 'git restore tar tillbaka filen som den var i senaste commit. Allt du ändrat efter det försvinner.',
        xp: 15,
        description: 'Godis var ingen bra idé.',
        task: 'Uppgift: Lägg till `Godis` i listan, ångra det med `git restore lista.txt` och visa listan med `cat`.',
        add: 'echo "Godis" >> lista.txt\ngit restore lista.txt\ncat lista.txt\n',
        hints: [
          'echo "Godis" >> lista.txt',
          'git restore lista.txt',
          'cat lista.txt visar Mjölk och Bröd.',
        ],
        tests: [
          {
            description: 'Listan är som i senaste commit',
            file: 'lista.txt',
            content: 'Mjölk\nBröd',
          },
          { description: 'Du ångrade med restore', output: '$ git restore' },
        ],
      },
    ],
  }),
  project({
    id: 'git-proj-hemlis',
    track: 'andringar',
    title: 'Lösenordet stannar hemma',
    reward: { emoji: '🔒', name: 'Hänglås' },
    summary:
      'Ett program med ett lösenord i en fil – som aldrig får hamna i Git.',
    setup:
      'mkdir app\ncd app\ngit init\necho "print(\'hej\')" > app.py\necho "LOSEN=hemligt" > .env\nmkdir cache\ntouch cache/temp.txt',
    setupNote:
      '📁 Du står i repot app: app.py, .env (med ett lösenord) och mappen cache.',
    steps: [
      {
        title: '.gitignore',
        why: 'Filerna som står i .gitignore låtsas Git inte se. Lösenord och tillfälliga filer ska stå där – innan första commit.',
        xp: 15,
        description: 'Säg åt Git att strunta i .env och cache.',
        task: 'Uppgift: Skriv `.env` till filen `.gitignore` och lägg till raden `cache/`. Kolla med `git status`.',
        add: `${write('.gitignore', ['.env', 'cache/'])}\ngit status\n`,
        hints: [
          'echo ".env" > .gitignore',
          'echo "cache/" >> .gitignore',
          'git status visar inte längre .env.',
        ],
        tests: [
          {
            description: '.gitignore har två rader',
            file: '.gitignore',
            content: '.env\ncache/',
          },
        ],
      },
      {
        title: 'Första commit',
        why: '`git add .` lägger till allt – utom det som står i .gitignore. Därför är ordningen viktig.',
        xp: 15,
        description: 'Nu är det säkert att lägga till allt.',
        task: 'Uppgift: Lägg till allt med `git add .` och committa med `Första versionen`.',
        add: 'git add .\ngit commit -m "Första versionen"\n',
        hints: [
          'git add .',
          'git commit -m "Första versionen"',
          'Bara .gitignore och app.py följer med.',
        ],
        tests: [
          { description: 'En commit', commits: 1 },
          {
            description: 'Git följer bara .gitignore och app.py',
            tracked: ['.gitignore', 'app.py'],
          },
        ],
      },
      {
        title: 'Byt lösenord',
        why: 'Ändringar i .env syns aldrig för Git. Du kan byta lösenord hur ofta du vill utan att det hamnar i historien.',
        xp: 15,
        description: 'Ändra programmet och lösenordet.',
        task: "Uppgift: Lägg till raden `print('hej då')` i `app.py` och skriv `LOSEN=nytt` till `.env`. Committa med `Säg hej då`.",
        add: 'echo "print(\'hej då\')" >> app.py\necho "LOSEN=nytt" > .env\ngit add .\ngit commit -m "Säg hej då"\n',
        hints: [
          'echo med >> till app.py.',
          'echo "LOSEN=nytt" > .env',
          'git add . och git commit -m "Säg hej då"',
        ],
        tests: [
          { description: 'Två commits', commits: 2 },
          {
            description: '.env är fortfarande utanför Git',
            tracked: ['.gitignore', 'app.py'],
          },
          { description: 'Inget kvar att committa', clean: true },
        ],
      },
    ],
  }),
  project({
    id: 'git-proj-uppsats',
    track: 'andringar',
    title: 'Uppsatsen',
    reward: { emoji: '📜', name: 'Pergament' },
    summary: 'Två filer, men bara den ena är klar att sparas.',
    setup:
      'mkdir uppsats\ncd uppsats\ngit init\necho "Inledning" > text.txt\necho "Källor" > kallor.txt\ngit add .\ngit commit -m "Start"',
    setupNote: '📁 Du står i repot uppsats: text.txt och kallor.txt.',
    steps: [
      {
        title: 'En fil i taget',
        why: 'Du kan ändra två filer men committa bara den ena. Den andra väntar tills den är klar.',
        xp: 15,
        description: 'Texten är klar, källorna inte.',
        task: 'Uppgift: Lägg till `Mitten` i `text.txt` och `Wikipedia` i `kallor.txt`. Committa bara `text.txt`, med `Skriv mitten`.',
        add: 'echo "Mitten" >> text.txt\necho "Wikipedia" >> kallor.txt\ngit add text.txt\ngit commit -m "Skriv mitten"\n',
        hints: [
          'Två echo med >>.',
          'git add text.txt – inte punkt.',
          'git commit -m "Skriv mitten"',
        ],
        tests: [
          { description: 'Två commits', commits: 2 },
          { description: 'Meddelandet', message: 'Skriv mitten' },
          {
            description: 'Wikipedia står kvar i kallor.txt',
            file: 'kallor.txt',
            content: 'Källor\nWikipedia',
          },
        ],
      },
      {
        title: 'Inte Wikipedia',
        why: 'Läraren vill ha riktiga källor. Med diff ser du ändringen och med restore tar du bort den.',
        xp: 15,
        description: 'Ångra källan.',
        task: 'Uppgift: Visa ändringen i `kallor.txt` med `git diff` och ångra den med `git restore`.',
        add: 'git diff\ngit restore kallor.txt\n',
        hints: [
          'git diff',
          'git restore kallor.txt',
          'git status säger att allt är rent.',
        ],
        tests: [
          {
            description: 'kallor.txt är tillbaka',
            file: 'kallor.txt',
            content: 'Källor',
          },
          { description: 'Allt är committat', clean: true },
        ],
      },
      {
        title: 'Slutsatsen',
        why: 'log --oneline visar uppsatsens hela historia, en rad per steg.',
        xp: 15,
        description: 'Avsluta uppsatsen.',
        task: 'Uppgift: Lägg till `Slutsats` i `text.txt`, committa med `Skriv slutsatsen` och visa historien med `git log --oneline`.',
        add: 'echo "Slutsats" >> text.txt\ngit add text.txt\ngit commit -m "Skriv slutsatsen"\ngit log --oneline\n',
        hints: [
          'echo "Slutsats" >> text.txt',
          'git add text.txt och git commit -m "Skriv slutsatsen".',
          'git log --oneline',
        ],
        tests: [
          { description: 'Tre commits', commits: 3 },
          { description: 'Meddelandet', message: 'Skriv slutsatsen' },
        ],
      },
    ],
  }),

  // Bana 5: grenar
  project({
    id: 'git-proj-tema',
    track: 'grenar',
    title: 'Mörkt tema',
    reward: { emoji: '🌙', name: 'Måne' },
    summary: 'Prova ett mörkt tema på en egen gren.',
    setup:
      'mkdir sida\ncd sida\ngit init\necho "body { color: black; }" > stil.css\ngit add .\ngit commit -m "Första stilen"',
    setupNote: '📁 Du står på main i repot sida.',
    steps: [
      {
        title: 'Prova på en gren',
        why: 'På en egen gren kan du prova vad som helst. main påverkas inte förrän du slår ihop.',
        xp: 15,
        description: 'Ett mörkt tema, på prov.',
        task: 'Uppgift: Skapa och byt till grenen `morkt`. Lägg till raden `body { background: black; }` i `stil.css` och committa med `Mörk bakgrund`.',
        add: 'git switch -c morkt\necho "body { background: black; }" >> stil.css\ngit add .\ngit commit -m "Mörk bakgrund"\n',
        hints: [
          'git switch -c morkt',
          'echo med >> till stil.css.',
          'git add . och git commit -m "Mörk bakgrund"',
        ],
        tests: [
          { description: 'Du står på morkt', branch: 'morkt' },
          { description: 'Två commits', commits: 2 },
        ],
      },
      {
        title: 'main är orörd',
        why: 'Byter du gren byts filerna också. På main finns bara den gamla stilen.',
        xp: 10,
        description: 'Kolla att main är som förut.',
        task: 'Uppgift: Byt till `main` och visa `stil.css` med `cat`.',
        add: 'git switch main\ncat stil.css\n',
        hints: [
          'git switch main',
          'cat stil.css',
          'Bara en rad – den mörka finns bara på morkt.',
        ],
        tests: [
          { description: 'Du står på main', branch: 'main' },
          {
            description: 'stil.css har en rad',
            file: 'stil.css',
            content: 'body { color: black; }',
          },
        ],
      },
      {
        title: 'Det blev bra',
        why: 'När grenen är klar slår du ihop den och tar bort den. Då är main uppdaterad och grenlistan ren.',
        xp: 15,
        description: 'Temat ska in på riktigt.',
        task: 'Uppgift: Slå ihop `morkt` med main och ta bort grenen `morkt`.',
        add: 'git merge morkt\ngit branch -d morkt\n',
        hints: [
          'git merge morkt',
          'git branch -d morkt',
          'git branch visar bara main.',
        ],
        tests: [
          { description: 'Bara main finns kvar', branches: ['main'] },
          {
            description: 'stil.css har båda raderna',
            file: 'stil.css',
            content: 'body { color: black; }\nbody { background: black; }',
          },
        ],
      },
    ],
  }),
  project({
    id: 'git-proj-meny',
    track: 'grenar',
    title: 'Två idéer samtidigt',
    reward: { emoji: '🍕', name: 'Pizza' },
    summary: 'Kaféet testar bakverk och drinkar på var sin gren.',
    setup:
      'mkdir kafe\ncd kafe\ngit init\necho "Kaffe" > meny.txt\ngit add .\ngit commit -m "Menyn"',
    setupNote: '📁 Du står på main i repot kafe.',
    steps: [
      {
        title: 'Två grenar',
        why: 'Du kan ha hur många grenar du vill. Varje idé får en egen.',
        xp: 10,
        description: 'En gren per idé.',
        task: 'Uppgift: Skapa grenarna `bakverk` och `drinkar` (utan att byta) och lista grenarna.',
        add: 'git branch bakverk\ngit branch drinkar\ngit branch\n',
        hints: [
          'git branch bakverk',
          'git branch drinkar',
          'git branch listar.',
        ],
        tests: [
          {
            description: 'Tre grenar',
            branches: ['bakverk', 'drinkar', 'main'],
          },
          { description: 'Du står kvar på main', branch: 'main' },
        ],
      },
      {
        title: 'Jobba på båda',
        why: 'Filen du skapar på en gren finns bara där. Byter du gren försvinner den – tills du byter tillbaka.',
        xp: 15,
        description: 'En fil på varje gren.',
        task: 'Uppgift: På `bakverk`: skapa `bakverk.txt` med `Bulle` och committa med `Bullar`. På `drinkar`: skapa `drinkar.txt` med `Te` och committa med `Te`.',
        add: 'git switch bakverk\necho "Bulle" > bakverk.txt\ngit add .\ngit commit -m "Bullar"\ngit switch drinkar\necho "Te" > drinkar.txt\ngit add .\ngit commit -m "Te"\n',
        hints: [
          'git switch bakverk, echo, add och commit.',
          'Samma sak på drinkar.',
          'På drinkar syns inte bakverk.txt.',
        ],
        tests: [
          { description: 'Du står på drinkar', branch: 'drinkar' },
          { description: 'drinkar.txt finns', exists: 'drinkar.txt' },
          { description: 'bakverk.txt syns inte här', missing: 'bakverk.txt' },
        ],
      },
      {
        title: 'Båda in',
        why: 'Ändrar grenarna olika filer kan Git slå ihop dem utan att fråga.',
        xp: 15,
        description: 'Båda idéerna blev bra.',
        task: 'Uppgift: Byt till `main` och slå ihop först `bakverk` och sedan `drinkar`. Lista filerna med `ls`.',
        add: 'git switch main\ngit merge bakverk\ngit merge drinkar\nls\n',
        hints: ['git switch main', 'git merge bakverk', 'git merge drinkar'],
        tests: [
          { description: 'Du står på main', branch: 'main' },
          { description: 'bakverk.txt finns', exists: 'bakverk.txt' },
          { description: 'drinkar.txt finns', exists: 'drinkar.txt' },
        ],
      },
    ],
  }),
  project({
    id: 'git-proj-bugg',
    track: 'grenar',
    title: 'Laga buggen',
    reward: { emoji: '🐛', name: 'Skalbagge' },
    summary: 'Poängen börjar på -1. Laga det på en gren, som proffsen gör.',
    setup: `mkdir spel\ncd spel\ngit init\n${write('spel.py', ['liv = 3', 'poang = -1'])}\ngit add .\ngit commit -m "Spelet"`,
    setupNote:
      '📁 Du står på main i repot spel. spel.py har en bugg: poang = -1.',
    steps: [
      {
        title: 'En gren för lagningen',
        why: 'Även små lagningar görs på en gren. Då kan någon titta på ändringen innan den kommer in.',
        xp: 15,
        description: 'Laga och se ändringen.',
        task: 'Uppgift: Skapa och byt till grenen `laga-poang`. Skriv om `spel.py` så att raderna är `liv = 3` och `poang = 0`, och visa ändringen med `git diff`.',
        add: `git switch -c laga-poang\n${write('spel.py', ['liv = 3', 'poang = 0'])}\ngit diff\n`,
        hints: [
          'git switch -c laga-poang',
          'echo "liv = 3" > spel.py och echo "poang = 0" >> spel.py',
          'git diff',
        ],
        tests: [
          { description: 'Du står på laga-poang', branch: 'laga-poang' },
          { description: 'Diffen visar lagningen', output: '+poang = 0' },
        ],
      },
      {
        title: 'Committa',
        why: 'Ett meddelande som säger vad som lagades hjälper den som läser historien sedan.',
        xp: 10,
        description: 'Spara lagningen på grenen.',
        task: 'Uppgift: Committa med `Poängen börjar på 0`.',
        add: 'git add .\ngit commit -m "Poängen börjar på 0"\n',
        hints: [
          'git add .',
          'git commit -m "Poängen börjar på 0"',
          'git status: allt rent.',
        ],
        tests: [
          { description: 'Två commits på grenen', commits: 2 },
          { description: 'Meddelandet', message: 'Poängen börjar på 0' },
        ],
      },
      {
        title: 'In i main',
        why: 'När main inte ändrats under tiden spolar Git bara fram main till grenen – det kallas fast-forward.',
        xp: 15,
        description: 'Lagningen ska in.',
        task: 'Uppgift: Byt till `main`, slå ihop `laga-poang`, ta bort grenen och visa historien med `git log --oneline`.',
        add: 'git switch main\ngit merge laga-poang\ngit branch -d laga-poang\ngit log --oneline\n',
        hints: [
          'git switch main',
          'git merge laga-poang',
          'git branch -d laga-poang',
        ],
        tests: [
          { description: 'Bara main finns kvar', branches: ['main'] },
          {
            description: 'Lagningen är på main',
            file: 'spel.py',
            content: 'liv = 3\npoang = 0',
          },
        ],
      },
    ],
  }),

  // Bana 6: konflikter
  project({
    id: 'git-proj-affisch',
    track: 'konflikter',
    title: 'Festaffischen',
    reward: { emoji: '🎨', name: 'Palett' },
    summary: 'Två personer ändrade datumet på affischen. Vilket gäller?',
    setup: conflict(
      'affisch',
      'affisch.txt',
      ['Fest!', 'Datum: fredag'],
      ['Fest!', 'Datum: söndag'],
      ['Fest!', 'Datum: lördag'],
      'lordag',
    ),
    setupNote:
      '📁 Du står på main i repot affisch. main säger söndag, grenen lordag säger lördag.',
    steps: [
      {
        title: 'Krocken',
        why: 'När två grenar ändrat samma rad vet Git inte vilken som gäller. Den skriver in båda i filen, med markeringar.',
        xp: 10,
        description: 'Slå ihop och se vad som händer.',
        task: 'Uppgift: Slå ihop `lordag` och visa `affisch.txt` med `cat`.',
        add: 'git merge lordag\ncat affisch.txt\n',
        hints: [
          'git merge lordag',
          'cat affisch.txt',
          'Mellan <<<<<<< och >>>>>>> står båda versionerna.',
        ],
        tests: [
          { description: 'Konflikten syns', output: '<<<<<<< HEAD' },
          { description: 'Lördag finns med', output: 'Datum: lördag' },
        ],
      },
      {
        title: 'Bestäm',
        why: 'Du lagar en konflikt genom att skriva filen som den ska vara, utan markeringar. git add säger att den är klar.',
        xp: 15,
        description: 'Festen blir på lördag.',
        task: 'Uppgift: Skriv om `affisch.txt` till `Fest!` och `Datum: lördag`, och lägg till den med `git add`.',
        add: `${write('affisch.txt', ['Fest!', 'Datum: lördag'])}\ngit add affisch.txt\n`,
        hints: [
          'echo "Fest!" > affisch.txt',
          'echo "Datum: lördag" >> affisch.txt',
          'git add affisch.txt',
        ],
        tests: [
          {
            description: 'Affischen utan markeringar',
            file: 'affisch.txt',
            content: 'Fest!\nDatum: lördag',
          },
        ],
      },
      {
        title: 'Klart',
        why: 'Commiten avslutar sammanslagningen. Den får två föräldrar – en från varje gren.',
        xp: 15,
        description: 'Avsluta sammanslagningen.',
        task: 'Uppgift: Committa med `Festen blir på lördag` och visa historien med `git log --oneline`.',
        add: 'git commit -m "Festen blir på lördag"\ngit log --oneline\n',
        hints: [
          'git commit -m "…"',
          'git commit -m "Festen blir på lördag"',
          'git log --oneline',
        ],
        tests: [
          { description: 'Sammanslagningen är klar', merged: true },
          { description: 'Meddelandet', message: 'Festen blir på lördag' },
          { description: 'Allt är committat', clean: true },
        ],
      },
    ],
  }),
  project({
    id: 'git-proj-lag',
    track: 'konflikter',
    title: 'Laguppställningen',
    reward: { emoji: '⚽', name: 'Fotboll' },
    summary: 'Två tränare valde olika målvakter. Ibland är svaret: båda.',
    setup: conflict(
      'lag',
      'lag.txt',
      ['Lag: Blå', 'Målvakt: ?'],
      ['Lag: Blå', 'Målvakt: Ali'],
      ['Lag: Blå', 'Målvakt: Bea'],
      'kompis',
    ),
    setupNote:
      '📁 Du står på main i repot lag. main säger Ali, grenen kompis säger Bea.',
    steps: [
      {
        title: 'Vad säger Git?',
        why: 'git status under en konflikt visar vilka filer som krockar och vad du ska göra.',
        xp: 10,
        description: 'Slå ihop och läs läget.',
        task: 'Uppgift: Slå ihop `kompis` och kör `git status`.',
        add: 'git merge kompis\ngit status\n',
        hints: [
          'git merge kompis',
          'git status',
          'lag.txt står under Unmerged paths.',
        ],
        tests: [
          {
            description: 'Git säger att lag.txt krockar',
            output: 'Merge conflict in lag.txt',
          },
        ],
      },
      {
        title: 'Båda får plats',
        why: 'Du behöver inte välja en av versionerna. Ibland är den bästa lösningen något tredje.',
        xp: 15,
        description: 'Ali i mål, Bea reserv.',
        task: 'Uppgift: Skriv om `lag.txt` till tre rader: `Lag: Blå`, `Målvakt: Ali` och `Reserv: Bea`. Lägg till filen.',
        add: `${write('lag.txt', ['Lag: Blå', 'Målvakt: Ali', 'Reserv: Bea'])}\ngit add lag.txt\n`,
        hints: [
          'Första raden med >, de andra med >>.',
          'echo "Reserv: Bea" >> lag.txt',
          'git add lag.txt',
        ],
        tests: [
          {
            description: 'Laget',
            file: 'lag.txt',
            content: 'Lag: Blå\nMålvakt: Ali\nReserv: Bea',
          },
        ],
      },
      {
        title: 'Städa',
        why: 'När grenen är ihopslagen behövs den inte. git branch -d tar bara bort grenar som redan är ihopslagna.',
        xp: 15,
        description: 'Avsluta och ta bort grenen.',
        task: 'Uppgift: Committa med `Ali i mål, Bea reserv` och ta bort grenen `kompis`.',
        add: 'git commit -m "Ali i mål, Bea reserv"\ngit branch -d kompis\n',
        hints: [
          'git commit -m "Ali i mål, Bea reserv"',
          'git branch -d kompis',
          'git branch visar bara main.',
        ],
        tests: [
          { description: 'Sammanslagningen är klar', merged: true },
          { description: 'Bara main finns kvar', branches: ['main'] },
        ],
      },
    ],
  }),
  project({
    id: 'git-proj-tva',
    track: 'konflikter',
    title: 'Två krockar',
    reward: { emoji: '🪢', name: 'Knut' },
    summary: 'Två filer krockar på en gång. Ta en i taget.',
    setup: [
      'mkdir bok',
      'cd bok',
      'git init',
      'echo "Titel: Draken" > titel.txt',
      'echo "Pris: 99 kr" > pris.txt',
      'git add .',
      'git commit -m "Första versionen"',
      'git switch -c forlag',
      'echo "Titel: Drakens gåta" > titel.txt',
      'echo "Pris: 149 kr" > pris.txt',
      'git commit -am "Förlagets förslag"',
      'git switch main',
      'echo "Titel: Draken och jag" > titel.txt',
      'echo "Pris: 129 kr" > pris.txt',
      'git commit -am "Mitt förslag"',
    ].join('\n'),
    setupNote:
      '📁 Du står på main i repot bok. Grenen forlag har ändrat både titel.txt och pris.txt.',
    steps: [
      {
        title: 'Krocken',
        why: 'Krockar flera filer listar Git alla. Du lagar dem en i taget.',
        xp: 10,
        description: 'Slå ihop och se båda filerna.',
        task: 'Uppgift: Slå ihop `forlag` och visa båda filerna med `cat`.',
        add: 'git merge forlag\ncat titel.txt\ncat pris.txt\n',
        hints: ['git merge forlag', 'cat titel.txt', 'cat pris.txt'],
        tests: [
          {
            description: 'titel.txt krockar',
            output: 'Merge conflict in titel.txt',
          },
          {
            description: 'pris.txt krockar',
            output: 'Merge conflict in pris.txt',
          },
        ],
      },
      {
        title: 'Titeln',
        why: 'git add på en lagad fil säger att just den är klar. De andra krockarna finns kvar tills du lagat dem.',
        xp: 15,
        description: 'Förlaget får bestämma titeln.',
        task: 'Uppgift: Skriv `Titel: Drakens gåta` till `titel.txt` och lägg till den.',
        add: 'echo "Titel: Drakens gåta" > titel.txt\ngit add titel.txt\n',
        hints: [
          'echo med > till titel.txt.',
          'echo "Titel: Drakens gåta" > titel.txt',
          'git add titel.txt',
        ],
        tests: [
          {
            description: 'Titeln',
            file: 'titel.txt',
            content: 'Titel: Drakens gåta',
          },
        ],
      },
      {
        title: 'Priset',
        why: 'Först när alla filer är lagade och tillagda går sammanslagningen att committa.',
        xp: 15,
        description: 'Ni möts på mitten: 129 kr.',
        task: 'Uppgift: Skriv `Pris: 129 kr` till `pris.txt`, lägg till den och committa med `Titel och pris klara`.',
        add: 'echo "Pris: 129 kr" > pris.txt\ngit add pris.txt\ngit commit -m "Titel och pris klara"\n',
        hints: [
          'echo "Pris: 129 kr" > pris.txt',
          'git add pris.txt',
          'git commit -m "Titel och pris klara"',
        ],
        tests: [
          { description: 'Priset', file: 'pris.txt', content: 'Pris: 129 kr' },
          { description: 'Sammanslagningen är klar', merged: true },
          { description: 'Allt är committat', clean: true },
        ],
      },
    ],
  }),

  // Bana 7: GitHub
  project({
    id: 'git-proj-portfolio',
    track: 'github',
    title: 'Portfolion på GitHub',
    reward: { emoji: '💼', name: 'Portfölj' },
    summary: 'Lägg upp din portfolio, så att andra kan se den.',
    setup:
      'mkdir portfolio\ncd portfolio\ngit init\necho "<h1>Kim</h1>" > index.html\ngit add .\ngit commit -m "Första sidan"',
    setupNote: '📁 Du står i repot portfolio, som har en commit.',
    steps: [
      {
        title: 'Upp på GitHub',
        why: 'origin är namnet på servern. -u kommer ihåg grenen, så att nästa gång räcker git push.',
        xp: 15,
        description: 'Koppla repot och pusha.',
        task: 'Uppgift: Koppla repot till `https://github.com/kim/portfolio` som `origin` och pusha `main` med `-u`.',
        add: 'git remote add origin https://github.com/kim/portfolio\ngit push -u origin main\n',
        hints: [
          'git remote add origin adressen',
          'git push -u origin main',
          'Kolla med git remote -v.',
        ],
        tests: [{ description: 'Servern har dina commits', pushed: true }],
      },
      {
        title: 'README',
        why: 'README.md är det första som syns på GitHub. Den säger vad projektet är.',
        xp: 15,
        description: 'Berätta vad repot är.',
        task: 'Uppgift: Skapa `README.md` med raderna `# Portfolio` och `Min sida.` Committa med `Lägg till README` och pusha.',
        add: `${write('README.md', ['# Portfolio', 'Min sida.'])}\ngit add README.md\ngit commit -m "Lägg till README"\ngit push\n`,
        hints: [
          'echo "# Portfolio" > README.md',
          'echo "Min sida." >> README.md',
          'add, commit och git push.',
        ],
        tests: [
          { description: 'Två commits', commits: 2 },
          { description: 'Servern har dem', pushed: true },
        ],
      },
      {
        title: 'Ett projekt till',
        why: '`git commit -am` lägger till och committar ändrade filer på en gång. Nya filer måste fortfarande läggas till med git add.',
        xp: 15,
        description: 'Visa upp ett projekt.',
        task: 'Uppgift: Lägg till raden `<p>Projekt</p>` i `index.html`, committa med `-am` och meddelandet `Lägg till projekt`, och pusha.',
        add: 'echo "<p>Projekt</p>" >> index.html\ngit commit -am "Lägg till projekt"\ngit push\n',
        hints: [
          'echo med >> till index.html.',
          'git commit -am "Lägg till projekt"',
          'git push',
        ],
        tests: [
          { description: 'Tre commits', commits: 3 },
          { description: 'Servern har dem', pushed: true },
        ],
      },
    ],
  }),
  project({
    id: 'git-proj-klubb',
    track: 'github',
    title: 'Klubbens sida',
    reward: { emoji: '🏓', name: 'Pingisracket' },
    summary: 'Pingisklubben har en sida på GitHub. Hjälp till.',
    setup: onServer(KLUBB, [['index.html', '<h1>Pingisklubben</h1>']]),
    setupNote: `☁️ På GitHub finns ${KLUBB.replace('https://', '')}.`,
    steps: [
      {
        title: 'Hämta',
        why: 'git clone hämtar hela repot, med historien, och kopplar det till servern direkt.',
        xp: 10,
        description: 'Hämta klubbens sida.',
        task: `Uppgift: Klona \`${KLUBB}\`, gå in i mappen \`sida\` och lista filerna.`,
        add: `git clone ${KLUBB}\ncd sida\nls\n`,
        hints: [
          'git clone adressen',
          'Mappen får repots namn: sida.',
          'cd sida och ls',
        ],
        tests: [
          { description: 'Du står i /hem/sida', cwd: '/hem/sida' },
          { description: 'index.html finns', exists: 'index.html' },
        ],
      },
      {
        title: 'Träningstiderna',
        why: 'En klon är redan kopplad till servern, så git push fungerar utan remote add.',
        xp: 15,
        description: 'Lägg till när klubben tränar.',
        task: 'Uppgift: Skapa `traning.txt` med `Träning tisdag`, committa med `Lägg till träningstider` och pusha.',
        add: 'echo "Träning tisdag" > traning.txt\ngit add .\ngit commit -m "Lägg till träningstider"\ngit push\n',
        hints: [
          'echo "Träning tisdag" > traning.txt',
          'git add . och git commit -m "…"',
          'git push',
        ],
        tests: [
          { description: 'Två commits', commits: 2 },
          { description: 'Servern har dem', pushed: true },
        ],
      },
      {
        title: 'Syns det?',
        why: 'Den som klonar efter dig får din ändring. Så delar man kod.',
        xp: 15,
        description: 'Låtsas att du är en kompis som hämtar sidan.',
        task: 'Uppgift: Gå upp en mapp, klona repot igen till mappen `kompis`, gå in och visa `traning.txt`.',
        add: `cd ..\ngit clone ${KLUBB} kompis\ncd kompis\ncat traning.txt\n`,
        hints: [
          'cd ..',
          `git clone ${KLUBB} kompis`,
          'cd kompis och cat traning.txt',
        ],
        tests: [
          { description: 'Du står i /hem/kompis', cwd: '/hem/kompis' },
          { description: 'Träningstiderna kom med', output: 'Träning tisdag' },
        ],
      },
    ],
  }),
  project({
    id: 'git-proj-familjerecept',
    track: 'github',
    title: 'Familjens recept',
    reward: { emoji: '🥐', name: 'Croissant' },
    summary: 'Hela familjen delar recept. Någon har redan pushat något nytt.',
    setup: `${onServer(RECEPT, [
      ['README.md', '# Recept'],
      ['bullar.txt', 'Kanelbullar'],
    ])}\ngit clone ${RECEPT}\ngit clone ${RECEPT} mormor\ncd mormor\necho "Semlor" > semlor.txt\ngit add .\ngit commit -m "Lägg till semlor"\ngit push\ncd ..\nrm -r mormor\ncd recept`,
    setupNote:
      '📁 Du står i din klon av recepten. Mormor har pushat semlor.txt sedan du klonade.',
    steps: [
      {
        title: 'Hämta det nya',
        why: 'git pull hämtar det andra pushat och slår ihop det med ditt. Gör det innan du börjar jobba.',
        xp: 10,
        description: 'Få med mormors recept.',
        task: 'Uppgift: Hämta det nya med `git pull` och lista filerna.',
        add: 'git pull\nls\n',
        hints: ['git pull', 'ls', 'semlor.txt finns nu.'],
        tests: [{ description: 'semlor.txt finns', exists: 'semlor.txt' }],
      },
      {
        title: 'Ditt recept',
        why: 'Har du pullat först går din push igenom direkt.',
        xp: 15,
        description: 'Dela ditt eget recept.',
        task: 'Uppgift: Skapa `kladdkaka.txt` med `Kladdkaka`, committa med `Lägg till kladdkaka` och pusha.',
        add: 'echo "Kladdkaka" > kladdkaka.txt\ngit add .\ngit commit -m "Lägg till kladdkaka"\ngit push\n',
        hints: [
          'echo "Kladdkaka" > kladdkaka.txt',
          'git add . och git commit -m "Lägg till kladdkaka"',
          'git push',
        ],
        tests: [
          { description: 'Tre commits', commits: 3 },
          { description: 'Servern har dem', pushed: true },
        ],
      },
      {
        title: 'Bättre README',
        why: 'En README som säger vad repot är gör det lättare för alla – även för dig om ett år.',
        xp: 15,
        description: 'Förklara vad samlingen är.',
        task: 'Uppgift: Skriv om `README.md` till `# Recept` och `Familjens bästa bakverk.` Committa med `-am` och `Bättre README`, och pusha.',
        add: `${write('README.md', ['# Recept', 'Familjens bästa bakverk.'])}\ngit commit -am "Bättre README"\ngit push\n`,
        hints: [
          'echo "# Recept" > README.md',
          'echo "Familjens bästa bakverk." >> README.md',
          'git commit -am "Bättre README" och git push.',
        ],
        tests: [
          { description: 'Meddelandet', message: 'Bättre README' },
          { description: 'Servern har det', pushed: true },
        ],
      },
    ],
  }),

  // Bana 8: arbetsflödet
  project({
    id: 'git-proj-hjalp',
    track: 'arbetsflode',
    title: 'En gren per ändring',
    reward: { emoji: '🛠️', name: 'Verktygslåda' },
    summary:
      'Gör en ändring som i ett riktigt team: gren, push, pull request, merge.',
    setup:
      'mkdir app\ncd app\ngit init\necho "Hej" > app.txt\ngit add .\ngit commit -m "Första versionen"\ngit remote add origin https://github.com/kim/app\ngit push -u origin main',
    setupNote: '📁 Du står på main i repot app, som är pushat till GitHub.',
    steps: [
      {
        title: 'Grenen',
        why: 'En gren per ändring, med ett namn som säger vad den gör. Då är main alltid i ordning.',
        xp: 15,
        description: 'Lägg till en hjälptext.',
        task: 'Uppgift: Skapa och byt till `lagg-till-hjalp`. Skapa `hjalp.txt` med `Skriv ? för hjälp` och committa med `Lägg till hjälptext`.',
        add: 'git switch -c lagg-till-hjalp\necho "Skriv ? för hjälp" > hjalp.txt\ngit add .\ngit commit -m "Lägg till hjälptext"\n',
        hints: [
          'git switch -c lagg-till-hjalp',
          'echo och git add .',
          'git commit -m "Lägg till hjälptext"',
        ],
        tests: [
          {
            description: 'Du står på lagg-till-hjalp',
            branch: 'lagg-till-hjalp',
          },
          { description: 'Meddelandet', message: 'Lägg till hjälptext' },
        ],
      },
      {
        title: 'Pusha grenen',
        why: 'Grenen pushas till GitHub, och där öppnar man en pull request: en fråga om att få slå ihop den med main.',
        xp: 10,
        description: 'Upp med grenen så att teamet kan titta.',
        task: 'Uppgift: Pusha grenen med `git push -u origin lagg-till-hjalp`.',
        add: 'git push -u origin lagg-till-hjalp\n',
        hints: [
          'git push -u origin grenens-namn',
          'git push -u origin lagg-till-hjalp',
          'Sedan öppnar man en pull request på GitHub.',
        ],
        tests: [{ description: 'Grenen finns på servern', pushed: true }],
      },
      {
        title: 'Godkänd',
        why: 'När pull requesten är godkänd slås grenen ihop med main. Här gör du det själv i terminalen.',
        xp: 15,
        description: 'Teamet sa ja.',
        task: 'Uppgift: Byt till `main`, slå ihop `lagg-till-hjalp`, pusha och ta bort grenen.',
        add: 'git switch main\ngit merge lagg-till-hjalp\ngit push\ngit branch -d lagg-till-hjalp\n',
        hints: [
          'git switch main och git merge lagg-till-hjalp',
          'git push',
          'git branch -d lagg-till-hjalp',
        ],
        tests: [
          { description: 'Du står på main', branch: 'main' },
          { description: 'main är pushad', pushed: true },
          { description: 'Bara main finns lokalt', branches: ['main'] },
        ],
      },
    ],
  }),
  project({
    id: 'git-proj-meddelanden',
    track: 'arbetsflode',
    title: 'Bra commit-meddelanden',
    reward: { emoji: '🏷️', name: 'Etikett' },
    summary: 'En historik som går att läsa – och en commit som går att ångra.',
    setup:
      'mkdir sida\ncd sida\ngit init\necho "<h1>Start</h1>" > index.html\ngit add .\ngit commit -m "Första versionen"',
    setupNote: '📁 Du står på main i repot sida.',
    steps: [
      {
        title: 'En sak per commit',
        why: 'Två ändringar i två commits är lättare att förstå – och att ångra en av – än allt i en.',
        xp: 15,
        description: 'Två nya sidor, två commits.',
        task: 'Uppgift: Skapa `om.txt` med `Om oss` och committa med `Lägg till sidan Om`. Skapa sedan `kontakt.txt` med `Mejla oss` och committa med `Lägg till kontaktsidan`.',
        add: 'echo "Om oss" > om.txt\ngit add om.txt\ngit commit -m "Lägg till sidan Om"\necho "Mejla oss" > kontakt.txt\ngit add kontakt.txt\ngit commit -m "Lägg till kontaktsidan"\n',
        hints: [
          'echo, git add om.txt och commit.',
          'Samma för kontakt.txt.',
          'Meddelandet börjar med ett verb: Lägg till …',
        ],
        tests: [
          { description: 'Tre commits', commits: 3 },
          { description: 'Meddelandet', message: 'Lägg till kontaktsidan' },
        ],
      },
      {
        title: 'Säg vad, inte hur',
        why: 'Ett bra meddelande säger vad commiten gör: "Rätta stavfel på sidan Om" säger mer än "fix".',
        xp: 10,
        description: 'Ett stavfel ska rättas.',
        task: 'Uppgift: Skriv om `om.txt` till `Om oss och kaféet`, committa med `-am` och `Rätta texten på sidan Om`, och visa historien med `git log --oneline`.',
        add: 'echo "Om oss och kaféet" > om.txt\ngit commit -am "Rätta texten på sidan Om"\ngit log --oneline\n',
        hints: [
          'echo "Om oss och kaféet" > om.txt',
          'git commit -am "Rätta texten på sidan Om"',
          'git log --oneline',
        ],
        tests: [
          { description: 'Fyra commits', commits: 4 },
          { description: 'Meddelandet', message: 'Rätta texten på sidan Om' },
        ],
      },
      {
        title: 'Ångra med revert',
        why: 'git revert gör en ny commit som tar bort en gammal. Historien finns kvar, så det är säkert även när andra redan hämtat den.',
        xp: 15,
        description: 'Den nya texten var fel. Ångra den.',
        task: 'Uppgift: Ångra senaste commit med `git revert HEAD` och visa `om.txt`.',
        add: 'git revert HEAD\ncat om.txt\n',
        hints: [
          'HEAD är senaste commit.',
          'git revert HEAD',
          'cat om.txt visar Om oss igen.',
        ],
        tests: [
          {
            description: 'Texten är tillbaka',
            file: 'om.txt',
            content: 'Om oss',
          },
          { description: 'Fem commits – revert är en ny commit', commits: 5 },
        ],
      },
    ],
  }),
  project({
    id: 'git-proj-flodet',
    track: 'arbetsflode',
    title: 'Hela flödet',
    reward: { emoji: '🏁', name: 'Målflagga' },
    summary: 'Klona, gren, push, pull och merge – allt i ett.',
    setup: onServer(TEAM, [['meny.txt', 'Kaffe']]),
    setupNote: `☁️ Teamets repo finns på ${TEAM.replace('https://', '')}.`,
    steps: [
      {
        title: 'Klona och grena',
        why: 'Så börjar varje uppgift i ett team: hämta senaste versionen och gör en gren.',
        xp: 15,
        description: 'Kaféet vill ha te på menyn.',
        task: `Uppgift: Klona \`${TEAM}\`, gå in i \`kafe\` och skapa grenen \`te\`. Lägg till \`Te\` i \`meny.txt\` och committa med \`Lägg till te\`.`,
        add: `git clone ${TEAM}\ncd kafe\ngit switch -c te\necho "Te" >> meny.txt\ngit commit -am "Lägg till te"\n`,
        hints: [
          `git clone ${TEAM} och cd kafe`,
          'git switch -c te',
          'echo "Te" >> meny.txt och git commit -am "Lägg till te"',
        ],
        tests: [
          { description: 'Du står på te', branch: 'te' },
          { description: 'Två commits', commits: 2 },
        ],
      },
      {
        title: 'Pusha',
        why: 'Grenen på GitHub är det teamet granskar i pull requesten.',
        xp: 10,
        description: 'Upp med grenen.',
        task: 'Uppgift: Pusha grenen `te` med `-u`.',
        add: 'git push -u origin te\n',
        hints: [
          'git push -u origin te',
          '-u kommer ihåg kopplingen.',
          'Sedan en pull request på GitHub.',
        ],
        tests: [{ description: 'Grenen finns på servern', pushed: true }],
      },
      {
        title: 'In i main',
        why: 'Pull först, så att main är senaste versionen. Merge, push – och ändringen är ute.',
        xp: 20,
        description: 'Pull requesten är godkänd.',
        task: 'Uppgift: Byt till `main`, kör `git pull`, slå ihop `te` och pusha.',
        add: 'git switch main\ngit pull\ngit merge te\ngit push\n',
        hints: ['git switch main', 'git pull', 'git merge te och git push'],
        tests: [
          { description: 'Du står på main', branch: 'main' },
          {
            description: 'Menyn har te',
            file: 'meny.txt',
            content: 'Kaffe\nTe',
          },
          { description: 'main är pushad', pushed: true },
        ],
      },
    ],
  }),
];

export const PROJECT_STEPS = projectSteps(PROJECTS, text => `# ${text}`);
