// Frågor för nivåtestet och för "Testa dig förbi". Fyra frågor per bana.
// Det rätta svaret står alltid först i options. En fråga med code och check
// körs i quiz.test.js mot låtsasmodellen (modell är dess regler).
export const QUIZ = {
  modell: [
    {
      question: 'Vad betyder stop_reason "max_tokens"?',
      options: [
        'Svaret klipptes för att det nådde taket',
        'Modellen var klar',
        'Modellen vill använda ett verktyg',
        'Anropet var fel',
      ],
      explain: 'Höj max_tokens eller be om ett kortare svar.',
    },
    {
      question: 'Vad skrivs ut?',
      code: "import anthropic\n\nclient = anthropic.Anthropic()\nsvar = client.messages.create(model='claude-opus-5-5', max_tokens=100, messages=[{'role': 'user', 'content': 'Vad är 9 + 1?'}])",
      check: 'svar.content[0].text',
      options: ['Det blir 10.', 'Det blir 91.', '10', 'end_turn'],
      explain: 'Texten står i textblocket i svar.content.',
    },
    {
      question: 'Var ska API-nyckeln stå?',
      options: [
        'I en miljövariabel, som ANTHROPIC_API_KEY',
        'Överst i koden',
        'I en kommentar',
        'I prompten',
      ],
      explain: 'En nyckel i koden kan läcka, till exempel när koden delas.',
    },
    {
      question: 'Vilket fel är värt att försöka igen?',
      options: [
        'RateLimitError',
        'BadRequestError',
        'NotFoundError',
        'AuthenticationError',
      ],
      explain: 'För många anrop går över. Ett fel i anropet blir fel igen.',
    },
  ],
};
