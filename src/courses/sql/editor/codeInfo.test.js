import { EditorState } from '@codemirror/state';
import { describe, expect, it } from 'vitest';
import { setupFor } from '../data/databases';
import { nodeDescribe } from '../test/nodeSql';
import { sqlExtensions, sqlHover } from './extensions';

const tables = nodeDescribe(setupFor({ db: 'butik' }));

const hoverAt = (code, word) => {
  const state = EditorState.create({
    doc: code,
    extensions: sqlExtensions(tables),
  });
  return sqlHover(state, code.indexOf(word) + 1, 1);
};

describe('hovern', () => {
  const code =
    "SELECT namn, COUNT(*) AS hur_manga FROM kunder WHERE stad = 'Malmö' GROUP BY namn";

  it('förklarar nyckelord och funktioner', () => {
    expect(hoverAt(code, 'WHERE').title).toBe('WHERE – bara raderna där …');
    expect(hoverAt(code, 'COUNT').title).toBe('COUNT – räkna');
    expect(hoverAt(code, 'GROUP').title).toBe('GROUP BY – gruppera');
  });

  it('säger vad tabeller och kolumner är', () => {
    expect(hoverAt(code, 'kunder')).toMatchObject({
      title: 'Tabellen kunder',
      body: expect.stringContaining('`stad`'),
    });
    expect(hoverAt(code, 'stad').body).toBe('Finns i `kunder` (TEXT).');
    expect(hoverAt('SELECT id FROM kunder', 'id').body).toMatch(
      /Finns i `kunder` och `produkter` och `ordrar`/,
    );
  });

  it('känner igen ett alias och tiger om text', () => {
    expect(hoverAt(code, 'hur_manga').title).toBe(
      'hur_manga – ett namn du valt',
    );
    expect(hoverAt(code, 'Malmö')).toBeNull();
  });
});
