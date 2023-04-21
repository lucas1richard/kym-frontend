import { useAppDispatch } from '@ducks/hooks';
import { FoodGroup } from '@typedefs';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { addFoodGroups } from './ducks/foodGroupsSlice';

const FoodGroupHandler: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const intl = useIntl();
  // @ts-ignore
  const messages = intl.messages as { groups: FoodGroup[] }
  const dispatch = useAppDispatch();
  useEffect(() => {
    const { groups } = messages;
    const trGroups = groups.map(group => ({...group, groupid: Number(group.groupid)}))
    dispatch(addFoodGroups(trGroups));
  }, []);
  return (
    <>
      {children}
    </>
  );
};

export default FoodGroupHandler;
