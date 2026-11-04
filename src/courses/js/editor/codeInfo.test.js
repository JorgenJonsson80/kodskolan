import { javascriptLanguage } from '@codemirror/lang-javascript';
import { describe, expect, it } from 'vitest';
import { describeAt, memberOptionsFor } from './codeInfo';

const parser = javascriptLanguage.parser.configure({ dialect: 'jsx' });

function hover(src, target, offset = 0) {
  const pos = src.indexOf(target) + offset;
  return describeAt(parser.parse(src), src, pos);
}

const SRC = `const user = { name: 'Ada', address: { city: 'Lund' } };
const nums = [1, 2, 3];
function greet(person) {
  return person.name.toUpperCase();
}
const doubled = nums.map(n => n * 2);
const { name } = user;
for (const item of nums) {}
console.log(user.name, user.address.city, user.age, doubled.length);`;

describe('describeAt', () => {
  it('säger vilket objekt en egenskap tillhör', () => {
    expect(hover(SRC, 'user.name,', 6).body).toBe(
      "Egenskapen `name` i objektet `user`. Värde: `'Ada'`",
    );
    expect(hover(SRC, 'name:', 1).body).toBe(
      'Egenskapen `name` tillhör objektet `user`.',
    );
    expect(hover(SRC, 'city:', 1).title).toBe('user.address.city');
    expect(hover(SRC, 'address.city', 9).body).toContain('`user.address`');
  });

  it('varnar för egenskaper som inte finns', () => {
    expect(hover(SRC, 'user.age', 6).body).toContain('`undefined`');
  });

  it('känner igen inbyggda objekt och metoder', () => {
    expect(hover(SRC, 'console.log', 9).body).toContain(
      'inbyggda objektet `console`',
    );
    expect(hover(SRC, 'nums.map', 6).body).toBe(
      '`map` tillhör arrayen `nums`. Alla arrayer har den.',
    );
    expect(hover(SRC, 'toUpperCase', 1).body).toContain('strängmetod');
  });

  it('berättar var en variabel kommer ifrån', () => {
    expect(hover(SRC, 'person.name', 1).body).toBe(
      'Parameter till funktionen `greet`.',
    );
    expect(hover(SRC, 'n * 2', 0).body).toBe(
      'Parameter i callbacken till `.map()`.',
    );
    expect(hover(SRC, 'doubled.length', 1).body).toBe(
      'Variabel som skapas med `const` på rad 6. Den får det som `nums.map()` returnerar.',
    );
    expect(hover(SRC, '{ name } =', 2).body).toContain('Plockad ur `user`');
    expect(hover(SRC, 'item', 1).body).toContain('ur `nums` i for...of');
    expect(hover(SRC, 'greet', 1).body).toBe(
      'Funktion som deklareras på rad 3.',
    );
  });

  it('låter en inre variabel gå före en yttre med samma namn', () => {
    const src = 'const x = 1;\nconst f = x => x + 1;';
    expect(hover(src, 'x + 1').body).toContain('Parameter');
    expect(hover(src, 'x = 1').body).toContain('rad 1');
  });
});

describe('memberOptionsFor', () => {
  function options(src, receiverText) {
    const tree = parser.parse(src);
    const receiver = tree.resolveInner(src.lastIndexOf(receiverText) + 1, 1);
    return memberOptionsFor(tree, src, receiver)?.map(o => o.label);
  }

  it('föreslår egenskaperna i ett objekt', () => {
    expect(
      options("const user = { name: 'Ada', age: 3 };\nuser.", 'user'),
    ).toEqual(['name', 'age']);
  });

  it('föreslår array-metoder för en array', () => {
    expect(options('const nums = [1];\nnums.', 'nums')).toContain('filter');
  });

  it('föreslår inget när det inte syns vad variabeln är', () => {
    expect(options('function f(x) { x. }', 'x')).toBeUndefined();
  });
});
