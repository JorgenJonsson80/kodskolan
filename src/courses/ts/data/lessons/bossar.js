// En boss per bana: en större uppgift som använder allt från banan, utan
// ledtrådar. Banan räknas inte som klar förrän bossen är besegrad.
// index.js lägger varje boss sist i sin bana.
const BOSS_INTRO = 'Bossen har inga ledtrådar – visa vad du kan! ';
const START = '// Skriv din kod här\n';

export const BOSSES = {
  typer: {
    id: 'typer-boss',
    track: 'typer',
    title: 'Boss: Kvittot',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Kaféet behöver en rad till kvittot. Varje värde ska ha rätt typ, så att ingen råkar räkna med text.',
    task: `Uppgift: Gör kvittoraden.
  1. \`vara\` (\`string\`): \`'Kanelbulle'\`, \`styckpris\` (\`number\`): \`32\` och \`antal\` (\`number\`): \`3\`.
  2. \`medlem\` (\`boolean\`): \`true\`.
  3. \`summa\`: \`styckpris * antal\`, utan att skriva typen.
  4. \`rad\` (\`string\`): \`'Kanelbulle x3: 96 kr'\`, byggd med en template literal av variablerna.`,
    starterCode: START,
    solution:
      "const vara: string = 'Kanelbulle';\nconst styckpris: number = 32;\nconst antal: number = 3;\nconst medlem: boolean = true;\nconst summa = styckpris * antal;\nconst rad: string = `${vara} x${antal}: ${summa} kr`;\n",
    hints: [],
    tests: [
      { description: 'summa är 96', code: 'summa', expected: 96 },
      {
        description: "rad är 'Kanelbulle x3: 96 kr'",
        code: 'rad',
        expected: 'Kanelbulle x3: 96 kr',
      },
      { description: 'medlem är true', code: 'medlem', expected: true },
    ],
    typeTests: [
      { description: 'summa är ett number', code: 'const k: number = summa;' },
      { description: 'rad är en string', code: 'const k: string = rad;' },
      {
        description: 'medlem är en boolean',
        code: 'const k: boolean = medlem;',
      },
    ],
    sourceChecks: [
      { description: 'vara har typen string', pattern: /vara\s*:\s*string/ },
      {
        description: 'styckpris och antal har typen number',
        pattern:
          /styckpris\s*:\s*number[^]*antal\s*:\s*number|antal\s*:\s*number[^]*styckpris\s*:\s*number/,
      },
      {
        description: 'medlem har typen boolean',
        pattern: /medlem\s*:\s*boolean/,
      },
      {
        description: 'summa har ingen skriven typ',
        pattern: /summa\s*:/,
        forbidden: true,
      },
      { description: 'rad byggs med ${…}', pattern: /`[^`]*\$\{[^`]*`/ },
    ],
  },
  funktioner: {
    id: 'funktioner-boss',
    track: 'funktioner',
    title: 'Boss: Prisräknaren',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Kassan behöver tre funktioner som fungerar ihop. Varje parameter och varje svar ska ha rätt typ.',
    task: `Uppgift: Skriv prisräknaren.
  1. \`radpris(pris: number, antal: number, rabatt = 0): number\` – \`pris * antal * (1 - rabatt)\`, avrundat med \`Math.round\`.
  2. \`kvittorad(vara: string, pris: number, antal: number): string\` – t.ex. \`'Bulle x3: 96 kr'\`, med \`radpris\` utan rabatt.
  3. \`skriv(rad: string): void\` – skriver ut raden med \`console.log\`.`,
    starterCode: START,
    solution:
      'function radpris(pris: number, antal: number, rabatt = 0): number {\n  return Math.round(pris * antal * (1 - rabatt));\n}\n\nfunction kvittorad(vara: string, pris: number, antal: number): string {\n  return `${vara} x${antal}: ${radpris(pris, antal)} kr`;\n}\n\nfunction skriv(rad: string): void {\n  console.log(rad);\n}\n',
    hints: [],
    tests: [
      {
        description: 'radpris(32, 3) är 96',
        code: 'radpris(32, 3)',
        expected: 96,
      },
      {
        description: 'radpris(100, 2, 0.15) är 170',
        code: 'radpris(100, 2, 0.15)',
        expected: 170,
      },
      {
        description: "kvittorad('Bulle', 32, 3) är 'Bulle x3: 96 kr'",
        code: "kvittorad('Bulle', 32, 3)",
        expected: 'Bulle x3: 96 kr',
      },
      {
        description: 'skriv skriver ut raden',
        code: "(skriv('Hej'), __logs)",
        expected: ['Hej'],
      },
    ],
    typeTests: [
      {
        description: 'radpris ger ett tal',
        code: 'const k: number = radpris(1, 1);',
      },
      {
        description: 'kvittorad ger text',
        code: "const k: string = kvittorad('a', 1, 1);",
      },
      {
        description: 'rabatt är ett tal',
        code: "radpris(1, 1, 'mycket');",
        fails: true,
      },
      {
        description: 'skriv ger inget svar',
        code: "const k: string = skriv('a');",
        fails: true,
      },
    ],
    sourceChecks: [
      {
        description: 'kvittorad använder radpris',
        pattern: /kvittorad[^]*radpris\(|radpris\([^]*kvittorad/,
      },
    ],
  },

  objekt: {
    id: 'objekt-boss',
    track: 'objekt',
    title: 'Boss: Bokhyllan',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Bokhyllan har böcker du läst och böcker du inte läst än. Skriv funktionerna som håller koll.',
    task: `Uppgift: \`hylla\` är given. Skriv:
  1. \`olasta(bocker: { titel: string; sidor: number; last: boolean }[]): string[]\` – titlarna på böckerna som inte är lästa.
  2. \`sidorKvar\` med samma parameter, som returnerar hur många sidor de olästa böckerna har tillsammans (\`number\`).`,
    starterCode:
      "const hylla: { titel: string; sidor: number; last: boolean }[] = [\n  { titel: 'Mio min Mio', sidor: 176, last: true },\n  { titel: 'Ronja Rövardotter', sidor: 240, last: false },\n  { titel: 'Bröderna Lejonhjärta', sidor: 232, last: false },\n];\n",
    solution:
      "const hylla: { titel: string; sidor: number; last: boolean }[] = [\n  { titel: 'Mio min Mio', sidor: 176, last: true },\n  { titel: 'Ronja Rövardotter', sidor: 240, last: false },\n  { titel: 'Bröderna Lejonhjärta', sidor: 232, last: false },\n];\n\nfunction olasta(bocker: { titel: string; sidor: number; last: boolean }[]): string[] {\n  return bocker.filter(b => !b.last).map(b => b.titel);\n}\n\nfunction sidorKvar(bocker: { titel: string; sidor: number; last: boolean }[]): number {\n  return bocker.filter(b => !b.last).reduce((summa, b) => summa + b.sidor, 0);\n}\n",
    hints: [],
    tests: [
      {
        description: 'olasta(hylla) är Ronja och Bröderna',
        code: 'olasta(hylla)',
        expected: ['Ronja Rövardotter', 'Bröderna Lejonhjärta'],
      },
      {
        description: 'sidorKvar(hylla) är 472',
        code: 'sidorKvar(hylla)',
        expected: 472,
      },
      { description: 'En tom hylla', code: 'sidorKvar([])', expected: 0 },
    ],
    typeTests: [
      {
        description: 'olasta ger string[]',
        code: 'const k: string[] = olasta(hylla);',
      },
      {
        description: 'sidorKvar ger ett tal',
        code: 'const k: number = sidorKvar(hylla);',
      },
      {
        description: 'En bok utan last ger typfel',
        code: "olasta([{ titel: 'X', sidor: 1 }]);",
        fails: true,
      },
    ],
  },
  egna: {
    id: 'egna-boss',
    track: 'egna',
    title: 'Boss: Biblioteket',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Biblioteket lånar ut både böcker och filmer. Bygg typerna som håller ordning på allt, och en funktion som hittar de försenade lånen.',
    task: `Uppgift:
  1. \`interface Medium\` med \`titel\` (\`string\`) och \`ar\` (\`number\`).
  2. \`interface Bok extends Medium\` med \`forfattare\` (\`string\`).
  3. \`type Lan = { bok: Bok; lantagare: string; dagar: number }\`.
  4. \`forsenade(lan: Lan[]): string[]\` – titlarna på lånen som varat mer än 14 dagar.`,
    starterCode: START,
    solution:
      'interface Medium {\n  titel: string;\n  ar: number;\n}\n\ninterface Bok extends Medium {\n  forfattare: string;\n}\n\ntype Lan = { bok: Bok; lantagare: string; dagar: number };\n\nfunction forsenade(lan: Lan[]): string[] {\n  return lan.filter(l => l.dagar > 14).map(l => l.bok.titel);\n}\n',
    hints: [],
    tests: [
      {
        description: 'Ett försenat lån av två',
        code: "forsenade([{ bok: { titel: 'Ronja', ar: 1981, forfattare: 'Astrid' }, lantagare: 'Ada', dagar: 20 }, { bok: { titel: 'Mio', ar: 1954, forfattare: 'Astrid' }, lantagare: 'Bo', dagar: 3 }])",
        expected: ['Ronja'],
      },
      { description: 'Inga lån', code: 'forsenade([])', expected: [] },
    ],
    typeTests: [
      {
        description: 'En Bok är ett Medium',
        code: "const m: Medium = { titel: 'A', ar: 1, forfattare: 'B' } as Bok;",
      },
      {
        description: 'En Bok måste ha författare',
        code: "const b: Bok = { titel: 'A', ar: 1 };",
        fails: true,
      },
      {
        description: 'Ett lån måste ha dagar',
        code: "const l: Lan = { bok: { titel: 'A', ar: 1, forfattare: 'B' }, lantagare: 'C' };",
        fails: true,
      },
    ],
    sourceChecks: [
      {
        description: 'Bok bygger på Medium',
        pattern: /interface\s+Bok\s+extends\s+Medium/,
      },
    ],
  },

  unioner: {
    id: 'unioner-boss',
    track: 'unioner',
    title: 'Boss: Kaffebeställningen',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Kaféets kassa tar emot beställningar. Storlek och mjölk får bara vara vissa värden, och antalet kan komma som text eller tal.',
    task: `Uppgift:
  1. \`type Storlek = 'liten' | 'mellan' | 'stor'\` och \`type Mjolk = 'vanlig' | 'havre' | 'ingen'\`.
  2. \`pris(storlek: Storlek, mjolk: Mjolk): number\` – liten 30, mellan 38, stor 45, och havre kostar 5 kr extra.
  3. \`totalt(storlek: Storlek, mjolk: Mjolk, antal: string | number): number\` – priset gånger antalet (text görs om med \`Number\`).`,
    starterCode: START,
    solution:
      "type Storlek = 'liten' | 'mellan' | 'stor';\ntype Mjolk = 'vanlig' | 'havre' | 'ingen';\n\nfunction pris(storlek: Storlek, mjolk: Mjolk): number {\n  let grund = 45;\n  if (storlek === 'liten') {\n    grund = 30;\n  } else if (storlek === 'mellan') {\n    grund = 38;\n  }\n  if (mjolk === 'havre') {\n    return grund + 5;\n  }\n  return grund;\n}\n\nfunction totalt(storlek: Storlek, mjolk: Mjolk, antal: string | number): number {\n  if (typeof antal === 'string') {\n    return pris(storlek, mjolk) * Number(antal);\n  }\n  return pris(storlek, mjolk) * antal;\n}\n",
    hints: [],
    tests: [
      {
        description: 'liten utan mjölk',
        code: "pris('liten', 'ingen')",
        expected: 30,
      },
      {
        description: 'stor med havre',
        code: "pris('stor', 'havre')",
        expected: 50,
      },
      {
        description: 'mellan med vanlig',
        code: "pris('mellan', 'vanlig')",
        expected: 38,
      },
      {
        description: "totalt('mellan', 'havre', '3') är 129",
        code: "totalt('mellan', 'havre', '3')",
        expected: 129,
      },
      {
        description: "totalt('liten', 'ingen', 2) är 60",
        code: "totalt('liten', 'ingen', 2)",
        expected: 60,
      },
    ],
    typeTests: [
      {
        description: "'jätte' är ingen storlek",
        code: "pris('jätte', 'ingen');",
        fails: true,
      },
      {
        description: "'mandel' är ingen mjölk",
        code: "pris('liten', 'mandel');",
        fails: true,
      },
      {
        description: 'Antalet kan vara text',
        code: "totalt('liten', 'ingen', '2');",
      },
    ],
  },
  saknas: {
    id: 'saknas-boss',
    track: 'saknas',
    title: 'Boss: Medlemsregistret',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Föreningens register har medlemmar utan e-post och medlemmar utan sponsor. Inget får krascha, och inget `!`.',
    task: `Uppgift: \`medlemmar\` är given. Skriv:
  1. \`hitta(id: number): Medlem | undefined\`.
  2. \`kontakt(id: number): string\` – e-posten, \`'ingen e-post'\` om den saknas, eller \`'okänd medlem'\`.
  3. \`sponsorNamn(id: number): string | null\` – namnet på medlemmens sponsor, eller \`null\` om medlemmen eller sponsorn saknas.`,
    starterCode:
      "type Medlem = { id: number; namn: string; epost?: string; sponsor: number | null };\n\nconst medlemmar: Medlem[] = [\n  { id: 1, namn: 'Ada', epost: 'ada@exempel.se', sponsor: null },\n  { id: 2, namn: 'Bo', sponsor: 1 },\n  { id: 3, namn: 'Cia', epost: 'cia@exempel.se', sponsor: 2 },\n];\n",
    solution:
      "type Medlem = { id: number; namn: string; epost?: string; sponsor: number | null };\n\nconst medlemmar: Medlem[] = [\n  { id: 1, namn: 'Ada', epost: 'ada@exempel.se', sponsor: null },\n  { id: 2, namn: 'Bo', sponsor: 1 },\n  { id: 3, namn: 'Cia', epost: 'cia@exempel.se', sponsor: 2 },\n];\n\nfunction hitta(id: number): Medlem | undefined {\n  return medlemmar.find(m => m.id === id);\n}\n\nfunction kontakt(id: number): string {\n  const medlem = hitta(id);\n  if (medlem === undefined) {\n    return 'okänd medlem';\n  }\n  return medlem.epost ?? 'ingen e-post';\n}\n\nfunction sponsorNamn(id: number): string | null {\n  const sponsor = hitta(id)?.sponsor;\n  if (sponsor === null || sponsor === undefined) {\n    return null;\n  }\n  return hitta(sponsor)?.namn ?? null;\n}\n",
    hints: [],
    tests: [
      {
        description: 'kontakt(1)',
        code: 'kontakt(1)',
        expected: 'ada@exempel.se',
      },
      {
        description: 'kontakt(2) saknar e-post',
        code: 'kontakt(2)',
        expected: 'ingen e-post',
      },
      {
        description: 'kontakt(9) finns inte',
        code: 'kontakt(9)',
        expected: 'okänd medlem',
      },
      {
        description: 'Cias sponsor är Bo',
        code: 'sponsorNamn(3)',
        expected: 'Bo',
      },
      {
        description: 'Ada har ingen sponsor',
        code: 'sponsorNamn(1)',
        expected: null,
      },
      {
        description: 'Medlem 9 finns inte',
        code: 'sponsorNamn(9)',
        expected: null,
      },
    ],
    typeTests: [
      {
        description: 'hitta kan ge undefined',
        code: 'const m: Medlem = hitta(1);',
        fails: true,
      },
      {
        description: 'sponsorNamn kan ge null',
        code: 'const s: string = sponsorNamn(1);',
        fails: true,
      },
    ],
    sourceChecks: [
      {
        description: 'Inget !',
        pattern: /[\w)\]]!(\.|;|\)|,|\s)/,
        forbidden: true,
      },
    ],
  },

  fall: {
    id: 'fall-boss',
    track: 'fall',
    title: 'Boss: Kassan',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Kassan har tre sorters rader: varor som säljs styckvis, varor som vägs, och rabatter. Glömmer någon ett fall ska TypeScript säga till.',
    task: `Uppgift:
  1. \`radsumma(r: Rad): number\` med en \`switch\` och ett \`default\` med \`never\`. Styck: \`pris * antal\`, vikt: \`kiloPris * kilo\` avrundat med \`Math.round\`, rabatt: \`-kronor\`.
  2. \`total(rader: Rad[]): number\` – summan av alla rader.`,
    starterCode:
      "type Rad =\n  | { typ: 'styck'; namn: string; pris: number; antal: number }\n  | { typ: 'vikt'; namn: string; kiloPris: number; kilo: number }\n  | { typ: 'rabatt'; kronor: number };\n",
    solution:
      "type Rad =\n  | { typ: 'styck'; namn: string; pris: number; antal: number }\n  | { typ: 'vikt'; namn: string; kiloPris: number; kilo: number }\n  | { typ: 'rabatt'; kronor: number };\n\nfunction radsumma(r: Rad): number {\n  switch (r.typ) {\n    case 'styck':\n      return r.pris * r.antal;\n    case 'vikt':\n      return Math.round(r.kiloPris * r.kilo);\n    case 'rabatt':\n      return -r.kronor;\n    default: {\n      const koll: never = r;\n      return koll;\n    }\n  }\n}\n\nfunction total(rader: Rad[]): number {\n  return rader.reduce((summa, r) => summa + radsumma(r), 0);\n}\n",
    hints: [],
    tests: [
      {
        description: 'Två bullar',
        code: "radsumma({ typ: 'styck', namn: 'Bulle', pris: 32, antal: 2 })",
        expected: 64,
      },
      {
        description: 'Äpplen',
        code: "radsumma({ typ: 'vikt', namn: 'Äpple', kiloPris: 29.9, kilo: 1.2 })",
        expected: 36,
      },
      {
        description: 'En rabatt',
        code: "radsumma({ typ: 'rabatt', kronor: 10 })",
        expected: -10,
      },
      {
        description: 'Hela kvittot',
        code: "total([{ typ: 'styck', namn: 'Bulle', pris: 32, antal: 2 }, { typ: 'vikt', namn: 'Äpple', kiloPris: 29.9, kilo: 1.2 }, { typ: 'rabatt', kronor: 10 }])",
        expected: 90,
      },
    ],
    typeTests: [
      {
        description: 'En rabatt har inget pris',
        code: "radsumma({ typ: 'rabatt', pris: 1 });",
        fails: true,
      },
    ],
    sourceChecks: [
      { description: 'Har en switch', pattern: /switch\s*\(\s*\w+\.typ\s*\)/ },
      { description: 'Har en never-koll', pattern: /:\s*never\s*=/ },
    ],
  },
  generics: {
    id: 'generics-boss',
    track: 'generics',
    title: 'Boss: Verktygslådan',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Tre hjälpfunktioner som ska fungera för alla sorters listor, och ändå ge rätt typ tillbaka.',
    task: `Uppgift:
  1. \`unika<T>(lista: T[]): T[]\` – listan utan dubbletter (t.ex. med \`new Set\`).
  2. \`storst<T>(lista: T[], varde: (x: T) => number): T | undefined\` – elementet där \`varde\` är störst.
  3. \`gruppera<T>(lista: T[], nyckel: (x: T) => string): Map<string, T[]>\`.`,
    starterCode: START,
    solution:
      'function unika<T>(lista: T[]): T[] {\n  return [...new Set(lista)];\n}\n\nfunction storst<T>(lista: T[], varde: (x: T) => number): T | undefined {\n  let basta: T | undefined = undefined;\n  for (const x of lista) {\n    if (basta === undefined || varde(x) > varde(basta)) {\n      basta = x;\n    }\n  }\n  return basta;\n}\n\nfunction gruppera<T>(lista: T[], nyckel: (x: T) => string): Map<string, T[]> {\n  const grupper = new Map<string, T[]>();\n  for (const x of lista) {\n    const k = nyckel(x);\n    grupper.set(k, [...(grupper.get(k) ?? []), x]);\n  }\n  return grupper;\n}\n',
    hints: [],
    tests: [
      {
        description: 'unika tal',
        code: 'unika([1, 2, 1, 3, 2])',
        expected: [1, 2, 3],
      },
      {
        description: 'storst efter längd',
        code: "storst(['kort', 'längsta', 'mellan'], s => s.length)",
        expected: 'längsta',
      },
      {
        description: 'storst av inget',
        code: 'storst([], x => 1)',
        expected: undefined,
      },
      {
        description: 'gruppera efter första bokstaven',
        code: "gruppera(['Ada', 'Bo', 'Alva'], s => s[0]).get('A')",
        expected: ['Ada', 'Alva'],
      },
    ],
    typeTests: [
      {
        description: 'unika behåller typen',
        code: "const s: string[] = unika(['a']);",
      },
      {
        description: 'storst ger elementets typ',
        code: "const k = storst([{ namn: 'A', poang: 1 }], x => x.poang);\nconst n: string | undefined = k?.namn;",
      },
      {
        description: 'gruppera ger listor av rätt typ',
        code: 'const g: Map<string, number[]> = gruppera([1, 2], x => String(x));',
      },
    ],
  },

  verktyg: {
    id: 'verktyg-boss',
    track: 'verktyg',
    title: 'Boss: Lagret',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Lagret behöver funktioner för att lägga till, ändra och värdera varor – utan att skriva `Vara` mer än en gång.',
    task: `Uppgift: \`type Vara\` är given. Skriv:
  1. \`type NyVara = Omit<Vara, 'id'>\` och \`lagg(lager: Vara[], ny: NyVara): Vara[]\` – den nya varan får id ett högre än det högsta (1 i ett tomt lager).
  2. \`andra(lager: Vara[], id: number, andring: Partial<NyVara>): Vara[]\` – en ny lista där varan med id:t är ändrad.
  3. \`varde(lager: Vara[]): Record<string, number>\` – varje varas namn med \`pris * antal\`.`,
    starterCode:
      'type Vara = { id: number; namn: string; pris: number; antal: number };\n',
    solution:
      "type Vara = { id: number; namn: string; pris: number; antal: number };\n\ntype NyVara = Omit<Vara, 'id'>;\n\nfunction lagg(lager: Vara[], ny: NyVara): Vara[] {\n  const id = Math.max(0, ...lager.map(v => v.id)) + 1;\n  return [...lager, { ...ny, id }];\n}\n\nfunction andra(lager: Vara[], id: number, andring: Partial<NyVara>): Vara[] {\n  return lager.map(v => (v.id === id ? { ...v, ...andring } : v));\n}\n\nfunction varde(lager: Vara[]): Record<string, number> {\n  const svar: Record<string, number> = {};\n  for (const v of lager) {\n    svar[v.namn] = v.pris * v.antal;\n  }\n  return svar;\n}\n",
    hints: [],
    tests: [
      {
        description: 'Första varan får id 1',
        code: "lagg([], { namn: 'Mössa', pris: 100, antal: 2 })",
        expected: [{ namn: 'Mössa', pris: 100, antal: 2, id: 1 }],
      },
      {
        description: 'Nästa får id 6',
        code: "lagg([{ id: 5, namn: 'A', pris: 1, antal: 1 }], { namn: 'B', pris: 2, antal: 2 })[1].id",
        expected: 6,
      },
      {
        description: 'andra ändrar priset',
        code: "andra([{ id: 1, namn: 'A', pris: 10, antal: 1 }, { id: 2, namn: 'B', pris: 20, antal: 1 }], 2, { pris: 25 })",
        expected: [
          { id: 1, namn: 'A', pris: 10, antal: 1 },
          { id: 2, namn: 'B', pris: 25, antal: 1 },
        ],
      },
      {
        description: 'varde',
        code: "varde([{ id: 1, namn: 'Mössa', pris: 100, antal: 3 }, { id: 2, namn: 'Keps', pris: 50, antal: 2 }])",
        expected: { Mössa: 300, Keps: 100 },
      },
    ],
    typeTests: [
      {
        description: 'En NyVara har inget id',
        code: "lagg([], { id: 3, namn: 'a', pris: 1, antal: 1 });",
        fails: true,
      },
      {
        description: 'id går inte att ändra med andra',
        code: 'andra([], 1, { id: 9 });',
        fails: true,
      },
    ],
    sourceChecks: [
      { description: 'Använder Omit', pattern: /Omit\s*</ },
      { description: 'Använder Partial', pattern: /Partial\s*</ },
      { description: 'Använder Record', pattern: /Record\s*</ },
    ],
  },
};
