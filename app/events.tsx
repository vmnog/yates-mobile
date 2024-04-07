import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { TrainingEvent, TrainingEventItem } from '@/components/TrainingEvent';

const EVENTS: TrainingEventItem[] = [
  { title: '👌 Chest & Calves', eventTotalCounter: '3/8', redirectUrl: '/events' },
  { title: '🏋️ Back & Abs', eventTotalCounter: '2/8', redirectUrl: '/events' },
  { title: '😴 Rest Day 1', eventTotalCounter: '5/16', redirectUrl: '/events' },
  { title: '🦵 Legs & Calves', eventTotalCounter: '4/8', redirectUrl: '/events' },
  { title: '🤷 Shoulder & Abs', eventTotalCounter: '3/8', redirectUrl: '/events' },
  { title: '💪 Arms & Calves', eventTotalCounter: '7/8', redirectUrl: '/events' },
  { title: '😴 Rest Day 2', eventTotalCounter: '4/16', redirectUrl: '/events' },
]

export default function TabOneEventsScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Upcoming Events...</Text>
        {EVENTS.map(event => (
          <TrainingEvent key={event.title} event={event} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    padding: 20,
    gap: 20
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 40
  }
});
