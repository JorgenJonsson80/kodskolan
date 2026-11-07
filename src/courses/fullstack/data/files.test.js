import { beforeAll, describe, expect, it } from 'vitest';
import { nodeFullstack } from '../test/nodeFullstack';
import * as FILES from './files';

const PAGES = {
  PAGE_API: FILES.TASSEN_API,
  PAGE_PRIS: FILES.TASSEN_PRIS,
  PAGE_FILTER: FILES.TASSEN_FILTER,
  PAGE_LEDIGA: FILES.TASSEN_LEDIGA,
  PLAYGROUND_PAGE: FILES.TASSEN_API,
};

const mounted = text =>
  `(async () => { const app = __mount(<App />); await app.settle(); return app.text(); })()`.replace(
    'return app.text()',
    `return ${text}`,
  );

let run;
beforeAll(async () => {
  ({ run } = await nodeFullstack());
}, 120000);

describe.each(Object.entries(PAGES))('%s', (name, backend) => {
  it('går igenom TypeScript och visar hundarna från API:t', async () => {
    const raw = await run({
      lang: 'tsx',
      code: FILES[name],
      backend,
      tests: [
        {
          description: 'Hundarna',
          code:
            name === 'PAGE_LEDIGA'
              ? "(async () => { const app = __mount(<App />); app.click('Sök lediga'); await app.settle(); return app.count('li'); })()"
              : mounted("app.count('li')"),
          expected: 3,
        },
      ],
    });
    expect(raw.error).toBeNull();
    expect(raw.syntaxError).toBeNull();
    expect(raw.tests.map(test => test.passed)).toEqual([true]);
  });
});

describe('API:t', () => {
  it('har ett steg per övning i bana 1, och sist hela API:t', () => {
    expect(FILES.API_STEG).toHaveLength(8);
    expect(FILES.TASSEN_API).toBe(FILES.API_STEG.at(-1));
  });

  it('svarar på det sidan i bana 1 behöver', async () => {
    const raw = await run({
      lang: 'tsx',
      code: FILES.PAGE_API,
      backend: FILES.TASSEN_API,
      tests: [
        {
          description: 'Boka och se bokningen som personal',
          code: "(async () => { const app = __mount(<App />); await app.settle(); app.click('Saga'); await app.settle(); app.submit(); await app.settle(); return app.text().includes('Bokad! Bokning nr 1'); })()",
          expected: true,
        },
      ],
    });
    expect(raw.tests.map(test => test.passed)).toEqual([true]);
  });
});
