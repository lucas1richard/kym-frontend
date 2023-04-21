import styled, { css } from 'styled-components';
import { ThemePaletteColors } from '@theme';
import { fade } from '@libs/kym-toolbox/colorManipulator';

type ButtonProps = JSX.IntrinsicElements['button']
  & {
    variant?: 'outlined' | 'contained';
    color?: ThemePaletteColors;
    fullWidth?: boolean;
  };

const DefaultStyles = css<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: transparent;
  border: 0;
  margin: 0; // Remove the margin in Safari
  padding: 8px 16px; // Remove the padding in Firefox
  cursor: pointer;
  vertical-align: middle;
  transition: ${({ theme: { transitions } }) => transitions.create(['background-color', 'box-shadow', 'border'], {
    duration: transitions.duration.short,
  })};
  text-decoration: none;
  color: inherit;
  &:disabled {
    pointer-events: none; // Disable link interactions
    cursor: default;
  }
`;
const OutlinedStyles = css<ButtonProps>`
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme, color = 'default'}) => fade(theme.palette[color].main, 0.5)};
  color: ${({ theme, color = 'default'}) => theme.palette[color]?.main ?? theme.palette.text.primary};
  &:hover {
    background-color: ${({ theme, color = 'default'}) => fade(theme.palette[color].main, theme.palette.action.hoverOpacity)};
    // Reset on touch devices, it doesn't add specificity
    @media (hover: none) {
      background-color: ${({ theme, color = 'default'}) => theme.palette[color]?.main ?? ''};
    }
  }
`;

const ContainedStyles = css<ButtonProps>`
  color: ${({ theme: { palette } }) => palette.getContrastText(palette.grey[300])};
  background-color: ${({ theme: { palette } }) => palette.grey[300]};
  box-shadow: ${({ theme: { shadows } }) => shadows[2]};
  background-color: ${({ theme: { palette }, color = 'default'}) => palette[color]?.main ?? ''};
  color: ${({ theme: { palette }, color = 'default'}) => palette[color]?.contrastText ?? ''};
  
  &:active {
    box-shadow: ${({ theme: { shadows } }) => shadows[8]};
  }
  &:disabled {
    color: ${({ theme: { palette } }) => palette.action.disabled};
    box-shadow: ${({ theme: { shadows } }) => shadows[0]};
    background-color: ${({ theme: { palette } }) => palette.action.disabledBackground};
  }
  &:hover {
    background-color: ${({ theme: { palette } }) => palette.grey.A100};
    // Reset on touch devices; it doesnt add specificity
    @media (hover: none) {
      background-color: ${({ theme: { palette } }) => palette.grey[300]};
    }
    &:disabled {
      background-color: ${({ theme: { palette } }) => palette.action.disabledBackground};
    }
  }
  &:hover {
    background-color: ${({ theme: { palette }, color = 'default'}) => palette[color]?.dark ?? ''};
    // Reset on touch devices, it doesn't add specificity
    @media (hover: none) {
      background-color: ${({ theme: { palette }, color = 'default'}) => palette[color]?.main ?? ''};
    }
  }
`;

const TypographyStyles = css<ButtonProps>`
  &:focus, &:focus-visible {
    box-shadow: ${({ theme: { shadows }}) => shadows[6]};
  }
  color: ${({ theme: { typography }}) => typography.button.color};
  font-family: ${({ theme: { typography }}) => typography.button.fontFamily};
  font-size: ${({ theme: { typography }}) => typography.button.fontSize};
  font-weight: ${({ theme: { typography }}) => typography.button.fontWeight};
  border-radius: ${({ theme: { shape }}) => shape.borderRadius}px;
`;

const StyledButton = styled.button<ButtonProps>`
  ${DefaultStyles}
  ${TypographyStyles}

  ${({ variant }) => {
    if (variant === 'outlined') return OutlinedStyles;
    if (variant === 'contained') return ContainedStyles;
    return '';
  }}
  ${({ fullWidth }) => fullWidth ? 'width: 100%;' : ''}
`;

export default StyledButton;
