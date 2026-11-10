import { describe, expect, it } from 'vitest';
import { explainBlocks } from './explainBlocks';

describe('explainBlocks', () => {
  it('ger stycken och listor som förut', () => {
    expect(explainBlocks('Ett stycke.\n\n- a\n- b\n\nSista.')).toEqual([
      { type: 'text', text: 'Ett stycke.' },
      { type: 'list', items: ['a', 'b'] },
      { type: 'text', text: 'Sista.' },
    ]);
  });

  it('gör kodblock av ``` och behåller tomma rader i koden', () => {
    expect(
      explainBlocks(
        'Så här:\n\n```\nclass Hund:\n    pass\n\nx = 1\n```\n\nKlart.',
      ),
    ).toEqual([
      { type: 'text', text: 'Så här:' },
      { type: 'code', code: 'class Hund:\n    pass\n\nx = 1' },
      { type: 'text', text: 'Klart.' },
    ]);
  });

  it('klarar ett kodblock direkt efter text på samma stycke', () => {
    expect(explainBlocks('Skriv:\n```python\nprint(1)\n```')).toEqual([
      { type: 'text', text: 'Skriv:' },
      { type: 'code', code: 'print(1)' },
    ]);
  });
});
