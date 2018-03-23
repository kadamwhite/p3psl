const colorSchemes = {
  pink: {
    primary: '#fb8ade',
    secondary: '#6a0713',
  },
  blue: {
    primary: '#5299f9',
    secondary: '#18213a',
  },
};

export default ( state = colorSchemes.pink, action ) => {
  switch (action.type) {
    case 'SWITCH_COLORSCHEME':
      // Switch to designated scheme & fall back to Pink on invalid scheme name.
      return colorSchemes[ action.payload ] || colorSchemes.pink;
    default:
      return state;
  }
}
