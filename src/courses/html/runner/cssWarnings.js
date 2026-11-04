// Varningar för vanliga CSS-misstag i <style>. CSS säger inte heller till:
// en egenskap som är felstavad eller saknar semikolon hoppas bara över.
// htmlWarnings.js hittar <style>-blocken och skickar hit innehållet.
import { NAMED_COLORS } from './cssColors';

export const CSS_PROPERTIES = new Set(
  `align-content align-items align-self all animation animation-delay
  animation-direction animation-duration animation-iteration-count
  animation-name animation-timing-function aspect-ratio backdrop-filter
  background background-attachment background-clip background-color
  background-image background-position background-repeat background-size
  block-size border border-block border-bottom border-bottom-color
  border-bottom-left-radius border-bottom-right-radius border-bottom-style
  border-bottom-width border-collapse border-color border-image border-inline
  border-left border-left-color border-left-style border-left-width
  border-radius border-right border-right-color border-right-style
  border-right-width border-spacing border-style border-top border-top-color
  border-top-left-radius border-top-right-radius border-top-style
  border-top-width border-width bottom box-shadow box-sizing caption-side
  caret-color clear clip-path color column-count column-gap columns content
  cursor direction display empty-cells filter flex flex-basis flex-direction
  flex-flow flex-grow flex-shrink flex-wrap float font font-family
  font-feature-settings font-size font-style font-variant font-weight gap
  grid grid-area grid-auto-columns grid-auto-flow grid-auto-rows grid-column
  grid-column-end grid-column-start grid-row grid-row-end grid-row-start
  grid-template grid-template-areas grid-template-columns grid-template-rows
  height hyphens inline-size inset isolation justify-content justify-items
  justify-self left letter-spacing line-height list-style list-style-image
  list-style-position list-style-type margin margin-block margin-bottom
  margin-inline margin-left margin-right margin-top max-height max-width
  min-height min-width mix-blend-mode object-fit object-position opacity
  order outline outline-color outline-offset outline-style outline-width
  overflow overflow-wrap overflow-x overflow-y padding padding-block
  padding-bottom padding-inline padding-left padding-right padding-top
  place-content place-items place-self pointer-events position quotes resize
  right rotate row-gap scale scroll-behavior scroll-margin-top table-layout
  text-align text-decoration text-decoration-color text-decoration-line
  text-decoration-style text-decoration-thickness text-indent text-overflow
  text-shadow text-transform text-underline-offset top transform
  transform-origin transition transition-delay transition-duration
  transition-property transition-timing-function translate user-select
  vertical-align visibility white-space width will-change word-break
  word-spacing writing-mode z-index`.split(/\s+/),
);

// Stavfel som avståndet mellan bokstäverna inte hittar.
const MEANT = {
  colour: 'color',
  'background-colour': 'background-color',
  'text-color': 'color',
  'font-color': 'color',
  'text-size': 'font-size',
  size: 'font-size',
  font_size: 'font-size',
  align: 'text-align',
  'text-bold': 'font-weight',
  bold: 'font-weight',
  'border-color-radius': 'border-radius',
  radius: 'border-radius',
  'corner-radius': 'border-radius',
  spacing: 'letter-spacing',
};

// Färger på svenska och andra vanliga felskrivningar.
const MEANT_COLORS = {
  röd: 'red',
  rod: 'red',
  blå: 'blue',
  bla: 'blue',
  grön: 'green',
  gron: 'green',
  gul: 'yellow',
  svart: 'black',
  vit: 'white',
  rosa: 'pink',
  lila: 'purple',
  grå: 'gray',
  gra: 'gray',
  brun: 'brown',
  guld: 'gold',
  silver: 'silver',
};

const COLOR_KEYWORDS = new Set([
  'transparent',
  'currentcolor',
  'inherit',
  'initial',
  'unset',
  'revert',
]);

const COLOR_PROPERTIES = new Set([
  'color',
  'background-color',
  'border-color',
  'outline-color',
  'caret-color',
  'text-decoration-color',
]);

// Egenskaper där ett tal behöver en enhet.
const LENGTHS =
  /^(width|height|(min|max)-(width|height)|margin(-\w+)?|padding(-\w+)?|font-size|border(-\w+)?(-width)?|border(-\w+)*-radius|gap|row-gap|column-gap|top|right|bottom|left|inset|letter-spacing|word-spacing|text-indent|outline(-width)?|outline-offset)$/;

// Antal bokstäver som skiljer, där två som bytt plats räknas som en.
function distance(a, b) {
  const rows = [[...Array(b.length + 1).keys()]];
  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    for (let j = 1; j <= b.length; j++) {
      row[j] = Math.min(
        rows[i - 1][j] + 1,
        row[j - 1] + 1,
        rows[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        row[j] = Math.min(row[j], rows[i - 2][j - 2] + 1);
      }
    }
    rows.push(row);
  }
  return rows[a.length][b.length];
}

// Det namn i names som ligger närmast name, eller null.
export function closest(name, names) {
  let best = null;
  let bestScore = Infinity;
  for (const candidate of names) {
    const score = distance(name, candidate);
    if (score < bestScore) [best, bestScore] = [candidate, score];
  }
  return bestScore <= Math.max(1, Math.floor(name.length / 4)) ? best : null;
}

// Kommentarer blir mellanslag, så att positionerna och raderna stämmer.
const withoutComments = css =>
  css.replace(/\/\*[\s\S]*?(?:\*\/|$)/g, comment =>
    comment.replace(/[^\n]/g, ' '),
  );

// css: innehållet i ett <style>, firstLine: raden det börjar på.
// page: { classes, ids, isTag, guessTag } från HTML-koden.
export function cssWarnings(rawCss, firstLine, page) {
  const css = withoutComments(rawCss);
  const warnings = [];
  const lineAt = index =>
    firstLine + css.slice(0, index).split('\n').length - 1;
  // Raden där texten från index börjar, utan mellanslagen före.
  const lineFrom = index => lineAt(index + css.slice(index).search(/\S|$/));

  function checkSelector(selector, line) {
    for (const part of selector.split(',')) {
      const cleaned = part
        .replace(/::?[\w-]+(\([^)]*\))?/g, '')
        .replace(/\[[^\]]*\]/g, '');
      for (const compound of cleaned.split(/[\s>+~]+/).filter(Boolean)) {
        const parts = compound.match(/^([a-zA-Z][\w-]*|\*)?((?:[.#][\w-]+)*)$/);
        if (!parts) continue;
        const [, tag, rest] = parts;
        if (tag && tag !== '*' && !page.isTag(tag.toLowerCase())) {
          const meant = page.guessTag(tag.toLowerCase());
          warnings.push(
            `\`${tag}\` i regeln på rad ${line} är ingen tagg i HTML` +
              (meant ? ` – menade du \`${meant}\`?` : '.'),
          );
        }
        for (const [, mark, name] of rest.matchAll(/([.#])([\w-]+)/g)) {
          const [names, attribute] =
            mark === '.' ? [page.classes, 'class'] : [page.ids, 'id'];
          if (names.has(name)) continue;
          const meant = closest(name, names);
          warnings.push(
            `\`${mark}${name}\` på rad ${line} hittar inget – ingen tagg har ${attribute}="${name}".` +
              (meant ? ` Menade du \`${mark}${meant}\`?` : ''),
          );
        }
      }
    }
  }

  function checkValue(property, value, line) {
    if (value === '') {
      warnings.push(`\`${property}:\` på rad ${line} saknar ett värde.`);
      return;
    }
    if (LENGTHS.test(property)) {
      const bare = value
        .split(/\s+/)
        .find(token => /^\d*\.?\d+$/.test(token) && parseFloat(token) !== 0);
      if (bare) {
        warnings.push(
          `\`${property}: ${value}\` på rad ${line}: ${bare} behöver en enhet, t.ex. \`${bare}px\`. Utan enhet struntar webbläsaren i raden.`,
        );
        return;
      }
    }
    const badHex = value
      .split(/\s+/)
      .find(
        token =>
          token.startsWith('#') &&
          !/^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(token),
      );
    if (badHex) {
      warnings.push(
        `\`${badHex}\` på rad ${line} är ingen hexkod. Den har 3 eller 6 tecken efter #, bara 0–9 och a–f.`,
      );
      return;
    }
    const word = value.toLowerCase();
    if (
      COLOR_PROPERTIES.has(property) &&
      /^[a-zåäö]+$/.test(word) &&
      !NAMED_COLORS.has(word) &&
      !COLOR_KEYWORDS.has(word)
    ) {
      const meant = MEANT_COLORS[word] ?? closest(word, NAMED_COLORS.keys());
      warnings.push(
        `\`${value}\` på rad ${line} är ingen färg i CSS` +
          (meant
            ? ` – menade du \`${meant}\`?`
            : '. Färgerna har engelska namn, som `red`, eller skrivs som hexkod: `#ff0000`.'),
      );
    }
  }

  // Varje regels egenskaper, för varningen om flex och grid.
  const rules = [];
  let currentRule = null;

  function checkDeclarations(start, end) {
    let index = start;
    for (const piece of css.slice(start, end).split(';')) {
      const pieceStart = index;
      index += piece.length + 1;
      const text = piece.trim();
      if (!text) continue;
      const line = lineFrom(pieceStart);
      const colon = text.indexOf(':');
      if (colon === -1) {
        const [name, ...rest] = text.split(/\s*=\s*|\s+/);
        warnings.push(
          `\`${text}\` på rad ${line} saknar kolon` +
            (rest.length > 0
              ? ` – skriv \`${name}: ${rest.join(' ')};\`.`
              : '. En egenskap skrivs `namn: värde;`.'),
        );
        continue;
      }
      const property = text.slice(0, colon).trim().toLowerCase();
      const value = text.slice(colon + 1).trim();
      if (property.startsWith('--') || /^-(webkit|moz|ms)-/.test(property)) {
        continue;
      }
      if (!CSS_PROPERTIES.has(property)) {
        const meant = MEANT[property] ?? closest(property, CSS_PROPERTIES);
        warnings.push(
          `\`${property}\` på rad ${line} finns inte i CSS` +
            (meant ? ` – menade du \`${meant}\`?` : '.'),
        );
        continue;
      }
      // Två egenskaper i ett: "red\n background: blue" saknar ett ;.
      const next = [...value.matchAll(/(^|\s)([a-z-]+)\s*:/g)].find(match =>
        CSS_PROPERTIES.has(match[2]),
      );
      if (next) {
        const before = value.slice(0, next.index).trim();
        const beforeEnd =
          pieceStart +
          piece.indexOf(value) +
          value.indexOf(before) +
          before.length;
        warnings.push(
          `Det saknas ett \`;\` efter \`${before}\` på rad ${lineAt(beforeEnd)}. Utan det blir \`${next[2]}\` en del av värdet, och webbläsaren struntar i båda.`,
        );
        continue;
      }
      currentRule?.declarations.push([property, value.toLowerCase()]);
      checkValue(property, value, line);
    }
  }

  const open = [];
  let preludeStart = 0;
  let i = 0;
  while (i < css.length) {
    const char = css[i];
    if (char === '}') {
      if (open.length > 0) open.pop();
      else {
        warnings.push(
          `\`}\` på rad ${lineAt(i)} stänger ingenting – det finns ingen \`{\` före.`,
        );
      }
      preludeStart = ++i;
      continue;
    }
    if (char !== '{') {
      i++;
      continue;
    }
    let prelude = css.slice(preludeStart, i);
    // Egenskaper före selektorn står utanför en regel.
    const lastSemicolon = prelude.lastIndexOf(';');
    if (lastSemicolon !== -1) {
      warnings.push(
        `\`${prelude.slice(0, lastSemicolon + 1).trim()}\` på rad ${lineFrom(preludeStart)} står utanför en regel. Egenskaper skrivs mellan \`{\` och \`}\`.`,
      );
      preludeStart += lastSemicolon + 1;
      prelude = css.slice(preludeStart, i);
    }
    const selector = prelude.trim();
    if (selector.startsWith('@')) {
      open.push({ name: selector, line: lineFrom(preludeStart) });
      preludeStart = ++i;
      continue;
    }
    const line = lineFrom(preludeStart);
    currentRule = { selector, line, declarations: [] };
    rules.push(currentRule);
    if (selector) checkSelector(selector, line);
    else
      warnings.push(`\`{\` på rad ${lineAt(i)} saknar en selektor före sig.`);
    const bodyStart = i + 1;
    let j = bodyStart;
    while (j < css.length && css[j] !== '}' && css[j] !== '{') j++;
    if (css[j] === '}') {
      checkDeclarations(bodyStart, j);
      preludeStart = i = j + 1;
      continue;
    }
    warnings.push(
      `Regeln \`${selector}\` på rad ${line} stängs aldrig – skriv \`}\` efter den sista egenskapen.`,
    );
    if (j >= css.length) {
      checkDeclarations(bodyStart, j);
      break;
    }
    // Nästa regel börjar efter sista ; eller på sista raden före {.
    const body = css.slice(bodyStart, j);
    const cut = Math.max(
      body.lastIndexOf(';'),
      body.trimEnd().lastIndexOf('\n'),
    );
    checkDeclarations(bodyStart, bodyStart + Math.max(cut, 0));
    preludeStart = bodyStart + Math.max(cut + 1, 0);
    i = j;
  }
  const rest = css.slice(preludeStart).trim();
  if (rest && i >= css.length) {
    warnings.push(
      `\`${rest}\` på rad ${lineFrom(preludeStart)} står utanför en regel. Egenskaper skrivs mellan \`{\` och \`}\`.`,
    );
  }
  for (const block of open) {
    warnings.push(
      `\`${block.name}\` på rad ${block.line} stängs aldrig – skriv \`}\` sist.`,
    );
  }
  return [...warnings, ...layoutWarnings(rules)];
}

// Egenskaper som bara gör något i en flex- eller grid-behållare.
const FLEX_OR_GRID = new Set([
  'justify-content',
  'align-items',
  'align-content',
  'gap',
  'row-gap',
  'column-gap',
]);
const FLEX_ONLY = new Set(['flex-direction', 'flex-wrap', 'flex-flow']);
const GRID_ONLY = /^grid-template(-(columns|rows|areas))?$/;

const normalize = selector => selector.replace(/\s+/g, ' ').trim();

// justify-content i en regel vars element inte är flex eller grid gör
// ingenting, och webbläsaren säger inget. Displayen kan stå i en annan
// regel med samma selektor, så den letas upp i alla regler.
function layoutWarnings(rules) {
  const displays = new Map();
  for (const rule of rules) {
    for (const [property, value] of rule.declarations) {
      if (property !== 'display') continue;
      const key = normalize(rule.selector);
      displays.set(key, [...(displays.get(key) ?? []), value]);
    }
  }
  const warnings = [];
  for (const rule of rules) {
    const shown = displays.get(normalize(rule.selector)) ?? [];
    const flex = shown.some(value => value.includes('flex'));
    const grid = shown.some(value => value.includes('grid'));
    for (const [property] of rule.declarations) {
      let needs = null;
      if (FLEX_OR_GRID.has(property) && !flex && !grid) {
        needs = '`display: flex` eller `display: grid`';
      } else if (FLEX_ONLY.has(property) && !flex) {
        needs = '`display: flex`';
      } else if (GRID_ONLY.test(property) && !grid) {
        needs = '`display: grid`';
      }
      if (!needs) continue;
      warnings.push(
        `\`${property}\` i \`${rule.selector}\` på rad ${rule.line} gör bara något när elementet har ${needs}. Lägg till det i samma regel.`,
      );
      break;
    }
  }
  return warnings;
}
