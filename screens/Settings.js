import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';

export default function Settings({ threshold, onSetThreshold, onReset, onBack }) {
  const options = [65, 70, 75, 80, 85];

  return (
    <View style={styles.screen}>
      <Header title="Settings" onBack={onBack} />

      <Text style={styles.section}>Attendance Threshold</Text>
      <Text style={styles.hint}>Courses below this % are flagged as at-risk.</Text>

      <View style={styles.row}>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt}
            onPress={() => onSetThreshold(opt)}
            style={[styles.chip, threshold === opt && styles.chipActive]}
          >
            <Text style={[styles.chipText, threshold === opt && styles.chipTextActive]}>
              {opt}%
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={onReset} style={styles.resetBtn}>
        <Text style={styles.resetText}>Reset All Data</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0f172a' },
  section: { color: '#e2e8f0', fontSize: 15, fontWeight: '600', margin: 16, marginBottom: 4 },
  hint: { color: '#64748b', marginHorizontal: 16, marginBottom: 12, fontSize: 12 },
  row: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 8 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#1e293b',
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: { backgroundColor: '#38bdf8' },
  chipText: { color: '#94a3b8', fontWeight: '600' },
  chipTextActive: { color: '#0f172a' },
  resetBtn: {
    margin: 16,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#7f1d1d',
    alignItems: 'center',
  },
  resetText: { color: '#fff', fontWeight: '600' },
});