# Koda med AI

Kursens SPEC finns i `docs/kurser/kodamedai.md`. Sökvägarna nedan utgår
från `src/courses/kodamedai/`.

`index.jsx` är kursen enligt kontraktet i `SPEC.md`. Den använder
Python-kursens körning helt, som Dataanalys. Ingen riktig AI anropas:
övningarna innehåller svar från en låtsasassistent (skrivna av oss, med
de fel riktiga assistenter gör), som eleven granskar, testar och lagar.

- Beställningar (bana 2) rättas med tester som kollar att texten har
  rätt delar (`"exempel" in bestallning.lower()`), inte att den är
  perfekt. Förklaringarna säger det till eleven.
- Testövningarna (bana 4) kör elevens testfunktion mot en trasig och en
  lagad version med `__raises`: den ska ge `AssertionError` för den
  trasiga och inget fel för den lagade.
