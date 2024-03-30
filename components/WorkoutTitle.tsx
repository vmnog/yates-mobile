import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import { Exercise, Workout } from '@/app/api/dtos';
import { FontAwesome6 } from '@expo/vector-icons';

interface WorkoutTitleProps {
  workout: Workout,
  workouts: Workout[],
  setWorkouts(workouts: Workout[]): void
}

export function WorkoutTitle({ workout, workouts, setWorkouts }: WorkoutTitleProps) {
  const statusOptions: Exercise['status'][] = ['done', 'waiting', 'cancelled']

  const toggleExerciseStatus = (workoutId: Workout['id']) => {
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

  const addNewSerie = (workoutId: Workout['id']) => {
    const updatedWorkouts = workouts.map(workout => {
      if (workoutId === workout.id) {
        const lastSerieFromLastTraining = workout.seriesLastTraining[workout.seriesLastTraining.length - 1]
        const lastSerieFromCurrentTraining = workout.series[workout.series.length - 1]
        const newId = Math.random()
        const newSerie = lastSerieFromCurrentTraining?.id ? lastSerieFromCurrentTraining : lastSerieFromLastTraining
        const newWorkout = {
          ...workout,
          series: [...workout.series, { ...newSerie, id: newId, hasImproved: false, hasWorsed: false }],
          seriesLastTraining: [...workout.seriesLastTraining, { ...newSerie, id: newId, isNewSerie: true }]
        } satisfies Workout
        return newWorkout
      }

      return workout
    })

    setWorkouts(updatedWorkouts)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.titleContainer}
        onPress={() => toggleExerciseStatus(workout.id)}
      >
        <Text style={styles.serieTitle}>
          {workout.exercise.status === 'done' && '✅'}
          {workout.exercise.status === 'waiting' && '⏰'}
          {workout.exercise.status === 'cancelled' && '❌'}
          {' '}
          {workout.exercise.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => addNewSerie(workout.id)}
        style={[styles.executionButton, styles.addButton]}>
        <FontAwesome6 size={15} name='plus' color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
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
