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
};
