import { describe, expect, it } from 'vitest';
import { evaluate } from './evaluate';

async function passes(code, tests, sourceChecks, modules) {
  const { error, results } = await evaluate(code, tests, sourceChecks, modules);
  return !error && results.every(result => result.passed);
}

describe('evaluate', () => {
  it('läser variabler som eleven skapat', async () => {
    const tests = [{ description: 'x är 5', code: 'x', expected: 5 }];
    expect(await passes('const x = 5;', tests)).toBe(true);
    expect(await passes('const x = 6;', tests)).toBe(false);
  });

  it('räknar 0 och -0 som lika', async () => {
    const tests = [{ description: 'noll', code: '-3 * 0', expected: 0 }];
    expect(await passes('', tests)).toBe(true);
  });

  it('räknar NaN som lika med NaN', async () => {
    const tests = [{ description: 'NaN', code: 'x', expected: NaN }];
    expect(await passes('const x = 0 / 0;', tests)).toBe(true);
  });

  it('jämför arrayer utifrån innehåll', async () => {
    const tests = [{ description: 'lista', code: 'x', expected: [1, 2] }];
    expect(await passes('const x = [1, 2];', tests)).toBe(true);
    expect(await passes('const x = [2, 1];', tests)).toBe(false);
  });

  it('visar vad koden gav när ett test misslyckas', async () => {
    const tests = [{ description: 'x är 5', code: 'x', expected: 5 }];
    const { results } = await evaluate('const x = "5";', tests);
    expect(results[0]).toMatchObject({ actual: '"5"', expected: '5' });
  });

  it('rapporterar syntaxfel en gång i stället för per test', async () => {
    const tests = [{ description: 'x är 5', code: 'x', expected: 5 }];
    const { error, results } = await evaluate('const x = ;', tests);
    expect(error).toContain('SyntaxError');
    expect(results).toEqual([]);
  });

  it('rapporterar fel som uppstår när koden körs', async () => {
    const tests = [{ description: 'y är 5', code: 'y', expected: 5 }];
    const { results } = await evaluate('const x = 5;', tests);
    expect(results[0].actual).toContain('ReferenceError');
  });

  it('kräver att pattern finns i koden', async () => {
    const checks = [{ description: 'for-loop', pattern: /\bfor\s*\(/ }];
    expect(await passes('for (;;) break;', [], checks)).toBe(true);
    expect(await passes('const x = 1;', [], checks)).toBe(false);
  });

  it('kräver att ett förbjudet pattern saknas', async () => {
    const checks = [
      { description: 'ingen else', pattern: /\belse\b/, forbidden: true },
    ];
    expect(await passes('if (true) {}', [], checks)).toBe(true);
    expect(await passes('if (true) {} else {}', [], checks)).toBe(false);
  });

  it('renderar en komponent skriven med JSX', async () => {
    const tests = [
      {
        description: 'Greeting renderar en rubrik',
        code: '__render(<Greeting name="Ada" />)',
        expected: '<h1 class="title">Hej Ada!</h1>',
      },
    ];
    const code =
      'function Greeting({ name }) {\n  return <h1 className="title">Hej {name}!</h1>;\n}';
    expect(await passes(code, tests)).toBe(true);
  });

  it('låter eleven importera från react', async () => {
    const tests = [
      {
        description: 'Fragment fungerar',
        code: '__render(<App />)',
        expected: '<p>a</p><p>b</p>',
      },
    ];
    const code =
      "import { Fragment } from 'react';\nexport default function App() {\n  return <Fragment><p>a</p><>{<p>b</p>}</></Fragment>;\n}";
    expect(await passes(code, tests, [], { fileName: 'App.jsx' })).toBe(true);
  });

  it('rapporterar fel i JSX som syntaxfel', async () => {
    const { error } = await evaluate('const a = <h1>Hej</h2>;', []);
    expect(error).toContain('Koden går inte att tolka');
  });

  it('hittar element i listor som saknar key', async () => {
    const tests = [
      {
        description: 'inga key-problem',
        code: '(__render(<List />), __keyProblems)',
        expected: [],
      },
    ];
    const list = items =>
      `const items = ${items};\nfunction List() {\n  return <div><h2>Lista</h2><ul>{items.map(item => <li ITEM>{item}</li>)}</ul></div>;\n}`;
    expect(
      await passes(list("['a', 'b']").replace('ITEM', 'key={item}'), tests),
    ).toBe(true);
    expect(await passes(list("['a', 'b']").replace('ITEM', ''), tests)).toBe(
      false,
    );
    expect(
      await passes(list("['a', 'a']").replace('ITEM', 'key={item}'), tests),
    ).toBe(false);
  });

  it('kör komponenter med state via __mount', async () => {
    const tests = [
      {
        description: 'räknaren ökar',
        code: "__mount(<Counter />).click('+1').click('+1').text('p')",
        expected: '2',
      },
    ];
    const code =
      "import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <div><p>{count}</p><button onClick={() => setCount(count + 1)}>+1</button></div>;\n}";
    expect(await passes(code, tests)).toBe(true);
    expect(await passes(code.replace('count + 1', 'count'), tests)).toBe(false);
  });

  it('klarar ?? och ?. i filer med import och JSX', async () => {
    const tests = [
      { description: 'värde', code: '__render(<App />)', expected: '<p>x</p>' },
    ];
    const code =
      "import { useState } from 'react';\nfunction App() {\n  const [v] = useState(() => null ?? 'x');\n  return <p>{v?.toString()}</p>;\n}";
    expect(await passes(code, tests)).toBe(true);
  });

  it('väntar in Promises och kan hämta från låtsas-API:t', async () => {
    const tests = [
      {
        description: 'namn',
        code: 'loadNames()',
        expected: ['Ada Lovelace', 'Grace Hopper'],
      },
      {
        description: 'serverfel',
        code: "fetch('/api/broken').then(response => response.status)",
        expected: 500,
      },
    ];
    const code =
      "async function loadNames() {\n  const response = await fetch('/api/users?q=a');\n  const users = await response.json();\n  return users.filter(u => u.name.includes('a')).map(u => u.name);\n}";
    expect(
      await passes(
        code
          .replace("'/api/users?q=a'", "'/api/users'")
          .replace(
            "includes('a')",
            "includes('ce') || u.name.includes('Grace')",
          ),
        tests,
      ),
    ).toBe(true);
  });

  it('renderar data som hämtats i en effekt', async () => {
    const tests = [
      {
        description: 'användarna visas',
        code: "(async () => { const app = __mount(<Users />); const before = app.text(); await app.settle(); return [before, app.count('li')]; })()",
        expected: ['Laddar…', 3],
      },
    ];
    const code =
      "import { useEffect, useState } from 'react';\nfunction Users() {\n  const [users, setUsers] = useState(null);\n  useEffect(() => {\n    fetch('/api/users').then(r => r.json()).then(setUsers);\n  }, []);\n  if (!users) return <p>Laddar…</p>;\n  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;\n}";
    expect(await passes(code, tests)).toBe(true);
  });

  it('samlar det som skrivs ut med console.log', async () => {
    const { output } = await evaluate(
      "const user = { name: 'Ada' };\nconsole.log('Hej', user, [1, 2], 5);\nconsole.log(undefined);\nnotDefined();",
      [],
    );
    expect(output).toEqual([
      'Hej {"name":"Ada"} [1,2] 5',
      'undefined',
      'ReferenceError: notDefined is not defined',
    ]);
  });
});
