-- AI-delen av Byggstudion (supabase/functions/app-builder): bara för den
-- som har full tillgång, och högst ett antal byggen och ändringar per dag.
-- Funktionen räknar upp och svarar med hur många som är kvar i dag, eller
-- säger varför det inte går.
create table if not exists public.builder_usage (
  user_id uuid not null references auth.users (id) on delete cascade,
  day date not null default current_date,
  requests integer not null default 0,
  primary key (user_id, day)
);
alter table public.builder_usage enable row level security;

create or replace function public.use_builder_request(p_limit integer default 20)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  used integer;
begin
  if uid is null then
    raise exception 'Logga in för att använda AI:n i Byggstudion';
  end if;
  if not public.has_access('*') then
    raise exception 'AI-delen av Byggstudion ingår i full tillgång';
  end if;
  insert into public.builder_usage (user_id, day, requests)
    values (uid, current_date, 1)
  on conflict (user_id, day)
    do update set requests = builder_usage.requests + 1
  returning requests into used;
  if used > p_limit then
    raise exception 'Dagens AI-byggen är slut. Du kan bygga mer i morgon.';
  end if;
  return p_limit - used;
end;
$$;

revoke all on function public.use_builder_request(integer) from public, anon;
grant execute on function public.use_builder_request(integer) to authenticated;
