// Bana 6: det som kan saknas. Med strictNullChecks måste null och
// undefined hanteras innan värdet används – det vanligaste felet i
// JavaScript ("Cannot read properties of undefined") fångas i förväg.

export const SAKNAS = [
  {
    id: 'saknas-01',
    track: 'saknas',
    title: 'Ett värde som kan saknas',
    xp: 10,
    description:
      'Ibland finns det inget värde än. Det skrivs med en union: `string | null`.',
    explain:
      '`let vinnare: string | null = null` betyder att det inte finns någon vinnare än, men att det blir en text sen.\n\n`null` är "inget värde, med flit". `undefined` är "inget värde än", som en valfri parameter som hoppades över. TypeScript håller isär dem från vanliga värden: en `string | null` är inte en `string`.',
    example: "let vald: string | null = null;\nvald = 'Ada';",
    task: "Uppgift: Skapa `vinnare` med typen `string | null` och värdet `null`. Ge den sedan värdet `'Ada'`.",
    starterCode: '// Skriv din kod här\n',
    solution: "let vinnare: string | null = null;\nvinnare = 'Ada';\n",
    hints: [
      'Typen är string | null.',
      'Startvärdet är null, utan citattecken.',
      "vinnare = 'Ada';",
    ],
    tests: [
      { description: "vinnare är 'Ada'", code: 'vinnare', expected: 'Ada' },
    ],
    typeTests: [
      { description: 'vinnare kan vara null', code: 'vinnare = null;' },
      {
        description: 'En string | null är ingen string',
        code: '(() => { const s: string = vinnare; })();',
        fails: true,
      },
    ],
    sourceChecks: [
      {
        description: 'vinnare har typen string | null',
        pattern: /vinnare\s*:\s*string\s*\|\s*null/,
      },
    ],
  },
  {
    id: 'saknas-02',
    track: 'saknas',
    title: 'find kan misslyckas',
    xp: 15,
    description:
      '`find` hittar inte alltid något. Därför ger den `string | undefined`, och TypeScript påminner dig.',
    explain:
      'Håll musen över resultatet från `find`: typen är `string | undefined`. Om inget element passar blir svaret `undefined`.\n\n`??` ger ett annat värde när det till vänster är `null` eller `undefined`. Då blir resultatet en ren `string` igen.',
    example:
      "const djur = ['katt', 'hund'];\nconst f = djur.find(d => d.startsWith('f')) ?? 'inget';",
    task: "Uppgift: Skriv `forsta(namn: string[], bokstav: string): string` som ger första namnet som börjar på bokstaven, eller `'ingen'`.",
    starterCode: '// Skriv din kod här\n',
    solution:
      "function forsta(namn: string[], bokstav: string): string {\n  return namn.find(n => n.startsWith(bokstav)) ?? 'ingen';\n}\n",
    hints: [
      'namn.find(n => n.startsWith(bokstav))',
      'Svaret kan vara undefined – använd ??',
      "return namn.find(n => n.startsWith(bokstav)) ?? 'ingen';",
    ],
    tests: [
      {
        description: 'Hittar Bo',
        code: "forsta(['Ada', 'Bo', 'Bella'], 'B')",
        expected: 'Bo',
      },
      {
        description: 'Hittar ingen',
        code: "forsta(['Ada'], 'Ö')",
        expected: 'ingen',
      },
    ],
  },
  {
    id: 'saknas-03',
    track: 'saknas',
    title: 'Kanske undefined',
    xp: 15,
    description:
      'Koden använder svaret från `find` som om det alltid fanns. TypeScript säger ifrån.',
    explain:
      '`kund` kan vara `undefined` om ingen kund har id 2. Då kraschar `kund.namn` med "Cannot read properties of undefined" – det vanligaste felet i JavaScript.\n\n`kund?.namn` ger `undefined` i stället för att krascha, och `?? \'okänd\'` gör om det till en text.',
    example:
      "const k = kunder.find(k => k.id === 9);\nconst namn = k?.namn ?? 'okänd';",
    task: "Uppgift: Laga koden så att `namn` blir kundens namn, eller `'okänd'` om kunden inte finns.",
    starterCode:
      "const kunder: { id: number; namn: string }[] = [\n  { id: 1, namn: 'Ada' },\n  { id: 2, namn: 'Bo' },\n];\n\nconst kund = kunder.find(k => k.id === 2);\nconst namn: string = kund.namn;\n",
    solution:
      "const kunder: { id: number; namn: string }[] = [\n  { id: 1, namn: 'Ada' },\n  { id: 2, namn: 'Bo' },\n];\n\nconst kund = kunder.find(k => k.id === 2);\nconst namn: string = kund?.namn ?? 'okänd';\n",
    hints: [
      'Läs felet: kund kan vara undefined.',
      '?. stoppar innan det kraschar.',
      "const namn: string = kund?.namn ?? 'okänd';",
    ],
    tests: [{ description: "namn är 'Bo'", code: 'namn', expected: 'Bo' }],
  },
  {
    id: 'saknas-04',
    track: 'saknas',
    title: 'Kolla först',
    xp: 15,
    description:
      'En vanlig if-sats smalnar av typen. Efter `if (text === null) return` vet TypeScript att `text` finns.',
    explain:
      'Inne i funktionen är `text` av typen `string | null`. Efter `if (text === null) { return 0; }` kan den bara vara en `string`, så `text.length` fungerar.\n\nHåll musen över `text` före och efter if-satsen.',
    example:
      "function hej(namn: string | null): string {\n  if (namn === null) {\n    return 'Hej!';\n  }\n  return 'Hej ' + namn.toUpperCase();\n}",
    task: 'Uppgift: Skriv `langd(text: string | null): number` som ger antal tecken, eller `0` för `null`.',
    starterCode: '// Skriv din kod här\n',
    solution:
      'function langd(text: string | null): number {\n  if (text === null) {\n    return 0;\n  }\n  return text.length;\n}\n',
    hints: [
      'if (text === null) { return 0; }',
      'Efter if är text en string.',
      'return text.length;',
    ],
    tests: [
      { description: "langd('hej') är 3", code: "langd('hej')", expected: 3 },
      { description: 'langd(null) är 0', code: 'langd(null)', expected: 0 },
    ],
    sourceChecks: [
      { description: 'Ingen ?. behövs', pattern: /\?\./, forbidden: true },
    ],
  },
  {
    id: 'saknas-05',
    track: 'saknas',
    title: '?. genom flera led',
    xp: 15,
    description:
      'När en valfri egenskap har egna egenskaper räcker en `?.` för att ta sig igenom.',
    explain:
      '`p.adress?.stad` betyder: om `adress` finns, ta `stad`, annars `undefined`. Utan `?.` säger TypeScript att `adress` kan vara `undefined`.',
    example:
      "type Bil = { marke: string; agare?: { namn: string } };\n\nfunction agare(b: Bil): string {\n  return b.agare?.namn ?? 'ingen';\n}",
    task: "Uppgift: Skriv `stad(p: Person): string` som ger personens stad, eller `'okänd'`.",
    starterCode:
      'type Person = { namn: string; adress?: { gata: string; stad: string } };\n',
    solution:
      "type Person = { namn: string; adress?: { gata: string; stad: string } };\n\nfunction stad(p: Person): string {\n  return p.adress?.stad ?? 'okänd';\n}\n",
    hints: [
      'adress kan saknas.',
      'p.adress?.stad',
      "return p.adress?.stad ?? 'okänd';",
    ],
    tests: [
      {
        description: 'Med adress',
        code: "stad({ namn: 'Ada', adress: { gata: 'Ån 1', stad: 'Lund' } })",
        expected: 'Lund',
      },
      {
        description: 'Utan adress',
        code: "stad({ namn: 'Bo' })",
        expected: 'okänd',
      },
    ],
  },
  {
    id: 'saknas-06',
    track: 'saknas',
    title: 'Noll är inte inget',
    xp: 20,
    description:
      'Typerna stämmer, men svaret blir fel för `0`. Det är skillnad på `||` och `??`.',
    explain:
      "`n || 1` ger `1` om `n` är *falsy*: `undefined`, `null`, men också `0` och `''`. Så `antal(0)` blir `1`.\n\n`n ?? 1` ger `1` bara om `n` är `null` eller `undefined`. Noll får vara noll.\n\nTypeScript kan inte se den här sortens fel – därför har övningen tester som kör koden.",
    example: 'const a = 0 || 5;   // 5\nconst b = 0 ?? 5;   // 0',
    task: 'Uppgift: Laga `antal` så att `antal(0)` blir `0`, men `antal(undefined)` fortfarande blir `1`.',
    starterCode:
      'function antal(n: number | undefined): number {\n  return n || 1;\n}\n',
    solution:
      'function antal(n: number | undefined): number {\n  return n ?? 1;\n}\n',
    hints: [
      'Vad ger 0 || 1?',
      '?? bryr sig bara om null och undefined.',
      'return n ?? 1;',
    ],
    tests: [
      { description: 'antal(0) är 0', code: 'antal(0)', expected: 0 },
      {
        description: 'antal(undefined) är 1',
        code: 'antal(undefined)',
        expected: 1,
      },
      { description: 'antal(4) är 4', code: 'antal(4)', expected: 4 },
    ],
  },
  {
    id: 'saknas-07',
    track: 'saknas',
    title: 'Lova med !',
    xp: 15,
    description:
      'Ett `!` efter ett värde betyder "jag lovar att det finns". TypeScript slutar då kolla.',
    explain:
      "`elever.find(e => e.namn === 'Ada')!` säger åt TypeScript: det här är inte `undefined`. Typen blir bara elevtypen.\n\nDet är ett löfte TypeScript inte kontrollerar. Använd det bara när du verkligen vet – som här, där Ada står i listan precis ovanför. Nästa övning visar vad som händer när löftet är fel.",
    example: "const forsta = ['a', 'b'].find(x => x === 'a')!;",
    task: 'Uppgift: Skapa `ada` med `find` och `!`, och `poang` som är Adas poäng.',
    starterCode:
      "const elever: { namn: string; poang: number }[] = [\n  { namn: 'Ada', poang: 18 },\n  { namn: 'Cia', poang: 15 },\n];\n",
    solution:
      "const elever: { namn: string; poang: number }[] = [\n  { namn: 'Ada', poang: 18 },\n  { namn: 'Cia', poang: 15 },\n];\n\nconst ada = elever.find(e => e.namn === 'Ada')!;\nconst poang = ada.poang;\n",
    hints: [
      "elever.find(e => e.namn === 'Ada')",
      '! direkt efter parentesen.',
      'const poang = ada.poang;',
    ],
    tests: [{ description: 'poang är 18', code: 'poang', expected: 18 }],
    typeTests: [
      { description: 'poang är ett number', code: 'const k: number = poang;' },
    ],
    sourceChecks: [{ description: 'Använder !', pattern: /\)!/ }],
  },
  {
    id: 'saknas-08',
    track: 'saknas',
    title: 'När ! ljuger',
    xp: 20,
    description:
      'Här lovar `!` att Bo finns. Men Bo står inte i listan, och koden kraschar när den körs.',
    explain:
      'Med `!` tystades TypeScript, så felet syntes först när koden kördes: `Cannot read properties of undefined`.\n\nTa bort `!` och låt TypeScript hjälpa till: med `?.` och `??` blir det `0` när eleven saknas. Ett `!` är nästan alltid ett tecken på att man borde kolla i stället.',
    example:
      "const e = elever.find(e => e.namn === 'X');\nconst p = e?.poang ?? 0;",
    task: 'Uppgift: Laga koden så att `poang` blir `0` när eleven inte finns – utan `!`.',
    starterCode:
      "const elever: { namn: string; poang: number }[] = [\n  { namn: 'Ada', poang: 18 },\n  { namn: 'Cia', poang: 15 },\n];\n\nconst bo = elever.find(e => e.namn === 'Bo')!;\nconst poang = bo.poang;\n",
    solution:
      "const elever: { namn: string; poang: number }[] = [\n  { namn: 'Ada', poang: 18 },\n  { namn: 'Cia', poang: 15 },\n];\n\nconst bo = elever.find(e => e.namn === 'Bo');\nconst poang = bo?.poang ?? 0;\n",
    hints: [
      'Koden kraschar för att bo är undefined.',
      'Ta bort ! och använd ?. och ??',
      'const poang = bo?.poang ?? 0;',
    ],
    tests: [{ description: 'poang är 0', code: 'poang', expected: 0 }],
    sourceChecks: [{ description: 'Inget !', pattern: /\)!/, forbidden: true }],
  },
  {
    id: 'saknas-09',
    track: 'saknas',
    title: 'Svara med null',
    xp: 20,
    description:
      'En egen funktion kan också säga "hittade inget". Returtypen visar det för alla som använder den.',
    explain:
      '`indexOf` ger `-1` när den inte hittar något – lätt att glömma att kolla. Med returtypen `number | null` måste den som använder funktionen hantera `null`, annars blir det typfel.',
    example:
      "function pris(vara: string): number | null {\n  if (vara === 'bulle') {\n    return 32;\n  }\n  return null;\n}",
    task: 'Uppgift: Skriv `plats(lista: string[], namn: string): number | null` som ger platsen (börjar på 1) i listan, eller `null` om namnet inte finns.',
    starterCode: '// Skriv din kod här\n',
    solution:
      'function plats(lista: string[], namn: string): number | null {\n  const index = lista.indexOf(namn);\n  if (index === -1) {\n    return null;\n  }\n  return index + 1;\n}\n',
    hints: [
      'indexOf ger -1 när namnet saknas.',
      'Platsen är index + 1.',
      'if (index === -1) { return null; }',
    ],
    tests: [
      {
        description: 'Bo är tvåa',
        code: "plats(['Ada', 'Bo'], 'Bo')",
        expected: 2,
      },
      {
        description: 'Cia finns inte',
        code: "plats(['Ada', 'Bo'], 'Cia')",
        expected: null,
      },
    ],
    typeTests: [
      {
        description: 'Svaret måste kollas innan det används som tal',
        code: "const n: number = plats(['a'], 'a');",
        fails: true,
      },
    ],
  },
];
