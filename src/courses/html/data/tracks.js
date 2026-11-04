// Banorna i ordning. reward är föremålet eleven får när banan är klar, och
// canBuild avslutar meningen "Nu kan du t.ex. bygga …" i firandet. docs
// länkar till MDN för den som vill läsa mer. Resten av banorna står i
// SPEC.md och läggs till en i taget.
const MDN = 'https://developer.mozilla.org/en-US/docs/';

export const TRACKS = [
  {
    id: 'grunder',
    title: 'Din första webbsida',
    teaches: ['h1–h6', 'p', 'strong', 'em', 'br', 'hr', '<!-- -->'],
    reward: { emoji: '🧸', name: 'Nalle' },
    canBuild:
      'en enkel sida om dig själv, med rubriker, stycken och ord som sticker ut',
    docs: [
      {
        title: 'Komma igång med HTML',
        url: `${MDN}Learn_web_development/Core/Structuring_content/Basic_HTML_syntax`,
      },
      {
        title: 'Rubriker och stycken',
        url: `${MDN}Learn_web_development/Core/Structuring_content/Headings_and_paragraphs`,
      },
      {
        title: '<strong> och <em>',
        url: `${MDN}Learn_web_development/Core/Structuring_content/Emphasis_and_importance`,
      },
    ],
  },
  {
    id: 'lankar',
    title: 'Länkar och bilder',
    teaches: ['a href', 'target', 'img src alt', 'width', 'id', 'mailto:'],
    reward: { emoji: '🪀', name: 'Jojo' },
    canBuild:
      'en receptsida med bilder, länkar till mer att läsa och en meny som hoppar ner på sidan',
    docs: [
      {
        title: 'Länkar',
        url: `${MDN}Learn_web_development/Core/Structuring_content/Creating_links`,
      },
      {
        title: 'Bilder',
        url: `${MDN}Learn_web_development/Core/Structuring_content/HTML_images`,
      },
      {
        title: 'Alt-text',
        url: `${MDN}Web/HTML/Reference/Elements/img#authoring_meaningful_alternate_descriptions`,
      },
    ],
  },
  {
    id: 'listor',
    title: 'Listor och tabeller',
    teaches: ['ul', 'ol', 'li', 'table', 'tr', 'th', 'td', 'caption'],
    reward: { emoji: '🪁', name: 'Drake' },
    canBuild:
      'en matsedel, en topplista eller ett schema där allt står i rätt rad och kolumn',
    docs: [
      {
        title: 'Listor',
        url: `${MDN}Learn_web_development/Core/Structuring_content/Lists`,
      },
      {
        title: 'Tabeller',
        url: `${MDN}Learn_web_development/Core/Structuring_content/HTML_table_basics`,
      },
    ],
  },
  {
    id: 'struktur',
    title: 'Sidans delar',
    teaches: [
      '<!doctype>',
      'head',
      'title',
      'header',
      'nav',
      'main',
      'section',
      'article',
      'footer',
      'div',
      'span',
    ],
    reward: { emoji: '🎲', name: 'Tärning' },
    canBuild:
      'en hel hemsida för en klubb eller ett företag, med meny, avsnitt och sidfot',
    docs: [
      {
        title: 'Sidans delar',
        url: `${MDN}Learn_web_development/Core/Structuring_content/Structuring_documents`,
      },
      {
        title: 'Det som står i head',
        url: `${MDN}Learn_web_development/Core/Structuring_content/Webpage_metadata`,
      },
    ],
  },
  {
    id: 'formular',
    title: 'Formulär',
    teaches: [
      'form',
      'label',
      'input',
      'textarea',
      'select',
      'button',
      'name',
      'required',
    ],
    reward: { emoji: '🎈', name: 'Ballong' },
    canBuild:
      'en anmälan, en beställning eller en enkät där alla vet vad de ska fylla i',
    docs: [
      {
        title: 'Ditt första formulär',
        url: `${MDN}Learn_web_development/Extensions/Forms/Your_first_form`,
      },
      {
        title: 'Fälten i ett formulär',
        url: `${MDN}Learn_web_development/Extensions/Forms/Basic_native_form_controls`,
      },
    ],
  },
  {
    id: 'css',
    title: 'Färg och form med CSS',
    teaches: [
      '<style>',
      'selektorer',
      'class',
      'id',
      'color',
      'background-color',
      'font-family',
      'font-size',
      'text-align',
      ':hover',
    ],
    reward: { emoji: '🖍️', name: 'Kritor' },
    canBuild:
      'en affisch, en meny eller en sida i mörkt läge med egna färger och typsnitt',
    docs: [
      {
        title: 'Vad är CSS?',
        url: `${MDN}Learn_web_development/Core/Styling_basics/What_is_CSS`,
      },
      {
        title: 'Selektorer',
        url: `${MDN}Learn_web_development/Core/Styling_basics/Basic_selectors`,
      },
      {
        title: 'Vilken regel vinner?',
        url: `${MDN}Learn_web_development/Core/Styling_basics/Handling_conflicts`,
      },
    ],
  },
  {
    id: 'boxen',
    title: 'Boxmodellen',
    teaches: [
      'padding',
      'margin',
      'border',
      'border-radius',
      'width',
      'max-width',
      'box-sizing',
      'display',
    ],
    reward: { emoji: '🪆', name: 'Matrjosjka' },
    canBuild:
      'kort, knappar och rutor med luft, kanter och runda hörn, mitt på sidan',
    docs: [
      {
        title: 'Boxmodellen',
        url: `${MDN}Learn_web_development/Core/Styling_basics/Box_model`,
      },
      {
        title: 'Bakgrund och kanter',
        url: `${MDN}Learn_web_development/Core/Styling_basics/Backgrounds_and_borders`,
      },
    ],
  },
  {
    id: 'flexbox',
    title: 'Flexbox',
    teaches: [
      'display: flex',
      'gap',
      'justify-content',
      'align-items',
      'flex-direction',
      'flex-wrap',
      'flex: 1',
    ],
    reward: { emoji: '🧩', name: 'Pussel' },
    canBuild:
      'sidhuvuden med logga och meny, rader med kort och sidor med en meny vid sidan',
    docs: [
      {
        title: 'Flexbox',
        url: `${MDN}Learn_web_development/Core/CSS_layout/Flexbox`,
      },
      {
        title: 'Linjera saker i flexbox',
        url: `${MDN}Web/CSS/CSS_flexible_box_layout/Aligning_items_in_a_flex_container`,
      },
    ],
  },
  {
    id: 'grid',
    title: 'Grid',
    teaches: [
      'display: grid',
      'grid-template-columns',
      'fr',
      'repeat()',
      'span',
      'grid-template-areas',
    ],
    reward: { emoji: '♟️', name: 'Schackpjäs' },
    canBuild:
      'gallerier, kalendrar, tidningssidor och hela sidor med sidhuvud, meny och sidfot',
    docs: [
      {
        title: 'Grid',
        url: `${MDN}Learn_web_development/Core/CSS_layout/Grids`,
      },
      {
        title: 'Områden med namn',
        url: `${MDN}Web/CSS/CSS_grid_layout/Grid_template_areas`,
      },
    ],
  },
  {
    id: 'responsivt',
    title: 'Mobil och dator',
    teaches: [
      'viewport',
      '%',
      'max-width',
      'bilder som krymper',
      '@media',
      'mobilen först',
    ],
    reward: { emoji: '📱', name: 'Mobil' },
    canBuild: 'sidor som fungerar lika bra på mobilen som på datorn',
    docs: [
      {
        title: 'Responsiv design',
        url: `${MDN}Learn_web_development/Core/CSS_layout/Responsive_Design`,
      },
      {
        title: '@media',
        url: `${MDN}Learn_web_development/Core/CSS_layout/Media_queries`,
      },
    ],
  },
  {
    id: 'slutprojekt',
    title: 'Slutprojekt: din egen hemsida',
    teaches: [
      'planera sidan',
      'CSS-variabler',
      'klasser som återanvänds',
      'linear-gradient',
      'scroll-behavior',
      ':focus',
      'position: sticky',
    ],
    reward: { emoji: '🎓', name: 'Studentmössa' },
    canBuild: 'en hel egen sajt som fungerar på både dator och mobil',
    docs: [
      {
        title: 'CSS-variabler',
        url: `${MDN}Web/CSS/Using_CSS_custom_properties`,
      },
      {
        title: 'position',
        url: `${MDN}Learn_web_development/Core/CSS_layout/Positioning`,
      },
    ],
  },
  {
    id: 'tailwind',
    title: 'Bonus: Tailwind',
    teaches: [
      'text- och bg-',
      'p-4 och m-2',
      'rounded och shadow',
      'flex och grid',
      'hover:',
      'md:',
    ],
    reward: { emoji: '🪄', name: 'Trollstav' },
    canBuild: 'sidor med bara klasser, så som många företag bygger sina sajter',
    docs: [
      {
        title: 'Tailwind: kom igång',
        url: 'https://tailwindcss.com/docs/installation/play-cdn',
      },
      {
        title: 'Tailwind: färgerna',
        url: 'https://tailwindcss.com/docs/colors',
      },
    ],
  },
];
