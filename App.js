import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Dashboard from './screens/Dashboard';
import CourseList from './screens/CourseList';
import CourseDetail from './screens/CourseDetail';
import Settings from './screens/Settings';
import { INITIAL_COURSES } from './data/courses';

export default function App() {
  const [screen, setScreen] = useState('dashboard');
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [threshold, setThreshold] = useState(75);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const openCourse = (id) => {
    setSelectedCourseId(id);
    setScreen('detail');
  };

  const updateCourse = (updated) => {
    setCourses((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const resetData = () => {
    setCourses(INITIAL_COURSES);
    setThreshold(75);
    setScreen('dashboard');
  };

  const renderScreen = () => {
    if (screen === 'dashboard') {
      return <Dashboard courses={courses} threshold={threshold} />;
    }
    if (screen === 'list') {
      return (
        <CourseList
          courses={courses}
          threshold={threshold}
          onSelectCourse={openCourse}
        />
      );
    }
    if (screen === 'detail') {
      const course = courses.find((c) => c.id === selectedCourseId);
      return (
        <CourseDetail
          course={course}
          threshold={threshold}
          onUpdate={updateCourse}
          onBack={() => setScreen('list')}
        />
      );
    }
    if (screen === 'settings') {
      return (
        <Settings
          threshold={threshold}
          onSetThreshold={setThreshold}
          onReset={resetData}
          onBack={() => setScreen('dashboard')}
        />
      );
    }
  };

  return (
    <View style={styles.app}>
      <View style={styles.switcher}>
        {['dashboard', 'list', 'settings'].map((s) => (
          <TouchableOpacity
            key={s}
            onPress={() => setScreen(s)}
            style={[styles.tab, screen === s && styles.tabActive]}
          >
            <Text style={[styles.tabText, screen === s && styles.tabTextActive]}>
              {s.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ flex: 1 }}>{renderScreen()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: '#0f172a' },
  switcher: {
    flexDirection: 'row',
    paddingTop: 44,
    paddingBottom: 8,
    paddingHorizontal: 8,
    backgroundColor: '#0b1220',
  },
  tab: { flex: 1, padding: 10, alignItems: 'center', borderRadius: 8 },
  tabActive: { backgroundColor: '#1e293b' },
  tabText: { color: '#64748b', fontSize: 11, fontWeight: '600' },
  tabTextActive: { color: '#38bdf8' },
});