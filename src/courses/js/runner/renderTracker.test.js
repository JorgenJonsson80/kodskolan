import { describe, expect, it } from 'vitest';
import { createClock } from './fakes';
import { createMount } from './mount';
import { createRenderTracker } from './renderTracker';

// Komponenterna skrivs som elevens kod blir efter JSX-översättningen,
// med createElement och hooks från den spårade React.
function setup() {
  const events = [];
  const { React } = createRenderTracker(event => events.push(event));
  const h = React.createElement;
  const mount = createMount(createClock());
  return { events, React, h, mount };
}

const summary = events =>
  events.map(
    event => `${event.kind} ${event.component}: ${event.reasons.join(' + ')}`,
  );

describe('createRenderTracker', () => {
  it('berättar om första renderingen och om state som ändras', () => {
    const { events, React, h, mount } = setup();
    function Counter() {
      const [count, setCount] = React.useState(0);
      return h(
        'button',
        { onClick: () => setCount(count + 1) },
        `Klick ${count}`,
      );
    }
    const app = mount(h(Counter));
    app.click('Klick 0');
    expect(summary(events)).toEqual([
      'mount Counter: visas för första gången',
      'render Counter: state `count` ändrades: 0 → 1',
    ]);
  });

  it('säger till när state sätts till samma värde', () => {
    const { events, React, h, mount } = setup();
    function Toggle() {
      const [on, setOn] = React.useState(false);
      return h('button', { onClick: () => setOn(false) }, on ? 'På' : 'Av');
    }
    mount(h(Toggle)).click('Av');
    expect(events.at(-1).kind).toBe('same');
    expect(events.at(-1).reasons[0]).toContain('`on` sattes till samma värde');
  });

  it('förklarar varför ett barn renderar om', () => {
    const { events, React, h, mount } = setup();
    function Label({ text }) {
      return h('span', null, text);
    }
    function Button({ onPress }) {
      return h('button', { onClick: onPress }, 'Tryck');
    }
    function App() {
      const [count, setCount] = React.useState(0);
      return h(
        'div',
        null,
        h(Label, { text: 'Hej' }),
        h(Label, { text: String(count) }),
        h(Button, { onPress: () => setCount(count + 1) }),
      );
    }
    const app = mount(h(App));
    events.length = 0;
    app.click('Tryck');
    expect(summary(events)).toEqual([
      'render App: state `count` ändrades: 0 → 1',
      'render Label: föräldern `App` renderade om, och då renderar alla dess barn',
      'render Label: propen `text` ändrades: "0" → "1"',
      'render Button: propen `onPress` är en ny funktion',
    ]);
  });

  it('berättar när effekter körs och varför', () => {
    const { events, React, h, mount } = setup();
    function Title() {
      const [count, setCount] = React.useState(0);
      React.useEffect(() => {}, [count]);
      React.useEffect(() => {});
      return h('button', { onClick: () => setCount(c => c + 1) }, 'Öka');
    }
    const app = mount(h(Title));
    app.click('Öka');
    const effects = events.filter(event => event.kind === 'effect');
    expect(effects.map(event => event.reasons[0])).toEqual([
      'en effekt körs första gången komponenten visas',
      'en effekt körs efter varje rendering, eftersom den saknar [ ]',
      'en effekt körs igen eftersom ett beroende i [ ] ändrades: 0 → 1',
      'en effekt körs efter varje rendering, eftersom den saknar [ ]',
    ]);
  });
});
