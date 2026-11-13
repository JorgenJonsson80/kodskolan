// Bana 6: konflikter. När två grenar ändrar samma rad kan Git inte välja
// själv. Eleven läser markeringarna, väljer eller kombinerar och committar.
const START = '# Skriv kommandona här, ett per rad\n';
// Två grenar som ändrar samma rad i profil.txt: main säger grön, rod röd.
const BASE =
  'mkdir hemsida\ncd hemsida\ngit init\necho "Namn: Ada" > profil.txt\necho "Färg: blå" >> profil.txt\necho "Stad: Lund" >> profil.txt\ngit add .\ngit commit -m "Lägg till profil"\ngit switch -c rod\necho "Namn: Ada" > profil.txt\necho "Färg: röd" >> profil.txt\necho "Stad: Lund" >> profil.txt\ngit commit -am "Byt till röd"\ngit switch main\necho "Namn: Ada" > profil.txt\necho "Färg: grön" >> profil.txt\necho "Stad: Lund" >> profil.txt\ngit commit -am "Byt till grön"';
const MERGING = `${BASE}\ngit merge rod`;
const write = lines =>
  lines
    .map(
      (line, index) => `echo "${line}" ${index === 0 ? '>' : '>>'} profil.txt`,
    )
    .join('\n');

export const KONFLIKTER = [
  {
    id: 'git-51',
    track: 'konflikter',
    title: 'En konflikt uppstår',
    xp: 10,
    description:
      'Två grenar har ändrat samma rad. Vad händer när de slås ihop?',
    explain:
      'Ändrar två grenar **samma rad** på olika sätt vet Git inte vilken som är rätt. Då stannar `git merge` och säger **CONFLICT**.\n\nDet är inte farligt och inget har gått sönder. Git vill bara att en människa bestämmer.',
    example: 'git merge annan-gren',
    task: 'Uppgift: main har bytt färgen i `profil.txt` till grön, grenen `rod` till röd. Slå ihop `rod` med main och se vad Git säger.',
    setup: BASE,
    setupNote:
      '📁 Du står på main. Både main och rod har ändrat raden med färgen.',
    starterCode: START,
    solution: 'git merge rod\n',
    hints: [
      'Du står redan på main.',
      'git merge följt av grenen.',
      'git merge rod',
    ],
    tests: [
      {
        description: 'Git säger att det blev en konflikt',
        output: 'CONFLICT (content): Merge conflict in profil.txt',
      },
    ],
  },
  {
    id: 'git-52',
    track: 'konflikter',
    title: 'Läs markeringarna',
    xp: 15,
    description: 'Git har skrivit båda versionerna i filen. Titta.',
    explain:
      'Git markerar konflikten i filen:\n\n```\n<<<<<<< HEAD\nFärg: grön\n=======\nFärg: röd\n>>>>>>> rod\n```\n\nMellan `<<<<<<< HEAD` och `=======` står **din** version (grenen du står på). Mellan `=======` och `>>>>>>> rod` står **den andra grenens**. Raderna runt omkring hade ingen konflikt.',
    example: 'cat fil.txt',
    task: 'Uppgift: Titta på `profil.txt` med `cat`.',
    setup: MERGING,
    setupNote: '⚠️ Mitt i en sammanslagning med en konflikt i profil.txt.',
    starterCode: START,
    solution: 'cat profil.txt\n',
    hints: ['cat följt av filnamnet.', 'cat profil.txt', 'Leta efter <<<<<<<.'],
    tests: [
      {
        description: 'Din version syns',
        output: '<<<<<<< HEAD\nFärg: grön\n=======',
      },
      {
        description: 'Och den andra grenens',
        output: '=======\nFärg: röd\n>>>>>>> rod',
      },
    ],
  },
  {
    id: 'git-53',
    track: 'konflikter',
    title: 'Vad säger git status?',
    xp: 10,
    description:
      'git status säger vilka filer som har konflikter och vad du ska göra.',
    explain:
      'Under **Unmerged paths** står filerna med konflikter, som _both modified_ – båda grenarna har ändrat dem.\n\nGit säger också vad som ska göras: laga filen, kör `git add` på den och committa.',
    example: 'git status',
    task: 'Uppgift: Kör `git status` mitt i konflikten.',
    setup: MERGING,
    setupNote: '⚠️ Mitt i en sammanslagning med en konflikt.',
    starterCode: START,
    solution: 'git status\n',
    hints: ['git status', 'Leta efter Unmerged paths.', 'Två ord.'],
    tests: [
      { description: 'Visar Unmerged paths', output: 'Unmerged paths:' },
      { description: 'Visar filen', output: 'both modified:   profil.txt' },
    ],
  },
  {
    id: 'git-54',
    track: 'konflikter',
    title: 'Behåll din version',
    xp: 15,
    description: 'Du bestämmer att grön ska gälla.',
    explain:
      'Att laga en konflikt är att **skriva filen som den ska vara** – utan markeringar. Sedan säger du till Git att den är lagad med `git add`, och committar.\n\nI en riktig editor tar du bort raderna du inte vill ha. Här skriver vi om filen med `echo`.',
    example:
      'echo "rad" > fil.txt\ngit add fil.txt\ngit commit -m "Laga konflikten"',
    task: `Uppgift: Skriv om \`profil.txt\` med raderna \`Namn: Ada\`, \`Färg: grön\` och \`Stad: Lund\`. Lägg till den och committa med \`Behåll grön\`.`,
    setup: MERGING,
    setupNote: '⚠️ Mitt i en sammanslagning med en konflikt i profil.txt.',
    starterCode: START,
    solution: `${write(['Namn: Ada', 'Färg: grön', 'Stad: Lund'])}\ngit add profil.txt\ngit commit -m "Behåll grön"\n`,
    hints: [
      'Första raden med >, resten med >>.',
      'git add profil.txt',
      'git commit -m "Behåll grön"',
    ],
    tests: [
      {
        description: 'profil.txt är lagad',
        file: 'profil.txt',
        content: 'Namn: Ada\nFärg: grön\nStad: Lund',
      },
      { description: 'Det blev en merge-commit', merged: true },
      { description: 'Inget kvar', clean: true },
    ],
  },
  {
    id: 'git-55',
    track: 'konflikter',
    title: 'Ta den andras version',
    xp: 15,
    description: 'Den här gången ska röd gälla.',
    explain:
      'Ingen version vinner automatiskt. Du kan lika gärna välja den andra grenens version – det viktiga är att filen blir som den ska och att markeringarna är borta.',
    example: 'git add fil.txt\ngit commit -m "Ta grenens version"',
    task: 'Uppgift: Laga konflikten så att färgen blir röd, och committa med `Ta röd`.',
    setup: MERGING,
    setupNote: '⚠️ Mitt i en sammanslagning med en konflikt i profil.txt.',
    starterCode: START,
    solution: `${write(['Namn: Ada', 'Färg: röd', 'Stad: Lund'])}\ngit add profil.txt\ngit commit -m "Ta röd"\n`,
    hints: [
      'Skriv om filen med Färg: röd.',
      'Alla tre raderna ska finnas, utan markeringar.',
      'git add och git commit -m "Ta röd"',
    ],
    tests: [
      {
        description: 'profil.txt har röd',
        file: 'profil.txt',
        content: 'Namn: Ada\nFärg: röd\nStad: Lund',
      },
      { description: 'Det blev en merge-commit', merged: true },
    ],
  },
  {
    id: 'git-56',
    track: 'konflikter',
    title: 'Ta med båda',
    xp: 15,
    description: 'Ibland är båda ändringarna rätt.',
    explain:
      'En konflikt betyder inte alltid att en sida har fel. Har två personer lagt till var sin sak kan resultatet innehålla båda – i den ordning som blir rätt.',
    example: 'echo "En" > fil.txt\necho "Två" >> fil.txt',
    task: 'Uppgift: Ada gillar båda färgerna. Laga konflikten så att filen har raderna `Namn: Ada`, `Färg: grön och röd` och `Stad: Lund`, och committa med `Ta båda färgerna`.',
    setup: MERGING,
    setupNote: '⚠️ Mitt i en sammanslagning med en konflikt i profil.txt.',
    starterCode: START,
    solution: `${write(['Namn: Ada', 'Färg: grön och röd', 'Stad: Lund'])}\ngit add profil.txt\ngit commit -m "Ta båda färgerna"\n`,
    hints: [
      'Skriv om filen med de tre raderna.',
      'Färg: grön och röd på mittenraden.',
      'git add och commit.',
    ],
    tests: [
      {
        description: 'profil.txt har båda färgerna',
        file: 'profil.txt',
        content: 'Namn: Ada\nFärg: grön och röd\nStad: Lund',
      },
      { description: 'Det blev en merge-commit', merged: true },
    ],
  },
  {
    id: 'git-57',
    track: 'konflikter',
    title: 'Glöm inte git add',
    xp: 15,
    description:
      'Git låter dig inte committa förrän alla konflikter är markerade som lagade.',
    explain:
      'Försöker du committa innan du kört `git add` på den lagade filen säger Git nej: _Committing is not possible because you have unmerged files._\n\n`git add` är signalen till Git att du är klar med filen.',
    example: 'git add fil.txt\ngit status',
    task: 'Uppgift: `profil.txt` är redan lagad i mappen, men inte tillagd. Kör `git status`, lägg till filen och committa med `Laga konflikten`.',
    setup: `${MERGING}\n${write(['Namn: Ada', 'Färg: grön', 'Stad: Lund'])}`,
    setupNote: '⚠️ Filen är lagad men inte tillagd.',
    starterCode: START,
    solution:
      'git status\ngit add profil.txt\ngit commit -m "Laga konflikten"\n',
    hints: [
      'git status visar fortfarande Unmerged paths.',
      'git add profil.txt',
      'git commit -m "Laga konflikten"',
    ],
    tests: [
      { description: 'Det blev en merge-commit', merged: true },
      { description: 'Meddelandet', message: 'Laga konflikten' },
    ],
  },
  {
    id: 'git-58',
    track: 'konflikter',
    title: 'Bara en fil krånglar',
    xp: 15,
    description:
      'Git slår ihop det som går, och stannar bara för konflikterna.',
    explain:
      'Ändrar grenarna olika filer, eller olika rader, slår Git ihop dem själv. Bara filerna med konflikter behöver du laga – resten är redan klart.',
    example: 'git status',
    task: 'Uppgift: Grenen `rod` har också lagt till `meny.html`. Slå ihop `rod`, laga `profil.txt` så att färgen blir röd, och committa med `Slå ihop röd`.',
    setup: `${BASE.replace('git commit -am "Byt till röd"', 'touch meny.html\ngit add .\ngit commit -m "Byt till röd"')}`,
    setupNote:
      '📁 Du står på main. rod har ändrat färgen och lagt till meny.html.',
    starterCode: START,
    solution: `git merge rod\n${write(['Namn: Ada', 'Färg: röd', 'Stad: Lund'])}\ngit add profil.txt\ngit commit -m "Slå ihop röd"\n`,
    hints: [
      'git merge rod',
      'Bara profil.txt har en konflikt. meny.html kom med av sig själv.',
      'Laga, git add och committa.',
    ],
    tests: [
      { description: 'meny.html kom med', exists: 'meny.html' },
      {
        description: 'profil.txt har röd',
        file: 'profil.txt',
        content: 'Namn: Ada\nFärg: röd\nStad: Lund',
      },
      { description: 'Det blev en merge-commit', merged: true },
    ],
  },
  {
    id: 'git-59',
    track: 'konflikter',
    title: 'Laga konflikten på din gren',
    xp: 20,
    description:
      'Proffsen tar in main i sin gren först – och löser konflikterna där.',
    explain:
      'I stället för att få konflikten när grenen ska in i main kan du slå ihop **main in i din gren** först:\n\n```\ngit switch min-gren\ngit merge main\n```\n\nDå löser du konflikten på din gren, i lugn och ro. Sedan blir det en enkel fast-forward in i main.',
    example: 'git switch rod\ngit merge main',
    task: 'Uppgift: Byt till `rod` och slå ihop main in i den. Laga så att färgen blir röd och committa med `Ta in main`. Byt sedan till main och slå ihop `rod`.',
    setup: BASE,
    setupNote: '📁 Du står på main. Både main och rod har ändrat färgen.',
    starterCode: START,
    solution: `git switch rod\ngit merge main\n${write(['Namn: Ada', 'Färg: röd', 'Stad: Lund'])}\ngit add profil.txt\ngit commit -m "Ta in main"\ngit switch main\ngit merge rod\n`,
    hints: [
      'git switch rod och git merge main.',
      'Laga profil.txt, git add och committa.',
      'git switch main och git merge rod – det blir en fast-forward.',
    ],
    tests: [
      { description: 'Du står på main', branch: 'main' },
      {
        description: 'main har röd',
        file: 'profil.txt',
        content: 'Namn: Ada\nFärg: röd\nStad: Lund',
      },
      {
        description: 'Sista sammanslagningen blev en fast-forward',
        output: 'Fast-forward',
      },
    ],
  },
];
