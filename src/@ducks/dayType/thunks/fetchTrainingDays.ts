import kymFetch from '@libs/kym-fetch';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { LoadStatus } from '@typedefs/Async';

const fetchTrainingDaysThunk = createAsyncThunk(
  'days/fetchTrainingDays',
  async () => {
    const res = await kymFetch.get('/api/day/v1/days');

    let resData = {};
    if (res.ok) resData = await res.json();

    const data = Object.fromEntries(
      Object.entries<boolean>(resData).map(([date, isTraining]) => {
        return [date, { isTraining, loadStatus: 'succeeded' as LoadStatus }];
      })
    )

    return { ok: res.ok, data };
  }
);

export default fetchTrainingDaysThunk;