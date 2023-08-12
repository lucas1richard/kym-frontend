import { FlexWrapper, Grid } from '@libs/kym-dls';
import { useScrollTrigger } from '@libs/kym-toolbox';
import { Theme } from '@theme/styles';
import { Link, LinkProps } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.header<{ visible?: boolean }>`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: ${({ visible }) => visible ? '5rem' : '0px'};
  z-index: 100000;
  overflow: hidden;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.getContrastText(theme.palette.primary.main)};
  transition: height 300ms;
  transform-origin: 0 0;
`;

const NavLink = styled<React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>>(Link)`
  background-color: #fff;
  ${({ theme }: { theme: Theme }) => `
    color: ${theme.typography.button.color};
    font-family: ${theme.typography.button.fontFamily};
    font-size: ${theme.typography.button.fontSize};
    font-weight: ${theme.typography.button.fontWeight};
    border-radius: ${theme.shape.borderRadius};
    &:hover {
      background-color: ${theme.palette.grey[100]};
      color: ${theme.typography.button.color};
    }
  `}
  padding: 1rem;
`;

const GlobalHeader = () => {
  const trigger = useScrollTrigger();

  return (
    <HeaderWrapper visible={!trigger}>
      <div>Global Header</div>
      <nav>
        <FlexWrapper gap="1rem" justify="flex-start">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/preferences">Preferences</NavLink>
          <NavLink to="/about">About</NavLink>
        </FlexWrapper>
      </nav>
    </HeaderWrapper>
  );
};

export default GlobalHeader;
