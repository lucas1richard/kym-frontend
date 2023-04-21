import React, { Suspense } from 'react';
import { LoadingIndicator } from '@libs/kym-dls';
import ModuleWrapper from '@modules/ModuleWrapper';

const Dashboard = React.lazy(() => import('./Dashboard'));

function LoadableDashboard() {
  return (
    <ModuleWrapper module="Dashboard">
      <Suspense fallback={<LoadingIndicator />}>
        <Dashboard />
      </Suspense>
    </ModuleWrapper>
  );
}


export default LoadableDashboard;
