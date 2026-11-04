# Python Academy – specifikation

En svensk, interaktiv kodskola i Python för den som aldrig kodat, byggd på
erfarenheterna från JS / React Academy. Kopiera filen till ett nytt projekt
som `SPEC.md` och låt Claude bygga i etapper enligt slutet av dokumentet.

## Mål och målgrupp

- Eleven har **noll erfarenhet** och läser svenska. All text på svenska.
- Eleven skriver riktig Python i webbläsaren och får direkt besked från
  tester. Ingen installation, ingen server.
- Det svåra för nybörjare är sällan *vad* något är utan *när* man tar till
  det. Varje övning och projektsteg förklarar varför just det här valet.
- Fel ska kännas okej: förklara felmeddelanden på svenska och peppa.

## Teknik

| Del | Val | Kommentar |
|---|---|---|
| Skal | Vite + React 19, JavaScript | Samma som JS Academy, så komponenter kan återanvändas |
| Python | **Pyodide** (CPython i WebAssembly) i en Web Worker | Laddas från jsDelivr. Cirka 10 MB första gången, sedan cachat |
| Data | **pandas** via `pyodide.loadPackage` | Laddas först när en övning i databanan behöver det, inte vid start |
| Editor | CodeMirror 6 + `@codemirror/lang-python` | |
| Formatering | Ruff kompilerat till WebAssembly, eller Black i Pyodide | Undersök vad som är minst och snabbast |
| Konton | Supabase (valfritt), annars localStorage | Samma tabeller som JS Academy |
| Publicering | GitHub Pages via GitHub Actions | |

### Att köra Python säkert

- Pyodide tar några sekunder att starta. Håll **en varm worker** igång och
  visa "Startar Python…" första gången, i stället för en ny worker per
  körning som i JS Academy.
- **Oändliga loopar:** Pyodides avbrottsbuffert kräver SharedArrayBuffer,
  som GitHub Pages inte tillåter utan extra headers. Enklast: timeout på
  2–3 s, sedan `worker.terminate()` och starta en ny worker i bakgrunden.
- Kör elevens kod i ett eget namespace (`dict`) per körning, så att inget
  läcker mellan körningar.
- `print` fångas genom att byta `sys.stdout`. `input()` ersätts med en
  funktion som läser från en lista som testet eller Lekplatsen ger, så att
  övningar med `input()` går att rätta.
- Kontrollera syntaxen med `compile()` innan koden körs, så att syntaxfel
  får ett eget, tydligt besked.

### Rättning

Samma upplägg som JS Academy:

```js
{
  id: 'loops-03', track: 'loops', title: '…', xp: 10,
  description: '…', explain: '…', example: '…',
  task: 'Uppgift: …',              // `backticks` visas som kod
  starterCode: '# Skriv din kod här',
  solution: '…',
  hints: ['vag', 'tydligare', 'nästan lösningen'],
  tests: [
    { description: '…', code: 'summa([1, 2, 3])', expected: 6 },
    { description: '…', code: '__output', expected: ['Hej!'] },
  ],
  inputs: ['Ada'],                  // vad input() returnerar, vid behov
  sourceChecks: [{ description: '…', pattern: /\bfor\b/ }],
}
```

- Testuttrycket körs i samma namespace som elevens kod, och resultatet
  jämförs i Python (`==`). Skicka tillbaka både resultatet och `repr()`
  för visning.
- `__output` är raderna som `print` skrev ut.
- Visa testraderna i klartext: *"utskriften blev `Hej` men skulle vara
  `Hej!`"*, inte som Python-listor.
- Jämför aldrig hela objekt eller DataFrames i testerna. Testa ett värde
  som går att läsa, t.ex. `df['volym'].sum()` eller `len(df)`.

## Funktioner att ta med från start

Det här tog många omgångar att få till i JS Academy. Bygg in det direkt.

1. **Kör rad för rad.** I Python är det enklare än i JavaScript:
   `sys.settrace` ger ett anrop per rad med `frame.f_lineno` och
   `frame.f_locals`. Spara bara rader i elevens fil (sätt filnamnet till
   t.ex. `<elev>` i `compile`). Gör om värdena till `repr()` direkt, så att
   listor som ändras senare inte ändrar gamla steg. Stoppa efter 300 steg.
   Består koden bara av funktioner: anropa dem med det första testets
   uttryck och visa vad de returnerade.
2. **Hover** som säger vad något är och vad det tillhör: variabel (var den
   skapas), parameter (till vilken funktion), metod (`append` hör till
   listor, `upper` till strängar), nyckel i en dictionary och nyckelord
   (`for`, `def`, `return` – med *när* man använder dem).
3. **Förslag** på egna variabler och funktioner, och på metoder efter en
   punkt när det syns vad variabeln innehåller.
4. **Felmeddelanden på svenska.** Det viktigaste för nybörjare i Python:
   - `IndentationError` – *"Raderna i ett block måste ha samma indrag"*
   - `SyntaxError` med `expected ':'` – *"Det saknas ett kolon efter if,
     for, while eller def"*
   - `NameError` – felstavat, glömt att skapa, eller text utan citattecken
   - `TypeError: can only concatenate str` – *"Du försöker sätta ihop text
     och tal. Använd str(tal) eller en f-sträng"*
   - `IndexError`, `KeyError`, `ZeroDivisionError`, `AttributeError`
   - Python 3.11+ ger egna "Did you mean …?"-förslag. Översätt dem.
5. **Fastnat?-panel:** tips för att bryta ner koden (print, kommentera bort
   med Cmd+/, rad för rad, gummianka), en knapp som kopierar koden till
   Lekplatsen, och länkar per ämne (svenska källor om de finns, annars
   docs.python.org/3/tutorial och YouTube-*sökningar* – aldrig enskilda
   videor, de försvinner).
   - **Fråga en AI:** en knapp som kopierar en färdig fråga att klistra in
     hos valfri AI. Frågan innehåller övningen, uppgiften, elevens kod och
     vad som hände (fel, underkända tester, utskrift). AI:n ombeds vara
     handledare: förklara på enkel svenska, ge en ledtråd i taget, **inte**
     ge lösningen, och bara använda banorna eleven klarat hittills. Bygg
     frågan i en egen funktion med tester (`aiPrompt.js` i JS Academy).
6. **Visa skillnaden:** under varje underkänt test med utskrift, text,
   lista eller dict finns knappen *🔍 Visa skillnaden*. Den är stängd från
   början (att hitta felet själv är också träning). Öppnad visar den
   *Du fick* och *Rätt* under varandra med det som skiljer markerat: rött
   hos eleven, grönt i det rätta. Ett mellanslag som skiljer visas som ␣.
   Utskriften jämförs rad för rad med längsta gemensamma delföljd, så att
   en saknad rad i mitten bara markerar den raden och inte alla efter.
   Rader som blir över jämförs tecken för tecken. Visas inte för rena tal
   (20 mot 25 syns ändå) eller när koden kraschade.
7. **Lekplats:** fri editor med `input()`-ruta och konsol, och tre egna
   idéer per bana som låses upp när banans projekt är klara.
8. **Projekt** efter varje bana: välj ett av tre, 3–4 steg där koden följer
   med, med eller utan ledtrådar (+50 % XP utan). Svårare för varje bana.
9. **Kort välkomst** (tre steg, resten bakom "Fler tips"), figur som växer
   en ålder per klar bana och peppar, nivåtest för att hoppa fram.
10. **Boss och Testa dig förbi:** varje bana slutar med en boss, en större
    uppgift utan ledtrådar. *Testa dig på banan* (quiz + boss) låter den
    som redan kan hoppa över banan.
11. **Hylla med belöningar:** varje klar bana ger ett föremål, varje
    projekt ett pris. ⚡ visar att banan klarades genom att testa sig förbi.
12. **Jämför med facit:** när svaret är rätt men märkbart längre än facit
    (mer än 30 % och minst 15 tecken, utan blanksteg och kommentarer) visas
    facit med *"Din lösning fungerar! Den går att skriva kortare."*
13. **Konton:** inloggning med Supabase så att framstegen följer med till
    andra enheter. Utan nycklar sparas allt i localStorage.

## Banor (förslag)

| # | Bana | Innehåll | Lärs ut här |
|---|---|---|---|
| 1 | Grunderna i Python | print, variabler, tal och text, input, if/elif/else | `print`, `input`, `if` |
| 2 | Loopar | for med range, while, break | `for`, `range`, `while` |
| 3 | Listor | skapa, index, append, len, loopa över listor | listmetoder |
| 4 | Funktioner | def, parametrar, return, standardvärden | `def`, `return` |
| 5 | Strängar | metoder, f-strängar, split/join, slicing | f-strängar, slicing |
| 6 | Dictionaries och tupler | nycklar, värden, loopa med items() | `dict`, `.items()` |
| 7 | Smidigare Python | list comprehensions, enumerate, zip, sorted med key | comprehensions, `lambda` |
| 8 | Fel och undantag | try/except, raise, egna felmeddelanden | `try`, `raise` |
| 9 | Moduler | import, random, math, datetime | `import` |
| 10 | Klasser | class, \_\_init\_\_, metoder, self | `class` |
| 11 | Felsökning | läsa tracebacks, hitta buggar i andras kod | – |
| 12 | Data med pandas | läsa CSV/Excel, välja kolumner, filtrera, gruppera, summera, sortera | `pandas`, `DataFrame`, `groupby` |
| 13 | Slutprojekt | textäventyr, frågesport eller en egen dataanalys | allt |

### Varför pandas och inte Django

Python har ingen motsvarighet till React. React bygger det man ser i
webbläsaren, och där körs JavaScript. Django och Flask motsvarar snarare
en Node/Express-server. De kräver en server som är igång och går inte att
köra och rätta i webbläsaren som övningarna här. pandas fungerar i Pyodide
och är det man faktiskt använder Python till i vardagen: läsa en
Excel-fil, räkna och jämföra. Därför blir pandas Python-versionens
"React-bana", alltså det verkliga verktyget i slutet.

Bana 12 i korthet:

- Varför en tabell (DataFrame) och inte listor med dictionaries, och när
  listor räcker.
- Exempeldata från vardagen, t.ex. lagerdata med varunummer, lagerplats
  och plock per månad. Rättningen testar enstaka värden.
- Sista övningarna: ABC-klassning (kumulativ andel) och variation per
  vara, så att eleven bygger en riktig analys med det banan lärt ut.
- Projekt: läs in en egen fil på Lekplatsen (filuppladdning som skickas
  till workern) och gör en egen sammanställning.
- **Streamlit** (en enkel app med knappar och diagram i Python) är ett
  möjligt sista projekt. Undersök stlite, som kör Streamlit i Pyodide,
  innan det byggs. Fungerar det inte så får projektet köras på datorn och
  rättas inte.

Kolumnen *Lärs ut här* används av kvalitetstestet nedan: facit får inte
använda något före sin bana.

## Kvalitetsregler (som tester från dag ett)

Gör dem till automatiska tester, som `quality.test.js` i JS Academy:

- Facit klarar sina egna tester. **Startkoden underkänns.**
- Facit använder bara begrepp från tidigare banor (t.ex. ingen list
  comprehension före bana 7, ingen f-sträng före bana 5).
- Facit är formaterat med samma formaterare som editorn använder.
- Facit går att köra rad för rad utan fel.
- Varje projektsteg har `why`. Varje bana med projekt har tre idéer och
  resurser.
- Tre ledtrådar per övning, från vag till nästan lösningen.
- Testerna har ett vanligt anrop som `summa([1, 2, 3])`, så att Kör rad
  för rad kan visa funktioner som bara definieras.
- Nya övningar i en bana som redan finns får `addedLater: true`, så att
  den som redan klarat banan inte förlorar den.
- Tester kontrollerar resultatet, inte exakt hur koden är skriven.

## Lärdomar från JS Academy

- **Testa i en riktig webbläsare** (Playwright) innan commit, inte bara
  enhetstester. Flera buggar syntes bara där.
- Två syskon i React får aldrig samma `key` – har orsakat buggar två gånger.
- Kortkommandon: läs `event.code`, inte tecknet (⌥⇧F blir ett
  specialtecken på Mac).
- Stiltips (som PEP 8) stressar på dag ett. Vänta till efter första banan.
- "Ny på det här?"-förklaringen ska vara öppen i de första övningarna, annars
  hittar nybörjare den inte.
- Banornas namn på svenska. Blandat språk gör det läskigare för nybörjare.
- Facit med slarvig indentering förvirrar – i Python är indrag dessutom
  syntax, så det är ännu viktigare här.
- Föreslå nytt innehåll och låt användaren reagera innan det byggs.
- Ett missat mellanslag eller en felaktig bokstav i utskriften är det som
  frustrerar mest. Därför finns *Visa skillnaden* (se ovan).
- Elevens kod får aldrig röra appens riktiga data. Låtsasversioner av
  filer och nätverk, så som `fakes.js` gör för localStorage och fetch.
- localStorage-läsningar ligger i try/catch och tål skräpdata.
- Playwright-selektorer som `text=Kolla lösning` kan träffa
  uppgiftstexten. Använd `button:has-text(…)`.
- Hjälpdialogen öppnas vid första besöket. Stäng den i testerna och håll
  den uppdaterad när funktioner läggs till.

## Etapper

Bygg i den här ordningen och låt användaren testa efter varje etapp:

1. **Skal och körning:** Vite-projekt, Pyodide i worker med timeout och
   omstart, editor, en övning som rättas. Publicering på GitHub Pages.
2. **Bana 1–2** med övningar, ledtrådar, XP, progress i localStorage,
   välkomst och svenska felförklaringar.
3. **Kör rad för rad** och hover.
4. **Bana 3–6** med projekt, Lekplats, idéer, Fastnat?-panel med
   AI-fråga och Visa skillnaden.
5. **Kvalitetstester** körs på allt innehåll.
6. **Bana 7–11**, boss, Testa dig förbi, hyllan, nivåtest och konton med
   Supabase.
7. **Bana 12 (pandas)** och slutprojektet. Undersök stlite för Streamlit.
