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
};
