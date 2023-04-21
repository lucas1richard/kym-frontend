import { Label, Select, Typography } from '@libs/kym-dls';
import { useMemo } from 'react';
import styled from 'styled-components';

type DayFieldProps = {
  value: number;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  daysInMonth: number;
};

const DaySelect = styled(Select)`
  font-size: 1.5rem;
  border-right: 0;
  border-top-left-radius: ${({ theme }) => theme.shape.borderRadius}px;
  border-bottom-left-radius: ${({ theme }) => theme.shape.borderRadius}px;
`;

const DayField: React.FC<DayFieldProps> = ({ value, onChange, daysInMonth }) => {
  const dateArr = useMemo(() => {
    const dateArr = [];
    for (let i = 1; i <= daysInMonth; i += 1) dateArr.push(i);
    return dateArr;
  }, [daysInMonth]);
  
  return (
    <div className="inline-block">
      <Label htmlFor="datejust-date">
        <Typography intlId="date" />
      </Label>
      <DaySelect
        id="datejust-date"
        variant="filled"
        color="primary"
        onChange={onChange}
        value={value}
      >
        {dateArr.map((date) => (
          <option key={date} value={date}>{date}</option>
        ))}
      </DaySelect>
    </div>
  );
}

export default DayField;