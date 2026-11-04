// Andra sätt att lära sig banans ämnen, för den som kört fast.
// read: en sida på MDN (på engelska), Tailwinds egen dokumentation eller
// ett spel att öva med.
// video: en sökning på YouTube. Vi länkar till en sökning i stället för
// enskilda videor, eftersom videor kan försvinna men sökningen finns kvar.
const LEARN = 'https://developer.mozilla.org/en-US/docs/Learn_web_development/';

export const RESOURCES = {
  grunder: [
    {
      topic: 'Taggar och element',
      read: `${LEARN}Core/Structuring_content/Basic_HTML_syntax`,
      video: 'html för nybörjare taggar',
    },
    {
      topic: 'Rubriker och stycken',
      read: `${LEARN}Core/Structuring_content/Headings_and_paragraphs`,
      video: 'html headings paragraphs beginners',
    },
    {
      topic: 'strong och em',
      read: `${LEARN}Core/Structuring_content/Emphasis_and_importance`,
      video: 'html strong em tags explained',
    },
  ],
  lankar: [
    {
      topic: 'Länkar',
      read: `${LEARN}Core/Structuring_content/Creating_links`,
      video: 'html länkar a href nybörjare',
    },
    {
      topic: 'Bilder och alt-text',
      read: `${LEARN}Core/Structuring_content/HTML_images`,
      video: 'html img alt text beginners',
    },
  ],
  listor: [
    {
      topic: 'Listor',
      read: `${LEARN}Core/Structuring_content/Lists`,
      video: 'html listor ul ol li',
    },
    {
      topic: 'Tabeller',
      read: `${LEARN}Core/Structuring_content/HTML_table_basics`,
      video: 'html tables beginners tr td th',
    },
  ],
  struktur: [
    {
      topic: 'header, nav, main och footer',
      read: `${LEARN}Core/Structuring_content/Structuring_documents`,
      video: 'semantic html header nav main footer',
    },
    {
      topic: 'Hela dokumentet och head',
      read: `${LEARN}Core/Structuring_content/Webpage_metadata`,
      video: 'html head title meta charset beginners',
    },
  ],
  formular: [
    {
      topic: 'Formulär och etiketter',
      read: `${LEARN}Extensions/Forms/Your_first_form`,
      video: 'html formulär label input',
    },
    {
      topic: 'Olika sorters fält',
      read: `${LEARN}Extensions/Forms/Basic_native_form_controls`,
      video: 'html form radio checkbox select beginners',
    },
  ],
  css: [
    {
      topic: 'Selektorer och regler',
      read: `${LEARN}Core/Styling_basics/Basic_selectors`,
      video: 'css för nybörjare selektorer class id',
    },
    {
      topic: 'Färger och enheter',
      read: `${LEARN}Core/Styling_basics/Values_and_units`,
      video: 'css colors hex rgb rem beginners',
    },
    {
      topic: 'Typsnitt och text',
      read: `${LEARN}Core/Text_styling/Fundamentals`,
      video: 'css font-family font-size text-align',
    },
    {
      topic: 'Vilken regel vinner?',
      read: `${LEARN}Core/Styling_basics/Handling_conflicts`,
      video: 'css specificity explained',
    },
  ],
  boxen: [
    {
      topic: 'Boxmodellen',
      read: `${LEARN}Core/Styling_basics/Box_model`,
      video: 'css box model padding margin border',
    },
    {
      topic: 'Kanter och bakgrund',
      read: `${LEARN}Core/Styling_basics/Backgrounds_and_borders`,
      video: 'css border border-radius beginners',
    },
    {
      topic: 'Bredd och storlek',
      read: `${LEARN}Core/Styling_basics/Sizing`,
      video: 'css width max-width box-sizing border-box',
    },
  ],
  flexbox: [
    {
      topic: 'Flexbox från början',
      read: `${LEARN}Core/CSS_layout/Flexbox`,
      video: 'css flexbox beginners tutorial',
    },
    {
      topic: 'justify-content och align-items',
      read: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Aligning_items_in_a_flex_container',
      video: 'flexbox justify-content align-items explained',
    },
    {
      topic: 'Öva med ett spel',
      read: 'https://flexboxfroggy.com/#sv',
      video: 'flexbox froggy',
    },
  ],
  grid: [
    {
      topic: 'Grid från början',
      read: `${LEARN}Core/CSS_layout/Grids`,
      video: 'css grid beginners tutorial',
    },
    {
      topic: 'Områden med namn',
      read: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Grid_template_areas',
      video: 'css grid-template-areas',
    },
    {
      topic: 'Öva med ett spel',
      read: 'https://cssgridgarden.com/#sv',
      video: 'grid garden css',
    },
  ],
  responsivt: [
    {
      topic: 'Responsiv design',
      read: `${LEARN}Core/CSS_layout/Responsive_Design`,
      video: 'responsive web design beginners',
    },
    {
      topic: '@media',
      read: `${LEARN}Core/CSS_layout/Media_queries`,
      video: 'css media queries beginners',
    },
    {
      topic: 'Bilder som krymper',
      read: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/HTML_images',
      video: 'responsive images max-width 100%',
    },
  ],
  slutprojekt: [
    {
      topic: 'CSS-variabler',
      read: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties',
      video: 'css variables custom properties beginners',
    },
    {
      topic: 'position och sticky',
      read: `${LEARN}Core/CSS_layout/Positioning`,
      video: 'css position sticky absolute relative',
    },
    {
      topic: 'Bygg en hel sajt',
      read: `${LEARN}Getting_started/Your_first_website`,
      video: 'build a personal website html css beginners',
    },
  ],
  tailwind: [
    {
      topic: 'Kom igång med Tailwind',
      read: 'https://tailwindcss.com/docs/installation/play-cdn',
      video: 'tailwind css beginners tutorial',
    },
    {
      topic: 'hover: och md:',
      read: 'https://tailwindcss.com/docs/responsive-design',
      video: 'tailwind responsive design md breakpoint',
    },
    {
      topic: 'Färgerna',
      read: 'https://tailwindcss.com/docs/colors',
      video: 'tailwind css colors',
    },
  ],
};
