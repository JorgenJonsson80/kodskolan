# Flask-kursen

Kursens SPEC (banorna, körningen och reglerna för innehållet) finns i
`docs/kurser/flask.md`. Sökvägarna nedan utgår från den här mappen,
`src/courses/flask/`.

`index.jsx` är kursen enligt kontraktet i `SPEC.md` i roten. Kursen
återanvänder Python-kursens Pyodide, `harness.py`, rättning
(`evaluate`), felförklaringar och editor, så ändringar där påverkar båda.
`harness.py` har `TEST_GLOBALS` för Flask-kursens testhjälpare, och
`_write_files` skapar mappar (för `templates/`).

## Arkitektur

- `runner/flask_harness.py` – körs efter `harness.py`: testhjälparna
  (`__get`, `__klient` …), `run_flask` med 📮 Anropa (`__anropa`), att
  `app.run()` inte gör något, och pbkdf2 i ren Python.
- `runner/flaskWorker.js` och `runner/flask.js` – en varm worker med
  Pyodide, Jinja2 m.fl. från Pyodide och Flask från `public/wheels`
  (`runner/wheels.js`).
- `runner/evaluate.js` – Python-kursens rättning plus `response`.
- `components/RequestBar.jsx` – 📮 Anropa (metod, adress, JSON eller
  formulär). `components/ResponseView.jsx` – svaret: statuskod, JSON,
  HTML i en sandlådad iframe och vägarna.
- `useWorkbench.jsx` – 📮 som `afterEditor`, övningens `files` som 📁.
- `test/nodeFlask.js` – samma körning i Node (pyodide från npm, wheel-
  filerna från `public/wheels`). `test/nodeCheck.js` rättar en övning.
  `test/concepts.js` – vad facit inte får använda före sin bana.
- `data/` – `tracks.js`, `lessons/` (en fil per bana, `bossar.js`,
  `index.js`), `projects.js` (`request` och `files` per steg), `ideas.js`,
  `quiz.js` (`check` är ett testuttryck vars värde ska vara svaret) och
  `resources.js`.
