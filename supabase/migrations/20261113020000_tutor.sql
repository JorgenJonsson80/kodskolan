-- AI-handledaren (supabase/functions/ai-tutor): bara för den som har
-- tillgång till kursen, och högst ett antal frågor per dag. Funktionen
-- räknar upp och svarar med hur många frågor som är kvar i dag, eller
-- säger varför det inte går.
create table if not exists public.tutor_usage (
  user_id uuid not null references auth.users (id) on delete cascade,
  day date not null default current_date,
  questions integer not null default 0,
  primary key (user_id, day)
);
alter table public.tutor_usage enable row level security;

create or replace function public.use_tutor_question(p_course text, p_limit integer default 30)
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
    raise exception 'Logga in för att fråga AI-handledaren';
  end if;
  if not public.has_access(p_course) then
    raise exception 'AI-handledaren ingår i full tillgång';
  end if;
  insert into public.tutor_usage (user_id, day, questions)
    values (uid, current_date, 1)
  on conflict (user_id, day)
    do update set questions = tutor_usage.questions + 1
  returning questions into used;
  if used > p_limit then
    raise exception 'Dagens frågor är slut. Du kan fråga igen i morgon.';
  end if;
  return p_limit - used;
end;
$$;

revoke all on function public.use_tutor_question(text, integer) from public, anon;
grant execute on function public.use_tutor_question(text, integer) to authenticated;
