// Bana 6: nycklar och JOIN … ON, alias för tabeller, JOIN med WHERE,
// GROUP BY och flera tabeller. Bara vanlig (inre) JOIN, LEFT JOIN kommer
// i bana 7.
const START = '-- Skriv din fråga här\n';

export const JOIN = [
  {
    id: 'join-01',
    track: 'join',
    db: 'filmer',
    title: 'Två tabeller',
    xp: 15,
    description:
      'I filmer står bara regissor_id, ett nummer. Namnet står i tabellen regissorer. Nu ska vi koppla ihop dem.',
    explain:
      'Ett id som pekar på en rad i en annan tabell kallas **nyckel**. `filmer.regissor_id` pekar på `regissorer.id`.\n\n`JOIN` sätter ihop raderna där villkoret efter `ON` stämmer:\n\n`FROM filmer JOIN regissorer ON filmer.regissor_id = regissorer.id`\n\nSkriv tabellens namn och en punkt före kolumnen, så att det syns vilken tabell den kommer från.',
    example:
      'SELECT ordrar.datum, kunder.namn FROM ordrar JOIN kunder ON ordrar.kund_id = kunder.id;',
    task: 'Uppgift: Visa varje films `titel` och regissörens `namn`.',
    starterCode: START,
    solution:
      'SELECT filmer.titel, regissorer.namn\nFROM filmer\nJOIN regissorer ON filmer.regissor_id = regissorer.id;\n',
    hints: [
      'FROM filmer JOIN regissorer ON …',
      'Villkoret: filmer.regissor_id = regissorer.id',
      'SELECT filmer.titel, regissorer.namn FROM filmer JOIN regissorer ON filmer.regissor_id = regissorer.id;',
    ],
    tests: [{ description: 'Titel och regissör', check: 'rows' }],
  },
  {
    id: 'join-02',
    track: 'join',
    db: 'filmer',
    title: 'Korta namn på tabellerna',
    xp: 15,
    description: 'Tabellnamnen blir långa att skriva hela tiden.',
    explain:
      'Efter tabellens namn kan du skriva ett kort alias: `FROM filmer f JOIN regissorer r`. Sedan skriver du `f.titel` och `r.namn`.\n\nMed `AS` kan kolumnen också få ett tydligare namn i svaret: `r.namn AS regissor`.',
    example:
      'SELECT o.datum, k.namn FROM ordrar o JOIN kunder k ON o.kund_id = k.id;',
    task: "Uppgift: Visa `titel` och regissörens namn som `regissor` för filmerna av svenska regissörer (`land` är `'Sverige'`). Använd alias för tabellerna.",
    starterCode: START,
    solution:
      "SELECT f.titel, r.namn AS regissor\nFROM filmer f\nJOIN regissorer r ON f.regissor_id = r.id\nWHERE r.land = 'Sverige';\n",
    hints: [
      'FROM filmer f JOIN regissorer r ON f.regissor_id = r.id',
      "WHERE r.land = 'Sverige'",
      'r.namn AS regissor i SELECT.',
    ],
    tests: [
      { description: 'De svenska filmerna', check: 'rows' },
      {
        description: 'Kolumnerna är titel och regissor',
        check: 'columns',
        expected: ['titel', 'regissor'],
      },
    ],
  },
  {
    id: 'join-03',
    track: 'join',
    db: 'butik',
    title: 'Vem beställde?',
    xp: 15,
    description: 'Ordrarna har bara kund_id. Butiken vill se kundens namn.',
    explain:
      'Det är samma mönster i alla databaser: tabellen med nyckeln (`ordrar.kund_id`) kopplas till tabellen den pekar på (`kunder.id`).\n\nTitta i **📋 Tabellerna** efter kolumner som slutar på `_id`. De pekar nästan alltid på `id` i en annan tabell.',
    example:
      'SELECT f.titel, r.betyg FROM recensioner r JOIN filmer f ON r.film_id = f.id;',
    task: 'Uppgift: Visa orderns `id`, `datum` och kundens `namn` för alla ordrar.',
    starterCode: START,
    solution:
      'SELECT o.id, o.datum, k.namn\nFROM ordrar o\nJOIN kunder k ON o.kund_id = k.id;\n',
    hints: [
      'ordrar.kund_id pekar på kunder.id.',
      'FROM ordrar o JOIN kunder k ON o.kund_id = k.id',
      'SELECT o.id, o.datum, k.namn …',
    ],
    tests: [{ description: 'Ordrarna med kundens namn', check: 'rows' }],
  },
  {
    id: 'join-04',
    track: 'join',
    db: 'butik',
    title: 'Filtrera på den andra tabellen',
    xp: 15,
    description: 'Vilka ordrar kommer från kunder i Göteborg?',
    explain:
      'Efter `JOIN` har varje rad kolumner från båda tabellerna. Därför kan `WHERE` filtrera på vilken som helst av dem, som `k.stad`.',
    example:
      "SELECT f.titel FROM filmer f JOIN regissorer r ON f.regissor_id = r.id WHERE r.land = 'Japan';",
    task: 'Uppgift: Visa `id`, `datum` och kundens `namn` för ordrarna från kunder i `Göteborg`, äldst först.',
    starterCode: START,
    solution:
      "SELECT o.id, o.datum, k.namn\nFROM ordrar o\nJOIN kunder k ON o.kund_id = k.id\nWHERE k.stad = 'Göteborg'\nORDER BY o.datum;\n",
    hints: [
      'Samma JOIN som förut.',
      "WHERE k.stad = 'Göteborg'",
      'ORDER BY o.datum sist.',
    ],
    tests: [
      {
        description: 'Göteborgarnas ordrar, äldst först',
        check: 'rows',
        ordered: true,
      },
    ],
  },
  {
    id: 'join-05',
    track: 'join',
    db: 'filmer',
    title: 'Gruppera efter JOIN',
    xp: 20,
    description: 'Hur många filmer har varje regissör gjort?',
    explain:
      'Först kopplas tabellerna ihop, sedan grupperas raderna. Allt du lärt dig fungerar efter en JOIN: `WHERE`, `GROUP BY`, `HAVING` och `ORDER BY`.',
    example:
      'SELECT k.stad, COUNT(*) FROM ordrar o JOIN kunder k ON o.kund_id = k.id GROUP BY k.stad;',
    task: 'Uppgift: Visa varje regissörs `namn` och antalet filmer som `filmer`, med flest först och i bokstavsordning om två har lika många.',
    starterCode: START,
    solution:
      'SELECT r.namn, COUNT(*) AS filmer\nFROM filmer f\nJOIN regissorer r ON f.regissor_id = r.id\nGROUP BY r.namn\nORDER BY filmer DESC, r.namn;\n',
    hints: [
      'JOIN först, sedan GROUP BY r.namn.',
      'COUNT(*) AS filmer',
      'ORDER BY filmer DESC, r.namn',
    ],
    tests: [
      {
        description: 'Antal filmer per regissör',
        check: 'rows',
        ordered: true,
      },
    ],
  },
  {
    id: 'join-06',
    track: 'join',
    db: 'filmer',
    title: 'Bäst i snitt',
    xp: 20,
    description: 'Vilka filmer har fått bäst betyg? Med titel, inte id.',
    explain:
      'Recensionerna har `film_id`, så de kopplas till filmerna. Sedan grupperas det per film och räknas ett snitt.\n\nTvå tabeller kan ha kolumner med samma namn, som `id`. Skriv alltid tabellens alias framför när det finns risk för det.',
    example:
      'SELECT f.titel, COUNT(*) FROM recensioner re JOIN filmer f ON re.film_id = f.id GROUP BY f.titel;',
    task: 'Uppgift: Visa `titel` och snittbetyget avrundat till en decimal som `snitt`, för de 5 filmerna med högst snitt. Om två har samma snitt: bokstavsordning.',
    starterCode: START,
    solution:
      'SELECT f.titel, ROUND(AVG(re.betyg), 1) AS snitt\nFROM recensioner re\nJOIN filmer f ON re.film_id = f.id\nGROUP BY f.titel\nORDER BY snitt DESC, f.titel\nLIMIT 5;\n',
    hints: [
      'FROM recensioner re JOIN filmer f ON re.film_id = f.id',
      'GROUP BY f.titel och ROUND(AVG(re.betyg), 1) AS snitt',
      'ORDER BY snitt DESC, f.titel LIMIT 5',
    ],
    tests: [
      { description: 'De fem bästa filmerna', check: 'rows', ordered: true },
    ],
  },
  {
    id: 'join-07',
    track: 'join',
    db: 'skola',
    title: 'Tre tabeller',
    xp: 20,
    description:
      'I resultat står bara elev_id och kurs_id. Läraren vill se elevens namn och kursens namn.',
    explain:
      'Du kan skriva flera `JOIN` efter varandra. Varje `JOIN` har sitt eget `ON`:\n\n`FROM resultat r JOIN elever e ON r.elev_id = e.id JOIN kurser k ON r.kurs_id = k.id`',
    example:
      'SELECT o.datum, k.namn, r.antal FROM orderrader r JOIN ordrar o ON r.order_id = o.id JOIN kunder k ON o.kund_id = k.id;',
    task: 'Uppgift: Visa elevens `fornamn`, kursens namn som `kurs` och `poang` för alla resultat i klass `9B`.',
    starterCode: START,
    solution:
      "SELECT e.fornamn, k.namn AS kurs, r.poang\nFROM resultat r\nJOIN elever e ON r.elev_id = e.id\nJOIN kurser k ON r.kurs_id = k.id\nWHERE e.klass = '9B';\n",
    hints: [
      'Börja FROM resultat r, och JOIN elever och kurser.',
      'JOIN kurser k ON r.kurs_id = k.id',
      "WHERE e.klass = '9B'",
    ],
    tests: [
      { description: 'Resultaten i 9B med namn', check: 'rows' },
      {
        description: 'Kolumnerna är fornamn, kurs och poang',
        check: 'columns',
        expected: ['fornamn', 'kurs', 'poang'],
      },
    ],
  },
  {
    id: 'join-08',
    track: 'join',
    db: 'butik',
    title: 'Räkna pengar',
    xp: 20,
    description:
      'Hur mycket var varje order värd? Antalet står i orderrader och priset i produkter.',
    explain:
      'När kolumnerna kommer från olika tabeller kan de räknas ihop efter JOIN: `r.antal * p.pris` är vad en rad i ordern kostar.\n\n`SUM` per order lägger ihop raderna till orderns summa.',
    example:
      'SELECT p.namn, r.antal * p.pris FROM orderrader r JOIN produkter p ON r.produkt_id = p.id;',
    task: 'Uppgift: Visa `order_id` och orderns summa som `summa` för varje order.',
    starterCode: START,
    solution:
      'SELECT r.order_id, SUM(r.antal * p.pris) AS summa\nFROM orderrader r\nJOIN produkter p ON r.produkt_id = p.id\nGROUP BY r.order_id;\n',
    hints: [
      'FROM orderrader r JOIN produkter p ON r.produkt_id = p.id',
      'SUM(r.antal * p.pris) AS summa',
      'GROUP BY r.order_id',
    ],
    tests: [{ description: 'Summan för varje order', check: 'rows' }],
  },
  {
    id: 'join-09',
    track: 'join',
    db: 'butik',
    title: 'Fyra tabeller',
    xp: 25,
    description: 'Vilka kunder har handlat för mest pengar?',
    explain:
      'Det går att kedja hur många tabeller som helst: kunder → ordrar → orderrader → produkter. Följ nycklarna i **📋 Tabellerna**, en `JOIN` för varje steg.\n\nBygg frågan en `JOIN` i taget och kör den efter varje, så ser du att raderna blir rätt.',
    example:
      'SELECT k.namn, p.namn FROM kunder k JOIN ordrar o ON o.kund_id = k.id JOIN orderrader r ON r.order_id = o.id JOIN produkter p ON r.produkt_id = p.id;',
    task: 'Uppgift: Visa kundens `namn` och hur mycket kunden handlat för totalt som `totalt`, för de 3 kunder som handlat mest, mest först.',
    starterCode: START,
    solution:
      'SELECT k.namn, SUM(r.antal * p.pris) AS totalt\nFROM kunder k\nJOIN ordrar o ON o.kund_id = k.id\nJOIN orderrader r ON r.order_id = o.id\nJOIN produkter p ON r.produkt_id = p.id\nGROUP BY k.namn\nORDER BY totalt DESC\nLIMIT 3;\n',
    hints: [
      'kunder k JOIN ordrar o ON o.kund_id = k.id',
      'Sedan orderrader r ON r.order_id = o.id och produkter p ON r.produkt_id = p.id.',
      'GROUP BY k.namn, ORDER BY totalt DESC, LIMIT 3',
    ],
    tests: [
      { description: 'De tre största kunderna', check: 'rows', ordered: true },
    ],
  },
];
