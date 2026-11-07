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
};
