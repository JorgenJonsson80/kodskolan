# JavaScript-kursen

JS Academy byggdes före SPEC-mallen och har ingen egen SPEC. Banorna
står i `src/courses/js/data/tracks.js` (25 banor: JavaScript från
console.log till felsökning, sedan React från JSX till datahämtning,
formulär, useReducer, Context, egna hooks, prestanda och ett slutprojekt).
De sex sista React-banorna ligger i `data/reactLessons.js`, som
`lesson.js` lägger sist. Som de andra React-banorna har de inga projekt.
Övningarnas format och hur kursen hänger ihop står i
`src/courses/js/CLAUDE.md`.

## Regler för innehåll

Det här är en lärplattform – innehållets kvalitet går före allt annat.

- All text på svenska, skriven för någon som aldrig kodat. Förklara
  **när och varför** man använder något, inte bara vad det är. Användaren
  minns att det svåra var att veta _när_ man tar till ett verktyg.
- Facit får bara använda det som lärts ut i tidigare banor (t.ex. `if` i
  stället för `? :` före Modern JS) och ska vara formaterat med Prettier.
  `data/quality.test.js` kontrollerar båda, och att startkoden
  underkänns och att facit går att köra rad för rad.
- Tester ska ha ett vanligt anrop som `fn(…)`, så att Kör rad för rad kan
  visa funktioner som bara definieras.
- Projektsteg har `why`: varför just det här valet och inte alternativet.
- Testa resultatet, inte exakt hur koden är skriven. Jämför aldrig hela
  objekt (nyckelordningen spelar roll). Använd `sourceChecks` sparsamt.
- Nya lektioner i en bana som redan finns får `addedLater: true`, så att
  den som redan klarat banan inte förlorar den.
- Nya projektbanor behöver tre idéer i `ideas.js` och resurser i
  `resources.js` (testerna kräver det).
- Uppdatera `help` i `index.jsx` när funktioner läggs till eller ändras.
