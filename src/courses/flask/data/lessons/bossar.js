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

  mallar: {
    id: 'mallar-boss',
    track: 'mallar',
    title: 'Boss: Pensionatets sajt',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Tassen vill ha en sajt med en lista över gästerna och en sida per hund.',
    task: "Uppgift: `bas.html` finns (📁). Bygg, med mallar som bygger på den:\n  1. `/` – en `<ul>` med en `<li>` per hund: en länk till `hund` med namnet.\n  2. `/hund/<int:id>` – en `<h1>` med namnet och en `<p>` med rasen med stora bokstäver (`upper`). Saknas hunden: `'<p>Ingen sådan hund</p>'` (också i bas.html) med 404.",
    starterCode:
      "from flask import Flask, render_template_string\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n",
    solution:
      "from flask import Flask, render_template_string\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\nLISTA = \"\"\"{% extends 'bas.html' %}{% block innehall %}<ul>{% for h in hundar %}<li><a href=\"{{ url_for('hund', id=h.id) }}\">{{ h.namn }}</a></li>{% endfor %}</ul>{% endblock %}\"\"\"\nHUND = \"\"\"{% extends 'bas.html' %}{% block innehall %}{% if hund %}<h1>{{ hund.namn }}</h1><p>{{ hund.ras|upper }}</p>{% else %}<p>Ingen sådan hund</p>{% endif %}{% endblock %}\"\"\"\n\n\n@app.get('/')\ndef start():\n    return render_template_string(LISTA, hundar=hundar)\n\n\n@app.get('/hund/<int:id>')\ndef hund(id):\n    funnen = next((h for h in hundar if h['id'] == id), None)\n    if funnen is None:\n        return render_template_string(HUND, hund=None), 404\n    return render_template_string(HUND, hund=funnen)\n",
    hints: [],
    tests: [
      {
        description: 'Listan',
        code: '\'<ul><li><a href="/hund/1">Bamse</a></li><li><a href="/hund/2">Saga</a></li></ul>\' in __get(\'/\').text',
        expected: true,
      },
      {
        description: 'Sidhuvudet',
        code: "'🐾 Tassen' in __get('/hund/1').text",
        expected: true,
      },
      {
        description: 'Bamse',
        code: "'<h1>Bamse</h1><p>BERNER</p>' in __get('/hund/1').text",
        expected: true,
      },
      { description: 'Hund 9', code: "__get('/hund/9').status", expected: 404 },
      {
        description: 'Hund 9 text',
        code: "'<p>Ingen sådan hund</p>' in __get('/hund/9').text",
        expected: true,
      },
    ],
    request: { path: '/hund/1' },
    files: {
      'templates/bas.html':
        '<!doctype html>\n<title>Tassen</title>\n<header>🐾 Tassen</header>\n<main>{% block innehall %}{% endblock %}</main>\n',
    },
  },

  formular: {
    id: 'formular-boss',
    track: 'formular',
    title: 'Boss: Bokningsförfrågan',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Hundägare ska kunna skicka en förfrågan om plats på pensionatet.',
    task: "Uppgift:\n  1. `GET /boka` visar `FORMULAR`.\n  2. `POST /boka` läser `agare`, `hund` och `natter` (heltal). Saknas något, eller är `natter` inte 1–14, svarar den `FORMULAR + '<p>Fyll i allt rätt</p>'` med 400.\n  3. Annars sparas `{'agare', 'hund', 'natter'}` i `forfragningar` och besökaren skickas vidare till `tack` med hundens namn: `url_for('tack', hund=…)`.\n  4. `GET /tack/<hund>` svarar `f'Tack! Vi hör av oss om {hund}.'`",
    starterCode:
      'from flask import Flask, redirect, request, url_for\n\napp = Flask(__name__)\n\nFORMULAR = \'<form method="post"><input name="agare"><input name="hund"><input name="natter"><button>Skicka</button></form>\'\nforfragningar = []\n',
    solution:
      "from flask import Flask, redirect, request, url_for\n\napp = Flask(__name__)\n\nFORMULAR = '<form method=\"post\"><input name=\"agare\"><input name=\"hund\"><input name=\"natter\"><button>Skicka</button></form>'\nforfragningar = []\n\n\n@app.get('/boka')\ndef visa():\n    return FORMULAR\n\n\n@app.post('/boka')\ndef boka():\n    agare = request.form.get('agare', '').strip()\n    hund = request.form.get('hund', '').strip()\n    natter = request.form.get('natter', type=int)\n    if not agare or not hund or natter is None or not 1 <= natter <= 14:\n        return FORMULAR + '<p>Fyll i allt rätt</p>', 400\n    forfragningar.append({'agare': agare, 'hund': hund, 'natter': natter})\n    return redirect(url_for('tack', hund=hund))\n\n\n@app.get('/tack/<hund>')\ndef tack(hund):\n    return f'Tack! Vi hör av oss om {hund}.'\n",
    hints: [],
    tests: [
      {
        description: 'Formuläret',
        code: "'<form' in __get('/boka').text",
        expected: true,
      },
      {
        description: 'Skickas vidare',
        code: "__post('/boka', form={'agare': 'Ada', 'hund': 'Bamse', 'natter': '3'}).location",
        expected: '/tack/Bamse',
        inputs: [],
      },
      {
        description: 'Sparas',
        code: "(__post('/boka', form={'agare': 'Ada', 'hund': 'Bamse', 'natter': '3'}), forfragningar)[-1]",
        expected: [{ agare: 'Ada', hund: 'Bamse', natter: 3 }],
        inputs: [],
      },
      {
        description: 'Utan hund',
        code: "__post('/boka', form={'agare': 'Ada', 'natter': '3'}).status",
        expected: 400,
        inputs: [],
      },
      {
        description: '20 nätter',
        code: "__post('/boka', form={'agare': 'Ada', 'hund': 'Bamse', 'natter': '20'}).status",
        expected: 400,
        inputs: [],
      },
      {
        description: 'Tack',
        code: "__get('/tack/Saga').text",
        expected: 'Tack! Vi hör av oss om Saga.',
      },
    ],
    request: {
      method: 'POST',
      path: '/boka',
      kind: 'form',
      body: 'agare=Ada&hund=Bamse&natter=3',
    },
  },

  databas: {
    id: 'databas-boss',
    track: 'databas',
    title: 'Boss: Bokhyllan i databasen',
    isBoss: true,
    xp: 40,
    description: BOSS_INTRO + 'Bokhyllans API, men nu i en riktig databas.',
    task: "Uppgift: Tabellen `bocker` (id, titel, sidor) finns. Bygg, med `?` överallt:\n  1. `GET /bocker` – alla, sorterade på titel.\n  2. `POST /bocker` – kräver `titel` (text) och `sidor` (heltal), annars 400 med `{'fel': 'titel och sidor krävs'}`. Svarar med boken och 201.\n  3. `GET /bocker/<int:id>` och `DELETE /bocker/<int:id>` – 404 med `{'fel': 'Finns inte'}` när den saknas.",
    starterCode:
      "import sqlite3\n\nfrom flask import Flask, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.execute('CREATE TABLE bocker (id INTEGER PRIMARY KEY, titel TEXT NOT NULL, sidor INTEGER)')\n",
    solution:
      "import sqlite3\n\nfrom flask import Flask, request\n\napp = Flask(__name__)\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.execute('CREATE TABLE bocker (id INTEGER PRIMARY KEY, titel TEXT NOT NULL, sidor INTEGER)')\n\n\n@app.get('/bocker')\ndef alla():\n    return [dict(r) for r in db.execute('SELECT * FROM bocker ORDER BY titel').fetchall()]\n\n\n@app.post('/bocker')\ndef ny():\n    data = request.get_json()\n    titel = data.get('titel')\n    sidor = data.get('sidor')\n    if not isinstance(titel, str) or not titel or not isinstance(sidor, int):\n        return {'fel': 'titel och sidor krävs'}, 400\n    cur = db.execute('INSERT INTO bocker (titel, sidor) VALUES (?, ?)', (titel, sidor))\n    db.commit()\n    return {'id': cur.lastrowid, 'titel': titel, 'sidor': sidor}, 201\n\n\n@app.get('/bocker/<int:id>')\ndef en(id):\n    rad = db.execute('SELECT * FROM bocker WHERE id = ?', (id,)).fetchone()\n    if rad is None:\n        return {'fel': 'Finns inte'}, 404\n    return dict(rad)\n\n\n@app.delete('/bocker/<int:id>')\ndef ta_bort(id):\n    cur = db.execute('DELETE FROM bocker WHERE id = ?', (id,))\n    db.commit()\n    if cur.rowcount == 0:\n        return {'fel': 'Finns inte'}, 404\n    return '', 204\n",
    hints: [],
    tests: [
      {
        description: 'Ny bok',
        code: "__post('/bocker', {'titel': 'Ronja', 'sidor': 240}).json",
        expected: { id: 1, titel: 'Ronja', sidor: 240 },
        inputs: [],
      },
      {
        description: 'Sorterat',
        code: "(__post('/bocker', {'titel': 'Ronja', 'sidor': 1}), __post('/bocker', {'titel': 'Mio', 'sidor': 1}), [b['titel'] for b in __get('/bocker').json])[-1]",
        expected: ['Mio', 'Ronja'],
        inputs: [],
      },
      {
        description: 'Fel sidor',
        code: "__post('/bocker', {'titel': 'X', 'sidor': 'många'}).status",
        expected: 400,
        inputs: [],
      },
      {
        description: 'En',
        code: "(__post('/bocker', {'titel': 'Mio', 'sidor': 176}), __get('/bocker/1').json['titel'])[-1]",
        expected: 'Mio',
        inputs: [],
      },
      {
        description: 'Saknas',
        code: "__get('/bocker/9').json",
        expected: { fel: 'Finns inte' },
        inputs: [],
      },
      {
        description: 'Ta bort',
        code: "(__post('/bocker', {'titel': 'Mio', 'sidor': 176}), __delete('/bocker/1').status, __get('/bocker/1').status)[1:]",
        expected: [204, 404],
        inputs: [],
      },
    ],
    request: {
      method: 'POST',
      path: '/bocker',
      body: '{"titel": "Ronja Rövardotter", "sidor": 240}',
    },
    sourceChecks: [
      {
        description: 'Ingen f-sträng i SQL',
        pattern: /execute\(\s*f["']/,
        forbidden: true,
      },
    ],
  },

  felsok: {
    id: 'felsok-boss',
    track: 'felsok',
    title: 'Boss: Den trasiga appen',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO + 'Pensionatets app har fyra fel. Hitta och laga alla.',
    task: "Uppgift: Laga appen så att:\n  - `GET /hundar` ger alla hundar,\n  - `GET /hundar/<id>` ger en hund eller 404 med `{'fel': 'Finns inte'}`,\n  - `POST /hundar` sparar en ny hund (201) och kräver `namn` (400 annars).",
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse'},\n    {'id': 2, 'namn': 'Saga'},\n]\n\n\n@app.get('hundar')\ndef lista():\n    return hundar\n\n\n@app.get('/hundar/<id>')\ndef en(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return 404, {'fel': 'Finns inte'}\n\n\n@app.post('/hundar')\ndef ny():\n    data = request.form\n    if not data.get('namn'):\n        return {'fel': 'namn saknas'}, 400\n    hund = {'id': len(hundar) + 1, 'namn': data['namn']}\n    hundar.append(hund)\n    return hund, 201\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse'},\n    {'id': 2, 'namn': 'Saga'},\n]\n\n\n@app.get('/hundar')\ndef lista():\n    return hundar\n\n\n@app.get('/hundar/<int:id>')\ndef en(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return {'fel': 'Finns inte'}, 404\n\n\n@app.post('/hundar')\ndef ny():\n    data = request.get_json()\n    if not data.get('namn'):\n        return {'fel': 'namn saknas'}, 400\n    hund = {'id': len(hundar) + 1, 'namn': data['namn']}\n    hundar.append(hund)\n    return hund, 201\n",
    hints: [],
    tests: [
      { description: 'Alla', code: "len(__get('/hundar').json)", expected: 2 },
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
      {
        description: 'Ny',
        code: "__post('/hundar', {'namn': 'Rufus'}).json",
        expected: { id: 3, namn: 'Rufus' },
        inputs: [],
      },
      {
        description: 'Utan namn',
        code: "__post('/hundar', {}).status",
        expected: 400,
        inputs: [],
      },
    ],
    request: { path: '/hundar' },
  },

  inloggning: {
    id: 'inloggning-boss',
    track: 'inloggning',
    title: 'Boss: Medlemssidan',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Ett komplett konto-API: registrera, logga in, se sina sidor och logga ut.',
    task: "Uppgift:\n  1. `POST /registrera` (JSON: namn, losenord). Lösenordet ska vara minst 8 tecken (400 annars), och sparas som hash. Upptaget namn ger 409. Svar 201.\n  2. `POST /logga-in` (JSON) – 401 med `{'fel': 'Fel namn eller lösenord'}` om något är fel.\n  3. `GET /mina-sidor` – `{'namn': …}` för inloggade, annars 401.\n  4. `POST /logga-ut` – tömmer sessionen.",
    starterCode:
      "from flask import Flask, request, session\nfrom werkzeug.security import check_password_hash, generate_password_hash\n\napp = Flask(__name__)\napp.secret_key = 'byt-mig-i-en-riktig-app'\n\nanvandare = {}\n",
    solution:
      "from flask import Flask, request, session\nfrom werkzeug.security import check_password_hash, generate_password_hash\n\napp = Flask(__name__)\napp.secret_key = 'byt-mig-i-en-riktig-app'\n\nanvandare = {}\n\n\n@app.post('/registrera')\ndef registrera():\n    data = request.get_json()\n    namn = data.get('namn')\n    losenord = data.get('losenord', '')\n    if not namn or len(losenord) < 8:\n        return {'fel': 'Namn och ett lösenord på minst 8 tecken krävs'}, 400\n    if namn in anvandare:\n        return {'fel': 'Namnet är upptaget'}, 409\n    anvandare[namn] = generate_password_hash(losenord)\n    return {'namn': namn}, 201\n\n\n@app.post('/logga-in')\ndef logga_in():\n    data = request.get_json()\n    sparad = anvandare.get(data.get('namn'))\n    if sparad is None or not check_password_hash(sparad, data.get('losenord', '')):\n        return {'fel': 'Fel namn eller lösenord'}, 401\n    session['namn'] = data['namn']\n    return {'inloggad': data['namn']}\n\n\n@app.get('/mina-sidor')\ndef mina_sidor():\n    if 'namn' not in session:\n        return {'fel': 'Logga in först'}, 401\n    return {'namn': session['namn']}\n\n\n@app.post('/logga-ut')\ndef logga_ut():\n    session.clear()\n    return {'utloggad': True}\n",
    hints: [],
    tests: [
      {
        description: 'Kort lösenord',
        code: "__post('/registrera', {'namn': 'ada', 'losenord': 'kort'}).status",
        expected: 400,
        inputs: [],
      },
      {
        description: 'Registrera',
        code: "__post('/registrera', {'namn': 'ada', 'losenord': 'hemligt123'}).status",
        expected: 201,
        inputs: [],
      },
      {
        description: 'Hashat',
        code: "(__post('/registrera', {'namn': 'ada', 'losenord': 'hemligt123'}), 'hemligt123' not in anvandare['ada'])[-1]",
        expected: true,
        inputs: [],
      },
      {
        description: 'Upptaget',
        code: "(__post('/registrera', {'namn': 'ada', 'losenord': 'hemligt123'}), __post('/registrera', {'namn': 'ada', 'losenord': 'annat12345'}).status)[-1]",
        expected: 409,
        inputs: [],
      },
      {
        description: 'Fel lösenord',
        code: "(__post('/registrera', {'namn': 'ada', 'losenord': 'hemligt123'}), __post('/logga-in', {'namn': 'ada', 'losenord': 'fel'}).status)[-1]",
        expected: 401,
        inputs: [],
      },
      {
        description: 'Hela vägen',
        code: "(k := __klient(), k.post('/registrera', {'namn': 'ada', 'losenord': 'hemligt123'}), k.post('/logga-in', {'namn': 'ada', 'losenord': 'hemligt123'}), k.get('/mina-sidor').json, k.post('/logga-ut').json, k.get('/mina-sidor').status)[3:]",
        expected: [{ namn: 'ada' }, { utloggad: true }, 401],
        inputs: [],
      },
    ],
    request: {
      method: 'POST',
      path: '/registrera',
      body: '{"namn": "ada", "losenord": "hemligt123"}',
    },
    sourceChecks: [
      { description: 'Hashar lösenordet', pattern: /generate_password_hash\(/ },
    ],
  },

  slutprojekt: {
    id: 'slutprojekt-boss',
    track: 'slutprojekt',
    title: 'Boss: Tassens startsida',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Sista biten: en startsida för personalen och statistik för ägaren. Allt du byggt i banan finns i startkoden.',
    task: "Uppgift:\n  1. `GET /` – en HTML-sida (mall) med `<h1>🐾 Tassen</h1>`, en `<ul>` med `<li>hund: fran – till</li>` per bokning, och `<p>2 bokningar</p>` med antalet.\n  2. `GET /statistik` – `{'bokningar': …, 'natter': …, 'intakt': …}` för alla bokningar.",
    starterCode:
      "import sqlite3\nfrom datetime import date\n\nfrom flask import Flask, abort, render_template_string, request, session\n\napp = Flask(__name__)\napp.secret_key = 'byt-mig-i-en-riktig-app'\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (\n    id INTEGER PRIMARY KEY,\n    namn TEXT NOT NULL,\n    storlek TEXT NOT NULL CHECK (storlek IN ('liten', 'mellan', 'stor'))\n);\nCREATE TABLE bokningar (\n    id INTEGER PRIMARY KEY,\n    hund_id INTEGER NOT NULL REFERENCES hundar(id),\n    fran TEXT NOT NULL,\n    till TEXT NOT NULL\n);\nINSERT INTO hundar (namn, storlek) VALUES ('Bamse', 'stor'), ('Saga', 'liten');\n''')\n\n\ndef fraga(sql, parametrar=()):\n    return [dict(rad) for rad in db.execute(sql, parametrar).fetchall()]\n\nPRIS_PER_NATT = {'liten': 250, 'mellan': 300, 'stor': 350}\n\n\ndef natter(fran, till):\n    return (date.fromisoformat(till) - date.fromisoformat(fran)).days\n\n\n@app.get('/hundar')\ndef hundar():\n    return fraga('SELECT * FROM hundar ORDER BY namn')\n\n\n@app.post('/hundar')\ndef ny_hund():\n    data = request.get_json()\n    if not data.get('namn') or data.get('storlek') not in ('liten', 'mellan', 'stor'):\n        abort(400, description='namn och storlek (liten, mellan, stor) krävs')\n    cur = db.execute('INSERT INTO hundar (namn, storlek) VALUES (?, ?)', (data['namn'], data['storlek']))\n    db.commit()\n    return {'id': cur.lastrowid, 'namn': data['namn'], 'storlek': data['storlek']}, 201\n\n\n@app.errorhandler(400)\n@app.errorhandler(401)\n@app.errorhandler(404)\n@app.errorhandler(409)\ndef felsvar(fel):\n    return {'fel': fel.description}, fel.code\n\n\n@app.get('/bokningar')\ndef bokningar():\n    return fraga('''\n        SELECT b.id, h.namn AS hund, b.fran, b.till\n        FROM bokningar b JOIN hundar h ON h.id = b.hund_id\n        ORDER BY b.fran\n    ''')\n\n\n@app.post('/bokningar')\ndef boka():\n    data = request.get_json()\n    fran, till = data.get('fran', ''), data.get('till', '')\n    if not fran or not till or till <= fran:\n        abort(400, description='till måste vara efter fran')\n    if not fraga('SELECT id FROM hundar WHERE id = ?', (data.get('hund_id'),)):\n        abort(404, description='Ingen sådan hund')\n    krock = fraga(\n        'SELECT id FROM bokningar WHERE hund_id = ? AND fran < ? AND ? < till',\n        (data['hund_id'], till, fran),\n    )\n    if krock:\n        abort(409, description='Hunden är redan bokad då')\n    cur = db.execute('INSERT INTO bokningar (hund_id, fran, till) VALUES (?, ?, ?)', (data['hund_id'], fran, till))\n    db.commit()\n    return {'id': cur.lastrowid, 'hund_id': data['hund_id'], 'fran': fran, 'till': till}, 201\n\n\n@app.get('/bokningar/<int:id>')\ndef bokning(id):\n    rader = fraga('''\n        SELECT b.id, h.namn AS hund, h.storlek, b.fran, b.till\n        FROM bokningar b JOIN hundar h ON h.id = b.hund_id WHERE b.id = ?\n    ''', (id,))\n    if not rader:\n        abort(404, description='Ingen sådan bokning')\n    b = rader[0]\n    n = natter(b['fran'], b['till'])\n    return {**b, 'natter': n, 'pris': n * PRIS_PER_NATT[b['storlek']]}\n\n\n@app.delete('/bokningar/<int:id>')\ndef avboka(id):\n    if not session.get('personal'):\n        abort(401, description='Bara personalen kan avboka')\n    cur = db.execute('DELETE FROM bokningar WHERE id = ?', (id,))\n    db.commit()\n    if cur.rowcount == 0:\n        abort(404, description='Ingen sådan bokning')\n    return '', 204\n\n\n@app.post('/personal/logga-in')\ndef logga_in():\n    if request.get_json().get('kod') != 'tassen2026':\n        abort(401, description='Fel kod')\n    session['personal'] = True\n    return {'inloggad': True}\n",
    solution:
      "import sqlite3\nfrom datetime import date\n\nfrom flask import Flask, abort, render_template_string, request, session\n\napp = Flask(__name__)\napp.secret_key = 'byt-mig-i-en-riktig-app'\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\nCREATE TABLE hundar (\n    id INTEGER PRIMARY KEY,\n    namn TEXT NOT NULL,\n    storlek TEXT NOT NULL CHECK (storlek IN ('liten', 'mellan', 'stor'))\n);\nCREATE TABLE bokningar (\n    id INTEGER PRIMARY KEY,\n    hund_id INTEGER NOT NULL REFERENCES hundar(id),\n    fran TEXT NOT NULL,\n    till TEXT NOT NULL\n);\nINSERT INTO hundar (namn, storlek) VALUES ('Bamse', 'stor'), ('Saga', 'liten');\n''')\n\n\ndef fraga(sql, parametrar=()):\n    return [dict(rad) for rad in db.execute(sql, parametrar).fetchall()]\n\nPRIS_PER_NATT = {'liten': 250, 'mellan': 300, 'stor': 350}\n\n\ndef natter(fran, till):\n    return (date.fromisoformat(till) - date.fromisoformat(fran)).days\n\n\n@app.get('/hundar')\ndef hundar():\n    return fraga('SELECT * FROM hundar ORDER BY namn')\n\n\n@app.post('/hundar')\ndef ny_hund():\n    data = request.get_json()\n    if not data.get('namn') or data.get('storlek') not in ('liten', 'mellan', 'stor'):\n        abort(400, description='namn och storlek (liten, mellan, stor) krävs')\n    cur = db.execute('INSERT INTO hundar (namn, storlek) VALUES (?, ?)', (data['namn'], data['storlek']))\n    db.commit()\n    return {'id': cur.lastrowid, 'namn': data['namn'], 'storlek': data['storlek']}, 201\n\n\n@app.errorhandler(400)\n@app.errorhandler(401)\n@app.errorhandler(404)\n@app.errorhandler(409)\ndef felsvar(fel):\n    return {'fel': fel.description}, fel.code\n\n\n@app.get('/bokningar')\ndef bokningar():\n    return fraga('''\n        SELECT b.id, h.namn AS hund, b.fran, b.till\n        FROM bokningar b JOIN hundar h ON h.id = b.hund_id\n        ORDER BY b.fran\n    ''')\n\n\n@app.post('/bokningar')\ndef boka():\n    data = request.get_json()\n    fran, till = data.get('fran', ''), data.get('till', '')\n    if not fran or not till or till <= fran:\n        abort(400, description='till måste vara efter fran')\n    if not fraga('SELECT id FROM hundar WHERE id = ?', (data.get('hund_id'),)):\n        abort(404, description='Ingen sådan hund')\n    krock = fraga(\n        'SELECT id FROM bokningar WHERE hund_id = ? AND fran < ? AND ? < till',\n        (data['hund_id'], till, fran),\n    )\n    if krock:\n        abort(409, description='Hunden är redan bokad då')\n    cur = db.execute('INSERT INTO bokningar (hund_id, fran, till) VALUES (?, ?, ?)', (data['hund_id'], fran, till))\n    db.commit()\n    return {'id': cur.lastrowid, 'hund_id': data['hund_id'], 'fran': fran, 'till': till}, 201\n\n\n@app.get('/bokningar/<int:id>')\ndef bokning(id):\n    rader = fraga('''\n        SELECT b.id, h.namn AS hund, h.storlek, b.fran, b.till\n        FROM bokningar b JOIN hundar h ON h.id = b.hund_id WHERE b.id = ?\n    ''', (id,))\n    if not rader:\n        abort(404, description='Ingen sådan bokning')\n    b = rader[0]\n    n = natter(b['fran'], b['till'])\n    return {**b, 'natter': n, 'pris': n * PRIS_PER_NATT[b['storlek']]}\n\n\n@app.delete('/bokningar/<int:id>')\ndef avboka(id):\n    if not session.get('personal'):\n        abort(401, description='Bara personalen kan avboka')\n    cur = db.execute('DELETE FROM bokningar WHERE id = ?', (id,))\n    db.commit()\n    if cur.rowcount == 0:\n        abort(404, description='Ingen sådan bokning')\n    return '', 204\n\n\n@app.post('/personal/logga-in')\ndef logga_in():\n    if request.get_json().get('kod') != 'tassen2026':\n        abort(401, description='Fel kod')\n    session['personal'] = True\n    return {'inloggad': True}\n\n\nSIDA = \"\"\"<h1>🐾 Tassen</h1>\n<ul>{% for b in bokningar %}<li>{{ b.hund }}: {{ b.fran }} – {{ b.till }}</li>{% endfor %}</ul>\n<p>{{ bokningar|length }} bokningar</p>\"\"\"\n\n\n@app.get('/')\ndef start():\n    return render_template_string(SIDA, bokningar=bokningar())\n\n\n@app.get('/statistik')\ndef statistik():\n    rader = fraga('SELECT b.fran, b.till, h.storlek FROM bokningar b JOIN hundar h ON h.id = b.hund_id')\n    natter_totalt = sum(natter(r['fran'], r['till']) for r in rader)\n    intakt = sum(natter(r['fran'], r['till']) * PRIS_PER_NATT[r['storlek']] for r in rader)\n    return {'bokningar': len(rader), 'natter': natter_totalt, 'intakt': intakt}\n",
    hints: [],
    tests: [
      {
        description: 'Startsidan',
        code: "(__post('/bokningar', {'hund_id': 1, 'fran': '2026-06-10', 'till': '2026-06-13'}), __post('/bokningar', {'hund_id': 2, 'fran': '2026-06-11', 'till': '2026-06-12'}), __get('/').text)[-1]",
        expected:
          '<h1>🐾 Tassen</h1>\n<ul><li>Bamse: 2026-06-10 – 2026-06-13</li><li>Saga: 2026-06-11 – 2026-06-12</li></ul>\n<p>2 bokningar</p>',
        inputs: [],
      },
      {
        description: 'Det är HTML',
        code: "__get('/').typ",
        expected: 'text/html',
        inputs: [],
      },
      {
        description: 'Statistiken',
        code: "(__post('/bokningar', {'hund_id': 1, 'fran': '2026-06-10', 'till': '2026-06-13'}), __post('/bokningar', {'hund_id': 2, 'fran': '2026-06-11', 'till': '2026-06-12'}), __get('/statistik').json)[-1]",
        expected: { bokningar: 2, natter: 4, intakt: 1300 },
        inputs: [],
      },
      {
        description: 'Tomt',
        code: "__get('/statistik').json",
        expected: { bokningar: 0, natter: 0, intakt: 0 },
        inputs: [],
      },
    ],
    sourceChecks: [
      { description: 'Använder en mall', pattern: /render_template/ },
    ],
  },
};
