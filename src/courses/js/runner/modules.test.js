import { describe, expect, it } from 'vitest';
import { createModuleSystem } from './modules';

function load(files, path = './main.js') {
  return createModuleSystem(files).require(path);
}

describe('modulsystemet', () => {
  it('hanterar named exports med const, function och { }', () => {
    const exports = load({
      'main.js':
        'export const a = 1;\nexport function b() { return 2; }\nconst c = 3;\nexport { c, c as d };',
    });
    expect({ ...exports }).toEqual({ a: 1, b: exports.b, c: 3, d: 3 });
    expect(exports.b()).toBe(2);
  });

  it('hanterar default export av deklaration och uttryck', () => {
    expect(
      load({
        'main.js': 'export default function App() { return 1; }',
      }).default(),
    ).toBe(1);
    expect(load({ 'main.js': 'export default 40 + 2;' }).default).toBe(42);
  });

  it('importerar default, named, alias och namespace', () => {
    const exports = load({
      'lib.js': 'export const x = 1;\nexport const y = 2;\nexport default 3;',
      'main.js': `import def, { x, y as z } from './lib';
import * as lib from './lib.js';
export const result = [def, x, z, lib.y];`,
    });
    expect(exports.result).toEqual([3, 1, 2, 2]);
  });

  it('klarar import över flera rader', () => {
    const exports = load({
      'lib.js': 'export const x = 1;\nexport const y = 2;',
      'main.js':
        "import {\n  x,\n  y,\n} from './lib.js';\nexport const sum = x + y;",
    });
    expect(exports.sum).toBe(3);
  });

  it('kör varje fil bara en gång', () => {
    const exports = load({
      'counter.js': 'export const list = [];',
      'a.js': "import { list } from './counter.js';\nlist.push('a');",
      'main.js':
        "import './a.js';\nimport { list } from './counter.js';\nexport const result = list;",
    });
    expect(exports.result).toEqual(['a']);
  });

  it('förklarar när default och named blandas ihop', () => {
    expect(() =>
      load({
        'lib.js': 'export const x = 1;',
        'main.js': "import x from './lib.js';",
      }),
    ).toThrow(/ingen default-export/);
    expect(() =>
      load({
        'lib.js': 'export default 1;',
        'main.js': "import { x } from './lib.js';",
      }),
    ).toThrow(/importeras utan \{ \}/);
  });

  it('säger till när filen eller paketet saknas', () => {
    expect(() => load({ 'main.js': "import x from './nope.js';" })).toThrow(
      /Hittar ingen fil/,
    );
    expect(() =>
      load({ 'main.js': "import { useState } from 'react';" }),
    ).toThrow(/Paketet 'react'/);
  });

  it('lämnar kod utan import och export orörd', () => {
    expect(load({ 'main.js': "const important = 'export';" })).toEqual({});
  });
});
