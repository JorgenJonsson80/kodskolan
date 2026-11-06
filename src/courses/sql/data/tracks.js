// Banorna i ordning. reward är föremålet eleven får när banan är klar, och
// canBuild avslutar meningen "Nu kan du t.ex. bygga …" i firandet. docs
// länkar till SQLite Tutorial för den som vill läsa mer. Resten av
// banorna står i docs/kurser/sql.md och läggs till en i taget.
const TUTORIAL = 'https://www.sqlitetutorial.net/';

export const TRACKS = [
  {
    id: 'select',
    title: 'Första frågan',
    teaches: ['SELECT', 'FROM', '*', 'kolumner', 'LIMIT', '--', ';'],
    reward: { emoji: '🔦', name: 'Ficklampa' },
    canBuild: 'en lista över allt i en tabell, med bara de kolumner du behöver',
    docs: [
      { title: 'SELECT', url: `${TUTORIAL}sqlite-select/` },
      { title: 'LIMIT', url: `${TUTORIAL}sqlite-limit/` },
    ],
  },
  {
    id: 'filtrera',
    title: 'Filtrera',
    teaches: [
      'WHERE',
      '= <> < >',
      'AND',
      'OR',
      'IN',
      'BETWEEN',
      'LIKE',
      'IS NULL',
    ],
    reward: { emoji: '🧲', name: 'Magnet' },
    canBuild:
      'en sökning som plockar fram precis de rader du letar efter, som alla försenade lån',
    docs: [
      { title: 'WHERE', url: `${TUTORIAL}sqlite-where/` },
      { title: 'AND och OR', url: `${TUTORIAL}sqlite-and/` },
      { title: 'IN', url: `${TUTORIAL}sqlite-in/` },
      { title: 'BETWEEN', url: `${TUTORIAL}sqlite-between/` },
      { title: 'LIKE', url: `${TUTORIAL}sqlite-like/` },
      { title: 'IS NULL', url: `${TUTORIAL}sqlite-is-null/` },
    ],
  },
];
