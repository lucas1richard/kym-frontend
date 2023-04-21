import { FoodGroup } from './FoodGroup.d';

export type FoodDesc<FG = {}> = {
  id: number;
  abbrev_id: number;
  Long_Desc: string;
  Short_Desc: string;
  ComName: string;
  ManufacName: string;
  Survey: string;
  Ref_desc: string;
  Refuse?: number;
  SciName: string;
  N_Factor: number;
  Pro_Factor: number;
  Fat_Factor: number;
  CHO_Factor: number;
}
  & (FG extends { withFoodGroup: true } ? { foodGroup: FoodGroup } : {});
