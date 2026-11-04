// Gör `backticks` i en text till <code>, så att det syns vilka namn och
// värden eleven ska använda.
export default function CodeText({ text }) {
  return text.split(/`([^`]+)`/).map((part, index) =>
    index % 2 === 0 ? (
      part
    ) : (
      <code key={`code-${index}`} className="task-code">
        {part}
      </code>
    ),
  );
}
