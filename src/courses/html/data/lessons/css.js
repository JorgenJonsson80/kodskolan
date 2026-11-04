// Bana 6: färg och form med CSS. Reglerna står i <style> överst i koden,
// så att övningarna blir korta – på en riktig sida står det i head. Ingen
// padding, margin, border, width eller display (bana 7). Färger rättas
// med colorOf(), som ger namnet eller hexkoden oavsett hur eleven skrev
// färgen, och storlekar med px().

export const CSS = [
  {
    id: 'css-01',
    track: 'css',
    title: 'Din första regel',
    xp: 15,
    description:
      'HTML säger vad som står på sidan. CSS säger hur det ska se ut: färger, typsnitt, storlekar och luft.',
    explain:
      'CSS skrivs som regler i en `<style>`-tagg. En regel har tre delar:\n\n`h1 { color: tomato; }`\n\n`h1` är **selektorn** – vilka element regeln gäller. Mellan `{` och `}` står **egenskapen** `color`, ett kolon, **värdet** `tomato` och ett semikolon.\n\nPå en riktig sida står `<style>` i `head`. Här står den överst, så att koden blir kort.',
    example: '<style>\n  h1 { color: tomato; }\n</style>\n<h1>Hej!</h1>',
    task: 'Uppgift: Skriv en regel som gör rubriken `tomato`-färgad. Stycket ska vara kvar som det är.',
    starterCode: `<style>
  /* Skriv din regel här */
</style>
<h1>Min sida</h1>
<p>Välkommen hit!</p>
`,
    solution: `<style>
  h1 { color: tomato; }
</style>
<h1>Min sida</h1>
<p>Välkommen hit!</p>
`,
    hints: [
      'Selektorn är namnet på taggen, utan < och >.',
      'Egenskapen för textens färg heter color.',
      'h1 { color: tomato; }',
    ],
    tests: [
      {
        description: 'Rubriken är tomato',
        code: "colorOf('h1')",
        expected: 'tomato',
      },
      {
        description: 'Stycket är fortfarande svart',
        code: "colorOf('p')",
        expected: 'black',
      },
    ],
  },
  {
    id: 'css-02',
    track: 'css',
    title: 'Flera regler',
    xp: 15,
    description:
      'En sida har oftast många regler. Och en regel kan gälla flera sorters element på en gång.',
    explain:
      'Skriv en regel per selektor, gärna på var sin rad.\n\nSka flera sorters element se likadana ut sätter du komma mellan selektorerna: `h2, p { … }` gäller både alla `h2` och alla `p`.\n\nEn regel kan också ha flera egenskaper. Varje egenskap slutar med `;`.',
    example: 'h1 { color: navy; }\nh2, h3 { color: teal; }',
    task: 'Uppgift: Gör `h1` `navy`. Gör sedan alla `h2` och alla `p` `dimgray` med **en** regel.',
    starterCode: `<style>
  /* Skriv dina regler här */
</style>
<h1>Mina djur</h1>
<h2>Katten</h2>
<p>Måns sover helst i en låda.</p>
<h2>Hunden</h2>
<p>Doris vill alltid leka.</p>
`,
    solution: `<style>
  h1 { color: navy; }
  h2, p { color: dimgray; }
</style>
<h1>Mina djur</h1>
<h2>Katten</h2>
<p>Måns sover helst i en låda.</p>
<h2>Hunden</h2>
<p>Doris vill alltid leka.</p>
`,
    hints: [
      'Två regler: en för h1 och en för h2 och p.',
      'Komma mellan selektorerna: h2, p { … }',
      'h1 { color: navy; }\nh2, p { color: dimgray; }',
    ],
    tests: [
      {
        description: 'h1 är navy',
        code: "colorOf('h1')",
        expected: 'navy',
      },
      {
        description: 'Båda h2 är dimgray',
        code: "colorsOf('h2')",
        expected: ['dimgray', 'dimgray'],
      },
      {
        description: 'Båda stycken är dimgray',
        code: "colorsOf('p')",
        expected: ['dimgray', 'dimgray'],
      },
    ],
  },
  {
    id: 'css-03',
    track: 'css',
    title: 'Klasser',
    xp: 15,
    description:
      'Ibland ska bara några av styckena se annorlunda ut. Då ger du dem en klass.',
    explain:
      'Attributet `class` ger ett element ett namn som du hittar på: `<p class="viktig">`.\n\nI CSS väljer du klassen med en punkt före namnet: `.viktig { … }`. Regeln gäller bara elementen med den klassen, oavsett vilken tagg de har.\n\nSamma klass kan stå på hur många element som helst.',
    example:
      '<style>\n  .viktig { color: crimson; }\n</style>\n<p class="viktig">Brandövning kl. 10!</p>\n<p>Vanlig dag annars.</p>',
    task: 'Uppgift: Ge första och tredje stycket klassen `viktig`, och skriv en regel som gör `.viktig` `crimson`. Stycket i mitten ska vara svart.',
    starterCode: `<style>
  /* Skriv din regel här */
</style>
<h1>Nyheter</h1>
<p>Skolan stänger kl. 15 på fredag.</p>
<p>Matsalen serverar tacos på torsdag.</p>
<p>Glöm inte gympakläderna!</p>
`,
    solution: `<style>
  .viktig { color: crimson; }
</style>
<h1>Nyheter</h1>
<p class="viktig">Skolan stänger kl. 15 på fredag.</p>
<p>Matsalen serverar tacos på torsdag.</p>
<p class="viktig">Glöm inte gympakläderna!</p>
`,
    hints: [
      'Två saker: class="viktig" på två stycken, och en regel i <style>.',
      'Klassen väljs med en punkt: .viktig',
      '<p class="viktig">…</p> och .viktig { color: crimson; }',
    ],
    tests: [
      {
        description: 'Två element har klassen viktig',
        code: "count('.viktig')",
        expected: 2,
      },
      {
        description: 'Första och tredje stycket är crimson, mitten svart',
        code: "colorsOf('p')",
        expected: ['crimson', 'black', 'crimson'],
      },
    ],
  },
  {
    id: 'css-04',
    track: 'css',
    title: 'id – det finns bara en',
    xp: 15,
    description:
      'Du har redan använt `id` för länkar som hoppar ner på sidan. Det går att välja i CSS också.',
    explain:
      'I CSS väljer du ett `id` med `#`: `#logga { … }`.\n\nEtt `id` får bara finnas **en** gång på sidan, men en klass hur många gånger som helst. Därför använder de flesta klasser för utseendet och sparar `id` till länkar och formulär.\n\nEtt element kan ha både `id` och `class`.',
    example:
      '<style>\n  #logga { color: darkorange; }\n</style>\n<h1 id="logga">Kalles kiosk</h1>',
    task: 'Uppgift: Ge rubriken `id="logga"` och skriv en regel med `#logga` som gör den `darkorange`.',
    starterCode: `<style>
  /* Skriv din regel här */
</style>
<h1>Kalles kiosk</h1>
<p>Glass, godis och tidningar sedan 1987.</p>
`,
    solution: `<style>
  #logga { color: darkorange; }
</style>
<h1 id="logga">Kalles kiosk</h1>
<p>Glass, godis och tidningar sedan 1987.</p>
`,
    hints: [
      'id="logga" står i h1-taggen.',
      'I CSS skrivs id med # före namnet.',
      '#logga { color: darkorange; }',
    ],
    tests: [
      {
        description: 'Rubriken har id="logga"',
        code: "attr('h1', 'id')",
        expected: 'logga',
      },
      {
        description: 'Rubriken är darkorange',
        code: "colorOf('#logga')",
        expected: 'darkorange',
      },
    ],
  },
  {
    id: 'css-05',
    track: 'css',
    title: 'Färger på tre sätt',
    xp: 20,
    description:
      'Det finns 148 färgnamn, men vill du ha exakt rätt blå skriver du färgen med siffror.',
    explain:
      '**Hexkod:** `#1e3a8a`. Tre par efter `#`: hur mycket rött, grönt och blått, från `00` (inget) till `ff` (fullt). `#ff0000` är rött och `#000000` svart.\n\n**rgb:** `rgb(22, 101, 52)`. Samma tre färger, men som tal från 0 till 255.\n\n**Namn:** `tomato`, `navy`. Lätt att läsa, men färre att välja mellan.\n\nHexkoderna hittar du i färgväljare och designprogram.',
    example: 'h1 { color: #1e3a8a; }\np { color: rgb(22, 101, 52); }',
    task: 'Uppgift: Gör rubriken `#1e3a8a` med hexkod och stycket `rgb(22, 101, 52)` med rgb.',
    starterCode: `<style>
  /* Skriv dina regler här */
</style>
<h1>Havet</h1>
<p>Under ytan växer sjögräs i alla gröna nyanser.</p>
`,
    solution: `<style>
  h1 { color: #1e3a8a; }
  p { color: rgb(22, 101, 52); }
</style>
<h1>Havet</h1>
<p>Under ytan växer sjögräs i alla gröna nyanser.</p>
`,
    hints: [
      'Två regler, en för h1 och en för p.',
      'Hexkoden skrivs med # och sex tecken, rgb med tre tal och komma.',
      'h1 { color: #1e3a8a; }\np { color: rgb(22, 101, 52); }',
    ],
    tests: [
      {
        description: 'Rubriken är #1e3a8a',
        code: "colorOf('h1')",
        expected: '#1e3a8a',
      },
      {
        description: 'Stycket är rgb(22, 101, 52), alltså #166534',
        code: "colorOf('p')",
        expected: '#166534',
      },
    ],
  },
  {
    id: 'css-06',
    track: 'css',
    title: 'Bakgrund',
    xp: 15,
    description:
      'Bakgrundsfärg gör att delar av sidan sticker ut – eller att hela sidan får en egen känsla.',
    explain:
      '`background-color` färgar bakgrunden bakom ett element. På `body` blir det hela sidan.\n\nEn rubrik är lika bred som sidan, så bakgrunden blir en hel rand.\n\nTänk på kontrasten: mörk text på ljus bakgrund eller ljus text på mörk. Annars blir det svårt att läsa.',
    example:
      'body { background-color: ivory; }\nh1 { color: white; background-color: teal; }',
    task: 'Uppgift: Ge hela sidan bakgrunden `ivory`. Gör rubriken `white` med bakgrunden `teal`.',
    starterCode: `<style>
  /* Skriv dina regler här */
</style>
<h1>Strandhuset</h1>
<p>Hyr en stuga vid havet hela sommaren.</p>
`,
    solution: `<style>
  body { background-color: ivory; }
  h1 { color: white; background-color: teal; }
</style>
<h1>Strandhuset</h1>
<p>Hyr en stuga vid havet hela sommaren.</p>
`,
    hints: [
      'Hela sidan är body.',
      'h1-regeln har två egenskaper: color och background-color.',
      'body { background-color: ivory; }\nh1 { color: white; background-color: teal; }',
    ],
    tests: [
      {
        description: 'Sidans bakgrund är ivory',
        code: "colorOf('body', 'background-color')",
        expected: 'ivory',
      },
      {
        description: 'Rubrikens bakgrund är teal',
        code: "colorOf('h1', 'background-color')",
        expected: 'teal',
      },
      {
        description: 'Rubriken är white',
        code: "colorOf('h1')",
        expected: 'white',
      },
    ],
  },
  {
    id: 'css-07',
    track: 'css',
    title: 'Typsnitt och storlek',
    xp: 20,
    description:
      'Typsnittet ger sidan sin röst. Storleken visar vad som är viktigast.',
    explain:
      '`font-family` väljer typsnitt. Skriv flera med komma emellan: `Verdana, sans-serif`. Har datorn inte Verdana tar den nästa, och `sans-serif` finns alltid.\n\n`font-size` är storleken. `rem` betyder gånger sidans vanliga textstorlek, som oftast är 16px. `2rem` blir 32px, och växer om någon har valt större text.\n\nTypsnitt **ärvs**: sätter du det på `body` får allt på sidan det.',
    example: 'body { font-family: Georgia, serif; }\nh1 { font-size: 2.5rem; }',
    task: 'Uppgift: Ge hela sidan typsnittet `Verdana, sans-serif`. Gör rubriken `3rem` och stycket `1.25rem`.',
    starterCode: `<style>
  /* Skriv dina regler här */
</style>
<h1>Rymden</h1>
<p>Solen är en stjärna, och den är 109 gånger bredare än jorden.</p>
`,
    solution: `<style>
  body { font-family: Verdana, sans-serif; }
  h1 { font-size: 3rem; }
  p { font-size: 1.25rem; }
</style>
<h1>Rymden</h1>
<p>Solen är en stjärna, och den är 109 gånger bredare än jorden.</p>
`,
    hints: [
      'Typsnittet på body ärvs av rubriken och stycket.',
      'Storleken skrivs med enheten rem direkt efter talet, utan mellanslag.',
      'body { font-family: Verdana, sans-serif; }\nh1 { font-size: 3rem; }',
    ],
    tests: [
      {
        description: 'Rubriken och stycket har typsnittet Verdana',
        code: "[font('h1'), font('p')]",
        expected: ['verdana', 'verdana'],
      },
      {
        description: 'Rubriken är 3rem (48px)',
        code: "px('h1', 'font-size')",
        expected: 48,
      },
      {
        description: 'Stycket är 1.25rem (20px)',
        code: "px('p', 'font-size')",
        expected: 20,
      },
    ],
  },
  {
    id: 'css-08',
    track: 'css',
    title: 'Text som är lätt att läsa',
    xp: 15,
    description:
      'Var texten står och hur tätt raderna sitter gör stor skillnad för den som läser.',
    explain:
      '`text-align: center` ställer texten i mitten. `left` och `right` finns också.\n\n`line-height` är avståndet mellan raderna. Ett tal utan enhet, som `1.5`, betyder 1,5 gånger textens storlek. Lite luft gör långa stycken lättare att läsa.\n\n`text-decoration: none` tar bort strecket under en länk.',
    example:
      'h1 { text-align: center; }\np { line-height: 1.5; }\na { text-decoration: none; }',
    task: 'Uppgift: Ställ rubriken i mitten, ge stycket `line-height: 1.5` och ta bort strecket under länken.',
    starterCode: `<style>
  /* Skriv dina regler här */
</style>
<h1>Bokklubben</h1>
<p>Vi träffas varannan tisdag och pratar om en bok vi har läst. Alla får tycka till, och det finns alltid fika. Den här månaden läser vi en bok om en drake som är rädd för eld.</p>
<p><a href="https://sv.wikipedia.org/wiki/Bok">Läs mer om böcker</a></p>
`,
    solution: `<style>
  h1 { text-align: center; }
  p { line-height: 1.5; }
  a { text-decoration: none; }
</style>
<h1>Bokklubben</h1>
<p>Vi träffas varannan tisdag och pratar om en bok vi har läst. Alla får tycka till, och det finns alltid fika. Den här månaden läser vi en bok om en drake som är rädd för eld.</p>
<p><a href="https://sv.wikipedia.org/wiki/Bok">Läs mer om böcker</a></p>
`,
    hints: [
      'Tre regler: h1, p och a.',
      'text-align, line-height och text-decoration.',
      'h1 { text-align: center; }\np { line-height: 1.5; }\na { text-decoration: none; }',
    ],
    tests: [
      {
        description: 'Rubriken står i mitten',
        code: "css('h1', 'text-align')",
        expected: 'center',
      },
      {
        description: 'Styckets rader är 1,5 gånger textens storlek (24px)',
        code: "px('p', 'line-height')",
        expected: 24,
      },
      {
        description: 'Länken har inget streck under',
        code: "css('a', 'text-decoration-line')",
        expected: 'none',
      },
    ],
  },
  {
    id: 'css-09',
    track: 'css',
    title: 'Vilken regel vinner?',
    xp: 20,
    description:
      'Två regler vill ge samma element olika färg. Vem bestämmer? Och hur ändrar man något när musen är över?',
    explain:
      'När regler krockar vinner den mest **specifika** selektorn:\n\n- en tagg (`p`) är svagast\n- en klass (`.rea`) är starkare\n- ett id (`#erbjudanden`) är starkast\n\nSelektorer läggs ihop: `#erbjudanden p` har ett id och en tagg, och slår därför `.rea`. `#erbjudanden .rea` slår båda. Är två lika starka vinner den som står sist.\n\n`:hover` efter en selektor gäller när musen är över elementet: `a:hover { color: red; }`.',
    example:
      '#meny a { color: black; }\n#meny .vald { color: red; }\na:hover { color: darkorange; }',
    task: 'Uppgift: Rean ska vara röd, men regeln för `#erbjudanden p` vinner. Ändra selektorn `.rea` så att den vinner – utan att ta bort den första regeln. Gör sedan länken `darkorange` när musen är över.',
    starterCode: `<style>
  #erbjudanden p { color: black; }
  .rea { color: red; }
  /* Skriv din hover-regel här */
</style>
<div id="erbjudanden">
  <h2>Veckans erbjudanden</h2>
  <p>Bananer 19 kr/kg</p>
  <p class="rea">REA: Jordgubbar 25 kr</p>
</div>
<p><a href="#erbjudanden">Till erbjudandena</a></p>
`,
    solution: `<style>
  #erbjudanden p { color: black; }
  #erbjudanden .rea { color: red; }
  a:hover { color: darkorange; }
</style>
<div id="erbjudanden">
  <h2>Veckans erbjudanden</h2>
  <p>Bananer 19 kr/kg</p>
  <p class="rea">REA: Jordgubbar 25 kr</p>
</div>
<p><a href="#erbjudanden">Till erbjudandena</a></p>
`,
    hints: [
      '#erbjudanden p har ett id. .rea behöver också ett id för att vinna.',
      'Skriv #erbjudanden framför .rea, med mellanslag.',
      '#erbjudanden .rea { color: red; }\na:hover { color: darkorange; }',
    ],
    tests: [
      {
        description: 'Rean är röd',
        code: "colorOf('.rea')",
        expected: 'red',
      },
      {
        description: 'Bananerna är fortfarande svarta',
        code: "colorOf('#erbjudanden p')",
        expected: 'black',
      },
      {
        description: 'Länken blir darkorange när musen är över',
        code: "colorName(hover('a', 'color'))",
        expected: 'darkorange',
      },
    ],
  },
];
