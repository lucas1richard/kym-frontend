import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { LoadStatus } from '@typedefs/Async';
import { FoodRecord } from '@typedefs';
import fetchFoodRecordsThunk from './thunks/fetchFoodRecordsThunk';

export interface FoodRecordState {
  record: {
    [date: string]: {
      loadStatus: LoadStatus;
      items: FoodRecord<{ withMacros: true }>[];
    }
  }
}

const initialState: FoodRecordState = {
  record: {},
};

export const foodRecordSlice = createSlice({
  name: 'foodRecord',
  initialState,
  reducers: {
    setRecordDate: (state, action: PayloadAction<{ date: string, data: FoodRecord<{ withMacros: true }>[]}>) => {
      const { payload } = action;
      const { data, date } = payload;
      state.record[date] = {
        items: data,
        loadStatus: 'succeeded',
      };
    },
    setRecordDateLoading: (state, action: PayloadAction<{ date: string }>) => {
      const { payload } = action;
      const { date } = payload;
      state.record[date] = {
        ...state.record[date],
        loadStatus: 'pending',
      };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFoodRecordsThunk.fulfilled, (state, action) => {
      const { payload } = action;
      const { data, date } = payload;
      state.record[date] = {
        items: data,
        loadStatus: 'succeeded',
      };
    });
    builder.addCase(fetchFoodRecordsThunk.rejected, (state, action) => {
      const { meta: { arg } } = action;
      const { date } = arg;
      state.record[date] = {
        ...state.record[date],
        loadStatus: 'rejected',
      };
    });
    builder.addCase(fetchFoodRecordsThunk.pending, (state, action) => {
      const { meta: { arg } } = action;
      const { date } = arg;
      state.record[date] = {
        ...state.record[date],
        loadStatus: 'pending',
      };
    });
  },
});

export const { setRecordDate, setRecordDateLoading } = foodRecordSlice.actions;

export default foodRecordSlice;
