import { describe, expect, it } from 'vitest';
import { errorTitle, explainError } from './friendlyErrors';

describe('explainError', () => {
  it('har en reservtext på svenska', () => {
    expect(explainError({ message: 'okänt' })).toMatch(/Något gick fel/);
  });

  it('säger på vilken rad', () => {
    expect(errorTitle({ line: 3 }, true)).toBe(
      'Webbläsaren kunde inte läsa koden på rad 3',
    );
  });
});
