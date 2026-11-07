// Bana 5: ta emot data. POST, get_json, 201 och 400.

export const SKICKA = [
  {
    id: 'skicka-01',
    track: 'skicka',
    title: '@app.post',
    xp: 10,
    description:
      'GET hämtar. POST skickar något till appen – ett meddelande, en ny hund, en beställning.',
    explain:
      "`@app.post('/meddelande')` tar bara emot POST. Webbläsarens adressfält gör alltid GET, så POST testar du med 📮 (välj POST).\n\nSamma adress kan ha en GET-väg och en POST-väg med olika funktioner.",
    example: "@app.post('/gilla')\ndef gilla():\n    return 'Tack!'",
    task: "Uppgift: Skapa `@app.post('/meddelande')` som svarar `'Tack för ditt meddelande'`.",
    starterCode: 'from flask import Flask, request\n\napp = Flask(__name__)\n',
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\n@app.post('/meddelande')\ndef meddelande():\n    return 'Tack för ditt meddelande'\n",
    hints: [
      "@app.post('/meddelande')",
      'En funktion som returnerar texten.',
      "return 'Tack för ditt meddelande'",
    ],
    tests: [
      {
        description: 'POST',
        code: "__post('/meddelande').text",
        expected: 'Tack för ditt meddelande',
      },
      {
        description: 'GET ger 405',
        code: "__get('/meddelande').status",
        expected: 405,
      },
    ],
    request: { method: 'POST', path: '/meddelande' },
  },
  {
    id: 'skicka-02',
    track: 'skicka',
    title: 'Läs det som skickas',
    xp: 15,
    description:
      'Det som skickas med POST kallas **body**. Är det JSON läser `request.get_json()` det.',
    explain:
      '`request.get_json()` gör om JSON till en dictionary. Skickar någon `{"namn": "Ada"}` blir det `{\'namn\': \'Ada\'}`.\n\nI 📮 skriver du det som skickas i rutan under adressen.',
    example: 'data = request.get_json()\nreturn f"Du skickade {data}"',
    task: "Uppgift: Skapa `@app.post('/hej')` som läser JSON och svarar `f'Hej {namn}!'` med namnet från datan.",
    starterCode: 'from flask import Flask, request\n\napp = Flask(__name__)\n',
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\n@app.post('/hej')\ndef hej():\n    data = request.get_json()\n    return f\"Hej {data['namn']}!\"\n",
    hints: [
      'data = request.get_json()',
      "data['namn']",
      'return f"Hej {data[\'namn\']}!"',
    ],
    tests: [
      {
        description: 'Ada',
        code: "__post('/hej', {'namn': 'Ada'}).text",
        expected: 'Hej Ada!',
      },
    ],
    request: { method: 'POST', path: '/hej', body: '{"namn": "Ada"}' },
  },
  {
    id: 'skicka-03',
    track: 'skicka',
    title: '201 Skapad',
    xp: 15,
    description:
      'När något nytt skapas svarar man **201 Created** och skickar tillbaka det nya.',
    explain:
      'Den nya hunden får ett id av appen – den som skickar vet inte vilka id:n som är tagna. Svaret är hela hunden, så att den som skickade ser vilket id den fick.',
    example:
      "ny = {'id': len(lista) + 1, 'text': data['text']}\nlista.append(ny)\nreturn ny, 201",
    task: "Uppgift: Skapa `@app.post('/hundar')` som lägger till en hund med `namn` från datan och id `len(hundar) + 1`, och svarar med hunden och 201.",
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [{'id': 1, 'namn': 'Bamse'}]\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [{'id': 1, 'namn': 'Bamse'}]\n\n\n@app.post('/hundar')\ndef ny_hund():\n    data = request.get_json()\n    hund = {'id': len(hundar) + 1, 'namn': data['namn']}\n    hundar.append(hund)\n    return hund, 201\n",
    hints: [
      'data = request.get_json()',
      "hund = {'id': len(hundar) + 1, 'namn': data['namn']}",
      'hundar.append(hund)\n    return hund, 201',
    ],
    tests: [
      {
        description: 'Svaret',
        code: "__post('/hundar', {'namn': 'Saga'}).json",
        expected: { id: 2, namn: 'Saga' },
        inputs: [],
      },
      {
        description: '201',
        code: "__post('/hundar', {'namn': 'Saga'}).status",
        expected: 201,
        inputs: [],
      },
      {
        description: 'Hunden sparas',
        code: "(__post('/hundar', {'namn': 'Saga'}), len(hundar))[-1]",
        expected: 2,
        inputs: [],
      },
    ],
    request: { method: 'POST', path: '/hundar', body: '{"namn": "Saga"}' },
  },
  {
    id: 'skicka-04',
    track: 'skicka',
    title: 'Säg ifrån',
    xp: 15,
    description:
      'Skickar någon en hund utan namn ska appen svara 400, inte krascha.',
    explain:
      "Lita aldrig på det som skickas in. Kolla att det som behövs finns, och svara **400** med ett tydligt fel annars.\n\n`data.get('namn')` ger `None` i stället för en krasch när namnet saknas.",
    example:
      "if not data.get('titel'):\n    return {'fel': 'titel saknas'}, 400",
    task: "Uppgift: Laga `ny_hund` så att en hund utan `namn` (eller med ett tomt namn) ger `{'fel': 'namn saknas'}` med 400.",
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [{'id': 1, 'namn': 'Bamse'}]\n\n\n@app.post('/hundar')\ndef ny_hund():\n    data = request.get_json()\n    hund = {'id': len(hundar) + 1, 'namn': data['namn']}\n    hundar.append(hund)\n    return hund, 201\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [{'id': 1, 'namn': 'Bamse'}]\n\n\n@app.post('/hundar')\ndef ny_hund():\n    data = request.get_json()\n    if not data.get('namn'):\n        return {'fel': 'namn saknas'}, 400\n    hund = {'id': len(hundar) + 1, 'namn': data['namn']}\n    hundar.append(hund)\n    return hund, 201\n",
    hints: [
      'Kolla namnet innan hunden skapas.',
      "if not data.get('namn'):",
      "return {'fel': 'namn saknas'}, 400",
    ],
    tests: [
      {
        description: 'Utan namn',
        code: "__post('/hundar', {'ras': 'tax'}).status",
        expected: 400,
        inputs: [],
      },
      {
        description: 'Felet',
        code: "__post('/hundar', {'namn': ''}).json",
        expected: { fel: 'namn saknas' },
        inputs: [],
      },
      {
        description: 'Med namn',
        code: "__post('/hundar', {'namn': 'Saga'}).status",
        expected: 201,
        inputs: [],
      },
      {
        description: 'Ingen ny hund vid fel',
        code: "(__post('/hundar', {}), len(hundar))[-1]",
        expected: 1,
        inputs: [],
      },
    ],
    request: { method: 'POST', path: '/hundar', body: '{"ras": "tax"}' },
  },
  {
    id: 'skicka-05',
    track: 'skicka',
    title: 'Rätt typ',
    xp: 15,
    description: 'Åldern ska vara ett tal. `"fem"` ska ge 400.',
    explain:
      'JSON kan innehålla text, tal, sant/falskt och listor. `isinstance(alder, int)` kollar att det är ett heltal.\n\nKolla allt som ska användas: att det finns och att det har rätt typ.',
    example:
      "if not isinstance(data.get('pris'), int):\n    return {'fel': 'pris ska vara ett heltal'}, 400",
    task: "Uppgift: Skapa `@app.post('/alder')` som svarar `{'om_ett_ar': alder + 1}`, eller `{'fel': 'alder ska vara ett heltal'}` med 400.",
    starterCode: 'from flask import Flask, request\n\napp = Flask(__name__)\n',
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\n@app.post('/alder')\ndef alder():\n    data = request.get_json()\n    alder = data.get('alder')\n    if not isinstance(alder, int):\n        return {'fel': 'alder ska vara ett heltal'}, 400\n    return {'om_ett_ar': alder + 1}\n",
    hints: [
      "alder = data.get('alder')",
      'isinstance(alder, int)',
      "return {'om_ett_ar': alder + 1}",
    ],
    tests: [
      {
        description: '4',
        code: "__post('/alder', {'alder': 4}).json",
        expected: { om_ett_ar: 5 },
      },
      {
        description: '"fem"',
        code: "__post('/alder', {'alder': 'fem'}).status",
        expected: 400,
      },
      {
        description: 'Saknas',
        code: "__post('/alder', {}).status",
        expected: 400,
      },
    ],
    request: { method: 'POST', path: '/alder', body: '{"alder": 4}' },
  },
  {
    id: 'skicka-06',
    track: 'skicka',
    title: 'GET och POST på samma adress',
    xp: 15,
    description:
      '`/hundar` med GET ger listan, med POST lägger den till. Två funktioner, samma adress.',
    explain:
      'Det är så de flesta API:er ser ut: adressen säger *vad* (hundarna), och metoden säger *vad man vill göra* (hämta eller lägga till).',
    example:
      "@app.get('/lappar')\ndef lappar():\n    ...\n\n@app.post('/lappar')\ndef ny_lapp():\n    ...",
    task: "Uppgift: Lägg till `@app.get('/hundar')` som svarar med listan.",
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [{'id': 1, 'namn': 'Bamse'}]\n\n\n@app.post('/hundar')\ndef ny_hund():\n    data = request.get_json()\n    hund = {'id': len(hundar) + 1, 'namn': data['namn']}\n    hundar.append(hund)\n    return hund, 201\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [{'id': 1, 'namn': 'Bamse'}]\n\n\n@app.get('/hundar')\ndef lista():\n    return hundar\n\n\n@app.post('/hundar')\ndef ny_hund():\n    data = request.get_json()\n    hund = {'id': len(hundar) + 1, 'namn': data['namn']}\n    hundar.append(hund)\n    return hund, 201\n",
    hints: [
      'En väg till med @app.get.',
      'Funktionen behöver ett eget namn.',
      "@app.get('/hundar')\ndef lista():\n    return hundar",
    ],
    tests: [
      {
        description: 'GET',
        code: "__get('/hundar').json",
        expected: [{ id: 1, namn: 'Bamse' }],
        inputs: [],
      },
      {
        description: 'POST och sedan GET',
        code: "(__post('/hundar', {'namn': 'Saga'}), __get('/hundar').json)[-1]",
        expected: [
          { id: 1, namn: 'Bamse' },
          { id: 2, namn: 'Saga' },
        ],
        inputs: [],
      },
    ],
    request: { path: '/hundar' },
  },
  {
    id: 'skicka-07',
    track: 'skicka',
    title: 'Nästa id',
    xp: 15,
    description:
      '`len(hundar) + 1` blir fel om en hund tagits bort. Använd det högsta id:t i stället.',
    explain:
      "Om hund 1 tas bort har listan en hund med id 2. Då ger `len + 1` id 2 igen – två hundar med samma id.\n\n`max(h['id'] for h in hundar) + 1` ger alltid ett nytt id. `default=0` gör att det fungerar för en tom lista.",
    example: "nytt_id = max((v['id'] for v in varor), default=0) + 1",
    task: 'Uppgift: Laga `ny_hund` så att id:t är ett mer än det högsta som finns (1 för en tom lista).',
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [{'id': 2, 'namn': 'Saga'}]\n\n\n@app.post('/hundar')\ndef ny_hund():\n    data = request.get_json()\n    hund = {'id': len(hundar) + 1, 'namn': data['namn']}\n    hundar.append(hund)\n    return hund, 201\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nhundar = [{'id': 2, 'namn': 'Saga'}]\n\n\n@app.post('/hundar')\ndef ny_hund():\n    data = request.get_json()\n    nytt_id = max((h['id'] for h in hundar), default=0) + 1\n    hund = {'id': nytt_id, 'namn': data['namn']}\n    hundar.append(hund)\n    return hund, 201\n",
    hints: [
      'Vilket id får nästa hund nu?',
      'max(… for h in hundar)',
      "max((h['id'] for h in hundar), default=0) + 1",
    ],
    tests: [
      {
        description: 'Nästa id är 3',
        code: "__post('/hundar', {'namn': 'Rufus'}).json['id']",
        expected: 3,
        inputs: [],
      },
      {
        description: 'Tom lista',
        code: "(hundar.clear(), __post('/hundar', {'namn': 'Ada'}).json['id'])[-1]",
        expected: 1,
        inputs: [],
      },
    ],
    request: { method: 'POST', path: '/hundar', body: '{"namn": "Rufus"}' },
  },
  {
    id: 'skicka-08',
    track: 'skicka',
    title: 'Inte JSON',
    xp: 20,
    description:
      'Skickar någon ett formulär i stället för JSON svarar appen **415**. Den ska svara 400 med ett fel.',
    explain:
      '`request.get_json()` vägrar läsa något som inte är JSON och avbryter med 415 Unsupported Media Type. Med `silent=True` ger den `None` i stället, och då kan du svara själv.',
    example:
      "data = request.get_json(silent=True)\nif data is None:\n    return {'fel': 'Skicka JSON'}, 400",
    task: "Uppgift: Laga `/hej` så att något som inte är JSON ger `{'fel': 'Skicka JSON'}` med 400. Prova med 📮 och Formulär.",
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\n@app.post('/hej')\ndef hej():\n    data = request.get_json()\n    return f\"Hej {data['namn']}!\"\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\n@app.post('/hej')\ndef hej():\n    data = request.get_json(silent=True)\n    if data is None:\n        return {'fel': 'Skicka JSON'}, 400\n    return f\"Hej {data['namn']}!\"\n",
    hints: [
      'get_json(silent=True)',
      'if data is None:',
      "return {'fel': 'Skicka JSON'}, 400",
    ],
    tests: [
      {
        description: 'Ett formulär',
        code: "__post('/hej', form={'namn': 'Ada'}).status",
        expected: 400,
      },
      {
        description: 'Felet',
        code: "__post('/hej', form={'namn': 'Ada'}).json",
        expected: { fel: 'Skicka JSON' },
      },
      {
        description: 'JSON fungerar',
        code: "__post('/hej', {'namn': 'Ada'}).text",
        expected: 'Hej Ada!',
      },
    ],
    request: { method: 'POST', path: '/hej', kind: 'form', body: 'namn=Ada' },
  },
  {
    id: 'skicka-09',
    track: 'skicka',
    title: 'Räkna på det som skickas',
    xp: 15,
    description:
      'POST kan också användas för att skicka data som ska räknas på.',
    explain:
      'Ibland är det enklare att skicka en lista i en body än att stoppa den i adressen. Kolla att det verkligen är en lista med tal.',
    example:
      "tal = data.get('tal')\nif not isinstance(tal, list):\n    return {'fel': 'tal ska vara en lista'}, 400",
    task: "Uppgift: Skapa `@app.post('/summa')` som tar `{'tal': [1, 2, 3]}` och svarar `{'summa': 6}`. Om `tal` inte är en lista blir det 400 med `{'fel': 'tal ska vara en lista'}`.",
    starterCode: 'from flask import Flask, request\n\napp = Flask(__name__)\n',
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\n@app.post('/summa')\ndef summa():\n    data = request.get_json()\n    tal = data.get('tal')\n    if not isinstance(tal, list):\n        return {'fel': 'tal ska vara en lista'}, 400\n    return {'summa': sum(tal)}\n",
    hints: [
      "tal = data.get('tal')",
      'isinstance(tal, list)',
      "return {'summa': sum(tal)}",
    ],
    tests: [
      {
        description: '1, 2, 3',
        code: "__post('/summa', {'tal': [1, 2, 3]}).json",
        expected: { summa: 6 },
      },
      {
        description: 'Inte en lista',
        code: "__post('/summa', {'tal': 5}).status",
        expected: 400,
      },
    ],
    request: { method: 'POST', path: '/summa', body: '{"tal": [1, 2, 3]}' },
  },
];
