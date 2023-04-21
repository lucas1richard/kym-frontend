import React, { Suspense } from 'react';
import { LoadingIndicator } from '@libs/kym-dls';
import ModuleWrapper from '@modules/ModuleWrapper';

const FoodRecordAdder = React.lazy(() => import('./FoodRecordAdder'));

function LoadableFoodRecordAdder() {
  return (
    <ModuleWrapper module="FoodRecordAdder">
      <Suspense fallback={<LoadingIndicator />}>
        <FoodRecordAdder />
      </Suspense>
    </ModuleWrapper>
  );
}

export default LoadableFoodRecordAdder;
