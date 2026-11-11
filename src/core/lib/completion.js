import { passedTrackIdsFrom } from '../quiz';
import { stages, trackProgress } from '../stages';

// Hur långt eleven kommit i en hel kurs. Kursen är klar när alla banor är
// klara (på vanligt sätt eller genom att testa sig förbi och klara
// bossarna), och då kan eleven få ett diplom. plannedTracks: så många
// banor kursen ska ha när den är färdigbyggd (kursens meta). Tills alla
// finns kan ingen bli klar, så att ingen får diplom på en halv kurs.
export function courseCompletion(
  tracks,
  lessons,
  completedIds,
  plannedTracks = tracks.length,
) {
  const passed = passedTrackIdsFrom(completedIds, tracks);
  const status = tracks.map(track =>
    trackProgress(track, lessons, completedIds, passed),
  );
  const done = status.filter(item => item.isComplete).length;
  return {
    done,
    total: Math.max(tracks.length, plannedTracks),
    isComplete:
      tracks.length > 0 &&
      tracks.length >= plannedTracks &&
      done === tracks.length,
    moreComing: tracks.length < plannedTracks,
    tracks: status.map(item => ({
      id: item.track.id,
      title: item.track.title,
      isComplete: item.isComplete,
    })),
  };
}

// Det som står på ett kursdiplom. Sparas med diplomet, så att diplomsidan
// inte behöver ladda kursen.
export const courseDiplomaDetails = (course, completion) => ({
  title: course.name,
  icon: course.icon,
  parts: completion.tracks.map(track => track.title),
  stage: Math.min(completion.total, stages.length - 1),
});
