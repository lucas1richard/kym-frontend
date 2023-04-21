import { abbrevSlice } from './abbrev/abbrevSlice';
import { configSlice } from './configSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query/react';
import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { userSlice } from './user';
import dayType from './dayType/dayTypeSlice';
import exchangeTokenThunk from './user/thunks/exchangeTokenThunk';

const staticReducers = {
  config: configSlice.reducer,
  user: userSlice.reducer,
  abbrevs: abbrevSlice.reducer,
  dayTypes: dayType.reducer,
};

export const store = configureStore({
  reducer: { ...staticReducers },
});

// Add a dictionary to keep track of the registered async reducers
// @ts-ignore
store.asyncReducers = {} as {[key: string]: Reducer<any, any> }

// Create an inject reducer function
// This function adds the async reducer, and creates a new combined reducer
export const injectReducer = (key: string, asyncReducer: Reducer) => {
  // @ts-ignore
  store.asyncReducers[key] = asyncReducer;
  // @ts-ignore
  const combinedReducers = combineReducers({ ...staticReducers, ...store.asyncReducers });
  // @ts-ignore
  store.replaceReducer(combinedReducers);
}

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

const token = localStorage.getItem('kymToken');
if (token) store.dispatch(exchangeTokenThunk(token));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch