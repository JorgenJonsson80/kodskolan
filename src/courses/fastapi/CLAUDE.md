# FastAPI-kursen

Kursens SPEC (banorna, körningen och reglerna för innehållet) finns i
`docs/kurser/fastapi.md`. Sökvägarna nedan utgår från den här mappen,
`src/courses/fastapi/`.

`index.jsx` är kursen enligt kontraktet i `SPEC.md` i roten. Kursen
återanvänder Python-kursens Pyodide, `harness.py`, felförklaringar och
editor, och Flask-kursens rättning (`evaluate`), `RequestBar` och
`ResponseView` (och `flask.css`). Ändringar där påverkar flera kurser.

## Arkitektur

- `runner/fastapi_harness.py` – körs efter `harness.py`: anropen direkt
  till appen (ASGI, `_call`), testhjälparna (`__get`, `__klient`,
  `__openapi` …), `run_fastapi` med 📮 Anropa, `anyio.to_thread.run_sync`
  utan trådar, `_Loop` (händelseloop med låtsastid) och låtsas-`uvicorn`.
- `runner/fastapiWorker.js` och `runner/fastapi.js` – en varm worker med
  Pyodide och paketen i `runner/packages.js`.
- `useWorkbench.jsx` – 📮 som `afterEditor`, bara JSON.
- `test/nodeFastapi.js` – samma körning i Node. `test/nodeCheck.js`
  rättar en övning. `test/concepts.js` – vad facit inte får använda före
  sin bana.
- `data/` – som i Flask-kursen. Övningarnas id börjar med `fa-`.
