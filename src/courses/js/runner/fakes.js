// Låtsasversioner av det webbläsaren har, för övningarna om effekter.
// De skapas på nytt för varje test, så att inget följer med mellan dem.

export function createStorage() {
  const items = new Map();
  return {
    getItem: key => (items.has(String(key)) ? items.get(String(key)) : null),
    setItem(key, value) {
      this.writes += 1;
      items.set(String(key), String(value));
    },
    removeItem: key => items.delete(String(key)),
    clear: () => items.clear(),
    // Hur många gånger setItem anropats, så att testerna kan se hur
    // ofta en effekt körts.
    writes: 0,
  };
}

// En klocka som bara går när testet säger till: clock.tick(3000)
// kör allt som skulle ha hänt under tre sekunder.
export function createClock() {
  const timers = new Map();
  let now = 0;
  let nextId = 1;

  function add(callback, ms, repeat) {
    const id = nextId++;
    const delay = Math.max(Number(ms) || 0, repeat ? 1 : 0);
    timers.set(id, { callback, at: now + delay, delay, repeat });
    return id;
  }

  return {
    setTimeout: (callback, ms) => add(callback, ms, false),
    setInterval: (callback, ms) => add(callback, ms, true),
    clearTimeout: id => timers.delete(id),
    clearInterval: id => timers.delete(id),

    // run låter mount köra varje anrop så att React hinner rita om
    // mellan dem, precis som i webbläsaren.
    tick(ms, run = callback => callback()) {
      const end = now + ms;
      for (;;) {
        const due = [...timers.entries()]
          .filter(([, timer]) => timer.at <= end)
          .sort((a, b) => a[1].at - b[1].at)[0];
        if (!due) break;
        const [id, timer] = due;
        now = timer.at;
        if (timer.repeat) timer.at += timer.delay;
        else timers.delete(id);
        run(timer.callback);
      }
      now = end;
    },

    // Antal timers som fortfarande är igång.
    active: () => timers.size,
  };
}

const users = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com' },
  { id: 2, name: 'Linus Torvalds', email: 'linus@example.com' },
  { id: 3, name: 'Grace Hopper', email: 'grace@example.com' },
];

const todos = [
  { id: 1, userId: 1, title: 'Skriv första programmet', done: true },
  { id: 2, userId: 1, title: 'Beskriv maskinen', done: false },
  { id: 3, userId: 3, title: 'Hitta buggen', done: false },
];

// Svarar på adresser som /api/users eller /api/users/1/todos.
// Adresser som innehåller "broken" ger serverfel, okända ger 404.
function route(url) {
  const { pathname, searchParams } = new URL(url, 'http://academy.test');
  if (pathname.includes('broken')) return [500, { error: 'Serverfel' }];

  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] !== 'api') return [404, { error: 'Finns inte' }];

  if (parts[1] === 'todos' && parts.length === 2) return [200, todos];
  if (parts[1] === 'users') {
    if (parts.length === 2) {
      const query = (searchParams.get('q') ?? '').toLowerCase();
      return [
        200,
        users.filter(user => user.name.toLowerCase().includes(query)),
      ];
    }
    const user = users.find(item => item.id === Number(parts[2]));
    if (!user) return [404, { error: 'Användaren finns inte' }];
    if (parts.length === 3) return [200, user];
    if (parts[3] === 'todos') {
      return [200, todos.filter(todo => todo.userId === user.id)];
    }
  }
  return [404, { error: 'Finns inte' }];
}

// Ett låtsas-fetch med samma svar varje gång. delay används i
// förhandsvisningen så att man hinner se "Laddar…".
export function createFetch({ delay = 0, wait = setTimeout } = {}) {
  function fakeFetch(url) {
    fakeFetch.calls.push(String(url));
    const [status, data] = route(String(url));
    const response = {
      ok: status >= 200 && status < 300,
      status,
      json: async () => structuredClone(data),
      text: async () => JSON.stringify(data),
    };
    return delay > 0
      ? new Promise(resolve => wait(() => resolve(response), delay))
      : Promise.resolve(response);
  }
  fakeFetch.calls = [];
  return fakeFetch;
}
