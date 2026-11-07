import {
  PAGE_FILTER,
  PAGE_LEDIGA,
  PAGE_PRIS,
  TASSEN_API,
  TASSEN_FILTER,
  TASSEN_LEDIGA,
  TASSEN_PRIS,
} from '../files';

// Bana 3: ihop. Varannan övning i app.py och varannan i App.tsx: en ny
// sak i API:t, och sedan samma sak i sidan.
export const IHOP = [
  {
    id: 'ihop-01',
    track: 'ihop',
    lang: 'py',
    title: 'Ett nytt fält',
    xp: 15,
    description:
      'Tassen vill visa priset per natt. Sidan (📄 App.tsx) visar redan `h.pris` – men API:t skickar inget pris, så det står "undefined kr/natt".',
    explain:
      "Ett nytt fält börjar nästan alltid i API:t. Priset beror på storleken: liten 250, mellan 300 och stor 350 kr per natt.\n\n`{**h, 'pris': …}` gör en ny dictionary med allt i `h` plus priset. Kör koden och titta på sidan under feedbacken.",
    example:
      "PRIS = {'liten': 100, 'stor': 200}\nreturn [{**r, 'pris': PRIS[r['storlek']]} for r in rader]",
    task: 'Uppgift: Varje hund från `GET /api/hundar` har också `pris`: 250 för liten, 300 för mellan och 350 för stor.',
    starterCode: TASSEN_API,
    solution: TASSEN_PRIS,
    hints: [
      "PRIS_PER_NATT = {'liten': 250, 'mellan': 300, 'stor': 350}",
      "rader = fraga('SELECT * FROM hundar ORDER BY namn')",
      "return [{**h, 'pris': PRIS_PER_NATT[h['storlek']]} for h in rader]",
    ],
    tests: [
      {
        description: 'Priserna',
        code: "[h['pris'] for h in __get('/api/hundar').json]",
        expected: [350, 300, 250],
      },
      {
        description: 'Hela hunden',
        code: "__get('/api/hundar').json[0]",
        expected: { id: 1, namn: 'Bamse', storlek: 'stor', pris: 350 },
      },
    ],
    request: { path: '/api/hundar' },
    frontend: PAGE_PRIS,
  },
  {
    id: 'ihop-02',
    track: 'ihop',
    lang: 'tsx',
    title: 'Priset i sidan',
    xp: 15,
    description: 'Nu skickar API:t priset. Gör samma ändring i sidan.',
    explain:
      'Typen `Hund` är sidans bild av vad API:t skickar. Fick API:t ett nytt fält ska typen få det också – annars säger TypeScript att `pris` inte finns.\n\nSå ser det ut i alla fullstack-projekt: ändra i API:t, ändra typen, använd fältet.',
    example: 'type Bok = { id: number; titel: string; sidor: number };',
    task: 'Uppgift: Lägg till `pris: number` i `Hund` och visa `Bamse – 350 kr/natt` i varje `<li>`.',
    starterCode:
      "import { useEffect, useState } from 'react';\n\ntype Hund = { id: number; namn: string; storlek: string };\n\nexport default function App() {\n  const [hundar, setHundar] = useState<Hund[]>([]);\n\n  useEffect(() => {\n    fetch('/api/hundar')\n      .then(svar => svar.json())\n      .then(setHundar);\n  }, []);\n\n  return (\n    <ul>\n      {hundar.map(h => (\n        <li key={h.id}>{h.namn}</li>\n      ))}\n    </ul>\n  );\n}\n",
    solution:
      "import { useEffect, useState } from 'react';\n\ntype Hund = { id: number; namn: string; storlek: string; pris: number };\n\nexport default function App() {\n  const [hundar, setHundar] = useState<Hund[]>([]);\n\n  useEffect(() => {\n    fetch('/api/hundar')\n      .then(svar => svar.json())\n      .then(setHundar);\n  }, []);\n\n  return (\n    <ul>\n      {hundar.map(h => (\n        <li key={h.id}>\n          {h.namn} – {h.pris} kr/natt\n        </li>\n      ))}\n    </ul>\n  );\n}\n",
    hints: [
      'type Hund = { …; pris: number };',
      '{h.namn} – {h.pris} kr/natt',
      'Tecknet – är ett tankstreck. Kopiera det från uppgiften.',
    ],
    tests: [
      {
        description: 'Bamse',
        code: "(async () => { const app = __mount(<App />); await app.settle(); return app.text('li'); })()",
        expected: 'Bamse – 350 kr/natt',
      },
      {
        description: 'Alla tre',
        code: "(async () => { const app = __mount(<App />); await app.settle(); return app.count('li'); })()",
        expected: 3,
      },
    ],
    typeTests: [
      {
        description: 'En Hund har pris',
        code: "const h: Hund = { id: 1, namn: 'Saga', storlek: 'liten', pris: 250 };",
      },
      {
        description: 'Priset är ett tal',
        code: "const h: Hund = { id: 1, namn: 'Saga', storlek: 'liten', pris: '250' };",
        fails: true,
      },
    ],
    preview: '<App />',
    backend: TASSEN_PRIS,
  },
  {
    id: 'ihop-03',
    track: 'ihop',
    lang: 'py',
    title: 'Filtrera i API:t',
    xp: 15,
    description:
      'Sidan har knappar för storlek. De hämtar `/api/hundar?storlek=liten` och så vidare – men API:t bryr sig inte om frågan än. Prova knappen "jätte" också.',
    explain:
      'Det efter `?` läses med `request.args.get(…)`. Utan `storlek` (eller med en tom) ska alla hundar komma, som förut.\n\nEn storlek som inte finns är ett fel i anropet: 400 med en förklaring, som sidan visar.',
    example:
      "kategori = request.args.get('kategori')\nif kategori:\n    return fraga('SELECT * FROM bocker WHERE kategori = ?', (kategori,))",
    task: "Uppgift: `GET /api/hundar?storlek=liten` ger bara de små hundarna (med pris). Utan storlek blir det alla. En okänd storlek ger 400 med `'storlek ska vara liten, mellan eller stor'`.",
    starterCode: TASSEN_PRIS,
    solution: TASSEN_FILTER,
    hints: [
      "storlek = request.args.get('storlek')",
      "if storlek not in PRIS_PER_NATT:\n    abort(400, description='storlek ska vara liten, mellan eller stor')",
      "fraga('SELECT * FROM hundar WHERE storlek = ? ORDER BY namn', (storlek,))",
    ],
    tests: [
      {
        description: 'Små hundar',
        code: "[h['namn'] for h in __get('/api/hundar?storlek=liten').json]",
        expected: ['Saga'],
      },
      {
        description: 'Stora hundar med pris',
        code: "__get('/api/hundar?storlek=stor').json",
        expected: [{ id: 1, namn: 'Bamse', storlek: 'stor', pris: 350 }],
      },
      {
        description: 'Tom storlek ger alla',
        code: "len(__get('/api/hundar?storlek=').json)",
        expected: 3,
      },
      {
        description: 'Utan fråga också',
        code: "len(__get('/api/hundar').json)",
        expected: 3,
      },
      {
        description: 'Okänd storlek',
        code: "__get('/api/hundar?storlek=jätte').json",
        expected: { fel: 'storlek ska vara liten, mellan eller stor' },
      },
    ],
    request: { path: '/api/hundar?storlek=liten' },
    frontend: PAGE_FILTER,
  },
  {
    id: 'ihop-04',
    track: 'ihop',
    lang: 'tsx',
    title: 'Knapparna',
    xp: 20,
    description: 'Nu kan API:t filtrera. Koppla knapparna i sidan till det.',
    explain:
      "Storleken är state. Står den i listan sist i `useEffect`, körs effekten igen varje gång den ändras – och hämtar med den nya frågan.\n\nTypen `Storlek` har bara de fyra värdena API:t tar emot. Då kan sidan aldrig fråga efter `'jätte'` av misstag.",
    example:
      'useEffect(() => {\n  fetch(`/api/bocker?kategori=${kategori}`)\n    .then(svar => svar.json())\n    .then(setBocker);\n}, [kategori]);',
    task: 'Uppgift: Ett klick på en knapp sparar storleken i state, och listan hämtas igen med `?storlek=…`.',
    starterCode:
      "import { useEffect, useState } from 'react';\n\ntype Hund = { id: number; namn: string; storlek: string; pris: number };\ntype Storlek = '' | 'liten' | 'mellan' | 'stor';\n\nconst KNAPPAR: Storlek[] = ['', 'liten', 'mellan', 'stor'];\n\nexport default function App() {\n  const [hundar, setHundar] = useState<Hund[]>([]);\n\n  useEffect(() => {\n    fetch('/api/hundar')\n      .then(svar => svar.json())\n      .then(setHundar);\n  }, []);\n\n  return (\n    <main>\n      <p>\n        {KNAPPAR.map(s => (\n          <button key={s}>{s || 'alla'}</button>\n        ))}\n      </p>\n      <ul>\n        {hundar.map(h => (\n          <li key={h.id}>\n            {h.namn} – {h.pris} kr/natt\n          </li>\n        ))}\n      </ul>\n    </main>\n  );\n}\n",
    solution:
      "import { useEffect, useState } from 'react';\n\ntype Hund = { id: number; namn: string; storlek: string; pris: number };\ntype Storlek = '' | 'liten' | 'mellan' | 'stor';\n\nconst KNAPPAR: Storlek[] = ['', 'liten', 'mellan', 'stor'];\n\nexport default function App() {\n  const [storlek, setStorlek] = useState<Storlek>('');\n  const [hundar, setHundar] = useState<Hund[]>([]);\n\n  useEffect(() => {\n    fetch(`/api/hundar?storlek=${storlek}`)\n      .then(svar => svar.json())\n      .then(setHundar);\n  }, [storlek]);\n\n  return (\n    <main>\n      <p>\n        {KNAPPAR.map(s => (\n          <button key={s} onClick={() => setStorlek(s)}>\n            {s || 'alla'}\n          </button>\n        ))}\n      </p>\n      <ul>\n        {hundar.map(h => (\n          <li key={h.id}>\n            {h.namn} – {h.pris} kr/natt\n          </li>\n        ))}\n      </ul>\n    </main>\n  );\n}\n",
    hints: [
      "const [storlek, setStorlek] = useState<Storlek>('');",
      '<button key={s} onClick={() => setStorlek(s)}>',
      'fetch(`/api/hundar?storlek=${storlek}`) … }, [storlek]);',
    ],
    tests: [
      {
        description: 'Alla från början',
        code: "(async () => { const app = __mount(<App />); await app.settle(); return app.count('li'); })()",
        expected: 3,
      },
      {
        description: 'Bara Saga är liten',
        code: "(async () => { const app = __mount(<App />); await app.settle(); app.click('liten'); await app.settle(); return app.text('ul'); })()",
        expected: 'Saga – 250 kr/natt',
      },
      {
        description: 'Tillbaka till alla',
        code: "(async () => { const app = __mount(<App />); await app.settle(); app.click('stor'); await app.settle(); app.click('alla'); await app.settle(); return app.count('li'); })()",
        expected: 3,
      },
    ],
    typeTests: [
      {
        description: 'Storlek har bara fyra värden',
        code: "const s: Storlek = 'jätte';",
        fails: true,
      },
    ],
    preview: '<App />',
    backend: TASSEN_FILTER,
  },
  {
    id: 'ihop-05',
    track: 'ihop',
    lang: 'tsx',
    title: 'Personalen loggar in',
    xp: 20,
    description:
      'Personalen behöver en egen ruta: skriv koden, logga in och se bokningarna.',
    explain:
      'Inloggningen är två anrop efter varandra. Först `POST /api/logga-in`. Flask svarar med en cookie, och den skickas med nästa anrop av sig själv – så `GET /api/bokningar` vet att det är personalen.\n\nKoden är `tassen2026`. Fel kod ger 401 med `{"fel": "Fel kod"}`.',
    example:
      "const svar = await fetch('/api/logga-in', { method: 'POST', … });\nif (!svar.ok) {\n  setFel((await svar.json()).fel);\n  return;\n}\nconst lista = await fetch('/api/bokningar');",
    task: 'Uppgift: `loggaIn` loggar in med koden. Fel kod visar felet. Rätt kod hämtar `/api/bokningar` och sparar dem.',
    starterCode:
      "import { useState } from 'react';\n\ntype Bokning = { id: number; hund: string; fran: string; till: string };\n\nfunction Personal() {\n  const [kod, setKod] = useState('');\n  const [fel, setFel] = useState('');\n  const [bokningar, setBokningar] = useState<Bokning[] | null>(null);\n\n  async function loggaIn(e: { preventDefault(): void }) {\n    e.preventDefault();\n    // 1. POST /api/logga-in med koden. Är svaret inte ok: visa felet.\n    // 2. Annars: hämta /api/bokningar och spara dem.\n  }\n\n  return (\n    <form onSubmit={loggaIn}>\n      <input value={kod} onChange={e => setKod(e.target.value)} />\n      <button>Logga in</button>\n      {fel && <p>{fel}</p>}\n      {bokningar && bokningar.length === 0 && <p>Inga bokningar än</p>}\n      {bokningar && (\n        <ul>\n          {bokningar.map(b => (\n            <li key={b.id}>\n              {b.hund}: {b.fran} – {b.till}\n            </li>\n          ))}\n        </ul>\n      )}\n    </form>\n  );\n}\n\nexport default function App() {\n  return <Personal />;\n}\n",
    solution:
      "import { useState } from 'react';\n\ntype Bokning = { id: number; hund: string; fran: string; till: string };\n\nfunction Personal() {\n  const [kod, setKod] = useState('');\n  const [fel, setFel] = useState('');\n  const [bokningar, setBokningar] = useState<Bokning[] | null>(null);\n\n  async function loggaIn(e: { preventDefault(): void }) {\n    e.preventDefault();\n    const svar = await fetch('/api/logga-in', {\n      method: 'POST',\n      headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify({ kod }),\n    });\n    if (!svar.ok) {\n      setFel((await svar.json()).fel);\n      return;\n    }\n    setFel('');\n    const lista = await fetch('/api/bokningar');\n    setBokningar(await lista.json());\n  }\n\n  return (\n    <form onSubmit={loggaIn}>\n      <input value={kod} onChange={e => setKod(e.target.value)} />\n      <button>Logga in</button>\n      {fel && <p>{fel}</p>}\n      {bokningar && bokningar.length === 0 && <p>Inga bokningar än</p>}\n      {bokningar && (\n        <ul>\n          {bokningar.map(b => (\n            <li key={b.id}>\n              {b.hund}: {b.fran} – {b.till}\n            </li>\n          ))}\n        </ul>\n      )}\n    </form>\n  );\n}\n\nexport default function App() {\n  return <Personal />;\n}\n",
    hints: [
      "await fetch('/api/logga-in', { method: 'POST', headers: …, body: JSON.stringify({ kod }) })",
      'if (!svar.ok) { setFel((await svar.json()).fel); return; }',
      "const lista = await fetch('/api/bokningar');\nsetBokningar(await lista.json());",
    ],
    tests: [
      {
        description: 'Fel kod',
        code: "(async () => { const app = __mount(<Personal />); app.type('gissning'); app.submit(); await app.settle(); return app.text('p'); })()",
        expected: 'Fel kod',
      },
      {
        description: 'Inga bokningar än',
        code: "(async () => { const app = __mount(<Personal />); app.type('tassen2026'); app.submit(); await app.settle(); return app.text('p'); })()",
        expected: 'Inga bokningar än',
      },
      {
        description: 'Bokningen syns',
        code: "(async () => { await fetch('/api/bokningar', { method: 'POST', body: JSON.stringify({ hund_id: 2, fran: '2026-12-01', till: '2026-12-04' }) }); const app = __mount(<Personal />); app.type('tassen2026'); app.submit(); await app.settle(); return app.text('li'); })()",
        expected: 'Saga: 2026-12-01 – 2026-12-04',
      },
    ],
    preview: '<App />',
    backend: TASSEN_FILTER,
  },
  {
    id: 'ihop-06',
    track: 'ihop',
    lang: 'py',
    title: 'Lediga hundplatser',
    xp: 20,
    description:
      'Sista funktionen i API:t: vilka hundar är lediga mellan två datum? Sidan (📄 App.tsx) frågar redan `/api/lediga?fran=…&till=…`.',
    explain:
      'Det är samma krock som när en bokning sparas, fast omvänt: en hund är ledig om den inte har någon bokning som krockar med perioden.\n\n`NOT IN (SELECT …)` tar bort hundarna som en annan fråga hittar. Svaret har pris, som `/api/hundar`.',
    example:
      'SELECT * FROM rum WHERE id NOT IN (\n    SELECT rum_id FROM bokningar WHERE fran < ? AND ? < till\n)',
    task: "Uppgift: `GET /api/lediga?fran=…&till=…` svarar med de hundar (med pris, sorterade på namn) som inte är bokade då. Fel datum ger 400 med `'Hämtningen måste vara efter lämningen'`.",
    starterCode: TASSEN_FILTER,
    solution: TASSEN_LEDIGA,
    hints: [
      "fran = request.args.get('fran', '')",
      'SELECT * FROM hundar WHERE id NOT IN (SELECT hund_id FROM bokningar WHERE fran < ? AND ? < till) ORDER BY namn',
      'return med_pris(fraga(…, (till, fran)))',
    ],
    tests: [
      {
        description: 'Alla är lediga',
        code: "[h['namn'] for h in __get('/api/lediga?fran=2026-12-01&till=2026-12-03').json]",
        expected: ['Bamse', 'Pixel', 'Saga'],
        inputs: [],
      },
      {
        description: 'Bamse är bokad',
        code: "(k := __klient(), k.post('/api/bokningar', {'hund_id': 1, 'fran': '2026-12-01', 'till': '2026-12-05'}), [h['namn'] for h in k.get('/api/lediga?fran=2026-12-03&till=2026-12-04').json])[-1]",
        expected: ['Pixel', 'Saga'],
        inputs: [],
      },
      {
        description: 'Ledig igen när han hämtats',
        code: "(k := __klient(), k.post('/api/bokningar', {'hund_id': 1, 'fran': '2026-12-01', 'till': '2026-12-05'}), len(k.get('/api/lediga?fran=2026-12-05&till=2026-12-07').json))[-1]",
        expected: 3,
        inputs: [],
      },
      {
        description: 'Med pris',
        code: "__get('/api/lediga?fran=2026-12-01&till=2026-12-03').json[0]['pris']",
        expected: 350,
        inputs: [],
      },
      {
        description: 'Fel ordning',
        code: "__get('/api/lediga?fran=2026-12-05&till=2026-12-01').status",
        expected: 400,
        inputs: [],
      },
    ],
    request: { path: '/api/lediga?fran=2026-12-01&till=2026-12-03' },
    frontend: PAGE_LEDIGA,
  },
];
