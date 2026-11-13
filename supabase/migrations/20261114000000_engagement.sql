-- Streak, publik profil och lärarvyn.
--
-- 1. daily_activity: hur många övningar en elev klarat per dag, för
--    streaken och dagens mål. Dagen kommer från elevens webbläsare (den
--    lokala dagen), men får bara vara i går, i dag eller i morgon.
-- 2. profiles: en publik profilsida (/profil/<slug>) med namnet och
--    diplomen, bara om eleven själv skapat den.
-- 3. classes och class_members: en lärare skapar en klass och delar en
--    kod. Eleverna går med, och läraren kan då läsa vilka övningar de
--    klarat (class_progress) och när de varit aktiva – men inte deras kod,
--    och ingen annans.

-- 1. Streaken

create table if not exists public.daily_activity (
  user_id uuid not null references auth.users (id) on delete cascade,
  day date not null,
  exercises integer not null default 0,
  primary key (user_id, day)
);
alter table public.daily_activity enable row level security;

drop policy if exists "Läsa sin egen aktivitet" on public.daily_activity;
create policy "Läsa sin egen aktivitet"
  on public.daily_activity for select
  to authenticated
  using ((select auth.uid()) = user_id);

create or replace function public.log_activity(p_day date)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  total integer;
begin
  if uid is null then
    raise exception 'Logga in först';
  end if;
  if p_day < current_date - 1 or p_day > current_date + 1 then
    raise exception 'Fel dag';
  end if;
  insert into public.daily_activity (user_id, day, exercises)
    values (uid, p_day, 1)
  on conflict (user_id, day)
    do update set exercises = daily_activity.exercises + 1
  returning exercises into total;
  return total;
end;
$$;

-- 2. Profilen

create table if not exists public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  slug text not null unique check (slug ~ '^[a-z0-9-]{3,30}$'),
  display_name text not null check (char_length(btrim(display_name)) between 1 and 60),
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

drop policy if exists "Sin egen profil" on public.profiles;
create policy "Sin egen profil"
  on public.profiles for all
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- Det som syns på /profil/<slug>: namnet och diplomen. Inget annat.
create or replace function public.public_profile(p_slug text)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'name', p.display_name,
    'since', p.created_at,
    'diplomas', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', d.id, 'kind', d.kind, 'subject', d.subject,
        'details', d.details, 'issued_at', d.issued_at
      ) order by d.issued_at)
      from public.diplomas d where d.user_id = p.user_id
    ), '[]'::jsonb)
  )
  from public.profiles p
  where p.slug = lower(btrim(p_slug));
$$;

-- 3. Klasser

create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null check (char_length(btrim(name)) between 1 and 60),
  join_code text not null unique
    default upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6)),
  created_at timestamptz not null default now()
);
alter table public.classes enable row level security;

drop policy if exists "Lärarens egna klasser" on public.classes;
create policy "Lärarens egna klasser"
  on public.classes for all
  to authenticated
  using ((select auth.uid()) = teacher_id)
  with check ((select auth.uid()) = teacher_id);

create table if not exists public.class_members (
  class_id uuid not null references public.classes (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  display_name text not null check (char_length(btrim(display_name)) between 1 and 60),
  joined_at timestamptz not null default now(),
  primary key (class_id, user_id)
);
alter table public.class_members enable row level security;

-- Är den inloggade lärare för eleven? Används av reglerna nedan.
create or replace function public.teaches(p_student uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.class_members m
    join public.classes c on c.id = m.class_id
    where m.user_id = p_student and c.teacher_id = auth.uid()
  );
$$;

drop policy if exists "Eleven ser sina klasser" on public.class_members;
create policy "Eleven ser sina klasser"
  on public.class_members for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Läraren ser sina elever" on public.class_members;
create policy "Läraren ser sina elever"
  on public.class_members for select
  to authenticated
  using (exists (
    select 1 from public.classes c
    where c.id = class_id and c.teacher_id = (select auth.uid())
  ));

drop policy if exists "Lämna eller ta bort ur klassen" on public.class_members;
create policy "Lämna eller ta bort ur klassen"
  on public.class_members for delete
  to authenticated
  using (
    (select auth.uid()) = user_id
    or exists (
      select 1 from public.classes c
      where c.id = class_id and c.teacher_id = (select auth.uid())
    )
  );

-- Framstegen läses med en funktion och inte en regel på course_progress:
-- raden har också elevens kod (drafts), och den ska läraren inte se.
create or replace function public.class_progress(p_class uuid)
returns table (user_id uuid, course_id text, completed_ids text[], updated_at timestamptz)
language sql
stable
security definer
set search_path = public
as $$
  select p.user_id, p.course_id, p.completed_ids, p.updated_at
  from public.course_progress p
  join public.class_members m on m.user_id = p.user_id
  join public.classes c on c.id = m.class_id
  where c.id = p_class and c.teacher_id = auth.uid();
$$;

drop policy if exists "Läraren läser elevernas aktivitet" on public.daily_activity;
create policy "Läraren läser elevernas aktivitet"
  on public.daily_activity for select
  to authenticated
  using (public.teaches(user_id));

-- Klassens namn för sidan /klass/<kod>, innan man gått med.
create or replace function public.class_by_code(p_code text)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select name from public.classes where join_code = upper(btrim(p_code));
$$;

-- Gå med i en klass med koden. Namnet är det läraren ser.
create or replace function public.join_class(p_code text, p_name text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  found public.classes;
begin
  if uid is null then
    raise exception 'Logga in först';
  end if;
  select * into found from public.classes where join_code = upper(btrim(p_code));
  if not found.id is not null then
    raise exception 'Det finns ingen klass med den koden';
  end if;
  insert into public.class_members (class_id, user_id, display_name)
    values (found.id, uid, btrim(p_name))
  on conflict (class_id, user_id) do update set display_name = excluded.display_name;
  return found.name;
end;
$$;

-- Klasserna eleven gått med i, med namnen (classes kan bara läraren läsa).
create or replace function public.my_classes()
returns table (class_id uuid, name text, display_name text, joined_at timestamptz)
language sql
stable
security definer
set search_path = public
as $$
  select m.class_id, c.name, m.display_name, m.joined_at
  from public.class_members m
  join public.classes c on c.id = m.class_id
  where m.user_id = auth.uid()
  order by m.joined_at;
$$;

revoke all on function public.my_classes() from public, anon;
grant execute on function public.my_classes() to authenticated;
revoke all on function public.log_activity(date) from public, anon;
grant execute on function public.log_activity(date) to authenticated;
revoke all on function public.public_profile(text) from public;
grant execute on function public.public_profile(text) to anon, authenticated;
revoke all on function public.teaches(uuid) from public, anon;
grant execute on function public.teaches(uuid) to authenticated;
revoke all on function public.class_progress(uuid) from public, anon;
grant execute on function public.class_progress(uuid) to authenticated;
revoke all on function public.class_by_code(text) from public;
grant execute on function public.class_by_code(text) to anon, authenticated;
revoke all on function public.join_class(text, text) from public, anon;
grant execute on function public.join_class(text, text) to authenticated;

-- Läraren tar bort klasser och elever, eleven lämnar (RLS ovan bestämmer vem).
grant delete on public.classes, public.class_members, public.profiles to authenticated;
