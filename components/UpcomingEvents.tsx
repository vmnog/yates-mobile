import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';

export function UpcomingEvents() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming events</Text>
      <TouchableOpacity
        onPress={() => router.push('/events')}
        activeOpacity={0.8} style={styles.eventContainer}>
        <Text style={styles.eventTitle}>💪 Chest & Calves</Text>
        <Text style={styles.eventTitle}>2/7</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign: 'left',
    gap: 20
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start'
  },
  eventContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'left',
    backgroundColor: Colors.dark.primary,
    borderRadius: 14,
    paddingHorizontal: 40,
    paddingVertical: 30
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
