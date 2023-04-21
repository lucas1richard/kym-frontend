import React, { useId, useState } from 'react';
import { useAccordionContext } from './context';
import { AccordionSectionContent, AccordionSectionContentProps } from './SectionContent';
import { AccordionSectionHeader, AccordionSectionHeaderProps } from './SectionHeader';

export type AccordionSectionProps = {
  disabled?: boolean;
  children: React.ReactElement<AccordionSectionHeaderProps | AccordionSectionContentProps>[];
};

export const AccordionSection: React.FC<AccordionSectionProps> = ({ children, disabled }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { allCollapsed, allOpen } = useAccordionContext();
  const contentId = useId();
  let collapsedState = isCollapsed;
  if (allCollapsed) collapsedState = true;
  if (allOpen) collapsedState = false;

  return (
    <div>
      {React.Children.toArray(children).map((child) => {
        if (!React.isValidElement(child)) return null;
        if (child.type === AccordionSectionHeader) {
          const item = child as React.DetailedReactHTMLElement<AccordionSectionHeaderProps, any>;
          return React.cloneElement(item, {
            onClick: () => setIsCollapsed(!isCollapsed),
            isCollapsed: collapsedState,
            disabled,
            contentId,
          });
        }
        if (child.type === AccordionSectionContent) {
          const item = child as React.DetailedReactHTMLElement<AccordionSectionContentProps, any>;
          return React.cloneElement(item, { isCollapsed: collapsedState, contentId });
        }
        return null;
      })}
    </div>
  );
};

export default AccordionSection;
