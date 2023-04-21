import { selectAppDate, setAppDate } from '@ducks/configSlice';
import { useAppDispatch, useAppSelector } from '@ducks/hooks';
import { Button, FlexWrapper, Grid, SrOnly, Typography } from '@libs/kym-dls';
import dayjs from 'dayjs';
import { FormattedDate, useIntl } from 'react-intl';
import styled from 'styled-components';
import DayField from './DayField';
import MonthField from './MonthField';
import YearField from './YearField';

type SelectChangeHandler = React.ChangeEventHandler<HTMLSelectElement>;

const DateJustButton = styled(Button)`
  font-size: 1.5rem;
`;

const DateJust = () => {
  const appDate = useAppSelector(selectAppDate);
  const dayjsAppDate = dayjs(appDate);
  const dispatch = useAppDispatch();
  const { formatMessage }= useIntl();



  const makeOnChange = (unit: 'date' | 'month' | 'year'): SelectChangeHandler => (ev) => {
    dispatch(setAppDate(dayjsAppDate.set(unit, parseInt(ev.target.value)).format('YYYY-MM-DD')));
  };

  const yesterday = dayjsAppDate.subtract(1, 'day').format('YYYY-MM-DD');
  const yesterdayShort = dayjsAppDate.subtract(1, 'day').format('MMMM-DD');

  const tomorrow = dayjsAppDate.add(1, 'day').format('YYYY-MM-DD');
  const tomorrowShort = dayjsAppDate.add(1, 'day').format('MMMM-DD');
  
  return (
    <section>
      <FlexWrapper justify="center">
        <Typography variant="h4" component="h2">
          {formatMessage({ id: 'applicationDate' })} <SrOnly>is {dayjsAppDate.format('YYYY-MM-DD')}</SrOnly>
        </Typography>
      </FlexWrapper>
      <FlexWrapper justify="center" align="flex-end" gap="1rem">
        <DateJustButton
          variant="contained"
          onClick={() => dispatch(setAppDate(yesterday))}
          aria-label={formatMessage({ id: 'goBackOneDay' }, { newDate: yesterdayShort })}
        >
          -
        </DateJustButton>
        <div>
          <DayField
            daysInMonth={dayjsAppDate.daysInMonth()}
            value={dayjsAppDate.date()}
            onChange={makeOnChange('date')}
          />
          <MonthField
            value={dayjsAppDate.month()}
            onChange={makeOnChange('month')}
          />
          <YearField
            value={dayjsAppDate.year()}
            onChange={makeOnChange('year')}
          />
        </div>
        <DateJustButton
          variant="contained"
          onClick={() => dispatch(setAppDate(tomorrow))}
          aria-label={formatMessage({ id: 'goForwardOneDay' }, { newDate: tomorrowShort })}
        >
          +
        </DateJustButton>
      </FlexWrapper>
    </section>
  );
};

export default DateJust;
