// Bana 1: taggar, rubriker, stycken, fet och kursiv. Ingen CSS än (bana 6),
// inga länkar eller bilder (bana 2) och inga listor (bana 3).
export const GRUNDER = [
  {
    id: 'grunder-01',
    track: 'grunder',
    title: 'Din första tagg',
    xp: 10,
    description:
      'En webbsida är text med taggar runt. Taggarna säger till webbläsaren vad varje bit är: en rubrik, ett stycke, en länk.',
    explain:
      'En tagg skrivs inom `<` och `>`. De flesta taggar kommer i par: `<h1>` öppnar och `</h1>` stänger, med ett snedstreck. Det som står mellan dem är innehållet.\n\n`h1` betyder rubrik på nivå 1, sidans största rubrik. Webbläsaren gör den stor och fet av sig själv – du ser det i rutan under editorn medan du skriver.',
    example: '<h1>Välkommen!</h1>',
    task: 'Uppgift: Skriv en rubrik med `h1` som säger `Hej, världen!`.',
    starterCode: '<!-- Skriv din kod här -->\n',
    solution: '<h1>Hej, världen!</h1>\n',
    hints: [
      'Rubriken börjar med <h1> och slutar med </h1>.',
      'Texten står mellan taggarna, utan citattecken.',
      '<h1>Hej, …</h1> – fyll i resten, med kommatecken och utropstecken.',
    ],
    tests: [
      { description: 'Det finns en h1', code: "count('h1')", expected: 1 },
      {
        description: 'Rubriken säger Hej, världen!',
        code: "text('h1')",
        expected: 'Hej, världen!',
      },
    ],
  },
  {
    id: 'grunder-02',
    track: 'grunder',
    title: 'Rubriker och stycken',
    xp: 10,
    description:
      'En sida har oftast en stor rubrik överst, mindre rubriker för varje del och vanlig text i stycken.',
    explain:
      'Rubriker finns i sex storlekar, från `<h1>` (störst) till `<h6>`. Använd dem i ordning: en `h1` för hela sidan och `h2` för delarna under.\n\nVanlig text står i `<p>`, ett stycke (paragraph). Webbläsaren bryr sig inte om radbrytningar i koden – vill du ha ett nytt stycke skriver du en ny `<p>`.',
    example: '<h1>Mitt kök</h1>\n<h2>Frukost</h2>\n<p>Gröt med äpple.</p>',
    task: 'Uppgift: Skriv rubriken `Min blogg` med `h1`, under den `Första inlägget` med `h2` och sist stycket `Idag lärde jag mig HTML.` med `p`.',
    starterCode: '<!-- Skriv din kod här -->\n',
    solution:
      '<h1>Min blogg</h1>\n<h2>Första inlägget</h2>\n<p>Idag lärde jag mig HTML.</p>\n',
    hints: [
      'Du behöver tre taggar: h1, h2 och p, i den ordningen.',
      'Varje tagg öppnas och stängs: <h2>…</h2>.',
      '<p>Idag lärde jag mig HTML.</p> blir stycket. Glöm inte punkten.',
    ],
    tests: [
      {
        description: 'h1 säger Min blogg',
        code: "text('h1')",
        expected: 'Min blogg',
      },
      {
        description: 'h2 säger Första inlägget',
        code: "text('h2')",
        expected: 'Första inlägget',
      },
      {
        description: 'Stycket säger Idag lärde jag mig HTML.',
        code: "text('p')",
        expected: 'Idag lärde jag mig HTML.',
      },
    ],
  },
  {
    id: 'grunder-03',
    track: 'grunder',
    title: 'Fet och kursiv',
    xp: 15,
    description:
      'Taggar kan ligga inuti andra taggar. Så gör du ett ord viktigt mitt i en mening.',
    explain:
      '`<strong>` betyder att något är viktigt, och webbläsaren visar det fetstilt. `<em>` betyder betoning och visas kursivt.\n\nDe ligger inuti stycket: `<p>Det är <strong>varmt</strong> idag.</p>`. Stäng den inre taggen innan den yttre – som lådor i lådor.',
    example:
      '<p>Ät <strong>inte</strong> den gula snön, <em>någonsin</em>.</p>',
    task: 'Uppgift: Skriv stycket `Stäng alltid dina taggar, men aldrig för tidigt.` där ordet `alltid` står i `strong` och `aldrig` i `em`.',
    starterCode: '<!-- Skriv din kod här -->\n',
    solution:
      '<p>Stäng <strong>alltid</strong> dina taggar, men <em>aldrig</em> för tidigt.</p>\n',
    hints: [
      'Hela meningen står i ett <p>. Ordet alltid får en <strong> runt sig.',
      'Mellanslagen står utanför de inre taggarna: Stäng <strong>alltid</strong> dina …',
      'aldrig skrivs som <em>aldrig</em>, mitt i meningen.',
    ],
    tests: [
      {
        description: 'Stycket har hela meningen',
        code: "text('p')",
        expected: 'Stäng alltid dina taggar, men aldrig för tidigt.',
      },
      {
        description: 'alltid står i strong',
        code: "text('p strong')",
        expected: 'alltid',
      },
      {
        description: 'aldrig står i em',
        code: "text('p em')",
        expected: 'aldrig',
      },
    ],
  },
  {
    id: 'grunder-04',
    track: 'grunder',
    title: 'Rubriknivåer',
    xp: 15,
    description:
      'Rubrikerna är sidans innehållsförteckning. Skärmläsare och Google läser dem för att förstå hur sidan hänger ihop.',
    explain:
      'Tänk på rubrikerna som en bok: `h1` är bokens titel, `h2` kapitlen och `h3` avsnitten i ett kapitel. En `h3` hör till `h2`:an ovanför sig.\n\nVälj rubrik efter nivå, inte efter storlek. Hoppa inte från `h1` direkt till `h3` för att den ser lagom stor ut – storleken ändrar du med CSS senare.',
    example:
      '<h1>Resan</h1>\n<h2>Dag 1</h2>\n<h3>Frukost</h3>\n<h3>Middag</h3>\n<h2>Dag 2</h2>',
    task: 'Uppgift: Skriv fyra rubriker i den här ordningen: `Mina djur` med `h1`, `Katter` med `h2`, `Måns` med `h3` (en katt) och `Hundar` med `h2`.',
    starterCode: '<!-- Skriv din kod här -->\n',
    solution:
      '<h1>Mina djur</h1>\n<h2>Katter</h2>\n<h3>Måns</h3>\n<h2>Hundar</h2>\n',
    hints: [
      'Fyra rubriker, var och en på sin egen rad: h1, h2, h3, h2.',
      'Måns är en katt, så hans rubrik ligger under Katter och är en nivå mindre.',
      '<h3>Måns</h3> kommer direkt efter <h2>Katter</h2>.',
    ],
    tests: [
      {
        description: 'h1 säger Mina djur',
        code: "text('h1')",
        expected: 'Mina djur',
      },
      {
        description: 'Två h2: Katter och Hundar',
        code: "texts('h2')",
        expected: ['Katter', 'Hundar'],
      },
      {
        description: 'Rubrikerna står i rätt ordning',
        code: "texts('h1, h2, h3')",
        expected: ['Mina djur', 'Katter', 'Måns', 'Hundar'],
      },
    ],
  },
  {
    id: 'grunder-05',
    track: 'grunder',
    title: 'Kommentarer',
    xp: 15,
    description:
      'En kommentar är en lapp i koden till dig själv eller någon annan. Den syns aldrig på sidan.',
    explain:
      'En kommentar börjar med `<!--` och slutar med `-->`. Allt mellan dem hoppar webbläsaren över, även taggar.\n\nDet är praktiskt när du vill gömma något en stund utan att radera det – det kallas att kommentera bort. Startkoden har redan en kommentar: `<!-- Skriv din kod här -->`.',
    example:
      '<!-- Den här rubriken byter jag senare -->\n<h1>Min sida</h1>\n<!-- <p>Inte klart än</p> -->',
    task: 'Uppgift: Stycket med `TODO` är inte klart. Kommentera bort det, så att det står kvar i koden men inte syns på sidan.',
    starterCode:
      '<h1>Min sida</h1>\n<p>Välkommen till min sida!</p>\n<p>TODO: skriv något roligare här</p>\n',
    solution:
      '<h1>Min sida</h1>\n<p>Välkommen till min sida!</p>\n<!-- <p>TODO: skriv något roligare här</p> -->\n',
    hints: [
      'Sätt <!-- före stycket och --> efter det.',
      'Hela raden med <p>…</p> ska ligga inuti kommentaren, taggarna också.',
      '<!-- <p>TODO: …</p> -->',
    ],
    tests: [
      {
        description: 'Bara ett stycke syns på sidan',
        code: "count('p')",
        expected: 1,
      },
      {
        description: 'Det är välkomststycket som syns',
        code: "text('p')",
        expected: 'Välkommen till min sida!',
      },
      {
        description: 'TODO-stycket står kvar i en kommentar',
        code: "[...doc.body.childNodes].some(node => node.nodeType === 8 && node.textContent.includes('TODO'))",
        expected: true,
      },
    ],
  },
  {
    id: 'grunder-06',
    track: 'grunder',
    title: 'Radbrytning och linje',
    xp: 15,
    description:
      'Ibland vill du byta rad mitt i ett stycke, som i en dikt eller en adress. Och ibland vill du dra ett streck mellan två delar.',
    explain:
      '`<br>` (break) byter rad och `<hr>` drar en linje tvärs över sidan. De har inget innehåll, så de stängs aldrig – ingen `</br>`.\n\nNär använder man vad? Ett nytt stycke är en ny `<p>`. `<br>` är bara för rader som hör ihop, som raderna i en dikt.',
    example:
      '<p>Lilla gatan 1<br>\n123 45 Småstad</p>\n<hr>\n<p>Ring gärna!</p>',
    task: 'Uppgift: Skriv dikten i ett enda stycke, med `<br>` mellan raderna:\n`Rosor är röda` / `Violer är blå` / `HTML är kul` / `och CSS också`.\nSätt sedan en `<hr>` och sist stycket `Skriven av mig`.',
    starterCode: '<!-- Skriv din kod här -->\n',
    solution:
      '<p>Rosor är röda<br>\nVioler är blå<br>\nHTML är kul<br>\noch CSS också</p>\n<hr>\n<p>Skriven av mig</p>\n',
    hints: [
      'Dikten står i en <p>, och mellan raderna står <br>.',
      'Fyra rader behöver tre <br>. Efter sista raden kommer </p>.',
      'Efter dikten: <hr> på en egen rad och sedan <p>Skriven av mig</p>.',
    ],
    tests: [
      {
        description: 'Dikten har fyra rader i samma stycke',
        code: "[...($('p')?.childNodes ?? [])].filter(node => node.nodeType === 3).map(node => node.textContent.trim()).filter(Boolean)",
        expected: [
          'Rosor är röda',
          'Violer är blå',
          'HTML är kul',
          'och CSS också',
        ],
      },
      {
        description: 'Tre br mellan raderna',
        code: "count('p br')",
        expected: 3,
      },
      {
        description: 'En linje och sedan Skriven av mig',
        code: "text('hr + p')",
        expected: 'Skriven av mig',
      },
    ],
  },
  {
    id: 'grunder-07',
    track: 'grunder',
    title: 'Mellanslag spelar ingen roll',
    xp: 15,
    description:
      'Webbläsaren slår ihop alla mellanslag och radbrytningar till ett enda mellanslag. Tomma rader i koden blir inga tomma rader på sidan.',
    explain:
      'Skriver du tio mellanslag eller fem tomma rader visar webbläsaren ett mellanslag. Det är bra: du kan dra in och dela upp koden så att den blir lätt att läsa, utan att sidan ändras.\n\nMen det betyder också att du inte kan göra stycken med tomma rader. Varje stycke behöver sin egen `<p>`.',
    example: '<p>Det     här\n\nblir    en    rad.</p>',
    task: 'Uppgift: Titta på sidan – de tre meningarna hamnar på samma rad. Gör om koden så att varje mening blir ett eget stycke.',
    starterCode:
      '<h1>Min dag</h1>\n<p>\nJag vaknade tidigt.\n\nSedan åt jag frukost.\n\nTill sist gick jag till skolan.\n</p>\n',
    solution:
      '<h1>Min dag</h1>\n<p>Jag vaknade tidigt.</p>\n<p>Sedan åt jag frukost.</p>\n<p>Till sist gick jag till skolan.</p>\n',
    hints: [
      'Du behöver tre <p> i stället för en.',
      'Varje mening får en egen <p> före och </p> efter.',
      '<p>Jag vaknade tidigt.</p> är det första stycket.',
    ],
    tests: [
      {
        description: 'Tre stycken',
        code: "count('p')",
        expected: 3,
      },
      {
        description: 'En mening i varje stycke',
        code: "texts('p')",
        expected: [
          'Jag vaknade tidigt.',
          'Sedan åt jag frukost.',
          'Till sist gick jag till skolan.',
        ],
      },
    ],
  },
  {
    id: 'grunder-08',
    track: 'grunder',
    title: 'Specialtecken',
    xp: 20,
    description:
      'Hur skriver man ut `<h1>` som text, när webbläsaren tror att det är en tagg? Med en kod för tecknet.',
    explain:
      'Några tecken betyder något i HTML. De skrivs med en kod som börjar med `&` och slutar med `;`:\n\n- `&lt;` blir `<` (less than)\n- `&gt;` blir `>` (greater than)\n- `&amp;` blir `&`\n- `&copy;` blir `©`\n\nSå `&lt;p&gt;` visar texten `<p>` på sidan i stället för att göra ett stycke.',
    example: '<p>Taggen &lt;p&gt; gör ett stycke.</p>\n<p>Ost &amp; kex</p>',
    task: 'Uppgift: Skriv två stycken. Det första ska visa texten `Rubriker skrivs med <h1>.` – med taggen som text. Det andra ska visa `© 2026 Ada`.',
    starterCode: '<!-- Skriv din kod här -->\n',
    solution:
      '<p>Rubriker skrivs med &lt;h1&gt;.</p>\n<p>&copy; 2026 Ada</p>\n',
    hints: [
      'Skriver du <h1> rakt av blir det en riktig rubrik. Byt < mot &lt; och > mot &gt;.',
      '© skrivs &copy; – glöm inte semikolonet.',
      '<p>Rubriker skrivs med &lt;h1&gt;.</p>',
    ],
    tests: [
      {
        description: 'Det blir ingen rubrik på sidan',
        code: "count('h1')",
        expected: 0,
      },
      {
        description: 'Första stycket visar taggen som text',
        code: "texts('p')[0]",
        expected: 'Rubriker skrivs med <h1>.',
      },
      {
        description: 'Andra stycket säger © 2026 Ada',
        code: "texts('p')[1]",
        expected: '© 2026 Ada',
      },
    ],
  },
  {
    id: 'grunder-09',
    track: 'grunder',
    title: 'Laga sidan',
    xp: 20,
    description:
      'HTML kraschar aldrig. Glömmer du att stänga en tagg gissar webbläsaren i stället – och gissar ofta fel.',
    explain:
      'När en `<strong>` aldrig stängs fortsätter webbläsaren med fet text i nästa stycke, och nästa. Felet syns långt ifrån där det står.\n\nKolla den gula rutan när du trycker på Kör: där står det om en tagg aldrig stängs, och på vilken rad.',
    example: '<p>Bara <strong>det här</strong> är fett.</p>',
    task: 'Uppgift: Hela sidan blev fet, men bara ordet `katt` skulle vara det. Hitta felet och laga det.',
    starterCode:
      '<h1>Mitt husdjur</h1>\n<p>Jag har en <strong>katt som heter Måns.</p>\n<p>Han tycker om att sova i solen.</p>\n<p>Han är <em>väldigt</em> lat.</p>\n',
    solution:
      '<h1>Mitt husdjur</h1>\n<p>Jag har en <strong>katt</strong> som heter Måns.</p>\n<p>Han tycker om att sova i solen.</p>\n<p>Han är <em>väldigt</em> lat.</p>\n',
    hints: [
      'Titta på rad 2. Var börjar den feta texten, och var slutar den?',
      '<strong> öppnas men stängs aldrig. Den behöver en </strong>.',
      '<strong>katt</strong> som heter Måns.',
    ],
    tests: [
      {
        description: 'Bara ett ord är fett',
        code: "count('strong')",
        expected: 1,
      },
      {
        description: 'Det feta ordet är katt',
        code: "text('strong')",
        expected: 'katt',
      },
      {
        description: 'Tre stycken med rätt text',
        code: "texts('p')",
        expected: [
          'Jag har en katt som heter Måns.',
          'Han tycker om att sova i solen.',
          'Han är väldigt lat.',
        ],
      },
    ],
  },
];
