// Frågor för nivåtestet och för "Testa dig förbi". Fyra frågor per bana.
// Det rätta svaret står alltid först i options. Ordningen blandas när
// frågan visas. Frågor med page kollas i quiz.test.js: check körs mot
// sidan och ska ge det rätta svaret.
export const QUIZ = {
  grunder: [
    {
      question: 'Vilken rubrik blir störst?',
      code: '<h3>A</h3>\n<h1>B</h1>\n<h2>C</h2>',
      options: ['B', 'A', 'C', 'Alla blir lika stora'],
      explain: 'h1 är den största rubriken, h6 den minsta.',
    },
    {
      question: 'Hur många stycken blir det på sidan?',
      code: '<p>Hej\npå\ndig</p>',
      options: ['1', '3', '0', '2'],
      explain:
        'Radbrytningar i koden syns inte. Det är ett enda p, alltså ett stycke.',
      check: "count('p')",
    },
    {
      question: 'Vilket ord blir fetstilt?',
      code: '<p>En <em>liten</em> och <strong>stor</strong> katt</p>',
      options: ['stor', 'liten', 'katt', 'Inget'],
      explain: 'strong visas fetstilt, em kursivt.',
      check: "text('strong')",
    },
    {
      question: 'Hur stänger man taggen <p>?',
      options: ['</p>', '<p/>', '<\\p>', '<end p>'],
      explain: 'Den stängande taggen har ett snedstreck före namnet: </p>.',
    },
  ],
  lankar: [
    {
      question: 'Vart går länken?',
      code: '<a href="https://mdn.dev">Läs mer</a>',
      options: ['https://mdn.dev', 'Läs mer', 'Ingenstans', 'href'],
      explain:
        'Adressen står i href. Texten mellan taggarna är det man klickar på.',
      check: "attr('a', 'href')",
    },
    {
      question: 'Vad är alt-texten till för?',
      options: [
        'Den beskriver bilden för den som inte ser den',
        'Den gör bilden större',
        'Den visas som rubrik över bilden',
        'Den bestämmer bildens filnamn',
      ],
      explain:
        'Skärmläsare läser upp alt-texten, och den visas om bilden inte laddar.',
    },
    {
      question: 'Vilken tagg stängs aldrig?',
      options: ['<img>', '<a>', '<p>', '<strong>'],
      explain: '<img> har inget innehåll, så det finns ingen </img>.',
    },
    {
      question: 'Vilken länktext är bäst?',
      options: [
        'Läs hela receptet',
        'Klicka här',
        'Länk',
        'https://example.com/recept',
      ],
      explain:
        'Länktexten ska säga vart länken går, även när den läses upp ensam.',
    },
  ],
  listor: [
    {
      question: 'Hur många saker med punkt eller siffra blir det?',
      code: '<ul>\n  <li>A</li>\n  <li>B</li>\n</ul>\n<ol>\n  <li>C</li>\n</ol>',
      options: ['3', '2', '1', '0'],
      explain: 'Varje li blir en sak, både i ul och ol.',
      check: "count('li')",
    },
    {
      question: 'Vilken lista passar för stegen i ett recept?',
      options: ['<ol>', '<ul>', '<table>', '<p>'],
      explain: 'Stegen måste göras i ordning, och ol numrerar dem åt dig.',
    },
    {
      question: 'Vilken tagg är en rubrikcell i en tabell?',
      options: ['<th>', '<td>', '<tr>', '<caption>'],
      explain: 'th är en rubrikcell, td en vanlig cell och tr en rad.',
    },
    {
      question: 'Vad står i den andra cellen på första raden?',
      code: '<table>\n  <tr><td>Ost</td><td>30 kr</td></tr>\n  <tr><td>Bröd</td><td>25 kr</td></tr>\n</table>',
      options: ['30 kr', 'Bröd', 'Ost', '25 kr'],
      explain: 'Raden läses från vänster: Ost först, sedan 30 kr.',
      check: "$('tr').children[1].textContent",
    },
  ],
  struktur: [
    {
      question: 'Vad står i webbläsarens flik?',
      code: '<!doctype html>\n<html lang="sv">\n  <head>\n    <title>Bageriet</title>\n  </head>\n  <body>\n    <h1>Välkommen</h1>\n  </body>\n</html>',
      options: ['Bageriet', 'Välkommen', 'sv', 'html'],
      explain: 'Fliken visar title från head. h1 syns på själva sidan.',
      check: 'doc.title',
    },
    {
      question: 'Vilken tagg passar för sidans huvudmeny?',
      options: ['<nav>', '<main>', '<footer>', '<section>'],
      explain: 'nav är för sidans viktigaste länkar, som menyn.',
    },
    {
      question: 'Hur många <main> får en sida ha?',
      options: ['En', 'Hur många som helst', 'Ingen', 'En per section'],
      explain: 'main är sidans huvudinnehåll, och det finns bara ett.',
    },
    {
      question: 'Var står rubriker och stycken?',
      options: ['I <body>', 'I <head>', 'Före <html>', 'I <title>'],
      explain: 'Allt som syns står i body. head är information om sidan.',
    },
  ],
  formular: [
    {
      question: 'Vilken typ blir fältet?',
      code: '<input type="nummer">',
      options: ['text', 'number', 'nummer', 'Inget fält alls'],
      explain:
        'nummer är ingen typ som finns, så det blir ett vanligt textfält. Typen heter number.',
      check: "$('input').type",
    },
    {
      question: 'Vad gör for på en label?',
      options: [
        'Kopplar etiketten till fältet med samma id',
        'Säger vad som ska skickas',
        'Gör fältet obligatoriskt',
        'Bestämmer fältets typ',
      ],
      explain:
        '<label for="namn"> hör till <input id="namn">. Då läses etiketten upp när man hamnar i fältet.',
    },
    {
      question: 'Varför har radioknapparna samma name?',
      options: [
        'Så att man bara kan välja en av dem',
        'Så att de får samma etikett',
        'Så att alla blir ikryssade',
        'Det spelar ingen roll',
      ],
      explain: 'Samma name gör dem till en grupp där bara en kan vara vald.',
    },
    {
      question: 'Vad skickas från ett fält som saknar name?',
      options: ['Ingenting', 'Fältets id', 'Etikettens text', 'Fältets typ'],
      explain:
        'Det som skickas är name och värdet. Utan name skickas fältet inte alls.',
    },
  ],
  css: [
    {
      question: 'Vilken färg får rubriken?',
      code: '<style>\n  h1 { color: red; }\n  h1 { color: blue; }\n</style>\n<h1>Hej</h1>',
      options: ['blue', 'red', 'lila – färgerna blandas', 'black'],
      explain: 'Två lika starka regler: den som står sist vinner.',
      check: "colorOf('h1')",
    },
    {
      question: 'Vilken färg får stycket?',
      code: '<style>\n  .varning { color: red; }\n  p { color: green; }\n</style>\n<p class="varning">Akta!</p>',
      options: ['red', 'green', 'black', 'blue'],
      explain:
        'En klass är starkare än en tagg, så .varning vinner fast p står sist.',
      check: "colorOf('p')",
    },
    {
      question: 'Hur väljer man alla element med class="kort" i CSS?',
      options: ['.kort', '#kort', 'kort', '<kort>'],
      explain: 'Punkt för klass, # för id och bara namnet för en tagg.',
    },
    {
      question: 'Hur stor är 2rem om sidans text är 16px?',
      options: ['32px', '2px', '16px', '18px'],
      explain: 'rem betyder gånger sidans textstorlek: 2 × 16 = 32.',
    },
  ],
  boxen: [
    {
      question: 'Vad är padding?',
      options: [
        'Luft innanför kanten',
        'Luft utanför kanten',
        'Kantens tjocklek',
        'Hur runda hörnen är',
      ],
      explain:
        'padding är luften mellan kanten och innehållet. margin är luften utanför.',
    },
    {
      question: 'Hur bred blir lådan, med padding och kant?',
      code: '<style>\n  div {\n    width: 200px;\n    padding: 20px;\n    border: 5px solid black;\n  }\n</style>\n<div>Låda</div>',
      options: ['250px', '200px', '225px', '245px'],
      explain:
        'width gäller bara innehållet: 200 + 20 + 20 i padding + 5 + 5 i kant = 250.',
      check: "boxWidth('div') + 'px'",
    },
    {
      question: 'Hur ställer man en låda med en bredd mitt på sidan?',
      options: [
        'margin: 0 auto',
        'text-align: center',
        'padding: auto',
        'align: center',
      ],
      explain:
        'auto på sidorna delar den lediga platsen lika. text-align centrerar bara texten inuti.',
    },
    {
      question: 'Vilket värde gör att width räknas med padding och kant?',
      options: [
        'box-sizing: border-box',
        'box-sizing: content-box',
        'display: inline-block',
        'margin: auto',
      ],
      explain:
        'Med border-box är width hela lådan. Det är därför de flesta sajter sätter det på allt.',
    },
  ],
  flexbox: [
    {
      question:
        'Var skriver man display: flex för att länkarna i en meny ska stå på rad?',
      code: '<nav>\n  <a href="#">Hem</a>\n  <a href="#">Om</a>\n</nav>',
      options: ['På nav', 'På varje a', 'På body', 'På den första länken'],
      explain:
        'display: flex skrivs på föräldern. Det är barnen som ställer sig på rad.',
    },
    {
      question: 'Vad gör justify-content: space-between?',
      options: [
        'Första och sista hamnar vid kanterna, luften fördelas emellan',
        'Allt hamnar i mitten',
        'Lika mycket luft runt varje sak',
        'Allt hamnar till höger',
      ],
      explain:
        'space-between lägger all luft mellan sakerna. Därför står loggan och menyn vid var sin kant.',
    },
    {
      question: 'Vilket värde har flex-direction?',
      code: '<style>\n  .lista {\n    display: flex;\n    flex-direction: column;\n  }\n</style>\n<div class="lista">A</div>',
      options: ['column', 'row', 'flex', 'block'],
      explain: 'column gör att flexboxen går nedåt i stället för åt sidan.',
      check: "css('.lista', 'flex-direction')",
    },
    {
      question: 'Vad gör flex: 1 på ett flexelement?',
      options: [
        'Det tar den plats som blir över',
        'Det blir 1 pixel brett',
        'Det hamnar först på raden',
        'Det får en ny rad',
      ],
      explain: 'flex: 1 betyder "ta resten". Har flera flex: 1 delar de lika.',
    },
  ],
  grid: [
    {
      question: 'Hur många kolumner får griddet?',
      code: '<style>\n  .rutnat {\n    display: grid;\n    grid-template-columns: 1fr 2fr 1fr;\n  }\n</style>',
      options: ['3', '4', '2', '1'],
      explain:
        'Ett mått per kolumn: 1fr, 2fr och 1fr är tre kolumner. 2fr gör bara den mittersta bredare.',
    },
    {
      question: 'Vad är repeat(4, 1fr) samma sak som?',
      options: ['1fr 1fr 1fr 1fr', '4fr', '1fr 4', '4px 4px 4px 4px'],
      explain:
        'repeat skriver samma kolumn så många gånger som det första talet säger.',
    },
    {
      question: 'Hur får man en ruta att ta två kolumner?',
      options: [
        'grid-column: span 2',
        'grid-row: span 2',
        'width: 2fr',
        'columns: 2',
      ],
      explain:
        'grid-column gäller kolumner, grid-row rader. span 2 betyder "sträck dig över två".',
    },
    {
      question: 'Vilken bredd får den första kolumnen?',
      code: '<style>\n  .sida {\n    display: grid;\n    width: 600px;\n    grid-template-columns: 1fr 2fr;\n  }\n</style>',
      options: ['200px', '300px', '100px', '400px'],
      explain: '600 delat i 1 + 2 = 3 andelar: 200 och 400 pixlar.',
    },
  ],
  responsivt: [
    {
      question: 'När gäller reglerna i @media (max-width: 600px)?',
      options: [
        'När fönstret är högst 600 pixlar brett',
        'När fönstret är minst 600 pixlar brett',
        'När sidan är längre än 600 pixlar',
        'Alltid',
      ],
      explain:
        'max-width betyder "högst så här brett" – alltså mobiler. min-width gäller större skärmar.',
    },
    {
      question:
        'Vilka två rader gör att en bild krymper på mobilen utan att bli hoptryckt?',
      options: [
        'max-width: 100% och height: auto',
        'width: 100px och height: 100px',
        'display: flex och gap: 0',
        'max-width: 600px och height: 100%',
      ],
      explain:
        'max-width: 100% låter bilden krympa, och height: auto håller formen.',
    },
    {
      question: 'Varför behövs viewport-raden i head?',
      options: [
        'Annars låtsas mobilen vara en dator och krymper hela sidan',
        'Annars syns inga bilder',
        'Annars fungerar inte CSS',
        'Den gör sidan snabbare',
      ],
      explain:
        'Utan raden visar mobilen sidan som om skärmen vore 980 pixlar bred, och allt blir pyttelitet.',
    },
    {
      question: 'Vilken max-width får .text?',
      code: '<style>\n  .text { max-width: 40rem; }\n</style>\n<div class="text">Hej</div>',
      options: ['640px', '40px', '400px', '600px'],
      explain: 'rem är gånger sidans textstorlek: 40 × 16 = 640.',
      check: "px('.text', 'max-width') + 'px'",
    },
  ],
  slutprojekt: [
    {
      question: 'Hur använder man variabeln --huvudfarg?',
      code: ':root {\n  --huvudfarg: teal;\n}',
      options: [
        'color: var(--huvudfarg);',
        'color: --huvudfarg;',
        'color: $huvudfarg;',
        'color: huvudfarg();',
      ],
      explain: 'En CSS-variabel används alltid inuti var().',
    },
    {
      question: 'Vad gör position: sticky; top: 0?',
      options: [
        'Elementet följer med högst upp när man skrollar',
        'Elementet hamnar längst ner',
        'Elementet döljs när man skrollar',
        'Elementet kan inte flyttas',
      ],
      explain:
        'sticky står vanligt tills det når kanten som top säger, och fastnar sedan där.',
    },
    {
      question: 'Vilken färg får knappen?',
      code: '<style>\n  .knapp { background-color: navy; }\n  .knapp-rod { background-color: crimson; }\n</style>\n<a class="knapp knapp-rod">Köp</a>',
      options: ['crimson', 'navy', 'Ingen färg', 'Båda, randigt'],
      explain:
        'Elementet har båda klasserna. Reglerna är lika starka, så den som står sist vinner.',
      check: "colorOf('a', 'background-color')",
    },
    {
      question: 'Vad behöver en label för att höra ihop med sitt fält?',
      options: [
        'for som är samma som fältets id',
        'name som är samma som fältets name',
        'class som är samma som fältets class',
        'Att stå efter fältet',
      ],
      explain:
        'label for="epost" hör ihop med input id="epost". Då går det att trycka på texten.',
    },
  ],
  tailwind: [
    {
      question: 'Hur mycket padding ger p-4?',
      options: ['16px', '4px', '40px', '4rem'],
      explain: 'Ett steg i Tailwind är 4 pixlar: 4 × 4 = 16.',
    },
    {
      question: 'Vad betyder md:grid-cols-3?',
      options: [
        'Tre kolumner när fönstret är minst 768 pixlar brett',
        'Tre kolumner på mobilen',
        'Tre medelstora kolumner',
        'Tre kolumner när musen är över',
      ],
      explain:
        'md: gäller från 768 pixlar och uppåt. Utan ord före gäller klassen alltid.',
    },
    {
      question: 'Vilken klass ger bakgrunden när musen är över?',
      options: [
        'hover:bg-sky-700',
        'bg-sky-700:hover',
        'bg-hover-sky-700',
        'mouse:bg-sky-700',
      ],
      explain: 'Ordet och kolonet står före klassen: hover:, focus:, md:.',
    },
    {
      question: 'Vad händer med klassen bg-whte?',
      options: [
        'Ingenting – klassen finns inte',
        'Bakgrunden blir vit',
        'Sidan visar ett felmeddelande',
        'Bakgrunden blir grå',
      ],
      explain:
        'En felstavad klass gör ingenting, och inget fel syns. Därför är stavningen viktig.',
    },
  ],
};
