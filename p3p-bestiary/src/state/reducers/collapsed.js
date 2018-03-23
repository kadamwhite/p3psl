export default ( state = false, action ) => {
  switch (action.type) {
    case 'COLLAPSE_HEADER':
      return true;
    case 'EXPAND_HEADER':
      return false;
    default:
      return state;
  }
}
