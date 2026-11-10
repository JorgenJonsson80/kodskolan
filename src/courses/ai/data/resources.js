// Andra sätt att lära sig banans ämnen, för den som kört fast.
// read: en sida i dokumentationen (på engelska). video: en sökning på
// YouTube, eftersom videor kan försvinna men sökningen finns kvar.
const DOCS = 'https://platform.claude.com/docs/en/';

export const RESOURCES = {
  modell: [
    {
      topic: 'Ditt första anrop',
      read: `${DOCS}get-started`,
      video: 'claude api python tutorial',
    },
    {
      topic: 'Vad är tokens?',
      read: `${DOCS}about-claude/pricing`,
      video: 'what are tokens llm explained',
    },
  ],
  prompter: [
    {
      topic: 'Skriva bra prompter',
      read: `${DOCS}build-with-claude/prompt-engineering/overview`,
      video: 'prompt engineering tutorial',
    },
    {
      topic: 'Promptinjektion',
      read: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/',
      video: 'prompt injection explained',
    },
  ],
  samtal: [
    {
      topic: 'Samtal i flera steg',
      read: `${DOCS}build-with-claude/working-with-messages`,
      video: 'claude api conversation history python',
    },
    {
      topic: 'Kontextfönster',
      read: `${DOCS}build-with-claude/context-windows`,
      video: 'llm context window explained',
    },
  ],
  struktur: [
    {
      topic: 'Strukturerade svar',
      read: `${DOCS}build-with-claude/structured-outputs`,
      video: 'llm structured output pydantic',
    },
    {
      topic: 'Pydantic',
      read: 'https://docs.pydantic.dev/latest/concepts/models/',
      video: 'pydantic tutorial python',
    },
  ],
  verktyg: [
    {
      topic: 'Verktyg (tool use)',
      read: `${DOCS}agents-and-tools/tool-use/overview`,
      video: 'claude tool use tutorial python',
    },
    {
      topic: 'Function calling förklarat',
      read: `${DOCS}agents-and-tools/tool-use/implement-tool-use`,
      video: 'llm function calling explained',
    },
  ],
  embeddings: [
    {
      topic: 'Embeddings',
      read: `${DOCS}build-with-claude/embeddings`,
      video: 'embeddings explained simply',
    },
    {
      topic: 'Cosinuslikhet',
      read: 'https://en.wikipedia.org/wiki/Cosine_similarity',
      video: 'cosine similarity explained',
    },
  ],
  rag: [
    {
      topic: 'Vad är RAG?',
      read: 'https://en.wikipedia.org/wiki/Retrieval-augmented_generation',
      video: 'rag retrieval augmented generation explained',
    },
    {
      topic: 'Minska hallucinationer',
      read: `${DOCS}test-and-evaluate/strengthen-guardrails/reduce-hallucinations`,
      video: 'llm hallucination explained',
    },
  ],
  agent: [
    {
      topic: 'Bygga agenter',
      read: 'https://www.anthropic.com/engineering/building-effective-agents',
      video: 'ai agents explained tool use loop',
    },
    {
      topic: 'Säkra agenter',
      read: `${DOCS}agents-and-tools/tool-use/overview`,
      video: 'ai agent human in the loop',
    },
  ],
  utvardering: [
    {
      topic: 'Testa AI',
      read: `${DOCS}test-and-evaluate/develop-tests`,
      video: 'llm evaluation evals tutorial',
    },
    {
      topic: 'AI som domare',
      read: `${DOCS}test-and-evaluate/define-success`,
      video: 'llm as a judge explained',
    },
  ],
};
