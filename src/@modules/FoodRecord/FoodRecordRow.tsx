import { getAbbrev } from '@ducks/abbrev/selectors';
import { useAppDispatch, useAppSelector } from '@ducks/hooks';
import { Accordion, Button, SrOnly, Typography } from '@libs/kym-dls';
import deleteFoodRecordThunk from '@modules/FoodRecordAdder/ducks/thunks/deleteFoodRecordThunk';
import { FoodRecord } from '@typedefs';

type FoodRecordRowProps = {
  record: FoodRecord<{ withMacros: true }>;
  abbrevId: number;
};

const FoodRecordRow: React.FC<FoodRecordRowProps> = ({ record, abbrevId }) => {
  const abbrev = useAppSelector((state) => getAbbrev(state, abbrevId));
  const dispatch = useAppDispatch();
  const deleteRecord = () => {
    dispatch(deleteFoodRecordThunk({ date: record.date, ids: [record.id] }));
  };
  return (
    <Accordion.Section>
      <Accordion.SectionHeader>
        <div>
          <Typography color="primary" lang="en">
            <b>{abbrev?.main}</b> - {abbrev?.sub}
          </Typography>
          <Typography color="secondary" lang="en">
            {record.quantity} {record.unit}
          </Typography>
        </div>
      </Accordion.SectionHeader>
      <Accordion.SectionContent>
        <Typography>
          <Typography intlId="calories" component="span" />: {record.calories}
        </Typography>
        <Typography>
          <Typography intlId="protein" component="span" />: {record.protein}
        </Typography>
        <Typography>
          <Typography intlId="carbs" component="span" />: {record.carbohydrates}
        </Typography>
        <Typography>
          <Typography intlId="fat" component="span" />: {record.fat}
        </Typography>
        <Button variant="outlined" color="secondary" onClick={deleteRecord}>
          <Typography intlId="deleteRecord" color="inherit" />
        </Button>
      </Accordion.SectionContent>
    </Accordion.Section>
  )
};

export default FoodRecordRow;
