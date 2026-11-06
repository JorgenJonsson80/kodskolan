import { PENSIONAT_TABLES } from '../databases';

// Bana 13: slutprojektet. Hundpensionatet byggs från grunden (övning
// 1–3, med tabellerna som redan finns i setup) och används sedan i
// rapporter mot den färdiga databasen (db: 'pensionat'). "Idag" är
// 2026-06-15.
const START = '-- Skriv din kod här\n';
const fk = table =>
  `SELECT "table", "from", "to" FROM pragma_foreign_key_list('${table}') ORDER BY "from"`;

export const SLUTPROJEKT = [
  {
    id: 'slutprojekt-01',
    track: 'slutprojekt',
    db: null,
    title: 'Ägarna',
    xp: 20,
    description:
      'Du bygger systemet till ett hundpensionat. Först en tabell för hundarnas ägare.',
    explain:
      'Börja alltid med att fråga: **vilka saker finns det?** Här är det ägare, hundar, rum och vistelser. Varje sak får en egen tabell.\n\nÄgarna är enklast, eftersom de inte pekar på något annat. Därför kommer de först.',
    example:
      'CREATE TABLE kunder (id INTEGER PRIMARY KEY, namn TEXT NOT NULL);',
    task: 'Uppgift: Skapa `agare` med `id INTEGER PRIMARY KEY`, `namn TEXT NOT NULL` och `telefon TEXT` (som får saknas).',
    starterCode: START,
    solution: PENSIONAT_TABLES.agare.trim() + '\n',
    hints: [
      'CREATE TABLE agare ( … );',
      'namn TEXT NOT NULL',
      'telefon TEXT utan NOT NULL.',
    ],
    tests: [
      {
        description: 'agare har id, namn och telefon',
        query:
          'SELECT name, type, "notnull", pk FROM pragma_table_info(\'agare\')',
        ordered: true,
        expected: [
          ['id', 'INTEGER', 0, 1],
          ['namn', 'TEXT', 1, 0],
          ['telefon', 'TEXT', 0, 0],
        ],
      },
    ],
  },
  {
    id: 'slutprojekt-02',
    track: 'slutprojekt',
    db: null,
    setup: PENSIONAT_TABLES.agare,
    title: 'Hundarna',
    xp: 20,
    description: 'Varje hund har en ägare. Tabellen agare finns redan.',
    explain:
      'En ägare kan ha flera hundar, men varje hund har en ägare. Därför står nyckeln hos hunden: `agare_id`.\n\nTumregeln: nyckeln står alltid på "många"-sidan.',
    example:
      'CREATE TABLE ordrar (id INTEGER PRIMARY KEY, kund_id INTEGER NOT NULL REFERENCES kunder (id));',
    task: 'Uppgift: Skapa `hundar` med `id INTEGER PRIMARY KEY`, `namn TEXT NOT NULL`, `ras TEXT`, `fodd INTEGER` och `agare_id INTEGER NOT NULL` som pekar på `agare (id)`.',
    starterCode: START,
    solution: PENSIONAT_TABLES.hundar.trim() + '\n',
    hints: [
      'CREATE TABLE hundar ( … );',
      'agare_id INTEGER NOT NULL REFERENCES agare (id)',
      'id, namn, ras, fodd och agare_id, i den ordningen.',
    ],
    tests: [
      {
        description: 'agare_id pekar på agare.id',
        query: fk('hundar'),
        expected: [['agare', 'agare_id', 'id']],
      },
      {
        description: 'hundar har rätt kolumner',
        query:
          'SELECT name, type, "notnull" FROM pragma_table_info(\'hundar\')',
        ordered: true,
        expected: [
          ['id', 'INTEGER', 0],
          ['namn', 'TEXT', 1],
          ['ras', 'TEXT', 0],
          ['fodd', 'INTEGER', 0],
          ['agare_id', 'INTEGER', 1],
        ],
      },
    ],
  },
  {
    id: 'slutprojekt-03',
    track: 'slutprojekt',
    db: null,
    setup: [
      PENSIONAT_TABLES.agare,
      PENSIONAT_TABLES.hundar,
      PENSIONAT_TABLES.rum,
    ].join('\n'),
    title: 'Vistelserna',
    xp: 25,
    description:
      'En vistelse är när en hund bor i ett rum, från incheckning till utcheckning. Tabellerna agare, hundar och rum finns.',
    explain:
      'En vistelse kopplar ihop en hund och ett rum, så den har två nycklar.\n\nEn `CHECK` kan jämföra två kolumner i samma rad: `CHECK (utcheckning > incheckning)` skrivs efter kolumnerna, som en egen rad i tabellen. Då kan ingen boka en vistelse som slutar innan den börjar.',
    example:
      'CREATE TABLE lan (\n  id INTEGER PRIMARY KEY,\n  lanad TEXT NOT NULL,\n  forfaller TEXT NOT NULL,\n  CHECK (forfaller > lanad)\n);',
    task: 'Uppgift: Skapa `vistelser` med `id INTEGER PRIMARY KEY`, `hund_id` som pekar på `hundar (id)`, `rum_id` som pekar på `rum (id)` (båda `INTEGER NOT NULL`), `incheckning` och `utcheckning` (båda `TEXT NOT NULL`), och regeln att utcheckningen är efter incheckningen.',
    starterCode: START,
    solution: PENSIONAT_TABLES.vistelser.trim() + '\n',
    hints: [
      'Två REFERENCES: hund_id och rum_id.',
      'incheckning TEXT NOT NULL, utcheckning TEXT NOT NULL',
      'Sist i tabellen: CHECK (utcheckning > incheckning)',
    ],
    tests: [
      {
        description: 'Nycklarna pekar på hundar och rum',
        query: fk('vistelser'),
        ordered: true,
        expected: [
          ['hundar', 'hund_id', 'id'],
          ['rum', 'rum_id', 'id'],
        ],
      },
      {
        description: 'En vistelse som slutar innan den börjar stoppas',
        query:
          "INSERT INTO agare VALUES (1, 'A', NULL); INSERT INTO hundar VALUES (1, 'H', NULL, NULL, 1); INSERT INTO rum VALUES (1, 'R', 'stor', 100); INSERT OR IGNORE INTO vistelser (hund_id, rum_id, incheckning, utcheckning) VALUES (1, 1, '2026-06-10', '2026-06-05'), (1, 1, '2026-06-10', '2026-06-12'); SELECT incheckning, utcheckning FROM vistelser",
        expected: [['2026-06-10', '2026-06-12']],
      },
    ],
  },
  {
    id: 'slutprojekt-04',
    track: 'slutprojekt',
    db: 'pensionat',
    title: 'En ny kund',
    xp: 20,
    description:
      'Nu är databasen fylld med riktiga kunder. Kolla 📋 Tabellerna. En ny kund ringer: Nora Berg har en pudel som heter Kalle, född 2020.',
    explain:
      'När något pekar på något annat läggs det in i rätt ordning: först ägaren, sedan hunden som pekar på ägaren.\n\nÄgaren får id 5 (nästa nummer), och det är det hunden ska peka på.',
    example:
      "INSERT INTO kunder (namn) VALUES ('Ny');\nINSERT INTO ordrar (kund_id, datum, status) VALUES (11, '2026-06-15', 'skickad');",
    task: 'Uppgift: Lägg in ägaren `Nora Berg` med telefon `070-500 50 50`, och hennes hund `Kalle`, ras `Pudel`, född 2020.',
    starterCode: START,
    solution:
      "INSERT INTO agare (namn, telefon) VALUES ('Nora Berg', '070-500 50 50');\nINSERT INTO hundar (namn, ras, fodd, agare_id) VALUES ('Kalle', 'Pudel', 2020, 5);\n",
    hints: [
      'Först INSERT INTO agare, sedan INSERT INTO hundar.',
      'Nora får id 5.',
      "INSERT INTO hundar (namn, ras, fodd, agare_id) VALUES ('Kalle', 'Pudel', 2020, 5);",
    ],
    tests: [
      {
        description: 'Kalle hör till Nora',
        query:
          'SELECT h.namn, h.ras, h.fodd, a.namn, a.telefon FROM hundar h JOIN agare a ON h.agare_id = a.id WHERE h.id = 7',
        expected: [['Kalle', 'Pudel', 2020, 'Nora Berg', '070-500 50 50']],
      },
    ],
  },
  {
    id: 'slutprojekt-05',
    track: 'slutprojekt',
    db: 'pensionat',
    title: 'Vilka är här idag?',
    xp: 25,
    description:
      'Personalen vill ha en lista varje morgon: vilka hundar bor här idag, och vem ringer man om något händer?',
    explain:
      "En hund är här idag om den checkat in idag eller tidigare, och checkar ut **efter** idag: `incheckning <= '2026-06-15' AND utcheckning > '2026-06-15'`.\n\nDen som checkar ut idag har redan gått hem.",
    example:
      "SELECT * FROM lan WHERE lanad <= '2026-06-15' AND aterlamnad IS NULL;",
    task: "Uppgift: Visa hundens `namn`, rummets namn som `rum`, ägarens namn som `agare` och `telefon` för hundarna som är här idag, `'2026-06-15'`.",
    starterCode: START,
    solution:
      "SELECT h.namn, r.namn AS rum, a.namn AS agare, a.telefon\nFROM vistelser v\nJOIN hundar h ON v.hund_id = h.id\nJOIN rum r ON v.rum_id = r.id\nJOIN agare a ON h.agare_id = a.id\nWHERE v.incheckning <= '2026-06-15' AND v.utcheckning > '2026-06-15';\n",
    hints: [
      'Fyra tabeller: vistelser, hundar, rum och agare.',
      "WHERE v.incheckning <= '2026-06-15' AND v.utcheckning > '2026-06-15'",
      'r.namn AS rum, a.namn AS agare',
    ],
    tests: [
      {
        description: 'Rocky och Ludde',
        check: 'rows',
        expected: [
          ['Rocky', 'Rum 2', 'Omar Ali', '070-200 20 20'],
          ['Ludde', 'Rum 1', 'Omar Ali', '070-200 20 20'],
        ],
      },
      {
        description: 'Kolumnerna är namn, rum, agare och telefon',
        check: 'columns',
        expected: ['namn', 'rum', 'agare', 'telefon'],
      },
    ],
  },
  {
    id: 'slutprojekt-06',
    track: 'slutprojekt',
    db: 'pensionat',
    title: 'Vad kostar det?',
    xp: 25,
    description:
      'Varje vistelse ska faktureras: antal nätter gånger rummets pris.',
    explain:
      'Antalet nätter är dagarna mellan in- och utcheckning: `julianday(utcheckning) - julianday(incheckning)`. Priset står hos rummet.\n\nEtt alias går inte att använda i samma `SELECT` det skapas i, så uträkningen skrivs ut två gånger – eller läggs i en `WITH`.',
    example:
      "SELECT julianday('2026-06-17') - julianday('2026-06-10') AS natter;",
    task: 'Uppgift: Visa vistelsens `id`, hundens `namn`, antal nätter som `natter` och kostnaden som `kostnad` för alla vistelser.',
    starterCode: START,
    solution:
      'SELECT v.id, h.namn,\n  julianday(v.utcheckning) - julianday(v.incheckning) AS natter,\n  (julianday(v.utcheckning) - julianday(v.incheckning)) * r.pris_per_natt AS kostnad\nFROM vistelser v\nJOIN hundar h ON v.hund_id = h.id\nJOIN rum r ON v.rum_id = r.id;\n',
    hints: [
      'julianday(v.utcheckning) - julianday(v.incheckning) AS natter',
      'Kostnaden är nätterna gånger r.pris_per_natt.',
      'JOIN hundar och rum.',
    ],
    tests: [{ description: 'Nätter och kostnad', check: 'rows' }],
  },
  {
    id: 'slutprojekt-07',
    track: 'slutprojekt',
    db: 'pensionat',
    title: 'Intäkter per månad',
    xp: 25,
    description: 'Ägaren vill veta hur mycket pensionatet tjänat varje månad.',
    explain:
      'Kostnaden per vistelse räknade du nyss. Lägg den i en `WITH`, så blir nästa steg en vanlig `GROUP BY` på månaden.\n\nSå bygger man stora rapporter: en `WITH` per steg, och sist en kort fråga som sätter ihop det.',
    example:
      "WITH k AS (SELECT datum, 1 AS antal FROM ordrar)\nSELECT strftime('%m', datum) AS manad, SUM(antal) FROM k GROUP BY manad;",
    task: "Uppgift: Visa varje månad (efter incheckningen, `strftime('%m', …)`) som `manad` och intäkterna som `intakter`, i månadsordning.",
    starterCode: START,
    solution:
      "WITH kostnader AS (\n  SELECT v.incheckning,\n    (julianday(v.utcheckning) - julianday(v.incheckning)) * r.pris_per_natt AS kostnad\n  FROM vistelser v\n  JOIN rum r ON v.rum_id = r.id\n)\nSELECT strftime('%m', incheckning) AS manad, SUM(kostnad) AS intakter\nFROM kostnader\nGROUP BY manad\nORDER BY manad;\n",
    hints: [
      'WITH kostnader AS (SELECT v.incheckning, … AS kostnad FROM vistelser v JOIN rum r …)',
      "strftime('%m', incheckning) AS manad",
      'GROUP BY manad ORDER BY manad',
    ],
    tests: [
      {
        description: 'Intäkterna per månad',
        check: 'rows',
        ordered: true,
        expected: [
          ['03', 3150],
          ['04', 1750],
          ['05', 2800],
          ['06', 5000],
        ],
      },
    ],
  },
  {
    id: 'slutprojekt-08',
    track: 'slutprojekt',
    db: 'pensionat',
    title: 'De bästa kunderna',
    xp: 25,
    description: 'Vilka ägare har betalat mest? De ska få ett tack till jul.',
    explain:
      'Följ nycklarna: vistelser → hundar → agare, och rum för priset. En ägare med två hundar får båda hundarnas vistelser.',
    example:
      'SELECT a.namn, COUNT(*) FROM hundar h JOIN agare a ON h.agare_id = a.id GROUP BY a.namn;',
    task: 'Uppgift: Visa varje ägares `namn` och vad ägaren betalat totalt som `totalt`, mest först.',
    starterCode: START,
    solution:
      'SELECT a.namn,\n  SUM((julianday(v.utcheckning) - julianday(v.incheckning)) * r.pris_per_natt) AS totalt\nFROM vistelser v\nJOIN hundar h ON v.hund_id = h.id\nJOIN agare a ON h.agare_id = a.id\nJOIN rum r ON v.rum_id = r.id\nGROUP BY a.namn\nORDER BY totalt DESC;\n',
    hints: [
      'JOIN hundar, agare och rum.',
      'SUM av nätter gånger pris.',
      'GROUP BY a.namn ORDER BY totalt DESC',
    ],
    tests: [
      {
        description: 'Ägarna, mest först',
        check: 'rows',
        ordered: true,
        expected: [
          ['Sara Lind', 4500],
          ['Omar Ali', 4200],
          ['Eva Nord', 2250],
          ['Jens Holm', 1750],
        ],
      },
    ],
  },
  {
    id: 'slutprojekt-09',
    track: 'slutprojekt',
    db: 'pensionat',
    title: 'Rummens beläggning',
    xp: 25,
    description: 'Vilket rum används mest? Kanske behövs fler små rum.',
    explain:
      'Här kommer fönsterfunktionen från förra banan till nytta: räkna nätterna per rum med `GROUP BY`, och ge rummen en plats med `RANK() OVER (ORDER BY …)`.\n\nEn fönsterfunktion kan stå i samma fråga som `GROUP BY` – den räknas ut sist, på grupperna.',
    example:
      'SELECT genre, COUNT(*) AS antal, RANK() OVER (ORDER BY COUNT(*) DESC) AS plats FROM filmer GROUP BY genre;',
    task: 'Uppgift: Visa rummets `namn`, `storlek`, antal nätter som `natter` och platsen som `plats` (flest nätter är plats 1).',
    starterCode: START,
    solution:
      'SELECT r.namn, r.storlek,\n  SUM(julianday(v.utcheckning) - julianday(v.incheckning)) AS natter,\n  RANK() OVER (ORDER BY SUM(julianday(v.utcheckning) - julianday(v.incheckning)) DESC) AS plats\nFROM vistelser v\nJOIN rum r ON v.rum_id = r.id\nGROUP BY r.namn, r.storlek;\n',
    hints: [
      'GROUP BY r.namn, r.storlek',
      'SUM av nätterna AS natter',
      'RANK() OVER (ORDER BY SUM( … ) DESC) AS plats',
    ],
    tests: [
      {
        description: 'Rummen med nätter och plats',
        check: 'rows',
        expected: [
          ['Rum 1', 'stor', 13, 2],
          ['Rum 2', 'stor', 9, 3],
          ['Rum 3', 'liten', 20, 1],
        ],
      },
    ],
  },
];
