// Bana 3: samtal. Modellen minns ingenting själv – minnet är historiken
// som skickas med. Låtsasmodellen kommer ihåg "jag heter …" bara om det
// finns i ett användarmeddelande i historiken.

const IMPORT = 'import anthropic\n\nclient = anthropic.Anthropic()\n';
const M = 'claude-opus-5-5';

const PRATA = `

def prata(historik, text):
    historik.append({'role': 'user', 'content': text})
    svar = client.messages.create(
        model='${M}',
        max_tokens=1000,
        messages=historik,
    )
    historik.append({'role': 'assistant', 'content': svar.content})
    return next(b.text for b in svar.content if b.type == 'text')
`;

const CHATT = `

class Chatt:
    def __init__(self, system=None):
        self.system = system
        self.historik = []

    def fraga(self, text):
        self.historik.append({'role': 'user', 'content': text})
        extra = {'system': self.system} if self.system else {}
        svar = client.messages.create(
            model='${M}',
            max_tokens=1000,
            messages=self.historik,
            **extra,
        )
        self.historik.append({'role': 'assistant', 'content': svar.content})
        return next(b.text for b in svar.content if b.type == 'text')
`;

export const SAMTAL = [
  {
    id: 'ai-samtal-01',
    track: 'samtal',
    title: 'Modellen minns ingenting',
    xp: 15,
    description:
      'Två anrop är två helt separata samtal. För att modellen ska minnas måste du skicka med det som sagts.',
    explain:
      "API:et är **utan minne**: varje anrop börjar från noll. Ett samtal är därför en lista med alla meddelanden hittills, där rollerna växlar:\n\n```\nmessages=[\n    {'role': 'user', 'content': 'Jag heter Ada'},\n    {'role': 'assistant', 'content': 'Hej Ada!'},\n    {'role': 'user', 'content': 'Vad heter jag?'},\n]\n```\n\n`assistant` är modellens tidigare svar. Hela listan skickas varje gång.",
    example:
      "messages=[\n    {'role': 'user', 'content': 'Min favoritfärg är blå'},\n    {'role': 'assistant', 'content': 'Fin färg!'},\n    {'role': 'user', 'content': 'Vad är min favoritfärg?'},\n]",
    task: 'Uppgift: Startkoden frågar "Vad heter jag?" utan historik. Skicka i stället de tre meddelandena ovan (med `\'Hej Ada!\'` som svar) och skriv ut svaret.',
    starterCode: `${IMPORT}\nsvar = client.messages.create(\n    model='${M}',\n    max_tokens=1000,\n    messages=[{'role': 'user', 'content': 'Vad heter jag?'}],\n)\nprint(svar.content[0].text)\n`,
    solution: `${IMPORT}\nsvar = client.messages.create(\n    model='${M}',\n    max_tokens=1000,\n    messages=[\n        {'role': 'user', 'content': 'Jag heter Ada'},\n        {'role': 'assistant', 'content': 'Hej Ada!'},\n        {'role': 'user', 'content': 'Vad heter jag?'},\n    ],\n)\nprint(svar.content[0].text)\n`,
    hints: [
      'messages är en lista med tre dicts.',
      "Den andra har role 'assistant'.",
      "{'role': 'assistant', 'content': 'Hej Ada!'}",
    ],
    tests: [
      {
        description: 'Modellen minns',
        code: '__output',
        expected: ['Du heter Ada.'],
      },
      {
        description: 'Tre meddelanden skickades',
        code: "[m['role'] for m in __anrop()[0]['messages']]",
        expected: ['user', 'assistant', 'user'],
      },
    ],
  },
  {
    id: 'ai-samtal-02',
    track: 'samtal',
    title: 'Historiken växer',
    xp: 20,
    description:
      'En chatt lägger till varje fråga och varje svar i samma lista.',
    explain:
      'För varje fråga:\n\n1. Lägg till användarens meddelande i historiken.\n2. Skicka hela historiken.\n3. Lägg till svaret som ett `assistant`-meddelande.\n\nLägg till `svar.content` – hela listan med block – inte bara texten. Då följer allt med, även verktygsanrop senare i kursen.',
    example: "historik.append({'role': 'assistant', 'content': svar.content})",
    task: 'Uppgift: Skriv `prata(historik, text)` som gör de tre stegen och returnerar svarets text.',
    starterCode: IMPORT,
    solution: `${IMPORT}${PRATA}`,
    hints: [
      "historik.append({'role': 'user', 'content': text})",
      'messages=historik',
      "historik.append({'role': 'assistant', 'content': svar.content})",
    ],
    tests: [
      {
        description: 'Ett samtal i två steg',
        code: "(lambda h: [prata(h, 'Jag heter Bo'), prata(h, 'Vad heter jag?'), len(h)])([])",
        expected: [
          'Jag är Kodskolans låtsasmodell. Du skrev: Jag heter Bo',
          'Du heter Bo.',
          4,
        ],
      },
      {
        description: 'Svaret sparas som block',
        code: "(lambda h: (prata(h, 'Hej'), h[1]['content'][0].type))([])[1]",
        expected: 'text',
      },
    ],
  },
  {
    id: 'ai-samtal-03',
    track: 'samtal',
    title: 'En chatt som klass',
    xp: 20,
    description:
      'En klass håller ihop historiken och funktionen som använder den.',
    explain:
      'Med en klass kan du ha flera chattar samtidigt, var och en med sin egen historik:\n\n```\nclass Chatt:\n    def __init__(self):\n        self.historik = []\n\n    def fraga(self, text):\n        ...\n```\n\n`a = Chatt()` och `b = Chatt()` minns olika saker.',
    example: 'ada = Chatt()\nbo = Chatt()\nada.fraga("Jag heter Ada")',
    task: 'Uppgift: Skriv klassen `Chatt` med `historik` (tom lista) och metoden `fraga(text)`, som `prata` men med `self.historik`.',
    starterCode: IMPORT,
    solution: `${IMPORT}\n\nclass Chatt:\n    def __init__(self):\n        self.historik = []\n\n    def fraga(self, text):\n        self.historik.append({'role': 'user', 'content': text})\n        svar = client.messages.create(\n            model='${M}',\n            max_tokens=1000,\n            messages=self.historik,\n        )\n        self.historik.append({'role': 'assistant', 'content': svar.content})\n        return next(b.text for b in svar.content if b.type == 'text')\n`,
    hints: [
      'def __init__(self):\n    self.historik = []',
      'def fraga(self, text): – som prata, fast med self.historik.',
      'Två chattar ska inte dela historik.',
    ],
    tests: [
      {
        description: 'Två chattar minns olika',
        code: "(lambda a, b: [a.fraga('Jag heter Ada'), b.fraga('Jag heter Bo'), a.fraga('Vad heter jag?'), b.fraga('Vad heter jag?')][2:])(Chatt(), Chatt())",
        expected: ['Du heter Ada.', 'Du heter Bo.'],
      },
    ],
  },
  {
    id: 'ai-samtal-04',
    track: 'samtal',
    title: 'Systemprompt i chatten',
    xp: 20,
    description:
      'Systemprompten är inte ett meddelande i historiken. Den skickas bredvid, varje gång.',
    explain:
      '`system` ligger kvar utanför `messages` och skickas med varje anrop. Spara den i chatten:\n\n```\ndef __init__(self, system=None):\n    self.system = system\n```\n\nSkicka bara med `system` om den finns – `**extra` packar upp en dict till argument.',
    example:
      "extra = {'system': self.system} if self.system else {}\nclient.messages.create(..., **extra)",
    task: 'Uppgift: Ge `Chatt` parametern `system` (standard `None`) och skicka med den i varje anrop när den finns.',
    starterCode: `${IMPORT}\n\nclass Chatt:\n    def __init__(self):\n        self.historik = []\n\n    def fraga(self, text):\n        self.historik.append({'role': 'user', 'content': text})\n        svar = client.messages.create(\n            model='${M}',\n            max_tokens=1000,\n            messages=self.historik,\n        )\n        self.historik.append({'role': 'assistant', 'content': svar.content})\n        return next(b.text for b in svar.content if b.type == 'text')\n`,
    solution: `${IMPORT}${CHATT}`,
    hints: [
      'def __init__(self, system=None):\n    self.system = system',
      "extra = {'system': self.system} if self.system else {}",
      'client.messages.create(…, **extra)',
    ],
    tests: [
      {
        description: 'Pirat i varje svar',
        code: "(lambda c: [c.fraga('Hej'), c.fraga('Vad är 1 + 1?')])(Chatt('Du är en pirat.'))",
        expected: ['Arrr! Hej! Hur kan jag hjälpa dig?', 'Arrr! Det blir 2.'],
      },
      {
        description: 'Systemprompten är inte i historiken',
        code: "[m['role'] for m in __anrop()[-1]['messages']]",
        expected: ['user', 'assistant', 'user'],
      },
      {
        description: 'Utan systemprompt fungerar det också',
        code: "Chatt().fraga('Hej')",
        expected: 'Hej! Hur kan jag hjälpa dig?',
      },
    ],
  },
  {
    id: 'ai-samtal-05',
    track: 'samtal',
    title: 'Börja om',
    xp: 15,
    description:
      'Ett nytt ämne? Då är det bäst att börja om – en tom historik.',
    explain:
      'Gammal historik gör svaren långsammare, dyrare och ibland sämre, när modellen blandar ihop gamla ämnen med nya. En **Ny chatt**-knapp tömmer historiken:\n\n`self.historik = []`\n\nSystemprompten ligger kvar – den hör till chatten, inte till samtalet.',
    example: 'def borja_om(self):\n    self.historik = []',
    task: 'Uppgift: Lägg till metoden `borja_om()` i `Chatt` som tömmer historiken.',
    starterCode: `${IMPORT}${CHATT}`,
    solution: `${IMPORT}${CHATT}\n    def borja_om(self):\n        self.historik = []\n`,
    hints: [
      'def borja_om(self):',
      'self.historik = []',
      'Indraget: metoden står i klassen, som fraga.',
    ],
    tests: [
      {
        description: 'Glömmer efter borja_om',
        code: "(lambda c: [c.fraga('Jag heter Cy'), c.borja_om(), c.fraga('Vad heter jag?')][2])(Chatt())",
        expected: 'Det vet jag inte – du har inte berättat det.',
      },
      {
        description: 'Systemprompten ligger kvar',
        code: "(lambda c: (c.borja_om(), c.system)[1])(Chatt('Du är en pirat.'))",
        expected: 'Du är en pirat.',
      },
    ],
  },
  {
    id: 'ai-samtal-06',
    track: 'samtal',
    title: 'Långa samtal kostar',
    xp: 20,
    description:
      'Hela historiken skickas varje gång. Ju längre samtal, desto fler input-tokens per fråga.',
    explain:
      'Fråga tio gånger i samma chatt, och den tionde frågan skickar med alla nio tidigare frågor och svar. Därför växer `usage.input_tokens` för varje fråga.\n\nDet är därför långa chattar blir dyra och långsamma – och varför appar kortar historiken, som i nästa övning.',
    example: 'print(svar.usage.input_tokens)',
    task: 'Uppgift: Skriv `matt(fragor)` som ställer frågorna i ett och samma samtal och returnerar en lista med `input_tokens` för varje anrop.',
    starterCode: IMPORT,
    solution: `${IMPORT}\n\ndef matt(fragor):\n    historik = []\n    tokens = []\n    for text in fragor:\n        historik.append({'role': 'user', 'content': text})\n        svar = client.messages.create(\n            model='${M}',\n            max_tokens=1000,\n            messages=historik,\n        )\n        historik.append({'role': 'assistant', 'content': svar.content})\n        tokens.append(svar.usage.input_tokens)\n    return tokens\n`,
    hints: [
      'En historik för hela loopen.',
      'tokens.append(svar.usage.input_tokens)',
      'Lägg till både frågan och svaret i historiken varje varv.',
    ],
    tests: [
      {
        description: 'Tokens växer',
        code: "matt(['Hej', 'Hej', 'Hej'])",
        expected: [1, 8, 15],
      },
    ],
  },
  {
    id: 'ai-samtal-07',
    track: 'samtal',
    title: 'Korta historiken',
    xp: 25,
    description:
      'Skicka bara de senaste meddelandena. Men samtalet måste fortfarande börja med användaren.',
    explain:
      "`historik[-4:]` ger de fyra sista meddelandena. Men det första meddelandet som skickas måste ha `role` `'user'` – annars blir det ett BadRequestError. Ta bort `assistant`-meddelanden i början tills ett `user` står först.\n\nNackdelen syns direkt: det som klipptes bort har modellen glömt.",
    example:
      "kvar = historik[-4:]\nwhile kvar and kvar[0]['role'] != 'user':\n    kvar = kvar[1:]",
    task: 'Uppgift: Skriv `kortad(historik, antal)` som returnerar högst `antal` sista meddelanden, och som alltid börjar med ett `user`-meddelande.',
    starterCode: IMPORT,
    solution: `${IMPORT}\n\ndef kortad(historik, antal):\n    kvar = historik[-antal:]\n    while kvar and kvar[0]['role'] != 'user':\n        kvar = kvar[1:]\n    return kvar\n`,
    hints: [
      'historik[-antal:]',
      "while kvar and kvar[0]['role'] != 'user':",
      'kvar = kvar[1:]',
    ],
    tests: [
      {
        description: 'Fyra sista, börjar med user',
        code: "[m['content'] for m in kortad([{'role': 'user', 'content': 'a'}, {'role': 'assistant', 'content': 'b'}, {'role': 'user', 'content': 'c'}, {'role': 'assistant', 'content': 'd'}, {'role': 'user', 'content': 'e'}], 4)]",
        expected: ['c', 'd', 'e'],
      },
      {
        description: 'Kort historik ändras inte',
        code: "len(kortad([{'role': 'user', 'content': 'a'}], 4))",
        expected: 1,
      },
      {
        description: 'Modellen glömmer det som klipptes',
        code: "client.messages.create(model='claude-opus-5-5', max_tokens=50, messages=kortad([{'role': 'user', 'content': 'Jag heter Di'}, {'role': 'assistant', 'content': 'Hej Di!'}, {'role': 'user', 'content': 'Hur mår du?'}, {'role': 'assistant', 'content': 'Bra!'}, {'role': 'user', 'content': 'Vad heter jag?'}], 3)).content[0].text",
        expected: 'Det vet jag inte – du har inte berättat det.',
      },
    ],
  },
  {
    id: 'ai-samtal-08',
    track: 'samtal',
    title: 'Spara samtalet',
    xp: 25,
    description:
      'Ska samtalet finnas kvar nästa gång? Spara det som JSON – men först som ren text.',
    explain:
      "Svaren i historiken är **block-objekt**, och de går inte att göra JSON av direkt. Gör om varje meddelande till text först:\n\n```\n{'role': m['role'], 'content': texten}\n```\n\nEn sträng som `content` fungerar lika bra som block när historiken skickas igen.",
    example:
      "json.dumps([{'role': 'user', 'content': 'Hej'}], ensure_ascii=False)",
    task: "Uppgift: Skriv `som_text(historik)` som gör om varje meddelande till `{'role': …, 'content': text}` (texten ur textblocken, eller strängen som den är), och `spara(historik)` som returnerar JSON-texten.",
    starterCode: `import json\n\n${IMPORT}`,
    solution: `import json\n\n${IMPORT}\n\ndef text_i(innehall):\n    if isinstance(innehall, str):\n        return innehall\n    return ''.join(b.text for b in innehall if b.type == 'text')\n\n\ndef som_text(historik):\n    return [{'role': m['role'], 'content': text_i(m['content'])} for m in historik]\n\n\ndef spara(historik):\n    return json.dumps(som_text(historik), ensure_ascii=False)\n`,
    hints: [
      'isinstance(innehall, str) – då är det redan text.',
      "''.join(b.text for b in innehall if b.type == 'text')",
      'json.dumps(som_text(historik), ensure_ascii=False)',
    ],
    tests: [
      {
        description: 'Ett riktigt svar sparas',
        code: "(lambda h: json.loads(spara(h)))([{'role': 'user', 'content': 'Hej'}, {'role': 'assistant', 'content': client.messages.create(model='claude-opus-5-5', max_tokens=50, messages=[{'role': 'user', 'content': 'Hej'}]).content}])",
        expected: [
          { role: 'user', content: 'Hej' },
          { role: 'assistant', content: 'Hej! Hur kan jag hjälpa dig?' },
        ],
      },
    ],
  },
  {
    id: 'ai-samtal-09',
    track: 'samtal',
    title: 'Fortsätt där du slutade',
    xp: 25,
    description:
      'Ett sparat samtal kan läsas in igen – och modellen minns då allt som stod i det.',
    explain:
      '`json.loads` ger tillbaka listan. Lägg den i en ny chatt, så fortsätter samtalet som om inget hänt.\n\nSå fungerar chattappar som minns dina gamla samtal: historiken sparas i en databas och skickas med när du öppnar samtalet igen.',
    example: 'chatt.historik = json.loads(text)',
    task: 'Uppgift: Skriv funktionen `ladda(text)` som returnerar en ny `Chatt` med historiken från JSON-texten.',
    starterCode: `import json\n\n${IMPORT}${CHATT}`,
    solution: `import json\n\n${IMPORT}${CHATT}\n\ndef ladda(text):\n    chatt = Chatt()\n    chatt.historik = json.loads(text)\n    return chatt\n`,
    hints: [
      'chatt = Chatt()',
      'chatt.historik = json.loads(text)',
      'return chatt',
    ],
    tests: [
      {
        description: 'Minns efter laddning',
        code: "ladda(json.dumps([{'role': 'user', 'content': 'Jag heter Eli'}, {'role': 'assistant', 'content': 'Hej Eli!'}])).fraga('Vad heter jag?')",
        expected: 'Du heter Eli.',
      },
    ],
  },
];
