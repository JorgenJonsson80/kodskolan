import { htmlLanguage } from '@codemirror/lang-html';
import { describe, expect, it } from 'vitest';
import { describeAt } from './codeInfo';

const SRC = `<!doctype html>
<p class="intro">Hej &lt; <strong>du</strong>
  <em>där
</p></b>
<img src="bilder/katt.svg" alt="">
<a href="#recept" target="_blank">Recept</a>
<input type="nummer" name="antal">
<pp>Stavfel</pp>
<!-- en lapp -->
<style>
  h1 .kort #topp { color: #ff6347; margin: 2rem auto; display: flex; }
  a:hover { gap: 1fr; margin-bottom: 2px; colour: red; }
</style>
`;

const tree = htmlLanguage.parser.parse(SRC);

// Det som står vid första förekomsten av needle (plus offset).
function at(needle, offset = 0) {
  const pos = SRC.indexOf(needle);
  if (pos === -1) throw new Error(`hittar inte ${needle}`);
  return describeAt(tree, SRC, pos + offset);
}

describe('describeAt', () => {
  it('förklarar taggen och var den stängs', () => {
    const info = at('strong');
    expect(info.title).toBe('<strong>');
    expect(info.body).toMatch(/viktigt/);
    expect(info.body).toMatch(/Stängs på rad 2\. Ligger i `<p>` från rad 2\./);
  });

  it('säger när en tagg aldrig stängs', () => {
    expect(at('em>').body).toMatch(/Stängs aldrig – skriv `<\/em>`/);
  });

  it('säger vilken tagg en stängande tagg stänger', () => {
    expect(at('/p>', 1).body).toMatch(/Stänger `<p>` från rad 2/);
    expect(at('</b>', 2).body).toMatch(/ingen öppen `<b>`/);
  });

  it('säger att img aldrig stängs', () => {
    expect(at('img').body).toMatch(/Har inget innehåll och stängs aldrig/);
  });

  it('föreslår rätt tagg vid stavfel', () => {
    expect(at('pp>').body).toMatch(/finns inte i HTML.*Menade du `<p>`\?/);
  });

  it('förklarar attribut och värden', () => {
    expect(at('alt').body).toMatch(/Attribut på `<img>`/);
    expect(at('""', 0).body).toMatch(/bara pynt/);
    expect(at('"#recept"').body).toMatch(/id="recept"/);
    expect(at('"_blank"').body).toMatch(/ny flik/);
    expect(at('"nummer"').body).toMatch(/ingen typ som finns/);
    expect(at('name=').body).toMatch(/Utan `name` skickas fältet inte/);
  });

  it('förklarar tecken, kommentarer och doctype', () => {
    expect(at('&lt;').body).toMatch(/Blir `<`/);
    expect(at('en lapp').title).toBe('<!-- -->');
    expect(at('doctype').title).toBe('<!doctype html>');
  });

  it('förklarar CSS i <style>', () => {
    expect(at('color').body).toMatch(
      /^Textens färg\. Gäller `h1 \.kort #topp`/,
    );
    expect(at('kort').title).toBe('.kort');
    expect(at('#topp').body).toMatch(/id="topp"/);
    expect(at('h1 .kort').body).toMatch(/alla `<h1>`/);
    expect(at('#ff6347').body).toMatch(/hex/);
    expect(at('2rem', 1).body).toMatch(/textstorleken/);
    expect(at('flex;').body).toMatch(/flexbox/);
    expect(at('hover').title).toBe(':hover');
    expect(at('1fr').body).toMatch(/grid/);
    expect(at('margin-bottom').body).toMatch(
      /^Luft \*utanför\* kanten, bara nere\. Gäller `a:hover`/,
    );
    expect(at('colour').body).toMatch(/finns inte i CSS.*Menade du `color`\?/);
  });

  it('svarar null för vanlig text', () => {
    expect(at('Stavfel')).toBeNull();
  });
});
