// Läser CodeMirrors syntaxträd för HTML (och CSS i <style>) och svarar på
// "vad är det här och vad tillhör det?" när man håller musen över koden.
// Förklaringarna säger *när* man tar till något, inte bara vad det är.
import { guessTag, VOID_TAGS } from '../runner/htmlWarnings';
import {
  closest,
  CSS_PROPERTIES as KNOWN_PROPERTIES,
} from '../runner/cssWarnings';
import { tailwindInfo } from './tailwindInfo';

const TAGS = {
  html: 'Hela sidan. Allt utom `<!doctype html>` står inuti den. `lang` på den säger sidans språk.',
  head: 'Information om sidan som inte syns: titeln, teckenkodningen och CSS. Står före `body`.',
  body: 'Allt som syns på sidan. Rubriker, stycken och bilder står här.',
  title:
    'Sidans namn. Syns i webbläsarens flik, i bokmärken och på Google – inte på själva sidan. Står i `head`.',
  meta: 'Information om sidan för webbläsaren, t.ex. `charset="utf-8"` så att å, ä och ö blir rätt. Står i `head`.',
  link: 'Kopplar in en annan fil, oftast en CSS-fil: `<link rel="stylesheet" href="stil.css">`.',
  style:
    'CSS direkt i sidan. Här bestämmer du hur saker ser ut: färger, storlekar och placering.',
  script:
    'JavaScript – det som gör sidan interaktiv. Det lär du dig i JS Academy.',
  h1: 'Sidans största rubrik – sidans namn. Oftast bara en per sida.',
  h2: 'Rubrik på nivå 2, för sidans delar. Hör till `h1` ovanför.',
  h3: 'Rubrik på nivå 3, för delar av en `h2`-del.',
  h4: 'Rubrik på nivå 4. Välj nivå efter ordningen, inte efter storleken.',
  h5: 'Rubrik på nivå 5. Behövs sällan.',
  h6: 'Den minsta rubriken, nivå 6. Det finns ingen `h7`.',
  p: 'Ett stycke text (paragraph). Ett nytt stycke är en ny `p` – tomma rader i koden syns inte.',
  strong:
    'Något viktigt. Visas fetstilt. Använd på enstaka ord, annars sticker inget ut.',
  em: 'Betoning, som när man säger ett ord lite starkare. Visas kursivt.',
  b: 'Fetstil utan extra betydelse. Vill du säga att något är viktigt: ta `strong`.',
  i: 'Kursiv utan extra betydelse, t.ex. ett namn på ett skepp. För betoning: ta `em`.',
  br: 'Ny rad mitt i ett stycke, som i en dikt eller adress. Stängs aldrig. Ett nytt stycke är en ny `p`, inte två `br`.',
  hr: 'En linje tvärs över sidan: här börjar något nytt. Stängs aldrig.',
  a: 'En länk. Vart den går står i `href`. Texten mellan taggarna är det man klickar på – låt den säga vart länken går.',
  img: 'En bild. `src` säger var filen finns och `alt` vad bilden visar. Stängs aldrig.',
  ul: 'En punktlista – när ordningen inte spelar roll. Varje sak är ett `li`.',
  ol: 'En numrerad lista – när ordningen spelar roll, som stegen i ett recept. Varje sak är ett `li`.',
  li: 'En sak i en lista. Står alltid inuti `ul` eller `ol`.',
  table:
    'En tabell, för data i rader och kolumner. Inte för att placera saker på sidan – det gör CSS.',
  tr: 'En rad i en tabell (table row). Alla rader ska ha lika många celler.',
  td: 'En cell i en tabell (table data).',
  th: 'En rubrikcell i en tabell. Skärmläsare läser upp den före värdena i kolumnen.',
  thead: 'Tabellens huvud, med rubrikraden.',
  tbody: 'Tabellens kropp, med raderna med data.',
  tfoot: 'Tabellens fot, t.ex. en rad med summan.',
  caption: 'Tabellens rubrik. Står först i `table`.',
  header: 'Sidhuvudet, med sidans namn och ofta menyn.',
  nav: 'Sidans huvudmeny. Skärmläsare kan hoppa direkt hit – eller förbi.',
  main: 'Sidans huvudinnehåll. Bara en per sida, och inte i `header` eller `footer`.',
  section:
    'Ett avsnitt som hör ihop, oftast med en egen rubrik. Som ett kapitel.',
  article:
    'Något som är helt i sig självt: ett inlägg, en nyhet, en recension. Skulle kunna stå på en annan sida.',
  aside: 'Något vid sidan av huvudinnehållet, som en faktaruta.',
  footer: 'Sidfoten, med sådant som ©, kontakt och adress.',
  div: 'En låda utan betydelse. Ta den när ingen annan tagg passar, oftast för att hänga CSS på.',
  span: 'En bit text utan betydelse, mitt i en rad. Oftast för att ge just den biten CSS.',
  form: 'Ett formulär. Samlar fälten och skickar dem när man trycker på knappen.',
  label:
    'Etiketten till ett fält. `for` pekar på fältets `id`. Då läses den upp när man hamnar i fältet, och man kan klicka på den.',
  input:
    'Ett fält att fylla i. `type` bestämmer vilket: text, email, number, checkbox … Stängs aldrig.',
  textarea:
    'Ett textfält med flera rader, för meddelanden. Stängs med `</textarea>`.',
  select: 'En rullgardinsmeny. Varje val är en `option`.',
  option: 'Ett val i en `select`. Texten syns, `value` är det som skickas.',
  button:
    'En knapp. I ett formulär skickar den formuläret. Texten mellan taggarna står på knappen.',
  fieldset: 'Samlar fält som hör ihop, t.ex. radioknappar till en fråga.',
  legend:
    'Rubriken till en `fieldset` – frågan. Läses upp före varje fält i gruppen.',
  figure: 'En bild (eller kod, eller diagram) med en bildtext.',
  figcaption: 'Bildtexten i en `figure`.',
  blockquote: 'Ett längre citat.',
  q: 'Ett kort citat inuti en mening.',
  code: 'Kod mitt i en text. Visas med fast bredd på bokstäverna.',
  pre: 'Text där mellanslag och radbrytningar syns precis som du skrev dem.',
  small: 'Det finstilta, som villkor eller ©.',
  mark: 'Markerad text, som med överstrykningspenna.',
  time: 'Ett datum eller en tid. `datetime` säger det så att datorer förstår.',
  iframe: 'En annan sida inuti din sida, t.ex. en karta eller en video.',
  video: 'En video. `controls` ger knappar för play och paus.',
  audio: 'Ljud. `controls` ger knappar för play och paus.',
};

// Attribut som betyder samma sak på alla taggar, och några som beror på
// taggen (tagg.attribut).
const ATTRIBUTES = {
  href: 'Vart länken går: en webbadress, en sökväg till en fil, `#id` på samma sida, `mailto:` eller `tel:`.',
  src: 'Var bilden finns: en sökväg som `bilder/katt.svg` eller en webbadress.',
  alt: 'Beskriver bilden för den som inte ser den. Är bilden bara pynt: `alt=""`. Är bilden en länk: säg vart den går.',
  width:
    'Bredden i pixlar, utan `px`. Sätter du bara bredden räknar webbläsaren ut höjden.',
  height: 'Höjden i pixlar, utan `px`.',
  target:
    '`_blank` öppnar länken i en ny flik. Använd sparsamt – de flesta vill välja själva.',
  id: 'Ett namn som är unikt på sidan. Används för `#id`-länkar, för `label for` och i CSS med `#`.',
  class:
    'Ett eller flera namn att hänga CSS på, med mellanslag emellan. Får användas på många element – till skillnad från `id`.',
  style:
    'CSS direkt på ett element. Fungerar, men CSS i `<style>` är lättare att ändra på ett ställe.',
  lang: 'Sidans språk, `sv` för svenska. Skärmläsare väljer röst efter det.',
  charset: 'Teckenkodningen. `utf-8` gör att å, ä, ö och emoji blir rätt.',
  for: 'Pekar på `id` hos fältet som etiketten hör till.',
  type: 'Vilken sorts fält det är.',
  name: 'Namnet som skickas med värdet: `namn=Ada`. Utan `name` skickas fältet inte alls. Radioknappar med samma `name` hör ihop.',
  value:
    'Värdet som skickas. För kryssrutor och radioknappar: det som skickas när den är vald.',
  placeholder:
    'Grå exempeltext som försvinner när man skriver. Ersätter aldrig en `label`.',
  required:
    'Måste fyllas i. Webbläsaren stoppar och säger till om fältet är tomt.',
  checked: 'Kryssrutan eller radioknappen är vald från början.',
  disabled: 'Fältet eller knappen går inte att använda.',
  rows: 'Hur många rader högt ett `textarea` är.',
  min: 'Det minsta talet man får skriva.',
  max: 'Det största talet man får skriva.',
  colspan: 'Hur många kolumner cellen sträcker sig över.',
  rowspan: 'Hur många rader cellen sträcker sig över.',
  reversed: 'Den numrerade listan räknar baklänges.',
  start: 'Talet den numrerade listan börjar på.',
  title: 'En liten text som visas när man håller musen över elementet.',
  rel: 'Hur den länkade filen hör ihop med sidan. `stylesheet` för CSS.',
  action: 'Vart formuläret skickas.',
  method: '`get` lägger svaren i adressen, `post` skickar dem gömt.',
  controls: 'Visar knappar för play, paus och volym.',
  'button.type':
    '`submit` skickar formuläret (det gör knappen ändå), `button` gör ingenting av sig själv.',
  'meta.name':
    'Vilken sorts information. `viewport` styr hur sidan visas på mobilen.',
  'meta.content': 'Själva informationen till `name`.',
};

const INPUT_TYPES = {
  text: 'Ett vanligt textfält på en rad.',
  email:
    'E-post. Mobilen visar @ på tangentbordet och webbläsaren kollar att det ser ut som en adress.',
  number: 'Bara siffror, med pilar för att öka och minska.',
  password: 'Lösenord – det man skriver syns som prickar.',
  tel: 'Telefonnummer. Mobilen visar sifferknapparna.',
  checkbox: 'En kryssruta: på eller av. Skickas bara när den är ikryssad.',
  radio: 'En radioknapp. Bara en i gruppen (samma `name`) kan vara vald.',
  date: 'Ett datum, med en kalender att välja i.',
  color: 'En färgväljare.',
  range: 'Ett reglage att dra i, mellan `min` och `max`.',
  search: 'Ett sökfält.',
  url: 'En webbadress.',
  submit: 'En knapp som skickar formuläret. `<button>` är oftast enklare.',
};

const ENTITIES = {
  '&lt;': 'Blir `<`. Behövs när du vill visa en tagg som text.',
  '&gt;': 'Blir `>`.',
  '&amp;': 'Blir `&`.',
  '&copy;': 'Blir ©.',
  '&nbsp;': 'Ett mellanslag som inte får bryta raden, t.ex. mellan 10 och kr.',
  '&quot;': 'Blir ett citattecken: ".',
  '&hellip;': 'Blir …',
  '&ndash;': 'Blir ett tankstreck: –',
};

const CSS_PROPERTIES = {
  color: 'Textens färg.',
  background:
    'Bakgrunden: en färg, en bild eller båda. Kortform för flera `background-`-egenskaper.',
  'background-color': 'Bakgrundens färg.',
  'font-family':
    'Typsnittet. Skriv flera med komma emellan – webbläsaren tar det första den har.',
  'font-size': 'Textens storlek, t.ex. `1.5rem` eller `24px`.',
  'font-weight': 'Hur fet texten är: `normal`, `bold` eller ett tal som `700`.',
  'font-style': '`italic` gör texten kursiv.',
  'text-align': 'Var texten ställer sig: `left`, `center` eller `right`.',
  'text-decoration':
    'Streck under eller genom texten. `none` tar bort strecket under länkar.',
  'line-height':
    'Avståndet mellan raderna. Ett tal utan enhet, som `1.5`, är 1,5 gånger textens storlek.',
  margin:
    'Luft *utanför* elementets kant. Ett värde gäller alla sidor; fyra går medurs: uppe, höger, nere, vänster.',
  padding: 'Luft *innanför* elementets kant, mellan kanten och innehållet.',
  border:
    'Kanten runt elementet: tjocklek, stil och färg, t.ex. `2px solid black`.',
  'border-radius': 'Rundar hörnen. `50%` på en kvadrat ger en cirkel.',
  width: 'Bredden. Med `%` räknas den från elementet runt omkring.',
  height:
    'Höjden. Låt den oftast vara – innehållet bestämmer hur högt det blir.',
  'max-width':
    'Elementet blir aldrig bredare än så här, men får krympa. Bra för text och bilder på mobilen.',
  'min-height': 'Elementet blir aldrig lägre än så här.',
  'box-sizing':
    '`border-box` gör att `width` räknas med padding och kant – mycket lättare att räkna med.',
  display:
    'Hur elementet ställer sig: `block` (egen rad), `inline` (i texten), `flex`, `grid` eller `none` (dolt).',
  'flex-direction':
    'Åt vilket håll flex-raden går: `row` (åt sidan) eller `column` (nedåt).',
  'justify-content':
    'Hur sakerna fördelas längs raden: `center`, `space-between` …',
  'align-items': 'Hur sakerna ställer sig på tvären, t.ex. `center`.',
  'flex-wrap':
    '`wrap` låter sakerna gå vidare på en ny rad när de inte får plats.',
  flex: 'Hur mycket av den lediga platsen elementet tar. `1` på alla gör dem lika breda.',
  gap: 'Mellanrummet mellan sakerna i en flex eller grid – utan margin.',
  'grid-template-columns':
    'Kolumnerna i ett grid. `1fr 1fr 1fr` ger tre lika breda.',
  'grid-template-rows': 'Raderna i ett grid.',
  'grid-template-areas':
    'Ritar upp gridet med namn, rad för rad, t.ex. `"huvud huvud" "meny innehåll"`.',
  'grid-area': 'Vilket namngivet område i gridet elementet hamnar i.',
  'grid-column':
    'Vilka kolumner elementet sträcker sig över: `span 2` (två kolumner) eller `1 / -1` (hela bredden).',
  'grid-row': 'Vilka rader elementet sträcker sig över, t.ex. `span 2`.',
  'grid-auto-rows': 'Hur höga raderna i griddet blir, t.ex. `100px`.',
  'align-self':
    'Som `align-items`, men bara för det här elementet. `flex-end` skjuter det till slutet.',
  'flex-grow': 'Hur mycket av den lediga platsen elementet tar.',
  'row-gap': 'Luften mellan raderna i en flex eller grid.',
  'column-gap': 'Luften mellan kolumnerna i en flex eller grid.',
  'min-width':
    'Elementet blir aldrig smalare än så här. I en flexbox med `flex-wrap` hoppar det hellre ner på nästa rad.',
  'list-style-type': '`none` tar bort punkterna i en lista.',
  position:
    'Hur elementet placeras. `relative`, `absolute`, `fixed` eller `sticky`.',
  top: 'Avståndet från toppen, när `position` inte är `static`.',
  left: 'Avståndet från vänster, när `position` inte är `static`.',
  'z-index':
    'Vad som ligger överst när saker överlappar. Högre tal hamnar ovanpå.',
  opacity: 'Hur genomskinligt det är, från `0` (osynligt) till `1`.',
  'list-style': '`none` tar bort punkterna i en lista.',
  cursor:
    'Musens utseende över elementet. `pointer` ger en hand, som över en länk.',
  'box-shadow': 'En skugga runt elementet.',
  transition:
    'Gör att ändringar, t.ex. vid `:hover`, sker mjukt i stället för direkt.',
  'object-fit': '`cover` fyller rutan med bilden utan att den blir utdragen.',
  'text-transform':
    '`uppercase` gör all text till versaler, utan att ändra i HTML:en.',
  'letter-spacing': 'Avståndet mellan bokstäverna.',
  'border-color': 'Kantens färg.',
  'border-width': 'Kantens tjocklek.',
  'border-style': 'Kantens stil: `solid`, `dashed`, `dotted` eller `none`.',
  'text-decoration-line': 'Strecket: `underline`, `line-through` eller `none`.',
  overflow:
    'Vad som händer med innehåll som inte får plats: `hidden`, `auto` …',
};

const CSS_VALUES = {
  flex: 'Gör elementet till en flexbox: barnen ställer sig på en rad.',
  grid: 'Gör elementet till ett grid: barnen placeras i rader och kolumner.',
  block: 'Elementet tar en hel rad, som `p` och `div`.',
  inline: 'Elementet står i texten, som `span` och `a`.',
  'inline-block': 'Står i texten men kan få bredd och höjd.',
  none: 'Ingenting. För `display`: elementet döljs helt.',
  center: 'I mitten.',
  'space-between':
    'Första och sista hamnar vid kanterna, luften fördelas mellan.',
  'space-around': 'Lika mycket luft runt varje sak.',
  bold: 'Fet text.',
  italic: 'Kursiv text.',
  auto: 'Låt webbläsaren räkna ut det. `margin: 0 auto` centrerar ett element med en bredd.',
  'border-box': 'Bredden räknas med padding och kant. Det de flesta vill ha.',
  solid: 'En hel linje.',
  dashed: 'En streckad linje.',
  dotted: 'En prickad linje.',
  'flex-start': 'I början: till vänster, eller uppe.',
  'flex-end': 'I slutet: till höger, eller nere.',
  stretch:
    'Utsträckt så att det fyller hela platsen. Det vanliga i en flexbox.',
  'space-evenly': 'Lika mycket luft överallt, även vid kanterna.',
  span: 'Sträck dig över så många rader eller kolumner som talet efter säger.',
  'device-width': 'Skärmens riktiga bredd. Står i viewport-raden.',
  row: 'Åt sidan, på en rad.',
  column: 'Nedåt, i en kolumn.',
  wrap: 'Gå vidare på en ny rad när det inte får plats.',
  pointer: 'En hand, som över en länk.',
  'sans-serif':
    'Ett typsnitt utan små klackar på bokstäverna. Lätt att läsa på skärm.',
  serif: 'Ett typsnitt med små klackar på bokstäverna, som i en bok.',
  monospace: 'Ett typsnitt där alla bokstäver är lika breda, som för kod.',
  sticky: 'Följer med när man skrollar, tills dess förälder tar slut.',
  relative: 'Flyttas från där det annars hade stått.',
  absolute:
    'Lyfts ur flödet och placeras mot närmaste förälder med `position`.',
  fixed: 'Sitter fast på skärmen, även när man skrollar.',
};

const UNITS = {
  px: 'Pixlar – en fast storlek.',
  rem: 'Gånger textstorleken på sidan (oftast 16px). `2rem` är 32px. Växer om användaren har valt större text.',
  em: 'Gånger elementets egen textstorlek.',
  '%': 'Procent av elementet runt omkring.',
  fr: 'En del av den lediga platsen i ett grid. `1fr 2fr` ger en tredjedel och två tredjedelar.',
  vh: 'Procent av fönstrets höjd. `100vh` är hela skärmen.',
  vw: 'Procent av fönstrets bredd.',
};

const PSEUDO = {
  hover: 'När musen är över elementet.',
  focus: 'När elementet är valt, t.ex. ett fält man skriver i.',
  'first-child': 'Det första barnet i sin förälder.',
  'last-child': 'Det sista barnet i sin förälder.',
  'nth-child': 'Barn nummer n, t.ex. `:nth-child(2)` eller `:nth-child(odd)`.',
  visited: 'En länk man redan har besökt.',
};

const SIDES = {
  top: 'uppe',
  right: 'till höger',
  bottom: 'nere',
  left: 'till vänster',
};
const PARTS = {
  width: 'Tjockleken på',
  color: 'Färgen på',
  style: 'Stilen på',
};

// margin-top, border-left-color och de andra som gäller en sida.
function aboutSide(name) {
  const parts = name.match(
    /^(margin|padding|border)-(top|right|bottom|left)(?:-(width|color|style))?$/,
  );
  if (!parts) return null;
  const [, box, side, part] = parts;
  if (part) return `${PARTS[part]} kanten ${SIDES[side]}.`;
  if (box === 'border') {
    return `Kanten bara ${SIDES[side]}: tjocklek, stil och färg, t.ex. \`2px solid black\`.`;
  }
  return box === 'margin'
    ? `Luft *utanför* kanten, bara ${SIDES[side]}.`
    : `Luft *innanför* kanten, bara ${SIDES[side]}.`;
}

const text = (src, node) => src.slice(node.from, node.to);
const lineOf = (src, pos) => src.slice(0, pos).split('\n').length;

function tagOf(src, element) {
  const tag = element?.firstChild;
  const name = tag?.getChild('TagName');
  return name ? text(src, name).toLowerCase() : null;
}

// Var en öppnande tagg stängs, och vilken tagg den ligger i.
function belongs(src, tagName) {
  const tag = tagName.parent;
  const element = tag.parent;
  const name = text(src, tagName).toLowerCase();
  const parts = [];
  if (tag.name === 'CloseTag') {
    const opened = element.firstChild;
    parts.push(`Stänger \`<${name}>\` från rad ${lineOf(src, opened.from)}.`);
  } else if (tag.name === 'MismatchedCloseTag') {
    parts.push(
      `Det finns ingen öppen \`<${name}>\` att stänga här – kolla stavningen, eller om den redan är stängd.`,
    );
  } else if (VOID_TAGS.has(name) || tag.name === 'SelfClosingTag') {
    parts.push('Har inget innehåll och stängs aldrig.');
  } else {
    const close = element.getChild('CloseTag');
    parts.push(
      close
        ? `Stängs på rad ${lineOf(src, close.from)}.`
        : `Stängs aldrig – skriv \`</${name}>\` där den ska sluta.`,
    );
  }
  if (tag.name !== 'MismatchedCloseTag') {
    const outer = element.parent;
    const outerName = outer?.name === 'Element' ? tagOf(src, outer) : null;
    if (outerName) {
      parts.push(
        `Ligger i \`<${outerName}>\` från rad ${lineOf(src, outer.from)}.`,
      );
    }
  }
  return parts.join(' ');
}

function describeTag(src, node) {
  const name = text(src, node).toLowerCase();
  const about = TAGS[name];
  if (!about) {
    const meant = guessTag(name);
    return {
      title: `<${name}>`,
      body:
        `Den här taggen finns inte i HTML, så webbläsaren vet inte vad den är.` +
        (meant ? ` Menade du \`<${meant}>\`?` : ''),
    };
  }
  return { title: `<${name}>`, body: `${about} ${belongs(src, node)}` };
}

function attributeParts(src, node) {
  const attribute = node.parent;
  const tag = tagOf(src, attribute.parent.parent);
  const name = text(src, attribute.getChild('AttributeName')).toLowerCase();
  const valueNode = attribute.getChild('AttributeValue');
  const value = valueNode
    ? text(src, valueNode).replace(/^["']|["']$/g, '')
    : '';
  return { tag, name, value };
}

function describeAttribute(src, node) {
  const { tag, name } = attributeParts(src, node);
  const about = ATTRIBUTES[`${tag}.${name}`] ?? ATTRIBUTES[name];
  if (!about) return null;
  return { title: name, body: `${about} Attribut på \`<${tag}>\`.` };
}

function describeHref(value) {
  if (value.startsWith('#')) {
    return value === '#'
      ? 'Bara `#` går till toppen av sidan. Skriv ett id efter, t.ex. `#recept`.'
      : `Hoppar till elementet med \`id="${value.slice(1)}"\` på samma sida.`;
  }
  if (value.startsWith('mailto:'))
    return 'Öppnar mejlprogrammet med adressen ifylld.';
  if (value.startsWith('tel:'))
    return 'Ringer numret på en mobil. Skriv det utan mellanslag, med landskod.';
  if (/^https?:\/\//.test(value)) return 'En adress till en annan webbplats.';
  return 'En sökväg till en fil, räknat från mappen sidan ligger i.';
}

function describeValue(src, node) {
  const { tag, name, value } = attributeParts(src, node);
  let body = null;
  if (name === 'type' && tag === 'input') {
    body =
      INPUT_TYPES[value] ??
      `\`${value}\` är ingen typ som finns – då blir det ett vanligt textfält.`;
  } else if (name === 'href') {
    body = describeHref(value);
  } else if (name === 'src') {
    body = /^https?:\/\//.test(value)
      ? 'En bild från en annan webbplats. Den kan försvinna om de flyttar den.'
      : 'En sökväg till bildfilen, räknat från mappen sidan ligger i.';
  } else if (name === 'target' && value === '_blank') {
    body = 'Öppnar länken i en ny flik.';
  } else if (name === 'lang') {
    body = value === 'sv' ? 'Svenska.' : value === 'en' ? 'Engelska.' : null;
  } else if (name === 'alt' && value === '') {
    body =
      'Tom alt-text: bilden är bara pynt, och skärmläsare hoppar över den.';
  }
  return body && { title: `${name}="${value}"`, body };
}

// Ordet under musen i class="…", om det är en Tailwind-klass.
function classAt(src, node, pos) {
  if (attributeParts(src, node).name !== 'class') return null;
  const value = text(src, node);
  const offset = pos - node.from;
  for (const match of value.matchAll(/[^\s"']+/g)) {
    if (offset < match.index || offset > match.index + match[0].length) {
      continue;
    }
    const info = tailwindInfo(match[0]);
    const from = node.from + match.index;
    return info && { from, to: from + match[0].length, ...info };
  }
  return null;
}

// CSS-regeln som en egenskap står i, t.ex. "h1 .kort".
function selectorOf(src, node) {
  for (let parent = node.parent; parent; parent = parent.parent) {
    if (parent.name === 'RuleSet') {
      return text(src, parent.firstChild).trim();
    }
    if (parent.name === 'Attribute') return 'det här elementet';
  }
  return null;
}

function describeCss(src, node) {
  const value = text(src, node);
  switch (node.name) {
    case 'PropertyName': {
      const about = CSS_PROPERTIES[value] ?? aboutSide(value);
      if (!about) {
        if (KNOWN_PROPERTIES.has(value) || value.startsWith('-')) return null;
        const meant = closest(value, KNOWN_PROPERTIES);
        return {
          title: value,
          body:
            'Den här egenskapen finns inte i CSS, så webbläsaren hoppar över raden.' +
            (meant ? ` Menade du \`${meant}\`?` : ''),
        };
      }
      const selector = selectorOf(src, node);
      return {
        title: value,
        body: selector ? `${about} Gäller \`${selector}\`.` : about,
      };
    }
    case 'ValueName':
      return CSS_VALUES[value]
        ? { title: value, body: CSS_VALUES[value] }
        : null;
    case 'ColorLiteral':
      return {
        title: value,
        body: 'En färg skriven som hex: rött, grönt och blått, två tecken var från `00` till `ff`.',
      };
    case 'ClassName':
      return {
        title: `.${value}`,
        body: `Väljer alla element med \`class="${value}"\`. Punkten betyder klass.`,
      };
    case 'IdName':
      return {
        title: value,
        body: `Väljer elementet med \`id="${value.slice(1)}"\`. Brädgården betyder id.`,
      };
    case 'TagName':
      return {
        title: value,
        body: `Väljer alla \`<${value}>\` på sidan.`,
      };
    case 'PseudoClassName':
      return PSEUDO[value] ? { title: `:${value}`, body: PSEUDO[value] } : null;
    case 'media':
      return {
        title: '@media',
        body: 'Reglerna inuti gäller bara när villkoret stämmer, t.ex. på smala skärmar. Så gör man sidor som fungerar på mobilen.',
      };
    case 'FeatureName':
      return value === 'max-width'
        ? {
            title: value,
            body: 'Gäller när fönstret är högst så här brett – mobilen.',
          }
        : value === 'min-width'
          ? {
              title: value,
              body: 'Gäller när fönstret är minst så här brett – större skärmar.',
            }
          : null;
    default:
      return null;
  }
}

// Ger { from, to, title, body } för det som står vid pos, eller null.
export function describeAt(tree, src, pos, side = 1) {
  let node = tree.resolveInner(pos, side);
  if (node.name === 'Unit') node = node.parent;
  let info;

  if (node.name === 'TagName' && node.parent?.name !== 'TagSelector') {
    info = describeTag(src, node);
  } else if (node.name === 'AttributeName') {
    info = describeAttribute(src, node);
  } else if (node.name === 'AttributeValue') {
    const word = classAt(src, node, pos);
    if (word) return word;
    info = describeValue(src, node);
  } else if (node.name === 'EntityReference') {
    const entity = text(src, node);
    info = ENTITIES[entity] && { title: entity, body: ENTITIES[entity] };
  } else if (node.name === 'Comment') {
    info = {
      title: '<!-- -->',
      body: 'En kommentar. Syns inte på sidan – den är till för den som läser koden. Cmd/Ctrl+/ gör om en rad till kommentar.',
    };
  } else if (node.name === 'DoctypeDecl') {
    info = {
      title: '<!doctype html>',
      body: 'Säger att det här är modern HTML. Står allra först på sidan.',
    };
  } else if (node.name === 'NumberLiteral') {
    const unit = node.getChild('Unit');
    const name = unit ? text(src, unit) : '';
    info = UNITS[name] && { title: text(src, node), body: UNITS[name] };
  } else {
    info = describeCss(src, node);
  }

  return info && { from: node.from, to: node.to, ...info };
}
