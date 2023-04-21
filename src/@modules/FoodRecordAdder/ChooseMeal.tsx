import { Button, FlexWrapper, Label, Select } from '@libs/kym-dls';
import { FormattedMessage } from 'react-intl';
import { useFoodRecordAdderContext } from './hooks';

const ChooseMeal = () => {
  const { meal, setMeal } = useFoodRecordAdderContext();
  return (
    <FlexWrapper align="flex-end" gap="1rem">
      <div>
        <Label><FormattedMessage id="meal" /></Label>
        <Select value={meal} onChange={(ev) => setMeal(ev.target.value)}>
          <option value={1}><FormattedMessage id="breakfast" /></option>
          <option value={2}><FormattedMessage id="morningSnack" /></option>
          <option value={3}><FormattedMessage id="lunch" /></option>
          <option value={4}><FormattedMessage id="afternoonSnack" /></option>
          <option value={5}><FormattedMessage id="dinner" /></option>
          <option value={6}><FormattedMessage id="eveningSnack" /></option>
        </Select>
      </div>
      <Button variant="contained" color="primary">
        <FormattedMessage id="submit" />
      </Button>
    </FlexWrapper>
  );
};


export default ChooseMeal;
