import { post, step, t } from './projectHelpers';

// Projekten för bana 8–11: databas, async, felsökning och slutprojektet.
// I felsökningsbanan har varje steg en egen starterCode med ett nytt fel.

const DB =
  'import sqlite3\n\nfrom fastapi import FastAPI, Depends, HTTPException\nfrom pydantic import BaseModel, Field\n\napp = FastAPI()\n';
const HAMTA = '\n\ndef hamta_db():\n    yield db\n';

// --- Bana 8: databas ---

const GAST0 = `${DB}\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.execute('create table hälsningar (id integer primary key, namn text, text text)')\n${HAMTA}\n\nclass Halsning(BaseModel):\n    namn: str = Field(min_length=1)\n    text: str = Field(min_length=1, max_length=200)\n`;
const GAST1 = `${GAST0}\n\n@app.post('/halsningar', status_code=201)\ndef skriv(h: Halsning, anslutning=Depends(hamta_db)):\n    m = anslutning.execute('insert into hälsningar (namn, text) values (?, ?)', (h.namn, h.text))\n    anslutning.commit()\n    return {'id': m.lastrowid, **h.model_dump()}\n`;
const GAST2 = `${GAST1}\n\n@app.get('/halsningar')\ndef las(anslutning=Depends(hamta_db)):\n    rader = anslutning.execute('select id, namn, text from hälsningar order by id desc').fetchall()\n    return [dict(r) for r in rader]\n`;
const GAST3 = `${GAST2}\n\n@app.get('/sok')\ndef sok(ord: str, anslutning=Depends(hamta_db)):\n    rader = anslutning.execute(\n        'select id, namn, text from hälsningar where text like ? order by id', ('%' + ord + '%',)\n    ).fetchall()\n    return [dict(r) for r in rader]\n`;

const TOPP0 = `${DB}\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.execute('create table poang (id integer primary key, spelare text, poang integer)')\n${HAMTA}\n\nclass Resultat(BaseModel):\n    spelare: str\n    poang: int = Field(ge=0)\n`;
const TOPP1 = `${TOPP0}\n\n@app.post('/resultat', status_code=201)\ndef spara(r: Resultat, anslutning=Depends(hamta_db)):\n    anslutning.execute('insert into poang (spelare, poang) values (?, ?)', (r.spelare, r.poang))\n    anslutning.commit()\n    return r\n`;
const TOPP2 = `${TOPP1}\n\n@app.get('/topp')\ndef topp(antal: int = 3, anslutning=Depends(hamta_db)):\n    rader = anslutning.execute('select spelare, poang from poang order by poang desc limit ?', (antal,)).fetchall()\n    return [dict(r) for r in rader]\n`;
const TOPP3 = `${TOPP2}\n\n@app.get('/spelare/{namn}')\ndef spelare(namn: str, anslutning=Depends(hamta_db)):\n    rad = anslutning.execute('select count(*), max(poang) from poang where spelare = ?', (namn,)).fetchone()\n    if rad[0] == 0:\n        raise HTTPException(status_code=404, detail='Spelaren finns inte')\n    return {'spelare': namn, 'omgangar': rad[0], 'basta': rad[1]}\n`;

const BIB0 = `${DB}\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\ncreate table bocker (id integer primary key, titel text);\ncreate table lan (bok_id integer primary key, namn text);\ninsert into bocker (titel) values ('Pippi'), ('Emil'), ('Ronja');\n''')\n${HAMTA}\n\nclass Lan(BaseModel):\n    namn: str\n`;
const BIB1 = `${BIB0}\n\n@app.post('/bocker/{id}/lana', status_code=201)\ndef lana(id: int, lan: Lan, anslutning=Depends(hamta_db)):\n    if anslutning.execute('select 1 from bocker where id = ?', (id,)).fetchone() is None:\n        raise HTTPException(status_code=404, detail='Boken finns inte')\n    if anslutning.execute('select 1 from lan where bok_id = ?', (id,)).fetchone():\n        raise HTTPException(status_code=409, detail='Boken är utlånad')\n    anslutning.execute('insert into lan (bok_id, namn) values (?, ?)', (id, lan.namn))\n    anslutning.commit()\n    return {'bok_id': id, 'namn': lan.namn}\n`;
const BIB2 = `${BIB1}\n\n@app.get('/utlanade')\ndef utlanade(anslutning=Depends(hamta_db)):\n    rader = anslutning.execute(\n        'select bocker.titel, lan.namn from lan join bocker on bocker.id = lan.bok_id order by bocker.id'\n    ).fetchall()\n    return [dict(r) for r in rader]\n`;
const BIB3 = `${BIB2}\n\n@app.delete('/bocker/{id}/lana', status_code=204)\ndef lamna(id: int, anslutning=Depends(hamta_db)):\n    m = anslutning.execute('delete from lan where bok_id = ?', (id,))\n    anslutning.commit()\n    if m.rowcount == 0:\n        raise HTTPException(status_code=404, detail='Boken är inte utlånad')\n`;

// --- Bana 9: async ---

const AS = 'import asyncio\n\nfrom fastapi import FastAPI\n\napp = FastAPI()\n';

const NYH0 = `${AS}\n\nasync def sport():\n    await asyncio.sleep(1)\n    return ['Malmö vann']\n\n\nasync def vader():\n    await asyncio.sleep(2)\n    return ['Sol i morgon']\n\n\nasync def kultur():\n    await asyncio.sleep(10)  # den här källan hänger sig ofta\n    return ['Ny bok']\n`;
const NYH1 = `${NYH0}\n\n@app.get('/sport-och-vader')\nasync def sport_och_vader():\n    a, b = await asyncio.gather(sport(), vader())\n    return a + b\n`;
const NYH2 = `${NYH1}\n\nasync def hamta(kalla):\n    try:\n        return await asyncio.wait_for(kalla(), timeout=3)\n    except TimeoutError:\n        return []\n`;
const NYH3 = `${NYH2}\n\n@app.get('/alla')\nasync def alla():\n    listor = await asyncio.gather(hamta(sport), hamta(vader), hamta(kultur))\n    return [rubrik for lista in listor for rubrik in lista]\n`;

const OVER0 = `import asyncio\n\nfrom fastapi import FastAPI, BackgroundTasks\n\napp = FastAPI()\nLOGG = []\nORD = {'en': {'hej': 'hello'}, 'de': {'hej': 'hallo'}, 'fr': {'hej': 'bonjour'}}\n\n\nasync def oversatt(ord, sprak):\n    await asyncio.sleep(1)  # som en översättningstjänst\n    return ORD[sprak].get(ord, '?')\n`;
const OVER1 = `${OVER0}\n\n@app.get('/oversatt/{sprak}/{ord}')\nasync def ett(sprak: str, ord: str):\n    return {'ord': ord, sprak: await oversatt(ord, sprak)}\n`;
const OVER2 = `${OVER1}\n\n@app.get('/alla/{ord}')\nasync def alla(ord: str):\n    sprak = list(ORD)\n    svar = await asyncio.gather(*[oversatt(ord, s) for s in sprak])\n    return dict(zip(sprak, svar))\n`;
const OVER3 = OVER2.replace(
  "@app.get('/alla/{ord}')\nasync def alla(ord: str):\n",
  "@app.get('/alla/{ord}')\nasync def alla(ord: str, bakgrund: BackgroundTasks):\n    bakgrund.add_task(LOGG.append, ord)\n",
);

const PRIS0 = `${AS}\nBUTIKER = {'Lilla': 2, 'Stora': 1, 'Snabba': 0.5, 'Sega': 9}\nPRISER = {'Lilla': 59, 'Stora': 49, 'Snabba': 65, 'Sega': 29}\n\n\nasync def fraga_butik(butik):\n    await asyncio.sleep(BUTIKER[butik])\n    return PRISER[butik]\n`;
const PRIS1 = `${PRIS0}\n\n@app.get('/priser')\nasync def priser():\n    butiker = list(BUTIKER)\n    svar = await asyncio.gather(*[fraga_butik(b) for b in butiker])\n    return dict(zip(butiker, svar))\n`;
const PRIS2 = `${PRIS0}\n\nasync def pris_eller_inget(butik):\n    try:\n        return await asyncio.wait_for(fraga_butik(butik), timeout=3)\n    except TimeoutError:\n        return None\n\n\n@app.get('/priser')\nasync def priser():\n    butiker = list(BUTIKER)\n    svar = await asyncio.gather(*[pris_eller_inget(b) for b in butiker])\n    return dict(zip(butiker, svar))\n`;
const PRIS3 = `${PRIS2}\n\n@app.get('/billigast')\nasync def billigast():\n    alla = await priser()\n    svarade = {b: p for b, p in alla.items() if p is not None}\n    butik = min(svarade, key=svarade.get)\n    return {'butik': butik, 'pris': svarade[butik]}\n`;

// --- Bana 10: felsökning (varje steg har en ny bugg) ---

const FS = 'from fastapi import FastAPI, HTTPException\n\napp = FastAPI()\n';
const LAGA_OK = `${FS}\nBOCKER = {1: 'Pippi', 2: 'Emil'}\n\n\n@app.get('/bocker/antal')\ndef antal():\n    return {'antal': len(BOCKER)}\n\n\n@app.get('/bocker/{id}')\ndef bok(id: int):\n    if id not in BOCKER:\n        raise HTTPException(status_code=404, detail='Boken finns inte')\n    return {'id': id, 'titel': BOCKER[id]}\n`;
const LAGA_BUGG1 = LAGA_OK.replace('def bok(id: int):', 'def bok(id):');
const LAGA_BUGG2 = `${FS}\nBOCKER = {1: 'Pippi', 2: 'Emil'}\n\n\n@app.get('/bocker/{id}')\ndef bok(id: int):\n    if id not in BOCKER:\n        raise HTTPException(status_code=404, detail='Boken finns inte')\n    return {'id': id, 'titel': BOCKER[id]}\n\n\n@app.get('/bocker/antal')\ndef antal():\n    return {'antal': len(BOCKER)}\n`;
const LAGA_BUGG3 = LAGA_OK.replace(
  "        raise HTTPException(status_code=404, detail='Boken finns inte')\n",
  "        HTTPException(status_code=404, detail='Boken finns inte')\n",
);

const KONTO_OK = `from fastapi import FastAPI, Depends, Header, HTTPException\nfrom pydantic import BaseModel\n\napp = FastAPI()\nKONTON = []\n\n\nclass KontoIn(BaseModel):\n    namn: str\n    losenord: str\n\n\nclass KontoUt(BaseModel):\n    namn: str\n\n\ndef admin(x_admin: str | None = Header(default=None)):\n    if x_admin != 'ja':\n        raise HTTPException(status_code=403, detail='Bara admin')\n\n\n@app.post('/konton', status_code=201, response_model=KontoUt)\ndef nytt(konto: KontoIn):\n    KONTON.append(konto.model_dump())\n    return konto\n\n\n@app.get('/konton', response_model=list[KontoUt], dependencies=[Depends(admin)])\ndef alla():\n    return KONTON\n`;
const KONTO_BUGG1 = KONTO_OK.replace(
  "@app.post('/konton', status_code=201, response_model=KontoUt)",
  "@app.post('/konton', status_code=201)",
);
const KONTO_BUGG2 = KONTO_OK.replace(
  'dependencies=[Depends(admin)]',
  'dependencies=[Depends(admin())]',
);
const KONTO_BUGG3 = KONTO_OK.replace(
  "@app.post('/konton', status_code=201, response_model=KontoUt)\ndef nytt(konto: KontoIn):\n    KONTON.append(konto.model_dump())\n    return konto\n",
  "@app.post('/konton', response_model=KontoUt)\ndef nytt(konto: KontoIn):\n    KONTON.append(konto.model_dump())\n    return konto, 201\n",
);

const SNABB_OK = `import asyncio\n\nfrom fastapi import FastAPI, HTTPException\n\napp = FastAPI()\n\n\nasync def tjanst(namn, sekunder):\n    await asyncio.sleep(sekunder)\n    return namn\n\n\n@app.get('/ett')\nasync def ett():\n    return {'svar': await tjanst('a', 1)}\n\n\n@app.get('/tva')\nasync def tva():\n    a, b = await asyncio.gather(tjanst('a', 1), tjanst('b', 2))\n    return {'svar': [a, b]}\n\n\n@app.get('/seg')\nasync def seg():\n    try:\n        return {'svar': await asyncio.wait_for(tjanst('c', 60), timeout=2)}\n    except TimeoutError:\n        raise HTTPException(status_code=504, detail='Tjänsten svarar inte')\n`;
const SNABB_BUGG1 = SNABB_OK.replace(
  "return {'svar': await tjanst('a', 1)}",
  "return {'svar': tjanst('a', 1)}",
);
const SNABB_BUGG2 = SNABB_OK.replace(
  "    a, b = await asyncio.gather(tjanst('a', 1), tjanst('b', 2))\n",
  "    a = await tjanst('a', 1)\n    b = await tjanst('b', 2)\n",
);
const SNABB_BUGG3 = SNABB_OK.replace(
  "    try:\n        return {'svar': await asyncio.wait_for(tjanst('c', 60), timeout=2)}\n    except TimeoutError:\n        raise HTTPException(status_code=504, detail='Tjänsten svarar inte')\n",
  "    return {'svar': await tjanst('c', 60)}\n",
);

// --- Bana 11: slutprojekt ---

const AI_IMPORT =
  'import asyncio\n\nfrom fastapi import FastAPI, Depends, HTTPException, Header\nfrom pydantic import BaseModel, Field\n\napp = FastAPI()\n';

const FAQ0 = `${AI_IMPORT}\nFAQ = [\n    {'fraga': 'Hur återställer jag lösenordet?', 'svar': 'Tryck på Glömt lösenordet.'},\n    {'fraga': 'Kostar kursen pengar?', 'svar': 'De första banorna är gratis.'},\n    {'fraga': 'Kan jag koda på mobilen?', 'svar': 'Ja, men en dator är skönare.'},\n]\n\n\nclass Fraga(BaseModel):\n    text: str = Field(min_length=3)\n`;
const FAQ1 = `${FAQ0}\n\ndef likhet(a, b):\n    ord_a = set(a.lower().replace('?', '').split())\n    ord_b = set(b.lower().replace('?', '').split())\n    return len(ord_a & ord_b)\n\n\n@app.post('/fraga')\ndef fraga(f: Fraga):\n    basta = max(FAQ, key=lambda x: likhet(f.text, x['fraga']))\n    if likhet(f.text, basta['fraga']) < 2:\n        raise HTTPException(status_code=404, detail='Det vet jag inte')\n    return {'svar': basta['svar']}\n`;
const FAQ2 = `${FAQ1.replace(
  "@app.post('/fraga')\ndef fraga(f: Fraga):\n    basta = max(FAQ, key=lambda x: likhet(f.text, x['fraga']))\n    if likhet(f.text, basta['fraga']) < 2:\n        raise HTTPException(status_code=404, detail='Det vet jag inte')\n    return {'svar': basta['svar']}\n",
  "class LatsasAI:\n    async def formulera(self, fraga, fakta):\n        await asyncio.sleep(2)\n        return 'Bra fråga! ' + fakta\n\n\ndef hamta_ai():\n    return LatsasAI()\n\n\n@app.post('/fraga')\nasync def fraga(f: Fraga, ai=Depends(hamta_ai)):\n    basta = max(FAQ, key=lambda x: likhet(f.text, x['fraga']))\n    if likhet(f.text, basta['fraga']) < 2:\n        raise HTTPException(status_code=404, detail='Det vet jag inte')\n    return {'svar': await ai.formulera(f.text, basta['svar'])}\n",
)}`;
const FAQ3 = `${FAQ2}\n\n@app.get('/faq')\ndef faq():\n    return [x['fraga'] for x in FAQ]\n`;

const SAMM0 = `${AI_IMPORT}\n\nclass LatsasAI:\n    async def sammanfatta(self, text):\n        await asyncio.sleep(2)\n        return text.split('.')[0] + '.'\n\n\ndef hamta_ai():\n    return LatsasAI()\n\n\nclass Texter(BaseModel):\n    texter: list[str] = Field(min_length=1, max_length=10)\n`;
const SAMM1 = `${SAMM0}\n\n@app.post('/sammanfatta')\nasync def sammanfatta(t: Texter, ai=Depends(hamta_ai)):\n    return await asyncio.gather(*[ai.sammanfatta(text) for text in t.texter])\n`;
const SAMM2 = SAMM1.replace(
  'def hamta_ai():\n    return LatsasAI()\n',
  "def hamta_ai():\n    return LatsasAI()\n\n\ndef kolla_nyckel(x_api_nyckel: str | None = Header(default=None)):\n    if x_api_nyckel != 'hemlig':\n        raise HTTPException(status_code=401, detail='Fel nyckel')\n",
).replace(
  "@app.post('/sammanfatta')",
  "@app.post('/sammanfatta', dependencies=[Depends(kolla_nyckel)])",
);
const SAMM3 = SAMM2.replace(
  'class Texter(BaseModel):\n    texter: list[str] = Field(min_length=1, max_length=10)\n',
  'class Texter(BaseModel):\n    texter: list[str] = Field(min_length=1, max_length=10)\n\n\nANVANT = {}\n',
).replace(
  'async def sammanfatta(t: Texter, ai=Depends(hamta_ai)):\n',
  "async def sammanfatta(t: Texter, ai=Depends(hamta_ai), x_api_nyckel: str | None = Header(default=None)):\n    ANVANT[x_api_nyckel] = ANVANT.get(x_api_nyckel, 0) + len(t.texter)\n    if ANVANT[x_api_nyckel] > 20:\n        raise HTTPException(status_code=429, detail='Du har använt för många')\n",
);

const CHATT0 = `${AI_IMPORT}\nSAMTAL = {}\n\n\nclass Meddelande(BaseModel):\n    text: str = Field(min_length=1)\n\n\nclass LatsasAI:\n    async def svara(self, historik):\n        await asyncio.sleep(1)\n        return f'Det är meddelande {len(historik)} i vårt samtal.'\n\n\ndef hamta_ai():\n    return LatsasAI()\n`;
const CHATT1 = `${CHATT0}\n\n@app.post('/chatt/{id}')\nasync def chatta(id: str, m: Meddelande, ai=Depends(hamta_ai)):\n    historik = SAMTAL.setdefault(id, [])\n    historik.append({'roll': 'du', 'text': m.text})\n    svar = await ai.svara(historik)\n    historik.append({'roll': 'ai', 'text': svar})\n    return {'svar': svar}\n`;
const CHATT2 = `${CHATT1}\n\n@app.get('/chatt/{id}')\ndef historik(id: str):\n    if id not in SAMTAL:\n        raise HTTPException(status_code=404, detail='Samtalet finns inte')\n    return SAMTAL[id]\n`;
const CHATT3 = `${CHATT2}\n\n@app.delete('/chatt/{id}', status_code=204)\ndef glom(id: str):\n    if SAMTAL.pop(id, None) is None:\n        raise HTTPException(status_code=404, detail='Samtalet finns inte')\n`;

export const PROJECTS_SLUT = [
  {
    id: 'fa-proj-gastbok',
    track: 'databas',
    title: 'Gästboken',
    reward: { emoji: '🖊️', name: 'Reservoarpenna' },
    summary: 'Hälsningar som sparas i en databas.',
    steps: [
      step(
        'Skriv en hälsning',
        'INSERT med ? och commit, och lastrowid som id. Samma mönster som i alla databasappar.',
        '`POST /halsningar` (201) sparar i tabellen och svarar med id, namn och text.',
        GAST1,
        [
          "anslutning.execute('insert into hälsningar (namn, text) values (?, ?)', (h.namn, h.text))",
          'anslutning.commit()',
          "return {'id': m.lastrowid, **h.model_dump()}",
        ],
        [
          t(
            'Första hälsningen',
            "__post('/halsningar', {'namn': 'Ada', 'text': 'Hej!'}).json",
            { id: 1, namn: 'Ada', text: 'Hej!' },
          ),
        ],
        post('/halsningar', { namn: 'Ada', text: 'Hej!' }),
        { starterCode: GAST0 },
      ),
      step(
        'Läs, nyast först',
        'order by id desc låter databasen sortera, så att den nyaste hälsningen hamnar överst.',
        '`GET /halsningar` svarar med alla, nyast först.',
        GAST2,
        [
          'order by id desc',
          '[dict(r) for r in rader]',
          "@app.get('/halsningar')",
        ],
        [
          t(
            'Nyast först',
            "(__post('/halsningar', {'namn': 'A', 'text': 'ett'}), __post('/halsningar', {'namn': 'B', 'text': 'två'}), [h['text'] for h in __get('/halsningar').json])[2]",
            ['två', 'ett'],
          ),
        ],
        { path: '/halsningar' },
      ),
      step(
        'Sök',
        'like med % hittar texter som innehåller ordet. %-tecknen läggs till i värdet, inte i SQL:en – så ? skyddar fortfarande.',
        '`GET /sok?ord=…` svarar med hälsningarna vars text innehåller ordet.',
        GAST3,
        ['where text like ?', "('%' + ord + '%',)", 'order by id'],
        [
          t(
            'Sök på kul',
            "(__post('/halsningar', {'namn': 'A', 'text': 'Så kul'}), __post('/halsningar', {'namn': 'B', 'text': 'Tack'}), [h['namn'] for h in __get('/sok?ord=kul').json])[2]",
            ['A'],
          ),
          t(
            'Går inte att lura',
            "len(__get(\"/sok?ord=' or '1'='1\").json)",
            0,
          ),
        ],
        { path: '/sok?ord=hej' },
      ),
    ],
  },
  {
    id: 'fa-proj-topplista',
    track: 'databas',
    title: 'Topplistan',
    reward: { emoji: '🎮', name: 'Handkontroll' },
    summary: 'Poäng från ett spel, sorterade av databasen.',
    steps: [
      step(
        'Spara resultat',
        'Varje omgång blir en rad. Databasen kan sedan räkna och sortera på alla rader.',
        '`POST /resultat` (201) sparar spelare och poäng och svarar med resultatet.',
        TOPP1,
        [
          'insert into poang (spelare, poang) values (?, ?)',
          'anslutning.commit()',
          'return r',
        ],
        [
          t(
            'Spara',
            "__post('/resultat', {'spelare': 'Ada', 'poang': 120}).status",
            201,
          ),
        ],
        post('/resultat', { spelare: 'Ada', poang: 120 }),
        { starterCode: TOPP0 },
      ),
      step(
        'Topplistan',
        'order by poang desc limit ? – databasen sorterar och plockar, du behöver inte loopa.',
        '`GET /topp?antal=…` (standard 3) svarar med de bästa resultaten.',
        TOPP2,
        ['antal: int = 3', 'order by poang desc limit ?', '(antal,)'],
        [
          t(
            'Två bästa',
            "([__post('/resultat', {'spelare': s, 'poang': p}) for s, p in [('A', 10), ('B', 30), ('C', 20)]], __get('/topp?antal=2').json)[1]",
            [
              { spelare: 'B', poang: 30 },
              { spelare: 'C', poang: 20 },
            ],
          ),
        ],
        { path: '/topp' },
      ),
      step(
        'En spelare',
        'count och max räknar i databasen. Har spelaren inga rader är count 0 – då passar 404.',
        "`GET /spelare/{namn}` svarar `{'spelare': …, 'omgangar': …, 'basta': …}`, eller 404.",
        TOPP3,
        [
          'select count(*), max(poang) from poang where spelare = ?',
          'if rad[0] == 0:',
          "return {'spelare': namn, 'omgangar': rad[0], 'basta': rad[1]}",
        ],
        [
          t(
            'Ada',
            "([__post('/resultat', {'spelare': 'Ada', 'poang': p}) for p in [5, 50, 20]], __get('/spelare/Ada').json)[1]",
            { spelare: 'Ada', omgangar: 3, basta: 50 },
          ),
          t('Okänd: 404', "__get('/spelare/Zed').status", 404),
        ],
        { path: '/spelare/Ada' },
      ),
    ],
  },
  {
    id: 'fa-proj-bibliotek-db',
    track: 'databas',
    title: 'Bibliotekets lånedisk',
    reward: { emoji: '🏛️', name: 'Pelare' },
    summary: 'Lån i en egen tabell, ihopkopplad med böckerna.',
    steps: [
      step(
        'Låna',
        'Två kontroller före INSERT: finns boken (404), och är den redan utlånad (409)?',
        "`POST /bocker/{id}/lana` (201) tar emot `{'namn': …}` och sparar lånet.",
        BIB1,
        [
          'select 1 from bocker where id = ?',
          'select 1 from lan where bok_id = ?',
          'insert into lan (bok_id, namn) values (?, ?)',
        ],
        [
          t('Låna Emil', "__post('/bocker/2/lana', {'namn': 'Ada'}).json", {
            bok_id: 2,
            namn: 'Ada',
          }),
          t(
            'Igen: 409',
            "__post('/bocker/2/lana', {'namn': 'Bo'}).status",
            409,
          ),
          t(
            'Okänd bok: 404',
            "__post('/bocker/9/lana', {'namn': 'Bo'}).status",
            404,
          ),
        ],
        post('/bocker/2/lana', { namn: 'Ada' }),
        { starterCode: BIB0 },
      ),
      step(
        'Utlånat',
        'JOIN hämtar titeln från bocker och namnet från lan i samma fråga.',
        "`GET /utlanade` svarar med `{'titel': …, 'namn': …}` för varje lån.",
        BIB2,
        [
          'select bocker.titel, lan.namn',
          'from lan join bocker on bocker.id = lan.bok_id',
          'order by bocker.id',
        ],
        [
          t(
            'Utlånat',
            "(__post('/bocker/3/lana', {'namn': 'Cy'}), __post('/bocker/1/lana', {'namn': 'Di'}), __get('/utlanade').json)[2]",
            [
              { titel: 'Pippi', namn: 'Di' },
              { titel: 'Ronja', namn: 'Cy' },
            ],
          ),
        ],
        { path: '/utlanade' },
      ),
      step(
        'Lämna tillbaka',
        'Samma adress som att låna, men DELETE. rowcount 0 betyder att boken inte var utlånad.',
        '`DELETE /bocker/{id}/lana` (204) tar bort lånet, eller 404 om boken inte är utlånad.',
        BIB3,
        [
          "@app.delete('/bocker/{id}/lana', status_code=204)",
          'delete from lan where bok_id = ?',
          'if m.rowcount == 0:',
        ],
        [
          t(
            'Lämna och igen',
            "(__post('/bocker/1/lana', {'namn': 'A'}), [__delete('/bocker/1/lana').status, __delete('/bocker/1/lana').status])[1]",
            [204, 404],
          ),
        ],
        { method: 'DELETE', path: '/bocker/1/lana' },
      ),
    ],
  },
  {
    id: 'fa-proj-nyheter',
    track: 'async',
    title: 'Nyhetssamlaren',
    reward: { emoji: '📰', name: 'Tidning' },
    summary: 'Nyheter från flera källor på en gång.',
    steps: [
      step(
        'Två källor',
        'gather väntar på båda samtidigt: 2 sekunder i stället för 3.',
        '`/sport-och-vader` svarar med rubrikerna från `sport()` och `vader()` i en lista – på 2 sekunder.',
        NYH1,
        [
          'async def sport_och_vader():',
          'a, b = await asyncio.gather(sport(), vader())',
          'return a + b',
        ],
        [
          t('Rubrikerna', "__get('/sport-och-vader').json", [
            'Malmö vann',
            'Sol i morgon',
          ]),
          t('Två sekunder', "__tid('/sport-och-vader')", 2),
        ],
        { path: '/sport-och-vader' },
        { starterCode: NYH0 },
      ),
      step(
        'Ge inte upp allt',
        'En källa som hänger sig ska inte stoppa resten. En tom lista är bättre än inget svar alls.',
        'Skriv `hamta(kalla)` som väntar högst 3 sekunder på `kalla()` och annars ger en tom lista.',
        NYH2,
        [
          'async def hamta(kalla):',
          'await asyncio.wait_for(kalla(), timeout=3)',
          'except TimeoutError:\n    return []',
        ],
        [
          t(
            'hamta är async',
            "__import__('inspect').iscoroutinefunction(hamta)",
            true,
          ),
          t(
            'Kultur ger upp efter 3 sekunder',
            "(app.add_api_route('/prov', __import__('functools').partial(hamta, kultur)), __get('/prov').json, __tid('/prov'))[1:]",
            [[], 3],
          ),
        ],
        { path: '/sport-och-vader' },
      ),
      step(
        'Alla källor',
        'Ett svar efter 3 sekunder med det som hann komma, i stället för 10 sekunders väntan.',
        '`/alla` hämtar från alla tre med `hamta` samtidigt och svarar med alla rubriker i en lista.',
        NYH3,
        [
          'asyncio.gather(hamta(sport), hamta(vader), hamta(kultur))',
          'Platta till listorna med en comprehension.',
          'return [rubrik for lista in listor for rubrik in lista]',
        ],
        [
          t('Rubrikerna', "__get('/alla').json", [
            'Malmö vann',
            'Sol i morgon',
          ]),
          t('Tre sekunder', "__tid('/alla')", 3),
        ],
        { path: '/alla' },
      ),
    ],
  },
  {
    id: 'fa-proj-oversattaren',
    track: 'async',
    title: 'Översättaren',
    reward: { emoji: '🌍', name: 'Jordglob' },
    summary: 'Ett ord på flera språk samtidigt.',
    steps: [
      step(
        'Ett språk',
        'Språket står i adressen och blir nyckeln i svaret.',
        "`/oversatt/{sprak}/{ord}` svarar `{'ord': ord, sprak: översättningen}`.",
        OVER1,
        [
          'async def ett(sprak: str, ord: str):',
          'await oversatt(ord, sprak)',
          "return {'ord': ord, sprak: await oversatt(ord, sprak)}",
        ],
        [
          t('Engelska', "__get('/oversatt/en/hej').json", {
            ord: 'hej',
            en: 'hello',
          }),
        ],
        { path: '/oversatt/en/hej' },
        { starterCode: OVER0 },
      ),
      step(
        'Alla språk',
        'Tre översättningar på en sekund: gather med en lista, och zip för att para ihop språk och svar.',
        '`/alla/{ord}` svarar med en dict språk → översättning, på 1 sekund.',
        OVER2,
        [
          'sprak = list(ORD)',
          'await asyncio.gather(*[oversatt(ord, s) for s in sprak])',
          'return dict(zip(sprak, svar))',
        ],
        [
          t('Alla', "__get('/alla/hej').json", {
            en: 'hello',
            de: 'hallo',
            fr: 'bonjour',
          }),
          t('En sekund', "__tid('/alla/hej')", 1),
        ],
        { path: '/alla/hej' },
      ),
      step(
        'Logga orden',
        'Loggningen behöver inte vara klar innan svaret skickas.',
        'Lägg till `bakgrund: BackgroundTasks` i `/alla/{ord}` och logga ordet i `LOGG` i bakgrunden.',
        OVER3,
        [
          'bakgrund: BackgroundTasks',
          'bakgrund.add_task(LOGG.append, ord)',
          'add_task tar funktionen och dess argument.',
        ],
        [t('Loggat', "(__get('/alla/hej'), LOGG)[1]", ['hej'])],
        { path: '/alla/hej' },
      ),
    ],
  },
  {
    id: 'fa-proj-prisjamforare',
    track: 'async',
    title: 'Prisjämföraren',
    reward: { emoji: '💹', name: 'Graf' },
    summary: 'Fråga alla butiker samtidigt och hitta det billigaste.',
    steps: [
      step(
        'Alla priser',
        'Fyra butiker, en fråga var – samtidigt.',
        '`/priser` svarar med en dict butik → pris från alla butiker.',
        PRIS1,
        [
          'butiker = list(BUTIKER)',
          'await asyncio.gather(*[fraga_butik(b) for b in butiker])',
          'return dict(zip(butiker, svar))',
        ],
        [
          t('Priserna', "__get('/priser').json", {
            Lilla: 59,
            Stora: 49,
            Snabba: 65,
            Sega: 29,
          }),
        ],
        { path: '/priser' },
        { starterCode: PRIS0 },
      ),
      step(
        'Inte vänta på Sega',
        'Sega butiken tar 9 sekunder. Ingen kund väntar så länge – hellre None.',
        'Varje butik får högst 3 sekunder. Svarar den inte blir priset None. Hela anropet tar då 3 sekunder.',
        PRIS2,
        [
          'async def pris_eller_inget(butik):',
          'asyncio.wait_for(fraga_butik(butik), timeout=3)',
          'except TimeoutError:\n    return None',
        ],
        [
          t('Sega blir None', "__get('/priser').json['Sega']", null),
          t('Tre sekunder', "__tid('/priser')", 3),
        ],
        { path: '/priser' },
      ),
      step(
        'Billigast',
        'En async-väg kan anropa en annan med await. min med key=dict.get hittar nyckeln med lägst värde.',
        "`/billigast` svarar `{'butik': …, 'pris': …}` bland butikerna som svarade.",
        PRIS3,
        [
          'alla = await priser()',
          'Hoppa över None.',
          'min(svarade, key=svarade.get)',
        ],
        [
          t('Billigast', "__get('/billigast').json", {
            butik: 'Stora',
            pris: 49,
          }),
        ],
        { path: '/billigast' },
      ),
    ],
  },
  {
    id: 'fa-proj-laga-bibliotek',
    track: 'felsok',
    title: 'Laga biblioteket',
    reward: { emoji: '🔧', name: 'Skiftnyckel' },
    summary: 'Tre fel i ett litet bibliotek-API, ett per steg.',
    steps: [
      step(
        'Boken som inte hittas',
        "Utan typ är id texten '1', och '1' finns inte bland nycklarna 1 och 2.",
        '`/bocker/1` svarar 404. Laga det.',
        LAGA_OK,
        [
          'Vad har id för typ?',
          "print(repr(id)) visar '1' med citattecken.",
          'def bok(id: int):',
        ],
        [t('Pippi', "__get('/bocker/1').json", { id: 1, titel: 'Pippi' })],
        { path: '/bocker/1' },
        { starterCode: LAGA_BUGG1 },
      ),
      step(
        'Antalet',
        'Vägen med {id} står först och tror att "antal" är ett id.',
        '`/bocker/antal` svarar 422. Laga det.',
        LAGA_OK,
        [
          'Läs 422-svaret: vilken parameter klagar det på?',
          'Ordningen på vägarna.',
          'Flytta /bocker/antal först.',
        ],
        [t('Antal', "__get('/bocker/antal').json", { antal: 2 })],
        { path: '/bocker/antal' },
        { starterCode: LAGA_BUGG2 },
      ),
      step(
        'Det tysta felet',
        'Att skapa ett fel gör ingenting – det måste kastas med raise.',
        '`/bocker/9` kraschar med ett KeyError i stället för att svara 404. Laga det.',
        LAGA_OK,
        [
          'Titta på raden med HTTPException.',
          'Ett ord saknas först på raden.',
          "raise HTTPException(status_code=404, detail='Boken finns inte')",
        ],
        [t('404', "__get('/bocker/9').status", 404)],
        { path: '/bocker/9' },
        { starterCode: LAGA_BUGG3 },
      ),
    ],
  },
  {
    id: 'fa-proj-laga-konton',
    track: 'felsok',
    title: 'Laga kontona',
    reward: { emoji: '🩹', name: 'Plåster' },
    summary: 'Tre allvarliga fel i ett konto-API.',
    steps: [
      step(
        'Läckan',
        'Utan response_model skickas lösenordet tillbaka.',
        '`POST /konton` visar lösenordet i svaret. Laga det.',
        KONTO_OK,
        [
          'Det finns en KontoUt som inte används här.',
          'response_model i dekoratorn.',
          "@app.post('/konton', status_code=201, response_model=KontoUt)",
        ],
        [
          t(
            'Utan lösenord',
            "__post('/konton', {'namn': 'Ada', 'losenord': 'hemligt'}).json",
            { namn: 'Ada' },
          ),
        ],
        post('/konton', { namn: 'Ada', losenord: 'hemligt' }),
        { starterCode: KONTO_BUGG1 },
      ),
      step(
        'Appen startar inte',
        'Depends ska få funktionen, inte resultatet av att anropa den.',
        'Appen kraschar direkt. Laga den.',
        KONTO_OK,
        [
          'Läs vilken rad felet pekar på.',
          'Det står parenteser där det inte ska.',
          'dependencies=[Depends(admin)]',
        ],
        [
          t('Utan admin: 403', "__get('/konton').status", 403),
          t('Med admin', "__get('/konton', {'x-admin': 'ja'}).status", 200),
        ],
        { path: '/konton', headers: { 'x-admin': 'ja' } },
        { starterCode: KONTO_BUGG2 },
      ),
      step(
        'Flask-vanan',
        'I FastAPI står statuskoden i dekoratorn. return x, 201 blir en lista.',
        '`POST /konton` kraschar. Laga det, så att den svarar 201 med kontot.',
        KONTO_OK,
        [
          'Titta på return-raden.',
          'Statuskoden ska stå i @app.post(...).',
          "@app.post('/konton', status_code=201, response_model=KontoUt)\n…\n    return konto",
        ],
        [
          t(
            '201 med kontot',
            "(lambda s: [s.status, s.json])(__post('/konton', {'namn': 'Bo', 'losenord': 'x'}))",
            [201, { namn: 'Bo' }],
          ),
        ],
        post('/konton', { namn: 'Bo', losenord: 'x' }),
        { starterCode: KONTO_BUGG3 },
      ),
    ],
  },
  {
    id: 'fa-proj-laga-async',
    track: 'felsok',
    title: 'Laga det långsamma',
    reward: { emoji: '🧯', name: 'Brandsläckare' },
    summary: 'Tre fel med async, ett per steg.',
    steps: [
      step(
        'Glömt await',
        'Utan await får man ett löfte om ett svar, och det går inte att göra JSON av.',
        '`/ett` kraschar. Laga det.',
        SNABB_OK,
        [
          'tjanst är en async def.',
          'Ett ord saknas.',
          "return {'svar': await tjanst('a', 1)}",
        ],
        [t('/ett', "__get('/ett').json", { svar: 'a' })],
        { path: '/ett' },
        { starterCode: SNABB_BUGG1 },
      ),
      step(
        'För långsamt',
        'De två tjänsterna behöver inte vänta på varandra.',
        '`/tva` tar 3 sekunder. Gör den lika snabb som den långsammaste tjänsten.',
        SNABB_OK,
        [
          'Två await efter varandra.',
          'asyncio.gather',
          "a, b = await asyncio.gather(tjanst('a', 1), tjanst('b', 2))",
        ],
        [
          t('Samma svar', "__get('/tva').json", { svar: ['a', 'b'] }),
          t('Två sekunder', "__tid('/tva')", 2),
        ],
        { path: '/tva' },
        { starterCode: SNABB_BUGG2 },
      ),
      step(
        'Den som aldrig svarar',
        'En minut är för länge. Ge upp efter två sekunder och säg det med 504.',
        '`/seg` väntar i 60 sekunder. Den ska ge upp efter 2 med 504.',
        SNABB_OK,
        [
          'asyncio.wait_for(…, timeout=2)',
          'Fånga TimeoutError.',
          "raise HTTPException(status_code=504, detail='Tjänsten svarar inte')",
        ],
        [
          t('504', "__get('/seg').status", 504),
          t('Två sekunder', "__tid('/seg')", 2),
        ],
        { path: '/seg' },
        { starterCode: SNABB_BUGG3 },
      ),
    ],
  },
  {
    id: 'fa-proj-faq',
    track: 'slutprojekt',
    title: 'Hjälpboten',
    reward: { emoji: '💡', name: 'Glödlampa' },
    summary:
      'En bot som svarar på vanliga frågor – med en AI som formulerar svaret.',
    steps: [
      step(
        'Hitta rätt fråga',
        'Två frågor är lika om de har ord gemensamma. set & set ger orden som finns i båda.',
        "Skriv `likhet(a, b)` (antal gemensamma ord) och `POST /fraga` som svarar `{'svar': …}` från den mest lika FAQ-frågan – eller 404 med `'Det vet jag inte'` om färre än två ord är gemensamma.",
        FAQ1,
        [
          "set(a.lower().replace('?', '').split())",
          'len(ord_a & ord_b)',
          "basta = max(FAQ, key=lambda x: likhet(f.text, x['fraga']))",
        ],
        [
          t(
            'Lösenordet',
            "__post('/fraga', {'text': 'hur återställer jag mitt lösenordet'}).json",
            { svar: 'Tryck på Glömt lösenordet.' },
          ),
          t(
            'Okänt',
            "__post('/fraga', {'text': 'Vad är meningen med livet?'}).status",
            404,
          ),
          t(
            'likhet',
            "likhet('Kostar det pengar?', 'Kostar kursen pengar?')",
            2,
          ),
        ],
        post('/fraga', { text: 'Kostar kursen pengar?' }),
        { starterCode: FAQ0 },
      ),
      step(
        'AI:n formulerar',
        'Fakta kommer från FAQ:n, formuleringen från AI:n. Då hittar AI:n aldrig på svaret själv.',
        "Lägg till `LatsasAI` (async `formulera(fraga, fakta)` som tar 2 s och svarar `'Bra fråga! ' + fakta`) och `hamta_ai`. `/fraga` blir async och svarar med AI:ns formulering.",
        FAQ2,
        [
          'async def formulera(self, fraga, fakta):',
          'ai=Depends(hamta_ai)',
          "return {'svar': await ai.formulera(f.text, basta['svar'])}",
        ],
        [
          t(
            'Formulerat',
            "__post('/fraga', {'text': 'Kostar kursen pengar?'}).json",
            { svar: 'Bra fråga! De första banorna är gratis.' },
          ),
          t(
            'Två sekunder',
            "__tid(lambda: __post('/fraga', {'text': 'Kostar kursen pengar?'}))",
            2,
          ),
        ],
        post('/fraga', { text: 'Kostar kursen pengar?' }),
      ),
      step(
        'Vad kan du?',
        'En lista med frågorna hjälper användaren att fråga rätt.',
        '`GET /faq` svarar med alla frågor i FAQ:n.',
        FAQ3,
        [
          "@app.get('/faq')",
          "[x['fraga'] for x in FAQ]",
          "return [x['fraga'] for x in FAQ]",
        ],
        [t('Tre frågor', "len(__get('/faq').json)", 3)],
        { path: '/faq' },
      ),
    ],
  },
  {
    id: 'fa-proj-sammanfattaren',
    track: 'slutprojekt',
    title: 'Sammanfattaren',
    reward: { emoji: '✂️', name: 'Sax' },
    summary: 'En AI-tjänst som sammanfattar texter – med nyckel och tak.',
    steps: [
      step(
        'Sammanfatta många',
        'Alla texter skickas till AI:n samtidigt. Tio texter tar lika lång tid som en.',
        "`POST /sammanfatta` tar emot `{'texter': […]}` (1–10 st) och svarar med en lista med sammanfattningar.",
        SAMM1,
        [
          'ai=Depends(hamta_ai)',
          'asyncio.gather(*[ai.sammanfatta(text) for text in t.texter])',
          'return await asyncio.gather(...)',
        ],
        [
          t(
            'Två texter',
            "__post('/sammanfatta', {'texter': ['Ett. Två.', 'Tre. Fyra.']}).json",
            ['Ett.', 'Tre.'],
          ),
          t(
            'Två sekunder',
            "__tid(lambda: __post('/sammanfatta', {'texter': ['A. B.'] * 5}))",
            2,
          ),
          t(
            'Inga texter: 422',
            "__post('/sammanfatta', {'texter': []}).status",
            422,
          ),
        ],
        post('/sammanfatta', { texter: ['Ett. Två.', 'Tre. Fyra.'] }),
        { starterCode: SAMM0 },
      ),
      step(
        'Bara med nyckel',
        'AI-anrop kostar pengar. Utan nyckel ska ingen kunna använda tjänsten.',
        'Lägg till `kolla_nyckel` (nyckeln `hemlig` i `x-api-nyckel`, annars 401) på `/sammanfatta`.',
        SAMM2,
        [
          'def kolla_nyckel(x_api_nyckel: str | None = Header(default=None)):',
          "raise HTTPException(status_code=401, detail='Fel nyckel')",
          'dependencies=[Depends(kolla_nyckel)]',
        ],
        [
          t(
            'Utan nyckel: 401',
            "__post('/sammanfatta', {'texter': ['A.']}).status",
            401,
          ),
          t(
            'Med nyckel',
            "__post('/sammanfatta', {'texter': ['A. B.']}, {'x-api-nyckel': 'hemlig'}).json",
            ['A.'],
          ),
        ],
        post(
          '/sammanfatta',
          { texter: ['A. B.'] },
          { headers: { 'x-api-nyckel': 'hemlig' } },
        ),
      ),
      step(
        'Ett tak',
        'Ett tak per nyckel skyddar plånboken. 429 Too Many Requests säger att man har använt för mycket.',
        'Räkna texterna per nyckel i `ANVANT`. Mer än 20 totalt: 429.',
        SAMM3,
        [
          'x_api_nyckel: str | None = Header(default=None) i vägen också.',
          'ANVANT[nyckel] = ANVANT.get(nyckel, 0) + len(t.texter)',
          'if ANVANT[x_api_nyckel] > 20:\n    raise HTTPException(status_code=429, …)',
        ],
        [
          t(
            'Taket',
            "[__post('/sammanfatta', {'texter': ['A.'] * 10}, {'x-api-nyckel': 'hemlig'}).status for _ in range(3)]",
            [200, 200, 429],
          ),
        ],
        post(
          '/sammanfatta',
          { texter: ['A. B.'] },
          { headers: { 'x-api-nyckel': 'hemlig' } },
        ),
      ),
    ],
  },
  {
    id: 'fa-proj-chatten',
    track: 'slutprojekt',
    title: 'Chatten med minne',
    reward: { emoji: '🤖', name: 'Robot' },
    summary: 'En chatt där AI:n minns hela samtalet.',
    steps: [
      step(
        'Prata',
        'En språkmodell minns ingenting själv. Minnet är historiken du skickar med varje gång.',
        "`POST /chatt/{id}` lägger användarens meddelande i samtalets historik, låter AI:n svara på hela historiken, sparar svaret och svarar `{'svar': …}`.",
        CHATT1,
        [
          'historik = SAMTAL.setdefault(id, [])',
          "historik.append({'roll': 'du', 'text': m.text})",
          'svar = await ai.svara(historik)',
        ],
        [
          t(
            'Två meddelanden',
            "[__post('/chatt/a', {'text': 'Hej'}).json['svar'], __post('/chatt/a', {'text': 'Igen'}).json['svar']]",
            [
              'Det är meddelande 1 i vårt samtal.',
              'Det är meddelande 3 i vårt samtal.',
            ],
          ),
        ],
        post('/chatt/a', { text: 'Hej' }),
        { starterCode: CHATT0 },
      ),
      step(
        'Historiken',
        'Appen behöver kunna visa hela samtalet, till exempel när den öppnas igen.',
        '`GET /chatt/{id}` svarar med historiken, eller 404.',
        CHATT2,
        [
          "@app.get('/chatt/{id}')",
          'if id not in SAMTAL:',
          'return SAMTAL[id]',
        ],
        [
          t(
            'Historiken',
            "(__post('/chatt/b', {'text': 'Hej'}), [m['roll'] for m in __get('/chatt/b').json])[1]",
            ['du', 'ai'],
          ),
          t('Okänt: 404', "__get('/chatt/x').status", 404),
        ],
        { path: '/chatt/b' },
      ),
      step(
        'Glöm',
        'Användare ska kunna radera sina samtal. pop tar bort och ger None om nyckeln saknas.',
        '`DELETE /chatt/{id}` (204) glömmer samtalet, eller 404.',
        CHATT3,
        [
          "@app.delete('/chatt/{id}', status_code=204)",
          'SAMTAL.pop(id, None)',
          'if … is None: 404',
        ],
        [
          t(
            'Glöm och igen',
            "(__post('/chatt/c', {'text': 'Hej'}), [__delete('/chatt/c').status, __delete('/chatt/c').status])[1]",
            [204, 404],
          ),
        ],
        { method: 'DELETE', path: '/chatt/c' },
      ),
    ],
  },
];
