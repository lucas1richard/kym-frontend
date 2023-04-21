import { Abbrev } from '@typedefs';
import styled from 'styled-components';
import { useFoodRecordAdderContext } from './hooks';

type AbbrevRowProps = {
  abbrev: Abbrev;
}

const Wrapper = styled.button<{ isChosen: boolean }>`
  display: block;
  width: 100%;
  text-align: left;
  border: none;
  background: ${({ isChosen, theme }) => isChosen ? theme.palette.secondary.light : 'transparent'};
  color: ${({ isChosen, theme }) => isChosen ? theme.palette.secondary.contrastText : 'inherit'};
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background: ${({ isChosen, theme }) => isChosen
      ? theme.palette.secondary.light
      : 'rgba(0,0,0,0.1)'};
  }
`;

const AbbrevRow: React.FC<AbbrevRowProps> = ({ abbrev }) => {
  const { chosenAbbrevId, setChosenAbbrevId } = useFoodRecordAdderContext();
  return (
    <Wrapper
      key={abbrev.id}
      isChosen={chosenAbbrevId === abbrev.id}
      onClick={() => setChosenAbbrevId(abbrev.id)}
    >
      <b>{abbrev.main}</b> - {abbrev.sub}
    </Wrapper>
  );
};

export default AbbrevRow;
