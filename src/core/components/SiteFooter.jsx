import { contactUrl, problemReportUrl } from '../lib/contact';

// Längst ner på varje sida: kontakt, felrapport, Mitt konto och data och
// de juridiska sidorna.
// I en kurs tar felrapporten med kursen och övningen.
export default function SiteFooter({ course, lesson }) {
  const report = problemReportUrl({ course, lesson });
  const contact = contactUrl();
  return (
    <footer className="site-footer">
      {report && <a href={report}>🐞 Något fungerar inte?</a>}
      {contact && <a href={contact}>✉️ Kontakt</a>}
      <a href={`${import.meta.env.BASE_URL}konto`}>Mitt konto och data</a>
      <a href={`${import.meta.env.BASE_URL}integritet`}>Integritet</a>
      <a href={`${import.meta.env.BASE_URL}villkor`}>Villkor</a>
    </footer>
  );
}
