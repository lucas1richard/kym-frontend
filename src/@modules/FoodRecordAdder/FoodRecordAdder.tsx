import {
  Button,
  FlexWrapper,
  Label,
  Select,
  TabContent,
  Tabs,
  TabTitle,
  Typography,
} from '@libs/kym-dls';
import foodRecordAdderSlice from './ducks/foodRecordAdderSlice';
import { injectReducer } from '@ducks/store';
import ChooseAbbrev from './ChooseAbbrev';
import { useMemo, useState } from 'react';
import ChooseMeal from './ChooseMeal';
import ChooseQuantity from './ChooseQuantity';
import { FoodRecordAdderContext } from './hooks';
import { useAppDispatch, useAppSelector } from '@ducks/hooks';
import createFoodRecordThunk from './ducks/thunks/createFoodRecordThunk';
import { selectAppDate } from '@ducks/configSlice';

const FoodRecordAdder = () => {
  const dispatch = useAppDispatch();
  const date = useAppSelector(selectAppDate);
  const [chosenAbbrevId, setChosenAbbrevId] = useState(0);
  const [meal, setMeal] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState(1);
  const createRecord = () => dispatch(createFoodRecordThunk([
    { date, abbrevId: chosenAbbrevId, meal, quantity, unit: unit.toString(), confirmed: true },
  ]))
  const context = useMemo(() => ({
    chosenAbbrevId,
    setChosenAbbrevId,
    meal,
    setMeal,
    quantity,
    setQuantity,
    unit,
    setUnit,
  }), [chosenAbbrevId, meal, unit]);
  return (
    <FoodRecordAdderContext.Provider value={context}>
      <Typography intlId="foodRecordAdder" variant="h4" component="h2" />
      <Tabs>
        <TabTitle>
          <Typography intlId="whatDidYouEat" color="inherit" align="center" />
        </TabTitle>
        <TabContent>
          <ChooseAbbrev />
        </TabContent>
        <TabTitle>
          <Typography intlId="whenDidYouEat" color="inherit" align="center" />
        </TabTitle>
        <TabContent>
          <ChooseMeal />
        </TabContent>
        <TabTitle>
          <Typography intlId="howMuchDidYouEat" color="inherit" align="center" />
        </TabTitle>
        <TabContent>
          <ChooseQuantity abbrevId={chosenAbbrevId} createRecord={createRecord} />
        </TabContent>
      </Tabs>
    </FoodRecordAdderContext.Provider>
  );
};

injectReducer(foodRecordAdderSlice.name, foodRecordAdderSlice.reducer);

export default FoodRecordAdder;
