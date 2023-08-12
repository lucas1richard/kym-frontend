import { FoodRecord } from '@typedefs';

type FoodRecordMacros = FoodRecord<{ withMacros: true }>[];

export const groupFoodRecordByMeals = (foodRecord: FoodRecordMacros = []) => {
  const groupedFoodRecord = foodRecord.reduce<{ [key: number]: FoodRecordMacros }>((acc, food) => {
    const { meal } = food;
    if (!acc[meal]) acc[meal] = [];
    acc[meal].push(food);
    return acc;
  }, { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] });
  return groupedFoodRecord;
};
