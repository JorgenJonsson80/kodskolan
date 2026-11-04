import { describe, expect, it } from 'vitest';
import { nodeRunPage } from '../test/nodePage';

const PAGE = `<style>
  body { font-size: 1rem; }
  h1 { color: tomato; font-size: 2rem; font-family: "Comic Sans MS", cursive; }
  p { color: #1e3a8a; line-height: 1.5; padding: 1rem 20px; }
  .kort { width: 300px; padding: 20px; border: 5px solid navy; margin: 0 auto; }
  .ruta { width: 300px; padding: 20px; box-sizing: border-box; }
  nav a:hover { color: darkorange; }
  em { background-color: rgba(0, 0, 0, 0); font-size: 2em; }
</style>
<h1>Hej</h1><p>Text <em>här</em></p><p>Två</p>
<div class="kort">Kort</div><div class="ruta">Ruta</div><nav><a href="#">Länk</a></nav>`;

const run = code =>
  nodeRunPage({ code: PAGE, tests: [{ code }] }).tests[0].actual;

describe('hjälparna för CSS (i jsdom)', () => {
  it('ger färger som namn eller hex', () => {
    expect(run("colorOf('h1')")).toBe('tomato');
    expect(run("colorsOf('p')")).toEqual(['#1e3a8a', '#1e3a8a']);
    expect(run("colorOf('em', 'background-color')")).toBe('transparent');
    expect(run("colorOf('.kort', 'border-top-color')")).toBe('navy');
    expect(run("colorName('rgb(255, 0, 0)')")).toBe('red');
  });

  it('räknar om storlekar till pixlar', () => {
    expect(run("px('h1', 'font-size')")).toBe(32);
    expect(run("px('em', 'font-size')")).toBe(32);
    expect(run("px('p', 'line-height')")).toBe(24);
    expect(run("px('p', 'padding-top')")).toBe(16);
    expect(run("px('p', 'padding-left')")).toBe(20);
    expect(run("px('.kort', 'border-left-width')")).toBe(5);
    expect(run("px('.ruta', 'border-left-width')")).toBe(0);
  });

  it('ger typsnitt, hover, bredd och centrering', () => {
    expect(run("font('h1')")).toBe('comic sans ms');
    expect(run("colorName(hover('nav a', 'color'))")).toBe('darkorange');
    expect(run("hover('h1', 'color')")).toBe(null);
    expect(run("boxWidth('.kort')")).toBe(350);
    expect(run("boxWidth('.ruta')")).toBe(300);
    expect(run("centered('.kort')")).toBe(true);
    expect(run("centered('.ruta')")).toBe(false);
  });
});
