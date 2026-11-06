# Kodskolan (arbetsnamn)

En plattform för interaktiva kodkurser på svenska för den som aldrig
kodat. Eleven skriver riktig kod i webbläsaren och koden rättas med
tester. Planen och etapperna står i `SPEC.md` – läs den först.
`docs/NY-KURS.md` är checklistan för en ny kurs. Varje kurs har sin egen
`CLAUDE.md` i sin mapp och sin SPEC i `docs/kurser/`.

Byggs i etapper enligt `SPEC.md`; användaren testar efter varje. Python,
HTML & CSS och JavaScript har flyttat in (`src/courses/python`, `html`,
`js`). De gamla repona (`../python från S`, `../html från S`,
`../React från S`) publicerar bara en sida som skickar vidare hit.

Live: https://jorgenjonsson80.github.io/kodskolan/

Vite + React 19 (JavaScript, inte TypeScript), CodeMirror 6. Ingen egen
server. Supabase för inloggning och synkade framsteg (valfritt – utan
nycklar i `.env.local` sparas allt bara i localStorage). Samma
Supabase-projekt som de gamla akademierna. Framstegen ligger i
`course_progress`, en rad per användare och kurs. Ny SQL i
`supabase/migrations/` testas i `supabase/migrations.test.js` (PGlite)
och körs sedan av användaren i Supabase innan koden som behöver den
pushas.

## Kommandon

- `npm run dev` – utvecklingsserver
- `npx vitest run` – alla tester, även kursernas: i Node (Python körs på
  riktigt via `pyodide` från npm, HTML med jsdom) och `*.browser.test.js`
  i riktig Chrome (`npx playwright install chromium` första gången)
- `npm run lint` och `npx prettier --check src`
- `npm run build` – byggs med `base: /kodskolan/` och kopierar
  `index.html` till `404.html`, så att `/kodskolan/python` fungerar
  när man laddar om

Push till `main` kör testerna och publicerar via
`.github/workflows/deploy.yml`.

## Arkitektur

- `src/app/` – sajten. `main.jsx` läser adressen (`courseFromPath` i
  `courses.js`) och visar startsidan (`Home.jsx`) eller en kurs.
  Kursen och kärnan laddas med `import()` först när en kurs öppnas.
  `courses.js` har alla kurser i ordning; en kurs med `href` i stället
  för `load` öppnas på en annan sajt.
- `src/core/` – det alla kurser delar. **Får aldrig importera från en
  kurs** (ESLint stoppar det). Det som beror på språket hämtas med
  `useCourse()` från `core/course.js`.
  - `CourseApp.jsx` en kurs: progress, utkast, låsning av banor och
    projekt, firande, quiz. Nycklarna i localStorage börjar med kursens
    `storagePrefix`
  - `components/` gränssnittet: `LessonPanel.jsx` en övning (byts ut med
    `key` per övning), `Playground.jsx`, `CodeEditor.jsx` (språket och
    hovern från kursen), `Quiz.jsx`, `Collection.jsx`, `StuckPanel.jsx` …
  - `lib/` lagring (`storage.js`, localStorage i try/catch som tål
    skräpdata), inloggning (`useAccount.js`, samma i alla kurser och på
    startsidan), synk (`useCloudProgress.js`, `progress.js` slår ihop), `aiPrompt.js`, `playground.js`
  - `projects.js`, `quiz.js`, `resources.js`, `stages.js` (figuren som
    växer en ålder per klar bana), `encouragement.js`
  - `runner/diff.js` och `compare.js` – Visa skillnaden och facit-längd
- `src/courses/<id>/` – en kurs. `meta.js` är det startsidan visar,
  `index.jsx` kursen enligt Kontraktet i `SPEC.md`, `useWorkbench.jsx`
  kursens verktyg runt editorn. Resten är kursens egen sak, se kursens
  `CLAUDE.md`.

## Kod

- Prettier: `singleQuote`, `arrowParens: avoid`. Kommentarer på svenska
  och förklarar varför, inte vad.
- Två syskon får aldrig samma `key` – använd prefix.
- Kortkommandon: läs `event.code`, inte tecknet.
- Behöver kärnan veta något nytt om ett språk: lägg till det i
  kontraktet (`SPEC.md`, alla kursers `index.jsx`), aldrig `if (course.id
  === …)`.
- Testa i en riktig webbläsare (Playwright mot `npx vite`) innan commit.
  Selektorer: `button:has-text(…)`, inte `text=…`.
- Svara användaren på svenska. Föreslå nytt innehåll innan det byggs.
