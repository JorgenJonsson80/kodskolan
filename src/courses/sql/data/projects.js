import { projectSteps } from '../../../core/projects';

// Projekt som låses upp när en bana är klar. Eleven väljer ett av tre men
// kan göra alla. Varje projekt byggs i steg, och frågan från förra steget
// följer med till nästa. why förklarar varför frågan ser ut som den gör.
// reward: priset man får när projektet är klart. db gäller alla steg.
// Facit följer samma regler som övningarna (se test/concepts.js).
export const PROJECTS = [
  {
    id: 'proj-meny',
    track: 'select',
    db: 'butik',
    title: 'Caféets meny',
    reward: { emoji: '☕', name: 'Kaffekopp' },
    summary: 'En meny med allt butiken säljer, och vad det kostar för två.',
    steps: [
      {
        title: 'Vad finns det?',
        why: 'En meny behöver bara namn och pris. Allt annat i tabellen, som lagret, är till för butiken och inte för gästerna.',
        xp: 15,
        description:
          'Caféet ska skriva ut en ny meny. Först en lista med allt som säljs.',
        task: 'Uppgift: Visa `namn` och `pris` för alla produkter.',
        starterCode: '-- Steg 1: vad finns det?\n',
        solution: 'SELECT namn, pris FROM produkter;\n',
        hints: [
          'Tabellen heter produkter.',
          'Två kolumner med kommatecken mellan.',
          'SELECT namn, pris FROM produkter;',
        ],
        tests: [
          { description: 'Namn och pris för allt', check: 'rows' },
          {
            description: 'Kolumnerna är namn och pris',
            check: 'columns',
            expected: ['namn', 'pris'],
          },
        ],
      },
      {
        title: 'Kategorierna',
        why: 'Kategorin först gör menyn lättare att läsa: allt kaffe hamnar under varandra när vi sorterar i nästa bana.',
        xp: 15,
        description: 'Gästerna vill se om något är kaffe, te eller bakverk.',
        task: 'Uppgift: Lägg till `kategori` först, så att kolumnerna blir `kategori`, `namn` och `pris`.',
        solution: 'SELECT kategori, namn, pris FROM produkter;\n',
        hints: [
          'Kolumnerna kommer i den ordning du skriver dem.',
          'kategori ska stå först, före namn.',
          'SELECT kategori, namn, pris FROM produkter;',
        ],
        tests: [
          { description: 'Kategori, namn och pris', check: 'rows' },
          {
            description: 'Kolumnerna är kategori, namn och pris',
            check: 'columns',
            expected: ['kategori', 'namn', 'pris'],
          },
        ],
      },
      {
        title: 'Fika för två',
        why: 'Priset för två räknas ut för varje rad. Det står inte i tabellen, så om ett pris ändras blir uträkningen alltid rätt.',
        xp: 20,
        description:
          'Många fikar två och två. Menyn ska också visa vad det kostar för två.',
        task: 'Uppgift: Lägg till en fjärde kolumn sist som är priset för två, `pris * 2`.',
        solution: 'SELECT kategori, namn, pris, pris * 2 FROM produkter;\n',
        hints: [
          'En uträkning kan vara en kolumn.',
          'Lägg till , pris * 2 efter pris.',
          'SELECT kategori, namn, pris, pris * 2 FROM produkter;',
        ],
        tests: [{ description: 'Menyn med priset för två', check: 'rows' }],
      },
    ],
  },
  {
    id: 'proj-filmkvall',
    track: 'select',
    db: 'filmer',
    title: 'Filmkvällen',
    reward: { emoji: '🍿', name: 'Popcorn' },
    summary: 'Ett utkast till kvällens filmlista, med hur lång tid allt tar.',
    steps: [
      {
        title: 'Alla filmer',
        why: 'Titel och genre räcker för att välja film. Det är lättare att bestämma sig när listan inte är full av id och siffror.',
        xp: 15,
        description:
          'Kompisarna ska välja film. Börja med en lista att välja från.',
        task: 'Uppgift: Visa `titel` och `genre` för alla filmer.',
        starterCode: '-- Steg 1: alla filmer\n',
        solution: 'SELECT titel, genre FROM filmer;\n',
        hints: [
          'Tabellen heter filmer.',
          'Kolumnerna titel och genre.',
          'SELECT titel, genre FROM filmer;',
        ],
        tests: [
          { description: 'Titel och genre för alla filmer', check: 'rows' },
        ],
      },
      {
        title: 'Hur lång är den?',
        why: 'Längden avgör om filmen hinns med innan bussen går. Den står i minuter, som i tabellen.',
        xp: 15,
        description: 'Någon måste hinna hem. Hur långa är filmerna?',
        task: 'Uppgift: Lägg till `langd` sist.',
        solution: 'SELECT titel, genre, langd FROM filmer;\n',
        hints: [
          'En kolumn till efter genre.',
          'Kolumnen heter langd, utan ä.',
          'SELECT titel, genre, langd FROM filmer;',
        ],
        tests: [
          { description: 'Titel, genre och längd', check: 'rows' },
          {
            description: 'Kolumnerna är titel, genre och langd',
            check: 'columns',
            expected: ['titel', 'genre', 'langd'],
          },
        ],
      },
      {
        title: 'Kvällens förslag',
        why: 'Med LIMIT blir listan kort nog att läsa högt. Kommentaren berättar vad listan är till för, om någon hittar frågan senare.',
        xp: 20,
        description:
          'Listan är för lång. Ta de fem första som förslag, och visa längden i timmar också.',
        task: 'Uppgift: Lägg till en kommentar överst, en fjärde kolumn med längden i timmar (`langd / 60.0`) och visa bara de 5 första filmerna.',
        solution:
          '-- Kvällens förslag\nSELECT titel, genre, langd, langd / 60.0\nFROM filmer\nLIMIT 5;\n',
        hints: [
          'Delat med skrivs /. Med 60.0 blir det decimaler.',
          'LIMIT 5 står sist.',
          'SELECT titel, genre, langd, langd / 60.0 FROM filmer LIMIT 5;',
        ],
        tests: [
          { description: 'Fem filmer med längden i timmar', check: 'rows' },
        ],
        sourceChecks: [
          { description: 'Det finns en kommentar med --', pattern: /--\s*\S/ },
        ],
      },
    ],
  },
  {
    id: 'proj-klasslistan',
    track: 'select',
    db: 'skola',
    title: 'Klasslistan',
    reward: { emoji: '📋', name: 'Skrivplatta' },
    summary: 'Lärarens lista över eleverna, med hur gamla de blir i år.',
    steps: [
      {
        title: 'Namnen',
        why: 'Förnamn och efternamn står i var sin kolumn. Det gör att man kan sortera på efternamn men ändå skriva förnamnet först.',
        xp: 15,
        description: 'Den nya läraren behöver en lista med alla elever.',
        task: 'Uppgift: Visa `fornamn` och `efternamn` för alla elever.',
        starterCode: '-- Steg 1: namnen\n',
        solution: 'SELECT fornamn, efternamn FROM elever;\n',
        hints: [
          'Tabellen heter elever.',
          'fornamn och efternamn, utan ö.',
          'SELECT fornamn, efternamn FROM elever;',
        ],
        tests: [{ description: 'Alla elevers namn', check: 'rows' }],
      },
      {
        title: 'Klassen',
        why: 'Klassen först gör att läraren ser direkt vilka som går i 9A och 9B.',
        xp: 15,
        description: 'Läraren har två klasser och vill se vem som går var.',
        task: 'Uppgift: Ändra så att kolumnerna blir `klass`, `fornamn` och `efternamn`.',
        solution: 'SELECT klass, fornamn, efternamn FROM elever;\n',
        hints: [
          'Lägg till klass först.',
          'Kommatecken mellan alla tre.',
          'SELECT klass, fornamn, efternamn FROM elever;',
        ],
        tests: [
          {
            description: 'Kolumnerna är klass, fornamn och efternamn',
            check: 'columns',
            expected: ['klass', 'fornamn', 'efternamn'],
          },
          { description: 'Alla elever med klass', check: 'rows' },
        ],
      },
      {
        title: 'Hur gamla?',
        why: 'Åldern räknas ut från födelseåret i stället för att sparas, så den behöver aldrig ändras när ett nytt år börjar.',
        xp: 20,
        description: 'Läraren vill veta hur gamla eleverna fyller i år, 2026.',
        task: 'Uppgift: Lägg till en fjärde kolumn sist med åldern de fyller i år: `2026 - fodd`.',
        solution:
          'SELECT klass, fornamn, efternamn, 2026 - fodd FROM elever;\n',
        hints: [
          'Födelseåret står i kolumnen fodd.',
          'Uträkningen är 2026 minus fodd.',
          'Lägg till , 2026 - fodd efter efternamn.',
        ],
        tests: [{ description: 'Alla elever med ålder', check: 'rows' }],
      },
    ],
  },
  {
    id: 'proj-kampanj',
    track: 'filtrera',
    db: 'butik',
    title: 'Kampanjen',
    reward: { emoji: '🏷️', name: 'Prislapp' },
    summary: 'Välj ut varorna till veckans kampanj, ett villkor i taget.',
    steps: [
      {
        title: 'Det varma',
        why: 'Kampanjen gäller något att dricka. IN gör det lätt att lägga till fler kategorier senare.',
        xp: 15,
        description:
          'Butiken ska ha kampanj på något varmt att dricka: kaffe och te.',
        task: 'Uppgift: Visa `namn`, `kategori`, `pris` och `lager` för produkterna i kategorierna `Kaffe` och `Te`.',
        starterCode: '-- Steg 1: det varma\n',
        solution:
          "SELECT namn, kategori, pris, lager\nFROM produkter\nWHERE kategori IN ('Kaffe', 'Te');\n",
        hints: [
          'Två kategorier: använd IN eller OR.',
          "WHERE kategori IN ('Kaffe', 'Te')",
          'Fyra kolumner: namn, kategori, pris och lager.',
        ],
        tests: [{ description: 'Allt kaffe och te', check: 'rows' }],
      },
      {
        title: 'Finns i lager',
        why: 'Man kan inte ha kampanj på något som är slut. Ett extra villkor med AND tar bort dem.',
        xp: 15,
        description: 'Två av produkterna är slut. De ska inte vara med.',
        task: 'Uppgift: Behåll bara produkterna som finns i lager, alltså där `lager` är större än 0.',
        solution:
          "SELECT namn, kategori, pris, lager\nFROM produkter\nWHERE kategori IN ('Kaffe', 'Te') AND lager > 0;\n",
        hints: [
          'Lägg till ett villkor till med AND.',
          'Större än 0 skrivs > 0.',
          "WHERE kategori IN ('Kaffe', 'Te') AND lager > 0",
        ],
        tests: [
          { description: 'Kaffe och te som finns i lager', check: 'rows' },
        ],
      },
      {
        title: 'Lagom dyrt',
        why: 'BETWEEN gör prisintervallet lätt att läsa och ändra. Båda ändarna är med.',
        xp: 20,
        description:
          'Det billigaste ger för lite rabatt och det dyraste kostar för mycket. Kampanjen gäller mellanpriset.',
        task: 'Uppgift: Behåll bara det som kostar mellan 60 och 100 kronor, med båda gränserna.',
        solution:
          "SELECT namn, kategori, pris, lager\nFROM produkter\nWHERE kategori IN ('Kaffe', 'Te') AND lager > 0 AND pris BETWEEN 60 AND 100;\n",
        hints: [
          'Ännu ett villkor med AND.',
          'BETWEEN 60 AND 100 tar med både 60 och 100.',
          '… AND pris BETWEEN 60 AND 100',
        ],
        tests: [
          {
            description: 'Kampanjvarorna',
            check: 'rows',
            expected: [
              ['Bryggkaffe Mörk', 'Kaffe', 89, 40],
              ['Earl Grey', 'Te', 65, 12],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-paminnelser',
    track: 'filtrera',
    db: 'bibliotek',
    title: 'Påminnelserna',
    reward: { emoji: '⏰', name: 'Väckarklocka' },
    summary: 'Hitta lånen biblioteket ska påminna om – idag och nästa vecka.',
    steps: [
      {
        title: 'Utlånat just nu',
        why: 'Ett lån som inte är återlämnat har ingen återlämningsdag, alltså NULL. Därför är IS NULL det som hittar dem.',
        xp: 15,
        description: 'Först: vilka böcker är utlånade just nu?',
        task: 'Uppgift: Visa `id`, `bok_id` och `forfaller` för lånen som inte är återlämnade.',
        starterCode: '-- Steg 1: utlånat just nu\n',
        solution:
          'SELECT id, bok_id, forfaller\nFROM lan\nWHERE aterlamnad IS NULL;\n',
        hints: [
          'Ett lån som inte är tillbaka har aterlamnad tom, alltså NULL.',
          'IS NULL, inte = NULL.',
          'WHERE aterlamnad IS NULL',
        ],
        tests: [{ description: 'Lånen som inte är tillbaka', check: 'rows' }],
      },
      {
        title: 'Snart dags',
        why: 'Datum skrivs som text med år först, så de sorteras och jämförs rätt. Därför fungerar BETWEEN på dem också.',
        xp: 15,
        description:
          'Biblioteket skickar ett vänligt sms till dem som ska lämna tillbaka inom en vecka. Idag är det 2026-06-15.',
        task: "Uppgift: Behåll bara lånen som förfaller mellan `'2026-06-15'` och `'2026-06-22'`.",
        solution:
          "SELECT id, bok_id, forfaller\nFROM lan\nWHERE aterlamnad IS NULL AND forfaller BETWEEN '2026-06-15' AND '2026-06-22';\n",
        hints: [
          'Lägg till ett villkor med AND.',
          'Datumen är text, så de har enkla citattecken.',
          "AND forfaller BETWEEN '2026-06-15' AND '2026-06-22'",
        ],
        tests: [
          {
            description: 'Lånet som förfaller nästa vecka',
            check: 'rows',
            expected: [[8, 10, '2026-06-17']],
          },
        ],
      },
      {
        title: 'Vilka ska vi ringa?',
        why: 'Den som saknar telefonnummer kan inte få sms. De får brev i stället, så biblioteket behöver veta vilka de är.',
        xp: 20,
        description:
          'Till sist, i en ny fråga: vilka låntagare saknar telefonnummer?',
        task: 'Uppgift: Skriv en ny fråga under den gamla som visar `namn` för låntagarna utan `telefon`. Det är den sista frågan som rättas.',
        solution:
          "SELECT id, bok_id, forfaller\nFROM lan\nWHERE aterlamnad IS NULL AND forfaller BETWEEN '2026-06-15' AND '2026-06-22';\n\nSELECT namn FROM lantagare WHERE telefon IS NULL;\n",
        hints: [
          'Semikolon efter den första frågan, och sedan en ny.',
          'Tabellen heter lantagare.',
          'SELECT namn FROM lantagare WHERE telefon IS NULL;',
        ],
        tests: [
          {
            description: 'Låntagarna utan telefon',
            check: 'rows',
            expected: [['Lisa Holm'], ['Per Lind']],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-filmtipset',
    track: 'filtrera',
    db: 'filmer',
    title: 'Filmtipset',
    reward: { emoji: '🎞️', name: 'Filmrulle' },
    summary: 'Hitta en kort film för en tisdagskväll, ett villkor i taget.',
    steps: [
      {
        title: 'Inte för lång',
        why: 'Det är tisdag och alla ska upp tidigt. Längden är det viktigaste villkoret, så det kommer först.',
        xp: 15,
        description: 'En kort film till en vardagskväll.',
        task: 'Uppgift: Visa `titel`, `genre`, `ar` och `langd` för filmerna som är kortare än 100 minuter.',
        starterCode: '-- Steg 1: inte för lång\n',
        solution:
          'SELECT titel, genre, ar, langd\nFROM filmer\nWHERE langd < 100;\n',
        hints: [
          'Kortare än 100 skrivs < 100.',
          'Fyra kolumner: titel, genre, ar och langd.',
          'WHERE langd < 100',
        ],
        tests: [{ description: 'Filmerna under 100 minuter', check: 'rows' }],
      },
      {
        title: 'Rätt genre',
        why: 'Alla gillar drama eller animerat, så de genrerna får vara med. IN gör villkoret kort.',
        xp: 15,
        description: 'Ingen vill se en komedi ikväll.',
        task: 'Uppgift: Behåll bara genrerna `Drama` och `Animerat`.',
        solution:
          "SELECT titel, genre, ar, langd\nFROM filmer\nWHERE langd < 100 AND genre IN ('Drama', 'Animerat');\n",
        hints: [
          'Ett villkor till med AND.',
          "genre IN ('Drama', 'Animerat')",
          "WHERE langd < 100 AND genre IN ('Drama', 'Animerat')",
        ],
        tests: [{ description: 'Korta dramer och animerat', check: 'rows' }],
      },
      {
        title: 'Inte för gammal',
        why: 'Ett tredje villkor gör listan ännu kortare. Ordningen på villkoren spelar ingen roll när alla sätts ihop med AND.',
        xp: 20,
        description: 'Kompisen tycker att svartvita filmer är för gamla.',
        task: 'Uppgift: Behåll bara filmerna från efter 1980.',
        solution:
          "SELECT titel, genre, ar, langd\nFROM filmer\nWHERE langd < 100 AND genre IN ('Drama', 'Animerat') AND ar > 1980;\n",
        hints: [
          'Efter 1980 skrivs ar > 1980.',
          'Lägg till det med AND.',
          '… AND ar > 1980',
        ],
        tests: [
          {
            description: 'Tre filmer att välja mellan',
            check: 'rows',
            expected: [
              ['Fucking Åmål', 'Drama', 1998, 89],
              ['Min granne Totoro', 'Animerat', 1988, 86],
              ['Okänd kortfilm', 'Drama', 2025, 12],
            ],
          },
        ],
      },
    ],
  },
];

// Stegen som vanliga övningar, så att samma editor och rättning kan
// användas. Ett steg utan egen startkod börjar med förra stegets facit.
// db följer med från projektet till varje steg.
export const PROJECT_STEPS = projectSteps(
  PROJECTS.map(project => ({
    ...project,
    steps: project.steps.map(step => ({ db: project.db, ...step })),
  })),
  text => `-- ${text}`,
);
