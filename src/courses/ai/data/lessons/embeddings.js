// Bana 6: embeddings. Text som vektorer och cosinuslikhet, byggt i ren
// Python för att förstå idén. Riktiga embeddings kommer från en
// embeddingsmodell (Anthropic har ingen egen – de rekommenderar t.ex.
// Voyage AI) och fångar betydelse, inte bara samma ord.

const ORD_I = `import re


def ord_i(text):
    return re.findall(r'[a-zåäö0-9]+', text.lower())
`;

const ORDFORRAD = `

def ordforrad(texter):
    return sorted(set(o for text in texter for o in ord_i(text)))
`;

const VEKTOR = `

def vektor(text, ord):
    ordlista = ord_i(text)
    return [ordlista.count(o) for o in ord]
`;

const LANGD = `

def langd(v):
    return math.sqrt(sum(x * x for x in v))
`;

const SKALAR = `

def skalar(a, b):
    return sum(x * y for x, y in zip(a, b))
`;

const LIKHET = `

def likhet(a, b):
    if langd(a) == 0 or langd(b) == 0:
        return 0
    return skalar(a, b) / (langd(a) * langd(b))
`;

const MATH = 'import math\n';
const ALLT = `${MATH}${ORD_I}${ORDFORRAD}${VEKTOR}${LANGD}${SKALAR}${LIKHET}`;

const TEXTER = `TEXTER = [
    'Katten sover i solen',
    'Hunden springer i parken',
    'Katten jagar en mus',
]
`;

export const EMBEDDINGS = [
  {
    id: 'ai-embeddings-01',
    track: 'embeddings',
    title: 'Ord ur en text',
    xp: 15,
    description: 'För att kunna jämföra texter måste de först delas upp i ord.',
    explain:
      "Datorn ser en text som en lång rad tecken. Första steget är att plocka ut orden, med små bokstäver så att `Katt` och `katt` blir samma:\n\n```\nre.findall(r'[a-zåäö0-9]+', text.lower())\n```\n\n`re.findall` hittar alla bitar som bara består av bokstäver och siffror. Punkter och komman försvinner.",
    example:
      "re.findall(r'[a-zåäö0-9]+', 'Hej, världen!'.lower())  # ['hej', 'världen']",
    task: 'Uppgift: Skriv `ord_i(text)` som returnerar en lista med orden i texten, med små bokstäver.',
    starterCode: 'import re\n',
    solution: ORD_I,
    hints: [
      'text.lower() först.',
      "re.findall(r'[a-zåäö0-9]+', …)",
      "return re.findall(r'[a-zåäö0-9]+', text.lower())",
    ],
    tests: [
      {
        description: 'Katten sover.',
        code: "ord_i('Katten sover, i SOLEN!')",
        expected: ['katten', 'sover', 'i', 'solen'],
      },
      { description: 'Tom text', code: "ord_i('')", expected: [] },
    ],
  },
  {
    id: 'ai-embeddings-02',
    track: 'embeddings',
    title: 'Ett ordförråd',
    xp: 15,
    description:
      'Alla texter ska mätas med samma linjal: en lista med alla ord som finns.',
    explain:
      'Ett **ordförråd** är alla olika ord i alla texter, i en bestämd ordning. `set` tar bort dubbletter och `sorted` ger ordningen:\n\n`sorted(set(o for text in texter for o in ord_i(text)))`\n\nVarje ord får en plats i listan – det blir viktigt i nästa övning.',
    example: "sorted(set(['b', 'a', 'b']))  # ['a', 'b']",
    task: 'Uppgift: Skriv `ordforrad(texter)` som returnerar alla olika ord i texterna, sorterade.',
    starterCode: ORD_I,
    solution: `${ORD_I}${ORDFORRAD}`,
    hints: [
      'En comprehension med två for: for text in texter for o in ord_i(text)',
      'set(...) tar bort dubbletter.',
      'return sorted(set(o for text in texter for o in ord_i(text)))',
    ],
    tests: [
      {
        description: 'Två texter',
        code: "ordforrad(['Katten sover', 'Hunden sover'])",
        expected: ['hunden', 'katten', 'sover'],
      },
    ],
  },
  {
    id: 'ai-embeddings-03',
    track: 'embeddings',
    title: 'Text blir tal',
    xp: 20,
    description:
      'En vektor är en lista med tal. Varje text får en, och då kan datorn räkna med texter.',
    explain:
      "För varje ord i ordförrådet: hur många gånger finns det i texten?\n\n```\nord = ['hunden', 'katten', 'sover']\nvektor('Katten sover', ord)  # [0, 1, 1]\n```\n\nTexten har blivit en **vektor** – en punkt i ett rum med en riktning per ord. Riktiga **embeddings** är också vektorer, men gjorda av en AI-modell, med hundratals tal som fångar *betydelsen*. Då hamnar \"katt\" och \"kissemiss\" nära varandra, fast orden är olika.",
    example: '[ordlista.count(o) for o in ord]',
    task: 'Uppgift: Skriv `vektor(text, ord)` som returnerar hur många gånger varje ord i `ord` finns i texten.',
    starterCode: `${ORD_I}${ORDFORRAD}`,
    solution: `${ORD_I}${ORDFORRAD}${VEKTOR}`,
    hints: [
      'ordlista = ord_i(text)',
      'lista.count(x) räknar hur många x som finns.',
      'return [ordlista.count(o) for o in ord]',
    ],
    tests: [
      {
        description: 'Katten sover',
        code: "vektor('Katten sover', ['hunden', 'katten', 'sover'])",
        expected: [0, 1, 1],
      },
      {
        description: 'Ett ord två gånger',
        code: "vektor('sover sover', ['katten', 'sover'])",
        expected: [0, 2],
      },
    ],
  },
  {
    id: 'ai-embeddings-04',
    track: 'embeddings',
    title: 'Hur lång är vektorn?',
    xp: 20,
    description: 'En vektor har en längd, precis som en pil.',
    explain:
      'Längden räknas med Pythagoras sats: kvadratroten ur summan av alla tal i kvadrat.\n\n`langd([3, 4])` = √(9 + 16) = 5\n\nLängden behövs för att jämföra **riktningar** i stället för storlekar – en lång text ska inte vinna bara för att den har fler ord.',
    example: 'math.sqrt(3 * 3 + 4 * 4)  # 5.0',
    task: 'Uppgift: Skriv `langd(v)`.',
    starterCode: MATH,
    solution: `${MATH}${LANGD}`,
    hints: [
      'sum(x * x for x in v)',
      'math.sqrt(…)',
      'return math.sqrt(sum(x * x for x in v))',
    ],
    tests: [
      { description: '[3, 4]', code: 'langd([3, 4])', expected: 5.0 },
      { description: '[0, 0]', code: 'langd([0, 0])', expected: 0.0 },
    ],
  },
  {
    id: 'ai-embeddings-05',
    track: 'embeddings',
    title: 'Skalärprodukten',
    xp: 20,
    description:
      'Multiplicera talen parvis och summera. Ju fler ord två texter delar, desto större blir talet.',
    explain:
      '**Skalärprodukten** av två vektorer:\n\n`[1, 2, 0]` och `[1, 0, 3]` → 1·1 + 2·0 + 0·3 = 1\n\n`zip(a, b)` går igenom båda listorna samtidigt. Bara ord som finns i **båda** texterna ger något.',
    example: 'sum(x * y for x, y in zip(a, b))',
    task: 'Uppgift: Skriv `skalar(a, b)`.',
    starterCode: '',
    solution: SKALAR.trimStart(),
    hints: [
      'zip(a, b)',
      'x * y för varje par',
      'return sum(x * y for x, y in zip(a, b))',
    ],
    tests: [
      {
        description: 'Ett gemensamt',
        code: 'skalar([1, 2, 0], [1, 0, 3])',
        expected: 1,
      },
      {
        description: 'Inget gemensamt',
        code: 'skalar([1, 0], [0, 1])',
        expected: 0,
      },
    ],
  },
  {
    id: 'ai-embeddings-06',
    track: 'embeddings',
    title: 'Cosinuslikhet',
    xp: 25,
    description:
      'Hur lika är två texter? Ett tal mellan 0 och 1 – samma mått som används med riktiga embeddings.',
    explain:
      '**Cosinuslikhet** jämför vektorernas riktning:\n\n`likhet = skalar(a, b) / (langd(a) * langd(b))`\n\n- 1 – samma riktning (samma ord, i samma proportioner)\n- 0 – inget gemensamt\n\nÄr någon vektor tom (längd 0) går det inte att dela – svara 0.',
    example: 'skalar(a, b) / (langd(a) * langd(b))',
    task: 'Uppgift: Skriv `likhet(a, b)` med `langd` och `skalar`, som ger 0 om någon vektor har längden 0.',
    starterCode: `${MATH}${LANGD}${SKALAR}`,
    solution: `${MATH}${LANGD}${SKALAR}${LIKHET}`,
    hints: [
      'if langd(a) == 0 or langd(b) == 0:\n    return 0',
      'skalar(a, b) / (langd(a) * langd(b))',
      'Samma riktning ger 1.0.',
    ],
    tests: [
      {
        description: 'Samma',
        code: 'round(likhet([1, 1], [2, 2]), 6)',
        expected: 1.0,
      },
      { description: 'Olika', code: 'likhet([1, 0], [0, 1])', expected: 0.0 },
      { description: 'Tom', code: 'likhet([0, 0], [1, 1])', expected: 0 },
      {
        description: 'Lite lika',
        code: 'round(likhet([1, 1, 0], [1, 0, 1]), 2)',
        expected: 0.5,
      },
    ],
  },
  {
    id: 'ai-embeddings-07',
    track: 'embeddings',
    title: 'Mest lik',
    xp: 25,
    description:
      'Nu kan du hitta den text som liknar en fråga mest. Det är grunden för sökning med AI.',
    explain:
      'Gör ett ordförråd av alla texter **och** frågan, gör vektorer av allt, och ta den text som har högst likhet med frågan:\n\n`max(texter, key=lambda t: likhet(vektor(t, ord), fraga_v))`\n\nDet här kallas **semantisk sökning** när vektorerna är riktiga embeddings – då hittar "var sover katten" också "kissen vilar i solen".',
    example:
      'basta = max(TEXTER, key=lambda t: likhet(vektor(t, ord), vektor(fraga, ord)))',
    task: 'Uppgift: Skriv `mest_lik(fraga, texter)` som returnerar texten som liknar frågan mest.',
    starterCode: `${ALLT}\n${TEXTER}`,
    solution: `${ALLT}\n${TEXTER}\n\ndef mest_lik(fraga, texter):\n    ord = ordforrad(texter + [fraga])\n    fraga_v = vektor(fraga, ord)\n    return max(texter, key=lambda t: likhet(vektor(t, ord), fraga_v))\n`,
    hints: [
      'ord = ordforrad(texter + [fraga])',
      'fraga_v = vektor(fraga, ord)',
      'return max(texter, key=lambda t: likhet(vektor(t, ord), fraga_v))',
    ],
    tests: [
      {
        description: 'Mus',
        code: "mest_lik('Vem jagar musen?', TEXTER)",
        expected: 'Katten jagar en mus',
      },
      {
        description: 'Parken',
        code: "mest_lik('Vem springer i parken?', TEXTER)",
        expected: 'Hunden springer i parken',
      },
    ],
  },
  {
    id: 'ai-embeddings-08',
    track: 'embeddings',
    title: 'De bästa k',
    xp: 25,
    description:
      'Ofta vill man ha flera träffar, bäst först – som en sökmotor.',
    explain:
      'Sortera texterna efter likhet, högst först, och ta de `k` första:\n\n`sorted(texter, key=…, reverse=True)[:k]`\n\nI RAG (nästa bana) skickas de k bästa bitarna till modellen.',
    example: 'sorted(TEXTER, key=poang, reverse=True)[:2]',
    task: 'Uppgift: Skriv `topp(fraga, texter, k)` som returnerar de k texter som liknar frågan mest, bäst först.',
    starterCode: `${ALLT}\n${TEXTER}`,
    solution: `${ALLT}\n${TEXTER}\n\ndef topp(fraga, texter, k):\n    ord = ordforrad(texter + [fraga])\n    fraga_v = vektor(fraga, ord)\n    return sorted(texter, key=lambda t: likhet(vektor(t, ord), fraga_v), reverse=True)[:k]\n`,
    hints: [
      'Samma som mest_lik, fast sorted i stället för max.',
      'reverse=True ger högst först.',
      '[:k] tar de k första.',
    ],
    tests: [
      {
        description: 'Två om katten',
        code: "topp('Vad gör katten?', TEXTER, 2)",
        expected: ['Katten sover i solen', 'Katten jagar en mus'],
      },
    ],
  },
  {
    id: 'ai-embeddings-09',
    track: 'embeddings',
    title: 'Ett index',
    xp: 25,
    description:
      'Att räkna om alla vektorer för varje fråga är slöseri. Räkna dem en gång och spara.',
    explain:
      'Ett **index** sparar texterna och deras vektorer. Riktiga embeddings kostar ett anrop per text, så de räknas ut **en gång** och sparas – ofta i en vektordatabas.\n\nHär räcker en klass:\n\n```\nclass Index:\n    def __init__(self, texter):\n        self.ord = ordforrad(texter)\n        self.vektorer = [vektor(t, self.ord) for t in texter]\n```\n\nOrd i frågan som inte finns i ordförrådet räknas inte – de kan ändå inte matcha någon text.',
    example: 'index = Index(TEXTER)\nindex.sok("katten", 1)',
    task: 'Uppgift: Skriv klassen `Index(texter)` med `ord`, `texter`, `vektorer` och metoden `sok(fraga, k)` som returnerar de k bästa texterna.',
    starterCode: `${ALLT}\n${TEXTER}`,
    solution: `${ALLT}\n${TEXTER}\n\nclass Index:\n    def __init__(self, texter):\n        self.texter = texter\n        self.ord = ordforrad(texter)\n        self.vektorer = [vektor(t, self.ord) for t in texter]\n\n    def sok(self, fraga, k):\n        fraga_v = vektor(fraga, self.ord)\n        par = sorted(zip(self.texter, self.vektorer), key=lambda p: likhet(p[1], fraga_v), reverse=True)\n        return [text for text, v in par[:k]]\n`,
    hints: [
      'I __init__: self.ord, self.texter och self.vektorer.',
      'zip(self.texter, self.vektorer) ger par.',
      'Sortera paren efter likhet med frågans vektor.',
    ],
    tests: [
      {
        description: 'Sök mus',
        code: "Index(TEXTER).sok('musen jagar', 1)",
        expected: ['Katten jagar en mus'],
      },
      {
        description: 'Vektorerna sparas',
        code: 'len(Index(TEXTER).vektorer)',
        expected: 3,
      },
    ],
  },
];
