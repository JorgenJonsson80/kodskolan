import { contactUrl, problemReportUrl } from '../lib/contact';

// Längst ner på varje sida: loggan och sloganen, och länkarna i tre
// kolumner. I en kurs tar felrapporten med kursen och övningen.
export default function SiteFooter({ course, lesson }) {
  const report = problemReportUrl({ course, lesson });
  const contact = contactUrl();
  const base = import.meta.env.BASE_URL;
  const columns = [
    {
      title: 'Lär dig',
      links: [
        ['Alla kurser', `${base}#kurser`],
        ['Spår', `${base}spar`],
        ['Börja med Python', `${base}python`],
      ],
    },
    {
      title: 'Kodskolan',
      links: [
        ['För lärare', `${base}larare`],
        contact && ['Kontakt', contact],
        report && ['Något fungerar inte?', report],
      ],
    },
    {
      title: 'Ditt konto',
      links: [
        ['Mitt konto och data', `${base}konto`],
        ['Integritet', `${base}integritet`],
        ['Villkor', `${base}villkor`],
      ],
    },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <a className="footer-logo" href={base}>
            <img src={`${base}logo-mark.png`} alt="" width="28" height="28" />
            Kodskolan
          </a>
          <p className="footer-slogan">Koda på svenska. Bygg på riktigt.</p>
          <p className="footer-about">
            Lär dig programmera från noll, med riktig kod direkt i webbläsaren.
          </p>
        </div>
        {columns.map(column => (
          <nav
            key={`fot-${column.title}`}
            className="footer-column"
            aria-label={column.title}
          >
            <h2>{column.title}</h2>
            <ul>
              {column.links.filter(Boolean).map(([text, href]) => (
                <li key={`fot-${text}`}>
                  <a href={href}>{text}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Kodskolan</span>
        <span>Gjord i Sverige 🇸🇪</span>
      </div>
    </footer>
  );
}
