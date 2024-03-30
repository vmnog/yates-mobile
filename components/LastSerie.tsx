import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from './Themed';
import { LastSerie, Serie } from '@/app/api/dtos';

interface LastSerieProps {
  lastSerie: LastSerie,
  currentSerie: Serie,
  setEditing(lastSerie: LastSerie, workoutIndex: number): void
  workoutIndex: number
}

export function ExecutionItem({
  lastSerie,
  currentSerie,
  setEditing,
  workoutIndex,
}: LastSerieProps) {
  if (lastSerie.isNewSerie && !currentSerie) return

  return <TouchableOpacity style={{ alignSelf: 'flex-start' }} activeOpacity={0.7} onPress={() => setEditing(lastSerie, workoutIndex)}>
    {currentSerie && !lastSerie?.isNewSerie &&
      <Text style={styles.serieExecutionNotExecuted}>
        {lastSerie.reps}x ${lastSerie.weight}kg
      </Text>
    }

    {!currentSerie && !lastSerie.isNewSerie && (
      <Text style={styles.serieLastExecution}>
        {lastSerie.reps}x {lastSerie.weight}kg
      </Text>
    )}

    {currentSerie && (
      <Text style={styles.serieExecution}>
        {currentSerie.reps}x {currentSerie.weight}kg
        {' '}
        {currentSerie.hasImproved && '🔥'}
        {currentSerie.hasWorsed && '👎'}
        {!currentSerie.hasWorsed && !currentSerie.hasImproved && '🙂'}
      </Text>
    )}
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  serieExecution: {
    fontSize: 18,
  },
  serieLastExecution: {
    fontSize: 18,
    opacity: 0.4,
  },
  serieExecutionNotExecuted: {
    fontSize: 14,
    opacity: 0.4,
  },
});
