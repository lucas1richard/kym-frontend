import dayType from './dayTypeSlice';
import { createSelector } from 'reselect';
import type { RootState } from '../store';

export const getDayTypeState = createSelector(
  [(state: RootState) => state.dayTypes],
  (dayTypes) => dayTypes
);

export const selectDayType = createSelector(
  [
    getDayTypeState,
    (_: RootState, date: string) => date,
  ],
  (dayTypes, date) => dayTypes[date]?.isTraining ?? false
);

export const selectDayTypeLoadStatus = createSelector(
  [
    getDayTypeState,
    (_: RootState, date: string) => date,
  ],
  (dayTypes, date) => dayTypes[date]?.loadStatus ?? 'idle'
);
