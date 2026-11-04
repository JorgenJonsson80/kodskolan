import { compile } from 'tailwindcss';
import TAILWIND_CSS from 'tailwindcss/index.css?raw';
import { TAILWIND_SCRIPT, usesTailwind } from './tailwindScript';

// Laddas bara när en sida använder Tailwind (bana 12), med import().
let compiler = null;

function tailwind() {
  compiler ??= compile('@import "tailwindcss";', {
    base: '/',
    loadStylesheet: async (id, base) => ({
      path: id,
      base,
      content: TAILWIND_CSS,
    }),
  });
  return compiler;
}

// Orden i alla class="…". Tailwind struntar i dem som inte är klasser.
const candidates = code =>
  [...code.matchAll(/\bclass\s*=\s*(["'])([\s\S]*?)\1/gi)]
    .flatMap(match => match[2].split(/\s+/))
    .filter(Boolean);

// Byter Tailwind-raden mot den färdiga CSS:en för sidans klasser.
export async function withTailwind(code) {
  if (!usesTailwind(code)) return code;
  const css = (await tailwind()).build(candidates(code));
  return code.replace(
    TAILWIND_SCRIPT,
    () => `<style data-tailwind>\n${css}</style>`,
  );
}

// Början på Tailwinds vanligaste klasser. Bara klasser som börjar så kan
// vara felstavade Tailwind – andra är elevens egna, som "kort".
const ROOTS =
  /^(text|bg|p[xytrbl]?|m[xytrbl]?|gap|grid|flex|rounded|shadow|font|w|h|max|min|border|justify|items|content|self|col|row|space|leading|tracking|underline|uppercase|block|inline|hidden|mx|my)(-|$)/;

// Klasser som ser ut som Tailwind men som Tailwind inte känner igen, t.ex.
// text-rd-500. En klass finns om CSS:en har en regel för den.
export async function unknownTailwindClasses(code) {
  if (!usesTailwind(code)) return [];
  const compiler = await tailwind();
  const unknown = [];
  for (const name of new Set(candidates(code))) {
    const base = name.split(':').at(-1);
    if (!ROOTS.test(base)) continue;
    // Bygget samlar på sig alla klasser, så text-red får inte räknas som
    // funnen bara för att .text-red-500 står där.
    const selector = `.${CSS.escape(name)}`.replace(
      /[.*+?^${}()|[\]\\]/g,
      '\\$&',
    );
    const css = compiler.build([name]);
    if (!new RegExp(`${selector}(?![\\w\\\\-])`).test(css)) unknown.push(name);
  }
  return unknown.map(
    name =>
      `\`${name}\` är ingen Tailwind-klass, så den gör ingenting. Kolla stavningen.`,
  );
}
