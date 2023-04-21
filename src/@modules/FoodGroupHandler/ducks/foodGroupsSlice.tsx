import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { FoodGroup } from '@typedefs';

const foodGroupAdapter = createEntityAdapter<FoodGroup>({
  selectId: (group) => group.groupid,
  sortComparer: (a, b) => a.groupid - b.groupid,
})

export const foodGroupSlice = createSlice({
  name: 'foodGroups',
  initialState: foodGroupAdapter.getInitialState(),
  reducers: {
    addFoodGroups: foodGroupAdapter.upsertMany,
  },
});

export const { addFoodGroups } = foodGroupSlice.actions

export default foodGroupSlice;
