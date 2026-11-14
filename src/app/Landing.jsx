import { contactUrl } from '../core/lib/contact';

// Delarna av startsidan som berättar vad Kodskolan är, för den som kommer
// hit första gången (och för sökmotorerna, som också är nya).

const STEPS = [
  {
    icon: '✍️',
    title: 'Skriv riktig kod',
    text: 'Python, HTML, JavaScript, SQL och mer, direkt i webbläsaren. Du behöver inte installera något.',
  },
  {
    icon: '✅',
    title: 'Se direkt om det stämmer',
    text: 'Koden kontrolleras på en gång. Felen förklaras på svenska, och du får ledtrådar när du kör fast.',
  },
  {
    icon: '🎓',
    title: 'Väx och få diplom',
    text: 'Din figur går upp en nivå för varje klar bana. När kursen är klar får du ett diplom med en egen länk.',
  },
];

// Antalet övningar på startsidan. landing.test.js kollar att det stämmer.
export const EXERCISES_TEXT = '1 300+';

export function Stats({ courses }) {
  const items = [
    [`${courses}`, 'kurser'],
    [EXERCISES_TEXT, 'övningar'],
    ['Direkt', 'rättning av din kod'],
    ['100 %', 'på svenska'],
  ];
  return (
    <ul className="hero-stats" aria-label="Kodskolan i siffror">
      {items.map(([value, label]) => (
        <li key={`stat-${label}`}>
          <strong>{value}</strong>
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
}

// Det man kan bygga, med en liten bild av resultatet i stället för text
// om kurserna. Varje kort leder till sitt spår.
const BUILDS = [
  {
    id: 'webb',
    title: 'Din egen hemsida',
    text: 'HTML, CSS och React – från första rubrik till en riktig app.',
    path: 'Webbutvecklare',
    art: (
      <div className="build-art build-site" aria-hidden="true">
        <span className="site-nav" />
        <span className="site-hero" />
        <span className="site-cards">
          <i />
          <i />
          <i />
        </span>
      </div>
    ),
  },
  {
    id: 'data',
    title: 'En dashboard med riktig data',
    text: 'Python, SQL och pandas – ta reda på saker och visa dem i diagram.',
    path: 'Data',
    art: (
      <div className="build-art build-chart" aria-hidden="true">
        {[45, 70, 55, 90, 65, 80].map((height, index) => (
          <i key={`stapel-${index}`} style={{ height: `${height}%` }} />
        ))}
      </div>
    ),
  },
  {
    id: 'ai',
    title: 'En egen AI-chattbot',
    text: 'Språkmodeller, egna dokument och verktyg – bakom ditt eget API.',
    path: 'AI-utvecklare',
    art: (
      <div className="build-art build-chat" aria-hidden="true">
        <span className="chat-me">Vad har ni för öppettider?</span>
        <span className="chat-bot">Vi har öppet 7–18 alla dagar! ☕</span>
        <span className="chat-me">Och glutenfritt?</span>
      </div>
    ),
  },
];

export function BuildShowcase() {
  const base = import.meta.env.BASE_URL;
  return (
    <section aria-labelledby="build-title">
      <h2 id="build-title">Det här kan du bygga</h2>
      <ul className="build-cards">
        {BUILDS.map(build => (
          <li key={`bygg-${build.id}`}>
            <a className="build-card" href={`${base}spar#${build.id}`}>
              {build.art}
              <strong>{build.title}</strong>
              <span className="muted">{build.text}</span>
              <span className="course-progress">Spåret {build.path} →</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section aria-labelledby="how-title">
      <h2 id="how-title">Så funkar det</h2>
      <ol className="landing-steps">
        {STEPS.map(step => (
          <li key={`step-${step.title}`}>
            <span className="landing-icon" aria-hidden="true">
              {step.icon}
            </span>
            <strong>{step.title}</strong>
            <span>{step.text}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ForWhom() {
  const contact = contactUrl();
  return (
    <section aria-labelledby="who-title">
      <h2 id="who-title">För vem?</h2>
      <ul className="landing-steps">
        <li>
          <span className="landing-icon" aria-hidden="true">
            🌱
          </span>
          <strong>Dig som aldrig kodat</strong>
          <span>
            Första övningen är en enda rad. Varje nytt ord förklaras med ett
            exempel innan du använder det.
          </span>
        </li>
        <li>
          <span className="landing-icon" aria-hidden="true">
            💼
          </span>
          <strong>Dig som vill byta jobb</strong>
          <span>
            Spåren leder mot ett mål, som webbutvecklare eller backend, med
            projekt du bygger själv på vägen.
          </span>
        </li>
        <li>
          <span className="landing-icon" aria-hidden="true">
            🏫
          </span>
          <strong>Lärare och skolor</strong>
          <span>
            Eleverna kan börja direkt utan konto eller installation. Ett
            lärarläge är på väg
            {contact ? (
              <>
                {' '}
                – <a href={contact}>hör av dig</a> om du vill testa med en
                klass.
              </>
            ) : (
              '.'
            )}
          </span>
        </li>
      </ul>
    </section>
  );
}

const QUESTIONS = [
  {
    q: 'Behöver jag installera något?',
    a: 'Nej. All kod körs i webbläsaren, även Python, SQL och Flask. Det räcker med en dator och en webbläsare.',
  },
  {
    q: 'Vad kostar det?',
    a: 'Det är gratis att börja, och du behöver inget konto.',
  },
  {
    q: 'Behöver jag ett konto?',
    a: 'Nej. Det du klarat sparas i webbläsaren. Med ett gratis konto följer det med till andra datorer, och du kan spara dina diplom.',
  },
  {
    q: 'Vilken kurs ska jag börja med?',
    a: 'Python om du aldrig kodat förut. HTML & CSS om du helst vill bygga hemsidor. Vill du ha ett mål att sikta mot, välj ett spår.',
  },
  {
    q: 'Vad händer om jag kör fast?',
    a: 'Du får ledtrådar efter några försök, kan köra koden rad för rad och se vad som händer, och hitta förklaringar och videor under Fastnat?. Facit finns också, men det kostar en nyckel som du tjänar genom att klara övningar själv.',
  },
  {
    q: 'Får jag ett diplom?',
    a: 'Ja, när en kurs eller ett spår är klart. Diplomet har en egen länk som du kan dela. Det visar att du klarat alla övningar och bossar, men det är inget övervakat prov.',
  },
  {
    q: 'Fungerar det på mobilen?',
    a: 'Ja, men det är lättare att skriva kod på en dator med tangentbord.',
  },
];

export function Faq() {
  return (
    <section aria-labelledby="faq-title">
      <h2 id="faq-title">Vanliga frågor</h2>
      <div className="landing-faq">
        {QUESTIONS.map(item => (
          <details key={`faq-${item.q}`}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
