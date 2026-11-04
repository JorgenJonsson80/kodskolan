import { beforeAll, describe, expect, it } from 'vitest';
import { nodeRunStudent } from '../test/nodePython';

let run;
beforeAll(async () => {
  run = await nodeRunStudent();
});

const ST = 'import streamlit as st\n';

describe('låtsas-streamlit i harness.py', () => {
  it('antecknar vad appen visar, med widgetarnas startvärden', () => {
    const result = run({
      code: `${ST}st.title("A")\nx = st.slider("X", 1, 9, 4)\nst.write("x är", x)`,
    });
    expect(result.app.map(element => element.text)).toEqual([
      'A',
      'X: 4',
      'x är 4',
    ]);
  });

  it('ger widgetarna testets värden och kör om för varje klick', () => {
    const code = `${ST}if "n" not in st.session_state:\n    st.session_state.n = 0\nif st.button("+"):\n    st.session_state.n += 1\nst.write(st.session_state.n)`;
    const result = run({
      code,
      tests: [
        { code: "__shown('write')", expected: ['0'] },
        {
          code: "__shown('write')",
          expected: ['2'],
          widgets: [{ '+': true }, { '+': true }, {}],
        },
      ],
    });
    expect(result.tests.map(test => test.passed)).toEqual([true, true]);
  });

  it('lägger kolumner och sidopanelen på rätt ställe', () => {
    const { app } = run({
      code: `${ST}a, b = st.columns(2)\nb.write("höger")\nwith a:\n    st.write("vänster")\nst.sidebar.write("sidan")`,
    });
    expect(app).toEqual([
      { type: 'columns', text: '', group_id: 1, count: 2 },
      { type: 'write', text: 'höger', group: 1, col: 1 },
      { type: 'write', text: 'vänster', group: 1, col: 0 },
      { type: 'write', text: 'sidan', sidebar: true },
    ]);
  });

  it('st.stop slutar utan fel och st.rerun kör om utan knapptryck', () => {
    const stopped = run({
      code: `${ST}st.write("a")\nst.stop()\nst.write("b")`,
    });
    expect(stopped.error).toBeNull();
    expect(stopped.app.map(element => element.text)).toEqual(['a']);

    const code = `${ST}if "lista" not in st.session_state:\n    st.session_state.lista = [1]\nif st.button("Töm"):\n    st.session_state.lista = []\n    st.rerun()\nst.write(len(st.session_state.lista))`;
    const result = run({
      code,
      tests: [
        { code: "__shown('write')", expected: ['0'], widgets: { Töm: true } },
      ],
    });
    expect(result.tests[0].passed).toBe(true);
  });

  it('ger AttributeError med förslag för ett felstavat st-namn', () => {
    const result = run({ code: `${ST}st.titel("Hej")` });
    expect(result.error.message).toContain("Did you mean: 'title'?");
  });

  it('visar tabeller och diagram från pandas', () => {
    const { app } = run({
      code: `${ST}import pandas as pd\ns = pd.Series([3, 5], index=["a", "b"], name="antal")\nst.bar_chart(s)\nst.dataframe(s)`,
    });
    expect(app[0]).toMatchObject({
      labels: ['a', 'b'],
      series: { antal: [3, 5] },
    });
    expect(app[1]).toMatchObject({
      columns: ['index', 'antal'],
      rows: [
        ['a', 3],
        ['b', 5],
      ],
    });
  });
});
