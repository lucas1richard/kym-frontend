import React, { Suspense } from 'react';
import { LoadingIndicator } from '@libs/kym-dls';
import ModuleWrapper from '@modules/ModuleWrapper';

const UserPreferences = React.lazy(() => import('./UserPreferences'));

function LoadableFoodRecord() {
  return (
    <ModuleWrapper module="UserPreferences">
      <Suspense fallback={<LoadingIndicator />}>
        <UserPreferences />
      </Suspense>
    </ModuleWrapper>
  );
}

export default LoadableFoodRecord;
