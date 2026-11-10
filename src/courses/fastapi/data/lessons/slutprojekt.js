// Bana 11: slutprojektet Kunskapsbanken. Ett API för artiklar som byggs
// i steg: varje övning börjar med förra övningens facit. Sist svarar en
// låtsas-AI på frågor med hjälp av artiklarna – en första RAG, som
// AI-kursen bygger vidare på.

const IMPORT = `import asyncio

from fastapi import FastAPI, HTTPException, Depends, Header
from pydantic import BaseModel, Field

app = FastAPI(title='Kunskapsbanken')
ARTIKLAR = []
`;

const MODELL = `

class Artikel(BaseModel):
    titel: str = Field(min_length=1, max_length=80)
    text: str = Field(min_length=1)
    taggar: list[str] = []
`;

const LISTA = `

@app.get('/artiklar')
def alla():
    return ARTIKLAR
`;

const NY = (deps = '') => `

@app.post('/artiklar', status_code=201${deps})
def ny(artikel: Artikel):
    nytt_id = max((a['id'] for a in ARTIKLAR), default=0) + 1
    sparad = {'id': nytt_id, **artikel.model_dump()}
    ARTIKLAR.append(sparad)
    return sparad
`;

const HITTA = `

def hitta(id):
    for artikel in ARTIKLAR:
        if artikel['id'] == id:
            return artikel
    raise HTTPException(status_code=404, detail='Artikeln finns inte')


@app.get('/artiklar/{id}')
def en(id: int):
    return hitta(id)
`;

const SOK = (model = '') => `

@app.get('/sok'${model})
def sok(q: str = '', tagg: str | None = None):
    traffar = [a for a in ARTIKLAR if q.lower() in (a['titel'] + ' ' + a['text']).lower()]
    if tagg is not None:
        traffar = [a for a in traffar if tagg in a['taggar']]
    return traffar
`;

const ANDRA = (deps = '') => `

class Andring(BaseModel):
    titel: str | None = Field(default=None, min_length=1, max_length=80)
    text: str | None = Field(default=None, min_length=1)
    taggar: list[str] | None = None


@app.patch('/artiklar/{id}'${deps})
def andra(id: int, andring: Andring):
    artikel = hitta(id)
    artikel.update(andring.model_dump(exclude_unset=True))
    return artikel


@app.delete('/artiklar/{id}', status_code=204${deps})
def ta_bort(id: int):
    ARTIKLAR.remove(hitta(id))
`;

const NYCKEL = `

def kolla_nyckel(x_api_nyckel: str | None = Header(default=None)):
    if x_api_nyckel != 'hemlig':
        raise HTTPException(status_code=401, detail='Fel nyckel')
`;

const KORT = `

class ArtikelKort(BaseModel):
    id: int
    titel: str
`;

const AI = `

class LatsasAI:
    """Som en riktig språkmodell, fast på låtsas: två sekunder per anrop."""

    async def sammanfatta(self, text):
        await asyncio.sleep(2)
        return text.split('.')[0] + '.'

    async def svara(self, fraga, kontext):
        await asyncio.sleep(2)
        return 'Enligt Kunskapsbanken: ' + kontext.split('.')[0] + '.'


def hamta_ai():
    return LatsasAI()
`;

const SAMMANFATTNING = `

@app.get('/artiklar/{id}/sammanfattning')
async def sammanfattning(id: int, ai=Depends(hamta_ai)):
    artikel = hitta(id)
    return {'id': id, 'sammanfattning': await ai.sammanfatta(artikel['text'])}
`;

const ALLA_SAMMANFATTNINGAR = `

@app.get('/sammanfattningar')
async def sammanfattningar(ai=Depends(hamta_ai)):
    texter = await asyncio.gather(*[ai.sammanfatta(a['text']) for a in ARTIKLAR])
    return [{'id': a['id'], 'sammanfattning': t} for a, t in zip(ARTIKLAR, texter)]
`;

const FRAGA = `

class Fraga(BaseModel):
    fraga: str = Field(min_length=3)


def poang(fraga, artikel):
    ord = [o for o in fraga.lower().replace('?', '').split() if len(o) > 3]
    text = (artikel['titel'] + ' ' + artikel['text']).lower()
    return len([o for o in ord if o in text])


@app.post('/fraga')
async def fraga(f: Fraga, ai=Depends(hamta_ai)):
    if not ARTIKLAR:
        raise HTTPException(status_code=404, detail='Hittar inget om det')
    basta = max(ARTIKLAR, key=lambda a: poang(f.fraga, a))
    if poang(f.fraga, basta) == 0:
        raise HTTPException(status_code=404, detail='Hittar inget om det')
    svar = await ai.svara(f.fraga, basta['text'])
    return {'svar': svar, 'kalla': basta['id']}
`;

const SKRIV = ', dependencies=[Depends(kolla_nyckel)]';

// Stegen, som färdig kod. Varje övnings facit är ett steg, och nästa
// övning börjar där.
const STEG1 = `${IMPORT}${MODELL}${LISTA}${NY()}`;
const STEG2 = `${STEG1}${HITTA}`;
const STEG3 = `${STEG2}${SOK()}`;
const STEG4 = `${STEG3}${ANDRA()}`;
const STEG5 = `${IMPORT}${MODELL}${NYCKEL}${LISTA}${NY(SKRIV)}${HITTA}${SOK()}${ANDRA(SKRIV)}`;
const STEG6 = `${IMPORT}${MODELL}${KORT}${NYCKEL}\n\n@app.get('/artiklar', response_model=list[ArtikelKort])\ndef alla():\n    return ARTIKLAR\n${NY(SKRIV)}${HITTA}${SOK(', response_model=list[ArtikelKort]')}${ANDRA(SKRIV)}`;
const STEG7 = `${STEG6}${AI}${SAMMANFATTNING}`;
const STEG8 = `${STEG7}${ALLA_SAMMANFATTNINGAR}`;
const STEG9 = `${STEG8}${FRAGA}`;

export const KUNSKAPSBANKEN = STEG9;

// Testdata. Med NYC skickas nyckeln med, från steg 5.
const A1 =
  "{'titel': 'Vad är FastAPI?', 'text': 'FastAPI är ett ramverk för API:er i Python. Det använder typer.', 'taggar': ['python', 'api']}";
const A2 =
  "{'titel': 'Om Pydantic', 'text': 'Pydantic kontrollerar data med modeller. Fel ger 422.', 'taggar': ['python']}";
const A3 =
  "{'titel': 'Async', 'text': 'Med async kan servern vänta på många saker samtidigt. Gather hjälper.', 'taggar': ['async']}";
const NYC = "{'x-api-nyckel': 'hemlig'}";
const fyll = (nyckel = '') =>
  `[__post('/artiklar', a${nyckel ? `, ${nyckel}` : ''}).status for a in [${A1}, ${A2}, ${A3}]]`;
const FYLL_TEST = (nyckel = '') => ({
  description: 'Tre artiklar sparas',
  code: fyll(nyckel),
  expected: [201, 201, 201],
});

export const SLUTPROJEKT = [
  {
    id: 'fa-slutprojekt-01',
    track: 'slutprojekt',
    title: 'Kunskapsbanken: modellen',
    xp: 30,
    description:
      'Slutprojektet: ett API för artiklar, som till sist kan svara på frågor med hjälp av en AI. Först modellen och de två första vägarna.',
    explain:
      'Kunskapsbanken byggs i nio steg. Varje steg börjar med koden från förra steget, så att du till slut har ett helt API.\n\nEn artikel har en `titel` (1–80 tecken), en `text` och `taggar` (en lista, tom om inget skickas). Importerna överst innehåller redan allt du kommer att behöva.',
    example:
      "@app.post('/x', status_code=201)\ndef ny(sak: Sak):\n    nytt_id = max((s['id'] for s in SAKER), default=0) + 1\n    ...",
    task: 'Uppgift: Gör modellen `Artikel`, `GET /artiklar` (alla) och `POST /artiklar` (201, nytt id, svarar med den sparade artikeln).',
    starterCode: IMPORT,
    solution: STEG1,
    hints: [
      'titel: str = Field(min_length=1, max_length=80)',
      'taggar: list[str] = []',
      "sparad = {'id': nytt_id, **artikel.model_dump()}",
    ],
    tests: [
      FYLL_TEST(),
      {
        description: 'GET /artiklar',
        code: "[a['id'] for a in __get('/artiklar').json]",
        expected: [1, 2, 3],
      },
      {
        description: 'Utan taggar blir det en tom lista',
        code: "__post('/artiklar', {'titel': 'X', 'text': 'Y'}).json['taggar']",
        expected: [],
      },
      {
        description: 'Tom titel ger 422',
        code: "__post('/artiklar', {'titel': '', 'text': 'Y'}).status",
        expected: 422,
      },
      {
        description: 'Appen heter Kunskapsbanken',
        code: "__openapi()['info']['title']",
        expected: 'Kunskapsbanken',
      },
    ],
    request: {
      method: 'POST',
      path: '/artiklar',
      body: '{"titel": "Vad är FastAPI?", "text": "FastAPI är ett ramverk för API:er i Python.", "taggar": ["python"]}',
    },
  },
  {
    id: 'fa-slutprojekt-02',
    track: 'slutprojekt',
    title: 'Kunskapsbanken: en artikel',
    xp: 30,
    description: 'Hämta en artikel med id, och 404 om den inte finns.',
    explain:
      'Skriv en `hitta(id)` som de kommande stegen också kan använda. Den ger artikeln eller gör raise med 404.',
    example:
      "def hitta(id):\n    ...\n    raise HTTPException(status_code=404, detail='…')",
    task: "Uppgift: Gör `hitta(id)` och `GET /artiklar/{id}`. Okänt id ger 404 med `detail` `'Artikeln finns inte'`.",
    starterCode: STEG1,
    solution: STEG2,
    hints: [
      'Loopa genom ARTIKLAR i hitta.',
      "raise HTTPException(status_code=404, detail='Artikeln finns inte')",
      "@app.get('/artiklar/{id}')\ndef en(id: int):\n    return hitta(id)",
    ],
    tests: [
      FYLL_TEST(),
      {
        description: '/artiklar/2',
        code: "__get('/artiklar/2').json['titel']",
        expected: 'Om Pydantic',
      },
      {
        description: '/artiklar/9',
        code: "__get('/artiklar/9').json",
        expected: { detail: 'Artikeln finns inte' },
      },
    ],
    request: { path: '/artiklar/1' },
  },
  {
    id: 'fa-slutprojekt-03',
    track: 'slutprojekt',
    title: 'Kunskapsbanken: sök',
    xp: 30,
    description: 'Sök i titlar och texter, och filtrera på en tagg.',
    explain:
      "Sökningen ska inte bry sig om stora och små bokstäver: gör om både sökordet och texten med `.lower()`.\n\nSök i titeln och texten på en gång genom att sätta ihop dem: `a['titel'] + ' ' + a['text']`.",
    example:
      "traffar = [a for a in ARTIKLAR if q.lower() in a['text'].lower()]",
    task: "Uppgift: `GET /sok` tar frågorna `q` (standard `''`, alltså allt) och `tagg` (valfri) och svarar med artiklarna som passar.",
    starterCode: STEG2,
    solution: STEG3,
    hints: [
      "def sok(q: str = '', tagg: str | None = None):",
      "q.lower() in (a['titel'] + ' ' + a['text']).lower()",
      "if tagg is not None:\n    traffar = [a for a in traffar if tagg in a['taggar']]",
    ],
    tests: [
      FYLL_TEST(),
      {
        description: '/sok?q=pydantic',
        code: "[a['id'] for a in __get('/sok?q=pydantic').json]",
        expected: [2],
      },
      {
        description: '/sok?tagg=python',
        code: "[a['id'] for a in __get('/sok?tagg=python').json]",
        expected: [1, 2],
      },
      {
        description: '/sok?q=typer&tagg=python',
        code: "[a['id'] for a in __get('/sok?q=typer&tagg=python').json]",
        expected: [1],
      },
      {
        description: '/sok ger alla',
        code: "len(__get('/sok').json)",
        expected: 3,
      },
    ],
    request: { path: '/sok?q=python' },
  },
  {
    id: 'fa-slutprojekt-04',
    track: 'slutprojekt',
    title: 'Kunskapsbanken: ändra och ta bort',
    xp: 30,
    description:
      'PATCH och DELETE, med samma regler för fälten som när artikeln skapades.',
    explain:
      'I `Andring` är alla fält valfria, men reglerna ska gälla när de skickas:\n\n`titel: str | None = Field(default=None, min_length=1, max_length=80)`\n\nKom ihåg `exclude_unset=True`.',
    example:
      "@app.patch('/x/{id}')\ndef andra(id: int, andring: Andring):\n    sak = hitta(id)\n    sak.update(andring.model_dump(exclude_unset=True))\n    return sak",
    task: 'Uppgift: Gör `Andring`, `PATCH /artiklar/{id}` och `DELETE /artiklar/{id}` (204).',
    starterCode: STEG3,
    solution: STEG4,
    hints: [
      'Alla tre fälten i Andring är valfria.',
      'model_dump(exclude_unset=True)',
      "@app.delete('/artiklar/{id}', status_code=204)\ndef ta_bort(id: int):\n    ARTIKLAR.remove(hitta(id))",
    ],
    tests: [
      FYLL_TEST(),
      {
        description: 'Byt taggar på artikel 3',
        code: "__patch('/artiklar/3', {'taggar': ['python', 'async']}).json",
        expected: {
          id: 3,
          titel: 'Async',
          text: 'Med async kan servern vänta på många saker samtidigt. Gather hjälper.',
          taggar: ['python', 'async'],
        },
      },
      {
        description: 'Tom titel ger 422',
        code: "__patch('/artiklar/3', {'titel': ''}).status",
        expected: 422,
      },
      {
        description: 'Ta bort artikel 2',
        code: "__delete('/artiklar/2').status",
        expected: 204,
      },
      {
        description: 'Kvar finns 1 och 3',
        code: "[a['id'] for a in __get('/artiklar').json]",
        expected: [1, 3],
      },
      {
        description: '404 på okänt id',
        code: "[__patch('/artiklar/2', {}).status, __delete('/artiklar/2').status]",
        expected: [404, 404],
      },
    ],
    request: {
      method: 'PATCH',
      path: '/artiklar/1',
      body: '{"taggar": ["python", "nybörjare"]}',
    },
  },
  {
    id: 'fa-slutprojekt-05',
    track: 'slutprojekt',
    title: 'Kunskapsbanken: nyckel för att skriva',
    xp: 30,
    description:
      'Alla får läsa, men bara den med nyckeln får skapa, ändra och ta bort.',
    explain:
      "Läsvägarna (GET) ska vara öppna. Skrivvägarna (POST, PATCH, DELETE) får `dependencies=[Depends(kolla_nyckel)]` i dekoratorn.\n\nNyckeln är `'hemlig'` och skickas i headern `x-api-nyckel`. Saknas den eller är fel: 401.",
    example:
      "@app.post('/x', status_code=201, dependencies=[Depends(kolla_nyckel)])",
    task: 'Uppgift: Skriv `kolla_nyckel` och lägg den på de tre skrivvägarna.',
    starterCode: STEG4,
    solution: STEG5,
    hints: [
      'x_api_nyckel: str | None = Header(default=None)',
      "if x_api_nyckel != 'hemlig':\n    raise HTTPException(status_code=401, detail='Fel nyckel')",
      'dependencies=[Depends(kolla_nyckel)] på POST, PATCH och DELETE.',
    ],
    tests: [
      {
        description: 'POST utan nyckel: 401',
        code: `__post('/artiklar', ${A1}).status`,
        expected: 401,
      },
      FYLL_TEST(NYC),
      {
        description: 'GET utan nyckel går bra',
        code: "len(__get('/artiklar').json)",
        expected: 3,
      },
      {
        description: 'PATCH och DELETE utan nyckel: 401',
        code: "[__patch('/artiklar/1', {'titel': 'X'}).status, __delete('/artiklar/1').status]",
        expected: [401, 401],
      },
      {
        description: 'DELETE med nyckel',
        code: `__delete('/artiklar/1', ${NYC}).status`,
        expected: 204,
      },
    ],
    request: {
      method: 'POST',
      path: '/artiklar',
      body: '{"titel": "Hej", "text": "Utan nyckel."}',
    },
  },
  {
    id: 'fa-slutprojekt-06',
    track: 'slutprojekt',
    title: 'Kunskapsbanken: korta listor',
    xp: 30,
    description:
      'Listorna blir långa om hela texten följer med. Visa bara id och titel – hela artikeln finns på dess egen adress.',
    explain:
      'Gör en modell `ArtikelKort` med `id` och `titel`, och använd `response_model=list[ArtikelKort]` på `GET /artiklar` och `GET /sok`.\n\n`GET /artiklar/{id}` visar fortfarande hela artikeln.',
    example: "@app.get('/x', response_model=list[XKort])",
    task: 'Uppgift: Gör listorna korta.',
    starterCode: STEG5,
    solution: STEG6,
    hints: [
      'class ArtikelKort(BaseModel):\n    id: int\n    titel: str',
      "@app.get('/artiklar', response_model=list[ArtikelKort])",
      "@app.get('/sok', response_model=list[ArtikelKort])",
    ],
    tests: [
      FYLL_TEST(NYC),
      {
        description: '/artiklar är kort',
        code: "__get('/artiklar').json[0]",
        expected: { id: 1, titel: 'Vad är FastAPI?' },
      },
      {
        description: '/sok är kort',
        code: "__get('/sok?q=async').json",
        expected: [{ id: 3, titel: 'Async' }],
      },
      {
        description: '/artiklar/2 är hel',
        code: "sorted(__get('/artiklar/2').json)",
        expected: ['id', 'taggar', 'text', 'titel'],
      },
    ],
    request: { path: '/artiklar' },
  },
  {
    id: 'fa-slutprojekt-07',
    track: 'slutprojekt',
    title: 'Kunskapsbanken: AI-sammanfattning',
    xp: 35,
    description:
      'Nu kommer AI:n in. En låtsasmodell finns som beroende – precis så som en riktig skulle kopplas in.',
    explain:
      '`LatsasAI` och `hamta_ai` står i startkoden. Modellen har två async-metoder som tar två sekunder: `sammanfatta(text)` och `svara(fraga, kontext)`.\n\nVägen får modellen med `ai=Depends(hamta_ai)`. När du senare byter till en riktig AI ändrar du bara `hamta_ai` – vägarna är desamma.',
    example:
      "@app.get('/x/{id}/kort')\nasync def kort(id: int, ai=Depends(hamta_ai)):\n    return await ai.sammanfatta(hitta(id)['text'])",
    task: "Uppgift: `GET /artiklar/{id}/sammanfattning` svarar `{'id': …, 'sammanfattning': …}` med AI:ns sammanfattning av artikelns text.",
    starterCode: `${STEG6}${AI}`,
    solution: STEG7,
    hints: [
      'Vägen måste vara async def, eftersom den använder await.',
      'ai=Depends(hamta_ai)',
      "return {'id': id, 'sammanfattning': await ai.sammanfatta(artikel['text'])}",
    ],
    tests: [
      FYLL_TEST(NYC),
      {
        description: 'Sammanfattning av artikel 2',
        code: "__get('/artiklar/2/sammanfattning').json",
        expected: {
          id: 2,
          sammanfattning: 'Pydantic kontrollerar data med modeller.',
        },
      },
      {
        description: 'Tar två sekunder',
        code: "__tid('/artiklar/2/sammanfattning')",
        expected: 2,
      },
      {
        description: 'Okänd artikel: 404',
        code: "__get('/artiklar/9/sammanfattning').status",
        expected: 404,
      },
    ],
    request: { path: '/artiklar/1/sammanfattning' },
  },
  {
    id: 'fa-slutprojekt-08',
    track: 'slutprojekt',
    title: 'Kunskapsbanken: alla på en gång',
    xp: 35,
    description:
      'Sammanfatta alla artiklar. Med gather tar tre artiklar lika lång tid som en.',
    explain:
      '`zip(ARTIKLAR, texter)` går igenom två listor samtidigt, så att varje artikel paras ihop med sin sammanfattning.\n\nSvaren från `gather` kommer i samma ordning som anropen.',
    example:
      "texter = await asyncio.gather(*[ai.sammanfatta(a['text']) for a in ARTIKLAR])",
    task: "Uppgift: `GET /sammanfattningar` svarar med `[{'id': …, 'sammanfattning': …}, …]` för alla artiklar – på två sekunder.",
    starterCode: STEG7,
    solution: STEG8,
    hints: [
      'async def sammanfattningar(ai=Depends(hamta_ai)):',
      "texter = await asyncio.gather(*[ai.sammanfatta(a['text']) for a in ARTIKLAR])",
      "return [{'id': a['id'], 'sammanfattning': t} for a, t in zip(ARTIKLAR, texter)]",
    ],
    tests: [
      FYLL_TEST(NYC),
      {
        description: 'Tre sammanfattningar',
        code: "[s['id'] for s in __get('/sammanfattningar').json]",
        expected: [1, 2, 3],
      },
      {
        description: 'Rätt text till rätt artikel',
        code: "__get('/sammanfattningar').json[2]['sammanfattning']",
        expected: 'Med async kan servern vänta på många saker samtidigt.',
      },
      {
        description: 'Två sekunder, inte sex',
        code: "__tid('/sammanfattningar')",
        expected: 2,
      },
    ],
    request: { path: '/sammanfattningar' },
  },
  {
    id: 'fa-slutprojekt-09',
    track: 'slutprojekt',
    title: 'Kunskapsbanken: fråga banken',
    xp: 40,
    description:
      'Sista steget: ställ en fråga, hitta artikeln som passar bäst och låt AI:n svara med den som underlag.',
    explain:
      'Det här är grundidén i **RAG** (Retrieval-Augmented Generation), som AI-kursen går på djupet med:\n\n1. **Hämta** – leta upp den text som passar frågan bäst.\n2. **Skicka med** – ge texten till modellen som kontext.\n3. **Svara** – modellen svarar utifrån texten, inte bara sitt eget minne.\n\nVi poängsätter enkelt: hur många av frågans ord (längre än tre bokstäver) som finns i artikeln. `max(ARTIKLAR, key=…)` ger den med högst poäng. Ingen artikel med poäng över 0: 404.',
    example:
      "basta = max(SAKER, key=lambda s: poang(fraga, s))\nsvar = await ai.svara(fraga, basta['text'])",
    task: "Uppgift: Gör modellen `Fraga` (`fraga`, minst 3 tecken), funktionen `poang(fraga, artikel)` och `POST /fraga`, som svarar `{'svar': …, 'kalla': id}`. Hittas inget: 404 med `detail` `'Hittar inget om det'`.",
    starterCode: STEG8,
    solution: STEG9,
    hints: [
      "ord = [o for o in fraga.lower().replace('?', '').split() if len(o) > 3]",
      "Räkna orden som finns i (artikel['titel'] + ' ' + artikel['text']).lower().",
      "basta = max(ARTIKLAR, key=lambda a: poang(f.fraga, a))\nsvar = await ai.svara(f.fraga, basta['text'])",
    ],
    tests: [
      {
        description: 'Tom bank: 404',
        code: "__post('/fraga', {'fraga': 'Vad gör Pydantic?'}).status",
        expected: 404,
      },
      FYLL_TEST(NYC),
      {
        description: 'Fråga om Pydantic',
        code: "__post('/fraga', {'fraga': 'Vad gör Pydantic?'}).json",
        expected: {
          svar: 'Enligt Kunskapsbanken: Pydantic kontrollerar data med modeller.',
          kalla: 2,
        },
      },
      {
        description: 'Fråga om att vänta samtidigt',
        code: "__post('/fraga', {'fraga': 'Hur kan servern vänta samtidigt?'}).json['kalla']",
        expected: 3,
      },
      {
        description: 'Inget passar: 404',
        code: "__post('/fraga', {'fraga': 'Hur bakar man bröd?'}).json",
        expected: { detail: 'Hittar inget om det' },
      },
      {
        description: 'För kort fråga: 422',
        code: "__post('/fraga', {'fraga': 'Hm'}).status",
        expected: 422,
      },
      {
        description: 'poang räknar orden',
        code: "poang('Vad gör Pydantic med data?', {'titel': 'Om Pydantic', 'text': 'Pydantic kontrollerar data.'})",
        expected: 2,
      },
    ],
    request: {
      method: 'POST',
      path: '/fraga',
      body: '{"fraga": "Vad gör Pydantic?"}',
    },
  },
];
