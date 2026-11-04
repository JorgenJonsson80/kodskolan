// Gör `backticks` i en text till <code>, så att det syns vilka namn och
// värden eleven ska använda. **fet** och *kursiv* fungerar utanför koden,
// men inte stjärnor med mellanslag intill, som i "*" * bredd.
function emphasis(text, prefix) {
  return text
    .split(/(\*\*[^*]+\*\*|\*[^*\s](?:[^*]*[^*\s])?\*)/)
    .map((part, index) => {
      const key = `${prefix}-${index}`;
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        return <strong key={key}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
        return <em key={key}>{part.slice(1, -1)}</em>;
      }
      return part;
    });
}

export default function CodeText({ text }) {
  return text.split(/`([^`]+)`/).map((part, index) =>
    index % 2 === 0 ? (
      emphasis(part, `text-${index}`)
    ) : (
      <code key={`code-${index}`} className="task-code">
        {part}
      </code>
    ),
  );
}
