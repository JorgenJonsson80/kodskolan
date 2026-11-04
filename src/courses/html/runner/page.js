import { checkPage } from './checkPage';
import { usesTailwind } from './tailwindScript';

export const PAGE_WIDTH = 800;

// Sidan laddas i en osynlig iframe med en viss bredd. sandbox utan
// allow-scripts: skript på sidan körs inte, men vi kommer åt dokumentet
// eftersom det har samma ursprung (allow-same-origin).
function loadPage(code, width) {
  return new Promise(resolve => {
    const frame = document.createElement('iframe');
    frame.setAttribute('sandbox', 'allow-same-origin');
    frame.setAttribute('aria-hidden', 'true');
    frame.tabIndex = -1;
    // Utanför skärmen men med riktig storlek, så att layouten räknas ut.
    Object.assign(frame.style, {
      position: 'fixed',
      left: '-10000px',
      top: '0',
      width: `${width}px`,
      height: '600px',
      border: '0',
    });
    frame.addEventListener('load', () => resolve(frame));
    frame.srcdoc = code;
    document.body.append(frame);
  });
}

const widthOf = test => test.width ?? PAGE_WIDTH;

// Elevens sida rättas i webbläsaren. Ett test med width (t.ex. 375 för en
// mobil) rättas i en egen iframe med den bredden, så att @media slår till.
export async function runPage({ code: written, tests }) {
  let code = written;
  let warnings = [];
  if (usesTailwind(written)) {
    const tailwind = await import('./tailwind');
    code = await tailwind.withTailwind(written);
    warnings = await tailwind.unknownTailwindClasses(written);
  }
  const results = new Map();
  for (const width of new Set(tests.map(widthOf))) {
    const frame = await loadPage(code, width);
    const own = tests.filter(test => widthOf(test) === width);
    const checked = checkPage(frame.contentDocument, own).tests;
    own.forEach((test, index) => results.set(test, checked[index]));
    frame.remove();
  }
  return {
    syntaxError: null,
    error: null,
    tests: tests.map(test => results.get(test)),
    output: [],
    console: [],
    warnings,
  };
}
