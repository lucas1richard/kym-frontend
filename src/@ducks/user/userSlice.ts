import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { LoadStatus } from '@typedefs/Async';
import {
  signinWithCredentialsThunk,
  signinWithTokenThunk,
} from './thunks';



// Define a type for the slice state
interface UserState {
  loadStatus: LoadStatus;
}

// Define the initial state using that type
const initialState: UserState = {
  loadStatus: 'idle',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
    },
    setLoadStatus: (state, action: PayloadAction<LoadStatus>) => {
      state.loadStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signinWithCredentialsThunk.pending, (state) => {
      state.loadStatus = 'pending';
    });
    builder.addCase(signinWithTokenThunk.pending, (state) => {
      state.loadStatus = 'pending';
    });
    builder.addCase(signinWithCredentialsThunk.rejected, (state) => {
      state.loadStatus = 'rejected';
    });
    builder.addCase(signinWithTokenThunk.rejected, (state) => {
      state.loadStatus = 'rejected';
    });
    builder.addCase(signinWithCredentialsThunk.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload.ok) {
        return { ...action.payload.data.user, loadStatus: 'succeeded' }
      }
      else state.loadStatus = 'unauthorized';
    });
    builder.addCase(signinWithTokenThunk.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload.ok) {
        return { ...action.payload.data, loadStatus: 'succeeded' }
      }
      else state.loadStatus = 'unauthorized';
    });
  },
})

export const { updateUser, setLoadStatus } = userSlice.actions

export default userSlice;