// En boss per bana: en större uppgift som använder allt från banan, utan
// ledtrådar. Banan räknas inte som klar förrän bossen är besegrad.
// index.js lägger varje boss sist i sin bana.
const BOSS_INTRO = 'Bossen har inga ledtrådar – visa vad du kan! ';
const IMPORT = 'from flask import Flask\n\napp = Flask(__name__)\n';

export const BOSSES = {
  forsta: {
    id: 'forsta-boss',
    track: 'forsta',
    title: 'Boss: Kaféets sajt',
    isBoss: true,
    xp: 40,
    description: BOSS_INTRO + 'Kafé Bönan vill ha en egen sajt med tre sidor.',
    task: `Uppgift: Bygg sajten.
  1. \`/\` svarar \`'<h1>Kafé Bönan</h1>'\`.
  2. \`/meny\` svarar \`'<ul><li>Kaffe 35 kr</li><li>Bulle 32 kr</li></ul>'\`.
  3. \`/oppet\` svarar \`'Vardagar 8–17'\`.
  4. Sist: \`app.run(debug=True)\` i en \`if __name__ == '__main__':\`.`,
    starterCode: IMPORT,
    solution: `${IMPORT}\n@app.get('/')\ndef start():\n    return '<h1>Kafé Bönan</h1>'\n\n\n@app.get('/meny')\ndef meny():\n    return '<ul><li>Kaffe 35 kr</li><li>Bulle 32 kr</li></ul>'\n\n\n@app.get('/oppet')\ndef oppet():\n    return 'Vardagar 8–17'\n\n\nif __name__ == '__main__':\n    app.run(debug=True)\n`,
    hints: [],
    tests: [
      {
        description: 'Startsidan',
        code: "__get('/').text",
        expected: '<h1>Kafé Bönan</h1>',
      },
      {
        description: 'Menyn',
        code: "__get('/meny').text",
        expected: '<ul><li>Kaffe 35 kr</li><li>Bulle 32 kr</li></ul>',
      },
      {
        description: 'Öppettiderna',
        code: "__get('/oppet').text",
        expected: 'Vardagar 8–17',
      },
      {
        description: 'POST /meny ger 405',
        code: "__post('/meny').status",
        expected: 405,
      },
      { description: 'Tre vägar', code: 'len(__vagar())', expected: 3 },
    ],
    sourceChecks: [
      {
        description: 'Har app.run i if __name__',
        pattern: /if __name__ == ['"]__main__['"]:\s*\n\s+app\.run\(/,
      },
    ],
    request: { path: '/meny' },
  },
  vagar: {
    id: 'vagar-boss',
    track: 'vagar',
    title: 'Boss: Bibliotekets adresser',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Biblioteket vill ha en adress för varje bok och varje författare.',
    task: `Uppgift: \`bocker\` är given. Bygg:
  1. \`/bok/<int:nr>\` – titeln på boken med det numret (0, 1, 2), eller \`'Ingen sådan bok'\`.
  2. \`/forfattare/<namn>\` – titlarna av författaren med \`', '\` emellan, eller \`'Inga böcker'\`.
  3. \`/\` – en länk till bok 0, byggd med \`url_for\`: \`<a href="/bok/0">Första boken</a>\`.`,
    starterCode:
      "from flask import Flask, url_for\n\napp = Flask(__name__)\n\nbocker = [\n    {'titel': 'Mio min Mio', 'forfattare': 'Lindgren'},\n    {'titel': 'Ronja Rövardotter', 'forfattare': 'Lindgren'},\n    {'titel': 'Mumintrollet', 'forfattare': 'Jansson'},\n]\n",
    solution:
      "from flask import Flask, url_for\n\napp = Flask(__name__)\n\nbocker = [\n    {'titel': 'Mio min Mio', 'forfattare': 'Lindgren'},\n    {'titel': 'Ronja Rövardotter', 'forfattare': 'Lindgren'},\n    {'titel': 'Mumintrollet', 'forfattare': 'Jansson'},\n]\n\n\n@app.get('/bok/<int:nr>')\ndef bok(nr):\n    if nr >= len(bocker):\n        return 'Ingen sådan bok'\n    return bocker[nr]['titel']\n\n\n@app.get('/forfattare/<namn>')\ndef forfattare(namn):\n    titlar = [b['titel'] for b in bocker if b['forfattare'] == namn]\n    if not titlar:\n        return 'Inga böcker'\n    return ', '.join(titlar)\n\n\n@app.get('/')\ndef start():\n    return f'<a href=\"{url_for(\"bok\", nr=0)}\">Första boken</a>'\n",
    hints: [],
    tests: [
      {
        description: '/bok/1',
        code: "__get('/bok/1').text",
        expected: 'Ronja Rövardotter',
      },
      {
        description: '/bok/7',
        code: "__get('/bok/7').text",
        expected: 'Ingen sådan bok',
      },
      {
        description: '/bok/x ger 404',
        code: "__get('/bok/x').status",
        expected: 404,
      },
      {
        description: '/forfattare/Lindgren',
        code: "__get('/forfattare/Lindgren').text",
        expected: 'Mio min Mio, Ronja Rövardotter',
      },
      {
        description: '/forfattare/Rowling',
        code: "__get('/forfattare/Rowling').text",
        expected: 'Inga böcker',
      },
      {
        description: 'Länken',
        code: "__get('/').text",
        expected: '<a href="/bok/0">Första boken</a>',
      },
    ],
    sourceChecks: [{ description: 'Använder url_for', pattern: /url_for\(/ }],
    request: { path: '/forfattare/Lindgren' },
  },

  json: {
    id: 'json-boss',
    track: 'json',
    title: 'Boss: Väder-API:t',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO + 'Ett litet API med vädret i några svenska städer.',
    task: `Uppgift: \`vader\` är given. Bygg:
  1. \`/stader\` – en lista med städernas namn, i bokstavsordning.
  2. \`/vader/<stad>\` – \`{'stad': …, 'grader': …, 'himmel': …}\`, eller \`{'fel': 'Okänd stad'}\` med 404.
  3. \`/varmast\` – \`{'stad': …, 'grader': …}\` för den varmaste staden.`,
    starterCode:
      "from flask import Flask\n\napp = Flask(__name__)\n\nvader = {\n    'Umeå': {'grader': 12, 'himmel': 'moln'},\n    'Lund': {'grader': 19, 'himmel': 'sol'},\n    'Kiruna': {'grader': 6, 'himmel': 'snö'},\n}\n",
    solution:
      "from flask import Flask\n\napp = Flask(__name__)\n\nvader = {\n    'Umeå': {'grader': 12, 'himmel': 'moln'},\n    'Lund': {'grader': 19, 'himmel': 'sol'},\n    'Kiruna': {'grader': 6, 'himmel': 'snö'},\n}\n\n\n@app.get('/stader')\ndef stader():\n    return sorted(vader)\n\n\n@app.get('/vader/<stad>')\ndef vader_i(stad):\n    if stad not in vader:\n        return {'fel': 'Okänd stad'}, 404\n    return {'stad': stad, **vader[stad]}\n\n\n@app.get('/varmast')\ndef varmast():\n    stad = max(vader, key=lambda s: vader[s]['grader'])\n    return {'stad': stad, 'grader': vader[stad]['grader']}\n",
    hints: [],
    tests: [
      {
        description: '/stader',
        code: "__get('/stader').json",
        expected: ['Kiruna', 'Lund', 'Umeå'],
      },
      {
        description: '/vader/Lund',
        code: "__get('/vader/Lund').json",
        expected: { stad: 'Lund', grader: 19, himmel: 'sol' },
      },
      {
        description: '/vader/Paris ger 404',
        code: "__get('/vader/Paris').status",
        expected: 404,
      },
      {
        description: 'Felet',
        code: "__get('/vader/Paris').json",
        expected: { fel: 'Okänd stad' },
      },
      {
        description: '/varmast',
        code: "__get('/varmast').json",
        expected: { stad: 'Lund', grader: 19 },
      },
    ],
    request: { path: '/vader/Lund' },
  },

  fragor: {
    id: 'fragor-boss',
    track: 'fragor',
    title: 'Boss: Hundsöket',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Pensionatets app vill söka bland hundarna på flera sätt samtidigt.',
    task: "Uppgift: Skapa `/hundar` med frågorna:\n  1. `?ras=` – bara den rasen.\n  2. `?min=` – bara hundar som är minst så gamla (heltal, standard 0).\n  3. `?sortera=` – `'namn'` eller `'alder'` (standard `'id'`). Annat ger `{'fel': 'Kan inte sortera på det'}` med 400.\n  4. `?antal=` – bara så många (standard alla).\nSvaret är en lista med namn.",
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner', 'alder': 4},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax', 'alder': 2},\n    {'id': 3, 'namn': 'Rufus', 'ras': 'pudel', 'alder': 7},\n    {'id': 4, 'namn': 'Sixten', 'ras': 'tax', 'alder': 5},\n]\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner', 'alder': 4},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax', 'alder': 2},\n    {'id': 3, 'namn': 'Rufus', 'ras': 'pudel', 'alder': 7},\n    {'id': 4, 'namn': 'Sixten', 'ras': 'tax', 'alder': 5},\n]\n\n\n@app.get('/hundar')\ndef lista():\n    ras = request.args.get('ras')\n    minst = request.args.get('min', 0, type=int)\n    falt = request.args.get('sortera', 'id')\n    antal = request.args.get('antal', len(hundar), type=int)\n    if falt not in ('id', 'namn', 'alder'):\n        return {'fel': 'Kan inte sortera på det'}, 400\n    urval = [h for h in hundar if h['alder'] >= minst and (ras is None or h['ras'] == ras)]\n    urval = sorted(urval, key=lambda h: h[falt])\n    return [h['namn'] for h in urval[:antal]]\n",
    hints: [],
    tests: [
      {
        description: 'Alla',
        code: "__get('/hundar').json",
        expected: ['Bamse', 'Saga', 'Rufus', 'Sixten'],
      },
      {
        description: 'Taxar',
        code: "__get('/hundar?ras=tax').json",
        expected: ['Saga', 'Sixten'],
      },
      {
        description: 'Minst 5',
        code: "__get('/hundar?min=5').json",
        expected: ['Rufus', 'Sixten'],
      },
      {
        description: 'Sorterat och begränsat',
        code: "__get('/hundar?sortera=alder&antal=2').json",
        expected: ['Saga', 'Bamse'],
      },
      {
        description: 'Allt på en gång',
        code: "__get('/hundar?ras=tax&min=3&sortera=namn').json",
        expected: ['Sixten'],
      },
      {
        description: 'Fel sortering',
        code: "__get('/hundar?sortera=ras').status",
        expected: 400,
      },
    ],
    request: { path: '/hundar?ras=tax&sortera=namn' },
  },

  skicka: {
    id: 'skicka-boss',
    track: 'skicka',
    title: 'Boss: Anmälan',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Hundkursen tar emot anmälningar. Allt som skickas in ska kontrolleras.',
    task: "Uppgift:\n  1. `@app.post('/anmalan')`: kontrollera att `namn` är en text som inte är tom, att `alder` är ett heltal och minst 13, och att `epost` innehåller `@`. Det första felet ger `{'fel': …}` med 400: `'namn saknas'`, `'alder ska vara ett heltal'`, `'För ung'` eller `'Ogiltig e-post'`.\n  2. En godkänd anmälan sparas i `anmalningar` med ett id (det högsta + 1) och svaras med 201.\n  3. `@app.get('/anmalan')` svarar med alla anmälningar.",
    starterCode:
      'from flask import Flask, request\n\napp = Flask(__name__)\n\nanmalningar = []\n',
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nanmalningar = []\n\n\n@app.get('/anmalan')\ndef alla():\n    return anmalningar\n\n\n@app.post('/anmalan')\ndef anmal():\n    data = request.get_json(silent=True) or {}\n    namn = data.get('namn')\n    alder = data.get('alder')\n    epost = data.get('epost', '')\n    if not isinstance(namn, str) or not namn:\n        return {'fel': 'namn saknas'}, 400\n    if not isinstance(alder, int):\n        return {'fel': 'alder ska vara ett heltal'}, 400\n    if alder < 13:\n        return {'fel': 'För ung'}, 400\n    if '@' not in epost:\n        return {'fel': 'Ogiltig e-post'}, 400\n    nytt_id = max((a['id'] for a in anmalningar), default=0) + 1\n    anmalan = {'id': nytt_id, 'namn': namn, 'alder': alder, 'epost': epost}\n    anmalningar.append(anmalan)\n    return anmalan, 201\n",
    hints: [],
    tests: [
      {
        description: 'En godkänd',
        code: "__post('/anmalan', {'namn': 'Ada', 'alder': 15, 'epost': 'a@b.se'}).json",
        expected: { id: 1, namn: 'Ada', alder: 15, epost: 'a@b.se' },
        inputs: [],
      },
      {
        description: 'Utan namn',
        code: "__post('/anmalan', {'alder': 15, 'epost': 'a@b.se'}).json",
        expected: { fel: 'namn saknas' },
        inputs: [],
      },
      {
        description: 'Fel ålder',
        code: "__post('/anmalan', {'namn': 'Bo', 'alder': 'tolv', 'epost': 'a@b.se'}).json",
        expected: { fel: 'alder ska vara ett heltal' },
        inputs: [],
      },
      {
        description: 'För ung',
        code: "__post('/anmalan', {'namn': 'Bo', 'alder': 9, 'epost': 'a@b.se'}).status",
        expected: 400,
        inputs: [],
      },
      {
        description: 'Fel e-post',
        code: "__post('/anmalan', {'namn': 'Bo', 'alder': 20, 'epost': 'bo'}).json",
        expected: { fel: 'Ogiltig e-post' },
        inputs: [],
      },
      {
        description: 'Två sparas',
        code: "(__post('/anmalan', {'namn': 'A', 'alder': 20, 'epost': 'a@b'}), __post('/anmalan', {'namn': 'B', 'alder': 30, 'epost': 'b@b'}), [a['id'] for a in __get('/anmalan').json])[-1]",
        expected: [1, 2],
        inputs: [],
      },
    ],
    request: {
      method: 'POST',
      path: '/anmalan',
      body: '{"namn": "Ada", "alder": 15, "epost": "ada@exempel.se"}',
    },
  },

  api: {
    id: 'api-boss',
    track: 'api',
    title: 'Boss: Bokhyllans API',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO + 'Ett komplett API för bokhyllan, med alla fem vägarna.',
    task: "Uppgift: Bygg API:t för `bocker` (id, titel, sidor):\n  1. `GET /bocker` och `GET /bocker/<int:id>` (404 med `{'fel': 'Finns inte'}`).\n  2. `POST /bocker` – kräver `titel` (text) och `sidor` (heltal), annars `{'fel': 'titel och sidor krävs'}` med 400. Nytt id = högsta + 1. Svar 201.\n  3. `PUT /bocker/<int:id>` – samma krav, byter titel och sidor.\n  4. `DELETE /bocker/<int:id>` – 204.",
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nbocker = [{'id': 1, 'titel': 'Mio min Mio', 'sidor': 176}]\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nbocker = [{'id': 1, 'titel': 'Mio min Mio', 'sidor': 176}]\n\n\ndef hitta(id):\n    for bok in bocker:\n        if bok['id'] == id:\n            return bok\n    return None\n\n\ndef giltig(data):\n    return isinstance(data.get('titel'), str) and data['titel'] != '' and isinstance(data.get('sidor'), int)\n\n\n@app.get('/bocker')\ndef alla():\n    return bocker\n\n\n@app.get('/bocker/<int:id>')\ndef en(id):\n    bok = hitta(id)\n    if bok is None:\n        return {'fel': 'Finns inte'}, 404\n    return bok\n\n\n@app.post('/bocker')\ndef ny():\n    data = request.get_json()\n    if not giltig(data):\n        return {'fel': 'titel och sidor krävs'}, 400\n    nytt_id = max((b['id'] for b in bocker), default=0) + 1\n    bok = {'id': nytt_id, 'titel': data['titel'], 'sidor': data['sidor']}\n    bocker.append(bok)\n    return bok, 201\n\n\n@app.put('/bocker/<int:id>')\ndef ersatt(id):\n    bok = hitta(id)\n    if bok is None:\n        return {'fel': 'Finns inte'}, 404\n    data = request.get_json()\n    if not giltig(data):\n        return {'fel': 'titel och sidor krävs'}, 400\n    bok['titel'] = data['titel']\n    bok['sidor'] = data['sidor']\n    return bok\n\n\n@app.delete('/bocker/<int:id>')\ndef ta_bort(id):\n    bok = hitta(id)\n    if bok is None:\n        return {'fel': 'Finns inte'}, 404\n    bocker.remove(bok)\n    return '', 204\n",
    hints: [],
    tests: [
      { description: 'Alla', code: "len(__get('/bocker').json)", expected: 1 },
      {
        description: 'En som saknas',
        code: "__get('/bocker/5').json",
        expected: { fel: 'Finns inte' },
      },
      {
        description: 'Ny bok',
        code: "__post('/bocker', {'titel': 'Ronja', 'sidor': 240}).json",
        expected: { id: 2, titel: 'Ronja', sidor: 240 },
        inputs: [],
      },
      {
        description: 'Sidor som text',
        code: "__post('/bocker', {'titel': 'Ronja', 'sidor': 'många'}).status",
        expected: 400,
        inputs: [],
      },
      {
        description: 'Ändra',
        code: "__put('/bocker/1', {'titel': 'Mio', 'sidor': 180}).json['sidor']",
        expected: 180,
        inputs: [],
      },
      {
        description: 'Ändra fel',
        code: "__put('/bocker/1', {'titel': ''}).status",
        expected: 400,
        inputs: [],
      },
      {
        description: 'Ta bort',
        code: "(__delete('/bocker/1'), __get('/bocker/1').status)[-1]",
        expected: 404,
        inputs: [],
      },
      {
        description: 'Två adresser',
        code: '__vagar()',
        expected: [
          ['GET POST', '/bocker'],
          ['GET PUT DELETE', '/bocker/<int:id>'],
        ],
      },
    ],
    request: {
      method: 'POST',
      path: '/bocker',
      body: '{"titel": "Ronja Rövardotter", "sidor": 240}',
    },
  },

  fel: {
    id: 'fel-boss',
    track: 'fel',
    title: 'Boss: Det snälla API:t',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO + 'Ett API som svarar tydligt i JSON vad som än går fel.',
    task: "Uppgift: För `hundar`:\n  1. Felhanterare för 400, 404, 405 och 409 som alla svarar `{'fel': fel.description}` med rätt statuskod.\n  2. `GET /hundar/<int:id>` – `abort(404, description='Ingen hund med det id:t')`.\n  3. `POST /hundar` – utan namn: `abort(400, description='namn saknas')`. Namnet finns redan: `abort(409, description='Namnet finns redan')`. Annars 201.",
    starterCode:
      "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n",
    solution:
      "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\n\n@app.get('/hundar/<int:id>')\ndef en(id):\n    hund = hitta(id)\n    if hund is None:\n        abort(404, description='Ingen hund med det id:t')\n    return hund\n\n\n@app.post('/hundar')\ndef ny():\n    data = request.get_json()\n    namn = data.get('namn')\n    if not namn:\n        abort(400, description='namn saknas')\n    if any(h['namn'] == namn for h in hundar):\n        abort(409, description='Namnet finns redan')\n    hund = {'id': max(h['id'] for h in hundar) + 1, 'namn': namn, 'ras': data.get('ras', '')}\n    hundar.append(hund)\n    return hund, 201\n\n\n@app.errorhandler(400)\n@app.errorhandler(404)\n@app.errorhandler(405)\n@app.errorhandler(409)\ndef felsvar(fel):\n    return {'fel': fel.description}, fel.code\n",
    hints: [],
    tests: [
      {
        description: 'Hund 9',
        code: "__get('/hundar/9').json",
        expected: { fel: 'Ingen hund med det id:t' },
      },
      {
        description: 'Adress som saknas',
        code: "__get('/katter').status",
        expected: 404,
      },
      {
        description: 'Fel metod',
        code: "__delete('/hundar/1').status",
        expected: 405,
      },
      {
        description: 'Fel metod i JSON',
        code: "'fel' in __delete('/hundar/1').json",
        expected: true,
      },
      {
        description: 'Utan namn',
        code: "__post('/hundar', {}).json",
        expected: { fel: 'namn saknas' },
        inputs: [],
      },
      {
        description: 'Krock',
        code: "__post('/hundar', {'namn': 'Saga'}).status",
        expected: 409,
        inputs: [],
      },
      {
        description: 'Ny',
        code: "__post('/hundar', {'namn': 'Rufus'}).status",
        expected: 201,
        inputs: [],
      },
    ],
    request: { method: 'POST', path: '/hundar', body: '{"namn": "Saga"}' },
  },
};
