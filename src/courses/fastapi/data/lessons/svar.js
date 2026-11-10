// Bana 5: svar och fel. Rätt statuskod (201, 404, 409, 400), HTTPException
// och response_model, som bestämmer vad som skickas tillbaka.

const IMPORT =
  'from fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel\n\napp = FastAPI()\n';

const HUNDAR = `HUNDAR = [
    {'id': 1, 'namn': 'Bamse', 'alder': 3},
    {'id': 2, 'namn': 'Saga', 'alder': 1},
]
`;

export const SVAR = [
  {
    id: 'fa-svar-01',
    track: 'svar',
    title: '201 Skapad',
    xp: 15,
    description:
      'När något nytt skapas ska svaret säga det: 201 Created, i stället för 200 OK.',
    explain:
      "Statuskoden sätts i dekoratorn:\n\n`@app.post('/hundar', status_code=201)`\n\nDen som anropar ser då direkt att något skapades. Det är en vanlig regel för API:er:\n- `200` – OK, här är det du bad om\n- `201` – skapad",
    example:
      "@app.post('/bocker', status_code=201)\ndef ny_bok(bok: Bok):\n    return bok",
    task: 'Uppgift: `POST /hundar` finns redan. Gör så att den svarar 201.',
    starterCode: `${IMPORT}\n\nclass Hund(BaseModel):\n    namn: str\n\n\n@app.post('/hundar')\ndef ny_hund(hund: Hund):\n    return hund\n`,
    solution: `${IMPORT}\n\nclass Hund(BaseModel):\n    namn: str\n\n\n@app.post('/hundar', status_code=201)\ndef ny_hund(hund: Hund):\n    return hund\n`,
    hints: [
      'Ändra bara dekoratorn.',
      'status_code=201',
      "@app.post('/hundar', status_code=201)",
    ],
    tests: [
      {
        description: 'POST /hundar ger 201',
        code: "__post('/hundar', {'namn': 'Bamse'}).status",
        expected: 201,
      },
      {
        description: 'Svaret är hunden',
        code: "__post('/hundar', {'namn': 'Bamse'}).json",
        expected: { namn: 'Bamse' },
      },
    ],
    request: { method: 'POST', path: '/hundar', body: '{"namn": "Bamse"}' },
  },
  {
    id: 'fa-svar-02',
    track: 'svar',
    title: '404 med HTTPException',
    xp: 15,
    description:
      'Finns inte det som efterfrågas ska svaret vara 404 – inte 200 med ett felmeddelande.',
    explain:
      "`raise HTTPException(status_code=404, detail='Hunden finns inte')` stoppar funktionen direkt och svarar:\n\n`404` med `{'detail': 'Hunden finns inte'}`\n\nI bana 2 svarade vi `{'fel': …}` med 200. Det ser rätt ut för en människa, men ett program som anropar tror att allt gick bra. Statuskoden är det program läser först.",
    example:
      "@app.get('/bocker/{id}')\ndef bok(id: int):\n    if id not in BOCKER:\n        raise HTTPException(status_code=404, detail='Boken finns inte')\n    return BOCKER[id]",
    task: "Uppgift: `/hundar/{id}` ska svara med hunden, eller 404 med `detail` `'Hunden finns inte'`.",
    starterCode: `${IMPORT}\n${HUNDAR}`,
    solution: `${IMPORT}\n${HUNDAR}\n\n@app.get('/hundar/{id}')\ndef en_hund(id: int):\n    for hund in HUNDAR:\n        if hund['id'] == id:\n            return hund\n    raise HTTPException(status_code=404, detail='Hunden finns inte')\n`,
    hints: [
      'Loopa och returnera hunden när id stämmer.',
      'Efter loopen har ingen hund hittats.',
      "raise HTTPException(status_code=404, detail='Hunden finns inte')",
    ],
    tests: [
      {
        description: '/hundar/2',
        code: "__get('/hundar/2').json['namn']",
        expected: 'Saga',
      },
      {
        description: '/hundar/9 ger 404',
        code: "__get('/hundar/9').status",
        expected: 404,
      },
      {
        description: 'Med rätt detail',
        code: "__get('/hundar/9').json",
        expected: { detail: 'Hunden finns inte' },
      },
    ],
    request: { path: '/hundar/9' },
  },
  {
    id: 'fa-svar-03',
    track: 'svar',
    title: 'En hjälpfunktion som stoppar',
    xp: 20,
    description:
      'Flera vägar behöver hitta en hund eller svara 404. Skriv det en gång.',
    explain:
      '`raise` fungerar i vilken funktion som helst, inte bara i vägfunktionen. Felet går hela vägen upp, och FastAPI svarar 404.\n\nSå kan en hjälpfunktion `hitta(id)` användas av alla vägar som behöver en hund.',
    example:
      "def hitta(id):\n    if id not in BOCKER:\n        raise HTTPException(status_code=404, detail='Boken finns inte')\n    return BOCKER[id]",
    task: 'Uppgift: Skriv `hitta(id)` som ger hunden eller gör raise med 404. Använd den i `/hundar/{id}` och `/hundar/{id}/namn` (som svarar med bara namnet).',
    starterCode: `${IMPORT}\n${HUNDAR}`,
    solution: `${IMPORT}\n${HUNDAR}\n\ndef hitta(id):\n    for hund in HUNDAR:\n        if hund['id'] == id:\n            return hund\n    raise HTTPException(status_code=404, detail='Hunden finns inte')\n\n\n@app.get('/hundar/{id}')\ndef en_hund(id: int):\n    return hitta(id)\n\n\n@app.get('/hundar/{id}/namn')\ndef namn(id: int):\n    return hitta(id)['namn']\n`,
    hints: [
      'def hitta(id): – samma loop som förra övningen.',
      'Vägarna anropar bara hitta(id).',
      "@app.get('/hundar/{id}/namn')\ndef namn(id: int):\n    return hitta(id)['namn']",
    ],
    tests: [
      {
        description: '/hundar/1',
        code: "__get('/hundar/1').json['namn']",
        expected: 'Bamse',
      },
      {
        description: '/hundar/2/namn',
        code: "__get('/hundar/2/namn').json",
        expected: 'Saga',
      },
      {
        description: '/hundar/9/namn ger 404',
        code: "__get('/hundar/9/namn').status",
        expected: 404,
      },
      {
        description: 'hitta(9) gör raise',
        code: '__raises(hitta, 9)',
        expected: 'HTTPException',
      },
    ],
    request: { path: '/hundar/9/namn' },
  },
  {
    id: 'fa-svar-04',
    track: 'svar',
    title: '409 Krock',
    xp: 20,
    description:
      'Ibland går det inte att skapa något, för att det redan finns. Då svarar man 409 Conflict.',
    explain:
      "`409` betyder att anropet krockar med något som redan finns – ett användarnamn som är taget, en tid som är bokad.\n\nKolla först, och gör raise innan något sparas:\n\n```\nif namn in TAGNA:\n    raise HTTPException(status_code=409, detail='Namnet är taget')\n```",
    example:
      "@app.post('/rum', status_code=201)\ndef boka(bokning: Bokning):\n    if bokning.rum in BOKADE:\n        raise HTTPException(status_code=409, detail='Rummet är bokat')\n    BOKADE.append(bokning.rum)\n    return bokning",
    task: "Uppgift: `POST /anvandare` ska spara användarnamnet och svara 201. Är namnet redan taget ska svaret vara 409 med `detail` `'Namnet är taget'`.",
    starterCode: `${IMPORT}\nNAMN = ['ada']\n\n\nclass Anvandare(BaseModel):\n    namn: str\n`,
    solution: `${IMPORT}\nNAMN = ['ada']\n\n\nclass Anvandare(BaseModel):\n    namn: str\n\n\n@app.post('/anvandare', status_code=201)\ndef ny(anvandare: Anvandare):\n    if anvandare.namn in NAMN:\n        raise HTTPException(status_code=409, detail='Namnet är taget')\n    NAMN.append(anvandare.namn)\n    return anvandare\n`,
    hints: [
      "@app.post('/anvandare', status_code=201)",
      'Kolla if anvandare.namn in NAMN: först.',
      "raise HTTPException(status_code=409, detail='Namnet är taget')",
    ],
    tests: [
      {
        description: 'Ett nytt namn ger 201',
        code: "__post('/anvandare', {'namn': 'bo'}).status",
        expected: 201,
      },
      {
        description: 'ada är taget',
        code: "__post('/anvandare', {'namn': 'ada'}).status",
        expected: 409,
      },
      {
        description: 'bo är taget nu',
        code: "__post('/anvandare', {'namn': 'bo'}).json",
        expected: { detail: 'Namnet är taget' },
      },
      {
        description: 'Ingenting sparas två gånger',
        code: 'NAMN',
        expected: ['ada', 'bo'],
      },
    ],
    request: { method: 'POST', path: '/anvandare', body: '{"namn": "ada"}' },
  },
  {
    id: 'fa-svar-05',
    track: 'svar',
    title: '400 Fel i anropet',
    xp: 20,
    description:
      'Modellen kollar typerna, men vissa regler gäller flera fält ihop. Bryts de svarar man 400.',
    explain:
      'En resa kan inte sluta innan den börjar. Det kan inte ett enskilt fält veta – du får kolla själv i funktionen.\n\n`400 Bad Request` betyder att anropet är fel på ett sätt som den som anropar måste rätta.\n\n(422 är FastAPI:s egen kontroll av typer och fält. 400 är dina egna regler.)',
    example:
      "if order.antal > LAGER[order.vara]:\n    raise HTTPException(status_code=400, detail='Finns inte så många')",
    task: "Uppgift: `POST /resor` tar emot `fran_dag` och `till_dag` (heltal). Är `till_dag` före `fran_dag` ska svaret vara 400 med `detail` `'Resan slutar innan den börjar'`. Annars svarar den `{'dagar': till_dag - fran_dag + 1}`.",
    starterCode: `${IMPORT}\n\nclass Resa(BaseModel):\n    fran_dag: int\n    till_dag: int\n`,
    solution: `${IMPORT}\n\nclass Resa(BaseModel):\n    fran_dag: int\n    till_dag: int\n\n\n@app.post('/resor')\ndef ny_resa(resa: Resa):\n    if resa.till_dag < resa.fran_dag:\n        raise HTTPException(status_code=400, detail='Resan slutar innan den börjar')\n    return {'dagar': resa.till_dag - resa.fran_dag + 1}\n`,
    hints: [
      'if resa.till_dag < resa.fran_dag:',
      'raise HTTPException(status_code=400, …)',
      "return {'dagar': resa.till_dag - resa.fran_dag + 1}",
    ],
    tests: [
      {
        description: 'Dag 3 till 7 är 5 dagar',
        code: "__post('/resor', {'fran_dag': 3, 'till_dag': 7}).json",
        expected: { dagar: 5 },
      },
      {
        description: 'Samma dag är 1 dag',
        code: "__post('/resor', {'fran_dag': 4, 'till_dag': 4}).json",
        expected: { dagar: 1 },
      },
      {
        description: 'Baklänges ger 400',
        code: "__post('/resor', {'fran_dag': 7, 'till_dag': 3}).status",
        expected: 400,
      },
      {
        description: 'Med rätt detail',
        code: "__post('/resor', {'fran_dag': 7, 'till_dag': 3}).json['detail']",
        expected: 'Resan slutar innan den börjar',
      },
    ],
    request: {
      method: 'POST',
      path: '/resor',
      body: '{"fran_dag": 7, "till_dag": 3}',
    },
  },
  {
    id: 'fa-svar-06',
    track: 'svar',
    title: 'Dölj det hemliga',
    xp: 20,
    description:
      'Ett lösenord ska skickas in, men aldrig skickas tillbaka. response_model bestämmer vad som syns.',
    explain:
      'Gör två modeller: en för det som **kommer in** och en för det som **går ut**.\n\n```\nclass AnvandareIn(BaseModel):\n    namn: str\n    losenord: str\n\nclass AnvandareUt(BaseModel):\n    namn: str\n```\n\nMed `response_model=AnvandareUt` i dekoratorn skickar FastAPI bara fälten i `AnvandareUt` – även om funktionen returnerar mer.',
    example:
      "@app.post('/konton', response_model=KontoUt)\ndef nytt_konto(konto: KontoIn):\n    return konto",
    task: 'Uppgift: Gör `AnvandareUt` med bara `namn`, och använd den som `response_model` på `POST /anvandare`, så att lösenordet inte skickas tillbaka.',
    starterCode: `${IMPORT}\n\nclass AnvandareIn(BaseModel):\n    namn: str\n    losenord: str\n\n\n@app.post('/anvandare', status_code=201)\ndef ny(anvandare: AnvandareIn):\n    return anvandare\n`,
    solution: `${IMPORT}\n\nclass AnvandareIn(BaseModel):\n    namn: str\n    losenord: str\n\n\nclass AnvandareUt(BaseModel):\n    namn: str\n\n\n@app.post('/anvandare', status_code=201, response_model=AnvandareUt)\ndef ny(anvandare: AnvandareIn):\n    return anvandare\n`,
    hints: [
      'class AnvandareUt(BaseModel):\n    namn: str',
      'response_model=AnvandareUt i dekoratorn.',
      "@app.post('/anvandare', status_code=201, response_model=AnvandareUt)",
    ],
    tests: [
      {
        description: 'Svaret har bara namnet',
        code: "__post('/anvandare', {'namn': 'ada', 'losenord': 'hemligt'}).json",
        expected: { namn: 'ada' },
      },
      {
        description: 'Fortfarande 201',
        code: "__post('/anvandare', {'namn': 'ada', 'losenord': 'hemligt'}).status",
        expected: 201,
      },
    ],
    request: {
      method: 'POST',
      path: '/anvandare',
      body: '{"namn": "ada", "losenord": "hemligt"}',
    },
  },
  {
    id: 'fa-svar-07',
    track: 'svar',
    title: 'En lista med modeller',
    xp: 20,
    description:
      'response_model fungerar också för listor, och rensar bort fält som inte ska synas.',
    explain:
      '`response_model=list[HundUt]` betyder: svaret är en lista, och varje sak ser ut som `HundUt`.\n\nLigger det fler fält i datan – som en intern anteckning – tas de bort ur svaret. Och dokumentationen visar exakt vad som skickas.',
    example:
      "@app.get('/bocker', response_model=list[BokUt])\ndef bocker():\n    return BOCKER",
    task: 'Uppgift: `HUNDAR` har ett fält `anteckning` som inte ska synas utåt. Gör modellen `HundUt` (`id`, `namn`) och låt `GET /hundar` använda `response_model=list[HundUt]`.',
    starterCode: `${IMPORT}\nHUNDAR = [\n    {'id': 1, 'namn': 'Bamse', 'anteckning': 'Bits ibland'},\n    {'id': 2, 'namn': 'Saga', 'anteckning': 'Rädd för katter'},\n]\n\n\n@app.get('/hundar')\ndef alla():\n    return HUNDAR\n`,
    solution: `${IMPORT}\nHUNDAR = [\n    {'id': 1, 'namn': 'Bamse', 'anteckning': 'Bits ibland'},\n    {'id': 2, 'namn': 'Saga', 'anteckning': 'Rädd för katter'},\n]\n\n\nclass HundUt(BaseModel):\n    id: int\n    namn: str\n\n\n@app.get('/hundar', response_model=list[HundUt])\ndef alla():\n    return HUNDAR\n`,
    hints: [
      'class HundUt(BaseModel):\n    id: int\n    namn: str',
      'response_model=list[HundUt]',
      "@app.get('/hundar', response_model=list[HundUt])",
    ],
    tests: [
      {
        description: 'Utan anteckningar',
        code: "__get('/hundar').json",
        expected: [
          { id: 1, namn: 'Bamse' },
          { id: 2, namn: 'Saga' },
        ],
      },
    ],
    request: { path: '/hundar' },
  },
  {
    id: 'fa-svar-08',
    track: 'svar',
    title: 'Namn i stället för siffror',
    xp: 15,
    description:
      'Det är lätt att skriva fel siffra. FastAPI har namn för alla statuskoder.',
    explain:
      '`from fastapi import status` ger namn för statuskoderna:\n\n- `status.HTTP_201_CREATED`\n- `status.HTTP_404_NOT_FOUND`\n- `status.HTTP_409_CONFLICT`\n\nDe är bara talen med namn, men editorn kan föreslå dem och koden blir lättare att läsa.',
    example:
      "raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Finns inte')",
    task: 'Uppgift: Byt ut talen mot namnen från `status` – svaren ska vara desamma.',
    starterCode: `from fastapi import FastAPI, HTTPException, status\nfrom pydantic import BaseModel\n\napp = FastAPI()\nLAGER = {'äpple': 10}\n\n\nclass Vara(BaseModel):\n    namn: str\n    antal: int\n\n\n@app.post('/lager', status_code=201)\ndef ny_vara(vara: Vara):\n    if vara.namn in LAGER:\n        raise HTTPException(status_code=409, detail='Finns redan')\n    LAGER[vara.namn] = vara.antal\n    return vara\n\n\n@app.get('/lager/{namn}')\ndef antal(namn: str):\n    if namn not in LAGER:\n        raise HTTPException(status_code=404, detail='Finns inte')\n    return {'antal': LAGER[namn]}\n`,
    solution: `from fastapi import FastAPI, HTTPException, status\nfrom pydantic import BaseModel\n\napp = FastAPI()\nLAGER = {'äpple': 10}\n\n\nclass Vara(BaseModel):\n    namn: str\n    antal: int\n\n\n@app.post('/lager', status_code=status.HTTP_201_CREATED)\ndef ny_vara(vara: Vara):\n    if vara.namn in LAGER:\n        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='Finns redan')\n    LAGER[vara.namn] = vara.antal\n    return vara\n\n\n@app.get('/lager/{namn}')\ndef antal(namn: str):\n    if namn not in LAGER:\n        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Finns inte')\n    return {'antal': LAGER[namn]}\n`,
    hints: [
      '201 blir status.HTTP_201_CREATED.',
      '409 blir status.HTTP_409_CONFLICT och 404 status.HTTP_404_NOT_FOUND.',
      'Byt alla tre talen.',
    ],
    tests: [
      {
        description: 'Ny vara ger 201',
        code: "__post('/lager', {'namn': 'päron', 'antal': 4}).status",
        expected: 201,
      },
      {
        description: 'Dubblett ger 409',
        code: "__post('/lager', {'namn': 'äpple', 'antal': 1}).status",
        expected: 409,
      },
      {
        description: 'Saknas ger 404',
        code: "__get('/lager/kiwi').status",
        expected: 404,
      },
    ],
    sourceChecks: [
      {
        description: 'Inga statuskoder som tal',
        pattern: /^(?![\s\S]*status_code=\d)/,
      },
    ],
    request: { path: '/lager/kiwi' },
  },
  {
    id: 'fa-svar-09',
    track: 'svar',
    title: 'Felen i dokumentationen',
    xp: 20,
    description:
      'Den som använder API:et vill veta vilka fel som kan komma. Skriv in dem i dokumentationen.',
    explain:
      "FastAPI vet inte själv att en väg kan svara 404 – den ser bara din `raise` när den händer. Med `responses` skriver du in det:\n\n`@app.get('/hundar/{id}', responses={404: {'description': 'Hunden finns inte'}})`\n\nNu syns 404 på `/docs`, bredvid 200 och 422.",
    example:
      "@app.post('/rum', status_code=201, responses={409: {'description': 'Rummet är bokat'}})",
    task: "Uppgift: Lägg till `responses` på `/hundar/{id}`, med 404 och beskrivningen `'Hunden finns inte'`.",
    starterCode: `${IMPORT}\n${HUNDAR}\n\n@app.get('/hundar/{id}')\ndef en_hund(id: int):\n    for hund in HUNDAR:\n        if hund['id'] == id:\n            return hund\n    raise HTTPException(status_code=404, detail='Hunden finns inte')\n`,
    solution: `${IMPORT}\n${HUNDAR}\n\n@app.get('/hundar/{id}', responses={404: {'description': 'Hunden finns inte'}})\ndef en_hund(id: int):\n    for hund in HUNDAR:\n        if hund['id'] == id:\n            return hund\n    raise HTTPException(status_code=404, detail='Hunden finns inte')\n`,
    hints: [
      'responses är en dict: statuskod → beskrivning.',
      "responses={404: {'description': 'Hunden finns inte'}}",
      "@app.get('/hundar/{id}', responses={404: {'description': 'Hunden finns inte'}})",
    ],
    tests: [
      {
        description: '404 står i dokumentationen',
        code: "__openapi()['paths']['/hundar/{id}']['get']['responses']['404']['description']",
        expected: 'Hunden finns inte',
      },
      {
        description: 'Vägen fungerar som förut',
        code: "__get('/hundar/1').json['namn']",
        expected: 'Bamse',
      },
    ],
    request: { path: '/hundar/1' },
  },
];
