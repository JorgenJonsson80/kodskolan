// Bana 9: formulär. request.form, redirect, url_for och POST/Redirect/GET.

export const FORMULAR = [
  {
    id: 'formular-01',
    track: 'formular',
    title: 'Läs ett formulär',
    xp: 10,
    description:
      'Ett HTML-formulär skickar fälten med POST. `request.form` läser dem.',
    explain:
      '`<input name="namn">` skickas som `namn=Ada`. I Flask: `request.form[\'namn\']`.\n\nI 📮 väljer du POST och **Formulär**, och skriver `namn=Ada`.',
    example: "stad = request.form['stad']",
    task: "Uppgift: Skapa `@app.post('/hej')` som svarar `f'Hej {namn}!'` med namnet från formuläret.",
    starterCode: 'from flask import Flask, request\n\napp = Flask(__name__)\n',
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\n@app.post('/hej')\ndef hej():\n    namn = request.form['namn']\n    return f'Hej {namn}!'\n",
    hints: [
      "@app.post('/hej')",
      "namn = request.form['namn']",
      "return f'Hej {namn}!'",
    ],
    tests: [
      {
        description: 'Ada',
        code: "__post('/hej', form={'namn': 'Ada'}).text",
        expected: 'Hej Ada!',
      },
    ],
    request: { method: 'POST', path: '/hej', kind: 'form', body: 'namn=Ada' },
  },
  {
    id: 'formular-02',
    track: 'formular',
    title: 'Formuläret och svaret',
    xp: 15,
    description:
      'Samma adress visar formuläret med GET och tar emot det med POST.',
    explain:
      'Formuläret behöver en väg som visar det (GET) och en som tar emot det (POST). `<form method="post">` utan `action` skickar till samma adress.',
    example:
      "@app.get('/kontakt')\ndef visa():\n    return FORMULAR\n\n@app.post('/kontakt')\ndef ta_emot():\n    ...",
    task: "Uppgift: Lägg till `@app.get('/hej')` som svarar med `FORMULAR`.",
    starterCode:
      'from flask import Flask, request\n\napp = Flask(__name__)\n\nFORMULAR = \'<form method="post"><input name="namn"><button>Skicka</button></form>\'\n\n\n@app.post(\'/hej\')\ndef hej():\n    return f"Hej {request.form[\'namn\']}!"\n',
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nFORMULAR = '<form method=\"post\"><input name=\"namn\"><button>Skicka</button></form>'\n\n\n@app.get('/hej')\ndef formular():\n    return FORMULAR\n\n\n@app.post('/hej')\ndef hej():\n    return f\"Hej {request.form['namn']}!\"\n",
    hints: [
      "@app.get('/hej')",
      'En ny funktion med eget namn.',
      'return FORMULAR',
    ],
    tests: [
      {
        description: 'GET visar formuläret',
        code: "'<form' in __get('/hej').text",
        expected: true,
      },
      {
        description: 'POST svarar',
        code: "__post('/hej', form={'namn': 'Bo'}).text",
        expected: 'Hej Bo!',
      },
    ],
    request: { path: '/hej' },
  },
  {
    id: 'formular-03',
    track: 'formular',
    title: 'Skicka vidare',
    xp: 15,
    description:
      'Efter ett formulär skickar man besökaren vidare till en ny sida med `redirect`.',
    explain:
      "Annars skickas formuläret en gång till om besökaren laddar om sidan – en beställning kan läggas två gånger.\n\n`redirect(url_for('tack'))` svarar **302** och säger åt webbläsaren att gå till `/tack`. Under 📮 Svaret ser du vart.",
    example: "return redirect(url_for('klart'))",
    task: "Uppgift: Låt `POST /bestall` skicka vidare till `tack` med `redirect(url_for('tack'))`.",
    starterCode:
      "from flask import Flask, redirect, request, url_for\n\napp = Flask(__name__)\n\n@app.get('/tack')\ndef tack():\n    return 'Tack för din beställning!'\n\n\n@app.post('/bestall')\ndef bestall():\n    return 'Tack för din beställning!'\n",
    solution:
      "from flask import Flask, redirect, request, url_for\n\napp = Flask(__name__)\n\n@app.get('/tack')\ndef tack():\n    return 'Tack för din beställning!'\n\n\n@app.post('/bestall')\ndef bestall():\n    return redirect(url_for('tack'))\n",
    hints: [
      'redirect och url_for är redan importerade.',
      "url_for('tack') ger '/tack'.",
      "return redirect(url_for('tack'))",
    ],
    tests: [
      { description: '302', code: "__post('/bestall').status", expected: 302 },
      {
        description: 'Till /tack',
        code: "__post('/bestall').location",
        expected: '/tack',
      },
    ],
    request: { method: 'POST', path: '/bestall', kind: 'form' },
  },
  {
    id: 'formular-04',
    track: 'formular',
    title: 'Post, redirect, get',
    xp: 20,
    description:
      'Gästboken: formuläret sparar och skickar tillbaka till listan.',
    explain:
      'Mönstret heter **POST/Redirect/GET**: POST sparar, redirect skickar vidare, och GET visar resultatet.',
    example:
      "lista.append(request.form['text'])\nreturn redirect(url_for('start'))",
    task: "Uppgift: Skapa `@app.post('/skriv')` som sparar `request.form['text']` i `inlagg` och skickar vidare till `start`.",
    starterCode:
      "from flask import Flask, redirect, request, url_for\n\napp = Flask(__name__)\n\ninlagg = []\n\n\n@app.get('/')\ndef start():\n    return '<br>'.join(inlagg)\n",
    solution:
      "from flask import Flask, redirect, request, url_for\n\napp = Flask(__name__)\n\ninlagg = []\n\n\n@app.get('/')\ndef start():\n    return '<br>'.join(inlagg)\n\n\n@app.post('/skriv')\ndef skriv():\n    inlagg.append(request.form['text'])\n    return redirect(url_for('start'))\n",
    hints: [
      "@app.post('/skriv')",
      "inlagg.append(request.form['text'])",
      "return redirect(url_for('start'))",
    ],
    tests: [
      {
        description: 'Till startsidan',
        code: "__post('/skriv', form={'text': 'Hej'}).location",
        expected: '/',
        inputs: [],
      },
      {
        description: 'Sparas',
        code: "(__post('/skriv', form={'text': 'Hej'}), __post('/skriv', form={'text': 'Då'}), __get('/').text)[-1]",
        expected: 'Hej<br>Då',
        inputs: [],
      },
    ],
    request: { method: 'POST', path: '/skriv', kind: 'form', body: 'text=Hej' },
  },
  {
    id: 'formular-05',
    track: 'formular',
    title: 'Ett tomt fält',
    xp: 15,
    description:
      'Ett tomt namn ska inte sparas. Visa formuläret igen med ett fel, och statuskoden 400.',
    explain:
      "`request.form.get('namn', '').strip()` ger en tom text både när fältet saknas och när det bara är mellanslag.",
    example: "if not text:\n    return FORMULAR + '<p>Skriv något</p>', 400",
    task: "Uppgift: Låt `POST /hej` svara `FORMULAR + '<p>Namn saknas</p>'` med 400 när namnet är tomt.",
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nFORMULAR = '<form method=\"post\"><input name=\"namn\"><button>Skicka</button></form>'\n\n\n@app.post('/hej')\ndef hej():\n    namn = request.form['namn']\n    return f'Hej {namn}!'\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nFORMULAR = '<form method=\"post\"><input name=\"namn\"><button>Skicka</button></form>'\n\n\n@app.post('/hej')\ndef hej():\n    namn = request.form.get('namn', '').strip()\n    if not namn:\n        return FORMULAR + '<p>Namn saknas</p>', 400\n    return f'Hej {namn}!'\n",
    hints: [
      "request.form.get('namn', '').strip()",
      'if not namn:',
      "return FORMULAR + '<p>Namn saknas</p>', 400",
    ],
    tests: [
      {
        description: 'Tomt',
        code: "__post('/hej', form={'namn': '  '}).status",
        expected: 400,
      },
      {
        description: 'Felet syns',
        code: "'Namn saknas' in __post('/hej', form={'namn': ''}).text",
        expected: true,
      },
      {
        description: 'Ada',
        code: "__post('/hej', form={'namn': 'Ada'}).text",
        expected: 'Hej Ada!',
      },
    ],
    request: { method: 'POST', path: '/hej', kind: 'form', body: 'namn=' },
  },
  {
    id: 'formular-06',
    track: 'formular',
    title: 'Ett tal i formuläret',
    xp: 15,
    description:
      'Allt i ett formulär är text. `request.form.get` har också `type=int`.',
    explain:
      "`request.form.get('alder', type=int)` ger ett tal, eller `None` om det inte går. Precis som `request.args`.",
    example: "antal = request.form.get('antal', type=int)",
    task: "Uppgift: Skapa `@app.post('/alder')` som svarar `f'Om ett år är du {alder + 1}'`, eller `'Skriv en ålder'` med 400 om det inte är ett tal.",
    starterCode: 'from flask import Flask, request\n\napp = Flask(__name__)\n',
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\n@app.post('/alder')\ndef alder():\n    alder = request.form.get('alder', type=int)\n    if alder is None:\n        return 'Skriv en ålder', 400\n    return f'Om ett år är du {alder + 1}'\n",
    hints: [
      "request.form.get('alder', type=int)",
      'if alder is None:',
      "return f'Om ett år är du {alder + 1}'",
    ],
    tests: [
      {
        description: '12',
        code: "__post('/alder', form={'alder': '12'}).text",
        expected: 'Om ett år är du 13',
      },
      {
        description: 'tolv',
        code: "__post('/alder', form={'alder': 'tolv'}).status",
        expected: 400,
      },
    ],
    request: { method: 'POST', path: '/alder', kind: 'form', body: 'alder=12' },
  },
  {
    id: 'formular-07',
    track: 'formular',
    title: 'En kryssruta',
    xp: 15,
    description:
      'En kryssruta som inte är ikryssad skickas inte alls. Kolla om namnet finns.',
    explain:
      '`<input type="checkbox" name="nyhetsbrev">` skickar `nyhetsbrev=on` om den är ikryssad, och ingenting annars.\n\n`\'nyhetsbrev\' in request.form` ger alltså sant eller falskt.',
    example: "vill = 'villkor' in request.form",
    task: "Uppgift: Låt `POST /anmal` svara `'Du får nyhetsbrevet'` eller `'Inget nyhetsbrev'` beroende på kryssrutan `nyhetsbrev`.",
    starterCode: 'from flask import Flask, request\n\napp = Flask(__name__)\n',
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\n@app.post('/anmal')\ndef anmal():\n    if 'nyhetsbrev' in request.form:\n        return 'Du får nyhetsbrevet'\n    return 'Inget nyhetsbrev'\n",
    hints: [
      "'nyhetsbrev' in request.form",
      "if … : return 'Du får nyhetsbrevet'",
      "return 'Inget nyhetsbrev'",
    ],
    tests: [
      {
        description: 'Ikryssad',
        code: "__post('/anmal', form={'nyhetsbrev': 'on'}).text",
        expected: 'Du får nyhetsbrevet',
      },
      {
        description: 'Inte ikryssad',
        code: "__post('/anmal', form={}).text",
        expected: 'Inget nyhetsbrev',
      },
    ],
    request: {
      method: 'POST',
      path: '/anmal',
      kind: 'form',
      body: 'nyhetsbrev=on',
    },
  },
  {
    id: 'formular-08',
    track: 'formular',
    title: 'Fel namn på fältet',
    xp: 15,
    description: 'Formuläret svarar 400 Bad Request, fast allt är ifyllt.',
    explain:
      '`request.form[\'name\']` letar efter ett fält som heter `name`, men formuläret skickar `namn`. Då svarar Flask 400 direkt.\n\nJämför `name="…"` i HTML:en med namnet i koden.',
    example: '<input name="epost">  →  request.form[\'epost\']',
    task: 'Uppgift: Laga koden så att den läser rätt fält.',
    starterCode:
      'from flask import Flask, request\n\napp = Flask(__name__)\n\nFORMULAR = \'<form method="post"><input name="namn"><button>Skicka</button></form>\'\n\n\n@app.post(\'/hej\')\ndef hej():\n    return f"Hej {request.form[\'name\']}!"\n',
    solution:
      'from flask import Flask, request\n\napp = Flask(__name__)\n\nFORMULAR = \'<form method="post"><input name="namn"><button>Skicka</button></form>\'\n\n\n@app.post(\'/hej\')\ndef hej():\n    return f"Hej {request.form[\'namn\']}!"\n',
    hints: [
      'Vad heter fältet i FORMULAR?',
      'name="namn"',
      "request.form['namn']",
    ],
    tests: [
      {
        description: 'Ada',
        code: "__post('/hej', form={'namn': 'Ada'}).text",
        expected: 'Hej Ada!',
      },
    ],
    request: { method: 'POST', path: '/hej', kind: 'form', body: 'namn=Ada' },
  },
  {
    id: 'formular-09',
    track: 'formular',
    title: 'En rullista',
    xp: 15,
    description:
      'En `<select>` skickar värdet som är valt. Kolla att det är ett av de tillåtna – vem som helst kan skicka vad som helst.',
    explain:
      'Formuläret har bara tre storlekar att välja på, men ett anrop kan skicka `storlek=jätte` ändå. Kolla alltid mot listan.',
    example: "if farg not in FARGER:\n    return 'Ogiltig färg', 400",
    task: "Uppgift: Låt `POST /bestall` svara `f'Du beställde en {storlek} kaffe'`, eller `'Ogiltig storlek'` med 400 om storleken inte finns i `STORLEKAR`.",
    starterCode:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nSTORLEKAR = ['liten', 'mellan', 'stor']\n",
    solution:
      "from flask import Flask, request\n\napp = Flask(__name__)\n\nSTORLEKAR = ['liten', 'mellan', 'stor']\n\n\n@app.post('/bestall')\ndef bestall():\n    storlek = request.form.get('storlek')\n    if storlek not in STORLEKAR:\n        return 'Ogiltig storlek', 400\n    return f'Du beställde en {storlek} kaffe'\n",
    hints: [
      "storlek = request.form.get('storlek')",
      'if storlek not in STORLEKAR:',
      "return f'Du beställde en {storlek} kaffe'",
    ],
    tests: [
      {
        description: 'mellan',
        code: "__post('/bestall', form={'storlek': 'mellan'}).text",
        expected: 'Du beställde en mellan kaffe',
      },
      {
        description: 'jätte',
        code: "__post('/bestall', form={'storlek': 'jätte'}).status",
        expected: 400,
      },
    ],
    request: {
      method: 'POST',
      path: '/bestall',
      kind: 'form',
      body: 'storlek=mellan',
    },
  },
];
