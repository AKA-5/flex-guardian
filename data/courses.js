// data/courses.js
// Our fake "backend". In a real app this would come from an API.
// Plain array of objects — same idea as a Kotlin data class list.

export const INITIAL_COURSES = [
  {
    id: 'CS101',
    name: 'Intro to Programming',
    creditHours: 3,
    attended: 22,
    total: 30,
    marks: [18, 15, 20, 17],
    gpa: 3.7,
  },
  {
    id: 'CS202',
    name: 'Data Structures',
    creditHours: 4,
    attended: 18,
    total: 30,
    marks: [12, 14, 16, 11],
    gpa: 3.2,
  },
  {
    id: 'MA201',
    name: 'Linear Algebra',
    creditHours: 3,
    attended: 14,
    total: 28,
    marks: [10, 12, 9, 13],
    gpa: 2.6,
  },
  {
    id: 'HU101',
    name: 'Technical Writing',
    creditHours: 2,
    attended: 25,
    total: 28,
    marks: [17, 18, 16, 19],
    gpa: 3.9,
  },
  {
    id: 'CS303',
    name: 'Operating Systems',
    creditHours: 3,
    attended: 15,
    total: 30,
    marks: [11, 13, 12, 10],
    gpa: 2.8,
  },
];

export const GPA_HISTORY = [
  { semester: 'S1', gpa: 3.4 },
  { semester: 'S2', gpa: 3.1 },
  { semester: 'S3', gpa: 3.6 },
  { semester: 'S4', gpa: 3.3 },
  { semester: 'S5', gpa: 3.5 },
];