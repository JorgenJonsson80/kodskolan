# FastAPI-kursen

Bygg moderna API:er i Python med FastAPI, från första `@app.get('/')` till
Pydantic, databas, inloggning med Depends och async. För den som gått
Python-kursen. Kursen är också grunden i spåret AI-utvecklare: AI-kursen
(`docs/kurser/ai.md`) bygger sina tjänster med FastAPI.

Eleven skriver en riktig FastAPI-app som körs i webbläsaren (Pyodide).
Ingen server startas: testerna och 📮 Anropa skickar anropen direkt till
appen (ASGI).

## Körningen

- Python-kursens Pyodide och `harness.py`, plus `runner/fastapi_harness.py`
  i en egen worker (`runner/fastapiWorker.js`, via `createPythonRunner`).
  Samma tidsgräns (3 s) och status.
- FastAPI, Starlette, Pydantic och anyio ingår i Pyodide (inga egna
  wheel-filer, till skillnad från Flask). `runner/packages.js`.
- Pyodide har inga trådar. FastAPI kör vanliga `def`-vägar och `Depends`
  med `yield` i en tråd via `anyio.to_thread.run_sync`, så den byts mot en
  som kör funktionen direkt.
- Pyodides egen händelseloop kan inte vänta klart, och asyncio:s vanliga
  behöver sockets. `_Loop` i harness-filen är en liten loop utan sockets
  och med **låtsastid**: `asyncio.sleep(2)` går direkt, men i rätt ordning,
  och `loop.time()` visar att två sekunder gått. Så kan bana 9 visa att
  `asyncio.gather` gör tre långsamma anrop på samma tid som det längsta.
  En `await` som aldrig blir klar ger ett fel på svenska i stället för att
  låsa sidan.
- `uvicorn.run(app)` gör ingenting (en låtsasmodul i `sys.modules`), så att
  elever kan skriva det som i en riktig app.
- Ett fel i en vägfunktion visas som ett Python-fel med rad, inte som en
  anonym 500.
- Formulär (`Form`) kräver `python-multipart`, som saknas. Kursen tar bara
  emot JSON, och 📮 visar inget formulärval (`forms={false}` på Flask-
  kursens `RequestBar`).

## Banorna

| #  | id            | Bana              | Lär ut                                                              | Projekt |
| -- | ------------- | ----------------- | ------------------------------------------------------------------- | ------- |
| 1  | `forsta`      | Första API:et     | `FastAPI()`, `@app.get`, dict/list blir JSON, 404, 405, `/docs`     | ✅      |
| 2  | `vagar`       | Vägar och typer   | `{id}`, `id: int`, 422, `float`, ordning, Enum                      | ✅      |
| 3  | `fragor`      | Frågor i adressen | query, standardvärden, `str \| None`, `bool`, sidor, sortering      | ✅      |
| 4  | `modeller`    | Pydantic-modeller | `BaseModel`, `@app.post`, `model_dump`, `Field`, `list[str]`, modell i modell |  |
| 5  | `svar`        | Svar och fel      | `status_code=201`, `HTTPException`, 404/409/400, `response_model`   |         |
| 6  | `crud`        | Ett helt API      | nytt id, PUT, PATCH (`exclude_unset`), DELETE 204, vägar under vägar |        |
| 7  | `beroenden`   | Beroenden         | `Depends`, `Header`, API-nyckel, Bearer, 401/403, `dependency_overrides` |    |
| 8  | `databas`     | Databas           | sqlite3, `?`, SQL-injektion, `Depends` med `yield`, UPDATE, JOIN    |         |
| 9  | `async`       | async             | `async def`, `await`, `gather`, `wait_for` (504), `BackgroundTasks` |         |
| 10 | `felsok`      | Felsökning        | trasiga API:er att laga (startkoden är trasig)                      |         |
| 11 | `slutprojekt` | Slutprojektet     | Kunskapsbanken i nio steg: artiklar, sök, nyckel, låtsas-AI, RAG    |         |

Alla 11 banor har 9 övningar och en boss (110), fyra quizfrågor och
länkar i Fastnat?. Projekt (tre per bana, tre steg) och idéer (tre per
bana) finns för bana 1–3. Resten ska skrivas innan kursen publiceras.

Slutprojektets steg bygger på varandra: `slutprojekt.js` sätter ihop
koden av delar (`STEG1` … `STEG9`), och slutbossen i `bossar.js` utgår
från hela Kunskapsbanken (`KUNSKAPSBANKEN`).

## En övning

Som i Flask-kursen (`id`, `track`, `title`, `xp`, `description`,
`explain`, `example`, `task`, `starterCode`, `solution`, `hints`, `tests`,
`sourceChecks`, `request`). Id börjar med `fa-`, så att de aldrig krockar
med Flask-kursens. Testerna är Python-uttryck som körs efter elevens kod:

- `__get(path, headers=None)`, `__post(path, data=None, headers=None)`,
  `__put`, `__patch`, `__delete` – svarar med ett `Svar` med `status`,
  `json`, `text`, `typ`, `headers` och `location`.
- `__klient(headers)` – skickar samma headers med varje anrop (en
  inloggad app), med `get`, `post`, `put`, `patch` och `delete`.
- `__vagar()` – appens vägar, t.ex. `[['GET POST', '/hundar']]`.
- `__openapi()` – dokumentationen FastAPI gör (det `/docs` visar).
- `__tid('/väg')` eller `__tid(lambda: __post(…))` – hur många
  (låtsas)sekunder anropet tog. Bana 9 rättar `gather` med den.
- `request: { path, method, body, headers }` på övningen. Headers visas
  och ändras under 📮 (`components/HeaderField.jsx`, en rad per header).
- Testerna delar på en körning, så ett POST i ett test syns i nästa.
- Facit får inte använda något före sin bana (`test/concepts.js`).
- FastAPI svarar 422, inte 400, när det som skickas inte stämmer, och
  även när en obligatorisk header saknas.
