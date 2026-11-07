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
};
