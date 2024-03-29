import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Text, View } from '@/components/Themed';
import { UpcomingEvents } from '@/components/UpcomingEvents';
import { TodaysTraining } from '@/components/TodaysTraining';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';

export default function TabOneScreen() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const currentColorScheme = colorScheme || 'dark'

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`You can do\nbetter today ✌️\nwith your goals`}</Text>
      <UpcomingEvents />
      <TodaysTraining />
      <TouchableOpacity
        onPress={() => router.push('/training')}
        activeOpacity={0.8} style={[styles.startTrainingButton, { backgroundColor: Colors[currentColorScheme].primary }]}>
        <Text style={styles.button}>▶️  Start Training</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    gap: 20
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  button: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  startTrainingButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    padding: 20,
    gap: 20
  }
});
