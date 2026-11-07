import { API_STEG, PAGE_API, TASSEN_API, TASSEN_LEDIGA } from '../files';

// En boss per bana: en större uppgift utan ledtrådar. index.js lägger
// varje boss sist i sin bana.
export const BOSSES = {
  api: {
    id: 'api-boss',
    track: 'api',
    lang: 'py',
    title: 'Boss: Avboka',
    isBoss: true,
    xp: 40,
    description:
      'Bossen har inga ledtrådar – visa vad du kan! Personalen vill kunna avboka. Sidan har redan en Avboka-knapp vid varje bokning.',
    task: "Uppgift: `DELETE /api/bokningar/<id>` tar bort bokningen och svarar 204 utan innehåll.\n  1. Bara personalen: andra får 401 med `'Bara personalen kan avboka'`.\n  2. En bokning som inte finns ger 404 med `'Ingen sådan bokning'`.\n  3. Efteråt syns den inte i `GET /api/bokningar`.",
    starterCode: API_STEG[6],
    solution: TASSEN_API,
    hints: [],
    tests: [
      {
        description: 'Utan inloggning',
        code: "__delete('/api/bokningar/1').json",
        expected: { fel: 'Bara personalen kan avboka' },
        inputs: [],
      },
      {
        description: 'Avbokad',
        code: "(k := __klient(), k.post('/api/bokningar', {'hund_id': 1, 'fran': '2026-12-01', 'till': '2026-12-03'}), k.post('/api/logga-in', {'kod': 'tassen2026'}), k.delete('/api/bokningar/1').status, k.get('/api/bokningar').json)[3:]",
        expected: [204, []],
        inputs: [],
      },
      {
        description: 'Svaret är tomt',
        code: "(k := __klient(), k.post('/api/bokningar', {'hund_id': 1, 'fran': '2026-12-01', 'till': '2026-12-03'}), k.post('/api/logga-in', {'kod': 'tassen2026'}), k.delete('/api/bokningar/1').text)[-1]",
        expected: '',
        inputs: [],
      },
      {
        description: 'Ingen sådan bokning',
        code: "(k := __klient(), k.post('/api/logga-in', {'kod': 'tassen2026'}), k.delete('/api/bokningar/99').json)[-1]",
        expected: { fel: 'Ingen sådan bokning' },
        inputs: [],
      },
      {
        description: 'Bara den bokningen',
        code: "(k := __klient(), k.post('/api/bokningar', {'hund_id': 1, 'fran': '2026-12-01', 'till': '2026-12-03'}), k.post('/api/bokningar', {'hund_id': 2, 'fran': '2026-12-01', 'till': '2026-12-03'}), k.post('/api/logga-in', {'kod': 'tassen2026'}), k.delete('/api/bokningar/1'), [b['hund'] for b in k.get('/api/bokningar').json])[-1]",
        expected: ['Saga'],
        inputs: [],
      },
    ],
    request: { method: 'DELETE', path: '/api/bokningar/1' },
    frontend: PAGE_API,
  },
  sidan: {
    id: 'sidan-boss',
    track: 'sidan',
    lang: 'tsx',
    title: 'Boss: Ett typat anrop',
    isBoss: true,
    xp: 40,
    description:
      'Bossen har inga ledtrådar – visa vad du kan! Varje anrop har samma kontroll: gick det bra, och vad var felet? Skriv det en gång, med typer som tvingar fram kontrollen.',
    task: 'Uppgift: Skriv typen `Svar<T>`, som är `{ ok: true; data: T }` eller `{ ok: false; fel: string }`.\n  1. `anropa<T>(url, init?)` gör `fetch(url, init)` och svarar med ett `Svar<T>`.\n  2. Gick det bra är `data` det API:t svarade, annars är `fel` felet från API:t.\n  3. TypeScript ska inte släppa igenom `data` förrän man kollat `ok`.',
    starterCode:
      'type Hund = { id: number; namn: string; storlek: string };\n\n// Skriv typen Svar<T> och funktionen anropa<T>(url, init?).\n',
    solution:
      'type Hund = { id: number; namn: string; storlek: string };\n\ntype Svar<T> = { ok: true; data: T } | { ok: false; fel: string };\n\nasync function anropa<T>(url: string, init?: RequestInit): Promise<Svar<T>> {\n  const svar = await fetch(url, init);\n  const data = await svar.json();\n  return svar.ok ? { ok: true, data } : { ok: false, fel: data.fel };\n}\n',
    hints: [],
    tests: [
      {
        description: 'Hundarna',
        code: "anropa('/api/hundar').then(s => s.ok && s.data.length)",
        expected: 3,
      },
      {
        description: 'En hund',
        code: "anropa('/api/hundar/2').then(s => s.ok && s.data.namn)",
        expected: 'Saga',
      },
      {
        description: 'Ett fel',
        code: "anropa('/api/hundar/99').then(s => [s.ok, s.fel])",
        expected: [false, 'Ingen sådan hund'],
      },
      {
        description: 'Med init',
        code: "anropa('/api/bokningar', { method: 'POST', body: JSON.stringify({ hund_id: 1, fran: '2026-12-01', till: '2026-12-03' }) }).then(s => s.ok && s.data.id)",
        expected: 1,
      },
      {
        description: 'Ett fel vid POST',
        code: "anropa('/api/bokningar', { method: 'POST', body: JSON.stringify({ hund_id: 1, fran: '2026-12-05', till: '2026-12-01' }) }).then(s => s.fel)",
        expected: 'Hämtningen måste vara efter lämningen',
      },
    ],
    typeTests: [
      {
        description: 'Efter if (s.ok) är data en Hund',
        code: "anropa<Hund>('/api/hundar/1').then(s => { if (s.ok) { const n: string = s.data.namn; } });",
      },
      {
        description: 'Annars är fel text',
        code: "anropa<Hund>('/api/hundar/1').then(s => { if (!s.ok) { const f: string = s.fel; } });",
      },
      {
        description: 'data går inte att läsa utan kontroll',
        code: "anropa<Hund>('/api/hundar/1').then(s => s.data);",
        fails: true,
      },
      {
        description: 'init är valfritt men typat',
        code: "anropa('/api/hundar', { method: 1 });",
        fails: true,
      },
    ],
    backend: TASSEN_API,
  },
  ihop: {
    id: 'ihop-boss',
    track: 'ihop',
    lang: 'tsx',
    title: 'Boss: Hela bokningen',
    isBoss: true,
    xp: 50,
    description:
      'Bossen har inga ledtrådar – visa vad du kan! Allt finns i API:t (📄 app.py). Bygg sidan där en kund bokar en hund.',
    task: 'Uppgift: Bygg bokningssidan i `App`.\n  1. Två `<input>`: lämning (`fran`) och hämtning (`till`), och knappen `Sök lediga`, som hämtar `/api/lediga`.\n  2. Varje ledig hund i ett `<li>`: `Saga – 250 kr/natt` och knappen `Boka Saga`.\n  3. Boka gör `POST /api/bokningar`. Gick det bra visas `Bokad! Saga har bokning nr 1` i ett `<p>`, och hunden försvinner ur listan.\n  4. Annars visas felet från API:t i `<p>`.',
    starterCode:
      "import { useState } from 'react';\n\ntype Hund = { id: number; namn: string; storlek: string; pris: number };\n\nexport default function App() {\n  return <h1>🐾 Boka på Tassen</h1>;\n}\n",
    solution:
      "import { useState } from 'react';\n\ntype Hund = { id: number; namn: string; storlek: string; pris: number };\n\nexport default function App() {\n  const [fran, setFran] = useState('');\n  const [till, setTill] = useState('');\n  const [lediga, setLediga] = useState<Hund[]>([]);\n  const [besked, setBesked] = useState('');\n\n  async function sok() {\n    const svar = await fetch(`/api/lediga?fran=${fran}&till=${till}`);\n    const data = await svar.json();\n    if (svar.ok) {\n      setLediga(data);\n      setBesked('');\n    } else {\n      setLediga([]);\n      setBesked(data.fel);\n    }\n  }\n\n  async function boka(hund: Hund) {\n    const svar = await fetch('/api/bokningar', {\n      method: 'POST',\n      headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify({ hund_id: hund.id, fran, till }),\n    });\n    const data = await svar.json();\n    if (svar.ok) {\n      setLediga(lediga.filter(h => h.id !== hund.id));\n      setBesked(`Bokad! ${hund.namn} har bokning nr ${data.id}`);\n    } else {\n      setBesked(data.fel);\n    }\n  }\n\n  return (\n    <main>\n      <h1>🐾 Boka på Tassen</h1>\n      <input value={fran} onChange={e => setFran(e.target.value)} />\n      <input value={till} onChange={e => setTill(e.target.value)} />\n      <button onClick={sok}>Sök lediga</button>\n      <ul>\n        {lediga.map(h => (\n          <li key={h.id}>\n            {h.namn} – {h.pris} kr/natt{' '}\n            <button onClick={() => boka(h)}>Boka {h.namn}</button>\n          </li>\n        ))}\n      </ul>\n      {besked && <p>{besked}</p>}\n    </main>\n  );\n}\n",
    hints: [],
    tests: [
      {
        description: 'Tre lediga',
        code: "(async () => {  const app = __mount(<App />); app.type('2026-12-01', 0); app.type('2026-12-03', 1); app.click('Sök lediga'); await app.settle(); return app.count('li'); })()",
        expected: 3,
      },
      {
        description: 'Med pris',
        code: "(async () => {  const app = __mount(<App />); app.type('2026-12-01', 0); app.type('2026-12-03', 1); app.click('Sök lediga'); await app.settle(); return app.text('li').startsWith('Bamse – 350 kr/natt'); })()",
        expected: true,
      },
      {
        description: 'Boka Saga',
        code: "(async () => {  const app = __mount(<App />); app.type('2026-12-01', 0); app.type('2026-12-03', 1); app.click('Sök lediga'); await app.settle(); app.click('Boka Saga'); await app.settle(); return app.text('p'); })()",
        expected: 'Bokad! Saga har bokning nr 1',
      },
      {
        description: 'Saga försvinner ur listan',
        code: "(async () => {  const app = __mount(<App />); app.type('2026-12-01', 0); app.type('2026-12-03', 1); app.click('Sök lediga'); await app.settle(); app.click('Boka Saga'); await app.settle(); return app.count('li'); })()",
        expected: 2,
      },
      {
        description: 'Pixel är redan bokad',
        code: "(async () => { await fetch('/api/bokningar', { method: 'POST', body: JSON.stringify({ hund_id: 3, fran: '2026-12-02', till: '2026-12-06' }) }); const app = __mount(<App />); app.type('2026-12-01', 0); app.type('2026-12-03', 1); app.click('Sök lediga'); await app.settle(); return app.text('ul').includes('Pixel'); })()",
        expected: false,
      },
      {
        description: 'Felet från API:t',
        code: "(async () => {  const app = __mount(<App />); app.type('2026-12-05', 0); app.type('2026-12-01', 1); app.click('Sök lediga'); await app.settle(); return app.text('p'); })()",
        expected: 'Hämtningen måste vara efter lämningen',
      },
    ],
    preview: '<App />',
    backend: TASSEN_LEDIGA,
  },
};
