# Dataanalys

Kursens SPEC (banorna, Kafé Kanels data och reglerna för innehållet)
finns i `docs/kurser/data.md`. Sökvägarna nedan utgår från den här
mappen, `src/courses/data/`.

`index.jsx` är kursen enligt kontraktet i `SPEC.md` i roten. Kursen
återanvänder Python-kursen helt: workern med pandas, `harness.py`,
rättningen, editorn, felförklaringarna, Kör rad för rad och Streamlit.
Bara innehållet och texterna är kursens egna.

## Data

- `data/filer/*.csv` skapas av `scripts/data/kafe.py` med fast slump.
  Ändra skriptet och kör det igen, aldrig filerna för hand. Ändras datan
  ändras svaren i testerna: kör `npx vitest run src/courses/data` och
  räkna om de förväntade värdena.
- `data/filer/index.js` läser filerna med `?raw`. `KASSA` är
  `{ 'kassan.csv': … }` till övningarnas `files`.
- Testa värden, aldrig hela tabeller: `per_produkt.to_dict()`,
  `df["summa"].tolist()[0]`, `len(df)`. Rättningen jämför exakt, så
  decimaltal avrundas i facit eller i testet (`.round(1)`).

## Tester

`data/lessons/lessons.test.js` kör facit och startkoden med Python-
kursens `test/nodePython.js` (pandas från `node_modules/pyodide`), och
`test/concepts.js` stoppar facit som använder något före sin bana.
