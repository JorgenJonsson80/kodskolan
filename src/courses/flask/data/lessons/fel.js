// Bana 7: fel. abort, errorhandler och felsvar i JSON.

export const FEL = [
  {
    id: 'fel-01',
    track: 'fel',
    title: 'abort',
    xp: 10,
    description:
      '`abort(404)` avbryter vägfunktionen direkt och svarar med statuskoden.',
    explain:
      'Med `abort` behöver du inte returnera felet själv. Funktionen slutar på raden med `abort`, och Flask svarar.\n\nSvaret blir en liten HTML-sida. I nästa övning blir det JSON.',
    example: 'from flask import abort\n\nif bok is None:\n    abort(404)',
    task: 'Uppgift: Skapa `GET /hundar/<int:id>` som använder `abort(404)` när hunden inte finns.',
    starterCode:
      "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n",
    solution:
      "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\n\n@app.get('/hundar/<int:id>')\ndef en(id):\n    hund = hitta(id)\n    if hund is None:\n        abort(404)\n    return hund\n",
    hints: [
      'from flask import … abort',
      'if hund is None:\n        abort(404)',
      'return hund',
    ],
    tests: [
      {
        description: 'Hund 1',
        code: "__get('/hundar/1').json['namn']",
        expected: 'Bamse',
      },
      {
        description: 'Hund 9',
        code: "__get('/hundar/9').status",
        expected: 404,
      },
    ],
    request: { path: '/hundar/9' },
    sourceChecks: [{ description: 'Använder abort', pattern: /abort\(404\)/ }],
  },
  {
    id: 'fel-02',
    track: 'fel',
    title: 'Ett felsvar i JSON',
    xp: 15,
    description:
      '`@app.errorhandler(404)` bestämmer vad *alla* 404 svarar – både från `abort` och för adresser som inte finns.',
    explain:
      'Ett API ska svara JSON även när det går fel. Funktionen under `@app.errorhandler(404)` får felet som parameter och returnerar svaret, med statuskoden.',
    example:
      "@app.errorhandler(404)\ndef saknas(fel):\n    return {'fel': 'Hittades inte'}, 404",
    task: "Uppgift: Lägg till en `errorhandler` för 404 som svarar `{'fel': 'Finns inte'}`.",
    starterCode:
      "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\n\n@app.get('/hundar/<int:id>')\ndef en(id):\n    hund = hitta(id)\n    if hund is None:\n        abort(404)\n    return hund\n",
    solution:
      "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\n\n@app.get('/hundar/<int:id>')\ndef en(id):\n    hund = hitta(id)\n    if hund is None:\n        abort(404)\n    return hund\n\n\n@app.errorhandler(404)\ndef finns_inte(fel):\n    return {'fel': 'Finns inte'}, 404\n",
    hints: [
      '@app.errorhandler(404)',
      'def finns_inte(fel):',
      "return {'fel': 'Finns inte'}, 404",
    ],
    tests: [
      {
        description: 'Hund 9',
        code: "__get('/hundar/9').json",
        expected: { fel: 'Finns inte' },
      },
      {
        description: 'En adress som inte finns',
        code: "__get('/katter').json",
        expected: { fel: 'Finns inte' },
      },
      {
        description: 'Statuskoden',
        code: "__get('/katter').status",
        expected: 404,
      },
    ],
    request: { path: '/katter' },
  },
  {
    id: 'fel-03',
    track: 'fel',
    title: 'abort med en förklaring',
    xp: 15,
    description:
      '`abort(400, description=…)` skickar med en förklaring som felhanteraren kan visa.',
    explain:
      "Felet som `errorhandler` får har `description`. Med `abort(400, description='namn saknas')` blir det den texten.\n\nDå kan alla 400-fel i appen svara likadant: `{'fel': fel.description}`.",
    example:
      "abort(400, description='pris saknas')\n\n@app.errorhandler(400)\ndef fel_anrop(fel):\n    return {'fel': fel.description}, 400",
    task: "Uppgift: Lägg till en `errorhandler` för 400 som svarar `{'fel': fel.description}`, och låt `POST /hundar` använda `abort(400, description='namn saknas')`.",
    starterCode:
      "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\n\n@app.post('/hundar')\ndef ny():\n    data = request.get_json()\n    if not data.get('namn'):\n        return 'namn saknas', 400\n    hund = {'id': len(hundar) + 1, 'namn': data['namn'], 'ras': data.get('ras', '')}\n    hundar.append(hund)\n    return hund, 201\n",
    solution:
      "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\n\n@app.post('/hundar')\ndef ny():\n    data = request.get_json()\n    if not data.get('namn'):\n        abort(400, description='namn saknas')\n    hund = {'id': len(hundar) + 1, 'namn': data['namn'], 'ras': data.get('ras', '')}\n    hundar.append(hund)\n    return hund, 201\n\n\n@app.errorhandler(400)\ndef fel_anrop(fel):\n    return {'fel': fel.description}, 400\n",
    hints: [
      "abort(400, description='namn saknas')",
      '@app.errorhandler(400)',
      "return {'fel': fel.description}, 400",
    ],
    tests: [
      {
        description: 'Utan namn',
        code: "__post('/hundar', {}).json",
        expected: { fel: 'namn saknas' },
        inputs: [],
      },
      {
        description: 'Med namn',
        code: "__post('/hundar', {'namn': 'Rufus'}).status",
        expected: 201,
        inputs: [],
      },
    ],
    request: { method: 'POST', path: '/hundar', body: '{}' },
  },
  {
    id: 'fel-04',
    track: 'fel',
    title: '405 i JSON',
    xp: 10,
    description: 'Fel metod ger 405, och det felet kan också få ett JSON-svar.',
    explain:
      'Varje statuskod kan ha en egen felhanterare. Ett API brukar ha för 400, 404 och 405.',
    example:
      "@app.errorhandler(405)\ndef fel_metod(fel):\n    return {'fel': 'Fel metod'}, 405",
    task: "Uppgift: Lägg till en `errorhandler` för 405 som svarar `{'fel': 'Fel metod'}`.",
    starterCode:
      "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\n\n@app.get('/hundar/<int:id>')\ndef en(id):\n    hund = hitta(id)\n    if hund is None:\n        abort(404)\n    return hund\n\n\n@app.errorhandler(404)\ndef finns_inte(fel):\n    return {'fel': 'Finns inte'}, 404\n",
    solution:
      "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\n\n@app.get('/hundar/<int:id>')\ndef en(id):\n    hund = hitta(id)\n    if hund is None:\n        abort(404)\n    return hund\n\n\n@app.errorhandler(404)\ndef finns_inte(fel):\n    return {'fel': 'Finns inte'}, 404\n\n\n@app.errorhandler(405)\ndef fel_metod(fel):\n    return {'fel': 'Fel metod'}, 405\n",
    hints: [
      '@app.errorhandler(405)',
      'En ny funktion.',
      "return {'fel': 'Fel metod'}, 405",
    ],
    tests: [
      {
        description: 'DELETE ger 405',
        code: "__delete('/hundar/1').json",
        expected: { fel: 'Fel metod' },
      },
      {
        description: 'Statuskoden',
        code: "__delete('/hundar/1').status",
        expected: 405,
      },
    ],
    request: { method: 'DELETE', path: '/hundar/1' },
  },
  {
    id: 'fel-05',
    track: 'fel',
    title: 'abort i hjälpfunktionen',
    xp: 15,
    description:
      'Om `hitta` gör `abort(404)` själv blir vägfunktionerna kortare.',
    explain:
      '`abort` fungerar var som helst under ett anrop, även i en hjälpfunktion. Då kan varje väg bara skriva `hund = hitta_eller_404(id)`.',
    example:
      'def hamta(id):\n    vara = hitta(id)\n    if vara is None:\n        abort(404)\n    return vara',
    task: 'Uppgift: Skriv `hitta_eller_404(id)` och använd den i både `GET` och `DELETE /hundar/<int:id>`.',
    starterCode:
      "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\n\n@app.errorhandler(404)\ndef finns_inte(fel):\n    return {'fel': 'Finns inte'}, 404\n\n\n@app.get('/hundar/<int:id>')\ndef en(id):\n    hund = hitta(id)\n    if hund is None:\n        abort(404)\n    return hund\n\n\n@app.delete('/hundar/<int:id>')\ndef ta_bort(id):\n    hund = hitta(id)\n    if hund is None:\n        abort(404)\n    hundar.remove(hund)\n    return '', 204\n",
    solution:
      "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\n\ndef hitta_eller_404(id):\n    hund = hitta(id)\n    if hund is None:\n        abort(404)\n    return hund\n\n\n@app.errorhandler(404)\ndef finns_inte(fel):\n    return {'fel': 'Finns inte'}, 404\n\n\n@app.get('/hundar/<int:id>')\ndef en(id):\n    return hitta_eller_404(id)\n\n\n@app.delete('/hundar/<int:id>')\ndef ta_bort(id):\n    hundar.remove(hitta_eller_404(id))\n    return '', 204\n",
    hints: [
      'def hitta_eller_404(id):',
      'abort(404) inne i funktionen.',
      'return hitta_eller_404(id)',
    ],
    tests: [
      {
        description: 'Hund 1',
        code: "__get('/hundar/1').json['namn']",
        expected: 'Bamse',
      },
      {
        description: 'Hund 9',
        code: "__get('/hundar/9').json",
        expected: { fel: 'Finns inte' },
      },
      {
        description: 'Ta bort 9',
        code: "__delete('/hundar/9').status",
        expected: 404,
      },
      {
        description: 'Ta bort 2',
        code: "__delete('/hundar/2').status",
        expected: 204,
        inputs: [],
      },
    ],
    request: { path: '/hundar/9' },
    sourceChecks: [
      { description: 'Har hitta_eller_404', pattern: /def hitta_eller_404/ },
    ],
  },
  {
    id: 'fel-06',
    track: 'fel',
    title: '409 – krock',
    xp: 15,
    description:
      'Två hundar med samma namn ska inte gå. Statuskoden för en sådan krock är **409 Conflict**.',
    explain:
      '400 betyder att anropet är fel i sig. 409 betyder att det krockar med något som redan finns – anropet hade varit okej annars.',
    example:
      "if any(a['epost'] == ny_epost for a in anvandare):\n    abort(409, description='E-posten används redan')",
    task: "Uppgift: Låt `POST /hundar` svara `{'fel': 'Namnet finns redan'}` med 409 om en hund redan heter så.",
    starterCode:
      "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\n\n@app.post('/hundar')\ndef ny():\n    data = request.get_json()\n    hund = {'id': len(hundar) + 1, 'namn': data['namn'], 'ras': data.get('ras', '')}\n    hundar.append(hund)\n    return hund, 201\n",
    solution:
      "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\n\n@app.post('/hundar')\ndef ny():\n    data = request.get_json()\n    if any(h['namn'] == data['namn'] for h in hundar):\n        return {'fel': 'Namnet finns redan'}, 409\n    hund = {'id': len(hundar) + 1, 'namn': data['namn'], 'ras': data.get('ras', '')}\n    hundar.append(hund)\n    return hund, 201\n",
    hints: [
      "any(h['namn'] == data['namn'] for h in hundar)",
      'Kolla innan hunden skapas.',
      "return {'fel': 'Namnet finns redan'}, 409",
    ],
    tests: [
      {
        description: 'Saga igen',
        code: "__post('/hundar', {'namn': 'Saga'}).status",
        expected: 409,
        inputs: [],
      },
      {
        description: 'Felet',
        code: "__post('/hundar', {'namn': 'Bamse'}).json",
        expected: { fel: 'Namnet finns redan' },
        inputs: [],
      },
      {
        description: 'Rufus',
        code: "__post('/hundar', {'namn': 'Rufus'}).status",
        expected: 201,
        inputs: [],
      },
    ],
    request: { method: 'POST', path: '/hundar', body: '{"namn": "Saga"}' },
  },
  {
    id: 'fel-07',
    track: 'fel',
    title: 'Felhanteraren glömde statuskoden',
    xp: 15,
    description:
      'Felsvaret är rätt, men statuskoden är 200. Appen som frågar tror att allt gick bra.',
    explain:
      'En felhanterare måste själv säga statuskoden. Utan den svarar Flask 200 – fast det var ett fel.\n\nKolla alltid statuskoden under 📮 Svaret, inte bara innehållet.',
    example: "return {'fel': 'Finns inte'}, 404",
    task: 'Uppgift: Laga felhanteraren så att den svarar 404.',
    starterCode:
      "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\n\n@app.get('/hundar/<int:id>')\ndef en(id):\n    hund = hitta(id)\n    if hund is None:\n        abort(404)\n    return hund\n\n\n@app.errorhandler(404)\ndef finns_inte(fel):\n    return {'fel': 'Finns inte'}\n",
    solution:
      "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\n\n@app.get('/hundar/<int:id>')\ndef en(id):\n    hund = hitta(id)\n    if hund is None:\n        abort(404)\n    return hund\n\n\n@app.errorhandler(404)\ndef finns_inte(fel):\n    return {'fel': 'Finns inte'}, 404\n",
    hints: [
      'Vilken statuskod får svaret nu?',
      'Det andra värdet efter kommat.',
      "return {'fel': 'Finns inte'}, 404",
    ],
    tests: [
      { description: '404', code: "__get('/hundar/9').status", expected: 404 },
      {
        description: 'JSON',
        code: "__get('/hundar/9').json",
        expected: { fel: 'Finns inte' },
      },
    ],
    request: { path: '/hundar/9' },
  },
  {
    id: 'fel-08',
    track: 'fel',
    title: '403 – förbjudet',
    xp: 15,
    description:
      'Vissa vägar är bara för vissa. Utan rätt nyckel svarar appen **403 Forbidden**.',
    explain:
      '401 betyder "logga in först", och 403 "du får inte, även om vi vet vem du är". Här finns ingen inloggning än (den kommer i bana 12), så en enkel nyckel i adressen får räcka.',
    example: "if request.args.get('nyckel') != 'hemlig':\n    abort(403)",
    task: "Uppgift: Skapa `GET /admin/antal` som svarar `{'antal': …}` bara med `?nyckel=bamse123`. Annars `abort(403)`, och en felhanterare för 403 svarar `{'fel': 'Förbjudet'}`.",
    starterCode:
      "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n",
    solution:
      "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\n\n@app.get('/admin/antal')\ndef antal():\n    if request.args.get('nyckel') != 'bamse123':\n        abort(403)\n    return {'antal': len(hundar)}\n\n\n@app.errorhandler(403)\ndef forbjudet(fel):\n    return {'fel': 'Förbjudet'}, 403\n",
    hints: [
      "request.args.get('nyckel') != 'bamse123'",
      'abort(403)',
      '@app.errorhandler(403)',
    ],
    tests: [
      {
        description: 'Med nyckel',
        code: "__get('/admin/antal?nyckel=bamse123').json",
        expected: { antal: 2 },
      },
      {
        description: 'Utan nyckel',
        code: "__get('/admin/antal').status",
        expected: 403,
      },
      {
        description: 'Felet',
        code: "__get('/admin/antal?nyckel=fel').json",
        expected: { fel: 'Förbjudet' },
      },
    ],
    request: { path: '/admin/antal?nyckel=bamse123' },
  },
  {
    id: 'fel-09',
    track: 'fel',
    title: 'Samma form på alla fel',
    xp: 15,
    description:
      'Alla felsvar ska se likadana ut: `{"fel": …, "kod": …}`. En hjälpfunktion gör det enkelt.',
    explain:
      'Med en funktion `felsvar(meddelande, kod)` skrivs formen på ett ställe. Ändrar du den ändras alla fel i appen.',
    example:
      "def felsvar(meddelande, kod):\n    return {'fel': meddelande, 'kod': kod}, kod",
    task: "Uppgift: Skriv `felsvar(meddelande, kod)` som ger `{'fel': meddelande, 'kod': kod}, kod`, och använd den i felhanterarna för 404 och 405.",
    starterCode:
      "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\n\n@app.get('/hundar/<int:id>')\ndef en(id):\n    hund = hitta(id)\n    if hund is None:\n        abort(404)\n    return hund\n",
    solution:
      "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\n\ndef felsvar(meddelande, kod):\n    return {'fel': meddelande, 'kod': kod}, kod\n\n\n@app.get('/hundar/<int:id>')\ndef en(id):\n    hund = hitta(id)\n    if hund is None:\n        abort(404)\n    return hund\n\n\n@app.errorhandler(404)\ndef finns_inte(fel):\n    return felsvar('Finns inte', 404)\n\n\n@app.errorhandler(405)\ndef fel_metod(fel):\n    return felsvar('Fel metod', 405)\n",
    hints: [
      'def felsvar(meddelande, kod):',
      "return {'fel': meddelande, 'kod': kod}, kod",
      "return felsvar('Finns inte', 404)",
    ],
    tests: [
      {
        description: '404',
        code: "__get('/hundar/9').json",
        expected: { fel: 'Finns inte', kod: 404 },
      },
      {
        description: '405',
        code: "__post('/hundar/1').json",
        expected: { fel: 'Fel metod', kod: 405 },
      },
      {
        description: 'Statuskoden',
        code: "__post('/hundar/1').status",
        expected: 405,
      },
    ],
    request: { path: '/hundar/9' },
  },
];
