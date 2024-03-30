import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from './Themed';
import { Exercise, Workout } from '@/app/api/dtos';

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
    <TouchableOpacity onPress={() => toggleCompletedExercise(workout.id)}>
      <Text style={styles.serieTitle}>
        {workout.exercise.status === 'done' && '✅'}
        {workout.exercise.status === 'waiting' && '⏰'}
        {workout.exercise.status === 'cancelled' && '❌'}
        {' '}
        {workout.exercise.title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  serieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
