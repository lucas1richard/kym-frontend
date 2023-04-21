import { FoodGroup } from './FoodGroup.d';
import { FoodDesc } from './FoodDesc.d';
import { AbbrevMicro } from './AbbrevMicro.d';
import { Weight } from './Weight.d';

export interface AbbrevScopes {
  withMicro?: any,
  withFoodDesc?: any,
  withFoodGroup?: any,
  withWeight?: any,
}
export enum AbbrevScopesEnum {
  withMicro,
  withFoodDes,
  withFoodGroup,
  withWeight,
}

export type Abbrev<B = {}> = {
  id: number;
  user_uuid?: string;
  main: string;
  sub: string;
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
  gmwt_1: number;
  gmwt_desc1: string;
  gmwt_2?: number;
  gmwt_desc2?: string;
  photo?: string;
  foodgroup_id: number;
}
  & (B extends { withWeight: true } ? { weights: Weight[] } : {})
  & (B extends { withFoodDes: true } ? { foodDesc: FoodDesc } : {})
  & (B extends { withMicro: true } ? { abbrevMicro: AbbrevMicro; } : {})
  & (B extends { withFoodGroup: true } ? { foodGroup: FoodGroup; } : {});