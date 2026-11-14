-- Diplom kräver en klar kurs. issue_diploma kollar att kontots sparade
-- framsteg (course_progress) har alla bossar i kursen – eller, för ett
-- spår, i spårets alla kurser. Bossarna krävs både när man går banorna och
-- när man testar sig förbi. Vilka bossar som gäller står i
-- diploma_requirements, som fylls av supabase/diploma_requirements.sql.
--
-- Framstegen rapporteras av elevens webbläsare, så diplomet är ett bevis
-- på genomförd kurs och inte ett övervakat prov (det står på diplomet).

create table if not exists public.diploma_requirements (
  kind text not null check (kind in ('course', 'path')),
  subject text not null,
  course_id text not null,
  lesson_ids text[] not null,
  primary key (kind, subject, course_id)
);
-- Inga regler: bara funktionerna nedan (security definer) läser tabellen.
alter table public.diploma_requirements enable row level security;

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
  -- Den som redan har diplomet får byta namn på det, även om kursen fått
  -- nya bossar sedan dess.
  if not exists (
    select 1 from public.diplomas d
    where d.user_id = uid and d.kind = p_kind and d.subject = p_subject
  ) then
    if not exists (
      select 1 from public.diploma_requirements r
      where r.kind = p_kind and r.subject = p_subject
    ) then
      raise exception 'Det finns inget sådant diplom';
    end if;
    if exists (
      select 1 from public.diploma_requirements r
      where r.kind = p_kind and r.subject = p_subject
        and not exists (
          select 1 from public.course_progress p
          where p.user_id = uid
            and p.course_id = r.course_id
            and p.completed_ids @> r.lesson_ids
        )
    ) then
      raise exception 'Kursen är inte klar';
    end if;
  end if;
  insert into public.diplomas (user_id, kind, subject, name, details)
    values (uid, p_kind, p_subject, btrim(p_name), coalesce(p_details, '{}'))
  on conflict (user_id, kind, subject)
    do update set name = excluded.name, details = excluded.details
  returning id into code;
  return code;
end;
$$;
