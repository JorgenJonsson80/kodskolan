// Bana 5: antingen eller. Unioner, literaltyper och avsmalning: TypeScript
// följer if-satserna och vet vilken typ värdet har i varje gren.

export const UNIONER = [
  {
    id: 'unioner-01',
    track: 'unioner',
    title: 'Antingen eller',
    xp: 10,
    description:
      'Ibland kan ett värde vara en av flera typer. Då skriver man typerna med `|` emellan.',
    explain:
      '`number | string` betyder "ett tal eller en text". Det kallas en **union**.\n\nEtt kundnummer kan till exempel vara `42` eller `\'K-42\'`. Båda är okej, men ett `true` är det inte.',
    example: "let id: number | string = 42;\nid = 'K-42'; // går också bra",
    task: 'Uppgift: Skriv `visaId(id: number | string): string` som returnerar `` `#${id}` ``.',
    starterCode: '// Skriv din kod här\n',
    solution:
      'function visaId(id: number | string): string {\n  return `#${id}`;\n}\n',
    hints: [
      'Parametern har typen number | string.',
      'En template literal fungerar för båda.',
      'return `#${id}`;',
    ],
    tests: [
      { description: 'visaId(42) är #42', code: 'visaId(42)', expected: '#42' },
      {
        description: "visaId('K-42') är #K-42",
        code: "visaId('K-42')",
        expected: '#K-42',
      },
    ],
    typeTests: [
      { description: 'Ett tal går bra', code: 'visaId(7);' },
      { description: 'true går inte', code: 'visaId(true);', fails: true },
    ],
  },
  {
    id: 'unioner-02',
    track: 'unioner',
    title: 'Bara vissa värden',
    xp: 15,
    description:
      'En union av texter gör att bara just de texterna är tillåtna.',
    explain:
      "`type Storlek = 'liten' | 'mellan' | 'stor'` är en typ med tre tillåtna värden. `'jätte'` är fel, och det är `'Liten'` också.\n\nDet kallas **literaltyper**. Editorn föreslår de tre värdena när du skriver.",
    example:
      "type Riktning = 'upp' | 'ner' | 'vänster' | 'höger';\n\nlet r: Riktning = 'upp';",
    task: "Uppgift: Skapa `type Storlek = 'liten' | 'mellan' | 'stor'` och `kopp` av typen `Storlek` med värdet `'mellan'`.",
    starterCode: '// Skriv din kod här\n',
    solution:
      "type Storlek = 'liten' | 'mellan' | 'stor';\n\nlet kopp: Storlek = 'mellan';\n",
    hints: [
      'Värdena står inom citattecken med | emellan.',
      "let kopp: Storlek = 'mellan';",
      "type Storlek = 'liten' | 'mellan' | 'stor';",
    ],
    tests: [
      { description: "kopp är 'mellan'", code: 'kopp', expected: 'mellan' },
    ],
    typeTests: [
      {
        description: "'stor' är en Storlek",
        code: "const s: Storlek = 'stor';",
      },
      {
        description: "'jätte' är ingen Storlek",
        code: "const s: Storlek = 'jätte';",
        fails: true,
      },
      {
        description: "'Liten' med stort L är ingen Storlek",
        code: "const s: Storlek = 'Liten';",
        fails: true,
      },
    ],
  },
  {
    id: 'unioner-03',
    track: 'unioner',
    title: 'Ett värde som inte finns',
    xp: 10,
    description: 'Variabeln har fått ett värde som typen inte tillåter.',
    explain:
      "Med en literaltyp fångar TypeScript stavfel och påhittade värden. I JavaScript hade `'vänster'` smugit sig in och spelet hade inte vetat vad det skulle göra.",
    example: "type Svar = 'ja' | 'nej';\n\nconst s: Svar = 'ja';",
    task: "Uppgift: Laga koden så att `riktning` är `'upp'`.",
    starterCode:
      "type Riktning = 'upp' | 'ner';\n\nlet riktning: Riktning = 'uppåt';\n",
    solution:
      "type Riktning = 'upp' | 'ner';\n\nlet riktning: Riktning = 'upp';\n",
    hints: [
      'Läs felet: vilka värden är tillåtna?',
      "Typen tillåter bara 'upp' och 'ner'.",
      "let riktning: Riktning = 'upp';",
    ],
    tests: [
      { description: "riktning är 'upp'", code: 'riktning', expected: 'upp' },
    ],
  },
  {
    id: 'unioner-04',
    track: 'unioner',
    title: 'Smalna av med typeof',
    xp: 15,
    description:
      'Med en union får du bara använda det som fungerar för **alla** typerna. En if med `typeof` smalnar av typen.',
    explain:
      "`x.length` fungerar inte på `string | number`, för tal har ingen längd. Men inne i `if (typeof x === 'string')` vet TypeScript att `x` är text.\n\nHåll musen över `x` inne i if-satsen och efter den – typen är olika. Det kallas **avsmalning** (narrowing).",
    example:
      "function dubbla(x: string | number) {\n  if (typeof x === 'string') {\n    return x + x;   // x: string\n  }\n  return x * 2;     // x: number\n}",
    task: 'Uppgift: Skriv `langd(x: string | number): number`. För text ska den ge antal tecken, för ett tal talet självt.',
    starterCode: '// Skriv din kod här\n',
    solution:
      "function langd(x: string | number): number {\n  if (typeof x === 'string') {\n    return x.length;\n  }\n  return x;\n}\n",
    hints: [
      "if (typeof x === 'string') { … }",
      'Inne i if: x.length',
      'Efter if är x ett number.',
    ],
    tests: [
      { description: "langd('hej') är 3", code: "langd('hej')", expected: 3 },
      { description: 'langd(10) är 10', code: 'langd(10)', expected: 10 },
    ],
    sourceChecks: [
      { description: 'Använder typeof', pattern: /typeof\s+x\s*===/ },
    ],
  },
  {
    id: 'unioner-05',
    track: 'unioner',
    title: 'Ett pris per storlek',
    xp: 15,
    description: 'En funktion som tar en literaltyp vet vilka fall som finns.',
    explain:
      "När parametern är `Storlek` vet TypeScript att den bara kan vara `'liten'`, `'mellan'` eller `'stor'`. Efter två if-satser vet den att det bara är det tredje fallet kvar.\n\nSkriver du `if (storlek === 'jätte')` säger TypeScript att jämförelsen aldrig kan bli sann.",
    example:
      "type Svar = 'ja' | 'nej';\n\nfunction poang(s: Svar): number {\n  if (s === 'ja') {\n    return 1;\n  }\n  return 0;\n}",
    task: 'Uppgift: Skriv `pris(storlek: Storlek): number`: liten 25, mellan 35 och stor 45.',
    starterCode: "type Storlek = 'liten' | 'mellan' | 'stor';\n",
    solution:
      "type Storlek = 'liten' | 'mellan' | 'stor';\n\nfunction pris(storlek: Storlek): number {\n  if (storlek === 'liten') {\n    return 25;\n  }\n  if (storlek === 'mellan') {\n    return 35;\n  }\n  return 45;\n}\n",
    hints: [
      "if (storlek === 'liten') return 25;",
      'Efter två if-satser är bara stor kvar.',
      'return 45; sist.',
    ],
    tests: [
      { description: 'liten', code: "pris('liten')", expected: 25 },
      { description: 'mellan', code: "pris('mellan')", expected: 35 },
      { description: 'stor', code: "pris('stor')", expected: 45 },
    ],
    typeTests: [
      {
        description: "pris('jätte') ger typfel",
        code: "pris('jätte');",
        fails: true,
      },
    ],
  },
  {
    id: 'unioner-06',
    track: 'unioner',
    title: 'Smalna av med in',
    xp: 15,
    description:
      'Är det två sorters objekt kan `in` kolla vilken egenskap som finns.',
    explain:
      "`'simma' in djur` är sant om objektet har egenskapen `simma`. TypeScript förstår det: inne i if-satsen är `djur` en `Fisk`, efter den en `Fagel`.",
    example:
      "type Bil = { tanka: () => string };\ntype Elbil = { ladda: () => string };\n\nfunction fyll(f: Bil | Elbil) {\n  if ('ladda' in f) {\n    return f.ladda();\n  }\n  return f.tanka();\n}",
    task: 'Uppgift: Skriv `rorelse(djur: Fisk | Fagel): string` som anropar `simma` för en fisk och `flyga` för en fågel.',
    starterCode:
      'type Fisk = { simma: () => string };\ntype Fagel = { flyga: () => string };\n',
    solution:
      "type Fisk = { simma: () => string };\ntype Fagel = { flyga: () => string };\n\nfunction rorelse(djur: Fisk | Fagel): string {\n  if ('simma' in djur) {\n    return djur.simma();\n  }\n  return djur.flyga();\n}\n",
    hints: [
      "if ('simma' in djur) { … }",
      'Inne i if är djur en Fisk.',
      'return djur.flyga(); efter if.',
    ],
    tests: [
      {
        description: 'En fisk simmar',
        code: "rorelse({ simma: () => 'plask' })",
        expected: 'plask',
      },
      {
        description: 'En fågel flyger',
        code: "rorelse({ flyga: () => 'flax' })",
        expected: 'flax',
      },
    ],
    sourceChecks: [
      {
        description: 'Använder in',
        pattern: /['"](simma|flyga)['"]\s+in\s+djur/,
      },
    ],
  },
  {
    id: 'unioner-07',
    track: 'unioner',
    title: 'filter som smalnar av',
    xp: 20,
    description:
      'En array kan blanda typer. `filter` med `typeof` ger en array med bara en av dem – och TypeScript förstår det.',
    explain:
      "`(string | number)[]` är en array där varje element är text eller ett tal. Parentesen behövs: `string | number[]` betyder något annat.\n\n`blandat.filter(x => typeof x === 'number')` ger en `number[]`. TypeScript ser vad `filter` kollar och smalnar av hela arrayen. Håll musen över resultatet.",
    example: "const svar: (string | boolean)[] = ['ja', true, 'nej'];",
    task: 'Uppgift: Skapa `tal` med bara talen i `blandat` (med `filter` och `typeof`), och `summa` som är talen ihop.',
    starterCode:
      "const blandat: (string | number)[] = [3, 'tre', 4, 'fyra', 5];\n",
    solution:
      "const blandat: (string | number)[] = [3, 'tre', 4, 'fyra', 5];\n\nconst tal = blandat.filter(x => typeof x === 'number');\nconst summa = tal.reduce((total, x) => total + x, 0);\n",
    hints: [
      "blandat.filter(x => typeof x === 'number')",
      'Håll musen över tal – det är en number[].',
      'const summa = tal.reduce((total, x) => total + x, 0);',
    ],
    tests: [
      { description: 'tal är [3, 4, 5]', code: 'tal', expected: [3, 4, 5] },
      { description: 'summa är 12', code: 'summa', expected: 12 },
    ],
    typeTests: [
      { description: 'tal är en number[]', code: 'const k: number[] = tal;' },
    ],
  },
  {
    id: 'unioner-08',
    track: 'unioner',
    title: 'let blir för brett',
    xp: 20,
    description:
      'Koden ser rätt ut, men TypeScript säger att en `string` inte passar.',
    explain:
      "`let farg = 'röd'` får typen `string`, för en `let` kan bli vilken text som helst senare. Funktionen vill ha en `Farg`, och en `string` kan ju vara `'lila'`.\n\nMed `const` får variabeln typen `'röd'`, som passar. Eller så skriver du typen: `let farg: Farg = 'röd'`.",
    example:
      "type Svar = 'ja' | 'nej';\n\nconst s = 'ja';  // const s: \"ja\" – passar Svar",
    task: 'Uppgift: Laga koden så att `mala(farg)` fungerar.',
    starterCode:
      "type Farg = 'röd' | 'grön' | 'blå';\n\nfunction mala(farg: Farg): string {\n  return `Målar ${farg}`;\n}\n\nlet farg = 'röd';\nconst resultat = mala(farg);\n",
    solution:
      "type Farg = 'röd' | 'grön' | 'blå';\n\nfunction mala(farg: Farg): string {\n  return `Målar ${farg}`;\n}\n\nconst farg = 'röd';\nconst resultat = mala(farg);\n",
    hints: [
      'Håll musen över farg. Vilken typ har den?',
      'let ger string, const ger exakt värdet.',
      "const farg = 'röd';",
    ],
    tests: [
      {
        description: "resultat är 'Målar röd'",
        code: 'resultat',
        expected: 'Målar röd',
      },
    ],
  },
  {
    id: 'unioner-09',
    track: 'unioner',
    title: 'Text eller tal in, tal ut',
    xp: 20,
    description:
      'En funktion kan ta emot flera typer men alltid ge samma typ tillbaka.',
    explain:
      "Ett antal kan komma som talet `3` från koden eller som texten `'3'` från ett formulär. Funktionen tar emot båda och gör om till ett tal.\n\nUtanför funktionen behöver ingen bry sig: svaret är alltid ett `number`.",
    example:
      "function somText(x: string | number): string {\n  if (typeof x === 'number') {\n    return x.toString();\n  }\n  return x;\n}",
    task: 'Uppgift: Skriv `tolka(antal: string | number): number`. Är det text görs det om med `Number`, annars returneras talet.',
    starterCode: '// Skriv din kod här\n',
    solution:
      "function tolka(antal: string | number): number {\n  if (typeof antal === 'string') {\n    return Number(antal);\n  }\n  return antal;\n}\n",
    hints: [
      "if (typeof antal === 'string')",
      'Number(antal) gör om text till tal.',
      'return antal; efter if.',
    ],
    tests: [
      { description: "tolka('3') är 3", code: "tolka('3')", expected: 3 },
      { description: 'tolka(4) är 4', code: 'tolka(4)', expected: 4 },
    ],
    typeTests: [
      {
        description: 'Svaret är ett tal',
        code: "const k: number = tolka('1');",
      },
    ],
  },
];
