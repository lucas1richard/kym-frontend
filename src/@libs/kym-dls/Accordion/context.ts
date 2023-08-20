import { createContext, useContext } from 'react';

export const AccordionContext = createContext<any>({ disabled: false, wrapperRef: null });
export const useAccordionContext = () => useContext(AccordionContext);

export const SectionContext = createContext<{ isCollapsed?: boolean }>({ isCollapsed: true });
export const useSectionContext = () => useContext(SectionContext);
