// Egna saker att prova på Lekplatsen när ett projekt på banan är klart.
export const IDEAS = [];

export function ideaStarterCode(idea) {
  if (!idea) return '# Prova vad du vill: pwd, ls, mkdir, git init …\n';
  return `# ${idea.emoji} ${idea.title}\n${idea.goals.map((goal, index) => `# ${index + 1}. ${goal}`).join('\n')}\n`;
}
