import SiteFooter from '../core/components/SiteFooter';
import { LEGAL, OWNER } from './legal';

const BASE = import.meta.env.BASE_URL;

const UPDATED = '8 november 2026';

const Mail = () => <a href={`mailto:${OWNER.email}`}>{OWNER.email}</a>;

function Privacy() {
  return (
    <>
      <p>
        Kodskolan drivs av {OWNER.name} (privatperson), som är
        personuppgiftsansvarig. Frågor om dina uppgifter: <Mail />.
      </p>

      <h2>Utan konto</h2>
      <p>
        Det du klarat och koden du skrivit sparas bara i din webbläsare
        (localStorage). Det skickas ingenstans, och du kan tömma det under{' '}
        <a href={`${BASE}konto`}>Mitt konto och data</a>. Kodskolan använder
        inga cookies.
      </p>

      <h2>Med konto</h2>
      <p>Om du loggar in sparas:</p>
      <ul>
        <li>din mejladress, för att du ska kunna logga in</li>
        <li>vilka övningar du klarat och din kod, i alla kurser</li>
        <li>dina diplom, med namnet du skrivit på dem</li>
        <li>hur många övningar du klarat varje dag, för din streak</li>
        <li>
          vilken tillgång du har, hur länge den gäller och koden du löste in den
          med
        </li>
        <li>
          när du loggade in och från vilken IP-adress, i inloggningstjänstens
          loggar
        </li>
      </ul>
      <p>
        Det behövs för att dina framsteg ska följa med dig (avtal, artikel 6.1 b
        i GDPR). Uppgifterna sparas tills du raderar kontot. Ett diplom du
        väljer att dela kan ses av alla som har länken, med namnet du skrivit på
        det.
      </p>

      <h2>Profil och klasser</h2>
      <p>
        Skapar du en profil syns namnet du valt och dina diplom för alla som har
        adressen. Går du med i en lärares klass sparas namnet du skrev, och
        läraren ser vilka övningar du klarat och hur många du klarat per dag –
        inte din kod eller mejladress. Lärare som skapar en klass sparar
        klassens namn. Du tar bort profilen och lämnar klasser under{' '}
        <a href={`${BASE}konto`}>Mitt konto och data</a>.
      </p>

      <h2>Felrapporter</h2>
      <p>
        Skickar du en felrapport från en övning sparas vilken övning det gäller,
        det du skrev och – bara om du kryssar i det – din kod. Är du inloggad
        kopplas rapporten till ditt konto och raderas med det. Rapporterna
        används bara för att laga övningarna.
      </p>

      <h2>AI-handledaren</h2>
      <p>
        Frågar du AI-handledaren skickas din fråga, övningen, din kod och vad
        som hände när du körde den till Anthropic, som gör AI-modellen Claude.
        Kodskolan sparar inte frågorna, bara hur många du ställt i dag, så att
        taket per dag fungerar. Anthropic använder inte det som skickas via
        deras API för att träna sina modeller.
      </p>

      <h2>Statistik och fel</h2>
      <p>
        För att se var kurserna är för svåra och hitta fel räknas besök, klarade
        övningar och banor, använda facit och fel som uppstår i sidan. Ingen kod
        och ingen mejladress skickas. Inget sparas i din webbläsare, och
        IP-adressen används bara för att räkna fram en kod som byts varje dygn,
        sedan kastas den. Statistiken går alltså inte att koppla till dig. Det
        görs för att förbättra Kodskolan (berättigat intresse, artikel 6.1 f).
        Har du slagit på Do Not Track skickas ingenting.
      </p>

      <h2>Tjänster som används</h2>
      <ul>
        <li>
          <strong>Supabase</strong> – konton och framsteg. Servrar i London
          (Storbritannien, som EU räknar som lika säkert).
        </li>
        <li>
          <strong>Resend</strong> – skickar inloggningsmejlen, från Irland.
        </li>
        <li>
          <strong>PostHog</strong> – statistik och fel, i Frankfurt.
        </li>
        <li>
          <strong>Anthropic</strong> – AI-handledaren, om du använder den. Din
          fråga och kod skickas dit för att få ett svar.
        </li>
        <li>
          <strong>Stripe</strong> – betalningen, om du köper full tillgång.
          Stripe får din mejladress och kortuppgifter. Kodskolan sparar bara att
          köpet är gjort.
        </li>
        <li>
          <strong>GitHub Pages</strong> och <strong>Cloudflare</strong> – visar
          sajten och sköter domänen. Som alla webbservrar ser de din IP-adress
          när sidan hämtas.
        </li>
        <li>
          <strong>jsDelivr</strong> – Python och andra språk som körs i
          webbläsaren hämtas därifrån.
        </li>
      </ul>
      <p>
        Flera av företagen är amerikanska. Överföringar utanför EU skyddas då av
        EU:s standardavtalsklausuler eller EU–USA-ramverket.
      </p>

      <h2>Dina rättigheter</h2>
      <p>
        Du kan när som helst ladda ner allt som sparats om dig och radera kontot
        under <a href={`${BASE}konto`}>Mitt konto och data</a>. Du har också
        rätt att få fel rättade och att invända mot statistiken – mejla <Mail />
        . Tycker du att uppgifterna hanteras fel kan du klaga hos
        Integritetsskyddsmyndigheten (imy.se).
      </p>
    </>
  );
}

function Terms() {
  return (
    <>
      <p>
        Kodskolan drivs av {OWNER.name}. Genom att använda sajten godkänner du
        villkoren nedan. Frågor: <Mail />.
      </p>

      <h2>Att använda Kodskolan</h2>
      <ul>
        <li>Det är gratis att börja, med eller utan konto.</li>
        <li>
          Är du under 13 år behöver en förälder eller vårdnadshavare godkänna
          att du skapar ett konto.
        </li>
        <li>
          Använd sajten för att lära dig. Försök inte ta dig in i andras konton,
          överbelasta tjänsten eller använda inloggningen för att skicka mejl
          till andra.
        </li>
        <li>Konton som missbrukas kan stängas.</li>
      </ul>

      <h2>Köp av full tillgång</h2>
      <ul>
        <li>
          Full tillgång är ett engångsköp. Det öppnar alla banor i alla kurser,
          även kurser som kommer senare, så länge Kodskolan finns.
        </li>
        <li>
          Betalningen sköts av Stripe. Kodskolan ser aldrig ditt kortnummer.
          Kvittot kommer från Stripe till din mejladress.
        </li>
        <li>
          Tillgången börjar direkt efter betalningen. Eftersom det är digitalt
          innehåll godkänner du vid köpet att ångerrätten på 14 dagar upphör när
          tillgången börjar (lagen om distansavtal, 2 kap. 11 §).
        </li>
        <li>
          Fungerar något inte som det ska, hör av dig så löser vi det – och går
          det inte, får du pengarna tillbaka.
        </li>
        <li>Tillgången hör till ditt konto och kan inte delas med andra.</li>
      </ul>

      <h2>Ditt och vårt</h2>
      <p>
        Koden du skriver är din. Övningarna, texterna och bilderna på Kodskolan
        får du använda för att lära dig, men inte kopiera eller sälja vidare.
      </p>

      <h2>Diplom</h2>
      <p>
        Ett diplom visar att du klarat alla övningar och bossar i en kurs eller
        ett spår. Det är inte en formell examen och inget övervakat prov.
      </p>

      <h2>Inga garantier</h2>
      <p>
        Kodskolan görs så bra som möjligt, men kan ha fel och vara nere ibland.
        Kurser kan ändras, och sajten kan läggas ner – då får du en chans att
        ladda ner din data först. Kodskolan ansvarar inte för skador som uppstår
        av att använda sajten, så långt lagen tillåter.
      </p>

      <h2>Ändringar</h2>
      <p>
        Villkoren kan ändras. Större ändringar meddelas på sajten innan de
        gäller. Svensk lag gäller.
      </p>
    </>
  );
}

const BODIES = { integritet: Privacy, villkor: Terms };

// /integritet och /villkor. Skrivs ut som färdig HTML vid bygget.
export default function LegalPage({ kind }) {
  const { title } = LEGAL[kind];
  const Body = BODIES[kind];
  return (
    <>
      <header className="app-header">
        <h1>
          <a className="home-link" href={BASE}>
            Kodskolan
          </a>{' '}
          › {title}
        </h1>
      </header>
      <main className="home legal-page">
        <Body />
        <p className="muted">Senast ändrad {UPDATED}.</p>
      </main>
      <SiteFooter />
    </>
  );
}
