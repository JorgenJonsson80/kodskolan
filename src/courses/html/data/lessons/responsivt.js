// Bana 10: sidor som fungerar på både mobil och dator. Ett test med
// width: 375 rättas i en iframe som är lika bred som en mobil, så att
// @media slår till (se runner/page.js). Utan width är sidan 800px bred.

const MOBIL = 375;

export const RESPONSIVT = [
  {
    id: 'responsivt-01',
    track: 'responsivt',
    title: 'viewport-raden',
    xp: 15,
    description:
      'Utan en särskild rad i `head` låtsas mobilen att den är en dator och krymper hela sidan. Texten blir pytteliten.',
    explain:
      'Mobiler visar sidor som saknar raden som om skärmen vore 980 pixlar bred, och förminskar sedan allt. Raden säger: "använd mobilens riktiga bredd".\n\n`<meta name="viewport" content="width=device-width, initial-scale=1">`\n\n- `width=device-width` – sidan är lika bred som skärmen\n- `initial-scale=1` – ingen in- eller utzoomning från början\n\nRaden står i `head` på varenda sida som ska fungera på mobilen. Skriv av den precis – den ser likadan ut överallt.',
    example:
      '<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n</head>',
    task: 'Uppgift: Lägg till viewport-raden i `head`, under `charset`.',
    starterCode: `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8">
    <title>Min mobilsida</title>
  </head>
  <body>
    <h1>Hej mobilen!</h1>
    <p>Nu blir texten lagom stor även på en liten skärm.</p>
  </body>
</html>
`,
    solution: `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Min mobilsida</title>
  </head>
  <body>
    <h1>Hej mobilen!</h1>
    <p>Nu blir texten lagom stor även på en liten skärm.</p>
  </body>
</html>
`,
    hints: [
      'En ny meta-tagg i head.',
      'name="viewport" och content med två delar och komma emellan.',
      '<meta name="viewport" content="width=device-width, initial-scale=1">',
    ],
    tests: [
      {
        description: 'Det finns en viewport-rad i head',
        code: "count('head meta[name=viewport]')",
        expected: 1,
      },
      {
        description: 'Den säger width=device-width, initial-scale=1',
        code: "attr('meta[name=viewport]', 'content').replace(/\\s+/g, '')",
        expected: 'width=device-width,initial-scale=1',
      },
    ],
  },
  {
    id: 'responsivt-02',
    track: 'responsivt',
    title: 'Procent i stället för pixlar',
    xp: 20,
    description:
      'Rutan är 600 pixlar bred. På datorn ser det bra ut, men på en mobil sticker den utanför skärmen.',
    explain:
      'En mobil är ofta bara 360–400 pixlar bred. Allt som är bredare än så gör att man måste skrolla i sidled – det känns trasigt.\n\nMed `%` räknas bredden från elementet runt omkring:\n\n- `width: 100%` – lika bred som föräldern\n- `width: 90%` – lite smalare, oavsett skärm\n\nPixlar är fasta. Procent följer med när skärmen ändrar storlek.\n\nKnappen 📱 ovanför förhandsvisningen visar sidan i mobilbredd.',
    example: '.ruta {\n  width: 90%;\n}',
    task: 'Uppgift: Ändra bredden på `.ruta` till `90%`, så att den får plats på alla skärmar.',
    starterCode: `<style>
  .ruta {
    width: 600px;
    background-color: lightcyan;
    padding: 16px;
    box-sizing: border-box;
  }
</style>
<div class="ruta">
  <h2>Väder i dag</h2>
  <p>☀️ Soligt och 22 grader. Glöm inte solkräm!</p>
</div>
`,
    solution: `<style>
  .ruta {
    width: 90%;
    background-color: lightcyan;
    padding: 16px;
    box-sizing: border-box;
  }
</style>
<div class="ruta">
  <h2>Väder i dag</h2>
  <p>☀️ Soligt och 22 grader. Glöm inte solkräm!</p>
</div>
`,
    hints: [
      'Ändra bara värdet på width.',
      '% i stället för px.',
      'width: 90%;',
    ],
    tests: [
      {
        description: 'Rutan är 90% av sidans bredd på datorn',
        code: "Math.round(widths('.ruta')[0] / widths('body')[0] * 100)",
        expected: 90,
      },
      {
        description: 'Rutan är 90% av sidans bredd på mobilen',
        code: "Math.round(widths('.ruta')[0] / widths('body')[0] * 100)",
        expected: 90,
        width: MOBIL,
      },
      {
        description: 'Sidan får plats på mobilen utan att skrolla i sidled',
        code: 'fitsScreen()',
        expected: true,
        width: MOBIL,
      },
    ],
  },
  {
    id: 'responsivt-03',
    track: 'responsivt',
    title: 'max-width',
    xp: 20,
    description:
      'Med `width: 100%` blir texten jättebred på en stor skärm, och långa rader är jobbiga att läsa.',
    explain:
      '`max-width` är det bästa av två världar:\n\n- på en stor skärm blir elementet aldrig bredare än så\n- på en liten skärm krymper det och får plats\n\nMed `margin: 0 auto` står det dessutom i mitten när det finns plats över.\n\nDet är så nästan alla sajter håller texten lagom bred.',
    example: '.text {\n  max-width: 600px;\n  margin: 0 auto;\n}',
    task: 'Uppgift: Ge `.text` `max-width: 600px` och ställ den i mitten med `margin: 0 auto`.',
    starterCode: `<style>
  .text {
    background-color: floralwhite;
    padding: 16px;
    box-sizing: border-box;
  }
</style>
<div class="text">
  <h1>Sjörövarnas skatt</h1>
  <p>Kaptenen grävde en grop under den största palmen på ön. Ingen av de andra
  sjörövarna fick veta var den var, men på kartan ritade han ett litet kryss.</p>
</div>
`,
    solution: `<style>
  .text {
    max-width: 600px;
    margin: 0 auto;
    background-color: floralwhite;
    padding: 16px;
    box-sizing: border-box;
  }
</style>
<div class="text">
  <h1>Sjörövarnas skatt</h1>
  <p>Kaptenen grävde en grop under den största palmen på ön. Ingen av de andra
  sjörövarna fick veta var den var, men på kartan ritade han ett litet kryss.</p>
</div>
`,
    hints: [
      'Två nya rader i regeln för .text.',
      'max-width, inte width, så att den får krympa.',
      'max-width: 600px;\nmargin: 0 auto;',
    ],
    tests: [
      {
        description: 'På datorn är texten 600px bred och i mitten',
        code: "[widths('.text')[0], centered('.text')]",
        expected: [600, true],
      },
      {
        description: 'På mobilen tar texten hela bredden',
        code: "widths('.text')[0] === widths('body')[0]",
        expected: true,
        width: MOBIL,
      },
    ],
  },
  {
    id: 'responsivt-04',
    track: 'responsivt',
    title: 'Bilder som krymper',
    xp: 20,
    description:
      'Bilden är 640 pixlar bred. På mobilen sticker den ut och man måste skrolla för att se hela.',
    explain:
      'En bild är så stor som filen säger, eller som `width` och `height` i HTML:en säger. Den krymper inte av sig själv.\n\n`img { max-width: 100%; }` gör att bilden aldrig blir bredare än lådan den står i. På en stor skärm syns den i full storlek.\n\nMen när bilden blir smalare måste den också bli lägre, annars blir den hoptryckt. `height: auto` låter höjden följa med.\n\nDe två raderna finns på nästan varje sajt.',
    example: 'img {\n  max-width: 100%;\n  height: auto;\n}',
    task: 'Uppgift: Gör så att bilden aldrig blir bredare än sidan, och att höjden följer med.',
    starterCode: `<style>
  body {
    font-family: sans-serif;
  }
  /* Skriv regeln för img här */
</style>
<h1>Veckans katt</h1>
<img src="bilder/katt.svg" alt="En randig katt som sover" width="640" height="480">
<p>Den här veckan sover Morris mest.</p>
`,
    solution: `<style>
  body {
    font-family: sans-serif;
  }
  img {
    max-width: 100%;
    height: auto;
  }
</style>
<h1>Veckans katt</h1>
<img src="bilder/katt.svg" alt="En randig katt som sover" width="640" height="480">
<p>Den här veckan sover Morris mest.</p>
`,
    hints: [
      'En ny regel för img med två egenskaper.',
      'max-width i procent, och height som räknas ut själv.',
      'img { max-width: 100%; height: auto; }',
    ],
    tests: [
      {
        description: 'På datorn är bilden 640px bred',
        code: "widths('img')[0]",
        expected: 640,
      },
      {
        description: 'På mobilen får bilden plats',
        code: "[widths('img')[0] === widths('body')[0], fitsScreen()]",
        expected: [true, true],
        width: MOBIL,
      },
      {
        description: 'Bilden behåller sin form (4 : 3)',
        code: "Math.abs(heights('img')[0] - widths('img')[0] * 3 / 4) <= 1",
        expected: true,
        width: MOBIL,
      },
    ],
  },
  {
    id: 'responsivt-05',
    track: 'responsivt',
    title: 'Din första @media',
    xp: 20,
    description:
      'Rubriken är stor och fin på datorn, men på mobilen tar den halva skärmen. Den ska vara mindre – bara på mobilen.',
    explain:
      '`@media` är regler som bara gäller ibland. Reglerna inuti gäller när villkoret stämmer:\n\n`@media (max-width: 600px) { … }` – när fönstret är högst 600 pixlar brett, alltså en mobil.\n\nReglerna inuti skrivs som vanligt, med selektor och klamrar. Det blir alltså klamrar i klamrar.\n\n`@media` står *efter* de vanliga reglerna, så att den vinner när den gäller.',
    example:
      'h1 {\n  font-size: 2.5rem;\n}\n@media (max-width: 600px) {\n  h1 {\n    font-size: 1.75rem;\n  }\n}',
    task: 'Uppgift: Gör rubriken `1.75rem` stor när fönstret är högst `600px` brett. På datorn ska den vara kvar på `2.5rem`.',
    starterCode: `<style>
  h1 {
    font-size: 2.5rem;
    color: darkmagenta;
  }
  /* Skriv @media här */
</style>
<h1>Superhjältarnas sommarläger</h1>
<p>Flyg, osynlighet och superstyrka – vi tränar allt.</p>
`,
    solution: `<style>
  h1 {
    font-size: 2.5rem;
    color: darkmagenta;
  }
  @media (max-width: 600px) {
    h1 {
      font-size: 1.75rem;
    }
  }
</style>
<h1>Superhjältarnas sommarläger</h1>
<p>Flyg, osynlighet och superstyrka – vi tränar allt.</p>
`,
    hints: [
      '@media (max-width: 600px) { … } efter regeln för h1.',
      'Inuti står en vanlig regel för h1.',
      '@media (max-width: 600px) {\n  h1 { font-size: 1.75rem; }\n}',
    ],
    tests: [
      {
        description: 'På datorn är rubriken 40px (2.5rem)',
        code: "px('h1', 'font-size')",
        expected: 40,
      },
      {
        description: 'På mobilen är rubriken 28px (1.75rem)',
        code: "px('h1', 'font-size')",
        expected: 28,
        width: MOBIL,
      },
    ],
  },
  {
    id: 'responsivt-06',
    track: 'responsivt',
    title: 'Menyn på mobilen',
    xp: 25,
    description:
      'Fem länkar på en rad får inte plats på en mobil. Där ska de stå under varandra i stället.',
    explain:
      'Med `@media` kan du ändra vad som helst på mobilen, även hur en flexbox går.\n\nPå datorn är menyn en rad. I `@media (max-width: 600px)` sätter du `flex-direction: column` så att länkarna står under varandra.\n\nDu behöver inte skriva om allt i `@media` – bara det som ska vara annorlunda. `display: flex` och `gap` gäller fortfarande.',
    example:
      '@media (max-width: 600px) {\n  nav {\n    flex-direction: column;\n  }\n}',
    task: 'Uppgift: Låt länkarna i `nav` stå under varandra när fönstret är högst `600px` brett.',
    starterCode: `<style>
  nav {
    display: flex;
    gap: 8px;
  }
  nav a {
    background-color: navy;
    color: white;
    padding: 12px 16px;
    text-decoration: none;
  }
  /* Skriv @media här */
</style>
<nav>
  <a href="#">Start</a>
  <a href="#">Lag och serier</a>
  <a href="#">Träningstider</a>
  <a href="#">Bli medlem</a>
  <a href="#">Kontakt</a>
</nav>
`,
    solution: `<style>
  nav {
    display: flex;
    gap: 8px;
  }
  nav a {
    background-color: navy;
    color: white;
    padding: 12px 16px;
    text-decoration: none;
  }
  @media (max-width: 600px) {
    nav {
      flex-direction: column;
    }
  }
</style>
<nav>
  <a href="#">Start</a>
  <a href="#">Lag och serier</a>
  <a href="#">Träningstider</a>
  <a href="#">Bli medlem</a>
  <a href="#">Kontakt</a>
</nav>
`,
    hints: [
      '@media efter de andra reglerna, med en regel för nav inuti.',
      'flex-direction: column gör att flexboxen går nedåt.',
      '@media (max-width: 600px) {\n  nav { flex-direction: column; }\n}',
    ],
    tests: [
      {
        description: 'På datorn står länkarna på en rad',
        code: "rows('nav a')",
        expected: 1,
      },
      {
        description: 'På mobilen står de under varandra',
        code: "rows('nav a')",
        expected: 5,
        width: MOBIL,
      },
      {
        description: 'Menyn får plats på mobilen',
        code: 'fitsScreen()',
        expected: true,
        width: MOBIL,
      },
    ],
  },
  {
    id: 'responsivt-07',
    track: 'responsivt',
    title: 'Från tre kolumner till en',
    xp: 25,
    description:
      'Tre kort bredvid varandra är perfekt på datorn. På mobilen blir de så smala att texten knappt får plats.',
    explain:
      'Ett grid kan få nya kolumner i `@media`. På mobilen räcker en kolumn: `grid-template-columns: 1fr`.\n\nKorten står då under varandra, med samma `gap` som förut.\n\nSå fungerar nästan alla produktsidor och bloggar: flera kolumner på stora skärmar, en på små.',
    example:
      '@media (max-width: 600px) {\n  .kort-lista {\n    grid-template-columns: 1fr;\n  }\n}',
    task: 'Uppgift: Ge `.kort-lista` en enda kolumn när fönstret är högst `600px` brett.',
    starterCode: `<style>
  .kort-lista {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .kort {
    background-color: mistyrose;
    padding: 16px;
    border-radius: 8px;
  }
  /* Skriv @media här */
</style>
<div class="kort-lista">
  <div class="kort"><h3>🏊 Simning</h3><p>Tisdagar i stora bassängen.</p></div>
  <div class="kort"><h3>🧗 Klättring</h3><p>Torsdagar på klätterväggen.</p></div>
  <div class="kort"><h3>🎾 Tennis</h3><p>Lördagar på utebanorna.</p></div>
</div>
`,
    solution: `<style>
  .kort-lista {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .kort {
    background-color: mistyrose;
    padding: 16px;
    border-radius: 8px;
  }
  @media (max-width: 600px) {
    .kort-lista {
      grid-template-columns: 1fr;
    }
  }
</style>
<div class="kort-lista">
  <div class="kort"><h3>🏊 Simning</h3><p>Tisdagar i stora bassängen.</p></div>
  <div class="kort"><h3>🧗 Klättring</h3><p>Torsdagar på klätterväggen.</p></div>
  <div class="kort"><h3>🎾 Tennis</h3><p>Lördagar på utebanorna.</p></div>
</div>
`,
    hints: [
      '@media med en regel för .kort-lista inuti.',
      'En kolumn skrivs 1fr.',
      '@media (max-width: 600px) {\n  .kort-lista { grid-template-columns: 1fr; }\n}',
    ],
    tests: [
      {
        description: 'På datorn står korten i tre kolumner',
        code: "perRow('.kort')",
        expected: 3,
      },
      {
        description: 'På mobilen står de under varandra med 16px emellan',
        code: "[perRow('.kort'), rows('.kort'), gapY('.kort')]",
        expected: [1, 3, 16],
        width: MOBIL,
      },
    ],
  },
  {
    id: 'responsivt-08',
    track: 'responsivt',
    title: 'Mobilen först',
    xp: 25,
    description:
      'Många börjar med mobilen och lägger till för större skärmar. Då vänds `@media` åt andra hållet.',
    explain:
      'Hittills har de vanliga reglerna varit för datorn och `@media (max-width: …)` för mobilen.\n\nMan kan också göra tvärtom – *mobilen först*:\n\n- de vanliga reglerna är för mobilen, där allt står under varandra\n- `@media (min-width: 700px)` gäller när fönstret är **minst** 700 pixlar brett\n\nMobilsidan är ofta den enklaste. Det är lättare att lägga till kolumner än att ta bort dem.',
    example:
      '@media (min-width: 700px) {\n  .sida {\n    grid-template-columns: 200px 1fr;\n  }\n}',
    task: 'Uppgift: Ge `.sida` kolumnerna `200px 1fr` när fönstret är minst `700px` brett. På mobilen ska den ha kvar en kolumn.',
    starterCode: `<style>
  .sida {
    display: grid;
    gap: 12px;
  }
  aside { background-color: lemonchiffon; padding: 12px; }
  main { background-color: white; border: 1px solid lightgray; padding: 12px; }
  /* Skriv @media här */
</style>
<div class="sida">
  <aside>Filter: Alla · Böcker · Spel</aside>
  <main>Här visas allt som finns på biblioteket.</main>
</div>
`,
    solution: `<style>
  .sida {
    display: grid;
    gap: 12px;
  }
  aside { background-color: lemonchiffon; padding: 12px; }
  main { background-color: white; border: 1px solid lightgray; padding: 12px; }
  @media (min-width: 700px) {
    .sida {
      grid-template-columns: 200px 1fr;
    }
  }
</style>
<div class="sida">
  <aside>Filter: Alla · Böcker · Spel</aside>
  <main>Här visas allt som finns på biblioteket.</main>
</div>
`,
    hints: [
      'min-width i stället för max-width.',
      'Inuti står en regel för .sida med grid-template-columns.',
      '@media (min-width: 700px) {\n  .sida { grid-template-columns: 200px 1fr; }\n}',
    ],
    tests: [
      {
        description: 'På datorn står filtret (200px) bredvid innehållet',
        code: "[rows('aside, main'), widths('aside')[0]]",
        expected: [1, 200],
      },
      {
        description: 'På mobilen står filtret ovanför',
        code: "rows('aside, main')",
        expected: 2,
        width: MOBIL,
      },
    ],
  },
  {
    id: 'responsivt-09',
    track: 'responsivt',
    title: 'Laga mobilsidan',
    xp: 25,
    description:
      'Sidan ser bra ut på datorn, men på mobilen måste man skrolla i sidled. Tre saker är fel.',
    explain:
      'Om sidan inte får plats på mobilen, leta efter:\n\n- en fast `width` i pixlar som är bredare än skärmen – byt till `max-width`\n- bilder utan `max-width: 100%`\n- en `@media` som aldrig slår till. Villkoret måste stå inom parentes, med kolon: `(max-width: 600px)`\n\nTryck på 📱 ovanför förhandsvisningen och se var det sticker ut.',
    example:
      '.banner {\n  max-width: 700px;\n}\n@media (max-width: 600px) { … }',
    task: 'Uppgift: Laga de tre felen så att sidan får plats på mobilen och korten står i en kolumn där.',
    starterCode: `<style>
  .banner {
    width: 700px;
    background-color: darkorange;
    color: white;
    padding: 16px;
    box-sizing: border-box;
  }
  .lista {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .lista div {
    background-color: oldlace;
    padding: 12px;
  }
  @media (max-width 600px) {
    .lista {
      grid-template-columns: 1fr;
    }
  }
</style>
<div class="banner">🎃 Höstlov på fritids!</div>
<img src="bilder/hund.svg" alt="En glad hund" width="600" height="450">
<div class="lista">
  <div>Måndag: pyssel</div>
  <div>Tisdag: skogen</div>
  <div>Onsdag: bakning</div>
  <div>Torsdag: film</div>
</div>
`,
    solution: `<style>
  .banner {
    max-width: 700px;
    background-color: darkorange;
    color: white;
    padding: 16px;
    box-sizing: border-box;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  .lista {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .lista div {
    background-color: oldlace;
    padding: 12px;
  }
  @media (max-width: 600px) {
    .lista {
      grid-template-columns: 1fr;
    }
  }
</style>
<div class="banner">🎃 Höstlov på fritids!</div>
<img src="bilder/hund.svg" alt="En glad hund" width="600" height="450">
<div class="lista">
  <div>Måndag: pyssel</div>
  <div>Tisdag: skogen</div>
  <div>Onsdag: bakning</div>
  <div>Torsdag: film</div>
</div>
`,
    hints: [
      'Bannern har en fast bredd, och bilden har ingen regel alls.',
      'Titta noga på villkoret i @media – ett tecken saknas.',
      'max-width: 700px; på .banner, img { max-width: 100%; height: auto; } och (max-width: 600px).',
    ],
    tests: [
      {
        description: 'Sidan får plats på mobilen',
        code: 'fitsScreen()',
        expected: true,
        width: MOBIL,
      },
      {
        description: 'Bannern är fortfarande 700px på datorn',
        code: "widths('.banner')[0]",
        expected: 700,
      },
      {
        description: 'På mobilen står korten i en kolumn',
        code: "perRow('.lista div')",
        expected: 1,
        width: MOBIL,
      },
      {
        description: 'På datorn står korten två och två',
        code: "perRow('.lista div')",
        expected: 2,
      },
    ],
  },
];
