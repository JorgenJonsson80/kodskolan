// Frågor för nivåtestet och för "Testa dig förbi". Fyra frågor per bana.
// Det rätta svaret står alltid först i options. Ordningen blandas när
// frågan visas.
export const quiz = {
  'js-basics': [
    {
      question: 'Vad skrivs ut?',
      code: `let score = 5;
score = score + 3;
console.log(score);`,
      options: ['8', '5', '53', 'score'],
      explain:
        'score får först värdet 5. Sedan får den värdet 5 + 3, alltså 8.',
    },
    {
      question: 'Vad skrivs ut?',
      code: `const age = 15;
if (age >= 18) {
  console.log('Vuxen');
} else {
  console.log('Ung');
}`,
      options: ['Ung', 'Vuxen', 'Både Vuxen och Ung', 'Ingenting'],
      explain: '15 >= 18 är false, så koden i else körs.',
    },
    {
      question: 'Vad skrivs ut?',
      code: `let total = 0;
for (let i = 0; i < 3; i++) {
  total = total + 2;
}
console.log(total);`,
      options: ['6', '2', '3', '8'],
      explain: 'Loopen går tre varv, i är 0, 1 och 2. Varje varv läggs 2 till.',
    },
    {
      question: 'Vad skrivs ut?',
      code: `const isOpen = 10 > 20;
console.log(isOpen);`,
      options: ['false', 'true', '10', 'Ett felmeddelande'],
      explain: 'En jämförelse ger en boolean. 10 är inte större än 20.',
    },
  ],
  arrays: [
    {
      question: 'Vad skrivs ut?',
      code: `const numbers = [4, 8, 15];
numbers.push(16);
console.log(numbers.length);`,
      options: ['4', '3', '16', '5'],
      explain: 'push lägger till 16 sist. Arrayen har då fyra värden.',
    },
    {
      question: 'Vad skrivs ut?',
      code: `const users = [{ name: 'Ada' }, { name: 'Linus' }];
console.log(users[1].name);`,
      options: ['Linus', 'Ada', 'undefined', 'name'],
      explain: 'Index börjar på 0, så users[1] är det andra objektet.',
    },
    {
      question: 'Vad skrivs ut?',
      code: `const colors = ['röd', 'grön', 'blå'];
console.log(colors[3]);`,
      options: ['undefined', 'blå', 'röd', 'Ett felmeddelande'],
      explain:
        'Tre värden har index 0, 1 och 2. Index 3 finns inte, så du får undefined.',
    },
    {
      question: 'Vad skrivs ut?',
      code: `const user = { name: 'Ada', age: 36 };
console.log(user.email);`,
      options: ['undefined', 'null', 'Ett felmeddelande', '""'],
      explain: 'En egenskap som inte finns ger undefined, inget fel.',
    },
  ],
  functions: [
    {
      question: 'Vad skrivs ut?',
      code: `function add(a, b) {
  a + b;
}
console.log(add(2, 3));`,
      options: ['undefined', '5', '23', 'Ett felmeddelande'],
      explain:
        'Funktionen räknar ut a + b men returnerar ingenting, så svaret blir undefined.',
    },
    {
      question: 'Vad skrivs ut?',
      code: `const greet = (name = 'du') => 'Hej ' + name;
console.log(greet());`,
      options: ['Hej du', 'Hej ', 'Hej undefined', 'Ett felmeddelande'],
      explain: 'Inget argument skickas, så name får standardvärdet "du".',
    },
    {
      question: 'Vad skrivs ut?',
      code: `function check(n) {
  if (n > 10) {
    return 'stor';
  }
  return 'liten';
}
console.log(check(10));`,
      options: ['liten', 'stor', 'undefined', '10'],
      explain: '10 > 10 är false, så funktionen fortsätter till sista return.',
    },
    {
      question: 'Vad skrivs ut?',
      code: `const double = n => { n * 2 };
console.log(double(4));`,
      options: ['undefined', '8', '4', 'Ett felmeddelande'],
      explain: 'Med klamrar måste du skriva return själv. Här saknas det.',
    },
  ],
  strings: [
    {
      question: 'Vad skrivs ut?',
      code: `console.log(5 === '5');`,
      options: ['false', 'true', '5', 'Ett felmeddelande'],
      explain:
        '=== kräver att både värde och typ är samma. Talet 5 och texten "5" är olika typer.',
    },
    {
      question: 'Vad skrivs ut?',
      code: `const volume = 0;
console.log(volume ?? 50);`,
      options: ['0', '50', 'null', 'undefined'],
      explain:
        '?? använder bara reservvärdet när värdet är null eller undefined. 0 behålls.',
    },
    {
      question: 'Vad skrivs ut?',
      code: `const name = 'Ada';
console.log(\`Hej \${name}!\`);`,
      options: ['Hej Ada!', 'Hej ${name}!', 'Hej name!', 'Ett felmeddelande'],
      explain: 'I en template literal ersätts ${name} med variabelns värde.',
    },
    {
      question: 'Vad skrivs ut?',
      code: `const user = null;
console.log(user?.name ?? 'Okänd');`,
      options: ['Okänd', 'null', 'undefined', 'Ett felmeddelande'],
      explain:
        '?. ger undefined i stället för ett fel när user är null. Sedan tar ?? över.',
    },
  ],
  'array-methods': [
    {
      question: 'Vad skrivs ut?',
      code: `const numbers = [1, 2, 3, 4];
console.log(numbers.filter(n => n > 2));`,
      options: ['[3, 4]', '[1, 2]', '[false, false, true, true]', '2'],
      explain: 'filter behåller bara värdena där villkoret är true.',
    },
    {
      question: 'Vad skrivs ut?',
      code: `const prices = [10, 20, 30];
const total = prices.reduce((sum, price) => sum + price, 0);
console.log(total);`,
      options: ['60', '[10, 20, 30]', '102030', '0'],
      explain:
        'reduce börjar på 0 och lägger till varje pris: 0 + 10 + 20 + 30.',
    },
    {
      question: 'Vad skrivs ut?',
      code: `const names = ['ada', 'linus'];
console.log(names.map(name => name.toUpperCase()));`,
      options: [
        '["ADA", "LINUS"]',
        '["ada", "linus"]',
        '"ADA LINUS"',
        'undefined',
      ],
      explain:
        'map ger en ny array med det funktionen returnerar för varje värde.',
    },
    {
      question: 'Vad skrivs ut?',
      code: `const users = [{ id: 1 }, { id: 2 }];
console.log(users.find(user => user.id === 3));`,
      options: ['undefined', 'null', '[]', 'Ett felmeddelande'],
      explain: 'find ger undefined när inget värde matchar.',
    },
  ],
  'modern-js': [
    {
      question: 'Vad skrivs ut?',
      code: `const user = { name: 'Ada', age: 36 };
const { name } = user;
console.log(name);`,
      options: ['Ada', '{ name: "Ada" }', 'undefined', '36'],
      explain: 'Destructuring plockar ut egenskapen name ur user.',
    },
    {
      question: 'Vad skrivs ut?',
      code: `const a = [1, 2];
const b = [...a, 3];
console.log(a.length, b.length);`,
      options: ['2 3', '3 3', '2 2', '3 2'],
      explain: 'Spread skapar en ny array. a ändras inte.',
    },
    {
      question: 'Vad skrivs ut?',
      code: `const [first, ...rest] = [1, 2, 3];
console.log(rest);`,
      options: ['[2, 3]', '[1, 2, 3]', '3', '[1]'],
      explain: 'first får 1 och ...rest samlar resten i en ny array.',
    },
    {
      question: 'Vad skrivs ut?',
      code: `const user = { name: 'Ada', age: 36 };
const older = { ...user, age: 37 };
console.log(user.age, older.age);`,
      options: ['36 37', '37 37', '36 36', '37 36'],
      explain: 'Spread gör en kopia. Bara kopian får age 37.',
    },
  ],
  immutable: [
    {
      question: 'Vad skrivs ut?',
      code: `const scores = [3, 1, 2];
const sorted = scores.toSorted();
console.log(scores);`,
      options: ['[3, 1, 2]', '[1, 2, 3]', '[3, 2, 1]', 'undefined'],
      explain:
        'toSorted ger en ny sorterad array. Originalet behåller sin ordning.',
    },
    {
      question: 'Vad skrivs ut?',
      code: `function makeCounter() {
  let count = 0;
  return () => {
    count = count + 1;
    return count;
  };
}
const next = makeCounter();
next();
console.log(next());`,
      options: ['2', '1', '0', 'undefined'],
      explain:
        'Funktionen minns count mellan anropen. Det är en closure. Andra anropet ger 2.',
    },
    {
      question: 'Vad skrivs ut?',
      code: `const todos = [{ done: true }, { done: false }];
console.log(todos.some(t => t.done), todos.every(t => t.done));`,
      options: ['true false', 'false true', 'true true', 'false false'],
      explain: 'some: är minst en klar? Ja. every: är alla klara? Nej.',
    },
    {
      question: 'Vad skrivs ut?',
      code: `const prices = { keps: 199 };
console.log(Object.entries(prices));`,
      options: ['[["keps", 199]]', '["keps", 199]', '{ keps: 199 }', '[199]'],
      explain:
        'Object.entries ger en array med ett [namn, värde]-par per egenskap.',
    },
  ],
  modules: [
    {
      question: 'Hur importerar du default exporten från ./Button.js?',
      options: [
        "import Button from './Button.js';",
        "import { Button } from './Button.js';",
        "import default from './Button.js';",
        "require Button from './Button.js';",
      ],
      explain:
        'En default export importeras utan { }. Du väljer själv vad den ska heta.',
    },
    {
      question: 'math.js ser ut så här. Hur importerar du båda?',
      code: `export const PI = 3.14;
export function double(n) {
  return n * 2;
}`,
      options: [
        "import { PI, double } from './math.js';",
        "import PI, double from './math.js';",
        "import math from './math.js';",
        "import * from './math.js';",
      ],
      explain: 'Named exports importeras inom { } med exakt samma namn.',
    },
    {
      question: 'Du glömmer export framför en funktion i math.js. Vad händer?',
      options: [
        'Den kan inte importeras från andra filer',
        'Den exporteras ändå automatiskt',
        'Hela filen slutar fungera',
        'Den blir en default export',
      ],
      explain: 'Allt i en modul är privat tills du exporterar det.',
    },
    {
      question: 'Hur många default exports kan en fil ha?',
      options: ['En', 'Hur många som helst', 'Ingen', 'Två'],
      explain:
        'En fil har högst en default export, men hur många named exports som helst.',
    },
  ],
  async: [
    {
      question: 'Vad skrivs ut?',
      code: `async function getNumber() {
  return 42;
}
console.log(getNumber() instanceof Promise);`,
      options: ['true', 'false', '42', 'undefined'],
      explain: 'En async function returnerar alltid ett Promise.',
    },
    {
      question: 'Hur får du datan ur svaret från fetch?',
      options: [
        'const data = await response.json();',
        'const data = response;',
        'const data = response.json;',
        'const data = await fetch.json();',
      ],
      explain:
        'response.json() ger ett Promise med datan. Vänta in det med await.',
    },
    {
      question: 'I vilken ordning skrivs bokstäverna ut?',
      code: `console.log('A');
Promise.resolve().then(() => console.log('B'));
console.log('C');`,
      options: ['A C B', 'A B C', 'B A C', 'C B A'],
      explain: 'Koden i then körs först när den vanliga koden är klar.',
    },
    {
      question: 'Hur fångar du ett fel från await?',
      options: [
        'Med try/catch runt await',
        'Med en if-sats efter await',
        'Med console.log',
        'Det går inte att fånga',
      ],
      explain:
        'Ett fel från await kastas som vanligt och fångas med try/catch.',
    },
  ],
  'debug-js': [
    {
      question: 'Vad skrivs ut?',
      code: `const count = '2' + 3;
console.log(count);`,
      options: ['23', '5', '"2" + 3', 'Ett felmeddelande'],
      explain:
        'När ena sidan är text slår + ihop texterna i stället för att räkna.',
    },
    {
      question: 'Vad skrivs ut sist?',
      code: `const items = ['a', 'b', 'c'];
for (let i = 0; i <= items.length; i++) {
  console.log(items[i]);
}`,
      options: ['undefined', 'c', 'Ett felmeddelande', 'a'],
      explain: 'Med <= går loopen ett varv för långt. items[3] finns inte.',
    },
    {
      question: 'Vad skrivs ut?',
      code: `const scores = [3, 1, 2];
const top = scores.sort((a, b) => b - a)[0];
console.log(scores);`,
      options: ['[3, 2, 1]', '[3, 1, 2]', '[1, 2, 3]', '3'],
      explain:
        'sort ändrar arrayen den anropas på. Använd toSorted för att slippa det.',
    },
    {
      question: 'Vad skrivs ut?',
      code: `const user = { firstName: 'Ada' };
console.log(user.firstname);`,
      options: ['undefined', 'Ada', 'Ett felmeddelande', 'firstName'],
      explain:
        'JavaScript skiljer på stora och små bokstäver. firstname finns inte.',
    },
  ],
  jsx: [
    {
      question: 'Hur visar du värdet i variabeln name i JSX?',
      options: [
        '<p>{name}</p>',
        '<p>name</p>',
        '<p>${name}</p>',
        '<p>"name"</p>',
      ],
      explain: 'JavaScript i JSX skrivs inom { }.',
    },
    {
      question: 'Varför fungerar inte den här komponenten?',
      code: `function App() {
  return (
    <h1>Hej</h1>
    <p>Text</p>
  );
}`,
      options: [
        'Den måste returnera ett enda element, t.ex. en Fragment <>…</>',
        'h1 och p får inte användas ihop',
        'return måste stå på samma rad som JSX',
        'Komponenten måste heta app med litet a',
      ],
      explain: 'Lägg h1 och p i en Fragment <>…</> eller en div.',
    },
    {
      question: 'Vilket attribut ger ett element en CSS-klass i JSX?',
      options: ['className', 'class', 'css', 'style'],
      explain:
        'class är ett reserverat ord i JavaScript, så JSX använder className.',
    },
    {
      question: 'Vad visas?',
      code: `const items = 3;
const price = 25;

<p>Totalt: {items * price} kr</p>`,
      options: [
        'Totalt: 75 kr',
        'Totalt: {items * price} kr',
        'Totalt: 3 * 25 kr',
        'Totalt:  kr',
      ],
      explain: 'Det som står inom { } räknas ut innan det visas.',
    },
  ],
  props: [
    {
      question: 'Vad visas?',
      code: `function Greeting({ name }) {
  return <h1>Hej {name}!</h1>;
}

<Greeting name="Ada" />`,
      options: ['Hej Ada!', 'Hej {name}!', 'Hej name!', 'Hej !'],
      explain: 'Propen name får värdet "Ada" och visas med {name}.',
    },
    {
      question: 'Hur skickar du talet 99 som propen amount?',
      options: [
        '<Price amount={99} />',
        '<Price amount="99" />',
        '<Price amount=99 />',
        '<Price {amount: 99} />',
      ],
      explain: 'Citattecken ger text. Tal och andra värden skrivs inom { }.',
    },
    {
      question: 'Vad är children här?',
      code: `function Card({ title, children }) {
  return <section><h2>{title}</h2>{children}</section>;
}

<Card title="Hej"><p>Text</p></Card>`,
      options: [
        '<p>Text</p>',
        '"Hej"',
        'Ingenting, children måste skickas som en vanlig prop',
        'Hela Card',
      ],
      explain: 'Det som står mellan start- och sluttaggen blir children.',
    },
    {
      question: 'Får en komponent ändra sina egna props?',
      options: [
        'Nej, props är bara till för att läsas',
        'Ja, med props.namn = värde',
        'Ja, men bara text',
        'Bara om den använder let',
      ],
      explain:
        'Props kommer från föräldern. Vill du ändra något använder du state.',
    },
  ],
  lists: [
    {
      question: 'Vad saknas?',
      code: `<ul>
  {todos.map(todo => (
    <li>{todo.text}</li>
  ))}
</ul>`,
      options: [
        'Varje li behöver en key',
        'map kan inte användas i JSX',
        'li måste ligga i en ol',
        'todo.text ska stå inom citattecken',
      ],
      explain: 'Element i en lista behöver en unik key, t.ex. key={todo.id}.',
    },
    {
      question: 'Vilken key är bäst för en lista med todos?',
      options: ['todo.id', 'index från map', 'todo.text', 'Math.random()'],
      explain:
        'Ett id är unikt och ändras inte. Text kan finnas två gånger, och index ändras när listan ändras.',
    },
    {
      question: 'Vad ger map här?',
      code: `{fruits.map(fruit => <li key={fruit}>{fruit}</li>)}`,
      options: [
        'En array med li-element som React visar',
        'En sträng med alla frukter',
        'Ingenting, map ändrar fruits',
        'Bara första li-elementet',
      ],
      explain: 'React visar varje element i arrayen som map returnerar.',
    },
    {
      question: 'Du vill bara visa klara uppgifter. Vad använder du före map?',
      options: ['filter', 'find', 'reduce', 'push'],
      explain: 'todos.filter(todo => todo.done).map(…)',
    },
  ],
  conditionals: [
    {
      question: 'Vad visas när count är 0?',
      code: `<div>{count && <span>{count} nya</span>}</div>`,
      options: ['0', 'Ingenting', '0 nya', 'false'],
      explain:
        '0 && … ger 0, och React visar talet 0. Skriv count > 0 && … i stället.',
    },
    {
      question: 'Vad visas?',
      code: `function Status({ isOnline }) {
  return <p>{isOnline ? 'Online' : 'Offline'}</p>;
}

<Status />`,
      options: ['Offline', 'Online', 'Ingenting', 'Ett felmeddelande'],
      explain:
        'isOnline skickas inte, så den är undefined, och undefined är falsy.',
    },
    {
      question: 'Vad visas?',
      code: `function Warning({ message }) {
  if (!message) return null;
  return <p>{message}</p>;
}

<Warning />`,
      options: ['Ingenting', 'null', '<p></p>', 'Ett felmeddelande'],
      explain: 'En komponent som returnerar null visar ingenting.',
    },
    {
      question: 'Hur visar du en p bara när isOpen är true?',
      options: [
        '{isOpen && <p>Öppet</p>}',
        '{if (isOpen) <p>Öppet</p>}',
        '<p if={isOpen}>Öppet</p>',
        '{isOpen ? <p>Öppet</p>}',
      ],
      explain: 'if fungerar inte inuti { } i JSX. Använd && eller ? :.',
    },
  ],
  state: [
    {
      question: 'Varför ritas inte listan om?',
      code: `todos.push('Ny uppgift');
setTodos(todos);`,
      options: [
        'React får samma array och ser ingen ändring. Skapa en ny array med spread.',
        'push finns inte i React',
        'setTodos måste anropas före push',
        'todos måste skapas med let',
      ],
      explain:
        'Skriv setTodos([...todos, "Ny uppgift"]) så får React en ny array.',
    },
    {
      question: 'count är 0. Vad skrivs ut vid första klicket?',
      code: `function handleClick() {
  setCount(count + 1);
  console.log(count);
}`,
      options: ['0', '1', 'undefined', 'Ett felmeddelande'],
      explain:
        'setCount ändrar inte count direkt. Det nya värdet finns först vid nästa ritning.',
    },
    {
      question: 'Vad ger useState(0)?',
      options: [
        'Ett värde och en funktion som ändrar det: [count, setCount]',
        'Bara talet 0',
        'En funktion som returnerar 0',
        'Ett objekt { value: 0 }',
      ],
      explain:
        'useState ger en array med två saker, som man brukar plocka ut med destructuring.',
    },
    {
      question: 'Vad kallas ett sådant input?',
      code: `<input value={name} onChange={event => setName(event.target.value)} />`,
      options: [
        'Ett kontrollerat input',
        'Ett okontrollerat input',
        'Ett låst input',
        'Ett formulär',
      ],
      explain: 'Värdet styrs av state, och state uppdateras vid varje ändring.',
    },
  ],
  lifting: [
    {
      question:
        'Två komponenter bredvid varandra behöver samma state. Var ska det ligga?',
      options: [
        'I deras gemensamma förälder',
        'I båda komponenterna',
        'I den första av dem',
        'I localStorage',
      ],
      explain: 'Lyft upp state till föräldern och skicka ner det som props.',
    },
    {
      question: 'Hur kan ett barn ändra state som föräldern äger?',
      options: [
        'Föräldern skickar en funktion som prop, t.ex. onChange',
        'Barnet anropar useState i föräldern',
        'Barnet ändrar propen direkt',
        'Det går inte',
      ],
      explain:
        'Barnet anropar funktionen, och föräldern uppdaterar sitt state.',
    },
    {
      question:
        'Antalet kvar kan räknas ut från todos. Ska det ligga i eget state?',
      options: [
        'Nej, räkna ut det direkt i komponenten',
        'Ja, allt ska ligga i state',
        'Ja, och uppdatera det i en useEffect',
        'Ja, i localStorage',
      ],
      explain:
        'Det som kan räknas ut från annat state ska inte sparas en gång till.',
    },
    {
      question: 'Vem äger state query här?',
      code: `<SearchBar query={query} onQueryChange={setQuery} />`,
      options: [
        'Komponenten som renderar SearchBar',
        'SearchBar',
        'Både SearchBar och föräldern',
        'Ingen, det är en prop',
      ],
      explain: 'Föräldern har useState och skickar ner värdet och funktionen.',
    },
  ],
  effects: [
    {
      question: 'När körs effekten?',
      code: `useEffect(() => {
  document.title = title;
}, [title]);`,
      options: [
        'Första gången och varje gång title ändras',
        'Bara första gången',
        'Vid varje klick',
        'Aldrig',
      ],
      explain: 'Beroendelistan [title] säger när effekten ska köras igen.',
    },
    {
      question: 'Vad gör funktionen som en effekt returnerar?',
      options: [
        'Den städar, t.ex. stoppar ett intervall när komponenten tas bort',
        'Den körs före effekten',
        'Den sparar state',
        'Den returnerar JSX',
      ],
      explain:
        'Städfunktionen körs innan effekten körs igen och när komponenten tas bort.',
    },
    {
      question: 'När körs effekten?',
      code: `useEffect(() => {
  console.log('Körs');
});`,
      options: [
        'Efter varje ritning',
        'Bara första gången',
        'Aldrig',
        'Bara när komponenten tas bort',
      ],
      explain: 'Utan beroendelista körs effekten efter varje ritning.',
    },
    {
      question: 'Vad ska stå i beroendelistan?',
      options: [
        'Alla värden från komponenten som effekten använder',
        'Bara state, inte props',
        'Alltid en tom array',
        'Funktionen setState',
      ],
      explain: 'Glömmer du ett värde körs effekten inte när värdet ändras.',
    },
  ],
  data: [
    {
      question: 'Varför har en effekt som hämtar data ofta beroendelistan []?',
      options: [
        'Så att datan hämtas en gång, inte vid varje ritning',
        'Annars fungerar inte fetch',
        '[] gör hämtningen snabbare',
        '[] betyder att effekten aldrig körs',
      ],
      explain: 'Utan beroendelista körs effekten efter varje ritning.',
    },
    {
      question: 'Hur ser du att servern svarade med ett fel, t.ex. 404?',
      options: [
        'Kolla response.ok',
        'fetch kastar alltid ett fel',
        'Kolla om response är null',
        'Det går inte att se',
      ],
      explain:
        'fetch kastar bara fel om nätverket inte svarar. response.ok är false vid 404 och 500.',
    },
    {
      question: 'Var hämtar du data med fetch i en komponent?',
      options: [
        'I en useEffect',
        'Direkt i komponentens kropp',
        'I return',
        'I en onClick på body',
      ],
      explain:
        'Komponentens kropp körs vid varje ritning. En effekt styr när hämtningen sker.',
    },
    {
      question:
        'UserCard hämtar /api/users/ följt av userId. Vad behöver effekten?',
      options: [
        'userId i beroendelistan, så att den hämtar igen när den ändras',
        'En tom beroendelista',
        'Ett setInterval',
        'Inget, fetch sköter det själv',
      ],
      explain: 'Med [userId] körs effekten igen när propen ändras.',
    },
  ],
  'debug-react': [
    {
      question: 'Vad är fel?',
      code: `<button onClick={handleClick()}>Spara</button>`,
      options: [
        'handleClick anropas direkt när komponenten ritas, inte vid klick',
        'onClick ska skrivas onclick',
        'Knappen saknar type',
        'Inget, det är rätt',
      ],
      explain: 'Skicka funktionen utan parenteser: onClick={handleClick}.',
    },
    {
      question: 'Vad är fel?',
      code: `<input value={name} onChange={event => setName(event)} />`,
      options: [
        'Texten finns i event.target.value, inte i event',
        'onChange ska vara onInput',
        'setName tar inga argument',
        'input saknar key',
      ],
      explain: 'Skriv setName(event.target.value).',
    },
    {
      question: 'count är 0. Vad blir count efter klicket?',
      code: `function handleClick() {
  setCount(count + 1);
  setCount(count + 1);
}`,
      options: ['1', '2', '0', 'Ett felmeddelande'],
      explain:
        'Båda räknar med samma gamla count. Skriv setCount(c => c + 1) för att räkna vidare.',
    },
    {
      question: 'Vad saknas?',
      code: `useEffect(() => {
  setInterval(tick, 1000);
}, []);`,
      options: [
        'En städfunktion som stoppar intervallet',
        'tick i beroendelistan',
        'async framför funktionen',
        'Inget, det är rätt',
      ],
      explain:
        'Returnera () => clearInterval(id), annars fortsätter intervallet efter att komponenten tagits bort.',
    },
  ],
  forms: [
    {
      question: 'Vad gör ett fält kontrollerat?',
      options: [
        'value kommer från state och onChange sparar det nya värdet',
        'Att det har ett name',
        'Att det ligger i ett form',
        'Att det har en label',
      ],
      explain: 'Då vet React alltid vad som står i fältet.',
    },
    {
      question: 'Varför event.preventDefault() i onSubmit?',
      options: [
        'Annars laddar webbläsaren om sidan',
        'Annars skickas formuläret två gånger',
        'Annars töms fälten',
        'Det behövs inte',
      ],
      explain:
        'Ett form skickas som standard till servern, och sidan laddas om.',
    },
    {
      question: 'Vad läser man från en kryssruta?',
      options: [
        'event.target.checked',
        'event.target.value',
        'event.checked',
        'event.target.name',
      ],
      explain: 'En kryssruta har checked, inte ett value att läsa.',
    },
    {
      question:
        'Vad gör [event.target.name] i setForm({ ...form, [event.target.name]: event.target.value })?',
      options: [
        'Uppdaterar det fält som har samma name som inputen',
        'Skapar ett nytt fält som heter name',
        'Tar bort fältet',
        'Ingenting',
      ],
      explain: 'Hakparenteserna gör nyckeln till värdet i variabeln.',
    },
  ],
  reducer: [
    {
      question: 'Vad är en reducer?',
      options: [
        'En funktion (state, action) som returnerar nytt state',
        'En komponent som minskar listor',
        'En hook som hämtar data',
        'Ett sätt att ta bort state',
      ],
      explain: 'Reducern ändrar aldrig state, den returnerar ett nytt.',
    },
    {
      question: 'Vad ger useReducer?',
      options: ['[state, dispatch]', '[state, setState]', 'state', 'dispatch'],
      explain: 'dispatch skickar en action till reducern.',
    },
    {
      question: 'Vad ska reducern göra med en action den inte känner igen?',
      options: [
        'Returnera samma state',
        'Returnera null',
        'Tömma state',
        'Rita om',
      ],
      explain: 'Då händer ingenting, och inget går sönder.',
    },
    {
      question: 'Vad blir resultatet?',
      code: "function reducer(state, action) {\n  if (action.type === 'add') return state + action.amount;\n  return state;\n}\nreducer(10, { type: 'add', amount: 5 });",
      options: ['15', '10', '5', 'undefined'],
      explain: 'action.amount läggs till.',
    },
  ],
  context: [
    {
      question: 'Vilket problem löser context?',
      options: [
        'Att skicka props genom många led som inte använder dem',
        'Att hämta data från en server',
        'Att göra appen snabbare',
        'Att spara i localStorage',
      ],
      explain: 'Det kallas prop drilling.',
    },
    {
      question: 'Vad ger useContext om det inte finns någon Provider ovanför?',
      options: [
        'Standardvärdet från createContext',
        'undefined alltid',
        'Ett fel',
        'null alltid',
      ],
      explain: 'Värdet i createContext(…) är standardvärdet.',
    },
    {
      question: 'Vad är en bra regel för en egen hook som useTheme?',
      options: [
        'Den börjar med use och använder andra hooks',
        'Den måste returnera JSX',
        'Den får inte ha parametrar',
        'Den ska heta som contexten',
      ],
      explain: 'Namnet use… säger till React och läsaren att det är en hook.',
    },
    {
      question: 'Varför passar context och useReducer ihop?',
      options: [
        'Reducern sköter logiken, contexten ger state och dispatch till alla',
        'De är samma sak',
        'Context kräver en reducer',
        'De gör appen snabbare',
      ],
      explain: 'Komponenter långt ifrån varandra kan dela samma state.',
    },
  ],
  hooks: [
    {
      question: 'Vad är en egen hook?',
      options: [
        'En funktion som börjar med use och använder andra hooks',
        'En komponent utan JSX',
        'En inbyggd React-funktion',
        'En klass',
      ],
      explain: 'Den samlar logik som flera komponenter kan dela.',
    },
    {
      question: 'Varför useState(() => läs()) i useLocalStorage?',
      options: [
        'Så att localStorage bara läses första gången',
        'Så att värdet sparas',
        'Så att det går fortare att skriva',
        'Det är samma sak som useState(läs())',
      ],
      explain: 'Med en funktion anropas den bara när komponenten skapas.',
    },
    {
      question: 'Vad är speciellt med useRef?',
      options: [
        'Värdet finns kvar mellan renderingar utan att rita om',
        'Det ritar om varje gång det ändras',
        'Det sparar i localStorage',
        'Det fungerar bara för formulär',
      ],
      explain: 'ref.current kan ändras fritt utan att något ritas om.',
    },
    {
      question: 'Varför har en timer-hook en städfunktion?',
      options: [
        'Så att timern stoppas när komponenten försvinner',
        'Så att den går snabbare',
        'Så att värdet sparas',
        'Den behövs inte',
      ],
      explain: 'Annars fortsätter timern i bakgrunden.',
    },
  ],
  performance: [
    {
      question: 'Vad gör memo(Komponent)?',
      options: [
        'Hoppar över ritningen när props är desamma',
        'Sparar komponenten i localStorage',
        'Gör komponenten osynlig',
        'Ritar alltid om',
      ],
      explain: 'Ändras props ritas den om som vanligt.',
    },
    {
      question: 'Varför bryter onClick={() => …} memo?',
      options: [
        'En ny funktion skapas vid varje ritning',
        'Pilfunktioner är långsamma',
        'memo fungerar inte med funktioner',
        'Det gör den inte',
      ],
      explain: 'useCallback ger samma funktion tills beroendena ändras.',
    },
    {
      question: 'Vad händer om useMemo saknar ett beroende?',
      options: [
        'Ett gammalt svar visas',
        'Det kraschar',
        'Det räknas om varje gång',
        'Ingenting',
      ],
      explain: 'Det räknas bara om när något i listan ändras.',
    },
    {
      question: 'Vad händer när key ändras på en komponent?',
      options: [
        'React ser en ny komponent, och dess state börjar om',
        'Ingenting',
        'Den ritas inte',
        'Den behåller sitt state',
      ],
      explain: 'Ett enkelt sätt att nollställa ett formulär.',
    },
  ],
  'react-final': [
    {
      question: 'Var hör logiken för att boka och avboka hemma i Tassen-appen?',
      options: ['I bookingsReducer', 'I BookingList', 'I DogCard', 'I App'],
      explain: 'Komponenterna skickar bara actions.',
    },
    {
      question: 'Hur delar formuläret och listan bokningarna?',
      options: [
        'Med en context och useBookings',
        'Med props genom App',
        'Med localStorage',
        'De delar inte',
      ],
      explain: 'BookingsProvider ger { bookings, dispatch } till båda.',
    },
    {
      question: 'Vad gör den tredje parametern till useReducer?',
      options: [
        'Räknar ut startläget, t.ex. från localStorage',
        'Sparar state',
        'Är en extra action',
        'Gör reducern snabbare',
      ],
      explain: 'Den anropas bara första gången.',
    },
    {
      question: 'Vad blir nights("2026-06-10", "2026-06-13")?',
      code: 'function nights(from, to) {\n  return (new Date(to) - new Date(from)) / 86400000;\n}',
      options: ['3', '4', '2', '13'],
      explain: 'Tre dygn mellan datumen.',
    },
  ],
};
