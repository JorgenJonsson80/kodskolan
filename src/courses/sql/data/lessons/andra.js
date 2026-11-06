// Bana 8: INSERT, UPDATE och DELETE. Databasen skapas på nytt vid varje
// körning, så eleven kan inte förstöra något. Ändringarna rättas med en
// fråga efteråt (query), som körs i elevens och i facits databas.
const START = '-- Skriv din kod här\n';

export const ANDRA = [
  {
    id: 'andra-01',
    track: 'andra',
    db: 'butik',
    title: 'En ny rad',
    xp: 15,
    description:
      'Hittills har du bara läst. Nu ska du ändra i databasen, och först kommer en ny kund.',
    explain:
      '`INSERT INTO kunder (namn, stad, epost, fodd) VALUES (…)` lägger till en rad. Kolumnerna och värdena står i samma ordning.\n\n`id` behöver du inte ge: en kolumn med `INTEGER PRIMARY KEY` får nästa nummer av sig själv.\n\nDatabasen skapas på nytt varje gång du kör, så du kan prova hur mycket du vill.',
    example:
      "INSERT INTO produkter (namn, kategori, pris, lager) VALUES ('Muffins', 'Bakverk', 30, 20);",
    task: 'Uppgift: Lägg till kunden `Karin Moberg` från `Lund`, med e-post `karin@exempel.se` och född 1992.',
    starterCode: START,
    solution:
      "INSERT INTO kunder (namn, stad, epost, fodd)\nVALUES ('Karin Moberg', 'Lund', 'karin@exempel.se', 1992);\n",
    hints: [
      'INSERT INTO kunder (namn, stad, epost, fodd)',
      'VALUES och värdena inom parentes, i samma ordning.',
      "VALUES ('Karin Moberg', 'Lund', 'karin@exempel.se', 1992);",
    ],
    tests: [
      {
        description: 'Karin finns med id 11',
        query: 'SELECT id, namn, stad, epost, fodd FROM kunder WHERE id = 11',
        expected: [[11, 'Karin Moberg', 'Lund', 'karin@exempel.se', 1992]],
      },
      {
        description: 'Det finns 11 kunder',
        query: 'SELECT COUNT(*) FROM kunder',
        expected: [[11]],
      },
    ],
  },
  {
    id: 'andra-02',
    track: 'andra',
    db: 'butik',
    title: 'Flera rader på en gång',
    xp: 15,
    description: 'Butiken börjar sälja två nya teer.',
    explain:
      'Efter `VALUES` kan det stå flera rader, med kommatecken mellan:\n\n`VALUES (…), (…);`',
    example:
      "INSERT INTO kunder (namn, stad) VALUES ('Leo Ek', 'Lund'), ('Mira Ek', 'Lund');",
    task: 'Uppgift: Lägg till `Chai` och `Mynta`, båda i kategorin `Te`. Chai kostar 69 kr och 20 finns i lager, Mynta kostar 49 kr och 15 finns i lager.',
    starterCode: START,
    solution:
      "INSERT INTO produkter (namn, kategori, pris, lager)\nVALUES ('Chai', 'Te', 69, 20), ('Mynta', 'Te', 49, 15);\n",
    hints: [
      'INSERT INTO produkter (namn, kategori, pris, lager)',
      'Två parenteser efter VALUES, med kommatecken mellan.',
      "VALUES ('Chai', 'Te', 69, 20), ('Mynta', 'Te', 49, 15);",
    ],
    tests: [
      {
        description: 'De två teerna finns',
        query:
          'SELECT namn, kategori, pris, lager FROM produkter WHERE id > 12',
        expected: [
          ['Chai', 'Te', 69, 20],
          ['Mynta', 'Te', 49, 15],
        ],
      },
    ],
  },
  {
    id: 'andra-03',
    track: 'andra',
    db: 'bibliotek',
    title: 'Bara det du vet',
    xp: 15,
    description: 'En ny låntagare har bara lämnat sitt namn.',
    explain:
      'Kolumner du inte nämner i `INSERT` blir `NULL` (eller sitt standardvärde). Det går bra så länge kolumnen inte är `NOT NULL`.\n\nKolla i **📋 Tabellerna** vad som måste finnas. I `lantagare` är det bara `namn`.',
    example: "INSERT INTO kunder (namn) VALUES ('Okänd kund');",
    task: 'Uppgift: Lägg till låntagaren `Nils Berg` utan telefonnummer.',
    starterCode: START,
    solution: "INSERT INTO lantagare (namn) VALUES ('Nils Berg');\n",
    hints: [
      'Nämn bara kolumnen namn.',
      'INSERT INTO lantagare (namn)',
      "VALUES ('Nils Berg');",
    ],
    tests: [
      {
        description: 'Nils finns, utan telefon',
        query:
          "SELECT id, namn, telefon FROM lantagare WHERE namn = 'Nils Berg'",
        expected: [[7, 'Nils Berg', null]],
      },
    ],
  },
  {
    id: 'andra-04',
    track: 'andra',
    db: 'butik',
    title: 'Ändra ett värde',
    xp: 15,
    description: 'Kanelbullen (id 7) blir dyrare: 28 kronor.',
    explain:
      '`UPDATE produkter SET pris = 28 WHERE id = 7` ändrar priset på raden med id 7.\n\n**`WHERE` är livsviktigt.** Utan det ändras *alla* rader i tabellen. Peka ut raden med id när du kan – det är säkrast.',
    example: "UPDATE kunder SET stad = 'Lund' WHERE id = 3;",
    task: 'Uppgift: Ändra priset på kanelbullen (`id` 7) till 28.',
    starterCode: START,
    solution: 'UPDATE produkter SET pris = 28 WHERE id = 7;\n',
    hints: [
      'UPDATE produkter SET pris = 28',
      'Glöm inte WHERE, annars ändras alla priser.',
      'UPDATE produkter SET pris = 28 WHERE id = 7;',
    ],
    tests: [
      {
        description: 'Kanelbullen kostar 28',
        query: 'SELECT pris FROM produkter WHERE id = 7',
        expected: [[28]],
      },
      {
        description: 'Inget annat pris ändrades',
        query: 'SELECT id, pris FROM produkter WHERE id <> 7',
      },
    ],
  },
  {
    id: 'andra-05',
    track: 'andra',
    db: 'butik',
    title: 'Räkna fram det nya värdet',
    xp: 20,
    description: 'Allt te blir 10 procent dyrare.',
    explain:
      'Efter `SET` kan det stå en uträkning med radens egna värden: `SET pris = pris * 1.1` tar det gamla priset gånger 1,1.\n\nAnvänd `WHERE` för att välja vilka rader som ändras, precis som i `SELECT`.',
    example: 'UPDATE produkter SET lager = lager + 10 WHERE lager < 10;',
    task: 'Uppgift: Höj priset med 10 % (`pris * 1.1`) på alla produkter i kategorin `Te`.',
    starterCode: START,
    solution: "UPDATE produkter SET pris = pris * 1.1 WHERE kategori = 'Te';\n",
    hints: [
      'SET pris = pris * 1.1',
      "WHERE kategori = 'Te'",
      "UPDATE produkter SET pris = pris * 1.1 WHERE kategori = 'Te';",
    ],
    tests: [
      {
        description: 'Alla priser är rätt efteråt',
        query: 'SELECT id, pris FROM produkter',
      },
    ],
  },
  {
    id: 'andra-06',
    track: 'andra',
    db: 'bibliotek',
    title: 'Tillbaka på hyllan',
    xp: 15,
    description:
      'Tove kommer tillbaka med Ronja Rövardotter idag. Det är lån nummer 7.',
    explain:
      "Ett datum ändras som all annan text. Idag är det `'2026-06-15'`.\n\nVill du ändra flera kolumner på en gång skriver du dem med kommatecken: `SET a = 1, b = 2`.",
    example: "UPDATE lan SET forfaller = '2026-07-01' WHERE id = 10;",
    task: "Uppgift: Sätt `aterlamnad` till `'2026-06-15'` för lånet med `id` 7.",
    starterCode: START,
    solution: "UPDATE lan SET aterlamnad = '2026-06-15' WHERE id = 7;\n",
    hints: [
      'UPDATE lan SET aterlamnad = …',
      "Datumet är text: '2026-06-15'.",
      'WHERE id = 7',
    ],
    tests: [
      {
        description: 'Lån 7 är återlämnat idag',
        query: 'SELECT aterlamnad FROM lan WHERE id = 7',
        expected: [['2026-06-15']],
      },
      {
        description: 'Inga andra lån ändrades',
        query: 'SELECT id, aterlamnad FROM lan WHERE id <> 7',
      },
    ],
  },
  {
    id: 'andra-07',
    track: 'andra',
    db: 'butik',
    title: 'Ta bort rader',
    xp: 15,
    description:
      'Två produkter är slut i lager och ska inte säljas mer. De har aldrig sålts, så de kan tas bort.',
    explain:
      '`DELETE FROM produkter WHERE lager = 0` tar bort raderna som matchar.\n\nSkriv gärna en `SELECT` med samma `WHERE` först och kolla att det är rätt rader. Utan `WHERE` töms hela tabellen.',
    example: "DELETE FROM kunder WHERE stad = 'Umeå';",
    task: 'Uppgift: Ta bort produkterna som har `lager` 0.',
    starterCode: START,
    solution: 'DELETE FROM produkter WHERE lager = 0;\n',
    hints: [
      'DELETE FROM produkter',
      'WHERE lager = 0',
      'DELETE FROM produkter WHERE lager = 0;',
    ],
    tests: [
      {
        description: 'Tio produkter är kvar',
        query: 'SELECT COUNT(*) FROM produkter',
        expected: [[10]],
      },
      {
        description: 'Inga produkter med tomt lager',
        query: 'SELECT COUNT(*) FROM produkter WHERE lager = 0',
        expected: [[0]],
      },
    ],
  },
  {
    id: 'andra-08',
    track: 'andra',
    db: 'butik',
    title: 'I rätt ordning',
    xp: 25,
    description:
      'Den avbrutna ordern (id 5) ska bort helt. Men den har en rad i orderrader.',
    explain:
      'En order med rader i `orderrader` går inte att ta bort först: raderna pekar på den, och då blir det `FOREIGN KEY constraint failed`.\n\nTa bort i rätt ordning – först det som pekar, sedan det som pekas på:\n\n`DELETE FROM orderrader WHERE order_id = 5;`\n`DELETE FROM ordrar WHERE id = 5;`',
    example:
      'DELETE FROM recensioner WHERE film_id = 16;\nDELETE FROM filmer WHERE id = 16;',
    task: 'Uppgift: Ta bort order 5 och dess rader i `orderrader`.',
    starterCode: START,
    solution:
      'DELETE FROM orderrader WHERE order_id = 5;\nDELETE FROM ordrar WHERE id = 5;\n',
    hints: [
      'Två DELETE, med semikolon mellan.',
      'Först orderrader, sedan ordrar.',
      'DELETE FROM orderrader WHERE order_id = 5; och DELETE FROM ordrar WHERE id = 5;',
    ],
    tests: [
      {
        description: 'Order 5 är borta',
        query: 'SELECT COUNT(*) FROM ordrar WHERE id = 5',
        expected: [[0]],
      },
      {
        description: 'Dess rader är borta, men inga andra',
        query: 'SELECT COUNT(*) FROM orderrader',
        expected: [[26]],
      },
    ],
  },
  {
    id: 'andra-09',
    track: 'andra',
    db: 'butik',
    title: 'Rea på bakverk',
    xp: 20,
    description: 'Det dyraste bakverket ska få 20 kronor rabatt.',
    explain:
      'Ett `WHERE` i `UPDATE` kan ha flera villkor, precis som i `SELECT`.\n\nEtt bra vanemönster: skriv `SELECT * FROM produkter WHERE …` först, kör, och kolla att det är rätt rader. Byt sedan `SELECT * FROM` mot `UPDATE … SET`.',
    example:
      "UPDATE produkter SET lager = 0 WHERE kategori = 'Te' AND pris > 60;",
    task: 'Uppgift: Sänk priset med 20 kr (`pris - 20`) på produkterna i kategorin `Bakverk` som kostar mer än 40 kr.',
    starterCode: START,
    solution:
      "UPDATE produkter SET pris = pris - 20\nWHERE kategori = 'Bakverk' AND pris > 40;\n",
    hints: [
      'SET pris = pris - 20',
      'Två villkor med AND.',
      "WHERE kategori = 'Bakverk' AND pris > 40",
    ],
    tests: [
      {
        description: 'Morotskakan kostar 25',
        query: 'SELECT pris FROM produkter WHERE id = 9',
        expected: [[25]],
      },
      {
        description: 'Inget annat pris ändrades',
        query: 'SELECT id, pris FROM produkter WHERE id <> 9',
      },
    ],
  },
];
