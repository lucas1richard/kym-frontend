import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
interface ConfigState {
  value: number
}

// Define the initial state using that type
const initialState: ConfigState = {
  value: 0,
}

export const otherConfigSlice = createSlice({
  name: 'otherconfig',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = otherConfigSlice.actions

const configReducer = otherConfigSlice.reducer;

export default configReducer;
