import { explainError } from './friendlyErrors';
import { TIMEOUT_MS } from './python';

// Visar ett JSON-värde som Python skriver det: True, None, 'text'.
export function pyRepr(value) {
  if (value === null || value === undefined) return 'None';
  if (value === true) return 'True';
  if (value === false) return 'False';
  if (typeof value === 'string') {
    return value.includes("'") && !value.includes('"')
      ? `"${value}"`
      : `'${value.replaceAll('\\', '\\\\').replaceAll("'", "\\'")}'`;
  }
  if (Array.isArray(value)) return `[${value.map(pyRepr).join(', ')}]`;
  if (typeof value === 'object') {
    return `{${Object.entries(value)
      .map(([key, item]) => `${pyRepr(key)}: ${pyRepr(item)}`)
      .join(', ')}}`;
  }
  return String(value);
}

// Utskriften i klartext: Hej · Då, i stället för ['Hej', 'Då'].
export function outputText(lines) {
  return lines.length > 0 ? lines.join(' · ') : 'ingenting';
}

function describeFailure(test, entry) {
  if (entry.error) {
    return `koden stoppade med ett fel: ${explainError(entry.error)}`;
  }
  if (test.code === '__output') {
    return `utskriften blev ${outputText(entry.actual)} men skulle vara ${outputText(test.expected)}`;
  }
  return `fick ${entry.repr} men skulle vara ${pyRepr(test.expected)}`;
}

const isLines = value =>
  Array.isArray(value) && value.every(item => typeof item === 'string');

// Det som ska jämföras i Visa skillnaden, som rader: utskrift och listor
// med text rad för rad, text uppdelad vid radbrytningar och andra listor
// och dictionaries som en rad. Rena tal, sant/falskt och None syns ändå,
// så där blir det null.
export function diffFor(test, entry) {
  const { expected } = test;
  if (entry.passed || entry.error) return null;
  if (typeof expected === 'string') {
    return typeof entry.actual === 'string'
      ? { actual: entry.actual.split('\n'), expected: expected.split('\n') }
      : null;
  }
  if (expected === null || typeof expected !== 'object') return null;
  if (isLines(expected) && isLines(entry.actual)) {
    return { actual: entry.actual, expected };
  }
  return { actual: [entry.repr], expected: [pyRepr(expected)] };
}

const PRAISE = [
  'Snyggt! 🎉',
  'Rätt! Bra jobbat! 🎉',
  'Alla tester gick igenom! 🎉',
];

// lesson: övningen, raw: svaret från harness.py (eller { timedOut }).
export function evaluate(lesson, code, raw) {
  if (raw.timedOut) {
    return {
      isCorrect: false,
      message: `Koden tog mer än ${TIMEOUT_MS / 1000} sekunder och stoppades. Kanske en loop som aldrig tar slut?`,
      output: [],
      results: [],
    };
  }
  const base = {
    output: raw.console ?? [],
    app: raw.app ?? [],
    figures: raw.figures ?? [],
  };

  if (raw.syntaxError) {
    return {
      ...base,
      isCorrect: false,
      message:
        'Nästan! Python kunde inte läsa koden – det är ett vanligt fel, och lätt att rätta.',
      error: { ...raw.syntaxError, isSyntax: true },
      results: [],
    };
  }
  if (raw.error) {
    return {
      ...base,
      isCorrect: false,
      message:
        'Koden stoppade med ett fel. Läs förklaringen nedan – fel är en del av att koda.',
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
      diff: diffFor(test, entry),
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

  const isCorrect = results.every(result => result.passed);
  return {
    ...base,
    isCorrect,
    message: isCorrect
      ? PRAISE[Math.floor(Math.random() * PRAISE.length)]
      : 'Inte riktigt än – kolla testerna nedan och försök igen!',
    results,
  };
}
