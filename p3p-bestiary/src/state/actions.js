export const SWITCH_COLORSCHEME = 'SWITCH_COLORSCHEME';
export const switchColor = ( color ) => ({
  type: SWITCH_COLORSCHEME,
  payload: color,
});

export const COLLAPSE_HEADER = 'COLLAPSE_HEADER';
export const collapseHeader = () => ({
  type: COLLAPSE_HEADER,
});

export const EXPAND_HEADER = 'EXPAND_HEADER';
export const expandHeader = () => ({
  type: EXPAND_HEADER,
});
