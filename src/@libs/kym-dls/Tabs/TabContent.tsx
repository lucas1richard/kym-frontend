import { PropsWithChildren } from 'react';
import { useTabsContext } from './TabsContext';

export type TabContentProps = {
  ix?: number;
};

export type TabContentType = React.FC<PropsWithChildren<TabContentProps>>;

export const TabContent: TabContentType = ({ ix, children }) => {
  const { activeIx, tabsId } = useTabsContext();
  const isActive = ix === activeIx;
  return (
    <div
      tabIndex={isActive ? 0 : -1}
      hidden={!isActive}
      role="tabpanel"
      id={`tabs-${tabsId}-content`}
      aria-labelledby={`tabs-${tabsId}-tab`}
    >
      {children}
    </div>
  );
};

export default TabContent;
