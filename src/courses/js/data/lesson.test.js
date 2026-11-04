import { describe, expect, it } from 'vitest';
import { evaluate } from '../runner/evaluate';
import { findMissingSemicolons } from '../runner/style';
import { lessons } from './lesson';
import { tracks } from './tracks';

async function check(lesson, code) {
  const { error, results } = await evaluate(
    code,
    lesson.tests,
    lesson.sourceChecks,
    {
      fileName: lesson.fileName,
      files: lesson.files,
      preview: lesson.preview,
    },
  );
  const failed = results.filter(result => !result.passed);
  return {
    passed: !error && failed.length === 0,
    reason: error ?? failed.map(result => result.description).join(', '),
  };
}

function findLesson(id) {
  const lesson = lessons.find(item => item.id === id);
  if (!lesson) throw new Error(`Hittar ingen lektion med id ${id}`);
  return lesson;
}

describe('lektionsdata', () => {
  it('har unika id:n', () => {
    const ids = lessons.map(lesson => lesson.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(lessons)('$id tillhör en bana som finns', async lesson => {
    expect(tracks.map(track => track.id)).toContain(lesson.track);
  });

  it.each(tracks)('$id har länkar till dokumentationen', track => {
    expect(track.docs.length).toBeGreaterThan(0);
    for (const doc of track.docs) {
      expect(doc.url).toMatch(
        /^https:\/\/(developer\.mozilla\.org|react\.dev)\//,
      );
    }
  });

  it('har lektionerna i samma ordning som banorna', () => {
    const order = lessons
      .map(lesson => lesson.track)
      .filter((track, index, all) => track !== all[index - 1]);
    expect(order).toEqual(tracks.map(track => track.id));
  });

  it.each(lessons)('$id har tester', async lesson => {
    expect(lesson.tests.length).toBeGreaterThan(0);
  });

  it.each(lessons.filter(lesson => lesson.explain))(
    '$id har ett exempel som inte är lösningen',
    lesson => {
      expect(lesson.example).toBeTruthy();
      expect(lesson.example).not.toBe(lesson.solution);
    },
  );

  it.each(lessons.filter(lesson => !lesson.isBoss))(
    '$id har tre ledtrådar',
    async lesson => {
      expect(lesson.hints).toHaveLength(3);
    },
  );
});

describe('rättning av lektionerna', () => {
  it.each(lessons)('$id godkänner sin egen lösning', async lesson => {
    expect(await check(lesson, lesson.solution)).toEqual({
      passed: true,
      reason: '',
    });
  });

  it.each(lessons.filter(lesson => lesson.preview))(
    '$id kan förhandsvisa sin lösning',
    async lesson => {
      const { preview, previewError } = await evaluate(
        lesson.solution,
        [],
        [],
        lesson,
      );
      expect(previewError).toBeUndefined();
      expect(preview).toBeTruthy();
    },
  );

  it.each(lessons)('$id har ; efter varje sats i lösningen', lesson => {
    expect(findMissingSemicolons(lesson.solution)).toEqual([]);
  });

  it('godkänner inte "skapad med const" när variabeln saknas', async () => {
    const lesson = findLesson('js-basics-boss-01');
    const { results } = await evaluate(
      'let score = 0;\nfor (let i = 0; i < 5; i++) {\n  score = score + 10;\n}',
      lesson.tests,
    );
    const constTest = results.find(
      result => result.description === 'hasWon är skapad med const',
    );
    expect(constTest.passed).toBe(false);
  });

  it.each(lessons)('$id underkänner startkoden', async lesson => {
    expect((await check(lesson, lesson.starterCode)).passed).toBe(false);
  });
});

// Andra sätt att lösa uppgifterna som ska godkännas.
const correctAnswers = [
  [
    'debug-js-03',
    'const doubleAll = numbers => numbers.map(n => {\n  return n * 2;\n});',
  ],
  [
    'debug-js-05',
    'function addToCart(count, input) {\n  return count + parseInt(input);\n}',
  ],
  [
    'debug-js-07',
    'function getTopScore(scores) {\n  return Math.max(...scores);\n}',
  ],
  [
    'debug-js-07',
    'function getTopScore(scores) {\n  return [...scores].sort((a, b) => b - a)[0];\n}',
  ],
  [
    'debug-react-06',
    "import { useState } from 'react';\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  function handleAddTwo() {\n    setCount(previous => previous + 1);\n    setCount(previous => previous + 1);\n  }\n  return (\n    <div>\n      <p>{count}</p>\n      <button onClick={handleAddTwo}>+2</button>\n    </div>\n  );\n}",
  ],
  ['js-const-01', "const language = 'JavaScript' // kommentar"],
  ['js-let-01', 'let score = 0\nscore = 10'],
  ['js-let-02', 'let score = 10;\nscore += 5;'],
  [
    'js-if-02',
    'let points = 4;\nif (points >= 5) points = points + 10;\nelse points = points + 2;',
  ],
  [
    'js-loop-02',
    'let total = 0;\nfor (let i = 1; i <= 4; i += 1) { total += i }',
  ],
  ['arrays-01', 'const numbers = [1,2,3]'],
  ['arrays-04', "const fruits = ['äpple', 'banan']\nfruits.push(\"päron\")"],
  ['objects-01', 'const user = {\n  age: 36,\n  name: "Ada",\n};'],
  [
    'objects-03',
    "const users = [{ name: 'Ada' }, { name: 'Linus' }];\nconst secondName = users[1].name",
  ],
  [
    'functions-03',
    'const multiply = (x, y) => x * y\nconst result = multiply(3, 4)',
  ],
  [
    'functions-04',
    'function getDiscount(price) {\n  if (price >= 100) return 20;\n  return 0;\n}',
  ],
  ['functions-05', 'const multiply = (x, y) => x * y'],
  [
    'map-01',
    'const numbers = [1, 2, 3];\nconst doubled = numbers.map((n) => {\n  return n * 2;\n});',
  ],
  [
    'filter-02',
    "const todos = [{ text: 'Handla', done: true }, { text: 'Träna', done: false }, { text: 'Plugga React', done: true }];\nconst doneTodos = todos.filter(todo => todo.done === true);",
  ],
  [
    'find-01',
    'const todos = [{ id: 1 }, { id: 2 }, { id: 3 }];\nconst todo = todos.find(({ id }) => id === 2);',
  ],
  [
    'reduce-01',
    'const numbers = [5, 10, 15];\nconst total = numbers.reduce((acc, n) => {\n  return acc + n;\n}, 0);',
  ],
  ['template-01', "const name = 'Ada';\nconst greeting = `Hej ${ name }!`;"],
  [
    'template-02',
    'const price = 25;\nconst quantity = 3;\nconst receipt = `${quantity} st för ${quantity * price} kr`;',
  ],
  [
    'template-03',
    'const formatPrice = (name, price) => `${name}: ${price} kr`;',
  ],
  [
    'functions-08',
    'const square = n => n * n;\nconst sumOfSquares = (a, b) => square(a) + square(b);',
  ],
  [
    'functions-boss-01',
    'const lineTotal = (price, quantity = 1) => price * quantity;\nconst applyDiscount = (total, percent) => total - (total * percent) / 100;\nconst checkout = (price, quantity, isMember) => {\n  const total = lineTotal(price, quantity);\n  return isMember ? applyDiscount(total, 10) : total;\n};\nconst receipt = checkout(200, 3, true);',
  ],
  [
    'lists-04',
    "const todos = [\n  { id: 1, text: 'Handla' },\n  { id: 2, text: 'Träna' },\n];\nfunction TodoItem({ text }) {\n  return <li>✅ {text}</li>;\n}\nfunction App() {\n  return (\n    <ul>\n      {todos.map(todo => {\n        return <TodoItem key={todo.id} text={todo.text} />;\n      })}\n    </ul>\n  );\n}",
  ],
  [
    'destructuring-01',
    "const user = { name: 'Ada', age: 36 };\nconst { age, name } = user;",
  ],
  ['destructuring-03', 'const greet = ({ name }) => `Hej ${name}!`;'],
  [
    'spread-02',
    "const user = { name: 'Ada', age: 36 };\nconst olderUser = {\n  ...user,\n  age: user.age + 1,\n};",
  ],
  [
    'rest-03',
    'const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);',
  ],
  [
    'ternary-01',
    "function getLabel(isLoggedIn) {\n  return isLoggedIn ? 'Logga ut' : 'Logga in';\n}",
  ],
  ['modules-01', 'const add = (a, b) => a + b;\nexport { add };'],
  [
    'modules-02',
    'const PI = 3.14;\nfunction double(n) { return n * 2; }\nexport { PI, double };',
  ],
  [
    'modules-03',
    'import {\n  multiply,\n  add,\n} from "./math";\nconst total = add(2, 3);\nconst product = multiply(4, 5);',
  ],
  [
    'modules-04',
    'const greet = name => `Hej ${name}!`;\nexport default greet;',
  ],
  [
    'modules-05',
    "import format from './formatPrice';\nconst price = format(99);",
  ],
  [
    'modules-boss-01',
    "import { MAX_TODOS } from './config.js';\n\nconst addTodo = (todos, text) =>\n  todos.length >= MAX_TODOS ? todos : [...todos, text];\n\nfunction countTodos(todos) {\n  return `${todos.length} av ${MAX_TODOS}`;\n}\n\nexport { countTodos };\nexport default addTodo;",
  ],
  ['jsx-01', 'const App = () => <h1>Hej React!</h1>;'],
  ['jsx-01', 'function App() {\n  return (\n    <h1>Hej React!</h1>\n  );\n}'],
  ['jsx-02', "const name = 'Ada';\nconst App = () => <p>{`Hej ${name}!`}</p>;"],
  [
    'jsx-04',
    "const logoUrl = '/favicon.svg';\nexport default function App() {\n  return <img className=\"logo\" alt='Logga' src={logoUrl}/>;\n}",
  ],
  [
    'jsx-05',
    "import { Fragment } from 'react';\nconst user = { name: 'Ada', age: 36 };\nfunction App() {\n  return <Fragment><h1>Profil</h1><p>{`${user.name}, ${user.age} år`}</p></Fragment>;\n}",
  ],
  [
    'jsx-boss-01',
    "const user = { name: 'Ada Lovelace', title: 'Programmerare', avatar: '/favicon.svg' };\nconst App = () => {\n  const { name, title, avatar } = user;\n  return (\n    <div className=\"card\">\n      <img alt={name} src={avatar} />\n      <h2>{name}</h2>\n      <p>{title.toUpperCase()}</p>\n    </div>\n  );\n};",
  ],
  [
    'props-01',
    'const Logo = () => <span>⚛️ Academy</span>;\nconst App = () => <header><Logo/></header>;',
  ],
  ['props-03', 'const Greeting = ({ name }) => <h1>Hej {name}!</h1>;'],
  [
    'props-04',
    'function Badge({ count, label }) {\n  return <span>{`${label}: ${count}`}</span>;\n}',
  ],
  [
    'props-05',
    "function Price({ amount, onSale }) {\n  if (typeof amount !== 'number') {\n    return <p>amount ska vara ett tal, inte text</p>;\n  }\n  return <p>{onSale ? 'REA ' : ''}{amount} kr</p>;\n}\nfunction App() {\n  return <Price onSale amount={99} />;\n}",
  ],
  [
    'props-06',
    'const Button = ({ variant = "primary", label }) => (\n  <button className={variant}>{label}</button>\n);',
  ],
  [
    'props-07',
    'function Card(props) {\n  return <section className="card"><h2>{props.title}</h2>{props.children}</section>;\n}',
  ],
  [
    'props-boss-01',
    "const Avatar = ({ name, src }) => <img alt={name} src={src} />;\nconst Card = ({ children }) => <div className=\"card\">{children}</div>;\nfunction ProfileCard({ user, isOnline = false }) {\n  const { name, avatar } = user;\n  return (\n    <Card>\n      <Avatar name={name} src={avatar} />\n      <h2>{name}</h2>\n      <p>{isOnline ? 'Online' : 'Offline'}</p>\n    </Card>\n  );\n}",
  ],
  [
    'lists-01',
    "const fruits = ['Äpple', 'Banan', 'Päron'];\nconst App = () => <ul>{fruits.map(f => <li>{f}</li>)}</ul>;",
  ],
  [
    'lists-03',
    "const todos = [{ id: 1, text: 'Handla' }, { id: 2, text: 'Träna' }, { id: 3, text: 'Plugga React' }];\nfunction App() {\n  return <ul>{todos.map(todo => {\n    return <li key={todo.id}>{todo.text}</li>;\n  })}</ul>;\n}",
  ],
  [
    'lists-05',
    "const todos = [{ id: 1, text: 'Handla', done: true }, { id: 2, text: 'Träna', done: false }, { id: 3, text: 'Plugga React', done: false }];\nfunction App() {\n  const notDone = todos.filter(todo => todo.done === false);\n  return <ul>{notDone.map(todo => <li key={todo.id}>{todo.text}</li>)}</ul>;\n}",
  ],
  [
    'lists-boss-01',
    'const ProductRow = ({ name, price }) => <li>{`${name}: ${price} kr`}</li>;\nfunction ProductList({ products }) {\n  const available = products.filter(p => p.inStock);\n  return (\n    <section>\n      <h2>{available.length} i lager</h2>\n      <ul>\n        {available.map(product => <ProductRow key={product.id} {...product} />)}\n      </ul>\n    </section>\n  );\n}',
  ],
  [
    'cond-02',
    'function Cart({ count }) {\n  return <div>🛒{count ? <span> {count} varor</span> : null}</div>;\n}',
  ],
  [
    'cond-02',
    'function Cart({ count }) {\n  return <div>🛒{!!count && <span> {count} varor</span>}</div>;\n}',
  ],
  [
    'cond-04',
    'function Welcome({ name }) {\n  return <h1>Välkommen, {name}!</h1>;\n}\nfunction Login() {\n  return <button>Logga in</button>;\n}\nfunction Page({ user }) {\n  if (!user) return <Login />;\n  return <Welcome name={user.name} />;\n}',
  ],
  [
    'cond-06',
    'const Warning = ({ message }) => (message ? <p className="warning">{message}</p> : null);',
  ],
  [
    'cond-07',
    'function TodoList({ todos }) {\n  if (todos.length === 0) return <p>Inga uppgifter</p>;\n  return <ul>{todos.map(t => <li key={t.id}>{t.text}</li>)}</ul>;\n}',
  ],
  [
    'cond-08',
    "const TodoItem = ({ text, done }) => <li className={`todo${done ? ' done' : ''}`}>{text}</li>;",
  ],
  [
    'state-01',
    'const LikeButton = ({ onLike }) => <button onClick={() => onLike()}>Gilla</button>;',
  ],
  [
    'state-02',
    "import { useState } from 'react';\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n  return <><p>{count}</p><button onClick={() => setCount(c => c + 1)}>+1</button></>;\n}",
  ],
  [
    'state-04',
    "import { useState } from 'react';\nfunction Lamp() {\n  const [isOn, setIsOn] = useState(false);\n  const toggle = () => setIsOn(previous => !previous);\n  return <div><p>Lampan är {isOn ? 'tänd' : 'släckt'}</p><button onClick={toggle}>Växla</button></div>;\n}",
  ],
  [
    'state-06',
    "import { useState } from 'react';\nfunction TodoApp() {\n  const [todos, setTodos] = useState([]);\n  const [text, setText] = useState('');\n  function handleAdd() {\n    const newTodo = { id: crypto.randomUUID(), text: text };\n    setTodos(previous => [...previous, newTodo]);\n    setText('');\n  }\n  return <div><input value={text} onChange={e => setText(e.target.value)} /><button onClick={handleAdd}>Lägg till</button><ul>{todos.map(todo => <li key={todo.id}>{todo.text}</li>)}</ul></div>;\n}",
  ],
  [
    'effects-01',
    "import { useEffect, useState } from 'react';\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  useEffect(() => {\n    document.title = 'Klick: ' + count;\n  }, [count]);\n  return <button onClick={() => setCount(count + 1)}>+1</button>;\n}",
  ],
  [
    'effects-03',
    "import { useEffect, useState } from 'react';\nfunction NoteApp() {\n  const [note, setNote] = useState(() => {\n    const saved = localStorage.getItem('note');\n    return saved === null ? '' : saved;\n  });\n  useEffect(() => localStorage.setItem('note', note), [note]);\n  return <textarea value={note} onChange={e => setNote(e.target.value)} />;\n}",
  ],
  [
    'effects-05',
    "import { useEffect, useState } from 'react';\nfunction Timer() {\n  const [seconds, setSeconds] = useState(0);\n  useEffect(() => {\n    const tick = () => setSeconds(previous => previous + 1);\n    const intervalId = setInterval(tick, 1000);\n    return () => {\n      clearInterval(intervalId);\n    };\n  }, []);\n  return <p>{seconds} sekunder</p>;\n}",
  ],
  [
    'lift-01',
    'const Rating = ({ onRate }) => (\n  <div>\n    {[1, 2, 3].map(value => (\n      <button key={value} onClick={() => onRate(value)}>{value}</button>\n    ))}\n  </div>\n);',
  ],
  [
    'lift-04',
    'const NameInput = ({ name, onNameChange }) => <input value={name} onChange={e => onNameChange(e.target.value)} />;\nfunction App() {\n  const [name, setName] = useState("");\n  return <div><NameInput name={name} onNameChange={setName} /><p>Hej {name || "du"}!</p></div>;\n}'.replace(
      'const NameInput',
      "import { useState } from 'react';\nconst NameInput",
    ),
  ],
  [
    'async-02',
    "function getUser() {\n  return Promise.resolve({ id: 1, name: 'Ada' });\n}\nconst getName = async () => (await getUser()).name;",
  ],
  [
    'async-04',
    "async function loadUsers() {\n  const response = await fetch('/api/users');\n  const users = await response.json();\n  return users;\n}",
  ],
  [
    'async-06',
    'async function safeLoad(url) {\n  try {\n    const response = await fetch(url);\n    if (response.ok) return response.json();\n    return [];\n  } catch (error) {\n    return [];\n  }\n}',
  ],
  [
    'data-01',
    "import { useEffect, useState } from 'react';\nfunction Users() {\n  const [users, setUsers] = useState([]);\n  useEffect(() => {\n    const load = async () => {\n      const res = await fetch('/api/users');\n      setUsers(await res.json());\n    };\n    load();\n  }, []);\n  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;\n}",
  ],
  ['functions-07', 'const greet = (name = "du") => `Hej ${name}!`;'],
  [
    'functions-09',
    "const getGrade = (points) => {\n  if (points >= 90) {\n    return 'A';\n  } else if (points >= 50) {\n    return 'B';\n  }\n  return 'C';\n};",
  ],
  [
    'functions-boss-01',
    'const lineTotal = (price, quantity = 1) => price * quantity;\nconst applyDiscount = (total, percent) => total * (1 - percent / 100);\nfunction checkout(price, quantity, isMember) {\n  const total = lineTotal(price, quantity);\n  return isMember ? applyDiscount(total, 10) : total;\n}\nconst receipt = checkout(200, 3, true);',
  ],
  ['js-log-01', 'console.log("Hej världen!")'],
  [
    'js-log-02',
    'const name = \'Ada\';\nconst age = 36;\nconsole.log(name);\nconsole.log("Ålder:", age);',
  ],
  ['str-03', 'const isBlank = text => text.trim().length === 0;'],
  ['str-08', "const getCity = user => user?.address?.city || 'Okänd stad';"],
  [
    'imm-04',
    'const scores = [40, 95, 72, 18];\nconst topScores = scores.toSorted((a, b) => b - a);',
  ],
  [
    'imm-06',
    'function removeAt(list, index) {\n  return list.slice(0, index).concat(list.slice(index + 1));\n}',
  ],
];

// Vanliga fel och genvägar som ska underkännas.
const wrongAnswers = [
  // Bara loopen är rättad, filter och = är kvar.
  [
    'debug-js-boss-01',
    "function summarize(orders) {\n  let total = 0;\n  for (let i = 0; i < orders.length; i++) {\n    total = total + orders[i].price;\n  }\n  const unpaid = orders.filter(order => {\n    !order.isPaid;\n  });\n  const status = unpaid.length = 0 ? 'Allt är betalt' : `${unpaid.length} obetalda`;\n  return `Totalt ${total} kr. ${status}.`;\n}",
  ],
  // Två av tre fel rättade, key är fortfarande item.text.
  [
    'debug-react-boss-01',
    "import { useState } from 'react';\nfunction ShoppingList() {\n  const [items, setItems] = useState([]);\n  const [text, setText] = useState('');\n  function handleSubmit(event) {\n    event.preventDefault();\n    setItems([...items, { id: crypto.randomUUID(), text, bought: false }]);\n    setText('');\n  }\n  const left = items.filter(item => !item.bought).length;\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={text} onChange={event => setText(event.target.value)} />\n      <ul>\n        {items.map(item => (\n          <li key={item.text}>{item.text}</li>\n        ))}\n      </ul>\n      <p>{left} kvar att köpa</p>\n    </form>\n  );\n}",
  ],
  // Rätt svar men med ett anrop i stället för två.
  [
    'debug-react-06',
    "import { useState } from 'react';\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  function handleAddTwo() {\n    setCount(count + 2);\n  }\n  return (\n    <div>\n      <p>{count}</p>\n      <button onClick={handleAddTwo}>+2</button>\n    </div>\n  );\n}",
  ],
  // Räknar rätt men glömmer att stoppa intervallet.
  [
    'debug-react-07',
    "import { useEffect, useState } from 'react';\nfunction Timer() {\n  const [seconds, setSeconds] = useState(0);\n  useEffect(() => {\n    setInterval(() => {\n      setSeconds(s => s + 1);\n    }, 1000);\n  }, []);\n  return <p>{seconds} sekunder</p>;\n}",
  ],
  ['js-const-01', 'let language = "JavaScript";'],
  ['js-let-01', 'let score = 10;'],
  ['js-let-02', 'let score = 15;'],
  ['js-loop-02', 'let total = 10;'],
  ['js-boolean-02', 'const isAdult = true;'],
  ['arrays-01', 'const numbers = [3, 2, 1];'],
  [
    'arrays-boss-01',
    'const numbers = [10, 20, 30];\nconst count = 3;\nconst first = numbers[0];',
  ],
  [
    'arrays-04',
    "const fruits = ['äpple', 'banan', 'päron'];\nfruits.push('päron');",
  ],
  ['arrays-04', "const fruits = ['äpple', 'banan', 'päron'];"],
  ['objects-01', 'const user = ["Ada", 36];'],
  ['objects-01', 'const user = { name: "Ada", age: "36" };'],
  [
    'objects-02',
    "const user = { name: 'Ada', age: 36 };\nconst userName = 'Ada';",
  ],
  [
    'objects-03',
    "const users = [{ name: 'Ada' }, { name: 'Linus' }];\nconst secondName = users[0].name;",
  ],
  [
    'objects-boss-01',
    "const users = [{ name: 'Ada', age: 36 }, { name: 'Linus', age: 28 }];\nconst count = users.length;\nconst firstName = 'Ada';\nconst secondAge = users[1].age;",
  ],
  ['functions-01', 'const addBonus = p => p + 5;'],
  [
    'functions-02',
    'function addBonus(points) { return points + 5; }\nconst result = 15;',
  ],
  [
    'functions-03',
    'function multiply(a, b) { return 12; }\nconst result = multiply(3, 4);',
  ],
  [
    'functions-04',
    'function getDiscount(price) { if (price > 100) { return 20; } return 0; }',
  ],
  [
    'functions-04',
    'function getDiscount(price) { if (price >= 100) { return 20; } else { return 0; } }',
  ],
  ['functions-05', 'const multiply = (a, b) => { return a * b; };'],
  ['map-01', 'const numbers = [1, 2, 3];\nconst doubled = [2, 4, 6];'],
  [
    'map-01',
    'const numbers = [1, 2, 3];\nconst doubled = [];\nfor (const n of numbers) doubled.push(n * 2);\nnumbers.map(n => n);',
  ],
  [
    'map-01',
    'const numbers = [1, 2, 3];\nnumbers.forEach((n, i) => { numbers[i] = n * 2; });\nconst doubled = numbers.map(n => n);',
  ],
  [
    'map-02',
    "const users = [{ name: 'Ada' }];\nconst names = users.map(user => user);",
  ],
  [
    'filter-01',
    'const numbers = [5, 12, 8, 20, 3];\nconst bigNumbers = numbers.filter(number => number >= 8);',
  ],
  [
    'filter-02',
    "const todos = [{ text: 'Handla', done: true }, { text: 'Plugga React', done: true }];\nconst doneTodos = todos.filter(todo => todo.done);",
  ],
  [
    'find-01',
    "const todos = [{ id: 1 }, { id: 2, text: 'Träna', done: false }];\nconst todo = { id: 2, text: 'Träna', done: false };\ntodos.find(t => t);",
  ],
  ['reduce-01', 'const numbers = [5, 10, 15];\nconst total = 30;'],
  [
    'reduce-01',
    'const numbers = [5, 10, 15];\nconst total = numbers.reduce((sum, n) => sum + n);\nnumbers.push(0);',
  ],
  ['template-01', "const name = 'Ada';\nconst greeting = 'Hej ' + name + '!';"],
  ['template-01', "const name = 'Ada';\nconst greeting = `Hej Ada!`;"],
  [
    'template-02',
    "const price = 25;\nconst quantity = 3;\nconst receipt = '3 st för 75 kr';",
  ],
  [
    'template-02',
    'const price = 25;\nconst quantity = 3;\nconst receipt = `${quantity} st för 75 kr`;',
  ],
  [
    'template-03',
    "function formatPrice(name, price) {\n  return name + ': ' + price + ' kr';\n}",
  ],
  [
    'template-03',
    'function formatPrice(name, price) {\n  return `Keps: 199 kr`;\n}',
  ],
  [
    'destructuring-01',
    "const user = { name: 'Ada', age: 36 };\nconst name = user.name;\nconst age = user.age;",
  ],
  [
    'destructuring-02',
    'const scores = [90, 75, 60];\nconst first = scores[0];\nconst second = scores[1];',
  ],
  [
    'destructuring-03',
    'function greet(user) {\n  return `Hej ${user.name}!`;\n}',
  ],
  [
    'spread-01',
    "const todos = ['Handla', 'Träna'];\nconst newTodos = todos;\nnewTodos.push('Plugga React');",
  ],
  [
    'spread-01',
    "const todos = ['Handla', 'Träna'];\nconst newTodos = ['Handla', 'Träna', 'Plugga React'];",
  ],
  [
    'spread-02',
    "const user = { name: 'Ada', age: 36 };\nconst olderUser = user;\nolderUser.age = 37;",
  ],
  [
    'spread-02',
    "const user = { name: 'Ada', age: 36 };\nconst olderUser = { age: 37, ...user };",
  ],
  [
    'rest-01',
    'const numbers = [1, 2, 3, 4];\nconst first = numbers[0];\nconst others = numbers.slice(1);',
  ],
  [
    'rest-02',
    "const user = { id: 1, name: 'Ada', age: 36 };\nconst id = user.id;\ndelete user.id;\nconst details = user;",
  ],
  [
    'rest-03',
    'function sum(a, b, c) {\n  return [a, b, c].reduce((t, n) => t + (n ?? 0), 0);\n}',
  ],
  [
    'ternary-01',
    "const getLabel = isLoggedIn => {\n  if (isLoggedIn) return 'Logga ut';\n  return 'Logga in';\n};",
  ],
  ['and-01', 'const getBadge = count => (count > 0 ? `${count} nya` : false);'],
  ['and-01', 'const getBadge = count => count && `${count} nya`;'],
  [
    'modern-js-boss-01',
    "const user = { id: 1, name: 'Ada', age: 36 };\nconst todos = ['Handla', 'Träna'];\nconst { id, ...profile } = user;\nconst updatedProfile = { ...profile, age: 37 };\nconst allTodos = [...todos, 'Plugga React'];\nconst [firstTodo, ...otherTodos] = allTodos;\nconst message = 'Ada har 3 uppgifter';",
  ],
  [
    'modern-js-boss-01',
    "const user = { id: 1, name: 'Ada', age: 36 };\nconst todos = ['Handla', 'Träna'];\nconst { id, ...profile } = user;\nprofile.age = 37;\nconst updatedProfile = profile;\nconst allTodos = [...todos, 'Plugga React'];\nconst [firstTodo, ...otherTodos] = allTodos;\nconst message = `${updatedProfile.name} har ${allTodos.length} uppgifter`;",
  ],
  [
    'modules-01',
    'function add(a, b) {\n  return a + b;\n}\nexport default add;',
  ],
  ['modules-02', 'const PI = 3.14;\nexport const double = n => n * 2;'],
  [
    'modules-03',
    'function add(a, b) { return a + b; }\nfunction multiply(a, b) { return a * b; }\nconst total = add(2, 3);\nconst product = multiply(4, 5);',
  ],
  [
    'modules-03',
    "import { add } from './math.js';\nimport { multiply } from './math.js';\nconst total = add(2, 3);\nconst product = multiply(4, 5);",
  ],
  ['modules-04', 'export function greet(name) {\n  return `Hej ${name}!`;\n}'],
  [
    'modules-05',
    "import { format } from './formatPrice.js';\nconst price = format(99);",
  ],
  [
    'modules-05',
    "import { formatPrice } from './formatPrice.js';\nconst format = formatPrice;\nconst price = format(99);",
  ],
  [
    'modules-06',
    "import { addTodo, MAX_TODOS } from './todos.js';\nconst todos = addTodo(['Handla'], 'Träna');\nconst isFull = todos.length >= MAX_TODOS;",
  ],
  [
    'modules-boss-01',
    "import { MAX_TODOS } from './config.js';\nexport default function addTodo(todos, text) {\n  if (todos.length >= MAX_TODOS) return todos;\n  todos.push(text);\n  return [...todos, text].slice(0, -1);\n}\nexport const countTodos = todos => `${todos.length} av ${MAX_TODOS}`;",
  ],
  [
    'modules-boss-01',
    "import { MAX_TODOS } from './config.js';\nexport function addTodo(todos, text) {\n  if (todos.length >= MAX_TODOS) return todos;\n  return [...todos, text];\n}\nexport const countTodos = todos => `${todos.length} av ${MAX_TODOS}`;",
  ],
  ['jsx-01', 'function app() {\n  return <h1>Hej React!</h1>;\n}'],
  ['jsx-01', "function App() {\n  return '<h1>Hej React!</h1>';\n}"],
  ['jsx-01', 'function App() {\n  <h1>Hej React!</h1>;\n}'],
  [
    'jsx-02',
    "const name = 'Ada';\nfunction App() {\n  return <p>Hej Ada!</p>;\n}",
  ],
  [
    'jsx-02',
    "const name = 'Ada';\nfunction App() {\n  return <p>Hej name!</p>;\n}",
  ],
  [
    'jsx-03',
    'const items = 3;\nconst price = 25;\nfunction App() {\n  return <p>Totalt: items * price kr</p>;\n}',
  ],
  [
    'jsx-04',
    'const logoUrl = \'/favicon.svg\';\nfunction App() {\n  return <img src="logoUrl" alt="Logga" className="logo" />;\n}',
  ],
  [
    'jsx-04',
    'const logoUrl = \'/favicon.svg\';\nfunction App() {\n  return <img src={logoUrl} alt="Logga" class="logo" />;\n}',
  ],
  [
    'jsx-05',
    "const user = { name: 'Ada', age: 36 };\nfunction App() {\n  return (\n    <div>\n      <h1>Profil</h1>\n      <p>{user.name}, {user.age} år</p>\n    </div>\n  );\n}",
  ],
  [
    'jsx-05',
    "const user = { name: 'Ada', age: 36 };\nfunction App() {\n  return (\n    <h1>Profil</h1>\n    <p>{user.name}, {user.age} år</p>\n  );\n}",
  ],
  [
    'jsx-boss-01',
    "const user = { name: 'Ada Lovelace', title: 'Programmerare', avatar: '/favicon.svg' };\nfunction App() {\n  return (\n    <div className=\"card\">\n      <img src={user.avatar} alt={user.name} />\n      <h2>Ada Lovelace</h2>\n      <p>{'PROGRAMMERARE'.toUpperCase()}</p>\n    </div>\n  );\n}",
  ],
  [
    'props-01',
    'function Logo() {\n  return <span>⚛️ Academy</span>;\n}\nfunction App() {\n  return <header><span>⚛️ Academy</span></header>;\n}',
  ],
  [
    'props-01',
    'function Logo() {\n  return <span>⚛️ Academy</span>;\n}\nfunction App() {\n  return <header><logo /></header>;\n}',
  ],
  [
    'props-02',
    'function Greeting(props) {\n  return <h1>Hej {props.name}!</h1>;\n}\nfunction App() {\n  return <Greeting props="Ada" />;\n}',
  ],
  [
    'props-02',
    'function Greeting(props) {\n  return <h1>Hej {props.name}!</h1>;\n}\nfunction App() {\n  return <Greeting name={name} />;\n}',
  ],
  ['props-03', 'function Greeting(props) {\n  return <h1>Hej Ada!</h1>;\n}'],
  ['props-03', 'function Greeting(name) {\n  return <h1>Hej {name}!</h1>;\n}'],
  [
    'props-04',
    'function Badge(props) {\n  return <span>{props.label}: {props.count}</span>;\n}',
  ],
  [
    'props-05',
    "function Price({ amount, onSale }) {\n  if (typeof amount !== 'number') {\n    return <p>amount ska vara ett tal, inte text</p>;\n  }\n  return <p>{onSale ? 'REA ' : ''}{amount} kr</p>;\n}\nfunction App() {\n  return <Price amount=\"99\" onSale=\"true\" />;\n}",
  ],
  [
    'props-06',
    'function Button({ label, variant }) {\n  return <button className={variant}>{label}</button>;\n}',
  ],
  [
    'props-07',
    'function Card({ title }) {\n  return <section className="card"><h2>{title}</h2></section>;\n}',
  ],
  [
    'props-boss-01',
    'function Avatar({ src, name }) {\n  return <img src={src} alt={name} />;\n}\nfunction Card({ children }) {\n  return <div className="card">{children}</div>;\n}\nfunction ProfileCard({ user, isOnline = false }) {\n  return (\n    <div className="card">\n      <img src={user.avatar} alt={user.name} />\n      <h2>{user.name}</h2>\n      <p>{isOnline ? \'Online\' : \'Offline\'}</p>\n    </div>\n  );\n}',
  ],
  [
    'lists-01',
    "const fruits = ['Äpple', 'Banan', 'Päron'];\nfunction App() {\n  return <ul><li>Äpple</li><li>Banan</li><li>Päron</li></ul>;\n}",
  ],
  [
    'lists-02',
    "const fruits = ['Äpple', 'Banan', 'Päron'];\nfunction App() {\n  return <ul>{fruits.map(fruit => <li>{fruit}</li>)}</ul>;\n}",
  ],
  [
    'lists-02',
    "const fruits = ['Äpple', 'Banan', 'Päron'];\nfunction App() {\n  return <ul>{fruits.map(fruit => <li key=\"fruit\">{fruit}</li>)}</ul>;\n}",
  ],
  [
    'lists-03',
    "const todos = [{ id: 1, text: 'Handla' }, { id: 2, text: 'Träna' }, { id: 3, text: 'Plugga React' }];\nfunction App() {\n  return <ul>{todos.map((todo, index) => <li key={index}>{todo.text}</li>)}</ul>;\n}",
  ],
  [
    'lists-03',
    "const todos = [{ id: 1, text: 'Handla' }, { id: 2, text: 'Träna' }, { id: 3, text: 'Plugga React' }];\nfunction App() {\n  return <ul>{todos.map(todo => <li key={todo.id}>{todo}</li>)}</ul>;\n}",
  ],
  [
    'lists-04',
    "const todos = [{ id: 1, text: 'Handla' }, { id: 2, text: 'Träna' }];\nfunction TodoItem({ text }) {\n  return <li>✅ {text}</li>;\n}\nfunction App() {\n  return <ul>{todos.map(todo => <TodoItem text={todo.text} />)}</ul>;\n}",
  ],
  [
    'lists-05',
    "const todos = [{ id: 1, text: 'Handla', done: true }, { id: 2, text: 'Träna', done: false }, { id: 3, text: 'Plugga React', done: false }];\nfunction App() {\n  return <ul>{todos.filter(todo => todo.done).map(todo => <li key={todo.id}>{todo.text}</li>)}</ul>;\n}",
  ],
  [
    'lists-06',
    "const players = [{ id: 'a7', name: 'Ada' }, { id: 'l3', name: 'Linus' }, { id: 'g9', name: 'Grace' }];\nfunction App() {\n  return <ol>{players.map((player, index) => <li key={player.id}>{index}. {player.name}</li>)}</ol>;\n}",
  ],
  [
    'lists-boss-01',
    'function ProductRow({ name, price }) {\n  return <li>{name}: {price} kr</li>;\n}\nfunction ProductList({ products }) {\n  const inStock = products.filter(product => product.inStock);\n  return (\n    <section>\n      <h2>2 i lager</h2>\n      <ul>{inStock.map(product => <ProductRow key={product.id} name={product.name} price={product.price} />)}</ul>\n    </section>\n  );\n}',
  ],
  [
    'cond-01',
    'function Inbox({ count }) {\n  return <div><h2>Inkorg</h2>{count && <p>Du har {count} nya meddelanden</p>}</div>;\n}',
  ],
  [
    'cond-02',
    'function Cart({ count }) {\n  return <div>🛒<span> {count} varor</span></div>;\n}',
  ],
  [
    'cond-03',
    "function LoginButton({ isLoggedIn }) {\n  return <button>{isLoggedIn && 'Logga ut'}</button>;\n}",
  ],
  [
    'cond-05',
    'function Profile({ user }) {\n  return <h2>{user.name}</h2>;\n}',
  ],
  [
    'cond-06',
    'function Warning({ message }) {\n  return <p className="warning">{message}</p>;\n}',
  ],
  [
    'cond-06',
    'function Warning({ message }) {\n  if (!message) return <></>;\n  return <p className="warning">{message}</p>;\n}',
  ],
  [
    'cond-07',
    'function TodoList({ todos }) {\n  return <ul>{todos.map(t => <li key={t.id}>{t.text}</li>)}</ul>;\n}',
  ],
  [
    'cond-08',
    'function TodoItem({ text, done }) {\n  return <li className="todo done">{text}</li>;\n}',
  ],
  [
    'cond-boss-01',
    'function OrderSummary({ order }) {\n  if (!order) return <p>Ingen order vald</p>;\n  return (\n    <section>\n      <h2>Order {order.id}</h2>\n      {order.isPaid ? <p>Betald</p> : <p>Ej betald</p>}\n      {order.items.length === 0 ? <p>Ordern är tom</p> : <ul>{order.items.map(item => <li key={item.id}>{item.name}</li>)}</ul>}\n      {order.discount && <p>Rabatt: {order.discount} kr</p>}\n    </section>\n  );\n}',
  ],
  [
    'state-01',
    'function LikeButton({ onLike }) {\n  return <button onClick={onLike()}>Gilla</button>;\n}',
  ],
  [
    'state-01',
    'function LikeButton({ onLike }) {\n  return <button>Gilla</button>;\n}',
  ],
  [
    'state-02',
    "import { useState } from 'react';\nfunction Counter() {\n  let count = 0;\n  return <div><p>{count}</p><button onClick={() => count++}>+1</button></div>;\n}",
  ],
  [
    'state-02',
    "import { useState } from 'react';\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <div><p>{count}</p><button onClick={setCount(count + 1)}>+1</button></div>;\n}",
  ],
  [
    'state-04',
    "import { useState } from 'react';\nfunction Lamp() {\n  const [isOn, setIsOn] = useState(false);\n  return <div><p>{isOn ? 'Lampan är tänd' : 'Lampan är släckt'}</p><button onClick={() => setIsOn(true)}>Växla</button></div>;\n}",
  ],
  [
    'state-05',
    "import { useState } from 'react';\nfunction NameForm() {\n  const [name, setName] = useState('');\n  return <div><input value={name} /><p>Hej {name}!</p></div>;\n}",
  ],
  [
    'state-06',
    "import { useState } from 'react';\nfunction TodoApp() {\n  const [todos, setTodos] = useState([]);\n  const [text, setText] = useState('');\n  function handleAdd() {\n    todos.push({ id: crypto.randomUUID(), text });\n    setTodos(todos);\n  }\n  return <div><input value={text} onChange={e => setText(e.target.value)} /><button onClick={handleAdd}>Lägg till</button><ul>{todos.map(todo => <li key={todo.id}>{todo.text}</li>)}</ul></div>;\n}",
  ],
  [
    'state-06',
    "import { useState } from 'react';\nfunction TodoApp() {\n  const [todos, setTodos] = useState([]);\n  const [text, setText] = useState('');\n  function handleAdd() {\n    setTodos([...todos, { id: crypto.randomUUID(), text }]);\n  }\n  return <div><input value={text} onChange={e => setText(e.target.value)} /><button onClick={handleAdd}>Lägg till</button><ul>{todos.map(todo => <li key={todo.id}>{todo.text}</li>)}</ul></div>;\n}",
  ],
  [
    'state-08',
    "import { useState } from 'react';\nfunction Profile() {\n  const [user, setUser] = useState({ name: 'Ada', age: 36 });\n  function handleBirthday() {\n    user.age = user.age + 1;\n    setUser({ ...user });\n  }\n  return <div><p>{user.name}, {user.age} år</p><button onClick={handleBirthday}>Fyll år</button></div>;\n}",
  ],
  [
    'state-09',
    "import { useState } from 'react';\nfunction SignupForm() {\n  const [name, setName] = useState('');\n  const [submitted, setSubmitted] = useState('');\n  function handleSubmit(event) {\n    setSubmitted(name);\n  }\n  return <form onSubmit={handleSubmit}><input value={name} onChange={e => setName(e.target.value)} /><button type=\"submit\">Skicka</button>{submitted && <p>Tack, {submitted}!</p>}</form>;\n}",
  ],
  [
    'effects-01',
    "import { useEffect, useState } from 'react';\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  document.title = `Klick: ${count}`;\n  return <button onClick={() => setCount(count + 1)}>+1</button>;\n}",
  ],
  [
    'effects-01',
    "import { useEffect, useState } from 'react';\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  useEffect(() => {\n    document.title = `Klick: ${count}`;\n  }, []);\n  return <button onClick={() => setCount(count + 1)}>+1</button>;\n}",
  ],
  [
    'effects-02',
    "import { useEffect, useState } from 'react';\nfunction Settings() {\n  const [name, setName] = useState('');\n  const [isDark, setIsDark] = useState(false);\n  useEffect(() => {\n    localStorage.setItem('name', name);\n  }, [name, isDark]);\n  return <div className={isDark ? 'dark' : 'light'}><input value={name} onChange={e => setName(e.target.value)} /><button onClick={() => setIsDark(!isDark)}>Byt tema</button></div>;\n}",
  ],
  [
    'effects-03',
    "import { useEffect, useState } from 'react';\nfunction NoteApp() {\n  const [note, setNote] = useState('');\n  useEffect(() => {\n    localStorage.setItem('note', note);\n  }, [note]);\n  return <textarea value={note} onChange={e => setNote(e.target.value)} />;\n}",
  ],
  [
    'effects-04',
    "import { useEffect, useState } from 'react';\nfunction TodoApp() {\n  const [todos, setTodos] = useState(() => localStorage.getItem('todos') ?? []);\n  useEffect(() => {\n    localStorage.setItem('todos', todos);\n  }, [todos]);\n  return <div><button onClick={() => setTodos([...todos, 'Ny uppgift'])}>Lägg till</button><p>{todos.length} uppgifter</p></div>;\n}",
  ],
  [
    'effects-05',
    "import { useEffect, useState } from 'react';\nfunction Timer() {\n  const [seconds, setSeconds] = useState(0);\n  useEffect(() => {\n    const id = setInterval(() => setSeconds(seconds + 1), 1000);\n    return () => clearInterval(id);\n  }, []);\n  return <p>{seconds} sekunder</p>;\n}",
  ],
  [
    'effects-05',
    "import { useEffect, useState } from 'react';\nfunction Timer() {\n  const [seconds, setSeconds] = useState(0);\n  useEffect(() => {\n    setInterval(() => setSeconds(s => s + 1), 1000);\n  }, []);\n  return <p>{seconds} sekunder</p>;\n}",
  ],
  [
    'effects-05',
    "import { useEffect, useState } from 'react';\nfunction Timer() {\n  const [seconds, setSeconds] = useState(0);\n  useEffect(() => {\n    const id = setInterval(() => setSeconds(s => s + 1), 1000);\n    return () => clearInterval(id);\n  });\n  return <p>{seconds} sekunder</p>;\n}",
  ],
  [
    'effects-boss-01',
    "import { useEffect, useState } from 'react';\nfunction Stopwatch() {\n  const [seconds, setSeconds] = useState(() => Number(localStorage.getItem('seconds')) || 0);\n  const [isRunning, setIsRunning] = useState(false);\n  useEffect(() => {\n    if (!isRunning) return;\n    setInterval(() => setSeconds(s => s + 1), 1000);\n  }, [isRunning]);\n  useEffect(() => {\n    document.title = `⏱ ${seconds} s`;\n    localStorage.setItem('seconds', String(seconds));\n  }, [seconds]);\n  return <div><p>{seconds} s</p><button onClick={() => setIsRunning(!isRunning)}>{isRunning ? 'Stopp' : 'Start'}</button><button onClick={() => setSeconds(0)}>Nollställ</button></div>;\n}",
  ],
  [
    'lift-01',
    'function Rating({ onRate }) {\n  return <div><button onClick={onRate(1)}>1</button><button onClick={onRate(2)}>2</button><button onClick={onRate(3)}>3</button></div>;\n}',
  ],
  [
    'lift-01',
    'function Rating({ onRate }) {\n  return <div><button onClick={onRate}>1</button><button onClick={onRate}>2</button><button onClick={onRate}>3</button></div>;\n}',
  ],
  [
    'lift-02',
    "import { useState } from 'react';\nfunction Display({ count }) {\n  return <p>Antal: {count}</p>;\n}\nfunction IncrementButton({ onIncrement }) {\n  return <button onClick={onIncrement}>+1</button>;\n}\nfunction App() {\n  const [count, setCount] = useState(0);\n  return <div><Display count={count} /><IncrementButton /></div>;\n}",
  ],
  [
    'lift-04',
    "import { useState } from 'react';\nfunction NameInput({ name, onNameChange }) {\n  const [value, setValue] = useState(name);\n  return <input value={value} onChange={e => setValue(e.target.value)} />;\n}\nfunction App() {\n  const [name, setName] = useState('');\n  return <div><NameInput name={name} onNameChange={setName} /><p>Hej {name || 'du'}!</p></div>;\n}",
  ],
  [
    'lift-06',
    "import { useState } from 'react';\nfunction App() {\n  const [todos, setTodos] = useState([{ id: 1, text: 'Handla', done: false }, { id: 2, text: 'Träna', done: true }, { id: 3, text: 'Plugga React', done: false }]);\n  const [left, setLeft] = useState(2);\n  function handleRemove(id) {\n    const todo = todos.find(t => t.id === id);\n    setTodos(todos.filter(t => t.id !== id));\n    if (!todo.done) setLeft(left - 1);\n  }\n  return <div><p>{left} kvar</p><ul>{todos.map(todo => <li key={todo.id}>{todo.text} <button onClick={() => handleRemove(todo.id)}>Ta bort</button></li>)}</ul></div>;\n}",
  ],
  [
    'async-01',
    "function getUser() {\n  return Promise.resolve({ id: 1, name: 'Ada' });\n}\nconst namePromise = 'Ada';",
  ],
  [
    'async-01',
    "function getUser() {\n  return Promise.resolve({ id: 1, name: 'Ada' });\n}\nconst namePromise = getUser().name;",
  ],
  [
    'async-02',
    "function getUser() {\n  return Promise.resolve({ id: 1, name: 'Ada' });\n}\nasync function getName() {\n  const user = getUser();\n  return user.name;\n}",
  ],
  [
    'async-04',
    "async function loadUsers() {\n  const response = await fetch('/api/users');\n  return response;\n}",
  ],
  [
    'async-05',
    'async function loadUser(id) {\n  const response = await fetch(`/api/users/${id}`);\n  return await response.json();\n}',
  ],
  [
    'async-07',
    "async function getJson(url) {\n  const response = await fetch(url);\n  return await response.json();\n}\nasync function loadCounts() {\n  const users = await getJson('/api/users');\n  const todos = await getJson('/api/todos');\n  return [users.length, todos.length];\n}",
  ],
  [
    'data-01',
    "import { useEffect, useState } from 'react';\nfunction Users() {\n  const [users, setUsers] = useState([]);\n  useEffect(() => {\n    fetch('/api/users').then(r => r.json()).then(setUsers);\n  });\n  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;\n}",
  ],
  [
    'data-02',
    "import { useEffect, useState } from 'react';\nfunction Todos() {\n  const [todos, setTodos] = useState([]);\n  useEffect(async () => {\n    const response = await fetch('/api/todos');\n    setTodos(await response.json());\n  }, []);\n  return <ul>{todos.map(t => <li key={t.id}>{t.title}</li>)}</ul>;\n}",
  ],
  [
    'data-05',
    "import { useEffect, useState } from 'react';\nfunction UserCard({ userId }) {\n  const [user, setUser] = useState(null);\n  useEffect(() => {\n    fetch(`/api/users/${userId}`).then(r => r.json()).then(setUser);\n  }, []);\n  if (!user) return <p>Laddar…</p>;\n  return <h2>{user.name}</h2>;\n}",
  ],
  [
    'functions-06',
    'function double(number) {\n  console.log(number * 2);\n  return;\n}\nconst result = 8;',
  ],
  ['functions-07', "function greet(name) {\n  return 'Hej ' + name + '!';\n}"],
  [
    'functions-08',
    'function square(n) {\n  return n * n;\n}\nfunction sumOfSquares(a, b) {\n  return a * a + b * b;\n}',
  ],
  [
    'functions-09',
    "const getGrade = points => {\n  if (points > 90) return 'A';\n  if (points > 50) return 'B';\n  return 'C';\n};",
  ],
  [
    'functions-09',
    "const getGrade = points => {\n  if (points >= 90) 'A';\n  if (points >= 50) 'B';\n  'C';\n};",
  ],
  [
    'functions-10',
    'function applyTwice(fn, value) {\n  return fn(fn(value));\n}\nconst addThree = number => number + 3;\nconst result = applyTwice(addThree(10), 10);',
  ],
  [
    'functions-boss-01',
    'function lineTotal(price, quantity = 1) {\n  return price * quantity;\n}\nconst applyDiscount = (total, percent) => total - (total * percent) / 100;\nfunction checkout(price, quantity, isMember) {\n  return isMember ? price * quantity * 0.9 : price * quantity;\n}\nconst receipt = checkout(200, 3, true);',
  ],
  ['js-log-01', "console.log('Hej världen');"],
  ['js-log-01', "'Hej världen!';"],
  [
    'js-log-02',
    "const name = 'Ada';\nconst age = 36;\nconsole.log('Ada');\nconsole.log('Ålder: 36');",
  ],
  [
    'js-log-02',
    "const name = 'Ada';\nconst age = 36;\nconsole.log('name');\nconsole.log('Ålder:', 'age');",
  ],
  [
    'str-01',
    "const name = 'Ada Lovelace';\nconst shout = 'ADA LOVELACE';\nconst letters = 12;",
  ],
  [
    'str-02',
    'function matches(name, query) {\n  return name.includes(query);\n}',
  ],
  ['str-05', 'function isFive(value) {\n  return value == 5 && true;\n}'],
  [
    'str-07',
    'function getVolume(settings) {\n  return settings.volume || 50;\n}',
  ],
  [
    'str-08',
    "function getCity(user) {\n  return user.address.city ?? 'Okänd stad';\n}",
  ],
  ['imm-01', 'const original = [1, 2];\nconst copy = original;\ncopy.push(3);'],
  [
    'imm-02',
    'function addItem(list, item) {\n  list.push(item);\n  return list;\n}',
  ],
  [
    'imm-04',
    'const scores = [40, 95, 72, 18];\nconst topScores = scores.sort((a, b) => b - a);',
  ],
  [
    'imm-05',
    'function toggleTodo(todos, id) {\n  const todo = todos.find(t => t.id === id);\n  todo.done = !todo.done;\n  return todos.map(t => t);\n}',
  ],
  [
    'imm-06',
    'function removeAt(list, index) {\n  list.splice(index, 1);\n  return list.slice();\n}',
  ],
  [
    'imm-09',
    'let count = 0;\nfunction makeCounter() {\n  return () => {\n    count += 1;\n    return count;\n  };\n}',
  ],
  [
    'imm-boss-01',
    "const board = { title: 'Veckans plan', columns: [{ id: 'todo', cards: [{ id: 1, text: 'Handla' }, { id: 2, text: 'Träna' }] }, { id: 'done', cards: [] }] };\nfunction moveCard(board, cardId, fromId, toId) {\n  const from = board.columns.find(c => c.id === fromId);\n  const to = board.columns.find(c => c.id === toId);\n  const card = from.cards.find(c => c.id === cardId);\n  from.cards = from.cards.filter(c => c.id !== cardId);\n  to.cards = [...to.cards, card];\n  return { ...board, columns: [...board.columns] };\n}",
  ],
];

describe('alternativa svar', () => {
  it.each(correctAnswers)('%s godkänner %j', async (id, code) => {
    expect(await check(findLesson(id), code)).toEqual({
      passed: true,
      reason: '',
    });
  });

  it.each(wrongAnswers)('%s underkänner %j', async (id, code) => {
    expect((await check(findLesson(id), code)).passed).toBe(false);
  });
});
