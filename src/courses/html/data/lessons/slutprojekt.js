// Bana 11: slutprojektet – det som håller ihop en hel, egen sajt. Inga nya
// taggar, utan planering, ett färgtema med CSS-variabler, klasser som
// återanvänds och detaljer som gör sidan trevlig att använda. jsdom räknar
// inte ut var(--…), så övningar med variabler rättas bara i Chrome.

const MOBIL = 375;

export const SLUTPROJEKT = [
  {
    id: 'slutprojekt-01',
    track: 'slutprojekt',
    title: 'Planera sidan',
    xp: 15,
    description:
      'En hel sajt börjar med en plan. Innan någon CSS skrivs bestämmer du vilka delar sidan har.',
    explain:
      'Skriv skelettet först, med taggarna från bana 4:\n\n- `header` med sajtens namn och en `nav`\n- `main` med en `section` för varje del\n- `footer` längst ner\n\nGe varje `section` ett `id`, så att menyn kan länka dit med `href="#id"`. Då fungerar sidan redan innan den är snygg – och det är lätt att se om något fattas.',
    example:
      '<nav>\n  <a href="#om">Om mig</a>\n</nav>\n<main>\n  <section id="om">\n    <h2>Om mig</h2>\n  </section>\n</main>',
    task: 'Uppgift: Bygg skelettet efter planen i kommentaren: `header` med en `h1` och en `nav` med tre länkar, `main` med tre `section` (`id` `om`, `projekt` och `kontakt`) med en `h2` var, och en `footer`. Länkarna går till de tre sektionerna, i samma ordning.',
    starterCode: `<!--
  Plan för min sajt:
  - Överst: sajtens namn och en meny med tre länkar
  - Om mig
  - Mina projekt
  - Kontakt
  - Längst ner: en sidfot
-->
`,
    solution: `<!--
  Plan för min sajt:
  - Överst: sajtens namn och en meny med tre länkar
  - Om mig
  - Mina projekt
  - Kontakt
  - Längst ner: en sidfot
-->
<header>
  <h1>Kims sajt</h1>
  <nav>
    <a href="#om">Om mig</a>
    <a href="#projekt">Projekt</a>
    <a href="#kontakt">Kontakt</a>
  </nav>
</header>
<main>
  <section id="om">
    <h2>Om mig</h2>
  </section>
  <section id="projekt">
    <h2>Mina projekt</h2>
  </section>
  <section id="kontakt">
    <h2>Kontakt</h2>
  </section>
</main>
<footer>© Kim</footer>
`,
    hints: [
      'header, main och footer i den ordningen. nav står inuti header.',
      'Varje section har ett id, och varje länk har samma id efter #.',
      '<a href="#om">Om mig</a> … <section id="om"><h2>Om mig</h2></section>',
    ],
    tests: [
      {
        description: 'Sidan har header med h1, main och footer',
        code: "[count('header h1'), count('main'), count('footer')]",
        expected: [1, 1, 1],
      },
      {
        description: 'main har tre sektioner med id och en h2 var',
        code: "[$$('main section').map(section => section.id), count('main section h2')]",
        expected: [['om', 'projekt', 'kontakt'], 3],
      },
      {
        description: 'Menyn länkar till de tre sektionerna',
        code: "$$('header nav a').map(link => link.getAttribute('href'))",
        expected: ['#om', '#projekt', '#kontakt'],
      },
    ],
  },
  {
    id: 'slutprojekt-02',
    track: 'slutprojekt',
    title: 'Ett färgtema',
    xp: 20,
    description:
      'Samma färg står på tre ställen. Vill du byta färg måste du hitta alla – och glömmer du en ser det konstigt ut.',
    explain:
      'En **CSS-variabel** är ett namn för ett värde. Den skrivs i `:root`, som är hela sidan, och börjar med två bindestreck:\n\n`:root { --huvudfarg: teal; }`\n\nSedan använder du den med `var()`: `color: var(--huvudfarg);`\n\nNu står färgen på *ett* ställe. Byt den i `:root`, så byter hela sidan färg. Så gör nästan alla sajter med sina färger.',
    example:
      ':root {\n  --huvudfarg: teal;\n}\nh1 {\n  color: var(--huvudfarg);\n}',
    task: 'Uppgift: Skapa variablerna `--huvudfarg: teal` och `--bakgrund: mintcream` i `:root`. Använd `--huvudfarg` i stället för `teal` på alla tre ställena, och `--bakgrund` för sidans bakgrund.',
    starterCode: `<style>
  body {
    background-color: mintcream;
  }
  h1 {
    color: teal;
  }
  .knapp {
    background-color: teal;
    color: white;
    padding: 8px 16px;
  }
  footer {
    border-top: 2px solid teal;
  }
</style>
<h1>Trädgårdsklubben</h1>
<a class="knapp" href="#">Bli medlem</a>
<footer>Vi ses i växthuset!</footer>
`,
    solution: `<style>
  :root {
    --huvudfarg: teal;
    --bakgrund: mintcream;
  }
  body {
    background-color: var(--bakgrund);
  }
  h1 {
    color: var(--huvudfarg);
  }
  .knapp {
    background-color: var(--huvudfarg);
    color: white;
    padding: 8px 16px;
  }
  footer {
    border-top: 2px solid var(--huvudfarg);
  }
</style>
<h1>Trädgårdsklubben</h1>
<a class="knapp" href="#">Bli medlem</a>
<footer>Vi ses i växthuset!</footer>
`,
    hints: [
      'Börja med en regel för :root med de två variablerna.',
      'Byt varje teal mot var(--huvudfarg).',
      ':root { --huvudfarg: teal; --bakgrund: mintcream; }',
    ],
    tests: [
      {
        description: 'Sidan ser ut som förut',
        code: "[colorOf('h1'), colorOf('.knapp', 'background-color'), colorOf('body', 'background-color')]",
        expected: ['teal', 'teal', 'mintcream'],
      },
      {
        description: 'Byts --huvudfarg byter alla tre ställena färg',
        code: "(doc.documentElement.style.setProperty('--huvudfarg', 'crimson'), [colorOf('h1'), colorOf('.knapp', 'background-color'), colorOf('footer', 'border-top-color')])",
        expected: ['crimson', 'crimson', 'crimson'],
      },
      {
        description: 'Byts --bakgrund byter sidan färg',
        code: "(doc.documentElement.style.setProperty('--bakgrund', 'ivory'), colorOf('body', 'background-color'))",
        expected: 'ivory',
      },
    ],
  },
  {
    id: 'slutprojekt-03',
    track: 'slutprojekt',
    title: 'Klasser som återanvänds',
    xp: 20,
    description:
      'Sajten har knappar på många ställen, i två storlekar. Skriv utseendet en gång och använd det överallt.',
    explain:
      'En bra klass beskriver *vad* något är, inte var det står: `.knapp`, inte `.knapp-i-sidhuvudet`.\n\nVarianter får en klass till, som bara ändrar det som skiljer: `class="knapp knapp-stor"`. Elementet får då båda reglerna. `.knapp-stor` står efter `.knapp` och vinner där de krockar.\n\nSå slipper du skriva färg, hörn och padding på nytt för varje knapp.',
    example:
      '.knapp {\n  padding: 8px 16px;\n}\n.knapp-stor {\n  padding: 16px 32px;\n}',
    task: 'Uppgift: Ge `.knapp` bakgrunden `royalblue`, vit text utan streck, padding `8px 16px`, hörnen `6px` och `display: inline-block`. Ge `.knapp-stor` padding `16px 32px` och storleken `1.25rem`.',
    starterCode: `<style>
  /* Skriv .knapp och .knapp-stor här */
</style>
<h1>Lägret</h1>
<p><a class="knapp knapp-stor" href="#">Anmäl dig nu</a></p>
<p>Frågor? <a class="knapp" href="#">Skriv till oss</a></p>
`,
    solution: `<style>
  .knapp {
    display: inline-block;
    background-color: royalblue;
    color: white;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 6px;
  }
  .knapp-stor {
    padding: 16px 32px;
    font-size: 1.25rem;
  }
</style>
<h1>Lägret</h1>
<p><a class="knapp knapp-stor" href="#">Anmäl dig nu</a></p>
<p>Frågor? <a class="knapp" href="#">Skriv till oss</a></p>
`,
    hints: [
      'Två regler: .knapp först, .knapp-stor efter.',
      '.knapp-stor behöver bara det som skiljer: padding och font-size.',
      '.knapp-stor { padding: 16px 32px; font-size: 1.25rem; }',
    ],
    tests: [
      {
        description: 'Båda knapparna är royalblue med vit text och 6px hörn',
        code: "[colorsOf('.knapp', 'background-color'), colorsOf('.knapp'), css('.knapp', 'border-radius')]",
        expected: [['royalblue', 'royalblue'], ['white', 'white'], '6px'],
      },
      {
        description: 'Den vanliga knappen har padding 8px 16px',
        code: "[px('.knapp:not(.knapp-stor)', 'padding-top'), px('.knapp:not(.knapp-stor)', 'padding-left')]",
        expected: [8, 16],
      },
      {
        description: 'Den stora har padding 16px 32px och 20px text',
        code: "[px('.knapp-stor', 'padding-top'), px('.knapp-stor', 'padding-left'), px('.knapp-stor', 'font-size')]",
        expected: [16, 32, 20],
      },
    ],
  },
  {
    id: 'slutprojekt-04',
    track: 'slutprojekt',
    title: 'Text som är lätt att läsa',
    xp: 20,
    description:
      'Texten går över hela skärmen och raderna står tätt. Det är jobbigt att läsa – ögat tappar bort sig.',
    explain:
      'Tre saker gör text lätt att läsa:\n\n- **Lagom långa rader.** Runt 65 tecken. Enheten `ch` är bredden av en siffra, så `max-width: 65ch` blir ungefär 65 tecken.\n- **Luft mellan raderna.** `line-height: 1.6` är 1,6 gånger textens storlek.\n- **Texten i mitten** med `margin: 0 auto`, när skärmen är bred.',
    example:
      'main {\n  max-width: 65ch;\n  margin: 0 auto;\n  line-height: 1.6;\n}',
    task: 'Uppgift: Ge `main` `max-width: 65ch`, `margin: 0 auto` och `line-height: 1.6`.',
    starterCode: `<style>
  body {
    font-family: Georgia, serif;
  }
</style>
<main>
  <h1>Hur bina hittar hem</h1>
  <p>Ett bi kan flyga flera kilometer för att hitta blommor, och ändå hitta
  tillbaka till kupan. Det använder solen som kompass och kommer ihåg hur
  landskapet ser ut: träd, hus och vägar blir till en karta i det lilla huvudet.</p>
  <p>När biet kommer hem dansar det. Dansen berättar för de andra bina åt
  vilket håll blommorna finns och hur långt bort de är.</p>
</main>
`,
    solution: `<style>
  body {
    font-family: Georgia, serif;
  }
  main {
    max-width: 65ch;
    margin: 0 auto;
    line-height: 1.6;
  }
</style>
<main>
  <h1>Hur bina hittar hem</h1>
  <p>Ett bi kan flyga flera kilometer för att hitta blommor, och ändå hitta
  tillbaka till kupan. Det använder solen som kompass och kommer ihåg hur
  landskapet ser ut: träd, hus och vägar blir till en karta i det lilla huvudet.</p>
  <p>När biet kommer hem dansar det. Dansen berättar för de andra bina åt
  vilket håll blommorna finns och hur långt bort de är.</p>
</main>
`,
    hints: [
      'En ny regel för main med tre egenskaper.',
      'ch är en enhet, som px. 65ch ungefär 65 tecken.',
      'main { max-width: 65ch; margin: 0 auto; line-height: 1.6; }',
    ],
    tests: [
      {
        description: 'main är smalare än sidan (65ch är ungefär 640px)',
        code: "widths('main')[0] > 500 && widths('main')[0] < widths('body')[0]",
        expected: true,
      },
      {
        description: 'Texten står i mitten',
        code: "centered('main')",
        expected: true,
      },
      {
        description: 'Raderna har 1,6 gånger textens höjd (25,6px)',
        code: "px('p', 'line-height')",
        expected: 25.6,
      },
    ],
  },
  {
    id: 'slutprojekt-05',
    track: 'slutprojekt',
    title: 'Den stora toppen',
    xp: 20,
    description:
      'Det första besökaren ser ska säga vad sajten handlar om – stort, tydligt och med en knapp.',
    explain:
      'Toppen på en sajt kallas ofta *hero*. Den har en stor rubrik, en mening och en knapp, och mycket luft.\n\nBakgrunden kan vara en **övergång** mellan två färger:\n\n`background: linear-gradient(to right, teal, navy);`\n\n`to right` betyder att färgen går från vänster till höger. Prova `to bottom` också.',
    example:
      '.topp {\n  background: linear-gradient(to right, teal, navy);\n  color: white;\n  padding: 64px 16px;\n  text-align: center;\n}',
    task: 'Uppgift: Ge `.topp` en `linear-gradient` från `teal` till `navy` (åt höger), vit text, padding `64px 16px` och texten i mitten.',
    starterCode: `<style>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
  .topp h1 {
    font-size: 2.5rem;
    margin: 0 0 8px;
  }
  /* Skriv regeln för .topp här */
</style>
<div class="topp">
  <h1>Robotklubben</h1>
  <p>Vi bygger robotar varje torsdag. Ingen förkunskap behövs!</p>
</div>
`,
    solution: `<style>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
  .topp h1 {
    font-size: 2.5rem;
    margin: 0 0 8px;
  }
  .topp {
    background: linear-gradient(to right, teal, navy);
    color: white;
    padding: 64px 16px;
    text-align: center;
  }
</style>
<div class="topp">
  <h1>Robotklubben</h1>
  <p>Vi bygger robotar varje torsdag. Ingen förkunskap behövs!</p>
</div>
`,
    hints: [
      'En ny regel för .topp med fyra egenskaper.',
      'background: linear-gradient(to right, teal, navy);',
      'color: white; padding: 64px 16px; text-align: center;',
    ],
    tests: [
      {
        description: 'Bakgrunden går från teal till navy',
        code: "css('.topp', 'background-image').replace(/rgb\\([^)]*\\)/g, colorName)",
        expected: 'linear-gradient(to right, teal, navy)',
      },
      {
        description: 'Texten är vit och i mitten',
        code: "[colorOf('.topp h1'), css('.topp', 'text-align')]",
        expected: ['white', 'center'],
      },
      {
        description: 'Toppen har padding 64px 16px',
        code: "[px('.topp', 'padding-top'), px('.topp', 'padding-left')]",
        expected: [64, 16],
      },
    ],
  },
  {
    id: 'slutprojekt-06',
    track: 'slutprojekt',
    title: 'Menyn hoppar rätt',
    xp: 20,
    description:
      'Två av länkarna i menyn går ingenstans, och sidan hoppar ryckigt när man trycker.',
    explain:
      'En länk till `#kontakt` hittar elementet med `id="kontakt"`. Stavas de olika händer ingenting – inget fel syns, länken gör bara ingenting.\n\n`scroll-behavior: smooth` på `html` gör att sidan glider dit i stället för att hoppa. Det är en rad som gör hela sajten trevligare.\n\nPå riktiga sidor hamnar rubriken ibland under ett sidhuvud som följer med. `scroll-margin-top` på sektionerna lämnar plats.',
    example: 'html {\n  scroll-behavior: smooth;\n}',
    task: 'Uppgift: Laga de två länkarna så att de hittar sina sektioner. Ge `html` `scroll-behavior: smooth`.',
    starterCode: `<style>
  section {
    min-height: 300px;
    padding: 16px;
  }
  section:nth-child(even) {
    background-color: whitesmoke;
  }
</style>
<nav>
  <a href="#recept">Recept</a>
  <a href="#ingredienser">Ingredienser</a>
  <a href="#Kontakt">Kontakt</a>
</nav>
<section id="recept"><h2>Recept</h2></section>
<section id="ingrediens"><h2>Ingredienser</h2></section>
<section id="kontakt"><h2>Kontakt</h2></section>
`,
    solution: `<style>
  html {
    scroll-behavior: smooth;
  }
  section {
    min-height: 300px;
    padding: 16px;
  }
  section:nth-child(even) {
    background-color: whitesmoke;
  }
</style>
<nav>
  <a href="#recept">Recept</a>
  <a href="#ingredienser">Ingredienser</a>
  <a href="#kontakt">Kontakt</a>
</nav>
<section id="recept"><h2>Recept</h2></section>
<section id="ingredienser"><h2>Ingredienser</h2></section>
<section id="kontakt"><h2>Kontakt</h2></section>
`,
    hints: [
      'Jämför varje href med sektionernas id. Stor och liten bokstav räknas.',
      'Antingen ändrar du länken eller id:t – de ska vara likadana.',
      'html { scroll-behavior: smooth; }',
    ],
    tests: [
      {
        description: 'Alla tre länkarna hittar en sektion',
        code: "$$('nav a').map(link => $(link.getAttribute('href'))?.tagName ?? null)",
        expected: ['SECTION', 'SECTION', 'SECTION'],
      },
      {
        description: 'Länkarna står kvar i samma ordning',
        code: "texts('nav a')",
        expected: ['Recept', 'Ingredienser', 'Kontakt'],
      },
      {
        description: 'Sidan glider i stället för att hoppa',
        code: "css('html', 'scroll-behavior')",
        expected: 'smooth',
      },
    ],
  },
  {
    id: 'slutprojekt-07',
    track: 'slutprojekt',
    title: 'Ett snyggt formulär',
    xp: 20,
    description:
      'Fälten i kontaktformuläret är olika breda och små. Och man ser inte vilket fält man skriver i.',
    explain:
      'Fyra saker gör ett formulär lätt att fylla i:\n\n- Fälten är lika breda: `width: 100%` med `box-sizing: border-box`\n- Lagom stora: `padding: 8px`\n- En tydlig kant med runda hörn\n- `:focus` – fältet man skriver i syns. Det fungerar som `:hover`, men gäller när fältet är valt.\n\n`font: inherit` ger fälten samma typsnitt som resten av sidan. Annars väljer webbläsaren ett eget.',
    example: 'input:focus {\n  border-color: teal;\n  outline: none;\n}',
    task: 'Uppgift: Ge `input` och `textarea` `width: 100%`, `box-sizing: border-box`, padding `8px`, kanten `2px solid lightgray`, hörnen `6px` och `font: inherit`. När fältet är valt (`:focus`) ska kanten vara `teal` och `outline: none`.',
    starterCode: `<style>
  form {
    max-width: 400px;
  }
  label {
    display: block;
    margin-top: 12px;
  }
  /* Skriv reglerna för fälten här */
</style>
<form>
  <label for="namn">Namn</label>
  <input id="namn" name="namn">
  <label for="meddelande">Meddelande</label>
  <textarea id="meddelande" name="meddelande"></textarea>
</form>
`,
    solution: `<style>
  form {
    max-width: 400px;
  }
  label {
    display: block;
    margin-top: 12px;
  }
  input,
  textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 8px;
    border: 2px solid lightgray;
    border-radius: 6px;
    font: inherit;
  }
  input:focus,
  textarea:focus {
    border-color: teal;
    outline: none;
  }
</style>
<form>
  <label for="namn">Namn</label>
  <input id="namn" name="namn">
  <label for="meddelande">Meddelande</label>
  <textarea id="meddelande" name="meddelande"></textarea>
</form>
`,
    hints: [
      'Två regler: input, textarea och input:focus, textarea:focus.',
      'Selektorer med komma emellan gäller båda.',
      'input:focus, textarea:focus { border-color: teal; outline: none; }',
    ],
    tests: [
      {
        description: 'Fälten är lika breda som formuläret',
        code: "[widths('input')[0], widths('textarea')[0]].every(width => width === widths('form')[0])",
        expected: true,
      },
      {
        description: 'Fälten har padding 8px, 2px lightgray kant och 6px hörn',
        code: "[px('input', 'padding-top'), px('textarea', 'border-top-width'), colorOf('input', 'border-top-color'), css('textarea', 'border-radius')]",
        expected: [8, 2, 'lightgray', '6px'],
      },
      {
        description: 'Det valda fältet får en teal kant',
        code: "[colorName(focus('input', 'border-color')), colorName(focus('textarea', 'border-color'))]",
        expected: ['teal', 'teal'],
      },
    ],
  },
  {
    id: 'slutprojekt-08',
    track: 'slutprojekt',
    title: 'Ett sidhuvud som följer med',
    xp: 20,
    description:
      'Sidan är lång. När man skrollat ner försvinner menyn – och då är den svår att hitta.',
    explain:
      '`position: sticky` gör att elementet följer med när man skrollar, men först när det har nått kanten.\n\n`top: 0` säger *vilken* kant: det fastnar högst upp.\n\nEtt sidhuvud som följer med behöver också en bakgrund. Annars syns texten under igenom.',
    example:
      'header {\n  position: sticky;\n  top: 0;\n  background-color: white;\n}',
    task: 'Uppgift: Låt `header` följa med högst upp när man skrollar, med vit bakgrund.',
    starterCode: `<style>
  header {
    padding: 12px;
    border-bottom: 1px solid lightgray;
  }
  section {
    min-height: 500px;
  }
</style>
<header>🦖 Dinosaurieboken – <a href="#tre">Triceratops</a></header>
<section><h2>Tyrannosaurus</h2><p>Den mest kända av dem alla.</p></section>
<section id="tre"><h2>Triceratops</h2><p>Tre horn och en stor krage.</p></section>
`,
    solution: `<style>
  header {
    position: sticky;
    top: 0;
    background-color: white;
    padding: 12px;
    border-bottom: 1px solid lightgray;
  }
  section {
    min-height: 500px;
  }
</style>
<header>🦖 Dinosaurieboken – <a href="#tre">Triceratops</a></header>
<section><h2>Tyrannosaurus</h2><p>Den mest kända av dem alla.</p></section>
<section id="tre"><h2>Triceratops</h2><p>Tre horn och en stor krage.</p></section>
`,
    hints: [
      'Tre nya rader i regeln för header.',
      'position: sticky behöver top för att veta var den ska fastna.',
      'position: sticky; top: 0; background-color: white;',
    ],
    tests: [
      {
        description: 'Sidhuvudet är sticky med top: 0',
        code: "[css('header', 'position'), css('header', 'top')]",
        expected: ['sticky', '0px'],
      },
      {
        description: 'Det har vit bakgrund',
        code: "colorOf('header', 'background-color')",
        expected: 'white',
      },
      {
        description: 'Sidhuvudet står kvar högst upp när man har skrollat',
        code: "(doc.defaultView.scrollTo(0, 400), rect('header').top)",
        expected: 0,
      },
    ],
  },
  {
    id: 'slutprojekt-09',
    track: 'slutprojekt',
    title: 'Laga sidan',
    xp: 25,
    description:
      'Sidan ser nästan klar ut. Men en bild saknar beskrivning, ett fält saknar etikett och menyn sticker ut på mobilen.',
    explain:
      'Innan en sajt är klar, gå igenom:\n\n- Har alla bilder en `alt`? Den läses upp för den som inte ser bilden.\n- Har alla fält en `label` med `for` som är samma som fältets `id`? Då går det att trycka på texten, och skärmläsare vet vad fältet är till.\n- Får sidan plats på mobilen? Tryck på 📱.\n\nDe här sakerna syns inte alltid, men gör sajten bättre för alla.',
    example:
      '<label for="epost">E-post</label>\n<input id="epost" name="epost">',
    task: 'Uppgift: Ge bilden `alt="Ett ritat bord fullt med pannkakor"`. Ge fältet en `label` med texten `E-post` och `for="epost"`. Låt länkarna i `nav` gå vidare på en ny rad när de inte får plats.',
    starterCode: `<style>
  nav {
    display: flex;
    gap: 16px;
  }
  nav a {
    white-space: nowrap;
    background-color: lavender;
    padding: 8px 12px;
  }
  img {
    max-width: 100%;
    height: auto;
  }
</style>
<nav>
  <a href="#">Pannkakor</a>
  <a href="#">Våfflor</a>
  <a href="#">Plättar</a>
  <a href="#">Amerikanska pancakes</a>
</nav>
<img src="bilder/pannkakor.svg" width="400" height="300">
<form>
  <input id="epost" name="epost" type="email">
  <button>Få nya recept</button>
</form>
`,
    solution: `<style>
  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  nav a {
    white-space: nowrap;
    background-color: lavender;
    padding: 8px 12px;
  }
  img {
    max-width: 100%;
    height: auto;
  }
</style>
<nav>
  <a href="#">Pannkakor</a>
  <a href="#">Våfflor</a>
  <a href="#">Plättar</a>
  <a href="#">Amerikanska pancakes</a>
</nav>
<img src="bilder/pannkakor.svg" alt="Ett ritat bord fullt med pannkakor" width="400" height="300">
<form>
  <label for="epost">E-post</label>
  <input id="epost" name="epost" type="email">
  <button>Få nya recept</button>
</form>
`,
    hints: [
      'Den gula rutan pekar ut bilden.',
      'label står före input, och for är samma som input:ens id.',
      'flex-wrap: wrap; i regeln för nav.',
    ],
    tests: [
      {
        description: 'Bilden har en beskrivning',
        code: "attr('img', 'alt')",
        expected: 'Ett ritat bord fullt med pannkakor',
      },
      {
        description: 'Fältet har en label med texten E-post',
        code: "text('label[for=epost]')",
        expected: 'E-post',
      },
      {
        description: 'Sidan får plats på mobilen',
        code: 'fitsScreen()',
        expected: true,
        width: MOBIL,
      },
    ],
  },
];
