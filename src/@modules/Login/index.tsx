import React, { Suspense } from 'react';
import { LoadingIndicator } from '@libs/kym-dls';
import ModuleWrapper from '@modules/ModuleWrapper';

const Login = React.lazy(() => import('./Login'));

function LoadableLogin() {
  return (
    <ModuleWrapper module="Login">
      <Suspense fallback={<LoadingIndicator />}>
        <Login />
      </Suspense>
    </ModuleWrapper>
  );
}


export default LoadableLogin;
