// Bana 5: verktyg (tool use). Modellen ber om en funktion, programmet
// kör den och skickar tillbaka resultatet. Bara en runda här – loopen som
// fortsätter tills modellen är klar kommer i bana 8 (agenter).

const IMPORT = 'import anthropic\n\nclient = anthropic.Anthropic()\n';
const M = 'claude-opus-5-5';

const VADER_DATA = `VADER = {'Malmö': 'sol, 18 grader', 'Kiruna': 'snö, -5 grader'}


def hamta_vader(stad):
    return VADER[stad]
`;

const VADER_TOOL = `VERKTYG = [
    {
        'name': 'hamta_vader',
        'description': 'Hämtar dagens väder i en stad.',
        'input_schema': {
            'type': 'object',
            'properties': {'stad': {'type': 'string', 'description': 'Stadens namn'}},
            'required': ['stad'],
        },
    },
]
`;

const TID_TOOL = `    {
        'name': 'hamta_tid',
        'description': 'Hämtar vad klockan är just nu.',
        'input_schema': {'type': 'object', 'properties': {}},
    },
`;

const TVA_TOOLS = VADER_TOOL.replace('    },\n]\n', `    },\n${TID_TOOL}]\n`);

const BAS = `${IMPORT}\n${VADER_DATA}\n${VADER_TOOL}`;

const FORSTA = (verktyg = 'VERKTYG') =>
  `client.messages.create(\n        model='${M}',\n        max_tokens=1000,\n        tools=${verktyg},\n        messages=meddelanden,\n    )`;

// Hela rundan: fråga, kör verktygen, skicka tillbaka och svara.
const RUNDA = (
  kor = "{'type': 'tool_result', 'tool_use_id': b.id, 'content': kor(b)}",
) => `

def svara(fraga):
    meddelanden = [{'role': 'user', 'content': fraga}]
    svar = ${FORSTA()}
    if svar.stop_reason != 'tool_use':
        return next(b.text for b in svar.content if b.type == 'text')
    meddelanden.append({'role': 'assistant', 'content': svar.content})
    resultat = [${kor} for b in svar.content if b.type == 'tool_use']
    meddelanden.append({'role': 'user', 'content': resultat})
    svar = ${FORSTA()}
    return next(b.text for b in svar.content if b.type == 'text')
`;

const KOR = `

FUNKTIONER = {'hamta_vader': hamta_vader}


def kor(block):
    return FUNKTIONER[block.name](**block.input)
`;

const VADER_REGLER = [
  { om: 'Malmö', verktyg: { namn: 'hamta_vader', input: { stad: 'Malmö' } } },
  { om: 'Kiruna', verktyg: { namn: 'hamta_vader', input: { stad: 'Kiruna' } } },
  { efter_verktyg: true, svar: 'Just nu: {resultat}.' },
];

export const VERKTYG = [
  {
    id: 'ai-verktyg-01',
    track: 'verktyg',
    title: 'Ett verktyg',
    xp: 20,
    description:
      'En modell vet inte vad vädret är i dag. Men den kan be ditt program ta reda på det.',
    explain:
      "Ett **verktyg** (tool) är en funktion i ditt program som modellen får be om. Du beskriver det med namn, beskrivning och ett JSON-schema för indata:\n\n```\n{\n    'name': 'hamta_vader',\n    'description': 'Hämtar dagens väder i en stad.',\n    'input_schema': {\n        'type': 'object',\n        'properties': {'stad': {'type': 'string'}},\n        'required': ['stad'],\n    },\n}\n```\n\nSkicka listan med `tools=`. Vill modellen använda verktyget blir `stop_reason` `'tool_use'`. Beskrivningen är viktig – det är den modellen läser för att välja.",
    example:
      'svar = client.messages.create(..., tools=VERKTYG, messages=[...])\nprint(svar.stop_reason)',
    task: "Uppgift: Gör listan `VERKTYG` med verktyget ovan, fråga `'Vad är det för väder i Malmö?'` med `tools=VERKTYG` och skriv ut `stop_reason`.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n${VADER_TOOL}\nsvar = client.messages.create(\n    model='${M}',\n    max_tokens=1000,\n    tools=VERKTYG,\n    messages=[{'role': 'user', 'content': 'Vad är det för väder i Malmö?'}],\n)\nprint(svar.stop_reason)\n`,
    hints: [
      "Ett verktyg är en dict med 'name', 'description' och 'input_schema'.",
      'tools=VERKTYG i anropet.',
      'print(svar.stop_reason)',
    ],
    tests: [
      {
        description: 'Modellen vill använda verktyget',
        code: '__output',
        expected: ['tool_use'],
      },
      {
        description: 'Verktyget skickades',
        code: "[t['name'] for t in __anrop()[0]['tools']]",
        expected: ['hamta_vader'],
      },
      {
        description: 'stad är obligatorisk',
        code: "__anrop()[0]['tools'][0]['input_schema']['required']",
        expected: ['stad'],
      },
    ],
    modell: VADER_REGLER,
  },
  {
    id: 'ai-verktyg-02',
    track: 'verktyg',
    title: 'Vad vill modellen?',
    xp: 20,
    description:
      'Svaret innehåller ett tool_use-block: vilket verktyg, och med vilka värden.',
    explain:
      "Ett `tool_use`-block har:\n\n- `name` – verktyget modellen vill använda\n- `input` – en dict med värdena, enligt schemat\n- `id` – ett id, som du skickar tillbaka med resultatet\n\nLeta upp blocket efter typ, som med textblock:\n\n`block = next(b for b in svar.content if b.type == 'tool_use')`",
    example:
      "block = next(b for b in svar.content if b.type == 'tool_use')\nprint(block.name, block.input)",
    task: 'Uppgift: Skriv `onskat(fraga)` som frågar med `VERKTYG` och returnerar `[name, input]` för tool_use-blocket.',
    starterCode: BAS,
    solution: `${BAS}\n\ndef onskat(fraga):\n    meddelanden = [{'role': 'user', 'content': fraga}]\n    svar = ${FORSTA()}\n    block = next(b for b in svar.content if b.type == 'tool_use')\n    return [block.name, block.input]\n`,
    hints: [
      "next(b for b in svar.content if b.type == 'tool_use')",
      'block.name och block.input',
      'return [block.name, block.input]',
    ],
    tests: [
      {
        description: 'Kiruna',
        code: "onskat('Hur är vädret i Kiruna?')",
        expected: ['hamta_vader', { stad: 'Kiruna' }],
      },
    ],
    modell: VADER_REGLER,
  },
  {
    id: 'ai-verktyg-03',
    track: 'verktyg',
    title: 'Kör verktyget',
    xp: 20,
    description:
      'Modellen kör ingenting själv. Det är ditt program som anropar funktionen.',
    explain:
      "En dict från namn till funktion gör det enkelt:\n\n```\nFUNKTIONER = {'hamta_vader': hamta_vader}\n\ndef kor(block):\n    return FUNKTIONER[block.name](**block.input)\n```\n\n`**block.input` packar upp dicten till argument: `{'stad': 'Malmö'}` blir `stad='Malmö'`.\n\nDu bestämmer vilka funktioner som finns – modellen kan bara be om dem som står i dict:en. Låt den aldrig köra godtycklig kod.",
    example: 'FUNKTIONER[block.name](**block.input)',
    task: 'Uppgift: Skriv `FUNKTIONER` och `kor(block)` som ovan.',
    starterCode: BAS,
    solution: `${BAS}${KOR}`,
    hints: [
      "FUNKTIONER = {'hamta_vader': hamta_vader}",
      '**block.input packar upp dicten.',
      'return FUNKTIONER[block.name](**block.input)',
    ],
    tests: [
      {
        description: 'Malmö',
        code: "kor(anthropic.ToolUseBlock('hamta_vader', {'stad': 'Malmö'}))",
        expected: 'sol, 18 grader',
      },
    ],
  },
  {
    id: 'ai-verktyg-04',
    track: 'verktyg',
    title: 'Skicka tillbaka resultatet',
    xp: 25,
    description:
      'Sista steget: ge modellen resultatet, så kan den svara användaren.',
    explain:
      "Fortsätt samtalet med två meddelanden:\n\n1. Modellens svar, med tool_use-blocket: `{'role': 'assistant', 'content': svar.content}`\n2. Resultatet, från `user`:\n\n```\n{'role': 'user', 'content': [\n    {'type': 'tool_result', 'tool_use_id': block.id, 'content': resultat},\n]}\n```\n\n`tool_use_id` måste vara samma som blockets `id`. Skicka sedan igen, med samma `tools`.",
    example:
      "meddelanden.append({'role': 'assistant', 'content': svar.content})\nmeddelanden.append({'role': 'user', 'content': [{'type': 'tool_result', 'tool_use_id': block.id, 'content': resultat}]})",
    task: 'Uppgift: Skriv `svara(fraga)` som gör hela rundan: fråga, kör verktyget med `kor`, skicka tillbaka resultatet och returnera den slutliga texten.',
    starterCode: `${BAS}${KOR}`,
    solution: `${BAS}${KOR}\n\ndef svara(fraga):\n    meddelanden = [{'role': 'user', 'content': fraga}]\n    svar = ${FORSTA()}\n    block = next(b for b in svar.content if b.type == 'tool_use')\n    meddelanden.append({'role': 'assistant', 'content': svar.content})\n    meddelanden.append({\n        'role': 'user',\n        'content': [{'type': 'tool_result', 'tool_use_id': block.id, 'content': kor(block)}],\n    })\n    svar = ${FORSTA()}\n    return next(b.text for b in svar.content if b.type == 'text')\n`,
    hints: [
      "meddelanden.append({'role': 'assistant', 'content': svar.content})",
      "{'type': 'tool_result', 'tool_use_id': block.id, 'content': kor(block)}",
      'Gör ett andra anrop med samma tools och returnera texten.',
    ],
    tests: [
      {
        description: 'Malmö',
        code: "svara('Vad är det för väder i Malmö?')",
        expected: 'Just nu: sol, 18 grader.',
      },
      {
        description: 'Två anrop, det andra med resultatet',
        code: "__anrop()[1]['messages'][2]['content'][0]['content']",
        expected: 'sol, 18 grader',
      },
    ],
    modell: VADER_REGLER,
  },
  {
    id: 'ai-verktyg-05',
    track: 'verktyg',
    title: 'Ibland behövs inget verktyg',
    xp: 20,
    description:
      'Att verktyg finns betyder inte att modellen måste använda dem.',
    explain:
      "Frågar någon \"Hej\" svarar modellen direkt, med `stop_reason` `'end_turn'` och inget tool_use-block. Då kraschar `next(... tool_use)`.\n\nKolla `stop_reason` först:\n\n```\nif svar.stop_reason != 'tool_use':\n    return next(b.text for b in svar.content if b.type == 'text')\n```",
    example: "if svar.stop_reason != 'tool_use':\n    return texten",
    task: 'Uppgift: Ändra `svara` så att den returnerar texten direkt när inget verktyg behövs.',
    starterCode: `${BAS}${KOR}\n\ndef svara(fraga):\n    meddelanden = [{'role': 'user', 'content': fraga}]\n    svar = ${FORSTA()}\n    block = next(b for b in svar.content if b.type == 'tool_use')\n    meddelanden.append({'role': 'assistant', 'content': svar.content})\n    meddelanden.append({\n        'role': 'user',\n        'content': [{'type': 'tool_result', 'tool_use_id': block.id, 'content': kor(block)}],\n    })\n    svar = ${FORSTA()}\n    return next(b.text for b in svar.content if b.type == 'text')\n`,
    solution: `${BAS}${KOR}${RUNDA()}`,
    hints: [
      "if svar.stop_reason != 'tool_use':",
      "return next(b.text for b in svar.content if b.type == 'text')",
      'Kontrollen ska stå direkt efter det första anropet.',
    ],
    tests: [
      {
        description: 'Hej',
        code: "svara('Hej')",
        expected: 'Hej! Hur kan jag hjälpa dig?',
      },
      {
        description: 'Kiruna fungerar fortfarande',
        code: "svara('Vädret i Kiruna?')",
        expected: 'Just nu: snö, -5 grader.',
      },
    ],
    modell: VADER_REGLER,
  },
  {
    id: 'ai-verktyg-06',
    track: 'verktyg',
    title: 'Två verktyg',
    xp: 25,
    description:
      'Med flera verktyg väljer modellen själv vilket som passar frågan.',
    explain:
      "Lägg till fler verktyg i listan och i `FUNKTIONER`. Modellen väljer utifrån **beskrivningarna** – skriv dem tydligt.\n\nEtt verktyg utan indata har ett tomt schema: `{'type': 'object', 'properties': {}}`. Då är `block.input` `{}`, och `**{}` blir inga argument.",
    example:
      "FUNKTIONER = {'hamta_vader': hamta_vader, 'hamta_tid': hamta_tid}",
    task: "Uppgift: Lägg till verktyget `hamta_tid` (utan indata) i `VERKTYG`, funktionen `hamta_tid()` som returnerar `'12:00'`, och lägg till den i `FUNKTIONER`.",
    starterCode: `${BAS}${KOR}${RUNDA()}`,
    solution: `${IMPORT}\n${VADER_DATA}\n\ndef hamta_tid():\n    return '12:00'\n\n\n${TVA_TOOLS}\n\nFUNKTIONER = {'hamta_vader': hamta_vader, 'hamta_tid': hamta_tid}\n\n\ndef kor(block):\n    return FUNKTIONER[block.name](**block.input)\n${RUNDA()}`,
    hints: [
      "Ett nytt verktyg i VERKTYG med 'name': 'hamta_tid'.",
      "'input_schema': {'type': 'object', 'properties': {}}",
      "FUNKTIONER = {'hamta_vader': hamta_vader, 'hamta_tid': hamta_tid}",
    ],
    tests: [
      {
        description: 'Klockan',
        code: "svara('Vad är klockan?')",
        expected: 'Klockan är 12:00.',
      },
      {
        description: 'Vädret',
        code: "svara('Vädret i Malmö?')",
        expected: 'Just nu: sol, 18 grader.',
      },
    ],
    modell: [
      { om: 'klockan', verktyg: { namn: 'hamta_tid', input: {} } },
      ...VADER_REGLER.slice(0, 2),
      {
        efter_verktyg: true,
        resultat: '^\\d+:\\d+$',
        svar: 'Klockan är {resultat}.',
      },
      VADER_REGLER[2],
    ],
  },
  {
    id: 'ai-verktyg-07',
    track: 'verktyg',
    title: 'Flera anrop på en gång',
    xp: 25,
    description:
      'Frågar någon om två städer kan modellen be om båda på en gång.',
    explain:
      "Ett svar kan innehålla **flera** tool_use-block. Kör alla, och skicka **alla** resultat i **ett** user-meddelande:\n\n```\nresultat = [\n    {'type': 'tool_result', 'tool_use_id': b.id, 'content': kor(b)}\n    for b in svar.content if b.type == 'tool_use'\n]\nmeddelanden.append({'role': 'user', 'content': resultat})\n```\n\nDelar du upp resultaten i flera meddelanden lär sig modellen att sluta be om flera samtidigt.",
    example: "[kor(b) for b in svar.content if b.type == 'tool_use']",
    task: 'Uppgift: Ändra `svara` så att den kör alla verktygsanrop och skickar alla resultat i ett meddelande.',
    starterCode: `${BAS}${KOR}\n\ndef svara(fraga):\n    meddelanden = [{'role': 'user', 'content': fraga}]\n    svar = ${FORSTA()}\n    if svar.stop_reason != 'tool_use':\n        return next(b.text for b in svar.content if b.type == 'text')\n    block = next(b for b in svar.content if b.type == 'tool_use')\n    meddelanden.append({'role': 'assistant', 'content': svar.content})\n    meddelanden.append({\n        'role': 'user',\n        'content': [{'type': 'tool_result', 'tool_use_id': block.id, 'content': kor(block)}],\n    })\n    svar = ${FORSTA()}\n    return next(b.text for b in svar.content if b.type == 'text')\n`,
    solution: `${BAS}${KOR}${RUNDA()}`,
    hints: [
      'Gå igenom alla block med type == tool_use.',
      "resultat = [{'type': 'tool_result', 'tool_use_id': b.id, 'content': kor(b)} for b in svar.content if b.type == 'tool_use']",
      "meddelanden.append({'role': 'user', 'content': resultat})",
    ],
    tests: [
      {
        description: 'Båda städerna',
        code: "svara('Jämför vädret i Malmö och Kiruna')",
        expected: 'Så här är det:\nsol, 18 grader\nsnö, -5 grader',
      },
      {
        description: 'Två resultat i ett meddelande',
        code: "len(__anrop()[1]['messages'][2]['content'])",
        expected: 2,
      },
    ],
    modell: [
      {
        om: 'Jämför',
        verktyg: [
          { namn: 'hamta_vader', input: { stad: 'Malmö' } },
          { namn: 'hamta_vader', input: { stad: 'Kiruna' } },
        ],
      },
      { efter_verktyg: true, svar: 'Så här är det:\n{resultat}' },
    ],
  },
  {
    id: 'ai-verktyg-08',
    track: 'verktyg',
    title: 'När verktyget kraschar',
    xp: 25,
    description:
      'Ett verktyg kan misslyckas. Berätta det för modellen i stället för att krascha.',
    explain:
      "`hamta_vader('Atlantis')` ger ett `KeyError`. Fånga felet och skicka det som resultat, med `is_error`:\n\n```\n{'type': 'tool_result', 'tool_use_id': b.id, 'content': f'Fel: {fel}', 'is_error': True}\n```\n\nDå kan modellen förklara för användaren, eller försöka på ett annat sätt. Skicka alltid ett resultat för varje tool_use – även när det gick fel.",
    example:
      "try:\n    innehall = kor(b)\nexcept Exception as fel:\n    innehall = f'Fel: {fel}'",
    task: "Uppgift: Skriv `resultat_for(block)` som returnerar tool_result-dicten: med resultatet, eller med `'Fel: …'` och `'is_error': True` om verktyget kraschar. Använd den i `svara`.",
    starterCode: `${BAS}${KOR}${RUNDA()}`,
    solution: `${BAS}${KOR}\n\ndef resultat_for(block):\n    try:\n        return {'type': 'tool_result', 'tool_use_id': block.id, 'content': kor(block)}\n    except Exception as fel:\n        return {'type': 'tool_result', 'tool_use_id': block.id, 'content': f'Fel: {fel}', 'is_error': True}\n${RUNDA('resultat_for(b)')}`,
    hints: [
      'try: … except Exception as fel:',
      "'is_error': True i dicten vid fel.",
      "I svara: resultat = [resultat_for(b) for b in svar.content if b.type == 'tool_use']",
    ],
    tests: [
      {
        description: 'Atlantis',
        code: "svara('Vädret i Atlantis?')",
        expected: 'Tyvärr hittade jag inget väder för den staden.',
      },
      {
        description: 'Felet skickades med is_error',
        code: "__anrop()[1]['messages'][2]['content'][0].get('is_error')",
        expected: true,
      },
      {
        description: 'Malmö fungerar',
        code: "svara('Vädret i Malmö?')",
        expected: 'Just nu: sol, 18 grader.',
      },
    ],
    modell: [
      {
        om: 'Atlantis',
        verktyg: { namn: 'hamta_vader', input: { stad: 'Atlantis' } },
      },
      ...VADER_REGLER.slice(0, 2),
      {
        efter_verktyg: true,
        resultat: '^Fel',
        svar: 'Tyvärr hittade jag inget väder för den staden.',
      },
      VADER_REGLER[2],
    ],
  },
  {
    id: 'ai-verktyg-09',
    track: 'verktyg',
    title: 'Ett verktyg som räknar',
    xp: 25,
    description: 'Modeller kan räkna fel på stora tal. Ge dem en miniräknare.',
    explain:
      "Ett verktyg som räknar ger alltid rätt svar. Men kör **aldrig** `eval` på text från en modell – då kan den köra vilken kod som helst. Gör ett verktyg med bestämda delar:\n\n```\n'properties': {\n    'a': {'type': 'number'},\n    'operator': {'type': 'string', 'enum': ['+', '-', '*', '/']},\n    'b': {'type': 'number'},\n}\n```\n\n`enum` gör att bara de fyra räknesätten går att välja.",
    example: "RAKNESATT = {'+': lambda a, b: a + b, '-': lambda a, b: a - b}",
    task: 'Uppgift: Gör verktyget `rakna` (a, operator, b – alla obligatoriska) i `VERKTYG`, och funktionen `rakna(a, operator, b)` utan `eval`. Lägg till den i `FUNKTIONER`.',
    starterCode: `${IMPORT}\nVERKTYG = []\n\nFUNKTIONER = {}\n\n\ndef kor(block):\n    return FUNKTIONER[block.name](**block.input)\n${RUNDA()}`,
    solution: `${IMPORT}\nVERKTYG = [\n    {\n        'name': 'rakna',\n        'description': 'Räknar ut a operator b exakt.',\n        'input_schema': {\n            'type': 'object',\n            'properties': {\n                'a': {'type': 'number'},\n                'operator': {'type': 'string', 'enum': ['+', '-', '*', '/']},\n                'b': {'type': 'number'},\n            },\n            'required': ['a', 'operator', 'b'],\n        },\n    },\n]\n\nRAKNESATT = {\n    '+': lambda a, b: a + b,\n    '-': lambda a, b: a - b,\n    '*': lambda a, b: a * b,\n    '/': lambda a, b: a / b,\n}\n\n\ndef rakna(a, operator, b):\n    return str(RAKNESATT[operator](a, b))\n\n\nFUNKTIONER = {'rakna': rakna}\n\n\ndef kor(block):\n    return FUNKTIONER[block.name](**block.input)\n${RUNDA()}`,
    hints: [
      "'enum': ['+', '-', '*', '/'] för operator.",
      'En dict från tecken till lambda gör räknandet utan eval.',
      'Returnera resultatet som text: str(…)',
    ],
    tests: [
      {
        description: '1234 * 5678',
        code: "svara('Vad är 1234 gånger 5678?')",
        expected: 'Det blir 7006652.',
      },
      {
        description: 'rakna utan modell',
        code: "rakna(10, '/', 4)",
        expected: '2.5',
      },
      {
        description: 'operator är en enum',
        code: "__anrop()[0]['tools'][0]['input_schema']['properties']['operator']['enum']",
        expected: ['+', '-', '*', '/'],
      },
    ],
    sourceChecks: [
      { description: 'Ingen eval', pattern: /^(?![\s\S]*\beval\()/ },
    ],
    modell: [
      {
        om: '1234',
        verktyg: { namn: 'rakna', input: { a: 1234, operator: '*', b: 5678 } },
      },
      { efter_verktyg: true, svar: 'Det blir {resultat}.' },
    ],
  },
];
