import { post, step, t } from './projectHelpers';

// Projekten för bana 4–7: modeller, svar och fel, CRUD och beroenden.
// Samma form som i projects.js. Ett steg utan starterCode börjar med
// förra stegets facit.

const PY =
  'from fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel, Field\n\napp = FastAPI()\n';

// --- Bana 4: modeller ---

// HTTPException lärs ut först i bana 5.
const PY4 =
  'from fastapi import FastAPI\nfrom pydantic import BaseModel, Field\n\napp = FastAPI()\n';

const LAGER0 = `${PY4}\nDELTAGARE = []\n`;
const LAGER1 = `${LAGER0}\n\nclass Deltagare(BaseModel):\n    namn: str = Field(min_length=1)\n    alder: int = Field(ge=7, le=15)\n    allergier: list[str] = []\n\n\n@app.post('/anmalan')\ndef anmal(d: Deltagare):\n    DELTAGARE.append(d.model_dump())\n    return d\n`;
const LAGER2 = `${LAGER1}\n\n@app.get('/deltagare')\ndef deltagare():\n    return DELTAGARE\n`;
const LAGER3 = `${LAGER2}\n\n@app.get('/allergier')\ndef allergier():\n    return sorted(set(a for d in DELTAGARE for a in d['allergier']))\n`;

const KVITTO0 = `${PY4}`;
const KVITTO1 = `${KVITTO0}\n\nclass Rad(BaseModel):\n    vara: str\n    antal: int = Field(ge=1)\n    pris: float = Field(ge=0)\n\n\nclass Kop(BaseModel):\n    rader: list[Rad]\n\n\n@app.post('/kvitto')\ndef kvitto(kop: Kop):\n    summa = sum(r.antal * r.pris for r in kop.rader)\n    return {'summa': summa}\n`;
const KVITTO2 = KVITTO1.replace(
  "    return {'summa': summa}\n",
  "    return {'summa': summa, 'varav_moms': round(summa * 0.2, 2)}\n",
);
const KVITTO3 = KVITTO2.replace(
  'class Kop(BaseModel):\n    rader: list[Rad]\n',
  'class Kop(BaseModel):\n    rader: list[Rad]\n    rabattkod: str | None = None\n',
).replace(
  '    summa = sum(r.antal * r.pris for r in kop.rader)\n',
  "    summa = sum(r.antal * r.pris for r in kop.rader)\n    if kop.rabattkod == 'KOD10':\n        summa = summa * 0.9\n",
);

const ENKAT0 = `${PY4}\nSVAR = []\n`;
const ENKAT1 = `${ENKAT0}\n\nclass Svar(BaseModel):\n    betyg: int = Field(ge=1, le=5)\n    kommentar: str | None = None\n\n\n@app.post('/svar')\ndef svara(s: Svar):\n    SVAR.append(s.model_dump())\n    return {'tack': True, 'antal_svar': len(SVAR)}\n`;
const ENKAT2 = `${ENKAT1}\n\n@app.get('/resultat')\ndef resultat():\n    if not SVAR:\n        return {'antal': 0, 'snitt': None}\n    return {'antal': len(SVAR), 'snitt': sum(s['betyg'] for s in SVAR) / len(SVAR)}\n`;
const ENKAT3 = `${ENKAT2}\n\n@app.get('/kommentarer')\ndef kommentarer():\n    return [s['kommentar'] for s in SVAR if s['kommentar'] is not None]\n`;

// --- Bana 5: svar och fel ---

const LAGR0 = `${PY}\nLAGER = {'äpple': 10}\n\n\nclass Vara(BaseModel):\n    namn: str\n    antal: int = Field(ge=0)\n`;
const LAGR1 = `${LAGR0}\n\n@app.post('/varor', status_code=201)\ndef ny(vara: Vara):\n    if vara.namn in LAGER:\n        raise HTTPException(status_code=409, detail='Varan finns redan')\n    LAGER[vara.namn] = vara.antal\n    return vara\n`;
const LAGR2 = `${LAGR1}\n\n@app.get('/varor/{namn}')\ndef en(namn: str):\n    if namn not in LAGER:\n        raise HTTPException(status_code=404, detail='Varan finns inte')\n    return {'namn': namn, 'antal': LAGER[namn]}\n`;
const LAGR3 = `${LAGR2}\n\n\nclass Uttag(BaseModel):\n    antal: int = Field(ge=1)\n\n\n@app.post('/varor/{namn}/ta')\ndef ta(namn: str, uttag: Uttag):\n    vara = en(namn)\n    if uttag.antal > vara['antal']:\n        raise HTTPException(status_code=400, detail='Det finns inte så många')\n    LAGER[namn] -= uttag.antal\n    return {'namn': namn, 'antal': LAGER[namn]}\n`;

const KONTO0 = `${PY}\nKONTON = []\n\n\nclass KontoIn(BaseModel):\n    namn: str\n    epost: str\n    losenord: str = Field(min_length=8)\n`;
const KONTO1 = `${KONTO0}\n\nclass KontoUt(BaseModel):\n    namn: str\n    epost: str\n\n\n@app.post('/konton', status_code=201, response_model=KontoUt)\ndef nytt(konto: KontoIn):\n    KONTON.append(konto.model_dump())\n    return konto\n`;
const KONTO2 = KONTO1.replace(
  '    KONTON.append(konto.model_dump())\n',
  "    if any(k['epost'] == konto.epost for k in KONTON):\n        raise HTTPException(status_code=409, detail='E-posten används redan')\n    KONTON.append(konto.model_dump())\n",
);
const KONTO3 = `${KONTO2}\n\n@app.get('/konton', response_model=list[KontoUt])\ndef alla():\n    return KONTON\n`;

const BILJ0 = `${PY}\nEVENT = {\n    1: {'namn': 'Konsert', 'platser': 2, 'salda': 0},\n    2: {'namn': 'Teater', 'platser': 100, 'salda': 99},\n}\n`;
const BILJ1 = `${BILJ0}\n\n@app.get('/event/{id}')\ndef event(id: int):\n    if id not in EVENT:\n        raise HTTPException(status_code=404, detail='Eventet finns inte')\n    e = EVENT[id]\n    return {**e, 'kvar': e['platser'] - e['salda']}\n`;
const BILJ2 = `${BILJ1}\n\n@app.post('/event/{id}/kop', status_code=201)\ndef kop(id: int):\n    e = event(id)\n    if e['kvar'] == 0:\n        raise HTTPException(status_code=409, detail='Slutsålt')\n    EVENT[id]['salda'] += 1\n    return {'biljett': EVENT[id]['salda'], 'event': e['namn']}\n`;
const BILJ3 = BILJ2.replace(
  "@app.get('/event/{id}')",
  "@app.get('/event/{id}', responses={404: {'description': 'Eventet finns inte'}})",
);

// --- Bana 6: CRUD ---

const NYTT_ID = (lista, nyckel = 'id') =>
  `max((x['${nyckel}'] for x in ${lista}), default=0) + 1`;

const HANDLA0 = `${PY}\nVAROR = []\n\n\nclass Vara(BaseModel):\n    namn: str\n    kopt: bool = False\n`;
const HANDLA1 = `${HANDLA0}\n\n@app.get('/varor')\ndef alla():\n    return VAROR\n\n\n@app.post('/varor', status_code=201)\ndef ny(vara: Vara):\n    sparad = {'id': ${NYTT_ID('VAROR')}, **vara.model_dump()}\n    VAROR.append(sparad)\n    return sparad\n`;
const HANDLA2 = `${HANDLA1}\n\n@app.patch('/varor/{id}/kopt')\ndef kopt(id: int):\n    for vara in VAROR:\n        if vara['id'] == id:\n            vara['kopt'] = True\n            return vara\n    raise HTTPException(status_code=404, detail='Varan finns inte')\n`;
const HANDLA3 = `${HANDLA2}\n\n@app.delete('/varor/kopta')\ndef rensa():\n    fore = len(VAROR)\n    VAROR[:] = [v for v in VAROR if not v['kopt']]\n    return {'borttagna': fore - len(VAROR)}\n`;

const DAGBOK0 = `${PY}\nINLAGG = []\n\n\nclass Inlagg(BaseModel):\n    datum: str\n    text: str = Field(min_length=1)\n\n\ndef hitta(id):\n    for inlagg in INLAGG:\n        if inlagg['id'] == id:\n            return inlagg\n    raise HTTPException(status_code=404, detail='Inlägget finns inte')\n`;
const DAGBOK1 = `${DAGBOK0}\n\n@app.post('/inlagg', status_code=201)\ndef nytt(inlagg: Inlagg):\n    sparat = {'id': ${NYTT_ID('INLAGG')}, **inlagg.model_dump()}\n    INLAGG.append(sparat)\n    return sparat\n\n\n@app.get('/inlagg/{id}')\ndef ett(id: int):\n    return hitta(id)\n`;
const DAGBOK2 = `${DAGBOK1}\n\n@app.put('/inlagg/{id}')\ndef byt(id: int, nytt: Inlagg):\n    inlagg = hitta(id)\n    inlagg.update(nytt.model_dump())\n    return inlagg\n`;
const DAGBOK3 = `${DAGBOK2}\n\n@app.delete('/inlagg/{id}', status_code=204)\ndef ta_bort(id: int):\n    INLAGG.remove(hitta(id))\n`;

const KANBAN0 = `from enum import Enum\n\n${PY}\nKORT = []\n\n\nclass Status(str, Enum):\n    att_gora = 'att göra'\n    pagar = 'pågår'\n    klart = 'klart'\n\n\nclass Kort(BaseModel):\n    titel: str\n    status: Status = Status.att_gora\n`;
const KANBAN1 = `${KANBAN0}\n\n@app.post('/kort', status_code=201)\ndef nytt(kort: Kort):\n    sparat = {'id': ${NYTT_ID('KORT')}, 'titel': kort.titel, 'status': kort.status.value}\n    KORT.append(sparat)\n    return sparat\n`;
const KANBAN2 = `${KANBAN1}\n\n\nclass NyStatus(BaseModel):\n    status: Status\n\n\n@app.patch('/kort/{id}')\ndef flytta(id: int, ny: NyStatus):\n    for kort in KORT:\n        if kort['id'] == id:\n            kort['status'] = ny.status.value\n            return kort\n    raise HTTPException(status_code=404, detail='Kortet finns inte')\n`;
const KANBAN3 = `${KANBAN2}\n\n@app.get('/tavla')\ndef tavla():\n    return {s.value: [k['titel'] for k in KORT if k['status'] == s.value] for s in Status}\n`;

// --- Bana 7: beroenden ---

const DEP =
  'from fastapi import FastAPI, Depends, Header, HTTPException\nfrom pydantic import BaseModel\n\napp = FastAPI()\n';

const HEMLIG0 = `${DEP}\nTOKENS = {'t-ada': 'Ada', 't-bo': 'Bo'}\nANTECKNINGAR = {}\n\n\nclass Anteckning(BaseModel):\n    text: str\n`;
const HEMLIG1 = `${HEMLIG0}\n\ndef inloggad(authorization: str | None = Header(default=None)):\n    if authorization is None or not authorization.startswith('Bearer '):\n        raise HTTPException(status_code=401, detail='Logga in först')\n    token = authorization.removeprefix('Bearer ')\n    if token not in TOKENS:\n        raise HTTPException(status_code=401, detail='Okänd token')\n    return TOKENS[token]\n\n\n@app.get('/jag')\ndef jag(namn=Depends(inloggad)):\n    return {'namn': namn}\n`;
const HEMLIG2 = `${HEMLIG1}\n\n@app.post('/anteckningar', status_code=201)\ndef ny(a: Anteckning, namn=Depends(inloggad)):\n    ANTECKNINGAR.setdefault(namn, []).append(a.text)\n    return {'antal': len(ANTECKNINGAR[namn])}\n`;
const HEMLIG3 = `${HEMLIG2}\n\n@app.get('/anteckningar')\ndef mina(namn=Depends(inloggad)):\n    return ANTECKNINGAR.get(namn, [])\n`;

const SIDOR0 = `${DEP}\nFILMER = [f'Film {n}' for n in range(1, 26)]\nSERIER = [f'Serie {n}' for n in range(1, 8)]\n`;
const SIDOR1 = `${SIDOR0}\n\ndef sidor(sida: int = 1, per_sida: int = 10):\n    return {'sida': sida, 'per_sida': per_sida}\n\n\ndef dela(lista, s):\n    start = (s['sida'] - 1) * s['per_sida']\n    return lista[start:start + s['per_sida']]\n\n\n@app.get('/filmer')\ndef filmer(s=Depends(sidor)):\n    return dela(FILMER, s)\n\n\n@app.get('/serier')\ndef serier(s=Depends(sidor)):\n    return dela(SERIER, s)\n`;
const SIDOR2 = SIDOR1.replace(
  "def sidor(sida: int = 1, per_sida: int = 10):\n    return {'sida': sida, 'per_sida': per_sida}\n",
  "def sidor(sida: int = 1, per_sida: int = 10):\n    if sida < 1 or not 1 <= per_sida <= 50:\n        raise HTTPException(status_code=400, detail='Sidan finns inte')\n    return {'sida': sida, 'per_sida': per_sida}\n",
);
const SIDOR3 = SIDOR2.replace(
  "def dela(lista, s):\n    start = (s['sida'] - 1) * s['per_sida']\n    return lista[start:start + s['per_sida']]\n",
  "def dela(lista, s):\n    start = (s['sida'] - 1) * s['per_sida']\n    return {'totalt': len(lista), 'sida': s['sida'], 'saker': lista[start:start + s['per_sida']]}\n",
);

const VADER0 = `${DEP}\n\nclass RiktigVader:\n    def idag(self, stad):\n        raise ConnectionError('Vädertjänsten svarar inte')\n`;
const VADER1 = `${VADER0}\n\ndef hamta_vader():\n    return RiktigVader()\n\n\n@app.get('/vader/{stad}')\ndef vader(stad: str, kalla=Depends(hamta_vader)):\n    return {'stad': stad, 'vader': kalla.idag(stad)}\n`;
const VADER2 = `${VADER1}\n\nclass LatsasVader:\n    def idag(self, stad):\n        return 'sol' if stad == 'Malmö' else 'regn'\n\n\napp.dependency_overrides[hamta_vader] = lambda: LatsasVader()\n`;
const VADER3 = `${VADER2}\n\n@app.get('/klader/{stad}')\ndef klader(stad: str, kalla=Depends(hamta_vader)):\n    return {'klader': 'shorts' if kalla.idag(stad) == 'sol' else 'regnjacka'}\n`;

const ADA = "{'authorization': 'Bearer t-ada'}";
const BO = "{'authorization': 'Bearer t-bo'}";

export const PROJECTS_MITTEN = [
  {
    id: 'fa-proj-lager',
    track: 'modeller',
    title: 'Sommarlägret',
    reward: { emoji: '⛺', name: 'Tält' },
    summary: 'Anmälan till ett läger, där modellen kollar allt.',
    steps: [
      step(
        'Anmälan',
        'Modellen ser till att bara barn mellan 7 och 15 kan anmälas – utan en enda if.',
        'Gör modellen `Deltagare` (`namn` minst 1 tecken, `alder` 7–15, `allergier` lista, tom som standard) och `POST /anmalan` som sparar i `DELTAGARE` och svarar med deltagaren.',
        LAGER1,
        [
          'alder: int = Field(ge=7, le=15)',
          'allergier: list[str] = []',
          'DELTAGARE.append(d.model_dump())',
        ],
        [
          t(
            'Ada, 9 år',
            "__post('/anmalan', {'namn': 'Ada', 'alder': 9}).json",
            { namn: 'Ada', alder: 9, allergier: [] },
          ),
          t(
            'För gammal: 422',
            "__post('/anmalan', {'namn': 'Bo', 'alder': 16}).status",
            422,
          ),
        ],
        post('/anmalan', { namn: 'Ada', alder: 9 }),
        { starterCode: LAGER0 },
      ),
      step(
        'Alla deltagare',
        'Ledarna vill se listan. Bara godkända anmälningar finns i den.',
        '`GET /deltagare` ska svara med alla anmälda.',
        LAGER2,
        [
          "@app.get('/deltagare')",
          'return DELTAGARE',
          "@app.get('/deltagare')\ndef deltagare():\n    return DELTAGARE",
        ],
        [
          t(
            'En fel och en rätt',
            "(__post('/anmalan', {'namn': 'X', 'alder': 3}), __post('/anmalan', {'namn': 'Cy', 'alder': 12}), [d['namn'] for d in __get('/deltagare').json])[2]",
            ['Cy'],
          ),
        ],
        { path: '/deltagare' },
      ),
      step(
        'Köket behöver veta',
        'set tar bort dubbletter, och sorted ger en ordning köket kan läsa.',
        '`GET /allergier` ska svara med alla allergier, utan dubbletter, i bokstavsordning.',
        LAGER3,
        [
          'Gå igenom varje deltagares allergier.',
          'set(...) tar bort dubbletter.',
          "return sorted(set(a for d in DELTAGARE for a in d['allergier']))",
        ],
        [
          t(
            'Allergierna',
            "(__post('/anmalan', {'namn': 'A', 'alder': 8, 'allergier': ['nötter', 'gluten']}), __post('/anmalan', {'namn': 'B', 'alder': 8, 'allergier': ['nötter']}), __get('/allergier').json)[2]",
            ['gluten', 'nötter'],
          ),
        ],
        { path: '/allergier' },
      ),
    ],
  },
  {
    id: 'fa-proj-kvitto',
    track: 'modeller',
    title: 'Kassan',
    reward: { emoji: '🧾', name: 'Kvitto' },
    summary: 'Räkna ut ett kvitto från en lista med rader.',
    steps: [
      step(
        'Summan',
        'Ett köp har många rader, och varje rad är en egen modell. list[Rad] kollar dem alla.',
        "Gör `Rad` (`vara`, `antal` minst 1, `pris` minst 0) och `Kop` (`rader`, en lista med `Rad`). `POST /kvitto` svarar `{'summa': …}`.",
        KVITTO1,
        [
          'rader: list[Rad]',
          'sum(r.antal * r.pris for r in kop.rader)',
          "return {'summa': summa}",
        ],
        [
          t(
            'Två rader',
            "__post('/kvitto', {'rader': [{'vara': 'bulle', 'antal': 2, 'pris': 15}, {'vara': 'saft', 'antal': 1, 'pris': 10}]}).json",
            { summa: 40.0 },
          ),
          t(
            'Antal 0: 422',
            "__post('/kvitto', {'rader': [{'vara': 'bulle', 'antal': 0, 'pris': 15}]}).status",
            422,
          ),
        ],
        post('/kvitto', { rader: [{ vara: 'bulle', antal: 2, pris: 15 }] }),
        { starterCode: KVITTO0 },
      ),
      step(
        'Momsen',
        'I ett pris med 25 % moms är momsen 20 % av priset. round håller det till ören.',
        'Svaret ska också ha `varav_moms`: 20 % av summan, avrundad till två decimaler.',
        KVITTO2,
        [
          'round(summa * 0.2, 2)',
          'Lägg till en nyckel i svaret.',
          "return {'summa': summa, 'varav_moms': round(summa * 0.2, 2)}",
        ],
        [
          t(
            'Moms på 40 kr',
            "__post('/kvitto', {'rader': [{'vara': 'a', 'antal': 4, 'pris': 10}]}).json",
            { summa: 40.0, varav_moms: 8.0 },
          ),
        ],
        post('/kvitto', { rader: [{ vara: 'bulle', antal: 2, pris: 15 }] }),
      ),
      step(
        'Rabattkoden',
        'Ett valfritt fält ändrar inget för den som inte skickar det.',
        "Lägg till `rabattkod` (text eller None). Koden `'KOD10'` ger 10 % rabatt på summan.",
        KVITTO3,
        [
          'rabattkod: str | None = None',
          "if kop.rabattkod == 'KOD10':",
          'summa = summa * 0.9',
        ],
        [
          t(
            'Med kod',
            "__post('/kvitto', {'rader': [{'vara': 'a', 'antal': 1, 'pris': 100}], 'rabattkod': 'KOD10'}).json['summa']",
            90.0,
          ),
          t(
            'Utan kod',
            "__post('/kvitto', {'rader': [{'vara': 'a', 'antal': 1, 'pris': 100}]}).json['summa']",
            100.0,
          ),
        ],
        post('/kvitto', {
          rader: [{ vara: 'a', antal: 1, pris: 100 }],
          rabattkod: 'KOD10',
        }),
      ),
    ],
  },
  {
    id: 'fa-proj-enkat',
    track: 'modeller',
    title: 'Enkäten',
    reward: { emoji: '📊', name: 'Diagram' },
    summary: 'Samla in betyg och kommentarer.',
    steps: [
      step(
        'Svara',
        'Ett betyg utanför 1–5 kommer aldrig in i listan, så resultatet blir aldrig fel.',
        "Gör `Svar` (`betyg` 1–5, `kommentar` text eller None) och `POST /svar` som sparar och svarar `{'tack': True, 'antal_svar': …}`.",
        ENKAT1,
        [
          'betyg: int = Field(ge=1, le=5)',
          'kommentar: str | None = None',
          "return {'tack': True, 'antal_svar': len(SVAR)}",
        ],
        [
          t('Ett svar', "__post('/svar', {'betyg': 5}).json", {
            tack: true,
            antal_svar: 1,
          }),
          t('Betyg 6: 422', "__post('/svar', {'betyg': 6}).status", 422),
        ],
        post('/svar', { betyg: 5, kommentar: 'Kul!' }),
        { starterCode: ENKAT0 },
      ),
      step(
        'Resultatet',
        'Utan svar finns inget snitt – att dela med noll kraschar. Kolla först.',
        "`GET /resultat` svarar `{'antal': …, 'snitt': …}`, med `snitt` None om inga svar finns.",
        ENKAT2,
        [
          'if not SVAR:',
          "sum(s['betyg'] for s in SVAR) / len(SVAR)",
          "return {'antal': len(SVAR), 'snitt': …}",
        ],
        [
          t('Inga svar', "__get('/resultat').json", { antal: 0, snitt: null }),
          t(
            'Två svar',
            "(__post('/svar', {'betyg': 4}), __post('/svar', {'betyg': 5}), __get('/resultat').json)[2]",
            { antal: 2, snitt: 4.5 },
          ),
        ],
        { path: '/resultat' },
      ),
      step(
        'Kommentarerna',
        'Bara de som skrev något ska synas – None hoppas över.',
        '`GET /kommentarer` svarar med alla kommentarer som inte är None.',
        ENKAT3,
        [
          "@app.get('/kommentarer')",
          "if s['kommentar'] is not None",
          "return [s['kommentar'] for s in SVAR if s['kommentar'] is not None]",
        ],
        [
          t(
            'Kommentarerna',
            "(__post('/svar', {'betyg': 4, 'kommentar': 'Bra'}), __post('/svar', {'betyg': 2}), __get('/kommentarer').json)[2]",
            ['Bra'],
          ),
        ],
        { path: '/kommentarer' },
      ),
    ],
  },
  {
    id: 'fa-proj-lagret',
    track: 'svar',
    title: 'Lagret',
    reward: { emoji: '📦', name: 'Kartong' },
    summary: 'Ett lager med rätt statuskod för varje fel.',
    steps: [
      step(
        'Ny vara',
        '201 när något skapas, 409 när det redan finns. Då vet appen vad den ska visa.',
        '`POST /varor` sparar i `LAGER` och svarar 201 med varan. Finns varan redan: 409.',
        LAGR1,
        [
          "@app.post('/varor', status_code=201)",
          'if vara.namn in LAGER:',
          "raise HTTPException(status_code=409, detail='Varan finns redan')",
        ],
        [
          t(
            'Päron: 201',
            "__post('/varor', {'namn': 'päron', 'antal': 5}).status",
            201,
          ),
          t(
            'Äpple: 409',
            "__post('/varor', {'namn': 'äpple', 'antal': 5}).status",
            409,
          ),
        ],
        post('/varor', { namn: 'päron', antal: 5 }),
        { starterCode: LAGR0 },
      ),
      step(
        'Hur många?',
        '404 betyder att varan inte finns. 200 med 0 betyder att den finns men är slut – det är skillnad.',
        "`GET /varor/{namn}` svarar `{'namn': …, 'antal': …}`, eller 404.",
        LAGR2,
        [
          "@app.get('/varor/{namn}')",
          'if namn not in LAGER:',
          "raise HTTPException(status_code=404, detail='Varan finns inte')",
        ],
        [
          t('Äpple', "__get('/varor/äpple').json", {
            namn: 'äpple',
            antal: 10,
          }),
          t('Kiwi: 404', "__get('/varor/kiwi').status", 404),
        ],
        { path: '/varor/äpple' },
      ),
      step(
        'Ta ut',
        'Funktionen en() gör redan 404 – återanvänd den. 400 när det inte finns tillräckligt.',
        "`POST /varor/{namn}/ta` tar emot `{'antal': …}` och minskar lagret. För många: 400. Okänd vara: 404.",
        LAGR3,
        [
          'vara = en(namn) ger 404 av sig själv.',
          "if uttag.antal > vara['antal']:",
          'LAGER[namn] -= uttag.antal',
        ],
        [
          t('Ta 3 äpplen', "__post('/varor/äpple/ta', {'antal': 3}).json", {
            namn: 'äpple',
            antal: 7,
          }),
          t('Ta 8: 400', "__post('/varor/äpple/ta', {'antal': 8}).status", 400),
          t('Kiwi: 404', "__post('/varor/kiwi/ta', {'antal': 1}).status", 404),
        ],
        post('/varor/äpple/ta', { antal: 3 }),
      ),
    ],
  },
  {
    id: 'fa-proj-konton',
    track: 'svar',
    title: 'Kontoregistret',
    reward: { emoji: '👤', name: 'Profil' },
    summary: 'Konton med lösenord som aldrig skickas tillbaka.',
    steps: [
      step(
        'Skapa konto',
        'Lösenordet ska in men aldrig ut. response_model sållar bort det.',
        'Gör `KontoUt` (`namn`, `epost`) och `POST /konton` (201) med `response_model=KontoUt`.',
        KONTO1,
        [
          'class KontoUt(BaseModel):\n    namn: str\n    epost: str',
          'response_model=KontoUt',
          'KONTON.append(konto.model_dump())',
        ],
        [
          t(
            'Utan lösenord',
            "__post('/konton', {'namn': 'Ada', 'epost': 'ada@x.se', 'losenord': 'hemligt1'}).json",
            { namn: 'Ada', epost: 'ada@x.se' },
          ),
          t(
            'För kort lösenord: 422',
            "__post('/konton', {'namn': 'Bo', 'epost': 'bo@x.se', 'losenord': 'kort'}).status",
            422,
          ),
        ],
        post('/konton', {
          namn: 'Ada',
          epost: 'ada@x.se',
          losenord: 'hemligt1',
        }),
        { starterCode: KONTO0 },
      ),
      step(
        'En e-post, ett konto',
        'any() är sant om något i listan stämmer – ett snabbt sätt att leta efter dubbletter.',
        'Samma e-post två gånger ska ge 409.',
        KONTO2,
        [
          "any(k['epost'] == konto.epost for k in KONTON)",
          'Kolla före append.',
          "raise HTTPException(status_code=409, detail='E-posten används redan')",
        ],
        [
          t(
            'Dubblett: 409',
            "(__post('/konton', {'namn': 'A', 'epost': 'a@x.se', 'losenord': '12345678'}), __post('/konton', {'namn': 'B', 'epost': 'a@x.se', 'losenord': '12345678'}).status)[1]",
            409,
          ),
        ],
        post('/konton', {
          namn: 'Ada',
          epost: 'ada@x.se',
          losenord: 'hemligt1',
        }),
      ),
      step(
        'Alla konton',
        'Listan använder samma utmodell, så att inget lösenord kan läcka här heller.',
        '`GET /konton` svarar med alla konton, utan lösenord.',
        KONTO3,
        [
          'response_model=list[KontoUt]',
          "@app.get('/konton', response_model=list[KontoUt])",
          'return KONTON',
        ],
        [
          t(
            'Utan lösenord',
            "(__post('/konton', {'namn': 'A', 'epost': 'a@x.se', 'losenord': '12345678'}), __get('/konton').json)[1]",
            [{ namn: 'A', epost: 'a@x.se' }],
          ),
        ],
        { path: '/konton' },
      ),
    ],
  },
  {
    id: 'fa-proj-biljetter',
    track: 'svar',
    title: 'Biljettkassan',
    reward: { emoji: '🎟️', name: 'Biljett' },
    summary: 'Sälj biljetter tills det är slutsålt.',
    steps: [
      step(
        'Eventet',
        'Hur många platser som är kvar räknas ut – då kan siffran aldrig bli fel.',
        '`GET /event/{id}` svarar med eventet plus `kvar`, eller 404.',
        BILJ1,
        [
          'if id not in EVENT:',
          'kvar = platser - salda',
          "return {**e, 'kvar': e['platser'] - e['salda']}",
        ],
        [
          t('Teatern', "__get('/event/2').json['kvar']", 1),
          t('Okänt: 404', "__get('/event/9').status", 404),
        ],
        { path: '/event/1' },
        { starterCode: BILJ0 },
      ),
      step(
        'Köp',
        'Ingen ska kunna köpa en plats som inte finns: 409 när det är slutsålt.',
        "`POST /event/{id}/kop` (201) säljer en biljett och svarar `{'biljett': nummer, 'event': namn}`. Slutsålt: 409.",
        BILJ2,
        [
          'e = event(id) ger 404 av sig själv.',
          "if e['kvar'] == 0:",
          "EVENT[id]['salda'] += 1",
        ],
        [
          t('Första biljetten', "__post('/event/1/kop').json", {
            biljett: 1,
            event: 'Konsert',
          }),
          t(
            'Andra och slutsålt',
            "[__post('/event/1/kop').status, __post('/event/1/kop').status]",
            [201, 409],
          ),
        ],
        { method: 'POST', path: '/event/1/kop' },
      ),
      step(
        'Dokumentera 404',
        'Den som bygger appen ska se på /docs att ett event kan saknas.',
        "Lägg till `responses` med 404 och `'Eventet finns inte'` på `GET /event/{id}`.",
        BILJ3,
        [
          'responses={404: {…}}',
          "{'description': 'Eventet finns inte'}",
          "@app.get('/event/{id}', responses={404: {'description': 'Eventet finns inte'}})",
        ],
        [
          t(
            'I dokumentationen',
            "__openapi()['paths']['/event/{id}']['get']['responses']['404']['description']",
            'Eventet finns inte',
          ),
        ],
        { path: '/event/1' },
      ),
    ],
  },
  {
    id: 'fa-proj-handla',
    track: 'crud',
    title: 'Inköpslistan',
    reward: { emoji: '🛍️', name: 'Kasse' },
    summary: 'En delad inköpslista att bocka av.',
    steps: [
      step(
        'Lägg till och visa',
        'API:et ger varje vara ett id, så att den kan bockas av senare.',
        '`GET /varor` och `POST /varor` (201, nytt id).',
        HANDLA1,
        [
          "max((x['id'] for x in VAROR), default=0) + 1",
          "sparad = {'id': …, **vara.model_dump()}",
          'VAROR.append(sparad)',
        ],
        [
          t(
            'Två varor',
            "[__post('/varor', {'namn': 'mjölk'}).json['id'], __post('/varor', {'namn': 'bröd'}).json['id'], len(__get('/varor').json)]",
            [1, 2, 2],
          ),
        ],
        post('/varor', { namn: 'mjölk' }),
        { starterCode: HANDLA0 },
      ),
      step(
        'Bocka av',
        'En egen väg för en vanlig handling gör appen enkel: ett tryck, ett anrop.',
        '`PATCH /varor/{id}/kopt` sätter `kopt` till True och svarar med varan. Okänt id: 404.',
        HANDLA2,
        [
          "@app.patch('/varor/{id}/kopt')",
          "vara['kopt'] = True",
          "raise HTTPException(status_code=404, detail='Varan finns inte')",
        ],
        [
          t(
            'Bocka av',
            "(__post('/varor', {'namn': 'ost'}), __patch('/varor/1/kopt').json['kopt'])[1]",
            true,
          ),
          t('Okänt: 404', "__patch('/varor/9/kopt').status", 404),
        ],
        { method: 'PATCH', path: '/varor/1/kopt' },
      ),
      step(
        'Rensa',
        '/varor/kopta krockar inte med /varor/{id}/kopt, eftersom de har olika metoder och delar.',
        "`DELETE /varor/kopta` tar bort alla köpta och svarar `{'borttagna': …}`.",
        HANDLA3,
        [
          'VAROR[:] = [...]',
          "if not v['kopt']",
          "return {'borttagna': fore - len(VAROR)}",
        ],
        [
          t(
            'Rensa en',
            "(__post('/varor', {'namn': 'a'}), __post('/varor', {'namn': 'b'}), __patch('/varor/1/kopt'), __delete('/varor/kopta').json, [v['namn'] for v in __get('/varor').json])[3:]",
            [{ borttagna: 1 }, ['b']],
          ),
        ],
        { method: 'DELETE', path: '/varor/kopta' },
      ),
    ],
  },
  {
    id: 'fa-proj-dagbok',
    track: 'crud',
    title: 'Dagboken',
    reward: { emoji: '📔', name: 'Dagbok' },
    summary: 'Skriv, läs, ändra och ta bort dagboksinlägg.',
    steps: [
      step(
        'Skriv och läs',
        'hitta(id) finns redan och svarar 404 – alla vägar med id kan använda den.',
        '`POST /inlagg` (201, nytt id) och `GET /inlagg/{id}`.',
        DAGBOK1,
        [
          "@app.post('/inlagg', status_code=201)",
          "sparat = {'id': …, **inlagg.model_dump()}",
          'return hitta(id)',
        ],
        [
          t(
            'Skriv',
            "__post('/inlagg', {'datum': '2026-11-10', 'text': 'Lärde mig FastAPI'}).json['id']",
            1,
          ),
          t('Läs', "__get('/inlagg/1').json['text']", 'Lärde mig FastAPI'),
          t('Okänt: 404', "__get('/inlagg/9').status", 404),
        ],
        post('/inlagg', { datum: '2026-11-10', text: 'Lärde mig FastAPI' }),
        { starterCode: DAGBOK0 },
      ),
      step(
        'Skriv om',
        'PUT byter ut hela inlägget – datum och text måste båda skickas.',
        '`PUT /inlagg/{id}` byter ut inlägget och svarar med det.',
        DAGBOK2,
        [
          "@app.put('/inlagg/{id}')",
          'inlagg.update(nytt.model_dump())',
          'return inlagg',
        ],
        [
          t(
            'Skriv om',
            "(__post('/inlagg', {'datum': '1', 'text': 'a'}), __put('/inlagg/1', {'datum': '2', 'text': 'b'}).json)[1]",
            { id: 1, datum: '2', text: 'b' },
          ),
        ],
        {
          method: 'PUT',
          path: '/inlagg/1',
          body: '{"datum": "2026-11-11", "text": "Ny text"}',
        },
      ),
      step(
        'Ta bort',
        '204 betyder att det gick bra och att det inte finns något kvar att visa.',
        '`DELETE /inlagg/{id}` (204), och 404 för okänt id.',
        DAGBOK3,
        [
          "@app.delete('/inlagg/{id}', status_code=204)",
          'INLAGG.remove(hitta(id))',
          'Ingen return behövs.',
        ],
        [
          t(
            'Ta bort och igen',
            "(__post('/inlagg', {'datum': '1', 'text': 'a'}), [__delete('/inlagg/1').status, __delete('/inlagg/1').status])[1]",
            [204, 404],
          ),
        ],
        { method: 'DELETE', path: '/inlagg/1' },
      ),
    ],
  },
  {
    id: 'fa-proj-kanban',
    track: 'crud',
    title: 'Kanbantavlan',
    reward: { emoji: '🗂️', name: 'Pärm' },
    summary: 'Kort som flyttas från att göra till klart.',
    steps: [
      step(
        'Nytt kort',
        'Status är en Enum, så att ett kort aldrig kan hamna i en kolumn som inte finns.',
        "`POST /kort` (201) sparar `{'id': …, 'titel': …, 'status': …}` med statusens text.",
        KANBAN1,
        [
          "sparat = {'id': …, 'titel': kort.titel, 'status': kort.status.value}",
          'kort.status.value ger texten.',
          'KORT.append(sparat)',
        ],
        [
          t('Nytt kort', "__post('/kort', {'titel': 'Koda'}).json", {
            id: 1,
            titel: 'Koda',
            status: 'att göra',
          }),
          t(
            'Okänd status: 422',
            "__post('/kort', {'titel': 'X', 'status': 'kanske'}).status",
            422,
          ),
        ],
        post('/kort', { titel: 'Koda' }),
        { starterCode: KANBAN0 },
      ),
      step(
        'Flytta',
        'PATCH med bara status: det enda som ändras när ett kort flyttas.',
        "`PATCH /kort/{id}` tar emot `{'status': …}` och flyttar kortet. Okänt id: 404.",
        KANBAN2,
        [
          'class NyStatus(BaseModel):\n    status: Status',
          "kort['status'] = ny.status.value",
          "raise HTTPException(status_code=404, detail='Kortet finns inte')",
        ],
        [
          t(
            'Flytta',
            "(__post('/kort', {'titel': 'Koda'}), __patch('/kort/1', {'status': 'pågår'}).json['status'])[1]",
            'pågår',
          ),
        ],
        { method: 'PATCH', path: '/kort/1', body: '{"status": "pågår"}' },
      ),
      step(
        'Tavlan',
        'En dict comprehension bygger en kolumn per status, även de som är tomma.',
        '`GET /tavla` svarar med en dict: varje status → listan med titlar.',
        KANBAN3,
        [
          'for s in Status går igenom alla statusar.',
          '{s.value: [...] for s in Status}',
          "[k['titel'] for k in KORT if k['status'] == s.value]",
        ],
        [
          t(
            'Tavlan',
            "(__post('/kort', {'titel': 'A'}), __post('/kort', {'titel': 'B', 'status': 'klart'}), __get('/tavla').json)[2]",
            { 'att göra': ['A'], pågår: [], klart: ['B'] },
          ),
        ],
        { path: '/tavla' },
      ),
    ],
  },
  {
    id: 'fa-proj-hemligt',
    track: 'beroenden',
    title: 'Hemliga anteckningar',
    reward: { emoji: '🔐', name: 'Hänglås' },
    summary: 'Var och en ser bara sina egna anteckningar.',
    steps: [
      step(
        'Vem är jag?',
        'Inloggningen skrivs en gång, som ett beroende, och används sedan överallt.',
        "Skriv `inloggad` (Bearer-token i `authorization`, 401 annars, ger namnet ur `TOKENS`) och `GET /jag` som svarar `{'namn': …}`.",
        HEMLIG1,
        [
          'authorization: str | None = Header(default=None)',
          "authorization.removeprefix('Bearer ')",
          "def jag(namn=Depends(inloggad)):\n    return {'namn': namn}",
        ],
        [
          t('Ada', `__get('/jag', ${ADA}).json`, { namn: 'Ada' }),
          t('Ingen: 401', "__get('/jag').status", 401),
        ],
        { path: '/jag', headers: { authorization: 'Bearer t-ada' } },
        { starterCode: HEMLIG0 },
      ),
      step(
        'Skriv',
        'Anteckningen sparas under namnet från beroendet – den som skickar kan inte låtsas vara någon annan.',
        "`POST /anteckningar` (201) sparar texten för den inloggade och svarar `{'antal': …}`.",
        HEMLIG2,
        [
          'namn=Depends(inloggad)',
          'ANTECKNINGAR.setdefault(namn, []).append(a.text)',
          "return {'antal': len(ANTECKNINGAR[namn])}",
        ],
        [
          t(
            'Två anteckningar',
            `[__post('/anteckningar', {'text': 'a'}, ${ADA}).json, __post('/anteckningar', {'text': 'b'}, ${ADA}).json]`,
            [{ antal: 1 }, { antal: 2 }],
          ),
        ],
        post(
          '/anteckningar',
          { text: 'Hemligt!' },
          { headers: { authorization: 'Bearer t-ada' } },
        ),
      ),
      step(
        'Läs dina egna',
        'Samma adress, olika svar: det är så appar med konton fungerar.',
        '`GET /anteckningar` svarar med den inloggades anteckningar.',
        HEMLIG3,
        [
          "@app.get('/anteckningar')",
          'ANTECKNINGAR.get(namn, [])',
          'def mina(namn=Depends(inloggad)):\n    return ANTECKNINGAR.get(namn, [])',
        ],
        [
          t(
            'Ada och Bo',
            `(__post('/anteckningar', {'text': 'Adas'}, ${ADA}), [__get('/anteckningar', ${ADA}).json, __get('/anteckningar', ${BO}).json])[1]`,
            [['Adas'], []],
          ),
        ],
        { path: '/anteckningar', headers: { authorization: 'Bearer t-ada' } },
      ),
    ],
  },
  {
    id: 'fa-proj-sidor',
    track: 'beroenden',
    title: 'Bläddra i katalogen',
    reward: { emoji: '📄', name: 'Sida' },
    summary: 'Sidor för långa listor, skrivet en gång.',
    steps: [
      step(
        'Sidor',
        'Både filmer och serier bläddras likadant. Ett beroende gör att det skrivs en gång.',
        'Skriv beroendet `sidor(sida=1, per_sida=10)` och hjälpfunktionen `dela(lista, s)`. `/filmer` och `/serier` svarar med sin sida.',
        SIDOR1,
        [
          "start = (s['sida'] - 1) * s['per_sida']",
          "lista[start:start + s['per_sida']]",
          'def filmer(s=Depends(sidor)):\n    return dela(FILMER, s)',
        ],
        [
          t('Sida 3 av filmerna', "__get('/filmer?sida=3').json", [
            'Film 21',
            'Film 22',
            'Film 23',
            'Film 24',
            'Film 25',
          ]),
          t('Serier, 3 per sida', "__get('/serier?per_sida=3&sida=2').json", [
            'Serie 4',
            'Serie 5',
            'Serie 6',
          ]),
        ],
        { path: '/filmer?sida=2' },
        { starterCode: SIDOR0 },
      ),
      step(
        'Rimliga sidor',
        'Kontrollen i beroendet gäller automatiskt alla vägar som använder det.',
        '`sidor` ska svara 400 om `sida` är mindre än 1 eller `per_sida` inte är 1–50.',
        SIDOR2,
        [
          'if sida < 1 or not 1 <= per_sida <= 50:',
          "raise HTTPException(status_code=400, detail='Sidan finns inte')",
          'Lägg kontrollen först i sidor.',
        ],
        [
          t(
            'Fel sidor',
            "[__get('/filmer?sida=0').status, __get('/serier?per_sida=100').status]",
            [400, 400],
          ),
        ],
        { path: '/filmer?sida=0' },
      ),
      step(
        'Hur många finns?',
        'En app som visar "sida 2 av 3" behöver veta hur många det finns totalt.',
        "`dela` ska svara `{'totalt': …, 'sida': …, 'saker': […]}`.",
        SIDOR3,
        [
          'Ändra bara dela.',
          "'totalt': len(lista)",
          "return {'totalt': len(lista), 'sida': s['sida'], 'saker': …}",
        ],
        [
          t('Serier sida 1', "__get('/serier?per_sida=5').json", {
            totalt: 7,
            sida: 1,
            saker: ['Serie 1', 'Serie 2', 'Serie 3', 'Serie 4', 'Serie 5'],
          }),
        ],
        { path: '/serier?per_sida=5' },
      ),
    ],
  },
  {
    id: 'fa-proj-vader',
    track: 'beroenden',
    title: 'Väderappen',
    reward: { emoji: '🌦️', name: 'Moln' },
    summary: 'En väderapp vars källa går att byta ut.',
    steps: [
      step(
        'Källan som beroende',
        'Vägen frågar inte vädertjänsten själv – den får en källa. Det är det som gör nästa steg möjligt.',
        "Skriv `hamta_vader()` som ger en `RiktigVader()`, och `/vader/{stad}` som svarar `{'stad': …, 'vader': kalla.idag(stad)}`.",
        VADER1,
        [
          'def hamta_vader():\n    return RiktigVader()',
          'kalla=Depends(hamta_vader)',
          "return {'stad': stad, 'vader': kalla.idag(stad)}",
        ],
        [
          t(
            'Kraschar utan internet',
            "__raises(lambda: __get('/vader/Malmö'))",
            'ConnectionError',
          ),
        ],
        { path: '/vader/Malmö' },
        { starterCode: VADER0 },
      ),
      step(
        'Låtsasvädret',
        'I Kodskolan finns ingen vädertjänst. dependency_overrides byter källan utan att röra vägen.',
        'Skriv `LatsasVader` (sol i Malmö, annars regn) och lägg in den i `app.dependency_overrides` för `hamta_vader`.',
        VADER2,
        [
          "class LatsasVader:\n    def idag(self, stad):\n        return 'sol' if stad == 'Malmö' else 'regn'",
          'app.dependency_overrides[hamta_vader] = …',
          'lambda: LatsasVader()',
        ],
        [
          t('Malmö', "__get('/vader/Malmö').json", {
            stad: 'Malmö',
            vader: 'sol',
          }),
          t('Luleå', "__get('/vader/Luleå').json['vader']", 'regn'),
        ],
        { path: '/vader/Malmö' },
      ),
      step(
        'Vad ska jag ha på mig?',
        'Den nya vägen får också låtsasvädret, utan att du gör något extra.',
        "`/klader/{stad}` svarar `{'klader': 'shorts'}` vid sol, annars `{'klader': 'regnjacka'}`.",
        VADER3,
        [
          'kalla=Depends(hamta_vader)',
          "kalla.idag(stad) == 'sol'",
          "return {'klader': 'shorts' if … else 'regnjacka'}",
        ],
        [
          t(
            'Malmö och Luleå',
            "[__get('/klader/Malmö').json, __get('/klader/Luleå').json]",
            [{ klader: 'shorts' }, { klader: 'regnjacka' }],
          ),
        ],
        { path: '/klader/Malmö' },
      ),
    ],
  },
];
