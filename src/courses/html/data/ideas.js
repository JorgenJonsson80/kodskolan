// Egna sidor att bygga på Lekplatsen när ett projekt på banan är klart.
// Här finns inga tester – eleven bestämmer själv när det är klart.
// Idéerna använder bara det man lärt sig fram till och med banan.
// goals: vad sidan ska ha. extra: för den som vill ha mer.
export const IDEAS = [
  {
    id: 'idea-husdjur',
    track: 'grunder',
    emoji: '🐹',
    title: 'Mitt husdjur',
    summary: 'En sida om ditt husdjur – eller djuret du drömmer om.',
    goals: [
      'Djurets namn i en `h1`.',
      'Minst två delar med `h2`, till exempel `Det äter` och `Det gör det helst`.',
      'Det djuret är bäst på i `strong`.',
    ],
    extra: 'Lägg till en dikt om djuret med `<br>` mellan raderna.',
  },
  {
    id: 'idea-lat',
    track: 'grunder',
    emoji: '🎵',
    title: 'Min favoritlåt',
    summary: 'Texten till en låt du gillar, eller en du hittat på själv.',
    goals: [
      'Låtens namn i en `h1` och artisten i `em` under.',
      'Varje vers i ett eget stycke, med `<br>` mellan raderna.',
      'En `<hr>` före refrängen.',
    ],
    extra: 'Skriv `&copy;` och vem som äger låten längst ner.',
  },
  {
    id: 'idea-dagbok',
    track: 'grunder',
    emoji: '📔',
    title: 'Dagboken',
    summary: 'Tre dagar ur ditt liv, med en rubrik för varje dag.',
    goals: [
      'Dagboken har ett namn i en `h1`.',
      'En `h2` med datum för varje dag, och ett eller två stycken under.',
      'En kommentar med något hemligt som inte syns på sidan.',
    ],
    extra: 'Använd `h3` för delar av en dag, som `Morgon` och `Kväll`.',
  },
  {
    id: 'idea-fansida',
    track: 'lankar',
    emoji: '⭐',
    title: 'Fansidan',
    summary: 'En sida om någon eller något du är ett fan av.',
    goals: [
      'En bild med en alt-text som beskriver den.',
      'Minst tre länkar till mer att läsa, med länktexter som säger något.',
      'Länkar som lämnar sidan öppnas i en ny flik.',
    ],
    extra:
      'Bilder från nätet fungerar också: högerklicka på en bild och välj "Kopiera bildadress".',
  },
  {
    id: 'idea-resa',
    track: 'lankar',
    emoji: '🧳',
    title: 'Resedagboken',
    summary: 'En resa du gjort, eller vill göra, med bilder och länkar.',
    goals: [
      'En `h2` för varje plats, med ett id.',
      'Länkar överst som hoppar till platserna.',
      'En länk till en karta eller Wikipedia för varje plats.',
    ],
    extra: 'Lägg till en "Till toppen"-länk efter varje plats.',
  },
  {
    id: 'idea-museum',
    track: 'lankar',
    emoji: '🏛️',
    title: 'Minimuseet',
    summary: 'Ett museum med tre föremål – på riktigt eller påhittade.',
    goals: [
      'Tre föremål, var och en med bild, namn i `h2` och ett stycke.',
      'Bilderna är länkar till mer om föremålet.',
      'Alt-texterna säger vart länkarna går.',
    ],
    extra: 'Lägg till en kontaktlänk med `mailto:` längst ner.',
  },
  {
    id: 'idea-bucket',
    track: 'listor',
    emoji: '🪣',
    title: 'Bucket list',
    summary: 'Allt du vill göra någon gång i livet.',
    goals: [
      'En punktlista med minst fem saker.',
      'Dela upp listan med `h2`, till exempel `I sommar` och `Någon gång`.',
      'Det du vill mest står i `strong`.',
    ],
    extra: 'Gör en inre lista under någon sak, med vad du behöver för den.',
  },
  {
    id: 'idea-recept',
    track: 'listor',
    emoji: '🍰',
    title: 'Receptet',
    summary: 'Ditt bästa recept, från ingredienser till färdig rätt.',
    goals: [
      'Ingredienserna i en punktlista.',
      'Stegen i en numrerad lista.',
      'En bild, och en tabell med tid och antal portioner.',
    ],
    extra: 'Lägg till en länk som hoppar ner till stegen.',
  },
  {
    id: 'idea-tabell',
    track: 'listor',
    emoji: '⚽',
    title: 'Matchtabellen',
    summary: 'En tabell över lagen i en liga – på riktigt eller påhittad.',
    goals: [
      'En `caption` och en `thead` med `Lag`, `Matcher` och `Poäng`.',
      'Minst fyra lag i `tbody`.',
      'Lagets namn är en `th` i varje rad.',
    ],
    extra:
      'Lägg till en rad sist med `colspan` som säger när tabellen uppdaterades.',
  },
  {
    id: 'idea-portfolio',
    track: 'struktur',
    emoji: '🎨',
    title: 'Portfolion',
    summary: 'En sida som visar upp det du har gjort – teckningar, kod, foton.',
    goals: [
      'Ett helt dokument med titel, språk och teckenkodning.',
      'header med ditt namn och en meny, main och footer.',
      'Varje sak du visar upp är en `article` med bild och rubrik.',
    ],
    extra: 'Lägg till ett avsnitt `Om mig` som menyn hoppar till.',
  },
  {
    id: 'idea-recension',
    track: 'struktur',
    emoji: '🎮',
    title: 'Spelrecensionen',
    summary: 'Recensera ett spel, en film eller en bok du gillar.',
    goals: [
      'Recensionen är en `article` i `main`.',
      'Avsnitt med `section` för `Handling`, `Bra` och `Mindre bra`.',
      'Ett betyg i en tabell eller lista.',
    ],
    extra:
      'Skriv två recensioner till och lägg alla i ett avsnitt `Recensioner`.',
  },
  {
    id: 'idea-skoltidning',
    track: 'struktur',
    emoji: '🗞️',
    title: 'Skoltidningen',
    summary: 'Förstasidan på en skoltidning med flera nyheter.',
    goals: [
      'Tidningens namn i `header` och en meny med avdelningar.',
      'Minst tre nyheter, var och en en `article` med `h2`.',
      'Utgivare och © i `footer`.',
    ],
    extra: 'Märk ut datumet i varje nyhet med en `span`.',
  },
  {
    id: 'idea-gastbok',
    track: 'formular',
    emoji: '📖',
    title: 'Gästboken',
    summary: 'Ett formulär där besökare kan lämna en hälsning.',
    goals: [
      'Fält för namn och hälsning, med etiketter.',
      'Hälsningen är ett `textarea` som måste fyllas i.',
      'Under formuläret några påhittade hälsningar som `article`.',
    ],
    extra: 'Låt besökaren välja ett humör med radioknappar: 😀 😐 😢.',
  },
  {
    id: 'idea-quiz',
    track: 'formular',
    emoji: '❓',
    title: 'Quizet',
    summary: 'Ett quiz med frågor om något du kan mycket om.',
    goals: [
      'Minst tre frågor, var och en i en `fieldset` med `legend`.',
      'Radioknappar för svaren, med samma `name` i varje fråga.',
      'En knapp som skickar svaren. Prova och se vad som skickas.',
    ],
    extra: 'Lägg till en fråga där man får välja flera svar.',
  },
  {
    id: 'idea-biljett',
    track: 'formular',
    emoji: '🎟️',
    title: 'Biljettbokningen',
    summary: 'Boka biljetter till en konsert, match eller bio.',
    goals: [
      'En meny för föreställning och ett sifferfält för antal biljetter.',
      'Namn och e-post, som måste fyllas i.',
      'En kryssruta för att godkänna villkoren.',
    ],
    extra:
      'Testa `min` och `max` på sifferfältet, så att man inte kan boka 1000 biljetter.',
  },
  {
    id: 'idea-regnbage',
    track: 'css',
    emoji: '🌈',
    title: 'Regnbågssidan',
    summary: 'En sida om regnbågen där varje rubrik har sin egen färg.',
    goals: [
      'En `h2` för varje färg i regnbågen, var och en i sin färg.',
      'En mörk bakgrund på `body` så att färgerna lyser.',
      'Ett eget typsnitt på hela sidan och en stor `h1`.',
    ],
    extra:
      'Ge varje rubrik en klass och byt färg med `:hover`, så att regnbågen ändras när musen är över.',
  },
  {
    id: 'idea-filmaffisch',
    track: 'css',
    emoji: '🎬',
    title: 'Filmaffischen',
    summary: 'En affisch för en film du gillar – eller en du hittar på.',
    goals: [
      'Filmens namn i en stor `h1` med ett kraftigt typsnitt.',
      'Skådespelarna i en klass med egen färg.',
      'Premiärdatumet i mitten, i en färg som sticker ut.',
    ],
    extra:
      'Prova en hexkod du hittar i en färgväljare, och gör all text versaler med `text-transform: uppercase`.',
  },
  {
    id: 'idea-bakverk',
    track: 'css',
    emoji: '🧁',
    title: 'Bakverkslistan',
    summary: 'Dina favoritbakverk med pris, färger och märkning.',
    goals: [
      'En lista med bakverk där priset står i `span` med en klass.',
      'Alla priser i samma färg med en enda regel.',
      'En klass för det populäraste bakverket som får en bakgrundsfärg.',
    ],
    extra: 'Lägg till en länk till receptet som byter färg vid `:hover`.',
  },
  {
    id: 'idea-samlarkort',
    track: 'boxen',
    emoji: '🃏',
    title: 'Samlarkortet',
    summary: 'Ett samlarkort för ett djur, en hjälte eller ett monster.',
    goals: [
      'Ett kort med fast bredd, padding, en tjock kant och runda hörn.',
      'En bild överst som aldrig blir bredare än kortet.',
      'Egenskaperna, till exempel styrka och fart, i små lådor med egen bakgrund.',
    ],
    extra:
      'Gör tre kort i olika färger. Använd samma klass för formen och en egen klass för färgen.',
  },
  {
    id: 'idea-skylt',
    track: 'boxen',
    emoji: '🪧',
    title: 'Öppettidsskylten',
    summary:
      'En skylt med öppettider för en butik, ett bibliotek eller ditt rum.',
    goals: [
      'Skylten står mitt på sidan med `margin: 0 auto`.',
      'En kant runt hela skylten och en kant under rubriken.',
      'Luft mellan dagarna med `padding` eller `margin`.',
    ],
    extra:
      'Markera dagen då det är stängt med en kant till vänster i en annan färg.',
  },
  {
    id: 'idea-prislappar',
    track: 'boxen',
    emoji: '🏷️',
    title: 'Prislapparna',
    summary: 'Prislappar för en loppis, med runda hörn och rea-märkning.',
    goals: [
      'Varje sak i en låda som är `inline-block`, så att de står bredvid varandra.',
      'Alla lådor lika breda tack vare `box-sizing: border-box`.',
      'En streckad kant och runda hörn, som en riktig lapp.',
    ],
    extra:
      'Ge sakerna på rea en klass med röd bakgrund, och gör lappen lite större vid `:hover`.',
  },
  {
    id: 'idea-spellista',
    track: 'flexbox',
    emoji: '🎧',
    title: 'Spellistan',
    summary: 'En spellista med dina favoritlåtar, som i en musikapp.',
    goals: [
      'Varje låt är en rad med flexbox: en ruta med en emoji som omslag, titeln och artisten, och längden längst till höger.',
      'Titeln och artisten tar resten av platsen med `flex: 1`.',
      'Allt på raden står mitt på höjden med `align-items: center`.',
    ],
    extra:
      'Markera låten som spelas just nu med en egen bakgrund, och lägg en rad med knappar (⏮ ⏯ ⏭) i mitten längst ner.',
  },
  {
    id: 'idea-trafikljus',
    track: 'flexbox',
    emoji: '🚦',
    title: 'Trafikljuset',
    summary: 'Ett trafikljus av tre runda lampor i en svart låda.',
    goals: [
      'Lådan är en flexbox nedåt med `gap` mellan lamporna.',
      'Lamporna är runda med `border-radius: 50%` och står i mitten med `align-items: center`.',
      'Bara en lampa lyser – de andra har en mörk färg.',
    ],
    extra:
      'Gör ett övergångsställe bredvid med en gubbe som är röd eller grön, och ställ båda bredvid varandra med flexbox.',
  },
  {
    id: 'idea-min-meny',
    track: 'flexbox',
    emoji: '🧭',
    title: 'Min meny',
    summary: 'Ett sidhuvud till din egen sajt, med logga, meny och knapp.',
    goals: [
      'En `header` som är en flexbox med `space-between`.',
      'En `nav` med länkar på rad och `gap` emellan.',
      'En knapp längst till höger som ändrar färg vid `:hover`.',
    ],
    extra:
      'Gör en sidfot med samma teknik: tre kolumner med länkar som delar bredden lika med `flex: 1`.',
  },
  {
    id: 'idea-kalender',
    track: 'grid',
    emoji: '📆',
    title: 'Kalendern',
    summary: 'En månadskalender med alla dagar i ett grid.',
    goals: [
      'Sju kolumner med `repeat(7, 1fr)` och en rad med veckodagarnas namn överst.',
      'Varje dag är en ruta med datumet och lite `gap` emellan.',
      'Månaden börjar inte på en måndag – flytta första dagen med `grid-column-start`.',
    ],
    extra:
      'Markera dagens datum och dina födelsedagar, och låt en resa sträcka sig över flera dagar med `span`.',
  },
  {
    id: 'idea-tre-i-rad',
    track: 'grid',
    emoji: '⭕',
    title: 'Tre i rad',
    summary: 'En spelplan för tre i rad, mitt i ett pågående parti.',
    goals: [
      'Ett grid med tre kolumner och tre rader, lika breda och lika höga.',
      'Rutorna har en kant eller ett `gap` med en bakgrund som syns som linjer.',
      'Några rutor har ❌ eller ⭕, stort och i mitten.',
    ],
    extra:
      'Färglägg de tre rutorna som vann, och skriv vems tur det är i en rad som sträcker sig över hela spelplanen.',
  },
  {
    id: 'idea-moodboard',
    track: 'grid',
    emoji: '🧷',
    title: 'Moodboarden',
    summary:
      'En inspirationstavla med färger, ord och bilder i olika storlekar.',
    goals: [
      'Ett grid med fyra kolumner och fasta radhöjder med `grid-auto-rows`.',
      'Några rutor är breda med `grid-column: span 2` och några höga med `grid-row: span 2`.',
      'Varje ruta har sin egen färg eller emoji.',
    ],
    extra:
      'Prova `grid-auto-flow: dense` och se hur griddet fyller hålen själv.',
  },
  {
    id: 'idea-lager',
    track: 'responsivt',
    emoji: '🏕️',
    title: 'Lägersidan',
    summary: 'En sida för ett sommarläger som fungerar på mobilen.',
    goals: [
      'viewport-raden och en bild som krymper med `max-width: 100%`.',
      'Aktiviteterna i tre kolumner på datorn och en på mobilen.',
      'Ingenting sticker ut på mobilen – kolla med 📱.',
    ],
    extra:
      'Bygg sidan med mobilen först, och lägg till kolumnerna med `@media (min-width: …)`.',
  },
  {
    id: 'idea-djurhem',
    track: 'responsivt',
    emoji: '🐾',
    title: 'Djurhemmet',
    summary: 'Djur som söker ett nytt hem, med ett kort för varje djur.',
    goals: [
      'Ett kort per djur med bild, namn och ålder.',
      'Korten i ett grid som har fler kolumner ju bredare skärmen är.',
      'Ett sidhuvud där menyn hamnar under loggan på mobilen.',
    ],
    extra:
      'Prova `grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))` – då behövs ingen `@media` alls för korten.',
  },
  {
    id: 'idea-konsert',
    track: 'responsivt',
    emoji: '🎤',
    title: 'Konsertaffischen',
    summary: 'En affisch för en konsert, lika snygg på mobilen som på datorn.',
    goals: [
      'En stor rubrik som blir mindre på mobilen.',
      'Bandets namn, datum och plats bredvid varandra på datorn och under varandra på mobilen.',
      'En köpknapp som är lagom stor på datorn och går över hela bredden på mobilen.',
    ],
    extra:
      'Låt bakgrunden vara en färg på mobilen och en annan på datorn, så ser du direkt när `@media` slår till.',
  },
  {
    id: 'idea-recept-sajt',
    track: 'slutprojekt',
    emoji: '🧑‍🍳',
    title: 'Familjens receptsajt',
    summary:
      'En sajt med familjens bästa recept, från mormors bullar till pappas tacos.',
    goals: [
      'En meny som hoppar till varje recept, och `scroll-behavior: smooth`.',
      'Ett färgtema med CSS-variabler och en stor topp med `linear-gradient`.',
      'Recepten som kort i ett grid, en kolumn på mobilen.',
    ],
    extra:
      'Lägg till ett formulär där man kan skicka in ett eget recept, med `:focus` på fälten.',
  },
  {
    id: 'idea-band',
    track: 'slutprojekt',
    emoji: '🎸',
    title: 'Bandets sajt',
    summary:
      'En sajt för ett påhittat band med låtar, spelningar och bandmedlemmar.',
    goals: [
      'Ett sidhuvud som följer med när man skrollar (`position: sticky`).',
      'Bandmedlemmarna i ett grid med runda bilder.',
      'Spelningarna i en tabell eller lista med datum och stad.',
    ],
    extra:
      'Gör två färgteman: byt bara värdena i `:root` och se hela sajten ändras.',
  },
  {
    id: 'idea-klass',
    track: 'slutprojekt',
    emoji: '🏫',
    title: 'Klassens sajt',
    summary:
      'En sajt för din klass med schema, nyheter och en sida om varje ämne.',
    goals: [
      'Veckans schema i ett grid med dagarna som kolumner.',
      'Nyheter som kort, med den viktigaste över två kolumner.',
      'Allt fungerar på mobilen – kolla med 📱.',
    ],
    extra:
      'Lägg till en sidfot med kontaktinformation och en knapp som tar dig tillbaka till toppen.',
  },
  {
    id: 'idea-vaderkort',
    track: 'tailwind',
    emoji: '🌤️',
    title: 'Väderkortet',
    summary: 'Ett väderkort som i en väderapp, helt med Tailwind.',
    goals: [
      'Ett kort med `rounded-2xl`, `shadow-lg` och en färgad bakgrund.',
      'Dagens temperatur stort med `text-6xl`, och vädret med en emoji.',
      'Veckans dagar på en rad med `flex` och `justify-between`.',
    ],
    extra:
      'Prova en övergång i Tailwind: `bg-linear-to-b from-sky-400 to-blue-700`.',
  },
  {
    id: 'idea-tw-biljett',
    track: 'tailwind',
    emoji: '🎫',
    title: 'Biljetten',
    summary: 'En biljett till en konsert eller match, gjord med Tailwind.',
    goals: [
      'Biljetten är en `flex`-rad med två delar: info till vänster och en stub till höger.',
      'En streckad kant mellan delarna med `border-l-2 border-dashed`.',
      'Datum, plats och plats-nummer med olika textstorlekar.',
    ],
    extra:
      'Gör så att delarna hamnar under varandra på mobilen med `flex-col md:flex-row`.',
  },
  {
    id: 'idea-topplista',
    track: 'tailwind',
    emoji: '📊',
    title: 'Topplistan',
    summary: 'En topplista över dina favoritspel, filmer eller låtar.',
    goals: [
      'Varje plats är en rad med `flex`, `items-center` och `gap-4`.',
      'Placeringen i en rund bricka med `rounded-full` och fast storlek.',
      'Varannan rad har en annan bakgrund, och raden lyser upp med `hover:`.',
    ],
    extra:
      'Ge ettan, tvåan och trean guld, silver och brons med Tailwinds färger.',
  },
];

const FREE_START = `<!-- Skriv vad du vill. Sidan syns under editorn. -->
<h1>Min sida</h1>
<p>Hej! Ändra texten och se vad som händer.</p>
`;

// Startkoden för en idé: målen som en kommentar, så att de syns medan man
// bygger. Utan idé börjar Lekplatsen med ett litet exempel.
export function ideaStarterCode(idea) {
  if (!idea) return FREE_START;
  const goals = idea.goals.map(goal => `  - ${goal.replace(/`/g, '')}`);
  return `<!--\n  ${idea.emoji} ${idea.title}\n${goals.join('\n')}\n-->\n\n${idea.starterCode ?? ''}`;
}
