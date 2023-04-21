import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { LoadStatus } from '@typedefs/Async';
import { getLang } from '@libs/kym-toolbox';
import dayjs from 'dayjs';

interface ConfigState {
  lang: string;
  appDate: string;
  loginStatus: LoadStatus;
}

const initialState: ConfigState = {
  lang: getLang(),
  appDate: dayjs().format('YYYY-MM-DD'),
  loginStatus: 'idle',
}

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setAppDate: (state, action: PayloadAction<string>) => {
      state.appDate = action.payload;
    },
    setLoginStatus: (state, action: PayloadAction<LoadStatus>) => {
      state.loginStatus = action.payload;
    },
  },
})

export const { setAppDate, setLoginStatus } = configSlice.actions

export const selectLang = (state: RootState) => state.config.lang;
export const selectAppDate = (state: RootState) => state.config.appDate;

const configReducer = configSlice.reducer;

export default configReducer;
