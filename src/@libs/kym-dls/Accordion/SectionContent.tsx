import { PropsWithChildren, useRef } from 'react';
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
}>;
export const AccordionSectionContent: React.FC<AccordionSectionContentProps> = ({
  children,
  isCollapsed,
  contentId,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <StyledSection
      id={contentId}
      ref={ref}
      aria-hidden={isCollapsed}
      style={{
        maxHeight: isCollapsed ? "0px" : ref?.current?.scrollHeight ?? 0 + "px"
      }}
      {...rest}
    >
      {children}
    </StyledSection>
  );
};

export default AccordionSectionContent;
