// Bana 7: boxmodellen. Varje element är en låda med innehåll, padding,
// kant och margin. Webbläsaren ger p och h1 egen margin men jsdom inte,
// så testerna kollar bara värden som eleven sätter. boxWidth() och
// centered() mäter i webbläsaren och räknar från stilarna i jsdom.

export const BOXEN = [
  {
    id: 'boxen-01',
    track: 'boxen',
    title: 'padding – luft innanför',
    xp: 15,
    description:
      'Varje element är en låda. Text som går ända ut i kanten ser trång ut – den behöver luft.',
    explain:
      '`padding` är luften mellan lådans kant och innehållet. Bakgrundsfärgen syns i den.\n\n- Ett värde gäller alla fyra sidor: `padding: 16px`\n- Två värden: uppe och nere först, sedan sidorna: `padding: 12px 24px`\n- Fyra värden går medurs från toppen: uppe, höger, nere, vänster\n\nVill du bara ändra en sida finns `padding-top`, `padding-right`, `padding-bottom` och `padding-left`.',
    example:
      '.notis {\n  background-color: lightyellow;\n  padding: 12px 24px;\n}',
    task: 'Uppgift: Ge `.notis` `12px` padding uppe och nere och `24px` på sidorna, med en enda `padding`.',
    starterCode: `<style>
  .notis {
    background-color: lightyellow;
    /* Lägg till padding här */
  }
</style>
<div class="notis">Kom ihåg: utflykt på fredag!</div>
`,
    solution: `<style>
  .notis {
    background-color: lightyellow;
    padding: 12px 24px;
  }
</style>
<div class="notis">Kom ihåg: utflykt på fredag!</div>
`,
    hints: [
      'padding står inne i regeln för .notis.',
      'Två värden: först uppe och nere, sedan sidorna.',
      'padding: 12px 24px;',
    ],
    tests: [
      {
        description: '12px padding uppe och nere',
        code: "[px('.notis', 'padding-top'), px('.notis', 'padding-bottom')]",
        expected: [12, 12],
      },
      {
        description: '24px padding på sidorna',
        code: "[px('.notis', 'padding-left'), px('.notis', 'padding-right')]",
        expected: [24, 24],
      },
    ],
  },
  {
    id: 'boxen-02',
    track: 'boxen',
    title: 'margin – luft utanför',
    xp: 15,
    description:
      'Korten här klistrar ihop. De behöver luft emellan – utanför lådan, inte i den.',
    explain:
      '`margin` är luften *utanför* kanten. Där syns ingen bakgrund, den skjuter bara undan grannarna.\n\nDen skrivs precis som padding: ett, två eller fyra värden, eller en sida i taget med `margin-top`, `margin-bottom`, `margin-left` och `margin-right`.\n\nMinnesregel: **p**adding är **p**olstringen inuti lådan, margin är avståndet till de andra lådorna.',
    example: '.kort {\n  margin-bottom: 24px;\n  margin-left: 40px;\n}',
    task: 'Uppgift: Ge `.kort` `margin-bottom: 24px` så att korten får luft emellan, och `margin-left: 40px` så att de flyttar in från kanten.',
    starterCode: `<style>
  .kort {
    background-color: lightblue;
    padding: 16px;
    /* Lägg till margin här */
  }
</style>
<div class="kort">Måndag: simning</div>
<div class="kort">Onsdag: fotboll</div>
<div class="kort">Fredag: filmkväll</div>
`,
    solution: `<style>
  .kort {
    background-color: lightblue;
    padding: 16px;
    margin-bottom: 24px;
    margin-left: 40px;
  }
</style>
<div class="kort">Måndag: simning</div>
<div class="kort">Onsdag: fotboll</div>
<div class="kort">Fredag: filmkväll</div>
`,
    hints: [
      'Två nya rader i regeln för .kort.',
      'margin-bottom och margin-left, med px efter talet.',
      'margin-bottom: 24px;\nmargin-left: 40px;',
    ],
    tests: [
      {
        description: 'Korten har 24px luft under sig',
        code: "px('.kort', 'margin-bottom')",
        expected: 24,
      },
      {
        description: 'Korten har flyttat in 40px från vänster',
        code: "px('.kort', 'margin-left')",
        expected: 40,
      },
      {
        description: 'Paddingen är kvar',
        code: "px('.kort', 'padding-top')",
        expected: 16,
      },
    ],
  },
  {
    id: 'boxen-03',
    track: 'boxen',
    title: 'border – kanten',
    xp: 15,
    description:
      'Mellan padding och margin sitter lådans kant. Den kan vara tjock, tunn, hel eller streckad.',
    explain:
      '`border` har tre delar: tjocklek, stil och färg. `border: 3px solid navy;`\n\nStilen kan vara `solid` (hel), `dashed` (streckad) eller `dotted` (prickad). Utan stil syns ingen kant alls.\n\nVill du bara ha en kant på en sida skriver du `border-top`, `border-right`, `border-bottom` eller `border-left`. En linje under en rubrik är `border-bottom`.',
    example:
      '.ruta { border: 3px solid navy; }\nh2 { border-bottom: 2px dashed gray; }',
    task: 'Uppgift: Ge `.ruta` kanten `3px solid navy`. Ge `h2` bara en kant under: `2px dashed gray`.',
    starterCode: `<style>
  .ruta {
    padding: 16px;
    /* Lägg till kanten här */
  }
  /* Skriv regeln för h2 här */
</style>
<div class="ruta">
  <h2>Dagens fråga</h2>
  <p>Vilket djur kan sova stående?</p>
</div>
`,
    solution: `<style>
  .ruta {
    padding: 16px;
    border: 3px solid navy;
  }
  h2 { border-bottom: 2px dashed gray; }
</style>
<div class="ruta">
  <h2>Dagens fråga</h2>
  <p>Vilket djur kan sova stående?</p>
</div>
`,
    hints: [
      'border skrivs med tre värden: tjocklek, stil och färg.',
      'Kanten under h2 är border-bottom.',
      'border: 3px solid navy;\nh2 { border-bottom: 2px dashed gray; }',
    ],
    tests: [
      {
        description: 'Rutan har en 3px hel navy kant',
        code: "[px('.ruta', 'border-top-width'), css('.ruta', 'border-top-style'), colorOf('.ruta', 'border-top-color')]",
        expected: [3, 'solid', 'navy'],
      },
      {
        description: 'h2 har en 2px streckad grå kant under',
        code: "[px('h2', 'border-bottom-width'), css('h2', 'border-bottom-style'), colorOf('h2', 'border-bottom-color')]",
        expected: [2, 'dashed', 'gray'],
      },
      {
        description: 'h2 har ingen kant ovanför',
        code: "px('h2', 'border-top-width')",
        expected: 0,
      },
    ],
  },
  {
    id: 'boxen-04',
    track: 'boxen',
    title: 'Runda hörn',
    xp: 15,
    description:
      'Knappar, kort och bilder blir mjukare med runda hörn. Det är en enda rad.',
    explain:
      '`border-radius` rundar hörnen. Ju större värde, desto rundare: `8px` är lite runt.\n\n`50%` gör en kvadrat till en cirkel och en rektangel till en oval.\n\nDet fungerar även utan kant – bakgrunden och bilden får runda hörn ändå.',
    example: '.knapp { border-radius: 8px; }\nimg { border-radius: 50%; }',
    task: 'Uppgift: Ge `.knapp` hörnen `8px` och gör bilden oval med `50%`.',
    starterCode: `<style>
  .knapp {
    background-color: seagreen;
    color: white;
    padding: 10px 20px;
    /* Lägg till runda hörn här */
  }
  /* Skriv regeln för img här */
</style>
<img src="bilder/katt.svg" alt="En katt som tittar in i kameran" width="200">
<p><a class="knapp" href="#">Klappa katten</a></p>
`,
    solution: `<style>
  .knapp {
    background-color: seagreen;
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
  }
  img { border-radius: 50%; }
</style>
<img src="bilder/katt.svg" alt="En katt som tittar in i kameran" width="200">
<p><a class="knapp" href="#">Klappa katten</a></p>
`,
    hints: [
      'Egenskapen heter border-radius.',
      'En rad i .knapp och en ny regel för img.',
      'border-radius: 8px;\nimg { border-radius: 50%; }',
    ],
    tests: [
      {
        description: 'Knappen har hörnen 8px',
        code: "css('.knapp', 'border-radius')",
        expected: '8px',
      },
      {
        description: 'Bilden har hörnen 50%',
        code: "css('img', 'border-radius')",
        expected: '50%',
      },
    ],
  },
  {
    id: 'boxen-05',
    track: 'boxen',
    title: 'Bredd',
    xp: 15,
    description:
      'En låda är lika bred som sidan om du inte säger något annat. Långa rader är jobbiga att läsa.',
    explain:
      '`width` ger lådan en bestämd bredd: `width: 250px`.\n\n`max-width` är en gräns: lådan blir aldrig bredare, men får krympa om fönstret är smalt. Perfekt för text – rader runt `30rem` är lagom att läsa.\n\nObs: `width` gäller bara innehållet. Padding och kant läggs till utanpå, så ett kort med `width: 250px` och `padding: 16px` blir 282px brett. Det fixar vi i nästa övning.',
    example: '.kort { width: 250px; }\n.text { max-width: 30rem; }',
    task: 'Uppgift: Ge `.kort` bredden `250px` och `.text` en högsta bredd på `30rem`.',
    starterCode: `<style>
  .kort {
    background-color: lavender;
    padding: 16px;
  }
  /* Skriv regeln för .text här */
</style>
<div class="kort">Månadens bok: Draken som var rädd för eld</div>
<p class="text">Det var en gång en drake som hette Glöd. Alla andra drakar sprutade eld, men Glöd blev rädd så fort det blev varmt i munnen. Så han lärde sig att spruta såpbubblor i stället, och de blev de finaste bubblorna i hela dalen.</p>
`,
    solution: `<style>
  .kort {
    background-color: lavender;
    padding: 16px;
    width: 250px;
  }
  .text { max-width: 30rem; }
</style>
<div class="kort">Månadens bok: Draken som var rädd för eld</div>
<p class="text">Det var en gång en drake som hette Glöd. Alla andra drakar sprutade eld, men Glöd blev rädd så fort det blev varmt i munnen. Så han lärde sig att spruta såpbubblor i stället, och de blev de finaste bubblorna i hela dalen.</p>
`,
    hints: [
      'width i .kort och max-width i en ny regel för .text.',
      'Glöm inte enheten: px och rem.',
      'width: 250px;\n.text { max-width: 30rem; }',
    ],
    tests: [
      {
        description: 'Kortets innehåll är 250px brett',
        code: "px('.kort', 'width')",
        expected: 250,
      },
      {
        description: 'Texten blir aldrig bredare än 30rem (480px)',
        code: "px('.text', 'max-width')",
        expected: 480,
      },
    ],
  },
  {
    id: 'boxen-06',
    track: 'boxen',
    title: 'box-sizing',
    xp: 20,
    description:
      'Kortet ska vara 300px brett. Men padding och kant läggs till, så det blir 350. Det finns en rad som fixar det.',
    explain:
      'Normalt räknas `width` bara för innehållet. 300 + 20 + 20 i padding + 5 + 5 i kant blir 350px.\n\n`box-sizing: border-box` ändrar det: då är `width` hela lådan, med padding och kant. Innehållet krymper i stället.\n\nDe flesta sajter skriver `* { box-sizing: border-box; }` överst. `*` väljer alla element.',
    example: '.kort {\n  box-sizing: border-box;\n  width: 300px;\n}',
    task: 'Uppgift: Gör så att `.kort` blir exakt `300px` brett med padding och kant, med `box-sizing`.',
    starterCode: `<style>
  .kort {
    width: 300px;
    padding: 20px;
    border: 5px solid teal;
  }
</style>
<div class="kort">Jag ska vara 300 pixlar bred – inte 350!</div>
`,
    solution: `<style>
  .kort {
    box-sizing: border-box;
    width: 300px;
    padding: 20px;
    border: 5px solid teal;
  }
</style>
<div class="kort">Jag ska vara 300 pixlar bred – inte 350!</div>
`,
    hints: [
      'En rad till i regeln för .kort.',
      'Värdet som räknar med kanten heter border-box.',
      'box-sizing: border-box;',
    ],
    tests: [
      {
        description: 'Kortet har box-sizing: border-box',
        code: "css('.kort', 'box-sizing')",
        expected: 'border-box',
      },
      {
        description: 'Hela kortet är 300px brett',
        code: "boxWidth('.kort')",
        expected: 300,
      },
    ],
  },
  {
    id: 'boxen-07',
    track: 'boxen',
    title: 'Mitt på sidan',
    xp: 20,
    description:
      'Nästan alla sajter har innehållet i en spalt mitt på skärmen. Så här gör man.',
    explain:
      '`margin: 0 auto` betyder: ingen margin uppe och nere, och `auto` på sidorna. `auto` delar den lediga platsen lika – så lådan hamnar i mitten.\n\nDet fungerar bara om lådan har en `width` eller `max-width`. Annars är den redan lika bred som sidan och har ingen plats över.\n\n`text-align: center` är något annat: det centrerar *texten* inuti lådan.',
    example: '.sida {\n  max-width: 500px;\n  margin: 0 auto;\n}',
    task: 'Uppgift: Ställ `.sida` mitt på sidan med `margin`, och ställ rubriken i mitten med `text-align`.',
    starterCode: `<style>
  body { background-color: lightgray; }
  .sida {
    max-width: 500px;
    padding: 24px;
    background-color: white;
    /* Lägg till margin här */
  }
  /* Skriv regeln för h1 här */
</style>
<div class="sida">
  <h1>Välkommen</h1>
  <p>Den här spalten ska stå mitt på sidan, hur brett fönstret än är.</p>
</div>
`,
    solution: `<style>
  body { background-color: lightgray; }
  .sida {
    max-width: 500px;
    padding: 24px;
    background-color: white;
    margin: 0 auto;
  }
  h1 { text-align: center; }
</style>
<div class="sida">
  <h1>Välkommen</h1>
  <p>Den här spalten ska stå mitt på sidan, hur brett fönstret än är.</p>
</div>
`,
    hints: [
      'auto på sidorna delar den lediga platsen lika.',
      'margin: 0 auto i .sida, och text-align i en regel för h1.',
      'margin: 0 auto;\nh1 { text-align: center; }',
    ],
    tests: [
      {
        description: 'Spalten står mitt på sidan',
        code: "centered('.sida')",
        expected: true,
      },
      {
        description: 'Rubriken står i mitten av spalten',
        code: "css('h1', 'text-align')",
        expected: 'center',
      },
    ],
  },
  {
    id: 'boxen-08',
    track: 'boxen',
    title: 'Block och inline',
    xp: 20,
    description:
      'Varför hamnar `p` på en egen rad, men `a` mitt i texten? Och hur får en länk se ut som en knapp?',
    explain:
      '`display` bestämmer hur lådan ställer sig.\n\n- `block`: tar en hel rad, som `p`, `h1` och `div`.\n- `inline`: står i texten, som `a`, `strong` och `span`. Bredd och padding uppe och nere fungerar dåligt.\n- `inline-block`: står i texten men är en riktig låda. Bra för knappar och menyer.\n- `none`: elementet syns inte alls.',
    example:
      'nav a {\n  display: inline-block;\n  padding: 8px 16px;\n}\n.hemlig { display: none; }',
    task: 'Uppgift: Gör länkarna i `nav` till `inline-block` med padding `8px 16px`. Göm stycket `.hemlig` med `display: none`.',
    starterCode: `<style>
  nav a {
    background-color: navy;
    color: white;
    /* Lägg till display och padding här */
  }
  /* Skriv regeln för .hemlig här */
</style>
<nav>
  <a href="#hem">Hem</a>
  <a href="#bilder">Bilder</a>
  <a href="#kontakt">Kontakt</a>
</nav>
<p class="hemlig">Det här ska ingen se!</p>
<p>Välkommen till min sida.</p>
`,
    solution: `<style>
  nav a {
    background-color: navy;
    color: white;
    display: inline-block;
    padding: 8px 16px;
  }
  .hemlig { display: none; }
</style>
<nav>
  <a href="#hem">Hem</a>
  <a href="#bilder">Bilder</a>
  <a href="#kontakt">Kontakt</a>
</nav>
<p class="hemlig">Det här ska ingen se!</p>
<p>Välkommen till min sida.</p>
`,
    hints: [
      'Två rader i nav a, och en ny regel för .hemlig.',
      'display: inline-block och padding: 8px 16px.',
      'display: inline-block;\npadding: 8px 16px;\n.hemlig { display: none; }',
    ],
    tests: [
      {
        description: 'Länkarna är inline-block',
        code: "css('nav a', 'display')",
        expected: 'inline-block',
      },
      {
        description: 'Länkarna har 8px padding uppe och 16px på sidorna',
        code: "[px('nav a', 'padding-top'), px('nav a', 'padding-left')]",
        expected: [8, 16],
      },
      {
        description: 'Det hemliga stycket syns inte',
        code: "css('.hemlig', 'display')",
        expected: 'none',
      },
    ],
  },
  {
    id: 'boxen-09',
    track: 'boxen',
    title: 'Laga kortet',
    xp: 25,
    description:
      'Någon har försökt göra ett kort, men det blev fel på tre ställen. Kan du hitta dem?',
    explain:
      'När något ser fel ut i CSS: kolla en egenskap i taget.\n\n- Står egenskapen rätt stavad? En felstavad egenskap hoppas bara över – titta efter den gula rutan.\n- Är värdena i rätt ordning? `margin: 0 auto` och `margin: auto 0` är inte samma sak.\n- Räknas padding och kant med i bredden?\n\nHåll musen över en egenskap i editorn så förklaras den.',
    example: '.kort {\n  box-sizing: border-box;\n  margin: 0 auto;\n}',
    task: 'Uppgift: Kortet ska vara exakt `320px` brett med kanten, ha en `1px` grå (`gray`) kant och stå mitt på sidan. Laga de tre felen.',
    starterCode: `<style>
  body { background-color: whitesmoke; }
  .kort {
    width: 320px;
    padding: 16px;
    boder: 1px solid gray;
    margin: auto 0;
    background-color: white;
  }
</style>
<div class="kort">
  <h2>Laga mig!</h2>
  <p>Jag ska vara 320 pixlar bred, ha en grå kant och stå mitt på sidan.</p>
</div>
`,
    solution: `<style>
  body { background-color: whitesmoke; }
  .kort {
    box-sizing: border-box;
    width: 320px;
    padding: 16px;
    border: 1px solid gray;
    margin: 0 auto;
    background-color: white;
  }
</style>
<div class="kort">
  <h2>Laga mig!</h2>
  <p>Jag ska vara 320 pixlar bred, ha en grå kant och stå mitt på sidan.</p>
</div>
`,
    hints: [
      'Läs den gula rutan – en egenskap är felstavad.',
      'margin: auto 0 sätter auto uppe och nere. Sidorna ska ha auto.',
      'border, margin: 0 auto och box-sizing: border-box.',
    ],
    tests: [
      {
        description: 'Kortet har en 1px grå kant',
        code: "[px('.kort', 'border-top-width'), colorOf('.kort', 'border-top-color')]",
        expected: [1, 'gray'],
      },
      {
        description: 'Hela kortet är 320px brett',
        code: "boxWidth('.kort')",
        expected: 320,
      },
      {
        description: 'Kortet står mitt på sidan',
        code: "centered('.kort')",
        expected: true,
      },
    ],
  },
];
