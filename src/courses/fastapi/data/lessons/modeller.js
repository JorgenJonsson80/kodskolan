// Bana 4: Pydantic-modeller. Ta emot JSON med @app.post, och låt en modell
// kontrollera den. Statuskoder som 201 kommer i bana 5, så POST svarar 200.

const IMPORT =
  'from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n';

const HUND = '\n\nclass Hund(BaseModel):\n    namn: str\n    alder: int\n';

export const MODELLER = [
  {
    id: 'fa-modeller-01',
    track: 'modeller',
    title: 'Första modellen',
    xp: 15,
    description:
      'Med POST skickar man data till API:et. En modell beskriver hur den datan ska se ut.',
    explain:
      'En **modell** är en klass som ärver från `BaseModel`. Varje rad är ett fält med en typ:\n\n```\nclass Hund(BaseModel):\n    namn: str\n    alder: int\n```\n\nSom parameter till en `@app.post`-väg läser FastAPI JSON:en som skickas med anropet, kontrollerar den och ger dig en färdig `Hund`. Returnerar du modellen blir den JSON igen.\n\nI 📮 väljer du POST och skriver JSON:en som ska skickas.',
    example:
      "class Bok(BaseModel):\n    titel: str\n    sidor: int\n\n@app.post('/bocker')\ndef ny_bok(bok: Bok):\n    return bok",
    task: 'Uppgift: Gör modellen `Hund` med `namn` (text) och `alder` (heltal), och vägen `POST /hundar` som svarar med hunden den fick.',
    starterCode: IMPORT,
    solution: `${IMPORT}${HUND}\n\n@app.post('/hundar')\ndef ny_hund(hund: Hund):\n    return hund\n`,
    hints: [
      'class Hund(BaseModel):\n    namn: str\n    alder: int',
      "@app.post('/hundar') och hund: Hund som parameter.",
      "@app.post('/hundar')\ndef ny_hund(hund: Hund):\n    return hund",
    ],
    tests: [
      {
        description: 'POST /hundar svarar med hunden',
        code: "__post('/hundar', {'namn': 'Bamse', 'alder': 3}).json",
        expected: { namn: 'Bamse', alder: 3 },
      },
      {
        description: 'Ett tal som text görs om till tal',
        code: "__post('/hundar', {'namn': 'Saga', 'alder': '5'}).json",
        expected: { namn: 'Saga', alder: 5 },
      },
    ],
    request: {
      method: 'POST',
      path: '/hundar',
      body: '{"namn": "Bamse", "alder": 3}',
    },
  },
  {
    id: 'fa-modeller-02',
    track: 'modeller',
    title: 'När JSON:en är fel',
    xp: 15,
    description:
      'Saknas ett fält, eller har det fel typ, svarar FastAPI 422 – och din funktion körs inte alls.',
    explain:
      "Modellen är en kontroll vid dörren. Allt som inte stämmer stoppas med **422**, och `loc` i svaret pekar ut fältet:\n\n`['body', 'alder']` betyder: i det som skickades (`body`), fältet `alder`.\n\nDu slipper alltså skriva `if 'alder' not in data` själv.",
    example:
      "# POST /hundar med {'namn': 'Bamse'}\n# ger 422, eftersom alder saknas",
    task: 'Uppgift: Modellen och vägen finns. Lägg till fältet `ras` (text) i `Hund`, så att en hund utan ras ger 422. Prova med 📮.',
    starterCode: `${IMPORT}${HUND}\n\n@app.post('/hundar')\ndef ny_hund(hund: Hund):\n    return hund\n`,
    solution: `${IMPORT}\n\nclass Hund(BaseModel):\n    namn: str\n    alder: int\n    ras: str\n\n\n@app.post('/hundar')\ndef ny_hund(hund: Hund):\n    return hund\n`,
    hints: [
      'Ett fält till i klassen.',
      'ras: str',
      'class Hund(BaseModel):\n    namn: str\n    alder: int\n    ras: str',
    ],
    tests: [
      {
        description: 'Med ras',
        code: "__post('/hundar', {'namn': 'Bamse', 'alder': 3, 'ras': 'Tax'}).json",
        expected: { namn: 'Bamse', alder: 3, ras: 'Tax' },
      },
      {
        description: 'Utan ras ger 422',
        code: "__post('/hundar', {'namn': 'Bamse', 'alder': 3}).status",
        expected: 422,
      },
      {
        description: 'Felet pekar på ras',
        code: "__post('/hundar', {'namn': 'Bamse', 'alder': 3}).json['detail'][0]['loc']",
        expected: ['body', 'ras'],
      },
    ],
    request: {
      method: 'POST',
      path: '/hundar',
      body: '{"namn": "Bamse", "alder": 3}',
    },
  },
  {
    id: 'fa-modeller-03',
    track: 'modeller',
    title: 'Standardvärden',
    xp: 15,
    description: 'Ett fält med ett standardvärde behöver inte skickas med.',
    explain:
      "Precis som för frågor: ge fältet ett värde, så blir det valfritt.\n\n```\nclass Uppgift(BaseModel):\n    titel: str\n    klar: bool = False\n```\n\n`{'titel': 'Handla'}` blir då en uppgift med `klar = False`.",
    example: 'class Order(BaseModel):\n    vara: str\n    antal: int = 1',
    task: 'Uppgift: Gör modellen `Uppgift` med `titel` (text), `klar` (bool, standard `False`) och `prioritet` (heltal, standard `3`). `POST /uppgifter` svarar med uppgiften.',
    starterCode: IMPORT,
    solution: `${IMPORT}\n\nclass Uppgift(BaseModel):\n    titel: str\n    klar: bool = False\n    prioritet: int = 3\n\n\n@app.post('/uppgifter')\ndef ny_uppgift(uppgift: Uppgift):\n    return uppgift\n`,
    hints: [
      'klar: bool = False',
      'prioritet: int = 3',
      "@app.post('/uppgifter')\ndef ny_uppgift(uppgift: Uppgift):\n    return uppgift",
    ],
    tests: [
      {
        description: 'Bara titel',
        code: "__post('/uppgifter', {'titel': 'Handla'}).json",
        expected: { titel: 'Handla', klar: false, prioritet: 3 },
      },
      {
        description: 'Allt ifyllt',
        code: "__post('/uppgifter', {'titel': 'Koda', 'klar': True, 'prioritet': 1}).json",
        expected: { titel: 'Koda', klar: true, prioritet: 1 },
      },
      {
        description: 'Utan titel ger 422',
        code: "__post('/uppgifter', {'klar': True}).status",
        expected: 422,
      },
    ],
    request: {
      method: 'POST',
      path: '/uppgifter',
      body: '{"titel": "Handla"}',
    },
  },
  {
    id: 'fa-modeller-04',
    track: 'modeller',
    title: 'Spara det som skickas',
    xp: 20,
    description:
      'Ett API som tar emot data brukar spara den, så att den går att hämta igen.',
    explain:
      '`hund.model_dump()` gör om modellen till en vanlig dict. Den kan du lägga i en lista.\n\nNu har API:et två vägar till samma adress: `GET /hundar` hämtar, `POST /hundar` lägger till. Det är vanligt – metoden avgör vad som händer.\n\n(Listan töms när appen startar om. I bana 8 sparar vi i en databas.)',
    example:
      "BOCKER = []\n\n@app.post('/bocker')\ndef ny_bok(bok: Bok):\n    BOCKER.append(bok.model_dump())\n    return bok",
    task: 'Uppgift: `POST /hundar` ska spara hunden i `HUNDAR` och svara med den. `GET /hundar` ska svara med alla sparade hundar.',
    starterCode: `${IMPORT}${HUND}\nHUNDAR = []\n`,
    solution: `${IMPORT}${HUND}\nHUNDAR = []\n\n\n@app.get('/hundar')\ndef alla_hundar():\n    return HUNDAR\n\n\n@app.post('/hundar')\ndef ny_hund(hund: Hund):\n    HUNDAR.append(hund.model_dump())\n    return hund\n`,
    hints: [
      'Två vägar: @app.get och @app.post till /hundar.',
      'HUNDAR.append(hund.model_dump())',
      "@app.post('/hundar')\ndef ny_hund(hund: Hund):\n    HUNDAR.append(hund.model_dump())\n    return hund",
    ],
    tests: [
      {
        description: 'Tom från början',
        code: "__get('/hundar').json",
        expected: [],
      },
      {
        description: 'POST svarar med hunden',
        code: "__post('/hundar', {'namn': 'Bamse', 'alder': 3}).json",
        expected: { namn: 'Bamse', alder: 3 },
      },
      {
        description: 'Hunden finns sedan i GET',
        code: "(__post('/hundar', {'namn': 'Saga', 'alder': 1}), __get('/hundar').json)[1]",
        expected: [
          { namn: 'Bamse', alder: 3 },
          { namn: 'Saga', alder: 1 },
        ],
      },
      {
        description: 'En felaktig hund sparas inte',
        code: "(__post('/hundar', {'namn': 'Fel'}), len(__get('/hundar').json))[1]",
        expected: 2,
      },
    ],
    request: {
      method: 'POST',
      path: '/hundar',
      body: '{"namn": "Bamse", "alder": 3}',
    },
  },
  {
    id: 'fa-modeller-05',
    track: 'modeller',
    title: 'Räkna med modellen',
    xp: 20,
    description:
      'Fälten i modellen läser du som vanliga attribut: order.antal, order.pris.',
    explain:
      'En modell är ett objekt. Fälten nås med punkt: `order.antal`.\n\nVägen behöver inte svara med samma sak som den fick. Här tar den emot en beställning och svarar med vad den kostar.',
    example:
      "class Rektangel(BaseModel):\n    bredd: float\n    hojd: float\n\n@app.post('/area')\ndef area(r: Rektangel):\n    return {'area': r.bredd * r.hojd}",
    task: "Uppgift: Modellen `Order` har `vara`, `antal` (heltal) och `styckpris` (decimaltal). `POST /pris` ska svara `{'vara': …, 'summa': antal * styckpris}`.",
    starterCode: `${IMPORT}\n\nclass Order(BaseModel):\n    vara: str\n    antal: int\n    styckpris: float\n`,
    solution: `${IMPORT}\n\nclass Order(BaseModel):\n    vara: str\n    antal: int\n    styckpris: float\n\n\n@app.post('/pris')\ndef pris(order: Order):\n    return {'vara': order.vara, 'summa': order.antal * order.styckpris}\n`,
    hints: [
      "@app.post('/pris') och order: Order",
      'order.antal * order.styckpris',
      "return {'vara': order.vara, 'summa': order.antal * order.styckpris}",
    ],
    tests: [
      {
        description: '3 bullar à 12.5',
        code: "__post('/pris', {'vara': 'bulle', 'antal': 3, 'styckpris': 12.5}).json",
        expected: { vara: 'bulle', summa: 37.5 },
      },
      {
        description: '2 kaffe à 30',
        code: "__post('/pris', {'vara': 'kaffe', 'antal': 2, 'styckpris': 30}).json",
        expected: { vara: 'kaffe', summa: 60.0 },
      },
    ],
    request: {
      method: 'POST',
      path: '/pris',
      body: '{"vara": "bulle", "antal": 3, "styckpris": 12.5}',
    },
  },
  {
    id: 'fa-modeller-06',
    track: 'modeller',
    title: 'Regler för fälten',
    xp: 20,
    description:
      'Ett heltal räcker inte alltid. En ålder kan inte vara -5, och ett namn får inte vara tomt.',
    explain:
      'Med `Field` sätter du regler på ett fält:\n\n```\nfrom pydantic import BaseModel, Field\n\nclass Hund(BaseModel):\n    namn: str = Field(min_length=1)\n    alder: int = Field(ge=0, le=30)\n```\n\n- `ge` – större än eller lika med (greater or equal)\n- `le` – mindre än eller lika med\n- `min_length`, `max_length` – längd på text\n\nBryts en regel blir det 422, med en förklaring.',
    example: 'class Betyg(BaseModel):\n    poang: int = Field(ge=1, le=5)',
    task: 'Uppgift: Lägg till regler i `Hund`: `namn` minst 1 tecken och högst 20, `alder` mellan 0 och 30.',
    starterCode: `from fastapi import FastAPI\nfrom pydantic import BaseModel, Field\n\napp = FastAPI()\n\n\nclass Hund(BaseModel):\n    namn: str\n    alder: int\n\n\n@app.post('/hundar')\ndef ny_hund(hund: Hund):\n    return hund\n`,
    solution: `from fastapi import FastAPI\nfrom pydantic import BaseModel, Field\n\napp = FastAPI()\n\n\nclass Hund(BaseModel):\n    namn: str = Field(min_length=1, max_length=20)\n    alder: int = Field(ge=0, le=30)\n\n\n@app.post('/hundar')\ndef ny_hund(hund: Hund):\n    return hund\n`,
    hints: [
      'namn: str = Field(min_length=1, max_length=20)',
      'alder: int = Field(ge=0, le=30)',
      'ge betyder minst, le betyder högst.',
    ],
    tests: [
      {
        description: 'En vanlig hund',
        code: "__post('/hundar', {'namn': 'Bamse', 'alder': 3}).status",
        expected: 200,
      },
      {
        description: 'Ålder -1 ger 422',
        code: "__post('/hundar', {'namn': 'Bamse', 'alder': -1}).status",
        expected: 422,
      },
      {
        description: 'Ålder 31 ger 422',
        code: "__post('/hundar', {'namn': 'Bamse', 'alder': 31}).status",
        expected: 422,
      },
      {
        description: 'Ålder 30 går bra',
        code: "__post('/hundar', {'namn': 'Bamse', 'alder': 30}).status",
        expected: 200,
      },
      {
        description: 'Tomt namn ger 422',
        code: "__post('/hundar', {'namn': '', 'alder': 3}).status",
        expected: 422,
      },
      {
        description: 'För långt namn ger 422',
        code: "__post('/hundar', {'namn': 'B' * 21, 'alder': 3}).status",
        expected: 422,
      },
    ],
    request: {
      method: 'POST',
      path: '/hundar',
      body: '{"namn": "Bamse", "alder": -1}',
    },
  },
  {
    id: 'fa-modeller-07',
    track: 'modeller',
    title: 'Valfria fält',
    xp: 15,
    description:
      'Vissa uppgifter finns inte alltid, som ett smeknamn. Då får fältet vara None.',
    explain:
      'Samma som för frågor: `str | None = None`.\n\n```\nclass Person(BaseModel):\n    namn: str\n    smeknamn: str | None = None\n```\n\nI JSON blir `None` till `null`.',
    example:
      'class Film(BaseModel):\n    titel: str\n    betyg: int | None = None',
    task: "Uppgift: Gör modellen `Kontakt` med `namn` (text), `telefon` (text eller None) och `epost` (text eller None). `POST /kontakter` svarar med kontakten och `'har_telefon': True` eller `False`.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n\nclass Kontakt(BaseModel):\n    namn: str\n    telefon: str | None = None\n    epost: str | None = None\n\n\n@app.post('/kontakter')\ndef ny_kontakt(kontakt: Kontakt):\n    return {**kontakt.model_dump(), 'har_telefon': kontakt.telefon is not None}\n`,
    hints: [
      'telefon: str | None = None',
      'kontakt.telefon is not None ger True eller False.',
      "return {**kontakt.model_dump(), 'har_telefon': kontakt.telefon is not None}",
    ],
    tests: [
      {
        description: 'Bara namn',
        code: "__post('/kontakter', {'namn': 'Ada'}).json",
        expected: {
          namn: 'Ada',
          telefon: null,
          epost: null,
          har_telefon: false,
        },
      },
      {
        description: 'Med telefon',
        code: "__post('/kontakter', {'namn': 'Bo', 'telefon': '070-123'}).json",
        expected: {
          namn: 'Bo',
          telefon: '070-123',
          epost: null,
          har_telefon: true,
        },
      },
    ],
    request: { method: 'POST', path: '/kontakter', body: '{"namn": "Ada"}' },
  },
  {
    id: 'fa-modeller-08',
    track: 'modeller',
    title: 'En lista i modellen',
    xp: 20,
    description:
      'Ett fält kan vara en lista, till exempel alla varor i en beställning.',
    explain:
      "`list[str]` är en lista med texter. Pydantic kollar varje sak i listan.\n\n```\nclass Inkopslista(BaseModel):\n    varor: list[str]\n```\n\n`{'varor': ['mjölk', 'bröd']}` går bra, men `{'varor': 'mjölk'}` ger 422 – det är ingen lista.",
    example:
      "class Klass(BaseModel):\n    elever: list[str]\n\n@app.post('/klasser')\ndef ny_klass(k: Klass):\n    return {'antal': len(k.elever)}",
    task: "Uppgift: Modellen `Pizza` har `namn` och `tillbehor` (lista med texter). `POST /pizzor` ska svara `{'namn': …, 'antal_tillbehor': …, 'pris': 80 + 10 per tillbehör}`.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n\nclass Pizza(BaseModel):\n    namn: str\n    tillbehor: list[str]\n\n\n@app.post('/pizzor')\ndef ny_pizza(pizza: Pizza):\n    antal = len(pizza.tillbehor)\n    return {'namn': pizza.namn, 'antal_tillbehor': antal, 'pris': 80 + 10 * antal}\n`,
    hints: [
      'tillbehor: list[str]',
      'len(pizza.tillbehor) ger antalet.',
      "antal = len(pizza.tillbehor)\nreturn {'namn': pizza.namn, 'antal_tillbehor': antal, 'pris': 80 + 10 * antal}",
    ],
    tests: [
      {
        description: 'Två tillbehör',
        code: "__post('/pizzor', {'namn': 'Vesuvio', 'tillbehor': ['skinka', 'ost']}).json",
        expected: { namn: 'Vesuvio', antal_tillbehor: 2, pris: 100 },
      },
      {
        description: 'Inga tillbehör',
        code: "__post('/pizzor', {'namn': 'Margherita', 'tillbehor': []}).json",
        expected: { namn: 'Margherita', antal_tillbehor: 0, pris: 80 },
      },
      {
        description: 'Ingen lista ger 422',
        code: "__post('/pizzor', {'namn': 'Fel', 'tillbehor': 'ost'}).status",
        expected: 422,
      },
    ],
    request: {
      method: 'POST',
      path: '/pizzor',
      body: '{"namn": "Vesuvio", "tillbehor": ["skinka", "ost"]}',
    },
  },
  {
    id: 'fa-modeller-09',
    track: 'modeller',
    title: 'Modell i modell',
    xp: 25,
    description:
      'En modell kan ha en annan modell som fält. Så beskriver man data som har delar.',
    explain:
      "En kund har en adress, och en adress har gata och stad. Gör två modeller och använd den ena som typ i den andra:\n\n```\nclass Adress(BaseModel):\n    gata: str\n    stad: str\n\nclass Kund(BaseModel):\n    namn: str\n    adress: Adress\n```\n\nJSON:en har då en dict i en dict. Fel i adressen pekas ut med `['body', 'adress', 'stad']`.",
    example:
      'class Punkt(BaseModel):\n    x: float\n    y: float\n\nclass Linje(BaseModel):\n    start: Punkt\n    slut: Punkt',
    task: "Uppgift: Gör `Adress` (`gata`, `stad`) och `Kund` (`namn`, `adress`). `POST /kunder` ska svara `{'etikett': 'Ada, Storgatan 1, Malmö'}`.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n\nclass Adress(BaseModel):\n    gata: str\n    stad: str\n\n\nclass Kund(BaseModel):\n    namn: str\n    adress: Adress\n\n\n@app.post('/kunder')\ndef ny_kund(kund: Kund):\n    return {'etikett': f'{kund.namn}, {kund.adress.gata}, {kund.adress.stad}'}\n`,
    hints: [
      'Två klasser. Adress måste stå före Kund.',
      'adress: Adress i Kund.',
      'kund.adress.gata och kund.adress.stad',
    ],
    tests: [
      {
        description: 'Etiketten',
        code: "__post('/kunder', {'namn': 'Ada', 'adress': {'gata': 'Storgatan 1', 'stad': 'Malmö'}}).json",
        expected: { etikett: 'Ada, Storgatan 1, Malmö' },
      },
      {
        description: 'Utan stad ger 422',
        code: "__post('/kunder', {'namn': 'Ada', 'adress': {'gata': 'Storgatan 1'}}).json['detail'][0]['loc']",
        expected: ['body', 'adress', 'stad'],
      },
    ],
    request: {
      method: 'POST',
      path: '/kunder',
      body: '{"namn": "Ada", "adress": {"gata": "Storgatan 1", "stad": "Malmö"}}',
    },
  },
];
