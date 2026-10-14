import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import {
  getAttendancePercent,
  getAverageMarks,
  isAtRisk,
} from '../utils/calculations';

export default function CourseDetail({ course, threshold, onUpdate, onBack }) {
  if (!course) {
    return (
      <View style={styles.screen}>
        <Header title="Course" onBack={onBack} />
        <Text style={styles.error}>Course not found.</Text>
      </View>
    );
  }

  const percent = getAttendancePercent(course);
  const avgMarks = getAverageMarks(course);
  const risky = isAtRisk(course, threshold);

  const changeAttendance = (delta) => {
    const nextAttended = Math.max(0, Math.min(course.total, course.attended + delta));
    onUpdate({ ...course, attended: nextAttended });
  };

  return (
    <ScrollView style={styles.screen}>
      <Header title={course.name} onBack={onBack} />

      <View style={styles.row}>
        <StatCard
          label="Attendance"
          value={`${percent}%`}
          accent={risky ? '#ef4444' : '#22c55e'}
        />
        <StatCard label="Avg Marks" value={`${avgMarks}%`} accent="#38bdf8" />
      </View>

      {risky && (
        <View style={styles.warnBox}>
          <Text style={styles.warnText}>
            ⚠️ Below {threshold}% threshold. Attend more classes to recover.
          </Text>
        </View>
      )}

      <Text style={styles.section}>Simulate Attendance</Text>
      <View style={styles.controlRow}>
        <TouchableOpacity style={styles.btn} onPress={() => changeAttendance(-1)}>
          <Text style={styles.btnText}>− Missed</Text>
        </TouchableOpacity>
        <Text style={styles.count}>
          {course.attended} / {course.total}
        </Text>
        <TouchableOpacity style={styles.btn} onPress={() => changeAttendance(1)}>
          <Text style={styles.btnText}>+ Attended</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.section}>Marks Breakdown</Text>
      {course.marks.length === 0 ? (
        <Text style={styles.empty}>No marks recorded yet.</Text>
      ) : (
        course.marks.map((m, i) => (
          <View key={i} style={styles.markRow}>
            <Text style={styles.markLabel}>Assessment {i + 1}</Text>
            <Text style={styles.markValue}>{m} / 20</Text>
          </View>
        ))
      )}

      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0f172a' },
  row: { flexDirection: 'row', margin: 12 },
  warnBox: { backgroundColor: '#7f1d1d', margin: 16, padding: 12, borderRadius: 10 },
  warnText: { color: '#fff', fontSize: 13 },
  section: { color: '#e2e8f0', fontSize: 15, fontWeight: '600', margin: 16, marginBottom: 8 },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  btn: { backgroundColor: '#1e293b', padding: 12, borderRadius: 10 },
  btnText: { color: '#38bdf8', fontWeight: '600' },
  count: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  empty: { color: '#64748b', marginHorizontal: 16 },
  markRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomColor: '#1e293b',
    borderBottomWidth: 1,
  },
  markLabel: { color: '#cbd5e1' },
  markValue: { color: '#fff', fontWeight: '600' },
  error: { color: '#ef4444', textAlign: 'center', marginTop: 40 },
});