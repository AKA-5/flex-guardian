import { View, Text, StyleSheet } from 'react-native';

export default function StatCard({ label, value, accent }) {
  return (
    <View style={[styles.card, { borderLeftColor: accent || '#38bdf8' }]}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#1e293b',
    padding: 14,
    borderRadius: 10,
    borderLeftWidth: 4,
    marginHorizontal: 4,
  },
  value: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  label: { color: '#94a3b8', fontSize: 12, marginTop: 4 },
});