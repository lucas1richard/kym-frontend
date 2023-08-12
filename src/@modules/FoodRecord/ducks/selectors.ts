import type { RootState } from '@ducks/store';
import { FoodRecord } from '@typedefs';
import { createSelector } from 'reselect';
import foodRecordSlice, { FoodRecordState } from './foodRecordSlice';

type StateWithFoodRecord = RootState & { foodRecord?: FoodRecordState };

export const getFoodRecordState = createSelector(
  [(state: StateWithFoodRecord) => state.foodRecord],
  (foodRecord) => foodRecord || foodRecordSlice.getInitialState()
);

export const selectFoodRecordDate = createSelector(
  [
    getFoodRecordState,
    (_, date: string) => date,
  ],
  (state, date) => {
    return state.record?.[date] ?? { loadStatus: 'pending' };
  }
);

export const selectFoodRecord = createSelector(
  [
    getFoodRecordState,
    (_, date: string) => date,
  ],
  (state, date) => {
    return state.record?.[date]?.items ?? [];
  }
);

export const selectFoodRecordLoadStatus = createSelector(
  [
    getFoodRecordState,
    (_, date: string) => date,
  ],
  (state, date) => {
    return state.record?.[date]?.loadStatus ?? 'idle';
  }
);

export const selectMeal = (recordItem: FoodRecord<{ withMacros: true }>) => recordItem?.meal;
