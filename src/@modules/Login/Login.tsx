import { otherConfigSlice } from '@ducks/otherConfigSlice';
import { injectReducer } from '@ducks/store';
import { Typography, Well } from '@libs/kym-dls';
import styled from 'styled-components';
import LoginForm from './LoginForm';

const Wrapper = styled.div`
  max-width: 350px;
`;

const Login: React.FC<{}> = () => {
  return (
    <Wrapper>
      <Well>
        <Typography
          variant="h2"
          paragraph={true}
          intlId="login"
        />
        <LoginForm />
      </Well>
    </Wrapper>
  );
}

injectReducer('otherConfig', otherConfigSlice.reducer)

export default Login;
