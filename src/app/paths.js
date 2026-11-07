// Spåren: kurser i en ordning som leder mot ett mål. Ett spår är klart när
// alla dess kurser är klara, och då kan eleven få ett spårdiplom.
export const PATHS = [
  {
    id: 'webb',
    icon: '🌐',
    title: 'Webbutvecklare',
    summary:
      'Bygg sajter och appar för webben: HTML och CSS, sedan JavaScript med React, och sist TypeScript.',
    courses: ['html', 'js', 'ts'],
  },
  {
    id: 'backend',
    icon: '🐍',
    title: 'Backend',
    summary:
      'Det som händer bakom sajten: Python, databaser med SQL och egna webb-API:er med Flask.',
    courses: ['python', 'sql', 'flask'],
  },
  {
    id: 'data',
    icon: '📊',
    title: 'Data',
    summary:
      'Räkna, sortera och visa data: Python med pandas och Streamlit, och SQL för att fråga databaser.',
    courses: ['python', 'sql'],
  },
  {
    id: 'fullstack',
    icon: '🚀',
    title: 'Fullstack',
    summary:
      'Allt från sidan till databasen: hela Webbutvecklare och Backend, och sist ett projekt där en React-sida pratar med ditt eget API.',
    courses: ['html', 'js', 'ts', 'python', 'sql', 'flask', 'fullstack'],
  },
];
