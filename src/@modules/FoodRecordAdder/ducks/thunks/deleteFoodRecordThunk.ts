import kymFetch from '@libs/kym-fetch';
import { setRecordDateLoading } from '@modules/FoodRecord/ducks/foodRecordSlice';
import fetchFoodRecordsThunk from '@modules/FoodRecord/ducks/thunks/fetchFoodRecordsThunk';
import { createAsyncThunk } from '@reduxjs/toolkit';

export type DeleteFoodRecordArg = {
  ids: number[];
  date: string;
};

const deleteFoodRecordThunk = createAsyncThunk(
  'foodRecordAdder/deleteFoodRecord',
  async (data: DeleteFoodRecordArg, { dispatch }) => {
    const { date } = data;
    dispatch(setRecordDateLoading({ date }));
    const response = await kymFetch.delete('/api/food-record/v1/record', data);
    dispatch(fetchFoodRecordsThunk({ date }));
    return (await response.json());
  }
);

export default deleteFoodRecordThunk;