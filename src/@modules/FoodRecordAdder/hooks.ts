import { createContext, useContext } from 'react';

export const FoodRecordAdderContext = createContext({});
export const useFoodRecordAdderContext = () => useContext<any>(FoodRecordAdderContext);
