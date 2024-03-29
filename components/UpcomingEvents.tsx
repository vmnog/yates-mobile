import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Text, View } from './Themed';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';

export function UpcomingEvents() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const currentColorScheme = colorScheme || 'dark'

  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>Upcoming events</Text>
      <TouchableOpacity
        onPress={() => router.push('/events')}
        activeOpacity={0.8}
        style={[
          styles.eventContainer,
          { backgroundColor: Colors[currentColorScheme].primary }]}
      >
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
    gap: 20,
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
    borderRadius: 14,
    paddingHorizontal: 40,
    paddingVertical: 30
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
