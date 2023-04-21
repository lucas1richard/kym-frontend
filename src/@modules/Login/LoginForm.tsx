import { useAppDispatch, useAppSelector } from '@ducks/hooks';
import { getUserLoadStatus } from '@ducks/user';
import { signinWithCredentialsThunk } from '@ducks/user/thunks';
import { Button, Grid, Input, Typography } from '@libs/kym-dls'
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

const LoginForm: React.FC<{}> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    dispatch(signinWithCredentialsThunk({ email, password }));
  };

  const loadStatus = useAppSelector(getUserLoadStatus);
  const isLoading = loadStatus === 'pending';

  return (
    <form onSubmit={onSubmit}>
      <Grid gap="1rem">
        <Input
          disabled={isLoading}
          id="login-email"
          label={<FormattedMessage id="email" />}
          type="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <Input
          disabled={isLoading}
          id="login-password"
          label={<FormattedMessage id="password" />}
          type="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <Button disabled={isLoading} fullWidth={true} variant="contained" color="secondary">
          <FormattedMessage id="login" />
        </Button>
        {loadStatus === 'rejected' && (
          <Typography color="error" intlId="loginFailed" />
        )}
        {loadStatus === 'unauthorized' && (
          <Typography color="error" intlId="unauthorized" />
        )}
        {loadStatus === 'succeeded' && (
          <Typography color="success" intlId="loginSuccess" />
        )}
        {loadStatus === 'pending' && (
          <Typography color="default" intlId="loginPending" />
        )}
      </Grid>
    </form>
  );
};

export default LoginForm;
