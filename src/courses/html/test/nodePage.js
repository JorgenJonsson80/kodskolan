import { JSDOM } from 'jsdom';
import { checkPage } from '../runner/checkPage';

// Ärvs i webbläsaren men inte i jsdom.
const INHERITED = new Set([
  'text-align',
  'text-transform',
  'letter-spacing',
  'word-spacing',
  'white-space',
  'text-indent',
  'list-style-type',
  'cursor',
]);

const LINK_BLUE = 'rgb(0, 0, 238)';
const kebab = name =>
  name.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);

// jsdom räknar ut stilarna nästan som webbläsaren. Två skillnader rättas
// här: vissa egenskaper ärvs inte, och jsdoms egen :link-regel vinner
// över elevens a { color: … } (webbläsarens egna regler ska alltid
// förlora). Länkens färg läses därför utan href en kort stund.
function browserLikeStyle(window) {
  const original = window.getComputedStyle.bind(window);
  function value(element, property) {
    let result = original(element).getPropertyValue(property);
    if (result === '' && INHERITED.has(property) && element.parentElement) {
      return value(element.parentElement, property);
    }
    if (
      property === 'color' &&
      result === LINK_BLUE &&
      element.matches(':link')
    ) {
      const href = element.getAttribute('href');
      element.removeAttribute('href');
      result = original(element).getPropertyValue(property);
      element.setAttribute('href', href);
    }
    return result;
  }
  return element =>
    new Proxy(
      {},
      {
        get: (_, name) =>
          name === 'getPropertyValue'
            ? property => value(element, property)
            : value(element, kebab(String(name))),
      },
    );
}

// Samma rättning som i webbläsaren, mot jsdom. jsdom räknar inte ut
// layout, så checkPage räknar storlekar från stilarna i stället.
export function nodeRunPage({ code, tests }) {
  const { window } = new JSDOM(code);
  window.getComputedStyle = browserLikeStyle(window);
  const result = checkPage(window.document, tests);
  window.close();
  return result;
}
