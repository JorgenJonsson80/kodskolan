# Koda med AI

**Förslag – inte byggt.** År 2026 skriver de flesta kod tillsammans med
en AI-assistent. Den här kursen lär ut det som avgör om det blir bra:
att be om rätt sak, att **läsa och granska** koden som kommer tillbaka,
att hitta felen och att testa. Säljargument: _lär dig koda så att du
styr AI:n – inte tvärtom._

Id `kodamedai`, adressen `/kodamedai`, övningarnas id börjar med `kmai-`
(AI-kursen använder redan `ai-`). Python, med Python-kursens körning. Förkunskap: grunderna i Python (till och med
funktioner och listor).

## Hur övningarna fungerar

Ingen riktig AI anropas i övningarna – det skulle kosta pengar och ge
olika svar varje gång. I stället får eleven **ett svar från en
AI-assistent** (skrivet av oss, med de fel riktiga assistenter gör) och
ska göra något med det:

- **Granska:** koden ser rätt ut men har ett fel. Hitta och laga det
  (testerna avslöjar om felet är kvar).
- **Testa:** skriv `assert`-tester som fångar felet i AI:ns kod. Testerna
  körs mot både en trasig och en lagad version: de ska underkänna den
  trasiga och godkänna den lagade.
- **Beställa:** skriv en beställning (prompt) till assistenten. Den rättas
  med kontroller av innehållet: nämner den indata, utdata, ett exempel
  och kantfall? Sedan får eleven "svaret" och fortsätter med det.
- **Förstå:** förklara vad koden gör genom att förutsäga utskriften
  (variabler som eleven fyller i).

AI-kursens låtsasmodell kan användas i några övningar om att använda AI
från kod, men tyngdpunkten ligger på eleven som granskare.

## Banorna (förslag)

| # | id | Bana | Lär ut |
| -- | -- | -- | -- |
| 1 | `bestall` | Beställ rätt | tydlig uppgift, exempel på indata och utdata, kantfall, en sak i taget |
| 2 | `las` | Läs koden du får | förutsäga vad koden gör, följa den rad för rad, fråga när något är oklart |
| 3 | `fel` | AI:ns vanliga fel | gränser (`<` mot `<=`), tomma listor, fel typ, påhittade funktioner och bibliotek |
| 4 | `testa` | Testa AI:ns kod | `assert`, testfall för kantfall, test som avslöjar ett fel |
| 5 | `sakerhet` | Säker kod | lösenord i koden, SQL-injektion, lita aldrig på indata, beroenden som inte finns |
| 6 | `refaktor` | Gör om och förbättra | be om mindre ändringar, behålla testerna gröna, läsbar kod |
| 7 | `slutprojekt` | Slutprojektet | bygg ett litet program tillsammans med "assistenten": beställ, granska, testa och laga |

Bana 1–2 gratis.

## Frågor

- Ska en bana handla om AI-verktygen själva (Copilot, Claude Code,
  Cursor) – vad de är och hur man använder dem säkert – med quiz och
  förklaringar i stället för kod?
