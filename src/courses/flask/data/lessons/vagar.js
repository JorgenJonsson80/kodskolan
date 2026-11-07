// Bana 2: vägar med variabler. Fortfarande bara text och HTML som svar.

const IMPORT = 'from flask import Flask\n\napp = Flask(__name__)\n';
const IMPORT_URL =
  'from flask import Flask, url_for\n\napp = Flask(__name__)\n';

export const VAGAR = [
  {
    id: 'vagar-01',
    track: 'vagar',
    title: 'En variabel i adressen',
    xp: 10,
    description:
      'En del av adressen kan vara en variabel. Då fungerar samma väg för /hej/Ada och /hej/Bo.',
    explain:
      "`@app.get('/hej/<namn>')` betyder: allt som står efter `/hej/` hamnar i parametern `namn`. Funktionen måste ha en parameter med samma namn.\n\nI Kodskolan skriver du adressen i 📮, t.ex. `/hej/Ada`.",
    example:
      "@app.get('/stad/<namn>')\ndef stad(namn):\n    return f'Välkommen till {namn}'",
    task: "Uppgift: Skapa `/hej/<namn>` som svarar `f'Hej {namn}!'`.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n@app.get('/hej/<namn>')\ndef hej(namn):\n    return f'Hej {namn}!'\n`,
    hints: [
      "@app.get('/hej/<namn>')",
      'Funktionen tar parametern namn.',
      "def hej(namn):\n    return f'Hej {namn}!'",
    ],
    tests: [
      {
        description: '/hej/Ada',
        code: "__get('/hej/Ada').text",
        expected: 'Hej Ada!',
      },
      {
        description: '/hej/Bo',
        code: "__get('/hej/Bo').text",
        expected: 'Hej Bo!',
      },
    ],
    request: { path: '/hej/Ada' },
  },
  {
    id: 'vagar-02',
    track: 'vagar',
    title: 'Ett tal i adressen',
    xp: 15,
    description:
      'Allt i en adress är text. Med `<int:tal>` gör Flask om det till ett heltal åt dig.',
    explain:
      "Utan `int:` är `'4'` text, och `'4' * 2` blir `'44'`. Med `<int:tal>` blir det talet `4`.\n\nEn adress som inte är ett tal, som `/dubbla/fyra`, matchar inte vägen alls – då svarar Flask 404.",
    example:
      "@app.get('/ar/<int:ar>')\ndef ar(ar):\n    return f'Om tio år är det {ar + 10}'",
    task: 'Uppgift: Skapa `/dubbla/<int:tal>` som svarar med talet gånger två, som text (`str(tal * 2)`).',
    starterCode: IMPORT,
    solution: `${IMPORT}\n@app.get('/dubbla/<int:tal>')\ndef dubbla(tal):\n    return str(tal * 2)\n`,
    hints: [
      "@app.get('/dubbla/<int:tal>')",
      'Ett svar måste vara text, så gör om talet med str.',
      'return str(tal * 2)',
    ],
    tests: [
      {
        description: '/dubbla/4',
        code: "__get('/dubbla/4').text",
        expected: '8',
      },
      {
        description: '/dubbla/fyra ger 404',
        code: "__get('/dubbla/fyra').status",
        expected: 404,
      },
    ],
    request: { path: '/dubbla/4' },
  },
  {
    id: 'vagar-03',
    track: 'vagar',
    title: 'Två variabler',
    xp: 10,
    description: 'En adress kan ha flera variabler.',
    explain:
      '`/plus/<int:a>/<int:b>` ger funktionen två parametrar. Ordningen i adressen spelar ingen roll för funktionen – det är namnen som räknas.',
    example:
      "@app.get('/rum/<int:vaning>/<int:nummer>')\ndef rum(vaning, nummer):\n    return f'Våning {vaning}, rum {nummer}'",
    task: 'Uppgift: Skapa `/plus/<int:a>/<int:b>` som svarar med summan som text.',
    starterCode: IMPORT,
    solution: `${IMPORT}\n@app.get('/plus/<int:a>/<int:b>')\ndef plus(a, b):\n    return str(a + b)\n`,
    hints: [
      "@app.get('/plus/<int:a>/<int:b>')",
      'def plus(a, b):',
      'return str(a + b)',
    ],
    tests: [
      {
        description: '/plus/2/3',
        code: "__get('/plus/2/3').text",
        expected: '5',
      },
      {
        description: '/plus/10/-4 ger 404',
        code: "__get('/plus/10/-4').status",
        expected: 404,
      },
    ],
    request: { path: '/plus/2/3' },
  },
  {
    id: 'vagar-04',
    track: 'vagar',
    title: 'Slå upp i en dictionary',
    xp: 15,
    description:
      'Variabeln i adressen kan användas för att hitta något i appens data.',
    explain:
      '`priser.get(vara)` ger priset, eller `None` om varan inte finns. Kolla det, så att en okänd vara inte kraschar appen.\n\n(En riktig 404 för det som saknas kommer i bana 3.)',
    example:
      "farger = {'himmel': 'blå'}\n\n@app.get('/farg/<sak>')\ndef farg(sak):\n    return farger.get(sak, 'okänd')",
    task: "Uppgift: Skapa `/pris/<vara>`. Finns varan i `priser` svarar den `f'{vara}: {pris} kr'`, annars `'Finns inte på menyn'`.",
    starterCode: `${IMPORT}\npriser = {'kaffe': 35, 'te': 30, 'bulle': 32}\n`,
    solution: `${IMPORT}\npriser = {'kaffe': 35, 'te': 30, 'bulle': 32}\n\n\n@app.get('/pris/<vara>')\ndef pris(vara):\n    pris = priser.get(vara)\n    if pris is None:\n        return 'Finns inte på menyn'\n    return f'{vara}: {pris} kr'\n`,
    hints: [
      'priser.get(vara) ger None om varan saknas.',
      "if pris is None:\n        return 'Finns inte på menyn'",
      "return f'{vara}: {pris} kr'",
    ],
    tests: [
      {
        description: '/pris/te',
        code: "__get('/pris/te').text",
        expected: 'te: 30 kr',
      },
      {
        description: '/pris/pizza',
        code: "__get('/pris/pizza').text",
        expected: 'Finns inte på menyn',
      },
    ],
    request: { path: '/pris/kaffe' },
  },
  {
    id: 'vagar-05',
    track: 'vagar',
    title: 'Två adresser, en funktion',
    xp: 15,
    description:
      'En funktion kan ha flera dekoratorer – och en parameter med standardvärde.',
    explain:
      "`/hej` har inget namn, men `/hej/<namn>` har. Med båda dekoratorerna på samma funktion och `namn='du'` som standardvärde fungerar båda.",
    example:
      "@app.get('/sida')\n@app.get('/sida/<int:nr>')\ndef sida(nr=1):\n    return f'Sida {nr}'",
    task: "Uppgift: Låt både `/hej` och `/hej/<namn>` gå till samma funktion. Utan namn svarar den `'Hej du!'`.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n@app.get('/hej')\n@app.get('/hej/<namn>')\ndef hej(namn='du'):\n    return f'Hej {namn}!'\n`,
    hints: [
      'Två @app.get-rader ovanför samma funktion.',
      "def hej(namn='du'):",
      "return f'Hej {namn}!'",
    ],
    tests: [
      { description: '/hej', code: "__get('/hej').text", expected: 'Hej du!' },
      {
        description: '/hej/Cia',
        code: "__get('/hej/Cia').text",
        expected: 'Hej Cia!',
      },
    ],
    request: { path: '/hej' },
  },
  {
    id: 'vagar-06',
    track: 'vagar',
    title: 'Numret som inte finns',
    xp: 15,
    description:
      'Hunden med nummer 9 finns inte, och appen kraschar med `IndexError`.',
    explain:
      'Adressen kan innehålla vilket tal som helst. Kolla att talet finns i listan innan du använder det, annars kraschar vägfunktionen och servern svarar 500.\n\nAnropa `/hund/9` med 📮 och läs felet.',
    example: "if nr >= len(lista):\n    return 'Finns inte'",
    task: "Uppgift: Laga `/hund/<int:nr>` så att ett nummer som inte finns svarar `'Ingen hund med det numret'`.",
    starterCode: `${IMPORT}\nhundar = ['Bamse', 'Saga', 'Rufus']\n\n\n@app.get('/hund/<int:nr>')\ndef hund(nr):\n    return hundar[nr]\n`,
    solution: `${IMPORT}\nhundar = ['Bamse', 'Saga', 'Rufus']\n\n\n@app.get('/hund/<int:nr>')\ndef hund(nr):\n    if nr >= len(hundar):\n        return 'Ingen hund med det numret'\n    return hundar[nr]\n`,
    hints: [
      'Läs felet: IndexError.',
      'Kolla nr mot len(hundar) först.',
      "if nr >= len(hundar):\n        return 'Ingen hund med det numret'",
    ],
    tests: [
      {
        description: '/hund/1',
        code: "__get('/hund/1').text",
        expected: 'Saga',
      },
      {
        description: '/hund/9',
        code: "__get('/hund/9').text",
        expected: 'Ingen hund med det numret',
      },
    ],
    request: { path: '/hund/9' },
  },
  {
    id: 'vagar-07',
    track: 'vagar',
    title: 'Fel sorts variabel',
    xp: 15,
    description:
      'Appen kraschar med `TypeError` när någon anropar `/kvadrat/5`.',
    explain:
      "Utan `int:` är `tal` texten `'5'`, och text gånger text går inte. Felet syns först när vägen anropas – därför är det bra att anropa varje väg med 📮.",
    example: "@app.get('/tre-ganger/<int:tal>')",
    task: 'Uppgift: Laga vägen så att `/kvadrat/5` svarar `25`.',
    starterCode: `${IMPORT}\n@app.get('/kvadrat/<tal>')\ndef kvadrat(tal):\n    return str(tal * tal)\n`,
    solution: `${IMPORT}\n@app.get('/kvadrat/<int:tal>')\ndef kvadrat(tal):\n    return str(tal * tal)\n`,
    hints: [
      "Vilken typ har tal? '5' eller 5?",
      'Säg åt Flask att det är ett heltal.',
      "@app.get('/kvadrat/<int:tal>')",
    ],
    tests: [
      {
        description: '/kvadrat/5',
        code: "__get('/kvadrat/5').text",
        expected: '25',
      },
    ],
    request: { path: '/kvadrat/5' },
  },
  {
    id: 'vagar-08',
    track: 'vagar',
    title: 'url_for',
    xp: 15,
    description:
      '`url_for` bygger adressen till en väg utifrån funktionens namn. Då blir länkarna aldrig fel.',
    explain:
      "`url_for('hej', namn='Ada')` ger `'/hej/Ada'`. Byter du adress i `@app.get` följer alla länkar med, för de pekar på funktionen och inte på texten.\n\nAnvänd den när du skriver länkar i HTML.",
    example: "url_for('start')   # '/'\nurl_for('hund', nr=2)   # '/hund/2'",
    task: 'Uppgift: Skapa `/` som svarar med en länk till Ada: `f\'<a href="{url_for("hej", namn="Ada")}">Hälsa på Ada</a>\'`.',
    starterCode: `${IMPORT_URL}\n@app.get('/hej/<namn>')\ndef hej(namn):\n    return f'Hej {namn}!'\n`,
    solution: `${IMPORT_URL}\n@app.get('/hej/<namn>')\ndef hej(namn):\n    return f'Hej {namn}!'\n\n\n@app.get('/')\ndef start():\n    adress = url_for('hej', namn='Ada')\n    return f'<a href=\"{adress}\">Hälsa på Ada</a>'\n`,
    hints: [
      "url_for('hej', namn='Ada') ger adressen.",
      'Spara den i en variabel först.',
      'return f\'<a href="{adress}">Hälsa på Ada</a>\'',
    ],
    tests: [
      {
        description: 'Länken pekar på /hej/Ada',
        code: "__get('/').text",
        expected: '<a href="/hej/Ada">Hälsa på Ada</a>',
      },
    ],
    sourceChecks: [{ description: 'Använder url_for', pattern: /url_for\(/ }],
  },
  {
    id: 'vagar-09',
    track: 'vagar',
    title: 'Decimaltal i adressen',
    xp: 15,
    description: '`<float:pris>` gör om adressen till ett decimaltal.',
    explain:
      '`int:` tar bara heltal, så `/moms/99.5` ger 404 med `int:`. Med `float:` fungerar det.\n\nObservera att `float:` kräver en punkt: `/moms/100` matchar inte. Flask har också `path:`, som tar emot snedstreck.',
    example:
      "@app.get('/halva/<float:x>')\ndef halva(x):\n    return str(x / 2)",
    task: "Uppgift: Skapa `/moms/<float:pris>` som svarar med priset plus 25 % moms med två decimaler: `f'{pris * 1.25:.2f}'`.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n@app.get('/moms/<float:pris>')\ndef moms(pris):\n    return f'{pris * 1.25:.2f}'\n`,
    hints: [
      "@app.get('/moms/<float:pris>')",
      ':.2f ger två decimaler.',
      "return f'{pris * 1.25:.2f}'",
    ],
    tests: [
      {
        description: '/moms/99.5',
        code: "__get('/moms/99.5').text",
        expected: '124.38',
      },
      {
        description: '/moms/abc ger 404',
        code: "__get('/moms/abc').status",
        expected: 404,
      },
    ],
    request: { path: '/moms/99.5' },
  },
];
