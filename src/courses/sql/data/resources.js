// Andra sätt att lära sig banans ämnen, för den som kört fast.
// read: en sida på SQLite Tutorial (på engelska).
// video: en sökning på YouTube. Vi länkar till en sökning i stället för
// enskilda videor, eftersom videor kan försvinna men sökningen finns kvar.
const TUTORIAL = 'https://www.sqlitetutorial.net/';

export const RESOURCES = {
  select: [
    {
      topic: 'Vad är en databas?',
      read: `${TUTORIAL}what-is-sqlite/`,
      video: 'vad är en databas sql nybörjare',
    },
    {
      topic: 'SELECT och FROM',
      read: `${TUTORIAL}sqlite-select/`,
      video: 'sql select from tutorial beginners',
    },
    {
      topic: 'LIMIT',
      read: `${TUTORIAL}sqlite-limit/`,
      video: 'sql limit explained',
    },
  ],
  filtrera: [
    {
      topic: 'WHERE',
      read: `${TUTORIAL}sqlite-where/`,
      video: 'sql where clause beginners',
    },
    {
      topic: 'AND, OR och IN',
      read: `${TUTORIAL}sqlite-in/`,
      video: 'sql and or in operator',
    },
    {
      topic: 'LIKE och IS NULL',
      read: `${TUTORIAL}sqlite-like/`,
      video: 'sql like is null explained',
    },
  ],
};
