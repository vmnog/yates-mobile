import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';
import { CurrentWeight } from './CurrentWeight';

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
      <CurrentWeight currentWeight={currentWeight} />
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
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
