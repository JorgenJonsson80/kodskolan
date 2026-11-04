import { describe, expect, it } from 'vitest';
import { explainError } from './friendlyErrors';

const explain = message =>
  explainError({ type: message.split(':')[0], message });

describe('explainError', () => {
  it('förklarar indrag', () => {
    expect(
      explain(
        "IndentationError: expected an indented block after 'if' statement on line 1",
      ),
    ).toMatch(/indragen/);
    expect(
      explain(
        'IndentationError: unindent does not match any outer indentation level',
      ),
    ).toMatch(/samma indrag/);
  });

  it('förklarar saknat kolon', () => {
    expect(explain("SyntaxError: expected ':'")).toMatch(/kolon/);
  });

  it('förklarar NameError och översätter Did you mean', () => {
    const text = explain(
      "NameError: name 'nman' is not defined. Did you mean: 'namn'?",
    );
    expect(text).toMatch(/känner inte till namnet `nman`/);
    expect(text).toMatch(/Menade du `namn`\?/);
  });

  it('förklarar text plus tal', () => {
    expect(
      explain('TypeError: can only concatenate str (not "int") to str'),
    ).toMatch(/text och tal/);
    expect(
      explain("TypeError: unsupported operand type(s) for +: 'int' and 'str'"),
    ).toMatch(/text och tal/);
  });

  it('förklarar index, nycklar, division och metoder', () => {
    expect(explain('IndexError: list index out of range')).toMatch(
      /första platsen är 0/,
    );
    expect(explain("KeyError: 'volym'")).toMatch(/Nyckeln 'volym'/);
    expect(explain('ZeroDivisionError: division by zero')).toMatch(/noll/);
    expect(
      explain(
        "AttributeError: 'str' object has no attribute 'uper'. Did you mean: 'upper'?",
      ),
    ).toMatch(/Text \(str\) har ingen metod.*Menade du `upper`/);
  });

  it('har ett vänligt reservsvar', () => {
    expect(explain('MemoryError')).toMatch(/Något gick fel/);
  });

  it('visar meddelandet från ett eget raise', () => {
    expect(explain('ValueError: Täckning saknas')).toMatch(
      /ValueError med meddelandet "Täckning saknas".*try och except/,
    );
  });

  it('förklarar vanliga fel med klasser', () => {
    expect(
      explain(
        'TypeError: Hund.skall() takes 0 positional arguments but 1 was given',
      ),
    ).toMatch(/saknar self/);
    expect(
      explain(
        "TypeError: Hund.__init__() missing 1 required positional argument: 'ras'",
      ),
    ).toMatch(/objekt av Hund behövs fler värden/);
    expect(
      explain(
        'TypeError: Hund.__init__() takes 2 positional arguments but 3 were given',
      ),
    ).toMatch(/fick 2 värden, men __init__ tar bara emot 1/);
    expect(
      explain(
        'TypeError: Hund.__init__() takes 1 positional argument but 2 were given',
      ),
    ).toMatch(/Saknas self\?/);
    expect(explain('TypeError: Hund() takes no arguments')).toMatch(
      /Är __init__ felstavad/,
    );
    expect(explain("NameError: name 'self' is not defined")).toMatch(
      /bara inuti en metod/,
    );
    expect(
      explain("AttributeError: 'Hund' object has no attribute 'alder'"),
    ).toMatch(/Sparas det med `self.alder = …`/);
    expect(
      explain("AttributeError: 'NoneType' object has no attribute 'alder'"),
    ).not.toMatch(/klassen/);
  });

  it('förklarar fel med pandas', () => {
    expect(
      explain(
        'ValueError: The truth value of a Series is ambiguous. Use a.empty, a.bool(), a.item(), a.any() or a.all().',
      ),
    ).toMatch(/skrivs "och" med &/);
    expect(explain("ModuleNotFoundError: No module named 'pandas'")).toMatch(
      /internetanslutningen/,
    );
    expect(explain("KeyError: 'antl'")).toMatch(/kolumnen i tabellen/);
  });

  it('förklarar assert och __str__ utan return', () => {
    expect(explain('AssertionError')).toMatch(/En assert var inte sann/);
    expect(
      explain('TypeError: __str__ returned non-string (type NoneType)'),
    ).toMatch(/inte skriva ut den med print/);
  });

  it('påminner om import och förklarar fel i moduler', () => {
    expect(explain("NameError: name 'random' is not defined")).toMatch(
      /Skriv `import random` högst upp/,
    );
    expect(explain("NameError: name 'date' is not defined")).toMatch(
      /from datetime import date/,
    );
    expect(explain("ModuleNotFoundError: No module named 'ranodm'")).toMatch(
      /ingen modul som heter `ranodm`/,
    );
    expect(
      explain("AttributeError: module 'random' has no attribute 'randInt'"),
    ).toMatch(/Modulen `random` har inget som heter `randInt`/);
  });
});
