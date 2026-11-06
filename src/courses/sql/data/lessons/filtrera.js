// Bana 2: WHERE med jämförelser, AND, OR, IN, BETWEEN, LIKE och IS NULL.
// Ingen sortering eller räkning än (bana 3).
const START = '-- Skriv din fråga här\n';

export const FILTRERA = [
  {
    id: 'filtrera-01',
    track: 'filtrera',
    db: 'butik',
    title: 'Bara några rader',
    xp: 10,
    description:
      'Butiken ska ha en träff i Göteborg och vill bjuda in kunderna som bor där.',
    explain:
      "`WHERE` efter tabellens namn behåller bara raderna där villkoret är sant: `WHERE stad = 'Göteborg'`.\n\nText skrivs inom **enkla** citattecken, `'Göteborg'`. Utan citattecken tror SQL att Göteborg är namnet på en kolumn. Texten måste stämma exakt, med stor bokstav och allt.",
    example: "SELECT * FROM kunder WHERE stad = 'Malmö';",
    task: 'Uppgift: Visa `namn` och `epost` för kunderna som bor i `Göteborg`.',
    starterCode: START,
    solution: "SELECT namn, epost FROM kunder WHERE stad = 'Göteborg';\n",
    hints: [
      'Börja med SELECT namn, epost FROM kunder.',
      "WHERE står efter tabellens namn: WHERE stad = 'Göteborg'.",
      'Göteborg är text, så det ska stå inom enkla citattecken.',
    ],
    tests: [
      {
        description: 'De tre kunderna i Göteborg',
        check: 'rows',
        expected: [
          ['Anna Berg', 'anna@exempel.se'],
          ['David Lund', 'david@exempel.se'],
          ['Hugo Sjöberg', 'hugo@exempel.se'],
        ],
      },
      {
        description: 'Kolumnerna är namn och epost',
        check: 'columns',
        expected: ['namn', 'epost'],
      },
    ],
  },
  {
    id: 'filtrera-02',
    track: 'filtrera',
    db: 'butik',
    title: 'Större och mindre',
    xp: 10,
    description: 'Vad kan man köpa för en femtiolapp?',
    explain:
      'Tal jämförs med `<` (mindre än), `>` (större än), `<=` (mindre än eller lika med) och `>=`. Tal skrivs utan citattecken.\n\n`pris < 50` tar inte med något som kostar exakt 50. Vill du ha med 50 skriver du `pris <= 50`.',
    example: 'SELECT titel FROM filmer WHERE langd > 150;',
    task: 'Uppgift: Visa `namn` och `pris` för produkterna som kostar 50 kronor eller mindre.',
    starterCode: START,
    solution: 'SELECT namn, pris FROM produkter WHERE pris <= 50;\n',
    hints: [
      'Villkoret handlar om kolumnen pris.',
      '50 eller mindre skrivs <= 50.',
      'SELECT namn, pris FROM produkter WHERE pris <= 50;',
    ],
    tests: [
      { description: 'Produkterna för högst 50 kr', check: 'rows' },
      {
        description: 'Kolumnerna är namn och pris',
        check: 'columns',
        expected: ['namn', 'pris'],
      },
    ],
  },
  {
    id: 'filtrera-03',
    track: 'filtrera',
    db: 'butik',
    title: 'Inte lika med',
    xp: 10,
    description: 'Någon är allergisk mot kaffe och vill se allt annat.',
    explain:
      "`<>` betyder *inte lika med*. Många databaser förstår också `!=`, som betyder samma sak.\n\n`WHERE kategori <> 'Kaffe'` behåller alla rader utom kaffet.",
    example: "SELECT titel FROM filmer WHERE genre <> 'Drama';",
    task: 'Uppgift: Visa `namn` och `kategori` för alla produkter som *inte* är i kategorin `Kaffe`.',
    starterCode: START,
    solution:
      "SELECT namn, kategori FROM produkter WHERE kategori <> 'Kaffe';\n",
    hints: [
      'Inte lika med skrivs <>.',
      'Kaffe är text, så den ska ha enkla citattecken.',
      "… WHERE kategori <> 'Kaffe';",
    ],
    tests: [
      { description: 'Allt utom kaffet', check: 'rows' },
      {
        description: 'Kolumnerna är namn och kategori',
        check: 'columns',
        expected: ['namn', 'kategori'],
      },
    ],
  },
  {
    id: 'filtrera-04',
    track: 'filtrera',
    db: 'butik',
    title: 'Både och',
    xp: 15,
    description:
      'En kund vill ha te, men inte för mer än 60 kronor. Två villkor som båda måste stämma.',
    explain:
      "`AND` sätter ihop två villkor. Raden kommer bara med om **båda** är sanna: `WHERE kategori = 'Te' AND pris < 60`.\n\nDu kan sätta ihop så många villkor du vill med `AND`.",
    example: "SELECT titel FROM filmer WHERE genre = 'Drama' AND ar < 1960;",
    task: 'Uppgift: Visa `namn` och `pris` för produkterna i kategorin `Te` som kostar mindre än 60 kronor.',
    starterCode: START,
    solution:
      "SELECT namn, pris FROM produkter WHERE kategori = 'Te' AND pris < 60;\n",
    hints: [
      'Två villkor: ett om kategori och ett om pris.',
      'Sätt ihop dem med AND.',
      "WHERE kategori = 'Te' AND pris < 60",
    ],
    tests: [
      {
        description: 'Te för under 60 kr',
        check: 'rows',
        expected: [
          ['Grönt te', 59],
          ['Rooibos', 55],
        ],
      },
    ],
  },
  {
    id: 'filtrera-05',
    track: 'filtrera',
    db: 'butik',
    title: 'Det ena eller det andra',
    xp: 15,
    description:
      'Butiken ska åka på turné till Malmö och Umeå. Vilka kunder bor i någon av städerna?',
    explain:
      "`OR` betyder *eller*: raden kommer med om **minst ett** av villkoren är sant.\n\nSe upp med att skriva `WHERE stad = 'Malmö' OR 'Umeå'`. Varje villkor måste vara helt: `stad = 'Malmö' OR stad = 'Umeå'`.",
    example: "SELECT titel FROM filmer WHERE genre = 'Sci-fi' OR langd > 170;",
    task: 'Uppgift: Visa `namn` och `stad` för kunderna som bor i `Malmö` eller `Umeå`.',
    starterCode: START,
    solution:
      "SELECT namn, stad FROM kunder WHERE stad = 'Malmö' OR stad = 'Umeå';\n",
    hints: [
      'Två villkor om stad, med OR mellan.',
      'Skriv ut stad = två gånger.',
      "WHERE stad = 'Malmö' OR stad = 'Umeå'",
    ],
    tests: [
      {
        description: 'Kunderna i Malmö och Umeå',
        check: 'rows',
        expected: [
          ['Bilal Haddad', 'Malmö'],
          ['Greta Nyström', 'Malmö'],
          ['Ida Karlsson', 'Umeå'],
        ],
      },
    ],
  },
  {
    id: 'filtrera-06',
    track: 'filtrera',
    db: 'filmer',
    title: 'Någon av dem',
    xp: 15,
    description:
      'Med många OR blir frågan lång. Det finns ett kortare sätt att säga "något av de här".',
    explain:
      "`IN` jämför med en lista: `WHERE genre IN ('Sci-fi', 'Animerat')` är samma sak som `genre = 'Sci-fi' OR genre = 'Animerat'`.\n\nListan står inom parentes, med kommatecken mellan. `NOT IN` ger alla som *inte* finns i listan.",
    example: "SELECT namn FROM kunder WHERE stad IN ('Malmö', 'Lund');",
    task: 'Uppgift: Visa `titel` och `genre` för filmerna i genrerna `Sci-fi` och `Animerat`. Använd `IN`.',
    starterCode: START,
    solution:
      "SELECT titel, genre FROM filmer WHERE genre IN ('Sci-fi', 'Animerat');\n",
    hints: [
      'IN står efter kolumnen, och sedan listan inom parentes.',
      'Genrerna är text, så de har enkla citattecken.',
      "WHERE genre IN ('Sci-fi', 'Animerat')",
    ],
    tests: [{ description: 'Sci-fi och animerat', check: 'rows' }],
    sourceChecks: [
      { description: 'Frågan använder IN', pattern: /\bIN\s*\(/i },
    ],
  },
  {
    id: 'filtrera-07',
    track: 'filtrera',
    db: 'filmer',
    title: 'Mellan två värden',
    xp: 15,
    description: 'Vilka filmer kom mellan 2000 och 2015?',
    explain:
      '`BETWEEN 2000 AND 2015` betyder från och med 2000 till och med 2015. Båda ändarna är med.\n\nDet är samma sak som `ar >= 2000 AND ar <= 2015`, men lättare att läsa.',
    example: 'SELECT namn FROM produkter WHERE pris BETWEEN 50 AND 100;',
    task: 'Uppgift: Visa `titel` och `ar` för filmerna som kom mellan 2000 och 2015, med båda åren.',
    starterCode: START,
    solution: 'SELECT titel, ar FROM filmer WHERE ar BETWEEN 2000 AND 2015;\n',
    hints: [
      'Villkoret handlar om kolumnen ar.',
      'BETWEEN och sedan två tal med AND mellan.',
      'WHERE ar BETWEEN 2000 AND 2015',
    ],
    tests: [{ description: 'Filmerna från 2000 till 2015', check: 'rows' }],
  },
  {
    id: 'filtrera-08',
    track: 'filtrera',
    db: 'bibliotek',
    title: 'Söka i text',
    xp: 15,
    description:
      'En låntagare minns bara att författaren hette något med Lindgren.',
    explain:
      "`LIKE` söker efter ett mönster. `%` betyder *vilka tecken som helst, hur många som helst*:\n\n- `'A%'` börjar på A\n- `'%son'` slutar på son\n- `'%ring%'` innehåller ring någonstans\n\nI SQLite spelar stora och små bokstäver ingen roll för LIKE (utom å, ä och ö).",
    example: "SELECT titel FROM filmer WHERE titel LIKE 'The%';",
    task: 'Uppgift: Visa `titel` och `forfattare` för böckerna där författaren slutar på `Lindgren`.',
    starterCode: START,
    solution:
      "SELECT titel, forfattare FROM bocker WHERE forfattare LIKE '%Lindgren';\n",
    hints: [
      'Använd LIKE på kolumnen forfattare.',
      'Slutar på Lindgren: % först, sedan Lindgren.',
      "WHERE forfattare LIKE '%Lindgren'",
    ],
    tests: [{ description: 'Böckerna av Lindgren', check: 'rows' }],
  },
  {
    id: 'filtrera-09',
    track: 'filtrera',
    db: 'butik',
    title: 'Det som saknas',
    xp: 15,
    description:
      'Några kunder har inte lämnat sin e-post. Butiken vill ringa dem i stället.',
    explain:
      'En tom ruta i en tabell heter `NULL`. Det betyder *vet inte*, och är inte samma sak som 0 eller tom text.\n\nEftersom NULL är okänt blir `epost = NULL` aldrig sant. Skriv `epost IS NULL` för att hitta de tomma, och `IS NOT NULL` för de som har ett värde.',
    example: 'SELECT titel FROM filmer WHERE regissor_id IS NULL;',
    task: 'Uppgift: Visa `namn` för kunderna som saknar e-post.',
    starterCode: START,
    solution: 'SELECT namn FROM kunder WHERE epost IS NULL;\n',
    hints: [
      'Villkoret handlar om kolumnen epost.',
      'Det heter IS NULL, inte = NULL.',
      'WHERE epost IS NULL',
    ],
    tests: [
      {
        description: 'Kunderna utan e-post',
        check: 'rows',
        expected: [['Clara Ek'], ['Greta Nyström']],
      },
    ],
  },
];
