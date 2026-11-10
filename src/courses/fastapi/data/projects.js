import { projectSteps } from '../../../core/projects';

// Projekt som låses upp när en bana är klar. Eleven väljer ett av tre men
// kan göra alla. Varje projekt byggs i steg, och koden från förra steget
// följer med till nästa. why förklarar varför koden ser ut som den gör.
// request är anropet 📮 börjar med. Projekten finns än så länge för bana
// 1–3, se docs/kurser/fastapi.md.
const IMPORT = 'from fastapi import FastAPI\n\napp = FastAPI()\n';
const ENUM =
  'from enum import Enum\n\nfrom fastapi import FastAPI\n\napp = FastAPI()\n';

// --- Bana 1 ---

const VISIT1 = `${IMPORT}\n\n@app.get('/')\ndef start():\n    return {'namn': 'Ada Lovelace', 'yrke': 'Programmerare'}\n`;
const VISIT2 = `${VISIT1}\n\n@app.get('/intressen')\ndef intressen():\n    return ['matematik', 'maskiner', 'poesi']\n`;
const VISIT3 = `${VISIT2.replace('app = FastAPI()', "app = FastAPI(title='Adas visitkort')")}\n\n@app.get('/antal-intressen')\ndef antal():\n    return {'antal': len(intressen())}\n`;

const SKAMT0 = `${IMPORT}\nSKAMT = [\n    'Varför gick tomaten till banken? För att bli ketchup.',\n    'Vad sa nollan till åttan? Snyggt bälte!',\n    'Vilket djur är bäst på att koda? Pytonormen.',\n]\n`;
const SKAMT1 = `${SKAMT0}\n\n@app.get('/skamt')\ndef skamt():\n    return {'skamt': SKAMT[0]}\n`;
const SKAMT2 = `${SKAMT1}\n\n@app.get('/alla')\ndef alla():\n    return SKAMT\n`;
const SKAMT3 = `${SKAMT2}\n\n@app.get('/langst')\ndef langst():\n    return {'skamt': max(SKAMT, key=len)}\n`;

const LAG0 = `${IMPORT}\nSPELARE = [\n    {'namn': 'Ali', 'mal': 7},\n    {'namn': 'Bea', 'mal': 12},\n    {'namn': 'Cleo', 'mal': 4},\n]\n`;
const LAG1 = `${LAG0}\n\n@app.get('/')\ndef lag():\n    return {'lag': 'IFK Kodskolan', 'stad': 'Malmö'}\n`;
const LAG2 = `${LAG1}\n\n@app.get('/spelare')\ndef spelare():\n    return [s['namn'] for s in SPELARE]\n`;
const LAG3 = `${LAG2}\n\n@app.get('/statistik')\ndef statistik():\n    basta = max(SPELARE, key=lambda s: s['mal'])\n    return {'mal': sum(s['mal'] for s in SPELARE), 'skyttekung': basta['namn']}\n`;

// --- Bana 2 ---

const ORD0 = `${IMPORT}\nORD = {'hund': 'dog', 'katt': 'cat', 'hus': 'house', 'bil': 'car'}\n`;
const ORD1 = `${ORD0}\n\n@app.get('/ord/{ord}')\ndef oversatt(ord: str):\n    return {'svenska': ord, 'engelska': ORD.get(ord)}\n`;
const ORD2 = `${ORD1.replace("@app.get('/ord/{ord}')", "@app.get('/ord/alla')\ndef alla():\n    return sorted(ORD)\n\n\n@app.get('/ord/{ord}')")}`;
const ORD3 = `${ORD2}\n\n@app.get('/bokstav/{b}')\ndef bokstav(b: str):\n    return [o for o in sorted(ORD) if o.startswith(b)]\n`;

const RAKNA1 = `${IMPORT}\n\n@app.get('/plus/{a}/{b}')\ndef plus(a: float, b: float):\n    return {'svar': a + b}\n`;
const RAKNA2 = `${RAKNA1}\n\n@app.get('/gange/{a}/{b}')\ndef gange(a: float, b: float):\n    return {'svar': a * b}\n`;
const RAKNA3 = `${RAKNA2}\n\n@app.get('/dela/{a}/{b}')\ndef dela(a: float, b: float):\n    if b == 0:\n        return {'svar': None, 'fel': 'Det går inte att dela med noll'}\n    return {'svar': a / b}\n`;

const PLANET0 = `${ENUM}\nPLANETER = [\n    {'namn': 'Merkurius', 'typ': 'sten'},\n    {'namn': 'Venus', 'typ': 'sten'},\n    {'namn': 'Jorden', 'typ': 'sten'},\n    {'namn': 'Mars', 'typ': 'sten'},\n    {'namn': 'Jupiter', 'typ': 'gas'},\n    {'namn': 'Saturnus', 'typ': 'gas'},\n    {'namn': 'Uranus', 'typ': 'is'},\n    {'namn': 'Neptunus', 'typ': 'is'},\n]\n`;
const PLANET1 = `${PLANET0}\n\n@app.get('/planeter/{nummer}')\ndef planet(nummer: int):\n    return PLANETER[nummer - 1]\n`;
const PLANET2 = `${PLANET1}\n\n@app.get('/namn/{namn}')\ndef med_namn(namn: str):\n    for i, p in enumerate(PLANETER):\n        if p['namn'].lower() == namn.lower():\n            return {'namn': p['namn'], 'nummer': i + 1}\n    return {'fel': 'Ingen sådan planet'}\n`;
const PLANET3 = `${PLANET2}\n\n\nclass Typ(str, Enum):\n    sten = 'sten'\n    gas = 'gas'\n    is_ = 'is'\n\n\n@app.get('/typ/{typ}')\ndef av_typ(typ: Typ):\n    return [p['namn'] for p in PLANETER if p['typ'] == typ.value]\n`;

// --- Bana 3 ---

const BOK0 = `${IMPORT}\nBOCKER = [\n    {'titel': 'Pippi Långstrump', 'forfattare': 'Astrid Lindgren', 'ar': 1945},\n    {'titel': 'Mumintrollet', 'forfattare': 'Tove Jansson', 'ar': 1948},\n    {'titel': 'Emil i Lönneberga', 'forfattare': 'Astrid Lindgren', 'ar': 1963},\n    {'titel': 'Bröderna Lejonhjärta', 'forfattare': 'Astrid Lindgren', 'ar': 1973},\n]\n`;
const BOK1 = `${BOK0}\n\n@app.get('/bocker')\ndef bocker(forfattare: str | None = None):\n    svar = BOCKER\n    if forfattare is not None:\n        svar = [b for b in svar if b['forfattare'] == forfattare]\n    return svar\n`;
const BOK2 = BOK1.replace(
  'def bocker(forfattare: str | None = None):\n    svar = BOCKER\n',
  "def bocker(forfattare: str | None = None, fran: int = 0, till: int = 9999):\n    svar = [b for b in BOCKER if fran <= b['ar'] <= till]\n",
);
const BOK3 = BOK2.replace(
  'def bocker(forfattare: str | None = None, fran: int = 0, till: int = 9999):',
  'def bocker(forfattare: str | None = None, fran: int = 0, till: int = 9999, nyast_forst: bool = False):',
).replace(
  "        svar = [b for b in svar if b['forfattare'] == forfattare]\n    return svar\n",
  "        svar = [b for b in svar if b['forfattare'] == forfattare]\n    return sorted(svar, key=lambda b: b['ar'], reverse=nyast_forst)\n",
);

const FILM0 = `${IMPORT}\nFILMER = [\n    {'titel': 'Ronja Rövardotter', 'genre': 'äventyr', 'minuter': 126},\n    {'titel': 'Jönssonligan', 'genre': 'komedi', 'minuter': 95},\n    {'titel': 'Mamma Mu', 'genre': 'barn', 'minuter': 70},\n    {'titel': 'Sune i Grekland', 'genre': 'komedi', 'minuter': 92},\n]\n`;
const FILM1 = `${FILM0}\n\n@app.get('/filmer')\ndef filmer(genre: str | None = None):\n    if genre is None:\n        return FILMER\n    return [f for f in FILMER if f['genre'] == genre]\n`;
const FILM2 = `${FILM0}\n\n@app.get('/filmer')\ndef filmer(genre: str | None = None, max_minuter: int = 999):\n    svar = [f for f in FILMER if f['minuter'] <= max_minuter]\n    if genre is not None:\n        svar = [f for f in svar if f['genre'] == genre]\n    return svar\n`;
const FILM3 = `${FILM2}\n\n@app.get('/tips')\ndef tips(minuter: int = 90):\n    passar = [f for f in FILMER if f['minuter'] <= minuter]\n    if not passar:\n        return {'tips': None}\n    return {'tips': max(passar, key=lambda f: f['minuter'])['titel']}\n`;

const RECEPT0 = `${IMPORT}\nRECEPT = [\n    {'namn': 'Pannkakor', 'minuter': 30, 'vego': True, 'ingredienser': ['mjölk', 'mjöl', 'ägg']},\n    {'namn': 'Köttbullar', 'minuter': 45, 'vego': False, 'ingredienser': ['färs', 'lök', 'ägg']},\n    {'namn': 'Tomatsoppa', 'minuter': 20, 'vego': True, 'ingredienser': ['tomat', 'lök']},\n]\n`;
const RECEPT1 = `${RECEPT0}\n\n@app.get('/recept')\ndef recept(vego: bool = False):\n    if vego:\n        return [r['namn'] for r in RECEPT if r['vego']]\n    return [r['namn'] for r in RECEPT]\n`;
const RECEPT2 = `${RECEPT0}\n\n@app.get('/recept')\ndef recept(vego: bool = False, max_minuter: int = 999):\n    svar = [r for r in RECEPT if r['minuter'] <= max_minuter]\n    if vego:\n        svar = [r for r in svar if r['vego']]\n    return [r['namn'] for r in svar]\n`;
const RECEPT3 = `${RECEPT2}\n\n@app.get('/med')\ndef med(ingrediens: str):\n    return [r['namn'] for r in RECEPT if ingrediens in r['ingredienser']]\n`;

const step = (
  title,
  why,
  task,
  solution,
  hints,
  tests,
  request,
  extra = {},
) => ({
  title,
  why,
  xp: 20,
  description: title + '.',
  task: `Uppgift: ${task}`,
  solution,
  hints,
  tests,
  ...(request && { request }),
  ...extra,
});

const t = (description, code, expected) => ({ description, code, expected });

export const PROJECTS = [
  {
    id: 'fa-proj-visitkort',
    track: 'forsta',
    title: 'Ditt API-visitkort',
    reward: { emoji: '🪪', name: 'Namnbricka' },
    summary: 'Ett litet API om dig själv, som en app kan visa.',
    steps: [
      step(
        'Vem du är',
        'Startadressen / är det första en app frågar efter, så den får det viktigaste: namnet.',
        '`/` ska svara med en dict med `namn` och `yrke` (ditt eget eller någon annans).',
        VISIT1,
        [
          "@app.get('/')",
          'En dict med två nycklar.',
          "return {'namn': 'Ada Lovelace', 'yrke': 'Programmerare'}",
        ],
        [
          t(
            'namn är en text',
            "isinstance(__get('/').json.get('namn'), str)",
            true,
          ),
          t(
            'yrke är en text',
            "isinstance(__get('/').json.get('yrke'), str)",
            true,
          ),
        ],
        null,
        { starterCode: `${IMPORT}\n# Steg 1: vem du är\n` },
      ),
      step(
        'Dina intressen',
        'En lista passar när det är flera saker av samma slag. JSON-listan blir en lista i appen också.',
        '`/intressen` ska svara med en lista med minst tre intressen.',
        VISIT2,
        [
          "@app.get('/intressen')",
          'Returnera en lista med texter.',
          "return ['matematik', 'maskiner', 'poesi']",
        ],
        [t('Minst tre intressen', "len(__get('/intressen').json) >= 3", true)],
        { path: '/intressen' },
      ),
      step(
        'Namn i dokumentationen',
        'Ett API med namn är lättare att hitta och förstå på /docs. En väg kan också anropa en annan funktion.',
        "Ge appen en `title`, och gör `/antal-intressen` som svarar `{'antal': …}` – räkna med `len` på det `intressen()` returnerar.",
        VISIT3,
        [
          "FastAPI(title='Adas visitkort')",
          'Funktionen intressen() går att anropa som vanligt.',
          "return {'antal': len(intressen())}",
        ],
        [
          t(
            'Appen har en titel',
            "__openapi()['info']['title'] != 'FastAPI'",
            true,
          ),
          t(
            'Antalet stämmer',
            "__get('/antal-intressen').json['antal'] == len(__get('/intressen').json)",
            true,
          ),
        ],
        { path: '/antal-intressen' },
      ),
    ],
  },
  {
    id: 'fa-proj-skamt',
    track: 'forsta',
    title: 'Skämtautomaten',
    reward: { emoji: '😂', name: 'Skrattmaskin' },
    summary: 'Ett API som delar ut skämt.',
    steps: [
      step(
        'Dagens skämt',
        'Skämten ligger i en lista utanför funktionen, så att flera vägar kan använda samma skämt.',
        "`/skamt` ska svara `{'skamt': …}` med det första skämtet i `SKAMT`.",
        SKAMT1,
        [
          "@app.get('/skamt')",
          'SKAMT[0] är det första skämtet.',
          "return {'skamt': SKAMT[0]}",
        ],
        [
          t('Första skämtet', "__get('/skamt').json", {
            skamt: 'Varför gick tomaten till banken? För att bli ketchup.',
          }),
        ],
        { path: '/skamt' },
        { starterCode: SKAMT0 },
      ),
      step(
        'Alla skämt',
        'En app som vill visa en lista hämtar allt på en gång i stället för ett i taget.',
        '`/alla` ska svara med hela listan.',
        SKAMT2,
        ["@app.get('/alla')", 'Returnera listan som den är.', 'return SKAMT'],
        [t('Tre skämt', "len(__get('/alla').json)", 3)],
        { path: '/alla' },
      ),
      step(
        'Det längsta',
        'max med key=len jämför längden i stället för bokstäverna.',
        "`/langst` ska svara `{'skamt': …}` med det längsta skämtet.",
        SKAMT3,
        [
          "@app.get('/langst')",
          'max(SKAMT, key=len)',
          "return {'skamt': max(SKAMT, key=len)}",
        ],
        [
          t(
            'Det längsta',
            "__get('/langst').json['skamt']",
            'Varför gick tomaten till banken? För att bli ketchup.',
          ),
          t(
            'Räknar, inte fast text',
            "(SKAMT.append('Ett mycket långt skämt som ingen förstår, inte ens den som skrev det.'), __get('/langst').json['skamt'])[1].startswith('Ett mycket')",
            true,
          ),
        ],
        { path: '/langst' },
      ),
    ],
  },
  {
    id: 'fa-proj-lag',
    track: 'forsta',
    title: 'Lagets API',
    reward: { emoji: '⚽', name: 'Fotboll' },
    summary: 'Statistik om ett fotbollslag, uträknad av API:et.',
    steps: [
      step(
        'Laget',
        'Startadressen berättar vad API:et handlar om.',
        '`/` ska svara med en dict med `lag` och `stad`.',
        LAG1,
        [
          "@app.get('/')",
          "return {'lag': …, 'stad': …}",
          "return {'lag': 'IFK Kodskolan', 'stad': 'Malmö'}",
        ],
        [t('Lag och stad', "sorted(__get('/').json)", ['lag', 'stad'])],
        null,
        { starterCode: LAG0 },
      ),
      step(
        'Spelarna',
        'Appen vill kanske bara ha namnen, inte allt. En list comprehension plockar ut dem.',
        '`/spelare` ska svara med en lista med spelarnas namn.',
        LAG2,
        [
          "@app.get('/spelare')",
          "[s['namn'] for s in SPELARE]",
          "return [s['namn'] for s in SPELARE]",
        ],
        [t('Namnen', "__get('/spelare').json", ['Ali', 'Bea', 'Cleo'])],
        { path: '/spelare' },
      ),
      step(
        'Statistik',
        'Ett API räknar åt appen: då blir det samma svar i alla appar som använder det.',
        "`/statistik` ska svara `{'mal': …, 'skyttekung': …}` med totala antalet mål och namnet på den som gjort flest.",
        LAG3,
        [
          "sum(s['mal'] for s in SPELARE)",
          "max(SPELARE, key=lambda s: s['mal'])",
          "return {'mal': …, 'skyttekung': basta['namn']}",
        ],
        [
          t('Statistiken', "__get('/statistik').json", {
            mal: 23,
            skyttekung: 'Bea',
          }),
          t(
            'Räknar med listan',
            "(SPELARE.append({'namn': 'Dino', 'mal': 20}), __get('/statistik').json)[1]",
            { mal: 43, skyttekung: 'Dino' },
          ),
        ],
        { path: '/statistik' },
      ),
    ],
  },
  {
    id: 'fa-proj-ordbok',
    track: 'vagar',
    title: 'Ordboken',
    reward: { emoji: '📖', name: 'Uppslagsbok' },
    summary: 'Översätt ord från svenska till engelska via adressen.',
    steps: [
      step(
        'Slå upp ett ord',
        'Ordet i adressen blir nyckeln i en dict. get ger None i stället för att krascha.',
        "`/ord/{ord}` ska svara `{'svenska': ord, 'engelska': …}`.",
        ORD1,
        [
          "@app.get('/ord/{ord}')",
          'ORD.get(ord)',
          "return {'svenska': ord, 'engelska': ORD.get(ord)}",
        ],
        [
          t('hund', "__get('/ord/hund').json", {
            svenska: 'hund',
            engelska: 'dog',
          }),
          t('okänt ord', "__get('/ord/båt').json['engelska']", null),
        ],
        { path: '/ord/hund' },
        { starterCode: ORD0 },
      ),
      step(
        'Alla ord',
        'En fast väg måste stå före vägen med {ord}, annars tror FastAPI att "alla" är ett ord.',
        '`/ord/alla` ska svara med alla svenska ord i bokstavsordning.',
        ORD2,
        [
          'Vägen /ord/alla ska stå först.',
          'sorted(ORD) ger nycklarna i ordning.',
          "@app.get('/ord/alla')\ndef alla():\n    return sorted(ORD)",
        ],
        [
          t('Alla ord', "__get('/ord/alla').json", [
            'bil',
            'hund',
            'hus',
            'katt',
          ]),
          t('/ord/katt fungerar', "__get('/ord/katt').json['engelska']", 'cat'),
        ],
        { path: '/ord/alla' },
      ),
      step(
        'Ord på en bokstav',
        'startswith kollar början på en text – bra för en sökning medan man skriver.',
        '`/bokstav/{b}` ska svara med orden som börjar på `b`, i bokstavsordning.',
        ORD3,
        [
          "@app.get('/bokstav/{b}')",
          'o.startswith(b)',
          'return [o for o in sorted(ORD) if o.startswith(b)]',
        ],
        [
          t('Ord på h', "__get('/bokstav/h').json", ['hund', 'hus']),
          t('Ord på x', "__get('/bokstav/x').json", []),
        ],
        { path: '/bokstav/h' },
      ),
    ],
  },
  {
    id: 'fa-proj-raknare',
    track: 'vagar',
    title: 'Miniräknaren',
    reward: { emoji: '🧮', name: 'Kulram' },
    summary: 'En miniräknare där talen står i adressen.',
    steps: [
      step(
        'Plus',
        'Med float tar vägen emot både heltal och decimaltal, och allt annat ger 422.',
        "`/plus/{a}/{b}` ska svara `{'svar': a + b}`.",
        RAKNA1,
        [
          "@app.get('/plus/{a}/{b}')",
          'a: float, b: float',
          "return {'svar': a + b}",
        ],
        [
          t('2 + 3', "__get('/plus/2/3').json", { svar: 5.0 }),
          t('Inget tal: 422', "__get('/plus/två/3').status", 422),
        ],
        { path: '/plus/2/3' },
        { starterCode: IMPORT },
      ),
      step(
        'Gånger',
        'Samma mönster, ett nytt räknesätt. Vägarna är lätta att lägga till när den första finns.',
        "`/gange/{a}/{b}` ska svara `{'svar': a * b}`.",
        RAKNA2,
        [
          "@app.get('/gange/{a}/{b}')",
          'Kopiera plus och ändra.',
          "return {'svar': a * b}",
        ],
        [t('1.5 * 4', "__get('/gange/1.5/4').json", { svar: 6.0 })],
        { path: '/gange/1.5/4' },
      ),
      step(
        'Dela',
        'Att dela med noll kraschar Python. Ett bra API kollar först och svarar snällt.',
        "`/dela/{a}/{b}` ska svara `{'svar': a / b}`, men `{'svar': None, 'fel': 'Det går inte att dela med noll'}` om `b` är 0.",
        RAKNA3,
        [
          'Kolla if b == 0: först.',
          "return {'svar': None, 'fel': 'Det går inte att dela med noll'}",
          "return {'svar': a / b}",
        ],
        [
          t('9 / 2', "__get('/dela/9/2').json", { svar: 4.5 }),
          t('9 / 0', "__get('/dela/9/0').json", {
            svar: null,
            fel: 'Det går inte att dela med noll',
          }),
        ],
        { path: '/dela/9/0' },
      ),
    ],
  },
  {
    id: 'fa-proj-planeter',
    track: 'vagar',
    title: 'Solsystemet',
    reward: { emoji: '🪐', name: 'Planet' },
    summary: 'Hämta planeter med nummer, namn och typ.',
    steps: [
      step(
        'Planet nummer',
        'Människor räknar från 1, Python från 0. Därför blir det PLANETER[nummer - 1].',
        '`/planeter/{nummer}` ska svara med planeten. Jorden är nummer 3.',
        PLANET1,
        [
          "@app.get('/planeter/{nummer}')",
          'nummer: int',
          'return PLANETER[nummer - 1]',
        ],
        [t('Planet 3', "__get('/planeter/3').json['namn']", 'Jorden')],
        { path: '/planeter/3' },
        { starterCode: PLANET0 },
      ),
      step(
        'Planet med namn',
        'enumerate ger både platsen och planeten, så att numret kan räknas ut.',
        "`/namn/{namn}` ska svara `{'namn': …, 'nummer': …}`, oavsett stora eller små bokstäver. Okänd planet: `{'fel': 'Ingen sådan planet'}`.",
        PLANET2,
        [
          'for i, p in enumerate(PLANETER):',
          "p['namn'].lower() == namn.lower()",
          "return {'namn': p['namn'], 'nummer': i + 1}",
        ],
        [
          t('mars', "__get('/namn/mars').json", { namn: 'Mars', nummer: 4 }),
          t('Pluto', "__get('/namn/Pluto').json", {
            fel: 'Ingen sådan planet',
          }),
        ],
        { path: '/namn/mars' },
      ),
      step(
        'Planeter av en typ',
        'En Enum gör att bara sten, gas och is går att fråga efter. is är ett ord i Python, så namnet blir is_.',
        'Gör en Enum `Typ` med `sten`, `gas` och `is`, och `/typ/{typ}` som svarar med namnen på planeterna av den typen.',
        PLANET3,
        [
          "class Typ(str, Enum):\n    sten = 'sten'\n    gas = 'gas'\n    is_ = 'is'",
          'typ: Typ',
          "return [p['namn'] for p in PLANETER if p['typ'] == typ.value]",
        ],
        [
          t('Gasjättar', "__get('/typ/gas').json", ['Jupiter', 'Saturnus']),
          t('Okänd typ: 422', "__get('/typ/ost').status", 422),
        ],
        { path: '/typ/is' },
      ),
    ],
  },
  {
    id: 'fa-proj-boksok',
    track: 'fragor',
    title: 'Boksöket',
    reward: { emoji: '📚', name: 'Bokhög' },
    summary: 'Sök bland böcker på författare och år.',
    steps: [
      step(
        'Per författare',
        'En valfri fråga ger alla böcker när den saknas, och bara några när den finns.',
        '`/bocker` ska svara med alla böcker, eller bara den författarens med `?forfattare=…`.',
        BOK1,
        [
          'forfattare: str | None = None',
          'if forfattare is not None:',
          "[b for b in svar if b['forfattare'] == forfattare]",
        ],
        [
          t('Alla', "len(__get('/bocker').json)", 4),
          t(
            'Tove Jansson',
            "[b['titel'] for b in __get('/bocker?forfattare=Tove Jansson').json]",
            ['Mumintrollet'],
          ),
        ],
        { path: '/bocker?forfattare=Astrid Lindgren' },
        { starterCode: BOK0 },
      ),
      step(
        'Mellan två år',
        'Två frågor med standardvärden blir ett intervall. Standardvärdena släpper igenom allt.',
        'Lägg till frågorna `fran` och `till` (heltal) så att bara böcker från de åren kommer med.',
        BOK2,
        [
          'fran: int = 0, till: int = 9999',
          "fran <= b['ar'] <= till",
          "svar = [b for b in BOCKER if fran <= b['ar'] <= till]",
        ],
        [
          t(
            '1940-talet',
            "[b['titel'] for b in __get('/bocker?fran=1940&till=1949').json]",
            ['Pippi Långstrump', 'Mumintrollet'],
          ),
          t(
            'Astrid efter 1950',
            "[b['titel'] for b in __get('/bocker?forfattare=Astrid Lindgren&fran=1950').json]",
            ['Emil i Lönneberga', 'Bröderna Lejonhjärta'],
          ),
        ],
        { path: '/bocker?fran=1940&till=1949' },
      ),
      step(
        'Nyast först',
        'sorted med reverse vänder ordningen. Svaret sorteras sist, efter filtren.',
        'Lägg till `nyast_forst` (bool). Svaret ska alltid sorteras efter år, äldst först om inte `nyast_forst` är sant.',
        BOK3,
        [
          'nyast_forst: bool = False',
          "sorted(svar, key=lambda b: b['ar'], reverse=nyast_forst)",
          'Byt return svar mot den sorterade listan.',
        ],
        [
          t(
            'Nyast först',
            "[b['ar'] for b in __get('/bocker?nyast_forst=true').json]",
            [1973, 1963, 1948, 1945],
          ),
        ],
        { path: '/bocker?nyast_forst=true' },
      ),
    ],
  },
  {
    id: 'fa-proj-filmtips',
    track: 'fragor',
    title: 'Filmtipset',
    reward: { emoji: '🎬', name: 'Klappa' },
    summary: 'Hitta en film som passar humöret och tiden.',
    steps: [
      step(
        'Per genre',
        'Genren är en fråga, inte en del av adressen, eftersom den är valfri.',
        '`/filmer` ska svara med alla filmer, eller bara en genre med `?genre=…`.',
        FILM1,
        [
          'genre: str | None = None',
          "[f for f in FILMER if f['genre'] == genre]",
          'if genre is None:\n    return FILMER',
        ],
        [
          t(
            'Komedier',
            "[f['titel'] for f in __get('/filmer?genre=komedi').json]",
            ['Jönssonligan', 'Sune i Grekland'],
          ),
        ],
        { path: '/filmer?genre=komedi' },
        { starterCode: FILM0 },
      ),
      step(
        'Inte för lång',
        'Fler frågor går att kombinera. Filtrera ett steg i taget.',
        'Lägg till `max_minuter` (heltal, standard 999).',
        FILM2,
        [
          'max_minuter: int = 999',
          "svar = [f for f in FILMER if f['minuter'] <= max_minuter]",
          'Filtrera på genre efteråt.',
        ],
        [
          t(
            'Under 93 minuter',
            "[f['titel'] for f in __get('/filmer?max_minuter=93').json]",
            ['Mamma Mu', 'Sune i Grekland'],
          ),
          t(
            'Kort komedi',
            "[f['titel'] for f in __get('/filmer?genre=komedi&max_minuter=93').json]",
            ['Sune i Grekland'],
          ),
        ],
        { path: '/filmer?max_minuter=93' },
      ),
      step(
        'Ett tips',
        'Ett tips är ett svar, inte en lista. Ingen film passar? Då är svaret None.',
        "`/tips?minuter=…` (standard 90) ska svara `{'tips': titel}` med den längsta filmen som hinns med, eller `{'tips': None}`.",
        FILM3,
        [
          "passar = [f for f in FILMER if f['minuter'] <= minuter]",
          "max(passar, key=lambda f: f['minuter'])",
          "if not passar:\n    return {'tips': None}",
        ],
        [
          t('100 minuter', "__get('/tips?minuter=100').json", {
            tips: 'Jönssonligan',
          }),
          t('60 minuter', "__get('/tips?minuter=60').json", { tips: null }),
        ],
        { path: '/tips?minuter=100' },
      ),
    ],
  },
  {
    id: 'fa-proj-receptsok',
    track: 'fragor',
    title: 'Receptsöket',
    reward: { emoji: '🥗', name: 'Salladsskål' },
    summary: 'Vad kan jag laga ikväll?',
    steps: [
      step(
        'Bara vegetariskt',
        'En bool-fråga är ett filter som är på eller av: ?vego=true.',
        '`/recept` ska svara med receptens namn, bara de vegetariska med `?vego=true`.',
        RECEPT1,
        [
          'vego: bool = False',
          "[r['namn'] for r in RECEPT if r['vego']]",
          "if vego:\n    return [r['namn'] for r in RECEPT if r['vego']]",
        ],
        [
          t('Alla', "__get('/recept').json", [
            'Pannkakor',
            'Köttbullar',
            'Tomatsoppa',
          ]),
          t('Vego', "__get('/recept?vego=true').json", [
            'Pannkakor',
            'Tomatsoppa',
          ]),
        ],
        { path: '/recept?vego=true' },
        { starterCode: RECEPT0 },
      ),
      step(
        'Snabbt',
        'Filtrera på tid först och på vego sedan, så går filtren att kombinera.',
        'Lägg till `max_minuter` (standard 999).',
        RECEPT2,
        [
          'max_minuter: int = 999',
          "svar = [r for r in RECEPT if r['minuter'] <= max_minuter]",
          "return [r['namn'] for r in svar]",
        ],
        [
          t('Under 35 minuter', "__get('/recept?max_minuter=35').json", [
            'Pannkakor',
            'Tomatsoppa',
          ]),
          t('Snabbt vego', "__get('/recept?vego=true&max_minuter=25').json", [
            'Tomatsoppa',
          ]),
        ],
        { path: '/recept?max_minuter=35' },
      ),
      step(
        'Med det jag har',
        'in kollar om något finns i en lista – här om ingrediensen finns i receptet.',
        '`/med?ingrediens=…` ska svara med namnen på recepten som innehåller ingrediensen.',
        RECEPT3,
        [
          "@app.get('/med')",
          "ingrediens in r['ingredienser']",
          "return [r['namn'] for r in RECEPT if ingrediens in r['ingredienser']]",
        ],
        [
          t('Med ägg', "__get('/med?ingrediens=ägg').json", [
            'Pannkakor',
            'Köttbullar',
          ]),
          t('Utan ingrediens: 422', "__get('/med').status", 422),
        ],
        { path: '/med?ingrediens=lök' },
      ),
    ],
  },
];

export const PROJECT_STEPS = projectSteps(PROJECTS, text => `# ${text}`);
