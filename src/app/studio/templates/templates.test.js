import { JSDOM, VirtualConsole } from 'jsdom';
import { describe, expect, it } from 'vitest';
import { defaultFeatures, TEMPLATES } from '.';

// Varje mall byggs med alla kombinationer av val och körs i jsdom: inga
// fel, och det viktigaste går att göra.
function run(html) {
  const errors = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', error => errors.push(error.message));
  const dom = new JSDOM(html, {
    runScripts: 'dangerously',
    url: 'https://app.test/',
    virtualConsole,
    beforeParse(window) {
      window.confirm = () => true;
      window.alert = () => {};
      window.print = () => {};
    },
  });
  return { window: dom.window, document: dom.window.document, errors };
}

const combinations = template => {
  const ids = template.features.map(item => item.id);
  return Array.from({ length: 2 ** ids.length }, (_, mask) =>
    Object.fromEntries(
      ids.map((id, index) => [id, Boolean(mask & (1 << index))]),
    ),
  );
};

const options = features => ({
  name: 'Min app',
  theme: 'mork',
  accent: 'gron',
  features,
});

const click = (window, element) =>
  element.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));

const ACT = {
  schema({ window, document }, features) {
    expect(document.querySelectorAll('#rader tr')).toHaveLength(3);
    document.getElementById('nytt-namn').value = 'Dana <b>';
    click(window, document.getElementById('lagg-till'));
    const rows = document.querySelectorAll('#rader tr');
    expect(rows).toHaveLength(4);
    expect(rows[3].querySelector('.namn').textContent).toContain('Dana <b>');
    const select = rows[0].querySelector('select');
    select.value = select.options[1].value;
    select.dispatchEvent(new window.Event('change', { bubbles: true }));
    expect(document.querySelector('#rader tr select').value).toBe(
      select.options[1].value,
    );
    if (features.timmar) {
      expect(document.querySelector('#rader .timmar').textContent).toBe('8 h');
    }
    expect(document.querySelectorAll('#huvud th').length).toBe(
      1 + (features.helger ? 7 : 5) + (features.timmar ? 1 : 0),
    );
    if (features.veckor) {
      click(window, document.getElementById('nasta'));
      expect(document.querySelector('#rader tr select').value).toBe('');
    }
    click(window, document.querySelector('[data-ta-bort]'));
    expect(document.querySelectorAll('#rader tr')).toHaveLength(3);
  },
  todo({ window, document }, features) {
    document.getElementById('ny').value = 'Köp kaffe';
    click(window, document.getElementById('lagg-till'));
    expect(document.querySelectorAll('#lista li')).toHaveLength(2);
    const box = [...document.querySelectorAll('#lista li')]
      .find(li => li.textContent.includes('Köp kaffe'))
      .querySelector('input');
    click(window, box);
    expect(document.querySelectorAll('#lista li.klar')).toHaveLength(1);
    if (features.raknare) {
      expect(document.getElementById('raknare').textContent).toBe(
        '1 kvar av 2',
      );
    }
    if (features.filter) {
      click(window, document.querySelector('[data-visa="klara"]'));
      expect(document.querySelectorAll('#lista li')).toHaveLength(1);
      click(window, document.querySelector('[data-visa="alla"]'));
    }
    if (features.tabort) {
      click(window, document.querySelector('[data-ta-bort]'));
      expect(document.querySelectorAll('#lista li')).toHaveLength(1);
    }
  },
  bokning({ window, document }, features) {
    const first = document.querySelector('[data-boka]');
    click(window, first);
    expect(document.querySelectorAll('.tid .namn')).toHaveLength(0);
    document.getElementById('namn').value = 'Ada';
    click(window, document.querySelector('[data-boka]'));
    expect(document.querySelector('.tid .namn').textContent).toContain('Ada');
    if (!features.platser) {
      expect(document.querySelectorAll('.tid.full')).toHaveLength(1);
    }
    if (features.lista) {
      expect(document.getElementById('alla').textContent).toContain('Ada');
    }
    if (features.avboka) {
      click(window, document.querySelector('[data-avboka]'));
      expect(document.querySelectorAll('.tid .namn')).toHaveLength(0);
    }
    const days = document.querySelectorAll('#dagar button');
    expect(days).toHaveLength(7);
    if (!features.helger) {
      expect([...days].some(day => /lör|sön/.test(day.textContent))).toBe(
        false,
      );
    }
  },
};

// Det som ska se likadant ut när appen öppnas igen.
const SHOWN = { schema: '.namn', todo: '#lista .text', bokning: '.tid strong' };

describe.each(TEMPLATES.map(template => [template.id, template]))(
  '%s',
  (id, template) => {
    it('fungerar med alla kombinationer av val', () => {
      for (const features of combinations(template)) {
        const { html } = template.build(options(features));
        const app = run(html);
        expect(app.errors, JSON.stringify(features)).toEqual([]);
        ACT[id](app, features);
        expect(app.errors, JSON.stringify(features)).toEqual([]);
        if (features.spara) {
          expect(app.window.localStorage.length).toBeGreaterThan(0);
        }
      }
    });

    it('kommer ihåg det sparade när appen öppnas igen', () => {
      const features = { ...defaultFeatures(template), spara: true };
      const { html } = template.build(options(features));
      const first = run(html);
      ACT[id](first, features);
      const saved = { ...first.window.localStorage };
      const again = new JSDOM(html, {
        runScripts: 'dangerously',
        url: 'https://app.test/',
        beforeParse(window) {
          for (const [key, value] of Object.entries(saved))
            window.localStorage.setItem(key, value);
        },
      });
      const texts = document =>
        [...document.querySelectorAll(SHOWN[id])].map(item => item.textContent);
      expect(texts(again.window.document)).toEqual(texts(first.document));
      expect(texts(first.document).length).toBeGreaterThan(0);
    });

    it('har förklaringar med länkar till kurserna', () => {
      const { parts } = template.build(options(defaultFeatures(template)));
      expect(parts.length).toBeGreaterThan(2);
      for (const part of parts) {
        expect(part.text.length).toBeGreaterThan(30);
        expect(part.learn.href).toMatch(/^kurser\//);
      }
    });
  },
);
