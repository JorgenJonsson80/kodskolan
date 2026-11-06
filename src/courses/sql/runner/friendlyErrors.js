// SQLites fel förklarade på svenska. error kommer från engine.js och har
// message (SQLites eget), line och suggestion (ett namn som liknar det
// som var fel). Nya regler läggs till i RULES, den första som passar
// vinner.

const didYouMean = suggestion =>
  suggestion ? ` Menade du \`${suggestion}\`?` : '';

const RULES = [
  {
    pattern: /near "(,)": syntax error/,
    text: () =>
      'Ett kommatecken står fel. Kolla att det finns ett kommatecken *mellan* kolumnerna, men inget efter den sista.',
  },
  {
    pattern: /near "(FROM|WHERE|GROUP|ORDER|HAVING|LIMIT)": syntax error/i,
    text: ([, word]) =>
      `SQL blev förvirrad precis före \`${word.toUpperCase()}\`. Oftast är det ett kommatecken för mycket efter den sista kolumnen, eller ett ord som saknas.`,
  },
  {
    pattern: /near "([^"]+)": syntax error/,
    text: ([, word], error) =>
      error.suggestion
        ? `SQL känner inte igen \`${word}\`.${didYouMean(error.suggestion)}`
        : `SQL förstod inte \`${word}\`. Kolla stavningen och att kommatecken, parenteser och citattecken står rätt. Ofta är felet precis före \`${word}\`.`,
  },
  {
    pattern: /incomplete input/,
    text: () =>
      'Frågan tar slut för tidigt. Saknas något efter sista ordet, en parentes som aldrig stängs eller ett citattecken som aldrig tar slut?',
  },
  {
    pattern: /unrecognized token: "'/,
    text: () =>
      "En text börjar med `'` men tar aldrig slut. Varje text behöver ett citattecken i början och ett i slutet.",
  },
  {
    pattern: /unrecognized token: "([^"]+)"/,
    text: ([, token]) =>
      `SQL känner inte igen tecknet \`${token}\`. Kanske ett felskrivet citattecken? I SQL skrivs text med raka enkla citattecken: \`'så här'\`.`,
  },
  {
    pattern: /no such column: (\S+)/,
    text: ([, name], error) =>
      error.suggestion
        ? `Kolumnen \`${name}\` finns inte.${didYouMean(error.suggestion)}`
        : /^[A-ZÅÄÖ]/.test(name)
          ? `Kolumnen \`${name}\` finns inte. Är det en text? Då ska den stå inom enkla citattecken: \`'${name}'\`.`
          : `Kolumnen \`${name}\` finns inte. Kolla i 📋 Tabellerna vilka kolumner som finns.`,
  },
  {
    pattern: /no such table: (\S+)/,
    text: ([, name], error) =>
      `Tabellen \`${name}\` finns inte.${didYouMean(error.suggestion) || ' Kolla i 📋 Tabellerna vilka tabeller som finns.'}`,
  },
  {
    pattern: /no such function: (\S+)/,
    text: ([, name]) =>
      `Funktionen \`${name}\` finns inte i SQLite. Kolla stavningen, eller om den heter något annat här.`,
  },
  {
    pattern: /ambiguous column name: (\S+)/,
    text: ([, name]) =>
      `Kolumnen \`${name}\` finns i flera av tabellerna, så SQL vet inte vilken du menar. Skriv tabellen framför, t.ex. \`kunder.${name}\`.`,
  },
  {
    pattern: /misuse of aggregate/,
    text: () =>
      '`COUNT`, `SUM`, `AVG`, `MIN` och `MAX` räknar ihop flera rader, så de kan inte stå i `WHERE`, som tittar på en rad i taget. Använd `HAVING` efter `GROUP BY` i stället.',
  },
  {
    pattern: /GROUP BY clause is required before HAVING/,
    text: () =>
      '`HAVING` filtrerar grupper, så det behövs ett `GROUP BY` före. Vill du filtrera rader skriver du `WHERE`.',
  },
  {
    pattern: /aggregate functions are not allowed in the GROUP BY/,
    text: () =>
      'Man kan inte gruppera på `COUNT`, `SUM` eller liknande. Gruppera på en kolumn, och räkna i `SELECT`.',
  },
  {
    pattern: /wrong number of arguments to function (\w+)/,
    text: ([, name]) =>
      `\`${name}\` fick fel antal värden inom parentesen. Kolla hur många den ska ha.`,
  },
  {
    pattern: /(\d+) values for (\d+) columns/,
    text: ([, values, columns]) =>
      `Du gav ${values} värden men räknade upp ${columns} kolumner. Det ska vara lika många, i samma ordning.`,
  },
  {
    pattern: /table (\S+) has (\d+) columns but (\d+) values were supplied/,
    text: ([, table, columns, values]) =>
      `Tabellen \`${table}\` har ${columns} kolumner men du gav ${values} värden. Räkna upp kolumnerna du fyller i: \`INSERT INTO ${table} (kolumn1, kolumn2) VALUES (…)\`.`,
  },
  {
    pattern: /NOT NULL constraint failed: (\S+)/,
    text: ([, column]) =>
      `\`${column}\` måste ha ett värde, den får inte vara tom (\`NOT NULL\`).`,
  },
  {
    pattern: /UNIQUE constraint failed: (\S+)/,
    text: ([, column]) =>
      `Det finns redan en rad med samma \`${column}\`. Den måste vara unik.`,
  },
  {
    pattern: /FOREIGN KEY constraint failed/,
    text: () =>
      'Raden pekar på något som inte finns, eller något annat pekar på raden du tar bort. Ett id som används i en annan tabell måste finnas på riktigt.',
  },
  {
    pattern: /CHECK constraint failed: (.+)/,
    text: ([, rule]) =>
      `Värdet stoppades av en regel i tabellen (\`CHECK\`): \`${rule}\`.`,
  },
  {
    pattern: /table (\S+) already exists/,
    text: ([, table]) =>
      `Tabellen \`${table}\` finns redan. Vill du börja om: skriv \`DROP TABLE ${table};\` först.`,
  },
  {
    pattern: /ORDER BY term out of range/,
    text: () =>
      'Ett tal i `ORDER BY` betyder kolumnens nummer i `SELECT`, och den kolumnen finns inte.',
  },
  {
    pattern: /sub-select returns (\d+) columns - expected 1/,
    text: ([, count]) =>
      `Frågan inom parentesen ger ${count} kolumner, men här behövs exakt en. Välj bara den kolumn som ska jämföras.`,
  },
  {
    pattern:
      /SELECTs to the left and right of (\w+) do not have the same number/,
    text: ([, word]) =>
      `Frågorna på båda sidor om \`${word}\` måste ha lika många kolumner.`,
  },
  {
    pattern: /circular reference|recursive/i,
    text: () =>
      'Frågan pekar på sig själv utan att ta slut. Kolla villkoret som ska stoppa den.',
  },
];

export function explainError(error) {
  for (const rule of RULES) {
    const match = error.message.match(rule.pattern);
    if (match) return rule.text(match, error);
  }
  return 'Läs SQLites felmeddelande nedan. Det säger vad som gick fel, oftast med namnet på det som inte stämmer.';
}

export function errorTitle(error, isSyntax) {
  const where = error.line ? ` på rad ${error.line}` : '';
  return isSyntax
    ? `SQL kunde inte läsa frågan${where}`
    : `Frågan stoppade med ett fel${where}`;
}
