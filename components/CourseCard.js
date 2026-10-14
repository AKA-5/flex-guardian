import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getAttendancePercent, isAtRisk } from '../utils/calculations';

export default function CourseCard({ course, threshold, onPress }) {
  const percent = getAttendancePercent(course);
  const risky = isAtRisk(course, threshold);

  return (
    <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.7}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.code}>{course.id}</Text>
          <Text style={styles.name}>{course.name}</Text>
        </View>
        <View style={[styles.badge, risky ? styles.badgeDanger : styles.badgeOk]}>
          <Text style={styles.badgeText}>{percent}%</Text>
        </View>
      </View>
      <View style={styles.barTrack}>
        <View
          style={[
            styles.barFill,
            { width: `${percent}%`, backgroundColor: risky ? '#ef4444' : '#22c55e' },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#1e293b', padding: 14, borderRadius: 12, marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  code: { color: '#38bdf8', fontSize: 12, fontWeight: '600' },
  name: { color: '#fff', fontSize: 15, marginTop: 2 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeDanger: { backgroundColor: '#7f1d1d' },
  badgeOk: { backgroundColor: '#14532d' },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  barTrack: { height: 6, backgroundColor: '#334155', borderRadius: 3, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 3 },
});