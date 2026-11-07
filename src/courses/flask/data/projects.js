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
];

export const PROJECT_STEPS = projectSteps(PROJECTS, text => `# ${text}`);
