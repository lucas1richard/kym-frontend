import React, { Suspense } from 'react';
import { LoadingIndicator } from '@libs/kym-dls';
import ModuleWrapper from '@modules/ModuleWrapper';

const FoodRecord = React.lazy(() => import('./FoodRecord'));

function LoadableFoodRecord() {
  return (
    <ModuleWrapper module="FoodRecord">
      <Suspense fallback={<LoadingIndicator />}>
        <FoodRecord />
      </Suspense>
    </ModuleWrapper>
  );
}

export default LoadableFoodRecord;
