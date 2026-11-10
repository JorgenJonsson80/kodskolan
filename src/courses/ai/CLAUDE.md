# AI-kursen

Kursens SPEC (banorna, låtsasmodellen och reglerna för innehållet) finns
i `docs/kurser/ai.md`. Sökvägarna nedan utgår från den här mappen,
`src/courses/ai/`.

`index.jsx` är kursen enligt kontraktet i `SPEC.md` i roten. Kursen
återanvänder Python-kursens Pyodide, `harness.py`, felförklaringar och
editor, FastAPI-kursens `fastapi_harness.py` (händelseloopen med
låtsastid och slutprojektets API) och Flask-kursens rättning, `RequestBar`
och `ResponseView`.

## Arkitektur

- `runner/ai_harness.py` – låtsasversionen av Anthropics SDK i
  `sys.modules['anthropic']`, reglerna från `.modell.json`, testhjälparna
  `__anrop` och `__sekunder`, och `run_ai`. Ändra aldrig formen på
  request eller response utan att kolla det riktiga SDK:t (ladda
  `claude-api`-skillen).
- `runner/model.js` – lägger övningens `modell` som filen `.modell.json`.
- `runner/aiWorker.js` och `runner/ai.js` – en varm worker med Pyodide,
  FastAPI och de tre harness-filerna.
- `useWorkbench.jsx` – skickar `modell` med varje körning, och visar 📮
  bara i övningar med `request`.
- `test/nodeAi.js` – samma körning i Node. `test/nodeCheck.js` rättar en
  övning.
