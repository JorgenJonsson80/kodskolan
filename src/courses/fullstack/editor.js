import { pythonExtensions, pythonHover } from '../python/editor/extensions';
import { normalize as normalizeJs } from '../js/runner/normalize';
import { formatTs, tsExtensions, tsHover } from '../ts/editor/extensions';
import { isTsxCode } from './runner/language';

// Editorn byter språk med övningen: context är 'py' (app.py) eller 'tsx'
// (App.tsx), se useWorkbench.jsx.
export const extensions = context =>
  context === 'py' ? pythonExtensions() : tsExtensions('tsx');

// Hovern får bara editorns läge. Python kommenterar med #.
const isPython = state =>
  state.languageDataAt('commentTokens', 0)[0]?.line === '#';

export const describeAt = (state, pos, side) =>
  isPython(state) ? pythonHover(state, pos, side) : tsHover(state, pos);

// Prettier kan bara TypeScript. Python lämnas som det är.
export const format = (source, cursorOffset) =>
  isTsxCode(source)
    ? formatTs(source, cursorOffset)
    : Promise.resolve({ formatted: source, cursorOffset });

const normalizePython = code =>
  code.replace(/#.*$/gm, '').replace(/"/g, "'").replace(/\s/g, '');

export const normalize = code =>
  isTsxCode(code) ? normalizeJs(code) : normalizePython(code);
