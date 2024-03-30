import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from './Themed';
import { Exercise, Workout } from '@/app/api/dtos';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';

interface WorkoutTitleProps {
  workout: Workout,
  workouts: Workout[],
  setWorkouts(workouts: Workout[]): void
}

export function WorkoutTitle({ workout, workouts, setWorkouts }: WorkoutTitleProps) {
  const statusOptions: Exercise['status'][] = ['done', 'waiting', 'cancelled']

  const toggleCompletedExercise = (workoutId: Workout['id']) => {

    const updatedWorkouts = workouts.map(workout => {
      if (workoutId === workout.id) {
        const statusIndex = statusOptions.findIndex(item => item === workout.exercise.status)
        const nextStatus = statusIndex + 1

        return {
          ...workout,
          exercise: {
            ...workout.exercise,
            status: statusOptions[nextStatus > 2 ? 0 : nextStatus]
          }
        }
      }

      return workout
    })

    setWorkouts(updatedWorkouts)
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => toggleCompletedExercise(workout.id)}>
      <Text style={styles.serieTitle}>
        {workout.exercise.status === 'done' && '✅'}
        {workout.exercise.status === 'waiting' && '⏰'}
        {workout.exercise.status === 'cancelled' && '❌'}
        {' '}
        {workout.exercise.title}
      </Text>
      <TouchableOpacity
        onPress={() => Alert.alert('add new serie')}
        style={[styles.executionButton, styles.addButton]}>
        <FontAwesome6 size={15} name='plus' color="white" />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    alignSelf: 'flex-start'
  },
  executionButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    flexDirection: 'row'
  },
  addButton: {
    backgroundColor: '#7EB77F',
  },
  serieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
