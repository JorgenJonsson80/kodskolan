# Små datamängder till Dataanalys-kursens projekt och idéer, så att inte
# allt handlar om kaféet: ett kontoutdrag, vädret i tre städer, en
# spellista, bibliotekets lån och en kundenkät. Fast slump, så att
# testernas svar håller.
#
# Kör: python3 scripts/data/projekt.py
import csv
import math
import random
from datetime import date, datetime, timedelta
from pathlib import Path

OUT = Path(__file__).resolve().parents[2] / 'src/courses/data/data/filer'


def skriv(namn, huvud, rader, sep=','):
    with open(OUT / namn, 'w', newline='', encoding='utf-8') as fil:
        ut = csv.writer(fil, delimiter=sep, lineterminator='\n')
        ut.writerow(huvud)
        ut.writerows(rader)


def konto():
    # Tre månader på ett lönekonto: lön, hyra, mat, nöjen, resor och
    # några stora engångsköp.
    slump = random.Random(11)
    rader = []
    butiker = {
        'mat': ['ICA', 'Coop', 'Lidl', 'Willys'],
        'nöjen': ['Bio', 'Spotify', 'Restaurang', 'Konsert'],
        'resor': ['SL', 'SJ', 'Taxi'],
        'kläder': ['H&M', 'Stadium'],
    }
    for manad in (1, 2, 3):
        rader.append([f'2025-{manad:02d}-25', 'Lön', 28500, 'lön'])
        rader.append([f'2025-{manad:02d}-28', 'Hyra', -9200, 'boende'])
        rader.append([f'2025-{manad:02d}-03', 'Mobil', -299, 'boende'])
        for _ in range(14):
            dag = slump.randint(1, 28)
            kategori = slump.choices(list(butiker), [60, 20, 15, 5])[0]
            butik = slump.choice(butiker[kategori])
            belopp = {
                'mat': slump.randint(80, 900),
                'nöjen': slump.randint(99, 650),
                'resor': slump.randint(39, 450),
                'kläder': slump.randint(199, 1200),
            }[kategori]
            if butik == 'Spotify':
                belopp = 129
            rader.append([f'2025-{manad:02d}-{dag:02d}', butik, -belopp, kategori])
    rader.append(['2025-02-14', 'Elgiganten', -6995, 'hem'])
    rader.sort()
    skriv('konto.csv', ['datum', 'text', 'belopp', 'kategori'], rader)

    # Samma utdrag som en bank exporterar det: semikolon, decimalkomma,
    # "kr" efter beloppet och butiksnamn med olika stavning.
    rorigt = []
    for datum, text, belopp, kategori in rader:
        r = slump.random()
        if r < 0.15:
            text = text.upper()
        elif r < 0.25:
            text = ' ' + text
        rorigt.append([datum, text, f'{belopp},00 kr', kategori])
        if slump.random() < 0.05:
            rorigt.append([datum, text, f'{belopp},00 kr', kategori])
    skriv('konto_rorig.csv', ['datum', 'text', 'belopp', 'kategori'], rorigt, sep=';')

    budget = [['mat', 4500], ['nöjen', 1200], ['resor', 900], ['kläder', 600], ['boende', 9500], ['hem', 500]]
    skriv('budget.csv', ['kategori', 'budget'], budget)


def vader():
    # Juni 2025 i tre städer. Kiruna saknar några mätningar.
    slump = random.Random(12)
    stader = {'Stockholm': 17, 'Göteborg': 16, 'Kiruna': 10}
    rader = []
    for stad, medel in stader.items():
        for dag in range(1, 31):
            temp = round(medel + 3 * math.sin(dag / 5) + slump.gauss(0, 2.5), 1)
            regn = round(max(0, slump.gauss(1.5 if stad == 'Göteborg' else 0.8, 2.5)), 1)
            if stad == 'Kiruna' and dag in (6, 7, 19):
                temp = ''
            rader.append([f'2025-06-{dag:02d}', stad, temp, regn])
    skriv('vader.csv', ['datum', 'stad', 'temperatur', 'regn_mm'], rader)


def lyssning():
    # Två veckor med en musikapp: när, vem och hur länge.
    slump = random.Random(13)
    artister = {
        'Veronica Maggio': ('pop', 210),
        'Kent': ('rock', 260),
        'ABBA': ('pop', 225),
        'Robyn': ('pop', 235),
        'Håkan Hellström': ('rock', 245),
        'Miriam Bryant': ('pop', 200),
        'Bach': ('klassiskt', 320),
    }
    rader = []
    start = datetime(2025, 5, 5)
    for dag in range(14):
        for _ in range(slump.randint(3, 9)):
            timme = slump.choices([7, 8, 12, 17, 18, 21, 22], [12, 15, 6, 14, 10, 8, 5])[0]
            tid = start + timedelta(days=dag, hours=timme, minutes=slump.randrange(60))
            artist = slump.choices(list(artister), [18, 14, 12, 10, 12, 9, 4])[0]
            genre, langd = artister[artist]
            sekunder = max(90, int(slump.gauss(langd, 30)))
            rader.append([tid.strftime('%Y-%m-%d %H:%M'), artist, sekunder])
    rader.sort()
    skriv('lyssning.csv', ['tidpunkt', 'artist', 'sekunder'], rader)
    skriv('artister.csv', ['artist', 'genre'], [[a, g] for a, (g, _) in artister.items()])


def bibliotek():
    # Ett skolbiblioteks lån under våren: när boken lånades och lämnades.
    slump = random.Random(14)
    bocker = [
        ('Harry Potter och de vises sten', 'fantasy'),
        ('Mio min Mio', 'fantasy'),
        ('Pippi Långstrump', 'barn'),
        ('Bröderna Lejonhjärta', 'fantasy'),
        ('Kalle Stropp', 'barn'),
        ('Spöket i skolan', 'deckare'),
        ('LasseMajas detektivbyrå', 'deckare'),
        ('Ronja Rövardotter', 'fantasy'),
        ('Rymden för nyfikna', 'fakta'),
        ('Dinosaurier', 'fakta'),
    ]
    rader = []
    for nummer in range(1, 61):
        titel, genre = slump.choice(bocker)
        lanad = date(2025, 1, 7) + timedelta(days=slump.randrange(110))
        dagar = max(2, int(slump.gauss(18 if genre == 'fantasy' else 12, 6)))
        tillbaka = lanad + timedelta(days=dagar)
        rader.append([nummer, titel, genre, lanad.isoformat(), tillbaka.isoformat()])
    skriv('bibliotek.csv', ['lan', 'titel', 'genre', 'lanad', 'tillbaka'], rader)


def enkat():
    # Kafé Kanels kundenkät på papper, inskriven för hand: betyg som tal
    # och som ord, olika stavning av kaféet och tomma svar.
    slump = random.Random(15)
    ord_betyg = {1: 'ett', 2: 'två', 3: 'tre', 4: 'fyra', 5: 'fem'}
    kafeer = {'Gamla stan': ['Gamla stan', 'gamla stan', 'Gamla Stan '], 'City': ['City', 'city', 'CITY']}
    kommentarer = ['Gott kaffe', 'För dyrt', 'Trevlig personal', 'Lång kö', 'Bästa bullarna', '', 'Mysigt']
    rader = []
    for nummer in range(1, 81):
        kafe = slump.choice(list(kafeer))
        betyg = slump.choices([1, 2, 3, 4, 5], [3, 6, 18, 40, 33] if kafe == 'Gamla stan' else [6, 12, 30, 32, 20])[0]
        skrivet = ord_betyg[betyg] if slump.random() < 0.12 else str(betyg)
        if slump.random() < 0.06:
            skrivet = ''
        rader.append([nummer, slump.choice(kafeer[kafe]), skrivet, slump.choice(kommentarer)])
    skriv('enkat.csv', ['svar', 'kafe', 'betyg', 'kommentar'], rader)


konto()
vader()
lyssning()
bibliotek()
enkat()
print('klart')
