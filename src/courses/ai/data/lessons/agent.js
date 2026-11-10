// Bana 8: agenter. Loopen som fortsätter så länge modellen ber om verktyg,
// med en spärr mot oändliga loopar, logg, bekräftelse för farliga verktyg,
// fel och budget. Låtsasmodellen tar flera steg med efter_verktyg-regler.

const M = 'claude-opus-5-5';

const BAS = `import anthropic

client = anthropic.Anthropic()

PRISER = {'pizza': 95, 'kebab': 85}


def sok_pris(vara):
    return str(PRISER[vara])


RAKNESATT = {'+': lambda a, b: a + b, '-': lambda a, b: a - b, '*': lambda a, b: a * b, '/': lambda a, b: a / b}


def rakna(a, operator, b):
    return str(RAKNESATT[operator](a, b))


VERKTYG = [
    {
        'name': 'sok_pris',
        'description': 'Hämtar priset på en vara i kronor.',
        'input_schema': {'type': 'object', 'properties': {'vara': {'type': 'string'}}, 'required': ['vara']},
    },
    {
        'name': 'rakna',
        'description': 'Räknar ut a operator b exakt.',
        'input_schema': {
            'type': 'object',
            'properties': {
                'a': {'type': 'number'},
                'operator': {'type': 'string', 'enum': ['+', '-', '*', '/']},
                'b': {'type': 'number'},
            },
            'required': ['a', 'operator', 'b'],
        },
    },
]

FUNKTIONER = {'sok_pris': sok_pris, 'rakna': rakna}


def resultat_for(block):
    try:
        return {'type': 'tool_result', 'tool_use_id': block.id, 'content': FUNKTIONER[block.name](**block.input)}
    except Exception as fel:
        return {'type': 'tool_result', 'tool_use_id': block.id, 'content': f'Fel: {fel}', 'is_error': True}
`;

const ANROP = `client.messages.create(
            model='${M}',
            max_tokens=1000,
            tools=VERKTYG,
            messages=meddelanden,
        )`;

const LOOP = `

def agent(fraga):
    meddelanden = [{'role': 'user', 'content': fraga}]
    while True:
        svar = ${ANROP}
        if svar.stop_reason != 'tool_use':
            return next(b.text for b in svar.content if b.type == 'text')
        meddelanden.append({'role': 'assistant', 'content': svar.content})
        meddelanden.append({
            'role': 'user',
            'content': [resultat_for(b) for b in svar.content if b.type == 'tool_use'],
        })
`;

const SPARR = `

def agent(fraga, max_varv=5):
    meddelanden = [{'role': 'user', 'content': fraga}]
    for varv in range(max_varv):
        svar = ${ANROP}
        if svar.stop_reason != 'tool_use':
            return next(b.text for b in svar.content if b.type == 'text')
        meddelanden.append({'role': 'assistant', 'content': svar.content})
        meddelanden.append({
            'role': 'user',
            'content': [resultat_for(b) for b in svar.content if b.type == 'tool_use'],
        })
    return f'Gav upp efter {max_varv} varv.'
`;

const PIZZA = [
  { om: 'pizzor', verktyg: { namn: 'sok_pris', input: { vara: 'pizza' } } },
  {
    efter_verktyg: true,
    historik: '3 pizzor',
    resultat: '^95$',
    verktyg: { namn: 'rakna', input: { a: 3, operator: '*', b: 95 } },
  },
  {
    efter_verktyg: true,
    resultat: '^285$',
    svar: '3 pizzor kostar 285 kronor.',
  },
];

const EVIG = {
  efter_verktyg: true,
  historik: 'evig',
  verktyg: { namn: 'sok_pris', input: { vara: 'pizza' } },
};

export const AGENT = [
  {
    id: 'ai-agent-01',
    track: 'agent',
    title: 'Loopen',
    xp: 25,
    description:
      'En agent är en modell som använder verktyg i flera steg, tills uppgiften är klar.',
    explain:
      'I bana 5 gjorde du en runda: fråga, verktyg, svar. Men vissa frågor kräver flera steg. "Vad kostar 3 pizzor?" behöver först priset, sedan en uträkning.\n\nEn **agent** är bara en loop:\n\n```\nwhile True:\n    svar = client.messages.create(...)\n    if svar.stop_reason != \'tool_use\':\n        return texten          # klar!\n    # kör verktygen och skicka tillbaka resultaten\n```\n\nModellen bestämmer själv när den är klar. `resultat_for` från bana 5 finns redan i startkoden.',
    example:
      "while True:\n    svar = …\n    if svar.stop_reason != 'tool_use':\n        break",
    task: 'Uppgift: Skriv `agent(fraga)` med loopen ovan.',
    starterCode: BAS,
    solution: `${BAS}${LOOP}`,
    hints: [
      'while True: runt anropet.',
      "if svar.stop_reason != 'tool_use': return texten",
      'Lägg till assistant-svaret och alla tool_result, och loopa igen.',
    ],
    tests: [
      {
        description: '3 pizzor',
        code: "agent('Vad kostar 3 pizzor?')",
        expected: '3 pizzor kostar 285 kronor.',
      },
      {
        description: 'Tre anrop till modellen',
        code: 'len(__anrop())',
        expected: 3,
      },
      {
        description: 'Utan verktyg',
        code: "agent('Hej')",
        expected: 'Hej! Hur kan jag hjälpa dig?',
      },
    ],
    modell: PIZZA,
  },
  {
    id: 'ai-agent-02',
    track: 'agent',
    title: 'En spärr',
    xp: 25,
    description:
      'Tänk om modellen aldrig blir klar? En agent behöver ett tak för hur många varv den får gå.',
    explain:
      "En `while True` som aldrig slutar kan kosta mycket pengar. Byt den mot en `for`-loop med ett tak:\n\n```\nfor varv in range(max_varv):\n    ...\nreturn f'Gav upp efter {max_varv} varv.'\n```\n\nNår loopen taket har agenten inte blivit klar – säg det i stället för att fortsätta.",
    example: 'for varv in range(5):\n    ...',
    task: "Uppgift: Ändra `agent(fraga, max_varv=5)` så att den slutar efter `max_varv` anrop och returnerar `f'Gav upp efter {max_varv} varv.'`.",
    starterCode: `${BAS}${LOOP}`,
    solution: `${BAS}${SPARR}`,
    hints: [
      'for varv in range(max_varv):',
      'Efter loopen har agenten inte blivit klar.',
      "return f'Gav upp efter {max_varv} varv.'",
    ],
    tests: [
      {
        description: 'Ger upp',
        code: "agent('Kör en evig loop', max_varv=4)",
        expected: 'Gav upp efter 4 varv.',
      },
      { description: 'Fyra anrop', code: 'len(__anrop())', expected: 4 },
      {
        description: '3 pizzor fungerar',
        code: "agent('Vad kostar 3 pizzor?')",
        expected: '3 pizzor kostar 285 kronor.',
      },
    ],
    modell: [
      { om: 'evig', verktyg: { namn: 'sok_pris', input: { vara: 'pizza' } } },
      EVIG,
      ...PIZZA,
    ],
  },
  {
    id: 'ai-agent-03',
    track: 'agent',
    title: 'En logg över stegen',
    xp: 25,
    description:
      'Vad gjorde agenten? En logg visar varje verktyg den använde – ovärderligt när något går fel.',
    explain:
      "Spara namnet och indata för varje verktygsanrop. Returnera loggen tillsammans med svaret:\n\n```\n{'svar': ..., 'steg': [['sok_pris', {'vara': 'pizza'}], ...]}\n```\n\nI riktiga AI-tjänster loggas allt – för att felsöka, för att se vad det kostar och för att upptäcka missbruk.",
    example: 'steg.append([block.name, block.input])',
    task: "Uppgift: Ändra `agent` så att den returnerar `{'svar': ..., 'steg': [...]}`, också när den ger upp.",
    starterCode: `${BAS}${SPARR}`,
    solution: `${BAS}\n\ndef agent(fraga, max_varv=5):\n    meddelanden = [{'role': 'user', 'content': fraga}]\n    steg = []\n    for varv in range(max_varv):\n        svar = ${ANROP}\n        if svar.stop_reason != 'tool_use':\n            return {'svar': next(b.text for b in svar.content if b.type == 'text'), 'steg': steg}\n        anrop = [b for b in svar.content if b.type == 'tool_use']\n        steg.extend([b.name, b.input] for b in anrop)\n        meddelanden.append({'role': 'assistant', 'content': svar.content})\n        meddelanden.append({'role': 'user', 'content': [resultat_for(b) for b in anrop]})\n    return {'svar': f'Gav upp efter {max_varv} varv.', 'steg': steg}\n`,
    hints: [
      'steg = [] före loopen.',
      'För varje tool_use-block: steg.append([b.name, b.input])',
      "Returnera {'svar': …, 'steg': steg} på båda ställena.",
    ],
    tests: [
      {
        description: 'Stegen för 3 pizzor',
        code: "agent('Vad kostar 3 pizzor?')",
        expected: {
          svar: '3 pizzor kostar 285 kronor.',
          steg: [
            ['sok_pris', { vara: 'pizza' }],
            ['rakna', { a: 3, operator: '*', b: 95 }],
          ],
        },
      },
    ],
    modell: PIZZA,
  },
  {
    id: 'ai-agent-04',
    track: 'agent',
    title: 'Agentens instruktioner',
    xp: 25,
    description:
      'En systemprompt talar om för agenten hur den ska arbeta – till exempel att alltid låta verktygen räkna.',
    explain:
      'Utan instruktion kan en modell räkna i huvudet och svara "ungefär". Systemprompten styr arbetssättet:\n\n`SYSTEM = \'Använd verktygen för priser och uträkningar. Räkna aldrig själv.\'`\n\nSkriv vad agenten ska göra, med vilka verktyg, och vad den inte får göra.',
    example: 'client.messages.create(..., system=SYSTEM, tools=VERKTYG, ...)',
    task: 'Uppgift: Gör `SYSTEM` som ovan och skicka med den i varje anrop i agenten.',
    starterCode: `${BAS}${SPARR}`,
    solution: `${BAS}\nSYSTEM = 'Använd verktygen för priser och uträkningar. Räkna aldrig själv.'\n${SPARR.replace('            tools=VERKTYG,\n', '            system=SYSTEM,\n            tools=VERKTYG,\n')}`,
    hints: [
      "SYSTEM = 'Använd verktygen för priser och uträkningar. Räkna aldrig själv.'",
      'system=SYSTEM i anropet.',
      'Utan systemprompten gissar modellen.',
    ],
    tests: [
      {
        description: 'Räknar exakt',
        code: "agent('Vad kostar 7 kebab?')",
        expected: '7 kebab kostar 595 kronor.',
      },
      {
        description: 'Systemprompten skickades',
        code: "__anrop()[0]['system']",
        expected:
          'Använd verktygen för priser och uträkningar. Räkna aldrig själv.',
      },
    ],
    modell: [
      { om: 'kebab', verktyg: { namn: 'sok_pris', input: { vara: 'kebab' } } },
      {
        efter_verktyg: true,
        system: 'Räkna aldrig själv',
        resultat: '^85$',
        verktyg: { namn: 'rakna', input: { a: 7, operator: '*', b: 85 } },
      },
      {
        efter_verktyg: true,
        resultat: '^85$',
        svar: '7 kebab kostar ungefär 600 kronor.',
      },
      {
        efter_verktyg: true,
        resultat: '^595$',
        svar: '7 kebab kostar 595 kronor.',
      },
    ],
  },
  {
    id: 'ai-agent-05',
    track: 'agent',
    title: 'Fel på vägen',
    xp: 25,
    description:
      'Ett verktyg som ger fel stoppar inte en bra agent. Den får felet och försöker på ett annat sätt.',
    explain:
      '`resultat_for` skickar fel som `is_error`. I en loop kan modellen läsa felet och prova något annat – här en vanlig pizza när Hawaii saknas.\n\nDet är en stor fördel med agenter: de kan rätta sig själva. Men spärren behövs fortfarande, om de aldrig lyckas.',
    example:
      "{'type': 'tool_result', 'tool_use_id': b.id, 'content': 'Fel: …', 'is_error': True}",
    task: 'Uppgift: Startkodens `agent` kraschar när ett verktyg ger fel, eftersom den anropar funktionerna direkt. Använd `resultat_for` i stället, så att felet går tillbaka till modellen.',
    starterCode: `${BAS}${SPARR.replace('[resultat_for(b) for b in svar.content if b.type', "[{'type': 'tool_result', 'tool_use_id': b.id, 'content': FUNKTIONER[b.name](**b.input)} for b in svar.content if b.type")}`,
    solution: `${BAS}${SPARR}`,
    hints: [
      'Kör och läs felet: KeyError.',
      'resultat_for(b) fångar felet och skickar det med is_error.',
      "'content': [resultat_for(b) for b in svar.content if b.type == 'tool_use']",
    ],
    tests: [
      {
        description: 'Hawaii saknas, men agenten löser det',
        code: "agent('Vad kostar en pizza Hawaii?')",
        expected:
          'Pizza Hawaii finns inte, men en vanlig pizza kostar 95 kronor.',
      },
      {
        description: 'Felet skickades med is_error',
        code: "__anrop()[1]['messages'][2]['content'][0]['is_error']",
        expected: true,
      },
    ],
    modell: [
      {
        om: 'Hawaii',
        verktyg: { namn: 'sok_pris', input: { vara: 'pizza hawaii' } },
      },
      {
        efter_verktyg: true,
        resultat: '^Fel',
        verktyg: { namn: 'sok_pris', input: { vara: 'pizza' } },
      },
      {
        efter_verktyg: true,
        resultat: '^95$',
        svar: 'Pizza Hawaii finns inte, men en vanlig pizza kostar 95 kronor.',
      },
    ],
  },
  {
    id: 'ai-agent-06',
    track: 'agent',
    title: 'Fråga först',
    xp: 25,
    description:
      'Vissa verktyg gör saker i verkligheten – skickar mejl, betalar, raderar. Då ska en människa säga ja först.',
    explain:
      "Låt agenten själv bara göra det som är ofarligt. För farliga verktyg, fråga användaren:\n\n```\nif block.name in FARLIGA and not godkann(block):\n    return {..., 'content': 'Användaren sa nej.', 'is_error': True}\n```\n\n`godkann` är en funktion som frågar människan – i en app en dialogruta. Här skickas den in som parameter, så att testerna kan svara ja eller nej.",
    example: "FARLIGA = {'skicka_mejl'}",
    task: "Uppgift: Lägg till verktyget `skicka_mejl` (till, text) i `VERKTYG` och `FUNKTIONER` (det returnerar `'Skickat'`), `FARLIGA = {'skicka_mejl'}`, och ge `agent` parametern `godkann`. Ett farligt verktyg körs bara om `godkann(block)` är sant.",
    starterCode: `${BAS}${SPARR}`,
    solution: `${BAS}\n\ndef skicka_mejl(till, text):\n    return 'Skickat'\n\n\nVERKTYG.append({\n    'name': 'skicka_mejl',\n    'description': 'Skickar ett mejl.',\n    'input_schema': {\n        'type': 'object',\n        'properties': {'till': {'type': 'string'}, 'text': {'type': 'string'}},\n        'required': ['till', 'text'],\n    },\n})\nFUNKTIONER['skicka_mejl'] = skicka_mejl\nFARLIGA = {'skicka_mejl'}\n\n\ndef kor(block, godkann):\n    if block.name in FARLIGA and not godkann(block):\n        return {'type': 'tool_result', 'tool_use_id': block.id, 'content': 'Användaren sa nej.', 'is_error': True}\n    return resultat_for(block)\n\n\ndef agent(fraga, godkann, max_varv=5):\n    meddelanden = [{'role': 'user', 'content': fraga}]\n    for varv in range(max_varv):\n        svar = ${ANROP}\n        if svar.stop_reason != 'tool_use':\n            return next(b.text for b in svar.content if b.type == 'text')\n        meddelanden.append({'role': 'assistant', 'content': svar.content})\n        meddelanden.append({\n            'role': 'user',\n            'content': [kor(b, godkann) for b in svar.content if b.type == 'tool_use'],\n        })\n    return f'Gav upp efter {max_varv} varv.'\n`,
    hints: [
      "VERKTYG.append({...}) och FUNKTIONER['skicka_mejl'] = skicka_mejl",
      'En hjälpfunktion kor(block, godkann) som kollar FARLIGA först.',
      "if block.name in FARLIGA and not godkann(block): – svara 'Användaren sa nej.' med is_error.",
    ],
    tests: [
      {
        description: 'Användaren säger nej',
        code: "agent('Mejla Ada att mötet är flyttat', godkann=lambda b: False)",
        expected: 'Okej, jag skickar inget.',
      },
      {
        description: 'Användaren säger ja',
        code: "agent('Mejla Ada att mötet är flyttat', godkann=lambda b: True)",
        expected: 'Mejlet till Ada är skickat.',
      },
      {
        description: 'Ofarliga verktyg frågar inte',
        code: "agent('Vad kostar 3 pizzor?', godkann=lambda b: 1 / 0)",
        expected: '3 pizzor kostar 285 kronor.',
      },
    ],
    modell: [
      {
        om: 'Mejla Ada',
        kraver_verktyg: true,
        verktyg: {
          namn: 'skicka_mejl',
          input: { till: 'ada@exempel.se', text: 'Mötet är flyttat.' },
        },
      },
      {
        efter_verktyg: true,
        resultat: 'sa nej',
        svar: 'Okej, jag skickar inget.',
      },
      {
        efter_verktyg: true,
        resultat: '^Skickat$',
        svar: 'Mejlet till Ada är skickat.',
      },
      ...PIZZA,
    ],
  },
  {
    id: 'ai-agent-07',
    track: 'agent',
    title: 'Vad kostade det?',
    xp: 25,
    description:
      'En agent gör många anrop, och varje anrop skickar hela historiken. Räkna ihop vad det kostar.',
    explain:
      'Varje varv i loopen är ett nytt anrop, och historiken växer. Därför kan en agent bli dyr fort.\n\nSumma ihop `input_tokens` och `output_tokens` för alla varv, så att du vet vad varje uppgift kostar.',
    example: 'tokens += svar.usage.input_tokens + svar.usage.output_tokens',
    task: "Uppgift: Ändra `agent` så att den returnerar `{'svar': ..., 'tokens': ...}` med summan av alla tokens för alla anrop.",
    starterCode: `${BAS}${SPARR}`,
    solution: `${BAS}\n\ndef agent(fraga, max_varv=5):\n    meddelanden = [{'role': 'user', 'content': fraga}]\n    tokens = 0\n    for varv in range(max_varv):\n        svar = ${ANROP}\n        tokens += svar.usage.input_tokens + svar.usage.output_tokens\n        if svar.stop_reason != 'tool_use':\n            return {'svar': next(b.text for b in svar.content if b.type == 'text'), 'tokens': tokens}\n        meddelanden.append({'role': 'assistant', 'content': svar.content})\n        meddelanden.append({\n            'role': 'user',\n            'content': [resultat_for(b) for b in svar.content if b.type == 'tool_use'],\n        })\n    return {'svar': f'Gav upp efter {max_varv} varv.', 'tokens': tokens}\n`,
    hints: [
      'tokens = 0 före loopen.',
      'Lägg till direkt efter varje anrop – också det sista.',
      "Returnera {'svar': …, 'tokens': tokens}",
    ],
    tests: [
      {
        description: 'Tokens för alla tre anropen',
        code: "agent('Vad kostar 3 pizzor?')['tokens']",
        expected: 188,
      },
      {
        description: 'Svaret',
        code: "agent('Vad kostar 3 pizzor?')['svar']",
        expected: '3 pizzor kostar 285 kronor.',
      },
    ],
    modell: PIZZA,
  },
  {
    id: 'ai-agent-08',
    track: 'agent',
    title: 'En agent som klass',
    xp: 25,
    description:
      'Samla allt: verktyg, funktioner, systemprompt och spärr – så kan samma kod bli många olika agenter.',
    explain:
      'En klass gör agenten återanvändbar:\n\n```\nprisagent = Agent(VERKTYG, FUNKTIONER, system=SYSTEM)\nprisagent.kor("Vad kostar 3 pizzor?")\n```\n\nByt verktyg och systemprompt, så har du en helt annan agent – för väder, resor eller läxhjälp.',
    example:
      'class Agent:\n    def __init__(self, verktyg, funktioner, system=None, max_varv=5):\n        ...',
    task: 'Uppgift: Skriv klassen `Agent(verktyg, funktioner, system=None, max_varv=5)` med metoden `kor(fraga)`, som agenten med spärr.',
    starterCode: BAS,
    solution: `${BAS}\n\nclass Agent:\n    def __init__(self, verktyg, funktioner, system=None, max_varv=5):\n        self.verktyg = verktyg\n        self.funktioner = funktioner\n        self.system = system\n        self.max_varv = max_varv\n\n    def resultat(self, block):\n        try:\n            innehall = self.funktioner[block.name](**block.input)\n            return {'type': 'tool_result', 'tool_use_id': block.id, 'content': innehall}\n        except Exception as fel:\n            return {'type': 'tool_result', 'tool_use_id': block.id, 'content': f'Fel: {fel}', 'is_error': True}\n\n    def kor(self, fraga):\n        meddelanden = [{'role': 'user', 'content': fraga}]\n        extra = {'system': self.system} if self.system else {}\n        for varv in range(self.max_varv):\n            svar = client.messages.create(\n                model='${M}',\n                max_tokens=1000,\n                tools=self.verktyg,\n                messages=meddelanden,\n                **extra,\n            )\n            if svar.stop_reason != 'tool_use':\n                return next(b.text for b in svar.content if b.type == 'text')\n            meddelanden.append({'role': 'assistant', 'content': svar.content})\n            meddelanden.append({\n                'role': 'user',\n                'content': [self.resultat(b) for b in svar.content if b.type == 'tool_use'],\n            })\n        return f'Gav upp efter {self.max_varv} varv.'\n`,
    hints: [
      'Spara allt i self i __init__.',
      'En metod resultat(self, block) som använder self.funktioner.',
      'kor(self, fraga) är agenten med spärr, med self.verktyg och self.max_varv.',
    ],
    tests: [
      {
        description: '3 pizzor',
        code: "Agent(VERKTYG, FUNKTIONER).kor('Vad kostar 3 pizzor?')",
        expected: '3 pizzor kostar 285 kronor.',
      },
      {
        description: 'Spärren',
        code: "Agent(VERKTYG, FUNKTIONER, max_varv=2).kor('En evig fråga')",
        expected: 'Gav upp efter 2 varv.',
      },
      {
        description: 'Systemprompten',
        code: "(Agent(VERKTYG, FUNKTIONER, system='Var kort.').kor('Hej'), __anrop()[-1]['system'])[1]",
        expected: 'Var kort.',
      },
    ],
    modell: [
      { om: 'evig', verktyg: { namn: 'sok_pris', input: { vara: 'pizza' } } },
      EVIG,
      ...PIZZA,
    ],
  },
  {
    id: 'ai-agent-09',
    track: 'agent',
    title: 'En budget',
    xp: 25,
    description:
      'En spärr på antal varv räcker inte alltid. En budget i tokens stoppar agenten innan den blir för dyr.',
    explain:
      "Varv kan vara olika dyra. En **budget** räknar det som faktiskt kostar:\n\n```\nif tokens > budget:\n    return 'Budgeten är slut.'\n```\n\nKolla efter varje anrop. Riktiga agenter har ofta både ett tak för varv och en budget.",
    example: 'if tokens > budget:\n    return "Budgeten är slut."',
    task: "Uppgift: Ge `agent` parametern `budget` (tokens). Överstiger summan av tokens budgeten efter ett anrop som vill använda verktyg, ska den returnera `'Budgeten är slut.'`.",
    starterCode: `${BAS}${SPARR}`,
    solution: `${BAS}\n\ndef agent(fraga, budget, max_varv=5):\n    meddelanden = [{'role': 'user', 'content': fraga}]\n    tokens = 0\n    for varv in range(max_varv):\n        svar = ${ANROP}\n        tokens += svar.usage.input_tokens + svar.usage.output_tokens\n        if svar.stop_reason != 'tool_use':\n            return next(b.text for b in svar.content if b.type == 'text')\n        if tokens > budget:\n            return 'Budgeten är slut.'\n        meddelanden.append({'role': 'assistant', 'content': svar.content})\n        meddelanden.append({\n            'role': 'user',\n            'content': [resultat_for(b) for b in svar.content if b.type == 'tool_use'],\n        })\n    return f'Gav upp efter {max_varv} varv.'\n`,
    hints: [
      'Räkna tokens efter varje anrop.',
      'Kolla budgeten när modellen vill fortsätta med verktyg.',
      "if tokens > budget:\n    return 'Budgeten är slut.'",
    ],
    tests: [
      {
        description: 'Stor budget',
        code: "agent('Vad kostar 3 pizzor?', budget=10000)",
        expected: '3 pizzor kostar 285 kronor.',
      },
      {
        description: 'Liten budget',
        code: "agent('Vad kostar 3 pizzor?', budget=50)",
        expected: 'Budgeten är slut.',
      },
    ],
    modell: PIZZA,
  },
];
