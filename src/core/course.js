import { createContext, useContext } from 'react';

// Kursen som är öppen. Komponenterna i kärnan frågar den om allt som
// beror på språket, se Kontraktet i SPEC.md.
export const CourseContext = createContext(null);

export const useCourse = () => useContext(CourseContext);
