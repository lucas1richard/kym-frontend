import type { Theme } from '@theme/styles';
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {};
}
