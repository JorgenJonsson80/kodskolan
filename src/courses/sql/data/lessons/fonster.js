// Bana 12: fönsterfunktioner. ROW_NUMBER, RANK och DENSE_RANK, PARTITION
// BY, SUM och AVG med OVER, löpande summor, LAG och topp N per grupp med
// WITH. Raderna rättas oftast utan ordning, eftersom platsen står i en
// egen kolumn.
const START = '-- Skriv din fråga här\n';

export const FONSTER = [
  {
    id: 'fonster-01',
    track: 'fonster',
    db: 'butik',
    title: 'Numrera raderna',
    xp: 20,
    description:
      'Butiken vill ha en prislista där varje produkt har sin plats: 1, 2, 3 …',
    explain:
      '`ROW_NUMBER() OVER (ORDER BY pris DESC)` numrerar raderna i den ordning som står i `OVER`. Den dyraste får 1.\n\nTill skillnad från `GROUP BY` slås inga rader ihop – varje rad finns kvar och får ett nummer. Det kallas en **fönsterfunktion**: den tittar på flera rader men skriver svaret på varje.',
    example:
      'SELECT titel, langd, ROW_NUMBER() OVER (ORDER BY langd) AS nr FROM filmer;',
    task: 'Uppgift: Visa `namn`, `pris` och platsen som `plats` för alla produkter, där den dyraste har plats 1.',
    starterCode: START,
    solution:
      'SELECT namn, pris, ROW_NUMBER() OVER (ORDER BY pris DESC) AS plats\nFROM produkter;\n',
    hints: [
      'ROW_NUMBER() OVER ( … )',
      'Inom OVER: ORDER BY pris DESC',
      'ROW_NUMBER() OVER (ORDER BY pris DESC) AS plats',
    ],
    tests: [
      { description: 'Varje produkt med sin plats', check: 'rows' },
      {
        description: 'Kolumnerna är namn, pris och plats',
        check: 'columns',
        expected: ['namn', 'pris', 'plats'],
      },
    ],
  },
  {
    id: 'fonster-02',
    track: 'fonster',
    db: 'filmer',
    title: 'Delad plats',
    xp: 20,
    description:
      'Två filmer kom 1957, två 2014 och två 2023. Ska de verkligen ha olika plats?',
    explain:
      '`ROW_NUMBER` ger alltid olika nummer, även när värdena är lika. `RANK` ger samma plats vid lika värden och hoppar sedan över: 1, 2, 2, 4.\n\nSom på en tävling: delar två på silvret blir det ingen bronsmedalj.',
    example:
      'SELECT namn, pris, RANK() OVER (ORDER BY pris) AS plats FROM produkter;',
    task: 'Uppgift: Visa `titel`, `ar` och platsen som `plats` för alla filmer, där den nyaste har plats 1 och filmer från samma år delar plats. Använd `RANK`.',
    starterCode: START,
    solution:
      'SELECT titel, ar, RANK() OVER (ORDER BY ar DESC) AS plats\nFROM filmer;\n',
    hints: [
      'RANK() OVER ( … )',
      'ORDER BY ar DESC inom OVER.',
      'RANK() OVER (ORDER BY ar DESC) AS plats',
    ],
    tests: [{ description: 'Filmerna med delade platser', check: 'rows' }],
  },
  {
    id: 'fonster-03',
    track: 'fonster',
    db: 'filmer',
    title: 'Utan hopp',
    xp: 15,
    description:
      'Med RANK hoppar numren efter en delad plats. Ibland vill man inte det.',
    explain:
      '`DENSE_RANK` delar plats som `RANK`, men hoppar inte: 1, 2, 2, 3.\n\nTre sätt att numrera, alltså:\n\n- `ROW_NUMBER` 1, 2, 3, 4\n- `RANK` 1, 2, 2, 4\n- `DENSE_RANK` 1, 2, 2, 3',
    example:
      'SELECT titel, ar, DENSE_RANK() OVER (ORDER BY ar) AS nr FROM filmer;',
    task: 'Uppgift: Visa `titel`, `ar` och `plats` som i förra övningen, men med `DENSE_RANK`.',
    starterCode: START,
    solution:
      'SELECT titel, ar, DENSE_RANK() OVER (ORDER BY ar DESC) AS plats\nFROM filmer;\n',
    hints: [
      'Byt RANK mot DENSE_RANK.',
      'Resten är som förut.',
      'DENSE_RANK() OVER (ORDER BY ar DESC) AS plats',
    ],
    tests: [{ description: 'Platser utan hopp', check: 'rows' }],
  },
  {
    id: 'fonster-04',
    track: 'fonster',
    db: 'skola',
    title: 'Börja om i varje grupp',
    xp: 20,
    description: 'Varje klass ska ha sin egen numrerade lista.',
    explain:
      '`PARTITION BY klass` delar raderna i grupper, och numreringen börjar om på 1 i varje:\n\n`ROW_NUMBER() OVER (PARTITION BY klass ORDER BY efternamn)`\n\nDet liknar `GROUP BY`, men raderna slås inte ihop.',
    example:
      'SELECT titel, genre, ROW_NUMBER() OVER (PARTITION BY genre ORDER BY ar) AS nr FROM filmer;',
    task: 'Uppgift: Visa `klass`, `efternamn` och elevens nummer i klassen som `nr`, numrerat i bokstavsordning efter efternamn, så att varje klass börjar på 1.',
    starterCode: START,
    solution:
      'SELECT klass, efternamn,\n  ROW_NUMBER() OVER (PARTITION BY klass ORDER BY efternamn) AS nr\nFROM elever;\n',
    hints: [
      'ROW_NUMBER() OVER (PARTITION BY … ORDER BY …)',
      'PARTITION BY klass',
      'ORDER BY efternamn inom OVER.',
    ],
    tests: [{ description: 'Numrerade per klass', check: 'rows' }],
  },
  {
    id: 'fonster-05',
    track: 'fonster',
    db: 'skola',
    title: 'Snittet bredvid',
    xp: 20,
    description: 'Läraren vill se varje resultat med kursens snitt bredvid.',
    explain:
      'Vanliga funktioner som `AVG` och `SUM` blir fönsterfunktioner med `OVER`:\n\n`AVG(poang) OVER (PARTITION BY kurs_id)`\n\nVarje rad behåller sitt resultat och får kursens snitt bredvid. Med `GROUP BY` hade det blivit en rad per kurs.',
    example:
      'SELECT titel, genre, AVG(langd) OVER (PARTITION BY genre) AS genresnitt FROM filmer;',
    task: 'Uppgift: Visa `elev_id`, `kurs_id`, `poang` och kursens snitt med en decimal som `kurssnitt` för alla resultat.',
    starterCode: START,
    solution:
      'SELECT elev_id, kurs_id, poang,\n  ROUND(AVG(poang) OVER (PARTITION BY kurs_id), 1) AS kurssnitt\nFROM resultat;\n',
    hints: [
      'AVG(poang) OVER (PARTITION BY kurs_id)',
      'ROUND( … , 1) runt hela.',
      'AS kurssnitt',
    ],
    tests: [{ description: 'Varje resultat med kursens snitt', check: 'rows' }],
  },
  {
    id: 'fonster-06',
    track: 'fonster',
    db: 'skola',
    title: 'Över eller under?',
    xp: 20,
    description:
      'Hur mycket över eller under kursens snitt hamnade varje elev?',
    explain:
      'En fönsterfunktion går att räkna med som vilket värde som helst: `poang - AVG(poang) OVER (PARTITION BY kurs_id)`.\n\nEtt positivt svar är över snittet, ett negativt under.',
    example:
      'SELECT titel, langd - AVG(langd) OVER () AS skillnad FROM filmer;',
    task: 'Uppgift: Visa `elev_id`, `poang` och skillnaden mot kursens snitt med en decimal som `skillnad`, för resultaten i Matematik (`kurs_id` 1).',
    starterCode: START,
    solution:
      'SELECT elev_id, poang,\n  ROUND(poang - AVG(poang) OVER (PARTITION BY kurs_id), 1) AS skillnad\nFROM resultat\nWHERE kurs_id = 1;\n',
    hints: [
      'poang - AVG(poang) OVER (PARTITION BY kurs_id)',
      'ROUND( … , 1) AS skillnad',
      'WHERE kurs_id = 1',
    ],
    tests: [{ description: 'Skillnaden mot snittet', check: 'rows' }],
  },
  {
    id: 'fonster-07',
    track: 'fonster',
    db: 'butik',
    title: 'Löpande summa',
    xp: 25,
    description: 'Hur många ordrar hade butiken fått efter varje dag?',
    explain:
      'Med `ORDER BY` i `OVER` räknas funktionen från början fram till raden: `COUNT(*) OVER (ORDER BY datum)` är antalet ordrar hittills.\n\nPå samma sätt blir `SUM(…) OVER (ORDER BY datum)` en löpande summa – som saldot på ett bankkonto.',
    example:
      'SELECT titel, ar, COUNT(*) OVER (ORDER BY ar) AS hittills FROM filmer;',
    task: 'Uppgift: Visa `id`, `datum` och antalet ordrar hittills som `hittills`, för alla ordrar.',
    starterCode: START,
    solution:
      'SELECT id, datum, COUNT(*) OVER (ORDER BY datum) AS hittills\nFROM ordrar;\n',
    hints: [
      'COUNT(*) OVER ( … )',
      'ORDER BY datum inom OVER.',
      'COUNT(*) OVER (ORDER BY datum) AS hittills',
    ],
    tests: [{ description: 'Antal ordrar hittills', check: 'rows' }],
  },
  {
    id: 'fonster-08',
    track: 'fonster',
    db: 'butik',
    title: 'Förra raden',
    xp: 25,
    description: 'Hur många dagar gick det mellan butikens ordrar?',
    explain:
      '`LAG(datum) OVER (ORDER BY datum)` ger datumet på **raden före**. Den första raden har ingen före, så där blir det NULL. `LEAD` ger raden efter.\n\nMed `julianday` blir skillnaden antal dagar.',
    example:
      'SELECT titel, ar, LAG(ar) OVER (ORDER BY ar) AS forra FROM filmer;',
    task: 'Uppgift: Visa `id`, `datum` och antalet dagar sedan förra ordern som `dagar` för alla ordrar (NULL för den första).',
    starterCode: START,
    solution:
      'SELECT id, datum,\n  julianday(datum) - julianday(LAG(datum) OVER (ORDER BY datum)) AS dagar\nFROM ordrar;\n',
    hints: [
      'LAG(datum) OVER (ORDER BY datum) är förra orderns datum.',
      'julianday(datum) - julianday( … )',
      'AS dagar',
    ],
    tests: [{ description: 'Dagar mellan ordrarna', check: 'rows' }],
  },
  {
    id: 'fonster-09',
    track: 'fonster',
    db: 'filmer',
    title: 'Bäst i varje grupp',
    xp: 30,
    description: 'Vilken är den längsta filmen i varje genre?',
    explain:
      'En fönsterfunktion kan inte stå i `WHERE`, eftersom `WHERE` körs innan den räknas ut. Lägg den i en `WITH` först, och filtrera sedan:\n\n`WITH rankade AS (SELECT …, RANK() OVER (…) AS plats FROM …)`\n`SELECT … FROM rankade WHERE plats = 1`\n\nSå gör man "topp N per grupp", en av de vanligaste frågorna i jobbet.',
    example:
      'WITH r AS (SELECT namn, kategori, pris, RANK() OVER (PARTITION BY kategori ORDER BY pris) AS plats FROM produkter)\nSELECT * FROM r WHERE plats = 1;',
    task: 'Uppgift: Visa `genre`, `titel` och `langd` för den längsta filmen i varje genre.',
    starterCode: START,
    solution:
      'WITH rankade AS (\n  SELECT genre, titel, langd,\n    RANK() OVER (PARTITION BY genre ORDER BY langd DESC) AS plats\n  FROM filmer\n)\nSELECT genre, titel, langd\nFROM rankade\nWHERE plats = 1;\n',
    hints: [
      'RANK() OVER (PARTITION BY genre ORDER BY langd DESC) AS plats',
      'Lägg frågan i WITH rankade AS ( … ).',
      'SELECT genre, titel, langd FROM rankade WHERE plats = 1;',
    ],
    tests: [
      {
        description: 'Den längsta i varje genre',
        check: 'rows',
        expected: [
          ['Animerat', 'Spirited Away', 125],
          ['Drama', 'Fanny och Alexander', 188],
          ['Komedi', 'The Square', 151],
          ['Sci-fi', 'Interstellar', 169],
        ],
      },
    ],
  },
];
