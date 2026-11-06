// Bana 11: felsökning. Startkoden är trasig och eleven lagar den. Hälften
// av felen ger inget felmeddelande alls, bara fel svar – de är de svåraste
// att hitta. Facit följer samma regler som övningarna.

export const FELSOK = [
  {
    id: 'felsok-01',
    track: 'felsok',
    db: 'butik',
    title: 'Kommatecknet som försvann',
    xp: 15,
    description:
      'Frågan ska visa namn och stad, men svaret har bara en kolumn. Och den heter konstigt.',
    explain:
      '`SELECT namn stad` utan kommatecken betyder *namn, med aliaset stad*. SQL ger inget fel – det blir bara fel kolumner.\n\nTitta alltid på kolumnnamnen i svaret. Heter en kolumn som en annan kolumn borde heta har ett kommatecken försvunnit.',
    example: 'SELECT titel ar FROM filmer;  -- en kolumn, som heter ar',
    task: 'Uppgift: Laga frågan så att den visar `namn` och `stad` för alla kunder.',
    starterCode: 'SELECT namn stad FROM kunder;\n',
    solution: 'SELECT namn, stad FROM kunder;\n',
    hints: [
      'Hur många kolumner har svaret? Hur många borde det ha?',
      'Det saknas ett tecken mellan namn och stad.',
      'SELECT namn, stad FROM kunder;',
    ],
    tests: [
      {
        description: 'Kolumnerna är namn och stad',
        check: 'columns',
        expected: ['namn', 'stad'],
      },
      { description: 'Alla kunder', check: 'rows' },
    ],
  },
  {
    id: 'felsok-02',
    track: 'felsok',
    db: 'butik',
    title: 'Ett kommatecken för mycket',
    xp: 10,
    description: 'Den här frågan ger ett fel direkt.',
    explain:
      'Felet säger `near "FROM": syntax error`. Det betyder att SQL blev förvirrad precis **före** `FROM`.\n\nTitta på det som står närmast före ordet i felmeddelandet. Där brukar felet vara.',
    example: 'SELECT titel, ar FROM filmer;',
    task: 'Uppgift: Laga frågan så att den visar `namn`, `kategori` och `pris` för alla produkter.',
    starterCode: 'SELECT namn, kategori, pris, FROM produkter;\n',
    solution: 'SELECT namn, kategori, pris FROM produkter;\n',
    hints: [
      'Läs felmeddelandet: near "FROM".',
      'Vad står precis före FROM?',
      'Ta bort kommatecknet efter pris.',
    ],
    tests: [{ description: 'Alla produkter', check: 'rows' }],
  },
  {
    id: 'felsok-03',
    track: 'felsok',
    db: 'butik',
    title: 'En kolumn som inte finns',
    xp: 10,
    description:
      'SQL säger att en kolumn inte finns – men den som skrev frågan menade inte en kolumn.',
    explain:
      '`no such column: Malmö` betyder att SQL letade efter en kolumn som heter Malmö. Text måste stå inom enkla citattecken, annars läses den som ett namn.',
    example: "SELECT namn FROM kunder WHERE stad = 'Lund';",
    task: 'Uppgift: Laga frågan så att den visar `namn` för kunderna i Malmö.',
    starterCode: 'SELECT namn FROM kunder WHERE stad = Malmö;\n',
    solution: "SELECT namn FROM kunder WHERE stad = 'Malmö';\n",
    hints: [
      'Läs felmeddelandet: vilken kolumn letar SQL efter?',
      'Malmö är text, inte en kolumn.',
      "WHERE stad = 'Malmö'",
    ],
    tests: [{ description: 'Kunderna i Malmö', check: 'rows' }],
  },
  {
    id: 'felsok-04',
    track: 'felsok',
    db: 'butik',
    title: 'Tomt svar',
    xp: 15,
    description:
      'Frågan ska hitta kunderna utan e-post. Den ger inget fel, men inga rader heller.',
    explain:
      'Ett tomt svar utan felmeddelande betyder att villkoret aldrig blev sant. `= NULL` är ett klassiskt exempel: NULL betyder "vet inte", så jämförelsen blir aldrig sann.\n\nTitta i den gula rutan – den varnar ofta för sådant.',
    example: 'SELECT titel FROM filmer WHERE regissor_id IS NULL;',
    task: 'Uppgift: Laga frågan så att den visar `namn` för kunderna som saknar e-post.',
    starterCode: 'SELECT namn FROM kunder WHERE epost = NULL;\n',
    solution: 'SELECT namn FROM kunder WHERE epost IS NULL;\n',
    hints: [
      'Varför blir villkoret aldrig sant?',
      'NULL jämförs inte med =.',
      'WHERE epost IS NULL',
    ],
    tests: [
      {
        description: 'Kunderna utan e-post',
        check: 'rows',
        expected: [['Clara Ek'], ['Greta Nyström']],
      },
    ],
  },
  {
    id: 'felsok-05',
    track: 'felsok',
    db: 'butik',
    title: 'Fel ställe för villkoret',
    xp: 15,
    description: 'Frågan ska visa kunderna med minst två ordrar.',
    explain:
      '`misuse of aggregate: COUNT()` betyder att `COUNT` står där den inte kan räknas. `WHERE` tittar på en rad i taget, före grupperingen, så villkor om grupper står i `HAVING`.',
    example:
      'SELECT genre, COUNT(*) FROM filmer GROUP BY genre HAVING COUNT(*) > 2;',
    task: 'Uppgift: Laga frågan så att den visar `kund_id` och antal ordrar som `antal` för kunderna med minst 2 ordrar.',
    starterCode:
      'SELECT kund_id, COUNT(*) AS antal\nFROM ordrar\nWHERE COUNT(*) >= 2\nGROUP BY kund_id;\n',
    solution:
      'SELECT kund_id, COUNT(*) AS antal\nFROM ordrar\nGROUP BY kund_id\nHAVING COUNT(*) >= 2;\n',
    hints: [
      'Läs felmeddelandet: misuse of aggregate.',
      'Villkor om COUNT står i HAVING.',
      'HAVING står efter GROUP BY.',
    ],
    tests: [{ description: 'Kunderna med minst två ordrar', check: 'rows' }],
  },
  {
    id: 'felsok-06',
    track: 'felsok',
    db: 'butik',
    title: 'AND före OR',
    xp: 20,
    description:
      'Frågan ska visa te och kaffe som kostar under 60 kronor. Svaret har för många rader.',
    explain:
      '`AND` binder hårdare än `OR`, som gånger före plus. `a OR b AND c` betyder `a OR (b AND c)`.\n\nSätt parenteser när du blandar `AND` och `OR`: `(a OR b) AND c`.',
    example:
      "SELECT titel FROM filmer WHERE (genre = 'Drama' OR genre = 'Komedi') AND ar > 2010;",
    task: 'Uppgift: Laga frågan så att den visar `namn` och `pris` för te och kaffe som kostar under 60 kr.',
    starterCode:
      "SELECT namn, pris\nFROM produkter\nWHERE kategori = 'Te' OR kategori = 'Kaffe' AND pris < 60;\n",
    solution:
      "SELECT namn, pris\nFROM produkter\nWHERE (kategori = 'Te' OR kategori = 'Kaffe') AND pris < 60;\n",
    hints: [
      'Vilken rad är för mycket? Vad kostar den?',
      'AND räknas före OR.',
      "Parentes runt kategori = 'Te' OR kategori = 'Kaffe'.",
    ],
    tests: [
      {
        description: 'Te och kaffe under 60 kr',
        check: 'rows',
        expected: [
          ['Grönt te', 59],
          ['Rooibos', 55],
        ],
      },
    ],
  },
  {
    id: 'felsok-07',
    track: 'felsok',
    db: 'filmer',
    title: 'Decimalerna som försvann',
    xp: 15,
    description:
      'Frågan ska visa filmernas längd i timmar. Alla filmer blir 1, 2 eller 3 timmar.',
    explain:
      'Två heltal delat med varandra ger ett heltal i SQLite: `96 / 60` blir 1. Skriv det ena talet med decimal, `60.0`, så blir svaret 1.6.\n\nSå fort ett svar ser för "jämnt" ut är det värt att misstänka heltal.',
    example: 'SELECT 7 / 2, 7 / 2.0;',
    task: 'Uppgift: Laga frågan så att `timmar` får decimaler.',
    starterCode: 'SELECT titel, langd / 60 AS timmar FROM filmer;\n',
    solution: 'SELECT titel, langd / 60.0 AS timmar FROM filmer;\n',
    hints: [
      'langd och 60 är båda heltal.',
      'Ett av talen behöver en decimal.',
      'langd / 60.0',
    ],
    tests: [{ description: 'Längden i timmar med decimaler', check: 'rows' }],
  },
  {
    id: 'felsok-08',
    track: 'felsok',
    db: 'filmer',
    title: 'Fel nyckel',
    xp: 20,
    description:
      'Frågan ska visa varje film med sin regissör. Men Bergman står som regissör till Det sjunde inseglet och inget mer.',
    explain:
      'En `JOIN` på fel kolumner ger inget fel – bara fel par. `f.id = r.id` kopplar film 1 till regissör 1, film 2 till regissör 2 …\n\nKolla i **📋 Tabellerna** vilken kolumn som pekar på vad. Det är `filmer.regissor_id` som pekar på `regissorer.id`.',
    example:
      'SELECT o.id, k.namn FROM ordrar o JOIN kunder k ON o.kund_id = k.id;',
    task: 'Uppgift: Laga frågan så att varje film visas med rätt regissör.',
    starterCode:
      'SELECT f.titel, r.namn\nFROM filmer f\nJOIN regissorer r ON f.id = r.id;\n',
    solution:
      'SELECT f.titel, r.namn\nFROM filmer f\nJOIN regissorer r ON f.regissor_id = r.id;\n',
    hints: [
      'Stämmer paren? Vem gjorde Smultronstället?',
      'Vilken kolumn i filmer pekar på regissören?',
      'ON f.regissor_id = r.id',
    ],
    tests: [{ description: 'Rätt regissör till varje film', check: 'rows' }],
  },
  {
    id: 'felsok-09',
    track: 'felsok',
    db: 'skola',
    title: 'LEFT JOIN som inte blev LEFT',
    xp: 20,
    description:
      'Frågan ska visa alla elever och deras resultat i programmering. Men bara fem elever kommer med.',
    explain:
      'Ett villkor på den högra tabellen i `WHERE` tar bort raderna med NULL. Då försvinner precis de rader som `LEFT JOIN` skulle behålla.\n\nFlytta villkoret till `ON`.',
    example:
      "SELECT k.namn, o.id FROM kunder k LEFT JOIN ordrar o ON o.kund_id = k.id AND o.status = 'skickad';",
    task: 'Uppgift: Laga frågan så att alla tolv elever kommer med, med NULL för dem som inte läst Programmering (`kurs_id` 4).',
    starterCode:
      'SELECT e.fornamn, r.poang\nFROM elever e\nLEFT JOIN resultat r ON r.elev_id = e.id\nWHERE r.kurs_id = 4;\n',
    solution:
      'SELECT e.fornamn, r.poang\nFROM elever e\nLEFT JOIN resultat r ON r.elev_id = e.id AND r.kurs_id = 4;\n',
    hints: [
      'Vilka elever saknas i svaret?',
      'WHERE r.kurs_id = 4 är aldrig sant när r är NULL.',
      'Flytta villkoret: ON r.elev_id = e.id AND r.kurs_id = 4',
    ],
    tests: [{ description: 'Alla tolv elever', check: 'rows' }],
  },
];
