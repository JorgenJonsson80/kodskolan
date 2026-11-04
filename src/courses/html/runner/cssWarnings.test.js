import { describe, expect, it } from 'vitest';
import { htmlWarnings } from './htmlWarnings';

const page = css =>
  `<style>\n${css}\n</style>\n<h1 class="kort" id="topp">Hej</h1>\n`;
const warn = css => htmlWarnings(page(css));

describe('CSS-varningar', () => {
  it('säger inget om riktig CSS', () => {
    expect(
      warn(
        `/* en kommentar: color red */
h1, .kort:hover { color: #ff6347; background-color: transparent; }
#topp { margin: 0 auto; padding: 1rem 2px; border: 2px solid navy; }
@media (max-width: 600px) {
  h1::before { content: "x"; font-size: 1.5rem; line-height: 1.5; }
}
a[href^="http"] { --egen: 3; -webkit-text-stroke: 1px; }`,
      ),
    ).toEqual([]);
  });

  it('föreslår rätt egenskap vid stavfel', () => {
    expect(warn('h1 { colour: red; }')).toEqual([
      '`colour` på rad 2 finns inte i CSS – menade du `color`?',
    ]);
    expect(warn('h1 { backgruond-color: red; }')[0]).toMatch(
      /menade du `background-color`\?/,
    );
  });

  it('hittar ett semikolon som saknas', () => {
    expect(warn('h1 {\n  color: red\n  background-color: blue;\n}')).toEqual([
      'Det saknas ett `;` efter `red` på rad 3. Utan det blir `background-color` en del av värdet, och webbläsaren struntar i båda.',
    ]);
  });

  it('hittar en regel som aldrig stängs', () => {
    expect(warn('h1 {\n  color: red;\n.kort { color: blue; }')).toEqual([
      'Regeln `h1` på rad 2 stängs aldrig – skriv `}` efter den sista egenskapen.',
    ]);
    expect(warn('h1 { color: red;')[0]).toMatch(
      /Regeln `h1` på rad 2 stängs aldrig/,
    );
    expect(warn('h1 { color: red; } }')[0]).toMatch(
      /`}` på rad 2 stänger ingenting/,
    );
  });

  it('säger till om enhet, kolon, färg och hexkod', () => {
    expect(warn('h1 { width: 300; }')[0]).toMatch(
      /300 behöver en enhet, t\.ex\. `300px`/,
    );
    expect(warn('h1 { color red; }')[0]).toBe(
      '`color red` på rad 2 saknar kolon – skriv `color: red;`.',
    );
    expect(warn('h1 { color: röd; }')[0]).toMatch(
      /`röd` på rad 2 är ingen färg i CSS – menade du `red`\?/,
    );
    expect(warn('h1 { color: tomatoe; }')[0]).toMatch(/menade du `tomato`\?/);
    expect(warn('h1 { color: #ff00g0; }')[0]).toMatch(/ingen hexkod/);
  });

  it('säger till om selektorer som inte hittar något', () => {
    expect(warn('.krot { color: red; }')).toEqual([
      '`.krot` på rad 2 hittar inget – ingen tagg har class="krot". Menade du `.kort`?',
    ]);
    expect(warn('#botten { color: red; }')[0]).toMatch(
      /ingen tagg har id="botten"/,
    );
    expect(warn('h7 { color: red; }')[0]).toMatch(
      /`h7` i regeln på rad 2 är ingen tagg i HTML – menade du `h6`\?/,
    );
  });

  it('säger till om egenskaper utanför en regel', () => {
    expect(warn('color: red;\nh1 { color: blue; }')[0]).toMatch(
      /står utanför en regel/,
    );
  });

  it('säger till om flex- och grid-egenskaper utan display', () => {
    expect(warn('.kort { justify-content: center; gap: 8px; }')).toEqual([
      '`justify-content` i `.kort` på rad 2 gör bara något när elementet har `display: flex` eller `display: grid`. Lägg till det i samma regel.',
    ]);
    expect(
      warn('h1 { display: flex; grid-template-columns: 1fr 1fr; }'),
    ).toEqual([
      '`grid-template-columns` i `h1` på rad 2 gör bara något när elementet har `display: grid`. Lägg till det i samma regel.',
    ]);
    expect(
      warn(
        `.kort { display: flex; }
@media (max-width: 600px) { .kort { flex-direction: column; gap: 4px; } }
h1 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }`,
      ),
    ).toEqual([]);
  });
});
