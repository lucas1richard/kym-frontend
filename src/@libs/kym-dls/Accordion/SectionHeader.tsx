import { KeyboardEvent, PropsWithChildren, useId, useRef } from 'react';
import styled from 'styled-components';
import { useAccordionContext } from './context';

const StyledButton = styled.button`
  padding: 0;
  display: flex;
  justify-content: space-between;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  background-color: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  color: inherit;
  &:hover,
  &:focus {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  }
  &:disabled {
    background: #ccc;
    cursor: default;
    box-shadow: none !important;
  }
  &.quiet-disabled:disabled {
    background: transparent;
  }
  .section-header-content {
    display: flex;
    padding: 1rem;
    justify-content: space-between;
    flex-grow: 1;
  }
  .hover-indicator {
    visibility: hidden;
    width: 7px;
    background: ${({ theme }) => theme.palette.primary.main};
  }
  &:hover .hover-indicator,
  &:focus .hover-indicator {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    visibility: visible;
  }
  &:disabled .hover-indicator {
    visibility: hidden !important;
  }
  .accordion-icon {
    border: solid currentcolor;
    border-width: 0 2px 2px 0;
    display: inline-block;
    height: 8px;
    pointer-events: none;
    transform: translateY(-2px) rotate(45deg);
    width: 8px;
    margin-left: 0.5rem;
    transition: transform 300ms;
  }

  .accordion-icon--rotated {
    transform: translateY(2px) rotate(-135deg);
  }
  &.quiet-disabled .accordion-icon {
    visibility: hidden;
  }
`;

export type AccordionSectionHeaderProps = PropsWithChildren<{
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isCollapsed?: boolean;
  disabled?: boolean;
  contentId?: string;
}>;

export const AccordionSectionHeader: React.FC<AccordionSectionHeaderProps> = ({
  children,
  onClick,
  isCollapsed,
  disabled,
  contentId,
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const {
    disabled: accordionDisabled,
    wrapperRef,
    allOpen,
    allCollapsed,
  } = useAccordionContext();

  const onKeyDown = (ev: KeyboardEvent<HTMLButtonElement>) => {
    const parent = ref.current?.parentNode?.parentNode;
    const selector = "button.accordion-header";
    const firstButton = wrapperRef?.current?.firstChild?.querySelector(selector);
    const prevButton = (parent?.previousSibling as HTMLElement)?.querySelector(selector);
    const nextButton = (parent?.nextSibling as HTMLElement)?.querySelector(selector);
    const lastButton = wrapperRef?.current?.lastChild?.querySelector(selector);
    if (ev.key === "ArrowDown") {
      ev.preventDefault();
      if (nextButton) return (nextButton as HTMLButtonElement).focus();
      if (firstButton) return firstButton.focus();
    }
    if (ev.key === "ArrowUp") {
      ev.preventDefault();
      if (prevButton) return (prevButton as HTMLButtonElement).focus();
      if (lastButton) return lastButton.focus();
    }
    if (ev.key === "Home") {
      ev.preventDefault();
      if (firstButton) return firstButton.focus();
    }
    if (ev.key === "End") {
      ev.preventDefault();
      if (lastButton) return lastButton.focus();
    }
  };

  return (
    <div role="heading" aria-level={6}>
      <StyledButton
        ref={ref}
        disabled={disabled || accordionDisabled || allOpen || allCollapsed}
        onClick={onClick}
        onKeyDown={onKeyDown}
        aria-expanded={!isCollapsed}
        aria-controls={contentId}
        className={`accordion-header ${(allOpen || allCollapsed) ? 'quiet-disabled' : ''}`}
      >
        <div className="hover-indicator" />
        <div className="section-header-content">
          {children}
          <span
            aria-hidden={true}
            className={
              isCollapsed
                ? "accordion-icon"
                : "accordion-icon accordion-icon--rotated"
            }
          />
        </div>
      </StyledButton>
    </div>
  );
};

export default AccordionSectionHeader;