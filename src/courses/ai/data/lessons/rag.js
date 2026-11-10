// Bana 7: egna dokument (RAG). Dela upp texten, hitta de bästa bitarna
// med vektorerna från bana 6, skicka dem med i prompten och låt modellen
// svara bara utifrån dem. Låtsasmodellen svarar med reglerna nedan, som
// tittar på dokumenten och frågan i användarmeddelandet.

const M = 'claude-opus-5-5';

const SOK = `import math
import re

import anthropic

client = anthropic.Anthropic()


def ord_i(text):
    return re.findall(r'[a-zåäö0-9]+', text.lower())


def vektor(text, ord):
    ordlista = ord_i(text)
    return [ordlista.count(o) for o in ord]


def likhet(a, b):
    la = math.sqrt(sum(x * x for x in a))
    lb = math.sqrt(sum(x * x for x in b))
    if la == 0 or lb == 0:
        return 0
    return sum(x * y for x, y in zip(a, b)) / (la * lb)
`;

const HANDBOK = `
HANDBOK = '''Kafé Kod har öppet 8–17 på vardagar.

På helger har vi stängt.

Kaffe kostar 30 kronor och en bulle kostar 25 kronor.

Wifi-lösenordet är kodkaffe.'''
`;

const DELA = `

def dela(text):
    return [stycke.strip() for stycke in text.split('\\n\\n') if stycke.strip()]
`;

const HITTA = `

def hitta(fraga, bitar, k):
    ord = sorted(set(o for t in bitar + [fraga] for o in ord_i(t)))
    fraga_v = vektor(fraga, ord)
    return sorted(bitar, key=lambda b: likhet(vektor(b, ord), fraga_v), reverse=True)[:k]
`;

const PROMPT = `

def prompt(fraga, bitar):
    dokument = '\\n'.join(f'<dokument nr="{i + 1}">{bit}</dokument>' for i, bit in enumerate(bitar))
    return f'{dokument}\\n\\n<fraga>{fraga}</fraga>'
`;

const SYSTEM = `
SYSTEM = 'Svara bara utifrån dokumenten. Om svaret inte finns där, svara: Det vet jag inte.'
`;

const SVARA = `

def svara(fraga):
    bitar = hitta(fraga, dela(HANDBOK), 2)
    svar = client.messages.create(
        model='${M}',
        max_tokens=1000,
        system=SYSTEM,
        messages=[{'role': 'user', 'content': prompt(fraga, bitar)}],
    )
    return next(b.text for b in svar.content if b.type == 'text')
`;

const BAS = `${SOK}${HANDBOK}${DELA}${HITTA}${PROMPT}`;

const REGLER = [
  {
    system: 'bara utifrån',
    om: 'öppet 8–17[\\s\\S]*<fraga>.*öppet',
    svar: 'Vi har öppet 8–17 på vardagar.',
  },
  {
    system: 'bara utifrån',
    om: 'kaffe kostar 30[\\s\\S]*<fraga>.*kaffe',
    svar: 'Kaffe kostar 30 kronor.',
  },
  { system: 'bara utifrån', svar: 'Det vet jag inte.' },
];

export const RAG = [
  {
    id: 'ai-rag-01',
    track: 'rag',
    title: 'Dela upp texten',
    xp: 20,
    description:
      'En lång text skickas inte hela. Den delas i bitar, så att bara de bitar som behövs skickas med.',
    explain:
      "**RAG** (Retrieval-Augmented Generation) betyder att programmet först **hämtar** de delar av dina dokument som passar frågan, och sedan låter modellen **svara** utifrån dem. Så kan en modell svara om ditt kafé, din skola eller ditt företag – saker den aldrig lärt sig.\n\nFörsta steget: dela texten i **bitar** (chunks). Stycken, åtskilda av en tom rad, är ett bra sätt:\n\n`text.split('\\n\\n')`",
    example: "'a\\n\\nb'.split('\\n\\n')  # ['a', 'b']",
    task: 'Uppgift: Skriv `dela(text)` som returnerar styckena, utan mellanslag i början och slutet, och utan tomma stycken.',
    starterCode: `${SOK}${HANDBOK}`,
    solution: `${SOK}${HANDBOK}${DELA}`,
    hints: [
      "text.split('\\n\\n')",
      'stycke.strip() tar bort mellanslag och radbrytningar runt om.',
      'if stycke.strip() hoppar över tomma stycken.',
    ],
    tests: [
      { description: 'Fyra stycken', code: 'len(dela(HANDBOK))', expected: 4 },
      {
        description: 'Utan tomma',
        code: "dela('a\\n\\n\\n\\n b \\n\\n')",
        expected: ['a', 'b'],
      },
    ],
  },
  {
    id: 'ai-rag-02',
    track: 'rag',
    title: 'Hitta rätt bitar',
    xp: 20,
    description: 'Av alla bitar ska bara de som passar frågan skickas med.',
    explain:
      'Använd vektorerna från förra banan: gör en vektor av varje bit och av frågan, och ta de k bitar som liknar frågan mest.\n\nI en riktig app är vektorerna embeddings från en embeddingsmodell, sparade i en vektordatabas – men tanken är exakt densamma.',
    example: 'hitta("Vad kostar kaffe?", dela(HANDBOK), 1)',
    task: 'Uppgift: Skriv `hitta(fraga, bitar, k)` som returnerar de k bitar som liknar frågan mest, bäst först.',
    starterCode: `${SOK}${HANDBOK}${DELA}`,
    solution: `${SOK}${HANDBOK}${DELA}${HITTA}`,
    hints: [
      'Ett ordförråd av bitarna och frågan.',
      'Sortera bitarna efter likhet med frågans vektor, högst först.',
      '[:k] tar de k bästa.',
    ],
    tests: [
      {
        description: 'Kaffe',
        code: "hitta('Vad kostar kaffe?', dela(HANDBOK), 1)",
        expected: ['Kaffe kostar 30 kronor och en bulle kostar 25 kronor.'],
      },
      {
        description: 'Wifi',
        code: "hitta('Vilket är wifi-lösenordet?', dela(HANDBOK), 1)",
        expected: ['Wifi-lösenordet är kodkaffe.'],
      },
    ],
  },
  {
    id: 'ai-rag-03',
    track: 'rag',
    title: 'Bygg prompten',
    xp: 20,
    description:
      'Bitarna och frågan sätts ihop till en prompt, med taggar så att modellen ser vad som är vad.',
    explain:
      'Numrera dokumenten, så kan modellen – och du – hänvisa till dem:\n\n```\n<dokument nr="1">Kafé Kod har öppet 8–17 på vardagar.</dokument>\n<dokument nr="2">På helger har vi stängt.</dokument>\n\n<fraga>När har ni öppet?</fraga>\n```\n\n`enumerate(bitar)` ger både platsen och biten. Lägg till 1, så börjar numren på 1.',
    example:
      "'\\n'.join(f'<dokument nr=\"{i + 1}\">{bit}</dokument>' for i, bit in enumerate(bitar))",
    task: 'Uppgift: Skriv `prompt(fraga, bitar)` som returnerar exakt formatet ovan.',
    starterCode: `${SOK}${HANDBOK}${DELA}${HITTA}`,
    solution: BAS,
    hints: [
      'enumerate(bitar) ger i och bit.',
      "'\\n'.join(...) sätter ihop dokumenten med radbrytning.",
      "return f'{dokument}\\n\\n<fraga>{fraga}</fraga>'",
    ],
    tests: [
      {
        description: 'Två dokument och frågan',
        code: "prompt('När har ni öppet?', ['A', 'B'])",
        expected:
          '<dokument nr="1">A</dokument>\n<dokument nr="2">B</dokument>\n\n<fraga>När har ni öppet?</fraga>',
      },
    ],
  },
  {
    id: 'ai-rag-04',
    track: 'rag',
    title: 'Svara utifrån dokumenten',
    xp: 25,
    description:
      'Nu sätts allt ihop: hitta, bygg prompten och fråga modellen – med en systemprompt som håller den till dokumenten.',
    explain:
      "Systemprompten är viktig i RAG:\n\n`'Svara bara utifrån dokumenten. Om svaret inte finns där, svara: Det vet jag inte.'`\n\nUtan den kan modellen fylla i luckor med gissningar som låter rimliga men är fel. Det kallas att **hallucinera**.",
    example: 'svara("När har ni öppet?")',
    task: 'Uppgift: Skriv `SYSTEM` som ovan och `svara(fraga)` som hittar de 2 bästa bitarna i `HANDBOK`, bygger prompten och returnerar modellens svar.',
    starterCode: BAS,
    solution: `${BAS}${SYSTEM}${SVARA}`,
    hints: [
      'bitar = hitta(fraga, dela(HANDBOK), 2)',
      'system=SYSTEM',
      "messages=[{'role': 'user', 'content': prompt(fraga, bitar)}]",
    ],
    tests: [
      {
        description: 'Öppettider',
        code: "svara('När har ni öppet?')",
        expected: 'Vi har öppet 8–17 på vardagar.',
      },
      {
        description: 'Kaffe',
        code: "svara('Vad kostar kaffe?')",
        expected: 'Kaffe kostar 30 kronor.',
      },
      {
        description: 'Det står inte i handboken',
        code: "svara('Har ni glass?')",
        expected: 'Det vet jag inte.',
      },
      {
        description: 'Två dokument skickades',
        code: "__anrop()[0]['messages'][0]['content'].count('<dokument')",
        expected: 2,
      },
    ],
    modell: REGLER,
  },
  {
    id: 'ai-rag-05',
    track: 'rag',
    title: 'Visa källorna',
    xp: 25,
    description:
      'Ett bra svar visar var det kommer ifrån, så att användaren kan kontrollera det.',
    explain:
      "Returnera bitarna som skickades med, tillsammans med svaret:\n\n```\n{'svar': ..., 'kallor': bitar}\n```\n\nEn app kan visa dem under svaret: \"Källa: Kafé Kod har öppet 8–17 på vardagar.\" Det bygger förtroende, och det gör fel lätta att hitta.",
    example: "return {'svar': text, 'kallor': bitar}",
    task: "Uppgift: Ändra `svara` så att den returnerar `{'svar': …, 'kallor': [...]}` med bitarna som skickades.",
    starterCode: `${BAS}${SYSTEM}${SVARA}`,
    solution: `${BAS}${SYSTEM}\n\ndef svara(fraga):\n    bitar = hitta(fraga, dela(HANDBOK), 2)\n    svar = client.messages.create(\n        model='${M}',\n        max_tokens=1000,\n        system=SYSTEM,\n        messages=[{'role': 'user', 'content': prompt(fraga, bitar)}],\n    )\n    text = next(b.text for b in svar.content if b.type == 'text')\n    return {'svar': text, 'kallor': bitar}\n`,
    hints: [
      'Spara texten i en variabel.',
      "return {'svar': text, 'kallor': bitar}",
      'bitar är redan listan som skickades.',
    ],
    tests: [
      {
        description: 'Svar med källor',
        code: "svara('När har ni öppet?')",
        expected: {
          svar: 'Vi har öppet 8–17 på vardagar.',
          kallor: [
            'Kafé Kod har öppet 8–17 på vardagar.',
            'På helger har vi stängt.',
          ],
        },
      },
    ],
    modell: REGLER,
  },
  {
    id: 'ai-rag-06',
    track: 'rag',
    title: 'Ingen träff, inget anrop',
    xp: 25,
    description:
      'Finns inte ett enda ord gemensamt med dokumenten är det ingen idé att fråga modellen.',
    explain:
      "Varje anrop kostar. Om inte ens den bästa biten liknar frågan det minsta, kan programmet svara direkt:\n\n```\nif likhet_basta == 0:\n    return 'Det vet jag inte.'\n```\n\nDet sparar pengar och tid, och minskar risken att modellen hittar på.",
    example: 'if basta == 0:\n    return "Det vet jag inte."',
    task: "Uppgift: Skriv `basta_likhet(fraga, bitar)` som ger den högsta likheten mellan frågan och någon bit, och ändra `svara` så att den returnerar `'Det vet jag inte.'` utan anrop när den är 0.",
    starterCode: `${BAS}${SYSTEM}${SVARA}`,
    solution: `${BAS}${SYSTEM}\n\ndef basta_likhet(fraga, bitar):\n    ord = sorted(set(o for t in bitar + [fraga] for o in ord_i(t)))\n    fraga_v = vektor(fraga, ord)\n    return max(likhet(vektor(b, ord), fraga_v) for b in bitar)\n\n\ndef svara(fraga):\n    if basta_likhet(fraga, dela(HANDBOK)) == 0:\n        return 'Det vet jag inte.'\n    bitar = hitta(fraga, dela(HANDBOK), 2)\n    svar = client.messages.create(\n        model='${M}',\n        max_tokens=1000,\n        system=SYSTEM,\n        messages=[{'role': 'user', 'content': prompt(fraga, bitar)}],\n    )\n    return next(b.text for b in svar.content if b.type == 'text')\n`,
    hints: [
      'max(likhet(…) for b in bitar)',
      "if basta_likhet(fraga, dela(HANDBOK)) == 0:\n    return 'Det vet jag inte.'",
      'Kontrollen ska stå före anropet.',
    ],
    tests: [
      {
        description: 'Ingen träff, inget anrop',
        code: "(lambda fore: [svara('Xyz qwerty?'), len(__anrop()) - fore])(len(__anrop()))",
        expected: ['Det vet jag inte.', 0],
      },
      {
        description: 'Kaffe frågar modellen',
        code: "svara('Vad kostar kaffe?')",
        expected: 'Kaffe kostar 30 kronor.',
      },
    ],
    modell: REGLER,
  },
  {
    id: 'ai-rag-07',
    track: 'rag',
    title: 'En kunskapsbas',
    xp: 25,
    description: 'Samla allt i en klass: dokumenten in, svar ut.',
    explain:
      'En klass gör RAG återanvändbart: samma kod för kaféets handbok, skolans regler eller en manual.\n\n```\nbas = Kunskapsbas(HANDBOK)\nbas.fraga("Vad kostar kaffe?")\n```\n\nBitarna delas upp **en gång**, när kunskapsbasen skapas.',
    example:
      'class Kunskapsbas:\n    def __init__(self, text):\n        self.bitar = dela(text)',
    task: 'Uppgift: Skriv klassen `Kunskapsbas(text, k=2)` med `bitar` och metoden `fraga(fraga)` som gör som `svara`.',
    starterCode: `${BAS}${SYSTEM}`,
    solution: `${BAS}${SYSTEM}\n\nclass Kunskapsbas:\n    def __init__(self, text, k=2):\n        self.bitar = dela(text)\n        self.k = k\n\n    def fraga(self, fraga):\n        bitar = hitta(fraga, self.bitar, self.k)\n        svar = client.messages.create(\n            model='${M}',\n            max_tokens=1000,\n            system=SYSTEM,\n            messages=[{'role': 'user', 'content': prompt(fraga, bitar)}],\n        )\n        return next(b.text for b in svar.content if b.type == 'text')\n`,
    hints: [
      'def __init__(self, text, k=2):\n    self.bitar = dela(text)\n    self.k = k',
      'def fraga(self, fraga): – som svara, med self.bitar och self.k.',
      'hitta(fraga, self.bitar, self.k)',
    ],
    tests: [
      {
        description: 'Fyra bitar',
        code: 'len(Kunskapsbas(HANDBOK).bitar)',
        expected: 4,
      },
      {
        description: 'Fråga',
        code: "Kunskapsbas(HANDBOK).fraga('När har ni öppet?')",
        expected: 'Vi har öppet 8–17 på vardagar.',
      },
      {
        description: 'k styr antalet dokument',
        code: "(Kunskapsbas(HANDBOK, k=3).fraga('Vad kostar kaffe?'), __anrop()[-1]['messages'][0]['content'].count('<dokument'))[1]",
        expected: 3,
      },
    ],
    modell: REGLER,
  },
  {
    id: 'ai-rag-08',
    track: 'rag',
    title: 'Hemligheter i dokumenten',
    xp: 25,
    description:
      'Allt i dokumenten kan hamna i ett svar. Det som inte ska ut ska inte in.',
    explain:
      'Wifi-lösenordet står i handboken – så en kund kan fråga efter det. RAG skickar med de bitar som passar frågan, oavsett vad de innehåller.\n\nDet säkra sättet är att **ta bort** känsliga bitar innan de hamnar i kunskapsbasen, inte att be modellen hålla tyst. En instruktion kan kringgås, en bit som aldrig skickas kan inte läcka.',
    example: "[b for b in bitar if 'lösenord' not in b.lower()]",
    task: 'Uppgift: Ändra `Kunskapsbas` så att bitar som innehåller ordet `lösenord` (oavsett stora eller små bokstäver) aldrig kommer med.',
    starterCode: `${BAS}${SYSTEM}\n\nclass Kunskapsbas:\n    def __init__(self, text, k=2):\n        self.bitar = dela(text)\n        self.k = k\n\n    def fraga(self, fraga):\n        bitar = hitta(fraga, self.bitar, self.k)\n        svar = client.messages.create(\n            model='${M}',\n            max_tokens=1000,\n            system=SYSTEM,\n            messages=[{'role': 'user', 'content': prompt(fraga, bitar)}],\n        )\n        return next(b.text for b in svar.content if b.type == 'text')\n`,
    solution: `${BAS}${SYSTEM}\n\nclass Kunskapsbas:\n    def __init__(self, text, k=2):\n        self.bitar = [b for b in dela(text) if 'lösenord' not in b.lower()]\n        self.k = k\n\n    def fraga(self, fraga):\n        bitar = hitta(fraga, self.bitar, self.k)\n        svar = client.messages.create(\n            model='${M}',\n            max_tokens=1000,\n            system=SYSTEM,\n            messages=[{'role': 'user', 'content': prompt(fraga, bitar)}],\n        )\n        return next(b.text for b in svar.content if b.type == 'text')\n`,
    hints: [
      'Filtrera i __init__, när bitarna skapas.',
      "'lösenord' not in b.lower()",
      "self.bitar = [b for b in dela(text) if 'lösenord' not in b.lower()]",
    ],
    tests: [
      {
        description: 'Tre bitar kvar',
        code: 'len(Kunskapsbas(HANDBOK).bitar)',
        expected: 3,
      },
      {
        description: 'Lösenordet skickas aldrig',
        code: "(Kunskapsbas(HANDBOK).fraga('Vad är wifi-lösenordet?'), 'kodkaffe' in __anrop()[-1]['messages'][0]['content'])[1]",
        expected: false,
      },
    ],
    modell: REGLER,
  },
  {
    id: 'ai-rag-09',
    track: 'rag',
    title: 'Flera dokument',
    xp: 25,
    description:
      'En kunskapsbas har ofta många dokument. Varje bit ska veta vilket dokument den kom från.',
    explain:
      'Spara bitarna som par: `(dokumentets namn, biten)`. Då kan svaret visa källan: "från Personalhandboken".\n\nSök på biten, men behåll namnet:\n\n```\nfor namn, text in DOKUMENT.items():\n    for bit in dela(text):\n        self.bitar.append((namn, bit))\n```',
    example: 'self.bitar.append((namn, bit))',
    task: 'Uppgift: Skriv `kallor(fraga, dokument, k)` som returnerar namnen på dokumenten som de k bästa bitarna kom ifrån, utan dubbletter och i ordning (bäst först).',
    starterCode: `${BAS}\nDOKUMENT = {\n    'Kaféet': HANDBOK,\n    'Personal': 'Personalen börjar klockan 7.\\n\\nLönen betalas den 25:e.',\n}\n`,
    solution: `${BAS}\nDOKUMENT = {\n    'Kaféet': HANDBOK,\n    'Personal': 'Personalen börjar klockan 7.\\n\\nLönen betalas den 25:e.',\n}\n\n\ndef kallor(fraga, dokument, k):\n    par = [(namn, bit) for namn, text in dokument.items() for bit in dela(text)]\n    basta = hitta(fraga, [bit for namn, bit in par], k)\n    namn_i_ordning = []\n    for bit in basta:\n        namn = next(n for n, b in par if b == bit)\n        if namn not in namn_i_ordning:\n            namn_i_ordning.append(namn)\n    return namn_i_ordning\n`,
    hints: [
      'par = [(namn, bit) for namn, text in dokument.items() for bit in dela(text)]',
      'hitta med bara bitarna, sedan slå upp namnet för varje bit.',
      'Lägg bara till ett namn om det inte redan finns.',
    ],
    tests: [
      {
        description: 'Lön',
        code: "kallor('När betalas lönen?', DOKUMENT, 1)",
        expected: ['Personal'],
      },
      {
        description: 'Kaffe',
        code: "kallor('Vad kostar kaffe?', DOKUMENT, 2)",
        expected: ['Kaféet'],
      },
    ],
  },
];
