// Översätter JavaScripts felmeddelanden till vad de brukar betyda för
// en nybörjare. Felmeddelandet visas fortfarande, eftersom det är bra
// att lära sig läsa det, men med en förklaring under.
// Babel lägger till (rad:kolumn) sist i syntaxfel, t.ex. (1:16).

const name = '([\\w$.]+)';

const EXPLANATIONS = [
  {
    pattern: /Unterminated string constant/,
    explain: line =>
      `En text saknar sitt avslutande citattecken${line}. Texten måste börja och sluta med samma tecken, t.ex. 'Hej' eller "Hej".`,
  },
  {
    pattern: /Unterminated template/,
    explain: line =>
      `En template literal saknar sin avslutande backtick \`${line}.`,
  },
  {
    pattern: /Identifier '([\w$]+)' has already been declared/,
    explain: (line, [, variable]) =>
      `Du skapar \`${variable}\` två gånger${line}. Skapa den en gång med const eller let, och skriv bara namnet efter det.`,
  },
  {
    pattern: /Unexpected token, expected "([)}\]])"/,
    explain: (line, [, bracket]) =>
      `Det saknas en \`${bracket}\`${line}, eller så står något i vägen före den. Kolla att alla ( ) { } [ ] är parade.`,
  },
  {
    pattern: /Unexpected token, expected ","/,
    explain: (line, match, code) =>
      looksLikeTextWithoutQuotes(code)
        ? `Ser ut som text utan citattecken${line}. Text måste stå inom citattecken, t.ex. console.log('Hej världen!').`
        : `Det saknas ett kommatecken mellan två saker${line}, eller så har en text tappat sina citattecken.`,
  },
  {
    pattern: /Missing semicolon|Unexpected token/,
    explain: (line, match, code) =>
      looksLikeTextWithoutQuotes(code)
        ? `Ser ut som text utan citattecken${line}. Text måste stå inom citattecken, t.ex. 'Hej världen!'.`
        : `Datorn förstår inte koden${line}. Ofta saknas ett tecken, som en parentes, ett citattecken eller ett kommatecken, eller så finns ett för mycket.`,
  },
  {
    pattern: new RegExp(`ReferenceError: ${name} is not defined`),
    explain: (line, [, variable]) =>
      `Det finns inget som heter \`${variable}\`. Är det felstavat, eller har du glömt att skapa det? Stora och små bokstäver spelar roll. Var det text, så saknas citattecken.`,
  },
  {
    pattern: /Cannot access '([\w$]+)' before initialization/,
    explain: (line, [, variable]) =>
      `Du använder \`${variable}\` innan raden där den skapas. Flytta raden som skapar den högre upp.`,
  },
  {
    pattern: /Assignment to constant variable/,
    explain: () =>
      'Du försöker ge en const ett nytt värde. Använd let om värdet ska kunna ändras.',
  },
  {
    pattern:
      /Cannot read propert(?:y|ies) of (undefined|null)(?: \(reading '([\w$]+)'\))?/,
    explain: (line, [, missing, property]) =>
      `Du försöker läsa ${property ? `\`${property}\`` : 'en egenskap'} från något som är ${missing}. Det som står före punkten finns inte – kolla stavningen, eller använd ?. om det kan saknas.`,
  },
  {
    pattern: /TypeError: (.+?) is not a function/,
    explain: (line, [, called]) =>
      `\`${called}\` är ingen funktion, så den går inte att anropa med ( ). Kolla stavningen – finns metoden verkligen på det här värdet?`,
  },
  {
    pattern: /TypeError: (.+?) is not iterable/,
    explain: (line, [, value]) =>
      `\`${value}\` går inte att loopa igenom. for...of fungerar på arrayer och strängar, inte på vanliga objekt.`,
  },
];

// console.log(Hej världen!) – flera ord i rad utan citattecken.
function looksLikeTextWithoutQuotes(code = '') {
  return /\(\s*[A-Za-zÅÄÖåäö]+\s+[A-Za-zÅÄÖåäö]+[^'"`(]*\)/.test(
    code.replace(/(['"`]).*?\1/g, '""'),
  );
}

export function explainError(message, code) {
  if (!message) return null;
  const position = message.match(/\((\d+):\d+\)/);
  const line = position ? ` på rad ${position[1]}` : '';
  for (const { pattern, explain } of EXPLANATIONS) {
    const match = message.match(pattern);
    if (match) return explain(line, match, code);
  }
  return null;
}
