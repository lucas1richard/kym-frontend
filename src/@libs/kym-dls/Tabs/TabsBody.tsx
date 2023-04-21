import React, { PropsWithChildren, ReactElement } from 'react';
import type { TabContentProps } from './TabContent';

type TabsBodyType = React.FC<PropsWithChildren<{}>>;

const TabsBody: TabsBodyType = ({ children }) => {
  const childArray = React.Children.toArray(children);
  return (
    <div>
      {childArray.map((child, ix) => {
        if (!React.isValidElement(child)) return null;
        const item = child as ReactElement<TabContentProps>;
        return React.cloneElement(item, {
          key: ix,
          ix,
        });
      })}
    </div>
  );
};

export default TabsBody;
