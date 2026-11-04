// Monterar en komponent så att testerna kan klicka, skriva och läsa av
// resultatet, ungefär som en användare. Bygger på react-test-renderer,
// som kör React utan webbläsare och därför fungerar i workern.
//
//   const app = __mount(<Counter />);
//   app.click('+1');
//   app.text('p')  // '1'
//
// act() finns bara i Reacts utvecklingsversion, men appen kör
// produktionsversionen. Därför körs allt i flushSync i stället: då
// ritas komponenten om och effekterna körs innan anropet returnerar.
import { Component, createElement } from 'react';
import { create } from 'react-test-renderer';

// react-test-renderer är skriven för Node och använder global, som i
// webbläsaren och workern heter globalThis.
globalThis.global ??= globalThis;

// Elevens kod får en låtsasklocka, men settle() behöver den riktiga.
const realSetTimeout = globalThis.setTimeout;

const VOID_TAGS = new Set(['br', 'hr', 'img', 'input', 'meta', 'link']);

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function attributes(props) {
  return Object.entries(props)
    .filter(
      ([name, value]) =>
        name !== 'children' &&
        typeof value !== 'function' &&
        typeof value !== 'object' &&
        value !== undefined &&
        value !== false,
    )
    .map(([name, value]) => {
      const attribute =
        name === 'className' ? 'class' : name === 'htmlFor' ? 'for' : name;
      return value === true
        ? ` ${attribute}=""`
        : ` ${attribute}="${escapeHtml(value)}"`;
    })
    .join('');
}

function toHtml(node) {
  if (node === null || node === undefined) return '';
  if (typeof node === 'string') return escapeHtml(node);
  if (Array.isArray(node)) return node.map(toHtml).join('');

  const attrs = attributes(node.props);
  if (VOID_TAGS.has(node.type)) return `<${node.type}${attrs}/>`;
  return `<${node.type}${attrs}>${toHtml(node.children)}</${node.type}>`;
}

function textOf(instance) {
  if (typeof instance === 'string') return instance;
  return instance.children.map(textOf).join('');
}

function isHost(instance, tags) {
  return typeof instance.type === 'string' && tags.includes(instance.type);
}

// React loggar fel som en error boundary fångat, och test-renderern
// varnar för att den är utfasad. Inget av det hjälper eleven, och
// felen visas ändå i testresultatet.
function quietly(callback) {
  const original = console.error;
  console.error = () => {};
  try {
    return callback();
  } finally {
    console.error = original;
  }
}

// Fångar fel när elevens komponent ritas. Annars rapporterar React dem
// globalt, och i workern skulle det avbryta hela rättningen.
class ErrorCatcher extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    this.props.onError(error);
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

// clock är låtsasklockan från fakes.js, så att app.tick(ms) kan
// spola fram tiden för timers som komponenten startat.
export function createMount(clock) {
  return element => mount(element, clock);
}

function mount(element, clock) {
  const errors = [];
  const wrap = child =>
    createElement(
      ErrorCatcher,
      { onError: error => errors.push(error) },
      child,
    );

  // Kör callback, rita om direkt och kasta ett fel om komponenten kraschade.
  function act(callback) {
    quietly(() => renderer.unstable_flushSync(callback));
    if (errors.length > 0) throw errors.shift();
  }

  const renderer = quietly(() => create(null));
  act(() => renderer.update(wrap(element)));

  const all = tags => renderer.root.findAll(node => isHost(node, tags));

  function field(index, tags) {
    const fields = all(tags);
    if (!fields[index]) {
      throw new Error(
        index === 0
          ? 'Hittar inget fält att skriva i.'
          : `Hittar inte fält nummer ${index + 1}.`,
      );
    }
    return fields[index];
  }

  function fire(node, handlerName, event) {
    const handler = node.props[handlerName];
    if (typeof handler !== 'function') {
      throw new Error(
        `<${node.type}> har ingen ${handlerName}. Glömde du ${handlerName}={…}?`,
      );
    }
    act(() => {
      handler(event);
    });
  }

  const app = {
    html: () => toHtml(renderer.toJSON()),

    // Texten i hela komponenten, eller i första elementet av en viss typ.
    text(tag) {
      if (!tag) return textOf({ children: [renderer.toJSON()].flat() });
      const [node] = all([tag]);
      if (!node) throw new Error(`Hittar inget <${tag}>.`);
      return textOf(node);
    },

    count: tag => all([tag]).length,

    // Klickar på en knapp, eller annat klickbart element, med texten.
    click(text) {
      const matches = renderer.root.findAll(
        node => typeof node.type === 'string' && textOf(node).trim() === text,
      );
      const node =
        matches.find(match => match.type === 'button') ??
        matches.find(match => match.props.onClick);
      if (!node) throw new Error(`Hittar ingen knapp med texten "${text}".`);
      fire(node, 'onClick', { preventDefault() {}, target: node.props });
      return app;
    },

    type(value, index = 0) {
      const node = field(index, ['input', 'textarea', 'select']);
      fire(node, 'onChange', {
        target: { ...node.props, value },
        currentTarget: { ...node.props, value },
      });
      return app;
    },

    check(index = 0) {
      const node = field(index, ['input']);
      const checked = !node.props.checked;
      fire(node, 'onChange', {
        target: { ...node.props, checked },
        currentTarget: { ...node.props, checked },
      });
      return app;
    },

    // Skickar formuläret. Returnerar true om preventDefault anropades.
    submit() {
      const [form] = all(['form']);
      if (!form) throw new Error('Hittar inget <form>.');
      let prevented = false;
      fire(form, 'onSubmit', {
        preventDefault() {
          prevented = true;
        },
      });
      return prevented;
    },

    // Ritar om med nya props, som när en förälder skickar nya värden.
    rerender(newElement) {
      act(() => renderer.update(wrap(newElement)));
      return app;
    },

    // Väntar tills Promises, t.ex. från fetch, är klara och React
    // har ritat om. Används med await: await app.settle().
    async settle() {
      for (let round = 0; round < 10; round += 1) {
        await new Promise(resolve => realSetTimeout(resolve, 0));
      }
      act(() => {});
      return app;
    },

    tick(ms) {
      clock.tick(ms, callback => act(callback));
      return app;
    },

    unmount() {
      act(() => renderer.unmount());
      return app;
    },
  };

  return app;
}
