-- Återbetalning och tvist. Stripes webhook stänger köpets tillgång med
-- revoke_purchase (valid_until blir nu), men raden finns kvar så att det
-- syns vad som hänt. En tvist som säljaren vinner öppnar den igen med
-- restore_purchase. Bara service_role får anropa dem.

create or replace function public.revoke_purchase(p_session text)
returns void
language sql
security definer
set search_path = public
as $$
  update public.entitlements
  set valid_until = now()
  where source = 'stripe'
    and ref = p_session
    and (valid_until is null or valid_until > now());
$$;

create or replace function public.restore_purchase(p_session text)
returns void
language sql
security definer
set search_path = public
as $$
  update public.entitlements
  set valid_until = null
  where source = 'stripe' and ref = p_session;
$$;

revoke all on function public.revoke_purchase(text) from public, anon, authenticated;
revoke all on function public.restore_purchase(text) from public, anon, authenticated;
