export type MealGoals = {
  id: number;
  goals: {
    TRAIN: { protein: number, carbs: number, fat: number }[],
    REST: { protein: number, carbs: number, fat: number }[]
  };
};