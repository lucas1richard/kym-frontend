import { MealGoals } from './MealGoals.d';
import { Program } from './Program.d';
import { UserMeasurements } from './UserMeasurements';

export type UserSanitized = {
  id?: number;
  uuid: string;
  firstname: string;
  lastname: string;
  preferredlocale: string;
  username?: string;
  email: string;
  birthdate: string;
};

export type User = UserSanitized & {
  password: string;
  salt: string;
  createdAt?: string;
  updatedAt?: string;
  googleId?: string;
  fitbitId?: string;
  fitbitToken?: string;
  fitbitRefreshToken?: string;
};

export type UserRichData = User & {
  userMeasurements: UserMeasurements[];
  mealGoals: MealGoals[];
  programs: Program[];
};

export type UserRichDataSanitized = UserSanitized & {
  userMeasurements: UserMeasurements[];
  mealGoals: MealGoals[];
  programs: Program[];
};
