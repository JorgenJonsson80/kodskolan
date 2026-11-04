// Bana 10: klasser – egna sorters värden med attribut och metoder.
// Testerna tittar på attributen (fido.namn) i stället för att jämföra hela
// objekt, eftersom två objekt aldrig är == om klassen inte säger det.
export const KLASSER = [
  {
    id: 'kl-01',
    track: 'klasser',
    title: 'En egen sorts värde: class',
    xp: 10,
    description:
      'En klass är en mall. Med den kan du skapa hur många objekt du vill, och varje objekt har sina egna värden.',
    explain:
      '`class Hund:` skapar mallen. Metoden `__init__` körs varje gång ett nytt objekt skapas, och `self` är objektet som håller på att skapas. `self.namn = namn` sparar namnet *i objektet* – det kallas ett attribut.\n\n`fido = Hund("Fido")` skapar ett objekt. Python skickar in objektet som `self` själv, så du skickar bara med namnet. Sedan når du namnet med `fido.namn`.\n\nKlassnamn skrivs med stor bokstav, så att de syns från vanliga variabler.',
    example:
      'class Katt:\n    def __init__(self, namn):\n        self.namn = namn\n\n\nmisse = Katt("Misse")\nprint(misse.namn)',
    task: 'Uppgift: Skapa klassen `Hund` med en `__init__(self, namn)` som sparar namnet i `self.namn`. Skapa sedan `fido = Hund("Fido")`.',
    starterCode: '# Skriv din kod här\n',
    solution:
      'class Hund:\n    def __init__(self, namn):\n        self.namn = namn\n\n\nfido = Hund("Fido")\n',
    hints: [
      'Börja med class Hund: och dra in def __init__(self, namn): under den.',
      'Inuti __init__: self.namn = namn',
      'Längst ner, utan indrag: fido = Hund("Fido")',
    ],
    tests: [
      { description: 'fido.namn är Fido', code: 'fido.namn', expected: 'Fido' },
      {
        description: 'Hund("Rex").namn är Rex',
        code: 'Hund("Rex").namn',
        expected: 'Rex',
      },
    ],
    sourceChecks: [
      { description: 'Skapar klassen Hund', pattern: /class\s+Hund\b/ },
      { description: 'Har en __init__', pattern: /def\s+__init__\s*\(\s*self/ },
    ],
  },
  {
    id: 'kl-02',
    track: 'klasser',
    title: 'Flera attribut',
    xp: 10,
    description:
      'Ett objekt kan ha många attribut. Varje objekt har sina egna, så att ändra det ena påverkar inte det andra.',
    explain:
      '`__init__` kan ta emot flera värden, precis som en vanlig funktion. Spara vart och ett med `self.`.\n\nEtt attribut kan också få ett startvärde som inte skickas in, som `self.mil = 0` i exemplet.\n\nAttributen kan ändras efteråt: `fido.alder = 4`. Bara fido ändras – alla andra hundar har kvar sin ålder.',
    example:
      'class Bil:\n    def __init__(self, marke, farg):\n        self.marke = marke\n        self.farg = farg\n        self.mil = 0\n\n\nbil = Bil("Volvo", "röd")\nbil.mil = 1200\nprint(bil.marke, bil.mil)',
    task: 'Uppgift: Låt `Hund` ta emot `namn`, `ras` och `alder`, och spara alla tre. Skapa `fido = Hund("Fido", "tax", 3)` och `rex = Hund("Rex", "pudel", 5)`. Fyll sedan år med fido: `fido.alder = 4`.',
    starterCode:
      'class Hund:\n    def __init__(self, namn):\n        self.namn = namn\n',
    solution:
      'class Hund:\n    def __init__(self, namn, ras, alder):\n        self.namn = namn\n        self.ras = ras\n        self.alder = alder\n\n\nfido = Hund("Fido", "tax", 3)\nrex = Hund("Rex", "pudel", 5)\nfido.alder = 4\n',
    hints: [
      'def __init__(self, namn, ras, alder):',
      'En rad per attribut: self.ras = ras och self.alder = alder.',
      'Skapa båda hundarna och skriv sedan fido.alder = 4.',
    ],
    tests: [
      { description: 'fido.ras är tax', code: 'fido.ras', expected: 'tax' },
      { description: 'fido.alder är 4', code: 'fido.alder', expected: 4 },
      {
        description: 'rex.alder är fortfarande 5',
        code: 'rex.alder',
        expected: 5,
      },
      {
        description: 'Hund("Bo", "mops", 1).ras är mops',
        code: 'Hund("Bo", "mops", 1).ras',
        expected: 'mops',
      },
    ],
  },
  {
    id: 'kl-03',
    track: 'klasser',
    title: 'En metod',
    xp: 10,
    description:
      'En metod är en funktion som hör till klassen. Den kommer åt objektets attribut via self.',
    explain:
      'En metod skrivs med `def` inuti klassen, och första parametern är alltid `self`. Med `self.namn` når metoden namnet på just det objekt den körs på.\n\nDu kör metoden med en punkt: `fido.skall()`. Python skickar in fido som `self` – därför står det inget inom parenteserna.\n\nDu har använt metoder hela tiden: `namn.upper()` och `lista.append(3)` är metoder på text och listor.',
    example:
      'class Katt:\n    def __init__(self, namn):\n        self.namn = namn\n\n    def jama(self):\n        return f"{self.namn} säger mjau!"\n\n\nprint(Katt("Misse").jama())',
    task: 'Uppgift: Ge `Hund` metoden `skall(self)` som returnerar t.ex. `Fido säger voff!` med hundens eget namn.',
    starterCode:
      'class Hund:\n    def __init__(self, namn):\n        self.namn = namn\n\n\nfido = Hund("Fido")\nprint(fido.skall())\n',
    solution:
      'class Hund:\n    def __init__(self, namn):\n        self.namn = namn\n\n    def skall(self):\n        return f"{self.namn} säger voff!"\n\n\nfido = Hund("Fido")\nprint(fido.skall())\n',
    hints: [
      'Skriv def skall(self): inuti klassen, lika långt in som __init__.',
      'Hundens namn är self.namn.',
      'return f"{self.namn} säger voff!"',
    ],
    tests: [
      {
        description: 'Programmet skriver Fido säger voff!',
        code: '__output',
        expected: ['Fido säger voff!'],
      },
      {
        description: 'Hund("Rex").skall() använder Rex namn',
        code: 'Hund("Rex").skall()',
        expected: 'Rex säger voff!',
      },
    ],
    sourceChecks: [
      { description: 'Metoden tar self', pattern: /def\s+skall\s*\(\s*self/ },
    ],
  },
  {
    id: 'kl-04',
    track: 'klasser',
    title: 'En metod som ändrar objektet',
    xp: 10,
    description:
      'En metod kan ändra objektets attribut. Objektet minns ändringen till nästa gång.',
    explain:
      'Ett bankkonto börjar alltid på 0 kr, så saldot skickas inte in. `__init__` sätter `self.saldo = 0`.\n\nEn metod som `satt_in` ändrar `self.saldo`. Ändringen sitter kvar i objektet, så nästa anrop bygger vidare på den. Det är det som gör objekt praktiska: värdena och koden som ändrar dem hålls ihop.',
    example:
      'class Raknare:\n    def __init__(self):\n        self.antal = 0\n\n    def oka(self):\n        self.antal += 1\n\n\nr = Raknare()\nr.oka()\nr.oka()\nprint(r.antal)',
    task: 'Uppgift: Skapa `Konto` med `__init__(self, agare)` som sparar ägaren och sätter `saldo` till 0. Lägg till `satt_in(self, belopp)` som ökar saldot. Skapa `konto = Konto("Ada")` och sätt in 100 och sedan 50.',
    starterCode: '# Skriv din kod här\n',
    solution:
      'class Konto:\n    def __init__(self, agare):\n        self.agare = agare\n        self.saldo = 0\n\n    def satt_in(self, belopp):\n        self.saldo += belopp\n\n\nkonto = Konto("Ada")\nkonto.satt_in(100)\nkonto.satt_in(50)\n',
    hints: [
      'I __init__: self.agare = agare och self.saldo = 0',
      'def satt_in(self, belopp): med self.saldo += belopp',
      'konto.satt_in(100) och konto.satt_in(50) längst ner.',
    ],
    tests: [
      { description: 'konto.saldo är 150', code: 'konto.saldo', expected: 150 },
      {
        description: 'konto.agare är Ada',
        code: 'konto.agare',
        expected: 'Ada',
      },
      {
        description: 'Ett nytt konto börjar på 0',
        code: 'Konto("Bo").saldo',
        expected: 0,
      },
    ],
  },
  {
    id: 'kl-05',
    track: 'klasser',
    title: 'En metod som säger ifrån',
    xp: 10,
    description:
      'En metod kan kolla att ändringen är tillåten innan den gör den – och annars göra raise.',
    explain:
      'Objektet ansvarar för sina egna regler. Ett konto ska aldrig kunna gå under 0, så `ta_ut` kollar saldot först och gör `raise` om pengarna inte räcker.\n\nKoden som använder kontot behöver inte veta reglerna. Den fångar felet med try, som i förra banan.',
    example:
      'class Hiss:\n    def __init__(self):\n        self.vaning = 0\n\n    def ga_till(self, vaning):\n        if vaning > 10:\n            raise ValueError("Så högt går inte hissen")\n        self.vaning = vaning',
    task: 'Uppgift: Lägg till `ta_ut(self, belopp)`. Är beloppet större än saldot: `raise ValueError("Täckning saknas")`. Annars minskar saldot. Programmet längst ner ska då skriva ut `Saldo: 70` och `Täckning saknas`.',
    starterCode:
      'class Konto:\n    def __init__(self, agare):\n        self.agare = agare\n        self.saldo = 0\n\n    def satt_in(self, belopp):\n        self.saldo += belopp\n\n\nkonto = Konto("Ada")\nkonto.satt_in(100)\nkonto.ta_ut(30)\nprint(f"Saldo: {konto.saldo}")\ntry:\n    konto.ta_ut(500)\nexcept ValueError as fel:\n    print(fel)\n',
    solution:
      'class Konto:\n    def __init__(self, agare):\n        self.agare = agare\n        self.saldo = 0\n\n    def satt_in(self, belopp):\n        self.saldo += belopp\n\n    def ta_ut(self, belopp):\n        if belopp > self.saldo:\n            raise ValueError("Täckning saknas")\n        self.saldo -= belopp\n\n\nkonto = Konto("Ada")\nkonto.satt_in(100)\nkonto.ta_ut(30)\nprint(f"Saldo: {konto.saldo}")\ntry:\n    konto.ta_ut(500)\nexcept ValueError as fel:\n    print(fel)\n',
    hints: [
      'def ta_ut(self, belopp): inuti klassen.',
      'if belopp > self.saldo: raise ValueError("Täckning saknas")',
      'Efter if: self.saldo -= belopp',
    ],
    tests: [
      {
        description: 'Programmet skriver Saldo: 70 och Täckning saknas',
        code: '__output',
        expected: ['Saldo: 70', 'Täckning saknas'],
      },
      {
        description: 'konto.saldo är kvar på 70 efter det nekade uttaget',
        code: 'konto.saldo',
        expected: 70,
      },
      {
        description: 'Ett tomt konto säger Täckning saknas',
        code: '__message(Konto("Bo").ta_ut, 1)',
        expected: 'Täckning saknas',
      },
    ],
  },
  {
    id: 'kl-06',
    track: 'klasser',
    title: 'Snygg utskrift: __str__',
    xp: 10,
    description:
      'Skriver du ut ett objekt blir det något krångligt som <__main__.Vara object at 0x…>. Med __str__ bestämmer du själv.',
    explain:
      '`__str__(self)` returnerar texten som `print(vara)` och `str(vara)` ska visa. Python anropar den själv – du skriver aldrig `vara.__str__()`.\n\nMetoder med två understreck före och efter, som `__init__` och `__str__`, har speciella namn som Python letar efter.',
    example:
      'class Hund:\n    def __init__(self, namn):\n        self.namn = namn\n\n    def __str__(self):\n        return f"Hunden {self.namn}"\n\n\nprint(Hund("Fido"))',
    task: 'Uppgift: Ge `Vara` en `__str__` som returnerar t.ex. `mjölk: 15 kr`.',
    starterCode:
      'class Vara:\n    def __init__(self, namn, pris):\n        self.namn = namn\n        self.pris = pris\n\n\nprint(Vara("mjölk", 15))\n',
    solution:
      'class Vara:\n    def __init__(self, namn, pris):\n        self.namn = namn\n        self.pris = pris\n\n    def __str__(self):\n        return f"{self.namn}: {self.pris} kr"\n\n\nprint(Vara("mjölk", 15))\n',
    hints: [
      'def __str__(self): inuti klassen.',
      'Använd self.namn och self.pris i en f-sträng.',
      'return f"{self.namn}: {self.pris} kr"',
    ],
    tests: [
      {
        description: 'Programmet skriver mjölk: 15 kr',
        code: '__output',
        expected: ['mjölk: 15 kr'],
      },
      {
        description: 'str(Vara("bröd", 30)) är bröd: 30 kr',
        code: 'str(Vara("bröd", 30))',
        expected: 'bröd: 30 kr',
      },
    ],
    sourceChecks: [
      { description: 'Har en __str__', pattern: /def\s+__str__\s*\(\s*self/ },
    ],
  },
  {
    id: 'kl-07',
    track: 'klasser',
    title: 'Många objekt i en lista',
    xp: 10,
    description:
      'Objekt kan ligga i en lista som allt annat. Loopa över listan och använd attributen.',
    explain:
      'En lista med objekt är som en tabell: varje objekt är en rad och attributen är kolumnerna.\n\nI en loop är `vara` ett objekt i taget, så `vara.pris` är priset på just den varan. Det fungerar i list comprehensions också: `[vara.namn for vara in varor]`.',
    example:
      'class Vara:\n    def __init__(self, namn, pris):\n        self.namn = namn\n        self.pris = pris\n\n\nvaror = [Vara("mjölk", 15), Vara("bröd", 30)]\nfor vara in varor:\n    print(vara.namn)',
    task: 'Uppgift: Skapa `total(varor)` som returnerar summan av priserna, och `billiga(varor, max_pris)` som returnerar en lista med namnen på varorna som kostar högst max_pris.',
    starterCode:
      'class Vara:\n    def __init__(self, namn, pris):\n        self.namn = namn\n        self.pris = pris\n\n\nkorg = [Vara("mjölk", 15), Vara("bröd", 30), Vara("ost", 80)]\n',
    solution:
      'class Vara:\n    def __init__(self, namn, pris):\n        self.namn = namn\n        self.pris = pris\n\n\ndef total(varor):\n    return sum([vara.pris for vara in varor])\n\n\ndef billiga(varor, max_pris):\n    return [vara.namn for vara in varor if vara.pris <= max_pris]\n\n\nkorg = [Vara("mjölk", 15), Vara("bröd", 30), Vara("ost", 80)]\n',
    hints: [
      'total: sum([vara.pris for vara in varor])',
      'billiga: en list comprehension med if vara.pris <= max_pris.',
      'Det är vara.namn som ska vara med i listan, inte hela vara.',
    ],
    tests: [
      { description: 'total(korg) är 125', code: 'total(korg)', expected: 125 },
      {
        description: 'billiga(korg, 30) är mjölk och bröd',
        code: 'billiga(korg, 30)',
        expected: ['mjölk', 'bröd'],
      },
      { description: 'total([]) är 0', code: 'total([])', expected: 0 },
    ],
  },
  {
    id: 'kl-08',
    track: 'klasser',
    title: 'Ett objekt med en lista i',
    xp: 10,
    description:
      'Ett attribut kan vara en lista. Då kan objektet samla saker, som låtar i en spellista.',
    explain:
      'Skapa listan i `__init__` med `self.latar = []`. Då får varje spellista sin egen tomma lista.\n\nMetoderna jobbar sedan med `self.latar`: `append` för att lägga till och `len` för att räkna. Den som använder spellistan behöver inte veta att det är en lista inuti – den anropar bara `lagg_till` och `antal`.',
    example:
      'class Ryggsack:\n    def __init__(self):\n        self.saker = []\n\n    def packa(self, sak):\n        self.saker.append(sak)',
    task: 'Uppgift: Skapa `Spellista` med `__init__(self, namn)` som sparar namnet och skapar en tom lista `latar`. Lägg till `lagg_till(self, lat)` och `antal(self)` som returnerar hur många låtar det finns.',
    starterCode: '# Skriv din kod här\n',
    solution:
      'class Spellista:\n    def __init__(self, namn):\n        self.namn = namn\n        self.latar = []\n\n    def lagg_till(self, lat):\n        self.latar.append(lat)\n\n    def antal(self):\n        return len(self.latar)\n\n\nfest = Spellista("Fest")\nfest.lagg_till("Dancing Queen")\nfest.lagg_till("Waterloo")\nlugn = Spellista("Lugnt")\n',
    hints: [
      'I __init__: self.namn = namn och self.latar = []',
      'lagg_till: self.latar.append(lat)',
      'antal: return len(self.latar)',
    ],
    tests: [
      {
        description: 'En ny spellista har 0 låtar',
        code: 'Spellista("Ny").antal()',
        expected: 0,
      },
      {
        description: 'Två låtar ger antal 2',
        code: '(lista := Spellista("Test"), lista.lagg_till("A"), lista.lagg_till("B"), lista.antal())[-1]',
        expected: 2,
      },
      {
        description: 'Låtarna sparas i ordning',
        code: '(lista := Spellista("Test"), lista.lagg_till("A"), lista.lagg_till("B"), lista.latar)[-1]',
        expected: ['A', 'B'],
      },
      {
        description: 'Två spellistor har varsin lista',
        code: '(a := Spellista("A"), b := Spellista("B"), a.lagg_till("X"), b.antal())[-1]',
        expected: 0,
      },
    ],
  },
  {
    id: 'kl-09',
    track: 'klasser',
    title: 'En metod som använder en annan',
    xp: 10,
    description:
      'Metoder i samma klass kan anropa varandra via self, så att varje uträkning bara finns på ett ställe.',
    explain:
      'Inuti klassen anropar du en annan metod med `self.yta()`. Glömmer du `self.` letar Python efter en vanlig funktion som heter `yta`, och den finns inte.\n\nNär `beskriv` använder `self.yta()` räcker det att rätta en uträkning på ett enda ställe om den skulle vara fel.',
    example:
      'class Cirkel:\n    def __init__(self, radie):\n        self.radie = radie\n\n    def diameter(self):\n        return self.radie * 2\n\n    def beskriv(self):\n        return f"Diameter {self.diameter()}"',
    task: 'Uppgift: Ge `Rektangel` metoderna `yta(self)`, `ar_kvadrat(self)` (True om bredd och höjd är lika) och `beskriv(self)` som returnerar t.ex. `3 x 4, yta 12` eller `5 x 5, yta 25, kvadrat` med hjälp av de andra två.',
    starterCode:
      'class Rektangel:\n    def __init__(self, bredd, hojd):\n        self.bredd = bredd\n        self.hojd = hojd\n',
    solution:
      'class Rektangel:\n    def __init__(self, bredd, hojd):\n        self.bredd = bredd\n        self.hojd = hojd\n\n    def yta(self):\n        return self.bredd * self.hojd\n\n    def ar_kvadrat(self):\n        return self.bredd == self.hojd\n\n    def beskriv(self):\n        text = f"{self.bredd} x {self.hojd}, yta {self.yta()}"\n        if self.ar_kvadrat():\n            text += ", kvadrat"\n        return text\n',
    hints: [
      'yta: return self.bredd * self.hojd',
      'ar_kvadrat: return self.bredd == self.hojd',
      'I beskriv: använd self.yta() och if self.ar_kvadrat(): för att lägga till ", kvadrat".',
    ],
    tests: [
      {
        description: 'Rektangel(3, 4).yta() är 12',
        code: 'Rektangel(3, 4).yta()',
        expected: 12,
      },
      {
        description: 'Rektangel(5, 5).ar_kvadrat() är True',
        code: 'Rektangel(5, 5).ar_kvadrat()',
        expected: true,
      },
      {
        description: 'Rektangel(3, 4).beskriv() är 3 x 4, yta 12',
        code: 'Rektangel(3, 4).beskriv()',
        expected: '3 x 4, yta 12',
      },
      {
        description: 'Rektangel(5, 5).beskriv() säger kvadrat',
        code: 'Rektangel(5, 5).beskriv()',
        expected: '5 x 5, yta 25, kvadrat',
      },
    ],
    sourceChecks: [
      { description: 'beskriv anropar self.yta()', pattern: /self\.yta\(\)/ },
    ],
  },
];
