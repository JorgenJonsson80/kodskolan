// En boss per bana: en större uppgift som använder allt från banan, utan
// ledtrådar. Banan räknas inte som klar förrän bossen är besegrad.
// index.js lägger varje boss sist i sin bana.
import { KUNSKAPSBANKEN } from './slutprojekt';

const BOSS_INTRO = 'Bossen har inga ledtrådar – visa vad du kan! ';

// Slutbossen börjar med hela Kunskapsbanken, men AI:n hänger sig på frågor
// om något långsamt, och det finns en logg att fylla.
const BANKEN_START = KUNSKAPSBANKEN.replace(
  'from fastapi import FastAPI, HTTPException, Depends, Header',
  'from fastapi import FastAPI, HTTPException, Depends, Header, BackgroundTasks',
)
  .replace('ARTIKLAR = []\n', 'ARTIKLAR = []\nFRAGELOGG = []\n')
  .replace(
    '    async def svara(self, fraga, kontext):\n        await asyncio.sleep(2)',
    "    async def svara(self, fraga, kontext):\n        await asyncio.sleep(5 if 'långsam' in fraga.lower() else 2)",
  );

const FRAGA_FORE = `@app.post('/fraga')
async def fraga(f: Fraga, ai=Depends(hamta_ai)):
    if not ARTIKLAR:
        raise HTTPException(status_code=404, detail='Hittar inget om det')
    basta = max(ARTIKLAR, key=lambda a: poang(f.fraga, a))
    if poang(f.fraga, basta) == 0:
        raise HTTPException(status_code=404, detail='Hittar inget om det')
    svar = await ai.svara(f.fraga, basta['text'])
    return {'svar': svar, 'kalla': basta['id']}
`;

const FRAGA_EFTER = `def logga(fraga, kalla):
    FRAGELOGG.append({'fraga': fraga, 'kalla': kalla})


@app.post('/fraga')
async def fraga(f: Fraga, bakgrund: BackgroundTasks, ai=Depends(hamta_ai)):
    if not ARTIKLAR:
        raise HTTPException(status_code=404, detail='Hittar inget om det')
    basta = max(ARTIKLAR, key=lambda a: poang(f.fraga, a))
    if poang(f.fraga, basta) == 0:
        raise HTTPException(status_code=404, detail='Hittar inget om det')
    try:
        svar = await asyncio.wait_for(ai.svara(f.fraga, basta['text']), timeout=3)
    except TimeoutError:
        raise HTTPException(status_code=504, detail='AI:n svarar inte')
    bakgrund.add_task(logga, f.fraga, basta['id'])
    return {'svar': svar, 'kalla': basta['id']}


@app.get('/taggar')
def taggar():
    antal = {}
    for artikel in ARTIKLAR:
        for tagg in artikel['taggar']:
            antal[tagg] = antal.get(tagg, 0) + 1
    return dict(sorted(antal.items()))


@app.get('/statistik', dependencies=[Depends(kolla_nyckel)])
def statistik():
    return {'artiklar': len(ARTIKLAR), 'fragor': len(FRAGELOGG)}
`;

const BANKEN_FYLL =
  "[__post('/artiklar', a, {'x-api-nyckel': 'hemlig'}).status for a in [{'titel': 'Vad är FastAPI?', 'text': 'FastAPI är ett ramverk för API:er i Python. Det använder typer.', 'taggar': ['python', 'api']}, {'titel': 'Om Pydantic', 'text': 'Pydantic kontrollerar data med modeller. Fel ger 422.', 'taggar': ['python']}, {'titel': 'Async', 'text': 'Med async kan servern vänta på många saker samtidigt. Gather hjälper.', 'taggar': ['async']}]]";

export const BOSSES = {
  forsta: {
    id: 'fa-forsta-boss',
    track: 'forsta',
    title: 'Boss: Kaféets API',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Kafé Kod vill att en app ska kunna läsa menyn. Bygg API:et.',
    task: `Uppgift: Bygg API:et.
  1. Appen heter \`'Kafé Kod'\` i dokumentationen.
  2. \`/\` svarar \`{'namn': 'Kafé Kod', 'oppet': True}\`.
  3. \`/meny\` svarar med hela \`MENY\`.
  4. \`/billigast\` svarar med den billigaste saken i \`MENY\`, t.ex. \`{'namn': 'Te', 'pris': 25}\`. Räkna ut den – menyn kan ändras.`,
    starterCode:
      "from fastapi import FastAPI\n\nMENY = [\n    {'namn': 'Kaffe', 'pris': 30},\n    {'namn': 'Te', 'pris': 25},\n    {'namn': 'Bulle', 'pris': 35},\n]\n",
    solution:
      "from fastapi import FastAPI\n\nMENY = [\n    {'namn': 'Kaffe', 'pris': 30},\n    {'namn': 'Te', 'pris': 25},\n    {'namn': 'Bulle', 'pris': 35},\n]\n\napp = FastAPI(title='Kafé Kod')\n\n\n@app.get('/')\ndef start():\n    return {'namn': 'Kafé Kod', 'oppet': True}\n\n\n@app.get('/meny')\ndef meny():\n    return MENY\n\n\n@app.get('/billigast')\ndef billigast():\n    basta = MENY[0]\n    for sak in MENY:\n        if sak['pris'] < basta['pris']:\n            basta = sak\n    return basta\n",
    hints: [],
    tests: [
      {
        description: 'Appen heter Kafé Kod',
        code: "__openapi()['info']['title']",
        expected: 'Kafé Kod',
      },
      {
        description: 'Startsidan',
        code: "__get('/').json",
        expected: { namn: 'Kafé Kod', oppet: true },
      },
      {
        description: 'Menyn',
        code: "__get('/meny').json",
        expected: [
          { namn: 'Kaffe', pris: 30 },
          { namn: 'Te', pris: 25 },
          { namn: 'Bulle', pris: 35 },
        ],
      },
      {
        description: 'Det billigaste',
        code: "__get('/billigast').json",
        expected: { namn: 'Te', pris: 25 },
      },
      {
        description: 'Det billigaste, när menyn ändrats',
        code: "(MENY.append({'namn': 'Vatten', 'pris': 5}), __get('/billigast').json)[1]",
        expected: { namn: 'Vatten', pris: 5 },
      },
      {
        description: 'POST /meny ger 405',
        code: "__post('/meny').status",
        expected: 405,
      },
    ],
    request: { path: '/billigast' },
  },
  vagar: {
    id: 'fa-vagar-boss',
    track: 'vagar',
    title: 'Boss: Bibliotekets adresser',
    isBoss: true,
    xp: 50,
    description:
      BOSS_INTRO +
      'Biblioteket vill att appen ska kunna hämta böcker på flera sätt.',
    task: `Uppgift: Bygg vägarna.
  1. \`/bocker/{id}\` (heltal) svarar med boken, eller \`{'fel': 'Boken finns inte'}\`.
  2. \`/forfattare/{namn}\` svarar med en lista med titlarna av den författaren, t.ex. \`['Pippi Långstrump', 'Emil i Lönneberga']\`. Stora och små bokstäver ska inte spela roll.
  3. \`/forfattare/okand\` svarar \`{'antal': 0}\` – den ska stå före vägen ovan.
  4. \`/bocker/{id}/titel\` svarar med bara titeln som text.`,
    starterCode:
      "from fastapi import FastAPI\n\napp = FastAPI()\n\nBOCKER = [\n    {'id': 1, 'titel': 'Pippi Långstrump', 'forfattare': 'Astrid Lindgren'},\n    {'id': 2, 'titel': 'Mumintrollet', 'forfattare': 'Tove Jansson'},\n    {'id': 3, 'titel': 'Emil i Lönneberga', 'forfattare': 'Astrid Lindgren'},\n]\n",
    solution:
      "from fastapi import FastAPI\n\napp = FastAPI()\n\nBOCKER = [\n    {'id': 1, 'titel': 'Pippi Långstrump', 'forfattare': 'Astrid Lindgren'},\n    {'id': 2, 'titel': 'Mumintrollet', 'forfattare': 'Tove Jansson'},\n    {'id': 3, 'titel': 'Emil i Lönneberga', 'forfattare': 'Astrid Lindgren'},\n]\n\n\ndef hitta(id):\n    for bok in BOCKER:\n        if bok['id'] == id:\n            return bok\n    return None\n\n\n@app.get('/bocker/{id}')\ndef en_bok(id: int):\n    bok = hitta(id)\n    if bok is None:\n        return {'fel': 'Boken finns inte'}\n    return bok\n\n\n@app.get('/bocker/{id}/titel')\ndef titel(id: int):\n    return hitta(id)['titel']\n\n\n@app.get('/forfattare/okand')\ndef okand():\n    return {'antal': 0}\n\n\n@app.get('/forfattare/{namn}')\ndef forfattare(namn: str):\n    return [bok['titel'] for bok in BOCKER if bok['forfattare'].lower() == namn.lower()]\n",
    hints: [],
    tests: [
      {
        description: '/bocker/2',
        code: "__get('/bocker/2').json['titel']",
        expected: 'Mumintrollet',
      },
      {
        description: '/bocker/7 finns inte',
        code: "__get('/bocker/7').json",
        expected: { fel: 'Boken finns inte' },
      },
      {
        description: '/bocker/ett ger 422',
        code: "__get('/bocker/ett').status",
        expected: 422,
      },
      {
        description: '/forfattare/Astrid Lindgren',
        code: "__get('/forfattare/Astrid Lindgren').json",
        expected: ['Pippi Långstrump', 'Emil i Lönneberga'],
      },
      {
        description: '/forfattare/tove jansson (små bokstäver)',
        code: "__get('/forfattare/tove jansson').json",
        expected: ['Mumintrollet'],
      },
      {
        description: '/forfattare/okand',
        code: "__get('/forfattare/okand').json",
        expected: { antal: 0 },
      },
      {
        description: '/bocker/1/titel',
        code: "__get('/bocker/1/titel').json",
        expected: 'Pippi Långstrump',
      },
    ],
    request: { path: '/forfattare/Astrid Lindgren' },
  },
  fragor: {
    id: 'fa-fragor-boss',
    track: 'fragor',
    title: 'Boss: Väderstationen',
    isBoss: true,
    xp: 50,
    description:
      BOSS_INTRO +
      'Väderstationen har mätt temperaturen i flera städer. Gör ett API där man kan söka bland mätningarna.',
    task: `Uppgift: Bygg \`/matningar\` med frågorna:
  1. \`stad\` (valfri): bara mätningar från den staden.
  2. \`min_grader\` (decimaltal, valfri): bara mätningar med minst så många grader.
  3. \`varmast_forst\` (bool, standard False): sortera efter grader, varmast först. Annars i ordningen de står.
  4. \`antal\` (heltal, standard 10): högst så många mätningar.
Alla filter ska gå att kombinera. Gör också \`/stader\` som svarar med städerna i bokstavsordning, utan dubbletter.`,
    starterCode:
      "from fastapi import FastAPI\n\napp = FastAPI()\n\nMATNINGAR = [\n    {'stad': 'Kiruna', 'grader': -12.5},\n    {'stad': 'Malmö', 'grader': 4.0},\n    {'stad': 'Göteborg', 'grader': 6.5},\n    {'stad': 'Malmö', 'grader': 7.5},\n    {'stad': 'Kiruna', 'grader': -8.0},\n    {'stad': 'Göteborg', 'grader': 3.0},\n]\n",
    solution:
      "from fastapi import FastAPI\n\napp = FastAPI()\n\nMATNINGAR = [\n    {'stad': 'Kiruna', 'grader': -12.5},\n    {'stad': 'Malmö', 'grader': 4.0},\n    {'stad': 'Göteborg', 'grader': 6.5},\n    {'stad': 'Malmö', 'grader': 7.5},\n    {'stad': 'Kiruna', 'grader': -8.0},\n    {'stad': 'Göteborg', 'grader': 3.0},\n]\n\n\n@app.get('/matningar')\ndef matningar(\n    stad: str | None = None,\n    min_grader: float | None = None,\n    varmast_forst: bool = False,\n    antal: int = 10,\n):\n    svar = MATNINGAR\n    if stad is not None:\n        svar = [m for m in svar if m['stad'] == stad]\n    if min_grader is not None:\n        svar = [m for m in svar if m['grader'] >= min_grader]\n    if varmast_forst:\n        svar = sorted(svar, key=lambda m: m['grader'], reverse=True)\n    return svar[:antal]\n\n\n@app.get('/stader')\ndef stader():\n    return sorted(set(m['stad'] for m in MATNINGAR))\n",
    hints: [],
    tests: [
      {
        description: '/matningar ger alla sex',
        code: "len(__get('/matningar').json)",
        expected: 6,
      },
      {
        description: '/matningar?stad=Malmö',
        code: "[m['grader'] for m in __get('/matningar?stad=Malmö').json]",
        expected: [4.0, 7.5],
      },
      {
        description: '/matningar?min_grader=0',
        code: "len(__get('/matningar?min_grader=0').json)",
        expected: 4,
      },
      {
        description: 'Varmast först, två stycken',
        code: "__get('/matningar?varmast_forst=true&antal=2').json",
        expected: [
          { stad: 'Malmö', grader: 7.5 },
          { stad: 'Göteborg', grader: 6.5 },
        ],
      },
      {
        description: 'Alla filter tillsammans',
        code: "__get('/matningar?stad=Göteborg&min_grader=4&varmast_forst=true').json",
        expected: [{ stad: 'Göteborg', grader: 6.5 }],
      },
      {
        description: '/matningar?antal=noll ger 422',
        code: "__get('/matningar?antal=noll').status",
        expected: 422,
      },
      {
        description: '/stader',
        code: "__get('/stader').json",
        expected: ['Göteborg', 'Kiruna', 'Malmö'],
      },
    ],
    request: { path: '/matningar?varmast_forst=true&antal=3' },
  },
  modeller: {
    id: 'fa-modeller-boss',
    track: 'modeller',
    title: 'Boss: Bordsbokningen',
    isBoss: true,
    xp: 60,
    description:
      BOSS_INTRO +
      'Restaurang Smak vill ta emot bordsbokningar via sin app. Bygg API:et som kontrollerar och sparar dem.',
    task: `Uppgift: Bygg bokningarna.
  1. Modellen \`Gast\` har \`namn\` (1–40 tecken) och \`telefon\` (text).
  2. Modellen \`Bokning\` har \`gast\` (en \`Gast\`), \`personer\` (1–8), \`tid\` (text, t.ex. \`'18:30'\`) och \`onskemal\` (lista med texter, tom om inget skickas).
  3. \`POST /bokningar\` sparar bokningen i \`BOKNINGAR\` och svarar med den, plus \`'nummer'\`: 1 för den första, 2 för nästa …
  4. \`GET /bokningar\` svarar med alla bokningar.
  5. \`GET /platser\` svarar \`{'bokade': …}\` med hur många personer som är bokade totalt.`,
    starterCode:
      'from fastapi import FastAPI\nfrom pydantic import BaseModel, Field\n\napp = FastAPI()\n\nBOKNINGAR = []\n',
    solution:
      "from fastapi import FastAPI\nfrom pydantic import BaseModel, Field\n\napp = FastAPI()\n\nBOKNINGAR = []\n\n\nclass Gast(BaseModel):\n    namn: str = Field(min_length=1, max_length=40)\n    telefon: str\n\n\nclass Bokning(BaseModel):\n    gast: Gast\n    personer: int = Field(ge=1, le=8)\n    tid: str\n    onskemal: list[str] = []\n\n\n@app.post('/bokningar')\ndef boka(bokning: Bokning):\n    ny = {'nummer': len(BOKNINGAR) + 1, **bokning.model_dump()}\n    BOKNINGAR.append(ny)\n    return ny\n\n\n@app.get('/bokningar')\ndef alla():\n    return BOKNINGAR\n\n\n@app.get('/platser')\ndef platser():\n    return {'bokade': sum(b['personer'] for b in BOKNINGAR)}\n",
    hints: [],
    tests: [
      {
        description: 'En bokning',
        code: "__post('/bokningar', {'gast': {'namn': 'Ada', 'telefon': '070-1'}, 'personer': 2, 'tid': '18:30'}).json",
        expected: {
          nummer: 1,
          gast: { namn: 'Ada', telefon: '070-1' },
          personer: 2,
          tid: '18:30',
          onskemal: [],
        },
      },
      {
        description: 'Nästa bokning får nummer 2',
        code: "__post('/bokningar', {'gast': {'namn': 'Bo', 'telefon': '070-2'}, 'personer': 4, 'tid': '19:00', 'onskemal': ['fönsterbord']}).json['nummer']",
        expected: 2,
      },
      {
        description: '9 personer ger 422',
        code: "__post('/bokningar', {'gast': {'namn': 'Cy', 'telefon': '070-3'}, 'personer': 9, 'tid': '20:00'}).status",
        expected: 422,
      },
      {
        description: 'Gäst utan telefon ger 422',
        code: "__post('/bokningar', {'gast': {'namn': 'Cy'}, 'personer': 2, 'tid': '20:00'}).status",
        expected: 422,
      },
      {
        description: 'GET /bokningar har två',
        code: "len(__get('/bokningar').json)",
        expected: 2,
      },
      {
        description: '/platser',
        code: "__get('/platser').json",
        expected: { bokade: 6 },
      },
    ],
    request: {
      method: 'POST',
      path: '/bokningar',
      body: '{"gast": {"namn": "Ada", "telefon": "070-1"}, "personer": 2, "tid": "18:30"}',
    },
  },
  svar: {
    id: 'fa-svar-boss',
    track: 'svar',
    title: 'Boss: Bibliotekets lån',
    isBoss: true,
    xp: 60,
    description:
      BOSS_INTRO +
      'Biblioteket ska låna ut böcker via appen. Varje fel ska ha rätt statuskod.',
    task: `Uppgift: Bygg lånen.
  1. \`POST /lan\` tar emot \`bok_id\` (heltal), \`namn\` och \`personnummer\`. Den svarar 201 med lånet.
  2. Finns boken inte i \`BOCKER\`: 404 med \`detail\` \`'Boken finns inte'\`.
  3. Är boken redan utlånad: 409 med \`detail\` \`'Boken är utlånad'\`.
  4. Personnumret får aldrig synas i något svar. Gör en modell \`LanUt\` med \`bok_id\` och \`namn\`.
  5. \`GET /lan\` svarar med alla lån (utan personnummer).`,
    starterCode:
      "from fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nBOCKER = {1: 'Pippi Långstrump', 2: 'Mumintrollet', 3: 'Emil i Lönneberga'}\nLAN = []\n",
    solution:
      "from fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nBOCKER = {1: 'Pippi Långstrump', 2: 'Mumintrollet', 3: 'Emil i Lönneberga'}\nLAN = []\n\n\nclass LanIn(BaseModel):\n    bok_id: int\n    namn: str\n    personnummer: str\n\n\nclass LanUt(BaseModel):\n    bok_id: int\n    namn: str\n\n\n@app.post('/lan', status_code=201, response_model=LanUt)\ndef lana(lan: LanIn):\n    if lan.bok_id not in BOCKER:\n        raise HTTPException(status_code=404, detail='Boken finns inte')\n    if any(l['bok_id'] == lan.bok_id for l in LAN):\n        raise HTTPException(status_code=409, detail='Boken är utlånad')\n    LAN.append(lan.model_dump())\n    return lan\n\n\n@app.get('/lan', response_model=list[LanUt])\ndef alla_lan():\n    return LAN\n",
    hints: [],
    tests: [
      {
        description: 'Ett lån ger 201',
        code: "__post('/lan', {'bok_id': 2, 'namn': 'Ada', 'personnummer': '20100101-1234'}).status",
        expected: 201,
      },
      {
        description: 'Svaret har inget personnummer',
        code: "__post('/lan', {'bok_id': 1, 'namn': 'Bo', 'personnummer': '20090202-2345'}).json",
        expected: { bok_id: 1, namn: 'Bo' },
      },
      {
        description: 'Utlånad bok ger 409',
        code: "__post('/lan', {'bok_id': 2, 'namn': 'Cy', 'personnummer': '1'}).status",
        expected: 409,
      },
      {
        description: 'Okänd bok ger 404',
        code: "__post('/lan', {'bok_id': 9, 'namn': 'Cy', 'personnummer': '1'}).json",
        expected: { detail: 'Boken finns inte' },
      },
      {
        description: 'GET /lan utan personnummer',
        code: "__get('/lan').json",
        expected: [
          { bok_id: 2, namn: 'Ada' },
          { bok_id: 1, namn: 'Bo' },
        ],
      },
    ],
    request: {
      method: 'POST',
      path: '/lan',
      body: '{"bok_id": 2, "namn": "Ada", "personnummer": "20100101-1234"}',
    },
  },
  crud: {
    id: 'fa-crud-boss',
    track: 'crud',
    title: 'Boss: Receptboken',
    isBoss: true,
    xp: 70,
    description:
      BOSS_INTRO + 'Bygg ett helt API för en receptbok, med ingredienser.',
    task: `Uppgift: Recept har \`id\`, \`namn\`, \`portioner\` (1–20) och \`ingredienser\` (lista med texter).
  1. \`GET /recept\` svarar med alla. Med frågan \`?ingrediens=ägg\` bara de som innehåller den.
  2. \`GET /recept/{id}\`, och 404 med \`detail\` \`'Receptet finns inte'\` för okända id – på alla vägar med id.
  3. \`POST /recept\` (201) ger ett nytt id. Ett namn som redan finns ger 409.
  4. \`PATCH /recept/{id}\` ändrar bara det som skickas.
  5. \`DELETE /recept/{id}\` (204).
  6. \`POST /recept/{id}/ingredienser\` tar emot \`{'namn': …}\` och lägger till ingrediensen (201).`,
    starterCode:
      "from fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel, Field\n\napp = FastAPI()\n\nRECEPT = [\n    {'id': 1, 'namn': 'Pannkakor', 'portioner': 4, 'ingredienser': ['mjölk', 'mjöl', 'ägg']},\n    {'id': 2, 'namn': 'Tomatsoppa', 'portioner': 2, 'ingredienser': ['tomat', 'lök']},\n]\n",
    solution:
      "from fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel, Field\n\napp = FastAPI()\n\nRECEPT = [\n    {'id': 1, 'namn': 'Pannkakor', 'portioner': 4, 'ingredienser': ['mjölk', 'mjöl', 'ägg']},\n    {'id': 2, 'namn': 'Tomatsoppa', 'portioner': 2, 'ingredienser': ['tomat', 'lök']},\n]\n\n\nclass Recept(BaseModel):\n    namn: str\n    portioner: int = Field(ge=1, le=20)\n    ingredienser: list[str] = []\n\n\nclass Andring(BaseModel):\n    namn: str | None = None\n    portioner: int | None = Field(default=None, ge=1, le=20)\n    ingredienser: list[str] | None = None\n\n\nclass Ingrediens(BaseModel):\n    namn: str\n\n\ndef hitta(id):\n    for recept in RECEPT:\n        if recept['id'] == id:\n            return recept\n    raise HTTPException(status_code=404, detail='Receptet finns inte')\n\n\n@app.get('/recept')\ndef alla(ingrediens: str | None = None):\n    if ingrediens is None:\n        return RECEPT\n    return [r for r in RECEPT if ingrediens in r['ingredienser']]\n\n\n@app.get('/recept/{id}')\ndef ett(id: int):\n    return hitta(id)\n\n\n@app.post('/recept', status_code=201)\ndef nytt(recept: Recept):\n    if any(r['namn'] == recept.namn for r in RECEPT):\n        raise HTTPException(status_code=409, detail='Receptet finns redan')\n    nytt_id = max((r['id'] for r in RECEPT), default=0) + 1\n    sparat = {'id': nytt_id, **recept.model_dump()}\n    RECEPT.append(sparat)\n    return sparat\n\n\n@app.patch('/recept/{id}')\ndef andra(id: int, andring: Andring):\n    recept = hitta(id)\n    recept.update(andring.model_dump(exclude_unset=True))\n    return recept\n\n\n@app.delete('/recept/{id}', status_code=204)\ndef ta_bort(id: int):\n    RECEPT.remove(hitta(id))\n\n\n@app.post('/recept/{id}/ingredienser', status_code=201)\ndef ny_ingrediens(id: int, ingrediens: Ingrediens):\n    recept = hitta(id)\n    recept['ingredienser'].append(ingrediens.namn)\n    return recept\n",
    hints: [],
    tests: [
      {
        description: 'Recept med ägg',
        code: "[r['namn'] for r in __get('/recept?ingrediens=ägg').json]",
        expected: ['Pannkakor'],
      },
      {
        description: 'Nytt recept',
        code: "__post('/recept', {'namn': 'Omelett', 'portioner': 1, 'ingredienser': ['ägg']}).json",
        expected: {
          id: 3,
          namn: 'Omelett',
          portioner: 1,
          ingredienser: ['ägg'],
        },
      },
      {
        description: 'Samma namn ger 409',
        code: "__post('/recept', {'namn': 'Omelett', 'portioner': 2}).status",
        expected: 409,
      },
      {
        description: '21 portioner ger 422',
        code: "__post('/recept', {'namn': 'Fest', 'portioner': 21}).status",
        expected: 422,
      },
      {
        description: 'PATCH portioner',
        code: "__patch('/recept/2', {'portioner': 6}).json",
        expected: {
          id: 2,
          namn: 'Tomatsoppa',
          portioner: 6,
          ingredienser: ['tomat', 'lök'],
        },
      },
      {
        description: 'Lägg till ingrediens',
        code: "(lambda s: [s.status, s.json['ingredienser']])(__post('/recept/2/ingredienser', {'namn': 'basilika'}))",
        expected: [201, ['tomat', 'lök', 'basilika']],
      },
      {
        description: 'Ta bort ger 204',
        code: "__delete('/recept/1').status",
        expected: 204,
      },
      {
        description: '404 på alla vägar med id',
        code: "[__get('/recept/1').status, __patch('/recept/1', {}).status, __delete('/recept/1').status, __post('/recept/1/ingredienser', {'namn': 'x'}).status]",
        expected: [404, 404, 404, 404],
      },
      {
        description: 'Rätt detail',
        code: "__get('/recept/1').json",
        expected: { detail: 'Receptet finns inte' },
      },
    ],
    request: { path: '/recept?ingrediens=ägg' },
  },
  beroenden: {
    id: 'fa-beroenden-boss',
    track: 'beroenden',
    title: 'Boss: Klubbens medlemmar',
    isBoss: true,
    xp: 70,
    description:
      BOSS_INTRO +
      'Schackklubben vill ha ett API för medlemslistan. Alla måste vara inloggade, och bara styrelsen får lägga till medlemmar.',
    task: `Uppgift: Tokens finns i \`TOKENS\` och skickas som \`Authorization: Bearer <token>\`.
  1. Beroendet \`inloggad\` ger användaren, eller 401 (saknas, utan Bearer eller okänd token).
  2. Beroendet \`styrelse\` ger 403 om rollen inte är \`'styrelse'\`.
  3. \`GET /jag\` svarar med den inloggade användaren.
  4. \`GET /medlemmar\` (alla inloggade) svarar med \`MEDLEMMAR\`, med frågorna \`start\` (0) och \`antal\` (10) från ett beroende \`sidor\`.
  5. \`POST /medlemmar\` (bara styrelsen) tar emot \`{'namn': …}\`, lägger till namnet och svarar 201 med namnet: \`{'namn': …}\`.`,
    starterCode:
      "from fastapi import FastAPI, Depends, Header, HTTPException\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nTOKENS = {\n    't1': {'namn': 'Ada', 'roll': 'styrelse'},\n    't2': {'namn': 'Bo', 'roll': 'medlem'},\n}\nMEDLEMMAR = ['Ada', 'Bo', 'Cy', 'Di']\n",
    solution:
      "from fastapi import FastAPI, Depends, Header, HTTPException\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nTOKENS = {\n    't1': {'namn': 'Ada', 'roll': 'styrelse'},\n    't2': {'namn': 'Bo', 'roll': 'medlem'},\n}\nMEDLEMMAR = ['Ada', 'Bo', 'Cy', 'Di']\n\n\nclass Medlem(BaseModel):\n    namn: str\n\n\ndef inloggad(authorization: str | None = Header(default=None)):\n    if authorization is None or not authorization.startswith('Bearer '):\n        raise HTTPException(status_code=401, detail='Logga in först')\n    token = authorization.removeprefix('Bearer ')\n    if token not in TOKENS:\n        raise HTTPException(status_code=401, detail='Okänd token')\n    return TOKENS[token]\n\n\ndef styrelse(anvandare=Depends(inloggad)):\n    if anvandare['roll'] != 'styrelse':\n        raise HTTPException(status_code=403, detail='Bara för styrelsen')\n    return anvandare\n\n\ndef sidor(start: int = 0, antal: int = 10):\n    return {'start': start, 'antal': antal}\n\n\n@app.get('/jag')\ndef jag(anvandare=Depends(inloggad)):\n    return anvandare\n\n\n@app.get('/medlemmar', dependencies=[Depends(inloggad)])\ndef medlemmar(s=Depends(sidor)):\n    return MEDLEMMAR[s['start']:s['start'] + s['antal']]\n\n\n@app.post('/medlemmar', status_code=201, dependencies=[Depends(styrelse)])\ndef ny_medlem(medlem: Medlem):\n    MEDLEMMAR.append(medlem.namn)\n    return medlem\n",
    hints: [],
    tests: [
      {
        description: '/jag som Bo',
        code: "__get('/jag', {'authorization': 'Bearer t2'}).json",
        expected: { namn: 'Bo', roll: 'medlem' },
      },
      {
        description: '/medlemmar utan inloggning: 401',
        code: "__get('/medlemmar').status",
        expected: 401,
      },
      {
        description: '/medlemmar med token utan Bearer: 401',
        code: "__get('/medlemmar', {'authorization': 't2'}).status",
        expected: 401,
      },
      {
        description: '/medlemmar?start=1&antal=2 som Bo',
        code: "__get('/medlemmar?start=1&antal=2', {'authorization': 'Bearer t2'}).json",
        expected: ['Bo', 'Cy'],
      },
      {
        description: 'Bo får inte lägga till: 403',
        code: "__post('/medlemmar', {'namn': 'Ed'}, {'authorization': 'Bearer t2'}).status",
        expected: 403,
      },
      {
        description: 'Ada lägger till Ed',
        code: "(lambda s: [s.status, s.json])(__post('/medlemmar', {'namn': 'Ed'}, {'authorization': 'Bearer t1'}))",
        expected: [201, { namn: 'Ed' }],
      },
      {
        description: 'Ed finns sist',
        code: "__get('/medlemmar', {'authorization': 'Bearer t1'}).json[-1]",
        expected: 'Ed',
      },
    ],
    request: { path: '/medlemmar', headers: { authorization: 'Bearer t2' } },
  },
  databas: {
    id: 'fa-databas-boss',
    track: 'databas',
    title: 'Boss: Filmklubbens databas',
    isBoss: true,
    xp: 80,
    description:
      BOSS_INTRO +
      'Filmklubben sparar filmer och betyg i en databas. Bygg API:et ovanpå den.',
    task: `Uppgift: Tabellerna \`filmer\` och \`betyg\` finns. Alla vägar får databasen med \`Depends(hamta_db)\`, och all SQL använder \`?\` för värden.
  1. \`GET /filmer\` svarar med alla filmer: \`id\`, \`titel\`, \`ar\` – sorterade efter år.
  2. \`GET /filmer/{id}\` svarar med filmen plus \`'snittbetyg'\` (medelvärdet av dess betyg, \`None\` om inga finns). Okänd film: 404.
  3. \`POST /filmer\` (201) sparar en film (\`titel\`, \`ar\` mellan 1888 och 2100) och svarar med den och dess id.
  4. \`POST /filmer/{id}/betyg\` (201) sparar ett betyg 1–5 och svarar \`{'film_id': …, 'betyg': …}\`. Okänd film: 404.
  5. \`GET /topplista\` svarar med titel och snittbetyg för filmer med minst ett betyg, bäst först.`,
    starterCode:
      "import sqlite3\n\nfrom fastapi import FastAPI, Depends, HTTPException\nfrom pydantic import BaseModel, Field\n\napp = FastAPI()\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\ncreate table filmer (id integer primary key, titel text, ar integer);\ncreate table betyg (id integer primary key, film_id integer, betyg integer);\ninsert into filmer (titel, ar) values ('Jönssonligan', 1981), ('Mamma Mu', 2008), ('Bröderna Lejonhjärta', 1977);\ninsert into betyg (film_id, betyg) values (1, 4), (1, 5), (3, 5);\n''')\n\n\ndef hamta_db():\n    yield db\n",
    solution:
      "import sqlite3\n\nfrom fastapi import FastAPI, Depends, HTTPException\nfrom pydantic import BaseModel, Field\n\napp = FastAPI()\n\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\ncreate table filmer (id integer primary key, titel text, ar integer);\ncreate table betyg (id integer primary key, film_id integer, betyg integer);\ninsert into filmer (titel, ar) values ('Jönssonligan', 1981), ('Mamma Mu', 2008), ('Bröderna Lejonhjärta', 1977);\ninsert into betyg (film_id, betyg) values (1, 4), (1, 5), (3, 5);\n''')\n\n\ndef hamta_db():\n    yield db\n\n\nclass Film(BaseModel):\n    titel: str\n    ar: int = Field(ge=1888, le=2100)\n\n\nclass Betyg(BaseModel):\n    betyg: int = Field(ge=1, le=5)\n\n\ndef hitta(anslutning, id):\n    rad = anslutning.execute('select id, titel, ar from filmer where id = ?', (id,)).fetchone()\n    if rad is None:\n        raise HTTPException(status_code=404, detail='Filmen finns inte')\n    return dict(rad)\n\n\n@app.get('/filmer')\ndef filmer(anslutning=Depends(hamta_db)):\n    rader = anslutning.execute('select id, titel, ar from filmer order by ar').fetchall()\n    return [dict(rad) for rad in rader]\n\n\n@app.get('/topplista')\ndef topplista(anslutning=Depends(hamta_db)):\n    rader = anslutning.execute('''\n        select filmer.titel, avg(betyg.betyg) as snittbetyg\n        from filmer join betyg on betyg.film_id = filmer.id\n        group by filmer.id\n        order by snittbetyg desc\n    ''').fetchall()\n    return [dict(rad) for rad in rader]\n\n\n@app.get('/filmer/{id}')\ndef en_film(id: int, anslutning=Depends(hamta_db)):\n    film = hitta(anslutning, id)\n    snitt = anslutning.execute('select avg(betyg) from betyg where film_id = ?', (id,)).fetchone()[0]\n    return {**film, 'snittbetyg': snitt}\n\n\n@app.post('/filmer', status_code=201)\ndef ny_film(film: Film, anslutning=Depends(hamta_db)):\n    markor = anslutning.execute('insert into filmer (titel, ar) values (?, ?)', (film.titel, film.ar))\n    anslutning.commit()\n    return {'id': markor.lastrowid, **film.model_dump()}\n\n\n@app.post('/filmer/{id}/betyg', status_code=201)\ndef nytt_betyg(id: int, betyg: Betyg, anslutning=Depends(hamta_db)):\n    hitta(anslutning, id)\n    anslutning.execute('insert into betyg (film_id, betyg) values (?, ?)', (id, betyg.betyg))\n    anslutning.commit()\n    return {'film_id': id, 'betyg': betyg.betyg}\n",
    hints: [],
    tests: [
      {
        description: 'Filmerna efter år',
        code: "[f['titel'] for f in __get('/filmer').json]",
        expected: ['Bröderna Lejonhjärta', 'Jönssonligan', 'Mamma Mu'],
      },
      {
        description: 'En film med snittbetyg',
        code: "__get('/filmer/1').json",
        expected: { id: 1, titel: 'Jönssonligan', ar: 1981, snittbetyg: 4.5 },
      },
      {
        description: 'En film utan betyg',
        code: "__get('/filmer/2').json['snittbetyg']",
        expected: null,
      },
      {
        description: 'Okänd film: 404',
        code: "__get('/filmer/9').status",
        expected: 404,
      },
      {
        description: 'Ny film',
        code: "__post('/filmer', {'titel': 'Ronja Rövardotter', 'ar': 1984}).json",
        expected: { id: 4, titel: 'Ronja Rövardotter', ar: 1984 },
      },
      {
        description: 'År 1700 ger 422',
        code: "__post('/filmer', {'titel': 'Gammal', 'ar': 1700}).status",
        expected: 422,
      },
      {
        description: 'Betyg på Mamma Mu',
        code: "(lambda s: [s.status, s.json])(__post('/filmer/2/betyg', {'betyg': 3}))",
        expected: [201, { film_id: 2, betyg: 3 }],
      },
      {
        description: 'Betyg 6 ger 422',
        code: "__post('/filmer/2/betyg', {'betyg': 6}).status",
        expected: 422,
      },
      {
        description: 'Betyg på okänd film: 404',
        code: "__post('/filmer/9/betyg', {'betyg': 3}).status",
        expected: 404,
      },
      {
        description: 'Topplistan',
        code: "__get('/topplista').json",
        expected: [
          { titel: 'Bröderna Lejonhjärta', snittbetyg: 5.0 },
          { titel: 'Jönssonligan', snittbetyg: 4.5 },
          { titel: 'Mamma Mu', snittbetyg: 3.0 },
        ],
      },
    ],
    sourceChecks: [
      {
        description: 'Alla vägar använder Depends(hamta_db)',
        pattern:
          /^(?![\s\S]*\n@app[^\n]*\ndef \w+\((?![^)]*Depends\(hamta_db\)))/,
      },
    ],
    request: { path: '/filmer/1' },
  },
  async: {
    id: 'fa-async-boss',
    track: 'async',
    title: 'Boss: Reseplaneraren',
    isBoss: true,
    xp: 80,
    description:
      BOSS_INTRO +
      'Reseappen frågar tre långsamma tjänster om varje resa. Gör API:et så snabbt som det går – och låt det klara en tjänst som hänger sig.',
    task: `Uppgift: \`/resa/{stad}\` svarar \`{'stad': …, 'vader': …, 'tag': …, 'hotell': …}\`.
  1. Fråga alla tre tjänsterna samtidigt.
  2. Hotelltjänsten får ta högst 2 sekunder. Tar den längre blir \`'hotell'\` \`None\` – resten av svaret ska ändå komma.
  3. Hela anropet ska ta 2 sekunder (tågtjänsten tar 2).
  4. \`/resor?stader=Lund,Umeå\` svarar med en lista med resor för alla städer (åtskilda med komma), också samtidigt.`,
    starterCode:
      "import asyncio\n\nfrom fastapi import FastAPI\n\napp = FastAPI()\n\n\nasync def vader(stad):\n    await asyncio.sleep(1)\n    return 'sol'\n\n\nasync def tag(stad):\n    await asyncio.sleep(2)\n    return f'Tåg till {stad} 08:15'\n\n\nasync def hotell(stad):\n    # Hotelltjänsten hänger sig för städer som börjar på U.\n    await asyncio.sleep(10 if stad.startswith('U') else 1.5)\n    return f'Hotell {stad}'\n",
    solution:
      "import asyncio\n\nfrom fastapi import FastAPI\n\napp = FastAPI()\n\n\nasync def vader(stad):\n    await asyncio.sleep(1)\n    return 'sol'\n\n\nasync def tag(stad):\n    await asyncio.sleep(2)\n    return f'Tåg till {stad} 08:15'\n\n\nasync def hotell(stad):\n    # Hotelltjänsten hänger sig för städer som börjar på U.\n    await asyncio.sleep(10 if stad.startswith('U') else 1.5)\n    return f'Hotell {stad}'\n\n\nasync def hotell_eller_inget(stad):\n    try:\n        return await asyncio.wait_for(hotell(stad), timeout=2)\n    except TimeoutError:\n        return None\n\n\nasync def planera(stad):\n    v, t, h = await asyncio.gather(vader(stad), tag(stad), hotell_eller_inget(stad))\n    return {'stad': stad, 'vader': v, 'tag': t, 'hotell': h}\n\n\n@app.get('/resa/{stad}')\nasync def resa(stad: str):\n    return await planera(stad)\n\n\n@app.get('/resor')\nasync def resor(stader: str):\n    return await asyncio.gather(*[planera(stad) for stad in stader.split(',')])\n",
    hints: [],
    tests: [
      {
        description: '/resa/Lund',
        code: "__get('/resa/Lund').json",
        expected: {
          stad: 'Lund',
          vader: 'sol',
          tag: 'Tåg till Lund 08:15',
          hotell: 'Hotell Lund',
        },
      },
      {
        description: 'Tar två sekunder',
        code: "__tid('/resa/Lund')",
        expected: 2,
      },
      {
        description: 'Umeå: hotellet hänger sig',
        code: "__get('/resa/Umeå').json['hotell']",
        expected: null,
      },
      {
        description: 'Umeå tar också två sekunder',
        code: "__tid('/resa/Umeå')",
        expected: 2,
      },
      {
        description: '/resor?stader=Lund,Umeå',
        code: "[r['stad'] for r in __get('/resor?stader=Lund,Umeå').json]",
        expected: ['Lund', 'Umeå'],
      },
      {
        description: 'Två resor på två sekunder',
        code: "__tid('/resor?stader=Lund,Umeå,Kiruna')",
        expected: 2,
      },
    ],
    request: { path: '/resa/Umeå' },
  },
  felsok: {
    id: 'fa-felsok-boss',
    track: 'felsok',
    title: 'Boss: Fyra fel i gymmet',
    isBoss: true,
    xp: 80,
    description:
      BOSS_INTRO +
      'Gymmets boknings-API har fyra fel. Hitta och laga alla – utan att ändra vad API:et ska göra.',
    task: `Uppgift: Så här ska API:et fungera:
  1. \`GET /pass\` svarar med alla pass.
  2. \`GET /pass/{id}\` svarar med passet, eller 404.
  3. \`POST /pass/{id}/boka\` tar emot \`{'namn': …}\`, lägger till namnet i passets \`bokade\` och svarar 201 med passet. Fullt pass (lika många bokade som \`platser\`) ger 409.
  4. Ingen får boka samma pass två gånger: 409.`,
    starterCode:
      "from fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nPASS = [\n    {'id': 1, 'namn': 'Yoga', 'platser': 2, 'bokade': []},\n    {'id': 2, 'namn': 'Spinning', 'platser': 3, 'bokade': ['Bo']},\n]\n\n\nclass Bokning(BaseModel):\n    namn: str\n\n\ndef hitta(id):\n    for p in PASS:\n        if p['id'] == id:\n            return p\n    return {'fel': 'Passet finns inte'}\n\n\n@app.get('/pass')\ndef alla():\n    return PASS\n\n\n@app.get('/pass/{id}')\ndef ett(id):\n    return hitta(id)\n\n\n@app.post('/pass/{id}/boka', status_code=201)\ndef boka(id: int, bokning: Bokning):\n    p = hitta(id)\n    if len(p['bokade']) > p['platser']:\n        raise HTTPException(status_code=409, detail='Passet är fullt')\n    p['bokade'].append(bokning.namn)\n    return p\n",
    solution:
      "from fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nPASS = [\n    {'id': 1, 'namn': 'Yoga', 'platser': 2, 'bokade': []},\n    {'id': 2, 'namn': 'Spinning', 'platser': 3, 'bokade': ['Bo']},\n]\n\n\nclass Bokning(BaseModel):\n    namn: str\n\n\ndef hitta(id):\n    for p in PASS:\n        if p['id'] == id:\n            return p\n    raise HTTPException(status_code=404, detail='Passet finns inte')\n\n\n@app.get('/pass')\ndef alla():\n    return PASS\n\n\n@app.get('/pass/{id}')\ndef ett(id: int):\n    return hitta(id)\n\n\n@app.post('/pass/{id}/boka', status_code=201)\ndef boka(id: int, bokning: Bokning):\n    p = hitta(id)\n    if len(p['bokade']) >= p['platser']:\n        raise HTTPException(status_code=409, detail='Passet är fullt')\n    if bokning.namn in p['bokade']:\n        raise HTTPException(status_code=409, detail='Du har redan bokat')\n    p['bokade'].append(bokning.namn)\n    return p\n",
    hints: [],
    tests: [
      {
        description: '/pass/1',
        code: "__get('/pass/1').json['namn']",
        expected: 'Yoga',
      },
      {
        description: '/pass/9 ger 404',
        code: "__get('/pass/9').status",
        expected: 404,
      },
      {
        description: 'Ada bokar yoga',
        code: "__post('/pass/1/boka', {'namn': 'Ada'}).json['bokade']",
        expected: ['Ada'],
      },
      {
        description: 'Ada igen ger 409',
        code: "__post('/pass/1/boka', {'namn': 'Ada'}).status",
        expected: 409,
      },
      {
        description: 'Cy bokar sista platsen',
        code: "__post('/pass/1/boka', {'namn': 'Cy'}).status",
        expected: 201,
      },
      {
        description: 'Fullt ger 409',
        code: "__post('/pass/1/boka', {'namn': 'Di'}).status",
        expected: 409,
      },
      {
        description: 'Högst två på yogan',
        code: "PASS[0]['bokade']",
        expected: ['Ada', 'Cy'],
      },
      {
        description: 'Boka okänt pass ger 404',
        code: "__post('/pass/9/boka', {'namn': 'Ada'}).status",
        expected: 404,
      },
    ],
    request: {
      method: 'POST',
      path: '/pass/1/boka',
      body: '{"namn": "Ada"}',
    },
  },
  slutprojekt: {
    id: 'fa-slutprojekt-boss',
    track: 'slutprojekt',
    title: 'Boss: Kunskapsbanken i drift',
    isBoss: true,
    xp: 100,
    description:
      BOSS_INTRO +
      'Kunskapsbanken ska ut till riktiga användare. Den behöver statistik, en logg över frågorna – och klara att AI:n ibland hänger sig.',
    task: `Uppgift: Startkoden är hela Kunskapsbanken. Lägg till:
  1. \`GET /taggar\` svarar med hur många artiklar som har varje tagg, i bokstavsordning: \`{'api': 1, 'async': 1, 'python': 2}\`.
  2. Efter varje besvarad fråga ska \`{'fraga': …, 'kalla': …}\` läggas i \`FRAGELOGG\` – i bakgrunden, så att svaret inte väntar.
  3. AI:n får ta högst 3 sekunder. Annars: 504 med \`detail\` \`'AI:n svarar inte'\`. (Låtsas-AI:n hänger sig på frågor med ordet "långsam".)
  4. \`GET /statistik\` (kräver nyckeln) svarar \`{'artiklar': …, 'fragor': …}\` med antalet besvarade frågor.`,
    starterCode: BANKEN_START,
    solution: BANKEN_START.replace(FRAGA_FORE, FRAGA_EFTER),
    hints: [],
    tests: [
      {
        description: 'Tre artiklar',
        code: BANKEN_FYLL,
        expected: [201, 201, 201],
      },
      {
        description: '/taggar',
        code: "__get('/taggar').json",
        expected: { api: 1, async: 1, python: 2 },
      },
      {
        description: 'En fråga besvaras',
        code: "__post('/fraga', {'fraga': 'Vad gör Pydantic?'}).json['kalla']",
        expected: 2,
      },
      {
        description: 'Frågan är loggad',
        code: 'FRAGELOGG',
        expected: [{ fraga: 'Vad gör Pydantic?', kalla: 2 }],
      },
      {
        description: 'Långsam AI ger 504',
        code: "__post('/fraga', {'fraga': 'Är servern långsam ibland?'}).json",
        expected: { detail: 'AI:n svarar inte' },
      },
      {
        description: 'Efter tre sekunder',
        code: "__tid(lambda: __post('/fraga', {'fraga': 'Är servern långsam ibland?'}))",
        expected: 3,
      },
      {
        description: 'Statistik kräver nyckel',
        code: "__get('/statistik').status",
        expected: 401,
      },
      {
        description: 'Statistik: bara besvarade frågor räknas',
        code: "__get('/statistik', {'x-api-nyckel': 'hemlig'}).json",
        expected: { artiklar: 3, fragor: 1 },
      },
      {
        description: 'Det gamla fungerar fortfarande',
        code: "[__get('/sok?tagg=python').status, __get('/artiklar/1').json['titel']]",
        expected: [200, 'Vad är FastAPI?'],
      },
    ],
    request: {
      method: 'POST',
      path: '/fraga',
      body: '{"fraga": "Är servern långsam ibland?"}',
    },
  },
};
