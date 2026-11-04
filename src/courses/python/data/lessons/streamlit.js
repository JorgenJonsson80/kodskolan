import { FORSALJNING } from './pandas';

// Bana 14: webbappar med Streamlit. Rättningen kör en låtsas-streamlit i
// harness.py som antecknar vad appen visar, och testerna läser det med
// __shown('title') eller __app. Ett test med widgets ställer in
// widgetarna, och en lista med widgets är flera klick efter varandra.
const FILES = { 'forsaljning.csv': FORSALJNING };
const ST = 'import streamlit as st\n';
const READ = `import streamlit as st
import pandas as pd

df = pd.read_csv("forsaljning.csv")
`;

export const STREAMLIT = [
  {
    id: 'st-01',
    track: 'streamlit',
    title: 'Din första webbapp',
    xp: 10,
    description:
      'Streamlit gör om ett vanligt Python-program till en webbsida med knappar, reglage och diagram – utan HTML eller JavaScript.',
    explain:
      'I stället för `print` skriver du `st.write("…")`, och texten hamnar på en webbsida. `st.title("…")` gör en stor rubrik överst.\n\nPå din egen dator kör du appen med `streamlit run app.py` i terminalen, och den öppnas i webbläsaren. Här trycker du på 🚀 Öppna appen i riktig Streamlit under koden. När du trycker Kolla lösning ser du också en förhandsvisning av appen.',
    example: `${ST}\nst.title("Min app")\nst.write("Hej från Python!")`,
    task: 'Uppgift: Gör en app med rubriken `Kaféet` och texten `Välkommen in!` under.',
    starterCode: ST,
    solution: `${ST}\nst.title("Kaféet")\nst.write("Välkommen in!")\n`,
    hints: [
      'Rubriken gör du med st.title och texten med st.write.',
      'st.title("Kaféet")',
      'Och på raden under: st.write("Välkommen in!")',
    ],
    tests: [
      {
        description: 'Rubriken är Kaféet',
        code: "__shown('title')",
        expected: ['Kaféet'],
      },
      {
        description: 'Texten Välkommen in! visas',
        code: "__shown('write')",
        expected: ['Välkommen in!'],
      },
    ],
  },
  {
    id: 'st-02',
    track: 'streamlit',
    title: 'Rubriker och text',
    xp: 10,
    description:
      'En sida blir lättare att läsa med rubriker i olika storlekar och en liten text längst ner.',
    explain:
      'Streamlit har tre storlekar på rubriker: `st.title` (störst), `st.header` och `st.subheader`. `st.caption` är liten grå text, bra för förklaringar.\n\nAllt visas i den ordning koden körs, uppifrån och ner – precis som print.',
    example: `${ST}\nst.title("Klubben")\nst.header("Träningar")\nst.write("Tisdag 18.00")\nst.caption("Med reservation för ändringar")`,
    task: 'Uppgift: Gör menyn: rubriken `Menyn`, en `st.header` med `Drycker` och texten `Kaffe 30 kr`, en `st.header` med `Bröd` och texten `Bulle 25 kr`, och sist en `st.caption` med `Priserna gäller i dag`.',
    starterCode: `${ST}\nst.title("Menyn")\n`,
    solution: `${ST}\nst.title("Menyn")\nst.header("Drycker")\nst.write("Kaffe 30 kr")\nst.header("Bröd")\nst.write("Bulle 25 kr")\nst.caption("Priserna gäller i dag")\n`,
    hints: [
      'Varje sak på sidan är en egen rad i koden, i samma ordning som på sidan.',
      'st.header("Drycker") och sedan st.write("Kaffe 30 kr")',
      'Sist: st.caption("Priserna gäller i dag")',
    ],
    tests: [
      {
        description: 'Sidan har rätt saker i rätt ordning',
        code: '__app',
        expected: [
          ['title', 'Menyn'],
          ['header', 'Drycker'],
          ['write', 'Kaffe 30 kr'],
          ['header', 'Bröd'],
          ['write', 'Bulle 25 kr'],
          ['caption', 'Priserna gäller i dag'],
        ],
      },
    ],
  },
  {
    id: 'st-03',
    track: 'streamlit',
    title: 'Fråga användaren',
    xp: 15,
    description:
      'st.text_input är input() för webben: en ruta att skriva i. Men den fungerar lite annorlunda.',
    explain:
      '`namn = st.text_input("Vad heter du?")` visar en ruta med texten ovanför. Det som står i rutan hamnar i `namn`.\n\nHär är det stora med Streamlit: hela programmet körs om, uppifrån, varje gång användaren ändrar något. Första gången är rutan tom, så `namn` är `""`. När någon skriver Ada och trycker Enter körs allt igen, och nu är `namn` `"Ada"`.\n\nDärför kollar man ofta `if namn:` – en tom text räknas som falsk, så då visas inget förrän något är ifyllt.',
    example: `${ST}\nstad = st.text_input("Var bor du?")\nif stad:\n    st.write(f"{stad} är fint!")`,
    task: 'Uppgift: Fråga `Vad heter du?` med `st.text_input`. När något är ifyllt ska det stå `Hej Ada!` (med namnet). Är rutan tom ska inget visas.',
    starterCode: ST,
    solution: `${ST}\nnamn = st.text_input("Vad heter du?")\nif namn:\n    st.write(f"Hej {namn}!")\n`,
    hints: [
      'namn = st.text_input("Vad heter du?")',
      'if namn: är sant bara när rutan inte är tom.',
      'Inne i if: st.write(f"Hej {namn}!")',
    ],
    tests: [
      {
        description: 'Rutan Vad heter du? finns',
        code: "__shown('text_input')",
        expected: ['Vad heter du?: '],
      },
      {
        description: 'Tom ruta: ingen hälsning än',
        code: "__shown('write')",
        expected: [],
      },
      {
        description: 'Med Ada i rutan står det Hej Ada!',
        code: "__shown('write')",
        expected: ['Hej Ada!'],
        widgets: { 'Vad heter du?': 'Ada' },
      },
    ],
  },
  {
    id: 'st-04',
    track: 'streamlit',
    title: 'Reglage och tal',
    xp: 15,
    description:
      'Med ett reglage kan användaren välja ett tal utan att kunna skriva fel.',
    explain:
      '`st.slider("Antal", 1, 10, 3)` är ett reglage från 1 till 10 som börjar på 3. Det du väljer kommer tillbaka som ett tal – inget `int()` behövs.\n\n`st.number_input("Pris", value=30)` är en ruta för tal med + och −. `value` är talet den börjar med.\n\nFlyttar användaren reglaget körs programmet om, och svaret räknas om direkt.',
    example: `${ST}\nar = st.slider("Hur gammal är du?", 0, 100, 10)\nst.write(f"Om tio år är du {ar + 10}")`,
    task: 'Uppgift: Gör en kaffekalkylator. Ett reglage `Antal koppar` från 1 till 10 som börjar på 1, och en `st.number_input` med `Pris per kopp` som börjar på 30. Skriv `Det blir 30 kr` med rätt summa.',
    starterCode: ST,
    solution: `${ST}\nantal = st.slider("Antal koppar", 1, 10, 1)\npris = st.number_input("Pris per kopp", value=30)\nst.write(f"Det blir {antal * pris} kr")\n`,
    hints: [
      'antal = st.slider("Antal koppar", 1, 10, 1)',
      'pris = st.number_input("Pris per kopp", value=30)',
      'st.write(f"Det blir {antal * pris} kr")',
    ],
    tests: [
      {
        description: 'Från början: Det blir 30 kr',
        code: "__shown('write')",
        expected: ['Det blir 30 kr'],
      },
      {
        description: '4 koppar: Det blir 120 kr',
        code: "__shown('write')",
        expected: ['Det blir 120 kr'],
        widgets: { 'Antal koppar': 4 },
      },
      {
        description: '3 koppar à 25 kr: Det blir 75 kr',
        code: "__shown('write')",
        expected: ['Det blir 75 kr'],
        widgets: { 'Antal koppar': 3, 'Pris per kopp': 25 },
      },
      {
        description: 'Reglaget går från 1 till 10',
        code: "__shown('slider')",
        expected: ['Antal koppar: 1'],
      },
    ],
  },
  {
    id: 'st-05',
    track: 'streamlit',
    title: 'Knappar och kryssrutor',
    xp: 15,
    description:
      'En knapp gör något när man klickar. En kryssruta kan vara på eller av.',
    explain:
      '`if st.button("Klicka"):` är sant bara i körningen direkt efter ett klick. Nästa gång något ändras är den falsk igen.\n\n`st.checkbox("Visa mer")` ger `True` så länge rutan är ikryssad. Den är bra för att visa eller gömma delar av sidan.\n\n`st.success("…")` är en grön ruta, `st.info` blå, `st.warning` gul och `st.error` röd.',
    example: `${ST}\nif st.button("Kasta tärning"):\n    st.success("Du fick 6!")\nif st.checkbox("Visa reglerna"):\n    st.write("Högst vinner.")`,
    task: 'Uppgift: En knapp `Säg hej` som visar `Hej!` i en `st.success`. En kryssruta `Visa hemligheten` som visar texten `Python heter så efter Monty Python` när den är ikryssad.',
    starterCode: ST,
    solution: `${ST}\nif st.button("Säg hej"):\n    st.success("Hej!")\nif st.checkbox("Visa hemligheten"):\n    st.write("Python heter så efter Monty Python")\n`,
    hints: [
      'if st.button("Säg hej"): och st.success("Hej!") indraget under.',
      'if st.checkbox("Visa hemligheten"):',
      'Under den: st.write("Python heter så efter Monty Python")',
    ],
    tests: [
      {
        description: 'Från början visas varken hej eller hemligheten',
        code: '__shown("success") + __shown("write")',
        expected: [],
      },
      {
        description: 'Klick på Säg hej visar Hej!',
        code: "__shown('success')",
        expected: ['Hej!'],
        widgets: { 'Säg hej': true },
      },
      {
        description: 'Ikryssad ruta visar hemligheten',
        code: "__shown('write')",
        expected: ['Python heter så efter Monty Python'],
        widgets: { 'Visa hemligheten': true },
      },
    ],
  },
  {
    id: 'st-06',
    track: 'streamlit',
    title: 'Välj i en lista',
    xp: 15,
    description:
      'När det bara finns några svar som är rätt låter man användaren välja i stället för att skriva.',
    explain:
      '`st.selectbox("Dryck", ["kaffe", "te"])` är en rullgardinsmeny, och `st.radio("Storlek", ["liten", "stor"])` visar alla val som runda knappar. Båda börjar på det första valet och ger tillbaka det man valt.\n\nEftersom svaret alltid är ett av valen kan du slå upp det direkt i en dictionary, utan att oroa dig för stavfel.',
    example: `${ST}\nPRIS = {"buss": 30, "tåg": 80}\nresa = st.radio("Hur reser du?", ["buss", "tåg"])\nst.write(f"Det kostar {PRIS[resa]} kr")`,
    task: 'Uppgift: Låt användaren välja `Dryck` i en `st.selectbox` (`kaffe`, `te`, `choklad`) och `Storlek` med `st.radio` (`liten`, `stor`). Stor kostar 10 kr mer. Skriv t.ex. `En liten kaffe kostar 30 kr`.',
    starterCode: `${ST}\nPRISER = {"kaffe": 30, "te": 25, "choklad": 35}\n`,
    solution: `${ST}\nPRISER = {"kaffe": 30, "te": 25, "choklad": 35}\n\ndryck = st.selectbox("Dryck", ["kaffe", "te", "choklad"])\nstorlek = st.radio("Storlek", ["liten", "stor"])\npris = PRISER[dryck]\nif storlek == "stor":\n    pris += 10\nst.write(f"En {storlek} {dryck} kostar {pris} kr")\n`,
    hints: [
      'dryck = st.selectbox("Dryck", ["kaffe", "te", "choklad"])',
      'storlek = st.radio("Storlek", ["liten", "stor"]), och pris = PRISER[dryck]',
      'Lägg till 10 om storlek == "stor", och skriv med st.write(f"En {storlek} {dryck} kostar {pris} kr").',
    ],
    tests: [
      {
        description: 'Från början: En liten kaffe kostar 30 kr',
        code: "__shown('write')",
        expected: ['En liten kaffe kostar 30 kr'],
      },
      {
        description: 'Stor choklad: En stor choklad kostar 45 kr',
        code: "__shown('write')",
        expected: ['En stor choklad kostar 45 kr'],
        widgets: { Dryck: 'choklad', Storlek: 'stor' },
      },
      {
        description: 'Liten te: En liten te kostar 25 kr',
        code: "__shown('write')",
        expected: ['En liten te kostar 25 kr'],
        widgets: { Dryck: 'te' },
      },
    ],
  },
  {
    id: 'st-07',
    track: 'streamlit',
    title: 'Nyckeltal i kolumner',
    xp: 15,
    description:
      'En dashboard visar de viktigaste talen stort, bredvid varandra.',
    explain:
      '`st.metric("Sålda", 36)` visar ett tal stort med en liten rubrik. Med en tredje sak, `st.metric("Sålda", 36, "+4")`, visas också hur mycket det ändrats – grönt uppåt och rött nedåt.\n\n`st.columns(3)` ger tre kolumner bredvid varandra. `kol1, kol2, kol3 = st.columns(3)` packar upp dem, och `kol1.metric(…)` lägger något i den första.',
    example: `${ST}\nvanster, hoger = st.columns(2)\nvanster.metric("Temperatur", "18 °C", "+2")\nhoger.metric("Vind", "4 m/s")`,
    task: 'Uppgift: Räkna ut nyckeltalen från listan `koppar` (sålda koppar per dag, 30 kr st). Visa tre `st.metric` i tre kolumner: `Sålda koppar` (summan), `Intäkt` (t.ex. `1080 kr`) och `Snitt per dag` (summan delat med antal dagar, avrundat med `round`).',
    starterCode: `${ST}\nkoppar = [12, 15, 9]\n`,
    solution: `${ST}\nkoppar = [12, 15, 9]\n\nsalda = sum(koppar)\nkol1, kol2, kol3 = st.columns(3)\nkol1.metric("Sålda koppar", salda)\nkol2.metric("Intäkt", f"{salda * 30} kr")\nkol3.metric("Snitt per dag", round(salda / len(koppar)))\n`,
    hints: [
      'salda = sum(koppar) och kol1, kol2, kol3 = st.columns(3)',
      'kol1.metric("Sålda koppar", salda)',
      'kol2.metric("Intäkt", f"{salda * 30} kr") och kol3.metric("Snitt per dag", round(salda / len(koppar)))',
    ],
    tests: [
      {
        description: 'Tre nyckeltal: 36 koppar, 1080 kr och 12 per dag',
        code: "__shown('metric')",
        expected: ['Sålda koppar: 36', 'Intäkt: 1080 kr', 'Snitt per dag: 12'],
      },
      {
        description: 'De står i kolumner',
        code: "[kind for kind, text in __app].count('columns')",
        expected: 1,
      },
    ],
  },
  {
    id: 'st-08',
    track: 'streamlit',
    title: 'Tabeller och diagram',
    xp: 20,
    description:
      'Här möts pandas och Streamlit: en tabell blir en tabell på sidan, och en summering blir ett diagram.',
    explain:
      '`st.dataframe(df)` visar en hel tabell, som man kan sortera genom att klicka på kolumnerna.\n\n`st.bar_chart(serie)` ritar ett stapeldiagram. Ger du den resultatet av en `groupby` blir varje grupp en stapel. `st.line_chart` ritar en linje i stället, bra för saker som ändras över tid.',
    example: `${READ}\nst.dataframe(df)\nst.line_chart(df.groupby("datum")["antal"].sum())`,
    task: 'Uppgift: Visa hela tabellen med `st.dataframe`. Räkna sedan ut `per_produkt`: summan av `antal` per `produkt`, och visa den som ett stapeldiagram.',
    starterCode: READ,
    solution: `${READ}\nst.dataframe(df)\nper_produkt = df.groupby("produkt")["antal"].sum()\nst.bar_chart(per_produkt)\n`,
    hints: [
      'st.dataframe(df) visar tabellen.',
      'per_produkt = df.groupby("produkt")["antal"].sum()',
      'st.bar_chart(per_produkt)',
    ],
    files: FILES,
    tests: [
      {
        description: 'Tabellen med alla 10 rader visas',
        code: "__shown('dataframe')",
        expected: ['tabell med 10 rader'],
      },
      {
        description: 'per_produkt har summan per produkt',
        code: 'per_produkt.to_dict()',
        expected: { bulle: 18, kaffe: 36, kaka: 11, smörgås: 10, te: 12 },
      },
      {
        description: 'Ett stapeldiagram med en stapel per produkt',
        code: "__shown('bar_chart')",
        expected: ['diagram med 5 staplar'],
      },
    ],
  },
  {
    id: 'st-09',
    track: 'streamlit',
    title: 'Filter i sidopanelen',
    xp: 20,
    description:
      'Filtren brukar ligga i en panel till vänster, så att resultatet får plats i mitten.',
    explain:
      'Allt du skriver med `st.sidebar.` i stället för `st.` hamnar i sidopanelen: `st.sidebar.selectbox(…)`. Du kan också skriva `with st.sidebar:` och lägga raderna indraget under.\n\nEtt filter är en vanlig pandas-filtrering med värdet från widgeten: `df[df["kategori"] == val]`. Ett val som `alla` får man ta hand om med en if.',
    example: `${READ}\ndag = st.sidebar.selectbox("Dag", ["2026-10-01", "2026-10-02"])\nst.dataframe(df[df["datum"] == dag])`,
    task: 'Uppgift: Lägg en `st.selectbox` med `Kategori` i sidopanelen, med valen `alla`, `dryck`, `bröd` och `mat`. Filtrera tabellen på kategorin (inte om det är `alla`) och visa `st.metric("Sålda", …)` med summan av `antal` i urvalet.',
    starterCode: READ,
    solution: `${READ}\nval = st.sidebar.selectbox("Kategori", ["alla", "dryck", "bröd", "mat"])\nurval = df\nif val != "alla":\n    urval = df[df["kategori"] == val]\nst.metric("Sålda", int(urval["antal"].sum()))\n`,
    hints: [
      'val = st.sidebar.selectbox("Kategori", ["alla", "dryck", "bröd", "mat"])',
      'urval = df först, och om val != "alla": urval = df[df["kategori"] == val]',
      'st.metric("Sålda", int(urval["antal"].sum()))',
    ],
    files: FILES,
    tests: [
      {
        description: 'Alla: Sålda 87',
        code: "__shown('metric')",
        expected: ['Sålda: 87'],
      },
      {
        description: 'Dryck: Sålda 48',
        code: "__shown('metric')",
        expected: ['Sålda: 48'],
        widgets: { Kategori: 'dryck' },
      },
      {
        description: 'Mat: Sålda 10',
        code: "__shown('metric')",
        expected: ['Sålda: 10'],
        widgets: { Kategori: 'mat' },
      },
    ],
    sourceChecks: [
      {
        description: 'Filtret ligger i sidopanelen (st.sidebar)',
        pattern: /st\.sidebar/,
      },
    ],
  },
  {
    id: 'st-10',
    track: 'streamlit',
    title: 'En räknare som minns',
    xp: 25,
    description:
      'Eftersom programmet körs om vid varje klick glömmer det alla variabler. st.session_state är minnet som finns kvar.',
    explain:
      'Prova att göra en räknare med `antal = 0` och `antal += 1` när man klickar. Den kommer aldrig över 1 – varje klick kör programmet från början, och då blir `antal` 0 igen.\n\n`st.session_state` är som en dictionary som överlever omkörningarna. Skapa värdet bara första gången, med `if "antal" not in st.session_state:` och `st.session_state.antal = 0` indraget under.\n\nSedan kan du läsa och ändra `st.session_state.antal` som en vanlig variabel, och värdet finns kvar till nästa klick.',
    example: `${ST}\nif "poang" not in st.session_state:\n    st.session_state.poang = 0\nif st.button("Mål!"):\n    st.session_state.poang += 1\nst.write(f"Poäng: {st.session_state.poang}")`,
    task: 'Uppgift: Gör en kopp-räknare. `st.session_state.koppar` börjar på 0. Knappen `+1 kopp` ökar den med 1 och knappen `Nollställ` sätter den till 0. Visa `st.metric("Koppar i dag", …)` sist.',
    starterCode: ST,
    solution: `${ST}\nif "koppar" not in st.session_state:\n    st.session_state.koppar = 0\nif st.button("+1 kopp"):\n    st.session_state.koppar += 1\nif st.button("Nollställ"):\n    st.session_state.koppar = 0\nst.metric("Koppar i dag", st.session_state.koppar)\n`,
    hints: [
      'Först: if "koppar" not in st.session_state: st.session_state.koppar = 0',
      'if st.button("+1 kopp"): st.session_state.koppar += 1',
      'Nollställ på samma sätt med = 0, och st.metric sist så att den visar det nya värdet.',
    ],
    tests: [
      {
        description: 'Från början: 0 koppar',
        code: "__shown('metric')",
        expected: ['Koppar i dag: 0'],
      },
      {
        description: 'Tre klick på +1 kopp ger 3',
        code: "__shown('metric')",
        expected: ['Koppar i dag: 3'],
        widgets: [
          { '+1 kopp': true },
          { '+1 kopp': true },
          { '+1 kopp': true },
        ],
      },
      {
        description: 'Två klick och sedan Nollställ ger 0',
        code: "__shown('metric')",
        expected: ['Koppar i dag: 0'],
        widgets: [
          { '+1 kopp': true },
          { '+1 kopp': true },
          { Nollställ: true },
        ],
      },
    ],
  },
];
