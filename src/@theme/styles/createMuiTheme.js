import deepmerge from 'deepmerge'; // < 1kb payload overhead when lodash/merge is > 3kb.
import isPlainObject from 'is-plain-object';
import createBreakpoints from './createBreakpoints';
import createMixins from './createMixins';
import createPalette from './createPalette';
import createTypography from './createTypography';
import shadows from './shadows';
import shape from './shape';
import defaultSpacing from './spacing';
import transitions from './transitions';
import zIndex from './zIndex';

function createMuiTheme(options = {}) {
  const {
    breakpoints: breakpointsInput = {},
    mixins: mixinsInput = {},
    palette: paletteInput = {},
    shadows: shadowsInput,
    spacing: spacingInput = {},
    typography: typographyInput = {},
    ...other
  } = options;

  const palette = createPalette(paletteInput);
  const breakpoints = createBreakpoints(breakpointsInput);
  const spacing = { ...defaultSpacing, ...spacingInput };

  const muiTheme = {
    breakpoints,
    direction: 'ltr',
    mixins: createMixins(breakpoints, spacing, mixinsInput),
    overrides: {}, // Inject custom styles
    palette,
    props: {}, // Inject custom properties
    shadows: shadowsInput || shadows,
    typography: createTypography(palette, typographyInput),
    ...deepmerge(
      {
        shape,
        spacing,
        transitions,
        zIndex,
      },
      other,
      {
        isMergeableObject: isPlainObject,
      },
    ),
  };

  return muiTheme;
}

export default createMuiTheme;
