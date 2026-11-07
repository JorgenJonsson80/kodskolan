import { evaluate as evaluatePython } from '../../python/runner/evaluate';

// Python-kursens rättning, plus svaret på 📮 Anropa som ResponseView visar.
export function evaluate(lesson, code, raw) {
  return { ...evaluatePython(lesson, code, raw), response: raw.response };
}
