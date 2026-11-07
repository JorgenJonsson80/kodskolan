# TypeScript-kursen

Kursens SPEC (banorna, kompilatorn och reglerna för innehållet) finns i
`docs/kurser/typescript.md`. Sökvägarna nedan utgår från den här mappen,
`src/courses/ts/`.

`index.jsx` är kursen enligt kontraktet i `SPEC.md` i roten. Kursen
återanvänder JS-kursens körning, förhandsvisning och React
(`../js/runtime`, `../js/components/ResultPreview`), så ändringar där
påverkar båda.

## Arkitektur

- `runner/checker.js` – TypeScripts kompilator som en LanguageService
  över ett påhittat filsystem: `check` (typfel och typtesterna),
  `diagnostics` (lappen i editorn), `quickInfo` (hovern) och
  `completions` (förslagen). `toJavaScript` tar bort typerna. Samma fil
  i workern och i testerna.
- `runner/libs.js` – typerna kompilatorn läser: `lib.es*` från
  `typescript/lib`, `globals.d.ts` (låtsas-webbläsaren) och
  `@types/react`, som `?raw`.
- `runner/tsWorker.js` och `runner/ts.js` – en varm worker med
  kompilatorn och status (Startar TypeScript…). Ingen timeout: en
  typkontroll tar alltid slut. Elevens kod körs i JS-kursens worker.
- `runtime.js` – `createRunTs` kontrollerar typerna, kör sedan
  JavaScript-versionen med `runJs` och lägger typtesterna först i
  testlistan. `evaluateTs` är JS-kursens feedback utan stiltips.
- `runner/friendlyErrors.js` – typfelen på svenska efter felets nummer.
  `friendlyErrors.test.js` kör riktiga fel genom kompilatorn.
- `editor/extensions.js` – TypeScript i CodeMirror (`tsx` när koden har
  JSX), röd linje för typfel (`@codemirror/lint`), förslag och hover från
  kompilatorn, Prettier med TypeScript-tolken. `editor/codeInfo.js` har
  TypeScripts nyckelord på svenska.
- `useWorkbench.jsx` – filnamnet (`main.ts`/`main.tsx`), typtesterna till
  `run` och komponenten Lekplatsen visar.
- `test/nodeTs.js` – samma rättning i Node (`nodeCheck`), och
  `test/concepts.js` – vad facit inte får använda före sin bana.
- `data/` – `tracks.js`, `lessons/` (en fil per bana, `bossar.js`,
  `index.js`), `projects.js`, `ideas.js`, `quiz.js` (`check: 'log'` eller
  `'typeError'` körs i `quiz.test.js`) och `resources.js`.
