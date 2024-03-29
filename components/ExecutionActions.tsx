import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import { FontAwesome } from '@expo/vector-icons';
import { Serie, Workout } from '@/app/api/dtos';
import Colors from '@/constants/Colors';

interface ExecutionActionsProps {
  currentSerie: Serie,
  workouts: Workout[],
  setWorkouts(workouts: Workout[]): void
}

export function ExecutionActions({
  currentSerie,
  workouts,
  setWorkouts
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
    <View style={styles.executionActions}>
      <TouchableOpacity
        onPress={() => updateSerie(currentSerie?.id, 'reps', 'decrease')}
        style={[styles.executionButton, styles.decreaseButton]}>
        <FontAwesome name='minus' color="white" />
      </TouchableOpacity>

      <Text style={currentSerie ? styles.serieExecution : styles.serieExecutionNotExecuted}>
        {currentSerie.reps}x
      </Text>

      <TouchableOpacity
        onPress={() => updateSerie(currentSerie?.id, 'reps', 'increase')}
        style={[styles.executionButton, styles.increaseButton]}>
        <FontAwesome name='plus' color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => updateSerie(currentSerie?.id, 'weight', 'decrease')}
        style={[styles.executionButton, styles.decreaseButton]}>
        <FontAwesome name='minus' color="white" />
      </TouchableOpacity>

      <Text style={currentSerie ? styles.serieExecution : styles.serieExecutionNotExecuted}>
        {currentSerie.weight}kg
      </Text>

      <TouchableOpacity
        onPress={() => updateSerie(currentSerie?.id, 'weight', 'increase')}
        style={[styles.executionButton, styles.increaseButton]}>
        <FontAwesome name='plus' color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  executionActions: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center'
  },
  executionButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14
  },
  increaseButton: {
    backgroundColor: '#7EB77F',
  },
  decreaseButton: {
    backgroundColor: '#E71D36'
  },
  serieExecution: {
    fontSize: 18,
    color: Colors.dark.text
  },
  serieExecutionNotExecuted: {
    fontSize: 18,
    opacity: 0.4
  },
});
