import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

interface Exercise {
  title: string;
  isCompleted: boolean;
}

interface Serie {
  id: number;
  reps: number;
  weight: number;
  hasImproved: boolean;
  hasWorsed: boolean;
}

type LastSerie = Omit<Serie, 'hasImproved' | 'hasWorsed'>

interface Workout {
  id: number;
  exercise: Exercise;
  series: Serie[]
  seriesLastTraining: LastSerie[]
}


const DEFAULT_WORKOUT: Workout[] = [
  {
    id: 1,
    exercise: {
      title: 'Remada Curvada c/ barra',
      isCompleted: true
    },
    series: [
      {
        id: 1,
        reps: 16,
        weight: 10,
        hasImproved: true,
        hasWorsed: false,
      },
      {
        id: 2,
        reps: 13,
        weight: 20,
        hasImproved: true,
        hasWorsed: false,
      },
      {
        id: 3,
        reps: 10,
        weight: 20,
        hasImproved: false,
        hasWorsed: false,
      },
      {
        id: 4,
        reps: 9,
        weight: 20,
        hasImproved: false,
        hasWorsed: true,
      },

    ],
    seriesLastTraining: [
      {
        id: 1,
        reps: 15,
        weight: 10
      },
      {
        id: 2,
        reps: 12,
        weight: 20
      },
      {
        id: 3,
        reps: 10,
        weight: 20
      },
      {
        id: 4,
        reps: 10,
        weight: 20
      },
    ]
  },
  {
    id: 2,
    exercise: {
      title: 'Supino Reto',
      isCompleted: false
    },
    series: [],
    seriesLastTraining: [
      {
        id: 1,
        reps: 12,
        weight: 40
      },
      {
        id: 2,
        reps: 10,
        weight: 50
      },
      {
        id: 3,
        reps: 8,
        weight: 60
      },
    ]
  },
  {
    id: 3,
    exercise: {
      title: 'Leg Press',
      isCompleted: false
    },
    series: [],
    seriesLastTraining: [
      {
        id: 1,
        reps: 15,
        weight: 100
      },
      {
        id: 2,
        reps: 12,
        weight: 120
      },
      {
        id: 3,
        reps: 10,
        weight: 140
      },
    ]
  },
  {
    id: 4,
    exercise: {
      title: 'Agachamento Livre',
      isCompleted: false
    },
    series: [],
    seriesLastTraining: [
      {
        id: 1,
        reps: 15,
        weight: 50
      },
      {
        id: 2,
        reps: 12,
        weight: 70
      },
      {
        id: 3,
        reps: 10,
        weight: 90
      },
    ]
  },
  {
    id: 5,
    exercise: {
      title: 'Tríceps na Polia',
      isCompleted: false
    },
    series: [],
    seriesLastTraining: [
      {
        id: 1,
        reps: 15,
        weight: 20
      },
      {
        id: 2,
        reps: 12,
        weight: 25
      },
      {
        id: 3,
        reps: 10,
        weight: 30
      },
    ]
  },
  {
    id: 6,
    exercise: {
      title: 'Elevação Lateral',
      isCompleted: false
    },
    series: [],
    seriesLastTraining: [
      {
        id: 1,
        reps: 15,
        weight: 5
      },
      {
        id: 2,
        reps: 12,
        weight: 7.5
      },
      {
        id: 3,
        reps: 10,
        weight: 10
      },
    ]
  },
  {
    id: 7,
    exercise: {
      title: 'Rosca Direta',
      isCompleted: false
    },
    series: [],
    seriesLastTraining: [
      {
        id: 1,
        reps: 15,
        weight: 20
      },
      {
        id: 2,
        reps: 12,
        weight: 25
      },
      {
        id: 3,
        reps: 10,
        weight: 30
      },
    ]
  }
]

export default function TabOneTraningScreen() {
  const [workouts, setWorkouts] = useState<Workout[]>(DEFAULT_WORKOUT)
  const [currentEditingExecution, setCurrentEditingExecution] = useState<Serie['id']>(0)

  const updateSerie = (serieId: Serie['id'], repsOrWeight: 'reps' | 'weight', increaseOrDecrease: 'increase' | 'decrease') => {
    // Make a deep copy of the workouts array to safely modify it
    const updatedWorkouts = workouts.map(workout => ({
      ...workout,
      series: workout.series.map(serie => {
        // Check if this is the serie we need to update
        if (serie.id === serieId) {
          let newValue;
          // Determine the new value based on the operation
          if (repsOrWeight === 'reps') {
            newValue = increaseOrDecrease === 'increase' ? serie.reps + 1 : Math.max(0, serie.reps - 1);
          } else { // 'weight'
            newValue = increaseOrDecrease === 'increase' ? serie.weight + 1 : Math.max(0, serie.weight - 5); // Adjust the 5 unit as needed
          }

          // Determine if there has been improvement or worsening based on last training
          const lastSerie = workout.seriesLastTraining.find(s => s.id === serieId);
          let hasImproved = false, hasWorsed = false;
          if (lastSerie) {
            if (repsOrWeight === 'reps') {
              hasImproved = newValue > lastSerie.reps;
              hasWorsed = newValue < lastSerie.reps;
            } else { // 'weight'
              hasImproved = newValue > lastSerie.weight;
              hasWorsed = newValue < lastSerie.weight;
            }
          }

          // Return the updated serie
          const newSerieExecution = {
            ...serie,
            reps: repsOrWeight === 'reps' ? newValue : serie.reps,
            weight: repsOrWeight === 'weight' ? newValue : serie.weight,
            hasImproved,
            hasWorsed
          };
          return newSerieExecution
        }
        // Return the serie unchanged if it's not the one we're updating
        return serie;
      })
    }));

    // Update the workouts state
    setWorkouts(updatedWorkouts);
  };

  const toggleCompletedExercise = (workoutId: Workout['id']) => {
    const updatedWorkouts = workouts.map(workout => {
      if (workoutId === workout.id) {
        return {
          ...workout,
          exercise: {
            ...workout.exercise,
            isCompleted: !workout.exercise.isCompleted
          }
        }
      }

      return workout
    })

    setWorkouts(updatedWorkouts)
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity activeOpacity={1} style={styles.scrollViewContainer} onPress={() => setCurrentEditingExecution(0)}>
          <View style={styles.header}>
            <Text style={styles.title}>🏋️ Back & Abs</Text>
            <Text style={styles.subtitle}>⏰ Mon 18 - 15:00 (60min)</Text>
            <Text style={styles.subtitle}>Peso corporal: 80kg ✏️</Text>
          </View>
          {workouts.map((workout) => (
            <View key={workout.id} style={styles.seriesExercise}>
              <TouchableOpacity onPress={() => toggleCompletedExercise(workout.id)}>
                <Text style={styles.serieTitle}>
                  {workout.exercise.isCompleted ? '✅' : '⏰'}
                  {' '}
                  {workout.exercise.title}
                </Text>
              </TouchableOpacity>
              {workout.seriesLastTraining.map((lastSerie, index) => {
                return workout.series[index]?.id === currentEditingExecution ? (
                  <View style={styles.executionActions}>
                    <TouchableOpacity
                      onPress={() => updateSerie(workout.series[index]?.id, 'reps', 'decrease')}
                      style={[styles.executionButton, styles.decreaseButton]}>
                      <FontAwesome name='minus' color="white" />
                    </TouchableOpacity>

                    <Text style={workout.series[index] ? styles.serieExecution : styles.serieExecutionNotExecuted}>
                      {workout.series[index].reps}x
                    </Text>

                    <TouchableOpacity
                      onPress={() => updateSerie(workout.series[index]?.id, 'reps', 'increase')}
                      style={[styles.executionButton, styles.increaseButton]}>
                      <FontAwesome name='plus' color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => updateSerie(workout.series[index]?.id, 'weight', 'decrease')}
                      style={[styles.executionButton, styles.decreaseButton]}>
                      <FontAwesome name='minus' color="white" />
                    </TouchableOpacity>

                    <Text style={workout.series[index] ? styles.serieExecution : styles.serieExecutionNotExecuted}>
                      {workout.series[index].weight}kg
                    </Text>

                    <TouchableOpacity
                      onPress={() => updateSerie(workout.series[index]?.id, 'weight', 'increase')}
                      style={[styles.executionButton, styles.increaseButton]}>
                      <FontAwesome name='plus' color="white" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity key={lastSerie.id} onPress={() => setCurrentEditingExecution(workout.series[index].id)} disabled={!workout.series[index]}>
                    <Text style={workout.series[index] ? styles.serieExecution : styles.serieExecutionNotExecuted}>
                      {workout.series[index] && `${workout.series[index].reps}x ${workout.series[index].weight}kg`}
                      {!workout.series[index] && `${lastSerie.reps}x ${lastSerie.weight}kg`}

                      {' '}
                      {workout.series[index] && workout.series[index].hasImproved && '🔥'}
                      {workout.series[index] && workout.series[index].hasWorsed && '👎'}
                      {workout.series[index] && !workout.series[index].hasWorsed && !workout.series[index].hasImproved && '     '}
                      {workout.series[index] && '    ✏️'}
                    </Text>
                  </TouchableOpacity>
                )
              }
              )}
            </View>
          ))}
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.actionsContainer}>
        <TouchableOpacity activeOpacity={0.7} style={[styles.actionsButton, styles.finishButton]}>
          <Text style={styles.actionButtonText}>Finish</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={[styles.actionsButton, styles.restButton]}>
          <Text style={styles.actionButtonText}>😪 Rest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const actionsHeight = 100

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: actionsHeight,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  actionsButton: {
    width: '50%',
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue'
  },
  finishButton: {
    backgroundColor: '#E71D36'
  },
  restButton: {
    backgroundColor: '#7EB77F'
  },
  actionButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollViewContainer: {
    padding: 20,
    paddingBottom: 80 + actionsHeight,
    gap: 40,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seriesExercise: {
    gap: 10
  },
  serieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  serieExecution: {
    fontSize: 18,
    color: Colors.dark.text
  },
  serieExecutionNotExecuted: {
    fontSize: 18,
    opacity: 0.4
  },
  executionActions: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center'
  },
  executionButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14
  },
  increaseButton: {
    backgroundColor: '#7EB77F',
  },
  decreaseButton: {
    backgroundColor: '#E71D36'
  }
});
