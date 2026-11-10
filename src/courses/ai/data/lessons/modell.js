// Bana 1: vad är en språkmodell? Klienten, ett anrop, svarets delar,
// fel, max_tokens, tokens och kostnad, nyckeln och omförsök. Koden är
// densamma som mot det riktiga API:et – bara modulen är på låtsas.

const IMPORT = 'import anthropic\n\nclient = anthropic.Anthropic()\n';
const M = 'claude-opus-5-5';

const FRAGA = `

def fraga(text):
    svar = client.messages.create(
        model='${M}',
        max_tokens=1000,
        messages=[{'role': 'user', 'content': text}],
    )
    return next(b.text for b in svar.content if b.type == 'text')
`;

export const MODELL = [
  {
    id: 'ai-modell-01',
    track: 'modell',
    title: 'Första anropet',
    xp: 10,
    description:
      'En språkmodell är ett program som svarar på text med text. Du pratar med den genom ett API.',
    explain:
      "Med Anthropics Python-bibliotek `anthropic` skapar du en **klient** och skickar ett meddelande:\n\n```\nsvar = client.messages.create(\n    model='claude-opus-5-5',\n    max_tokens=1000,\n    messages=[{'role': 'user', 'content': 'Hej'}],\n)\n```\n\n- `model` – vilken modell som ska svara\n- `max_tokens` – hur långt svaret högst får bli\n- `messages` – samtalet, här ett enda meddelande från dig (`user`)\n\nSvaret står i `svar.content[0].text`.\n\nI Kodskolan svarar en **låtsasmodell** – koden är exakt densamma som mot den riktiga, men inget anrop lämnar webbläsaren och det kostar ingenting.",
    example: `${IMPORT}\nsvar = client.messages.create(\n    model='${M}',\n    max_tokens=1000,\n    messages=[{'role': 'user', 'content': 'Vad är 2 + 2?'}],\n)\nprint(svar.content[0].text)`,
    task: "Uppgift: Skicka meddelandet `'Hej'` till modellen och skriv ut svarets text.",
    starterCode: `${IMPORT}\n# Skicka 'Hej' och skriv ut svaret\n`,
    solution: `${IMPORT}\nsvar = client.messages.create(\n    model='${M}',\n    max_tokens=1000,\n    messages=[{'role': 'user', 'content': 'Hej'}],\n)\nprint(svar.content[0].text)\n`,
    hints: [
      'client.messages.create(model=…, max_tokens=…, messages=[…])',
      "messages=[{'role': 'user', 'content': 'Hej'}]",
      'print(svar.content[0].text)',
    ],
    tests: [
      {
        description: 'Ett anrop med Hej',
        code: "[a['messages'] for a in __anrop()]",
        expected: [[{ role: 'user', content: 'Hej' }]],
      },
      {
        description: 'Svaret skrivs ut',
        code: '__output',
        expected: ['Hej! Hur kan jag hjälpa dig?'],
      },
    ],
  },
  {
    id: 'ai-modell-02',
    track: 'modell',
    title: 'Vad svaret innehåller',
    xp: 15,
    description:
      'Svaret är mer än text. Det säger också varför modellen slutade och hur mycket den läste och skrev.',
    explain:
      "`svar` är ett **Message**-objekt:\n\n- `svar.content` – en lista med **block**. Ett textblock har `type == 'text'` och `text`.\n- `svar.stop_reason` – varför modellen slutade: `'end_turn'` betyder att den var klar.\n- `svar.usage` – hur många **tokens** den läste (`input_tokens`) och skrev (`output_tokens`).\n\nSkriv `print(svar)` för att se allt på en gång.",
    example: 'print(svar.stop_reason)\nprint(svar.usage.output_tokens)',
    task: "Uppgift: Fråga `'Vad är 6 * 7?'` och skriv ut tre rader: texten, `stop_reason` och `usage.output_tokens`.",
    starterCode: IMPORT,
    solution: `${IMPORT}\nsvar = client.messages.create(\n    model='${M}',\n    max_tokens=1000,\n    messages=[{'role': 'user', 'content': 'Vad är 6 * 7?'}],\n)\nprint(svar.content[0].text)\nprint(svar.stop_reason)\nprint(svar.usage.output_tokens)\n`,
    hints: [
      'Samma anrop som förra övningen, med en annan fråga.',
      'svar.stop_reason och svar.usage.output_tokens',
      'Tre print, en per rad.',
    ],
    tests: [
      {
        description: 'Tre rader',
        code: '__output',
        expected: ['Det blir 42.', 'end_turn', '3'],
      },
    ],
  },
  {
    id: 'ai-modell-03',
    track: 'modell',
    title: 'Välj block efter typ',
    xp: 15,
    description:
      'Det första blocket är inte alltid text. Ett säkert program letar upp textblocket.',
    explain:
      "En modell kan svara med flera block: ett **tankeblock** (`thinking`) först, ett **verktygsanrop** (`tool_use`) eller flera textblock. Då kraschar `svar.content[0].text`, eller ger fel text.\n\nLeta i stället upp det första blocket med `type == 'text'`:\n\n`text = next(b.text for b in svar.content if b.type == 'text')`\n\n`next(…)` ger det första som passar. Så skriver proffs.",
    example:
      "for block in svar.content:\n    if block.type == 'text':\n        print(block.text)",
    task: 'Uppgift: Skriv funktionen `fraga(text)` som skickar texten till modellen och returnerar svarets text – hämtad efter typ, inte med `[0]`.',
    starterCode: IMPORT,
    solution: `${IMPORT}${FRAGA}`,
    hints: [
      'def fraga(text): med anropet inuti.',
      "messages=[{'role': 'user', 'content': text}]",
      "return next(b.text for b in svar.content if b.type == 'text')",
    ],
    tests: [
      {
        description: "fraga('2 + 3')",
        code: "fraga('Vad är 2 + 3?')",
        expected: 'Det blir 5.',
      },
      {
        description: "fraga('Hej')",
        code: "fraga('Hej')",
        expected: 'Hej! Hur kan jag hjälpa dig?',
      },
    ],
    sourceChecks: [
      {
        description: 'Hämtar blocket efter typ',
        pattern: /type\s*==\s*['"]text['"]/,
      },
    ],
  },
  {
    id: 'ai-modell-04',
    track: 'modell',
    title: 'När anropet är fel',
    xp: 15,
    description:
      'Glömmer du något i anropet svarar API:et med ett fel som säger exakt vad.',
    explain:
      'API:et kontrollerar anropet först. Saknas `max_tokens`, är meddelandet tomt eller börjar samtalet med fel roll, blir det ett **BadRequestError** (statuskod 400).\n\nAlla fel från API:et ärver från `anthropic.APIStatusError`, som har `status_code` och `message`. Fånga dem med `try`/`except`, så kraschar inte programmet:\n\n```\ntry:\n    ...\nexcept anthropic.APIStatusError as fel:\n    print(fel.status_code, fel.message)\n```',
    example:
      "try:\n    client.messages.create(model='claude-opus-5-5', messages=[])\nexcept anthropic.BadRequestError as fel:\n    print('Fel:', fel.message)",
    task: "Uppgift: Skriv `saker(text)` som fungerar som `fraga`, men returnerar `'Något gick fel: '` plus felets `message` om API:et svarar med ett fel. (En tom text ger ett fel.)",
    starterCode: IMPORT,
    solution: `${IMPORT}\n\ndef saker(text):\n    try:\n        svar = client.messages.create(\n            model='${M}',\n            max_tokens=1000,\n            messages=[{'role': 'user', 'content': text}],\n        )\n    except anthropic.APIStatusError as fel:\n        return 'Något gick fel: ' + fel.message\n    return next(b.text for b in svar.content if b.type == 'text')\n`,
    hints: [
      'Lägg anropet i ett try.',
      'except anthropic.APIStatusError as fel:',
      "return 'Något gick fel: ' + fel.message",
    ],
    tests: [
      {
        description: 'En vanlig fråga',
        code: "saker('Vad är 1 + 1?')",
        expected: 'Det blir 2.',
      },
      {
        description: 'En tom fråga',
        code: "saker('')",
        expected: 'Något gick fel: messages[0].content: får inte vara tomt.',
      },
    ],
  },
  {
    id: 'ai-modell-05',
    track: 'modell',
    title: 'max_tokens',
    xp: 20,
    description:
      'max_tokens är ett tak. Når svaret taket klipps det mitt i – och stop_reason säger det.',
    explain:
      "En **token** är en bit av ett ord, ungefär. Modellen räknar allt i tokens, och `max_tokens` är det högsta antalet den får skriva.\n\nNår svaret taket blir `stop_reason` `'max_tokens'` i stället för `'end_turn'`, och texten slutar mitt i. Ett bra program märker det.\n\nSätt inte taket för lågt – ett klippt svar måste göras om, och det kostar mer än det sparar.\n\n(Låtsasmodellen räknar ett ord som en token. Riktiga modeller delar upp orden mer, men tanken är densamma.)",
    example:
      "if svar.stop_reason == 'max_tokens':\n    print('Svaret klipptes!')",
    task: "Uppgift: Skriv `kort_svar(text, tak)` som frågar med `max_tokens=tak` och returnerar texten. Om svaret klipptes ska `' …'` läggas till sist.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n\ndef kort_svar(text, tak):\n    svar = client.messages.create(\n        model='${M}',\n        max_tokens=tak,\n        messages=[{'role': 'user', 'content': text}],\n    )\n    text = next(b.text for b in svar.content if b.type == 'text')\n    if svar.stop_reason == 'max_tokens':\n        text = text + ' …'\n    return text\n`,
    hints: [
      'max_tokens=tak i anropet.',
      "if svar.stop_reason == 'max_tokens':",
      "text = text + ' …'",
    ],
    tests: [
      {
        description: 'Tillräckligt tak',
        code: "kort_svar('Hej', 100)",
        expected: 'Hej! Hur kan jag hjälpa dig?',
      },
      {
        description: 'Klippt efter två tokens',
        code: "kort_svar('Hej', 2)",
        expected: 'Hej! Hur …',
      },
    ],
  },
  {
    id: 'ai-modell-06',
    track: 'modell',
    title: 'Vad kostar det?',
    xp: 20,
    description:
      'Varje anrop kostar pengar, räknat i tokens. Att räkna ut kostnaden är en del av att bygga AI-tjänster.',
    explain:
      'Priset sätts per **miljon tokens**, olika för det modellen läser (input) och skriver (output). För `claude-opus-5-5` är det:\n\n- 4 dollar per miljon input-tokens\n- 20 dollar per miljon output-tokens\n\nKostnaden för ett anrop blir alltså:\n\n`(input_tokens * 4 + output_tokens * 20) / 1_000_000`\n\nUtdata är dyrare än indata – ett kort svar sparar mest. (Kolla alltid aktuella priser på Anthropics sida.)',
    example:
      'dollar = (svar.usage.input_tokens * 4 + svar.usage.output_tokens * 20) / 1_000_000',
    task: 'Uppgift: Skriv `kostnad(svar)` som räknar ut vad ett svar kostade i dollar, med priserna ovan.',
    starterCode: `${IMPORT}\nPRIS_IN = 4\nPRIS_UT = 20\n`,
    solution: `${IMPORT}\nPRIS_IN = 4\nPRIS_UT = 20\n\n\ndef kostnad(svar):\n    return (svar.usage.input_tokens * PRIS_IN + svar.usage.output_tokens * PRIS_UT) / 1_000_000\n`,
    hints: [
      'svar.usage.input_tokens och svar.usage.output_tokens',
      'Priset gäller per miljon tokens: dela med 1_000_000.',
      'return (svar.usage.input_tokens * PRIS_IN + svar.usage.output_tokens * PRIS_UT) / 1_000_000',
    ],
    tests: [
      {
        description: '1000 in och 500 ut',
        code: "kostnad(type('S', (), {'usage': anthropic.Usage(1000, 500)})())",
        expected: 0.014,
      },
      {
        description: 'Ett riktigt svar',
        code: "(lambda s: kostnad(s) == (s.usage.input_tokens * 4 + s.usage.output_tokens * 20) / 1_000_000)(client.messages.create(model='claude-opus-5-5', max_tokens=100, messages=[{'role': 'user', 'content': 'Hej'}]))",
        expected: true,
      },
    ],
  },
  {
    id: 'ai-modell-07',
    track: 'modell',
    title: 'Nyckeln är hemlig',
    xp: 15,
    description:
      'Det riktiga API:et kräver en nyckel. Den ska aldrig stå i koden.',
    explain:
      "Varje anrop till det riktiga API:et visar vem som betalar, med en **API-nyckel** som börjar med `sk-ant-`. Kommer någon över den kan de använda den på din bekostnad.\n\nDärför står nyckeln aldrig i koden, utan i en **miljövariabel**. `anthropic.Anthropic()` läser `ANTHROPIC_API_KEY` själv, och vill du vara tydlig:\n\n```\nimport os\nclient = anthropic.Anthropic(api_key=os.environ.get('ANTHROPIC_API_KEY'))\n```\n\nLåtsasmodellen bryr sig inte om nyckeln, men vanan är viktig.",
    example: "import os\n\nnyckel = os.environ.get('ANTHROPIC_API_KEY')",
    task: 'Uppgift: Startkoden har en nyckel inskriven. Ta bort den och läs nyckeln från miljövariabeln `ANTHROPIC_API_KEY` med `os.environ.get`.',
    starterCode: `import anthropic\n\nclient = anthropic.Anthropic(api_key='sk-ant-hemlig-nyckel-123')\n\nprint(client.messages.create(model='${M}', max_tokens=100, messages=[{'role': 'user', 'content': 'Hej'}]).content[0].text)\n`,
    solution: `import os\n\nimport anthropic\n\nclient = anthropic.Anthropic(api_key=os.environ.get('ANTHROPIC_API_KEY'))\n\nprint(client.messages.create(model='${M}', max_tokens=100, messages=[{'role': 'user', 'content': 'Hej'}]).content[0].text)\n`,
    hints: [
      'import os överst.',
      "os.environ.get('ANTHROPIC_API_KEY')",
      "client = anthropic.Anthropic(api_key=os.environ.get('ANTHROPIC_API_KEY'))",
    ],
    tests: [
      {
        description: 'Svaret skrivs fortfarande ut',
        code: '__output',
        expected: ['Hej! Hur kan jag hjälpa dig?'],
      },
    ],
    sourceChecks: [
      {
        description: 'Ingen nyckel i koden',
        pattern: /^(?![\s\S]*sk-ant-)/,
      },
      {
        description: 'Nyckeln läses från miljön',
        pattern: /os\.environ(\.get\(|\[)\s*['"]ANTHROPIC_API_KEY['"]/,
      },
    ],
  },
  {
    id: 'ai-modell-08',
    track: 'modell',
    title: 'Många frågor',
    xp: 20,
    description:
      'Ett program ställer ofta många frågor. En loop, och en summa av tokens.',
    explain:
      'Med `fraga` från förut går det att loopa över många frågor. Varje anrop är ett eget, oberoende samtal – modellen minns inte de andra.\n\nSpara också hur många tokens varje anrop kostade, så att du vet vad hela körningen kostade.',
    example: 'svar = []\nfor f in FRAGOR:\n    svar.append(fraga(f))',
    task: "Uppgift: Skriv `fraga_alla(fragor)` som returnerar `{'svar': [...], 'tokens': ...}`: alla svarstexter i ordning, och summan av input- och output-tokens för alla anrop.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n\ndef fraga_alla(fragor):\n    svaren = []\n    tokens = 0\n    for text in fragor:\n        svar = client.messages.create(\n            model='${M}',\n            max_tokens=1000,\n            messages=[{'role': 'user', 'content': text}],\n        )\n        svaren.append(next(b.text for b in svar.content if b.type == 'text'))\n        tokens += svar.usage.input_tokens + svar.usage.output_tokens\n    return {'svar': svaren, 'tokens': tokens}\n`,
    hints: [
      'En for-loop med ett anrop per fråga.',
      'tokens += svar.usage.input_tokens + svar.usage.output_tokens',
      "return {'svar': svaren, 'tokens': tokens}",
    ],
    tests: [
      {
        description: 'Två frågor',
        code: "fraga_alla(['1 + 1', '2 + 2'])['svar']",
        expected: ['Det blir 2.', 'Det blir 4.'],
      },
      {
        description: 'Tokens för båda anropen (3 in och 3 ut var)',
        code: "fraga_alla(['1 + 1', '2 + 2'])['tokens']",
        expected: 12,
      },
    ],
  },
  {
    id: 'ai-modell-09',
    track: 'modell',
    title: 'Försök igen',
    xp: 25,
    description:
      'Ibland är API:et överbelastat och svarar RateLimitError. Då är det rätt att vänta lite och försöka igen.',
    explain:
      'Fel delas i två sorter:\n\n- **Försök igen**: `RateLimitError` (429, för många anrop) och fel hos servern. De går ofta över.\n- **Försök inte igen**: `BadRequestError` (400). Samma anrop blir fel igen.\n\nFånga det specifika felet först:\n\n```\nfor forsok in range(3):\n    try:\n        return anropa()\n    except anthropic.RateLimitError:\n        continue\n```\n\n(I en riktig app väntar man en stund mellan försöken, och det riktiga SDK:t försöker själv två gånger. Här hoppar vi över väntan.)',
    example:
      "for forsok in range(3):\n    try:\n        return fraga(text)\n    except anthropic.RateLimitError:\n        print('Upptaget, försöker igen')",
    task: "Uppgift: Skriv `envis(text)` som försöker högst 3 gånger när det blir `RateLimitError`, och returnerar texten. Går det inte efter 3 försök ska den returnera `'Försök senare'`.",
    starterCode: `${IMPORT}${FRAGA}`,
    solution: `${IMPORT}${FRAGA}\n\ndef envis(text):\n    for forsok in range(3):\n        try:\n            return fraga(text)\n        except anthropic.RateLimitError:\n            continue\n    return 'Försök senare'\n`,
    hints: [
      'for forsok in range(3):',
      'except anthropic.RateLimitError: – fånga bara just det felet.',
      "Efter loopen: return 'Försök senare'",
    ],
    tests: [
      {
        description: 'Upptaget två gånger, sedan svar',
        code: "envis('Vad är 3 + 3?')",
        expected: 'Det blir 6.',
      },
      {
        description: 'Tre anrop gjordes',
        code: 'len(__anrop())',
        expected: 3,
      },
      {
        description: 'Alltid upptaget',
        code: "envis('Kör alltid fast')",
        expected: 'Försök senare',
      },
    ],
    modell: [
      { om: '3 \\+ 3', fel: 'RateLimitError', ganger: 2 },
      { om: 'alltid fast', fel: 'RateLimitError' },
    ],
  },
];
