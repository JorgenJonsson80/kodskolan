// Bana 9: CREATE TABLE med typer, PRIMARY KEY, NOT NULL, DEFAULT, CHECK
// och REFERENCES, ALTER TABLE och två tabeller som hör ihop. Tabellens
// form rättas med pragma_table_info (cid, name, type, notnull,
// dflt_value, pk) och pragma_foreign_key_list.
const START = '-- Skriv din kod här\n';

const columnsOf = table =>
  `SELECT name, type FROM pragma_table_info('${table}')`;

export const SKAPA = [
  {
    id: 'skapa-01',
    track: 'skapa',
    db: null,
    title: 'Din första tabell',
    xp: 15,
    description:
      'Hittills har tabellerna funnits. Nu bygger du en egen, i en tom databas.',
    explain:
      '`CREATE TABLE husdjur (namn TEXT, art TEXT, alder INTEGER)` skapar en tabell med tre kolumner.\n\nVarje kolumn har ett namn och en typ: `TEXT` för text, `INTEGER` för heltal och `REAL` för decimaltal.',
    example: 'CREATE TABLE vaxter (namn TEXT, hojd REAL);',
    task: 'Uppgift: Skapa tabellen `husdjur` med kolumnerna `namn` (TEXT), `art` (TEXT) och `alder` (INTEGER).',
    starterCode: START,
    solution:
      'CREATE TABLE husdjur (\n  namn TEXT,\n  art TEXT,\n  alder INTEGER\n);\n',
    hints: [
      'CREATE TABLE husdjur ( … );',
      'Inom parentesen: kolumnens namn och typ, med kommatecken mellan.',
      'namn TEXT, art TEXT, alder INTEGER',
    ],
    tests: [
      {
        description: 'husdjur har rätt kolumner och typer',
        query: columnsOf('husdjur'),
        ordered: true,
        expected: [
          ['namn', 'TEXT'],
          ['art', 'TEXT'],
          ['alder', 'INTEGER'],
        ],
      },
    ],
  },
  {
    id: 'skapa-02',
    track: 'skapa',
    db: null,
    title: 'Fyll den',
    xp: 15,
    description: 'En tom tabell är inte mycket att fråga. Fyll den och titta.',
    explain:
      'Efter `CREATE TABLE` kan du direkt skriva `INSERT` och sist en `SELECT`. Semikolon mellan varje sats.\n\nKör du igen skapas allt på nytt, så du får aldrig "tabellen finns redan".',
    example:
      "CREATE TABLE vaxter (namn TEXT, hojd REAL);\nINSERT INTO vaxter VALUES ('Ficus', 1.2);\nSELECT * FROM vaxter;",
    task: 'Uppgift: Skapa `husdjur` som förut, lägg in `Måns` (katt, 4 år) och `Fido` (hund, 7 år), och visa allt i tabellen.',
    starterCode: START,
    solution:
      "CREATE TABLE husdjur (namn TEXT, art TEXT, alder INTEGER);\nINSERT INTO husdjur VALUES ('Måns', 'katt', 4), ('Fido', 'hund', 7);\nSELECT * FROM husdjur;\n",
    hints: [
      'Tre satser: CREATE TABLE, INSERT och SELECT.',
      "VALUES ('Måns', 'katt', 4), ('Fido', 'hund', 7)",
      'SELECT * FROM husdjur; sist.',
    ],
    tests: [
      {
        description: 'Måns och Fido',
        check: 'rows',
        expected: [
          ['Måns', 'katt', 4],
          ['Fido', 'hund', 7],
        ],
      },
    ],
  },
  {
    id: 'skapa-03',
    track: 'skapa',
    db: null,
    title: 'Ett id till varje rad',
    xp: 15,
    description:
      'Två husdjur kan heta samma sak. Varje rad behöver något som är unikt.',
    explain:
      '`id INTEGER PRIMARY KEY` är radens id. Värdet måste vara unikt, och om du inte anger något får raden nästa nummer: 1, 2, 3 …\n\nDärför nämner du kolumnerna i `INSERT` och hoppar över `id`.',
    example:
      "CREATE TABLE vaxter (id INTEGER PRIMARY KEY, namn TEXT);\nINSERT INTO vaxter (namn) VALUES ('Ficus');",
    task: 'Uppgift: Skapa `husdjur` med `id INTEGER PRIMARY KEY`, `namn` och `art` (TEXT). Lägg in Måns (katt) och Fido (hund) utan id, och visa `id` och `namn`.',
    starterCode: START,
    solution:
      "CREATE TABLE husdjur (\n  id INTEGER PRIMARY KEY,\n  namn TEXT,\n  art TEXT\n);\nINSERT INTO husdjur (namn, art) VALUES ('Måns', 'katt'), ('Fido', 'hund');\nSELECT id, namn FROM husdjur;\n",
    hints: [
      'id INTEGER PRIMARY KEY först i tabellen.',
      'INSERT INTO husdjur (namn, art) VALUES …',
      'SELECT id, namn FROM husdjur;',
    ],
    tests: [
      {
        description: 'Måns fick id 1 och Fido id 2',
        check: 'rows',
        expected: [
          [1, 'Måns'],
          [2, 'Fido'],
        ],
      },
      {
        description: 'id är tabellens nyckel',
        query: "SELECT name FROM pragma_table_info('husdjur') WHERE pk = 1",
        expected: [['id']],
      },
    ],
  },
  {
    id: 'skapa-04',
    track: 'skapa',
    db: null,
    title: 'Får inte saknas',
    xp: 15,
    description: 'Ett husdjur utan namn är ingen bra rad.',
    explain:
      '`NOT NULL` efter typen gör att kolumnen måste ha ett värde. Ett `INSERT` utan den stoppas med ett fel.\n\nSätt `NOT NULL` på det som alltid måste finnas, och låt det som kan saknas vara utan.',
    example:
      'CREATE TABLE vaxter (id INTEGER PRIMARY KEY, namn TEXT NOT NULL, hojd REAL);',
    task: 'Uppgift: Skapa `husdjur` med `id INTEGER PRIMARY KEY`, `namn TEXT NOT NULL`, `art TEXT NOT NULL` och `alder INTEGER` (som får saknas).',
    starterCode: START,
    solution:
      'CREATE TABLE husdjur (\n  id INTEGER PRIMARY KEY,\n  namn TEXT NOT NULL,\n  art TEXT NOT NULL,\n  alder INTEGER\n);\n',
    hints: [
      'NOT NULL efter typen.',
      'namn TEXT NOT NULL, art TEXT NOT NULL',
      'alder INTEGER utan NOT NULL.',
    ],
    tests: [
      {
        description: 'namn och art måste finnas, alder får saknas',
        query: 'SELECT name, "notnull" FROM pragma_table_info(\'husdjur\')',
        ordered: true,
        expected: [
          ['id', 0],
          ['namn', 1],
          ['art', 1],
          ['alder', 0],
        ],
      },
    ],
  },
  {
    id: 'skapa-05',
    track: 'skapa',
    db: null,
    title: 'Ett standardvärde',
    xp: 15,
    description:
      'En att göra-lista: nya uppgifter är alltid "kvar" från början.',
    explain:
      "`DEFAULT 'kvar'` ger kolumnen ett värde när `INSERT` inte nämner den.\n\nDet är bra för sådant som nästan alltid är samma i början: status, antal eller dagens datum.",
    example: 'CREATE TABLE vaxter (namn TEXT, vattnad INTEGER DEFAULT 0);',
    task: "Uppgift: Skapa `uppgifter` med `id INTEGER PRIMARY KEY`, `titel TEXT NOT NULL` och `status TEXT` med standardvärdet `'kvar'`.",
    starterCode: START,
    solution:
      "CREATE TABLE uppgifter (\n  id INTEGER PRIMARY KEY,\n  titel TEXT NOT NULL,\n  status TEXT DEFAULT 'kvar'\n);\n",
    hints: [
      'DEFAULT efter typen.',
      "status TEXT DEFAULT 'kvar'",
      'titel TEXT NOT NULL',
    ],
    tests: [
      {
        description: 'En ny uppgift får status kvar',
        query:
          "INSERT INTO uppgifter (titel) VALUES ('Diska'); SELECT titel, status FROM uppgifter",
        expected: [['Diska', 'kvar']],
      },
    ],
  },
  {
    id: 'skapa-06',
    track: 'skapa',
    db: null,
    title: 'En regel för värdena',
    xp: 20,
    description: 'Ett betyg från 1 till 5. En sjua ska inte gå att spara.',
    explain:
      '`CHECK (betyg BETWEEN 1 AND 5)` efter kolumnen är en regel som varje rad måste följa. Ett värde som bryter mot den stoppas.\n\nAllt du lärt dig om villkor i `WHERE` fungerar i `CHECK`.',
    example: 'CREATE TABLE vaxter (namn TEXT, hojd REAL CHECK (hojd > 0));',
    task: 'Uppgift: Skapa `omdomen` med `id INTEGER PRIMARY KEY`, `text TEXT` och `betyg INTEGER NOT NULL` som bara får vara 1 till 5.',
    starterCode: START,
    solution:
      'CREATE TABLE omdomen (\n  id INTEGER PRIMARY KEY,\n  text TEXT,\n  betyg INTEGER NOT NULL CHECK (betyg BETWEEN 1 AND 5)\n);\n',
    hints: [
      'CHECK ( … ) efter typen.',
      'betyg BETWEEN 1 AND 5',
      'betyg INTEGER NOT NULL CHECK (betyg BETWEEN 1 AND 5)',
    ],
    tests: [
      {
        description: 'Betyget 4 går att spara',
        query:
          "INSERT OR IGNORE INTO omdomen (text, betyg) VALUES ('Bra', 4); SELECT COUNT(*) FROM omdomen",
        expected: [[1]],
      },
      {
        description: 'Betygen 0 och 7 stoppas',
        query:
          "INSERT OR IGNORE INTO omdomen (text, betyg) VALUES ('Noll', 0), ('Sju', 7); SELECT COUNT(*) FROM omdomen WHERE betyg IN (0, 7)",
        expected: [[0]],
      },
    ],
  },
  {
    id: 'skapa-07',
    track: 'skapa',
    db: 'butik',
    title: 'Peka på en annan tabell',
    xp: 20,
    description: 'Butiken vill spara kundernas omdömen om produkterna.',
    explain:
      '`produkt_id INTEGER REFERENCES produkter (id)` gör kolumnen till en **främmande nyckel**: värdet måste finnas som `id` i `produkter`.\n\nDå kan ingen spara ett omdöme om en produkt som inte finns. Det är så tabellerna i alla databaserna hänger ihop.',
    example:
      'CREATE TABLE favoriter (kund_id INTEGER REFERENCES kunder (id), produkt_id INTEGER REFERENCES produkter (id));',
    task: 'Uppgift: Skapa `omdomen` med `id INTEGER PRIMARY KEY`, `produkt_id INTEGER NOT NULL` som pekar på `produkter (id)`, och `betyg INTEGER`.',
    starterCode: START,
    solution:
      'CREATE TABLE omdomen (\n  id INTEGER PRIMARY KEY,\n  produkt_id INTEGER NOT NULL REFERENCES produkter (id),\n  betyg INTEGER\n);\n',
    hints: [
      'REFERENCES produkter (id) efter typen.',
      'produkt_id INTEGER NOT NULL REFERENCES produkter (id)',
      'id INTEGER PRIMARY KEY först, betyg INTEGER sist.',
    ],
    tests: [
      {
        description: 'produkt_id pekar på produkter.id',
        query:
          'SELECT "table", "from", "to" FROM pragma_foreign_key_list(\'omdomen\')',
        expected: [['produkter', 'produkt_id', 'id']],
      },
      {
        description: 'Kolumnerna är id, produkt_id och betyg',
        query: columnsOf('omdomen'),
        ordered: true,
        expected: [
          ['id', 'INTEGER'],
          ['produkt_id', 'INTEGER'],
          ['betyg', 'INTEGER'],
        ],
      },
    ],
  },
  {
    id: 'skapa-08',
    track: 'skapa',
    db: 'butik',
    title: 'En kolumn till',
    xp: 15,
    description: 'Butiken vill spara kundernas telefonnummer också.',
    explain:
      '`ALTER TABLE kunder ADD COLUMN telefon TEXT` lägger till en kolumn i en tabell som redan finns. Raderna som finns får NULL i den nya kolumnen.\n\nTabellen behöver alltså inte göras om från början.',
    example: 'ALTER TABLE produkter ADD COLUMN beskrivning TEXT;',
    task: "Uppgift: Lägg till kolumnen `telefon` (TEXT) i `kunder`, och ge Anna Berg (`id` 1) numret `'070-123 45 67'`.",
    starterCode: START,
    solution:
      "ALTER TABLE kunder ADD COLUMN telefon TEXT;\nUPDATE kunder SET telefon = '070-123 45 67' WHERE id = 1;\n",
    hints: [
      'ALTER TABLE kunder ADD COLUMN telefon TEXT;',
      'Sedan en UPDATE med WHERE id = 1.',
      "UPDATE kunder SET telefon = '070-123 45 67' WHERE id = 1;",
    ],
    tests: [
      {
        description: 'Anna har telefon, de andra NULL',
        query: 'SELECT id, telefon FROM kunder WHERE telefon IS NOT NULL',
        expected: [[1, '070-123 45 67']],
      },
    ],
  },
  {
    id: 'skapa-09',
    track: 'skapa',
    db: null,
    title: 'Två tabeller som hör ihop',
    xp: 25,
    description: 'En fotbollsklubb har lag, och varje spelare tillhör ett lag.',
    explain:
      'Det här är grunden i databasdesign: varje sak får en egen tabell, och en nyckel visar hur de hör ihop. Lagets namn står en gång, i `lag`, och spelarna pekar dit med `lag_id`.\n\nByter laget namn ändras en enda rad.',
    example:
      'CREATE TABLE klasser (id INTEGER PRIMARY KEY, namn TEXT);\nCREATE TABLE elever (id INTEGER PRIMARY KEY, namn TEXT, klass_id INTEGER REFERENCES klasser (id));',
    task: `Uppgift: Bygg klubben.
  1. Tabellen \`lag\` med \`id INTEGER PRIMARY KEY\` och \`namn TEXT NOT NULL\`.
  2. Tabellen \`spelare\` med \`id INTEGER PRIMARY KEY\`, \`namn TEXT NOT NULL\` och \`lag_id INTEGER\` som pekar på \`lag (id)\`.
  3. Lagen \`Blå\` och \`Gul\`, och spelarna \`Ali\` och \`Bea\` i Blå och \`Cim\` i Gul.`,
    starterCode: START,
    solution:
      "CREATE TABLE lag (\n  id INTEGER PRIMARY KEY,\n  namn TEXT NOT NULL\n);\nCREATE TABLE spelare (\n  id INTEGER PRIMARY KEY,\n  namn TEXT NOT NULL,\n  lag_id INTEGER REFERENCES lag (id)\n);\nINSERT INTO lag (namn) VALUES ('Blå'), ('Gul');\nINSERT INTO spelare (namn, lag_id) VALUES ('Ali', 1), ('Bea', 1), ('Cim', 2);\n",
    hints: [
      'Skapa lag först, eftersom spelare pekar på den.',
      'lag_id INTEGER REFERENCES lag (id)',
      'Blå får id 1 och Gul id 2, så Ali och Bea har lag_id 1.',
    ],
    tests: [
      {
        description: 'Spelarna i rätt lag',
        query:
          'SELECT s.namn, l.namn FROM spelare s JOIN lag l ON s.lag_id = l.id',
        expected: [
          ['Ali', 'Blå'],
          ['Bea', 'Blå'],
          ['Cim', 'Gul'],
        ],
      },
      {
        description: 'lag_id pekar på lag.id',
        query:
          'SELECT "table", "from", "to" FROM pragma_foreign_key_list(\'spelare\')',
        expected: [['lag', 'lag_id', 'id']],
      },
    ],
  },
];
