import styled from 'styled-components';

const FooterWrapper = styled.footer`
  bottom: 0px;
  left: 0px;
  width: 100vw;
  height: 5rem;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.getContrastText(theme.palette.primary.main)};
`;

const GlobalFooter = () => {
  return (
    <FooterWrapper>
      <div>Global Footer</div>
    </FooterWrapper>
  );
};

export default GlobalFooter;
