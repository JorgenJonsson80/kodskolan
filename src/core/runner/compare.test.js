import { describe, expect, it } from 'vitest';
import { isNoticeablyLonger } from './compare';

describe('isNoticeablyLonger', () => {
  it('räknar inte blanksteg och citattecken', () => {
    const solution = 'print("Hej")\n';
    expect(isNoticeablyLonger("print( 'Hej' )\n", solution)).toBe(false);
  });

  it('använder kursens normalize, t.ex. utan kommentarer', () => {
    const solution = 'print("Hej")\n';
    const withComment = '# En lång kommentar om koden\nprint("Hej")\n';
    const noComments = code => code.replace(/#.*$/gm, '').replace(/\s/g, '');
    expect(isNoticeablyLonger(withComment, solution)).toBe(true);
    expect(isNoticeablyLonger(withComment, solution, noComments)).toBe(false);
  });

  it('säger till när koden är mer än 30 % och 15 tecken längre', () => {
    const solution = 'print("Hej")\n';
    const longer = 'halsning = "Hej"\ntext = halsning\nprint(text)\n';
    expect(isNoticeablyLonger(longer, solution)).toBe(true);
  });
});
