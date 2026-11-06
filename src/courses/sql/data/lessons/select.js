// Bana 1: SELECT, FROM, kolumner, LIMIT, kommentarer och flera frågor.
// Inget WHERE än (bana 2) och ingen sortering (bana 3).
const START = '-- Skriv din fråga här\n';

export const SELECT = [
  {
    id: 'select-01',
    track: 'select',
    db: 'butik',
    title: 'Din första fråga',
    xp: 10,
    description:
      'En databas är tabeller, ungefär som flikar i Excel. Varje tabell har kolumner (namn, stad …) och rader (en per kund). Med SQL frågar du databasen efter det du vill se.',
    explain:
      'Den enklaste frågan är `SELECT * FROM tabell`. `SELECT` betyder *välj*, `*` betyder *alla kolumner* och `FROM` säger *från vilken tabell*.\n\nÖppna **📋 Tabellerna** ovanför editorn, så ser du vilka tabeller butiken har. Svaret på din fråga visas som en tabell under editorn.',
    example: 'SELECT * FROM produkter;',
    task: 'Uppgift: Visa allt i tabellen `kunder`.',
    starterCode: START,
    solution: 'SELECT * FROM kunder;\n',
    hints: [
      'Frågan börjar med SELECT och sedan * för alla kolumner.',
      'Efter * kommer FROM och namnet på tabellen.',
      'SELECT * FROM … – fyll i tabellens namn, kunder.',
    ],
    tests: [
      { description: 'Alla kunderna är med', check: 'rows' },
      { description: 'Alla kolumnerna är med', check: 'columns' },
    ],
  },
  {
    id: 'select-02',
    track: 'select',
    db: 'butik',
    title: 'Välj kolumner',
    xp: 10,
    description:
      'Oftast vill man inte se allt. Butiken ska skicka julkort och behöver bara namn och stad.',
    explain:
      'I stället för `*` skriver du kolumnerna du vill ha, med kommatecken mellan: `SELECT namn, stad FROM kunder`.\n\nKolumnerna kommer i svaret i den ordning du skriver dem. Efter den sista kolumnen ska det inte vara något kommatecken.',
    example: 'SELECT namn, pris FROM produkter;',
    task: 'Uppgift: Visa `namn` och `stad` för alla kunder, i den ordningen.',
    starterCode: START,
    solution: 'SELECT namn, stad FROM kunder;\n',
    hints: [
      'Byt * mot kolumnernas namn.',
      'Kommatecken mellan kolumnerna, men inte efter den sista.',
      'SELECT namn, stad FROM …',
    ],
    tests: [
      { description: 'Namn och stad för alla kunder', check: 'rows' },
      {
        description: 'Kolumnerna är namn och stad',
        check: 'columns',
        expected: ['namn', 'stad'],
      },
    ],
  },
  {
    id: 'select-03',
    track: 'select',
    db: 'filmer',
    title: 'En ny databas',
    xp: 10,
    description:
      'Nu byter vi till en databas med filmer. Kolla i 📋 Tabellerna vad kolumnerna heter – de är på svenska men utan å, ä och ö.',
    explain:
      'Namnen i en databas skrivs ofta utan å, ä och ö, så att de går att skriva överallt. Därför heter kolumnen för år `ar` och längden `langd`.\n\nStora och små bokstäver spelar ingen roll för SQL: `select` och `SELECT` är samma sak. Men nyckelorden skrivs ofta med versaler, så att man ser skillnad på dem och namnen.',
    example: 'SELECT namn, land FROM regissorer;',
    task: 'Uppgift: Visa `titel`, `ar` och `langd` för alla filmer.',
    starterCode: START,
    solution: 'SELECT titel, ar, langd FROM filmer;\n',
    hints: [
      'Tabellen heter filmer.',
      'Tre kolumner med kommatecken mellan: titel, ar och langd.',
      'SELECT titel, ar, langd FROM …',
    ],
    tests: [
      { description: 'Titel, år och längd för alla filmer', check: 'rows' },
      {
        description: 'Kolumnerna är titel, ar och langd',
        check: 'columns',
        expected: ['titel', 'ar', 'langd'],
      },
    ],
  },
  {
    id: 'select-04',
    track: 'select',
    db: 'butik',
    title: 'Bara några rader',
    xp: 15,
    description:
      'En riktig tabell kan ha miljontals rader. Då vill man ofta bara titta på några av dem först.',
    explain:
      '`LIMIT 3` sist i frågan gör att du bara får tre rader. Det är bra när du vill se hur en tabell ser ut utan att få allt.\n\nVilka rader du får är de som kommer först i tabellen. I nästa bana lär du dig sortera, så att du kan välja *vilka* som kommer först.',
    example: 'SELECT * FROM kunder LIMIT 2;',
    task: 'Uppgift: Visa `namn` och `pris` för de första 5 produkterna.',
    starterCode: START,
    solution: 'SELECT namn, pris FROM produkter LIMIT 5;\n',
    hints: [
      'Börja med SELECT namn, pris FROM produkter.',
      'LIMIT står sist, efter tabellens namn.',
      '… FROM produkter LIMIT 5;',
    ],
    tests: [
      { description: 'De första fem produkterna', check: 'rows' },
      {
        description: 'Kolumnerna är namn och pris',
        check: 'columns',
        expected: ['namn', 'pris'],
      },
    ],
  },
  {
    id: 'select-05',
    track: 'select',
    db: null,
    title: 'SQL som miniräknare',
    xp: 10,
    description:
      'SELECT kan räkna, även utan någon tabell. Det är ett bra sätt att prova saker.',
    explain:
      '`SELECT 2 + 3` svarar med en rad och en kolumn: 5. Du kan använda `+`, `-`, `*` (gånger) och `/` (delat med).\n\nSe upp med delat: `7 / 2` blir 3, eftersom två heltal ger ett heltal. Skriv `7 / 2.0` om du vill ha 3.5.',
    example: 'SELECT 60 * 60;',
    task: 'Uppgift: Hur många timmar är det på en vecka? Räkna ut `7 * 24` med SELECT.',
    starterCode: START,
    solution: 'SELECT 7 * 24;\n',
    hints: [
      'Du behöver ingen FROM här.',
      'SELECT och sedan uträkningen.',
      'SELECT 7 * 24;',
    ],
    tests: [
      {
        description: 'Svaret är 168',
        check: 'rows',
        expected: [[168]],
      },
    ],
  },
  {
    id: 'select-06',
    track: 'select',
    db: 'butik',
    title: 'Räkna med kolumner',
    xp: 15,
    description:
      'Butiken vill veta hur mycket varorna på lagret är värda. Det står inte i någon kolumn – men det går att räkna ut.',
    explain:
      'En kolumn kan vara en uträkning: `SELECT namn, pris * lager FROM produkter` räknar ut pris gånger antal för varje rad.\n\nUträkningen görs en gång per rad, med just den radens värden. Kolumnen i svaret heter som uträkningen, `pris * lager`. I bana 3 lär du dig ge den ett bättre namn.',
    example: 'SELECT titel, langd * 2 FROM filmer;',
    task: 'Uppgift: Visa `namn` och lagrets värde, `pris * lager`, för alla produkter.',
    starterCode: START,
    solution: 'SELECT namn, pris * lager FROM produkter;\n',
    hints: [
      'Två kolumner: namn och en uträkning.',
      'Uträkningen är pris gånger lager. Gånger skrivs *.',
      'SELECT namn, pris * lager FROM …',
    ],
    tests: [{ description: 'Namn och värdet på lagret', check: 'rows' }],
  },
  {
    id: 'select-07',
    track: 'select',
    db: 'bibliotek',
    title: 'Kommentarer',
    xp: 10,
    description:
      'En kommentar är text till den som läser koden. Databasen hoppar över den.',
    explain:
      'Allt efter `--` på en rad är en kommentar. Skriv vad frågan är till för, så förstår du den när du läser den om en månad.\n\nEn lång fråga får gärna stå på flera rader. SQL bryr sig inte om radbrytningar, bara om ordningen.',
    example:
      '-- Alla låntagare och deras telefon\nSELECT namn, telefon\nFROM lantagare;',
    task: 'Uppgift: Skriv kommentaren `-- Bibliotekets böcker` och under den en fråga som visar `titel` och `forfattare` för alla böcker.',
    starterCode: START,
    solution:
      '-- Bibliotekets böcker\nSELECT titel, forfattare\nFROM bocker;\n',
    hints: [
      'Kommentaren börjar med två bindestreck.',
      'Tabellen med böcker heter bocker.',
      'SELECT titel, forfattare FROM bocker; på raden under kommentaren.',
    ],
    tests: [
      { description: 'Titel och författare för alla böcker', check: 'rows' },
      {
        description: 'Kolumnerna är titel och forfattare',
        check: 'columns',
        expected: ['titel', 'forfattare'],
      },
    ],
    sourceChecks: [
      {
        description: 'Det finns en kommentar med --',
        pattern: /--\s*\S/,
      },
    ],
  },
  {
    id: 'select-08',
    track: 'select',
    db: 'skola',
    title: 'Klasslistan',
    xp: 15,
    description:
      'Skolans databas har elever, kurser och resultat. Läraren vill ha en lista med eleverna.',
    explain:
      'Samma fråga fungerar på alla tabeller – det enda som ändras är namnen. Börja alltid med att titta i **📋 Tabellerna**: vad heter tabellen, och vad heter kolumnerna?\n\nKolumnerna får stå i vilken ordning du vill, oberoende av hur de står i tabellen.',
    example: 'SELECT namn, larare FROM kurser;',
    task: 'Uppgift: Visa `klass`, `efternamn` och `fornamn` för alla elever, i den ordningen.',
    starterCode: START,
    solution: 'SELECT klass, efternamn, fornamn FROM elever;\n',
    hints: [
      'Tabellen heter elever.',
      'Kolumnerna i den ordning uppgiften säger: klass först.',
      'SELECT klass, efternamn, fornamn FROM …',
    ],
    tests: [
      { description: 'Alla elever', check: 'rows' },
      {
        description: 'Kolumnerna är klass, efternamn och fornamn',
        check: 'columns',
        expected: ['klass', 'efternamn', 'fornamn'],
      },
    ],
  },
  {
    id: 'select-09',
    track: 'select',
    db: 'filmer',
    title: 'Flera frågor',
    xp: 15,
    description:
      'Man kan skriva flera frågor efter varandra. Då behövs semikolon mellan dem.',
    explain:
      'Semikolon `;` säger att en fråga är slut. Med en enda fråga går det bra utan, men med flera måste de skiljas åt.\n\nAlla frågorna körs, men svaret som visas är från den **sista**. Det är praktiskt när du vill titta på en tabell först och sedan skriva den riktiga frågan.',
    example: 'SELECT * FROM regissorer;\nSELECT titel FROM filmer;',
    task: 'Uppgift: Skriv två frågor. Den första visar allt i `regissorer`, och den andra visar bara `namn` för de 3 första regissörerna.',
    starterCode: START,
    solution:
      'SELECT * FROM regissorer;\nSELECT namn FROM regissorer LIMIT 3;\n',
    hints: [
      'Två frågor, var och en med semikolon sist.',
      'Den första är SELECT * FROM regissorer;',
      'Den andra: SELECT namn FROM regissorer LIMIT 3;',
    ],
    tests: [{ description: 'Sista frågan visar tre namn', check: 'rows' }],
    sourceChecks: [
      {
        description: 'Två frågor med semikolon mellan',
        pattern: /;\s*(--[^\n]*\n\s*)*SELECT/i,
      },
    ],
  },
];
