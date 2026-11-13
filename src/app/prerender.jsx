import { renderToString } from 'react-dom/server';
import { CourseInfo } from './CoursePage';
import { COURSE_INFO } from './courseInfo';
import { COURSES } from './courses';
import Home from './Home';
import { LEGAL } from './legal';
import LegalPage from './LegalPage';
import { PATHS } from './paths';

// Sidorna som skrivs ut som färdig HTML vid bygget (scripts/prerender.mjs).
// Varje adress får en egen index.html, så att GitHub Pages svarar 200 och
// inte 404, och sökmotorer och länkförhandsvisningar får rätt titel och
// beskrivning. html hamnar i #root och byts ut när sidans kod startat.
// sitemap: om sidan ska stå i sitemap.xml. noindex: sökmotorerna ska låta
// bli den (sidor som bara gäller den inloggade).
export async function prerenderPages() {
  const pages = [
    {
      path: '',
      title: 'Kodskolan – lär dig programmera på svenska',
      description:
        'Lär dig koda på svenska, från noll. Python, HTML och CSS, JavaScript, React, SQL, TypeScript och Flask, med riktig kod direkt i webbläsaren. Gratis att börja.',
      html: renderToString(<Home />),
      sitemap: true,
    },
    {
      path: 'spar/',
      title: 'Spår – Kodskolan',
      description: `Kurser i en ordning som leder mot ett mål: ${PATHS.map(path => path.title).join(', ')}.`,
      sitemap: true,
    },
    {
      path: 'konto/',
      title: 'Mitt konto och data – Kodskolan',
      description:
        'Det Kodskolan sparar om dig, och hur du laddar ner eller raderar det.',
      noindex: true,
    },
    {
      path: 'larare/',
      title: 'För lärare – Kodskolan',
      description:
        'Skapa en klass, dela en länk med eleverna och följ hur långt varje elev kommit i kurserna.',
      sitemap: true,
    },
    ...Object.entries(LEGAL).map(([kind, legal]) => ({
      path: `${kind}/`,
      title: `${legal.title} – Kodskolan`,
      description: legal.description,
      html: renderToString(<LegalPage kind={kind} />),
      sitemap: true,
    })),
  ];
  for (const course of COURSES) {
    const info = COURSE_INFO[course.id];
    if (!info || course.href) continue;
    const summary = await course.summary();
    pages.push({
      path: `kurser/${course.id}/`,
      title: `${info.title} – Kodskolan`,
      description: info.description,
      html: renderToString(<CourseInfo course={course} summary={summary} />),
      sitemap: true,
      course: { name: info.title, description: info.description },
    });
    pages.push({
      path: `${course.id}/`,
      title: `${course.name} – Kodskolan`,
      description: info.description,
    });
  }
  return pages;
}
