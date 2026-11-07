// Bana 9: verktygstyper. Nya typer gjorda av gamla, så att samma sak inte
// skrivs två gånger: Partial, Pick, Omit, Record, keyof och typeof.

const PRODUKT =
  'type Produkt = { id: number; namn: string; pris: number; farg: string };\n';

export const VERKTYG = [
  {
    id: 'verktyg-01',
    track: 'verktyg',
    title: 'Partial – allt valfritt',
    xp: 15,
    description:
      '`Partial<T>` gör varje egenskap i `T` valfri. Perfekt för ändringar, där man bara skickar det som ändras.',
    explain:
      '`Partial<Produkt>` är samma som `Produkt`, men med `?` på allt. Så kan `{ pris: 99 }` vara en ändring utan att resten behöver skickas med.\n\nMed spread blir det en ny produkt: `{ ...produkt, ...andring }` – det i `andring` skriver över.',
    example:
      "type Kund = { namn: string; stad: string };\n\nconst flytt: Partial<Kund> = { stad: 'Umeå' };",
    task: 'Uppgift: Skriv `uppdatera(p: Produkt, andring: Partial<Produkt>): Produkt` som ger en ny produkt med ändringarna.',
    starterCode: PRODUKT,
    solution: `${PRODUKT}\nfunction uppdatera(p: Produkt, andring: Partial<Produkt>): Produkt {\n  return { ...p, ...andring };\n}\n`,
    hints: [
      'Partial<Produkt>',
      'Spread båda objekten.',
      'return { ...p, ...andring };',
    ],
    tests: [
      {
        description: 'Nytt pris',
        code: "uppdatera({ id: 1, namn: 'Mössa', pris: 149, farg: 'röd' }, { pris: 99 })",
        expected: { id: 1, namn: 'Mössa', pris: 99, farg: 'röd' },
      },
    ],
    typeTests: [
      {
        description: 'En ändring kan vara tom',
        code: "uppdatera({ id: 1, namn: 'a', pris: 1, farg: 'b' }, {});",
      },
      {
        description: 'Men inte fel typ',
        code: "uppdatera({ id: 1, namn: 'a', pris: 1, farg: 'b' }, { pris: 'gratis' });",
        fails: true,
      },
    ],
  },
  {
    id: 'verktyg-02',
    track: 'verktyg',
    title: 'Pick – bara några',
    xp: 15,
    description: '`Pick<T, ...>` gör en typ med bara de egenskaper du väljer.',
    explain:
      "`Pick<Produkt, 'namn' | 'pris'>` är `{ namn: string; pris: number }`. Ändras `pris` i `Produkt` följer det med.\n\nNamnen skrivs som en union av texter.",
    example:
      "type Kund = { id: number; namn: string; personnummer: string };\ntype Publik = Pick<Kund, 'namn'>;",
    task: "Uppgift: Skapa `type Etikett = Pick<Produkt, 'namn' | 'pris'>` och `etikett(p: Produkt): Etikett` som bara ger namn och pris.",
    starterCode: PRODUKT,
    solution: `${PRODUKT}\ntype Etikett = Pick<Produkt, 'namn' | 'pris'>;\n\nfunction etikett(p: Produkt): Etikett {\n  return { namn: p.namn, pris: p.pris };\n}\n`,
    hints: [
      "Pick<Produkt, 'namn' | 'pris'>",
      'Returnera ett nytt objekt med två egenskaper.',
      'return { namn: p.namn, pris: p.pris };',
    ],
    tests: [
      {
        description: 'Bara namn och pris',
        code: "etikett({ id: 1, namn: 'Mössa', pris: 149, farg: 'röd' })",
        expected: { namn: 'Mössa', pris: 149 },
      },
    ],
    typeTests: [
      {
        description: 'En Etikett har inget id',
        code: "const e: Etikett = { namn: 'a', pris: 1, id: 2 };",
        fails: true,
      },
    ],
  },
  {
    id: 'verktyg-03',
    track: 'verktyg',
    title: 'Omit – alla utom',
    xp: 15,
    description:
      '`Omit<T, ...>` är motsatsen: alla egenskaper utom de du nämner.',
    explain:
      "En ny produkt har inget `id` än – det får den när den sparas. `Omit<Produkt, 'id'>` är precis det: allt i `Produkt` utom `id`.",
    example:
      "type Inlagg = { id: number; text: string };\ntype NyttInlagg = Omit<Inlagg, 'id'>;",
    task: "Uppgift: Skapa `type NyProdukt = Omit<Produkt, 'id'>` och `spara(ny: NyProdukt, id: number): Produkt`.",
    starterCode: PRODUKT,
    solution: `${PRODUKT}\ntype NyProdukt = Omit<Produkt, 'id'>;\n\nfunction spara(ny: NyProdukt, id: number): Produkt {\n  return { ...ny, id };\n}\n`,
    hints: [
      "Omit<Produkt, 'id'>",
      'Lägg till id med spread.',
      'return { ...ny, id };',
    ],
    tests: [
      {
        description: 'Får id 7',
        code: "spara({ namn: 'Keps', pris: 99, farg: 'blå' }, 7)",
        expected: { namn: 'Keps', pris: 99, farg: 'blå', id: 7 },
      },
    ],
    typeTests: [
      {
        description: 'En NyProdukt har inget id',
        code: "const n: NyProdukt = { namn: 'a', pris: 1, farg: 'b', id: 1 };",
        fails: true,
      },
      {
        description: 'Men allt annat',
        code: "const n: NyProdukt = { namn: 'a', pris: 1 };",
        fails: true,
      },
    ],
  },
  {
    id: 'verktyg-04',
    track: 'verktyg',
    title: 'Record – en tabell',
    xp: 15,
    description:
      '`Record<K, V>` är ett objekt där varje nyckel av typen `K` har ett värde av typen `V`.',
    explain:
      "`Record<Storlek, number>` med `type Storlek = 'liten' | 'mellan' | 'stor'` kräver att **alla tre** storlekar finns. Glömmer du en säger TypeScript till.\n\nMed `Record<string, number>` får nycklarna vara vilken text som helst.",
    example:
      "type Dag = 'lör' | 'sön';\nconst oppet: Record<Dag, string> = { lör: '10–16', sön: 'stängt' };",
    task: 'Uppgift: Skapa `priser: Record<Storlek, number>`: liten 25, mellan 35 och stor 45. Skriv sedan `pris(s: Storlek): number`.',
    starterCode: "type Storlek = 'liten' | 'mellan' | 'stor';\n",
    solution:
      "type Storlek = 'liten' | 'mellan' | 'stor';\n\nconst priser: Record<Storlek, number> = { liten: 25, mellan: 35, stor: 45 };\n\nfunction pris(s: Storlek): number {\n  return priser[s];\n}\n",
    hints: [
      'Record<Storlek, number>',
      '{ liten: 25, mellan: 35, stor: 45 }',
      'return priser[s];',
    ],
    tests: [
      { description: 'pris(stor) är 45', code: "pris('stor')", expected: 45 },
    ],
    typeTests: [
      {
        description: 'Alla storlekar måste finnas',
        code: 'const p: Record<Storlek, number> = { liten: 1, mellan: 2 };',
        fails: true,
      },
    ],
  },
  {
    id: 'verktyg-05',
    track: 'verktyg',
    title: 'keyof',
    xp: 15,
    description:
      '`keyof T` är namnen på egenskaperna i `T`, som en union av texter.',
    explain:
      "`keyof Produkt` är `'id' | 'namn' | 'pris' | 'farg'`. En parameter med den typen kan bara vara ett riktigt egenskapsnamn – ett stavfel blir typfel.\n\nOch `p[falt]` fungerar, för TypeScript vet att `falt` finns i `p`.",
    example:
      "type Punkt = { x: number; y: number };\ntype Axel = keyof Punkt; // 'x' | 'y'",
    task: 'Uppgift: Skriv `varde(p: Produkt, falt: keyof Produkt): string | number` som ger värdet för fältet.',
    starterCode: PRODUKT,
    solution: `${PRODUKT}\nfunction varde(p: Produkt, falt: keyof Produkt): string | number {\n  return p[falt];\n}\n`,
    hints: ['falt: keyof Produkt', 'p[falt]', 'return p[falt];'],
    tests: [
      {
        description: 'pris',
        code: "varde({ id: 1, namn: 'Mössa', pris: 149, farg: 'röd' }, 'pris')",
        expected: 149,
      },
      {
        description: 'farg',
        code: "varde({ id: 1, namn: 'Mössa', pris: 149, farg: 'röd' }, 'farg')",
        expected: 'röd',
      },
    ],
    typeTests: [
      {
        description: "'storlek' finns inte",
        code: "varde({ id: 1, namn: 'a', pris: 1, farg: 'b' }, 'storlek');",
        fails: true,
      },
    ],
  },
  {
    id: 'verktyg-06',
    track: 'verktyg',
    title: 'typeof i en typ',
    xp: 15,
    description:
      '`typeof` i en typ tar typen från ett värde. Då behöver du inte skriva den själv.',
    explain:
      "`const standard = { tema: 'ljust', storlek: 16 }` – TypeScript vet redan typen. `type Installningar = typeof standard` ger den ett namn.\n\nÄndrar du `standard` ändras typen automatiskt.",
    example: 'const start = { x: 0, y: 0 };\ntype Punkt = typeof start;',
    task: 'Uppgift: Skapa `type Installningar = typeof standard` och `med(andring: Partial<Installningar>): Installningar` som ger standard med ändringarna.',
    starterCode:
      "const standard = { tema: 'ljust', storlek: 16, ljud: true };\n",
    solution:
      "const standard = { tema: 'ljust', storlek: 16, ljud: true };\n\ntype Installningar = typeof standard;\n\nfunction med(andring: Partial<Installningar>): Installningar {\n  return { ...standard, ...andring };\n}\n",
    hints: [
      'type Installningar = typeof standard;',
      'Partial<Installningar> för ändringen.',
      'return { ...standard, ...andring };',
    ],
    tests: [
      {
        description: 'Ljud av',
        code: 'med({ ljud: false })',
        expected: { tema: 'ljust', storlek: 16, ljud: false },
      },
    ],
    typeTests: [
      {
        description: 'storlek är ett tal',
        code: "med({ storlek: 'stor' });",
        fails: true,
      },
    ],
    sourceChecks: [
      {
        description: 'Använder typeof standard',
        pattern: /=\s*typeof\s+standard/,
      },
    ],
  },
  {
    id: 'verktyg-07',
    track: 'verktyg',
    title: 'Readonly och Required',
    xp: 15,
    description:
      '`Readonly<T>` gör allt omöjligt att ändra, och `Required<T>` gör allt valfritt obligatoriskt.',
    explain:
      'En funktion som tar `Readonly<Produkt>` lovar att inte ändra produkten. Försöker den blir det typfel.\n\n`Required<T>` är motsatsen till `Partial<T>`: alla `?` tas bort.',
    example:
      "function visa(k: Readonly<Kund>) {\n  // k.namn = 'x'; ger typfel\n}",
    task: 'Uppgift: Skriv `rea(p: Readonly<Produkt>): Produkt` som ger en **ny** produkt med 20 % lägre pris (avrundat med `Math.round`).',
    starterCode: PRODUKT,
    solution: `${PRODUKT}\nfunction rea(p: Readonly<Produkt>): Produkt {\n  return { ...p, pris: Math.round(p.pris * 0.8) };\n}\n`,
    hints: [
      'p: Readonly<Produkt>',
      'p.pris = … går inte – gör ett nytt objekt.',
      'return { ...p, pris: Math.round(p.pris * 0.8) };',
    ],
    tests: [
      {
        description: '149 blir 119',
        code: "rea({ id: 1, namn: 'Mössa', pris: 149, farg: 'röd' }).pris",
        expected: 119,
      },
    ],
    typeTests: [
      {
        description: 'Readonly går inte att ändra',
        code: '(p: Readonly<Produkt>) => { p.pris = 2; };',
        fails: true,
      },
    ],
    sourceChecks: [
      {
        description: 'Parametern är Readonly',
        pattern: /Readonly\s*<\s*Produkt\s*>/,
      },
    ],
  },
  {
    id: 'verktyg-08',
    track: 'verktyg',
    title: 'ReturnType',
    xp: 20,
    description:
      '`ReturnType<typeof f>` är typen funktionen `f` returnerar. Bra när funktionen redan finns och typen inte gör det.',
    explain:
      '`skapaKund` returnerar ett objekt som TypeScript redan vet typen på. `ReturnType<typeof skapaKund>` ger den typen ett namn, utan att du skriver den.\n\n`typeof skapaKund` är funktionens typ, och `ReturnType` plockar ut vad den ger.',
    example:
      'function nu() {\n  return { timme: 12, minut: 30 };\n}\ntype Tid = ReturnType<typeof nu>;',
    task: 'Uppgift: Skapa `type Kund = ReturnType<typeof skapaKund>` och `bonus(k: Kund, poang: number): Kund` som ger en ny kund med fler poäng.',
    starterCode:
      "function skapaKund(namn: string) {\n  return { namn, skapad: '2026-06-15', poang: 0 };\n}\n",
    solution:
      "function skapaKund(namn: string) {\n  return { namn, skapad: '2026-06-15', poang: 0 };\n}\n\ntype Kund = ReturnType<typeof skapaKund>;\n\nfunction bonus(k: Kund, poang: number): Kund {\n  return { ...k, poang: k.poang + poang };\n}\n",
    hints: [
      'type Kund = ReturnType<typeof skapaKund>;',
      '{ ...k, poang: … }',
      'return { ...k, poang: k.poang + poang };',
    ],
    tests: [
      {
        description: 'Ada får 10 poäng',
        code: "bonus(skapaKund('Ada'), 10).poang",
        expected: 10,
      },
    ],
    typeTests: [
      {
        description: 'En Kund har skapad',
        code: "const k: Kund = { namn: 'a', poang: 1 };",
        fails: true,
      },
    ],
  },
  {
    id: 'verktyg-09',
    track: 'verktyg',
    title: 'keyof med generics',
    xp: 20,
    description:
      'Med `K extends keyof T` kan en funktion plocka en egenskap ur vilket objekt som helst – och veta exakt vilken typ den har.',
    explain:
      "`T[K]` betyder \"typen på egenskapen `K` i `T`\". `plocka(kund, 'namn')` ger en `string`, `plocka(kund, 'alder')` ett `number`.\n\nDet här är hur många bibliotek är skrivna inuti. Du behöver sällan skriva det själv, men det är bra att kunna läsa.",
    example:
      'function satt<T, K extends keyof T>(obj: T, k: K, v: T[K]): T {\n  return { ...obj, [k]: v };\n}',
    task: 'Uppgift: Skriv `plocka<T, K extends keyof T>(obj: T, nyckel: K): T[K]`.',
    starterCode: '// Skriv din kod här\n',
    solution:
      'function plocka<T, K extends keyof T>(obj: T, nyckel: K): T[K] {\n  return obj[nyckel];\n}\n',
    hints: [
      '<T, K extends keyof T>',
      'Returtypen är T[K].',
      'return obj[nyckel];',
    ],
    tests: [
      {
        description: 'namn',
        code: "plocka({ namn: 'Ada', alder: 36 }, 'namn')",
        expected: 'Ada',
      },
    ],
    typeTests: [
      {
        description: 'alder blir ett tal',
        code: "const n: number = plocka({ namn: 'Ada', alder: 36 }, 'alder');",
      },
      {
        description: 'namn blir inget tal',
        code: "const n: number = plocka({ namn: 'Ada', alder: 36 }, 'namn');",
        fails: true,
      },
      {
        description: 'En nyckel som inte finns',
        code: "plocka({ namn: 'Ada' }, 'x');",
        fails: true,
      },
    ],
  },
];
