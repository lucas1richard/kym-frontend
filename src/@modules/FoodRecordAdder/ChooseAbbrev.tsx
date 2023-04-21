import { useAppDispatch, useAppSelector } from '@ducks/hooks';
import { Button, FlexWrapper, Input, LoadingIndicator } from '@libs/kym-dls';
import { FormEventHandler, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import AbbrevRow from './AbbrevRow';
import { setFoodRecordAdderState } from './ducks/foodRecordAdderSlice';
import {
  selectSearchLoadStatus,
  selectOffset,
  selectQuery,
  selectSearchedAbbrevs,
  selectTotalCount,
} from './ducks/selectors';
import searchFoodsThunk from './ducks/thunks/searchFoodsThunk';

type ChooseAbbrevProps = {
};

const ChooseAbbrev: React.FC<ChooseAbbrevProps> = () => {
  const [queryString, setQueryString] = useState('');
  const dispatch = useAppDispatch();
  const query = useAppSelector(selectQuery);
  const searchedAbbrevs = useAppSelector(selectSearchedAbbrevs);
  const totalCount = useAppSelector(selectTotalCount);
  const offset = useAppSelector(selectOffset);
  const searchLoadStatus = useAppSelector(selectSearchLoadStatus);

  const search = () => {
    const searchOffset = query === queryString ? offset : 0
    if (queryString) dispatch(searchFoodsThunk({ queryString, offset: searchOffset }));
  };

  const onSubmit: FormEventHandler = (ev) => {
    ev.preventDefault();
    search();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <FlexWrapper align="flex-end" gap="1rem">
          <Input
            label="Food"
            type="text"
            value={queryString}
            onChange={(ev) => setQueryString(ev.target.value)}
            maxLength={60}
            minLength={3}
          />
          <Button variant="contained" color="primary">
            <FormattedMessage id="submit" />
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => dispatch(setFoodRecordAdderState({ offset: offset - 1 }))}
            disabled={offset === 0 || queryString === ''}
          >
            <FormattedMessage id="previous" />
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => dispatch(setFoodRecordAdderState({ offset: offset + 1 }))}
            disabled={offset === Math.floor(totalCount / 10) || queryString === ''}
          >
            <FormattedMessage id="next" />
          </Button>
        </FlexWrapper>
      </form>
      {searchLoadStatus === 'succeeded' && (
        searchedAbbrevs.map((abbrev) => !!abbrev && (
          <AbbrevRow
            key={abbrev.id}
            abbrev={abbrev}
          />
        ))
      )}
      {searchLoadStatus === 'succeeded' && totalCount === 0 && (
        <div><FormattedMessage id="noResults" /></div>
      )}
      {searchLoadStatus === 'pending' && (
        <LoadingIndicator />
      )}
    </>
  );
};

export default ChooseAbbrev;
