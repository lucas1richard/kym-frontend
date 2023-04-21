import { Label, Select, Typography } from '@libs/kym-dls';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

type MonthFieldProps = {
  value: number;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

const MonthSelect = styled(Select)`
  font-size: 1.5rem;
  border-right: 0;
  border-left: 0;
`;

const MonthField: React.FC<MonthFieldProps> = ({ value, onChange }) => {
  return (
    <div className="inline-block">
      <Label htmlFor="datejust-month">
        <Typography intlId="month" />
      </Label>
      <MonthSelect
        id="datejust-month"
        color="primary"
        variant="filled"
        value={value}
        onChange={(val) => onChange(val)}
      >
        <option value={0}><FormattedMessage id="January" /></option>
        <option value={1}><FormattedMessage id="February" /></option>
        <option value={2}><FormattedMessage id="March" /></option>
        <option value={3}><FormattedMessage id="April" /></option>
        <option value={4}><FormattedMessage id="May" /></option>
        <option value={5}><FormattedMessage id="June" /></option>
        <option value={6}><FormattedMessage id="July" /></option>
        <option value={7}><FormattedMessage id="August" /></option>
        <option value={8}><FormattedMessage id="September" /></option>
        <option value={9}><FormattedMessage id="October" /></option>
        <option value={10}><FormattedMessage id="November" /></option>
        <option value={11}><FormattedMessage id="December" /></option>
      </MonthSelect>
    </div>
  );
}

export default MonthField;