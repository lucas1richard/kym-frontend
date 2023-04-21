import { Label, Select, Typography } from '@libs/kym-dls';
import styled from 'styled-components';

const year = new Date().getFullYear();

type YearFieldProps = {
  value: number;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const YearSelect = styled(Select)`
  font-size: 1.5rem;
  border-left: 0;
  border-top-right-radius: ${({ theme }) => theme.shape.borderRadius}px;
  border-bottom-right-radius: ${({ theme }) => theme.shape.borderRadius}px;
`;

const YearField: React.FC<YearFieldProps> = ({ value, onChange }) => {
  return (
    <div className="inline-block">
      <Label htmlFor="datejust-year">
        <Typography intlId="year" />
      </Label>
      <YearSelect
        id="datejust-year"
        color="primary"
        value={value}
        variant="filled"
        onChange={onChange}
      >
        <option value={year - 1}>{year - 1}</option>
        <option value={year}>{year}</option>
        <option value={year + 1}>{year + 1}</option>
      </YearSelect>
    </div>
  );
};

export default YearField;
