// Bana 11: felsökning. Startkoden är trasig och eleven lagar den.

export const FELSOK = [
  {
    id: 'felsok-01',
    track: 'felsok',
    title: 'Snedstrecket',
    xp: 10,
    description:
      'Appen startar inte: `ValueError: urls must start with a leading slash`.',
    explain:
      'Varje adress i en väg måste börja med `/`. Felet syns när appen startar, inte när vägen anropas.',
    example: "@app.get('/hundar')",
    task: 'Uppgift: Laga vägen.',
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse'},\n    {'id': 2, 'namn': 'Saga'},\n]\n\n\n@app.get('hundar')\ndef lista():\n    return hundar\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse'},\n    {'id': 2, 'namn': 'Saga'},\n]\n\n\n@app.get('/hundar')\ndef lista():\n    return hundar\n",
    hints: [
      'Läs felet.',
      'Adressen saknar något först.',
      "@app.get('/hundar')",
    ],
    tests: [
      {
        description: 'Två hundar',
        code: "len(__get('/hundar').json)",
        expected: 2,
      },
    ],
    request: { path: '/hundar' },
  },
  {
    id: 'felsok-02',
    track: 'felsok',
    title: '405 fast vägen finns',
    xp: 10,
    description: 'Appen som skickar nya hundar får 405. Vägen finns ju?',
    explain:
      '405 betyder att adressen finns, men inte för den metoden. Kolla dekoratorn: `get` eller `post`?',
    example: "@app.post('/hundar')",
    task: 'Uppgift: Laga så att en ny hund kan skickas med POST.',
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse'},\n    {'id': 2, 'namn': 'Saga'},\n]\n\n\n@app.get('/hundar')\ndef ny():\n    data = request.get_json()\n    hund = {'id': len(hundar) + 1, 'namn': data['namn']}\n    hundar.append(hund)\n    return hund, 201\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse'},\n    {'id': 2, 'namn': 'Saga'},\n]\n\n\n@app.post('/hundar')\ndef ny():\n    data = request.get_json()\n    hund = {'id': len(hundar) + 1, 'namn': data['namn']}\n    hundar.append(hund)\n    return hund, 201\n",
    hints: [
      'Vilken metod har vägen?',
      'Funktionen tar emot data, alltså POST.',
      "@app.post('/hundar')",
    ],
    tests: [
      {
        description: 'POST',
        code: "__post('/hundar', {'namn': 'Rufus'}).status",
        expected: 201,
        inputs: [],
      },
    ],
    request: { method: 'POST', path: '/hundar', body: '{"namn": "Rufus"}' },
  },
  {
    id: 'felsok-03',
    track: 'felsok',
    title: '404 för en hund som finns',
    xp: 15,
    description: '`/hundar/1` svarar 404, fast Bamse har id 1.',
    explain:
      "Utan `int:` är `id` texten `'1'`, och `'1' == 1` är falskt i Python. Ingen hund hittas.\n\nLägg in `print(type(id))` i funktionen och kör, om du vill se det själv.",
    example: "@app.get('/hundar/<int:id>')",
    task: 'Uppgift: Laga vägen.',
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse'},\n    {'id': 2, 'namn': 'Saga'},\n]\n\n\n@app.get('/hundar/<id>')\ndef en(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return {'fel': 'Finns inte'}, 404\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse'},\n    {'id': 2, 'namn': 'Saga'},\n]\n\n\n@app.get('/hundar/<int:id>')\ndef en(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return {'fel': 'Finns inte'}, 404\n",
    hints: [
      'Vilken typ har id?',
      "'1' är inte 1.",
      "@app.get('/hundar/<int:id>')",
    ],
    tests: [
      {
        description: 'Bamse',
        code: "__get('/hundar/1').json['namn']",
        expected: 'Bamse',
      },
    ],
    request: { path: '/hundar/1' },
  },
  {
    id: 'felsok-04',
    track: 'felsok',
    title: '400 från ett JSON-anrop',
    xp: 15,
    description: 'Appen skickar JSON, men får 400 Bad Request.',
    explain:
      "`request.form` läser formulär. Appen skickar JSON, så `request.form['namn']` hittar inget – och Flask svarar 400.",
    example: 'data = request.get_json()',
    task: 'Uppgift: Laga så att JSON-anropet fungerar.',
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\n@app.post('/hej')\ndef hej():\n    return f\"Hej {request.form['namn']}!\"\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\n@app.post('/hej')\ndef hej():\n    return f\"Hej {request.get_json()['namn']}!\"\n",
    hints: [
      'Vad skickar appen: JSON eller formulär?',
      'request.form är för formulär.',
      "request.get_json()['namn']",
    ],
    tests: [
      {
        description: 'JSON',
        code: "__post('/hej', {'namn': 'Ada'}).text",
        expected: 'Hej Ada!',
      },
    ],
    request: { method: 'POST', path: '/hej', body: '{"namn": "Ada"}' },
  },
  {
    id: 'felsok-05',
    track: 'felsok',
    title: 'Tom sida',
    xp: 15,
    description: 'Sidan visar `<h1></h1>`. Inget fel, men inget namn.',
    explain:
      'Jinja visar en tom text för variabler som inte skickats med – det kraschar inte. Jämför namnet i mallen med namnet i `render_template_string`.',
    example: "render_template_string('{{ hund.namn }}', hund=hund)",
    task: 'Uppgift: Laga så att namnet syns.',
    starterCode:
      "from flask import Flask, render_template_string\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse'},\n    {'id': 2, 'namn': 'Saga'},\n]\n\n\n@app.get('/hund/<int:id>')\ndef hund(id):\n    return render_template_string('<h1>{{ hund.namn }}</h1>', h=hundar[id - 1])\n",
    solution:
      "from flask import Flask, render_template_string\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse'},\n    {'id': 2, 'namn': 'Saga'},\n]\n\n\n@app.get('/hund/<int:id>')\ndef hund(id):\n    return render_template_string('<h1>{{ hund.namn }}</h1>', hund=hundar[id - 1])\n",
    hints: [
      'Vad heter variabeln i mallen?',
      'Och vad heter den som skickas med?',
      'hund=hundar[id - 1]',
    ],
    tests: [
      {
        description: 'Bamse',
        code: "__get('/hund/1').text",
        expected: '<h1>Bamse</h1>',
      },
    ],
    request: { path: '/hund/1' },
  },
  {
    id: 'felsok-06',
    track: 'felsok',
    title: 'UnboundLocalError',
    xp: 15,
    description:
      "Räknaren kraschar: `UnboundLocalError: cannot access local variable 'antal'`.",
    explain:
      '`antal += 1` inne i funktionen gör `antal` till en lokal variabel. Den lokala finns inte än – därav felet. `global antal` säger att det är den utanför.',
    example: 'global antal',
    task: 'Uppgift: Laga räknaren.',
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nantal = 0\n\n\n@app.get('/')\ndef rakna():\n    antal += 1\n    return str(antal)\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nantal = 0\n\n\n@app.get('/')\ndef rakna():\n    global antal\n    antal += 1\n    return str(antal)\n",
    hints: [
      'Vilken variabel menas – den utanför eller en ny?',
      'global',
      'global antal överst i funktionen.',
    ],
    tests: [
      {
        description: 'Två anrop',
        code: "(__get('/'), __get('/').text)[-1]",
        expected: '2',
        inputs: [],
      },
    ],
  },
  {
    id: 'felsok-07',
    track: 'felsok',
    title: 'Fel sorts parametrar',
    xp: 15,
    description:
      'Databasfrågan kraschar: `ProgrammingError` eller `ValueError` om parametrarna.',
    explain:
      '`(id)` är bara `id` med parenteser runt – ingen tupel. En tupel med ett värde skrivs `(id,)`.',
    example: "db.execute('… WHERE id = ?', (id,))",
    task: 'Uppgift: Laga frågan.',
    starterCode:
      "import sqlite3\n\nfrom flask import Flask\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.executescript(\"CREATE TABLE hundar (id INTEGER PRIMARY KEY, namn TEXT); INSERT INTO hundar (namn) VALUES ('Bamse');\")\n\n\n@app.get('/hundar/<int:id>')\ndef en(id):\n    rad = db.execute('SELECT namn FROM hundar WHERE id = ?', (id)).fetchone()\n    return {'namn': rad[0]}\n",
    solution:
      "import sqlite3\n\nfrom flask import Flask\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.executescript(\"CREATE TABLE hundar (id INTEGER PRIMARY KEY, namn TEXT); INSERT INTO hundar (namn) VALUES ('Bamse');\")\n\n\n@app.get('/hundar/<int:id>')\ndef en(id):\n    rad = db.execute('SELECT namn FROM hundar WHERE id = ?', (id,)).fetchone()\n    return {'namn': rad[0]}\n",
    hints: [
      'Läs felet: vad är fel med parametrarna?',
      '(id) är ingen tupel.',
      '(id,)',
    ],
    tests: [
      {
        description: 'Bamse',
        code: "__get('/hundar/1').json",
        expected: { namn: 'Bamse' },
      },
    ],
    request: { path: '/hundar/1' },
  },
  {
    id: 'felsok-08',
    track: 'felsok',
    title: 'Statuskoden först',
    xp: 15,
    description: 'Appen kraschar med `TypeError` om ett ogiltigt svar.',
    explain:
      'Ordningen spelar roll: först innehållet, sedan statuskoden. `return 404, {...}` försöker skicka talet 404 som innehåll.',
    example: "return {'fel': 'Finns inte'}, 404",
    task: 'Uppgift: Laga svaret.',
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse'},\n    {'id': 2, 'namn': 'Saga'},\n]\n\n\n@app.get('/hundar/<int:id>')\ndef en(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return 404, {'fel': 'Finns inte'}\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse'},\n    {'id': 2, 'namn': 'Saga'},\n]\n\n\n@app.get('/hundar/<int:id>')\ndef en(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return {'fel': 'Finns inte'}, 404\n",
    hints: [
      'Vad står först i svaret?',
      'Innehållet först.',
      "return {'fel': 'Finns inte'}, 404",
    ],
    tests: [
      {
        description: 'Hund 9',
        code: "__get('/hundar/9').status",
        expected: 404,
      },
      {
        description: 'Felet',
        code: "__get('/hundar/9').json",
        expected: { fel: 'Finns inte' },
      },
    ],
    request: { path: '/hundar/9' },
  },
  {
    id: 'felsok-09',
    track: 'felsok',
    title: 'Allt sparas två gånger',
    xp: 20,
    description:
      'Varje POST lägger till hunden två gånger. Inget felmeddelande – bara fel data.',
    explain:
      'Den svåraste sortens fel: inget kraschar, men resultatet är fel. Läs funktionen rad för rad och fråga: vad gör den här raden?\n\nTesterna räknar hundarna efter ett anrop.',
    example: 'hundar.append(hund)\nreturn hund, 201',
    task: 'Uppgift: Laga så att varje hund sparas en gång.',
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse'},\n    {'id': 2, 'namn': 'Saga'},\n]\n\n\n@app.post('/hundar')\ndef ny():\n    data = request.get_json()\n    hund = {'id': len(hundar) + 1, 'namn': data['namn']}\n    hundar.append(hund)\n    print('Ny hund:', hund['namn'])\n    hundar.append(hund)\n    return hund, 201\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse'},\n    {'id': 2, 'namn': 'Saga'},\n]\n\n\n@app.post('/hundar')\ndef ny():\n    data = request.get_json()\n    hund = {'id': len(hundar) + 1, 'namn': data['namn']}\n    hundar.append(hund)\n    print('Ny hund:', hund['namn'])\n    return hund, 201\n",
    hints: [
      'Räkna hur många gånger append står.',
      'Ta bort den ena.',
      'En append räcker.',
    ],
    tests: [
      {
        description: 'Tre hundar efter en ny',
        code: "(__post('/hundar', {'namn': 'Rufus'}), len(hundar))[-1]",
        expected: 3,
        inputs: [],
      },
    ],
    request: { method: 'POST', path: '/hundar', body: '{"namn": "Rufus"}' },
  },
];
