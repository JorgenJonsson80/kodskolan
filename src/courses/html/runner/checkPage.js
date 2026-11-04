// Rättar en färdig sida. Samma kod körs mot en iframe i webbläsaren och
// mot jsdom i testerna, så att facit rättas likadant på båda ställena.
//
// test.code är ett JavaScript-uttryck med hjälparna nedan, t.ex.
// `text('h1')` eller `css('h1', 'color')`. Hjälparna ger null i stället
// för att krascha när elementet saknas, så att eleven får "fick null men
// skulle vara …" och inte ett JavaScript-fel.
//
// jsdom räknar inte ut layout och ger värdena som eleven skrev dem (2rem),
// webbläsaren ger pixlar (32px). Hjälparna för CSS ger samma svar på
// båda ställena: px() räknar om till pixlar, colorOf() ger färgens namn,
// och boxWidth() och centered() mäter i webbläsaren men räknar från
// stilarna i jsdom.
//
// Hjälparna för layout (rows, perRow, rect …) kräver en riktig webbläsare.
// Övningar som använder dem rättas i Chrome i testerna (*.browser.test.js).
import { colorName } from './cssColors';

export const LAYOUT_HELPERS = [
  'twColor',
  'twName',
  'rect',
  'widths',
  'heights',
  'rows',
  'perRow',
  'gapX',
  'gapY',
  'inOrder',
  'fitsScreen',
];

const ROOT_PX = 16;
const BORDER_WIDTHS = { thin: 1, medium: 3, thick: 5 };
const round = number => Math.round(number * 10) / 10;

function helpers(doc) {
  const view = doc.defaultView;
  const $ = selector => doc.querySelector(selector);
  const $$ = selector => [...doc.querySelectorAll(selector)];
  const style = element => view.getComputedStyle(element);
  // Bara webbläsaren ger elementen en storlek.
  const hasLayout = () => doc.documentElement.getBoundingClientRect().width > 0;

  // Ett värde i pixlar som tal, eller värdet som det står (auto, 50%).
  function toPx(element, property) {
    if (!element) return null;
    const value = style(element).getPropertyValue(property).trim();
    if (/^border-.*-width$/.test(property)) {
      const side = property.replace('-width', '-style');
      if (style(element).getPropertyValue(side) === 'none') return 0;
      if (value in BORDER_WIDTHS) return BORDER_WIDTHS[value];
    }
    if (property === 'font-size' && value === 'medium') return ROOT_PX;
    const parts = value.match(/^(-?[\d.]+)(px|rem|em)?$/);
    if (!parts) return value;
    const number = parseFloat(parts[1]);
    if (parts[2] === 'px') return round(number);
    if (parts[2] === 'rem') return round(number * ROOT_PX);
    if (parts[2] === 'em') {
      const base = property === 'font-size' ? element.parentElement : element;
      return round(number * (base ? toPx(base, 'font-size') : ROOT_PX));
    }
    if (number === 0) return 0;
    // Ett tal utan enhet i line-height är gånger textens storlek.
    return property === 'line-height'
      ? round(number * toPx(element, 'font-size'))
      : number;
  }

  // Det som står i regler med :hover (eller :focus) som gäller elementet.
  function inState(state, selector, property) {
    const element = $(selector);
    if (!element) return null;
    let found = null;
    const visit = rules => {
      for (const rule of rules) {
        if (rule.cssRules && !rule.selectorText) visit(rule.cssRules);
        if (!rule.selectorText?.includes(state)) continue;
        const value = rule.style.getPropertyValue(property);
        if (!value) continue;
        const matches = rule.selectorText.split(',').some(part => {
          if (!part.includes(state)) return false;
          try {
            return element.matches(part.replaceAll(state, ''));
          } catch {
            return false;
          }
        });
        if (matches) found = value.trim();
      }
    };
    for (const sheet of doc.styleSheets) visit(sheet.cssRules);
    return found;
  }

  // En färg som webbläsaren skriver den: 'red' → 'rgb(255, 0, 0)'.
  const color = value => {
    const probe = doc.createElement('span');
    probe.style.color = value;
    doc.body.append(probe);
    const result = view.getComputedStyle(probe).color;
    probe.remove();
    return result;
  };

  // Rutorna för alla element som matchar, i pixlar.
  function boxes(selector) {
    if (!hasLayout()) throw new Error('Det här testet behöver en webbläsare.');
    return $$(selector).map(element => {
      const box = element.getBoundingClientRect();
      return {
        element,
        left: Math.round(box.left),
        top: Math.round(box.top),
        right: Math.round(box.right),
        bottom: Math.round(box.bottom),
        width: Math.round(box.width),
        height: Math.round(box.height),
      };
    });
  }

  // Elementen i rader som ögat ser dem: ett element börjar en ny rad när
  // det står under det lägsta elementet i raden innan. Då hamnar en ruta
  // som är två rader hög i den första raden, och resten i nästa. Varje
  // rad från vänster till höger.
  function lines(selector) {
    const sorted = boxes(selector).sort((a, b) => a.top - b.top);
    const result = [];
    let bottom = -Infinity;
    for (const box of sorted) {
      if (box.top >= bottom - 1) {
        result.push([box]);
        bottom = box.bottom;
      } else {
        result.at(-1).push(box);
        bottom = Math.min(bottom, box.bottom);
      }
    }
    return result.map(line => line.sort((a, b) => a.left - b.left));
  }

  // Tailwinds färger, som namn: 'red-500'. Tailwind skriver bara ut de
  // färger sidan använder, som variabler i @theme.
  function tailwindColor(selector, property) {
    const element = $(selector);
    if (!element) return null;
    return tailwindName(style(element).getPropertyValue(property));
  }

  // En färg, t.ex. 'var(--color-blue-600)' från hover(), som Tailwind-namn.
  function tailwindName(value) {
    if (!value) return null;
    if (!hasLayout()) throw new Error('Det här testet behöver en webbläsare.');
    const wanted = color(value);
    const names = new Set();
    const visit = rules => {
      for (const rule of rules) {
        if (rule.cssRules) visit(rule.cssRules);
        if (!rule.style) continue;
        for (const name of rule.style) {
          if (name.startsWith('--color-')) names.add(name);
        }
      }
    };
    for (const sheet of doc.styleSheets) visit(sheet.cssRules);
    const found = [...names].find(name => color(`var(${name})`) === wanted);
    return found ? found.slice('--color-'.length) : colorName(wanted);
  }

  const pxOf = (element, property) => {
    const value = toPx(element, property);
    return typeof value === 'number' ? value : 0;
  };

  return {
    doc,
    $,
    $$,
    // Texten i första elementet, med mellanslag och radbrytningar ihopslagna.
    text: selector =>
      $(selector)?.textContent.replace(/\s+/g, ' ').trim() ?? null,
    texts: selector =>
      $$(selector).map(element =>
        element.textContent.replace(/\s+/g, ' ').trim(),
      ),
    count: selector => $$(selector).length,
    attr: (selector, name) => $(selector)?.getAttribute(name) ?? null,
    css: (selector, property) => {
      const element = $(selector);
      return element
        ? view.getComputedStyle(element).getPropertyValue(property)
        : null;
    },
    // color('red') ger 'rgb(255, 0, 0)', att jämföra med css().
    color,
    // Vilken färg som helst som namn eller hex: 'tomato', '#1e3a8a'.
    colorName: value => (value ? colorName(color(value)) : null),
    colorOf: (selector, property = 'color') => {
      const element = $(selector);
      return element
        ? colorName(style(element).getPropertyValue(property))
        : null;
    },
    colorsOf: (selector, property = 'color') =>
      $$(selector).map(element =>
        colorName(style(element).getPropertyValue(property)),
      ),
    px: (selector, property) => toPx($(selector), property),
    // Första typsnittet, utan citattecken och med små bokstäver.
    font: selector => {
      const element = $(selector);
      if (!element) return null;
      const [first] = style(element).fontFamily.split(',');
      return first
        .trim()
        .replace(/^["']|["']$/g, '')
        .toLowerCase();
    },
    hover: (selector, property) => inState(':hover', selector, property),
    focus: (selector, property) => inState(':focus', selector, property),
    // Hela bredden med padding och kant, i pixlar.
    boxWidth: selector => {
      const element = $(selector);
      if (!element) return null;
      if (hasLayout()) return round(element.getBoundingClientRect().width);
      let width = toPx(element, 'width');
      if (typeof width !== 'number') return null;
      const max = toPx(element, 'max-width');
      if (typeof max === 'number') width = Math.min(width, max);
      if (style(element).boxSizing === 'border-box') return width;
      return round(
        width +
          pxOf(element, 'padding-left') +
          pxOf(element, 'padding-right') +
          pxOf(element, 'border-left-width') +
          pxOf(element, 'border-right-width'),
      );
    },
    twColor: (selector, property = 'color') =>
      tailwindColor(selector, property),
    twName: tailwindName,
    rect: selector => {
      const [box] = boxes(selector);
      if (!box) return null;
      const { left, top, width, height } = box;
      return { left, top, width, height };
    },
    widths: selector => boxes(selector).map(box => box.width),
    heights: selector => boxes(selector).map(box => box.height),
    // Hur många rader elementen står på, och hur många i första raden.
    rows: selector => lines(selector).length,
    perRow: selector => lines(selector)[0]?.length ?? 0,
    // Luften mellan de två första i första raden, och mellan första och
    // andra raden.
    gapX: selector => {
      const [first, second] = lines(selector)[0] ?? [];
      return second ? second.left - first.right : null;
    },
    gapY: selector => {
      const [first, second] = lines(selector);
      if (!second) return null;
      return (
        Math.min(...second.map(box => box.top)) -
        Math.max(...first.map(box => box.bottom))
      );
    },
    // Texterna i den ordning de syns, rad för rad.
    inOrder: selector =>
      lines(selector)
        .flat()
        .map(box => box.element.textContent.replace(/\s+/g, ' ').trim()),
    // Får sidan plats utan att man måste skrolla i sidled?
    fitsScreen: () => {
      boxes('html');
      return doc.documentElement.scrollWidth <= view.innerWidth;
    },
    // Står elementet mitt i sin förälder, med lika mycket luft på båda
    // sidor? I jsdom: margin auto på båda sidor och en bredd.
    centered: selector => {
      const element = $(selector);
      if (!element) return null;
      const own = style(element);
      if (!hasLayout()) {
        const sized = own.width !== 'auto' || own.maxWidth !== 'none';
        return sized && own.marginLeft === 'auto' && own.marginRight === 'auto';
      }
      const parent = element.parentElement;
      const outer = parent.getBoundingClientRect();
      const inner = element.getBoundingClientRect();
      const left =
        inner.left -
        outer.left -
        pxOf(parent, 'border-left-width') -
        pxOf(parent, 'padding-left');
      const right =
        outer.right -
        inner.right -
        pxOf(parent, 'border-right-width') -
        pxOf(parent, 'padding-right');
      return left > 1 && Math.abs(left - right) <= 1;
    },
  };
}

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// Svarar som körningen i Python Academy, se NY-AKADEMI.md.
export function checkPage(doc, tests) {
  const tools = helpers(doc);
  const names = Object.keys(tools);
  return {
    syntaxError: null,
    error: null,
    tests: tests.map(test => {
      try {
        // Testerna skrivs av oss, inte av eleven.
        const actual = new Function(...names, `return (${test.code});`)(
          ...Object.values(tools),
        );
        const value = actual === undefined ? null : actual;
        return {
          passed: same(value, test.expected),
          actual: value,
          repr: JSON.stringify(value),
        };
      } catch (error) {
        return {
          passed: false,
          error: { type: error.name, message: error.message, line: null },
        };
      }
    }),
    output: [],
    console: [],
  };
}
