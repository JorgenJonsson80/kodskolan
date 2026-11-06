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
  {
    id: 'proj-topplistan',
    track: 'sortera',
    db: 'filmer',
    title: 'Längdrekorden',
    reward: { emoji: '🥇', name: 'Guldmedalj' },
    summary:
      'Filmerna sorterade efter längd, och en topplista över de längsta.',
    steps: [
      {
        title: 'Kortast först',
        why: 'Sorteringen gör listan läsbar: man ser direkt var gränsen går för en film man hinner med på en kväll.',
        xp: 15,
        description: 'Filmklubben vill se filmerna efter längd.',
        task: 'Uppgift: Visa `titel` och `langd` för alla filmer, med den kortaste först.',
        starterCode: '-- Steg 1: kortast först\n',
        solution: 'SELECT titel, langd FROM filmer ORDER BY langd;\n',
        hints: [
          'ORDER BY sist i frågan.',
          'Sortera på langd.',
          'SELECT titel, langd FROM filmer ORDER BY langd;',
        ],
        tests: [{ description: 'Kortast först', check: 'rows', ordered: true }],
      },
      {
        title: 'Längst först',
        why: 'En topplista har det största överst. DESC vänder på sorteringen utan att något annat ändras.',
        xp: 15,
        description: 'Nu ska det bli en topplista över maratonfilmerna.',
        task: 'Uppgift: Vänd på sorteringen så att den längsta filmen kommer först.',
        solution: 'SELECT titel, langd FROM filmer ORDER BY langd DESC;\n',
        hints: [
          'DESC efter kolumnen i ORDER BY.',
          'ORDER BY langd DESC',
          'Resten av frågan är som förut.',
        ],
        tests: [{ description: 'Längst först', check: 'rows', ordered: true }],
      },
      {
        title: 'Pallen',
        why: 'LIMIT efter ORDER BY ger topplistan. Med alias blir kolumnerna begripliga för den som läser listan på väggen.',
        xp: 20,
        description: 'Bara de tre längsta får plats på pallen.',
        task: 'Uppgift: Visa bara de 3 längsta, och döp kolumnerna till `film` och `minuter`.',
        solution:
          'SELECT titel AS film, langd AS minuter\nFROM filmer\nORDER BY langd DESC\nLIMIT 3;\n',
        hints: [
          'titel AS film, langd AS minuter',
          'LIMIT 3 står sist.',
          'SELECT titel AS film, langd AS minuter FROM filmer ORDER BY langd DESC LIMIT 3;',
        ],
        tests: [
          {
            description: 'De tre längsta filmerna',
            check: 'rows',
            ordered: true,
            expected: [
              ['Fanny och Alexander', 188],
              ['Oppenheimer', 180],
              ['Interstellar', 169],
            ],
          },
          {
            description: 'Kolumnerna är film och minuter',
            check: 'columns',
            expected: ['film', 'minuter'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-lagerkollen',
    track: 'sortera',
    db: 'butik',
    title: 'Lagerkollen',
    reward: { emoji: '📦', name: 'Låda' },
    summary: 'Hitta varorna som håller på att ta slut, och räkna dem.',
    steps: [
      {
        title: 'Minst i lager först',
        why: 'Det som är nära slut ska synas först. Två varor kan ha lika många kvar, så namnet bestämmer ordningen mellan dem.',
        xp: 15,
        description:
          'Butiken ska beställa varor. Det som snart tar slut är viktigast.',
        task: 'Uppgift: Visa `namn` och `lager` för alla produkter, sorterat på lager (minst först) och sedan namn.',
        starterCode: '-- Steg 1: minst i lager först\n',
        solution: 'SELECT namn, lager FROM produkter ORDER BY lager, namn;\n',
        hints: [
          'Två kolumner i ORDER BY.',
          'lager först, sedan namn.',
          'ORDER BY lager, namn',
        ],
        tests: [
          { description: 'Minst i lager först', check: 'rows', ordered: true },
        ],
      },
      {
        title: 'Snart slut',
        why: 'WHERE tar bort det som räcker länge. Det som är kvar är beställningslistan.',
        xp: 15,
        description: 'Allt med 20 eller fler i lager räcker ett tag.',
        task: 'Uppgift: Behåll bara produkterna med färre än 20 i lager.',
        solution:
          'SELECT namn, lager FROM produkter WHERE lager < 20 ORDER BY lager, namn;\n',
        hints: [
          'WHERE står före ORDER BY.',
          'Färre än 20 skrivs < 20.',
          'WHERE lager < 20 ORDER BY lager, namn',
        ],
        tests: [
          {
            description: 'Det som snart tar slut',
            check: 'rows',
            ordered: true,
          },
        ],
      },
      {
        title: 'Hur många?',
        why: 'Chefen vill bara ha en siffra. COUNT räknar raderna som blev kvar efter WHERE.',
        xp: 20,
        description: 'Chefen vill veta hur många varor som ska beställas.',
        task: 'Uppgift: Skriv en ny fråga under som räknar produkterna med färre än 20 i lager. Kalla kolumnen `att_bestalla`.',
        solution:
          'SELECT namn, lager FROM produkter WHERE lager < 20 ORDER BY lager, namn;\n\nSELECT COUNT(*) AS att_bestalla FROM produkter WHERE lager < 20;\n',
        hints: [
          'En ny fråga efter semikolon.',
          'COUNT(*) räknar raderna.',
          'SELECT COUNT(*) AS att_bestalla FROM produkter WHERE lager < 20;',
        ],
        tests: [
          { description: 'Sex varor', check: 'rows', expected: [[6]] },
          {
            description: 'Kolumnen heter att_bestalla',
            check: 'columns',
            expected: ['att_bestalla'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-provet',
    track: 'sortera',
    db: 'skola',
    title: 'Mattenprovet',
    reward: { emoji: '📈', name: 'Diagram' },
    summary: 'Statistik om slutprovet i matte: antal, snitt, lägst och högst.',
    steps: [
      {
        title: 'Hur många skrev?',
        why: 'Antalet först, så att man vet hur många resultat snittet bygger på.',
        xp: 15,
        description:
          'Matteläraren vill ha statistik om slutprovet. Matematik har kurs_id 1.',
        task: 'Uppgift: Räkna hur många resultat det finns i Matematik (`kurs_id` 1), som `antal`.',
        starterCode: '-- Steg 1: hur många skrev?\n',
        solution: 'SELECT COUNT(*) AS antal FROM resultat WHERE kurs_id = 1;\n',
        hints: [
          'COUNT(*) räknar raderna.',
          'WHERE kurs_id = 1',
          'SELECT COUNT(*) AS antal FROM resultat WHERE kurs_id = 1;',
        ],
        tests: [
          { description: 'Tolv resultat', check: 'rows', expected: [[12]] },
        ],
      },
      {
        title: 'Snitt, lägst och högst',
        why: 'Flera funktioner i samma SELECT ger en rad med hela statistiken, i stället för fyra frågor.',
        xp: 15,
        description: 'Nu vill läraren se hur det gick.',
        task: 'Uppgift: Lägg till snittet som `snitt`, det lägsta som `lagst` och det högsta som `hogst`, efter `antal`.',
        solution:
          'SELECT COUNT(*) AS antal, AVG(poang) AS snitt, MIN(poang) AS lagst, MAX(poang) AS hogst\nFROM resultat\nWHERE kurs_id = 1;\n',
        hints: [
          'AVG, MIN och MAX av poang.',
          'Varje får sitt namn med AS.',
          'COUNT(*) AS antal, AVG(poang) AS snitt, MIN(poang) AS lagst, MAX(poang) AS hogst',
        ],
        tests: [
          {
            description: 'Kolumnerna är antal, snitt, lagst och hogst',
            check: 'columns',
            expected: ['antal', 'snitt', 'lagst', 'hogst'],
          },
          { description: 'Rätt statistik', check: 'rows' },
        ],
      },
      {
        title: 'De som klarade det',
        why: 'Med ett villkor till räknas allt bara för dem som fick minst 60. Funktionerna räknar alltid det som är kvar efter WHERE.',
        xp: 20,
        description:
          'Gränsen för godkänt är 60 poäng. Hur ser det ut bland dem som klarade provet?',
        task: 'Uppgift: Räkna bara med resultaten som är minst 60 poäng.',
        solution:
          'SELECT COUNT(*) AS antal, AVG(poang) AS snitt, MIN(poang) AS lagst, MAX(poang) AS hogst\nFROM resultat\nWHERE kurs_id = 1 AND poang >= 60;\n',
        hints: [
          'Lägg till ett villkor med AND.',
          'Minst 60 skrivs >= 60.',
          'WHERE kurs_id = 1 AND poang >= 60',
        ],
        tests: [{ description: 'Statistiken för de godkända', check: 'rows' }],
      },
    ],
  },
  {
    id: 'proj-recensenterna',
    track: 'gruppera',
    db: 'filmer',
    title: 'Recensenterna',
    reward: { emoji: '🌟', name: 'Stjärna' },
    summary: 'Vem är snällast av filmklubbens fyra recensenter?',
    steps: [
      {
        title: 'Hur många?',
        why: 'En rad per recensent: grupperingen gör om 28 recensioner till fyra rader.',
        xp: 15,
        description:
          'Filmklubben har fyra recensenter. Hur många recensioner har var och en skrivit?',
        task: 'Uppgift: Visa varje `recensent` och antal recensioner som `antal`.',
        starterCode: '-- Steg 1: hur många?\n',
        solution:
          'SELECT recensent, COUNT(*) AS antal FROM recensioner GROUP BY recensent;\n',
        hints: [
          'Gruppera på recensent.',
          'COUNT(*) AS antal',
          'SELECT recensent, COUNT(*) AS antal FROM recensioner GROUP BY recensent;',
        ],
        tests: [{ description: 'Antal per recensent', check: 'rows' }],
      },
      {
        title: 'Snittbetyget',
        why: 'Alla har skrivit lika många, så snittet går att jämföra rakt av.',
        xp: 15,
        description: 'Vem ger högst betyg i snitt?',
        task: 'Uppgift: Lägg till snittbetyget som `snitt`.',
        solution:
          'SELECT recensent, COUNT(*) AS antal, AVG(betyg) AS snitt\nFROM recensioner\nGROUP BY recensent;\n',
        hints: [
          'AVG(betyg) ger snittet.',
          'AVG(betyg) AS snitt efter antal.',
          'SELECT recensent, COUNT(*) AS antal, AVG(betyg) AS snitt …',
        ],
        tests: [{ description: 'Snittet per recensent', check: 'rows' }],
      },
      {
        title: 'Snällast först',
        why: 'Sorterat blir svaret en topplista. Två har samma snitt, och då avgör namnet så att ordningen alltid blir densamma.',
        xp: 20,
        description: 'Gör det till en topplista.',
        task: 'Uppgift: Sortera med högst snitt först, och i bokstavsordning om två har samma snitt.',
        solution:
          'SELECT recensent, COUNT(*) AS antal, AVG(betyg) AS snitt\nFROM recensioner\nGROUP BY recensent\nORDER BY snitt DESC, recensent;\n',
        hints: [
          'ORDER BY efter GROUP BY.',
          'snitt DESC, sedan recensent.',
          'ORDER BY snitt DESC, recensent',
        ],
        tests: [
          { description: 'Snällast först', check: 'rows', ordered: true },
        ],
      },
    ],
  },
  {
    id: 'proj-stamkunderna',
    track: 'gruppera',
    db: 'butik',
    title: 'Stamkunderna',
    reward: { emoji: '💰', name: 'Pengapåse' },
    summary: 'Hitta kunderna som kommer tillbaka, för ett lojalitetsprogram.',
    steps: [
      {
        title: 'Ordrarnas status',
        why: 'Först en överblick: hur många ordrar har varje status? Då vet man om de avbrutna är många nog att bry sig om.',
        xp: 15,
        description:
          'Butiken vill starta ett program för stamkunder. Först en överblick.',
        task: 'Uppgift: Visa varje `status` och hur många ordrar som har den, som `antal`.',
        starterCode: '-- Steg 1: ordrarnas status\n',
        solution:
          'SELECT status, COUNT(*) AS antal FROM ordrar GROUP BY status;\n',
        hints: [
          'Gruppera ordrar på status.',
          'COUNT(*) AS antal',
          'SELECT status, COUNT(*) AS antal FROM ordrar GROUP BY status;',
        ],
        tests: [
          {
            description: 'Antal per status',
            check: 'rows',
            expected: [
              ['avbruten', 1],
              ['levererad', 11],
              ['skickad', 3],
            ],
          },
        ],
      },
      {
        title: 'Per kund',
        why: 'En avbruten order räknas inte som ett köp, så den tas bort med WHERE innan grupperingen.',
        xp: 15,
        description: 'Nu per kund, men bara ordrar som inte avbrutits.',
        task: 'Uppgift: Byt till en rad per `kund_id` med antal ordrar som `antal`, och räkna bara ordrar vars status inte är `avbruten`.',
        solution:
          "SELECT kund_id, COUNT(*) AS antal\nFROM ordrar\nWHERE status <> 'avbruten'\nGROUP BY kund_id;\n",
        hints: [
          "WHERE status <> 'avbruten' före GROUP BY.",
          'Gruppera på kund_id i stället för status.',
          "SELECT kund_id, COUNT(*) AS antal FROM ordrar WHERE status <> 'avbruten' GROUP BY kund_id;",
        ],
        tests: [{ description: 'Ordrar per kund', check: 'rows' }],
      },
      {
        title: 'Stamkunderna',
        why: 'HAVING behåller bara grupperna med minst två köp. Sorteringen sätter de trognaste överst.',
        xp: 20,
        description: 'En stamkund har handlat minst två gånger.',
        task: 'Uppgift: Behåll bara kunderna med minst 2 ordrar, med flest först och lägst `kund_id` först om de har lika många.',
        solution:
          "SELECT kund_id, COUNT(*) AS antal\nFROM ordrar\nWHERE status <> 'avbruten'\nGROUP BY kund_id\nHAVING COUNT(*) >= 2\nORDER BY antal DESC, kund_id;\n",
        hints: [
          'HAVING COUNT(*) >= 2 efter GROUP BY.',
          'ORDER BY antal DESC, kund_id',
          'HAVING står före ORDER BY.',
        ],
        tests: [
          {
            description: 'Stamkunderna, flest först',
            check: 'rows',
            ordered: true,
            expected: [
              [1, 3],
              [2, 3],
              [4, 2],
              [8, 2],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-kurserna',
    track: 'gruppera',
    db: 'skola',
    title: 'Kursrapporten',
    reward: { emoji: '🎓', name: 'Studentmössa' },
    summary: 'Rektorns rapport: hur gick det i varje kurs?',
    steps: [
      {
        title: 'Hur många skrev?',
        why: 'En rad per kurs. Programmering har färre elever, och det är bra att veta när man jämför snitten.',
        xp: 15,
        description: 'Rektorn vill ha en rapport med en rad per kurs.',
        task: 'Uppgift: Visa varje `kurs_id` och antalet resultat som `antal`.',
        starterCode: '-- Steg 1: hur många skrev?\n',
        solution:
          'SELECT kurs_id, COUNT(*) AS antal FROM resultat GROUP BY kurs_id;\n',
        hints: [
          'Gruppera resultat på kurs_id.',
          'COUNT(*) AS antal',
          'SELECT kurs_id, COUNT(*) AS antal FROM resultat GROUP BY kurs_id;',
        ],
        tests: [
          {
            description: 'Antal per kurs',
            check: 'rows',
            expected: [
              [1, 12],
              [2, 11],
              [3, 11],
              [4, 5],
            ],
          },
        ],
      },
      {
        title: 'Snitt och bästa',
        why: 'Snittet visar hur det gick för de flesta, och det bästa resultatet visar vad som var möjligt.',
        xp: 15,
        description: 'Hur gick det i varje kurs?',
        task: 'Uppgift: Lägg till snittet som `snitt` och det bästa resultatet som `bast`.',
        solution:
          'SELECT kurs_id, COUNT(*) AS antal, AVG(poang) AS snitt, MAX(poang) AS bast\nFROM resultat\nGROUP BY kurs_id;\n',
        hints: [
          'AVG(poang) AS snitt, MAX(poang) AS bast',
          'Efter antal, med kommatecken.',
          'SELECT kurs_id, COUNT(*) AS antal, AVG(poang) AS snitt, MAX(poang) AS bast …',
        ],
        tests: [{ description: 'Snitt och bästa per kurs', check: 'rows' }],
      },
      {
        title: 'De starkaste kurserna',
        why: 'HAVING plockar ut kurserna där snittet är över 78. Sorterat ser rektorn direkt vilken som gick bäst.',
        xp: 20,
        description: 'Rektorn vill lyfta fram kurserna där det gått bäst.',
        task: 'Uppgift: Behåll bara kurserna med ett snitt över 78, med högst snitt först.',
        solution:
          'SELECT kurs_id, COUNT(*) AS antal, AVG(poang) AS snitt, MAX(poang) AS bast\nFROM resultat\nGROUP BY kurs_id\nHAVING AVG(poang) > 78\nORDER BY snitt DESC;\n',
        hints: [
          'HAVING AVG(poang) > 78',
          'ORDER BY snitt DESC',
          'HAVING står efter GROUP BY och före ORDER BY.',
        ],
        tests: [
          {
            description: 'Kurserna med snitt över 78',
            check: 'rows',
            ordered: true,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-namnlappar',
    track: 'omvandla',
    db: 'skola',
    title: 'Namnlapparna',
    reward: { emoji: '🏷', name: 'Namnlapp' },
    summary: 'Namnlappar till skolans öppna hus, med namn, initialer och sal.',
    steps: [
      {
        title: 'Hela namnet',
        why: '|| sätter ihop för- och efternamn till en text, så att lappen kan skrivas ut som den är.',
        xp: 15,
        description: 'Skolan har öppet hus och alla elever ska ha namnlappar.',
        task: 'Uppgift: Visa hela namnet (förnamn, mellanslag, efternamn) som `namn`, och `klass`.',
        starterCode: '-- Steg 1: hela namnet\n',
        solution:
          "SELECT fornamn || ' ' || efternamn AS namn, klass FROM elever;\n",
        hints: [
          "fornamn || ' ' || efternamn",
          'AS namn efter uträkningen.',
          "SELECT fornamn || ' ' || efternamn AS namn, klass FROM elever;",
        ],
        tests: [{ description: 'Namn och klass', check: 'rows' }],
      },
      {
        title: 'Initialerna',
        why: 'Initialerna står stort i hörnet på lappen, så att man ser dem på håll.',
        xp: 15,
        description: 'Lappen ska ha initialerna i hörnet.',
        task: 'Uppgift: Lägg till initialerna (första bokstaven i förnamnet och efternamnet) som `initialer` sist.',
        solution:
          "SELECT fornamn || ' ' || efternamn AS namn, klass,\n  SUBSTR(fornamn, 1, 1) || SUBSTR(efternamn, 1, 1) AS initialer\nFROM elever;\n",
        hints: [
          'SUBSTR(fornamn, 1, 1) är första bokstaven.',
          'Två SUBSTR med || mellan.',
          'SUBSTR(fornamn, 1, 1) || SUBSTR(efternamn, 1, 1) AS initialer',
        ],
        tests: [
          {
            description: 'Kolumnerna är namn, klass och initialer',
            check: 'columns',
            expected: ['namn', 'klass', 'initialer'],
          },
          { description: 'Initialerna', check: 'rows' },
        ],
      },
      {
        title: 'Vilken sal?',
        why: 'CASE gör om klassen till en sal. Byter en klass sal behöver bara frågan ändras, inte tabellen.',
        xp: 20,
        description: '9A visar upp sig i sal 101 och 9B i sal 102.',
        task: 'Uppgift: Lägg till `sal` sist: `Sal 101` för 9A och `Sal 102` för alla andra.',
        solution:
          "SELECT fornamn || ' ' || efternamn AS namn, klass,\n  SUBSTR(fornamn, 1, 1) || SUBSTR(efternamn, 1, 1) AS initialer,\n  CASE WHEN klass = '9A' THEN 'Sal 101' ELSE 'Sal 102' END AS sal\nFROM elever;\n",
        hints: [
          "CASE WHEN klass = '9A' THEN … ELSE … END",
          'AS sal efter END.',
          "CASE WHEN klass = '9A' THEN 'Sal 101' ELSE 'Sal 102' END AS sal",
        ],
        tests: [{ description: 'Namnlapparna med sal', check: 'rows' }],
      },
    ],
  },
  {
    id: 'proj-manadsrapport',
    track: 'omvandla',
    db: 'butik',
    title: 'Månadsrapporten',
    reward: { emoji: '🗓️', name: 'Kalender' },
    summary: 'Hur många ordrar kom in varje månad, och vilken var bäst?',
    steps: [
      {
        title: 'Per månad',
        why: 'Datumet är för detaljerat för en rapport. Månaden ur strftime gör att ordrarna kan grupperas.',
        xp: 15,
        description: 'Chefen vill se hur försäljningen går månad för månad.',
        task: 'Uppgift: Visa varje månad som `manad` och antalet ordrar som `antal`.',
        starterCode: '-- Steg 1: per månad\n',
        solution:
          "SELECT strftime('%m', datum) AS manad, COUNT(*) AS antal\nFROM ordrar\nGROUP BY manad;\n",
        hints: [
          "strftime('%m', datum) AS manad",
          'GROUP BY manad',
          'COUNT(*) AS antal',
        ],
        tests: [{ description: 'Ordrar per månad', check: 'rows' }],
      },
      {
        title: 'Bara det som gick fram',
        why: 'En avbruten order gav inga pengar. WHERE tar bort den innan något räknas.',
        xp: 15,
        description: 'Den avbrutna ordern ska inte räknas.',
        task: 'Uppgift: Räkna bara ordrar vars status inte är `avbruten`.',
        solution:
          "SELECT strftime('%m', datum) AS manad, COUNT(*) AS antal\nFROM ordrar\nWHERE status <> 'avbruten'\nGROUP BY manad;\n",
        hints: [
          'WHERE före GROUP BY.',
          "WHERE status <> 'avbruten'",
          'Resten är som förut.',
        ],
        tests: [
          {
            description: 'Februari har en order mindre',
            check: 'rows',
            expected: [
              ['01', 2],
              ['02', 2],
              ['03', 3],
              ['04', 2],
              ['05', 3],
              ['06', 2],
            ],
          },
        ],
      },
      {
        title: 'Månadens namn',
        why: 'Rapporten läses av människor. CASE gör om 03 till mars, och sorteringen på manad håller ordningen rätt.',
        xp: 20,
        description: 'Rapporten blir lättare att läsa med namnen på månaderna.',
        task: "Uppgift: Lägg till `namn` sist med månadens namn (`januari` för `'01'` … `juni` för `'06'`), och sortera på `manad`.",
        solution:
          "SELECT strftime('%m', datum) AS manad, COUNT(*) AS antal,\n  CASE strftime('%m', datum)\n    WHEN '01' THEN 'januari'\n    WHEN '02' THEN 'februari'\n    WHEN '03' THEN 'mars'\n    WHEN '04' THEN 'april'\n    WHEN '05' THEN 'maj'\n    ELSE 'juni'\n  END AS namn\nFROM ordrar\nWHERE status <> 'avbruten'\nGROUP BY manad\nORDER BY manad;\n",
        hints: [
          "CASE strftime('%m', datum) WHEN '01' THEN 'januari' … END",
          'Med CASE värde WHEN … jämförs värdet med varje WHEN.',
          'ORDER BY manad sist.',
        ],
        tests: [
          {
            description: 'Månaderna med namn, i ordning',
            check: 'rows',
            ordered: true,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-bokstavsbetyg',
    track: 'omvandla',
    db: 'skola',
    title: 'Bokstavsbetygen',
    reward: { emoji: '🅰️', name: 'Betyget A' },
    summary: 'Gör om poängen på matteprovet till betyg från A till F.',
    steps: [
      {
        title: 'Från poäng till betyg',
        why: 'CASE prövar villkoren uppifrån. Därför räcker det att skriva >= 80 för B – allt på 90 och mer har redan blivit A.',
        xp: 20,
        description: 'Matteprovet (kurs_id 1) ska få bokstavsbetyg.',
        task: 'Uppgift: Visa `elev_id`, `poang` och `betyg` för resultaten i kurs 1: A från 90, B från 80, C från 70, D från 60, E från 50 och annars F.',
        starterCode: '-- Steg 1: från poäng till betyg\n',
        solution:
          "SELECT elev_id, poang,\n  CASE\n    WHEN poang >= 90 THEN 'A'\n    WHEN poang >= 80 THEN 'B'\n    WHEN poang >= 70 THEN 'C'\n    WHEN poang >= 60 THEN 'D'\n    WHEN poang >= 50 THEN 'E'\n    ELSE 'F'\n  END AS betyg\nFROM resultat\nWHERE kurs_id = 1;\n",
        hints: [
          'Ett CASE med fem WHEN och ett ELSE.',
          "Börja med WHEN poang >= 90 THEN 'A'.",
          'END AS betyg, och WHERE kurs_id = 1.',
        ],
        tests: [{ description: 'Betyget för varje resultat', check: 'rows' }],
      },
      {
        title: 'Hur många av varje?',
        why: 'Ett CASE går att gruppera på. Då blir det en rad per betyg i stället för en per elev.',
        xp: 15,
        description: 'Läraren vill veta hur betygen fördelar sig.',
        task: 'Uppgift: Gör om frågan så att den visar `betyg` och antalet som `antal`, en rad per betyg.',
        solution:
          "SELECT\n  CASE\n    WHEN poang >= 90 THEN 'A'\n    WHEN poang >= 80 THEN 'B'\n    WHEN poang >= 70 THEN 'C'\n    WHEN poang >= 60 THEN 'D'\n    WHEN poang >= 50 THEN 'E'\n    ELSE 'F'\n  END AS betyg,\n  COUNT(*) AS antal\nFROM resultat\nWHERE kurs_id = 1\nGROUP BY betyg;\n",
        hints: [
          'Ta bort elev_id och poang ur SELECT.',
          'COUNT(*) AS antal efter betyg.',
          'GROUP BY betyg',
        ],
        tests: [
          {
            description: 'Antal per betyg',
            check: 'rows',
            expected: [
              ['A', 3],
              ['B', 3],
              ['C', 2],
              ['D', 2],
              ['E', 1],
              ['F', 1],
            ],
          },
        ],
      },
      {
        title: 'De vanligaste',
        why: 'HAVING filtrerar grupperna efter att de räknats. Här blir bara betygen som minst två elever fick kvar.',
        xp: 15,
        description: 'Läraren vill bara se betygen som fler än en elev fick.',
        task: 'Uppgift: Behåll bara betygen som minst 2 resultat fick.',
        solution:
          "SELECT\n  CASE\n    WHEN poang >= 90 THEN 'A'\n    WHEN poang >= 80 THEN 'B'\n    WHEN poang >= 70 THEN 'C'\n    WHEN poang >= 60 THEN 'D'\n    WHEN poang >= 50 THEN 'E'\n    ELSE 'F'\n  END AS betyg,\n  COUNT(*) AS antal\nFROM resultat\nWHERE kurs_id = 1\nGROUP BY betyg\nHAVING COUNT(*) >= 2;\n",
        hints: [
          'HAVING efter GROUP BY.',
          'Räkna med COUNT(*) i HAVING.',
          'HAVING COUNT(*) >= 2',
        ],
        tests: [
          {
            description: 'A, B, C och D',
            check: 'rows',
            expected: [
              ['A', 3],
              ['B', 3],
              ['C', 2],
              ['D', 2],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-kvittot',
    track: 'join',
    db: 'butik',
    title: 'Kvittot',
    reward: { emoji: '🧾', name: 'Kvitto' },
    summary: 'Skriv ut kvittot för en order, rad för rad och med summan.',
    steps: [
      {
        title: 'Vad köptes?',
        why: 'orderrader vet vad som köptes men inte vad det heter. JOIN mot produkter ger namnet och priset.',
        xp: 15,
        description: 'Kunden med order 6 vill ha ett kvitto.',
        task: 'Uppgift: Visa produktens `namn`, `antal` och `pris` för raderna i order 6.',
        starterCode: '-- Steg 1: vad köptes?\n',
        solution:
          'SELECT p.namn, r.antal, p.pris\nFROM orderrader r\nJOIN produkter p ON r.produkt_id = p.id\nWHERE r.order_id = 6;\n',
        hints: [
          'FROM orderrader r JOIN produkter p ON r.produkt_id = p.id',
          'WHERE r.order_id = 6',
          'SELECT p.namn, r.antal, p.pris …',
        ],
        tests: [
          {
            description: 'Tre rader på kvittot',
            check: 'rows',
            expected: [
              ['Bryggkaffe Mörk', 1, 89],
              ['Earl Grey', 2, 65],
              ['Morotskaka', 1, 45],
            ],
          },
        ],
      },
      {
        title: 'Radsumman',
        why: 'Varje rad på ett kvitto visar vad den kostar. Uträkningen görs per rad, med kolumner från båda tabellerna.',
        xp: 15,
        description: 'Varje rad ska visa vad den kostar.',
        task: 'Uppgift: Lägg till `antal * pris` som `summa` sist.',
        solution:
          'SELECT p.namn, r.antal, p.pris, r.antal * p.pris AS summa\nFROM orderrader r\nJOIN produkter p ON r.produkt_id = p.id\nWHERE r.order_id = 6;\n',
        hints: ['r.antal * p.pris', 'AS summa', 'Sist i SELECT, efter p.pris.'],
        tests: [{ description: 'Radsummorna', check: 'rows' }],
      },
      {
        title: 'Att betala',
        why: 'Summan räknas med SUM i en egen fråga, så att kvittot kan visa raderna och totalen var för sig.',
        xp: 20,
        description: 'Längst ner på kvittot: att betala.',
        task: 'Uppgift: Skriv en ny fråga under som räknar ut hela orderns summa som `att_betala`.',
        solution:
          'SELECT p.namn, r.antal, p.pris, r.antal * p.pris AS summa\nFROM orderrader r\nJOIN produkter p ON r.produkt_id = p.id\nWHERE r.order_id = 6;\n\nSELECT SUM(r.antal * p.pris) AS att_betala\nFROM orderrader r\nJOIN produkter p ON r.produkt_id = p.id\nWHERE r.order_id = 6;\n',
        hints: [
          'Samma FROM, JOIN och WHERE i den nya frågan.',
          'SUM(r.antal * p.pris)',
          'AS att_betala',
        ],
        tests: [
          { description: '264 kronor', check: 'rows', expected: [[264]] },
        ],
      },
    ],
  },
  {
    id: 'proj-regissorerna',
    track: 'join',
    db: 'filmer',
    title: 'Regissörerna',
    reward: { emoji: '🎬', name: 'Klappa' },
    summary: 'Vilka regissörer gör de längsta filmerna?',
    steps: [
      {
        title: 'Vem gjorde vad?',
        why: 'JOIN ger regissörens namn och land till varje film, så att det går att gruppera på dem.',
        xp: 15,
        description: 'Filmklubben ska ha ett tema om regissörer.',
        task: 'Uppgift: Visa regissörens `namn` och `land`, och filmens `titel` och `langd`.',
        starterCode: '-- Steg 1: vem gjorde vad?\n',
        solution:
          'SELECT r.namn, r.land, f.titel, f.langd\nFROM filmer f\nJOIN regissorer r ON f.regissor_id = r.id;\n',
        hints: [
          'FROM filmer f JOIN regissorer r ON f.regissor_id = r.id',
          'Fyra kolumner från två tabeller.',
          'SELECT r.namn, r.land, f.titel, f.langd …',
        ],
        tests: [{ description: 'Filmerna med regissör', check: 'rows' }],
      },
      {
        title: 'Per regissör',
        why: 'En rad per regissör: hur många filmer och hur långa de är i snitt.',
        xp: 15,
        description: 'Nu en rad per regissör.',
        task: 'Uppgift: Gör om frågan till en rad per regissör med `namn`, `land`, antalet filmer som `filmer` och snittlängden avrundad till heltal som `snitt`.',
        solution:
          'SELECT r.namn, r.land, COUNT(*) AS filmer, ROUND(AVG(f.langd)) AS snitt\nFROM filmer f\nJOIN regissorer r ON f.regissor_id = r.id\nGROUP BY r.namn, r.land;\n',
        hints: [
          'GROUP BY r.namn, r.land',
          'COUNT(*) AS filmer, ROUND(AVG(f.langd)) AS snitt',
          'ROUND utan decimaler avrundar till heltal.',
        ],
        tests: [{ description: 'En rad per regissör', check: 'rows' }],
      },
      {
        title: 'De långa',
        why: 'HAVING plockar ut regissörerna vars filmer i snitt är över två timmar, och sorteringen sätter den längsta först.',
        xp: 20,
        description: 'Temat blir "Långa filmer".',
        task: 'Uppgift: Behåll bara regissörerna med en snittlängd över 120 minuter, längst först.',
        solution:
          'SELECT r.namn, r.land, COUNT(*) AS filmer, ROUND(AVG(f.langd)) AS snitt\nFROM filmer f\nJOIN regissorer r ON f.regissor_id = r.id\nGROUP BY r.namn, r.land\nHAVING AVG(f.langd) > 120\nORDER BY snitt DESC;\n',
        hints: [
          'HAVING AVG(f.langd) > 120',
          'ORDER BY snitt DESC',
          'HAVING före ORDER BY.',
        ],
        tests: [
          {
            description: 'De långa, längst först',
            check: 'rows',
            ordered: true,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-betygskortet',
    track: 'join',
    db: 'skola',
    title: 'Betygskortet',
    reward: { emoji: '📜', name: 'Diplom' },
    summary: 'Ett kort med en elevs resultat, med kursernas och lärarnas namn.',
    steps: [
      {
        title: 'Alvas resultat',
        why: 'resultat har bara kurs_id. JOIN mot kurser ger kursens namn, som är det eleven vill läsa.',
        xp: 15,
        description: 'Alva Lindqvist (elev_id 1) vill se sina resultat.',
        task: 'Uppgift: Visa kursens namn som `kurs` och `poang` för elev 1.',
        starterCode: '-- Steg 1: Alvas resultat\n',
        solution:
          'SELECT k.namn AS kurs, r.poang\nFROM resultat r\nJOIN kurser k ON r.kurs_id = k.id\nWHERE r.elev_id = 1;\n',
        hints: [
          'FROM resultat r JOIN kurser k ON r.kurs_id = k.id',
          'WHERE r.elev_id = 1',
          'k.namn AS kurs',
        ],
        tests: [
          {
            description: 'Alvas fyra resultat',
            check: 'rows',
            expected: [
              ['Matematik', 92],
              ['Svenska', 85],
              ['Engelska', 78],
              ['Programmering', 95],
            ],
          },
        ],
      },
      {
        title: 'Läraren',
        why: 'Läraren står redan i kurser, så den kommer med i samma JOIN utan något nytt.',
        xp: 15,
        description: 'Kortet ska också visa vem som var lärare.',
        task: 'Uppgift: Lägg till `larare` sist, och sortera på kursens namn.',
        solution:
          'SELECT k.namn AS kurs, r.poang, k.larare\nFROM resultat r\nJOIN kurser k ON r.kurs_id = k.id\nWHERE r.elev_id = 1\nORDER BY kurs;\n',
        hints: [
          'k.larare finns i kurser.',
          'ORDER BY kurs sist.',
          'SELECT k.namn AS kurs, r.poang, k.larare …',
        ],
        tests: [
          {
            description: 'Med lärare, i ordning',
            check: 'rows',
            ordered: true,
          },
        ],
      },
      {
        title: 'Hela klassen',
        why: 'Med elever som tredje tabell går det att välja på klass i stället för id, och samma fråga ger alla kort på en gång.',
        xp: 20,
        description: 'Nu ska alla i 9A få sina kort.',
        task: 'Uppgift: Byt `WHERE r.elev_id = 1` mot alla elever i klass `9A`, lägg till elevens `fornamn` först och sortera på förnamn och sedan kurs.',
        solution:
          "SELECT e.fornamn, k.namn AS kurs, r.poang, k.larare\nFROM resultat r\nJOIN kurser k ON r.kurs_id = k.id\nJOIN elever e ON r.elev_id = e.id\nWHERE e.klass = '9A'\nORDER BY e.fornamn, kurs;\n",
        hints: [
          'JOIN elever e ON r.elev_id = e.id',
          "WHERE e.klass = '9A'",
          'ORDER BY e.fornamn, kurs',
        ],
        tests: [{ description: 'Korten för 9A', check: 'rows', ordered: true }],
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
