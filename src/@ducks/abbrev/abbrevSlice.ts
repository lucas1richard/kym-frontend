import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import type { Abbrev } from '@typedefs';
import fetchAbbrevsThunk from './thunks/fetchAbbrevsThunk';
import fetchFoodRecordsThunk from '@modules/FoodRecord/ducks/thunks/fetchFoodRecordsThunk';

export const abbrevAdapter = createEntityAdapter<Abbrev<{ withWeight: true }>>({
  selectId: (abbrev) => abbrev.id,
  sortComparer: (a, b) => a.id - b.id,
})

export const abbrevSlice = createSlice({
  name: 'abbrevs',
  initialState: abbrevAdapter.getInitialState(),
  reducers: {
    addAbbrevs: abbrevAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAbbrevsThunk.fulfilled, (state, { payload }) => {
      abbrevAdapter.addMany(state, Object.values(payload.data.abbrevs));
    });
    builder.addCase(fetchFoodRecordsThunk.fulfilled, (state, action) => {
      abbrevAdapter.addMany(state, action.payload.data.map(({ abbrev }) => abbrev));
    })
  },
});

export const { addAbbrevs } = abbrevSlice.actions

export default abbrevSlice;
