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
  sortera: [
    {
      question: 'Vad ger ORDER BY pris DESC?',
      options: [
        'Dyrast först',
        'Billigast först',
        'Bara den dyraste',
        'Raderna i tabellens ordning',
      ],
      explain:
        'DESC betyder fallande: störst först. Utan DESC blir det minst först.',
    },
    {
      question: 'Vad blir svaret?',
      code: 'SELECT COUNT(*) FROM kunder WHERE epost IS NULL;',
      db: 'butik',
      options: ['2', '10', '8', '0'],
      explain:
        'Två kunder saknar e-post. COUNT(*) räknar raderna som är kvar efter WHERE.',
    },
    {
      question: 'Hur många rader ger frågan?',
      code: 'SELECT DISTINCT genre FROM filmer;',
      db: 'filmer',
      check: 'rows',
      options: ['4', '16', '1', '7'],
      explain:
        'DISTINCT visar varje genre en gång: Drama, Komedi, Animerat och Sci-fi.',
    },
    {
      question: 'Vad gör AS i SELECT pris * 2 AS dubbelt?',
      options: [
        'Ger kolumnen namnet dubbelt',
        'Sparar en ny kolumn i tabellen',
        'Sorterar på dubbelt',
        'Räknar bara ut den om pris finns',
      ],
      explain: 'AS ger kolumnen ett namn i svaret. Tabellen ändras inte.',
    },
  ],
  gruppera: [
    {
      question: 'Hur många rader ger frågan?',
      code: 'SELECT stad, COUNT(*) FROM kunder GROUP BY stad;',
      db: 'butik',
      check: 'rows',
      options: ['5', '10', '1', '3'],
      explain:
        'En rad per grupp, alltså en per stad. Kunderna bor i fem städer.',
    },
    {
      question: 'Var skriver man villkoret COUNT(*) >= 2?',
      options: ['I HAVING', 'I WHERE', 'I ORDER BY', 'I GROUP BY'],
      explain:
        'WHERE tittar på en rad i taget, före grupperingen. Villkor om grupper står i HAVING.',
    },
    {
      question: 'Hur många rader ger frågan?',
      code: 'SELECT kategori, COUNT(*) FROM produkter GROUP BY kategori HAVING COUNT(*) > 3;',
      db: 'butik',
      check: 'rows',
      options: ['0', '4', '1', '3'],
      explain:
        'Varje kategori har exakt tre produkter, och 3 > 3 är falskt. Ingen grupp blir kvar.',
    },
    {
      question: 'I vilken ordning står delarna?',
      options: [
        'WHERE, GROUP BY, HAVING, ORDER BY',
        'GROUP BY, WHERE, ORDER BY, HAVING',
        'HAVING, WHERE, GROUP BY, ORDER BY',
        'WHERE, HAVING, ORDER BY, GROUP BY',
      ],
      explain:
        'Rader filtreras, grupperas, grupperna filtreras och sist sorteras svaret.',
    },
  ],
};
