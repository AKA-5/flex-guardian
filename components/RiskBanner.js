import { View, Text, StyleSheet } from 'react-native';

export default function RiskBanner({ riskCount, threshold }) {
  if (riskCount === 0) {
    return (
      <View style={[styles.banner, styles.safe]}>
        <Text style={styles.text}>✅ All courses are above {threshold}% attendance.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.banner, styles.warning]}>
      <Text style={styles.text}>
        ⚠️ You are at risk in {riskCount} course{riskCount > 1 ? 's' : ''}. Tap them below.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: { padding: 14, borderRadius: 10, marginHorizontal: 16, marginBottom: 12 },
  warning: { backgroundColor: '#7f1d1d' },
  safe: { backgroundColor: '#14532d' },
  text: { color: '#fff', fontSize: 14 },
});