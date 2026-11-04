// Förklaringen när man håller musen över en Tailwind-klass: vilken vanlig
// CSS klassen är. Bara de klasser kursen använder – andra ger null.
const STEP = 4;

const SIDES = {
  '': '',
  x: '-left och -right',
  y: '-top och -bottom',
  t: '-top',
  r: '-right',
  b: '-bottom',
  l: '-left',
};

const TEXT_SIZES = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
};

const RADIUS = { '': 4, sm: 2, md: 6, lg: 8, xl: 12, '2xl': 16, '3xl': 24 };

const WEIGHTS = { normal: 400, medium: 500, semibold: 600, bold: 700 };

const MAX_WIDTHS = { sm: 384, md: 448, lg: 512, xl: 576, '2xl': 672 };

const FIXED = {
  flex: '`display: flex`',
  grid: '`display: grid`',
  block: '`display: block`',
  'inline-block': '`display: inline-block`',
  hidden: '`display: none` – elementet döljs',
  'flex-col': '`flex-direction: column` – flexboxen går nedåt',
  'flex-wrap': '`flex-wrap: wrap`',
  'flex-1': '`flex: 1` – tar den plats som blir över',
  'justify-between': '`justify-content: space-between`',
  'justify-center': '`justify-content: center`',
  'justify-end': '`justify-content: flex-end`',
  'items-center': '`align-items: center`',
  'items-start': '`align-items: flex-start`',
  'text-center': '`text-align: center`',
  'text-right': '`text-align: right`',
  uppercase: '`text-transform: uppercase` – versaler',
  underline: '`text-decoration-line: underline`',
  'tracking-wide':
    '`letter-spacing: 0.025em` – lite mer luft mellan bokstäverna',
  'w-full': '`width: 100%`',
  'mx-auto': '`margin-left: auto` och `margin-right: auto` – i mitten',
  'rounded-full': '`border-radius: 9999px` – helt runt',
  'outline-none': 'tar bort webbläsarens egen ram runt valda fält',
  shadow: 'en liten skugga (`box-shadow`)',
  'shadow-sm': 'en tunn skugga (`box-shadow`)',
  'shadow-md': 'en mellanstor skugga (`box-shadow`)',
  'shadow-lg': 'en stor skugga (`box-shadow`)',
  'shadow-xl': 'en mycket stor skugga (`box-shadow`)',
  border: '`border-width: 1px`',
};

const VARIANTS = {
  hover: 'när musen är över',
  focus: 'när fältet är valt',
  sm: 'när fönstret är minst 640 pixlar brett',
  md: 'när fönstret är minst 768 pixlar brett',
  lg: 'när fönstret är minst 1024 pixlar brett',
};

const px = steps => `${steps * STEP}px`;

function describe(name) {
  if (name in FIXED) return FIXED[name];
  let match = name.match(/^([pm])([xytrbl]?)-(\d+(?:\.5)?)$/);
  if (match) {
    const [, kind, side, steps] = match;
    const property = kind === 'p' ? 'padding' : 'margin';
    const where = side ? ` (${property}${SIDES[side]})` : '';
    return `\`${property}: ${px(Number(steps))}\`${where} – ${steps} steg à 4 pixlar`;
  }
  if ((match = name.match(/^gap-(\d+)$/))) {
    return `\`gap: ${px(Number(match[1]))}\``;
  }
  if ((match = name.match(/^text-(xs|sm|base|lg|\d?xl)$/))) {
    return `\`font-size: ${TEXT_SIZES[match[1]]}px\``;
  }
  if ((match = name.match(/^font-(normal|medium|semibold|bold)$/))) {
    return `\`font-weight: ${WEIGHTS[match[1]]}\``;
  }
  if ((match = name.match(/^rounded(?:-(sm|md|lg|xl|2xl|3xl))?$/))) {
    return `\`border-radius: ${RADIUS[match[1] ?? '']}px\``;
  }
  if ((match = name.match(/^border-(\d)$/))) {
    return `\`border-width: ${match[1]}px\``;
  }
  if ((match = name.match(/^grid-cols-(\d+)$/))) {
    return `\`grid-template-columns: repeat(${match[1]}, 1fr)\` – ${match[1]} lika breda kolumner`;
  }
  if ((match = name.match(/^col-span-(\d+)$/))) {
    return `\`grid-column: span ${match[1]}\``;
  }
  if ((match = name.match(/^max-w-(sm|md|lg|xl|2xl)$/))) {
    return `\`max-width: ${MAX_WIDTHS[match[1]]}px\``;
  }
  match = name.match(/^(text|bg|border)-(white|black|[a-z]+-\d{2,3})$/);
  if (match) {
    const property = {
      text: 'color',
      bg: 'background-color',
      border: 'border-color',
    }[match[1]];
    return `\`${property}\` i Tailwinds färg ${match[2]} – talet går från 50 (ljust) till 950 (mörkt)`;
  }
  return null;
}

// "md:hover:bg-sky-700" → förklaringen av bg-sky-700 och när den gäller.
export function tailwindInfo(className) {
  const parts = className.split(':');
  const base = parts.pop();
  const about = describe(base);
  if (!about || parts.some(part => !VARIANTS[part])) return null;
  const when = parts.map(part => VARIANTS[part]).join(' och ');
  return {
    title: className,
    body: `Tailwind: ${about}${when ? `, men bara ${when}` : ''}.`,
  };
}
