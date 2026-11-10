// Bana 9: async. async def, await, asyncio.gather och tidsgränser.
// Tiden är på låtsas (_Loop i fastapi_harness.py): asyncio.sleep(2) går
// direkt, men __tid('/väg') mäter två sekunder. Bana 9 förbereder för
// AI-kursen, där varje modellanrop tar tid.

const IMPORT =
  'import asyncio\n\nfrom fastapi import FastAPI\n\napp = FastAPI()\n';

const VADER = `

async def hamta_vader(stad):
    await asyncio.sleep(1)  # som ett anrop till en vädertjänst
    return {'stad': stad, 'grader': len(stad) * 2}
`;

const AI = `

async def fraga_ai(fraga):
    await asyncio.sleep(2)  # en AI-modell tar ett par sekunder på sig
    return f'Svar på: {fraga}'
`;

export const ASYNC = [
  {
    id: 'fa-async-01',
    track: 'async',
    title: 'async def',
    xp: 15,
    description:
      'En vägfunktion kan vara async. Det gör ingen skillnad för den som anropar – men stor skillnad för servern.',
    explain:
      "`async def` gör en funktion **asynkron**: den kan pausa och vänta på något (ett nätverksanrop, en databas, en AI-modell) utan att hela servern står still. Under tiden kan servern ta hand om andra anrop.\n\nFör den som anropar API:et ser det ut precis som förut.\n\nI Kodskolan är tiden på låtsas: en väntan på två sekunder går direkt, men testerna mäter att två sekunder har gått med `__tid('/väg')`.",
    example: "@app.get('/')\nasync def start():\n    return {'async': True}",
    task: "Uppgift: Gör `/ping` som en `async def` som svarar `{'svar': 'pong'}`.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n\n@app.get('/ping')\nasync def ping():\n    return {'svar': 'pong'}\n`,
    hints: [
      "@app.get('/ping')",
      'Skriv async framför def.',
      "async def ping():\n    return {'svar': 'pong'}",
    ],
    tests: [
      {
        description: '/ping',
        code: "__get('/ping').json",
        expected: { svar: 'pong' },
      },
      {
        description: 'Funktionen är async',
        code: "__import__('inspect').iscoroutinefunction(ping)",
        expected: true,
      },
    ],
    request: { path: '/ping' },
  },
  {
    id: 'fa-async-02',
    track: 'async',
    title: 'await',
    xp: 20,
    description:
      'await betyder: vänta på det här, och låt servern göra annat under tiden.',
    explain:
      "`hamta_vader` är också async – den låtsas fråga en vädertjänst, och det tar en sekund.\n\nEn async-funktion anropas med `await` framför:\n\n`vader = await hamta_vader('Malmö')`\n\n`await` får bara stå inne i en `async def`.",
    example:
      "@app.get('/nyheter')\nasync def nyheter():\n    lista = await hamta_nyheter()\n    return lista",
    task: 'Uppgift: `/vader/{stad}` ska svara med det `hamta_vader(stad)` ger.',
    starterCode: `${IMPORT}${VADER}`,
    solution: `${IMPORT}${VADER}\n\n@app.get('/vader/{stad}')\nasync def vader(stad: str):\n    return await hamta_vader(stad)\n`,
    hints: [
      'Vägen måste vara async def för att kunna använda await.',
      'await hamta_vader(stad)',
      "@app.get('/vader/{stad}')\nasync def vader(stad: str):\n    return await hamta_vader(stad)",
    ],
    tests: [
      {
        description: '/vader/Malmö',
        code: "__get('/vader/Malmö').json",
        expected: { stad: 'Malmö', grader: 10 },
      },
      {
        description: 'Tar en sekund',
        code: "__tid('/vader/Malmö')",
        expected: 1,
      },
    ],
    request: { path: '/vader/Malmö' },
  },
  {
    id: 'fa-async-03',
    track: 'async',
    title: 'Glömt await',
    xp: 15,
    description:
      'Det vanligaste felet med async: att glömma await. Då får man inget svar, bara ett löfte om ett.',
    explain:
      'Utan `await` körs inte funktionen – du får en **coroutine**, ett slags löfte om ett svar som ingen väntar in. FastAPI kan inte göra JSON av den, och appen kraschar.\n\nPython varnar också: *coroutine was never awaited*.\n\nRegeln: anropar du en `async def`, skriv `await` framför.',
    example: '# Fel:\nsvar = hamta()\n# Rätt:\nsvar = await hamta()',
    task: 'Uppgift: Startkoden kraschar. Laga den.',
    starterCode: `${IMPORT}${VADER}\n\n@app.get('/vader/{stad}')\nasync def vader(stad: str):\n    svar = hamta_vader(stad)\n    return {'rapport': f"{svar['stad']}: {svar['grader']} grader"}\n`,
    solution: `${IMPORT}${VADER}\n\n@app.get('/vader/{stad}')\nasync def vader(stad: str):\n    svar = await hamta_vader(stad)\n    return {'rapport': f"{svar['stad']}: {svar['grader']} grader"}\n`,
    hints: [
      'Kör koden och läs felet.',
      'hamta_vader är en async def.',
      'svar = await hamta_vader(stad)',
    ],
    tests: [
      {
        description: '/vader/Lund',
        code: "__get('/vader/Lund').json",
        expected: { rapport: 'Lund: 8 grader' },
      },
    ],
    request: { path: '/vader/Lund' },
  },
  {
    id: 'fa-async-04',
    track: 'async',
    title: 'En i taget tar tid',
    xp: 20,
    description:
      'Två await efter varandra väntar efter varandra. Två sekunder.',
    explain:
      "```\nmalmo = await hamta_vader('Malmö')\nkiruna = await hamta_vader('Kiruna')\n```\n\nDen andra frågan skickas först när den första är klar. Det blir 1 + 1 = 2 sekunder.\n\nSkriv det så här först – i nästa övning gör vi det snabbare.",
    example: "a = await hamta('a')\nb = await hamta('b')\nreturn [a, b]",
    task: 'Uppgift: `/jamfor/{stad1}/{stad2}` ska hämta vädret för båda städerna, ett i taget, och svara med en lista med båda svaren.',
    starterCode: `${IMPORT}${VADER}`,
    solution: `${IMPORT}${VADER}\n\n@app.get('/jamfor/{stad1}/{stad2}')\nasync def jamfor(stad1: str, stad2: str):\n    forsta = await hamta_vader(stad1)\n    andra = await hamta_vader(stad2)\n    return [forsta, andra]\n`,
    hints: [
      "@app.get('/jamfor/{stad1}/{stad2}')",
      'Två await, en per stad.',
      'return [forsta, andra]',
    ],
    tests: [
      {
        description: 'Båda städerna',
        code: "__get('/jamfor/Malmö/Kiruna').json",
        expected: [
          { stad: 'Malmö', grader: 10 },
          { stad: 'Kiruna', grader: 12 },
        ],
      },
      {
        description: 'Tar två sekunder',
        code: "__tid('/jamfor/Malmö/Kiruna')",
        expected: 2,
      },
    ],
    request: { path: '/jamfor/Malmö/Kiruna' },
  },
  {
    id: 'fa-async-05',
    track: 'async',
    title: 'Samtidigt med gather',
    xp: 25,
    description:
      'asyncio.gather skickar alla frågor på en gång och väntar på alla. Då tar det bara så lång tid som den långsammaste.',
    explain:
      '```\nforsta, andra = await asyncio.gather(\n    hamta_vader(stad1),\n    hamta_vader(stad2),\n)\n```\n\nBåda frågorna skickas direkt, och `gather` väntar tills båda är klara. 1 sekund i stället för 2.\n\nSvaren kommer i samma ordning som frågorna, även om någon blir klar före.\n\nDet här är **därför** AI-tjänster byggs med async: tre frågor till en modell tar lika lång tid som en.',
    example:
      "a, b, c = await asyncio.gather(hamta('a'), hamta('b'), hamta('c'))",
    task: 'Uppgift: Gör `/jamfor/{stad1}/{stad2}` snabbare med `asyncio.gather`. Svaret ska vara detsamma.',
    starterCode: `${IMPORT}${VADER}\n\n@app.get('/jamfor/{stad1}/{stad2}')\nasync def jamfor(stad1: str, stad2: str):\n    forsta = await hamta_vader(stad1)\n    andra = await hamta_vader(stad2)\n    return [forsta, andra]\n`,
    solution: `${IMPORT}${VADER}\n\n@app.get('/jamfor/{stad1}/{stad2}')\nasync def jamfor(stad1: str, stad2: str):\n    forsta, andra = await asyncio.gather(hamta_vader(stad1), hamta_vader(stad2))\n    return [forsta, andra]\n`,
    hints: [
      'asyncio.gather(…, …) tar emot anropen utan await framför varje.',
      'Ett enda await, framför gather.',
      'forsta, andra = await asyncio.gather(hamta_vader(stad1), hamta_vader(stad2))',
    ],
    tests: [
      {
        description: 'Samma svar',
        code: "__get('/jamfor/Malmö/Kiruna').json",
        expected: [
          { stad: 'Malmö', grader: 10 },
          { stad: 'Kiruna', grader: 12 },
        ],
      },
      {
        description: 'Tar en sekund',
        code: "__tid('/jamfor/Malmö/Kiruna')",
        expected: 1,
      },
    ],
    request: { path: '/jamfor/Malmö/Kiruna' },
  },
  {
    id: 'fa-async-06',
    track: 'async',
    title: 'Många på en gång',
    xp: 25,
    description:
      'gather tar hur många som helst. Med * packas en lista upp till lika många argument.',
    explain:
      'En lista med anrop byggs med en list comprehension, och `*` packar upp den:\n\n```\nanrop = [hamta_vader(stad) for stad in STADER]\nsvar = await asyncio.gather(*anrop)\n```\n\nTio städer tar fortfarande en sekund. Utan gather hade det tagit tio.',
    example: 'svar = await asyncio.gather(*[hamta(x) for x in SAKER])',
    task: 'Uppgift: `/alla` ska hämta vädret för alla städer i `STADER` samtidigt och svara med listan.',
    starterCode: `${IMPORT}\nSTADER = ['Malmö', 'Göteborg', 'Stockholm', 'Umeå', 'Kiruna']\n${VADER}`,
    solution: `${IMPORT}\nSTADER = ['Malmö', 'Göteborg', 'Stockholm', 'Umeå', 'Kiruna']\n${VADER}\n\n@app.get('/alla')\nasync def alla():\n    return await asyncio.gather(*[hamta_vader(stad) for stad in STADER])\n`,
    hints: [
      '[hamta_vader(stad) for stad in STADER] är en lista med anrop.',
      'asyncio.gather(*lista)',
      'return await asyncio.gather(*[hamta_vader(stad) for stad in STADER])',
    ],
    tests: [
      {
        description: 'Fem städer',
        code: "[v['stad'] for v in __get('/alla').json]",
        expected: ['Malmö', 'Göteborg', 'Stockholm', 'Umeå', 'Kiruna'],
      },
      {
        description: 'Tar en sekund',
        code: "__tid('/alla')",
        expected: 1,
      },
    ],
    request: { path: '/alla' },
  },
  {
    id: 'fa-async-07',
    track: 'async',
    title: 'En tidsgräns',
    xp: 25,
    description:
      'Ibland svarar en tjänst aldrig. Ett bra API ger upp efter en stund i stället för att vänta för evigt.',
    explain:
      "`asyncio.wait_for(anrop, timeout=2)` väntar högst två sekunder. Tar det längre blir det ett `TimeoutError`.\n\n```\ntry:\n    svar = await asyncio.wait_for(hamta(), timeout=2)\nexcept TimeoutError:\n    raise HTTPException(status_code=504, detail='Tjänsten svarar inte')\n```\n\n`504 Gateway Timeout` betyder att en tjänst bakom API:et inte svarade i tid.",
    example:
      "try:\n    return await asyncio.wait_for(fraga_ai(q), timeout=10)\nexcept TimeoutError:\n    raise HTTPException(status_code=504, detail='AI:n svarar inte')",
    task: "Uppgift: `langsam_tjanst` tar fem sekunder. `/data` ska vänta högst två sekunder och annars svara 504 med `detail` `'Tjänsten svarar inte'`. `/snabb` ska fungera som vanligt.",
    starterCode: `import asyncio\n\nfrom fastapi import FastAPI, HTTPException\n\napp = FastAPI()\n\n\nasync def langsam_tjanst():\n    await asyncio.sleep(5)\n    return {'data': 'äntligen'}\n\n\nasync def snabb_tjanst():\n    await asyncio.sleep(1)\n    return {'data': 'snabbt'}\n`,
    solution: `import asyncio\n\nfrom fastapi import FastAPI, HTTPException\n\napp = FastAPI()\n\n\nasync def langsam_tjanst():\n    await asyncio.sleep(5)\n    return {'data': 'äntligen'}\n\n\nasync def snabb_tjanst():\n    await asyncio.sleep(1)\n    return {'data': 'snabbt'}\n\n\nasync def med_grans(anrop):\n    try:\n        return await asyncio.wait_for(anrop, timeout=2)\n    except TimeoutError:\n        raise HTTPException(status_code=504, detail='Tjänsten svarar inte')\n\n\n@app.get('/data')\nasync def data():\n    return await med_grans(langsam_tjanst())\n\n\n@app.get('/snabb')\nasync def snabb():\n    return await med_grans(snabb_tjanst())\n`,
    hints: [
      'asyncio.wait_for(langsam_tjanst(), timeout=2)',
      'Fånga TimeoutError med try/except.',
      "except TimeoutError:\n    raise HTTPException(status_code=504, detail='Tjänsten svarar inte')",
    ],
    tests: [
      {
        description: '/data ger 504',
        code: "__get('/data').status",
        expected: 504,
      },
      {
        description: 'Efter två sekunder, inte fem',
        code: "__tid('/data')",
        expected: 2,
      },
      {
        description: '/snabb fungerar',
        code: "__get('/snabb').json",
        expected: { data: 'snabbt' },
      },
    ],
    request: { path: '/data' },
  },
  {
    id: 'fa-async-08',
    track: 'async',
    title: 'Fråga AI:n',
    xp: 25,
    description:
      'Nu är det på riktigt: en låtsas-AI som tar två sekunder per fråga. Ställ tre frågor på två sekunder.',
    explain:
      '`fraga_ai` fungerar som ett riktigt anrop till en språkmodell: det tar ett par sekunder och svarar med text.\n\nEtt vanligt mönster i AI-tjänster är att ställa flera frågor på en gång – sammanfatta, översätt och hitta nyckelord – och vänta på alla med `gather`.\n\nI AI-kursen byter du `fraga_ai` mot en riktig klient. Koden runt omkring blir likadan.',
    example:
      "sammanfattning, rubrik = await asyncio.gather(\n    fraga_ai('Sammanfatta: ' + text),\n    fraga_ai('Ge en rubrik: ' + text),\n)",
    task: "Uppgift: `POST /analysera` tar emot `{'text': …}` och ställer tre frågor samtidigt: `'Sammanfatta: ' + text`, `'Översätt: ' + text` och `'Nyckelord: ' + text`. Svaret är `{'sammanfattning': …, 'oversattning': …, 'nyckelord': …}`.",
    starterCode: `import asyncio\n\nfrom fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n${AI}\n\nclass Text(BaseModel):\n    text: str\n`,
    solution: `import asyncio\n\nfrom fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n${AI}\n\nclass Text(BaseModel):\n    text: str\n\n\n@app.post('/analysera')\nasync def analysera(t: Text):\n    sammanfattning, oversattning, nyckelord = await asyncio.gather(\n        fraga_ai('Sammanfatta: ' + t.text),\n        fraga_ai('Översätt: ' + t.text),\n        fraga_ai('Nyckelord: ' + t.text),\n    )\n    return {\n        'sammanfattning': sammanfattning,\n        'oversattning': oversattning,\n        'nyckelord': nyckelord,\n    }\n`,
    hints: [
      "@app.post('/analysera') med en async def som tar emot Text.",
      'Tre anrop i en asyncio.gather.',
      "a, b, c = await asyncio.gather(fraga_ai('Sammanfatta: ' + t.text), …)",
    ],
    tests: [
      {
        description: 'Tre svar',
        code: "__post('/analysera', {'text': 'Hej'}).json",
        expected: {
          sammanfattning: 'Svar på: Sammanfatta: Hej',
          oversattning: 'Svar på: Översätt: Hej',
          nyckelord: 'Svar på: Nyckelord: Hej',
        },
      },
      {
        description: 'Tar två sekunder, inte sex',
        code: "__tid(lambda: __post('/analysera', {'text': 'Hej'}))",
        expected: 2,
      },
    ],
    request: {
      method: 'POST',
      path: '/analysera',
      body: '{"text": "FastAPI är snabbt"}',
    },
  },
  {
    id: 'fa-async-09',
    track: 'async',
    title: 'Efter svaret',
    xp: 25,
    description:
      'Vissa saker behöver inte bli klara innan svaret skickas, som att logga eller skicka ett mejl.',
    explain:
      "`BackgroundTasks` kör en funktion **efter** att svaret har skickats. Den som anropar slipper vänta.\n\n```\nfrom fastapi import BackgroundTasks\n\n@app.post('/bestall')\ndef bestall(order: Order, bakgrund: BackgroundTasks):\n    bakgrund.add_task(skicka_mejl, order.epost)\n    return {'ok': True}\n```\n\nFastAPI ger dig `bakgrund` själv när typen är `BackgroundTasks`. AI-tjänster loggar ofta varje fråga på det här sättet, för att kunna se vad det kostar.",
    example:
      "def logga(text):\n    LOGG.append(text)\n\n@app.get('/')\ndef start(bakgrund: BackgroundTasks):\n    bakgrund.add_task(logga, 'någon var här')\n    return {'hej': True}",
    task: "Uppgift: `POST /fraga` tar emot `{'text': …}` och svarar `{'svar': await fraga_ai(text)}`. Efter svaret ska `logga(text)` köras i bakgrunden, så att frågan hamnar i `LOGG`.",
    starterCode: `import asyncio\n\nfrom fastapi import FastAPI, BackgroundTasks\nfrom pydantic import BaseModel\n\napp = FastAPI()\nLOGG = []\n${AI}\n\ndef logga(text):\n    LOGG.append(text)\n\n\nclass Fraga(BaseModel):\n    text: str\n`,
    solution: `import asyncio\n\nfrom fastapi import FastAPI, BackgroundTasks\nfrom pydantic import BaseModel\n\napp = FastAPI()\nLOGG = []\n${AI}\n\ndef logga(text):\n    LOGG.append(text)\n\n\nclass Fraga(BaseModel):\n    text: str\n\n\n@app.post('/fraga')\nasync def fraga(f: Fraga, bakgrund: BackgroundTasks):\n    bakgrund.add_task(logga, f.text)\n    return {'svar': await fraga_ai(f.text)}\n`,
    hints: [
      'bakgrund: BackgroundTasks som parameter.',
      'bakgrund.add_task(logga, f.text)',
      "return {'svar': await fraga_ai(f.text)}",
    ],
    tests: [
      {
        description: 'Svaret',
        code: "__post('/fraga', {'text': 'Vad är 2+2?'}).json",
        expected: { svar: 'Svar på: Vad är 2+2?' },
      },
      {
        description: 'Frågan är loggad',
        code: 'LOGG',
        expected: ['Vad är 2+2?'],
      },
    ],
    sourceChecks: [
      {
        description: 'Använder BackgroundTasks',
        pattern: /add_task\(\s*logga/,
      },
    ],
    request: {
      method: 'POST',
      path: '/fraga',
      body: '{"text": "Vad är 2+2?"}',
    },
  },
];
