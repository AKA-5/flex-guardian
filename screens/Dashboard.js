import { ScrollView, View, Text, StyleSheet, Dimensions } from 'react-native';
import { ProgressChart, LineChart } from 'react-native-chart-kit';
import Header from '../components/Header';
import RiskBanner from '../components/RiskBanner';
import StatCard from '../components/StatCard';
import {
  getOverallGPA,
  getRiskSummary,
  getAttendancePercent,
} from '../utils/calculations';
import { GPA_HISTORY } from '../data/courses';

const screenWidth = Dimensions.get('window').width;

export default function Dashboard({ courses, threshold }) {
  const risk = getRiskSummary(courses, threshold);
  const overallGPA = getOverallGPA(courses);

  const avgAttendance =
    courses.length === 0
      ? 0
      : courses.reduce((a, c) => a + getAttendancePercent(c), 0) / courses.length / 100;

  const gpaData = {
    labels: GPA_HISTORY.map((g) => g.semester),
    datasets: [{ data: GPA_HISTORY.map((g) => g.gpa) }],
  };

  const chartConfig = {
    backgroundGradientFrom: '#1e293b',
    backgroundGradientTo: '#1e293b',
    color: (opacity = 1) => `rgba(56, 189, 248, ${opacity})`,
    labelColor: () => '#94a3b8',
    decimalPlaces: 1,
    propsForBackgroundLines: { stroke: '#334155' },
  };

  return (
    <ScrollView style={styles.screen}>
      <Header title="Dashboard" />
      <RiskBanner riskCount={risk.count} threshold={threshold} />

      <View style={styles.row}>
        <StatCard label="Overall GPA" value={overallGPA} accent="#38bdf8" />
        <StatCard label="At Risk" value={risk.count} accent="#ef4444" />
        <StatCard label="Courses" value={courses.length} accent="#22c55e" />
      </View>

      <Text style={styles.sectionTitle}>Average Attendance</Text>
      <View style={styles.chartWrapper}>
        <ProgressChart
          data={{ labels: ['Attendance'], data: [avgAttendance] }}
          width={screenWidth - 32}
          height={180}
          strokeWidth={12}
          radius={60}
          chartConfig={chartConfig}
          hideLegend={false}
        />
      </View>

      <Text style={styles.sectionTitle}>GPA Trend</Text>
      <View style={styles.chartWrapper}>
        <LineChart
          data={gpaData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          bezier
          fromZero
          style={{ borderRadius: 12 }}
        />
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0f172a' },
  row: { flexDirection: 'row', marginHorizontal: 12, marginBottom: 20 },
  sectionTitle: {
    color: '#e2e8f0',
    fontSize: 15,
    fontWeight: '600',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  chartWrapper: { alignItems: 'center', marginBottom: 20 },
});