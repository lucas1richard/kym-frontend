import { KeyboardEventHandler, PropsWithChildren, RefObject, useRef } from 'react';
import styled from 'styled-components';
import { TabsContextType, useTabsContext } from './TabsContext';

export type TabTitleProps = {
  ix?: number;
  numTabs?: number;
  className?: string;
  activeClassName?: string;
};

export type TabTitleType = React.FC<PropsWithChildren<TabTitleProps>>;

type OnKeyPressHandlerArg =
  & Partial<TabTitleProps>
  & Pick<TabsContextType, 'setActiveIx' | 'headerRef'>
  & { key: string, titleRef: RefObject<HTMLButtonElement> };

const StyledTabTitle = styled.button`
  padding: 6px 8px;
  border: none;
  background-color: transparent;
  flex-grow: 1;
  cursor: pointer;

  &.tab-title--active {
    background: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
  }
`;

const onKeyPressHandler = ({
  ix = 0,
  headerRef,
  key,
  numTabs = 1,
  setActiveIx,
  titleRef,
}: OnKeyPressHandlerArg) => {
  if (key === "ArrowRight") {
    const next = titleRef.current?.nextSibling as HTMLButtonElement;
    if (next) {
      setActiveIx(ix + 1);
      next.focus();
    } else {
      setActiveIx(0);
      (headerRef?.current?.firstChild as HTMLButtonElement)?.focus?.();
    }
  }
  if (key === "ArrowLeft") {
    const prev = titleRef.current?.previousSibling as HTMLButtonElement;
    if (prev) {
      setActiveIx(ix - 1);
      prev.focus();
    } else {
      setActiveIx(numTabs - 1);
      (headerRef?.current?.lastChild as HTMLButtonElement)?.focus?.();
    }
  }
};

export const TabTitle: TabTitleType = ({
  children,
  ix = 0,
  numTabs,
  className = "tab-title",
  activeClassName = "tab-title--active"
}) => {
  const { activeIx, setActiveIx, headerRef, tabsId } = useTabsContext();
  const titleRef = useRef<HTMLButtonElement>(null);
  
  const isActive = ix === activeIx;
  return (
    <StyledTabTitle
      ref={titleRef}
      tabIndex={isActive ? 0 : -1}
      onClick={() => setActiveIx(ix)}
      onKeyDown={(ev) => onKeyPressHandler({
        ix,
        headerRef,
        key: ev.key,
        numTabs,
        setActiveIx,
        titleRef,
      })}
      className={`${className} ${isActive ? activeClassName : ""}`}
      role="tab"
      type="button"
      aria-selected={isActive}
      id={`tabs-${tabsId}-tab`}
      aria-controls={`tabs-${tabsId}-content`}
    >
      {children}
    </StyledTabTitle>
  );
};
