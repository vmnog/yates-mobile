import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from './Themed';
import { useState } from 'react';
import { IncreaseOrDecrease } from './IncreaseOrDecrease';
import OutsidePressHandler from 'react-native-outside-press';

interface CurrentWeightProps {
  currentWeight: number
}

export function CurrentWeight({
  currentWeight,
}: CurrentWeightProps) {
  const [weight, setWeight] = useState(currentWeight)
  const [isEditing, setIsEditing] = useState(false)

  return (
    <OutsidePressHandler onOutsidePress={() => setIsEditing(false)}>
      {isEditing ? (
        <IncreaseOrDecrease
          roundValue
          value={weight}
          sufix='kg'
          increaseFunction={() => setWeight(state => state + 0.1)}
          decreaseFunction={() => setWeight(state => state - 0.1)}
        />
      ) : (
        <TouchableOpacity activeOpacity={0.7} onPress={() => setIsEditing(state => !state)}>
          <Text style={styles.subtitle}>Peso corporal: {weight.toFixed(1)}kg ✏️</Text>
        </TouchableOpacity >
      )}
    </OutsidePressHandler>
  )
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
