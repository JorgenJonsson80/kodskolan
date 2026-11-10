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
  {
    id: 'prompter',
    title: 'Prompter',
    teaches: [
      'system',
      'stil och längd',
      'promptmallar',
      'data i taggar',
      'promptinjektion',
      'exempel',
    ],
    reward: { emoji: '📜', name: 'Skriftrulle' },
    canBuild:
      'en AI-kundtjänst som håller sig till ämnet och inte går att lura',
    docs: [
      {
        title: 'Prompt engineering',
        url: `${DOCS}build-with-claude/prompt-engineering/overview`,
      },
      {
        title: 'System prompts',
        url: `${DOCS}build-with-claude/prompt-engineering/system-prompts`,
      },
    ],
  },
  {
    id: 'samtal',
    title: 'Samtal',
    teaches: [
      'historiken är en lista',
      'assistant',
      'en chatt som klass',
      'korta historiken',
      'spara samtal',
    ],
    reward: { emoji: '💬', name: 'Pratbubbla' },
    canBuild: 'en chattbot som minns hela samtalet och går att spara',
    docs: [
      {
        title: 'Multi-turn conversations',
        url: `${DOCS}build-with-claude/working-with-messages`,
      },
      {
        title: 'Context windows',
        url: `${DOCS}build-with-claude/context-windows`,
      },
    ],
  },
  {
    id: 'struktur',
    title: 'Strukturerade svar',
    teaches: [
      'JSON',
      'json_schema',
      'messages.parse',
      'Pydantic',
      'Literal',
      'ValidationError',
    ],
    reward: { emoji: '🧱', name: 'Byggkloss' },
    canBuild:
      'ett program som gör om fri text till data som går att söka och räkna med',
    docs: [
      {
        title: 'Structured outputs',
        url: `${DOCS}build-with-claude/structured-outputs`,
      },
      {
        title: 'Pydantic models',
        url: 'https://docs.pydantic.dev/latest/concepts/models/',
      },
    ],
  },
  {
    id: 'verktyg',
    title: 'Verktyg',
    teaches: [
      'tools',
      'tool_use',
      'tool_result',
      'flera verktyg',
      'is_error',
      'ingen eval',
    ],
    reward: { emoji: '🔧', name: 'Skiftnyckel' },
    canBuild: 'en assistent som kan slå upp väder, klockan och räkna exakt',
    docs: [
      { title: 'Tool use', url: `${DOCS}agents-and-tools/tool-use/overview` },
      {
        title: 'Implement tool use',
        url: `${DOCS}agents-and-tools/tool-use/implement-tool-use`,
      },
    ],
  },
];
