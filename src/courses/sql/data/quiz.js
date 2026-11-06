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
  saknas: [
    {
      question: 'Hur många rader ger frågan?',
      code: 'SELECT f.titel FROM filmer f LEFT JOIN regissorer r ON f.regissor_id = r.id;',
      db: 'filmer',
      check: 'rows',
      options: ['16', '15', '7', '0'],
      explain: 'LEFT JOIN behåller alla filmer, även kortfilmen utan regissör.',
    },
    {
      question: 'Vad blir svaret?',
      code: 'SELECT COALESCE(NULL, NULL, 3, 4);',
      db: 'butik',
      options: ['3', 'NULL', '4', '7'],
      explain: 'COALESCE ger det första värdet som inte är NULL.',
    },
    {
      question: 'Vilken räknar inte rader där kolumnen är NULL?',
      options: ['COUNT(kolumn)', 'COUNT(*)', 'Båda', 'Ingen av dem'],
      explain:
        'COUNT(*) räknar rader. COUNT(kolumn) räknar bara värden som inte är NULL.',
    },
    {
      question: 'Vad blir svaret?',
      code: 'SELECT COUNT(*) FROM kunder k LEFT JOIN ordrar o ON o.kund_id = k.id WHERE o.id IS NULL;',
      db: 'butik',
      options: ['2', '0', '10', '15'],
      explain:
        'Två kunder har aldrig handlat. De har NULL i o.id efter LEFT JOIN.',
    },
  ],
  andra: [
    {
      question: 'Vad gör UPDATE produkter SET pris = 0; utan WHERE?',
      options: [
        'Alla produkter får priset 0',
        'Ingenting',
        'Den första produkten får priset 0',
        'Det blir ett fel',
      ],
      explain:
        'Utan WHERE ändras alla rader. Därför ska UPDATE nästan alltid ha WHERE.',
    },
    {
      question: 'Vad blir svaret?',
      code: 'UPDATE produkter SET lager = lager + 5 WHERE id = 3;\nSELECT lager FROM produkter WHERE id = 3;',
      db: 'butik',
      options: ['5', '0', '3', '8'],
      explain: 'Kaffe Ljusrost (id 3) hade 0 i lager. 0 + 5 = 5.',
    },
    {
      question: 'Vad blir svaret?',
      code: 'DELETE FROM recensioner WHERE betyg < 4;\nSELECT COUNT(*) FROM recensioner;',
      db: 'filmer',
      options: ['21', '28', '7', '0'],
      explain: 'Sju recensioner har betyg 2 eller 3. 28 - 7 = 21 är kvar.',
    },
    {
      question: 'En order har rader i orderrader. Hur tar man bort ordern?',
      options: [
        'Först raderna, sedan ordern',
        'Först ordern, sedan raderna',
        'Det går inte',
        'Bara ordern – raderna försvinner av sig själva',
      ],
      explain:
        'Raderna pekar på ordern. Tar man bort ordern först blir det FOREIGN KEY constraint failed.',
    },
  ],
  skapa: [
    {
      question: 'Vad gör id INTEGER PRIMARY KEY?',
      options: [
        'Ger varje rad ett unikt id, av sig självt om du inte anger något',
        'Gör id till ett decimaltal',
        'Gör att id får vara NULL',
        'Sorterar tabellen på id',
      ],
      explain:
        'En INTEGER PRIMARY KEY är radens id. Utan värde får raden nästa nummer.',
    },
    {
      question: 'Vad blir svaret?',
      code: "CREATE TABLE t (id INTEGER PRIMARY KEY, namn TEXT);\nINSERT INTO t (namn) VALUES ('a'), ('b'), ('c');\nSELECT MAX(id) FROM t;",
      db: 'butik',
      options: ['3', '1', 'NULL', '0'],
      explain: 'Raderna fick id 1, 2 och 3 av sig själva.',
    },
    {
      question: 'Vad betyder NOT NULL?',
      options: [
        'Kolumnen måste ha ett värde',
        'Kolumnen får inte vara 0',
        'Kolumnen är alltid tom',
        'Kolumnen måste vara unik',
      ],
      explain: 'NOT NULL stoppar rader där värdet saknas. Unik är UNIQUE.',
    },
    {
      question: 'Vad blir svaret?',
      code: 'CREATE TABLE t (betyg INTEGER CHECK (betyg <= 5));\nINSERT OR IGNORE INTO t VALUES (3), (9), (5);\nSELECT COUNT(*) FROM t;',
      db: 'butik',
      options: ['2', '3', '1', '0'],
      explain:
        '9 bryter mot CHECK och hoppas över (OR IGNORE). 3 och 5 sparas.',
    },
  ],
  delfragor: [
    {
      question: 'Vad blir svaret?',
      code: 'SELECT COUNT(*) FROM produkter WHERE pris > (SELECT AVG(pris) FROM produkter);',
      db: 'butik',
      options: ['4', '12', '1', '6'],
      explain: 'Snittpriset är ungefär 87 kr, och fyra produkter är dyrare.',
    },
    {
      question: 'Vad gör WITH summor AS (…) först i en fråga?',
      options: [
        'Ger en fråga ett namn som kan användas som en tabell',
        'Skapar en ny tabell i databasen',
        'Sparar svaret till nästa gång',
        'Gör frågan snabbare',
      ],
      explain: 'Namnet finns bara medan frågan körs. Ingen tabell skapas.',
    },
    {
      question: 'Vad blir svaret?',
      code: 'SELECT COUNT(*) FROM kunder WHERE id NOT IN (SELECT kund_id FROM ordrar);',
      db: 'butik',
      options: ['2', '8', '0', '10'],
      explain: 'Två kunder har aldrig lagt någon order.',
    },
    {
      question: 'När är EXISTS (SELECT …) sant?',
      options: [
        'När delfrågan ger minst en rad',
        'När delfrågan ger exakt en rad',
        'När delfrågan ger värdet 1',
        'När tabellen i delfrågan finns',
      ],
      explain:
        'EXISTS bryr sig bara om att det finns rader, inte vad de innehåller.',
    },
  ],
  felsok: [
    {
      question: 'Vad ger SELECT namn stad FROM kunder?',
      options: [
        'En kolumn med namnen, som heter stad',
        'Två kolumner, namn och stad',
        'Ett felmeddelande',
        'Bara städerna',
      ],
      explain:
        'Utan kommatecken blir stad ett alias för namn. Inget fel, bara fel svar.',
    },
    {
      question: 'Vad blir svaret?',
      code: 'SELECT 10 / 4;',
      db: 'butik',
      options: ['2', '2.5', '3', '2.0'],
      explain: 'Två heltal ger ett heltal. Skriv 10 / 4.0 för att få 2.5.',
    },
    {
      question: 'Felet är near "FROM": syntax error. Var letar du först?',
      options: [
        'Precis före FROM',
        'Precis efter FROM',
        'I tabellens namn',
        'Sist i frågan',
      ],
      explain:
        'SQL blev förvirrad när den kom till FROM, så felet står oftast precis före.',
    },
    {
      question: 'Vad blir svaret?',
      code: "SELECT COUNT(*) FROM produkter WHERE kategori = 'Te' OR kategori = 'Kaffe' AND pris < 60;",
      db: 'butik',
      options: ['3', '2', '6', '0'],
      explain:
        'AND räknas före OR: allt te (3) eller kaffe under 60 (inget). Med parenteser hade det blivit 2.',
    },
  ],
  fonster: [
    {
      question: 'Vad skiljer RANK från ROW_NUMBER?',
      options: [
        'RANK ger samma plats när värdena är lika',
        'RANK slår ihop raderna',
        'RANK räknar från 0',
        'Ingenting, de är samma',
      ],
      explain:
        'ROW_NUMBER ger alltid 1, 2, 3 … RANK ger 1, 2, 2, 4 när två är lika.',
    },
    {
      question: 'Vad blir svaret?',
      code: "SELECT plats FROM (SELECT namn, RANK() OVER (ORDER BY pris DESC) AS plats FROM produkter) WHERE namn = 'Kaffekopp';",
      db: 'butik',
      options: ['2', '1', '3', '10'],
      explain: 'Bara Termos är dyrare än Kaffekoppen, så den får plats 2.',
    },
    {
      question:
        'Varför går det inte att skriva WHERE ROW_NUMBER() OVER (…) <= 3?',
      options: [
        'WHERE körs innan fönsterfunktionerna räknas ut',
        'ROW_NUMBER kan bara stå i ORDER BY',
        'Det går, men bara i SQLite',
        'Fönsterfunktioner ger alltid text',
      ],
      explain:
        'Lägg fönsterfunktionen i en WITH, och filtrera på den i nästa fråga.',
    },
    {
      question: 'Vad blir svaret?',
      code: 'SELECT MAX(lopande) FROM (SELECT SUM(antal) OVER (ORDER BY order_id, produkt_id) AS lopande FROM orderrader);',
      db: 'butik',
      options: ['69', '27', '24', '10'],
      explain: 'En löpande summa slutar på summan av allt: 69 sålda varor.',
    },
  ],
  slutprojekt: [
    {
      question: 'En ägare kan ha flera hundar. Var står nyckeln?',
      options: [
        'Hos hunden: agare_id',
        'Hos ägaren: hund_id',
        'I båda tabellerna',
        'I en tredje tabell',
      ],
      explain:
        'Nyckeln står på "många"-sidan. Varje hund har en ägare, så hunden pekar på ägaren.',
    },
    {
      question: 'Hur många hundar bor på pensionatet idag?',
      code: "SELECT COUNT(*) FROM vistelser WHERE incheckning <= '2026-06-15' AND utcheckning > '2026-06-15';",
      db: 'pensionat',
      options: ['2', '3', '1', '0'],
      explain: 'Rocky och Ludde. Selma checkar ut idag och räknas inte.',
    },
    {
      question: 'I vilken ordning skapas tabellerna?',
      options: [
        'Det som pekas på först, sedan det som pekar',
        'Det som pekar först',
        'I bokstavsordning',
        'Ordningen spelar ingen roll',
      ],
      explain:
        'Med PRAGMA foreign_keys på kan en nyckel bara peka på något som redan finns.',
    },
    {
      question: 'Vad blir svaret?',
      code: 'SELECT COUNT(DISTINCT hund_id) FROM vistelser;',
      db: 'pensionat',
      options: ['6', '10', '4', '3'],
      explain:
        'COUNT(DISTINCT …) räknar olika värden. Alla sex hundar har bott här.',
    },
  ],
};
