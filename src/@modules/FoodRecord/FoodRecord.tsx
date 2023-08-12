import { selectAppDate } from '@ducks/configSlice';
import { useAppDispatch, useAppSelector } from '@ducks/hooks';
import { injectReducer } from '@ducks/store';
import { Accordion, LoadingIndicator, Typography } from '@libs/kym-dls';
import { useEffect } from 'react';
import foodRecordSlice from './ducks/foodRecordSlice';
import { selectFoodRecordDate } from './ducks/selectors';
import fetchFoodRecordsThunk from './ducks/thunks/fetchFoodRecordsThunk';
import FoodRecordRow from './FoodRecordRow';
import { groupFoodRecordByMeals } from './utils';

const FoodRecord = () => {
  const appDate = useAppSelector(selectAppDate);
  const {
    items: record,
    loadStatus
  } = useAppSelector((state) => selectFoodRecordDate(state, appDate));
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!record) {
      dispatch(fetchFoodRecordsThunk({ date: appDate }));
    }
  }, [appDate]);

  const groupedRecords = groupFoodRecordByMeals(record);
  return (
    <div>
      <Typography intlId="foodRecordTitle" variant="h4" component="h2" />
      {loadStatus === 'rejected' && (
        <Typography
          align="center"
          variant="h6"
          component="h3"
          color="error"
          intlId="foodRecordLoadError"
        />
      )}
      {loadStatus === 'pending'
        ? <LoadingIndicator />
        : Object.entries(groupedRecords).map(([meal, records]) => {
          return (
            <div key={meal}>
              <Typography variant="h5" component="h3" intlId={`meal-${meal}`} />
              <Accordion>
                {records.map((record) => (
                  <FoodRecordRow
                    key={record.id}
                    abbrevId={record.abbrev_id}
                    record={record}
                  />
                ))}
              </Accordion>
            </div>
          );
        })}
    </div>
  );
};

injectReducer(foodRecordSlice.name, foodRecordSlice.reducer);

export default FoodRecord;
