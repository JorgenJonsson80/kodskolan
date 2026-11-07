// React-banorna som kom till efter JS Academy: formulär, useReducer,
// Context, egna hooks, prestanda och ett slutprojekt. lesson.js lägger dem
// sist. Samma format och samma rättning som de andra React-banorna.
export const reactLessons = [
  {
    id: 'forms-01',
    title: 'Ett kontrollerat fält',
    xp: 10,
    track: 'forms',
    isBoss: false,
    description:
      'Ett kontrollerat fält får sitt värde från state: value={name}. Varje tangent anropar onChange, som sparar det nya värdet med setName(event.target.value). Då vet React alltid vad som står i fältet.',
    task: 'Uppgift: Skriv `Greeting` med ett kontrollerat `input` för `name` (börjar tomt) och en `p` som visar `Hej NAME!`.',
    fileName: 'App.jsx',
    preview: '<Greeting />',
    starterCode: "import { useState } from 'react';\n\n",
    solution:
      "import { useState } from 'react';\n\nfunction Greeting() {\n  const [name, setName] = useState('');\n  return (\n    <div>\n      <input value={name} onChange={event => setName(event.target.value)} />\n      <p>Hej {name}!</p>\n    </div>\n  );\n}",
    hints: [
      "const [name, setName] = useState('');",
      'value={name} och onChange={event => setName(event.target.value)}',
      '<p>Hej {name}!</p>',
    ],
    tests: [
      {
        description: 'Tom från början',
        code: "__mount(<Greeting />).text('p')",
        expected: 'Hej !',
      },
      {
        description: 'Skriver Ada',
        code: "__mount(<Greeting />).type('Ada').text('p')",
        expected: 'Hej Ada!',
      },
    ],
    sourceChecks: [
      { description: 'Fältet har value', pattern: /value=\{name\}/ },
    ],
  },
  {
    id: 'forms-02',
    title: 'Skicka formuläret',
    xp: 10,
    track: 'forms',
    isBoss: false,
    description:
      'Ett form skickas när man trycker Enter eller på en knapp i det. Webbläsaren laddar då om sidan, så första raden i handleSubmit är event.preventDefault().',
    task: 'Uppgift: `NameForm` har ett fält. När formuläret skickas ska `p` visa `Skickat: NAME`. Innan dess är `p` tom.',
    fileName: 'App.jsx',
    preview: '<NameForm />',
    starterCode:
      "import { useState } from 'react';\n\nfunction NameForm() {\n  const [name, setName] = useState('');\n  const [sent, setSent] = useState('');\n\n  return (\n    <form>\n      <input value={name} onChange={event => setName(event.target.value)} />\n      <button>Skicka</button>\n      <p>{sent}</p>\n    </form>\n  );\n}",
    solution:
      "import { useState } from 'react';\n\nfunction NameForm() {\n  const [name, setName] = useState('');\n  const [sent, setSent] = useState('');\n\n  function handleSubmit(event) {\n    event.preventDefault();\n    setSent(`Skickat: ${name}`);\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={name} onChange={event => setName(event.target.value)} />\n      <button>Skicka</button>\n      <p>{sent}</p>\n    </form>\n  );\n}",
    hints: [
      'Skriv function handleSubmit(event) { … }.',
      'event.preventDefault() först.',
      '<form onSubmit={handleSubmit}>',
    ],
    tests: [
      {
        description: 'Stoppar omladdningen',
        code: "__mount(<NameForm />).type('Ada').submit()",
        expected: true,
      },
      {
        description: 'Visar det skickade',
        code: "(() => { const app = __mount(<NameForm />); app.type('Ada'); app.submit(); return app.text('p'); })()",
        expected: 'Skickat: Ada',
      },
    ],
  },
  {
    id: 'forms-03',
    title: 'Flera fält i ett state',
    xp: 15,
    track: 'forms',
    isBoss: false,
    description:
      "Med många fält blir det många useState. Ett objekt räcker: useState({ name: '', email: '' }). Ge varje input ett name, så kan en enda handleChange uppdatera rätt fält: setForm({ ...form, [event.target.name]: event.target.value }).",
    task: 'Uppgift: `SignUp` har `form` med `name` och `email`, två fält med `name="name"` och `name="email"`, och en `handleChange` för båda. En `p` visar `NAME <EMAIL>`.',
    fileName: 'App.jsx',
    preview: '<SignUp />',
    starterCode: "import { useState } from 'react';\n\n",
    solution:
      "import { useState } from 'react';\n\nfunction SignUp() {\n  const [form, setForm] = useState({ name: '', email: '' });\n\n  function handleChange(event) {\n    setForm({ ...form, [event.target.name]: event.target.value });\n  }\n\n  return (\n    <div>\n      <input name=\"name\" value={form.name} onChange={handleChange} />\n      <input name=\"email\" value={form.email} onChange={handleChange} />\n      <p>\n        {form.name} &lt;{form.email}&gt;\n      </p>\n    </div>\n  );\n}",
    hints: [
      "useState({ name: '', email: '' })",
      'setForm({ ...form, [event.target.name]: event.target.value })',
      'Båda fälten har onChange={handleChange}.',
    ],
    tests: [
      {
        description: 'Båda fälten',
        code: "(() => { const app = __mount(<SignUp />); app.type('Ada', 0); app.type('ada@exempel.se', 1); return app.text('p'); })()",
        expected: 'Ada <ada@exempel.se>',
      },
    ],
    sourceChecks: [
      { description: 'En handleChange', pattern: /\[event\.target\.name\]/ },
    ],
  },
  {
    id: 'forms-04',
    title: 'Kryssrutan',
    xp: 10,
    track: 'forms',
    isBoss: false,
    description:
      'En kryssruta har inget value att läsa, utan checked: checked={accepted} och onChange={event => setAccepted(event.target.checked)}.',
    task: 'Uppgift: `Terms` har en kryssruta för `accepted` (börjar false) och en `p` som visar `Godkänt` eller `Inte godkänt`.',
    fileName: 'App.jsx',
    preview: '<Terms />',
    starterCode: "import { useState } from 'react';\n\n",
    solution:
      "import { useState } from 'react';\n\nfunction Terms() {\n  const [accepted, setAccepted] = useState(false);\n  return (\n    <div>\n      <input\n        type=\"checkbox\"\n        checked={accepted}\n        onChange={event => setAccepted(event.target.checked)}\n      />\n      <p>{accepted ? 'Godkänt' : 'Inte godkänt'}</p>\n    </div>\n  );\n}",
    hints: ['type="checkbox"', 'checked={accepted}', 'event.target.checked'],
    tests: [
      {
        description: 'Inte godkänt först',
        code: "__mount(<Terms />).text('p')",
        expected: 'Inte godkänt',
      },
      {
        description: 'Kryssa i',
        code: "__mount(<Terms />).check().text('p')",
        expected: 'Godkänt',
      },
      {
        description: 'Kryssa ur igen',
        code: "__mount(<Terms />).check().check().text('p')",
        expected: 'Inte godkänt',
      },
    ],
  },
  {
    id: 'forms-05',
    title: 'En rullista',
    xp: 10,
    track: 'forms',
    isBoss: false,
    description:
      'En select fungerar som ett input: value={size} och onChange med event.target.value. Alternativen står i option-element.',
    task: 'Uppgift: `SizePicker` har en `select` med `liten`, `mellan` och `stor` (börjar på `mellan`) och en `p` som visar `Storlek: SIZE`.',
    fileName: 'App.jsx',
    preview: '<SizePicker />',
    starterCode: "import { useState } from 'react';\n\n",
    solution:
      'import { useState } from \'react\';\n\nfunction SizePicker() {\n  const [size, setSize] = useState(\'mellan\');\n  return (\n    <div>\n      <select value={size} onChange={event => setSize(event.target.value)}>\n        <option value="liten">Liten</option>\n        <option value="mellan">Mellan</option>\n        <option value="stor">Stor</option>\n      </select>\n      <p>Storlek: {size}</p>\n    </div>\n  );\n}',
    hints: [
      "useState('mellan')",
      '<select value={size} onChange={…}>',
      '<option value="liten">Liten</option>',
    ],
    tests: [
      {
        description: 'Mellan först',
        code: "__mount(<SizePicker />).text('p')",
        expected: 'Storlek: mellan',
      },
      {
        description: 'Välj stor',
        code: "__mount(<SizePicker />).type('stor').text('p')",
        expected: 'Storlek: stor',
      },
      {
        description: 'Tre alternativ',
        code: "__mount(<SizePicker />).count('option')",
        expected: 3,
      },
    ],
  },
  {
    id: 'forms-06',
    title: 'Visa ett fel',
    xp: 15,
    track: 'forms',
    isBoss: false,
    description:
      'Kontrollera fälten när formuläret skickas. Spara felet i state och visa det, och skicka bara när allt stämmer.',
    task: 'Uppgift: Skickas `NameForm` med tomt namn ska `p.error` visa `Skriv ditt namn`. Annars visar `p` `Skickat: NAME` (utan fel).',
    fileName: 'App.jsx',
    preview: '<NameForm />',
    starterCode:
      "import { useState } from 'react';\n\nfunction NameForm() {\n  const [name, setName] = useState('');\n  const [sent, setSent] = useState('');\n\n  function handleSubmit(event) {\n    event.preventDefault();\n    setSent(`Skickat: ${name}`);\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={name} onChange={event => setName(event.target.value)} />\n      <button>Skicka</button>\n      <p>{sent}</p>\n    </form>\n  );\n}",
    solution:
      "import { useState } from 'react';\n\nfunction NameForm() {\n  const [name, setName] = useState('');\n  const [sent, setSent] = useState('');\n  const [error, setError] = useState('');\n\n  function handleSubmit(event) {\n    event.preventDefault();\n    if (name.trim() === '') {\n      setError('Skriv ditt namn');\n      return;\n    }\n    setError('');\n    setSent(`Skickat: ${name}`);\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={name} onChange={event => setName(event.target.value)} />\n      <button>Skicka</button>\n      {error && <p className=\"error\">{error}</p>}\n      <p>{sent}</p>\n    </form>\n  );\n}",
    hints: [
      "const [error, setError] = useState('');",
      "if (name.trim() === '') { setError('Skriv ditt namn'); return; }",
      '{error && <p className="error">{error}</p>}',
    ],
    tests: [
      {
        description: 'Tomt namn',
        code: '(() => { const app = __mount(<NameForm />); app.submit(); return app.html().includes(\'<p class="error">Skriv ditt namn</p>\'); })()',
        expected: true,
      },
      {
        description: 'Med namn',
        code: "(() => { const app = __mount(<NameForm />); app.type('Ada'); app.submit(); return [app.count('p'), app.text('p')]; })()",
        expected: [1, 'Skickat: Ada'],
      },
    ],
  },
  {
    id: 'forms-07',
    title: 'Knappen som väntar',
    xp: 10,
    track: 'forms',
    isBoss: false,
    description:
      'Ibland är det tydligare att inte låta någon skicka alls förrän allt är ifyllt. disabled={!isValid} gör knappen grå. isValid räknas ut från state vid varje rendering.',
    task: 'Uppgift: `Login` har fälten `email` och `password`. Knappen `Logga in` är `disabled` tills e-posten innehåller `@` och lösenordet har minst 8 tecken.',
    fileName: 'App.jsx',
    preview: '<Login />',
    starterCode: "import { useState } from 'react';\n\n",
    solution:
      "import { useState } from 'react';\n\nfunction Login() {\n  const [email, setEmail] = useState('');\n  const [password, setPassword] = useState('');\n  const isValid = email.includes('@') && password.length >= 8;\n\n  return (\n    <form>\n      <input value={email} onChange={event => setEmail(event.target.value)} />\n      <input\n        type=\"password\"\n        value={password}\n        onChange={event => setPassword(event.target.value)}\n      />\n      <button disabled={!isValid}>Logga in</button>\n    </form>\n  );\n}",
    hints: [
      "const isValid = email.includes('@') && password.length >= 8;",
      'Räkna ut isValid i komponenten, inte i state.',
      '<button disabled={!isValid}>Logga in</button>',
    ],
    tests: [
      {
        description: 'Disabled först',
        code: '__mount(<Login />).html().includes(\'<button disabled="">\')',
        expected: true,
      },
      {
        description: 'Kort lösenord',
        code: "(() => { const app = __mount(<Login />); app.type('a@b.se', 0); app.type('kort', 1); return app.html().includes('<button disabled=\"\">'); })()",
        expected: true,
      },
      {
        description: 'Allt rätt',
        code: "(() => { const app = __mount(<Login />); app.type('a@b.se', 0); app.type('hemligt123', 1); return app.html().includes('<button>Logga in</button>'); })()",
        expected: true,
      },
    ],
  },
  {
    id: 'forms-08',
    title: 'Töm efter att det skickats',
    xp: 10,
    track: 'forms',
    isBoss: false,
    description:
      "Efter att formuläret skickats ska fältet bli tomt igen. Eftersom fältet är kontrollerat räcker det att sätta state: setText('').",
    task: 'Uppgift: Laga `NoteForm` så att fältet töms efter att anteckningen sparats.',
    fileName: 'App.jsx',
    preview: '<NoteForm />',
    starterCode:
      "import { useState } from 'react';\n\nfunction NoteForm() {\n  const [text, setText] = useState('');\n  const [notes, setNotes] = useState([]);\n\n  function handleSubmit(event) {\n    event.preventDefault();\n    setNotes([...notes, text]);\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={text} onChange={event => setText(event.target.value)} />\n      <button>Spara</button>\n      <p>{notes.length} anteckningar</p>\n    </form>\n  );\n}",
    solution:
      "import { useState } from 'react';\n\nfunction NoteForm() {\n  const [text, setText] = useState('');\n  const [notes, setNotes] = useState([]);\n\n  function handleSubmit(event) {\n    event.preventDefault();\n    setNotes([...notes, text]);\n    setText('');\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={text} onChange={event => setText(event.target.value)} />\n      <button>Spara</button>\n      <p>{notes.length} anteckningar</p>\n    </form>\n  );\n}",
    hints: [
      'Vad står i text efter att den sparats?',
      'Sätt text till en tom sträng.',
      "setText(''); efter setNotes.",
    ],
    tests: [
      {
        description: 'Fältet töms',
        code: "(() => { const app = __mount(<NoteForm />); app.type('Handla'); app.submit(); return app.html().includes('value=\"\"'); })()",
        expected: true,
      },
      {
        description: 'Sparas',
        code: "(() => { const app = __mount(<NoteForm />); app.type('A'); app.submit(); app.type('B'); app.submit(); return app.text('p'); })()",
        expected: '2 anteckningar',
      },
    ],
  },
  {
    id: 'forms-09',
    title: 'Från formulär till lista',
    xp: 15,
    track: 'forms',
    isBoss: false,
    description:
      'Det som skickas i ett formulär hamnar ofta i en lista. Ge varje rad ett id, t.ex. med crypto.randomUUID(), så att keys blir unika.',
    task: 'Uppgift: `Guestbook` har fälten `name` och `message`. När formuläret skickas läggs `{ id, name, message }` till i listan, fälten töms, och varje inlägg visas som `<li>NAME: MESSAGE</li>`.',
    fileName: 'App.jsx',
    preview: '<Guestbook />',
    starterCode: "import { useState } from 'react';\n\n",
    solution:
      "import { useState } from 'react';\n\nfunction Guestbook() {\n  const [form, setForm] = useState({ name: '', message: '' });\n  const [posts, setPosts] = useState([]);\n\n  function handleChange(event) {\n    setForm({ ...form, [event.target.name]: event.target.value });\n  }\n\n  function handleSubmit(event) {\n    event.preventDefault();\n    setPosts([...posts, { id: crypto.randomUUID(), ...form }]);\n    setForm({ name: '', message: '' });\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input name=\"name\" value={form.name} onChange={handleChange} />\n      <input name=\"message\" value={form.message} onChange={handleChange} />\n      <button>Skriv</button>\n      <ul>\n        {posts.map(post => (\n          <li key={post.id}>\n            {post.name}: {post.message}\n          </li>\n        ))}\n      </ul>\n    </form>\n  );\n}",
    hints: [
      'Ett form-objekt med name och message, som i övning 3.',
      '{ id: crypto.randomUUID(), ...form }',
      '<li key={post.id}>',
    ],
    tests: [
      {
        description: 'Två inlägg',
        code: "(() => { const app = __mount(<Guestbook />); app.type('Ada', 0); app.type('Hej', 1); app.submit(); app.type('Bo', 0); app.type('Tjena', 1); app.submit(); return [app.count('li'), app.text('li')]; })()",
        expected: [2, 'Ada: Hej'],
      },
      {
        description: 'Unika keys',
        code: "(() => { const app = __mount(<Guestbook />); app.type('A', 0); app.submit(); app.type('A', 0); app.submit(); return __keyProblems; })()",
        expected: [],
      },
      {
        description: 'Fälten töms',
        code: '(() => { const app = __mount(<Guestbook />); app.type(\'Ada\', 0); app.submit(); return app.html().includes(\'name="name" value=""\'); })()',
        expected: true,
      },
    ],
  },
  {
    id: 'forms-boss-01',
    title: 'Boss: Anmälan till hundkursen',
    xp: 30,
    track: 'forms',
    isBoss: true,
    description:
      'Ett helt formulär med flera fält, kontroller och en lista över alla anmälda.',
    task: 'Uppgift: Skriv `Registration`.\n  Fälten: `name` (text), `age` (text som görs om till tal) och kryssrutan `terms`.\n  Vid submit: tomt namn ger felet `Skriv ditt namn`, en ålder under 13 `Du måste vara minst 13`, och ingen bock `Godkänn villkoren`. Felet visas i `p.error`.\n  Utan fel läggs `{ id, name, age }` till i listan, fälten töms och felet försvinner.\n  Listan visar `<li>NAME (AGE år)</li>`.',
    fileName: 'App.jsx',
    preview: '<Registration />',
    starterCode: "import { useState } from 'react';\n\n",
    solution:
      "import { useState } from 'react';\n\nfunction Registration() {\n  const [form, setForm] = useState({ name: '', age: '', terms: false });\n  const [people, setPeople] = useState([]);\n  const [error, setError] = useState('');\n\n  function handleChange(event) {\n    const { name, value, checked, type } = event.target;\n    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });\n  }\n\n  function handleSubmit(event) {\n    event.preventDefault();\n    if (form.name.trim() === '') {\n      setError('Skriv ditt namn');\n    } else if (Number(form.age) < 13) {\n      setError('Du måste vara minst 13');\n    } else if (!form.terms) {\n      setError('Godkänn villkoren');\n    } else {\n      setPeople([\n        ...people,\n        { id: crypto.randomUUID(), name: form.name, age: Number(form.age) },\n      ]);\n      setForm({ name: '', age: '', terms: false });\n      setError('');\n    }\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input name=\"name\" value={form.name} onChange={handleChange} />\n      <input name=\"age\" value={form.age} onChange={handleChange} />\n      <input\n        name=\"terms\"\n        type=\"checkbox\"\n        checked={form.terms}\n        onChange={handleChange}\n      />\n      <button>Anmäl</button>\n      {error && <p className=\"error\">{error}</p>}\n      <ul>\n        {people.map(person => (\n          <li key={person.id}>\n            {person.name} ({person.age} år)\n          </li>\n        ))}\n      </ul>\n    </form>\n  );\n}",
    hints: [],
    tests: [
      {
        description: 'Tomt namn',
        code: "(() => { const app = __mount(<Registration />); app.submit(); return app.text('p'); })()",
        expected: 'Skriv ditt namn',
      },
      {
        description: 'För ung',
        code: "(() => { const app = __mount(<Registration />); app.type('Ada', 0); app.type('9', 1); app.check(2); app.submit(); return app.text('p'); })()",
        expected: 'Du måste vara minst 13',
      },
      {
        description: 'Inga villkor',
        code: "(() => { const app = __mount(<Registration />); app.type('Ada', 0); app.type('15', 1); app.submit(); return app.text('p'); })()",
        expected: 'Godkänn villkoren',
      },
      {
        description: 'Anmäld',
        code: "(() => { const app = __mount(<Registration />); app.type('Ada', 0); app.type('15', 1); app.check(2); app.submit(); return [app.count('li'), app.text('li'), app.count('p')]; })()",
        expected: [1, 'Ada (15 år)', 0],
      },
      {
        description: 'Fälten töms',
        code: "(() => { const app = __mount(<Registration />); app.type('Ada', 0); app.type('15', 1); app.check(2); app.submit(); return app.html().includes('name=\"name\" value=\"\"'); })()",
        expected: true,
      },
    ],
  },
  {
    id: 'reducer-01',
    title: 'En reducer',
    xp: 10,
    track: 'reducer',
    isBoss: false,
    description:
      "En reducer är en vanlig funktion: (state, action) => nytt state. action säger vad som hänt, t.ex. { type: 'increment' }. Reducern ändrar aldrig state, den returnerar ett nytt. Okända actions ger tillbaka samma state.",
    task: "Uppgift: Skriv `counterReducer(state, action)`. `'increment'` ger state + 1, `'decrement'` state − 1, och allt annat samma state.",
    fileName: 'App.jsx',
    starterCode: '// Skriv din kod här',
    solution:
      "function counterReducer(state, action) {\n  if (action.type === 'increment') {\n    return state + 1;\n  }\n  if (action.type === 'decrement') {\n    return state - 1;\n  }\n  return state;\n}",
    hints: [
      "if (action.type === 'increment') return state + 1;",
      'Samma för decrement.',
      'Sist: return state;',
    ],
    tests: [
      {
        description: 'increment',
        code: "counterReducer(5, { type: 'increment' })",
        expected: 6,
      },
      {
        description: 'decrement',
        code: "counterReducer(5, { type: 'decrement' })",
        expected: 4,
      },
      {
        description: 'Okänd',
        code: "counterReducer(5, { type: 'hoppa' })",
        expected: 5,
      },
    ],
  },
  {
    id: 'reducer-02',
    title: 'useReducer',
    xp: 10,
    track: 'reducer',
    isBoss: false,
    description:
      "useReducer(reducer, startvärde) ger [state, dispatch]. dispatch({ type: 'increment' }) skickar en action till reducern, och komponenten ritas om med det nya state.",
    task: 'Uppgift: Skriv `Counter` med `useReducer(counterReducer, 0)`, en `p` med värdet och knapparna `+1` och `-1`.',
    fileName: 'App.jsx',
    preview: '<Counter />',
    starterCode:
      "import { useReducer } from 'react';\n\nfunction counterReducer(state, action) {\n  if (action.type === 'increment') {\n    return state + 1;\n  }\n  if (action.type === 'decrement') {\n    return state - 1;\n  }\n  return state;\n}\n",
    solution:
      "import { useReducer } from 'react';\n\nfunction counterReducer(state, action) {\n  if (action.type === 'increment') {\n    return state + 1;\n  }\n  if (action.type === 'decrement') {\n    return state - 1;\n  }\n  return state;\n}\n\nfunction Counter() {\n  const [count, dispatch] = useReducer(counterReducer, 0);\n  return (\n    <div>\n      <p>{count}</p>\n      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>\n      <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>\n    </div>\n  );\n}",
    hints: [
      'const [count, dispatch] = useReducer(counterReducer, 0);',
      "onClick={() => dispatch({ type: 'increment' })}",
      'Två knappar.',
    ],
    tests: [
      {
        description: 'Upp två, ner en',
        code: "__mount(<Counter />).click('+1').click('+1').click('-1').text('p')",
        expected: '1',
      },
    ],
    sourceChecks: [
      {
        description: 'Använder useReducer',
        pattern: /useReducer\(counterReducer/,
      },
    ],
  },
  {
    id: 'reducer-03',
    title: 'Action med data',
    xp: 10,
    track: 'reducer',
    isBoss: false,
    description:
      "En action kan ha mer än type: { type: 'add', amount: 5 }. Reducern läser action.amount.",
    task: "Uppgift: Skriv `walletReducer(state, action)`. `'add'` lägger till `action.amount`, `'spend'` drar ifrån `action.amount` men aldrig under 0.",
    fileName: 'App.jsx',
    starterCode: '// Skriv din kod här',
    solution:
      "function walletReducer(state, action) {\n  if (action.type === 'add') {\n    return state + action.amount;\n  }\n  if (action.type === 'spend') {\n    return Math.max(0, state - action.amount);\n  }\n  return state;\n}",
    hints: [
      'action.amount',
      'Math.max(0, …) stoppar vid 0.',
      'return state; sist.',
    ],
    tests: [
      {
        description: 'add',
        code: "walletReducer(10, { type: 'add', amount: 5 })",
        expected: 15,
      },
      {
        description: 'spend',
        code: "walletReducer(10, { type: 'spend', amount: 4 })",
        expected: 6,
      },
      {
        description: 'För mycket',
        code: "walletReducer(10, { type: 'spend', amount: 40 })",
        expected: 0,
      },
    ],
  },
  {
    id: 'reducer-04',
    title: 'State som objekt',
    xp: 15,
    track: 'reducer',
    isBoss: false,
    description:
      'När state är ett objekt returnerar reducern ett nytt objekt med spread: { ...state, count: state.count + 1 }. Det som inte ändras följer med.',
    task: "Uppgift: Skriv `settingsReducer` för `{ count, step }`. `'setStep'` sätter `step` till `action.step`, och `'increment'` ökar `count` med `step`.",
    fileName: 'App.jsx',
    starterCode: '// Skriv din kod här',
    solution:
      "function settingsReducer(state, action) {\n  if (action.type === 'setStep') {\n    return { ...state, step: action.step };\n  }\n  if (action.type === 'increment') {\n    return { ...state, count: state.count + state.step };\n  }\n  return state;\n}",
    hints: [
      '{ ...state, step: action.step }',
      '{ ...state, count: state.count + state.step }',
      'return state; sist.',
    ],
    tests: [
      {
        description: 'setStep',
        code: "settingsReducer({ count: 0, step: 1 }, { type: 'setStep', step: 5 })",
        expected: { count: 0, step: 5 },
      },
      {
        description: 'increment',
        code: "settingsReducer({ count: 2, step: 5 }, { type: 'increment' })",
        expected: { count: 7, step: 5 },
      },
      {
        description: 'Ändrar inte det gamla',
        code: "(() => { const s = { count: 0, step: 1 }; settingsReducer(s, { type: 'increment' }); return s.count; })()",
        expected: 0,
      },
    ],
  },
  {
    id: 'reducer-05',
    title: 'En lista i reducern',
    xp: 15,
    track: 'reducer',
    isBoss: false,
    description:
      'Reducern är ett bra ställe för allt som ändrar en lista: lägga till, ta bort, bocka av. Samma regler som för state: ny array, aldrig push.',
    task: "Uppgift: Skriv `todoReducer`. `'add'` lägger till `{ id: action.id, text: action.text, done: false }`, och `'remove'` tar bort den med `action.id`.",
    fileName: 'App.jsx',
    starterCode: '// Skriv din kod här',
    solution:
      "function todoReducer(state, action) {\n  if (action.type === 'add') {\n    return [...state, { id: action.id, text: action.text, done: false }];\n  }\n  if (action.type === 'remove') {\n    return state.filter(todo => todo.id !== action.id);\n  }\n  return state;\n}",
    hints: [
      '[...state, { … }]',
      'state.filter(todo => todo.id !== action.id)',
      'return state; sist.',
    ],
    tests: [
      {
        description: 'add',
        code: "todoReducer([], { type: 'add', id: 1, text: 'Handla' })",
        expected: [{ id: 1, text: 'Handla', done: false }],
      },
      {
        description: 'remove',
        code: "todoReducer([{ id: 1 }, { id: 2 }], { type: 'remove', id: 1 })",
        expected: [{ id: 2 }],
      },
      {
        description: 'Ingen push',
        code: "(() => { const s = []; todoReducer(s, { type: 'add', id: 1, text: 'A' }); return s.length; })()",
        expected: 0,
      },
    ],
  },
  {
    id: 'reducer-06',
    title: 'Bocka av',
    xp: 15,
    track: 'reducer',
    isBoss: false,
    description:
      'Att ändra en sak i en lista görs med map: allt utom den ändrade blir kvar som det var.',
    task: "Uppgift: Lägg till `'toggle'` i `todoReducer`, som växlar `done` för den med `action.id`.",
    fileName: 'App.jsx',
    starterCode:
      "function todoReducer(state, action) {\n  if (action.type === 'add') {\n    return [...state, { id: action.id, text: action.text, done: false }];\n  }\n  if (action.type === 'remove') {\n    return state.filter(todo => todo.id !== action.id);\n  }\n  return state;\n}\n",
    solution:
      "function todoReducer(state, action) {\n  if (action.type === 'add') {\n    return [...state, { id: action.id, text: action.text, done: false }];\n  }\n  if (action.type === 'remove') {\n    return state.filter(todo => todo.id !== action.id);\n  }\n  if (action.type === 'toggle') {\n    return state.map(todo =>\n      todo.id === action.id ? { ...todo, done: !todo.done } : todo,\n    );\n  }\n  return state;\n}",
    hints: [
      'state.map(todo => …)',
      'todo.id === action.id ? { ...todo, done: !todo.done } : todo',
      "if (action.type === 'toggle') { … }",
    ],
    tests: [
      {
        description: 'toggle',
        code: "todoReducer([{ id: 1, done: false }, { id: 2, done: false }], { type: 'toggle', id: 2 })",
        expected: [
          { id: 1, done: false },
          { id: 2, done: true },
        ],
      },
    ],
  },
  {
    id: 'reducer-07',
    title: 'Listan i en komponent',
    xp: 15,
    track: 'reducer',
    isBoss: false,
    description:
      'Komponenten skickar bara actions. Allt om hur listan ändras står i reducern, så komponenten blir kort.',
    task: 'Uppgift: Skriv `TodoApp` med `useReducer(todoReducer, [])`, ett formulär som lägger till (`id: crypto.randomUUID()`), och en `li` per uppgift. Klick på en `li` bockar av den, och en klar uppgift får ` ✓` efter texten.',
    fileName: 'App.jsx',
    preview: '<TodoApp />',
    starterCode:
      "import { useReducer } from 'react';\n\nfunction todoReducer(state, action) {\n  if (action.type === 'add') {\n    return [...state, { id: action.id, text: action.text, done: false }];\n  }\n  if (action.type === 'remove') {\n    return state.filter(todo => todo.id !== action.id);\n  }\n  if (action.type === 'toggle') {\n    return state.map(todo =>\n      todo.id === action.id ? { ...todo, done: !todo.done } : todo,\n    );\n  }\n  return state;\n}\n",
    solution:
      "import { useReducer, useState } from 'react';\n\nfunction todoReducer(state, action) {\n  if (action.type === 'add') {\n    return [...state, { id: action.id, text: action.text, done: false }];\n  }\n  if (action.type === 'remove') {\n    return state.filter(todo => todo.id !== action.id);\n  }\n  if (action.type === 'toggle') {\n    return state.map(todo =>\n      todo.id === action.id ? { ...todo, done: !todo.done } : todo,\n    );\n  }\n  return state;\n}\n\nfunction TodoApp() {\n  const [todos, dispatch] = useReducer(todoReducer, []);\n  const [text, setText] = useState('');\n\n  function handleSubmit(event) {\n    event.preventDefault();\n    dispatch({ type: 'add', id: crypto.randomUUID(), text });\n    setText('');\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={text} onChange={event => setText(event.target.value)} />\n      <ul>\n        {todos.map(todo => (\n          <li\n            key={todo.id}\n            onClick={() => dispatch({ type: 'toggle', id: todo.id })}\n          >\n            {todo.text}\n            {todo.done ? ' ✓' : ''}\n          </li>\n        ))}\n      </ul>\n    </form>\n  );\n}",
    hints: [
      'Texten i fältet kan vara vanligt useState.',
      "dispatch({ type: 'add', id: crypto.randomUUID(), text })",
      "onClick={() => dispatch({ type: 'toggle', id: todo.id })}",
    ],
    tests: [
      {
        description: 'Lägg till och bocka av',
        code: "(() => { const app = __mount(<TodoApp />); app.type('Handla'); app.submit(); app.type('Städa'); app.submit(); app.click('Städa'); return app.text('ul'); })()",
        expected: 'HandlaStäda ✓',
      },
    ],
  },
  {
    id: 'reducer-08',
    title: 'Börja om',
    xp: 10,
    track: 'reducer',
    isBoss: false,
    description:
      'En reset-action ger tillbaka startläget. Lägg startläget i en konstant, så används samma värde på båda ställena.',
    task: "Uppgift: Lägg till `'reset'` i `scoreReducer`, som ger tillbaka `initialScore`.",
    fileName: 'App.jsx',
    starterCode:
      "const initialScore = { home: 0, away: 0 };\n\nfunction scoreReducer(state, action) {\n  if (action.type === 'goal') {\n    return { ...state, [action.team]: state[action.team] + 1 };\n  }\n  return state;\n}",
    solution:
      "const initialScore = { home: 0, away: 0 };\n\nfunction scoreReducer(state, action) {\n  if (action.type === 'goal') {\n    return { ...state, [action.team]: state[action.team] + 1 };\n  }\n  if (action.type === 'reset') {\n    return initialScore;\n  }\n  return state;\n}",
    hints: [
      "if (action.type === 'reset')",
      'return initialScore;',
      'Före return state;',
    ],
    tests: [
      {
        description: 'Mål',
        code: "scoreReducer(initialScore, { type: 'goal', team: 'away' })",
        expected: { home: 0, away: 1 },
      },
      {
        description: 'Reset',
        code: "scoreReducer({ home: 3, away: 2 }, { type: 'reset' })",
        expected: { home: 0, away: 0 },
      },
    ],
  },
  {
    id: 'reducer-09',
    title: 'Från useState till useReducer',
    xp: 20,
    track: 'reducer',
    isBoss: false,
    description:
      'När flera useState alltid ändras tillsammans blir koden lättare med en reducer. Beteendet är detsamma, bara organiserat annorlunda.',
    task: "Uppgift: Skriv om `Quiz` så att `score` och `answered` ligger i ett state med `useReducer` och en `quizReducer` med actionen `'answer'` (med `correct: true/false`). Beteendet ska vara detsamma.",
    fileName: 'App.jsx',
    preview: '<Quiz />',
    starterCode:
      "import { useState } from 'react';\n\nfunction Quiz() {\n  const [score, setScore] = useState(0);\n  const [answered, setAnswered] = useState(0);\n\n  function answer(correct) {\n    setAnswered(answered + 1);\n    if (correct) {\n      setScore(score + 1);\n    }\n  }\n\n  return (\n    <div>\n      <button onClick={() => answer(true)}>Rätt</button>\n      <button onClick={() => answer(false)}>Fel</button>\n      <p>\n        {score} av {answered}\n      </p>\n    </div>\n  );\n}",
    solution:
      "import { useReducer } from 'react';\n\nfunction quizReducer(state, action) {\n  if (action.type === 'answer') {\n    return {\n      score: state.score + (action.correct ? 1 : 0),\n      answered: state.answered + 1,\n    };\n  }\n  return state;\n}\n\nfunction Quiz() {\n  const [state, dispatch] = useReducer(quizReducer, { score: 0, answered: 0 });\n\n  return (\n    <div>\n      <button onClick={() => dispatch({ type: 'answer', correct: true })}>\n        Rätt\n      </button>\n      <button onClick={() => dispatch({ type: 'answer', correct: false })}>\n        Fel\n      </button>\n      <p>\n        {state.score} av {state.answered}\n      </p>\n    </div>\n  );\n}",
    hints: [
      'function quizReducer(state, action) { … }',
      'useReducer(quizReducer, { score: 0, answered: 0 })',
      "dispatch({ type: 'answer', correct: true })",
    ],
    tests: [
      {
        description: 'Rätt, fel, rätt',
        code: "__mount(<Quiz />).click('Rätt').click('Fel').click('Rätt').text('p')",
        expected: '2 av 3',
      },
      {
        description: 'quizReducer',
        code: "quizReducer({ score: 0, answered: 0 }, { type: 'answer', correct: false })",
        expected: { score: 0, answered: 1 },
      },
    ],
    sourceChecks: [
      {
        description: 'Inget useState kvar',
        pattern: /useState/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'reducer-boss-01',
    title: 'Boss: Kundvagnen',
    xp: 30,
    track: 'reducer',
    isBoss: true,
    description: 'En kundvagn där all logik ligger i en reducer.',
    task: "Uppgift: Skriv `cartReducer` och `Cart`.\n  `'add'` med `action.product` (`{ id, name, price }`): finns produkten ökar `quantity`, annars läggs den till med `quantity: 1`.\n  `'remove'` med `action.id` tar bort raden. `'clear'` tömmer vagnen.\n  `Cart` får `products` som prop, visar en knapp `Köp NAME` per produkt, en `li` per rad (`NAME x QUANTITY`), knappen `Töm` och `p` med `Totalt: SUM kr`.",
    fileName: 'App.jsx',
    preview:
      "<Cart products={[{ id: 1, name: 'Mössa', price: 100 }, { id: 2, name: 'Vantar', price: 50 }]} />",
    starterCode: "import { useReducer } from 'react';\n\n",
    solution:
      "import { useReducer } from 'react';\n\nfunction cartReducer(state, action) {\n  if (action.type === 'add') {\n    const existing = state.find(item => item.id === action.product.id);\n    if (existing) {\n      return state.map(item =>\n        item.id === action.product.id\n          ? { ...item, quantity: item.quantity + 1 }\n          : item,\n      );\n    }\n    return [...state, { ...action.product, quantity: 1 }];\n  }\n  if (action.type === 'remove') {\n    return state.filter(item => item.id !== action.id);\n  }\n  if (action.type === 'clear') {\n    return [];\n  }\n  return state;\n}\n\nfunction Cart({ products }) {\n  const [cart, dispatch] = useReducer(cartReducer, []);\n  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);\n\n  return (\n    <div>\n      {products.map(product => (\n        <button\n          key={product.id}\n          onClick={() => dispatch({ type: 'add', product })}\n        >\n          Köp {product.name}\n        </button>\n      ))}\n      <ul>\n        {cart.map(item => (\n          <li key={item.id}>\n            {item.name} x {item.quantity}\n          </li>\n        ))}\n      </ul>\n      <button onClick={() => dispatch({ type: 'clear' })}>Töm</button>\n      <p>Totalt: {total} kr</p>\n    </div>\n  );\n}",
    hints: [],
    tests: [
      {
        description: 'add två gånger',
        code: "cartReducer(cartReducer([], { type: 'add', product: { id: 1, name: 'Mössa', price: 100 } }), { type: 'add', product: { id: 1, name: 'Mössa', price: 100 } })",
        expected: [{ id: 1, name: 'Mössa', price: 100, quantity: 2 }],
      },
      {
        description: 'remove',
        code: "cartReducer([{ id: 1 }, { id: 2 }], { type: 'remove', id: 2 })",
        expected: [{ id: 1 }],
      },
      {
        description: 'Köp och räkna',
        code: "__mount(<Cart products={[{ id: 1, name: 'Mössa', price: 100 }, { id: 2, name: 'Vantar', price: 50 }]} />).click('Köp Mössa').click('Köp Vantar').click('Köp Mössa').text('p')",
        expected: 'Totalt: 250 kr',
      },
      {
        description: 'Raderna',
        code: "__mount(<Cart products={[{ id: 1, name: 'Mössa', price: 100 }]} />).click('Köp Mössa').click('Köp Mössa').text('li')",
        expected: 'Mössa x 2',
      },
      {
        description: 'Töm',
        code: "__mount(<Cart products={[{ id: 1, name: 'Mössa', price: 100 }]} />).click('Köp Mössa').click('Töm').text('p')",
        expected: 'Totalt: 0 kr',
      },
    ],
  },
  {
    id: 'context-01',
    title: 'Din första context',
    xp: 10,
    track: 'context',
    isBoss: false,
    description:
      'Context låter en komponent långt ner läsa ett värde utan att det skickas som props genom alla led. createContext skapar den, <ThemeContext value={…}> ger värdet till allt inuti, och useContext(ThemeContext) läser det.',
    task: "Uppgift: Skapa `ThemeContext`. `App` ger värdet `'mörkt'` till `Label`, som visar `<p>Tema: mörkt</p>` med `useContext`.",
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: "import { createContext, useContext } from 'react';\n\n",
    solution:
      "import { createContext, useContext } from 'react';\n\nconst ThemeContext = createContext('ljust');\n\nfunction Label() {\n  const theme = useContext(ThemeContext);\n  return <p>Tema: {theme}</p>;\n}\n\nfunction App() {\n  return (\n    <ThemeContext value=\"mörkt\">\n      <Label />\n    </ThemeContext>\n  );\n}",
    hints: [
      "const ThemeContext = createContext('ljust');",
      'const theme = useContext(ThemeContext);',
      '<ThemeContext value="mörkt"><Label /></ThemeContext>',
    ],
    tests: [
      {
        description: 'Mörkt',
        code: "__mount(<App />).text('p')",
        expected: 'Tema: mörkt',
      },
    ],
  },
  {
    id: 'context-02',
    title: 'Standardvärdet',
    xp: 10,
    track: 'context',
    isBoss: false,
    description:
      'Värdet i createContext(…) används när det inte finns någon Provider ovanför. Det är bra för tester och för komponenter som ska fungera ändå.',
    task: "Uppgift: Skapa `LanguageContext` med standardvärdet `'sv'`. `Flag` visar `🇸🇪` för `'sv'` och `🇬🇧` för `'en'`.",
    fileName: 'App.jsx',
    preview: '<Flag />',
    starterCode: "import { createContext, useContext } from 'react';\n\n",
    solution:
      "import { createContext, useContext } from 'react';\n\nconst LanguageContext = createContext('sv');\n\nfunction Flag() {\n  const language = useContext(LanguageContext);\n  return <span>{language === 'sv' ? '🇸🇪' : '🇬🇧'}</span>;\n}",
    hints: [
      "createContext('sv')",
      'useContext(LanguageContext)',
      "language === 'sv' ? '🇸🇪' : '🇬🇧'",
    ],
    tests: [
      {
        description: 'Utan Provider',
        code: "__mount(<Flag />).text('span')",
        expected: '🇸🇪',
      },
      {
        description: 'Engelska',
        code: '__mount(<LanguageContext value="en"><Flag /></LanguageContext>).text(\'span\')',
        expected: '🇬🇧',
      },
    ],
  },
  {
    id: 'context-03',
    title: 'Slipp skicka vidare',
    xp: 15,
    track: 'context',
    isBoss: false,
    description:
      'Här skickas user genom Page och Header, som inte använder det själva. Det kallas prop drilling. Med en context läser Avatar värdet direkt, och de andra slipper veta om det.',
    task: 'Uppgift: Skriv om med en `UserContext`, så att varken `Page` eller `Header` har någon `user`-prop.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode:
      "function App() {\n  const user = 'Ada';\n  return <Page user={user} />;\n}\n\nfunction Page({ user }) {\n  return <Header user={user} />;\n}\n\nfunction Header({ user }) {\n  return <Avatar user={user} />;\n}\n\nfunction Avatar({ user }) {\n  return <p>Inloggad: {user}</p>;\n}",
    solution:
      'import { createContext, useContext } from \'react\';\n\nconst UserContext = createContext(null);\n\nfunction App() {\n  return (\n    <UserContext value="Ada">\n      <Page />\n    </UserContext>\n  );\n}\n\nfunction Page() {\n  return <Header />;\n}\n\nfunction Header() {\n  return <Avatar />;\n}\n\nfunction Avatar() {\n  const user = useContext(UserContext);\n  return <p>Inloggad: {user}</p>;\n}',
    hints: [
      'const UserContext = createContext(null);',
      'App ger värdet med <UserContext value="Ada">.',
      'Bara Avatar använder useContext.',
    ],
    tests: [
      {
        description: 'Ada',
        code: "__mount(<App />).text('p')",
        expected: 'Inloggad: Ada',
      },
    ],
    sourceChecks: [
      {
        description: 'Ingen user-prop kvar',
        pattern: /user=\{/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'context-04',
    title: 'Context med state',
    xp: 15,
    track: 'context',
    isBoss: false,
    description:
      'Värdet i en context kan vara ett objekt med både state och en funktion som ändrar det. Då kan en komponent långt ner både läsa och ändra.',
    task: "Uppgift: `App` har state `theme` (`'ljust'`) och en `toggle` som växlar till `'mörkt'` och tillbaka. Båda skickas i `ThemeContext`, och `ThemeButton` visar `Tema: THEME` och växlar vid klick.",
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode:
      "import { createContext, useContext, useState } from 'react';\n\n",
    solution:
      "import { createContext, useContext, useState } from 'react';\n\nconst ThemeContext = createContext(null);\n\nfunction ThemeButton() {\n  const { theme, toggle } = useContext(ThemeContext);\n  return <button onClick={toggle}>Tema: {theme}</button>;\n}\n\nfunction App() {\n  const [theme, setTheme] = useState('ljust');\n  const toggle = () => setTheme(theme === 'ljust' ? 'mörkt' : 'ljust');\n  return (\n    <ThemeContext value={{ theme, toggle }}>\n      <ThemeButton />\n    </ThemeContext>\n  );\n}",
    hints: [
      "useState('ljust') i App.",
      '<ThemeContext value={{ theme, toggle }}>',
      'const { theme, toggle } = useContext(ThemeContext);',
    ],
    tests: [
      {
        description: 'Ljust först',
        code: "__mount(<App />).text('button')",
        expected: 'Tema: ljust',
      },
      {
        description: 'Klick',
        code: "__mount(<App />).click('Tema: ljust').text('button')",
        expected: 'Tema: mörkt',
      },
    ],
  },
  {
    id: 'context-05',
    title: 'En egen Provider',
    xp: 15,
    track: 'context',
    isBoss: false,
    description:
      'Lägg state och context i en egen komponent som tar emot children. Då blir App ren, och allt om temat finns på ett ställe.',
    task: 'Uppgift: Flytta state och `toggle` från `App` till `ThemeProvider({ children })`. `App` använder `<ThemeProvider>` runt `ThemeButton`.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode:
      "import { createContext, useContext, useState } from 'react';\n\nconst ThemeContext = createContext(null);\n\nfunction ThemeButton() {\n  const { theme, toggle } = useContext(ThemeContext);\n  return <button onClick={toggle}>Tema: {theme}</button>;\n}\n\nfunction App() {\n  const [theme, setTheme] = useState('ljust');\n  const toggle = () => setTheme(theme === 'ljust' ? 'mörkt' : 'ljust');\n  return (\n    <ThemeContext value={{ theme, toggle }}>\n      <ThemeButton />\n    </ThemeContext>\n  );\n}",
    solution:
      "import { createContext, useContext, useState } from 'react';\n\nconst ThemeContext = createContext(null);\n\nfunction ThemeProvider({ children }) {\n  const [theme, setTheme] = useState('ljust');\n  const toggle = () => setTheme(theme === 'ljust' ? 'mörkt' : 'ljust');\n  return <ThemeContext value={{ theme, toggle }}>{children}</ThemeContext>;\n}\n\nfunction ThemeButton() {\n  const { theme, toggle } = useContext(ThemeContext);\n  return <button onClick={toggle}>Tema: {theme}</button>;\n}\n\nfunction App() {\n  return (\n    <ThemeProvider>\n      <ThemeButton />\n    </ThemeProvider>\n  );\n}",
    hints: [
      'function ThemeProvider({ children }) { … }',
      'Flytta useState och toggle dit.',
      '<ThemeContext value={{ theme, toggle }}>{children}</ThemeContext>',
    ],
    tests: [
      {
        description: 'Klick',
        code: "__mount(<App />).click('Tema: ljust').text('button')",
        expected: 'Tema: mörkt',
      },
      {
        description: 'Två knappar delar tema',
        code: "__mount(<ThemeProvider><ThemeButton /><ThemeButton /></ThemeProvider>).click('Tema: ljust').count('button')",
        expected: 2,
      },
    ],
    sourceChecks: [
      {
        description: 'Har ThemeProvider',
        pattern: /function ThemeProvider\(\{ children \}\)/,
      },
    ],
  },
  {
    id: 'context-06',
    title: 'En hook för contexten',
    xp: 10,
    track: 'context',
    isBoss: false,
    description:
      'En liten funktion useTheme() som returnerar useContext(ThemeContext) gör att andra komponenter inte behöver känna till ThemeContext alls. Hooks börjar alltid med use.',
    task: 'Uppgift: Skriv `useTheme()` och använd den i `ThemeButton`.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode:
      "import { createContext, useContext, useState } from 'react';\n\nconst ThemeContext = createContext(null);\n\nfunction ThemeProvider({ children }) {\n  const [theme, setTheme] = useState('ljust');\n  const toggle = () => setTheme(theme === 'ljust' ? 'mörkt' : 'ljust');\n  return <ThemeContext value={{ theme, toggle }}>{children}</ThemeContext>;\n}\n\nfunction ThemeButton() {\n  const { theme, toggle } = useContext(ThemeContext);\n  return <button onClick={toggle}>Tema: {theme}</button>;\n}\n\nfunction App() {\n  return (\n    <ThemeProvider>\n      <ThemeButton />\n    </ThemeProvider>\n  );\n}",
    solution:
      "import { createContext, useContext, useState } from 'react';\n\nconst ThemeContext = createContext(null);\n\nfunction ThemeProvider({ children }) {\n  const [theme, setTheme] = useState('ljust');\n  const toggle = () => setTheme(theme === 'ljust' ? 'mörkt' : 'ljust');\n  return <ThemeContext value={{ theme, toggle }}>{children}</ThemeContext>;\n}\n\nfunction useTheme() {\n  return useContext(ThemeContext);\n}\n\nfunction ThemeButton() {\n  const { theme, toggle } = useTheme();\n  return <button onClick={toggle}>Tema: {theme}</button>;\n}\n\nfunction App() {\n  return (\n    <ThemeProvider>\n      <ThemeButton />\n    </ThemeProvider>\n  );\n}",
    hints: [
      'function useTheme() { … }',
      'return useContext(ThemeContext);',
      'const { theme, toggle } = useTheme();',
    ],
    tests: [
      {
        description: 'Fungerar',
        code: "__mount(<App />).click('Tema: ljust').text('button')",
        expected: 'Tema: mörkt',
      },
      {
        description: 'useTheme finns',
        code: 'typeof useTheme',
        expected: 'function',
      },
    ],
    sourceChecks: [
      {
        description: 'ThemeButton använder useTheme',
        pattern: /=\s*useTheme\(\)/,
      },
    ],
  },
  {
    id: 'context-07',
    title: 'Två contexts',
    xp: 15,
    track: 'context',
    isBoss: false,
    description:
      'En app kan ha flera contexts, var och en för sitt. En komponent kan läsa båda.',
    task: "Uppgift: `UserContext` (standard `'gäst'`) och `LanguageContext` (standard `'sv'`). `Greeting` visar `Hej NAMN!` på svenska och `Hello NAMN!` på engelska.",
    fileName: 'App.jsx',
    preview: '<Greeting />',
    starterCode: "import { createContext, useContext } from 'react';\n\n",
    solution:
      "import { createContext, useContext } from 'react';\n\nconst UserContext = createContext('gäst');\nconst LanguageContext = createContext('sv');\n\nfunction Greeting() {\n  const user = useContext(UserContext);\n  const language = useContext(LanguageContext);\n  return <p>{language === 'sv' ? `Hej ${user}!` : `Hello ${user}!`}</p>;\n}",
    hints: [
      'Två createContext.',
      'Två useContext i Greeting.',
      "language === 'sv' ? `Hej ${user}!` : `Hello ${user}!`",
    ],
    tests: [
      {
        description: 'Standard',
        code: "__mount(<Greeting />).text('p')",
        expected: 'Hej gäst!',
      },
      {
        description: 'Ada på engelska',
        code: '__mount(<UserContext value="Ada"><LanguageContext value="en"><Greeting /></LanguageContext></UserContext>).text(\'p\')',
        expected: 'Hello Ada!',
      },
    ],
  },
  {
    id: 'context-08',
    title: 'Context och reducer',
    xp: 20,
    track: 'context',
    isBoss: false,
    description:
      'Context och useReducer passar ihop: reducern sköter logiken, och contexten ger både state och dispatch till hela appen. Två komponenter långt ifrån varandra delar samma vagn.',
    task: "Uppgift: `CartProvider` har `useReducer(cartReducer, [])` och ger `{ cart, dispatch }`. `BuyButton({ item })` lägger till med `'add'`, och `CartCount` visar `N i vagnen`.",
    fileName: 'App.jsx',
    preview:
      '<CartProvider><BuyButton item="Mössa" /><CartCount /></CartProvider>',
    starterCode:
      "import { createContext, useContext, useReducer } from 'react';\n\nfunction cartReducer(state, action) {\n  if (action.type === 'add') {\n    return [...state, action.item];\n  }\n  return state;\n}\n",
    solution:
      "import { createContext, useContext, useReducer } from 'react';\n\nfunction cartReducer(state, action) {\n  if (action.type === 'add') {\n    return [...state, action.item];\n  }\n  return state;\n}\n\nconst CartContext = createContext(null);\n\nfunction CartProvider({ children }) {\n  const [cart, dispatch] = useReducer(cartReducer, []);\n  return <CartContext value={{ cart, dispatch }}>{children}</CartContext>;\n}\n\nfunction BuyButton({ item }) {\n  const { dispatch } = useContext(CartContext);\n  return (\n    <button onClick={() => dispatch({ type: 'add', item })}>Köp {item}</button>\n  );\n}\n\nfunction CartCount() {\n  const { cart } = useContext(CartContext);\n  return <p>{cart.length} i vagnen</p>;\n}",
    hints: [
      'const CartContext = createContext(null);',
      'CartProvider ger value={{ cart, dispatch }}.',
      "dispatch({ type: 'add', item })",
    ],
    tests: [
      {
        description: 'Två köp',
        code: "__mount(<CartProvider><BuyButton item=\"Mössa\" /><BuyButton item=\"Vantar\" /><CartCount /></CartProvider>).click('Köp Mössa').click('Köp Vantar').text('p')",
        expected: '2 i vagnen',
      },
    ],
  },
  {
    id: 'context-09',
    title: 'Ingen Provider',
    xp: 15,
    track: 'context',
    isBoss: false,
    description:
      'Utan Provider ger useContext standardvärdet, här null. Då kraschar ThemeButton med "Cannot destructure property". Lösningen är att lägga komponenten inuti sin Provider.',
    task: 'Uppgift: Laga `App` så att knappen fungerar.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode:
      "import { createContext, useContext, useState } from 'react';\n\nconst ThemeContext = createContext(null);\n\nfunction ThemeProvider({ children }) {\n  const [theme, setTheme] = useState('ljust');\n  const toggle = () => setTheme(theme === 'ljust' ? 'mörkt' : 'ljust');\n  return <ThemeContext value={{ theme, toggle }}>{children}</ThemeContext>;\n}\n\nfunction ThemeButton() {\n  const { theme, toggle } = useContext(ThemeContext);\n  return <button onClick={toggle}>Tema: {theme}</button>;\n}\n\nfunction App() {\n  return (\n    <div>\n      <ThemeProvider />\n      <ThemeButton />\n    </div>\n  );\n}",
    solution:
      "import { createContext, useContext, useState } from 'react';\n\nconst ThemeContext = createContext(null);\n\nfunction ThemeProvider({ children }) {\n  const [theme, setTheme] = useState('ljust');\n  const toggle = () => setTheme(theme === 'ljust' ? 'mörkt' : 'ljust');\n  return <ThemeContext value={{ theme, toggle }}>{children}</ThemeContext>;\n}\n\nfunction ThemeButton() {\n  const { theme, toggle } = useContext(ThemeContext);\n  return <button onClick={toggle}>Tema: {theme}</button>;\n}\n\nfunction App() {\n  return (\n    <ThemeProvider>\n      <ThemeButton />\n    </ThemeProvider>\n  );\n}",
    hints: [
      'Var står ThemeButton?',
      'Den måste vara inuti ThemeProvider.',
      '<ThemeProvider><ThemeButton /></ThemeProvider>',
    ],
    tests: [
      {
        description: 'Klick',
        code: "__mount(<App />).click('Tema: ljust').text('button')",
        expected: 'Tema: mörkt',
      },
    ],
  },
  {
    id: 'context-boss-01',
    title: 'Boss: Två språk',
    xp: 30,
    track: 'context',
    isBoss: true,
    description:
      'En app på två språk, där en knapp långt ner byter språk för allt.',
    task: "Uppgift: `TEXTS` finns. Skriv:\n  `LanguageProvider({ children })` med state `language` (`'sv'`), och `toggle` som växlar mellan `'sv'` och `'en'`.\n  `useTexts()` som ger `{ texts, toggle }`, där `texts` är `TEXTS[language]`.\n  `Title` som visar `<h1>` med `texts.title`, och `SwitchButton` som visar `texts.button` och byter språk.",
    fileName: 'App.jsx',
    preview: '<LanguageProvider><Title /><SwitchButton /></LanguageProvider>',
    starterCode:
      "import { createContext, useContext, useState } from 'react';\n\nconst TEXTS = {\n  sv: { title: 'Välkommen', button: 'In English' },\n  en: { title: 'Welcome', button: 'På svenska' },\n};",
    solution:
      "import { createContext, useContext, useState } from 'react';\n\nconst TEXTS = {\n  sv: { title: 'Välkommen', button: 'In English' },\n  en: { title: 'Welcome', button: 'På svenska' },\n};\n\nconst LanguageContext = createContext(null);\n\nfunction LanguageProvider({ children }) {\n  const [language, setLanguage] = useState('sv');\n  const toggle = () => setLanguage(language === 'sv' ? 'en' : 'sv');\n  return (\n    <LanguageContext value={{ language, toggle }}>{children}</LanguageContext>\n  );\n}\n\nfunction useTexts() {\n  const { language, toggle } = useContext(LanguageContext);\n  return { texts: TEXTS[language], toggle };\n}\n\nfunction Title() {\n  const { texts } = useTexts();\n  return <h1>{texts.title}</h1>;\n}\n\nfunction SwitchButton() {\n  const { texts, toggle } = useTexts();\n  return <button onClick={toggle}>{texts.button}</button>;\n}",
    hints: [],
    tests: [
      {
        description: 'Svenska först',
        code: "__mount(<LanguageProvider><Title /><SwitchButton /></LanguageProvider>).text('h1')",
        expected: 'Välkommen',
      },
      {
        description: 'Byt till engelska',
        code: "__mount(<LanguageProvider><Title /><SwitchButton /></LanguageProvider>).click('In English').text('h1')",
        expected: 'Welcome',
      },
      {
        description: 'Och tillbaka',
        code: "__mount(<LanguageProvider><Title /><SwitchButton /></LanguageProvider>).click('In English').click('På svenska').text('h1')",
        expected: 'Välkommen',
      },
    ],
  },
  {
    id: 'hooks-01',
    title: 'Din första hook',
    xp: 10,
    track: 'hooks',
    isBoss: false,
    description:
      'En egen hook är en funktion som börjar med use och använder andra hooks. Den samlar logik som flera komponenter kan dela.',
    task: 'Uppgift: Skriv `useCounter(start = 0)` som returnerar `[count, increment]`, och `Counter` som använder den med en knapp `+1` och en `p`.',
    fileName: 'App.jsx',
    preview: '<Counter />',
    starterCode: "import { useState } from 'react';\n\n",
    solution:
      "import { useState } from 'react';\n\nfunction useCounter(start = 0) {\n  const [count, setCount] = useState(start);\n  const increment = () => setCount(count + 1);\n  return [count, increment];\n}\n\nfunction Counter() {\n  const [count, increment] = useCounter();\n  return (\n    <div>\n      <p>{count}</p>\n      <button onClick={increment}>+1</button>\n    </div>\n  );\n}",
    hints: [
      'function useCounter(start = 0) { … }',
      'useState(start) inuti, och en increment-funktion.',
      'return [count, increment];',
    ],
    tests: [
      {
        description: 'Två klick',
        code: "__mount(<Counter />).click('+1').click('+1').text('p')",
        expected: '2',
      },
      {
        description: 'Ett eget startvärde',
        code: "(() => { function Ten() { const [count] = useCounter(10); return <p>{count}</p>; } return __mount(<Ten />).text('p'); })()",
        expected: '10',
      },
    ],
  },
  {
    id: 'hooks-02',
    title: 'useToggle',
    xp: 10,
    track: 'hooks',
    isBoss: false,
    description:
      'Sant eller falskt som växlar är så vanligt att det är värt en egen hook.',
    task: 'Uppgift: Skriv `useToggle(start = false)` som returnerar `[value, toggle]`. `Lamp` visar `💡 På` eller `🌑 Av` och växlar vid klick på en knapp `Knapp`.',
    fileName: 'App.jsx',
    preview: '<Lamp />',
    starterCode: "import { useState } from 'react';\n\n",
    solution:
      "import { useState } from 'react';\n\nfunction useToggle(start = false) {\n  const [value, setValue] = useState(start);\n  const toggle = () => setValue(!value);\n  return [value, toggle];\n}\n\nfunction Lamp() {\n  const [on, toggle] = useToggle();\n  return (\n    <div>\n      <p>{on ? '💡 På' : '🌑 Av'}</p>\n      <button onClick={toggle}>Knapp</button>\n    </div>\n  );\n}",
    hints: [
      'function useToggle(start = false)',
      'const toggle = () => setValue(!value);',
      'const [on, toggle] = useToggle();',
    ],
    tests: [
      {
        description: 'Av först',
        code: "__mount(<Lamp />).text('p')",
        expected: '🌑 Av',
      },
      {
        description: 'Klick',
        code: "__mount(<Lamp />).click('Knapp').text('p')",
        expected: '💡 På',
      },
    ],
  },
  {
    id: 'hooks-03',
    title: 'useInput',
    xp: 15,
    track: 'hooks',
    isBoss: false,
    description:
      'Ett kontrollerat fält behöver value och onChange. En hook kan ge båda på en gång, så att <input {...name} /> räcker.',
    task: "Uppgift: Skriv `useInput(start)` som returnerar `{ value, onChange }`. `Form` har två fält med `useInput('')` och en `p` med `FÖRNAMN EFTERNAMN`.",
    fileName: 'App.jsx',
    preview: '<Form />',
    starterCode: "import { useState } from 'react';\n\n",
    solution:
      "import { useState } from 'react';\n\nfunction useInput(start) {\n  const [value, setValue] = useState(start);\n  return { value, onChange: event => setValue(event.target.value) };\n}\n\nfunction Form() {\n  const first = useInput('');\n  const last = useInput('');\n  return (\n    <div>\n      <input {...first} />\n      <input {...last} />\n      <p>\n        {first.value} {last.value}\n      </p>\n    </div>\n  );\n}",
    hints: [
      'return { value, onChange: event => setValue(event.target.value) };',
      "const first = useInput('');",
      '<input {...first} />',
    ],
    tests: [
      {
        description: 'Två fält',
        code: "(() => { const app = __mount(<Form />); app.type('Ada', 0); app.type('Lovelace', 1); return app.text('p'); })()",
        expected: 'Ada Lovelace',
      },
    ],
  },
  {
    id: 'hooks-04',
    title: 'useLocalStorage',
    xp: 20,
    track: 'hooks',
    isBoss: false,
    description:
      'Som useState, men värdet sparas i localStorage och finns kvar när sidan laddas om. Startvärdet läses med en funktion, så att localStorage bara läses första gången.',
    task: 'Uppgift: Skriv `useLocalStorage(key, start)` som returnerar `[value, setValue]`. Värdet läses från `localStorage` (med `JSON.parse`) om det finns, och sparas (med `JSON.stringify`) i en effekt när det ändras.',
    fileName: 'App.jsx',
    preview: '<Visits />',
    starterCode: "import { useEffect, useState } from 'react';\n\n",
    solution:
      "import { useEffect, useState } from 'react';\n\nfunction useLocalStorage(key, start) {\n  const [value, setValue] = useState(() => {\n    const saved = localStorage.getItem(key);\n    return saved === null ? start : JSON.parse(saved);\n  });\n\n  useEffect(() => {\n    localStorage.setItem(key, JSON.stringify(value));\n  }, [key, value]);\n\n  return [value, setValue];\n}\n\nfunction Visits() {\n  const [visits, setVisits] = useLocalStorage('visits', 0);\n  return <button onClick={() => setVisits(visits + 1)}>{visits} besök</button>;\n}",
    hints: [
      'useState(() => { … }) läser bara första gången.',
      'saved === null ? start : JSON.parse(saved)',
      'useEffect(() => { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]);',
    ],
    tests: [
      {
        description: 'Sparas',
        code: "(() => { __mount(<Visits />).click('0 besök').click('1 besök'); return localStorage.getItem('visits'); })()",
        expected: '2',
      },
      {
        description: 'Läses vid start',
        code: "(() => { localStorage.setItem('visits', '5'); return __mount(<Visits />).text('button'); })()",
        expected: '5 besök',
      },
    ],
  },
  {
    id: 'hooks-05',
    title: 'useDocumentTitle',
    xp: 10,
    track: 'hooks',
    isBoss: false,
    description:
      'En hook kan också bara göra en sidoeffekt, utan att returnera något.',
    task: 'Uppgift: Skriv `useDocumentTitle(title)` som sätter `document.title` i en effekt med `[title]`. `Inbox({ unread })` använder den med `` `(${unread}) Inkorg` ``.',
    fileName: 'App.jsx',
    preview: '<Inbox unread={3} />',
    starterCode: "import { useEffect } from 'react';\n\n",
    solution:
      "import { useEffect } from 'react';\n\nfunction useDocumentTitle(title) {\n  useEffect(() => {\n    document.title = title;\n  }, [title]);\n}\n\nfunction Inbox({ unread }) {\n  useDocumentTitle(`(${unread}) Inkorg`);\n  return <h1>Inkorg</h1>;\n}",
    hints: [
      'function useDocumentTitle(title) { useEffect(…, [title]); }',
      'document.title = title;',
      'useDocumentTitle(`(${unread}) Inkorg`);',
    ],
    tests: [
      {
        description: 'Titeln',
        code: '(__mount(<Inbox unread={3} />), document.title)',
        expected: '(3) Inkorg',
      },
      {
        description: 'Ändras med props',
        code: '(__mount(<Inbox unread={3} />).rerender(<Inbox unread={7} />), document.title)',
        expected: '(7) Inkorg',
      },
    ],
  },
  {
    id: 'hooks-06',
    title: 'useTimer',
    xp: 20,
    track: 'hooks',
    isBoss: false,
    description:
      'En hook kan starta en timer. Städfunktionen stoppar den, så att inget fortsätter när komponenten försvinner.',
    task: 'Uppgift: Skriv `useTimer()` som returnerar sekunderna sedan start (en `setInterval` på 1000 ms, med städning). `Stopwatch` visar `<p>N s</p>`.',
    fileName: 'App.jsx',
    preview: '<Stopwatch />',
    starterCode: "import { useEffect, useState } from 'react';\n\n",
    solution:
      "import { useEffect, useState } from 'react';\n\nfunction useTimer() {\n  const [seconds, setSeconds] = useState(0);\n\n  useEffect(() => {\n    const id = setInterval(() => setSeconds(s => s + 1), 1000);\n    return () => clearInterval(id);\n  }, []);\n\n  return seconds;\n}\n\nfunction Stopwatch() {\n  const seconds = useTimer();\n  return <p>{seconds} s</p>;\n}",
    hints: [
      'setInterval(() => setSeconds(s => s + 1), 1000)',
      'return () => clearInterval(id);',
      'useEffect(…, [])',
    ],
    tests: [
      {
        description: 'Tre sekunder',
        code: "__mount(<Stopwatch />).tick(3000).text('p')",
        expected: '3 s',
      },
      {
        description: 'Städar',
        code: '(__mount(<Stopwatch />).tick(1000).unmount(), __clock.active())',
        expected: 0,
      },
    ],
  },
  {
    id: 'hooks-07',
    title: 'useFetch',
    xp: 20,
    track: 'hooks',
    isBoss: false,
    description:
      'Att hämta data i en effekt är så vanligt att det blir en hook: useFetch(url) ger { data, loading }. ignore skyddar mot svar som kommer efter att adressen bytts.',
    task: 'Uppgift: Skriv `useFetch(url)` som returnerar `{ data, loading }`. `Users` visar `<p>Laddar…</p>` medan den hämtar `/api/users`, och sedan en `li` per användare med `name`.',
    fileName: 'App.jsx',
    preview: '<Users />',
    starterCode: "import { useEffect, useState } from 'react';\n\n",
    solution:
      "import { useEffect, useState } from 'react';\n\nfunction useFetch(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    let ignore = false;\n    setLoading(true);\n    fetch(url)\n      .then(response => response.json())\n      .then(json => {\n        if (!ignore) {\n          setData(json);\n          setLoading(false);\n        }\n      });\n    return () => {\n      ignore = true;\n    };\n  }, [url]);\n\n  return { data, loading };\n}\n\nfunction Users() {\n  const { data, loading } = useFetch('/api/users');\n  if (loading) {\n    return <p>Laddar…</p>;\n  }\n  return (\n    <ul>\n      {data.map(user => (\n        <li key={user.id}>{user.name}</li>\n      ))}\n    </ul>\n  );\n}",
    hints: [
      'Två useState: data och loading.',
      'fetch(url).then(response => response.json()).then(…)',
      "const { data, loading } = useFetch('/api/users');",
    ],
    tests: [
      {
        description: 'Laddar först',
        code: "__mount(<Users />).text('p')",
        expected: 'Laddar…',
      },
      {
        description: 'Användarna',
        code: "(async () => { const app = __mount(<Users />); await app.settle(); return app.count('li'); })()",
        expected: 3,
      },
    ],
  },
  {
    id: 'hooks-08',
    title: 'usePrevious',
    xp: 20,
    track: 'hooks',
    isBoss: false,
    description:
      'useRef ger en låda som finns kvar mellan renderingar utan att rita om när den ändras. usePrevious sparar värdet i en effekt, så att det under nästa rendering är det förra.',
    task: 'Uppgift: Skriv `usePrevious(value)` med `useRef` och `useEffect`. `Score({ points })` visar `<p>Nu: N, förut: M</p>` (förut är `-` första gången).',
    fileName: 'App.jsx',
    preview: '<Score points={1} />',
    starterCode: "import { useEffect, useRef } from 'react';\n\n",
    solution:
      "import { useEffect, useRef } from 'react';\n\nfunction usePrevious(value) {\n  const ref = useRef(undefined);\n  useEffect(() => {\n    ref.current = value;\n  }, [value]);\n  return ref.current;\n}\n\nfunction Score({ points }) {\n  const previous = usePrevious(points);\n  return (\n    <p>\n      Nu: {points}, förut: {previous ?? '-'}\n    </p>\n  );\n}",
    hints: [
      'const ref = useRef(undefined);',
      'useEffect(() => { ref.current = value; }, [value]);',
      'return ref.current;',
    ],
    tests: [
      {
        description: 'Första gången',
        code: "__mount(<Score points={1} />).text('p')",
        expected: 'Nu: 1, förut: -',
      },
      {
        description: 'Efter en ändring',
        code: "__mount(<Score points={1} />).rerender(<Score points={5} />).text('p')",
        expected: 'Nu: 5, förut: 1',
      },
    ],
  },
  {
    id: 'hooks-09',
    title: 'useForm',
    xp: 20,
    track: 'hooks',
    isBoss: false,
    description:
      'Hooks kan bygga på varandra. useForm samlar ett helt formulär: värdena, en gemensam handleChange och reset.',
    task: 'Uppgift: Skriv `useForm(start)` som returnerar `{ values, handleChange, reset }`. `Contact` har fälten `name` och `email`, en `p` med `NAME <EMAIL>`, och knappen `Rensa` (`type="button"`) som återställer.',
    fileName: 'App.jsx',
    preview: '<Contact />',
    starterCode: "import { useState } from 'react';\n\n",
    solution:
      'import { useState } from \'react\';\n\nfunction useForm(start) {\n  const [values, setValues] = useState(start);\n\n  function handleChange(event) {\n    setValues({ ...values, [event.target.name]: event.target.value });\n  }\n\n  return { values, handleChange, reset: () => setValues(start) };\n}\n\nfunction Contact() {\n  const { values, handleChange, reset } = useForm({ name: \'\', email: \'\' });\n  return (\n    <form>\n      <input name="name" value={values.name} onChange={handleChange} />\n      <input name="email" value={values.email} onChange={handleChange} />\n      <p>\n        {values.name} &lt;{values.email}&gt;\n      </p>\n      <button type="button" onClick={reset}>\n        Rensa\n      </button>\n    </form>\n  );\n}',
    hints: [
      'const [values, setValues] = useState(start);',
      'handleChange med [event.target.name], som i formulärbanan.',
      'reset: () => setValues(start)',
    ],
    tests: [
      {
        description: 'Fyll i',
        code: "(() => { const app = __mount(<Contact />); app.type('Ada', 0); app.type('a@b.se', 1); return app.text('p'); })()",
        expected: 'Ada <a@b.se>',
      },
      {
        description: 'Rensa',
        code: "(() => { const app = __mount(<Contact />); app.type('Ada', 0); app.click('Rensa'); return app.text('p'); })()",
        expected: ' <>',
      },
    ],
  },
  {
    id: 'hooks-boss-01',
    title: 'Boss: Att göra med en hook',
    xp: 30,
    track: 'hooks',
    isBoss: true,
    description:
      'All logik för en att göra-lista i en egen hook som sparar i localStorage, och en komponent som bara visar.',
    task: "Uppgift:\n  `useLocalStorage(key, start)` som i övning 4.\n  `useTodos()` som använder den med nyckeln `'todos'` och returnerar `{ todos, add, toggle, remaining }`. `add(text)` lägger till `{ id, text, done: false }`, `toggle(id)` växlar `done`, och `remaining` är antalet som inte är klara.\n  `TodoApp` med ett formulär, en `li` per uppgift (klick växlar, klar får ` ✓`) och `p` med `N kvar`.",
    fileName: 'App.jsx',
    preview: '<TodoApp />',
    starterCode: "import { useEffect, useState } from 'react';\n\n",
    solution:
      "import { useEffect, useState } from 'react';\n\nfunction useLocalStorage(key, start) {\n  const [value, setValue] = useState(() => {\n    const saved = localStorage.getItem(key);\n    return saved === null ? start : JSON.parse(saved);\n  });\n\n  useEffect(() => {\n    localStorage.setItem(key, JSON.stringify(value));\n  }, [key, value]);\n\n  return [value, setValue];\n}\n\nfunction useTodos() {\n  const [todos, setTodos] = useLocalStorage('todos', []);\n\n  function add(text) {\n    setTodos([...todos, { id: crypto.randomUUID(), text, done: false }]);\n  }\n\n  function toggle(id) {\n    setTodos(\n      todos.map(todo =>\n        todo.id === id ? { ...todo, done: !todo.done } : todo,\n      ),\n    );\n  }\n\n  const remaining = todos.filter(todo => !todo.done).length;\n  return { todos, add, toggle, remaining };\n}\n\nfunction TodoApp() {\n  const { todos, add, toggle, remaining } = useTodos();\n  const [text, setText] = useState('');\n\n  function handleSubmit(event) {\n    event.preventDefault();\n    add(text);\n    setText('');\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={text} onChange={event => setText(event.target.value)} />\n      <ul>\n        {todos.map(todo => (\n          <li key={todo.id} onClick={() => toggle(todo.id)}>\n            {todo.text}\n            {todo.done ? ' ✓' : ''}\n          </li>\n        ))}\n      </ul>\n      <p>{remaining} kvar</p>\n    </form>\n  );\n}",
    hints: [],
    tests: [
      {
        description: 'Lägg till och bocka av',
        code: "(() => { const app = __mount(<TodoApp />); app.type('Handla'); app.submit(); app.type('Städa'); app.submit(); app.click('Handla'); return [app.text('ul'), app.text('p')]; })()",
        expected: ['Handla ✓Städa', '1 kvar'],
      },
      {
        description: 'Sparas i localStorage',
        code: "(() => { const app = __mount(<TodoApp />); app.type('Handla'); app.submit(); return JSON.parse(localStorage.getItem('todos'))[0].text; })()",
        expected: 'Handla',
      },
      {
        description: 'Läses vid start',
        code: "(() => { localStorage.setItem('todos', JSON.stringify([{ id: 'a', text: 'Diska', done: false }])); return __mount(<TodoApp />).text('li'); })()",
        expected: 'Diska',
      },
    ],
  },
  {
    id: 'performance-01',
    title: 'Varför ritas den om?',
    xp: 10,
    track: 'performance',
    isBoss: false,
    description:
      'När en komponent ritas om ritas alla dess barn om också – även de som inte fått något nytt. memo(Komponent) gör att barnet hoppar över ritningen när dess props är desamma.',
    task: 'Uppgift: Gör `Child` till `memo(…)`, så att den inte ritas om när man klickar i `Parent`. `childRenders` räknar hur många gånger den ritas.',
    fileName: 'App.jsx',
    preview: '<Parent />',
    starterCode:
      "import { useState } from 'react';\n\nlet childRenders = 0;\n\nfunction Child() {\n  childRenders++;\n  return <p>Jag är barnet</p>;\n}\n\nfunction Parent() {\n  const [clicks, setClicks] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setClicks(clicks + 1)}>Klick {clicks}</button>\n      <Child />\n    </div>\n  );\n}",
    solution:
      "import { memo, useState } from 'react';\n\nlet childRenders = 0;\n\nconst Child = memo(function Child() {\n  childRenders++;\n  return <p>Jag är barnet</p>;\n});\n\nfunction Parent() {\n  const [clicks, setClicks] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setClicks(clicks + 1)}>Klick {clicks}</button>\n      <Child />\n    </div>\n  );\n}",
    hints: [
      "import { memo, useState } from 'react';",
      'const Child = memo(function Child() { … });',
      'Resten är som förut.',
    ],
    tests: [
      {
        description: 'Ritas en gång',
        code: "(__mount(<Parent />).click('Klick 0').click('Klick 1'), childRenders)",
        expected: 1,
      },
    ],
  },
  {
    id: 'performance-02',
    title: 'memo och nya props',
    xp: 10,
    track: 'performance',
    isBoss: false,
    description:
      'memo jämför props. Får barnet ett nytt värde ritas det om – precis som det ska. Men inte när något annat i föräldern ändras.',
    task: 'Uppgift: `Name` ska vara `memo`. Den ska ritas om när `name` ändras, men inte när `clicks` ändras.',
    fileName: 'App.jsx',
    preview: '<Parent />',
    starterCode:
      "import { useState } from 'react';\n\nlet nameRenders = 0;\n\nfunction Name({ name }) {\n  nameRenders++;\n  return <p>{name}</p>;\n}\n\nfunction Parent() {\n  const [name, setName] = useState('Ada');\n  const [clicks, setClicks] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setName('Bo')}>Byt namn</button>\n      <button onClick={() => setClicks(clicks + 1)}>Klick {clicks}</button>\n      <Name name={name} />\n    </div>\n  );\n}",
    solution:
      "import { memo, useState } from 'react';\n\nlet nameRenders = 0;\n\nconst Name = memo(function Name({ name }) {\n  nameRenders++;\n  return <p>{name}</p>;\n});\n\nfunction Parent() {\n  const [name, setName] = useState('Ada');\n  const [clicks, setClicks] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setName('Bo')}>Byt namn</button>\n      <button onClick={() => setClicks(clicks + 1)}>Klick {clicks}</button>\n      <Name name={name} />\n    </div>\n  );\n}",
    hints: [
      'Samma som förra övningen.',
      'const Name = memo(function Name({ name }) { … });',
      'Importera memo.',
    ],
    tests: [
      {
        description: 'Klick ritar inte om',
        code: "(__mount(<Parent />).click('Klick 0').click('Klick 1'), nameRenders)",
        expected: 1,
      },
      {
        description: 'Nytt namn ritar om',
        code: "(__mount(<Parent />).click('Byt namn'), nameRenders)",
        expected: 2,
      },
    ],
  },
  {
    id: 'performance-03',
    title: 'useMemo',
    xp: 15,
    track: 'performance',
    isBoss: false,
    description:
      'En tung uträkning i komponenten körs vid varje ritning. useMemo(() => uträkning, [beroenden]) sparar svaret och räknar bara om när något i listan ändrats.',
    task: 'Uppgift: Använd `useMemo` så att `slowTotal` bara körs när `prices` ändras – inte när man skriver i fältet. `calls` räknar anropen.',
    fileName: 'App.jsx',
    preview: '<Receipt prices={[10, 20]} />',
    starterCode:
      "import { useState } from 'react';\n\nlet calls = 0;\n\nfunction slowTotal(prices) {\n  calls++;\n  return prices.reduce((sum, price) => sum + price, 0);\n}\n\nfunction Receipt({ prices }) {\n  const [note, setNote] = useState('');\n  const total = slowTotal(prices);\n  return (\n    <div>\n      <input value={note} onChange={event => setNote(event.target.value)} />\n      <p>Totalt: {total} kr</p>\n    </div>\n  );\n}",
    solution:
      "import { useMemo, useState } from 'react';\n\nlet calls = 0;\n\nfunction slowTotal(prices) {\n  calls++;\n  return prices.reduce((sum, price) => sum + price, 0);\n}\n\nfunction Receipt({ prices }) {\n  const [note, setNote] = useState('');\n  const total = useMemo(() => slowTotal(prices), [prices]);\n  return (\n    <div>\n      <input value={note} onChange={event => setNote(event.target.value)} />\n      <p>Totalt: {total} kr</p>\n    </div>\n  );\n}",
    hints: [
      "import { useMemo, useState } from 'react';",
      'useMemo(() => slowTotal(prices), [prices])',
      'Beroendelistan är [prices].',
    ],
    tests: [
      {
        description: 'Totalen',
        code: "__mount(<Receipt prices={[10, 20]} />).text('p')",
        expected: 'Totalt: 30 kr',
      },
      {
        description: 'Ett anrop',
        code: "(() => { const prices = [10, 20]; const app = __mount(<Receipt prices={prices} />); app.type('a'); app.type('ab'); return calls; })()",
        expected: 1,
      },
    ],
  },
  {
    id: 'performance-04',
    title: 'Glömt beroende',
    xp: 15,
    track: 'performance',
    isBoss: false,
    description:
      'useMemo räknar bara om när något i listan ändras. Saknas ett beroende visar komponenten ett gammalt svar.',
    task: 'Uppgift: Laga `useMemo` så att totalen stämmer när antalet ändras.',
    fileName: 'App.jsx',
    preview: '<Order price={35} />',
    starterCode:
      "import { useMemo, useState } from 'react';\n\nfunction Order({ price }) {\n  const [quantity, setQuantity] = useState(1);\n  const total = useMemo(() => price * quantity, [price]);\n  return (\n    <div>\n      <button onClick={() => setQuantity(quantity + 1)}>En till</button>\n      <p>Totalt: {total} kr</p>\n    </div>\n  );\n}",
    solution:
      "import { useMemo, useState } from 'react';\n\nfunction Order({ price }) {\n  const [quantity, setQuantity] = useState(1);\n  const total = useMemo(() => price * quantity, [price, quantity]);\n  return (\n    <div>\n      <button onClick={() => setQuantity(quantity + 1)}>En till</button>\n      <p>Totalt: {total} kr</p>\n    </div>\n  );\n}",
    hints: [
      'Vilka värden använder uträkningen?',
      'Både price och quantity.',
      '[price, quantity]',
    ],
    tests: [
      {
        description: 'Två',
        code: "__mount(<Order price={35} />).click('En till').text('p')",
        expected: 'Totalt: 70 kr',
      },
    ],
  },
  {
    id: 'performance-05',
    title: 'useCallback',
    xp: 20,
    track: 'performance',
    isBoss: false,
    description:
      'En funktion som skapas i komponenten är en ny funktion vid varje ritning. Då tror memo att propen ändrats. useCallback(fn, [beroenden]) ger samma funktion tills något i listan ändras.',
    task: 'Uppgift: Använd `useCallback` för `handleSave`, så att `SaveButton` inte ritas om när man skriver i fältet.',
    fileName: 'App.jsx',
    preview: '<Editor />',
    starterCode:
      "import { memo, useState } from 'react';\n\nlet buttonRenders = 0;\n\nconst SaveButton = memo(function SaveButton({ onSave }) {\n  buttonRenders++;\n  return <button onClick={onSave}>Spara</button>;\n});\n\nfunction Editor() {\n  const [text, setText] = useState('');\n  const [saved, setSaved] = useState(0);\n  const handleSave = () => setSaved(count => count + 1);\n  return (\n    <div>\n      <input value={text} onChange={event => setText(event.target.value)} />\n      <SaveButton onSave={handleSave} />\n      <p>Sparat {saved} gånger</p>\n    </div>\n  );\n}",
    solution:
      "import { memo, useCallback, useState } from 'react';\n\nlet buttonRenders = 0;\n\nconst SaveButton = memo(function SaveButton({ onSave }) {\n  buttonRenders++;\n  return <button onClick={onSave}>Spara</button>;\n});\n\nfunction Editor() {\n  const [text, setText] = useState('');\n  const [saved, setSaved] = useState(0);\n  const handleSave = useCallback(() => setSaved(count => count + 1), []);\n  return (\n    <div>\n      <input value={text} onChange={event => setText(event.target.value)} />\n      <SaveButton onSave={handleSave} />\n      <p>Sparat {saved} gånger</p>\n    </div>\n  );\n}",
    hints: [
      'Importera useCallback.',
      'useCallback(() => setSaved(count => count + 1), [])',
      'Tom beroendelista räcker, för setSaved med en funktion behöver inget annat.',
    ],
    tests: [
      {
        description: 'Skriv utan omritning',
        code: "(() => { const app = __mount(<Editor />); app.type('a'); app.type('ab'); return buttonRenders; })()",
        expected: 1,
      },
      {
        description: 'Spara fungerar',
        code: "__mount(<Editor />).click('Spara').click('Spara').text('p')",
        expected: 'Sparat 2 gånger',
      },
    ],
  },
  {
    id: 'performance-06',
    title: 'Ett nytt objekt varje gång',
    xp: 15,
    track: 'performance',
    isBoss: false,
    description:
      "{{ color: 'red' }} i JSX skapar ett nytt objekt vid varje ritning, så memo ritar om ändå. Ett objekt som aldrig ändras kan ligga utanför komponenten.",
    task: 'Uppgift: Flytta stilen till en konstant `BADGE_STYLE` utanför `Card`, så att `Badge` inte ritas om vid klick.',
    fileName: 'App.jsx',
    preview: '<Card />',
    starterCode:
      "import { memo, useState } from 'react';\n\nlet badgeRenders = 0;\n\nconst Badge = memo(function Badge({ style }) {\n  badgeRenders++;\n  return <span style={style}>Ny</span>;\n});\n\nfunction Card() {\n  const [likes, setLikes] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setLikes(likes + 1)}>Gilla {likes}</button>\n      <Badge style={{ color: 'red' }} />\n    </div>\n  );\n}",
    solution:
      "import { memo, useState } from 'react';\n\nlet badgeRenders = 0;\n\nconst Badge = memo(function Badge({ style }) {\n  badgeRenders++;\n  return <span style={style}>Ny</span>;\n});\n\nconst BADGE_STYLE = { color: 'red' };\n\nfunction Card() {\n  const [likes, setLikes] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setLikes(likes + 1)}>Gilla {likes}</button>\n      <Badge style={BADGE_STYLE} />\n    </div>\n  );\n}",
    hints: [
      "const BADGE_STYLE = { color: 'red' };",
      'Utanför Card.',
      '<Badge style={BADGE_STYLE} />',
    ],
    tests: [
      {
        description: 'Ritas en gång',
        code: "(__mount(<Card />).click('Gilla 0').click('Gilla 1'), badgeRenders)",
        expected: 1,
      },
    ],
  },
  {
    id: 'performance-07',
    title: 'Flytta ner state',
    xp: 20,
    track: 'performance',
    isBoss: false,
    description:
      'Ofta behövs varken memo eller useCallback. Om bara en liten del av sidan använder ett state kan det flyttas ner till en egen komponent. Då ritas bara den om.',
    task: 'Uppgift: Flytta fältet och dess state till en ny komponent `SearchBox`, så att `BigList` inte ritas om när man skriver. Använd inte `memo`.',
    fileName: 'App.jsx',
    preview: '<Page />',
    starterCode:
      "import { useState } from 'react';\n\nlet listRenders = 0;\n\nfunction BigList() {\n  listRenders++;\n  return (\n    <ul>\n      <li>Ett</li>\n      <li>Två</li>\n    </ul>\n  );\n}\n\nfunction Page() {\n  const [query, setQuery] = useState('');\n  return (\n    <div>\n      <input value={query} onChange={event => setQuery(event.target.value)} />\n      <p>Du söker: {query}</p>\n      <BigList />\n    </div>\n  );\n}",
    solution:
      "import { useState } from 'react';\n\nlet listRenders = 0;\n\nfunction BigList() {\n  listRenders++;\n  return (\n    <ul>\n      <li>Ett</li>\n      <li>Två</li>\n    </ul>\n  );\n}\n\nfunction SearchBox() {\n  const [query, setQuery] = useState('');\n  return (\n    <div>\n      <input value={query} onChange={event => setQuery(event.target.value)} />\n      <p>Du söker: {query}</p>\n    </div>\n  );\n}\n\nfunction Page() {\n  return (\n    <div>\n      <SearchBox />\n      <BigList />\n    </div>\n  );\n}",
    hints: [
      'function SearchBox() { … } med useState och fältet.',
      'Page behöver inget state alls.',
      '<SearchBox /> och <BigList /> bredvid varandra.',
    ],
    tests: [
      {
        description: 'Sökningen fungerar',
        code: "__mount(<Page />).type('hej').text('p')",
        expected: 'Du söker: hej',
      },
      {
        description: 'Listan ritas en gång',
        code: "(() => { const app = __mount(<Page />); app.type('h'); app.type('he'); return listRenders; })()",
        expected: 1,
      },
    ],
    sourceChecks: [
      { description: 'Ingen memo', pattern: /\bmemo\b/, forbidden: true },
    ],
  },
  {
    id: 'performance-08',
    title: 'Startvärdet en gång',
    xp: 15,
    track: 'performance',
    isBoss: false,
    description:
      'useState(dyrFunktion()) anropar funktionen vid varje ritning, fast värdet bara används första gången. useState(() => dyrFunktion()) anropar den bara en gång.',
    task: 'Uppgift: Laga `Notes` så att `loadNotes` bara anropas en gång.',
    fileName: 'App.jsx',
    preview: '<Notes />',
    starterCode:
      "import { useState } from 'react';\n\nlet loads = 0;\n\nfunction loadNotes() {\n  loads++;\n  return ['Handla', 'Städa'];\n}\n\nfunction Notes() {\n  const [notes, setNotes] = useState(loadNotes());\n  return (\n    <button onClick={() => setNotes([...notes, 'Ny'])}>\n      {notes.length} anteckningar\n    </button>\n  );\n}",
    solution:
      "import { useState } from 'react';\n\nlet loads = 0;\n\nfunction loadNotes() {\n  loads++;\n  return ['Handla', 'Städa'];\n}\n\nfunction Notes() {\n  const [notes, setNotes] = useState(() => loadNotes());\n  return (\n    <button onClick={() => setNotes([...notes, 'Ny'])}>\n      {notes.length} anteckningar\n    </button>\n  );\n}",
    hints: [
      'Hur många gånger anropas loadNotes nu?',
      'Ge useState en funktion i stället.',
      'useState(() => loadNotes())',
    ],
    tests: [
      {
        description: 'Ett anrop',
        code: "(__mount(<Notes />).click('2 anteckningar').click('3 anteckningar'), loads)",
        expected: 1,
      },
      {
        description: 'Fungerar',
        code: "__mount(<Notes />).click('2 anteckningar').text('button')",
        expected: '3 anteckningar',
      },
    ],
  },
  {
    id: 'performance-09',
    title: 'key börjar om',
    xp: 15,
    track: 'performance',
    isBoss: false,
    description:
      'När key ändras ser React en helt ny komponent, och dess state börjar om. Det är ett enkelt sätt att nollställa ett formulär när man byter till en annan sak.',
    task: 'Uppgift: Ge `Editor` `key={contact}` i `App`, så att texten töms när man byter kontakt.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode:
      "import { useState } from 'react';\n\nfunction Editor({ contact }) {\n  const [text, setText] = useState('');\n  return (\n    <div>\n      <p>Till {contact}</p>\n      <input value={text} onChange={event => setText(event.target.value)} />\n    </div>\n  );\n}\n\nfunction App() {\n  const [contact, setContact] = useState('Ada');\n  return (\n    <div>\n      <button onClick={() => setContact('Bo')}>Bo</button>\n      <Editor contact={contact} />\n    </div>\n  );\n}",
    solution:
      "import { useState } from 'react';\n\nfunction Editor({ contact }) {\n  const [text, setText] = useState('');\n  return (\n    <div>\n      <p>Till {contact}</p>\n      <input value={text} onChange={event => setText(event.target.value)} />\n    </div>\n  );\n}\n\nfunction App() {\n  const [contact, setContact] = useState('Ada');\n  return (\n    <div>\n      <button onClick={() => setContact('Bo')}>Bo</button>\n      <Editor key={contact} contact={contact} />\n    </div>\n  );\n}",
    hints: [
      'Var ritas Editor?',
      'Lägg till key på den.',
      '<Editor key={contact} contact={contact} />',
    ],
    tests: [
      {
        description: 'Texten töms',
        code: "(() => { const app = __mount(<App />); app.type('Hej Ada'); app.click('Bo'); return app.html().includes('value=\"\"'); })()",
        expected: true,
      },
    ],
  },
  {
    id: 'performance-boss-01',
    title: 'Boss: Den snabba listan',
    xp: 30,
    track: 'performance',
    isBoss: true,
    description:
      'En lista med sökning och favoriter, där varje rad bara ritas om när den själv ändras.',
    task: 'Uppgift: Skriv `ProductList({ products })`.\n  Ett sökfält filtrerar på namn (utan hänsyn till stora bokstäver) med `useMemo`.\n  `Item` är `memo`, visar `NAME` plus ` ★` för favoriter, och anropar `onToggle(id)` vid klick.\n  `favorites` är ett `Set` i state, och `onToggle` gjord med `useCallback` (med en funktion i `setFavorites`).\n  `itemRenders` räknar hur många gånger `Item` ritas.',
    fileName: 'App.jsx',
    preview:
      "<ProductList products={[{ id: 1, name: 'Mössa' }, { id: 2, name: 'Vantar' }, { id: 3, name: 'Keps' }]} />",
    starterCode:
      "import { memo, useCallback, useMemo, useState } from 'react';\n\nlet itemRenders = 0;\n",
    solution:
      "import { memo, useCallback, useMemo, useState } from 'react';\n\nlet itemRenders = 0;\n\nconst Item = memo(function Item({ product, isFavorite, onToggle }) {\n  itemRenders++;\n  return (\n    <li onClick={() => onToggle(product.id)}>\n      {product.name}\n      {isFavorite ? ' ★' : ''}\n    </li>\n  );\n});\n\nfunction ProductList({ products }) {\n  const [query, setQuery] = useState('');\n  const [favorites, setFavorites] = useState(new Set());\n\n  const visible = useMemo(\n    () =>\n      products.filter(product =>\n        product.name.toLowerCase().includes(query.toLowerCase()),\n      ),\n    [products, query],\n  );\n\n  const onToggle = useCallback(id => {\n    setFavorites(previous => {\n      const next = new Set(previous);\n      if (next.has(id)) {\n        next.delete(id);\n      } else {\n        next.add(id);\n      }\n      return next;\n    });\n  }, []);\n\n  return (\n    <div>\n      <input value={query} onChange={event => setQuery(event.target.value)} />\n      <ul>\n        {visible.map(product => (\n          <Item\n            key={product.id}\n            product={product}\n            isFavorite={favorites.has(product.id)}\n            onToggle={onToggle}\n          />\n        ))}\n      </ul>\n    </div>\n  );\n}",
    hints: [],
    tests: [
      {
        description: 'Sökning',
        code: "(() => { const products = [{ id: 1, name: 'Mössa' }, { id: 2, name: 'Vantar' }]; return __mount(<ProductList products={products} />).type('MÖ').count('li'); })()",
        expected: 1,
      },
      {
        description: 'Favorit',
        code: "(() => { const products = [{ id: 1, name: 'Mössa' }, { id: 2, name: 'Vantar' }]; return __mount(<ProductList products={products} />).click('Vantar').text('ul'); })()",
        expected: 'MössaVantar ★',
      },
      {
        description: 'Bara den klickade ritas om',
        code: "(() => { const products = [{ id: 1, name: 'Mössa' }, { id: 2, name: 'Vantar' }, { id: 3, name: 'Keps' }]; const app = __mount(<ProductList products={products} />); const before = itemRenders; app.click('Vantar'); return itemRenders - before; })()",
        expected: 1,
      },
    ],
  },
  {
    id: 'react-final-01',
    title: 'Hundkortet',
    xp: 10,
    track: 'react-final',
    isBoss: false,
    description:
      'Slutprojektet är en bokningsapp för hundpensionatet Tassen, som i SQL-, TypeScript- och Flask-kurserna. Den byggs en del i taget med allt från React-banorna. Först en komponent för en hund.',
    task: 'Uppgift: Skriv `DogCard({ dog })` som visar `<article>` med `<h3>NAME</h3>` och `<p>Storlek: SIZE</p>`.',
    fileName: 'App.jsx',
    preview: '<DogCard dog={DOGS[0]} />',
    starterCode:
      "const DOGS = [\n  { id: 1, name: 'Bamse', size: 'stor' },\n  { id: 2, name: 'Saga', size: 'liten' },\n  { id: 3, name: 'Rufus', size: 'mellan' },\n];\n",
    solution:
      "const DOGS = [\n  { id: 1, name: 'Bamse', size: 'stor' },\n  { id: 2, name: 'Saga', size: 'liten' },\n  { id: 3, name: 'Rufus', size: 'mellan' },\n];\n\nfunction DogCard({ dog }) {\n  return (\n    <article>\n      <h3>{dog.name}</h3>\n      <p>Storlek: {dog.size}</p>\n    </article>\n  );\n}",
    hints: [
      'function DogCard({ dog }) { … }',
      '<h3>{dog.name}</h3>',
      '<p>Storlek: {dog.size}</p>',
    ],
    tests: [
      {
        description: 'Bamse',
        code: '__render(<DogCard dog={DOGS[0]} />)',
        expected: '<article><h3>Bamse</h3><p>Storlek: stor</p></article>',
      },
    ],
  },
  {
    id: 'react-final-02',
    title: 'Alla hundar',
    xp: 15,
    track: 'react-final',
    isBoss: false,
    description:
      'Listan över hundarna får ett filter på storlek. Det är ett kontrollerat select, som i formulärbanan.',
    task: 'Uppgift: Skriv `DogList({ dogs })` med en `select` (`alla`, `liten`, `mellan`, `stor`, börjar på `alla`) och ett `DogCard` per hund som passar filtret.',
    fileName: 'App.jsx',
    preview: '<DogList dogs={DOGS} />',
    starterCode:
      "import { useState } from 'react';\n\nconst DOGS = [\n  { id: 1, name: 'Bamse', size: 'stor' },\n  { id: 2, name: 'Saga', size: 'liten' },\n  { id: 3, name: 'Rufus', size: 'mellan' },\n];\n\nfunction DogCard({ dog }) {\n  return (\n    <article>\n      <h3>{dog.name}</h3>\n      <p>Storlek: {dog.size}</p>\n    </article>\n  );\n}\n",
    solution:
      "import { useState } from 'react';\n\nconst DOGS = [\n  { id: 1, name: 'Bamse', size: 'stor' },\n  { id: 2, name: 'Saga', size: 'liten' },\n  { id: 3, name: 'Rufus', size: 'mellan' },\n];\n\nfunction DogCard({ dog }) {\n  return (\n    <article>\n      <h3>{dog.name}</h3>\n      <p>Storlek: {dog.size}</p>\n    </article>\n  );\n}\n\nfunction DogList({ dogs }) {\n  const [size, setSize] = useState('alla');\n  const shown = dogs.filter(dog => size === 'alla' || dog.size === size);\n  return (\n    <div>\n      <select value={size} onChange={event => setSize(event.target.value)}>\n        <option value=\"alla\">Alla</option>\n        <option value=\"liten\">Liten</option>\n        <option value=\"mellan\">Mellan</option>\n        <option value=\"stor\">Stor</option>\n      </select>\n      {shown.map(dog => (\n        <DogCard key={dog.id} dog={dog} />\n      ))}\n    </div>\n  );\n}",
    hints: [
      "useState('alla')",
      "dogs.filter(dog => size === 'alla' || dog.size === size)",
      '<DogCard key={dog.id} dog={dog} />',
    ],
    tests: [
      {
        description: 'Alla',
        code: "__mount(<DogList dogs={DOGS} />).count('article')",
        expected: 3,
      },
      {
        description: 'Bara stora',
        code: "__mount(<DogList dogs={DOGS} />).type('stor').text('h3')",
        expected: 'Bamse',
      },
    ],
  },
  {
    id: 'react-final-03',
    title: 'Bokningarna i en reducer',
    xp: 15,
    track: 'react-final',
    isBoss: false,
    description:
      'Bokningarna ändras på två sätt: man bokar och avbokar. Det passar en reducer.',
    task: "Uppgift: Skriv `bookingsReducer`. `'book'` lägger till `action.booking`, och `'cancel'` tar bort bokningen med `action.id`.",
    fileName: 'App.jsx',
    starterCode: '// Skriv din kod här',
    solution:
      "function bookingsReducer(state, action) {\n  if (action.type === 'book') {\n    return [...state, action.booking];\n  }\n  if (action.type === 'cancel') {\n    return state.filter(booking => booking.id !== action.id);\n  }\n  return state;\n}",
    hints: [
      "if (action.type === 'book') return [...state, action.booking];",
      'state.filter(booking => booking.id !== action.id)',
      'return state; sist.',
    ],
    tests: [
      {
        description: 'book',
        code: "bookingsReducer([], { type: 'book', booking: { id: 'a' } })",
        expected: [{ id: 'a' }],
      },
      {
        description: 'cancel',
        code: "bookingsReducer([{ id: 'a' }, { id: 'b' }], { type: 'cancel', id: 'a' })",
        expected: [{ id: 'b' }],
      },
    ],
  },
  {
    id: 'react-final-04',
    title: 'Context för bokningarna',
    xp: 15,
    track: 'react-final',
    isBoss: false,
    description:
      'Formuläret och listan ligger på olika ställen men delar bokningarna. En context med reducern och en hook gör det enkelt.',
    task: 'Uppgift: Skriv `BookingsContext`, `BookingsProvider({ children })` med `useReducer(bookingsReducer, [])`, och `useBookings()` som ger `{ bookings, dispatch }`.',
    fileName: 'App.jsx',
    starterCode:
      "import { createContext, useContext, useReducer, useState } from 'react';\n\nfunction bookingsReducer(state, action) {\n  if (action.type === 'book') {\n    return [...state, action.booking];\n  }\n  if (action.type === 'cancel') {\n    return state.filter(booking => booking.id !== action.id);\n  }\n  return state;\n}\n",
    solution:
      "import { createContext, useContext, useReducer, useState } from 'react';\n\nfunction bookingsReducer(state, action) {\n  if (action.type === 'book') {\n    return [...state, action.booking];\n  }\n  if (action.type === 'cancel') {\n    return state.filter(booking => booking.id !== action.id);\n  }\n  return state;\n}\n\nconst BookingsContext = createContext(null);\n\nfunction BookingsProvider({ children }) {\n  const [bookings, dispatch] = useReducer(bookingsReducer, []);\n  return (\n    <BookingsContext value={{ bookings, dispatch }}>{children}</BookingsContext>\n  );\n}\n\nfunction useBookings() {\n  return useContext(BookingsContext);\n}",
    hints: [
      'const BookingsContext = createContext(null);',
      'BookingsProvider ger value={{ bookings, dispatch }}.',
      'function useBookings() { return useContext(BookingsContext); }',
    ],
    tests: [
      {
        description: 'Delar bokningarna',
        code: "(() => { function Book() { const { dispatch } = useBookings(); return <button onClick={() => dispatch({ type: 'book', booking: { id: 'a' } })}>Boka</button>; } function Count() { const { bookings } = useBookings(); return <p>{bookings.length}</p>; } return __mount(<BookingsProvider><Book /><Count /></BookingsProvider>).click('Boka').text('p'); })()",
        expected: '1',
      },
    ],
  },
  {
    id: 'react-final-05',
    title: 'Bokningsformuläret',
    xp: 20,
    track: 'react-final',
    isBoss: false,
    description:
      'Formuläret samlar hund och datum i ett state, kontrollerar datumen och skickar en action. Datumen skrivs som 2026-06-10, som går att jämföra som text.',
    task: 'Uppgift: Skriv `BookingForm({ dogs })` med en `select name="dogId"` och fälten `from` och `to`. Är `to` inte efter `from` visas `Till måste vara efter från` i `p.error`. Annars bokas `{ id, dogId (tal), from, to }`.',
    fileName: 'App.jsx',
    preview:
      '<BookingsProvider><BookingForm dogs={DOGS} /><BookingCount /></BookingsProvider>',
    starterCode:
      "import { createContext, useContext, useReducer, useState } from 'react';\n\nconst DOGS = [\n  { id: 1, name: 'Bamse', size: 'stor' },\n  { id: 2, name: 'Saga', size: 'liten' },\n  { id: 3, name: 'Rufus', size: 'mellan' },\n];\nfunction bookingsReducer(state, action) {\n  if (action.type === 'book') {\n    return [...state, action.booking];\n  }\n  if (action.type === 'cancel') {\n    return state.filter(booking => booking.id !== action.id);\n  }\n  return state;\n}\n\nconst BookingsContext = createContext(null);\n\nfunction BookingsProvider({ children }) {\n  const [bookings, dispatch] = useReducer(bookingsReducer, []);\n  return (\n    <BookingsContext value={{ bookings, dispatch }}>{children}</BookingsContext>\n  );\n}\n\nfunction useBookings() {\n  return useContext(BookingsContext);\n}\n\nfunction BookingCount() {\n  const { bookings } = useBookings();\n  return <p>{bookings.length} bokningar</p>;\n}",
    solution:
      "import { createContext, useContext, useReducer, useState } from 'react';\n\nconst DOGS = [\n  { id: 1, name: 'Bamse', size: 'stor' },\n  { id: 2, name: 'Saga', size: 'liten' },\n  { id: 3, name: 'Rufus', size: 'mellan' },\n];\nfunction bookingsReducer(state, action) {\n  if (action.type === 'book') {\n    return [...state, action.booking];\n  }\n  if (action.type === 'cancel') {\n    return state.filter(booking => booking.id !== action.id);\n  }\n  return state;\n}\n\nconst BookingsContext = createContext(null);\n\nfunction BookingsProvider({ children }) {\n  const [bookings, dispatch] = useReducer(bookingsReducer, []);\n  return (\n    <BookingsContext value={{ bookings, dispatch }}>{children}</BookingsContext>\n  );\n}\n\nfunction useBookings() {\n  return useContext(BookingsContext);\n}\n\nfunction BookingForm({ dogs }) {\n  const { dispatch } = useBookings();\n  const [form, setForm] = useState({ dogId: '1', from: '', to: '' });\n  const [error, setError] = useState('');\n\n  function handleChange(event) {\n    setForm({ ...form, [event.target.name]: event.target.value });\n  }\n\n  function handleSubmit(event) {\n    event.preventDefault();\n    if (!form.from || !form.to || form.to <= form.from) {\n      setError('Till måste vara efter från');\n      return;\n    }\n    dispatch({\n      type: 'book',\n      booking: { id: crypto.randomUUID(), ...form, dogId: Number(form.dogId) },\n    });\n    setError('');\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <select name=\"dogId\" value={form.dogId} onChange={handleChange}>\n        {dogs.map(dog => (\n          <option key={dog.id} value={dog.id}>\n            {dog.name}\n          </option>\n        ))}\n      </select>\n      <input name=\"from\" value={form.from} onChange={handleChange} />\n      <input name=\"to\" value={form.to} onChange={handleChange} />\n      <button>Boka</button>\n      {error && <p className=\"error\">{error}</p>}\n    </form>\n  );\n}\n\nfunction BookingCount() {\n  const { bookings } = useBookings();\n  return <p>{bookings.length} bokningar</p>;\n}",
    hints: [
      "const [form, setForm] = useState({ dogId: '1', from: '', to: '' });",
      'if (!form.from || !form.to || form.to <= form.from) { setError(…); return; }',
      "dispatch({ type: 'book', booking: { id: crypto.randomUUID(), ...form, dogId: Number(form.dogId) } })",
    ],
    tests: [
      {
        description: 'Bokar',
        code: "(() => { const app = __mount(<BookingsProvider><BookingForm dogs={DOGS} /><BookingCount /></BookingsProvider>); app.type('2', 0); app.type('2026-06-10', 1); app.type('2026-06-13', 2); app.submit(); return app.text('p'); })()",
        expected: '1 bokningar',
      },
      {
        description: 'Fel datum',
        code: "(() => { const app = __mount(<BookingsProvider><BookingForm dogs={DOGS} /><BookingCount /></BookingsProvider>); app.type('2026-06-13', 1); app.type('2026-06-10', 2); app.submit(); return app.html().includes('Till måste vara efter från'); })()",
        expected: true,
      },
    ],
  },
  {
    id: 'react-final-06',
    title: 'Bokningslistan',
    xp: 15,
    track: 'react-final',
    isBoss: false,
    description:
      'Listan läser bokningarna från contexten och slår upp hundens namn. Avboka skickar en action.',
    task: 'Uppgift: Skriv `BookingList({ dogs })` med en `li` per bokning: `NAME: FROM–TO` och en knapp `Avboka`.',
    fileName: 'App.jsx',
    starterCode:
      "import { createContext, useContext, useReducer, useState } from 'react';\n\nconst DOGS = [\n  { id: 1, name: 'Bamse', size: 'stor' },\n  { id: 2, name: 'Saga', size: 'liten' },\n  { id: 3, name: 'Rufus', size: 'mellan' },\n];\nfunction bookingsReducer(state, action) {\n  if (action.type === 'book') {\n    return [...state, action.booking];\n  }\n  if (action.type === 'cancel') {\n    return state.filter(booking => booking.id !== action.id);\n  }\n  return state;\n}\n\nconst BookingsContext = createContext(null);\n\nfunction BookingsProvider({ children }) {\n  const [bookings, dispatch] = useReducer(bookingsReducer, []);\n  return (\n    <BookingsContext value={{ bookings, dispatch }}>{children}</BookingsContext>\n  );\n}\n\nfunction useBookings() {\n  return useContext(BookingsContext);\n}\n",
    solution:
      "import { createContext, useContext, useReducer, useState } from 'react';\n\nconst DOGS = [\n  { id: 1, name: 'Bamse', size: 'stor' },\n  { id: 2, name: 'Saga', size: 'liten' },\n  { id: 3, name: 'Rufus', size: 'mellan' },\n];\nfunction bookingsReducer(state, action) {\n  if (action.type === 'book') {\n    return [...state, action.booking];\n  }\n  if (action.type === 'cancel') {\n    return state.filter(booking => booking.id !== action.id);\n  }\n  return state;\n}\n\nconst BookingsContext = createContext(null);\n\nfunction BookingsProvider({ children }) {\n  const [bookings, dispatch] = useReducer(bookingsReducer, []);\n  return (\n    <BookingsContext value={{ bookings, dispatch }}>{children}</BookingsContext>\n  );\n}\n\nfunction useBookings() {\n  return useContext(BookingsContext);\n}\n\nfunction BookingList({ dogs }) {\n  const { bookings, dispatch } = useBookings();\n  return (\n    <ul>\n      {bookings.map(booking => (\n        <li key={booking.id}>\n          {dogs.find(dog => dog.id === booking.dogId).name}: {booking.from}–\n          {booking.to}\n          <button onClick={() => dispatch({ type: 'cancel', id: booking.id })}>\n            Avboka\n          </button>\n        </li>\n      ))}\n    </ul>\n  );\n}",
    hints: [
      'const { bookings, dispatch } = useBookings();',
      'dogs.find(dog => dog.id === booking.dogId).name',
      "dispatch({ type: 'cancel', id: booking.id })",
    ],
    tests: [
      {
        description: 'En bokning',
        code: "(() => { function Seed() { const { dispatch } = useBookings(); return <button onClick={() => dispatch({ type: 'book', booking: { id: 'a', dogId: 2, from: '2026-06-10', to: '2026-06-12' } })}>Fyll</button>; } return __mount(<BookingsProvider><Seed /><BookingList dogs={DOGS} /></BookingsProvider>).click('Fyll').text('li'); })()",
        expected: 'Saga: 2026-06-10–2026-06-12Avboka',
      },
      {
        description: 'Avboka',
        code: "(() => { function Seed() { const { dispatch } = useBookings(); return <button onClick={() => dispatch({ type: 'book', booking: { id: 'a', dogId: 2, from: '2026-06-10', to: '2026-06-12' } })}>Fyll</button>; } return __mount(<BookingsProvider><Seed /><BookingList dogs={DOGS} /></BookingsProvider>).click('Fyll').click('Avboka').count('li'); })()",
        expected: 0,
      },
    ],
  },
  {
    id: 'react-final-07',
    title: 'Pris per natt',
    xp: 15,
    track: 'react-final',
    isBoss: false,
    description:
      'Priset räknas ut från datumen och hundens storlek. Det är vanlig JavaScript i en hjälpfunktion, och komponenten visar bara svaret.',
    task: 'Uppgift: Skriv `nights(from, to)` (antal nätter mellan datumen) och `bookingPrice(booking, dogs)` som ger nätter gånger `PRICE_PER_NIGHT` för hundens storlek.',
    fileName: 'App.jsx',
    starterCode:
      "const DOGS = [\n  { id: 1, name: 'Bamse', size: 'stor' },\n  { id: 2, name: 'Saga', size: 'liten' },\n  { id: 3, name: 'Rufus', size: 'mellan' },\n];\n\nconst PRICE_PER_NIGHT = { liten: 250, mellan: 300, stor: 350 };\n",
    solution:
      "const DOGS = [\n  { id: 1, name: 'Bamse', size: 'stor' },\n  { id: 2, name: 'Saga', size: 'liten' },\n  { id: 3, name: 'Rufus', size: 'mellan' },\n];\n\nconst PRICE_PER_NIGHT = { liten: 250, mellan: 300, stor: 350 };\n\nfunction nights(from, to) {\n  return (new Date(to) - new Date(from)) / 86400000;\n}\n\nfunction bookingPrice(booking, dogs) {\n  const dog = dogs.find(item => item.id === booking.dogId);\n  return nights(booking.from, booking.to) * PRICE_PER_NIGHT[dog.size];\n}",
    hints: [
      '(new Date(to) - new Date(from)) / 86400000 ger antalet dygn.',
      'Leta upp hunden med find.',
      'nights(…) * PRICE_PER_NIGHT[dog.size]',
    ],
    tests: [
      {
        description: 'Tre nätter',
        code: "nights('2026-06-10', '2026-06-13')",
        expected: 3,
      },
      {
        description: 'Bamse',
        code: "bookingPrice({ dogId: 1, from: '2026-06-10', to: '2026-06-13' }, DOGS)",
        expected: 1050,
      },
    ],
  },
  {
    id: 'react-final-08',
    title: 'Sparas mellan besöken',
    xp: 20,
    track: 'react-final',
    isBoss: false,
    description:
      'Bokningarna ska finnas kvar när sidan laddas om. useReducer kan få en tredje parameter som räknar ut startläget, och en effekt sparar när bokningarna ändras.',
    task: "Uppgift: Låt `BookingsProvider` läsa startläget från `localStorage` (`'bookings'`, tom lista om inget finns) och spara med en effekt när bokningarna ändras.",
    fileName: 'App.jsx',
    starterCode:
      "import { createContext, useContext, useReducer, useState } from 'react';\n\nfunction bookingsReducer(state, action) {\n  if (action.type === 'book') {\n    return [...state, action.booking];\n  }\n  if (action.type === 'cancel') {\n    return state.filter(booking => booking.id !== action.id);\n  }\n  return state;\n}\n\nconst BookingsContext = createContext(null);\n\nfunction BookingsProvider({ children }) {\n  const [bookings, dispatch] = useReducer(bookingsReducer, []);\n  return (\n    <BookingsContext value={{ bookings, dispatch }}>{children}</BookingsContext>\n  );\n}\n\nfunction useBookings() {\n  return useContext(BookingsContext);\n}\n",
    solution:
      "import {\n  createContext,\n  useContext,\n  useEffect,\n  useReducer,\n  useState,\n} from 'react';\n\nfunction bookingsReducer(state, action) {\n  if (action.type === 'book') {\n    return [...state, action.booking];\n  }\n  if (action.type === 'cancel') {\n    return state.filter(booking => booking.id !== action.id);\n  }\n  return state;\n}\n\nconst BookingsContext = createContext(null);\n\nfunction BookingsProvider({ children }) {\n  const [bookings, dispatch] = useReducer(bookingsReducer, [], () =>\n    JSON.parse(localStorage.getItem('bookings') ?? '[]'),\n  );\n\n  useEffect(() => {\n    localStorage.setItem('bookings', JSON.stringify(bookings));\n  }, [bookings]);\n  return (\n    <BookingsContext value={{ bookings, dispatch }}>{children}</BookingsContext>\n  );\n}\n\nfunction useBookings() {\n  return useContext(BookingsContext);\n}",
    hints: [
      "useReducer(bookingsReducer, [], () => JSON.parse(localStorage.getItem('bookings') ?? '[]'))",
      "useEffect(() => { localStorage.setItem('bookings', JSON.stringify(bookings)); }, [bookings]);",
      'Importera useEffect.',
    ],
    tests: [
      {
        description: 'Läses',
        code: "(() => { localStorage.setItem('bookings', JSON.stringify([{ id: 'x' }])); function Count() { const { bookings } = useBookings(); return <p>{bookings.length}</p>; } return __mount(<BookingsProvider><Count /></BookingsProvider>).text('p'); })()",
        expected: '1',
      },
      {
        description: 'Sparas',
        code: "(() => { function Book() { const { dispatch } = useBookings(); return <button onClick={() => dispatch({ type: 'book', booking: { id: 'a' } })}>Boka</button>; } __mount(<BookingsProvider><Book /></BookingsProvider>).click('Boka'); return JSON.parse(localStorage.getItem('bookings')).length; })()",
        expected: 1,
      },
    ],
  },
  {
    id: 'react-final-09',
    title: 'Snabba hundkort',
    xp: 15,
    track: 'react-final',
    isBoss: false,
    description:
      'Varje gång en hund väljs ritas alla kort om, fast bara ett ändrats. memo på kortet och useCallback på funktionen löser det.',
    task: 'Uppgift: Gör `DogCard` till `memo` och `pick` i `DogPicker` till `useCallback`, så att inget kort ritas om när man väljer.',
    fileName: 'App.jsx',
    preview: '<DogPicker />',
    starterCode:
      "import { useState } from 'react';\n\nconst DOGS = [\n  { id: 1, name: 'Bamse', size: 'stor' },\n  { id: 2, name: 'Saga', size: 'liten' },\n  { id: 3, name: 'Rufus', size: 'mellan' },\n];\n\nlet cardRenders = 0;\n\nfunction DogCard({ dog, onPick }) {\n  cardRenders++;\n  return (\n    <article>\n      <h3>{dog.name}</h3>\n      <button onClick={() => onPick(dog.id)}>Välj {dog.name}</button>\n    </article>\n  );\n}\n\nfunction DogPicker() {\n  const [picked, setPicked] = useState(null);\n  const pick = id => setPicked(id);\n  return (\n    <div>\n      {DOGS.map(dog => (\n        <DogCard key={dog.id} dog={dog} onPick={pick} />\n      ))}\n      <p>Vald: {picked ?? 'ingen'}</p>\n    </div>\n  );\n}",
    solution:
      "import { memo, useCallback, useState } from 'react';\n\nconst DOGS = [\n  { id: 1, name: 'Bamse', size: 'stor' },\n  { id: 2, name: 'Saga', size: 'liten' },\n  { id: 3, name: 'Rufus', size: 'mellan' },\n];\n\nlet cardRenders = 0;\n\nconst DogCard = memo(function DogCard({ dog, onPick }) {\n  cardRenders++;\n  return (\n    <article>\n      <h3>{dog.name}</h3>\n      <button onClick={() => onPick(dog.id)}>Välj {dog.name}</button>\n    </article>\n  );\n});\n\nfunction DogPicker() {\n  const [picked, setPicked] = useState(null);\n  const pick = useCallback(id => setPicked(id), []);\n  return (\n    <div>\n      {DOGS.map(dog => (\n        <DogCard key={dog.id} dog={dog} onPick={pick} />\n      ))}\n      <p>Vald: {picked ?? 'ingen'}</p>\n    </div>\n  );\n}",
    hints: [
      'const DogCard = memo(function DogCard({ dog, onPick }) { … });',
      'const pick = useCallback(id => setPicked(id), []);',
      'Importera memo och useCallback.',
    ],
    tests: [
      {
        description: 'Välj',
        code: "__mount(<DogPicker />).click('Välj Saga').text('p')",
        expected: 'Vald: 2',
      },
      {
        description: 'Korten ritas en gång',
        code: "(__mount(<DogPicker />).click('Välj Saga').click('Välj Bamse'), cardRenders)",
        expected: 3,
      },
    ],
  },
  {
    id: 'react-final-boss-01',
    title: 'Boss: Tassens bokningsapp',
    xp: 40,
    track: 'react-final',
    isBoss: true,
    description:
      'Allt sätts ihop till en app. Delarna från banan finns i startkoden.',
    task: 'Uppgift: Skriv `Total({ dogs })` som visar `<p>Totalt: SUM kr</p>` för alla bokningar, och `App` med `BookingsProvider` runt `<h1>🐾 Tassen</h1>`, `BookingForm`, `BookingList` och `Total`.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode:
      "import { createContext, useContext, useEffect, useReducer, useState } from 'react';\n\nconst DOGS = [\n  { id: 1, name: 'Bamse', size: 'stor' },\n  { id: 2, name: 'Saga', size: 'liten' },\n  { id: 3, name: 'Rufus', size: 'mellan' },\n];\n\nconst PRICE_PER_NIGHT = { liten: 250, mellan: 300, stor: 350 };\n\nfunction nights(from, to) {\n  return (new Date(to) - new Date(from)) / 86400000;\n}\n\nfunction bookingPrice(booking, dogs) {\n  const dog = dogs.find(item => item.id === booking.dogId);\n  return nights(booking.from, booking.to) * PRICE_PER_NIGHT[dog.size];\n}\n\nfunction bookingsReducer(state, action) {\n  if (action.type === 'book') {\n    return [...state, action.booking];\n  }\n  if (action.type === 'cancel') {\n    return state.filter(booking => booking.id !== action.id);\n  }\n  return state;\n}\n\nconst BookingsContext = createContext(null);\n\nfunction BookingsProvider({ children }) {\n  const [bookings, dispatch] = useReducer(bookingsReducer, [], () =>\n    JSON.parse(localStorage.getItem('bookings') ?? '[]'),\n  );\n\n  useEffect(() => {\n    localStorage.setItem('bookings', JSON.stringify(bookings));\n  }, [bookings]);\n  return (\n    <BookingsContext value={{ bookings, dispatch }}>{children}</BookingsContext>\n  );\n}\n\nfunction useBookings() {\n  return useContext(BookingsContext);\n}\n\nfunction BookingForm({ dogs }) {\n  const { dispatch } = useBookings();\n  const [form, setForm] = useState({ dogId: '1', from: '', to: '' });\n  const [error, setError] = useState('');\n\n  function handleChange(event) {\n    setForm({ ...form, [event.target.name]: event.target.value });\n  }\n\n  function handleSubmit(event) {\n    event.preventDefault();\n    if (!form.from || !form.to || form.to <= form.from) {\n      setError('Till måste vara efter från');\n      return;\n    }\n    dispatch({\n      type: 'book',\n      booking: { id: crypto.randomUUID(), ...form, dogId: Number(form.dogId) },\n    });\n    setError('');\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <select name=\"dogId\" value={form.dogId} onChange={handleChange}>\n        {dogs.map(dog => (\n          <option key={dog.id} value={dog.id}>\n            {dog.name}\n          </option>\n        ))}\n      </select>\n      <input name=\"from\" value={form.from} onChange={handleChange} />\n      <input name=\"to\" value={form.to} onChange={handleChange} />\n      <button>Boka</button>\n      {error && <p className=\"error\">{error}</p>}\n    </form>\n  );\n}\n\nfunction BookingList({ dogs }) {\n  const { bookings, dispatch } = useBookings();\n  return (\n    <ul>\n      {bookings.map(booking => (\n        <li key={booking.id}>\n          {dogs.find(dog => dog.id === booking.dogId).name}: {booking.from}–\n          {booking.to}\n          <button onClick={() => dispatch({ type: 'cancel', id: booking.id })}>\n            Avboka\n          </button>\n        </li>\n      ))}\n    </ul>\n  );\n}\n",
    solution:
      "import {\n  createContext,\n  useContext,\n  useEffect,\n  useReducer,\n  useState,\n} from 'react';\n\nconst DOGS = [\n  { id: 1, name: 'Bamse', size: 'stor' },\n  { id: 2, name: 'Saga', size: 'liten' },\n  { id: 3, name: 'Rufus', size: 'mellan' },\n];\n\nconst PRICE_PER_NIGHT = { liten: 250, mellan: 300, stor: 350 };\n\nfunction nights(from, to) {\n  return (new Date(to) - new Date(from)) / 86400000;\n}\n\nfunction bookingPrice(booking, dogs) {\n  const dog = dogs.find(item => item.id === booking.dogId);\n  return nights(booking.from, booking.to) * PRICE_PER_NIGHT[dog.size];\n}\n\nfunction bookingsReducer(state, action) {\n  if (action.type === 'book') {\n    return [...state, action.booking];\n  }\n  if (action.type === 'cancel') {\n    return state.filter(booking => booking.id !== action.id);\n  }\n  return state;\n}\n\nconst BookingsContext = createContext(null);\n\nfunction BookingsProvider({ children }) {\n  const [bookings, dispatch] = useReducer(bookingsReducer, [], () =>\n    JSON.parse(localStorage.getItem('bookings') ?? '[]'),\n  );\n\n  useEffect(() => {\n    localStorage.setItem('bookings', JSON.stringify(bookings));\n  }, [bookings]);\n  return (\n    <BookingsContext value={{ bookings, dispatch }}>{children}</BookingsContext>\n  );\n}\n\nfunction useBookings() {\n  return useContext(BookingsContext);\n}\n\nfunction BookingForm({ dogs }) {\n  const { dispatch } = useBookings();\n  const [form, setForm] = useState({ dogId: '1', from: '', to: '' });\n  const [error, setError] = useState('');\n\n  function handleChange(event) {\n    setForm({ ...form, [event.target.name]: event.target.value });\n  }\n\n  function handleSubmit(event) {\n    event.preventDefault();\n    if (!form.from || !form.to || form.to <= form.from) {\n      setError('Till måste vara efter från');\n      return;\n    }\n    dispatch({\n      type: 'book',\n      booking: { id: crypto.randomUUID(), ...form, dogId: Number(form.dogId) },\n    });\n    setError('');\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <select name=\"dogId\" value={form.dogId} onChange={handleChange}>\n        {dogs.map(dog => (\n          <option key={dog.id} value={dog.id}>\n            {dog.name}\n          </option>\n        ))}\n      </select>\n      <input name=\"from\" value={form.from} onChange={handleChange} />\n      <input name=\"to\" value={form.to} onChange={handleChange} />\n      <button>Boka</button>\n      {error && <p className=\"error\">{error}</p>}\n    </form>\n  );\n}\n\nfunction BookingList({ dogs }) {\n  const { bookings, dispatch } = useBookings();\n  return (\n    <ul>\n      {bookings.map(booking => (\n        <li key={booking.id}>\n          {dogs.find(dog => dog.id === booking.dogId).name}: {booking.from}–\n          {booking.to}\n          <button onClick={() => dispatch({ type: 'cancel', id: booking.id })}>\n            Avboka\n          </button>\n        </li>\n      ))}\n    </ul>\n  );\n}\n\nfunction Total({ dogs }) {\n  const { bookings } = useBookings();\n  const total = bookings.reduce(\n    (sum, booking) => sum + bookingPrice(booking, dogs),\n    0,\n  );\n  return <p>Totalt: {total} kr</p>;\n}\n\nfunction App() {\n  return (\n    <BookingsProvider>\n      <h1>🐾 Tassen</h1>\n      <BookingForm dogs={DOGS} />\n      <BookingList dogs={DOGS} />\n      <Total dogs={DOGS} />\n    </BookingsProvider>\n  );\n}",
    hints: [],
    tests: [
      {
        description: 'Boka två',
        code: "(() => { const app = __mount(<App />); app.type('1', 0); app.type('2026-06-10', 1); app.type('2026-06-13', 2); app.submit(); app.type('2', 0); app.type('2026-06-10', 1); app.type('2026-06-12', 2); app.submit(); return [app.count('li'), app.text('p')]; })()",
        expected: [2, 'Totalt: 1550 kr'],
      },
      {
        description: 'Avboka',
        code: "(() => { const app = __mount(<App />); app.type('1', 0); app.type('2026-06-10', 1); app.type('2026-06-13', 2); app.submit(); app.click('Avboka'); return app.text('p'); })()",
        expected: 'Totalt: 0 kr',
      },
      {
        description: 'Rubriken',
        code: "__mount(<App />).text('h1')",
        expected: '🐾 Tassen',
      },
    ],
  },
];
