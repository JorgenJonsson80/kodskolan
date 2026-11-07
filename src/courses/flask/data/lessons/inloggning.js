// Bana 12: inloggning. session, hashade lösenord, skyddade vägar och en
// egen dekorator. Testerna använder __klient(), som behåller cookies.

export const INLOGGNING = [
  {
    id: 'inloggning-01',
    track: 'inloggning',
    title: 'session',
    xp: 15,
    description:
      'HTTP glömmer allt mellan anropen. `session` är appens minne för en besökare.',
    explain:
      '`session` fungerar som en dictionary, men sparas hos besökaren i en **cookie** som skickas med varje anrop. Den är signerad med `app.secret_key`, så att ingen kan ändra den.\n\nTesterna här använder en klient som behåller cookies, som en webbläsare.',
    example: "session['farg'] = 'blå'\n…\nsession.get('farg')",
    task: "Uppgift: `POST /logga-in` sparar `request.form['namn']` i `session['namn']`, och `GET /jag` svarar `{'namn': session.get('namn')}`.",
    starterCode:
      "from flask import Flask, request, session\n\napp = Flask(__name__)\napp.secret_key = 'byt-mig-i-en-riktig-app'\n",
    solution:
      "from flask import Flask, request, session\n\napp = Flask(__name__)\napp.secret_key = 'byt-mig-i-en-riktig-app'\n\n\n@app.post('/logga-in')\ndef logga_in():\n    session['namn'] = request.form['namn']\n    return {'inloggad': session['namn']}\n\n\n@app.get('/jag')\ndef jag():\n    return {'namn': session.get('namn')}\n",
    hints: [
      "session['namn'] = request.form['namn']",
      "session.get('namn')",
      'Två vägar.',
    ],
    tests: [
      {
        description: 'Inte inloggad',
        code: "__get('/jag').json",
        expected: { namn: null },
      },
      {
        description: 'Inloggad',
        code: "(k := __klient(), k.post('/logga-in', form={'namn': 'Ada'}), k.get('/jag').json)[-1]",
        expected: { namn: 'Ada' },
      },
    ],
    request: { path: '/jag' },
  },
  {
    id: 'inloggning-02',
    track: 'inloggning',
    title: 'Logga ut',
    xp: 10,
    description: 'Att logga ut är att ta bort det som sparats i sessionen.',
    explain:
      "`session.pop('namn', None)` tar bort namnet om det finns. `session.clear()` tar bort allt.",
    example: 'session.clear()',
    task: "Uppgift: `POST /logga-ut` tar bort `namn` ur sessionen och svarar `{'utloggad': True}`.",
    starterCode:
      "from flask import Flask, request, session\n\napp = Flask(__name__)\napp.secret_key = 'byt-mig-i-en-riktig-app'\n\n\n@app.post('/logga-in')\ndef logga_in():\n    session['namn'] = request.form['namn']\n    return {'inloggad': session['namn']}\n\n\n@app.get('/jag')\ndef jag():\n    return {'namn': session.get('namn')}\n",
    solution:
      "from flask import Flask, request, session\n\napp = Flask(__name__)\napp.secret_key = 'byt-mig-i-en-riktig-app'\n\n\n@app.post('/logga-in')\ndef logga_in():\n    session['namn'] = request.form['namn']\n    return {'inloggad': session['namn']}\n\n\n@app.get('/jag')\ndef jag():\n    return {'namn': session.get('namn')}\n\n\n@app.post('/logga-ut')\ndef logga_ut():\n    session.pop('namn', None)\n    return {'utloggad': True}\n",
    hints: [
      "@app.post('/logga-ut')",
      "session.pop('namn', None)",
      "return {'utloggad': True}",
    ],
    tests: [
      {
        description: 'Logga in och ut',
        code: "(k := __klient(), k.post('/logga-in', form={'namn': 'Ada'}), k.post('/logga-ut'), k.get('/jag').json)[-1]",
        expected: { namn: null },
      },
    ],
  },
  {
    id: 'inloggning-03',
    track: 'inloggning',
    title: 'Spara lösenord säkert',
    xp: 20,
    description:
      'Lösenord sparas aldrig som de är. Man sparar en **hash** – ett fingeravtryck som inte går att räkna baklänges.',
    explain:
      "`generate_password_hash('hemligt123')` ger något som `'pbkdf2:sha256:1000$…'`. Läcker databasen syns inga lösenord.\n\n(I en riktig app ger Werkzeug en scrypt-hash med fler varv. Webbläsarens Python saknar scrypt, så här blir det pbkdf2 – koden du skriver är densamma.)",
    example: 'anvandare[namn] = generate_password_hash(losenord)',
    task: "Uppgift: `POST /registrera` sparar `generate_password_hash(losenord)` i `anvandare[namn]` och svarar `{'namn': …}` med 201, eller 409 om namnet är upptaget.",
    starterCode:
      "from flask import Flask, request, session\nfrom werkzeug.security import check_password_hash, generate_password_hash\n\napp = Flask(__name__)\napp.secret_key = 'byt-mig-i-en-riktig-app'\n",
    solution:
      "from flask import Flask, request, session\nfrom werkzeug.security import check_password_hash, generate_password_hash\n\napp = Flask(__name__)\napp.secret_key = 'byt-mig-i-en-riktig-app'\n\nanvandare = {}\n\n\n@app.post('/registrera')\ndef registrera():\n    data = request.get_json()\n    if data['namn'] in anvandare:\n        return {'fel': 'Namnet är upptaget'}, 409\n    anvandare[data['namn']] = generate_password_hash(data['losenord'])\n    return {'namn': data['namn']}, 201\n",
    hints: [
      "generate_password_hash(data['losenord'])",
      "if data['namn'] in anvandare: … 409",
      "return {'namn': data['namn']}, 201",
    ],
    tests: [
      {
        description: 'Registrera',
        code: "__post('/registrera', {'namn': 'ada', 'losenord': 'hemligt123'}).status",
        expected: 201,
        inputs: [],
      },
      {
        description: 'Inte i klartext',
        code: "(__post('/registrera', {'namn': 'ada', 'losenord': 'hemligt123'}), anvandare['ada'] != 'hemligt123')[-1]",
        expected: true,
        inputs: [],
      },
      {
        description: 'Upptaget',
        code: "(__post('/registrera', {'namn': 'ada', 'losenord': 'x'}), __post('/registrera', {'namn': 'ada', 'losenord': 'y'}).status)[-1]",
        expected: 409,
        inputs: [],
      },
    ],
    request: {
      method: 'POST',
      path: '/registrera',
      body: '{"namn": "ada", "losenord": "hemligt123"}',
    },
    sourceChecks: [
      {
        description: 'Använder generate_password_hash',
        pattern: /generate_password_hash\(/,
      },
    ],
  },
  {
    id: 'inloggning-04',
    track: 'inloggning',
    title: 'Logga in',
    xp: 20,
    description:
      'Vid inloggning jämförs lösenordet med hashen. `check_password_hash` gör det.',
    explain:
      '`check_password_hash(sparad, losenord)` ger `True` om lösenordet stämmer.\n\nSvara samma sak oavsett om namnet eller lösenordet var fel. Annars kan någon ta reda på vilka namn som finns. Statuskoden är **401 Unauthorized**.',
    example:
      "if not check_password_hash(sparad, losenord):\n    return {'fel': '…'}, 401",
    task: "Uppgift: `POST /logga-in` med JSON. Stämmer namn och lösenord sparas namnet i sessionen och svaret blir `{'inloggad': namn}`. Annars `{'fel': 'Fel namn eller lösenord'}` med 401.",
    starterCode:
      "from flask import Flask, request, session\nfrom werkzeug.security import check_password_hash, generate_password_hash\n\napp = Flask(__name__)\napp.secret_key = 'byt-mig-i-en-riktig-app'\n\nanvandare = {}\n\n\n@app.post('/registrera')\ndef registrera():\n    data = request.get_json()\n    if data['namn'] in anvandare:\n        return {'fel': 'Namnet är upptaget'}, 409\n    anvandare[data['namn']] = generate_password_hash(data['losenord'])\n    return {'namn': data['namn']}, 201\n",
    solution:
      "from flask import Flask, request, session\nfrom werkzeug.security import check_password_hash, generate_password_hash\n\napp = Flask(__name__)\napp.secret_key = 'byt-mig-i-en-riktig-app'\n\nanvandare = {}\n\n\n@app.post('/registrera')\ndef registrera():\n    data = request.get_json()\n    if data['namn'] in anvandare:\n        return {'fel': 'Namnet är upptaget'}, 409\n    anvandare[data['namn']] = generate_password_hash(data['losenord'])\n    return {'namn': data['namn']}, 201\n\n\n@app.post('/logga-in')\ndef logga_in():\n    data = request.get_json()\n    sparad = anvandare.get(data['namn'])\n    if sparad is None or not check_password_hash(sparad, data['losenord']):\n        return {'fel': 'Fel namn eller lösenord'}, 401\n    session['namn'] = data['namn']\n    return {'inloggad': data['namn']}\n",
    hints: [
      "sparad = anvandare.get(data['namn'])",
      "check_password_hash(sparad, data['losenord'])",
      "session['namn'] = data['namn']",
    ],
    tests: [
      {
        description: 'Rätt',
        code: "(__post('/registrera', {'namn': 'ada', 'losenord': 'hemligt123'}), __post('/logga-in', {'namn': 'ada', 'losenord': 'hemligt123'}).json)[-1]",
        expected: { inloggad: 'ada' },
        inputs: [],
      },
      {
        description: 'Fel lösenord',
        code: "(__post('/registrera', {'namn': 'ada', 'losenord': 'hemligt123'}), __post('/logga-in', {'namn': 'ada', 'losenord': 'fel'}).status)[-1]",
        expected: 401,
        inputs: [],
      },
      {
        description: 'Okänt namn',
        code: "__post('/logga-in', {'namn': 'bo', 'losenord': 'x'}).json",
        expected: { fel: 'Fel namn eller lösenord' },
        inputs: [],
      },
    ],
    request: {
      method: 'POST',
      path: '/logga-in',
      body: '{"namn": "ada", "losenord": "hemligt123"}',
    },
  },
  {
    id: 'inloggning-05',
    track: 'inloggning',
    title: 'En skyddad väg',
    xp: 15,
    description: 'Vissa sidor är bara för inloggade. Kolla sessionen först.',
    explain:
      'Finns inget namn i sessionen är besökaren inte inloggad. Svara 401.',
    example:
      "if 'namn' not in session:\n    return {'fel': 'Logga in först'}, 401",
    task: "Uppgift: `GET /mina-sidor` svarar `{'valkommen': namn}` för inloggade, annars `{'fel': 'Logga in först'}` med 401.",
    starterCode:
      "from flask import Flask, request, session\n\napp = Flask(__name__)\napp.secret_key = 'byt-mig-i-en-riktig-app'\n\n\n@app.post('/logga-in')\ndef logga_in():\n    session['namn'] = request.form['namn']\n    return {'inloggad': session['namn']}\n",
    solution:
      "from flask import Flask, request, session\n\napp = Flask(__name__)\napp.secret_key = 'byt-mig-i-en-riktig-app'\n\n\n@app.post('/logga-in')\ndef logga_in():\n    session['namn'] = request.form['namn']\n    return {'inloggad': session['namn']}\n\n\n@app.get('/mina-sidor')\ndef mina_sidor():\n    if 'namn' not in session:\n        return {'fel': 'Logga in först'}, 401\n    return {'valkommen': session['namn']}\n",
    hints: [
      "if 'namn' not in session:",
      "return {'fel': 'Logga in först'}, 401",
      "return {'valkommen': session['namn']}",
    ],
    tests: [
      {
        description: 'Utloggad',
        code: "__get('/mina-sidor').status",
        expected: 401,
      },
      {
        description: 'Inloggad',
        code: "(k := __klient(), k.post('/logga-in', form={'namn': 'Ada'}), k.get('/mina-sidor').json)[-1]",
        expected: { valkommen: 'Ada' },
      },
    ],
    request: { path: '/mina-sidor' },
  },
  {
    id: 'inloggning-06',
    track: 'inloggning',
    title: 'En egen dekorator',
    xp: 20,
    description:
      'Kollen behövs i många vägar. Med en egen dekorator `@inloggad` skrivs den en gång.',
    explain:
      'En dekorator är en funktion som tar en funktion och ger en ny. `@wraps(vag)` behåller vägens namn, som Flask behöver.\n\nDekoratorn står *under* `@app.get`.',
    example:
      "def inloggad(vag):\n    @wraps(vag)\n    def kontroll(*args, **kwargs):\n        if 'namn' not in session:\n            return {'fel': 'Logga in först'}, 401\n        return vag(*args, **kwargs)\n    return kontroll",
    task: "Uppgift: Skriv dekoratorn `inloggad` och använd den på `/mina-sidor` och `/installningar` (som svarar `{'tema': 'mörkt'}`).",
    starterCode:
      "from functools import wraps\n\nfrom flask import Flask, request, session\n\napp = Flask(__name__)\napp.secret_key = 'byt-mig-i-en-riktig-app'\n\n\n@app.post('/logga-in')\ndef logga_in():\n    session['namn'] = request.form['namn']\n    return {'inloggad': session['namn']}\n",
    solution:
      "from functools import wraps\n\nfrom flask import Flask, request, session\n\napp = Flask(__name__)\napp.secret_key = 'byt-mig-i-en-riktig-app'\n\n\ndef inloggad(vag):\n    @wraps(vag)\n    def kontroll(*args, **kwargs):\n        if 'namn' not in session:\n            return {'fel': 'Logga in först'}, 401\n        return vag(*args, **kwargs)\n\n    return kontroll\n\n\n@app.post('/logga-in')\ndef logga_in():\n    session['namn'] = request.form['namn']\n    return {'inloggad': session['namn']}\n\n\n@app.get('/mina-sidor')\n@inloggad\ndef mina_sidor():\n    return {'valkommen': session['namn']}\n\n\n@app.get('/installningar')\n@inloggad\ndef installningar():\n    return {'tema': 'mörkt'}\n",
    hints: [
      'def inloggad(vag): med en inre funktion',
      '@wraps(vag) ovanför den inre funktionen.',
      '@app.get(…) först, sedan @inloggad.',
    ],
    tests: [
      {
        description: 'Utloggad',
        code: "[__get('/mina-sidor').status, __get('/installningar').status]",
        expected: [401, 401],
      },
      {
        description: 'Inloggad',
        code: "(k := __klient(), k.post('/logga-in', form={'namn': 'Ada'}), k.get('/installningar').json)[-1]",
        expected: { tema: 'mörkt' },
      },
    ],
    request: { path: '/installningar' },
    sourceChecks: [{ description: 'Använder @inloggad', pattern: /@inloggad/ }],
  },
  {
    id: 'inloggning-07',
    track: 'inloggning',
    title: 'Bara för admin',
    xp: 15,
    description:
      'Inloggad räcker inte alltid. Vissa sidor är bara för administratörer – annars **403**.',
    explain:
      '401 betyder "vem är du?". 403 betyder "jag vet vem du är, men du får inte".',
    example:
      "if session.get('roll') != 'admin':\n    return {'fel': 'Bara för admin'}, 403",
    task: "Uppgift: `/logga-in` sparar också `roll` (`'admin'` för namnet `Ada`, annars `'gast'`). `GET /admin` svarar 401 för utloggade, 403 för gäster och `{'admin': True}` för admin.",
    starterCode:
      "from flask import Flask, request, session\n\napp = Flask(__name__)\napp.secret_key = 'byt-mig-i-en-riktig-app'\n\n\n@app.post('/logga-in')\ndef logga_in():\n    session['namn'] = request.form['namn']\n    return {'inloggad': session['namn']}\n",
    solution:
      "from flask import Flask, request, session\n\napp = Flask(__name__)\napp.secret_key = 'byt-mig-i-en-riktig-app'\n\n\n@app.post('/logga-in')\ndef logga_in():\n    session['namn'] = request.form['namn']\n    session['roll'] = 'admin' if session['namn'] == 'Ada' else 'gast'\n    return {'inloggad': session['namn']}\n\n\n@app.get('/admin')\ndef admin():\n    if 'namn' not in session:\n        return {'fel': 'Logga in först'}, 401\n    if session.get('roll') != 'admin':\n        return {'fel': 'Bara för admin'}, 403\n    return {'admin': True}\n",
    hints: [
      "session['roll'] = 'admin' if … else 'gast'",
      'Först 401, sedan 403.',
      "return {'admin': True}",
    ],
    tests: [
      {
        description: 'Utloggad',
        code: "__get('/admin').status",
        expected: 401,
      },
      {
        description: 'Gäst',
        code: "(k := __klient(), k.post('/logga-in', form={'namn': 'Bo'}), k.get('/admin').status)[-1]",
        expected: 403,
      },
      {
        description: 'Admin',
        code: "(k := __klient(), k.post('/logga-in', form={'namn': 'Ada'}), k.get('/admin').json)[-1]",
        expected: { admin: true },
      },
    ],
    request: { path: '/admin' },
  },
  {
    id: 'inloggning-08',
    track: 'inloggning',
    title: 'Ingen hemlig nyckel',
    xp: 10,
    description:
      'Inloggningen kraschar: `RuntimeError: The session is unavailable because no secret key was set`.',
    explain:
      'Sessionen signeras med `app.secret_key`. Utan nyckel vägrar Flask, för då kunde vem som helst skriva en egen cookie och låtsas vara inloggad.\n\nI en riktig app är nyckeln lång och slumpad, och står inte i koden.',
    example: "app.secret_key = 'en-lång-slumpad-text'",
    task: 'Uppgift: Laga appen.',
    starterCode:
      "from flask import Flask, request, session\n\napp = Flask(__name__)\n\n\n@app.post('/logga-in')\ndef logga_in():\n    session['namn'] = request.form['namn']\n    return {'inloggad': session['namn']}\n",
    solution:
      "from flask import Flask, request, session\n\napp = Flask(__name__)\napp.secret_key = 'byt-mig-i-en-riktig-app'\n\n\n@app.post('/logga-in')\ndef logga_in():\n    session['namn'] = request.form['namn']\n    return {'inloggad': session['namn']}\n",
    hints: [
      'Läs felet.',
      'Appen behöver en secret_key.',
      "app.secret_key = 'byt-mig-i-en-riktig-app'",
    ],
    tests: [
      {
        description: 'Inloggning',
        code: "__post('/logga-in', form={'namn': 'Ada'}).json",
        expected: { inloggad: 'Ada' },
      },
    ],
    request: {
      method: 'POST',
      path: '/logga-in',
      kind: 'form',
      body: 'namn=Ada',
    },
  },
  {
    id: 'inloggning-09',
    track: 'inloggning',
    title: 'Mina saker',
    xp: 20,
    description:
      'När appen vet vem som är inloggad kan varje användare få sina egna saker.',
    explain:
      "Spara vem som äger varje sak, och filtrera på `session['namn']`. Ingen ska kunna se någon annans.",
    example: "[a for a in anteckningar if a['agare'] == session['namn']]",
    task: "Uppgift: `POST /anteckningar` sparar `{'agare': namn, 'text': …}`, och `GET /anteckningar` svarar med bara den inloggades texter. Båda kräver inloggning (401).",
    starterCode:
      "from flask import Flask, request, session\n\napp = Flask(__name__)\napp.secret_key = 'byt-mig-i-en-riktig-app'\n\n\n@app.post('/logga-in')\ndef logga_in():\n    session['namn'] = request.form['namn']\n    return {'inloggad': session['namn']}\n\nanteckningar = []\n",
    solution:
      "from flask import Flask, request, session\n\napp = Flask(__name__)\napp.secret_key = 'byt-mig-i-en-riktig-app'\n\n\n@app.post('/logga-in')\ndef logga_in():\n    session['namn'] = request.form['namn']\n    return {'inloggad': session['namn']}\n\nanteckningar = []\n\n\n@app.post('/anteckningar')\ndef ny():\n    if 'namn' not in session:\n        return {'fel': 'Logga in först'}, 401\n    anteckningar.append({'agare': session['namn'], 'text': request.get_json()['text']})\n    return {'ok': True}, 201\n\n\n@app.get('/anteckningar')\ndef mina():\n    if 'namn' not in session:\n        return {'fel': 'Logga in först'}, 401\n    return [a['text'] for a in anteckningar if a['agare'] == session['namn']]\n",
    hints: [
      "'agare': session['namn']",
      "if a['agare'] == session['namn']",
      'Båda vägarna kollar inloggningen.',
    ],
    tests: [
      {
        description: 'Utloggad',
        code: "__get('/anteckningar').status",
        expected: 401,
        inputs: [],
      },
      {
        description: 'Bara mina',
        code: "(a := __klient(), b := __klient(), a.post('/logga-in', form={'namn': 'Ada'}), b.post('/logga-in', form={'namn': 'Bo'}), a.post('/anteckningar', {'text': 'Adas'}), b.post('/anteckningar', {'text': 'Bos'}), a.get('/anteckningar').json)[-1]",
        expected: ['Adas'],
        inputs: [],
      },
    ],
    request: { path: '/anteckningar' },
  },
];
