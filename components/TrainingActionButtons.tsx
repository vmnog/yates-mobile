import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';

export function TrainingActionButtons() {
  return (
    <View style={styles.actionsContainer}>
      <TouchableOpacity activeOpacity={0.7} style={[styles.actionsButton, styles.finishButton]}>
        <Text style={styles.actionButtonText}>Finish</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} style={[styles.actionsButton, styles.restButton]}>
        <Text style={styles.actionButtonText}>😪 Rest</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
  },
  actionsButton: {
    width: '50%',
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue'
  },
  finishButton: {
    backgroundColor: '#E71D36'
  },
  restButton: {
    backgroundColor: '#7EB77F'
  },
  actionButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
});
