-- Diplom: ett per användare och kurs (kind 'course', subject = kursens id)
-- eller spår (kind 'path', subject = spårets id). id är koden på diplomet,
-- t.ex. 7F3A2C91E4, som vem som helst kan slå upp för att se att diplomet
-- är äkta. Ingen kan lista alla diplom: läsningen sker bara med koden,
-- via funktionen diploma, och skapandet via issue_diploma.
--
-- Obs: appen kontrollerar att kursen är klar innan diplomet skapas, men
-- databasen kan inte göra det själv förrän innehållet finns i databasen
-- (etapp 5). Diplomet visar att kontot klarade kursen i appen.
create table if not exists public.diplomas (
  id text primary key
    default upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10)),
  user_id uuid not null references auth.users (id) on delete cascade,
  kind text not null check (kind in ('course', 'path')),
  subject text not null,
  name text not null check (char_length(btrim(name)) between 1 and 80),
  details jsonb not null default '{}',
  issued_at timestamptz not null default now(),
  unique (user_id, kind, subject)
);

alter table public.diplomas enable row level security;

-- Den inloggade ser sina egna diplom (till Mina diplom).
drop policy if exists "Läsa sina egna diplom" on public.diplomas;
create policy "Läsa sina egna diplom"
  on public.diplomas for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- Skapa eller byta namn på sitt diplom. Koden och datumet behålls om
-- diplomet redan finns, så att en delad länk fortsätter fungera.
create or replace function public.issue_diploma(
  p_kind text,
  p_subject text,
  p_name text,
  p_details jsonb default '{}'
) returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  code text;
begin
  if uid is null then
    raise exception 'Logga in för att få ett diplom';
  end if;
  insert into public.diplomas (user_id, kind, subject, name, details)
    values (uid, p_kind, p_subject, btrim(p_name), coalesce(p_details, '{}'))
  on conflict (user_id, kind, subject)
    do update set name = excluded.name, details = excluded.details
  returning id into code;
  return code;
end;
$$;

-- Ett diplom med koden, för vem som helst. Bara det som står på diplomet.
create or replace function public.diploma(p_code text)
returns table (
  id text,
  kind text,
  subject text,
  name text,
  details jsonb,
  issued_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select d.id, d.kind, d.subject, d.name, d.details, d.issued_at
  from public.diplomas d
  where d.id = upper(btrim(p_code));
$$;

revoke all on function public.issue_diploma(text, text, text, jsonb) from public;
grant execute on function public.issue_diploma(text, text, text, jsonb) to authenticated;
revoke all on function public.diploma(text) from public;
grant execute on function public.diploma(text) to anon, authenticated;
