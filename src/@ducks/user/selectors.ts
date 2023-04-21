import type { RootState } from '@ducks/store';

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;
export const getUserLoadStatus = (state: RootState) => state.user.loadStatus;