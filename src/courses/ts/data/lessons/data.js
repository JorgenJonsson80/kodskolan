// Bana 10: data utifrån. Promise<T>, fetch mot JS-kursens låtsas-API
// (/api/users, /api/users/1/todos, /api/broken ger 500, se
// ../../../js/runner/fakes.js) och unknown med egna typkontroller.

const ANVANDARE =
  'type Anvandare = { id: number; name: string; email: string };\n';

const GUARD = `${ANVANDARE}
function arAnvandare(x: unknown): x is Anvandare {
  return (
    typeof x === 'object' &&
    x !== null &&
    'id' in x &&
    typeof x.id === 'number' &&
    'name' in x &&
    typeof x.name === 'string' &&
    'email' in x &&
    typeof x.email === 'string'
  );
}
`;

export const DATA = [
  {
    id: 'data-01',
    track: 'data',
    title: 'Promise<T>',
    xp: 10,
    description:
      'En `async`-funktion ger alltid ett `Promise`. Typen säger vad det blir när man väntat: `Promise<string>`.',
    explain:
      '`async function halsning(): Promise<string>` lovar att svaret, efter `await`, är en `string`.\n\nUtan `await` har du bara löftet, inte texten. Därför går det inte att spara svaret direkt i en `string` – TypeScript säger till.',
    example: 'async function svar(): Promise<number> {\n  return 42;\n}',
    task: 'Uppgift: Skriv `async function halsning(namn: string): Promise<string>` som ger `` `Hej ${namn}` ``.',
    starterCode: '// Skriv din kod här\n',
    solution:
      'async function halsning(namn: string): Promise<string> {\n  return `Hej ${namn}`;\n}\n',
    hints: [
      'async före function.',
      'Returtypen är Promise<string>.',
      'return `Hej ${namn}`;',
    ],
    tests: [
      {
        description: "halsning('Ada')",
        code: "halsning('Ada')",
        expected: 'Hej Ada',
      },
    ],
    typeTests: [
      {
        description: 'Svaret är ett löfte om text',
        code: "halsning('a').then(s => s.toUpperCase());",
      },
      {
        description: 'Utan await är det ingen text',
        code: "const s: string = halsning('a');",
        fails: true,
      },
    ],
    sourceChecks: [
      {
        description: 'Returtypen är Promise<string>',
        pattern: /Promise\s*<\s*string\s*>/,
      },
    ],
  },
  {
    id: 'data-02',
    track: 'data',
    title: 'await ger T',
    xp: 15,
    description:
      'Med `await` får du ut värdet ur löftet. Ett `Promise<string>` blir en `string`.',
    explain:
      'Inne i en `async`-funktion gör `await` om `Promise<T>` till `T`. Håll musen över `text` i lösningen – det är en `string`.\n\nGlömmer du `await` blir `text` ett `Promise<string>`, och `text.length` blir typfel.',
    example:
      'async function dubbel(): Promise<number> {\n  const n = await svar();\n  return n * 2;\n}',
    task: "Uppgift: Skriv `async function langd(): Promise<number>` som väntar på `halsning('Ada')` och ger textens längd.",
    starterCode:
      'async function halsning(namn: string): Promise<string> {\n  return `Hej ${namn}`;\n}\n',
    solution:
      "async function halsning(namn: string): Promise<string> {\n  return `Hej ${namn}`;\n}\n\nasync function langd(): Promise<number> {\n  const text = await halsning('Ada');\n  return text.length;\n}\n",
    hints: [
      "const text = await halsning('Ada');",
      'text.length',
      'Returtypen är Promise<number>.',
    ],
    tests: [{ description: 'langd() är 7', code: 'langd()', expected: 7 }],
    sourceChecks: [
      { description: 'Använder await', pattern: /await\s+halsning/ },
    ],
  },
  {
    id: 'data-03',
    track: 'data',
    title: 'fetch och en typ',
    xp: 15,
    description:
      '`json()` vet inte vad servern skickar, så den ger `any`. Med en returtyp på funktionen bestämmer du vad det ska vara.',
    explain:
      'Håll musen över `json` – den ger `Promise<any>`. Med `Promise<Anvandare>` som returtyp får resten av programmet en riktig typ att lita på.\n\nMen observera: det är ett **löfte du ger**. TypeScript kan inte kolla vad servern faktiskt skickar. Det kommer längre fram i banan.\n\nI övningarna finns ett låtsas-API: `/api/users` och `/api/users/1`.',
    example:
      "async function alla(): Promise<Anvandare[]> {\n  const svar = await fetch('/api/users');\n  return svar.json();\n}",
    task: 'Uppgift: Skriv `async function hamtaAnvandare(id: number): Promise<Anvandare>` som hämtar `` `/api/users/${id}` ``.',
    starterCode: ANVANDARE,
    solution: `${ANVANDARE}\nasync function hamtaAnvandare(id: number): Promise<Anvandare> {\n  const svar = await fetch(\`/api/users/\${id}\`);\n  return svar.json();\n}\n`,
    hints: [
      'const svar = await fetch(`/api/users/${id}`);',
      'return svar.json();',
      'Returtypen är Promise<Anvandare>.',
    ],
    tests: [
      {
        description: 'Användare 1',
        code: 'hamtaAnvandare(1).then(a => a.name)',
        expected: 'Ada Lovelace',
      },
      {
        description: 'Rätt adress',
        code: 'hamtaAnvandare(3).then(() => fetch.calls)',
        expected: ['/api/users/3'],
      },
    ],
    typeTests: [
      {
        description: 'Svaret har name',
        code: 'hamtaAnvandare(1).then(a => a.name.toUpperCase());',
      },
      {
        description: 'Svaret har inget namn',
        code: 'hamtaAnvandare(1).then(a => a.namn);',
        fails: true,
      },
    ],
  },
  {
    id: 'data-04',
    track: 'data',
    title: 'unknown i stället för any',
    xp: 20,
    description:
      '`any` låter dig göra vad som helst – även fel saker. `unknown` tvingar dig att kolla först.',
    explain:
      "Med `any` kraschar `data.nman.toUpperCase()` först när koden körs. Med `unknown` får du inte röra något förrän du kollat vad det är.\n\n`typeof data === 'object' && data !== null && 'namn' in data` säger att det är ett objekt med `namn`. Sedan kollar `typeof data.namn === 'string'` att det är text.",
    example:
      "function arText(x: unknown): string {\n  if (typeof x === 'string') {\n    return x;\n  }\n  return '';\n}",
    task: "Uppgift: Skriv `namnFran(data: unknown): string` som ger `data.namn` om det är ett objekt med ett `namn` som är text, annars `'okänt'`.",
    starterCode: '// Skriv din kod här\n',
    solution:
      "function namnFran(data: unknown): string {\n  if (\n    typeof data === 'object' &&\n    data !== null &&\n    'namn' in data &&\n    typeof data.namn === 'string'\n  ) {\n    return data.namn;\n  }\n  return 'okänt';\n}\n",
    hints: [
      "typeof data === 'object' && data !== null",
      "'namn' in data",
      "typeof data.namn === 'string'",
    ],
    tests: [
      {
        description: 'Med namn',
        code: "namnFran({ namn: 'Ada' })",
        expected: 'Ada',
      },
      {
        description: 'Med fel typ',
        code: 'namnFran({ namn: 5 })',
        expected: 'okänt',
      },
      { description: 'null', code: 'namnFran(null)', expected: 'okänt' },
      { description: 'Text', code: "namnFran('Ada')", expected: 'okänt' },
    ],
    sourceChecks: [
      { description: 'Inget any', pattern: /\bany\b/, forbidden: true },
    ],
  },
  {
    id: 'data-05',
    track: 'data',
    title: 'En egen typkontroll',
    xp: 20,
    description:
      'En funktion med returtypen `x is Anvandare` är en typkontroll: när den svarar `true` vet TypeScript att `x` är en `Anvandare`.',
    explain:
      'Kontrollen från förra övningen blir lång. Lägg den i en funktion med returtypen `x is Anvandare`, så kan den användas överallt: `if (arAnvandare(data)) { data.name … }`.\n\nTypeScript litar på att funktionen kollar rätt, så kolla alla fält.',
    example:
      "function arTal(x: unknown): x is number {\n  return typeof x === 'number';\n}",
    task: 'Uppgift: Skriv `arAnvandare(x: unknown): x is Anvandare` som kollar att `x` är ett objekt med `id` (tal), `name` och `email` (text).',
    starterCode: ANVANDARE,
    solution: GUARD,
    hints: [
      "Börja med typeof x === 'object' && x !== null.",
      "'id' in x && typeof x.id === 'number'",
      'Samma för name och email, allt med &&.',
    ],
    tests: [
      {
        description: 'En användare',
        code: "arAnvandare({ id: 1, name: 'Ada', email: 'a@b.se' })",
        expected: true,
      },
      {
        description: 'Saknar email',
        code: "arAnvandare({ id: 1, name: 'Ada' })",
        expected: false,
      },
      {
        description: 'id är text',
        code: "arAnvandare({ id: '1', name: 'Ada', email: 'a' })",
        expected: false,
      },
      { description: 'null', code: 'arAnvandare(null)', expected: false },
    ],
    typeTests: [
      {
        description: 'Efter kontrollen är det en Anvandare',
        code: 'const x: unknown = {};\nif (arAnvandare(x)) { const n: string = x.name; }',
      },
    ],
  },
  {
    id: 'data-06',
    track: 'data',
    title: 'Kolla svaret',
    xp: 20,
    description:
      'Nu kan svaret från servern kontrolleras på riktigt, i stället för att bara lova en typ.',
    explain:
      'Först `svar.ok`: finns inte användaren svarar servern 404. Sedan läses datan som `unknown`, och `arAnvandare` kollar den.\n\nNu stämmer typen alltid med verkligheten – och funktionen säger `null` när något är fel.',
    example:
      'const data: unknown = await svar.json();\nif (arAnvandare(data)) {\n  return data.name;\n}',
    task: 'Uppgift: Skriv `async function hamtaNamn(id: number): Promise<string | null>`. Ge `null` om svaret inte är ok eller datan inte är en användare.',
    starterCode: GUARD,
    solution: `${GUARD}\nasync function hamtaNamn(id: number): Promise<string | null> {\n  const svar = await fetch(\`/api/users/\${id}\`);\n  if (!svar.ok) {\n    return null;\n  }\n  const data: unknown = await svar.json();\n  if (arAnvandare(data)) {\n    return data.name;\n  }\n  return null;\n}\n`,
    hints: [
      'if (!svar.ok) { return null; }',
      'const data: unknown = await svar.json();',
      'if (arAnvandare(data)) { return data.name; }',
    ],
    tests: [
      {
        description: 'Användare 3',
        code: 'hamtaNamn(3)',
        expected: 'Grace Hopper',
      },
      {
        description: 'Användare 99 finns inte',
        code: 'hamtaNamn(99)',
        expected: null,
      },
    ],
    sourceChecks: [{ description: 'Kollar svar.ok', pattern: /\.ok\b/ }],
  },
  {
    id: 'data-07',
    track: 'data',
    title: 'En lista från servern',
    xp: 20,
    description:
      'En typkontroll fungerar också i `filter`. Då blir resultatet en lista med rätt typ.',
    explain:
      '`Array.isArray(data)` kollar att det är en array. Sedan ger `data.filter(arAnvandare)` en `Anvandare[]` – bara de element som klarade kontrollen.\n\nHåll musen över resultatet från `filter`.',
    example: 'const tal = blandat.filter(arTal); // number[]',
    task: 'Uppgift: Skriv `async function allaNamn(): Promise<string[]>` som hämtar `/api/users` och ger namnen på alla riktiga användare (en tom lista om svaret inte är en array).',
    starterCode: GUARD,
    solution: `${GUARD}\nasync function allaNamn(): Promise<string[]> {\n  const svar = await fetch('/api/users');\n  const data: unknown = await svar.json();\n  if (!Array.isArray(data)) {\n    return [];\n  }\n  return data.filter(arAnvandare).map(a => a.name);\n}\n`,
    hints: [
      'const data: unknown = await svar.json();',
      'if (!Array.isArray(data)) { return []; }',
      'return data.filter(arAnvandare).map(a => a.name);',
    ],
    tests: [
      {
        description: 'Tre namn',
        code: 'allaNamn()',
        expected: ['Ada Lovelace', 'Linus Torvalds', 'Grace Hopper'],
      },
    ],
  },
  {
    id: 'data-08',
    track: 'data',
    title: 'Flera på en gång',
    xp: 20,
    description:
      '`Promise.all` väntar på många löften samtidigt – och TypeScript vet typen på varje svar.',
    explain:
      '`Promise.all([a, b])` med två `Promise<Anvandare>` ger `Promise<Anvandare[]>`. Med `await` får du en `Anvandare[]`.\n\nAnropen görs samtidigt, så det går snabbare än att vänta på ett i taget.',
    example: 'const [a, b] = await Promise.all([hamta(1), hamta(2)]);',
    task: 'Uppgift: Skriv `async function namnFor(idn: number[]): Promise<string[]>` som hämtar alla användare med `Promise.all` och ger deras namn.',
    starterCode: `${ANVANDARE}\nasync function hamtaAnvandare(id: number): Promise<Anvandare> {\n  const svar = await fetch(\`/api/users/\${id}\`);\n  return svar.json();\n}\n`,
    solution: `${ANVANDARE}\nasync function hamtaAnvandare(id: number): Promise<Anvandare> {\n  const svar = await fetch(\`/api/users/\${id}\`);\n  return svar.json();\n}\n\nasync function namnFor(idn: number[]): Promise<string[]> {\n  const anvandare = await Promise.all(idn.map(hamtaAnvandare));\n  return anvandare.map(a => a.name);\n}\n`,
    hints: [
      'idn.map(hamtaAnvandare) ger en lista med löften.',
      'await Promise.all( … )',
      'return anvandare.map(a => a.name);',
    ],
    tests: [
      {
        description: '1 och 3',
        code: 'namnFor([1, 3])',
        expected: ['Ada Lovelace', 'Grace Hopper'],
      },
    ],
    sourceChecks: [
      { description: 'Använder Promise.all', pattern: /Promise\.all\(/ },
    ],
  },
  {
    id: 'data-09',
    track: 'data',
    title: 'Fel som unknown',
    xp: 20,
    description:
      'I `catch` är felet `unknown` – vad som helst kan kastas. Kolla med `instanceof Error` innan du läser `message`.',
    explain:
      '`throw` kan kasta vad som helst, även text eller ett tal. Därför är `fel` i `catch (fel)` av typen `unknown`.\n\n`fel instanceof Error` smalnar av, så att `fel.message` fungerar.\n\nHär blir svaret en union som i bana 7: antingen `ok` med data, eller ett fel.',
    example:
      "try {\n  JSON.parse('{');\n} catch (fel) {\n  console.log(fel instanceof Error ? fel.message : 'Okänt fel');\n}",
    task: "Uppgift: Skriv `async function sakert(url: string): Promise<Svar>`. Ett svar som inte är ok ger `{ ok: false, fel: 'Status 500' }` (med rätt nummer). Kastas ett fel ger det `{ ok: false, fel: meddelandet }`.",
    starterCode:
      'type Svar = { ok: true; data: unknown } | { ok: false; fel: string };\n',
    solution:
      "type Svar = { ok: true; data: unknown } | { ok: false; fel: string };\n\nasync function sakert(url: string): Promise<Svar> {\n  try {\n    const svar = await fetch(url);\n    if (!svar.ok) {\n      return { ok: false, fel: `Status ${svar.status}` };\n    }\n    return { ok: true, data: await svar.json() };\n  } catch (fel) {\n    return { ok: false, fel: fel instanceof Error ? fel.message : 'Okänt fel' };\n  }\n}\n",
    hints: [
      'try { … } catch (fel) { … }',
      'return { ok: false, fel: `Status ${svar.status}` };',
      "fel instanceof Error ? fel.message : 'Okänt fel'",
    ],
    tests: [
      {
        description: 'Serverfel',
        code: "sakert('/api/broken')",
        expected: { ok: false, fel: 'Status 500' },
      },
      {
        description: 'Finns inte',
        code: "sakert('/api/users/99').then(s => s.ok)",
        expected: false,
      },
      {
        description: 'Lyckas',
        code: "sakert('/api/users/1').then(s => s.ok)",
        expected: true,
      },
    ],
  },
];
