// Bana 7: LEFT JOIN, att hitta det som saknas med IS NULL, COALESCE och
// skillnaden mellan COUNT(*) och COUNT(kolumn).
const START = '-- Skriv din fråga här\n';

export const SAKNAS = [
  {
    id: 'saknas-01',
    track: 'saknas',
    db: 'filmer',
    title: 'Behåll alla',
    xp: 15,
    description:
      'Med JOIN försvann kortfilmen, som saknar regissör. Ibland vill man ha med alla rader ändå.',
    explain:
      'En vanlig `JOIN` behåller bara rader som har en match. `LEFT JOIN` behåller **alla** rader från tabellen till vänster (den i `FROM`), även de utan match.\n\nDär det inte fanns någon match blir kolumnerna från den högra tabellen `NULL`.',
    example:
      'SELECT k.namn, o.id FROM kunder k LEFT JOIN ordrar o ON o.kund_id = k.id;',
    task: 'Uppgift: Visa `titel` för alla filmer och regissörens `namn`, även för filmen som saknar regissör.',
    starterCode: START,
    solution:
      'SELECT f.titel, r.namn\nFROM filmer f\nLEFT JOIN regissorer r ON f.regissor_id = r.id;\n',
    hints: [
      'Som en vanlig JOIN, men med LEFT framför.',
      'filmer ska stå i FROM, eftersom det är alla filmer som ska med.',
      'FROM filmer f LEFT JOIN regissorer r ON f.regissor_id = r.id',
    ],
    tests: [{ description: 'Alla 16 filmer', check: 'rows' }],
  },
  {
    id: 'saknas-02',
    track: 'saknas',
    db: 'filmer',
    title: 'Hitta det som saknas',
    xp: 15,
    description:
      'Finns det någon regissör i databasen som inte har någon film?',
    explain:
      'Efter en `LEFT JOIN` har raderna utan match `NULL` i den högra tabellens kolumner. Därför hittar `WHERE f.id IS NULL` precis de raderna.\n\nDet är ett av de vanligaste knepen i SQL: "kunder som aldrig handlat", "böcker som aldrig lånats".',
    example:
      'SELECT k.namn FROM kunder k LEFT JOIN ordrar o ON o.kund_id = k.id WHERE o.id IS NULL;',
    task: 'Uppgift: Visa `namn` på regissörerna som inte har någon film i databasen.',
    starterCode: START,
    solution:
      'SELECT r.namn\nFROM regissorer r\nLEFT JOIN filmer f ON f.regissor_id = r.id\nWHERE f.id IS NULL;\n',
    hints: [
      'Nu är det alla regissörer som ska med, så regissorer står i FROM.',
      'LEFT JOIN filmer f ON f.regissor_id = r.id',
      'WHERE f.id IS NULL',
    ],
    tests: [
      {
        description: 'Regissören utan film',
        check: 'rows',
        expected: [['Céline Sciamma']],
      },
    ],
  },
  {
    id: 'saknas-03',
    track: 'saknas',
    db: 'butik',
    title: 'Aldrig handlat',
    xp: 15,
    description:
      'Två kunder har registrerat sig men aldrig beställt något. Vilka?',
    explain:
      'Tänk på vilken tabell som ska ha med alla sina rader. Det är kunderna, så `kunder` står i `FROM` och `ordrar` i `LEFT JOIN`.\n\nByter du plats blir det ordrar utan kund – och sådana finns inte.',
    example:
      'SELECT f.titel FROM filmer f LEFT JOIN recensioner re ON re.film_id = f.id WHERE re.id IS NULL;',
    task: 'Uppgift: Visa `namn` och `epost` för kunderna som aldrig lagt en order.',
    starterCode: START,
    solution:
      'SELECT k.namn, k.epost\nFROM kunder k\nLEFT JOIN ordrar o ON o.kund_id = k.id\nWHERE o.id IS NULL;\n',
    hints: [
      'FROM kunder k LEFT JOIN ordrar o ON o.kund_id = k.id',
      'Kunderna utan match har NULL i o.id.',
      'WHERE o.id IS NULL',
    ],
    tests: [
      {
        description: 'De två kunderna',
        check: 'rows',
        expected: [
          ['Greta Nyström', null],
          ['Jonas Åberg', 'jonas@exempel.se'],
        ],
      },
    ],
  },
  {
    id: 'saknas-04',
    track: 'saknas',
    db: 'butik',
    title: 'Ett värde i stället för NULL',
    xp: 15,
    description: 'I utskicket ska det stå "saknas" i stället för en tom ruta.',
    explain:
      "`COALESCE(epost, 'saknas')` ger det första värdet som inte är NULL. Har kunden en e-post blir det den, annars `'saknas'`.\n\nDet fungerar på alla NULL, även de som kommer från en `LEFT JOIN`.",
    example: 'SELECT titel, COALESCE(regissor_id, 0) FROM filmer;',
    task: 'Uppgift: Visa `namn` och e-posten som `epost` för alla kunder, med `saknas` där e-posten är NULL.',
    starterCode: START,
    solution: "SELECT namn, COALESCE(epost, 'saknas') AS epost FROM kunder;\n",
    hints: [
      "COALESCE(epost, 'saknas')",
      'Ge den namnet epost med AS.',
      "SELECT namn, COALESCE(epost, 'saknas') AS epost FROM kunder;",
    ],
    tests: [
      { description: 'saknas i stället för NULL', check: 'rows' },
      {
        description: 'Kolumnerna är namn och epost',
        check: 'columns',
        expected: ['namn', 'epost'],
      },
    ],
  },
  {
    id: 'saknas-05',
    track: 'saknas',
    db: 'butik',
    title: 'Räkna med nollor',
    xp: 20,
    description: 'Hur många ordrar har varje kund? Även de som har noll.',
    explain:
      '`COUNT(*)` räknar rader. Efter en `LEFT JOIN` har en kund utan ordrar ändå en rad (med NULL), så den räknas som 1.\n\n`COUNT(o.id)` räknar bara rader där `o.id` inte är NULL. Då blir det 0 för kunderna utan ordrar.',
    example:
      'SELECT r.namn, COUNT(f.id) FROM regissorer r LEFT JOIN filmer f ON f.regissor_id = r.id GROUP BY r.namn;',
    task: 'Uppgift: Visa varje kunds `namn` och antal ordrar som `ordrar`, med 0 för dem som aldrig handlat.',
    starterCode: START,
    solution:
      'SELECT k.namn, COUNT(o.id) AS ordrar\nFROM kunder k\nLEFT JOIN ordrar o ON o.kund_id = k.id\nGROUP BY k.namn;\n',
    hints: [
      'LEFT JOIN ordrar, så att alla kunder kommer med.',
      'COUNT(o.id), inte COUNT(*).',
      'GROUP BY k.namn',
    ],
    tests: [{ description: 'Alla kunder, med nollor', check: 'rows' }],
  },
  {
    id: 'saknas-06',
    track: 'saknas',
    db: 'filmer',
    title: 'Utan recensioner',
    xp: 15,
    description: 'Vilka filmer har ingen recenserat än?',
    explain:
      'Samma knep fungerar för alla tabeller med en nyckel: `LEFT JOIN` till tabellen som pekar hit, och `IS NULL` på något som alltid finns där, som id.',
    example:
      'SELECT b.titel FROM bocker b LEFT JOIN lan l ON l.bok_id = b.id WHERE l.id IS NULL;',
    task: 'Uppgift: Visa `titel` på filmerna som inte har någon recension.',
    starterCode: START,
    solution:
      'SELECT f.titel\nFROM filmer f\nLEFT JOIN recensioner re ON re.film_id = f.id\nWHERE re.id IS NULL;\n',
    hints: [
      'FROM filmer f LEFT JOIN recensioner re ON …',
      're.film_id = f.id',
      'WHERE re.id IS NULL',
    ],
    tests: [
      {
        description: 'Filmen utan recension',
        check: 'rows',
        expected: [['Okänd kortfilm']],
      },
    ],
  },
  {
    id: 'saknas-07',
    track: 'saknas',
    db: 'bibliotek',
    title: 'Hyllvärmarna',
    xp: 15,
    description: 'Vilka böcker har aldrig lånats ut?',
    explain:
      'Böcker som aldrig lånats har ingen rad i `lan`. Med `LEFT JOIN` får de en rad ändå, med NULL – och `IS NULL` plockar fram dem.',
    example:
      'SELECT r.namn FROM regissorer r LEFT JOIN filmer f ON f.regissor_id = r.id WHERE f.id IS NULL;',
    task: 'Uppgift: Visa `titel` och `forfattare` för böckerna som aldrig lånats, i bokstavsordning efter titel.',
    starterCode: START,
    solution:
      'SELECT b.titel, b.forfattare\nFROM bocker b\nLEFT JOIN lan l ON l.bok_id = b.id\nWHERE l.id IS NULL\nORDER BY b.titel;\n',
    hints: [
      'FROM bocker b LEFT JOIN lan l ON l.bok_id = b.id',
      'WHERE l.id IS NULL',
      'ORDER BY b.titel',
    ],
    tests: [
      {
        description: 'Böckerna som aldrig lånats',
        check: 'rows',
        ordered: true,
      },
    ],
  },
  {
    id: 'saknas-08',
    track: 'saknas',
    db: 'butik',
    title: 'Noll i stället för NULL',
    xp: 20,
    description:
      'Hur många av varje produkt har sålts? Två har aldrig sålts alls.',
    explain:
      '`SUM` av bara NULL blir NULL, inte 0. Lägg `COALESCE` runt: `COALESCE(SUM(r.antal), 0)`.\n\nFunktioner kan stå i varandra hur många lager som helst.',
    example:
      "SELECT k.namn, COALESCE(MAX(o.datum), 'aldrig') FROM kunder k LEFT JOIN ordrar o ON o.kund_id = k.id GROUP BY k.namn;",
    task: 'Uppgift: Visa varje produkts `namn` och hur många som sålts som `salda`, med 0 för dem som aldrig sålts.',
    starterCode: START,
    solution:
      'SELECT p.namn, COALESCE(SUM(r.antal), 0) AS salda\nFROM produkter p\nLEFT JOIN orderrader r ON r.produkt_id = p.id\nGROUP BY p.namn;\n',
    hints: [
      'FROM produkter p LEFT JOIN orderrader r ON r.produkt_id = p.id',
      'SUM(r.antal) ger NULL för det som aldrig sålts.',
      'COALESCE(SUM(r.antal), 0) AS salda',
    ],
    tests: [{ description: 'Alla produkter, med nollor', check: 'rows' }],
  },
  {
    id: 'saknas-09',
    track: 'saknas',
    db: 'skola',
    title: 'Villkor i ON',
    xp: 25,
    description:
      'Läraren i programmering vill se alla elever och deras resultat. De som inte läst kursen ska stå med, utan resultat.',
    explain:
      'Ett villkor om den högra tabellen i `WHERE` tar bort raderna med NULL – då blir det en vanlig JOIN igen. Lägg det i `ON` i stället:\n\n`LEFT JOIN resultat r ON r.elev_id = e.id AND r.kurs_id = 4`\n\nDå väljs bara resultaten i kurs 4 ut, men alla elever är kvar.',
    example:
      "SELECT k.namn, o.id FROM kunder k LEFT JOIN ordrar o ON o.kund_id = k.id AND o.status = 'skickad';",
    task: 'Uppgift: Visa `fornamn` för alla elever och deras `poang` i Programmering (`kurs_id` 4), med NULL för dem som inte läst kursen.',
    starterCode: START,
    solution:
      'SELECT e.fornamn, r.poang\nFROM elever e\nLEFT JOIN resultat r ON r.elev_id = e.id AND r.kurs_id = 4;\n',
    hints: [
      'FROM elever e LEFT JOIN resultat r',
      'Båda villkoren i ON, med AND.',
      'ON r.elev_id = e.id AND r.kurs_id = 4',
    ],
    tests: [{ description: 'Alla tolv elever', check: 'rows' }],
  },
];
