import { python, pythonLanguage } from '@codemirror/lang-python';
import { indentUnit, syntaxTree } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import { describeAt, memberOptionsFor } from './codeInfo';

// Förslag efter en punkt: `lista.` visar listmetoderna, när det syns
// att variabeln är en lista.
function memberCompletion(context) {
  const word = context.matchBefore(/\w*/);
  if (context.state.sliceDoc(word.from - 1, word.from) !== '.') return null;
  const tree = syntaxTree(context.state);
  const dot = tree.resolveInner(word.from - 1, 1);
  const receiver =
    dot.parent?.name === 'MemberExpression' ? dot.parent.firstChild : null;
  const options = memberOptionsFor(
    tree,
    context.state.doc.toString(),
    receiver,
  );
  return options && { from: word.from, options, validFor: /^\w*$/ };
}

// Språket i editorn. PEP 8: fyra mellanslag per nivå, och Tab ger
// mellanslag.
export const pythonExtensions = () => [
  indentUnit.of('    '),
  EditorState.tabSize.of(4),
  python(),
  pythonLanguage.data.of({ autocomplete: memberCompletion }),
];

// Hovern: vad är det här och vad tillhör det?
export const pythonHover = (state, pos, side) =>
  describeAt(syntaxTree(state), state.doc.toString(), pos, side);
