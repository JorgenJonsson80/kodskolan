// Bana 10: slutprojektet AI-hjälpen. En AI-tjänst bakom FastAPI, byggd i
// nio steg: varje övning börjar med förra övningens facit. Allt från
// kursen: async-klient, nyckel, flera frågor samtidigt, fel, RAG med
// källor, strukturerade svar, logg och kvot.

const M = 'claude-opus-5-5';

const IMPORT = `import asyncio

import anthropic
from fastapi import FastAPI, Depends, Header, HTTPException, BackgroundTasks
from pydantic import BaseModel, Field

app = FastAPI(title='AI-hjälpen')
client = anthropic.AsyncAnthropic()
SYSTEM = 'Du är AI-hjälpen för Kafé Kod. Svara med en mening.'
`;

const FRAGA_AI = `

class Fraga(BaseModel):
    fraga: str = Field(min_length=3, max_length=500)


async def fraga_ai(text):
    svar = await client.messages.create(
        model='${M}',
        max_tokens=1000,
        system=SYSTEM,
        messages=[{'role': 'user', 'content': text}],
    )
    return next(b.text for b in svar.content if b.type == 'text')
`;

const FRAGA_AI_FEL = `

class Fraga(BaseModel):
    fraga: str = Field(min_length=3, max_length=500)


async def fraga_ai(text):
    try:
        svar = await client.messages.create(
            model='${M}',
            max_tokens=1000,
            system=SYSTEM,
            messages=[{'role': 'user', 'content': text}],
        )
    except anthropic.RateLimitError:
        raise HTTPException(status_code=503, detail='AI:n är upptagen. Försök igen om en stund.')
    except anthropic.APIStatusError:
        raise HTTPException(status_code=502, detail='Något gick fel hos AI:n.')
    return next(b.text for b in svar.content if b.type == 'text')
`;

const NYCKEL = `

def kolla_nyckel(x_api_nyckel: str | None = Header(default=None)):
    if x_api_nyckel != 'hemlig':
        raise HTTPException(status_code=401, detail='Fel nyckel')
    return x_api_nyckel
`;

const ROUTE1 = `

@app.post('/fraga')
async def fraga(f: Fraga):
    return {'svar': await fraga_ai(f.fraga)}
`;

const ROUTE2 = `

@app.post('/fraga', dependencies=[Depends(kolla_nyckel)])
async def fraga(f: Fraga):
    return {'svar': await fraga_ai(f.fraga)}
`;

const FRAGOR = `

class Fragor(BaseModel):
    fragor: list[str] = Field(min_length=1, max_length=5)


@app.post('/fragor', dependencies=[Depends(kolla_nyckel)])
async def fragor(f: Fragor):
    return await asyncio.gather(*[fraga_ai(text) for text in f.fragor])
`;

const HANDBOK = `

HANDBOK = [
    'Kafé Kod har öppet 8–17 på vardagar.',
    'Kaffe kostar 30 kronor.',
    'Vi har glutenfria bullar.',
]


def ord_i(text):
    return set(text.lower().replace('?', '').replace('.', '').split())


def hitta(fraga):
    basta = max(HANDBOK, key=lambda bit: len(ord_i(bit) & ord_i(fraga)))
    if not ord_i(basta) & ord_i(fraga):
        return None
    return basta
`;

const ROUTE_RAG = `

@app.post('/fraga', dependencies=[Depends(kolla_nyckel)])
async def fraga(f: Fraga):
    bit = hitta(f.fraga)
    if bit is None:
        return {'svar': 'Det vet jag inte.', 'kalla': None}
    svar = await fraga_ai(f'<dokument>{bit}</dokument>\\n\\n<fraga>{f.fraga}</fraga>')
    return {'svar': svar, 'kalla': bit}
`;

const SORTERA = `

class Sortering(BaseModel):
    kategori: Literal['fråga', 'beställning', 'klagomål']


class Text(BaseModel):
    text: str = Field(min_length=1)


@app.post('/sortera', dependencies=[Depends(kolla_nyckel)])
async def sortera(t: Text):
    svar = await client.messages.parse(
        model='${M}',
        max_tokens=1000,
        messages=[{'role': 'user', 'content': t.text}],
        output_format=Sortering,
    )
    return svar.parsed_output
`;

const ROUTE_LOGG = `

LOGG = []


def logga(nyckel, text):
    LOGG.append({'nyckel': nyckel, 'fraga': text})


@app.post('/fraga')
async def fraga(f: Fraga, bakgrund: BackgroundTasks, nyckel=Depends(kolla_nyckel)):
    bit = hitta(f.fraga)
    if bit is None:
        return {'svar': 'Det vet jag inte.', 'kalla': None}
    svar = await fraga_ai(f'<dokument>{bit}</dokument>\\n\\n<fraga>{f.fraga}</fraga>')
    bakgrund.add_task(logga, nyckel, f.fraga)
    return {'svar': svar, 'kalla': bit}


@app.get('/statistik', dependencies=[Depends(kolla_nyckel)])
def statistik():
    return {'fragor': len(LOGG)}
`;

const KVOT = `

KVOT = 3


def inom_kvot(nyckel=Depends(kolla_nyckel)):
    if len([rad for rad in LOGG if rad['nyckel'] == nyckel]) >= KVOT:
        raise HTTPException(status_code=429, detail='Kvoten är slut för i dag.')
    return nyckel
`;

const LITERAL = 'from typing import Literal\n\n';

// Stegen, som färdig kod.
const STEG1 = `${IMPORT}${FRAGA_AI}${ROUTE1}`;
const STEG2 = `${IMPORT}${FRAGA_AI}${NYCKEL}${ROUTE2}`;
const STEG3 = `${STEG2}${FRAGOR}`;
const STEG4 = `${IMPORT}${FRAGA_AI_FEL}${NYCKEL}${ROUTE2}${FRAGOR}`;
const STEG5 = `${IMPORT}${FRAGA_AI_FEL}${NYCKEL}${HANDBOK}${ROUTE_RAG}${FRAGOR}`;
const STEG6 = `${LITERAL}${STEG5}${SORTERA}`;
const STEG7 = `${LITERAL}${IMPORT}${FRAGA_AI_FEL}${NYCKEL}${HANDBOK}${ROUTE_LOGG}${FRAGOR}${SORTERA}`;
const STEG8 = STEG7.replace(
  'async def fraga(f: Fraga, bakgrund: BackgroundTasks, nyckel=Depends(kolla_nyckel)):',
  'async def fraga(f: Fraga, bakgrund: BackgroundTasks, nyckel=Depends(inom_kvot)):',
).replace('\n\nLOGG = []\n', `\n\nLOGG = []\n${KVOT}`);
const STEG9 = `${STEG8}\n\n@app.get('/')\ndef status():\n    return {'status': 'ok', 'modell': '${M}'}\n`;

export const AI_HJALPEN = STEG9;

// Slutbossens facit: AI-hjälpen med tidsgräns och chatt med minne.
const ANROPA = `

async def anropa(meddelanden):
    try:
        svar = await asyncio.wait_for(
            client.messages.create(
                model='${M}',
                max_tokens=1000,
                system=SYSTEM,
                messages=meddelanden,
            ),
            timeout=3,
        )
    except TimeoutError:
        raise HTTPException(status_code=504, detail='AI:n svarar inte just nu.')
    except anthropic.RateLimitError:
        raise HTTPException(status_code=503, detail='AI:n är upptagen. Försök igen om en stund.')
    except anthropic.APIStatusError:
        raise HTTPException(status_code=502, detail='Något gick fel hos AI:n.')
    return next(b.text for b in svar.content if b.type == 'text')


async def fraga_ai(text):
    return await anropa([{'role': 'user', 'content': text}])
`;

const CHATT = `

SAMTAL = {}


@app.post('/chatt/{id}')
async def chatt(id: str, f: Fraga, nyckel=Depends(inom_kvot)):
    historik = SAMTAL.get(id, [])
    ny = {'role': 'user', 'content': f.fraga}
    svar = await anropa(historik + [ny])
    SAMTAL[id] = historik + [ny, {'role': 'assistant', 'content': svar}]
    return {'svar': svar}


@app.get('/chatt/{id}', dependencies=[Depends(kolla_nyckel)])
def samtal(id: str):
    if id not in SAMTAL:
        raise HTTPException(status_code=404, detail='Samtalet finns inte')
    return {'meddelanden': len(SAMTAL[id])}
`;

const FEL_DEL = FRAGA_AI_FEL.slice(
  FRAGA_AI_FEL.indexOf('\n\nasync def fraga_ai'),
);

export const AI_HJALPEN_KLAR = `${STEG9.replace(FEL_DEL, ANROPA)}${CHATT}`;

const NYC = "{'x-api-nyckel': 'hemlig'}";
const POST = (body, path = '/fraga') => ({
  method: 'POST',
  path,
  body: JSON.stringify(body),
  headers: { 'x-api-nyckel': 'hemlig' },
});

export const REGLER = [
  { om: 'upptagen', fel: 'RateLimitError' },
  {
    om: '<dokument>Kafé Kod har öppet[\\s\\S]*<fraga>',
    svar: 'Vi har öppet 8–17 på vardagar. Välkommen!',
  },
  {
    om: '<dokument>Kaffe kostar[\\s\\S]*<fraga>',
    svar: 'Kaffe kostar 30 kronor. Mumsigt!',
  },
  { om: 'vill beställa', json: { kategori: 'beställning' } },
  { om: 'kallt|dåligt', json: { kategori: 'klagomål' } },
  { json: { kategori: 'fråga' }, system: '^$' },
];

const EXEMPEL = [
  "@app.post('/sammanfatta')\nasync def sammanfatta(t: Text):\n    return {'svar': await fraga_ai(t.text)}",
  "@app.post('/x', dependencies=[Depends(kolla_nyckel)])",
  'await asyncio.gather(*[fraga_ai(t) for t in texter])',
  "except anthropic.RateLimitError:\n    raise HTTPException(status_code=503, detail='Upptaget')",
  "bit = hitta(fraga)\nif bit is None:\n    return {'svar': 'Det vet jag inte.', 'kalla': None}",
  'svar = await client.messages.parse(..., output_format=Sortering)\nreturn svar.parsed_output',
  'bakgrund.add_task(logga, nyckel, f.fraga)',
  'def inom_kvot(nyckel=Depends(kolla_nyckel)):\n    ...',
  "@app.get('/')\ndef status():\n    return {'status': 'ok'}",
];

const steg = (
  nummer,
  title,
  description,
  explain,
  task,
  starterCode,
  solution,
  hints,
  tests,
  request,
) => ({
  id: `ai-slutprojekt-0${nummer}`,
  track: 'slutprojekt',
  title: `AI-hjälpen: ${title}`,
  xp: 35,
  description,
  explain,
  example: EXEMPEL[nummer - 1],
  task: `Uppgift: ${task}`,
  starterCode,
  solution,
  hints,
  tests,
  request,
  modell: REGLER,
});

const t = (description, code, expected) => ({ description, code, expected });

export const SLUTPROJEKT = [
  steg(
    1,
    'första vägen',
    'Slutprojektet: en AI-tjänst som en app kan använda. Först en väg som frågar modellen.',
    'AI-hjälpen byggs i nio steg, och varje steg börjar med koden från förra steget. Allt du lärt dig i FastAPI-kursen och den här kursen kommer med.\n\nVägen är `async`, och klienten är `anthropic.AsyncAnthropic()` – medan AI:n tänker kan servern ta hand om andra anrop. Importerna överst innehåller redan allt du kommer att behöva.',
    "Gör modellen `Fraga` (`fraga`, 3–500 tecken), `async def fraga_ai(text)` som frågar med `SYSTEM` och returnerar texten, och `POST /fraga` som svarar `{'svar': …}`.",
    IMPORT,
    STEG1,
    [
      'fraga: str = Field(min_length=3, max_length=500)',
      'svar = await client.messages.create(…, system=SYSTEM, …)',
      "@app.post('/fraga')\nasync def fraga(f: Fraga):\n    return {'svar': await fraga_ai(f.fraga)}",
    ],
    [
      t('Hej', "__post('/fraga', {'fraga': 'Hej!'}).json", { svar: 'Hej!' }),
      t('För kort: 422', "__post('/fraga', {'fraga': 'Hi'}).status", 422),
      t(
        'Systemprompten',
        "__anrop()[0]['system']",
        'Du är AI-hjälpen för Kafé Kod. Svara med en mening.',
      ),
    ],
    POST({ fraga: 'Hej!' }),
  ),
  steg(
    2,
    'nyckel',
    'Varje AI-anrop kostar. Bara den med nyckel får fråga.',
    'Samma beroende som i FastAPI-kursen: `kolla_nyckel` läser headern `x-api-nyckel` och svarar 401 om den är fel. Lägg den på vägen med `dependencies=[Depends(kolla_nyckel)]`.\n\nUtan nyckel kan vem som helst använda din AI på din bekostnad.',
    "Skriv `kolla_nyckel` (rätt nyckel är `'hemlig'`, den returnerar nyckeln) och lägg den på `/fraga`.",
    STEG1,
    STEG2,
    [
      'x_api_nyckel: str | None = Header(default=None)',
      "raise HTTPException(status_code=401, detail='Fel nyckel')",
      "@app.post('/fraga', dependencies=[Depends(kolla_nyckel)])",
    ],
    [
      t('Utan nyckel: 401', "__post('/fraga', {'fraga': 'Hej!'}).status", 401),
      t('Inget AI-anrop utan nyckel', 'len(__anrop())', 0),
      t('Med nyckel', `__post('/fraga', {'fraga': 'Hej!'}, ${NYC}).json`, {
        svar: 'Hej!',
      }),
    ],
    POST({ fraga: 'Hej!' }),
  ),
  steg(
    3,
    'flera frågor',
    'En app vill ofta ställa flera frågor på en gång. Med gather tar fem frågor lika lång tid som en.',
    'Ta emot en lista med högst fem frågor och fråga AI:n om alla samtidigt med `asyncio.gather`. Varje anrop tar en (låtsas)sekund – tillsammans ska de ta en sekund.',
    'Gör `Fragor` (`fragor`, 1–5 texter) och `POST /fragor` (med nyckel) som svarar med en lista med svaren, i samma ordning.',
    STEG2,
    STEG3,
    [
      'fragor: list[str] = Field(min_length=1, max_length=5)',
      'await asyncio.gather(*[fraga_ai(text) for text in f.fragor])',
      "@app.post('/fragor', dependencies=[Depends(kolla_nyckel)])",
    ],
    [
      t(
        'Tre svar',
        `__post('/fragor', {'fragor': ['Hej!', 'Vad är 2 + 2?', 'Vad är 3 + 3?']}, ${NYC}).json`,
        ['Hej!', 'Det blir 4.', 'Det blir 6.'],
      ),
      t(
        'På en sekund',
        `__tid(lambda: __post('/fragor', {'fragor': ['Hej!'] * 5}, ${NYC}))`,
        1,
      ),
      t(
        'Sex frågor: 422',
        `__post('/fragor', {'fragor': ['Hej!'] * 6}, ${NYC}).status`,
        422,
      ),
    ],
    POST({ fragor: ['Hej!', 'Vad är 2 + 2?'] }, '/fragor'),
  ),
  steg(
    4,
    'när AI:n krånglar',
    'AI-tjänsten kan vara överbelastad. Då ska ditt API svara snyggt, inte krascha.',
    'Gör om felen från modellen till statuskoder som appen förstår:\n\n- `anthropic.RateLimitError` → **503** (tillfälligt, försök igen)\n- andra `anthropic.APIStatusError` → **502** (fel hos tjänsten bakom)\n\nFånga det specifika felet först, precis som i bana 1.',
    "Fånga felen i `fraga_ai` och gör `raise HTTPException` med 503 (`'AI:n är upptagen. Försök igen om en stund.'`) eller 502 (`'Något gick fel hos AI:n.'`).",
    STEG3,
    STEG4,
    [
      'Lägg anropet i try.',
      'except anthropic.RateLimitError: före except anthropic.APIStatusError:',
      "raise HTTPException(status_code=503, detail='AI:n är upptagen. Försök igen om en stund.')",
    ],
    [
      t(
        'Upptagen: 503',
        `__post('/fraga', {'fraga': 'Är ni upptagen?'}, ${NYC}).json`,
        { detail: 'AI:n är upptagen. Försök igen om en stund.' },
      ),
      t(
        'Annars fungerar det',
        `__post('/fraga', {'fraga': 'Hej!'}, ${NYC}).status`,
        200,
      ),
    ],
    POST({ fraga: 'Är ni upptagen?' }),
  ),
  steg(
    5,
    'svara utifrån handboken',
    'AI-hjälpen ska svara om Kafé Kod – inte gissa. Den får kaféets handbok som underlag.',
    'En enkel RAG: `hitta(fraga)` tar den bit i `HANDBOK` som har flest ord gemensamt med frågan, eller `None` om ingen har något gemensamt.\n\nFinns en bit skickas den med i `<dokument>`, och svaret visar källan. Finns ingen svarar API:et direkt, utan att fråga AI:n.',
    "Skriv `HANDBOK`, `ord_i` och `hitta` (finns i förklaringen ovan), och ändra `/fraga` så att den svarar `{'svar': …, 'kalla': bit}`, eller `{'svar': 'Det vet jag inte.', 'kalla': None}` utan anrop.",
    STEG4,
    STEG5,
    [
      'ord_i ger en mängd (set) med orden.',
      'max(HANDBOK, key=lambda bit: len(ord_i(bit) & ord_i(fraga)))',
      "f'<dokument>{bit}</dokument>\\n\\n<fraga>{f.fraga}</fraga>'",
    ],
    [
      t(
        'Öppettider',
        `__post('/fraga', {'fraga': 'När har ni öppet?'}, ${NYC}).json`,
        {
          svar: 'Vi har öppet 8–17 på vardagar.',
          kalla: 'Kafé Kod har öppet 8–17 på vardagar.',
        },
      ),
      t(
        'Inget i handboken, inget anrop',
        `(lambda fore: [__post('/fraga', {'fraga': 'Xyz qwerty?'}, ${NYC}).json, len(__anrop()) - fore])(len(__anrop()))`,
        [{ svar: 'Det vet jag inte.', kalla: null }, 0],
      ),
    ],
    POST({ fraga: 'När har ni öppet?' }),
  ),
  steg(
    6,
    'sortera meddelanden',
    'Kaféet får meddelanden från kunder. AI:n sorterar dem, så att rätt person svarar.',
    'Ett strukturerat svar med `client.messages.parse` och `output_format`. `Literal` gör att kategorin bara kan vara en av tre.\n\nMed `AsyncAnthropic` skrivs det `await client.messages.parse(...)`. Vägen returnerar `parsed_output` – FastAPI gör om Pydantic-objektet till JSON.',
    "Gör `Sortering` (`kategori`: `'fråga'`, `'beställning'` eller `'klagomål'`), `Text` (`text`) och `POST /sortera` (med nyckel) som svarar med `parsed_output`. Importera `Literal` från `typing`.",
    STEG5,
    STEG6,
    [
      "kategori: Literal['fråga', 'beställning', 'klagomål']",
      'svar = await client.messages.parse(…, output_format=Sortering)',
      'return svar.parsed_output',
    ],
    [
      t(
        'Beställning',
        `__post('/sortera', {'text': 'Jag vill beställa en tårta'}, ${NYC}).json`,
        { kategori: 'beställning' },
      ),
      t(
        'Klagomål',
        `__post('/sortera', {'text': 'Kaffet var kallt'}, ${NYC}).json`,
        { kategori: 'klagomål' },
      ),
    ],
    POST({ text: 'Jag vill beställa en tårta' }, '/sortera'),
  ),
  steg(
    7,
    'logg och statistik',
    'Vem frågar vad? En logg visar hur tjänsten används – och vad den kostar.',
    'Logga varje besvarad fråga i bakgrunden, med nyckeln som frågade. `kolla_nyckel` returnerar nyckeln, så vägen kan få den med `nyckel=Depends(kolla_nyckel)`.\n\n`GET /statistik` visar hur många frågor som besvarats.',
    "Gör `LOGG`, `logga(nyckel, text)` och ändra `/fraga` så att den loggar `{'nyckel': …, 'fraga': …}` med `BackgroundTasks` efter ett svar från AI:n. Gör `GET /statistik` (med nyckel) som svarar `{'fragor': …}`.",
    STEG6,
    STEG7,
    [
      'async def fraga(f: Fraga, bakgrund: BackgroundTasks, nyckel=Depends(kolla_nyckel)):',
      'bakgrund.add_task(logga, nyckel, f.fraga)',
      "@app.get('/statistik', dependencies=[Depends(kolla_nyckel)])",
    ],
    [
      t(
        'Loggad',
        `(__post('/fraga', {'fraga': 'Vad kostar kaffe?'}, ${NYC}), LOGG)[1]`,
        [{ nyckel: 'hemlig', fraga: 'Vad kostar kaffe?' }],
      ),
      t('Statistik', `__get('/statistik', ${NYC}).json`, { fragor: 1 }),
    ],
    POST({ fraga: 'Vad kostar kaffe?' }),
  ),
  steg(
    8,
    'en kvot',
    'En nyckel ska inte kunna använda AI:n hur mycket som helst. En kvot per nyckel skyddar plånboken.',
    'Ett beroende som bygger på `kolla_nyckel`: räkna nyckelns rader i `LOGG`, och svara **429** (för många) om kvoten är slut.\n\n```\ndef inom_kvot(nyckel=Depends(kolla_nyckel)):\n    ...\n```',
    "Skriv `KVOT = 3` och beroendet `inom_kvot`, och låt `/fraga` använda `nyckel=Depends(inom_kvot)`. Kvoten slut: 429 med `'Kvoten är slut för i dag.'`.",
    STEG7,
    STEG8,
    [
      "len([rad for rad in LOGG if rad['nyckel'] == nyckel]) >= KVOT",
      "raise HTTPException(status_code=429, detail='Kvoten är slut för i dag.')",
      'nyckel=Depends(inom_kvot) i /fraga.',
    ],
    [
      t(
        'Tre går bra, den fjärde inte',
        `[__post('/fraga', {'fraga': 'Vad kostar kaffe?'}, ${NYC}).status for _ in range(4)]`,
        [200, 200, 200, 429],
      ),
    ],
    POST({ fraga: 'Vad kostar kaffe?' }),
  ),
  steg(
    9,
    'redo att lansera',
    'Sista steget: en statussida, så att den som driftar tjänsten ser att den lever.',
    'En väg utan nyckel på `/` som svarar att allt fungerar och vilken modell som används. Driftverktyg anropar den med jämna mellanrum.\n\nDärmed är AI-hjälpen klar: async, nyckel, flera frågor samtidigt, felhantering, RAG med källor, strukturerade svar, logg och kvot. Byt låtsasmodulen mot `pip install anthropic`, sätt `ANTHROPIC_API_KEY`, och den fungerar på riktigt.',
    "Gör `GET /` som svarar `{'status': 'ok', 'modell': 'claude-opus-5-5'}`.",
    STEG8,
    STEG9,
    [
      "@app.get('/')",
      'Ingen nyckel behövs.',
      "return {'status': 'ok', 'modell': 'claude-opus-5-5'}",
    ],
    [
      t('Status', "__get('/').json", { status: 'ok', modell: M }),
      t('Allt finns', 'sorted(p for m, p in __vagar())', [
        '/',
        '/fraga',
        '/fragor',
        '/sortera',
        '/statistik',
      ]),
    ],
    { path: '/' },
  ),
];
