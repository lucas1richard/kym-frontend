import fetchAbbrevsThunk, { FetchAbbrevsData, FetchAbbrevsThunkArg } from '@ducks/abbrev/thunks/fetchAbbrevsThunk';
import { RootState } from '@ducks/store';
import { ThunkAction } from 'redux-thunk';
import { setFoodRecordAdderState, setSearchIds } from '../foodRecordAdderSlice';

type SearchFoodsThunkAction = ThunkAction<Promise<void>, RootState, void, any>;

const searchFoodsThunk = ({ queryString, offset = 0 }: FetchAbbrevsThunkArg): SearchFoodsThunkAction => async (dispatch, getState) => {
  dispatch(setFoodRecordAdderState({ searchLoadStatus: 'pending' }));
  const { ok, data } = await dispatch(fetchAbbrevsThunk({ queryString, offset, limit: 10 })).unwrap();
  if (ok) {
    dispatch(setSearchIds(Object.keys(data.abbrevs).map(Number)));
    dispatch(setFoodRecordAdderState({
      offset: data.offset,
      totalCount: data.totalCount,
      query: data.query,
      searchLoadStatus: 'succeeded',
    }));
  } else {
    dispatch(setFoodRecordAdderState({ searchLoadStatus: 'rejected' }));
  }
};

export default searchFoodsThunk;
