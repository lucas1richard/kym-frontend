import type { ThemePaletteColors } from '@theme';
import { forwardRef, ForwardRefRenderFunction, useId } from 'react';
import styled, { css } from 'styled-components';
import Typography from './Typography';

type InputProps = Omit<JSX.IntrinsicElements['input'], 'ref'> & {
  id?: string;
  label?: React.ReactNode;
  type?: string;
  color?: ThemePaletteColors;
  variant?: 'outlined' | 'filled';
};

const OutlinedCss = css<InputProps>`
  border-color: ${({ theme: { palette }, color = 'default' }) => palette[color].main};
  background: transparent;
  color: ${({ theme, color = 'default' }) => theme.palette[color].main};
  box-shadow: ${({ theme }) => theme.shadows[2]};
`;
const FilledCss = css<InputProps>`
  border-color: ${({ theme, color = 'default' }) => theme.palette[color].dark};
  color: ${({ theme, color = 'default' }) => theme.palette[color].contrastText};
  background: ${({ theme, color = 'default' }) => theme.palette[color].main};
  box-shadow: ${({ theme }) => theme.shadows[2]};
      
  &:active {
    box-shadow: ${({ theme }) => theme.shadows[8]};
  }
  &:disabled {
    color: ${({ theme }) => theme.palette.action.disabled};
    box-shadow: ${({ theme }) => theme.shadows[0]};
    background-color: ${({ theme }) => theme.palette.action.disabledBackground};
  }
`;

const Label = styled.label`
  margin-left: 8px;
`;

const InputWrapper = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
`;

const InputField = styled.input<InputProps>`
  padding: 8px 8px;
  border: 1px solid black;
  border-radius: ${({ theme: { shape } }) => shape.borderRadius}px;
  ${({ variant = 'outlined' }) => {
    if (variant === 'outlined') return OutlinedCss;
    if (variant === 'filled') return FilledCss;
    return '';
  }}
`;

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
  id,
  label,
  type = 'text',
  variant = 'outlined',
  ...rest
}, ref) => {
  const uniqueId = useId();
  return (
    <InputWrapper>
      <Label id={`labelfor-${id || uniqueId}`} htmlFor={id || uniqueId}>
        <Typography>{label}</Typography>
      </Label>
      <InputField
        id={id || uniqueId}
        aria-labelledby={`labelfor-${id || uniqueId}`}
        type={type}
        variant={variant}
        ref={ref}
        {...rest}
      />
    </InputWrapper>
  );
};

export default forwardRef(Input);
