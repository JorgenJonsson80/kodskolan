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
  sortera: [
    {
      topic: 'ORDER BY',
      read: `${TUTORIAL}sqlite-order-by/`,
      video: 'sql order by asc desc beginners',
    },
    {
      topic: 'COUNT, SUM och AVG',
      read: `${TUTORIAL}sqlite-aggregate-functions/`,
      video: 'sql aggregate functions count sum avg',
    },
    {
      topic: 'AS och alias',
      read: `${TUTORIAL}sqlite-select/`,
      video: 'sql alias as explained',
    },
  ],
  gruppera: [
    {
      topic: 'GROUP BY',
      read: `${TUTORIAL}sqlite-group-by/`,
      video: 'sql group by förklaring',
    },
    {
      topic: 'HAVING eller WHERE?',
      read: `${TUTORIAL}sqlite-having/`,
      video: 'sql having vs where',
    },
  ],
  omvandla: [
    {
      topic: 'Text och ||',
      read: `${TUTORIAL}sqlite-string-functions/`,
      video: 'sql string functions concatenate upper substr',
    },
    {
      topic: 'Datum med strftime',
      read: `${TUTORIAL}sqlite-date-functions/sqlite-strftime-function/`,
      video: 'sqlite strftime date functions',
    },
    {
      topic: 'CASE WHEN',
      read: `${TUTORIAL}sqlite-case/`,
      video: 'sql case when explained',
    },
  ],
  join: [
    {
      topic: 'JOIN',
      read: `${TUTORIAL}sqlite-inner-join/`,
      video: 'sql join förklaring nybörjare',
    },
    {
      topic: 'Nycklar mellan tabeller',
      read: `${TUTORIAL}sqlite-foreign-key/`,
      video: 'primary key foreign key explained',
    },
  ],
  saknas: [
    {
      topic: 'LEFT JOIN',
      read: `${TUTORIAL}sqlite-left-join/`,
      video: 'sql left join explained',
    },
    {
      topic: 'NULL och COALESCE',
      read: `${TUTORIAL}sqlite-is-null/`,
      video: 'sql null coalesce explained',
    },
  ],
  andra: [
    {
      topic: 'INSERT',
      read: `${TUTORIAL}sqlite-insert/`,
      video: 'sql insert into tutorial',
    },
    {
      topic: 'UPDATE och DELETE',
      read: `${TUTORIAL}sqlite-update/`,
      video: 'sql update delete where',
    },
  ],
  skapa: [
    {
      topic: 'CREATE TABLE',
      read: `${TUTORIAL}sqlite-create-table/`,
      video: 'sql create table beginners',
    },
    {
      topic: 'Nycklar och regler',
      read: `${TUTORIAL}sqlite-foreign-key/`,
      video: 'database design primary key foreign key',
    },
    {
      topic: 'Databasdesign',
      read: `${TUTORIAL}sqlite-primary-key/`,
      video: 'databasdesign normalisering nybörjare',
    },
  ],
};
