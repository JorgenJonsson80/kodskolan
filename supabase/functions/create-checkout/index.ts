// Skapar ett Stripe Checkout-köp av full tillgång för den inloggade och
// svarar med adressen till Stripes betalsida. Webhooken (stripe-webhook)
// ger tillgången när betalningen är klar.
//
// Hemligheter (supabase secrets set): STRIPE_SECRET_KEY, STRIPE_PRICE_ID,
// SITE_URL (t.ex. https://kodskolan.nu/). Se docs/BETALNING.md.
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.4';
import { cors } from '../_shared/cors.ts';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);

Deno.serve(async request => {
  if (request.method === 'OPTIONS')
    return new Response('ok', { headers: cors });

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    {
      global: {
        headers: { Authorization: request.headers.get('Authorization') ?? '' },
      },
    },
  );
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    return Response.json(
      { error: 'Logga in först' },
      { status: 401, headers: cors },
    );
  }

  const site = Deno.env.get('SITE_URL')!;
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: Deno.env.get('STRIPE_PRICE_ID')!, quantity: 1 }],
    client_reference_id: data.user.id,
    customer_email: data.user.email,
    locale: 'sv',
    // Ångerrätten: köparen godkänner villkoren, där det står att den
    // upphör när tillgången börjar (digitalt innehåll).
    consent_collection: { terms_of_service: 'required' },
    custom_text: {
      terms_of_service_acceptance: {
        message: `Jag godkänner [villkoren](${site}villkor) och att tillgången börjar direkt, så att ångerrätten upphör.`,
      },
    },
    success_url: `${site}konto?kopt=1#tillgang`,
    cancel_url: `${site}konto#tillgang`,
  });
  return Response.json({ url: session.url }, { headers: cors });
});
