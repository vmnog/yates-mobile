import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function TabOneEventsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Upcoming Events...`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    padding: 20,
    gap: 40
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  }
});
