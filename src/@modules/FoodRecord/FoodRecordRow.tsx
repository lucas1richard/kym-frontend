import { getAbbrev } from '@ducks/abbrev/selectors';
import { useAppDispatch, useAppSelector } from '@ducks/hooks';
import { Accordion, Button, Typography } from '@libs/kym-dls';
import deleteFoodRecordThunk from '@modules/FoodRecordAdder/ducks/thunks/deleteFoodRecordThunk';
import { FoodRecord } from '@typedefs';
import { useState } from 'react';
import RowDetails from './RowDetails';
import UpdateRecordForm from './UpdateRecordForm';

const FoodRecordRow: React.FC<FoodRecordRowProps> = ({ record, abbrevId }) => {
  const abbrev = useAppSelector((state) => getAbbrev(state, abbrevId));
  const dispatch = useAppDispatch();
  const deleteRecord = () => {
    dispatch(deleteFoodRecordThunk({ date: record.date, ids: [record.id] }));
  };

  const [isUpdating, setIsUpdating] = useState(false);
  
  const toggleUpdateRecord = () => {
    setIsUpdating((prev) => !prev);
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
      <Accordion.SectionContent updateMaxHeight={isUpdating}>
        {isUpdating
          ? <UpdateRecordForm record={record} />
          : <RowDetails record={record} />
        }
        <Button variant="outlined" color="secondary" onClick={deleteRecord}>
          <Typography intlId="deleteRecord" color="inherit" />
        </Button>
        <Button variant="outlined" color="secondary" onClick={toggleUpdateRecord}>
          <Typography intlId="editRecord" color="inherit" />
        </Button>
      </Accordion.SectionContent>
    </Accordion.Section>
  )
};

type FoodRecordRowProps = {
  record: FoodRecord<{ withMacros: true }>;
  abbrevId: number;
};

export default FoodRecordRow;
