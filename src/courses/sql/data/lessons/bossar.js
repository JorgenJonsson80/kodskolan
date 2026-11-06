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
};
