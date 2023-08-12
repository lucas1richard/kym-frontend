import { RootState } from './../../store';
import { ThunkAction } from 'redux-thunk';
import { setLoginStatus } from '@ducks/configSlice';
import kymFetch from '@libs/kym-fetch';
import fetchTrainingDaysThunk from '@ducks/dayType/thunks/fetchTrainingDays';
import signinWithTokenThunk from './signinWithTokenThunk';
// import fetchFoodRecordsThunk from '@modules/FoodRecord/ducks/thunks/fetchFoodRecordsThunk';

type ExchangTokenThunkAction = ThunkAction<Promise<void>, RootState, void, any>;

const exchangeTokenThunk = (token: string): ExchangTokenThunkAction => async (dispatch) => {
  dispatch(setLoginStatus('pending'));

  kymFetch.setHeaders({ token });
  try {
    const data = await Promise.all([
      dispatch(signinWithTokenThunk()),
      // dispatch(fetchFoodRecordsThunk({ date: '2016-07-13' })),
      dispatch(fetchTrainingDaysThunk()),
    ]);

    console.log(data);
  } catch (err) {
    console.log(err);
  }

  dispatch(setLoginStatus('succeeded'));
};

export default exchangeTokenThunk;
