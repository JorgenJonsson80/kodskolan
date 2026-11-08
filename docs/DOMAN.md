# Egen domän

Sajten ligger nu på `https://jorgenjonsson80.github.io/kodskolan/`. Så här
flyttar du den till en egen domän, till exempel `kodskolan.nu`. Allt i
koden styrs av två inställningar, så inget behöver skrivas om.

## 1. Köp domänen

Hos valfri registrar (t.ex. Loopia, One.com, Websupport eller Cloudflare).
Ta gärna fler stavningar och låt dem skicka vidare till huvuddomänen.

## 2. DNS hos registraren

För `kodskolan.nu` (utan www) läggs fyra A-poster till GitHub Pages:

| Typ   | Namn | Värde             |
| ----- | ---- | ----------------- |
| A     | @    | 185.199.108.153   |
| A     | @    | 185.199.109.153   |
| A     | @    | 185.199.110.153   |
| A     | @    | 185.199.111.153   |
| CNAME | www  | jorgenjonsson80.github.io |

Det kan ta upp till ett dygn innan DNS slagit igenom.

## 3. GitHub

1. Repot → Settings → Pages → Custom domain: `kodskolan.nu` → Save.
2. Bocka i **Enforce HTTPS** när GitHub har ordnat certifikatet.
3. Settings → Secrets and variables → Actions → Variables:
   - `VITE_SITE_URL` = `https://kodskolan.nu` (utan snedstreck sist)
   - `VITE_BASE` = `/`
4. Kör om bygget (Actions → Publicera på GitHub Pages → Run workflow).

`VITE_BASE` är sökvägen appen ligger under (`/kodskolan/` nu, `/` på en
egen domän). `VITE_SITE_URL` används i sitemap.xml, robots.txt, canonical
och delningsbilden (`scripts/prerender.mjs`).

Gamla länkar till `jorgenjonsson80.github.io/kodskolan/…` skickas vidare
till den nya domänen av GitHub.

## 4. Supabase

Authentication → URL Configuration:

- **Site URL**: `https://kodskolan.nu`
- **Redirect URLs**: lägg till `https://kodskolan.nu/**`. Låt den gamla
  adressen stå kvar ett tag.

Annars hamnar inloggningslänken i mejlet på fel sajt.

## 5. Google

1. Lägg till domänen i [Google Search Console](https://search.google.com/search-console)
   (Domän-egenskap, verifieras med en TXT-post i DNS).
2. Skicka in `https://kodskolan.nu/sitemap.xml` under Sitemaps.

robots.txt fungerar först med en egen domän: Google läser den bara i
domänens rot, inte under `/kodskolan/`.

## 6. Mejl

När domänen finns kan inloggningsmejlen skickas från den, se
[MEJL.md](MEJL.md) (Resend).
