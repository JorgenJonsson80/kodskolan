# Mejlen: inloggningslänkar som kommer fram

Supabases inbyggda mejl skickar bara ett par mejl i timmen och hamnar
ofta i skräpposten. Före lansering kopplas en riktig mejltjänst in. Inget
i koden behöver ändras – det görs i Supabase.

## 1. Skaffa en mejltjänst (Resend)

1. Skapa ett konto på https://resend.com (gratis upp till 3 000 mejl i
   månaden).
2. **Domains → Add domain**: din domän, t.ex. `kodskolan.se`.
3. Lägg in DNS-posterna Resend visar (SPF, DKIM och gärna DMARC) hos den
   som säljer domänen. Vänta tills Resend säger **Verified**.
4. **API Keys → Create**: rättigheten _Sending access_. Kopiera nyckeln
   (den visas bara en gång).

## 2. Koppla in den i Supabase

**Project Settings → Authentication → SMTP Settings → Enable custom SMTP**

| Fält         | Värde                   |
| ------------ | ----------------------- |
| Sender email | `hej@kodskolan.se`      |
| Sender name  | `Kodskolan`             |
| Host         | `smtp.resend.com`       |
| Port         | `465`                   |
| Username     | `resend`                |
| Password     | API-nyckeln från steg 1 |

Höj sedan **Authentication → Rate Limits → Emails sent per hour** till
t.ex. 100.

## 3. Mejlet på svenska

**Authentication → Email Templates → Magic Link**

Ämne: `Din inloggningslänk till Kodskolan`

```html
<h2>Logga in på Kodskolan</h2>
<p>Klicka på knappen så loggas du in och dina framsteg sparas i ditt konto.</p>
<p><a href="{{ .ConfirmationURL }}">Logga in</a></p>
<p>
  Länken fungerar en gång och i en timme. Bad du inte om den kan du strunta i
  det här mejlet.
</p>
```

Gör samma sak för **Confirm signup** (första inloggningen för en ny
adress).

## 4. Kontaktadressen

Sätt GitHub-variabeln `VITE_SUPPORT_EMAIL` (Settings → Secrets and
variables → Actions → Variables) till adressen elever ska mejla, t.ex.
`hej@kodskolan.se`. Lokalt läggs den i `.env.local`. Utan den visas
inga kontaktlänkar ("🐞 Något fungerar inte?" och "✉️ Kontakt").

## Prova

Logga in med en Gmail- och en Outlook-adress. Mejlet ska komma inom en
minut och inte hamna i skräpposten.
