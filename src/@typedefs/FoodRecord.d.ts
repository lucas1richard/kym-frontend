import { Abbrev } from './Abbrev.d';
export type FoodRecord<B = {}> = {
  id: number;
  date: string;
  meal: number;
  quantity: number;
  unit: number;
  seq: number;
  fromprogram: boolean;
  confirmed: boolean;
  user_uuid: string;
  abbrev_id: number;
}
  & (B extends { withMacros }
    ? (
      Abbrev<{ withWeight: true }> & {
        abbrev: Abbrev<{ withWeight: true }>;
        unit: string;
        gr: number;
        calories: number;
        protein: number;
        carbohydrates: number;
        fat: number;
      }
    )
    : {});