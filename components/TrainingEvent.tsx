import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Text } from './Themed';
import { Href, useRouter } from 'expo-router';
import Colors from '@/constants/Colors';

export interface TrainingEventItem {
  title: string
  eventTotalCounter: string
  redirectUrl: Href<string>
}

interface TrainingEventProps {
  event: TrainingEventItem
}

export function TrainingEvent({ event }: TrainingEventProps) {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const currentColorScheme = colorScheme || 'dark'

  return (
    <TouchableOpacity
      onPress={() => router.push(event.redirectUrl)}
      activeOpacity={0.8}
      style={[
        styles.eventContainer,
        { backgroundColor: Colors[currentColorScheme].primary }]}
    >
      <Text style={styles.eventTitle}>{event.title}</Text>
      <Text style={styles.eventTitle}>{event.eventTotalCounter}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
