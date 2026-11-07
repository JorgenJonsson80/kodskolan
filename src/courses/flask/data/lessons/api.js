// Bana 6: ett helt API. GET, POST, PUT, PATCH och DELETE på en lista i
// minnet, med en hjälpfunktion som letar upp en sak med id.

export const API = [
  {
    id: 'api-01',
    track: 'api',
    title: 'En hjälpfunktion',
    xp: 10,
    description:
      'Flera vägar behöver hitta en hund med ett id. Skriv det en gång, i en vanlig funktion.',
    explain:
      '`hitta(id)` är en vanlig Python-funktion utan `@app`. Den ger hunden eller `None`, och vägfunktionerna använder den.\n\nEtt helt API har fem vägar: hämta alla, hämta en, skapa, ändra och ta bort. Det kallas **CRUD** (Create, Read, Update, Delete).',
    example:
      "def hitta(id):\n    for vara in varor:\n        if vara['id'] == id:\n            return vara\n    return None",
    task: "Uppgift: Skriv `hitta(id)` och vägen `GET /hundar/<int:id>` som använder den (404 med `{'fel': 'Finns inte'}` när hunden saknas).",
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\n\n@app.get('/hundar/<int:id>')\ndef en(id):\n    hund = hitta(id)\n    if hund is None:\n        return {'fel': 'Finns inte'}, 404\n    return hund\n",
    hints: [
      'def hitta(id): … return None',
      'hund = hitta(id)',
      "if hund is None:\n        return {'fel': 'Finns inte'}, 404",
    ],
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
      { description: 'hitta(9)', code: 'hitta(9)', expected: null },
    ],
    request: { path: '/hundar/2' },
  },
  {
    id: 'api-02',
    track: 'api',
    title: 'PUT – ändra',
    xp: 15,
    description: 'Med PUT skickar man en ny version av något som redan finns.',
    explain:
      "`@app.put('/hundar/<int:id>')` tar emot hela den nya hunden. Adressen säger vilken hund, och datan vad den ska bli.\n\nId:t ändras aldrig – det kommer från adressen.",
    example:
      "@app.put('/varor/<int:id>')\ndef andra(id):\n    vara = hitta(id)\n    data = request.get_json()\n    vara['pris'] = data['pris']\n    return vara",
    task: 'Uppgift: Skapa `PUT /hundar/<int:id>` som byter `namn` och `ras` och svarar med hunden. En hund som inte finns ger 404.',
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\n\n@app.put('/hundar/<int:id>')\ndef ersatt(id):\n    hund = hitta(id)\n    if hund is None:\n        return {'fel': 'Finns inte'}, 404\n    data = request.get_json()\n    hund['namn'] = data['namn']\n    hund['ras'] = data['ras']\n    return hund\n",
    hints: [
      "@app.put('/hundar/<int:id>')",
      "hund['namn'] = data['namn']",
      'return hund',
    ],
    tests: [
      {
        description: 'Byter namn',
        code: "__put('/hundar/1', {'namn': 'Bamse II', 'ras': 'berner'}).json",
        expected: { id: 1, namn: 'Bamse II', ras: 'berner' },
        inputs: [],
      },
      {
        description: 'Sparas',
        code: "(__put('/hundar/2', {'namn': 'Saga', 'ras': 'pudel'}), hitta(2)['ras'])[-1]",
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
      path: '/hundar/1',
      body: '{"namn": "Bamse II", "ras": "berner"}',
    },
  },
  {
    id: 'api-03',
    track: 'api',
    title: 'PUT med kontroll',
    xp: 15,
    description: 'En PUT utan namn ska inte förstöra hunden.',
    explain:
      'Kolla datan *innan* du ändrar något. Annars hinner halva ändringen göras innan felet upptäcks.',
    example:
      "if not data.get('namn') or not data.get('ras'):\n    return {'fel': 'namn och ras krävs'}, 400",
    task: "Uppgift: Laga `ersatt` så att saknat namn eller ras ger `{'fel': 'namn och ras krävs'}` med 400, utan att hunden ändras.",
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\n\n@app.put('/hundar/<int:id>')\ndef ersatt(id):\n    hund = hitta(id)\n    if hund is None:\n        return {'fel': 'Finns inte'}, 404\n    data = request.get_json()\n    hund['namn'] = data['namn']\n    hund['ras'] = data['ras']\n    return hund\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\n\n@app.put('/hundar/<int:id>')\ndef ersatt(id):\n    hund = hitta(id)\n    if hund is None:\n        return {'fel': 'Finns inte'}, 404\n    data = request.get_json()\n    if not data.get('namn') or not data.get('ras'):\n        return {'fel': 'namn och ras krävs'}, 400\n    hund['namn'] = data['namn']\n    hund['ras'] = data['ras']\n    return hund\n",
    hints: [
      'Kolla direkt efter get_json.',
      "data.get('namn') och data.get('ras')",
      "return {'fel': 'namn och ras krävs'}, 400",
    ],
    tests: [
      {
        description: 'Utan ras',
        code: "__put('/hundar/1', {'namn': 'X'}).status",
        expected: 400,
        inputs: [],
      },
      {
        description: 'Ändras inte',
        code: "(__put('/hundar/1', {'namn': 'X'}), hitta(1)['namn'])[-1]",
        expected: 'Bamse',
        inputs: [],
      },
      {
        description: 'Med allt',
        code: "__put('/hundar/1', {'namn': 'X', 'ras': 'Y'}).status",
        expected: 200,
        inputs: [],
      },
    ],
    request: { method: 'PUT', path: '/hundar/1', body: '{"namn": "X"}' },
  },
  {
    id: 'api-04',
    track: 'api',
    title: 'DELETE – ta bort',
    xp: 15,
    description: 'DELETE tar bort. Svaret är tomt, med statuskoden 204.',
    explain:
      "**204 No Content** betyder: det gick, och det finns inget att visa. Returnera `'', 204`.\n\n`hundar.remove(hund)` tar bort just den hunden ur listan.",
    example:
      "@app.delete('/lappar/<int:id>')\ndef ta_bort(id):\n    lappar.remove(hitta(id))\n    return '', 204",
    task: 'Uppgift: Skapa `DELETE /hundar/<int:id>` som tar bort hunden och svarar 204, eller 404 om den inte finns.',
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\n\n@app.delete('/hundar/<int:id>')\ndef ta_bort(id):\n    hund = hitta(id)\n    if hund is None:\n        return {'fel': 'Finns inte'}, 404\n    hundar.remove(hund)\n    return '', 204\n",
    hints: [
      "@app.delete('/hundar/<int:id>')",
      'hundar.remove(hund)',
      "return '', 204",
    ],
    tests: [
      {
        description: '204',
        code: "__delete('/hundar/1').status",
        expected: 204,
        inputs: [],
      },
      {
        description: 'Borta',
        code: "(__delete('/hundar/1'), [h['id'] for h in hundar])[-1]",
        expected: [2],
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
    id: 'api-05',
    track: 'api',
    title: 'PATCH – ändra lite',
    xp: 15,
    description: 'PUT skickar allt. PATCH skickar bara det som ska ändras.',
    explain:
      "Med PATCH kan man skicka `{'ras': 'pudel'}` och resten blir kvar. Kolla vilka fält som finns i datan, och ändra bara dem.\n\nBara tillåtna fält ändras – `id` ska aldrig gå att byta.",
    example:
      "for falt in ('pris', 'antal'):\n    if falt in data:\n        vara[falt] = data[falt]",
    task: 'Uppgift: Skapa `PATCH /hundar/<int:id>` som ändrar `namn` och/eller `ras` om de finns i datan.',
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\n\n@app.patch('/hundar/<int:id>')\ndef andra(id):\n    hund = hitta(id)\n    if hund is None:\n        return {'fel': 'Finns inte'}, 404\n    data = request.get_json()\n    for falt in ('namn', 'ras'):\n        if falt in data:\n            hund[falt] = data[falt]\n    return hund\n",
    hints: [
      "@app.patch('/hundar/<int:id>')",
      "for falt in ('namn', 'ras'):",
      'if falt in data: hund[falt] = data[falt]',
    ],
    tests: [
      {
        description: 'Bara ras',
        code: "__patch('/hundar/2', {'ras': 'pudel'}).json",
        expected: { id: 2, namn: 'Saga', ras: 'pudel' },
        inputs: [],
      },
      {
        description: 'Hund 9',
        code: "__patch('/hundar/9', {'ras': 'pudel'}).status",
        expected: 404,
        inputs: [],
      },
    ],
    request: { method: 'PATCH', path: '/hundar/2', body: '{"ras": "pudel"}' },
  },
  {
    id: 'api-06',
    track: 'api',
    title: 'id går inte att ändra',
    xp: 20,
    description: 'Med PATCH går det att byta id på en hund. Det får inte gå.',
    explain:
      'Koden använder `hund.update(data)`, som tar allt i datan – även `id`. Då kan två hundar få samma id, eller en hund försvinna från sin adress.\n\nÄndra bara de fält som får ändras.',
    example:
      "for falt in ('namn', 'ras'):\n    if falt in data:\n        hund[falt] = data[falt]",
    task: 'Uppgift: Laga `andra` så att bara `namn` och `ras` kan ändras.',
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\n\n@app.patch('/hundar/<int:id>')\ndef andra(id):\n    hund = hitta(id)\n    if hund is None:\n        return {'fel': 'Finns inte'}, 404\n    data = request.get_json()\n    hund.update(data)\n    return hund\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\n\n@app.patch('/hundar/<int:id>')\ndef andra(id):\n    hund = hitta(id)\n    if hund is None:\n        return {'fel': 'Finns inte'}, 404\n    data = request.get_json()\n    for falt in ('namn', 'ras'):\n        if falt in data:\n            hund[falt] = data[falt]\n    return hund\n",
    hints: [
      'update tar allt i data.',
      'Gå igenom de tillåtna fälten.',
      "for falt in ('namn', 'ras'):\n        if falt in data:\n            hund[falt] = data[falt]",
    ],
    tests: [
      {
        description: 'id ändras inte',
        code: "__patch('/hundar/1', {'id': 99, 'namn': 'Bamse'}).json['id']",
        expected: 1,
        inputs: [],
      },
      {
        description: 'Namnet ändras',
        code: "__patch('/hundar/1', {'namn': 'Nalle'}).json['namn']",
        expected: 'Nalle',
        inputs: [],
      },
      {
        description: 'Ingen hund får id 99',
        code: "(__patch('/hundar/1', {'id': 99}), hitta(99))[-1]",
        expected: null,
        inputs: [],
      },
    ],
    request: {
      method: 'PATCH',
      path: '/hundar/1',
      body: '{"id": 99, "namn": "Bamse"}',
    },
  },
  {
    id: 'api-07',
    track: 'api',
    title: 'Hela API:t',
    xp: 20,
    description:
      'Nu kan du alla fem: hämta alla, hämta en, skapa, ändra och ta bort.',
    explain:
      '| Metod | Adress | Gör |\n|---|---|---|\n| GET | /hundar | alla |\n| GET | /hundar/1 | en |\n| POST | /hundar | ny |\n| PUT | /hundar/1 | ändra |\n| DELETE | /hundar/1 | ta bort |\n\nSamma två adresser, fem metoder. Så ser de flesta API:er ut.',
    example: '# Vägarna i appen står under svaret när du kört koden.',
    task: 'Uppgift: Lägg till `GET /hundar` och `POST /hundar` (id = högsta + 1, svar 201), så att API:t har alla fem vägarna.',
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\n\n@app.get('/hundar/<int:id>')\ndef en(id):\n    hund = hitta(id)\n    if hund is None:\n        return {'fel': 'Finns inte'}, 404\n    return hund\n\n\n@app.put('/hundar/<int:id>')\ndef ersatt(id):\n    hund = hitta(id)\n    if hund is None:\n        return {'fel': 'Finns inte'}, 404\n    data = request.get_json()\n    hund['namn'] = data['namn']\n    hund['ras'] = data['ras']\n    return hund\n\n\n@app.delete('/hundar/<int:id>')\ndef ta_bort(id):\n    hund = hitta(id)\n    if hund is None:\n        return {'fel': 'Finns inte'}, 404\n    hundar.remove(hund)\n    return '', 204\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\n\n@app.get('/hundar')\ndef alla():\n    return hundar\n\n\n@app.get('/hundar/<int:id>')\ndef en(id):\n    hund = hitta(id)\n    if hund is None:\n        return {'fel': 'Finns inte'}, 404\n    return hund\n\n\n@app.post('/hundar')\ndef ny():\n    data = request.get_json()\n    nytt_id = max((h['id'] for h in hundar), default=0) + 1\n    hund = {'id': nytt_id, 'namn': data['namn'], 'ras': data['ras']}\n    hundar.append(hund)\n    return hund, 201\n\n\n@app.put('/hundar/<int:id>')\ndef ersatt(id):\n    hund = hitta(id)\n    if hund is None:\n        return {'fel': 'Finns inte'}, 404\n    data = request.get_json()\n    hund['namn'] = data['namn']\n    hund['ras'] = data['ras']\n    return hund\n\n\n@app.delete('/hundar/<int:id>')\ndef ta_bort(id):\n    hund = hitta(id)\n    if hund is None:\n        return {'fel': 'Finns inte'}, 404\n    hundar.remove(hund)\n    return '', 204\n",
    hints: [
      'GET /hundar returnerar listan.',
      "POST: max((h['id'] for h in hundar), default=0) + 1",
      'return hund, 201',
    ],
    tests: [
      {
        description: 'Två adresser',
        code: '__vagar()',
        expected: [
          ['GET POST', '/hundar'],
          ['GET PUT DELETE', '/hundar/<int:id>'],
        ],
      },
      {
        description: 'Skapa och hämta',
        code: "(__post('/hundar', {'namn': 'Rufus', 'ras': 'pudel'}), __get('/hundar/3').json['namn'])[-1]",
        expected: 'Rufus',
        inputs: [],
      },
      {
        description: 'Ta bort och lägg till',
        code: "(__delete('/hundar/2'), __post('/hundar', {'namn': 'X', 'ras': 'Y'}).json['id'])[-1]",
        expected: 2,
        inputs: [],
      },
    ],
    request: { path: '/hundar' },
  },
  {
    id: 'api-08',
    track: 'api',
    title: 'Saker som hör till något',
    xp: 20,
    description:
      'En hund har vistelser på pensionatet. Adressen visar det: `/hundar/1/vistelser`.',
    explain:
      'Det som hör till något annat får en adress under det: `/hundar/<id>/vistelser`. Först kollas att hunden finns, sedan plockas dess vistelser ut.',
    example:
      "@app.get('/kunder/<int:id>/ordrar')\ndef ordrar(id):\n    return [o for o in alla_ordrar if o['kund_id'] == id]",
    task: 'Uppgift: Skapa `GET /hundar/<int:id>/vistelser` med hundens vistelser, eller 404 om hunden inte finns.',
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\nvistelser = [\n    {'id': 1, 'hund_id': 1, 'fran': '2026-06-10', 'till': '2026-06-13'},\n]\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\nvistelser = [\n    {'id': 1, 'hund_id': 1, 'fran': '2026-06-10', 'till': '2026-06-13'},\n]\n\n\n@app.get('/hundar/<int:id>/vistelser')\ndef hundens_vistelser(id):\n    if hitta(id) is None:\n        return {'fel': 'Finns inte'}, 404\n    return [v for v in vistelser if v['hund_id'] == id]\n",
    hints: [
      "@app.get('/hundar/<int:id>/vistelser')",
      'if hitta(id) is None: … 404',
      "[v for v in vistelser if v['hund_id'] == id]",
    ],
    tests: [
      {
        description: 'Bamse',
        code: "len(__get('/hundar/1/vistelser').json)",
        expected: 1,
      },
      {
        description: 'Saga har inga',
        code: "__get('/hundar/2/vistelser').json",
        expected: [],
      },
      {
        description: 'Hund 9',
        code: "__get('/hundar/9/vistelser').status",
        expected: 404,
      },
    ],
    request: { path: '/hundar/1/vistelser' },
  },
  {
    id: 'api-09',
    track: 'api',
    title: 'Boka en vistelse',
    xp: 20,
    description:
      'Att boka är att skapa en vistelse som hör till en hund: `POST /hundar/1/vistelser`.',
    explain:
      'Hundens id kommer från adressen, och datumen från datan. Det nya får ett eget id.',
    example: "@app.post('/kunder/<int:id>/ordrar')\ndef ny_order(id):\n    ...",
    task: "Uppgift: Skapa `POST /hundar/<int:id>/vistelser` som sparar `{'id', 'hund_id', 'fran', 'till'}` och svarar 201. En hund som inte finns ger 404.",
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\nvistelser = [\n    {'id': 1, 'hund_id': 1, 'fran': '2026-06-10', 'till': '2026-06-13'},\n]\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\ndef hitta(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return None\n\nvistelser = [\n    {'id': 1, 'hund_id': 1, 'fran': '2026-06-10', 'till': '2026-06-13'},\n]\n\n\n@app.post('/hundar/<int:id>/vistelser')\ndef boka(id):\n    if hitta(id) is None:\n        return {'fel': 'Finns inte'}, 404\n    data = request.get_json()\n    nytt_id = max((v['id'] for v in vistelser), default=0) + 1\n    vistelse = {'id': nytt_id, 'hund_id': id, 'fran': data['fran'], 'till': data['till']}\n    vistelser.append(vistelse)\n    return vistelse, 201\n",
    hints: [
      "@app.post('/hundar/<int:id>/vistelser')",
      "'hund_id': id",
      'return vistelse, 201',
    ],
    tests: [
      {
        description: 'Saga bokar',
        code: "__post('/hundar/2/vistelser', {'fran': '2026-07-01', 'till': '2026-07-03'}).json",
        expected: { id: 2, hund_id: 2, fran: '2026-07-01', till: '2026-07-03' },
        inputs: [],
      },
      {
        description: 'Hund 9',
        code: "__post('/hundar/9/vistelser', {'fran': 'a', 'till': 'b'}).status",
        expected: 404,
        inputs: [],
      },
    ],
    request: {
      method: 'POST',
      path: '/hundar/2/vistelser',
      body: '{"fran": "2026-07-01", "till": "2026-07-03"}',
    },
  },
];
