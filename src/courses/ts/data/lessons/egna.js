// Bana 4: egna typer. Efter bana 3, där samma objekttyp skrevs om och om
// igen, får typen ett namn med type eller interface.

export const EGNA = [
  {
    id: 'egna-01',
    track: 'egna',
    title: 'Ge typen ett namn',
    xp: 10,
    description:
      'Tröttnat på att skriva `{ titel: string; sidor: number }` överallt? Ge typen ett namn med `type`.',
    explain:
      '`type Bok = { titel: string; sidor: number };` skapar typen `Bok`. Sedan räcker det att skriva `Bok` där typen behövs.\n\nNamnet börjar med stor bokstav, så att man ser att det är en typ. Som alla typer försvinner den när koden körs.',
    example:
      "type Stad = { namn: string; invanare: number };\n\nconst umea: Stad = { namn: 'Umeå', invanare: 130000 };",
    task: "Uppgift: Skapa typen `Bok` med `titel` (`string`) och `sidor` (`number`). Skapa sedan `bok` av typen `Bok`: `'Ronja Rövardotter'`, `240` sidor.",
    starterCode: '// Skriv din kod här\n',
    solution:
      "type Bok = { titel: string; sidor: number };\n\nconst bok: Bok = { titel: 'Ronja Rövardotter', sidor: 240 };\n",
    hints: [
      'type Bok = { … };',
      'Sedan const bok: Bok = { … };',
      'type Bok = { titel: string; sidor: number };',
    ],
    tests: [
      { description: 'bok.sidor är 240', code: 'bok.sidor', expected: 240 },
    ],
    typeTests: [
      {
        description: 'Typen Bok finns',
        code: "const b: Bok = { titel: 'X', sidor: 1 };",
      },
      {
        description: 'En Bok måste ha sidor',
        code: "const b: Bok = { titel: 'X' };",
        fails: true,
      },
    ],
    sourceChecks: [
      { description: 'bok har typen Bok', pattern: /bok\s*:\s*Bok\b/ },
    ],
  },
  {
    id: 'egna-02',
    track: 'egna',
    title: 'Typen överallt',
    xp: 15,
    description:
      'Med ett namn kan samma typ användas för parametrar, listor och svar.',
    explain:
      'När `Bok` finns kan du skriva `Bok[]` för en lista med böcker och `(bok: Bok)` för en parameter.\n\nÄndras typen – säg att en bok också får ett `ar` – ändrar du på ett enda ställe, och TypeScript visar var resten av koden behöver hänga med.',
    example:
      'type Vara = { namn: string; pris: number };\n\nfunction dyr(vara: Vara): boolean {\n  return vara.pris > 100;\n}',
    task: 'Uppgift: Skriv `tjockast(bocker: Bok[]): string` som returnerar titeln på boken med flest sidor.',
    starterCode:
      "type Bok = { titel: string; sidor: number };\n\nconst hylla: Bok[] = [\n  { titel: 'Mio min Mio', sidor: 176 },\n  { titel: 'Ronja Rövardotter', sidor: 240 },\n  { titel: 'Pippi', sidor: 160 },\n];\n",
    solution:
      "type Bok = { titel: string; sidor: number };\n\nconst hylla: Bok[] = [\n  { titel: 'Mio min Mio', sidor: 176 },\n  { titel: 'Ronja Rövardotter', sidor: 240 },\n  { titel: 'Pippi', sidor: 160 },\n];\n\nfunction tjockast(bocker: Bok[]): string {\n  let basta = bocker[0];\n  for (const bok of bocker) {\n    if (bok.sidor > basta.sidor) {\n      basta = bok;\n    }\n  }\n  return basta.titel;\n}\n",
    hints: [
      'Börja med den första boken som bästa hittills.',
      'Gå igenom alla och byt när en bok har fler sidor.',
      'return basta.titel;',
    ],
    tests: [
      {
        description: 'tjockast(hylla) är Ronja',
        code: 'tjockast(hylla)',
        expected: 'Ronja Rövardotter',
      },
    ],
    typeTests: [
      {
        description: 'tjockast ger text',
        code: 'const k: string = tjockast(hylla);',
      },
    ],
    sourceChecks: [
      {
        description: 'Parametern har typen Bok[]',
        pattern: /bocker\s*:\s*Bok\[\]/,
      },
    ],
  },
  {
    id: 'egna-03',
    track: 'egna',
    title: 'Namn som berättar',
    xp: 10,
    description:
      'En typ kan också vara ett nytt namn på en enkel typ, som `type Kronor = number`.',
    explain:
      '`type Kronor = number` gör ingen ny sorts tal – `Kronor` är fortfarande ett `number`. Men koden blir lättare att läsa: `(pris: Kronor, procent: Procent)` säger mer än två `number`.',
    example: 'type Meter = number;\n\nconst langd: Meter = 1.8;',
    task: 'Uppgift: Skapa typerna `Kronor` och `Procent` (båda `number`). Skriv `rabatt(pris: Kronor, procent: Procent): Kronor` som ger priset efter rabatten, t.ex. `rabatt(200, 25)` är `150`.',
    starterCode: '// Skriv din kod här\n',
    solution:
      'type Kronor = number;\ntype Procent = number;\n\nfunction rabatt(pris: Kronor, procent: Procent): Kronor {\n  return pris * (1 - procent / 100);\n}\n',
    hints: [
      'type Kronor = number;',
      'procent / 100 gör 25 till 0.25.',
      'return pris * (1 - procent / 100);',
    ],
    tests: [
      {
        description: 'rabatt(200, 25) är 150',
        code: 'rabatt(200, 25)',
        expected: 150,
      },
      {
        description: 'rabatt(80, 50) är 40',
        code: 'rabatt(80, 50)',
        expected: 40,
      },
    ],
    typeTests: [
      { description: 'Kronor är ett tal', code: 'const k: Kronor = 5;' },
      {
        description: 'Procent är ett tal',
        code: "const p: Procent = 'tio';",
        fails: true,
      },
    ],
  },
  {
    id: 'egna-04',
    track: 'egna',
    title: 'interface',
    xp: 15,
    description:
      'Ett objekts typ kan också skrivas som ett `interface`. Det ser nästan likadant ut.',
    explain:
      '`interface Kund { namn: string; medlem: boolean }` betyder samma sak som `type Kund = { namn: string; medlem: boolean }`.\n\nI de flesta fall går det lika bra med båda. Många använder `interface` för objekt och `type` för allt annat. Inget likhetstecken efter namnet när det är ett interface.',
    example: 'interface Hund {\n  namn: string;\n  alder: number;\n}',
    task: "Uppgift: Skapa `interface Kund` med `namn` (`string`) och `medlem` (`boolean`). Skriv `halsa(kund: Kund): string` som ger `'Välkommen tillbaka, Ada!'` för en medlem som heter Ada och `'Hej Ada!'` annars.",
    starterCode: '// Skriv din kod här\n',
    solution:
      'interface Kund {\n  namn: string;\n  medlem: boolean;\n}\n\nfunction halsa(kund: Kund): string {\n  if (kund.medlem) {\n    return `Välkommen tillbaka, ${kund.namn}!`;\n  }\n  return `Hej ${kund.namn}!`;\n}\n',
    hints: [
      'interface Kund { … } – utan =.',
      'if (kund.medlem) { … }',
      'return `Välkommen tillbaka, ${kund.namn}!`;',
    ],
    tests: [
      {
        description: 'En medlem',
        code: "halsa({ namn: 'Ada', medlem: true })",
        expected: 'Välkommen tillbaka, Ada!',
      },
      {
        description: 'Inte medlem',
        code: "halsa({ namn: 'Bo', medlem: false })",
        expected: 'Hej Bo!',
      },
    ],
    typeTests: [
      {
        description: 'Kund kräver medlem',
        code: "halsa({ namn: 'Cia' });",
        fails: true,
      },
    ],
    sourceChecks: [
      { description: 'Kund är ett interface', pattern: /interface\s+Kund/ },
    ],
  },
  {
    id: 'egna-05',
    track: 'egna',
    title: 'Egenskapen som inte finns',
    xp: 10,
    description:
      'TypeScript säger till om ett objekt har en egenskap som typen inte känner till. Oftast är det ett stavfel.',
    explain:
      'Om typen säger `namn` men objektet säger `namm`, betyder det två fel: `namn` saknas och `namm` är okänd.\n\nTypeScript säger "Object literal may only specify known properties". I vanlig JavaScript hade `kund.namn` blivit `undefined` långt senare.',
    example:
      "interface Stad {\n  namn: string;\n}\n\nconst lund: Stad = { namn: 'Lund' };",
    task: 'Uppgift: Laga stavfelet så att kunden har ett namn.',
    starterCode:
      "interface Kund {\n  namn: string;\n  medlem: boolean;\n}\n\nconst kund: Kund = { namm: 'Ada', medlem: true };\n",
    solution:
      "interface Kund {\n  namn: string;\n  medlem: boolean;\n}\n\nconst kund: Kund = { namn: 'Ada', medlem: true };\n",
    hints: [
      'Läs felet: vilken egenskap känner typen inte till?',
      'Jämför stavningen med interfacet.',
      "{ namn: 'Ada', medlem: true }",
    ],
    tests: [
      { description: "kund.namn är 'Ada'", code: 'kund.namn', expected: 'Ada' },
    ],
  },
  {
    id: 'egna-06',
    track: 'egna',
    title: 'extends',
    xp: 15,
    description:
      'Ett interface kan bygga vidare på ett annat med `extends`. Då får det allt det andra har, plus sitt eget.',
    explain:
      '`interface Hund extends Djur { ras: string }` betyder: en hund har allt ett djur har, och dessutom `ras`.\n\nEn `Hund` kan användas överallt där ett `Djur` behövs, eftersom den har allt ett djur har.',
    example:
      'interface Fordon {\n  hjul: number;\n}\n\ninterface Cykel extends Fordon {\n  vaxlar: number;\n}',
    task: "Uppgift: Skapa `interface Djur` med `namn` (`string`) och `interface Hund extends Djur` med `ras` (`string`). Skapa `hund` av typen `Hund`: Saga, `'tax'`.",
    starterCode: '// Skriv din kod här\n',
    solution:
      "interface Djur {\n  namn: string;\n}\n\ninterface Hund extends Djur {\n  ras: string;\n}\n\nconst hund: Hund = { namn: 'Saga', ras: 'tax' };\n",
    hints: [
      'Först Djur, sedan Hund extends Djur.',
      'Hund behöver bara skriva ras – namn kommer från Djur.',
      "const hund: Hund = { namn: 'Saga', ras: 'tax' };",
    ],
    tests: [
      { description: 'hund.namn är Saga', code: 'hund.namn', expected: 'Saga' },
      { description: 'hund.ras är tax', code: 'hund.ras', expected: 'tax' },
    ],
    typeTests: [
      { description: 'En Hund är ett Djur', code: 'const d: Djur = hund;' },
      {
        description: 'En Hund måste ha ras',
        code: "const h: Hund = { namn: 'Bamse' };",
        fails: true,
      },
    ],
    sourceChecks: [
      {
        description: 'Hund bygger på Djur',
        pattern: /interface\s+Hund\s+extends\s+Djur/,
      },
    ],
  },
  {
    id: 'egna-07',
    track: 'egna',
    title: 'Sätt ihop typer med &',
    xp: 15,
    description: 'Med `&` sätts två typer ihop till en som har allt från båda.',
    explain:
      '`type Produkt = MedId & { namn: string }` betyder ett objekt som har allt i `MedId` **och** ett `namn`.\n\nDet är `type`-varianten av `extends`. Bra när samma del, som ett `id`, ska finnas i många typer.',
    example:
      'type MedDatum = { skapad: string };\ntype Inlagg = MedDatum & { text: string };',
    task: "Uppgift: Skapa `type MedId = { id: number }` och `type Produkt = MedId & { namn: string; pris: number }`. Skapa `kaffe` av typen `Produkt`: id `1`, `'Bryggkaffe'`, `35`.",
    starterCode: '// Skriv din kod här\n',
    solution:
      "type MedId = { id: number };\ntype Produkt = MedId & { namn: string; pris: number };\n\nconst kaffe: Produkt = { id: 1, namn: 'Bryggkaffe', pris: 35 };\n",
    hints: [
      'Två type-rader.',
      'MedId & { namn: string; pris: number }',
      "const kaffe: Produkt = { id: 1, namn: 'Bryggkaffe', pris: 35 };",
    ],
    tests: [{ description: 'kaffe.id är 1', code: 'kaffe.id', expected: 1 }],
    typeTests: [
      { description: 'En Produkt har ett id', code: 'const m: MedId = kaffe;' },
      {
        description: 'En Produkt utan id ger typfel',
        code: "const p: Produkt = { namn: 'Te', pris: 30 };",
        fails: true,
      },
    ],
    sourceChecks: [
      { description: 'Produkt använder &', pattern: /Produkt\s*=\s*MedId\s*&/ },
    ],
  },
  {
    id: 'egna-08',
    track: 'egna',
    title: 'Typer i typer',
    xp: 15,
    description:
      'En egenskap kan ha en egen typ. Så byggs större typer av små.',
    explain:
      'En person har en adress, och en adress har gata och stad. Med `type Adress` och `adress: Adress` i `Person` blir båda läsbara.\n\nSkriv `p.adress.` i editorn – förslagen vet att det finns en `gata` och en `stad`.',
    example:
      'type Position = { x: number; y: number };\ntype Spelare = { namn: string; position: Position };',
    task: 'Uppgift: Skapa `type Adress` (`gata`, `stad`, båda `string`) och `type Person` (`namn: string`, `adress: Adress`). Skriv `stad(p: Person): string` som ger personens stad.',
    starterCode: '// Skriv din kod här\n',
    solution:
      'type Adress = { gata: string; stad: string };\ntype Person = { namn: string; adress: Adress };\n\nfunction stad(p: Person): string {\n  return p.adress.stad;\n}\n',
    hints: [
      'Adress först, sedan Person.',
      'adress: Adress inne i Person.',
      'return p.adress.stad;',
    ],
    tests: [
      {
        description: 'stad ger Lund',
        code: "stad({ namn: 'Ada', adress: { gata: 'Storgatan 1', stad: 'Lund' } })",
        expected: 'Lund',
      },
    ],
    typeTests: [
      {
        description: 'En adress måste ha stad',
        code: "stad({ namn: 'Bo', adress: { gata: 'Ån' } });",
        fails: true,
      },
    ],
  },
  {
    id: 'egna-09',
    track: 'egna',
    title: 'En typ för funktioner',
    xp: 20,
    description: 'Också en funktions typ kan få ett namn.',
    explain:
      '`type Regel = (pris: number) => number` är typen för alla funktioner som tar ett pris och ger ett nytt.\n\n`const halvPris: Regel = p => p / 2` behöver ingen typ på `p` – den kommer från `Regel`.',
    example:
      "type Halsning = (namn: string) => string;\n\nconst formell: Halsning = namn => 'Goddag ' + namn;",
    task: 'Uppgift: Skapa `type Regel = (pris: number) => number`. Skapa `halvPris: Regel` (halva priset) och `minus10: Regel` (10 kr mindre). Skriv `tillampa(pris: number, regel: Regel): number`.',
    starterCode: '// Skriv din kod här\n',
    solution:
      'type Regel = (pris: number) => number;\n\nconst halvPris: Regel = p => p / 2;\nconst minus10: Regel = p => p - 10;\n\nfunction tillampa(pris: number, regel: Regel): number {\n  return regel(pris);\n}\n',
    hints: [
      'type Regel = (pris: number) => number;',
      'const halvPris: Regel = p => p / 2;',
      'return regel(pris);',
    ],
    tests: [
      {
        description: 'tillampa(100, halvPris) är 50',
        code: 'tillampa(100, halvPris)',
        expected: 50,
      },
      {
        description: 'tillampa(100, minus10) är 90',
        code: 'tillampa(100, minus10)',
        expected: 90,
      },
    ],
    typeTests: [
      {
        description: 'En regel måste ge ett tal',
        code: "const r: Regel = p => 'billigt';",
        fails: true,
      },
    ],
  },
];
