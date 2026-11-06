# SQL-kursen

Den första kursen som byggdes direkt i Kodskolan. Kursens SPEC
(banorna, databaserna och reglerna för innehållet) finns i
`docs/kurser/sql.md`. Sökvägarna nedan utgår från den här mappen,
`src/courses/sql/`.

`index.jsx` är kursen enligt kontraktet i `SPEC.md` i roten.

## Arkitektur

- `runner/engine.js` – kör elevens SQL och facit i var sin ny databas
  och rättar (`runSql`). Samma fil i webbläsaren och i testerna. Svaret
  har kontraktets form och `table` (sista resultatet, högst 200 rader).
  Vid fel räknas raden och ett förslag ut (`closest`: felstavat,
  ombytta bokstäver eller början av ett namn, som `kund` → `kunder`).
  Varnar för text i dubbla citattecken, `= NULL` och `UPDATE`/`DELETE`
  utan `WHERE`. `describeDatabase` ger tabellerna till 📋 Tabellerna och
  editorn.
- `runner/sqlWorker.js` och `runner/sql.js` – en varm worker med
  sql.js. Wasm-filen ingår i bygget (`?url`). 3 sekunders tidsgräns,
  sedan `terminate()` och en ny worker, som i Python-kursen.
- `runner/evaluate.js` – feedback i klartext ("frågan gav 10 rader men
  ska ge 2", "raden X ska inte vara med, men Y saknas"), och raderna
  till 🔍 Visa skillnaden.
- `runner/friendlyErrors.js` – SQLites fel på svenska, med förslaget.
- `useWorkbench.jsx` – övningens databas: `runOptions` får `setup` och
  `solution`, `editor.context` får tabellerna (`lib/useTables.js`, en
  gång per databas) och `beforeEditor` visar `components/TablesPanel.jsx`
  och databasvalet på Lekplatsen.
- `components/ResultTable.jsx` – svaret som tabell (`ResultPreview`).
- `editor/extensions.js` – `@codemirror/lang-sql` (SQLite) med
  övningens tabeller som förslag, och hovern. `editor/codeInfo.js` har
  tabellerna med nyckelord och funktioner. Lägg till dem när nya banor
  använder dem.
- `data/` – innehållet är data, inte kod: `databases.js`, `tracks.js`,
  `lessons/` (en fil per bana, `bossar.js`, `index.js`), `projects.js`
  (`db` på projektet gäller alla steg), `ideas.js` (med `db`),
  `quiz.js` (en fråga med `db` körs i `quiz.test.js`) och
  `resources.js`. `db: null` är en tom databas (banorna 9 och 13, och
  idéer där eleven bygger själv). Ett projekt kan ha `setup`, som följer
  med till alla steg.
- Sortering rättas med `ordered: true`. Se till att det sorteras på
  värden utan dubbletter (lägg till en kolumn till i `ORDER BY` och i
  uppgiften), annars kan ett rätt svar underkännas.
- `test/nodeSql.js` – sql.js i Node, `test/concepts.js` – vad facit
  inte får använda före sin bana.

Testerna (`npx vitest run src/courses/sql`) kör varje facit och
startkod på riktigt. För att se vad facit ger: skriv ett litet skript som
importerar `LESSONS` och `nodeRunLesson` och kör det med `npx vite-node`.
