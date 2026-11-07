// Bana 3: JSON. Ett API svarar med data i stället för sidor. Flask gör om
// dict och list till JSON själv, och ett svar kan få en egen statuskod.

const IMPORT = 'from flask import Flask\n\napp = Flask(__name__)\n';
const HUNDAR =
  "hundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner', 'alder': 4},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax', 'alder': 2},\n    {'id': 3, 'namn': 'Rufus', 'ras': 'pudel', 'alder': 7},\n]\n";
const MED_HUNDAR = `${IMPORT}\n${HUNDAR}`;

export const JSON_BANA = [
  {
    id: 'json-01',
    track: 'json',
    title: 'Svara med en dictionary',
    xp: 10,
    description:
      'Returnerar vägfunktionen en dictionary blir svaret JSON – det språk appar använder för att skicka data till varandra.',
    explain:
      'JSON ser nästan ut som en Python-dictionary: `{"namn": "Bryggkaffe", "pris": 35}`. Skillnaden är bara detaljer, som `true` i stället för `True`.\n\nFlask gör om en `dict` till JSON och säger att svaret är `application/json`. En app eller en annan sajt kan sedan läsa det.',
    example:
      "@app.get('/te')\ndef te():\n    return {'namn': 'Grönt te', 'pris': 30}",
    task: "Uppgift: `/kaffe` ska svara med `{'namn': 'Bryggkaffe', 'pris': 35}`.",
    starterCode: IMPORT,
    solution: `${IMPORT}\n@app.get('/kaffe')\ndef kaffe():\n    return {'namn': 'Bryggkaffe', 'pris': 35}\n`,
    hints: [
      "@app.get('/kaffe')",
      'Returnera en dictionary.',
      "return {'namn': 'Bryggkaffe', 'pris': 35}",
    ],
    tests: [
      {
        description: 'Rätt data',
        code: "__get('/kaffe').json",
        expected: { namn: 'Bryggkaffe', pris: 35 },
      },
      {
        description: 'Svaret är JSON',
        code: "__get('/kaffe').typ",
        expected: 'application/json',
      },
    ],
    request: { path: '/kaffe' },
  },
  {
    id: 'json-02',
    track: 'json',
    title: 'Svara med en lista',
    xp: 10,
    description:
      'En lista blir också JSON. Det vanliga är en lista med dictionaries.',
    explain:
      'Ett API svarar ofta med en lista: alla hundar, alla produkter. Varje sak är en dictionary med samma nycklar.',
    example: "@app.get('/stader')\ndef stader():\n    return ['Lund', 'Umeå']",
    task: 'Uppgift: `/hundar` ska svara med hela listan `hundar`.',
    starterCode: MED_HUNDAR,
    solution: `${MED_HUNDAR}\n\n@app.get('/hundar')\ndef lista():\n    return hundar\n`,
    hints: ["@app.get('/hundar')", 'Returnera listan.', 'return hundar'],
    tests: [
      {
        description: 'Tre hundar',
        code: "len(__get('/hundar').json)",
        expected: 3,
      },
      {
        description: 'Första är Bamse',
        code: "__get('/hundar').json[0]['namn']",
        expected: 'Bamse',
      },
    ],
    request: { path: '/hundar' },
  },
  {
    id: 'json-03',
    track: 'json',
    title: 'jsonify',
    xp: 10,
    description:
      'I äldre Flask-kod ser du ofta `jsonify(...)`. Det gör samma sak, men fungerar för allt som går att göra till JSON.',
    explain:
      '`return jsonify(hundar)` och `return hundar` ger samma svar. `jsonify` behövdes förr för listor, och du kommer att se den i nästan alla exempel på nätet.',
    example:
      "from flask import Flask, jsonify\n\n@app.get('/svar')\ndef svar():\n    return jsonify(ok=True)",
    task: 'Uppgift: Importera `jsonify` och låt `/namn` svara med `jsonify` av en lista med hundarnas namn.',
    starterCode: `from flask import Flask\n\napp = Flask(__name__)\n\n${HUNDAR}`,
    solution: `from flask import Flask, jsonify\n\napp = Flask(__name__)\n\n${HUNDAR}\n\n@app.get('/namn')\ndef namn():\n    return jsonify([hund['namn'] for hund in hundar])\n`,
    hints: [
      'from flask import Flask, jsonify',
      "[hund['namn'] for hund in hundar]",
      "return jsonify([hund['namn'] for hund in hundar])",
    ],
    tests: [
      {
        description: 'Namnen',
        code: "__get('/namn').json",
        expected: ['Bamse', 'Saga', 'Rufus'],
      },
    ],
    sourceChecks: [{ description: 'Använder jsonify', pattern: /jsonify\(/ }],
    request: { path: '/namn' },
  },
  {
    id: 'json-04',
    track: 'json',
    title: 'Hitta en med id',
    xp: 15,
    description:
      'Ett API har nästan alltid en väg för att hämta en enda sak med dess id.',
    explain:
      "`next((h for h in hundar if h['id'] == id), None)` letar upp den första hunden med rätt id, eller ger `None`.\n\nEn vanlig for-loop som returnerar när den hittar fungerar lika bra.",
    example:
      "for hund in hundar:\n    if hund['id'] == id:\n        return hund",
    task: 'Uppgift: Skapa `/hundar/<int:id>` som svarar med hunden med det id:t. (Vad som händer när den inte finns kommer i nästa övning.)',
    starterCode: MED_HUNDAR,
    solution: `${MED_HUNDAR}\n\n@app.get('/hundar/<int:id>')\ndef hund(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return {'fel': 'Finns inte'}\n`,
    hints: [
      'En for-loop över hundar.',
      "if hund['id'] == id: return hund",
      "Efter loopen: return {'fel': 'Finns inte'}",
    ],
    tests: [
      {
        description: 'Hund 2 är Saga',
        code: "__get('/hundar/2').json['namn']",
        expected: 'Saga',
      },
    ],
    request: { path: '/hundar/2' },
  },
  {
    id: 'json-05',
    track: 'json',
    title: 'En egen statuskod',
    xp: 15,
    description:
      'Svaret "finns inte" ska ha statuskoden 404, så att appen som frågar förstår det.',
    explain:
      "Returnera två saker med komma emellan: `return {'fel': 'Finns inte'}, 404`. Det första är innehållet och det andra statuskoden.\n\nUtan den svarar Flask `200 OK` – fast det inte gick bra.",
    example: "return {'fel': 'Ingen sådan bok'}, 404",
    task: "Uppgift: Laga vägen så att en hund som inte finns ger `{'fel': 'Finns inte'}` med statuskoden 404.",
    starterCode: `${MED_HUNDAR}\n\n@app.get('/hundar/<int:id>')\ndef hund(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return {'fel': 'Finns inte'}\n`,
    solution: `${MED_HUNDAR}\n\n@app.get('/hundar/<int:id>')\ndef hund(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return {'fel': 'Finns inte'}, 404\n`,
    hints: [
      'Bara sista raden ska ändras.',
      'Lägg till , 404 efter dictionaryn.',
      "return {'fel': 'Finns inte'}, 404",
    ],
    tests: [
      {
        description: 'Hund 9 ger 404',
        code: "__get('/hundar/9').status",
        expected: 404,
      },
      {
        description: 'Hund 1 ger 200',
        code: "__get('/hundar/1').status",
        expected: 200,
      },
    ],
    request: { path: '/hundar/9' },
  },
  {
    id: 'json-06',
    track: 'json',
    title: 'Räkna ut svaret',
    xp: 15,
    description:
      'Ett svar behöver inte vara sparad data. Det kan räknas ut vid varje anrop.',
    explain:
      'En väg som `/statistik` sammanfattar datan. Allt räknas ut när någon frågar, så svaret stämmer alltid med listan.',
    example: "return {'antal': len(hundar)}",
    task: "Uppgift: `/statistik` ska svara med `{'antal': 3, 'snittalder': 4.33}` – antalet hundar och medelåldern avrundad till två decimaler.",
    starterCode: MED_HUNDAR,
    solution: `${MED_HUNDAR}\n\n@app.get('/statistik')\ndef statistik():\n    alder = [hund['alder'] for hund in hundar]\n    return {'antal': len(hundar), 'snittalder': round(sum(alder) / len(alder), 2)}\n`,
    hints: [
      "[hund['alder'] for hund in hundar]",
      'round(…, 2)',
      "return {'antal': len(hundar), 'snittalder': round(sum(alder) / len(alder), 2)}",
    ],
    tests: [
      {
        description: 'Statistiken',
        code: "__get('/statistik').json",
        expected: { antal: 3, snittalder: 4.33 },
      },
    ],
    request: { path: '/statistik' },
  },
  {
    id: 'json-07',
    track: 'json',
    title: 'Bara en del av listan',
    xp: 15,
    description:
      'Ett API kan ha vägar som filtrerar listan på något i adressen.',
    explain:
      'En list comprehension med `if` plockar ut hundarna av en viss ras. En tom lista är ett helt okej svar – det finns bara inga.',
    example: "[h for h in hundar if h['alder'] > 5]",
    task: 'Uppgift: Skapa `/ras/<ras>` som svarar med alla hundar av den rasen.',
    starterCode: MED_HUNDAR,
    solution: `${MED_HUNDAR}\n\n@app.get('/ras/<ras>')\ndef per_ras(ras):\n    return [hund for hund in hundar if hund['ras'] == ras]\n`,
    hints: [
      "@app.get('/ras/<ras>')",
      "[hund for hund in hundar if hund['ras'] == ras]",
      'Funktionen kan inte heta ras, för det heter parametern.',
    ],
    tests: [
      {
        description: 'Taxar',
        code: "[h['namn'] for h in __get('/ras/tax').json]",
        expected: ['Saga'],
      },
      {
        description: 'Inga katter',
        code: "__get('/ras/katt').json",
        expected: [],
      },
    ],
    request: { path: '/ras/tax' },
  },
  {
    id: 'json-08',
    track: 'json',
    title: 'Inget svar alls',
    xp: 15,
    description:
      'Appen kraschar med `TypeError: The view function … did not return a valid response`.',
    explain:
      'En vägfunktion måste alltid returnera något. Här finns en väg genom funktionen där inget returneras – då returnerar Python `None`, och det kan Flask inte skicka.\n\nAnropa `/hundar/9` med 📮 och läs felet.',
    example:
      "for hund in hundar:\n    if …:\n        return hund\nreturn {'fel': 'Finns inte'}, 404",
    task: 'Uppgift: Laga vägen så att den alltid svarar. En hund som inte finns ska ge 404.',
    starterCode: `${MED_HUNDAR}\n\n@app.get('/hundar/<int:id>')\ndef hund(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n`,
    solution: `${MED_HUNDAR}\n\n@app.get('/hundar/<int:id>')\ndef hund(id):\n    for hund in hundar:\n        if hund['id'] == id:\n            return hund\n    return {'fel': 'Finns inte'}, 404\n`,
    hints: [
      'Vad returnerar funktionen om ingen hund har id:t?',
      'Lägg till en return efter loopen.',
      "return {'fel': 'Finns inte'}, 404",
    ],
    tests: [
      {
        description: 'Hund 9 ger 404',
        code: "__get('/hundar/9').status",
        expected: 404,
      },
      {
        description: 'Hund 3 är Rufus',
        code: "__get('/hundar/3').json['namn']",
        expected: 'Rufus',
      },
    ],
    request: { path: '/hundar/9' },
  },
  {
    id: 'json-09',
    track: 'json',
    title: 'Sorterat svar',
    xp: 15,
    description: 'Ett svar kan sorteras innan det skickas.',
    explain:
      "`sorted(hundar, key=lambda h: h['alder'])` ger en ny lista sorterad på ålder. Listan i appen ändras inte.\n\nMed `reverse=True` blir det äldst först.",
    example: "sorted(varor, key=lambda v: v['pris'])",
    task: 'Uppgift: `/aldst` ska svara med hundarnas namn, äldst först.',
    starterCode: MED_HUNDAR,
    solution: `${MED_HUNDAR}\n\n@app.get('/aldst')\ndef aldst():\n    ordning = sorted(hundar, key=lambda h: h['alder'], reverse=True)\n    return [hund['namn'] for hund in ordning]\n`,
    hints: [
      "sorted(hundar, key=lambda h: h['alder'], reverse=True)",
      'Plocka sedan ut namnen.',
      "return [hund['namn'] for hund in ordning]",
    ],
    tests: [
      {
        description: 'Äldst först',
        code: "__get('/aldst').json",
        expected: ['Rufus', 'Bamse', 'Saga'],
      },
    ],
    request: { path: '/aldst' },
  },
];
