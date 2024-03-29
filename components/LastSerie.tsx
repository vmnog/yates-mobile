import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from './Themed';
import { LastSerie as LastSerieType, Serie } from '@/app/api/dtos';

interface LastSerieProps {
  lastSerie: LastSerieType,
  currentSerie: Serie,
  setEditing(serieId: Serie['id']): void
}

export function ExecutionItem({
  lastSerie,
  currentSerie,
  setEditing
}: LastSerieProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => setEditing(currentSerie.id)} disabled={!currentSerie}>
      {currentSerie && lastSerie &&
        <Text style={styles.serieExecutionNotExecuted}>
          {`${lastSerie.reps}x ${lastSerie.weight}kg`}
        </Text>
      }

      {!currentSerie && (
        <Text style={styles.serieLastExecution}> {lastSerie.reps}x {lastSerie.weight}kg</Text>
      )}

      {currentSerie && (
        <Text style={styles.serieExecution}>
          {`${currentSerie.reps}x ${currentSerie.weight}kg`}
          {' '}
          {currentSerie && currentSerie.hasImproved && '🔥'}
          {currentSerie && currentSerie.hasWorsed && '👎'}
          {currentSerie && !currentSerie.hasWorsed && !currentSerie.hasImproved && '🙂'}
        </Text>
      )}
    </TouchableOpacity >
  )
}

const styles = StyleSheet.create({
  serieExecution: {
    fontSize: 18,
    color: 'white'
  },
  serieLastExecution: {
    fontSize: 18,
    opacity: 0.4,
  },
  serieExecutionNotExecuted: {
    fontSize: 14,
    opacity: 0.4,
    // textDecorationLine: 'line-through'
  },
});
