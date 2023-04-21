import { getAbbrev } from '@ducks/abbrev/selectors';
import type { RootState } from '@ducks/store';
import { FoodRecordAdderState } from './foodRecordAdderSlice';

type StateWithFoodRecordAdder = RootState & { foodRecordAdder?: FoodRecordAdderState };

export const selectSearchedIds = (state: StateWithFoodRecordAdder) => (
  state.foodRecordAdder?.searchedIds || []
);

export const selectSearchedAbbrevs = (state: StateWithFoodRecordAdder) => {
  const searchedIds = selectSearchedIds(state);
  return searchedIds.map((id) => getAbbrev(state, id));
};

export const selectTotalCount = (state: StateWithFoodRecordAdder) => (
  state.foodRecordAdder?.totalCount ?? 0
);

export const selectOffset = (state: StateWithFoodRecordAdder) => (
  state.foodRecordAdder?.offset ?? 0
);
export const selectQuery = (state: StateWithFoodRecordAdder) => (
  state.foodRecordAdder?.query ?? ''
  );
export const selectSearchLoadStatus = (state: StateWithFoodRecordAdder) => (
  state.foodRecordAdder?.searchLoadStatus ?? 'idle'
);
export const selectCreateRecordLoadStatus = (state: StateWithFoodRecordAdder) => (
  state.foodRecordAdder?.createRecordLoadStatus ?? 'idle'
);
