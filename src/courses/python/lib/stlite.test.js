import { describe, expect, it } from 'vitest';
import { stliteDocument, usesStreamlit } from './stlite';

describe('usesStreamlit', () => {
  it('känner igen import av streamlit', () => {
    expect(usesStreamlit('import streamlit as st')).toBe(true);
    expect(usesStreamlit('x = 1\nfrom streamlit import title')).toBe(true);
    expect(usesStreamlit('import streamlitx')).toBe(false);
    expect(usesStreamlit('# import streamlit')).toBe(false);
  });
});

describe('stliteDocument', () => {
  it('lägger koden i app.py och tål </script> i koden', () => {
    const page = stliteDocument('st.write("</script>")', { 'data.csv': 'a' });
    expect(page).toContain('"app.py"');
    expect(page).toContain('"data.csv"');
    expect(page.match(/<\/script>/g)).toHaveLength(1);
  });
});
