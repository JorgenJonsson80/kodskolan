import { projectSteps } from '../../../core/projects';

// Projekt som låses upp när en bana är klar. Eleven väljer ett av tre men
// kan göra alla. Varje projekt byggs i steg, och koden från förra steget
// följer med till nästa. why förklarar varför koden ser ut som den gör.
// request är anropet 📮 börjar med, files mallarna appen har.
const IMPORT = 'from flask import Flask\n\napp = Flask(__name__)\n';

export const PROJECTS = [
  {
    id: 'proj-visitkort',
    track: 'forsta',
    title: 'Ditt visitkort',
    reward: { emoji: '🪪', name: 'Namnbricka' },
    summary: 'En liten sajt om dig själv, med en sida per sak.',
    steps: [
      {
        title: 'Startsidan',
        why: 'Startsidan är adressen /. Den är det första en besökare ser, så den får en rubrik med ditt namn.',
        xp: 15,
        description: 'Visitkortet börjar med en startsida.',
        task: "Uppgift: `/` ska svara med `'<h1>Ada Lovelace</h1>'` (eller ditt eget namn).",
        starterCode: `${IMPORT}\n# Steg 1: startsidan\n`,
        solution: `${IMPORT}\n@app.get('/')\ndef start():\n    return '<h1>Ada Lovelace</h1>'\n`,
        hints: [
          "@app.get('/')",
          'Returnera en h1.',
          "return '<h1>Ada Lovelace</h1>'",
        ],
        tests: [
          {
            description: '/ har en h1',
            code: "__get('/').text.startswith('<h1>')",
            expected: true,
          },
        ],
      },
      {
        title: 'Om mig',
        why: 'En egen väg per sida håller isär innehållet, och adressen säger vad sidan handlar om.',
        xp: 15,
        description: 'En sida om dig.',
        task: 'Uppgift: Lägg till `/om` som svarar med en `<p>` om dig.',
        solution: `${IMPORT}\n@app.get('/')\ndef start():\n    return '<h1>Ada Lovelace</h1>'\n\n\n@app.get('/om')\ndef om():\n    return '<p>Jag skrev världens första program.</p>'\n`,
        hints: [
          "@app.get('/om')",
          'Ett nytt namn på funktionen.',
          "return '<p>…</p>'",
        ],
        tests: [
          {
            description: '/om har en p',
            code: "__get('/om').text.startswith('<p>')",
            expected: true,
          },
        ],
        request: { path: '/om' },
      },
      {
        title: 'Kontakt',
        why: 'Med tre vägar är sajten klar. app.run sist gör att den går att starta på din egen dator.',
        xp: 20,
        description: 'Sist ett sätt att nå dig.',
        task: "Uppgift: Lägg till `/kontakt` med en e-postadress, och `app.run(debug=True)` sist i en `if __name__ == '__main__':`.",
        solution: `${IMPORT}\n@app.get('/')\ndef start():\n    return '<h1>Ada Lovelace</h1>'\n\n\n@app.get('/om')\ndef om():\n    return '<p>Jag skrev världens första program.</p>'\n\n\n@app.get('/kontakt')\ndef kontakt():\n    return 'ada@exempel.se'\n\n\nif __name__ == '__main__':\n    app.run(debug=True)\n`,
        hints: [
          "@app.get('/kontakt')",
          'Texten ska innehålla @.',
          "if __name__ == '__main__':\n    app.run(debug=True)",
        ],
        tests: [
          {
            description: '/kontakt har en e-postadress',
            code: "'@' in __get('/kontakt').text",
            expected: true,
          },
          { description: 'Tre vägar', code: 'len(__vagar())', expected: 3 },
        ],
        sourceChecks: [{ description: 'Har app.run', pattern: /app\.run\(/ }],
        request: { path: '/kontakt' },
      },
    ],
  },
  {
    id: 'proj-raknaren',
    track: 'forsta',
    title: 'Besöksräknaren',
    reward: { emoji: '🧮', name: 'Kulram' },
    summary: 'En sida som räknar sina besökare och kan nollställas.',
    steps: [
      {
        title: 'Räkna',
        why: 'Variabeln utanför funktionen finns kvar mellan anropen. global gör att funktionen får ändra den.',
        xp: 15,
        description: 'Räkna besöken.',
        task: "Uppgift: Skapa `antal = 0` och `/` som ökar `antal` och svarar `f'{antal} besök'`.",
        starterCode: `${IMPORT}\n# Steg 1: räkna\n`,
        solution: `${IMPORT}\nantal = 0\n\n\n@app.get('/')\ndef start():\n    global antal\n    antal += 1\n    return f'{antal} besök'\n`,
        hints: [
          'antal = 0 utanför funktionen.',
          'global antal',
          "antal += 1\n    return f'{antal} besök'",
        ],
        tests: [
          {
            description: 'Två besök',
            code: "(__get('/'), __get('/').text)[-1]",
            expected: '2 besök',
            inputs: [],
          },
        ],
      },
      {
        title: 'Nollställ',
        why: 'Nollställningen är en egen väg. Den ändrar något, men ett riktigt API skulle använda POST för det (bana 5).',
        xp: 15,
        description: 'Ägaren vill kunna börja om.',
        task: "Uppgift: Lägg till `/noll` som sätter `antal` till 0 och svarar `'Nollställd'`.",
        solution: `${IMPORT}\nantal = 0\n\n\n@app.get('/')\ndef start():\n    global antal\n    antal += 1\n    return f'{antal} besök'\n\n\n@app.get('/noll')\ndef noll():\n    global antal\n    antal = 0\n    return 'Nollställd'\n`,
        hints: [
          "@app.get('/noll')",
          'global antal igen.',
          "antal = 0\n    return 'Nollställd'",
        ],
        tests: [
          {
            description: 'Besök, nollställ, besök',
            code: "(__get('/'), __get('/'), __get('/noll'), __get('/').text)[-1]",
            expected: '1 besök',
            inputs: [],
          },
        ],
        request: { path: '/noll' },
      },
      {
        title: 'Som HTML',
        why: 'Samma räknare, men visad som en sida. Det är bara texten i return som ändras.',
        xp: 20,
        description: 'Räknaren ska synas tydligt.',
        task: "Uppgift: Låt `/` svara `f'<h1>{antal}</h1><p>besök</p>'` i stället.",
        solution: `${IMPORT}\nantal = 0\n\n\n@app.get('/')\ndef start():\n    global antal\n    antal += 1\n    return f'<h1>{antal}</h1><p>besök</p>'\n\n\n@app.get('/noll')\ndef noll():\n    global antal\n    antal = 0\n    return 'Nollställd'\n`,
        hints: [
          'Ändra bara return i start.',
          'f-sträng med HTML.',
          "return f'<h1>{antal}</h1><p>besök</p>'",
        ],
        tests: [
          {
            description: 'Första besöket',
            code: "__get('/').text",
            expected: '<h1>1</h1><p>besök</p>',
            inputs: [],
          },
          {
            description: 'Det är HTML',
            code: "__get('/').typ",
            expected: 'text/html',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-dagens',
    track: 'forsta',
    title: 'Dagens lunch',
    reward: { emoji: '🍲', name: 'Soppskål' },
    summary: 'En lunchsajt där menyn ligger i en lista.',
    steps: [
      {
        title: 'Menyn',
        why: 'Rätterna ligger i en lista utanför funktionerna. Då kan flera vägar använda samma data.',
        xp: 15,
        description: 'Veckans luncher.',
        task: "Uppgift: Skapa `luncher = ['Ärtsoppa', 'Pasta', 'Fisk']` och `/` som svarar `', '.join(luncher)`.",
        starterCode: `${IMPORT}\n# Steg 1: menyn\n`,
        solution: `${IMPORT}\nluncher = ['Ärtsoppa', 'Pasta', 'Fisk']\n\n\n@app.get('/')\ndef meny():\n    return ', '.join(luncher)\n`,
        hints: [
          'Listan utanför funktionen.',
          "', '.join(luncher)",
          "return ', '.join(luncher)",
        ],
        tests: [
          {
            description: 'Hela menyn',
            code: "__get('/').text",
            expected: 'Ärtsoppa, Pasta, Fisk',
          },
        ],
      },
      {
        title: 'Som lista',
        why: 'En lista i HTML byggs av en li per rätt. En generator i join gör det på en rad.',
        xp: 20,
        description: 'Menyn ska visas som en punktlista.',
        task: 'Uppgift: Låt `/` svara med en `<ul>` med en `<li>` per lunch.',
        solution: `${IMPORT}\nluncher = ['Ärtsoppa', 'Pasta', 'Fisk']\n\n\n@app.get('/')\ndef meny():\n    rader = ''.join(f'<li>{lunch}</li>' for lunch in luncher)\n    return f'<ul>{rader}</ul>'\n`,
        hints: [
          "''.join(f'<li>{lunch}</li>' for lunch in luncher)",
          'Sätt <ul> runt.',
          "return f'<ul>{rader}</ul>'",
        ],
        tests: [
          {
            description: 'En ul med tre li',
            code: "__get('/').text",
            expected: '<ul><li>Ärtsoppa</li><li>Pasta</li><li>Fisk</li></ul>',
          },
        ],
      },
      {
        title: 'Dagens',
        why: 'Dagens lunch är bara den första i listan. Ändras listan, ändras båda sidorna.',
        xp: 15,
        description: 'En egen sida för dagens lunch.',
        task: "Uppgift: Lägg till `/idag` som svarar `f'Idag: {luncher[0]}'`.",
        solution: `${IMPORT}\nluncher = ['Ärtsoppa', 'Pasta', 'Fisk']\n\n\n@app.get('/')\ndef meny():\n    rader = ''.join(f'<li>{lunch}</li>' for lunch in luncher)\n    return f'<ul>{rader}</ul>'\n\n\n@app.get('/idag')\ndef idag():\n    return f'Idag: {luncher[0]}'\n`,
        hints: [
          "@app.get('/idag')",
          'luncher[0] är den första.',
          "return f'Idag: {luncher[0]}'",
        ],
        tests: [
          {
            description: 'Ärtsoppa idag',
            code: "__get('/idag').text",
            expected: 'Idag: Ärtsoppa',
          },
        ],
        request: { path: '/idag' },
      },
    ],
  },
  {
    id: 'proj-talsajten',
    track: 'vagar',
    title: 'Talsajten',
    reward: { emoji: '🔢', name: 'Siffror' },
    summary: 'En sajt där adressen är ett tal och svaret säger något om det.',
    steps: [
      {
        title: 'Jämnt eller udda',
        why: '<int:tal> gör att adressen bara matchar tal, och att tal redan är ett heltal i funktionen.',
        xp: 15,
        description: 'Skriv ett tal i adressen.',
        task: "Uppgift: Skapa `/<int:tal>` som svarar t.ex. `'4 är jämnt'` eller `'7 är udda'`.",
        starterCode:
          'from flask import Flask\n\napp = Flask(__name__)\n\n# Steg 1: jämnt eller udda\n',
        solution:
          "from flask import Flask\n\napp = Flask(__name__)\n\n@app.get('/<int:tal>')\ndef tal(tal):\n    return f'{tal} är ' + ('jämnt' if tal % 2 == 0 else 'udda')\n",
        hints: [
          "@app.get('/<int:tal>')",
          'tal % 2 == 0 betyder jämnt.',
          "return f'{tal} är ' + ('jämnt' if tal % 2 == 0 else 'udda')",
        ],
        tests: [
          {
            description: '4',
            code: "__get('/4').text",
            expected: '4 är jämnt',
          },
          { description: '7', code: "__get('/7').text", expected: '7 är udda' },
        ],
        request: { path: '/4' },
      },
      {
        title: 'Gångertabellen',
        why: 'join gör om listan med tal till en enda rad text, som ett svar måste vara.',
        xp: 15,
        description: 'Hela gångertabellen för ett tal.',
        task: "Uppgift: Skapa `/tabell/<int:tal>` som svarar med tal·1 till tal·10 med `', '` emellan.",
        solution:
          "from flask import Flask\n\napp = Flask(__name__)\n\n@app.get('/<int:tal>')\ndef tal(tal):\n    return f'{tal} är ' + ('jämnt' if tal % 2 == 0 else 'udda')\n\n\n@app.get('/tabell/<int:tal>')\ndef tabell(tal):\n    return ', '.join(str(tal * i) for i in range(1, 11))\n",
        hints: [
          "@app.get('/tabell/<int:tal>')",
          'str(tal * i) for i in range(1, 11)',
          "return ', '.join(str(tal * i) for i in range(1, 11))",
        ],
        tests: [
          {
            description: 'Tabell 3',
            code: "__get('/tabell/3').text",
            expected: '3, 6, 9, 12, 15, 18, 21, 24, 27, 30',
          },
        ],
        request: { path: '/tabell/3' },
      },
      {
        title: 'Potenser',
        why: 'Två variabler i adressen blir två parametrar. Namnen i adressen och i funktionen måste vara samma.',
        xp: 15,
        description: 'Bas och exponent i adressen.',
        task: 'Uppgift: Skapa `/potens/<int:bas>/<int:exp>` som svarar `bas ** exp`.',
        solution:
          "from flask import Flask\n\napp = Flask(__name__)\n\n@app.get('/<int:tal>')\ndef tal(tal):\n    return f'{tal} är ' + ('jämnt' if tal % 2 == 0 else 'udda')\n\n\n@app.get('/tabell/<int:tal>')\ndef tabell(tal):\n    return ', '.join(str(tal * i) for i in range(1, 11))\n\n\n@app.get('/potens/<int:bas>/<int:exp>')\ndef potens(bas, exp):\n    return str(bas ** exp)\n",
        hints: [
          "@app.get('/potens/<int:bas>/<int:exp>')",
          'bas ** exp',
          'return str(bas ** exp)',
        ],
        tests: [
          {
            description: '2 upphöjt till 10',
            code: "__get('/potens/2/10').text",
            expected: '1024',
          },
        ],
        request: { path: '/potens/2/10' },
      },
    ],
  },
  {
    id: 'proj-ordbok',
    track: 'vagar',
    title: 'Ordboken',
    reward: { emoji: '📙', name: 'Ordbok' },
    summary: 'Översätt ord fram och tillbaka med adressen.',
    steps: [
      {
        title: 'Svenska till engelska',
        why: 'get med ett standardvärde ger ett svar även för ord som saknas, så appen kraschar inte.',
        xp: 15,
        description: 'Slå upp ett svenskt ord.',
        task: "Uppgift: Skapa `/sv/<svenska>` som svarar med det engelska ordet ur `ord`, eller `'Vet inte'`.",
        starterCode:
          "from flask import Flask\n\napp = Flask(__name__)\n\nord = {'hund': 'dog', 'katt': 'cat', 'häst': 'horse'}\n",
        solution:
          "from flask import Flask\n\napp = Flask(__name__)\n\nord = {'hund': 'dog', 'katt': 'cat', 'häst': 'horse'}\n\n\n@app.get('/sv/<svenska>')\ndef till_engelska(svenska):\n    return ord.get(svenska, 'Vet inte')\n",
        hints: [
          "@app.get('/sv/<svenska>')",
          "ord.get(svenska, 'Vet inte')",
          "return ord.get(svenska, 'Vet inte')",
        ],
        tests: [
          {
            description: 'hund',
            code: "__get('/sv/hund').text",
            expected: 'dog',
          },
          {
            description: 'bil',
            code: "__get('/sv/bil').text",
            expected: 'Vet inte',
          },
        ],
        request: { path: '/sv/hund' },
      },
      {
        title: 'Engelska till svenska',
        why: 'Åt andra hållet måste vi leta bland värdena, för en dictionary slår bara upp på nycklar.',
        xp: 15,
        description: 'Och tillbaka.',
        task: 'Uppgift: Skapa `/en/<engelska>` som letar upp det svenska ordet.',
        solution:
          "from flask import Flask\n\napp = Flask(__name__)\n\nord = {'hund': 'dog', 'katt': 'cat', 'häst': 'horse'}\n\n\n@app.get('/sv/<svenska>')\ndef till_engelska(svenska):\n    return ord.get(svenska, 'Vet inte')\n\n\n@app.get('/en/<engelska>')\ndef till_svenska(engelska):\n    for sv, en in ord.items():\n        if en == engelska:\n            return sv\n    return 'Vet inte'\n",
        hints: [
          'for sv, en in ord.items():',
          'if en == engelska: return sv',
          "return 'Vet inte' efter loopen.",
        ],
        tests: [
          {
            description: 'cat',
            code: "__get('/en/cat').text",
            expected: 'katt',
          },
          {
            description: 'car',
            code: "__get('/en/car').text",
            expected: 'Vet inte',
          },
        ],
        request: { path: '/en/cat' },
      },
      {
        title: 'Alla ord',
        why: 'url_for bygger länken från funktionens namn. Byter vi adress på vägen följer länkarna med.',
        xp: 20,
        description: 'En startsida med länkar till alla ord.',
        task: 'Uppgift: Importera `url_for` och låt `/` svara med en länk per svenskt ord till `till_engelska`, med mellanslag emellan.',
        solution:
          "from flask import Flask, url_for\n\napp = Flask(__name__)\n\nord = {'hund': 'dog', 'katt': 'cat', 'häst': 'horse'}\n\n\n@app.get('/sv/<svenska>')\ndef till_engelska(svenska):\n    return ord.get(svenska, 'Vet inte')\n\n\n@app.get('/en/<engelska>')\ndef till_svenska(engelska):\n    for sv, en in ord.items():\n        if en == engelska:\n            return sv\n    return 'Vet inte'\n\n\n@app.get('/')\ndef start():\n    lankar = [f'<a href=\"{url_for(\"till_engelska\", svenska=sv)}\">{sv}</a>' for sv in ord]\n    return ' '.join(lankar)\n",
        hints: [
          'from flask import Flask, url_for',
          "url_for('till_engelska', svenska=sv)",
          "' '.join(lankar)",
        ],
        tests: [
          {
            description: 'Tre länkar',
            code: "__get('/').text.count('<a ')",
            expected: 3,
          },
          {
            description: 'Länken till hund',
            code: "'/sv/hund' in __get('/').text",
            expected: true,
          },
        ],
        sourceChecks: [
          { description: 'Använder url_for', pattern: /url_for\(/ },
        ],
      },
    ],
  },
  {
    id: 'proj-katalog',
    track: 'vagar',
    title: 'Katalogen',
    reward: { emoji: '🗂️', name: 'Register' },
    summary: 'En produktkatalog med nummer och sidor.',
    steps: [
      {
        title: 'Produkt för produkt',
        why: 'Produkterna numreras från 1, som en människa räknar, fast listan börjar på 0.',
        xp: 15,
        description: 'Varje produkt har ett nummer.',
        task: "Uppgift: Skapa `/produkt/<int:nr>` där 1 är första produkten. Nummer utanför listan svarar `'Finns inte'`.",
        starterCode:
          "from flask import Flask\n\napp = Flask(__name__)\n\nprodukter = ['Mössa', 'Vantar', 'Halsduk', 'Sockor', 'Tröja']\n",
        solution:
          "from flask import Flask\n\napp = Flask(__name__)\n\nprodukter = ['Mössa', 'Vantar', 'Halsduk', 'Sockor', 'Tröja']\n\n\n@app.get('/produkt/<int:nr>')\ndef produkt(nr):\n    if nr < 1 or nr > len(produkter):\n        return 'Finns inte'\n    return produkter[nr - 1]\n",
        hints: [
          'produkter[nr - 1]',
          'Kolla nr < 1 or nr > len(produkter).',
          "return 'Finns inte'",
        ],
        tests: [
          {
            description: '1 är Mössa',
            code: "__get('/produkt/1').text",
            expected: 'Mössa',
          },
          {
            description: '6 finns inte',
            code: "__get('/produkt/6').text",
            expected: 'Finns inte',
          },
          {
            description: '0 finns inte',
            code: "__get('/produkt/0').text",
            expected: 'Finns inte',
          },
        ],
        request: { path: '/produkt/1' },
      },
      {
        title: 'Sidor',
        why: 'Två produkter per sida. Slice ger en tom lista utanför listan i stället för att krascha.',
        xp: 20,
        description: 'Katalogen visas två i taget.',
        task: "Uppgift: Skapa `/sida/<int:nr>` som svarar med två produkter med `', '` emellan, eller `'Tom sida'`.",
        solution:
          "from flask import Flask\n\napp = Flask(__name__)\n\nprodukter = ['Mössa', 'Vantar', 'Halsduk', 'Sockor', 'Tröja']\n\n\n@app.get('/produkt/<int:nr>')\ndef produkt(nr):\n    if nr < 1 or nr > len(produkter):\n        return 'Finns inte'\n    return produkter[nr - 1]\n\n\n@app.get('/sida/<int:nr>')\ndef sida(nr):\n    start = (nr - 1) * 2\n    return ', '.join(produkter[start:start + 2]) or 'Tom sida'\n",
        hints: [
          'start = (nr - 1) * 2',
          'produkter[start:start + 2]',
          "', '.join(…) or 'Tom sida'",
        ],
        tests: [
          {
            description: 'Sida 2',
            code: "__get('/sida/2').text",
            expected: 'Halsduk, Sockor',
          },
          {
            description: 'Sida 4',
            code: "__get('/sida/4').text",
            expected: 'Tom sida',
          },
        ],
        request: { path: '/sida/2' },
      },
      {
        title: 'Första sidan',
        why: '/sida utan nummer ska visa första sidan. Två dekoratorer och ett standardvärde gör det utan en till funktion.',
        xp: 15,
        description: 'Utan nummer ska första sidan visas.',
        task: 'Uppgift: Låt `/sida` också gå till `sida`, med `nr=1` som standard.',
        solution:
          "from flask import Flask\n\napp = Flask(__name__)\n\nprodukter = ['Mössa', 'Vantar', 'Halsduk', 'Sockor', 'Tröja']\n\n\n@app.get('/produkt/<int:nr>')\ndef produkt(nr):\n    if nr < 1 or nr > len(produkter):\n        return 'Finns inte'\n    return produkter[nr - 1]\n\n\n@app.get('/sida')\n@app.get('/sida/<int:nr>')\ndef sida(nr=1):\n    start = (nr - 1) * 2\n    return ', '.join(produkter[start:start + 2]) or 'Tom sida'\n",
        hints: [
          "@app.get('/sida') ovanför den andra.",
          'def sida(nr=1):',
          'Resten är som förut.',
        ],
        tests: [
          {
            description: '/sida',
            code: "__get('/sida').text",
            expected: 'Mössa, Vantar',
          },
        ],
        request: { path: '/sida' },
      },
    ],
  },
  {
    id: 'proj-film-api',
    track: 'json',
    title: 'Film-API:t',
    reward: { emoji: '🎞️', name: 'Filmrulle' },
    summary: 'Ett API för svenska filmer.',
    steps: [
      {
        title: 'Alla filmer',
        why: 'Ett API börjar nästan alltid med en väg som ger hela listan.',
        xp: 15,
        description: 'Hela listan.',
        task: 'Uppgift: Skapa `filmer` med de tre filmerna (id, titel, år) och `/filmer` som svarar med listan.',
        starterCode:
          'from flask import Flask\n\napp = Flask(__name__)\n\n# Steg 1: alla filmer\n# Fucking Åmål 1998, Ronja Rövardotter 1984, Jägarna 1996\n',
        solution:
          "from flask import Flask\n\napp = Flask(__name__)\n\nfilmer = [\n    {'id': 1, 'titel': 'Fucking Åmål', 'ar': 1998},\n    {'id': 2, 'titel': 'Ronja Rövardotter', 'ar': 1984},\n    {'id': 3, 'titel': 'Jägarna', 'ar': 1996},\n]\n\n\n@app.get('/filmer')\ndef lista():\n    return filmer\n",
        hints: ['filmer = [ … ]', "@app.get('/filmer')", 'return filmer'],
        tests: [
          {
            description: 'Tre filmer',
            code: "len(__get('/filmer').json)",
            expected: 3,
          },
        ],
        request: { path: '/filmer' },
      },
      {
        title: 'En film',
        why: '404 med ett felmeddelande i JSON gör att appen som frågar kan visa något vettigt.',
        xp: 15,
        description: 'En film med id.',
        task: "Uppgift: Skapa `/filmer/<int:id>` som svarar med filmen eller `{'fel': 'Ingen sådan film'}` med 404.",
        solution:
          "from flask import Flask\n\napp = Flask(__name__)\n\nfilmer = [\n    {'id': 1, 'titel': 'Fucking Åmål', 'ar': 1998},\n    {'id': 2, 'titel': 'Ronja Rövardotter', 'ar': 1984},\n    {'id': 3, 'titel': 'Jägarna', 'ar': 1996},\n]\n\n\n@app.get('/filmer')\ndef lista():\n    return filmer\n\n\n@app.get('/filmer/<int:id>')\ndef film(id):\n    for film in filmer:\n        if film['id'] == id:\n            return film\n    return {'fel': 'Ingen sådan film'}, 404\n",
        hints: [
          "@app.get('/filmer/<int:id>')",
          'Loopa och returnera filmen.',
          "return {'fel': 'Ingen sådan film'}, 404",
        ],
        tests: [
          {
            description: 'Film 3',
            code: "__get('/filmer/3').json['titel']",
            expected: 'Jägarna',
          },
          {
            description: 'Film 9',
            code: "__get('/filmer/9').status",
            expected: 404,
          },
        ],
        request: { path: '/filmer/3' },
      },
      {
        title: 'Per decennium',
        why: 'Ett filter i adressen är vanligt i API:er. En tom lista betyder att inga filmer fanns.',
        xp: 20,
        description: 'Filmerna från ett årtionde.',
        task: 'Uppgift: Skapa `/decennium/<int:ar>` som svarar med titlarna från `ar` till `ar + 9`.',
        solution:
          "from flask import Flask\n\napp = Flask(__name__)\n\nfilmer = [\n    {'id': 1, 'titel': 'Fucking Åmål', 'ar': 1998},\n    {'id': 2, 'titel': 'Ronja Rövardotter', 'ar': 1984},\n    {'id': 3, 'titel': 'Jägarna', 'ar': 1996},\n]\n\n\n@app.get('/filmer')\ndef lista():\n    return filmer\n\n\n@app.get('/filmer/<int:id>')\ndef film(id):\n    for film in filmer:\n        if film['id'] == id:\n            return film\n    return {'fel': 'Ingen sådan film'}, 404\n\n\n@app.get('/decennium/<int:ar>')\ndef decennium(ar):\n    return [f['titel'] for f in filmer if ar <= f['ar'] < ar + 10]\n",
        hints: [
          "@app.get('/decennium/<int:ar>')",
          "ar <= f['ar'] < ar + 10",
          "return [f['titel'] for f in filmer if ar <= f['ar'] < ar + 10]",
        ],
        tests: [
          {
            description: '90-talet',
            code: "__get('/decennium/1990').json",
            expected: ['Fucking Åmål', 'Jägarna'],
          },
        ],
        request: { path: '/decennium/1990' },
      },
    ],
  },
  {
    id: 'proj-quiz-api',
    track: 'json',
    title: 'Quiz-API:t',
    reward: { emoji: '❔', name: 'Frågetecken' },
    summary: 'Ett API som ställer frågor och rättar svaren.',
    steps: [
      {
        title: 'Frågorna',
        why: 'Svaren skickas inte med – då skulle vem som helst kunna fuska genom att läsa API:t.',
        xp: 15,
        description: 'Lista frågorna, utan svaren.',
        task: "Uppgift: `/fragor` ska svara med en lista med `{'nr': …, 'fraga': …}`, utan svaren.",
        starterCode:
          "from flask import Flask\n\napp = Flask(__name__)\n\nfragor = [\n    {'fraga': 'Vad är 2 + 2?', 'svar': '4'},\n    {'fraga': 'Huvudstad i Norge?', 'svar': 'Oslo'},\n]\n",
        solution:
          "from flask import Flask\n\napp = Flask(__name__)\n\nfragor = [\n    {'fraga': 'Vad är 2 + 2?', 'svar': '4'},\n    {'fraga': 'Huvudstad i Norge?', 'svar': 'Oslo'},\n]\n\n\n@app.get('/fragor')\ndef alla():\n    return [{'nr': i, 'fraga': f['fraga']} for i, f in enumerate(fragor)]\n",
        hints: [
          'enumerate(fragor) ger nr och fråga.',
          "{'nr': i, 'fraga': f['fraga']}",
          "return [{'nr': i, 'fraga': f['fraga']} for i, f in enumerate(fragor)]",
        ],
        tests: [
          {
            description: 'Fråga 1',
            code: "__get('/fragor').json[1]",
            expected: { nr: 1, fraga: 'Huvudstad i Norge?' },
          },
          {
            description: 'Inga svar',
            code: "'svar' in __get('/fragor').json[0]",
            expected: false,
          },
        ],
        request: { path: '/fragor' },
      },
      {
        title: 'Rätta',
        why: 'Svaret jämförs med små bokstäver, så att "oslo" och "Oslo" båda räknas.',
        xp: 20,
        description: 'Rätta ett svar.',
        task: "Uppgift: Skapa `/fragor/<int:nr>/<svar>` som svarar `{'ratt': True}` eller `{'ratt': False}`, och 404 för en fråga som inte finns.",
        solution:
          "from flask import Flask\n\napp = Flask(__name__)\n\nfragor = [\n    {'fraga': 'Vad är 2 + 2?', 'svar': '4'},\n    {'fraga': 'Huvudstad i Norge?', 'svar': 'Oslo'},\n]\n\n\n@app.get('/fragor')\ndef alla():\n    return [{'nr': i, 'fraga': f['fraga']} for i, f in enumerate(fragor)]\n\n\n@app.get('/fragor/<int:nr>/<svar>')\ndef svara(nr, svar):\n    if nr >= len(fragor):\n        return {'fel': 'Ingen sådan fråga'}, 404\n    return {'ratt': svar.lower() == fragor[nr]['svar'].lower()}\n",
        hints: [
          "@app.get('/fragor/<int:nr>/<svar>')",
          "svar.lower() == fragor[nr]['svar'].lower()",
          "return {'ratt': …}",
        ],
        tests: [
          {
            description: 'oslo är rätt',
            code: "__get('/fragor/1/oslo').json",
            expected: { ratt: true },
          },
          {
            description: '5 är fel',
            code: "__get('/fragor/0/5').json",
            expected: { ratt: false },
          },
          {
            description: 'Fråga 7',
            code: "__get('/fragor/7/x').status",
            expected: 404,
          },
        ],
        request: { path: '/fragor/1/oslo' },
      },
      {
        title: 'Antal',
        why: 'En liten väg som berättar hur stort quizet är, så att appen vet när det är slut.',
        xp: 10,
        description: 'Hur många frågor finns det?',
        task: "Uppgift: Skapa `/antal` som svarar `{'antal': 2}`.",
        solution:
          "from flask import Flask\n\napp = Flask(__name__)\n\nfragor = [\n    {'fraga': 'Vad är 2 + 2?', 'svar': '4'},\n    {'fraga': 'Huvudstad i Norge?', 'svar': 'Oslo'},\n]\n\n\n@app.get('/fragor')\ndef alla():\n    return [{'nr': i, 'fraga': f['fraga']} for i, f in enumerate(fragor)]\n\n\n@app.get('/fragor/<int:nr>/<svar>')\ndef svara(nr, svar):\n    if nr >= len(fragor):\n        return {'fel': 'Ingen sådan fråga'}, 404\n    return {'ratt': svar.lower() == fragor[nr]['svar'].lower()}\n\n\n@app.get('/antal')\ndef antal():\n    return {'antal': len(fragor)}\n",
        hints: [
          "@app.get('/antal')",
          'len(fragor)',
          "return {'antal': len(fragor)}",
        ],
        tests: [
          {
            description: 'Två',
            code: "__get('/antal').json",
            expected: { antal: 2 },
          },
        ],
        request: { path: '/antal' },
      },
    ],
  },
  {
    id: 'proj-lager-api',
    track: 'json',
    title: 'Lager-API:t',
    reward: { emoji: '🏬', name: 'Varuhus' },
    summary: 'Hur mycket finns i lagret?',
    steps: [
      {
        title: 'Hela lagret',
        why: 'En dictionary blir ett JSON-objekt med varorna som nycklar.',
        xp: 15,
        description: 'Visa hela lagret.',
        task: 'Uppgift: `/lager` ska svara med `lager`.',
        starterCode:
          "from flask import Flask\n\napp = Flask(__name__)\n\nlager = {'mössa': 4, 'vantar': 0, 'halsduk': 7}\n",
        solution:
          "from flask import Flask\n\napp = Flask(__name__)\n\nlager = {'mössa': 4, 'vantar': 0, 'halsduk': 7}\n\n\n@app.get('/lager')\ndef allt():\n    return lager\n",
        hints: ["@app.get('/lager')", 'Returnera dictionaryn.', 'return lager'],
        tests: [
          {
            description: 'Lagret',
            code: "__get('/lager').json",
            expected: { mössa: 4, vantar: 0, halsduk: 7 },
          },
        ],
        request: { path: '/lager' },
      },
      {
        title: 'En vara',
        why: 'finns räknas ut, så att appen som frågar slipper göra det själv.',
        xp: 15,
        description: 'En vara i taget.',
        task: "Uppgift: `/lager/<vara>` svarar `{'vara': …, 'antal': …, 'finns': …}`, eller `{'fel': 'Okänd vara'}` med 404.",
        solution:
          "from flask import Flask\n\napp = Flask(__name__)\n\nlager = {'mössa': 4, 'vantar': 0, 'halsduk': 7}\n\n\n@app.get('/lager')\ndef allt():\n    return lager\n\n\n@app.get('/lager/<vara>')\ndef en(vara):\n    if vara not in lager:\n        return {'fel': 'Okänd vara'}, 404\n    return {'vara': vara, 'antal': lager[vara], 'finns': lager[vara] > 0}\n",
        hints: [
          'if vara not in lager:',
          "'finns': lager[vara] > 0",
          "return {'fel': 'Okänd vara'}, 404",
        ],
        tests: [
          {
            description: 'Vantar',
            code: "__get('/lager/vantar').json",
            expected: { vara: 'vantar', antal: 0, finns: false },
          },
          {
            description: 'Keps',
            code: "__get('/lager/keps').status",
            expected: 404,
          },
        ],
        request: { path: '/lager/vantar' },
      },
      {
        title: 'Slut',
        why: 'En sorterad lista ger samma svar varje gång, vilket gör API:t lätt att testa.',
        xp: 15,
        description: 'Vad behöver beställas?',
        task: 'Uppgift: `/slut` svarar med de varor som har 0 kvar, i bokstavsordning.',
        solution:
          "from flask import Flask\n\napp = Flask(__name__)\n\nlager = {'mössa': 4, 'vantar': 0, 'halsduk': 7}\n\n\n@app.get('/lager')\ndef allt():\n    return lager\n\n\n@app.get('/lager/<vara>')\ndef en(vara):\n    if vara not in lager:\n        return {'fel': 'Okänd vara'}, 404\n    return {'vara': vara, 'antal': lager[vara], 'finns': lager[vara] > 0}\n\n\n@app.get('/slut')\ndef slut():\n    return sorted(vara for vara, antal in lager.items() if antal == 0)\n",
        hints: [
          'lager.items()',
          'if antal == 0',
          'return sorted(vara for vara, antal in lager.items() if antal == 0)',
        ],
        tests: [
          {
            description: 'Vantar',
            code: "__get('/slut').json",
            expected: ['vantar'],
          },
        ],
        request: { path: '/slut' },
      },
    ],
  },
  {
    id: 'proj-bokhandel',
    track: 'fragor',
    title: 'Bokhandelns sök',
    reward: { emoji: '📚', name: 'Bokhög' },
    summary: 'Sök bland böckerna på författare och pris.',
    steps: [
      {
        title: 'Författare',
        why: 'None betyder att frågan saknas. Då kommer alla böcker med.',
        xp: 15,
        description: 'Sök på författare.',
        task: 'Uppgift: Skapa `/bocker` som svarar med titlarna, bara för `?forfattare=` om den finns.',
        starterCode:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\nbocker = [\n    {'titel': 'Mio min Mio', 'forfattare': 'Lindgren', 'pris': 129},\n    {'titel': 'Ronja Rövardotter', 'forfattare': 'Lindgren', 'pris': 149},\n    {'titel': 'Mumintrollet', 'forfattare': 'Jansson', 'pris': 99},\n    {'titel': 'Röda rummet', 'forfattare': 'Strindberg', 'pris': 79},\n]\n",
        solution:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\nbocker = [\n    {'titel': 'Mio min Mio', 'forfattare': 'Lindgren', 'pris': 129},\n    {'titel': 'Ronja Rövardotter', 'forfattare': 'Lindgren', 'pris': 149},\n    {'titel': 'Mumintrollet', 'forfattare': 'Jansson', 'pris': 99},\n    {'titel': 'Röda rummet', 'forfattare': 'Strindberg', 'pris': 79},\n]\n\n\n@app.get('/bocker')\ndef sok():\n    forfattare = request.args.get('forfattare')\n    urval = [b for b in bocker if forfattare is None or b['forfattare'] == forfattare]\n    return [b['titel'] for b in urval]\n",
        hints: [
          "forfattare = request.args.get('forfattare')",
          "forfattare is None or b['forfattare'] == forfattare",
          "return [b['titel'] for b in urval]",
        ],
        tests: [
          {
            description: 'Lindgren',
            code: "__get('/bocker?forfattare=Lindgren').json",
            expected: ['Mio min Mio', 'Ronja Rövardotter'],
          },
          {
            description: 'Alla',
            code: "len(__get('/bocker').json)",
            expected: 4,
          },
        ],
        request: { path: '/bocker?forfattare=Lindgren' },
      },
      {
        title: 'Maxpris',
        why: 'type=int gör om priset till ett tal. Ett stort standardvärde gör att alla böcker kommer med när frågan saknas.',
        xp: 15,
        description: 'Inget dyrare än …',
        task: 'Uppgift: Lägg till `?maxpris=` (heltal) så att bara böcker som kostar högst så mycket kommer med.',
        solution:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\nbocker = [\n    {'titel': 'Mio min Mio', 'forfattare': 'Lindgren', 'pris': 129},\n    {'titel': 'Ronja Rövardotter', 'forfattare': 'Lindgren', 'pris': 149},\n    {'titel': 'Mumintrollet', 'forfattare': 'Jansson', 'pris': 99},\n    {'titel': 'Röda rummet', 'forfattare': 'Strindberg', 'pris': 79},\n]\n\n\n@app.get('/bocker')\ndef sok():\n    forfattare = request.args.get('forfattare')\n    maxpris = request.args.get('maxpris', 10000, type=int)\n    urval = [b for b in bocker if (forfattare is None or b['forfattare'] == forfattare) and b['pris'] <= maxpris]\n    return [b['titel'] for b in urval]\n",
        hints: [
          "request.args.get('maxpris', 10000, type=int)",
          "and b['pris'] <= maxpris",
          'Båda villkoren i samma comprehension.',
        ],
        tests: [
          {
            description: 'Under 100',
            code: "__get('/bocker?maxpris=100').json",
            expected: ['Mumintrollet', 'Röda rummet'],
          },
          {
            description: 'Lindgren under 140',
            code: "__get('/bocker?forfattare=Lindgren&maxpris=140').json",
            expected: ['Mio min Mio'],
          },
        ],
        request: { path: '/bocker?maxpris=100' },
      },
      {
        title: 'Sortering',
        why: '400 säger att anropet är fel, och felmeddelandet säger vad som är tillåtet.',
        xp: 20,
        description: 'Sortera på titel eller pris.',
        task: "Uppgift: Lägg till `?sortera=` (`'titel'` som standard, eller `'pris'`). Annat ger `{'fel': 'Sortera på titel eller pris'}` med 400.",
        solution:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\nbocker = [\n    {'titel': 'Mio min Mio', 'forfattare': 'Lindgren', 'pris': 129},\n    {'titel': 'Ronja Rövardotter', 'forfattare': 'Lindgren', 'pris': 149},\n    {'titel': 'Mumintrollet', 'forfattare': 'Jansson', 'pris': 99},\n    {'titel': 'Röda rummet', 'forfattare': 'Strindberg', 'pris': 79},\n]\n\n\n@app.get('/bocker')\ndef sok():\n    forfattare = request.args.get('forfattare')\n    maxpris = request.args.get('maxpris', 10000, type=int)\n    urval = [b for b in bocker if (forfattare is None or b['forfattare'] == forfattare) and b['pris'] <= maxpris]\n    falt = request.args.get('sortera', 'titel')\n    if falt not in ('titel', 'pris'):\n        return {'fel': 'Sortera på titel eller pris'}, 400\n    return [b['titel'] for b in sorted(urval, key=lambda b: b[falt])]\n",
        hints: [
          "falt = request.args.get('sortera', 'titel')",
          "if falt not in ('titel', 'pris'):",
          'sorted(urval, key=lambda b: b[falt])',
        ],
        tests: [
          {
            description: 'Efter pris',
            code: "__get('/bocker?sortera=pris').json",
            expected: [
              'Röda rummet',
              'Mumintrollet',
              'Mio min Mio',
              'Ronja Rövardotter',
            ],
          },
          {
            description: 'Efter år',
            code: "__get('/bocker?sortera=ar').status",
            expected: 400,
          },
        ],
        request: { path: '/bocker?sortera=pris' },
      },
    ],
  },
  {
    id: 'proj-receptsok',
    track: 'fragor',
    title: 'Receptsöket',
    reward: { emoji: '🥞', name: 'Pannkaka' },
    summary: 'Hitta recept på det som finns i kylen.',
    steps: [
      {
        title: 'Ingrediens',
        why: 'in kollar om ingrediensen finns i receptets lista.',
        xp: 15,
        description: 'Vad kan jag laga med ägg?',
        task: 'Uppgift: Skapa `/recept` som svarar med namnen på recepten som har `?ingrediens=`, eller alla.',
        starterCode:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\nrecept = [\n    {'namn': 'Pannkakor', 'ingredienser': ['mjöl', 'mjölk', 'ägg'], 'vego': True},\n    {'namn': 'Köttbullar', 'ingredienser': ['färs', 'ägg', 'lök'], 'vego': False},\n    {'namn': 'Tomatsoppa', 'ingredienser': ['tomat', 'lök'], 'vego': True},\n]\n",
        solution:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\nrecept = [\n    {'namn': 'Pannkakor', 'ingredienser': ['mjöl', 'mjölk', 'ägg'], 'vego': True},\n    {'namn': 'Köttbullar', 'ingredienser': ['färs', 'ägg', 'lök'], 'vego': False},\n    {'namn': 'Tomatsoppa', 'ingredienser': ['tomat', 'lök'], 'vego': True},\n]\n\n\n@app.get('/recept')\ndef sok():\n    ingrediens = request.args.get('ingrediens')\n    urval = [r for r in recept if ingrediens is None or ingrediens in r['ingredienser']]\n    return [r['namn'] for r in urval]\n",
        hints: [
          "request.args.get('ingrediens')",
          "ingrediens in r['ingredienser']",
          "return [r['namn'] for r in urval]",
        ],
        tests: [
          {
            description: 'Ägg',
            code: "__get('/recept?ingrediens=ägg').json",
            expected: ['Pannkakor', 'Köttbullar'],
          },
          {
            description: 'Alla',
            code: "len(__get('/recept').json)",
            expected: 3,
          },
        ],
        request: { path: '/recept?ingrediens=lök' },
      },
      {
        title: 'Vegetariskt',
        why: '?vego=1 är ett vanligt sätt att skicka sant eller falskt i en adress.',
        xp: 15,
        description: 'Bara vegetariskt.',
        task: 'Uppgift: Med `?vego=1` ska bara vegetariska recept komma med.',
        solution:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\nrecept = [\n    {'namn': 'Pannkakor', 'ingredienser': ['mjöl', 'mjölk', 'ägg'], 'vego': True},\n    {'namn': 'Köttbullar', 'ingredienser': ['färs', 'ägg', 'lök'], 'vego': False},\n    {'namn': 'Tomatsoppa', 'ingredienser': ['tomat', 'lök'], 'vego': True},\n]\n\n\n@app.get('/recept')\ndef sok():\n    ingrediens = request.args.get('ingrediens')\n    urval = [r for r in recept if ingrediens is None or ingrediens in r['ingredienser']]\n    if request.args.get('vego', 0, type=int) == 1:\n        urval = [r for r in urval if r['vego']]\n    return [r['namn'] for r in urval]\n",
        hints: [
          "request.args.get('vego', 0, type=int)",
          '== 1',
          "urval = [r for r in urval if r['vego']]",
        ],
        tests: [
          {
            description: 'Lök och vego',
            code: "__get('/recept?ingrediens=lök&vego=1').json",
            expected: ['Tomatsoppa'],
          },
        ],
        request: { path: '/recept?vego=1' },
      },
      {
        title: 'Antal',
        why: 'antal räknas ut efter filtren, så standardvärdet är så många som blev kvar.',
        xp: 15,
        description: 'Bara några förslag.',
        task: 'Uppgift: Lägg till `?antal=` som begränsar svaret.',
        solution:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\nrecept = [\n    {'namn': 'Pannkakor', 'ingredienser': ['mjöl', 'mjölk', 'ägg'], 'vego': True},\n    {'namn': 'Köttbullar', 'ingredienser': ['färs', 'ägg', 'lök'], 'vego': False},\n    {'namn': 'Tomatsoppa', 'ingredienser': ['tomat', 'lök'], 'vego': True},\n]\n\n\n@app.get('/recept')\ndef sok():\n    ingrediens = request.args.get('ingrediens')\n    urval = [r for r in recept if ingrediens is None or ingrediens in r['ingredienser']]\n    if request.args.get('vego', 0, type=int) == 1:\n        urval = [r for r in urval if r['vego']]\n    antal = request.args.get('antal', len(urval), type=int)\n    return [r['namn'] for r in urval[:antal]]\n",
        hints: [
          "request.args.get('antal', len(urval), type=int)",
          'urval[:antal]',
          "return [r['namn'] for r in urval[:antal]]",
        ],
        tests: [
          {
            description: 'Ett',
            code: "__get('/recept?antal=1').json",
            expected: ['Pannkakor'],
          },
        ],
        request: { path: '/recept?antal=2' },
      },
    ],
  },
  {
    id: 'proj-sidnumrering',
    track: 'fragor',
    title: 'Sidnumreringen',
    reward: { emoji: '📄', name: 'Pappersark' },
    summary: 'Dela upp en lång lista i sidor, som riktiga API:er gör.',
    steps: [
      {
        title: 'En sida',
        why: '?sida=2&storlek=10 är så nästan alla API:er delar upp stora listor.',
        xp: 15,
        description: 'Talen 1–50, en sida i taget.',
        task: 'Uppgift: Skapa `/tal` med `?sida=` (standard 1) och `?storlek=` (standard 10) som svarar med talen på sidan.',
        starterCode:
          'from flask import Flask, request\n\napp = Flask(__name__)\n\ntal = list(range(1, 51))\n',
        solution:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\ntal = list(range(1, 51))\n\n\n@app.get('/tal')\ndef sida():\n    nr = request.args.get('sida', 1, type=int)\n    storlek = request.args.get('storlek', 10, type=int)\n    start = (nr - 1) * storlek\n    return tal[start:start + storlek]\n",
        hints: [
          "request.args.get('sida', 1, type=int)",
          'start = (nr - 1) * storlek',
          'return tal[start:start + storlek]',
        ],
        tests: [
          {
            description: 'Sida 2',
            code: "__get('/tal?sida=2&storlek=5').json",
            expected: [6, 7, 8, 9, 10],
          },
          {
            description: 'Standard',
            code: "__get('/tal').json",
            expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          },
        ],
        request: { path: '/tal?sida=2&storlek=5' },
      },
      {
        title: 'Hur många sidor?',
        why: 'Med antalet sidor i svaret vet appen när den ska sluta visa en Nästa-knapp.',
        xp: 15,
        description: 'Svaret säger också hur många sidor det finns.',
        task: "Uppgift: Svara med `{'sida': …, 'av': …, 'tal': […]}`.",
        solution:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\ntal = list(range(1, 51))\n\n\n@app.get('/tal')\ndef sida():\n    nr = request.args.get('sida', 1, type=int)\n    storlek = request.args.get('storlek', 10, type=int)\n    start = (nr - 1) * storlek\n    antal_sidor = (len(tal) + storlek - 1) // storlek\n    return {'sida': nr, 'av': antal_sidor, 'tal': tal[start:start + storlek]}\n",
        hints: [
          '(len(tal) + storlek - 1) // storlek avrundar uppåt.',
          "{'sida': nr, 'av': antal_sidor, 'tal': …}",
          'Returnera dictionaryn.',
        ],
        tests: [
          {
            description: 'Sida 1 av 7',
            code: "__get('/tal?storlek=8').json['av']",
            expected: 7,
          },
        ],
        request: { path: '/tal?storlek=8' },
      },
      {
        title: 'Ogiltig sida',
        why: 'Sidan 0 eller storleken 0 är ett fel i anropet, inte i appen. Därför 400.',
        xp: 15,
        description: 'Sidan 0 finns inte.',
        task: "Uppgift: `sida` eller `storlek` under 1 ger `{'fel': 'sida och storlek ska vara minst 1'}` med 400.",
        solution:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\ntal = list(range(1, 51))\n\n\n@app.get('/tal')\ndef sida():\n    nr = request.args.get('sida', 1, type=int)\n    storlek = request.args.get('storlek', 10, type=int)\n    if nr < 1 or storlek < 1:\n        return {'fel': 'sida och storlek ska vara minst 1'}, 400\n    start = (nr - 1) * storlek\n    antal_sidor = (len(tal) + storlek - 1) // storlek\n    return {'sida': nr, 'av': antal_sidor, 'tal': tal[start:start + storlek]}\n",
        hints: [
          'Kolla innan du räknar.',
          'if nr < 1 or storlek < 1:',
          "return {'fel': …}, 400",
        ],
        tests: [
          {
            description: 'Sida 0',
            code: "__get('/tal?sida=0').status",
            expected: 400,
          },
          {
            description: 'Storlek 0',
            code: "__get('/tal?storlek=0').status",
            expected: 400,
          },
        ],
        request: { path: '/tal?sida=0' },
      },
    ],
  },
  {
    id: 'proj-gastbok',
    track: 'skicka',
    title: 'Gästboken',
    reward: { emoji: '📖', name: 'Gästbok' },
    summary: 'En gästbok där besökare lämnar ett meddelande.',
    steps: [
      {
        title: 'Skriv',
        why: 'POST skapar något nytt, och 201 med det nya inlägget säger att det gick.',
        xp: 15,
        description: 'Lämna ett inlägg.',
        task: "Uppgift: Skapa `@app.post('/inlagg')` som sparar `{'id', 'namn', 'text'}` och svarar med det och 201.",
        starterCode:
          'from flask import Flask, request\n\napp = Flask(__name__)\n\ninlagg = []\n',
        solution:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\ninlagg = []\n\n\n@app.post('/inlagg')\ndef skriv():\n    data = request.get_json()\n    nytt = {'id': len(inlagg) + 1, 'namn': data['namn'], 'text': data['text']}\n    inlagg.append(nytt)\n    return nytt, 201\n",
        hints: [
          'data = request.get_json()',
          "nytt = {'id': len(inlagg) + 1, 'namn': data['namn'], 'text': data['text']}",
          'inlagg.append(nytt)\n    return nytt, 201',
        ],
        tests: [
          {
            description: 'Ett inlägg',
            code: "__post('/inlagg', {'namn': 'Ada', 'text': 'Hej!'}).json",
            expected: { id: 1, namn: 'Ada', text: 'Hej!' },
            inputs: [],
          },
        ],
        request: {
          method: 'POST',
          path: '/inlagg',
          body: '{"namn": "Ada", "text": "Hej!"}',
        },
      },
      {
        title: 'Läs',
        why: 'Samma adress med GET läser det som POST har sparat.',
        xp: 15,
        description: 'Visa alla inlägg.',
        task: "Uppgift: Skapa `@app.get('/inlagg')`.",
        solution:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\ninlagg = []\n\n\n@app.post('/inlagg')\ndef skriv():\n    data = request.get_json()\n    nytt = {'id': len(inlagg) + 1, 'namn': data['namn'], 'text': data['text']}\n    inlagg.append(nytt)\n    return nytt, 201\n\n\n@app.get('/inlagg')\ndef las():\n    return inlagg\n",
        hints: ["@app.get('/inlagg')", 'Returnera listan.', 'return inlagg'],
        tests: [
          {
            description: 'Skriv och läs',
            code: "(__post('/inlagg', {'namn': 'Bo', 'text': 'Kul'}), len(__get('/inlagg').json))[-1]",
            expected: 1,
            inputs: [],
          },
        ],
        request: { path: '/inlagg' },
      },
      {
        title: 'Max 140 tecken',
        why: 'En gräns gör att ingen kan fylla gästboken med en roman. Kontrollen sker innan något sparas.',
        xp: 20,
        description: 'Inlägg ska vara korta.',
        task: "Uppgift: En text som saknas, är tom eller längre än 140 tecken ger `{'fel': 'text ska vara 1–140 tecken'}` med 400.",
        solution:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\ninlagg = []\n\n\n@app.post('/inlagg')\ndef skriv():\n    data = request.get_json()\n    text = data.get('text', '')\n    if not text or len(text) > 140:\n        return {'fel': 'text ska vara 1–140 tecken'}, 400\n    nytt = {'id': len(inlagg) + 1, 'namn': data['namn'], 'text': data['text']}\n    inlagg.append(nytt)\n    return nytt, 201\n\n\n@app.get('/inlagg')\ndef las():\n    return inlagg\n",
        hints: [
          "text = data.get('text', '')",
          'if not text or len(text) > 140:',
          "return {'fel': 'text ska vara 1–140 tecken'}, 400",
        ],
        tests: [
          {
            description: 'För långt',
            code: "__post('/inlagg', {'namn': 'A', 'text': 'x' * 141}).status",
            expected: 400,
            inputs: [],
          },
          {
            description: 'Tomt',
            code: "__post('/inlagg', {'namn': 'A', 'text': ''}).status",
            expected: 400,
            inputs: [],
          },
          {
            description: 'Inget sparas',
            code: "(__post('/inlagg', {'namn': 'A'}), len(inlagg))[-1]",
            expected: 0,
            inputs: [],
          },
        ],
        request: {
          method: 'POST',
          path: '/inlagg',
          body: '{"namn": "Ada", "text": ""}',
        },
      },
    ],
  },
  {
    id: 'proj-omrostning',
    track: 'skicka',
    title: 'Omröstningen',
    reward: { emoji: '🗳️', name: 'Valurna' },
    summary: 'Rösta på kaféets nya dryck.',
    steps: [
      {
        title: 'Rösta',
        why: 'Bara de tre alternativen räknas. Ett okänt val är ett fel i anropet, så 400.',
        xp: 15,
        description: 'Ta emot en röst.',
        task: "Uppgift: Skapa `@app.post('/rosta')` som tar `{'val': 'te'}`, räknar rösten och svarar `{'tack': 'te'}`. Okända val ger `{'fel': 'Okänt val'}` med 400.",
        starterCode:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\nroster = {'kaffe': 0, 'te': 0, 'choklad': 0}\n",
        solution:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\nroster = {'kaffe': 0, 'te': 0, 'choklad': 0}\n\n\n@app.post('/rosta')\ndef rosta():\n    val = request.get_json().get('val')\n    if val not in roster:\n        return {'fel': 'Okänt val'}, 400\n    roster[val] += 1\n    return {'tack': val}\n",
        hints: [
          "val = request.get_json().get('val')",
          'if val not in roster:',
          'roster[val] += 1',
        ],
        tests: [
          {
            description: 'En röst',
            code: "__post('/rosta', {'val': 'te'}).json",
            expected: { tack: 'te' },
            inputs: [],
          },
          {
            description: 'Okänt',
            code: "__post('/rosta', {'val': 'öl'}).status",
            expected: 400,
            inputs: [],
          },
        ],
        request: { method: 'POST', path: '/rosta', body: '{"val": "te"}' },
      },
      {
        title: 'Resultatet',
        why: 'GET läser det POST har ändrat. Rösterna finns kvar så länge appen kör.',
        xp: 10,
        description: 'Visa rösterna.',
        task: "Uppgift: Skapa `@app.get('/resultat')`.",
        solution:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\nroster = {'kaffe': 0, 'te': 0, 'choklad': 0}\n\n\n@app.post('/rosta')\ndef rosta():\n    val = request.get_json().get('val')\n    if val not in roster:\n        return {'fel': 'Okänt val'}, 400\n    roster[val] += 1\n    return {'tack': val}\n\n\n@app.get('/resultat')\ndef resultat():\n    return roster\n",
        hints: ["@app.get('/resultat')", 'Returnera roster.', 'return roster'],
        tests: [
          {
            description: 'Två för te',
            code: "(__post('/rosta', {'val': 'te'}), __post('/rosta', {'val': 'te'}), __get('/resultat').json['te'])[-1]",
            expected: 2,
            inputs: [],
          },
        ],
        request: { path: '/resultat' },
      },
      {
        title: 'Vinnaren',
        why: 'max med key=roster.get ger nyckeln med flest röster.',
        xp: 15,
        description: 'Vem leder?',
        task: "Uppgift: Skapa `@app.get('/vinnare')` som svarar `{'vinnare': …}`.",
        solution:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\nroster = {'kaffe': 0, 'te': 0, 'choklad': 0}\n\n\n@app.post('/rosta')\ndef rosta():\n    val = request.get_json().get('val')\n    if val not in roster:\n        return {'fel': 'Okänt val'}, 400\n    roster[val] += 1\n    return {'tack': val}\n\n\n@app.get('/resultat')\ndef resultat():\n    return roster\n\n\n@app.get('/vinnare')\ndef vinnare():\n    return {'vinnare': max(roster, key=roster.get)}\n",
        hints: [
          'max(roster, key=roster.get)',
          "@app.get('/vinnare')",
          "return {'vinnare': max(roster, key=roster.get)}",
        ],
        tests: [
          {
            description: 'Choklad vinner',
            code: "(__post('/rosta', {'val': 'choklad'}), __get('/vinnare').json)[-1]",
            expected: { vinnare: 'choklad' },
            inputs: [],
          },
        ],
        request: { path: '/vinnare' },
      },
    ],
  },
  {
    id: 'proj-attgora',
    track: 'skicka',
    title: 'Att göra-listan',
    reward: { emoji: '✅', name: 'Bock' },
    summary: 'Ett API för en att göra-lista.',
    steps: [
      {
        title: 'Ny uppgift',
        why: 'Den nya uppgiften är aldrig klar, så klar sätts av appen och inte av den som skickar.',
        xp: 15,
        description: 'Lägg till en uppgift.',
        task: "Uppgift: Skapa `@app.post('/uppgifter')` som tar `{'text': …}`, sparar `{'id', 'text', 'klar': False}` och svarar med 201. Saknas text: `{'fel': 'text saknas'}` med 400.",
        starterCode:
          'from flask import Flask, request\n\napp = Flask(__name__)\n\nuppgifter = []\n',
        solution:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\nuppgifter = []\n\n\n@app.post('/uppgifter')\ndef ny():\n    text = request.get_json().get('text')\n    if not text:\n        return {'fel': 'text saknas'}, 400\n    uppgift = {'id': len(uppgifter) + 1, 'text': text, 'klar': False}\n    uppgifter.append(uppgift)\n    return uppgift, 201\n",
        hints: [
          "text = request.get_json().get('text')",
          "{'id': len(uppgifter) + 1, 'text': text, 'klar': False}",
          'return uppgift, 201',
        ],
        tests: [
          {
            description: 'Ny',
            code: "__post('/uppgifter', {'text': 'Handla'}).json",
            expected: { id: 1, text: 'Handla', klar: false },
            inputs: [],
          },
          {
            description: 'Utan text',
            code: "__post('/uppgifter', {}).status",
            expected: 400,
            inputs: [],
          },
        ],
        request: {
          method: 'POST',
          path: '/uppgifter',
          body: '{"text": "Handla"}',
        },
      },
      {
        title: 'Listan',
        why: 'Alla uppgifter, klara och oklara, med samma adress som POST.',
        xp: 10,
        description: 'Visa listan.',
        task: "Uppgift: Skapa `@app.get('/uppgifter')`.",
        solution:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\nuppgifter = []\n\n\n@app.post('/uppgifter')\ndef ny():\n    text = request.get_json().get('text')\n    if not text:\n        return {'fel': 'text saknas'}, 400\n    uppgift = {'id': len(uppgifter) + 1, 'text': text, 'klar': False}\n    uppgifter.append(uppgift)\n    return uppgift, 201\n\n\n@app.get('/uppgifter')\ndef lista():\n    return uppgifter\n",
        hints: [
          "@app.get('/uppgifter')",
          'Returnera listan.',
          'return uppgifter',
        ],
        tests: [
          {
            description: 'En uppgift',
            code: "(__post('/uppgifter', {'text': 'Städa'}), len(__get('/uppgifter').json))[-1]",
            expected: 1,
            inputs: [],
          },
        ],
        request: { path: '/uppgifter' },
      },
      {
        title: 'Klar',
        why: 'Att markera något som klart ändrar data, så det är en POST. 404 när id:t inte finns.',
        xp: 20,
        description: 'Bocka av en uppgift.',
        task: "Uppgift: Skapa `@app.post('/uppgifter/<int:id>/klar')` som sätter `klar` till True och svarar med uppgiften, eller 404.",
        solution:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\nuppgifter = []\n\n\n@app.post('/uppgifter')\ndef ny():\n    text = request.get_json().get('text')\n    if not text:\n        return {'fel': 'text saknas'}, 400\n    uppgift = {'id': len(uppgifter) + 1, 'text': text, 'klar': False}\n    uppgifter.append(uppgift)\n    return uppgift, 201\n\n\n@app.get('/uppgifter')\ndef lista():\n    return uppgifter\n\n\n@app.post('/uppgifter/<int:id>/klar')\ndef klar(id):\n    for uppgift in uppgifter:\n        if uppgift['id'] == id:\n            uppgift['klar'] = True\n            return uppgift\n    return {'fel': 'Finns inte'}, 404\n",
        hints: [
          "@app.post('/uppgifter/<int:id>/klar')",
          "uppgift['klar'] = True",
          "return {'fel': 'Finns inte'}, 404",
        ],
        tests: [
          {
            description: 'Klar',
            code: "(__post('/uppgifter', {'text': 'Diska'}), __post('/uppgifter/1/klar').json['klar'])[-1]",
            expected: true,
            inputs: [],
          },
          {
            description: 'Finns inte',
            code: "__post('/uppgifter/9/klar').status",
            expected: 404,
            inputs: [],
          },
        ],
        request: { method: 'POST', path: '/uppgifter/1/klar' },
      },
    ],
  },
  {
    id: 'proj-anteckningar',
    track: 'api',
    title: 'Anteckningarna',
    reward: { emoji: '🗒️', name: 'Anteckningsbok' },
    summary: 'Ett komplett API för anteckningar, steg för steg.',
    steps: [
      {
        title: 'Alla och nya',
        why: 'GET och POST på samma adress: den ena läser listan, den andra lägger till i den.',
        xp: 15,
        description: 'Läs och skriv anteckningar.',
        task: 'Uppgift: Skapa `GET /anteckningar` och `POST /anteckningar` (kräver `text`, annars 400; id = högsta + 1; svar 201).',
        starterCode:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\nanteckningar = []\n\n\ndef hitta(id):\n    for a in anteckningar:\n        if a['id'] == id:\n            return a\n    return None\n",
        solution:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\nanteckningar = []\n\n\ndef hitta(id):\n    for a in anteckningar:\n        if a['id'] == id:\n            return a\n    return None\n\n\n@app.get('/anteckningar')\ndef alla():\n    return anteckningar\n\n\n@app.post('/anteckningar')\ndef ny():\n    text = request.get_json().get('text')\n    if not text:\n        return {'fel': 'text saknas'}, 400\n    nytt_id = max((a['id'] for a in anteckningar), default=0) + 1\n    anteckning = {'id': nytt_id, 'text': text}\n    anteckningar.append(anteckning)\n    return anteckning, 201\n",
        hints: [
          "@app.get('/anteckningar') och @app.post('/anteckningar')",
          "max((a['id'] for a in anteckningar), default=0) + 1",
          'return anteckning, 201',
        ],
        tests: [
          {
            description: 'Ny',
            code: "__post('/anteckningar', {'text': 'Köp mjölk'}).json",
            expected: { id: 1, text: 'Köp mjölk' },
            inputs: [],
          },
          {
            description: 'Utan text',
            code: "__post('/anteckningar', {}).status",
            expected: 400,
            inputs: [],
          },
          {
            description: 'Lista',
            code: "(__post('/anteckningar', {'text': 'a'}), len(__get('/anteckningar').json))[-1]",
            expected: 1,
            inputs: [],
          },
        ],
        request: {
          method: 'POST',
          path: '/anteckningar',
          body: '{"text": "Köp mjölk"}',
        },
      },
      {
        title: 'En och ändra',
        why: 'hitta används av båda vägarna, så letandet finns på ett enda ställe.',
        xp: 20,
        description: 'Läs och ändra en anteckning.',
        task: 'Uppgift: Skapa `GET /anteckningar/<int:id>` och `PUT /anteckningar/<int:id>` (404 och 400 som förut).',
        solution:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\nanteckningar = []\n\n\ndef hitta(id):\n    for a in anteckningar:\n        if a['id'] == id:\n            return a\n    return None\n\n\n@app.get('/anteckningar')\ndef alla():\n    return anteckningar\n\n\n@app.post('/anteckningar')\ndef ny():\n    text = request.get_json().get('text')\n    if not text:\n        return {'fel': 'text saknas'}, 400\n    nytt_id = max((a['id'] for a in anteckningar), default=0) + 1\n    anteckning = {'id': nytt_id, 'text': text}\n    anteckningar.append(anteckning)\n    return anteckning, 201\n\n\n@app.get('/anteckningar/<int:id>')\ndef en(id):\n    a = hitta(id)\n    if a is None:\n        return {'fel': 'Finns inte'}, 404\n    return a\n\n\n@app.put('/anteckningar/<int:id>')\ndef andra(id):\n    a = hitta(id)\n    if a is None:\n        return {'fel': 'Finns inte'}, 404\n    text = request.get_json().get('text')\n    if not text:\n        return {'fel': 'text saknas'}, 400\n    a['text'] = text\n    return a\n",
        hints: [
          'a = hitta(id)',
          "@app.put('/anteckningar/<int:id>')",
          "a['text'] = text",
        ],
        tests: [
          {
            description: 'Ändra',
            code: "(__post('/anteckningar', {'text': 'a'}), __put('/anteckningar/1', {'text': 'b'}), __get('/anteckningar/1').json['text'])[-1]",
            expected: 'b',
            inputs: [],
          },
          {
            description: 'Finns inte',
            code: "__get('/anteckningar/5').status",
            expected: 404,
            inputs: [],
          },
        ],
        request: { path: '/anteckningar/1' },
      },
      {
        title: 'Ta bort',
        why: '204 säger att det gick, utan något innehåll. Nu har API:t alla fem vägarna.',
        xp: 15,
        description: 'Ta bort en anteckning.',
        task: 'Uppgift: Skapa `DELETE /anteckningar/<int:id>` som svarar 204, eller 404.',
        solution:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\nanteckningar = []\n\n\ndef hitta(id):\n    for a in anteckningar:\n        if a['id'] == id:\n            return a\n    return None\n\n\n@app.get('/anteckningar')\ndef alla():\n    return anteckningar\n\n\n@app.post('/anteckningar')\ndef ny():\n    text = request.get_json().get('text')\n    if not text:\n        return {'fel': 'text saknas'}, 400\n    nytt_id = max((a['id'] for a in anteckningar), default=0) + 1\n    anteckning = {'id': nytt_id, 'text': text}\n    anteckningar.append(anteckning)\n    return anteckning, 201\n\n\n@app.get('/anteckningar/<int:id>')\ndef en(id):\n    a = hitta(id)\n    if a is None:\n        return {'fel': 'Finns inte'}, 404\n    return a\n\n\n@app.put('/anteckningar/<int:id>')\ndef andra(id):\n    a = hitta(id)\n    if a is None:\n        return {'fel': 'Finns inte'}, 404\n    text = request.get_json().get('text')\n    if not text:\n        return {'fel': 'text saknas'}, 400\n    a['text'] = text\n    return a\n\n\n@app.delete('/anteckningar/<int:id>')\ndef ta_bort(id):\n    a = hitta(id)\n    if a is None:\n        return {'fel': 'Finns inte'}, 404\n    anteckningar.remove(a)\n    return '', 204\n",
        hints: [
          "@app.delete('/anteckningar/<int:id>')",
          'anteckningar.remove(a)',
          "return '', 204",
        ],
        tests: [
          {
            description: 'Ta bort',
            code: "(__post('/anteckningar', {'text': 'a'}), __delete('/anteckningar/1').status)[-1]",
            expected: 204,
            inputs: [],
          },
          {
            description: 'Borta',
            code: "(__post('/anteckningar', {'text': 'a'}), __delete('/anteckningar/1'), __get('/anteckningar/1').status)[-1]",
            expected: 404,
            inputs: [],
          },
        ],
        request: { method: 'DELETE', path: '/anteckningar/1' },
      },
    ],
  },
  {
    id: 'proj-lager-crud',
    track: 'api',
    title: 'Lagerhyllan',
    reward: { emoji: '🛍️', name: 'Shoppingkasse' },
    summary: 'Ändra och sälj varor i lagret.',
    steps: [
      {
        title: 'En vara',
        why: 'Den vanliga GET-vägen för en sak, som resten bygger på.',
        xp: 10,
        description: 'Visa en vara.',
        task: 'Uppgift: Skapa `GET /varor/<int:id>` med 404 för varor som saknas.',
        starterCode:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\nvaror = [{'id': 1, 'namn': 'Mössa', 'antal': 5}]\n\n\ndef hitta(id):\n    for vara in varor:\n        if vara['id'] == id:\n            return vara\n    return None\n",
        solution:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\nvaror = [{'id': 1, 'namn': 'Mössa', 'antal': 5}]\n\n\ndef hitta(id):\n    for vara in varor:\n        if vara['id'] == id:\n            return vara\n    return None\n\n\n@app.get('/varor/<int:id>')\ndef en(id):\n    vara = hitta(id)\n    if vara is None:\n        return {'fel': 'Finns inte'}, 404\n    return vara\n",
        hints: [
          "@app.get('/varor/<int:id>')",
          'vara = hitta(id)',
          "return {'fel': 'Finns inte'}, 404",
        ],
        tests: [
          {
            description: 'Mössa',
            code: "__get('/varor/1').json['namn']",
            expected: 'Mössa',
          },
          {
            description: 'Finns inte',
            code: "__get('/varor/2').status",
            expected: 404,
          },
        ],
        request: { path: '/varor/1' },
      },
      {
        title: 'Ändra antal',
        why: 'PATCH ändrar bara det som skickas. Antalet kontrolleras så att lagret aldrig blir negativt.',
        xp: 20,
        description: 'Inventering.',
        task: 'Uppgift: Skapa `PATCH /varor/<int:id>` som kan ändra `antal` (heltal, minst 0, annars 400) och `namn`.',
        solution:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\nvaror = [{'id': 1, 'namn': 'Mössa', 'antal': 5}]\n\n\ndef hitta(id):\n    for vara in varor:\n        if vara['id'] == id:\n            return vara\n    return None\n\n\n@app.get('/varor/<int:id>')\ndef en(id):\n    vara = hitta(id)\n    if vara is None:\n        return {'fel': 'Finns inte'}, 404\n    return vara\n\n\n@app.patch('/varor/<int:id>')\ndef andra(id):\n    vara = hitta(id)\n    if vara is None:\n        return {'fel': 'Finns inte'}, 404\n    data = request.get_json()\n    if 'antal' in data:\n        if not isinstance(data['antal'], int) or data['antal'] < 0:\n            return {'fel': 'antal ska vara ett heltal, minst 0'}, 400\n        vara['antal'] = data['antal']\n    if 'namn' in data:\n        vara['namn'] = data['namn']\n    return vara\n",
        hints: [
          "@app.patch('/varor/<int:id>')",
          "if 'antal' in data:",
          "isinstance(data['antal'], int) and data['antal'] >= 0",
        ],
        tests: [
          {
            description: 'Nytt antal',
            code: "__patch('/varor/1', {'antal': 9}).json['antal']",
            expected: 9,
            inputs: [],
          },
          {
            description: 'Negativt',
            code: "__patch('/varor/1', {'antal': -1}).status",
            expected: 400,
            inputs: [],
          },
          {
            description: 'Bara namn',
            code: "__patch('/varor/1', {'namn': 'Keps'}).json",
            expected: { id: 1, namn: 'Keps', antal: 5 },
            inputs: [],
          },
        ],
        request: { method: 'PATCH', path: '/varor/1', body: '{"antal": 9}' },
      },
      {
        title: 'Sälj',
        why: 'Att sälja är en handling, inte en ändring av ett fält. Därför en egen POST-väg, och 409 när det inte räcker.',
        xp: 20,
        description: 'Sälj ur lagret.',
        task: "Uppgift: Skapa `POST /varor/<int:id>/salj` som tar `{'antal': …}` (standard 1) och minskar lagret. Finns det inte tillräckligt: `{'fel': 'Inte tillräckligt i lager'}` med 409.",
        solution:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\nvaror = [{'id': 1, 'namn': 'Mössa', 'antal': 5}]\n\n\ndef hitta(id):\n    for vara in varor:\n        if vara['id'] == id:\n            return vara\n    return None\n\n\n@app.get('/varor/<int:id>')\ndef en(id):\n    vara = hitta(id)\n    if vara is None:\n        return {'fel': 'Finns inte'}, 404\n    return vara\n\n\n@app.patch('/varor/<int:id>')\ndef andra(id):\n    vara = hitta(id)\n    if vara is None:\n        return {'fel': 'Finns inte'}, 404\n    data = request.get_json()\n    if 'antal' in data:\n        if not isinstance(data['antal'], int) or data['antal'] < 0:\n            return {'fel': 'antal ska vara ett heltal, minst 0'}, 400\n        vara['antal'] = data['antal']\n    if 'namn' in data:\n        vara['namn'] = data['namn']\n    return vara\n\n\n@app.post('/varor/<int:id>/salj')\ndef salj(id):\n    vara = hitta(id)\n    if vara is None:\n        return {'fel': 'Finns inte'}, 404\n    antal = request.get_json().get('antal', 1)\n    if antal > vara['antal']:\n        return {'fel': 'Inte tillräckligt i lager'}, 409\n    vara['antal'] -= antal\n    return vara\n",
        hints: [
          "@app.post('/varor/<int:id>/salj')",
          "request.get_json().get('antal', 1)",
          "if antal > vara['antal']: … 409",
        ],
        tests: [
          {
            description: 'Sälj 2',
            code: "__post('/varor/1/salj', {'antal': 2}).json['antal']",
            expected: 3,
            inputs: [],
          },
          {
            description: 'Sälj 9',
            code: "__post('/varor/1/salj', {'antal': 9}).status",
            expected: 409,
            inputs: [],
          },
        ],
        request: {
          method: 'POST',
          path: '/varor/1/salj',
          body: '{"antal": 2}',
        },
      },
    ],
  },
  {
    id: 'proj-klubben',
    track: 'api',
    title: 'Klubben',
    reward: { emoji: '⚽', name: 'Fotboll' },
    summary: 'Lag och spelare, där spelarna hör till ett lag.',
    steps: [
      {
        title: 'Lagen',
        why: 'Lagen är den översta nivån. Spelarna kommer att höra till dem.',
        xp: 15,
        description: 'Lista och skapa lag.',
        task: 'Uppgift: Skapa `GET /lag` och `POST /lag` (kräver `namn`; id = högsta + 1; 201).',
        starterCode:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\nlag = [{'id': 1, 'namn': 'Hundarna'}]\nspelare = [{'id': 1, 'lag_id': 1, 'namn': 'Ada'}]\n",
        solution:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\nlag = [{'id': 1, 'namn': 'Hundarna'}]\nspelare = [{'id': 1, 'lag_id': 1, 'namn': 'Ada'}]\n\n\n@app.get('/lag')\ndef alla_lag():\n    return lag\n\n\n@app.post('/lag')\ndef nytt_lag():\n    namn = request.get_json().get('namn')\n    if not namn:\n        return {'fel': 'namn saknas'}, 400\n    nytt = {'id': max(l['id'] for l in lag) + 1, 'namn': namn}\n    lag.append(nytt)\n    return nytt, 201\n",
        hints: [
          "@app.get('/lag') och @app.post('/lag')",
          "max(l['id'] for l in lag) + 1",
          'return nytt, 201',
        ],
        tests: [
          {
            description: 'Nytt lag',
            code: "__post('/lag', {'namn': 'Katterna'}).json",
            expected: { id: 2, namn: 'Katterna' },
            inputs: [],
          },
          {
            description: 'Utan namn',
            code: "__post('/lag', {}).status",
            expected: 400,
            inputs: [],
          },
        ],
        request: { method: 'POST', path: '/lag', body: '{"namn": "Katterna"}' },
      },
      {
        title: 'Lagets spelare',
        why: 'Adressen /lag/1/spelare säger att spelarna hör till lag 1. Först kollas att laget finns.',
        xp: 20,
        description: 'Spelarna i ett lag.',
        task: 'Uppgift: Skapa `GET` och `POST /lag/<int:id>/spelare`. Ett lag som inte finns ger 404.',
        solution:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\nlag = [{'id': 1, 'namn': 'Hundarna'}]\nspelare = [{'id': 1, 'lag_id': 1, 'namn': 'Ada'}]\n\n\n@app.get('/lag')\ndef alla_lag():\n    return lag\n\n\n@app.post('/lag')\ndef nytt_lag():\n    namn = request.get_json().get('namn')\n    if not namn:\n        return {'fel': 'namn saknas'}, 400\n    nytt = {'id': max(l['id'] for l in lag) + 1, 'namn': namn}\n    lag.append(nytt)\n    return nytt, 201\n\n\ndef finns_lag(id):\n    return any(l['id'] == id for l in lag)\n\n\n@app.get('/lag/<int:id>/spelare')\ndef lagets_spelare(id):\n    if not finns_lag(id):\n        return {'fel': 'Finns inte'}, 404\n    return [s for s in spelare if s['lag_id'] == id]\n\n\n@app.post('/lag/<int:id>/spelare')\ndef ny_spelare(id):\n    if not finns_lag(id):\n        return {'fel': 'Finns inte'}, 404\n    ny = {'id': max(s['id'] for s in spelare) + 1, 'lag_id': id, 'namn': request.get_json()['namn']}\n    spelare.append(ny)\n    return ny, 201\n",
        hints: [
          "def finns_lag(id): return any(l['id'] == id for l in lag)",
          "[s for s in spelare if s['lag_id'] == id]",
          "'lag_id': id i den nya spelaren",
        ],
        tests: [
          {
            description: 'Ada',
            code: "__get('/lag/1/spelare').json[0]['namn']",
            expected: 'Ada',
          },
          {
            description: 'Ny spelare',
            code: "__post('/lag/1/spelare', {'namn': 'Bo'}).json",
            expected: { id: 2, lag_id: 1, namn: 'Bo' },
            inputs: [],
          },
          {
            description: 'Lag 9',
            code: "__get('/lag/9/spelare').status",
            expected: 404,
          },
        ],
        request: { path: '/lag/1/spelare' },
      },
      {
        title: 'Lämna laget',
        why: 'Både lagets och spelarens id står i adressen. Spelaren måste höra till just det laget.',
        xp: 15,
        description: 'En spelare lämnar.',
        task: 'Uppgift: Skapa `DELETE /lag/<int:id>/spelare/<int:spelare_id>` som svarar 204, eller 404.',
        solution:
          "from flask import Flask, request\n\napp = Flask(__name__)\n\nlag = [{'id': 1, 'namn': 'Hundarna'}]\nspelare = [{'id': 1, 'lag_id': 1, 'namn': 'Ada'}]\n\n\n@app.get('/lag')\ndef alla_lag():\n    return lag\n\n\n@app.post('/lag')\ndef nytt_lag():\n    namn = request.get_json().get('namn')\n    if not namn:\n        return {'fel': 'namn saknas'}, 400\n    nytt = {'id': max(l['id'] for l in lag) + 1, 'namn': namn}\n    lag.append(nytt)\n    return nytt, 201\n\n\ndef finns_lag(id):\n    return any(l['id'] == id for l in lag)\n\n\n@app.get('/lag/<int:id>/spelare')\ndef lagets_spelare(id):\n    if not finns_lag(id):\n        return {'fel': 'Finns inte'}, 404\n    return [s for s in spelare if s['lag_id'] == id]\n\n\n@app.post('/lag/<int:id>/spelare')\ndef ny_spelare(id):\n    if not finns_lag(id):\n        return {'fel': 'Finns inte'}, 404\n    ny = {'id': max(s['id'] for s in spelare) + 1, 'lag_id': id, 'namn': request.get_json()['namn']}\n    spelare.append(ny)\n    return ny, 201\n\n\n@app.delete('/lag/<int:id>/spelare/<int:spelare_id>')\ndef ta_bort_spelare(id, spelare_id):\n    for s in spelare:\n        if s['id'] == spelare_id and s['lag_id'] == id:\n            spelare.remove(s)\n            return '', 204\n    return {'fel': 'Finns inte'}, 404\n",
        hints: [
          'Två variabler i adressen.',
          "s['id'] == spelare_id and s['lag_id'] == id",
          "return '', 204",
        ],
        tests: [
          {
            description: 'Ada lämnar',
            code: "__delete('/lag/1/spelare/1').status",
            expected: 204,
            inputs: [],
          },
          {
            description: 'Fel lag',
            code: "__delete('/lag/2/spelare/1').status",
            expected: 404,
            inputs: [],
          },
        ],
        request: { method: 'DELETE', path: '/lag/1/spelare/1' },
      },
    ],
  },
  {
    id: 'proj-biljetter',
    track: 'fel',
    title: 'Biljettkassan',
    reward: { emoji: '🎟️', name: 'Teaterbiljett' },
    summary: 'Köp biljetter, och få tydliga fel när det inte går.',
    steps: [
      {
        title: 'En föreställning',
        why: 'hitta gör abort själv, så vägfunktionen blir en enda rad. Felhanteraren gör svaret till JSON.',
        xp: 15,
        description: 'Visa en föreställning.',
        task: "Uppgift: Skapa `GET /forestallningar/<int:id>` med `hitta`, och en felhanterare för 400, 404 och 409 som svarar `{'fel': fel.description}`.",
        starterCode:
          "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nforestallningar = [{'id': 1, 'namn': 'Hamlet', 'kvar': 3}]\n\n\ndef hitta(id):\n    for f in forestallningar:\n        if f['id'] == id:\n            return f\n    abort(404, description='Ingen sådan föreställning')\n",
        solution:
          "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nforestallningar = [{'id': 1, 'namn': 'Hamlet', 'kvar': 3}]\n\n\ndef hitta(id):\n    for f in forestallningar:\n        if f['id'] == id:\n            return f\n    abort(404, description='Ingen sådan föreställning')\n\n\n@app.get('/forestallningar/<int:id>')\ndef en(id):\n    return hitta(id)\n\n\n@app.errorhandler(400)\n@app.errorhandler(404)\n@app.errorhandler(409)\ndef felsvar(fel):\n    return {'fel': fel.description}, fel.code\n",
        hints: [
          'return hitta(id)',
          '@app.errorhandler(404) (och 400, 409) ovanför samma funktion',
          "return {'fel': fel.description}, fel.code",
        ],
        tests: [
          {
            description: 'Hamlet',
            code: "__get('/forestallningar/1').json['namn']",
            expected: 'Hamlet',
          },
          {
            description: 'Finns inte',
            code: "__get('/forestallningar/7').json",
            expected: { fel: 'Ingen sådan föreställning' },
          },
        ],
        request: { path: '/forestallningar/7' },
      },
      {
        title: 'Köp',
        why: 'Fel antal är ett fel i anropet (400). Slutsålt krockar med hur det är just nu (409).',
        xp: 20,
        description: 'Köp biljetter.',
        task: "Uppgift: Skapa `POST /forestallningar/<int:id>/kop` med `{'antal': …}`. Fel antal ger 400, för få kvar ger 409 med `'Slutsålt'`. Svara `{'kopt': …, 'kvar': …}`.",
        solution:
          "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nforestallningar = [{'id': 1, 'namn': 'Hamlet', 'kvar': 3}]\n\n\ndef hitta(id):\n    for f in forestallningar:\n        if f['id'] == id:\n            return f\n    abort(404, description='Ingen sådan föreställning')\n\n\n@app.get('/forestallningar/<int:id>')\ndef en(id):\n    return hitta(id)\n\n\n@app.post('/forestallningar/<int:id>/kop')\ndef kop(id):\n    f = hitta(id)\n    antal = request.get_json().get('antal')\n    if not isinstance(antal, int) or antal < 1:\n        abort(400, description='antal ska vara ett heltal, minst 1')\n    if antal > f['kvar']:\n        abort(409, description='Slutsålt')\n    f['kvar'] -= antal\n    return {'kopt': antal, 'kvar': f['kvar']}\n\n\n@app.errorhandler(400)\n@app.errorhandler(404)\n@app.errorhandler(409)\ndef felsvar(fel):\n    return {'fel': fel.description}, fel.code\n",
        hints: [
          'isinstance(antal, int) and antal >= 1',
          "abort(409, description='Slutsålt')",
          "f['kvar'] -= antal",
        ],
        tests: [
          {
            description: 'Köp 2',
            code: "__post('/forestallningar/1/kop', {'antal': 2}).json",
            expected: { kopt: 2, kvar: 1 },
            inputs: [],
          },
          {
            description: 'Köp 5',
            code: "__post('/forestallningar/1/kop', {'antal': 5}).json",
            expected: { fel: 'Slutsålt' },
            inputs: [],
          },
          {
            description: 'Köp noll',
            code: "__post('/forestallningar/1/kop', {'antal': 0}).status",
            expected: 400,
            inputs: [],
          },
        ],
        request: {
          method: 'POST',
          path: '/forestallningar/1/kop',
          body: '{"antal": 2}',
        },
      },
      {
        title: 'Fel metod',
        why: 'Med 405 i samma felhanterare svarar API:t JSON för alla fel det kan ge.',
        xp: 10,
        description: 'Också fel metod ska bli JSON.',
        task: 'Uppgift: Låt felhanteraren också ta hand om 405.',
        solution:
          "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nforestallningar = [{'id': 1, 'namn': 'Hamlet', 'kvar': 3}]\n\n\ndef hitta(id):\n    for f in forestallningar:\n        if f['id'] == id:\n            return f\n    abort(404, description='Ingen sådan föreställning')\n\n\n@app.get('/forestallningar/<int:id>')\ndef en(id):\n    return hitta(id)\n\n\n@app.post('/forestallningar/<int:id>/kop')\ndef kop(id):\n    f = hitta(id)\n    antal = request.get_json().get('antal')\n    if not isinstance(antal, int) or antal < 1:\n        abort(400, description='antal ska vara ett heltal, minst 1')\n    if antal > f['kvar']:\n        abort(409, description='Slutsålt')\n    f['kvar'] -= antal\n    return {'kopt': antal, 'kvar': f['kvar']}\n\n\n@app.errorhandler(400)\n@app.errorhandler(404)\n@app.errorhandler(405)\n@app.errorhandler(409)\ndef felsvar(fel):\n    return {'fel': fel.description}, fel.code\n",
        hints: [
          'En dekorator till.',
          '@app.errorhandler(405)',
          'Ingen annan ändring behövs.',
        ],
        tests: [
          {
            description: 'DELETE',
            code: "'fel' in __delete('/forestallningar/1').json",
            expected: true,
          },
        ],
        request: { method: 'DELETE', path: '/forestallningar/1' },
      },
    ],
  },
  {
    id: 'proj-rumsbokning',
    track: 'fel',
    title: 'Rumsbokningen',
    reward: { emoji: '🚪', name: 'Dörr' },
    summary: 'Boka mötesrum utan dubbelbokningar.',
    steps: [
      {
        title: 'Boka',
        why: 'Ett rum som inte finns är 404. Ett rum som redan är bokat är en krock, 409.',
        xp: 20,
        description: 'Boka ett rum ett visst datum.',
        task: "Uppgift: Skapa `POST /bokningar` med `{'rum': …, 'datum': …}`. Okänt rum ger 404, redan bokat 409. Felhanteraren svarar `{'fel': fel.description}`.",
        starterCode:
          "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nrum = ['Stora', 'Lilla']\nbokningar = []\n",
        solution:
          "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nrum = ['Stora', 'Lilla']\nbokningar = []\n\n\n@app.post('/bokningar')\ndef boka():\n    data = request.get_json()\n    if data.get('rum') not in rum:\n        abort(404, description='Rummet finns inte')\n    if any(b['rum'] == data['rum'] and b['datum'] == data['datum'] for b in bokningar):\n        abort(409, description='Rummet är redan bokat')\n    bokning = {'id': len(bokningar) + 1, 'rum': data['rum'], 'datum': data['datum']}\n    bokningar.append(bokning)\n    return bokning, 201\n\n\n@app.errorhandler(404)\n@app.errorhandler(409)\ndef felsvar(fel):\n    return {'fel': fel.description}, fel.code\n",
        hints: [
          "abort(404, description='Rummet finns inte')",
          "any(b['rum'] == data['rum'] and b['datum'] == data['datum'] for b in bokningar)",
          'return bokning, 201',
        ],
        tests: [
          {
            description: 'Boka',
            code: "__post('/bokningar', {'rum': 'Stora', 'datum': '2026-06-10'}).status",
            expected: 201,
            inputs: [],
          },
          {
            description: 'Dubbelbokat',
            code: "(__post('/bokningar', {'rum': 'Stora', 'datum': '2026-06-10'}), __post('/bokningar', {'rum': 'Stora', 'datum': '2026-06-10'}).json)[-1]",
            expected: { fel: 'Rummet är redan bokat' },
            inputs: [],
          },
          {
            description: 'Okänt rum',
            code: "__post('/bokningar', {'rum': 'Källaren', 'datum': 'x'}).status",
            expected: 404,
            inputs: [],
          },
        ],
        request: {
          method: 'POST',
          path: '/bokningar',
          body: '{"rum": "Stora", "datum": "2026-06-10"}',
        },
      },
      {
        title: 'Datum saknas',
        why: 'Kontrollen av datan kommer först, innan appen letar i bokningarna.',
        xp: 15,
        description: 'Utan datum kan inget bokas.',
        task: "Uppgift: Utan `datum` ska det bli `abort(400, description='datum saknas')`. Lägg till 400 i felhanteraren.",
        solution:
          "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nrum = ['Stora', 'Lilla']\nbokningar = []\n\n\n@app.post('/bokningar')\ndef boka():\n    data = request.get_json()\n    if not data.get('datum'):\n        abort(400, description='datum saknas')\n    if data.get('rum') not in rum:\n        abort(404, description='Rummet finns inte')\n    if any(b['rum'] == data['rum'] and b['datum'] == data['datum'] for b in bokningar):\n        abort(409, description='Rummet är redan bokat')\n    bokning = {'id': len(bokningar) + 1, 'rum': data['rum'], 'datum': data['datum']}\n    bokningar.append(bokning)\n    return bokning, 201\n\n\n@app.errorhandler(400)\n@app.errorhandler(404)\n@app.errorhandler(409)\ndef felsvar(fel):\n    return {'fel': fel.description}, fel.code\n",
        hints: [
          "if not data.get('datum'):",
          "abort(400, description='datum saknas')",
          '@app.errorhandler(400)',
        ],
        tests: [
          {
            description: 'Utan datum',
            code: "__post('/bokningar', {'rum': 'Stora'}).json",
            expected: { fel: 'datum saknas' },
            inputs: [],
          },
        ],
        request: {
          method: 'POST',
          path: '/bokningar',
          body: '{"rum": "Stora"}',
        },
      },
      {
        title: 'Avboka',
        why: 'En avbokning av något som inte finns är 404, med samma form på felet som resten av API:t.',
        xp: 15,
        description: 'Avboka.',
        task: "Uppgift: Skapa `DELETE /bokningar/<int:id>` som svarar 204, eller 404 med `'Ingen sådan bokning'`.",
        solution:
          "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nrum = ['Stora', 'Lilla']\nbokningar = []\n\n\n@app.post('/bokningar')\ndef boka():\n    data = request.get_json()\n    if not data.get('datum'):\n        abort(400, description='datum saknas')\n    if data.get('rum') not in rum:\n        abort(404, description='Rummet finns inte')\n    if any(b['rum'] == data['rum'] and b['datum'] == data['datum'] for b in bokningar):\n        abort(409, description='Rummet är redan bokat')\n    bokning = {'id': len(bokningar) + 1, 'rum': data['rum'], 'datum': data['datum']}\n    bokningar.append(bokning)\n    return bokning, 201\n\n\n@app.errorhandler(400)\n@app.errorhandler(404)\n@app.errorhandler(409)\ndef felsvar(fel):\n    return {'fel': fel.description}, fel.code\n\n\n@app.delete('/bokningar/<int:id>')\ndef avboka(id):\n    for b in bokningar:\n        if b['id'] == id:\n            bokningar.remove(b)\n            return '', 204\n    abort(404, description='Ingen sådan bokning')\n",
        hints: [
          "@app.delete('/bokningar/<int:id>')",
          "bokningar.remove(b)\n            return '', 204",
          "abort(404, description='Ingen sådan bokning')",
        ],
        tests: [
          {
            description: 'Avboka',
            code: "(__post('/bokningar', {'rum': 'Lilla', 'datum': 'x'}), __delete('/bokningar/1').status)[-1]",
            expected: 204,
            inputs: [],
          },
          {
            description: 'Finns inte',
            code: "__delete('/bokningar/3').json",
            expected: { fel: 'Ingen sådan bokning' },
            inputs: [],
          },
        ],
        request: { method: 'DELETE', path: '/bokningar/1' },
      },
    ],
  },
  {
    id: 'proj-konton',
    track: 'fel',
    title: 'Kontoskaparen',
    reward: { emoji: '👤', name: 'Användare' },
    summary: 'Skapa konton och visa alla fel på en gång.',
    steps: [
      {
        title: 'Alla fel på en gång',
        why: 'En lista med fel gör att användaren kan rätta allt på en gång, i stället för ett fel i taget.',
        xp: 20,
        description: 'Kontrollera ett nytt konto.',
        task: "Uppgift: Skriv `kontrollera(data)` som ger en lista med fel (namn minst 3 tecken, losenord minst 8). `POST /konton` svarar `{'fel': [...]}` med 400, eller `{'namn': …}` med 201.",
        starterCode:
          'from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nkonton = {}\n',
        solution:
          "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nkonton = {}\n\n\ndef kontrollera(data):\n    fel = []\n    if len(data.get('namn', '')) < 3:\n        fel.append('namn ska vara minst 3 tecken')\n    if len(data.get('losenord', '')) < 8:\n        fel.append('losenord ska vara minst 8 tecken')\n    return fel\n\n\n@app.post('/konton')\ndef nytt_konto():\n    data = request.get_json()\n    fel = kontrollera(data)\n    if fel:\n        return {'fel': fel}, 400\n    konton[data['namn']] = data['losenord']\n    return {'namn': data['namn']}, 201\n",
        hints: [
          'fel = [] och fel.append(…)',
          "if fel: return {'fel': fel}, 400",
          "return {'namn': data['namn']}, 201",
        ],
        tests: [
          {
            description: 'Två fel',
            code: "__post('/konton', {'namn': 'A', 'losenord': 'kort'}).json",
            expected: {
              fel: [
                'namn ska vara minst 3 tecken',
                'losenord ska vara minst 8 tecken',
              ],
            },
            inputs: [],
          },
          {
            description: 'Godkänt',
            code: "__post('/konton', {'namn': 'Ada', 'losenord': 'hemligt123'}).status",
            expected: 201,
            inputs: [],
          },
        ],
        request: {
          method: 'POST',
          path: '/konton',
          body: '{"namn": "A", "losenord": "kort"}',
        },
      },
      {
        title: 'Upptaget namn',
        why: 'Felet har samma form som de andra, en lista, så att appen kan visa det på samma sätt.',
        xp: 15,
        description: 'Två konton kan inte heta likadant.',
        task: "Uppgift: Ett namn som redan finns ger `{'fel': ['namnet är upptaget']}` med 409.",
        solution:
          "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nkonton = {}\n\n\ndef kontrollera(data):\n    fel = []\n    if len(data.get('namn', '')) < 3:\n        fel.append('namn ska vara minst 3 tecken')\n    if len(data.get('losenord', '')) < 8:\n        fel.append('losenord ska vara minst 8 tecken')\n    return fel\n\n\n@app.post('/konton')\ndef nytt_konto():\n    data = request.get_json()\n    fel = kontrollera(data)\n    if fel:\n        return {'fel': fel}, 400\n    if data['namn'] in konton:\n        return {'fel': ['namnet är upptaget']}, 409\n    konton[data['namn']] = data['losenord']\n    return {'namn': data['namn']}, 201\n",
        hints: [
          "if data['namn'] in konton:",
          "return {'fel': ['namnet är upptaget']}, 409",
          'Kolla efter de andra felen.',
        ],
        tests: [
          {
            description: 'Två gånger',
            code: "(__post('/konton', {'namn': 'Ada', 'losenord': 'hemligt123'}), __post('/konton', {'namn': 'Ada', 'losenord': 'hemligt123'}).status)[-1]",
            expected: 409,
            inputs: [],
          },
        ],
        request: {
          method: 'POST',
          path: '/konton',
          body: '{"namn": "Ada", "losenord": "hemligt123"}',
        },
      },
      {
        title: 'Visa ett konto',
        why: 'Lösenordet skickas aldrig tillbaka. Felhanteraren ger 404 samma form som de andra felen.',
        xp: 15,
        description: 'Visa ett konto.',
        task: "Uppgift: Skapa `GET /konton/<namn>` som svarar `{'namn': …}` eller `abort(404)`, och en felhanterare som svarar `{'fel': ['finns inte']}`.",
        solution:
          "from flask import Flask, abort, request\n\napp = Flask(__name__)\n\nkonton = {}\n\n\ndef kontrollera(data):\n    fel = []\n    if len(data.get('namn', '')) < 3:\n        fel.append('namn ska vara minst 3 tecken')\n    if len(data.get('losenord', '')) < 8:\n        fel.append('losenord ska vara minst 8 tecken')\n    return fel\n\n\n@app.post('/konton')\ndef nytt_konto():\n    data = request.get_json()\n    fel = kontrollera(data)\n    if fel:\n        return {'fel': fel}, 400\n    if data['namn'] in konton:\n        return {'fel': ['namnet är upptaget']}, 409\n    konton[data['namn']] = data['losenord']\n    return {'namn': data['namn']}, 201\n\n\n@app.get('/konton/<namn>')\ndef konto(namn):\n    if namn not in konton:\n        abort(404)\n    return {'namn': namn}\n\n\n@app.errorhandler(404)\ndef finns_inte(fel):\n    return {'fel': ['finns inte']}, 404\n",
        hints: [
          "@app.get('/konton/<namn>')",
          'abort(404)',
          '@app.errorhandler(404)',
        ],
        tests: [
          {
            description: 'Finns inte',
            code: "__get('/konton/Bo').json",
            expected: { fel: ['finns inte'] },
          },
          {
            description: 'Inget lösenord',
            code: "(__post('/konton', {'namn': 'Ada', 'losenord': 'hemligt123'}), __get('/konton/Ada').json)[-1]",
            expected: { namn: 'Ada' },
            inputs: [],
          },
        ],
        request: { path: '/konton/Ada' },
      },
    ],
  },
];

export const PROJECT_STEPS = projectSteps(PROJECTS, text => `# ${text}`);
