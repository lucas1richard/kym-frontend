import type { ComponentType } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

const defaultHeadlineMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  bold: 'span',
};

export type ThemeStyle =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button'
  | 'overline'
  | 'display3'
  | 'display2'
  | 'display1'
  | 'headline'
  | 'title'
  | 'subheading'
  | 'bold';

type Style = ThemeStyle;

export interface TypographyProps {
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  color?: 'primary' | 'secondary' | 'error' | 'inherit' | 'success' | 'default';
  component?: React.ReactNode;
  gutterBottom?: boolean;
  headlineMapping?: { [type in Style]: string };
  noWrap?: boolean;
  paragraph?: boolean;
  variant?: Style | 'inherit';
  sronly?: boolean;
  intlId?: string;
}

const TypographyBase = ({
  component: componentProp,
  paragraph,
  intlId,
  variant = 'body1',
  ...other
}: TypographyProps) => {
  const Component =
    componentProp ||
    // @ts-ignore
    (paragraph ? 'p' : defaultHeadlineMapping[variant]) ||
    'span';

  if (intlId) {
    return (
      <Component {...other}>
        <FormattedMessage id={intlId} />
      </Component>
    );
  }
  return <Component {...other} />;
};

const Typography = styled<ComponentType<TypographyProps & JSX.IntrinsicElements['p']>>(TypographyBase)`
  margin: 0;
  ${({ variant = 'body1', theme })=> {
    if (variant === 'bold') {
      return `
        font-weight: bold;
      `;
    }
    return `
      font-family: ${theme.typography[variant].fontFamily};
      font-size: ${theme.typography[variant].fontSize};
      font-weight: ${theme.typography[variant].fontWeight};
    `;
  }}
  ${({ align = 'left'}) => `text-align: ${align};`}
  ${({ sronly = false}) => sronly ? `
    position: absolute;
    height: 1;
    width: 1;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  `: ''}
  ${({ noWrap }) => noWrap
    ? `overflow: hidden;
    textOverflow: ellipsis;
    whiteSpace: nowrap;`
    : ''}
  ${({ gutterBottom }) => gutterBottom ? 'margin-bottom: 0.35em;' : ''}
  ${({ paragraph }) => paragraph ? 'margin-bottom: 16px;' : ''}
  ${({ color = 'default', theme }) => {
    if (color === 'inherit') return 'color: inherit;';
    return `color: ${theme.palette[color].main};`;
  }}
`;

export default Typography;
