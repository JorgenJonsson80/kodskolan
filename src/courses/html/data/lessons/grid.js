// Bana 9: grid. Layouten rättas med perRow(), widths() m.fl. i riktig
// Chrome. Behållarna har oftast en fast bredd, så att kolumnerna får
// jämna mått att testa.

export const GRID = [
  {
    id: 'grid-01',
    track: 'grid',
    title: 'Ett rutnät',
    xp: 15,
    description:
      'Flexbox lägger saker på en rad. Grid lägger dem i rader *och* kolumner – som ett rutat papper.',
    explain:
      '`display: grid` gör föräldern till ett rutnät. `grid-template-columns` säger hur många kolumner det har och hur breda de är – ett mått per kolumn.\n\n`grid-template-columns: 150px 150px 150px` ger tre kolumner. Barnen fyller dem från vänster, och när raden är full börjar nästa rad av sig själv.',
    example:
      '.lador {\n  display: grid;\n  grid-template-columns: 150px 150px 150px;\n}',
    task: 'Uppgift: Gör `.lador` till ett grid med tre kolumner som är `150px` breda.',
    starterCode: `<style>
  .lada {
    background-color: peachpuff;
    border: 2px solid white;
    padding: 16px;
    text-align: center;
  }
  /* Skriv regeln för .lador här */
</style>
<div class="lador">
  <div class="lada">🍎</div>
  <div class="lada">🍐</div>
  <div class="lada">🍊</div>
  <div class="lada">🍋</div>
  <div class="lada">🍌</div>
  <div class="lada">🍉</div>
</div>
`,
    solution: `<style>
  .lada {
    background-color: peachpuff;
    border: 2px solid white;
    padding: 16px;
    text-align: center;
  }
  .lador {
    display: grid;
    grid-template-columns: 150px 150px 150px;
  }
</style>
<div class="lador">
  <div class="lada">🍎</div>
  <div class="lada">🍐</div>
  <div class="lada">🍊</div>
  <div class="lada">🍋</div>
  <div class="lada">🍌</div>
  <div class="lada">🍉</div>
</div>
`,
    hints: [
      'Två egenskaper i en ny regel för .lador.',
      'grid-template-columns har ett mått per kolumn, med mellanslag emellan.',
      '.lador { display: grid; grid-template-columns: 150px 150px 150px; }',
    ],
    tests: [
      {
        description: '.lador är ett grid',
        code: "css('.lador', 'display')",
        expected: 'grid',
      },
      {
        description: 'Lådorna står i tre kolumner och två rader',
        code: "[perRow('.lada'), rows('.lada')]",
        expected: [3, 2],
      },
      {
        description: 'Kolumnerna är 150px breda',
        code: "widths('.lada')[0]",
        expected: 150,
      },
    ],
  },
  {
    id: 'grid-02',
    track: 'grid',
    title: 'fr – andelar',
    xp: 20,
    description:
      'Med pixlar måste du räkna själv. Med `fr` delar griddet upp platsen åt dig.',
    explain:
      '`fr` betyder *fraction*, en andel av den lediga platsen.\n\n- `1fr 1fr 1fr` – tre lika breda kolumner\n- `1fr 2fr 1fr` – mittenkolumnen får dubbelt så mycket som de andra\n- `200px 1fr` – en fast kolumn, och resten till den andra\n\nRäkna: 600 pixlar delat i 1 + 2 + 1 = 4 andelar blir 150, 300 och 150.',
    example:
      '.sida {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;\n}',
    task: 'Uppgift: Ändra kolumnerna i `.sida` till `1fr 2fr 1fr`, så att mitten blir dubbelt så bred.',
    starterCode: `<style>
  .sida {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 600px;
  }
  .sida div {
    padding: 16px;
  }
  .meny { background-color: lightsteelblue; }
  .artikel { background-color: white; }
  .reklam { background-color: lightsteelblue; }
</style>
<div class="sida">
  <div class="meny">Meny</div>
  <div class="artikel">Dagens artikel: Varför har zebror ränder?</div>
  <div class="reklam">Köp glass!</div>
</div>
`,
    solution: `<style>
  .sida {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    width: 600px;
  }
  .sida div {
    padding: 16px;
  }
  .meny { background-color: lightsteelblue; }
  .artikel { background-color: white; }
  .reklam { background-color: lightsteelblue; }
</style>
<div class="sida">
  <div class="meny">Meny</div>
  <div class="artikel">Dagens artikel: Varför har zebror ränder?</div>
  <div class="reklam">Köp glass!</div>
</div>
`,
    hints: [
      'Ändra bara grid-template-columns.',
      'Mittenkolumnen ska ha 2fr.',
      'grid-template-columns: 1fr 2fr 1fr;',
    ],
    tests: [
      {
        description: 'Kolumnerna är 150, 300 och 150 pixlar',
        code: "widths('.sida > div')",
        expected: [150, 300, 150],
      },
    ],
  },
  {
    id: 'grid-03',
    track: 'grid',
    title: 'gap i ett grid',
    xp: 15,
    description:
      'Rutorna i griddet sitter ihop. Ge dem luft – olika mycket mellan raderna och kolumnerna.',
    explain:
      '`gap` fungerar likadant i grid som i flexbox: luft mellan sakerna, aldrig ytterst.\n\n- Ett värde gäller både mellan raderna och kolumnerna: `gap: 16px`\n- Två värden: först mellan raderna, sedan mellan kolumnerna: `gap: 24px 12px`\n\nDet finns också `row-gap` och `column-gap` om du bara vill sätta det ena.',
    example: '.tavla {\n  gap: 24px 12px;\n}',
    task: 'Uppgift: Ge `.tavla` `24px` mellan raderna och `12px` mellan kolumnerna, med en enda `gap`.',
    starterCode: `<style>
  .tavla {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 360px;
  }
  .tavla div {
    background-color: palegreen;
    padding: 24px 0;
    text-align: center;
  }
</style>
<div class="tavla">
  <div>1</div><div>2</div><div>3</div>
  <div>4</div><div>5</div><div>6</div>
</div>
`,
    solution: `<style>
  .tavla {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 24px 12px;
    width: 360px;
  }
  .tavla div {
    background-color: palegreen;
    padding: 24px 0;
    text-align: center;
  }
</style>
<div class="tavla">
  <div>1</div><div>2</div><div>3</div>
  <div>4</div><div>5</div><div>6</div>
</div>
`,
    hints: [
      'gap står på .tavla, föräldern.',
      'Två värden: raderna först, sedan kolumnerna.',
      'gap: 24px 12px;',
    ],
    tests: [
      {
        description: 'Det är 24px mellan raderna',
        code: "gapY('.tavla div')",
        expected: 24,
      },
      {
        description: 'Det är 12px mellan kolumnerna',
        code: "gapX('.tavla div')",
        expected: 12,
      },
    ],
  },
  {
    id: 'grid-04',
    track: 'grid',
    title: 'repeat()',
    xp: 20,
    description:
      'En vecka har sju dagar. Att skriva `1fr` sju gånger är tråkigt – och lätt att räkna fel.',
    explain:
      '`repeat(antal, mått)` skriver samma kolumn många gånger åt dig.\n\n- `repeat(7, 1fr)` är samma sak som `1fr 1fr 1fr 1fr 1fr 1fr 1fr`\n- `repeat(3, 100px)` blir tre kolumner på 100 pixlar\n\nDet går också att blanda: `200px repeat(2, 1fr)`.',
    example: '.kalender {\n  grid-template-columns: repeat(7, 1fr);\n}',
    task: 'Uppgift: Ge `.kalender` sju lika breda kolumner med `repeat()`.',
    starterCode: `<style>
  .kalender {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 4px;
    width: 448px;
  }
  .kalender div {
    background-color: lavenderblush;
    padding: 8px 0;
    text-align: center;
  }
</style>
<div class="kalender">
  <div>Mån</div><div>Tis</div><div>Ons</div><div>Tor</div><div>Fre</div><div>Lör</div><div>Sön</div>
  <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div>
</div>
`,
    solution: `<style>
  .kalender {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    width: 448px;
  }
  .kalender div {
    background-color: lavenderblush;
    padding: 8px 0;
    text-align: center;
  }
</style>
<div class="kalender">
  <div>Mån</div><div>Tis</div><div>Ons</div><div>Tor</div><div>Fre</div><div>Lör</div><div>Sön</div>
  <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div>
</div>
`,
    hints: [
      'Ändra grid-template-columns.',
      'Först antalet, sedan måttet, med komma emellan.',
      'grid-template-columns: repeat(7, 1fr);',
    ],
    tests: [
      {
        description: 'Kalendern har sju kolumner och två rader',
        code: "[perRow('.kalender div'), rows('.kalender div')]",
        expected: [7, 2],
      },
      {
        description: 'Alla dagar är lika breda',
        code: "new Set(widths('.kalender div')).size",
        expected: 1,
      },
    ],
  },
  {
    id: 'grid-05',
    track: 'grid',
    title: 'En bred ruta',
    xp: 20,
    description:
      'Den viktigaste nyheten ska synas mest. Den ska ta två kolumner i stället för en.',
    explain:
      'Ett barn i griddet kan ta mer än en ruta. `grid-column: span 2` gör att det sträcker sig över två kolumner.\n\nDe andra barnen flyttar sig och fyller de rutor som är kvar.\n\nRegeln skrivs på **barnet** som ska bli bredare – inte på griddet.',
    example: '.topp {\n  grid-column: span 2;\n}',
    task: 'Uppgift: Låt `.topp` sträcka sig över två kolumner.',
    starterCode: `<style>
  .nyheter {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    width: 600px;
  }
  .nyheter div {
    background-color: whitesmoke;
    padding: 12px;
  }
  .topp {
    background-color: gold;
  }
</style>
<div class="nyheter">
  <div class="topp">⭐ Skolan vann fotbollscupen!</div>
  <div>Ny meny i matsalen</div>
  <div>Bokcirkeln startar</div>
  <div>Disco på fredag</div>
  <div>Hittegods i entrén</div>
</div>
`,
    solution: `<style>
  .nyheter {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    width: 600px;
  }
  .nyheter div {
    background-color: whitesmoke;
    padding: 12px;
  }
  .topp {
    background-color: gold;
    grid-column: span 2;
  }
</style>
<div class="nyheter">
  <div class="topp">⭐ Skolan vann fotbollscupen!</div>
  <div>Ny meny i matsalen</div>
  <div>Bokcirkeln startar</div>
  <div>Disco på fredag</div>
  <div>Hittegods i entrén</div>
</div>
`,
    hints: [
      'Regeln står på .topp, barnet.',
      'span 2 betyder "sträck dig över två".',
      'grid-column: span 2;',
    ],
    tests: [
      {
        description: 'Toppnyheten är två kolumner bred, med gap emellan',
        code: "widths('.topp')[0]",
        expected: 396,
      },
      {
        description: 'Första raden har toppnyheten och en till',
        code: "[perRow('.nyheter div'), rows('.nyheter div')]",
        expected: [2, 2],
      },
    ],
  },
  {
    id: 'grid-06',
    track: 'grid',
    title: 'En hög ruta',
    xp: 20,
    description:
      'Bilden av giraffen passar inte i en vanlig ruta. Den behöver vara två rader hög.',
    explain:
      'Det som fungerar för kolumner fungerar för rader: `grid-row: span 2` gör barnet två rader högt.\n\n`grid-auto-rows: 100px` på griddet gör alla rader 100 pixlar höga. Utan den bestämmer innehållet hur hög varje rad blir.\n\nEn ruta som är två rader hög blir alltså 100 + 100 pixlar, plus `gap` emellan.',
    example: '.giraff {\n  grid-row: span 2;\n}',
    task: 'Uppgift: Låt `.giraff` sträcka sig över två rader.',
    starterCode: `<style>
  .djur {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 100px;
    gap: 10px;
    width: 480px;
  }
  .djur div {
    background-color: khaki;
    font-size: 2rem;
    text-align: center;
  }
</style>
<div class="djur">
  <div class="giraff">🦒</div>
  <div>🦓</div>
  <div>🐘</div>
  <div>🦁</div>
  <div>🦛</div>
</div>
`,
    solution: `<style>
  .djur {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 100px;
    gap: 10px;
    width: 480px;
  }
  .djur div {
    background-color: khaki;
    font-size: 2rem;
    text-align: center;
  }
  .giraff {
    grid-row: span 2;
  }
</style>
<div class="djur">
  <div class="giraff">🦒</div>
  <div>🦓</div>
  <div>🐘</div>
  <div>🦁</div>
  <div>🦛</div>
</div>
`,
    hints: [
      'Skriv en ny regel för .giraff.',
      'Som span 2 för kolumner, men med grid-row.',
      '.giraff { grid-row: span 2; }',
    ],
    tests: [
      {
        description: 'Giraffen är två rader hög, med gap emellan',
        code: "heights('.giraff')[0]",
        expected: 210,
      },
      {
        description: 'De andra djuren står bredvid giraffen',
        code: "inOrder('.djur div')",
        expected: ['🦒', '🦓', '🐘', '🦁', '🦛'],
      },
    ],
  },
  {
    id: 'grid-07',
    track: 'grid',
    title: 'Områden med namn',
    xp: 25,
    description:
      'I stället för att räkna kolumner kan du rita upp sidan med ord.',
    explain:
      '`grid-template-areas` ritar griddet rad för rad. Varje rad står inom citattecken, och varje ord är en ruta: `"huvud huvud" "meny innehall"` är två rader med två rutor i varje.\n\nSamma ord två gånger betyder att rutan sträcker sig över båda. Sedan säger du vilket område varje barn ska hamna i med `grid-area: huvud`.\n\nNamnen hittar du på själv. Använd inga å, ä eller ö.',
    example:
      '.sida {\n  grid-template-areas:\n    "huvud huvud"\n    "meny innehall";\n}\nheader { grid-area: huvud; }',
    task: 'Uppgift: Rita upp `.sida` med `huvud` överst över båda kolumnerna, och `meny` och `innehall` under. Placera `header`, `nav` och `main` i sina områden.',
    starterCode: `<style>
  .sida {
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 8px;
  }
  header { background-color: tomato; padding: 12px; }
  nav { background-color: orange; padding: 12px; }
  main { background-color: lightyellow; padding: 12px; }
</style>
<div class="sida">
  <header>Receptsidan</header>
  <nav>Middag<br>Efterrätt</nav>
  <main>Välj ett recept i menyn.</main>
</div>
`,
    solution: `<style>
  .sida {
    display: grid;
    grid-template-columns: 150px 1fr;
    grid-template-areas:
      "huvud huvud"
      "meny innehall";
    gap: 8px;
  }
  header { background-color: tomato; padding: 12px; grid-area: huvud; }
  nav { background-color: orange; padding: 12px; grid-area: meny; }
  main { background-color: lightyellow; padding: 12px; grid-area: innehall; }
</style>
<div class="sida">
  <header>Receptsidan</header>
  <nav>Middag<br>Efterrätt</nav>
  <main>Välj ett recept i menyn.</main>
</div>
`,
    hints: [
      'grid-template-areas står på .sida, grid-area på varje barn.',
      'Två rader inom citattecken: "huvud huvud" och "meny innehall".',
      'header { grid-area: huvud; }\nnav { grid-area: meny; }\nmain { grid-area: innehall; }',
    ],
    tests: [
      {
        description: 'Sidhuvudet går över hela bredden',
        code: "widths('header')[0] === widths('.sida')[0]",
        expected: true,
      },
      {
        description: 'Menyn och innehållet står bredvid varandra under',
        code: "[rows('nav, main'), inOrder('.sida > *')]",
        expected: [
          1,
          ['Receptsidan', 'MiddagEfterrätt', 'Välj ett recept i menyn.'],
        ],
      },
      {
        description: 'Menyn är 150px bred',
        code: "widths('nav')[0]",
        expected: 150,
      },
    ],
  },
  {
    id: 'grid-08',
    track: 'grid',
    title: 'En hel sida',
    xp: 25,
    description:
      'Nu bygger du hela sidans skelett själv: sidhuvud, meny, innehåll och sidfot.',
    explain:
      'De flesta sajter har samma form:\n\n- sidhuvudet överst över hela bredden\n- en meny och innehållet bredvid varandra\n- sidfoten längst ner över hela bredden\n\nMed `grid-template-areas` blir det tre rader. Den mittersta raden blir så hög som innehållet, och de andra så höga som de behöver.',
    example:
      '.sida {\n  display: grid;\n  grid-template-columns: 180px 1fr;\n  grid-template-areas:\n    "huvud huvud"\n    "meny innehall"\n    "fot fot";\n}',
    task: 'Uppgift: Gör `.sida` till ett grid med kolumnerna `180px 1fr`, `gap: 8px` och tre rader: `huvud` överst, `meny` och `innehall` i mitten och `fot` längst ner. Placera de fyra delarna.',
    starterCode: `<style>
  header { background-color: teal; color: white; padding: 12px; }
  nav { background-color: paleturquoise; padding: 12px; }
  main { background-color: white; padding: 12px; }
  footer { background-color: teal; color: white; padding: 12px; }
</style>
<div class="sida">
  <header>🐠 Akvarieklubben</header>
  <nav>Fiskar<br>Växter<br>Tips</nav>
  <main>Välkommen! Här skriver vi om allt som simmar.</main>
  <footer>Kontakt: fisk@exempel.se</footer>
</div>
`,
    solution: `<style>
  .sida {
    display: grid;
    grid-template-columns: 180px 1fr;
    grid-template-areas:
      "huvud huvud"
      "meny innehall"
      "fot fot";
    gap: 8px;
  }
  header { background-color: teal; color: white; padding: 12px; grid-area: huvud; }
  nav { background-color: paleturquoise; padding: 12px; grid-area: meny; }
  main { background-color: white; padding: 12px; grid-area: innehall; }
  footer { background-color: teal; color: white; padding: 12px; grid-area: fot; }
</style>
<div class="sida">
  <header>🐠 Akvarieklubben</header>
  <nav>Fiskar<br>Växter<br>Tips</nav>
  <main>Välkommen! Här skriver vi om allt som simmar.</main>
  <footer>Kontakt: fisk@exempel.se</footer>
</div>
`,
    hints: [
      'Börja med en regel för .sida med display, kolumner, områden och gap.',
      'Tre rader inom citattecken. Sedan grid-area på varje del.',
      '"huvud huvud" "meny innehall" "fot fot" – och grid-area: fot; på footer.',
    ],
    tests: [
      {
        description: 'Sidhuvudet och sidfoten går över hela bredden',
        code: "[widths('header')[0], widths('footer')[0]].every(width => width === widths('.sida')[0])",
        expected: true,
      },
      {
        description: 'Menyn (180px) och innehållet står bredvid varandra',
        code: "[rows('nav, main'), widths('nav')[0]]",
        expected: [1, 180],
      },
      {
        description: 'Delarna står i rätt ordning med 8px emellan',
        code: "[rows('.sida > *'), gapY('header, nav')]",
        expected: [3, 8],
      },
    ],
  },
  {
    id: 'grid-09',
    track: 'grid',
    title: 'Laga galleriet',
    xp: 25,
    description:
      'Galleriet ska ha tre kolumner med 10 pixlar emellan. Men det står bara en bild per rad – tre saker är fel.',
    explain:
      'Ett grid som inte fungerar har ofta något av de här felen:\n\n- `display: grid` är felstavat eller saknas – allt annat gör då ingenting\n- `grid-template-columns` är felstavat – det är ett långt ord\n- ett tal saknar enhet\n\nEtt felstavat *värde*, som `display: gird`, får ingen gul ruta. Läs varje rad noga.',
    example:
      '.galleri {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 10px;\n}',
    task: 'Uppgift: Laga de tre felen så att galleriet får tre kolumner med `10px` emellan.',
    starterCode: `<style>
  .galleri {
    display: gird;
    grid-template-colums: repeat(3, 1fr);
    gap: 10;
    width: 500px;
  }
  .galleri div {
    background-color: thistle;
    height: 80px;
    font-size: 2rem;
    text-align: center;
  }
</style>
<div class="galleri">
  <div>🌸</div>
  <div>🌻</div>
  <div>🌷</div>
  <div>🌹</div>
  <div>🌼</div>
  <div>🪻</div>
</div>
`,
    solution: `<style>
  .galleri {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    width: 500px;
  }
  .galleri div {
    background-color: thistle;
    height: 80px;
    font-size: 2rem;
    text-align: center;
  }
</style>
<div class="galleri">
  <div>🌸</div>
  <div>🌻</div>
  <div>🌷</div>
  <div>🌹</div>
  <div>🌼</div>
  <div>🪻</div>
</div>
`,
    hints: [
      'Läs den gula rutan – två av felen står där.',
      'Det tredje felet är ett värde där två bokstäver bytt plats.',
      'display: grid, grid-template-columns och 10px.',
    ],
    tests: [
      {
        description: 'Galleriet har tre kolumner och två rader',
        code: "[perRow('.galleri div'), rows('.galleri div')]",
        expected: [3, 2],
      },
      {
        description: 'Det är 10px mellan bilderna åt alla håll',
        code: "[gapX('.galleri div'), gapY('.galleri div')]",
        expected: [10, 10],
      },
    ],
  },
];
