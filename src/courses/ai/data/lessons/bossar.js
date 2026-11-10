// En boss per bana: en större uppgift som använder allt från banan, utan
// ledtrådar. Banan räknas inte som klar förrän bossen är besegrad.
// index.js lägger varje boss sist i sin bana.
const BOSS_INTRO = 'Bossen har inga ledtrådar – visa vad du kan! ';
const M = 'claude-opus-5-5';

export const BOSSES = {
  modell: {
    id: 'ai-modell-boss',
    track: 'modell',
    title: 'Boss: En robust fråga',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Skriv funktionen som resten av kursen kan bygga på: den frågar modellen och klarar allt som kan gå snett.',
    task: `Uppgift: Skriv \`fraga(text, tak=1000)\` som returnerar en dict \`{'svar': …, 'klar': …, 'dollar': …}\`.
  1. \`svar\` är texten, hämtad efter typ. Klipptes svaret läggs \`' …'\` till.
  2. \`klar\` är \`True\` om modellen var klar (\`end_turn\`), annars \`False\`.
  3. \`dollar\` är kostnaden: 4 dollar per miljon input-tokens och 20 per miljon output-tokens.
  4. Vid \`RateLimitError\` försöker den igen, högst 3 gånger totalt. Går det inte: \`{'svar': 'Försök senare', 'klar': False, 'dollar': 0}\`.
  5. Vid andra fel från API:et: \`{'svar': 'Fel: ' + felets message, 'klar': False, 'dollar': 0}\`.`,
    starterCode: 'import anthropic\n\nclient = anthropic.Anthropic()\n',
    solution: `import anthropic\n\nclient = anthropic.Anthropic()\n\n\ndef fraga(text, tak=1000):\n    for forsok in range(3):\n        try:\n            svar = client.messages.create(\n                model='${M}',\n                max_tokens=tak,\n                messages=[{'role': 'user', 'content': text}],\n            )\n        except anthropic.RateLimitError:\n            continue\n        except anthropic.APIStatusError as fel:\n            return {'svar': 'Fel: ' + fel.message, 'klar': False, 'dollar': 0}\n        texten = next(b.text for b in svar.content if b.type == 'text')\n        if svar.stop_reason == 'max_tokens':\n            texten = texten + ' …'\n        dollar = (svar.usage.input_tokens * 4 + svar.usage.output_tokens * 20) / 1_000_000\n        return {'svar': texten, 'klar': svar.stop_reason == 'end_turn', 'dollar': dollar}\n    return {'svar': 'Försök senare', 'klar': False, 'dollar': 0}\n`,
    hints: [],
    tests: [
      {
        description: 'En vanlig fråga',
        code: "fraga('Vad är 5 + 5?')",
        expected: { svar: 'Det blir 10.', klar: true, dollar: 0.00008 },
      },
      {
        description: 'Ett klippt svar',
        code: "(lambda r: [r['svar'], r['klar']])(fraga('Hej', 2))",
        expected: ['Hej! Hur …', false],
      },
      {
        description: 'Upptaget en gång',
        code: "fraga('Vad är 8 + 8?')['svar']",
        expected: 'Det blir 16.',
      },
      {
        description: 'Alltid upptaget',
        code: "fraga('Kör alltid fast')",
        expected: { svar: 'Försök senare', klar: false, dollar: 0 },
      },
      {
        description: 'Ett fel i anropet',
        code: "fraga('')['svar']",
        expected: 'Fel: messages[0].content: får inte vara tomt.',
      },
    ],
    modell: [
      { om: '8 \\+ 8', fel: 'RateLimitError', ganger: 1 },
      { om: 'alltid fast', fel: 'RateLimitError' },
    ],
  },
};
