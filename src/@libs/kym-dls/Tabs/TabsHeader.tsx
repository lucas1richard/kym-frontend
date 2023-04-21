import React, { ForwardRefRenderFunction, PropsWithChildren, ReactElement } from 'react';
import styled from 'styled-components';
import type { TabTitleProps } from './TabTitle';

export type TabsHeaderProps = PropsWithChildren<{}>;

export type TabsHeaderType = ForwardRefRenderFunction<HTMLDivElement, TabsHeaderProps>;

const StyledHeader = styled.div`
  display: flex;
`;

const TabsHeader: TabsHeaderType = ({ children }, ref) => {
  const childArray = React.Children.toArray(children);
  return (
    <StyledHeader ref={ref}>
      {childArray.map((child, ix) => {
        if (!React.isValidElement(child)) return null;
        const item = child as ReactElement<TabTitleProps>;
        return React.cloneElement(item, {
          key: ix,
          ix,
          numTabs: childArray.length
        });
      })}
    </StyledHeader>
  );
};

export default React.forwardRef<HTMLDivElement, TabsHeaderProps>(TabsHeader);
