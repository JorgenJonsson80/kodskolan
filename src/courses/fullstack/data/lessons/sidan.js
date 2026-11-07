import { TASSEN_API } from '../files';

// Bana 2: sidan. Eleven skriver App.tsx mot det färdiga API:t
// (backend, TASSEN_API). Testerna kör sidan mot Flask-appen på riktigt.
export const SIDAN = [
  {
    id: 'sidan-01',
    track: 'sidan',
    lang: 'tsx',
    title: 'Typen för en hund',
    xp: 10,
    description:
      'Nu byter vi fil. API:t är klart (📄 app.py ovanför editorn), och du skriver sidan i TypeScript. Först: vad svarar API:t med?',
    explain:
      '`GET /api/hundar` svarar med en lista: `[{"id": 1, "namn": "Bamse", "storlek": "stor"}, …]`. Det står i app.py, men TypeScript kan inte läsa Python. Därför skriver du en typ med samma form.\n\n`svar.json()` ger `any`, alltså vad som helst. Med returtypen `Promise<Hund[]>` lovar funktionen resten av sidan att det är hundar. Stämmer typen med API:t får du hjälp överallt där hundarna används.',
    example:
      "type Bok = { id: number; titel: string };\n\nasync function hamtaBocker(): Promise<Bok[]> {\n  const svar = await fetch('/api/bocker');\n  return svar.json();\n}",
    task: 'Uppgift: Skriv typen `Hund` (`id`, `namn`, `storlek`) och `hamtaHundar()`, som hämtar `/api/hundar`.',
    starterCode:
      '// API:t svarar på GET /api/hundar med:\n// [{ "id": 1, "namn": "Bamse", "storlek": "stor" }, …]\n',
    solution:
      "type Hund = { id: number; namn: string; storlek: string };\n\nasync function hamtaHundar(): Promise<Hund[]> {\n  const svar = await fetch('/api/hundar');\n  return svar.json();\n}\n",
    hints: [
      'type Hund = { id: number; namn: string; storlek: string };',
      'async function hamtaHundar(): Promise<Hund[]> {',
      "const svar = await fetch('/api/hundar');\nreturn svar.json();",
    ],
    tests: [
      {
        description: 'Hundarna från API:t',
        code: 'hamtaHundar().then(h => h.map(x => x.namn))',
        expected: ['Bamse', 'Pixel', 'Saga'],
      },
    ],
    typeTests: [
      {
        description: 'En Hund har namn',
        code: 'hamtaHundar().then(h => h[0].namn.toUpperCase());',
      },
      {
        description: 'id är ett tal',
        code: 'hamtaHundar().then(h => h[0].id + 1);',
      },
      {
        description: 'API:t har inget pris',
        code: 'hamtaHundar().then(h => h[0].pris);',
        fails: true,
      },
    ],
    backend: TASSEN_API,
  },
  {
    id: 'sidan-02',
    track: 'sidan',
    lang: 'tsx',
    title: 'Lista hundarna',
    xp: 15,
    description: 'Sidan ska visa hundarna så fort den öppnas.',
    explain:
      '`useEffect` med en tom lista `[]` körs en gång, när komponenten visas. Där hämtar du från API:t och sparar svaret i state. Då ritas sidan om med hundarna.\n\nAnropet går till Flask-appen i app.py på riktigt, både i testerna och i förhandsvisningen.',
    example:
      "useEffect(() => {\n  fetch('/api/bocker')\n    .then(svar => svar.json())\n    .then(setBocker);\n}, []);",
    task: 'Uppgift: Hämta `/api/hundar` i en `useEffect` och visa varje hunds namn i ett `<li>`.',
    starterCode:
      "import { useEffect, useState } from 'react';\n\ntype Hund = { id: number; namn: string; storlek: string };\n\nexport default function App() {\n  const [hundar, setHundar] = useState<Hund[]>([]);\n\n  // Hämta /api/hundar en gång, när sidan visas.\n\n  return <ul></ul>;\n}\n",
    solution:
      "import { useEffect, useState } from 'react';\n\ntype Hund = { id: number; namn: string; storlek: string };\n\nexport default function App() {\n  const [hundar, setHundar] = useState<Hund[]>([]);\n\n  useEffect(() => {\n    fetch('/api/hundar')\n      .then(svar => svar.json())\n      .then(setHundar);\n  }, []);\n\n  return (\n    <ul>\n      {hundar.map(h => (\n        <li key={h.id}>{h.namn}</li>\n      ))}\n    </ul>\n  );\n}\n",
    hints: [
      'useEffect(() => { … }, []);',
      "fetch('/api/hundar').then(svar => svar.json()).then(setHundar);",
      '{hundar.map(h => (\n  <li key={h.id}>{h.namn}</li>\n))}',
    ],
    tests: [
      {
        description: 'Tre hundar',
        code: "(async () => { const app = __mount(<App />); await app.settle(); return app.count('li'); })()",
        expected: 3,
      },
      {
        description: 'Bamse först',
        code: "(async () => { const app = __mount(<App />); await app.settle(); return app.text('li'); })()",
        expected: 'Bamse',
      },
    ],
    preview: '<App />',
    backend: TASSEN_API,
  },
  {
    id: 'sidan-03',
    track: 'sidan',
    lang: 'tsx',
    title: 'Laddar…',
    xp: 15,
    description:
      'Ett anrop tar tid. Sidan ska visa att den hämtar, i stället för en tom lista.',
    explain:
      'Innan svaret kommit finns det inga hundar alls – det är inte samma sak som en tom lista. Med typen `Hund[] | null` och startvärdet `null` syns skillnaden, och TypeScript kräver att du tar hand om `null` innan du använder `map`.',
    example: 'if (!bocker) return <p>Laddar…</p>;',
    task: 'Uppgift: Starta med `null` och visa `<p>Laddar…</p>` tills hundarna kommit.',
    starterCode:
      "import { useEffect, useState } from 'react';\n\ntype Hund = { id: number; namn: string; storlek: string };\n\nexport default function App() {\n  const [hundar, setHundar] = useState<Hund[]>([]);\n\n  useEffect(() => {\n    fetch('/api/hundar')\n      .then(svar => svar.json())\n      .then(setHundar);\n  }, []);\n\n  return (\n    <ul>\n      {hundar.map(h => (\n        <li key={h.id}>{h.namn}</li>\n      ))}\n    </ul>\n  );\n}\n",
    solution:
      "import { useEffect, useState } from 'react';\n\ntype Hund = { id: number; namn: string; storlek: string };\n\nexport default function App() {\n  const [hundar, setHundar] = useState<Hund[] | null>(null);\n\n  useEffect(() => {\n    fetch('/api/hundar')\n      .then(svar => svar.json())\n      .then(setHundar);\n  }, []);\n\n  if (!hundar) return <p>Laddar…</p>;\n  return (\n    <ul>\n      {hundar.map(h => (\n        <li key={h.id}>{h.namn}</li>\n      ))}\n    </ul>\n  );\n}\n",
    hints: [
      'useState<Hund[] | null>(null)',
      'if (!hundar) return <p>Laddar…</p>;',
      'Efter if-satsen vet TypeScript att hundar är en lista.',
    ],
    tests: [
      {
        description: 'Laddar först',
        code: '__mount(<App />).text()',
        expected: 'Laddar…',
      },
      {
        description: 'Sedan hundarna',
        code: "(async () => { const app = __mount(<App />); await app.settle(); return app.count('li'); })()",
        expected: 3,
      },
      {
        description: 'Laddar… försvinner',
        code: "(async () => { const app = __mount(<App />); await app.settle(); return app.text().includes('Laddar'); })()",
        expected: false,
      },
    ],
    preview: '<App />',
    backend: TASSEN_API,
  },
  {
    id: 'sidan-04',
    track: 'sidan',
    lang: 'tsx',
    title: 'En hund och ett fel',
    xp: 20,
    description:
      'Kortet visar en hund. Finns den inte svarar API:t 404 med `{"fel": "Ingen sådan hund"}` – det ska synas.',
    explain:
      '`fetch` blir inte fel för 404 eller 400. Svaret kommer som vanligt, men `svar.ok` är `false`. Därför måste sidan själv kolla `svar.ok`.\n\nAPI:t svarar med JSON även vid fel (det var därför du skrev `felsvar` i app.py), så `data.fel` är texten att visa.\n\nMed `[id]` i useEffect hämtas hunden igen om kortet får ett annat id.',
    example:
      'fetch(`/api/bocker/${id}`).then(async svar => {\n  const data = await svar.json();\n  if (svar.ok) {\n    setBok(data);\n  } else {\n    setFel(data.fel);\n  }\n});',
    task: 'Uppgift: `HundKort` hämtar `/api/hundar/<id>` och visar `Saga är liten` – eller felet från API:t.',
    starterCode:
      "import { useEffect, useState } from 'react';\n\ntype Hund = { id: number; namn: string; storlek: string };\n\nfunction HundKort({ id }: { id: number }) {\n  const [hund, setHund] = useState<Hund | null>(null);\n  const [fel, setFel] = useState('');\n\n  // Hämta /api/hundar/<id>. Är svaret inte ok, visa felet från API:t.\n\n  return <p>Laddar…</p>;\n}\n\nexport default function App() {\n  return (\n    <>\n      <HundKort id={2} />\n      <HundKort id={99} />\n    </>\n  );\n}\n",
    solution:
      "import { useEffect, useState } from 'react';\n\ntype Hund = { id: number; namn: string; storlek: string };\n\nfunction HundKort({ id }: { id: number }) {\n  const [hund, setHund] = useState<Hund | null>(null);\n  const [fel, setFel] = useState('');\n\n  useEffect(() => {\n    fetch(`/api/hundar/${id}`).then(async svar => {\n      const data = await svar.json();\n      if (svar.ok) {\n        setHund(data);\n      } else {\n        setFel(data.fel);\n      }\n    });\n  }, [id]);\n\n  if (fel) return <p>{fel}</p>;\n  if (!hund) return <p>Laddar…</p>;\n  return (\n    <p>\n      {hund.namn} är {hund.storlek}\n    </p>\n  );\n}\n\nexport default function App() {\n  return (\n    <>\n      <HundKort id={2} />\n      <HundKort id={99} />\n    </>\n  );\n}\n",
    hints: [
      'useEffect(() => { … }, [id]);',
      'if (svar.ok) { setHund(data); } else { setFel(data.fel); }',
      'if (fel) return <p>{fel}</p>;',
    ],
    tests: [
      {
        description: 'Saga',
        code: '(async () => { const app = __mount(<HundKort id={2} />); await app.settle(); return app.text(); })()',
        expected: 'Saga är liten',
      },
      {
        description: 'Bamse',
        code: '(async () => { const app = __mount(<HundKort id={1} />); await app.settle(); return app.text(); })()',
        expected: 'Bamse är stor',
      },
      {
        description: 'Felet från API:t',
        code: '(async () => { const app = __mount(<HundKort id={99} />); await app.settle(); return app.text(); })()',
        expected: 'Ingen sådan hund',
      },
    ],
    preview: '<App />',
    backend: TASSEN_API,
  },
  {
    id: 'sidan-05',
    track: 'sidan',
    lang: 'tsx',
    title: 'Boka',
    xp: 20,
    description:
      'Formuläret ska skicka bokningen till API:t och visa bokningsnumret.',
    explain:
      'Med ett andra argument till `fetch` blir det ett POST: `method`, `headers` och `body`. `body` är text, så objektet görs om med `JSON.stringify`. `Content-Type` säger till Flask att det är JSON, så att `request.get_json()` fungerar.\n\nTitta i 📄 app.py: API:t vill ha `hund_id`, `fran` och `till`, och svarar med bokningen och dess `id`.',
    example:
      "const svar = await fetch('/api/bocker', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ titel }),\n});\nconst data = await svar.json();",
    task: 'Uppgift: `skicka` gör POST till `/api/bokningar` med `hund_id`, `fran` och `till`, och visar `Bokad! Bokning nr 1`.',
    starterCode:
      "import { useState } from 'react';\n\nfunction Boka({ hundId }: { hundId: number }) {\n  const [fran, setFran] = useState('');\n  const [till, setTill] = useState('');\n  const [besked, setBesked] = useState('');\n\n  async function skicka(e: { preventDefault(): void }) {\n    e.preventDefault();\n    // Skicka bokningen till POST /api/bokningar och visa numret.\n  }\n\n  return (\n    <form onSubmit={skicka}>\n      <input value={fran} onChange={e => setFran(e.target.value)} />\n      <input value={till} onChange={e => setTill(e.target.value)} />\n      <button>Boka</button>\n      {besked && <p>{besked}</p>}\n    </form>\n  );\n}\n\nexport default function App() {\n  return <Boka hundId={1} />;\n}\n",
    solution:
      "import { useState } from 'react';\n\nfunction Boka({ hundId }: { hundId: number }) {\n  const [fran, setFran] = useState('');\n  const [till, setTill] = useState('');\n  const [besked, setBesked] = useState('');\n\n  async function skicka(e: { preventDefault(): void }) {\n    e.preventDefault();\n    const svar = await fetch('/api/bokningar', {\n      method: 'POST',\n      headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify({ hund_id: hundId, fran, till }),\n    });\n    const data = await svar.json();\n    setBesked(`Bokad! Bokning nr ${data.id}`);\n  }\n\n  return (\n    <form onSubmit={skicka}>\n      <input value={fran} onChange={e => setFran(e.target.value)} />\n      <input value={till} onChange={e => setTill(e.target.value)} />\n      <button>Boka</button>\n      {besked && <p>{besked}</p>}\n    </form>\n  );\n}\n\nexport default function App() {\n  return <Boka hundId={1} />;\n}\n",
    hints: [
      "await fetch('/api/bokningar', { method: 'POST', … })",
      'body: JSON.stringify({ hund_id: hundId, fran, till })',
      'setBesked(`Bokad! Bokning nr ${data.id}`);',
    ],
    tests: [
      {
        description: 'Bokad',
        code: "(async () => { const app = __mount(<Boka hundId={1} />); app.type('2026-12-01', 0); app.type('2026-12-03', 1); app.submit(); await app.settle(); return app.text('p'); })()",
        expected: 'Bokad! Bokning nr 1',
      },
      {
        description: 'Bokningen finns i API:t',
        code: "(async () => { const app = __mount(<Boka hundId={3} />); app.type('2026-12-01', 0); app.type('2026-12-03', 1); app.submit(); await app.settle(); await fetch('/api/logga-in', { method: 'POST', body: JSON.stringify({ kod: 'tassen2026' }) }); const lista = await (await fetch('/api/bokningar')).json(); return lista.map(b => [b.id, b.hund, b.fran, b.till]); })()",
        expected: [[1, 'Pixel', '2026-12-01', '2026-12-03']],
      },
    ],
    preview: '<App />',
    backend: TASSEN_API,
  },
  {
    id: 'sidan-06',
    track: 'sidan',
    lang: 'tsx',
    title: 'Visa felet',
    xp: 20,
    description:
      'Boka samma dagar två gånger i förhandsvisningen. "Bokad! Bokning nr undefined" – API:t sa nej, men sidan lyssnade inte.',
    explain:
      'Ett nej från API:t är en del av sidan, inte ett undantag. Ett 409 betyder att hunden är upptagen och ett 400 att datumen är fel. Båda har en förklaring i `data.fel`, skriven för att visas.\n\nSå bestämmer API:t vad som är tillåtet, och sidan visar vad det sa. Kontrollen finns på ett ställe.',
    example: 'setBesked(svar.ok ? `Sparad som nr ${data.id}` : data.fel);',
    task: 'Uppgift: Är svaret inte ok, visa `data.fel` i stället för bokningsnumret.',
    starterCode:
      "import { useState } from 'react';\n\nfunction Boka({ hundId }: { hundId: number }) {\n  const [fran, setFran] = useState('');\n  const [till, setTill] = useState('');\n  const [besked, setBesked] = useState('');\n\n  async function skicka(e: { preventDefault(): void }) {\n    e.preventDefault();\n    const svar = await fetch('/api/bokningar', {\n      method: 'POST',\n      headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify({ hund_id: hundId, fran, till }),\n    });\n    const data = await svar.json();\n    setBesked(`Bokad! Bokning nr ${data.id}`);\n  }\n\n  return (\n    <form onSubmit={skicka}>\n      <input value={fran} onChange={e => setFran(e.target.value)} />\n      <input value={till} onChange={e => setTill(e.target.value)} />\n      <button>Boka</button>\n      {besked && <p>{besked}</p>}\n    </form>\n  );\n}\n\nexport default function App() {\n  return <Boka hundId={1} />;\n}\n",
    solution:
      "import { useState } from 'react';\n\nfunction Boka({ hundId }: { hundId: number }) {\n  const [fran, setFran] = useState('');\n  const [till, setTill] = useState('');\n  const [besked, setBesked] = useState('');\n\n  async function skicka(e: { preventDefault(): void }) {\n    e.preventDefault();\n    const svar = await fetch('/api/bokningar', {\n      method: 'POST',\n      headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify({ hund_id: hundId, fran, till }),\n    });\n    const data = await svar.json();\n    setBesked(svar.ok ? `Bokad! Bokning nr ${data.id}` : data.fel);\n  }\n\n  return (\n    <form onSubmit={skicka}>\n      <input value={fran} onChange={e => setFran(e.target.value)} />\n      <input value={till} onChange={e => setTill(e.target.value)} />\n      <button>Boka</button>\n      {besked && <p>{besked}</p>}\n    </form>\n  );\n}\n\nexport default function App() {\n  return <Boka hundId={1} />;\n}\n",
    hints: [
      'Kolla svar.ok innan du visar numret.',
      'svar.ok ? … : data.fel',
      'setBesked(svar.ok ? `Bokad! Bokning nr ${data.id}` : data.fel);',
    ],
    tests: [
      {
        description: 'Redan bokad',
        code: "(async () => { const app = __mount(<Boka hundId={1} />); app.type('2026-12-01', 0); app.type('2026-12-03', 1); app.submit(); await app.settle(); app.submit(); await app.settle(); return app.text('p'); })()",
        expected: 'Hunden är redan bokad då',
      },
      {
        description: 'Fel ordning',
        code: "(async () => { const app = __mount(<Boka hundId={1} />); app.type('2026-12-05', 0); app.type('2026-12-01', 1); app.submit(); await app.settle(); return app.text('p'); })()",
        expected: 'Hämtningen måste vara efter lämningen',
      },
      {
        description: 'En vanlig bokning',
        code: "(async () => { const app = __mount(<Boka hundId={2} />); app.type('2026-12-01', 0); app.type('2026-12-03', 1); app.submit(); await app.settle(); return app.text('p'); })()",
        expected: 'Bokad! Bokning nr 1',
      },
    ],
    preview: '<App />',
    backend: TASSEN_API,
  },
];
