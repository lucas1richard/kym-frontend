import React, { Suspense } from 'react';
import { LoadingIndicator } from '@libs/kym-dls';
import ModuleWrapper from '@modules/ModuleWrapper';

const DateJust = React.lazy(() => import('./DateJust'));

function LoadableDateJust() {
  return (
    <ModuleWrapper module="DateJust">
      <Suspense fallback={<LoadingIndicator />}>
        <DateJust />
      </Suspense>
    </ModuleWrapper>
  );
}


export default LoadableDateJust;
