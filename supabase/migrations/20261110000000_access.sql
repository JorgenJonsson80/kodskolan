-- Tillgång till betalbanorna (etapp 5). En rad i entitlements ger en
-- användare en kurs (course_id) eller alla kurser ('*'), till ett datum
-- eller för alltid (valid_until null). Var den kommer ifrån står i source:
-- en tillgångskod, ett köp (Stripe, senare) eller inlagd för hand.
--
-- Admins har tillgång till allt. Tabellerna admins, access_codes och
-- code_redemptions har RLS utan regler, så de går bara att ändra i
-- Supabase (SQL Editor eller Table Editor), aldrig från appen.

create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);
alter table public.admins enable row level security;

create table if not exists public.entitlements (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id text not null,
  valid_until timestamptz,
  source text not null check (source in ('code', 'stripe', 'manual')),
  ref text,
  created_at timestamptz not null default now()
);
create index if not exists entitlements_user_id on public.entitlements (user_id);
alter table public.entitlements enable row level security;

-- Den inloggade ser sin egen tillgång (till Mitt konto och nedladdningen).
-- Ingen regel för att skriva: raderna skapas av redeem_access_code, av
-- betalningen eller för hand.
drop policy if exists "Läsa sin egen tillgång" on public.entitlements;
create policy "Läsa sin egen tillgång"
  on public.entitlements for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- En kod som TESTA-2026 ger den som skriver in den tillgång i days dagar
-- (null: för alltid). max_uses och redeem_by begränsar hur många och hur
-- länge den kan användas. Koden sparas med stora bokstäver.
create table if not exists public.access_codes (
  code text primary key check (code = upper(btrim(code)) and code <> ''),
  course_id text not null default '*',
  days integer check (days > 0),
  max_uses integer check (max_uses > 0),
  redeem_by timestamptz,
  note text,
  created_at timestamptz not null default now()
);
alter table public.access_codes enable row level security;

create table if not exists public.code_redemptions (
  code text not null references public.access_codes (code) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  redeemed_at timestamptz not null default now(),
  primary key (code, user_id)
);
alter table public.code_redemptions enable row level security;

-- Vad den inloggade har tillgång till just nu. En admin får '*'.
create or replace function public.my_access()
returns table (course_id text, valid_until timestamptz)
language sql
stable
security definer
set search_path = public
as $$
  select '*'::text, null::timestamptz
  from public.admins a
  where a.user_id = auth.uid()
  union all
  select e.course_id, e.valid_until
  from public.entitlements e
  where e.user_id = auth.uid()
    and (e.valid_until is null or e.valid_until > now());
$$;

-- Till RLS på lesson_content senare: har den inloggade kursen?
create or replace function public.has_access(p_course text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.my_access() m
    where m.course_id in ('*', p_course)
  );
$$;

-- Lös in en kod. Felen skrivs så att de kan visas för eleven.
create or replace function public.redeem_access_code(p_code text)
returns table (course_id text, valid_until timestamptz)
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  found_code public.access_codes;
  used integer;
  ends_at timestamptz;
begin
  if uid is null then
    raise exception 'Logga in först';
  end if;
  -- for update: två som löser in samtidigt kan inte båda ta sista platsen.
  select * into found_code from public.access_codes c
    where c.code = upper(btrim(p_code))
    for update;
  if not found then
    raise exception 'Koden finns inte. Kolla stavningen.';
  end if;
  if found_code.redeem_by is not null and found_code.redeem_by < now() then
    raise exception 'Koden har gått ut';
  end if;
  if exists (
    select 1 from public.code_redemptions r
    where r.code = found_code.code and r.user_id = uid
  ) then
    raise exception 'Du har redan använt koden';
  end if;
  select count(*) into used from public.code_redemptions r
    where r.code = found_code.code;
  if found_code.max_uses is not null and used >= found_code.max_uses then
    raise exception 'Koden är redan använd av så många som den räcker till';
  end if;

  ends_at := case
    when found_code.days is null then null
    else now() + make_interval(days => found_code.days)
  end;
  insert into public.code_redemptions (code, user_id)
    values (found_code.code, uid);
  insert into public.entitlements (user_id, course_id, valid_until, source, ref)
    values (uid, found_code.course_id, ends_at, 'code', found_code.code);
  return query select found_code.course_id, ends_at;
end;
$$;

revoke all on function public.my_access() from public, anon;
grant execute on function public.my_access() to authenticated;
revoke all on function public.has_access(text) from public, anon;
grant execute on function public.has_access(text) to authenticated;
revoke all on function public.redeem_access_code(text) from public, anon;
grant execute on function public.redeem_access_code(text) to authenticated;
