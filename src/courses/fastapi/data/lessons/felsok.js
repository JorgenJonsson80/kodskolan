// Bana 10: felsökning. Startkoden är trasig, och eleven lagar den. Varje
// övning har ett fel som är vanligt i riktiga FastAPI-appar.

const IMPORT =
  'from fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel\n\napp = FastAPI()\n';

const HUNDAR = `HUNDAR = [
    {'id': 1, 'namn': 'Bamse'},
    {'id': 2, 'namn': 'Saga'},
]
`;

export const FELSOK = [
  {
    id: 'fa-felsok-01',
    track: 'felsok',
    title: 'Vägen som inte finns',
    xp: 20,
    description: 'Koden ser rätt ut, men /meny svarar 404.',
    explain:
      'Felsökning börjar med att **titta på svaret**. 404 betyder att FastAPI inte känner till vägen alls.\n\nUnder svaret står vilka vägar appen har. Saknas `/meny` där har FastAPI aldrig fått reda på den – kolla raden ovanför funktionen.',
    example: "@app.get('/meny')\ndef meny():\n    return MENY",
    task: 'Uppgift: Laga appen så att `/meny` svarar med menyn.',
    starterCode: `${IMPORT}\nMENY = ['Kaffe', 'Te', 'Bulle']\n\n\napp.get('/meny')\ndef meny():\n    return MENY\n`,
    solution: `${IMPORT}\nMENY = ['Kaffe', 'Te', 'Bulle']\n\n\n@app.get('/meny')\ndef meny():\n    return MENY\n`,
    hints: [
      'Vilka vägar står under svaret?',
      'En dekorator börjar med ett speciellt tecken.',
      "@app.get('/meny')",
    ],
    tests: [
      {
        description: '/meny',
        code: "__get('/meny').json",
        expected: ['Kaffe', 'Te', 'Bulle'],
      },
    ],
    request: { path: '/meny' },
  },
  {
    id: 'fa-felsok-02',
    track: 'felsok',
    title: 'Hunden som aldrig hittas',
    xp: 20,
    description: '/hundar/1 svarar 404, fast Bamse har id 1.',
    explain:
      "Lägg in en `print` för att se vad som händer:\n\n`print(repr(id), repr(hund['id']))`\n\n`repr` visar skillnaden mellan texten `'1'` och talet `1`. De är inte lika – `'1' == 1` är `False`.",
    example: "@app.get('/bocker/{id}')\ndef bok(id: int):\n    ...",
    task: 'Uppgift: Laga `/hundar/{id}`.',
    starterCode: `${IMPORT}\n${HUNDAR}\n\n@app.get('/hundar/{id}')\ndef en_hund(id):\n    for hund in HUNDAR:\n        if hund['id'] == id:\n            return hund\n    raise HTTPException(status_code=404, detail='Hunden finns inte')\n`,
    solution: `${IMPORT}\n${HUNDAR}\n\n@app.get('/hundar/{id}')\ndef en_hund(id: int):\n    for hund in HUNDAR:\n        if hund['id'] == id:\n            return hund\n    raise HTTPException(status_code=404, detail='Hunden finns inte')\n`,
    hints: [
      'Lägg in print(repr(id)) i funktionen och kör.',
      'Utan typ är allt i adressen text.',
      'def en_hund(id: int):',
    ],
    tests: [
      {
        description: '/hundar/1',
        code: "__get('/hundar/1').json",
        expected: { id: 1, namn: 'Bamse' },
      },
      {
        description: '/hundar/3 ger 404',
        code: "__get('/hundar/3').status",
        expected: 404,
      },
    ],
    request: { path: '/hundar/1' },
  },
  {
    id: 'fa-felsok-03',
    track: 'felsok',
    title: 'null i stället för svar',
    xp: 20,
    description: '/summa svarar null. Uträkningen är rätt – men något saknas.',
    explain:
      'En funktion utan `return` ger `None`, och `None` blir `null` i JSON.\n\nDet är lätt att räkna ut något och glömma att skicka tillbaka det.',
    example:
      "@app.get('/x')\ndef x():\n    svar = 1 + 1\n    return {'svar': svar}",
    task: "Uppgift: Laga `/summa` så att den svarar `{'summa': 90}`.",
    starterCode: `${IMPORT}\nPRISER = [30, 25, 35]\n\n\n@app.get('/summa')\ndef summa():\n    total = sum(PRISER)\n    {'summa': total}\n`,
    solution: `${IMPORT}\nPRISER = [30, 25, 35]\n\n\n@app.get('/summa')\ndef summa():\n    total = sum(PRISER)\n    return {'summa': total}\n`,
    hints: [
      'Vad svarar en funktion som inte returnerar något?',
      'Sista raden skapar en dict – men gör inget med den.',
      "return {'summa': total}",
    ],
    tests: [
      {
        description: '/summa',
        code: "__get('/summa').json",
        expected: { summa: 90 },
      },
    ],
    request: { path: '/summa' },
  },
  {
    id: 'fa-felsok-04',
    track: 'felsok',
    title: 'Fel väg svarar',
    xp: 20,
    description: '/hundar/ny ger 422, fast vägen finns.',
    explain:
      'Läs 422-svaret: det säger att `id` inte är ett heltal. Men vägen `/hundar/ny` har ju inget id?\n\nTitta på ordningen. FastAPI tar den första vägen som passar.',
    example: '# Fasta vägar först, vägar med {variabler} sist.',
    task: "Uppgift: Laga appen så att `/hundar/ny` svarar `{'namn': 'Valp'}` och `/hundar/1` fortfarande fungerar.",
    starterCode: `${IMPORT}\n${HUNDAR}\n\n@app.get('/hundar/{id}')\ndef en_hund(id: int):\n    return HUNDAR[id - 1]\n\n\n@app.get('/hundar/ny')\ndef ny_hund():\n    return {'namn': 'Valp'}\n`,
    solution: `${IMPORT}\n${HUNDAR}\n\n@app.get('/hundar/ny')\ndef ny_hund():\n    return {'namn': 'Valp'}\n\n\n@app.get('/hundar/{id}')\ndef en_hund(id: int):\n    return HUNDAR[id - 1]\n`,
    hints: [
      'Läs loc i 422-svaret.',
      'Vilken väg står först?',
      'Flytta /hundar/ny ovanför /hundar/{id}.',
    ],
    tests: [
      {
        description: '/hundar/ny',
        code: "__get('/hundar/ny').json",
        expected: { namn: 'Valp' },
      },
      {
        description: '/hundar/1',
        code: "__get('/hundar/1').json['namn']",
        expected: 'Bamse',
      },
    ],
    request: { path: '/hundar/ny' },
  },
  {
    id: 'fa-felsok-05',
    track: 'felsok',
    title: 'Flask-vanan',
    xp: 25,
    description:
      'Den här koden skrevs av någon som är van vid Flask. POST /hundar svarar konstigt.',
    explain:
      'I Flask skriver man `return data, 201` för att sätta statuskoden. I FastAPI blir det en **lista** med två saker – och statuskoden blir fortfarande 200.\n\nI FastAPI sätts statuskoden i dekoratorn.',
    example:
      "@app.post('/bocker', status_code=201)\ndef ny(bok: Bok):\n    return bok",
    task: 'Uppgift: Laga `POST /hundar` så att den svarar 201 med bara hunden.',
    starterCode: `${IMPORT}\n\nclass Hund(BaseModel):\n    namn: str\n\n\n@app.post('/hundar')\ndef ny_hund(hund: Hund):\n    return hund, 201\n`,
    solution: `${IMPORT}\n\nclass Hund(BaseModel):\n    namn: str\n\n\n@app.post('/hundar', status_code=201)\ndef ny_hund(hund: Hund):\n    return hund\n`,
    hints: [
      'Titta på svaret i 📮: vad är det för slags JSON?',
      'Statuskoden ska inte stå i return.',
      "@app.post('/hundar', status_code=201)\ndef ny_hund(hund: Hund):\n    return hund",
    ],
    tests: [
      {
        description: 'Bara hunden',
        code: "__post('/hundar', {'namn': 'Bamse'}).json",
        expected: { namn: 'Bamse' },
      },
      {
        description: '201',
        code: "__post('/hundar', {'namn': 'Bamse'}).status",
        expected: 201,
      },
    ],
    request: { method: 'POST', path: '/hundar', body: '{"namn": "Bamse"}' },
  },
  {
    id: 'fa-felsok-06',
    track: 'felsok',
    title: 'PATCH som raderar',
    xp: 25,
    description:
      'När någon bockar av en uppgift försvinner titeln. Användarna är inte glada.',
    explain:
      'Kör `PATCH /uppgifter/1` med `{"klar": true}` och titta på svaret. Titeln har blivit `null`.\n\n`model_dump()` ger **alla** fält – även de som inte skickades, med sina standardvärden `None`. Det finns ett argument som bara ger fälten som skickades.',
    example: 'andring.model_dump(exclude_unset=True)',
    task: 'Uppgift: Laga PATCH så att den bara ändrar det som skickas.',
    starterCode: `${IMPORT}\nUPPGIFTER = [{'id': 1, 'titel': 'Handla', 'klar': False}]\n\n\nclass Andring(BaseModel):\n    titel: str | None = None\n    klar: bool | None = None\n\n\n@app.patch('/uppgifter/{id}')\ndef andra(id: int, andring: Andring):\n    uppgift = UPPGIFTER[id - 1]\n    uppgift.update(andring.model_dump())\n    return uppgift\n`,
    solution: `${IMPORT}\nUPPGIFTER = [{'id': 1, 'titel': 'Handla', 'klar': False}]\n\n\nclass Andring(BaseModel):\n    titel: str | None = None\n    klar: bool | None = None\n\n\n@app.patch('/uppgifter/{id}')\ndef andra(id: int, andring: Andring):\n    uppgift = UPPGIFTER[id - 1]\n    uppgift.update(andring.model_dump(exclude_unset=True))\n    return uppgift\n`,
    hints: [
      'Vad ger model_dump() för titel när den inte skickades?',
      'Det finns ett argument till model_dump.',
      'andring.model_dump(exclude_unset=True)',
    ],
    tests: [
      {
        description: 'Bocka av',
        code: "__patch('/uppgifter/1', {'klar': True}).json",
        expected: { id: 1, titel: 'Handla', klar: true },
      },
    ],
    request: {
      method: 'PATCH',
      path: '/uppgifter/1',
      body: '{"klar": true}',
    },
  },
  {
    id: 'fa-felsok-07',
    track: 'felsok',
    title: 'Läckan',
    xp: 25,
    description:
      'En säkerhetsgranskning hittade lösenord i API:ets svar. Det är bråttom.',
    explain:
      'Modellen `KontoUt` finns redan, men den används inte. Utan `response_model` skickar FastAPI allt funktionen returnerar.\n\nDet här är ett riktigt vanligt fel – och ett allvarligt.',
    example: "@app.get('/konton', response_model=list[KontoUt])",
    task: 'Uppgift: Se till att varken `GET /konton` eller `POST /konton` någonsin skickar lösenordet.',
    starterCode: `${IMPORT}\nKONTON = [{'namn': 'ada', 'losenord': 'hemligt1'}]\n\n\nclass KontoIn(BaseModel):\n    namn: str\n    losenord: str\n\n\nclass KontoUt(BaseModel):\n    namn: str\n\n\n@app.get('/konton')\ndef konton():\n    return KONTON\n\n\n@app.post('/konton', status_code=201)\ndef nytt(konto: KontoIn):\n    KONTON.append(konto.model_dump())\n    return konto\n`,
    solution: `${IMPORT}\nKONTON = [{'namn': 'ada', 'losenord': 'hemligt1'}]\n\n\nclass KontoIn(BaseModel):\n    namn: str\n    losenord: str\n\n\nclass KontoUt(BaseModel):\n    namn: str\n\n\n@app.get('/konton', response_model=list[KontoUt])\ndef konton():\n    return KONTON\n\n\n@app.post('/konton', status_code=201, response_model=KontoUt)\ndef nytt(konto: KontoIn):\n    KONTON.append(konto.model_dump())\n    return konto\n`,
    hints: [
      'Båda vägarna behöver response_model.',
      'GET svarar med en lista: list[KontoUt].',
      'POST svarar med ett konto: response_model=KontoUt.',
    ],
    tests: [
      {
        description: 'GET utan lösenord',
        code: "__get('/konton').json",
        expected: [{ namn: 'ada' }],
      },
      {
        description: 'POST utan lösenord',
        code: "__post('/konton', {'namn': 'bo', 'losenord': 'abc'}).json",
        expected: { namn: 'bo' },
      },
    ],
    request: { path: '/konton' },
  },
  {
    id: 'fa-felsok-08',
    track: 'felsok',
    title: 'Appen som inte startar',
    xp: 25,
    description:
      'Appen kraschar direkt, innan något anrop har gjorts. Läs felet noga.',
    explain:
      'Felet pekar på raden med `Depends`. Ett beroende ska **ges** till `Depends` – inte anropas.\n\n- `Depends(inloggad)` – FastAPI anropar funktionen vid varje anrop\n- `Depends(inloggad())` – du anropar den en gång, när appen startar, utan någon header\n\nSamma sak med `dependency_overrides`: nyckeln är funktionen, inte ett anrop.',
    example: 'def jag(anvandare=Depends(inloggad)):',
    task: 'Uppgift: Laga appen.',
    starterCode: `from fastapi import FastAPI, Depends, Header, HTTPException\n\napp = FastAPI()\nTOKENS = {'abc': 'Ada'}\n\n\ndef inloggad(authorization: str | None = Header(default=None)):\n    token = authorization.removeprefix('Bearer ')\n    if token not in TOKENS:\n        raise HTTPException(status_code=401, detail='Okänd token')\n    return TOKENS[token]\n\n\n@app.get('/jag')\ndef jag(namn=Depends(inloggad())):\n    return {'namn': namn}\n`,
    solution: `from fastapi import FastAPI, Depends, Header, HTTPException\n\napp = FastAPI()\nTOKENS = {'abc': 'Ada'}\n\n\ndef inloggad(authorization: str | None = Header(default=None)):\n    if authorization is None:\n        raise HTTPException(status_code=401, detail='Logga in först')\n    token = authorization.removeprefix('Bearer ')\n    if token not in TOKENS:\n        raise HTTPException(status_code=401, detail='Okänd token')\n    return TOKENS[token]\n\n\n@app.get('/jag')\ndef jag(namn=Depends(inloggad)):\n    return {'namn': namn}\n`,
    hints: [
      'Läs vilken rad felet pekar på.',
      'Depends(inloggad) – utan parenteser efter inloggad.',
      'Testerna kollar också ett anrop helt utan header. Vad är authorization då?',
    ],
    tests: [
      {
        description: '/jag som Ada',
        code: "__get('/jag', {'authorization': 'Bearer abc'}).json",
        expected: { namn: 'Ada' },
      },
      {
        description: 'Fel token: 401',
        code: "__get('/jag', {'authorization': 'Bearer x'}).status",
        expected: 401,
      },
      {
        description: 'Ingen header: 401, inte en krasch',
        code: "__get('/jag').status",
        expected: 401,
      },
    ],
    request: { path: '/jag', headers: { authorization: 'Bearer abc' } },
  },
  {
    id: 'fa-felsok-09',
    track: 'felsok',
    title: 'Det långsamma API:et',
    xp: 25,
    description:
      'Användarna klagar: /dashboard tar fyra sekunder. Det finns inget fel – men det kan gå mycket fortare.',
    explain:
      'Alla svar är rätt, men varje tjänst väntas in efter den förra. Ingen av dem behöver svaret från någon annan.\n\nMät med 📮 (tiden syns inte där, men i testerna) och tänk på bana 9.',
    example: 'a, b = await asyncio.gather(hamta_a(), hamta_b())',
    task: 'Uppgift: Gör `/dashboard` lika snabb som den långsammaste tjänsten (2 sekunder). Svaret ska vara detsamma.',
    starterCode: `import asyncio\n\nfrom fastapi import FastAPI\n\napp = FastAPI()\n\n\nasync def anvandare():\n    await asyncio.sleep(1)\n    return 'Ada'\n\n\nasync def meddelanden():\n    await asyncio.sleep(2)\n    return 3\n\n\nasync def vader():\n    await asyncio.sleep(1)\n    return 'sol'\n\n\n@app.get('/dashboard')\nasync def dashboard():\n    namn = await anvandare()\n    antal = await meddelanden()\n    idag = await vader()\n    return {'namn': namn, 'meddelanden': antal, 'vader': idag}\n`,
    solution: `import asyncio\n\nfrom fastapi import FastAPI\n\napp = FastAPI()\n\n\nasync def anvandare():\n    await asyncio.sleep(1)\n    return 'Ada'\n\n\nasync def meddelanden():\n    await asyncio.sleep(2)\n    return 3\n\n\nasync def vader():\n    await asyncio.sleep(1)\n    return 'sol'\n\n\n@app.get('/dashboard')\nasync def dashboard():\n    namn, antal, idag = await asyncio.gather(anvandare(), meddelanden(), vader())\n    return {'namn': namn, 'meddelanden': antal, 'vader': idag}\n`,
    hints: [
      'Tre await efter varandra: 1 + 2 + 1 sekunder.',
      'asyncio.gather väntar på alla samtidigt.',
      'namn, antal, idag = await asyncio.gather(anvandare(), meddelanden(), vader())',
    ],
    tests: [
      {
        description: 'Samma svar',
        code: "__get('/dashboard').json",
        expected: { namn: 'Ada', meddelanden: 3, vader: 'sol' },
      },
      {
        description: 'Två sekunder',
        code: "__tid('/dashboard')",
        expected: 2,
      },
    ],
    request: { path: '/dashboard' },
  },
];
