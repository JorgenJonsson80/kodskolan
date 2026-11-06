// Databaserna övningarna frågar. En övning väljer en med db: 'butik', och
// den skapas på nytt vid varje körning, så det gör inget om eleven råkar
// radera allt. Namnen är på svenska utan å, ä och ö, så att de går att
// skriva utan citattecken. Datum är text som '2026-03-14', som i SQLite.
// "Idag" är alltid 2026-06-15 i övningarna, så att svaren inte ändras
// med tiden.

const BUTIK = `
CREATE TABLE kunder (
  id INTEGER PRIMARY KEY,
  namn TEXT NOT NULL,
  stad TEXT,
  epost TEXT,
  fodd INTEGER
);
INSERT INTO kunder VALUES
  (1, 'Anna Berg', 'Göteborg', 'anna@exempel.se', 1988),
  (2, 'Bilal Haddad', 'Malmö', 'bilal@exempel.se', 1995),
  (3, 'Clara Ek', 'Stockholm', NULL, 1972),
  (4, 'David Lund', 'Göteborg', 'david@exempel.se', 2001),
  (5, 'Elif Demir', 'Uppsala', 'elif@exempel.se', 1990),
  (6, 'Filip Holm', 'Stockholm', 'filip@exempel.se', 1965),
  (7, 'Greta Nyström', 'Malmö', NULL, 1999),
  (8, 'Hugo Sjöberg', 'Göteborg', 'hugo@exempel.se', 1983),
  (9, 'Ida Karlsson', 'Umeå', 'ida@exempel.se', 2003),
  (10, 'Jonas Åberg', 'Stockholm', 'jonas@exempel.se', 1977);

CREATE TABLE produkter (
  id INTEGER PRIMARY KEY,
  namn TEXT NOT NULL,
  kategori TEXT NOT NULL,
  pris REAL NOT NULL,
  lager INTEGER NOT NULL
);
INSERT INTO produkter VALUES
  (1, 'Bryggkaffe Mörk', 'Kaffe', 89, 40),
  (2, 'Espresso Bönor', 'Kaffe', 129, 25),
  (3, 'Kaffe Ljusrost', 'Kaffe', 79, 0),
  (4, 'Grönt te', 'Te', 59, 30),
  (5, 'Earl Grey', 'Te', 65, 12),
  (6, 'Rooibos', 'Te', 55, 0),
  (7, 'Kanelbulle', 'Bakverk', 25, 50),
  (8, 'Chokladboll', 'Bakverk', 20, 35),
  (9, 'Morotskaka', 'Bakverk', 45, 8),
  (10, 'Kaffekopp', 'Tillbehör', 149, 15),
  (11, 'Termos', 'Tillbehör', 299, 6),
  (12, 'Kaffefilter', 'Tillbehör', 35, 100);

CREATE TABLE ordrar (
  id INTEGER PRIMARY KEY,
  kund_id INTEGER NOT NULL REFERENCES kunder (id),
  datum TEXT NOT NULL,
  status TEXT NOT NULL
);
INSERT INTO ordrar VALUES
  (1, 1, '2026-01-08', 'levererad'),
  (2, 2, '2026-01-15', 'levererad'),
  (3, 1, '2026-02-02', 'levererad'),
  (4, 4, '2026-02-14', 'levererad'),
  (5, 5, '2026-02-20', 'avbruten'),
  (6, 3, '2026-03-03', 'levererad'),
  (7, 8, '2026-03-11', 'levererad'),
  (8, 2, '2026-03-28', 'levererad'),
  (9, 6, '2026-04-05', 'levererad'),
  (10, 1, '2026-04-19', 'levererad'),
  (11, 9, '2026-05-02', 'levererad'),
  (12, 4, '2026-05-17', 'skickad'),
  (13, 5, '2026-05-30', 'levererad'),
  (14, 8, '2026-06-07', 'skickad'),
  (15, 2, '2026-06-12', 'skickad');

CREATE TABLE orderrader (
  order_id INTEGER NOT NULL REFERENCES ordrar (id),
  produkt_id INTEGER NOT NULL REFERENCES produkter (id),
  antal INTEGER NOT NULL
);
INSERT INTO orderrader VALUES
  (1, 1, 2), (1, 7, 4),
  (2, 4, 1), (2, 8, 6),
  (3, 2, 1), (3, 10, 2),
  (4, 7, 10),
  (5, 11, 1),
  (6, 1, 1), (6, 5, 2), (6, 9, 1),
  (7, 2, 2), (7, 12, 3),
  (8, 8, 4), (8, 7, 4),
  (9, 11, 1), (9, 1, 3),
  (10, 4, 2), (10, 9, 2),
  (11, 10, 1),
  (12, 2, 1), (12, 7, 6),
  (13, 5, 1), (13, 8, 2),
  (14, 1, 2), (14, 12, 1),
  (15, 9, 3);
`;

const FILMER = `
CREATE TABLE regissorer (
  id INTEGER PRIMARY KEY,
  namn TEXT NOT NULL,
  land TEXT NOT NULL
);
INSERT INTO regissorer VALUES
  (1, 'Ingmar Bergman', 'Sverige'),
  (2, 'Lukas Moodysson', 'Sverige'),
  (3, 'Ruben Östlund', 'Sverige'),
  (4, 'Hayao Miyazaki', 'Japan'),
  (5, 'Christopher Nolan', 'Storbritannien'),
  (6, 'Greta Gerwig', 'USA'),
  (7, 'Céline Sciamma', 'Frankrike');

CREATE TABLE filmer (
  id INTEGER PRIMARY KEY,
  titel TEXT NOT NULL,
  ar INTEGER NOT NULL,
  genre TEXT NOT NULL,
  langd INTEGER NOT NULL,
  regissor_id INTEGER REFERENCES regissorer (id)
);
INSERT INTO filmer VALUES
  (1, 'Det sjunde inseglet', 1957, 'Drama', 96, 1),
  (2, 'Smultronstället', 1957, 'Drama', 91, 1),
  (3, 'Fanny och Alexander', 1982, 'Drama', 188, 1),
  (4, 'Fucking Åmål', 1998, 'Drama', 89, 2),
  (5, 'Tillsammans', 2000, 'Komedi', 106, 2),
  (6, 'Turist', 2014, 'Drama', 120, 3),
  (7, 'The Square', 2017, 'Komedi', 151, 3),
  (8, 'Triangle of Sadness', 2022, 'Komedi', 147, 3),
  (9, 'Min granne Totoro', 1988, 'Animerat', 86, 4),
  (10, 'Spirited Away', 2001, 'Animerat', 125, 4),
  (11, 'Inception', 2010, 'Sci-fi', 148, 5),
  (12, 'Interstellar', 2014, 'Sci-fi', 169, 5),
  (13, 'Oppenheimer', 2023, 'Drama', 180, 5),
  (14, 'Lady Bird', 2017, 'Komedi', 94, 6),
  (15, 'Barbie', 2023, 'Komedi', 114, 6),
  (16, 'Okänd kortfilm', 2025, 'Drama', 12, NULL);

-- Betygen är påhittade, från 1 till 5.
CREATE TABLE recensioner (
  id INTEGER PRIMARY KEY,
  film_id INTEGER NOT NULL REFERENCES filmer (id),
  recensent TEXT NOT NULL,
  betyg INTEGER NOT NULL
);
INSERT INTO recensioner VALUES
  (1, 1, 'Maja', 5), (2, 1, 'Leo', 4),
  (3, 2, 'Maja', 4),
  (4, 3, 'Leo', 5), (5, 3, 'Saga', 5),
  (6, 4, 'Saga', 4), (7, 4, 'Omar', 5),
  (8, 5, 'Omar', 3),
  (9, 6, 'Maja', 4), (10, 6, 'Omar', 3),
  (11, 7, 'Leo', 3), (12, 7, 'Saga', 2),
  (13, 8, 'Maja', 4), (14, 8, 'Leo', 3), (15, 8, 'Omar', 4),
  (16, 9, 'Saga', 5), (17, 9, 'Omar', 5),
  (18, 10, 'Maja', 5), (19, 10, 'Leo', 5), (20, 10, 'Saga', 4),
  (21, 11, 'Omar', 4), (22, 11, 'Leo', 5),
  (23, 12, 'Maja', 4), (24, 12, 'Saga', 3),
  (25, 13, 'Leo', 4),
  (26, 14, 'Saga', 4),
  (27, 15, 'Omar', 3), (28, 15, 'Maja', 4);
`;

const SKOLA = `
CREATE TABLE elever (
  id INTEGER PRIMARY KEY,
  fornamn TEXT NOT NULL,
  efternamn TEXT NOT NULL,
  klass TEXT NOT NULL,
  fodd INTEGER NOT NULL
);
INSERT INTO elever VALUES
  (1, 'Alva', 'Lindqvist', '9A', 2011),
  (2, 'Elias', 'Berg', '9A', 2011),
  (3, 'Nora', 'Hussein', '9A', 2011),
  (4, 'Liam', 'Johansson', '9A', 2010),
  (5, 'Wilma', 'Andersson', '9A', 2011),
  (6, 'Hugo', 'Nilsson', '9A', 2011),
  (7, 'Saga', 'Persson', '9B', 2011),
  (8, 'Adam', 'Karimi', '9B', 2011),
  (9, 'Ella', 'Svensson', '9B', 2010),
  (10, 'Oscar', 'Gustafsson', '9B', 2011),
  (11, 'Maja', 'Olsson', '9B', 2011),
  (12, 'Noah', 'Larsson', '9B', 2011);

CREATE TABLE kurser (
  id INTEGER PRIMARY KEY,
  namn TEXT NOT NULL,
  larare TEXT NOT NULL
);
INSERT INTO kurser VALUES
  (1, 'Matematik', 'Eva Strand'),
  (2, 'Svenska', 'Karl Bergqvist'),
  (3, 'Engelska', 'Sofia Lind'),
  (4, 'Programmering', 'Eva Strand');

-- Resultatet på slutprovet, 0–100.
CREATE TABLE resultat (
  elev_id INTEGER NOT NULL REFERENCES elever (id),
  kurs_id INTEGER NOT NULL REFERENCES kurser (id),
  poang INTEGER NOT NULL
);
INSERT INTO resultat VALUES
  (1, 1, 92), (1, 2, 85), (1, 3, 78), (1, 4, 95),
  (2, 1, 67), (2, 2, 72), (2, 3, 88),
  (3, 1, 81), (3, 2, 94), (3, 3, 90), (3, 4, 77),
  (4, 1, 45), (4, 2, 58), (4, 3, 62),
  (5, 1, 88), (5, 2, 79), (5, 3, 84), (5, 4, 91),
  (6, 1, 73), (6, 2, 66),
  (7, 1, 98), (7, 2, 88), (7, 3, 93), (7, 4, 99),
  (8, 1, 55), (8, 2, 81), (8, 3, 70),
  (9, 1, 84), (9, 2, 90), (9, 3, 76), (9, 4, 82),
  (10, 1, 62), (10, 2, 54), (10, 3, 68),
  (11, 1, 90), (11, 2, 92), (11, 3, 95),
  (12, 1, 71), (12, 3, 59);
`;

const BIBLIOTEK = `
CREATE TABLE bocker (
  id INTEGER PRIMARY KEY,
  titel TEXT NOT NULL,
  forfattare TEXT NOT NULL,
  ar INTEGER NOT NULL,
  genre TEXT NOT NULL,
  sidor INTEGER NOT NULL
);
INSERT INTO bocker VALUES
  (1, 'Pippi Långstrump', 'Astrid Lindgren', 1945, 'Barn', 160),
  (2, 'Mio, min Mio', 'Astrid Lindgren', 1954, 'Barn', 190),
  (3, 'Bröderna Lejonhjärta', 'Astrid Lindgren', 1973, 'Barn', 240),
  (4, 'Ronja Rövardotter', 'Astrid Lindgren', 1981, 'Barn', 230),
  (5, 'Nils Holgerssons underbara resa', 'Selma Lagerlöf', 1906, 'Barn', 590),
  (6, 'Gösta Berlings saga', 'Selma Lagerlöf', 1891, 'Roman', 480),
  (7, 'Röda rummet', 'August Strindberg', 1879, 'Roman', 380),
  (8, 'Utvandrarna', 'Vilhelm Moberg', 1949, 'Roman', 520),
  (9, 'En man som heter Ove', 'Fredrik Backman', 2012, 'Roman', 350),
  (10, 'Björnstad', 'Fredrik Backman', 2016, 'Roman', 460),
  (11, 'Män som hatar kvinnor', 'Stieg Larsson', 2005, 'Deckare', 540),
  (12, 'Hundraåringen som klev ut genom fönstret och försvann', 'Jonas Jonasson', 2009, 'Roman', 400),
  (13, 'Sagan om ringen', 'J.R.R. Tolkien', 1954, 'Fantasy', 520),
  (14, 'Hobbiten', 'J.R.R. Tolkien', 1937, 'Fantasy', 310);

CREATE TABLE lantagare (
  id INTEGER PRIMARY KEY,
  namn TEXT NOT NULL,
  telefon TEXT
);
INSERT INTO lantagare VALUES
  (1, 'Tove Ek', '070-111 22 33'),
  (2, 'Malik Osman', '070-222 33 44'),
  (3, 'Lisa Holm', NULL),
  (4, 'Erik Sand', '070-444 55 66'),
  (5, 'Amira Said', '070-555 66 77'),
  (6, 'Per Lind', NULL);

-- aterlamnad är NULL så länge boken inte är tillbaka.
CREATE TABLE lan (
  id INTEGER PRIMARY KEY,
  bok_id INTEGER NOT NULL REFERENCES bocker (id),
  lantagare_id INTEGER NOT NULL REFERENCES lantagare (id),
  lanad TEXT NOT NULL,
  forfaller TEXT NOT NULL,
  aterlamnad TEXT
);
INSERT INTO lan VALUES
  (1, 1, 1, '2026-03-02', '2026-03-30', '2026-03-20'),
  (2, 9, 2, '2026-03-10', '2026-04-07', '2026-04-01'),
  (3, 11, 4, '2026-04-01', '2026-04-29', '2026-05-10'),
  (4, 3, 1, '2026-04-12', '2026-05-10', '2026-05-02'),
  (5, 13, 5, '2026-05-03', '2026-05-31', NULL),
  (6, 9, 4, '2026-05-08', '2026-06-05', NULL),
  (7, 4, 1, '2026-05-15', '2026-06-12', NULL),
  (8, 10, 2, '2026-05-20', '2026-06-17', NULL),
  (9, 1, 5, '2026-05-25', '2026-06-22', '2026-06-01'),
  (10, 14, 3, '2026-06-01', '2026-06-29', NULL),
  (11, 8, 2, '2026-06-03', '2026-07-01', NULL),
  (12, 11, 5, '2026-06-10', '2026-07-08', NULL);
`;

// Hundpensionatet i slutprojektet. Banan bygger tabellerna själv först,
// så de står här en och en (PENSIONAT_TABLES) och ihop med data.
export const PENSIONAT_TABLES = {
  agare: `
CREATE TABLE agare (
  id INTEGER PRIMARY KEY,
  namn TEXT NOT NULL,
  telefon TEXT
);`,
  hundar: `
CREATE TABLE hundar (
  id INTEGER PRIMARY KEY,
  namn TEXT NOT NULL,
  ras TEXT,
  fodd INTEGER,
  agare_id INTEGER NOT NULL REFERENCES agare (id)
);`,
  rum: `
CREATE TABLE rum (
  id INTEGER PRIMARY KEY,
  namn TEXT NOT NULL,
  storlek TEXT NOT NULL,
  pris_per_natt INTEGER NOT NULL
);`,
  vistelser: `
CREATE TABLE vistelser (
  id INTEGER PRIMARY KEY,
  hund_id INTEGER NOT NULL REFERENCES hundar (id),
  rum_id INTEGER NOT NULL REFERENCES rum (id),
  incheckning TEXT NOT NULL,
  utcheckning TEXT NOT NULL,
  CHECK (utcheckning > incheckning)
);`,
};

const PENSIONAT = `
${PENSIONAT_TABLES.agare}
INSERT INTO agare VALUES
  (1, 'Sara Lind', '070-100 10 10'),
  (2, 'Omar Ali', '070-200 20 20'),
  (3, 'Eva Nord', '070-300 30 30'),
  (4, 'Jens Holm', NULL);
${PENSIONAT_TABLES.hundar}
INSERT INTO hundar VALUES
  (1, 'Bamse', 'Golden retriever', 2019, 1),
  (2, 'Selma', 'Tax', 2021, 1),
  (3, 'Rocky', 'Boxer', 2018, 2),
  (4, 'Luna', 'Border collie', 2022, 3),
  (5, 'Pixie', 'Chihuahua', 2020, 4),
  (6, 'Ludde', 'Labrador', 2023, 2);
${PENSIONAT_TABLES.rum}
INSERT INTO rum VALUES
  (1, 'Rum 1', 'stor', 350),
  (2, 'Rum 2', 'stor', 350),
  (3, 'Rum 3', 'liten', 250);
${PENSIONAT_TABLES.vistelser}
INSERT INTO vistelser VALUES
  (1, 1, 1, '2026-03-01', '2026-03-08'),
  (2, 3, 2, '2026-03-05', '2026-03-07'),
  (3, 4, 3, '2026-04-10', '2026-04-14'),
  (4, 2, 3, '2026-04-18', '2026-04-21'),
  (5, 1, 1, '2026-05-01', '2026-05-04'),
  (6, 5, 3, '2026-05-12', '2026-05-19'),
  (7, 3, 2, '2026-06-10', '2026-06-17'),
  (8, 6, 1, '2026-06-13', '2026-06-16'),
  (9, 2, 3, '2026-06-14', '2026-06-15'),
  (10, 4, 3, '2026-06-20', '2026-06-25');
`;

export const DATABASES = {
  butik: {
    name: '🛒 Butiken',
    about:
      'Kaffebutiken Bönan: kunder, produkter, ordrar och vad varje order innehöll.',
    sql: BUTIK,
  },
  filmer: {
    name: '🎬 Filmer',
    about: 'Filmer, deras regissörer och recensioner med betyg från 1 till 5.',
    sql: FILMER,
  },
  skola: {
    name: '🏫 Skolan',
    about: 'Elever i två klasser, kurserna och resultaten på slutproven.',
    sql: SKOLA,
  },
  bibliotek: {
    name: '📚 Biblioteket',
    about:
      'Böcker, låntagare och lån. aterlamnad är tom så länge boken är utlånad.',
    sql: BIBLIOTEK,
  },
  pensionat: {
    name: '🐕 Hundpensionatet',
    about:
      'Ägare, deras hundar, rummen och hundarnas vistelser. En vistelse varar från incheckning till utcheckning.',
    sql: PENSIONAT,
  },
};

// SQL:en som skapar övningens databas: den valda databasen och sedan
// övningens egen setup (t.ex. en extra tabell). Utan db blir det en tom
// databas, som i banan där eleven skapar egna tabeller.
export function setupFor({ db, setup } = {}) {
  return [DATABASES[db]?.sql, setup].filter(Boolean).join('\n');
}
