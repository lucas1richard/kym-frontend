import type { LoadStatus } from '@typedefs/Async.d';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import fetchTrainingDays from './thunks/fetchTrainingDays';
import setDayTypeThunk from './thunks/setDayTypeThunk';
import dayjs from 'dayjs';

interface DayType {
  loadStatus: LoadStatus;
  isTraining: boolean;
}

interface DayTypeState {
  [k: string]: DayType;
}

const initialState: DayTypeState = {
  [dayjs().format('YYYY-MM-DD')]: {
    loadStatus: 'pending',
    isTraining: false,
  }
};

export const dayType = createSlice({
  name: 'dayTypes',
  initialState,
  reducers: {
    addTrainingDays: (state, action: PayloadAction<DayTypeState>) => {
      const { payload } = action;
      return { ...state, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTrainingDays.fulfilled, (state, action: PayloadAction<{ ok: boolean; data: DayTypeState }>) => {
      const { payload } = action;
      return {
        ...state,
        [dayjs().format('YYYY-MM-DD')]: {
          ...state[dayjs().format('YYYY-MM-DD')],
          loadStatus: 'succeeded'
        },
        ...payload.data,
      };
    });
    builder.addCase(fetchTrainingDays.rejected, (state, action) => {
      return {
        ...state,
        [dayjs().format('YYYY-MM-DD')]: {
          ...state[dayjs().format('YYYY-MM-DD')],
          loadStatus: 'rejected'
        },
      };
    });
    builder.addCase(setDayTypeThunk.pending, (state, action) => {
      const { meta } = action;
      const { arg } = meta;
      if (!arg) return state;
      if (!state[arg.date]) state[arg.date] = { loadStatus: 'pending', isTraining: false };
      state[arg.date] = { ...state[arg.date], loadStatus: 'pending' };
    });
    builder.addCase(setDayTypeThunk.rejected, (state, action) => {
      const { meta } = action;
      const { arg } = meta;
      if (!arg) return state;
      if (!state[arg.date]) state[arg.date] = { loadStatus: 'rejected', isTraining: false };
      state[arg.date] = { ...state[arg.date], loadStatus: 'rejected' };
    });
    builder.addCase(setDayTypeThunk.fulfilled, (state, action: PayloadAction<{ ok: boolean; data: DayTypeState }>) => {
      const { payload } = action;
      console.log(action)
      return {
        ...state,
        [dayjs().format('YYYY-MM-DD')]: {
          ...state[dayjs().format('YYYY-MM-DD')],
          loadStatus: 'succeeded'
        },
        ...payload.data,
      };
    });
  },
});

export const { addTrainingDays } = dayType.actions;

export default dayType;
