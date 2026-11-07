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
};
