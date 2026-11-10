// Bana 8: databas. sqlite3 i minnet, ? i frågorna (SQL-injektion), och
// Depends med yield. Databasen delas av alla anrop i en körning, eftersom
// en ny :memory:-databas per anrop vore tom. Förklaringarna säger hur det
// görs i en riktig app.

const IMPORT =
  'import sqlite3\n\nfrom fastapi import FastAPI, Depends, HTTPException\nfrom pydantic import BaseModel\n\napp = FastAPI()\n';

const DB = `
db = sqlite3.connect(':memory:')
db.row_factory = sqlite3.Row
db.execute('create table varor (id integer primary key, namn text, pris integer)')
db.executemany(
    'insert into varor (namn, pris) values (?, ?)',
    [('Äpple', 5), ('Bröd', 32), ('Ost', 89)],
)
`;

const HAMTA = `

def hamta_db():
    yield db
`;

const VARA = `

class Vara(BaseModel):
    namn: str
    pris: int
`;

const BAS = `${IMPORT}${DB}${HAMTA}`;

export const DATABAS = [
  {
    id: 'fa-databas-01',
    track: 'databas',
    title: 'Läsa ur en tabell',
    xp: 20,
    description:
      'Riktiga API:er sparar sin data i en databas. Python har en inbyggd: sqlite3.',
    explain:
      "Databasen och tabellen `varor` finns redan i startkoden. En tabell är som ett kalkylark: varje **rad** är en vara, varje **kolumn** ett fält.\n\nMed SQL frågar man databasen:\n\n`db.execute('select id, namn, pris from varor').fetchall()`\n\n`row_factory = sqlite3.Row` gör att varje rad kan bli en dict med `dict(rad)`. Då blir svaret snygg JSON.\n\n(Vill du lära dig SQL ordentligt finns SQL-kursen i Kodskolan.)",
    example:
      "rader = db.execute('select namn from djur').fetchall()\nreturn [dict(rad) for rad in rader]",
    task: 'Uppgift: `GET /varor` ska svara med alla varor som dicts med `id`, `namn` och `pris`.',
    starterCode: `${IMPORT}${DB}`,
    solution: `${IMPORT}${DB}\n\n@app.get('/varor')\ndef varor():\n    rader = db.execute('select id, namn, pris from varor').fetchall()\n    return [dict(rad) for rad in rader]\n`,
    hints: [
      "db.execute('select id, namn, pris from varor').fetchall()",
      'dict(rad) gör en rad till en dict.',
      'return [dict(rad) for rad in rader]',
    ],
    tests: [
      {
        description: 'Tre varor',
        code: "__get('/varor').json",
        expected: [
          { id: 1, namn: 'Äpple', pris: 5 },
          { id: 2, namn: 'Bröd', pris: 32 },
          { id: 3, namn: 'Ost', pris: 89 },
        ],
      },
      {
        description: 'Läser från databasen, inte en lista',
        code: "(db.execute(\"insert into varor (namn, pris) values ('Te', 20)\"), len(__get('/varor').json))[1]",
        expected: 4,
      },
    ],
    request: { path: '/varor' },
  },
  {
    id: 'fa-databas-02',
    track: 'databas',
    title: 'En rad med ?',
    xp: 20,
    description:
      'Värden från adressen sätts in i SQL:en med ?, aldrig genom att klistra ihop texten.',
    explain:
      "`?` i SQL:en är en plats för ett värde. Värdena skickas som en tuple:\n\n`db.execute('select * from varor where id = ?', (id,)).fetchone()`\n\n`(id,)` med komma är en tuple med ett värde. `fetchone()` ger en rad – eller `None` om ingen fanns.",
    example:
      "rad = db.execute('select * from djur where id = ?', (id,)).fetchone()\nif rad is None:\n    raise HTTPException(status_code=404, detail='Finns inte')\nreturn dict(rad)",
    task: "Uppgift: `GET /varor/{id}` svarar med varan, eller 404 med `detail` `'Varan finns inte'`.",
    starterCode: `${IMPORT}${DB}`,
    solution: `${IMPORT}${DB}\n\n@app.get('/varor/{id}')\ndef en_vara(id: int):\n    rad = db.execute('select id, namn, pris from varor where id = ?', (id,)).fetchone()\n    if rad is None:\n        raise HTTPException(status_code=404, detail='Varan finns inte')\n    return dict(rad)\n`,
    hints: [
      "db.execute('select id, namn, pris from varor where id = ?', (id,)).fetchone()",
      'Är rad None finns varan inte.',
      'return dict(rad)',
    ],
    tests: [
      {
        description: '/varor/2',
        code: "__get('/varor/2').json",
        expected: { id: 2, namn: 'Bröd', pris: 32 },
      },
      {
        description: '/varor/9 ger 404',
        code: "__get('/varor/9').json",
        expected: { detail: 'Varan finns inte' },
      },
    ],
    request: { path: '/varor/2' },
  },
  {
    id: 'fa-databas-03',
    track: 'databas',
    title: 'Spara en ny rad',
    xp: 20,
    description:
      'INSERT lägger till en rad. Databasen ger den ett nytt id själv.',
    explain:
      "```\nmarkor = db.execute('insert into varor (namn, pris) values (?, ?)', (vara.namn, vara.pris))\ndb.commit()\n```\n\n- `commit()` sparar ändringen på riktigt.\n- `markor.lastrowid` är id:t databasen gav raden.\n\nDu behöver alltså inte räkna ut id själv längre – det gör databasen.",
    example:
      "m = db.execute('insert into djur (namn) values (?)', (djur.namn,))\ndb.commit()\nreturn {'id': m.lastrowid, 'namn': djur.namn}",
    task: "Uppgift: `POST /varor` sparar varan och svarar 201 med `{'id': …, 'namn': …, 'pris': …}`.",
    starterCode: `${IMPORT}${DB}${VARA}`,
    solution: `${IMPORT}${DB}${VARA}\n\n@app.post('/varor', status_code=201)\ndef ny_vara(vara: Vara):\n    markor = db.execute('insert into varor (namn, pris) values (?, ?)', (vara.namn, vara.pris))\n    db.commit()\n    return {'id': markor.lastrowid, **vara.model_dump()}\n`,
    hints: [
      "db.execute('insert into varor (namn, pris) values (?, ?)', (vara.namn, vara.pris))",
      'Glöm inte db.commit().',
      "return {'id': markor.lastrowid, **vara.model_dump()}",
    ],
    tests: [
      {
        description: 'Ny vara får id 4',
        code: "__post('/varor', {'namn': 'Te', 'pris': 20}).json",
        expected: { id: 4, namn: 'Te', pris: 20 },
      },
      {
        description: 'Den finns i databasen',
        code: "db.execute('select namn from varor where id = 4').fetchone()[0]",
        expected: 'Te',
      },
      {
        description: '201',
        code: "__post('/varor', {'namn': 'Kaffe', 'pris': 30}).status",
        expected: 201,
      },
    ],
    request: {
      method: 'POST',
      path: '/varor',
      body: '{"namn": "Te", "pris": 20}',
    },
  },
  {
    id: 'fa-databas-04',
    track: 'databas',
    title: 'SQL-injektion',
    xp: 25,
    description:
      'Det här är en av de vanligaste säkerhetsluckorna på webben. Laga den.',
    explain:
      "Startkoden klistrar in sökordet direkt i SQL:en med en f-sträng. Söker någon på\n\n`' or '1'='1`\n\nblir SQL:en `… where namn = '' or '1'='1'` – och **alla** rader kommer ut. Med värre text kan någon radera hela databasen.\n\nMed `?` skickas sökordet som ett värde, aldrig som SQL. Det går inte att lura.",
    example:
      "# Farligt:\ndb.execute(f\"select * from djur where namn = '{namn}'\")\n# Säkert:\ndb.execute('select * from djur where namn = ?', (namn,))",
    task: 'Uppgift: Laga `/sok` så att den använder `?`. Sökningen ska fungera precis som förut, men inte gå att lura.',
    starterCode: `${IMPORT}${DB}\n\n@app.get('/sok')\ndef sok(namn: str):\n    rader = db.execute(f"select id, namn, pris from varor where namn = '{namn}'").fetchall()\n    return [dict(rad) for rad in rader]\n`,
    solution: `${IMPORT}${DB}\n\n@app.get('/sok')\ndef sok(namn: str):\n    rader = db.execute('select id, namn, pris from varor where namn = ?', (namn,)).fetchall()\n    return [dict(rad) for rad in rader]\n`,
    hints: [
      "Prova /sok?namn=' or '1'='1 med 📮.",
      'Byt f-strängen mot en vanlig text med ? i.',
      "db.execute('select id, namn, pris from varor where namn = ?', (namn,))",
    ],
    tests: [
      {
        description: 'Sök på Ost',
        code: "__get('/sok?namn=Ost').json",
        expected: [{ id: 3, namn: 'Ost', pris: 89 }],
      },
      {
        description: 'Går inte att lura',
        code: "__get(\"/sok?namn=' or '1'='1\").json",
        expected: [],
      },
    ],
    request: { path: "/sok?namn=' or '1'='1" },
  },
  {
    id: 'fa-databas-05',
    track: 'databas',
    title: 'Databasen som beroende',
    xp: 25,
    description:
      'Vägarna ska inte hämta databasen själva. De får den från ett beroende – med yield.',
    explain:
      "Ett beroende med `yield` delas i två: det före `yield` körs innan vägen, och det efter körs när svaret är skickat.\n\n```\ndef hamta_db():\n    db = sqlite3.connect('butik.db')\n    try:\n        yield db\n    finally:\n        db.close()\n```\n\nSå ser det ut i en riktig app: en anslutning per anrop, som alltid stängs.\n\nHär i webbläsaren delar alla anrop samma databas i minnet (annars vore den tom varje gång), så vårt `hamta_db` bara lämnar ut den. Men vägarna skrivs precis som i en riktig app: `db=Depends(hamta_db)`.",
    example:
      "@app.get('/djur')\ndef djur(db=Depends(hamta_db)):\n    return [dict(r) for r in db.execute('select * from djur')]",
    task: "Uppgift: `hamta_db` finns. Låt `GET /varor` och `GET /antal` (som svarar `{'antal': …}`) få databasen med `Depends(hamta_db)`. Döp parametern till `anslutning`, så syns det att den kommer från beroendet.",
    starterCode: BAS,
    solution: `${BAS}\n\n@app.get('/varor')\ndef varor(anslutning=Depends(hamta_db)):\n    rader = anslutning.execute('select id, namn, pris from varor').fetchall()\n    return [dict(rad) for rad in rader]\n\n\n@app.get('/antal')\ndef antal(anslutning=Depends(hamta_db)):\n    return {'antal': anslutning.execute('select count(*) from varor').fetchone()[0]}\n`,
    hints: [
      'def varor(anslutning=Depends(hamta_db)):',
      'select count(*) from varor räknar raderna. fetchone()[0] ger talet.',
      "return {'antal': anslutning.execute('select count(*) from varor').fetchone()[0]}",
    ],
    tests: [
      {
        description: '/varor',
        code: "len(__get('/varor').json)",
        expected: 3,
      },
      {
        description: '/antal',
        code: "__get('/antal').json",
        expected: { antal: 3 },
      },
      {
        description: 'Databasen kommer från beroendet',
        code: "(lambda t: (t.execute('create table varor (id integer, namn text, pris integer)'), app.dependency_overrides.update({hamta_db: lambda: t}), __get('/antal').json)[2])(sqlite3.connect(':memory:'))",
        expected: { antal: 0 },
      },
    ],
    request: { path: '/antal' },
  },
  {
    id: 'fa-databas-06',
    track: 'databas',
    title: 'Ändra med UPDATE',
    xp: 25,
    description:
      'UPDATE ändrar rader. rowcount säger hur många som ändrades – noll betyder att id:t inte fanns.',
    explain:
      "```\nm = db.execute('update varor set pris = ? where id = ?', (pris, id))\ndb.commit()\n```\n\n`m.rowcount` är antalet rader som ändrades. Är det 0 fanns ingen vara med det id:t – svara 404.\n\nOrdningen i tuplen måste stämma med ordningen på `?` i SQL:en.",
    example:
      "m = db.execute('update djur set namn = ? where id = ?', (namn, id))\nif m.rowcount == 0:\n    raise HTTPException(status_code=404, detail='Finns inte')",
    task: "Uppgift: `PATCH /varor/{id}/pris` tar emot `{'pris': …}`, ändrar priset och svarar med varan. Okänt id ger 404.",
    starterCode: `${BAS}\n\nclass NyttPris(BaseModel):\n    pris: int\n`,
    solution: `${BAS}\n\nclass NyttPris(BaseModel):\n    pris: int\n\n\n@app.patch('/varor/{id}/pris')\ndef nytt_pris(id: int, nytt: NyttPris, anslutning=Depends(hamta_db)):\n    markor = anslutning.execute('update varor set pris = ? where id = ?', (nytt.pris, id))\n    anslutning.commit()\n    if markor.rowcount == 0:\n        raise HTTPException(status_code=404, detail='Varan finns inte')\n    return dict(anslutning.execute('select id, namn, pris from varor where id = ?', (id,)).fetchone())\n`,
    hints: [
      'update varor set pris = ? where id = ?',
      'if markor.rowcount == 0: – då fanns varan inte.',
      'Hämta varan igen med select efter ändringen, och svara med dict(rad).',
    ],
    tests: [
      {
        description: 'Nytt pris på Bröd',
        code: "__patch('/varor/2/pris', {'pris': 29}).json",
        expected: { id: 2, namn: 'Bröd', pris: 29 },
      },
      {
        description: 'Det är sparat',
        code: "db.execute('select pris from varor where id = 2').fetchone()[0]",
        expected: 29,
      },
      {
        description: 'Okänt id ger 404',
        code: "__patch('/varor/9/pris', {'pris': 1}).status",
        expected: 404,
      },
    ],
    request: {
      method: 'PATCH',
      path: '/varor/2/pris',
      body: '{"pris": 29}',
    },
  },
  {
    id: 'fa-databas-07',
    track: 'databas',
    title: 'Ta bort med DELETE',
    xp: 20,
    description: 'DELETE i SQL tar bort rader. rowcount fungerar likadant.',
    explain:
      '`delete from varor where id = ?` tar bort raden. Glöm inte `where` – utan den försvinner **alla** rader.\n\n`rowcount` är 0 om ingen rad togs bort.',
    example:
      "m = db.execute('delete from djur where id = ?', (id,))\ndb.commit()",
    task: 'Uppgift: `DELETE /varor/{id}` tar bort varan och svarar 204. Okänt id ger 404.',
    starterCode: BAS,
    solution: `${BAS}\n\n@app.delete('/varor/{id}', status_code=204)\ndef ta_bort(id: int, anslutning=Depends(hamta_db)):\n    markor = anslutning.execute('delete from varor where id = ?', (id,))\n    anslutning.commit()\n    if markor.rowcount == 0:\n        raise HTTPException(status_code=404, detail='Varan finns inte')\n`,
    hints: [
      "@app.delete('/varor/{id}', status_code=204)",
      "anslutning.execute('delete from varor where id = ?', (id,))",
      'Kolla markor.rowcount == 0 efteråt.',
    ],
    tests: [
      {
        description: 'Ta bort Ost ger 204',
        code: "__delete('/varor/3').status",
        expected: 204,
      },
      {
        description: 'Två varor kvar',
        code: "db.execute('select count(*) from varor').fetchone()[0]",
        expected: 2,
      },
      {
        description: 'Igen ger 404',
        code: "__delete('/varor/3').status",
        expected: 404,
      },
    ],
    request: { method: 'DELETE', path: '/varor/3' },
  },
  {
    id: 'fa-databas-08',
    track: 'databas',
    title: 'Sortera och begränsa',
    xp: 25,
    description:
      'Databasen kan sortera och plocka ut några rader åt dig, med ORDER BY och LIMIT.',
    explain:
      '- `order by pris` – billigast först. `order by pris desc` – dyrast först.\n- `limit ?` – högst så många rader.\n\n`?` fungerar för **värden**, men inte för namn på kolumner eller ord som `desc`. Där väljer du själv mellan färdiga texter i koden – aldrig text som kommer från anropet.',
    example:
      "ordning = 'desc' if dyrast_forst else 'asc'\ndb.execute(f'select * from varor order by pris {ordning} limit ?', (antal,))",
    task: 'Uppgift: `GET /varor` tar frågorna `dyrast_forst` (bool, False) och `antal` (heltal, 10) och svarar med varorna sorterade efter pris.',
    starterCode: BAS,
    solution: `${BAS}\n\n@app.get('/varor')\ndef varor(dyrast_forst: bool = False, antal: int = 10, anslutning=Depends(hamta_db)):\n    ordning = 'desc' if dyrast_forst else 'asc'\n    rader = anslutning.execute(\n        f'select id, namn, pris from varor order by pris {ordning} limit ?', (antal,)\n    ).fetchall()\n    return [dict(rad) for rad in rader]\n`,
    hints: [
      "ordning = 'desc' if dyrast_forst else 'asc'",
      'Antalet skickas med ?, ordningen klistras in – den kommer bara från din kod.',
      "f'select id, namn, pris from varor order by pris {ordning} limit ?', (antal,)",
    ],
    tests: [
      {
        description: 'Billigast först',
        code: "[v['namn'] for v in __get('/varor').json]",
        expected: ['Äpple', 'Bröd', 'Ost'],
      },
      {
        description: 'Dyrast först, en',
        code: "__get('/varor?dyrast_forst=true&antal=1').json",
        expected: [{ id: 3, namn: 'Ost', pris: 89 }],
      },
    ],
    request: { path: '/varor?dyrast_forst=true' },
  },
  {
    id: 'fa-databas-09',
    track: 'databas',
    title: 'Två tabeller med JOIN',
    xp: 30,
    description:
      'Data delas ofta i flera tabeller. JOIN sätter ihop dem i en fråga.',
    explain:
      'Varje vara har ett `kategori_id`, och kategorinamnen står i tabellen `kategorier`. Med JOIN hämtas båda på en gång:\n\n```\nselect varor.namn, kategorier.namn as kategori\nfrom varor\njoin kategorier on kategorier.id = varor.kategori_id\n```\n\n`as kategori` ger kolumnen ett eget namn, så att de två `namn` inte krockar.',
    example:
      'select bocker.titel, forfattare.namn as forfattare\nfrom bocker join forfattare on forfattare.id = bocker.forfattare_id',
    task: "Uppgift: `GET /varor` ska svara med `{'namn': …, 'pris': …, 'kategori': …}` för varje vara, där kategorin är namnet från `kategorier`.",
    starterCode: `${IMPORT}\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\ncreate table kategorier (id integer primary key, namn text);\ncreate table varor (id integer primary key, namn text, pris integer, kategori_id integer);\ninsert into kategorier (namn) values ('frukt'), ('mejeri');\ninsert into varor (namn, pris, kategori_id) values ('Äpple', 5, 1), ('Ost', 89, 2), ('Banan', 4, 1);\n''')\n${HAMTA}`,
    solution: `${IMPORT}\ndb = sqlite3.connect(':memory:')\ndb.row_factory = sqlite3.Row\ndb.executescript('''\ncreate table kategorier (id integer primary key, namn text);\ncreate table varor (id integer primary key, namn text, pris integer, kategori_id integer);\ninsert into kategorier (namn) values ('frukt'), ('mejeri');\ninsert into varor (namn, pris, kategori_id) values ('Äpple', 5, 1), ('Ost', 89, 2), ('Banan', 4, 1);\n''')\n${HAMTA}\n\n@app.get('/varor')\ndef varor(anslutning=Depends(hamta_db)):\n    rader = anslutning.execute('''\n        select varor.namn, varor.pris, kategorier.namn as kategori\n        from varor\n        join kategorier on kategorier.id = varor.kategori_id\n        order by varor.id\n    ''').fetchall()\n    return [dict(rad) for rad in rader]\n`,
    hints: [
      'select varor.namn, varor.pris, kategorier.namn as kategori',
      'from varor join kategorier on kategorier.id = varor.kategori_id',
      'Sortera med order by varor.id så att ordningen blir densamma som i tabellen.',
    ],
    tests: [
      {
        description: 'Varorna med kategori',
        code: "__get('/varor').json",
        expected: [
          { namn: 'Äpple', pris: 5, kategori: 'frukt' },
          { namn: 'Ost', pris: 89, kategori: 'mejeri' },
          { namn: 'Banan', pris: 4, kategori: 'frukt' },
        ],
      },
    ],
    request: { path: '/varor' },
  },
];
