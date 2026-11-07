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
};
