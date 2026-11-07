// Bana 8: generics. En typparameter <T> låter en funktion fungera för alla
// typer och ändå komma ihåg exakt vilken typ den fick.

export const GENERICS = [
  {
    id: 'generics-01',
    track: 'generics',
    title: 'En funktion för alla typer',
    xp: 15,
    description:
      'Att ta sista elementet fungerar likadant för tal, text och objekt. Med `<T>` skriver du funktionen en gång.',
    explain:
      "`function forsta<T>(lista: T[]): T | undefined` betyder: för vilken typ `T` som helst tar funktionen en lista med `T` och ger ett `T` (eller `undefined` för en tom lista).\n\nAnropar du `forsta(['a', 'b'])` blir `T` en `string`, och svaret en `string | undefined`. Med `any` hade TypeScript glömt typen – med `T` kommer den ihåg.",
    example:
      'function forsta<T>(lista: T[]): T | undefined {\n  return lista[0];\n}\n\nconst f = forsta([10, 20]); // number | undefined',
    task: 'Uppgift: Skriv `sista<T>(lista: T[]): T | undefined` som ger sista elementet.',
    starterCode: '// Skriv din kod här\n',
    solution:
      'function sista<T>(lista: T[]): T | undefined {\n  return lista[lista.length - 1];\n}\n',
    hints: [
      '<T> efter funktionens namn.',
      'lista[lista.length - 1]',
      'function sista<T>(lista: T[]): T | undefined {',
    ],
    tests: [
      {
        description: 'sista([1, 2, 3]) är 3',
        code: 'sista([1, 2, 3])',
        expected: 3,
      },
      {
        description: "sista(['a']) är 'a'",
        code: "sista(['a'])",
        expected: 'a',
      },
    ],
    typeTests: [
      {
        description: 'Med text blir svaret text',
        code: "const s: string | undefined = sista(['a']);",
      },
      {
        description: 'Med text blir svaret inget tal',
        code: "const n: number | undefined = sista(['a']);",
        fails: true,
      },
    ],
    sourceChecks: [
      { description: 'Har en typparameter', pattern: /sista\s*<\s*T\s*>/ },
    ],
  },
  {
    id: 'generics-02',
    track: 'generics',
    title: 'Samma T två gånger',
    xp: 15,
    description: 'Står `T` på två ställen måste det vara samma typ på båda.',
    explain:
      "`function par<T>(a: T, b: T): T[]` kräver att `a` och `b` har samma typ. `par(1, 2)` ger en `number[]`, men `par(1, 'två')` blir typfel.\n\n`T[]` kan också skrivas `Array<T>`. Det betyder samma sak.",
    example: 'function lika<T>(a: T, b: T): boolean {\n  return a === b;\n}',
    task: 'Uppgift: Skriv `par<T>(a: T, b: T): T[]` som ger en lista med båda.',
    starterCode: '// Skriv din kod här\n',
    solution: 'function par<T>(a: T, b: T): T[] {\n  return [a, b];\n}\n',
    hints: [
      'Båda parametrarna har typen T.',
      'return [a, b];',
      'function par<T>(a: T, b: T): T[] {',
    ],
    tests: [{ description: 'par(1, 2)', code: 'par(1, 2)', expected: [1, 2] }],
    typeTests: [
      {
        description: 'Två texter ger string[]',
        code: "const s: string[] = par('a', 'b');",
      },
      {
        description: 'Ett tal och en text går inte',
        code: "par(1, 'två');",
        fails: true,
      },
    ],
  },
  {
    id: 'generics-03',
    track: 'generics',
    title: 'Säg vilken T',
    xp: 15,
    description:
      'Ibland kan TypeScript inte gissa `T`. Då skriver du den själv inom `< >` när du anropar.',
    explain:
      'En funktion som skapar en tom lista har inget att gissa från. `tomLista()` hade gett en lista av `unknown`.\n\n`tomLista<string>()` säger att `T` är `string`. Då blir svaret en `string[]`, och bara text kan läggas till.',
    example: 'const tal = new Array<number>();',
    task: "Uppgift: Skriv `tomLista<T>(): T[]` som ger `[]`. Skapa sedan `namn` med `tomLista<string>()` och lägg till `'Ada'`.",
    starterCode: '// Skriv din kod här\n',
    solution:
      "function tomLista<T>(): T[] {\n  return [];\n}\n\nconst namn = tomLista<string>();\nnamn.push('Ada');\n",
    hints: [
      'function tomLista<T>(): T[] { return []; }',
      'tomLista<string>()',
      "namn.push('Ada');",
    ],
    tests: [{ description: 'namn är [Ada]', code: 'namn', expected: ['Ada'] }],
    typeTests: [
      { description: 'namn är en string[]', code: 'const k: string[] = namn;' },
      {
        description: 'Ett tal går inte att lägga till',
        code: 'namn.push(1);',
        fails: true,
      },
    ],
    sourceChecks: [
      {
        description: 'Anropet säger <string>',
        pattern: /tomLista\s*<\s*string\s*>\s*\(/,
      },
    ],
  },
  {
    id: 'generics-04',
    track: 'generics',
    title: 'Två typparametrar',
    xp: 15,
    description: 'En funktion kan ha flera typparametrar, med komma emellan.',
    explain:
      '`function ihop<A, B>(a: A, b: B)` har två typer som kan vara olika. TypeScript håller reda på båda.\n\nNamnen kan vara vad som helst. `T` är vanligast för en, och `K` och `V` för nyckel och värde.',
    example:
      'function etikett<V>(namn: string, varde: V): { namn: string; varde: V } {\n  return { namn, varde };\n}',
    task: 'Uppgift: Skriv `ihop<A, B>(a: A, b: B): { forsta: A; andra: B }`.',
    starterCode: '// Skriv din kod här\n',
    solution:
      'function ihop<A, B>(a: A, b: B): { forsta: A; andra: B } {\n  return { forsta: a, andra: b };\n}\n',
    hints: [
      '<A, B> efter namnet.',
      'Returtypen är ett objekt med forsta och andra.',
      'return { forsta: a, andra: b };',
    ],
    tests: [
      {
        description: "ihop('Ada', 36)",
        code: "ihop('Ada', 36)",
        expected: { forsta: 'Ada', andra: 36 },
      },
    ],
    typeTests: [
      {
        description: 'andra är ett tal',
        code: "const n: number = ihop('a', 1).andra;",
      },
      {
        description: 'forsta är ingen boolean',
        code: "const b: boolean = ihop('a', 1).forsta;",
        fails: true,
      },
    ],
  },
  {
    id: 'generics-05',
    track: 'generics',
    title: 'Typer med <T>',
    xp: 15,
    description: 'En egen typ kan också ha en typparameter.',
    explain:
      '`type Lista<T> = { titel: string; saker: T[] }` är en mall. `Lista<string>` är en lista med text, `Lista<number>` en med tal.\n\nDu har redan sett sådana typer: `Array<T>` och `Promise<T>` fungerar likadant.',
    example:
      "type Lada<T> = { etikett: string; innehall: T };\n\nconst skor: Lada<number> = { etikett: 'Storlek', innehall: 42 };",
    task: "Uppgift: Skapa `type Lista<T> = { titel: string; saker: T[] }`. Skapa `inkop: Lista<string>` (titel `'Handla'`, saker mjölk och bröd) och `poang: Lista<number>` (titel `'Poäng'`, saker 3 och 5).",
    starterCode: '// Skriv din kod här\n',
    solution:
      "type Lista<T> = { titel: string; saker: T[] };\n\nconst inkop: Lista<string> = { titel: 'Handla', saker: ['mjölk', 'bröd'] };\nconst poang: Lista<number> = { titel: 'Poäng', saker: [3, 5] };\n",
    hints: [
      'type Lista<T> = { … };',
      'saker: T[]',
      "const inkop: Lista<string> = { titel: 'Handla', saker: ['mjölk', 'bröd'] };",
    ],
    tests: [
      {
        description: 'inkop har två saker',
        code: 'inkop.saker.length',
        expected: 2,
      },
      { description: 'poang.saker', code: 'poang.saker', expected: [3, 5] },
    ],
    typeTests: [
      {
        description: 'En Lista<number> har bara tal',
        code: "const l: Lista<number> = { titel: 'x', saker: ['a'] };",
        fails: true,
      },
    ],
  },
  {
    id: 'generics-06',
    track: 'generics',
    title: 'Krav på T',
    xp: 20,
    description:
      'Med `extends` ställer du krav på `T`: den får vara vad som helst, så länge den har det funktionen behöver.',
    explain:
      '`T extends { length: number }` betyder: `T` måste ha en `length`. Text och arrayer har det, tal har det inte.\n\nUtan kravet hade `a.length` blivit ett typfel, för TypeScript kan inte veta att varje `T` har en längd.',
    example:
      'function antal<T extends { length: number }>(x: T): number {\n  return x.length;\n}',
    task: 'Uppgift: Skriv `langst<T extends { length: number }>(a: T, b: T): T` som ger den längsta (den första om de är lika långa).',
    starterCode: '// Skriv din kod här\n',
    solution:
      'function langst<T extends { length: number }>(a: T, b: T): T {\n  if (b.length > a.length) {\n    return b;\n  }\n  return a;\n}\n',
    hints: [
      '<T extends { length: number }>',
      'Jämför a.length och b.length.',
      'if (b.length > a.length) { return b; }',
    ],
    tests: [
      {
        description: 'Text',
        code: "langst('hej', 'hallå')",
        expected: 'hallå',
      },
      { description: 'Arrayer', code: 'langst([1, 2], [3])', expected: [1, 2] },
    ],
    typeTests: [
      {
        description: 'Svaret har samma typ',
        code: "const s: string = langst('a', 'b');",
      },
      {
        description: 'Tal har ingen längd',
        code: 'langst(1, 2);',
        fails: true,
      },
    ],
  },
  {
    id: 'generics-07',
    track: 'generics',
    title: 'Behåll hela typen',
    xp: 20,
    description:
      'Ett krav som `T extends { id: number }` gör att funktionen fungerar för allt med ett id – och ger tillbaka hela objektet.',
    explain:
      'Med parametern `{ id: number }[]` hade svaret bara haft ett `id`. Med `T extends { id: number }` blir svaret ett `T`: en kund förblir en kund, med namn och allt.\n\nHåll musen över `ada` i typtestet – den är en hel `Kund`.',
    example:
      'function senaste<T extends { datum: string }>(lista: T[]): T | undefined {\n  return lista.toSorted((a, b) => b.datum.localeCompare(a.datum))[0];\n}',
    task: 'Uppgift: Skriv `medId<T extends { id: number }>(lista: T[], id: number): T | undefined`.',
    starterCode: '// Skriv din kod här\n',
    solution:
      'function medId<T extends { id: number }>(lista: T[], id: number): T | undefined {\n  return lista.find(x => x.id === id);\n}\n',
    hints: [
      '<T extends { id: number }>',
      'lista.find(x => x.id === id)',
      'Returtypen är T | undefined.',
    ],
    tests: [
      {
        description: 'Hittar Bo',
        code: "medId([{ id: 1, namn: 'Ada' }, { id: 2, namn: 'Bo' }], 2)",
        expected: { id: 2, namn: 'Bo' },
      },
    ],
    typeTests: [
      {
        description: 'Svaret har namn',
        code: "const k = medId([{ id: 1, namn: 'Ada' }], 1);\nconst n: string | undefined = k?.namn;",
      },
      {
        description: 'Objekt utan id går inte',
        code: "medId([{ namn: 'Ada' }], 1);",
        fails: true,
      },
    ],
  },
  {
    id: 'generics-08',
    track: 'generics',
    title: 'Din egen map',
    xp: 20,
    description:
      'Med två typparametrar kan du skriva en egen `map`: en lista med `T` in, en lista med `U` ut.',
    explain:
      '`f: (x: T) => U` är en funktion som gör om ett `T` till ett `U`. TypeScript räknar ut både `T` (från listan) och `U` (från funktionen).\n\nSå är den riktiga `map` skriven. Håll musen över `map` i editorn och jämför.',
    example:
      'function forEach<T>(lista: T[], f: (x: T) => void): void {\n  for (const x of lista) {\n    f(x);\n  }\n}',
    task: 'Uppgift: Skriv `omvandla<T, U>(lista: T[], f: (x: T) => U): U[]` med en for-loop (inte `map`).',
    starterCode: '// Skriv din kod här\n',
    solution:
      'function omvandla<T, U>(lista: T[], f: (x: T) => U): U[] {\n  const svar: U[] = [];\n  for (const x of lista) {\n    svar.push(f(x));\n  }\n  return svar;\n}\n',
    hints: [
      'const svar: U[] = [];',
      'svar.push(f(x)) i loopen.',
      'return svar;',
    ],
    tests: [
      {
        description: 'Tal till text',
        code: 'omvandla([1, 2], x => `#${x}`)',
        expected: ['#1', '#2'],
      },
      {
        description: 'Text till längd',
        code: "omvandla(['ab', 'c'], x => x.length)",
        expected: [2, 1],
      },
    ],
    typeTests: [
      {
        description: 'Svaret får rätt typ',
        code: 'const s: string[] = omvandla([1], x => x.toString());',
      },
    ],
    sourceChecks: [
      { description: 'Använder inte map', pattern: /\.map\(/, forbidden: true },
    ],
  },
  {
    id: 'generics-09',
    track: 'generics',
    title: 'Map<K, V>',
    xp: 20,
    description:
      'En `Map` är en samling nyckel–värde-par. Typen säger vad nycklarna och värdena är: `Map<string, number>`.',
    explain:
      '`new Map<string, number>()` skapar en tom map där nycklarna är text och värdena tal. `get` ger `number | undefined`, för nyckeln kanske inte finns.\n\nAtt räkna saker är ett klassiskt jobb för en `Map`.',
    example:
      "const lager = new Map<string, number>();\nlager.set('bulle', 12);\nconst antal = lager.get('bulle') ?? 0;",
    task: 'Uppgift: Skriv `rakna(ord: string[]): Map<string, number>` som räknar hur många gånger varje ord finns.',
    starterCode: '// Skriv din kod här\n',
    solution:
      'function rakna(ord: string[]): Map<string, number> {\n  const antal = new Map<string, number>();\n  for (const o of ord) {\n    antal.set(o, (antal.get(o) ?? 0) + 1);\n  }\n  return antal;\n}\n',
    hints: [
      'new Map<string, number>()',
      'antal.get(o) ?? 0 ger 0 första gången.',
      'antal.set(o, (antal.get(o) ?? 0) + 1);',
    ],
    tests: [
      {
        description: 'a finns två gånger',
        code: "rakna(['a', 'b', 'a']).get('a')",
        expected: 2,
      },
      {
        description: 'Två olika ord',
        code: "rakna(['a', 'b', 'a']).size",
        expected: 2,
      },
    ],
    typeTests: [
      {
        description: 'Värdena är tal',
        code: "const n: number | undefined = rakna([]).get('x');",
      },
    ],
  },
];
