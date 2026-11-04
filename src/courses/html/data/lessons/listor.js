// Bana 3: listor och tabeller. Inga sidans delar (header, nav …) än –
// det är bana 4 – och ingen CSS (bana 6).

// Cellerna i en rad som text, så att testet kan jämföra hela raden.
const row = index =>
  `[...($$('tr')[${index}]?.children ?? [])].map(cell => cell.textContent.trim())`;

export const LISTOR = [
  {
    id: 'listor-01',
    track: 'listor',
    title: 'Punktlista',
    xp: 15,
    description:
      'Listor finns överallt på webben: menyer, inköpslistor, sökresultat. När ordningen inte spelar någon roll blir det en punktlista.',
    explain:
      '`<ul>` (unordered list) är listan och varje sak i den är ett `<li>` (list item). Webbläsaren sätter en punkt framför varje `li`.\n\nAlla `li` ligger inuti `ul`. Det är listan som håller ihop sakerna.',
    example: '<ul>\n  <li>Hink</li>\n  <li>Spade</li>\n</ul>',
    task: 'Uppgift: Skriv en punktlista med `Mjölk`, `Bröd` och `Ost`.',
    starterCode: '<!-- Skriv din kod här -->\n',
    solution:
      '<ul>\n  <li>Mjölk</li>\n  <li>Bröd</li>\n  <li>Ost</li>\n</ul>\n',
    hints: [
      'Listan börjar med <ul> och slutar med </ul>.',
      'Varje sak står i ett eget <li>…</li>, inuti ul.',
      '<li>Mjölk</li> är den första saken.',
    ],
    tests: [
      { description: 'Det finns en ul', code: "count('ul')", expected: 1 },
      {
        description: 'Listan har Mjölk, Bröd och Ost',
        code: "texts('ul li')",
        expected: ['Mjölk', 'Bröd', 'Ost'],
      },
    ],
  },
  {
    id: 'listor-02',
    track: 'listor',
    title: 'Numrerad lista',
    xp: 15,
    description:
      'En topplista, stegen i ett recept, en instruktion – när ordningen spelar roll vill du ha siffror.',
    explain:
      '`<ol>` (ordered list) numrerar sakerna åt dig: 1, 2, 3. Sakerna är `<li>` precis som i `ul`.\n\nSkriv inte siffrorna själv. Flyttar du en rad räknar webbläsaren om, men siffror du skrivit själv blir fel.',
    example: '<ol>\n  <li>Koka vatten</li>\n  <li>Häll i teet</li>\n</ol>',
    task: 'Uppgift: Skriv en numrerad lista över dina tre favoritglassar: `Choklad`, `Jordgubb` och `Päron`, i den ordningen.',
    starterCode: '<!-- Skriv din kod här -->\n',
    solution:
      '<ol>\n  <li>Choklad</li>\n  <li>Jordgubb</li>\n  <li>Päron</li>\n</ol>\n',
    hints: [
      'Samma som en punktlista, men med <ol> i stället för <ul>.',
      'Skriv inte 1, 2, 3 själv – det gör ol.',
      '<ol> <li>Choklad</li> … </ol>',
    ],
    tests: [
      { description: 'Det finns en ol', code: "count('ol')", expected: 1 },
      {
        description: 'Glassarna i rätt ordning',
        code: "texts('ol li')",
        expected: ['Choklad', 'Jordgubb', 'Päron'],
      },
    ],
  },
  {
    id: 'listor-03',
    track: 'listor',
    title: 'ul eller ol?',
    xp: 15,
    description:
      'Fråga dig: blir det fel om jag kastar om raderna? Ja – då är det `ol`. Nej – då är det `ul`.',
    explain:
      'Ingredienserna till pannkakor kan stå i vilken ordning som helst, så de är en `ul`. Men stegen måste göras i ordning – ägget i innan du steker – så de är en `ol`.\n\nSkärmläsare säger också "lista med tre saker" eller "steg 1 av 3", så valet hjälper fler än det syns.',
    example:
      '<h2>Packa</h2>\n<ul><li>Tandborste</li><li>Pyjamas</li></ul>\n<h2>Res</h2>\n<ol><li>Gå till bussen</li><li>Byt till tåget</li></ol>',
    task: 'Uppgift: Båda listorna är punktlistor nu. Gör om listan under `Gör så här` till en numrerad lista – stegen måste ju göras i ordning.',
    starterCode: `<h1>Pannkakor</h1>
<h2>Du behöver</h2>
<ul>
  <li>Mjöl</li>
  <li>Mjölk</li>
  <li>Ägg</li>
</ul>
<h2>Gör så här</h2>
<ul>
  <li>Vispa ihop allt</li>
  <li>Stek i smör</li>
  <li>Ät med sylt</li>
</ul>
`,
    solution: `<h1>Pannkakor</h1>
<h2>Du behöver</h2>
<ul>
  <li>Mjöl</li>
  <li>Mjölk</li>
  <li>Ägg</li>
</ul>
<h2>Gör så här</h2>
<ol>
  <li>Vispa ihop allt</li>
  <li>Stek i smör</li>
  <li>Ät med sylt</li>
</ol>
`,
    hints: [
      'Det är bara den andra listan som ska ändras.',
      'Byt både <ul> och </ul> mot <ol> och </ol>.',
      'li-raderna kan stå kvar precis som de är.',
    ],
    tests: [
      {
        description: 'Ingredienserna är fortfarande en punktlista',
        code: "texts('ul li')",
        expected: ['Mjöl', 'Mjölk', 'Ägg'],
      },
      {
        description: 'Stegen är en numrerad lista',
        code: "texts('ol li')",
        expected: ['Vispa ihop allt', 'Stek i smör', 'Ät med sylt'],
      },
    ],
  },
  {
    id: 'listor-04',
    track: 'listor',
    title: 'Lista i lista',
    xp: 20,
    description:
      'En sak i en lista kan ha en egen lista under sig, som en mapp med filer i.',
    explain:
      'Den inre listan ligger inuti `li`, efter texten: `<li>Frukt <ul>…</ul></li>`. Så vet webbläsaren vilken sak den hör till, och drar in den.\n\nStäng den inre listan innan du stänger `li`. Indraget i koden är bara för att du ska se vad som hör ihop.',
    example:
      '<ul>\n  <li>Djur\n    <ul>\n      <li>Katt</li>\n    </ul>\n  </li>\n</ul>',
    task: 'Uppgift: Skriv en punktlista med `Frukt` och `Grönsaker`. Under `Frukt` ska det finnas en egen lista med `Äpple` och `Banan`, och under `Grönsaker` en med `Morot`.',
    starterCode: '<!-- Skriv din kod här -->\n',
    solution: `<ul>
  <li>Frukt
    <ul>
      <li>Äpple</li>
      <li>Banan</li>
    </ul>
  </li>
  <li>Grönsaker
    <ul>
      <li>Morot</li>
    </ul>
  </li>
</ul>
`,
    hints: [
      'Börja med den yttre listan: en ul med två li, Frukt och Grönsaker.',
      'Den inre listan står inuti li, efter ordet: <li>Frukt <ul>…</ul></li>.',
      'Stäng </ul> för den inre listan före </li>.',
    ],
    tests: [
      {
        description: 'Den yttre listan har Frukt och Grönsaker',
        code: "$$('body > ul > li').map(item => item.firstChild?.textContent.trim() ?? null)",
        expected: ['Frukt', 'Grönsaker'],
      },
      {
        description: 'Äpple och Banan ligger under Frukt',
        code: "texts('body > ul > li:first-child li')",
        expected: ['Äpple', 'Banan'],
      },
      {
        description: 'Morot ligger under Grönsaker',
        code: "texts('body > ul > li:nth-child(2) li')",
        expected: ['Morot'],
      },
    ],
  },
  {
    id: 'listor-05',
    track: 'listor',
    title: 'Länkar i en lista',
    xp: 20,
    description:
      'Nästan varje meny på webben är en lista med länkar. Det ser inte ut så – CSS gör om den – men under ytan är det en `ul`.',
    explain:
      'Länken ligger inuti `li`: `<li><a href="…">Hem</a></li>`. Listan säger "det här är fyra val", och länkarna gör dem klickbara.\n\nNär du lärt dig CSS gör du om samma lista till en rad med knappar högst upp på sidan.',
    example: '<ul>\n  <li><a href="#start">Start</a></li>\n</ul>',
    task: 'Uppgift: Skriv en punktlista med tre länkar: `Hem` till `#hem`, `Recept` till `#recept` och `Om mig` till `#om`.',
    starterCode: '<!-- Skriv din kod här -->\n',
    solution: `<ul>
  <li><a href="#hem">Hem</a></li>
  <li><a href="#recept">Recept</a></li>
  <li><a href="#om">Om mig</a></li>
</ul>
`,
    hints: [
      'En ul med tre li, och i varje li en länk.',
      '<li><a href="#hem">Hem</a></li> är den första.',
      'Stäng </a> före </li>.',
    ],
    tests: [
      {
        description: 'Tre länkar i listan',
        code: "texts('ul li a')",
        expected: ['Hem', 'Recept', 'Om mig'],
      },
      {
        description: 'De går till #hem, #recept och #om',
        code: "$$('ul li a').map(link => link.getAttribute('href'))",
        expected: ['#hem', '#recept', '#om'],
      },
    ],
  },
  {
    id: 'listor-06',
    track: 'listor',
    title: 'Din första tabell',
    xp: 20,
    description:
      'Tabeller är till för data med rader och kolumner: scheman, resultat, priser. Allt som skulle passa i ett kalkylark.',
    explain:
      '`<table>` är tabellen. Varje rad är en `<tr>` (table row), och i raden står cellerna som `<td>` (table data).\n\nTabellen byggs rad för rad, från vänster till höger. Alla rader ska ha lika många celler, annars hamnar saker i fel kolumn.\n\nTabellen får inga linjer än – dem ritar du med CSS i bana 6. Använd inte heller tabeller för att placera saker på sidan, det gör du också med CSS.',
    example:
      '<table>\n  <tr>\n    <td>Kalle</td>\n    <td>9</td>\n  </tr>\n</table>',
    task: 'Uppgift: Skriv en tabell med två rader. Första raden: `Ada` och `36`. Andra raden: `Alan` och `41`.',
    starterCode: '<!-- Skriv din kod här -->\n',
    solution: `<table>
  <tr>
    <td>Ada</td>
    <td>36</td>
  </tr>
  <tr>
    <td>Alan</td>
    <td>41</td>
  </tr>
</table>
`,
    hints: [
      'table runt allt, en tr per rad och en td per cell.',
      'Två rader med två celler i varje: fyra td.',
      '<tr><td>Ada</td><td>36</td></tr> är den första raden.',
    ],
    tests: [
      { description: 'Två rader', code: "count('tr')", expected: 2 },
      {
        description: 'Första raden: Ada och 36',
        code: row(0),
        expected: ['Ada', '36'],
      },
      {
        description: 'Andra raden: Alan och 41',
        code: row(1),
        expected: ['Alan', '41'],
      },
    ],
  },
  {
    id: 'listor-07',
    track: 'listor',
    title: 'Rubrikceller',
    xp: 20,
    description:
      'Vad betyder 36? Utan rubriker är tabellen bara siffror. Rubrikcellerna säger vad varje kolumn är.',
    explain:
      '`<th>` (table header) är en rubrikcell. Den står där `td` annars står, men webbläsaren gör den fet och centrerad.\n\nViktigare: skärmläsare läser upp rubriken före varje värde – "Ålder: 36" – så att den som inte ser tabellen ändå förstår den.',
    example: '<tr>\n  <th>Namn</th>\n  <th>Poäng</th>\n</tr>',
    task: 'Uppgift: Lägg till en rubrikrad överst i tabellen, med `Namn` och `Ålder` som `th`.',
    starterCode: `<table>
  <tr>
    <td>Ada</td>
    <td>36</td>
  </tr>
  <tr>
    <td>Alan</td>
    <td>41</td>
  </tr>
</table>
`,
    solution: `<table>
  <tr>
    <th>Namn</th>
    <th>Ålder</th>
  </tr>
  <tr>
    <td>Ada</td>
    <td>36</td>
  </tr>
  <tr>
    <td>Alan</td>
    <td>41</td>
  </tr>
</table>
`,
    hints: [
      'Rubrikraden är en ny tr, först i tabellen.',
      'Cellerna i den är th i stället för td.',
      '<tr><th>Namn</th><th>Ålder</th></tr>',
    ],
    tests: [
      { description: 'Tre rader', code: "count('tr')", expected: 3 },
      {
        description: 'Första raden har rubrikerna Namn och Ålder',
        code: "texts('tr:first-child th')",
        expected: ['Namn', 'Ålder'],
      },
      {
        description: 'Ada står kvar på andra raden',
        code: row(1),
        expected: ['Ada', '36'],
      },
    ],
  },
  {
    id: 'listor-08',
    track: 'listor',
    title: 'Tabellens delar',
    xp: 20,
    description:
      'Större tabeller delas i ett huvud och en kropp, och får en rubrik som säger vad hela tabellen visar.',
    explain:
      '`<caption>` är tabellens rubrik och står först i `table`. `<thead>` håller rubrikraden och `<tbody>` raderna med data.\n\nPå sidan ändras inte mycket. Men nu vet webbläsaren vad som är vad: skrivs tabellen ut på flera papper upprepas `thead` överst på varje sida.',
    example:
      '<table>\n  <caption>Resultat</caption>\n  <thead>\n    <tr><th>Lag</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Blå</td></tr>\n  </tbody>\n</table>',
    task: 'Uppgift: Ge tabellen rubriken `Klassen` med `caption`. Lägg rubrikraden i en `thead` och de andra två raderna i en `tbody`.',
    starterCode: `<table>
  <tr>
    <th>Namn</th>
    <th>Ålder</th>
  </tr>
  <tr>
    <td>Ada</td>
    <td>36</td>
  </tr>
  <tr>
    <td>Alan</td>
    <td>41</td>
  </tr>
</table>
`,
    solution: `<table>
  <caption>Klassen</caption>
  <thead>
    <tr>
      <th>Namn</th>
      <th>Ålder</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Ada</td>
      <td>36</td>
    </tr>
    <tr>
      <td>Alan</td>
      <td>41</td>
    </tr>
  </tbody>
</table>
`,
    hints: [
      '<caption>Klassen</caption> står direkt efter <table>.',
      '<thead> före rubrikraden och </thead> efter den.',
      'Sedan <tbody> runt de två sista raderna.',
    ],
    tests: [
      {
        description: 'Tabellen heter Klassen',
        code: "text('caption')",
        expected: 'Klassen',
      },
      {
        description: 'Rubrikraden ligger i thead',
        code: "texts('thead th')",
        expected: ['Namn', 'Ålder'],
      },
      {
        description: 'Två rader i tbody',
        code: "count('tbody tr')",
        expected: 2,
      },
    ],
  },
  {
    id: 'listor-09',
    track: 'listor',
    title: 'Laga tabellen',
    xp: 20,
    description:
      'En cell som saknas syns inte som ett fel. Resten av raden flyttar bara ett steg åt vänster, in i fel kolumn.',
    explain:
      'Webbläsaren fyller raden från vänster. Har en rad två celler i stället för tre hamnar den andra cellen i mittenkolumnen, och den sista kolumnen blir tom.\n\nRäkna cellerna: varje rad ska ha lika många som rubrikraden.',
    example: '<tr><td>1</td><td>2</td><td>3</td></tr>',
    task: 'Uppgift: Priset på tisdag har hamnat under `Mat`. På tisdag blir det `Fiskpinnar` – lägg till cellen som saknas så att priset hamnar under `Pris`.',
    starterCode: `<table>
  <tr><th>Dag</th><th>Mat</th><th>Pris</th></tr>
  <tr><td>Måndag</td><td>Pannkakor</td><td>45 kr</td></tr>
  <tr><td>Tisdag</td><td>55 kr</td></tr>
  <tr><td>Onsdag</td><td>Soppa</td><td>40 kr</td></tr>
</table>
`,
    solution: `<table>
  <tr><th>Dag</th><th>Mat</th><th>Pris</th></tr>
  <tr><td>Måndag</td><td>Pannkakor</td><td>45 kr</td></tr>
  <tr><td>Tisdag</td><td>Fiskpinnar</td><td>55 kr</td></tr>
  <tr><td>Onsdag</td><td>Soppa</td><td>40 kr</td></tr>
</table>
`,
    hints: [
      'Räkna cellerna på varje rad. Vilken rad har bara två?',
      'Maten ska stå mellan dagen och priset.',
      '<td>Tisdag</td><td>Fiskpinnar</td><td>55 kr</td>',
    ],
    tests: [
      {
        description: 'Alla rader har tre celler',
        code: "$$('tr').map(tr => tr.children.length)",
        expected: [3, 3, 3, 3],
      },
      {
        description: 'Tisdag: Fiskpinnar för 55 kr',
        code: row(2),
        expected: ['Tisdag', 'Fiskpinnar', '55 kr'],
      },
    ],
  },
];
