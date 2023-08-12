import kymFetch from '@libs/kym-fetch';
import { setRecordDateLoading } from '@modules/FoodRecord/ducks/foodRecordSlice';
import fetchFoodRecordsThunk from '@modules/FoodRecord/ducks/thunks/fetchFoodRecordsThunk';
import { createAsyncThunk } from '@reduxjs/toolkit';

export type AddFoodRecordArg = {
  abbrevId: number;
  date: string;
  meal: number;
  quantity: number;
  unit: string;
  confirmed?: boolean;
};

const createFoodRecordThunk = createAsyncThunk(
  'foodRecordAdder/createFoodRecord',
  async (data: AddFoodRecordArg[], { dispatch }) => {
    const date = data[0].date;
    dispatch(setRecordDateLoading({ date }));
    const response = await kymFetch.post('/api/food-record/v1/record', data);
    dispatch(fetchFoodRecordsThunk({ date }));
    return (await response.json());
  }
);

export default createFoodRecordThunk;
