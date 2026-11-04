import { LAYOUT_HELPERS } from '../runner/checkPage';
import { usesTailwind } from '../runner/tailwindScript';

const CALLS = new RegExp(`\\b(${LAYOUT_HELPERS.join('|')})\\(`);

// Övningar som mäter layout eller rättas i en annan bredd går inte att
// rätta i jsdom. Inte heller Tailwind, eller CSS-variabler, som jsdom inte
// räknar ut. De rättas bara i Chrome (grading.browser.test.js).
export const needsBrowser = item =>
  usesTailwind(item.solution) ||
  /var\(--/.test(item.solution) ||
  item.tests.some(test => test.width || CALLS.test(test.code));
