import { htmlLanguage } from '@codemirror/lang-html';
import { describe, expect, it } from 'vitest';
import { describeAt } from './codeInfo';
import { tailwindInfo } from './tailwindInfo';

describe('tailwindInfo', () => {
  it('säger vilken vanlig CSS klassen är', () => {
    expect(tailwindInfo('p-4').body).toMatch(/`padding: 16px` – 4 steg/);
    expect(tailwindInfo('px-6').body).toMatch(/padding-left och -right/);
    expect(tailwindInfo('text-3xl').body).toMatch(/font-size: 30px/);
    expect(tailwindInfo('bg-sky-600').body).toMatch(
      /`background-color` i Tailwinds färg sky-600/,
    );
    expect(tailwindInfo('grid-cols-3').body).toMatch(/repeat\(3, 1fr\)/);
    expect(tailwindInfo('rounded-lg').body).toMatch(/border-radius: 8px/);
  });

  it('säger när hover: och md: gäller', () => {
    expect(tailwindInfo('md:hover:bg-sky-700').body).toMatch(
      /bara när fönstret är minst 768 pixlar brett och när musen är över\.$/,
    );
  });

  it('ger null för egna klasser och felstavade', () => {
    expect(tailwindInfo('kort')).toBeNull();
    expect(tailwindInfo('bg-whte')).toBeNull();
    expect(tailwindInfo('fel:p-4')).toBeNull();
  });

  it('förklarar ordet under musen i class', () => {
    const src = '<div class="kort p-4 md:flex">Hej</div>';
    const tree = htmlLanguage.parser.parse(src);
    const info = describeAt(tree, src, src.indexOf('p-4') + 1);
    expect(info).toMatchObject({ title: 'p-4', from: src.indexOf('p-4') });
    expect(describeAt(tree, src, src.indexOf('md:') + 4).title).toBe('md:flex');
    expect(describeAt(tree, src, src.indexOf('kort') + 1)).toBeNull();
  });
});
