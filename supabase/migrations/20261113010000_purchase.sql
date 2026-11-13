-- Köp av full tillgång (engångsköp för allt, för alltid). Stripes webhook
-- (supabase/functions/stripe-webhook) anropar grant_purchase med
-- service_role-nyckeln när betalningen är klar. Ingen annan kan anropa den.
-- Samma köp ger bara en rad, även om Stripe skickar händelsen två gånger.
create unique index if not exists entitlements_ref_unique
  on public.entitlements (ref) where source = 'stripe';

create or replace function public.grant_purchase(p_user uuid, p_session text)
returns void
language sql
security definer
set search_path = public
as $$
  insert into public.entitlements (user_id, course_id, valid_until, source, ref)
  values (p_user, '*', null, 'stripe', p_session)
  on conflict (ref) where source = 'stripe' do nothing;
$$;

revoke all on function public.grant_purchase(uuid, text) from public, anon, authenticated;
