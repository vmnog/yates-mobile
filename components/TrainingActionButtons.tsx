import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import { actionsHeight } from '@/app/training';

interface TrainingActionButtonsProps {
}

export function TrainingActionButtons({ }: TrainingActionButtonsProps) {

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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: actionsHeight,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
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
  },
});
