-- Eleven kan radera sitt konto själv (GDPR). Allt som hör till kontot
-- (course_progress, diplomas och akademiernas gamla tabeller) har
-- "on delete cascade" och försvinner med det.
--
-- Klienten når bara sina egna rader och kan inte radera i auth.users.
-- Därför körs funktionen som ägaren (security definer), och den raderar
-- bara den som anropar.
create or replace function public.delete_my_account()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null then
    raise exception 'Inte inloggad';
  end if;
  delete from auth.users where id = auth.uid();
end;
$$;

revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;
