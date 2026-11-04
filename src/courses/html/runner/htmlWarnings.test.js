import { describe, expect, it } from 'vitest';
import { htmlWarnings } from './htmlWarnings';

describe('htmlWarnings', () => {
  it('säger inget om korrekt kod', () => {
    expect(
      htmlWarnings(`<!doctype html>
<h1>Hej</h1>
<!-- <pp>bortkommenterad</p> -->
<p>3 < 5 och <strong>fet</strong><br>ny rad</p>
<hr />
<img src="katt.svg" alt="">
<style>p > em { color: red; }</style>`),
    ).toEqual([]);
  });

  it('hittar en tagg som aldrig stängs', () => {
    expect(htmlWarnings('<h1>Hej</h1>\n<p>Det är <em>varmt\n')).toEqual([
      '<p> på rad 2 stängs aldrig. Skriv </p> där den ska sluta.',
      '<em> på rad 2 stängs aldrig – resten av sidan blir kursiv. Skriv </em> där den ska sluta.',
    ]);
  });

  it('hittar taggar som stängs i fel ordning', () => {
    const [warning] = htmlWarnings('<p>Hej <strong>du\n</p></strong>');
    expect(warning).toMatch(
      /^<\/p> på rad 2 stänger <p>, men <strong> från rad 1 är fortfarande öppen/,
    );
  });

  it('hittar en stängande tagg utan öppnande', () => {
    expect(htmlWarnings('<p>Hej</p></h2>')).toEqual([
      '</h2> på rad 1 stänger en <h2> som aldrig öppnades.',
    ]);
  });

  it('föreslår taggen man troligen menade', () => {
    expect(htmlWarnings('<h7>A</h7><pp>B</pp><bold>C</bold>')).toEqual([
      '<h7> på rad 1 finns inte i HTML – menade du <h6>?',
      '<pp> på rad 1 finns inte i HTML – menade du <p>?',
      '<bold> på rad 1 finns inte i HTML – menade du <strong>?',
    ]);
  });

  it('varnar för bilder utan alt och för </br>', () => {
    expect(htmlWarnings('<img src="a.svg">\nA</br>')).toEqual([
      expect.stringMatching(/^<img> på rad 1 saknar alt/),
      '</br> på rad 2 behövs inte – <br> stängs aldrig.',
    ]);
  });
});
