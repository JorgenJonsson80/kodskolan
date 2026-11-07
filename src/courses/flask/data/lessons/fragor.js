// Bana 4: frågor i adressen. request.args, standardvärden och type=int.

export const FRAGOR = [
  {
    id: 'fragor-01',
    track: 'fragor',
    title: 'Frågan efter ?',
    xp: 10,
    description:
      'Allt efter `?` i en adress är en fråga till appen: `/sok?q=ada`.',
    explain:
      "Delen efter `?` kallas **query string**. Den består av namn och värden: `q=ada`. Flera skiljs åt med `&`: `?q=ada&sida=2`.\n\n`request.args.get('q')` ger värdet. `request` importeras från flask och innehåller allt om anropet som pågår.",
    example:
      "from flask import Flask, request\n\n@app.get('/eko')\ndef eko():\n    return request.args.get('text')",
    task: "Uppgift: Skapa `/sok` som svarar `f'Du sökte på {q}'`, där `q` kommer från `request.args`.",
    starterCode: 'from flask import Flask, request\n\napp = Flask(__name__)\n',
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\n@app.get('/sok')\ndef sok():\n    q = request.args.get('q')\n    return f'Du sökte på {q}'\n",
    hints: [
      "q = request.args.get('q')",
      "@app.get('/sok')",
      "return f'Du sökte på {q}'",
    ],
    tests: [
      {
        description: '?q=ada',
        code: "__get('/sok?q=ada').text",
        expected: 'Du sökte på ada',
      },
      {
        description: '?q=tax',
        code: "__get('/sok?q=tax').text",
        expected: 'Du sökte på tax',
      },
    ],
    request: { path: '/sok?q=ada' },
  },
  {
    id: 'fragor-02',
    track: 'fragor',
    title: 'Ett standardvärde',
    xp: 10,
    description: 'Frågan kan saknas. Då ger `get` ett standardvärde.',
    explain:
      "`request.args.get('namn', 'du')` ger `'du'` om det inte finns något `namn` i adressen. Utan standardvärde blir det `None`.",
    example: "farg = request.args.get('farg', 'blå')",
    task: "Uppgift: Skapa `/hej` som svarar `f'Hej {namn}!'`, med `'du'` som standardvärde för `namn`.",
    starterCode: 'from flask import Flask, request\n\napp = Flask(__name__)\n',
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\n@app.get('/hej')\ndef hej():\n    namn = request.args.get('namn', 'du')\n    return f'Hej {namn}!'\n",
    hints: [
      "request.args.get('namn', 'du')",
      "@app.get('/hej')",
      "return f'Hej {namn}!'",
    ],
    tests: [
      {
        description: 'Utan namn',
        code: "__get('/hej').text",
        expected: 'Hej du!',
      },
      {
        description: 'Med namn',
        code: "__get('/hej?namn=Ada').text",
        expected: 'Hej Ada!',
      },
    ],
    request: { path: '/hej?namn=Ada' },
  },
  {
    id: 'fragor-03',
    track: 'fragor',
    title: 'Ett tal i frågan',
    xp: 15,
    description:
      'Allt i adressen är text. Med `type=int` gör `get` om det till ett tal.',
    explain:
      "`request.args.get('sida', 1, type=int)` ger ett heltal. Går värdet inte att göra om – som `?sida=x` – blir det standardvärdet i stället för en krasch.",
    example: "antal = request.args.get('antal', 10, type=int)",
    task: "Uppgift: Skapa `/sida` som svarar `f'Sida {nr} av 5'`, där `nr` kommer från `?nr=` som ett heltal med 1 som standard.",
    starterCode: 'from flask import Flask, request\n\napp = Flask(__name__)\n',
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\n@app.get('/sida')\ndef sida():\n    nr = request.args.get('nr', 1, type=int)\n    return f'Sida {nr} av 5'\n",
    hints: [
      "request.args.get('nr', 1, type=int)",
      "@app.get('/sida')",
      "return f'Sida {nr} av 5'",
    ],
    tests: [
      {
        description: '?nr=3',
        code: "__get('/sida?nr=3').text",
        expected: 'Sida 3 av 5',
      },
      {
        description: 'Utan nr',
        code: "__get('/sida').text",
        expected: 'Sida 1 av 5',
      },
      {
        description: '?nr=x',
        code: "__get('/sida?nr=x').text",
        expected: 'Sida 1 av 5',
      },
    ],
    request: { path: '/sida?nr=3' },
    sourceChecks: [
      { description: 'Använder type=int', pattern: /type\s*=\s*int/ },
    ],
  },
  {
    id: 'fragor-04',
    track: 'fragor',
    title: 'Filtrera',
    xp: 15,
    description:
      'En fråga i adressen kan filtrera listan, som `/hundar?ras=tax`.',
    explain:
      'Saknas frågan ska hela listan komma. Med `None` som standardvärde är det lätt att kolla: `if ras is None: return hundar`.',
    example:
      "stad = request.args.get('stad')\nif stad is None:\n    return butiker\nreturn [b for b in butiker if b['stad'] == stad]",
    task: 'Uppgift: Skapa `/hundar` som svarar med alla hundar, eller bara de av rasen i `?ras=`.',
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner', 'alder': 4},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax', 'alder': 2},\n    {'id': 3, 'namn': 'Rufus', 'ras': 'pudel', 'alder': 7},\n    {'id': 4, 'namn': 'Sixten', 'ras': 'tax', 'alder': 5},\n]\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner', 'alder': 4},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax', 'alder': 2},\n    {'id': 3, 'namn': 'Rufus', 'ras': 'pudel', 'alder': 7},\n    {'id': 4, 'namn': 'Sixten', 'ras': 'tax', 'alder': 5},\n]\n\n\n@app.get('/hundar')\ndef lista():\n    ras = request.args.get('ras')\n    if ras is None:\n        return hundar\n    return [h for h in hundar if h['ras'] == ras]\n",
    hints: [
      "ras = request.args.get('ras')",
      'if ras is None: return hundar',
      "return [h for h in hundar if h['ras'] == ras]",
    ],
    tests: [
      { description: 'Alla', code: "len(__get('/hundar').json)", expected: 4 },
      {
        description: 'Taxar',
        code: "[h['namn'] for h in __get('/hundar?ras=tax').json]",
        expected: ['Saga', 'Sixten'],
      },
    ],
    request: { path: '/hundar?ras=tax' },
  },
  {
    id: 'fragor-05',
    track: 'fragor',
    title: 'Sök i text',
    xp: 15,
    description:
      'En sökning ska hitta "ba" i "Bamse", oavsett stora och små bokstäver.',
    explain:
      'Gör både sökordet och namnet till små bokstäver med `lower()`, och kolla med `in`.\n\nEn tom sökning (`?q=`) hittar allt, för den tomma texten finns i alla texter.',
    example: "[f for f in filmer if q.lower() in f['titel'].lower()]",
    task: "Uppgift: Skapa `/sok` som svarar med namnen på hundarna vars namn innehåller `?q=` (standard `''`).",
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner', 'alder': 4},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax', 'alder': 2},\n    {'id': 3, 'namn': 'Rufus', 'ras': 'pudel', 'alder': 7},\n    {'id': 4, 'namn': 'Sixten', 'ras': 'tax', 'alder': 5},\n]\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner', 'alder': 4},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax', 'alder': 2},\n    {'id': 3, 'namn': 'Rufus', 'ras': 'pudel', 'alder': 7},\n    {'id': 4, 'namn': 'Sixten', 'ras': 'tax', 'alder': 5},\n]\n\n\n@app.get('/sok')\ndef sok():\n    q = request.args.get('q', '').lower()\n    return [h['namn'] for h in hundar if q in h['namn'].lower()]\n",
    hints: [
      "request.args.get('q', '').lower()",
      "if q in h['namn'].lower()",
      "return [h['namn'] for h in hundar if q in h['namn'].lower()]",
    ],
    tests: [
      {
        description: '?q=S',
        code: "__get('/sok?q=S').json",
        expected: ['Bamse', 'Saga', 'Rufus', 'Sixten'],
      },
      {
        description: '?q=sa',
        code: "__get('/sok?q=sa').json",
        expected: ['Saga'],
      },
      {
        description: '?q=x',
        code: "__get('/sok?q=x').json",
        expected: ['Sixten'],
      },
    ],
    request: { path: '/sok?q=sa' },
  },
  {
    id: 'fragor-06',
    track: 'fragor',
    title: 'Två frågor',
    xp: 15,
    description: 'Flera frågor skiljs åt med `&`: `/hundar?min=3&max=6`.',
    explain:
      'Varje fråga hämtas för sig med `request.args.get`. Bra standardvärden gör att båda kan hoppas över.',
    example:
      "min_pris = request.args.get('min', 0, type=int)\nmax_pris = request.args.get('max', 1000, type=int)",
    task: 'Uppgift: Skapa `/alder` som svarar med namnen på hundarna med en ålder från `?min=` (standard 0) till och med `?max=` (standard 99).',
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner', 'alder': 4},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax', 'alder': 2},\n    {'id': 3, 'namn': 'Rufus', 'ras': 'pudel', 'alder': 7},\n    {'id': 4, 'namn': 'Sixten', 'ras': 'tax', 'alder': 5},\n]\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner', 'alder': 4},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax', 'alder': 2},\n    {'id': 3, 'namn': 'Rufus', 'ras': 'pudel', 'alder': 7},\n    {'id': 4, 'namn': 'Sixten', 'ras': 'tax', 'alder': 5},\n]\n\n\n@app.get('/alder')\ndef alder():\n    minst = request.args.get('min', 0, type=int)\n    mest = request.args.get('max', 99, type=int)\n    return [h['namn'] for h in hundar if minst <= h['alder'] <= mest]\n",
    hints: [
      'Två get med type=int.',
      "minst <= h['alder'] <= mest",
      'Variablerna kan inte heta min och max – det är Pythons funktioner.',
    ],
    tests: [
      {
        description: '3–6',
        code: "__get('/alder?min=3&max=6').json",
        expected: ['Bamse', 'Sixten'],
      },
      {
        description: 'Från 5',
        code: "__get('/alder?min=5').json",
        expected: ['Rufus', 'Sixten'],
      },
      { description: 'Alla', code: "len(__get('/alder').json)", expected: 4 },
    ],
    request: { path: '/alder?min=3&max=6' },
  },
  {
    id: 'fragor-07',
    track: 'fragor',
    title: 'Sortera efter frågan',
    xp: 20,
    description:
      '`?sortera=namn` eller `?sortera=alder` – och 400 för allt annat.',
    explain:
      'Statuskoden **400 Bad Request** betyder att anropet är fel – frågan har ett värde appen inte förstår. Svara med ett felmeddelande som säger vad som är tillåtet.',
    example:
      "if ordning not in ('stigande', 'fallande'):\n    return {'fel': 'ordning ska vara stigande eller fallande'}, 400",
    task: "Uppgift: Skapa `/sorterat` som svarar med namnen sorterade efter `?sortera=` (`'id'` som standard, eller `'namn'` och `'alder'`). Andra värden ger `{'fel': 'Kan inte sortera på det'}` med 400.",
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner', 'alder': 4},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax', 'alder': 2},\n    {'id': 3, 'namn': 'Rufus', 'ras': 'pudel', 'alder': 7},\n    {'id': 4, 'namn': 'Sixten', 'ras': 'tax', 'alder': 5},\n]\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner', 'alder': 4},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax', 'alder': 2},\n    {'id': 3, 'namn': 'Rufus', 'ras': 'pudel', 'alder': 7},\n    {'id': 4, 'namn': 'Sixten', 'ras': 'tax', 'alder': 5},\n]\n\n\n@app.get('/sorterat')\ndef sorterat():\n    falt = request.args.get('sortera', 'id')\n    if falt not in ('id', 'namn', 'alder'):\n        return {'fel': 'Kan inte sortera på det'}, 400\n    return [h['namn'] for h in sorted(hundar, key=lambda h: h[falt])]\n",
    hints: [
      "falt = request.args.get('sortera', 'id')",
      "if falt not in ('id', 'namn', 'alder'):",
      'sorted(hundar, key=lambda h: h[falt])',
    ],
    tests: [
      {
        description: 'Efter namn',
        code: "__get('/sorterat?sortera=namn').json",
        expected: ['Bamse', 'Rufus', 'Saga', 'Sixten'],
      },
      {
        description: 'Efter ålder',
        code: "__get('/sorterat?sortera=alder').json",
        expected: ['Saga', 'Bamse', 'Sixten', 'Rufus'],
      },
      {
        description: 'Efter ras ger 400',
        code: "__get('/sorterat?sortera=ras').status",
        expected: 400,
      },
    ],
    request: { path: '/sorterat?sortera=alder' },
  },
  {
    id: 'fragor-08',
    track: 'fragor',
    title: 'Begränsa svaret',
    xp: 15,
    description: 'Med `?antal=2` vill den som frågar bara ha de två första.',
    explain:
      'Ett API med tusentals saker skickar inte allt på en gång. En slice `lista[:antal]` ger de första.\n\nSom standard kan `antal` vara längden på listan, så att allt kommer med.',
    example: 'return varor[:antal]',
    task: 'Uppgift: Skapa `/forsta` som svarar med de `?antal=` första hundarnas namn (alla som standard).',
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner', 'alder': 4},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax', 'alder': 2},\n    {'id': 3, 'namn': 'Rufus', 'ras': 'pudel', 'alder': 7},\n    {'id': 4, 'namn': 'Sixten', 'ras': 'tax', 'alder': 5},\n]\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner', 'alder': 4},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax', 'alder': 2},\n    {'id': 3, 'namn': 'Rufus', 'ras': 'pudel', 'alder': 7},\n    {'id': 4, 'namn': 'Sixten', 'ras': 'tax', 'alder': 5},\n]\n\n\n@app.get('/forsta')\ndef forsta():\n    antal = request.args.get('antal', len(hundar), type=int)\n    return [h['namn'] for h in hundar[:antal]]\n",
    hints: [
      "request.args.get('antal', len(hundar), type=int)",
      'hundar[:antal]',
      "return [h['namn'] for h in hundar[:antal]]",
    ],
    tests: [
      {
        description: 'Två',
        code: "__get('/forsta?antal=2').json",
        expected: ['Bamse', 'Saga'],
      },
      { description: 'Alla', code: "len(__get('/forsta').json)", expected: 4 },
    ],
    request: { path: '/forsta?antal=2' },
  },
  {
    id: 'fragor-09',
    track: 'fragor',
    title: '400 Bad Request',
    xp: 15,
    description:
      '`/sok` utan `?q=` svarar 400. Ingen sökning ska kunna gå fel så.',
    explain:
      "`request.args['q']` med hakparenteser kräver att `q` finns. Saknas den svarar Flask **400 Bad Request** – och vägfunktionen kommer aldrig längre.\n\n`request.args.get('q', '')` ger en tom text i stället.",
    example: "q = request.args.get('q', '')",
    task: 'Uppgift: Laga `/sok` så att den fungerar utan `?q=` (och då hittar alla).',
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner', 'alder': 4},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax', 'alder': 2},\n    {'id': 3, 'namn': 'Rufus', 'ras': 'pudel', 'alder': 7},\n    {'id': 4, 'namn': 'Sixten', 'ras': 'tax', 'alder': 5},\n]\n\n\n@app.get('/sok')\ndef sok():\n    q = request.args['q']\n    return [h['namn'] for h in hundar if q in h['namn']]\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner', 'alder': 4},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax', 'alder': 2},\n    {'id': 3, 'namn': 'Rufus', 'ras': 'pudel', 'alder': 7},\n    {'id': 4, 'namn': 'Sixten', 'ras': 'tax', 'alder': 5},\n]\n\n\n@app.get('/sok')\ndef sok():\n    q = request.args.get('q', '')\n    return [h['namn'] for h in hundar if q in h['namn']]\n",
    hints: [
      'Anropa /sok utan fråga och läs statuskoden.',
      'Använd get med ett standardvärde.',
      "q = request.args.get('q', '')",
    ],
    tests: [
      {
        description: 'Utan fråga',
        code: "__get('/sok').status",
        expected: 200,
      },
      { description: 'Alla', code: "len(__get('/sok').json)", expected: 4 },
      {
        description: '?q=Sa',
        code: "__get('/sok?q=Sa').json",
        expected: ['Saga'],
      },
    ],
    request: { path: '/sok' },
  },
];
