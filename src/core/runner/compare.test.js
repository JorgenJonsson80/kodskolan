import { describe, expect, it } from 'vitest';
import { isNoticeablyLonger } from './compare';

describe('isNoticeablyLonger', () => {
  it('räknar inte kommentarer, blanksteg och citattecken', () => {
    const solution = 'print("Hej")\n';
    expect(
      isNoticeablyLonger("# Min lösning\nprint( 'Hej' )\n", solution),
    ).toBe(false);
  });

  it('säger till när koden är mer än 30 % och 15 tecken längre', () => {
    const solution = 'print("Hej")\n';
    const longer = 'halsning = "Hej"\ntext = halsning\nprint(text)\n';
    expect(isNoticeablyLonger(longer, solution)).toBe(true);
  });
});
