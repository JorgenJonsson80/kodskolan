// Förklaringen när man håller musen över koden: nyckelord, funktioner och
// övningens tabeller och kolumner. tables kommer från engine.js
// (describeDatabase): [{ name, columns: [{ name, type, notNull,
// primaryKey }], count }]. Lägg till nyckelord och funktioner i tabellerna
// nedan när nya banor använder dem.

export const KEYWORDS = {
  SELECT: [
    'SELECT – välj kolumner',
    'Säger vilka kolumner som ska vara med i svaret. `*` betyder alla.',
  ],
  FROM: ['FROM – från tabellen', 'Säger vilken tabell raderna hämtas från.'],
  WHERE: [
    'WHERE – bara raderna där …',
    'Behåller bara raderna där villkoret är sant. Tittar på en rad i taget.',
  ],
  AND: ['AND – och', 'Båda villkoren måste vara sanna.'],
  OR: ['OR – eller', 'Det räcker att ett av villkoren är sant.'],
  NOT: ['NOT – inte', 'Vänder på villkoret: sant blir falskt.'],
  IN: [
    'IN – något av',
    "Sant om värdet finns i listan, t.ex. `stad IN ('Malmö', 'Lund')`.",
  ],
  BETWEEN: [
    'BETWEEN – mellan',
    '`pris BETWEEN 50 AND 100` tar med både 50 och 100.',
  ],
  LIKE: [
    'LIKE – liknar ett mönster',
    "`%` betyder vilka tecken som helst, `_` exakt ett tecken. `namn LIKE 'A%'` är namn som börjar på A.",
  ],
  IS: [
    'IS – jämför med NULL',
    '`IS NULL` och `IS NOT NULL` kollar om ett värde saknas. `= NULL` fungerar inte.',
  ],
  NULL: [
    'NULL – värde saknas',
    'NULL betyder "vet inte". Det är inte 0 och inte tom text, och `= NULL` blir aldrig sant.',
  ],
  ORDER: [
    'ORDER BY – sortera',
    'Sorterar svaret. `ASC` från minst (standard), `DESC` från störst.',
  ],
  GROUP: [
    'GROUP BY – gruppera',
    'Slår ihop rader med samma värde till en grupp, så att `COUNT`, `SUM` m.fl. räknar per grupp.',
  ],
  BY: ['BY', 'Hör till `ORDER BY` eller `GROUP BY`.'],
  HAVING: [
    'HAVING – bara grupperna där …',
    'Som `WHERE`, men för grupper efter `GROUP BY`. Här går det att använda `COUNT`, `SUM` …',
  ],
  ASC: ['ASC – stigande', 'Från minst till störst, A till Ö. Det är standard.'],
  DESC: ['DESC – fallande', 'Från störst till minst, Ö till A.'],
  LIMIT: ['LIMIT – högst', 'Visar bara så här många rader.'],
  OFFSET: ['OFFSET – hoppa över', 'Hoppar över så här många rader först.'],
  DISTINCT: ['DISTINCT – utan dubbletter', 'Samma rad visas bara en gång.'],
  AS: [
    'AS – nytt namn',
    'Ger kolumnen eller tabellen ett namn (ett alias) i svaret.',
  ],
  JOIN: [
    'JOIN – koppla ihop tabeller',
    'Sätter ihop rader från två tabeller där villkoret efter `ON` stämmer.',
  ],
  INNER: [
    'INNER JOIN',
    'Bara rader som har en match i båda tabellerna. Samma som `JOIN`.',
  ],
  LEFT: [
    'LEFT JOIN – behåll alla till vänster',
    'Alla rader från den första tabellen, även de utan match. Det som saknas blir NULL.',
  ],
  ON: ['ON – kopplas på', 'Villkoret som säger vilka rader som hör ihop.'],
  CASE: [
    'CASE – om … så',
    '`CASE WHEN villkor THEN värde ELSE annat END` väljer ett värde per rad.',
  ],
  WHEN: ['WHEN – när', 'Ett villkor i `CASE`.'],
  THEN: ['THEN – då', 'Värdet när villkoret i `WHEN` är sant.'],
  ELSE: ['ELSE – annars', 'Värdet när inget `WHEN` stämde.'],
  END: ['END', 'Avslutar `CASE`.'],
  INSERT: ['INSERT INTO – lägg till', 'Lägger till nya rader i en tabell.'],
  INTO: ['INTO', 'Hör till `INSERT INTO`: tabellen raderna läggs i.'],
  VALUES: [
    'VALUES – värdena',
    'Värdena i den nya raden, i kolumnernas ordning.',
  ],
  UPDATE: [
    'UPDATE – ändra',
    'Ändrar rader. Glöm inte `WHERE`, annars ändras alla.',
  ],
  SET: ['SET – sätt till', 'Vilka kolumner som får nya värden i `UPDATE`.'],
  DELETE: [
    'DELETE FROM – ta bort',
    'Tar bort rader. Utan `WHERE` försvinner alla.',
  ],
  CREATE: ['CREATE TABLE – skapa tabell', 'Skapar en ny tabell med kolumner.'],
  TABLE: ['TABLE', 'Hör till `CREATE TABLE` eller `DROP TABLE`.'],
  DROP: [
    'DROP TABLE – ta bort tabellen',
    'Tar bort hela tabellen och allt i den.',
  ],
  PRIMARY: [
    'PRIMARY KEY – radens id',
    'Kolumnen som pekar ut en rad. Värdet måste vara unikt.',
  ],
  KEY: ['KEY', 'Hör till `PRIMARY KEY` eller `FOREIGN KEY`.'],
  FOREIGN: [
    'FOREIGN KEY – pekar på en annan tabell',
    'Värdet måste finnas som id i den andra tabellen.',
  ],
  REFERENCES: [
    'REFERENCES – pekar på',
    'Säger vilken tabell och kolumn en främmande nyckel pekar på.',
  ],
  UNIQUE: ['UNIQUE – unik', 'Två rader får inte ha samma värde här.'],
  DEFAULT: ['DEFAULT – standardvärde', 'Värdet om inget annat anges.'],
  CHECK: ['CHECK – regel', 'Ett villkor som varje rad måste uppfylla.'],
  INTEGER: ['INTEGER – heltal', 'Hela tal, som 7 och -3.'],
  TEXT: ['TEXT – text', "Text, som 'Göteborg'."],
  REAL: ['REAL – decimaltal', 'Tal med decimaler, som 89.5.'],
  WITH: [
    'WITH – en namngiven fråga',
    'Ger en fråga ett namn, så att den går att använda som en tabell längre ner.',
  ],
  UNION: [
    'UNION – lägg ihop',
    'Lägger ihop svaren från två frågor, utan dubbletter.',
  ],
  EXISTS: [
    'EXISTS – finns det',
    'Sant om frågan inom parentesen ger någon rad.',
  ],
  OVER: [
    'OVER – fönsterfunktion',
    'Räknar över flera rader men behåller varje rad, i stället för att slå ihop dem som `GROUP BY`.',
  ],
  PARTITION: [
    'PARTITION BY – per grupp',
    'Fönsterfunktionen börjar om för varje grupp.',
  ],
};

export const FUNCTIONS = {
  COUNT: [
    'COUNT – räkna',
    '`COUNT(*)` räknar rader, `COUNT(kolumn)` rader där kolumnen inte är NULL.',
  ],
  SUM: ['SUM – summa', 'Lägger ihop alla värden.'],
  AVG: ['AVG – medelvärde', 'Summan delat med antalet. NULL räknas inte.'],
  MIN: [
    'MIN – minsta',
    'Det minsta värdet, eller det första i bokstavsordning.',
  ],
  MAX: [
    'MAX – största',
    'Det största värdet, eller det sista i bokstavsordning.',
  ],
  ROUND: ['ROUND – avrunda', '`ROUND(pris, 1)` avrundar till en decimal.'],
  UPPER: ['UPPER – versaler', 'Gör texten till STORA bokstäver.'],
  LOWER: ['LOWER – gemener', 'Gör texten till små bokstäver.'],
  LENGTH: ['LENGTH – längd', 'Antal tecken i texten.'],
  SUBSTR: [
    'SUBSTR – en bit av texten',
    '`SUBSTR(namn, 1, 3)` är de tre första tecknen.',
  ],
  REPLACE: [
    'REPLACE – byt ut',
    "`REPLACE(text, 'a', 'b')` byter varje a mot b.",
  ],
  TRIM: [
    'TRIM – ta bort mellanslag',
    'Tar bort mellanslag i början och slutet.',
  ],
  ABS: ['ABS – absolutbelopp', 'Talet utan minustecken.'],
  COALESCE: [
    'COALESCE – första som inte saknas',
    "Ger det första värdet som inte är NULL, t.ex. `COALESCE(epost, 'saknas')`.",
  ],
  IFNULL: ['IFNULL – om NULL', '`IFNULL(x, 0)` ger 0 när x är NULL.'],
  STRFTIME: [
    'strftime – plocka ut ur ett datum',
    "`strftime('%m', datum)` ger månaden, `'%Y'` året.",
  ],
  DATE: ['date – datum', "`date('2026-06-15', '+7 days')` räknar med datum."],
  JULIANDAY: [
    'julianday – dagnummer',
    'Datumet som ett tal, så att man kan räkna dagar mellan två datum.',
  ],
  CAST: [
    'CAST – gör om',
    '`CAST(x AS INTEGER)` gör om värdet till en annan typ.',
  ],
  IIF: ['IIF – om', '`IIF(villkor, då, annars)` – ett kort `CASE`.'],
  ROW_NUMBER: [
    'ROW_NUMBER – radnummer',
    'Numrerar raderna 1, 2, 3 … i ordningen i `OVER`.',
  ],
  RANK: ['RANK – placering', 'Placering med delade platser: 1, 2, 2, 4.'],
  DENSE_RANK: [
    'DENSE_RANK – placering utan hopp',
    'Delade platser utan hopp: 1, 2, 2, 3.',
  ],
  LAG: ['LAG – förra raden', 'Värdet på raden före, i ordningen i `OVER`.'],
  LEAD: ['LEAD – nästa rad', 'Värdet på raden efter, i ordningen i `OVER`.'],
};

const typeText = column =>
  [
    column.type || 'utan typ',
    column.primaryKey && 'radens id',
    column.notNull && !column.primaryKey && 'måste ha ett värde',
  ]
    .filter(Boolean)
    .join(', ');

// Det som står vid pos, som { from, to, title, body }, eller null.
// token: { name, text, from, to } från syntaxträdet.
export function describeToken(token, tables, before = '') {
  const upper = token.text.toUpperCase();
  if (
    token.name === 'Keyword' ||
    token.name === 'Type' ||
    token.name === 'Builtin'
  ) {
    const entry = FUNCTIONS[upper] ?? KEYWORDS[upper];
    return (
      entry && {
        from: token.from,
        to: token.to,
        title: entry[0],
        body: entry[1],
      }
    );
  }
  if (token.name !== 'Identifier' && token.name !== 'QuotedIdentifier') {
    return null;
  }
  const name = token.text.replace(/^"|"$/g, '').toLowerCase();
  if (FUNCTIONS[upper]) {
    const entry = FUNCTIONS[upper];
    return { from: token.from, to: token.to, title: entry[0], body: entry[1] };
  }
  const table = tables.find(item => item.name.toLowerCase() === name);
  if (table) {
    return {
      from: token.from,
      to: token.to,
      title: `Tabellen ${table.name}`,
      body: `${table.count} rader. Kolumner: ${table.columns.map(column => `\`${column.name}\``).join(', ')}.`,
    };
  }
  const owners = tables.filter(item =>
    item.columns.some(column => column.name.toLowerCase() === name),
  );
  if (owners.length > 0) {
    const column = owners[0].columns.find(
      item => item.name.toLowerCase() === name,
    );
    return {
      from: token.from,
      to: token.to,
      title: `Kolumnen ${column.name}`,
      body:
        owners.length === 1
          ? `Finns i \`${owners[0].name}\` (${typeText(column)}).`
          : `Finns i ${owners.map(item => `\`${item.name}\``).join(' och ')}. Skriv vilken du menar, t.ex. \`${owners[0].name}.${column.name}\`.`,
    };
  }
  if (/\bAS\s*$/i.test(before)) {
    return {
      from: token.from,
      to: token.to,
      title: `${token.text} – ett namn du valt`,
      body: 'Ett alias: det namn kolumnen eller tabellen får i den här frågan.',
    };
  }
  return null;
}
