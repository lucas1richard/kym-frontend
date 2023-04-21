import { selectAppDate } from '@ducks/configSlice';
import { selectDayType, selectDayTypeLoadStatus } from '@ducks/dayType/selectors';
import setDayTypeThunk from '@ducks/dayType/thunks/setDayTypeThunk';
import { useAppDispatch, useAppSelector } from '@ducks/hooks';
import { Button, LoadingIndicator, Typography } from '@libs/kym-dls';
import { FormattedMessage } from 'react-intl';

const DayType = () => {
  const dispatch = useAppDispatch();
  const appDate = useAppSelector(selectAppDate);
  const isTraining = useAppSelector((state) => selectDayType(state, appDate));
  const loadStatus = useAppSelector((state) => selectDayTypeLoadStatus(state, appDate));
  const handleClick = () => {
    dispatch(setDayTypeThunk({ date: appDate, isTraining: !isTraining }))
  };
  if (loadStatus === 'pending') return <LoadingIndicator />
  return (
    <div style={{ textAlign: 'center'}}>
      <Typography
        align="center"
        variant="h4"
        component="h2"
        intlId={isTraining ? 'todayTraining' : "todayResting"}
      />
      <Button
        variant={isTraining ? 'outlined' : 'contained'}
        color="default"
        onClick={handleClick}
      >
        <FormattedMessage id={isTraining ? 'changeToResting' : "changeToTraining"} />
      </Button>
    </div>
  );
};

export default DayType;
