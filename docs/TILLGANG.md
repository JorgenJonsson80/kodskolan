# Tillgång och koder

Så ger du någon tillgång till betalbanorna, till exempel testare. Allt
görs i Supabase (SQL Editor). Appen kan bara läsa och lösa in koder,
aldrig skapa dem.

## En gång: kör migrationen

Kör `supabase/migrations/20261110000000_access.sql` i SQL Editor. Den
går att köra igen utan att något försvinner.

## Gör dig själv till admin

En admin har tillgång till allt.

```sql
insert into admins (user_id)
select id from auth.users where email = 'din@adress.se';
```

## Skapa en kod till testare

```sql
-- 20 personer får tillgång till allt i 30 dagar. Koden går att lösa in
-- till och med 31 december.
insert into access_codes (code, days, max_uses, redeem_by, note)
values ('TESTA-2026', 30, 20, '2027-01-01', 'Testare hösten 2026');
```

- `code` skrivs med stora bokstäver. Eleven får skriva den hur som helst.
- `course_id` är `'*'` (allt) om du inte skriver något, annars kursens id
  (`'python'`, `'sql'` …).
- `days` null betyder att tillgången gäller för alltid.
- `max_uses` och `redeem_by` null betyder att det inte finns något tak.

Skicka länken `https://jorgenjonsson80.github.io/kodskolan/konto?kod=TESTA-2026`.
Den som öppnar den loggar in och trycker på Lös in koden.

## Ge en person tillgång direkt, utan kod

```sql
insert into entitlements (user_id, course_id, valid_until, source, ref)
select id, '*', now() + interval '30 days', 'manual', 'Testare'
from auth.users where email = 'person@adress.se';
```

## Se vilka som löst in en kod

```sql
select r.code, u.email, r.redeemed_at
from code_redemptions r join auth.users u on u.id = r.user_id
order by r.redeemed_at desc;
```

## Stäng en kod eller ta bort någons tillgång

```sql
update access_codes set redeem_by = now() where code = 'TESTA-2026';
update entitlements set valid_until = now() where ref = 'TESTA-2026';
```

## Slå på låsningen

Låsningen är av tills `VITE_PAYWALL` är `on`. Lokalt: lägg till
`VITE_PAYWALL=on` i `.env.local`. På sajten: en variabel `VITE_PAYWALL`
med värdet `on` i GitHub (Settings → Secrets and variables → Actions →
Variables), och sedan en push. Utan den är allt öppet som förut.

Hur många banor som är gratis står i `FREE_TRACKS` i
`src/core/lib/access.js` (2), och en kurs kan ändra det med `freeTracks`
i sin `index.jsx`.
