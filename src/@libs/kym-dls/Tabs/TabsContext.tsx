import { createContext, RefObject, useContext } from 'react';

export type TabsContextType = {
  activeIx: number;
  setActiveIx: (ix: number) => void;
  headerRef?: RefObject<HTMLDivElement>;
  tabsId: string;
};

export const TabsContext = createContext<TabsContextType>({
  activeIx: 0,
  setActiveIx: (ix: number) => {},
  headerRef: undefined,
  tabsId: ''
});

export const useTabsContext = () => useContext(TabsContext);
