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
  ...meta, // id (adressen /python och course_id i kontot), name,
  // icon, tagline, storagePrefix (localStorage)

  content: {
    tracks, lessons, projects, projectSteps, ideas, quiz, resources,
    ideaStarterCode, // Lekplatsens startkod i kursens språk
  },
  progress?: {    // bara om kursen sparade på annat sätt förut (JS)
    legacyCompleted, // () => klara id:n från gamla nycklar
  },

  runtime: {
    run,          // ({ code, tests, inputs, files, ...runOptions }) => svar
    evaluate,     // (lesson, code, svar) => feedback
    hasResult?,   // run => true när Lekplatsen visar något annat än
                  // utskriften (Streamlit-appen, en React-komponent)
    warmUp, onStatus, statusText, timeoutMs, // valfria: bara det som
  },                                         // behöver startas (Python)
  editor: {
    extensions,   // context => CodeMirror-tillägg: språk, indrag, förslag
    describeAt,   // hover: (state, pos, side) => { from, to, title, body }
                  // eller ett Promise med det (TypeScript)
    comment,      // text => en kommentar i språket (projektsteg, Lekplatsen)
    codeFence,    // språket i AI-frågans kodblock (eller en funktion)
    normalize?,   // kod => kod utan det som bara är stil (jämförs med facit)
    format?,      // (kod, markör) => { formatted, cursorOffset } (JS: Prettier)
    tips,         // raden under editorn
  },
  errors: { errorTitle, explainError, icon },
  useWorkbench,   // hook: Kör rad för rad, förhandsvisning m.m. (nedan)
  ResultPreview?, // det körningen ritade (Streamlit-appen, React …)
  playground: {
    runs,         // false = ingen Kör-knapp, sidan syns direkt (HTML)
    intro,
    slots?,       // egna platser i listan: [{ key, label, starter }]
  },
  texts: {        // det i gränssnittet som säger något om språket
    failedToStart, running, starting?, nothingPrinted?, warningsTitle?,
    outputLabel?, // "Utskrift" (standard) eller "Konsol"
    docs: track => …, readGuide, copyNote,
    learning,     // språket i AI-frågan (eller en funktion av banorna)
    encouragement?: { syntax?, crash?, tests? },
  },
  help: {         // kursens delar av Hjälp-rutan och Fastnat?
    intro, checkResult, playground?, editor, firstTips, laterTips,
    stuckTips,
  },
};
```

`run` svarar som i dag:

```js
{
  syntaxError: null | { type, message, line },
  error: null | { type, message, line },
  tests: [{ passed, actual, repr } | { passed: false, error }],
  output: [...], console: [...],
  warnings?: [...], // visas i en gul ruta under feedbacken
  app?: [...],      // det ResultPreview ritar
}
```

`useWorkbench({ code, lesson, idea, busy })` är kursens egna verktyg
runt editorn. `lesson` är null på Lekplatsen. Den svarar `{ runOptions,
editor, beforeEditor, afterEditor, actions, panels }`: `runOptions`
skickas med till `run` (t.ex. svaren till input() på Lekplatsen),
`editor` går till CodeEditor (markerad rad och lapp), `actions` är
knappar bredvid Kolla lösning och `panels` visas under knapparna.
`editor` kan också ha `fileName`, som visas i editorns rubrik, och
`context`, som skickas till `editor.extensions(context)`. Ändras
`context` byts språket ut i editorn (SQL: övningens tabeller, till
förslagen och hovern). `beforeEditor` visas ovanför editorn både i
övningarna och på Lekplatsen. Python har Kör rad för rad, svaren till
input() och Streamlit där, HTML förhandsvisningen, JS filerna, Kör rad
för rad och vad som ska förhandsvisas, och SQL databasen (📋 Tabellerna
och databasvalet på Lekplatsen).

## Data och konton

| Tabell             | Etapp | Innehåll                                         |
| ------------------ | ----- | ------------------------------------------------ |
| `py_progress` m.fl.| 1–2   | akademiernas egna, används inte längre           |
| `course_progress`  | 3     | user_id, course_id, klara id:n, utkast, lägen    |
| `entitlements`     | 5     | user_id, course_id, giltig till, källa           |
| `lesson_content`   | 5     | betalbanornas övningar, läses bara med tillgång  |
| `schools` …        | 6     | skolor, klasser, medlemmar                       |

`course_progress` har en rad per användare och kurs (`course_id` är
kursens `id`), så en ny kurs behöver ingen ny tabell. Migrationen
kopierade över akademiernas tabeller, som ligger kvar orörda.
`supabase/migrations.test.js` kör alla migrationer i PGlite (Postgres i
Node) och kollar flytten och RLS. Användaren kör SQL:en själv i Supabase.

Gratisbanorna ligger kvar i appen. Betalbanorna hämtas från
`lesson_content`, och RLS bestämmer vem som får läsa dem.

## Adresser

GitHub Pages under `/kodskolan/`. `/` är startsidan med kurserna,
`/python` en kurs. Bygget kopierar `index.html` till `404.html` så att
en adress som `/kodskolan/python` fungerar även när man laddar om.
De gamla sajterna (py-academy, html-academy, js-academy) skickar vidare
till sin kurs här. Deras repon publicerar bara mappen `redirect/`.

## Etapper

Användaren testar efter varje etapp.

1. ✅ **Kärnan och Python.** Kärnan bryts ut ur Python Academy, Python
   blir första kursen, startsidan visar den. Alla tester gröna och
   eleven märker ingen skillnad.
2. **HTML och JS flyttar in.** Det som skiljer sig mellan de tre
   versionerna av kärnan slås ihop. Gamla adresser skickar vidare.
   HTML ✅ (kontraktet fick `playground`, fler `help`-delar och
   `warnings`). JS ✅ (kontraktet fick `progress`, `editor.format`,
   `normalize`, `playground.slots`, `hasResult` och `outputLabel`).
   De gamla sajterna skickar vidare hit ✅.
3. **Ett konto, Mina kurser.** En tabell `course_progress` (namnet
   `progress` är upptaget av JS Academy), och de gamla tabellerna
   flyttas över. Startsidan visar inloggningen och kurserna man börjat
   på under Mina kurser.
4. **Språkfil.** All text i kärnan i `sv.js`, så att engelska blir en
   ny fil.
5. **Låst innehåll och Stripe.** Gratisbanor, köp och betalbanor från
   databasen. Stripe via Supabase Edge Functions, testkort först.
   Admin: en tabell `admins` (user_id) som bara går att ändra i
   Supabase. En admin har tillgång till allt, som om allt vore köpt.
6. **Lärarvyn.** Klasser, inbjudningslänk, elevernas framsteg.
7. ✅ **TypeScript som ny kurs.** Bevisar att en ny kurs bara är en ny
   mapp (`src/courses/ts`, SPEC i `docs/kurser/typescript.md`). Kärnan
   behövde bara en sak: `describeAt` får svara med ett Promise.

SQL kom före etapp 4–7 som fjärde kurs (`src/courses/sql`, SPEC i
`docs/kurser/sql.md`). Kärnan behövde bara två saker: `editor.context`
och `beforeEditor` på Lekplatsen.
