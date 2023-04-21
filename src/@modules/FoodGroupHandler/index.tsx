import React, { Suspense } from 'react';
import { LoadingIndicator } from '@libs/kym-dls';
import ModuleWrapper from '@modules/ModuleWrapper';
import { injectReducer } from '@ducks/store';
import foodGroupSlice from './ducks/foodGroupsSlice';

const FoodGroupHandler = React.lazy(() => import('./FoodGroupHandler'));

function LoadableFoodGroupHandler() {
  return (
    <ModuleWrapper module="FoodGroupHandler">
      <Suspense fallback={<LoadingIndicator />}>
        <FoodGroupHandler />
      </Suspense>
    </ModuleWrapper>
  );
}
injectReducer(foodGroupSlice.name, foodGroupSlice.reducer)
export default LoadableFoodGroupHandler;
