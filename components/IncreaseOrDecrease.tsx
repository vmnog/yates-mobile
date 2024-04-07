import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from './Themed';
import { FontAwesome } from '@expo/vector-icons';

interface IncreaseOrDecreaseProps {
  roundValue?: boolean
  sufix?: string
  value: number
  increaseFunction(): void
  decreaseFunction(): void
}

export function IncreaseOrDecrease({
  roundValue,
  sufix,
  value,
  increaseFunction,
  decreaseFunction
}: IncreaseOrDecreaseProps) {
  return (
    <View style={styles.executionActions}>
      <TouchableOpacity
        onPress={() => decreaseFunction()}
        style={[styles.executionButton, styles.decreaseButton]}>
        <FontAwesome name='minus' color="white" />
      </TouchableOpacity>

      <Text style={styles.valueText}>
        {roundValue ? value.toFixed(1) : value}{sufix}
      </Text>

      <TouchableOpacity
        onPress={() => increaseFunction()}
        style={[styles.executionButton, styles.increaseButton]}>
        <FontAwesome name='plus' color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  executionActions: {
    flexDirection: 'row',
    gap: 10,
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
  valueText: {
    fontSize: 18
  }
});
