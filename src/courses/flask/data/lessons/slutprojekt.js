// Bana 13: slutprojektet. Boknings-API:t för hundpensionatet Tassen byggs
// en del i taget. Varje startkod har allt som byggts hittills.

// Det som byggts i banan, till bossen.
export const SLUTPROJEKT_BAS =
  "import sqlite3\nfrom datetime import date\n\nfrom flask import Flask, abort, request, session\n\napp = Flask(__name__)\napp.secret_key = 'byt-mig-i-en-riktig-app'\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (\n    id INTEGER PRIMARY KEY,\n    namn TEXT NOT NULL,\n    storlek TEXT NOT NULL CHECK (storlek IN ('liten', 'mellan', 'stor'))\n);\nCREATE TABLE bokningar (\n    id INTEGER PRIMARY KEY,\n    hund_id INTEGER NOT NULL REFERENCES hundar(id),\n    fran TEXT NOT NULL,\n    till TEXT NOT NULL\n);\nINSERT INTO hundar (namn, storlek) VALUES ('Bamse', 'stor'), ('Saga', 'liten');\n''')\n\n\ndef fraga(sql, parametrar=()):\n    return [dict(rad) for rad in db.execute(sql, parametrar).fetchall()]\n\nPRIS_PER_NATT = {'liten': 250, 'mellan': 300, 'stor': 350}\n\n\ndef natter(fran, till):\n    return (date.fromisoformat(till) - date.fromisoformat(fran)).days\n\n\n@app.get('/hundar')\ndef hundar():\n    return fraga('SELECT * FROM hundar ORDER BY namn')\n\n\n@app.post('/hundar')\ndef ny_hund():\n    data = request.get_json()\n    if not data.get('namn') or data.get('storlek') not in ('liten', 'mellan', 'stor'):\n        abort(400, description='namn och storlek (liten, mellan, stor) krävs')\n    cur = db.execute('INSERT INTO hundar (namn, storlek) VALUES (?, ?)', (data['namn'], data['storlek']))\n    db.commit()\n    return {'id': cur.lastrowid, 'namn': data['namn'], 'storlek': data['storlek']}, 201\n\n\n@app.errorhandler(400)\n@app.errorhandler(401)\n@app.errorhandler(404)\n@app.errorhandler(409)\ndef felsvar(fel):\n    return {'fel': fel.description}, fel.code\n\n\n@app.get('/bokningar')\ndef bokningar():\n    return fraga('''\n        SELECT b.id, h.namn AS hund, b.fran, b.till\n        FROM bokningar b JOIN hundar h ON h.id = b.hund_id\n        ORDER BY b.fran\n    ''')\n\n\n@app.post('/bokningar')\ndef boka():\n    data = request.get_json()\n    fran, till = data.get('fran', ''), data.get('till', '')\n    if not fran or not till or till <= fran:\n        abort(400, description='till måste vara efter fran')\n    if not fraga('SELECT id FROM hundar WHERE id = ?', (data.get('hund_id'),)):\n        abort(404, description='Ingen sådan hund')\n    krock = fraga(\n        'SELECT id FROM bokningar WHERE hund_id = ? AND fran < ? AND ? < till',\n        (data['hund_id'], till, fran),\n    )\n    if krock:\n        abort(409, description='Hunden är redan bokad då')\n    cur = db.execute('INSERT INTO bokningar (hund_id, fran, till) VALUES (?, ?, ?)', (data['hund_id'], fran, till))\n    db.commit()\n    return {'id': cur.lastrowid, 'hund_id': data['hund_id'], 'fran': fran, 'till': till}, 201\n\n\n@app.get('/bokningar/<int:id>')\ndef bokning(id):\n    rader = fraga('''\n        SELECT b.id, h.namn AS hund, h.storlek, b.fran, b.till\n        FROM bokningar b JOIN hundar h ON h.id = b.hund_id WHERE b.id = ?\n    ''', (id,))\n    if not rader:\n        abort(404, description='Ingen sådan bokning')\n    b = rader[0]\n    n = natter(b['fran'], b['till'])\n    return {**b, 'natter': n, 'pris': n * PRIS_PER_NATT[b['storlek']]}\n\n\n@app.delete('/bokningar/<int:id>')\ndef avboka(id):\n    if not session.get('personal'):\n        abort(401, description='Bara personalen kan avboka')\n    cur = db.execute('DELETE FROM bokningar WHERE id = ?', (id,))\n    db.commit()\n    if cur.rowcount == 0:\n        abort(404, description='Ingen sådan bokning')\n    return '', 204\n\n\n@app.post('/personal/logga-in')\ndef logga_in():\n    if request.get_json().get('kod') != 'tassen2026':\n        abort(401, description='Fel kod')\n    session['personal'] = True\n    return {'inloggad': True}\n";

export const SLUTPROJEKT = [
  {
    id: 'slutprojekt-01',
    track: 'slutprojekt',
    title: 'Databasen',
    xp: 15,
    description:
      'Slutprojektet är ett boknings-API för hundpensionatet Tassen – samma pensionat som i SQL- och TypeScript-kurserna. Allt börjar med databasen.',
    explain:
      'Tabellerna står i startkoden. `CHECK` gör att storleken bara kan vara tre värden, och `REFERENCES` att en bokning hör till en hund.\n\nSkriv hjälpfunktionen `fraga` som ger rader som dictionaries – den används i resten av projektet.',
    example:
      'def fraga(sql, parametrar=()):\n    return [dict(rad) for rad in db.execute(sql, parametrar).fetchall()]',
    task: 'Uppgift: Skriv `fraga(sql, parametrar=())`.',
    starterCode:
      "import sqlite3\n\nfrom flask import Flask, abort, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (\n    id INTEGER PRIMARY KEY,\n    namn TEXT NOT NULL,\n    storlek TEXT NOT NULL CHECK (storlek IN ('liten', 'mellan', 'stor'))\n);\nCREATE TABLE bokningar (\n    id INTEGER PRIMARY KEY,\n    hund_id INTEGER NOT NULL REFERENCES hundar(id),\n    fran TEXT NOT NULL,\n    till TEXT NOT NULL\n);\nINSERT INTO hundar (namn, storlek) VALUES ('Bamse', 'stor'), ('Saga', 'liten');\n''')\n",
    solution:
      "import sqlite3\n\nfrom flask import Flask, abort, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (\n    id INTEGER PRIMARY KEY,\n    namn TEXT NOT NULL,\n    storlek TEXT NOT NULL CHECK (storlek IN ('liten', 'mellan', 'stor'))\n);\nCREATE TABLE bokningar (\n    id INTEGER PRIMARY KEY,\n    hund_id INTEGER NOT NULL REFERENCES hundar(id),\n    fran TEXT NOT NULL,\n    till TEXT NOT NULL\n);\nINSERT INTO hundar (namn, storlek) VALUES ('Bamse', 'stor'), ('Saga', 'liten');\n''')\n\n\ndef fraga(sql, parametrar=()):\n    return [dict(rad) for rad in db.execute(sql, parametrar).fetchall()]\n",
    hints: [
      'def fraga(sql, parametrar=()):',
      'db.execute(sql, parametrar).fetchall()',
      'return [dict(rad) for rad in …]',
    ],
    tests: [
      {
        description: 'Hundarna',
        code: "fraga('SELECT namn FROM hundar ORDER BY id')",
        expected: [{ namn: 'Bamse' }, { namn: 'Saga' }],
      },
      {
        description: 'Med parameter',
        code: "fraga('SELECT storlek FROM hundar WHERE id = ?', (2,))",
        expected: [{ storlek: 'liten' }],
      },
    ],
  },
  {
    id: 'slutprojekt-02',
    track: 'slutprojekt',
    title: 'Hundarna',
    xp: 10,
    description: 'Första vägen: alla hundar, i bokstavsordning.',
    explain: 'Med `fraga` blir vägen en enda rad.',
    example: "return fraga('SELECT * FROM bocker')",
    task: 'Uppgift: `GET /hundar` svarar med alla hundar, sorterade på namn.',
    starterCode:
      "import sqlite3\n\nfrom flask import Flask, abort, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (\n    id INTEGER PRIMARY KEY,\n    namn TEXT NOT NULL,\n    storlek TEXT NOT NULL CHECK (storlek IN ('liten', 'mellan', 'stor'))\n);\nCREATE TABLE bokningar (\n    id INTEGER PRIMARY KEY,\n    hund_id INTEGER NOT NULL REFERENCES hundar(id),\n    fran TEXT NOT NULL,\n    till TEXT NOT NULL\n);\nINSERT INTO hundar (namn, storlek) VALUES ('Bamse', 'stor'), ('Saga', 'liten');\n''')\n\n\ndef fraga(sql, parametrar=()):\n    return [dict(rad) for rad in db.execute(sql, parametrar).fetchall()]\n",
    solution:
      "import sqlite3\n\nfrom flask import Flask, abort, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (\n    id INTEGER PRIMARY KEY,\n    namn TEXT NOT NULL,\n    storlek TEXT NOT NULL CHECK (storlek IN ('liten', 'mellan', 'stor'))\n);\nCREATE TABLE bokningar (\n    id INTEGER PRIMARY KEY,\n    hund_id INTEGER NOT NULL REFERENCES hundar(id),\n    fran TEXT NOT NULL,\n    till TEXT NOT NULL\n);\nINSERT INTO hundar (namn, storlek) VALUES ('Bamse', 'stor'), ('Saga', 'liten');\n''')\n\n\ndef fraga(sql, parametrar=()):\n    return [dict(rad) for rad in db.execute(sql, parametrar).fetchall()]\n\n\n@app.get('/hundar')\ndef hundar():\n    return fraga('SELECT * FROM hundar ORDER BY namn')\n",
    hints: [
      "@app.get('/hundar')",
      'ORDER BY namn',
      "return fraga('SELECT * FROM hundar ORDER BY namn')",
    ],
    tests: [
      {
        description: 'Två hundar',
        code: "__get('/hundar').json",
        expected: [
          { id: 1, namn: 'Bamse', storlek: 'stor' },
          { id: 2, namn: 'Saga', storlek: 'liten' },
        ],
      },
    ],
    request: { path: '/hundar' },
  },
  {
    id: 'slutprojekt-03',
    track: 'slutprojekt',
    title: 'Nya hundar',
    xp: 20,
    description:
      'Nya hundar ska kunna läggas till, med kontroll och tydliga fel.',
    explain:
      'Felhanteraren från bana 7 gör alla fel till JSON. `abort(400, description=…)` räcker sedan i vägarna.',
    example: "abort(400, description='…')",
    task: "Uppgift: `POST /hundar` kräver `namn` och en `storlek` som är liten, mellan eller stor (annars `abort(400, …)`). Lägg till en felhanterare för 400, 404 och 409 som svarar `{'fel': fel.description}`.",
    starterCode:
      "import sqlite3\n\nfrom flask import Flask, abort, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (\n    id INTEGER PRIMARY KEY,\n    namn TEXT NOT NULL,\n    storlek TEXT NOT NULL CHECK (storlek IN ('liten', 'mellan', 'stor'))\n);\nCREATE TABLE bokningar (\n    id INTEGER PRIMARY KEY,\n    hund_id INTEGER NOT NULL REFERENCES hundar(id),\n    fran TEXT NOT NULL,\n    till TEXT NOT NULL\n);\nINSERT INTO hundar (namn, storlek) VALUES ('Bamse', 'stor'), ('Saga', 'liten');\n''')\n\n\ndef fraga(sql, parametrar=()):\n    return [dict(rad) for rad in db.execute(sql, parametrar).fetchall()]\n\n\n@app.get('/hundar')\ndef hundar():\n    return fraga('SELECT * FROM hundar ORDER BY namn')\n",
    solution:
      "import sqlite3\n\nfrom flask import Flask, abort, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (\n    id INTEGER PRIMARY KEY,\n    namn TEXT NOT NULL,\n    storlek TEXT NOT NULL CHECK (storlek IN ('liten', 'mellan', 'stor'))\n);\nCREATE TABLE bokningar (\n    id INTEGER PRIMARY KEY,\n    hund_id INTEGER NOT NULL REFERENCES hundar(id),\n    fran TEXT NOT NULL,\n    till TEXT NOT NULL\n);\nINSERT INTO hundar (namn, storlek) VALUES ('Bamse', 'stor'), ('Saga', 'liten');\n''')\n\n\ndef fraga(sql, parametrar=()):\n    return [dict(rad) for rad in db.execute(sql, parametrar).fetchall()]\n\n\n@app.get('/hundar')\ndef hundar():\n    return fraga('SELECT * FROM hundar ORDER BY namn')\n\n\n@app.post('/hundar')\ndef ny_hund():\n    data = request.get_json()\n    if not data.get('namn') or data.get('storlek') not in ('liten', 'mellan', 'stor'):\n        abort(400, description='namn och storlek (liten, mellan, stor) krävs')\n    cur = db.execute('INSERT INTO hundar (namn, storlek) VALUES (?, ?)', (data['namn'], data['storlek']))\n    db.commit()\n    return {'id': cur.lastrowid, 'namn': data['namn'], 'storlek': data['storlek']}, 201\n\n\n@app.errorhandler(400)\n@app.errorhandler(404)\n@app.errorhandler(409)\ndef felsvar(fel):\n    return {'fel': fel.description}, fel.code\n",
    hints: [
      "data.get('storlek') not in ('liten', 'mellan', 'stor')",
      'abort(400, description=…)',
      "@app.errorhandler(400) … return {'fel': fel.description}, fel.code",
    ],
    tests: [
      {
        description: 'Ny hund',
        code: "__post('/hundar', {'namn': 'Rufus', 'storlek': 'mellan'}).json",
        expected: { id: 3, namn: 'Rufus', storlek: 'mellan' },
        inputs: [],
      },
      {
        description: 'Fel storlek',
        code: "__post('/hundar', {'namn': 'Rufus', 'storlek': 'jätte'}).status",
        expected: 400,
        inputs: [],
      },
      {
        description: 'Felet i JSON',
        code: "'fel' in __post('/hundar', {}).json",
        expected: true,
        inputs: [],
      },
    ],
    request: {
      method: 'POST',
      path: '/hundar',
      body: '{"namn": "Rufus", "storlek": "mellan"}',
    },
  },
  {
    id: 'slutprojekt-04',
    track: 'slutprojekt',
    title: 'Bokningarna',
    xp: 15,
    description:
      'Personalen vill se alla bokningar – med hundens namn, inte bara id:t.',
    explain: 'JOIN mellan bokningar och hundar, sorterat på datum.',
    example: 'FROM bokningar b JOIN hundar h ON h.id = b.hund_id',
    task: "Uppgift: `GET /bokningar` svarar med `{'id', 'hund', 'fran', 'till'}` för varje bokning, sorterat på `fran`.",
    starterCode:
      "import sqlite3\n\nfrom flask import Flask, abort, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (\n    id INTEGER PRIMARY KEY,\n    namn TEXT NOT NULL,\n    storlek TEXT NOT NULL CHECK (storlek IN ('liten', 'mellan', 'stor'))\n);\nCREATE TABLE bokningar (\n    id INTEGER PRIMARY KEY,\n    hund_id INTEGER NOT NULL REFERENCES hundar(id),\n    fran TEXT NOT NULL,\n    till TEXT NOT NULL\n);\nINSERT INTO hundar (namn, storlek) VALUES ('Bamse', 'stor'), ('Saga', 'liten');\n''')\n\n\ndef fraga(sql, parametrar=()):\n    return [dict(rad) for rad in db.execute(sql, parametrar).fetchall()]\n\n\n@app.get('/hundar')\ndef hundar():\n    return fraga('SELECT * FROM hundar ORDER BY namn')\n\n\n@app.post('/hundar')\ndef ny_hund():\n    data = request.get_json()\n    if not data.get('namn') or data.get('storlek') not in ('liten', 'mellan', 'stor'):\n        abort(400, description='namn och storlek (liten, mellan, stor) krävs')\n    cur = db.execute('INSERT INTO hundar (namn, storlek) VALUES (?, ?)', (data['namn'], data['storlek']))\n    db.commit()\n    return {'id': cur.lastrowid, 'namn': data['namn'], 'storlek': data['storlek']}, 201\n\n\n@app.errorhandler(400)\n@app.errorhandler(404)\n@app.errorhandler(409)\ndef felsvar(fel):\n    return {'fel': fel.description}, fel.code\n",
    solution:
      "import sqlite3\n\nfrom flask import Flask, abort, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (\n    id INTEGER PRIMARY KEY,\n    namn TEXT NOT NULL,\n    storlek TEXT NOT NULL CHECK (storlek IN ('liten', 'mellan', 'stor'))\n);\nCREATE TABLE bokningar (\n    id INTEGER PRIMARY KEY,\n    hund_id INTEGER NOT NULL REFERENCES hundar(id),\n    fran TEXT NOT NULL,\n    till TEXT NOT NULL\n);\nINSERT INTO hundar (namn, storlek) VALUES ('Bamse', 'stor'), ('Saga', 'liten');\n''')\n\n\ndef fraga(sql, parametrar=()):\n    return [dict(rad) for rad in db.execute(sql, parametrar).fetchall()]\n\n\n@app.get('/hundar')\ndef hundar():\n    return fraga('SELECT * FROM hundar ORDER BY namn')\n\n\n@app.post('/hundar')\ndef ny_hund():\n    data = request.get_json()\n    if not data.get('namn') or data.get('storlek') not in ('liten', 'mellan', 'stor'):\n        abort(400, description='namn och storlek (liten, mellan, stor) krävs')\n    cur = db.execute('INSERT INTO hundar (namn, storlek) VALUES (?, ?)', (data['namn'], data['storlek']))\n    db.commit()\n    return {'id': cur.lastrowid, 'namn': data['namn'], 'storlek': data['storlek']}, 201\n\n\n@app.errorhandler(400)\n@app.errorhandler(404)\n@app.errorhandler(409)\ndef felsvar(fel):\n    return {'fel': fel.description}, fel.code\n\n\n@app.get('/bokningar')\ndef bokningar():\n    return fraga('''\n        SELECT b.id, h.namn AS hund, b.fran, b.till\n        FROM bokningar b JOIN hundar h ON h.id = b.hund_id\n        ORDER BY b.fran\n    ''')\n",
    hints: [
      'JOIN hundar h ON h.id = b.hund_id',
      'h.namn AS hund',
      'ORDER BY b.fran',
    ],
    tests: [
      {
        description: 'Inga än',
        code: "__get('/bokningar').json",
        expected: [],
      },
      {
        description: 'En bokning',
        code: "(db.execute(\"INSERT INTO bokningar (hund_id, fran, till) VALUES (2, '2026-06-10', '2026-06-12')\"), __get('/bokningar').json)[-1]",
        expected: [
          { id: 1, hund: 'Saga', fran: '2026-06-10', till: '2026-06-12' },
        ],
        inputs: [],
      },
    ],
    request: { path: '/bokningar' },
  },
  {
    id: 'slutprojekt-05',
    track: 'slutprojekt',
    title: 'Boka',
    xp: 20,
    description: 'Nu kan en hund bokas. Datumen och hunden kontrolleras först.',
    explain:
      "Datumen är text som `'2026-06-10'`. Den formen sorteras rätt, så `till <= fran` fungerar som jämförelse.",
    example: "if till <= fran:\n    abort(400, description='…')",
    task: "Uppgift: `POST /bokningar` (JSON: hund_id, fran, till). `till` måste vara efter `fran` (400, `'till måste vara efter fran'`), och hunden måste finnas (404, `'Ingen sådan hund'`). Svar med bokningen och 201.",
    starterCode:
      "import sqlite3\n\nfrom flask import Flask, abort, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (\n    id INTEGER PRIMARY KEY,\n    namn TEXT NOT NULL,\n    storlek TEXT NOT NULL CHECK (storlek IN ('liten', 'mellan', 'stor'))\n);\nCREATE TABLE bokningar (\n    id INTEGER PRIMARY KEY,\n    hund_id INTEGER NOT NULL REFERENCES hundar(id),\n    fran TEXT NOT NULL,\n    till TEXT NOT NULL\n);\nINSERT INTO hundar (namn, storlek) VALUES ('Bamse', 'stor'), ('Saga', 'liten');\n''')\n\n\ndef fraga(sql, parametrar=()):\n    return [dict(rad) for rad in db.execute(sql, parametrar).fetchall()]\n\n\n@app.get('/hundar')\ndef hundar():\n    return fraga('SELECT * FROM hundar ORDER BY namn')\n\n\n@app.post('/hundar')\ndef ny_hund():\n    data = request.get_json()\n    if not data.get('namn') or data.get('storlek') not in ('liten', 'mellan', 'stor'):\n        abort(400, description='namn och storlek (liten, mellan, stor) krävs')\n    cur = db.execute('INSERT INTO hundar (namn, storlek) VALUES (?, ?)', (data['namn'], data['storlek']))\n    db.commit()\n    return {'id': cur.lastrowid, 'namn': data['namn'], 'storlek': data['storlek']}, 201\n\n\n@app.errorhandler(400)\n@app.errorhandler(404)\n@app.errorhandler(409)\ndef felsvar(fel):\n    return {'fel': fel.description}, fel.code\n\n\n@app.get('/bokningar')\ndef bokningar():\n    return fraga('''\n        SELECT b.id, h.namn AS hund, b.fran, b.till\n        FROM bokningar b JOIN hundar h ON h.id = b.hund_id\n        ORDER BY b.fran\n    ''')\n",
    solution:
      "import sqlite3\n\nfrom flask import Flask, abort, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (\n    id INTEGER PRIMARY KEY,\n    namn TEXT NOT NULL,\n    storlek TEXT NOT NULL CHECK (storlek IN ('liten', 'mellan', 'stor'))\n);\nCREATE TABLE bokningar (\n    id INTEGER PRIMARY KEY,\n    hund_id INTEGER NOT NULL REFERENCES hundar(id),\n    fran TEXT NOT NULL,\n    till TEXT NOT NULL\n);\nINSERT INTO hundar (namn, storlek) VALUES ('Bamse', 'stor'), ('Saga', 'liten');\n''')\n\n\ndef fraga(sql, parametrar=()):\n    return [dict(rad) for rad in db.execute(sql, parametrar).fetchall()]\n\n\n@app.get('/hundar')\ndef hundar():\n    return fraga('SELECT * FROM hundar ORDER BY namn')\n\n\n@app.post('/hundar')\ndef ny_hund():\n    data = request.get_json()\n    if not data.get('namn') or data.get('storlek') not in ('liten', 'mellan', 'stor'):\n        abort(400, description='namn och storlek (liten, mellan, stor) krävs')\n    cur = db.execute('INSERT INTO hundar (namn, storlek) VALUES (?, ?)', (data['namn'], data['storlek']))\n    db.commit()\n    return {'id': cur.lastrowid, 'namn': data['namn'], 'storlek': data['storlek']}, 201\n\n\n@app.errorhandler(400)\n@app.errorhandler(404)\n@app.errorhandler(409)\ndef felsvar(fel):\n    return {'fel': fel.description}, fel.code\n\n\n@app.get('/bokningar')\ndef bokningar():\n    return fraga('''\n        SELECT b.id, h.namn AS hund, b.fran, b.till\n        FROM bokningar b JOIN hundar h ON h.id = b.hund_id\n        ORDER BY b.fran\n    ''')\n\n\n@app.post('/bokningar')\ndef boka():\n    data = request.get_json()\n    fran, till = data.get('fran', ''), data.get('till', '')\n    if not fran or not till or till <= fran:\n        abort(400, description='till måste vara efter fran')\n    if not fraga('SELECT id FROM hundar WHERE id = ?', (data.get('hund_id'),)):\n        abort(404, description='Ingen sådan hund')\n    cur = db.execute('INSERT INTO bokningar (hund_id, fran, till) VALUES (?, ?, ?)', (data['hund_id'], fran, till))\n    db.commit()\n    return {'id': cur.lastrowid, 'hund_id': data['hund_id'], 'fran': fran, 'till': till}, 201\n",
    hints: [
      'if not fran or not till or till <= fran:',
      "fraga('SELECT id FROM hundar WHERE id = ?', (data.get('hund_id'),))",
      'return {…}, 201',
    ],
    tests: [
      {
        description: 'Boka',
        code: "__post('/bokningar', {'hund_id': 1, 'fran': '2026-06-10', 'till': '2026-06-13'}).status",
        expected: 201,
        inputs: [],
      },
      {
        description: 'Fel datum',
        code: "__post('/bokningar', {'hund_id': 1, 'fran': '2026-06-13', 'till': '2026-06-10'}).json",
        expected: { fel: 'till måste vara efter fran' },
        inputs: [],
      },
      {
        description: 'Okänd hund',
        code: "__post('/bokningar', {'hund_id': 9, 'fran': '2026-06-10', 'till': '2026-06-11'}).status",
        expected: 404,
        inputs: [],
      },
    ],
    request: {
      method: 'POST',
      path: '/bokningar',
      body: '{"hund_id": 1, "fran": "2026-06-10", "till": "2026-06-13"}',
    },
  },
  {
    id: 'slutprojekt-06',
    track: 'slutprojekt',
    title: 'Ingen dubbelbokning',
    xp: 20,
    description: 'En hund kan inte bo på pensionatet två gånger samma natt.',
    explain:
      'Två bokningar krockar om den ena börjar innan den andra slutar, och tvärtom: `fran < ny_till AND ny_fran < till`. Den frågan ställs till databasen.',
    example:
      'SELECT id FROM bokningar WHERE hund_id = ? AND fran < ? AND ? < till',
    task: "Uppgift: Innan bokningen sparas, kolla krockar. En krock ger 409 med `'Hunden är redan bokad då'`.",
    starterCode:
      "import sqlite3\n\nfrom flask import Flask, abort, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (\n    id INTEGER PRIMARY KEY,\n    namn TEXT NOT NULL,\n    storlek TEXT NOT NULL CHECK (storlek IN ('liten', 'mellan', 'stor'))\n);\nCREATE TABLE bokningar (\n    id INTEGER PRIMARY KEY,\n    hund_id INTEGER NOT NULL REFERENCES hundar(id),\n    fran TEXT NOT NULL,\n    till TEXT NOT NULL\n);\nINSERT INTO hundar (namn, storlek) VALUES ('Bamse', 'stor'), ('Saga', 'liten');\n''')\n\n\ndef fraga(sql, parametrar=()):\n    return [dict(rad) for rad in db.execute(sql, parametrar).fetchall()]\n\n\n@app.get('/hundar')\ndef hundar():\n    return fraga('SELECT * FROM hundar ORDER BY namn')\n\n\n@app.post('/hundar')\ndef ny_hund():\n    data = request.get_json()\n    if not data.get('namn') or data.get('storlek') not in ('liten', 'mellan', 'stor'):\n        abort(400, description='namn och storlek (liten, mellan, stor) krävs')\n    cur = db.execute('INSERT INTO hundar (namn, storlek) VALUES (?, ?)', (data['namn'], data['storlek']))\n    db.commit()\n    return {'id': cur.lastrowid, 'namn': data['namn'], 'storlek': data['storlek']}, 201\n\n\n@app.errorhandler(400)\n@app.errorhandler(404)\n@app.errorhandler(409)\ndef felsvar(fel):\n    return {'fel': fel.description}, fel.code\n\n\n@app.get('/bokningar')\ndef bokningar():\n    return fraga('''\n        SELECT b.id, h.namn AS hund, b.fran, b.till\n        FROM bokningar b JOIN hundar h ON h.id = b.hund_id\n        ORDER BY b.fran\n    ''')\n\n\n@app.post('/bokningar')\ndef boka():\n    data = request.get_json()\n    fran, till = data.get('fran', ''), data.get('till', '')\n    if not fran or not till or till <= fran:\n        abort(400, description='till måste vara efter fran')\n    if not fraga('SELECT id FROM hundar WHERE id = ?', (data.get('hund_id'),)):\n        abort(404, description='Ingen sådan hund')\n    cur = db.execute('INSERT INTO bokningar (hund_id, fran, till) VALUES (?, ?, ?)', (data['hund_id'], fran, till))\n    db.commit()\n    return {'id': cur.lastrowid, 'hund_id': data['hund_id'], 'fran': fran, 'till': till}, 201\n",
    solution:
      "import sqlite3\n\nfrom flask import Flask, abort, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (\n    id INTEGER PRIMARY KEY,\n    namn TEXT NOT NULL,\n    storlek TEXT NOT NULL CHECK (storlek IN ('liten', 'mellan', 'stor'))\n);\nCREATE TABLE bokningar (\n    id INTEGER PRIMARY KEY,\n    hund_id INTEGER NOT NULL REFERENCES hundar(id),\n    fran TEXT NOT NULL,\n    till TEXT NOT NULL\n);\nINSERT INTO hundar (namn, storlek) VALUES ('Bamse', 'stor'), ('Saga', 'liten');\n''')\n\n\ndef fraga(sql, parametrar=()):\n    return [dict(rad) for rad in db.execute(sql, parametrar).fetchall()]\n\n\n@app.get('/hundar')\ndef hundar():\n    return fraga('SELECT * FROM hundar ORDER BY namn')\n\n\n@app.post('/hundar')\ndef ny_hund():\n    data = request.get_json()\n    if not data.get('namn') or data.get('storlek') not in ('liten', 'mellan', 'stor'):\n        abort(400, description='namn och storlek (liten, mellan, stor) krävs')\n    cur = db.execute('INSERT INTO hundar (namn, storlek) VALUES (?, ?)', (data['namn'], data['storlek']))\n    db.commit()\n    return {'id': cur.lastrowid, 'namn': data['namn'], 'storlek': data['storlek']}, 201\n\n\n@app.errorhandler(400)\n@app.errorhandler(404)\n@app.errorhandler(409)\ndef felsvar(fel):\n    return {'fel': fel.description}, fel.code\n\n\n@app.get('/bokningar')\ndef bokningar():\n    return fraga('''\n        SELECT b.id, h.namn AS hund, b.fran, b.till\n        FROM bokningar b JOIN hundar h ON h.id = b.hund_id\n        ORDER BY b.fran\n    ''')\n\n\n@app.post('/bokningar')\ndef boka():\n    data = request.get_json()\n    fran, till = data.get('fran', ''), data.get('till', '')\n    if not fran or not till or till <= fran:\n        abort(400, description='till måste vara efter fran')\n    if not fraga('SELECT id FROM hundar WHERE id = ?', (data.get('hund_id'),)):\n        abort(404, description='Ingen sådan hund')\n    krock = fraga(\n        'SELECT id FROM bokningar WHERE hund_id = ? AND fran < ? AND ? < till',\n        (data['hund_id'], till, fran),\n    )\n    if krock:\n        abort(409, description='Hunden är redan bokad då')\n    cur = db.execute('INSERT INTO bokningar (hund_id, fran, till) VALUES (?, ?, ?)', (data['hund_id'], fran, till))\n    db.commit()\n    return {'id': cur.lastrowid, 'hund_id': data['hund_id'], 'fran': fran, 'till': till}, 201\n",
    hints: [
      "fraga('SELECT id FROM bokningar WHERE hund_id = ? AND fran < ? AND ? < till', (data['hund_id'], till, fran))",
      'if krock: abort(409, …)',
      'Före INSERT.',
    ],
    tests: [
      {
        description: 'Krock',
        code: "(__post('/bokningar', {'hund_id': 1, 'fran': '2026-06-10', 'till': '2026-06-13'}), __post('/bokningar', {'hund_id': 1, 'fran': '2026-06-12', 'till': '2026-06-14'}).status)[-1]",
        expected: 409,
        inputs: [],
      },
      {
        description: 'Direkt efter går bra',
        code: "(__post('/bokningar', {'hund_id': 1, 'fran': '2026-06-10', 'till': '2026-06-13'}), __post('/bokningar', {'hund_id': 1, 'fran': '2026-06-13', 'till': '2026-06-14'}).status)[-1]",
        expected: 201,
        inputs: [],
      },
      {
        description: 'Annan hund går bra',
        code: "(__post('/bokningar', {'hund_id': 1, 'fran': '2026-06-10', 'till': '2026-06-13'}), __post('/bokningar', {'hund_id': 2, 'fran': '2026-06-10', 'till': '2026-06-13'}).status)[-1]",
        expected: 201,
        inputs: [],
      },
    ],
    request: {
      method: 'POST',
      path: '/bokningar',
      body: '{"hund_id": 1, "fran": "2026-06-12", "till": "2026-06-14"}',
    },
  },
  {
    id: 'slutprojekt-07',
    track: 'slutprojekt',
    title: 'Priset',
    xp: 20,
    description:
      'En bokning ska visa hur många nätter det är och vad det kostar.',
    explain:
      "`date.fromisoformat('2026-06-10')` gör om texten till ett datum. Skillnaden mellan två datum har `.days`.\n\nPriset beror på hundens storlek, som finns i hundtabellen – därför en JOIN igen.",
    example: '(date.fromisoformat(till) - date.fromisoformat(fran)).days',
    task: 'Uppgift: Skriv `natter(fran, till)` och `GET /bokningar/<int:id>` som svarar med bokningen plus `natter` och `pris` (nätter gånger `PRIS_PER_NATT` för storleken). 404 om den saknas.',
    starterCode:
      "import sqlite3\nfrom datetime import date\n\nfrom flask import Flask, abort, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (\n    id INTEGER PRIMARY KEY,\n    namn TEXT NOT NULL,\n    storlek TEXT NOT NULL CHECK (storlek IN ('liten', 'mellan', 'stor'))\n);\nCREATE TABLE bokningar (\n    id INTEGER PRIMARY KEY,\n    hund_id INTEGER NOT NULL REFERENCES hundar(id),\n    fran TEXT NOT NULL,\n    till TEXT NOT NULL\n);\nINSERT INTO hundar (namn, storlek) VALUES ('Bamse', 'stor'), ('Saga', 'liten');\n''')\n\n\ndef fraga(sql, parametrar=()):\n    return [dict(rad) for rad in db.execute(sql, parametrar).fetchall()]\n\nPRIS_PER_NATT = {'liten': 250, 'mellan': 300, 'stor': 350}\n\n\n@app.get('/hundar')\ndef hundar():\n    return fraga('SELECT * FROM hundar ORDER BY namn')\n\n\n@app.post('/hundar')\ndef ny_hund():\n    data = request.get_json()\n    if not data.get('namn') or data.get('storlek') not in ('liten', 'mellan', 'stor'):\n        abort(400, description='namn och storlek (liten, mellan, stor) krävs')\n    cur = db.execute('INSERT INTO hundar (namn, storlek) VALUES (?, ?)', (data['namn'], data['storlek']))\n    db.commit()\n    return {'id': cur.lastrowid, 'namn': data['namn'], 'storlek': data['storlek']}, 201\n\n\n@app.errorhandler(400)\n@app.errorhandler(404)\n@app.errorhandler(409)\ndef felsvar(fel):\n    return {'fel': fel.description}, fel.code\n\n\n@app.get('/bokningar')\ndef bokningar():\n    return fraga('''\n        SELECT b.id, h.namn AS hund, b.fran, b.till\n        FROM bokningar b JOIN hundar h ON h.id = b.hund_id\n        ORDER BY b.fran\n    ''')\n\n\n@app.post('/bokningar')\ndef boka():\n    data = request.get_json()\n    fran, till = data.get('fran', ''), data.get('till', '')\n    if not fran or not till or till <= fran:\n        abort(400, description='till måste vara efter fran')\n    if not fraga('SELECT id FROM hundar WHERE id = ?', (data.get('hund_id'),)):\n        abort(404, description='Ingen sådan hund')\n    krock = fraga(\n        'SELECT id FROM bokningar WHERE hund_id = ? AND fran < ? AND ? < till',\n        (data['hund_id'], till, fran),\n    )\n    if krock:\n        abort(409, description='Hunden är redan bokad då')\n    cur = db.execute('INSERT INTO bokningar (hund_id, fran, till) VALUES (?, ?, ?)', (data['hund_id'], fran, till))\n    db.commit()\n    return {'id': cur.lastrowid, 'hund_id': data['hund_id'], 'fran': fran, 'till': till}, 201\n",
    solution:
      "import sqlite3\nfrom datetime import date\n\nfrom flask import Flask, abort, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (\n    id INTEGER PRIMARY KEY,\n    namn TEXT NOT NULL,\n    storlek TEXT NOT NULL CHECK (storlek IN ('liten', 'mellan', 'stor'))\n);\nCREATE TABLE bokningar (\n    id INTEGER PRIMARY KEY,\n    hund_id INTEGER NOT NULL REFERENCES hundar(id),\n    fran TEXT NOT NULL,\n    till TEXT NOT NULL\n);\nINSERT INTO hundar (namn, storlek) VALUES ('Bamse', 'stor'), ('Saga', 'liten');\n''')\n\n\ndef fraga(sql, parametrar=()):\n    return [dict(rad) for rad in db.execute(sql, parametrar).fetchall()]\n\nPRIS_PER_NATT = {'liten': 250, 'mellan': 300, 'stor': 350}\n\n\ndef natter(fran, till):\n    return (date.fromisoformat(till) - date.fromisoformat(fran)).days\n\n\n@app.get('/hundar')\ndef hundar():\n    return fraga('SELECT * FROM hundar ORDER BY namn')\n\n\n@app.post('/hundar')\ndef ny_hund():\n    data = request.get_json()\n    if not data.get('namn') or data.get('storlek') not in ('liten', 'mellan', 'stor'):\n        abort(400, description='namn och storlek (liten, mellan, stor) krävs')\n    cur = db.execute('INSERT INTO hundar (namn, storlek) VALUES (?, ?)', (data['namn'], data['storlek']))\n    db.commit()\n    return {'id': cur.lastrowid, 'namn': data['namn'], 'storlek': data['storlek']}, 201\n\n\n@app.errorhandler(400)\n@app.errorhandler(404)\n@app.errorhandler(409)\ndef felsvar(fel):\n    return {'fel': fel.description}, fel.code\n\n\n@app.get('/bokningar')\ndef bokningar():\n    return fraga('''\n        SELECT b.id, h.namn AS hund, b.fran, b.till\n        FROM bokningar b JOIN hundar h ON h.id = b.hund_id\n        ORDER BY b.fran\n    ''')\n\n\n@app.post('/bokningar')\ndef boka():\n    data = request.get_json()\n    fran, till = data.get('fran', ''), data.get('till', '')\n    if not fran or not till or till <= fran:\n        abort(400, description='till måste vara efter fran')\n    if not fraga('SELECT id FROM hundar WHERE id = ?', (data.get('hund_id'),)):\n        abort(404, description='Ingen sådan hund')\n    krock = fraga(\n        'SELECT id FROM bokningar WHERE hund_id = ? AND fran < ? AND ? < till',\n        (data['hund_id'], till, fran),\n    )\n    if krock:\n        abort(409, description='Hunden är redan bokad då')\n    cur = db.execute('INSERT INTO bokningar (hund_id, fran, till) VALUES (?, ?, ?)', (data['hund_id'], fran, till))\n    db.commit()\n    return {'id': cur.lastrowid, 'hund_id': data['hund_id'], 'fran': fran, 'till': till}, 201\n\n\n@app.get('/bokningar/<int:id>')\ndef bokning(id):\n    rader = fraga('''\n        SELECT b.id, h.namn AS hund, h.storlek, b.fran, b.till\n        FROM bokningar b JOIN hundar h ON h.id = b.hund_id WHERE b.id = ?\n    ''', (id,))\n    if not rader:\n        abort(404, description='Ingen sådan bokning')\n    b = rader[0]\n    n = natter(b['fran'], b['till'])\n    return {**b, 'natter': n, 'pris': n * PRIS_PER_NATT[b['storlek']]}\n",
    hints: [
      'def natter(fran, till): return (date.fromisoformat(till) - date.fromisoformat(fran)).days',
      'SELECT … h.storlek … WHERE b.id = ?',
      "{**b, 'natter': n, 'pris': n * PRIS_PER_NATT[b['storlek']]}",
    ],
    tests: [
      {
        description: 'Bamse tre nätter',
        code: "(__post('/bokningar', {'hund_id': 1, 'fran': '2026-06-10', 'till': '2026-06-13'}), __get('/bokningar/1').json)[-1]",
        expected: {
          id: 1,
          hund: 'Bamse',
          storlek: 'stor',
          fran: '2026-06-10',
          till: '2026-06-13',
          natter: 3,
          pris: 1050,
        },
        inputs: [],
      },
      {
        description: 'Saknas',
        code: "__get('/bokningar/9').status",
        expected: 404,
        inputs: [],
      },
      {
        description: 'Över månadsskiftet',
        code: "natter('2026-06-29', '2026-07-02')",
        expected: 3,
      },
    ],
    request: { path: '/bokningar/1' },
  },
  {
    id: 'slutprojekt-08',
    track: 'slutprojekt',
    title: 'Avboka',
    xp: 10,
    description: 'En bokning ska kunna tas bort.',
    explain: 'Som i bana 10: `rowcount` säger om något togs bort.',
    example: "cur = db.execute('DELETE FROM … WHERE id = ?', (id,))",
    task: "Uppgift: `DELETE /bokningar/<int:id>` svarar 204, eller 404 med `'Ingen sådan bokning'`.",
    starterCode:
      "import sqlite3\nfrom datetime import date\n\nfrom flask import Flask, abort, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (\n    id INTEGER PRIMARY KEY,\n    namn TEXT NOT NULL,\n    storlek TEXT NOT NULL CHECK (storlek IN ('liten', 'mellan', 'stor'))\n);\nCREATE TABLE bokningar (\n    id INTEGER PRIMARY KEY,\n    hund_id INTEGER NOT NULL REFERENCES hundar(id),\n    fran TEXT NOT NULL,\n    till TEXT NOT NULL\n);\nINSERT INTO hundar (namn, storlek) VALUES ('Bamse', 'stor'), ('Saga', 'liten');\n''')\n\n\ndef fraga(sql, parametrar=()):\n    return [dict(rad) for rad in db.execute(sql, parametrar).fetchall()]\n\nPRIS_PER_NATT = {'liten': 250, 'mellan': 300, 'stor': 350}\n\n\ndef natter(fran, till):\n    return (date.fromisoformat(till) - date.fromisoformat(fran)).days\n\n\n@app.get('/hundar')\ndef hundar():\n    return fraga('SELECT * FROM hundar ORDER BY namn')\n\n\n@app.post('/hundar')\ndef ny_hund():\n    data = request.get_json()\n    if not data.get('namn') or data.get('storlek') not in ('liten', 'mellan', 'stor'):\n        abort(400, description='namn och storlek (liten, mellan, stor) krävs')\n    cur = db.execute('INSERT INTO hundar (namn, storlek) VALUES (?, ?)', (data['namn'], data['storlek']))\n    db.commit()\n    return {'id': cur.lastrowid, 'namn': data['namn'], 'storlek': data['storlek']}, 201\n\n\n@app.errorhandler(400)\n@app.errorhandler(404)\n@app.errorhandler(409)\ndef felsvar(fel):\n    return {'fel': fel.description}, fel.code\n\n\n@app.get('/bokningar')\ndef bokningar():\n    return fraga('''\n        SELECT b.id, h.namn AS hund, b.fran, b.till\n        FROM bokningar b JOIN hundar h ON h.id = b.hund_id\n        ORDER BY b.fran\n    ''')\n\n\n@app.post('/bokningar')\ndef boka():\n    data = request.get_json()\n    fran, till = data.get('fran', ''), data.get('till', '')\n    if not fran or not till or till <= fran:\n        abort(400, description='till måste vara efter fran')\n    if not fraga('SELECT id FROM hundar WHERE id = ?', (data.get('hund_id'),)):\n        abort(404, description='Ingen sådan hund')\n    krock = fraga(\n        'SELECT id FROM bokningar WHERE hund_id = ? AND fran < ? AND ? < till',\n        (data['hund_id'], till, fran),\n    )\n    if krock:\n        abort(409, description='Hunden är redan bokad då')\n    cur = db.execute('INSERT INTO bokningar (hund_id, fran, till) VALUES (?, ?, ?)', (data['hund_id'], fran, till))\n    db.commit()\n    return {'id': cur.lastrowid, 'hund_id': data['hund_id'], 'fran': fran, 'till': till}, 201\n\n\n@app.get('/bokningar/<int:id>')\ndef bokning(id):\n    rader = fraga('''\n        SELECT b.id, h.namn AS hund, h.storlek, b.fran, b.till\n        FROM bokningar b JOIN hundar h ON h.id = b.hund_id WHERE b.id = ?\n    ''', (id,))\n    if not rader:\n        abort(404, description='Ingen sådan bokning')\n    b = rader[0]\n    n = natter(b['fran'], b['till'])\n    return {**b, 'natter': n, 'pris': n * PRIS_PER_NATT[b['storlek']]}\n",
    solution:
      "import sqlite3\nfrom datetime import date\n\nfrom flask import Flask, abort, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (\n    id INTEGER PRIMARY KEY,\n    namn TEXT NOT NULL,\n    storlek TEXT NOT NULL CHECK (storlek IN ('liten', 'mellan', 'stor'))\n);\nCREATE TABLE bokningar (\n    id INTEGER PRIMARY KEY,\n    hund_id INTEGER NOT NULL REFERENCES hundar(id),\n    fran TEXT NOT NULL,\n    till TEXT NOT NULL\n);\nINSERT INTO hundar (namn, storlek) VALUES ('Bamse', 'stor'), ('Saga', 'liten');\n''')\n\n\ndef fraga(sql, parametrar=()):\n    return [dict(rad) for rad in db.execute(sql, parametrar).fetchall()]\n\nPRIS_PER_NATT = {'liten': 250, 'mellan': 300, 'stor': 350}\n\n\ndef natter(fran, till):\n    return (date.fromisoformat(till) - date.fromisoformat(fran)).days\n\n\n@app.get('/hundar')\ndef hundar():\n    return fraga('SELECT * FROM hundar ORDER BY namn')\n\n\n@app.post('/hundar')\ndef ny_hund():\n    data = request.get_json()\n    if not data.get('namn') or data.get('storlek') not in ('liten', 'mellan', 'stor'):\n        abort(400, description='namn och storlek (liten, mellan, stor) krävs')\n    cur = db.execute('INSERT INTO hundar (namn, storlek) VALUES (?, ?)', (data['namn'], data['storlek']))\n    db.commit()\n    return {'id': cur.lastrowid, 'namn': data['namn'], 'storlek': data['storlek']}, 201\n\n\n@app.errorhandler(400)\n@app.errorhandler(404)\n@app.errorhandler(409)\ndef felsvar(fel):\n    return {'fel': fel.description}, fel.code\n\n\n@app.get('/bokningar')\ndef bokningar():\n    return fraga('''\n        SELECT b.id, h.namn AS hund, b.fran, b.till\n        FROM bokningar b JOIN hundar h ON h.id = b.hund_id\n        ORDER BY b.fran\n    ''')\n\n\n@app.post('/bokningar')\ndef boka():\n    data = request.get_json()\n    fran, till = data.get('fran', ''), data.get('till', '')\n    if not fran or not till or till <= fran:\n        abort(400, description='till måste vara efter fran')\n    if not fraga('SELECT id FROM hundar WHERE id = ?', (data.get('hund_id'),)):\n        abort(404, description='Ingen sådan hund')\n    krock = fraga(\n        'SELECT id FROM bokningar WHERE hund_id = ? AND fran < ? AND ? < till',\n        (data['hund_id'], till, fran),\n    )\n    if krock:\n        abort(409, description='Hunden är redan bokad då')\n    cur = db.execute('INSERT INTO bokningar (hund_id, fran, till) VALUES (?, ?, ?)', (data['hund_id'], fran, till))\n    db.commit()\n    return {'id': cur.lastrowid, 'hund_id': data['hund_id'], 'fran': fran, 'till': till}, 201\n\n\n@app.get('/bokningar/<int:id>')\ndef bokning(id):\n    rader = fraga('''\n        SELECT b.id, h.namn AS hund, h.storlek, b.fran, b.till\n        FROM bokningar b JOIN hundar h ON h.id = b.hund_id WHERE b.id = ?\n    ''', (id,))\n    if not rader:\n        abort(404, description='Ingen sådan bokning')\n    b = rader[0]\n    n = natter(b['fran'], b['till'])\n    return {**b, 'natter': n, 'pris': n * PRIS_PER_NATT[b['storlek']]}\n\n\n@app.delete('/bokningar/<int:id>')\ndef avboka(id):\n    cur = db.execute('DELETE FROM bokningar WHERE id = ?', (id,))\n    db.commit()\n    if cur.rowcount == 0:\n        abort(404, description='Ingen sådan bokning')\n    return '', 204\n",
    hints: [
      'DELETE FROM bokningar WHERE id = ?',
      'cur.rowcount == 0',
      "return '', 204",
    ],
    tests: [
      {
        description: 'Avboka',
        code: "(__post('/bokningar', {'hund_id': 1, 'fran': '2026-06-10', 'till': '2026-06-13'}), __delete('/bokningar/1').status)[-1]",
        expected: 204,
        inputs: [],
      },
      {
        description: 'Saknas',
        code: "__delete('/bokningar/9').json",
        expected: { fel: 'Ingen sådan bokning' },
        inputs: [],
      },
    ],
    request: { method: 'DELETE', path: '/bokningar/1' },
  },
  {
    id: 'slutprojekt-09',
    track: 'slutprojekt',
    title: 'Bara personalen',
    xp: 20,
    description:
      'Vem som helst ska inte kunna avboka. Bara personalen, som loggar in med en kod.',
    explain:
      'Det är bana 12 igen: en inloggning sparar något i sessionen, och avbokningen kollar det. Felhanteraren behöver 401 också.\n\n(En riktig app har konton med hashade lösenord, som i bana 12. Här räcker en kod.)',
    example: "if not session.get('personal'):\n    abort(401, description='…')",
    task: "Uppgift: `POST /personal/logga-in` med `{'kod': 'tassen2026'}` sätter `session['personal'] = True` (annars 401, `'Fel kod'`). `DELETE /bokningar/<id>` kräver inloggad personal (401, `'Bara personalen kan avboka'`).",
    starterCode:
      "import sqlite3\nfrom datetime import date\n\nfrom flask import Flask, abort, request, session\n\napp = Flask(__name__)\napp.secret_key = 'byt-mig-i-en-riktig-app'\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (\n    id INTEGER PRIMARY KEY,\n    namn TEXT NOT NULL,\n    storlek TEXT NOT NULL CHECK (storlek IN ('liten', 'mellan', 'stor'))\n);\nCREATE TABLE bokningar (\n    id INTEGER PRIMARY KEY,\n    hund_id INTEGER NOT NULL REFERENCES hundar(id),\n    fran TEXT NOT NULL,\n    till TEXT NOT NULL\n);\nINSERT INTO hundar (namn, storlek) VALUES ('Bamse', 'stor'), ('Saga', 'liten');\n''')\n\n\ndef fraga(sql, parametrar=()):\n    return [dict(rad) for rad in db.execute(sql, parametrar).fetchall()]\n\nPRIS_PER_NATT = {'liten': 250, 'mellan': 300, 'stor': 350}\n\n\ndef natter(fran, till):\n    return (date.fromisoformat(till) - date.fromisoformat(fran)).days\n\n\n@app.get('/hundar')\ndef hundar():\n    return fraga('SELECT * FROM hundar ORDER BY namn')\n\n\n@app.post('/hundar')\ndef ny_hund():\n    data = request.get_json()\n    if not data.get('namn') or data.get('storlek') not in ('liten', 'mellan', 'stor'):\n        abort(400, description='namn och storlek (liten, mellan, stor) krävs')\n    cur = db.execute('INSERT INTO hundar (namn, storlek) VALUES (?, ?)', (data['namn'], data['storlek']))\n    db.commit()\n    return {'id': cur.lastrowid, 'namn': data['namn'], 'storlek': data['storlek']}, 201\n\n\n@app.errorhandler(400)\n@app.errorhandler(404)\n@app.errorhandler(409)\ndef felsvar(fel):\n    return {'fel': fel.description}, fel.code\n\n\n@app.get('/bokningar')\ndef bokningar():\n    return fraga('''\n        SELECT b.id, h.namn AS hund, b.fran, b.till\n        FROM bokningar b JOIN hundar h ON h.id = b.hund_id\n        ORDER BY b.fran\n    ''')\n\n\n@app.post('/bokningar')\ndef boka():\n    data = request.get_json()\n    fran, till = data.get('fran', ''), data.get('till', '')\n    if not fran or not till or till <= fran:\n        abort(400, description='till måste vara efter fran')\n    if not fraga('SELECT id FROM hundar WHERE id = ?', (data.get('hund_id'),)):\n        abort(404, description='Ingen sådan hund')\n    krock = fraga(\n        'SELECT id FROM bokningar WHERE hund_id = ? AND fran < ? AND ? < till',\n        (data['hund_id'], till, fran),\n    )\n    if krock:\n        abort(409, description='Hunden är redan bokad då')\n    cur = db.execute('INSERT INTO bokningar (hund_id, fran, till) VALUES (?, ?, ?)', (data['hund_id'], fran, till))\n    db.commit()\n    return {'id': cur.lastrowid, 'hund_id': data['hund_id'], 'fran': fran, 'till': till}, 201\n\n\n@app.get('/bokningar/<int:id>')\ndef bokning(id):\n    rader = fraga('''\n        SELECT b.id, h.namn AS hund, h.storlek, b.fran, b.till\n        FROM bokningar b JOIN hundar h ON h.id = b.hund_id WHERE b.id = ?\n    ''', (id,))\n    if not rader:\n        abort(404, description='Ingen sådan bokning')\n    b = rader[0]\n    n = natter(b['fran'], b['till'])\n    return {**b, 'natter': n, 'pris': n * PRIS_PER_NATT[b['storlek']]}\n\n\n@app.delete('/bokningar/<int:id>')\ndef avboka(id):\n    cur = db.execute('DELETE FROM bokningar WHERE id = ?', (id,))\n    db.commit()\n    if cur.rowcount == 0:\n        abort(404, description='Ingen sådan bokning')\n    return '', 204\n",
    solution:
      "import sqlite3\nfrom datetime import date\n\nfrom flask import Flask, abort, request, session\n\napp = Flask(__name__)\napp.secret_key = 'byt-mig-i-en-riktig-app'\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (\n    id INTEGER PRIMARY KEY,\n    namn TEXT NOT NULL,\n    storlek TEXT NOT NULL CHECK (storlek IN ('liten', 'mellan', 'stor'))\n);\nCREATE TABLE bokningar (\n    id INTEGER PRIMARY KEY,\n    hund_id INTEGER NOT NULL REFERENCES hundar(id),\n    fran TEXT NOT NULL,\n    till TEXT NOT NULL\n);\nINSERT INTO hundar (namn, storlek) VALUES ('Bamse', 'stor'), ('Saga', 'liten');\n''')\n\n\ndef fraga(sql, parametrar=()):\n    return [dict(rad) for rad in db.execute(sql, parametrar).fetchall()]\n\nPRIS_PER_NATT = {'liten': 250, 'mellan': 300, 'stor': 350}\n\n\ndef natter(fran, till):\n    return (date.fromisoformat(till) - date.fromisoformat(fran)).days\n\n\n@app.get('/hundar')\ndef hundar():\n    return fraga('SELECT * FROM hundar ORDER BY namn')\n\n\n@app.post('/hundar')\ndef ny_hund():\n    data = request.get_json()\n    if not data.get('namn') or data.get('storlek') not in ('liten', 'mellan', 'stor'):\n        abort(400, description='namn och storlek (liten, mellan, stor) krävs')\n    cur = db.execute('INSERT INTO hundar (namn, storlek) VALUES (?, ?)', (data['namn'], data['storlek']))\n    db.commit()\n    return {'id': cur.lastrowid, 'namn': data['namn'], 'storlek': data['storlek']}, 201\n\n\n@app.errorhandler(400)\n@app.errorhandler(401)\n@app.errorhandler(404)\n@app.errorhandler(409)\ndef felsvar(fel):\n    return {'fel': fel.description}, fel.code\n\n\n@app.get('/bokningar')\ndef bokningar():\n    return fraga('''\n        SELECT b.id, h.namn AS hund, b.fran, b.till\n        FROM bokningar b JOIN hundar h ON h.id = b.hund_id\n        ORDER BY b.fran\n    ''')\n\n\n@app.post('/bokningar')\ndef boka():\n    data = request.get_json()\n    fran, till = data.get('fran', ''), data.get('till', '')\n    if not fran or not till or till <= fran:\n        abort(400, description='till måste vara efter fran')\n    if not fraga('SELECT id FROM hundar WHERE id = ?', (data.get('hund_id'),)):\n        abort(404, description='Ingen sådan hund')\n    krock = fraga(\n        'SELECT id FROM bokningar WHERE hund_id = ? AND fran < ? AND ? < till',\n        (data['hund_id'], till, fran),\n    )\n    if krock:\n        abort(409, description='Hunden är redan bokad då')\n    cur = db.execute('INSERT INTO bokningar (hund_id, fran, till) VALUES (?, ?, ?)', (data['hund_id'], fran, till))\n    db.commit()\n    return {'id': cur.lastrowid, 'hund_id': data['hund_id'], 'fran': fran, 'till': till}, 201\n\n\n@app.get('/bokningar/<int:id>')\ndef bokning(id):\n    rader = fraga('''\n        SELECT b.id, h.namn AS hund, h.storlek, b.fran, b.till\n        FROM bokningar b JOIN hundar h ON h.id = b.hund_id WHERE b.id = ?\n    ''', (id,))\n    if not rader:\n        abort(404, description='Ingen sådan bokning')\n    b = rader[0]\n    n = natter(b['fran'], b['till'])\n    return {**b, 'natter': n, 'pris': n * PRIS_PER_NATT[b['storlek']]}\n\n\n@app.delete('/bokningar/<int:id>')\ndef avboka(id):\n    if not session.get('personal'):\n        abort(401, description='Bara personalen kan avboka')\n    cur = db.execute('DELETE FROM bokningar WHERE id = ?', (id,))\n    db.commit()\n    if cur.rowcount == 0:\n        abort(404, description='Ingen sådan bokning')\n    return '', 204\n\n\n@app.post('/personal/logga-in')\ndef logga_in():\n    if request.get_json().get('kod') != 'tassen2026':\n        abort(401, description='Fel kod')\n    session['personal'] = True\n    return {'inloggad': True}\n",
    hints: [
      "session['personal'] = True",
      "if not session.get('personal'): abort(401, …)",
      '@app.errorhandler(401) i felhanteraren.',
    ],
    tests: [
      {
        description: 'Utan inloggning',
        code: "(__post('/bokningar', {'hund_id': 1, 'fran': '2026-06-10', 'till': '2026-06-13'}), __delete('/bokningar/1').status)[-1]",
        expected: 401,
        inputs: [],
      },
      {
        description: 'Fel kod',
        code: "__post('/personal/logga-in', {'kod': 'fel'}).json",
        expected: { fel: 'Fel kod' },
        inputs: [],
      },
      {
        description: 'Personalen',
        code: "(k := __klient(), k.post('/bokningar', {'hund_id': 1, 'fran': '2026-06-10', 'till': '2026-06-13'}), k.post('/personal/logga-in', {'kod': 'tassen2026'}), k.delete('/bokningar/1').status)[-1]",
        expected: 204,
        inputs: [],
      },
    ],
    request: {
      method: 'POST',
      path: '/personal/logga-in',
      body: '{"kod": "tassen2026"}',
    },
  },
];
