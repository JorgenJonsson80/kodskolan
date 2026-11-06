// En boss per bana: en större uppgift som använder allt från banan, utan
// ledtrådar. Banan räknas inte som klar förrän bossen är besegrad.
// index.js lägger varje boss sist i sin bana.
const BOSS_INTRO = 'Bossen har inga ledtrådar – visa vad du kan! ';
const START = '-- Skriv din fråga här\n';

export const BOSSES = {
  select: {
    id: 'select-boss',
    track: 'select',
    db: 'butik',
    title: 'Boss: Lagerlistan',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Butikens chef vill ha en lista att ta med till lagret. Du behöver kolumner, en uträkning och LIMIT.',
    task: `Uppgift: Gör lagerlistan.
  1. Överst en kommentar som säger vad frågan är till för.
  2. Visa \`namn\`, \`kategori\`, \`lager\` och vad lagret är värt (\`pris * lager\`), i den ordningen.
  3. Bara de 6 första produkterna.`,
    starterCode: START,
    solution:
      '-- Lagerlistan till chefen\nSELECT namn, kategori, lager, pris * lager\nFROM produkter\nLIMIT 6;\n',
    hints: [],
    tests: [
      {
        description: 'De sex första produkterna med lagrets värde',
        check: 'rows',
      },
    ],
    sourceChecks: [
      { description: 'Det finns en kommentar med --', pattern: /--\s*\S/ },
    ],
  },
  filtrera: {
    id: 'filtrera-boss',
    track: 'filtrera',
    db: 'bibliotek',
    title: 'Boss: De försenade lånen',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Biblioteket vill skicka påminnelser. Idag är det 2026-06-15. Datum står som text, och text som 2026-06-01 går att jämföra med < och > precis som tal.',
    task: `Uppgift: Hitta de försenade lånen.
  1. Ett lån är försenat om boken inte är återlämnad (\`aterlamnad\` saknas) och \`forfaller\` är före \`'2026-06-15'\`.
  2. Visa \`id\`, \`bok_id\`, \`lantagare_id\` och \`forfaller\` för de lånen, i den ordningen.`,
    starterCode: START,
    solution:
      "SELECT id, bok_id, lantagare_id, forfaller\nFROM lan\nWHERE aterlamnad IS NULL AND forfaller < '2026-06-15';\n",
    hints: [],
    tests: [
      {
        description: 'De tre försenade lånen',
        check: 'rows',
        expected: [
          [5, 13, 5, '2026-05-31'],
          [6, 9, 4, '2026-06-05'],
          [7, 4, 1, '2026-06-12'],
        ],
      },
      {
        description: 'Kolumnerna är id, bok_id, lantagare_id och forfaller',
        check: 'columns',
        expected: ['id', 'bok_id', 'lantagare_id', 'forfaller'],
      },
    ],
  },
  sortera: {
    id: 'sortera-boss',
    track: 'sortera',
    db: 'skola',
    title: 'Boss: Topplistan i matte',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Matteläraren vill sätta upp en topplista på väggen. Du behöver WHERE, ORDER BY, LIMIT och AS. Matematik har kurs_id 1.',
    task: `Uppgift: Gör topplistan.
  1. Bara resultaten i Matematik (\`kurs_id\` 1).
  2. Visa \`elev_id\` som \`elev\` och \`poang\` som \`resultat\`, i den ordningen.
  3. Högst resultat först, och bara de 3 bästa.`,
    starterCode: START,
    solution:
      'SELECT elev_id AS elev, poang AS resultat\nFROM resultat\nWHERE kurs_id = 1\nORDER BY poang DESC\nLIMIT 3;\n',
    hints: [],
    tests: [
      {
        description: 'De tre bästa, bäst först',
        check: 'rows',
        ordered: true,
        expected: [
          [7, 98],
          [1, 92],
          [11, 90],
        ],
      },
      {
        description: 'Kolumnerna är elev och resultat',
        check: 'columns',
        expected: ['elev', 'resultat'],
      },
    ],
  },
  gruppera: {
    id: 'gruppera-boss',
    track: 'gruppera',
    db: 'butik',
    title: 'Boss: Bästsäljarna',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Butiken ska beställa nytt och vill veta vad som säljer. Varje rad i orderrader är en vara i en order, och antal är hur många.',
    task: `Uppgift: Hitta bästsäljarna.
  1. Visa \`produkt_id\` och hur många som sålts totalt, som \`salda\`.
  2. Bara produkterna som sålts i minst 5 exemplar.
  3. Mest såld först.`,
    starterCode: START,
    solution:
      'SELECT produkt_id, SUM(antal) AS salda\nFROM orderrader\nGROUP BY produkt_id\nHAVING SUM(antal) >= 5\nORDER BY salda DESC;\n',
    hints: [],
    tests: [
      {
        description: 'Bästsäljarna, mest såld först',
        check: 'rows',
        ordered: true,
        expected: [
          [7, 24],
          [8, 12],
          [1, 8],
          [9, 6],
        ],
      },
      {
        description: 'Kolumnerna är produkt_id och salda',
        check: 'columns',
        expected: ['produkt_id', 'salda'],
      },
    ],
  },
  omvandla: {
    id: 'omvandla-boss',
    track: 'omvandla',
    db: 'bibliotek',
    title: 'Boss: Lånelistan',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Bibliotekarien vill ha en lista över alla lån med en tydlig status. Idag är det 2026-06-15.',
    task: `Uppgift: Gör lånelistan.
  1. Visa \`id\`, lånemånaden som \`manad\` (\`strftime('%m', lanad)\`) och \`status\`, i den ordningen.
  2. \`status\` är \`tillbaka\` om boken är återlämnad, \`försenad\` om den förföll före \`'2026-06-15'\` och annars \`utlånad\`.
  3. Sortera på \`id\`.`,
    starterCode: START,
    solution:
      "SELECT id,\n  strftime('%m', lanad) AS manad,\n  CASE\n    WHEN aterlamnad IS NOT NULL THEN 'tillbaka'\n    WHEN forfaller < '2026-06-15' THEN 'försenad'\n    ELSE 'utlånad'\n  END AS status\nFROM lan\nORDER BY id;\n",
    hints: [],
    tests: [
      { description: 'Alla lån med status', check: 'rows', ordered: true },
      {
        description: 'Kolumnerna är id, manad och status',
        check: 'columns',
        expected: ['id', 'manad', 'status'],
      },
    ],
  },
  join: {
    id: 'join-boss',
    track: 'join',
    db: 'bibliotek',
    title: 'Boss: Påminnelselappen',
    isBoss: true,
    xp: 50,
    description:
      BOSS_INTRO +
      'I bana 2 hittade du de försenade lånen, men bara som id. Nu ska påminnelsen ha namn, telefon och boktitel. Idag är det 2026-06-15.',
    task: `Uppgift: Gör påminnelselappen.
  1. De försenade lånen: inte återlämnade och \`forfaller\` före \`'2026-06-15'\`.
  2. Visa låntagarens \`namn\` och \`telefon\`, bokens \`titel\` och \`forfaller\`, i den ordningen.
  3. Den som är mest försenad först.`,
    starterCode: START,
    solution:
      "SELECT lt.namn, lt.telefon, b.titel, l.forfaller\nFROM lan l\nJOIN lantagare lt ON l.lantagare_id = lt.id\nJOIN bocker b ON l.bok_id = b.id\nWHERE l.aterlamnad IS NULL AND l.forfaller < '2026-06-15'\nORDER BY l.forfaller;\n",
    hints: [],
    tests: [
      {
        description: 'Tre påminnelser, mest försenad först',
        check: 'rows',
        ordered: true,
        expected: [
          ['Amira Said', '070-555 66 77', 'Sagan om ringen', '2026-05-31'],
          ['Erik Sand', '070-444 55 66', 'En man som heter Ove', '2026-06-05'],
          ['Tove Ek', '070-111 22 33', 'Ronja Rövardotter', '2026-06-12'],
        ],
      },
    ],
  },
  saknas: {
    id: 'saknas-boss',
    track: 'saknas',
    db: 'bibliotek',
    title: 'Boss: Låntagarlistan',
    isBoss: true,
    xp: 50,
    description:
      BOSS_INTRO +
      'Biblioteket vill se alla låntagare: hur mycket de lånat och hur mycket de har hemma just nu. Även de som aldrig lånat något.',
    task: `Uppgift: Gör låntagarlistan.
  1. Alla låntagare, även de utan lån.
  2. Visa \`namn\`, antal lån som \`lan\` och antal lån som inte är återlämnade som \`hemma\`, i den ordningen.
  3. Flest lån först, och i bokstavsordning efter namn om två har lika många.`,
    starterCode: START,
    solution:
      'SELECT lt.namn,\n  COUNT(l.id) AS lan,\n  COUNT(l.id) - COUNT(l.aterlamnad) AS hemma\nFROM lantagare lt\nLEFT JOIN lan l ON l.lantagare_id = lt.id\nGROUP BY lt.namn\nORDER BY lan DESC, lt.namn;\n',
    hints: [],
    tests: [
      {
        description: 'Alla låntagare, flest lån först',
        check: 'rows',
        ordered: true,
        expected: [
          ['Amira Said', 3, 2],
          ['Malik Osman', 3, 2],
          ['Tove Ek', 3, 1],
          ['Erik Sand', 2, 1],
          ['Lisa Holm', 1, 1],
          ['Per Lind', 0, 0],
        ],
      },
      {
        description: 'Kolumnerna är namn, lan och hemma',
        check: 'columns',
        expected: ['namn', 'lan', 'hemma'],
      },
    ],
  },
  andra: {
    id: 'andra-boss',
    track: 'andra',
    db: 'butik',
    title: 'Boss: Nya ordern',
    isBoss: true,
    xp: 50,
    description:
      BOSS_INTRO +
      'Clara Ek (kund 3) ringer och beställer idag, 2026-06-15. Allt ska in i databasen, och lagret ska stämma efteråt.',
    task: `Uppgift: Registrera ordern.
  1. En ny order för kund 3, daterad \`'2026-06-15'\` med status \`'skickad'\`. Den får id 16.
  2. Orderns rader: 1 st Espresso Bönor (produkt 2) och 3 st Chokladboll (produkt 8).
  3. Minska \`lager\` för de två produkterna med lika många som beställdes.`,
    starterCode: '-- Skriv din kod här\n',
    solution:
      "INSERT INTO ordrar (kund_id, datum, status) VALUES (3, '2026-06-15', 'skickad');\nINSERT INTO orderrader (order_id, produkt_id, antal) VALUES (16, 2, 1), (16, 8, 3);\nUPDATE produkter SET lager = lager - 1 WHERE id = 2;\nUPDATE produkter SET lager = lager - 3 WHERE id = 8;\n",
    hints: [],
    tests: [
      {
        description: 'Order 16 finns',
        query: 'SELECT id, kund_id, datum, status FROM ordrar WHERE id = 16',
        expected: [[16, 3, '2026-06-15', 'skickad']],
      },
      {
        description: 'Orderns två rader',
        query: 'SELECT produkt_id, antal FROM orderrader WHERE order_id = 16',
        expected: [
          [2, 1],
          [8, 3],
        ],
      },
      {
        description: 'Lagret stämmer',
        query: 'SELECT id, lager FROM produkter',
      },
    ],
  },
  skapa: {
    id: 'skapa-boss',
    track: 'skapa',
    db: null,
    title: 'Boss: Bokcirkeln',
    isBoss: true,
    xp: 60,
    description:
      BOSS_INTRO +
      'En bokcirkel vill hålla koll på medlemmarna, träffarna och vem som kom. Det blir tre tabeller.',
    task: `Uppgift: Bygg bokcirkelns databas.
  1. \`medlemmar\`: \`id INTEGER PRIMARY KEY\`, \`namn TEXT NOT NULL\` och \`epost TEXT UNIQUE\` (två får inte ha samma).
  2. \`traffar\`: \`id INTEGER PRIMARY KEY\`, \`datum TEXT NOT NULL\` och \`bok TEXT NOT NULL\`.
  3. \`narvaro\`: \`medlem_id\` som pekar på \`medlemmar (id)\` och \`traff_id\` som pekar på \`traffar (id)\`, båda \`INTEGER NOT NULL\`.
  4. Medlemmarna Ada (ada@exempel.se) och Bo (bo@exempel.se), träffen 2026-05-20 om \`Utvandrarna\` och 2026-06-10 om \`Björnstad\`. Ada kom till båda, Bo bara till den första.`,
    starterCode: '-- Skriv din kod här\n',
    solution:
      "CREATE TABLE medlemmar (\n  id INTEGER PRIMARY KEY,\n  namn TEXT NOT NULL,\n  epost TEXT UNIQUE\n);\nCREATE TABLE traffar (\n  id INTEGER PRIMARY KEY,\n  datum TEXT NOT NULL,\n  bok TEXT NOT NULL\n);\nCREATE TABLE narvaro (\n  medlem_id INTEGER NOT NULL REFERENCES medlemmar (id),\n  traff_id INTEGER NOT NULL REFERENCES traffar (id)\n);\nINSERT INTO medlemmar (namn, epost) VALUES ('Ada', 'ada@exempel.se'), ('Bo', 'bo@exempel.se');\nINSERT INTO traffar (datum, bok) VALUES ('2026-05-20', 'Utvandrarna'), ('2026-06-10', 'Björnstad');\nINSERT INTO narvaro (medlem_id, traff_id) VALUES (1, 1), (1, 2), (2, 1);\n",
    hints: [],
    tests: [
      {
        description: 'narvaro pekar på medlemmar och traffar',
        query:
          'SELECT "table", "from", "to" FROM pragma_foreign_key_list(\'narvaro\') ORDER BY "from"',
        ordered: true,
        expected: [
          ['medlemmar', 'medlem_id', 'id'],
          ['traffar', 'traff_id', 'id'],
        ],
      },
      {
        description: 'Två medlemmar får inte ha samma e-post',
        query:
          "INSERT OR IGNORE INTO medlemmar (namn, epost) VALUES ('Kopia', 'ada@exempel.se'); SELECT COUNT(*) FROM medlemmar",
        expected: [[2]],
      },
      {
        description: 'Vem kom till vilken träff',
        query:
          'SELECT m.namn, t.bok FROM narvaro n JOIN medlemmar m ON n.medlem_id = m.id JOIN traffar t ON n.traff_id = t.id',
        expected: [
          ['Ada', 'Utvandrarna'],
          ['Ada', 'Björnstad'],
          ['Bo', 'Utvandrarna'],
        ],
      },
    ],
  },
  delfragor: {
    id: 'delfragor-boss',
    track: 'delfragor',
    db: 'butik',
    title: 'Boss: De bästa kunderna',
    isBoss: true,
    xp: 50,
    description:
      BOSS_INTRO +
      'Butiken vill belöna kunderna som handlat för mer än snittkunden. Det kräver två steg: först varje kunds totala summa, sedan snittet av dem.',
    task: `Uppgift: Hitta de bästa kunderna.
  1. Räkna ut hur mycket varje kund handlat för totalt i en \`WITH\` (kunder, ordrar, orderrader och produkter).
  2. Visa kundens \`namn\` och summan som \`totalt\` för kunderna som handlat för mer än snittet av alla kunders summor.
  3. Mest först.`,
    starterCode: START,
    solution:
      'WITH kundsumma AS (\n  SELECT k.namn, SUM(r.antal * p.pris) AS totalt\n  FROM kunder k\n  JOIN ordrar o ON o.kund_id = k.id\n  JOIN orderrader r ON r.order_id = o.id\n  JOIN produkter p ON r.produkt_id = p.id\n  GROUP BY k.namn\n)\nSELECT namn, totalt\nFROM kundsumma\nWHERE totalt > (SELECT AVG(totalt) FROM kundsumma)\nORDER BY totalt DESC;\n',
    hints: [],
    tests: [
      {
        description: 'Kunderna över snittet, mest först',
        check: 'rows',
        ordered: true,
      },
      {
        description: 'Kolumnerna är namn och totalt',
        check: 'columns',
        expected: ['namn', 'totalt'],
      },
    ],
    sourceChecks: [
      { description: 'Frågan använder WITH', pattern: /\bWITH\b/i },
    ],
  },
  felsok: {
    id: 'felsok-boss',
    track: 'felsok',
    db: 'butik',
    title: 'Boss: Junirapporten',
    isBoss: true,
    xp: 50,
    description:
      BOSS_INTRO +
      'Kollegan har skrivit en rapport över junis försäljning per kategori, men den ger inga rader. Det finns tre fel – och bara ett av dem syns direkt när de andra är lagade.',
    task: `Uppgift: Laga rapporten.
  1. Den ska visa varje \`kategori\` och vad som sålts för i juni som \`summa\`.
  2. Störst summa först.`,
    starterCode:
      "SELECT p.kategori, SUM(r.antal * p.pris) AS summa\nFROM orderrader r\nJOIN produkter p ON r.order_id = p.id\nJOIN ordrar o ON r.order_id = o.id\nWHERE strftime('%m', o.datum) = 6\nGROUP BY p.kategori\nORDER BY summa;\n",
    solution:
      "SELECT p.kategori, SUM(r.antal * p.pris) AS summa\nFROM orderrader r\nJOIN produkter p ON r.produkt_id = p.id\nJOIN ordrar o ON r.order_id = o.id\nWHERE strftime('%m', o.datum) = '06'\nGROUP BY p.kategori\nORDER BY summa DESC;\n",
    hints: [],
    tests: [
      {
        description: 'Junis försäljning, störst först',
        check: 'rows',
        ordered: true,
        expected: [
          ['Kaffe', 178],
          ['Bakverk', 135],
          ['Tillbehör', 35],
        ],
      },
    ],
  },
};
