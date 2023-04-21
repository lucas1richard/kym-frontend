import styled from 'styled-components';

type FlexDirection =
  | 'row'
  | 'row-reverse'
  | 'column'
  | 'column-reverse';

type FlexAlign =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'stretch';

type FlexJustify =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

interface IFlexWrapperProps {
  direction?: FlexDirection;
  align?: FlexAlign;
  wrap?: boolean;
  justify?: FlexJustify;
  flex?: string;
  height?: string;
  width?: string;
  gap?: string;
}

const FlexWrapper = styled.div<IFlexWrapperProps>`
  display: flex;
  ${({ gap }) => gap && `gap: ${gap};`}
  ${({ direction }) => direction && `flex-direction: ${direction};`}
  ${({ align }) => align && `align-items: ${align};`}
  ${({ wrap }) => wrap && `flex-wrap: wrap;`}
  ${({ justify }) => justify && `justify-content: ${justify};`}
  ${({ flex }) => flex && `flex: ${flex};`}
  ${({ height }) => height && `height: ${height};`}
  ${({ width }) => width && `width: ${width};`}
`;

export default FlexWrapper;
