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
};
