# Kafé Kanels data till Dataanalys-kursen (docs/kurser/data.md). Påhittad
# men med mönster som går att hitta: lunch och fika, lördagar, iskaffe när
# det är varmt, semlor till fettisdagen, soppa när det är kallt och en
# vecka i juli när kaféet är stängt. Fast slump, så filerna blir likadana
# varje gång och testernas svar håller.
#
# Kör: python3 scripts/data/kafe.py
import csv
import math
import random
from datetime import date, timedelta
from pathlib import Path

OUT = Path(__file__).resolve().parents[2] / 'src/courses/data/data/filer'
rng = random.Random(2025)

ÅR = 2025
FETTISDAG = date(2025, 3, 4)
STÄNGT = (date(2025, 7, 14), date(2025, 7, 20))

# produkt: (kategori, pris, inköpspris, grundvikt)
PRODUKTER = {
    'Bryggkaffe': ('kaffe', 35, 6, 30),
    'Latte': ('kaffe', 45, 9, 22),
    'Cappuccino': ('kaffe', 42, 8, 16),
    'Iskaffe': ('kaffe', 49, 10, 0),
    'Te': ('dryck', 30, 4, 10),
    'Juice': ('dryck', 39, 14, 7),
    'Kanelbulle': ('bakverk', 32, 8, 24),
    'Kardemummabulle': ('bakverk', 34, 9, 14),
    'Kladdkaka': ('bakverk', 45, 12, 9),
    'Semla': ('bakverk', 55, 18, 0),
    'Smörgås': ('mat', 65, 24, 12),
    'Soppa': ('mat', 95, 30, 0),
}


def temperatur(dag):
    # Stockholmsväder ungefär: kallast i slutet av januari, varmast i juli.
    dagnr = dag.timetuple().tm_yday
    medel = 7.5 - 11 * math.cos(2 * math.pi * (dagnr - 20) / 365)
    return round(medel + rng.gauss(0, 3), 1)


def vikter(dag, timme, varmt, kallt):
    vikt = {}
    for produkt, (_, _, _, grund) in PRODUKTER.items():
        v = grund
        if produkt == 'Iskaffe':
            v = max(0, (varmt - 14) * 3)
        elif produkt == 'Semla':
            v = 30 if date(ÅR, 2, 1) <= dag <= FETTISDAG else 0
            if dag == FETTISDAG:
                v = 200
        elif produkt == 'Soppa':
            v = 0 if timme not in (11, 12, 13) else max(0, (10 - kallt) * 3)
        elif produkt == 'Smörgås' and timme in (11, 12, 13):
            v *= 3
        elif produkt == 'Kanelbulle' and dag.month == 10 and dag.day == 4:
            v *= 8  # Kanelbullens dag
        elif produkt in ('Te',) and kallt < 3:
            v *= 1.8
        elif produkt in ('Bryggkaffe', 'Cappuccino') and timme < 10:
            v *= 1.8
        if PRODUKTER[produkt][0] == 'bakverk' and timme in (14, 15, 16):
            v *= 1.6
        vikt[produkt] = v
    return vikt


# Hur många kunder per timme (kl 7–17), före veckodag och väder.
TIMMAR = {7: 3, 8: 6, 9: 5, 10: 4, 11: 6, 12: 11, 13: 8, 14: 6, 15: 9, 16: 5, 17: 2}
VECKODAG = [0.85, 0.85, 0.9, 0.95, 1.1, 1.5, 1.05]  # måndag först


def dagar():
    dag = date(ÅR, 1, 1)
    while dag.year == ÅR:
        yield dag
        dag += timedelta(days=1)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    kassan = []
    vadret = []
    kvitto = 1000
    for dag in dagar():
        temp = temperatur(dag)
        regn = rng.random() < (0.25 if dag.month in (6, 7, 8) else 0.4)
        vadret.append([dag.isoformat(), temp, 'ja' if regn else 'nej'])
        if STÄNGT[0] <= dag <= STÄNGT[1] or dag in (date(ÅR, 12, 24), date(ÅR, 12, 25)):
            continue
        faktor = VECKODAG[dag.weekday()] * (0.8 if regn else 1.0)
        if dag.month in (6, 7, 8):
            faktor *= 1.15
        for timme, bas in TIMMAR.items():
            if dag.weekday() >= 5 and timme == 7:
                continue  # öppnar kl 8 på helgen
            kunder = max(0, round(rng.gauss(bas * faktor * 0.24, 0.8)))
            for _ in range(kunder):
                kvitto += 1
                minut = rng.randrange(60)
                betal = rng.choices(['kort', 'swish', 'kontant'], [78, 18, 4])[0]
                vikt = vikter(dag, timme, temp, temp)
                namn = [p for p in vikt if vikt[p] > 0]
                antal_varor = rng.choices([1, 2, 3], [45, 42, 13])[0]
                valda = []
                while len(valda) < antal_varor:
                    produkt = rng.choices(namn, [vikt[p] for p in namn])[0]
                    if produkt not in valda:
                        valda.append(produkt)
                for produkt in valda:
                    antal = rng.choices([1, 2, 3], [80, 16, 4])[0]
                    pris = PRODUKTER[produkt][1]
                    kassan.append([
                        kvitto, dag.isoformat(), f'{timme:02d}:{minut:02d}',
                        produkt, antal, pris, betal,
                    ])

    with open(OUT / 'kassan.csv', 'w', newline='', encoding='utf-8') as fil:
        skriv = csv.writer(fil, lineterminator='\n')
        skriv.writerow(['kvitto', 'datum', 'tid', 'produkt', 'antal', 'pris', 'betalsatt'])
        skriv.writerows(kassan)

    with open(OUT / 'vadret.csv', 'w', newline='', encoding='utf-8') as fil:
        skriv = csv.writer(fil, lineterminator='\n')
        skriv.writerow(['datum', 'temperatur', 'regn'])
        skriv.writerows(vadret)

    with open(OUT / 'produkter.csv', 'w', newline='', encoding='utf-8') as fil:
        skriv = csv.writer(fil, lineterminator='\n')
        skriv.writerow(['produkt', 'kategori', 'pris', 'inkop'])
        for produkt, (kategori, pris, inkop, _) in PRODUKTER.items():
            skriv.writerow([produkt, kategori, pris, inkop])

    rorig(kassan)
    print(len(kassan), 'rader,', kvitto - 1000, 'kvitton')


# Mars som ren fil och som rörig: de fel riktig data har, till banan om
# att städa (bana 3). Varje fel går att laga så att filen blir exakt som
# den rena: tomma rader tas bort, ett tomt antal är alltid 1, dubbletterna
# är exakta kopior och stavningen går tillbaka med strip, capitalize och
# Kanelbullar → Kanelbulle.
def rorig(kassan):
    mars = [rad for rad in kassan if rad[1].startswith(f'{ÅR}-03-')]
    huvud = ['kvitto', 'datum', 'tid', 'produkt', 'antal', 'pris', 'betalsatt']
    with open(OUT / 'kassan_mars.csv', 'w', newline='', encoding='utf-8') as fil:
        skriv = csv.writer(fil, lineterminator='\n')
        skriv.writerow(huvud)
        skriv.writerows(mars)

    slump = random.Random(3)
    ut = []
    for rad in mars:
        kvitto, datum, tid, produkt, antal, pris, betal = rad
        r = slump.random()
        if r < 0.03:
            produkt = produkt.lower()
        elif r < 0.05:
            produkt = produkt + ' '
        elif produkt == 'Kanelbulle' and r < 0.12:
            produkt = 'Kanelbullar'
        r = slump.random()
        pris_text = str(pris)
        if r < 0.04:
            pris_text = f'{pris} kr'
        elif r < 0.07:
            pris_text = f'{pris},00'
        r = slump.random()
        antal_text = str(antal)
        if antal == 1 and r < 0.03:
            antal_text = ''
        r = slump.random()
        if r < 0.03:
            betal = betal.upper()
        elif r < 0.05:
            betal = betal.capitalize()
        elif r < 0.07:
            betal = ' ' + betal
        ny = [kvitto, datum, tid, produkt, antal_text, pris_text, betal]
        ut.append(ny)
        if slump.random() < 0.015:
            ut.append(list(ny))  # samma rad inslagen två gånger
        if slump.random() < 0.01:
            ut.append([''] * 7)  # tom rad
    with open(OUT / 'kassan_rorig.csv', 'w', newline='', encoding='utf-8') as fil:
        skriv = csv.writer(fil, lineterminator='\n')
        skriv.writerow(huvud)
        skriv.writerows(ut)


main()
