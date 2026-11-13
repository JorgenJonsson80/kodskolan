// Egna saker att prova på Lekplatsen när ett projekt på banan är klart.
// Fylls på bana för bana.
export const IDEAS = [];

const goalLines = idea =>
  idea.goals
    .map((goal, index) => `# ${index + 1}. ${goal.replace(/`/g, '')}`)
    .join('\n');

export function ideaStarterCode(idea) {
  if (!idea) return '# Klistra in kod från en AI-assistent här och testa den\n';
  return `# ${idea.emoji} ${idea.title}\n${goalLines(idea)}\n`;
}
