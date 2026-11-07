// Bana 1: första appen. Eleven kan Python (Python-kursen) men har aldrig
// byggt något för webben. Bara text och HTML som svar här – JSON kommer i
// bana 3.

const IMPORT = 'from flask import Flask\n\napp = Flask(__name__)\n';

export const FORSTA = [
  {
    id: 'forsta-01',
    track: 'forsta',
    title: 'Hej, webben!',
    xp: 10,
    description:
      'En webbapp väntar på att någon ska fråga efter en adress, och svarar. Med Flask räcker det med några rader.',
    explain:
      "`app = Flask(__name__)` skapar appen. `@app.get('/')` säger att funktionen under ska köras när någon frågar efter adressen `/` – startsidan. Det funktionen returnerar är svaret.\n\nEn sådan funktion kallas en **vägfunktion** (view). Raden med `@` framför kallas en **dekorator**.\n\nI Kodskolan startas ingen riktig server. Appen anropas direkt, och svaret visas under **📮 Svaret** när du kört koden.",
    example:
      "from flask import Flask\n\napp = Flask(__name__)\n\n@app.get('/')\ndef start():\n    return 'Välkommen!'",
    task: "Uppgift: Gör så att startsidan `/` svarar `'Hej, webben!'`.",
    starterCode: `${IMPORT}\n# Skriv vägen här\n`,
    solution: `${IMPORT}\n@app.get('/')\ndef start():\n    return 'Hej, webben!'\n`,
    hints: [
      "Raden före funktionen: @app.get('/')",
      'Funktionen returnerar texten.',
      "@app.get('/')\ndef start():\n    return 'Hej, webben!'",
    ],
    tests: [
      {
        description: "/ svarar 'Hej, webben!'",
        code: "__get('/').text",
        expected: 'Hej, webben!',
      },
    ],
  },
  {
    id: 'forsta-02',
    track: 'forsta',
    title: 'Statuskoden',
    xp: 10,
    description:
      'Varje svar har en statuskod: ett tal som säger hur det gick. 200 betyder att allt gick bra.',
    explain:
      'Webbläsaren skickar ett **anrop** (request), och appen skickar ett **svar** (response). Svaret har en statuskod och ett innehåll.\n\nDe vanligaste:\n- `200` – OK\n- `404` – finns inte\n- `500` – appen kraschade\n\nFlask sätter `200` själv när funktionen returnerar något. Statuskoden står först under 📮 Svaret.',
    example: "@app.get('/ping')\ndef ping():\n    return 'pong'",
    task: "Uppgift: Skapa vägen `/status` som svarar `'Allt fungerar'`. Ändra adressen i 📮 till `/status` och kör koden för att se svaret.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n@app.get('/status')\ndef status():\n    return 'Allt fungerar'\n`,
    hints: [
      "@app.get('/status')",
      'Funktionen kan heta status.',
      "return 'Allt fungerar'",
    ],
    tests: [
      {
        description: '/status ger 200',
        code: "__get('/status').status",
        expected: 200,
      },
      {
        description: "/status svarar 'Allt fungerar'",
        code: "__get('/status').text",
        expected: 'Allt fungerar',
      },
    ],
    request: { path: '/status' },
  },
  {
    id: 'forsta-03',
    track: 'forsta',
    title: 'Flera sidor',
    xp: 10,
    description:
      'En app kan ha hur många vägar som helst. Varje väg får sin egen funktion.',
    explain:
      'Varje adress får en egen `@app.get` och en egen funktion. Funktionerna måste ha olika namn – Flask använder namnet för att hålla isär vägarna.\n\nUnder svaret står alla vägar appen har.',
    example:
      "@app.get('/')\ndef start():\n    return 'Start'\n\n@app.get('/hjalp')\ndef hjalp():\n    return 'Hjälp'",
    task: "Uppgift: `/` ska svara `'Startsidan'` och `/om` ska svara `'Om oss'`.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n@app.get('/')\ndef start():\n    return 'Startsidan'\n\n\n@app.get('/om')\ndef om():\n    return 'Om oss'\n`,
    hints: [
      'Två vägar, två funktioner.',
      'Funktionerna behöver olika namn.',
      "@app.get('/om')\ndef om():\n    return 'Om oss'",
    ],
    tests: [
      {
        description: "/ svarar 'Startsidan'",
        code: "__get('/').text",
        expected: 'Startsidan',
      },
      {
        description: "/om svarar 'Om oss'",
        code: "__get('/om').text",
        expected: 'Om oss',
      },
    ],
  },
  {
    id: 'forsta-04',
    track: 'forsta',
    title: '404 – finns inte',
    xp: 10,
    description:
      'Frågar någon efter en adress som appen inte har, svarar Flask själv med 404.',
    explain:
      'Du behöver inte skriva något för att få 404. Flask svarar så för alla adresser som ingen vägfunktion tar hand om.\n\nAnropa `/kontakt` med 📮 och se 404. Lägg sedan till vägen och kör igen.',
    example: '# /hemlig finns inte, så den ger 404',
    task: "Uppgift: Lägg till vägen `/kontakt` som svarar `'Mejla oss på hej@kafe.se'`.",
    starterCode: `${IMPORT}\n@app.get('/')\ndef start():\n    return 'Startsidan'\n`,
    solution: `${IMPORT}\n@app.get('/')\ndef start():\n    return 'Startsidan'\n\n\n@app.get('/kontakt')\ndef kontakt():\n    return 'Mejla oss på hej@kafe.se'\n`,
    hints: [
      'En väg till.',
      "@app.get('/kontakt')",
      "return 'Mejla oss på hej@kafe.se'",
    ],
    tests: [
      {
        description: '/kontakt ger 200',
        code: "__get('/kontakt').status",
        expected: 200,
      },
      {
        description: '/hemlig ger fortfarande 404',
        code: "__get('/hemlig').status",
        expected: 404,
      },
    ],
    request: { path: '/kontakt' },
  },
  {
    id: 'forsta-05',
    track: 'forsta',
    title: 'HTML i svaret',
    xp: 15,
    description: 'Svaret kan vara HTML. Då visar webbläsaren det som en sida.',
    explain:
      'Text som innehåller HTML-taggar visas som en sida. Flask säger att svaret är `text/html`, och under 📮 Svaret ser du sidan.\n\nFör större sidor finns mallar (bana 8). En rad HTML går bra att skriva direkt.',
    example:
      "@app.get('/')\ndef start():\n    return '<h1>Hej!</h1><p>Välkommen.</p>'",
    task: "Uppgift: `/` ska svara med `'<h1>Kafé Bönan</h1><p>Öppet 8–17</p>'`.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n@app.get('/')\ndef start():\n    return '<h1>Kafé Bönan</h1><p>Öppet 8–17</p>'\n`,
    hints: [
      'Samma som förut, men med HTML i texten.',
      'Taggarna står inne i citattecknen.',
      "return '<h1>Kafé Bönan</h1><p>Öppet 8–17</p>'",
    ],
    tests: [
      {
        description: 'Rätt HTML',
        code: "__get('/').text",
        expected: '<h1>Kafé Bönan</h1><p>Öppet 8–17</p>',
      },
      {
        description: 'Svaret är HTML',
        code: "__get('/').typ",
        expected: 'text/html',
      },
    ],
  },
  {
    id: 'forsta-06',
    track: 'forsta',
    title: 'Funktionen körs vid varje anrop',
    xp: 15,
    description:
      'Vägfunktionen körs på nytt varje gång någon anropar adressen. Därför kan svaret ändras.',
    explain:
      'En variabel utanför funktionerna finns kvar så länge appen kör. Med `global besok` kan funktionen ändra den.\n\nI en riktig app sparas sådant i en databas (bana 10), för variabeln försvinner när servern startas om.',
    example:
      "antal = 0\n\n@app.get('/')\ndef start():\n    global antal\n    antal += 1\n    return f'Anrop nummer {antal}'",
    task: "Uppgift: Skapa `besok = 0` och vägen `/besok` som ökar `besok` med 1 och svarar `f'Du är besökare nummer {besok}'`.",
    starterCode: IMPORT,
    solution: `${IMPORT}\nbesok = 0\n\n\n@app.get('/besok')\ndef besokare():\n    global besok\n    besok += 1\n    return f'Du är besökare nummer {besok}'\n`,
    hints: [
      'besok = 0 överst, utanför funktionen.',
      'global besok inne i funktionen.',
      "besok += 1\n    return f'Du är besökare nummer {besok}'",
    ],
    tests: [
      {
        description: 'Första besöket',
        code: "__get('/besok').text",
        expected: 'Du är besökare nummer 1',
        inputs: [],
      },
      {
        description: 'Tredje besöket',
        code: "(__get('/besok'), __get('/besok'), __get('/besok').text)[-1]",
        expected: 'Du är besökare nummer 3',
        inputs: [],
      },
    ],
    request: { path: '/besok' },
  },
  {
    id: 'forsta-07',
    track: 'forsta',
    title: '405 – fel metod',
    xp: 15,
    description:
      'Ett anrop har också en **metod**. `GET` hämtar, `POST` skickar. `@app.get` tar bara emot GET.',
    explain:
      'Webbläsaren använder `GET` när du skriver en adress. Formulär och appar skickar ofta `POST`.\n\nFrågar någon med fel metod svarar Flask `405 Method Not Allowed` – vägen finns, men inte för den metoden. Byt metod i 📮 till POST och se själv.',
    example:
      "@app.get('/meny')   # bara GET\ndef meny():\n    return 'Kaffe, te'",
    task: "Uppgift: Skapa `/meny` med `@app.get` som svarar `'Kaffe, te, bulle'`. Testerna kollar att POST ger 405.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n@app.get('/meny')\ndef meny():\n    return 'Kaffe, te, bulle'\n`,
    hints: [
      "@app.get('/meny')",
      'Funktionen returnerar menyn.',
      "return 'Kaffe, te, bulle'",
    ],
    tests: [
      {
        description: 'GET /meny',
        code: "__get('/meny').text",
        expected: 'Kaffe, te, bulle',
      },
      {
        description: 'POST /meny ger 405',
        code: "__post('/meny').status",
        expected: 405,
      },
    ],
    request: { method: 'POST', path: '/meny' },
  },
  {
    id: 'forsta-08',
    track: 'forsta',
    title: 'Två funktioner med samma namn',
    xp: 15,
    description:
      'Appen startar inte. Felet säger att en vägfunktion skrivs över.',
    explain:
      'Flask känner igen varje väg på funktionens namn. Har två vägar funktioner som heter likadant vet Flask inte vilken som är vilken, och stoppar med `AssertionError: View function mapping is overwriting an existing endpoint function`.\n\nByt namn på den ena.',
    example:
      "@app.get('/a')\ndef sida_a():\n    ...\n\n@app.get('/b')\ndef sida_b():\n    ...",
    task: 'Uppgift: Laga appen så att båda vägarna fungerar.',
    starterCode: `${IMPORT}\n@app.get('/')\ndef sida():\n    return 'Start'\n\n\n@app.get('/om')\ndef sida():\n    return 'Om oss'\n`,
    solution: `${IMPORT}\n@app.get('/')\ndef sida():\n    return 'Start'\n\n\n@app.get('/om')\ndef om():\n    return 'Om oss'\n`,
    hints: [
      'Läs felet: vilket namn finns två gånger?',
      'Byt namn på den andra funktionen.',
      "@app.get('/om')\ndef om():",
    ],
    tests: [
      {
        description: "/ svarar 'Start'",
        code: "__get('/').text",
        expected: 'Start',
      },
      {
        description: "/om svarar 'Om oss'",
        code: "__get('/om').text",
        expected: 'Om oss',
      },
    ],
  },
  {
    id: 'forsta-09',
    track: 'forsta',
    title: 'app.run',
    xp: 10,
    description:
      'På din egen dator startar `app.run()` en server. Den står sist i nästan alla Flask-appar.',
    explain:
      '`if __name__ == \'__main__\':` betyder "om filen körs direkt". Då startar `app.run(debug=True)` en server på `http://127.0.0.1:5000`, och `debug=True` startar om den när du sparar.\n\nI Kodskolan anropas appen direkt, så raden gör ingenting här – men skriv den, så fungerar koden också på din egen dator.',
    example: "if __name__ == '__main__':\n    app.run(debug=True)",
    task: "Uppgift: Lägg till `if __name__ == '__main__':` och `app.run(debug=True)` sist i appen.",
    starterCode: `${IMPORT}\n@app.get('/')\ndef start():\n    return 'Startsidan'\n`,
    solution: `${IMPORT}\n@app.get('/')\ndef start():\n    return 'Startsidan'\n\n\nif __name__ == '__main__':\n    app.run(debug=True)\n`,
    hints: [
      'Sist i filen, utan indrag.',
      "if __name__ == '__main__':",
      '    app.run(debug=True)',
    ],
    tests: [
      {
        description: 'Appen fungerar',
        code: "__get('/').text",
        expected: 'Startsidan',
      },
    ],
    sourceChecks: [
      {
        description: 'Har app.run i if __name__',
        pattern: /if __name__ == ['"]__main__['"]:\s*\n\s+app\.run\(/,
      },
    ],
  },
];
