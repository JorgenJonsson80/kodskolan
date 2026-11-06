import { SQLite, sql } from '@codemirror/lang-sql';
import { indentUnit, syntaxTree } from '@codemirror/language';
import { EditorState, Facet } from '@codemirror/state';
import { describeToken } from './codeInfo';

// Övningens tabeller, så att hovern vet vad namnen är.
const tablesFacet = Facet.define({ combine: values => values[0] ?? [] });

// tables kommer från useWorkbench (editor.context). Förslagen fyller i
// övningens tabeller och kolumner, och nyckelord med versaler.
export const sqlExtensions = (tables = []) => [
  indentUnit.of('  '),
  EditorState.tabSize.of(2),
  sql({
    dialect: SQLite,
    upperCaseKeywords: true,
    schema: Object.fromEntries(
      (tables ?? []).map(table => [
        table.name,
        table.columns.map(column => column.name),
      ]),
    ),
  }),
  tablesFacet.of(tables ?? []),
];

export function sqlHover(state, pos, side) {
  const node = syntaxTree(state).resolveInner(pos, side);
  if (!node || node.firstChild) return null;
  return describeToken(
    {
      name: node.name,
      text: state.doc.sliceString(node.from, node.to),
      from: node.from,
      to: node.to,
    },
    state.facet(tablesFacet),
    state.doc.sliceString(Math.max(0, node.from - 20), node.from),
  );
}
