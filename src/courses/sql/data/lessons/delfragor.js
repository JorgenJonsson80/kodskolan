// Bana 10: delfrågor i WHERE, IN och NOT IN, i SELECT och i FROM, WITH
// och EXISTS.
const START = '-- Skriv din fråga här\n';

export const DELFRAGOR = [
  {
    id: 'delfragor-01',
    track: 'delfragor',
    db: 'butik',
    title: 'En fråga i frågan',
    xp: 15,
    description:
      'Vilka produkter är dyrare än snittet? Snittet måste räknas ut först.',
    explain:
      'En fråga inom parentes kan stå där det behövs ett värde: `WHERE pris > (SELECT AVG(pris) FROM produkter)`.\n\nDen inre frågan körs först och ger ett enda värde, snittpriset. Sedan jämför den yttre frågan varje rad med det.',
    example:
      'SELECT titel FROM filmer WHERE ar < (SELECT AVG(ar) FROM filmer);',
    task: 'Uppgift: Visa `namn` och `pris` för produkterna som är dyrare än snittpriset.',
    starterCode: START,
    solution:
      'SELECT namn, pris\nFROM produkter\nWHERE pris > (SELECT AVG(pris) FROM produkter);\n',
    hints: [
      'Snittpriset är SELECT AVG(pris) FROM produkter.',
      'Sätt den frågan inom parentes efter pris >.',
      'WHERE pris > (SELECT AVG(pris) FROM produkter)',
    ],
    tests: [
      {
        description: 'De fyra dyraste',
        check: 'rows',
        expected: [
          ['Bryggkaffe Mörk', 89],
          ['Espresso Bönor', 129],
          ['Kaffekopp', 149],
          ['Termos', 299],
        ],
      },
    ],
  },
  {
    id: 'delfragor-02',
    track: 'delfragor',
    db: 'filmer',
    title: 'Hela raden för rekordet',
    xp: 15,
    description:
      'MAX(langd) ger längden, men inte vilken film det är. Hur får man hela raden?',
    explain:
      'Räkna ut rekordet i en delfråga och leta upp raden som har det: `WHERE langd = (SELECT MAX(langd) FROM filmer)`.\n\nFinns det flera med samma rekord kommer alla med – det gör inte `ORDER BY … LIMIT 1`.',
    example:
      'SELECT namn FROM produkter WHERE pris = (SELECT MIN(pris) FROM produkter);',
    task: 'Uppgift: Visa `titel`, `ar` och `langd` för den längsta filmen.',
    starterCode: START,
    solution:
      'SELECT titel, ar, langd\nFROM filmer\nWHERE langd = (SELECT MAX(langd) FROM filmer);\n',
    hints: [
      'Rekordet är SELECT MAX(langd) FROM filmer.',
      'WHERE langd = ( … )',
      'SELECT titel, ar, langd FROM filmer WHERE langd = (SELECT MAX(langd) FROM filmer);',
    ],
    tests: [
      {
        description: 'Fanny och Alexander',
        check: 'rows',
        expected: [['Fanny och Alexander', 1982, 188]],
      },
    ],
  },
  {
    id: 'delfragor-03',
    track: 'delfragor',
    db: 'butik',
    title: 'Finns i listan',
    xp: 15,
    description: 'Vilka kunder har handlat i juni?',
    explain:
      'En delfråga kan ge en hel lista: `WHERE id IN (SELECT kund_id FROM ordrar WHERE …)`.\n\nDen inre frågan ger kund_id för ordrarna i juni, och den yttre plockar ut kunderna vars id finns i listan.',
    example:
      "SELECT titel FROM filmer WHERE regissor_id IN (SELECT id FROM regissorer WHERE land = 'Sverige');",
    task: "Uppgift: Visa `namn` för kunderna som har en order från juni, alltså med `datum` från och med `'2026-06-01'`. Använd `IN` och en delfråga.",
    starterCode: START,
    solution:
      "SELECT namn\nFROM kunder\nWHERE id IN (SELECT kund_id FROM ordrar WHERE datum >= '2026-06-01');\n",
    hints: [
      "Den inre frågan: SELECT kund_id FROM ordrar WHERE datum >= '2026-06-01'",
      'WHERE id IN ( … )',
      'Den yttre frågan hämtar namn från kunder.',
    ],
    tests: [
      {
        description: 'Kunderna som handlat i juni',
        check: 'rows',
        expected: [['Bilal Haddad'], ['Hugo Sjöberg']],
      },
    ],
    sourceChecks: [
      {
        description: 'Frågan använder IN (SELECT …)',
        pattern: /\bIN\s*\(\s*SELECT\b/i,
      },
    ],
  },
  {
    id: 'delfragor-04',
    track: 'delfragor',
    db: 'butik',
    title: 'Finns inte i listan',
    xp: 15,
    description:
      'Vilka produkter har aldrig sålts? I bana 7 gjorde du det med LEFT JOIN.',
    explain:
      '`NOT IN (SELECT …)` behåller raderna som **inte** finns i listan. Det är ofta lättare att läsa än en `LEFT JOIN` med `IS NULL`.\n\nSe upp: finns det ett NULL i listan blir `NOT IN` aldrig sant. Här är `produkt_id` alltid ifyllt.',
    example:
      'SELECT namn FROM kunder WHERE id NOT IN (SELECT kund_id FROM ordrar);',
    task: 'Uppgift: Visa `namn` för produkterna som aldrig förekommer i `orderrader`. Använd `NOT IN`.',
    starterCode: START,
    solution:
      'SELECT namn\nFROM produkter\nWHERE id NOT IN (SELECT produkt_id FROM orderrader);\n',
    hints: [
      'Den inre frågan: SELECT produkt_id FROM orderrader',
      'WHERE id NOT IN ( … )',
      'SELECT namn FROM produkter WHERE id NOT IN (SELECT produkt_id FROM orderrader);',
    ],
    tests: [
      {
        description: 'De två som aldrig sålts',
        check: 'rows',
        expected: [['Kaffe Ljusrost'], ['Rooibos']],
      },
    ],
  },
  {
    id: 'delfragor-05',
    track: 'delfragor',
    db: 'filmer',
    title: 'En fråga per rad',
    xp: 20,
    description: 'Visa varje film med hur många recensioner den har.',
    explain:
      'En delfråga i `SELECT` räknar ut ett värde för varje rad. Den kan använda den yttre radens värden:\n\n`(SELECT COUNT(*) FROM recensioner re WHERE re.film_id = f.id)`\n\nFör varje film `f` räknas just dess recensioner. Det kallas en korrelerad delfråga.',
    example:
      'SELECT namn, (SELECT COUNT(*) FROM ordrar o WHERE o.kund_id = k.id) AS ordrar FROM kunder k;',
    task: 'Uppgift: Visa `titel` och antalet recensioner som `recensioner` för alla filmer, med en delfråga i `SELECT`.',
    starterCode: START,
    solution:
      'SELECT titel,\n  (SELECT COUNT(*) FROM recensioner re WHERE re.film_id = f.id) AS recensioner\nFROM filmer f;\n',
    hints: [
      'Ge filmer aliaset f: FROM filmer f.',
      '(SELECT COUNT(*) FROM recensioner re WHERE re.film_id = f.id)',
      'AS recensioner efter parentesen.',
    ],
    tests: [{ description: 'Antal recensioner per film', check: 'rows' }],
  },
  {
    id: 'delfragor-06',
    track: 'delfragor',
    db: 'butik',
    title: 'En tabell av en fråga',
    xp: 20,
    description:
      'Vad är en order värd i snitt? Först behövs summan för varje order.',
    explain:
      'En delfråga i `FROM` blir en tillfällig tabell som den yttre frågan läser från:\n\n`SELECT AVG(summa) FROM (SELECT order_id, SUM(…) AS summa FROM … GROUP BY order_id)`\n\nSå går det att räkna i två steg: först per order, sedan över alla ordrar.',
    example:
      'SELECT MAX(antal) FROM (SELECT kund_id, COUNT(*) AS antal FROM ordrar GROUP BY kund_id);',
    task: 'Uppgift: Räkna ut snittet av ordrarnas summor, avrundat till heltal, som `snitt`.',
    starterCode: START,
    solution:
      'SELECT ROUND(AVG(summa)) AS snitt\nFROM (\n  SELECT r.order_id, SUM(r.antal * p.pris) AS summa\n  FROM orderrader r\n  JOIN produkter p ON r.produkt_id = p.id\n  GROUP BY r.order_id\n);\n',
    hints: [
      'Den inre frågan är summan per order från bana 6.',
      'FROM ( … ) med den inre frågan i parentesen.',
      'SELECT ROUND(AVG(summa)) AS snitt FROM ( … );',
    ],
    tests: [{ description: 'Snittet av ordrarnas summor', check: 'rows' }],
  },
  {
    id: 'delfragor-07',
    track: 'delfragor',
    db: 'skola',
    title: 'Ge frågan ett namn',
    xp: 20,
    description:
      'Delfrågor blir svåra att läsa när de växer. Det finns ett snyggare sätt.',
    explain:
      '`WITH namn AS ( … )` först ger en fråga ett namn. Sedan används namnet som en tabell:\n\n`WITH elevsnitt AS (SELECT elev_id, AVG(poang) AS snitt FROM resultat GROUP BY elev_id)`\n`SELECT … FROM elevsnitt …`\n\nDet läses uppifrån och ner, steg för steg.',
    example:
      'WITH antal AS (SELECT kund_id, COUNT(*) AS n FROM ordrar GROUP BY kund_id)\nSELECT * FROM antal WHERE n > 1;',
    task: 'Uppgift: Räkna ut varje elevs snitt i en `WITH`. Visa sedan `fornamn` och snittet med en decimal som `snitt` för eleverna med ett snitt över 80, högst först (förnamn vid lika).',
    starterCode: START,
    solution:
      'WITH elevsnitt AS (\n  SELECT elev_id, AVG(poang) AS snitt\n  FROM resultat\n  GROUP BY elev_id\n)\nSELECT e.fornamn, ROUND(s.snitt, 1) AS snitt\nFROM elevsnitt s\nJOIN elever e ON s.elev_id = e.id\nWHERE s.snitt > 80\nORDER BY snitt DESC, e.fornamn;\n',
    hints: [
      'WITH elevsnitt AS (SELECT elev_id, AVG(poang) AS snitt FROM resultat GROUP BY elev_id)',
      'Sedan FROM elevsnitt s JOIN elever e ON s.elev_id = e.id',
      'WHERE s.snitt > 80 ORDER BY snitt DESC, e.fornamn',
    ],
    tests: [
      {
        description: 'Eleverna med snitt över 80',
        check: 'rows',
        ordered: true,
      },
    ],
    sourceChecks: [
      {
        description: 'Frågan använder WITH',
        pattern: /^\s*(--[^\n]*\n\s*)*WITH\b/i,
      },
    ],
  },
  {
    id: 'delfragor-08',
    track: 'delfragor',
    db: 'filmer',
    title: 'Jämför med sin grupp',
    xp: 25,
    description: 'Vilka filmer är längre än snittet i sin egen genre?',
    explain:
      'En korrelerad delfråga kan räkna ut något för just radens grupp:\n\n`WHERE langd > (SELECT AVG(langd) FROM filmer f2 WHERE f2.genre = f.genre)`\n\nSamma tabell står två gånger, med olika alias: `f` är raden som prövas och `f2` är filmerna i samma genre.',
    example:
      'SELECT namn, pris FROM produkter p WHERE pris > (SELECT AVG(pris) FROM produkter p2 WHERE p2.kategori = p.kategori);',
    task: 'Uppgift: Visa `titel`, `genre` och `langd` för filmerna som är längre än snittlängden i sin genre.',
    starterCode: START,
    solution:
      'SELECT titel, genre, langd\nFROM filmer f\nWHERE langd > (SELECT AVG(langd) FROM filmer f2 WHERE f2.genre = f.genre);\n',
    hints: [
      'FROM filmer f',
      'Delfrågan: SELECT AVG(langd) FROM filmer f2 WHERE f2.genre = f.genre',
      'WHERE langd > ( … )',
    ],
    tests: [{ description: 'Längre än genrens snitt', check: 'rows' }],
  },
  {
    id: 'delfragor-09',
    track: 'delfragor',
    db: 'filmer',
    title: 'Finns det någon?',
    xp: 20,
    description: 'Vilka regissörer har gjort en film efter 2015?',
    explain:
      '`EXISTS ( … )` är sant om delfrågan ger minst en rad. Vad den väljer spelar ingen roll, så man skriver ofta `SELECT 1`.\n\n`WHERE EXISTS (SELECT 1 FROM filmer f WHERE f.regissor_id = r.id AND f.ar > 2015)`',
    example:
      "SELECT namn FROM kunder k WHERE EXISTS (SELECT 1 FROM ordrar o WHERE o.kund_id = k.id AND o.status = 'skickad');",
    task: 'Uppgift: Visa `namn` för regissörerna som har minst en film från efter 2015. Använd `EXISTS`.',
    starterCode: START,
    solution:
      'SELECT namn\nFROM regissorer r\nWHERE EXISTS (\n  SELECT 1 FROM filmer f WHERE f.regissor_id = r.id AND f.ar > 2015\n);\n',
    hints: [
      'FROM regissorer r',
      'EXISTS (SELECT 1 FROM filmer f WHERE …)',
      'f.regissor_id = r.id AND f.ar > 2015',
    ],
    tests: [
      {
        description: 'Tre regissörer',
        check: 'rows',
        expected: [['Ruben Östlund'], ['Christopher Nolan'], ['Greta Gerwig']],
      },
    ],
    sourceChecks: [
      { description: 'Frågan använder EXISTS', pattern: /\bEXISTS\s*\(/i },
    ],
  },
];
