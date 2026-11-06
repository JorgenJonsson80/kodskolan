// Bana 4: GROUP BY och HAVING. Inga funktioner som ROUND än (bana 5) och
// ingen JOIN (bana 6), så grupperna visar id:n där namnet står i en annan
// tabell. Sorteringen rättas med ordered: true, så sortera alltid så att
// inga rader kan hamna lika.
const START = '-- Skriv din fråga här\n';

export const GRUPPERA = [
  {
    id: 'gruppera-01',
    track: 'gruppera',
    db: 'butik',
    title: 'Räkna per grupp',
    xp: 15,
    description:
      'COUNT(*) gav ett antal för hela tabellen. Nu vill butiken veta hur många kunder det finns i varje stad.',
    explain:
      '`GROUP BY stad` lägger alla rader med samma stad i en grupp. Sedan räknar `COUNT(*)` raderna i varje grupp, och svaret får en rad per stad.\n\nKolumnen du grupperar på står både i `SELECT` (så att du ser vilken grupp det är) och i `GROUP BY`.',
    example: 'SELECT genre, COUNT(*) FROM filmer GROUP BY genre;',
    task: 'Uppgift: Visa varje `stad` och hur många kunder som bor där, som `antal`.',
    starterCode: START,
    solution: 'SELECT stad, COUNT(*) AS antal FROM kunder GROUP BY stad;\n',
    hints: [
      'Två kolumner: stad och COUNT(*).',
      'GROUP BY stad står efter FROM.',
      'SELECT stad, COUNT(*) AS antal FROM kunder GROUP BY stad;',
    ],
    tests: [
      {
        description: 'Antal kunder per stad',
        check: 'rows',
        expected: [
          ['Göteborg', 3],
          ['Malmö', 2],
          ['Stockholm', 3],
          ['Umeå', 1],
          ['Uppsala', 1],
        ],
      },
      {
        description: 'Kolumnerna är stad och antal',
        check: 'columns',
        expected: ['stad', 'antal'],
      },
    ],
  },
  {
    id: 'gruppera-02',
    track: 'gruppera',
    db: 'butik',
    title: 'Summa per grupp',
    xp: 15,
    description: 'Hur mycket är lagret värt i varje kategori?',
    explain:
      'Alla funktionerna från förra banan fungerar per grupp: `SUM`, `AVG`, `MIN` och `MAX`.\n\n`SUM(pris * lager)` räknar ut värdet för varje rad i gruppen och lägger ihop dem.',
    example: 'SELECT genre, SUM(langd) FROM filmer GROUP BY genre;',
    task: 'Uppgift: Visa varje `kategori` och lagrets värde i den, `SUM(pris * lager)`, som `varde`.',
    starterCode: START,
    solution:
      'SELECT kategori, SUM(pris * lager) AS varde FROM produkter GROUP BY kategori;\n',
    hints: [
      'Gruppera på kategori.',
      'SUM(pris * lager) räknar ihop värdet i varje grupp.',
      'SELECT kategori, SUM(pris * lager) AS varde FROM produkter GROUP BY kategori;',
    ],
    tests: [
      { description: 'Värdet per kategori', check: 'rows' },
      {
        description: 'Kolumnerna är kategori och varde',
        check: 'columns',
        expected: ['kategori', 'varde'],
      },
    ],
  },
  {
    id: 'gruppera-03',
    track: 'gruppera',
    db: 'filmer',
    title: 'Snittbetyget',
    xp: 15,
    description:
      'Varje film har flera recensioner. Vilket snittbetyg har varje film fått?',
    explain:
      'I `recensioner` har varje recension en egen rad med `film_id` och `betyg`. Grupperar du på `film_id` blir det en rad per film, och `AVG(betyg)` ger snittet.\n\nFilmens titel står i en annan tabell. Att koppla ihop dem lär du dig i bana 6.',
    example:
      'SELECT recensent, AVG(betyg) FROM recensioner GROUP BY recensent;',
    task: 'Uppgift: Visa varje `film_id` och filmens snittbetyg som `snitt`.',
    starterCode: START,
    solution:
      'SELECT film_id, AVG(betyg) AS snitt FROM recensioner GROUP BY film_id;\n',
    hints: [
      'Tabellen heter recensioner.',
      'Gruppera på film_id och räkna AVG(betyg).',
      'SELECT film_id, AVG(betyg) AS snitt FROM recensioner GROUP BY film_id;',
    ],
    tests: [{ description: 'Snittbetyget per film', check: 'rows' }],
  },
  {
    id: 'gruppera-04',
    track: 'gruppera',
    db: 'filmer',
    title: 'Sortera grupperna',
    xp: 15,
    description: 'Vilken genre har flest filmer?',
    explain:
      'Efter `GROUP BY` kan du sortera på det du räknat ut, gärna med aliaset: `ORDER BY antal DESC`.\n\nOrdningen i frågan är `SELECT`, `FROM`, `WHERE`, `GROUP BY`, `ORDER BY`, `LIMIT`.',
    example:
      'SELECT stad, COUNT(*) AS antal FROM kunder GROUP BY stad ORDER BY antal DESC;',
    task: 'Uppgift: Visa varje `genre` och antalet filmer som `antal`, med flest först. Har två genrer lika många, ta dem i bokstavsordning.',
    starterCode: START,
    solution:
      'SELECT genre, COUNT(*) AS antal\nFROM filmer\nGROUP BY genre\nORDER BY antal DESC, genre;\n',
    hints: [
      'Gruppera på genre och räkna med COUNT(*).',
      'Sortera på antal med DESC, och sedan på genre.',
      'ORDER BY antal DESC, genre',
    ],
    tests: [
      {
        description: 'Flest först',
        check: 'rows',
        ordered: true,
        expected: [
          ['Drama', 7],
          ['Komedi', 5],
          ['Animerat', 2],
          ['Sci-fi', 2],
        ],
      },
    ],
  },
  {
    id: 'gruppera-05',
    track: 'gruppera',
    db: 'butik',
    title: 'Filtrera först',
    xp: 15,
    description:
      'Butiken vill bara räkna ordrar som faktiskt kommit fram, inte de avbrutna.',
    explain:
      '`WHERE` tar bort rader **innan** de grupperas. Här tas de ordrar bort som inte är levererade, och sedan räknas resten per kund.\n\n`WHERE` står före `GROUP BY`.',
    example:
      'SELECT genre, COUNT(*) FROM filmer WHERE ar > 2000 GROUP BY genre;',
    task: 'Uppgift: Visa varje `kund_id` och hur många levererade ordrar (`status` är `levererad`) kunden har, som `antal`.',
    starterCode: START,
    solution:
      "SELECT kund_id, COUNT(*) AS antal\nFROM ordrar\nWHERE status = 'levererad'\nGROUP BY kund_id;\n",
    hints: [
      "WHERE status = 'levererad' först.",
      'Sedan GROUP BY kund_id.',
      "SELECT kund_id, COUNT(*) AS antal FROM ordrar WHERE status = 'levererad' GROUP BY kund_id;",
    ],
    tests: [{ description: 'Levererade ordrar per kund', check: 'rows' }],
  },
  {
    id: 'gruppera-06',
    track: 'gruppera',
    db: 'butik',
    title: 'Filtrera grupper',
    xp: 20,
    description:
      'Vilka kunder har handlat minst två gånger? De ska få ett tack.',
    explain:
      '`WHERE` tittar på en rad i taget, så där går det inte att skriva `COUNT(*) >= 2`. För att filtrera **grupper** skriver du `HAVING` efter `GROUP BY`:\n\n`GROUP BY kund_id HAVING COUNT(*) >= 2`',
    example:
      'SELECT genre, COUNT(*) FROM filmer GROUP BY genre HAVING COUNT(*) > 3;',
    task: 'Uppgift: Visa `kund_id` och antal ordrar som `antal` för kunderna med minst 2 ordrar.',
    starterCode: START,
    solution:
      'SELECT kund_id, COUNT(*) AS antal\nFROM ordrar\nGROUP BY kund_id\nHAVING COUNT(*) >= 2;\n',
    hints: [
      'Gruppera på kund_id och räkna med COUNT(*).',
      'HAVING står efter GROUP BY.',
      'HAVING COUNT(*) >= 2',
    ],
    tests: [
      {
        description: 'Kunderna med minst två ordrar',
        check: 'rows',
        expected: [
          [1, 3],
          [2, 3],
          [4, 2],
          [5, 2],
          [8, 2],
        ],
      },
    ],
  },
  {
    id: 'gruppera-07',
    track: 'gruppera',
    db: 'skola',
    title: 'De bästa snitten',
    xp: 20,
    description:
      'Skolan ska dela ut ett stipendium till eleverna med ett snitt över 85 poäng.',
    explain:
      'I `HAVING` går alla funktionerna att använda: `HAVING AVG(poang) > 85`.\n\nKom ihåg skillnaden: `WHERE` filtrerar rader före grupperingen, `HAVING` filtrerar grupper efter.',
    example:
      'SELECT film_id, AVG(betyg) FROM recensioner GROUP BY film_id HAVING AVG(betyg) >= 4.5;',
    task: 'Uppgift: Visa `elev_id` och snittet av `poang` som `snitt` för eleverna vars snitt är över 85.',
    starterCode: START,
    solution:
      'SELECT elev_id, AVG(poang) AS snitt\nFROM resultat\nGROUP BY elev_id\nHAVING AVG(poang) > 85;\n',
    hints: [
      'Gruppera resultat på elev_id.',
      'AVG(poang) ger snittet.',
      'HAVING AVG(poang) > 85',
    ],
    tests: [{ description: 'Eleverna med snitt över 85', check: 'rows' }],
  },
  {
    id: 'gruppera-08',
    track: 'gruppera',
    db: 'skola',
    title: 'Två grupper i en',
    xp: 15,
    description: 'Hur många elever i varje klass är födda vilket år?',
    explain:
      'Du kan gruppera på flera kolumner: `GROUP BY klass, fodd`. Då blir det en grupp för varje kombination som finns, som 9A och 2011.\n\nAlla kolumner du grupperar på står i `SELECT`, så att man ser vilken grupp raden gäller.',
    example: 'SELECT genre, ar, COUNT(*) FROM filmer GROUP BY genre, ar;',
    task: 'Uppgift: Visa `klass`, `fodd` och antalet elever som `antal`, en rad för varje klass och födelseår.',
    starterCode: START,
    solution:
      'SELECT klass, fodd, COUNT(*) AS antal FROM elever GROUP BY klass, fodd;\n',
    hints: [
      'Gruppera på två kolumner med kommatecken mellan.',
      'GROUP BY klass, fodd',
      'SELECT klass, fodd, COUNT(*) AS antal FROM elever GROUP BY klass, fodd;',
    ],
    tests: [
      {
        description: 'En rad per klass och år',
        check: 'rows',
        expected: [
          ['9A', 2010, 1],
          ['9A', 2011, 5],
          ['9B', 2010, 1],
          ['9B', 2011, 5],
        ],
      },
    ],
  },
  {
    id: 'gruppera-09',
    track: 'gruppera',
    db: 'bibliotek',
    title: 'Mest utlånade',
    xp: 20,
    description:
      'Vilka böcker lånas mest? Biblioteket funderar på att köpa fler ex.',
    explain:
      'Nu sätter du ihop allt: gruppera, räkna, filtrera grupperna och sortera.\n\nTänk i den ordning databasen gör: `FROM` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `ORDER BY` → `LIMIT`.',
    example:
      'SELECT kund_id, COUNT(*) AS antal FROM ordrar GROUP BY kund_id HAVING COUNT(*) > 1 ORDER BY antal DESC, kund_id;',
    task: 'Uppgift: Visa `bok_id` och antal lån som `antal` för böckerna som lånats mer än en gång, med lägst `bok_id` först.',
    starterCode: START,
    solution:
      'SELECT bok_id, COUNT(*) AS antal\nFROM lan\nGROUP BY bok_id\nHAVING COUNT(*) > 1\nORDER BY bok_id;\n',
    hints: [
      'Gruppera lan på bok_id.',
      'HAVING COUNT(*) > 1 behåller böckerna med fler än ett lån.',
      'Sist ORDER BY bok_id.',
    ],
    tests: [
      {
        description: 'Böckerna som lånats mer än en gång',
        check: 'rows',
        ordered: true,
        expected: [
          [1, 2],
          [9, 2],
          [11, 2],
        ],
      },
    ],
  },
];
