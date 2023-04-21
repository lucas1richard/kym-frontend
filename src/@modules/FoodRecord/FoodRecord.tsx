import { selectAppDate } from '@ducks/configSlice';
import { useAppDispatch, useAppSelector } from '@ducks/hooks';
import { injectReducer } from '@ducks/store';
import { Accordion, Button, FlexWrapper, Input, LoadingIndicator, Typography } from '@libs/kym-dls';
import { useEffect } from 'react';
import foodRecordSlice from './ducks/foodRecordSlice';
import { selectFoodRecordDate } from './ducks/selectors';
import fetchFoodRecordsThunk from './ducks/thunks/fetchFoodRecordsThunk';
import FoodRecordRow from './FoodRecordRow';

const FoodRecord = () => {
  const appDate = useAppSelector(selectAppDate);
  const {
    items: record,
    loadStatus
  } = useAppSelector((state) => selectFoodRecordDate(state, appDate));
  const dispatch = useAppDispatch();
  console.log({ record })
  useEffect(() => {
    if (!record) {
      dispatch(fetchFoodRecordsThunk({ date: appDate }));
    }
  }, [appDate]);
  return (
    <div>
      <Typography variant="h4" component="h2">
        Food Record
      </Typography>
      <form onSubmit={(ev) => {
        ev.preventDefault();
      }}>
        <FlexWrapper justify="flex-start" align="flex-end" gap="1rem">
          <Input label="Search" />
          <Button variant="contained" color="primary">Submit</Button>
        </FlexWrapper>
      </form>
      {loadStatus === 'pending'
        ? <LoadingIndicator />
        : (
          <Accordion>
            {record?.map((record) => (
              <FoodRecordRow
                key={record.id}
                abbrevId={record.abbrev_id}
                record={record}
              />
            ))}
          </Accordion>
        )}
    </div>
  );
};

injectReducer(foodRecordSlice.name, foodRecordSlice.reducer);

export default FoodRecord;
