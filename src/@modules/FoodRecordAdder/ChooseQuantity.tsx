import { useAppSelector } from '@ducks/hooks';
import { getAbbrev } from '@ducks/abbrev/selectors';
import { Button, Input, Label, LoadingIndicator, Select, Typography } from '@libs/kym-dls';
import { useFoodRecordAdderContext } from './hooks';
import { selectCreateRecordLoadStatus } from './ducks/selectors';

type ChosenQuantity = {
  abbrevId: number;
  createRecord: () => void;
};

const ChooseQuantity: React.FC<ChosenQuantity> = ({ abbrevId, createRecord }) => {
  const abbrev = useAppSelector((state) => getAbbrev(state, abbrevId));
  const loadStatus = useAppSelector(selectCreateRecordLoadStatus);
  const {
    unit,
    setUnit,
    quantity,
    setQuantity,
    meal
  } = useFoodRecordAdderContext();
  
  if (!abbrev) return (
    <div>
      <Typography intlId="chooseAFood" />
    </div>
  );
  
  if (loadStatus === 'pending') return (
    <div>
      <LoadingIndicator />
    </div>
  );
  
  return (
    <div>
      <Input
        label="Quantity"
        type="number"
        min={0}
        value={quantity}
        onChange={(ev) => setQuantity(ev.target.value)}
      />
      <Label><Typography intlId="measurement" /></Label>
      <Select fullWidth={true} value={unit} onChange={(ev) => setUnit(ev.target.value)}>
        {abbrev.weights.map(({ amount, description, gr_wgt, seq }) => (
          <option value={seq}>
            {Number(amount)} {description} ({Number(gr_wgt)} g)
          </option>
        ))}
      </Select>

      <div>
        {abbrev.main} {abbrev.sub}
      </div>
      <div>
        {meal}
      </div>
      <Button color="primary" variant="contained" fullWidth onClick={createRecord}>
        Add Record
      </Button>
      {loadStatus === 'succeeded' && <Typography color="success" intlId="recordAdded" />}
    </div>
  );
};

export default ChooseQuantity;
