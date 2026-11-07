# En ny kurs i Kodskolan

En ny kurs är en ny mapp i `src/courses/` och en rad i
`src/app/courses.js`. Kärnan (`src/core/`) ska inte behöva ändras.
Behöver den det, lägg till det i kontraktet i `SPEC.md` så att nästa
kurs slipper, i stället för att lösa det med ett specialfall.

Sex kurser att utgå från: `python` (en körning som startas, Kör rad
för rad, Streamlit), `html` (rättas direkt i webbläsaren, ingen
Kör-knapp), `js` (en worker per körning, React-förhandsvisning,
Prettier) och `sql` (en varm worker med WebAssembly, rättning mot
facit, editorn får övningens tabeller via `editor.context`) och `ts`
(kompilatorn i en varm worker, typtester, körs sedan med JS-kursens
rättning) och `flask` (Python-kursens worker med fler paket, en egen
panel för anropen). Välj den
som liknar det nya språket mest. `sql` är den minsta och den första som
byggdes direkt i Kodskolan.

## Mappen

```
src/courses/<id>/
  meta.js           id, name, icon, tagline, storagePrefix
  index.jsx         kursen enligt kontraktet i SPEC.md
  useWorkbench.jsx  kursens verktyg runt editorn (kan vara nästan tom)
  runner/           körningen: run() och evaluate(), felförklaringar
  editor/           CodeMirror-språket och hovern
  components/       det bara den här kursen visar (förhandsvisning …)
  data/             tracks, lessons/, projects, ideas, quiz, resources
  test/             hjälp för testerna, t.ex. att köra språket i Node
  CLAUDE.md         kursens egna regler, läses när man arbetar i mappen
docs/kurser/<id>.md kursens SPEC: banorna och vad som lärs ut när
```

## Vad kärnan frågar efter

Se Kontraktet i `SPEC.md`. Det viktigaste:

- **`runtime.run`** svarar alltid i samma form (`syntaxError`, `error`,
  `tests`, `output`, `console`). Då fungerar feedback, Visa skillnaden
  och Fastnat? direkt.
- **`runtime.evaluate`** gör om svaret till feedback. Pythons version
  går att kopiera, och bara visningen av värden (`pyRepr`) byts.
- **`editor`**: språket (`extensions`), hovern (`describeAt`), hur en
  kommentar skrivs (`comment`, används för projektstegen och kopian till
  Lekplatsen) och kodstaketet till AI-frågan (`codeFence`).
- **`useWorkbench`** svarar med det kursen visar runt editorn. En kurs
  utan egna verktyg svarar `{ runOptions: {}, editor: {} }`.
- **`texts` och `help`**: allt i gränssnittet som nämner språket.
- Valfritt (se SPEC.md): `editor.format`, `editor.normalize`,
  `playground.slots`, `runtime.hasResult`, `ResultPreview` och
  `progress` (bara om kursen sparat framsteg på annat sätt förut).
- **`content.ideaStarterCode(idea)`**: Lekplatsens startkod (idé eller
  fri kod) i kursens språk.

Hjälpfunktionerna för projekt (`projectSteps`, `isProjectComplete`),
quiz (`trackQuestions`) och länkar (`videoSearchUrl`) finns i kärnan.
Datafilerna innehåller bara innehåll.

## Ordning att bygga i

Användaren testar efter varje steg.

1. **Skal:** mappen, `meta.js`, en rad i `app/courses.js` och en
   körning som rättar _en_ övning. Kortet syns på startsidan.
2. **Bana 1–2** med felförklaringar på svenska och kvalitetstesterna
   (facit klarar sina tester, startkoden underkänns, tre ledtrådar).
3. **Projekt, Lekplatsen, idéer och Fastnat?**, banorna 3–6.
4. **Hover och förslag** i editorn.
5. **Resten av banorna med bossar.**
6. **Slutprojekt.**

## Checklista för en ny bana

- [ ] `tracks.js`: `id`, `title`, `teaches`, `reward` (emojin får inte
      finnas hos någon annan bana eller något projekt), `canBuild` och `docs`
- [ ] `lessons/<bana>.js` med 9 övningar, samlade i `lessons/index.js`
- [ ] `lessons/bossar.js`: en boss, sist i banan i `index.js`
- [ ] `projects.js`: tre projekt med tre steg, `why` på varje steg
- [ ] `ideas.js`: tre idéer, `resources.js`: minst två ämnen
- [ ] `test/concepts.js`: regel för det nya begreppet, om det inte får
      användas tidigare
- [ ] Hover och felförklaringar för det nya begreppet, med tester
- [ ] `npx vitest run`, `npm run lint`, `npx prettier --check src`,
      `npm run build`
- [ ] Lös hela banan i Chrome med Playwright: alla övningar, bossen,
      firandet och konsolen utan fel
- [ ] Commit, push och kolla live-sidan

## Språken

### TypeScript – klar som femte kurs

Se `src/courses/ts/CLAUDE.md` och `docs/kurser/typescript.md`. Kursen
återanvänder JS-kursens körning och React, och lägger till kompilatorn i
en egen worker. Kärnan behövde bara en sak: hovern får vara ett Promise.

### Flask – klar som sjätte kurs

Se `src/courses/flask/CLAUDE.md` och `docs/kurser/flask.md`. Kursen
återanvänder Python-kursens körning (`createPythonRunner`) och lägger
Flask i en egen worker. Kärnan behövde ingenting nytt.

### Fullstack – klar som sjunde kurs

Se `src/courses/fullstack/CLAUDE.md` och `docs/kurser/fullstack.md`. En
kurs med två språk: övningens `lang` byter körning och editor
(`editor.context`). Kärnan behövde ingenting nytt.

### SQL – klar som fjärde kurs

Se `src/courses/sql/CLAUDE.md` och `docs/kurser/sql.md`.

### Mindre lämpligt

Java, C#, C++, Rust och Go kräver stora nedladdningar och långsam
kompilering i webbläsaren. R (webR) och Lua (wasmoon) fungerar men har
mindre nytta här.

## Konton

Inget att göra: framstegen sparas i `course_progress` med kursens `id`
som `course_id`. Byt inte `id` på en kurs som har elever, då tappar de
framstegen i kontot.
