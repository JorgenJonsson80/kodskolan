import { javascript, javascriptLanguage } from '@codemirror/lang-javascript';
import { indentUnit } from '@codemirror/language';
import { linter } from '@codemirror/lint';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { explainTsError } from '../runner/friendlyErrors';
import { completionsAt, diagnosticsFor, quickInfoAt } from '../runner/ts';
import { firstSentence, KINDS, TS_WORDS } from './codeInfo';

const COMPLETION_TYPES = {
  method: 'method',
  property: 'property',
  function: 'function',
  'local function': 'function',
  const: 'constant',
  let: 'variable',
  var: 'variable',
  parameter: 'variable',
  keyword: 'keyword',
  class: 'class',
  interface: 'type',
  type: 'type',
  enum: 'enum',
};

// Förslagen kommer från kompilatorn, så efter "kund." visas just de
// egenskaper som typen Kund har.
async function tsCompletion(context) {
  const word = context.matchBefore(/[\w$]*/);
  const afterDot = context.state.sliceDoc(word.from - 1, word.from) === '.';
  if (!afterDot && !context.explicit && word.to - word.from < 2) return null;
  const entries = await completionsAt(
    context.state.doc.toString(),
    context.pos,
  );
  if (context.aborted || entries.length === 0) return null;
  return {
    from: word.from,
    options: entries.map(entry => ({
      label: entry.label,
      type: COMPLETION_TYPES[entry.kind] ?? 'text',
      boost: entry.kind === 'keyword' ? -1 : 0,
    })),
    validFor: /^[\w$]*$/,
  };
}

// Röd linje under typfelen medan man skriver, som i VS Code. Förklaringen
// på svenska först och TypeScripts eget meddelande under.
const typeErrors = linter(
  async view => {
    const code = view.state.doc.toString();
    const errors = await diagnosticsFor(code);
    if (view.state.doc.toString() !== code) return [];
    return errors.map(error => {
      const why = explainTsError(error.message, error.code);
      return {
        from: error.from,
        to: Math.max(error.to, error.from + 1),
        severity: 'error',
        message: why ? `${why}\n\n${error.message}` : error.message,
      };
    });
  },
  { delay: 700 },
);

// context är 'tsx' när koden har JSX (React), annars 'ts'. I en .ts-fil
// betyder <T> generics och inte ett element.
export const tsExtensions = context => [
  EditorView.lineWrapping,
  indentUnit.of('  '),
  EditorState.tabSize.of(2),
  javascript({ typescript: true, jsx: context === 'tsx' }),
  javascriptLanguage.data.of({ autocomplete: tsCompletion }),
  typeErrors,
];

const wordAt = (state, pos) => {
  const line = state.doc.lineAt(pos);
  const text = line.text;
  let start = pos - line.from;
  let end = start;
  while (start > 0 && /[\w$]/.test(text[start - 1])) start--;
  while (end < text.length && /[\w$]/.test(text[end])) end++;
  if (start === end) return null;
  return {
    from: line.from + start,
    to: line.from + end,
    word: text.slice(start, end),
  };
};

// Hovern: typen från kompilatorn som rubrik och vad det är på svenska.
// Nyckelorden (type, interface, keyof …) förklaras även när kompilatorn
// inte har något att säga om dem.
export async function tsHover(state, pos) {
  const found = wordAt(state, pos);
  if (!found) return null;
  const keyword = TS_WORDS[found.word];
  const info = await quickInfoAt(state.doc.toString(), pos);
  if (!info || info.kind === 'keyword' || !info.text) {
    return keyword
      ? { from: found.from, to: found.to, title: found.word, body: keyword }
      : null;
  }
  const docs = info.docs ? firstSentence(info.docs) : '';
  const body = [KINDS[info.kind], docs && `(${docs})`]
    .filter(Boolean)
    .join(' ');
  return {
    from: info.from,
    to: info.to,
    title: info.text,
    body: body || keyword || 'Typen som TypeScript räknade ut.',
  };
}

// Prettier med TypeScript-tolken, samma inställningar som JS-kursen.
export async function formatTs(source, cursorOffset) {
  const [{ formatWithCursor }, typescript, estree] = await Promise.all([
    import('prettier/standalone'),
    import('prettier/plugins/typescript'),
    import('prettier/plugins/estree'),
  ]);
  return formatWithCursor(source, {
    cursorOffset,
    parser: 'typescript',
    plugins: [typescript, estree],
    singleQuote: true,
    arrowParens: 'avoid',
  });
}
