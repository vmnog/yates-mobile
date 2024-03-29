import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from './Themed';
import { Workout } from '@/app/api/dtos';

interface WorkoutTitleProps {
  workout: Workout,
  workouts: Workout[],
  setWorkouts(workouts: Workout[]): void
}

export function WorkoutTitle({ workout, workouts, setWorkouts }: WorkoutTitleProps) {
  const toggleCompletedExercise = (workoutId: Workout['id']) => {
    const updatedWorkouts = workouts.map(workout => {
      if (workoutId === workout.id) {
        return {
          ...workout,
          exercise: {
            ...workout.exercise,
            isCompleted: !workout.exercise.isCompleted
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
        {workout.exercise.isCompleted ? '✅' : '⏰'}
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
