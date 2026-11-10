# AI med Python (plan, inte byggd)

Bygg program som använder språkmodeller: prompter, strukturerade svar,
verktyg, egna dokument (RAG) och agenter, och sist en AI-tjänst bakom ett
eget FastAPI-API. Sista kursen i spåret **AI-utvecklare**:
Python → FastAPI → AI med Python.

## Grundidén: en låtsasmodell

Övningarna anropar ingen riktig modell. Det skulle kosta pengar för varje
körning, kräva en nyckel och ge olika svar varje gång, så att inget går
att rätta. I stället har harness-filen en **låtsasmodell** som svarar
förutsägbart, ungefär som låtsas-Streamlit i Python-kursen:

- Koden eleven skriver ser ut som mot ett riktigt API: en klient,
  meddelanden med roller, en systemprompt, verktyg och svar med
  `stop_reason`. Vilket API formen följer bestäms innan kursen byggs
  (ladda `claude-api`-skillen och följ den riktiga formen exakt).
- Låtsasmodellen följer enkla regler som övningen bestämmer (`model:` på
  övningen): fasta svar på vissa frågor, ett verktygsanrop när en fråga
  matchar, JSON när systemprompten ber om det.
- Tiden är på låtsas (samma loop som FastAPI-kursen), så att ett "långsamt"
  modellanrop och `asyncio.gather` går att visa direkt.
- Senare, valfritt: **Prova på riktigt med din egen nyckel** på
  Lekplatsen. Nyckeln stannar i webbläsaren och sparas aldrig.

## Banorna (förslag)

| #  | id             | Bana                | Lär ut                                                          |
| -- | -------------- | ------------------- | --------------------------------------------------------------- |
| 1  | `modell`       | Vad är en modell?   | klient, meddelanden, roller, svaret, tokens och kostnad         |
| 2  | `prompter`     | Prompter            | systemprompt, tydliga instruktioner, exempel i prompten         |
| 3  | `samtal`       | Samtal              | historiken är en lista, minnet är det du skickar med            |
| 4  | `struktur`     | Strukturerade svar  | JSON-svar, Pydantic-validering, när modellen svarar fel         |
| 5  | `verktyg`      | Verktyg             | tool use: modellen ber om en funktion, du kör den och svarar    |
| 6  | `embeddings`   | Embeddings          | text som vektorer, cosinuslikhet med numpy                      |
| 7  | `rag`          | Egna dokument (RAG) | dela upp text, hitta de bästa bitarna, skicka med som kontext   |
| 8  | `agent`        | Agenter             | loopen: tänk, gör, titta – och när den ska sluta                |
| 9  | `utvardering`  | Testa AI            | rätta svar som aldrig blir exakt lika, testfall, säkerhet       |
| 10 | `slutprojekt`  | Slutprojektet       | en AI-tjänst bakom FastAPI: frågor om egna dokument, med verktyg |

## Spåret

`src/app/paths.js` får spåret `ai` (🤖 AI-utvecklare) med kurserna
`['python', 'fastapi', 'ai']` när AI-kursen finns. Ett spår kan inte peka
på en kurs som inte finns.
