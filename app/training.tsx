import { Alert, AlertButton, ScrollView, StyleSheet } from 'react-native';
import { View, Text } from '@/components/Themed';
import { useState } from 'react';
import { TrainingResume } from '@/components/TrainingResume';
import { WorkoutTitle } from '@/components/WorkoutTitle';
import { LastSerie, Serie, Workout } from './api/dtos';
import { ExecutionWhileEditing } from '@/components/ExecutionActions';
import { DEFAULT_TRAINING, DEFAULT_WORKOUT } from './api/mocks';
import { ExecutionItem } from '@/components/LastSerie';
import OutsidePressHandler from 'react-native-outside-press';
import { TrainingActionButtons } from '@/components/TrainingActionButtons';

export default function TabOneTraningScreen() {
  const [workouts, setWorkouts] = useState<Workout[]>(DEFAULT_WORKOUT)
  const [currentEditingExecution, setCurrentEditingExecution] = useState<Serie['id']>(0)

  const createSerieFromLastSerie = (lastSerie: LastSerie, workoutIndex: number) => {
    const newWorkouts = workouts.map((item, index) => {
      if (index === workoutIndex) {
        const newSerie = {
          ...lastSerie,
          hasWorsed: false,
          hasImproved: false
        }
        return {
          ...item,
          series: [...item.series, newSerie]
        }
      }

      return item
    })

    setWorkouts(newWorkouts)
  }

  const handleEditExecution = (lastSerie: LastSerie | null, workoutIndex: number) => {
    if (lastSerie === null) {
      setCurrentEditingExecution(0)
      return
    }

    if (!workouts.find(item => item.series.find(serie => serie?.id === lastSerie?.id))) {
      const alertButtons: AlertButton[] = [
        {
          text: 'Cancel',
          isPreferred: false,
          style: 'destructive'
        },
        {
          text: 'Yes',
          onPress: () => createSerieFromLastSerie(lastSerie, workoutIndex),
          isPreferred: true,
          style: 'default'
        },
      ]
      Alert.prompt('Start exercise?', 'Click "Yes" to start', alertButtons, 'default')
      return
    }

    setCurrentEditingExecution(lastSerie.id)
  }

  const deleteSerie = (currentSerie: Serie, workoutIndex: number) => {
    const newSeries = workouts[workoutIndex].series.filter(item => item.id !== currentSerie.id)
    const newWorkouts = workouts.map((item, index) => {
      if (index === workoutIndex) {
        item.series = newSeries
      }

      return item
    })
    setWorkouts(newWorkouts)
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.scrollViewContainer}>
          <TrainingResume training={DEFAULT_TRAINING} />
          <Text style={styles.iconsInfoText}>🔥 better  / 👎 worse / 🙂 equal</Text>
          {workouts.map((workout, workoutIndex) => (
            <View key={workout.id} style={styles.seriesExercise}>
              <WorkoutTitle
                workout={workout}
                workouts={workouts}
                setWorkouts={setWorkouts}
              />
              {workout.seriesLastTraining.map((lastSerie, index) => {
                return workout.series[index]?.id === currentEditingExecution ? (
                  <OutsidePressHandler
                    key={lastSerie.id}
                    onOutsidePress={() => handleEditExecution(null, workoutIndex)}
                  >
                    <ExecutionWhileEditing
                      lastSerie={lastSerie}
                      currentSerie={workout.series[index]}
                      workouts={workouts}
                      setWorkouts={setWorkouts}
                      deleteSerie={deleteSerie}
                      workoutIndex={workoutIndex}
                    />
                  </OutsidePressHandler>
                ) : (
                  <ExecutionItem
                    key={lastSerie.id}
                    lastSerie={lastSerie}
                    currentSerie={workout.series[index]}
                    setEditing={handleEditExecution}
                    workoutIndex={workoutIndex}
                  />
                )
              }
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <TrainingActionButtons />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    padding: 20,
    gap: 40,
  },
  seriesExercise: {
    gap: 10
  },
  iconsInfoText: {
    fontSize: 16,
    textAlign: 'center'
  },
});
