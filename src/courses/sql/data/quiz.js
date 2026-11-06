// Frågor för nivåtestet och för "Testa dig förbi". Fyra frågor per bana.
// Det rätta svaret står alltid först i options. Ordningen blandas när
// frågan visas. En fråga med db körs i quiz.test.js: code körs mot
// databasen och svaret (första värdet, eller antalet rader med
// check: 'rows') ska vara det rätta.
export const QUIZ = {
  select: [
    {
      question: 'Vad betyder * i SELECT * FROM kunder?',
      options: [
        'Alla kolumner',
        'Alla rader gånger varandra',
        'Bara den första kolumnen',
        'Kunder som är favoriter',
      ],
      explain: '* betyder alla kolumner. Raderna styrs av WHERE och LIMIT.',
    },
    {
      question: 'Hur många rader ger frågan?',
      code: 'SELECT namn FROM kunder LIMIT 3;',
      db: 'butik',
      check: 'rows',
      options: ['3', '1', '10', '0'],
      explain: 'LIMIT 3 ger högst tre rader, och tabellen har fler än så.',
    },
    {
      question: 'Vad blir svaret?',
      code: 'SELECT 7 / 2;',
      db: 'butik',
      options: ['3', '3.5', '4', 'Ett fel'],
      explain:
        'Två heltal ger ett heltal i SQLite, så decimalerna försvinner. 7 / 2.0 ger 3.5.',
    },
    {
      question: 'Vilken rad är en kommentar?',
      options: [
        '-- Alla kunder',
        '# Alla kunder',
        '// Alla kunder',
        '<!-- Alla kunder -->',
      ],
      explain: 'I SQL börjar en kommentar med två bindestreck.',
    },
  ],
  filtrera: [
    {
      question: 'Hur skrivs texten Göteborg i ett villkor?',
      options: ["'Göteborg'", 'Göteborg', '"Göteborg"', '(Göteborg)'],
      explain:
        'Text står inom enkla citattecken. Utan dem tror SQL att det är en kolumn, och dubbla citattecken betyder ett namn.',
    },
    {
      question: 'Hur många filmer kom mellan 2010 och 2014, med båda åren?',
      code: 'SELECT titel FROM filmer WHERE ar BETWEEN 2010 AND 2014;',
      db: 'filmer',
      check: 'rows',
      options: ['3', '2', '1', '4'],
      explain:
        'BETWEEN tar med båda ändarna: Inception (2010), Turist och Interstellar (2014).',
    },
    {
      question: 'Hur hittar man rader där epost saknas?',
      options: [
        'WHERE epost IS NULL',
        'WHERE epost = NULL',
        "WHERE epost = ''",
        'WHERE epost = 0',
      ],
      explain:
        'NULL betyder "vet inte", så = NULL blir aldrig sant. Det heter IS NULL.',
    },
    {
      question: "Hur många böcker har en titel som matchar LIKE '%ring%'?",
      code: "SELECT titel FROM bocker WHERE titel LIKE '%ring%';",
      db: 'bibliotek',
      check: 'rows',
      options: ['2', '1', '0', '14'],
      explain:
        '% betyder vad som helst, så %ring% är titlar som innehåller ring någonstans: Sagan om ringen, men också Hundraåringen.',
    },
  ],
};
