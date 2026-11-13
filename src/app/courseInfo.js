import { COURSES } from './courses';

// Det som står om kurserna på /kurser/<id> och i sökresultaten. Kursens
// namn, ikon och banor kommer från kursen själv. description blir
// sidans meta-beskrivning, så håll den under ungefär 155 tecken.
export const COURSE_INFO = {
  python: {
    title: 'Lär dig Python på svenska',
    description:
      'En gratis Python-kurs på svenska för dig som aldrig kodat. Skriv riktig kod i webbläsaren, från första print till pandas och egna webbappar.',
    intro:
      'Python är språket många börjar med, och det används till allt från små skript till dataanalys och AI. Du skriver riktig Python direkt i webbläsaren och ser på en gång om koden fungerar.',
    forWhom:
      'Dig som aldrig kodat. Kursen börjar med en enda rad och förklarar varje nytt ord.',
    before: 'Inget. Det här är en bra första kurs.',
    example: `namn = input("Vad heter du? ")
if namn == "Ada":
    print("Hej igen, Ada!")
else:
    print("Välkommen, " + namn + "!")`,
  },
  html: {
    title: 'Lär dig HTML och CSS på svenska',
    description:
      'En gratis kurs i HTML och CSS på svenska. Bygg riktiga hemsidor i webbläsaren och se sidan växa fram medan du skriver, från första rubrik till Tailwind.',
    intro:
      'HTML är det alla webbsidor är byggda av, och CSS bestämmer hur de ser ut. Du skriver koden och ser sidan ändras direkt bredvid, på dator och mobil.',
    forWhom:
      'Dig som vill bygga egna sidor, eller förstå hur webben fungerar innan du lär dig JavaScript.',
    before: 'Inget. Kursen börjar från noll.',
    example: `<h1>Mina pannkakor</h1>
<p>Det <strong>bästa</strong> receptet jag vet.</p>
<ul>
  <li>3 ägg</li>
  <li>6 dl mjölk</li>
</ul>`,
  },
  js: {
    title: 'Lär dig JavaScript och React på svenska',
    description:
      'En gratis kurs i JavaScript och React på svenska. Skriv riktig kod i webbläsaren, från första variabel till egna komponenter, hooks och ett helt slutprojekt.',
    intro:
      'JavaScript är språket som gör webbsidor levande, och React är det många företag bygger sina appar med. Kursen tar dig hela vägen från grunderna till en egen React-app.',
    forWhom:
      'Dig som vill bli webbutvecklare. Det hjälper att ha gått HTML & CSS först, men det är inget krav.',
    before: 'Inget krav. HTML & CSS gör det lättare.',
    example: `function Hälsning({ namn }) {
  const [antal, setAntal] = useState(0);
  return (
    <button onClick={() => setAntal(antal + 1)}>
      Hej {namn}! Klickat {antal} gånger
    </button>
  );
}`,
  },
  sql: {
    title: 'Lär dig SQL på svenska',
    description:
      'En gratis SQL-kurs på svenska. Ställ frågor till riktiga databaser i webbläsaren, från första SELECT till JOIN, gruppering och fönsterfunktioner.',
    intro:
      'SQL är språket för att fråga databaser, och det används i nästan alla företag. Du skriver frågor mot riktiga tabeller och ser svaret direkt.',
    forWhom:
      'Dig som vill jobba med data, eller som utvecklare vill förstå databasen bakom appen.',
    before: 'Inget. Kursen börjar från noll.',
    example: `SELECT stad, COUNT(*) AS kunder
FROM kunder
GROUP BY stad
ORDER BY kunder DESC;`,
  },
  ts: {
    title: 'Lär dig TypeScript på svenska',
    description:
      'En gratis TypeScript-kurs på svenska. Lär dig typer, generics och React med TypeScript, med kod som kontrolleras direkt i webbläsaren.',
    intro:
      'TypeScript är JavaScript med typer. Det hittar felen innan koden körs, och de flesta större webbprojekt använder det i dag.',
    forWhom: 'Dig som kan grunderna i JavaScript och vill skriva säkrare kod.',
    before: 'Grunderna i JavaScript.',
    example: `type Betalning =
  | { sätt: 'kort'; nummer: string }
  | { sätt: 'swish'; telefon: string };

function kvitto(b: Betalning): string {
  return b.sätt === 'kort' ? 'Kort ' + b.nummer : 'Swish ' + b.telefon;
}`,
  },
  git: {
    title: 'Lär dig Git och terminalen på svenska',
    description:
      'En kurs i terminalen, Git och GitHub på svenska. Skriv riktiga kommandon i webbläsaren: mappar, filer, commits, grenar och push – utan att installera något.',
    intro:
      'Alla som kodar på riktigt använder terminalen och Git varje dag, men få kurser lär ut det från början. Här skriver du riktiga kommandon i en terminal i webbläsaren och ser direkt vad som händer – utan risk att förstöra något.',
    forWhom:
      'Dig som har börjat koda och vill jobba som proffsen: spara versioner, prova saker på en egen gren och lägga upp koden på GitHub.',
    before: 'Inget, men det är lättare om du har gått en annan kurs först.',
    example: `mkdir hemsida
cd hemsida
git init
echo "<h1>Hej</h1>" > index.html
git add index.html
git commit -m "Första versionen"`,
  },
  data: {
    title: 'Lär dig dataanalys med Python och pandas',
    description:
      'En kurs i dataanalys på svenska. Läs in, städa och räkna på riktig data med pandas, rita diagram och dra slutsatser – direkt i webbläsaren.',
    intro:
      'Du följer Kafé Kanel genom ett helt år: tusentals kvitton, vädret och personalen. Vad säljer mest, när är det mest folk och säljs det mer iskaffe när det är varmt? Du skriver riktig Python med pandas och ser svaren direkt.',
    forWhom:
      'Dig som kan grunderna i Python och vill använda det till något i vardagen: Excel-filer, rapporter och frågor om siffror.',
    before:
      'Grunderna i Python, gärna hela Python-kursen. SQL-kursen hjälper i banan om att kombinera tabeller.',
    example: `import pandas as pd

df = pd.read_csv("kassan.csv")
df["summa"] = df["antal"] * df["pris"]

per_produkt = df.groupby("produkt")["summa"].sum()
print(per_produkt.sort_values(ascending=False).head(5))`,
  },
  ai: {
    title: 'Lär dig bygga med AI i Python',
    description:
      'En AI-kurs på svenska. Prata med språkmodeller från Python: prompter, verktyg, egna dokument (RAG) och agenter – direkt i webbläsaren.',
    intro:
      'Här lär du dig bygga program som använder språkmodeller, med samma kod som mot Anthropics riktiga API. Övningarna använder en låtsasmodell, så det kostar ingenting och svaren går att rätta.',
    forWhom:
      'Dig som kan Python och vill bygga egna AI-tjänster, och gärna har gått FastAPI-kursen.',
    before: 'Python, och för slutprojektet FastAPI.',
    example: `import anthropic

client = anthropic.Anthropic()

svar = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=1000,
    system="Svara kort och vänligt.",
    messages=[{"role": "user", "content": "Vad är en token?"}],
)
print(svar.content[0].text)`,
  },
  fastapi: {
    title: 'Lär dig FastAPI och bygg moderna API:er i Python',
    description:
      'En FastAPI-kurs på svenska. Bygg snabba API:er i Python direkt i webbläsaren, med Pydantic, databas, inloggning och async – grunden för AI-tjänster.',
    intro:
      'FastAPI är det moderna sättet att bygga API:er i Python, och det de flesta AI-tjänster byggs med. Du skriver appen och skickar anrop till den direkt i webbläsaren, utan att installera något.',
    forWhom:
      'Dig som kan grunderna i Python och vill bygga API:er, till exempel för en app eller en AI-tjänst.',
    before:
      'Grunderna i Python, till och med funktioner, dictionaries och klasser.',
    example: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Hund(BaseModel):
    namn: str
    alder: int

@app.post("/hundar", status_code=201)
def ny_hund(hund: Hund):
    return hund`,
  },
  flask: {
    title: 'Lär dig Flask och bygg webb-API:er i Python',
    description:
      'En gratis Flask-kurs på svenska. Bygg egna webb-API:er och sajter i Python direkt i webbläsaren, med JSON, databas, mallar och inloggning.',
    intro:
      'Flask är ett litet ramverk för att bygga webbservrar i Python. Du skriver appen och skickar anrop till den direkt i webbläsaren, utan att installera något.',
    forWhom:
      'Dig som kan grunderna i Python och vill bygga det som finns bakom en app eller sajt.',
    before: 'Grunderna i Python, till och med funktioner och dictionaries.',
    example: `from flask import Flask

app = Flask(__name__)

@app.get("/hundar/<int:id>")
def hund(id):
    return {"id": id, "namn": "Bamse"}`,
  },
  fullstack: {
    title: 'Lär dig fullstack: React, TypeScript och Flask',
    description:
      'En gratis fullstack-kurs på svenska. Koppla ihop en React-sida i TypeScript med ditt eget Flask-API, allt direkt i webbläsaren.',
    intro:
      'Här kopplar du ihop det du lärt dig: en sida i React och TypeScript som hämtar från, skickar till och loggar in mot ditt eget API i Flask.',
    forWhom: 'Dig som gått Flask och TypeScript och vill bygga en hel app.',
    before: 'Flask och TypeScript (med React).',
    example: `const svar = await fetch('/api/hundar', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ namn: 'Bamse' }),
});
const hund: Hund = await svar.json();`,
  },
};

// Adressen till sidan om kursen. Snedstrecket sist, eftersom sidan är en
// mapp med index.html, och GitHub Pages annars skickar vidare dit.
export const courseInfoUrl = id => `${import.meta.env.BASE_URL}kurser/${id}/`;

export const findCourse = id =>
  COURSES.find(item => item.id === id && COURSE_INFO[item.id]) ?? null;
