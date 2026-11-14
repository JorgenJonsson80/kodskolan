-- Betalbanornas innehåll ligger krypterat i bygget (scripts/content.mjs).
-- Nyckeln för en kurs är HMAC-SHA256(hemligheten, 'kodskolan-content:' +
-- kursens id). Hemligheten är samma som CONTENT_KEY i GitHub och läggs in
-- en gång för hand (docs/TILLGANG.md). content_key ger kursens nyckel, men
-- bara till den som har tillgång.
create extension if not exists pgcrypto with schema extensions;

create table if not exists public.content_secret (
  id integer primary key default 1 check (id = 1),
  secret bytea not null check (length(secret) = 32)
);
-- Inga regler och inga rättigheter: bara content_key läser den.
alter table public.content_secret enable row level security;
revoke all on public.content_secret from public, anon, authenticated;

create or replace function public.content_key(p_course text)
returns text
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  hemlighet bytea;
begin
  if not public.has_access(p_course) then
    raise exception 'Ingen tillgång till kursen';
  end if;
  select secret into hemlighet from public.content_secret where id = 1;
  if hemlighet is null then
    raise exception 'Nyckeln är inte inlagd';
  end if;
  return encode(
    extensions.hmac(convert_to('kodskolan-content:' || p_course, 'UTF8'), hemlighet, 'sha256'),
    'hex'
  );
end;
$$;

revoke all on function public.content_key(text) from public, anon;
grant execute on function public.content_key(text) to authenticated;
