// Frågor för nivåtestet och för "Testa dig förbi". Fyra frågor per bana.
// Det rätta svaret står alltid först i options. Ordningen blandas när
// frågan visas. En fråga med code kontrolleras i quiz.test.js:
// check: 'log' – det koden skriver ut ska vara det rätta svaret
// check: 'typeError' – rätt svar är att koden ger typfel (ok: inget fel)
export const QUIZ = {
  typer: [
    {
      question: 'Vad gör TypeScript med typerna när koden körs?',
      options: [
        'Tar bort dem – kvar är vanlig JavaScript',
        'Kontrollerar dem en gång till',
        'Gör om dem till text',
        'Skickar dem till webbläsaren',
      ],
      explain:
        'Typerna finns bara medan koden kontrolleras. Det som körs är vanlig JavaScript.',
    },
    {
      question: 'Vad händer med koden?',
      code: "let pris: number = 10;\npris = '20';",
      check: 'typeError',
      options: [
        'TypeScript säger att det är ett typfel',
        'pris blir 20',
        "pris blir '20'",
        'pris blir NaN',
      ],
      explain:
        "pris är ett number, och '20' är text. Det fångas innan koden körs.",
    },
    {
      question: 'Vilken typ får x?',
      code: "const x = 'hej';",
      options: ["'hej'", 'string', 'any', 'text'],
      explain:
        "En const kan aldrig ändras, så TypeScript ger den den exakta typen 'hej'. Med let hade det blivit string.",
    },
    {
      question: 'Vad skrivs ut?',
      code: 'const pris = 19.5;\nconsole.log(typeof pris.toFixed(0));',
      check: 'log',
      options: ['string', 'number', '20', 'boolean'],
      explain: 'toFixed ger text, även när det ser ut som ett tal.',
    },
  ],
  funktioner: [
    {
      question: 'Varför säger TypeScript till om function f(x) { … }?',
      options: [
        'Parametern saknar typ, och TypeScript vägrar gissa',
        'Funktionen saknar namn',
        'x är ett reserverat ord',
        'Funktionen returnerar inget',
      ],
      explain:
        'Utan typ blir parametern any, och i strikt läge är det ett fel.',
    },
    {
      question: 'Vad händer med koden?',
      code: "function dubbla(tal: number) {\n  return tal * 2;\n}\ndubbla('4');",
      check: 'typeError',
      options: ['Ett typfel', '8', "'44'", 'NaN'],
      explain: "dubbla vill ha ett number, och '4' är text.",
    },
    {
      question: 'Vad betyder ? i function hej(namn?: string)?',
      options: [
        'Att namn får hoppas över',
        'Att namn kan vara vilken typ som helst',
        'Att funktionen kan krascha',
        'Att namn är okänt',
      ],
      explain: 'En valfri parameter är undefined när den hoppas över.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'function pris(belopp: number, moms = 0.25) {\n  return belopp * (1 + moms);\n}\nconsole.log(pris(100));',
      check: 'log',
      options: ['125', '100', '100.25', '25'],
      explain: 'moms hoppas över och blir standardvärdet 0.25.',
    },
  ],
  objekt: [
    {
      question: 'Vad är typen number[]?',
      options: [
        'En array med tal',
        'Ett tal i en array',
        'Ett tal som kan saknas',
        'En array med vad som helst',
      ],
      explain:
        '[] efter en typ betyder en array där varje element har den typen.',
    },
    {
      question: 'Vad händer med koden?',
      code: "const bok: { titel: string; sidor: number } = { titel: 'Ronja' };",
      check: 'typeError',
      options: [
        'Ett typfel: sidor saknas',
        'sidor blir 0',
        'sidor blir undefined',
        'Inget',
      ],
      explain: 'Typen kräver sidor, och objektet har det inte.',
    },
    {
      question: 'Vad betyder readonly?',
      options: [
        'Att det går att läsa men inte ändra',
        'Att det bara kan läsas en gång',
        'Att det är hemligt',
        'Att det inte finns än',
      ],
      explain: 'En readonly-egenskap kan inte tilldelas ett nytt värde.',
    },
    {
      question: 'Vad skrivs ut?',
      code: "const p: { namn: string; smeknamn?: string } = { namn: 'Robert' };\nconsole.log(p.smeknamn ?? p.namn);",
      check: 'log',
      options: ['Robert', 'undefined', 'smeknamn', 'null'],
      explain: 'smeknamn saknas och är undefined, så ?? ger namnet.',
    },
  ],
  egna: [
    {
      question: 'Vad gör type Bok = { titel: string }?',
      options: [
        'Ger en typ ett namn',
        'Skapar ett objekt som heter Bok',
        'Skapar en klass',
        'Gör om en bok till text',
      ],
      explain:
        'type ger en typ ett namn. Inget objekt skapas, och typen försvinner när koden körs.',
    },
    {
      question: 'Vad betyder interface Hund extends Djur?',
      options: [
        'En Hund har allt ett Djur har, och mer',
        'Ett Djur har allt en Hund har',
        'Hund och Djur är samma sak',
        'Hund ersätter Djur',
      ],
      explain:
        'extends bygger vidare. En Hund kan användas där ett Djur behövs.',
    },
    {
      question: 'Vad händer med koden?',
      code: "interface Kund {\n  namn: string;\n}\nconst k: Kund = { namm: 'Ada' };",
      check: 'typeError',
      options: [
        'Ett typfel: namm finns inte i Kund',
        'k.namn blir Ada',
        'k.namn blir undefined',
        'Inget',
      ],
      explain: 'Typen känner inte till namm, och namn saknas.',
    },
    {
      question: 'Vad betyder A & B?',
      options: [
        'Allt från både A och B',
        'Antingen A eller B',
        'Det som finns i båda',
        'A minus B',
      ],
      explain: '& sätter ihop typerna: värdet måste ha allt från båda.',
    },
  ],
  unioner: [
    {
      question: "Vilka värden har type Svar = 'ja' | 'nej'?",
      options: [
        "Bara 'ja' och 'nej'",
        'All text',
        "'ja', 'nej' och 'kanske'",
        'true och false',
      ],
      explain: 'En union av literaltyper tillåter bara just de värdena.',
    },
    {
      question: 'Vad händer med koden?',
      code: "type Storlek = 'liten' | 'stor';\nconst s: Storlek = 'mellan';",
      check: 'typeError',
      options: [
        'Ett typfel',
        "s blir 'mellan'",
        "s blir 'liten'",
        's blir undefined',
      ],
      explain: "'mellan' är inte en av de tillåtna storlekarna.",
    },
    {
      question:
        "Vilken typ har x inne i if (typeof x === 'string'), om x: string | number?",
      options: ['string', 'number', 'string | number', 'any'],
      explain: 'TypeScript smalnar av typen inne i if-satsen.',
    },
    {
      question: 'Vad skrivs ut?',
      code: "const blandat: (string | number)[] = [1, 'två', 3];\nconst tal = blandat.filter(x => typeof x === 'number');\nconsole.log(tal.length);",
      check: 'log',
      options: ['2', '3', '1', '0'],
      explain: 'filter behåller bara talen 1 och 3.',
    },
  ],
  saknas: [
    {
      question: 'Vilken typ ger [1, 2, 3].find(x => x > 5)?',
      options: ['number | undefined', 'number', 'undefined', 'number[]'],
      explain: 'find hittar inte alltid något, och då blir svaret undefined.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'const n: number | undefined = 0;\nconsole.log(n ?? 5);',
      check: 'log',
      options: ['0', '5', 'undefined', 'null'],
      explain: '?? ger 5 bara för null och undefined. 0 får vara kvar.',
    },
    {
      question: 'Vad betyder ! i kund!.namn?',
      options: [
        'Ett löfte att kund inte är null eller undefined',
        'Att kund inte får ändras',
        'Att namn är viktigt',
        'Att kund är falsk',
      ],
      explain:
        'TypeScript litar på löftet och kontrollerar inte. Är det fel kraschar koden.',
    },
    {
      question: 'Vad händer med koden?',
      code: "const namn: string[] = ['Ada'];\nconst forsta: string = namn.find(n => n === 'Bo');",
      check: 'typeError',
      options: [
        'Ett typfel: svaret kan vara undefined',
        "forsta blir 'Bo'",
        "forsta blir ''",
        'Inget',
      ],
      explain: 'find ger string | undefined, och det passar inte en string.',
    },
  ],
  fall: [
    {
      question: 'Vad gör kind i en union som Cirkel | Kvadrat?',
      options: [
        'Säger vilken sort objektet är, så att TypeScript kan smalna av',
        'Gör objektet snabbare',
        'Är ett reserverat ord i TypeScript',
        'Räknar hur många det finns',
      ],
      explain: 'En gemensam egenskap med olika värden skiljer typerna åt.',
    },
    {
      question: 'Vilken typ har f i default när alla fall är hanterade?',
      options: ['never', 'Form', 'undefined', 'any'],
      explain: 'Det finns inget kvar som kan nå dit, och det heter never.',
    },
    {
      question: 'Vad händer med koden?',
      code: "type Svar = { ok: true; varde: number } | { ok: false; fel: string };\nconst s: Svar = { ok: false, fel: 'x' };\nconsole.log(s.varde);",
      check: 'typeError',
      options: [
        'Ett typfel: varde finns inte i alla fall',
        'undefined',
        'x',
        '0',
      ],
      explain: 'varde finns bara när ok är true, och det har inte kollats.',
    },
    {
      question: 'Vad skrivs ut?',
      code: "type Form = { kind: 'cirkel'; r: number } | { kind: 'kvadrat'; s: number };\nconst former: Form[] = [{ kind: 'cirkel', r: 1 }, { kind: 'kvadrat', s: 2 }];\nconsole.log(former.filter(f => f.kind === 'cirkel').length);",
      check: 'log',
      options: ['1', '2', '0', 'cirkel'],
      explain: 'Bara en av formerna är en cirkel.',
    },
  ],
  generics: [
    {
      question: 'Varför <T> i stället för any?',
      options: [
        'T kommer ihåg typen, any glömmer den',
        'T är snabbare när koden körs',
        'any finns inte i TypeScript',
        'T betyder text',
      ],
      explain:
        'Med any slutar TypeScript kontrollera. Med T följer typen med från anropet till svaret.',
    },
    {
      question: 'Vilken typ får x?',
      code: 'function forsta<T>(lista: T[]): T {\n  return lista[0];\n}\nconst x = forsta([true, false]);',
      options: ['boolean', 'T', 'any', 'boolean[]'],
      explain: 'T blir boolean, eftersom listan innehåller booleans.',
    },
    {
      question: 'Vad betyder T extends { length: number }?',
      options: [
        'T måste ha en length',
        'T är ett tal',
        'T blir längre',
        'T ärver från Array',
      ],
      explain: 'extends i en typparameter är ett krav på vad T måste ha.',
    },
    {
      question: 'Vad skrivs ut?',
      code: "const m = new Map<string, number>();\nm.set('a', 1);\nconsole.log(m.get('b') ?? 0);",
      check: 'log',
      options: ['0', 'undefined', '1', 'null'],
      explain: "Nyckeln 'b' finns inte, så get ger undefined och ?? ger 0.",
    },
  ],
  verktyg: [
    {
      question: 'Vad gör Partial<Kund>?',
      options: [
        'Gör alla egenskaper i Kund valfria',
        'Tar bort hälften av egenskaperna',
        'Gör Kund omöjlig att ändra',
        'Skapar en tom kund',
      ],
      explain: 'Partial sätter ? på varje egenskap.',
    },
    {
      question: "Vad är Omit<Produkt, 'id'>?",
      options: [
        'Allt i Produkt utom id',
        'Bara id från Produkt',
        'Produkt där id är valfritt',
        'En produkt utan värden',
      ],
      explain: 'Omit tar bort de egenskaper du nämner. Pick är motsatsen.',
    },
    {
      question: 'Vad händer med koden?',
      code: "type Dag = 'lör' | 'sön';\nconst oppet: Record<Dag, string> = { lör: '10–16' };",
      check: 'typeError',
      options: [
        'Ett typfel: sön saknas',
        "oppet.sön blir ''",
        'oppet.sön blir undefined',
        'Inget',
      ],
      explain: 'Record kräver ett värde för varje nyckel i unionen.',
    },
    {
      question: 'Vad är keyof { x: number; y: number }?',
      options: ["'x' | 'y'", 'number', '{ x; y }', 'string'],
      explain: 'keyof ger namnen på egenskaperna som en union.',
    },
  ],
  data: [
    {
      question:
        'Vad är typen på svaret från en async function som returnerar text?',
      options: ['Promise<string>', 'string', 'async string', 'Promise'],
      explain:
        'En async-funktion ger alltid ett Promise. Med await får du ut texten.',
    },
    {
      question: 'Varför unknown i stället för any för data från en server?',
      options: [
        'unknown tvingar dig att kolla datan innan du använder den',
        'unknown är snabbare',
        'any finns inte för fetch',
        'unknown gör om datan till rätt typ',
      ],
      explain:
        'Med any kontrolleras ingenting. Med unknown måste du smalna av först.',
    },
    {
      question: 'Vad betyder returtypen x is Kund?',
      options: [
        'Att x är en Kund när funktionen svarar true',
        'Att funktionen returnerar en Kund',
        'Att x alltid är en Kund',
        'Att funktionen gör om x till en Kund',
      ],
      explain: 'Det är en typkontroll. TypeScript litar på den efter en if.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'async function tal(): Promise<number> {\n  return 5;\n}\ntal().then(n => console.log(n * 2));',
      check: 'log',
      options: ['10', '5', '[object Promise]', 'NaN'],
      explain: 'then får värdet 5 när löftet är klart.',
    },
  ],
  felsok: [
    {
      question: 'Vad gör as Kund?',
      options: [
        'Säger åt TypeScript att värdet är en Kund, utan att kolla',
        'Gör om värdet till en Kund',
        'Kollar att värdet är en Kund',
        'Skapar en ny Kund',
      ],
      explain: 'as är ett löfte. Är det fel kraschar koden när den körs.',
    },
    {
      question:
        "Vad betyder felet Type 'Promise<string>' is not assignable to type 'string'?",
      options: [
        'Oftast en glömd await',
        'Att texten är för lång',
        'Att Promise är felstavat',
        'Att funktionen saknar return',
      ],
      explain: 'Ett Promise är löftet om en text. await ger texten.',
    },
    {
      question: 'Vad är typeof null?',
      options: ["'object'", "'null'", "'undefined'", "'number'"],
      explain: 'En gammal egenhet i JavaScript. Kolla x !== null i stället.',
    },
    {
      question: 'Vad händer med koden?',
      code: 'function f(lista: readonly number[]) {\n  lista.push(1);\n}',
      check: 'typeError',
      options: [
        'Ett typfel: push finns inte på readonly',
        'Listan får en etta till',
        'Inget',
        'Listan töms',
      ],
      explain: 'En readonly-lista har inga metoder som ändrar den.',
    },
  ],
  react: [
    {
      question: 'Hur skriver man typen för en komponents props?',
      options: [
        'Som typen på parametern: ({ namn }: Props)',
        'I JSX: <Komp type="Props" />',
        'Med en kommentar ovanför',
        'Det går inte i React',
      ],
      explain:
        'Props är ett vanligt objekt, så parametern får en vanlig objekttyp.',
    },
    {
      question: 'Varför useState<string | null>(null)?',
      options: [
        'Annars blir typen bara null och det går aldrig att sätta en text',
        'useState kräver alltid en typ',
        'null är inte tillåtet i React',
        'För att det går snabbare',
      ],
      explain: 'TypeScript gissar typen från startvärdet. null säger för lite.',
    },
    {
      question: 'Vad är ReactNode?',
      options: [
        'Allt React kan visa: text, tal, element och null',
        'En komponent',
        'Ett HTML-element',
        'En hook',
      ],
      explain: 'children har ofta typen ReactNode.',
    },
    {
      question: 'Vad händer med koden?',
      code: 'type Props = { namn: string };\nfunction Hej({ namn }: Props) {\n  return <p>{namn}</p>;\n}\nconst x = <Hej />;',
      check: 'typeError',
      options: [
        'Ett typfel: namn saknas',
        'Hej visar en tom p',
        'Hej visar undefined',
        'Inget',
      ],
      explain: 'namn är inte valfri, så den måste skickas med.',
    },
  ],
  slutprojekt: [
    {
      question: 'Varför skriva typerna först i ett nytt projekt?',
      options: [
        'De blir en karta som resten av koden följer',
        'TypeScript kräver det',
        'Koden körs snabbare',
        'Annars går det inte att köra koden',
      ],
      explain:
        'Med typerna klara pekar TypeScript ut vad som saknas medan du bygger resten.',
    },
    {
      question: "Vad är Omit<Bokning, 'id' | 'status'>?",
      options: [
        'En bokning utan id och status',
        'Bara id och status',
        'En bokning där id och status är valfria',
        'En avbokad bokning',
      ],
      explain: 'Omit tar bort de nämnda egenskaperna.',
    },
    {
      question: 'Vad skrivs ut?',
      code: "const dag = 24 * 60 * 60 * 1000;\nconsole.log((new Date('2026-06-13').getTime() - new Date('2026-06-10').getTime()) / dag);",
      check: 'log',
      options: ['3', '4', '2', '259200000'],
      explain: 'Skillnaden är tre dygn.',
    },
    {
      question: 'Vilken TypeScript-version är omskriven i Go?',
      options: ['TypeScript 7', 'TypeScript 5', 'TypeScript 6', 'Ingen'],
      explain:
        'TypeScript 7 är mycket snabbare, men språket du skriver är detsamma.',
    },
  ],
};
