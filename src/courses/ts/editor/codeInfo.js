// Det TypeScript lägger till ovanpå JavaScript, förklarat för hovern.
// Typerna själva ("const pris: number") kommer från kompilatorn.
export const TS_WORDS = {
  type: 'Ger en typ ett namn, t.ex. `type Pris = number`. Finns bara när koden kontrolleras.',
  interface:
    'Beskriver hur ett objekt ser ut: vilka egenskaper det har och vilka typer de har.',
  extends:
    'Bygger vidare på en annan typ. I generics betyder det ett krav: `T extends { id: number }`.',
  implements: 'Lovar att klassen har allt som typen kräver.',
  readonly: 'Går bara att läsa, inte ändra.',
  keyof: 'Ger namnen på egenskaperna i en typ, som en union: `keyof Kund`.',
  typeof:
    'I en typ: ta typen från ett värde, t.ex. `typeof kund`. I kod: ger typen som text.',
  as: 'Säger åt TypeScript vilken typ något har. TypeScript litar på dig, så använd det sparsamt.',
  satisfies:
    'Kollar att värdet passar typen, men behåller den exakta typen TypeScript räknade ut.',
  enum: "En fast samling namngivna värden. Ofta räcker en union som `'liten' | 'stor'`.",
  any: 'Vilken typ som helst – TypeScript slutar kontrollera. Undvik det.',
  unknown:
    'Något vi inte vet typen på än. Måste kollas, t.ex. med `typeof`, innan det används.',
  never:
    'En typ som aldrig kan ha något värde. Fångar fall man glömt i en `switch`.',
  void: 'Funktionen returnerar inget värde.',
  string: 'Text.',
  number: 'Ett tal, heltal eller decimaltal.',
  boolean: '`true` eller `false`.',
  null: 'Inget värde, satt med flit.',
  undefined: 'Inget värde än.',
  private: 'Går bara att använda inne i klassen.',
  public: 'Går att använda överallt (det gäller om inget annat står).',
  is: 'En typkontroll: `x is Kund` lovar att x är en Kund när funktionen svarar `true`.',
  infer: 'Låter TypeScript räkna ut en del av en typ.',
};

// Vad kompilatorn säger att något är, på svenska.
export const KINDS = {
  const: 'En variabel som inte kan tilldelas om.',
  let: 'En variabel som kan få ett nytt värde.',
  var: 'En variabel (det gamla sättet, använd `const` eller `let`).',
  function: 'En funktion.',
  'local function': 'En funktion.',
  method: 'En metod – en funktion som tillhör värdet före punkten.',
  property: 'En egenskap i ett objekt.',
  parameter: 'En parameter – värdet funktionen får när den anropas.',
  type: 'En typ.',
  interface: 'En typ som beskriver ett objekt.',
  class: 'En klass.',
  enum: 'En enum.',
  'type parameter':
    'En typparameter – en typ som bestäms när funktionen används.',
  alias: 'Ett namn som är importerat.',
  module: 'En modul.',
};

// Första meningen i dokumentationen, så att hovern inte blir en vägg.
export const firstSentence = text => {
  const match = text.match(/^[^]*?[.!?](\s|$)/);
  return (match ? match[0] : text).trim();
};
