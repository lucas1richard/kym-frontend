import { FoodRecord } from './FoodRecord.d';
export type Meal<B = {}> = {
  date: string;
  meal: number;
  public: boolean;
  postWorkout: boolean;
  uuid: string;
}
  & (B extends { withRecord: true } ? { record: FoodRecord<{ withMacros: true }>} : {});