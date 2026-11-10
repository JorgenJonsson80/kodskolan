// Delar en övnings förklaring i block: kodblock (``` … ```), listor (varje
// rad börjar med "- ") och vanliga stycken. Stycken skiljs åt av en tom
// rad, men inne i ett kodblock får det finnas tomma rader.
const FENCE = /```[\w-]*\n?([\s\S]*?)\n?```/g;

function paragraphs(text) {
  return text
    .split('\n\n')
    .map(part => part.trim())
    .filter(Boolean)
    .map(part => {
      const lines = part.split('\n');
      return lines.every(line => line.startsWith('- '))
        ? { type: 'list', items: lines.map(line => line.slice(2)) }
        : { type: 'text', text: part };
    });
}

export function explainBlocks(explain) {
  const blocks = [];
  let rest = 0;
  for (const match of explain.matchAll(FENCE)) {
    blocks.push(...paragraphs(explain.slice(rest, match.index)));
    blocks.push({ type: 'code', code: match[1] });
    rest = match.index + match[0].length;
  }
  blocks.push(...paragraphs(explain.slice(rest)));
  return blocks;
}
