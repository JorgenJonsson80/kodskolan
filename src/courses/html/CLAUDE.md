# HTML & CSS-kursen

HTML & CSS Academy som kurs i Kodskolan. Kursens SPEC (banorna och
reglerna för innehållet) finns i `docs/kurser/html.md`. Sökvägarna nedan
utgår från den här mappen, `src/courses/html/`.

`index.jsx` är kursen enligt kontraktet i `SPEC.md` i roten. Sidan
rättas i webbläsaren direkt (`runner/page.js`), så kursen har ingen
`onStatus`, ingen Kör-knapp på Lekplatsen (`playground.runs: false`)
och `useWorkbench.jsx` visar bara förhandsvisningen. `html.css` är
förhandsvisningens stilar. Bilderna övningarna använder ligger i
`public/bilder/`.

Testerna körs i två omgångar: i Node med jsdom, och `*.browser.test.js`
i riktig Chrome (vitest browser mode med Playwright), där layouten mäts.

## Arkitektur

- `runner/checkPage.js` – rättar ett färdigt dokument: kör
  testuttrycken med hjälparna (`text`, `texts`, `count`, `attr`, `css`,
  `color`, `$`, `$$`, `doc`) och svarar som körningen i Python Academy
  (`syntaxError`, `error`, `tests`, `output`, `console`). Hjälparna för
  CSS (`colorOf`, `colorsOf`, `colorName`, `hover`, `px`, `font`,
  `boxWidth`, `centered`) ger samma svar i jsdom och i webbläsaren – se
  tabellen i SPEC.md. Färgnamnen finns i `runner/cssColors.js`.
- `runner/page.js` – laddar elevens kod i en osynlig iframe
  (`sandbox="allow-same-origin"`, inga skript) och kör `checkPage`.
- `test/nodePage.js` – samma rättning med jsdom i testerna. jsdom
  räknar inte ut layout, så övningar som mäter layout (`rows`, `perRow`,
  `gapX` … eller ett test med `width`) rättas bara i Chrome
  (`test/grading.browser.test.js`). Den rättar också att jsdom inte ärver
  `text-align` m.fl. och låter sin egen `:link`-färg vinna över elevens.
- `runner/tailwind.js` – bana 12. Elevens skriptrad för
  `@tailwindcss/browser` (`tailwindScript.js`) byts mot CSS som npm-paketet
  `tailwindcss` gör, i förhandsvisningen och i rättningen, så inget
  skript körs. `unknownTailwindClasses` varnar för felstavade klasser
  (via `raw.warnings` i `evaluate.js`). Testhjälparna `twColor`/`twName`
  ger färgnamn som `sky-600`, och `focus()` läser `:focus`-regler som
  `hover()`. `editor/tailwindInfo.js` förklarar klasserna i hovern.
  `optimizeDeps` i `vite.config.js` hindrar att Vite laddar om sidan när
  Tailwind laddas första gången under utveckling.
- `components/PagePreview.jsx` – förhandsvisningen under editorn,
  300 ms efter senaste ändringen, `sandbox="allow-scripts allow-forms"`.
  Ett tillagt skript rullar till `#id`-länkar, öppnar andra länkar i ny
  flik och visar vad ett formulär skulle ha skickat. 💻/📱 byter bredd
  (mobilen 375 px, samma som `width: 375` i testerna).
- `runner/htmlWarnings.js` – varningar för vanliga HTML-misstag
  (tagg som aldrig stängs, fel ordning, `<h7>`, `<img>` utan `alt`), med
  radnummer. Visas i gula rutan i `FeedbackPanel`. Facit får inte varna.
  CSS i `<style>` läses av `runner/cssWarnings.js` (felstavade
  egenskaper, `;` och `}` som saknas, tal utan enhet, färger som inte
  finns, selektorer som inte hittar något, flex- och grid-egenskaper
  utan `display: flex`/`grid` för samma selektor). Dess `CSS_PROPERTIES` och
  `closest` används också av hovern.
- `editor/codeInfo.js` – förklaringen när man håller musen över
  koden, byggd på syntaxträdet (`@codemirror/lang-html`, med CSS i
  `<style>`). Säger också var en tagg stängs och vilken tagg den ligger i.
  Lägg till taggar, attribut och CSS-egenskaper i tabellerna överst när
  nya banor använder dem.
- `runner/evaluate.js` – gör om svaret till feedback i klartext.
  `showValue` visar värden som JSON.
- `runner/friendlyErrors.js` – förklaringar på svenska av fel i
  testerna.
- `data/` – innehållet är data, inte kod:
  - `tracks.js` banorna i ordning med `teaches`, `reward`, `docs` (MDN)
    och `canBuild`
  - `lessons/` en fil per bana, samlade i `lessons/index.js`.
    `lessons.test.js` rättar varje facit och startkod
  - `lessons/bossar.js` en boss per bana (`isBoss`, inga ledtrådar)
  - bilderna i övningarna ligger i `public/bilder/` (egna SVG:er, så att
    övningarna fungerar utan internet). Lokalt körs appen på `/`
  - `projects.js` tre projekt per bana med steg (`why` på varje steg).
    Fri text testas på formen, inte exakta ord. Facit får inte varna
  - `ideas.js` tre idéer per bana till Lekplatsen
  - `explain` i en övning: `kod`, **fet**, _kursiv_, och ett stycke där
    alla rader börjar med `- ` blir en lista
  - `sourceChecks` på en övning kollar koden med regex – för det
    webbläsaren lagar själv, som `html`, `head` och `body` som saknas
  - `resources.js` länkar per bana till Fastnat?-panelen
  - `quiz.js` fyra frågor per bana. En fråga med `check` rättas mot
    `code` i `quiz.test.js`
- `test/concepts.js` – begrepp som facit inte får använda före sin
  bana. En regel slår till först när dess bana finns i `tracks.js`.

## En övning

Som i `docs/kurser/html.md`. Inga länkar eller bilder före bana 2, inga listor före
bana 3, inga `header`/`nav`/`main`/`section`/`article`/`footer` före
bana 4, inga formulär före bana 5, ingen CSS före bana 6, ingen
`padding`/`margin`/`border`/`width`/`display` före bana 7, ingen
flex/grid/`@media` före sina banor och ingen Tailwind före bana 12 i
facit.
