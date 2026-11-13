# AI med Python

Bygg program som använder språkmodeller: prompter, strukturerade svar,
verktyg, egna dokument (RAG) och agenter, och sist en AI-tjänst bakom ett
eget FastAPI-API. Sista kursen i spåret **AI-utvecklare**
(`src/app/paths.js`): Python → FastAPI → AI med Python.

## Låtsasmodellen

Övningarna anropar ingen riktig modell. Det skulle kosta pengar för varje
körning, kräva en nyckel och ge olika svar varje gång, så att inget går
att rätta. I stället lägger `runner/ai_harness.py` en låtsasversion av
Anthropics Python-SDK i `sys.modules['anthropic']`. Eleven skriver samma
kod som mot det riktiga API:et:

- `anthropic.Anthropic()` och `anthropic.AsyncAnthropic()` med
  `client.messages.create(model=…, max_tokens=…, messages=[…], system=…,
  tools=[…], output_config=…)` och `client.messages.parse(…,
  output_format=PydanticModell)` (→ `parsed_output`).
- Svaret är ett `Message` med `id`, `role`, `model`, `content` (block av
  typen `text` eller `tool_use` med `id`, `name`, `input`), `stop_reason`
  (`end_turn`, `tool_use`, `max_tokens`) och `usage` (`input_tokens`,
  `output_tokens`).
- Felen heter som i SDK:t (`BadRequestError` 400, `NotFoundError` 404,
  `RateLimitError` 429 …, alla `APIStatusError` med `status_code` och
  `message`). Anropet kontrolleras som på riktigt: `max_tokens`, roller,
  tomma meddelanden och att varje `tool_result` hör till ett `tool_use`.
- Exemplen använder `claude-opus-5-5`. Kostnadsövningarna räknar med dess
  pris: 4 dollar per miljon input-tokens och 20 per miljon output-tokens.

### Hur låtsasmodellen svarar

1. **Övningens regler** (`modell` på övningen, en lista) går först. Den
   första regel som passar används. En regel kan ha:
   - `om`, `system`, `historik` – reguljära uttryck (skiftlägesokänsliga)
     mot senaste frågan, systemprompten och alla användarmeddelanden.
   - `kraver_verktyg`, `efter_verktyg` – bara när verktyg skickats med,
     eller bara på ett meddelande med `tool_result`. `resultat` matchar
     texten i verktygsresultaten.
   - Ett svar: `svar` (text, `{fraga}` och `{resultat}` byts ut), `json`
     (ett strukturerat svar), `verktyg: {namn, input}` (ett `tool_use`, eller
     en lista för flera i samma svar)
     eller `fel: 'RateLimitError'`. `ganger` begränsar hur många gånger
     regeln används.
2. **Inbyggt:** svar på verktygsresultat (`Enligt verktyget: …`), minne av
   "jag heter …" i historiken, enkel räkning (`Vad är 6 * 7?` → `Det blir
   42.`) och hälsningar.
3. **Systemprompten styr stilen:** `pirat` (Arrr!), `kort`/`en mening`
   (första meningen), `ett ord`, `versaler`, `engelska`.
4. Annars: `Jag är Kodskolans låtsasmodell. Du skrev: …`

Ett ord räknas som en token. Ett anrop tar en låtsassekund (FastAPI-
kursens `_Loop`): `AsyncAnthropic` med `asyncio.gather` tar alltså en
sekund för tre frågor. `asyncio.run` använder samma loop.

Testerna kan läsa `__anrop()` (det som skickades, ett anrop per rad) och
`__sekunder(lambda: …)`. Regler och tester körs med `runner/model.js`,
som skickar reglerna som filen `.modell.json`.

## Banorna

| #  | id            | Bana                | Lär ut                                                          | Klar |
| -- | ------------- | ------------------- | --------------------------------------------------------------- | ---- |
| 1  | `modell`      | Språkmodellen       | klient, anrop, block, stop_reason, tokens, kostnad, nyckel, omförsök | ✅ |
| 2  | `prompter`    | Prompter            | systemprompt, tydliga instruktioner, mallar, data i taggar      |      |
| 3  | `samtal`      | Samtal              | historiken är en lista, minnet är det du skickar med            |      |
| 4  | `struktur`    | Strukturerade svar  | `parse` med Pydantic, JSON-schema, när svaret är fel            |      |
| 5  | `verktyg`     | Verktyg             | tool use: modellen ber om en funktion, du kör den och svarar    |      |
| 6  | `embeddings`  | Embeddings          | text som vektorer, cosinuslikhet                                |      |
| 7  | `rag`         | Egna dokument (RAG) | dela upp text, hitta de bästa bitarna, skicka med som kontext   |      |
| 8  | `agent`       | Agenter             | loopen: tänk, gör, titta – och när den ska sluta                |      |
| 9  | `utvardering` | Testa AI            | rätta svar som aldrig blir exakt lika, testfall, säkerhet       |      |
| 10 | `slutprojekt` | Slutprojektet       | en AI-tjänst bakom FastAPI: frågor om egna dokument, med verktyg |     |

Anthropic har inget eget embeddings-API (de rekommenderar t.ex. Voyage
AI). Bana 6 bygger därför enkla vektorer själv i Python, och säger det.

## En övning

Som i Python-kursen, plus `modell` (låtsasmodellens regler) och, i
slutprojektet, `request` som i FastAPI-kursen. Id börjar med `ai-`.
Facit får inte använda något före sin bana (`test/concepts.js`).

## Projekten

Tre projekt med tre steg per bana (`data/projectsA.js` för bana 1–5,
`projectsB.js` för 6–10). `data/projectHelper.js` bygger stegen: `add` är
koden steget lägger till, `change` ändringar i koden som redan finns, och
`modell` gäller hela projektet. Tre idéer per bana (`data/ideas.js`).
