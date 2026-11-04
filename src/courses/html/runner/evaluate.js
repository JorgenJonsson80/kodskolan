import { explainError } from './friendlyErrors';
import { htmlWarnings } from './htmlWarnings';

// Visar ett värde från ett test: "text", 3, ["a", "b"].
export function showValue(value) {
  return JSON.stringify(value ?? null).replaceAll('","', '", "');
}

// Utskriften i klartext: Hej · Då, i stället för ['Hej', 'Då'].
export function outputText(lines) {
  return lines.length > 0 ? lines.join(' · ') : 'ingenting';
}

function describeFailure(test, entry) {
  if (entry.error) {
    return `koden stoppade med ett fel: ${explainError(entry.error)}`;
  }
  if (entry.actual === null) {
    return 'hittade det inte på sidan. Kolla stavningen och att taggen eller attributet finns';
  }
  return `fick ${showValue(entry.actual)} men skulle vara ${showValue(test.expected)}`;
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
  return { actual: [showValue(entry.actual)], expected: [showValue(expected)] };
}

const PRAISE = [
  'Snyggt! 🎉',
  'Rätt! Bra jobbat! 🎉',
  'Alla tester gick igenom! 🎉',
];

// lesson: övningen, raw: svaret från checkPage.
export function evaluate(lesson, code, raw) {
  // Varningarna visas även när testerna går igenom: sidan kan se rätt ut
  // fast webbläsaren fick gissa.
  // raw.warnings kommer från rättningen, t.ex. Tailwind-klasser som inte
  // finns (se runner/tailwind.js).
  const base = {
    output: raw.console ?? [],
    warnings: [...htmlWarnings(code), ...(raw.warnings ?? [])].slice(0, 4),
  };

  if (raw.syntaxError) {
    return {
      ...base,
      isCorrect: false,
      message:
        'Nästan! Webbläsaren kunde inte läsa koden – det är ett vanligt fel, och lätt att rätta.',
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
