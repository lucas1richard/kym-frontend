import kymFetch from '@libs/kym-fetch';
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
  async (data: AddFoodRecordArg[]) => {
    await kymFetch.post('/api/food-record/v1/record', data);
  }
);

export default createFoodRecordThunk;
