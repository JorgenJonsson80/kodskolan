// Den andra filen i projektet: sidan när eleven skriver app.py, och
// API:t när eleven skriver App.tsx. Den går inte att ändra här.
export default function OtherFile({ name, code, what }) {
  return (
    <details className="fullstack-other">
      <summary>
        📄 <code>{name}</code> – {what}
      </summary>
      <pre>{code}</pre>
    </details>
  );
}
