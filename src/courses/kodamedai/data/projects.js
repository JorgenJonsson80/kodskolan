import { projectSteps } from '../../../core/projects';

// Projekt som låses upp när en bana är klar: tre per bana med tre steg.
// Varje steg bygger vidare på förra stegets kod och tränar banans sak:
// laga assistentens förslag, beställa, läsa, testa, säkra och städa.
//
// given: kod som står både i startkoden och i facit (t.ex. kod att läsa).
// ai: assistentens förslag, bara i startkoden – eleven lagar det.
// start: annat som bara står i startkoden (t.ex. en tom beställning).
// add: det eleven skriver, som hamnar i facit.
const AI = '# Assistentens förslag – granska och laga:\n';
const READ = '# Assistentens kod – läs den och förutsäg vad den ger:\n';
const BOTH = '# Rör inte de här: assistentens version och en lagad.\n';

function project({ steps, ...rest }) {
  let previous = '';
  return {
    ...rest,
    steps: steps.map(
      ({ given = '', ai, start = '', add = '', ...step }, index) => {
        const head =
          index === 0
            ? ''
            : `${previous}\n# Steg ${index + 1}: ${step.title.toLowerCase()}\n`;
        const starterCode = `${head}${given}${ai ? `${AI}${ai}` : ''}${start}`;
        const solution = `${previous ? `${previous}\n` : ''}${given}${add}`;
        previous = solution;
        return { ...step, starterCode, solution };
      },
    ),
  };
}

// Ett test ska underkänna assistentens version och godkänna den lagade.
const fails = (test, broken) => ({
  description: 'Testet avslöjar assistentens fel',
  code: `__raises(${test}, ${broken}) is not None`,
  expected: true,
});
const passes = (test, fixed) => ({
  description: 'Testet godkänner den lagade versionen',
  code: `__raises(${test}, ${fixed}) is None`,
  expected: true,
});
// Gissningen ska skrivas för hand, inte räknas ut med funktionen.
const NO_CALL = {
  description: 'Gissningen är skriven för hand, inte uträknad med funktionen',
  pattern: /^\s*svar\w*\s*=\s*[A-Za-z_]\w*\(/m,
  forbidden: true,
};
const has = (text, description) => ({
  description,
  code: `${JSON.stringify(text)} in bestallning.lower()`,
  expected: true,
});

export const PROJECTS = [
  // Bana 1: AI-verktygen
  project({
    id: 'kmai-proj-halsning',
    track: 'verktyg',
    title: 'Hälsningsappen',
    reward: { emoji: '🙋', name: 'Vinkande hand' },
    summary:
      'Assistenten skrev en app som hälsar – med metoder som inte finns.',
    steps: [
      {
        title: 'Metoden som inte finns',
        why: 'Assistenter hittar på metoder som låter rätt. Python heter capitalize med z – felet säger exakt vad som saknas.',
        xp: 10,
        description: '`halsa("ada")` ska ge `Hej Ada`.',
        task: 'Uppgift: Kör koden, läs felet och laga `halsa(namn)` så att namnet får stor första bokstav.',
        ai: 'def halsa(namn):\n    return "Hej " + namn.capitalise()\n',
        add: 'def halsa(namn):\n    return "Hej " + namn.capitalize()\n',
        hints: [
          'Läs felet: vilken metod finns inte?',
          'Den heter capitalize, med z.',
          'return "Hej " + namn.capitalize()',
        ],
        tests: [
          {
            description: 'halsa("ada")',
            code: 'halsa("ada")',
            expected: 'Hej Ada',
          },
        ],
      },
      {
        title: 'Fel språk',
        why: 'map med en pil finns i JavaScript, inte i Python. Assistenten blandar språk när du inte säger vilket du använder.',
        xp: 15,
        description: 'Hälsa på alla i en lista.',
        task: 'Uppgift: Laga `halsa_alla(namnen)` så att den returnerar en lista med en hälsning per namn.',
        ai: 'def halsa_alla(namnen):\n    return namnen.map(namn => halsa(namn))\n',
        add: 'def halsa_alla(namnen):\n    return [halsa(namn) for namn in namnen]\n',
        hints: [
          'Det där är JavaScript. I Python gör man en lista med en loop.',
          '[ ... for namn in namnen]',
          'return [halsa(namn) for namn in namnen]',
        ],
        tests: [
          {
            description: 'halsa_alla(["ada", "bo"])',
            code: 'halsa_alla(["ada", "bo"])',
            expected: ['Hej Ada', 'Hej Bo'],
          },
          {
            description: 'En tom lista ger en tom lista',
            code: 'halsa_alla([])',
            expected: [],
          },
        ],
      },
      {
        title: 'Paketet som inte finns',
        why: 'Assistenter föreslår ibland paket som inte finns. Kolla alltid att ett paket är på riktigt – annars kan någon lägga upp ett falskt med det namnet.',
        xp: 15,
        description: 'Snygga till namn som skrivits slarvigt.',
        task: 'Uppgift: Paketet `namnfix` finns inte. Ta bort importen och skriv `snygga(namn)` själv: ta bort mellanslag runt namnet (`strip`) och ge det stor första bokstav.',
        ai: 'import namnfix\n\ndef snygga(namn):\n    return namnfix.clean(namn)\n',
        add: 'def snygga(namn):\n    return namn.strip().capitalize()\n',
        hints: [
          'Ta bort import namnfix.',
          'strip() tar bort mellanslag runt texten.',
          'return namn.strip().capitalize()',
        ],
        tests: [
          {
            description: 'snygga("  bo ")',
            code: 'snygga("  bo ")',
            expected: 'Bo',
          },
          {
            description: 'snygga("ADA")',
            code: 'snygga("ADA")',
            expected: 'Ada',
          },
        ],
      },
    ],
  }),
  project({
    id: 'kmai-proj-temperatur',
    track: 'verktyg',
    title: 'Temperaturen',
    reward: { emoji: '🌡️', name: 'Termometer' },
    summary: 'En liten väderapp – och vad du får visa assistenten.',
    steps: [
      {
        title: 'Formeln',
        why: 'Assistenten kan låta helt säker och ändå ha fel tal. Pröva med värden du vet svaret på: 0 °C är 32 °F.',
        xp: 10,
        description: 'Celsius till Fahrenheit.',
        task: 'Uppgift: `till_fahrenheit(c)` ska ge 32 för 0 och 212 för 100. Laga formeln.',
        ai: 'def till_fahrenheit(c):\n    return c * 9 / 5 + 23\n',
        add: 'def till_fahrenheit(c):\n    return c * 9 / 5 + 32\n',
        hints: [
          'Vad ger till_fahrenheit(0)?',
          'Det ska vara 32, inte 23.',
          'return c * 9 / 5 + 32',
        ],
        tests: [
          { description: '0 °C', code: 'till_fahrenheit(0)', expected: 32 },
          {
            description: '100 °C',
            code: 'till_fahrenheit(100)',
            expected: 212,
          },
        ],
      },
      {
        title: 'Vad får du skicka?',
        why: 'Allt du klistrar in i en chatt skickas till ett annat företag. Kod och felmeddelanden är okej – lösenord och nycklar aldrig.',
        xp: 10,
        description:
          'Appen ska hämta väder med en API-nyckel. Vad får du klistra in när du ber om hjälp?',
        task: 'Uppgift: Byt `None` mot `True` (okej att skicka) eller `False`.',
        start:
          'skicka = {\n    "Funktionen till_fahrenheit": None,\n    "API-nyckeln till vädertjänsten": None,\n    "Felmeddelandet från Python": None,\n}\n',
        add: 'skicka = {\n    "Funktionen till_fahrenheit": True,\n    "API-nyckeln till vädertjänsten": False,\n    "Felmeddelandet från Python": True,\n}\n',
        hints: [
          'Kod och fel är okej att visa.',
          'Nycklar och lösenord: aldrig.',
          'True, False, True.',
        ],
        tests: [
          {
            description: 'Rätt svar',
            code: 'list(skicka.values())',
            expected: [true, false, true],
          },
        ],
      },
      {
        title: 'Funktionen som inte finns',
        why: 'statistics har mean, inte average. Assistenten gissar namn som låter rimliga – läs felet och kolla.',
        xp: 15,
        description: 'Medeltemperaturen för en vecka.',
        task: 'Uppgift: Laga `medel(temperaturer)` så att den ger medelvärdet. Använd `sum` och `len`.',
        ai: 'import statistics\n\ndef medel(temperaturer):\n    return statistics.average(temperaturer)\n',
        add: 'def medel(temperaturer):\n    return sum(temperaturer) / len(temperaturer)\n',
        hints: [
          'average finns inte i statistics.',
          'Medelvärdet är summan delat med antalet.',
          'return sum(temperaturer) / len(temperaturer)',
        ],
        tests: [
          {
            description: 'medel([10, 20])',
            code: 'medel([10, 20])',
            expected: 15,
          },
          {
            description: 'medel([-2, 4, 1])',
            code: 'medel([-2, 4, 1])',
            expected: 1,
          },
        ],
      },
    ],
  }),
  project({
    id: 'kmai-proj-ordlek',
    track: 'verktyg',
    title: 'Ordleken',
    reward: { emoji: '🔤', name: 'Bokstäver' },
    summary: 'Små ordspel – och rätt verktyg för varje sak.',
    steps: [
      {
        title: 'Vokalerna',
        why: 'Text har ingen count_vowels. När en metod låter för bekväm för att vara sann – kolla.',
        xp: 10,
        description: 'Räkna vokalerna i ett ord.',
        task: 'Uppgift: Laga `antal_vokaler(ord)` så att den räknar bokstäverna som finns i `"aeiouyåäö"`.',
        ai: 'def antal_vokaler(ord):\n    return ord.count_vowels()\n',
        add: 'def antal_vokaler(ord):\n    antal = 0\n    for bokstav in ord.lower():\n        if bokstav in "aeiouyåäö":\n            antal += 1\n    return antal\n',
        hints: [
          'Gå igenom bokstäverna med en for-loop.',
          'if bokstav in "aeiouyåäö": räkna upp.',
          'Gör om till små bokstäver först med lower().',
        ],
        tests: [
          { description: 'banan', code: 'antal_vokaler("banan")', expected: 2 },
          { description: 'Öga', code: 'antal_vokaler("Öga")', expected: 2 },
        ],
      },
      {
        title: 'Rätt verktyg',
        why: 'Chatten för frågor, editorn för nästa rad, agenten för större ändringar i flera filer. Att välja rätt sparar tid.',
        xp: 10,
        description: 'Vilket verktyg passar bäst?',
        task: 'Uppgift: Byt `None` mot `"chatt"`, `"editor"` eller `"agent"`.',
        start:
          'verktyg = {\n    "Förklara varför count_vowels inte fungerar": None,\n    "Föreslå nästa rad medan jag skriver": None,\n    "Byt namn på en funktion i alla filer och kör testerna": None,\n}\n',
        add: 'verktyg = {\n    "Förklara varför count_vowels inte fungerar": "chatt",\n    "Föreslå nästa rad medan jag skriver": "editor",\n    "Byt namn på en funktion i alla filer och kör testerna": "agent",\n}\n',
        hints: [
          'Förklaringar: fråga i chatten.',
          'Förslag medan du skriver: editorn.',
          'Många filer och tester: agenten.',
        ],
        tests: [
          {
            description: 'Rätt verktyg',
            code: 'list(verktyg.values())',
            expected: ['chatt', 'editor', 'agent'],
          },
        ],
      },
      {
        title: 'Palindromen',
        why: 'reverse finns för listor men inte för text, och den returnerar None. [::-1] vänder text.',
        xp: 15,
        description: 'Är ordet likadant baklänges?',
        task: 'Uppgift: Laga `ar_palindrom(ord)`. Stora och små bokstäver ska inte spela roll: `"Anna"` är ett palindrom.',
        ai: 'def ar_palindrom(ord):\n    return ord == ord.reverse()\n',
        add: 'def ar_palindrom(ord):\n    ord = ord.lower()\n    return ord == ord[::-1]\n',
        hints: [
          'Text vänds med [::-1].',
          'Gör om till små bokstäver först.',
          'ord = ord.lower() och return ord == ord[::-1]',
        ],
        tests: [
          { description: 'Anna', code: 'ar_palindrom("Anna")', expected: true },
          { description: 'Bo', code: 'ar_palindrom("Bo")', expected: false },
        ],
      },
    ],
  }),

  // Bana 2: beställ rätt
  project({
    id: 'kmai-proj-rabatt',
    track: 'bestall',
    title: 'Rabattkoden',
    reward: { emoji: '🎟️', name: 'Biljett' },
    summary: 'Beställ en rabattfunktion och laga det assistenten glömde.',
    steps: [
      {
        title: 'Beställningen',
        why: 'Namn, vad den får och vad den ger – och ett exempel. Med ett exempel finns det bara ett sätt att förstå beställningen.',
        xp: 10,
        description: 'Kunder med koden STUDENT får 10 % rabatt.',
        task: 'Uppgift: Skriv en beställning i `bestallning` av `rabatt(pris, kod)`. Nämn namnet, att den returnerar priset, och ett exempel (ordet `exempel`).',
        start: 'bestallning = ""\n',
        add: 'bestallning = "Skriv en Python-funktion rabatt(pris, kod) som returnerar priset efter rabatt. Koden STUDENT ger 10 % rabatt. Exempel: rabatt(100, \\"STUDENT\\") ger 90."\n',
        hints: [
          'Börja med funktionens namn: rabatt(pris, kod).',
          'Säg att den returnerar priset.',
          'Skriv ett exempel: rabatt(100, "STUDENT") ger 90.',
        ],
        tests: [
          has('rabatt(pris, kod)', 'Nämner rabatt(pris, kod)'),
          has('return', 'Säger vad den returnerar'),
          has('exempel', 'Har ett exempel'),
        ],
      },
      {
        title: 'Svaret',
        why: 'Beställningen sa inget om andra koder, och då glömde assistenten dem. En funktion utan return ger None.',
        xp: 15,
        description: 'Assistenten svarade. Pröva en kod som inte finns.',
        task: 'Uppgift: Laga `rabatt` så att andra koder ger fullt pris.',
        ai: 'def rabatt(pris, kod):\n    if kod == "STUDENT":\n        return pris * 0.9\n',
        add: 'def rabatt(pris, kod):\n    if kod == "STUDENT":\n        return pris * 0.9\n    return pris\n',
        hints: [
          'Vad ger rabatt(100, "FEL")?',
          'Funktionen returnerar inget för andra koder.',
          'Lägg till return pris sist.',
        ],
        tests: [
          {
            description: 'STUDENT',
            code: 'rabatt(100, "STUDENT")',
            expected: 90,
          },
          {
            description: 'En annan kod',
            code: 'rabatt(100, "FEL")',
            expected: 100,
          },
        ],
      },
      {
        title: 'Kantfallet',
        why: 'Kunder skriver koden som de vill. Ett kantfall du inte nämner i beställningen får du laga själv.',
        xp: 15,
        description: 'En kund skrev "student".',
        task: 'Uppgift: Skriv om `rabatt` så att koden fungerar oavsett stora och små bokstäver.',
        add: 'def rabatt(pris, kod):\n    if kod.upper() == "STUDENT":\n        return pris * 0.9\n    return pris\n',
        hints: [
          'Gör om koden till stora bokstäver innan du jämför.',
          'kod.upper()',
          'if kod.upper() == "STUDENT":',
        ],
        tests: [
          {
            description: 'student',
            code: 'rabatt(100, "student")',
            expected: 90,
          },
          {
            description: 'En annan kod',
            code: 'rabatt(100, "fel")',
            expected: 100,
          },
        ],
      },
    ],
  }),
  project({
    id: 'kmai-proj-betyg',
    track: 'bestall',
    title: 'Betygsräknaren',
    reward: { emoji: '🎓', name: 'Studentmössa' },
    summary: 'Poäng blir betyg – och gränserna avgör allt.',
    steps: [
      {
        title: 'Gränserna',
        why: 'Säger du var gränserna går – och att de ska ingå – slipper du gissa vad assistenten menade.',
        xp: 10,
        description: 'A från 90 poäng, C från 70, E från 50, annars F.',
        task: 'Uppgift: Beställ `betyg(poang)` i `bestallning`. Nämn namnet, gränserna (minst `90`) och ett exempel.',
        start: 'bestallning = ""\n',
        add: 'bestallning = "Skriv betyg(poang) som returnerar A från och med 90 poäng, C från 70, E från 50 och annars F. Exempel: betyg(70) ger C."\n',
        hints: [
          'Nämn betyg(poang).',
          'Skriv ut gränserna: 90, 70 och 50.',
          'Lägg till ett exempel.',
        ],
        tests: [
          has('betyg(poang)', 'Nämner betyg(poang)'),
          has('90', 'Säger var gränsen för A går'),
          has('exempel', 'Har ett exempel'),
        ],
      },
      {
        title: 'Från och med',
        why: '> och >= skiljer sig bara precis på gränsen. Det är därför man testar just 90, 70 och 50.',
        xp: 15,
        description: 'Assistenten svarade – men 90 poäng gav C.',
        task: 'Uppgift: Laga `betyg` så att gränserna ingår.',
        ai: 'def betyg(poang):\n    if poang > 90:\n        return "A"\n    elif poang > 70:\n        return "C"\n    elif poang > 50:\n        return "E"\n    return "F"\n',
        add: 'def betyg(poang):\n    if poang >= 90:\n        return "A"\n    elif poang >= 70:\n        return "C"\n    elif poang >= 50:\n        return "E"\n    return "F"\n',
        hints: ['Vad ger betyg(90)?', '> ska vara >=.', 'Byt alla tre.'],
        tests: [
          { description: '90 ger A', code: 'betyg(90)', expected: 'A' },
          { description: '70 ger C', code: 'betyg(70)', expected: 'C' },
          { description: '50 ger E', code: 'betyg(50)', expected: 'E' },
          { description: '49 ger F', code: 'betyg(49)', expected: 'F' },
        ],
      },
      {
        title: 'En sak i taget',
        why: 'När en funktion fungerar bygger du nästa på den. Små steg är lätta att kolla – för dig och för assistenten.',
        xp: 15,
        description: 'Betyg för hela klassen.',
        task: 'Uppgift: Skriv `betyg_for_alla(lista)` som returnerar en lista med betyget för varje poäng. Använd `betyg`.',
        add: 'def betyg_for_alla(lista):\n    return [betyg(poang) for poang in lista]\n',
        hints: [
          'En lista med ett betyg per poäng.',
          '[betyg(poang) for poang in lista]',
          'return [betyg(poang) for poang in lista]',
        ],
        tests: [
          {
            description: 'betyg_for_alla([95, 70, 10])',
            code: 'betyg_for_alla([95, 70, 10])',
            expected: ['A', 'C', 'F'],
          },
        ],
      },
    ],
  }),
  project({
    id: 'kmai-proj-handla',
    track: 'bestall',
    title: 'Inköpslistan',
    reward: { emoji: '🧺', name: 'Korg' },
    summary: 'Lägga till och ta bort – och vad händer om varan redan finns?',
    steps: [
      {
        title: 'Beställ med kantfall',
        why: 'Det vanliga fallet klarar assistenten. Kantfallen – som en vara som redan finns – måste du säga.',
        xp: 10,
        description: 'Samma vara ska inte stå två gånger.',
        task: 'Uppgift: Beställ `lagg_till(lista, vara)` i `bestallning`. Nämn namnet, ett exempel och vad som ska hända om varan redan finns (ordet `redan`).',
        start: 'bestallning = ""\n',
        add: 'bestallning = "Skriv lagg_till(lista, vara) som lägger till varan sist och returnerar listan. Finns varan redan ska den inte läggas till igen. Exempel: lagg_till([\\"mjölk\\"], \\"bröd\\") ger [\\"mjölk\\", \\"bröd\\"]."\n',
        hints: [
          'Nämn lagg_till(lista, vara).',
          'Skriv vad som händer om varan redan finns.',
          'Lägg till ett exempel.',
        ],
        tests: [
          has('lagg_till(lista, vara)', 'Nämner lagg_till(lista, vara)'),
          has('redan', 'Säger vad som händer med en vara som redan finns'),
          has('exempel', 'Har ett exempel'),
        ],
      },
      {
        title: 'Svaret',
        why: 'Assistenten skrev det enklaste. Kolla alltid kantfallet du beställde.',
        xp: 15,
        description: 'Mjölk, mjölk, mjölk.',
        task: 'Uppgift: Laga `lagg_till` så att en vara som redan finns inte läggs till igen.',
        ai: 'def lagg_till(lista, vara):\n    lista.append(vara)\n    return lista\n',
        add: 'def lagg_till(lista, vara):\n    if vara not in lista:\n        lista.append(vara)\n    return lista\n',
        hints: [
          'Kolla om varan redan finns.',
          'if vara not in lista:',
          'append bara då.',
        ],
        tests: [
          {
            description: 'En ny vara',
            code: 'lagg_till([], "bröd")',
            expected: ['bröd'],
          },
          {
            description: 'En vara som redan finns',
            code: 'lagg_till(["mjölk"], "mjölk")',
            expected: ['mjölk'],
          },
        ],
      },
      {
        title: 'Ta bort',
        why: 'remove kraschar med ValueError om varan inte finns. Det glömmer assistenten ofta.',
        xp: 15,
        description: 'Assistenten skrev nästa funktion också.',
        task: 'Uppgift: Laga `ta_bort(lista, vara)` så att den inte kraschar när varan inte finns.',
        ai: 'def ta_bort(lista, vara):\n    lista.remove(vara)\n    return lista\n',
        add: 'def ta_bort(lista, vara):\n    if vara in lista:\n        lista.remove(vara)\n    return lista\n',
        hints: [
          'Vad händer med ta_bort(["a"], "b")?',
          'Kolla att varan finns först.',
          'if vara in lista: lista.remove(vara)',
        ],
        tests: [
          {
            description: 'Varan finns',
            code: 'ta_bort(["a", "b"], "a")',
            expected: ['b'],
          },
          {
            description: 'Varan finns inte',
            code: 'ta_bort(["a"], "b")',
            expected: ['a'],
          },
        ],
      },
    ],
  }),

  // Bana 3: läs koden du får
  project({
    id: 'kmai-proj-kvitto',
    track: 'las',
    title: 'Kvittot',
    reward: { emoji: '🧾', name: 'Kvitto' },
    summary: 'Förstå assistentens kvittokod innan du använder den.',
    steps: [
      {
        title: 'En rad',
        why: 'Att förutsäga vad koden gör är det snabbaste sättet att se om du förstår den.',
        xp: 10,
        description: 'Vad blir en rad på kvittot?',
        task: 'Uppgift: Vad ger `rad("bulle", 2, 15)`? Skriv svaret för hand i `svar_1`.',
        given: `${READ}def rad(vara, antal, pris):\n    return f"{vara} x{antal}: {antal * pris} kr"\n\n`,
        start: 'svar_1 = None\n',
        add: 'svar_1 = "bulle x2: 30 kr"\n',
        hints: [
          'f-strängen sätter in värdena där {} står.',
          'antal * pris är 2 * 15.',
          'svar_1 = "bulle x2: 30 kr"',
        ],
        tests: [
          {
            description: 'svar_1 stämmer',
            code: 'svar_1 == rad("bulle", 2, 15)',
            expected: true,
          },
        ],
        sourceChecks: [NO_CALL],
      },
      {
        title: 'Summan',
        why: 'Läs villkoret noga: rabatten gäller bara från en viss summa. Det är sådant assistenten lägger till utan att säga det.',
        xp: 15,
        description: 'Assistenten lade till en summa – med en överraskning.',
        task: 'Uppgift: Vad ger `summa([50, 60])` och `summa([30, 40])`? Skriv svaren i `svar_2` och `svar_3`.',
        given:
          'def summa(priser):\n    total = 0\n    for pris in priser:\n        total += pris\n    if total >= 100:\n        return total * 0.9\n    return total\n\n',
        start: 'svar_2 = None\nsvar_3 = None\n',
        add: 'svar_2 = 99\nsvar_3 = 70\n',
        hints: [
          '50 + 60 är 110. Är det minst 100?',
          '110 * 0.9 är 99.',
          '30 + 40 är 70, under 100.',
        ],
        tests: [
          {
            description: 'svar_2 stämmer',
            code: 'svar_2 == summa([50, 60])',
            expected: true,
          },
          {
            description: 'svar_3 stämmer',
            code: 'svar_3 == summa([30, 40])',
            expected: true,
          },
        ],
        sourceChecks: [NO_CALL],
      },
      {
        title: 'Filtret',
        why: '> och >= igen: läs gränsen och pröva i huvudet med talet precis på gränsen.',
        xp: 15,
        description: 'Vilka varor köptes det många av?',
        task: 'Uppgift: Vad ger `manga(varor, 2)` med listan nedan? Skriv svaret i `svar_4`.',
        given:
          'def manga(varor, grans):\n    return [vara for vara, antal in varor if antal > grans]\n\nvaror = [("bulle", 2), ("kaffe", 1), ("te", 3)]\n\n',
        start: 'svar_4 = None\n',
        add: 'svar_4 = ["te"]\n',
        hints: [
          'Bara varor med antal större än 2 följer med.',
          'bulle har 2 – inte större än 2.',
          'svar_4 = ["te"]',
        ],
        tests: [
          {
            description: 'svar_4 stämmer',
            code: 'svar_4 == manga(varor, 2)',
            expected: true,
          },
        ],
        sourceChecks: [NO_CALL],
      },
    ],
  }),
  project({
    id: 'kmai-proj-lag',
    track: 'las',
    title: 'Lagindelningen',
    reward: { emoji: '🏐', name: 'Volleyboll' },
    summary: 'Assistenten delar in klassen i lag. Gör den som du tror?',
    steps: [
      {
        title: 'Varannan',
        why: '[::2] tar varannan från början, [1::2] varannan från den andra. Kort kod kan göra mycket – läs den långsamt.',
        xp: 15,
        description: 'Hur blir lagen?',
        task: 'Uppgift: Vad ger `dela(["Ada", "Bo", "Cy", "Di", "Ek"])`? Skriv svaret i `svar_1`.',
        given: `${READ}def dela(namn):\n    return namn[::2], namn[1::2]\n\n`,
        start: 'svar_1 = None\n',
        add: 'svar_1 = (["Ada", "Cy", "Ek"], ["Bo", "Di"])\n',
        hints: [
          'Funktionen returnerar två listor.',
          '[::2] tar plats 0, 2 och 4.',
          'svar_1 = (["Ada", "Cy", "Ek"], ["Bo", "Di"])',
        ],
        tests: [
          {
            description: 'svar_1 stämmer',
            code: 'svar_1 == dela(["Ada", "Bo", "Cy", "Di", "Ek"])',
            expected: true,
          },
        ],
        sourceChecks: [NO_CALL],
      },
      {
        title: 'Störst',
        why: 'Följ if, elif och det sista return – vilket når man när inget villkor är sant?',
        xp: 10,
        description: 'Vilket lag är störst?',
        task: 'Uppgift: Vad ger `storst(["a", "b"], ["c", "d"])`? Skriv svaret i `svar_2`.',
        given:
          'def storst(lag1, lag2):\n    if len(lag1) > len(lag2):\n        return "lag 1"\n    elif len(lag1) < len(lag2):\n        return "lag 2"\n    return "lika"\n\n',
        start: 'svar_2 = None\n',
        add: 'svar_2 = "lika"\n',
        hints: [
          'Båda lagen har två.',
          'Inget av villkoren är sant.',
          'svar_2 = "lika"',
        ],
        tests: [
          {
            description: 'svar_2 stämmer',
            code: 'svar_2 == storst(["a", "b"], ["c", "d"])',
            expected: true,
          },
        ],
        sourceChecks: [NO_CALL],
      },
      {
        title: 'Lagnamnet',
        why: 'namn[0][0] är första bokstaven i första namnet. Två index i rad – ta dem ett i taget.',
        xp: 15,
        description: 'Laget får ett namn av bokstäverna.',
        task: 'Uppgift: Vad ger `lagnamn(["Ada", "Cy", "Ek"])`? Skriv svaret i `svar_3`.',
        given: 'def lagnamn(namn):\n    return namn[0][0] + namn[-1][0]\n\n',
        start: 'svar_3 = None\n',
        add: 'svar_3 = "AE"\n',
        hints: [
          'namn[0] är "Ada", och [0] av det är "A".',
          'namn[-1] är det sista namnet.',
          'svar_3 = "AE"',
        ],
        tests: [
          {
            description: 'svar_3 stämmer',
            code: 'svar_3 == lagnamn(["Ada", "Cy", "Ek"])',
            expected: true,
          },
        ],
        sourceChecks: [NO_CALL],
      },
    ],
  }),
  project({
    id: 'kmai-proj-losenord',
    track: 'las',
    title: 'Lösenordskollen',
    reward: { emoji: '🗝️', name: 'Gammal nyckel' },
    summary: 'Hur starkt är lösenordet? Läs assistentens regler.',
    steps: [
      {
        title: 'Längden',
        why: 'Räkna tecknen själv. "Ungefär åtta" räcker inte när gränsen är exakt.',
        xp: 10,
        description: 'Är lösenordet långt nog?',
        task: 'Uppgift: Vad ger `langt_nog("hemligt")`? Skriv svaret i `svar_1`.',
        given: `${READ}def langt_nog(losen):\n    return len(losen) >= 8\n\n`,
        start: 'svar_1 = None\n',
        add: 'svar_1 = False\n',
        hints: [
          'Räkna bokstäverna i hemligt.',
          'Det är sju.',
          'svar_1 = False',
        ],
        tests: [
          {
            description: 'svar_1 stämmer',
            code: 'svar_1 == langt_nog("hemligt")',
            expected: true,
          },
        ],
        sourceChecks: [NO_CALL],
      },
      {
        title: 'En siffra',
        why: 'return inne i en loop avslutar hela funktionen direkt. Och en tom text går aldrig in i loopen.',
        xp: 15,
        description: 'Finns det en siffra?',
        task: 'Uppgift: Vad ger `har_siffra("abc1")` och `har_siffra("")`? Skriv svaren i `svar_2` och `svar_3`.',
        given:
          'def har_siffra(losen):\n    for tecken in losen:\n        if tecken.isdigit():\n            return True\n    return False\n\n',
        start: 'svar_2 = None\nsvar_3 = None\n',
        add: 'svar_2 = True\nsvar_3 = False\n',
        hints: [
          '1 är en siffra.',
          'En tom text har inga tecken att gå igenom.',
          'svar_2 = True och svar_3 = False',
        ],
        tests: [
          {
            description: 'svar_2 stämmer',
            code: 'svar_2 == har_siffra("abc1")',
            expected: true,
          },
          {
            description: 'svar_3 stämmer',
            code: 'svar_3 == har_siffra("")',
            expected: true,
          },
        ],
        sourceChecks: [NO_CALL],
      },
      {
        title: 'Styrkan',
        why: 'En funktion som använder andra funktioner läser du inifrån och ut: ta en del i taget.',
        xp: 15,
        description: 'Poäng för längd, siffra och stor bokstav.',
        task: 'Uppgift: Vad ger `styrka("Sommar2026")` och `styrka("sommar")`? Skriv svaren i `svar_4` och `svar_5`.',
        given:
          'def styrka(losen):\n    poang = 0\n    if langt_nog(losen):\n        poang += 1\n    if har_siffra(losen):\n        poang += 1\n    if losen != losen.lower():\n        poang += 1\n    return poang\n\n',
        start: 'svar_4 = None\nsvar_5 = None\n',
        add: 'svar_4 = 3\nsvar_5 = 0\n',
        hints: [
          'Sommar2026: tio tecken, siffror och ett stort S.',
          'losen != losen.lower() är sant om det finns en stor bokstav.',
          'sommar: sex tecken, inga siffror, bara små.',
        ],
        tests: [
          {
            description: 'svar_4 stämmer',
            code: 'svar_4 == styrka("Sommar2026")',
            expected: true,
          },
          {
            description: 'svar_5 stämmer',
            code: 'svar_5 == styrka("sommar")',
            expected: true,
          },
        ],
        sourceChecks: [NO_CALL],
      },
    ],
  }),

  // Bana 4: AI:ns vanliga fel
  project({
    id: 'kmai-proj-bio',
    track: 'fel',
    title: 'Biobiljetten',
    reward: { emoji: '🎬', name: 'Filmklappa' },
    summary: 'Priser för barn, vuxna och pensionärer – tre klassiska fel.',
    steps: [
      {
        title: 'Gränsen',
        why: 'Från och med 65 betyder >=. Testa alltid talet precis på gränsen.',
        xp: 15,
        description: 'Barn under 12: 60 kr. Från 65 år: 80 kr. Annars 120 kr.',
        task: 'Uppgift: Laga `pris(alder)`.',
        ai: 'def pris(alder):\n    if alder < 12:\n        return 60\n    elif alder > 65:\n        return 80\n    return 120\n',
        add: 'def pris(alder):\n    if alder < 12:\n        return 60\n    elif alder >= 65:\n        return 80\n    return 120\n',
        hints: [
          'Vad kostar det för en som är 65?',
          '> ska vara >=.',
          'elif alder >= 65:',
        ],
        tests: [
          { description: '65 år', code: 'pris(65)', expected: 80 },
          { description: '11 år', code: 'pris(11)', expected: 60 },
          { description: '12 år', code: 'pris(12)', expected: 120 },
        ],
      },
      {
        title: 'Ingen i sällskapet',
        why: 'Division med noll när listan är tom. Bestäm vad som ska hända och skriv det först.',
        xp: 15,
        description:
          'Snittpriset för ett sällskap. Ett tomt sällskap ska ge 0.',
        task: 'Uppgift: Laga `snittpris(aldrar)`.',
        ai: 'def snittpris(aldrar):\n    return sum(pris(alder) for alder in aldrar) / len(aldrar)\n',
        add: 'def snittpris(aldrar):\n    if not aldrar:\n        return 0\n    return sum(pris(alder) for alder in aldrar) / len(aldrar)\n',
        hints: [
          'Vad händer med snittpris([])?',
          'Kolla om listan är tom först.',
          'if not aldrar: return 0',
        ],
        tests: [
          {
            description: 'Ett tomt sällskap',
            code: 'snittpris([])',
            expected: 0,
          },
          {
            description: '10 och 30 år',
            code: 'snittpris([10, 30])',
            expected: 90,
          },
        ],
      },
      {
        title: 'Text från kassan',
        why: 'Det som skrivs i kassan kommer som text. "70" < 12 går inte att jämföra.',
        xp: 10,
        description: 'Åldern kommer från input().',
        task: 'Uppgift: Laga `fran_kassan(text)` så att den ger priset för åldern i texten.',
        ai: 'def fran_kassan(text):\n    return pris(text)\n',
        add: 'def fran_kassan(text):\n    return pris(int(text))\n',
        hints: [
          'text är t.ex. "70".',
          'Gör om den till ett tal.',
          'return pris(int(text))',
        ],
        tests: [
          {
            description: 'fran_kassan("70")',
            code: 'fran_kassan("70")',
            expected: 80,
          },
          {
            description: 'fran_kassan("8")',
            code: 'fran_kassan("8")',
            expected: 60,
          },
        ],
      },
    ],
  }),
  project({
    id: 'kmai-proj-sparmal',
    track: 'fel',
    title: 'Sparmålet',
    reward: { emoji: '🐷', name: 'Spargris' },
    summary: 'Hur länge dröjer det tills du har råd?',
    steps: [
      {
        title: 'Avrunda uppåt',
        why: '// rundar nedåt. 1000 kr med 300 i månaden tar fyra månader, inte tre – tre räcker bara till 900.',
        xp: 15,
        description: 'Hur många månader tar det?',
        task: 'Uppgift: Laga `manader(mal, per_manad)` så att den rundar uppåt.',
        ai: 'def manader(mal, per_manad):\n    return mal // per_manad\n',
        add: 'def manader(mal, per_manad):\n    antal = mal // per_manad\n    if antal * per_manad < mal:\n        antal += 1\n    return antal\n',
        hints: [
          'Vad ger manader(1000, 300)?',
          'Räcker inte månaderna, behövs en till.',
          'if antal * per_manad < mal: antal += 1',
        ],
        tests: [
          {
            description: '1000 med 300',
            code: 'manader(1000, 300)',
            expected: 4,
          },
          {
            description: '900 med 300',
            code: 'manader(900, 300)',
            expected: 3,
          },
        ],
      },
      {
        title: 'Den första insättningen',
        why: 'range(1, …) hoppar över plats 0. Ett av de vanligaste felen: ett steg för lite.',
        xp: 15,
        description: 'Summan av insättningarna.',
        task: 'Uppgift: Laga `sparat(insattningar)` så att alla insättningar räknas.',
        ai: 'def sparat(insattningar):\n    total = 0\n    for i in range(1, len(insattningar)):\n        total += insattningar[i]\n    return total\n',
        add: 'def sparat(insattningar):\n    return sum(insattningar)\n',
        hints: [
          'Vad ger sparat([100, 200])?',
          'Loopen börjar på 1.',
          'return sum(insattningar)',
        ],
        tests: [
          {
            description: '100 och 200',
            code: 'sparat([100, 200])',
            expected: 300,
          },
          { description: 'Inga insättningar', code: 'sparat([])', expected: 0 },
        ],
      },
      {
        title: 'Aldrig minus',
        why: 'Har du sparat mer än målet är det 0 kvar, inte minus. max(0, …) sätter ett golv.',
        xp: 10,
        description: 'Hur mycket är kvar?',
        task: 'Uppgift: Laga `kvar(mal, insattningar)` så att den aldrig blir negativ.',
        ai: 'def kvar(mal, insattningar):\n    return mal - sparat(insattningar)\n',
        add: 'def kvar(mal, insattningar):\n    return max(0, mal - sparat(insattningar))\n',
        hints: [
          'Vad ger kvar(500, [600])?',
          'Det ska vara 0.',
          'return max(0, mal - sparat(insattningar))',
        ],
        tests: [
          {
            description: 'Mer än målet',
            code: 'kvar(500, [600])',
            expected: 0,
          },
          {
            description: 'Mindre än målet',
            code: 'kvar(500, [100])',
            expected: 400,
          },
        ],
      },
    ],
  }),
  project({
    id: 'kmai-proj-topplista',
    track: 'fel',
    title: 'Topplistan',
    reward: { emoji: '🥇', name: 'Guldmedalj' },
    summary: 'Ett spels topplista: ordning, tomma listor och plats ett.',
    steps: [
      {
        title: 'Åt vilket håll?',
        why: 'sorted sorterar minst först. Ser resultatet rimligt ut? Kolla alltid med ett exempel.',
        xp: 10,
        description: 'De tre bästa.',
        task: 'Uppgift: Laga `topp3(poang)` så att den ger de tre högsta, högst först.',
        ai: 'def topp3(poang):\n    return sorted(poang)[:3]\n',
        add: 'def topp3(poang):\n    return sorted(poang, reverse=True)[:3]\n',
        hints: [
          'sorted ger lägst först.',
          'reverse=True vänder.',
          'sorted(poang, reverse=True)[:3]',
        ],
        tests: [
          {
            description: 'topp3([5, 9, 1, 7])',
            code: 'topp3([5, 9, 1, 7])',
            expected: [9, 7, 5],
          },
        ],
      },
      {
        title: 'Ingen har spelat',
        why: 'max av en tom lista ger ValueError. Ingen har spelat än – det är inget fel, bara ett fall att hantera.',
        xp: 15,
        description: 'Bästa poängen, eller None om ingen spelat.',
        task: 'Uppgift: Laga `basta(poang)`.',
        ai: 'def basta(poang):\n    return max(poang)\n',
        add: 'def basta(poang):\n    if not poang:\n        return None\n    return max(poang)\n',
        hints: [
          'Vad händer med basta([])?',
          'Kolla om listan är tom.',
          'if not poang: return None',
        ],
        tests: [
          { description: 'Tom lista', code: 'basta([])', expected: null },
          { description: 'basta([3, 8])', code: 'basta([3, 8])', expected: 8 },
        ],
      },
      {
        title: 'Plats ett',
        why: 'index räknar från 0, men människor säger plats 1. Det är ett av de vanligaste felen i all kod.',
        xp: 15,
        description: 'Vilken plats kom du på?',
        task: 'Uppgift: Laga `placering(poang, mina)` så att den bästa får plats 1.',
        ai: 'def placering(poang, mina):\n    return sorted(poang, reverse=True).index(mina)\n',
        add: 'def placering(poang, mina):\n    return sorted(poang, reverse=True).index(mina) + 1\n',
        hints: [
          'index ger 0 för den första.',
          'Lägg till 1.',
          'return … .index(mina) + 1',
        ],
        tests: [
          { description: 'Bäst', code: 'placering([5, 9, 7], 9)', expected: 1 },
          { description: 'Sist', code: 'placering([5, 9, 7], 5)', expected: 3 },
        ],
      },
    ],
  }),

  // Bana 5: testa AI:ns kod
  project({
    id: 'kmai-proj-frakt',
    track: 'testa',
    title: 'Fraktkollen',
    reward: { emoji: '🚚', name: 'Lastbil' },
    summary: 'Skriv tester som fångar assistentens fel i en webbshops frakt.',
    steps: [
      {
        title: 'Gränsen',
        why: 'Ett bra test prövar gränsen. Fri frakt från 500 kr – testa precis 500.',
        xp: 15,
        description: 'Fri frakt från och med 500 kr, annars 49 kr.',
        task: 'Uppgift: Skriv `test_frakt(f)` som avslöjar assistentens fel.',
        given: `${BOTH}def ai_frakt(summa):\n    return 0 if summa > 500 else 49\n\ndef lagad_frakt(summa):\n    return 0 if summa >= 500 else 49\n\n`,
        start: '# Skriv test_frakt(f) här\n',
        add: 'def test_frakt(f):\n    assert f(500) == 0\n    assert f(100) == 49\n',
        hints: [
          'Var skiljer sig > och >=?',
          'Precis på 500.',
          'assert f(500) == 0',
        ],
        tests: [
          fails('test_frakt', 'ai_frakt'),
          passes('test_frakt', 'lagad_frakt'),
        ],
      },
      {
        title: 'Vikten',
        why: 'Samma fel kan finnas på ett annat ställe. Har du hittat det en gång, leta efter det igen.',
        xp: 15,
        description: 'Paket upp till och med 5 kg kostar 49 kr, tyngre 99 kr.',
        task: 'Uppgift: Skriv `test_vikt(f)` som avslöjar felet.',
        given: `${BOTH}def ai_vikt(kg):\n    return 49 if kg < 5 else 99\n\ndef lagad_vikt(kg):\n    return 49 if kg <= 5 else 99\n\n`,
        start: '# Skriv test_vikt(f) här\n',
        add: 'def test_vikt(f):\n    assert f(5) == 49\n    assert f(6) == 99\n',
        hints: [
          'Upp till och med 5 kg.',
          'Testa precis 5.',
          'assert f(5) == 49',
        ],
        tests: [
          fails('test_vikt', 'ai_vikt'),
          passes('test_vikt', 'lagad_vikt'),
        ],
      },
      {
        title: 'Hela köpet',
        why: 'Delarna kan fungera var för sig men inte ihop. Testa helheten också.',
        xp: 20,
        description: 'Assistenten räknar alltid med frakt.',
        task: 'Uppgift: Skriv `test_totalt(f)` som avslöjar att assistenten glömmer den fria frakten.',
        given: `${BOTH}def ai_totalt(varor):\n    return sum(varor) + 49\n\ndef lagad_totalt(varor):\n    summa = sum(varor)\n    return summa + lagad_frakt(summa)\n\n`,
        start: '# Skriv test_totalt(f) här\n',
        add: 'def test_totalt(f):\n    assert f([100]) == 149\n    assert f([300, 300]) == 600\n',
        hints: [
          'Ett köp under 500 ska få frakt.',
          'Ett köp över 500 ska inte.',
          'assert f([300, 300]) == 600',
        ],
        tests: [
          fails('test_totalt', 'ai_totalt'),
          passes('test_totalt', 'lagad_totalt'),
        ],
      },
    ],
  }),
  project({
    id: 'kmai-proj-namn',
    track: 'testa',
    title: 'Namnlistan',
    reward: { emoji: '📇', name: 'Kortregister' },
    summary: 'Tester för initialer, sortering och dubletter.',
    steps: [
      {
        title: 'Initialerna',
        why: 'Välj ett testfall där fel svar syns tydligt. "Ada Lovelace" har olika första och sista bokstav.',
        xp: 15,
        description: '"Ada Lovelace" ska bli "AL".',
        task: 'Uppgift: Skriv `test_initialer(f)` som avslöjar assistentens fel.',
        given: `${BOTH}def ai_initialer(namn):\n    return namn[0] + namn[-1]\n\ndef lagad_initialer(namn):\n    delar = namn.split()\n    return delar[0][0] + delar[-1][0]\n\n`,
        start: '# Skriv test_initialer(f) här\n',
        add: 'def test_initialer(f):\n    assert f("Ada Lovelace") == "AL"\n',
        hints: [
          'Vad ger ai_initialer("Ada Lovelace")?',
          'Det blir "Ae".',
          'assert f("Ada Lovelace") == "AL"',
        ],
        tests: [
          fails('test_initialer', 'ai_initialer'),
          passes('test_initialer', 'lagad_initialer'),
        ],
      },
      {
        title: 'Små och stora bokstäver',
        why: 'sorted lägger alla stora bokstäver före de små. Med bara stora namn i testet syns inte felet.',
        xp: 15,
        description: 'Namnen ska sorteras som i en telefonbok.',
        task: 'Uppgift: Skriv `test_sortera(f)` som avslöjar felet.',
        given: `${BOTH}def ai_sortera(namn):\n    return sorted(namn)\n\ndef lagad_sortera(namn):\n    return sorted(namn, key=str.lower)\n\n`,
        start: '# Skriv test_sortera(f) här\n',
        add: 'def test_sortera(f):\n    assert f(["bo", "Cy"]) == ["bo", "Cy"]\n',
        hints: [
          'Blanda små och stora bokstäver.',
          'sorted(["bo", "Cy"]) ger ["Cy", "bo"].',
          'assert f(["bo", "Cy"]) == ["bo", "Cy"]',
        ],
        tests: [
          fails('test_sortera', 'ai_sortera'),
          passes('test_sortera', 'lagad_sortera'),
        ],
      },
      {
        title: 'Dubletterna',
        why: 'Assistenten tog bort alla som fanns två gånger – även originalet. Testa med en dublett och se vad som blir kvar.',
        xp: 15,
        description: 'Varje namn en gång, i ordningen de kom.',
        task: 'Uppgift: Skriv `test_unika(f)` som avslöjar felet.',
        given: `${BOTH}def ai_unika(namn):\n    return [n for n in namn if namn.count(n) == 1]\n\ndef lagad_unika(namn):\n    resultat = []\n    for n in namn:\n        if n not in resultat:\n            resultat.append(n)\n    return resultat\n\n`,
        start: '# Skriv test_unika(f) här\n',
        add: 'def test_unika(f):\n    assert f(["Bo", "Ada", "Bo"]) == ["Bo", "Ada"]\n',
        hints: [
          'Ta med ett namn två gånger.',
          'Vad ger ai_unika(["Bo", "Ada", "Bo"])?',
          'assert f(["Bo", "Ada", "Bo"]) == ["Bo", "Ada"]',
        ],
        tests: [
          fails('test_unika', 'ai_unika'),
          passes('test_unika', 'lagad_unika'),
        ],
      },
    ],
  }),
  project({
    id: 'kmai-proj-klocka',
    track: 'testa',
    title: 'Klockan',
    reward: { emoji: '⏰', name: 'Väckarklocka' },
    summary: 'Tid är svårt – för assistenter också.',
    steps: [
      {
        title: 'Minuter',
        why: 'En timme är 60 minuter, inte 100. Ett test med 1:30 avslöjar det direkt.',
        xp: 15,
        description: '"1:30" ska bli 90 minuter.',
        task: 'Uppgift: Skriv `test_minuter(f)` som avslöjar felet.',
        given: `${BOTH}def ai_minuter(tid):\n    timmar, minuter = tid.split(":")\n    return int(timmar) * 100 + int(minuter)\n\ndef lagad_minuter(tid):\n    timmar, minuter = tid.split(":")\n    return int(timmar) * 60 + int(minuter)\n\n`,
        start: '# Skriv test_minuter(f) här\n',
        add: 'def test_minuter(f):\n    assert f("1:30") == 90\n    assert f("0:05") == 5\n',
        hints: [
          'Ta en tid med timmar.',
          '1:30 är 90 minuter.',
          'assert f("1:30") == 90',
        ],
        tests: [
          fails('test_minuter', 'ai_minuter'),
          passes('test_minuter', 'lagad_minuter'),
        ],
      },
      {
        title: 'Nollan',
        why: '65 minuter är 1:05, inte 1:5. Testa ett fall med ensiffriga minuter.',
        xp: 15,
        description: 'Visa minuter som en klocka.',
        task: 'Uppgift: Skriv `test_visa(f)` som avslöjar felet.',
        given: `${BOTH}def ai_visa(minuter):\n    return f"{minuter // 60}:{minuter % 60}"\n\ndef lagad_visa(minuter):\n    return f"{minuter // 60}:{minuter % 60:02d}"\n\n`,
        start: '# Skriv test_visa(f) här\n',
        add: 'def test_visa(f):\n    assert f(65) == "1:05"\n    assert f(90) == "1:30"\n',
        hints: [
          'Prova 65 minuter.',
          'Det ska bli "1:05".',
          'assert f(65) == "1:05"',
        ],
        tests: [
          fails('test_visa', 'ai_visa'),
          passes('test_visa', 'lagad_visa'),
        ],
      },
      {
        title: 'Över midnatt',
        why: 'Ett nattpass från 23 till 1 är två timmar. Kantfall som midnatt glöms nästan alltid.',
        xp: 20,
        description: 'Hur länge varade passet?',
        task: 'Uppgift: Skriv `test_langd(f)` som avslöjar att assistenten inte klarar midnatt.',
        given: `${BOTH}def ai_langd(start, slut):\n    return lagad_minuter(slut) - lagad_minuter(start)\n\ndef lagad_langd(start, slut):\n    return (lagad_minuter(slut) - lagad_minuter(start)) % (24 * 60)\n\n`,
        start: '# Skriv test_langd(f) här\n',
        add: 'def test_langd(f):\n    assert f("8:00", "10:00") == 120\n    assert f("23:00", "1:00") == 120\n',
        hints: [
          'Ett vanligt pass först.',
          'Sedan ett över midnatt.',
          'assert f("23:00", "1:00") == 120',
        ],
        tests: [
          fails('test_langd', 'ai_langd'),
          passes('test_langd', 'lagad_langd'),
        ],
      },
    ],
  }),

  // Bana 6: säker kod
  project({
    id: 'kmai-proj-gastbok',
    track: 'sakerhet',
    title: 'Gästboken',
    reward: { emoji: '📓', name: 'Anteckningsbok' },
    summary: 'En gästbok i en databas – och tre sätt att förstöra den.',
    steps: [
      {
        title: 'Frågetecken',
        why: 'Med en f-sträng blir det besökaren skriver en del av SQL-koden. Med ? skickas det som data, aldrig som kod.',
        xp: 15,
        description: "O'Brien kan inte skriva i gästboken.",
        task: 'Uppgift: Laga `skriv(namn, text)` så att den använder `?` i stället för en f-sträng.',
        given:
          'import sqlite3\n\ndb = sqlite3.connect(":memory:")\ndb.execute("create table inlagg (namn text, text text)")\n\n',
        ai: "def skriv(namn, text):\n    db.execute(f\"insert into inlagg values ('{namn}', '{text}')\")\n",
        add: 'def skriv(namn, text):\n    db.execute("insert into inlagg values (?, ?)", (namn, text))\n',
        hints: [
          'Vad händer med en apostrof i namnet?',
          'Skriv ? där värdena ska stå.',
          'db.execute("insert into inlagg values (?, ?)", (namn, text))',
        ],
        tests: [
          {
            description: "O'Brien kan skriva",
            code: 'skriv("O\'Brien", "Hej") or db.execute("select count(*) from inlagg").fetchone()[0]',
            expected: 1,
          },
        ],
      },
      {
        title: 'Tomma inlägg',
        why: 'Lita aldrig på indata. "   " är inte tomt för len – men är det för människor.',
        xp: 15,
        description: 'Ett inlägg ska ha 1–200 tecken, utan mellanslagen runt.',
        task: 'Uppgift: Laga `giltigt(text)`.',
        ai: 'def giltigt(text):\n    return len(text) > 0\n',
        add: 'def giltigt(text):\n    return 0 < len(text.strip()) <= 200\n',
        hints: [
          'strip() tar bort mellanslagen.',
          'Kolla båda gränserna.',
          'return 0 < len(text.strip()) <= 200',
        ],
        tests: [
          {
            description: 'Bara mellanslag',
            code: 'giltigt("   ")',
            expected: false,
          },
          {
            description: 'För långt',
            code: 'giltigt("a" * 201)',
            expected: false,
          },
          {
            description: 'Ett vanligt inlägg',
            code: 'giltigt("Hej")',
            expected: true,
          },
        ],
      },
      {
        title: 'Sökningen',
        why: 'Sökrutor är en klassisk väg in. Även % för like ska skickas som data med ?.',
        xp: 20,
        description: 'Sök bland inläggen.',
        task: 'Uppgift: Laga `sok(ord)` så att den använder `?`. Söktexten är `"%" + ord + "%"`.',
        ai: 'def sok(ord):\n    return db.execute(f"select namn from inlagg where text like \'%{ord}%\'").fetchall()\n',
        add: 'def sok(ord):\n    return db.execute("select namn from inlagg where text like ?", ("%" + ord + "%",)).fetchall()\n',
        hints: [
          'Samma lösning som i steg 1.',
          'like ? och ("%" + ord + "%",)',
          'Glöm inte kommat – det är en tuple med ett värde.',
        ],
        tests: [
          {
            description: 'Sökningen hittar Ada',
            code: 'skriv("Ada", "Hej alla") or [rad[0] for rad in sok("alla")]',
            expected: ['Ada'],
          },
          {
            description: 'Attacken hittar ingenting',
            code: "len(sok(\"' or '1'='1\"))",
            expected: 0,
          },
        ],
      },
    ],
  }),
  project({
    id: 'kmai-proj-inlogg',
    track: 'sakerhet',
    title: 'Inloggningen',
    reward: { emoji: '🔑', name: 'Nyckel' },
    summary:
      'Assistenten byggde en inloggning. Den fungerar – men den är inte säker.',
    steps: [
      {
        title: 'Inga lösenord i klartext',
        why: 'Läcker databasen ska ingen kunna läsa lösenorden. Spara en hash – samma lösenord ger alltid samma hash, men det går inte att räkna baklänges.',
        xp: 15,
        description: 'Lösenordet står rakt av i koden.',
        task: 'Uppgift: Skriv `hasha(losen)` som ger `hashlib.sha256(losen.encode()).hexdigest()`, och spara hashen av lösenordet i `ANVANDARE` i stället.',
        given: 'import hashlib\n\n',
        ai: 'ANVANDARE = {"ada": "hemligt123"}\n',
        add: 'def hasha(losen):\n    return hashlib.sha256(losen.encode()).hexdigest()\n\nANVANDARE = {"ada": hasha("hemligt123")}\n',
        hints: [
          'def hasha(losen): return hashlib.sha256(losen.encode()).hexdigest()',
          'Anropa hasha när du bygger ANVANDARE.',
          'ANVANDARE = {"ada": hasha("hemligt123")}',
        ],
        tests: [
          {
            description: 'Lösenordet står inte i klartext',
            code: 'ANVANDARE["ada"] != "hemligt123"',
            expected: true,
          },
          {
            description: 'Hashen stämmer',
            code: 'ANVANDARE["ada"] == hashlib.sha256(b"hemligt123").hexdigest()',
            expected: true,
          },
        ],
      },
      {
        title: 'Okända användare',
        why: 'Ett krasch-felmeddelande avslöjar för mycket. Okänd användare och fel lösenord ska se likadana ut.',
        xp: 15,
        description:
          'Assistentens logga_in kraschar för användare som inte finns.',
        task: 'Uppgift: Laga `logga_in(namn, losen)` så att en okänd användare ger `False`.',
        ai: 'def logga_in(namn, losen):\n    return ANVANDARE[namn] == hasha(losen)\n',
        add: 'def logga_in(namn, losen):\n    return ANVANDARE.get(namn) == hasha(losen)\n',
        hints: [
          'ANVANDARE["bo"] ger KeyError.',
          '.get ger None om nyckeln saknas.',
          'return ANVANDARE.get(namn) == hasha(losen)',
        ],
        tests: [
          {
            description: 'Rätt lösenord',
            code: 'logga_in("ada", "hemligt123")',
            expected: true,
          },
          {
            description: 'Fel lösenord',
            code: 'logga_in("ada", "fel")',
            expected: false,
          },
          {
            description: 'Okänd användare',
            code: 'logga_in("bo", "x")',
            expected: false,
          },
        ],
      },
      {
        title: 'För många försök',
        why: 'Utan gräns kan någon prova miljontals lösenord. Efter tre fel ska kontot låsas en stund.',
        xp: 15,
        description: 'Assistenten glömde att begränsa försöken.',
        task: 'Uppgift: Laga `forsok(namn, losen, misslyckade)` så att den ger `"låst"` när `misslyckade` är 3 eller mer.',
        ai: 'def forsok(namn, losen, misslyckade):\n    return logga_in(namn, losen)\n',
        add: 'def forsok(namn, losen, misslyckade):\n    if misslyckade >= 3:\n        return "låst"\n    return logga_in(namn, losen)\n',
        hints: [
          'Kolla misslyckade först.',
          'if misslyckade >= 3:',
          'return "låst"',
        ],
        tests: [
          {
            description: 'Låst efter tre fel',
            code: 'forsok("ada", "hemligt123", 3)',
            expected: 'låst',
          },
          {
            description: 'Annars som vanligt',
            code: 'forsok("ada", "hemligt123", 0)',
            expected: true,
          },
        ],
      },
    ],
  }),
  project({
    id: 'kmai-proj-raknare',
    track: 'sakerhet',
    title: 'Miniräknaren',
    reward: { emoji: '🧮', name: 'Kulram' },
    summary: 'eval är bekvämt – och farligt. Bygg en säker miniräknare.',
    steps: [
      {
        title: 'Utan eval',
        why: 'eval kör vad som helst som Python-kod – även kod som raderar filer. Läs uttrycket själv i stället.',
        xp: 20,
        description: 'Räkna ut "2 + 3".',
        task: 'Uppgift: Skriv om `rakna(uttryck)` utan `eval`. Uttrycket är alltid tal, mellanslag, tecken, mellanslag, tal. Klara `+`, `-`, `*` och `/`.',
        ai: 'def rakna(uttryck):\n    return eval(uttryck)\n',
        add: 'def rakna(uttryck):\n    a, tecken, b = uttryck.split()\n    a = float(a)\n    b = float(b)\n    if tecken == "+":\n        return a + b\n    if tecken == "-":\n        return a - b\n    if tecken == "*":\n        return a * b\n    return a / b\n',
        hints: [
          'split() delar på mellanslagen.',
          'a, tecken, b = uttryck.split()',
          'En if per räknesätt.',
        ],
        tests: [
          { description: '2 + 3', code: 'rakna("2 + 3")', expected: 5 },
          { description: '10 / 4', code: 'rakna("10 / 4")', expected: 2.5 },
          { description: '6 * 7', code: 'rakna("6 * 7")', expected: 42 },
        ],
        sourceChecks: [
          { description: 'Ingen eval', pattern: /\beval\(/, forbidden: true },
        ],
      },
      {
        title: 'Konstiga tal',
        why: 'Allt som kommer utifrån kan vara fel. Fånga felet och svara med None i stället för att krascha.',
        xp: 15,
        description: 'Assistenten skrev en funktion som läser tal.',
        task: 'Uppgift: Laga `las_tal(text)` så att den ger `None` om texten inte är ett tal.',
        ai: 'def las_tal(text):\n    return float(text)\n',
        add: 'def las_tal(text):\n    try:\n        return float(text)\n    except ValueError:\n        return None\n',
        hints: [
          'float("x") ger ValueError.',
          'try: … except ValueError:',
          'return None i except.',
        ],
        tests: [
          { description: 'Ett tal', code: 'las_tal("3.5")', expected: 3.5 },
          { description: 'Inget tal', code: 'las_tal("x")', expected: null },
        ],
      },
      {
        title: 'Noll',
        why: 'Division med noll kraschar programmet. Den som skriver i räknaren ska få ett svar, inte en krasch.',
        xp: 15,
        description: 'Säker division.',
        task: 'Uppgift: Laga `dela(a, b)` så att den ger `None` när `b` är 0.',
        ai: 'def dela(a, b):\n    return a / b\n',
        add: 'def dela(a, b):\n    if b == 0:\n        return None\n    return a / b\n',
        hints: ['Kolla b först.', 'if b == 0: return None', 'Annars a / b.'],
        tests: [
          { description: 'Noll', code: 'dela(1, 0)', expected: null },
          { description: 'Vanlig division', code: 'dela(9, 3)', expected: 3 },
        ],
      },
    ],
  }),

  // Bana 7: gör om och förbättra
  project({
    id: 'kmai-proj-lon',
    track: 'refaktor',
    title: 'Lönen',
    reward: { emoji: '💰', name: 'Pengapåse' },
    summary: 'Assistentens lönekod fungerar. Gör den läsbar.',
    steps: [
      {
        title: 'Namn som säger något',
        why: 'l, t och h säger ingenting. Bra namn är den billigaste dokumentationen som finns.',
        xp: 15,
        description: 'Döp om och ge skatten ett namn.',
        task: 'Uppgift: Skriv om till `netto_lon(timmar, timlon)` och konstanten `SKATT = 0.3`. Den ska räkna `timmar * timlon * (1 - SKATT)`.',
        ai: 'def l(t, h):\n    return t * h * 0.7\n',
        add: 'SKATT = 0.3\n\ndef netto_lon(timmar, timlon):\n    return timmar * timlon * (1 - SKATT)\n',
        hints: [
          'SKATT = 0.3 överst.',
          'def netto_lon(timmar, timlon):',
          'return timmar * timlon * (1 - SKATT)',
        ],
        tests: [
          {
            description: '10 timmar à 200 kr',
            code: 'round(netto_lon(10, 200), 2)',
            expected: 1400,
          },
        ],
        sourceChecks: [
          {
            description: 'Funktionen heter netto_lon(timmar, timlon)',
            pattern: /def netto_lon\(timmar, timlon\)/,
          },
          { description: 'Konstanten SKATT', pattern: /^SKATT = 0\.3/m },
        ],
      },
      {
        title: 'Inga upprepningar',
        why: 'Samma rad fem gånger är fem ställen att ändra. Säg i stället hur många gånger.',
        xp: 15,
        description: 'Assistenten skrev veckolönen med copy-paste.',
        task: 'Uppgift: Skriv om `veckolon(timlon)` med konstanterna `DAGAR = 5` och `TIMMAR_PER_DAG = 8`, och bara ett anrop till `netto_lon`.',
        ai: 'def veckolon(timlon):\n    return netto_lon(8, timlon) + netto_lon(8, timlon) + netto_lon(8, timlon) + netto_lon(8, timlon) + netto_lon(8, timlon)\n',
        add: 'DAGAR = 5\nTIMMAR_PER_DAG = 8\n\ndef veckolon(timlon):\n    return DAGAR * netto_lon(TIMMAR_PER_DAG, timlon)\n',
        hints: [
          'Fem gånger samma sak är gånger fem.',
          'DAGAR = 5 och TIMMAR_PER_DAG = 8',
          'return DAGAR * netto_lon(TIMMAR_PER_DAG, timlon)',
        ],
        tests: [
          {
            description: 'Veckolön à 200 kr',
            code: 'round(veckolon(200), 2)',
            expected: 5600,
          },
        ],
        sourceChecks: [
          { description: 'Konstanten DAGAR', pattern: /^DAGAR = 5/m },
          {
            description: 'netto_lon anropas bara en gång i veckolon',
            pattern: /def veckolon[^]*netto_lon[^]*netto_lon/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Lönebeskedet',
        why: 'En f-sträng är lättare att läsa än plus och str(). Och 0.7 en gång till är ett magiskt tal – använd funktionen du redan har.',
        xp: 15,
        description:
          'Assistenten räknar ut lönen en gång till i stället för att använda netto_lon.',
        task: 'Uppgift: Skriv om `lonebesked(timmar, timlon)` med en f-sträng och `netto_lon`. Utskriften ska vara densamma.',
        ai: 'def lonebesked(timmar, timlon):\n    return "Brutto: " + str(timmar * timlon) + " kr, netto: " + str(round(timmar * timlon * 0.7)) + " kr"\n',
        add: 'def lonebesked(timmar, timlon):\n    brutto = timmar * timlon\n    netto = round(netto_lon(timmar, timlon))\n    return f"Brutto: {brutto} kr, netto: {netto} kr"\n',
        hints: [
          'brutto = timmar * timlon',
          'netto = round(netto_lon(timmar, timlon))',
          'return f"Brutto: {brutto} kr, netto: {netto} kr"',
        ],
        tests: [
          {
            description: 'Samma besked',
            code: 'lonebesked(10, 200)',
            expected: 'Brutto: 2000 kr, netto: 1400 kr',
          },
        ],
        sourceChecks: [
          { description: 'Inget 0.7', pattern: /0\.7/, forbidden: true },
          { description: 'En f-sträng', pattern: /f"Brutto/ },
        ],
      },
    ],
  }),
  project({
    id: 'kmai-proj-meddelande',
    track: 'refaktor',
    title: 'Meddelandet',
    reward: { emoji: '💌', name: 'Kärleksbrev' },
    summary: 'En chatt-apps hjälpfunktioner, städade en i taget.',
    steps: [
      {
        title: 'Namnen',
        why: 'x, a och b tvingar läsaren att gissa. avsandare och text gör det självklart.',
        xp: 10,
        description: 'Döp om.',
        task: 'Uppgift: Skriv om till `meddelande(avsandare, text)` med en f-sträng. Den ska ge `"Ada: Hej"` för `"Ada"` och `"Hej"`.',
        ai: 'def x(a, b):\n    return a + ": " + b\n',
        add: 'def meddelande(avsandare, text):\n    return f"{avsandare}: {text}"\n',
        hints: [
          'def meddelande(avsandare, text):',
          'En f-sträng: f"{avsandare}: {text}"',
          'Ta bort def x.',
        ],
        tests: [
          {
            description: 'Samma resultat',
            code: 'meddelande("Ada", "Hej")',
            expected: 'Ada: Hej',
          },
        ],
        sourceChecks: [
          {
            description: 'Funktionen heter meddelande(avsandare, text)',
            pattern: /def meddelande\(avsandare, text\)/,
          },
          {
            description: 'Ingen funktion som heter x',
            pattern: /def x\(/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Det magiska talet',
        why: 'Varför 20? Ett namn på talet säger varför – och finns på ett enda ställe om det ska ändras.',
        xp: 15,
        description: 'Långa meddelanden kortas i förhandsvisningen.',
        task: 'Uppgift: Lägg talet i konstanten `MAX_LANGD = 20` och använd den i `kort(text)`.',
        ai: 'def kort(text):\n    if len(text) > 20:\n        return text[:20] + "..."\n    return text\n',
        add: 'MAX_LANGD = 20\n\ndef kort(text):\n    if len(text) > MAX_LANGD:\n        return text[:MAX_LANGD] + "..."\n    return text\n',
        hints: [
          'MAX_LANGD = 20 överst.',
          'Byt båda 20 mot MAX_LANGD.',
          'text[:MAX_LANGD]',
        ],
        tests: [
          {
            description: 'Långt meddelande',
            code: 'kort("a" * 25)',
            expected: `${'a'.repeat(20)}...`,
          },
          {
            description: 'Kort meddelande',
            code: 'kort("Hej")',
            expected: 'Hej',
          },
        ],
        sourceChecks: [
          { description: 'Konstanten MAX_LANGD', pattern: /^MAX_LANGD = 20/m },
          {
            description: 'Inget 20 i kort',
            pattern: /def kort[^]*\b20\b/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'True eller False',
        why: 'if villkor: return True else: return False är bara villkoret. En rad räcker.',
        xp: 10,
        description: 'Är meddelandet tomt?',
        task: 'Uppgift: Förenkla `ar_tomt(text)` till en rad med `return`.',
        ai: 'def ar_tomt(text):\n    if text.strip() == "":\n        return True\n    else:\n        return False\n',
        add: 'def ar_tomt(text):\n    return text.strip() == ""\n',
        hints: [
          'Villkoret är redan True eller False.',
          'Returnera det direkt.',
          'return text.strip() == ""',
        ],
        tests: [
          {
            description: 'Bara mellanslag',
            code: 'ar_tomt("  ")',
            expected: true,
          },
          {
            description: 'Ett meddelande',
            code: 'ar_tomt("Hej")',
            expected: false,
          },
        ],
        sourceChecks: [
          {
            description: 'Inget return True',
            pattern: /return True/,
            forbidden: true,
          },
        ],
      },
    ],
  }),
  project({
    id: 'kmai-proj-poang',
    track: 'refaktor',
    title: 'Poängtavlan',
    reward: { emoji: '🎯', name: 'Piltavla' },
    summary: 'Gör en poängtavla lättare att läsa – utan att ändra vad den gör.',
    steps: [
      {
        title: 'sum finns redan',
        why: 'range(len(...)) och en egen summa är det assistenten skriver när den tänker på ett annat språk. Python har sum.',
        xp: 10,
        description: 'Totalen.',
        task: 'Uppgift: Skriv om till `total(poang)` som returnerar `sum(poang)`.',
        ai: 'def p(l):\n    s = 0\n    for i in range(len(l)):\n        s = s + l[i]\n    return s\n',
        add: 'def total(poang):\n    return sum(poang)\n',
        hints: ['def total(poang):', 'return sum(poang)', 'Ta bort def p.'],
        tests: [
          {
            description: 'total([1, 2, 3])',
            code: 'total([1, 2, 3])',
            expected: 6,
          },
        ],
        sourceChecks: [
          {
            description: 'Funktionen heter total(poang)',
            pattern: /def total\(poang\)/,
          },
          {
            description: 'Inget range(len(',
            pattern: /range\(len\(/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Räkna en gång',
        why: 'Samma uträkning tre gånger är långsamt och svårt att läsa. Spara den i en variabel.',
        xp: 15,
        description: 'Vilket lag vann?',
        task: 'Uppgift: Skriv om `vinnare(a, b)` så att den räknar ut `total(a)` och `total(b)` en gång var, i `poang_a` och `poang_b`.',
        ai: 'def vinnare(a, b):\n    if total(a) > total(b):\n        return "A"\n    if total(a) < total(b):\n        return "B"\n    return "lika"\n',
        add: 'def vinnare(a, b):\n    poang_a = total(a)\n    poang_b = total(b)\n    if poang_a > poang_b:\n        return "A"\n    if poang_a < poang_b:\n        return "B"\n    return "lika"\n',
        hints: [
          'poang_a = total(a)',
          'poang_b = total(b)',
          'Jämför variablerna.',
        ],
        tests: [
          {
            description: 'A vinner',
            code: 'vinnare([5, 5], [3])',
            expected: 'A',
          },
          {
            description: 'Lika',
            code: 'vinnare([2], [1, 1])',
            expected: 'lika',
          },
        ],
        sourceChecks: [
          {
            description: 'total(a) räknas bara en gång',
            pattern: /def vinnare[^]*total\(a\)[^]*total\(a\)/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'En rad',
        why: 'En tom lista, en loop och append är en list comprehension. Kortare – och lika tydlig när man vant sig.',
        xp: 15,
        description: 'Dubbla poäng i finalen.',
        task: 'Uppgift: Skriv om `dubbla(poang)` till en rad med en list comprehension.',
        ai: 'def dubbla(poang):\n    ny = []\n    for p in poang:\n        ny.append(p * 2)\n    return ny\n',
        add: 'def dubbla(poang):\n    return [p * 2 for p in poang]\n',
        hints: [
          '[ ... for p in poang]',
          'p * 2 för varje.',
          'return [p * 2 for p in poang]',
        ],
        tests: [
          {
            description: 'dubbla([1, 5])',
            code: 'dubbla([1, 5])',
            expected: [2, 10],
          },
        ],
        sourceChecks: [
          { description: 'Ingen append', pattern: /\.append/, forbidden: true },
        ],
      },
    ],
  }),

  // Bana 8: slutprojektet
  project({
    id: 'kmai-proj-bibliotek',
    track: 'slutprojekt',
    title: 'Bibliotekslånet',
    reward: { emoji: '📕', name: 'Lånebok' },
    summary: 'Beställ, granska och testa – hela vägen.',
    steps: [
      {
        title: 'Beställ',
        why: 'Gränsen är det svåra. Säg den i beställningen, med ett exempel precis på gränsen.',
        xp: 15,
        description: 'Böcker lånas i 30 dagar. Dag 31 är boken försenad.',
        task: 'Uppgift: Beställ `forsenad(dagar)` i `bestallning`. Nämn namnet, gränsen `30` och ett exempel.',
        start: 'bestallning = ""\n',
        add: 'bestallning = "Skriv forsenad(dagar) som returnerar True om en bok lånats mer än 30 dagar. Exempel: forsenad(30) ger False och forsenad(31) ger True."\n',
        hints: [
          'Nämn forsenad(dagar).',
          'Säg gränsen: 30 dagar.',
          'Ett exempel precis på gränsen.',
        ],
        tests: [
          has('forsenad(dagar)', 'Nämner forsenad(dagar)'),
          has('30', 'Säger gränsen'),
          has('exempel', 'Har ett exempel'),
        ],
      },
      {
        title: 'Granska',
        why: 'Trots exemplet blev gränsen fel. Granska alltid – en bra beställning är ingen garanti.',
        xp: 15,
        description: 'Assistenten svarade.',
        task: 'Uppgift: Laga `forsenad(dagar)`.',
        ai: 'def forsenad(dagar):\n    return dagar >= 30\n',
        add: 'def forsenad(dagar):\n    return dagar > 30\n',
        hints: [
          'Vad ger forsenad(30)?',
          'Dag 30 är inte försenad.',
          'return dagar > 30',
        ],
        tests: [
          { description: 'Dag 30', code: 'forsenad(30)', expected: false },
          { description: 'Dag 31', code: 'forsenad(31)', expected: true },
        ],
      },
      {
        title: 'Testa',
        why: 'Ett test som fångar felet ser till att det aldrig kommer tillbaka – inte ens när assistenten skriver om koden.',
        xp: 20,
        description: 'Assistentens version finns kvar som ai_forsenad.',
        task: 'Uppgift: Skriv `test_forsenad(f)` som underkänner `ai_forsenad` och godkänner din `forsenad`.',
        given: `${BOTH}def ai_forsenad(dagar):\n    return dagar >= 30\n\n`,
        start: '# Skriv test_forsenad(f) här\n',
        add: 'def test_forsenad(f):\n    assert f(30) == False\n    assert f(31) == True\n',
        hints: [
          'Testa gränsen.',
          'assert f(30) == False',
          'assert f(31) == True',
        ],
        tests: [
          fails('test_forsenad', 'ai_forsenad'),
          passes('test_forsenad', 'forsenad'),
        ],
      },
    ],
  }),
  project({
    id: 'kmai-proj-quiz',
    track: 'slutprojekt',
    title: 'Quizet',
    reward: { emoji: '❓', name: 'Frågetecken' },
    summary: 'Ett frågespel: laga, läs och testa.',
    steps: [
      {
        title: 'Laga rättningen',
        why: 'Människor skriver med mellanslag och stora bokstäver. Gör om båda svaren likadant innan du jämför.',
        xp: 15,
        description: '" Paris" och "paris" ska räknas som rätt.',
        task: 'Uppgift: Laga `ratta(svar, facit)` så att mellanslag runt svaret och stora bokstäver inte spelar roll.',
        ai: 'def ratta(svar, facit):\n    return svar == facit\n',
        add: 'def ratta(svar, facit):\n    return svar.strip().lower() == facit.strip().lower()\n',
        hints: [
          'strip() och lower() på båda.',
          'Jämför sedan.',
          'return svar.strip().lower() == facit.strip().lower()',
        ],
        tests: [
          {
            description: '" Paris" mot "paris"',
            code: 'ratta(" Paris", "paris")',
            expected: true,
          },
          {
            description: 'Fel svar',
            code: 'ratta("Rom", "Madrid")',
            expected: false,
          },
        ],
      },
      {
        title: 'Läs poängen',
        why: 'zip går igenom två listor samtidigt. Följ den par för par.',
        xp: 15,
        description: 'Assistenten skrev poängräkningen.',
        task: 'Uppgift: Vad ger anropet nedan? Skriv svaret för hand i `svar_poang`.',
        given: `${READ}def poang(svaren, facit):\n    return sum(1 for svar, ratt in zip(svaren, facit) if ratta(svar, ratt))\n\n# poang(["Paris", "oslo", "Rom"], ["paris", "Oslo", "Madrid"])\n`,
        start: 'svar_poang = None\n',
        add: 'svar_poang = 2\n',
        hints: [
          'Ta paren ett i taget.',
          'Paris och oslo är rätt. Rom är inte Madrid.',
          'svar_poang = 2',
        ],
        tests: [
          {
            description: 'svar_poang stämmer',
            code: 'svar_poang == poang(["Paris", "oslo", "Rom"], ["paris", "Oslo", "Madrid"])',
            expected: true,
          },
        ],
        sourceChecks: [NO_CALL],
      },
      {
        title: 'Testa rättningen',
        why: 'Testet visar vad "rätt" betyder i ditt quiz – och fångar det om någon ändrar det.',
        xp: 20,
        description: 'Assistentens första version finns kvar som ai_ratta.',
        task: 'Uppgift: Skriv `test_ratta(f)` som underkänner `ai_ratta` och godkänner din `ratta`.',
        given: `${BOTH}def ai_ratta(svar, facit):\n    return svar == facit\n\n`,
        start: '# Skriv test_ratta(f) här\n',
        add: 'def test_ratta(f):\n    assert f(" Paris", "paris") == True\n    assert f("Rom", "Madrid") == False\n',
        hints: [
          'Testa med mellanslag och stor bokstav.',
          'assert f(" Paris", "paris") == True',
          'Och ett fel svar.',
        ],
        tests: [fails('test_ratta', 'ai_ratta'), passes('test_ratta', 'ratta')],
      },
    ],
  }),
  project({
    id: 'kmai-proj-lager',
    track: 'slutprojekt',
    title: 'Lagerkollen',
    reward: { emoji: '🏪', name: 'Butik' },
    summary: 'En liten butiks lager: laga, säkra och städa.',
    steps: [
      {
        title: 'Laga försäljningen',
        why: 'Assistenten tänkte bara på det vanliga köpet. Varor som inte finns och för stora köp är också fall.',
        xp: 15,
        description:
          'Sälj från lagret. Finns varan inte, eller finns det för få, ska det bli `None`.',
        task: 'Uppgift: Laga `salj(vara, antal)`. Den returnerar hur många som är kvar, eller `None`.',
        given: 'LAGER = {"äpple": 10, "päron": 4}\n\n',
        ai: 'def salj(vara, antal):\n    LAGER[vara] -= antal\n    return LAGER[vara]\n',
        add: 'def salj(vara, antal):\n    if vara not in LAGER or antal > LAGER[vara]:\n        return None\n    LAGER[vara] -= antal\n    return LAGER[vara]\n',
        hints: [
          'Vad händer med salj("banan", 1)?',
          'Och med salj("päron", 50)?',
          'if vara not in LAGER or antal > LAGER[vara]: return None',
        ],
        tests: [
          {
            description: 'Ett vanligt köp',
            code: 'salj("äpple", 3)',
            expected: 7,
          },
          {
            description: 'En vara som inte finns',
            code: 'salj("banan", 1)',
            expected: null,
          },
          {
            description: 'För många',
            code: 'salj("päron", 50)',
            expected: null,
          },
        ],
      },
      {
        title: 'Säkra indata',
        why: 'Antalet skrivs av en människa. "tre" och "-2" ska inte gå igenom.',
        xp: 15,
        description: 'Antalet kommer som text från kassan.',
        task: 'Uppgift: Laga `las_antal(text)` så att den ger talet, eller `None` om det inte är ett heltal större än 0.',
        ai: 'def las_antal(text):\n    return int(text)\n',
        add: 'def las_antal(text):\n    if not text.isdigit():\n        return None\n    antal = int(text)\n    if antal < 1:\n        return None\n    return antal\n',
        hints: [
          'isdigit() är bara sant för siffror – inte för minus.',
          'Kolla också att talet är minst 1.',
          'if not text.isdigit(): return None',
        ],
        tests: [
          { description: '"3"', code: 'las_antal("3")', expected: 3 },
          { description: '"tre"', code: 'las_antal("tre")', expected: null },
          { description: '"-2"', code: 'las_antal("-2")', expected: null },
          { description: '"0"', code: 'las_antal("0")', expected: null },
        ],
      },
      {
        title: 'Städa rapporten',
        why: 'items() ger nyckel och värde på en gång, och en f-sträng ersätter plus och str(). Samma resultat, hälften så mycket att läsa.',
        xp: 15,
        description: 'Assistentens lagerrapport fungerar men är rörig.',
        task: 'Uppgift: Skriv om `rapport()` med `LAGER.items()` och en f-sträng. Utskriften ska bli densamma.',
        ai: 'def rapport():\n    rader = []\n    for vara in LAGER.keys():\n        rader.append(vara + ": " + str(LAGER[vara]))\n    return "\\n".join(rader)\n',
        add: 'def rapport():\n    return "\\n".join(f"{vara}: {antal}" for vara, antal in LAGER.items())\n',
        hints: [
          'for vara, antal in LAGER.items()',
          'f"{vara}: {antal}"',
          'return "\\n".join(f"{vara}: {antal}" for vara, antal in LAGER.items())',
        ],
        tests: [
          {
            description: 'Samma rapport',
            code: 'rapport()',
            expected: 'äpple: 10\npäron: 4',
          },
        ],
        sourceChecks: [
          {
            description: 'Ingen keys()',
            pattern: /\.keys\(\)/,
            forbidden: true,
          },
          { description: 'Ingen str(', pattern: /\bstr\(/, forbidden: true },
        ],
      },
    ],
  }),
];

export const PROJECT_STEPS = projectSteps(PROJECTS, text => `# ${text}`);
