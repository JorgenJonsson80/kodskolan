// Egna analyser att göra på Lekplatsen när ett projekt på banan är klart.
// Här finns inga tester – eleven bestämmer själv när det är klart.
// Fylls på bana för bana.
export const IDEAS = [];

const goalLines = idea =>
  idea.goals
    .map((goal, index) => `# ${index + 1}. ${goal.replace(/`/g, '')}`)
    .join('\n');

export function ideaStarterCode(idea) {
  if (!idea) {
    return 'import pandas as pd\n\ndf = pd.DataFrame({\n    "produkt": ["Latte", "Kanelbulle", "Latte"],\n    "antal": [1, 2, 1],\n})\nprint(df.groupby("produkt")["antal"].sum())\n';
  }
  return `# ${idea.emoji} ${idea.title}\n${goalLines(idea)}\n\nimport pandas as pd\n`;
}
