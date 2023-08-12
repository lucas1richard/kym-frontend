import { FC } from 'react';
import styled from 'styled-components';

type KymPageProps = JSX.IntrinsicElements['div']
  & {
    Header: React.ReactNode;
    Footer: React.ReactNode;
  };

const StyledMain = styled.main`
  padding: 2rem;
  min-height: calc(100vh);
  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: 1rem;
  }
`;

const KymPage: FC<KymPageProps> = ({ children, Header, Footer }) => {
  return (
      <>
        {Header}
        <StyledMain>
          {children}
        </StyledMain>
        {Footer}
      </>
  );
};

export default KymPage;
