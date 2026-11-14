// Tar emot Stripes händelser (bara service_role får anropa funktionerna):
//
// - checkout.session.completed (betalt direkt) och
//   checkout.session.async_payment_succeeded (betalningsmetoder som tar
//   några dagar): köparen får full tillgång med grant_purchase. Samma köp
//   två gånger ger ändå bara en rad.
// - charge.refunded (hela beloppet tillbaka) och charge.dispute.created
//   (kunden har bestridit köpet): tillgången stängs med revoke_purchase.
// - charge.dispute.closed som säljaren vinner: tillgången öppnas igen.
//
// Återbetalningar och tvister gäller en betalning (payment_intent), så
// köpet (checkout-sessionen, som står i entitlements.ref) slås upp.
//
// Hemligheter: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET. Deployas med
// --no-verify-jwt, eftersom det är Stripe och inte en elev som anropar.
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.4';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);
const crypto = Stripe.createSubtleCryptoProvider();

const admin = () =>
  createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

// Checkout-sessionen som betalningen hörde till, eller null.
async function sessionFor(paymentIntent: string | Stripe.PaymentIntent | null) {
  const id = typeof paymentIntent === 'string' ? paymentIntent : paymentIntent?.id;
  if (!id) return null;
  const sessions = await stripe.checkout.sessions.list({
    payment_intent: id,
    limit: 1,
  });
  return sessions.data[0]?.id ?? null;
}

async function call(fn: string, args: Record<string, string>) {
  const { error } = await admin().rpc(fn, args);
  // Ett fel ger 500, och då försöker Stripe igen senare.
  return error ? new Response(error.message, { status: 500 }) : null;
}

Deno.serve(async request => {
  const signature = request.headers.get('Stripe-Signature') ?? '';
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      await request.text(),
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SECRET')!,
      undefined,
      crypto,
    );
  } catch {
    return new Response('Fel signatur', { status: 400 });
  }

  let failed: Response | null = null;

  if (
    event.type === 'checkout.session.completed' ||
    event.type === 'checkout.session.async_payment_succeeded'
  ) {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.payment_status === 'paid' && session.client_reference_id) {
      failed = await call('grant_purchase', {
        p_user: session.client_reference_id,
        p_session: session.id,
      });
    }
  }

  if (event.type === 'charge.refunded') {
    const charge = event.data.object as Stripe.Charge;
    // Delvis återbetalt (t.ex. ett rabattbelopp) behåller tillgången.
    const session = charge.refunded ? await sessionFor(charge.payment_intent) : null;
    if (session) failed = await call('revoke_purchase', { p_session: session });
  }

  if (event.type === 'charge.dispute.created') {
    const dispute = event.data.object as Stripe.Dispute;
    const session = await sessionFor(dispute.payment_intent);
    if (session) failed = await call('revoke_purchase', { p_session: session });
  }

  if (event.type === 'charge.dispute.closed') {
    const dispute = event.data.object as Stripe.Dispute;
    if (dispute.status === 'won') {
      const session = await sessionFor(dispute.payment_intent);
      if (session) failed = await call('restore_purchase', { p_session: session });
    }
  }

  return failed ?? new Response('ok');
});
