// En boss per bana: en större uppgift som använder allt från banan, utan
// ledtrådar. Banan räknas inte som klar förrän bossen är besegrad.
// index.js lägger varje boss sist i sin bana.
const BOSS_INTRO = 'Bossen har inga ledtrådar – visa vad du kan! ';
const IMPORT = 'from flask import Flask\n\napp = Flask(__name__)\n';

export const BOSSES = {
  forsta: {
    id: 'forsta-boss',
    track: 'forsta',
    title: 'Boss: Kaféets sajt',
    isBoss: true,
    xp: 40,
    description: BOSS_INTRO + 'Kafé Bönan vill ha en egen sajt med tre sidor.',
    task: `Uppgift: Bygg sajten.
  1. \`/\` svarar \`'<h1>Kafé Bönan</h1>'\`.
  2. \`/meny\` svarar \`'<ul><li>Kaffe 35 kr</li><li>Bulle 32 kr</li></ul>'\`.
  3. \`/oppet\` svarar \`'Vardagar 8–17'\`.
  4. Sist: \`app.run(debug=True)\` i en \`if __name__ == '__main__':\`.`,
    starterCode: IMPORT,
    solution: `${IMPORT}\n@app.get('/')\ndef start():\n    return '<h1>Kafé Bönan</h1>'\n\n\n@app.get('/meny')\ndef meny():\n    return '<ul><li>Kaffe 35 kr</li><li>Bulle 32 kr</li></ul>'\n\n\n@app.get('/oppet')\ndef oppet():\n    return 'Vardagar 8–17'\n\n\nif __name__ == '__main__':\n    app.run(debug=True)\n`,
    hints: [],
    tests: [
      {
        description: 'Startsidan',
        code: "__get('/').text",
        expected: '<h1>Kafé Bönan</h1>',
      },
      {
        description: 'Menyn',
        code: "__get('/meny').text",
        expected: '<ul><li>Kaffe 35 kr</li><li>Bulle 32 kr</li></ul>',
      },
      {
        description: 'Öppettiderna',
        code: "__get('/oppet').text",
        expected: 'Vardagar 8–17',
      },
      {
        description: 'POST /meny ger 405',
        code: "__post('/meny').status",
        expected: 405,
      },
      { description: 'Tre vägar', code: 'len(__vagar())', expected: 3 },
    ],
    sourceChecks: [
      {
        description: 'Har app.run i if __name__',
        pattern: /if __name__ == ['"]__main__['"]:\s*\n\s+app\.run\(/,
      },
    ],
    request: { path: '/meny' },
  },
};
