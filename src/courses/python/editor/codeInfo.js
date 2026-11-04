// Läser CodeMirrors syntaxträd för Python och svarar på två frågor:
// "vad är det här och vad tillhör det?" (hover) och
// "vilka metoder har det här värdet?" (förslag efter en punkt).

// Nyckelord, med fokus på *när* man använder dem.
const KEYWORDS = {
  if: 'Kör koden under bara om villkoret är sant. Ta till den när programmet ibland ska göra något och ibland inte.',
  elif: 'Betyder "annars om". Provas bara om villkoren ovanför var falska. Ta till den när det finns fler än två vägar.',
  else: 'Körs när inget villkor ovanför var sant. I en `try` körs den om inget fel inträffade.',
  for: 'En loop som går igenom något, ett värde i taget. Ta till den när du vet vad du ska gå igenom: talen i en `range`, eller sakerna i en lista.',
  in: 'I en `for`: det som loopen går igenom. I ett villkor: frågar om något finns i en lista, text eller dictionary.',
  while:
    'Upprepar koden så länge villkoret är sant. Ta till den när du inte vet hur många varv det blir.',
  break:
    'Avbryter loopen direkt. Står nästan alltid inuti en `if`: "när jag hittat det, sluta".',
  continue: 'Hoppar över resten av varvet och går till nästa.',
  def: 'Skapar en funktion – kod med ett namn som du kan köra många gånger. Ta till den när du skriver samma sak flera gånger.',
  return:
    'Skickar tillbaka ett värde från funktionen och avslutar den. Utan `return` ger funktionen `None`.',
  and: 'Och – sant bara om båda sidor är sanna.',
  or: 'Eller – sant om minst en sida är sann.',
  not: 'Inte – vänder sant till falskt och tvärtom.',
  is: 'Jämför om två saker är exakt samma objekt. Använd `==` för att jämföra värden; `is` mest med `None`.',
  pass: 'Gör ingenting. Används där Python kräver en rad, men du inte vill göra något än.',
  import: 'Hämtar en modul, t.ex. `import random`, så att du kan använda den.',
  from: '`from math import pi` hämtar bara `pi` ur modulen math.',
  as: 'Ger något ett annat namn, t.ex. `import pandas as pd` eller `except ValueError as fel`.',
  class: 'Skapar en klass – en mall för objekt med egna värden och metoder.',
  try: 'Kör kod som kan ge fel. Går det fel hoppar Python till `except` i stället för att stoppa.',
  except: 'Fångar ett fel från `try`, så att programmet kan fortsätta.',
  finally: 'Körs alltid efter `try`, oavsett om det blev fel eller inte.',
  raise:
    'Skapar ett fel med flit, t.ex. när någon skickar in ett ogiltigt värde.',
  lambda:
    'En liten funktion utan namn på en rad, t.ex. som `key` till `sorted`.',
  assert:
    'Kollar att något är sant. Är det falskt stoppar programmet med AssertionError – bra för att testa sin egen kod.',
  with: 'Öppnar något (t.ex. en fil) och stänger det automatiskt efteråt.',
  del: 'Tar bort en variabel, eller en sak ur en lista eller dictionary.',
  global:
    'Låter en funktion ändra en variabel utanför funktionen. Undvik om du kan – returnera hellre ett värde.',
  Boolean:
    'Sant eller falskt (bool). Det är vad jämförelser som `x > 3` ger, och vad `if` tittar på.',
  None: 'Betyder "inget värde". Det funktioner ger om de saknar `return`.',
  Comment:
    'En kommentar. Python hoppar över den – den är till för människor. Gör om en rad till kommentar med Cmd/Ctrl+/.',
  String: 'Text (str). Står inom citattecken, "så här" eller \'så här\'.',
  FormatString:
    'En f-sträng. Det som står inom `{ }` byts ut mot värdet, t.ex. `f"Hej {namn}"`.',
  Number:
    'Ett tal. Heltal (int) som `3`, eller decimaltal (float) som `2.5` – med punkt, inte komma.',
};

const OPERATORS = {
  '=': 'Sparar värdet till höger i variabeln till vänster. Det är inte en jämförelse – det är `==`.',
  '==': 'Är lika med? Ger `True` eller `False`.',
  '!=': 'Är inte lika med?',
  '<': 'Mindre än?',
  '>': 'Större än?',
  '<=': 'Mindre än eller lika med?',
  '>=': 'Större än eller lika med?',
  '+': 'Plus för tal. För text sätter den ihop: `"Hej " + namn`.',
  '-': 'Minus.',
  '*': 'Gånger. `"ha" * 3` ger `"hahaha"`.',
  '/': 'Delat med. Ger alltid ett decimaltal: `7 / 2` blir `3.5`.',
  '//': 'Heltalsdivision: delar och kastar decimalerna. `7 // 2` blir `3`.',
  '%': 'Rest vid division: `7 % 2` blir 1. Bra för att se om ett tal är jämnt.',
  '**': 'Upphöjt till: `2 ** 3` blir 8.',
  '+=': 'Lägger till: `x += 2` är samma som `x = x + 2`. Vanligt i loopar.',
  '-=': 'Drar ifrån: `x -= 1` är samma som `x = x - 1`.',
  '*=': 'Multiplicerar: `x *= 2` är samma som `x = x * 2`.',
};

// Pythons inbyggda funktioner.
const BUILTINS = {
  print:
    'Skriver ut värden. Flera värden med kommatecken får mellanslag emellan.',
  input: 'Frågar användaren och väntar på svar. Svaret är alltid text (str).',
  int: 'Gör om till ett heltal, t.ex. text från `input`: `int("15")` blir 15.',
  float: 'Gör om till ett decimaltal: `float("2.5")` blir 2.5.',
  str: 'Gör om till text, t.ex. ett tal som ska sättas ihop med annan text.',
  bool: 'Gör om till `True` eller `False`.',
  len: 'Antalet saker i en lista, dictionary eller tecken i en text.',
  range:
    'En följd av tal för en `for`-loop. `range(1, 6)` ger 1–5 – sista talet är inte med.',
  sum: 'Summan av alla tal i en lista.',
  min: 'Det minsta värdet.',
  max: 'Det största värdet. Med `key` jämförs något annat: `max(orden, key=len)` ger det längsta ordet.',
  abs: 'Talet utan minustecken: `abs(-3)` blir 3.',
  round: 'Avrundar: `round(2.567, 1)` blir 2.6.',
  sorted:
    'Ger en ny, sorterad lista. Originalet ändras inte. `reverse=True` ger störst först, och `key` bestämmer vad som jämförs: `sorted(orden, key=len)`.',
  reversed: 'Går igenom något baklänges.',
  list: 'Skapar en lista, eller gör om något till en lista.',
  dict: 'Skapar en dictionary.',
  tuple: 'Skapar en tupel – som en lista som inte går att ändra.',
  set: 'Skapar en mängd – en samling utan dubbletter.',
  type: 'Ger typen på ett värde, t.ex. `str` eller `int`. Bra när du felsöker.',
  enumerate:
    'Ger både platsnumret och värdet i en loop: `for i, sak in enumerate(lista)`.',
  zip: 'Går igenom två listor samtidigt, parvis.',
  isinstance: 'Frågar om ett värde är av en viss typ.',
  ValueError:
    'Felet när ett värde är fel, t.ex. `int("tio")`. Passar också bra i ett eget `raise`.',
  TypeError:
    'Felet när ett värde är av fel typ, t.ex. text där det ska vara ett tal.',
  ZeroDivisionError: 'Felet när man delar med noll.',
  KeyError: 'Felet när en nyckel inte finns i en dictionary.',
  IndexError: 'Felet när en plats inte finns i en lista.',
  Exception:
    'Alla vanliga fel. `except Exception` fångar allt – oftast bättre att fånga just det fel du väntar dig.',
  open: 'Öppnar en fil.',
};

// Metoder: vilken sorts värde de hör till och vad de gör.
const METHODS = {
  list: {
    append: 'Lägger till en sak sist i listan. Ändrar listan.',
    insert: 'Lägger in en sak på en viss plats.',
    pop: 'Tar bort och ger tillbaka en sak (den sista om du inte säger vilken).',
    remove: 'Tar bort första saken med ett visst värde.',
    sort: 'Sorterar listan på plats. Ger `None` – använd `sorted()` om du vill ha en ny lista.',
    reverse: 'Vänder listan baklänges.',
    index: 'Ger platsnumret för ett värde.',
    count: 'Räknar hur många gånger ett värde finns.',
    extend: 'Lägger till alla saker från en annan lista.',
    clear: 'Tömmer listan.',
    copy: 'Ger en kopia av listan.',
  },
  str: {
    upper: 'Ger texten med stora bokstäver.',
    lower: 'Ger texten med små bokstäver. Bra innan du jämför svar.',
    capitalize: 'Ger texten med stor första bokstav.',
    title: 'Ger texten med Stor Bokstav I Varje Ord.',
    strip: 'Tar bort mellanslag i början och slutet.',
    split:
      'Delar upp texten i en lista, t.ex. vid mellanslag eller kommatecken.',
    join: 'Sätter ihop en lista med text, med den här texten emellan: `", ".join(lista)`.',
    replace: 'Byter ut en bit text mot en annan.',
    startswith: 'Börjar texten med …?',
    endswith: 'Slutar texten med …?',
    find: 'Ger platsen där en bit text börjar, eller -1.',
    count: 'Räknar hur många gånger en bit text finns.',
    isdigit: 'Består texten bara av siffror? Bra innan `int()`.',
    format: 'Fyller i `{}` i texten. f-strängar är oftast enklare.',
  },
  DataFrame: {
    head: 'De första raderna, 5 om du inte säger något annat.',
    groupby:
      'Delar upp raderna i grupper, t.ex. `df.groupby("produkt")["antal"].sum()`.',
    sort_values:
      'Sorterar efter en kolumn. `ascending=False` ger störst först.',
    drop_duplicates:
      'Tar bort rader som är dubbletter, och behåller den första.',
    describe:
      'Snabb statistik för alla kolumner med tal: antal, snitt, min och max.',
    to_csv: 'Sparar tabellen som en CSV-fil.',
  },
  dict: {
    get: 'Ger värdet för en nyckel, eller `None` (eller ett reservvärde) om den saknas – utan KeyError.',
    keys: 'Ger alla nycklar.',
    values: 'Ger alla värden.',
    items: 'Ger nyckel och värde parvis: `for nyckel, varde in d.items()`.',
    update: 'Lägger till eller ändrar flera nycklar på en gång.',
    pop: 'Tar bort en nyckel och ger tillbaka värdet.',
    setdefault:
      'Ger värdet, och skapar nyckeln med ett startvärde om den saknas.',
    clear: 'Tömmer dictionaryn.',
    copy: 'Ger en kopia.',
  },
};

// Modulerna som banorna använder, med det man oftast hämtar ur dem. Det
// som inte är en funktion står utan () i hover, t.ex. math.pi.
const MODULES = {
  random: {
    about: 'Slump: tärningar, lottning och blandning.',
    members: {
      randint:
        '`random.randint(1, 6)` ger ett slumpat heltal från 1 till och med 6.',
      choice: 'Väljer en sak ur en lista på måfå.',
      shuffle:
        'Blandar listan på plats och returnerar None. Blanda en kopia om originalet ska vara kvar.',
      sample: '`random.sample(lista, 3)` ger 3 olika saker ur listan.',
      random: 'Ett decimaltal från 0 till 1.',
    },
  },
  math: {
    about: 'Matematik: roten ur, pi och avrundning.',
    members: {
      sqrt: 'Roten ur. Ger alltid ett decimaltal.',
      pi: 'Talet pi, 3.14159…',
      ceil: 'Avrundar uppåt till ett heltal.',
      floor: 'Avrundar nedåt till ett heltal.',
    },
  },
  datetime: {
    about: 'Datum och tider.',
    members: {
      date: '`date(2026, 12, 24)` är ett datum: år, månad, dag.',
      timedelta:
        '`timedelta(days=7)` är en tidsrymd som kan läggas till ett datum.',
    },
  },
  pandas: {
    about:
      'Tabeller med data: läsa CSV och Excel, filtrera, gruppera och summera.',
    members: {
      read_csv: 'Läser en CSV-fil och ger en tabell (DataFrame).',
      read_excel: 'Läser en Excel-fil och ger en tabell (DataFrame).',
      to_datetime: 'Gör om text som "2026-10-31" till riktiga datum.',
      DataFrame: 'Skapar en tabell, t.ex. från en dictionary med listor.',
    },
  },
  streamlit: {
    about:
      'Gör ett Python-program till en webbapp. Hela programmet körs om varje gång användaren ändrar något.',
    members: {
      title: 'En stor rubrik överst på sidan.',
      header: 'En rubrik, mindre än title.',
      subheader: 'En liten rubrik.',
      write:
        'Visar text, tal eller en tabell på sidan – som print, fast på webben.',
      caption: 'Liten grå text, bra för förklaringar.',
      markdown: 'Text med enkel formatering, t.ex. **fetstil**.',
      success: 'En grön ruta med ett meddelande.',
      info: 'En blå ruta med ett meddelande.',
      warning: 'En gul ruta med en varning.',
      error: 'En röd ruta med ett fel.',
      metric:
        '`st.metric("Sålda", 36, "+4")` visar ett tal stort, med en ändring under.',
      text_input: 'En ruta att skriva i. Ger texten som står där.',
      number_input: 'En ruta för tal med + och −. Ger talet.',
      slider:
        '`st.slider("Antal", 1, 10, 3)` är ett reglage från 1 till 10 som börjar på 3.',
      selectbox: 'En rullgardinsmeny. Ger det valda alternativet.',
      radio: 'Runda knappar där man väljer ett alternativ.',
      checkbox: 'En kryssruta. Ger True när den är ikryssad.',
      button: 'En knapp. Ger True bara i körningen direkt efter ett klick.',
      columns: '`kol1, kol2 = st.columns(2)` ger kolumner bredvid varandra.',
      sidebar:
        'Panelen till vänster: `st.sidebar.selectbox(…)` eller `with st.sidebar:`.',
      dataframe: 'Visar en tabell som går att sortera.',
      bar_chart: 'Ett stapeldiagram, t.ex. från en groupby.',
      line_chart: 'Ett linjediagram, bra för saker som ändras över tid.',
      session_state:
        'Minnet som finns kvar när programmet körs om: `st.session_state.antal`.',
      rerun: 'Kör om appen direkt, t.ex. efter att en lista ändrats.',
      stop: 'Stoppar resten av programmet i den här körningen.',
      balloons: 'Ballonger över hela sidan! 🎈',
    },
  },
  string: {
    about: 'Färdiga texter med bokstäver, siffror och tecken.',
    members: {
      ascii_letters: 'Alla bokstäver a–z och A–Z.',
      ascii_lowercase: 'De små bokstäverna a–z.',
      ascii_uppercase: 'De stora bokstäverna A–Z.',
      digits: 'Siffrorna 0123456789.',
      punctuation: 'Specialtecken som !?#%.',
    },
  },
};

const VALUES = [
  'pi',
  'sidebar',
  'session_state',
  'ascii_letters',
  'ascii_lowercase',
  'ascii_uppercase',
  'digits',
  'punctuation',
];

// Kortnamn som alla använder, som pd för pandas.
const ALIASES = { pd: 'pandas', st: 'streamlit' };

const memberTitle = (owner, name) =>
  `${owner}.${name}${VALUES.includes(name) ? '' : '()'}`;

// Modulen som ett namn hämtas ur med from, t.ex. date ur datetime.
const moduleOf = name =>
  Object.keys(MODULES).find(module => MODULES[module].members[name]);

const KIND_LABELS = {
  list: 'en lista',
  str: 'text (str)',
  dict: 'en dictionary',
  int: 'ett heltal',
  float: 'ett decimaltal',
  bool: 'sant/falskt',
  DataFrame: 'en tabell (DataFrame)',
};

const OWNER_LABELS = {
  list: 'listor',
  str: 'text',
  dict: 'dictionaries',
  DataFrame: 'tabeller',
};

const text = (src, node) => src.slice(node.from, node.to);
const lineOf = (src, pos) => src.slice(0, pos).split('\n').length;
const code = value => `\`${value}\``;

function children(node) {
  const list = [];
  for (let child = node.firstChild; child; child = child.nextSibling) {
    list.push(child);
  }
  return list;
}

// Vilken sorts värde ett uttryck ger, om det syns direkt.
function kindOfValue(node, src) {
  if (!node) return null;
  switch (node.name) {
    case 'ArrayExpression':
    case 'ArrayComprehensionExpression':
      return 'list';
    case 'DictionaryExpression':
    case 'DictionaryComprehensionExpression':
      return 'dict';
    case 'String':
    case 'FormatString':
      return 'str';
    case 'Number':
      return /[.eE]/.test(text(src, node)) ? 'float' : 'int';
    case 'Boolean':
      return 'bool';
    case 'CallExpression': {
      const name = text(src, node.firstChild);
      if (
        ['input', 'str'].includes(name) ||
        /\.(upper|lower|strip|replace|join)$/.test(name)
      ) {
        return 'str';
      }
      if (['int', 'len', 'sum'].includes(name)) return 'int';
      if (['list', 'sorted'].includes(name) || /\.split$/.test(name))
        return 'list';
      if (name === 'dict') return 'dict';
      if (/^pd\.(read_csv|read_excel|DataFrame)$/.test(name)) {
        return 'DataFrame';
      }
      if (name === 'float') return 'float';
      return null;
    }
    default:
      return null;
  }
}

function enclosingFunction(node) {
  for (let parent = node.parent; parent; parent = parent.parent) {
    if (parent.name === 'FunctionDefinition') return parent;
  }
  return null;
}

// Klassen som en funktion står direkt i, alltså om den är en metod.
function classOf(src, definition) {
  const owner = definition?.parent?.parent;
  return definition?.parent?.name === 'Body' &&
    owner?.name === 'ClassDefinition'
    ? functionName(src, owner)
    : null;
}

function functionName(src, definition) {
  const name = children(definition).find(
    child => child.name === 'VariableName',
  );
  return name ? text(src, name) : '?';
}

// Alla ställen där ett namn får ett värde, i ordning.
function findDefinitions(tree, src, name) {
  const found = [];
  tree.iterate({
    enter(ref) {
      const node = ref.node;
      const kids = () => children(node);
      const named = child =>
        child?.name === 'VariableName' && text(src, child) === name;
      if (node.name === 'AssignStatement' || node.name === 'UpdateStatement') {
        const list = kids();
        const op = list.findIndex(
          child => child.name === 'AssignOp' || child.name === 'UpdateOp',
        );
        list
          .slice(0, op)
          .filter(named)
          .forEach(target => {
            found.push({
              kind: node.name === 'UpdateStatement' ? 'update' : 'assign',
              node: target,
              value: list[op + 1],
            });
          });
      } else if (node.name === 'ForStatement') {
        const list = kids();
        const inIndex = list.findIndex(child => child.name === 'in');
        list
          .slice(1, inIndex)
          .filter(named)
          .forEach(target => {
            found.push({ kind: 'loop', node: target, statement: node });
          });
      } else if (node.name === 'FunctionDefinition') {
        const nameNode = kids().find(child => child.name === 'VariableName');
        if (named(nameNode)) found.push({ kind: 'function', node: nameNode });
      } else if (node.name === 'ClassDefinition') {
        const nameNode = kids().find(child => child.name === 'VariableName');
        if (named(nameNode)) found.push({ kind: 'class', node: nameNode });
      } else if (
        node.name === 'ParamList' &&
        node.parent?.name === 'FunctionDefinition'
      ) {
        kids()
          .filter(named)
          .forEach(target => {
            found.push({ kind: 'param', node: target, fn: node.parent });
          });
      } else if (node.name === 'ImportStatement') {
        kids()
          .filter(named)
          .forEach(target => found.push({ kind: 'import', node: target }));
      }
    },
  });
  return found;
}

// Definitionerna som gäller där namnet används: inne i en funktion de
// som hör till funktionen, annars de utanför alla funktioner.
function visibleDefinitions(definitions, usage) {
  const fn = enclosingFunction(usage);
  const local = definitions.filter(definition => {
    const owner =
      definition.kind === 'param'
        ? definition.fn
        : enclosingFunction(definition.node);
    return fn && owner && owner.from === fn.from;
  });
  if (local.length > 0) return { list: local, fn };
  return {
    list: definitions.filter(
      definition =>
        definition.kind !== 'param' &&
        (definition.kind === 'function' || !enclosingFunction(definition.node)),
    ),
    fn: null,
  };
}

// Vad en variabel innehåller, enligt första tilldelningen som syns.
export function kindOfVariable(tree, src, nameNode) {
  const name = text(src, nameNode);
  const { list } = visibleDefinitions(
    findDefinitions(tree, src, name),
    nameNode,
  );
  for (const definition of list) {
    if (definition.kind === 'assign') {
      const kind = kindOfValue(definition.value, src);
      if (kind) return kind;
    }
  }
  return null;
}

function describeVariable(tree, src, node) {
  const name = text(src, node);
  const definitions = findDefinitions(tree, src, name);
  const { list, fn } = visibleDefinitions(definitions, node);
  const first = list[0];

  if (!first) {
    if (BUILTINS[name]) {
      // Felen är klasser, inte funktioner, och skrivs oftast utan ().
      const isError = /Error$|^Exception$/.test(name);
      return {
        title: isError ? name : `${name}()`,
        body: `${isError ? 'Ett inbyggt fel' : 'Inbyggd funktion'} i Python. ${BUILTINS[name]}`,
      };
    }
    return {
      title: name,
      body: `${code(name)} skapas inte någonstans i koden. Är det felstavat, eller ska det vara text inom citattecken?`,
    };
  }

  const line = lineOf(src, first.node.from);
  const isHere = first.node.from === node.from;
  const where = isHere ? 'Skapas här' : `Skapas på rad ${line}`;
  const inFunction = fn ? ` i funktionen ${code(functionName(src, fn))}` : '';

  switch (first.kind) {
    case 'param':
      if (name === 'self' && classOf(src, first.fn)) {
        return {
          title: 'self',
          body: `Objektet som metoden körs på. Python skickar in det själv, så \`fido.skall()\` ger metoden fido som self.`,
        };
      }
      return {
        title: name,
        body: `Parameter till funktionen ${code(functionName(src, first.fn))}. Får sitt värde när funktionen anropas, och finns bara inuti funktionen.`,
      };
    case 'loop':
      return {
        title: name,
        body: `Loopvariabel${inFunction} i for-loopen på rad ${lineOf(src, first.statement.from)}. Får ett nytt värde varje varv.`,
      };
    case 'function': {
      const owner = classOf(src, first.node.parent);
      if (owner) {
        return {
          title: `${name}()`,
          body: `Metod i klassen ${code(owner)}, på rad ${line}. Kör den på ett objekt: ${code(`objekt.${name}(…)`)}.`,
        };
      }
      return {
        title: `${name}()`,
        body: `${isHere ? 'Funktionen skapas här' : `Funktion som skapas på rad ${line}`}. Kör den med ${code(`${name}(…)`)}.`,
      };
    }
    case 'class':
      return { title: name, body: `Klass som skapas på rad ${line}.` };
    case 'import': {
      if (ALIASES[name]) {
        return {
          title: name,
          body: `Kortnamn för modulen ${code(ALIASES[name])}, som hämtas på rad ${line}. ${MODULES[ALIASES[name]].about}`,
        };
      }
      if (MODULES[name]) {
        return {
          title: name,
          body: `Modul som hämtas med import på rad ${line}. ${MODULES[name].about}`,
        };
      }
      const owner = moduleOf(name);
      if (owner) {
        return {
          title: memberTitle(owner, name),
          body: `Hämtas ur modulen ${code(owner)} på rad ${line}. ${MODULES[owner].members[name]}`,
        };
      }
      return {
        title: name,
        body: `Modul som hämtas med import på rad ${line}.`,
      };
    }
    default: {
      const kind = kindOfVariable(tree, src, node);
      const holds = kind ? ` Innehåller ${KIND_LABELS[kind]}.` : '';
      const changes = list.length > 1 ? ' Får nya värden längre ner.' : '';
      return {
        title: name,
        body: `Variabel${inFunction}. ${where}.${holds}${changes}`,
      };
    }
  }
}

// Modulen som en variabel är, om den hämtas med import, t.ex. random.
function importedModule(tree, src, node) {
  if (node?.name !== 'VariableName') return null;
  const name = text(src, node);
  const module = ALIASES[name] ?? name;
  if (!MODULES[module]) return null;
  const isImported = findDefinitions(tree, src, name).some(
    definition => definition.kind === 'import',
  );
  return isImported ? module : null;
}

function describeProperty(tree, src, node) {
  const name = text(src, node);
  const receiver = node.parent?.firstChild;
  const module = importedModule(tree, src, receiver);
  if (module && MODULES[module].members[name]) {
    return {
      title: memberTitle(module, name),
      body: `Hör till modulen ${code(module)}. ${MODULES[module].members[name]}`,
    };
  }
  const kind =
    receiver?.name === 'VariableName'
      ? kindOfVariable(tree, src, receiver)
      : null;
  if (kind && METHODS[kind]?.[name]) {
    return {
      title: `.${name}()`,
      body: `Metod som hör till ${OWNER_LABELS[kind]}. ${METHODS[kind][name]}`,
    };
  }
  if (receiver && text(src, receiver) === 'self') {
    const isCall = node.parent?.parent?.name === 'CallExpression';
    return isCall
      ? {
          title: `self.${name}()`,
          body: 'En annan metod i samma klass, körd på samma objekt.',
        }
      : {
          title: `self.${name}`,
          body: 'Ett attribut – ett värde som hör till objektet. Varje objekt har sitt eget.',
        };
  }
  const owners = Object.keys(METHODS).filter(owner => METHODS[owner][name]);
  if (owners.length === 0) {
    return {
      title: `.${name}`,
      body: `Något som hör till ${code(text(src, receiver))}.`,
    };
  }
  return {
    title: `.${name}()`,
    body: owners
      .map(owner => `Metod för ${OWNER_LABELS[owner]}: ${METHODS[owner][name]}`)
      .join(' '),
  };
}

// Text inom [ ] efter en dictionary är en nyckel.
function describeKey(tree, src, node) {
  const parent = node.parent;
  if (parent?.name !== 'MemberExpression') return null;
  const receiver = parent.firstChild;
  if (receiver?.name !== 'VariableName') return null;
  if (kindOfVariable(tree, src, receiver) !== 'dict') return null;
  return {
    title: text(src, node),
    body: `Nyckel i dictionaryn ${code(text(src, receiver))}. Ger värdet som hör till nyckeln – finns den inte blir det KeyError.`,
  };
}

// node: ett ställe i trädet. Ger { from, to, title, body } eller null.
export function describeAt(tree, src, pos, side = 1) {
  let node = tree.resolveInner(pos, side);
  // Inuti en text eller ett nyckelord i ett operatornamn, t.ex. ** i ArithOp.
  if (node.parent?.name === 'ArithOp') node = node.parent;
  let info = null;

  if (node.name === 'VariableName') {
    info = describeVariable(tree, src, node);
  } else if (node.name === 'PropertyName') {
    info = describeProperty(tree, src, node);
  } else if (node.name === 'String') {
    info = describeKey(tree, src, node) ?? {
      title: 'Text',
      body: KEYWORDS.String,
    };
  } else if (
    ['FormatString', 'Number', 'Boolean', 'None', 'Comment'].includes(node.name)
  ) {
    info = {
      title: text(src, node).split('\n')[0].slice(0, 30),
      body: KEYWORDS[node.name],
    };
  } else if (
    ['AssignOp', 'UpdateOp', 'CompareOp', 'ArithOp'].includes(node.name)
  ) {
    const op = text(src, node);
    if (OPERATORS[op]) info = { title: op, body: OPERATORS[op] };
  } else if (KEYWORDS[node.name] && text(src, node) === node.name) {
    info = { title: node.name, body: KEYWORDS[node.name] };
  }

  return info && { from: node.from, to: node.to, ...info };
}

// Förslag efter en punkt, när det syns vad variabeln innehåller.
export function memberOptionsFor(tree, src, receiver) {
  if (receiver?.name !== 'VariableName') return null;
  const module = importedModule(tree, src, receiver);
  if (module) {
    return Object.entries(MODULES[module].members).map(([name, info]) => ({
      label: name,
      type: VALUES.includes(name) ? 'constant' : 'function',
      detail: `modulen ${module}`,
      info: info.replaceAll('`', ''),
    }));
  }
  const kind = kindOfVariable(tree, src, receiver);
  if (!METHODS[kind]) return null;
  return Object.entries(METHODS[kind]).map(([name, info]) => ({
    label: name,
    type: 'method',
    detail: OWNER_LABELS[kind],
    info: info.replaceAll('`', ''),
  }));
}
