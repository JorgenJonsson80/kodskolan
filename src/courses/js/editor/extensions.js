import {
  javascript,
  javascriptLanguage,
  scopeCompletionSource,
} from '@codemirror/lang-javascript';
import { indentUnit, syntaxTree } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { describeAt, memberOptionsFor } from './codeInfo';

// Inbyggda objekt som får förslag, t.ex. console. → log, error, table …
const BUILTINS = {
  console,
  Math,
  JSON,
  Object,
  Array,
  Number,
  String,
  Promise,
  Date,
};

// Förslag efter en punkt: `user.` visar egenskaperna i objektet user.
function memberCompletion(context) {
  const word = context.matchBefore(/[\w$]*/);
  if (context.state.sliceDoc(word.from - 1, word.from) !== '.') return null;
  const tree = syntaxTree(context.state);
  const dot = tree.resolveInner(word.from - 1, 1);
  const receiver =
    dot.parent?.name === 'MemberExpression' ? dot.parent.firstChild : null;
  if (!receiver) return null;
  const options = memberOptionsFor(
    tree,
    context.state.doc.toString(),
    receiver,
  );
  return options && { from: word.from, options, validFor: /^[\w$]*$/ };
}

// JavaScript med JSX, två mellanslag per nivå som Prettier, och långa
// rader bryts så att JSX inte försvinner åt höger.
export const jsExtensions = () => [
  EditorView.lineWrapping,
  indentUnit.of('  '),
  EditorState.tabSize.of(2),
  javascript({ jsx: true }),
  javascriptLanguage.data.of({ autocomplete: memberCompletion }),
  javascriptLanguage.data.of({
    autocomplete: scopeCompletionSource(BUILTINS),
  }),
];

export const jsHover = (state, pos, side) =>
  describeAt(syntaxTree(state), state.doc.toString(), pos, side);

// Formatterar med Prettier, med samma inställningar som projektet.
// Prettier laddas först när det behövs, så sidan startar snabbt.
export async function formatJs(source, cursorOffset) {
  const [{ formatWithCursor }, babel, estree] = await Promise.all([
    import('prettier/standalone'),
    import('prettier/plugins/babel'),
    import('prettier/plugins/estree'),
  ]);
  return formatWithCursor(source, {
    cursorOffset,
    parser: 'babel',
    plugins: [babel, estree],
    singleQuote: true,
    arrowParens: 'avoid',
  });
}
