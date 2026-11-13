# AI-handledaren

🤖 Fråga AI-handledaren finns under varje övning (inte bossar) för den
som har full tillgång. Den ser uppgiften, elevens kod och vad som hände
senast, och svarar sokratiskt: ledtrådar och frågor, aldrig facit.

## Delarna

- `supabase/functions/ai-tutor` – anropar Claude via Anthropics SDK med
  en fast systemprompt (cachad) och övningen i användarmeddelandet.
  Standardmodell `claude-opus-5-5` med `effort: "low"`; avböjer modellen
  tar en annan över (`fallbacks: "default"`).
- Migrationen `20261113020000_tutor.sql` – `use_tutor_question` kräver
  tillgång till kursen och räknar frågor per dag (`tutor_usage`).
- `src/core/components/TutorPanel.jsx` – panelen i övningen.

## Sätta upp

1. Kör migrationen i Supabase.
2. Skapa en API-nyckel på https://platform.claude.com (Settings → API
   keys) och sätt en månadsgräns för kostnaden där.
3. `npx supabase secrets set ANTHROPIC_API_KEY=sk-ant-…`
   Valfritt: `TUTOR_MODEL=claude-haiku-5-5` (mycket billigare, något
   enklare svar) och `TUTOR_DAILY_LIMIT=30`.
4. `npx supabase functions deploy ai-tutor`

## Kostnad

En fråga är runt 2 000 tokens in och några hundra ut. Med Claude Opus 5.5
($4 / $20 per miljon tokens) blir det ungefär 1–2 öre per fråga, med
Claude Haiku 5.5 en bråkdel av ett öre. Eftersom full tillgång är ett
engångsköp är det en löpande kostnad: håll ett öga på den i Claude
Console och sänk taket per dag eller byt modell om det behövs.
