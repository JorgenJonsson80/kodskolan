# Byggstudion

`/bygg` – klicka ihop en egen app, se den direkt och lär dig hur den
funkar. "Bygg först, förstå sen": appen är en väg in i kurserna. Än så länge
en prototyp som inte länkas från startsidan.

## Mallarna (utan AI)

`src/app/studio/templates/` – personalschema, bokning och att göra-lista.
Varje mall har `features` (det man kryssar i) och `build({ name, theme,
accent, features })`, som ger `{ html, parts }`: en hel app som en
HTML-fil, med svenska kommentarer och svenska namn, och förklaringarna
under "Så funkar den" med länkar till kurserna. Teman och färger står i
`studio/themes.js`, sidans skal i `studio/page.js`.

`templates.test.js` bygger varje mall med alla kombinationer av val och
kör dem i jsdom: inga fel, och det viktigaste går att göra.

En ny mall: en fil i `templates/`, lägg till den i `templates/index.js`
och i `ACT` i testet.

## Förhandsvisningen

Appen körs i en sandlåda utan origin (som JS-kursens förhandsvisning). Där
finns ingen `localStorage`, så `studio/preview.js` ger appen en egen som
skickar ändringarna till Byggstudion, som sparar dem med projektet.
Projekten sparas i webbläsaren (`kodskolan-bygg-projekt`). Den nedladdade
filen använder webbläsarens vanliga `localStorage`.

## AI-delen

"Något eget" (bygg från en beskrivning) och "Ändra med egna ord" anropar
Edge-funktionen `supabase/functions/app-builder`. Bara för den som har
full tillgång, och högst `BUILDER_DAILY_LIMIT` (20) per dag
(`use_builder_request`, migrationen `_builder.sql`).

Sätta upp:

1. Kör `supabase/migrations/20261115000000_builder.sql` i Supabase.
2. `npx supabase functions deploy app-builder`
   (`ANTHROPIC_API_KEY` finns redan, från AI-handledaren.)
3. Valfritt: `npx supabase secrets set BUILDER_MODEL=claude-sonnet-5-5`
   (snabbare och billigare än standard, `claude-opus-5-5`) och
   `BUILDER_DAILY_LIMIT=20`.

Kostnad: en ny app är runt 5 000–10 000 tokens ut, en ändring lika mycket
(hela filen skrivs om). Med Opus 5.5 ($20 per miljon output-tokens) blir
det cirka 1–2 kr per bygge eller ändring.
