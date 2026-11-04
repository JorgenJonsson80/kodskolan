# JavaScript-kursen

JS Academy (JavaScript och React) som kurs i Kodskolan. Sökvägarna
nedan utgår från den här mappen, `src/courses/js/`. JS Academy byggdes
först och har ingen egen SPEC; reglerna för innehållet står här och i
`docs/kurser/js.md`.

`index.jsx` är kursen enligt kontraktet i `SPEC.md` i roten.
`runtime.js` översätter JS Academys rättning till kontraktet: workern
svarar med fel som text och tester med `actual`/`expected`, och här blir
det `syntaxError`/`error` som objekt och testrader med `text` och
`diff`. Ett fel som skrivits ut sist i konsolen underkänner inget (det
kan vara med flit), men förklaras. Stiltipsen (`notes`) blir
`warnings` efter första banan.

`useWorkbench.jsx` ger filerna övningen importerar från, filnamnet,
Kör rad för rad (JavaScript-banorna till och med `debug-js`) och vad
som ska förhandsvisas. På Lekplatsen finns ⚛️ React-komponent som egen
plats (`playground.slots`).

Framstegen: samma nycklar (`academy-`) och tabell (`progress`) som JS
Academy. `progress` i `index.jsx` gör om JS Academys klarade quiz
(`academy-passed-tracks` och kolumnen `passed_track_ids`) till
`<bana>-testad` och tillbaka, så att den gamla sajten fortsätter
fungera. Tabellen har inga projektlägen, så de sparas bara i
webbläsaren.

## Arkitektur

- `data/` – innehållet är data, inte kod:
  - `tracks.js` banorna i ordning, med `docs`-länkar och belöning
  - `lesson.js` alla övningar, `projects.js` miniprojekten efter varje bana
  - `ideas.js` egna idéer för Lekplatsen, `resources.js` javascript.info-
    och YouTube-sökningar för Fastnat?-panelen, `quiz.js` nivåtestet
- `runner/` – kör elevens kod:
  - `runTests.js` startar en ny Web Worker per körning med 2 s timeout, så
    att en oändlig loop aldrig fryser sidan
  - `evaluate.js` rättar (tester, konsolutskrift, stiltips) och
    `stepThrough` för Kör rad för rad
  - `instrument.js` skriver om koden med Babel så att varje sats sparar ett
    steg med variablernas värden
  - `modules.js` eget modulsystem för import/export, `jsx.js` via sucrase
  - `fakes.js` låtsasversioner av localStorage, fetch och timers – elevens
    kod får aldrig röra appens riktiga data
  - `livePreview.js` + `renderTracker.js` förhandsvisning av komponenter
    och loggen "Varför renderade den?"
  - `friendlyErrors.js` förklarar vanliga felmeddelanden på svenska
- `editor/codeInfo.js` – hover ("vad tillhör det här?") och förslag
  efter punkt, byggt på CodeMirrors syntaxträd
- `components/` – det bara JS visar: `Preview.jsx` (komponenten och
  renderloggen), `StepPanel.jsx`, `FileView.jsx`, `ErrorHint.jsx`.

## En övning

```js
{
  id: 'functions-04', track: 'functions', title: '…', xp: 10,
  description: '…',          // kort intro
  explain: '…',              // "Ny på det här?" – för den som aldrig sett det
  example: '…',              // kod som visar idén, inte lösningen
  task: 'Uppgift: …',        // `backticks` visas som kod
  starterCode: '// Skriv din kod här',
  solution: '…',             // facit
  hints: ['…', '…', '…'],    // från vag till nästan lösningen
  tests: [{ description: '…', code: 'getDiscount(150)', expected: 20 }],
  sourceChecks: [{ description: '…', pattern: /for\s*\(/, forbidden: true }],
  isBoss, addedLater, fileName, files, preview, // vid behov
}
```

Konsoltester använder `code: '__logs'` och en array som `expected`.
