// Tar emot Stripes händelser. När ett köp är betalt får köparen full
// tillgång med grant_purchase (bara service_role får anropa den). Samma
// köp två gånger ger ändå bara en rad.
//
// Hemligheter: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET. Deployas med
// --no-verify-jwt, eftersom det är Stripe och inte en elev som anropar.
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.4';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);
const crypto = Stripe.createSubtleCryptoProvider();

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

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.payment_status === 'paid' && session.client_reference_id) {
      const admin = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      );
      const { error } = await admin.rpc('grant_purchase', {
        p_user: session.client_reference_id,
        p_session: session.id,
      });
      // Ett fel ger 500, och då försöker Stripe igen senare.
      if (error) return new Response(error.message, { status: 500 });
    }
  }
  return new Response('ok');
});
