// Bana 3: ORDER BY, DISTINCT, AS och COUNT, SUM, AVG, MIN och MAX över
// hela tabellen. Ingen GROUP BY än (bana 4). Sorteringen rättas med
// ordered: true, så värdena det sorteras på får inte ha dubbletter.
const START = '-- Skriv din fråga här\n';

export const SORTERA = [
  {
    id: 'sortera-01',
    track: 'sortera',
    db: 'butik',
    title: 'Sortera',
    xp: 10,
    description:
      'Utan sortering kommer raderna i den ordning de råkar ligga. En kund vill se det billigaste först.',
    explain:
      '`ORDER BY pris` sist i frågan sorterar svaret efter priset, från lägst till högst.\n\nTexter sorteras i bokstavsordning. Utan `ORDER BY` lovar databasen ingen ordning alls, även om det ofta ser ut som tabellens.',
    example: 'SELECT titel, ar FROM filmer ORDER BY ar;',
    task: 'Uppgift: Visa `namn` och `pris` för alla produkter, med den billigaste först.',
    starterCode: START,
    solution: 'SELECT namn, pris FROM produkter ORDER BY pris;\n',
    hints: [
      'ORDER BY står sist i frågan.',
      'Sortera på kolumnen pris.',
      'SELECT namn, pris FROM produkter ORDER BY pris;',
    ],
    tests: [
      {
        description: 'Billigast först',
        check: 'rows',
        ordered: true,
      },
    ],
  },
  {
    id: 'sortera-02',
    track: 'sortera',
    db: 'filmer',
    title: 'Störst först',
    xp: 10,
    description: 'Vilka filmer tar längst tid att se?',
    explain:
      '`DESC` efter kolumnen vänder på ordningen: störst först, eller Ö till A för text. Det betyder *descending*, fallande.\n\nStandard är `ASC`, stigande, och det behöver man inte skriva.',
    example: 'SELECT namn, pris FROM produkter ORDER BY pris DESC;',
    task: 'Uppgift: Visa `titel` och `langd` för alla filmer, med den längsta först.',
    starterCode: START,
    solution: 'SELECT titel, langd FROM filmer ORDER BY langd DESC;\n',
    hints: [
      'Sortera på langd.',
      'DESC efter kolumnen ger störst först.',
      'ORDER BY langd DESC',
    ],
    tests: [{ description: 'Längst först', check: 'rows', ordered: true }],
  },
  {
    id: 'sortera-03',
    track: 'sortera',
    db: 'skola',
    title: 'Sortera på två saker',
    xp: 15,
    description:
      'Läraren vill ha klasslistan per klass, och i bokstavsordning inom varje klass.',
    explain:
      'Med flera kolumner i `ORDER BY` sorteras det först på den första. Bara när den är lika avgör nästa: `ORDER BY klass, efternamn`.\n\nVarje kolumn kan ha sin egen riktning: `ORDER BY klass, poang DESC`.',
    example: 'SELECT titel, genre, ar FROM filmer ORDER BY genre, ar DESC;',
    task: 'Uppgift: Visa `klass`, `efternamn` och `fornamn` för alla elever, sorterat på klass och sedan efternamn.',
    starterCode: START,
    solution:
      'SELECT klass, efternamn, fornamn FROM elever ORDER BY klass, efternamn;\n',
    hints: [
      'Två kolumner i ORDER BY, med kommatecken mellan.',
      'klass först, sedan efternamn.',
      'ORDER BY klass, efternamn',
    ],
    tests: [
      {
        description: 'Per klass och i bokstavsordning',
        check: 'rows',
        ordered: true,
      },
    ],
  },
  {
    id: 'sortera-04',
    track: 'sortera',
    db: 'butik',
    title: 'Topp tre',
    xp: 15,
    description: 'Vilka är butikens tre dyraste produkter?',
    explain:
      '`ORDER BY` och `LIMIT` tillsammans ger en topplista: sortera först, ta sedan de första.\n\nOrdningen i frågan är alltid `SELECT`, `FROM`, `WHERE`, `ORDER BY` och sist `LIMIT`.',
    example: 'SELECT titel FROM filmer ORDER BY ar DESC LIMIT 2;',
    task: 'Uppgift: Visa `namn` och `pris` för de tre dyraste produkterna, med den dyraste först.',
    starterCode: START,
    solution: 'SELECT namn, pris FROM produkter ORDER BY pris DESC LIMIT 3;\n',
    hints: [
      'Sortera med den dyraste först.',
      'LIMIT står sist, efter ORDER BY.',
      'ORDER BY pris DESC LIMIT 3',
    ],
    tests: [
      {
        description: 'De tre dyraste',
        check: 'rows',
        ordered: true,
        expected: [
          ['Termos', 299],
          ['Kaffekopp', 149],
          ['Espresso Bönor', 129],
        ],
      },
    ],
  },
  {
    id: 'sortera-05',
    track: 'sortera',
    db: 'butik',
    title: 'Utan dubbletter',
    xp: 15,
    description: 'I vilka städer har butiken kunder?',
    explain:
      '`SELECT stad FROM kunder` ger en rad per kund, så Göteborg kommer flera gånger. `SELECT DISTINCT stad` visar varje stad en gång.\n\n`DISTINCT` gäller hela raden: med två kolumner försvinner bara rader där båda är lika.',
    example: 'SELECT DISTINCT genre FROM filmer;',
    task: 'Uppgift: Visa varje `stad` där det bor en kund, bara en gång var, i bokstavsordning.',
    starterCode: START,
    solution: 'SELECT DISTINCT stad FROM kunder ORDER BY stad;\n',
    hints: [
      'DISTINCT står direkt efter SELECT.',
      'Sortera på stad.',
      'SELECT DISTINCT stad FROM kunder ORDER BY stad;',
    ],
    tests: [
      {
        description: 'Fem städer i bokstavsordning',
        check: 'rows',
        ordered: true,
        expected: [
          ['Göteborg'],
          ['Malmö'],
          ['Stockholm'],
          ['Umeå'],
          ['Uppsala'],
        ],
      },
    ],
  },
  {
    id: 'sortera-06',
    track: 'sortera',
    db: 'butik',
    title: 'Ett bättre namn',
    xp: 15,
    description:
      'En uträknad kolumn heter som uträkningen, `pris * lager`. Det går att ge den ett bättre namn.',
    explain:
      '`AS` ger kolumnen ett nytt namn i svaret: `pris * lager AS lagervarde`. Namnet kallas alias.\n\nDet går att sortera på aliaset: `ORDER BY lagervarde DESC`. Skriv aliaset utan mellanslag och utan å, ä och ö, så slipper du citattecken.',
    example: 'SELECT titel, langd / 60.0 AS timmar FROM filmer;',
    task: 'Uppgift: Visa `namn` och lagrets värde som `lagervarde` (`pris * lager`) för produkterna som finns i lager (`lager > 0`), med det högsta värdet först.',
    starterCode: START,
    solution:
      'SELECT namn, pris * lager AS lagervarde\nFROM produkter\nWHERE lager > 0\nORDER BY lagervarde DESC;\n',
    hints: [
      'AS står efter uträkningen.',
      'pris * lager AS lagervarde',
      'WHERE lager > 0, och sist ORDER BY lagervarde DESC.',
    ],
    tests: [
      {
        description: 'Kolumnerna är namn och lagervarde',
        check: 'columns',
        expected: ['namn', 'lagervarde'],
      },
      { description: 'Högst värde först', check: 'rows', ordered: true },
    ],
  },
  {
    id: 'sortera-07',
    track: 'sortera',
    db: 'butik',
    title: 'Räkna rader',
    xp: 15,
    description: 'Hur många kunder bor i Stockholm?',
    explain:
      '`COUNT(*)` räknar raderna. I stället för en rad per kund får du en enda rad med antalet.\n\nTillsammans med `WHERE` räknas bara raderna som är kvar: först filtreras det, sedan räknas det.',
    example: "SELECT COUNT(*) FROM filmer WHERE genre = 'Drama';",
    task: 'Uppgift: Räkna hur många kunder som bor i `Stockholm`. Kalla kolumnen `antal`.',
    starterCode: START,
    solution:
      "SELECT COUNT(*) AS antal FROM kunder WHERE stad = 'Stockholm';\n",
    hints: [
      'COUNT(*) räknar raderna.',
      "Bara kunderna där stad = 'Stockholm'.",
      "SELECT COUNT(*) AS antal FROM kunder WHERE stad = 'Stockholm';",
    ],
    tests: [
      { description: 'Tre kunder', check: 'rows', expected: [[3]] },
      {
        description: 'Kolumnen heter antal',
        check: 'columns',
        expected: ['antal'],
      },
    ],
  },
  {
    id: 'sortera-08',
    track: 'sortera',
    db: 'butik',
    title: 'Summan',
    xp: 15,
    description:
      'Hur många kanelbullar har butiken sålt? Kanelbullen har id 7.',
    explain:
      '`SUM(antal)` lägger ihop alla värden i kolumnen. Som `COUNT` ger den en enda rad.\n\nTabellen `orderrader` har en rad för varje vara i varje order. `antal` är hur många av varan som köptes.',
    example: 'SELECT SUM(lager) FROM produkter;',
    task: 'Uppgift: Räkna ut hur många kanelbullar (`produkt_id` 7) som sålts totalt. Kalla kolumnen `salda`.',
    starterCode: START,
    solution:
      'SELECT SUM(antal) AS salda FROM orderrader WHERE produkt_id = 7;\n',
    hints: [
      'SUM(antal) lägger ihop antalet.',
      'Bara raderna där produkt_id = 7.',
      'SELECT SUM(antal) AS salda FROM orderrader WHERE produkt_id = 7;',
    ],
    tests: [
      { description: '24 kanelbullar', check: 'rows', expected: [[24]] },
      {
        description: 'Kolumnen heter salda',
        check: 'columns',
        expected: ['salda'],
      },
    ],
  },
  {
    id: 'sortera-09',
    track: 'sortera',
    db: 'filmer',
    title: 'Minst, störst och snittet',
    xp: 20,
    description:
      'Hur långa är långfilmerna? Kortfilmen på 12 minuter ska inte räknas.',
    explain:
      '`MIN` ger det minsta värdet, `MAX` det största och `AVG` medelvärdet. De kan stå flera i samma `SELECT`, med var sitt alias.\n\nAlla räknar bara raderna som är kvar efter `WHERE`.',
    example:
      'SELECT MIN(pris) AS billigast, MAX(pris) AS dyrast FROM produkter;',
    task: 'Uppgift: Visa den kortaste, den längsta och medellängden för filmerna som är längre än 60 minuter, som `kortast`, `langst` och `snitt`.',
    starterCode: START,
    solution:
      'SELECT MIN(langd) AS kortast, MAX(langd) AS langst, AVG(langd) AS snitt\nFROM filmer\nWHERE langd > 60;\n',
    hints: [
      'Tre funktioner i samma SELECT: MIN, MAX och AVG.',
      'Varje får sitt namn med AS.',
      'WHERE langd > 60 tar bort kortfilmen.',
    ],
    tests: [
      {
        description: 'Kolumnerna är kortast, langst och snitt',
        check: 'columns',
        expected: ['kortast', 'langst', 'snitt'],
      },
      { description: 'Rätt värden', check: 'rows' },
    ],
  },
];
