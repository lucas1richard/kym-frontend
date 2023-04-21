import kymFetch from '@libs/kym-fetch';
import { createAsyncThunk } from '@reduxjs/toolkit';

type SigninThunkArg = { email: string, password: string };

const signinWithTokenThunk = createAsyncThunk(
  'user/signinWithToken',
  async (token?: string) => {
    if (token) kymFetch.setHeaders({ token });

    const res = await kymFetch.get('/api/session/v1/token');

    let data;
    if (res.ok) {
      data = await res.json();
    }

    return { ok: res.ok, data };
  }
);

export default signinWithTokenThunk;
