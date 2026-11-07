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
];

export const PROJECT_STEPS = projectSteps(PROJECTS, text => `# ${text}`);
