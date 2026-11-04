// Bana 12 (bonus): Tailwind. Eleven skriver skriptraden som på riktiga
// sajter, men appen gör CSS:en själv (runner/tailwind.js), så rättningen
// kör aldrig något skript. twColor() ger Tailwinds färgnamn, som
// 'sky-600'. Allt rättas i Chrome, eftersom jsdom inte förstår Tailwinds
// CSS.

const TW =
  '<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>';
const MOBIL = 375;

export const TAILWIND = [
  {
    id: 'tailwind-01',
    track: 'tailwind',
    title: 'Tailwind på sidan',
    xp: 15,
    description:
      'Tailwind är ett sätt att skriva CSS med färdiga klasser direkt i HTML:en. Först behöver sidan ladda Tailwind.',
    explain:
      'I stället för att skriva regler i `<style>` sätter du klasser som redan finns:\n\n- `text-3xl` – stor text\n- `font-bold` – fet\n- `underline` – streck under\n\nVarje klass gör *en* sak, och du kombinerar dem i `class`. Allt du lärt dig i CSS finns kvar – Tailwind är bara ett kortare sätt att skriva det.\n\nFör att klasserna ska fungera laddar sidan Tailwind med en `script`-rad i `head`. Raden ser likadan ut på alla sajter som använder Tailwind på det här sättet.',
    example: `${TW}\n<h1 class="text-3xl font-bold">Hej!</h1>`,
    task: `Uppgift: Lägg till raden \`${TW}\` överst, så att klasserna på rubriken börjar fungera.`,
    starterCode: `<h1 class="text-3xl font-bold underline">Hej, Tailwind!</h1>
<p>Klasserna på rubriken gör ingenting förrän Tailwind finns på sidan.</p>
`,
    solution: `${TW}
<h1 class="text-3xl font-bold underline">Hej, Tailwind!</h1>
<p>Klasserna på rubriken gör ingenting förrän Tailwind finns på sidan.</p>
`,
    hints: [
      'Raden står först, före h1.',
      'Det är ett script med src till Tailwind.',
      TW,
    ],
    tests: [
      {
        description: 'Rubriken är 30px (text-3xl)',
        code: "px('h1', 'font-size')",
        expected: 30,
      },
      {
        description: 'Rubriken är fet och understruken',
        code: "[css('h1', 'font-weight'), css('h1', 'text-decoration-line')]",
        expected: ['700', 'underline'],
      },
    ],
  },
  {
    id: 'tailwind-02',
    track: 'tailwind',
    title: 'Färger',
    xp: 15,
    description:
      'Tailwind har en egen färgpalett: varje färg finns i ljusa och mörka nyanser.',
    explain:
      'En färg skrivs med *vad* den gäller, *vilken* färg och *hur mörk*:\n\n- `text-sky-600` – texten (`color`)\n- `bg-sky-600` – bakgrunden (`background-color`)\n\nTalet går från `50` (nästan vitt) till `950` (nästan svart). `500` är mitt emellan. Färger som `slate`, `gray` och `zinc` är gråskalor.\n\nDet finns också `text-white` och `bg-black` utan tal.',
    example: '<div class="bg-sky-600 text-white">Blå ruta</div>',
    task: 'Uppgift: Ge `div` bakgrunden `sky-600` och vit text. Ge stycket texten `slate-700`.',
    starterCode: `${TW}
<div>☀️ Sommarlov om 12 dagar!</div>
<p>Glöm inte att lämna tillbaka böckerna till biblioteket.</p>
`,
    solution: `${TW}
<div class="bg-sky-600 text-white">☀️ Sommarlov om 12 dagar!</div>
<p class="text-slate-700">Glöm inte att lämna tillbaka böckerna till biblioteket.</p>
`,
    hints: [
      'Två klasser på div och en på p.',
      'bg- för bakgrunden och text- för texten.',
      '<div class="bg-sky-600 text-white"> och <p class="text-slate-700">',
    ],
    tests: [
      {
        description: 'Rutan är sky-600 med vit text',
        code: "[twColor('div', 'background-color'), twColor('div')]",
        expected: ['sky-600', 'white'],
      },
      {
        description: 'Stycket är slate-700',
        code: "twColor('p')",
        expected: 'slate-700',
      },
    ],
  },
  {
    id: 'tailwind-03',
    track: 'tailwind',
    title: 'p-4 och m-2 – luft',
    xp: 20,
    description:
      'Tailwind har klasser för padding och margin. Talen är steg, inte pixlar.',
    explain:
      'Ett steg är 4 pixlar (`0.25rem`). Så `p-4` är `padding: 16px` och `p-2` är 8 pixlar.\n\n- `p-4` – padding på alla sidor\n- `px-6` – bara åt sidorna (x är vågrätt)\n- `py-3` – bara uppe och nere (y är lodrätt)\n- `pt-`, `pr-`, `pb-`, `pl-` – en sida i taget\n\nSamma sak gäller margin med `m`: `m-4`, `mx-auto`, `mt-8`.',
    example: '<div class="px-6 py-3 mt-8">…</div>',
    task: 'Uppgift: Ge `div` padding `24px` åt sidorna och `12px` uppe och nere, och `32px` margin ovanför. Ge den också bakgrunden `amber-100`.',
    starterCode: `${TW}
<h1 class="text-2xl font-bold">Veckans utmaning</h1>
<div>Gå 10 000 steg varje dag i en vecka 🚶</div>
`,
    solution: `${TW}
<h1 class="text-2xl font-bold">Veckans utmaning</h1>
<div class="px-6 py-3 mt-8 bg-amber-100">Gå 10 000 steg varje dag i en vecka 🚶</div>
`,
    hints: [
      '24px är 6 steg, 12px är 3 steg och 32px är 8 steg.',
      'px- åt sidorna, py- uppe och nere, mt- margin ovanför.',
      'class="px-6 py-3 mt-8 bg-amber-100"',
    ],
    tests: [
      {
        description: 'Padding 12px uppe och 24px åt sidorna',
        code: "[px('div', 'padding-top'), px('div', 'padding-left')]",
        expected: [12, 24],
      },
      {
        description: '32px margin ovanför',
        code: "px('div', 'margin-top')",
        expected: 32,
      },
      {
        description: 'Bakgrunden är amber-100',
        code: "twColor('div', 'background-color')",
        expected: 'amber-100',
      },
    ],
  },
  {
    id: 'tailwind-04',
    track: 'tailwind',
    title: 'Text',
    xp: 20,
    description:
      'Tailwind tar bort webbläsarens egna stilar. En h1 ser ut som vanlig text – du bestämmer själv.',
    explain:
      'Tailwind börjar med att nollställa allt: rubriker blir lika stora som text och får ingen margin. Det kallas *preflight*.\n\nTextklasserna:\n\n- storlek: `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl` … `text-6xl`\n- tjocklek: `font-normal`, `font-semibold`, `font-bold`\n- `text-center`, `text-right`\n- `uppercase` – versaler\n- `tracking-wide` – mer luft mellan bokstäverna',
    example: '<h1 class="text-4xl font-bold text-center">Rubrik</h1>',
    task: 'Uppgift: Gör rubriken `text-4xl`, `font-bold` och `text-center`. Gör stycket `text-xl` och `font-semibold`, och den lilla texten `uppercase` och `tracking-wide`.',
    starterCode: `${TW}
<h1>Skolans talangshow</h1>
<p>Fredag kl. 18 i aulan</p>
<small>Fri entré</small>
`,
    solution: `${TW}
<h1 class="text-4xl font-bold text-center">Skolans talangshow</h1>
<p class="text-xl font-semibold">Fredag kl. 18 i aulan</p>
<small class="uppercase tracking-wide">Fri entré</small>
`,
    hints: [
      'Tre klasser på h1, två på p och två på small.',
      'text-4xl är storleken, text-center var texten står.',
      'class="uppercase tracking-wide" på small.',
    ],
    tests: [
      {
        description: 'Rubriken är 36px, fet och i mitten',
        code: "[px('h1', 'font-size'), css('h1', 'font-weight'), css('h1', 'text-align')]",
        expected: [36, '700', 'center'],
      },
      {
        description: 'Stycket är 20px och halvfett',
        code: "[px('p', 'font-size'), css('p', 'font-weight')]",
        expected: [20, '600'],
      },
      {
        description: 'Den lilla texten är versaler med luft emellan',
        code: "[css('small', 'text-transform'), px('small', 'letter-spacing') > 0]",
        expected: ['uppercase', true],
      },
    ],
  },
  {
    id: 'tailwind-05',
    track: 'tailwind',
    title: 'Hörn, kant och skugga',
    xp: 20,
    description:
      'Ett kort ser ut som ett kort med runda hörn, en tunn kant och en skugga.',
    explain:
      '- `rounded`, `rounded-lg`, `rounded-xl`, `rounded-full` – allt rundare. `rounded-lg` är 8 pixlar.\n- `border` är en kant på 1 pixel, `border-2` på 2. Färgen skrivs `border-slate-200`.\n- `shadow-sm`, `shadow-md`, `shadow-lg` – en skugga under, större och större.\n\nI vanlig CSS hade det varit `border-radius`, `border` och `box-shadow`.',
    example:
      '<div class="rounded-lg border-2 border-slate-200 shadow-md">…</div>',
    task: 'Uppgift: Ge kortet hörnen `rounded-lg`, kanten `border-2 border-slate-200` och skuggan `shadow-md`.',
    starterCode: `${TW}
<div class="p-6 m-4 bg-white">
  <h2 class="text-xl font-bold">🐢 Sköldpaddan Turbo</h2>
  <p>Turbo är 40 år gammal och äter helst maskrosor.</p>
</div>
`,
    solution: `${TW}
<div class="p-6 m-4 bg-white rounded-lg border-2 border-slate-200 shadow-md">
  <h2 class="text-xl font-bold">🐢 Sköldpaddan Turbo</h2>
  <p>Turbo är 40 år gammal och äter helst maskrosor.</p>
</div>
`,
    hints: [
      'Fyra nya klasser på div.',
      'border-2 ger tjockleken, border-slate-200 färgen.',
      'rounded-lg border-2 border-slate-200 shadow-md',
    ],
    tests: [
      {
        description: 'Kortet har 8px runda hörn',
        code: "css('div', 'border-radius')",
        expected: '8px',
      },
      {
        description: 'Kanten är 2px och slate-200',
        code: "[px('div', 'border-top-width'), twColor('div', 'border-top-color')]",
        expected: [2, 'slate-200'],
      },
      {
        description: 'Kortet har en skugga',
        code: "css('div', 'box-shadow') !== 'none'",
        expected: true,
      },
    ],
  },
  {
    id: 'tailwind-06',
    track: 'tailwind',
    title: 'flex och gap',
    xp: 20,
    description:
      'Flexbox finns också som klasser. Ett sidhuvud blir en enda rad HTML.',
    explain:
      'Samma flexbox som i bana 8, med klasser:\n\n- `flex` – `display: flex`\n- `gap-4` – `gap: 16px` (4 steg)\n- `justify-between` – `justify-content: space-between`\n- `items-center` – `align-items: center`\n- `flex-col` – `flex-direction: column`',
    example: '<header class="flex justify-between items-center">…</header>',
    task: 'Uppgift: Gör `header` till en flexbox med `justify-between` och `items-center`. Gör `nav` till en flexbox med `gap-6`.',
    starterCode: `${TW}
<header class="p-4 bg-emerald-700 text-white">
  <span class="text-2xl font-bold">🌱 Odlingsappen</span>
  <nav>
    <a href="#">Frön</a>
    <a href="#">Kalender</a>
    <a href="#">Tips</a>
  </nav>
</header>
`,
    solution: `${TW}
<header class="p-4 bg-emerald-700 text-white flex justify-between items-center">
  <span class="text-2xl font-bold">🌱 Odlingsappen</span>
  <nav class="flex gap-6">
    <a href="#">Frön</a>
    <a href="#">Kalender</a>
    <a href="#">Tips</a>
  </nav>
</header>
`,
    hints: [
      'Tre nya klasser på header och två på nav.',
      'justify-between och items-center, utan content och align.',
      'header: flex justify-between items-center\nnav: flex gap-6',
    ],
    tests: [
      {
        description: 'Loggan och menyn står på en rad, utspridda',
        code: "[rows('header > *'), css('header', 'justify-content'), css('header', 'align-items')]",
        expected: [1, 'space-between', 'center'],
      },
      {
        description: 'Länkarna står på rad med 24px emellan',
        code: "[rows('nav a'), gapX('nav a')]",
        expected: [1, 24],
      },
    ],
  },
  {
    id: 'tailwind-07',
    track: 'tailwind',
    title: 'grid-cols-3',
    xp: 20,
    description: 'Ett grid med tre lika breda kolumner – med tre klasser.',
    explain:
      '- `grid` – `display: grid`\n- `grid-cols-3` – tre lika breda kolumner, som `repeat(3, 1fr)`\n- `gap-6` – 24 pixlar åt alla håll\n- `col-span-2` – ett barn som tar två kolumner\n\nDet finns `grid-cols-1` till `grid-cols-12`.',
    example: '<div class="grid grid-cols-3 gap-6">…</div>',
    task: 'Uppgift: Gör `.lista` till ett grid med tre kolumner och `gap-6`. Låt det första kortet ta två kolumner med `col-span-2`.',
    starterCode: `${TW}
<div class="lista">
  <div class="kort p-4 bg-rose-100 rounded-lg">🎂 Tårta</div>
  <div class="kort p-4 bg-rose-100 rounded-lg">🍪 Kakor</div>
  <div class="kort p-4 bg-rose-100 rounded-lg">🧁 Muffins</div>
  <div class="kort p-4 bg-rose-100 rounded-lg">🍩 Munkar</div>
  <div class="kort p-4 bg-rose-100 rounded-lg">🥧 Paj</div>
</div>
`,
    solution: `${TW}
<div class="lista grid grid-cols-3 gap-6">
  <div class="kort p-4 bg-rose-100 rounded-lg col-span-2">🎂 Tårta</div>
  <div class="kort p-4 bg-rose-100 rounded-lg">🍪 Kakor</div>
  <div class="kort p-4 bg-rose-100 rounded-lg">🧁 Muffins</div>
  <div class="kort p-4 bg-rose-100 rounded-lg">🍩 Munkar</div>
  <div class="kort p-4 bg-rose-100 rounded-lg">🥧 Paj</div>
</div>
`,
    hints: [
      'grid, grid-cols-3 och gap-6 på .lista.',
      'col-span-2 på det första kortet.',
      'class="lista grid grid-cols-3 gap-6"',
    ],
    tests: [
      {
        description: 'Korten står på två rader: två på första, tre på andra',
        code: "[rows('.kort'), perRow('.kort')]",
        expected: [2, 2],
      },
      {
        description: 'Det är 24px luft åt alla håll',
        code: "[gapX('.kort'), gapY('.kort')]",
        expected: [24, 24],
      },
      {
        description: 'Tårtan tar två kolumner',
        code: "Math.abs(widths('.kort')[0] - 2 * widths('.kort')[1] - 24) <= 1",
        expected: true,
      },
    ],
  },
  {
    id: 'tailwind-08',
    track: 'tailwind',
    title: 'hover: och md:',
    xp: 25,
    description:
      'I Tailwind skrivs `:hover` och `@media` som ett ord före klassen. Det är det smartaste med Tailwind.',
    explain:
      'Sätt ett ord och kolon före en klass, så gäller den bara ibland:\n\n- `hover:bg-sky-700` – bakgrunden när musen är över\n- `md:grid-cols-3` – tre kolumner när fönstret är minst 768 pixlar brett\n\nTailwind tänker *mobilen först*: klassen utan ord gäller alltid, och `md:` lägger till för större skärmar. `grid-cols-1 md:grid-cols-3` är en kolumn på mobilen och tre på datorn.\n\nSå slipper du skriva `@media` själv.',
    example:
      '<div class="grid grid-cols-1 md:grid-cols-3">…</div>\n<a class="bg-sky-600 hover:bg-sky-700">…</a>',
    task: 'Uppgift: Ge `.lista` en kolumn på mobilen och tre från `md:`. Ge knappen bakgrunden `sky-700` när musen är över.',
    starterCode: `${TW}
<div class="lista grid gap-4">
  <div class="kort p-4 bg-slate-100 rounded-lg">🏀 Basket</div>
  <div class="kort p-4 bg-slate-100 rounded-lg">🏐 Volleyboll</div>
  <div class="kort p-4 bg-slate-100 rounded-lg">🏓 Pingis</div>
</div>
<a class="knapp inline-block mt-4 px-4 py-2 rounded-lg bg-sky-600 text-white" href="#">Anmäl dig</a>
`,
    solution: `${TW}
<div class="lista grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="kort p-4 bg-slate-100 rounded-lg">🏀 Basket</div>
  <div class="kort p-4 bg-slate-100 rounded-lg">🏐 Volleyboll</div>
  <div class="kort p-4 bg-slate-100 rounded-lg">🏓 Pingis</div>
</div>
<a class="knapp inline-block mt-4 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white" href="#">Anmäl dig</a>
`,
    hints: [
      'Två nya klasser på .lista och en på knappen.',
      'md: och hover: skrivs direkt före klassen, utan mellanslag.',
      'grid-cols-1 md:grid-cols-3 och hover:bg-sky-700',
    ],
    tests: [
      {
        description: 'På datorn står korten i tre kolumner',
        code: "perRow('.kort')",
        expected: 3,
      },
      {
        description: 'På mobilen står de under varandra',
        code: "[perRow('.kort'), rows('.kort')]",
        expected: [1, 3],
        width: MOBIL,
      },
      {
        description: 'Knappen blir sky-700 när musen är över',
        code: "twName(hover('.knapp', 'background-color'))",
        expected: 'sky-700',
      },
    ],
  },
  {
    id: 'tailwind-09',
    track: 'tailwind',
    title: 'Laga kortet',
    xp: 25,
    description:
      'Kortet ska vara vitt med luft och runda hörn, men tre klasser är fel. Tailwind säger inget – en felstavad klass gör bara ingenting.',
    explain:
      'En klass som inte finns gör ingenting, och inget fel syns. Kolla:\n\n- Är färgen rätt stavad? `bg-whte` finns inte.\n- Har klassen bindestreck? `p4` är inte samma sak som `p-4`.\n- Finns storleken? `rounded-lgg` finns inte, men `rounded-lg` gör det.\n\nDen gula rutan säger till om klasser som ser ut som Tailwind men inte finns. Men den hittar inte alla.',
    example: '<div class="bg-white p-4 rounded-lg">…</div>',
    task: 'Uppgift: Laga de tre felen så att kortet får vit bakgrund, `16px` padding och `8px` runda hörn.',
    starterCode: `${TW}
<body class="bg-slate-200 p-8">
  <div class="bg-whte p4 rounded-lgg">
    <h2 class="text-xl font-bold">🦉 Ugglan Uno</h2>
    <p class="text-slate-600">Uno är vaken på natten och sover på dagen.</p>
  </div>
</body>
`,
    solution: `${TW}
<body class="bg-slate-200 p-8">
  <div class="bg-white p-4 rounded-lg">
    <h2 class="text-xl font-bold">🦉 Ugglan Uno</h2>
    <p class="text-slate-600">Uno är vaken på natten och sover på dagen.</p>
  </div>
</body>
`,
    hints: [
      'Läs den gula rutan.',
      'Ett av felen saknar ett bindestreck.',
      'bg-white p-4 rounded-lg',
    ],
    tests: [
      {
        description: 'Kortet är vitt',
        code: "twColor('body > div', 'background-color')",
        expected: 'white',
      },
      {
        description: 'Kortet har 16px padding och 8px hörn',
        code: "[px('body > div', 'padding-top'), css('body > div', 'border-radius')]",
        expected: [16, '8px'],
      },
    ],
  },
];
