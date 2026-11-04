import { projectSteps } from '../../../core/projects';
// Projekt som låses upp när en bana är klar. Eleven väljer ett av tre men
// kan göra alla. Varje projekt byggs i steg, och koden från förra steget
// följer med till nästa. why förklarar varför koden ser ut som den gör.
// reward: priset man får när projektet är klart. Facit följer samma
// regler som övningarna (se test/concepts.js).
const KATT = 'https://sv.wikipedia.org/wiki/Katt';

// Sidorna i CSS-projekten. Stegen ändrar bara <style>, så HTML:en står
// här en gång och funktionerna sätter ihop den med stegets CSS.
const withStyle = html => css => `<style>\n${css}</style>\n${html}`;

const AFFISCH = `<h1>Sommarkonsert</h1>
<p class="datum">Lördag 14 juni kl. 18</p>
<p>Skolans kör och band spelar i parken. Ta med filt och fika!</p>
<p class="pris">Fri entré</p>
`;
const affisch = withStyle(AFFISCH);

const KAFE = `<h1>Café Kanelbullen</h1>
<h2>Fika</h2>
<ul>
  <li>Kanelbulle <span class="pris">25 kr</span></li>
  <li>Chokladboll <span class="pris">20 kr</span> <span class="vegansk">vegansk</span></li>
</ul>
<h2>Att dricka</h2>
<ul>
  <li>Kaffe <span class="pris">30 kr</span></li>
  <li>Varm choklad <span class="pris">35 kr</span> <span class="vegansk">vegansk</span></li>
</ul>
<p>Hitta hit: <a href="https://www.openstreetmap.org">karta</a></p>
`;
const kafe = withStyle(KAFE);

const MORKT = `<h1>Min blogg</h1>
<p class="ingress">Om kod, katter och kanelbullar.</p>
<h2>Dagens inlägg</h2>
<p>Idag lärde jag mig CSS. Nu kan jag byta färg på allt!</p>
<p>Läs mer på <a href="https://developer.mozilla.org">MDN</a>.</p>
`;
const morkt = withStyle(MORKT);

const PROFIL = `<div class="profil">
  <img src="bilder/katt.svg" alt="Katten Måns som tittar in i kameran" width="200">
  <h2>Måns</h2>
  <p class="roll">Chefskatt</p>
  <p>Gillar lådor, solfläckar och att sitta på tangentbordet.</p>
</div>
`;
const profil = withStyle(PROFIL);

const KNAPPAR = `<h1>Vill du spara?</h1>
<p>
  <a class="knapp" href="#">Spara</a>
  <a class="knapp knapp-andra" href="#">Avbryt</a>
</p>
`;
const knappar = withStyle(KNAPPAR);

const LAPPAR = `<h1>Att göra</h1>
<div class="lapp">Köp mjölk och bröd</div>
<div class="lapp viktig">Lämna in läxan på måndag</div>
<div class="lapp">Ring mormor</div>
`;
const lappar = withStyle(LAPPAR);

const NAVMENY = `<nav class="meny">
  <a class="logga" href="#">🐾 Hundskolan</a>
  <ul class="lankar">
    <li><a href="#">Kurser</a></li>
    <li><a href="#">Lärare</a></li>
    <li><a href="#">Boka</a></li>
  </ul>
</nav>
`;
const navmeny = withStyle(NAVMENY);

const KORTRAD = `<h1>Månadens böcker</h1>
<div class="hylla">
  <div class="bok">
    <h2>Drakens ö</h2>
    <p>En flicka hittar ett drakägg på stranden.</p>
    <a class="las" href="#">Läs mer</a>
  </div>
  <div class="bok">
    <h2>Hamstern</h2>
    <p>Hamstern Sigge följer av misstag med en raket till månen, och måste
    hitta hem innan maten tar slut. På vägen träffar han en ensam robot.</p>
    <a class="las" href="#">Läs mer</a>
  </div>
  <div class="bok">
    <h2>Spökskolan</h2>
    <p>Någon spökar i matsalen.</p>
    <a class="las" href="#">Läs mer</a>
  </div>
  <div class="bok">
    <h2>Bollen</h2>
    <p>Bollen försvinner mitt i finalen.</p>
    <a class="las" href="#">Läs mer</a>
  </div>
</div>
`;
const kortrad = withStyle(KORTRAD);

const CHATT = `<div class="chatt">
  <p class="kompis">Kommer du på fotbollen i dag?</p>
  <p class="mig">Ja! Vilken tid?</p>
  <p class="kompis">Kvart i fem 😊</p>
  <p class="mig">Toppen, ses där!</p>
</div>
`;
const chatt = withStyle(CHATT);

const GALLERI = `<h1>Sommarlovet</h1>
<div class="galleri">
  <figure class="stor"><div class="bild">🏕️</div><figcaption>Tältet</figcaption></figure>
  <figure><div class="bild">🛶</div><figcaption>Kanoten</figcaption></figure>
  <figure><div class="bild">🐟</div><figcaption>Fisken</figcaption></figure>
  <figure><div class="bild">🍦</div><figcaption>Glassen</figcaption></figure>
  <figure><div class="bild">🦟</div><figcaption>Myggan</figcaption></figure>
  <figure class="panorama"><div class="bild">🌅</div><figcaption>Solnedgången över sjön</figcaption></figure>
</div>
`;
const galleri = withStyle(GALLERI);

const PANEL = `<h1>Min dag</h1>
<div class="panel">
  <div class="siffra"><span class="tal">8 432</span> steg</div>
  <div class="siffra"><span class="tal">9 h</span> sömn</div>
  <div class="siffra"><span class="tal">6</span> glas vatten</div>
  <div class="siffra"><span class="tal">45 min</span> läsning</div>
  <div class="diagram">📈 Steg den här veckan</div>
  <div class="lista">✅ Läxa<br>✅ Träning<br>⬜ Städa</div>
</div>
`;
const panel = withStyle(PANEL);

const SCHEMA = `<div class="schema">
  <div></div><div class="dag">Mån</div><div class="dag">Tis</div><div class="dag">Ons</div><div class="dag">Tor</div><div class="dag">Fre</div>
  <div class="tid">8:00</div><div>Matte</div><div>Svenska</div><div class="dubbel">Idrott</div><div>Engelska</div><div>Bild</div>
  <div class="tid">9:00</div><div>Svenska</div><div>Matte</div><div>NO</div><div>Musik</div>
  <div class="tid">10:00</div><div class="rast">Rast 🍎</div>
</div>
`;
const schema = withStyle(SCHEMA);

const PORTFOLIO = `<meta name="viewport" content="width=device-width, initial-scale=1">
<h1>Hej, jag heter Sam</h1>
<p>Jag ritar, bakar och bygger hemsidor. Här är några saker jag har gjort.</p>
<div class="projekt">
  <div class="kort"><img src="bilder/katt.svg" alt="En ritad katt" width="400" height="300"><h3>Kattserien</h3></div>
  <div class="kort"><img src="bilder/pannkakor.svg" alt="Pannkakor" width="400" height="300"><h3>Receptboken</h3></div>
  <div class="kort"><img src="bilder/hund.svg" alt="En ritad hund" width="400" height="300"><h3>Hundsidan</h3></div>
</div>
`;
const portfolio = withStyle(PORTFOLIO);

const PRODUKT = `<meta name="viewport" content="width=device-width, initial-scale=1">
<div class="produkt">
  <img src="bilder/hund.svg" alt="En gosedjurshund" width="400" height="300">
  <div class="info">
    <h1>Gosehunden Bamse</h1>
    <p class="pris">199 kr</p>
    <p>Mjuk, tvättbar och alltid glad. Passar i de flesta famnar.</p>
    <a class="kop" href="#">Lägg i varukorgen</a>
  </div>
</div>
`;
const produkt = withStyle(PRODUKT);

const EVENEMANG = `<meta name="viewport" content="width=device-width, initial-scale=1">
<header>
  <h1>🎪 Cirkusdagen</h1>
  <p class="datum">Söndag 7 september</p>
</header>
<div class="program">
  <div class="punkt"><h2>11:00</h2><p>Jonglering för alla</p></div>
  <div class="punkt"><h2>12:30</h2><p>Lunch i det gröna</p></div>
  <div class="punkt"><h2>14:00</h2><p>Akrobatik på lina</p></div>
  <div class="punkt"><h2>16:00</h2><p>Stora föreställningen</p></div>
</div>
`;
const evenemang = withStyle(EVENEMANG);

const KLUBB = `<meta name="viewport" content="width=device-width, initial-scale=1">
<header>
  <a class="logga" href="#">⚽ IK Bollen</a>
  <nav>
    <a href="#lag">Lagen</a>
    <a href="#tider">Träningstider</a>
    <a href="#bli-medlem">Bli medlem</a>
  </nav>
</header>
<div class="topp">
  <h1>Välkommen till IK Bollen</h1>
  <p>Fotboll för alla mellan 7 och 15 år.</p>
  <a class="knapp" href="#bli-medlem">Bli medlem</a>
</div>
<section id="lag">
  <h2>Lagen</h2>
  <div class="lag">
    <div class="kort">P10</div>
    <div class="kort">F11</div>
    <div class="kort">P12</div>
    <div class="kort">F13</div>
  </div>
</section>
<section id="tider">
  <h2>Träningstider</h2>
  <p>Måndag och torsdag kl. 17–18.30 på Bollplanen.</p>
</section>
<section id="bli-medlem">
  <h2>Bli medlem</h2>
  <p>Kom på en träning och prova – det kostar ingenting!</p>
</section>
`;
const klubb = withStyle(KLUBB);

const BUTIK = `<meta name="viewport" content="width=device-width, initial-scale=1">
<h1>Leksaksladan</h1>
<div class="produkter">
  <div class="produkt">
    <span class="rea">REA</span>
    <div class="bild">🧸</div>
    <h2>Nalle</h2>
    <p class="pris">149 kr</p>
    <a class="knapp" href="#">Köp</a>
  </div>
  <div class="produkt">
    <div class="bild">🪀</div>
    <h2>Jojo</h2>
    <p class="pris">39 kr</p>
    <a class="knapp" href="#">Köp</a>
  </div>
  <div class="produkt">
    <div class="bild">🪁</div>
    <h2>Drake</h2>
    <p class="pris">199 kr</p>
    <a class="knapp" href="#">Köp</a>
  </div>
  <div class="produkt">
    <div class="bild">🎲</div>
    <h2>Tärningar</h2>
    <p class="pris">25 kr</p>
    <a class="knapp" href="#">Köp</a>
  </div>
</div>
`;
const butik = withStyle(BUTIK);

const EGEN = `<meta name="viewport" content="width=device-width, initial-scale=1">
<header>
  <h1>Alex sajt</h1>
  <nav>
    <a href="#om">Om mig</a>
    <a href="#hobbyer">Hobbyer</a>
    <a href="#kontakt">Kontakt</a>
  </nav>
</header>
<main>
  <section id="om">
    <h2>Om mig</h2>
    <p>Jag är tolv år och bor i Umeå med min familj och vår katt.</p>
  </section>
  <section id="hobbyer">
    <h2>Hobbyer</h2>
    <p>Jag spelar trummor, bygger med lego och gör hemsidor.</p>
  </section>
  <section id="kontakt">
    <h2>Kontakt</h2>
    <p>Fråga mig i skolan!</p>
  </section>
</main>
<footer>© Alex</footer>
`;
const egen = withStyle(EGEN);

const TW_RAD =
  '<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>';

// Delarna i ett projekt bygger på varandra. Tester på fri text kollar
// formen (en h1 som börjar med …) och inte exakta ord, så att eleven kan
// skriva om sig själv.
export const PROJECTS = [
  {
    id: 'proj-om-mig',
    track: 'grunder',
    title: 'Om mig',
    reward: { emoji: '🪞', name: 'Spegel' },
    summary:
      'En sida om dig själv med rubriker, stycken och ord som sticker ut.',
    steps: [
      {
        title: 'Hej, det är jag',
        why: 'h1 är sidans namn, så det finns bara en. Stycket under är det första besökaren läser – en eller två meningar räcker.',
        xp: 15,
        description:
          'Du bygger en sida om dig själv. Först kommer namnet och några ord om vem du är.',
        task: 'Uppgift: Skriv en `h1` som börjar med `Hej, jag heter` och slutar med ditt namn. Skriv under den ett stycke om dig själv.',
        starterCode: '<!-- Steg 1: hej, det är jag -->\n',
        solution:
          '<h1>Hej, jag heter Ada</h1>\n<p>Jag är tolv år och bor i Lund. Jag gillar att bygga saker.</p>\n',
        hints: [
          'En h1 och ett p, i den ordningen.',
          'Rubriken börjar exakt med Hej, jag heter – med kommatecken.',
          '<h1>Hej, jag heter …</h1> och sedan <p>…</p>.',
        ],
        tests: [
          {
            description: 'h1 börjar med Hej, jag heter',
            code: "text('h1')?.startsWith('Hej, jag heter ') ?? null",
            expected: true,
          },
          {
            description: 'Ett stycke direkt under rubriken',
            code: "$('h1')?.nextElementSibling?.tagName ?? null",
            expected: 'P',
          },
        ],
      },
      {
        title: 'Två delar',
        why: 'Med h2 delas sidan i delar som går att skumma. Den som bara vill veta vad du gillar hittar dit utan att läsa allt.',
        xp: 15,
        description: 'Nu får sidan två delar, var och en med sin rubrik.',
        task: 'Uppgift: Lägg till rubrikerna `Det här gillar jag` och `Det här vill jag lära mig` med `h2`, och ett stycke under var och en.',
        solution: `<h1>Hej, jag heter Ada</h1>
<p>Jag är tolv år och bor i Lund. Jag gillar att bygga saker.</p>
<h2>Det här gillar jag</h2>
<p>Jag gillar fotboll, pannkakor och att rita.</p>
<h2>Det här vill jag lära mig</h2>
<p>Jag vill lära mig att bygga egna hemsidor och spel.</p>
`,
        hints: [
          'Två h2, var och en med ett p direkt under.',
          'Rubrikerna ska stå exakt som i uppgiften.',
          '<h2>Det här gillar jag</h2> och sedan <p>…</p>.',
        ],
        tests: [
          {
            description: 'Två h2 med rätt text',
            code: "texts('h2')",
            expected: ['Det här gillar jag', 'Det här vill jag lära mig'],
          },
          {
            description: 'Ett stycke under varje h2',
            code: "$$('h2').map(h => h.nextElementSibling?.tagName ?? null)",
            expected: ['P', 'P'],
          },
        ],
      },
      {
        title: 'Det viktigaste',
        why: 'strong betyder viktigt och em betyder betoning. Använd dem på enstaka ord – blir allt fett sticker ingenting ut.',
        xp: 15,
        description:
          'Till sist får de viktigaste orden sticka ut, så att man ser dem direkt.',
        task: 'Uppgift: Sätt `strong` runt det du gillar mest i stycket under `Det här gillar jag`, och `em` runt något ord i stycket under `Det här vill jag lära mig`.',
        solution: `<h1>Hej, jag heter Ada</h1>
<p>Jag är tolv år och bor i Lund. Jag gillar att bygga saker.</p>
<h2>Det här gillar jag</h2>
<p>Jag gillar fotboll, <strong>pannkakor</strong> och att rita.</p>
<h2>Det här vill jag lära mig</h2>
<p>Jag vill lära mig att bygga <em>egna</em> hemsidor och spel.</p>
`,
        hints: [
          'strong och em ligger inuti styckena, runt enstaka ord.',
          'Första h2:ans stycke får strong, andra h2:ans stycke em.',
          'Jag gillar <strong>pannkakor</strong> …',
        ],
        tests: [
          {
            description: 'Något står i strong under Det här gillar jag',
            code: "$$('h2')[0]?.nextElementSibling?.querySelector('strong')?.textContent.trim() ? true : false",
            expected: true,
          },
          {
            description: 'Något står i em under Det här vill jag lära mig',
            code: "$$('h2')[1]?.nextElementSibling?.querySelector('em')?.textContent.trim() ? true : false",
            expected: true,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-dikten',
    track: 'grunder',
    title: 'Dikten',
    reward: { emoji: '🪶', name: 'Fjäderpenna' },
    summary: 'En dikt med två verser, en linje och din signatur.',
    steps: [
      {
        title: 'Första versen',
        why: 'En vers är ett stycke, och raderna i den hör ihop. Därför är det br mellan raderna och inte en ny p för varje rad.',
        xp: 15,
        description:
          'Du skriver en dikt. Rubriken är diktens namn och första versen har fyra rader.',
        task: 'Uppgift: Skriv diktens namn med `h1`. Skriv första versen i ett stycke direkt under, med fyra rader och `<br>` mellan dem.',
        starterCode: '<!-- Steg 1: första versen -->\n',
        solution: `<h1>Hösten</h1>
<p>Löven faller, ett och ett<br>
gula, röda, bruna<br>
vinden blåser, kall och lätt<br>
snart blir alla gröna.</p>
`,
        hints: [
          'En h1 och sedan ett p med hela versen.',
          'Fyra rader behöver tre <br>.',
          '<p>Rad ett<br>\nrad två<br>\n…</p>',
        ],
        tests: [
          {
            description: 'Dikten har ett namn i h1',
            code: "count('h1')",
            expected: 1,
          },
          {
            description: 'Versen under rubriken har fyra rader',
            code: "count('h1 + p br')",
            expected: 3,
          },
        ],
      },
      {
        title: 'Andra versen',
        why: 'Mellan två verser ska det vara ett mellanrum. Det får du av en ny p – inte av tomma rader i koden, som webbläsaren ändå slår ihop.',
        xp: 15,
        description: 'Dikten får en andra vers, också med fyra rader.',
        task: 'Uppgift: Skriv andra versen i ett nytt stycke, med fyra rader och `<br>` mellan dem.',
        solution: `<h1>Hösten</h1>
<p>Löven faller, ett och ett<br>
gula, röda, bruna<br>
vinden blåser, kall och lätt<br>
snart blir alla gröna.</p>
<p>Fast nej, nu blev det fel<br>
gröna blir de inte<br>
först kommer snö och is ett tag<br>
det kallas visst för vinter.</p>
`,
        hints: [
          'Ett nytt p efter det första.',
          'Tre <br> i det nya stycket också.',
          '<p>Rad ett<br>…</p> igen, med nya ord.',
        ],
        tests: [
          { description: 'Två verser', code: "count('p')", expected: 2 },
          {
            description: 'Fyra rader i varje vers',
            code: "$$('p').map(p => p.querySelectorAll('br').length)",
            expected: [3, 3],
          },
        ],
      },
      {
        title: 'Signaturen',
        why: 'hr säger att något nytt börjar – här att dikten är slut. em på namnet och © visar vem som skrivit den.',
        xp: 15,
        description:
          'Till sist en linje under dikten och vem som har skrivit den.',
        task: 'Uppgift: Sätt en `<hr>` efter dikten. Skriv sedan ett stycke med `©`, året och ditt namn, där namnet står i `em`.',
        solution: `<h1>Hösten</h1>
<p>Löven faller, ett och ett<br>
gula, röda, bruna<br>
vinden blåser, kall och lätt<br>
snart blir alla gröna.</p>
<p>Fast nej, nu blev det fel<br>
gröna blir de inte<br>
först kommer snö och is ett tag<br>
det kallas visst för vinter.</p>
<hr>
<p>&copy; 2026 <em>Ada</em></p>
`,
        hints: [
          '<hr> står ensam på en rad efter den sista versen.',
          '© skrivs &copy;',
          '<p>&copy; 2026 <em>…</em></p>',
        ],
        tests: [
          {
            description: 'En linje efter dikten',
            code: "count('hr')",
            expected: 1,
          },
          {
            description: 'Stycket efter linjen har ©',
            code: "text('hr + p')?.includes('©') ?? null",
            expected: true,
          },
          {
            description: 'Namnet står i em',
            code: "count('hr + p em')",
            expected: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-nyhet',
    track: 'grunder',
    title: 'Nyhetsartikeln',
    reward: { emoji: '📰', name: 'Tidning' },
    summary:
      'En artikel för kvarterstidningen, med ingress och mellanrubriker.',
    steps: [
      {
        title: 'Rubrik och ingress',
        why: 'Ingressen är artikelns viktigaste mening, och därför står den i strong. Den som bara läser den ska ändå veta vad som hänt.',
        xp: 15,
        description:
          'Du skriver en artikel till kvarterstidningen. Den börjar med rubriken och en kort ingress.',
        task: 'Uppgift: Skriv rubriken `Katt hittad på taket` med `h1`. Skriv under den ett stycke där hela ingressen står i `strong`.',
        starterCode: '<!-- Steg 1: rubrik och ingress -->\n',
        solution: `<h1>Katt hittad på taket</h1>
<p><strong>Katten Måns satt i tre timmar på taket innan brandkåren kom.</strong></p>
`,
        hints: [
          'En h1 och sedan ett p.',
          'strong ligger inuti p, runt hela texten.',
          '<p><strong>…</strong></p>',
        ],
        tests: [
          {
            description: 'h1 säger Katt hittad på taket',
            code: "text('h1')",
            expected: 'Katt hittad på taket',
          },
          {
            description: 'Ingressen står i strong',
            code: "count('h1 + p > strong')",
            expected: 1,
          },
        ],
      },
      {
        title: 'Mellanrubriker',
        why: 'Mellanrubrikerna gör att en lång text går att skumma. Nivå två, eftersom de hör till artikelns h1.',
        xp: 15,
        description: 'Nu kommer själva artikeln, i två delar.',
        task: 'Uppgift: Lägg till `Vad hände?` och `Vad händer nu?` med `h2`, och ett stycke under var och en.',
        solution: `<h1>Katt hittad på taket</h1>
<p><strong>Katten Måns satt i tre timmar på taket innan brandkåren kom.</strong></p>
<h2>Vad hände?</h2>
<p>Måns jagade en fågel och klättrade upp längs stupröret.</p>
<h2>Vad händer nu?</h2>
<p>Hans ägare ska sätta upp ett nät, så att det inte händer igen.</p>
`,
        hints: [
          'Två h2, var och en med ett p under.',
          'Frågetecknet är en del av rubriken.',
          '<h2>Vad hände?</h2> och sedan <p>…</p>.',
        ],
        tests: [
          {
            description: 'Två mellanrubriker',
            code: "texts('h2')",
            expected: ['Vad hände?', 'Vad händer nu?'],
          },
          {
            description: 'Ett stycke under varje mellanrubrik',
            code: "$$('h2').map(h => h.nextElementSibling?.tagName ?? null)",
            expected: ['P', 'P'],
          },
        ],
      },
      {
        title: 'Sidfoten',
        why: 'Kommentaren är till redaktionen och syns inte för läsarna. © säger vem som äger texten.',
        xp: 15,
        description:
          'Sist en linje, tidningens namn och en lapp till redaktionen.',
        task: 'Uppgift: Sätt en `<hr>` och sedan stycket `© 2026 Kvarterstidningen`. Skriv också en kommentar som börjar med `Skriven av` och ditt namn.',
        solution: `<h1>Katt hittad på taket</h1>
<p><strong>Katten Måns satt i tre timmar på taket innan brandkåren kom.</strong></p>
<h2>Vad hände?</h2>
<p>Måns jagade en fågel och klättrade upp längs stupröret.</p>
<h2>Vad händer nu?</h2>
<p>Hans ägare ska sätta upp ett nät, så att det inte händer igen.</p>
<hr>
<p>&copy; 2026 Kvarterstidningen</p>
<!-- Skriven av Ada -->
`,
        hints: [
          '<hr> och sedan ett p med &copy;.',
          'En kommentar skrivs <!-- … -->.',
          '<!-- Skriven av … -->',
        ],
        tests: [
          {
            description: 'Stycket efter linjen säger © 2026 Kvarterstidningen',
            code: "text('hr + p')",
            expected: '© 2026 Kvarterstidningen',
          },
          {
            description: 'En kommentar säger vem som skrivit',
            code: "[...doc.body.childNodes].some(node => node.nodeType === 8 && node.textContent.trim().startsWith('Skriven av'))",
            expected: true,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-lanksamling',
    track: 'lankar',
    title: 'Länksamlingen',
    reward: { emoji: '🔖', name: 'Bokmärke' },
    summary:
      'Dina favoritsidor samlade på ett ställe, med länktexter som säger något.',
    steps: [
      {
        title: 'Tre favoriter',
        why: 'Varje länk står i ett eget stycke så att de hamnar på var sin rad. Länktexten säger vad sidan är, så att man vet vart man kommer.',
        xp: 15,
        description:
          'Du samlar dina favoritsidor. Först rubriken och tre länkar.',
        task: 'Uppgift: Skriv rubriken `Mina favoritsidor` med `h1`. Skriv sedan tre stycken med en länk i varje, till sidor som börjar med `https://`. Ingen länk får heta `Klicka här`, `Här` eller `Länk`.',
        starterCode: '<!-- Steg 1: tre favoriter -->\n',
        solution: `<h1>Mina favoritsidor</h1>
<p><a href="https://developer.mozilla.org">MDN om webbkod</a></p>
<p><a href="https://sv.wikipedia.org">Svenska Wikipedia</a></p>
<p><a href="https://www.smhi.se">Vädret från SMHI</a></p>
`,
        hints: [
          'En h1 och sedan tre p, med en a i varje.',
          'Varje href börjar med https://',
          '<p><a href="https://sv.wikipedia.org">Svenska Wikipedia</a></p>',
        ],
        tests: [
          {
            description: 'h1 säger Mina favoritsidor',
            code: "text('h1')",
            expected: 'Mina favoritsidor',
          },
          {
            description: 'Tre länkar i var sitt stycke',
            code: "count('p > a')",
            expected: 3,
          },
          {
            description: 'Alla länkar går till https://',
            code: "$$('a').every(a => (a.getAttribute('href') ?? '').startsWith('https://'))",
            expected: true,
          },
          {
            description: 'Länktexterna säger något',
            code: "$$('a').every(a => !/^(klicka här|här|länk)$/i.test(a.textContent.trim()))",
            expected: true,
          },
        ],
      },
      {
        title: 'Ny flik',
        why: 'Hela sidans poäng är att den ska finnas kvar, så att man kan hoppa vidare. Då är det rätt läge för target="_blank".',
        xp: 15,
        description: 'Länksamlingen ska ligga kvar när man klickar sig vidare.',
        task: 'Uppgift: Låt alla tre länkarna öppnas i en ny flik.',
        solution: `<h1>Mina favoritsidor</h1>
<p><a href="https://developer.mozilla.org" target="_blank">MDN om webbkod</a></p>
<p><a href="https://sv.wikipedia.org" target="_blank">Svenska Wikipedia</a></p>
<p><a href="https://www.smhi.se" target="_blank">Vädret från SMHI</a></p>
`,
        hints: [
          'Varje a får ett attribut till.',
          'target="_blank" efter href.',
          '<a href="…" target="_blank">',
        ],
        tests: [
          {
            description: 'Alla tre öppnas i ny flik',
            code: "$$('a').map(a => a.getAttribute('target'))",
            expected: ['_blank', '_blank', '_blank'],
          },
        ],
      },
      {
        title: 'Till toppen',
        why: 'Växer listan blir sidan lång. En länk tillbaka upp är vanlig längst ner – och den ska inte öppnas i ny flik, den stannar på sidan.',
        xp: 15,
        description: 'Längst ner kommer en länk som hoppar upp igen.',
        task: 'Uppgift: Ge rubriken id:t `topp`. Skriv sist ett stycke med länken `Till toppen` som går till `#topp`.',
        solution: `<h1 id="topp">Mina favoritsidor</h1>
<p><a href="https://developer.mozilla.org" target="_blank">MDN om webbkod</a></p>
<p><a href="https://sv.wikipedia.org" target="_blank">Svenska Wikipedia</a></p>
<p><a href="https://www.smhi.se" target="_blank">Vädret från SMHI</a></p>
<p><a href="#topp">Till toppen</a></p>
`,
        hints: [
          'Två ändringar: ett id på h1 och en ny länk sist.',
          '<h1 id="topp">',
          '<p><a href="#topp">Till toppen</a></p>',
        ],
        tests: [
          {
            description: 'Rubriken har id:t topp',
            code: "attr('h1', 'id')",
            expected: 'topp',
          },
          {
            description: 'Sista länken går till #topp',
            code: "(() => { const link = $$('a').at(-1); return link ? [link.textContent.trim(), link.getAttribute('href')] : null; })()",
            expected: ['Till toppen', '#topp'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-fotoalbum',
    track: 'lankar',
    title: 'Fotoalbumet',
    reward: { emoji: '📷', name: 'Kamera' },
    summary: 'Ett album med bilder, bildtexter och en bild som är en länk.',
    steps: [
      {
        title: 'Två bilder',
        why: 'Samma bredd på bilderna gör albumet lugnt att titta på. Alt-texten beskriver vad som syns, för den som inte ser bilden.',
        xp: 15,
        description: 'Du bygger ett fotoalbum. Först rubriken och två bilder.',
        task: 'Uppgift: Skriv rubriken `Mitt fotoalbum` med `h1`. Visa sedan `bilder/katt.svg` och `bilder/hund.svg`, 200 pixlar breda och med alt-texter som beskriver dem.',
        starterCode: '<!-- Steg 1: två bilder -->\n',
        solution: `<h1>Mitt fotoalbum</h1>
<img src="bilder/katt.svg" alt="En orange katt som sover" width="200">
<img src="bilder/hund.svg" alt="En brun hund med en pinne" width="200">
`,
        hints: [
          'Två img efter h1, i ordningen katt och hund.',
          'Varje img behöver src, alt och width.',
          '<img src="bilder/katt.svg" alt="…" width="200">',
        ],
        tests: [
          {
            description: 'h1 säger Mitt fotoalbum',
            code: "text('h1')",
            expected: 'Mitt fotoalbum',
          },
          {
            description: 'Katten och hunden, i den ordningen',
            code: "$$('img').map(img => img.getAttribute('src'))",
            expected: ['bilder/katt.svg', 'bilder/hund.svg'],
          },
          {
            description: 'Båda har en alt-text som inte är tom',
            code: "$$('img').map(img => (img.getAttribute('alt') ?? '').trim() !== '')",
            expected: [true, true],
          },
          {
            description: 'Båda är 200 pixlar breda',
            code: "$$('img').map(img => img.getAttribute('width'))",
            expected: ['200', '200'],
          },
        ],
      },
      {
        title: 'Bildtexter',
        why: 'Alt-texten är för den som inte ser bilden. Bildtexten är för alla, och kan säga det bilden inte visar – vem det är, och när.',
        xp: 15,
        description: 'Varje bild får en bildtext under sig.',
        task: 'Uppgift: Skriv ett stycke direkt efter varje bild, där bildtexten står i `em`.',
        solution: `<h1>Mitt fotoalbum</h1>
<img src="bilder/katt.svg" alt="En orange katt som sover" width="200">
<p><em>Måns sover efter maten.</em></p>
<img src="bilder/hund.svg" alt="En brun hund med en pinne" width="200">
<p><em>Bamse hittade en pinne i skogen.</em></p>
`,
        hints: [
          'Ett p efter varje img.',
          'em ligger inuti p, runt texten.',
          '<p><em>Måns sover …</em></p>',
        ],
        tests: [
          {
            description: 'Ett stycke efter varje bild',
            code: "$$('img').map(img => img.nextElementSibling?.tagName ?? null)",
            expected: ['P', 'P'],
          },
          {
            description: 'Bildtexterna står i em',
            code: "count('img + p > em')",
            expected: 2,
          },
        ],
      },
      {
        title: 'Bild som länk',
        why: 'En bild som är en länk behöver en alt-text som säger vart den går, eftersom alt-texten blir länktexten.',
        xp: 20,
        description: 'Sist en bild som går att klicka på.',
        task: 'Uppgift: Lägg till `bilder/pannkakor.svg`, 200 pixlar bred, som en länk till `https://sv.wikipedia.org/wiki/Pannkaka`. Alt-texten ska vara `Läs om pannkakor`.',
        solution: `<h1>Mitt fotoalbum</h1>
<img src="bilder/katt.svg" alt="En orange katt som sover" width="200">
<p><em>Måns sover efter maten.</em></p>
<img src="bilder/hund.svg" alt="En brun hund med en pinne" width="200">
<p><em>Bamse hittade en pinne i skogen.</em></p>
<a href="https://sv.wikipedia.org/wiki/Pannkaka">
  <img src="bilder/pannkakor.svg" alt="Läs om pannkakor" width="200">
</a>
`,
        hints: [
          'En a med en img inuti, sist på sidan.',
          'href står på a, och src, alt och width på img.',
          '<a href="…"><img src="bilder/pannkakor.svg" alt="Läs om pannkakor" width="200"></a>',
        ],
        tests: [
          {
            description: 'Pannkakorna ligger i en länk',
            code: "attr('a img', 'src')",
            expected: 'bilder/pannkakor.svg',
          },
          {
            description: 'Länken går till Wikipedia om pannkakor',
            code: "attr('a', 'href')",
            expected: 'https://sv.wikipedia.org/wiki/Pannkaka',
          },
          {
            description: 'Alt-texten säger vart länken går',
            code: "attr('a img', 'alt')",
            expected: 'Läs om pannkakor',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-wiki',
    track: 'lankar',
    title: 'Wikisidan',
    reward: { emoji: '📚', name: 'Böcker' },
    summary: 'En faktasida om katter med en innehållsförteckning som hoppar.',
    steps: [
      {
        title: 'Delarna',
        why: 'Varje del får ett id redan nu, så att innehållsförteckningen i nästa steg har något att hoppa till.',
        xp: 15,
        description:
          'Du bygger en faktasida som på Wikipedia. Först delarna, var och en med ett id.',
        task: 'Uppgift: Skriv `Katter` med `h1`. Skriv sedan tre `h2`: `Utseende`, `Beteende` och `Historia`, med id:na `utseende`, `beteende` och `historia`. Ett stycke under var och en.',
        starterCode: '<!-- Steg 1: delarna -->\n',
        solution: `<h1>Katter</h1>
<h2 id="utseende">Utseende</h2>
<p>Katter har mjuk päls, morrhår och vassa klor.</p>
<h2 id="beteende">Beteende</h2>
<p>Katter sover mycket och jagar helst i skymningen.</p>
<h2 id="historia">Historia</h2>
<p>Människor har haft katter i nästan tiotusen år.</p>
`,
        hints: [
          'En h1, sedan tre h2 med ett p under varje.',
          'id står i den öppnande taggen: <h2 id="utseende">.',
          'id skrivs med små bokstäver, rubriken med stor.',
        ],
        tests: [
          {
            description: 'Tre delar med rätt rubriker',
            code: "texts('h2')",
            expected: ['Utseende', 'Beteende', 'Historia'],
          },
          {
            description: 'Delarna har rätt id',
            code: "$$('h2').map(h => h.id)",
            expected: ['utseende', 'beteende', 'historia'],
          },
          {
            description: 'Ett stycke under varje del',
            code: "$$('h2').map(h => h.nextElementSibling?.tagName ?? null)",
            expected: ['P', 'P', 'P'],
          },
        ],
      },
      {
        title: 'Innehållsförteckningen',
        why: 'Innehållsförteckningen står överst så att man ser vad sidan har innan man börjar läsa. Länkarna går till id:na från förra steget.',
        xp: 20,
        description:
          'Nu kommer en innehållsförteckning som hoppar till delarna.',
        task: 'Uppgift: Skriv direkt under `h1` ett stycke med tre länkar, `Utseende`, `Beteende` och `Historia`, som går till delarna. Sätt `<br>` mellan länkarna.',
        solution: `<h1>Katter</h1>
<p>
  <a href="#utseende">Utseende</a><br>
  <a href="#beteende">Beteende</a><br>
  <a href="#historia">Historia</a>
</p>
<h2 id="utseende">Utseende</h2>
<p>Katter har mjuk päls, morrhår och vassa klor.</p>
<h2 id="beteende">Beteende</h2>
<p>Katter sover mycket och jagar helst i skymningen.</p>
<h2 id="historia">Historia</h2>
<p>Människor har haft katter i nästan tiotusen år.</p>
`,
        hints: [
          'Ett p direkt efter h1, med tre a i.',
          'href är # och id:t: href="#utseende".',
          '<a href="#utseende">Utseende</a><br>',
        ],
        tests: [
          {
            description: 'Tre länkar direkt under h1',
            code: "texts('h1 + p a')",
            expected: ['Utseende', 'Beteende', 'Historia'],
          },
          {
            description: 'De går till delarna',
            code: "$$('h1 + p a').map(a => a.getAttribute('href'))",
            expected: ['#utseende', '#beteende', '#historia'],
          },
        ],
      },
      {
        title: 'Bild och källa',
        why: 'En faktasida säger var fakta kommer ifrån. Källan öppnas i ny flik, så att läsaren inte tappar bort sidan.',
        xp: 20,
        description: 'Sist en bild under Utseende och en länk till källan.',
        task: `Uppgift: Sätt \`bilder/katt.svg\` med en alt-text direkt efter rubriken \`Utseende\`. Skriv sist ett stycke med länken \`Läs mer på Wikipedia\` till \`${KATT}\`, som öppnas i en ny flik.`,
        solution: `<h1>Katter</h1>
<p>
  <a href="#utseende">Utseende</a><br>
  <a href="#beteende">Beteende</a><br>
  <a href="#historia">Historia</a>
</p>
<h2 id="utseende">Utseende</h2>
<img src="bilder/katt.svg" alt="En orange katt som sover" width="200">
<p>Katter har mjuk päls, morrhår och vassa klor.</p>
<h2 id="beteende">Beteende</h2>
<p>Katter sover mycket och jagar helst i skymningen.</p>
<h2 id="historia">Historia</h2>
<p>Människor har haft katter i nästan tiotusen år.</p>
<p><a href="${KATT}" target="_blank">Läs mer på Wikipedia</a></p>
`,
        hints: [
          'img står mellan <h2 id="utseende"> och stycket.',
          'Glöm inte alt på bilden.',
          `<p><a href="${KATT}" target="_blank">Läs mer på Wikipedia</a></p>`,
        ],
        tests: [
          {
            description: 'Katten står direkt under Utseende',
            code: "$('#utseende')?.nextElementSibling?.getAttribute('src') ?? null",
            expected: 'bilder/katt.svg',
          },
          {
            description: 'Bilden har en alt-text',
            code: "(attr('img', 'alt') ?? '').trim() !== ''",
            expected: true,
          },
          {
            description: 'Sista länken går till Wikipedia i ny flik',
            code: "(() => { const link = $$('a').at(-1); return link ? [link.textContent.trim(), link.getAttribute('href'), link.getAttribute('target')] : null; })()",
            expected: ['Läs mer på Wikipedia', KATT, '_blank'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-inkop',
    track: 'listor',
    title: 'Inköpslistan',
    reward: { emoji: '🛒', name: 'Kundvagn' },
    summary: 'En inköpslista uppdelad efter var sakerna finns i affären.',
    steps: [
      {
        title: 'Två avdelningar',
        why: 'En lista per avdelning gör att du handlar allt i mejerihyllan på en gång. Ordningen spelar ingen roll, så det är ul.',
        xp: 15,
        description:
          'Du gör en inköpslista. Sakerna delas upp efter var de finns i affären.',
        task: 'Uppgift: Skriv `Att handla` med `h1`. Skriv sedan `Mejeri` med `h2` och en punktlista med `Mjölk` och `Ost`, och `Frukt` med `h2` och en punktlista med `Äpplen` och `Bananer`.',
        starterCode: '<!-- Steg 1: två avdelningar -->\n',
        solution: `<h1>Att handla</h1>
<h2>Mejeri</h2>
<ul>
  <li>Mjölk</li>
  <li>Ost</li>
</ul>
<h2>Frukt</h2>
<ul>
  <li>Äpplen</li>
  <li>Bananer</li>
</ul>
`,
        hints: [
          'Varje h2 har en ul direkt under sig.',
          'Två li i varje lista.',
          '<h2>Mejeri</h2>\n<ul>\n  <li>Mjölk</li> …',
        ],
        tests: [
          {
            description: 'Två avdelningar',
            code: "texts('h2')",
            expected: ['Mejeri', 'Frukt'],
          },
          {
            description: 'En punktlista under varje avdelning',
            code: "$$('h2').map(h => h.nextElementSibling?.tagName ?? null)",
            expected: ['UL', 'UL'],
          },
          {
            description: 'Rätt saker i listorna',
            code: "texts('li')",
            expected: ['Mjölk', 'Ost', 'Äpplen', 'Bananer'],
          },
        ],
      },
      {
        title: 'Glöm inte!',
        why: 'strong säger att mjölken är viktigast. Den inre listan hör till Äpplen, så den ligger inuti just det li:t.',
        xp: 20,
        description:
          'Mjölken får inte glömmas, och äpplena ska vara av två sorter.',
        task: 'Uppgift: Sätt `strong` runt `Mjölk`. Lägg en egen punktlista med `Gröna` och `Röda` under `Äpplen`.',
        solution: `<h1>Att handla</h1>
<h2>Mejeri</h2>
<ul>
  <li><strong>Mjölk</strong></li>
  <li>Ost</li>
</ul>
<h2>Frukt</h2>
<ul>
  <li>Äpplen
    <ul>
      <li>Gröna</li>
      <li>Röda</li>
    </ul>
  </li>
  <li>Bananer</li>
</ul>
`,
        hints: [
          '<li><strong>Mjölk</strong></li>',
          'Den inre listan står inuti li, efter ordet Äpplen.',
          '<li>Äpplen <ul><li>Gröna</li><li>Röda</li></ul></li>',
        ],
        tests: [
          {
            description: 'Mjölk står i strong',
            code: "text('li strong')",
            expected: 'Mjölk',
          },
          {
            description: 'Gröna och Röda ligger under Äpplen',
            code: "texts('li li')",
            expected: ['Gröna', 'Röda'],
          },
        ],
      },
      {
        title: 'I affären',
        why: 'Stegen i affären görs i ordning – man betalar inte först – så den listan är en ol.',
        xp: 15,
        description: 'Sist en lista över vad man gör i affären, i ordning.',
        task: 'Uppgift: Lägg till `Så här gör du` med `h2` och en numrerad lista: `Ta en korg`, `Handla allt på listan` och `Betala`.',
        solution: `<h1>Att handla</h1>
<h2>Mejeri</h2>
<ul>
  <li><strong>Mjölk</strong></li>
  <li>Ost</li>
</ul>
<h2>Frukt</h2>
<ul>
  <li>Äpplen
    <ul>
      <li>Gröna</li>
      <li>Röda</li>
    </ul>
  </li>
  <li>Bananer</li>
</ul>
<h2>Så här gör du</h2>
<ol>
  <li>Ta en korg</li>
  <li>Handla allt på listan</li>
  <li>Betala</li>
</ol>
`,
        hints: [
          'En h2 och sedan en ol, sist på sidan.',
          'ol fungerar som ul, men numrerar.',
          '<ol>\n  <li>Ta en korg</li> …',
        ],
        tests: [
          {
            description: 'Sista rubriken är Så här gör du',
            code: "texts('h2').at(-1) ?? null",
            expected: 'Så här gör du',
          },
          {
            description: 'Stegen står i en numrerad lista',
            code: "texts('ol li')",
            expected: ['Ta en korg', 'Handla allt på listan', 'Betala'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-topp5',
    track: 'listor',
    title: 'Topp 5-listan',
    reward: { emoji: '🏆', name: 'Pokal' },
    summary: 'Dina fem favoriter, med nedräkning och varför de är bäst.',
    steps: [
      {
        title: 'Fem favoriter',
        why: 'Ordningen är hela poängen med en topplista, så det är ol. Webbläsaren numrerar, så flyttar du en rad blir siffrorna ändå rätt.',
        xp: 15,
        description:
          'Du gör en topplista över dina favoriter – filmer, spel, böcker eller låtar.',
        task: 'Uppgift: Skriv en `h1` som börjar med `Min topp 5`, till exempel `Min topp 5: filmer`. Skriv sedan en numrerad lista med fem saker.',
        starterCode: '<!-- Steg 1: fem favoriter -->\n',
        solution: `<h1>Min topp 5: filmer</h1>
<ol>
  <li>Spirited Away</li>
  <li>Toy Story</li>
  <li>Paddington 2</li>
  <li>Coco</li>
  <li>Wall-E</li>
</ol>
`,
        hints: [
          'En h1 och en ol med fem li.',
          'Rubriken börjar exakt med Min topp 5.',
          '<ol>\n  <li>…</li> – fem gånger.',
        ],
        tests: [
          {
            description: 'h1 börjar med Min topp 5',
            code: "text('h1')?.startsWith('Min topp 5') ?? null",
            expected: true,
          },
          {
            description: 'Fem saker i en numrerad lista',
            code: "count('ol > li')",
            expected: 5,
          },
        ],
      },
      {
        title: 'Varför?',
        why: 'Namnet i strong och förklaringen efter gör att man kan skumma namnen men ändå läsa varför.',
        xp: 15,
        description: 'En topplista blir roligare när man vet varför.',
        task: 'Uppgift: Sätt `strong` runt namnet i varje rad, och skriv efter det varför du gillar den.',
        solution: `<h1>Min topp 5: filmer</h1>
<ol>
  <li><strong>Spirited Away</strong> – den vackraste filmen jag sett.</li>
  <li><strong>Toy Story</strong> – leksaker som lever, vad mer behövs?</li>
  <li><strong>Paddington 2</strong> – jag skrattar varje gång.</li>
  <li><strong>Coco</strong> – fin musik och ett sorgligt slut.</li>
  <li><strong>Wall-E</strong> – nästan inget pratas, men allt förstås.</li>
</ol>
`,
        hints: [
          'strong ligger inuti li, runt namnet.',
          'Efter </strong> skriver du varför, i samma li.',
          '<li><strong>Coco</strong> – fin musik.</li>',
        ],
        tests: [
          {
            description: 'Ett namn i strong på varje rad',
            code: "count('ol > li > strong')",
            expected: 5,
          },
          {
            description: 'Varje rad säger mer än namnet',
            code: "$$('ol > li').every(li => li.textContent.trim().length > li.querySelector('strong')?.textContent.trim().length + 3)",
            expected: true,
          },
        ],
      },
      {
        title: 'Nedräkningen',
        why: 'Attributet reversed räknar baklänges, så listan börjar med 5 och spänningen byggs upp mot etta. Raderna byter du plats på själv.',
        xp: 20,
        description: 'Riktiga topplistor räknar ner. Nummer 1 kommer sist.',
        task: 'Uppgift: Lägg till attributet `reversed` på `ol` och vänd på raderna, så att din etta står sist. Skriv efter listan ett stycke: `Nummer 1 är bäst!`',
        solution: `<h1>Min topp 5: filmer</h1>
<ol reversed>
  <li><strong>Wall-E</strong> – nästan inget pratas, men allt förstås.</li>
  <li><strong>Coco</strong> – fin musik och ett sorgligt slut.</li>
  <li><strong>Paddington 2</strong> – jag skrattar varje gång.</li>
  <li><strong>Toy Story</strong> – leksaker som lever, vad mer behövs?</li>
  <li><strong>Spirited Away</strong> – den vackraste filmen jag sett.</li>
</ol>
<p>Nummer 1 är bäst!</p>
`,
        hints: [
          '<ol reversed> – attributet behöver inget värde.',
          'Flytta raderna så att den som stod först står sist.',
          '<p>Nummer 1 är bäst!</p> efter </ol>.',
        ],
        tests: [
          {
            description: 'Listan räknar baklänges',
            code: "$('ol')?.hasAttribute('reversed') ?? null",
            expected: true,
          },
          {
            description: 'Stycket efter listan säger Nummer 1 är bäst!',
            code: "text('ol + p')",
            expected: 'Nummer 1 är bäst!',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-schema',
    track: 'listor',
    title: 'Veckoschemat',
    reward: { emoji: '📅', name: 'Kalender' },
    summary: 'Ditt skolschema som en tabell, med en lunch över alla dagar.',
    steps: [
      {
        title: 'Rubrikraden',
        why: 'Rubrikraden i thead säger vad varje kolumn är. Skärmläsaren läser upp "Tisdag" före lektionen i den kolumnen.',
        xp: 15,
        description:
          'Du bygger ett veckoschema. Först tabellens namn och rubrikraden.',
        task: 'Uppgift: Skriv en tabell med rubriken `Mitt schema` (`caption`) och en `thead` med rubrikcellerna `Tid`, `Måndag`, `Tisdag` och `Onsdag`.',
        starterCode: '<!-- Steg 1: rubrikraden -->\n',
        solution: `<table>
  <caption>Mitt schema</caption>
  <thead>
    <tr><th>Tid</th><th>Måndag</th><th>Tisdag</th><th>Onsdag</th></tr>
  </thead>
</table>
`,
        hints: [
          'table, sedan caption och sedan thead.',
          'thead har en tr med fyra th.',
          '<thead>\n  <tr><th>Tid</th>…</tr>\n</thead>',
        ],
        tests: [
          {
            description: 'Tabellen heter Mitt schema',
            code: "text('caption')",
            expected: 'Mitt schema',
          },
          {
            description: 'Rubrikraden i thead',
            code: "texts('thead th')",
            expected: ['Tid', 'Måndag', 'Tisdag', 'Onsdag'],
          },
        ],
      },
      {
        title: 'Lektionerna',
        why: 'Tiden är rubriken för raden, så den är en th också. Då läser skärmläsaren "8.00, Tisdag: Svenska".',
        xp: 20,
        description: 'Nu kommer lektionerna, en rad för varje tid.',
        task: 'Uppgift: Lägg till en `tbody` med två rader. Första cellen i varje rad är tiden, som `th`: `8.00` med `Matte`, `Svenska`, `Engelska` och `9.00` med `Idrott`, `Matte`, `Bild`.',
        solution: `<table>
  <caption>Mitt schema</caption>
  <thead>
    <tr><th>Tid</th><th>Måndag</th><th>Tisdag</th><th>Onsdag</th></tr>
  </thead>
  <tbody>
    <tr><th>8.00</th><td>Matte</td><td>Svenska</td><td>Engelska</td></tr>
    <tr><th>9.00</th><td>Idrott</td><td>Matte</td><td>Bild</td></tr>
  </tbody>
</table>
`,
        hints: [
          'tbody efter thead, med två tr.',
          'Varje rad börjar med en th för tiden och sedan tre td.',
          '<tr><th>8.00</th><td>Matte</td>…</tr>',
        ],
        tests: [
          {
            description: 'Två rader med rätt lektioner',
            code: "$$('tbody tr').map(tr => [...tr.children].map(cell => cell.textContent.trim()))",
            expected: [
              ['8.00', 'Matte', 'Svenska', 'Engelska'],
              ['9.00', 'Idrott', 'Matte', 'Bild'],
            ],
          },
          {
            description: 'Tiden är en rubrikcell',
            code: "$$('tbody tr').map(tr => tr.children[0]?.tagName ?? null)",
            expected: ['TH', 'TH'],
          },
        ],
      },
      {
        title: 'Lunchen',
        why: 'Lunchen är samma alla dagar. colspan låter en cell sträcka sig över flera kolumner, så att det inte står Lunch tre gånger.',
        xp: 20,
        description: 'Sist lunchen, som är samma alla dagar.',
        task: 'Uppgift: Lägg till en tredje rad: `11.30` som `th` och sedan en enda cell med `Lunch` som går över alla tre dagarna med `colspan="3"`.',
        solution: `<table>
  <caption>Mitt schema</caption>
  <thead>
    <tr><th>Tid</th><th>Måndag</th><th>Tisdag</th><th>Onsdag</th></tr>
  </thead>
  <tbody>
    <tr><th>8.00</th><td>Matte</td><td>Svenska</td><td>Engelska</td></tr>
    <tr><th>9.00</th><td>Idrott</td><td>Matte</td><td>Bild</td></tr>
    <tr><th>11.30</th><td colspan="3">Lunch</td></tr>
  </tbody>
</table>
`,
        hints: [
          'En ny tr sist i tbody.',
          'Raden har bara två celler: th för tiden och en td.',
          '<td colspan="3">Lunch</td>',
        ],
        tests: [
          {
            description: 'Tre rader i tbody',
            code: "count('tbody tr')",
            expected: 3,
          },
          {
            description: 'Lunchen går över tre kolumner',
            code: "[text('td[colspan]'), attr('td[colspan]', 'colspan')]",
            expected: ['Lunch', '3'],
          },
          {
            description: 'Raden börjar med 11.30',
            code: "$$('tbody tr')[2]?.children[0]?.textContent.trim() ?? null",
            expected: '11.30',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-blogg',
    track: 'struktur',
    title: 'Bloggen',
    reward: { emoji: '✏️', name: 'Penna' },
    summary: 'En blogg med sidhuvud, meny, inlägg och sidfot.',
    steps: [
      {
        title: 'Sidhuvudet',
        why: 'Sidhuvudet är samma på alla sidor i bloggen. Menyn ligger i nav så att en skärmläsare kan hoppa direkt till den.',
        xp: 15,
        description:
          'Du bygger en blogg. Först sidhuvudet med namnet och menyn.',
        task: 'Uppgift: Skriv en `header` med bloggens namn i en `h1` och en `nav` med en punktlista med två länkar: `Inlägg` till `#inlagg` och `Om mig` till `#om`.',
        starterCode: '<!-- Steg 1: sidhuvudet -->\n',
        solution: `<header>
  <h1>Adas blogg</h1>
  <nav>
    <ul>
      <li><a href="#inlagg">Inlägg</a></li>
      <li><a href="#om">Om mig</a></li>
    </ul>
  </nav>
</header>
`,
        hints: [
          'header runt både h1 och nav.',
          'I nav: en ul med två li och en a i varje.',
          '<li><a href="#inlagg">Inlägg</a></li>',
        ],
        tests: [
          {
            description: 'Bloggens namn står i header',
            code: "count('header h1')",
            expected: 1,
          },
          {
            description: 'Menyn har Inlägg och Om mig',
            code: "texts('header nav li a')",
            expected: ['Inlägg', 'Om mig'],
          },
          {
            description: 'Länkarna går till #inlagg och #om',
            code: "$$('nav a').map(a => a.getAttribute('href'))",
            expected: ['#inlagg', '#om'],
          },
        ],
      },
      {
        title: 'Inläggen',
        why: 'Varje inlägg är en article, eftersom det går att läsa för sig. Avsnitten är section och har id:na som menyn pekar på.',
        xp: 20,
        description: 'Nu kommer bloggens innehåll: inläggen och lite om dig.',
        task: 'Uppgift: Skriv en `main` med två `section`. Den första har id:t `inlagg`, rubriken `Inlägg` och två `article` med `h3` och ett stycke. Den andra har id:t `om`, rubriken `Om mig` och ett stycke.',
        solution: `<header>
  <h1>Adas blogg</h1>
  <nav>
    <ul>
      <li><a href="#inlagg">Inlägg</a></li>
      <li><a href="#om">Om mig</a></li>
    </ul>
  </nav>
</header>
<main>
  <section id="inlagg">
    <h2>Inlägg</h2>
    <article>
      <h3>Min första sida</h3>
      <p>Idag byggde jag min första webbsida.</p>
    </article>
    <article>
      <h3>Nu kan jag formulär</h3>
      <p>Snart kan jag bygga en gästbok.</p>
    </article>
  </section>
  <section id="om">
    <h2>Om mig</h2>
    <p>Jag heter Ada och lär mig HTML.</p>
  </section>
</main>
`,
        hints: [
          'main efter </header>, och båda section i main.',
          'Den första section har två article, var och en med h3 och p.',
          '<section id="inlagg">\n  <h2>Inlägg</h2>\n  <article>…</article>',
        ],
        tests: [
          {
            description: 'Två avsnitt i main med id:na inlagg och om',
            code: "$$('main > section').map(section => section.id)",
            expected: ['inlagg', 'om'],
          },
          {
            description: 'Två inlägg i avsnittet Inlägg',
            code: "$$('#inlagg article').map(a => a.querySelector('h3') ? 'h3' : null)",
            expected: ['h3', 'h3'],
          },
          {
            description: 'Om mig har en rubrik och ett stycke',
            code: "[text('#om h2'), count('#om p')]",
            expected: ['Om mig', 1],
          },
        ],
      },
      {
        title: 'Sidfoten',
        why: 'Sidfoten är där man letar efter kontakt och vem som äger sidan. Den står efter main, aldrig inuti.',
        xp: 15,
        description: 'Sist sidfoten, med © och ett sätt att nå dig.',
        task: 'Uppgift: Skriv en `footer` efter `main` med två stycken: ett med `©`, året och ditt namn, och ett med länken `Mejla mig` till `mailto:` och en adress.',
        solution: `<header>
  <h1>Adas blogg</h1>
  <nav>
    <ul>
      <li><a href="#inlagg">Inlägg</a></li>
      <li><a href="#om">Om mig</a></li>
    </ul>
  </nav>
</header>
<main>
  <section id="inlagg">
    <h2>Inlägg</h2>
    <article>
      <h3>Min första sida</h3>
      <p>Idag byggde jag min första webbsida.</p>
    </article>
    <article>
      <h3>Nu kan jag formulär</h3>
      <p>Snart kan jag bygga en gästbok.</p>
    </article>
  </section>
  <section id="om">
    <h2>Om mig</h2>
    <p>Jag heter Ada och lär mig HTML.</p>
  </section>
</main>
<footer>
  <p>&copy; 2026 Ada</p>
  <p><a href="mailto:ada@example.com">Mejla mig</a></p>
</footer>
`,
        hints: [
          'footer efter </main>.',
          '&copy; blir ©.',
          '<a href="mailto:ada@example.com">Mejla mig</a>',
        ],
        tests: [
          {
            description: 'Sidfoten står efter main',
            code: "$('main')?.nextElementSibling?.tagName ?? null",
            expected: 'FOOTER',
          },
          {
            description: 'Sidfoten har ©',
            code: "text('footer')?.includes('©') ?? null",
            expected: true,
          },
          {
            description: 'Mejla mig går till en mailto-adress',
            code: "(() => { const link = $$('footer a').find(a => a.textContent.trim() === 'Mejla mig'); return link ? link.getAttribute('href').startsWith('mailto:') : null; })()",
            expected: true,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-forening',
    track: 'struktur',
    title: 'Föreningssidan',
    reward: { emoji: '🪺', name: 'Fågelbo' },
    summary: 'En hel sida för fågelklubben, från doctype till sidfot.',
    steps: [
      {
        title: 'Skalet',
        why: 'Skalet är samma på varje sida du gör: doctype, språk, teckenkodning och titel. Titeln är det som syns i fliken och på Google.',
        xp: 15,
        description:
          'Du bygger en sida för fågelklubben, som ett helt dokument.',
        task: 'Uppgift: Skriv ett helt dokument på svenska med `<meta charset="utf-8">` och titeln `Fågelklubben`. I `body` en `header` med rubriken `Fågelklubben`.',
        starterCode: '<!-- Steg 1: skalet -->\n',
        solution: `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8">
    <title>Fågelklubben</title>
  </head>
  <body>
    <header>
      <h1>Fågelklubben</h1>
    </header>
  </body>
</html>
`,
        hints: [
          '<!doctype html> först, sedan <html lang="sv">.',
          'meta och title i head, header i body.',
          '<header>\n  <h1>Fågelklubben</h1>\n</header>',
        ],
        tests: [
          {
            description: 'Ett helt dokument på svenska',
            code: "[doc.doctype?.name ?? null, doc.documentElement.getAttribute('lang')]",
            expected: ['html', 'sv'],
          },
          {
            description: 'utf-8 och titeln Fågelklubben',
            code: "[attr('meta[charset]', 'charset')?.toLowerCase() ?? null, doc.title]",
            expected: ['utf-8', 'Fågelklubben'],
          },
          {
            description: 'Rubriken står i header',
            code: "text('header h1')",
            expected: 'Fågelklubben',
          },
        ],
      },
      {
        title: 'Avsnitten',
        why: 'Varje avsnitt får ett id redan nu, så att menyn i nästa steg har något att hoppa till.',
        xp: 20,
        description: 'Nu kommer det klubben vill berätta.',
        task: 'Uppgift: Skriv en `main` efter `header` med tre `section`: `Om oss` (id `om`), `Utflykter` (id `utflykter`) och `Bli medlem` (id `medlem`). Var och en har `h2` och ett stycke, och `Utflykter` en punktlista med minst två utflykter i stället för stycket.',
        solution: `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8">
    <title>Fågelklubben</title>
  </head>
  <body>
    <header>
      <h1>Fågelklubben</h1>
    </header>
    <main>
      <section id="om">
        <h2>Om oss</h2>
        <p>Vi tittar på fåglar varje helg, året runt.</p>
      </section>
      <section id="utflykter">
        <h2>Utflykter</h2>
        <ul>
          <li>Tranorna vid sjön i april</li>
          <li>Ugglekväll i skogen i maj</li>
        </ul>
      </section>
      <section id="medlem">
        <h2>Bli medlem</h2>
        <p>Det kostar 100 kr om året. Kikare finns att låna.</p>
      </section>
    </main>
  </body>
</html>
`,
        hints: [
          'main efter </header>, inuti body.',
          'Tre section med id, h2 och innehåll.',
          '<section id="utflykter">\n  <h2>Utflykter</h2>\n  <ul>…</ul>\n</section>',
        ],
        tests: [
          {
            description: 'Tre avsnitt med rätt id',
            code: "$$('main > section').map(section => section.id)",
            expected: ['om', 'utflykter', 'medlem'],
          },
          {
            description: 'Rubrikerna är Om oss, Utflykter och Bli medlem',
            code: "texts('main section > h2')",
            expected: ['Om oss', 'Utflykter', 'Bli medlem'],
          },
          {
            description: 'Utflykterna står i en punktlista',
            code: "count('#utflykter ul li') >= 2",
            expected: true,
          },
        ],
      },
      {
        title: 'Meny och sidfot',
        why: 'Menyn i header gör att man kan hoppa direkt till det man söker. Sidfoten säger hur man når klubben.',
        xp: 20,
        description: 'Sist en meny som hoppar till avsnitten, och en sidfot.',
        task: 'Uppgift: Skriv en `nav` i `header`, efter rubriken, med tre länkar till avsnitten. Skriv en `footer` efter `main` med en länk som ringer `tel:+46701234567`.',
        solution: `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8">
    <title>Fågelklubben</title>
  </head>
  <body>
    <header>
      <h1>Fågelklubben</h1>
      <nav>
        <ul>
          <li><a href="#om">Om oss</a></li>
          <li><a href="#utflykter">Utflykter</a></li>
          <li><a href="#medlem">Bli medlem</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <section id="om">
        <h2>Om oss</h2>
        <p>Vi tittar på fåglar varje helg, året runt.</p>
      </section>
      <section id="utflykter">
        <h2>Utflykter</h2>
        <ul>
          <li>Tranorna vid sjön i april</li>
          <li>Ugglekväll i skogen i maj</li>
        </ul>
      </section>
      <section id="medlem">
        <h2>Bli medlem</h2>
        <p>Det kostar 100 kr om året. Kikare finns att låna.</p>
      </section>
    </main>
    <footer>
      <p><a href="tel:+46701234567">Ring oss</a></p>
    </footer>
  </body>
</html>
`,
        hints: [
          'nav står i header, efter </h1>.',
          'Länkarna går till #om, #utflykter och #medlem.',
          '<footer>\n  <p><a href="tel:+46701234567">Ring oss</a></p>\n</footer>',
        ],
        tests: [
          {
            description: 'Menyn i header hoppar till de tre avsnitten',
            code: "$$('header nav a').map(a => a.getAttribute('href'))",
            expected: ['#om', '#utflykter', '#medlem'],
          },
          {
            description: 'Sidfoten ringer klubben',
            code: "attr('footer a', 'href')",
            expected: 'tel:+46701234567',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-restaurang',
    track: 'struktur',
    title: 'Restaurangen',
    reward: { emoji: '🍽️', name: 'Tallrik' },
    summary: 'En restaurangsida från noll, med meny som tabell och adress.',
    steps: [
      {
        title: 'Från noll',
        why: 'Du skriver hela skalet själv igen – efter några gånger sitter det i fingrarna.',
        xp: 15,
        description: 'Du bygger en sida för en pizzeria, från första raden.',
        task: 'Uppgift: Skriv ett helt dokument på svenska med `utf-8` och titeln `Pizzeria Luna`. I `body` en `header` med rubriken `Pizzeria Luna` och ett stycke under: `Stenugnsbakat sedan 1998`.',
        starterCode: '<!-- Steg 1: från noll -->\n',
        solution: `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8">
    <title>Pizzeria Luna</title>
  </head>
  <body>
    <header>
      <h1>Pizzeria Luna</h1>
      <p>Stenugnsbakat sedan 1998</p>
    </header>
  </body>
</html>
`,
        hints: [
          'doctype, html med lang, head med meta och title, body.',
          'Både h1 och stycket står i header.',
          '<header>\n  <h1>Pizzeria Luna</h1>\n  <p>Stenugnsbakat sedan 1998</p>\n</header>',
        ],
        tests: [
          {
            description: 'Ett helt dokument på svenska med utf-8',
            code: "[doc.doctype?.name ?? null, doc.documentElement.getAttribute('lang'), attr('meta[charset]', 'charset')?.toLowerCase() ?? null]",
            expected: ['html', 'sv', 'utf-8'],
          },
          {
            description: 'Titeln är Pizzeria Luna',
            code: 'doc.title',
            expected: 'Pizzeria Luna',
          },
          {
            description: 'Sidhuvudet har rubriken och stycket',
            code: "[text('header h1'), text('header p')]",
            expected: ['Pizzeria Luna', 'Stenugnsbakat sedan 1998'],
          },
        ],
      },
      {
        title: 'Menyn',
        why: 'Pizzorna och priserna är data i rader och kolumner, så de blir en tabell. Den står i en section med rubrik inuti main.',
        xp: 20,
        description: 'Nu kommer matmenyn.',
        task: 'Uppgift: Skriv en `main` med en `section` som har rubriken `Meny` (`h2`) och en tabell. Tabellen har rubrikraden `Pizza` och `Pris` i `thead`, och minst tre pizzor i `tbody`.',
        solution: `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8">
    <title>Pizzeria Luna</title>
  </head>
  <body>
    <header>
      <h1>Pizzeria Luna</h1>
      <p>Stenugnsbakat sedan 1998</p>
    </header>
    <main>
      <section>
        <h2>Meny</h2>
        <table>
          <thead>
            <tr><th>Pizza</th><th>Pris</th></tr>
          </thead>
          <tbody>
            <tr><td>Margherita</td><td>95 kr</td></tr>
            <tr><td>Vesuvio</td><td>105 kr</td></tr>
            <tr><td>Capricciosa</td><td>110 kr</td></tr>
          </tbody>
        </table>
      </section>
    </main>
  </body>
</html>
`,
        hints: [
          'main efter </header>, en section i main.',
          'h2 och sedan table i section.',
          '<tr><td>Margherita</td><td>95 kr</td></tr>',
        ],
        tests: [
          {
            description: 'Ett avsnitt Meny i main',
            code: "text('main section h2')",
            expected: 'Meny',
          },
          {
            description: 'Rubrikraden är Pizza och Pris',
            code: "texts('main thead th')",
            expected: ['Pizza', 'Pris'],
          },
          {
            description: 'Minst tre pizzor med två celler var',
            code: "(() => { const rows = $$('main tbody tr'); return rows.length >= 3 && rows.every(row => row.children.length === 2); })()",
            expected: true,
          },
        ],
      },
      {
        title: 'Hitta hit',
        why: 'Adressens rader hör ihop, så de står i ett stycke med br. Telefonnumret är en länk, så att man kan ringa direkt från mobilen.',
        xp: 15,
        description: 'Sist sidfoten, med adress och telefon.',
        task: 'Uppgift: Skriv en `footer` efter `main` med adressen i ett stycke: `Månvägen 1`, `<br>`, `123 45 Småstad`. Sedan ett stycke med länken `Ring och beställ` till `tel:+46401234567`.',
        solution: `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8">
    <title>Pizzeria Luna</title>
  </head>
  <body>
    <header>
      <h1>Pizzeria Luna</h1>
      <p>Stenugnsbakat sedan 1998</p>
    </header>
    <main>
      <section>
        <h2>Meny</h2>
        <table>
          <thead>
            <tr><th>Pizza</th><th>Pris</th></tr>
          </thead>
          <tbody>
            <tr><td>Margherita</td><td>95 kr</td></tr>
            <tr><td>Vesuvio</td><td>105 kr</td></tr>
            <tr><td>Capricciosa</td><td>110 kr</td></tr>
          </tbody>
        </table>
      </section>
    </main>
    <footer>
      <p>Månvägen 1<br>123 45 Småstad</p>
      <p><a href="tel:+46401234567">Ring och beställ</a></p>
    </footer>
  </body>
</html>
`,
        hints: [
          'footer efter </main>.',
          '<p>Månvägen 1<br>123 45 Småstad</p>',
          '<a href="tel:+46401234567">Ring och beställ</a>',
        ],
        tests: [
          {
            description: 'Adressen står på två rader i sidfoten',
            code: "(() => { const p = $('footer p'); return p ? [...p.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).filter(Boolean) : null; })()",
            expected: ['Månvägen 1', '123 45 Småstad'],
          },
          {
            description: 'Ring och beställ går till telefonnumret',
            code: "(() => { const link = $('footer a'); return link ? [link.textContent.trim(), link.getAttribute('href')] : null; })()",
            expected: ['Ring och beställ', 'tel:+46401234567'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-kontakt',
    track: 'formular',
    title: 'Kontaktformuläret',
    reward: { emoji: '✉️', name: 'Kuvert' },
    summary: 'Ett formulär där besökarna kan skriva till dig.',
    steps: [
      {
        title: 'Vem är du?',
        why: 'id kopplar ihop etiketten och fältet, name är det som skickas. Typen email gör att mobilen visar @ på tangentbordet.',
        xp: 15,
        description: 'Du bygger ett kontaktformulär. Först: vem skriver?',
        task: 'Uppgift: Skriv en `form` med två fält med etiketter: `Namn` (text, id och name `namn`) och `E-post` (email, id och name `epost`).',
        starterCode: '<!-- Steg 1: vem är du? -->\n',
        solution: `<form>
  <label for="namn">Namn</label>
  <input type="text" id="namn" name="namn">
  <label for="epost">E-post</label>
  <input type="email" id="epost" name="epost">
</form>
`,
        hints: [
          'form runt allt, och en label före varje input.',
          'Varje input har type, id och name.',
          '<label for="epost">E-post</label>\n<input type="email" id="epost" name="epost">',
        ],
        tests: [
          {
            description: 'Två fält i formuläret: text och email',
            code: "$$('form input').map(input => input.type)",
            expected: ['text', 'email'],
          },
          {
            description: 'Fälten heter namn och epost',
            code: "$$('form input').map(input => input.name)",
            expected: ['namn', 'epost'],
          },
          {
            description: 'Etiketterna Namn och E-post hör till fälten',
            code: "$$('form input').map(input => input.labels?.[0]?.textContent.trim() ?? null)",
            expected: ['Namn', 'E-post'],
          },
        ],
      },
      {
        title: 'Meddelandet',
        why: 'Ett meddelande är flera rader, så det blir ett textarea. Ett tomt meddelande är meningslöst att skicka – därför required, på alla tre.',
        xp: 15,
        description: 'Nu kommer själva meddelandet, och inget får vara tomt.',
        task: 'Uppgift: Lägg till ett `textarea` med etiketten `Meddelande` (id och name `meddelande`, 5 rader). Gör alla tre fälten obligatoriska.',
        solution: `<form>
  <label for="namn">Namn</label>
  <input type="text" id="namn" name="namn" required>
  <label for="epost">E-post</label>
  <input type="email" id="epost" name="epost" required>
  <label for="meddelande">Meddelande</label>
  <textarea id="meddelande" name="meddelande" rows="5" required></textarea>
</form>
`,
        hints: [
          'label och textarea efter sista input.',
          'required på alla tre fälten, även textarea.',
          '<textarea id="meddelande" name="meddelande" rows="5" required></textarea>',
        ],
        tests: [
          {
            description: 'Ett textarea med etiketten Meddelande',
            code: "[$('textarea')?.name ?? null, $('textarea')?.labels?.[0]?.textContent.trim() ?? null]",
            expected: ['meddelande', 'Meddelande'],
          },
          {
            description: 'Alla tre fälten måste fyllas i',
            code: "$$('input, textarea').map(field => field.required)",
            expected: [true, true, true],
          },
        ],
      },
      {
        title: 'Skicka',
        why: 'Kryssrutan skickas bara när den är ikryssad, och då med sitt value. Prova att skicka med och utan kryss i rutan.',
        xp: 20,
        description: 'Sist en kryssruta och knappen.',
        task: 'Uppgift: Lägg till en kryssruta med etiketten `Skicka en kopia till mig` (`name="kopia"`, `value="ja"`) och en knapp som säger `Skicka`. Prova sedan att skicka i rutan.',
        solution: `<form>
  <label for="namn">Namn</label>
  <input type="text" id="namn" name="namn" required>
  <label for="epost">E-post</label>
  <input type="email" id="epost" name="epost" required>
  <label for="meddelande">Meddelande</label>
  <textarea id="meddelande" name="meddelande" rows="5" required></textarea>
  <label>
    <input type="checkbox" name="kopia" value="ja"> Skicka en kopia till mig
  </label>
  <button>Skicka</button>
</form>
`,
        hints: [
          'label runt kryssrutan och texten.',
          'type="checkbox" name="kopia" value="ja"',
          '<button>Skicka</button> sist i formuläret.',
        ],
        tests: [
          {
            description: 'En kryssruta för kopia',
            code: "(() => { const box = $('input[type=checkbox]'); return box ? [box.name, box.value, box.labels?.[0]?.textContent.trim() ?? null] : null; })()",
            expected: ['kopia', 'ja', 'Skicka en kopia till mig'],
          },
          {
            description: 'Knappen säger Skicka',
            code: "text('form button')",
            expected: 'Skicka',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-pizza',
    track: 'formular',
    title: 'Pizzabeställningen',
    reward: { emoji: '🍕', name: 'Pizza' },
    summary: 'Beställ en pizza: storlek, botten, fyllning och telefonnummer.',
    steps: [
      {
        title: 'Storleken',
        why: 'Fyra storlekar tar mycket plats som radioknappar, men får plats i en meny. value är det köket får veta.',
        xp: 15,
        description: 'Du bygger en pizzabeställning. Först storleken.',
        task: 'Uppgift: Skriv en `form` med en meny med etiketten `Storlek` (id och name `storlek`) och alternativen `Barn`, `Vanlig`, `Familj` och `Party`. Lägg till knappen `Beställ`.',
        starterCode: '<!-- Steg 1: storleken -->\n',
        solution: `<form>
  <label for="storlek">Storlek</label>
  <select id="storlek" name="storlek">
    <option value="barn">Barn</option>
    <option value="vanlig">Vanlig</option>
    <option value="familj">Familj</option>
    <option value="party">Party</option>
  </select>
  <button>Beställ</button>
</form>
`,
        hints: [
          'En label, en select med fyra option och en button.',
          'Varje option har ett value.',
          '<option value="barn">Barn</option>',
        ],
        tests: [
          {
            description: 'Menyn har etiketten Storlek och name storlek',
            code: "[$('select')?.labels?.[0]?.textContent.trim() ?? null, $('select')?.name ?? null]",
            expected: ['Storlek', 'storlek'],
          },
          {
            description: 'Fyra storlekar',
            code: "texts('select option')",
            expected: ['Barn', 'Vanlig', 'Familj', 'Party'],
          },
          {
            description: 'Knappen Beställ',
            code: "text('form button')",
            expected: 'Beställ',
          },
        ],
      },
      {
        title: 'Botten och fyllning',
        why: 'Botten väljer man en av – radioknappar med samma name. Fyllning kan man välja flera av – kryssrutor, också med samma name, så att köket får en lista.',
        xp: 20,
        description: 'Nu väljer man botten och vad som ska vara på.',
        task: 'Uppgift: Före knappen: två radioknappar med `name="botten"` – `Vanlig` och `Glutenfri` – och tre kryssrutor med `name="fyllning"` – `Skinka`, `Svamp` och `Ananas`. Alla med etiketter och värden.',
        solution: `<form>
  <label for="storlek">Storlek</label>
  <select id="storlek" name="storlek">
    <option value="barn">Barn</option>
    <option value="vanlig">Vanlig</option>
    <option value="familj">Familj</option>
    <option value="party">Party</option>
  </select>
  <p>Botten</p>
  <label><input type="radio" name="botten" value="vanlig"> Vanlig</label>
  <label><input type="radio" name="botten" value="glutenfri"> Glutenfri</label>
  <p>Fyllning</p>
  <label><input type="checkbox" name="fyllning" value="skinka"> Skinka</label>
  <label><input type="checkbox" name="fyllning" value="svamp"> Svamp</label>
  <label><input type="checkbox" name="fyllning" value="ananas"> Ananas</label>
  <button>Beställ</button>
</form>
`,
        hints: [
          'Radioknappar: type="radio", samma name="botten".',
          'Kryssrutor: type="checkbox", samma name="fyllning".',
          '<label><input type="checkbox" name="fyllning" value="svamp"> Svamp</label>',
        ],
        tests: [
          {
            description: 'Två radioknappar för botten',
            code: "$$('input[type=radio]').map(r => [r.name, r.labels?.[0]?.textContent.trim() ?? null])",
            expected: [
              ['botten', 'Vanlig'],
              ['botten', 'Glutenfri'],
            ],
          },
          {
            description: 'Tre kryssrutor för fyllning',
            code: "$$('input[type=checkbox]').map(c => [c.name, c.labels?.[0]?.textContent.trim() ?? null])",
            expected: [
              ['fyllning', 'Skinka'],
              ['fyllning', 'Svamp'],
              ['fyllning', 'Ananas'],
            ],
          },
          {
            description: 'Alla har ett value',
            code: "$$('input').every(input => input.getAttribute('value'))",
            expected: true,
          },
        ],
      },
      {
        title: 'Vem beställer?',
        why: 'Utan telefonnummer kan pizzerian inte ringa när pizzan är klar, så det är required. type="tel" ger siffertangentbordet på mobilen.',
        xp: 15,
        description: 'Sist: vem ska pizzan till?',
        task: 'Uppgift: Före knappen: ett fält med etiketten `Telefon`, `type="tel"`, id och name `telefon`, som måste fyllas i. Prova sedan att beställa i rutan.',
        solution: `<form>
  <label for="storlek">Storlek</label>
  <select id="storlek" name="storlek">
    <option value="barn">Barn</option>
    <option value="vanlig">Vanlig</option>
    <option value="familj">Familj</option>
    <option value="party">Party</option>
  </select>
  <p>Botten</p>
  <label><input type="radio" name="botten" value="vanlig"> Vanlig</label>
  <label><input type="radio" name="botten" value="glutenfri"> Glutenfri</label>
  <p>Fyllning</p>
  <label><input type="checkbox" name="fyllning" value="skinka"> Skinka</label>
  <label><input type="checkbox" name="fyllning" value="svamp"> Svamp</label>
  <label><input type="checkbox" name="fyllning" value="ananas"> Ananas</label>
  <label for="telefon">Telefon</label>
  <input type="tel" id="telefon" name="telefon" required>
  <button>Beställ</button>
</form>
`,
        hints: [
          'En label och en input före knappen.',
          'type="tel" och required.',
          '<input type="tel" id="telefon" name="telefon" required>',
        ],
        tests: [
          {
            description: 'Ett telefonfält med etiketten Telefon',
            code: "[$('input[type=tel]')?.name ?? null, $('input[type=tel]')?.labels?.[0]?.textContent.trim() ?? null]",
            expected: ['telefon', 'Telefon'],
          },
          {
            description: 'Telefonen måste fyllas i',
            code: "$('input[type=tel]')?.required ?? null",
            expected: true,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-enkat',
    track: 'formular',
    title: 'Enkäten',
    reward: { emoji: '📋', name: 'Klippbräda' },
    summary: 'En enkät efter lägret, med frågor grupperade i rutor.',
    steps: [
      {
        title: 'Betyget',
        why: 'fieldset samlar knappar som hör ihop, och legend är frågan. Skärmläsaren läser upp frågan före varje knapp: "Hur var lägret? 3".',
        xp: 20,
        description:
          'Du gör en enkät. Första frågan är ett betyg från 1 till 5.',
        task: 'Uppgift: Skriv en `form` med en `fieldset`. I den en `legend` som säger `Hur var lägret?` och fem radioknappar med `name="betyg"`, värdena och etiketterna `1` till `5`.',
        starterCode: '<!-- Steg 1: betyget -->\n',
        solution: `<form>
  <fieldset>
    <legend>Hur var lägret?</legend>
    <label><input type="radio" name="betyg" value="1"> 1</label>
    <label><input type="radio" name="betyg" value="2"> 2</label>
    <label><input type="radio" name="betyg" value="3"> 3</label>
    <label><input type="radio" name="betyg" value="4"> 4</label>
    <label><input type="radio" name="betyg" value="5"> 5</label>
  </fieldset>
</form>
`,
        hints: [
          'fieldset i form, och legend först i fieldset.',
          'Fem radioknappar med samma name: betyg.',
          '<label><input type="radio" name="betyg" value="1"> 1</label>',
        ],
        tests: [
          {
            description: 'Frågan står i en legend i en fieldset',
            code: "text('form fieldset legend')",
            expected: 'Hur var lägret?',
          },
          {
            description: 'Fem radioknappar i gruppen betyg',
            code: "$$('fieldset input[type=radio]').map(r => r.name + '=' + r.value)",
            expected: ['betyg=1', 'betyg=2', 'betyg=3', 'betyg=4', 'betyg=5'],
          },
        ],
      },
      {
        title: 'Det bästa',
        why: 'Man kan tycka att flera saker var bäst, så det är kryssrutor. En egen fieldset gör det tydligt att det är en ny fråga.',
        xp: 20,
        description: 'Andra frågan: vad var bäst? Man får välja flera.',
        task: 'Uppgift: Skriv en fieldset till med `legend` `Vad var bäst?` och tre kryssrutor med `name="bast"`: `Bada`, `Maten` och `Lägerelden`.',
        solution: `<form>
  <fieldset>
    <legend>Hur var lägret?</legend>
    <label><input type="radio" name="betyg" value="1"> 1</label>
    <label><input type="radio" name="betyg" value="2"> 2</label>
    <label><input type="radio" name="betyg" value="3"> 3</label>
    <label><input type="radio" name="betyg" value="4"> 4</label>
    <label><input type="radio" name="betyg" value="5"> 5</label>
  </fieldset>
  <fieldset>
    <legend>Vad var bäst?</legend>
    <label><input type="checkbox" name="bast" value="bada"> Bada</label>
    <label><input type="checkbox" name="bast" value="maten"> Maten</label>
    <label><input type="checkbox" name="bast" value="lagerelden"> Lägerelden</label>
  </fieldset>
</form>
`,
        hints: [
          'En ny fieldset efter den första, med en egen legend.',
          'Kryssrutor: type="checkbox" och name="bast".',
          '<label><input type="checkbox" name="bast" value="bada"> Bada</label>',
        ],
        tests: [
          {
            description: 'Två frågor',
            code: "texts('legend')",
            expected: ['Hur var lägret?', 'Vad var bäst?'],
          },
          {
            description: 'Tre kryssrutor i den andra frågan',
            code: "$$('fieldset')[1] ? [...$$('fieldset')[1].querySelectorAll('input[type=checkbox]')].map(c => c.labels?.[0]?.textContent.trim() ?? null) : null",
            expected: ['Bada', 'Maten', 'Lägerelden'],
          },
          {
            description: 'Kryssrutorna heter bast',
            code: "$$('input[type=checkbox]').every(c => c.name === 'bast')",
            expected: true,
          },
        ],
      },
      {
        title: 'Något mer?',
        why: 'Ett fritt textfält fångar det frågorna missade. Det är inte required – alla har inte något mer att säga.',
        xp: 15,
        description: 'Sist ett fritt fält och knappen.',
        task: 'Uppgift: Efter fieldseten: ett `textarea` med etiketten `Något mer?` (id och name `ovrigt`) och en knapp som säger `Skicka svar`. Prova att skicka i rutan.',
        solution: `<form>
  <fieldset>
    <legend>Hur var lägret?</legend>
    <label><input type="radio" name="betyg" value="1"> 1</label>
    <label><input type="radio" name="betyg" value="2"> 2</label>
    <label><input type="radio" name="betyg" value="3"> 3</label>
    <label><input type="radio" name="betyg" value="4"> 4</label>
    <label><input type="radio" name="betyg" value="5"> 5</label>
  </fieldset>
  <fieldset>
    <legend>Vad var bäst?</legend>
    <label><input type="checkbox" name="bast" value="bada"> Bada</label>
    <label><input type="checkbox" name="bast" value="maten"> Maten</label>
    <label><input type="checkbox" name="bast" value="lagerelden"> Lägerelden</label>
  </fieldset>
  <label for="ovrigt">Något mer?</label>
  <textarea id="ovrigt" name="ovrigt" rows="4"></textarea>
  <button>Skicka svar</button>
</form>
`,
        hints: [
          'label och textarea efter sista </fieldset>.',
          'id och name är ovrigt, utan ö.',
          '<button>Skicka svar</button> sist.',
        ],
        tests: [
          {
            description: 'Ett textarea med etiketten Något mer?',
            code: "[$('textarea')?.name ?? null, $('textarea')?.labels?.[0]?.textContent.trim() ?? null]",
            expected: ['ovrigt', 'Något mer?'],
          },
          {
            description: 'Knappen säger Skicka svar',
            code: "text('form button')",
            expected: 'Skicka svar',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-affisch',
    track: 'css',
    title: 'Affischen',
    reward: { emoji: '🖼️', name: 'Tavla' },
    summary:
      'En affisch för en sommarkonsert, med mörk bakgrund, stora bokstäver och det viktiga i färg.',
    steps: [
      {
        title: 'Färgerna',
        why: 'En affisch ska synas på långt håll. Mörk bakgrund med ljus text ger stark kontrast, och en egen färg på rubriken drar blicken dit först.',
        xp: 15,
        description:
          'Texten till affischen finns redan. Nu får den färg – börja med bakgrunden och texten.',
        task: 'Uppgift: Lägg till en `<style>` överst. Ge `body` bakgrunden `midnightblue` och texten `white`. Gör rubriken `gold`.',
        starterCode: `<!-- Steg 1: färgerna -->
${AFFISCH}`,
        solution: affisch(`  body {
    background-color: midnightblue;
    color: white;
  }
  h1 { color: gold; }
`),
        hints: [
          'Två regler: en för body och en för h1.',
          'color på body ärvs av alla stycken.',
          'body { background-color: midnightblue; color: white; }\nh1 { color: gold; }',
        ],
        tests: [
          {
            description: 'Sidan har bakgrunden midnightblue',
            code: "colorOf('body', 'background-color')",
            expected: 'midnightblue',
          },
          {
            description: 'Styckena är vita',
            code: "colorsOf('p')",
            expected: ['white', 'white', 'white'],
          },
          {
            description: 'Rubriken är gold',
            code: "colorOf('h1')",
            expected: 'gold',
          },
        ],
      },
      {
        title: 'Typsnitten',
        why: 'Ett kraftigt typsnitt i stor storlek gör rubriken till affischens huvudperson. Text i mitten känns som en affisch och inte som en bok.',
        xp: 15,
        description: 'Nu ska rubriken bli stor och allt ställa sig i mitten.',
        task: 'Uppgift: Ge rubriken typsnittet `Impact, sans-serif` och storleken `4rem`. Ställ all text i mitten med en regel på `body`, och gör styckena `1.25rem`.',
        solution: affisch(`  body {
    background-color: midnightblue;
    color: white;
    text-align: center;
  }
  h1 {
    color: gold;
    font-family: Impact, sans-serif;
    font-size: 4rem;
  }
  p { font-size: 1.25rem; }
`),
        hints: [
          'text-align ärvs, så den kan stå på body.',
          'font-family och font-size i h1, och en ny regel för p.',
          'h1 { … font-family: Impact, sans-serif; font-size: 4rem; }\np { font-size: 1.25rem; }',
        ],
        tests: [
          {
            description:
              'Rubriken har typsnittet Impact och storleken 4rem (64px)',
            code: "[font('h1'), px('h1', 'font-size')]",
            expected: ['impact', 64],
          },
          {
            description: 'Texten står i mitten',
            code: "css('p', 'text-align')",
            expected: 'center',
          },
          {
            description: 'Styckena är 1.25rem (20px)',
            code: "px('p', 'font-size')",
            expected: 20,
          },
        ],
      },
      {
        title: 'Det viktiga sticker ut',
        why: 'Datum och pris är det besökaren letar efter. Med klasser får just de styckena egna färger, utan att resten ändras.',
        xp: 20,
        description:
          'Styckena har redan klasserna `datum` och `pris`. Använd dem.',
        task: 'Uppgift: Gör `.datum` `gold` och `1.5rem`. Ge `.pris` bakgrunden `crimson`.',
        solution: affisch(`  body {
    background-color: midnightblue;
    color: white;
    text-align: center;
  }
  h1 {
    color: gold;
    font-family: Impact, sans-serif;
    font-size: 4rem;
  }
  p { font-size: 1.25rem; }
  .datum {
    color: gold;
    font-size: 1.5rem;
  }
  .pris { background-color: crimson; }
`),
        hints: [
          'Klasserna väljs med punkt: .datum och .pris.',
          'En klass vinner över en tagg, så .datum slår regeln för p.',
          '.datum { color: gold; font-size: 1.5rem; }\n.pris { background-color: crimson; }',
        ],
        tests: [
          {
            description: 'Datumet är gold och 1.5rem (24px)',
            code: "[colorOf('.datum'), px('.datum', 'font-size')]",
            expected: ['gold', 24],
          },
          {
            description: 'Priset har bakgrunden crimson och vit text',
            code: "[colorOf('.pris', 'background-color'), colorOf('.pris')]",
            expected: ['crimson', 'white'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-kafe',
    track: 'css',
    title: 'Kaféets meny',
    reward: { emoji: '☕', name: 'Kaffekopp' },
    summary:
      'En meny för ett kafé med varma färger, priser som syns och en märkning för veganskt.',
    steps: [
      {
        title: 'Kaféets färger',
        why: 'Färgerna ger kaféet en känsla innan någon har läst ett ord. Med komma mellan h1 och h2 räcker en regel för alla rubriker.',
        xp: 15,
        description: 'Menyn finns redan som HTML. Ge den kaféets färger.',
        task: 'Uppgift: Ge `body` bakgrunden `linen`. Gör alla rubriker (`h1` och `h2`) `saddlebrown` med **en** regel.',
        starterCode: `<!-- Steg 1: kaféets färger -->
${KAFE}`,
        solution: kafe(`  body { background-color: linen; }
  h1, h2 { color: saddlebrown; }
`),
        hints: [
          'En regel för body och en för h1 och h2.',
          'Komma mellan selektorerna: h1, h2',
          'body { background-color: linen; }\nh1, h2 { color: saddlebrown; }',
        ],
        tests: [
          {
            description: 'Sidan har bakgrunden linen',
            code: "colorOf('body', 'background-color')",
            expected: 'linen',
          },
          {
            description: 'Alla rubriker är saddlebrown',
            code: "colorsOf('h1, h2')",
            expected: ['saddlebrown', 'saddlebrown', 'saddlebrown'],
          },
        ],
      },
      {
        title: 'Priser och märkning',
        why: 'Priserna har klassen pris, så alla får samma färg med en regel. Märkningen ska se ut som en liten etikett: ljus text på mörk bakgrund och lite mindre.',
        xp: 20,
        description:
          'Priserna och märkningen står i `span` med klasserna `pris` och `vegansk`.',
        task: 'Uppgift: Gör alla `.pris` `seagreen`. Ge `.vegansk` vit text, bakgrunden `olivedrab` och storleken `0.75rem`.',
        solution: kafe(`  body { background-color: linen; }
  h1, h2 { color: saddlebrown; }
  .pris { color: seagreen; }
  .vegansk {
    color: white;
    background-color: olivedrab;
    font-size: 0.75rem;
  }
`),
        hints: [
          'Två nya regler: .pris och .vegansk.',
          '0.75rem är tre fjärdedelar av den vanliga textstorleken.',
          '.pris { color: seagreen; }\n.vegansk { color: white; background-color: olivedrab; font-size: 0.75rem; }',
        ],
        tests: [
          {
            description: 'Alla priser är seagreen',
            code: "colorsOf('.pris')",
            expected: ['seagreen', 'seagreen', 'seagreen', 'seagreen'],
          },
          {
            description: 'Märkningen är vit på olivedrab och 0.75rem (12px)',
            code: "[colorOf('.vegansk'), colorOf('.vegansk', 'background-color'), px('.vegansk', 'font-size')]",
            expected: ['white', 'olivedrab', 12],
          },
        ],
      },
      {
        title: 'Typsnitt och länk',
        why: 'Ett typsnitt med klackar känns hemtrevligt, som en griffeltavla på ett kafé. Hover-färgen visar att länken går att klicka på.',
        xp: 20,
        description: 'Sista handen: kaféets namn och länken till kartan.',
        task: 'Uppgift: Ge `h1` typsnittet `Georgia, serif` och ställ den i mitten. Gör länken `sienna`, och `chocolate` när musen är över.',
        solution: kafe(`  body { background-color: linen; }
  h1, h2 { color: saddlebrown; }
  .pris { color: seagreen; }
  .vegansk {
    color: white;
    background-color: olivedrab;
    font-size: 0.75rem;
  }
  h1 {
    font-family: Georgia, serif;
    text-align: center;
  }
  a { color: sienna; }
  a:hover { color: chocolate; }
`),
        hints: [
          'En ny regel för h1, en för a och en för a:hover.',
          'h1 kan ha en egen regel fast den också står i h1, h2.',
          'a { color: sienna; }\na:hover { color: chocolate; }',
        ],
        tests: [
          {
            description:
              'Kaféets namn har typsnittet Georgia och står i mitten',
            code: "[font('h1'), css('h1', 'text-align')]",
            expected: ['georgia', 'center'],
          },
          {
            description: 'Länken är sienna',
            code: "colorOf('a')",
            expected: 'sienna',
          },
          {
            description: 'Länken blir chocolate när musen är över',
            code: "colorName(hover('a', 'color'))",
            expected: 'chocolate',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-morkt',
    track: 'css',
    title: 'Mörkt läge',
    reward: { emoji: '🌙', name: 'Måne' },
    summary:
      'Gör om en blogg till mörkt läge – skönt för ögonen på kvällen, och lite hemligt.',
    steps: [
      {
        title: 'Släck lampan',
        why: 'Helt svart med helt vit text bländar. En mycket mörk blå och en ljusgrå text är skönare för ögonen – så gör de flesta appar i mörkt läge.',
        xp: 15,
        description: 'Bloggen är ljus. Gör hela sidan mörk med ljus text.',
        task: 'Uppgift: Ge `body` bakgrunden `#111827` och texten `gainsboro`.',
        starterCode: `<!-- Steg 1: släck lampan -->
${MORKT}`,
        solution: morkt(`  body {
    background-color: #111827;
    color: gainsboro;
  }
`),
        hints: [
          'En regel för body med två egenskaper.',
          'Hexkoden skrivs med # och sex tecken.',
          'body { background-color: #111827; color: gainsboro; }',
        ],
        tests: [
          {
            description: 'Sidan har bakgrunden #111827',
            code: "colorOf('body', 'background-color')",
            expected: '#111827',
          },
          {
            description: 'Texten är gainsboro',
            code: "colorOf('p')",
            expected: 'gainsboro',
          },
        ],
      },
      {
        title: 'Rubriker som lyser',
        why: 'I mörker syns starka färger extra bra. Ingressen är en sammanfattning, så den får vara lite större men mer dämpad än resten.',
        xp: 20,
        description:
          'Rubrikerna och ingressen behöver egna färger för att synas i mörkret.',
        task: 'Uppgift: Gör `h1` `gold` och `h2` `skyblue`. Ge `.ingress` färgen `darkgray` och storleken `1.25rem`.',
        solution: morkt(`  body {
    background-color: #111827;
    color: gainsboro;
  }
  h1 { color: gold; }
  h2 { color: skyblue; }
  .ingress {
    color: darkgray;
    font-size: 1.25rem;
  }
`),
        hints: [
          'Tre nya regler: h1, h2 och .ingress.',
          '.ingress vinner över body eftersom den gäller stycket direkt.',
          'h1 { color: gold; }\nh2 { color: skyblue; }\n.ingress { color: darkgray; font-size: 1.25rem; }',
        ],
        tests: [
          {
            description: 'h1 är gold och h2 skyblue',
            code: "[colorOf('h1'), colorOf('h2')]",
            expected: ['gold', 'skyblue'],
          },
          {
            description: 'Ingressen är darkgray och 1.25rem (20px)',
            code: "[colorOf('.ingress'), px('.ingress', 'font-size')]",
            expected: ['darkgray', 20],
          },
        ],
      },
      {
        title: 'Länkar som syns i mörkret',
        why: 'Länkens vanliga blå syns knappt på mörk bakgrund. En egen färg utan streck, som blir vit vid hover, är lätt att se och visar ändå att den går att klicka på.',
        xp: 20,
        description:
          'Sist länken, som nästan försvinner mot den mörka bakgrunden.',
        task: 'Uppgift: Gör länken `violet` utan streck under. När musen är över ska den bli `white`.',
        solution: morkt(`  body {
    background-color: #111827;
    color: gainsboro;
  }
  h1 { color: gold; }
  h2 { color: skyblue; }
  .ingress {
    color: darkgray;
    font-size: 1.25rem;
  }
  a {
    color: violet;
    text-decoration: none;
  }
  a:hover { color: white; }
`),
        hints: [
          'En regel för a och en för a:hover.',
          'Strecket tas bort med text-decoration: none.',
          'a { color: violet; text-decoration: none; }\na:hover { color: white; }',
        ],
        tests: [
          {
            description: 'Länken är violet utan streck',
            code: "[colorOf('a'), css('a', 'text-decoration-line')]",
            expected: ['violet', 'none'],
          },
          {
            description: 'Länken blir vit när musen är över',
            code: "colorName(hover('a', 'color'))",
            expected: 'white',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-profilkort',
    track: 'boxen',
    title: 'Profilkortet',
    reward: { emoji: '🪪', name: 'ID-kort' },
    summary:
      'Ett profilkort som på sociala medier: en låda med luft, kant, runda hörn och en rund bild.',
    steps: [
      {
        title: 'Lådan',
        why: 'Padding ger texten luft från kanten, och en tunn ljus kant med runda hörn gör att kortet ser ut som ett kort och inte bara som text.',
        xp: 15,
        description:
          'Innehållet finns redan i ett `div` med klassen `profil`. Gör det till en låda.',
        task: 'Uppgift: Ge `.profil` vit bakgrund, `24px` padding, kanten `1px solid lightgray` och hörnen `12px`.',
        starterCode: `<!-- Steg 1: lådan -->
${PROFIL}`,
        solution: profil(`  .profil {
    background-color: white;
    padding: 24px;
    border: 1px solid lightgray;
    border-radius: 12px;
  }
`),
        hints: [
          'Fyra egenskaper i en ny regel för .profil.',
          'border har tre delar: 1px solid lightgray.',
          '.profil { background-color: white; padding: 24px; border: 1px solid lightgray; border-radius: 12px; }',
        ],
        tests: [
          {
            description: 'Kortet har vit bakgrund och 24px padding',
            code: "[colorOf('.profil', 'background-color'), px('.profil', 'padding-top')]",
            expected: ['white', 24],
          },
          {
            description: 'Kortet har en 1px lightgray kant och 12px hörn',
            code: "[px('.profil', 'border-top-width'), colorOf('.profil', 'border-top-color'), css('.profil', 'border-radius')]",
            expected: [1, 'lightgray', '12px'],
          },
        ],
      },
      {
        title: 'Rätt bredd mitt på sidan',
        why: 'Med border-box blir kortet precis så brett som det står, även med padding och kant. margin auto på sidorna ställer det i mitten.',
        xp: 20,
        description:
          'Kortet är lika brett som sidan. Gör det smalt och ställ det i mitten.',
        task: 'Uppgift: Gör kortet exakt `300px` brett med padding och kant. Ge det `margin: 40px auto` så att det står mitt på sidan med luft ovanför.',
        solution: profil(`  .profil {
    background-color: white;
    padding: 24px;
    border: 1px solid lightgray;
    border-radius: 12px;
    box-sizing: border-box;
    width: 300px;
    margin: 40px auto;
  }
`),
        hints: [
          'box-sizing: border-box gör att width räknar med padding och kant.',
          'margin: 40px auto ger 40px uppe och nere och auto på sidorna.',
          'box-sizing: border-box;\nwidth: 300px;\nmargin: 40px auto;',
        ],
        tests: [
          {
            description: 'Kortet är 300px brett med padding och kant',
            code: "boxWidth('.profil')",
            expected: 300,
          },
          {
            description: 'Kortet står mitt på sidan med 40px luft ovanför',
            code: "[centered('.profil'), px('.profil', 'margin-top')]",
            expected: [true, 40],
          },
        ],
      },
      {
        title: 'Bilden och texten',
        why: 'En rund profilbild är något alla känner igen. Text i mitten passar ett smalt kort, och rollen i grått blir en undertitel som inte tar över.',
        xp: 20,
        description: 'Sist bilden och texten.',
        task: 'Uppgift: Gör bilden rund med `border-radius: 50%`. Ställ texten i kortet i mitten och gör `.roll` `gray`.',
        solution: profil(`  .profil {
    background-color: white;
    padding: 24px;
    border: 1px solid lightgray;
    border-radius: 12px;
    box-sizing: border-box;
    width: 300px;
    margin: 40px auto;
    text-align: center;
  }
  .profil img { border-radius: 50%; }
  .roll { color: gray; }
`),
        hints: [
          'text-align: center i .profil, och två nya regler.',
          '.profil img väljer bilden inuti kortet.',
          '.profil img { border-radius: 50%; }\n.roll { color: gray; }',
        ],
        tests: [
          {
            description: 'Bilden har hörnen 50%',
            code: "css('.profil img', 'border-radius')",
            expected: '50%',
          },
          {
            description: 'Texten i kortet står i mitten',
            code: "css('.profil h2', 'text-align')",
            expected: 'center',
          },
          {
            description: 'Rollen är gray',
            code: "colorOf('.roll')",
            expected: 'gray',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-knappar',
    track: 'boxen',
    title: 'Knapparna',
    reward: { emoji: '🔘', name: 'Knapp' },
    summary:
      'Två knappar som på en riktig sajt: en fylld huvudknapp och en med bara kant.',
    steps: [
      {
        title: 'En riktig knapp',
        why: 'En länk är inline och står i texten. Med inline-block blir den en riktig låda, så att padding och runda hörn fungerar som på en knapp.',
        xp: 15,
        description:
          'Två länkar har klassen `knapp`. Få dem att se ut som knappar.',
        task: 'Uppgift: Gör `.knapp` till `inline-block` med padding `12px 24px`, bakgrunden `royalblue`, vit text och hörnen `8px`.',
        starterCode: `<!-- Steg 1: en riktig knapp -->
${KNAPPAR}`,
        solution: knappar(`  .knapp {
    display: inline-block;
    padding: 12px 24px;
    background-color: royalblue;
    color: white;
    border-radius: 8px;
  }
`),
        hints: [
          'Fem egenskaper i en regel för .knapp.',
          'display: inline-block gör länken till en låda.',
          '.knapp { display: inline-block; padding: 12px 24px; background-color: royalblue; color: white; border-radius: 8px; }',
        ],
        tests: [
          {
            description: 'Knappen är inline-block med padding 12px 24px',
            code: "[css('.knapp', 'display'), px('.knapp', 'padding-top'), px('.knapp', 'padding-left')]",
            expected: ['inline-block', 12, 24],
          },
          {
            description: 'Knappen är vit på royalblue med 8px hörn',
            code: "[colorOf('.knapp'), colorOf('.knapp', 'background-color'), css('.knapp', 'border-radius')]",
            expected: ['white', 'royalblue', '8px'],
          },
        ],
      },
      {
        title: 'Utan streck och med hover',
        why: 'Strecket under är till för länkar i text. På en knapp stör det. Att knappen blir mörkare under musen visar att den går att trycka på.',
        xp: 15,
        description:
          'Knapparna har fortfarande streck under, och ingenting händer när musen är över.',
        task: 'Uppgift: Ta bort strecket under `.knapp`. Ge den bakgrunden `navy` när musen är över.',
        solution: knappar(`  .knapp {
    display: inline-block;
    padding: 12px 24px;
    background-color: royalblue;
    color: white;
    border-radius: 8px;
    text-decoration: none;
  }
  .knapp:hover { background-color: navy; }
`),
        hints: [
          'text-decoration i .knapp och en ny regel med :hover.',
          'Hover-regeln ändrar bara background-color.',
          'text-decoration: none;\n.knapp:hover { background-color: navy; }',
        ],
        tests: [
          {
            description: 'Knappen har inget streck under',
            code: "css('.knapp', 'text-decoration-line')",
            expected: 'none',
          },
          {
            description: 'Knappen blir navy när musen är över',
            code: "colorName(hover('.knapp', 'background-color'))",
            expected: 'navy',
          },
        ],
      },
      {
        title: 'Den andra knappen',
        why: 'Den viktigaste knappen ska synas mest. Den andra får bara en kant, så att man förstår vilken man ska trycka på. Regeln står sist och vinner därför över .knapp.',
        xp: 20,
        description:
          'Avbryt-knappen har också klassen `knapp-andra`. Den ska se mindre viktig ut.',
        task: 'Uppgift: Ge `.knapp-andra` vit bakgrund, texten `royalblue` och kanten `2px solid royalblue`. Skriv regeln efter `.knapp`.',
        solution: knappar(`  .knapp {
    display: inline-block;
    padding: 12px 24px;
    background-color: royalblue;
    color: white;
    border-radius: 8px;
    text-decoration: none;
  }
  .knapp:hover { background-color: navy; }
  .knapp-andra {
    background-color: white;
    color: royalblue;
    border: 2px solid royalblue;
  }
`),
        hints: [
          'En ny regel för .knapp-andra, sist i <style>.',
          'Två lika starka regler: den som står sist vinner.',
          '.knapp-andra { background-color: white; color: royalblue; border: 2px solid royalblue; }',
        ],
        tests: [
          {
            description: 'Andra knappen är royalblue på vitt',
            code: "[colorOf('.knapp-andra'), colorOf('.knapp-andra', 'background-color')]",
            expected: ['royalblue', 'white'],
          },
          {
            description: 'Andra knappen har en 2px royalblue kant',
            code: "[px('.knapp-andra', 'border-top-width'), colorOf('.knapp-andra', 'border-top-color')]",
            expected: [2, 'royalblue'],
          },
          {
            description: 'Första knappen är fortfarande royalblue',
            code: "colorOf('.knapp', 'background-color')",
            expected: 'royalblue',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-lappar',
    track: 'boxen',
    title: 'Anteckningslapparna',
    reward: { emoji: '🗒️', name: 'Anteckningsblock' },
    summary:
      'En att göra-lista som gula lappar, med en färgad kant på den viktigaste.',
    steps: [
      {
        title: 'Lappar med luft',
        why: 'Padding ger texten luft inuti lappen och margin ger luft mellan lapparna. Utan dem blir det en enda gul klump.',
        xp: 15,
        description: 'Varje sak att göra står i ett `div` med klassen `lapp`.',
        task: 'Uppgift: Ge `.lapp` bakgrunden `lightyellow`, `16px` padding och `12px` margin under.',
        starterCode: `<!-- Steg 1: lappar med luft -->
${LAPPAR}`,
        solution: lappar(`  .lapp {
    background-color: lightyellow;
    padding: 16px;
    margin-bottom: 12px;
  }
`),
        hints: [
          'En regel för .lapp med tre egenskaper.',
          'Luften under är margin-bottom.',
          '.lapp { background-color: lightyellow; padding: 16px; margin-bottom: 12px; }',
        ],
        tests: [
          {
            description: 'Alla lappar är lightyellow',
            code: "colorsOf('.lapp', 'background-color')",
            expected: ['lightyellow', 'lightyellow', 'lightyellow'],
          },
          {
            description: 'Lapparna har 16px padding och 12px margin under',
            code: "[px('.lapp', 'padding-top'), px('.lapp', 'margin-bottom')]",
            expected: [16, 12],
          },
        ],
      },
      {
        title: 'En kant som markerar',
        why: 'En tjock kant på bara ena sidan är ett vanligt sätt att markera något. Den viktiga lappen har två klasser, så en egen regel kan byta bara färgen.',
        xp: 20,
        description:
          'Ge lapparna en kant till vänster, och den viktiga en egen färg.',
        task: 'Uppgift: Ge `.lapp` kanten `6px solid gold` bara till vänster. Ge `.viktig` kantfärgen `crimson` med `border-left-color`.',
        solution: lappar(`  .lapp {
    background-color: lightyellow;
    padding: 16px;
    margin-bottom: 12px;
    border-left: 6px solid gold;
  }
  .viktig { border-left-color: crimson; }
`),
        hints: [
          'Kanten till vänster heter border-left.',
          '.viktig står efter .lapp och vinner därför.',
          'border-left: 6px solid gold;\n.viktig { border-left-color: crimson; }',
        ],
        tests: [
          {
            description: 'Lapparna har en 6px gold kant till vänster',
            code: "[px('.lapp', 'border-left-width'), colorOf('.lapp', 'border-left-color')]",
            expected: [6, 'gold'],
          },
          {
            description: 'Ingen kant ovanför',
            code: "px('.lapp', 'border-top-width')",
            expected: 0,
          },
          {
            description: 'Den viktiga lappen har en crimson kant',
            code: "colorOf('.viktig', 'border-left-color')",
            expected: 'crimson',
          },
        ],
      },
      {
        title: 'Samla lapparna i mitten',
        why: 'body är också en låda. Med max-width och margin auto på body hamnar hela sidan i en spalt i mitten, utan att du behöver ändra någon HTML.',
        xp: 20,
        description:
          'På en bred skärm blir lapparna jättelånga. Samla dem i en spalt.',
        task: 'Uppgift: Ge `body` en högsta bredd på `400px` och ställ den mitt på sidan med `margin: 0 auto`. Ställ rubriken i mitten.',
        solution: lappar(`  body {
    max-width: 400px;
    margin: 0 auto;
  }
  h1 { text-align: center; }
  .lapp {
    background-color: lightyellow;
    padding: 16px;
    margin-bottom: 12px;
    border-left: 6px solid gold;
  }
  .viktig { border-left-color: crimson; }
`),
        hints: [
          'En ny regel för body och en för h1.',
          'max-width: 400px och margin: 0 auto.',
          'body { max-width: 400px; margin: 0 auto; }\nh1 { text-align: center; }',
        ],
        tests: [
          {
            description: 'Sidan är högst 400px bred',
            code: "px('body', 'max-width')",
            expected: 400,
          },
          {
            description: 'Sidan står i mitten',
            code: "centered('body')",
            expected: true,
          },
          {
            description: 'Rubriken står i mitten',
            code: "css('h1', 'text-align')",
            expected: 'center',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-navmeny',
    track: 'flexbox',
    title: 'Navigeringsmenyn',
    reward: { emoji: '🗺️', name: 'Karta' },
    summary:
      'En meny som på en riktig sajt: loggan till vänster och länkarna till höger.',
    steps: [
      {
        title: 'Länkarna på rad',
        why: 'En meny är en lista med länkar, så den skrivs med ul. Men punkterna och listans egen luft passar inte i en meny – de tas bort, och flexbox lägger länkarna på rad.',
        xp: 15,
        description:
          'Länkarna står i en lista, under varandra och med punkter. Lägg dem på en rad.',
        task: 'Uppgift: Gör `.lankar` till en flexbox med `24px` gap. Ta bort punkterna med `list-style: none`, och listans luft med `margin: 0` och `padding: 0`.',
        starterCode: `<!-- Steg 1: länkarna på rad -->
${NAVMENY}`,
        solution: navmeny(`  .lankar {
    display: flex;
    gap: 24px;
    list-style: none;
    margin: 0;
    padding: 0;
  }
`),
        hints: [
          'Allt står i en regel för .lankar, listan.',
          'display, gap, list-style, margin och padding.',
          '.lankar { display: flex; gap: 24px; list-style: none; margin: 0; padding: 0; }',
        ],
        tests: [
          {
            description: 'Länkarna står på en rad med 24px emellan',
            code: "[rows('.lankar li'), gapX('.lankar li')]",
            expected: [1, 24],
          },
          {
            description: 'Listan har inga punkter och ingen egen luft',
            code: "[css('.lankar', 'list-style-type'), px('.lankar', 'padding-left'), px('.lankar', 'margin-top')]",
            expected: ['none', 0, 0],
          },
        ],
      },
      {
        title: 'Loggan och menyn',
        why: 'Den yttre flexboxen har bara två barn: loggan och listan. space-between skjuter dem till var sin kant, oavsett hur bred skärmen är.',
        xp: 20,
        description:
          'Loggan står ovanför länkarna. Den ska stå till vänster och länkarna till höger, på en mörkgrön rad.',
        task: 'Uppgift: Gör `.meny` till en flexbox med `space-between` och `align-items: center`. Ge den bakgrunden `darkgreen` och padding `12px 24px`.',
        solution: navmeny(`  .lankar {
    display: flex;
    gap: 24px;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .meny {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: darkgreen;
    padding: 12px 24px;
  }
`),
        hints: [
          'En ny regel för .meny.',
          'justify-content: space-between och align-items: center.',
          '.meny { display: flex; justify-content: space-between; align-items: center; background-color: darkgreen; padding: 12px 24px; }',
        ],
        tests: [
          {
            description: 'Loggan och länkarna står på en rad',
            code: "rows('.meny > *')",
            expected: 1,
          },
          {
            description: 'Länkarna står ända ut till höger, innanför paddingen',
            code: "Math.abs(rect('.meny').left + rect('.meny').width - 24 - rect('.lankar li:last-child').left - rect('.lankar li:last-child').width) <= 1",
            expected: true,
          },
          {
            description: 'Menyn är darkgreen med padding 12px 24px',
            code: "[colorOf('.meny', 'background-color'), px('.meny', 'padding-top'), px('.meny', 'padding-left')]",
            expected: ['darkgreen', 12, 24],
          },
        ],
      },
      {
        title: 'Vita länkar med hover',
        why: 'Blå länkar syns dåligt på grönt. Vita länkar utan streck ser ut som en meny, och en bakgrund under musen visar vilken länk man är på väg att trycka på.',
        xp: 20,
        description:
          'Länkarna är fortfarande blå och understrukna. Gör dem vita, och låt dem lysa upp när musen är över.',
        task: 'Uppgift: Gör alla länkar i `.meny` vita utan streck. Ge länkarna i `.lankar` padding `8px 12px` och hörnen `6px`, och bakgrunden `seagreen` när musen är över.',
        solution: navmeny(`  .lankar {
    display: flex;
    gap: 24px;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .meny {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: darkgreen;
    padding: 12px 24px;
  }
  .meny a {
    color: white;
    text-decoration: none;
  }
  .lankar a {
    padding: 8px 12px;
    border-radius: 6px;
  }
  .lankar a:hover {
    background-color: seagreen;
  }
`),
        hints: [
          'Tre nya regler: .meny a, .lankar a och .lankar a:hover.',
          'color och text-decoration i den första, padding och border-radius i den andra.',
          '.lankar a:hover { background-color: seagreen; }',
        ],
        tests: [
          {
            description: 'Alla länkar är vita utan streck',
            code: "[colorsOf('.meny a'), css('.lankar a', 'text-decoration-line')]",
            expected: [['white', 'white', 'white', 'white'], 'none'],
          },
          {
            description: 'Länkarna har padding 8px 12px och 6px hörn',
            code: "[px('.lankar a', 'padding-top'), px('.lankar a', 'padding-left'), css('.lankar a', 'border-radius')]",
            expected: [8, 12, '6px'],
          },
          {
            description: 'Länkarna blir seagreen när musen är över',
            code: "colorName(hover('.lankar a', 'background-color'))",
            expected: 'seagreen',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-kortrad',
    track: 'flexbox',
    title: 'Kortraden',
    reward: { emoji: '🎴', name: 'Spelkort' },
    summary:
      'Lika breda kort i rader, med knappen längst ner på varje kort – som på en riktig sajt.',
    steps: [
      {
        title: 'Lika breda kort',
        why: 'flex: 1 på alla kort gör att de delar raden lika, hur bred skärmen än är. Du behöver aldrig räkna ut bredden själv.',
        xp: 15,
        description:
          'Fyra boktips står under varandra. Lägg dem bredvid varandra, lika breda.',
        task: 'Uppgift: Gör `.hylla` till en flexbox med `16px` gap. Ge `.bok` `flex: 1`, bakgrunden `linen`, padding `16px` och hörnen `8px`.',
        starterCode: `<!-- Steg 1: lika breda kort -->
${KORTRAD}`,
        solution: kortrad(`  .hylla {
    display: flex;
    gap: 16px;
  }
  .bok {
    flex: 1;
    background-color: linen;
    padding: 16px;
    border-radius: 8px;
  }
`),
        hints: [
          'En regel för .hylla och en för .bok.',
          'flex: 1 står på varje kort, gap på hyllan.',
          '.hylla { display: flex; gap: 16px; }\n.bok { flex: 1; background-color: linen; padding: 16px; border-radius: 8px; }',
        ],
        tests: [
          {
            description: 'Korten står på en rad med 16px emellan',
            code: "[rows('.bok'), gapX('.bok')]",
            expected: [1, 16],
          },
          {
            description: 'Alla kort är lika breda',
            code: "new Set(widths('.bok')).size",
            expected: 1,
          },
          {
            description: 'Korten är linen med 16px padding och 8px hörn',
            code: "[colorOf('.bok', 'background-color'), px('.bok', 'padding-top'), css('.bok', 'border-radius')]",
            expected: ['linen', 16, '8px'],
          },
        ],
      },
      {
        title: 'Nya rader',
        why: 'Fyra kort får plats på en dator men blir för smala på mindre skärmar. Med min-width och flex-wrap hoppar ett kort ner på nästa rad hellre än att bli för smalt.',
        xp: 20,
        description:
          'Korten är ganska smala. De ska vara minst 200 pixlar breda och hellre gå vidare på en ny rad.',
        task: 'Uppgift: Ge `.hylla` `flex-wrap: wrap` och `.bok` `min-width: 200px`.',
        solution: kortrad(`  .hylla {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  .bok {
    flex: 1;
    min-width: 200px;
    background-color: linen;
    padding: 16px;
    border-radius: 8px;
  }
`),
        hints: [
          'En rad i varje regel.',
          'flex-wrap på hyllan, min-width på korten.',
          'flex-wrap: wrap; och min-width: 200px;',
        ],
        tests: [
          {
            description: 'Tre kort på första raden och ett på nästa',
            code: "[perRow('.bok'), rows('.bok')]",
            expected: [3, 2],
          },
          {
            description: 'Det är 16px mellan raderna',
            code: "gapY('.bok')",
            expected: 16,
          },
        ],
      },
      {
        title: 'Knappen längst ner',
        why: 'Korten har olika mycket text, så knapparna hamnar på olika höjd och det ser stökigt ut. Ett kort som också är en flexbox nedåt kan skjuta knappen till botten med margin-top: auto – auto tar all luft som blir över.',
        xp: 20,
        description:
          'Läs mer-länkarna står på olika höjd. De ska bli knappar som alla står längst ner i sina kort.',
        task: 'Uppgift: Gör `.bok` till en flexbox med `flex-direction: column`. Ge `.las` `margin-top: auto`, bakgrunden `teal`, vit text utan streck, padding `8px`, hörnen `6px` och texten i mitten.',
        solution: kortrad(`  .hylla {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  .bok {
    flex: 1;
    min-width: 200px;
    display: flex;
    flex-direction: column;
    background-color: linen;
    padding: 16px;
    border-radius: 8px;
  }
  .las {
    margin-top: auto;
    background-color: teal;
    color: white;
    text-decoration: none;
    padding: 8px;
    border-radius: 6px;
    text-align: center;
  }
`),
        hints: [
          'Två nya rader i .bok och en ny regel för .las.',
          'margin-top: auto skjuter knappen så långt ner det går.',
          '.bok: display: flex; flex-direction: column;\n.las { margin-top: auto; background-color: teal; color: white; … }',
        ],
        tests: [
          {
            description: 'Korten är flexboxar nedåt',
            code: "[css('.bok', 'display'), css('.bok', 'flex-direction')]",
            expected: ['flex', 'column'],
          },
          {
            description: 'Knapparna på första raden står på samma höjd',
            code: "new Set([1, 2, 3].map(n => rect('.bok:nth-child(' + n + ') .las').top)).size",
            expected: 1,
          },
          {
            description: 'Knapparna är teal med vit text i mitten',
            code: "[colorOf('.las', 'background-color'), colorOf('.las'), css('.las', 'text-align'), css('.las', 'text-decoration-line')]",
            expected: ['teal', 'white', 'center', 'none'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-chatt',
    track: 'flexbox',
    title: 'Chattbubblorna',
    reward: { emoji: '💬', name: 'Pratbubbla' },
    summary:
      'En chatt som i mobilen: kompisens bubblor till vänster och dina till höger.',
    steps: [
      {
        title: 'Bubblorna',
        why: 'En flexbox nedåt med gap ger jämn luft mellan meddelandena. margin: 0 tar bort styckenas egen luft, så att bara gap bestämmer.',
        xp: 15,
        description:
          'Meddelandena är vanliga stycken. Gör dem till bubblor i en smal chatt.',
        task: 'Uppgift: Gör `.chatt` till en flexbox nedåt med `8px` gap och bredden `320px`. Ge styckena i chatten `margin: 0`, padding `8px 12px`, hörnen `16px` och bakgrunden `gainsboro`.',
        starterCode: `<!-- Steg 1: bubblorna -->
${CHATT}`,
        solution: chatt(`  .chatt {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 320px;
  }
  .chatt p {
    margin: 0;
    padding: 8px 12px;
    border-radius: 16px;
    background-color: gainsboro;
  }
`),
        hints: [
          'En regel för .chatt och en för .chatt p.',
          'flex-direction: column gör att flexboxen går nedåt.',
          '.chatt { display: flex; flex-direction: column; gap: 8px; width: 320px; }',
        ],
        tests: [
          {
            description: 'Chatten är 320px bred, med bubblorna under varandra',
            code: "[widths('.chatt')[0], rows('.chatt p')]",
            expected: [320, 4],
          },
          {
            description: 'Det är 8px mellan bubblorna',
            code: "gapY('.chatt p')",
            expected: 8,
          },
          {
            description: 'Bubblorna är gainsboro med 16px hörn',
            code: "[colorOf('.chatt p', 'background-color'), css('.chatt p', 'border-radius')]",
            expected: ['gainsboro', '16px'],
          },
        ],
      },
      {
        title: 'Lagom breda',
        why: 'I en flexbox sträcks barnen ut på tvären – align-items: stretch är det vanliga. Med flex-start blir varje bubbla bara så bred som sin text.',
        xp: 15,
        description:
          'Alla bubblor är lika breda som chatten, även de korta. De ska bara vara så breda som texten.',
        task: 'Uppgift: Ge `.chatt` `align-items: flex-start`.',
        solution: chatt(`  .chatt {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    width: 320px;
  }
  .chatt p {
    margin: 0;
    padding: 8px 12px;
    border-radius: 16px;
    background-color: gainsboro;
  }
`),
        hints: [
          'En ny rad i regeln för .chatt.',
          'När flexboxen går nedåt gäller align-items åt sidan.',
          'align-items: flex-start;',
        ],
        tests: [
          {
            description: 'Alla bubblor är smalare än chatten',
            code: "widths('.chatt p').every(width => width < 320)",
            expected: true,
          },
        ],
      },
      {
        title: 'Mina till höger',
        why: 'align-self gör samma sak som align-items, men bara för ett element. Så kan dina bubblor stå till höger medan kompisens står kvar till vänster.',
        xp: 20,
        description:
          'Alla bubblor står till vänster. Dina egna, `.mig`, ska stå till höger och vara blå.',
        task: 'Uppgift: Ge dina bubblor `align-self: flex-end`, bakgrunden `dodgerblue` och vit text. Skriv selektorn `.chatt .mig`, så att den vinner över `.chatt p`.',
        solution: chatt(`  .chatt {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    width: 320px;
  }
  .chatt p {
    margin: 0;
    padding: 8px 12px;
    border-radius: 16px;
    background-color: gainsboro;
  }
  .chatt .mig {
    align-self: flex-end;
    background-color: dodgerblue;
    color: white;
  }
`),
        hints: [
          '.chatt p har en klass och en tagg och vinner över bara .mig. .chatt .mig har två klasser och vinner.',
          'align-self: flex-end skjuter bubblan till höger.',
          '.chatt .mig { align-self: flex-end; background-color: dodgerblue; color: white; }',
        ],
        tests: [
          {
            description: 'Dina bubblor står till höger',
            code: "Math.abs(rect('.mig').left + rect('.mig').width - rect('.chatt').left - rect('.chatt').width) <= 1",
            expected: true,
          },
          {
            description: 'Kompisens bubblor står kvar till vänster',
            code: "rect('.kompis').left === rect('.chatt').left",
            expected: true,
          },
          {
            description: 'Dina bubblor är dodgerblue med vit text',
            code: "[colorOf('.mig', 'background-color'), colorOf('.mig')]",
            expected: ['dodgerblue', 'white'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-galleri',
    track: 'grid',
    title: 'Fotogalleriet',
    reward: { emoji: '🎞️', name: 'Filmrulle' },
    summary:
      'Ett galleri från sommarlovet med en stor bild, små bilder och en panoramabild.',
    steps: [
      {
        title: 'Rutnätet',
        why: 'figure är taggen för en bild med bildtext, men den har stor egen margin. Med margin: 0 bestämmer gap all luft i galleriet.',
        xp: 15,
        description:
          'Bilderna från sommarlovet står under varandra. Lägg dem i ett rutnät.',
        task: 'Uppgift: Gör `.galleri` till ett grid med tre lika breda kolumner och `12px` gap. Ge `figure` `margin: 0` och bakgrunden `azure`, och `.bild` storleken `3rem` och texten i mitten.',
        starterCode: `<!-- Steg 1: rutnätet -->
${GALLERI}`,
        solution: galleri(`  .galleri {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  figure {
    margin: 0;
    background-color: azure;
  }
  .bild {
    font-size: 3rem;
    text-align: center;
  }
`),
        hints: [
          'Tre regler: .galleri, figure och .bild.',
          'repeat(3, 1fr) ger tre lika breda kolumner.',
          '.galleri { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }',
        ],
        tests: [
          {
            description: 'Bilderna står i tre kolumner och två rader',
            code: "[perRow('figure'), rows('figure')]",
            expected: [3, 2],
          },
          {
            description: 'Det är 12px mellan bilderna',
            code: "[gapX('figure'), gapY('figure')]",
            expected: [12, 12],
          },
          {
            description: 'Bilderna har ingen egen margin',
            code: "px('figure', 'margin-left')",
            expected: 0,
          },
        ],
      },
      {
        title: 'Den stora bilden',
        why: 'Tältet är sommarens bästa bild och får fyra rutor. Med fasta radhöjder blir den exakt lika hög som två små bilder plus gap.',
        xp: 20,
        description:
          'Tältet ska vara störst: två kolumner brett och två rader högt.',
        task: 'Uppgift: Ge `.galleri` `grid-auto-rows: 120px`. Låt `.stor` sträcka sig över två kolumner och två rader.',
        solution: galleri(`  .galleri {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 120px;
    gap: 12px;
  }
  figure {
    margin: 0;
    background-color: azure;
  }
  .bild {
    font-size: 3rem;
    text-align: center;
  }
  .stor {
    grid-column: span 2;
    grid-row: span 2;
  }
`),
        hints: [
          'grid-auto-rows på .galleri och en ny regel för .stor.',
          'span 2 både för grid-column och grid-row.',
          '.stor { grid-column: span 2; grid-row: span 2; }',
        ],
        tests: [
          {
            description: 'Den stora bilden är två rader hög (120 + 12 + 120)',
            code: "heights('.stor')[0]",
            expected: 252,
          },
          {
            description: 'Den stora bilden är två kolumner bred',
            code: "Math.abs(widths('.stor')[0] - 2 * widths('figure:nth-child(2)')[0] - 12) <= 1",
            expected: true,
          },
        ],
      },
      {
        title: 'Panoramabilden',
        why: 'Linjerna i ett grid har nummer, och -1 är alltid den sista. 1 / -1 betyder från första till sista linjen – hela bredden, hur många kolumner det än blir.',
        xp: 20,
        description:
          'Solnedgången är en panoramabild. Den ska gå över hela galleriets bredd.',
        task: 'Uppgift: Ge `.panorama` `grid-column: 1 / -1`.',
        solution: galleri(`  .galleri {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 120px;
    gap: 12px;
  }
  figure {
    margin: 0;
    background-color: azure;
  }
  .bild {
    font-size: 3rem;
    text-align: center;
  }
  .stor {
    grid-column: span 2;
    grid-row: span 2;
  }
  .panorama {
    grid-column: 1 / -1;
  }
`),
        hints: [
          'En ny regel för .panorama.',
          'Från linje 1 till linje -1, med snedstreck emellan.',
          '.panorama { grid-column: 1 / -1; }',
        ],
        tests: [
          {
            description: 'Panoramabilden går över hela bredden',
            code: "widths('.panorama')[0] === widths('.galleri')[0]",
            expected: true,
          },
          {
            description: 'Den står sist, på en egen rad',
            code: "inOrder('figure').at(-1)",
            expected: '🌅Solnedgången över sjön',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-panel',
    track: 'grid',
    title: 'Instrumentpanelen',
    reward: { emoji: '🎛️', name: 'Reglage' },
    summary:
      'En panel över din dag med fyra siffror, ett stort diagram och en lista.',
    steps: [
      {
        title: 'Fyra rutor',
        why: 'En panel har många lika stora rutor. Ett grid med fyra kolumner lägger dem i rader av sig själv, och samma regel ger alla rutor samma utseende.',
        xp: 15,
        description:
          'Rutorna i panelen står under varandra. Lägg dem i fyra kolumner.',
        task: 'Uppgift: Gör `.panel` till ett grid med fyra lika breda kolumner och `16px` gap. Ge alla `div` i panelen vit bakgrund, padding `16px` och hörnen `12px`. Ge `body` bakgrunden `aliceblue`.',
        starterCode: `<!-- Steg 1: fyra rutor -->
${PANEL}`,
        solution: panel(`  body {
    background-color: aliceblue;
  }
  .panel {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  .panel > div {
    background-color: white;
    padding: 16px;
    border-radius: 12px;
  }
`),
        hints: [
          'Tre regler: body, .panel och .panel > div.',
          'repeat(4, 1fr) ger fyra lika breda kolumner.',
          '.panel { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }',
        ],
        tests: [
          {
            description: 'Siffrorna står på en rad med 16px emellan',
            code: "[perRow('.siffra'), rows('.siffra'), gapX('.siffra')]",
            expected: [4, 1, 16],
          },
          {
            description: 'Rutorna är vita med 16px padding och 12px hörn',
            code: "[colorOf('.siffra', 'background-color'), px('.siffra', 'padding-top'), css('.siffra', 'border-radius')]",
            expected: ['white', 16, '12px'],
          },
          {
            description: 'Sidan är aliceblue',
            code: "colorOf('body', 'background-color')",
            expected: 'aliceblue',
          },
        ],
      },
      {
        title: 'Det stora diagrammet',
        why: 'Diagrammet behöver plats. Tre kolumner för diagrammet och en för listan fyller raden exakt – griddet räknar ut bredden.',
        xp: 20,
        description:
          'Diagrammet är lika litet som siffrorna. Det ska ta tre kolumner, och listan den sista.',
        task: 'Uppgift: Låt `.diagram` sträcka sig över tre kolumner.',
        solution: panel(`  body {
    background-color: aliceblue;
  }
  .panel {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  .panel > div {
    background-color: white;
    padding: 16px;
    border-radius: 12px;
  }
  .diagram {
    grid-column: span 3;
  }
`),
        hints: [
          'En ny regel för .diagram.',
          'span med antalet kolumner.',
          '.diagram { grid-column: span 3; }',
        ],
        tests: [
          {
            description: 'Diagrammet och listan står på andra raden',
            code: "[rows('.panel > div'), inOrder('.diagram, .lista').length]",
            expected: [2, 2],
          },
          {
            description: 'Diagrammet är tre kolumner brett',
            code: "Math.abs(widths('.diagram')[0] - 3 * widths('.siffra')[0] - 32) <= 1",
            expected: true,
          },
        ],
      },
      {
        title: 'Siffrorna i mitten',
        why: 'En ruta i ett grid kan själv vara en flexbox. Nedåt med align-items: center hamnar talet ovanför ordet, båda i mitten.',
        xp: 20,
        description:
          'Talen står på samma rad som orden. Talet ska stå stort ovanför, och båda i mitten av rutan.',
        task: 'Uppgift: Gör `.siffra` till en flexbox nedåt med `align-items: center`. Ge `.tal` storleken `2rem` och fet stil.',
        solution: panel(`  body {
    background-color: aliceblue;
  }
  .panel {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  .panel > div {
    background-color: white;
    padding: 16px;
    border-radius: 12px;
  }
  .diagram {
    grid-column: span 3;
  }
  .siffra {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .tal {
    font-size: 2rem;
    font-weight: bold;
  }
`),
        hints: [
          'En regel för .siffra och en för .tal.',
          'display: flex; flex-direction: column; align-items: center;',
          '.tal { font-size: 2rem; font-weight: bold; }',
        ],
        tests: [
          {
            description: 'Talet står i mitten av rutan',
            code: "[css('.siffra', 'flex-direction'), Math.abs(rect('.tal').left - rect('.siffra').left - (rect('.siffra').left + rect('.siffra').width - rect('.tal').left - rect('.tal').width)) <= 1]",
            expected: ['column', true],
          },
          {
            description: 'Talet är 32px och fett',
            code: "[px('.tal', 'font-size'), css('.tal', 'font-weight')]",
            expected: [32, '700'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-veckoschema',
    track: 'grid',
    title: 'Skolveckan',
    reward: { emoji: '🗓️', name: 'Väggkalender' },
    summary:
      'Ett skolschema med dagar, tider, en dubbellektion och en rast över hela veckan.',
    steps: [
      {
        title: 'Dagar och tider',
        why: 'Tiderna behöver inte lika mycket plats som lektionerna. En fast kolumn först och fem lika breda efter går att skriva på en rad med repeat.',
        xp: 15,
        description:
          'Schemat är en lång rad rutor. Gör det till en tabell med tider till vänster och fem dagar.',
        task: 'Uppgift: Gör `.schema` till ett grid med kolumnerna `80px repeat(5, 1fr)` och `4px` gap. Ge alla `div` i schemat bakgrunden `white` och padding `8px`, och `.dag` och `.tid` fet stil. Ge `.schema` bakgrunden `lightgray`.',
        starterCode: `<!-- Steg 1: dagar och tider -->
${SCHEMA}`,
        solution: schema(`  .schema {
    display: grid;
    grid-template-columns: 80px repeat(5, 1fr);
    gap: 4px;
    background-color: lightgray;
  }
  .schema div {
    background-color: white;
    padding: 8px;
  }
  .dag,
  .tid {
    font-weight: bold;
  }
`),
        hints: [
          'Tre regler: .schema, .schema div och .dag, .tid.',
          'Först 80px för tiderna, sedan repeat(5, 1fr) för dagarna.',
          'grid-template-columns: 80px repeat(5, 1fr);',
        ],
        tests: [
          {
            description: 'Schemat har sex kolumner',
            code: "perRow('.schema > div')",
            expected: 6,
          },
          {
            description: 'Tidskolumnen är 80px och dagarna lika breda',
            code: "[widths('.tid')[0], new Set(widths('.dag')).size]",
            expected: [80, 1],
          },
          {
            description: 'Dagarna och tiderna är feta',
            code: "[css('.dag', 'font-weight'), css('.tid', 'font-weight')]",
            expected: ['700', '700'],
          },
        ],
      },
      {
        title: 'Dubbellektionen',
        why: 'Idrott är två timmar i rad. Med fasta radhöjder och grid-row: span 2 blir rutan exakt två lektioner hög – och lektionerna efter flyttar sig själva.',
        xp: 20,
        description:
          'Idrotten på onsdag är en dubbellektion. Rutan ska vara två rader hög.',
        task: 'Uppgift: Ge `.schema` `grid-auto-rows: 48px`. Låt `.dubbel` sträcka sig över två rader och ge den bakgrunden `palegreen`.',
        solution: schema(`  .schema {
    display: grid;
    grid-template-columns: 80px repeat(5, 1fr);
    grid-auto-rows: 48px;
    gap: 4px;
    background-color: lightgray;
  }
  .schema div {
    background-color: white;
    padding: 8px;
  }
  .dag,
  .tid {
    font-weight: bold;
  }
  .schema .dubbel {
    grid-row: span 2;
    background-color: palegreen;
  }
`),
        hints: [
          'grid-auto-rows på .schema och en ny regel för dubbellektionen.',
          '.schema div ger alla rutor vit bakgrund. Skriv .schema .dubbel, så att den nya regeln vinner.',
          '.schema .dubbel { grid-row: span 2; background-color: palegreen; }',
        ],
        tests: [
          {
            description: 'Idrotten är två rader hög (48 + 4 + 48)',
            code: "heights('.dubbel')[0]",
            expected: 100,
          },
          {
            description: 'Idrotten är palegreen',
            code: "colorOf('.dubbel', 'background-color')",
            expected: 'palegreen',
          },
        ],
      },
      {
        title: 'Rasten',
        why: 'Rasten gäller alla dagar. grid-column: 2 / -1 börjar efter tidskolumnen och går till sista linjen, så rutan täcker hela veckan.',
        xp: 20,
        description:
          'Rasten klockan tio gäller alla dagar. Den ska gå över hela veckan.',
        task: 'Uppgift: Låt `.rast` gå från linje `2` till sista linjen (`-1`). Ge den bakgrunden `lemonchiffon` och texten i mitten.',
        solution: schema(`  .schema {
    display: grid;
    grid-template-columns: 80px repeat(5, 1fr);
    grid-auto-rows: 48px;
    gap: 4px;
    background-color: lightgray;
  }
  .schema div {
    background-color: white;
    padding: 8px;
  }
  .dag,
  .tid {
    font-weight: bold;
  }
  .schema .dubbel {
    grid-row: span 2;
    background-color: palegreen;
  }
  .schema .rast {
    grid-column: 2 / -1;
    background-color: lemonchiffon;
    text-align: center;
  }
`),
        hints: [
          'En ny regel för rasten, med .schema före som för dubbellektionen.',
          'Från linje 2 till linje -1.',
          '.schema .rast { grid-column: 2 / -1; background-color: lemonchiffon; text-align: center; }',
        ],
        tests: [
          {
            description: 'Rasten går över alla fem dagar',
            code: "Math.abs(widths('.rast')[0] - (widths('.schema')[0] - 80 - 4)) <= 1",
            expected: true,
          },
          {
            description: 'Rasten är lemonchiffon med texten i mitten',
            code: "[colorOf('.rast', 'background-color'), css('.rast', 'text-align')]",
            expected: ['lemonchiffon', 'center'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-portfolio',
    track: 'responsivt',
    title: 'Portfolion',
    reward: { emoji: '💼', name: 'Portfölj' },
    summary:
      'En portfolio med dina projekt som fungerar lika bra på mobilen som på datorn.',
    steps: [
      {
        title: 'Projekten i rutnät',
        why: 'Bilderna är 400 pixlar breda, mer än en kolumn. max-width: 100% låter dem krympa till sina kort, och height: auto håller formen.',
        xp: 15,
        description:
          'Projekten och bilderna står under varandra och bilderna är för stora. Lägg projekten i tre kolumner.',
        task: 'Uppgift: Ge `img` `max-width: 100%` och `height: auto`. Gör `.projekt` till ett grid med tre lika breda kolumner och `16px` gap. Ge `.kort` bakgrunden `whitesmoke`, padding `8px` och hörnen `8px`.',
        starterCode: `<!-- Steg 1: projekten i rutnät -->
${PORTFOLIO}`,
        solution: portfolio(`  img {
    max-width: 100%;
    height: auto;
  }
  .projekt {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .kort {
    background-color: whitesmoke;
    padding: 8px;
    border-radius: 8px;
  }
`),
        hints: [
          'Tre regler: img, .projekt och .kort.',
          'repeat(3, 1fr) för kolumnerna.',
          'img { max-width: 100%; height: auto; }',
        ],
        tests: [
          {
            description: 'Projekten står i tre kolumner på datorn',
            code: "perRow('.kort')",
            expected: 3,
          },
          {
            description: 'Bilderna får plats i sina kort',
            code: "widths('.kort img').every(width => width <= widths('.kort')[0] - 16)",
            expected: true,
          },
          {
            description: 'Korten är whitesmoke med 8px padding',
            code: "[colorOf('.kort', 'background-color'), px('.kort', 'padding-top')]",
            expected: ['whitesmoke', 8],
          },
        ],
      },
      {
        title: 'En kolumn på mobilen',
        why: 'Tre kolumner på en mobil blir bara drygt hundra pixlar breda. En kolumn gör bilderna stora igen.',
        xp: 20,
        description:
          'Tryck på 📱. Korten blir pyttesmå på mobilen. Där ska de stå under varandra.',
        task: 'Uppgift: Ge `.projekt` en enda kolumn när fönstret är högst `600px` brett.',
        solution: portfolio(`  img {
    max-width: 100%;
    height: auto;
  }
  .projekt {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .kort {
    background-color: whitesmoke;
    padding: 8px;
    border-radius: 8px;
  }
  @media (max-width: 600px) {
    .projekt {
      grid-template-columns: 1fr;
    }
  }
`),
        hints: [
          '@media sist, med en regel för .projekt inuti.',
          'En kolumn skrivs 1fr.',
          '@media (max-width: 600px) {\n  .projekt { grid-template-columns: 1fr; }\n}',
        ],
        tests: [
          {
            description: 'På mobilen står korten i en kolumn',
            code: "[perRow('.kort'), rows('.kort')]",
            expected: [1, 3],
            width: 375,
          },
          {
            description: 'Sidan får plats på mobilen',
            code: 'fitsScreen()',
            expected: true,
            width: 375,
          },
          {
            description: 'På datorn står de kvar i tre kolumner',
            code: "perRow('.kort')",
            expected: 3,
          },
        ],
      },
      {
        title: 'Rubriken',
        why: 'En stor rubrik gör sig bra på datorn men tar halva mobilskärmen. Samma @media kan ändra både griddet och rubriken.',
        xp: 15,
        description:
          'Ge rubriken en tydlig storlek på datorn, och en mindre på mobilen.',
        task: 'Uppgift: Ge `h1` storleken `2.5rem` och färgen `indigo`. Gör den `1.75rem` på mobilen, i samma `@media`.',
        solution: portfolio(`  h1 {
    font-size: 2.5rem;
    color: indigo;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  .projekt {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .kort {
    background-color: whitesmoke;
    padding: 8px;
    border-radius: 8px;
  }
  @media (max-width: 600px) {
    .projekt {
      grid-template-columns: 1fr;
    }
    h1 {
      font-size: 1.75rem;
    }
  }
`),
        hints: [
          'En vanlig regel för h1 överst, och en till inuti @media.',
          '@media kan innehålla flera regler.',
          'h1 { font-size: 1.75rem; } inuti @media.',
        ],
        tests: [
          {
            description: 'Rubriken är 40px och indigo på datorn',
            code: "[px('h1', 'font-size'), colorOf('h1')]",
            expected: [40, 'indigo'],
          },
          {
            description: 'Rubriken är 28px på mobilen',
            code: "px('h1', 'font-size')",
            expected: 28,
            width: 375,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-produktsida',
    track: 'responsivt',
    title: 'Produktsidan',
    reward: { emoji: '🛍️', name: 'Shoppingkasse' },
    summary:
      'En produktsida med bilden bredvid texten på datorn och ovanför på mobilen.',
    steps: [
      {
        title: 'Bild och text bredvid',
        why: 'På en bred skärm är det lättare att se bilden och priset samtidigt. width: 50% gör bilden halva bredden, hur bred skärmen än är.',
        xp: 15,
        description: 'Bilden står ovanför texten. Ställ dem bredvid varandra.',
        task: 'Uppgift: Gör `.produkt` till en flexbox med `24px` gap och `align-items: center`. Ge `.produkt img` bredden `50%` och `height: auto`.',
        starterCode: `<!-- Steg 1: bild och text bredvid -->
${PRODUKT}`,
        solution: produkt(`  .produkt {
    display: flex;
    gap: 24px;
    align-items: center;
  }
  .produkt img {
    width: 50%;
    height: auto;
  }
`),
        hints: [
          'En regel för .produkt och en för .produkt img.',
          'Bredden i procent, höjden auto.',
          '.produkt img { width: 50%; height: auto; }',
        ],
        tests: [
          {
            description: 'Bilden och texten står bredvid varandra',
            code: "rows('.produkt > *')",
            expected: 1,
          },
          {
            description: 'Bilden är halva bredden',
            code: "Math.round(widths('.produkt img')[0] / widths('.produkt')[0] * 100)",
            expected: 50,
          },
        ],
      },
      {
        title: 'Under varandra på mobilen',
        why: 'På en mobil blir både bilden och texten för smala bredvid varandra. Nedåt får båda hela bredden.',
        xp: 20,
        description:
          'Tryck på 📱. Texten blir en smal remsa bredvid bilden. På mobilen ska bilden stå ovanför, i full bredd.',
        task: 'Uppgift: När fönstret är högst `600px` brett: ge `.produkt` `flex-direction: column` och bilden bredden `100%`.',
        solution: produkt(`  .produkt {
    display: flex;
    gap: 24px;
    align-items: center;
  }
  .produkt img {
    width: 50%;
    height: auto;
  }
  @media (max-width: 600px) {
    .produkt {
      flex-direction: column;
    }
    .produkt img {
      width: 100%;
    }
  }
`),
        hints: [
          '@media med två regler inuti.',
          'flex-direction: column på .produkt och width: 100% på bilden.',
          '@media (max-width: 600px) {\n  .produkt { flex-direction: column; }\n  .produkt img { width: 100%; }\n}',
        ],
        tests: [
          {
            description: 'På mobilen står bilden ovanför texten',
            code: "rows('.produkt > *')",
            expected: 2,
            width: 375,
          },
          {
            description: 'Bilden tar hela bredden på mobilen',
            code: "widths('.produkt img')[0] === widths('.produkt')[0]",
            expected: true,
            width: 375,
          },
          {
            description: 'Sidan får plats på mobilen',
            code: 'fitsScreen()',
            expected: true,
            width: 375,
          },
        ],
      },
      {
        title: 'En stor köpknapp',
        why: 'På mobilen trycker man med tummen. En knapp över hela bredden är lätt att träffa, men på datorn ser den konstig ut – där får den vara lagom.',
        xp: 20,
        description:
          'Länken längst ner ska bli en knapp – och på mobilen en stor knapp över hela bredden.',
        task: 'Uppgift: Gör `.kop` till en `inline-block` med bakgrunden `darkorange`, vit text utan streck, padding `12px 24px` och hörnen `8px`. På mobilen: `display: block` och texten i mitten.',
        solution: produkt(`  .produkt {
    display: flex;
    gap: 24px;
    align-items: center;
  }
  .produkt img {
    width: 50%;
    height: auto;
  }
  .kop {
    display: inline-block;
    background-color: darkorange;
    color: white;
    text-decoration: none;
    padding: 12px 24px;
    border-radius: 8px;
  }
  @media (max-width: 600px) {
    .produkt {
      flex-direction: column;
    }
    .produkt img {
      width: 100%;
    }
    .kop {
      display: block;
      text-align: center;
    }
  }
`),
        hints: [
          'En regel för .kop före @media, och en till inuti.',
          'block gör att knappen tar hela bredden.',
          '.kop { display: block; text-align: center; } inuti @media.',
        ],
        tests: [
          {
            description: 'Knappen är darkorange med vit text på datorn',
            code: "[css('.kop', 'display'), colorOf('.kop', 'background-color'), colorOf('.kop'), px('.kop', 'padding-left')]",
            expected: ['inline-block', 'darkorange', 'white', 24],
          },
          {
            description: 'På mobilen tar knappen hela bredden',
            code: "[widths('.kop')[0] === widths('.info')[0], css('.kop', 'text-align')]",
            expected: [true, 'center'],
            width: 375,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-evenemang',
    track: 'responsivt',
    title: 'Evenemangssidan',
    reward: { emoji: '🎪', name: 'Cirkustält' },
    summary: 'En sida för cirkusdagen, byggd med mobilen först.',
    steps: [
      {
        title: 'Mobilen först',
        why: 'De flesta läser sidan på mobilen. Därför byggs den först: en kolumn med jämn luft. Ett grid utan kolumner har en kolumn.',
        xp: 15,
        description:
          'Programmet är fyra lådor. Börja med hur de ska se ut på mobilen: under varandra med luft emellan.',
        task: 'Uppgift: Gör `.program` till ett grid med `12px` gap. Ge `.punkt` bakgrunden `lavender`, padding `12px` och hörnen `8px`, och `.punkt h2` `margin: 0`.',
        starterCode: `<!-- Steg 1: mobilen först -->
${EVENEMANG}`,
        solution: evenemang(`  .program {
    display: grid;
    gap: 12px;
  }
  .punkt {
    background-color: lavender;
    padding: 12px;
    border-radius: 8px;
  }
  .punkt h2 {
    margin: 0;
  }
`),
        hints: [
          'Tre regler: .program, .punkt och .punkt h2.',
          'Inga kolumner behövs – en kolumn är det vanliga.',
          '.program { display: grid; gap: 12px; }',
        ],
        tests: [
          {
            description:
              'På mobilen står punkterna under varandra med 12px emellan',
            code: "[css('.program', 'display'), rows('.punkt'), gapY('.punkt')]",
            expected: ['grid', 4, 12],
            width: 375,
          },
          {
            description: 'Punkterna är lavender med 8px hörn',
            code: "[colorOf('.punkt', 'background-color'), css('.punkt', 'border-radius')]",
            expected: ['lavender', '8px'],
          },
        ],
      },
      {
        title: 'Två kolumner på datorn',
        why: 'Med mobilen först lägger man till för större skärmar. min-width gäller från 700 pixlar och uppåt, så mobilen behåller sin enda kolumn.',
        xp: 20,
        description:
          'På datorn blir lådorna onödigt breda. Där ska programmet ha två kolumner.',
        task: 'Uppgift: Ge `.program` två lika breda kolumner när fönstret är minst `700px` brett.',
        solution: evenemang(`  .program {
    display: grid;
    gap: 12px;
  }
  .punkt {
    background-color: lavender;
    padding: 12px;
    border-radius: 8px;
  }
  .punkt h2 {
    margin: 0;
  }
  @media (min-width: 700px) {
    .program {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`),
        hints: [
          '@media med min-width, inte max-width.',
          'repeat(2, 1fr) inuti.',
          '@media (min-width: 700px) {\n  .program { grid-template-columns: repeat(2, 1fr); }\n}',
        ],
        tests: [
          {
            description: 'På datorn har programmet två kolumner',
            code: "[perRow('.punkt'), rows('.punkt')]",
            expected: [2, 2],
          },
          {
            description: 'På mobilen är det kvar en kolumn',
            code: "perRow('.punkt')",
            expected: 1,
            width: 375,
          },
        ],
      },
      {
        title: 'Sidhuvudet på datorn',
        why: 'På mobilen står rubriken och datumet bäst under varandra. På datorn finns plats bredvid – samma @media kan göra sidhuvudet till en flexbox.',
        xp: 20,
        description:
          'På datorn ska rubriken stå till vänster och datumet till höger.',
        task: 'Uppgift: Gör `header` till en flexbox med `space-between` och `align-items: center` när fönstret är minst `700px` brett.',
        solution: evenemang(`  .program {
    display: grid;
    gap: 12px;
  }
  .punkt {
    background-color: lavender;
    padding: 12px;
    border-radius: 8px;
  }
  .punkt h2 {
    margin: 0;
  }
  @media (min-width: 700px) {
    .program {
      grid-template-columns: repeat(2, 1fr);
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`),
        hints: [
          'En ny regel för header i samma @media.',
          'display: flex, justify-content och align-items.',
          'header { display: flex; justify-content: space-between; align-items: center; }',
        ],
        tests: [
          {
            description: 'På datorn står rubriken och datumet bredvid varandra',
            code: "[rows('header > *'), css('header', 'justify-content')]",
            expected: [1, 'space-between'],
          },
          {
            description: 'På mobilen står de under varandra',
            code: "rows('header > *')",
            expected: 2,
            width: 375,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-klubbsida',
    track: 'slutprojekt',
    title: 'Klubbsidan',
    reward: { emoji: '🥅', name: 'Målbur' },
    summary:
      'En hel sajt för en fotbollsklubb: färgtema, sidhuvud, en stor topp, lagen i ett grid och mobilen.',
    steps: [
      {
        title: 'Färgtema och sidhuvud',
        why: 'Klubbens färg kommer att stå på många ställen. Som variabel står den på ett ställe, och sidhuvudet med loggan och menyn är det första alla ser.',
        xp: 20,
        description:
          'Sidan är klar i HTML men har ingen CSS. Börja med klubbens färg och sidhuvudet.',
        task: 'Uppgift: Skapa `--klubbfarg: forestgreen` i `:root`. Ge `body` `margin: 0` och typsnittet `Arial, sans-serif`. Gör `header` till en flexbox med `space-between`, `align-items: center`, padding `12px 16px` och bakgrunden `var(--klubbfarg)`. Länkarna i `header` är vita utan streck, och `nav` är en flexbox med `16px` gap.',
        starterCode: `<!-- Steg 1: färgtema och sidhuvud -->
${KLUBB}`,
        solution: klubb(`  :root {
    --klubbfarg: forestgreen;
  }
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background-color: var(--klubbfarg);
  }
  header a {
    color: white;
    text-decoration: none;
  }
  nav {
    display: flex;
    gap: 16px;
  }
`),
        hints: [
          'Fem regler: :root, body, header, header a och nav.',
          'background-color: var(--klubbfarg); i header.',
          ':root { --klubbfarg: forestgreen; }',
        ],
        tests: [
          {
            description: 'Loggan och menyn står på en rad',
            code: "[rows('header > *'), rows('nav a'), gapX('nav a')]",
            expected: [1, 1, 16],
          },
          {
            description: 'Länkarna i sidhuvudet är vita utan streck',
            code: "[colorsOf('header a'), css('nav a', 'text-decoration-line')]",
            expected: [['white', 'white', 'white', 'white'], 'none'],
          },
          {
            description: 'Sidhuvudet använder --klubbfarg',
            code: "[colorOf('header', 'background-color'), (doc.documentElement.style.setProperty('--klubbfarg', 'navy'), colorOf('header', 'background-color'))]",
            expected: ['forestgreen', 'navy'],
          },
        ],
      },
      {
        title: 'Den stora toppen',
        why: 'Toppen säger på en sekund vad sidan handlar om. Knappen leder direkt till det viktigaste: att bli medlem.',
        xp: 20,
        description:
          'Under sidhuvudet ska det komma en stor, färgglad topp med en gul knapp.',
        task: 'Uppgift: Ge `.topp` bakgrunden `linear-gradient(to right, forestgreen, darkgreen)`, vit text, padding `48px 16px` och texten i mitten. Gör `.knapp` till en `inline-block` med bakgrunden `gold`, svart text utan streck, padding `12px 24px` och hörnen `8px`.',
        solution: klubb(`  :root {
    --klubbfarg: forestgreen;
  }
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background-color: var(--klubbfarg);
  }
  header a {
    color: white;
    text-decoration: none;
  }
  nav {
    display: flex;
    gap: 16px;
  }
  .topp {
    background: linear-gradient(to right, forestgreen, darkgreen);
    color: white;
    padding: 48px 16px;
    text-align: center;
  }
  .knapp {
    display: inline-block;
    background-color: gold;
    color: black;
    text-decoration: none;
    padding: 12px 24px;
    border-radius: 8px;
  }
`),
        hints: [
          'Två nya regler: .topp och .knapp.',
          'background: linear-gradient(to right, forestgreen, darkgreen);',
          '.knapp { display: inline-block; background-color: gold; color: black; … }',
        ],
        tests: [
          {
            description: 'Toppen går från forestgreen till darkgreen',
            code: "css('.topp', 'background-image').replace(/rgb\\([^)]*\\)/g, colorName)",
            expected: 'linear-gradient(to right, forestgreen, darkgreen)',
          },
          {
            description: 'Toppen har vit text i mitten och padding 48px 16px',
            code: "[colorOf('.topp h1'), css('.topp', 'text-align'), px('.topp', 'padding-top'), px('.topp', 'padding-left')]",
            expected: ['white', 'center', 48, 16],
          },
          {
            description: 'Knappen är gold med svart text, utan streck',
            code: "[css('.knapp', 'display'), colorOf('.knapp', 'background-color'), colorOf('.knapp'), css('.knapp', 'text-decoration-line')]",
            expected: ['inline-block', 'gold', 'black', 'none'],
          },
        ],
      },
      {
        title: 'Lagen i ett grid',
        why: 'Fyra lag får plats bredvid varandra på en dator. Sektionerna får en största bredd, så att texten inte går över hela skärmen.',
        xp: 20,
        description:
          'Lagen står under varandra och sektionerna är lika breda som skärmen.',
        task: 'Uppgift: Ge `section` `max-width: 900px`, `margin: 0 auto` och padding `16px`. Gör `.lag` till ett grid med fyra lika breda kolumner och `12px` gap. Ge `.kort` bakgrunden `honeydew`, padding `16px`, texten i mitten och hörnen `8px`.',
        solution: klubb(`  :root {
    --klubbfarg: forestgreen;
  }
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background-color: var(--klubbfarg);
  }
  header a {
    color: white;
    text-decoration: none;
  }
  nav {
    display: flex;
    gap: 16px;
  }
  .topp {
    background: linear-gradient(to right, forestgreen, darkgreen);
    color: white;
    padding: 48px 16px;
    text-align: center;
  }
  .knapp {
    display: inline-block;
    background-color: gold;
    color: black;
    text-decoration: none;
    padding: 12px 24px;
    border-radius: 8px;
  }
  section {
    max-width: 900px;
    margin: 0 auto;
    padding: 16px;
  }
  .lag {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }
  .kort {
    background-color: honeydew;
    padding: 16px;
    text-align: center;
    border-radius: 8px;
  }
`),
        hints: [
          'Tre nya regler: section, .lag och .kort.',
          'repeat(4, 1fr) ger fyra lika breda kolumner.',
          '.lag { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }',
        ],
        tests: [
          {
            description: 'Lagen står i fyra kolumner med 12px emellan',
            code: "[perRow('.kort'), gapX('.kort')]",
            expected: [4, 12],
          },
          {
            description: 'Korten är honeydew med texten i mitten',
            code: "[colorOf('.kort', 'background-color'), css('.kort', 'text-align')]",
            expected: ['honeydew', 'center'],
          },
          {
            description:
              'Sektionerna har padding 16px och har en största bredd',
            code: "[px('section', 'padding-top'), css('section', 'max-width')]",
            expected: [16, '900px'],
          },
        ],
      },
      {
        title: 'Mobilen',
        why: 'Många föräldrar kollar träningstiderna på mobilen. Där får menyn plats under loggan, och lagen två och två.',
        xp: 20,
        description:
          'Tryck på 📱. Menyn trycks ihop och lagen blir smala. Fixa mobilen.',
        task: 'Uppgift: När fönstret är högst `600px` brett: ge `header` `flex-direction: column` och `gap: 8px`, och `.lag` två kolumner.',
        solution: klubb(`  :root {
    --klubbfarg: forestgreen;
  }
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background-color: var(--klubbfarg);
  }
  header a {
    color: white;
    text-decoration: none;
  }
  nav {
    display: flex;
    gap: 16px;
  }
  .topp {
    background: linear-gradient(to right, forestgreen, darkgreen);
    color: white;
    padding: 48px 16px;
    text-align: center;
  }
  .knapp {
    display: inline-block;
    background-color: gold;
    color: black;
    text-decoration: none;
    padding: 12px 24px;
    border-radius: 8px;
  }
  section {
    max-width: 900px;
    margin: 0 auto;
    padding: 16px;
  }
  .lag {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }
  .kort {
    background-color: honeydew;
    padding: 16px;
    text-align: center;
    border-radius: 8px;
  }
  @media (max-width: 600px) {
    header {
      flex-direction: column;
      gap: 8px;
    }
    .lag {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`),
        hints: [
          '@media sist, med två regler inuti.',
          'flex-direction: column gör att loggan och menyn hamnar under varandra.',
          '.lag { grid-template-columns: repeat(2, 1fr); } inuti @media.',
        ],
        tests: [
          {
            description: 'På mobilen står menyn under loggan',
            code: "rows('header > *')",
            expected: 2,
            width: 375,
          },
          {
            description: 'På mobilen står lagen två och två',
            code: "[perRow('.kort'), rows('.kort')]",
            expected: [2, 2],
            width: 375,
          },
          {
            description:
              'Sidan får plats på mobilen och är som förut på datorn',
            code: 'fitsScreen()',
            expected: true,
            width: 375,
          },
          {
            description: 'På datorn står lagen kvar i fyra kolumner',
            code: "perRow('.kort')",
            expected: 4,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-webbutik',
    track: 'slutprojekt',
    title: 'Webbutiken',
    reward: { emoji: '🧺', name: 'Korg' },
    summary:
      'En leksaksbutik med produktkort, en färg för hela butiken, rea-märken i hörnet och en mobilversion.',
    steps: [
      {
        title: 'Produkterna i rutnät',
        why: 'En butik visar många produkter likadant. Ett grid ställer dem i rader, och samma klass ger alla kort samma utseende.',
        xp: 20,
        description:
          'Produkterna står under varandra. Lägg dem i ett rutnät med fyra kolumner.',
        task: 'Uppgift: Gör `.produkter` till ett grid med fyra lika breda kolumner och `16px` gap. Ge `.produkt` vit bakgrund, kanten `1px solid lightgray`, hörnen `12px`, padding `16px` och texten i mitten. Ge `.bild` storleken `3rem`.',
        starterCode: `<!-- Steg 1: produkterna i rutnät -->
${BUTIK}`,
        solution: butik(`  .produkter {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  .produkt {
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 12px;
    padding: 16px;
    text-align: center;
  }
  .bild {
    font-size: 3rem;
  }
`),
        hints: [
          'Tre regler: .produkter, .produkt och .bild.',
          'repeat(4, 1fr) och gap: 16px på .produkter.',
          '.produkt { background-color: white; border: 1px solid lightgray; border-radius: 12px; padding: 16px; text-align: center; }',
        ],
        tests: [
          {
            description: 'Produkterna står i fyra kolumner med 16px emellan',
            code: "[perRow('.produkt'), gapX('.produkt')]",
            expected: [4, 16],
          },
          {
            description: 'Korten är vita med 1px lightgray kant och 12px hörn',
            code: "[colorOf('.produkt', 'background-color'), px('.produkt', 'border-top-width'), colorOf('.produkt', 'border-top-color'), css('.produkt', 'border-radius')]",
            expected: ['white', 1, 'lightgray', '12px'],
          },
          {
            description: 'Bilderna är 48px',
            code: "px('.bild', 'font-size')",
            expected: 48,
          },
        ],
      },
      {
        title: 'Butikens färg',
        why: 'Priset och knappen har samma färg, så att man förstår att de hör ihop. Med en variabel kan butiken byta färg till rean på en sekund.',
        xp: 20,
        description: 'Priserna och knapparna ska ha butikens färg.',
        task: 'Uppgift: Skapa `--butiksfarg: darkorange` i `:root`. Ge `.pris` färgen `var(--butiksfarg)` och fet stil. Gör `.knapp` till en `inline-block` med bakgrunden `var(--butiksfarg)`, vit text utan streck, padding `8px 16px` och hörnen `6px`.',
        solution: butik(`  :root {
    --butiksfarg: darkorange;
  }
  .produkter {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  .produkt {
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 12px;
    padding: 16px;
    text-align: center;
  }
  .bild {
    font-size: 3rem;
  }
  .pris {
    color: var(--butiksfarg);
    font-weight: bold;
  }
  .knapp {
    display: inline-block;
    background-color: var(--butiksfarg);
    color: white;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 6px;
  }
`),
        hints: [
          'En regel för :root, en för .pris och en för .knapp.',
          'var(--butiksfarg) där färgen ska stå.',
          '.pris { color: var(--butiksfarg); font-weight: bold; }',
        ],
        tests: [
          {
            description: 'Priset och knappen är darkorange',
            code: "[colorOf('.pris'), colorOf('.knapp', 'background-color'), colorOf('.knapp')]",
            expected: ['darkorange', 'darkorange', 'white'],
          },
          {
            description: 'Knappen har padding 8px 16px och 6px hörn',
            code: "[css('.knapp', 'display'), px('.knapp', 'padding-top'), px('.knapp', 'padding-left'), css('.knapp', 'border-radius')]",
            expected: ['inline-block', 8, 16, '6px'],
          },
          {
            description: 'Byts --butiksfarg byter priset och knappen färg',
            code: "(doc.documentElement.style.setProperty('--butiksfarg', 'crimson'), [colorOf('.pris'), colorOf('.knapp', 'background-color')])",
            expected: ['crimson', 'crimson'],
          },
        ],
      },
      {
        title: 'Rea-märket',
        why: 'position: absolute lyfter märket ur flödet och placerar det mot närmaste förälder med position. Därför får kortet position: relative – annars hamnar märket i hörnet på hela sidan.',
        xp: 25,
        description:
          'Ordet REA står ovanför bilden. Det ska vara ett rött märke uppe i kortets högra hörn.',
        task: 'Uppgift: Ge `.produkt` `position: relative`. Ge `.rea` `position: absolute`, `top: 8px` och `right: 8px`, bakgrunden `crimson`, vit text, padding `2px 8px`, hörnen `999px` och storleken `0.75rem`.',
        solution: butik(`  :root {
    --butiksfarg: darkorange;
  }
  .produkter {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  .produkt {
    position: relative;
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 12px;
    padding: 16px;
    text-align: center;
  }
  .bild {
    font-size: 3rem;
  }
  .pris {
    color: var(--butiksfarg);
    font-weight: bold;
  }
  .knapp {
    display: inline-block;
    background-color: var(--butiksfarg);
    color: white;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 6px;
  }
  .rea {
    position: absolute;
    top: 8px;
    right: 8px;
    background-color: crimson;
    color: white;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 0.75rem;
  }
`),
        hints: [
          'position: relative på .produkt, och en ny regel för .rea.',
          'top och right säger hur långt från hörnet märket står.',
          '.rea { position: absolute; top: 8px; right: 8px; … }',
        ],
        tests: [
          {
            description:
              'Märket står 8px från kortets övre högra hörn (innanför kanten)',
            code: "[rect('.rea').top - rect('.produkt').top, rect('.produkt').left + rect('.produkt').width - rect('.rea').left - rect('.rea').width]",
            expected: [9, 9],
          },
          {
            description: 'Märket är crimson med vit text och runda hörn',
            code: "[colorOf('.rea', 'background-color'), colorOf('.rea'), css('.rea', 'border-radius'), px('.rea', 'font-size')]",
            expected: ['crimson', 'white', '999px', 12],
          },
        ],
      },
      {
        title: 'Mobilen',
        why: 'Fyra kolumner på en mobil blir mindre än 80 pixlar breda. Två och två är lagom att trycka på.',
        xp: 20,
        description:
          'Tryck på 📱. Korten är för smala. På mobilen ska de stå två och två.',
        task: 'Uppgift: Ge `.produkter` två kolumner när fönstret är högst `600px` brett.',
        solution: butik(`  :root {
    --butiksfarg: darkorange;
  }
  .produkter {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  .produkt {
    position: relative;
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 12px;
    padding: 16px;
    text-align: center;
  }
  .bild {
    font-size: 3rem;
  }
  .pris {
    color: var(--butiksfarg);
    font-weight: bold;
  }
  .knapp {
    display: inline-block;
    background-color: var(--butiksfarg);
    color: white;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 6px;
  }
  .rea {
    position: absolute;
    top: 8px;
    right: 8px;
    background-color: crimson;
    color: white;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 0.75rem;
  }
  @media (max-width: 600px) {
    .produkter {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`),
        hints: [
          '@media sist, med en regel för .produkter.',
          'repeat(2, 1fr) inuti.',
          '@media (max-width: 600px) {\n  .produkter { grid-template-columns: repeat(2, 1fr); }\n}',
        ],
        tests: [
          {
            description: 'På mobilen står produkterna två och två',
            code: "[perRow('.produkt'), rows('.produkt')]",
            expected: [2, 2],
            width: 375,
          },
          {
            description: 'Sidan får plats på mobilen',
            code: 'fitsScreen()',
            expected: true,
            width: 375,
          },
          {
            description: 'På datorn står de kvar i fyra kolumner',
            code: "perRow('.produkt')",
            expected: 4,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-egen-sajt',
    track: 'slutprojekt',
    title: 'Min egen sajt',
    reward: { emoji: '🌐', name: 'Jordglob' },
    summary:
      'Din egen sajt om dig själv, byggd från plan till mobil. Byt gärna ut texterna mot dina egna.',
    steps: [
      {
        title: 'Skelettet',
        why: 'Skelettet är planen i HTML. Med en meny som länkar till varje sektion går sidan att använda redan innan den har någon CSS.',
        xp: 20,
        description:
          'Bygg skelettet till din sajt. Skriv om dig själv – rättningen kollar bara formen.',
        task: 'Uppgift: Skriv viewport-raden, en `header` med en `h1` och en `nav` med minst två länkar, en `main` med en `section` med `id` och `h2` för varje länk, och en `footer`. Varje länk går till en sektion.',
        starterCode:
          '<!-- Steg 1: skelettet. Byt gärna ut texterna mot dina egna. -->\n',
        solution: `${EGEN}`,
        hints: [
          'header, main och footer. nav står i header.',
          'Varje länk har href="#id", och varje section har samma id.',
          '<a href="#om">Om mig</a> … <section id="om"><h2>Om mig</h2></section>',
        ],
        tests: [
          {
            description:
              'Sidan har viewport-raden, header med h1, main och footer',
            code: "[count('meta[name=viewport]'), count('header h1'), count('main'), count('footer')]",
            expected: [1, 1, 1, 1],
          },
          {
            description: 'Menyn har minst två länkar som går till sektioner',
            code: "$$('nav a').length >= 2 && $$('nav a').every(link => $(link.getAttribute('href'))?.tagName === 'SECTION')",
            expected: true,
          },
          {
            description: 'Varje sektion har en h2',
            code: "$$('main section').every(section => section.querySelector('h2'))",
            expected: true,
          },
        ],
      },
      {
        title: 'Ditt färgtema',
        why: 'Välj färger som är dina. Som variabler kan du prova en ny färg på en sekund – och hela sidan följer med.',
        xp: 20,
        description:
          'Ge sajten dina färger. Vilka färger du väljer bestämmer du själv.',
        task: 'Uppgift: Skapa `--huvudfarg` och `--bakgrund` i `:root`, med färger du väljer. Använd `--huvudfarg` som färg på `h1` och `h2`, och `--bakgrund` som bakgrund på `body`. Ge `body` ett typsnitt och `line-height: 1.6`.',
        solution: egen(`  :root {
    --huvudfarg: rebeccapurple;
    --bakgrund: lavenderblush;
  }
  body {
    background-color: var(--bakgrund);
    font-family: Verdana, sans-serif;
    line-height: 1.6;
  }
  h1,
  h2 {
    color: var(--huvudfarg);
  }
`),
        hints: [
          'Börja med :root och två variabler.',
          'h1, h2 { color: var(--huvudfarg); }',
          'body { background-color: var(--bakgrund); font-family: …; line-height: 1.6; }',
        ],
        tests: [
          {
            description: 'Raderna har 1,6 gånger textens höjd',
            code: "px('body', 'line-height') / px('body', 'font-size')",
            expected: 1.6,
          },
          {
            description: 'Rubrikerna använder --huvudfarg',
            code: "(doc.documentElement.style.setProperty('--huvudfarg', 'crimson'), [colorOf('h1'), colorOf('h2')])",
            expected: ['crimson', 'crimson'],
          },
          {
            description: 'Bakgrunden använder --bakgrund',
            code: "(doc.documentElement.style.setProperty('--bakgrund', 'ivory'), colorOf('body', 'background-color'))",
            expected: 'ivory',
          },
        ],
      },
      {
        title: 'Layouten',
        why: 'Namnet till vänster och menyn till höger, och texten lagom bred i mitten – så känns sidan som en riktig sajt.',
        xp: 20,
        description:
          'Lägg namnet och menyn på en rad, och gör texten lagom bred.',
        task: 'Uppgift: Gör `header` till en flexbox med `space-between` och `align-items: center`, och `nav` till en flexbox med `16px` gap. Ge `main` `max-width: 700px` och `margin: 0 auto`.',
        solution: egen(`  :root {
    --huvudfarg: rebeccapurple;
    --bakgrund: lavenderblush;
  }
  body {
    background-color: var(--bakgrund);
    font-family: Verdana, sans-serif;
    line-height: 1.6;
  }
  h1,
  h2 {
    color: var(--huvudfarg);
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav {
    display: flex;
    gap: 16px;
  }
  main {
    max-width: 700px;
    margin: 0 auto;
  }
`),
        hints: [
          'Tre nya regler: header, nav och main.',
          'header { display: flex; justify-content: space-between; align-items: center; }',
          'main { max-width: 700px; margin: 0 auto; }',
        ],
        tests: [
          {
            description: 'Namnet och menyn står på en rad',
            code: "[rows('header > *'), css('header', 'justify-content')]",
            expected: [1, 'space-between'],
          },
          {
            description: 'Länkarna har 16px emellan',
            code: "gapX('nav a')",
            expected: 16,
          },
          {
            description: 'Texten är 700px bred och står i mitten',
            code: "[widths('main')[0], centered('main')]",
            expected: [700, true],
          },
        ],
      },
      {
        title: 'Mobilen',
        why: 'Din sajt ska gå att visa för kompisar på mobilen. Där står menyn under namnet.',
        xp: 20,
        description:
          'Tryck på 📱 och se hur sajten ser ut. Fixa sidhuvudet på mobilen.',
        task: 'Uppgift: När fönstret är högst `600px` brett: ge `header` `flex-direction: column` och `align-items: flex-start`.',
        solution: egen(`  :root {
    --huvudfarg: rebeccapurple;
    --bakgrund: lavenderblush;
  }
  body {
    background-color: var(--bakgrund);
    font-family: Verdana, sans-serif;
    line-height: 1.6;
  }
  h1,
  h2 {
    color: var(--huvudfarg);
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav {
    display: flex;
    gap: 16px;
  }
  main {
    max-width: 700px;
    margin: 0 auto;
  }
  @media (max-width: 600px) {
    header {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`),
        hints: [
          '@media sist, med en regel för header.',
          'flex-direction: column; align-items: flex-start;',
          '@media (max-width: 600px) {\n  header { flex-direction: column; align-items: flex-start; }\n}',
        ],
        tests: [
          {
            description: 'På mobilen står menyn under namnet, till vänster',
            code: "[rows('header > *'), rect('nav').left === rect('h1').left]",
            expected: [2, true],
            width: 375,
          },
          {
            description: 'Sidan får plats på mobilen',
            code: 'fitsScreen()',
            expected: true,
            width: 375,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-tw-inlogg',
    track: 'tailwind',
    title: 'Inloggningsrutan',
    reward: { emoji: '🔐', name: 'Hänglås' },
    summary: 'En inloggningsruta som på riktiga sajter – helt med Tailwind.',
    steps: [
      {
        title: 'Rutan',
        why: 'max-w-sm och mx-auto är Tailwinds sätt att skriva max-width och margin: 0 auto. Rutan står i mitten och krymper på mobilen.',
        xp: 15,
        description:
          'Formuläret ligger utan form på sidan. Gör det till en vit ruta i mitten.',
        task: 'Uppgift: Ge `body` `bg-slate-100` och `p-8`. Ge `form` `max-w-sm`, `mx-auto`, `bg-white`, `p-6`, `rounded-xl` och `shadow-md`.',
        starterCode: `<!-- Steg 1: rutan -->
${TW_RAD}
<body>
  <form>
    <h1 class="text-2xl font-bold">Logga in</h1>
    <label for="namn">Användarnamn</label>
    <input id="namn" name="namn">
    <label for="losen">Lösenord</label>
    <input id="losen" name="losen" type="password">
    <button>Logga in</button>
  </form>
</body>
`,
        solution: `${TW_RAD}
<body class="bg-slate-100 p-8">
  <form class="max-w-sm mx-auto bg-white p-6 rounded-xl shadow-md">
    <h1 class="text-2xl font-bold">Logga in</h1>
    <label for="namn">Användarnamn</label>
    <input id="namn" name="namn">
    <label for="losen">Lösenord</label>
    <input id="losen" name="losen" type="password">
    <button>Logga in</button>
  </form>
</body>
`,
        hints: [
          'Två klasser på body och sex på form.',
          'max-w-sm är högst 384 pixlar, mx-auto ställer i mitten.',
          '<form class="max-w-sm mx-auto bg-white p-6 rounded-xl shadow-md">',
        ],
        tests: [
          {
            description: 'Rutan är 384px bred och står i mitten',
            code: "[widths('form')[0], centered('form')]",
            expected: [384, true],
          },
          {
            description: 'Rutan är vit med 24px padding, 12px hörn och skugga',
            code: "[twColor('form', 'background-color'), px('form', 'padding-top'), css('form', 'border-radius'), css('form', 'box-shadow') !== 'none']",
            expected: ['white', 24, '12px', true],
          },
          {
            description: 'Sidan är slate-100',
            code: "twColor('body', 'background-color')",
            expected: 'slate-100',
          },
        ],
      },
      {
        title: 'Fälten',
        why: 'Tailwinds preflight tar bort fältens kanter, så de syns inte alls. block gör etiketterna till egna rader, och w-full gör fälten lika breda som rutan.',
        xp: 20,
        description: 'Fälten syns knappt och står på samma rad som texten.',
        task: 'Uppgift: Ge båda `label` `block`, `font-semibold` och `mt-4`. Ge båda `input` `w-full`, `border-2`, `border-slate-300`, `rounded-lg`, `px-3` och `py-2`.',
        solution: `${TW_RAD}
<body class="bg-slate-100 p-8">
  <form class="max-w-sm mx-auto bg-white p-6 rounded-xl shadow-md">
    <h1 class="text-2xl font-bold">Logga in</h1>
    <label class="block font-semibold mt-4" for="namn">Användarnamn</label>
    <input class="w-full border-2 border-slate-300 rounded-lg px-3 py-2" id="namn" name="namn">
    <label class="block font-semibold mt-4" for="losen">Lösenord</label>
    <input class="w-full border-2 border-slate-300 rounded-lg px-3 py-2" id="losen" name="losen" type="password">
    <button>Logga in</button>
  </form>
</body>
`,
        hints: [
          'Samma klasser på båda label och samma på båda input.',
          'block gör att etiketten får en egen rad.',
          'class="w-full border-2 border-slate-300 rounded-lg px-3 py-2"',
        ],
        tests: [
          {
            description: 'Etiketterna står på egna rader och är halvfeta',
            code: "[css('label', 'display'), css('label', 'font-weight'), px('label', 'margin-top')]",
            expected: ['block', '600', 16],
          },
          {
            description: 'Fälten är lika breda som rutans innehåll',
            code: "widths('input').every(width => width === widths('form')[0] - 48)",
            expected: true,
          },
          {
            description: 'Fälten har en 2px kant i slate-300 och 8px hörn',
            code: "[px('input', 'border-top-width'), twColor('input', 'border-top-color'), css('input', 'border-radius')]",
            expected: [2, 'slate-300', '8px'],
          },
        ],
      },
      {
        title: 'Knappen och fokus',
        why: 'focus: fungerar som hover:, men när fältet är valt. Då ser man direkt var man skriver.',
        xp: 20,
        description:
          'Knappen ser inte ut som en knapp, och man ser inte vilket fält man skriver i.',
        task: 'Uppgift: Ge knappen `w-full`, `mt-6`, `bg-indigo-600`, `hover:bg-indigo-700`, `text-white`, `font-bold`, `py-2` och `rounded-lg`. Ge båda fälten `focus:border-indigo-500` och `outline-none`.',
        solution: `${TW_RAD}
<body class="bg-slate-100 p-8">
  <form class="max-w-sm mx-auto bg-white p-6 rounded-xl shadow-md">
    <h1 class="text-2xl font-bold">Logga in</h1>
    <label class="block font-semibold mt-4" for="namn">Användarnamn</label>
    <input class="w-full border-2 border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-indigo-500" id="namn" name="namn">
    <label class="block font-semibold mt-4" for="losen">Lösenord</label>
    <input class="w-full border-2 border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-indigo-500" id="losen" name="losen" type="password">
    <button class="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg">Logga in</button>
  </form>
</body>
`,
        hints: [
          'Åtta klasser på button och två nya på varje input.',
          'focus: skrivs före klassen, precis som hover:.',
          'class="… outline-none focus:border-indigo-500"',
        ],
        tests: [
          {
            description:
              'Knappen är indigo-600 med vit fet text över hela bredden',
            code: "[twColor('button', 'background-color'), twColor('button'), css('button', 'font-weight'), widths('button')[0] === widths('input')[0]]",
            expected: ['indigo-600', 'white', '700', true],
          },
          {
            description: 'Knappen blir indigo-700 när musen är över',
            code: "twName(hover('button', 'background-color'))",
            expected: 'indigo-700',
          },
          {
            description: 'Det valda fältet får en kant i indigo-500',
            code: "twName(focus('input', 'border-color'))",
            expected: 'indigo-500',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-tw-prislista',
    track: 'tailwind',
    title: 'Prislistan',
    reward: { emoji: '💳', name: 'Betalkort' },
    summary: 'Tre prisplaner bredvid varandra, med den populäraste i färg.',
    steps: [
      {
        title: 'Tre kort',
        why: 'grid-cols-1 md:grid-cols-3 är mobilen först i en enda rad: en kolumn alltid, tre från md.',
        xp: 15,
        description:
          'Tre prisplaner står under varandra. På datorn ska de stå bredvid varandra.',
        task: 'Uppgift: Ge `.planer` `grid`, `grid-cols-1`, `md:grid-cols-3` och `gap-6`. Ge varje `.plan` `bg-white`, `rounded-xl`, `p-6` och `shadow`. Ge `body` `bg-slate-100` och `p-8`.',
        starterCode: `<!-- Steg 1: tre kort -->
${TW_RAD}
<body>
  <div class="planer">
    <div class="plan"><h2>Liten</h2><p class="pris">0 kr</p><p>1 spel i månaden</p></div>
    <div class="plan populär"><h2>Mellan</h2><p class="pris">49 kr</p><p>10 spel i månaden</p></div>
    <div class="plan"><h2>Stor</h2><p class="pris">99 kr</p><p>Alla spel</p></div>
  </div>
</body>
`,
        solution: `${TW_RAD}
<body class="bg-slate-100 p-8">
  <div class="planer grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="plan bg-white rounded-xl p-6 shadow"><h2>Liten</h2><p class="pris">0 kr</p><p>1 spel i månaden</p></div>
    <div class="plan populär bg-white rounded-xl p-6 shadow"><h2>Mellan</h2><p class="pris">49 kr</p><p>10 spel i månaden</p></div>
    <div class="plan bg-white rounded-xl p-6 shadow"><h2>Stor</h2><p class="pris">99 kr</p><p>Alla spel</p></div>
  </div>
</body>
`,
        hints: [
          'Fyra klasser på .planer och fyra på varje .plan.',
          'md:grid-cols-3 gäller från 768 pixlar.',
          '<div class="planer grid grid-cols-1 md:grid-cols-3 gap-6">',
        ],
        tests: [
          {
            description:
              'På datorn står planerna i tre kolumner med 24px emellan',
            code: "[perRow('.plan'), gapX('.plan')]",
            expected: [3, 24],
          },
          {
            description: 'På mobilen står de under varandra',
            code: "rows('.plan')",
            expected: 3,
            width: 375,
          },
          {
            description: 'Korten är vita med 12px hörn och 24px padding',
            code: "[twColor('.plan', 'background-color'), css('.plan', 'border-radius'), px('.plan', 'padding-top')]",
            expected: ['white', '12px', 24],
          },
        ],
      },
      {
        title: 'Texten',
        why: 'Priset är det viktigaste på kortet och får den största texten. Preflight har gjort alla rubriker lika stora, så storlekarna sätter du själv.',
        xp: 15,
        description: 'All text är lika stor. Priset ska synas mest.',
        task: 'Uppgift: Ge varje `h2` `text-xl` och `font-bold`. Ge varje `.pris` `text-4xl`, `font-bold` och `my-4`.',
        solution: `${TW_RAD}
<body class="bg-slate-100 p-8">
  <div class="planer grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="plan bg-white rounded-xl p-6 shadow"><h2 class="text-xl font-bold">Liten</h2><p class="pris text-4xl font-bold my-4">0 kr</p><p>1 spel i månaden</p></div>
    <div class="plan populär bg-white rounded-xl p-6 shadow"><h2 class="text-xl font-bold">Mellan</h2><p class="pris text-4xl font-bold my-4">49 kr</p><p>10 spel i månaden</p></div>
    <div class="plan bg-white rounded-xl p-6 shadow"><h2 class="text-xl font-bold">Stor</h2><p class="pris text-4xl font-bold my-4">99 kr</p><p>Alla spel</p></div>
  </div>
</body>
`,
        hints: [
          'Samma klasser i alla tre korten.',
          'my-4 är margin uppe och nere.',
          '<p class="pris text-4xl font-bold my-4">',
        ],
        tests: [
          {
            description: 'Rubrikerna är 20px och feta',
            code: "[px('.plan:first-child h2', 'font-size'), px('.plan:last-child h2', 'font-size'), css('h2', 'font-weight')]",
            expected: [20, 20, '700'],
          },
          {
            description: 'Priserna är 36px och feta med 16px luft',
            code: "[px('.pris', 'font-size'), css('.pris', 'font-weight'), px('.pris', 'margin-top')]",
            expected: [36, '700', 16],
          },
        ],
      },
      {
        title: 'Den populära',
        why: 'Den plan man helst vill sälja ska sticka ut. En egen färg på ett av tre kort drar blicken dit direkt.',
        xp: 20,
        description:
          'Mellanplanen är populärast. Den ska vara lila med vit text.',
        task: 'Uppgift: Byt `bg-white` mot `bg-violet-600` på `.populär`, och lägg till `text-white`.',
        solution: `${TW_RAD}
<body class="bg-slate-100 p-8">
  <div class="planer grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="plan bg-white rounded-xl p-6 shadow"><h2 class="text-xl font-bold">Liten</h2><p class="pris text-4xl font-bold my-4">0 kr</p><p>1 spel i månaden</p></div>
    <div class="plan populär bg-violet-600 text-white rounded-xl p-6 shadow"><h2 class="text-xl font-bold">Mellan</h2><p class="pris text-4xl font-bold my-4">49 kr</p><p>10 spel i månaden</p></div>
    <div class="plan bg-white rounded-xl p-6 shadow"><h2 class="text-xl font-bold">Stor</h2><p class="pris text-4xl font-bold my-4">99 kr</p><p>Alla spel</p></div>
  </div>
</body>
`,
        hints: [
          'Bara klasserna på .populär ändras.',
          'Ta bort bg-white – annars krockar de två bakgrunderna.',
          'class="plan populär bg-violet-600 text-white rounded-xl p-6 shadow"',
        ],
        tests: [
          {
            description: 'Den populära planen är violet-600 med vit text',
            code: "[twColor('.populär', 'background-color'), twColor('.populär .pris')]",
            expected: ['violet-600', 'white'],
          },
          {
            description: 'De andra är kvar vita',
            code: "colorsOf('.plan:not(.populär)', 'background-color')",
            expected: ['white', 'white'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-tw-blogg',
    track: 'tailwind',
    title: 'Bloggsidan',
    reward: { emoji: '🖋️', name: 'Reservoarpenna' },
    summary:
      'En blogg med sidhuvud, inlägg i en lagom bred kolumn och kort som lyfter sig.',
    steps: [
      {
        title: 'Sidhuvudet',
        why: 'Samma sidhuvud som i bana 8, nu på en rad HTML. shadow-sm ger en tunn skugga som skiljer det från sidan.',
        xp: 15,
        description: 'Bloggens namn och menyn står under varandra.',
        task: 'Uppgift: Ge `header` `flex`, `justify-between`, `items-center`, `p-4`, `bg-white` och `shadow-sm`. Ge `nav` `flex` och `gap-4`. Ge `body` `bg-stone-100`.',
        starterCode: `<!-- Steg 1: sidhuvudet -->
${TW_RAD}
<body>
  <header>
    <span class="text-xl font-bold">📓 Mias blogg</span>
    <nav>
      <a href="#">Inlägg</a>
      <a href="#">Om mig</a>
    </nav>
  </header>
  <main>
    <article><p class="datum">3 mars</p><h2>Min första kaka</h2><p>Den blev platt, men god!</p></article>
    <article><p class="datum">10 mars</p><h2>Vi har fått en kanin</h2><p>Hon heter Smulan.</p></article>
  </main>
</body>
`,
        solution: `${TW_RAD}
<body class="bg-stone-100">
  <header class="flex justify-between items-center p-4 bg-white shadow-sm">
    <span class="text-xl font-bold">📓 Mias blogg</span>
    <nav class="flex gap-4">
      <a href="#">Inlägg</a>
      <a href="#">Om mig</a>
    </nav>
  </header>
  <main>
    <article><p class="datum">3 mars</p><h2>Min första kaka</h2><p>Den blev platt, men god!</p></article>
    <article><p class="datum">10 mars</p><h2>Vi har fått en kanin</h2><p>Hon heter Smulan.</p></article>
  </main>
</body>
`,
        hints: [
          'Sex klasser på header, två på nav och en på body.',
          'flex justify-between items-center är sidhuvudets tre viktigaste.',
          '<header class="flex justify-between items-center p-4 bg-white shadow-sm">',
        ],
        tests: [
          {
            description: 'Namnet och menyn står på en rad, utspridda',
            code: "[rows('header > *'), css('header', 'justify-content')]",
            expected: [1, 'space-between'],
          },
          {
            description: 'Länkarna har 16px emellan',
            code: "gapX('nav a')",
            expected: 16,
          },
          {
            description: 'Sidhuvudet är vitt på en stone-100-sida',
            code: "[twColor('header', 'background-color'), twColor('body', 'background-color')]",
            expected: ['white', 'stone-100'],
          },
        ],
      },
      {
        title: 'Inläggen',
        why: 'max-w-2xl håller raderna lagom långa, och grid gap-6 ger samma luft mellan alla inlägg.',
        xp: 20,
        description: 'Inläggen går över hela bredden och står tätt.',
        task: 'Uppgift: Ge `main` `max-w-2xl`, `mx-auto`, `p-4`, `grid` och `gap-6`. Ge varje `article` `bg-white`, `rounded-lg` och `p-6`.',
        solution: `${TW_RAD}
<body class="bg-stone-100">
  <header class="flex justify-between items-center p-4 bg-white shadow-sm">
    <span class="text-xl font-bold">📓 Mias blogg</span>
    <nav class="flex gap-4">
      <a href="#">Inlägg</a>
      <a href="#">Om mig</a>
    </nav>
  </header>
  <main class="max-w-2xl mx-auto p-4 grid gap-6">
    <article class="bg-white rounded-lg p-6"><p class="datum">3 mars</p><h2>Min första kaka</h2><p>Den blev platt, men god!</p></article>
    <article class="bg-white rounded-lg p-6"><p class="datum">10 mars</p><h2>Vi har fått en kanin</h2><p>Hon heter Smulan.</p></article>
  </main>
</body>
`,
        hints: [
          'Fem klasser på main och tre på varje article.',
          'max-w-2xl är högst 672 pixlar.',
          '<main class="max-w-2xl mx-auto p-4 grid gap-6">',
        ],
        tests: [
          {
            description: 'main är 672px bred och står i mitten',
            code: "[widths('main')[0], centered('main')]",
            expected: [672, true],
          },
          {
            description: 'Det är 24px mellan inläggen',
            code: "gapY('article')",
            expected: 24,
          },
          {
            description: 'Inläggen är vita med 8px hörn och 24px padding',
            code: "[twColor('article', 'background-color'), css('article', 'border-radius'), px('article', 'padding-top')]",
            expected: ['white', '8px', 24],
          },
        ],
      },
      {
        title: 'Datum och hover',
        why: 'Ett litet grått datum i versaler ser ut som på riktiga bloggar. En skugga när musen är över visar att inlägget går att trycka på.',
        xp: 20,
        description:
          'Datumet ser ut som vanlig text, och inget händer när musen är över ett inlägg.',
        task: 'Uppgift: Ge varje `.datum` `text-sm`, `text-stone-500` och `uppercase`. Ge varje `h2` `text-2xl` och `font-bold`. Ge varje `article` `hover:shadow-lg`.',
        solution: `${TW_RAD}
<body class="bg-stone-100">
  <header class="flex justify-between items-center p-4 bg-white shadow-sm">
    <span class="text-xl font-bold">📓 Mias blogg</span>
    <nav class="flex gap-4">
      <a href="#">Inlägg</a>
      <a href="#">Om mig</a>
    </nav>
  </header>
  <main class="max-w-2xl mx-auto p-4 grid gap-6">
    <article class="bg-white rounded-lg p-6 hover:shadow-lg"><p class="datum text-sm text-stone-500 uppercase">3 mars</p><h2 class="text-2xl font-bold">Min första kaka</h2><p>Den blev platt, men god!</p></article>
    <article class="bg-white rounded-lg p-6 hover:shadow-lg"><p class="datum text-sm text-stone-500 uppercase">10 mars</p><h2 class="text-2xl font-bold">Vi har fått en kanin</h2><p>Hon heter Smulan.</p></article>
  </main>
</body>
`,
        hints: [
          'Tre klasser på varje .datum, två på varje h2 och en ny på varje article.',
          'text-sm är storleken, text-stone-500 färgen.',
          '<article class="bg-white rounded-lg p-6 hover:shadow-lg">',
        ],
        tests: [
          {
            description: 'Datumet är litet, grått och i versaler',
            code: "[px('.datum', 'font-size'), twColor('.datum'), css('.datum', 'text-transform')]",
            expected: [14, 'stone-500', 'uppercase'],
          },
          {
            description: 'Rubrikerna är 24px och feta',
            code: "[px('h2', 'font-size'), css('h2', 'font-weight')]",
            expected: [24, '700'],
          },
          {
            description: 'Inläggen får en skugga när musen är över',
            code: "hover('article', 'box-shadow') !== null",
            expected: true,
          },
        ],
      },
    ],
  },
];

// Stegen som vanliga övningar, så att samma editor och rättning kan
// användas. Ett steg utan egen startkod börjar med förra stegets lösning.
export const PROJECT_STEPS = projectSteps(PROJECTS, text => `<!-- ${text} -->`);
