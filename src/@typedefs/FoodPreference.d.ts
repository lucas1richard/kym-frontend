export type FoodPreference = {
  user_uuid: string;
  abbrev_id: number;
  preference: 'LIKE' | 'DISLIKE',
};
