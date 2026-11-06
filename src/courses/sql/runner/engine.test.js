import { describe, expect, it } from 'vitest';
import { setupFor } from '../data/databases';
import { nodeDescribe, nodeRunSql } from '../test/nodeSql';
import { evaluate } from './evaluate';
import { explainError } from './friendlyErrors';

const butik = setupFor({ db: 'butik' });
const run = (code, extra = {}) => nodeRunSql({ code, setup: butik, ...extra });

describe('runSql', () => {
  it('visar sista frågans svar som en tabell', () => {
    const result = run('SELECT * FROM kunder; SELECT namn FROM kunder LIMIT 2');
    expect(result.table).toEqual({
      columns: ['namn'],
      rows: [['Anna Berg'], ['Bilal Haddad']],
      total: 2,
    });
  });

  it('säger hur många rader som ändrades när det inte finns någon tabell', () => {
    const result = run("UPDATE produkter SET pris = 1 WHERE kategori = 'Te'");
    expect(result.table).toBeNull();
    expect(result.console).toEqual(['3 rader ändrades.']);
  });

  it('rättar rader utan hänsyn till ordningen, om inte ordered', () => {
    const tests = [{ check: 'rows' }, { check: 'rows', ordered: true }];
    const solution = 'SELECT namn FROM kunder WHERE fodd < 1980';
    const result = run(
      'SELECT namn FROM kunder WHERE fodd < 1980 ORDER BY namn DESC',
      { tests, solution },
    );
    expect(result.tests.map(test => test.passed)).toEqual([true, false]);
  });

  it('rättar ändringar med en fråga efteråt', () => {
    const tests = [{ query: 'SELECT COUNT(*) FROM produkter' }];
    const solution = 'DELETE FROM produkter WHERE lager = 0';
    const right = run('DELETE FROM produkter WHERE id IN (3, 6)', {
      tests,
      solution,
    });
    expect(right.tests[0]).toMatchObject({ passed: true, actual: [[10]] });
    const wrong = run('DELETE FROM produkter WHERE id = 3', {
      tests,
      solution,
    });
    expect(wrong.tests[0]).toMatchObject({ passed: false, actual: [[11]] });
  });

  it('flyttal som är nästan lika räknas som lika', () => {
    const result = run('SELECT 1.0 / 3 * 3', {
      tests: [{ check: 'rows', expected: [[1]] }],
    });
    expect(result.tests[0].passed).toBe(true);
  });

  it('skiljer på syntaxfel och andra fel, med rad och förslag', () => {
    const syntax = run("SELECT namn\nFROM kunder\nWHERE stad = 'x' ADN id = 1");
    expect(syntax.syntaxError).toMatchObject({ line: 3, suggestion: 'AND' });
    const column = run('SELECT nman FROM kunder');
    expect(column.error).toMatchObject({ suggestion: 'namn', line: 1 });
    const table = run('SELECT * FROM kund');
    expect(table.error.suggestion).toBe('kunder');
  });

  it('varnar för dubbla citattecken, = NULL och UPDATE utan WHERE', () => {
    expect(
      run('SELECT * FROM kunder WHERE stad = "Malmö"').warnings[0],
    ).toMatch(/enkla citattecken/);
    expect(run('SELECT * FROM kunder WHERE epost = NULL').warnings[0]).toMatch(
      /IS NULL/,
    );
    expect(run('UPDATE produkter SET lager = 0').warnings[0]).toMatch(
      /alla\* rader/,
    );
    expect(run('SELECT "namn" FROM kunder').warnings).toEqual([]);
  });

  it('beskriver databasens tabeller', () => {
    const tables = nodeDescribe(butik);
    expect(tables.map(table => table.name)).toEqual([
      'kunder',
      'produkter',
      'ordrar',
      'orderrader',
    ]);
    expect(tables[0].columns[0]).toMatchObject({
      name: 'id',
      primaryKey: true,
    });
    expect(tables[0].rows).toHaveLength(5);
  });
});

describe('evaluate', () => {
  const lesson = {
    tests: [{ description: 'Rätt rader', check: 'rows' }],
    solution: "SELECT namn FROM kunder WHERE stad = 'Malmö'",
  };
  const feedback = code => evaluate(lesson, code, run(code, { ...lesson }));

  it('säger hur många rader det blev', () => {
    expect(feedback('SELECT namn FROM kunder').results[0].text).toBe(
      'frågan gav 10 rader men ska ge 2.',
    );
  });

  it('säger vilken rad som är fel', () => {
    expect(
      feedback("SELECT namn FROM kunder WHERE stad = 'Umeå' OR id = 2")
        .results[0].text,
    ).toBe(
      'raden `Ida Karlsson` ska inte vara med, men `Greta Nyström` saknas.',
    );
  });

  it('säger när kolumnerna är för många', () => {
    expect(
      feedback("SELECT namn, stad FROM kunder WHERE stad = 'Malmö'").results[0]
        .text,
    ).toMatch(/^frågan ger 2 kolumner \(namn, stad\) men ska ge 1/);
  });

  it('ger Visa skillnaden som rader', () => {
    expect(feedback('SELECT namn FROM kunder LIMIT 1').results[0].diff).toEqual(
      { actual: ['Anna Berg'], expected: ['Bilal Haddad', 'Greta Nyström'] },
    );
  });

  it('godkänner och visar tabellen', () => {
    const result = feedback(lesson.solution);
    expect(result.isCorrect).toBe(true);
    expect(result.table.total).toBe(2);
  });
});

describe('explainError', () => {
  const explain = code => {
    const result = run(code);
    return explainError(result.syntaxError ?? result.error);
  };

  it('förklarar de vanligaste felen på svenska', () => {
    expect(explain('DELETE FROM kunder WHERE id = 1')).toMatch(/pekar på/);
    expect(explain('SELECT nman FROM kunder')).toMatch(/Menade du `namn`/);
    expect(explain('SELECT * FROM kunder WHERE stad = Malmö')).toMatch(
      /enkla citattecken: `'Malmö'`/,
    );
    expect(explain('SELECT namn, FROM kunder')).toMatch(/kommatecken/);
    expect(explain('SELECT * FROM kunder WHERE')).toMatch(/tar slut/);
    expect(explain("SELECT * FROM kunder WHERE stad = 'Malmö")).toMatch(
      /aldrig slut/,
    );
    expect(explain('SELECT namn FROM kunder WHERE COUNT(*) > 1')).toMatch(
      /HAVING/,
    );
    expect(
      explain('SELECT id FROM kunder JOIN ordrar ON kunder.id = kund_id'),
    ).toMatch(/flera av tabellerna/);
    expect(explain("INSERT INTO kunder VALUES (1, 'x')")).toMatch(
      /5 kolumner men du gav 2/,
    );
  });
});
