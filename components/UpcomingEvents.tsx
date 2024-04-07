import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';
import { TrainingEvent, TrainingEventItem } from './TrainingEvent';

const NEXT_TRAINING: TrainingEventItem = {
  title: '💪 Chest & Calves',
  eventTotalCounter: '2/7',
  redirectUrl: '/events'
}

export function UpcomingEvents() {
  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>Upcoming events</Text>
      <TrainingEvent event={NEXT_TRAINING} />
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
