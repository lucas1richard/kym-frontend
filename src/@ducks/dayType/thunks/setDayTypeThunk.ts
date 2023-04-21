import kymFetch from '@libs/kym-fetch';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { LoadStatus } from '@typedefs/Async';

const setDayTypeThunk = createAsyncThunk(
  'dayType/setDayType',
  async ({ date, isTraining }: { date: string, isTraining: boolean }) => {
    const res = await kymFetch.post('/api/day/v1/days', { [date]: isTraining });
    let data;
    if (res.ok) data = await res.json();

    return {
      ok: res.ok,
      data: {
        [date]: {
          isTraining,
          loadStatus: 'succeeded' as LoadStatus,
        },
      }
    };
  }
);

export default setDayTypeThunk;
