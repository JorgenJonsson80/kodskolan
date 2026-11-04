# Kodskolan (arbetsnamn)

En plattform för interaktiva kodkurser på svenska för den som aldrig
kodat. Python Academy, HTML & CSS Academy och JS Academy flyttar in hit
som kurser, och en ny kurs ska bara vara en ny mapp.

Varje kurs har kvar sina egna regler i `docs/kurser/<kurs>.md` (banor,
övningar, vad som får användas före vilken bana). Den här filen handlar
om det som är gemensamt.

## Mål

- **En ny kurs = en ny mapp.** Kärnan ska inte behöva ändras för att
  lägga till ett språk. Behöver den det är det ett fel i plattformen,
  och då lagas kärnan så att nästa kurs slipper.
- **Ett fel lagas en gång.** Allt som inte bryr sig om språket finns
  bara i kärnan.
- **Ett konto** för alla kurser, och framstegen följer med.
- **Säljbart:** gratisbanor, låsta betalbanor och skollicenser (etapp
  5–6). Fram till dess är allt öppet som i dag.
- **Elevens upplevelse ändras inte** när en kurs flyttar in. Samma
  övningar, samma sparade framsteg (samma localStorage-nycklar och
  samma tabell tills etapp 3).

## Struktur

En app och ett npm-paket (inte npm workspaces: det behövs inte så
länge allt byggs ihop). Mapparna håller isär kärna och kurser, och
ESLint stoppar import från en kurs i kärnan.

```
src/
  app/                sajten: startsidan, kurslistan och adresserna
    main.jsx
    courses.js        alla kurser, laddas först när de öppnas
  core/               det alla kurser delar
    CourseApp.jsx     en kurs: banor, övning, Lekplatsen, quiz, firande
    course.js         CourseContext och useCourse()
    components/       övningen, feedback, ledtrådar, Fastnat?, samlingen …
    lib/              lagring, synk, framsteg, AI-frågan, Lekplatsen
    runner/           diff och compare (Visa skillnaden, facit-längd)
    projects.js quiz.js stages.js …  hjälpfunktionerna kurserna delar
  courses/
    python/
      meta.js         det startsidan visar, utan att ladda kursen
      index.jsx       kursen: det kärnan frågar efter (se Kontraktet)
      useWorkbench.jsx
      runner/ editor/ components/ lib/ data/ test/
docs/
  NY-KURS.md          checklistan för en ny kurs
  kurser/python.md    kursens egen SPEC
```

## Kontraktet: en kurs

`courses/<id>/index.jsx` exporterar ett objekt. Allt kärnan behöver veta
om ett språk står här, och inget annat.

```js
export default {
  ...meta, // id (adressen /python), name, icon, tagline,
  // storagePrefix (localStorage), progressTable (tills etapp 3)

  content: {
    tracks, lessons, projects, projectSteps, ideas, quiz, resources,
    ideaStarterCode, // Lekplatsens startkod i kursens språk
  },

  runtime: {
    run,          // ({ code, tests, inputs, files }) => svaret nedan
    evaluate,     // (lesson, code, svar) => feedback (som i dag)
    warmUp, onStatus, statusText, timeoutMs,
  },
  editor: {
    extensions,   // () => CodeMirror-tillägg: språk, indrag, förslag
    describeAt,   // hover: (state, pos, side) => { from, to, title, body }
    comment,      // text => en kommentar i språket (projektsteg, Lekplatsen)
    codeFence,    // språket i AI-frågans kodblock
    tips,         // raden under editorn
  },
  errors: { errorTitle, explainError, icon },
  useWorkbench,   // hook: Kör rad för rad, förhandsvisning m.m. (nedan)
  ResultPreview,  // valfri: det körningen ritade (Streamlit-appen …)
  texts: { … },   // det i gränssnittet som säger något om språket
  help: { editor, tools }, // kursens delar av Hjälp-rutan
};
```

`run` svarar som i dag:

```js
{
  syntaxError: null | { type, message, line },
  error: null | { type, message, line },
  tests: [{ passed, actual, repr } | { passed: false, error }],
  output: [...], console: [...],
  warnings?: [...], app?: [...],   // det kursen själv använder
}
```

`useWorkbench({ code, lesson, idea, busy })` är kursens egna verktyg
runt editorn. `lesson` är null på Lekplatsen. Den svarar `{ runOptions,
editor, beforeEditor, afterEditor, actions, panels }`: `runOptions`
skickas med till `run` (t.ex. svaren till input() på Lekplatsen),
`editor` går till CodeEditor (markerad rad och lapp), `actions` är
knappar bredvid Kolla lösning och `panels` visas under knapparna. Python har Kör rad för rad och Streamlit där,
HTML får förhandsvisningen.

## Data och konton

| Tabell             | Etapp | Innehåll                                         |
| ------------------ | ----- | ------------------------------------------------ |
| `py_progress` m.fl.| 1–2   | som i dag, en per kurs                           |
| `progress`         | 3     | user_id, course_id, klara id:n, utkast, lägen    |
| `entitlements`     | 5     | user_id, course_id, giltig till, källa           |
| `lesson_content`   | 5     | betalbanornas övningar, läses bara med tillgång  |
| `schools` …        | 6     | skolor, klasser, medlemmar                       |

Gratisbanorna ligger kvar i appen. Betalbanorna hämtas från
`lesson_content`, och RLS bestämmer vem som får läsa dem.

## Adresser

GitHub Pages under `/kodskolan/`. `/` är startsidan med kurserna,
`/python` en kurs. Bygget kopierar `index.html` till `404.html` så att
en adress som `/kodskolan/python` fungerar även när man laddar om.
När alla kurser flyttat in (etapp 2) skickar de gamla sajterna vidare
hit.

## Etapper

Användaren testar efter varje etapp.

1. ✅ **Kärnan och Python.** Kärnan bryts ut ur Python Academy, Python
   blir första kursen, startsidan visar den. Alla tester gröna och
   eleven märker ingen skillnad.
2. **HTML och JS flyttar in.** Det som skiljer sig mellan de tre
   versionerna av kärnan slås ihop. Gamla adresser skickar vidare.
3. **Ett konto, Mina kurser.** En tabell `progress`, och de gamla
   tabellerna flyttas över.
4. **Språkfil.** All text i kärnan i `sv.js`, så att engelska blir en
   ny fil.
5. **Låst innehåll och Stripe.** Gratisbanor, köp och betalbanor från
   databasen. Stripe via Supabase Edge Functions, testkort först.
6. **Lärarvyn.** Klasser, inbjudningslänk, elevernas framsteg.
7. **TypeScript som ny kurs.** Bevisar att en ny kurs bara är en ny
   mapp.
