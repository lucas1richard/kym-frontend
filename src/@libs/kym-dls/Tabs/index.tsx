import React, {
  useRef,
  useState,
  useId,
  useMemo,
  PropsWithChildren
} from "react";
import TabContent from './TabContent';
import TabsBody from './TabsBody';
import { TabsContext } from './TabsContext';
import TabsHeader from './TabsHeader';
import { TabTitle } from './TabTitle';

type TabsType = React.FC<PropsWithChildren<{}>>;

const Tabs: TabsType = ({ children }) => {
  const [activeIx, setActiveIx] = useState(0);
  const headerRef = useRef(null);
  const tabsId = useId();
  const childArray = useMemo(() => React.Children.toArray(children), [children]);
  return (
    <TabsContext.Provider value={{ activeIx, setActiveIx, headerRef, tabsId }}>
      <TabsHeader ref={headerRef}>
        {childArray.filter(
          (child) => React.isValidElement(child) && child.type === TabTitle
        )}
      </TabsHeader>
      <TabsBody>
        {childArray.filter(
          (child) => React.isValidElement(child) && child.type === TabContent
        )}
      </TabsBody>
    </TabsContext.Provider>
  );
};

export {
  TabContent,
  TabTitle
};

export default Tabs;
