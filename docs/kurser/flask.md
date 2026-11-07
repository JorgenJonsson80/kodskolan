# Flask-kursen

Bygg webb-API:er och sajter i Python med Flask, från första
`@app.get('/')` till databas, inloggning och ett helt boknings-API. För
den som gått Python-kursen.

Eleven skriver en riktig Flask-app som körs i webbläsaren (Pyodide). Ingen
server startas: testerna och 📮 Anropa skickar anropen direkt till appen
med Flasks testklient.

## Körningen

- Python-kursens Pyodide och `harness.py`, plus `runner/flask_harness.py`
  i en egen worker (`runner/flaskWorker.js`, via `createPythonRunner` i
  Python-kursens `python.js`). Samma tidsgräns (3 s) och status.
- Flask 3.1.3, Werkzeug 3.1.9, itsdangerous och blinker ligger som
  wheel-filer i `public/wheels` (låsta versioner, inget beroende av PyPI)
  och packas upp med `pyodide.unpackArchive`. Jinja2, MarkupSafe och click
  kommer med Pyodide.
- `app.run()` gör ingenting, så att elever kan skriva det som i en riktig
  app. Ett fel i en vägfunktion visas som ett Python-fel med rad
  (`PROPAGATE_EXCEPTIONS`).
- Pyodide saknar OpenSSL. `hashlib.pbkdf2_hmac` finns därför i ren Python
  i `flask_harness.py`, och `generate_password_hash` använder pbkdf2 med
  1000 varv i stället för scrypt. Eleven skriver samma kod som annars.
- sqlite3 finns i Pyodide. Övningarna använder `sqlite3.connect(':memory:')`
  och skapar tabellerna i startkoden.

## Banorna

| #  | id            | Bana              | Lär ut                                                   |
| -- | ------------- | ----------------- | -------------------------------------------------------- |
| 1  | `forsta`      | Första appen      | `Flask(__name__)`, `@app.get`, 404, 405, `app.run`       |
| 2  | `vagar`       | Vägar             | `<namn>`, `<int:id>`, `<float:x>`, `url_for`             |
| 3  | `json`        | JSON              | dict och list som svar, `jsonify`, statuskoder           |
| 4  | `fragor`      | Frågor i adressen | `request.args.get`, standardvärden, `type=int`           |
| 5  | `skicka`      | Ta emot data      | `@app.post`, `get_json`, 201, 400, kontroller            |
| 6  | `api`         | Ett helt API      | PUT, PATCH, DELETE, 204, hjälpfunktioner                 |
| 7  | `fel`         | Fel               | `abort`, `@app.errorhandler`, 403, 409                   |
| 8  | `mallar`      | HTML med mallar   | `render_template(_string)`, Jinja, `extends`, XSS        |
| 9  | `formular`    | Formulär          | `request.form`, `redirect`, POST/Redirect/GET            |
| 10 | `databas`     | Databas           | sqlite3, `?`-parametrar, SQL-injektion, JOIN             |
| 11 | `felsok`      | Felsökning        | trasiga appar att laga (startkoden är trasig)            |
| 12 | `inloggning`  | Inloggning        | `session`, hashade lösenord, dekorator, 401 och 403      |
| 13 | `slutprojekt` | Slutprojektet     | boknings-API för hundpensionatet Tassen                  |

Varje bana: 9 övningar och en boss, tre projekt med tre steg, tre idéer
till Lekplatsen, fyra quizfrågor och minst två länkar i Fastnat?. Alla
13 banor är klara: 130 övningar, 39 projekt med 117 steg, 39 idéer och
52 quizfrågor.

## En övning

Som i Python-kursen (`id`, `track`, `title`, `xp`, `description`,
`explain`, `example`, `task`, `starterCode`, `solution`, `hints`, `tests`,
`sourceChecks`), och:

- `request: { method, path, kind, body }` – anropet 📮 börjar med.
  `kind` är `'json'` (standard) eller `'form'` (`namn=Ada&alder=7`).
- `files: { 'templates/bas.html': '…' }` – mallar som appen läser. De
  visas under 📁 ovanför editorn.
- Testerna är Python-uttryck som körs efter elevens kod, med:
  - `__get(path)`, `__post(path, data=None, form=None)`, `__put`,
    `__patch`, `__delete` – svarar med ett `Svar` med `status`, `text`,
    `json`, `typ` och `location`.
  - `__klient()` – en klient som behåller cookies (session), med
    `get`, `post`, `put`, `patch` och `delete`.
  - `__vagar()` – appens vägar, t.ex. `[['GET POST', '/hundar']]`.
- Testerna delar på en körning, så ett POST i ett test syns i nästa.
  `inputs: []` på ett test ger det en egen, ny körning.
- Facit får inte använda något före sin bana (`test/concepts.js`).
