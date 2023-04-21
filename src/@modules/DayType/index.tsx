import React, { Suspense } from 'react';
import { LoadingIndicator } from '@libs/kym-dls';
import ModuleWrapper from '@modules/ModuleWrapper';

const DayType = React.lazy(() => import('./DayType'));

function LoadableDayType() {
  return (
    <ModuleWrapper module="DayType">
      <Suspense fallback={<LoadingIndicator />}>
        <DayType />
      </Suspense>
    </ModuleWrapper>
  );
}

export default LoadableDayType;
