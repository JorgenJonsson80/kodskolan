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
  {
    id: 'embeddings',
    title: 'Embeddings',
    teaches: [
      'text som vektorer',
      'ordförråd',
      'cosinuslikhet',
      'topp k',
      'ett index',
    ],
    reward: { emoji: '🧭', name: 'Kompass' },
    canBuild: 'en sökning och en rekommendation som hittar det som liknar',
    docs: [
      { title: 'Embeddings', url: `${DOCS}build-with-claude/embeddings` },
      {
        title: 'Cosine similarity',
        url: 'https://en.wikipedia.org/wiki/Cosine_similarity',
      },
    ],
  },
  {
    id: 'rag',
    title: 'Egna dokument (RAG)',
    teaches: [
      'dela upp text',
      'hitta bitar',
      'dokument i taggar',
      'svara bara utifrån',
      'källor',
      'hemligheter',
    ],
    reward: { emoji: '📚', name: 'Bokhylla' },
    canBuild:
      'en AI som svarar på frågor om dina egna dokument och visar källan',
    docs: [
      {
        title: 'Retrieval-augmented generation',
        url: 'https://en.wikipedia.org/wiki/Retrieval-augmented_generation',
      },
      {
        title: 'Reduce hallucinations',
        url: `${DOCS}test-and-evaluate/strengthen-guardrails/reduce-hallucinations`,
      },
    ],
  },
  {
    id: 'agent',
    title: 'Agenter',
    teaches: [
      'loopen',
      'spärr',
      'logg',
      'instruktioner',
      'fel på vägen',
      'fråga först',
      'budget',
    ],
    reward: { emoji: '🕹️', name: 'Styrspak' },
    canBuild:
      'en agent som löser uppgifter i flera steg, men frågar innan den gör något på riktigt',
    docs: [
      {
        title: 'Building effective agents',
        url: 'https://www.anthropic.com/engineering/building-effective-agents',
      },
      { title: 'Tool use', url: `${DOCS}agents-and-tools/tool-use/overview` },
    ],
  },
  {
    id: 'utvardering',
    title: 'Testa AI',
    teaches: [
      'testfall',
      'normalisera',
      'nyckelord',
      'poäng',
      'AI som domare',
      'säkerhetstester',
    ],
    reward: { emoji: '🔬', name: 'Mikroskop' },
    canBuild:
      'en eval som visar om en ändring i prompten gjorde AI:n bättre eller sämre',
    docs: [
      {
        title: 'Define success criteria',
        url: `${DOCS}test-and-evaluate/define-success`,
      },
      { title: 'Develop tests', url: `${DOCS}test-and-evaluate/develop-tests` },
    ],
  },
];
