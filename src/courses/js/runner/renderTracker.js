// Följer varför elevens komponenter renderar, för "Varför renderade den?".
//
// Varje funktionskomponent som skapas med createElement byts mot en
// omslagskomponent som anropar originalet som en vanlig funktion. Då hör
// elevens hooks till omslaget, och omslaget kan jämföra props med förra
// gången. useState och useEffect byts mot versioner som berättar när
// state sätts och när effekter körs.
//
// onEvent får { kind, component, reasons } där kind är 'mount',
// 'render', 'same' (state sattes till samma värde) eller 'effect'.
import * as React from 'react';

const MAX_VALUE_LENGTH = 40;

export function describeValue(value) {
  if (typeof value === 'function') return 'en funktion';
  if (value === undefined) return 'undefined';
  let text;
  try {
    text = JSON.stringify(value);
  } catch {
    text = String(value);
  }
  return text.length > MAX_VALUE_LENGTH
    ? `${text.slice(0, MAX_VALUE_LENGTH)}…`
    : text;
}

// Namnen i const [count, setCount] = useState(…), i ordning, så att
// loggen kan säga count i stället för "state nr 1".
function stateNames(component) {
  const source = Function.prototype.toString.call(component);
  return [
    ...source.matchAll(
      /\[\s*([\w$]+)\s*,\s*[\w$]+\s*\]\s*=\s*(?:[\w$]+\.)?useState\b/g,
    ),
  ].map(match => match[1]);
}

// Vad som skiljer två props-objekt åt. Nya funktioner och objekt med
// samma innehåll nämns särskilt, eftersom de är vanliga överraskningar.
function propChanges(previous, next) {
  const keys = new Set([...Object.keys(previous), ...Object.keys(next)]);
  keys.delete('children');
  const changes = [];
  for (const key of keys) {
    const before = previous[key];
    const after = next[key];
    if (Object.is(before, after)) continue;
    if (typeof before === 'function' && typeof after === 'function') {
      changes.push(`propen \`${key}\` är en ny funktion`);
    } else if (
      typeof before === 'object' &&
      typeof after === 'object' &&
      before !== null &&
      after !== null &&
      describeValue(before) === describeValue(after)
    ) {
      changes.push(
        `propen \`${key}\` är ett nytt objekt, fast innehållet är detsamma`,
      );
    } else {
      changes.push(
        `propen \`${key}\` ändrades: ${describeValue(before)} → ${describeValue(after)}`,
      );
    }
  }
  return changes;
}

export function createRenderTracker(onEvent) {
  const wrappers = new WeakMap();
  // Vilken komponent som skapade ett element, för "föräldern renderade".
  const owners = new WeakMap();
  // Komponenten som renderar just nu, och dess hooks.
  let current = null;

  function wrap(type) {
    if (typeof type !== 'function' || type.prototype?.isReactComponent) {
      return type;
    }
    if (wrappers.has(type)) return wrappers.get(type);

    const name = type.name || 'Komponent';
    const names = stateNames(type);

    function Tracked(props) {
      const ref = React.useRef(null);
      ref.current ??= {
        name,
        names,
        props: null,
        pending: [],
        values: [],
        setters: [],
        effectDeps: [],
      };
      const instance = ref.current;

      if (instance.props === null) {
        onEvent({
          kind: 'mount',
          component: name,
          reasons: ['visas för första gången'],
        });
      } else {
        const reasons = [
          ...instance.pending,
          ...propChanges(instance.props, props),
        ];
        if (reasons.length === 0) {
          const owner = owners.get(props);
          reasons.push(
            owner
              ? `föräldern \`${owner}\` renderade om, och då renderar alla dess barn`
              : 'React ritade om den',
          );
        }
        onEvent({ kind: 'render', component: name, reasons });
      }
      instance.props = props;
      instance.pending = [];
      instance.stateIndex = 0;
      instance.effectIndex = 0;

      const parent = current;
      current = instance;
      try {
        return type(props);
      } finally {
        current = parent;
      }
    }
    Tracked.displayName = name;
    wrappers.set(type, Tracked);
    return Tracked;
  }

  function createElement(type, props, ...children) {
    const element = React.createElement(wrap(type), props, ...children);
    if (current) owners.set(element.props, current.name);
    return element;
  }

  function useState(initial) {
    const [value, setValue] = React.useState(initial);
    const instance = current;
    if (!instance) return [value, setValue];

    const index = instance.stateIndex++;
    instance.values[index] = value;
    instance.setters[index] ??= next => {
      const before = instance.values[index];
      const after = typeof next === 'function' ? next(before) : next;
      const label = instance.names[index] ?? `state nr ${index + 1}`;
      if (Object.is(before, after)) {
        onEvent({
          kind: 'same',
          component: instance.name,
          reasons: [
            `\`${label}\` sattes till samma värde (${describeValue(after)}), så React hoppar över omrenderingen`,
          ],
        });
      } else {
        instance.pending.push(
          `state \`${label}\` ändrades: ${describeValue(before)} → ${describeValue(after)}`,
        );
        instance.values[index] = after;
      }
      setValue(typeof next === 'function' ? () => after : after);
    };
    return [value, instance.setters[index]];
  }

  function useEffect(effect, deps) {
    const instance = current;
    const index = instance ? instance.effectIndex++ : 0;
    const previousDeps = instance?.effectDeps[index];
    if (instance) instance.effectDeps[index] = deps;

    return React.useEffect(() => {
      if (instance) {
        let reason;
        if (!deps)
          reason = 'körs efter varje rendering, eftersom den saknar [ ]';
        else if (!previousDeps) reason = 'körs första gången komponenten visas';
        else {
          const changes = deps
            .map((dep, i) =>
              Object.is(dep, previousDeps[i])
                ? null
                : `${describeValue(previousDeps[i])} → ${describeValue(dep)}`,
            )
            .filter(Boolean);
          reason = `körs igen eftersom ett beroende i [ ] ändrades: ${changes.join(', ')}`;
        }
        onEvent({
          kind: 'effect',
          component: instance.name,
          reasons: [`en effekt ${reason}`],
        });
      }
      return effect();
      // Beroendena är elevens egna och skickas vidare som de är.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
  }

  const TrackedReact = { ...React, createElement, useState, useEffect };
  return { React: { ...TrackedReact, default: TrackedReact }, createElement };
}
