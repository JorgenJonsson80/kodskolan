import { describe, expect, it } from 'vitest';
import { errorText } from './authText';

describe('errorText', () => {
  it('förklarar fel lösenord och pekar på Glömt lösenordet', () => {
    expect(errorText({ code: 'invalid_credentials' })).toMatch(/Glömt/);
  });

  it('känner igen spärren för många mejl', () => {
    expect(errorText({ status: 429 })).toMatch(/för många mejl/);
    expect(errorText({ message: 'Email rate limit exceeded' })).toMatch(
      /för många mejl/,
    );
  });

  it('har ett vanligt fel för resten', () => {
    expect(errorText({ code: 'okänt' })).toBe(
      'Det gick inte. Försök igen om en stund.',
    );
  });
});
