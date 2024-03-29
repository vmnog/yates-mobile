import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from './Themed';
import { LastSerie as LastSerieType, Serie } from '@/app/api/dtos';

interface LastSerieProps {
  lastSerie: LastSerieType,
  currentSerie: Serie,
  setEditing(serieId: Serie['id']): void
}

export function LastSerie({
  lastSerie,
  currentSerie,
  setEditing
}: LastSerieProps) {
  return (
    <TouchableOpacity onPress={() => setEditing(currentSerie.id)} disabled={!currentSerie}>
      <Text style={currentSerie ? styles.serieExecution : styles.serieExecutionNotExecuted}>
        {currentSerie && `${currentSerie.reps}x ${currentSerie.weight}kg`}
        {!currentSerie && `${lastSerie.reps}x ${lastSerie.weight}kg`}

        {' '}
        {currentSerie && currentSerie.hasImproved && '🔥'}
        {currentSerie && currentSerie.hasWorsed && '👎'}
        {currentSerie && !currentSerie.hasWorsed && !currentSerie.hasImproved && '🙂'}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  serieExecution: {
    fontSize: 18,
    color: 'white'
  },
  serieExecutionNotExecuted: {
    fontSize: 18,
    opacity: 0.4
  },
});
