import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from './Themed';

interface CurrentWeightProps {
  weight: number
}

export function CurrentWeight({
  weight
}: CurrentWeightProps) {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <Text style={styles.subtitle}>Peso corporal: {weight}kg ✏️</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
