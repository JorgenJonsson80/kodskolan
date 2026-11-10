// Bana 2: vägar och typer. Variabler i adressen, och typerna som FastAPI
// kontrollerar själv (422). Inga HTTPException än – de kommer i bana 5.

const IMPORT = 'from fastapi import FastAPI\n\napp = FastAPI()\n';

const BOCKER = `BOCKER = [
    {'id': 1, 'titel': 'Pippi Långstrump', 'forfattare': 'Astrid Lindgren'},
    {'id': 2, 'titel': 'Mumintrollet', 'forfattare': 'Tove Jansson'},
    {'id': 3, 'titel': 'Emil i Lönneberga', 'forfattare': 'Astrid Lindgren'},
]
`;

export const VAGAR = [
  {
    id: 'fa-vagar-01',
    track: 'vagar',
    title: 'En variabel i adressen',
    xp: 15,
    description:
      'Adressen kan innehålla en del som ändras, till exempel ett namn. Då räcker en väg för alla namn.',
    explain:
      "Skriv en del av adressen inom `{` och `}`, så blir den en **variabel**. Funktionen får en parameter med samma namn:\n\n`@app.get('/hej/{namn}')` och `def hej(namn: str):`\n\nAnropet `/hej/Ada` ger `namn = 'Ada'`. `: str` är en **typ** – den säger vad variabeln ska vara.",
    example:
      "@app.get('/djur/{art}')\ndef djur(art: str):\n    return {'art': art, 'langd': len(art)}",
    task: "Uppgift: `/hej/{namn}` ska svara `{'halsning': 'Hej Ada!'}` när namnet är Ada.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n\n@app.get('/hej/{namn}')\ndef hej(namn: str):\n    return {'halsning': f'Hej {namn}!'}\n`,
    hints: [
      "@app.get('/hej/{namn}')",
      'Funktionen tar emot namn: str.',
      "return {'halsning': f'Hej {namn}!'}",
    ],
    tests: [
      {
        description: '/hej/Ada',
        code: "__get('/hej/Ada').json",
        expected: { halsning: 'Hej Ada!' },
      },
      {
        description: '/hej/Åsa',
        code: "__get('/hej/Åsa').json",
        expected: { halsning: 'Hej Åsa!' },
      },
    ],
    request: { path: '/hej/Ada' },
  },
  {
    id: 'fa-vagar-02',
    track: 'vagar',
    title: 'Typen int',
    xp: 15,
    description:
      'Allt i en adress är egentligen text. Med en typ gör FastAPI om det till ett tal åt dig.',
    explain:
      'Med `tal: int` gör FastAPI om `"21"` i adressen till talet `21`, så att du kan räkna med det.\n\nÄr det inte ett tal – som i `/dubbla/hej` – svarar FastAPI **422** innan din funktion ens körs. Svaret säger vad som var fel.\n\nDet är en av de största fördelarna med FastAPI: du skriver typen en gång, och kontrollen sker automatiskt.',
    example:
      "@app.get('/halva/{tal}')\ndef halva(tal: int):\n    return {'svar': tal / 2}",
    task: "Uppgift: `/dubbla/{tal}` ska svara `{'svar': 42}` för `/dubbla/21`.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n\n@app.get('/dubbla/{tal}')\ndef dubbla(tal: int):\n    return {'svar': tal * 2}\n`,
    hints: [
      'tal: int gör texten till ett tal.',
      "Utan : int blir svaret '2121' – text gånger två.",
      "@app.get('/dubbla/{tal}')\ndef dubbla(tal: int):\n    return {'svar': tal * 2}",
    ],
    tests: [
      {
        description: '/dubbla/21 svarar 42',
        code: "__get('/dubbla/21').json",
        expected: { svar: 42 },
      },
      {
        description: '/dubbla/hej ger 422',
        code: "__get('/dubbla/hej').status",
        expected: 422,
      },
    ],
    request: { path: '/dubbla/hej' },
  },
  {
    id: 'fa-vagar-03',
    track: 'vagar',
    title: 'Vad 422 berättar',
    xp: 15,
    description:
      'När något är fel i anropet säger FastAPI exakt vad. Det sparar mycket tid för den som använder ditt API.',
    explain:
      "Ett 422-svar ser ut så här:\n\n`{'detail': [{'type': 'float_parsing', 'loc': ['path', 'x'], 'msg': '…'}]}`\n\n- `loc` – **var** felet är: i adressen (`path`), variabeln `x`\n- `type` – **vilket** fel\n- `msg` – en förklaring\n\n`float` är ett decimaltal. `float` tar emot både `3` och `1.5`.",
    example:
      "@app.get('/runda/{x}')\ndef runda(x: float):\n    return {'svar': round(x)}",
    task: "Uppgift: `/kvadrat/{x}` ska ta emot ett decimaltal och svara med `{'svar': x * x}`. Kör sedan `/kvadrat/tre` med 📮 och läs felet.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n\n@app.get('/kvadrat/{x}')\ndef kvadrat(x: float):\n    return {'svar': x * x}\n`,
    hints: [
      'x: float',
      'x * x är x i kvadrat.',
      "@app.get('/kvadrat/{x}')\ndef kvadrat(x: float):\n    return {'svar': x * x}",
    ],
    tests: [
      {
        description: '/kvadrat/1.5 svarar 2.25',
        code: "__get('/kvadrat/1.5').json",
        expected: { svar: 2.25 },
      },
      {
        description: '/kvadrat/3 svarar 9',
        code: "__get('/kvadrat/3').json",
        expected: { svar: 9.0 },
      },
      {
        description: '/kvadrat/tre: felet är i adressen, variabeln x',
        code: "__get('/kvadrat/tre').json['detail'][0]['loc']",
        expected: ['path', 'x'],
      },
    ],
    request: { path: '/kvadrat/tre' },
  },
  {
    id: 'fa-vagar-04',
    track: 'vagar',
    title: 'Hämta med id',
    xp: 15,
    description:
      'Ett API har ofta en adress per sak: /bocker/1, /bocker/2 … Siffran är sakens id.',
    explain:
      'Varje bok har ett **id** – ett tal som bara den har. Adressen `/bocker/{id}` hämtar en bok.\n\nLeta upp den med en loop och returnera den när id stämmer.\n\nOm boken inte finns svarar vi än så länge med en dict med `fel`. I bana 5 lär du dig svara med rätt statuskod, 404.',
    example:
      "@app.get('/djur/{id}')\ndef ett_djur(id: int):\n    for djur in DJUR:\n        if djur['id'] == id:\n            return djur\n    return {'fel': 'Finns inte'}",
    task: "Uppgift: `/bocker/{id}` ska svara med boken som har det id:t. Finns den inte ska svaret vara `{'fel': 'Boken finns inte'}`.",
    starterCode: `${IMPORT}\n${BOCKER}`,
    solution: `${IMPORT}\n${BOCKER}\n\n@app.get('/bocker/{id}')\ndef en_bok(id: int):\n    for bok in BOCKER:\n        if bok['id'] == id:\n            return bok\n    return {'fel': 'Boken finns inte'}\n`,
    hints: [
      'id: int, så att det går att jämföra med talen i listan.',
      "Loopa genom BOCKER och jämför bok['id'] med id.",
      "for bok in BOCKER:\n    if bok['id'] == id:\n        return bok\nreturn {'fel': 'Boken finns inte'}",
    ],
    tests: [
      {
        description: '/bocker/2 är Mumintrollet',
        code: "__get('/bocker/2').json['titel']",
        expected: 'Mumintrollet',
      },
      {
        description: '/bocker/3 är Emil',
        code: "__get('/bocker/3').json",
        expected: {
          id: 3,
          titel: 'Emil i Lönneberga',
          forfattare: 'Astrid Lindgren',
        },
      },
      {
        description: '/bocker/9 finns inte',
        code: "__get('/bocker/9').json",
        expected: { fel: 'Boken finns inte' },
      },
    ],
    request: { path: '/bocker/2' },
  },
  {
    id: 'fa-vagar-05',
    track: 'vagar',
    title: 'Två variabler',
    xp: 15,
    description: 'En adress kan ha flera variabler, var och en med sin typ.',
    explain:
      "Alla delar inom `{}` blir parametrar till funktionen:\n\n`@app.get('/rakna/{a}/plus/{b}')`\n\nOrdningen i funktionen spelar ingen roll – FastAPI matchar på **namnet**.",
    example:
      "@app.get('/resa/{fran}/{till}')\ndef resa(fran: str, till: str):\n    return {'resa': f'{fran} → {till}'}",
    task: "Uppgift: `/rakna/{a}/plus/{b}` ska svara `{'summa': a + b}` för två heltal.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n\n@app.get('/rakna/{a}/plus/{b}')\ndef plus(a: int, b: int):\n    return {'summa': a + b}\n`,
    hints: [
      "@app.get('/rakna/{a}/plus/{b}')",
      'Båda ska vara int.',
      "def plus(a: int, b: int):\n    return {'summa': a + b}",
    ],
    tests: [
      {
        description: '/rakna/2/plus/3',
        code: "__get('/rakna/2/plus/3').json",
        expected: { summa: 5 },
      },
      {
        description: '/rakna/10/plus/-4',
        code: "__get('/rakna/10/plus/-4').json",
        expected: { summa: 6 },
      },
      {
        description: '/rakna/2/plus/tre ger 422',
        code: "__get('/rakna/2/plus/tre').status",
        expected: 422,
      },
    ],
    request: { path: '/rakna/2/plus/3' },
  },
  {
    id: 'fa-vagar-06',
    track: 'vagar',
    title: 'Ordningen spelar roll',
    xp: 15,
    description:
      'Två vägar kan passa samma adress. Då vinner den som står först i koden.',
    explain:
      "FastAPI provar vägarna uppifrån och ned och tar den första som passar.\n\n`/anvandare/{namn}` passar också `/anvandare/jag`. Står den först blir `namn = 'jag'`, och vägen för `/anvandare/jag` körs aldrig.\n\nLösningen: skriv den **fasta** vägen före den med en variabel.",
    example:
      "@app.get('/filmer/senaste')\ndef senaste():\n    return {'titel': 'Ny film'}\n\n@app.get('/filmer/{titel}')\ndef film(titel: str):\n    return {'titel': titel}",
    task: "Uppgift: Båda vägarna finns redan, men `/anvandare/jag` svarar fel. Flytta på dem så att `/anvandare/jag` svarar `{'namn': 'Du själv'}`.",
    starterCode: `${IMPORT}\n\n@app.get('/anvandare/{namn}')\ndef anvandare(namn: str):\n    return {'namn': namn}\n\n\n@app.get('/anvandare/jag')\ndef jag():\n    return {'namn': 'Du själv'}\n`,
    solution: `${IMPORT}\n\n@app.get('/anvandare/jag')\ndef jag():\n    return {'namn': 'Du själv'}\n\n\n@app.get('/anvandare/{namn}')\ndef anvandare(namn: str):\n    return {'namn': namn}\n`,
    hints: [
      'Kör /anvandare/jag med 📮 och se vilken väg som svarar.',
      'Den fasta vägen ska stå först.',
      "Flytta @app.get('/anvandare/jag') och funktionen jag ovanför den andra vägen.",
    ],
    tests: [
      {
        description: '/anvandare/jag',
        code: "__get('/anvandare/jag').json",
        expected: { namn: 'Du själv' },
      },
      {
        description: '/anvandare/Ada',
        code: "__get('/anvandare/Ada').json",
        expected: { namn: 'Ada' },
      },
    ],
    request: { path: '/anvandare/jag' },
  },
  {
    id: 'fa-vagar-07',
    track: 'vagar',
    title: 'Slå upp i en dict',
    xp: 15,
    description:
      'Variabeln i adressen kan vara en nyckel i en dict, till exempel namnet på en vara.',
    explain:
      "En dict passar perfekt bakom en adress: `/pris/kaffe` slår upp `PRISER['kaffe']`.\n\n`PRISER.get(vara)` ger `None` om nyckeln saknas, i stället för att krascha. `None` blir `null` i JSON.",
    example:
      "HUVUDSTAD = {'sverige': 'Stockholm', 'norge': 'Oslo'}\n\n@app.get('/huvudstad/{land}')\ndef huvudstad(land: str):\n    return {'land': land, 'stad': HUVUDSTAD.get(land)}",
    task: "Uppgift: `/pris/{vara}` ska svara `{'vara': 'kaffe', 'pris': 30}` för kaffe, och `'pris': None` för en vara som inte finns.",
    starterCode: `${IMPORT}\nPRISER = {'kaffe': 30, 'te': 25, 'bulle': 35}\n`,
    solution: `${IMPORT}\nPRISER = {'kaffe': 30, 'te': 25, 'bulle': 35}\n\n\n@app.get('/pris/{vara}')\ndef pris(vara: str):\n    return {'vara': vara, 'pris': PRISER.get(vara)}\n`,
    hints: [
      "@app.get('/pris/{vara}')",
      'PRISER.get(vara) ger None om varan saknas.',
      "return {'vara': vara, 'pris': PRISER.get(vara)}",
    ],
    tests: [
      {
        description: '/pris/kaffe',
        code: "__get('/pris/kaffe').json",
        expected: { vara: 'kaffe', pris: 30 },
      },
      {
        description: '/pris/saft ger pris None',
        code: "__get('/pris/saft').json",
        expected: { vara: 'saft', pris: null },
      },
    ],
    request: { path: '/pris/kaffe' },
  },
  {
    id: 'fa-vagar-08',
    track: 'vagar',
    title: 'Bara vissa värden',
    xp: 20,
    description:
      'Ibland får variabeln bara vara några bestämda värden, som storlekarna liten, mellan och stor.',
    explain:
      "En **Enum** är en klass med de tillåtna värdena. Används den som typ svarar FastAPI 422 för allt annat:\n\n```\nfrom enum import Enum\n\nclass Storlek(str, Enum):\n    liten = 'liten'\n    stor = 'stor'\n```\n\n`str` i parentesen gör att värdena är text. `storlek.value` är texten, t.ex. `'stor'`.",
    example:
      "class Farg(str, Enum):\n    rod = 'röd'\n    bla = 'blå'\n\n@app.get('/farg/{farg}')\ndef farg(farg: Farg):\n    return {'farg': farg.value}",
    task: "Uppgift: Gör en Enum `Storlek` med `liten`, `mellan` och `stor`. `/kaffe/{storlek}` ska svara med priset ur `PRIS`, t.ex. `{'storlek': 'stor', 'pris': 40}`. `/kaffe/jatte` ska ge 422.",
    starterCode: `from enum import Enum\n\n${IMPORT}\nPRIS = {'liten': 25, 'mellan': 30, 'stor': 40}\n`,
    solution: `from enum import Enum\n\n${IMPORT}\nPRIS = {'liten': 25, 'mellan': 30, 'stor': 40}\n\n\nclass Storlek(str, Enum):\n    liten = 'liten'\n    mellan = 'mellan'\n    stor = 'stor'\n\n\n@app.get('/kaffe/{storlek}')\ndef kaffe(storlek: Storlek):\n    return {'storlek': storlek.value, 'pris': PRIS[storlek.value]}\n`,
    hints: [
      "class Storlek(str, Enum):\n    liten = 'liten'\n    …",
      'Använd Storlek som typ: storlek: Storlek.',
      "return {'storlek': storlek.value, 'pris': PRIS[storlek.value]}",
    ],
    tests: [
      {
        description: '/kaffe/stor',
        code: "__get('/kaffe/stor').json",
        expected: { storlek: 'stor', pris: 40 },
      },
      {
        description: '/kaffe/liten',
        code: "__get('/kaffe/liten').json",
        expected: { storlek: 'liten', pris: 25 },
      },
      {
        description: '/kaffe/jatte ger 422',
        code: "__get('/kaffe/jatte').status",
        expected: 422,
      },
    ],
    request: { path: '/kaffe/stor' },
  },
  {
    id: 'fa-vagar-09',
    track: 'vagar',
    title: 'Typerna i dokumentationen',
    xp: 20,
    description:
      'Typerna du skriver hamnar också i dokumentationen, så att andra vet vad de ska skicka.',
    explain:
      'FastAPI skriver in varje variabel i dokumentationen med typ: `int` blir `integer`, `float` blir `number` och `str` blir `string`.\n\nDen som ska använda ditt API kan alltså läsa på `/docs` att `/rum/{nummer}` vill ha ett heltal – utan att fråga dig.\n\nI testerna läser vi samma beskrivning med `__openapi()`.',
    example:
      "@app.get('/rum/{nummer}')\ndef rum(nummer: int):\n    return {'rum': nummer}",
    task: "Uppgift: Gör `/rum/{nummer}` (heltal) som svarar `{'rum': nummer, 'vaning': nummer // 100}`. Rum 214 ligger alltså på våning 2.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n\n@app.get('/rum/{nummer}')\ndef rum(nummer: int):\n    return {'rum': nummer, 'vaning': nummer // 100}\n`,
    hints: [
      'nummer: int',
      '// delar och avrundar nedåt: 214 // 100 är 2.',
      "return {'rum': nummer, 'vaning': nummer // 100}",
    ],
    tests: [
      {
        description: '/rum/214',
        code: "__get('/rum/214').json",
        expected: { rum: 214, vaning: 2 },
      },
      {
        description: 'Dokumentationen säger att nummer är ett heltal',
        code: "__openapi()['paths']['/rum/{nummer}']['get']['parameters'][0]['schema']['type']",
        expected: 'integer',
      },
    ],
    request: { path: '/rum/214' },
  },
];
