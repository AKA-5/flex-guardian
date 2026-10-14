import { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Header from '../components/Header';
import CourseCard from '../components/CourseCard';
import { isAtRisk } from '../utils/calculations';

export default function CourseList({ courses, threshold, onSelectCourse }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const visible = useMemo(() => {
    let list = courses;

    if (filter === 'risk') list = list.filter((c) => isAtRisk(c, threshold));
    if (filter === 'safe') list = list.filter((c) => !isAtRisk(c, threshold));

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) => c.id.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
      );
    }

    const sorted = [...list];
    if (sortBy === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === 'attendance') {
      sorted.sort((a, b) => a.attended / a.total - b.attended / b.total);
    }
    return sorted;
  }, [courses, query, filter, sortBy, threshold]);

  return (
    <View style={styles.screen}>
      <Header title="Courses" />

      <TextInput
        style={styles.search}
        placeholder="Search by code or name..."
        placeholderTextColor="#64748b"
        value={query}
        onChangeText={setQuery}
      />

      <View style={styles.chipRow}>
        {['all', 'risk', 'safe'].map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.chip, filter === f && styles.chipActive]}
          >
            <Text style={[styles.chipText, filter === f && styles.chipTextActive]}>
              {f.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() => setSortBy(sortBy === 'name' ? 'attendance' : 'name')}
          style={styles.chip}
        >
          <Text style={styles.chipText}>Sort: {sortBy}</Text>
        </TouchableOpacity>
      </View>

      {visible.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No courses match</Text>
          <Text style={styles.emptySub}>Try a different search or filter.</Text>
        </View>
      ) : (
        <FlatList
          data={visible}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CourseCard
              course={item}
              threshold={threshold}
              onPress={() => onSelectCourse(item.id)}
            />
          )}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0f172a' },
  search: {
    backgroundColor: '#1e293b',
    color: '#fff',
    margin: 16,
    padding: 12,
    borderRadius: 10,
  },
  chipRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 8, flexWrap: 'wrap' },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    marginRight: 8,
  },
  chipActive: { backgroundColor: '#38bdf8' },
  chipText: { color: '#94a3b8', fontSize: 12 },
  chipTextActive: { color: '#0f172a', fontWeight: 'bold' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyTitle: { color: '#e2e8f0', fontSize: 18, fontWeight: '600' },
  emptySub: { color: '#64748b', fontSize: 14, marginTop: 6, textAlign: 'center' },
});