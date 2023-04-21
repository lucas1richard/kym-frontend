import {
  PropsWithChildren,
  useMemo,
  useRef,
} from 'react';
import { AccordionContext } from './context';

type AccordionWrapperProps = PropsWithChildren<{
  disabled?: boolean;
  allCollapsed?: boolean;
  allOpen?: boolean;
}>;

const AccordionWrapper: React.FC<AccordionWrapperProps> = ({
  children,
  disabled,
  allCollapsed,
  allOpen,
}) => {
  const wrapperRef = useRef(null);
  const accordionContext = useMemo(() => ({
    disabled,
    wrapperRef,
    allCollapsed,
    allOpen,
  }), [wrapperRef, disabled, allCollapsed, allOpen]);
  return (
    <AccordionContext.Provider value={accordionContext}>
      <div ref={wrapperRef}>{children}</div>
    </AccordionContext.Provider>
  );
};

export default AccordionWrapper;
