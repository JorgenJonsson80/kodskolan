# Fullstack-kursen

SPEC: `docs/kurser/fullstack.md`. Kursen har två språk, och övningens
`lang` avgör vilket.

- `runner/runtime.js` – `createFullstack({ flask, check, runJsTests })`.
  `py`: Flask-kursens körning, och sedan startas elevens app (serveStart i
  `flask/runner/flask_harness.py`) så att `frontend` kan visas mot den.
  `tsx`: TypeScript-kursens `createRunTs` med JS-kursens rättning, där
  fetch går till `backend` via en bro (`js/runner/bridgeFetch.js`,
  `testWorker.js` med `options.bridge`). Startas Flask-workern om svarar
  appen `stopped`, och då startas den igen.
- `runner/browser.js` – workers i webbläsaren. `test/nodeFullstack.js` –
  samma sak i Node (Pyodide från npm, kompilatorn och evaluate direkt).
- `editor.js` – språket efter `editor.context` ('py' eller 'tsx'). Hovern
  ser språket på kommentarstecknet.
- `useWorkbench.jsx` – den andra filen (`OtherFile`) och 📮 i app.py.
- `components/FullstackResult.jsx` – svaret på 📮 och sidan.
- `__mount(…).settle()` väntar tills inga anrop är på väg, så att svar
  från Flask hinner fram.

API:t och sidorna som inte är elevens står i `data/files.js`, och
övningarna pekar dit i stället för att upprepa koden.
