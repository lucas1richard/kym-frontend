import { createContext, useContext } from 'react';

export const AccordionContext = createContext<any>({ disabled: false, wrapperRef: null });
export const useAccordionContext = () => useContext(AccordionContext);
