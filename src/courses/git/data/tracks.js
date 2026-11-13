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
  {
    id: 'andringar',
    title: 'Ändringar',
    teaches: ['git diff', 'git restore', 'commit -am', '.gitignore', 'git rm'],
    reward: { emoji: '↩️', name: 'Ångerknapp' },
    canBuild:
      'ett repo där du ser exakt vad du ändrat, kan ångra misstag och aldrig råkar committa ett lösenord',
    docs: [
      { title: 'gitignore', url: 'https://git-scm.com/docs/gitignore' },
      { title: 'git restore', url: 'https://git-scm.com/docs/git-restore' },
    ],
  },
  {
    id: 'grenar',
    title: 'Grenar',
    teaches: ['git branch', 'git switch', 'git merge'],
    reward: { emoji: '🌳', name: 'Träd' },
    canBuild:
      'nya delar av ett projekt på egna grenar, och slå ihop dem när de är klara',
    docs: [
      {
        title: 'Pro Git: Grenar',
        url: 'https://git-scm.com/book/sv/v2/Git-f%C3%B6rgreningar-Grenar-i-korthet',
      },
      {
        title: 'Learn Git Branching (interaktivt)',
        url: 'https://learngitbranching.js.org/?locale=sv_SE',
      },
    ],
  },
  {
    id: 'konflikter',
    title: 'Konflikter',
    teaches: ['merge-konflikter', 'konfliktmarkeringar', 'git merge main'],
    reward: { emoji: '🤝', name: 'Handslag' },
    canBuild:
      'samarbete där två ändrar samma fil – och lugnt lösa det när Git säger CONFLICT',
    docs: [
      {
        title: 'Lösa konflikter (GitHub)',
        url: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line',
      },
      {
        title: 'Pro Git: Konflikter',
        url: 'https://git-scm.com/book/sv/v2/Git-f%C3%B6rgreningar-Grundl%C3%A4ggande-f%C3%B6rgrening-och-sammanslagning',
      },
    ],
  },
  {
    id: 'github',
    title: 'GitHub',
    teaches: ['git remote', 'git push', 'git clone', 'git pull', 'README'],
    reward: { emoji: '☁️', name: 'Moln' },
    canBuild: 'projekt på GitHub som andra kan se, hämta och bidra till',
    docs: [
      {
        title: 'GitHub: kom igång',
        url: 'https://docs.github.com/en/get-started/start-your-journey/hello-world',
      },
      {
        title: 'Markdown på GitHub',
        url: 'https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax',
      },
    ],
  },
  {
    id: 'arbetsflode',
    title: 'Arbetsflödet',
    teaches: [
      'grenar i team',
      'pull requests',
      'git pull origin main',
      'git revert',
    ],
    reward: { emoji: '🚀', name: 'Raket' },
    canBuild:
      'samarbete i ett team som proffsen: en gren per ändring, pull requests och säkra ångringar',
    docs: [
      {
        title: 'GitHub flow',
        url: 'https://docs.github.com/en/get-started/using-github/github-flow',
      },
      {
        title: 'Om pull requests',
        url: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests',
      },
    ],
  },
];
