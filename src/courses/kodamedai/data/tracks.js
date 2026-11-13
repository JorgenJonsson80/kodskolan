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
  {
    id: 'las',
    title: 'Läs koden du får',
    teaches: ['förutsäga', 'följa loopar', 'gränser i villkor', 'sidoeffekter'],
    reward: { emoji: '🔎', name: 'Lupp' },
    canBuild:
      'läsa AI-kod och veta vad den gör innan du kör den – och hitta det som inte stämmer',
    docs: [
      {
        title: 'Python Tutor: se koden köras',
        url: 'https://pythontutor.com/',
      },
    ],
  },
  {
    id: 'fel',
    title: 'AI:ns vanliga fel',
    teaches: [
      'gränser',
      'tomma listor och texter',
      'text eller tal',
      'off by one',
      'sidoeffekter',
    ],
    reward: { emoji: '🐛', name: 'Bugg' },
    canBuild:
      'hitta och laga felen assistenter gör oftast, innan de hamnar hos någon annan',
    docs: [
      {
        title: 'Vanliga fel i Python',
        url: 'https://docs.python.org/3/tutorial/errors.html',
      },
    ],
  },
  {
    id: 'testa',
    title: 'Testa AI:ns kod',
    teaches: [
      'assert',
      'testfall för gränser och kantfall',
      'sidoeffekter',
      'låta testerna styra',
    ],
    reward: { emoji: '✅', name: 'Bock' },
    canBuild:
      'tester som avslöjar felen i AI-kod, så att du vet att den fungerar i stället för att hoppas',
    docs: [
      {
        title: 'assert i Python',
        url: 'https://docs.python.org/3/reference/simple_stmts.html#the-assert-statement',
      },
      {
        title: 'pytest: kom igång',
        url: 'https://docs.pytest.org/en/stable/getting-started.html',
      },
    ],
  },
  {
    id: 'sakerhet',
    title: 'Säker kod',
    teaches: [
      'hemligheter i miljön',
      'SQL-injektion',
      'kontrollera indata',
      'hasha lösenord',
      'aldrig eval',
    ],
    reward: { emoji: '🔐', name: 'Hänglås' },
    canBuild:
      'kod som håller när någon försöker ta sig in: inga hemligheter i koden, inga injektioner och inga lösenord i klartext',
    docs: [
      { title: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' },
      {
        title: 'secrets i Python',
        url: 'https://docs.python.org/3/library/secrets.html',
      },
    ],
  },
  {
    id: 'refaktor',
    title: 'Gör om och förbättra',
    teaches: [
      'bra namn',
      'konstanter',
      'ta bort upprepning',
      'dela upp funktioner',
      'docstrings',
    ],
    reward: { emoji: '🧽', name: 'Svamp' },
    canBuild:
      'kod från AI som går att läsa och ändra, utan att något går sönder på vägen',
    docs: [
      {
        title: 'PEP 8: läsbar Python',
        url: 'https://peps.python.org/pep-0008/',
      },
      { title: 'Refaktorering', url: 'https://refactoring.guru/refactoring' },
    ],
  },
];
