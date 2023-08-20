import type { ThemePaletteColors } from '@theme';
import styled, { css } from 'styled-components';

type SelectProps = {
  fullWidth?: boolean;
  color?: ThemePaletteColors;
  variant?: 'outlined' | 'filled';
}
& JSX.IntrinsicElements['select'];

const OutlinedCss = css<SelectProps>`
  border-color: ${({ theme, color = 'default' }) => theme.palette[color].main};
  color: ${({ theme, color = 'default' }) => theme.palette[color].main};
  background: inherit;
  box-shadow: ${({ theme }) => theme.shadows[2]};
  @media (prefers-color-scheme: dark) {
    ${({ color = 'default', theme }) => {
      return `color: ${theme.palette[color].light};`;
    }
  }
`;

const FilledCss = css<SelectProps>`
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

const Select = styled.select<SelectProps>`
  cursor: pointer;
  position: relative;
  padding: 8px;
  background: inherit;
  
  ${({ fullWidth }) => fullWidth ? 'width: 100%;' : ''}
  ${({ variant = 'outlined' }) => {
    if (variant === 'outlined') return OutlinedCss;
    if (variant === 'filled') return FilledCss;
    return '';
   }}
`;

export default Select;