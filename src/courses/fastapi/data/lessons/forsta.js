// Bana 1: första API:et. Eleven kan Python (Python-kursen), men har aldrig
// byggt något för webben. Bara GET och svar som dict, list och text här –
// adressvariabler kommer i bana 2.

const IMPORT = 'from fastapi import FastAPI\n\napp = FastAPI()\n';

export const FORSTA = [
  {
    id: 'fa-forsta-01',
    track: 'forsta',
    title: 'Hej, API!',
    xp: 10,
    description:
      'Ett API är en app som andra program pratar med. Med FastAPI räcker det med några rader.',
    explain:
      "`app = FastAPI()` skapar appen. `@app.get('/')` säger att funktionen under ska köras när någon frågar efter adressen `/`. Det funktionen returnerar är svaret.\n\nReturnerar du en **dict** gör FastAPI om den till **JSON** – formatet som appar och sajter skickar data i.\n\nI Kodskolan startas ingen riktig server. Appen anropas direkt, och svaret visas under **📮 Svaret** när du kört koden.",
    example:
      "from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get('/')\ndef start():\n    return {'meddelande': 'Välkommen!'}",
    task: "Uppgift: Gör så att `/` svarar `{'meddelande': 'Hej, API!'}`.",
    starterCode: `${IMPORT}\n# Skriv vägen här\n`,
    solution: `${IMPORT}\n\n@app.get('/')\ndef start():\n    return {'meddelande': 'Hej, API!'}\n`,
    hints: [
      "Raden före funktionen: @app.get('/')",
      'Funktionen returnerar en dict med nyckeln meddelande.',
      "@app.get('/')\ndef start():\n    return {'meddelande': 'Hej, API!'}",
    ],
    tests: [
      {
        description: "/ svarar {'meddelande': 'Hej, API!'}",
        code: "__get('/').json",
        expected: { meddelande: 'Hej, API!' },
      },
    ],
  },
  {
    id: 'fa-forsta-02',
    track: 'forsta',
    title: 'Statuskoden',
    xp: 10,
    description:
      'Varje svar har en statuskod: ett tal som säger hur det gick. 200 betyder att allt gick bra.',
    explain:
      'Ett program skickar ett **anrop** (request), och API:et skickar tillbaka ett **svar** (response). Svaret har en statuskod och ett innehåll.\n\nDe vanligaste:\n- `200` – OK\n- `404` – finns inte\n- `500` – appen kraschade\n\nFastAPI sätter `200` själv när funktionen returnerar något. Statuskoden står först under 📮 Svaret.',
    example: "@app.get('/ping')\ndef ping():\n    return {'svar': 'pong'}",
    task: "Uppgift: Skapa vägen `/status` som svarar `{'status': 'ok'}`. Ändra adressen i 📮 till `/status` och kör koden för att se svaret.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n\n@app.get('/status')\ndef status():\n    return {'status': 'ok'}\n`,
    hints: [
      "@app.get('/status')",
      'Funktionen kan heta status.',
      "return {'status': 'ok'}",
    ],
    tests: [
      {
        description: '/status ger 200',
        code: "__get('/status').status",
        expected: 200,
      },
      {
        description: "/status svarar {'status': 'ok'}",
        code: "__get('/status').json",
        expected: { status: 'ok' },
      },
    ],
    request: { path: '/status' },
  },
  {
    id: 'fa-forsta-03',
    track: 'forsta',
    title: 'Flera vägar',
    xp: 10,
    description:
      'Ett API kan ha hur många vägar som helst. Varje väg får sin egen funktion.',
    explain:
      'Varje adress får en egen `@app.get` och en egen funktion. Ge funktionerna olika namn, annars skriver den andra över den första.\n\nEn sådan funktion kallas en **vägfunktion**. Under svaret står alla vägar appen har.',
    example:
      "@app.get('/')\ndef start():\n    return {'sida': 'start'}\n\n@app.get('/hjalp')\ndef hjalp():\n    return {'sida': 'hjälp'}",
    task: "Uppgift: `/` ska svara `{'namn': 'Bokhyllan'}` och `/om` ska svara `{'version': 1, 'skapare': 'Kodskolan'}`.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n\n@app.get('/')\ndef start():\n    return {'namn': 'Bokhyllan'}\n\n\n@app.get('/om')\ndef om():\n    return {'version': 1, 'skapare': 'Kodskolan'}\n`,
    hints: [
      "Två vägar: @app.get('/') och @app.get('/om').",
      'Ge funktionerna olika namn, t.ex. start och om.',
      "@app.get('/om')\ndef om():\n    return {'version': 1, 'skapare': 'Kodskolan'}",
    ],
    tests: [
      {
        description: '/ svarar med namnet',
        code: "__get('/').json",
        expected: { namn: 'Bokhyllan' },
      },
      {
        description: '/om svarar med version och skapare',
        code: "__get('/om').json",
        expected: { version: 1, skapare: 'Kodskolan' },
      },
    ],
    request: { path: '/om' },
  },
  {
    id: 'fa-forsta-04',
    track: 'forsta',
    title: 'En lista som svar',
    xp: 10,
    description:
      'Ett API skickar ofta många saker på en gång, till exempel alla böcker eller alla varor.',
    explain:
      'En **lista** blir också JSON. I JSON skrivs den med hakparenteser, precis som i Python: `["äpple", "banan"]`.\n\nJSON har några små skillnader mot Python: text står alltid inom `"`, och `True` skrivs `true`. FastAPI sköter det åt dig.',
    example:
      "@app.get('/farger')\ndef farger():\n    return ['röd', 'grön', 'blå']",
    task: "Uppgift: `/frukter` ska svara med listan `['äpple', 'banan', 'päron']`.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n\n@app.get('/frukter')\ndef frukter():\n    return ['äpple', 'banan', 'päron']\n`,
    hints: [
      "@app.get('/frukter')",
      'Funktionen returnerar en lista i stället för en dict.',
      "return ['äpple', 'banan', 'päron']",
    ],
    tests: [
      {
        description: '/frukter svarar med tre frukter',
        code: "__get('/frukter').json",
        expected: ['äpple', 'banan', 'päron'],
      },
    ],
    request: { path: '/frukter' },
  },
  {
    id: 'fa-forsta-05',
    track: 'forsta',
    title: 'Allt blir JSON',
    xp: 10,
    description:
      'Vad händer om en vägfunktion bara returnerar en text eller ett tal?',
    explain:
      'FastAPI svarar **alltid** med JSON. En text blir en JSON-text: `"Hej"` med citattecken. Ett tal blir ett tal, och `True` blir `true`.\n\nTypen står i svarets **content-type**: `application/json`. Det är så programmet som anropar vet hur svaret ska läsas.\n\nListor och dicts kan innehålla allt det här, och andra listor och dicts.',
    example:
      "@app.get('/svar')\ndef svar():\n    return {'text': 'Hej', 'tal': 42, 'klar': True, 'lista': [1, 2]}",
    task: "Uppgift: `/text` ska svara med texten `'Hej'`, och `/tal` med talet `42`.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n\n@app.get('/text')\ndef text():\n    return 'Hej'\n\n\n@app.get('/tal')\ndef tal():\n    return 42\n`,
    hints: [
      'Två vägar: /text och /tal.',
      "return 'Hej' fungerar – FastAPI gör om det till JSON.",
      "@app.get('/tal')\ndef tal():\n    return 42",
    ],
    tests: [
      {
        description: "/text svarar 'Hej'",
        code: "__get('/text').json",
        expected: 'Hej',
      },
      {
        description: '/text skickas som JSON',
        code: "__get('/text').typ",
        expected: 'application/json',
      },
      {
        description: '/tal svarar 42',
        code: "__get('/tal').json",
        expected: 42,
      },
    ],
    request: { path: '/text' },
  },
  {
    id: 'fa-forsta-06',
    track: 'forsta',
    title: 'Data utanför funktionen',
    xp: 15,
    description:
      'Datan behöver inte stå inne i vägfunktionen. Den kan ligga i en variabel som flera vägar delar.',
    explain:
      'Ett API visar oftast data som finns någon annanstans – i en databas, eller som här, i en variabel högst upp i filen.\n\nFlera vägar kan läsa samma variabel. Ändrar du datan ändras svaret från alla vägar som använder den.\n\nNamn med stora bokstäver, som `MENY`, betyder i Python att värdet inte ska ändras.',
    example:
      "BOCKER = ['Pippi', 'Emil']\n\n@app.get('/bocker')\ndef bocker():\n    return BOCKER\n\n@app.get('/antal')\ndef antal():\n    return {'antal': len(BOCKER)}",
    task: "Uppgift: `MENY` finns redan. `/meny` ska svara med hela menyn, och `/antal` med `{'antal': 3}` – räkna ut talet med `len`.",
    starterCode: `${IMPORT}\nMENY = [\n    {'namn': 'Kaffe', 'pris': 30},\n    {'namn': 'Te', 'pris': 25},\n    {'namn': 'Bulle', 'pris': 35},\n]\n`,
    solution: `${IMPORT}\nMENY = [\n    {'namn': 'Kaffe', 'pris': 30},\n    {'namn': 'Te', 'pris': 25},\n    {'namn': 'Bulle', 'pris': 35},\n]\n\n\n@app.get('/meny')\ndef meny():\n    return MENY\n\n\n@app.get('/antal')\ndef antal():\n    return {'antal': len(MENY)}\n`,
    hints: [
      '/meny returnerar MENY som den är.',
      'len(MENY) ger antalet saker i listan.',
      "@app.get('/antal')\ndef antal():\n    return {'antal': len(MENY)}",
    ],
    tests: [
      {
        description: '/meny svarar med menyn',
        code: "__get('/meny').json[0]",
        expected: { namn: 'Kaffe', pris: 30 },
      },
      {
        description: '/meny har tre saker',
        code: "len(__get('/meny').json)",
        expected: 3,
      },
      {
        description: "/antal svarar {'antal': 3}",
        code: "__get('/antal').json",
        expected: { antal: 3 },
      },
      {
        description: '/antal räknar menyn, även när den ändras',
        code: "(MENY.append({'namn': 'Saft', 'pris': 15}), __get('/antal').json)[1]",
        expected: { antal: 4 },
      },
    ],
    request: { path: '/meny' },
  },
  {
    id: 'fa-forsta-07',
    track: 'forsta',
    title: 'Räkna i vägen',
    xp: 15,
    description:
      'En vägfunktion är en vanlig Python-funktion. Den kan räkna, loopa och välja innan den svarar.',
    explain:
      'Allt du kan i Python fungerar i en vägfunktion. Ett API räknar ofta ut något åt den som frågar: en summa, ett medelvärde, det billigaste.\n\nSkriv uträkningen som vanligt och returnera resultatet i en dict, så att svaret har ett namn.',
    example:
      "PRISER = [30, 25, 35]\n\n@app.get('/dyrast')\ndef dyrast():\n    return {'pris': max(PRISER)}",
    task: "Uppgift: `/statistik` ska svara med `summa`, `billigast` och `snitt` för `PRISER`. Med priserna i startkoden blir det `{'summa': 90, 'billigast': 25, 'snitt': 30.0}`.",
    starterCode: `${IMPORT}\nPRISER = [30, 25, 35]\n`,
    solution: `${IMPORT}\nPRISER = [30, 25, 35]\n\n\n@app.get('/statistik')\ndef statistik():\n    summa = sum(PRISER)\n    return {\n        'summa': summa,\n        'billigast': min(PRISER),\n        'snitt': summa / len(PRISER),\n    }\n`,
    hints: [
      'sum, min och len finns inbyggda i Python.',
      'Snittet är summan delad med antalet.',
      "return {'summa': sum(PRISER), 'billigast': min(PRISER), 'snitt': sum(PRISER) / len(PRISER)}",
    ],
    tests: [
      {
        description: '/statistik svarar rätt',
        code: "__get('/statistik').json",
        expected: { summa: 90, billigast: 25, snitt: 30.0 },
      },
      {
        description: 'Räknar med priserna, inte med fasta tal',
        code: "(PRISER.append(10), __get('/statistik').json)[1]",
        expected: { summa: 100, billigast: 10, snitt: 25.0 },
      },
    ],
    request: { path: '/statistik' },
  },
  {
    id: 'fa-forsta-08',
    track: 'forsta',
    title: 'GET och andra metoder',
    xp: 15,
    description:
      'Ett anrop har en metod. GET betyder "hämta". Vad händer med en metod som vägen inte tar emot?',
    explain:
      'Varje anrop har en **metod** som säger vad den som frågar vill göra:\n- `GET` – hämta\n- `POST` – skicka något nytt\n- `PUT`, `PATCH`, `DELETE` – ändra och ta bort\n\n`@app.get` tar bara emot GET. Får vägen en annan metod svarar FastAPI `405` (fel metod). Finns adressen inte alls blir det `404`.\n\nProva själv: byt metod i 📮 till POST och kör koden.',
    example: "@app.get('/tid')\ndef tid():\n    return {'klocka': '12:00'}",
    task: "Uppgift: Gör vägen `/ping` som svarar `{'svar': 'pong'}`. Testerna kollar också att POST till `/ping` ger 405 och att `/pong` ger 404.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n\n@app.get('/ping')\ndef ping():\n    return {'svar': 'pong'}\n`,
    hints: [
      "@app.get('/ping')",
      'Du behöver inte skriva något för 404 och 405 – FastAPI gör det själv.',
      "@app.get('/ping')\ndef ping():\n    return {'svar': 'pong'}",
    ],
    tests: [
      {
        description: "GET /ping svarar {'svar': 'pong'}",
        code: "__get('/ping').json",
        expected: { svar: 'pong' },
      },
      {
        description: 'POST /ping ger 405',
        code: "__post('/ping').status",
        expected: 405,
      },
      {
        description: '/pong ger 404',
        code: "__get('/pong').status",
        expected: 404,
      },
    ],
    request: { method: 'POST', path: '/ping' },
  },
  {
    id: 'fa-forsta-09',
    track: 'forsta',
    title: 'Dokumentationen',
    xp: 15,
    description:
      'FastAPI skriver dokumentationen åt dig. Den som ska använda ditt API kan läsa allt på /docs.',
    explain:
      "FastAPI läser dina vägar och skapar en beskrivning av API:et i formatet **OpenAPI**. I en riktig app visas den som en sida på `/docs`, där man kan prova vägarna direkt.\n\nGe appen ett namn och en beskrivning när du skapar den:\n\n`app = FastAPI(title='Glassbaren', description='Smaker och priser')`\n\nEn **docstring** – en text inom `\"\"\"` först i funktionen – blir vägens beskrivning i dokumentationen.",
    example:
      "app = FastAPI(title='Väder', description='Dagens väder')\n\n@app.get('/idag')\ndef idag():\n    \"\"\"Vädret just nu.\"\"\"\n    return {'grader': 18}",
    task: "Uppgift: Ge appen titeln `'Glassbaren'` och beskrivningen `'Smaker och priser'`. Gör sedan vägen `/smaker` som svarar `['vanilj', 'choklad', 'jordgubb']`, med docstringen `\"\"\"Alla smaker i dag.\"\"\"`.",
    starterCode: IMPORT,
    solution:
      "from fastapi import FastAPI\n\napp = FastAPI(title='Glassbaren', description='Smaker och priser')\n\n\n@app.get('/smaker')\ndef smaker():\n    \"\"\"Alla smaker i dag.\"\"\"\n    return ['vanilj', 'choklad', 'jordgubb']\n",
    hints: [
      "FastAPI(title='Glassbaren', description='Smaker och priser')",
      'Docstringen står på första raden i funktionen, inom tre citattecken.',
      "@app.get('/smaker')\ndef smaker():\n    \"\"\"Alla smaker i dag.\"\"\"\n    return ['vanilj', 'choklad', 'jordgubb']",
    ],
    tests: [
      {
        description: 'Appen heter Glassbaren',
        code: "__openapi()['info']['title']",
        expected: 'Glassbaren',
      },
      {
        description: 'Appen har en beskrivning',
        code: "__openapi()['info'].get('description')",
        expected: 'Smaker och priser',
      },
      {
        description: '/smaker svarar med smakerna',
        code: "__get('/smaker').json",
        expected: ['vanilj', 'choklad', 'jordgubb'],
      },
      {
        description: '/smaker är beskriven i dokumentationen',
        code: "__openapi()['paths']['/smaker']['get'].get('description')",
        expected: 'Alla smaker i dag.',
      },
    ],
    request: { path: '/smaker' },
  },
];
