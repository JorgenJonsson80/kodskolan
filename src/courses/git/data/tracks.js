// Banorna i ordning, se docs/kurser/git.md. Fylls på bana för bana.
export const TRACKS = [
  {
    id: 'terminal',
    title: 'Terminalen',
    teaches: ['pwd', 'ls', 'cd', 'mkdir', 'touch', 'echo', 'cat'],
    reward: { emoji: '🖥️', name: 'Terminal' },
    canBuild:
      'en hel projektmapp med mappar och filer på några sekunder, utan att röra musen',
    docs: [
      {
        title: 'Terminalen för nybörjare (MDN)',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line',
      },
      {
        title: 'The Missing Semester: shell',
        url: 'https://missing.csail.mit.edu/2020/course-shell/',
      },
    ],
  },
  {
    id: 'filer',
    title: 'Filer i terminalen',
    teaches: ['cp', 'mv', 'rm', 'rm -r', 'ls -a', 'mkdir -p'],
    reward: { emoji: '🗂️', name: 'Pärm' },
    canBuild:
      'städa en rörig mapp på några sekunder: kopiera, flytta, döpa om och ta bort',
    docs: [
      {
        title: 'Hantera filer i terminalen',
        url: 'https://missing.csail.mit.edu/2020/course-shell/',
      },
    ],
  },
  {
    id: 'commit',
    title: 'Din första commit',
    teaches: ['git init', 'git status', 'git add', 'git commit', 'git log'],
    reward: { emoji: '💾', name: 'Diskett' },
    canBuild:
      'ett projekt där varje version är sparad, så att du alltid kan se vad du gjort och gå tillbaka',
    docs: [
      { title: 'Pro Git: Git grunder', url: 'https://git-scm.com/book/sv/v2' },
      {
        title: 'GitHub: Git på 15 minuter',
        url: 'https://docs.github.com/en/get-started/getting-started-with-git',
      },
    ],
  },
];
