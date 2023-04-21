import { abbrevAdapter } from './abbrevSlice';
import { createSelector } from 'reselect';
import type { RootState } from '../store';

export const getAbbrevState = createSelector([(state: RootState) => state.abbrevs], (abbrevs) => abbrevs);
export const getAbbrev = (state: RootState, id: number) => abbrevAdapter
  .getSelectors<RootState>(state => state.abbrevs)
  .selectById(state, id);

