import { explainError as explainMessage } from './runner/friendlyErrors';
import { runTests } from './runner/runTests';

// JS Academys rättning (runTests i en worker) i kontraktets form, se
// SPEC.md. Workern svarar med fel som text, results med actual/expected
// och notes (stiltips). Här blir det syntaxError/error som objekt och
// tests, så att kärnans feedback, AI-fråga och Fastnat? fungerar.

const SYNTAX = /^Koden går inte att tolka/;
const RUNTIME_ERROR = /^[A-Z]\w*Error: /;

// Ett fel när koden körs hamnar sist i konsolen.
const lastError = output =>
  RUNTIME_ERROR.test(output?.at(-1) ?? '') ? output.at(-1) : null;

// options: fileName och files för övningar med import och export,
// sourceChecks för hur koden är skriven. preview är JSX som renderas i
// workern först (Lekplatsen). En övnings lessonPreview visas bara efteråt,
// precis som i JS Academy, så att rättningen inte ändras.
export async function runJs({
  code,
  tests = [],
  sourceChecks = [],
  fileName,
  files,
  preview,
  lessonPreview,
}) {
  const result = await runTests(code, tests, sourceChecks, {
    ...(fileName && { fileName }),
    ...(files && { files }),
    ...(preview && { preview }),
  });
  const output = result.output ?? [];
  // Ett fel sist i konsolen underkänner inget (det kan vara utskrivet med
  // flit). Det förklaras under feedbacken, och på Lekplatsen (utan tester)
  // som ett fel.
  const outputError = lastError(output);
  const message =
    result.error ??
    result.previewError ??
    (tests.length === 0 ? outputError : null);
  const error = message ? { message, code } : null;
  const isSyntax = Boolean(result.error && SYNTAX.test(result.error));
  // Förhandsvisningen kör koden på riktigt, men bara om den gick att köra
  // i workern. Annars kan en oändlig loop frysa sidan.
  const shown = preview ?? lessonPreview;
  const canPreview = shown && !result.error && !result.previewError;
  return {
    ...result,
    syntaxError: isSyntax ? { ...error, type: 'SyntaxError' } : null,
    error: isSyntax ? null : error,
    tests: result.results,
    outputError: outputError && { message: outputError, code },
    output,
    console: output,
    previewSource: canPreview
      ? { code, fileName, files, preview: shown }
      : null,
  };
}

// Konsolens rader som text, t.ex. Hej · Då, eller ingenting.
const consoleText = lines =>
  lines.length > 0 ? lines.map(String).join(' · ') : 'ingenting';

function resultText(result) {
  if (result.passed) return null;
  if (result.consoleActual) {
    return `konsolen visade ${consoleText(result.consoleActual)} men skulle visa ${consoleText(result.consoleExpected)}`;
  }
  if (RUNTIME_ERROR.test(result.actual ?? '')) {
    return 'koden stoppade med ett fel innan testet hann klart';
  }
  return result.actual !== undefined
    ? `fick ${result.actual}, förväntat ${result.expected}`
    : null;
}

// Skillnaden hjälper för konsolen, text, listor och objekt. 20 mot 25 ser
// man ändå, och ett fel har ingen rätt version att jämföra med.
function diffFor(result) {
  if (result.passed) return null;
  if (result.consoleActual) {
    return {
      actual: result.consoleActual.map(String),
      expected: result.consoleExpected.map(String),
    };
  }
  if (RUNTIME_ERROR.test(result.actual ?? '')) return null;
  if (!/^["[{]/.test(result.expected ?? '')) return null;
  return { actual: [result.actual], expected: [result.expected] };
}

// firstTrack: stiltips som semikolon väntar till efter första banan, så
// att man kan fokusera på att få koden att fungera.
export const evaluateJs = firstTrack => (lesson, code, raw) => {
  const results = raw.tests ?? [];
  const error = raw.syntaxError
    ? { ...raw.syntaxError, isSyntax: true }
    : raw.error;
  const isCorrect =
    !error && results.length > 0 && results.every(result => result.passed);
  const shownError = error ?? raw.outputError;
  return {
    isCorrect,
    message: isCorrect ? 'Rätt svar!' : '',
    error: shownError,
    output: raw.output,
    warnings: lesson.track === firstTrack ? [] : (raw.notes ?? []),
    results: results.map(result => ({
      passed: result.passed,
      description: result.description,
      text: resultText(result),
      diff: diffFor(result),
    })),
    previewSource: raw.previewSource,
  };
};

export function errorTitle(error, isSyntax) {
  return isSyntax ? 'Koden går inte att läsa' : 'Koden stoppade med ett fel';
}

export function explainError(error) {
  return (
    explainMessage(error.message, error.code) ??
    'Läs felmeddelandet nedan. Det säger vad som gick fel, och ofta på vilken rad.'
  );
}
