export const DEFAULT_WORKOUT = [
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
      // {
      //   id: 4,
      //   reps: 9,
      //   weight: 20,
      //   hasImproved: false,
      //   hasWorsed: true,
      // },
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
        id: 5,
        reps: 12,
        weight: 40
      },
      {
        id: 6,
        reps: 10,
        weight: 50
      },
      {
        id: 7,
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
        id: 8,
        reps: 15,
        weight: 100
      },
      {
        id: 9,
        reps: 12,
        weight: 120
      },
      {
        id: 10,
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
        id: 11,
        reps: 15,
        weight: 50
      },
      {
        id: 12,
        reps: 12,
        weight: 70
      },
      {
        id: 13,
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
        id: 14,
        reps: 15,
        weight: 20
      },
      {
        id: 15,
        reps: 12,
        weight: 25
      },
      {
        id: 16,
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
        id: 17,
        reps: 15,
        weight: 5
      },
      {
        id: 18,
        reps: 12,
        weight: 7.5
      },
      {
        id: 19,
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
        id: 20,
        reps: 15,
        weight: 20
      },
      {
        id: 21,
        reps: 12,
        weight: 25
      },
      {
        id: 22,
        reps: 10,
        weight: 30
      },
    ]
  }
]

export const DEFAULT_TRAINING = {
  name: '🏋️ Back & Abs',
  date: '⏰ Mon 18 - 15:00(60min)',
  currentWeight: 80
}

