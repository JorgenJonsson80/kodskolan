import { useEffect, useState } from 'react';

// Kodfönstret på startsidan: koden skrivs tecken för tecken, körs, och
// testerna går igenom – samma känsla som i en riktig övning, på några
// sekunder. Det är bara en animation; inget laddas och inget körs.
const SNIPPETS = [
  {
    lang: 'Python',
    file: 'hej.py',
    code: 'namn = "Ada"\nprint("Hej, " + namn + "!")',
    output: ['Hej, Ada!'],
  },
  {
    lang: 'SQL',
    file: 'meny.sql',
    code: 'SELECT namn, pris\nFROM meny\nWHERE pris < 40;',
    table: [
      ['namn', 'pris'],
      ['Kaffe', '35'],
      ['Bulle', '32'],
    ],
  },
  {
    lang: 'JavaScript',
    file: 'poang.js',
    code: 'const poang = [3, 7, 5];\nconsole.log(Math.max(...poang));',
    output: ['7'],
  },
];

const TYPE_MS = 45;
const RUN_MS = 600;
const SUCCESS_MS = 450;
const HOLD_MS = 2800;

const TOKENS =
  /("[^"]*"|'[^']*'|\b\d+\b|\b(?:SELECT|FROM|WHERE|const|print|console|log|Math|max)\b)/;
const KEYWORDS = new Set(['SELECT', 'FROM', 'WHERE', 'const']);

function Highlighted({ code }) {
  return code.split(TOKENS).map((part, index) => {
    if (!part) return null;
    let className = null;
    if (/^["']/.test(part) && part.length > 1 && part.at(-1) === part[0]) {
      className = 'tok-str';
    } else if (/^\d+$/.test(part)) className = 'tok-num';
    else if (KEYWORDS.has(part)) className = 'tok-kw';
    else if (TOKENS.test(part)) className = 'tok-fn';
    return className ? (
      <span key={`t-${index}`} className={className}>
        {part}
      </span>
    ) : (
      part
    );
  });
}

// phase: 'typing' → 'running' → 'output' → 'success'. Första bilden (och
// den som syns innan sidan startat) är det första exemplet, klart.
export default function HeroDemo() {
  const [state, setState] = useState({
    index: 0,
    chars: SNIPPETS[0].code.length,
    phase: 'success',
  });
  const snippet = SNIPPETS[state.index];

  useEffect(() => {
    const still = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const next = () => (state.index + 1) % SNIPPETS.length;
    let delay;
    let update;
    if (state.phase === 'success') {
      delay = HOLD_MS;
      update = still
        ? {
            index: next(),
            chars: SNIPPETS[next()].code.length,
            phase: 'success',
          }
        : { index: next(), chars: 0, phase: 'typing' };
    } else if (state.phase === 'typing') {
      const done = state.chars >= snippet.code.length;
      delay = done ? 350 : TYPE_MS;
      update = done
        ? { ...state, phase: 'running' }
        : { ...state, chars: state.chars + 1 };
    } else if (state.phase === 'running') {
      delay = RUN_MS;
      update = { ...state, phase: 'output' };
    } else {
      delay = SUCCESS_MS;
      update = { ...state, phase: 'success' };
    }
    const timer = setTimeout(() => setState(update), delay);
    return () => clearTimeout(timer);
  }, [state, snippet]);

  const shown = snippet.code.slice(0, state.chars);
  const hasOutput = state.phase === 'output' || state.phase === 'success';

  return (
    <figure className="hero-demo" aria-label="Exempel: kod som körs och rättas">
      <div className="hero-demo-bar">
        <span className="hero-demo-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="hero-demo-file">{snippet.file}</span>
        <span className="hero-demo-lang">{snippet.lang}</span>
      </div>
      <pre className="hero-demo-code">
        <code>
          <Highlighted code={shown} />
          {state.phase === 'typing' && (
            <span className="hero-demo-cursor" aria-hidden="true" />
          )}
        </code>
      </pre>
      <div className="hero-demo-actions">
        <span
          className={`hero-demo-run${state.phase === 'running' ? ' is-running' : ''}`}
        >
          {state.phase === 'running' ? 'Kör…' : '▶ Kör koden'}
        </span>
      </div>
      <div className={`hero-demo-output${hasOutput ? ' is-shown' : ''}`}>
        <span className="hero-demo-label">Utskrift</span>
        {snippet.table ? (
          <table>
            <tbody>
              {snippet.table.map((row, rowIndex) => (
                <tr key={`rad-${rowIndex}`}>
                  {row.map((cell, cellIndex) =>
                    rowIndex === 0 ? (
                      <th key={`c-${cellIndex}`}>{cell}</th>
                    ) : (
                      <td key={`c-${cellIndex}`}>{cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          snippet.output.map(line => <samp key={`ut-${line}`}>{line}</samp>)
        )}
      </div>
      <div
        className={`hero-demo-success${state.phase === 'success' ? ' is-shown' : ''}`}
      >
        <span>✓ Alla tester gick igenom! 🎉</span>
        <span className="hero-demo-xp">+10 XP</span>
      </div>
    </figure>
  );
}
