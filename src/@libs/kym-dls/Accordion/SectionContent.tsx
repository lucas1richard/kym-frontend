import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const StyledSection = styled.div`
  padding-left: calc(1rem + 7px);
  transition: max-height 300ms;
  transform-origin: 0 0;
  overflow: hidden;
`;

export type AccordionSectionContentProps = PropsWithChildren<{
  isCollapsed?: boolean;
  contentId?: string;
  updateMaxHeight?: any;
  children?: React.ReactNode | (({}: { isCollapsed?: boolean }) => Element);
}>;
export const AccordionSectionContent: React.FC<AccordionSectionContentProps> = ({
  children,
  isCollapsed,
  contentId,
  updateMaxHeight,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [maxHeight, setMaxHeight] = useState(ref?.current?.scrollHeight ?? 0);

  useEffect(() => {
    setMaxHeight(ref?.current?.scrollHeight ?? 0);
  }, [updateMaxHeight, ref]);

  return (
    <StyledSection
      id={contentId}
      ref={ref}
      aria-hidden={isCollapsed}
      style={{
        maxHeight: isCollapsed ? "0px" : maxHeight ?? 0 + "px"
      }}
      {...rest}
    >
        {children}
    </StyledSection>
  );
};

export default AccordionSectionContent;
