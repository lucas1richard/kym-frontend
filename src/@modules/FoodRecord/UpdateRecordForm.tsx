import { useAppDispatch } from '@ducks/hooks';
import { Button, Input, Select, Typography } from '@libs/kym-dls';
import updateFoodRecordQuantityThunk from '@modules/FoodRecordAdder/ducks/thunks/updateFoodRecordQuantityThunk';
import { FoodRecord } from '@typedefs';
import { useState } from 'react';

const UpdateRecordForm: React.FC<UpdateRecordFormProps> = ({ record }) => {
  console.log(record);
  const dispatch = useAppDispatch();
  const [seq, setSeq] = useState(record.seq);
  const [quantity, setQuantity] = useState(record.quantity);
  const updateRecordQuantity = () => {
    dispatch(updateFoodRecordQuantityThunk({
      date: record.date,
      id: record.id,
      quantity,
      seq : seq.toString(),
    }));
  };
  
  return (
    <div>
      <Input
        value={quantity}
        type="number"
        label="Quantity"
        onChange={(ev) => setQuantity(Number(ev.target.value))}
      />
      <Select fullWidth value={seq} onChange={(ev) => setSeq(Number(ev.target.value))}>
        {record.weights.map((weight) => (
          <option key={weight.seq} value={weight.seq}>{weight.description}</option>
        ))}
      </Select>
      <Button variant="contained" color="primary" onClick={updateRecordQuantity}>
        <Typography intlId="updateRecord" color="inherit" />
      </Button>
    </div>
  );
};

interface UpdateRecordFormProps {
  record: FoodRecord<{ withMacros: true }>
}

export default UpdateRecordForm;
