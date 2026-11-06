// Bana 5: funktioner på värden (ROUND, UPPER, LENGTH, SUBSTR), || för
// att sätta ihop text, datum med strftime och julianday, och CASE WHEN.
// Ingen JOIN än (bana 6).
const START = '-- Skriv din fråga här\n';

export const OMVANDLA = [
  {
    id: 'omvandla-01',
    track: 'omvandla',
    db: 'filmer',
    title: 'Avrunda',
    xp: 10,
    description:
      'Snittbetyget 4.666666666666667 är svårt att läsa. En decimal räcker.',
    explain:
      '`ROUND(värde, 1)` avrundar till en decimal. Utan siffran efter kommatecknet avrundas det till ett heltal.\n\nFunktionen kan stå runt allt, även runt en annan funktion: `ROUND(AVG(betyg), 1)`.',
    example: 'SELECT namn, ROUND(pris * 1.25, 2) FROM produkter;',
    task: 'Uppgift: Visa varje `film_id` och snittbetyget avrundat till en decimal, som `snitt`.',
    starterCode: START,
    solution:
      'SELECT film_id, ROUND(AVG(betyg), 1) AS snitt\nFROM recensioner\nGROUP BY film_id;\n',
    hints: [
      'Börja med snittet per film: AVG(betyg) och GROUP BY film_id.',
      'Lägg ROUND( … , 1) runt AVG(betyg).',
      'SELECT film_id, ROUND(AVG(betyg), 1) AS snitt FROM recensioner GROUP BY film_id;',
    ],
    tests: [
      { description: 'Snittet med en decimal', check: 'rows' },
      {
        description: 'Kolumnerna är film_id och snitt',
        check: 'columns',
        expected: ['film_id', 'snitt'],
      },
    ],
  },
  {
    id: 'omvandla-02',
    track: 'omvandla',
    db: 'skola',
    title: 'Sätt ihop text',
    xp: 15,
    description:
      'Förnamn och efternamn står i var sin kolumn. Klasslistan vill ha hela namnet.',
    explain:
      "`||` sätter ihop text: `fornamn || ' ' || efternamn` blir `Alva Lindqvist`. Mellanslaget i mitten är en egen text, `' '`.\n\nGe den nya kolumnen ett namn med `AS`, annars heter den som uträkningen.",
    example: "SELECT titel || ' (' || ar || ')' AS film FROM filmer;",
    task: 'Uppgift: Visa hela namnet (förnamn, mellanslag, efternamn) som `namn`, och `klass`, för alla elever.',
    starterCode: START,
    solution:
      "SELECT fornamn || ' ' || efternamn AS namn, klass FROM elever;\n",
    hints: [
      'Text sätts ihop med ||.',
      "Mellanslaget är en egen text: ' '.",
      "fornamn || ' ' || efternamn AS namn",
    ],
    tests: [
      { description: 'Hela namnet och klassen', check: 'rows' },
      {
        description: 'Kolumnerna är namn och klass',
        check: 'columns',
        expected: ['namn', 'klass'],
      },
    ],
  },
  {
    id: 'omvandla-03',
    track: 'omvandla',
    db: 'butik',
    title: 'Stora bokstäver',
    xp: 10,
    description: 'Bakverken ska få skyltar i disken, med stora bokstäver.',
    explain:
      "`UPPER(namn)` gör om texten till versaler och `LOWER` till gemener.\n\nI SQLite fungerar de bara på a till z. Å, ä och ö ändras inte, så `UPPER('Göteborg')` blir `GöTEBORG`.",
    example: 'SELECT UPPER(titel) FROM filmer;',
    task: 'Uppgift: Visa namnet med stora bokstäver, som `skylt`, för produkterna i kategorin `Bakverk`.',
    starterCode: START,
    solution:
      "SELECT UPPER(namn) AS skylt FROM produkter WHERE kategori = 'Bakverk';\n",
    hints: [
      'UPPER(namn) ger versaler.',
      "Bara kategorin Bakverk: WHERE kategori = 'Bakverk'.",
      "SELECT UPPER(namn) AS skylt FROM produkter WHERE kategori = 'Bakverk';",
    ],
    tests: [
      {
        description: 'Tre skyltar',
        check: 'rows',
        expected: [['KANELBULLE'], ['CHOKLADBOLL'], ['MOROTSKAKA']],
      },
    ],
  },
  {
    id: 'omvandla-04',
    track: 'omvandla',
    db: 'bibliotek',
    title: 'Hur lång är texten?',
    xp: 15,
    description: 'Vilka böcker har längst titel? De får inte plats på ryggen.',
    explain:
      '`LENGTH(titel)` räknar tecknen i texten, med mellanslag.\n\nDu kan sortera på aliaset precis som på en vanlig kolumn.',
    example: 'SELECT namn, LENGTH(namn) AS tecken FROM kunder;',
    task: 'Uppgift: Visa `titel` och antal tecken som `tecken` för de tre böckerna med längst titel, längst först.',
    starterCode: START,
    solution:
      'SELECT titel, LENGTH(titel) AS tecken\nFROM bocker\nORDER BY tecken DESC\nLIMIT 3;\n',
    hints: [
      'LENGTH(titel) AS tecken',
      'Sortera på tecken med DESC.',
      'LIMIT 3 sist.',
    ],
    tests: [
      { description: 'De tre längsta titlarna', check: 'rows', ordered: true },
    ],
  },
  {
    id: 'omvandla-05',
    track: 'omvandla',
    db: 'skola',
    title: 'En bit av texten',
    xp: 15,
    description: 'Läraren rättar med initialer i stället för hela namn.',
    explain:
      '`SUBSTR(text, start, antal)` plockar ut en bit av texten. Första tecknet har nummer 1, så `SUBSTR(fornamn, 1, 1)` är första bokstaven.\n\nMed `||` går bitarna att sätta ihop.',
    example: 'SELECT SUBSTR(titel, 1, 5) FROM filmer;',
    task: 'Uppgift: Visa varje elevs initialer, första bokstaven i förnamnet och i efternamnet, som `initialer`, och `klass`.',
    starterCode: START,
    solution:
      'SELECT SUBSTR(fornamn, 1, 1) || SUBSTR(efternamn, 1, 1) AS initialer, klass\nFROM elever;\n',
    hints: [
      'SUBSTR(fornamn, 1, 1) är första bokstaven.',
      'Sätt ihop två SUBSTR med ||.',
      'SUBSTR(fornamn, 1, 1) || SUBSTR(efternamn, 1, 1) AS initialer',
    ],
    tests: [
      { description: 'Initialer och klass', check: 'rows' },
      {
        description: 'Kolumnerna är initialer och klass',
        check: 'columns',
        expected: ['initialer', 'klass'],
      },
    ],
  },
  {
    id: 'omvandla-06',
    track: 'omvandla',
    db: 'butik',
    title: 'Månaden ur ett datum',
    xp: 20,
    description:
      'Vilken månad säljer butiken mest? Då behövs månaden ur varje datum.',
    explain:
      "`strftime('%m', datum)` plockar ut månaden, som text: `'03'`. `'%Y'` ger året och `'%d'` dagen.\n\nDet går att gruppera på resultatet, gärna med ett alias: `GROUP BY manad`.",
    example: "SELECT strftime('%Y', '2026-03-14');",
    task: 'Uppgift: Visa varje månad som `manad` och antalet ordrar som `antal`, en rad per månad.',
    starterCode: START,
    solution:
      "SELECT strftime('%m', datum) AS manad, COUNT(*) AS antal\nFROM ordrar\nGROUP BY manad;\n",
    hints: [
      "strftime('%m', datum) ger månaden.",
      'Gruppera på aliaset manad.',
      "SELECT strftime('%m', datum) AS manad, COUNT(*) AS antal FROM ordrar GROUP BY manad;",
    ],
    tests: [
      {
        description: 'Antal ordrar per månad',
        check: 'rows',
        expected: [
          ['01', 2],
          ['02', 3],
          ['03', 3],
          ['04', 2],
          ['05', 3],
          ['06', 2],
        ],
      },
    ],
  },
  {
    id: 'omvandla-07',
    track: 'omvandla',
    db: 'bibliotek',
    title: 'Räkna dagar',
    xp: 20,
    description:
      'Hur många dagar sena är de försenade lånen? Idag är det 2026-06-15.',
    explain:
      "`julianday(datum)` gör om ett datum till ett dagnummer. Två dagnummer kan dras från varandra, så `julianday('2026-06-15') - julianday(forfaller)` är antalet dagar däremellan.",
    example: "SELECT julianday('2026-12-24') - julianday('2026-06-15');",
    task: "Uppgift: Visa `id` och hur många dagar sent lånet är, som `dagar`, för lånen som inte är återlämnade och förföll före `'2026-06-15'`.",
    starterCode: START,
    solution:
      "SELECT id, julianday('2026-06-15') - julianday(forfaller) AS dagar\nFROM lan\nWHERE aterlamnad IS NULL AND forfaller < '2026-06-15';\n",
    hints: [
      'Samma WHERE som i bossen i bana 2.',
      "julianday('2026-06-15') - julianday(forfaller)",
      'Ge uträkningen namnet dagar med AS.',
    ],
    tests: [
      {
        description: 'Dagarna för de tre försenade lånen',
        check: 'rows',
        expected: [
          [5, 15],
          [6, 10],
          [7, 3],
        ],
      },
    ],
  },
  {
    id: 'omvandla-08',
    track: 'omvandla',
    db: 'butik',
    title: 'Om … så',
    xp: 20,
    description: 'Butiken vill dela in produkterna i billiga, mellan och dyra.',
    explain:
      "`CASE` väljer ett värde per rad:\n\n`CASE WHEN pris < 50 THEN 'billig' WHEN pris < 150 THEN 'mellan' ELSE 'dyr' END`\n\nVillkoren prövas uppifrån och det första som stämmer vinner. `ELSE` gäller när inget stämde, och `END` avslutar.",
    example:
      "SELECT titel, CASE WHEN langd > 150 THEN 'lång' ELSE 'lagom' END AS langd FROM filmer;",
    task: 'Uppgift: Visa `namn`, `pris` och `prisklass` för alla produkter: `billig` under 50 kr, `mellan` under 150 kr och annars `dyr`.',
    starterCode: START,
    solution:
      "SELECT namn, pris,\n  CASE\n    WHEN pris < 50 THEN 'billig'\n    WHEN pris < 150 THEN 'mellan'\n    ELSE 'dyr'\n  END AS prisklass\nFROM produkter;\n",
    hints: [
      'CASE WHEN … THEN … WHEN … THEN … ELSE … END',
      "Den första regeln: WHEN pris < 50 THEN 'billig'.",
      'Ge hela CASE namnet prisklass med AS efter END.',
    ],
    tests: [
      { description: 'Prisklassen för varje produkt', check: 'rows' },
      {
        description: 'Kolumnerna är namn, pris och prisklass',
        check: 'columns',
        expected: ['namn', 'pris', 'prisklass'],
      },
    ],
  },
  {
    id: 'omvandla-09',
    track: 'omvandla',
    db: 'skola',
    title: 'Räkna med CASE',
    xp: 20,
    description:
      'Hur många prov blev godkända, och hur många inte? Gränsen är 60 poäng.',
    explain:
      'Ett `CASE` går att gruppera på, precis som en kolumn. Ge det ett alias och skriv aliaset i `GROUP BY`.\n\nDå räknar `COUNT(*)` hur många rader som hamnade i varje värde.',
    example:
      "SELECT CASE WHEN ar < 2000 THEN 'gammal' ELSE 'ny' END AS alder, COUNT(*) FROM filmer GROUP BY alder;",
    task: 'Uppgift: Visa `bedomning` (`godkänd` om `poang` är minst 60, annars `underkänd`) och hur många prov som fick det, som `antal`.',
    starterCode: START,
    solution:
      "SELECT CASE WHEN poang >= 60 THEN 'godkänd' ELSE 'underkänd' END AS bedomning,\n  COUNT(*) AS antal\nFROM resultat\nGROUP BY bedomning;\n",
    hints: [
      "CASE WHEN poang >= 60 THEN 'godkänd' ELSE 'underkänd' END AS bedomning",
      'COUNT(*) AS antal räknar raderna.',
      'GROUP BY bedomning',
    ],
    tests: [
      {
        description: 'Godkända och underkända',
        check: 'rows',
        expected: [
          ['godkänd', 34],
          ['underkänd', 5],
        ],
      },
    ],
  },
];
