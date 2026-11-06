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
  omvandla: [
    {
      question: 'Vad blir svaret?',
      code: 'SELECT ROUND(3.456, 1);',
      db: 'butik',
      options: ['3.5', '3.4', '3', '3.46'],
      explain:
        'ROUND avrundar till så många decimaler som siffran efter kommatecknet säger.',
    },
    {
      question: 'Vad blir svaret?',
      code: "SELECT 'Hej' || ' ' || 'då';",
      db: 'butik',
      options: ['Hej då', 'Hejdå', "'Hej' 'då'", 'Ett fel'],
      explain: '|| sätter ihop text. Mellanslaget i mitten är en egen text.',
    },
    {
      question: 'Vad blir svaret?',
      code: "SELECT CASE WHEN 5 > 3 THEN 'ja' WHEN 5 > 1 THEN 'kanske' ELSE 'nej' END;",
      db: 'butik',
      options: ['ja', 'kanske', 'nej', 'ja och kanske'],
      explain:
        'Det första villkoret som stämmer vinner, även om fler skulle stämma.',
    },
    {
      question: 'Vad blir svaret?',
      code: "SELECT strftime('%m', '2026-03-14');",
      db: 'butik',
      options: ['03', '14', '2026', 'mars'],
      explain: "'%m' plockar ut månaden som text med två siffror.",
    },
  ],
  join: [
    {
      question: 'Vad står efter ON i en JOIN?',
      options: [
        'Villkoret som säger vilka rader som hör ihop',
        'Tabellen som ska kopplas på',
        'Kolumnerna som ska visas',
        'Hur svaret ska sorteras',
      ],
      explain:
        'ON f.regissor_id = r.id säger att en film hör ihop med regissören vars id den har.',
    },
    {
      question: 'Hur många rader ger frågan?',
      code: 'SELECT f.titel FROM filmer f JOIN regissorer r ON f.regissor_id = r.id;',
      db: 'filmer',
      check: 'rows',
      options: ['15', '16', '7', '112'],
      explain:
        'Kortfilmen saknar regissör (NULL), så den har ingen match och försvinner med en vanlig JOIN.',
    },
    {
      question: 'Vad betyder felet ambiguous column name: id?',
      options: [
        'id finns i flera av tabellerna',
        'id är felstavat',
        'id saknas i alla tabeller',
        'id får inte vara NULL',
      ],
      explain:
        'Skriv tabellen eller aliaset framför, som f.id, så att SQL vet vilket id du menar.',
    },
    {
      question: 'Vad blir svaret?',
      code: "SELECT r.namn FROM filmer f JOIN regissorer r ON f.regissor_id = r.id WHERE f.titel = 'Barbie';",
      db: 'filmer',
      options: ['Greta Gerwig', 'Christopher Nolan', '6', 'Barbie'],
      explain:
        'Barbie har regissor_id 6, och i regissorer har Greta Gerwig id 6.',
    },
  ],
};
