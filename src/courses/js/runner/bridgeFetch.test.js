import { describe, expect, it } from 'vitest';
import { createBridgeFetch } from './bridgeFetch';
import { evaluate } from './evaluate';

// Ett låtsas-API som svarar efter en stund, som Flask i en annan worker.
function slowApi() {
  const seen = [];
  const send = request => {
    seen.push(request);
    return new Promise(resolve =>
      setTimeout(
        () =>
          resolve({
            status: request.path === '/api/hundar' ? 200 : 404,
            type: 'application/json',
            text:
              request.path === '/api/hundar'
                ? '[{"id":1,"namn":"Bamse"}]'
                : '{"fel":"Finns inte"}',
          }),
        20,
      ),
    );
  };
  return { seen, send };
}

describe('createBridgeFetch', () => {
  it('skickar metod, adress och body vidare och svarar som fetch', async () => {
    const api = slowApi();
    const fetch = createBridgeFetch(api.send);
    const svar = await fetch('/api/x?a=1', { method: 'post', body: '{"a":1}' });
    expect(api.seen).toEqual([
      { method: 'POST', path: '/api/x?a=1', kind: 'json', body: '{"a":1}' },
    ]);
    expect(svar.ok).toBe(false);
    expect(svar.status).toBe(404);
    expect(await svar.json()).toEqual({ fel: 'Finns inte' });
    expect(svar.headers.get('Content-Type')).toBe('application/json');
  });

  it('idle väntar in anropen som är på väg', async () => {
    const fetch = createBridgeFetch(slowApi().send);
    expect(await fetch.idle()).toBe(false);
    let done = false;
    fetch('/api/hundar').then(() => (done = true));
    expect(await fetch.idle()).toBe(true);
    expect(done).toBe(true);
  });

  it('settle väntar på ett långsamt API, och testet startar om först', async () => {
    const api = slowApi();
    let resets = 0;
    const code =
      "import { useEffect, useState } from 'react';\nfunction App() {\n  const [h, setH] = useState(null);\n  useEffect(() => { fetch('/api/hundar').then(r => r.json()).then(setH); }, []);\n  return <p>{h ? h[0].namn : 'Laddar…'}</p>;\n}";
    const result = await evaluate(
      code,
      [
        {
          code: '(async () => { const app = __mount(<App />); await app.settle(); return app.text(); })()',
          expected: 'Bamse',
        },
      ],
      [],
      {
        fileName: 'main.jsx',
        fetch: createBridgeFetch(api.send),
        beforeTest: async () => {
          resets += 1;
        },
      },
    );
    expect(result.results.map(test => test.passed)).toEqual([true]);
    expect(resets).toBe(1);
  });
});
