// Bana 2: länkar och bilder. Bilderna ligger i public/bilder, så att
// övningarna fungerar utan internet. Ingen CSS än (bana 6) – storleken
// sätts med width.
const KATT = 'https://sv.wikipedia.org/wiki/Katt';

export const LANKAR = [
  {
    id: 'lankar-01',
    track: 'lankar',
    title: 'Din första länk',
    xp: 15,
    description:
      'Länkar är det som gör webben till en väv: från en sida kan du hoppa till vilken annan sida som helst.',
    explain:
      'En länk skrivs med `<a>` (anchor, ankare). Vart den går står i attributet `href`, inuti den öppnande taggen: `<a href="https://…">`.\n\nEtt attribut är extra information om taggen. Det skrivs som `namn="värde"`, med citattecken runt värdet. Texten mellan `<a>` och `</a>` är det man klickar på.',
    example:
      '<p>Jag lär mig på <a href="https://developer.mozilla.org">MDN</a>.</p>',
    task: `Uppgift: Skriv en länk med texten \`Läs om katter\` som går till \`${KATT}\`.`,
    starterCode: '<!-- Skriv din kod här -->\n',
    solution: `<a href="${KATT}">Läs om katter</a>\n`,
    hints: [
      'En länk börjar med <a href="…"> och slutar med </a>.',
      'Adressen står inom citattecken efter href=, och texten mellan taggarna.',
      `<a href="${KATT}">…</a>`,
    ],
    tests: [
      {
        description: 'Länken säger Läs om katter',
        code: "text('a')",
        expected: 'Läs om katter',
      },
      {
        description: 'Länken går till Wikipedia om katter',
        code: "attr('a', 'href')",
        expected: KATT,
      },
    ],
  },
  {
    id: 'lankar-02',
    track: 'lankar',
    title: 'Länktext som säger något',
    xp: 15,
    description:
      'Den som använder skärmläsare kan hoppa mellan sidans länkar och höra dem upplästa en i taget. Då säger "Klicka här" ingenting.',
    explain:
      'Länktexten ska gå att förstå utan resten av meningen. Skriv vart länken går eller vad som händer: "Läs om kanelbullar", "Ladda ner menyn".\n\nDet hjälper alla, inte bara den som inte ser. Den som skummar sidan letar efter länkarna, och Google läser länktexten för att förstå vad sidan handlar om.',
    example:
      '<!-- Dåligt --> <a href="…">Klicka här</a>\n<!-- Bra -->    <a href="…">Läs hela receptet</a>',
    task: 'Uppgift: Byt länktexten `Klicka här` mot `Läs om kanelbullar`. Adressen ska vara kvar.',
    starterCode:
      '<p>Vill du baka bullar? <a href="https://sv.wikipedia.org/wiki/Kanelbulle">Klicka här</a>.</p>\n',
    solution:
      '<p>Vill du baka bullar? <a href="https://sv.wikipedia.org/wiki/Kanelbulle">Läs om kanelbullar</a>.</p>\n',
    hints: [
      'Det är bara texten mellan <a …> och </a> som ska ändras.',
      'Rör inte href – adressen ska vara kvar.',
      '…Kanelbulle">Läs om kanelbullar</a>.',
    ],
    tests: [
      {
        description: 'Länken säger Läs om kanelbullar',
        code: "text('a')",
        expected: 'Läs om kanelbullar',
      },
      {
        description: 'Länken går fortfarande till kanelbullarna',
        code: "attr('a', 'href')",
        expected: 'https://sv.wikipedia.org/wiki/Kanelbulle',
      },
    ],
  },
  {
    id: 'lankar-03',
    track: 'lankar',
    title: 'Öppna i ny flik',
    xp: 15,
    description:
      'Ibland vill du att länken öppnas i en ny flik, så att din sida finns kvar.',
    explain:
      'Attributet `target="_blank"` öppnar länken i en ny flik. En tagg kan ha flera attribut, med mellanslag emellan: `<a href="…" target="_blank">`.\n\nAnvänd det sparsamt. De flesta vill själva välja om de öppnar en ny flik. Det passar bäst när besökaren annars skulle tappa bort något, som ett halvifyllt formulär eller en övning.',
    example: '<a href="https://developer.mozilla.org" target="_blank">MDN</a>',
    task: 'Uppgift: Skriv en länk med texten `MDN` till `https://developer.mozilla.org` som öppnas i en ny flik.',
    starterCode: '<!-- Skriv din kod här -->\n',
    solution:
      '<a href="https://developer.mozilla.org" target="_blank">MDN</a>\n',
    hints: [
      'Börja med en vanlig länk med href och texten MDN.',
      'Lägg till target="_blank" efter href, med ett mellanslag emellan.',
      '<a href="https://developer.mozilla.org" target="_blank">…</a>',
    ],
    tests: [
      { description: 'Länken säger MDN', code: "text('a')", expected: 'MDN' },
      {
        description: 'Länken går till MDN',
        code: "attr('a', 'href')",
        expected: 'https://developer.mozilla.org',
      },
      {
        description: 'Länken öppnas i ny flik',
        code: "attr('a', 'target')",
        expected: '_blank',
      },
    ],
  },
  {
    id: 'lankar-04',
    track: 'lankar',
    title: 'Din första bild',
    xp: 15,
    description:
      'En bild är en egen fil. Sidan säger bara var filen finns, och webbläsaren hämtar den.',
    explain:
      '`<img>` (image) visar en bild. `src` (source) säger var bildfilen finns och `alt` beskriver bilden i ord. `<img>` har inget innehåll, så den stängs aldrig.\n\n`src="bilder/katt.svg"` är en sökväg: filen `katt.svg` i mappen `bilder`, bredvid sidan. Webbadresser fungerar också, men egna filer försvinner inte.',
    example: '<img src="bilder/hund.svg" alt="En hund med en pinne">',
    task: 'Uppgift: Visa bilden `bilder/katt.svg` med alt-texten `En katt som sover`.',
    starterCode: '<!-- Skriv din kod här -->\n',
    solution: '<img src="bilder/katt.svg" alt="En katt som sover">\n',
    hints: [
      'Du behöver en <img> med två attribut: src och alt.',
      'src="bilder/katt.svg" säger vilken bild det är.',
      '<img src="bilder/katt.svg" alt="…"> – utan </img>.',
    ],
    tests: [
      {
        description: 'Bilden är bilder/katt.svg',
        code: "attr('img', 'src')",
        expected: 'bilder/katt.svg',
      },
      {
        description: 'Alt-texten säger En katt som sover',
        code: "attr('img', 'alt')",
        expected: 'En katt som sover',
      },
    ],
  },
  {
    id: 'lankar-05',
    track: 'lankar',
    title: 'Alt-text',
    xp: 20,
    description:
      'Alt-texten läses upp för den som inte ser bilden, och visas om bilden inte laddar. Men alla bilder behöver inte beskrivas.',
    explain:
      'En bra alt-text säger det bilden visar som är viktigt på just den här sidan: "Bamse med en pinne i munnen", inte "bild" eller "hund.svg".\n\nÄr bilden bara pynt, som stjärnor eller en snirkel, skriver du `alt=""`. Då hoppar skärmläsaren över den. Saknas `alt` helt läser den i stället upp filnamnet.',
    example:
      '<img src="bilder/stjarna.svg" alt="">\n<img src="bilder/katt.svg" alt="Måns sover i solen">',
    task: 'Uppgift: Stjärnorna är bara pynt – ge dem `alt=""`. Hunden är Bamse – ge den alt-texten `Bamse med en pinne i munnen`.',
    starterCode:
      '<h1>Vår hund Bamse</h1>\n<img src="bilder/stjarna.svg">\n<img src="bilder/hund.svg">\n<p>Bamse är fem år och älskar pinnar.</p>\n',
    solution:
      '<h1>Vår hund Bamse</h1>\n<img src="bilder/stjarna.svg" alt="">\n<img src="bilder/hund.svg" alt="Bamse med en pinne i munnen">\n<p>Bamse är fem år och älskar pinnar.</p>\n',
    hints: [
      'Båda bilderna behöver ett alt-attribut.',
      'Stjärnorna får alt="" – två citattecken utan något emellan.',
      '<img src="bilder/hund.svg" alt="Bamse med …">',
    ],
    tests: [
      {
        description: 'Stjärnorna har en tom alt',
        code: "attr('img[src=\"bilder/stjarna.svg\"]', 'alt')",
        expected: '',
      },
      {
        description: 'Hunden har alt-texten Bamse med en pinne i munnen',
        code: "attr('img[src=\"bilder/hund.svg\"]', 'alt')",
        expected: 'Bamse med en pinne i munnen',
      },
    ],
  },
  {
    id: 'lankar-06',
    track: 'lankar',
    title: 'Bildstorlek',
    xp: 15,
    description:
      'Bilder visas så stora som filen säger. Ofta är det för stort.',
    explain:
      'Attributet `width` sätter bredden i pixlar. Skriv bara talet, utan `px`: `width="200"`.\n\nSätter du bara bredden räknar webbläsaren ut höjden själv, så att bilden inte blir utdragen. Senare, i CSS-banorna, lär du dig göra bilder som krymper med skärmen.',
    example: '<img src="bilder/hund.svg" alt="Bamse" width="150">',
    task: 'Uppgift: Katten är 400 pixlar bred. Gör den 200 pixlar bred.',
    starterCode: '<img src="bilder/katt.svg" alt="En katt som sover">\n',
    solution:
      '<img src="bilder/katt.svg" alt="En katt som sover" width="200">\n',
    hints: [
      'Lägg till ett attribut till i <img>-taggen.',
      'Attributet heter width och värdet är 200.',
      '… alt="En katt som sover" width="200">',
    ],
    tests: [
      {
        description: 'Bilden är 200 pixlar bred',
        code: "attr('img', 'width')",
        expected: '200',
      },
      {
        description: 'Det är fortfarande katten, med sin alt-text',
        code: "attr('img', 'alt')",
        expected: 'En katt som sover',
      },
    ],
  },
  {
    id: 'lankar-07',
    track: 'lankar',
    title: 'Bild som länk',
    xp: 20,
    description:
      'Allt som står mellan `<a>` och `</a>` går att klicka på – även en bild.',
    explain:
      'Lägg `<img>` inuti `<a>`, så blir bilden en länk.\n\nNär bilden är länken är alt-texten länktexten. Då ska den säga vart länken går, inte bara vad bilden visar – samma regel som för länktext.',
    example:
      '<a href="https://sv.wikipedia.org/wiki/Hund">\n  <img src="bilder/hund.svg" alt="Läs om hundar" width="150">\n</a>',
    task: `Uppgift: Gör katten till en länk till \`${KATT}\`, och byt alt-texten till \`Läs om katter\`.`,
    starterCode:
      '<img src="bilder/katt.svg" alt="En katt som sover" width="200">\n',
    solution: `<a href="${KATT}">\n  <img src="bilder/katt.svg" alt="Läs om katter" width="200">\n</a>\n`,
    hints: [
      'Skriv <a href="…"> före bilden och </a> efter.',
      'Ändra också alt="En katt som sover" till alt="Läs om katter".',
      `<a href="${KATT}"><img …></a>`,
    ],
    tests: [
      {
        description: 'Bilden ligger i en länk',
        code: "count('a img')",
        expected: 1,
      },
      {
        description: 'Länken går till Wikipedia om katter',
        code: "attr('a', 'href')",
        expected: KATT,
      },
      {
        description: 'Alt-texten säger vart länken går',
        code: "attr('a img', 'alt')",
        expected: 'Läs om katter',
      },
    ],
  },
  {
    id: 'lankar-08',
    track: 'lankar',
    title: 'Länk inom sidan',
    xp: 20,
    description:
      'En länk kan också hoppa till en annan del av samma sida, som "Till receptet" överst på en lång matblogg.',
    explain:
      'Ge målet ett namn med attributet `id`: `<h2 id="recept">`. Ett id ska vara unikt på sidan och skrivs utan mellanslag.\n\nLänken går sedan till `#` och namnet: `<a href="#recept">`. `#` betyder "här på sidan".',
    example:
      '<a href="#slutet">Hoppa till slutet</a>\n…\n<p id="slutet">Slut!</p>',
    task: 'Uppgift: Ge rubriken `Receptet` id:t `recept`, och låt länken överst hoppa dit. Prova att klicka på länken i rutan.',
    starterCode: `<p><a href="#">Hoppa till receptet</a></p>
<h2>Min historia</h2>
<p>När jag var liten bakade mormor pannkakor varje torsdag.</p>
<p>Hon hade ett eget recept som hon aldrig skrev ner.</p>
<p>En dag satt jag bredvid och skrev upp allt hon gjorde.</p>
<p>Nu bakar jag dem själv, varje torsdag.</p>
<p>Och nu får du receptet också.</p>
<h2>Receptet</h2>
<p>Blanda mjöl, mjölk och ägg. Stek i smör.</p>
`,
    solution: `<p><a href="#recept">Hoppa till receptet</a></p>
<h2>Min historia</h2>
<p>När jag var liten bakade mormor pannkakor varje torsdag.</p>
<p>Hon hade ett eget recept som hon aldrig skrev ner.</p>
<p>En dag satt jag bredvid och skrev upp allt hon gjorde.</p>
<p>Nu bakar jag dem själv, varje torsdag.</p>
<p>Och nu får du receptet också.</p>
<h2 id="recept">Receptet</h2>
<p>Blanda mjöl, mjölk och ägg. Stek i smör.</p>
`,
    hints: [
      'Två ändringar: ett id på rubriken och en href på länken.',
      '<h2 id="recept">Receptet</h2>',
      'Länken: href="#recept" – med # före namnet.',
    ],
    tests: [
      {
        description: 'Rubriken Receptet har id:t recept',
        code: "text('#recept')",
        expected: 'Receptet',
      },
      {
        description: 'Länken går till #recept',
        code: "attr('a', 'href')",
        expected: '#recept',
      },
    ],
  },
  {
    id: 'lankar-09',
    track: 'lankar',
    title: 'Mejl och telefon',
    xp: 15,
    description:
      'Länkar kan göra mer än att öppna sidor. De kan starta ett mejl eller ringa ett samtal.',
    explain:
      '`href="mailto:ada@example.com"` öppnar mejlprogrammet med adressen ifylld. `href="tel:+46701234567"` ringer numret på en mobil.\n\nSkriv telefonnumret utan mellanslag och med landskod (`+46` för Sverige, utan nollan i början).',
    example: '<a href="mailto:hej@example.com">Skicka ett mejl</a>',
    task: 'Uppgift: Skriv två länkar: `Mejla mig` till `mailto:ada@example.com` och sedan `Ring mig` till `tel:+46701234567`.',
    starterCode: '<!-- Skriv din kod här -->\n',
    solution:
      '<p><a href="mailto:ada@example.com">Mejla mig</a></p>\n<p><a href="tel:+46701234567">Ring mig</a></p>\n',
    hints: [
      'Det är två vanliga länkar. Bara början på href är ny.',
      'Lägg dem gärna i var sitt stycke, så hamnar de på var sin rad.',
      '<a href="mailto:ada@example.com">Mejla mig</a>',
    ],
    tests: [
      {
        description: 'Två länkar: Mejla mig och Ring mig',
        code: "texts('a')",
        expected: ['Mejla mig', 'Ring mig'],
      },
      {
        description: 'De går till mejlen och telefonnumret',
        code: "$$('a').map(link => link.getAttribute('href'))",
        expected: ['mailto:ada@example.com', 'tel:+46701234567'],
      },
    ],
  },
];
