import kymFetch from '@libs/kym-fetch';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FoodRecord } from '@typedefs';

type FetchRecordsThunkArg = {
  date: string;
}

const fetchFoodRecordsThunk = createAsyncThunk(
  'foodRecord/fetchRecordsByDate',
    async ({ date }: FetchRecordsThunkArg) => {
      const res = await kymFetch.get(`/api/food-record/v1/${date}`);

      let data: FoodRecord<{ withMacros: true }>[] = [];
      if (res.ok) data = await res.json();

      return { ok: res.ok, data, date };
    }
);

export default fetchFoodRecordsThunk;
