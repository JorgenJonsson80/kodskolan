import { TIMEOUT_MS } from './timeout';

// Ett värde som eleven ser det i tabellen: NULL, text utan citattecken
// och tal med högst fyra decimaler.
export function showValue(value) {
  if (value === null || value === undefined) return 'NULL';
  if (typeof value === 'number' && !Number.isInteger(value)) {
    return String(Math.round(value * 10000) / 10000);
  }
  return String(value);
}

export const showRow = row => row.map(showValue).join(' | ');

const rowWord = count => (count === 1 ? 'rad' : 'rader');
const columnWord = count => (count === 1 ? 'kolumn' : 'kolumner');

const same = (a, b) => showRow(a) === showRow(b);

// Vad som skiljer elevens rader från de rätta, i en mening.
function describeRows(entry) {
  const { actual, expected } = entry;
  if (actual === null) {
    return 'frågan gav ingen tabell. Börjar den med `SELECT`?';
  }
  const wantedColumns = expected[0]?.length ?? entry.expectedColumns.length;
  const gotColumns = actual[0]?.length ?? entry.actualColumns.length;
  if (
    expected.length > 0 &&
    actual.length > 0 &&
    gotColumns !== wantedColumns
  ) {
    return `frågan ger ${gotColumns} ${columnWord(gotColumns)} (${entry.actualColumns.join(', ')}) men ska ge ${wantedColumns}${entry.expectedColumns.length === wantedColumns ? ` (${entry.expectedColumns.join(', ')})` : ''}.`;
  }
  if (actual.length !== expected.length) {
    return `frågan gav ${actual.length} ${rowWord(actual.length)} men ska ge ${expected.length}.`;
  }
  const missing = expected.find(row => !actual.some(other => same(row, other)));
  const extra = actual.find(row => !expected.some(other => same(row, other)));
  if (missing && extra) {
    return `raden \`${showRow(extra)}\` ska inte vara med, men \`${showRow(missing)}\` saknas.`;
  }
  if (entry.ordered) {
    return 'raderna är rätt men i fel ordning. Kolla `ORDER BY`.';
  }
  return 'raderna stämmer inte.';
}

function describeFailure(test, entry) {
  if (entry.error) {
    return `kontrollen efteråt stoppade: ${entry.error}`;
  }
  if (entry.kind === 'columns') {
    return `kolumnerna heter ${entry.actual.join(', ') || 'ingenting'} men ska heta ${entry.expected.join(', ')}.`;
  }
  if (entry.kind === 'query') {
    const shown = rows =>
      rows.length === 0 ? 'inga rader' : rows.map(showRow).join(' · ');
    return `efteråt gav \`${test.query}\` ${shown(entry.actual)}, men ska ge ${shown(entry.expected)}.`;
  }
  return describeRows(entry);
}

// Underlaget till 🔍 Visa skillnaden: raderna som text, en per rad.
export function diffFor(entry) {
  if (entry.passed || entry.error || entry.kind === 'columns') return null;
  if (!entry.actual) return null;
  // Med fel antal kolumner är det kolumnerna som ska rättas, inte raderna.
  const width = rows => rows[0]?.length;
  if (
    entry.actual.length > 0 &&
    entry.expected.length > 0 &&
    width(entry.actual) !== width(entry.expected)
  ) {
    return null;
  }
  return {
    actual: entry.actual.map(showRow),
    expected: entry.expected.map(showRow),
  };
}

const PRAISE = [
  'Snyggt! 🎉',
  'Rätt! Bra jobbat! 🎉',
  'Alla tester gick igenom! 🎉',
];

// lesson: övningen, raw: svaret från engine.js (eller { timedOut }).
export function evaluate(lesson, code, raw) {
  if (raw.timedOut) {
    return {
      isCorrect: false,
      message: `Frågan tog mer än ${TIMEOUT_MS / 1000} sekunder och stoppades. Kanske en rekursiv fråga som aldrig tar slut?`,
      output: [],
      results: [],
    };
  }
  const base = {
    output: raw.console ?? [],
    table: raw.table ?? null,
    warnings: raw.warnings ?? [],
  };

  if (raw.syntaxError) {
    return {
      ...base,
      isCorrect: false,
      message:
        'Nästan! SQL kunde inte läsa frågan – det är ett vanligt fel, och lätt att rätta.',
      error: { ...raw.syntaxError, isSyntax: true },
      results: [],
    };
  }
  if (raw.error) {
    return {
      ...base,
      isCorrect: false,
      message:
        'Frågan stoppade med ett fel. Läs förklaringen nedan – fel är en del av att koda.',
      error: raw.error,
      results: [],
    };
  }

  const results = lesson.tests.map((test, index) => {
    const entry = raw.tests[index];
    return {
      description: test.description,
      passed: entry.passed,
      text: entry.passed ? null : describeFailure(test, entry),
      diff: diffFor(entry),
    };
  });
  for (const check of lesson.sourceChecks ?? []) {
    const found = check.pattern.test(code);
    results.push({
      description: check.description,
      passed: check.forbidden ? !found : found,
      text: null,
    });
  }

  const isCorrect =
    results.length > 0 && results.every(result => result.passed);
  return {
    ...base,
    isCorrect,
    message: isCorrect
      ? PRAISE[Math.floor(Math.random() * PRAISE.length)]
      : 'Inte riktigt än – kolla testerna nedan och försök igen!',
    results,
  };
}
