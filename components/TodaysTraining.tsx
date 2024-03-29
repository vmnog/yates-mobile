import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';

export function TodaysTraining() {
  return (
    <View style={styles.todaysTrainingContainer}>
      <Text style={styles.todaysTrainingHeading}>📅 Today's Training</Text>
      <Text style={styles.todaysTrainingDate}>⏰ Mon 18 - 15:00</Text>
      <Text style={styles.todaysTrainingTitle}>🏋️ Back & Abs</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  todaysTrainingContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    padding: 20,
    gap: 20
  },
  todaysTrainingHeading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  todaysTrainingDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  todaysTrainingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
