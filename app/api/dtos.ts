export interface Exercise {
  title: string;
  status: 'done' | 'waiting' | 'cancelled'
}

export interface Serie {
  id: number;
  reps: number;
  weight: number;
  hasImproved: boolean;
  hasWorsed: boolean;
}

export type LastSerie = Omit<Serie, 'hasImproved' | 'hasWorsed'>

export interface Workout {
  id: number;
  exercise: Exercise;
  series: Serie[]
  seriesLastTraining: LastSerie[]
}

