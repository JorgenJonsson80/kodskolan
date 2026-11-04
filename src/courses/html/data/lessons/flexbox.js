// Bana 8: flexbox. Layouten rättas med rows(), perRow(), gapX() m.fl.,
// som mäter i riktig Chrome (se test/grading.browser.test.js). Värden som
// justify-content testas med css(), som ger samma svar överallt.

export const FLEXBOX = [
  {
    id: 'flexbox-01',
    track: 'flexbox',
    title: 'Bredvid varandra',
    xp: 15,
    description:
      'Rutorna här står under varandra, som alla block gör. Men de ska stå på en rad.',
    explain:
      'Med `display: flex` på en förälder ställer sig **barnen** bredvid varandra på en rad.\n\nRegeln skrivs alltså på lådan runt omkring, inte på rutorna själva. Föräldern kallas en *flexbehållare* och barnen *flexelement*.',
    example: '.rad {\n  display: flex;\n}',
    task: 'Uppgift: Ge `.rad` `display: flex` så att de tre rutorna står bredvid varandra.',
    starterCode: `<style>
  .ruta {
    background-color: gold;
    padding: 16px;
    border: 2px solid white;
  }
  /* Skriv regeln för .rad här */
</style>
<div class="rad">
  <div class="ruta">Sten</div>
  <div class="ruta">Sax</div>
  <div class="ruta">Påse</div>
</div>
`,
    solution: `<style>
  .ruta {
    background-color: gold;
    padding: 16px;
    border: 2px solid white;
  }
  .rad {
    display: flex;
  }
</style>
<div class="rad">
  <div class="ruta">Sten</div>
  <div class="ruta">Sax</div>
  <div class="ruta">Påse</div>
</div>
`,
    hints: [
      'Regeln ska stå på .rad, lådan runt rutorna.',
      'display bestämmer hur barnen ställer sig.',
      '.rad { display: flex; }',
    ],
    tests: [
      {
        description: '.rad är en flexbox',
        code: "css('.rad', 'display')",
        expected: 'flex',
      },
      {
        description: 'Alla tre rutorna står på samma rad',
        code: "[rows('.ruta'), perRow('.ruta')]",
        expected: [1, 3],
      },
    ],
  },
  {
    id: 'flexbox-02',
    track: 'flexbox',
    title: 'gap – luft emellan',
    xp: 15,
    description:
      'Korten står på en rad men klistrar ihop. De behöver luft mellan sig.',
    explain:
      '`gap` är luften *mellan* sakerna i en flexbox – aldrig ytterst.\n\nMed margin på varje kort får du luft även vid kanterna, och du måste komma ihåg att ta bort den på det sista. `gap` sätts en gång på föräldern och blir rätt direkt.',
    example: '.rad {\n  display: flex;\n  gap: 16px;\n}',
    task: 'Uppgift: Ge `.kort` `16px` luft emellan med `gap` på `.korten`.',
    starterCode: `<style>
  .korten {
    display: flex;
  }
  .kort {
    background-color: lavender;
    padding: 16px;
    border-radius: 8px;
  }
</style>
<div class="korten">
  <div class="kort">🦊 Räv</div>
  <div class="kort">🦉 Uggla</div>
  <div class="kort">🦔 Igelkott</div>
</div>
`,
    solution: `<style>
  .korten {
    display: flex;
    gap: 16px;
  }
  .kort {
    background-color: lavender;
    padding: 16px;
    border-radius: 8px;
  }
</style>
<div class="korten">
  <div class="kort">🦊 Räv</div>
  <div class="kort">🦉 Uggla</div>
  <div class="kort">🦔 Igelkott</div>
</div>
`,
    hints: [
      'gap står på föräldern, .korten, inte på .kort.',
      'Glöm inte px efter talet.',
      'gap: 16px;',
    ],
    tests: [
      {
        description: 'Korten står fortfarande på en rad',
        code: "rows('.kort')",
        expected: 1,
      },
      {
        description: 'Det är 16px mellan korten',
        code: "gapX('.kort')",
        expected: 16,
      },
    ],
  },
  {
    id: 'flexbox-03',
    track: 'flexbox',
    title: 'justify-content – längs raden',
    xp: 20,
    description:
      'I en flexbox hamnar allt till vänster. Men det finns plats kvar på raden – var ska den hamna?',
    explain:
      '`justify-content` fördelar den lediga platsen längs raden:\n\n- `flex-start` – allt till vänster (det vanliga)\n- `center` – allt i mitten\n- `flex-end` – allt till höger\n- `space-between` – första och sista vid kanterna, resten jämnt emellan\n- `space-around` – lika mycket luft runt varje sak\n\nDen skrivs på föräldern, precis som `display: flex`.',
    example: '.meny {\n  display: flex;\n  justify-content: center;\n}',
    task: 'Uppgift: Ställ länkarna i `.meny` i mitten med `center`. Sprid ut sakerna i `.fot` med `space-between`.',
    starterCode: `<style>
  .meny {
    display: flex;
    gap: 16px;
  }
  .fot {
    display: flex;
    background-color: whitesmoke;
    padding: 8px;
  }
</style>
<nav class="meny">
  <a href="#">Hem</a>
  <a href="#">Bilder</a>
  <a href="#">Kontakt</a>
</nav>
<p>Välkommen till klubbens sida!</p>
<div class="fot">
  <span>© Schackklubben</span>
  <span>Sidan 1 av 3</span>
  <span>Upp ↑</span>
</div>
`,
    solution: `<style>
  .meny {
    display: flex;
    gap: 16px;
    justify-content: center;
  }
  .fot {
    display: flex;
    justify-content: space-between;
    background-color: whitesmoke;
    padding: 8px;
  }
</style>
<nav class="meny">
  <a href="#">Hem</a>
  <a href="#">Bilder</a>
  <a href="#">Kontakt</a>
</nav>
<p>Välkommen till klubbens sida!</p>
<div class="fot">
  <span>© Schackklubben</span>
  <span>Sidan 1 av 3</span>
  <span>Upp ↑</span>
</div>
`,
    hints: [
      'justify-content skrivs i båda reglerna, på föräldern.',
      'Värdena är center och space-between.',
      '.meny: justify-content: center;\n.fot: justify-content: space-between;',
    ],
    tests: [
      {
        description: 'Menyn står i mitten',
        code: "css('.meny', 'justify-content')",
        expected: 'center',
      },
      {
        description: 'Länkarna står lika långt från båda kanterna',
        code: "Math.abs(rect('.meny a').left - rect('.meny').left - (rect('.meny').left + rect('.meny').width - rect('.meny a:last-child').left - rect('.meny a:last-child').width)) <= 1",
        expected: true,
      },
      {
        description: 'Sakerna i foten är utspridda',
        code: "css('.fot', 'justify-content')",
        expected: 'space-between',
      },
    ],
  },
  {
    id: 'flexbox-04',
    track: 'flexbox',
    title: 'align-items – på tvären',
    xp: 20,
    description:
      'Bilden är hög och texten bredvid hamnar uppe i hörnet. Den ska stå mitt på höjden.',
    explain:
      '`justify-content` gäller längs raden. `align-items` gäller på tvären – i höjdled när raden går åt sidan.\n\n- `stretch` – alla blir lika höga (det vanliga)\n- `flex-start` – uppe\n- `center` – mitt på höjden\n- `flex-end` – nere\n\n`align-items: center` är det enklaste sättet att få text att stå mitt för en bild eller ikon.',
    example: '.profil {\n  display: flex;\n  align-items: center;\n}',
    task: 'Uppgift: Ge `.profil` `align-items: center` så att namnet står mitt för bilden.',
    starterCode: `<style>
  .profil {
    display: flex;
    gap: 16px;
    background-color: aliceblue;
    padding: 16px;
  }
  .bild {
    width: 80px;
    height: 80px;
    background-color: steelblue;
    border-radius: 50%;
  }
  .namn {
    font-size: 1.25rem;
  }
</style>
<div class="profil">
  <div class="bild"></div>
  <div class="namn">Alva Lind</div>
</div>
`,
    solution: `<style>
  .profil {
    display: flex;
    gap: 16px;
    align-items: center;
    background-color: aliceblue;
    padding: 16px;
  }
  .bild {
    width: 80px;
    height: 80px;
    background-color: steelblue;
    border-radius: 50%;
  }
  .namn {
    font-size: 1.25rem;
  }
</style>
<div class="profil">
  <div class="bild"></div>
  <div class="namn">Alva Lind</div>
</div>
`,
    hints: [
      'Regeln står på .profil, föräldern.',
      'align-items gäller i höjdled när raden går åt sidan.',
      'align-items: center;',
    ],
    tests: [
      {
        description: '.profil har align-items: center',
        code: "css('.profil', 'align-items')",
        expected: 'center',
      },
      {
        description: 'Namnet står mitt på bildens höjd',
        code: "[rect('.namn').top > rect('.bild').top, Math.abs(rect('.namn').top + rect('.namn').height / 2 - rect('.bild').top - 40) <= 1]",
        expected: [true, true],
      },
    ],
  },
  {
    id: 'flexbox-05',
    track: 'flexbox',
    title: 'Ett sidhuvud',
    xp: 25,
    description:
      'Nästan alla sajter har samma sidhuvud: loggan till vänster och menyn till höger. Nu kan du bygga det.',
    explain:
      'En flexbox kan ligga inuti en annan:\n\n- `header` är en flexbox med två barn: loggan och `nav`. `space-between` skjuter dem till var sin kant.\n- `nav` är *också* en flexbox, så att länkarna står på rad med `gap` emellan.\n\n`align-items: center` på `header` gör att loggan och länkarna står i linje fast loggan är större.',
    example:
      'header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\nnav {\n  display: flex;\n  gap: 24px;\n}',
    task: 'Uppgift: Gör `header` till en flexbox med loggan till vänster och menyn till höger, mitt på höjden. Gör `nav` till en flexbox med `24px` mellan länkarna.',
    starterCode: `<style>
  header {
    background-color: midnightblue;
    padding: 16px 24px;
  }
  header a {
    color: white;
    text-decoration: none;
  }
  .logga {
    font-size: 1.5rem;
    font-weight: bold;
  }
</style>
<header>
  <a class="logga" href="#">🚲 Cykelverkstan</a>
  <nav>
    <a href="#">Reparationer</a>
    <a href="#">Priser</a>
    <a href="#">Hitta hit</a>
  </nav>
</header>
`,
    solution: `<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: midnightblue;
    padding: 16px 24px;
  }
  nav {
    display: flex;
    gap: 24px;
  }
  header a {
    color: white;
    text-decoration: none;
  }
  .logga {
    font-size: 1.5rem;
    font-weight: bold;
  }
</style>
<header>
  <a class="logga" href="#">🚲 Cykelverkstan</a>
  <nav>
    <a href="#">Reparationer</a>
    <a href="#">Priser</a>
    <a href="#">Hitta hit</a>
  </nav>
</header>
`,
    hints: [
      'Två flexboxar: header och nav.',
      'header behöver justify-content och align-items, nav behöver gap.',
      'header { display: flex; justify-content: space-between; align-items: center; }\nnav { display: flex; gap: 24px; }',
    ],
    tests: [
      {
        description: 'Loggan och menyn står på samma rad',
        code: "rows('header > *')",
        expected: 1,
      },
      {
        description: 'Menyn står ända ut till höger',
        code: "Math.abs(rect('header').left + rect('header').width - 24 - rect('nav a:last-child').left - rect('nav a:last-child').width) <= 1",
        expected: true,
      },
      {
        description: 'Länkarna i menyn står på en rad med 24px emellan',
        code: "[rows('nav a'), gapX('nav a')]",
        expected: [1, 24],
      },
      {
        description: 'header har align-items: center',
        code: "css('header', 'align-items')",
        expected: 'center',
      },
    ],
  },
  {
    id: 'flexbox-06',
    track: 'flexbox',
    title: 'Uppifrån och ner',
    xp: 20,
    description:
      'En flexbox behöver inte gå åt sidan. Den kan också gå nedåt – med gap emellan.',
    explain:
      '`flex-direction` bestämmer åt vilket håll raden går:\n\n- `row` – åt sidan (det vanliga)\n- `column` – nedåt\n\nMed `column` byter `justify-content` och `align-items` plats: `justify-content` gäller nu i höjdled och `align-items` åt sidan.\n\nVarför inte bara låta blocken stå under varandra? Med `column` och `gap` får du jämn luft mellan allt, även `span` och länkar.',
    example:
      '.lista {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}',
    task: 'Uppgift: Gör `.steg` till en flexbox som går nedåt med `12px` emellan.',
    starterCode: `<style>
  .steg span {
    background-color: honeydew;
    padding: 8px;
    border-left: 4px solid seagreen;
  }
  /* Skriv regeln för .steg här */
</style>
<h2>Så gör du en smoothie</h2>
<div class="steg">
  <span>1. Skala bananen</span>
  <span>2. Häll i bär och mjölk</span>
  <span>3. Mixa i en minut</span>
</div>
`,
    solution: `<style>
  .steg span {
    background-color: honeydew;
    padding: 8px;
    border-left: 4px solid seagreen;
  }
  .steg {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
</style>
<h2>Så gör du en smoothie</h2>
<div class="steg">
  <span>1. Skala bananen</span>
  <span>2. Häll i bär och mjölk</span>
  <span>3. Mixa i en minut</span>
</div>
`,
    hints: [
      'Tre egenskaper i en ny regel för .steg.',
      'flex-direction: column gör att raden går nedåt.',
      '.steg { display: flex; flex-direction: column; gap: 12px; }',
    ],
    tests: [
      {
        description: 'Stegen står under varandra',
        code: "[css('.steg', 'flex-direction'), rows('.steg span')]",
        expected: ['column', 3],
      },
      {
        description: 'Det är 12px mellan stegen',
        code: "gapY('.steg span')",
        expected: 12,
      },
    ],
  },
  {
    id: 'flexbox-07',
    track: 'flexbox',
    title: 'flex-wrap – ny rad',
    xp: 20,
    description:
      'Sex bilder på en rad blir för smala. När de inte får plats ska de fortsätta på nästa rad.',
    explain:
      'En flexbox försöker få plats med allt på en rad. Den krymper hellre sakerna än byter rad – även när de har en bredd.\n\n`flex-wrap: wrap` låter sakerna gå vidare på en ny rad när de inte får plats. `gap` ger då luft både åt sidan och mellan raderna.\n\nSå görs gallerier och produktlistor: lika breda kort som fyller så många rader som behövs.',
    example:
      '.galleri {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}',
    task: 'Uppgift: Låt bilderna i `.galleri` gå vidare på nya rader med `flex-wrap`. Ge `16px` luft åt alla håll med `gap`.',
    starterCode: `<style>
  .galleri {
    display: flex;
  }
  .bild {
    width: 200px;
    height: 120px;
    background-color: lightsalmon;
    border-radius: 8px;
  }
</style>
<div class="galleri">
  <div class="bild">🏔️</div>
  <div class="bild">🌊</div>
  <div class="bild">🌲</div>
  <div class="bild">🏜️</div>
  <div class="bild">🌋</div>
  <div class="bild">🏝️</div>
</div>
`,
    solution: `<style>
  .galleri {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  .bild {
    width: 200px;
    height: 120px;
    background-color: lightsalmon;
    border-radius: 8px;
  }
</style>
<div class="galleri">
  <div class="bild">🏔️</div>
  <div class="bild">🌊</div>
  <div class="bild">🌲</div>
  <div class="bild">🏜️</div>
  <div class="bild">🌋</div>
  <div class="bild">🏝️</div>
</div>
`,
    hints: [
      'Båda raderna ska in i regeln för .galleri.',
      'Värdet för flex-wrap är wrap.',
      'flex-wrap: wrap;\ngap: 16px;',
    ],
    tests: [
      {
        description: 'Bilderna är 200px breda, inte hopkrympta',
        code: "widths('.bild')[0]",
        expected: 200,
      },
      {
        description: 'Bilderna står på två rader, tre i varje',
        code: "[rows('.bild'), perRow('.bild')]",
        expected: [2, 3],
      },
      {
        description: 'Det är 16px luft åt sidan och mellan raderna',
        code: "[gapX('.bild'), gapY('.bild')]",
        expected: [16, 16],
      },
    ],
  },
  {
    id: 'flexbox-08',
    track: 'flexbox',
    title: 'flex: 1 – ta resten',
    xp: 25,
    description:
      'Menyn till vänster ska vara 200 pixlar bred. Texten bredvid ska ta all plats som blir över.',
    explain:
      '`flex: 1` på ett flexelement betyder "ta den plats som blir över".\n\nHar två element `flex: 1` delar de lika. Har ett `flex: 2` och ett `flex: 1` får det första dubbelt så mycket.\n\nUtan `flex: 1` blir det konstigt när texten är lång: flexboxen krymper *alla* för att få plats, även menyn som skulle vara 200 pixlar. När texten tar resten behöver ingenting krympa.',
    example: 'aside {\n  width: 200px;\n}\nmain {\n  flex: 1;\n}',
    task: 'Uppgift: Ge `main` `flex: 1` så att den tar resten av bredden och `aside` blir 200 pixlar.',
    starterCode: `<style>
  .sida {
    display: flex;
    gap: 16px;
  }
  aside {
    width: 200px;
    background-color: wheat;
    padding: 8px;
    box-sizing: border-box;
  }
  main {
    background-color: oldlace;
    padding: 8px;
  }
</style>
<div class="sida">
  <aside>Kapitel 1<br>Kapitel 2<br>Kapitel 3</aside>
  <main>
    Det var en gång en drake som inte kunde spruta eld. Varje morgon försökte
    den, men det kom bara små moln av rök. De andra drakarna skrattade, men en
    dag upptäckte draken att röken var perfekt för att göra de bästa
    rökringarna i hela bergskedjan.
  </main>
</div>
`,
    solution: `<style>
  .sida {
    display: flex;
    gap: 16px;
  }
  aside {
    width: 200px;
    background-color: wheat;
    padding: 8px;
    box-sizing: border-box;
  }
  main {
    flex: 1;
    background-color: oldlace;
    padding: 8px;
  }
</style>
<div class="sida">
  <aside>Kapitel 1<br>Kapitel 2<br>Kapitel 3</aside>
  <main>
    Det var en gång en drake som inte kunde spruta eld. Varje morgon försökte
    den, men det kom bara små moln av rök. De andra drakarna skrattade, men en
    dag upptäckte draken att röken var perfekt för att göra de bästa
    rökringarna i hela bergskedjan.
  </main>
</div>
`,
    hints: [
      'flex: 1 skrivs på main, elementet som ska växa – inte på .sida.',
      'Det är ett tal utan enhet.',
      'main { flex: 1; }',
    ],
    tests: [
      {
        description: 'Menyn är 200px bred',
        code: "widths('aside')[0]",
        expected: 200,
      },
      {
        description: 'main tar resten av bredden',
        code: "widths('.sida')[0] - widths('aside')[0] - 16 - widths('main')[0]",
        expected: 0,
      },
    ],
  },
  {
    id: 'flexbox-09',
    track: 'flexbox',
    title: 'Laga menyn',
    xp: 25,
    description:
      'Menyn ska ha loggan till vänster och länkarna till höger, på en rad. Men det har blivit tre fel.',
    explain:
      'När en flexbox inte gör som du tänkt:\n\n- Står `display: flex` på **föräldern**? Alla andra flex-egenskaper gör ingenting utan den.\n- Är egenskapen och värdet rätt stavade? Ett felstavat *värde* får ingen gul ruta – webbläsaren struntar tyst i det.\n- Har talen en enhet?\n\nHåll musen över en egenskap eller ett värde i editorn så förklaras det.',
    example: '.meny {\n  display: flex;\n  justify-content: space-between;\n}',
    task: 'Uppgift: Laga de tre felen så att loggan och länkarna står på en rad, utspridda till var sin kant, med `16px` mellan länkarna.',
    starterCode: `<style>
  .meny {
    dispaly: flex;
    justify-content: space-betwen;
    background-color: darkslategray;
    padding: 12px;
  }
  .lankar {
    display: flex;
    gap: 16;
  }
  .meny a {
    color: white;
  }
</style>
<div class="meny">
  <a href="#">🎸 Bandet</a>
  <div class="lankar">
    <a href="#">Låtar</a>
    <a href="#">Spelningar</a>
    <a href="#">Kontakt</a>
  </div>
</div>
`,
    solution: `<style>
  .meny {
    display: flex;
    justify-content: space-between;
    background-color: darkslategray;
    padding: 12px;
  }
  .lankar {
    display: flex;
    gap: 16px;
  }
  .meny a {
    color: white;
  }
</style>
<div class="meny">
  <a href="#">🎸 Bandet</a>
  <div class="lankar">
    <a href="#">Låtar</a>
    <a href="#">Spelningar</a>
    <a href="#">Kontakt</a>
  </div>
</div>
`,
    hints: [
      'Läs den gula rutan – två av felen står där.',
      'Det tredje felet är ett värde med en bokstav för lite.',
      'display, space-between och 16px.',
    ],
    tests: [
      {
        description: 'Loggan och länkarna står på en rad',
        code: "rows('.meny > *')",
        expected: 1,
      },
      {
        description: 'De står utspridda till var sin kant',
        code: "css('.meny', 'justify-content')",
        expected: 'space-between',
      },
      {
        description: 'Det är 16px mellan länkarna',
        code: "gapX('.lankar a')",
        expected: 16,
      },
    ],
  },
];
