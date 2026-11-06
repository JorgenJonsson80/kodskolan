import initSqlJs from 'sql.js';
import { describeDatabase, runSql } from '../runner/engine';
import { setupFor } from '../data/databases';

// SQLite i Node, för testerna: samma rättning som i webbläsaren.
const SQL = await initSqlJs();

// Kör en övning som körningen i appen gör: lesson ger databasen och
// facit, code är det som rättas.
export const nodeRunLesson = (lesson, code) =>
  runSql(SQL, {
    code,
    setup: setupFor(lesson),
    tests: lesson.tests ?? [],
    solution: lesson.solution,
  });

export const nodeRunSql = job => runSql(SQL, job);

export const nodeDescribe = setup => describeDatabase(SQL, setup);
