import styled from 'styled-components';

const Well = styled.div`
  background-color: ${({ theme }) => theme.palette.background.paper};
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.palette.grey[500]};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  box-shadow: ${({ theme }) => theme.shadows[5]};
`;

export default Well;
