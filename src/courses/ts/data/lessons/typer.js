// Bana 1: första typerna. Eleven kan JavaScript (JS-kursen) men har aldrig
// skrivit en typ. Inga funktioner med parametrar här: utan typer på dem
// blir det typfel, och de kommer i bana 2.

export const TYPER = [
  {
    id: 'typer-01',
    track: 'typer',
    title: 'Din första typ',
    xp: 10,
    description:
      'TypeScript är JavaScript med typer. Du skriver vad en variabel ska innehålla, och TypeScript håller koll.',
    explain:
      "Efter namnet skriver du ett kolon och typen: `let namn: string = 'Ada';`. De tre vanligaste typerna är `string` (text), `number` (tal) och `boolean` (`true` eller `false`).\n\nTypen finns bara medan koden kontrolleras. När koden körs tas den bort, och kvar är vanlig JavaScript.\n\nTypeScript kontrolleras av en kompilator. Den senaste versionen, TypeScript 7, är omskriven i språket Go och är mycket snabbare. Här används version 6, som går att köra i webbläsaren. Koden du skriver är densamma.",
    example: "let namn: string = 'Ada';\nlet poang: number = 12;",
    task: "Uppgift: Skapa `stad` med typen `string` och värdet `'Malmö'`, och `alder` med typen `number` och värdet `30`.",
    starterCode: '// Skriv din kod här\n',
    solution: "let stad: string = 'Malmö';\nlet alder: number = 30;\n",
    hints: [
      'Namn, kolon, typ, likhetstecken, värde.',
      'Text har typen string och tal typen number.',
      "let stad: string = 'Malmö';",
    ],
    tests: [
      { description: "stad är 'Malmö'", code: 'stad', expected: 'Malmö' },
      { description: 'alder är 30', code: 'alder', expected: 30 },
    ],
    typeTests: [
      {
        description: 'stad får inte bli ett tal',
        code: 'stad = 5;',
        fails: true,
      },
      {
        description: 'alder får inte bli text',
        code: "alder = 'trettio';",
        fails: true,
      },
    ],
    sourceChecks: [
      { description: 'stad har typen string', pattern: /stad\s*:\s*string/ },
      { description: 'alder har typen number', pattern: /alder\s*:\s*number/ },
    ],
  },
  {
    id: 'typer-02',
    track: 'typer',
    title: 'Ditt första typfel',
    xp: 10,
    description:
      'Koden här har ett typfel. TypeScript säger till innan koden ens körs.',
    explain:
      "Ett typfel betyder att ett värde inte passar typen. `pris` är ett `number`, så det kan inte bli texten `'59 kr'`.\n\nI vanlig JavaScript hade koden körts, och `pris * 2` hade blivit `NaN` långt senare. TypeScript hittar felet på raden där det händer.\n\nTitta efter den **röda linjen** i editorn. Håll musen över den för att läsa felet.",
    example: 'let antal: number = 3;\nantal = 4; // går bra, 4 är ett tal',
    task: 'Uppgift: Laga koden så att `pris` blir `59`, som ett tal.',
    starterCode: "let pris: number = 49;\npris = '59 kr';\n",
    solution: 'let pris: number = 49;\npris = 59;\n',
    hints: [
      'Läs felet: vilken typ ska pris ha?',
      "'59 kr' är text. Ett tal har inga citattecken.",
      'pris = 59;',
    ],
    tests: [{ description: 'pris är 59', code: 'pris', expected: 59 }],
    typeTests: [
      {
        description: 'pris är fortfarande ett number',
        code: 'const kontroll: number = pris;',
      },
    ],
  },
  {
    id: 'typer-03',
    track: 'typer',
    title: 'Sant eller falskt',
    xp: 10,
    description:
      'Den tredje vanliga typen är `boolean`: bara `true` eller `false`.',
    explain:
      'En `boolean` är svaret på en ja- eller nej-fråga: är kunden medlem, är butiken öppen?\n\nEn jämförelse som `poang > 10` ger alltid en `boolean`, så den kan sparas direkt i en variabel med typen `boolean`.',
    example: 'let arOppen: boolean = true;\nlet manga: boolean = 25 > 10;',
    task: 'Uppgift: Skapa `poang` (`number`) med värdet `14`, och `klarat` (`boolean`) som är `poang >= 10`.',
    starterCode: '// Skriv din kod här\n',
    solution: 'let poang: number = 14;\nlet klarat: boolean = poang >= 10;\n',
    hints: [
      'Två variabler, båda med typ.',
      'En jämförelse ger true eller false.',
      'let klarat: boolean = poang >= 10;',
    ],
    tests: [
      { description: 'poang är 14', code: 'poang', expected: 14 },
      { description: 'klarat är true', code: 'klarat', expected: true },
    ],
    typeTests: [
      {
        description: "klarat får inte bli texten 'ja'",
        code: "klarat = 'ja';",
        fails: true,
      },
    ],
    sourceChecks: [
      {
        description: 'klarat har typen boolean',
        pattern: /klarat\s*:\s*boolean/,
      },
      {
        description: 'klarat räknas ut med >=',
        pattern: /klarat[^=]*=\s*poang\s*>=/,
      },
    ],
  },
  {
    id: 'typer-04',
    track: 'typer',
    title: 'TypeScript gissar själv',
    xp: 15,
    description:
      'Du behöver inte alltid skriva typen. TypeScript ser vad du ger variabeln och räknar ut typen själv.',
    explain:
      'Skriver du `let antal = 3;` vet TypeScript att `antal` är ett `number`, fast du inte skrev det. Det kallas **typinferens**.\n\nHåll musen över `antal` i editorn, så ser du `let antal: number`.\n\nDe flesta skriver bara typen där TypeScript inte kan gissa. Här ska du låta bli att skriva den.',
    example:
      "let namn = 'Ada';   // string\nlet pris = 49;      // number\nlet medlem = true;  // boolean",
    task: 'Uppgift: Skapa `antal` med värdet `3` **utan** att skriva typen. Öka sedan `antal` med `2` på nästa rad.',
    starterCode: '// Skriv din kod här\n',
    solution: 'let antal = 3;\nantal = antal + 2;\n',
    hints: [
      'Skriv let antal = 3; utan kolon.',
      'Nästa rad: antal = antal + 2;',
      'Håll musen över antal och se att TypeScript vet att det är ett number.',
    ],
    tests: [{ description: 'antal är 5', code: 'antal', expected: 5 }],
    typeTests: [
      {
        description: 'TypeScript vet att antal är ett number',
        code: 'const kontroll: number = antal;',
      },
      {
        description: 'antal får inte bli text',
        code: "antal = 'fem';",
        fails: true,
      },
    ],
    sourceChecks: [
      {
        description: 'Ingen typ skriven efter antal',
        pattern: /antal\s*:/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'typer-05',
    track: 'typer',
    title: 'const är ännu säkrare',
    xp: 15,
    description:
      'Med `const` kan värdet aldrig ändras, så TypeScript kan ge en ännu exaktare typ.',
    explain:
      "`let stad = 'Lund'` får typen `string`, för den kan bli vilken text som helst senare.\n\n`const land = 'Sverige'` kan aldrig ändras. Därför får den typen `'Sverige'` – just den texten och ingen annan. Det kallas en **literaltyp**.\n\nHåll musen över namnen och jämför.",
    example:
      "let a = 'hej';    // let a: string\nconst b = 'hej';  // const b: \"hej\"",
    task: "Uppgift: Skapa `land` med `const` och värdet `'Sverige'`, och `stad` med `let` och värdet `'Lund'`. Skriv inga typer.",
    starterCode: '// Skriv din kod här\n',
    solution: "const land = 'Sverige';\nlet stad = 'Lund';\n",
    hints: [
      'En const och en let.',
      'Håll musen över dem när du skrivit klart.',
      "const land = 'Sverige';",
    ],
    tests: [
      { description: "land är 'Sverige'", code: 'land', expected: 'Sverige' },
      { description: "stad är 'Lund'", code: 'stad', expected: 'Lund' },
    ],
    typeTests: [
      {
        description: "land har typen 'Sverige'",
        code: "const kontroll: 'Sverige' = land;",
      },
      {
        description: 'stad kan bli en annan stad',
        code: "stad = 'Malmö';",
      },
      {
        description: "stad har typen string, inte bara 'Lund'",
        code: "const kontroll: 'Lund' = stad;",
        fails: true,
      },
    ],
    sourceChecks: [
      { description: 'land skapas med const', pattern: /const\s+land/ },
      { description: 'stad skapas med let', pattern: /let\s+stad/ },
    ],
  },
  {
    id: 'typer-06',
    track: 'typer',
    title: 'Metoderna har typer',
    xp: 15,
    description:
      'TypeScript vet också vad metoder ger tillbaka. `toFixed` ger till exempel text, inte ett tal.',
    explain:
      "`(19.5).toFixed(0)` ger `'20'` – texten, inte talet. Det är ett vanligt fel i JavaScript som TypeScript fångar.\n\nHåll musen över `toFixed` för att se vad den ger: `(method) Number.toFixed(…): string`.\n\nVill du ha ett avrundat tal använder du `Math.round` i stället.",
    example:
      "const text = (3.7).toFixed(0);  // string: '4'\nconst tal = Math.round(3.7);     // number: 4",
    task: 'Uppgift: Laga koden så att `avrundat` blir talet `20`. Behåll typen `number`.',
    starterCode:
      'const pris = 19.5;\nconst avrundat: number = pris.toFixed(0);\n',
    solution:
      'const pris = 19.5;\nconst avrundat: number = Math.round(pris);\n',
    hints: [
      'Läs felet: vad ger toFixed?',
      'Math.round avrundar och ger ett number.',
      'const avrundat: number = Math.round(pris);',
    ],
    tests: [{ description: 'avrundat är 20', code: 'avrundat', expected: 20 }],
    typeTests: [
      {
        description: 'avrundat är ett number',
        code: 'const kontroll: number = avrundat;',
      },
    ],
    sourceChecks: [
      {
        description: 'avrundat har kvar typen number',
        pattern: /avrundat\s*:\s*number/,
      },
    ],
  },
  {
    id: 'typer-07',
    track: 'typer',
    title: 'Från text till tal',
    xp: 15,
    description:
      'Det man skriver i ett formulär är alltid text. Ska man räkna med det måste det göras om till ett tal först.',
    explain:
      "`'17' + 1` blir `'171'` i JavaScript – texten och talet sätts ihop. TypeScript låter det vara, för det är tillåtet. Men skriver du typen `number` på resultatet säger TypeScript ifrån.\n\n`Number('17')` gör om texten till talet `17`.",
    example: "const svar = '5';\nconst tal: number = Number(svar) * 2;  // 10",
    task: 'Uppgift: `svar` är text från ett formulär. Laga koden så att `nastaAr` blir talet `18`.',
    starterCode: "const svar = '17';\nconst nastaAr: number = svar + 1;\n",
    solution: "const svar = '17';\nconst nastaAr: number = Number(svar) + 1;\n",
    hints: [
      'Läs felet: svar + 1 blir text.',
      'Gör om svar till ett tal först.',
      'Number(svar) + 1',
    ],
    tests: [{ description: 'nastaAr är 18', code: 'nastaAr', expected: 18 }],
    typeTests: [
      {
        description: 'nastaAr är ett number',
        code: 'const kontroll: number = nastaAr;',
      },
    ],
    sourceChecks: [
      {
        description: 'nastaAr har kvar typen number',
        pattern: /nastaAr\s*:\s*number/,
      },
    ],
  },
  {
    id: 'typer-08',
    track: 'typer',
    title: 'Stavfel som fångas',
    xp: 10,
    description:
      'TypeScript känner till alla metoder, så ett stavfel syns direkt – och ofta med ett förslag.',
    explain:
      'I JavaScript märks `namn.toUppercase()` först när koden körs: `toUppercase is not a function`. TypeScript ser det medan du skriver och föreslår det rätta namnet.\n\nSkriv `namn.` i editorn och vänta, så ser du alla metoder som finns på text.',
    example: "const hej = 'hej';\nconst stort = hej.toUpperCase(); // 'HEJ'",
    task: "Uppgift: Laga stavfelet så att `stort` blir `'ADA'`.",
    starterCode: "const namn = 'Ada';\nconst stort = namn.toUppercase();\n",
    solution: "const namn = 'Ada';\nconst stort = namn.toUpperCase();\n",
    hints: [
      'Läs felet – det föreslår ett namn.',
      'Stort C.',
      'namn.toUpperCase()',
    ],
    tests: [{ description: "stort är 'ADA'", code: 'stort', expected: 'ADA' }],
  },
  {
    id: 'typer-09',
    track: 'typer',
    title: 'Text med värden i',
    xp: 15,
    description:
      'En template literal blir alltid en `string`, hur många tal du än stoppar in.',
    explain:
      'Med backticks och `${ }` sätter du in värden i en text: `` `${antal} st` ``. Resultatet är alltid en `string`.\n\nHär räknar du ut ett pris och skriver det i en text. Tänk på vilka variabler som ska vara tal och vilken som ska vara text.',
    example: 'const antal = 3;\nconst rad: string = `${antal} st`;',
    task: 'Uppgift: Skapa `pris` (`number`, `25`) och `antal` (`number`, `4`). Skapa sedan `summa` som är `pris * antal`, och `kvitto` (`string`) som är `` `Att betala: ${summa} kr` ``.',
    starterCode: '// Skriv din kod här\n',
    solution:
      'const pris: number = 25;\nconst antal: number = 4;\nconst summa = pris * antal;\nconst kvitto: string = `Att betala: ${summa} kr`;\n',
    hints: [
      'Fyra variabler. summa behöver ingen typ – TypeScript räknar ut den.',
      'kvitto använder backticks och ${summa}.',
      'const kvitto: string = `Att betala: ${summa} kr`;',
    ],
    tests: [
      { description: 'summa är 100', code: 'summa', expected: 100 },
      {
        description: "kvitto är 'Att betala: 100 kr'",
        code: 'kvitto',
        expected: 'Att betala: 100 kr',
      },
    ],
    typeTests: [
      {
        description: 'summa är ett number',
        code: 'const kontroll: number = summa;',
      },
      {
        description: 'kvitto är en string',
        code: 'const kontroll: string = kvitto;',
      },
    ],
  },
];
