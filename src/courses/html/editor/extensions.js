import { html } from '@codemirror/lang-html';
import { indentUnit, syntaxTree } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import { describeAt } from './codeInfo';

// Två mellanslag per nivå, som de flesta skriver HTML och CSS. html()
// stänger taggar av sig själv och föreslår taggar och attribut, och CSS
// inne i <style>.
export const htmlExtensions = () => [
  indentUnit.of('  '),
  EditorState.tabSize.of(2),
  html(),
];

// Hovern: taggar, attribut, CSS och Tailwind-klasser.
export const htmlHover = (state, pos, side) =>
  describeAt(syntaxTree(state), state.doc.toString(), pos, side);
