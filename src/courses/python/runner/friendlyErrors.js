// Förklarar Pythons felmeddelanden på svenska. Pythons egna "Did you
// mean …?" översätts och läggs sist, de träffar ofta rätt.

const TYPE_NAMES = {
  str: 'text (str)',
  int: 'heltal (int)',
  float: 'decimaltal (float)',
  list: 'listor',
  dict: 'dictionaries',
  tuple: 'tupler',
  bool: 'sant/falskt (bool)',
  NoneType: 'None',
};

const typeName = name => TYPE_NAMES[name] ?? name;

const RULES = [
  {
    pattern: /expected an indented block/,
    text: () =>
      'Efter en rad som slutar med kolon (if, for, while, def …) måste nästa rad vara indragen med 4 mellanslag.',
  },
  {
    pattern: /unexpected indent/,
    text: () =>
      'Den här raden är indragen fast den inte ska vara det. Ta bort mellanslagen i början av raden.',
  },
  {
    pattern: /unindent does not match|inconsistent use of tabs/,
    text: () =>
      'Raderna i ett block måste ha samma indrag. Kolla att de börjar lika långt in.',
  },
  {
    pattern: /expected ':'/,
    text: () =>
      'Det saknas ett kolon (:) efter if, elif, else, for, while eller def.',
  },
  {
    pattern: /Missing parentheses in call to 'print'/,
    text: () =>
      'I Python 3 är print en funktion. Skriv print("…") med parenteser.',
  },
  {
    pattern: /unterminated (triple-quoted )?string literal/,
    text: () =>
      'En text saknar sitt avslutande citattecken. Text börjar och slutar med samma tecken: "så här" eller \'så här\'.',
  },
  {
    pattern: /'([([{])' was never closed/,
    text: match =>
      `En ${match[1]} öppnas men stängs aldrig. Räkna parenteserna.`,
  },
  {
    pattern: /unmatched '([)\]}])'/,
    text: match =>
      `Det finns en ${match[1]} för mycket, eller så saknas den som öppnar.`,
  },
  {
    pattern: /Maybe you meant '==' or ':=' instead of '='/,
    text: () =>
      'Ett = sparar ett värde i en variabel. För att jämföra två värden använder man ==.',
  },
  {
    pattern: /Perhaps you forgot a comma/,
    text: () => 'Det verkar saknas ett kommatecken mellan två saker.',
  },
  {
    pattern: /invalid syntax/,
    text: () =>
      'Python förstår inte raden. Kolla citattecken, parenteser, kolon och stavning.',
  },
  {
    pattern: /NameError: name 'self' is not defined/,
    text: () =>
      '`self` finns bara inuti en metod, och bara om den står först bland parametrarna: def metod(self).',
  },
  {
    pattern: /NameError: name '(random|math|datetime|string)' is not defined/,
    text: match =>
      `\`${match[1]}\` är en modul som måste hämtas först. Skriv \`import ${match[1]}\` högst upp i koden.`,
  },
  {
    pattern: /NameError: name '(date|timedelta)' is not defined/,
    text: match =>
      `\`${match[1]}\` finns i modulen datetime. Skriv \`from datetime import ${match[1]}\` högst upp i koden.`,
  },
  {
    pattern: /No module named 'pandas'/,
    text: () =>
      'pandas kunde inte laddas. Kolla internetanslutningen och kör koden igen.',
  },
  {
    pattern: /truth value of a (Series|DataFrame) is ambiguous/,
    text: () =>
      'I pandas skrivs "och" med & och "eller" med |, inte and och or. Sätt varje villkor inom egna parenteser: df[(df["a"] > 1) & (df["b"] < 5)].',
  },
  {
    pattern: /No module named '(\w+)'/,
    text: match =>
      `Det finns ingen modul som heter \`${match[1]}\`. Kolla stavningen – t.ex. random, math eller datetime.`,
  },
  {
    pattern: /module '(\w+)' has no attribute '(\w+)'/,
    text: match =>
      `Modulen \`${match[1]}\` har inget som heter \`${match[2]}\`. Kolla stavningen, och att stora och små bokstäver stämmer.`,
  },
  {
    pattern: /NameError: name '(\w+)' is not defined/,
    text: match =>
      `Python känner inte till namnet \`${match[1]}\`. Är det felstavat, har du glömt att skapa variabeln först, eller är det text som saknar citattecken?`,
  },
  {
    pattern:
      /can only concatenate str \(not "(\w+)"\) to str|unsupported operand type\(s\) for \+: '(int|float)' and 'str'|unsupported operand type\(s\) for \+: 'str' and '(int|float)'/,
    text: () =>
      'Du försöker sätta ihop text och tal. Gör om talet till text med str(tal), eller använd en f-sträng.',
  },
  {
    pattern: /unsupported operand type\(s\) for (\S+): '(\w+)' and '(\w+)'/,
    text: match =>
      `Det går inte att använda ${match[1]} mellan ${typeName(match[2])} och ${typeName(match[3])}.`,
  },
  {
    pattern: /'(\w+)' object is not callable/,
    text: match =>
      `Du anropar något med () som inte är en funktion, utan ${typeName(match[1])}. Har en variabel fått samma namn som en funktion?`,
  },
  {
    pattern: /(\w+)\.(\w+)\(\) takes 0 positional arguments but 1 was given/,
    text: match =>
      `Metoden ${match[2]} i ${match[1]} saknar self. Första parametern i en metod ska alltid vara self: def ${match[2]}(self).`,
  },
  {
    pattern: /(\w+)\.__init__\(\) missing (\d+) required positional argument/,
    text: match =>
      `För att skapa ett objekt av ${match[1]} behövs fler värden inom parentesen – ett för varje parameter i __init__ efter self.`,
  },
  {
    pattern:
      /(\w+)\.__init__\(\) takes 1 positional argument but \d+ were given/,
    text: match =>
      `__init__ i ${match[1]} tar inte emot några värden. Saknas self? Första parametern ska alltid vara self: def __init__(self, …).`,
  },
  {
    pattern:
      /(\w+)\.__init__\(\) takes (\d+) positional arguments but (\d+) were given/,
    text: match =>
      `${match[1]}(…) fick ${match[3] - 1} värden, men __init__ tar bara emot ${match[2] - 1}. self räknas inte – den skickar Python in själv.`,
  },
  {
    pattern: /(\w+)\(\) takes no arguments/,
    text: match =>
      `Klassen ${match[1]} har ingen __init__ som tar emot värden. Är __init__ felstavad? Den ska ha två understreck före och två efter.`,
  },
  {
    pattern: /(\w+)\(\) missing (\d+) required positional argument/,
    text: match =>
      `Funktionen ${match[1]} behöver fler värden inom parentesen än du skickade med.`,
  },
  {
    pattern:
      /(\w+)\(\) takes (\d+) positional arguments? but (\d+) (was|were) given/,
    text: match =>
      `Funktionen ${match[1]} tar ${match[2]} värden, men fick ${match[3]}.`,
  },
  {
    pattern: /__str__ returned non-string/,
    text: () =>
      '__str__ ska returnera texten med return, inte skriva ut den med print.',
  },
  {
    pattern: /^AssertionError/,
    text: () =>
      'En assert var inte sann, så koden gör inte det den ska. Titta på raden – där står fallet som blev fel.',
  },
  {
    pattern: /index out of range/,
    text: () =>
      'Det finns ingen plats med det numret. Kom ihåg att första platsen är 0, så den sista är len(…) - 1.',
  },
  {
    pattern: /^KeyError: (.+)/,
    text: match =>
      `Nyckeln ${match[1]} finns inte i din dictionary – eller, med pandas, kolumnen i tabellen. Kolla stavningen, och stora och små bokstäver.`,
  },
  {
    pattern: /ZeroDivisionError/,
    text: () => 'Det går inte att dela med noll.',
  },
  {
    pattern: /'(?!NoneType')([A-Z]\w*)' object has no attribute '(\w+)'/,
    text: match =>
      `Objektet av klassen ${match[1]} har inget som heter \`${match[2]}\`. Sparas det med \`self.${match[2]} = …\` i __init__? Kolla stavningen också.`,
  },
  {
    pattern: /'(\w+)' object has no attribute '(\w+)'/,
    text: match =>
      `${typeName(match[1])[0].toUpperCase()}${typeName(match[1]).slice(1)} har ingen metod eller egenskap som heter \`${match[2]}\`.`,
  },
  {
    pattern: /invalid literal for int\(\) with base 10: (.+)/,
    text: match =>
      `int() kan bara göra om text som ser ut som ett heltal. ${match[1]} gör inte det.`,
  },
  {
    pattern: /could not convert string to float: (.+)/,
    text: match =>
      `float() kan bara göra om text som ser ut som ett tal. ${match[1]} gör inte det.`,
  },
  {
    pattern: /^EOFError/,
    text: () =>
      'Koden frågar efter input() fler gånger än det finns svar. Kolla hur många gånger du anropar input().',
  },
  {
    pattern: /RecursionError/,
    text: () => 'En funktion anropar sig själv om och om igen utan att sluta.',
  },
  // Sist, så att Pythons egna fel ovan får sina förklaringar först. Det som
  // blir kvar är oftast ett fel som eleven skapat själv med raise.
  {
    pattern: /^(\w+(?:Error|Exception)): (.+)/,
    text: match =>
      `Ett ${match[1]} med meddelandet "${match[2]}". Kommer det från en raise i din kod? Fånga det med try och except om programmet ska fortsätta.`,
  },
];

// error: { type, message, line } från harness.py
export function explainError(error) {
  const rule = RULES.map(({ pattern, text }) => {
    const match = error.message.match(pattern);
    return match && text(match);
  }).find(Boolean);
  const suggestion = error.message.match(/Did you mean:? '?([^'?]+)'?\?/);
  const parts = [rule ?? 'Något gick fel när koden kördes.'];
  if (suggestion) parts.push(`Menade du \`${suggestion[1]}\`?`);
  return parts.join(' ');
}

export function errorTitle(error, isSyntax) {
  const where = error.line ? ` på rad ${error.line}` : '';
  return isSyntax
    ? `Python kunde inte läsa koden${where}`
    : `Koden stoppade med ett fel${where}`;
}
