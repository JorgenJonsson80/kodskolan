// Bana 3: frågor i adressen (query-parametrar). Allt efter ? i adressen.
// Parametrar som inte står i vägen blir frågor.

const IMPORT = 'from fastapi import FastAPI\n\napp = FastAPI()\n';

const VAROR = `VAROR = [
    {'namn': 'Äpple', 'pris': 5, 'kategori': 'frukt'},
    {'namn': 'Bröd', 'pris': 32, 'kategori': 'bageri'},
    {'namn': 'Banan', 'pris': 4, 'kategori': 'frukt'},
    {'namn': 'Mjölk', 'pris': 16, 'kategori': 'mejeri'},
    {'namn': 'Ost', 'pris': 89, 'kategori': 'mejeri'},
]
`;

export const FRAGOR = [
  {
    id: 'fa-fragor-01',
    track: 'fragor',
    title: 'En fråga i adressen',
    xp: 15,
    description:
      'Efter ? i en adress kommer frågor: /hej?namn=Ada. Så skickar man med extra uppgifter.',
    explain:
      "En parameter i funktionen som **inte** står i vägen blir en **fråga** (query-parameter):\n\n`@app.get('/hej')` och `def hej(namn: str):`\n\nNu anropas den som `/hej?namn=Ada`. Saknas frågan svarar FastAPI 422 – den är obligatorisk.",
    example:
      "@app.get('/sok')\ndef sok(ord: str):\n    return {'du sokte': ord}",
    task: "Uppgift: `/hej?namn=Ada` ska svara `{'halsning': 'Hej Ada!'}`.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n\n@app.get('/hej')\ndef hej(namn: str):\n    return {'halsning': f'Hej {namn}!'}\n`,
    hints: [
      "Vägen är bara '/hej' – frågan står inte i vägen.",
      'def hej(namn: str):',
      "return {'halsning': f'Hej {namn}!'}",
    ],
    tests: [
      {
        description: '/hej?namn=Ada',
        code: "__get('/hej?namn=Ada').json",
        expected: { halsning: 'Hej Ada!' },
      },
      {
        description: '/hej utan namn ger 422',
        code: "__get('/hej').status",
        expected: 422,
      },
    ],
    request: { path: '/hej?namn=Ada' },
  },
  {
    id: 'fa-fragor-02',
    track: 'fragor',
    title: 'Ett standardvärde',
    xp: 15,
    description:
      'En fråga kan ha ett standardvärde. Då behöver den inte skickas med.',
    explain:
      "Ge parametern ett värde, så blir frågan **valfri**:\n\n`def hej(namn: str = 'du'):`\n\n`/hej` ger `namn = 'du'`, och `/hej?namn=Ada` ger `namn = 'Ada'`.",
    example:
      "@app.get('/kaffe')\ndef kaffe(storlek: str = 'mellan'):\n    return {'storlek': storlek}",
    task: "Uppgift: Gör `namn` valfritt med standardvärdet `'du'`, så att `/hej` svarar `{'halsning': 'Hej du!'}`.",
    starterCode: `${IMPORT}\n\n@app.get('/hej')\ndef hej(namn: str):\n    return {'halsning': f'Hej {namn}!'}\n`,
    solution: `${IMPORT}\n\n@app.get('/hej')\ndef hej(namn: str = 'du'):\n    return {'halsning': f'Hej {namn}!'}\n`,
    hints: [
      'Ändra bara parametern.',
      "namn: str = 'du'",
      "def hej(namn: str = 'du'):",
    ],
    tests: [
      {
        description: '/hej',
        code: "__get('/hej').json",
        expected: { halsning: 'Hej du!' },
      },
      {
        description: '/hej?namn=Ada',
        code: "__get('/hej?namn=Ada').json",
        expected: { halsning: 'Hej Ada!' },
      },
    ],
    request: { path: '/hej' },
  },
  {
    id: 'fa-fragor-03',
    track: 'fragor',
    title: 'Tal i frågan',
    xp: 15,
    description:
      'Typerna fungerar likadant för frågor: int och float görs om till tal.',
    explain:
      'Flera frågor skiljs åt med `&`: `/rakna?a=2&b=3`.\n\nMed `a: int` blir `"2"` talet `2`, och `?a=två` ger 422 – precis som i vägen.',
    example:
      "@app.get('/medel')\ndef medel(a: float, b: float):\n    return {'medel': (a + b) / 2}",
    task: "Uppgift: `/gange?a=6&b=7` ska svara `{'svar': 42}`. Båda är heltal, och `b` ska vara `1` om den inte skickas med.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n\n@app.get('/gange')\ndef gange(a: int, b: int = 1):\n    return {'svar': a * b}\n`,
    hints: [
      'Två parametrar: a och b.',
      'b: int = 1 ger b ett standardvärde.',
      "def gange(a: int, b: int = 1):\n    return {'svar': a * b}",
    ],
    tests: [
      {
        description: '/gange?a=6&b=7',
        code: "__get('/gange?a=6&b=7').json",
        expected: { svar: 42 },
      },
      {
        description: '/gange?a=5',
        code: "__get('/gange?a=5').json",
        expected: { svar: 5 },
      },
      {
        description: '/gange?a=sex ger 422',
        code: "__get('/gange?a=sex').status",
        expected: 422,
      },
    ],
    request: { path: '/gange?a=6&b=7' },
  },
  {
    id: 'fa-fragor-04',
    track: 'fragor',
    title: 'Filtrera en lista',
    xp: 15,
    description:
      'Frågor används ofta för att filtrera: ge mig bara frukterna, bara det som är billigt …',
    explain:
      "`/varor?kategori=frukt` ska bara ge frukterna. Gå igenom listan och behåll det som passar – en list comprehension är perfekt:\n\n`[v for v in VAROR if v['kategori'] == kategori]`",
    example:
      "@app.get('/djur')\ndef djur(art: str):\n    return [d for d in DJUR if d['art'] == art]",
    task: 'Uppgift: `/varor?kategori=frukt` ska svara med varorna i den kategorin.',
    starterCode: `${IMPORT}\n${VAROR}`,
    solution: `${IMPORT}\n${VAROR}\n\n@app.get('/varor')\ndef varor(kategori: str):\n    return [v for v in VAROR if v['kategori'] == kategori]\n`,
    hints: [
      "@app.get('/varor') och kategori: str",
      "Behåll varorna där v['kategori'] == kategori.",
      "return [v for v in VAROR if v['kategori'] == kategori]",
    ],
    tests: [
      {
        description: '/varor?kategori=frukt',
        code: "[v['namn'] for v in __get('/varor?kategori=frukt').json]",
        expected: ['Äpple', 'Banan'],
      },
      {
        description: '/varor?kategori=mejeri',
        code: "[v['namn'] for v in __get('/varor?kategori=mejeri').json]",
        expected: ['Mjölk', 'Ost'],
      },
      {
        description: '/varor?kategori=godis ger en tom lista',
        code: "__get('/varor?kategori=godis').json",
        expected: [],
      },
    ],
    request: { path: '/varor?kategori=frukt' },
  },
  {
    id: 'fa-fragor-05',
    track: 'fragor',
    title: 'Valfritt filter',
    xp: 20,
    description:
      'Ett bra API ger allt om man inte filtrerar, och bara det man vill ha om man gör det.',
    explain:
      '`str | None = None` betyder: en text, eller ingenting. Standardvärdet är `None`.\n\nI funktionen kollar du sedan:\n\n```\nif kategori is None:\n    return VAROR\n```\n\n`|` betyder **eller** i en typ.',
    example:
      "@app.get('/filmer')\ndef filmer(genre: str | None = None):\n    if genre is None:\n        return FILMER\n    return [f for f in FILMER if f['genre'] == genre]",
    task: 'Uppgift: Gör `kategori` valfri. `/varor` ska ge alla varor, och `/varor?kategori=frukt` bara frukterna.',
    starterCode: `${IMPORT}\n${VAROR}\n\n@app.get('/varor')\ndef varor(kategori: str):\n    return [v for v in VAROR if v['kategori'] == kategori]\n`,
    solution: `${IMPORT}\n${VAROR}\n\n@app.get('/varor')\ndef varor(kategori: str | None = None):\n    if kategori is None:\n        return VAROR\n    return [v for v in VAROR if v['kategori'] == kategori]\n`,
    hints: [
      'kategori: str | None = None',
      'Kolla if kategori is None: först.',
      'if kategori is None:\n    return VAROR',
    ],
    tests: [
      {
        description: '/varor ger alla fem',
        code: "len(__get('/varor').json)",
        expected: 5,
      },
      {
        description: '/varor?kategori=frukt',
        code: "len(__get('/varor?kategori=frukt').json)",
        expected: 2,
      },
    ],
    request: { path: '/varor' },
  },
  {
    id: 'fa-fragor-06',
    track: 'fragor',
    title: 'Sant eller falskt',
    xp: 15,
    description:
      'En fråga kan vara bool. FastAPI förstår true, false, 1, 0, yes och no.',
    explain:
      'Med `klara: bool = False` blir `?klara=true` till `True`. Även `1`, `on` och `yes` räknas som sant.\n\nBra för ett filter som antingen är på eller av.',
    example:
      "@app.get('/lampor')\ndef lampor(tanda: bool = False):\n    return [l for l in LAMPOR if l['tand'] == tanda]",
    task: 'Uppgift: `/uppgifter` ska ge alla uppgifter, men `/uppgifter?bara_klara=true` bara de som är klara.',
    starterCode: `${IMPORT}\nUPPGIFTER = [\n    {'titel': 'Handla', 'klar': True},\n    {'titel': 'Städa', 'klar': False},\n    {'titel': 'Koda', 'klar': True},\n]\n`,
    solution: `${IMPORT}\nUPPGIFTER = [\n    {'titel': 'Handla', 'klar': True},\n    {'titel': 'Städa', 'klar': False},\n    {'titel': 'Koda', 'klar': True},\n]\n\n\n@app.get('/uppgifter')\ndef uppgifter(bara_klara: bool = False):\n    if bara_klara:\n        return [u for u in UPPGIFTER if u['klar']]\n    return UPPGIFTER\n`,
    hints: [
      'bara_klara: bool = False',
      'if bara_klara: – då filtrerar du.',
      "if bara_klara:\n    return [u for u in UPPGIFTER if u['klar']]\nreturn UPPGIFTER",
    ],
    tests: [
      {
        description: '/uppgifter ger alla tre',
        code: "len(__get('/uppgifter').json)",
        expected: 3,
      },
      {
        description: '/uppgifter?bara_klara=true',
        code: "[u['titel'] for u in __get('/uppgifter?bara_klara=true').json]",
        expected: ['Handla', 'Koda'],
      },
      {
        description: '/uppgifter?bara_klara=false ger alla',
        code: "len(__get('/uppgifter?bara_klara=false').json)",
        expected: 3,
      },
    ],
    request: { path: '/uppgifter?bara_klara=true' },
  },
  {
    id: 'fa-fragor-07',
    track: 'fragor',
    title: 'En sida i taget',
    xp: 20,
    description:
      'Har API:et tusentals saker skickar det några i taget. Det kallas sidindelning (pagination).',
    explain:
      'Två frågor bestämmer vilken del av listan som skickas:\n- `start` – hur många som hoppas över\n- `antal` – hur många som skickas\n\nMed en **slice** blir det en rad: `VAROR[start:start + antal]`.\n\n`/varor?start=2&antal=2` ger alltså vara nummer 3 och 4.',
    example:
      "@app.get('/bilder')\ndef bilder(start: int = 0, antal: int = 10):\n    return BILDER[start:start + antal]",
    task: 'Uppgift: `/varor` ska ta frågorna `start` (standard 0) och `antal` (standard 2) och svara med den delen av `VAROR`.',
    starterCode: `${IMPORT}\n${VAROR}`,
    solution: `${IMPORT}\n${VAROR}\n\n@app.get('/varor')\ndef varor(start: int = 0, antal: int = 2):\n    return VAROR[start:start + antal]\n`,
    hints: [
      'start: int = 0, antal: int = 2',
      'En slice: lista[från:till].',
      'return VAROR[start:start + antal]',
    ],
    tests: [
      {
        description: '/varor ger de två första',
        code: "[v['namn'] for v in __get('/varor').json]",
        expected: ['Äpple', 'Bröd'],
      },
      {
        description: '/varor?start=2&antal=2',
        code: "[v['namn'] for v in __get('/varor?start=2&antal=2').json]",
        expected: ['Banan', 'Mjölk'],
      },
      {
        description: '/varor?start=4&antal=10 ger bara den sista',
        code: "[v['namn'] for v in __get('/varor?start=4&antal=10').json]",
        expected: ['Ost'],
      },
    ],
    request: { path: '/varor?start=2&antal=2' },
  },
  {
    id: 'fa-fragor-08',
    track: 'fragor',
    title: 'Väg och fråga tillsammans',
    xp: 20,
    description:
      'En väg kan ha både en variabel i adressen och frågor efter ?.',
    explain:
      'FastAPI vet vilket som är vilket: står namnet i vägen (`{id}`) kommer det från adressen, annars är det en fråga.\n\n`/bocker/2?kort=true` ger `id = 2` och `kort = True`.',
    example:
      "@app.get('/stad/{namn}')\ndef stad(namn: str, versaler: bool = False):\n    return {'stad': namn.upper() if versaler else namn}",
    task: "Uppgift: `/bocker/{id}` ska svara med boken. Med `?kort=true` ska svaret bara vara `{'titel': …}`.",
    starterCode: `${IMPORT}\nBOCKER = {\n    1: {'titel': 'Pippi Långstrump', 'sidor': 160, 'ar': 1945},\n    2: {'titel': 'Mumintrollet', 'sidor': 140, 'ar': 1948},\n}\n`,
    solution: `${IMPORT}\nBOCKER = {\n    1: {'titel': 'Pippi Långstrump', 'sidor': 160, 'ar': 1945},\n    2: {'titel': 'Mumintrollet', 'sidor': 140, 'ar': 1948},\n}\n\n\n@app.get('/bocker/{id}')\ndef bok(id: int, kort: bool = False):\n    if kort:\n        return {'titel': BOCKER[id]['titel']}\n    return BOCKER[id]\n`,
    hints: [
      'def bok(id: int, kort: bool = False):',
      'BOCKER är en dict, så BOCKER[id] ger boken.',
      "if kort:\n    return {'titel': BOCKER[id]['titel']}\nreturn BOCKER[id]",
    ],
    tests: [
      {
        description: '/bocker/2',
        code: "__get('/bocker/2').json",
        expected: { titel: 'Mumintrollet', sidor: 140, ar: 1948 },
      },
      {
        description: '/bocker/1?kort=true',
        code: "__get('/bocker/1?kort=true').json",
        expected: { titel: 'Pippi Långstrump' },
      },
    ],
    request: { path: '/bocker/1?kort=true' },
  },
  {
    id: 'fa-fragor-09',
    track: 'fragor',
    title: 'Sortera',
    xp: 20,
    description:
      'Ett API kan låta den som frågar bestämma ordningen: billigast först, eller dyrast först.',
    explain:
      "`sorted(lista, key=…)` sorterar efter det `key` ger. Med `reverse=True` blir det baklänges.\n\n`sorted(VAROR, key=lambda v: v['pris'])` sorterar efter pris.\n\nEn Enum, som i förra banan, kan begränsa vad man får sortera efter – här håller vi det enkelt med en `bool`.",
    example:
      "@app.get('/spelare')\ndef spelare(basta_forst: bool = True):\n    return sorted(SPELARE, key=lambda s: s['poang'], reverse=basta_forst)",
    task: 'Uppgift: `/varor` ska svara med alla varor sorterade efter pris, billigast först. Med `?dyrast_forst=true` ska ordningen vändas.',
    starterCode: `${IMPORT}\n${VAROR}`,
    solution: `${IMPORT}\n${VAROR}\n\n@app.get('/varor')\ndef varor(dyrast_forst: bool = False):\n    return sorted(VAROR, key=lambda v: v['pris'], reverse=dyrast_forst)\n`,
    hints: [
      'dyrast_forst: bool = False',
      "sorted(VAROR, key=lambda v: v['pris'])",
      "return sorted(VAROR, key=lambda v: v['pris'], reverse=dyrast_forst)",
    ],
    tests: [
      {
        description: 'Billigast först',
        code: "[v['namn'] for v in __get('/varor').json]",
        expected: ['Banan', 'Äpple', 'Mjölk', 'Bröd', 'Ost'],
      },
      {
        description: 'Dyrast först',
        code: "[v['namn'] for v in __get('/varor?dyrast_forst=true').json]",
        expected: ['Ost', 'Bröd', 'Mjölk', 'Äpple', 'Banan'],
      },
    ],
    request: { path: '/varor?dyrast_forst=true' },
  },
];
