import { API_STEG, PAGE_API } from '../files';

// Bana 1: API:t. Eleven skriver app.py, en del i taget, och sidan
// (frontend, PAGE_API) visas mot elevens app. Varje startkod är förra
// övningens facit.
export const API = [
  {
    id: 'api-01',
    track: 'api',
    lang: 'py',
    title: 'Hundarna som JSON',
    xp: 10,
    description:
      'Kursen bygger hundpensionatet Tassen hela vägen: ett API i Flask och en sida i React som pratar med det. Sidan finns redan (📄 App.tsx ovanför editorn). Den hämtar /api/hundar – ge den något att hämta.',
    explain:
      'Ett API för en sida svarar med JSON, inte HTML. Returnerar vägfunktionen en lista eller en dictionary gör Flask om den till JSON, som sidan läser med `svar.json()`.\n\nAdresserna börjar med `/api/`. Då syns det direkt vad som är data till sidan, och i ett riktigt projekt skickar utvecklingsservern för React allt under /api vidare till Flask.\n\nNär du kört koden visas sidan under feedbacken, kopplad till din app. Klicka i den – anropen går till din Flask-app på riktigt.',
    example:
      "@app.get('/api/bocker')\ndef bocker():\n    return fraga('SELECT * FROM bocker ORDER BY titel')",
    task: 'Uppgift: `GET /api/hundar` svarar med alla hundar, sorterade på namn.',
    starterCode: API_STEG[0],
    solution: API_STEG[1],
    hints: [
      "@app.get('/api/hundar')",
      'ORDER BY namn',
      "return fraga('SELECT * FROM hundar ORDER BY namn')",
    ],
    tests: [
      {
        description: 'Tre hundar i bokstavsordning',
        code: "[h['namn'] for h in __get('/api/hundar').json]",
        expected: ['Bamse', 'Pixel', 'Saga'],
      },
      {
        description: 'Hela hunden',
        code: "__get('/api/hundar').json[0]",
        expected: { id: 1, namn: 'Bamse', storlek: 'stor' },
      },
      {
        description: 'Svaret är JSON',
        code: "__get('/api/hundar').typ",
        expected: 'application/json',
      },
    ],
    request: { path: '/api/hundar' },
    frontend: PAGE_API,
  },
  {
    id: 'api-02',
    track: 'api',
    lang: 'py',
    title: 'En hund',
    xp: 15,
    description:
      'Klickar man på en hund i sidan hämtar den /api/hundar/1, /api/hundar/2 och så vidare.',
    explain:
      '`<int:id>` i adressen blir ett heltal till funktionen. Finns hunden inte ska svaret vara 404, så att sidan vet att den inte finns.\n\n`abort(404, description=…)` avbryter vägfunktionen med statuskoden och en förklaring.',
    example:
      "@app.get('/api/bocker/<int:id>')\ndef bok(id):\n    rader = fraga('SELECT * FROM bocker WHERE id = ?', (id,))\n    if not rader:\n        abort(404, description='Ingen sådan bok')\n    return rader[0]",
    task: "Uppgift: `GET /api/hundar/<id>` svarar med hunden, eller 404 med beskrivningen `'Ingen sådan hund'`.",
    starterCode: API_STEG[1],
    solution: API_STEG[2],
    hints: [
      "@app.get('/api/hundar/<int:id>')",
      "fraga('SELECT * FROM hundar WHERE id = ?', (id,))",
      "if not rader:\n    abort(404, description='Ingen sådan hund')",
    ],
    tests: [
      {
        description: 'Saga',
        code: "__get('/api/hundar/2').json",
        expected: { id: 2, namn: 'Saga', storlek: 'liten' },
      },
      {
        description: 'Pixel',
        code: "__get('/api/hundar/3').json['namn']",
        expected: 'Pixel',
      },
      {
        description: 'En hund som inte finns ger 404',
        code: "__get('/api/hundar/99').status",
        expected: 404,
      },
    ],
    request: { path: '/api/hundar/2' },
    frontend: PAGE_API,
  },
  {
    id: 'api-03',
    track: 'api',
    lang: 'py',
    title: 'Felen som JSON',
    xp: 15,
    description:
      'Klicka på en hund som inte finns, så ser sidan bara "404". Den vill läsa felet ur svaret, men Flasks egna felsidor är HTML.',
    explain:
      'Sidan läser `fel` ur svaret: `{"fel": "Ingen sådan hund"}`. Med `@app.errorhandler(404)` bestämmer du själv vad ett 404-svar innehåller. Felet har `description` (texten från abort) och `code` (statuskoden).\n\nEn funktion kan ha flera dekoratorer. Lägg felhanteraren på 400, 401, 404 och 409 – de kommer att behövas.',
    example:
      "@app.errorhandler(404)\ndef felsvar(fel):\n    return {'fel': fel.description}, fel.code",
    task: 'Uppgift: Alla fel med 400, 401, 404 och 409 svarar med JSON: `{"fel": beskrivningen}` och samma statuskod.',
    starterCode: API_STEG[2],
    solution: API_STEG[3],
    hints: [
      '@app.errorhandler(404)',
      "def felsvar(fel):\n    return {'fel': fel.description}, fel.code",
      'Lägg @app.errorhandler(400), (401) och (409) ovanför också.',
    ],
    tests: [
      {
        description: 'Felet som JSON',
        code: "__get('/api/hundar/99').json",
        expected: { fel: 'Ingen sådan hund' },
      },
      {
        description: 'Fortfarande 404',
        code: "__get('/api/hundar/99').status",
        expected: 404,
      },
      {
        description: 'Även för vägar som inte finns',
        code: "'fel' in __get('/api/katter').json",
        expected: true,
      },
      {
        description: 'Även 400, 401 och 409',
        code: 'all(app.error_handler_spec[None][kod] for kod in (400, 401, 409))',
        expected: true,
      },
    ],
    request: { path: '/api/hundar/99' },
    frontend: PAGE_API,
  },
  {
    id: 'api-04',
    track: 'api',
    lang: 'py',
    title: 'Boka',
    xp: 20,
    description:
      'Sidan har ett formulär för att boka en hund. Det skickar POST /api/bokningar med JSON: hund_id, fran och till.',
    explain:
      "`request.get_json()` ger det sidan skickade som en dictionary. Kontrollera det innan det sparas: datumen är text som `'2026-12-01'`, och sådan text kan jämföras direkt – `'2026-12-03' > '2026-12-01'`.\n\nEn ny sak svarar med 201 Created och det som skapades, med det nya id:t, så att sidan kan visa bokningsnumret.",
    example:
      "data = request.get_json()\nif not data.get('titel'):\n    abort(400, description='titel saknas')\ncur = db.execute('INSERT INTO bocker (titel) VALUES (?)', (data['titel'],))\ndb.commit()\nreturn {'id': cur.lastrowid, 'titel': data['titel']}, 201",
    task: "Uppgift: `POST /api/bokningar` sparar bokningen och svarar 201 med `id`, `hund_id`, `fran` och `till`. Saknas ett datum, eller är `till` inte efter `fran`, blir det 400 med beskrivningen `'Hämtningen måste vara efter lämningen'`.",
    starterCode: API_STEG[3],
    solution: API_STEG[4],
    hints: [
      "@app.post('/api/bokningar')\ndef boka():\n    data = request.get_json()",
      "fran, till = data.get('fran', ''), data.get('till', '')\nif not fran or not till or till <= fran:",
      "cur = db.execute('INSERT INTO bokningar (hund_id, fran, till) VALUES (?, ?, ?)', …)",
    ],
    tests: [
      {
        description: 'Bokad',
        code: "__post('/api/bokningar', {'hund_id': 1, 'fran': '2026-12-01', 'till': '2026-12-03'}).status",
        expected: 201,
        inputs: [],
      },
      {
        description: 'Med nummer',
        code: "__post('/api/bokningar', {'hund_id': 1, 'fran': '2026-12-01', 'till': '2026-12-03'}).json",
        expected: { id: 1, hund_id: 1, fran: '2026-12-01', till: '2026-12-03' },
        inputs: [],
      },
      {
        description: 'Hämtning före lämning',
        code: "__post('/api/bokningar', {'hund_id': 1, 'fran': '2026-12-05', 'till': '2026-12-01'}).json",
        expected: { fel: 'Hämtningen måste vara efter lämningen' },
        inputs: [],
      },
      {
        description: 'Utan hämtning ger 400',
        code: "__post('/api/bokningar', {'hund_id': 1, 'fran': '2026-12-05'}).status",
        expected: 400,
        inputs: [],
      },
    ],
    request: {
      method: 'POST',
      path: '/api/bokningar',
      body: '{"hund_id": 1, "fran": "2026-12-01", "till": "2026-12-03"}',
    },
    frontend: PAGE_API,
  },
  {
    id: 'api-05',
    track: 'api',
    lang: 'py',
    title: 'Hund och krock',
    xp: 20,
    description:
      'Två saker kan inte bokas: en hund som inte finns, och en hund som redan är bokad de dagarna. Boka Bamse två gånger i sidan och se vad som händer nu.',
    explain:
      'Två perioder krockar när den ena börjar innan den andra slutar, åt båda hållen: `fran < annan_till AND annan_fran < till`. Hämtas hunden samma dag som nästa lämnas är det ingen krock.\n\n409 Conflict betyder att anropet är rätt, men krockar med något som redan finns.',
    example:
      "krock = fraga(\n    'SELECT id FROM bokningar WHERE rum = ? AND fran < ? AND ? < till',\n    (data['rum'], till, fran),\n)\nif krock:\n    abort(409, description='Rummet är redan bokat då')",
    task: "Uppgift: En hund som inte finns ger 404 (`'Ingen sådan hund'`). En krock ger 409 med beskrivningen `'Hunden är redan bokad då'`.",
    starterCode: API_STEG[4],
    solution: API_STEG[5],
    hints: [
      "if not fraga('SELECT id FROM hundar WHERE id = ?', (data.get('hund_id'),)):",
      "'SELECT id FROM bokningar WHERE hund_id = ? AND fran < ? AND ? < till'",
      "abort(409, description='Hunden är redan bokad då')",
    ],
    tests: [
      {
        description: 'Ingen sådan hund',
        code: "__post('/api/bokningar', {'hund_id': 99, 'fran': '2026-12-01', 'till': '2026-12-03'}).json",
        expected: { fel: 'Ingen sådan hund' },
        inputs: [],
      },
      {
        description: 'Krock ger 409',
        code: "(k := __klient(), k.post('/api/bokningar', {'hund_id': 1, 'fran': '2026-12-01', 'till': '2026-12-05'}), k.post('/api/bokningar', {'hund_id': 1, 'fran': '2026-12-03', 'till': '2026-12-07'}).json)[-1]",
        expected: { fel: 'Hunden är redan bokad då' },
        inputs: [],
      },
      {
        description: 'Samma dag som hämtningen går bra',
        code: "(k := __klient(), k.post('/api/bokningar', {'hund_id': 1, 'fran': '2026-12-01', 'till': '2026-12-05'}), k.post('/api/bokningar', {'hund_id': 1, 'fran': '2026-12-05', 'till': '2026-12-07'}).status)[-1]",
        expected: 201,
        inputs: [],
      },
      {
        description: 'En annan hund samma dagar går bra',
        code: "(k := __klient(), k.post('/api/bokningar', {'hund_id': 1, 'fran': '2026-12-01', 'till': '2026-12-05'}), k.post('/api/bokningar', {'hund_id': 2, 'fran': '2026-12-01', 'till': '2026-12-05'}).status)[-1]",
        expected: 201,
        inputs: [],
      },
    ],
    request: {
      method: 'POST',
      path: '/api/bokningar',
      body: '{"hund_id": 99, "fran": "2026-12-01", "till": "2026-12-03"}',
    },
    frontend: PAGE_API,
  },
  {
    id: 'api-06',
    track: 'api',
    lang: 'py',
    title: 'Personalen',
    xp: 20,
    description:
      'Längst ner i sidan loggar personalen in och ser alla bokningar. Bokningarna får bara personalen se.',
    explain:
      'Sidan skickar `POST /api/logga-in` med `{"kod": …}`. Är koden rätt sparas det i `session`, som Flask skickar som en cookie. Webbläsaren skickar cookien med nästa anrop, så `GET /api/bokningar` vet att det är personalen.\n\nUtan inloggning blir det 401 Unauthorized. (Koden här är för övningen – i en riktig app har varje person ett eget hashat lösenord.)',
    example:
      "@app.post('/api/logga-in')\ndef logga_in():\n    if request.get_json().get('kod') != 'hemligt':\n        abort(401, description='Fel kod')\n    session['personal'] = True\n    return {'inloggad': True}",
    task: "Uppgift: `POST /api/logga-in` med koden `'tassen2026'` loggar in (annars 401 `'Fel kod'`). `GET /api/bokningar` svarar med `id`, `hund` (hundens namn), `fran` och `till` för alla bokningar, sorterade på `fran` – men bara för inloggade. Andra får 401 med `'Bara personalen ser bokningarna'`.",
    starterCode: API_STEG[5],
    solution: API_STEG[6],
    hints: [
      "session['personal'] = True",
      "if not session.get('personal'):\n    abort(401, description='Bara personalen ser bokningarna')",
      'SELECT b.id, h.namn AS hund, b.fran, b.till FROM bokningar b JOIN hundar h ON h.id = b.hund_id ORDER BY b.fran',
    ],
    tests: [
      {
        description: 'Utan inloggning',
        code: "__get('/api/bokningar').json",
        expected: { fel: 'Bara personalen ser bokningarna' },
        inputs: [],
      },
      {
        description: 'Fel kod',
        code: "__post('/api/logga-in', {'kod': 'gissning'}).status",
        expected: 401,
        inputs: [],
      },
      {
        description: 'Personalen ser bokningarna',
        code: "(k := __klient(), k.post('/api/bokningar', {'hund_id': 2, 'fran': '2026-12-01', 'till': '2026-12-03'}), k.post('/api/logga-in', {'kod': 'tassen2026'}), k.get('/api/bokningar').json)[-1]",
        expected: [
          { id: 1, hund: 'Saga', fran: '2026-12-01', till: '2026-12-03' },
        ],
        inputs: [],
      },
      {
        description: 'Sorterade på datum',
        code: "(k := __klient(), k.post('/api/bokningar', {'hund_id': 1, 'fran': '2026-12-20', 'till': '2026-12-23'}), k.post('/api/bokningar', {'hund_id': 3, 'fran': '2026-12-02', 'till': '2026-12-04'}), k.post('/api/logga-in', {'kod': 'tassen2026'}), [b['hund'] for b in k.get('/api/bokningar').json])[-1]",
        expected: ['Pixel', 'Bamse'],
        inputs: [],
      },
    ],
    request: {
      method: 'POST',
      path: '/api/logga-in',
      body: '{"kod": "tassen2026"}',
    },
    frontend: PAGE_API,
  },
];
