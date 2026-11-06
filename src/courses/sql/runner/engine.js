// Kör elevens SQL och rättar den. Samma fil används i webbläsarens worker
// (sqlWorker.js) och i testerna i Node (test/nodeSql.js), så att rättningen
// är densamma. SQL är sql.js-modulen (SQLite i WebAssembly).
//
// Ett test kan vara:
//   { check: 'rows' }      elevens sista resultat har samma rader som facit
//   { check: 'columns' }   samma kolumnnamn som facit (stora och små
//                          bokstäver spelar ingen roll)
//   { query: 'SELECT …' }  frågan körs efteråt, i elevens och i facits
//                          databas, och ska ge samma rader. Så rättas
//                          INSERT, UPDATE, DELETE och CREATE TABLE.
// Med expected jämförs med det i stället för med facit (rader som listor,
// kolumner som namn). ordered: true när ordningen ska stämma, annars
// sorteras raderna före jämförelsen.

const MAX_ROWS = 200;

// Kör satserna en i taget, så att en SELECT utan rader ändå ger sina
// kolumner (exec() svarar inte alls då).
function runStatements(database, code) {
  const results = [];
  let changes = 0;
  for (const statement of database.iterateStatements(code)) {
    const columns = statement.getColumnNames();
    const values = [];
    while (statement.step()) values.push(statement.get());
    if (columns.length > 0) {
      results.push({ columns, values });
      changes = 0;
    } else {
      changes = database.getRowsModified();
    }
  }
  return { results, changes };
}

function execute(SQL, setup, code, queries) {
  const database = new SQL.Database();
  try {
    database.exec('PRAGMA foreign_keys = ON;');
    if (setup) database.exec(setup);
    let results = [];
    let error = null;
    let changes = 0;
    try {
      ({ results, changes } = runStatements(database, code));
    } catch (thrown) {
      error = { message: String(thrown.message ?? thrown) };
    }
    const after = queries.map(query => {
      try {
        return (
          runStatements(database, query).results.at(-1) ?? {
            columns: [],
            values: [],
          }
        );
      } catch (thrown) {
        return { error: String(thrown.message ?? thrown) };
      }
    });
    const names = schemaNames(database);
    return { results, error, changes, after, names };
  } finally {
    database.close();
  }
}

// Alla tabell- och kolumnnamn, till "Menade du …?".
function schemaNames(database) {
  const tables = database.exec(
    "SELECT name FROM sqlite_master WHERE type = 'table'",
  )[0];
  const tableNames = tables ? tables.values.map(([name]) => name) : [];
  const columns = tableNames.flatMap(table =>
    (database.exec(`PRAGMA table_info("${table}")`)[0]?.values ?? []).map(
      row => row[1],
    ),
  );
  return { tables: tableNames, columns: [...new Set(columns)] };
}

// Hur lika två ord är: antal tecken som måste läggas till, tas bort,
// bytas eller byta plats (nman → namn är ett).
function distance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) =>
      i === 0 ? j : j === 0 ? i : 0,
    ),
  );
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + cost,
      );
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[a.length][b.length];
}

export function closest(word, candidates) {
  const lower = word.toLowerCase();
  // kund → kunder, film → filmer: början av ett namn räcker.
  const start =
    lower.length >= 3 &&
    candidates.find(
      candidate =>
        candidate.toLowerCase() !== lower &&
        candidate.toLowerCase().startsWith(lower),
    );
  if (start) return start;
  const best = candidates
    .map(candidate => ({
      candidate,
      score: distance(lower, candidate.toLowerCase()),
    }))
    .sort((a, b) => a.score - b.score)[0];
  const limit = Math.max(1, Math.floor(lower.length / 3));
  return best && best.score <= limit && best.score > 0 ? best.candidate : null;
}

const KEYWORDS = [
  'SELECT',
  'FROM',
  'WHERE',
  'ORDER',
  'GROUP',
  'BY',
  'HAVING',
  'LIMIT',
  'JOIN',
  'LEFT',
  'INNER',
  'ON',
  'AS',
  'AND',
  'OR',
  'NOT',
  'IN',
  'LIKE',
  'BETWEEN',
  'DISTINCT',
  'INSERT',
  'INTO',
  'VALUES',
  'UPDATE',
  'SET',
  'DELETE',
  'CREATE',
  'TABLE',
  'WITH',
  'CASE',
  'WHEN',
  'THEN',
  'ELSE',
  'END',
  'NULL',
  'DESC',
  'ASC',
];

// Raden där ordet först står i koden (utanför kommentarer), eller null.
function lineOf(code, word) {
  if (!word) return null;
  const lines = code.split('\n');
  const pattern = new RegExp(
    `(^|[^\\w])${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|[^\\w])`,
    'i',
  );
  const index = lines.findIndex(line =>
    pattern.test(line.replace(/--.*$/, '')),
  );
  return index === -1 ? null : index + 1;
}

// Felet med det som behövs för en förklaring: raden, och ett förslag om
// ett namn är felstavat.
function describeError(error, code, names) {
  const message = error.message;
  const near = message.match(/near "([^"]+)": syntax error/);
  const missing = message.match(/no such (column|table|function): (\S+)/);
  const isSyntax = Boolean(near) || /incomplete input/.test(message);
  let suggestion = null;
  let word = near?.[1] ?? missing?.[2] ?? null;
  if (missing?.[1] === 'column') {
    // "no such column: k.namn" – förslaget gäller kolumnen.
    word = missing[2].split('.').at(-1);
    suggestion = closest(word, names?.columns ?? []);
  } else if (missing?.[1] === 'table') {
    suggestion = closest(missing[2], names?.tables ?? []);
  } else if (near) {
    suggestion = closest(near[1], KEYWORDS);
  }
  return {
    type: isSyntax ? 'SyntaxError' : 'Error',
    message,
    code,
    line: lineOf(code, word),
    suggestion,
  };
}

// Ett resultat som eleven kan se: kolumnerna och raderna, högst MAX_ROWS.
function tableOf(result) {
  if (!result) return null;
  return {
    columns: result.columns,
    rows: result.values.slice(0, MAX_ROWS),
    total: result.values.length,
  };
}

const sortKey = row => JSON.stringify(row);
const normalizeRows = (rows, ordered) =>
  ordered ? rows : [...rows].sort((a, b) => (sortKey(a) < sortKey(b) ? -1 : 1));

// Flyttal som 3.3333333333333335 och 3.333333333333333 räknas som lika.
const sameValue = (a, b) =>
  typeof a === 'number' && typeof b === 'number'
    ? Math.abs(a - b) < 1e-9
    : a === b;

const sameRows = (a, b, ordered) => {
  if (a.length !== b.length) return false;
  const left = normalizeRows(a, ordered);
  const right = normalizeRows(b, ordered);
  return left.every(
    (row, index) =>
      row.length === right[index].length &&
      row.every((value, column) => sameValue(value, right[index][column])),
  );
};

const lower = names => names.map(name => String(name).toLowerCase());

function grade(test, student, solution, index) {
  if (test.query) {
    const actual = student.after[index];
    const expected = test.expected
      ? { values: test.expected }
      : solution.after[index];
    if (actual.error) {
      return { passed: false, kind: 'query', error: actual.error };
    }
    return {
      passed: sameRows(
        actual.values ?? [],
        expected.values ?? [],
        test.ordered,
      ),
      kind: 'query',
      actual: actual.values ?? [],
      expected: expected.values ?? [],
    };
  }
  const actual = student.results.at(-1) ?? null;
  const wanted = solution.results.at(-1) ?? { columns: [], values: [] };
  if (test.check === 'columns') {
    const expected = test.expected ?? wanted.columns;
    const columns = actual?.columns ?? [];
    return {
      passed:
        JSON.stringify(lower(columns)) === JSON.stringify(lower(expected)),
      kind: 'columns',
      actual: columns,
      expected,
    };
  }
  const expected = test.expected ?? wanted.values;
  return {
    passed: actual !== null && sameRows(actual.values, expected, test.ordered),
    kind: 'rows',
    actual: actual?.values ?? null,
    expected,
    actualColumns: actual?.columns ?? [],
    expectedColumns: wanted.columns,
    ordered: Boolean(test.ordered),
  };
}

// Text i dubbla citattecken som inte är ett namn i databasen. SQLite
// godtar det, men det är fel i nästan alla andra databaser.
function doubleQuotedText(code, names) {
  const known = new Set(lower([...names.tables, ...names.columns]));
  const found = [...code.replace(/--.*$/gm, '').matchAll(/"([^"\n]*)"/g)]
    .map(match => match[1])
    .filter(text => !known.has(text.toLowerCase()));
  return [...new Set(found)];
}

function warningsFor(code, names) {
  const warnings = [];
  const source = code.replace(/--.*$/gm, '').replace(/'[^']*'/g, "''");
  for (const text of doubleQuotedText(code, names).slice(0, 2)) {
    warnings.push(
      `Text skrivs med enkla citattecken i SQL: \`'${text}'\`. Dubbla citattecken betyder ett namn på en tabell eller kolumn.`,
    );
  }
  if (/(=|!=|<>)\s*NULL\b/i.test(source)) {
    warnings.push(
      '`= NULL` blir aldrig sant, eftersom NULL betyder "vet inte". Skriv `IS NULL` eller `IS NOT NULL`.',
    );
  }
  for (const statement of source.split(';')) {
    const kind = statement.match(/^\s*(UPDATE|DELETE)\b/i)?.[1];
    if (kind && !/\bWHERE\b/i.test(statement)) {
      warnings.push(
        `${kind.toUpperCase()} utan \`WHERE\` ändrar *alla* rader i tabellen. Var det meningen?`,
      );
    }
  }
  return warnings;
}

// job: { code, setup, tests, solution }. Svaret har samma form som i de
// andra kurserna (syntaxError, error, tests, output, console) och table,
// det sista resultatet, som ResultPreview visar.
export function runSql(SQL, { code, setup = '', tests = [], solution }) {
  const queries = tests.map(test => test.query ?? 'SELECT 1');
  const student = execute(SQL, setup, code, queries);
  const needsSolution = tests.some(test => !test.expected);
  const reference =
    needsSolution && solution !== undefined
      ? execute(SQL, setup, solution, queries)
      : { results: [], after: queries.map(() => ({ values: [] })) };
  const { names } = student;
  const error = student.error
    ? describeError(student.error, code, student.names)
    : null;
  const table = tableOf(student.results.at(-1));
  const console =
    !error && !table && student.changes > 0
      ? [
          `${student.changes} ${student.changes === 1 ? 'rad' : 'rader'} ändrades.`,
        ]
      : [];
  return {
    syntaxError: error?.type === 'SyntaxError' ? error : null,
    error: error?.type === 'SyntaxError' ? null : error,
    tests: error
      ? []
      : tests.map((test, index) => grade(test, student, reference, index)),
    table,
    output: console,
    console,
    warnings: warningsFor(code, names),
  };
}

// Tabellerna i en databas med kolumner och de första raderna, till
// 📋 Tabellerna och till förslagen i editorn.
export function describeDatabase(SQL, setup, sampleRows = 5) {
  const database = new SQL.Database();
  try {
    if (setup) database.exec(setup);
    const { tables } = schemaNames(database);
    return tables.map(table => {
      const info = database.exec(`PRAGMA table_info("${table}")`)[0];
      const rows = database.exec(
        `SELECT * FROM "${table}" LIMIT ${sampleRows}`,
      )[0];
      const count = database.exec(`SELECT COUNT(*) FROM "${table}"`)[0]
        .values[0][0];
      return {
        name: table,
        columns: info.values.map(([, name, type, notNull, , primaryKey]) => ({
          name,
          type,
          notNull: Boolean(notNull),
          primaryKey: Boolean(primaryKey),
        })),
        rows: rows?.values ?? [],
        count,
      };
    });
  } finally {
    database.close();
  }
}
