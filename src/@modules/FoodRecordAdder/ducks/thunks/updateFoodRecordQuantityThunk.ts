import kymFetch from '@libs/kym-fetch';
import { setRecordDateLoading } from '@modules/FoodRecord/ducks/foodRecordSlice';
import fetchFoodRecordsThunk from '@modules/FoodRecord/ducks/thunks/fetchFoodRecordsThunk';
import { createAsyncThunk } from '@reduxjs/toolkit';

export type UpdateFoodRecordQuantityArg = {
  date: string;
  id: number;
  seq: string;
  quantity: number;
};

const updateFoodRecordQuantityThunk = createAsyncThunk(
  'foodRecordAdder/updateFoodRecordQuantity',
  async (data: UpdateFoodRecordQuantityArg, { dispatch }) => {
    const { date, id, seq, quantity } = data;
    dispatch(setRecordDateLoading({ date }));
    const response = await kymFetch.put('/api/food-record/v1/quantity', { id, seq, quantity });
    dispatch(fetchFoodRecordsThunk({ date }));
    return (await response.json());
  }
);

export default updateFoodRecordQuantityThunk;