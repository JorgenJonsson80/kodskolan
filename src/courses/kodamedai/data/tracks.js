// Banorna i ordning, se docs/kurser/kodamedai.md. Fylls på bana för bana.
export const TRACKS = [
  {
    id: 'verktyg',
    title: 'AI-verktygen',
    teaches: ['chatt, editor och agent', 'vad man får skicka', 'ansvar'],
    reward: { emoji: '🧰', name: 'Verktygslåda' },
    canBuild:
      'ett säkert sätt att använda AI-verktyg, för dig själv och ditt team',
    docs: [
      {
        title: 'Claude Code: säkerhet',
        url: 'https://code.claude.com/docs/en/security',
      },
      {
        title: 'GitHub Copilot: ansvarsfull användning',
        url: 'https://docs.github.com/en/copilot/responsible-use-of-github-copilot-features',
      },
    ],
  },
  {
    id: 'bestall',
    title: 'Beställ rätt',
    teaches: [
      'tydlig uppgift',
      'exempel',
      'kantfall',
      'ramar',
      'en sak i taget',
    ],
    reward: { emoji: '📋', name: 'Beställning' },
    canBuild:
      'beställningar som ger rätt kod första gången: tydliga, med exempel och kantfall',
    docs: [
      {
        title: 'Anthropic: tydliga instruktioner',
        url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/be-clear-and-direct',
      },
    ],
  },
];
