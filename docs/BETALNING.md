# Betalning med Stripe

Full tillgång är ett engångsköp för allt, för alltid. Köpet ger en rad i
`entitlements` (`course_id` '*', `source` 'stripe'), precis som en
tillgångskod. Bygg och testa i Stripes **testläge** tills företaget
(enskild firma med F-skatt) finns.

## Delarna

- `supabase/functions/create-checkout` – skapar Stripe Checkout för den
  inloggade (`client_reference_id` är kontots id) och svarar med adressen
  till betalsidan. Köparen måste godkänna villkoren och att ångerrätten
  upphör när tillgången börjar.
- `supabase/functions/stripe-webhook` – när `checkout.session.completed`
  (eller `checkout.session.async_payment_succeeded`) är betald anropas
  `grant_purchase`. Full återbetalning (`charge.refunded`) och en tvist
  (`charge.dispute.created`) stänger tillgången med `revoke_purchase`; en
  vunnen tvist (`charge.dispute.closed`) öppnar den igen med
  `restore_purchase`. Bara service_role får anropa dem.
- Migrationerna `20261113010000_purchase.sql` (`grant_purchase`, och att
  samma köp bara ger en rad) och `20261114010000_refund.sql`.
- I appen: köpknappen på `/konto#tillgang` och i rutan på betalbanorna.
  Den syns bara när `VITE_PRICE_TEXT` finns, t.ex. `990 kr`.

## Sätta upp (testläge)

1. Skapa ett konto på https://stripe.com. Låt **Test mode** vara på.
2. **Product catalog → Add product:** "Kodskolan – full tillgång", ett
   engångspris (One-off), t.ex. 990 SEK. Kopiera prisets id (`price_…`).
3. **Settings → Public details:** länka villkoren,
   `https://kodskolan.nu/villkor`.
4. Kör båda migrationerna i Supabase (feedback och purchase).
5. Installera Supabase CLI och logga in (`npx supabase login`, sedan
   `npx supabase link --project-ref <projektets ref>`).
6. Hemligheterna (aldrig i git):
   ```
   npx supabase secrets set STRIPE_SECRET_KEY=sk_test_… STRIPE_PRICE_ID=price_… SITE_URL=https://kodskolan.nu/
   ```
7. Deploya:
   ```
   npx supabase functions deploy create-checkout
   npx supabase functions deploy stripe-webhook --no-verify-jwt
   ```
8. **Stripe → Developers → Webhooks → Add endpoint:**
   `https://<projektets ref>.supabase.co/functions/v1/stripe-webhook`,
   händelserna `checkout.session.completed`,
   `checkout.session.async_payment_succeeded`, `charge.refunded`,
   `charge.dispute.created` och `charge.dispute.closed`. Kopiera signeringshemligheten
   (`whsec_…`) och kör
   `npx supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_…`.
9. Lokalt: `VITE_PRICE_TEXT=990 kr` i `.env.local`. Köp med testkortet
   `4242 4242 4242 4242`, valfritt datum framåt och valfri CVC.
   `/konto` ska visa "Alla kurser, för alltid". Återbetala sedan köpet i
   Stripe (Payments → köpet → Refund): tillgången ska försvinna från
   `/konto` inom någon sekund.

## Live

Byt till riktiga nycklar (`sk_live_…`, ett live-pris och en ny webhook)
när företaget finns. Sätt `VITE_PRICE_TEXT` och `VITE_PAYWALL=on` som
variabler i GitHub. Lägg till firmans namn, organisationsnummer och
adress i `src/app/legal.js` (`OWNER`).
