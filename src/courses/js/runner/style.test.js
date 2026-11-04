import { describe, expect, it } from 'vitest';
import { findMissingSemicolons, styleNotes } from './style';

describe('findMissingSemicolons', () => {
  it('hittar satser utan ;', () => {
    const code = 'const a = 1\nlet b = 2;\nb = a + 1\nconsole.log(b)';
    expect(findMissingSemicolons(code)).toEqual([1, 3, 4]);
  });

  it('kräver inte ; efter funktioner, if och loopar', () => {
    const code = `function add(a, b) {
  return a + b;
}
if (true) {
  add(1, 2);
}
for (let i = 0; i < 3; i++) {
  add(i, i);
}
for (const x of [1]) {
  add(x, x);
}`;
    expect(findMissingSemicolons(code)).toEqual([]);
  });

  it('hittar return utan ; inuti funktioner', () => {
    expect(findMissingSemicolons('function f() {\n  return 1\n}')).toEqual([2]);
  });

  it('klarar import, export och JSX', () => {
    const code = `import { useState } from 'react'
export default function App() {
  return <p>Hej</p>;
}
export const x = 1;
export { x as y }`;
    expect(findMissingSemicolons(code)).toEqual([1, 6]);
  });

  it('räknar inte kommentarer som en del av satsen', () => {
    expect(
      findMissingSemicolons('const a = 1 // ett\nconst b = 2; // två'),
    ).toEqual([1]);
  });
});

describe('styleNotes', () => {
  it('ger inget tips när allt har ;', () => {
    expect(styleNotes('const a = 1;')).toEqual([]);
  });

  it('räknar upp raderna', () => {
    expect(styleNotes('a()\nb()\nc()')[0]).toMatch(/^Rad 1, 2 och 3 saknar ;/);
  });
});

describe('styleNotes med flera rader och }', () => {
  it('förklarar ; efter } när en arrow function sparas i en variabel', () => {
    const notes = styleNotes('const add = (a, b) => {\n  return a + b;\n}');
    expect(notes).toHaveLength(2);
    expect(notes[1]).toMatch(/^Rad 3 slutar med }/);
  });

  it('kräver bara ; på sista raden när en sats delas upp', () => {
    const code =
      'const total = [1, 2]\n  .map(n => n * 2)\n  .reduce((a, b) => a + b, 0);';
    expect(styleNotes(code)).toEqual([]);
  });
});
