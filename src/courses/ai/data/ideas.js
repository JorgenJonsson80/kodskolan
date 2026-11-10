// Egna program att bygga på Lekplatsen när ett projekt på banan är klart.
// Här finns inga tester – eleven bestämmer själv när det är klart.
export const IDEAS = [];

const goalLines = idea =>
  idea.goals
    .map((goal, index) => `# ${index + 1}. ${goal.replace(/`/g, '')}`)
    .join('\n');

export function ideaStarterCode(idea) {
  if (!idea) {
    return "import anthropic\n\nclient = anthropic.Anthropic()\n\nsvar = client.messages.create(\n    model='claude-opus-5-5',\n    max_tokens=1000,\n    messages=[{'role': 'user', 'content': 'Hej'}],\n)\nprint(svar.content[0].text)\n";
  }
  return `# ${idea.emoji} ${idea.title}\n${goalLines(idea)}\n\nimport anthropic\n\nclient = anthropic.Anthropic()\n`;
}
