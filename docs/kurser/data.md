# Dataanalys med Python

Ta reda på saker med data: läsa in, städa,
räkna, koppla ihop tabeller, rita diagram och dra slutsatser som håller.
Kursen tar vid där Python-kursens bana 12 (pandas) slutar och blir sista
kursen i spåret **Data** (`src/app/paths.js`): Python → SQL →
Dataanalys.

Id `data`, adressen `/data`, `storagePrefix` `kodskolan-data-`.
Övningarnas id börjar med `da-`. `plannedTracks: 11` i `meta.js`: tills
alla banor finns kan ingen bli klar med kursen eller få diplom. Kursen
läggs till i spåret Data först när den är färdig, så att ingen som redan
klarat spåret tappar det.

## Kaféet

Hela kursen följer ett litet kafé, **Kafé Kanel**, och dess kassa. Alla
har varit på ett kafé, så frågorna känns självklara: vad säljer mest,
när är det mest folk, säljs det mer iskaffe när det är varmt?

Datan är påhittad men ser verklig ut, och den växer med kursen:

| Fil              | Kolumner                                                      | Från bana |
| ---------------- | ------------------------------------------------------------- | --------- |
| `kassan.csv`     | kvitto, datum, tid, produkt, antal, pris, betalsatt           | 1         |
| `produkter.csv`  | produkt, kategori (kaffe, bakverk, mat, dryck), inkop, pris   | 6         |
| `vadret.csv`     | datum, temperatur, regn                                       | 6         |
| `personal.csv`   | datum, pass (förmiddag, eftermiddag), personer                | 6         |
| `kassan_rorig.csv` | mars med fel som riktig data har (och `kassan_mars.csv` ren) | 3         |

`kassan_rorig.csv` är mars med "kanelbulle", "Latte " och
"Kanelbullar", betalsätt som "KORT" och " swish", priser som "45 kr"
och "45,00", tomma antal (som betyder 1), helt tomma rader och rader
som kom med två gånger. Varje fel går att laga så att filen blir exakt
som `kassan_mars.csv`. Resten av kursen använder den rena kassan.
`astype("int64")`, inte `astype(int)`: i Pyodide blir `int` 32 bitar.

Några övningar och idéer använder annan data så att det inte blir
enformigt: vädret i flera städer, ett påhittat kontoutdrag (idén
_Analysera ditt eget kontoutdrag_ på Lekplatsen) och lyssningsstatistik.

Datan skapas av ett skript (`scripts/data/kafe.py`) med fast slump, så
att samma fil alltid blir likadan och testerna kan räkna fram svaren.
Ett år: cirka 5 600 kvitton och 9 300 rader i kassan (390 kB). Mönster som går att hitta: lunch
och fika (kl 12 och 15), mer på lördagar, iskaffe när det är varmt,
semlor bara i februari, en vecka i juli när kaféet är stängt.

## Banorna

| #  | id           | Bana                    | Lär ut                                                                 |
| -- | ------------ | ----------------------- | ---------------------------------------------------------------------- |
| 1  | `pandas`     | pandas igen             | `read_csv`, kolumner, filtrera, sortera, `groupby`, `value_counts` (repetition, går att testa sig förbi) |
| 2  | `forsta`     | Första mötet            | `head`, `shape`, `info`, `dtypes`, `describe`, `unique`, frågor att ställa till ny data |
| 3  | `stada`      | Städa data              | `isna`, `dropna`, `fillna`, `duplicated`, `astype`, `to_numeric`, `str.strip/lower/replace` |
| 4  | `datum`      | Datum och tid           | `to_datetime`, `dt.month/dayofweek/hour`, filtrera på datum, `resample` per vecka |
| 5  | `gruppera`   | Gruppera på riktigt     | flera nycklar, `agg` med flera mått, `pivot_table`, `crosstab`, andelar i procent |
| 6  | `kombinera`  | Kombinera tabeller      | `merge` (inner, left), nycklar som inte matchar, `concat`, SQL in i pandas med `sqlite3` |
| 7  | `diagram`    | Diagram                 | matplotlib: linje, staplar, histogram, punkter, titel, etiketter, flera i en figur |
| 8  | `statistik`  | Statistik               | medel och median, spridning, percentiler, korrelation, avvikande värden, numpy |
| 9  | `beratta`    | Berätta med data        | välja diagram, jämföra rättvist, fällor (medel eller median, skala, korrelation är inte orsak) |
| 10 | `slutprojekt`| Slutprojektet           | en analys från rå fil till slutsats och diagram                        |
| 11 | `app`        | Från analys till app    | analysen som en Streamlit-sida: filter, diagram och siffror som ändras |

Bana 1–3 är klara ✅. Excel (`read_excel`) är inte med: CSV räcker, och
`openpyxl` vore ännu ett paket att ladda.

De två första banorna är gratis när låsningen slås på.

### Övningarna, i korthet

Nio per bana och en boss, som i de andra kurserna.

1. **pandas igen:** läs in kassan, en kolumn, en ny kolumn (summa =
   antal × pris), filtrera, två villkor, sortera, gruppera, medelvärde
   per grupp, räkna. _Boss:_ dagens fem bästsäljare.
2. **Första mötet:** hur stor är tabellen, de första raderna, vilka
   typer, `describe`, vilka produkter finns, hur många kvitton, första
   och sista datum, vad saknas, vilka frågor kan datan svara på (en
   övning där svaret är kod som skriver ut en sammanfattning).
   _Boss:_ en faktaruta om kaféet.
3. **Städa data:** hitta tomma värden, ta bort tomma rader, fylla i
   ett värde, hitta dubbletter, ta bort dem, `"32,50"` till tal,
   trimma och små bokstäver, slå ihop stavningar med `replace`, kolla
   att städningen gick (antal rader före och efter). _Boss:_ städa hela
   `kassan_rorig.csv` så att den blir lika med `kassan_mars.csv`.
4. **Datum och tid:** text till datum, månad, veckodag, timme, filtrera
   en månad, mellan två datum, per veckodag, per timme, `resample` per
   vecka. _Boss:_ kaféets bästa timme på en lördag.
5. **Gruppera på riktigt:** två nycklar, `agg` med summa och antal,
   namnge kolumnerna, `pivot_table` (produkt × veckodag), `crosstab`
   (betalsätt × kategori), andel i procent, topp 3 per grupp, `reset_index`,
   jämföra två grupper. _Boss:_ en månadsrapport.
6. **Kombinera tabeller:** `merge` med prislistan, vinst per produkt,
   vad som händer när en nyckel saknas, `how="left"`, hitta produkter
   som aldrig säljs, försäljning per dag ihop med vädret, personal per
   pass, `concat` två månader, läsa från en SQLite-databas. _Boss:_
   säljs det mer iskaffe när det är varmt?
7. **Diagram:** en linje (försäljning per dag), staplar (per produkt),
   liggande staplar, histogram (kvittots storlek), punkter (temperatur
   och iskaffe), titel och etiketter, två linjer med förklaring,
   sortera innan man ritar, två diagram bredvid varandra. _Boss:_
   kaféets vecka i en figur.
8. **Statistik:** medel och median (och varför de skiljer sig),
   min/max, standardavvikelse, percentiler (90 % av kvittona är under …),
   `corr`, hitta avvikande dagar, rullande medelvärde, numpy
   (`np.mean`, `np.where`), jämföra två veckor. _Boss:_ vilka dagar
   var konstiga, och varför?
9. **Berätta med data:** rätt diagram för frågan, staplar som börjar på
   noll, andelar i stället för antal, jämför per dag när månaderna är
   olika långa, korrelation är inte orsak, en mening som slutsats (testas
   med siffrorna i den), visa osäkerhet, tre fel att hitta i en
   färdig analys. _Boss:_ skriv om en vilseledande analys.
10. **Slutprojektet:** tre projekt med tre steg, som slutprojekten i
    de andra kurserna (se nedan).

### Projekt

Tre per bana med tre steg, enligt `docs/NY-KURS.md`. Exempel:

- Bana 3: _Kundenkäten_ (städa svar med fritext och betyg).
- Bana 4: _Öppettiderna_ (ska kaféet öppna en timme tidigare?).
- Bana 6: _Inköpslistan_ (vad behöver beställas inför nästa vecka?).
- Bana 7: _Dashboarden_ (fyra diagram i en figur).
- Bana 10: _Sortimentet_ (vad ska kaféet sluta sälja?),
  _Bemanningen_ (när behövs en person till?) och _Din egen fråga_
  (eleven väljer frågan själv och skriver slutsatsen).

## Teknik

Kursen återanvänder Python-kursens körning (`createPythonRunner`), som
Flask- och FastAPI-kurserna. pandas finns redan där. Det nya:

- **matplotlib.** Laddas när koden importerar det (`loadPackagesFor`),
  med backenden `Agg`. Efter körningen sparas varje figur som PNG och
  visas under utskriften. Rättningen tittar aldrig på pixlar. Den läser
  figuren i stället: `__figur()` ger diagramtyp, titel, etiketter och
  värdena (`ax.lines`, `ax.patches`, `ax.collections`). Så kan ett test
  säga "staplarna ska vara sorterade" eller "titeln saknas".
- **CSV-filerna** skrivs till filsystemet med `files` på övningen, som
  i Python-kursens pandas-bana. Den stora kassan delas mellan
  övningarna, så att den inte ligger i varje övning.
- **sqlite3** finns i Pyodide för bana 6.
- **Testerna** i Node laddar matplotlib från `node_modules/pyodide`,
  som pandas i dag. Hjulet behöver laddas ner dit.
- Inget nytt i kärnan.

Testa värden, aldrig hela tabeller: `per_produkt.to_dict()`,
`df["summa"].round(2).tolist()`, `len(df)`.

