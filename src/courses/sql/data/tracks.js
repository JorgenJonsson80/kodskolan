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
  {
    id: 'sortera',
    title: 'Sortera och räkna',
    teaches: [
      'ORDER BY',
      'DESC',
      'DISTINCT',
      'AS',
      'COUNT',
      'SUM',
      'AVG',
      'MIN',
      'MAX',
    ],
    reward: { emoji: '🏆', name: 'Pokal' },
    canBuild: 'en topplista, och svaret på hur många, hur mycket och i snitt',
    docs: [
      { title: 'ORDER BY', url: `${TUTORIAL}sqlite-order-by/` },
      { title: 'DISTINCT', url: `${TUTORIAL}sqlite-distinct/` },
      {
        title: 'COUNT, SUM och de andra',
        url: `${TUTORIAL}sqlite-aggregate-functions/`,
      },
    ],
  },
  {
    id: 'gruppera',
    title: 'Gruppera',
    teaches: ['GROUP BY', 'HAVING', 'COUNT per grupp', 'WHERE före GROUP BY'],
    reward: { emoji: '🧺', name: 'Korg' },
    canBuild:
      'en rapport med en rad per stad, kategori eller kund, som försäljningen per vara',
    docs: [
      { title: 'GROUP BY', url: `${TUTORIAL}sqlite-group-by/` },
      { title: 'HAVING', url: `${TUTORIAL}sqlite-having/` },
    ],
  },
  {
    id: 'omvandla',
    title: 'Räkna och omvandla',
    teaches: [
      'ROUND',
      'UPPER',
      'LENGTH',
      'SUBSTR',
      '||',
      'strftime',
      'julianday',
      'CASE WHEN',
    ],
    reward: { emoji: '🪄', name: 'Trollstav' },
    canBuild:
      'en lista där värdena blir begripliga: avrundade, ihopsatta, per månad och med egna etiketter',
    docs: [
      {
        title: 'Funktioner för text',
        url: `${TUTORIAL}sqlite-string-functions/`,
      },
      {
        title: 'Datum',
        url: `${TUTORIAL}sqlite-date-functions/sqlite-strftime-function/`,
      },
      { title: 'CASE', url: `${TUTORIAL}sqlite-case/` },
    ],
  },
  {
    id: 'join',
    title: 'Flera tabeller',
    teaches: ['nycklar', 'JOIN … ON', 'alias för tabeller', 'flera JOIN'],
    reward: { emoji: '🧩', name: 'Pusselbit' },
    canBuild:
      'rapporter som hämtar från flera tabeller, som vem som köpt vad och för hur mycket',
    docs: [
      { title: 'JOIN', url: `${TUTORIAL}sqlite-inner-join/` },
      { title: 'Nycklar', url: `${TUTORIAL}sqlite-foreign-key/` },
    ],
  },
  {
    id: 'saknas',
    title: 'Det som saknas',
    teaches: [
      'LEFT JOIN',
      'IS NULL efter JOIN',
      'COALESCE',
      'COUNT(kolumn)',
      'villkor i ON',
    ],
    reward: { emoji: '🔍', name: 'Förstoringsglas' },
    canBuild:
      'listor över det som inte hänt: kunder som aldrig handlat, böcker som aldrig lånats',
    docs: [
      { title: 'LEFT JOIN', url: `${TUTORIAL}sqlite-left-join/` },
      { title: 'NULL', url: `${TUTORIAL}sqlite-is-null/` },
    ],
  },
  {
    id: 'andra',
    title: 'Ändra data',
    teaches: [
      'INSERT INTO',
      'VALUES',
      'UPDATE … SET',
      'DELETE FROM',
      'främmande nycklar',
    ],
    reward: { emoji: '✏️', name: 'Penna' },
    canBuild:
      'det som händer i en riktig app: nya kunder, ändrade priser och en order som registreras',
    docs: [
      { title: 'INSERT', url: `${TUTORIAL}sqlite-insert/` },
      { title: 'UPDATE', url: `${TUTORIAL}sqlite-update/` },
      { title: 'DELETE', url: `${TUTORIAL}sqlite-delete/` },
    ],
  },
  {
    id: 'skapa',
    title: 'Bygg en databas',
    teaches: [
      'CREATE TABLE',
      'typer',
      'PRIMARY KEY',
      'NOT NULL',
      'DEFAULT',
      'CHECK',
      'REFERENCES',
      'ALTER TABLE',
    ],
    reward: { emoji: '🏗️', name: 'Byggkran' },
    canBuild:
      'en egen databas från grunden, med tabeller som hänger ihop och regler som håller den hel',
    docs: [
      { title: 'CREATE TABLE', url: `${TUTORIAL}sqlite-create-table/` },
      { title: 'PRIMARY KEY', url: `${TUTORIAL}sqlite-primary-key/` },
      { title: 'FOREIGN KEY', url: `${TUTORIAL}sqlite-foreign-key/` },
    ],
  },
  {
    id: 'delfragor',
    title: 'Frågor i frågor',
    teaches: [
      'delfrågor',
      'IN (SELECT …)',
      'NOT IN',
      'korrelerade delfrågor',
      'WITH',
      'EXISTS',
    ],
    reward: { emoji: '🪆', name: 'Babusjka' },
    canBuild: 'svar i flera steg, som kunderna som handlat mer än snittkunden',
    docs: [
      { title: 'Delfrågor', url: `${TUTORIAL}sqlite-subquery/` },
      { title: 'EXISTS', url: `${TUTORIAL}sqlite-exists/` },
    ],
  },
  {
    id: 'felsok',
    title: 'Felsökning',
    teaches: [
      'läsa felmeddelanden',
      'fel utan felmeddelande',
      'AND och OR',
      'heltal',
      'fel nyckel',
    ],
    reward: { emoji: '🩺', name: 'Stetoskop' },
    canBuild:
      'att hitta felet i någon annans fråga, även när den inte ger något felmeddelande',
    docs: [
      {
        title: 'Operatorernas ordning',
        url: 'https://www.sqlite.org/lang_expr.html',
      },
      { title: 'SELECT steg för steg', url: `${TUTORIAL}sqlite-select/` },
    ],
  },
  {
    id: 'fonster',
    title: 'Fönsterfunktioner',
    teaches: [
      'ROW_NUMBER',
      'RANK',
      'DENSE_RANK',
      'PARTITION BY',
      'SUM och AVG med OVER',
      'LAG',
      'topp N per grupp',
    ],
    reward: { emoji: '🪟', name: 'Fönster' },
    canBuild:
      'topplistor per grupp, löpande summor och jämförelser med raden före – det dataanalytiker gör varje dag',
    docs: [
      {
        title: 'Fönsterfunktioner',
        url: `${TUTORIAL}sqlite-window-functions/`,
      },
      {
        title: 'Fönsterfunktioner i SQLite',
        url: 'https://www.sqlite.org/windowfunctions.html',
      },
    ],
  },
  {
    id: 'slutprojekt',
    title: 'Slutprojektet',
    teaches: [
      'databasdesign',
      'egna tabeller',
      'rapporter',
      'allt från kursen',
    ],
    reward: { emoji: '🏁', name: 'Målflagga' },
    canBuild:
      'en hel databas för ett riktigt företag, från tomma tabeller till rapporterna chefen vill ha',
    docs: [
      { title: 'Databasdesign', url: `${TUTORIAL}sqlite-foreign-key/` },
      {
        title: 'SQLite-dokumentationen',
        url: 'https://www.sqlite.org/lang.html',
      },
    ],
  },
];
