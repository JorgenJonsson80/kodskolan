// Bana 6: ett helt API. Skapa, läsa, ändra och ta bort (CRUD) med POST,
// GET, PUT, PATCH och DELETE.

const IMPORT =
  'from fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel\n\napp = FastAPI()\n';

const UPPGIFTER = `UPPGIFTER = [
    {'id': 1, 'titel': 'Handla', 'klar': False},
    {'id': 2, 'titel': 'Städa', 'klar': True},
]
`;

const HITTA = `

def hitta(id):
    for uppgift in UPPGIFTER:
        if uppgift['id'] == id:
            return uppgift
    raise HTTPException(status_code=404, detail='Uppgiften finns inte')
`;

const MODELL = `

class Uppgift(BaseModel):
    titel: str
    klar: bool = False
`;

const BAS = `${IMPORT}\n${UPPGIFTER}${HITTA}${MODELL}`;

export const CRUD = [
  {
    id: 'fa-crud-01',
    track: 'crud',
    title: 'Ny med eget id',
    xp: 20,
    description:
      'Varje ny sak behöver ett id som ingen annan har. API:et ska räkna ut det, inte den som skickar.',
    explain:
      "Ett enkelt sätt: ta det största id som finns och lägg till 1.\n\n`max((u['id'] for u in UPPGIFTER), default=0) + 1`\n\n`default=0` gör att det fungerar även när listan är tom.\n\nDen som skickar en ny uppgift skickar bara `titel` och kanske `klar` – id:t sätter API:et.",
    example:
      "nytt_id = max((b['id'] for b in BOCKER), default=0) + 1\nBOCKER.append({'id': nytt_id, **bok.model_dump()})",
    task: 'Uppgift: `POST /uppgifter` ska ge uppgiften ett nytt id, spara den och svara 201 med den sparade uppgiften (med id).',
    starterCode: BAS,
    solution: `${BAS}\n\n@app.post('/uppgifter', status_code=201)\ndef ny(uppgift: Uppgift):\n    nytt_id = max((u['id'] for u in UPPGIFTER), default=0) + 1\n    sparad = {'id': nytt_id, **uppgift.model_dump()}\n    UPPGIFTER.append(sparad)\n    return sparad\n`,
    hints: [
      "nytt_id = max((u['id'] for u in UPPGIFTER), default=0) + 1",
      "sparad = {'id': nytt_id, **uppgift.model_dump()}",
      'UPPGIFTER.append(sparad)\nreturn sparad',
    ],
    tests: [
      {
        description: 'Den nya får id 3',
        code: "__post('/uppgifter', {'titel': 'Koda'}).json",
        expected: { id: 3, titel: 'Koda', klar: false },
      },
      {
        description: 'Nästa får id 4 och 201',
        code: "(lambda s: [s.status, s.json['id']])(__post('/uppgifter', {'titel': 'Läsa'}))",
        expected: [201, 4],
      },
      {
        description: 'Nu finns fyra uppgifter',
        code: 'len(UPPGIFTER)',
        expected: 4,
      },
    ],
    request: { method: 'POST', path: '/uppgifter', body: '{"titel": "Koda"}' },
  },
  {
    id: 'fa-crud-02',
    track: 'crud',
    title: 'Hämta en och alla',
    xp: 15,
    description:
      'Två GET-vägar hör till nästan varje sak i ett API: alla, och en med id.',
    explain:
      'Det här mönstret kommer du se överallt:\n\n- `GET /uppgifter` – alla\n- `GET /uppgifter/{id}` – en\n- `POST /uppgifter` – skapa\n- `PUT /uppgifter/{id}` – byt ut\n- `PATCH /uppgifter/{id}` – ändra en del\n- `DELETE /uppgifter/{id}` – ta bort\n\nTillsammans kallas de **CRUD**: Create, Read, Update, Delete. `hitta(id)` finns redan och svarar 404.',
    example:
      "@app.get('/bocker/{id}')\ndef en_bok(id: int):\n    return hitta(id)",
    task: 'Uppgift: Gör `GET /uppgifter` och `GET /uppgifter/{id}`.',
    starterCode: BAS,
    solution: `${BAS}\n\n@app.get('/uppgifter')\ndef alla():\n    return UPPGIFTER\n\n\n@app.get('/uppgifter/{id}')\ndef en(id: int):\n    return hitta(id)\n`,
    hints: [
      'Den första returnerar hela listan.',
      'Den andra använder hitta(id).',
      "@app.get('/uppgifter/{id}')\ndef en(id: int):\n    return hitta(id)",
    ],
    tests: [
      {
        description: 'Alla',
        code: "len(__get('/uppgifter').json)",
        expected: 2,
      },
      {
        description: 'En',
        code: "__get('/uppgifter/2').json",
        expected: { id: 2, titel: 'Städa', klar: true },
      },
      {
        description: 'En som saknas ger 404',
        code: "__get('/uppgifter/9').status",
        expected: 404,
      },
    ],
    request: { path: '/uppgifter/2' },
  },
  {
    id: 'fa-crud-03',
    track: 'crud',
    title: 'Byt ut med PUT',
    xp: 20,
    description:
      'PUT byter ut en hel sak mot det som skickas. Allt måste skickas med.',
    explain:
      "`@app.put('/uppgifter/{id}')` tar emot både id i adressen och en modell i JSON:en.\n\nHitta uppgiften, och skriv över fälten med `update`:\n\n`uppgift.update(ny.model_dump())`\n\n`update` lägger in alla nycklar från en dict i en annan. Id:t ligger kvar, eftersom det inte finns i modellen.",
    example:
      "@app.put('/bocker/{id}')\ndef byt(id: int, bok: Bok):\n    gammal = hitta(id)\n    gammal.update(bok.model_dump())\n    return gammal",
    task: 'Uppgift: Gör `PUT /uppgifter/{id}` som byter ut uppgiften och svarar med den. Finns den inte: 404.',
    starterCode: BAS,
    solution: `${BAS}\n\n@app.put('/uppgifter/{id}')\ndef byt(id: int, ny: Uppgift):\n    uppgift = hitta(id)\n    uppgift.update(ny.model_dump())\n    return uppgift\n`,
    hints: [
      "@app.put('/uppgifter/{id}')",
      'def byt(id: int, ny: Uppgift):',
      'uppgift = hitta(id)\nuppgift.update(ny.model_dump())\nreturn uppgift',
    ],
    tests: [
      {
        description: 'PUT /uppgifter/1',
        code: "__put('/uppgifter/1', {'titel': 'Handla mat', 'klar': True}).json",
        expected: { id: 1, titel: 'Handla mat', klar: true },
      },
      {
        description: 'Ändringen är sparad',
        code: "UPPGIFTER[0]['titel']",
        expected: 'Handla mat',
      },
      {
        description: 'PUT utan titel ger 422',
        code: "__put('/uppgifter/1', {'klar': False}).status",
        expected: 422,
      },
      {
        description: 'PUT /uppgifter/9 ger 404',
        code: "__put('/uppgifter/9', {'titel': 'X'}).status",
        expected: 404,
      },
    ],
    request: {
      method: 'PUT',
      path: '/uppgifter/1',
      body: '{"titel": "Handla mat", "klar": true}',
    },
  },
  {
    id: 'fa-crud-04',
    track: 'crud',
    title: 'Ta bort med DELETE',
    xp: 20,
    description:
      'DELETE tar bort. Svaret är 204 No Content – det finns inget kvar att visa.',
    explain:
      '`status_code=204` betyder att det gick bra, men att svaret är tomt. Funktionen returnerar ingenting.\n\nTa bort ur listan med `remove`:\n\n`UPPGIFTER.remove(hitta(id))`\n\nFinns uppgiften inte gör `hitta` raise, och svaret blir 404.',
    example:
      "@app.delete('/bocker/{id}', status_code=204)\ndef ta_bort(id: int):\n    BOCKER.remove(hitta(id))",
    task: 'Uppgift: Gör `DELETE /uppgifter/{id}` som tar bort uppgiften och svarar 204.',
    starterCode: BAS,
    solution: `${BAS}\n\n@app.delete('/uppgifter/{id}', status_code=204)\ndef ta_bort(id: int):\n    UPPGIFTER.remove(hitta(id))\n`,
    hints: [
      "@app.delete('/uppgifter/{id}', status_code=204)",
      'Funktionen behöver inte returnera något.',
      'UPPGIFTER.remove(hitta(id))',
    ],
    tests: [
      {
        description: 'DELETE /uppgifter/1 ger 204',
        code: "__delete('/uppgifter/1').status",
        expected: 204,
      },
      {
        description: 'Svaret är tomt',
        code: "__delete('/uppgifter/2').text",
        expected: '',
      },
      {
        description: 'Båda är borta',
        code: 'UPPGIFTER',
        expected: [],
      },
      {
        description: 'Igen ger 404',
        code: "__delete('/uppgifter/1').status",
        expected: 404,
      },
    ],
    request: { method: 'DELETE', path: '/uppgifter/1' },
  },
  {
    id: 'fa-crud-05',
    track: 'crud',
    title: 'Ändra en del med PATCH',
    xp: 25,
    description:
      'Ofta vill man bara ändra en sak, som att bocka av en uppgift. Då är PATCH bättre än PUT.',
    explain:
      "Med PATCH skickar man bara det som ändras: `{'klar': true}`.\n\nModellen har då bara valfria fält:\n\n```\nclass Andring(BaseModel):\n    titel: str | None = None\n    klar: bool | None = None\n```\n\n`andring.model_dump(exclude_unset=True)` ger bara fälten som faktiskt **skickades**. Utan `exclude_unset` skulle titeln skrivas över med `None`.",
    example:
      "@app.patch('/bocker/{id}')\ndef andra(id: int, andring: BokAndring):\n    bok = hitta(id)\n    bok.update(andring.model_dump(exclude_unset=True))\n    return bok",
    task: 'Uppgift: Gör modellen `Andring` och `PATCH /uppgifter/{id}` som bara ändrar det som skickas.',
    starterCode: BAS,
    solution: `${BAS}\n\nclass Andring(BaseModel):\n    titel: str | None = None\n    klar: bool | None = None\n\n\n@app.patch('/uppgifter/{id}')\ndef andra(id: int, andring: Andring):\n    uppgift = hitta(id)\n    uppgift.update(andring.model_dump(exclude_unset=True))\n    return uppgift\n`,
    hints: [
      'Båda fälten i Andring är valfria: … | None = None.',
      'model_dump(exclude_unset=True)',
      'uppgift = hitta(id)\nuppgift.update(andring.model_dump(exclude_unset=True))\nreturn uppgift',
    ],
    tests: [
      {
        description: 'Bocka av Handla',
        code: "__patch('/uppgifter/1', {'klar': True}).json",
        expected: { id: 1, titel: 'Handla', klar: true },
      },
      {
        description: 'Byt bara titeln på Städa',
        code: "__patch('/uppgifter/2', {'titel': 'Dammsuga'}).json",
        expected: { id: 2, titel: 'Dammsuga', klar: true },
      },
      {
        description: 'Inget skickat ändrar inget',
        code: "__patch('/uppgifter/2', {}).json",
        expected: { id: 2, titel: 'Dammsuga', klar: true },
      },
      {
        description: 'PATCH /uppgifter/9 ger 404',
        code: "__patch('/uppgifter/9', {'klar': True}).status",
        expected: 404,
      },
    ],
    request: { method: 'PATCH', path: '/uppgifter/1', body: '{"klar": true}' },
  },
  {
    id: 'fa-crud-06',
    track: 'crud',
    title: 'Fasta vägar före id',
    xp: 20,
    description:
      'Statistik över alla uppgifter är också en väg. Kom ihåg ordningen från bana 2.',
    explain:
      "`/uppgifter/statistik` passar också `/uppgifter/{id}`. Står `{id}` först försöker FastAPI göra `'statistik'` till ett heltal – och svarar 422.\n\nLösningen är densamma som förut: den fasta vägen först.",
    example:
      "@app.get('/bocker/senaste')\ndef senaste():\n    return BOCKER[-1]\n\n@app.get('/bocker/{id}')\ndef en(id: int):\n    return hitta(id)",
    task: "Uppgift: Lägg till `GET /uppgifter/statistik` som svarar `{'totalt': …, 'klara': …, 'kvar': …}`, så att den fungerar trots vägen med `{id}`.",
    starterCode: `${BAS}\n\n@app.get('/uppgifter/{id}')\ndef en(id: int):\n    return hitta(id)\n`,
    solution: `${BAS}\n\n@app.get('/uppgifter/statistik')\ndef statistik():\n    klara = len([u for u in UPPGIFTER if u['klar']])\n    return {'totalt': len(UPPGIFTER), 'klara': klara, 'kvar': len(UPPGIFTER) - klara}\n\n\n@app.get('/uppgifter/{id}')\ndef en(id: int):\n    return hitta(id)\n`,
    hints: [
      'Den nya vägen ska stå ovanför /uppgifter/{id}.',
      "klara = len([u for u in UPPGIFTER if u['klar']])",
      "return {'totalt': len(UPPGIFTER), 'klara': klara, 'kvar': len(UPPGIFTER) - klara}",
    ],
    tests: [
      {
        description: '/uppgifter/statistik',
        code: "__get('/uppgifter/statistik').json",
        expected: { totalt: 2, klara: 1, kvar: 1 },
      },
      {
        description: '/uppgifter/1 fungerar fortfarande',
        code: "__get('/uppgifter/1').json['titel']",
        expected: 'Handla',
      },
    ],
    request: { path: '/uppgifter/statistik' },
  },
  {
    id: 'fa-crud-07',
    track: 'crud',
    title: 'En lista i en sak',
    xp: 25,
    description:
      'En inköpslista har varor. Varorna får egna vägar under listan: /listor/1/varor.',
    explain:
      'Saker som hör till något annat får adresser **under** det:\n\n- `GET /listor/1/varor` – varorna i lista 1\n- `POST /listor/1/varor` – lägg till en vara i lista 1\n\nHitta listan först (404 om den saknas), och arbeta sedan med dess egen lista.',
    example:
      "@app.post('/album/{id}/bilder', status_code=201)\ndef ny_bild(id: int, bild: Bild):\n    album = hitta(id)\n    album['bilder'].append(bild.namn)\n    return album",
    task: "Uppgift: `POST /listor/{id}/varor` tar emot `{'namn': …}`, lägger till namnet i listans `varor` och svarar 201 med hela listan. `GET /listor/{id}/varor` svarar med varorna.",
    starterCode: `${IMPORT}\nLISTOR = [{'id': 1, 'namn': 'Fredag', 'varor': ['chips']}]\n\n\ndef hitta(id):\n    for lista in LISTOR:\n        if lista['id'] == id:\n            return lista\n    raise HTTPException(status_code=404, detail='Listan finns inte')\n\n\nclass Vara(BaseModel):\n    namn: str\n`,
    solution: `${IMPORT}\nLISTOR = [{'id': 1, 'namn': 'Fredag', 'varor': ['chips']}]\n\n\ndef hitta(id):\n    for lista in LISTOR:\n        if lista['id'] == id:\n            return lista\n    raise HTTPException(status_code=404, detail='Listan finns inte')\n\n\nclass Vara(BaseModel):\n    namn: str\n\n\n@app.get('/listor/{id}/varor')\ndef varor(id: int):\n    return hitta(id)['varor']\n\n\n@app.post('/listor/{id}/varor', status_code=201)\ndef ny_vara(id: int, vara: Vara):\n    lista = hitta(id)\n    lista['varor'].append(vara.namn)\n    return lista\n`,
    hints: [
      "@app.post('/listor/{id}/varor', status_code=201)",
      "lista = hitta(id)\nlista['varor'].append(vara.namn)",
      "@app.get('/listor/{id}/varor')\ndef varor(id: int):\n    return hitta(id)['varor']",
    ],
    tests: [
      {
        description: 'Lägg till dipp',
        code: "__post('/listor/1/varor', {'namn': 'dipp'}).json",
        expected: { id: 1, namn: 'Fredag', varor: ['chips', 'dipp'] },
      },
      {
        description: 'GET /listor/1/varor',
        code: "__get('/listor/1/varor').json",
        expected: ['chips', 'dipp'],
      },
      {
        description: 'Lista 9 ger 404',
        code: "__post('/listor/9/varor', {'namn': 'dipp'}).status",
        expected: 404,
      },
    ],
    request: {
      method: 'POST',
      path: '/listor/1/varor',
      body: '{"namn": "dipp"}',
    },
  },
  {
    id: 'fa-crud-08',
    track: 'crud',
    title: 'Ta bort flera',
    xp: 20,
    description:
      'En knapp som "Rensa klara" tar bort alla som är klara på en gång.',
    explain:
      "En DELETE-väg kan också ta bort flera saker. Det enklaste är att bygga en ny lista med det som ska **behållas**, och lägga den i den gamla:\n\n`UPPGIFTER[:] = [u for u in UPPGIFTER if not u['klar']]`\n\n`[:] =` byter ut innehållet i listan i stället för att skapa en ny variabel – så att alla som använder `UPPGIFTER` ser ändringen.\n\nEtt bra API berättar hur många som togs bort, så här svarar vi 200 med ett antal i stället för 204.",
    example:
      "@app.delete('/korg')\ndef tom_korg():\n    antal = len(KORG)\n    KORG.clear()\n    return {'borttagna': antal}",
    task: "Uppgift: `DELETE /uppgifter/klara` ska ta bort alla klara uppgifter och svara `{'borttagna': …}`.",
    starterCode: `${IMPORT}\nUPPGIFTER = [\n    {'id': 1, 'titel': 'Handla', 'klar': True},\n    {'id': 2, 'titel': 'Städa', 'klar': False},\n    {'id': 3, 'titel': 'Koda', 'klar': True},\n]\n`,
    solution: `${IMPORT}\nUPPGIFTER = [\n    {'id': 1, 'titel': 'Handla', 'klar': True},\n    {'id': 2, 'titel': 'Städa', 'klar': False},\n    {'id': 3, 'titel': 'Koda', 'klar': True},\n]\n\n\n@app.delete('/uppgifter/klara')\ndef rensa():\n    fore = len(UPPGIFTER)\n    UPPGIFTER[:] = [u for u in UPPGIFTER if not u['klar']]\n    return {'borttagna': fore - len(UPPGIFTER)}\n`,
    hints: [
      'Räkna hur många det fanns före.',
      "UPPGIFTER[:] = [u for u in UPPGIFTER if not u['klar']]",
      "return {'borttagna': fore - len(UPPGIFTER)}",
    ],
    tests: [
      {
        description: 'Två togs bort',
        code: "__delete('/uppgifter/klara').json",
        expected: { borttagna: 2 },
      },
      {
        description: 'Städa är kvar',
        code: 'UPPGIFTER',
        expected: [{ id: 2, titel: 'Städa', klar: false }],
      },
      {
        description: 'Igen tar bort noll',
        code: "__delete('/uppgifter/klara').json",
        expected: { borttagna: 0 },
      },
    ],
    request: { method: 'DELETE', path: '/uppgifter/klara' },
  },
  {
    id: 'fa-crud-09',
    track: 'crud',
    title: 'Hela CRUD:en',
    xp: 30,
    description:
      'Nu sätter du ihop allt: ett API för anteckningar med alla fem vägarna.',
    explain:
      'Fem vägar, en hjälpfunktion och två modeller. Det här är ryggraden i nästan varje app: en anteckningsapp, en att-göra-lista, en bokhylla.\n\nBörja med `hitta(id)` och modellerna, och lägg sedan till en väg i taget. Testa varje väg med 📮 innan du går vidare.',
    example: '# GET /x, GET /x/{id}, POST /x, PATCH /x/{id}, DELETE /x/{id}',
    task: 'Uppgift: Anteckningar har `id`, `text` och `viktig` (bool, standard False). Gör `GET /anteckningar`, `GET /anteckningar/{id}`, `POST /anteckningar` (201, nytt id), `PATCH /anteckningar/{id}` och `DELETE /anteckningar/{id}` (204). Okända id ger 404.',
    starterCode: `${IMPORT}\nANTECKNINGAR = []\n`,
    solution: `${IMPORT}\nANTECKNINGAR = []\n\n\nclass Anteckning(BaseModel):\n    text: str\n    viktig: bool = False\n\n\nclass Andring(BaseModel):\n    text: str | None = None\n    viktig: bool | None = None\n\n\ndef hitta(id):\n    for anteckning in ANTECKNINGAR:\n        if anteckning['id'] == id:\n            return anteckning\n    raise HTTPException(status_code=404, detail='Anteckningen finns inte')\n\n\n@app.get('/anteckningar')\ndef alla():\n    return ANTECKNINGAR\n\n\n@app.get('/anteckningar/{id}')\ndef en(id: int):\n    return hitta(id)\n\n\n@app.post('/anteckningar', status_code=201)\ndef ny(anteckning: Anteckning):\n    nytt_id = max((a['id'] for a in ANTECKNINGAR), default=0) + 1\n    sparad = {'id': nytt_id, **anteckning.model_dump()}\n    ANTECKNINGAR.append(sparad)\n    return sparad\n\n\n@app.patch('/anteckningar/{id}')\ndef andra(id: int, andring: Andring):\n    anteckning = hitta(id)\n    anteckning.update(andring.model_dump(exclude_unset=True))\n    return anteckning\n\n\n@app.delete('/anteckningar/{id}', status_code=204)\ndef ta_bort(id: int):\n    ANTECKNINGAR.remove(hitta(id))\n`,
    hints: [
      'Börja med modellerna Anteckning och Andring, och hitta(id).',
      'POST räknar ut id som i första övningen. PATCH använder exclude_unset=True.',
      'DELETE har status_code=204 och ANTECKNINGAR.remove(hitta(id)).',
    ],
    tests: [
      {
        description: 'Skapa',
        code: "__post('/anteckningar', {'text': 'Ring mormor'}).json",
        expected: { id: 1, text: 'Ring mormor', viktig: false },
      },
      {
        description: 'Skapa en till ger 201',
        code: "__post('/anteckningar', {'text': 'Betala hyran', 'viktig': True}).status",
        expected: 201,
      },
      {
        description: 'Hämta en',
        code: "__get('/anteckningar/2').json['text']",
        expected: 'Betala hyran',
      },
      {
        description: 'Ändra',
        code: "__patch('/anteckningar/1', {'viktig': True}).json",
        expected: { id: 1, text: 'Ring mormor', viktig: true },
      },
      {
        description: 'Ta bort',
        code: "__delete('/anteckningar/1').status",
        expected: 204,
      },
      {
        description: 'Kvar finns en',
        code: "[a['id'] for a in __get('/anteckningar').json]",
        expected: [2],
      },
      {
        description: 'Okänt id ger 404',
        code: "[__get('/anteckningar/1').status, __patch('/anteckningar/1', {}).status, __delete('/anteckningar/1').status]",
        expected: [404, 404, 404],
      },
    ],
    request: {
      method: 'POST',
      path: '/anteckningar',
      body: '{"text": "Ring mormor"}',
    },
  },
];
