import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Header({ title, onBack }) {
  return (
    <View style={styles.header}>
      {onBack && (
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#1e293b',
  },
  backBtn: { marginRight: 12 },
  backText: { color: '#fff', fontSize: 24 },
  title: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
});