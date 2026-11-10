// Bana 4: strukturerade svar. Från "be om JSON och hoppas" till
// output_config med JSON-schema och messages.parse med Pydantic, och att
// alltid kontrollera svaret. Låtsasmodellens json-regler ger svaren.

const IMPORT = 'import anthropic\n\nclient = anthropic.Anthropic()\n';
const PYD = `import anthropic\nfrom pydantic import BaseModel, Field\n\nclient = anthropic.Anthropic()\n`;
const M = 'claude-opus-5-5';

const PARSE = (namn, modell, prompt = 'text') =>
  `\n\ndef ${namn}(text):\n    svar = client.messages.parse(\n        model='${M}',\n        max_tokens=1000,\n        messages=[{'role': 'user', 'content': ${prompt}}],\n        output_format=${modell},\n    )\n    return svar.parsed_output\n`;

export const STRUKTUR = [
  {
    id: 'ai-struktur-01',
    track: 'struktur',
    title: 'Be om JSON',
    xp: 15,
    description:
      'Text är bra för människor. Ett program vill ha data – till exempel JSON.',
    explain:
      'Ber du modellen svara med JSON kan programmet läsa svaret med `json.loads`:\n\n```\nprompt = \'Svara bara med JSON med nycklarna namn och alder: \' + text\ndata = json.loads(svar_text)\n```\n\nDet fungerar ofta. Men "ofta" räcker inte i ett program – nästa övning visar varför.',
    example:
      'data = json.loads(\'{"namn": "Ada", "alder": 36}\')\nprint(data[\'namn\'])',
    task: "Uppgift: Skriv `person(text)` som skickar `'Svara bara med JSON med nycklarna namn och alder: ' + text` och returnerar svaret som en dict.",
    starterCode: `import json\n\n${IMPORT}`,
    solution: `import json\n\n${IMPORT}\n\ndef person(text):\n    svar = client.messages.create(\n        model='${M}',\n        max_tokens=1000,\n        messages=[{'role': 'user', 'content': 'Svara bara med JSON med nycklarna namn och alder: ' + text}],\n    )\n    return json.loads(next(b.text for b in svar.content if b.type == 'text'))\n`,
    hints: [
      "'Svara bara med JSON med nycklarna namn och alder: ' + text",
      'json.loads(texten) gör om JSON till en dict.',
      "return json.loads(next(b.text for b in svar.content if b.type == 'text'))",
    ],
    tests: [
      {
        description: 'Ada',
        code: "person('Ada Lovelace föddes 1815 och blev 36 år.')",
        expected: { namn: 'Ada Lovelace', alder: 36 },
      },
    ],
    modell: [{ om: 'Ada', json: { namn: 'Ada Lovelace', alder: 36 } }],
  },
  {
    id: 'ai-struktur-02',
    track: 'struktur',
    title: 'När JSON:en är trasig',
    xp: 20,
    description:
      'Ibland skriver modellen en mening före JSON:en. Då kraschar json.loads.',
    explain:
      'Ber du bara om JSON i prompten kan modellen ändå svara `Här är svaret: {…}`. Då ger `json.loads` ett `json.JSONDecodeError`.\n\nFånga felet, så kraschar inte programmet:\n\n```\ntry:\n    return json.loads(text)\nexcept json.JSONDecodeError:\n    return None\n```\n\nI nästa övning slipper du problemet helt.',
    example:
      'try:\n    data = json.loads(text)\nexcept json.JSONDecodeError:\n    data = None',
    task: 'Uppgift: Ändra `person` så att den returnerar `None` när svaret inte är giltig JSON.',
    starterCode: `import json\n\n${IMPORT}\n\ndef person(text):\n    svar = client.messages.create(\n        model='${M}',\n        max_tokens=1000,\n        messages=[{'role': 'user', 'content': 'Svara bara med JSON med nycklarna namn och alder: ' + text}],\n    )\n    return json.loads(next(b.text for b in svar.content if b.type == 'text'))\n`,
    solution: `import json\n\n${IMPORT}\n\ndef person(text):\n    svar = client.messages.create(\n        model='${M}',\n        max_tokens=1000,\n        messages=[{'role': 'user', 'content': 'Svara bara med JSON med nycklarna namn och alder: ' + text}],\n    )\n    try:\n        return json.loads(next(b.text for b in svar.content if b.type == 'text'))\n    except json.JSONDecodeError:\n        return None\n`,
    hints: [
      'Lägg json.loads i ett try.',
      'except json.JSONDecodeError:',
      'return None',
    ],
    tests: [
      {
        description: 'Giltig JSON',
        code: "person('Ada är 36')",
        expected: { namn: 'Ada', alder: 36 },
      },
      {
        description: 'Trasig JSON ger None',
        code: "person('Bo är 7')",
        expected: null,
      },
    ],
    modell: [
      { om: 'Ada', json: { namn: 'Ada', alder: 36 } },
      { om: 'Bo', svar: 'Här är JSON:en: {"namn": "Bo", "alder": 7}' },
    ],
  },
  {
    id: 'ai-struktur-03',
    track: 'struktur',
    title: 'Ett JSON-schema',
    xp: 20,
    description:
      'Med output_config talar du om exakt vilken form svaret ska ha – och API:et ser till att det blir så.',
    explain:
      "**Strukturerade svar** (structured outputs) låter dig skicka ett **JSON-schema**. Då är svaret alltid giltig JSON i den formen:\n\n```\noutput_config={\n    'format': {\n        'type': 'json_schema',\n        'schema': {\n            'type': 'object',\n            'properties': {'namn': {'type': 'string'}, 'alder': {'type': 'integer'}},\n            'required': ['namn', 'alder'],\n            'additionalProperties': False,\n        },\n    }\n}\n```\n\nIngen mening före, ingen trasig JSON.",
    example:
      "output_config={'format': {'type': 'json_schema', 'schema': SCHEMA}}",
    task: 'Uppgift: `SCHEMA` finns. Skriv `person(text)` som skickar texten med `output_config` och schemat, och returnerar svaret som dict.',
    starterCode: `import json\n\n${IMPORT}\nSCHEMA = {\n    'type': 'object',\n    'properties': {'namn': {'type': 'string'}, 'alder': {'type': 'integer'}},\n    'required': ['namn', 'alder'],\n    'additionalProperties': False,\n}\n`,
    solution: `import json\n\n${IMPORT}\nSCHEMA = {\n    'type': 'object',\n    'properties': {'namn': {'type': 'string'}, 'alder': {'type': 'integer'}},\n    'required': ['namn', 'alder'],\n    'additionalProperties': False,\n}\n\n\ndef person(text):\n    svar = client.messages.create(\n        model='${M}',\n        max_tokens=1000,\n        messages=[{'role': 'user', 'content': text}],\n        output_config={'format': {'type': 'json_schema', 'schema': SCHEMA}},\n    )\n    return json.loads(next(b.text for b in svar.content if b.type == 'text'))\n`,
    hints: [
      "output_config={'format': {'type': 'json_schema', 'schema': SCHEMA}}",
      'Prompten kan vara bara texten nu.',
      'json.loads på textblocket.',
    ],
    tests: [
      {
        description: 'Bo',
        code: "person('Bo är 7 år')",
        expected: { namn: 'Bo', alder: 7 },
      },
      {
        description: 'Schemat skickades',
        code: "__anrop()[-1]['output_config']['format']['schema'] == SCHEMA",
        expected: true,
      },
    ],
    modell: [{ om: 'Bo', json: { namn: 'Bo', alder: 7 } }],
  },
  {
    id: 'ai-struktur-04',
    track: 'struktur',
    title: 'parse med Pydantic',
    xp: 20,
    description:
      'Ett schema för hand är pilligt. Med en Pydantic-modell, som i FastAPI, gör SDK:t schemat åt dig.',
    explain:
      '`client.messages.parse` tar en Pydantic-modell som `output_format`. SDK:t gör schemat, skickar det och kontrollerar svaret:\n\n```\nclass Person(BaseModel):\n    namn: str\n    alder: int\n\nsvar = client.messages.parse(..., output_format=Person)\nperson = svar.parsed_output\nprint(person.namn)\n```\n\n`parsed_output` är ett färdigt `Person`-objekt. Samma modeller som du byggde API:er med i FastAPI-kursen.',
    example:
      'svar = client.messages.parse(model=…, max_tokens=…, messages=[…], output_format=Bok)\nbok = svar.parsed_output',
    task: 'Uppgift: Gör modellen `Person` (`namn`, `alder`) och `person(text)` som returnerar `parsed_output`.',
    starterCode: PYD,
    solution: `${PYD}\n\nclass Person(BaseModel):\n    namn: str\n    alder: int\n${PARSE('person', 'Person')}`,
    hints: [
      'class Person(BaseModel):\n    namn: str\n    alder: int',
      'client.messages.parse(…, output_format=Person)',
      'return svar.parsed_output',
    ],
    tests: [
      {
        description: 'Ett Person-objekt',
        code: "type(person('Cy är 12')).__name__",
        expected: 'Person',
      },
      {
        description: 'Med rätt fält',
        code: "person('Cy är 12').model_dump()",
        expected: { namn: 'Cy', alder: 12 },
      },
    ],
    modell: [{ om: 'Cy', json: { namn: 'Cy', alder: 12 } }],
  },
  {
    id: 'ai-struktur-05',
    track: 'struktur',
    title: 'Listor och val',
    xp: 20,
    description: 'Modellen kan fylla i listor och välja bland bestämda värden.',
    explain:
      "Alla Pydantic-typer fungerar: listor, bool, och `Literal` för bestämda värden:\n\n```\nfrom typing import Literal\n\nclass Recept(BaseModel):\n    namn: str\n    ingredienser: list[str]\n    svarighet: Literal['lätt', 'medel', 'svår']\n```\n\n`Literal` gör att modellen bara kan svara med något av de tre orden.",
    example: "kategori: Literal['fråga', 'klagomål', 'beröm']",
    task: 'Uppgift: Gör modellen `Recept` som ovan, plus `vego` (bool), och `recept(text)` som returnerar `parsed_output`.',
    starterCode: `from typing import Literal\n\n${PYD}`,
    solution: `from typing import Literal\n\n${PYD}\n\nclass Recept(BaseModel):\n    namn: str\n    ingredienser: list[str]\n    svarighet: Literal['lätt', 'medel', 'svår']\n    vego: bool\n${PARSE('recept', 'Recept')}`,
    hints: [
      'ingredienser: list[str]',
      "svarighet: Literal['lätt', 'medel', 'svår']",
      'vego: bool',
    ],
    tests: [
      {
        description: 'Pannkakor',
        code: "recept('Pannkakor: mjölk, mjöl och ägg. Lätt att göra.').model_dump()",
        expected: {
          namn: 'Pannkakor',
          ingredienser: ['mjölk', 'mjöl', 'ägg'],
          svarighet: 'lätt',
          vego: true,
        },
      },
      {
        description: 'svarighet är ett Literal i schemat',
        code: "__anrop()[-1]['output_config']['format']['schema']['properties']['svarighet']['enum']",
        expected: ['lätt', 'medel', 'svår'],
      },
    ],
    modell: [
      {
        om: 'Pannkakor',
        json: {
          namn: 'Pannkakor',
          ingredienser: ['mjölk', 'mjöl', 'ägg'],
          svarighet: 'lätt',
          vego: true,
        },
      },
    ],
  },
  {
    id: 'ai-struktur-06',
    track: 'struktur',
    title: 'Kontrollera svaret',
    xp: 25,
    description:
      'Formen kan vara rätt men värdet orimligt. Pydantic kan kontrollera det också – och då ska programmet klara felet.',
    explain:
      'Med `Field(ge=1, le=5)` får ett betyg bara vara 1–5. Alla sådana regler går inte att tvinga på modellen, så Pydantic kontrollerar svaret när det kommer tillbaka. Är det fel blir det ett `ValidationError`:\n\n```\nfrom pydantic import ValidationError\n\ntry:\n    return client.messages.parse(...).parsed_output\nexcept ValidationError:\n    return None\n```\n\nLita aldrig blint på ett svar från en modell – kontrollera det, precis som data från en användare.',
    example: 'betyg: int = Field(ge=1, le=5)',
    task: 'Uppgift: Gör `Omdome` (`betyg` 1–5, `motivering`) och `omdome(text)` som returnerar `parsed_output`, eller `None` om svaret inte klarar kontrollen.',
    starterCode: `${PYD.replace('from pydantic import BaseModel, Field', 'from pydantic import BaseModel, Field, ValidationError')}`,
    solution: `${PYD.replace('from pydantic import BaseModel, Field', 'from pydantic import BaseModel, Field, ValidationError')}\n\nclass Omdome(BaseModel):\n    betyg: int = Field(ge=1, le=5)\n    motivering: str\n\n\ndef omdome(text):\n    try:\n        svar = client.messages.parse(\n            model='${M}',\n            max_tokens=1000,\n            messages=[{'role': 'user', 'content': text}],\n            output_format=Omdome,\n        )\n    except ValidationError:\n        return None\n    return svar.parsed_output\n`,
    hints: [
      'betyg: int = Field(ge=1, le=5)',
      'Lägg parse-anropet i ett try.',
      'except ValidationError:\n    return None',
    ],
    tests: [
      {
        description: 'Ett rimligt omdöme',
        code: "omdome('Boken var spännande').model_dump()",
        expected: { betyg: 4, motivering: 'Spännande' },
      },
      {
        description: 'Betyg 7 ger None',
        code: "omdome('Världens bästa film!!!')",
        expected: null,
      },
    ],
    modell: [
      { om: 'spännande', json: { betyg: 4, motivering: 'Spännande' } },
      { om: 'bästa', json: { betyg: 7, motivering: 'Bäst' } },
    ],
  },
  {
    id: 'ai-struktur-07',
    track: 'struktur',
    title: 'Sortera ärenden',
    xp: 25,
    description:
      'Klassificering är en av de vanligaste AI-uppgifterna: vilken sorts ärende är det här?',
    explain:
      "En kundtjänst får hundratals mejl. Med ett strukturerat svar kan programmet sortera dem direkt:\n\n```\nclass Arende(BaseModel):\n    kategori: Literal['fråga', 'klagomål', 'beröm']\n    bråttom: bool\n```\n\nSedan styr vanlig Python-kod resten: klagomål som är bråttom hamnar först.",
    example: "if arende.kategori == 'klagomål' and arende.bråttom:\n    ...",
    task: 'Uppgift: Gör `Arende` (`kategori` som ovan, `brattom` bool) och `sortera(mejl)` som returnerar en lista med `parsed_output` för varje mejl, med brådskande klagomål först.',
    starterCode: `from typing import Literal\n\n${PYD}`,
    solution: `from typing import Literal\n\n${PYD}\n\nclass Arende(BaseModel):\n    kategori: Literal['fråga', 'klagomål', 'beröm']\n    brattom: bool\n${PARSE('arende', 'Arende')}\n\ndef sortera(mejl):\n    arenden = [arende(text) for text in mejl]\n    return sorted(arenden, key=lambda a: not (a.kategori == 'klagomål' and a.brattom))\n`,
    hints: [
      'En hjälpfunktion arende(text) som gör parse-anropet.',
      'arenden = [arende(text) for text in mejl]',
      "sorted(arenden, key=lambda a: not (a.kategori == 'klagomål' and a.brattom))",
    ],
    tests: [
      {
        description: 'Klagomålet först',
        code: "[a.kategori for a in sortera(['Tack för hjälpen!', 'Hur länge har ni öppet?', 'Paketet är trasigt, jag behöver hjälp NU'])]",
        expected: ['klagomål', 'beröm', 'fråga'],
      },
      {
        description: 'Ett anrop per mejl',
        code: 'len(__anrop())',
        expected: 3,
      },
    ],
    modell: [
      { om: 'Tack', json: { kategori: 'beröm', brattom: false } },
      { om: 'öppet', json: { kategori: 'fråga', brattom: false } },
      { om: 'trasigt', json: { kategori: 'klagomål', brattom: true } },
    ],
  },
  {
    id: 'ai-struktur-08',
    track: 'struktur',
    title: 'Plocka ut en lista',
    xp: 25,
    description:
      'Modellen kan läsa fri text och plocka ut alla saker av ett slag – som varor i ett meddelande.',
    explain:
      'En modell i en modell, som i FastAPI-kursen:\n\n```\nclass Vara(BaseModel):\n    namn: str\n    antal: int\n\nclass Inkop(BaseModel):\n    varor: list[Vara]\n```\n\n"Köp två mjölk och ett bröd" blir en lista med två varor. Det kallas **extrahering**.',
    example: 'for vara in inkop.varor:\n    print(vara.antal, vara.namn)',
    task: 'Uppgift: Gör `Vara` och `Inkop` som ovan, och `inkopslista(text)` som returnerar en lista med strängar som `"2 mjölk"`.',
    starterCode: PYD,
    solution: `${PYD}\n\nclass Vara(BaseModel):\n    namn: str\n    antal: int\n\n\nclass Inkop(BaseModel):\n    varor: list[Vara]\n\n\ndef inkopslista(text):\n    svar = client.messages.parse(\n        model='${M}',\n        max_tokens=1000,\n        messages=[{'role': 'user', 'content': text}],\n        output_format=Inkop,\n    )\n    return [f'{v.antal} {v.namn}' for v in svar.parsed_output.varor]\n`,
    hints: [
      'varor: list[Vara]',
      'svar.parsed_output.varor är en lista med Vara.',
      "[f'{v.antal} {v.namn}' for v in svar.parsed_output.varor]",
    ],
    tests: [
      {
        description: 'Två varor',
        code: "inkopslista('Kan du köpa två mjölk och ett bröd?')",
        expected: ['2 mjölk', '1 bröd'],
      },
    ],
    modell: [
      {
        om: 'mjölk',
        json: {
          varor: [
            { namn: 'mjölk', antal: 2 },
            { namn: 'bröd', antal: 1 },
          ],
        },
      },
    ],
  },
  {
    id: 'ai-struktur-09',
    track: 'struktur',
    title: 'Räkna med svaret',
    xp: 25,
    description:
      'När svaret är data kan vanlig Python-kod ta över – och räkna rätt, varje gång.',
    explain:
      'Språkmodeller kan räkna fel. En bra arbetsfördelning:\n\n- **Modellen** läser den röriga texten och plockar ut talen.\n- **Python** räknar.\n\nSå blir svaret både flexibelt och exakt.',
    example: 'summa = sum(r.pris * r.antal for r in kvitto.rader)',
    task: 'Uppgift: Gör `Rad` (`vara`, `antal`, `pris`) och `Kvitto` (`rader`), och `summa(text)` som låter modellen plocka ut raderna och Python räkna ihop summan.',
    starterCode: PYD,
    solution: `${PYD}\n\nclass Rad(BaseModel):\n    vara: str\n    antal: int\n    pris: float\n\n\nclass Kvitto(BaseModel):\n    rader: list[Rad]\n\n\ndef summa(text):\n    svar = client.messages.parse(\n        model='${M}',\n        max_tokens=1000,\n        messages=[{'role': 'user', 'content': text}],\n        output_format=Kvitto,\n    )\n    return sum(r.antal * r.pris for r in svar.parsed_output.rader)\n`,
    hints: [
      'rader: list[Rad]',
      'Låt Python räkna – be inte modellen om summan.',
      'return sum(r.antal * r.pris for r in svar.parsed_output.rader)',
    ],
    tests: [
      {
        description: 'Kvittot',
        code: "summa('3 kaffe à 30 kr och 2 bullar för 25 kr styck')",
        expected: 140.0,
      },
    ],
    modell: [
      {
        om: 'kaffe',
        json: {
          rader: [
            { vara: 'kaffe', antal: 3, pris: 30 },
            { vara: 'bulle', antal: 2, pris: 25 },
          ],
        },
      },
    ],
  },
];
