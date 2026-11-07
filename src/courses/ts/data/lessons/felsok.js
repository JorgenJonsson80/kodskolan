// Bana 11: felsökning. Startkoden är trasig och eleven lagar den. Några
// fel ger typfel, andra (any och as) tystar TypeScript så att felet syns
// först när koden körs.

export const FELSOK = [
  {
    id: 'felsok-01',
    track: 'felsok',
    title: 'Läs felet nerifrån',
    xp: 15,
    description:
      'Ett typfel i ett stort objekt kan bli flera rader långt. Den sista raden säger oftast vad som faktiskt är fel.',
    explain:
      'Felet börjar med det stora ("objektet passar inte `Order`") och slutar med det lilla ("`\'två\'` är inte ett `number`"). Läs nerifrån.\n\nDen röda linjen står där felet upptäcks. Håll musen över den för hela meddelandet.',
    example:
      "type Rad = { vara: string; antal: number };\nconst r: Rad = { vara: 'Bulle', antal: 2 };",
    task: 'Uppgift: Laga ordern så att den passar typen.',
    starterCode:
      "type Rad = { vara: string; antal: number };\ntype Order = { kund: string; rader: Rad[] };\n\nconst order: Order = {\n  kund: 'Ada',\n  rader: [\n    { vara: 'Bulle', antal: 2 },\n    { vara: 'Kaffe', antal: 'två' },\n  ],\n};\n",
    solution:
      "type Rad = { vara: string; antal: number };\ntype Order = { kund: string; rader: Rad[] };\n\nconst order: Order = {\n  kund: 'Ada',\n  rader: [\n    { vara: 'Bulle', antal: 2 },\n    { vara: 'Kaffe', antal: 2 },\n  ],\n};\n",
    hints: [
      'Håll musen över den röda linjen.',
      'Vilken egenskap har fel typ?',
      'antal: 2',
    ],
    tests: [
      {
        description: 'Kaffe, två st',
        code: 'order.rader[1].antal',
        expected: 2,
      },
    ],
  },
  {
    id: 'felsok-02',
    track: 'felsok',
    title: 'any gömmer felet',
    xp: 20,
    description:
      'Funktionen ger `NaN`, men TypeScript säger inget. Parametern är `any`, så ingenting kontrolleras.',
    explain:
      '`rader: any` betyder att TypeScript slutar kolla. Att raderna har `kostnad` och inte `pris` märks först när koden körs: `undefined + 0` blir `NaN`.\n\nGe parametern en riktig typ. Då pekar TypeScript ut felet direkt.',
    example:
      'function summa(tal: number[]): number {\n  return tal.reduce((s, x) => s + x, 0);\n}',
    task: 'Uppgift: Byt `any` mot typen `{ namn: string; kostnad: number }[]` och laga felet TypeScript då visar.',
    starterCode:
      "function total(rader: any): number {\n  return rader.reduce((summa: number, r: any) => summa + r.pris, 0);\n}\n\nconst svar = total([\n  { namn: 'Bulle', kostnad: 32 },\n  { namn: 'Kaffe', kostnad: 35 },\n]);\n",
    solution:
      "function total(rader: { namn: string; kostnad: number }[]): number {\n  return rader.reduce((summa, r) => summa + r.kostnad, 0);\n}\n\nconst svar = total([\n  { namn: 'Bulle', kostnad: 32 },\n  { namn: 'Kaffe', kostnad: 35 },\n]);\n",
    hints: [
      'Byt rader: any mot den riktiga typen.',
      'Ta bort any på r också, så att TypeScript kan se den.',
      'r.kostnad',
    ],
    tests: [{ description: 'svar är 67', code: 'svar', expected: 67 }],
    sourceChecks: [
      { description: 'Inget any', pattern: /\bany\b/, forbidden: true },
    ],
  },
  {
    id: 'felsok-03',
    track: 'felsok',
    title: 'as ljuger',
    xp: 20,
    description:
      'Med `as` säger man åt TypeScript vilken typ något har. TypeScript litar på det – även när det är fel.',
    explain:
      "`{ namn: 'Ada' } as Kund` säger att objektet är en `Kund`, fast `poang` saknas. TypeScript kollar inte, och `kund.poang.toFixed(1)` kraschar när koden körs.\n\nTa bort `as` och skriv typen som vanligt: `const kund: Kund = …`. Då säger TypeScript vad som saknas.",
    example: "const k: Kund = { namn: 'Ada', poang: 0 };",
    task: 'Uppgift: Ta bort `as`, och laga det TypeScript då säger. Kunden har `0` poäng.',
    starterCode:
      "type Kund = { namn: string; poang: number };\n\nconst kund = { namn: 'Ada' } as Kund;\nconst text = kund.poang.toFixed(1);\n",
    solution:
      "type Kund = { namn: string; poang: number };\n\nconst kund: Kund = { namn: 'Ada', poang: 0 };\nconst text = kund.poang.toFixed(1);\n",
    hints: [
      'Koden kraschar för att poang saknas.',
      'const kund: Kund = { … } i stället för as.',
      "const kund: Kund = { namn: 'Ada', poang: 0 };",
    ],
    tests: [{ description: "text är '0.0'", code: 'text', expected: '0.0' }],
    sourceChecks: [
      { description: 'Inget as', pattern: /\bas\s+Kund\b/, forbidden: true },
    ],
  },
  {
    id: 'felsok-04',
    track: 'felsok',
    title: 'Glömd await',
    xp: 15,
    description:
      'Felet säger att ett `Promise<string>` inte är en `string`. Det betyder nästan alltid en glömd `await`.',
    explain:
      'Utan `await` är `namn` löftet om en text, inte texten. TypeScript ser det på typen.\n\nI vanlig JavaScript hade `namn.toUpperCase` blivit "is not a function" när koden kördes.',
    example: 'const svar = await hamta();',
    task: 'Uppgift: Laga `visa` så att den ger namnet med versaler.',
    starterCode:
      "async function hamtaNamn(): Promise<string> {\n  return 'Ada';\n}\n\nasync function visa(): Promise<string> {\n  const namn: string = hamtaNamn();\n  return namn.toUpperCase();\n}\n",
    solution:
      "async function hamtaNamn(): Promise<string> {\n  return 'Ada';\n}\n\nasync function visa(): Promise<string> {\n  const namn: string = await hamtaNamn();\n  return namn.toUpperCase();\n}\n",
    hints: [
      'Läs felet: Promise<string> och string.',
      'Vad behövs för att få ut värdet ur ett Promise?',
      'await hamtaNamn()',
    ],
    tests: [
      { description: "visa() är 'ADA'", code: 'visa()', expected: 'ADA' },
    ],
  },
  {
    id: 'felsok-05',
    track: 'felsok',
    title: 'Den nya storleken',
    xp: 15,
    description:
      'Någon har lagt till `xl` i `Storlek`. Nu saknas den i prislistan.',
    explain:
      '`Record<Storlek, number>` kräver ett pris för varje storlek. När typen växer pekar TypeScript ut varje ställe som inte hängt med.\n\nSå känns det att ändra i ett stort TypeScript-projekt: ändra typen, och följ felen.',
    example: 'const priser: Record<Storlek, number> = { s: 1, m: 2, l: 3 };',
    task: 'Uppgift: Laga prislistan så att `xl` kostar `299`.',
    starterCode:
      "type Storlek = 's' | 'm' | 'l' | 'xl';\n\nconst priser: Record<Storlek, number> = {\n  s: 199,\n  m: 229,\n  l: 259,\n};\n",
    solution:
      "type Storlek = 's' | 'm' | 'l' | 'xl';\n\nconst priser: Record<Storlek, number> = {\n  s: 199,\n  m: 229,\n  l: 259,\n  xl: 299,\n};\n",
    hints: [
      'Läs felet: vilken nyckel saknas?',
      'Lägg till xl i objektet.',
      'xl: 299,',
    ],
    tests: [{ description: 'xl kostar 299', code: 'priser.xl', expected: 299 }],
  },
  {
    id: 'felsok-06',
    track: 'felsok',
    title: 'typeof null',
    xp: 20,
    description:
      "Koden kollar `typeof kund === 'object'`, men TypeScript säger ändå att `kund` kan vara `null`.",
    explain:
      "En gammal egenhet i JavaScript: `typeof null` är `'object'`. Kollen släpper alltså igenom `null`, och TypeScript vet det.\n\nKolla `kund !== null` i stället.",
    example: 'if (x !== null) {\n  // här är x inte null\n}',
    task: 'Uppgift: Laga kollen så att `namn` fungerar.',
    starterCode:
      "type Kund = { namn: string };\n\nfunction namn(kund: Kund | null): string {\n  if (typeof kund === 'object') {\n    return kund.namn;\n  }\n  return 'ingen';\n}\n",
    solution:
      "type Kund = { namn: string };\n\nfunction namn(kund: Kund | null): string {\n  if (kund !== null) {\n    return kund.namn;\n  }\n  return 'ingen';\n}\n",
    hints: [
      'Håll musen över kund inne i if-satsen.',
      "typeof null är 'object'.",
      'if (kund !== null)',
    ],
    tests: [
      { description: 'Ada', code: "namn({ namn: 'Ada' })", expected: 'Ada' },
      { description: 'null', code: 'namn(null)', expected: 'ingen' },
    ],
  },
  {
    id: 'felsok-07',
    track: 'felsok',
    title: 'Ombytta argument',
    xp: 10,
    description: 'Anropet ger två typfel. De beror på samma sak.',
    explain:
      'När flera fel står på samma rad, leta efter en gemensam orsak. Här har beloppet och mottagaren bytt plats.\n\nI JavaScript hade pengarna skickats till "100" och beloppet blivit "Ada".',
    example: "skicka('Bo', 50);",
    task: 'Uppgift: Laga anropet så att Ada får 100 kr.',
    starterCode:
      "function skicka(till: string, belopp: number): string {\n  return `${belopp} kr till ${till}`;\n}\n\nconst kvitto = skicka(100, 'Ada');\n",
    solution:
      "function skicka(till: string, belopp: number): string {\n  return `${belopp} kr till ${till}`;\n}\n\nconst kvitto = skicka('Ada', 100);\n",
    hints: [
      'Vad vill skicka ha först?',
      'Byt plats på argumenten.',
      "skicka('Ada', 100)",
    ],
    tests: [
      { description: 'kvitto', code: 'kvitto', expected: '100 kr till Ada' },
    ],
  },
  {
    id: 'felsok-08',
    track: 'felsok',
    title: 'readonly stoppar sort',
    xp: 15,
    description:
      'Funktionen lovar att inte ändra listan, men `sort` ändrar den. TypeScript säger att `sort` inte finns.',
    explain:
      '`sort` sorterar listan på plats – den gamla listan ändras. En `readonly`-lista har därför ingen `sort`.\n\n`toSorted` ger en ny sorterad lista och lämnar den gamla i fred. Den finns.',
    example: 'const sorterad = lista.toSorted((a, b) => a - b);',
    task: 'Uppgift: Laga `sortera` utan att ta bort `readonly`.',
    starterCode:
      'function sortera(lista: readonly number[]): number[] {\n  return lista.sort((a, b) => a - b);\n}\n',
    solution:
      'function sortera(lista: readonly number[]): number[] {\n  return lista.toSorted((a, b) => a - b);\n}\n',
    hints: [
      'sort ändrar listan.',
      'Det finns en metod som ger en ny lista.',
      'lista.toSorted((a, b) => a - b)',
    ],
    tests: [
      {
        description: 'Sorterar',
        code: 'sortera([3, 1, 2])',
        expected: [1, 2, 3],
      },
      {
        description: 'Den gamla listan är orörd',
        code: '(() => { const l = [3, 1, 2]; sortera(l); return l; })()',
        expected: [3, 1, 2],
      },
    ],
    sourceChecks: [
      { description: 'Behåller readonly', pattern: /readonly\s+number\[\]/ },
    ],
  },
  {
    id: 'felsok-09',
    track: 'felsok',
    title: 'När typen är fel',
    xp: 15,
    description:
      'Ibland är det inte koden som är fel, utan typen. Spelaren ska kunna pausa – men typen tillåter det inte.',
    explain:
      "Ett typfel betyder att koden och typen inte stämmer. Oftast är det koden som ska ändras, men ibland har typen inte hängt med.\n\nHär är `'paus'` ett riktigt läge som saknas i typen. Lägg till det där.",
    example: "type Lage = 'av' | 'på';",
    task: "Uppgift: Laga typen så att `lage` kan bli `'paus'`.",
    starterCode:
      "type Lage = 'av' | 'spelar';\n\nlet lage: Lage = 'av';\nlage = 'spelar';\nlage = 'paus';\n",
    solution:
      "type Lage = 'av' | 'spelar' | 'paus';\n\nlet lage: Lage = 'av';\nlage = 'spelar';\nlage = 'paus';\n",
    hints: [
      'Koden är rätt – det är typen som saknar något.',
      "Lägg till 'paus' i unionen.",
      "type Lage = 'av' | 'spelar' | 'paus';",
    ],
    tests: [{ description: "lage är 'paus'", code: 'lage', expected: 'paus' }],
    typeTests: [
      { description: "'paus' är ett läge", code: "const l: Lage = 'paus';" },
      {
        description: "'stopp' är inget läge",
        code: "const l: Lage = 'stopp';",
        fails: true,
      },
    ],
  },
];
