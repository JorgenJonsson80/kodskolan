# Pythonkursen

Python Academy som kurs i Kodskolan. Kursens SPEC (banorna och reglerna
för innehållet) finns i `docs/kurser/python.md`. Sökvägarna nedan utgår
från den här mappen, `src/courses/python/`.

`index.jsx` är kursen enligt kontraktet i `SPEC.md` i roten: körningen,
editorn, felförklaringarna, texterna och Hjälp-rutans Python-delar.
`useWorkbench.jsx` ger Kör rad för rad, svaren till input() och
Streamlit-appen runt editorn. `meta.js` är det startsidan visar.

## Arkitektur

- `runner/harness.py` – körs inne i Pyodide: kompilerar med filnamnet
  `<elev>`, kör i ett eget namespace, fångar print, låtsas-`input()` som
  läser från `lesson.inputs`, kör testuttrycken och jämför med `==`.
  Samma fil används i webbläsaren och i testerna i Node.
- `runner/pyWorker.js` – laddar Pyodide från jsDelivr (version i
  `pyodideVersion.js`, samma som npm-paketet).
- `runner/python.js` – en varm worker, en körning i taget, 3 s timeout
  och sedan `terminate()` + ny worker.
- `harness.py` har också `step_student` för Kör rad för rad: `sys.settrace`
  sparar ett steg per rad i `<elev>` med variablerna som `repr()` och hur
  mycket som skrivits ut. Max 300 steg. Består koden bara av funktioner
  anropas första testets anrop (`exampleCall` i `lib/useStepper.js`).
  Varje steg har också `call` (`dubbla(tal=4)`), `outer` (anropen som
  väntar), `flow` (sant/falskt i if/elif/while och varv i loopar, från
  `_branches`) och `returned` på ett eget steg vid return.
  `lib/stepExplain.js` gör om stegen till meningar på svenska, lappen på
  raden i editorn och frågorna i Gissa först. `components/StepPanel.jsx`
  visar stegen.
- `editor/codeInfo.js` – hover ("vad är det här och vad tillhör det?")
  och förslag efter punkt, byggt på `@lezer/python`-trädet. Lägg till
  nyckelord, inbyggda funktioner och metoder i tabellerna överst när nya
  banor använder dem.
- `runner/evaluate.js` – gör om svaret till feedback i klartext.
- `runner/friendlyErrors.js` – Pythons fel förklarade på svenska.
  Pyodide saknar Pythons egna "Did you mean …?", så harness.py räknar fram
  förslaget med difflib.
- `data/` – innehållet är data, inte kod:
  - `tracks.js` banorna i ordning med `teaches`, `reward`, `docs` och
    `canBuild` ("Nu kan du t.ex. bygga …" i firandet när banan är klar)
  - `lessons/` en fil per bana (`grunder.js`, `loopar.js` …), samlade i
    `lessons/index.js`. `lessons.test.js` kör varje facit och startkod
    med riktig Python
  - `lessons/bossar.js` en boss per bana (`isBoss`, inga ledtrådar).
    `index.js` lägger den sist i banan, och banan är inte klar utan den
  - `projects.js` tre projekt per bana med steg (`why` på varje steg).
    `PROJECT_STEPS` gör stegen till vanliga övningar; ett steg utan
    startkod börjar med förra stegets facit. `projects.test.js` kör dem
  - `ideas.js` tre idéer per bana till Lekplatsen, `resources.js` länkar
    per bana till Fastnat?-panelen (YouTube-_sökningar_, inte videor)
- `test/concepts.js` – kollar att facit inte använder listor, `def`,
  f-strängar eller dictionaries före sin bana.
- `data/quiz.js` – fyra frågor per bana till Testa dig förbi och
  nivåtestet (`components/Quiz.jsx`), rätt svar först. `quiz.test.js` kör
  koden och kollar att rätt svar är det Python faktiskt skriver ut. En
  klarad bana sparas som `<bana>-testad` bland de klara id:na, så att den
  synkas med kontot. Banan blir klar när också bossen är klar.

## En övning

Som i `docs/kurser/python.md`. Utöver det:

- Testuttrycket `__output` är det programmet skrev ut, som en lista med
  rader. `__output[-1]` och liknande fungerar också.
- `__raises(f, 1, 2)` ger namnet på felet `f(1, 2)` gör raise med (eller
  None), och `__message(f, 1, 2)` meddelandet. Så rättas övningar med
  `raise`.
- Slump rättas med många anrop, t.ex.
  `sorted(set(kasta() for _ in range(300)))`. Lägg ett enkelt anrop
  först, eftersom Kör rad för rad kör första testets anrop (max 300 steg).
- `files: { 'data.csv': '…' }` på en övning, ett projekt eller en idé
  skrivs till Pythons filsystem före varje körning (`_write_files` i
  harness.py). Så får pandas-övningarna sina CSV-filer.
- Bana 14 (Streamlit): harness.py har en låtsas-`streamlit` i
  `sys.modules` som antecknar vad appen visar (`_App`, `_Place`).
  Widgetarna ger sina startvärden. Testerna läser `__shown('title')`
  (texterna av en sort) eller `__app` (`[sort, text]` i ordning). Ett test
  med `widgets: {"Antal": 3}` kör om programmet med de värdena, och en
  lista med widgets är flera klick efter varandra med samma
  `st.session_state`. `st.stop()` och `st.rerun()` fungerar. Svaret har
  `app`, som `components/AppPreview.jsx` ritar. `components/LiveApp.jsx`
  kör riktig Streamlit med stlite (`lib/stlite.js`) i en iframe, bara
  när eleven trycker. Saknas en st-funktion: lägg till den i `_Place`.
- matplotlib (används av Dataanalys bana 7): `harness.py` ritar med
  Agg, skickar varje figur som PNG i `figures` (visas av
  `ResultPreview.jsx`) och stänger dem efter körningen. Testerna läser
  `__figur(index=0)`: typ (staplar, liggande staplar, histogram, linje,
  punkter), titel, x, y, staplar, etiketter, linjer, punkter, forklaring,
  diagram. Aldrig pixlar. Workern importerar pyplot i förväg, för första
  importen bygger fontcachen och tar längre än tidsgränsen.
- pandas laddas när koden importerar det (`loadPackagesFor` i
  pyWorker.js). Tidsgränsen pausas under tiden och statusen visar
  "Laddar pandas…". I testerna laddas pandas en gång i `nodePython.js`.
  Testa värden, aldrig hela tabeller: `per_produkt.to_dict()`,
  `df["summa"].tolist()`.
- I bana 11 (Felsökning) är startkoden trasig och eleven lagar den.
  Projektstegen där har egen `starterCode` med en ny bugg i varje steg.
- Ett test kan ha egna `inputs`. Då körs programmet en gång till med de
  svaren, så att alla grenar i en if går att rätta. `lesson.inputs`
  används för huvudkörningen och måste finnas om koden anropar input().
- Inga f-strängar före bana 5, inga listor före bana 3, ingen `def`
  före bana 4 och inga comprehensions, `enumerate`, `zip` eller `lambda`
  före bana 7, inga `try` eller `raise` före bana 8 ingen `import`
  före bana 9 och ingen `class` före bana 10,
  ingen `import pandas` före bana 12, ingen `open` före bana 13 och ingen `import streamlit` före bana 14 i facit. Text sätts ihop med `+` och `str()`.
