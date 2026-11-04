# HTML & CSS Academy – specifikation

En svensk, interaktiv kodskola i HTML och CSS för den som aldrig kodat.
Byggd på Python Academy (`../python från S`), som i sin tur bygger på JS
Academy. Allt som inte är språkspecifikt är kopierat därifrån.

Tänkt ordning för eleven: **HTML/CSS → JS Academy → Python Academy**.

## Mål och målgrupp

- Eleven har **noll erfarenhet** och läser svenska. All text på svenska.
- Eleven skriver riktig HTML och CSS i webbläsaren och ser sidan växa fram
  medan hen skriver. Ingen installation, ingen server.
- Det svåra är sällan _vad_ en tagg eller egenskap är, utan _när_ man tar
  till den. Varje övning och projektsteg säger varför.
- Fel ska kännas okej. HTML kraschar aldrig – webbläsaren gissar i stället
  – så feedbacken måste peka på det som syns fel på sidan.

## Teknik

| Del | Val | Kommentar |
| --- | --- | --- |
| Skal | Vite + React 19, JavaScript | Kopierat från Python Academy |
| Körning | Ingen. Sidan visas i en `<iframe srcdoc>` | Startar direkt, inga nedladdningar |
| Rättning | `runner/checkPage.js` mot iframen, jsdom i testerna | Samma kod på båda ställena |
| Editor | CodeMirror 6 + `@codemirror/lang-html` | Stänger taggar själv, CSS i `<style>` |
| Konton | Supabase (valfritt), tabell `html_progress` | Samma projekt som de andra akademierna |
| Publicering | GitHub Pages via GitHub Actions, `base: /html-academy/` | |

### Förhandsvisning och rättning

- **Förhandsvisningen** (`components/PagePreview.jsx`) uppdateras 300 ms
  efter senaste tangenttrycket. `sandbox="allow-scripts"` utan
  `allow-same-origin`, så att sidan inte kommer åt appen. Knapparna
  💻 Dator och 📱 Mobil byter rutans bredd; mobilen är 375 px, samma som
  testerna med `width: 375`.
- **Rättningen** (`runner/page.js`) laddar sidan i en osynlig iframe med
  `sandbox="allow-same-origin"` (inga skript), läser dokumentet och kör
  testerna. Iframen är 800 × 600 px, så att layouten räknas ut. Ett test
  med `width: 375` rättas i en egen iframe med den bredden, så att
  `@media` slår till.
- I testerna gör `test/nodePage.js` samma sak med jsdom. jsdom räknar
  **inte ut layout** (storlek, placering, flex och grid) och förstår inte
  `@media`. Därför rättar `test/grading.browser.test.js` alla övningar
  och projektsteg i riktig Chrome med vitest browser mode (projektet
  `chrome` i `vite.config.js`, även i GitHub Actions). Övningar som mäter
  layout eller har `width` hoppas över i jsdom (`test/layout.js`).
  Layouthjälparna (`rows`, `perRow`, `gapX`, `gapY`, `widths`,
  `heights`, `rect`, `inOrder`, `fitsScreen`) finns bara i webbläsaren
  och testas i `runner/layout.browser.test.js`. `nodePage.js` rättar
  två saker där jsdom skiljer sig från webbläsaren: `text-align` m.fl.
  ärvs, och elevens `a { color }` vinner över jsdoms egen `:link`.

### Varningar för vanliga misstag

HTML ger inga fel – webbläsaren lagar koden tyst. `runner/htmlWarnings.js`
läser koden själv och varnar, med radnummer, för en tagg som aldrig
stängs, en stängande tagg utan öppnande, taggar som stängs i fel ordning,
taggar som inte finns (`<h7>` – menade du `<h6>`?) och `<img>` utan `alt`.
Varningarna visas i en gul ruta ovanför testraderna, även när testerna går
igenom. Inget facit får ge en varning (`lessons.test.js`).

CSS i `<style>` läses av `runner/cssWarnings.js`: egenskaper som inte
finns (`colour` – menade du `color`?), ett `;` eller `}` som saknas, tal
utan enhet (`width: 300`), färger som inte finns (`röd` – menade du
`red`?), trasiga hexkoder och selektorer som inte hittar något (`.krot`
när sidan har `class="kort"`). Den säger också till när `justify-content`,
`gap`, `flex-direction` eller `grid-template-*` står i en regel vars
selektor aldrig får `display: flex` eller `grid`.

### Bilder och länkar i förhandsvisningen

- Bilderna ligger i `public/bilder/` och skrivs `src="bilder/katt.svg"`.
  En sida i `srcdoc` har appens adress, så sökvägen fungerar både lokalt
  och på GitHub Pages.
- Av samma skäl skulle `href="#recept"` ladda appen i rutan.
  `PagePreview.jsx` lägger till ett litet skript som rullar till målet i
  stället, och öppnar andra länkar i en ny flik (många sidor vägrar visas
  i en ram).
- Formulär skickas inte. Skriptet visar en ruta med det som skulle ha
  skickats (`name = värde`), så att eleven ser vad `name` gör. `required`
  stoppar som vanligt, eftersom rutan har `allow-forms`.
- Webbläsaren skapar `html`, `head` och `body` själv om de saknas, så
  att de står i koden kollas med `sourceChecks` (bana 4).

### En övning

Som i Python Academy. `test.code` är ett JavaScript-uttryck med hjälparna
i `checkPage.js`:

| Hjälpare | Ger |
| --- | --- |
| `text('h1')` | texten i första träffen, mellanslag ihopslagna, eller `null` |
| `texts('li')` | texterna i alla träffar |
| `count('p')` | antal träffar |
| `attr('a', 'href')` | ett attribut, eller `null` |
| `css('h1', 'color')` | det beräknade värdet, t.ex. `rgb(255, 0, 0)` |
| `colorOf('h1')`, `colorOf('h1', 'background-color')` | färgen som namn eller hex: `'tomato'`, `'#1e3a8a'`, `'transparent'` |
| `colorsOf('p')` | färgen på alla träffar |
| `colorName(hover('a', 'color'))` | det som står i en `:hover`-regel som gäller elementet, som färgnamn |
| `px('h1', 'font-size')` | storleken i pixlar som tal (`2rem` → `32`) |
| `font('p')` | första typsnittet: `'verdana'` |
| `boxWidth('.kort')` | hela bredden med padding och kant |
| `centered('.kort')` | står elementet mitt i sin förälder? |
| `$`, `$$`, `doc` | `querySelector`, alla träffar som lista, dokumentet |

```js
{
  id: 'grunder-01', track: 'grunder', title: 'Din första tagg', xp: 10,
  description: '…', explain: '…', example: '<h1>Välkommen!</h1>',
  task: 'Uppgift: Skriv en rubrik med `h1` som säger `Hej, världen!`.',
  starterCode: '<!-- Skriv din kod här -->\n',
  solution: '<h1>Hej, världen!</h1>\n',
  hints: ['vag', 'tydligare', 'nästan lösningen'],
  tests: [{ description: 'Rubriken säger Hej, världen!', code: "text('h1')", expected: 'Hej, världen!' }],
}
```

- Hjälparna ger `null` när elementet saknas, så att eleven får "hittade
  det inte på sidan" i stället för ett JavaScript-fel.
- jsdom ger värdena som eleven skrev dem (`2rem`), webbläsaren pixlar
  (`32px`). Hjälparna för CSS ger samma svar på båda ställena. Använd
  dem i stället för `css()` för färger och storlekar: då spelar det ingen
  roll om eleven skriver `tomato`, `#ff6347` eller `rgb(255, 99, 71)`.
- `boxWidth()` och `centered()` mäter i webbläsaren och räknar från
  stilarna i jsdom.
- Webbläsaren ger `p` och `h1` egen margin, men jsdom gör det inte. Testa
  bara värden som eleven sätter.
- `font-weight` (`bold` mot `700`) och `line-height` utan `px()` skiljer
  sig också. Testa dem inte direkt.
- Innan commit: `chrome-grade.mjs` i scratchpad rättar facit och startkod
  för alla övningar i riktig Chrome med `runPage`.

## Banor

| # | id | Bana | Lär ut |
| --- | --- | --- | --- |
| 1 | `grunder` | Din första webbsida | taggar, `h1`–`h6`, `p`, `strong`, `em`, kommentarer |
| 2 | `lankar` | Länkar och bilder | `a href`, `img src alt`, sökvägar, `target` |
| 3 | `listor` | Listor och tabeller | `ul`, `ol`, `li`, `table`, `tr`, `th`, `td` |
| 4 | `struktur` | Sidans delar | `header`, `nav`, `main`, `section`, `footer`, `div`, `span`, hela dokumentet med `<!doctype>` och `<head>` |
| 5 | `formular` | Formulär | `form`, `label`, `input` (text, e-post, kryssruta), `select`, `button` |
| 6 | `css` | Färg och form med CSS | `<style>`, selektorer, `class`, `id`, `color`, `background`, typsnitt |
| 7 | `boxen` | Boxmodellen | `margin`, `padding`, `border`, `width`, `box-sizing` |
| 8 | `flexbox` | Flexbox | `display: flex`, `gap`, `justify-content`, `align-items` |
| 9 | `grid` | Grid | `grid-template-columns`, `fr`, `gap`, områden |
| 10 | `responsivt` | Mobil och dator | `@media`, `rem`, `%`, `max-width`, bilder som krymper |
| 11 | `slutprojekt` | Slutprojekt: din egen hemsida | allt ovan i ett större projekt |
| 12 | `tailwind` | Bonus: Tailwind | samma sak med klasser: `p-4`, `flex`, `text-xl`, `md:` |

- Varje bana: 9 övningar + en boss, tre projekt, tre idéer, fyra
  quizfrågor och minst två resurser (MDN + YouTube-sökning).
- **Tailwind** är en bonusbana sist, som Streamlit i Python Academy. Den
  förutsätter vanlig CSS: `p-4` är bara `padding: 1rem` i kortform.
  Tekniskt: eleven skriver skriptraden för `@tailwindcss/browser` som på
  riktiga sajter, men skriptet körs aldrig. `runner/tailwind.js` gör
  CSS:en med npm-paketet `tailwindcss` (`compile`, laddas med `import()`
  först i bana 12) och byter raden mot ett `<style>`, både i
  förhandsvisningen och i rättningen. Rättningen kör alltså inga skript,
  och allt fungerar utan nät. Klasser som ser ut som Tailwind men inte
  finns (`bg-whte`) ger en varning. `twColor()` och `twName()` ger
  Tailwinds färgnamn (`sky-600`). Hovern förklarar klasserna
  (`editor/tailwindInfo.js`): `p-4` är `padding: 16px`.
- Ingen JavaScript i den här kursen. Det är JS Academy.

## Kvalitetsregler (som tester)

- Facit klarar sina egna tester. **Startkoden underkänns.**
- Facit använder bara det tidigare banor lärt ut (`test/concepts.js`):
  inga länkar/bilder före bana 2, inga listor före bana 3, inga formulär
  före bana 5, ingen CSS före bana 6, ingen `padding`, `margin`,
  `border`, `width` eller `display` före bana 7, ingen flex, grid eller `@media`
  före sina banor och ingen Tailwind före bana 12. En regel gäller först
  när dess bana finns i `tracks.js`.
- Tre ledtrådar per övning, bossen inga. Bossen är sist i sin bana.
- Tester kontrollerar resultatet på sidan, inte exakt hur koden är skriven.
- Nya övningar i en bana som redan finns får `addedLater: true`.
- Prylarnas emojis får inte upprepas mellan banor och projekt.

## Lärdomar från Python Academy

- Testa i en riktig webbläsare (Playwright mot `npx vite`) innan commit.
  Selektorer: `button:has-text(…)`, inte `text=…`.
- Två syskon i React får aldrig samma `key`.
- Kortkommandon: läs `event.code`, inte tecknet.
- "Ny på det här?" är öppen i de tre första övningarna.
- Föreslå nytt innehåll och låt användaren reagera innan det byggs.

## Etapper

Användaren testar efter varje etapp.

1. ✅ **Skal:** kopia av Python Academy utan Pyodide, förhandsvisning,
   rättning mot iframen och jsdom, bana 1 med tre övningar och en boss.
2. ✅ **Bana 1–2 färdiga** (9 övningar var) och varningar för vanliga
   HTML-misstag.
3. ✅ **Projekt och Lekplatsens idéer** för bana 1–3, och bana 3.
   Projektsteg med fri text testar formen (`h1` som börjar med …), inte
   exakta ord. Inget facit i projekten får ge varningar.
3b. ✅ **Bana 4–5** med projekt, idéer, quiz och resurser. Formulär i
   förhandsvisningen skickas inte – en ruta visar vad som skulle ha
   skickats. Begreppsregel: inga `header`/`nav`/`main` före bana 4.
4. ✅ **Hover** i editorn för taggar, attribut, värden och CSS
   (`editor/codeInfo.js`).
5. ✅ **5a: Bana 6–7** (Färg och form, Boxmodellen) med projekt, idéer,
   quiz och resurser. Varningar för CSS. Hjälpare för CSS som ger samma
   svar i jsdom och Chrome. Namnet blir HTML & CSS Academy (adressen
   `/html-academy/` är kvar).
5b. ✅ **Bana 8–10** (flexbox, grid, responsivt) och layouttesterna i Chrome.
6. ✅ **Slutprojektet** och **Tailwind**.
