// En boss per bana: en större uppgift som använder allt från banan, utan
// ledtrådar. Banan räknas inte som klar förrän bossen är besegrad.
// index.js lägger varje boss sist i sin bana.

const TW =
  '<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>';
const BOSS_INTRO = 'Bossen har inga ledtrådar – visa vad du kan! ';

export const BOSSES = {
  grunder: {
    id: 'grunder-boss',
    track: 'grunder',
    title: 'Boss: Presentationen',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Här behöver du allt från banan: rubriker i två storlekar, stycken och taggar inuti taggar.',
    task: `Uppgift: Bygg en presentation av Ada Lovelace, världens första programmerare.
  1. Överst rubriken \`Ada Lovelace\` med \`h1\`.
  2. Sedan rubriken \`Om mig\` med \`h2\`, och direkt under den ett stycke som innehåller ordet \`programmerare\` i \`strong\`.
  3. Sist rubriken \`Mina intressen\` med \`h2\`, och direkt under den ett stycke där ordet \`matematik\` står i \`em\`.`,
    starterCode: '<!-- Skriv din kod här -->\n',
    solution: `<h1>Ada Lovelace</h1>
<h2>Om mig</h2>
<p>Jag var världens första <strong>programmerare</strong>.</p>
<h2>Mina intressen</h2>
<p>Jag älskar <em>matematik</em> och maskiner.</p>
`,
    hints: [],
    tests: [
      {
        description: 'h1 säger Ada Lovelace',
        code: "text('h1')",
        expected: 'Ada Lovelace',
      },
      {
        description: 'Två h2 i rätt ordning',
        code: "texts('h2')",
        expected: ['Om mig', 'Mina intressen'],
      },
      {
        description: 'Två stycken',
        code: "count('p')",
        expected: 2,
      },
      {
        description: 'Under Om mig står programmerare i strong',
        code: "$('h2')?.nextElementSibling?.querySelector('strong')?.textContent ?? null",
        expected: 'programmerare',
      },
      {
        description: 'Under Mina intressen står matematik i em',
        code: "$$('h2')[1]?.nextElementSibling?.querySelector('em')?.textContent ?? null",
        expected: 'matematik',
      },
    ],
  },
  lankar: {
    id: 'lankar-boss',
    track: 'lankar',
    title: 'Boss: Receptkortet',
    isBoss: true,
    xp: 50,
    description:
      BOSS_INTRO +
      'Ett receptkort med bild, en länk som hoppar ner på sidan och en länk till källan.',
    task: `Uppgift: Bygg ett receptkort för pannkakor.
  1. Överst rubriken \`Pannkakor\` med \`h1\`.
  2. Under den en länk med texten \`Till receptet\` som hoppar ner till rubriken i punkt 4.
  3. Bilden \`bilder/pannkakor.svg\`, 300 pixlar bred, med en alt-text som beskriver den.
  4. Rubriken \`Gör så här\` med \`h2\` och ett stycke om hur man gör.
  5. Sist ett stycke med länken \`Källa\` till \`https://sv.wikipedia.org/wiki/Pannkaka\`, som öppnas i en ny flik.`,
    starterCode: '<!-- Skriv din kod här -->\n',
    solution: `<h1>Pannkakor</h1>
<p><a href="#gor-sa-har">Till receptet</a></p>
<img src="bilder/pannkakor.svg" alt="En hög pannkakor med sylt" width="300">
<h2 id="gor-sa-har">Gör så här</h2>
<p>Vispa mjöl, mjölk och ägg. Stek tunna pannkakor i smör.</p>
<p><a href="https://sv.wikipedia.org/wiki/Pannkaka" target="_blank">Källa</a></p>
`,
    hints: [],
    tests: [
      {
        description: 'h1 säger Pannkakor',
        code: "text('h1')",
        expected: 'Pannkakor',
      },
      {
        description: 'Till receptet hoppar till rubriken Gör så här',
        code: "(() => { const link = $$('a').find(a => a.textContent.trim() === 'Till receptet'); const href = link?.getAttribute('href') ?? ''; return href.startsWith('#') ? doc.getElementById(href.slice(1))?.textContent.trim() ?? null : null; })()",
        expected: 'Gör så här',
      },
      {
        description: 'Bilden är bilder/pannkakor.svg, 300 pixlar bred',
        code: "[attr('img', 'src'), attr('img', 'width')]",
        expected: ['bilder/pannkakor.svg', '300'],
      },
      {
        description: 'Bilden har en alt-text som inte är tom',
        code: "attr('img', 'alt') === null ? null : attr('img', 'alt').trim() !== ''",
        expected: true,
      },
      {
        description: 'Rubriken Gör så här har ett stycke under sig',
        code: "$$('h2').find(h => h.textContent.trim() === 'Gör så här')?.nextElementSibling?.tagName ?? null",
        expected: 'P',
      },
      {
        description: 'Källa går till Wikipedia och öppnas i ny flik',
        code: "(() => { const link = $$('a').find(a => a.textContent.trim() === 'Källa'); return link ? [link.getAttribute('href'), link.getAttribute('target')] : null; })()",
        expected: ['https://sv.wikipedia.org/wiki/Pannkaka', '_blank'],
      },
    ],
  },
  listor: {
    id: 'listor-boss',
    track: 'listor',
    title: 'Boss: Veckomenyn',
    isBoss: true,
    xp: 50,
    description:
      BOSS_INTRO +
      'En matsedel med en tabell, en punktlista och en numrerad lista.',
    task: `Uppgift: Bygg skolans veckomeny.
  1. Överst rubriken \`Veckomenyn\` med \`h1\`.
  2. En tabell med rubriken \`Lunch\` (\`caption\`). I \`thead\` rubrikraden \`Dag\`, \`Rätt\` och \`Pris\`. I \`tbody\` tre rader: \`Måndag\` \`Pannkakor\` \`45 kr\`, \`Tisdag\` \`Fiskpinnar\` \`55 kr\` och \`Onsdag\` \`Soppa\` \`40 kr\`.
  3. Rubriken \`Handla\` med \`h2\` och direkt under den en punktlista med minst tre saker.
  4. Rubriken \`Pannkakor så här\` med \`h2\` och direkt under den en numrerad lista med tre steg.`,
    starterCode: '<!-- Skriv din kod här -->\n',
    solution: `<h1>Veckomenyn</h1>
<table>
  <caption>Lunch</caption>
  <thead>
    <tr><th>Dag</th><th>Rätt</th><th>Pris</th></tr>
  </thead>
  <tbody>
    <tr><td>Måndag</td><td>Pannkakor</td><td>45 kr</td></tr>
    <tr><td>Tisdag</td><td>Fiskpinnar</td><td>55 kr</td></tr>
    <tr><td>Onsdag</td><td>Soppa</td><td>40 kr</td></tr>
  </tbody>
</table>
<h2>Handla</h2>
<ul>
  <li>Mjöl</li>
  <li>Mjölk</li>
  <li>Ägg</li>
</ul>
<h2>Pannkakor så här</h2>
<ol>
  <li>Vispa ihop mjöl, mjölk och ägg</li>
  <li>Stek i smör</li>
  <li>Ät med sylt</li>
</ol>
`,
    hints: [],
    tests: [
      {
        description: 'h1 säger Veckomenyn',
        code: "text('h1')",
        expected: 'Veckomenyn',
      },
      {
        description: 'Tabellen heter Lunch',
        code: "text('table caption')",
        expected: 'Lunch',
      },
      {
        description: 'Rubrikraden i thead: Dag, Rätt och Pris',
        code: "texts('thead th')",
        expected: ['Dag', 'Rätt', 'Pris'],
      },
      {
        description: 'Tre rader i tbody med rätt celler',
        code: "$$('tbody tr').map(tr => [...tr.children].map(cell => cell.textContent.trim()))",
        expected: [
          ['Måndag', 'Pannkakor', '45 kr'],
          ['Tisdag', 'Fiskpinnar', '55 kr'],
          ['Onsdag', 'Soppa', '40 kr'],
        ],
      },
      {
        description: 'Under Handla: en punktlista med minst tre saker',
        code: "(() => { const list = $$('h2').find(h => h.textContent.trim() === 'Handla')?.nextElementSibling; return list ? [list.tagName, list.children.length >= 3] : null; })()",
        expected: ['UL', true],
      },
      {
        description: 'Under Pannkakor så här: en numrerad lista med tre steg',
        code: "(() => { const list = $$('h2').find(h => h.textContent.trim() === 'Pannkakor så här')?.nextElementSibling; return list ? [list.tagName, list.children.length] : null; })()",
        expected: ['OL', 3],
      },
    ],
  },
  struktur: {
    id: 'struktur-boss',
    track: 'struktur',
    title: 'Boss: Klubbsidan',
    isBoss: true,
    xp: 60,
    description:
      BOSS_INTRO +
      'En hel sida från första till sista raden, med alla delar på rätt plats.',
    task: `Uppgift: Bygg sidan för schackklubben, som ett helt dokument.
  1. \`<!doctype html>\`, \`html\` med svenska som språk, och i \`head\` \`<meta charset="utf-8">\` och titeln \`Schackklubben\`.
  2. En \`header\` med rubriken \`Schackklubben\` (\`h1\`) och en \`nav\` med tre länkar som hoppar till avsnitten i punkt 3.
  3. En \`main\` med tre \`section\`: \`Om klubben\`, \`Träningar\` och \`Bli medlem\`, var och en med \`h2\` och ett \`id\`.
  4. En \`footer\` med en länk som mejlar till \`schack@example.com\`.`,
    starterCode: '<!-- Skriv din kod här -->\n',
    solution: `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8">
    <title>Schackklubben</title>
  </head>
  <body>
    <header>
      <h1>Schackklubben</h1>
      <nav>
        <ul>
          <li><a href="#om">Om klubben</a></li>
          <li><a href="#traningar">Träningar</a></li>
          <li><a href="#medlem">Bli medlem</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <section id="om">
        <h2>Om klubben</h2>
        <p>Vi spelar schack för alla åldrar, nybörjare som proffs.</p>
      </section>
      <section id="traningar">
        <h2>Träningar</h2>
        <p>Tisdagar och torsdagar klockan 18 i biblioteket.</p>
      </section>
      <section id="medlem">
        <h2>Bli medlem</h2>
        <p>Kom på en träning, så fixar vi resten.</p>
      </section>
    </main>
    <footer>
      <p><a href="mailto:schack@example.com">Mejla oss</a></p>
    </footer>
  </body>
</html>
`,
    hints: [],
    tests: [
      {
        description: 'Ett helt dokument på svenska',
        code: "[doc.doctype?.name ?? null, doc.documentElement.getAttribute('lang')]",
        expected: ['html', 'sv'],
      },
      {
        description: 'utf-8 och titeln Schackklubben i head',
        code: "[attr('head meta[charset]', 'charset')?.toLowerCase() ?? null, text('head title')]",
        expected: ['utf-8', 'Schackklubben'],
      },
      {
        description: 'Rubriken och menyn står i header',
        code: "[text('header h1'), count('header nav a')]",
        expected: ['Schackklubben', 3],
      },
      {
        description: 'Tre avsnitt i main',
        code: "texts('main > section > h2')",
        expected: ['Om klubben', 'Träningar', 'Bli medlem'],
      },
      {
        description: 'Menyns länkar hoppar till avsnitten, i ordning',
        code: "$$('nav a').map(a => doc.getElementById((a.getAttribute('href') ?? '').slice(1))?.querySelector('h2')?.textContent.trim() ?? null)",
        expected: ['Om klubben', 'Träningar', 'Bli medlem'],
      },
      {
        description: 'Sidfoten mejlar till schack@example.com',
        code: "attr('footer a', 'href')",
        expected: 'mailto:schack@example.com',
      },
    ],
    sourceChecks: [
      { description: 'Koden har <head>', pattern: /<head[\s>]/i },
      { description: 'Koden har <body>', pattern: /<body[\s>]/i },
    ],
  },
  formular: {
    id: 'formular-boss',
    track: 'formular',
    title: 'Boss: Anmälan till lägret',
    isBoss: true,
    xp: 60,
    description:
      BOSS_INTRO +
      'Ett anmälningsformulär med alla sorters fält – och alla med etikett.',
    task: `Uppgift: Bygg anmälan till sommarlägret i en \`form\`. Alla fält ska ha en etikett och ett \`name\`.
  1. \`Namn\` (text) och \`E-post\` (email), som båda måste fyllas i.
  2. \`Ålder\` som ett fält för siffror.
  3. En meny för vecka med \`Vecka 26\`, \`Vecka 27\` och \`Vecka 28\`.
  4. Tre radioknappar i samma grupp för boende: \`Tält\`, \`Stuga\` och \`Hemma\`.
  5. Ett stort textfält för \`Allergier\`.
  6. En knapp som säger \`Anmäl mig\`.`,
    starterCode: '<!-- Skriv din kod här -->\n',
    solution: `<form>
  <label for="namn">Namn *</label>
  <input type="text" id="namn" name="namn" required>
  <label for="epost">E-post *</label>
  <input type="email" id="epost" name="epost" required>
  <label for="alder">Ålder</label>
  <input type="number" id="alder" name="alder">
  <label for="vecka">Vecka</label>
  <select id="vecka" name="vecka">
    <option value="26">Vecka 26</option>
    <option value="27">Vecka 27</option>
    <option value="28">Vecka 28</option>
  </select>
  <p>Boende</p>
  <label><input type="radio" name="boende" value="talt"> Tält</label>
  <label><input type="radio" name="boende" value="stuga"> Stuga</label>
  <label><input type="radio" name="boende" value="hemma"> Hemma</label>
  <label for="allergier">Allergier</label>
  <textarea id="allergier" name="allergier" rows="3"></textarea>
  <button>Anmäl mig</button>
</form>
`,
    hints: [],
    tests: [
      {
        description: 'Alla fält ligger i formuläret',
        code: "count('form input, form select, form textarea')",
        expected: 8,
      },
      {
        description: 'Alla fält har en etikett',
        code: "$$('input, select, textarea').every(field => field.labels?.length > 0)",
        expected: true,
      },
      {
        description: 'Alla fält har ett name',
        code: "$$('input, select, textarea').every(field => field.name !== '')",
        expected: true,
      },
      {
        description: 'Text, e-post och siffror först',
        code: "$$('input').slice(0, 3).map(input => input.type)",
        expected: ['text', 'email', 'number'],
      },
      {
        description: 'Namn och e-post måste fyllas i',
        code: "$$('input').slice(0, 2).map(input => input.required)",
        expected: [true, true],
      },
      {
        description: 'Menyn har vecka 26–28',
        code: "texts('select option')",
        expected: ['Vecka 26', 'Vecka 27', 'Vecka 28'],
      },
      {
        description: 'Tre radioknappar i samma grupp',
        code: "(() => { const radios = $$('input[type=radio]'); return radios.length === 3 ? new Set(radios.map(r => r.name)).size : radios.length; })()",
        expected: 1,
      },
      {
        description: 'Radioknapparna heter Tält, Stuga och Hemma',
        code: "$$('input[type=radio]').map(input => input.labels?.[0]?.textContent.trim() ?? null)",
        expected: ['Tält', 'Stuga', 'Hemma'],
      },
      {
        description: 'Ett textarea för Allergier och knappen Anmäl mig',
        code: "[$('textarea')?.labels?.[0]?.textContent.trim() ?? null, text('form button')]",
        expected: ['Allergier', 'Anmäl mig'],
      },
    ],
  },
  css: {
    id: 'css-boss',
    track: 'css',
    title: 'Boss: Visitkortet',
    isBoss: true,
    xp: 50,
    description:
      BOSS_INTRO +
      'Ett visitkort med egna färger och typsnitt, en klass för titeln och en länk som ändrar färg.',
    task: `Uppgift: Bygg ett visitkort som en hel sida, med \`<style>\` i \`head\`.
  1. Hela sidan har bakgrunden \`whitesmoke\` och typsnittet \`Arial, sans-serif\`.
  2. I \`body\` står ett \`div\` med klassen \`kort\`. Kortet har bakgrunden \`white\` och all text i mitten.
  3. I kortet står ditt namn i en \`h1\`: färgen \`midnightblue\`, typsnittet \`Georgia, serif\` och storleken \`2.5rem\`.
  4. Under namnet ett stycke med klassen \`titel\` som säger vad du gör. Färgen \`gray\` och storleken \`1.25rem\`.
  5. Sist en e-postlänk (\`mailto:\`) som blir \`crimson\` när musen är över.`,
    starterCode: '<!-- Skriv din kod här -->\n',
    solution: `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8">
    <title>Visitkort</title>
    <style>
      body {
        background-color: whitesmoke;
        font-family: Arial, sans-serif;
      }
      .kort {
        background-color: white;
        text-align: center;
      }
      h1 {
        color: midnightblue;
        font-family: Georgia, serif;
        font-size: 2.5rem;
      }
      .titel {
        color: gray;
        font-size: 1.25rem;
      }
      a:hover { color: crimson; }
    </style>
  </head>
  <body>
    <div class="kort">
      <h1>Ada Lovelace</h1>
      <p class="titel">Programmerare</p>
      <p><a href="mailto:ada@exempel.se">ada@exempel.se</a></p>
    </div>
  </body>
</html>
`,
    hints: [],
    tests: [
      {
        description: 'Sidan har bakgrunden whitesmoke',
        code: "colorOf('body', 'background-color')",
        expected: 'whitesmoke',
      },
      {
        description: 'Titeln har ärvt typsnittet Arial',
        code: "font('.kort .titel')",
        expected: 'arial',
      },
      {
        description: 'Kortet har vit bakgrund och texten i mitten',
        code: "[colorOf('.kort', 'background-color'), css('.kort', 'text-align')]",
        expected: ['white', 'center'],
      },
      {
        description: 'Namnet är midnightblue, Georgia och 2.5rem (40px)',
        code: "[colorOf('.kort h1'), font('.kort h1'), px('.kort h1', 'font-size')]",
        expected: ['midnightblue', 'georgia', 40],
      },
      {
        description: 'Titeln är gray och 1.25rem (20px)',
        code: "[colorOf('.kort .titel'), px('.kort .titel', 'font-size')]",
        expected: ['gray', 20],
      },
      {
        description: 'Kortet har en e-postlänk',
        code: "attr('.kort a', 'href')?.startsWith('mailto:') ?? null",
        expected: true,
      },
      {
        description: 'Länken blir crimson när musen är över',
        code: "colorName(hover('.kort a', 'color'))",
        expected: 'crimson',
      },
    ],
  },
  boxen: {
    id: 'boxen-boss',
    track: 'boxen',
    title: 'Boss: Produktkortet',
    isBoss: true,
    xp: 60,
    description:
      BOSS_INTRO +
      'Ett produktkort som i en webbutik: rätt bredd, mitt på sidan, med kant, runda hörn och en knapp.',
    task: `Uppgift: Bygg ett produktkort för pannkakor, som en hel sida.
  1. Ett \`div\` med klassen \`produkt\` med bilden \`bilder/pannkakor.svg\`, rubriken \`Pannkakor\` i en \`h2\`, ett stycke med klassen \`pris\` och en länk med klassen \`knapp\`.
  2. Kortet är exakt \`320px\` brett med padding och kant, och står mitt på sidan.
  3. Kortet har \`24px\` padding, kanten \`1px solid lightgray\`, hörnen \`16px\` och vit bakgrund.
  4. Bilden får aldrig bli bredare än kortet: \`max-width: 100%\`.
  5. Knappen är \`inline-block\` med padding \`12px 24px\`, bakgrunden \`seagreen\` och vit text. När musen är över blir bakgrunden \`darkgreen\`.`,
    starterCode: '<!-- Skriv din kod här -->\n',
    solution: `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8">
    <title>Pannkakor</title>
    <style>
      body {
        background-color: whitesmoke;
        font-family: Arial, sans-serif;
      }
      .produkt {
        box-sizing: border-box;
        width: 320px;
        margin: 40px auto;
        padding: 24px;
        background-color: white;
        border: 1px solid lightgray;
        border-radius: 16px;
      }
      .produkt img {
        max-width: 100%;
        border-radius: 8px;
      }
      .pris {
        color: seagreen;
        font-size: 1.5rem;
      }
      .knapp {
        display: inline-block;
        padding: 12px 24px;
        background-color: seagreen;
        color: white;
        border-radius: 8px;
        text-decoration: none;
      }
      .knapp:hover { background-color: darkgreen; }
    </style>
  </head>
  <body>
    <div class="produkt">
      <img src="bilder/pannkakor.svg" alt="En hög pannkakor med sylt">
      <h2>Pannkakor</h2>
      <p class="pris">49 kr</p>
      <a class="knapp" href="#">Köp nu</a>
    </div>
  </body>
</html>
`,
    hints: [],
    tests: [
      {
        description: 'Kortet har bild, rubrik, pris och knapp',
        code: "[count('.produkt img'), text('.produkt h2'), count('.produkt .pris'), count('.produkt a.knapp')]",
        expected: [1, 'Pannkakor', 1, 1],
      },
      {
        description: 'Kortet är 320px brett med padding och kant',
        code: "boxWidth('.produkt')",
        expected: 320,
      },
      {
        description: 'Kortet står mitt på sidan',
        code: "centered('.produkt')",
        expected: true,
      },
      {
        description:
          'Kortet har 24px padding, 1px lightgray kant och 16px hörn',
        code: "[px('.produkt', 'padding-top'), px('.produkt', 'border-top-width'), colorOf('.produkt', 'border-top-color'), css('.produkt', 'border-radius')]",
        expected: [24, 1, 'lightgray', '16px'],
      },
      {
        description: 'Kortet har vit bakgrund',
        code: "colorOf('.produkt', 'background-color')",
        expected: 'white',
      },
      {
        description: 'Bilden blir aldrig bredare än kortet',
        code: "css('.produkt img', 'max-width')",
        expected: '100%',
      },
      {
        description: 'Knappen är inline-block med padding 12px 24px',
        code: "[css('.knapp', 'display'), px('.knapp', 'padding-top'), px('.knapp', 'padding-left')]",
        expected: ['inline-block', 12, 24],
      },
      {
        description: 'Knappen är seagreen med vit text',
        code: "[colorOf('.knapp', 'background-color'), colorOf('.knapp')]",
        expected: ['seagreen', 'white'],
      },
      {
        description: 'Knappen blir darkgreen när musen är över',
        code: "colorName(hover('.knapp', 'background-color'))",
        expected: 'darkgreen',
      },
    ],
  },
  flexbox: {
    id: 'flexbox-boss',
    track: 'flexbox',
    title: 'Boss: Sidhuvudet',
    isBoss: true,
    xp: 60,
    description:
      BOSS_INTRO +
      'Ett sidhuvud som på en riktig sajt: loggan till vänster, menyn i mitten och en knapp till höger – allt på en rad.',
    task: `Uppgift: Bygg sidhuvudet för en pizzeria, som en hel sida.
  1. En \`header\` med tre barn: en länk med klassen \`logga\` och texten \`🍕 Pizzabaren\`, en \`nav\` med tre länkar (\`Meny\`, \`Om oss\`, \`Hitta hit\`) och en länk med klassen \`knapp\` och texten \`Beställ\`.
  2. \`header\` är en flexbox där barnen står utspridda (\`space-between\`) och mitt på höjden (\`center\`), med padding \`16px 24px\` och bakgrunden \`firebrick\`.
  3. \`nav\` är en flexbox med \`24px\` mellan länkarna.
  4. Alla länkar i \`header\` är vita och utan streck under.
  5. Knappen har bakgrunden \`goldenrod\`, padding \`8px 16px\` och hörnen \`8px\`.`,
    starterCode: '<!-- Skriv din kod här -->\n',
    solution: `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8">
    <title>Pizzabaren</title>
    <style>
      body {
        margin: 0;
        font-family: Arial, sans-serif;
      }
      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 24px;
        background-color: firebrick;
      }
      header a {
        color: white;
        text-decoration: none;
      }
      .logga {
        font-size: 1.5rem;
        font-weight: bold;
      }
      nav {
        display: flex;
        gap: 24px;
      }
      .knapp {
        background-color: goldenrod;
        padding: 8px 16px;
        border-radius: 8px;
      }
    </style>
  </head>
  <body>
    <header>
      <a class="logga" href="#">🍕 Pizzabaren</a>
      <nav>
        <a href="#">Meny</a>
        <a href="#">Om oss</a>
        <a href="#">Hitta hit</a>
      </nav>
      <a class="knapp" href="#">Beställ</a>
    </header>
  </body>
</html>
`,
    hints: [],
    tests: [
      {
        description: 'Sidhuvudet har logga, meny med tre länkar och knapp',
        code: "[text('header > .logga'), texts('header nav a'), text('header > .knapp')]",
        expected: ['🍕 Pizzabaren', ['Meny', 'Om oss', 'Hitta hit'], 'Beställ'],
      },
      {
        description: 'Loggan, menyn och knappen står på en rad i den ordningen',
        code: "[rows('header > *'), inOrder('header > .logga, header > .knapp')]",
        expected: [1, ['🍕 Pizzabaren', 'Beställ']],
      },
      {
        description: 'De står utspridda och mitt på höjden',
        code: "[css('header', 'justify-content'), css('header', 'align-items')]",
        expected: ['space-between', 'center'],
      },
      {
        description: 'Knappen står ända ut till höger, innanför paddingen',
        code: "Math.abs(rect('header').left + rect('header').width - 24 - rect('.knapp').left - rect('.knapp').width) <= 1",
        expected: true,
      },
      {
        description:
          'Sidhuvudet har padding 16px 24px och bakgrunden firebrick',
        code: "[px('header', 'padding-top'), px('header', 'padding-left'), colorOf('header', 'background-color')]",
        expected: [16, 24, 'firebrick'],
      },
      {
        description: 'Menyn har 24px mellan länkarna',
        code: "[rows('nav a'), gapX('nav a')]",
        expected: [1, 24],
      },
      {
        description: 'Länkarna är vita och utan streck under',
        code: "[...colorsOf('header a'), css('nav a', 'text-decoration-line')]",
        expected: ['white', 'white', 'white', 'white', 'white', 'none'],
      },
      {
        description: 'Knappen är goldenrod med padding 8px 16px och 8px hörn',
        code: "[colorOf('.knapp', 'background-color'), px('.knapp', 'padding-top'), px('.knapp', 'padding-left'), css('.knapp', 'border-radius')]",
        expected: ['goldenrod', 8, 16, '8px'],
      },
    ],
  },
  grid: {
    id: 'grid-boss',
    track: 'grid',
    title: 'Boss: Tidningssidan',
    isBoss: true,
    xp: 60,
    description:
      BOSS_INTRO +
      'En förstasida för skoltidningen: en stor toppnyhet och fyra mindre nyheter i ett grid.',
    task: `Uppgift: Bygg förstasidan till skoltidningen, som en hel sida.
  1. En \`h1\` med texten \`Skolbladet\`, och ett \`div\` med klassen \`tidning\` med fem \`article\`. Varje \`article\` har en \`h2\` och ett stycke. Den första har klassen \`topp\`.
  2. \`.tidning\` är ett grid med tre lika breda kolumner (\`repeat\` och \`fr\`) och \`16px\` luft åt alla håll.
  3. \`.topp\` sträcker sig över två kolumner, så att alla fem nyheter får plats på två rader.
  4. Varje \`article\` har vit bakgrund, \`16px\` padding och hörnen \`8px\`. Sidan har bakgrunden \`gainsboro\`.`,
    starterCode: '<!-- Skriv din kod här -->\n',
    solution: `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8">
    <title>Skolbladet</title>
    <style>
      body {
        background-color: gainsboro;
        font-family: Georgia, serif;
      }
      .tidning {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
      }
      article {
        background-color: white;
        padding: 16px;
        border-radius: 8px;
      }
      .topp {
        grid-column: span 2;
      }
    </style>
  </head>
  <body>
    <h1>Skolbladet</h1>
    <div class="tidning">
      <article class="topp">
        <h2>Rektorn hoppade bungyjump</h2>
        <p>Insamlingen till nya klätterställningen gick över målet.</p>
      </article>
      <article>
        <h2>Snöbollskrig förbjudet?</h2>
        <p>Elevrådet tycker till.</p>
      </article>
      <article>
        <h2>Ny bok i biblioteket</h2>
        <p>Kön är redan lång.</p>
      </article>
      <article>
        <h2>Matsalen testar tacos</h2>
        <p>Varje fredag i en månad.</p>
      </article>
      <article>
        <h2>Schackturnering</h2>
        <p>Anmäl dig senast på måndag.</p>
      </article>
    </div>
  </body>
</html>
`,
    hints: [],
    tests: [
      {
        description: 'Sidan har rubriken Skolbladet och fem nyheter',
        code: "[text('h1'), count('.tidning > article'), count('.tidning article h2'), count('.tidning article p')]",
        expected: ['Skolbladet', 5, 5, 5],
      },
      {
        description: 'Den första nyheten har klassen topp',
        code: "count('.tidning > article:first-child.topp')",
        expected: 1,
      },
      {
        description: '.tidning är ett grid med tre lika breda kolumner',
        code: "[css('.tidning', 'display'), new Set(widths('.tidning > article:not(.topp)')).size]",
        expected: ['grid', 1],
      },
      {
        description:
          'Nyheterna står på två rader: två på första och tre på andra',
        code: "[rows('.tidning > article'), perRow('.tidning > article')]",
        expected: [2, 2],
      },
      {
        description: 'Toppnyheten är två kolumner bred',
        code: "Math.abs(widths('.topp')[0] - 2 * widths('.tidning > article:last-child')[0] - 16) <= 1",
        expected: true,
      },
      {
        description: 'Det är 16px luft åt alla håll',
        code: "[gapX('.tidning > article'), gapY('.tidning > article')]",
        expected: [16, 16],
      },
      {
        description: 'Nyheterna är vita med 16px padding och 8px hörn',
        code: "[colorOf('article', 'background-color'), px('article', 'padding-top'), css('article', 'border-radius')]",
        expected: ['white', 16, '8px'],
      },
      {
        description: 'Sidan har bakgrunden gainsboro',
        code: "colorOf('body', 'background-color')",
        expected: 'gainsboro',
      },
    ],
  },
  responsivt: {
    id: 'responsivt-boss',
    track: 'responsivt',
    title: 'Boss: Restaurangsidan',
    isBoss: true,
    xp: 60,
    description:
      BOSS_INTRO +
      'En restaurangsida som fungerar lika bra på mobilen som på datorn. Den rättas i båda bredderna.',
    task: `Uppgift: Bygg en sida för en restaurang, som en hel sida.
  1. viewport-raden i \`head\`.
  2. En \`header\` med en \`h1\` och en \`nav\` med tre länkar. På datorn står de bredvid varandra (flexbox, \`space-between\`). När fönstret är högst \`600px\` brett står \`h1\` ovanför menyn (\`flex-direction: column\`).
  3. En bild med \`width="800"\` och \`height="600"\` som aldrig blir bredare än sidan, och behåller sin form.
  4. Ett \`div\` med klassen \`meny\` med tre \`div\` med klassen \`ratt\`. På datorn är \`.meny\` ett grid med tre kolumner och \`16px\` gap. När fönstret är högst \`600px\` brett har den en kolumn.
  5. Ingenting får sticka ut på mobilen.`,
    starterCode: '<!-- Skriv din kod här -->\n',
    solution: `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Nudelbaren</title>
    <style>
      body {
        font-family: Arial, sans-serif;
      }
      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      nav {
        display: flex;
        gap: 16px;
      }
      img {
        max-width: 100%;
        height: auto;
      }
      .meny {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
      }
      .ratt {
        background-color: seashell;
        padding: 16px;
        border-radius: 8px;
      }
      @media (max-width: 600px) {
        header {
          flex-direction: column;
        }
        .meny {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <header>
      <h1>🍜 Nudelbaren</h1>
      <nav>
        <a href="#meny">Meny</a>
        <a href="#">Boka bord</a>
        <a href="#">Hitta hit</a>
      </nav>
    </header>
    <img src="bilder/pannkakor.svg" alt="Pannkakor på ett fat" width="800" height="600">
    <div class="meny" id="meny">
      <div class="ratt"><h2>Ramen</h2><p>Buljong, nudlar och ägg. 129 kr</p></div>
      <div class="ratt"><h2>Pad thai</h2><p>Stekta nudlar med jordnötter. 119 kr</p></div>
      <div class="ratt"><h2>Gyoza</h2><p>Sex dumplings med sås. 89 kr</p></div>
    </div>
  </body>
</html>
`,
    hints: [],
    tests: [
      {
        description: 'Sidan har viewport-raden',
        code: "(attr('meta[name=viewport]', 'content') ?? '').replace(/\\s+/g, '')",
        expected: 'width=device-width,initial-scale=1',
      },
      {
        description: 'Sidhuvudet har en h1 och en meny med tre länkar',
        code: "[count('header h1'), count('header nav a')]",
        expected: [1, 3],
      },
      {
        description: 'På datorn står rubriken och menyn bredvid varandra',
        code: "rows('header > *')",
        expected: 1,
      },
      {
        description: 'På mobilen står rubriken ovanför menyn',
        code: "rows('header > *')",
        expected: 2,
        width: 375,
      },
      {
        description: 'Menyn har tre rätter i tre kolumner på datorn',
        code: "[count('.meny .ratt'), perRow('.ratt'), gapX('.ratt')]",
        expected: [3, 3, 16],
      },
      {
        description: 'På mobilen står rätterna i en kolumn',
        code: "perRow('.ratt')",
        expected: 1,
        width: 375,
      },
      {
        description:
          'Bilden är 800 × 600 i HTML:en och behåller formen på mobilen',
        code: "[attr('img', 'width'), attr('img', 'height'), Math.abs(heights('img')[0] * 4 - widths('img')[0] * 3) <= 4]",
        expected: ['800', '600', true],
        width: 375,
      },
      {
        description: 'Ingenting sticker ut på mobilen',
        code: 'fitsScreen()',
        expected: true,
        width: 375,
      },
    ],
  },
  slutprojekt: {
    id: 'slutprojekt-boss',
    track: 'slutprojekt',
    title: 'Boss: Din hemsida',
    isBoss: true,
    xp: 100,
    description:
      BOSS_INTRO +
      'Allt du har lärt dig i en sida: en hemsida om dig själv som fungerar på både dator och mobil.',
    task: `Uppgift: Bygg din egen hemsida, som en hel sida. Texterna väljer du själv.
  1. viewport-raden i \`head\`. Ett färgtema i \`:root\` med \`--huvudfarg\`, som används för rubriken \`h1\` och knappen.
  2. En \`header\` med en \`h1\` och en \`nav\` med tre länkar, som följer med när man skrollar (\`position: sticky\`, \`top: 0\`) och har en bakgrund.
  3. \`main\` med tre \`section\`: \`om\`, \`projekt\` och \`kontakt\`. Menyns länkar går dit.
  4. I \`#om\`: en länk med klassen \`knapp\`.
  5. I \`#projekt\`: ett \`div\` med klassen \`projekt\` och tre \`div\` med klassen \`kort\`, i tre kolumner på datorn och en kolumn när fönstret är högst \`600px\` brett.
  6. I \`#kontakt\`: ett formulär med en \`label\` och ett fält som hör ihop, och en knapp.
  7. En \`footer\`. Ingenting får sticka ut på mobilen.`,
    starterCode: '<!-- Skriv din kod här -->\n',
    solution: `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Kims sajt</title>
    <style>
      :root {
        --huvudfarg: darkslateblue;
        --bakgrund: ghostwhite;
      }
      html {
        scroll-behavior: smooth;
      }
      body {
        margin: 0;
        background-color: var(--bakgrund);
        font-family: Arial, sans-serif;
        line-height: 1.6;
      }
      header {
        position: sticky;
        top: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        background-color: white;
      }
      h1 {
        margin: 0;
        color: var(--huvudfarg);
      }
      nav {
        display: flex;
        gap: 16px;
      }
      section {
        max-width: 900px;
        margin: 0 auto;
        padding: 24px 16px;
      }
      .knapp {
        display: inline-block;
        padding: 8px 16px;
        border-radius: 6px;
        background-color: var(--huvudfarg);
        color: white;
        text-decoration: none;
      }
      .projekt {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
      }
      .kort {
        padding: 16px;
        border-radius: 8px;
        background-color: white;
      }
      input {
        width: 100%;
        box-sizing: border-box;
        padding: 8px;
        font: inherit;
      }
      footer {
        padding: 16px;
        text-align: center;
      }
      @media (max-width: 600px) {
        .projekt {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <header>
      <h1>Kim</h1>
      <nav>
        <a href="#om">Om mig</a>
        <a href="#projekt">Projekt</a>
        <a href="#kontakt">Kontakt</a>
      </nav>
    </header>
    <main>
      <section id="om">
        <h2>Om mig</h2>
        <p>Jag är tretton år och gillar att bygga hemsidor, rita och spela fotboll.</p>
        <a class="knapp" href="#kontakt">Säg hej</a>
      </section>
      <section id="projekt">
        <h2>Mina projekt</h2>
        <div class="projekt">
          <div class="kort"><h3>Receptsidan</h3><p>Mormors bästa bullar.</p></div>
          <div class="kort"><h3>Fotbollslaget</h3><p>Matcher och resultat.</p></div>
          <div class="kort"><h3>Ritblocket</h3><p>Mina teckningar.</p></div>
        </div>
      </section>
      <section id="kontakt">
        <h2>Kontakt</h2>
        <form>
          <label for="meddelande">Ditt meddelande</label>
          <input id="meddelande" name="meddelande">
          <button>Skicka</button>
        </form>
      </section>
    </main>
    <footer>© Kim</footer>
  </body>
</html>
`,
    hints: [],
    tests: [
      {
        description: 'Sidan har viewport-raden',
        code: "(attr('meta[name=viewport]', 'content') ?? '').replace(/\\s+/g, '')",
        expected: 'width=device-width,initial-scale=1',
      },
      {
        description:
          'header med h1 och en nav som länkar till om, projekt och kontakt',
        code: "[count('header h1'), $$('header nav a').map(link => link.getAttribute('href'))]",
        expected: [1, ['#om', '#projekt', '#kontakt']],
      },
      {
        description: 'main har sektionerna om, projekt och kontakt',
        code: "$$('main > section').map(section => section.id)",
        expected: ['om', 'projekt', 'kontakt'],
      },
      {
        description:
          'Det finns en knapp i #om, ett formulär med label i #kontakt och en footer',
        code: "[count('#om a.knapp'), $$('#kontakt label').some(label => $('#kontakt #' + label.htmlFor)), count('#kontakt button'), count('footer')]",
        expected: [1, true, 1, 1],
      },
      {
        description: 'Rubriken och knappen använder --huvudfarg',
        code: "(doc.documentElement.style.setProperty('--huvudfarg', 'crimson'), [colorOf('h1'), colorOf('.knapp', 'background-color')])",
        expected: ['crimson', 'crimson'],
      },
      {
        description:
          'Sidhuvudet följer med när man skrollar och har en bakgrund',
        code: "[css('header', 'position'), css('header', 'top'), colorOf('header', 'background-color') !== 'transparent']",
        expected: ['sticky', '0px', true],
      },
      {
        description: 'Projekten står i tre kolumner på datorn',
        code: "[count('#projekt .projekt .kort'), perRow('.kort')]",
        expected: [3, 3],
      },
      {
        description: 'På mobilen står projekten i en kolumn',
        code: "perRow('.kort')",
        expected: 1,
        width: 375,
      },
      {
        description: 'Ingenting sticker ut på mobilen',
        code: 'fitsScreen()',
        expected: true,
        width: 375,
      },
    ],
  },
  tailwind: {
    id: 'tailwind-boss',
    track: 'tailwind',
    title: 'Boss: Produktkortet i Tailwind',
    isBoss: true,
    xp: 60,
    description:
      BOSS_INTRO +
      'Ett produktkort helt i Tailwind – utan en enda rad egen CSS.',
    task: `Uppgift: Bygg ett produktkort för en cykelkorg med bara Tailwind-klasser. Inget \`<style>\`.
  1. Tailwind-raden. \`body\` har bakgrunden \`slate-100\` och padding \`p-8\`.
  2. Ett \`div\` med klassen \`kort\` som är högst \`max-w-sm\` brett och står i mitten (\`mx-auto\`), med vit bakgrund, \`rounded-xl\`, \`shadow-lg\` och \`p-6\`.
  3. I kortet: en bild (\`bilder/hund.svg\`, med \`alt\`) som är \`w-full\` och \`rounded-lg\`, och en \`h2\` med \`text-2xl\` och \`font-bold\`.
  4. Längst ner ett \`div\` som är \`flex\`, \`justify-between\` och \`items-center\`, med priset i ett \`span\` med \`text-emerald-600\` och en länk med klassen \`knapp\`.
  5. Knappen har \`bg-emerald-600\`, vit text, \`px-4 py-2\`, \`rounded-lg\` och \`bg-emerald-700\` när musen är över.`,
    starterCode: '<!-- Skriv din kod här -->\n',
    solution: `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8">
    <title>Hundcykeln</title>
    ${TW}
  </head>
  <body class="bg-slate-100 p-8">
    <div class="kort max-w-sm mx-auto bg-white rounded-xl shadow-lg p-6">
      <img class="w-full rounded-lg" src="bilder/hund.svg" alt="En glad hund i en cykelkorg">
      <h2 class="text-2xl font-bold mt-4">Cykelkorgen Vovve</h2>
      <p class="text-slate-600">Plats för en liten hund och en stor matsäck.</p>
      <div class="flex justify-between items-center mt-4">
        <span class="text-emerald-600 text-xl font-bold">349 kr</span>
        <a class="knapp bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg" href="#">Köp</a>
      </div>
    </div>
  </body>
</html>
`,
    hints: [],
    tests: [
      {
        description: 'Sidan har ingen egen CSS',
        code: "count('style:not([data-tailwind])') + count('[style]')",
        expected: 0,
      },
      {
        description: 'Sidan är slate-100 med 32px padding',
        code: "[twColor('body', 'background-color'), px('body', 'padding-top')]",
        expected: ['slate-100', 32],
      },
      {
        description: 'Kortet är högst 384px brett och står i mitten',
        code: "[widths('.kort')[0], centered('.kort')]",
        expected: [384, true],
      },
      {
        description: 'Kortet är vitt med 12px hörn, skugga och 24px padding',
        code: "[twColor('.kort', 'background-color'), css('.kort', 'border-radius'), css('.kort', 'box-shadow') !== 'none', px('.kort', 'padding-top')]",
        expected: ['white', '12px', true, 24],
      },
      {
        description: 'Bilden fyller kortet, och rubriken är 24px och fet',
        code: "[attr('.kort img', 'alt') !== null, widths('.kort img')[0], px('.kort h2', 'font-size'), css('.kort h2', 'font-weight')]",
        expected: [true, 336, 24, '700'],
      },
      {
        description: 'Priset och knappen står på en rad, utspridda',
        code: "[rows('.kort span, .kort .knapp'), css('.knapp', 'display') !== 'none', twColor('.kort span')]",
        expected: [1, true, 'emerald-600'],
      },
      {
        description: 'Knappen står ända ut till höger i kortet',
        code: "Math.abs(rect('.kort').left + rect('.kort').width - 24 - rect('.knapp').left - rect('.knapp').width) <= 1",
        expected: true,
      },
      {
        description:
          'Knappen är emerald-600 med vit text, padding 8px 16px och 8px hörn',
        code: "[twColor('.knapp', 'background-color'), twColor('.knapp'), px('.knapp', 'padding-top'), px('.knapp', 'padding-left'), css('.knapp', 'border-radius')]",
        expected: ['emerald-600', 'white', 8, 16, '8px'],
      },
      {
        description: 'Knappen blir emerald-700 när musen är över',
        code: "twName(hover('.knapp', 'background-color'))",
        expected: 'emerald-700',
      },
    ],
  },
};
