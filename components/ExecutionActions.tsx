import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import { LastSerie, Serie, Workout } from '@/app/api/dtos';
import Colors from '@/constants/Colors';
import { IncreaseOrDecrease } from './IncreaseOrDecrease';
import { FontAwesome } from '@expo/vector-icons';

interface ExecutionActionsProps {
  lastSerie: LastSerie,
  currentSerie: Serie,
  workouts: Workout[],
  setWorkouts(workouts: Workout[]): void
  deleteSerie(currentSerie: Serie, workoutIndex: number): void
  workoutIndex: number
}

export function ExecutionWhileEditing({
  lastSerie,
  currentSerie,
  workouts,
  setWorkouts,
  deleteSerie,
  workoutIndex
}: ExecutionActionsProps) {
  const updateSerie = (serieId: Serie['id'], repsOrWeight: 'reps' | 'weight', increaseOrDecrease: 'increase' | 'decrease') => {
    // Make a deep copy of the workouts array to safely modify it
    const updatedWorkouts = workouts.map(workout => ({
      ...workout,
      series: workout.series.map(serie => {
        // Check if this is the serie we need to update
        if (serie.id === serieId) {
          let newValue;
          // Determine the new value based on the operation
          if (repsOrWeight === 'reps') {
            newValue = increaseOrDecrease === 'increase' ? serie.reps + 1 : Math.max(0, serie.reps - 1);
          } else { // 'weight'
            newValue = increaseOrDecrease === 'increase' ? serie.weight + 1 : Math.max(0, serie.weight - 1);
          }

          // Determine if there has been improvement or worsening based on last training
          const lastSerie = workout.seriesLastTraining.find(s => s.id === serieId);
          let hasImproved = false, hasWorsed = false;
          if (lastSerie) {
            if (repsOrWeight === 'reps') {
              hasImproved = newValue > lastSerie.reps;
              hasWorsed = newValue < lastSerie.reps;
            } else { // 'weight'
              hasImproved = newValue > lastSerie.weight;
              hasWorsed = newValue < lastSerie.weight;
            }
          }

          // Return the updated serie
          const newSerieExecution = {
            ...serie,
            reps: repsOrWeight === 'reps' ? newValue : serie.reps,
            weight: repsOrWeight === 'weight' ? newValue : serie.weight,
            hasImproved,
            hasWorsed
          };
          return newSerieExecution
        }
        // Return the serie unchanged if it's not the one we're updating
        return serie;
      })
    }));

    // Update the workouts state
    setWorkouts(updatedWorkouts);
  };

  return (
    <View>
      <Text style={styles.serieExecutionNotExecuted}>{lastSerie.reps}x {lastSerie.weight}kg</Text>
      <View style={styles.executionActions}>
        <IncreaseOrDecrease
          value={currentSerie.reps}
          increaseFunction={() => updateSerie(currentSerie?.id, 'reps', 'increase')}
          decreaseFunction={() => updateSerie(currentSerie?.id, 'reps', 'decrease')}
          sufix='x'
        />
        <IncreaseOrDecrease
          value={currentSerie.weight}
          increaseFunction={() => updateSerie(currentSerie?.id, 'weight', 'increase')}
          decreaseFunction={() => updateSerie(currentSerie?.id, 'weight', 'decrease')}
          sufix='kg'
        />
        <TouchableOpacity
          onPress={() => deleteSerie(currentSerie, workoutIndex)}
          style={[styles.executionButton, styles.deleteButton]}>
          <FontAwesome size={20} name='trash-o' color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  executionButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14
  },
  deleteButton: {
    backgroundColor: '#E71D36'
  },
  executionActions: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  serieExecution: {
    fontSize: 18,
    color: Colors.dark.text
  },
  serieExecutionNotExecuted: {
    fontSize: 14,
    opacity: 0.4,
  },
});
