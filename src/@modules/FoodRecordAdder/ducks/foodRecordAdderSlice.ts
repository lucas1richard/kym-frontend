import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadStatus } from '@typedefs/Async';
import createFoodRecordThunk from './thunks/createFoodRecordThunk';

export type FoodRecordAdderState = {
  searchedIds: number[];
  offset: number;
  query: string;
  totalCount: number;
  searchLoadStatus: LoadStatus;
  createRecordLoadStatus: LoadStatus;
};

const initialState: FoodRecordAdderState = {
  searchLoadStatus: 'idle',
  createRecordLoadStatus: 'idle',
  searchedIds: [],
  offset: 0,
  query: '',
  totalCount: 0,
};

const foodRecordAdderSlice = createSlice({
  name: 'foodRecordAdder',
  initialState,
  reducers: {
    setSearchIds: (state, action) => { state.searchedIds = action.payload; },
    setFoodRecordAdderState: (state, action: PayloadAction<Partial<FoodRecordAdderState>>) => ({
      ...state,
      ...action.payload,
    }),
  },
  extraReducers(builder) {
    builder.addCase(createFoodRecordThunk.pending, (state) => {
      state.createRecordLoadStatus = 'pending';
    });
    builder.addCase(createFoodRecordThunk.fulfilled, (state) => {
      state.createRecordLoadStatus = 'succeeded';
    });
    builder.addCase(createFoodRecordThunk.rejected, (state) => {
      state.createRecordLoadStatus = 'rejected';
    });
  },
});

export const {
  setSearchIds,
  setFoodRecordAdderState,
} = foodRecordAdderSlice.actions;

export default foodRecordAdderSlice;
