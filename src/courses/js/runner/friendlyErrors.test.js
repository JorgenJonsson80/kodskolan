import { describe, expect, it } from 'vitest';
import { evaluate } from './evaluate';
import { explainError } from './friendlyErrors';

// Kör koden på riktigt, så att testerna följer de riktiga felmeddelandena.
async function explain(code) {
  const { error, output = [] } = await evaluate(code, []);
  return explainError(error ?? output.at(-1), code);
}

describe('explainError', () => {
  it('känner igen text utan citattecken', async () => {
    expect(await explain('console.log(Hej världen!);')).toContain(
      'text utan citattecken på rad 1',
    );
  });

  it('känner igen en sträng som inte avslutas', async () => {
    expect(await explain("console.log('Hej);")).toContain(
      'saknar sitt avslutande citattecken',
    );
  });

  it('känner igen en saknad parentes', async () => {
    expect(await explain('if (true {\n}')).toContain('Det saknas en `)`');
  });

  it('förklarar vanliga fel när koden körs', async () => {
    expect(await explain('console.log(nmae);')).toContain(
      'Det finns inget som heter `nmae`',
    );
    expect(await explain('const a = 1;\na = 2;')).toContain('Använd let');
    expect(await explain('const user = {};\nuser.address.city;')).toContain(
      'läsa `city` från något som är undefined',
    );
    expect(await explain('[1].maps(x => x);')).toContain(
      '`[1].maps` är ingen funktion',
    );
    expect(await explain('const a = 1;\nconst a = 2;')).toContain(
      'Du skapar `a` två gånger',
    );
  });

  it('ger null för fel den inte känner igen', () => {
    expect(explainError('Error: något annat')).toBeNull();
    expect(explainError(null)).toBeNull();
  });
});
