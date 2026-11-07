# Fullstack – kursens SPEC

Den sista kursen i spåret Fullstack. Eleven har gått Flask och TypeScript
(med React) och kopplar nu ihop dem: hundpensionatet Tassen får ett API i
Flask (`app.py`) och en sida i React med TypeScript (`App.tsx`) som pratar
med det. Allt körs i webbläsaren, utan server.

## Banorna

| Bana    | Fil     | Vad                                                                                                                         |
| ------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| `api`   | app.py  | JSON till en sida, en hund, fel som JSON, boka, krock (409), personalens inloggning. Boss: avboka                           |
| `sidan` | App.tsx | typen för svaret, fetch i useEffect, Laddar…, fel från API:t, POST med JSON, visa felet. Boss: `Svar<T>` och `anropa<T>`    |
| `ihop`  | båda    | pris (app.py, sedan sidan), filter (app.py, sedan knapparna), personalen loggar in, lediga hundar. Boss: hela bokningssidan |

Sex övningar och en boss per bana. Inga projekt eller idéer: hela kursen
är ett projekt. Lekplatsen har en egen Flask-app och en sida mot hela
Tassens API (`playground.slots`).

## En övning

Som i Flask- och TypeScript-kurserna, plus:

- `lang`: `'py'` eller `'tsx'`. Styr körningen, editorns språk och
  felförklaringarna.
- `frontend` (py): sidan som visas ovanför editorn och körs mot elevens
  app efter varje körning. Bana 1 har samma sida (`PAGE_API`) hela vägen,
  så att den fungerar mer och mer.
- `backend` (tsx): Flask-appen som sidans fetch går till. Startas om
  före varje test, så att varje test börjar från noll.
- Koden som inte är elevens står i `data/files.js` (`API_STEG`,
  `TASSEN_*`, `PAGE_*`).

Tips för tester: Flask sorterar nycklarna i JSON, så jämför värden
(`lista.map(b => [b.id, b.hund])`) och inte hela objekt. I app.py-övningar
ger `inputs: []` på ett test en egen körning med tom databas.
