// Varningar för vanliga HTML-misstag. Webbläsaren lagar felen tyst – en
// strong som aldrig stängs gör bara resten av sidan fet – så vi läser
// koden själva och säger vad som hände, med radnummer. CSS i <style>
// läses av cssWarnings.js.
import { cssWarnings } from './cssWarnings';

// Taggar som aldrig stängs.
export const VOID_TAGS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'source',
  'track',
  'wbr',
]);

// Innehållet i dem är inte HTML, så det ska inte läsas som taggar.
const RAW_TEXT = new Set(['style', 'script', 'textarea', 'title']);

const KNOWN = new Set([
  ...VOID_TAGS,
  ...RAW_TEXT,
  ...`a abbr address article aside audio b bdi bdo blockquote body button
  canvas caption cite code colgroup data datalist dd del details dfn dialog
  div dl dt em fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head
  header hgroup html i iframe ins kbd label legend li main map mark menu
  meter nav noscript object ol optgroup option output p picture pre progress
  q rp rt ruby s samp search section select slot small span strong sub
  summary sup svg table tbody td template tfoot th thead time tr u ul var
  video math`.split(/\s+/),
]);

// Stavfel som avståndet mellan bokstäverna inte hittar.
const MEANT = {
  bold: 'strong',
  italic: 'em',
  image: 'img',
  picture: 'img',
  h7: 'h6',
  h0: 'h1',
  paragraph: 'p',
  link: 'a',
  break: 'br',
  list: 'ul',
};

// Vad som syns på sidan när taggen aldrig stängs.
const EFFECT = {
  strong: 'resten av sidan blir fet',
  b: 'resten av sidan blir fet',
  em: 'resten av sidan blir kursiv',
  i: 'resten av sidan blir kursiv',
  a: 'resten av sidan blir en länk',
};

const MAX_WARNINGS = 4;

function distance(a, b) {
  let previous = [...Array(b.length + 1).keys()];
  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    for (let j = 1; j <= b.length; j++) {
      row[j] = Math.min(
        previous[j] + 1,
        row[j - 1] + 1,
        previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    previous = row;
  }
  return previous[b.length];
}

// Den tagg man troligen menade, eller null.
export function guessTag(name) {
  if (MEANT[name]) return MEANT[name];
  if (/^h\d+$/.test(name)) return 'h6';
  const [best] = [...KNOWN]
    .map(known => ({ known, score: distance(name, known) }))
    .sort((a, b) => a.score - b.score);
  return best.score <= Math.max(1, Math.floor(name.length / 3))
    ? best.known
    : null;
}

// Taggarna i koden, utan kommentarer och utan innehållet i <style> m.fl.
function tags(code) {
  const found = [];
  // Kommentarer matchas först, så att taggar i dem hoppas över. Bara det
  // som ser ut som en tagg räknas, så "3 < 5" är vanlig text.
  const pattern = /<!--[\s\S]*?(?:-->|$)|<\/?[a-zA-Z][^<>]*>/g;
  const tag = /^<(\/?)([a-zA-Z][\w-]*)([^>]*)>$/;
  let rawUntil = null;
  for (const match of code.matchAll(pattern)) {
    const parts = match[0].match(tag);
    if (!parts) continue;
    const [, slash, rawName, attributes] = parts;
    const name = rawName.toLowerCase();
    if (rawUntil) {
      if (slash && name === rawUntil) rawUntil = null;
      else continue;
    }
    const line = code.slice(0, match.index).split('\n').length;
    found.push({
      name,
      line,
      closing: slash === '/',
      selfClosing: attributes.trim().endsWith('/'),
      attributes,
      end: match.index + match[0].length,
    });
    if (!slash && RAW_TEXT.has(name)) rawUntil = name;
  }
  return found;
}

const hasAttribute = (attributes, name) =>
  new RegExp(`(^|\\s)${name}(\\s*=|\\s|/|$)`, 'i').test(attributes);

// Värdena i class och id på sidan, att jämföra med selektorerna i CSS.
function namesIn(found, attribute) {
  const pattern = new RegExp(
    `(?:^|\\s)${attribute}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`,
    'i',
  );
  return new Set(
    found.flatMap(tag => {
      const match = tag.attributes.match(pattern);
      return match ? (match[1] ?? match[2] ?? match[3]).split(/\s+/) : [];
    }),
  );
}

function styleWarnings(code, found) {
  const page = {
    classes: namesIn(found, 'class'),
    ids: namesIn(found, 'id'),
    isTag: name => KNOWN.has(name),
    guessTag,
  };
  return found
    .filter(tag => tag.name === 'style' && !tag.closing)
    .flatMap(tag => {
      const close = code.indexOf('</style', tag.end);
      const css = code.slice(tag.end, close === -1 ? undefined : close);
      return cssWarnings(css, code.slice(0, tag.end).split('\n').length, page);
    });
}

export function htmlWarnings(code) {
  const warnings = [];
  const open = [];
  const found = tags(code);
  for (const tag of found) {
    const { name, line } = tag;
    if (!KNOWN.has(name) && !name.includes('-')) {
      if (tag.closing) continue;
      const meant = guessTag(name);
      warnings.push(
        `<${name}> på rad ${line} finns inte i HTML` +
          (meant ? ` – menade du <${meant}>?` : '.'),
      );
      continue;
    }
    if (tag.closing) {
      if (VOID_TAGS.has(name)) {
        warnings.push(
          `</${name}> på rad ${line} behövs inte – <${name}> stängs aldrig.`,
        );
        continue;
      }
      const index = open.findLastIndex(item => item.name === name);
      if (index === -1) {
        warnings.push(
          `</${name}> på rad ${line} stänger en <${name}> som aldrig öppnades.`,
        );
        continue;
      }
      const inner = open.at(-1);
      if (index !== open.length - 1) {
        warnings.push(
          `</${name}> på rad ${line} stänger <${name}>, men <${inner.name}> från rad ${inner.line} är fortfarande öppen. Stäng den inre taggen först, som lådor i lådor: …</${inner.name}></${name}>.`,
        );
      }
      open.length = index;
      continue;
    }
    if (name === 'img' && !hasAttribute(tag.attributes, 'alt')) {
      warnings.push(
        `<img> på rad ${line} saknar alt – den som inte ser bilden får ingen beskrivning. Är bilden bara pynt skriver du alt="".`,
      );
    }
    if (!VOID_TAGS.has(name) && !tag.selfClosing) open.push(tag);
  }
  // html, head och body får stå öppna – webbläsaren stänger dem i slutet.
  for (const tag of open.filter(
    item => !['html', 'head', 'body'].includes(item.name),
  )) {
    const effect = EFFECT[tag.name] ? ` – ${EFFECT[tag.name]}` : '';
    warnings.push(
      `<${tag.name}> på rad ${tag.line} stängs aldrig${effect}. Skriv </${tag.name}> där den ska sluta.`,
    );
  }
  return [...warnings, ...styleWarnings(code, found)].slice(0, MAX_WARNINGS);
}
