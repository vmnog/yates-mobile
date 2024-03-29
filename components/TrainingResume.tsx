import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';

interface TrainingResumeProps {
  training: {
    name: string,
    date: string,
    currentWeight: number
  }
}

export function TrainingResume({
  training: {
    name, date, currentWeight
  }
}: TrainingResumeProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.subtitle}>{date}</Text>
      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.subtitle}>Peso corporal: {currentWeight}kg ✏️</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
