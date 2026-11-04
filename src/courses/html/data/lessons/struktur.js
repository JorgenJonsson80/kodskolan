// Bana 4: sidans delar och hela dokumentet. Webbläsaren skapar html, head
// och body själv om de saknas, så att de finns i koden kollas med
// sourceChecks. Inga formulär (bana 5) och ingen CSS (bana 6).

const SKELETON_CHECKS = [
  { description: 'Koden har <html>', pattern: /<html[\s>]/i },
  { description: 'Koden har <head>', pattern: /<head[\s>]/i },
  { description: 'Koden har <body>', pattern: /<body[\s>]/i },
];

const START = `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8">
    <title>Min sida</title>
  </head>
  <body>
`;
const END = `  </body>
</html>
`;

const BLOG_NAV = `<header>
  <h1>Min blogg</h1>
  <nav>
    <ul>
      <li><a href="#hem">Hem</a></li>
      <li><a href="#inlagg">Inlägg</a></li>
      <li><a href="#om">Om mig</a></li>
    </ul>
  </nav>
</header>
`;

export const STRUKTUR = [
  {
    id: 'struktur-01',
    track: 'struktur',
    title: 'Hela dokumentet',
    xp: 15,
    description:
      'Hittills har du skrivit bitar av en sida. En riktig sida har ett skal runt allt, som säger vad som är information om sidan och vad som syns.',
    explain:
      '`<!doctype html>` står allra först och säger "det här är modern HTML". Sedan kommer `<html>` runt allt.\n\nInuti `html` finns två delar: `<head>` med information om sidan, som inte syns, och `<body>` med allt som syns. Rubriker, stycken och bilder står alltid i `body`.',
    example:
      '<!doctype html>\n<html>\n  <head>\n  </head>\n  <body>\n    <p>Hej!</p>\n  </body>\n</html>',
    task: 'Uppgift: Skriv ett helt dokument: `<!doctype html>`, `html`, `head` och `body`. I `body` står rubriken `Min första riktiga sida` med `h1`.',
    starterCode: '<!-- Skriv din kod här -->\n',
    solution: `<!doctype html>
<html>
  <head>
  </head>
  <body>
    <h1>Min första riktiga sida</h1>
  </body>
</html>
`,
    hints: [
      'Börja med <!doctype html> på första raden.',
      'html runt allt, och i den först head och sedan body.',
      '<body>\n  <h1>Min första riktiga sida</h1>\n</body>',
    ],
    tests: [
      {
        description: 'Sidan börjar med <!doctype html>',
        code: 'doc.doctype?.name ?? null',
        expected: 'html',
      },
      {
        description: 'Rubriken står i body',
        code: "text('body > h1')",
        expected: 'Min första riktiga sida',
      },
    ],
    sourceChecks: SKELETON_CHECKS,
  },
  {
    id: 'struktur-02',
    track: 'struktur',
    title: 'Titel och teckenkodning',
    xp: 15,
    description:
      'Det som står i fliken, i bokmärken och på Google kommer från `head`. Där säger du också hur å, ä och ö ska läsas.',
    explain:
      '`<title>` är sidans namn. Det syns i webbläsarens flik, inte på själva sidan.\n\n`<meta charset="utf-8">` säger vilken teckenkodning sidan har. Utan den kan å, ä och ö bli konstiga tecken. Den står först i `head` och stängs aldrig.',
    example:
      '<head>\n  <meta charset="utf-8">\n  <title>Mormors recept</title>\n</head>',
    task: 'Uppgift: Lägg till `<meta charset="utf-8">` och titeln `Mitt kök` i `head`.',
    starterCode: `<!doctype html>
<html>
  <head>
  </head>
  <body>
    <h1>Välkommen till mitt kök</h1>
  </body>
</html>
`,
    solution: `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Mitt kök</title>
  </head>
  <body>
    <h1>Välkommen till mitt kök</h1>
  </body>
</html>
`,
    hints: [
      'Båda raderna står mellan <head> och </head>.',
      '<meta charset="utf-8"> stängs aldrig.',
      '<title>Mitt kök</title>',
    ],
    tests: [
      {
        description: 'Sidan har teckenkodningen utf-8',
        code: "attr('head meta[charset]', 'charset')?.toLowerCase() ?? null",
        expected: 'utf-8',
      },
      {
        description: 'Titeln är Mitt kök',
        code: "text('head title')",
        expected: 'Mitt kök',
      },
    ],
  },
  {
    id: 'struktur-03',
    track: 'struktur',
    title: 'Sidans språk',
    xp: 10,
    description:
      'En skärmläsare som tror att sidan är på engelska läser svenska ord med engelskt uttal. Det låter inte klokt.',
    explain:
      'Attributet `lang` på `html` säger vilket språk sidan är skriven på: `sv` för svenska, `en` för engelska.\n\nSkärmläsare väljer röst efter det, webbläsaren vet när den ska erbjuda översättning och Google vet vem sidan passar.',
    example: '<html lang="en">',
    task: 'Uppgift: Säg att sidan är på svenska.',
    starterCode: `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Mitt kök</title>
  </head>
  <body>
    <h1>Välkommen till mitt kök</h1>
  </body>
</html>
`,
    solution: `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8">
    <title>Mitt kök</title>
  </head>
  <body>
    <h1>Välkommen till mitt kök</h1>
  </body>
</html>
`,
    hints: [
      'Det är html-taggen på rad 2 som ska ändras.',
      'Attributet heter lang.',
      '<html lang="sv">',
    ],
    tests: [
      {
        description: 'Sidan är på svenska',
        code: "doc.documentElement.getAttribute('lang')",
        expected: 'sv',
      },
    ],
  },
  {
    id: 'struktur-04',
    track: 'struktur',
    title: 'Sidhuvud och sidfot',
    xp: 15,
    description:
      'Nästan alla sidor har samma form: överst namnet och menyn, underst kontakt och ©. De delarna har egna taggar.',
    explain:
      '`<header>` är sidhuvudet, med sidans namn och ofta en meny. `<footer>` är sidfoten längst ner, med sådant som © och kontaktuppgifter.\n\nDe syns inte på sidan – texten ser likadan ut. Men nu vet webbläsaren, skärmläsaren och Google vad som är vad. Det kallas semantisk HTML: taggen säger vad innehållet är.',
    example:
      '<header>\n  <h1>Bageriet</h1>\n</header>\n<footer>\n  <p>Öppet alla dagar</p>\n</footer>',
    task: 'Uppgift: Lägg rubriken i en `header` och stycket med © i en `footer`.',
    starterCode: `${START}    <h1>Min blogg</h1>
    <p>Här skriver jag om allt jag lär mig.</p>
    <p>&copy; 2026 Ada</p>
${END}`,
    solution: `${START}    <header>
      <h1>Min blogg</h1>
    </header>
    <p>Här skriver jag om allt jag lär mig.</p>
    <footer>
      <p>&copy; 2026 Ada</p>
    </footer>
${END}`,
    hints: [
      '<header> före rubriken och </header> efter.',
      'Samma sak med footer runt sista stycket.',
      '<footer>\n  <p>&copy; 2026 Ada</p>\n</footer>',
    ],
    tests: [
      {
        description: 'Rubriken står i header',
        code: "text('header h1')",
        expected: 'Min blogg',
      },
      {
        description: '© står i footer',
        code: "text('footer p')",
        expected: '© 2026 Ada',
      },
    ],
  },
  {
    id: 'struktur-05',
    track: 'struktur',
    title: 'Menyn',
    xp: 15,
    description:
      'Menyn är sidans vägvisare. Med `nav` kan en skärmläsare hoppa direkt dit – eller förbi den.',
    explain:
      '`<nav>` (navigation) håller sidans viktigaste länkar. Inuti är det oftast en lista med länkar, som i bana 3.\n\nAnvänd `nav` bara för huvudmenyn och liknande, inte för varje länk på sidan. Menyn står oftast i `header`.',
    example:
      '<nav>\n  <ul>\n    <li><a href="#start">Start</a></li>\n  </ul>\n</nav>',
    task: 'Uppgift: Skriv en `nav` i `header`, efter rubriken. I den en punktlista med länkarna `Hem` till `#hem`, `Inlägg` till `#inlagg` och `Om mig` till `#om`.',
    starterCode: `<header>
  <h1>Min blogg</h1>
</header>
`,
    solution: BLOG_NAV,
    hints: [
      'nav står inuti header, efter </h1>.',
      'I nav: en ul med tre li, och en a i varje.',
      '<li><a href="#hem">Hem</a></li>',
    ],
    tests: [
      {
        description: 'Menyn står i header',
        code: "count('header nav')",
        expected: 1,
      },
      {
        description: 'Tre länkar i en lista i menyn',
        code: "texts('nav ul li a')",
        expected: ['Hem', 'Inlägg', 'Om mig'],
      },
      {
        description: 'Länkarna går till #hem, #inlagg och #om',
        code: "$$('nav a').map(a => a.getAttribute('href'))",
        expected: ['#hem', '#inlagg', '#om'],
      },
    ],
  },
  {
    id: 'struktur-06',
    track: 'struktur',
    title: 'Huvuddelen och avsnitt',
    xp: 20,
    description:
      'Mellan sidhuvudet och sidfoten står det sidan faktiskt handlar om. Det är `main`.',
    explain:
      '`<main>` är sidans huvudinnehåll. Det finns bara en `main` per sida, och den står inte i `header` eller `footer`.\n\nInuti delas innehållet i `<section>` – avsnitt som hör ihop, oftast med en egen rubrik. Tänk kapitel i en bok.',
    example:
      '<main>\n  <section>\n    <h2>Öppettider</h2>\n    <p>Alla dagar 8–17.</p>\n  </section>\n</main>',
    task: 'Uppgift: Skriv en `main` efter `header`. I den två `section`, den första med rubriken `Senaste nytt` och den andra med `Om mig`, båda med `h2` och ett stycke.',
    starterCode: BLOG_NAV,
    solution: `${BLOG_NAV}<main>
  <section>
    <h2>Senaste nytt</h2>
    <p>Idag lärde jag mig om main och section.</p>
  </section>
  <section>
    <h2>Om mig</h2>
    <p>Jag heter Ada och gillar att bygga saker.</p>
  </section>
</main>
`,
    hints: [
      'main står efter </header>, och båda section inuti main.',
      'Varje section har en h2 och ett p.',
      '<section>\n  <h2>Senaste nytt</h2>\n  <p>…</p>\n</section>',
    ],
    tests: [
      { description: 'En main', code: "count('main')", expected: 1 },
      {
        description: 'Två avsnitt i main med rätt rubriker',
        code: "texts('main > section > h2')",
        expected: ['Senaste nytt', 'Om mig'],
      },
      {
        description: 'Ett stycke i varje avsnitt',
        code: "count('main section p')",
        expected: 2,
      },
    ],
  },
  {
    id: 'struktur-07',
    track: 'struktur',
    title: 'Artiklar',
    xp: 20,
    description:
      'Ett blogginlägg, en nyhet, en recension – saker som skulle kunna stå för sig själva på en annan sida.',
    explain:
      '`<article>` är något som är helt i sig självt. Testa: skulle det gå att klippa ut och lägga på en annan sida, och ändå vara begripligt? Då är det en `article`.\n\n`section` är en del av något större, `article` en hel sak. En `section` kan innehålla flera `article` – som avsnittet `Senaste nytt` med flera inlägg.',
    example:
      '<article>\n  <h3>Ny glass i disken</h3>\n  <p>Nu finns päronglass!</p>\n</article>',
    task: 'Uppgift: Skriv två inlägg som `article` i avsnittet `Senaste nytt`, under rubriken. Det första har rubriken `Min första sida` och det andra `Nu kan jag listor`, båda med `h3` och ett stycke.',
    starterCode: `<main>
  <section>
    <h2>Senaste nytt</h2>
  </section>
</main>
`,
    solution: `<main>
  <section>
    <h2>Senaste nytt</h2>
    <article>
      <h3>Min första sida</h3>
      <p>Idag gjorde jag min första webbsida.</p>
    </article>
    <article>
      <h3>Nu kan jag listor</h3>
      <p>ul, ol och li – och tabeller.</p>
    </article>
  </section>
</main>
`,
    hints: [
      'Båda article står inuti section, efter h2.',
      'h3 eftersom inläggen ligger under h2:an Senaste nytt.',
      '<article>\n  <h3>Min första sida</h3>\n  <p>…</p>\n</article>',
    ],
    tests: [
      {
        description: 'Två inlägg i Senaste nytt',
        code: "texts('section article h3')",
        expected: ['Min första sida', 'Nu kan jag listor'],
      },
      {
        description: 'Ett stycke i varje inlägg',
        code: "$$('article').map(a => a.querySelectorAll('p').length)",
        expected: [1, 1],
      },
    ],
  },
  {
    id: 'struktur-08',
    track: 'struktur',
    title: 'div och span',
    xp: 15,
    description:
      'Ibland passar ingen tagg. Då finns två taggar som inte betyder något alls: `div` och `span`.',
    explain:
      '`<div>` samlar flera saker i en låda, och varje `div` börjar på en ny rad. `<span>` märker ut en bit mitt i en text och bryter inte raden.\n\nDe syns inte – de är krokar att hänga CSS på senare. Ta dem bara när ingen annan tagg passar: en rubrik är en `h2`, inte en `div`.',
    example:
      '<div>\n  <h3>Cykel</h3>\n  <p>Pris: <span>2 500 kr</span></p>\n</div>',
    task: 'Uppgift: Lägg rubriken och stycket om varan i en `div`, och priset `199 kr` i en `span`.',
    starterCode: `<h3>Vattenflaska</h3>
<p>Håller vattnet kallt hela dagen. Pris: 199 kr</p>
`,
    solution: `<div>
  <h3>Vattenflaska</h3>
  <p>Håller vattnet kallt hela dagen. Pris: <span>199 kr</span></p>
</div>
`,
    hints: [
      '<div> före rubriken och </div> efter stycket.',
      'span står inuti stycket, runt bara priset.',
      'Pris: <span>199 kr</span>',
    ],
    tests: [
      {
        description: 'Rubriken och stycket ligger i en div',
        code: "$('div') ? [...$('div').children].map(child => child.tagName) : null",
        expected: ['H3', 'P'],
      },
      {
        description: 'Priset står i en span',
        code: "text('p span')",
        expected: '199 kr',
      },
    ],
  },
  {
    id: 'struktur-09',
    track: 'struktur',
    title: 'Från div-soppa till riktiga taggar',
    xp: 20,
    description:
      'Många sidor är byggda med bara `div`. Det fungerar, men ingen – varken skärmläsare eller Google – förstår vad som är vad.',
    explain:
      'Fråga för varje `div`: vad är det här? Sidans namn är ett sidhuvud, länkarna en meny, texten huvudinnehållet och © en sidfot.\n\nSidan ser exakt likadan ut efteråt. Skillnaden märks för den som lyssnar på sidan: nu kan den hoppa direkt till menyn eller innehållet.',
    example: '<div><h1>…</h1></div>  →  <header><h1>…</h1></header>',
    task: 'Uppgift: Byt ut de fyra `div` mot `header`, `nav`, `main` och `footer` – i den ordningen.',
    starterCode: `<div>
  <h1>Bageriet</h1>
</div>
<div>
  <a href="#brod">Bröd</a>
  <a href="#kakor">Kakor</a>
  <a href="#hitta">Hitta hit</a>
</div>
<div>
  <p>Nybakat varje morgon sedan 1952.</p>
</div>
<div>
  <p>&copy; 2026 Bageriet</p>
</div>
`,
    solution: `<header>
  <h1>Bageriet</h1>
</header>
<nav>
  <a href="#brod">Bröd</a>
  <a href="#kakor">Kakor</a>
  <a href="#hitta">Hitta hit</a>
</nav>
<main>
  <p>Nybakat varje morgon sedan 1952.</p>
</main>
<footer>
  <p>&copy; 2026 Bageriet</p>
</footer>
`,
    hints: [
      'Byt både den öppnande och den stängande taggen.',
      'Den första div:en har sidans namn – det är sidhuvudet.',
      '<nav> runt länkarna, <main> runt texten och <footer> runt ©.',
    ],
    tests: [
      { description: 'Inga div kvar', code: "count('div')", expected: 0 },
      {
        description: 'Rubriken står i header',
        code: "text('header h1')",
        expected: 'Bageriet',
      },
      {
        description: 'Länkarna står i nav',
        code: "count('nav a')",
        expected: 3,
      },
      {
        description: 'Texten står i main och © i footer',
        code: "[text('main p'), text('footer p')]",
        expected: ['Nybakat varje morgon sedan 1952.', '© 2026 Bageriet'],
      },
    ],
  },
];
