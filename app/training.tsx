import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from '@/components/Themed';
import { useState } from 'react';
import { TrainingResume } from '@/components/TrainingResume';
import { WorkoutTitle } from '@/components/WorkoutTitle';
import { Serie, Workout } from './api/dtos';
import { ExecutionWhileEditing } from '@/components/ExecutionActions';
import { DEFAULT_TRAINING, DEFAULT_WORKOUT } from './api/mocks';
import { ExecutionItem } from '@/components/LastSerie';

export default function TabOneTraningScreen() {
  const [workouts, setWorkouts] = useState<Workout[]>(DEFAULT_WORKOUT)
  const [currentEditingExecution, setCurrentEditingExecution] = useState<Serie['id']>(0)

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity activeOpacity={1} style={styles.scrollViewContainer} onPress={() => setCurrentEditingExecution(0)}>
          <TrainingResume training={DEFAULT_TRAINING} />
          <Text style={styles.iconsInfoText}>🔥 better  / 👎 worse / 🙂 equal</Text>
          {workouts.map((workout) => (
            <View key={workout.id} style={styles.seriesExercise}>
              <WorkoutTitle
                workout={workout}
                workouts={workouts}
                setWorkouts={setWorkouts}
              />
              {workout.seriesLastTraining.map((lastSerie, index) => {
                return workout.series[index]?.id === currentEditingExecution ? (
                  <ExecutionWhileEditing
                    key={lastSerie.id}
                    lastSerie={lastSerie}
                    currentSerie={workout.series[index]}
                    workouts={workouts}
                    setWorkouts={setWorkouts}
                  />
                ) : (
                  <ExecutionItem
                    key={lastSerie.id}
                    lastSerie={lastSerie}
                    currentSerie={workout.series[index]}
                    setEditing={setCurrentEditingExecution}
                  />
                )
              }
              )}
            </View>
          ))}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export const actionsHeight = 100

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    padding: 20,
    paddingBottom: 80 + actionsHeight,
    gap: 40,
  },
  seriesExercise: {
    gap: 10
  },
  iconsInfoText: {
    fontSize: 16,
    textAlign: 'center'
  }
});
