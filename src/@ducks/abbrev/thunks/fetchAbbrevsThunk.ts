import kymFetch from '@libs/kym-fetch';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Abbrev } from '@typedefs';

export type FetchAbbrevsThunkArg = { queryString: string, offset: number, limit?: number };
export type FetchAbbrevsData = {
  abbrevs: Abbrev<{withWeight: true}>[];
  totalCount: number;
  count: number;
  offset: number;
  query: string;
};

const fetchAbbrevsThunk = createAsyncThunk(
  'abbrevs/search',
  async ({ queryString, offset, limit }: FetchAbbrevsThunkArg) => {
    const params = new URLSearchParams({ offset: String(offset) });
    
    const res = await kymFetch.post('/api/database/v1/search-detail?' + params, {
      searchVal: queryString,
      limit,
    });

    let data: FetchAbbrevsData = {
      abbrevs: [],
      count: 0,
      totalCount: 0,
      offset: 0,
      query: ''
    };
    if (res.ok) {
      data = await res.json();
    }

    return { ok: res.ok, data };
  }
);

export default fetchAbbrevsThunk;