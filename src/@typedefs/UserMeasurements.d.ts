export type UserMeasurements = {
  age?: number;
  gender: 'MALE' | 'FEMALE';
  height: number;
  units: 'IMPERIAL' | 'METRIC';
  weight: number;
  bodyfat?: number;
  lifestyle: 'SEDENTARY' | 'NORMAL' | 'ACTIVE';
  goal: 'LOSE_FAT' | 'GAIN_MUSCLE' | 'MAINTAIN';
  date?: string;
  bmrTraditional?: number;
  bmrBodyFat?: number;
};
