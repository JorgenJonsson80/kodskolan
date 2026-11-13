import { TIMEOUT_MS } from './run';

const PRAISE = [
  'Snyggt! 🎉',
  'Rätt! Bra jobbat! 🎉',
  'Alla tester gick igenom! 🎉',
];

const show = value =>
  value === null || value === undefined
    ? 'ingenting'
    : Array.isArray(value)
      ? value.length > 0
        ? value.map(item => `\`${item}\``).join(', ')
        : 'inga'
      : typeof value === 'string'
        ? `\`${value.replace(/\n$/, '').replace(/\n/g, ' ⏎ ') || '(tom)'}\``
        : `\`${value}\``;

function describeFailure(test, entry) {
  if (entry.error) return `kontrollen gick inte: ${entry.error}.`;
  if (test.cwd !== undefined)
    return `du står i ${show(entry.actual)} men ska stå i ${show(entry.expected)}.`;
  if (test.exists !== undefined) return `${show(test.exists)} finns inte.`;
  if (test.missing !== undefined)
    return `${show(test.missing)} finns fortfarande.`;
  if (test.file !== undefined) {
    return entry.actual === null
      ? `filen ${show(test.file)} finns inte.`
      : `${show(test.file)} innehåller ${show(entry.actual)} men ska innehålla ${show(entry.expected)}.`;
  }
  if (test.output !== undefined)
    return `utskriften saknar ${show(test.output)}.`;
  if (test.commits !== undefined)
    return `grenen har ${entry.actual} commits men ska ha ${entry.expected}.`;
  if (test.message !== undefined)
    return `senaste commit heter ${show(entry.actual)} men ska heta ${show(entry.expected)}.`;
  if (test.clean !== undefined)
    return 'det finns ändringar som inte är committade. Kolla med `git status`.';
  if (test.staged !== undefined)
    return `tillagt för commit är ${show(entry.actual)}, men ska vara ${show(entry.expected)}.`;
  if (test.tracked !== undefined)
    return `Git följer ${show(entry.actual)}, men ska följa ${show(entry.expected)}.`;
  if (test.branch !== undefined)
    return `du står på grenen ${show(entry.actual)} men ska stå på ${show(entry.expected)}.`;
  if (test.branches !== undefined)
    return `grenarna är ${show(entry.actual)} men ska vara ${show(entry.expected)}.`;
  if (test.merged !== undefined)
    return 'senaste commit är ingen sammanslagning.';
  if (test.pushed !== undefined)
    return 'servern har inte dina senaste commits. Har du pushat?';
  return 'stämmer inte.';
}

// lesson: övningen, raw: svaret från checks.js (eller { timedOut }).
export function evaluate(lesson, code, raw) {
  if (raw.timedOut) {
    return {
      isCorrect: false,
      message: `Kommandona tog mer än ${TIMEOUT_MS / 1000} sekunder och stoppades.`,
      output: [],
      results: [],
    };
  }
  const base = { output: raw.output ?? [] };
  if (raw.error) {
    return {
      ...base,
      isCorrect: false,
      message:
        'Ett kommando gick inte. Läs förklaringen nedan – fel är en del av att lära sig terminalen.',
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
