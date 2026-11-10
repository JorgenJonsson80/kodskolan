// Banorna i ordning. reward är föremålet eleven får när banan är klar, och
// canBuild avslutar meningen "Nu kan du t.ex. bygga …" i firandet. docs
// länkar till Claudes dokumentation (på engelska). Planen för alla banor
// står i docs/kurser/ai.md.
const DOCS = 'https://platform.claude.com/docs/en/';

export const TRACKS = [
  {
    id: 'modell',
    title: 'Vad är en modell?',
    teaches: [
      'Anthropic()',
      'messages.create',
      'content-block',
      'stop_reason',
      'tokens',
      'API-nyckel',
    ],
    reward: { emoji: '🤖', name: 'Robot' },
    canBuild: 'ett program som frågar en AI och klarar när något går snett',
    docs: [
      { title: 'Get started', url: `${DOCS}get-started` },
      {
        title: 'Messages API',
        url: `${DOCS}build-with-claude/working-with-messages`,
      },
    ],
  },
];
