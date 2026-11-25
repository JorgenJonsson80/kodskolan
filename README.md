# Kodskolan

**Koda på svenska. Bygg på riktigt.**

Kodskolan är interaktiva kodkurser på svenska för dig som aldrig har
kodat. Du skriver riktig kod direkt i webbläsaren, och koden rättas på en
gång med tester – inget att installera och inget konto behövs för att
börja.

👉 **[kodskolan.nu](https://kodskolan.nu)**

## Så funkar det

- **Riktig kod från första övningen.** Python, SQL och TypeScript körs på
  riktigt i webbläsaren (Pyodide, sql.js och TypeScripts kompilator),
  HTML och CSS visas direkt bredvid koden.
- **Rättas med tester.** Varje övning har tester som säger vad som
  stämmer och vad som saknas. Fastnar du finns ledtrådar, _Visa
  skillnaden_ mot facit och felmeddelanden förklarade på svenska.
- **Banor, bossar och projekt.** Varje kurs är uppdelad i banor med
  ungefär tio korta övningar och en boss på slutet. Till banorna finns
  quiz och projekt där du bygger något eget.
- **Spår och diplom.** Kurserna hänger ihop i spår (Webbutvecklare,
  Backend, Data, Fullstack, AI-utvecklare och Proffsverktygen), och med
  ett konto ger en klar kurs ett diplom med en egen länk att dela.
- **Fackorden som på jobbet.** Det som heter _arrow function_, _Promise_
  eller _branch_ på jobbet heter så i kurserna också – förklarat på
  svenska första gången. Där svenskan är etablerad (funktion, variabel,
  lista, loop) används svenska.
- **För lärare och grupper.** På `/larare` skapar du en klass med en
  kod. Eleverna går med via länken, och du ser hur långt var och en har
  kommit (men aldrig deras kod).

## Kurserna

| Kurs                 | Du lär dig                                                           |
| -------------------- | -------------------------------------------------------------------- |
| Python               | Från första `print` till egna webbappar med Streamlit                |
| HTML & CSS           | Riktiga hemsidor, från första rubrik till Flexbox, Grid och Tailwind |
| JavaScript och React | Gör sidor levande, och bygg appar i React                            |
| SQL                  | Ställ frågor till data, från första `SELECT` till egna databaser     |
| TypeScript           | JavaScript med typer, som hittar felen innan koden körs              |
| Git och terminalen   | Terminalen, Git och GitHub – det alla som kodar använder varje dag   |
| Koda med AI          | Styr AI:n i stället för tvärtom: beställ, granska och testa          |
| Flask                | Egna webb-API:er och sajter i Python                                 |
| Fullstack            | En React-sida i TypeScript ihop med ditt eget Flask-API              |
| FastAPI              | Snabba, moderna API:er i Python                                      |
| AI med Python        | Egna AI-tjänster med språkmodeller: prompter, verktyg och RAG        |
| Dataanalys           | Ta reda på saker med data: pandas, diagram och statistik             |

Tolv kurser och över 1 300 övningar. De första banorna i varje kurs är
gratis.

## Integritet och säkerhet

- Framstegen sparas i webbläsaren. Loggar du in synkas de till ditt
  konto, så att du kan fortsätta på en annan dator.
- Elevens kod körs i en Web Worker eller en sandlåda utan åtkomst till
  sidan, aldrig i appens eget fönster och aldrig på en server.
- Statistiken är anonym och utan cookies. Ingen kod och inga
  mejladresser skickas till den. Mer på [kodskolan.nu/integritet](https://kodskolan.nu/integritet).

## Köra lokalt

Kräver Node 22 eller senare.

```
npm install
npm run dev
```

Inloggning och synk är valfritt: utan nycklar i `.env.local` sparas allt
bara i webbläsaren.

| Kommando                                   | Gör                                                   |
| ------------------------------------------ | ----------------------------------------------------- |
| `npm run dev`                              | Startar utvecklingsservern                            |
| `npx vitest run`                           | Alla tester, även varje övnings facit mot sina tester |
| `npx playwright install chromium`          | Behövs en gång för testerna i riktig Chrome           |
| `npm run lint`, `npx prettier --check src` | Kodstil                                               |
| `npm run build`                            | Bygger sajten till `dist/`                            |

## Teknik

Vite och React 19 (JavaScript), CodeMirror 6 som editor, Pyodide för
Python, sql.js för SQL och TypeScripts egen kompilator för TypeScript.
Supabase sköter inloggning och synkade framsteg. Sajten är statisk och
publiceras på GitHub Pages när något pushas till `main`.

```
src/
  app/        sajten: startsidan, spåren, kontot, diplomen, lärarvyn
  core/       det alla kurser delar: övningen, editorn, quiz, framsteg
  courses/    en mapp per kurs: övningar, projekt, quiz och hur koden körs
supabase/     databasens tabeller och regler
docs/         en SPEC per kurs och checklistor
```

Mer för den som vill bidra:

- [`SPEC.md`](SPEC.md) – planen och kontraktet mellan kärnan och kurserna
- [`CLAUDE.md`](CLAUDE.md) – hur koden hänger ihop
- [`docs/NY-KURS.md`](docs/NY-KURS.md) – checklistan för en ny kurs
- [`docs/kurser/`](docs/kurser/) – varje kurs banor och regler

## Hittat ett fel?

Längst ner i varje övning finns _Något fel i övningen?_, där du
rapporterar direkt. Det går också bra att öppna ett ärende här på GitHub.
