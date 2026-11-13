import { localDay } from '../core/lib/activity';
import { supabase } from '../core/lib/supabase';

// Klasser och lärarvyn (tabellerna classes och class_members, se
// supabase/migrations). Läraren ser elevernas klarade övningar och hur
// aktiva de varit – aldrig deras kod.

export const joinUrl = code =>
  `${window.location.origin}${import.meta.env.BASE_URL}klass/${code}`;

const check = ({ data, error }) => {
  if (error) throw error;
  return data;
};

export const fetchClassName = async code =>
  check(await supabase.rpc('class_by_code', { p_code: code }));

export const joinClass = async (code, name) =>
  check(await supabase.rpc('join_class', { p_code: code, p_name: name }));

export const fetchMyClasses = async () =>
  check(await supabase.rpc('my_classes'));

export const leaveClass = async (classId, userId) =>
  check(
    await supabase
      .from('class_members')
      .delete()
      .eq('class_id', classId)
      .eq('user_id', userId),
  );

export const fetchTeacherClasses = async userId =>
  check(
    await supabase
      .from('classes')
      .select('id, name, join_code, created_at')
      .eq('teacher_id', userId)
      .order('created_at'),
  );

export const createClass = async name =>
  check(
    await supabase
      .from('classes')
      .insert({ name: name.trim() })
      .select('id, name, join_code, created_at')
      .single(),
  );

export const deleteClass = async id =>
  check(await supabase.from('classes').delete().eq('id', id));

export const removeStudent = (classId, userId) => leaveClass(classId, userId);

// Allt läraren behöver om en klass: eleverna, deras framsteg och de
// senaste 30 dagarnas aktivitet.
export async function fetchClassData(classId) {
  const [members, progress] = await Promise.all([
    supabase
      .from('class_members')
      .select('user_id, display_name, joined_at')
      .eq('class_id', classId)
      .order('display_name'),
    supabase.rpc('class_progress', { p_class: classId }),
  ]);
  const memberRows = check(members);
  const since = new Date();
  since.setDate(since.getDate() - 30);
  const activity = memberRows.length
    ? check(
        await supabase
          .from('daily_activity')
          .select('user_id, day, exercises')
          .in(
            'user_id',
            memberRows.map(member => member.user_id),
          )
          .gte('day', localDay(since)),
      )
    : [];
  return { members: memberRows, progress: check(progress), activity };
}

const daysBetween = (from, to) =>
  Math.round((new Date(to) - new Date(from)) / 86_400_000);

// En rad per elev: övningar klara per kurs, övningar de senaste sju
// dagarna och dagen eleven senast klarade något. summaries: kursens id →
// { lessons } (bara kurserna någon i klassen börjat på).
export function classReport(data, summaries, today = localDay()) {
  const courseIds = [
    ...new Set(data.progress.map(row => row.course_id)),
  ].filter(id => summaries[id]);
  const students = data.members.map(member => {
    const rows = data.progress.filter(row => row.user_id === member.user_id);
    const days = data.activity.filter(row => row.user_id === member.user_id);
    const courses = Object.fromEntries(
      courseIds.map(id => {
        const lessons = summaries[id].lessons;
        const known = new Set(lessons.map(lesson => lesson.id));
        const row = rows.find(item => item.course_id === id);
        const done = (row?.completed_ids ?? []).filter(item =>
          known.has(item),
        ).length;
        return [id, { done, total: lessons.length }];
      }),
    );
    const lastDay = days.reduce(
      (latest, row) => (row.day > latest ? row.day : latest),
      '',
    );
    return {
      id: member.user_id,
      name: member.display_name,
      courses,
      week: days
        .filter(row => daysBetween(row.day, today) < 7)
        .reduce((sum, row) => sum + row.exercises, 0),
      lastDay: lastDay || null,
    };
  });
  return { courseIds, students };
}
