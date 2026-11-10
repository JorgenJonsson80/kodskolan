// Bana 7: beroenden. Depends för kod som flera vägar delar, headers,
// API-nycklar och inloggning med 401 och 403, och att byta ut ett beroende
// i tester (dependency_overrides) – samma knep som AI-kursen använder.

const IMPORT =
  'from fastapi import FastAPI, Depends, Header, HTTPException\n\napp = FastAPI()\n';

const ANVANDARE = `TOKENS = {
    'abc123': {'namn': 'Ada', 'roll': 'admin'},
    'xyz789': {'namn': 'Bo', 'roll': 'medlem'},
}
`;

const INLOGGAD = `

def inloggad(authorization: str | None = Header(default=None)):
    if authorization is None or not authorization.startswith('Bearer '):
        raise HTTPException(status_code=401, detail='Logga in först')
    token = authorization.removeprefix('Bearer ')
    if token not in TOKENS:
        raise HTTPException(status_code=401, detail='Okänd token')
    return TOKENS[token]
`;

const ADA = "{'authorization': 'Bearer abc123'}";
const BO = "{'authorization': 'Bearer xyz789'}";

export const BEROENDEN = [
  {
    id: 'fa-beroenden-01',
    track: 'beroenden',
    title: 'Första beroendet',
    xp: 20,
    description:
      'Flera vägar tar samma frågor, som start och antal. Skriv dem en gång och dela.',
    explain:
      "Ett **beroende** är en vanlig funktion som FastAPI kör före vägfunktionen. Dess parametrar blir frågor, precis som i en väg.\n\n```\ndef sidor(start: int = 0, antal: int = 10):\n    return {'start': start, 'antal': antal}\n\n@app.get('/varor')\ndef varor(s = Depends(sidor)):\n    ...\n```\n\n`Depends(sidor)` betyder: kör `sidor` och ge mig det den returnerar. Alla vägar som använder den får samma frågor och samma kontroller.",
    example:
      "def sok(q: str = ''):\n    return q.lower()\n\n@app.get('/filmer')\ndef filmer(ord = Depends(sok)):\n    return [f for f in FILMER if ord in f.lower()]",
    task: 'Uppgift: Skriv beroendet `sidor(start: int = 0, antal: int = 2)`. Använd det i både `/varor` och `/kunder`, som svarar med sin del av listan.',
    starterCode: `${IMPORT}\nVAROR = ['äpple', 'banan', 'citron', 'dadel']\nKUNDER = ['Ada', 'Bo', 'Cy']\n`,
    solution: `${IMPORT}\nVAROR = ['äpple', 'banan', 'citron', 'dadel']\nKUNDER = ['Ada', 'Bo', 'Cy']\n\n\ndef sidor(start: int = 0, antal: int = 2):\n    return {'start': start, 'antal': antal}\n\n\n@app.get('/varor')\ndef varor(s=Depends(sidor)):\n    return VAROR[s['start']:s['start'] + s['antal']]\n\n\n@app.get('/kunder')\ndef kunder(s=Depends(sidor)):\n    return KUNDER[s['start']:s['start'] + s['antal']]\n`,
    hints: [
      "def sidor(start: int = 0, antal: int = 2):\n    return {'start': start, 'antal': antal}",
      'def varor(s=Depends(sidor)):',
      "return VAROR[s['start']:s['start'] + s['antal']]",
    ],
    tests: [
      {
        description: '/varor',
        code: "__get('/varor').json",
        expected: ['äpple', 'banan'],
      },
      {
        description: '/varor?start=2',
        code: "__get('/varor?start=2').json",
        expected: ['citron', 'dadel'],
      },
      {
        description: '/kunder?start=1&antal=5',
        code: "__get('/kunder?start=1&antal=5').json",
        expected: ['Bo', 'Cy'],
      },
      {
        description: 'Fel typ ger 422 även här',
        code: "__get('/kunder?antal=många').status",
        expected: 422,
      },
    ],
    request: { path: '/varor?start=2' },
  },
  {
    id: 'fa-beroenden-02',
    track: 'beroenden',
    title: 'Läsa en header',
    xp: 15,
    description:
      'Ett anrop har headers: extra uppgifter som inte syns i adressen, som vilket språk man vill ha.',
    explain:
      "Med `Header()` läser FastAPI en header i stället för en fråga:\n\n`def hej(accept_language: str = Header(default='sv')):`\n\nI parametern skrivs `_` i stället för `-`, så `accept_language` läser headern `accept-language`.\n\nI testerna skickas headers som en dict: `__get('/hej', {'accept-language': 'en'})`.",
    example:
      "@app.get('/version')\ndef version(x_app_version: str = Header(default='1.0')):\n    return {'du har': x_app_version}",
    task: "Uppgift: `/hej` ska svara `{'text': 'Hej!'}`, men `{'text': 'Hello!'}` om headern `accept-language` är `en`. Standard är `sv`.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n\n@app.get('/hej')\ndef hej(accept_language: str = Header(default='sv')):\n    if accept_language == 'en':\n        return {'text': 'Hello!'}\n    return {'text': 'Hej!'}\n`,
    hints: [
      "accept_language: str = Header(default='sv')",
      "if accept_language == 'en':",
      "if accept_language == 'en':\n    return {'text': 'Hello!'}\nreturn {'text': 'Hej!'}",
    ],
    tests: [
      {
        description: 'Utan header',
        code: "__get('/hej').json",
        expected: { text: 'Hej!' },
      },
      {
        description: 'Med en',
        code: "__get('/hej', {'accept-language': 'en'}).json",
        expected: { text: 'Hello!' },
      },
    ],
    request: { path: '/hej', headers: { 'accept-language': 'en' } },
  },
  {
    id: 'fa-beroenden-03',
    track: 'beroenden',
    title: 'En API-nyckel',
    xp: 20,
    description:
      'Många API:er kräver en nyckel. Utan rätt nyckel svarar de 401 Unauthorized.',
    explain:
      "Ett beroende kan göra `raise` – då körs vägen aldrig.\n\n```\ndef kolla_nyckel(x_api_nyckel: str | None = Header(default=None)):\n    if x_api_nyckel != 'hemlig':\n        raise HTTPException(status_code=401, detail='Fel nyckel')\n```\n\n`default=None` gör headern valfri, så att en saknad nyckel ger 401 och inte 422.\n\nAI-tjänster fungerar likadant: varje anrop skickar en nyckel som visar vem som betalar.",
    example:
      "@app.get('/hemligt')\ndef hemligt(_=Depends(kolla_nyckel)):\n    return {'hemlighet': 42}",
    task: "Uppgift: Skriv `kolla_nyckel` (rätt nyckel är `'hemlig'`) och använd den på `/saldo`, som svarar `{'saldo': 1000}`.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n\ndef kolla_nyckel(x_api_nyckel: str | None = Header(default=None)):\n    if x_api_nyckel != 'hemlig':\n        raise HTTPException(status_code=401, detail='Fel nyckel')\n\n\n@app.get('/saldo')\ndef saldo(_=Depends(kolla_nyckel)):\n    return {'saldo': 1000}\n`,
    hints: [
      'x_api_nyckel: str | None = Header(default=None)',
      "if x_api_nyckel != 'hemlig':\n    raise HTTPException(status_code=401, detail='Fel nyckel')",
      'def saldo(_=Depends(kolla_nyckel)):',
    ],
    tests: [
      {
        description: 'Utan nyckel: 401',
        code: "__get('/saldo').status",
        expected: 401,
      },
      {
        description: 'Fel nyckel: 401',
        code: "__get('/saldo', {'x-api-nyckel': 'gissning'}).status",
        expected: 401,
      },
      {
        description: 'Rätt nyckel',
        code: "__get('/saldo', {'x-api-nyckel': 'hemlig'}).json",
        expected: { saldo: 1000 },
      },
    ],
    request: { path: '/saldo', headers: { 'x-api-nyckel': 'hemlig' } },
  },
  {
    id: 'fa-beroenden-04',
    track: 'beroenden',
    title: 'Vem är inloggad?',
    xp: 25,
    description:
      'Ett beroende kan svara med användaren som är inloggad, så att vägen vet vem som frågar.',
    explain:
      "Inloggning i API:er sker ofta med en **token** i headern `authorization`:\n\n`Authorization: Bearer abc123`\n\nBeroendet läser headern, tar bort `'Bearer '` och slår upp vem token hör till. Den användaren returneras – och vägen får den som parameter.\n\n`text.removeprefix('Bearer ')` tar bort början av en text om den finns där.",
    example:
      "@app.get('/mina-bilder')\ndef mina_bilder(anvandare=Depends(inloggad)):\n    return BILDER[anvandare['namn']]",
    task: 'Uppgift: Skriv `inloggad` som läser `authorization`, svarar 401 utan `Bearer`-token eller med okänd token, och annars returnerar användaren ur `TOKENS`. `/jag` svarar med användaren.',
    starterCode: `${IMPORT}\n${ANVANDARE}`,
    solution: `${IMPORT}\n${ANVANDARE}${INLOGGAD}\n\n@app.get('/jag')\ndef jag(anvandare=Depends(inloggad)):\n    return anvandare\n`,
    hints: [
      'authorization: str | None = Header(default=None)',
      "Kolla authorization.startswith('Bearer '), och sedan om token finns i TOKENS.",
      "token = authorization.removeprefix('Bearer ')\nreturn TOKENS[token]",
    ],
    tests: [
      {
        description: 'Ada',
        code: `__get('/jag', ${ADA}).json`,
        expected: { namn: 'Ada', roll: 'admin' },
      },
      {
        description: 'Bo',
        code: `__get('/jag', ${BO}).json['namn']`,
        expected: 'Bo',
      },
      {
        description: 'Utan header: 401',
        code: "__get('/jag').status",
        expected: 401,
      },
      {
        description: 'Utan Bearer: 401',
        code: "__get('/jag', {'authorization': 'abc123'}).status",
        expected: 401,
      },
      {
        description: 'Okänd token: 401',
        code: "__get('/jag', {'authorization': 'Bearer fel'}).status",
        expected: 401,
      },
    ],
    request: { path: '/jag', headers: { authorization: 'Bearer abc123' } },
  },
  {
    id: 'fa-beroenden-05',
    track: 'beroenden',
    title: '403 Förbjudet',
    xp: 25,
    description:
      'Inloggad är inte samma sak som tillåten. En vanlig medlem får inte göra allt en admin får.',
    explain:
      "- `401` – vi vet inte vem du är (logga in)\n- `403` – vi vet vem du är, men du får inte\n\nEtt beroende kan bero på ett annat:\n\n```\ndef admin(anvandare=Depends(inloggad)):\n    if anvandare['roll'] != 'admin':\n        raise HTTPException(status_code=403, detail='Bara för admin')\n    return anvandare\n```\n\nFastAPI kör `inloggad` först, och sedan `admin`.",
    example:
      "@app.delete('/inlagg/{id}', status_code=204)\ndef ta_bort(id: int, _=Depends(admin)):\n    ...",
    task: "Uppgift: `inloggad` finns. Skriv `admin`, och gör `/statistik` som bara admin får se. Den svarar `{'anvandare': 2}`.",
    starterCode: `${IMPORT}\n${ANVANDARE}${INLOGGAD}`,
    solution: `${IMPORT}\n${ANVANDARE}${INLOGGAD}\n\ndef admin(anvandare=Depends(inloggad)):\n    if anvandare['roll'] != 'admin':\n        raise HTTPException(status_code=403, detail='Bara för admin')\n    return anvandare\n\n\n@app.get('/statistik')\ndef statistik(_=Depends(admin)):\n    return {'anvandare': len(TOKENS)}\n`,
    hints: [
      'def admin(anvandare=Depends(inloggad)):',
      "if anvandare['roll'] != 'admin':\n    raise HTTPException(status_code=403, detail='Bara för admin')",
      "@app.get('/statistik')\ndef statistik(_=Depends(admin)):\n    return {'anvandare': len(TOKENS)}",
    ],
    tests: [
      {
        description: 'Ada (admin) får se',
        code: `__get('/statistik', ${ADA}).json`,
        expected: { anvandare: 2 },
      },
      {
        description: 'Bo (medlem) får 403',
        code: `__get('/statistik', ${BO}).status`,
        expected: 403,
      },
      {
        description: 'Ingen inloggning: 401',
        code: "__get('/statistik').status",
        expected: 401,
      },
    ],
    request: {
      path: '/statistik',
      headers: { authorization: 'Bearer xyz789' },
    },
  },
  {
    id: 'fa-beroenden-06',
    track: 'beroenden',
    title: 'Beroenden i dekoratorn',
    xp: 20,
    description:
      'Behöver vägen inte värdet från beroendet kan det stå i dekoratorn i stället.',
    explain:
      "`_=Depends(kolla_nyckel)` fungerar, men ser konstigt ut när värdet aldrig används. Skriv det i dekoratorn:\n\n`@app.get('/saldo', dependencies=[Depends(kolla_nyckel)])`\n\nOch ska **alla** vägar kräva nyckeln, sätt den på hela appen:\n\n`app = FastAPI(dependencies=[Depends(kolla_nyckel)])`",
    example:
      "@app.post('/backup', dependencies=[Depends(admin)])\ndef backup():\n    return {'klart': True}",
    task: 'Uppgift: Alla vägar i appen ska kräva nyckeln. Flytta `Depends(kolla_nyckel)` till `FastAPI(...)` och ta bort `_=` från vägarna.',
    starterCode: `from fastapi import FastAPI, Depends, Header, HTTPException\n\n\ndef kolla_nyckel(x_api_nyckel: str | None = Header(default=None)):\n    if x_api_nyckel != 'hemlig':\n        raise HTTPException(status_code=401, detail='Fel nyckel')\n\n\napp = FastAPI()\n\n\n@app.get('/saldo')\ndef saldo(_=Depends(kolla_nyckel)):\n    return {'saldo': 1000}\n\n\n@app.get('/historik')\ndef historik():\n    return ['+500', '-200']\n`,
    solution: `from fastapi import FastAPI, Depends, Header, HTTPException\n\n\ndef kolla_nyckel(x_api_nyckel: str | None = Header(default=None)):\n    if x_api_nyckel != 'hemlig':\n        raise HTTPException(status_code=401, detail='Fel nyckel')\n\n\napp = FastAPI(dependencies=[Depends(kolla_nyckel)])\n\n\n@app.get('/saldo')\ndef saldo():\n    return {'saldo': 1000}\n\n\n@app.get('/historik')\ndef historik():\n    return ['+500', '-200']\n`,
    hints: [
      '/historik saknar nyckelkontrollen helt – prova den med 📮.',
      'app = FastAPI(dependencies=[Depends(kolla_nyckel)])',
      'def saldo(): – inget _= behövs längre.',
    ],
    tests: [
      {
        description: '/historik kräver nyckel',
        code: "__get('/historik').status",
        expected: 401,
      },
      {
        description: '/saldo kräver nyckel',
        code: "__get('/saldo').status",
        expected: 401,
      },
      {
        description: 'Med nyckel',
        code: "__get('/historik', {'x-api-nyckel': 'hemlig'}).json",
        expected: ['+500', '-200'],
      },
    ],
    sourceChecks: [
      {
        description: 'Nyckeln står på hela appen',
        pattern: /FastAPI\(\s*dependencies=/,
      },
    ],
    request: { path: '/historik' },
  },
  {
    id: 'fa-beroenden-07',
    track: 'beroenden',
    title: 'Mina saker',
    xp: 25,
    description:
      'Med den inloggade användaren kan varje väg visa och spara just den personens saker.',
    explain:
      "Det här är grunden i nästan varje app med konton: samma väg, `/mina-uppgifter`, ger olika svar beroende på vem som frågar.\n\nAnvänd användarens namn som nyckel: `UPPGIFTER[anvandare['namn']]`.\n\n`setdefault(namn, [])` ger listan, och skapar en tom om den inte finns.",
    example:
      "@app.post('/mina-bilder', status_code=201)\ndef ny_bild(bild: Bild, anvandare=Depends(inloggad)):\n    BILDER.setdefault(anvandare['namn'], []).append(bild.namn)\n    return bild",
    task: "Uppgift: `GET /mina-uppgifter` svarar med den inloggades uppgifter (tom lista om inga finns). `POST /mina-uppgifter` tar emot `{'titel': …}`, lägger till titeln och svarar 201 med användarens alla uppgifter.",
    starterCode: `from fastapi import FastAPI, Depends, Header, HTTPException\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\n${ANVANDARE}UPPGIFTER = {'Ada': ['Koda']}\n${INLOGGAD}\n\nclass Uppgift(BaseModel):\n    titel: str\n`,
    solution: `from fastapi import FastAPI, Depends, Header, HTTPException\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\n${ANVANDARE}UPPGIFTER = {'Ada': ['Koda']}\n${INLOGGAD}\n\nclass Uppgift(BaseModel):\n    titel: str\n\n\n@app.get('/mina-uppgifter')\ndef mina(anvandare=Depends(inloggad)):\n    return UPPGIFTER.get(anvandare['namn'], [])\n\n\n@app.post('/mina-uppgifter', status_code=201)\ndef ny(uppgift: Uppgift, anvandare=Depends(inloggad)):\n    lista = UPPGIFTER.setdefault(anvandare['namn'], [])\n    lista.append(uppgift.titel)\n    return lista\n`,
    hints: [
      'Båda vägarna har anvandare=Depends(inloggad).',
      "UPPGIFTER.get(anvandare['namn'], [])",
      "lista = UPPGIFTER.setdefault(anvandare['namn'], [])\nlista.append(uppgift.titel)\nreturn lista",
    ],
    tests: [
      {
        description: 'Adas uppgifter',
        code: `__get('/mina-uppgifter', ${ADA}).json`,
        expected: ['Koda'],
      },
      {
        description: 'Bo har inga',
        code: `__get('/mina-uppgifter', ${BO}).json`,
        expected: [],
      },
      {
        description: 'Bo lägger till',
        code: `__post('/mina-uppgifter', {'titel': 'Diska'}, ${BO}).json`,
        expected: ['Diska'],
      },
      {
        description: 'Ada ser inte Bos',
        code: `__get('/mina-uppgifter', ${ADA}).json`,
        expected: ['Koda'],
      },
      {
        description: 'Utan inloggning: 401',
        code: "__post('/mina-uppgifter', {'titel': 'X'}).status",
        expected: 401,
      },
    ],
    request: {
      path: '/mina-uppgifter',
      headers: { authorization: 'Bearer abc123' },
    },
  },
  {
    id: 'fa-beroenden-08',
    track: 'beroenden',
    title: 'En klient som beroende',
    xp: 25,
    description:
      'Beroenden används också för saker vägen behöver prata med: en databas, eller en AI-modell.',
    explain:
      "I stället för att vägen skapar sin egen klient ger ett beroende den. Då finns klienten på **ett** ställe:\n\n```\ndef hamta_vader():\n    return Vaderklient()\n\n@app.get('/idag')\ndef idag(vader=Depends(hamta_vader)):\n    return vader.idag()\n```\n\nI nästa övning ser du varför det är så smart.",
    example:
      "def hamta_post():\n    return Postklient()\n\n@app.post('/skicka')\ndef skicka(post=Depends(hamta_post)):\n    return post.skicka('Hej')",
    task: "Uppgift: Klassen `Ordbok` finns. Skriv beroendet `hamta_ordbok()` som returnerar en `Ordbok()`, och vägen `/oversatt/{ord}` som svarar `{'ord': …, 'engelska': ordbok.oversatt(ord)}`.",
    starterCode: `${IMPORT}\n\nclass Ordbok:\n    ORD = {'hund': 'dog', 'katt': 'cat', 'hus': 'house'}\n\n    def oversatt(self, ord):\n        return self.ORD.get(ord, '?')\n`,
    solution: `${IMPORT}\n\nclass Ordbok:\n    ORD = {'hund': 'dog', 'katt': 'cat', 'hus': 'house'}\n\n    def oversatt(self, ord):\n        return self.ORD.get(ord, '?')\n\n\ndef hamta_ordbok():\n    return Ordbok()\n\n\n@app.get('/oversatt/{ord}')\ndef oversatt(ord: str, ordbok=Depends(hamta_ordbok)):\n    return {'ord': ord, 'engelska': ordbok.oversatt(ord)}\n`,
    hints: [
      'def hamta_ordbok():\n    return Ordbok()',
      'ordbok=Depends(hamta_ordbok)',
      "return {'ord': ord, 'engelska': ordbok.oversatt(ord)}",
    ],
    tests: [
      {
        description: '/oversatt/hund',
        code: "__get('/oversatt/hund').json",
        expected: { ord: 'hund', engelska: 'dog' },
      },
      {
        description: '/oversatt/bil',
        code: "__get('/oversatt/bil').json['engelska']",
        expected: '?',
      },
      {
        description: 'Ordboken kommer från beroendet',
        code: "(app.dependency_overrides.update({hamta_ordbok: lambda: type('T', (), {'oversatt': lambda self, o: 'TEST'})()}), __get('/oversatt/hund').json['engelska'])[1]",
        expected: 'TEST',
      },
    ],
    request: { path: '/oversatt/hund' },
  },
  {
    id: 'fa-beroenden-09',
    track: 'beroenden',
    title: 'Byt ut beroendet i tester',
    xp: 30,
    description:
      'Ett riktigt AI-anrop kostar pengar och svarar olika varje gång. I tester byter man ut det mot en låtsasversion.',
    explain:
      '`app.dependency_overrides` är en dict: **riktigt beroende → ersättare**.\n\n```\ndef lat_som():\n    return LatsasAI()\n\napp.dependency_overrides[hamta_ai] = lat_som\n```\n\nNu får alla vägar som har `Depends(hamta_ai)` en `LatsasAI` i stället – utan att vägarna ändras.\n\nSå testar proffs kod som pratar med betaltjänster. AI-kursen bygger på precis det här.',
    example:
      "class LatsasVader:\n    def idag(self):\n        return 'sol'\n\napp.dependency_overrides[hamta_vader] = lambda: LatsasVader()",
    task: "Uppgift: `RiktigAI` kraschar, eftersom den behöver internet. Skriv klassen `LatsasAI` med metoden `svara(fraga)` som returnerar `'Bra fråga!'`, och lägg in den i `app.dependency_overrides` för `hamta_ai`.",
    starterCode: `${IMPORT}\n\nclass RiktigAI:\n    def svara(self, fraga):\n        raise ConnectionError('Ingen kontakt med AI-tjänsten')\n\n\ndef hamta_ai():\n    return RiktigAI()\n\n\n@app.get('/fraga')\ndef fraga(q: str, ai=Depends(hamta_ai)):\n    return {'fraga': q, 'svar': ai.svara(q)}\n`,
    solution: `${IMPORT}\n\nclass RiktigAI:\n    def svara(self, fraga):\n        raise ConnectionError('Ingen kontakt med AI-tjänsten')\n\n\ndef hamta_ai():\n    return RiktigAI()\n\n\n@app.get('/fraga')\ndef fraga(q: str, ai=Depends(hamta_ai)):\n    return {'fraga': q, 'svar': ai.svara(q)}\n\n\nclass LatsasAI:\n    def svara(self, fraga):\n        return 'Bra fråga!'\n\n\napp.dependency_overrides[hamta_ai] = lambda: LatsasAI()\n`,
    hints: [
      "class LatsasAI:\n    def svara(self, fraga):\n        return 'Bra fråga!'",
      'Nyckeln i dict:en är funktionen hamta_ai, inte ett anrop av den.',
      'app.dependency_overrides[hamta_ai] = lambda: LatsasAI()',
    ],
    tests: [
      {
        description: '/fraga svarar med låtsasmodellen',
        code: "__get('/fraga?q=Vad är FastAPI?').json",
        expected: { fraga: 'Vad är FastAPI?', svar: 'Bra fråga!' },
      },
      {
        description: 'hamta_ai ger fortfarande den riktiga modellen',
        code: 'type(hamta_ai()).__name__',
        expected: 'RiktigAI',
      },
    ],
    sourceChecks: [
      {
        description: 'Använder dependency_overrides',
        pattern: /app\.dependency_overrides\[\s*hamta_ai\s*\]/,
      },
    ],
    request: { path: '/fraga?q=Hej' },
  },
];
