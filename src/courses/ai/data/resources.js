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
};
