// utils/calculations.js
// Pure helper functions. No React here — just JS.
// Keeping logic OUT of components is a code-quality signal.

export function getAttendancePercent(course) {
  if (!course || course.total === 0) return 0;
  return Math.round((course.attended / course.total) * 100);
}

export function isAtRisk(course, threshold) {
  return getAttendancePercent(course) < threshold;
}

export function getAverageMarks(course) {
  if (!course || course.marks.length === 0) return 0;
  const sum = course.marks.reduce((a, b) => a + b, 0);
  const max = course.marks.length * 20;
  return Math.round((sum / max) * 100);
}

export function getOverallGPA(courses) {
  if (!courses || courses.length === 0) return '0.00';
  const totalCredits = courses.reduce((a, c) => a + c.creditHours, 0);
  const weighted = courses.reduce((a, c) => a + c.gpa * c.creditHours, 0);
  return (weighted / totalCredits).toFixed(2);
}

export function getRiskSummary(courses, threshold) {
  const risky = courses.filter((c) => isAtRisk(c, threshold));
  return { count: risky.length, courses: risky };
}