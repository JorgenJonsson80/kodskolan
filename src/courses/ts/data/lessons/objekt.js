// Bana 3: arrayer och objekt. Objekttyperna skrivs direkt där de används
// – att det blir upprepning är meningen, för bana 4 (type och interface)
// löser just det.

export const OBJEKT = [
  {
    id: 'objekt-01',
    track: 'objekt',
    title: 'Arrayer med typ',
    xp: 10,
    description:
      'En array där alla element har samma typ skrivs `string[]` eller `number[]`.',
    explain:
      '`number[]` betyder "en array med tal". Då kan bara tal läggas till – `priser.push(\'gratis\')` blir ett typfel.\n\nTypen gäller också det du får ut: `priser[0]` är ett `number`, så du kan räkna med det direkt.',
    example: 'const priser: number[] = [10, 20, 30];\npriser.push(40);',
    task: "Uppgift: Skapa `namn` med typen `string[]` och värdena `'Ada'`, `'Bo'` och `'Cia'`. Lägg sedan till `'Dag'` med `push`.",
    starterCode: '// Skriv din kod här\n',
    solution:
      "const namn: string[] = ['Ada', 'Bo', 'Cia'];\nnamn.push('Dag');\n",
    hints: [
      'Typen är string[].',
      "namn.push('Dag');",
      "const namn: string[] = ['Ada', 'Bo', 'Cia'];",
    ],
    tests: [
      {
        description: 'namn har fyra namn',
        code: 'namn',
        expected: ['Ada', 'Bo', 'Cia', 'Dag'],
      },
    ],
    typeTests: [
      {
        description: 'Ett tal går inte att lägga till',
        code: 'namn.push(5);',
        fails: true,
      },
    ],
    sourceChecks: [
      {
        description: 'namn har typen string[]',
        pattern: /namn\s*:\s*string\[\]/,
      },
    ],
  },
  {
    id: 'objekt-02',
    track: 'objekt',
    title: 'En array som parameter',
    xp: 15,
    description: 'En funktion kan ta en hel array, med typ.',
    explain:
      "Med `tal: number[]` vet TypeScript att varje element är ett tal. Därför vet den också att `reduce` med `+` ger ett tal.\n\nAnropar någon funktionen med `['1', '2']` blir det typfel.",
    example:
      'function langsta(ord: string[]): number {\n  return Math.max(...ord.map(o => o.length));\n}',
    task: 'Uppgift: Skriv `summa(tal: number[]): number` som returnerar summan av talen, t.ex. med `reduce`.',
    starterCode: '// Skriv din kod här\n',
    solution:
      'function summa(tal: number[]): number {\n  return tal.reduce((total, x) => total + x, 0);\n}\n',
    hints: [
      'Parametern har typen number[].',
      'reduce((total, x) => total + x, 0)',
      'return tal.reduce((total, x) => total + x, 0);',
    ],
    tests: [
      {
        description: 'summa([1, 2, 3]) är 6',
        code: 'summa([1, 2, 3])',
        expected: 6,
      },
      { description: 'summa([]) är 0', code: 'summa([])', expected: 0 },
    ],
    typeTests: [
      {
        description: 'Text i arrayen ger typfel',
        code: "summa(['1', '2']);",
        fails: true,
      },
    ],
  },
  {
    id: 'objekt-03',
    track: 'objekt',
    title: 'Fel typ i listan',
    xp: 10,
    description: 'En array med tal har råkat få en text bland talen.',
    explain:
      "I JavaScript hade `[12, '15', 9]` fungerat tills någon räknade ihop dem: `12 + '15'` blir `'1215'`.\n\nTypeScript markerar just det element som är fel.",
    example: 'const alder: number[] = [34, 7, 61];',
    task: 'Uppgift: Laga listan så att alla poäng är tal.',
    starterCode: "const poang: number[] = [12, '15', 9];\n",
    solution: 'const poang: number[] = [12, 15, 9];\n',
    hints: [
      'Läs felet: vilket element är inte ett number?',
      'Tal har inga citattecken.',
      'const poang: number[] = [12, 15, 9];',
    ],
    tests: [
      {
        description: 'poang är [12, 15, 9]',
        code: 'poang',
        expected: [12, 15, 9],
      },
    ],
  },
  {
    id: 'objekt-04',
    track: 'objekt',
    title: 'Objekttyper',
    xp: 15,
    description:
      'Ett objekts typ räknar upp egenskaperna och deras typer, inom `{ }`.',
    explain:
      '`{ namn: string; alder: number }` betyder ett objekt med texten `namn` och talet `alder`. Semikolon eller komma skiljer egenskaperna åt.\n\nTypeScript vet nu exakt vilka egenskaper som finns. Skriver du `kund.adress` blir det typfel, för `adress` finns inte i typen.',
    example:
      "const kund: { namn: string; alder: number } = {\n  namn: 'Ada',\n  alder: 36,\n};",
    task: "Uppgift: Skapa `bok` med typen `{ titel: string; sidor: number }` och värdena `'Mio min Mio'` och `176`.",
    starterCode: '// Skriv din kod här\n',
    solution:
      "const bok: { titel: string; sidor: number } = {\n  titel: 'Mio min Mio',\n  sidor: 176,\n};\n",
    hints: [
      'Typen står efter kolonet, före =.',
      '{ titel: string; sidor: number }',
      "const bok: { titel: string; sidor: number } = { titel: 'Mio min Mio', sidor: 176 };",
    ],
    tests: [
      {
        description: "bok.titel är 'Mio min Mio'",
        code: 'bok.titel',
        expected: 'Mio min Mio',
      },
      { description: 'bok.sidor är 176', code: 'bok.sidor', expected: 176 },
    ],
    typeTests: [
      {
        description: 'bok har ingen författare i typen',
        code: 'bok.forfattare;',
        fails: true,
      },
      {
        description: 'sidor är ett tal',
        code: "bok.sidor = 'många';",
        fails: true,
      },
    ],
    sourceChecks: [
      { description: 'bok har en skriven objekttyp', pattern: /bok\s*:\s*\{/ },
    ],
  },
  {
    id: 'objekt-05',
    track: 'objekt',
    title: 'Objekt som parameter',
    xp: 15,
    description: 'En funktion kan säga exakt hur objektet den får ska se ut.',
    explain:
      'Med en objekttyp på parametern kan funktionen använda egenskaperna utan att gissa. Skriv `bok.` i funktionen så föreslår editorn `titel` och `sidor`.',
    example:
      "function etikett(vara: { namn: string; pris: number }): string {\n  return vara.namn + ': ' + vara.pris + ' kr';\n}",
    task: 'Uppgift: Skriv `beskriv(bok: { titel: string; sidor: number }): string` som returnerar `` `${bok.titel} (${bok.sidor} sidor)` ``.',
    starterCode: '// Skriv din kod här\n',
    solution:
      'function beskriv(bok: { titel: string; sidor: number }): string {\n  return `${bok.titel} (${bok.sidor} sidor)`;\n}\n',
    hints: [
      'Objekttypen står efter bok:',
      'Template literal med ${bok.titel} och ${bok.sidor}.',
      'return `${bok.titel} (${bok.sidor} sidor)`;',
    ],
    tests: [
      {
        description: "beskriv({ titel: 'Mio min Mio', sidor: 176 })",
        code: "beskriv({ titel: 'Mio min Mio', sidor: 176 })",
        expected: 'Mio min Mio (176 sidor)',
      },
    ],
    typeTests: [
      {
        description: 'Ett objekt utan sidor ger typfel',
        code: "beskriv({ titel: 'Ronja' });",
        fails: true,
      },
    ],
  },
  {
    id: 'objekt-06',
    track: 'objekt',
    title: 'Valfria egenskaper',
    xp: 15,
    description:
      'Ett frågetecken gör en egenskap valfri, precis som för parametrar.',
    explain:
      '`{ namn: string; telefon?: string }` betyder att `telefon` kan saknas. Då är `kontakt.telefon` av typen `string | undefined` – text eller ingenting.\n\nFör att använda den måste du hantera att den kan saknas, t.ex. med `??` som ger ett annat värde när den är `undefined`.',
    example:
      "const p: { namn: string; smeknamn?: string } = { namn: 'Robert' };\nconst visas = p.smeknamn ?? p.namn; // 'Robert'",
    task: "Uppgift: Skriv `telefon(p: { namn: string; telefon?: string }): string` som returnerar telefonnumret, eller `'saknas'` om det inte finns.",
    starterCode: '// Skriv din kod här\n',
    solution:
      "function telefon(p: { namn: string; telefon?: string }): string {\n  return p.telefon ?? 'saknas';\n}\n",
    hints: [
      'telefon?: string i typen.',
      "?? ger 'saknas' när telefon är undefined.",
      "return p.telefon ?? 'saknas';",
    ],
    tests: [
      {
        description: 'Med telefon',
        code: "telefon({ namn: 'Ada', telefon: '070-123' })",
        expected: '070-123',
      },
      {
        description: "Utan telefon blir det 'saknas'",
        code: "telefon({ namn: 'Bo' })",
        expected: 'saknas',
      },
    ],
    typeTests: [
      { description: 'telefon kan saknas', code: "telefon({ namn: 'Cia' });" },
    ],
    sourceChecks: [
      {
        description: 'telefon är valfri i typen',
        pattern: /telefon\s*\?\s*:\s*string/,
      },
    ],
  },
  {
    id: 'objekt-07',
    track: 'objekt',
    title: 'Egenskapen som saknas',
    xp: 10,
    description: 'Objektet har inte allt som typen kräver.',
    explain:
      'Typen säger att en film har både `titel` och `ar`. Objektet har bara `titel`, och TypeScript säger vilken egenskap som saknas.\n\nAntingen ska objektet få egenskapen, eller så ska den vara valfri i typen. Här ska objektet lagas.',
    example:
      "const stad: { namn: string; invanare: number } = {\n  namn: 'Umeå',\n  invanare: 130000,\n};",
    task: 'Uppgift: Laga objektet så att filmen *Hajen* får året `1975`.',
    starterCode:
      "const film: { titel: string; ar: number } = {\n  titel: 'Hajen',\n};\n",
    solution:
      "const film: { titel: string; ar: number } = {\n  titel: 'Hajen',\n  ar: 1975,\n};\n",
    hints: [
      'Läs felet: vilken egenskap saknas?',
      'Lägg till ar i objektet.',
      'ar: 1975,',
    ],
    tests: [
      { description: 'film.ar är 1975', code: 'film.ar', expected: 1975 },
    ],
  },
  {
    id: 'objekt-08',
    track: 'objekt',
    title: 'readonly',
    xp: 15,
    description:
      '`readonly` gör en egenskap omöjlig att ändra. Bra för sådant som aldrig ska ändras, som ett id.',
    explain:
      '`{ readonly nummer: string; saldo: number }` betyder att `saldo` kan ändras men aldrig `nummer`.\n\nEn array kan också vara `readonly string[]`. Då finns varken `push` eller `pop`, bara sådant som läser.',
    example:
      "const dagar: readonly string[] = ['mån', 'tis', 'ons'];\n// dagar.push('tor'); ger typfel",
    task: "Uppgift: Skapa `konto` med typen `{ readonly nummer: string; saldo: number }`, nummer `'1234'` och saldo `500`. Ändra sedan saldot till `600`.",
    starterCode: '// Skriv din kod här\n',
    solution:
      "const konto: { readonly nummer: string; saldo: number } = {\n  nummer: '1234',\n  saldo: 500,\n};\nkonto.saldo = 600;\n",
    hints: [
      'readonly står före nummer i typen.',
      'saldo går att ändra: konto.saldo = 600;',
      'const konto: { readonly nummer: string; saldo: number } = { … };',
    ],
    tests: [
      { description: 'saldot är 600', code: 'konto.saldo', expected: 600 },
      {
        description: "numret är '1234'",
        code: 'konto.nummer',
        expected: '1234',
      },
    ],
    typeTests: [
      {
        description: 'Numret går inte att ändra',
        code: "konto.nummer = '9999';",
        fails: true,
      },
      { description: 'Saldot går att ändra', code: 'konto.saldo = 0;' },
    ],
  },
  {
    id: 'objekt-09',
    track: 'objekt',
    title: 'En lista med objekt',
    xp: 20,
    description: 'En array med objekt skrivs som objekttypen följd av `[]`.',
    explain:
      '`{ namn: string; pris: number }[]` är en array där varje element är ett sådant objekt.\n\nI `filter` och `map` vet TypeScript att `v` är ett av objekten, så `v.pris` är ett tal och `v.namn` en text. Svaret från `map(v => v.namn)` blir `string[]`.',
    example:
      "const elever: { namn: string; klass: string }[] = [\n  { namn: 'Ada', klass: '9A' },\n];",
    task: 'Uppgift: Skapa `billiga`: namnen på varorna som kostar under 50 kr, med `filter` och `map`.',
    starterCode:
      "const varor: { namn: string; pris: number }[] = [\n  { namn: 'Bulle', pris: 32 },\n  { namn: 'Smörgås', pris: 65 },\n  { namn: 'Kaffe', pris: 35 },\n];\n",
    solution:
      "const varor: { namn: string; pris: number }[] = [\n  { namn: 'Bulle', pris: 32 },\n  { namn: 'Smörgås', pris: 65 },\n  { namn: 'Kaffe', pris: 35 },\n];\nconst billiga = varor.filter(v => v.pris < 50).map(v => v.namn);\n",
    hints: [
      'Först filter, sedan map.',
      'filter(v => v.pris < 50)',
      'const billiga = varor.filter(v => v.pris < 50).map(v => v.namn);',
    ],
    tests: [
      {
        description: 'billiga är Bulle och Kaffe',
        code: 'billiga',
        expected: ['Bulle', 'Kaffe'],
      },
    ],
    typeTests: [
      {
        description: 'billiga är en string[]',
        code: 'const k: string[] = billiga;',
      },
    ],
  },
];
