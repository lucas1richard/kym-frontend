import kymFetch from '@libs/kym-fetch';
import { createAsyncThunk } from '@reduxjs/toolkit';

type SigninThunkArg = { email: string, password: string };

const signinWithCredentialsThunk = createAsyncThunk(
  'user/signinWithCredentials',
  async ({ email, password }: SigninThunkArg) => {
    const res = await kymFetch.post('/api/session/v1/signin', {
      email,
      password,
    });

    let data;
    if (res.ok) {
      data = await res.json();
      kymFetch.setHeaders({ token: data.token });
      localStorage.setItem('kymToken', data.token);
    }

    return { ok: res.ok, data };
  }
);

export default signinWithCredentialsThunk;
