import { darken } from '@libs/kym-toolbox/colorManipulator';
import styled from 'styled-components';

const Well = styled.div`
  background-color: ${({ theme }) => theme.palette.background.paper};
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.palette.grey[500]};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  box-shadow: ${({ theme }) => theme.shadows[5]};
  @media (prefers-color-scheme: dark) {
    background-color: ${({ theme }) => theme.palette.background.dark};
    border-color: ${({ theme }) => darken(theme.palette.background.dark, 0.3)};
  }
`;

export default Well;
