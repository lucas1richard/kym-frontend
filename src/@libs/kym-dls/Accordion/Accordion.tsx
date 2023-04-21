import { useState } from 'react';
import { Button } from '..';
import { AccordionSection, AccordionSectionProps } from './Section';
import AccordionSectionContent from './SectionContent';
import AccordionSectionHeader from './SectionHeader';
import AccordionWrapper from './Wrapper';

type AccordionProps = {
  disabled?: boolean;
  children: React.ReactElement<AccordionSectionProps>[];
  allOpen?: boolean;
  allCollapsed?: boolean;
  showControlPanel?: boolean;
};

type AccordionType = React.FC<AccordionProps> & {
  Section: typeof AccordionSection;
  SectionHeader: typeof AccordionSectionHeader;
  SectionContent: typeof AccordionSectionContent;
};

const Accordion: AccordionType = ({
  disabled,
  children,
  allCollapsed,
  allOpen,
  showControlPanel,
}) => {
  const [isAllCollapsed, setIsAllCollapsed] = useState(allCollapsed);
  const [isAllOpen, setIsAllOpen] = useState(allOpen);
  
  return (
    <AccordionWrapper disabled={disabled} allCollapsed={isAllCollapsed} allOpen={isAllOpen}>
      {showControlPanel && (
        <div>
          <Button
            onClick={() => {
              setIsAllCollapsed(!isAllCollapsed);
              setIsAllOpen(false);
            }}
          >
            Toggle All Collapsed
          </Button>
          <Button
            onClick={() => {
              setIsAllOpen(!isAllOpen);
              setIsAllCollapsed(false);
            }}
          >
            Toggle All Open
          </Button>
        </div>
      )}
      {children}
    </AccordionWrapper>
  );
};

Accordion.Section = AccordionSection;
Accordion.SectionHeader = AccordionSectionHeader;
Accordion.SectionContent = AccordionSectionContent;

export default Accordion;
