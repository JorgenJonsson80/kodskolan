import { beforeAll, describe, expect, it } from 'vitest';
import { nodeStepStudent } from '../test/nodePython';

let step;
beforeAll(async () => {
  step = await nodeStepStudent();
});

describe('step_student', () => {
  it('ger ett steg per rad med variablerna innan raden körs', () => {
    const result = step({ code: 'x = 1\nx = x + 1\nprint(x)' });
    expect(result.steps.map(s => s.line)).toEqual([1, 2, 3, null]);
    expect(result.steps[1].vars).toEqual([['x', '1']]);
    expect(result.steps.at(-1).vars).toEqual([['x', '2']]);
    expect(result.console).toBe('2\n');
    expect(result.steps[3].out).toBe(2);
  });

  it('sparar repr direkt, så att en lista som ändras inte ändrar gamla steg', () => {
    const result = step({ code: 'a = [1]\na.append(2)\nb = 0' });
    expect(result.steps[1].vars).toEqual([['a', '[1]']]);
    expect(result.steps[2].vars).toEqual([['a', '[1, 2]']]);
  });

  it('stegar in i loopar', () => {
    const result = step({ code: 'for i in range(2):\n    print(i)' });
    expect(result.steps.map(s => s.line)).toEqual([1, 2, 1, 2, 1, null]);
  });

  it('visar funktionens egna variabler och anropar exemplet', () => {
    const result = step({
      code: 'def dubbla(tal):\n    svar = tal * 2\n    return svar',
      example: 'dubbla(4)',
    });
    expect(result.example).toBe('dubbla(4)');
    expect(result.result).toBe('8');
    const inside = result.steps.find(s => s.line === 3);
    expect(inside.scope).toBe('dubbla');
    expect(inside.vars).toEqual([
      ['tal', '4'],
      ['svar', '8'],
    ]);
  });

  it('använder inte exemplet när koden gör något själv', () => {
    const result = step({
      code: 'def f():\n    return 1\nprint(f())',
      example: 'f()',
    });
    expect(result.example).toBeNull();
  });

  it('stoppar efter 300 steg', () => {
    const result = step({ code: 'while True:\n    pass' });
    expect(result.steps).toHaveLength(300);
    expect(result.error.type).toBe('StepLimit');
  });

  it('ger felet och raden', () => {
    const result = step({ code: 'x = 1\ny = x / 0' });
    expect(result.error).toMatchObject({ type: 'ZeroDivisionError', line: 2 });
  });

  it('läser input', () => {
    const result = step({ code: 'n = input("Namn? ")', inputs: ['Ada'] });
    expect(result.steps.at(-1).vars).toEqual([['n', "'Ada'"]]);
    expect(result.console).toBe('Namn? Ada\n');
  });

  it('visar klasser som klasser och objekt med sina attribut', () => {
    const result = step({
      code: 'class Hund:\n    def __init__(self, namn):\n        self.namn = namn\n\n\nfido = Hund("Fido")\nx = 0',
    });
    expect(result.steps.at(-1).vars).toEqual([
      ['Hund', 'klass Hund'],
      ['fido', "Hund(namn='Fido')"],
      ['x', '0'],
    ]);
  });

  it('ger syntaxfel utan steg', () => {
    expect(step({ code: 'if x\n' }).syntaxError.type).toBe('SyntaxError');
  });
});
