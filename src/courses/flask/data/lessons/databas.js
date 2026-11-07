// Bana 10: databas. sqlite3 i minnet, ?-parametrar och SQL-injektion.
// Tabellerna skapas i startkoden, så att varje körning börjar likadant.

export const DATABAS = [
  {
    id: 'databas-01',
    track: 'databas',
    title: 'Fråga databasen',
    xp: 10,
    description:
      'Listor i minnet försvinner när appen startas om. En databas sparar på riktigt. Python har SQLite inbyggt.',
    explain:
      "`sqlite3.connect(':memory:')` skapar en databas i minnet (på din dator skriver du ett filnamn i stället, t.ex. `'tassen.db'`). Tabellen är redan skapad i startkoden.\n\n`db.execute('SELECT namn FROM hundar')` ställer frågan, och `fetchall()` ger alla rader. Varje rad är en tupel: `('Bamse',)`.\n\nKan du inte SQL? Kika på SQL-kursen i Kodskolan.",
    example:
      "rader = db.execute('SELECT titel FROM bocker').fetchall()\nreturn [rad[0] for rad in rader]",
    task: 'Uppgift: `GET /hundar` ska svara med en lista med hundarnas namn från databasen.',
    starterCode:
      "import sqlite3\n\nfrom flask import Flask, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.executescript('''\nCREATE TABLE hundar (id INTEGER PRIMARY KEY, namn TEXT NOT NULL, ras TEXT);\nINSERT INTO hundar (namn, ras) VALUES ('Bamse', 'berner'), ('Saga', 'tax');\n''')\n",
    solution:
      "import sqlite3\n\nfrom flask import Flask, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.executescript('''\nCREATE TABLE hundar (id INTEGER PRIMARY KEY, namn TEXT NOT NULL, ras TEXT);\nINSERT INTO hundar (namn, ras) VALUES ('Bamse', 'berner'), ('Saga', 'tax');\n''')\n\n\n@app.get('/hundar')\ndef lista():\n    rader = db.execute('SELECT namn FROM hundar').fetchall()\n    return [rad[0] for rad in rader]\n",
    hints: [
      "db.execute('SELECT namn FROM hundar')",
      '.fetchall()',
      'return [rad[0] for rad in rader]',
    ],
    tests: [
      {
        description: 'Namnen',
        code: "__get('/hundar').json",
        expected: ['Bamse', 'Saga'],
      },
    ],
    request: { path: '/hundar' },
  },
  {
    id: 'databas-02',
    track: 'databas',
    title: 'Rader som dictionaries',
    xp: 15,
    description:
      'Med `db.row_factory = sqlite3.Row` kan en rad läsas med kolumnens namn – och göras om till en dictionary.',
    explain:
      "`dict(rad)` blir `{'id': 1, 'namn': 'Bamse', 'ras': 'berner'}`, precis det ett API vill svara med.\n\n`row_factory` står redan i startkoden.",
    example: "return [dict(rad) for rad in db.execute('SELECT * FROM bocker')]",
    task: 'Uppgift: `GET /hundar` ska svara med alla hundar som dictionaries.',
    starterCode:
      "import sqlite3\n\nfrom flask import Flask, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (id INTEGER PRIMARY KEY, namn TEXT NOT NULL, ras TEXT);\nINSERT INTO hundar (namn, ras) VALUES ('Bamse', 'berner'), ('Saga', 'tax');\n''')\n",
    solution:
      "import sqlite3\n\nfrom flask import Flask, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (id INTEGER PRIMARY KEY, namn TEXT NOT NULL, ras TEXT);\nINSERT INTO hundar (namn, ras) VALUES ('Bamse', 'berner'), ('Saga', 'tax');\n''')\n\n\n@app.get('/hundar')\ndef lista():\n    rader = db.execute('SELECT * FROM hundar').fetchall()\n    return [dict(rad) for rad in rader]\n",
    hints: [
      'SELECT * FROM hundar',
      'dict(rad)',
      'return [dict(rad) for rad in rader]',
    ],
    tests: [
      {
        description: 'Alla',
        code: "__get('/hundar').json",
        expected: [
          { id: 1, namn: 'Bamse', ras: 'berner' },
          { id: 2, namn: 'Saga', ras: 'tax' },
        ],
      },
    ],
    request: { path: '/hundar' },
  },
  {
    id: 'databas-03',
    track: 'databas',
    title: 'Ett värde i frågan: ?',
    xp: 15,
    description:
      'Värden från adressen skickas till SQL med `?`, aldrig inklistrade i texten.',
    explain:
      "`db.execute('SELECT * FROM hundar WHERE id = ?', (id,))` – frågetecknet fylls med värdet i tupeln. Kommat i `(id,)` behövs, annars är det ingen tupel.\n\n`fetchone()` ger en rad eller `None`.",
    example:
      "rad = db.execute('SELECT * FROM bocker WHERE id = ?', (id,)).fetchone()",
    task: "Uppgift: `GET /hundar/<int:id>` ska svara med hunden, eller `{'fel': 'Finns inte'}` med 404.",
    starterCode:
      "import sqlite3\n\nfrom flask import Flask, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (id INTEGER PRIMARY KEY, namn TEXT NOT NULL, ras TEXT);\nINSERT INTO hundar (namn, ras) VALUES ('Bamse', 'berner'), ('Saga', 'tax');\n''')\n",
    solution:
      "import sqlite3\n\nfrom flask import Flask, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (id INTEGER PRIMARY KEY, namn TEXT NOT NULL, ras TEXT);\nINSERT INTO hundar (namn, ras) VALUES ('Bamse', 'berner'), ('Saga', 'tax');\n''')\n\n\n@app.get('/hundar/<int:id>')\ndef en(id):\n    rad = db.execute('SELECT * FROM hundar WHERE id = ?', (id,)).fetchone()\n    if rad is None:\n        return {'fel': 'Finns inte'}, 404\n    return dict(rad)\n",
    hints: ['WHERE id = ?', '.fetchone()', 'if rad is None: … 404'],
    tests: [
      {
        description: 'Hund 2',
        code: "__get('/hundar/2').json['namn']",
        expected: 'Saga',
      },
      {
        description: 'Hund 9',
        code: "__get('/hundar/9').status",
        expected: 404,
      },
    ],
    request: { path: '/hundar/2' },
    sourceChecks: [{ description: 'Använder ?', pattern: /=\s*\?/ }],
  },
  {
    id: 'databas-04',
    track: 'databas',
    title: 'INSERT',
    xp: 15,
    description: 'En ny hund sparas med `INSERT`. Databasen ger id:t själv.',
    explain:
      "`cur = db.execute('INSERT INTO hundar (namn, ras) VALUES (?, ?)', (namn, ras))` sparar raden. `cur.lastrowid` är id:t den fick, och `db.commit()` gör ändringen permanent.",
    example:
      "cur = db.execute('INSERT INTO bocker (titel) VALUES (?)', (titel,))\ndb.commit()\nnytt_id = cur.lastrowid",
    task: "Uppgift: `POST /hundar` sparar `namn` och `ras` och svarar `{'id': …, 'namn': …, 'ras': …}` med 201.",
    starterCode:
      "import sqlite3\n\nfrom flask import Flask, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (id INTEGER PRIMARY KEY, namn TEXT NOT NULL, ras TEXT);\nINSERT INTO hundar (namn, ras) VALUES ('Bamse', 'berner'), ('Saga', 'tax');\n''')\n",
    solution:
      "import sqlite3\n\nfrom flask import Flask, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (id INTEGER PRIMARY KEY, namn TEXT NOT NULL, ras TEXT);\nINSERT INTO hundar (namn, ras) VALUES ('Bamse', 'berner'), ('Saga', 'tax');\n''')\n\n\n@app.post('/hundar')\ndef ny():\n    data = request.get_json()\n    cur = db.execute('INSERT INTO hundar (namn, ras) VALUES (?, ?)', (data['namn'], data['ras']))\n    db.commit()\n    return {'id': cur.lastrowid, 'namn': data['namn'], 'ras': data['ras']}, 201\n",
    hints: [
      'INSERT INTO hundar (namn, ras) VALUES (?, ?)',
      'db.commit()',
      'cur.lastrowid',
    ],
    tests: [
      {
        description: 'Ny hund',
        code: "__post('/hundar', {'namn': 'Rufus', 'ras': 'pudel'}).json",
        expected: { id: 3, namn: 'Rufus', ras: 'pudel' },
        inputs: [],
      },
      {
        description: 'Sparas i tabellen',
        code: "(__post('/hundar', {'namn': 'Rufus', 'ras': 'pudel'}), db.execute('SELECT COUNT(*) FROM hundar').fetchone()[0])[-1]",
        expected: 3,
        inputs: [],
      },
    ],
    request: {
      method: 'POST',
      path: '/hundar',
      body: '{"namn": "Rufus", "ras": "pudel"}',
    },
  },
  {
    id: 'databas-05',
    track: 'databas',
    title: 'SQL-injektion',
    xp: 20,
    description:
      'Sökningen klistrar in namnet direkt i SQL-texten. Då kan vem som helst ändra frågan.',
    explain:
      "Anropa `/sok/x' OR '1'='1` med 📮. Frågan blir `WHERE namn = 'x' OR '1'='1'` – sant för alla rader. Med `'; DROP TABLE hundar; --` hade tabellen kunnat försvinna.\n\nDet heter **SQL-injektion**, och är en av de vanligaste säkerhetsbristerna. Med `?` skickas värdet separat och kan aldrig bli SQL.",
    example: "db.execute('SELECT * FROM hundar WHERE namn = ?', (namn,))",
    task: 'Uppgift: Laga sökningen med `?`.',
    starterCode:
      "import sqlite3\n\nfrom flask import Flask, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (id INTEGER PRIMARY KEY, namn TEXT NOT NULL, ras TEXT);\nINSERT INTO hundar (namn, ras) VALUES ('Bamse', 'berner'), ('Saga', 'tax');\n''')\n\n\n@app.get('/sok/<namn>')\ndef sok(namn):\n    rader = db.execute(f\"SELECT * FROM hundar WHERE namn = '{namn}'\").fetchall()\n    return [dict(rad) for rad in rader]\n",
    solution:
      "import sqlite3\n\nfrom flask import Flask, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (id INTEGER PRIMARY KEY, namn TEXT NOT NULL, ras TEXT);\nINSERT INTO hundar (namn, ras) VALUES ('Bamse', 'berner'), ('Saga', 'tax');\n''')\n\n\n@app.get('/sok/<namn>')\ndef sok(namn):\n    rader = db.execute('SELECT * FROM hundar WHERE namn = ?', (namn,)).fetchall()\n    return [dict(rad) for rad in rader]\n",
    hints: [
      'Ingen f-sträng i SQL.',
      'WHERE namn = ?',
      "db.execute('SELECT * FROM hundar WHERE namn = ?', (namn,))",
    ],
    tests: [
      {
        description: 'Saga',
        code: "len(__get('/sok/Saga').json)",
        expected: 1,
      },
      {
        description: 'Injektionen hittar inget',
        code: "__get(\"/sok/x' OR '1'='1\").json",
        expected: [],
      },
    ],
    request: { path: "/sok/x' OR '1'='1" },
    sourceChecks: [
      {
        description: 'Ingen f-sträng i SQL',
        pattern: /execute\(\s*f["']/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'databas-06',
    track: 'databas',
    title: 'UPDATE',
    xp: 15,
    description:
      '`UPDATE` ändrar en rad. `rowcount` säger hur många rader som ändrades.',
    explain:
      'Ändrades 0 rader fanns inget med det id:t – då är det 404. Ingen extra SELECT behövs.',
    example:
      "cur = db.execute('UPDATE bocker SET titel = ? WHERE id = ?', (titel, id))\nif cur.rowcount == 0:\n    return {'fel': 'Finns inte'}, 404",
    task: 'Uppgift: `PUT /hundar/<int:id>` byter `namn` och `ras`, och svarar med den nya hunden. 404 om ingen rad ändrades.',
    starterCode:
      "import sqlite3\n\nfrom flask import Flask, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (id INTEGER PRIMARY KEY, namn TEXT NOT NULL, ras TEXT);\nINSERT INTO hundar (namn, ras) VALUES ('Bamse', 'berner'), ('Saga', 'tax');\n''')\n",
    solution:
      "import sqlite3\n\nfrom flask import Flask, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (id INTEGER PRIMARY KEY, namn TEXT NOT NULL, ras TEXT);\nINSERT INTO hundar (namn, ras) VALUES ('Bamse', 'berner'), ('Saga', 'tax');\n''')\n\n\n@app.put('/hundar/<int:id>')\ndef andra(id):\n    data = request.get_json()\n    cur = db.execute('UPDATE hundar SET namn = ?, ras = ? WHERE id = ?', (data['namn'], data['ras'], id))\n    db.commit()\n    if cur.rowcount == 0:\n        return {'fel': 'Finns inte'}, 404\n    return {'id': id, 'namn': data['namn'], 'ras': data['ras']}\n",
    hints: [
      'UPDATE hundar SET namn = ?, ras = ? WHERE id = ?',
      'cur.rowcount == 0',
      'db.commit()',
    ],
    tests: [
      {
        description: 'Ändra Saga',
        code: "(__put('/hundar/2', {'namn': 'Saga', 'ras': 'pudel'}), db.execute('SELECT ras FROM hundar WHERE id = 2').fetchone()[0])[-1]",
        expected: 'pudel',
        inputs: [],
      },
      {
        description: 'Hund 9',
        code: "__put('/hundar/9', {'namn': 'X', 'ras': 'Y'}).status",
        expected: 404,
        inputs: [],
      },
    ],
    request: {
      method: 'PUT',
      path: '/hundar/2',
      body: '{"namn": "Saga", "ras": "pudel"}',
    },
  },
  {
    id: 'databas-07',
    track: 'databas',
    title: 'DELETE',
    xp: 10,
    description: '`DELETE` tar bort raden. Samma knep med `rowcount` ger 404.',
    explain:
      '`DELETE FROM hundar WHERE id = ?` utan WHERE hade tömt hela tabellen – glöm aldrig WHERE.',
    example: "cur = db.execute('DELETE FROM bocker WHERE id = ?', (id,))",
    task: 'Uppgift: `DELETE /hundar/<int:id>` tar bort hunden och svarar 204, eller 404.',
    starterCode:
      "import sqlite3\n\nfrom flask import Flask, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (id INTEGER PRIMARY KEY, namn TEXT NOT NULL, ras TEXT);\nINSERT INTO hundar (namn, ras) VALUES ('Bamse', 'berner'), ('Saga', 'tax');\n''')\n",
    solution:
      "import sqlite3\n\nfrom flask import Flask, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (id INTEGER PRIMARY KEY, namn TEXT NOT NULL, ras TEXT);\nINSERT INTO hundar (namn, ras) VALUES ('Bamse', 'berner'), ('Saga', 'tax');\n''')\n\n\n@app.delete('/hundar/<int:id>')\ndef ta_bort(id):\n    cur = db.execute('DELETE FROM hundar WHERE id = ?', (id,))\n    db.commit()\n    if cur.rowcount == 0:\n        return {'fel': 'Finns inte'}, 404\n    return '', 204\n",
    hints: [
      'DELETE FROM hundar WHERE id = ?',
      'cur.rowcount == 0',
      "return '', 204",
    ],
    tests: [
      {
        description: 'Ta bort',
        code: "__delete('/hundar/1').status",
        expected: 204,
        inputs: [],
      },
      {
        description: 'Borta',
        code: "(__delete('/hundar/1'), db.execute('SELECT COUNT(*) FROM hundar').fetchone()[0])[-1]",
        expected: 1,
        inputs: [],
      },
      {
        description: 'Hund 9',
        code: "__delete('/hundar/9').status",
        expected: 404,
        inputs: [],
      },
    ],
    request: { method: 'DELETE', path: '/hundar/1' },
  },
  {
    id: 'databas-08',
    track: 'databas',
    title: 'JOIN',
    xp: 15,
    description:
      'Vistelserna har bara hundens id. Med `JOIN` får svaret också hundens namn.',
    explain:
      '`JOIN hundar h ON h.id = v.hund_id` kopplar ihop varje vistelse med sin hund. Det är samma SQL som i SQL-kursen.',
    example:
      'SELECT o.id, k.namn FROM ordrar o JOIN kunder k ON k.id = o.kund_id',
    task: "Uppgift: `GET /vistelser` ska svara med `{'id', 'hund', 'fran', 'till'}` för varje vistelse, där `hund` är hundens namn.",
    starterCode:
      "import sqlite3\n\nfrom flask import Flask, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (id INTEGER PRIMARY KEY, namn TEXT NOT NULL, ras TEXT);\nINSERT INTO hundar (namn, ras) VALUES ('Bamse', 'berner'), ('Saga', 'tax');\n''')\ndb.executescript('''\nCREATE TABLE vistelser (id INTEGER PRIMARY KEY, hund_id INTEGER REFERENCES hundar(id), fran TEXT, till TEXT);\nINSERT INTO vistelser (hund_id, fran, till) VALUES (1, '2026-06-10', '2026-06-13'), (2, '2026-06-11', '2026-06-12');\n''')\n",
    solution:
      "import sqlite3\n\nfrom flask import Flask, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (id INTEGER PRIMARY KEY, namn TEXT NOT NULL, ras TEXT);\nINSERT INTO hundar (namn, ras) VALUES ('Bamse', 'berner'), ('Saga', 'tax');\n''')\ndb.executescript('''\nCREATE TABLE vistelser (id INTEGER PRIMARY KEY, hund_id INTEGER REFERENCES hundar(id), fran TEXT, till TEXT);\nINSERT INTO vistelser (hund_id, fran, till) VALUES (1, '2026-06-10', '2026-06-13'), (2, '2026-06-11', '2026-06-12');\n''')\n\n\n@app.get('/vistelser')\ndef vistelser():\n    rader = db.execute('''\n        SELECT v.id, h.namn AS hund, v.fran, v.till\n        FROM vistelser v JOIN hundar h ON h.id = v.hund_id\n        ORDER BY v.id\n    ''').fetchall()\n    return [dict(rad) for rad in rader]\n",
    hints: [
      'FROM vistelser v JOIN hundar h ON h.id = v.hund_id',
      'h.namn AS hund',
      'return [dict(rad) for rad in rader]',
    ],
    tests: [
      {
        description: 'Första',
        code: "__get('/vistelser').json[0]",
        expected: {
          id: 1,
          hund: 'Bamse',
          fran: '2026-06-10',
          till: '2026-06-13',
        },
      },
    ],
    request: { path: '/vistelser' },
  },
  {
    id: 'databas-09',
    track: 'databas',
    title: 'En hjälpfunktion för frågor',
    xp: 15,
    description:
      'Samma tre rader i varje väg: execute, fetchall, dict. Lägg dem i en funktion.',
    explain:
      '`fraga(sql, parametrar)` ger en lista med dictionaries. Då blir vägfunktionerna en rad långa.',
    example:
      'def fraga(sql, parametrar=()):\n    return [dict(r) for r in db.execute(sql, parametrar).fetchall()]',
    task: 'Uppgift: Skriv `fraga(sql, parametrar=())` och använd den i `GET /ras/<ras>`, som svarar med hundarna av den rasen.',
    starterCode:
      "import sqlite3\n\nfrom flask import Flask, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (id INTEGER PRIMARY KEY, namn TEXT NOT NULL, ras TEXT);\nINSERT INTO hundar (namn, ras) VALUES ('Bamse', 'berner'), ('Saga', 'tax');\n''')\n",
    solution:
      "import sqlite3\n\nfrom flask import Flask, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (id INTEGER PRIMARY KEY, namn TEXT NOT NULL, ras TEXT);\nINSERT INTO hundar (namn, ras) VALUES ('Bamse', 'berner'), ('Saga', 'tax');\n''')\n\n\ndef fraga(sql, parametrar=()):\n    return [dict(rad) for rad in db.execute(sql, parametrar).fetchall()]\n\n\n@app.get('/ras/<ras>')\ndef per_ras(ras):\n    return fraga('SELECT * FROM hundar WHERE ras = ?', (ras,))\n",
    hints: [
      'def fraga(sql, parametrar=()):',
      'return [dict(rad) for rad in db.execute(sql, parametrar).fetchall()]',
      "return fraga('SELECT * FROM hundar WHERE ras = ?', (ras,))",
    ],
    tests: [
      {
        description: 'Taxar',
        code: "__get('/ras/tax').json",
        expected: [{ id: 2, namn: 'Saga', ras: 'tax' }],
      },
      {
        description: 'fraga',
        code: "len(fraga('SELECT * FROM hundar'))",
        expected: 2,
      },
    ],
    request: { path: '/ras/tax' },
  },
];
