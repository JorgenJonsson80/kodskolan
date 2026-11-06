# SQL-kursen

Ställ frågor till data, från första `SELECT` till egna databaser och
fönsterfunktioner. För den som aldrig kodat, men också för den som
jobbar med listor, Excel och rapporter.

Eleven skriver SQL mot en liten svensk databas, och svaret visas som en
tabell. Databasen skapas på nytt vid varje körning (SQLite i
WebAssembly, `sql.js`), så det gör inget om eleven råkar radera allt.

## Databaserna

`src/courses/sql/data/databases.js`. Namnen är svenska utan å, ä och ö.
"Idag" är alltid 2026-06-15, så att svaren inte ändras med tiden.

- **butik** – kaffebutiken Bönan: `kunder`, `produkter`, `ordrar`,
  `orderrader`
- **filmer** – `regissorer`, `filmer`, `recensioner` (betyg 1–5,
  påhittade)
- **skola** – `elever` (9A och 9B), `kurser`, `resultat` (0–100)
- **bibliotek** – `bocker`, `lantagare`, `lan` (`aterlamnad` är NULL så
  länge boken är utlånad)
- **pensionat** – slutprojektets hundpensionat: `agare`, `hundar`, `rum`,
  `vistelser`. Tabellerna finns också en och en i `PENSIONAT_TABLES`,
  eftersom banan bygger dem själv först

Ändras en databas kan många övningar få nya svar. Kör alla tester.

## Banorna

| #  | id            | Bana                | Lär ut                                                        |
| -- | ------------- | ------------------- | ------------------------------------------------------------- |
| 1  | `select`      | Första frågan       | `SELECT`, `FROM`, `*`, kolumner, uträkningar, `LIMIT`, `--`, `;` |
| 2  | `filtrera`    | Filtrera            | `WHERE`, `= <> < >`, `AND`, `OR`, `IN`, `BETWEEN`, `LIKE`, `IS NULL` |
| 3  | `sortera`     | Sortera och räkna   | `ORDER BY`, `DISTINCT`, `AS`, `COUNT` `SUM` `AVG` `MIN` `MAX` |
| 4  | `gruppera`    | Gruppera            | `GROUP BY`, `HAVING`                                          |
| 5  | `omvandla`    | Räkna och omvandla  | `ROUND`, `UPPER`, `LENGTH`, `\|\|`, `CASE WHEN`, `strftime`   |
| 6  | `join`        | Flera tabeller      | nycklar, `JOIN … ON`, alias                                   |
| 7  | `saknas`      | Det som saknas      | `LEFT JOIN`, `NULL`, `COALESCE`                               |
| 8  | `andra`       | Ändra data          | `INSERT`, `UPDATE`, `DELETE`                                  |
| 9  | `skapa`       | Bygg en databas     | `CREATE TABLE`, typer, `PRIMARY KEY`, `NOT NULL`, `REFERENCES` |
| 10 | `delfragor`   | Frågor i frågor     | delfrågor, `IN (SELECT …)`, `WITH`                            |
| 11 | `felsok`      | Felsökning          | trasiga frågor att laga (startkoden är trasig)                |
| 12 | `fonster`     | Fönsterfunktioner   | `ROW_NUMBER`, `RANK`, `OVER (PARTITION BY … ORDER BY …)`      |
| 13 | `slutprojekt` | Slutprojektet       | en egen databas med rapportfrågor                             |

Varje bana: 9 övningar och en boss, tre projekt med tre steg, tre idéer
till Lekplatsen, fyra quizfrågor och minst två länkar i Fastnat?. Alla
13 banor är klara: 130 övningar, 39 projekt med 117 steg, 39 idéer och
52 quizfrågor.

I Felsökning (bana 11) är startkoden trasig, och projektstegen där har
egen `starterCode` med ett nytt fel i varje steg. Ett projekt kan ha
`setup` med egna tabeller (Ligatabellen, Mitt Wrapped), som följer med
till varje steg precis som `db`. Ligatabellen använder `UNION ALL`, som
inte har någon egen övning.

## En övning

Som i de andra kurserna (`id`, `track`, `title`, `xp`, `description`,
`explain`, `example`, `task`, `starterCode`, `solution`, `hints`,
`tests`), och:

- `db` – databasen (`'butik'` …), eller `null` för en tom databas.
  `setup` är extra SQL som körs efter databasen.
- Testerna jämför elevens svar med facits (`engine.js`):
  - `{ check: 'rows' }` – samma rader som facit. Ordningen spelar
    bara roll med `ordered: true`, och då bara när uppgiften säger
    hur det ska sorteras.
  - `{ check: 'columns' }` – samma kolumnnamn. Använd det bara när
    namnen står i uppgiften (inte för uträkningar utan `AS`).
  - `{ query: 'SELECT …' }` – körs efteråt i elevens och facits
    databas. Så rättas `INSERT`, `UPDATE`, `DELETE` och `CREATE TABLE`.
  - `expected` jämför med ett fast svar i stället för facit. Sätt det
    på små svar, så att testerna också kollar att facit är rätt.
- Bara den sista frågans svar rättas och visas.
- `sourceChecks` som i HTML-kursen, t.ex. att en kommentar finns.
- Facit får inte varna (dubbla citattecken för text, `= NULL`,
  `UPDATE`/`DELETE` utan `WHERE`).
- Facit får inte använda något före sin bana (`test/concepts.js`):
  inget `WHERE` före bana 2, ingen `ORDER BY`, `AS` eller `COUNT` före
  bana 3, ingen `GROUP BY` före 4, inga funktioner eller `CASE` före 5,
  ingen `JOIN` före 6, ingen `LEFT JOIN` före 7, inga ändringar före 8,
  ingen `CREATE TABLE` före 9, inga delfrågor eller `WITH` före 10 och
  inget `OVER` före 12.
