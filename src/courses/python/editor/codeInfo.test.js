import { parser } from '@lezer/python';
import { describe, expect, it } from 'vitest';
import { describeAt, memberOptionsFor } from './codeInfo';

// Beskriver det som står på första förekomsten av `word` (efter `skip`
// förekomster), som om musen var över det.
function hover(src, word, skip = 0) {
  let pos = -1;
  for (let i = 0; i <= skip; i++) pos = src.indexOf(word, pos + 1);
  return describeAt(parser.parse(src), src, pos, 1);
}

const SRC = `namn = input("Namn? ")
tal = [1, 2]
lager = {"volym": 3}
def summa(lista):
    total = 0
    for sak in lista:
        total += sak
    return total
tal.append(5)
print(lager["volym"], namn.upper(), smma)
if 7 % 2 == 1:
    pass
`;

describe('describeAt', () => {
  it('säger var en variabel skapas och vad den innehåller', () => {
    expect(hover(SRC, 'namn', 1).body).toBe(
      'Variabel. Skapas på rad 1. Innehåller text (str).',
    );
    expect(hover(SRC, 'tal.append').body).toMatch(/Innehåller en lista/);
  });

  it('känner igen parametrar, loopvariabler och lokala variabler', () => {
    expect(hover(SRC, 'lista', 1).body).toMatch(
      /Parameter till funktionen `summa`/,
    );
    expect(hover(SRC, 'sak', 1).body).toMatch(
      /Loopvariabel i funktionen `summa` i for-loopen på rad 6/,
    );
    expect(hover(SRC, 'total', 2).body).toMatch(
      /Variabel i funktionen `summa`. Skapas på rad 5/,
    );
  });

  it('säger vad en metod hör till', () => {
    expect(hover(SRC, 'append').body).toMatch(/hör till listor/);
    expect(hover(SRC, 'upper').body).toMatch(/hör till text/);
  });

  it('känner igen nycklar i en dictionary', () => {
    expect(hover(SRC, '"volym"', 1).body).toMatch(
      /Nyckel i dictionaryn `lager`/,
    );
  });

  it('förklarar nyckelord, inbyggda funktioner och operatorer', () => {
    expect(hover(SRC, 'for').body).toMatch(/loop/);
    expect(hover(SRC, 'def').body).toMatch(/funktion/);
    expect(hover(SRC, 'print').body).toMatch(/Inbyggd funktion/);
    expect(hover(SRC, '%').body).toMatch(/Rest vid division/);
    expect(hover(SRC, '==').body).toMatch(/lika med/);
    expect(hover(SRC, '+=').body).toMatch(/x = x \+ 2/);
  });

  it('kallar felen för fel, inte funktioner', () => {
    const src = 'try:\n    x = 1\nexcept ValueError as fel:\n    pass\n';
    const info = hover(src, 'ValueError');
    expect(info.title).toBe('ValueError');
    expect(info.body).toMatch(/Ett inbyggt fel i Python/);
  });

  it('förklarar moduler och det som hämtas ur dem', () => {
    const src =
      'import random\nfrom datetime import date\nprint(random.randint(1, 6), date(2026, 1, 1))\n';
    expect(hover(src, 'random', 1).body).toMatch(
      /Modul som hämtas med import på rad 1\. Slump/,
    );
    expect(hover(src, 'randint').title).toBe('random.randint()');
    expect(hover(src, 'randint').body).toMatch(/Hör till modulen `random`/);
    expect(hover(src, 'date', 1).title).toBe('datetime.date()');
    expect(hover(src, 'date', 1).body).toMatch(
      /Hämtas ur modulen `datetime` på rad 2/,
    );
  });

  it('förklarar self, attribut och metoder i en klass', () => {
    const src =
      'class Hund:\n    def __init__(self, namn):\n        self.namn = namn\n\n    def skall(self):\n        return self.namn + self.ljud()\n';
    expect(hover(src, 'self').body).toMatch(/Objektet som metoden körs på/);
    expect(hover(src, 'namn', 1).title).toBe('self.namn');
    expect(hover(src, 'ljud').title).toBe('self.ljud()');
    expect(hover(src, 'skall').body).toMatch(/Metod i klassen `Hund`/);
  });

  it('varnar för namn som inte skapas någonstans', () => {
    expect(hover(SRC, 'smma').body).toMatch(/skapas inte någonstans/);
  });
});

describe('memberOptionsFor', () => {
  it('föreslår metoder när det syns vad variabeln innehåller', () => {
    const src = 'tal = [1]\ntal.';
    const tree = parser.parse(src);
    const receiver = tree.resolveInner(src.length - 2, 1);
    const options = memberOptionsFor(tree, src, receiver);
    expect(options.map(option => option.label)).toContain('append');
  });

  it('föreslår det som finns i en modul', () => {
    const src = 'import math\nmath.';
    const tree = parser.parse(src);
    const receiver = tree.resolveInner(src.length - 2, 1);
    const options = memberOptionsFor(tree, src, receiver);
    expect(options.map(option => option.label)).toEqual([
      'sqrt',
      'pi',
      'ceil',
      'floor',
    ]);
    expect(options[0].detail).toBe('modulen math');
  });

  it('känner igen pandas och tabeller', () => {
    const src = 'import pandas as pd\ndf = pd.read_csv("a.csv")\ndf.';
    const tree = parser.parse(src);
    const options = memberOptionsFor(
      tree,
      src,
      tree.resolveInner(src.length - 2, 1),
    );
    expect(options.map(option => option.label)).toContain('groupby');
    expect(options[0].detail).toBe('tabeller');
    expect(hover(src, 'read_csv').title).toBe('pandas.read_csv()');
    expect(hover(src, 'df', 1).body).toMatch(/Innehåller en tabell/);
  });

  it('föreslår inget när det inte syns', () => {
    const src = 'def f(x):\n    x.';
    const tree = parser.parse(src);
    expect(
      memberOptionsFor(tree, src, tree.resolveInner(src.length - 2, 1)),
    ).toBeNull();
  });
});
